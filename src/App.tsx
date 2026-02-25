import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Baby, Moon, Droplets, Activity, ChevronLeft, ChevronRight, 
  Heart, Calendar, Star, Smile, MessageCircle, Hand, Droplet, 
  Footprints, Eye, ArrowUpCircle, Syringe, Puzzle, User, 
  ThumbsUp, Shield, RefreshCw, Sparkles, Utensils, Users,
  LayoutGrid, MessageSquare, ThumbsUp as LikeIcon, Share2,
  X, Send, Plus
} from 'lucide-react';
import { babyData, WeekData } from './data';
import { getIllustration, illustrationUrls } from './components/Illustrations';

type ForumPost = {
  id: string;
  author: string;
  topic: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  timeAgo: string;
  avatar: string;
};

type Comment = {
  id: string;
  postId: string;
  author: string;
  content: string;
  timeAgo: string;
  avatar: string;
};

const getMilestoneIcon = (text: string) => {
  const t = text.toLowerCase();
  if (t.includes('kangaroo') || t.includes('bond')) return <Heart className="w-5 h-5 text-rose-500" />;
  if (t.includes('face') || t.includes('smile') || t.includes('laugh')) return <Smile className="w-5 h-5 text-amber-500" />;
  if (t.includes('sound') || t.includes('interact')) return <MessageCircle className="w-5 h-5 text-blue-500" />;
  if (t.includes('arm') || t.includes('reach') || t.includes('hand')) return <Hand className="w-5 h-5 text-emerald-500" />;
  if (t.includes('tear')) return <Droplet className="w-5 h-5 text-sky-500" />;
  if (t.includes('kick') || t.includes('feet')) return <Footprints className="w-5 h-5 text-indigo-500" />;
  if (t.includes('tummy') || t.includes('crawl')) return <Activity className="w-5 h-5 text-orange-500" />;
  if (t.includes('track') || t.includes('vision')) return <Eye className="w-5 h-5 text-violet-500" />;
  if (t.includes('head') || t.includes('push')) return <ArrowUpCircle className="w-5 h-5 text-teal-500" />;
  if (t.includes('immunization')) return <Syringe className="w-5 h-5 text-red-500" />;
  if (t.includes('toy')) return <Puzzle className="w-5 h-5 text-fuchsia-500" />;
  if (t.includes('sit')) return <User className="w-5 h-5 text-cyan-500" />;
  if (t.includes('colic')) return <ThumbsUp className="w-5 h-5 text-green-500" />;
  if (t.includes('robust')) return <Shield className="w-5 h-5 text-slate-500" />;
  if (t.includes('roll') || t.includes('rock')) return <RefreshCw className="w-5 h-5 text-blue-400" />;
  if (t.includes('teeth')) return <Sparkles className="w-5 h-5 text-yellow-500" />;
  if (t.includes('solid') || t.includes('food')) return <Utensils className="w-5 h-5 text-orange-600" />;
  return <Star className="w-5 h-5 text-rose-500" />;
};

const getMilestoneBg = (text: string) => {
  const t = text.toLowerCase();
  if (t.includes('kangaroo') || t.includes('bond')) return 'bg-rose-100';
  if (t.includes('face') || t.includes('smile') || t.includes('laugh')) return 'bg-amber-100';
  if (t.includes('sound') || t.includes('interact')) return 'bg-blue-100';
  if (t.includes('arm') || t.includes('reach') || t.includes('hand')) return 'bg-emerald-100';
  if (t.includes('tear')) return 'bg-sky-100';
  if (t.includes('kick') || t.includes('feet')) return 'bg-indigo-100';
  if (t.includes('tummy') || t.includes('crawl')) return 'bg-orange-100';
  if (t.includes('track') || t.includes('vision')) return 'bg-violet-100';
  if (t.includes('head') || t.includes('push')) return 'bg-teal-100';
  if (t.includes('immunization')) return 'bg-red-100';
  if (t.includes('toy')) return 'bg-fuchsia-100';
  if (t.includes('sit')) return 'bg-cyan-100';
  if (t.includes('colic')) return 'bg-green-100';
  if (t.includes('robust')) return 'bg-slate-100';
  if (t.includes('roll') || t.includes('rock')) return 'bg-blue-50';
  if (t.includes('teeth')) return 'bg-yellow-100';
  if (t.includes('solid') || t.includes('food')) return 'bg-orange-100';
  return 'bg-rose-100';
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'tracker' | 'forum'>('tracker');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(true);
  const [newPostData, setNewPostData] = useState({ title: '', content: '', topic: 'General' });
  const [userAvatar, setUserAvatar] = useState<string>('bubloo-mother');
  const [isChangingAvatar, setIsChangingAvatar] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentData = babyData[currentIndex];

  useEffect(() => {
    if (activeTab === 'forum') {
      fetchPosts();
    }
  }, [activeTab]);

  useEffect(() => {
    if (scrollRef.current && activeTab === 'tracker') {
      const selectedElement = scrollRef.current.children[currentIndex] as HTMLElement;
      if (selectedElement) {
        const scrollLeft = selectedElement.offsetLeft - scrollRef.current.offsetWidth / 2 + selectedElement.offsetWidth / 2;
        scrollRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [currentIndex, activeTab]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const handleLike = async (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(`/api/posts/${postId}/like`, { method: 'POST' });
      if (response.ok) {
        const { likes } = await response.json();
        setPosts(posts.map(p => p.id === postId ? { ...p, likes } : p));
        if (selectedPost?.id === postId) {
          setSelectedPost({ ...selectedPost, likes });
        }
      }
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleOpenComments = async (post: ForumPost) => {
    setSelectedPost(post);
    try {
      const response = await fetch(`/api/posts/${post.id}/comments`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !selectedPost) return;
    try {
      const response = await fetch(`/api/posts/${selectedPost.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: 'Raj',
          content: newComment,
          avatar: userAvatar
        })
      });
      if (response.ok) {
        const comment = await response.json();
        setComments([...comments, comment]);
        setNewComment('');
        // Update comment count in posts list
        setPosts(posts.map(p => p.id === selectedPost.id ? { ...p, comments: p.comments + 1 } : p));
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleAddPost = async () => {
    if (!newPostData.title.trim() || !newPostData.content.trim()) return;
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newPostData,
          author: 'Raj',
          avatar: userAvatar
        })
      });
      if (response.ok) {
        const post = await response.json();
        setPosts([post, ...posts]);
        setIsAddingPost(false);
        setNewPostData({ title: '', content: '', topic: 'General' });
      }
    } catch (error) {
      console.error('Failed to add post:', error);
    }
  };

  const handleNext = () => {
    if (currentIndex < babyData.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserAvatar(reader.result as string);
        setIsChangingAvatar(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 text-slate-800 font-sans selection:bg-rose-200 pb-safe">
      {/* Header */}
      <header className="bg-white/60 backdrop-blur-xl sticky top-0 z-50 border-b border-rose-100/50 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-rose-400 to-orange-400 p-2 rounded-2xl shadow-sm shadow-rose-200">
              <Baby className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight font-heading">
              {activeTab === 'tracker' ? 'Baby Tracker' : 'Community'}
            </h1>
          </div>
          <button className="p-2 text-slate-400 hover:bg-rose-50 rounded-full transition-colors">
            {activeTab === 'tracker' ? <Calendar className="w-5 h-5" /> : <Users className="w-5 h-5" />}
          </button>
        </div>

        {/* Timeline (only for tracker) */}
        {activeTab === 'tracker' && (
          <div className="max-w-md mx-auto relative mt-1">
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto hide-scrollbar px-4 py-3 gap-3 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {babyData.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 snap-center px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 font-heading ${
                    index === currentIndex 
                      ? 'bg-gradient-to-r from-rose-400 to-orange-400 text-white shadow-md shadow-rose-200/50 scale-105' 
                      : 'bg-white text-slate-500 hover:bg-rose-50 border border-slate-100 shadow-sm'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
            
            {/* Gradient masks for scroll area */}
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 pb-32 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'tracker' ? (
            <motion.div
              key={currentData.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6"
            >
              {/* Hero Card */}
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-rose-100 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 p-6 opacity-[0.03] rotate-12">
                  <Baby className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                  <span className="inline-block px-4 py-1.5 bg-rose-50 text-rose-600 text-xs font-bold rounded-full mb-4 uppercase tracking-widest font-heading">
                    {currentData.type === 'week' ? 'Weekly Update' : 'Monthly Update'}
                  </span>
                  <h2 className="text-4xl font-extrabold text-slate-800 mb-2 font-heading tracking-tight">{currentData.title}</h2>
                  <h3 className="text-xl text-slate-500 font-semibold mb-6 font-heading">{currentData.subtitle}</h3>
                  <p className="text-slate-600 leading-relaxed text-[1.05rem]">
                    {currentData.summary}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Sleep Card */}
                <div className="bg-indigo-50/80 rounded-[2rem] p-6 border border-indigo-100/50 shadow-sm">
                  <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm shadow-indigo-100">
                    <Moon className="w-6 h-6 text-indigo-500" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 font-heading text-xl tracking-tight">Sleep</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{currentData.sleep}</p>
                </div>

                {/* Feeding Card */}
                <div className="bg-orange-50/80 rounded-[2rem] p-6 border border-orange-100/50 shadow-sm">
                  <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm shadow-orange-100">
                    <Droplets className="w-6 h-6 text-orange-500" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 font-heading text-xl tracking-tight">Feeding</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{currentData.feeding}</p>
                </div>

                {/* Crying Card */}
                <div className="bg-sky-50/80 rounded-[2rem] p-6 border border-sky-100/50 col-span-2 shadow-sm">
                  <div className="flex items-start gap-5">
                    <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm shadow-sky-100">
                      <Activity className="w-6 h-6 text-sky-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-2 font-heading text-xl tracking-tight">Crying & Fussiness</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{currentData.crying}</p>
                    </div>
                  </div>
                </div>

                {/* Feeding Milestones Card */}
                <div className="bg-teal-50/80 rounded-[2rem] p-6 border border-teal-100/50 col-span-2 shadow-sm">
                  <div className="flex items-start gap-5">
                    <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm shadow-teal-100">
                      <Droplets className="w-6 h-6 text-teal-500" />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-slate-800 mb-1 font-heading text-xl tracking-tight">Feeding Milestones</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{currentData.feedingDetails}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-700 text-sm mb-1">Recommended Schedule</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">{currentData.feedingSchedule}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestones */}
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-rose-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-yellow-100 p-2 rounded-xl">
                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-2xl font-heading tracking-tight">Key Milestones</h4>
                </div>
                <ul className="space-y-4">
                  {currentData.milestones.map((milestone, idx) => (
                    <li key={idx} className="flex items-center gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                      <div className={`p-2 rounded-xl shrink-0 ${getMilestoneBg(milestone)}`}>
                        {getMilestoneIcon(milestone)}
                      </div>
                      <span className="text-slate-700 font-medium leading-snug">{milestone}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="forum"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold font-heading text-slate-800">Recent Discussions</h2>
                <button 
                  onClick={() => setIsAddingPost(true)}
                  className="bg-brand-peach text-white p-2 rounded-full shadow-lg shadow-brand-peach/20 hover:bg-brand-dark-peach transition-colors"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>

              <AnimatePresence>
                {showGuidelines && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-brand-cream rounded-3xl p-6 border border-brand-peach/20 relative">
                      <button 
                        onClick={() => setShowGuidelines(false)}
                        className="absolute top-4 right-4 text-brand-dark-peach/40 hover:text-brand-dark-peach transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white p-2 rounded-xl shadow-sm">
                          <Heart className="w-5 h-5 text-brand-peach fill-brand-peach" />
                        </div>
                        <h3 className="font-bold text-brand-dark-peach font-heading">Community Guidelines</h3>
                      </div>
                      <p className="text-sm text-brand-dark-peach/80 leading-relaxed mb-4">
                        Welcome to Bubloo Community! This is a safe space for parents to support each other.
                      </p>
                      <ul className="grid grid-cols-1 gap-2">
                        {[
                          { icon: <Smile className="w-3.5 h-3.5" />, text: "Be kind, respectful, and supportive." },
                          { icon: <Users className="w-3.5 h-3.5" />, text: "Respect everyone's unique parenting journey." },
                          { icon: <Shield className="w-3.5 h-3.5" />, text: "Protect your privacy and others'." },
                          { icon: <Activity className="w-3.5 h-3.5" />, text: "Consult professionals for medical advice." }
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs font-medium text-brand-dark-peach/70">
                            <span className="text-brand-peach">{item.icon}</span>
                            {item.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {!showGuidelines && (
                <button 
                  onClick={() => setShowGuidelines(true)}
                  className="text-xs font-bold text-brand-peach hover:text-brand-dark-peach transition-colors flex items-center gap-1"
                >
                  <Heart className="w-3 h-3" /> Show Guidelines
                </button>
              )}
              
              {posts.map((post) => (
                <div 
                  key={post.id} 
                  onClick={() => handleOpenComments(post)}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4 cursor-pointer hover:border-rose-200 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-rose-100 overflow-hidden bg-slate-50">
                        {post.avatar.startsWith('bubloo-') ? (
                          <div className="w-full h-full p-1.5">
                            {getIllustration(post.avatar)}
                          </div>
                        ) : (
                          <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{post.author}</p>
                        <p className="text-xs text-slate-400">{post.timeAgo}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wider">
                      {post.topic}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-800 font-heading leading-tight">{post.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{post.content}</p>
                  </div>
                  
                  <div className="flex items-center gap-6 pt-2 border-t border-slate-50">
                    <button 
                      onClick={(e) => handleLike(post.id, e)}
                      className="flex items-center gap-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <LikeIcon className="w-4 h-4" />
                      <span className="text-xs font-bold">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-slate-400 hover:text-blue-500 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-xs font-bold">{post.comments}</span>
                    </button>
                    <button className="ml-auto text-slate-400 hover:text-slate-600 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Post Modal */}
      <AnimatePresence>
        {isAddingPost && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingPost(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative bg-white w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] p-8 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-heading text-slate-800">Create Post</h2>
                <button onClick={() => setIsAddingPost(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-rose-200 bg-white">
                    {userAvatar.startsWith('bubloo-') ? (
                      <div className="w-full h-full p-2">
                        {getIllustration(userAvatar)}
                      </div>
                    ) : (
                      <img src={userAvatar} alt="Your Avatar" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Your Avatar</p>
                    <button 
                      onClick={() => setIsChangingAvatar(true)}
                      className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors"
                    >
                      Change Avatar
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Topic</label>
                  <select 
                    value={newPostData.topic}
                    onChange={(e) => setNewPostData({ ...newPostData, topic: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  >
                    <option>General</option>
                    <option>Sleep Training</option>
                    <option>Feeding</option>
                    <option>Milestones</option>
                    <option>Postpartum</option>
                    <option>Weaning</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Title</label>
                  <input 
                    type="text" 
                    placeholder="What's on your mind?"
                    value={newPostData.title}
                    onChange={(e) => setNewPostData({ ...newPostData, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Content</label>
                  <textarea 
                    placeholder="Share your story or ask a question..."
                    rows={4}
                    value={newPostData.content}
                    onChange={(e) => setNewPostData({ ...newPostData, content: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 resize-none"
                  />
                </div>
                <button 
                  onClick={handleAddPost}
                  className="w-full bg-rose-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-rose-200 active:scale-95 transition-all"
                >
                  Post to Community
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Comments Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative bg-white w-full max-w-md h-[90vh] sm:h-[80vh] rounded-t-[2rem] sm:rounded-[2rem] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="bg-rose-100 p-2 rounded-xl">
                    <MessageSquare className="w-5 h-5 text-rose-500" />
                  </div>
                  <h2 className="text-xl font-bold font-heading text-slate-800">Discussion</h2>
                </div>
                <button onClick={() => setSelectedPost(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Original Post */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-rose-100 overflow-hidden bg-slate-50">
                      {selectedPost.avatar.startsWith('bubloo-') ? (
                        <div className="w-full h-full p-1.5">
                          {getIllustration(selectedPost.avatar)}
                        </div>
                      ) : (
                        <img src={selectedPost.avatar} alt={selectedPost.author} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{selectedPost.author}</p>
                      <p className="text-xs text-slate-400">{selectedPost.timeAgo}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 font-heading leading-tight">{selectedPost.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{selectedPost.content}</p>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={(e) => handleLike(selectedPost.id, e)}
                      className="flex items-center gap-1.5 text-rose-500 bg-rose-50 px-3 py-1.5 rounded-full"
                    >
                      <LikeIcon className="w-4 h-4 fill-rose-500" />
                      <span className="text-xs font-bold">{selectedPost.likes}</span>
                    </button>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-6">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">
                    Comments ({comments.length})
                  </h4>
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full border border-rose-100 overflow-hidden bg-slate-50 shrink-0">
                        {comment.avatar.startsWith('bubloo-') ? (
                          <div className="w-full h-full p-1">
                            {getIllustration(comment.avatar)}
                          </div>
                        ) : (
                          <img src={comment.avatar} alt={comment.author} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="bg-slate-50 rounded-2xl p-4 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-bold text-slate-800">{comment.author}</p>
                          <p className="text-[10px] text-slate-400">{comment.timeAgo}</p>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comment Input */}
              <div className="p-6 border-t border-slate-100 bg-white shrink-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-rose-100 bg-slate-50">
                    {userAvatar.startsWith('bubloo-') ? (
                      <div className="w-full h-full p-1">
                        {getIllustration(userAvatar)}
                      </div>
                    ) : (
                      <img src={userAvatar} alt="Your Avatar" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <button 
                    onClick={() => setIsChangingAvatar(true)}
                    className="text-[10px] font-bold text-rose-500 uppercase tracking-wider"
                  >
                    Change
                  </button>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-2 border border-slate-100 focus-within:border-rose-200 transition-colors">
                  <input 
                    type="text" 
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                    className="flex-1 bg-transparent py-2 text-sm focus:outline-none"
                  />
                  <button 
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="text-rose-500 disabled:text-slate-300 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Avatar Selector Modal */}
      <AnimatePresence>
        {isChangingAvatar && (
          <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChangingAvatar(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative bg-white w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] p-8 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-heading text-slate-800">Choose Avatar</h2>
                <button onClick={() => setIsChangingAvatar(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="space-y-8">
                {/* Photo Upload Option */}
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">Upload Photo</label>
                  <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-rose-300 hover:bg-rose-50/30 transition-all">
                    <div className="flex flex-col items-center gap-2">
                      <Plus className="w-8 h-8 text-rose-400" />
                      <span className="text-sm font-bold text-slate-500">Pick from Gallery</span>
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </label>
                </div>

                {/* Brand Illustrations Option */}
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">Brand Illustrations</label>
                  <div className="grid grid-cols-3 gap-4">
                    {illustrationUrls.map((url) => (
                      <button
                        key={url}
                        onClick={() => {
                          setUserAvatar(url);
                          setIsChangingAvatar(false);
                        }}
                        className={`aspect-square rounded-2xl p-3 border-2 transition-all ${
                          userAvatar === url ? 'border-rose-500 bg-rose-50' : 'border-slate-100 hover:border-rose-200'
                        }`}
                      >
                        {getIllustration(url)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-rose-100/50 pb-safe z-50">
        <div className="max-w-md mx-auto px-6 py-3 flex justify-around items-center">
          <button 
            onClick={() => setActiveTab('tracker')}
            className={`flex flex-col items-center gap-1 p-2 transition-all ${
              activeTab === 'tracker' ? 'text-rose-500' : 'text-slate-400'
            }`}
          >
            <LayoutGrid className={`w-6 h-6 ${activeTab === 'tracker' ? 'fill-rose-500/10' : ''}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest font-heading">Tracker</span>
          </button>

          <button 
            onClick={() => setActiveTab('forum')}
            className={`flex flex-col items-center gap-1 p-2 transition-all ${
              activeTab === 'forum' ? 'text-rose-500' : 'text-slate-400'
            }`}
          >
            <Users className={`w-6 h-6 ${activeTab === 'forum' ? 'fill-rose-500/10' : ''}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest font-heading">Community</span>
          </button>
        </div>
      </div>

      {/* Tracker Controls (only visible in tracker tab) */}
      {activeTab === 'tracker' && (
        <div className="fixed bottom-20 left-0 right-0 pointer-events-none">
          <div className="max-w-md mx-auto px-6 flex justify-between items-center pointer-events-auto">
            <button 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`bg-white/90 backdrop-blur shadow-lg p-3 rounded-2xl transition-all active:scale-95 ${
                currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-600'
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={handleNext}
              disabled={currentIndex === babyData.length - 1}
              className={`bg-white/90 backdrop-blur shadow-lg p-3 rounded-2xl transition-all active:scale-95 ${
                currentIndex === babyData.length - 1 ? 'opacity-0 pointer-events-none' : 'text-rose-600'
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


