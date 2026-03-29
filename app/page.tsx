"use client";

import { cvData } from "./data";
import {
  GraduationCap,
  Trophy,
  Youtube,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  BookOpen,
  Award,
  Zap,
  Cpu,
  ArrowRight,
  Menu,
  X,
  Clock,
  Briefcase,
  ChevronDown,
  LayoutGrid,
  FileText
} from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import ContactForm from "@/components/ContactForm";
import VisitorCounter from "@/components/VisitorCounter";

// Utility for Count Up Animation
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  return count;
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("scopus");
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroImageY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);

  // Section visibility for nav
  const [activeSection, setActiveSection] = useState("home");

  return (
    <main className="bg-white min-h-screen">
      {/* 🚀 Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 h-20 md:h-24 bg-white/95 backdrop-blur-2xl z-[150] shadow-sm border-b border-gray-100 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-14 md:h-14 bg-pccoe-blue rounded-xl md:rounded-2xl flex items-center justify-center p-1.5 md:p-2 shadow-2xl transition-transform hover:rotate-3 overflow-hidden">
            <Image src="/pccoe _logo.jpg" alt="PCCoE Logo" width={40} height={40} className="object-cover" />
          </div>
          <div>
            <h2 className="text-pccoe-blue font-black tracking-tighter text-base md:text-xl uppercase leading-none">PCCoE Pune</h2>
            <p className="text-gray-400 text-[8px] md:text-[10px] font-bold uppercase tracking-widest mt-0.5 md:mt-1">Research Excellence</p>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1 md:gap-2">
          {["home", "about", "experience", "research", "achievements", "publications", "projects", "contact"].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={() => setActiveSection(section)}
              className={`px-3 py-2 text-xs xl:text-sm font-bold capitalize transition-colors ${activeSection === section ? "text-pccoe-blue border-b-2 border-pccoe-blue" : "text-gray-500 hover:text-pccoe-blue"}`}
            >
              {section}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 bg-gray-50 rounded-xl text-pccoe-blue hover:bg-gray-100 transition-colors">
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-white z-[140] flex flex-col items-center justify-center gap-10"
          >
            {["home", "about", "experience", "research", "achievements", "publications", "projects", "contact"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => { setIsMenuOpen(false); setActiveSection(section); }}
                className="text-3xl font-black text-pccoe-blue uppercase tracking-tighter hover:text-pccoe-red transition-colors"
              >
                {section}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚀 Hero Section (#home) */}
      <section id="home" className="relative min-h-screen pt-20 md:pt-24 overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-white pointer-events-none" />

        <div className="container mx-auto px-6 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image Left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            style={{ y: heroImageY }}
            className="relative w-full max-w-xs md:max-w-md aspect-[5/6] mx-auto lg:mx-0 group"
          >
            <div className="absolute -inset-6 bg-pccoe-blue/5 rounded-[2rem] md:rounded-[3rem] blur-3xl group-hover:bg-pccoe-blue/10 transition-colors" />
            <div className="relative h-full w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border-4 md:border-8 border-white shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
              <Image
                src="/ag-sir.jpg"
                alt="Dr. Ajay Gaikwad"
                fill
                className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 md:p-12">
                <div className="flex gap-2 md:gap-4">
                  {[{ v: "27+", l: "Exp." }, { v: "07", l: "Scopus" }, { v: "PhD", l: "Guide" }].map((s, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-white text-center border border-white/20">
                      <p className="text-base md:text-xl font-black leading-none">{s.v}</p>
                      <p className="text-[7px] md:text-[8px] uppercase font-bold tracking-widest mt-0.5 md:mt-1">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Right Massive */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center lg:text-left space-y-6 md:space-y-10"
          >
            <div className="space-y-2 md:space-y-4">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-pccoe-blue tracking-tighter leading-[0.9]"
              >
                Dr. Ajay K<br />
                <span className="text-pccoe-blue/20 outline-text">Gaikwad</span>
              </motion.h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-pccoe-red tracking-tight max-w-xl mx-auto lg:mx-0">
                Professor & HoD Civil Engineering at PCCoE
              </h2>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-gray-500 font-medium max-w-lg leading-relaxed mx-auto lg:mx-0">
              Pioneering excellence in Academic Leadership, Construction Management, and Strategic R&D for over two decades.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 justify-center lg:justify-start">
              <a href="#about" className="group flex items-center gap-4 md:gap-6 px-8 md:px-10 py-4 md:py-6 bg-pccoe-blue text-white rounded-full font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] shadow-2xl hover:bg-black hover:scale-105 transition-all">
                Scroll & Explore
                <ChevronDown className="w-5 h-5 animate-bounce" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🚀 About Section (#about) */}
      <section id="about" className="py-16 md:py-24 px-6 md:px-12 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col items-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-pccoe-blue uppercase tracking-tighter mb-4 text-center">Foundation</h2>
            <div className="h-1 md:h-1.5 w-16 md:w-24 bg-pccoe-gold rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Bio Card */}
            <div className="lg:col-span-2 clean-card p-6 md:p-12 bg-white flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-pccoe-gold/20 p-1 md:p-2 shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden relative border-2 border-white">
                  <Image src="/ag-sir.jpg" alt="About" fill className="object-cover" />
                </div>
              </div>
              <div className="space-y-4 md:space-y-6 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-black text-pccoe-blue">Dr. Ajay Krishnath Gaikwad</h3>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-medium">
                  Building the future of civil engineering through research leadership at Pimpri Chinchwad College of Engineering (PCCoE), Pune. With 27 years of dedicated service across teaching, industry, and R&D.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 md:p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[8px] md:text-[9px] uppercase font-black text-gray-400 tracking-widest mb-1">Email Domain</p>
                    <p className="text-xs md:text-sm font-bold text-pccoe-blue truncate">{cvData.profile.email}</p>
                  </div>
                  <div className="p-3 md:p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[8px] md:text-[9px] uppercase font-black text-gray-400 tracking-widest mb-1">Birth Anniversary</p>
                    <p className="text-xs md:text-sm font-bold text-pccoe-blue">{cvData.profile.dob}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quals Table */}
            <div className="clean-card p-6 md:p-10 bg-pccoe-blue text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <GraduationCap className="w-20 md:w-32 h-20 md:h-32" />
              </div>
              <h4 className="text-base md:text-xl font-black uppercase tracking-widest text-white/50 mb-6 md:mb-8 md:pt-4">Academic Qualifications</h4>
              <div className="space-y-6 md:space-y-8 relative z-10">
                {cvData.academicQualifications.map((q, i) => (
                  <div key={i} className="group border-b border-white/10 pb-4 last:border-0 hover:border-white/30 transition-colors">
                    <p className="text-pccoe-gold font-black text-xs md:text-sm uppercase tracking-wide">{q.degree}</p>
                    <p className="text-base md:text-lg font-bold leading-tight mt-1">{q.institution}</p>
                    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/40 mt-2">{q.year} • {q.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 Experience Timeline (#experience) */}
      <section id="experience" className="bg-[#f8f9fa] py-16 md:py-24 px-6 md:px-12">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-pccoe-blue uppercase tracking-tighter mb-4">Legacy in Action</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] md:text-xs">A professional journey spanning nearly 3 decades</p>
          </div>

          <div className="relative border-l-2 md:border-l-4 border-pccoe-blue/10 ml-4 md:ml-12 space-y-10 md:space-y-16">
            {cvData.experienceTimeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-8 md:pl-12 group"
              >
                <div className="absolute left-[-10px] md:left-[-12px] top-4 w-4 h-4 md:w-5 md:h-5 bg-white border-2 md:border-4 border-pccoe-blue rounded-full group-hover:scale-150 transition-transform duration-300 z-10" />

                <div className="clean-card p-6 md:p-8 bg-white border-l-4 md:border-l-[12px] border-pccoe-blue">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                    <span className="px-3 md:px-4 py-1.5 bg-pccoe-blue text-white rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest w-fit">
                      {item.duration}
                    </span>
                    <span className="flex items-center gap-2 text-gray-400 font-bold text-[10px] md:text-xs uppercase tracking-widest">
                      <MapPin className="w-3 md:w-4 h-3 md:h-4" />
                      {item.location}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-3xl font-black text-pccoe-blue tracking-tight leading-none mb-3 md:mb-4">{item.role}</h3>
                  <p className="text-sm md:text-base text-gray-500 font-medium">Delivering academic standards and departmental leadership at {item.location}.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 Research (#research) */}
      <section id="research" className="py-16 md:py-24 px-6 md:px-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }} />

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col items-center mb-12 md:mb-20 text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-pccoe-blue uppercase tracking-tighter mb-4">Innovation & Research</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] md:text-xs max-w-2xl px-6">Optimizing the core of Civil Engineering construction processes.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-gray-100 p-8 md:p-12 relative overflow-hidden group">
              <div className="relative z-10 flex flex-col gap-8 md:gap-10">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-pccoe-gold/20 rounded-2xl flex items-center justify-center p-2.5 md:p-3">
                    <Cpu className="w-full h-full text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-pccoe-blue leading-none">PhD Focus</h3>
                    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 mt-1 italic">RMC Optimization Specialist</p>
                  </div>
                </div>
                <div className="space-y-4 md:space-y-6">
                  <h4 className="text-lg md:text-xl font-bold italic text-gray-700 leading-tight">"{cvData.phd.title}"</h4>
                  <p className="text-sm md:text-base text-gray-500 leading-relaxed font-medium">{cvData.phd.abstract}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-4">
                  {[{ l: "Completion", v: cvData.phd.completed }, { l: "Guide", v: cvData.phd.guide }].map((d, i) => (
                    <div key={i} className="p-4 md:p-6 bg-gray-50 rounded-2xl md:rounded-3xl border border-gray-100">
                      <p className="text-[8px] md:text-[9px] uppercase font-black text-gray-400 mb-1 md:mb-2">{d.l}</p>
                      <p className="text-sm md:text-lg font-black text-gray-800">{d.v}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {cvData.phd.keywords.map((k, i) => (
                    <span key={i} className="px-3 md:px-4 py-1.5 bg-pccoe-blue/5 border border-pccoe-blue/10 text-[8px] md:text-[10px] uppercase font-black text-pccoe-blue rounded-full tracking-wider">{k}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="space-y-8 md:space-y-12">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-red-600 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-white shadow-2xl flex flex-col justify-between h-full relative group overflow-hidden">
                <div className="relative z-10 flex items-center justify-between mb-10 md:mb-16">
                  <div className="p-3 md:p-4 bg-white/20 rounded-2xl md:rounded-3xl backdrop-blur-xl">
                    <Youtube className="w-8 md:w-10 h-8 md:h-10" />
                  </div>
                  <a href={cvData.profile.socials.youtube} target="_blank" className="bg-white text-red-600 px-4 md:px-6 py-2 md:py-2.5 rounded-full font-black uppercase tracking-widest text-[8px] md:text-[9px] hover:bg-black hover:text-white transition-all text-center">Open Channel</a>
                </div>
                <div className="relative z-10 space-y-4 md:space-y-6">
                  <h3 className="text-2xl md:text-4xl font-black tracking-tighter">Over 1.9 Lakh+ Virtual Lectures Conducted.</h3>
                  <div className="flex items-center gap-4 md:gap-6">
                    {[{ v: "1600+", l: "Subscribers" }, { v: "39", l: "Lectures" }].map((s, i) => (
                      <div key={i} className="flex flex-col">
                        <p className="text-2xl md:text-3xl font-black">{s.v}</p>
                        <p className="text-[7px] md:text-[9px] uppercase font-bold tracking-widest text-white/50">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative z-10 mt-8 md:mt-10 pt-8 md:pt-10 border-t border-white/10 uppercase font-black text-[7px] md:text-[9px] tracking-widest text-white/60 text-center md:text-left">
                  Focus: Engineering Mechanics • Surveying • SOM
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 Achievements Section (#achievements) */}
      <section id="achievements" className="bg-[#f8f9fa] py-16 md:py-24 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="flex flex-col items-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-pccoe-blue uppercase tracking-tighter mb-4 text-center">Milestones reached</h2>
            <div className="h-1 md:h-1.5 w-16 md:w-24 bg-pccoe-gold rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { t: "GATE Qualified", v: "AIR 2439", d: "Top National percentile rank twice.", ic: Trophy, c: "text-amber-500" },
              { t: "Patents", v: "03 Filed", d: "Innovations in RMC & Concrete Waste.", ic: Zap, c: "text-blue-600" },
              { t: "Avishkar Winner", v: "State Level", d: "Recognized for guided research excellence.", ic: Award, c: "text-pccoe-red" },
              { t: "Expert Roles", v: "30+ Invites", d: "NBA Expert, BoS, Session Chair.", ic: Briefcase, c: "text-emerald-600" }
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="gold-card p-8 md:p-10 bg-white">
                <div className={`p-3 md:p-4 bg-gray-50 rounded-2xl w-fit mb-6 md:mb-8 group-hover:scale-110 transition-transform ${s.c}`}><s.ic size={28} /></div>
                <h4 className="text-3xl md:text-4xl font-black text-pccoe-blue mb-1 tracking-tighter">{s.v}</h4>
                <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 md:mb-6">{s.t}</p>
                <p className="text-gray-500 text-xs md:text-sm font-medium leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 Publications (#publications) */}
      <section id="publications" className="py-16 md:py-24 px-6 md:px-12 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-20 items-start">
            <div className="lg:col-span-1 space-y-6 md:space-y-10">
              <div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-pccoe-blue uppercase tracking-tighter mb-4">Scholarly Works</h2>
                <div className="h-1 md:h-1.5 w-16 md:w-24 bg-pccoe-gold rounded-full" />
              </div>
              <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">Active contributor to global research bodies focusing on construction logistics.</p>
              <div className="flex items-end gap-4 md:gap-6 p-6 md:p-8 bg-gray-50 border-2 border-slate-100 rounded-[2rem] md:rounded-[2.5rem] group hover:border-pccoe-blue transition-colors cursor-pointer">
                <span className="text-5xl md:text-7xl font-black text-pccoe-blue tabular-nums leading-none">07</span>
                <div>
                  <p className="text-base md:text-lg font-black text-pccoe-blue uppercase leading-none">Scopus Indexed</p>
                  <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">High Impact Factor</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 clean-card p-2 md:p-4 bg-white/50 backdrop-blur pb-8 md:pb-12">
              <div className="flex bg-gray-50 p-1 md:p-2 rounded-xl md:rounded-2xl mb-6 md:mb-8 overflow-x-auto">
                {["scopus", "journals", "conferences"].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 min-w-[100px] py-3 md:py-4 text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all rounded-lg md:rounded-xl ${activeTab === tab ? "bg-pccoe-blue text-white shadow-xl" : "text-gray-400 hover:text-pccoe-blue hover:bg-white"}`}>
                    {tab} Works
                  </button>
                ))}
              </div>
              <div className="px-4 md:px-8 space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                    {activeTab === "scopus" ? (
                      cvData.research.publications.highlights.map((pub, i) => (
                        <div key={i} className="group p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 bg-white hover:border-pccoe-blue hover:shadow-2xl transition-all flex items-center justify-between gap-4">
                          <div className="flex-1 text-sm md:text-lg font-black text-pccoe-blue leading-tight">{pub}</div>
                          <div className="p-3 md:p-4 bg-gray-50 rounded-full text-gray-300 group-hover:text-pccoe-blue transition-colors"><ExternalLink size={20} /></div>
                        </div>
                      ))
                    ) : activeTab === "journals" ? (
                      cvData.research.publications.journals.map((pub, i) => (
                        <div key={i} className="group p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 bg-white hover:border-pccoe-blue hover:shadow-2xl transition-all flex items-center justify-between gap-4">
                          <div className="flex-1 text-sm md:text-lg font-black text-pccoe-blue leading-tight">{pub}</div>
                          <div className="p-3 md:p-4 bg-gray-50 rounded-full text-gray-300 group-hover:text-pccoe-blue transition-colors"><ExternalLink size={20} /></div>
                        </div>
                      ))
                    ) : (
                      cvData.research.publications.conferences.map((pub, i) => (
                        <div key={i} className="group p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 bg-white hover:border-pccoe-blue hover:shadow-2xl transition-all flex items-center justify-between gap-4">
                          <div className="flex-1 text-sm md:text-lg font-black text-pccoe-blue leading-tight">{pub}</div>
                          <div className="p-3 md:p-4 bg-gray-50 rounded-full text-gray-300 group-hover:text-pccoe-blue transition-colors"><ExternalLink size={20} /></div>
                        </div>
                      ))
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 Projects Section (#projects) */}
      <section id="projects" className="bg-[#f8f9fa] py-16 md:py-24 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-pccoe-blue uppercase tracking-tighter mb-4">Academic projects</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] md:text-xs">Transforming concepts into industrial impact</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 text-sm md:text-base">
            <div className="clean-card p-6 md:p-10 bg-white overflow-hidden">
              <h3 className="text-2xl md:text-3xl font-black text-pccoe-blue mb-6 md:mb-8 flex items-center gap-4"><LayoutGrid size={24} /> PG Major (10+)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead><tr className="border-b-2 border-gray-50 font-black text-[9px] uppercase tracking-widest text-gray-400"><th className="pb-4">Realm</th><th className="pb-4">Status</th></tr></thead>
                  <tbody className="divide-y divide-gray-50">{cvData.projects.themes.slice(0, 5).map((t, i) => (
                    <tr key={i} className="group hover:bg-emerald-50/50 transition-colors"><td className="py-4 md:py-5 font-bold">{t}</td><td className="py-4 md:py-5"><span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[8px] font-black uppercase rounded-full">Scopus/Conf</span></td></tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
            <div className="clean-card p-6 md:p-10 bg-white">
              <h3 className="text-2xl md:text-3xl font-black text-pccoe-blue mb-6 md:mb-8 flex items-center gap-4"><Briefcase size={24} /> UG Mini/Major (12+)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">{cvData.projects.themes.map((t, i) => (
                <div key={i} className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-gray-50 border border-gray-100"><p className="text-xs md:text-sm font-black text-slate-700">{t}</p></div>
              ))}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 Contact Section (#contact) */}
      <section id="contact" className="py-20 md:py-32 px-6 lg:px-24 bg-gradient-to-br from-[#0c1020] to-[#1A237E] relative overflow-hidden">
        <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 md:gap-20">
          <div className="lg:col-span-2 space-y-8 md:space-y-12 text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">Get in <span className="text-pccoe-gold">Touch</span></h2>
              <div className="h-1 w-20 md:w-24 bg-pccoe-gold/50 rounded-full mx-auto md:mx-0" />
            </div>
            <div className="space-y-6 md:space-y-8">
              {[{ ic: Mail, t: "Academic Correspondence", v: cvData.profile.email }, { ic: MapPin, t: "Campus Location", v: "Sector 26, Nigdi, Pune" }].map((c, i) => (
                <div key={i} className="flex items-start gap-4 md:gap-6 group text-left">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-pccoe-gold/20 transition-all"><c.ic className="text-white" size={20} /></div>
                  <div><p className="text-white/40 font-black uppercase tracking-widest text-[8px] mb-1">{c.t}</p><p className="text-base md:text-xl font-bold text-white group-hover:text-pccoe-gold transition-colors">{c.v}</p></div>
                </div>
              ))}
            </div>
            <div className="w-full aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl bg-white/5 opacity-80 hover:opacity-100 transition-opacity">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.2732924194!2d73.7591782!3d18.6517316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e76349ad1b%3A0x63806444853018e6!2sPimpri%20Chinchwad%20College%20of%20Engineering%20(PCCoE)!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.2)' }} loading="lazy" />
            </div>
          </div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3 bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 shadow-2xl">
            <h3 className="text-2xl md:text-4xl font-black text-pccoe-blue mb-8 tracking-tight text-center md:text-left">Send Direct Message</h3>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* 🚀 Footer Section */}
      <footer className="bg-[#030712] py-16 md:py-20 px-6 md:px-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-4 md:gap-6 text-center md:text-left">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl md:rounded-3xl p-2.5 md:p-3 flex items-center justify-center">
              <Image src="/pccoe _logo.jpg" alt="Logo" width={40} height={40} className="object-contain" />
            </div>
            <div>
              <h4 className="text-lg md:text-2xl font-black text-white uppercase tracking-tighter">Dr. Ajay Gaikwad</h4>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-[8px] md:text-[9px] mt-1">HoD Civil Engineering • PCCoE Pune</p>
            </div>
          </div>
          <div className="flex gap-6 md:gap-10">
            <a href={cvData.profile.socials.youtube} className="p-3 md:p-4 bg-white/5 rounded-full text-white hover:bg-pccoe-gold hover:text-pccoe-blue transition-all"><Youtube size={20} /></a>
            <a href={`mailto:${cvData.profile.email}`} className="p-3 md:p-4 bg-white/5 rounded-full text-white hover:bg-white hover:text-black transition-all"><Mail size={20} /></a>
          </div>
        </div>
        <div className="mt-16 md:mt-20 pt-10 border-t border-white/5 text-center">
          <p className="text-white/20 font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-[7px] md:text-[8px]">© 2026 PCCoE Civil Engineering • Precision in Research • Integrity in service</p>
        </div>
      </footer>
    </main>
  );
}
