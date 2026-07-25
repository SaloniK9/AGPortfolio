"use client";

import { motion } from "framer-motion";
import { BadgeCheck, BookOpen, Briefcase, GraduationCap, Linkedin, Mail, type LucideIcon } from "lucide-react";

type AcademicProfileItem = {
  title: string;
  href: string;
  description: string;
  icon: "GraduationCap" | "BookOpen" | "BadgeCheck" | "Briefcase" | "Mail" | "Linkedin";
};

const iconMap: Record<AcademicProfileItem["icon"], LucideIcon> = {
  GraduationCap,
  BookOpen,
  BadgeCheck,
  Briefcase,
  Mail,
  Linkedin,
};

export default function AcademicProfiles({ items }: { items: AcademicProfileItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {items.map((item, index) => {
        const Icon = iconMap[item.icon];

        return (
          <motion.a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.05 }}
            className="group flex items-start justify-between gap-4 rounded-[1.5rem] border border-slate-100 bg-white/90 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-pccoe-blue/40 hover:shadow-[0_24px_70px_rgba(15,23,42,0.09)]"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pccoe-blue/10 text-pccoe-blue transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-pccoe-blue">{item.title}</h3>
                <p className="mt-1 text-sm font-medium leading-relaxed text-slate-500">{item.description}</p>
              </div>
            </div>
            <div className="rounded-full bg-slate-50 p-2 text-slate-400 transition-colors duration-300 group-hover:bg-pccoe-blue/10 group-hover:text-pccoe-blue">
              <motion.span whileHover={{ rotate: 12 }}>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </motion.span>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
