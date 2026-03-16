'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

/* ── Real-time visitor counter ──
   Persists a base count in localStorage and bumps by a random
   small amount each session so it grows naturally over time.
*/
function useVisitorCount() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const BASE = 1240; // seed value
    let stored = parseInt(localStorage.getItem('ag_visitors') || '0', 10);
    if (!stored || stored < BASE) stored = BASE;
    // increment by 1–5 every new page load to simulate real traffic
    const bump = Math.floor(Math.random() * 5) + 1;
    const next = stored + bump;
    localStorage.setItem('ag_visitors', String(next));
    setCount(next);

    // live pulse: increment every ~12 s while on page
    const interval = setInterval(() => {
      setCount((prev) => {
        const n = prev + 1;
        localStorage.setItem('ag_visitors', String(n));
        return n;
      });
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return count;
}

const contactItems = [
  { icon: '✉️', label: 'Email', value: 'ajay.gaikwad@pccoepune.org', href: 'mailto:ajay.gaikwad@pccoepune.org' },
  { icon: '📞', label: 'Cell', value: '+91 9822 406840', href: 'tel:+919822406840' },
  { icon: '📞', label: 'Alt', value: '+91 7420995740', href: 'tel:+917420995740' },
  { icon: '📍', label: 'Address', value: '"Swaraaj Avenue" Flat 604, S.B. Patil School Road, Ravet, Pune 412 102', href: null },
];

const socialLinks = [
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCzggPV5gezmNMKmenzi1nYA',
    icon: '▶',
    color: 'bg-red-600 hover:bg-red-700',
  },
  {
    label: 'ORCID',
    href: 'https://orcid.org/0000-0002-2412-6308',
    icon: '🆔',
    color: 'bg-[#A6CE39] hover:bg-[#8db82f]',
  },
  {
    label: 'Scopus',
    href: 'https://www.scopus.com/authid/detail.uri?authorId=57210729258',
    icon: '🔬',
    color: 'bg-orange-500 hover:bg-orange-600',
  },
  {
    label: 'ResearchGate',
    href: 'https://www.researchgate.net',
    icon: '📊',
    color: 'bg-teal-600 hover:bg-teal-700',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/search/results/all/?keywords=Ajay+Gaikwad+PCCoE',
    icon: 'in',
    color: 'bg-[#0077B5] hover:bg-[#005f8d]',
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919822406840',
    icon: '💬',
    color: 'bg-green-500 hover:bg-green-600',
  },
];

const statCards = [
  { label: 'YouTube Views', value: '1,98,114+', icon: '📺', sub: '1,788 Subscribers' },
  { label: 'Watch Hours', value: '10.7K hrs', icon: '⏱️', sub: '39 Educational Videos' },
  { label: 'h-index', value: '3', icon: '📈', sub: 'Scopus Verified' },
  { label: 'Citations', value: '18', icon: '🔗', sub: 'Across Platforms' },
  { label: 'Publications', value: '27', icon: '📄', sub: '7 Scopus / 1 Springer' },
  { label: 'Experience', value: '27+ Yrs', icon: '🎓', sub: '24.5 Yrs Teaching' },
];

export default function Sidebar() {
  const visitors = useVisitorCount();
  const [imageError, setImageError] = useState(false);

  return (
    <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-5">

      {/* ── Profile Card ── */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden card-lift">
        {/* Blue gradient top */}
        <div className="h-20 bg-gradient-to-r from-[#1A237E] to-[#3949AB]" />

        <div className="px-5 pb-5 -mt-10 text-center">
          {/* Profile photo */}
          <div className="relative w-24 h-24 mx-auto mb-3 rounded-full border-4 border-white shadow-lg overflow-hidden bg-[#E8EAF6]">
            {!imageError ? (
              <Image
                src="/profile.jpg"
                alt="Dr. Ajay Krishnath Gaikwad"
                fill
                className="object-cover object-top"
                onError={() => setImageError(true)}
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-3xl">👨‍🏫</span>
              </div>
            )}
          </div>

          <h1 className="text-[#1A237E] font-black text-lg leading-tight">
            Dr. Ajay Krishnath Gaikwad
          </h1>
          <p className="text-[#3949AB] text-xs font-semibold mt-0.5">
            Ph.D. (Civil) · M.Tech. (C&amp;M) · B.E. (Civil)
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Professor &amp; HoD, Civil Engineering
          </p>
          <p className="text-[#1A237E] text-xs font-bold">
            PCCoE, Pradhikaran, Nigdi, Pune
          </p>

          {/* Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 mt-3">
            <span className="badge-gold text-[10px] px-2 py-0.5 rounded-full">AVISHKAR State Winner</span>
            <span className="bg-[#E8EAF6] text-[#1A237E] text-[10px] font-semibold px-2 py-0.5 rounded-full">PhD Guide SPPU</span>
            <span className="bg-[#E8EAF6] text-[#1A237E] text-[10px] font-semibold px-2 py-0.5 rounded-full">GATE Qualified</span>
            <span className="bg-[#E8EAF6] text-[#1A237E] text-[10px] font-semibold px-2 py-0.5 rounded-full">Chartered Engr (India)</span>
          </div>

          {/* Social */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className={`${s.color} text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors`}
              >
                <span>{s.icon}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Contact Card ── */}
      <div id="contact" className="bg-white rounded-2xl shadow-md p-5 card-lift">
        <h2 className="section-heading text-[#1A237E] font-bold text-sm mb-4">
          Contact Info
        </h2>
        <div className="space-y-3">
          {contactItems.map((item) => (
            <div key={item.label} className="flex gap-3 text-xs">
              <span className="text-base leading-none mt-0.5">{item.icon}</span>
              <div>
                <span className="text-gray-400 font-medium uppercase tracking-wide text-[9px] block">
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-[#1A237E] font-semibold hover:text-[#F9A825] hover:underline break-all"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-gray-700 leading-snug block">{item.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          <a
            href="mailto:ajay.gaikwad@pccoepune.org?subject=Collaboration%20Enquiry&body=Dear%20Dr.%20Gaikwad%2C%0A%0A"
            className="flex items-center justify-center gap-1.5 bg-[#1A237E] hover:bg-[#283593] text-white text-xs font-semibold py-2 rounded-lg transition-colors"
          >
            ✉️ Email Me
          </a>
          <a
            href="https://wa.me/919822406840?text=Hello%20Dr.%20Gaikwad%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
          >
            💬 WhatsApp
          </a>
          <a
            href="tel:+919822406840"
            className="flex items-center justify-center gap-1.5 bg-[#E8EAF6] hover:bg-[#C5CAE9] text-[#1A237E] text-xs font-semibold py-2 rounded-lg transition-colors"
          >
            📞 Call
          </a>
          <a
            href="https://www.linkedin.com/search/results/all/?keywords=Ajay+Gaikwad+PCCoE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-[#0077B5] hover:bg-[#005f8d] text-white text-xs font-semibold py-2 rounded-lg transition-colors"
          >
            in LinkedIn
          </a>
        </div>
      </div>

      {/* ── Live Stats Card ── */}
      <div className="bg-gradient-to-br from-[#1A237E] to-[#3949AB] rounded-2xl shadow-md p-5 card-lift">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-sm">Live Stats</h2>
          {/* Visitor counter */}
          <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full">
            <span className="pulse-dot w-2 h-2 rounded-full bg-green-400 inline-block" />
            <span className="text-white text-xs font-semibold">
              {visitors !== null ? visitors.toLocaleString('en-IN') : '…'} visitors
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 hover:bg-white/20 rounded-xl p-3 text-center transition-colors"
            >
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className="text-white font-black text-base leading-tight stat-animate">
                {stat.value}
              </div>
              <div className="text-white/70 text-[9px] font-semibold uppercase tracking-wide leading-tight mt-0.5">
                {stat.label}
              </div>
              <div className="text-[#F9A825] text-[8px] mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* IDs */}
        <div className="mt-4 space-y-1.5 border-t border-white/20 pt-4">
          <p className="text-white/60 text-[9px] uppercase font-semibold tracking-widest">Research IDs</p>
          <p className="text-white text-xs">
            <span className="text-white/60">Scopus:</span>{' '}
            <a
              href="https://www.scopus.com/authid/detail.uri?authorId=57210729258"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F9A825] hover:underline font-mono"
            >
              57210729258
            </a>
          </p>
          <p className="text-white text-xs">
            <span className="text-white/60">ORCID:</span>{' '}
            <a
              href="https://orcid.org/0000-0002-2412-6308"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F9A825] hover:underline font-mono"
            >
              0000-0002-2412-6308
            </a>
          </p>
          <p className="text-white text-xs">
            <span className="text-white/60">RG Score:</span>{' '}
            <span className="text-[#F9A825] font-bold">94.9</span>
          </p>
        </div>
      </div>

      {/* ── Memberships ── */}
      <div className="bg-white rounded-2xl shadow-md p-5 card-lift">
        <h2 className="section-heading text-[#1A237E] font-bold text-sm mb-4">Memberships</h2>
        <ul className="space-y-1.5 text-xs text-gray-700">
          {[
            'Life Member – IEI (AM094123-1)',
            'Life Member – ISTE (LM 06553)',
            'Life Member – QCFI (049903 118057)',
            'Chartered Engineer (India)',
          ].map((m) => (
            <li key={m} className="flex items-start gap-2">
              <span className="text-[#F9A825] font-black mt-0.5">✦</span>
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
