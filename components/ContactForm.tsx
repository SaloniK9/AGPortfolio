"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate EmailJS execution
    // Actual implementation would use: emailjs.sendForm(...)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSent(true);
    
    // Reset toast after 5s
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {isSent && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -top-16 left-0 right-0 z-50 flex justify-center"
          >
            <div className="bg-green-600 text-white px-8 py-3 rounded-2xl shadow-2xl flex items-center gap-4 font-black text-sm uppercase tracking-widest border-2 border-green-400">
              <CheckCircle2 className="w-5 h-5" />
              Directly Sent to HoD!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
            <input 
              required
              placeholder="Your Name"
              className="w-full bg-[#f8f9fa] border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-bold text-slate-800 placeholder:text-slate-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
            <input 
              required
              type="email"
              placeholder="name@example.com"
              className="w-full bg-[#f8f9fa] border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-bold text-slate-800 placeholder:text-slate-300"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Subject</label>
          <input 
            required
            placeholder="Regarding academic/research query..."
            className="w-full bg-[#f8f9fa] border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-bold text-slate-800 placeholder:text-slate-300"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Message Details</label>
          <textarea 
            required
            rows={5}
            placeholder="Describe your query in detail..."
            className="w-full bg-[#f8f9fa] border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-bold text-slate-800 placeholder:text-slate-300 resize-none"
          />
        </div>

        <button 
          disabled={isSubmitting}
          className={`w-full group flex items-center justify-center gap-4 py-5 rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] ${
            isSubmitting ? "bg-slate-200 cursor-not-allowed text-slate-400" : "bg-pccoe-blue text-white hover:bg-black"
          }`}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-blue-600 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Submit to Department
              <Send className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
