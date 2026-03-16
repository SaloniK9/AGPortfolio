import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ContentCards from '../components/ContentCards';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Page body */}
      <div className="max-w-7xl mx-auto w-full px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar (sticky on desktop) */}
        <div className="lg:sticky lg:top-[112px] lg:self-start">
          <Sidebar />
        </div>

        {/* Main content feed */}
        <div className="flex-1 min-w-0">
          <ContentCards />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1A237E] text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-center md:text-left">
            <p className="font-bold text-sm">Dr. Ajay Krishnath Gaikwad</p>
            <p className="text-white/60 text-xs">Professor & HoD, Civil Engineering · PCCoE Pune</p>
          </div>
          <div className="text-center text-xs text-white/60">
            <p>Scopus: 57210729258 · ORCID: 0000-0002-2412-6308</p>
            <p className="mt-0.5">© {new Date().getFullYear()} · Built with Next.js · Tailwind CSS</p>
          </div>
          <div className="flex gap-3">
            <a href="mailto:ajay.gaikwad@pccoepune.org" className="text-white/70 hover:text-[#F9A825] text-xs transition-colors">✉️ Email</a>
            <a href="https://www.youtube.com/channel/UCzggPV5gezmNMKmenzi1nYA" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-red-400 text-xs transition-colors">▶ YouTube</a>
            <a href="https://wa.me/919822406840" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-green-400 text-xs transition-colors">💬 WhatsApp</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
