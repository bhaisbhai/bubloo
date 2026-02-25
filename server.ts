import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("baby_tracker.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    author TEXT,
    topic TEXT,
    title TEXT,
    content TEXT,
    likes INTEGER DEFAULT 0,
    timeAgo TEXT,
    avatar TEXT
  );

  CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    postId TEXT,
    author TEXT,
    content TEXT,
    timeAgo TEXT,
    avatar TEXT,
    FOREIGN KEY(postId) REFERENCES posts(id)
  );
`);

// Seed data if empty
const postCount = db.prepare("SELECT COUNT(*) as count FROM posts").get() as { count: number };
if (postCount.count === 0) {
  const seedPosts = [
    {
      id: 'post-1',
      author: 'Priya S.',
      topic: 'Sleep Training',
      title: 'Finally got a 5-hour stretch!',
      content: 'After 3 weeks of consistent bedtime routine, my 10-week-old finally slept for 5 hours straight. There is light at the end of the tunnel, mamas!',
      likes: 24,
      timeAgo: '2h ago',
      avatar: 'https://picsum.photos/seed/priya/100/100'
    },
    {
      id: 'post-2',
      author: 'Arjun K.',
      topic: 'Feeding',
      title: 'Tips for bottle refusal?',
      content: 'My 4-month-old has suddenly started refusing the bottle when I go to work. We\'ve tried different teats but no luck. Any advice?',
      likes: 15,
      timeAgo: '5h ago',
      avatar: 'https://picsum.photos/seed/arjun/100/100'
    },
    {
      id: 'post-3',
      author: 'Ananya R.',
      topic: 'Milestones',
      title: 'The first giggle is everything!',
      content: 'My baby just laughed for the first time today while I was making silly faces. I actually cried happy tears. Best moment of parenthood so far.',
      likes: 56,
      timeAgo: '1d ago',
      avatar: 'https://picsum.photos/seed/ananya/100/100'
    }
  ];

  const insertPost = db.prepare("INSERT INTO posts (id, author, topic, title, content, likes, timeAgo, avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  seedPosts.forEach(post => {
    insertPost.run(post.id, post.author, post.topic, post.title, post.content, post.likes, post.timeAgo, post.avatar);
  });

  const seedComments = [
    {
      id: 'comment-1',
      postId: 'post-1',
      author: 'Sana M.',
      content: 'That is amazing! We are still struggling at 8 weeks.',
      timeAgo: '1h ago',
      avatar: 'https://picsum.photos/seed/sana/100/100'
    },
    {
      id: 'comment-2',
      postId: 'post-1',
      author: 'Zoya A.',
      content: 'Consistency is definitely key. Well done!',
      timeAgo: '30m ago',
      avatar: 'https://picsum.photos/seed/zoya/100/100'
    }
  ];

  const insertComment = db.prepare("INSERT INTO comments (id, postId, author, content, timeAgo, avatar) VALUES (?, ?, ?, ?, ?, ?)");
  seedComments.forEach(comment => {
    insertComment.run(comment.id, comment.postId, comment.author, comment.content, comment.timeAgo, comment.avatar);
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/posts", (req, res) => {
    const posts = db.prepare(`
      SELECT p.*, (SELECT COUNT(*) FROM comments WHERE postId = p.id) as comments 
      FROM posts p 
      ORDER BY p.id DESC
    `).all();
    res.json(posts);
  });

  app.post("/api/posts/:id/like", (req, res) => {
    const { id } = req.params;
    db.prepare("UPDATE posts SET likes = likes + 1 WHERE id = ?").run(id);
    const post = db.prepare("SELECT likes FROM posts WHERE id = ?").get(id);
    res.json(post);
  });

  app.get("/api/posts/:id/comments", (req, res) => {
    const { id } = req.params;
    const comments = db.prepare("SELECT * FROM comments WHERE postId = ? ORDER BY id ASC").all(id);
    res.json(comments);
  });

  app.post("/api/posts/:id/comments", (req, res) => {
    const { id: postId } = req.params;
    const { author, content, avatar } = req.body;
    const id = `comment-${Date.now()}`;
    const timeAgo = "Just now";
    
    db.prepare("INSERT INTO comments (id, postId, author, content, timeAgo, avatar) VALUES (?, ?, ?, ?, ?, ?)")
      .run(id, postId, author, content, timeAgo, avatar);
    
    const comment = db.prepare("SELECT * FROM comments WHERE id = ?").get(id);
    res.json(comment);
  });

  app.post("/api/posts", (req, res) => {
    const { author, topic, title, content, avatar } = req.body;
    const id = `post-${Date.now()}`;
    const timeAgo = "Just now";
    
    db.prepare("INSERT INTO posts (id, author, topic, title, content, likes, timeAgo, avatar) VALUES (?, ?, ?, ?, ?, 0, ?, ?)")
      .run(id, author, topic, title, content, timeAgo, avatar);
    
    const post = db.prepare("SELECT *, 0 as comments FROM posts WHERE id = ?").get(id);
    res.json(post);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
