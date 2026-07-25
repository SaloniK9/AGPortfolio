"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setStatus({ type: "error", message: "Please complete all required fields." });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to send message now.");
      }

      setStatus({ type: "success", message: data.message || "Your message has been delivered successfully." });
      setForm(initialState);
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Unable to send message now." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {status.type && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="mb-6 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm font-medium shadow-sm backdrop-blur" style={{ backgroundColor: status.type === "success" ? "#ecfdf3" : "#fef2f2", borderColor: status.type === "success" ? "#86efac" : "#fecaca", color: status.type === "success" ? "#166534" : "#b91c1c" }}>
            {status.type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
            <span>{status.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Your Name" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-pccoe-blue focus:bg-white transition-all text-sm font-bold text-slate-800 placeholder:text-slate-300" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
            <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="name@example.com" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-pccoe-blue focus:bg-white transition-all text-sm font-bold text-slate-800 placeholder:text-slate-300" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Subject</label>
          <input name="subject" value={form.subject} onChange={handleChange} required placeholder="Regarding academic/research query..." className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-pccoe-blue focus:bg-white transition-all text-sm font-bold text-slate-800 placeholder:text-slate-300" />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Message Details</label>
          <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Describe your query in detail..." className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-pccoe-blue focus:bg-white transition-all text-sm font-bold text-slate-800 placeholder:text-slate-300 resize-none" />
        </div>

        <button disabled={isSubmitting} className={`w-full group flex items-center justify-center gap-4 py-5 rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] ${isSubmitting ? "bg-slate-200 cursor-not-allowed text-slate-400" : "bg-pccoe-blue text-white hover:bg-slate-950"}`}>
          {isSubmitting ? <div className="w-5 h-5 border-2 border-pccoe-blue border-t-white rounded-full animate-spin" /> : <><span>Send Message</span><Send className="w-5 h-5 group-hover:translate-x-2 transition-transform" /></>}
        </button>
      </form>
    </div>
  );
}
