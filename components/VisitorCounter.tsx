"use client";

import { useState, useEffect } from 'react';
import { Eye, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VisitorCounter() {
  const [totalViews, setTotalViews] = useState<number>(0);
  const [liveViews, setLiveViews] = useState<number>(5);

  useEffect(() => {
    // 1. Persist/Update Total Views in LocalStorage
    const stored = localStorage.getItem('pccoe_dr_views');
    const initial = stored ? parseInt(stored) : 1245842; // Millions capable seed
    const updated = initial + 1;
    localStorage.setItem('pccoe_dr_views', updated.toString());
    setTotalViews(updated);

    // 2. Simulate Real-time Live Visitors (1-50)
    const interval = setInterval(() => {
      setLiveViews(Math.floor(Math.random() * 49) + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-8 right-8 z-[200] flex flex-col items-end gap-3 pointer-events-none sm:pointer-events-auto">
      {/* Total Views (Gold Reel Style) */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3 px-5 py-2.5 bg-white/90 backdrop-blur-xl border-2 border-amber-400 rounded-full shadow-[0_4px_20px_rgba(255,215,0,0.3)] group hover:scale-105 transition-transform cursor-pointer"
      >
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-600 shadow-[0_0_10px_#FFD700]"></span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-wider text-amber-900/60 font-black leading-none">Profile Reel Views</span>
          <span className="text-sm font-black text-gray-900 tabular-nums">
            {totalViews.toLocaleString()}
          </span>
        </div>
        <div className="p-1 px-2.5 bg-amber-100 rounded-full">
           <Eye className="w-3.5 h-3.5 text-amber-700 font-bold" />
        </div>
      </motion.div>

      {/* Live Visitors (Small Minimal) */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 px-3 py-1 bg-white/70 backdrop-blur border border-gray-100 rounded-full shadow-md"
      >
        <Users className="w-3 h-3 text-blue-600" />
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">
          Live: <span className="text-blue-600">{liveViews}</span>
        </span>
      </motion.div>
    </div>
  );
}
