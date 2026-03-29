"use client";

import { motion } from "framer-motion";

const updates = [
  "Professor & Head of Civil Engineering Department (Since May 2024)",
  "PhD Guide at SPPU - Currently guiding research in PCB Slag and Concrete",
  "Winner of AVISHKAR 2016 - State Level Guided Research Excellence",
  "3 Patents Filed: RMC Optimizer, Survey Calculator, PET Concrete",
  "YouTube Educational Hub: 1.9L+ Views on Engineering Mechanics",
  "Former Associate Dean of Student Development & Welfare (4 years)",
  "Resource Person for 30+ NBA, BoS, and FDP Sessions",
];

export default function BrandingTicker() {
  return (
    <div className="w-full bg-pccoe-blue/80 backdrop-blur-md border-y border-white/5 py-3 overflow-hidden">
      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex gap-12 items-center"
        >
          {/* Repeat set 3 times for a smooth continuous loop */}
          {[...updates, ...updates, ...updates].map((text, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-pccoe-gold" />
              <span className="text-white font-black text-[10px] uppercase tracking-widest">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
