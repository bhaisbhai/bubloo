import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Baby, Moon, Droplets, Activity, ChevronLeft, ChevronRight, 
  Heart, Calendar, Star, Smile, MessageCircle, Hand, Droplet, 
  Footprints, Eye, ArrowUpCircle, Syringe, Puzzle, User, 
  ThumbsUp, Shield, RefreshCw, Sparkles, Utensils 
} from 'lucide-react';
import { babyData, WeekData } from './data';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentData = babyData[currentIndex];

  useEffect(() => {
    if (scrollRef.current) {
      const selectedElement = scrollRef.current.children[currentIndex] as HTMLElement;
      if (selectedElement) {
        const scrollLeft = selectedElement.offsetLeft - scrollRef.current.offsetWidth / 2 + selectedElement.offsetWidth / 2;
        scrollRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < babyData.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
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
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight font-heading">Baby Tracker</h1>
          </div>
          <button className="p-2 text-slate-400 hover:bg-rose-50 rounded-full transition-colors">
            <Calendar className="w-5 h-5" />
          </button>
        </div>

        {/* Timeline */}
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
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 pb-24 overflow-hidden">
        <AnimatePresence mode="wait">
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
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-rose-100/50 pb-safe z-50">
        <div className="max-w-md mx-auto px-6 py-4 flex justify-between items-center">
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition-all ${
              currentIndex === 0 
                ? 'text-slate-300 cursor-not-allowed' 
                : 'text-slate-600 hover:bg-slate-50 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Prev
          </button>
          
          <div className="text-sm font-bold text-slate-400 font-heading tracking-widest uppercase">
            {currentIndex + 1} / {babyData.length}
          </div>

          <button 
            onClick={handleNext}
            disabled={currentIndex === babyData.length - 1}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition-all ${
              currentIndex === babyData.length - 1 
                ? 'text-slate-300 cursor-not-allowed' 
                : 'text-rose-600 hover:bg-rose-50 active:scale-95'
            }`}
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
