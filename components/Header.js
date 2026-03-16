'use client';

import { useState, useEffect, useRef } from 'react';

const TICKER_ITEMS = [
  '🏆 AVISHKAR 2018 – Maharashtra STATE WINNER: "DiScO for RMC Trucks" (Teacher Category, Engg. & Technology)',
  '🥈 AVISHKAR 2017 – Maharashtra State Level 2nd Rank (UG Project)',
  '🎓 PhD Guide – Savitribai Phule Pune University (SPPU) since Aug 2022',
  '📚 27 Research Publications | h-index: 3 | 18 Citations (Scopus)',
  '▶️ 1.98 Lakh YouTube Views | 1788+ Subscribers | 10.7K Watch Hours',
  '📖 Book: "Engineering Mechanics" – Nirali Prakashan (3rd Ed. 2023)',
  '🏛️ Professor & HoD, Civil Engineering – PCCoE Pune since May 2024',
  '🔬 GATE Qualified (2002 & 2006) | DRDO JRF | MPSC Mains Qualified',
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Research', href: '#research' },
    { label: 'Publications', href: '#publications' },
    { label: 'Teaching', href: '#teaching' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'shadow-lg' : ''
      }`}
    >
      {/* ── Institution Banner ── */}
      <div className="bg-[#1A237E] px-4 py-2 flex items-center gap-3">
        {/* Logo placeholder */}
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <span className="text-white font-black text-sm">PCCoE</span>
        </div>
        <div className="text-white leading-tight">
          <p className="text-[10px] font-light tracking-widest uppercase opacity-80">
            Pimpri Chinchwad College of Engineering, Pune
          </p>
          <p className="text-sm font-bold">
            Department of Civil Engineering
          </p>
        </div>

        {/* NAAC badge */}
        <div className="ml-auto hidden md:flex items-center gap-2">
          <span className="badge-gold text-xs px-2 py-0.5 rounded-full">
            NAAC 'A' Accredited
          </span>
          <span className="badge-gold text-xs px-2 py-0.5 rounded-full">
            NBA Approved
          </span>
        </div>
      </div>

      {/* ── Nav Bar ── */}
      <div className="bg-[#283593]" ref={menuRef}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-12">
          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded text-sm font-medium transition-all duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* External links */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.youtube.com/channel/UCzggPV5gezmNMKmenzi1nYA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
            >
              ▶ YouTube
            </a>
            <a
              href="https://orcid.org/0000-0002-2412-6308"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-[#A6CE39] hover:bg-[#8db82f] text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
            >
              ORCID
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-white p-2 rounded hover:bg-white/10"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            <span className="block w-5 h-0.5 bg-white mb-1" />
            <span className="block w-5 h-0.5 bg-white mb-1" />
            <span className="block w-5 h-0.5 bg-white" />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#1A237E] border-t border-white/10 px-4 py-2 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2 pb-1">
              <a
                href="https://www.youtube.com/channel/UCzggPV5gezmNMKmenzi1nYA"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                ▶ YouTube
              </a>
              <a
                href="https://orcid.org/0000-0002-2412-6308"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#A6CE39] text-white text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                ORCID
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ── News Ticker ── */}
      <div className="bg-[#F9A825] overflow-hidden">
        <div className="flex items-center h-8">
          <span className="shrink-0 bg-[#1A237E] text-white text-[10px] font-black uppercase tracking-widest px-3 h-full flex items-center">
            🏆 News
          </span>
          <div className="overflow-hidden flex-1 relative">
            <span className="ticker-track text-[#1A237E] text-xs font-semibold">
              {TICKER_ITEMS.join('   ✦   ')}
              &nbsp;&nbsp;&nbsp;
              {TICKER_ITEMS.join('   ✦   ')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
