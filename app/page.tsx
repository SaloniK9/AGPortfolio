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
      <nav className="fixed top-0 left-0 right-0 h-24 bg-white/90 backdrop-blur-2xl z-[150] shadow-sm border-b border-gray-100 px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-pccoe-blue rounded-2xl flex items-center justify-center p-2 shadow-2xl transition-transform hover:rotate-3">
             <Image src="/pccoe_logo.jpg" alt="PCCoE Logo" width={40} height={40} className="invert" />
          </div>
          <div>
            <h2 className="text-pccoe-blue font-black tracking-tighter text-xl uppercase leading-none">PCCoE Pune</h2>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">Research Excellence</p>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-2">
          {["home", "about", "experience", "research", "achievements", "publications", "projects", "contact"].map((section) => (
            <a 
              key={section}
              href={`#${section}`}
              onClick={() => setActiveSection(section)}
              className={`nav-link capitalize ${activeSection === section ? "active" : ""}`}
            >
              {section}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-3 bg-gray-50 rounded-2xl text-pccoe-blue hover:bg-gray-100 transition-colors">
          {isMenuOpen ? <X /> : <Menu />}
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
                className="text-4xl font-black text-pccoe-blue uppercase tracking-tighter hover:text-pccoe-red transition-colors"
              >
                {section}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚀 Hero Section (#home) */}
      <section id="home" className="relative min-h-screen pt-24 overflow-hidden flex items-center">
        {/* BG Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-white pointer-events-none" />
        
        <div className="container mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Left */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            style={{ y: heroImageY }}
            className="relative w-full max-w-lg aspect-[5/6] mx-auto lg:mx-0 group"
          >
            <div className="absolute -inset-6 bg-pccoe-blue/5 rounded-[4rem] blur-3xl group-hover:bg-pccoe-blue/10 transition-colors" />
            <div className="relative h-full w-full rounded-[3rem] overflow-hidden border-8 border-white shadow-[0_32px_64px_rgba(0,0,0,0.1)] transition-transform duration-700 hover:scale-[1.02]">
              <Image 
                src="/ag-sir.jpg" 
                alt="Dr. Ajay Gaikwad"
                fill
                className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent flex items-end p-12">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-white text-center border border-white/20">
                      <p className="text-xl font-black leading-none">27+</p>
                      <p className="text-[8px] uppercase font-bold tracking-widest mt-1">Exp.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-white text-center border border-white/20">
                      <p className="text-xl font-black leading-none">07</p>
                      <p className="text-[8px] uppercase font-bold tracking-widest mt-1">Scopus</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-white text-center border border-white/20">
                      <p className="text-xl font-black leading-none">PhD</p>
                      <p className="text-[8px] uppercase font-bold tracking-widest mt-1">Guide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Right Massive */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center lg:text-left space-y-10"
          >
            <div className="space-y-4">
              <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-7xl lg:text-9xl font-black text-pccoe-blue tracking-tighter leading-[0.85]"
              >
                Dr. Ajay K<br />
                <span className="text-pccoe-blue/20 outline-text text-white">Gaikwad</span>
              </motion.h1>
              <h2 className="text-3xl lg:text-5xl font-black text-pccoe-red tracking-tight max-w-xl">
                Professor & HoD Civil Engineering at PCCoE
              </h2>
            </div>
            
            <p className="text-xl text-gray-500 font-medium max-w-lg leading-relaxed">
              Pioneering excellence in Academic Leadership, Construction Management, and Strategic R&D for over two decades.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <a href="#about" className="group flex items-center gap-6 px-10 py-6 bg-pccoe-blue text-white rounded-full font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:bg-black hover:scale-105 transition-all">
                Scroll & Explore
                <ChevronDown className="w-5 h-5 animate-bounce" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🚀 About Section (#about) */}
      <section id="about" className="section-white">
        <div className="container mx-auto">
          <div className="flex flex-col items-center mb-20">
             <h2 className="text-5xl lg:text-6xl font-black text-pccoe-blue uppercase tracking-tighter mb-4">Foundation</h2>
             <div className="h-1.5 w-24 bg-pccoe-gold rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Bio Card */}
            <div className="lg:col-span-2 clean-card p-12 bg-white flex flex-col md:flex-row gap-12 items-center">
              <div className="w-48 h-48 rounded-full border-4 border-pccoe-gold/20 p-2 shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden relative border-2 border-white">
                  <Image src="/ag-sir.jpg" alt="About" fill className="object-cover" />
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-3xl font-black text-pccoe-blue">Dr. Ajay Krishnath Gaikwad</h3>
                <p className="text-lg text-gray-600 leading-relaxed font-medium capitalize">
                  Building the future of civil engineering through research leadership at Pimpri Chinchwad College of Engineering (PCCoE), Pune. With 27 years of dedicated service across teaching, industry, and R&D.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[9px] uppercase font-black text-gray-400 tracking-widest mb-1">Email Domain</p>
                    <p className="text-sm font-bold text-pccoe-blue truncate">{cvData.profile.email}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[9px] uppercase font-black text-gray-400 tracking-widest mb-1">Birth Anniversary</p>
                    <p className="text-sm font-bold text-pccoe-blue">{cvData.profile.dob}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quals Table */}
            <div className="clean-card p-10 bg-pccoe-blue text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <GraduationCap className="w-32 h-32" />
              </div>
              <h4 className="text-xl font-black uppercase tracking-widest text-white/50 mb-8 pt-4">Academic Qualifications</h4>
              <div className="space-y-8 relative z-10">
                {cvData.academicQualifications.map((q, i) => (
                  <div key={i} className="group border-b border-white/10 pb-4 last:border-0 hover:border-white/30 transition-colors">
                    <p className="text-pccoe-gold font-black text-sm uppercase">{q.degree}</p>
                    <p className="text-lg font-bold leading-tight mt-1">{q.institution}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-2">{q.year} • {q.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 Experience Timeline (#experience) */}
      <section id="experience" className="section-gray">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center mb-24">
             <h2 className="text-5xl lg:text-6xl font-black text-pccoe-blue uppercase tracking-tighter mb-4">Legacy in Action</h2>
             <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">A professional journey spanning nearly 3 decades</p>
          </div>

          <div className="relative border-l-4 border-pccoe-blue/10 ml-6 md:ml-12 space-y-16">
            {cvData.experienceTimeline.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-12 group"
              >
                {/* Connector Dot */}
                <div className="absolute left-[-12px] top-4 w-5 h-5 bg-white border-4 border-pccoe-blue rounded-full group-hover:scale-150 transition-transform duration-300 z-10" />
                
                <div className="clean-card p-8 bg-white border-l-[12px] border-pccoe-blue">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <span className="px-4 py-1.5 bg-pccoe-blue text-white rounded-full text-[10px] font-black uppercase tracking-widest w-fit">
                        {item.duration}
                      </span>
                      <span className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest">
                        <MapPin className="w-4 h-4" />
                        {item.location}
                      </span>
                   </div>
                   <h3 className="text-3xl font-black text-pccoe-blue tracking-tight leading-none mb-4">{item.role}</h3>
                   <p className="text-gray-500 font-medium">Delivering academic standards and departmental leadership at {item.location}.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 Research (#research) */}
      <section id="research" className="section-white relative overflow-hidden">
        {/* Subtle pattern background for Research */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }} />
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col items-center mb-20 text-center">
             <h2 className="text-5xl lg:text-6xl font-black text-pccoe-blue uppercase tracking-tighter mb-4">Innovation & Research</h2>
             <p className="text-gray-500 font-bold uppercase tracking-widest text-xs max-w-2xl px-6">Optimizing the core of Civil Engineering construction processes.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* PhD Spotlight Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] shadow-2xl border-2 border-gray-50 p-12 relative overflow-hidden group"
            >
              <div className="absolute -top-10 -right-10 p-20 bg-pccoe-blue/5 rounded-full blur-3xl" />
              <div className="relative z-10 flex flex-col gap-10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-pccoe-gold/20 rounded-2xl flex items-center justify-center p-3">
                    <Cpu className="w-full h-full text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-pccoe-blue leading-none">PhD Focus</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 mt-1 italic">RMC Optimization Specialist</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xl font-bold italic text-gray-700 leading-tight">"{cvData.phd.title}"</h4>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    {cvData.phd.abstract}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                  <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 group-hover:bg-amber-50 group-hover:border-amber-100 transition-colors">
                    <p className="text-[9px] uppercase font-black text-gray-400 mb-2">Completion</p>
                    <p className="text-lg font-black text-gray-800">{cvData.phd.completed}</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <p className="text-[9px] uppercase font-black text-gray-400 mb-2">Research Guide</p>
                    <p className="text-lg font-black text-gray-800">{cvData.phd.guide}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {cvData.phd.keywords.map((k, i) => (
                    <span key={i} className="px-4 py-1.5 bg-pccoe-blue/5 border border-pccoe-blue/10 text-[10px] uppercase font-black text-pccoe-blue rounded-full tracking-wider">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* YouTube & Digital Outreach Card */}
            <div className="space-y-12">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
                className="bg-red-600 rounded-[3rem] p-12 text-white shadow-[0_32px_64px_rgba(220,38,38,0.2)] flex flex-col justify-between h-full relative group"
              >
                <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                <div className="relative z-10 flex items-center justify-between mb-16">
                   <div className="p-4 bg-white/20 rounded-3xl backdrop-blur-xl">
                      <Youtube className="w-10 h-10" />
                   </div>
                   <a href={cvData.profile.socials.youtube} target="_blank" className="bg-white text-red-600 px-6 py-2.5 rounded-full font-black uppercase tracking-widest text-[9px] hover:bg-black hover:text-white transition-all">
                      Open Channel
                   </a>
                </div>

                <div className="relative z-10 space-y-6">
                  <h3 className="text-4xl font-black tracking-tighter shadow-sm">Over 1.9 Lakh+ Virtual Lectures Conducted.</h3>
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-3xl font-black">1600+</p>
                      <p className="text-[9px] uppercase font-bold tracking-widest text-white/50">Engineers Subscribed</p>
                    </div>
                    <div className="h-10 w-px bg-white/20" />
                    <div>
                      <p className="text-3xl font-black">39</p>
                      <p className="text-[9px] uppercase font-bold tracking-widest text-white/50">Core Videos</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 mt-10 pt-10 border-t border-white/10 uppercase font-black text-[9px] tracking-widest text-white/60">
                  Focus: Engineering Mechanics • Applied Surveying • SOM
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 Achievements Section (#achievements) */}
      <section id="achievements" className="section-gray relative">
        <div className="container mx-auto">
          <div className="flex flex-col items-center mb-24">
             <h2 className="text-5xl lg:text-6xl font-black text-pccoe-blue uppercase tracking-tighter mb-4">Milestones reached</h2>
             <div className="h-1.5 w-24 bg-pccoe-gold rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "GATE Qualified", val: "AIR 2439", desc: "Top National percentile rank twice in Civil Engg.", icon: Trophy, color: "text-amber-500" },
              { title: "Research Patents", val: "03 Filed", desc: "Innovations in RMC, Concrete Waste & Area Calculation.", icon: Zap, color: "text-blue-600" },
              { title: "Avishkar Winner", val: "State Level", desc: "Recognized by University for guided research excellence.", icon: Award, color: "text-pccoe-red" },
              { title: "Expert Roles", val: "30+ Invitations", desc: "NBA Expert, BoS, Session Chair & External PhD Guide.", icon: Briefcase, color: "text-emerald-600" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="gold-card p-10 group bg-white"
              >
                <div className={`p-4 bg-gray-50 rounded-2xl w-fit mb-8 group-hover:scale-110 transition-transform ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <h4 className="text-4xl font-black text-pccoe-blue mb-2 tracking-tighter">{stat.val}</h4>
                <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">{stat.title}</p>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 Publications (#publications) */}
      <section id="publications" className="section-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-start">
            <div className="lg:col-span-1 space-y-10">
               <div>
                  <h2 className="text-5xl lg:text-7xl font-black text-pccoe-blue uppercase tracking-tighter mb-4">Scholarly Works</h2>
                  <div className="h-1.5 w-24 bg-pccoe-gold rounded-full" />
               </div>
               <p className="text-xl text-gray-500 font-medium leading-relaxed capitalize">
                 Active contributor to global research bodies with focus on concrete technology and logistics optimization.
               </p>
               <div className="space-y-4">
                  <div className="flex items-end gap-6 p-8 bg-gray-50 border-2 border-slate-100 rounded-[2.5rem] group hover:border-pccoe-blue transition-colors cursor-pointer">
                    <span className="text-7xl font-black text-pccoe-blue tabular-nums leading-none">07</span>
                    <div>
                      <p className="text-lg font-black text-pccoe-blue uppercase leading-none">Scopus Indexed</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">High Impact Factor</p>
                    </div>
                  </div>
               </div>
            </div>

            <div className="lg:col-span-2 clean-card p-4 bg-white/50 backdrop-blur pb-12">
               {/* TABS HEADERS */}
               <div className="flex bg-gray-50 p-2 rounded-2xl mb-8">
                  {["scopus", "journals", "conferences"].map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${
                        activeTab === tab ? "bg-pccoe-blue text-white shadow-xl" : "text-gray-400 hover:text-pccoe-blue hover:bg-white"
                      }`}
                    >
                      {tab} Works
                    </button>
                  ))}
               </div>

               {/* TAB CONTENT */}
               <div className="px-8 space-y-4">
                 <AnimatePresence mode="wait">
                   <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                   >
                     {activeTab === "scopus" ? (
                       cvData.research.publications.highlights.map((pub, i) => (
                         <div key={i} className="group p-6 rounded-[2rem] border border-gray-100 bg-white hover:border-pccoe-blue hover:shadow-2xl transition-all flex items-center justify-between gap-6">
                            <div className="flex-1">
                               <p className="text-xs font-black uppercase tracking-widest text-pccoe-gold mb-2">Impact Highlight 0{i+1}</p>
                               <h4 className="text-lg font-black text-pccoe-blue leading-tight">{pub}</h4>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-full text-gray-300 group-hover:text-pccoe-blue transition-colors">
                               <ExternalLink className="w-5 h-5" />
                            </div>
                         </div>
                       ))
                     ) : (
                       <div className="p-20 text-center">
                          <BookOpen className="w-16 h-16 text-gray-100 mx-auto mb-6" />
                          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Accessing Research Repository...</p>
                       </div>
                     )}
                   </motion.div>
                 </AnimatePresence>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 Projects Section (#projects) */}
      <section id="projects" className="section-gray">
        <div className="container mx-auto">
           <div className="flex flex-col items-center mb-24 text-center">
             <h2 className="text-5xl lg:text-6xl font-black text-pccoe-blue uppercase tracking-tighter mb-4">Academic projects</h2>
             <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Transforming concepts into industrial impact</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <div className="clean-card p-10 bg-white">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                      <LayoutGrid className="w-6 h-6" />
                   </div>
                   <h3 className="text-3xl font-black text-pccoe-blue">PG Major Projects (10+)</h3>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="border-b-2 border-gray-50">
                            <th className="py-4 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Project Realm</th>
                            <th className="py-4 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Papers / Honors</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                         {cvData.projects.themes.slice(0, 5).map((theme, i) => (
                           <tr key={i} className="group hover:bg-emerald-50/50 transition-colors">
                              <td className="py-5 font-bold text-slate-800">{theme} Engineering</td>
                              <td className="py-5"><span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[8px] font-black uppercase rounded-full">Scopus/Conf Support</span></td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>

             <div className="clean-card p-10 bg-white">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                      <Briefcase className="w-6 h-6" />
                   </div>
                   <h3 className="text-3xl font-black text-pccoe-blue">UG Mini/Major (12+)</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {cvData.projects.themes.map((theme, i) => (
                     <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-200 transition-colors">
                        <p className="text-sm font-black text-slate-700">{theme}</p>
                        <p className="text-[9px] uppercase font-bold text-blue-400 mt-1">Prototype Developed</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 🚀 Contact Section (#contact) */}
      <section id="contact" className="py-32 px-8 lg:px-24 bg-gradient-to-br from-[#0c1020] to-[#1A237E] relative overflow-hidden">
        {/* Abstract shapes for dark section */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.03] rounded-full blur-[120px]" />
        
        <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-20">
          <div className="lg:col-span-2 space-y-12">
             <div className="space-y-6">
                <h2 className="text-6xl font-black text-white uppercase tracking-tighter leading-none">Get in<br/><span className="text-pccoe-gold">Touch</span></h2>
                <div className="h-1.5 w-24 bg-pccoe-gold/50 rounded-full" />
                <p className="text-white/50 font-bold uppercase tracking-widest text-[10px]">Direct Department Line of Communication</p>
             </div>

             <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                   <div className="w-14 h-14 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-pccoe-gold/20 group-hover:border-pccoe-gold transition-all">
                      <Mail className="w-6 h-6 text-white" />
                   </div>
                   <div>
                      <p className="text-white/40 font-black uppercase tracking-widest text-[8px] mb-2">Academic Correspondence</p>
                      <p className="text-xl font-bold text-white group-hover:text-pccoe-gold transition-colors">{cvData.profile.email}</p>
                   </div>
                </div>

                <div className="flex items-start gap-6 group">
                   <div className="w-14 h-14 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-400/20 group-hover:border-blue-400 transition-all">
                      <MapPin className="w-6 h-6 text-white" />
                   </div>
                   <div>
                      <p className="text-white/40 font-black uppercase tracking-widest text-[8px] mb-2">Campus Location</p>
                      <p className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Sector 26, Nigdi, Pradhikaran, Pune</p>
                   </div>
                </div>
             </div>

             <div className="w-full aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl bg-white/5">
                {/* Embedded Map Visual */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.2732924194!2d73.7591782!3d18.6517316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e76349ad1b%3A0x63806444853018e6!2sPimpri%20Chinchwad%20College%20of%20Engineering%20(PCCoE)!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.2)' }} 
                  loading="lazy"
                />
             </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-white rounded-[3rem] p-12 lg:p-16 shadow-2xl"
          >
             <h3 className="text-4xl font-black text-pccoe-blue mb-10 tracking-tight">Direct Messaging to HoD</h3>
             <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* 🚀 Footer Section */}
      <footer className="bg-[#030712] py-20 px-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-3xl p-3 flex items-center justify-center">
                <Image src="/pccoe _logo.jpg" alt="Logo" width={30} height={30} />
              </div>
              <div>
                <h4 className="text-0.5xl font-black text-white uppercase tracking-tighter">Dr. Ajay Gaikwad</h4>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-[9px] mt-1">HoD Civil Engineering • PCCoE Pune</p>
              </div>
           </div>

           <div className="flex gap-10">
              <a href={cvData.profile.socials.youtube} className="p-4 bg-white/5 rounded-full text-white hover:bg-pccoe-gold hover:text-pccoe-blue transition-all">
                <Youtube className="w-6 h-6" />
              </a>
              <a href={`mailto:${cvData.profile.email}`} className="p-4 bg-white/5 rounded-full text-white hover:bg-white hover:text-black transition-all">
                <Mail className="w-6 h-6" />
              </a>
           </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 text-center">
            <p className="text-white/20 font-black uppercase tracking-[0.6em] text-[8px]">© 2026 PCCoE Civil Engineering • Precision In Architecture • Integrity In Service</p>
        </div>
      </footer>
    </main>
  );
}
