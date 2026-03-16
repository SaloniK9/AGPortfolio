'use client';

import { useState } from 'react';

/* ─────────────────────────── DATA ─────────────────────────── */

const scopusPublications = [
  { year: 2019, title: 'Genetic Algorithm based Optimized Un-Interrupted Dispatching Schedule for RMC Truck', journal: 'IJRTE (Scopus)', if: '5.92' },
  { year: 2019, title: 'App for Optimizing Number of Trucks for Dispatching Operation of Concrete Plant', journal: 'IJITEE (Scopus)', if: '5.54' },
  { year: 2022, title: 'Waste Water Management for Small Village', journal: 'YMER Digital (Scopus)', if: '0.10' },
  { year: 2022, title: 'Un-Interrupted Dispatching Schedule of RMC', journal: 'YMER Digital (Scopus)', if: '0.10' },
  { year: 2022, title: 'Evaluation of Construction Labor Safety for High Rise Building', journal: 'YMER Digital (Scopus)', if: '0.10' },
  { year: 2022, title: 'Risk Management in Building Construction Project using Bow Tie', journal: 'JXAT (Scopus)', if: '3.7' },
  { year: 2023, title: 'Analysis of Defects in Concrete: A Literature Review', journal: 'IJRAR', if: '7.17' },
];

const intlJournals = [
  'Applications of GPS for RMC Truck Dispatching – IJRESTs',
  'Optimization of trucks for RMC plant using MATLAB App – JETIR (IF 5.87)',
  'RMC Dispatching Schedule: A Literature Review – IJEDR (IF 7.37)',
  'Low-Cost Water Heater Using Cow Dung – Pramana Research Journal (IF 6.2)',
  'Feasibility Study of Cow Dung Ash as Disinfectant – GRD Journal',
  'Complete Optimizer for RMC Dispatching Schedule – IJERT',
  'AHP for Feasibility of Ready Mix Concrete Plant – WHJJ (Ex-Scopus)',
  'RMC Multi-Plant Multi-Site: Literature Review – JETIR (IF 7.95)',
  'Risk Management in RMC Plant using FMEA and ANP – IJA-ERA',
  'Feasibility Study for Residential Construction Project – IRJET (IF 7.529)',
  'Six Sigma for Quality Evaluation at RMC Plant – IRJET (IF 7.529)',
  'M30 Grade Lightweight Concrete using Sintered Aggregate – IJSRA 2025',
];

const conferences = [
  { type: 'International', title: 'GA Application for Reducing Waiting Time of RMC Trucks', venue: 'ICST-2K14, Indapur', year: 2014 },
  { type: 'International', title: 'Optimization of Un-Interrupted Dispatching Schedule of RMC', venue: 'IAET-2014, Jaipur', year: 2014 },
  { type: 'International', title: 'Risk Management in Building Construction Project using Mathematical Tools', venue: 'i-MACE2022, PCCoE Pune', year: 2022 },
  { type: 'International', title: 'Steel Slag & Silica Sand as Replacement for Coarse/Fine Aggregate in Concrete', venue: 'ICSSMT 2023 / SPRINGER Nature', year: 2023 },
  { type: 'National', title: 'Truck Optimizer for RMC Dispatcher', venue: 'NCTR-2015, A. Pawar CoE', year: 2015 },
  { type: 'National', title: 'Prefabrication Smart Construction for Smart Cities', venue: 'NCTR-2016, A. Pawar CoE', year: 2016 },
  { type: 'National', title: 'Optimization of RMC Trucks Dispatching Schedule', venue: 'INNOVATION 2017, PICT Pune', year: 2017 },
  { type: 'National', title: 'Number of Trucks for RMC Plant using MATLAB App', venue: 'NCTR-2019, APCoE Parvati', year: 2019 },
];

const patents = [
  { no: 1, title: 'RMC Un-interrupted Dispatching Schedule Optimizer', appNo: '100/MUM/2015', date: '12/01/2015' },
  { no: 2, title: 'Area Calculation in Surveying for Closed Traverse using Cross Multiplication', appNo: '3031/MUM/2015', date: '11/08/2015' },
  { no: 3, title: 'Eco-Friendly Concrete Block Using PET Bottles in Construction', appNo: '201821000045', date: '01/01/2018' },
];

const springerChapter = {
  title: 'Progressive Investigation on Utilization of Steel Slag and Silica sand as partial replacement for Coarse and Fine Aggregate in Concrete',
  book: '2nd ICSSMT 2023 – Innovations in Engineering and Smart Sustainable Technologies (Vol. 2)',
  publisher: 'SPRINGER Nature',
  isbn: '978-3-031-50023-7',
  url: 'https://link.springer.com/chapter/10.1007/978-3-031-50024-4_12',
};

const achievements = [
  { icon: '🏆', text: 'Maharashtra STATE WINNER – AVISHKAR 2018 (Teacher Category, Engg. & Tech.)', highlight: true },
  { icon: '🥈', text: 'AVISHKAR 2017 – Maharashtra State Level 2nd Rank UG Project', highlight: true },
  { icon: '🎤', text: 'General Chair – iMACE 2023 International Conference (282 papers registered)', highlight: false },
  { icon: '📖', text: 'Book: "Engineering Mechanics" – Nirali Prakashan (1st Ed. 2019, 3rd Ed. 2023)', highlight: false },
  { icon: '🎓', text: 'GATE Qualified: 2002 (AIR 3842) & 2006 (AIR 2439)', highlight: false },
  { icon: '🏛️', text: 'MPSC Mains Qualified 2013 | PGCET Qualified 2013-14', highlight: false },
  { icon: '🔬', text: 'JRF at DRDO R&DE(E) Dighi, Pune (1999)', highlight: false },
  { icon: '🏅', text: '2nd Rank in B.E. (WIT Solapur, 1998) and 2nd Rank M.Tech. (CoE Pune, 2014)', highlight: false },
  { icon: '✏️', text: 'Best Paper Presentation – NCTR 2019', highlight: false },
  { icon: '📰', text: 'Executive Editor – "Samvaad" Monthly Newswire PCCoE (2021–2024)', highlight: false },
];

const funding = [
  { amount: '₹1,00,000', title: 'RMC Truck Dispatching Schedule Optimization', body: 'BCUD, SPPU Pune', period: '2016–18' },
  { amount: '₹2,00,000', title: 'ATAL Tunnel Study Tour (YUVAK Scheme)', body: 'AICTE', period: 'Oct 2021' },
  { amount: '₹3,45,000', title: 'Light Weight Concrete with Sintered Aggregates', body: 'ProCON / PCERF', period: 'Nov 2023 – Jun 2024' },
];

/* ─────────────────────────  REUSABLE CARD WRAPPER ───────────── */
function Card({ id, children, className = '' }) {
  return (
    <section
      id={id}
      className={`bg-white rounded-2xl shadow-md p-6 card-lift ${className}`}
    >
      {children}
    </section>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 className="section-heading text-[#1A237E] font-bold text-lg mb-5">
      {children}
    </h2>
  );
}

/* ─────────────────────────  TABS COMPONENT ───────────────────── */
function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex flex-wrap gap-2 mb-5">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => setActiveTab(t)}
          className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
            activeTab === t
              ? 'bg-[#1A237E] text-white border-[#1A237E]'
              : 'bg-white text-[#3949AB] border-[#C5CAE9] hover:border-[#1A237E]'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────── COMPONENTS ──────────────────────── */

function HodMessageCard() {
  return (
    <Card id="about">
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Quote area */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🎓</span>
            <div>
              <SectionHeading>Message from HoD</SectionHeading>
              <p className="text-[#3949AB] text-xs font-semibold -mt-4">
                Department of Civil Engineering, PCCoE
              </p>
            </div>
          </div>

          <blockquote className="border-l-4 border-[#F9A825] pl-4 mb-4 text-gray-600 italic text-sm leading-relaxed">
            "Engineering is not merely about constructing structures; it is about building futures.
            At PCCoE, we strive to nurture technically sound, ethically grounded, and societally responsive civil engineers.
            Our department proudly blends rigorous academics with industry-oriented research, producing graduates ready for tomorrow's challenges."
          </blockquote>

          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            With over <strong className="text-[#1A237E]">27 years of total experience</strong> (24.5 years in teaching), I have had the privilege of shaping thousands of engineers at PCCoE since July 2002.
            My research centres on <strong className="text-[#1A237E]">Ready Mix Concrete (RMC) dispatching optimization</strong> using Genetic Algorithms and GPS-based logistics — a niche that earned me the <span className="badge-gold text-[10px] px-1.5 py-0.5 rounded-full">AVISHKAR State Winner 2018</span> award.
          </p>

          <p className="text-gray-700 text-sm leading-relaxed">
            As <strong className="text-[#1A237E]">Professor & HoD (since May 2024)</strong>, I am committed to NBA excellence, research culture, and holistic student development through innovative pedagogy and industry collaboration.
          </p>
        </div>

        {/* Key facts */}
        <div className="sm:w-48 shrink-0 space-y-3">
          {[
            { label: 'Total Experience', value: '27+ Years' },
            { label: 'At PCCoE', value: '23+ Years' },
            { label: 'As HoD', value: 'Since May 2024' },
            { label: 'PhD Guide', value: 'Since Aug 2022' },
            { label: 'Former Assoc. Dean', value: 'SDW (2020–24)' },
            { label: 'PG Co-coord.', value: '2019–2024' },
          ].map((f) => (
            <div key={f.label} className="bg-[#E8EAF6] rounded-xl p-3">
              <p className="text-[9px] text-gray-500 uppercase font-semibold tracking-wide">{f.label}</p>
              <p className="text-[#1A237E] font-black text-sm">{f.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function ResearchImpactCard() {
  return (
    <Card id="research">
      <SectionHeading>Research Impact</SectionHeading>

      {/* Big stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { icon: '📈', val: '3', label: 'h-index', color: 'from-[#1A237E] to-[#3949AB]' },
          { icon: '🔗', val: '18', label: 'Citations', color: 'from-[#283593] to-[#3949AB]' },
          { icon: '📄', val: '27', label: 'Total Papers', color: 'from-[#1565C0] to-[#1976D2]' },
          { icon: '🎯', val: '94.9', label: 'RG Score', color: 'from-[#0277BD] to-[#0288D1]' },
        ].map((s) => (
          <div
            key={s.label}
            className={`bg-gradient-to-br ${s.color} rounded-xl p-4 text-center`}
          >
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-white font-black text-2xl">{s.val}</div>
            <div className="text-white/70 text-[9px] uppercase tracking-wide font-semibold">{s.label}</div>
          </div>
        ))}
      </div>

      {/* PhD thesis */}
      <div className="bg-[#E8EAF6] rounded-xl p-4 mb-5">
        <p className="text-[10px] text-[#3949AB] font-black uppercase tracking-widest mb-1">PhD Thesis</p>
        <h3 className="text-[#1A237E] font-bold text-sm mb-1">
          "Dispatching Schedule Optimization for Ready Mix Concrete" <span className="text-gray-400 font-normal">[PGS/phD/319]</span>
        </h3>
        <p className="text-gray-600 text-xs leading-relaxed">
          Developed a GA-based single-window GUI system offering un-interrupted RMC truck dispatching schedules, integrating GPS for real-time truck tracking. Reduces total waiting time at multiple construction sites simultaneously.
        </p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {['RMC Optimization','Genetic Algorithm','GPS Tracking','Multi-Site','GUI','Dispatching'].map((k) => (
            <span key={k} className="bg-[#1A237E] text-white text-[9px] font-semibold px-2 py-0.5 rounded-full">{k}</span>
          ))}
        </div>
        <p className="text-gray-400 text-[10px] mt-2">
          Guide: Dr. S.B. Thakare, DYPIoT Pimpri | Registered: 12/10/2015 | Awarded: 15/09/2020
        </p>
      </div>

      {/* PhD Guideship */}
      <div>
        <p className="text-[#1A237E] font-bold text-sm mb-2">PhD Guideship (SPPU)</p>
        <ul className="space-y-2 text-xs text-gray-700">
          <li className="flex gap-2">
            <span className="text-[#F9A825] font-black mt-0.5">●</span>
            <span>
              <strong>Mr. Pravin Chate</strong> – "Effective Use of Processed PCB Smelting Slag as Replacement to Concrete Ingredients" (Since Jun 2023, APCoE Parvati)
            </span>
          </li>
        </ul>
      </div>

      {/* Funding */}
      <div className="mt-5">
        <p className="text-[#1A237E] font-bold text-sm mb-3">Research Funding Received</p>
        <div className="space-y-2">
          {funding.map((f) => (
            <div key={f.title} className="flex gap-3 items-start bg-[#E8EAF6] rounded-lg p-3">
              <span className="badge-gold text-sm px-2 py-0.5 rounded-lg shrink-0 font-black">{f.amount}</span>
              <div>
                <p className="text-[#1A237E] font-semibold text-xs">{f.title}</p>
                <p className="text-gray-500 text-[10px]">{f.body} · {f.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function PublicationsCard() {
  const [activeTab, setActiveTab] = useState('Scopus/SCI');
  const tabs = ['Scopus/SCI', 'Intl. Journals', 'Conferences', 'Patents', 'Springer'];

  return (
    <Card id="publications">
      <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
        <SectionHeading>27 Publications</SectionHeading>
        <span className="badge-gold text-xs px-3 py-1 rounded-full shrink-0">
          Total: 7 Scopus · 1 Springer · 12 IJ · 8 Conf · 3 Patents
        </span>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Scopus */}
      {activeTab === 'Scopus/SCI' && (
        <div className="space-y-3">
          {scopusPublications.map((p, i) => (
            <div key={i} className="flex gap-3 items-start border border-[#E8EAF6] hover:border-[#1A237E] rounded-xl p-3 transition-colors">
              <span className="badge-gold text-xs px-2 py-0.5 rounded-full shrink-0 font-black">{p.year}</span>
              <div className="flex-1">
                <p className="text-[#1A237E] text-xs font-semibold leading-snug">{p.title}</p>
                <p className="text-gray-500 text-[10px] mt-0.5">{p.journal} <span className="text-[#F9A825] font-bold">· IF {p.if}</span></p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Intl Journals */}
      {activeTab === 'Intl. Journals' && (
        <ol className="space-y-2 list-decimal list-inside">
          {intlJournals.map((j, i) => (
            <li key={i} className="text-xs text-gray-700 border-b border-[#E8EAF6] pb-2 leading-snug">
              {j}
            </li>
          ))}
        </ol>
      )}

      {/* Conferences */}
      {activeTab === 'Conferences' && (
        <div className="space-y-2">
          {conferences.map((c, i) => (
            <div key={i} className="flex gap-3 items-start rounded-xl border border-[#E8EAF6] hover:border-[#1A237E] p-3 transition-colors">
              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full shrink-0 ${c.type === 'International' ? 'bg-[#1A237E] text-white' : 'badge-gold'}`}>
                {c.type === 'International' ? 'INT' : 'NAT'}
              </span>
              <div>
                <p className="text-[#1A237E] text-xs font-semibold leading-snug">{c.title}</p>
                <p className="text-gray-500 text-[10px]">{c.venue} · {c.year}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Patents */}
      {activeTab === 'Patents' && (
        <div className="space-y-3">
          {patents.map((p) => (
            <div key={p.no} className="bg-[#E8EAF6] rounded-xl p-4">
              <div className="flex gap-2 items-start">
                <span className="bg-[#1A237E] text-white text-[9px] font-black px-2 py-0.5 rounded-full shrink-0">PATENT {p.no}</span>
                <div>
                  <p className="text-[#1A237E] font-semibold text-xs leading-snug">{p.title}</p>
                  <p className="text-gray-500 text-[10px] mt-1">App No: {p.appNo} · Filed: {p.date}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-2 border-t border-[#E8EAF6] pt-3">
            <p className="text-[#1A237E] font-bold text-xs mb-2">Copyrights (3)</p>
            <ul className="space-y-1.5 text-[10px] text-gray-600">
              <li>SW-14638/2021 – "Optimization of Dispatching Schedule of RMC plant" (K H Gupta & A K Gaikwad)</li>
              <li>SW-14794/2021 – "Dispatching Schedule Optimizer for RMC plant" (A K Gaikwad & S B Thakare)</li>
              <li>1239/2020-CO/L – "Design sheet for Sewage Treatment Plant using MBBR technique"</li>
            </ul>
          </div>
        </div>
      )}

      {/* Springer */}
      {activeTab === 'Springer' && (
        <div className="bg-gradient-to-br from-[#E8EAF6] to-white rounded-xl p-5 border border-[#C5CAE9]">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-[#1A237E] text-white text-xs font-bold px-3 py-1 rounded-full">📗 Book Chapter</span>
            <span className="text-gray-400 text-xs">SPRINGER Nature</span>
          </div>
          <h3 className="text-[#1A237E] font-bold text-sm leading-snug mb-2">{springerChapter.title}</h3>
          <p className="text-gray-600 text-xs mb-1">{springerChapter.book}</p>
          <p className="text-gray-500 text-xs mb-1">Publisher: <strong>{springerChapter.publisher}</strong></p>
          <p className="text-gray-500 text-xs mb-3">ISBN: {springerChapter.isbn}</p>
          <a
            href={springerChapter.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#1A237E] hover:bg-[#283593] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            🔗 View on Springer
          </a>
        </div>
      )}
    </Card>
  );
}

function AchievementsCard() {
  return (
    <Card>
      <SectionHeading>Outstanding Achievements</SectionHeading>
      <div className="space-y-2.5">
        {achievements.map((a, i) => (
          <div
            key={i}
            className={`flex gap-3 items-start rounded-xl p-3 ${
              a.highlight
                ? 'bg-gradient-to-r from-[#FFF8E1] to-[#FFF3CD] border border-[#F9A825]'
                : 'bg-[#E8EAF6]'
            }`}
          >
            <span className="text-xl shrink-0">{a.icon}</span>
            <p className={`text-sm leading-snug ${a.highlight ? 'text-[#1A237E] font-bold' : 'text-gray-700'}`}>
              {a.text}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TeachingCard() {
  const subjects = [
    { level: 'F.E.', sem1: 'Basic Civil Engineering (14 yrs)', sem2: 'Engineering Mechanics (19 yrs)' },
    { level: 'S.E.', sem1: 'Strength of Materials, Surveying (7 yrs)', sem2: '—' },
    { level: 'B.E.', sem1: 'TQM & MIS in Civil Engg. (6 times)', sem2: 'Projects' },
    { level: 'M.Tech.', sem1: 'TQM in Construction (6×), Infra Dev. (3×), Risk Mgmt.', sem2: 'Construction Equipment & Management' },
  ];

  return (
    <Card id="teaching">
      <SectionHeading>Teaching Contributions</SectionHeading>

      <div className="overflow-x-auto rounded-xl border border-[#E8EAF6]">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#1A237E] text-white">
              <th className="text-left px-3 py-2 font-semibold rounded-tl-xl">Level</th>
              <th className="text-left px-3 py-2 font-semibold">Semester I</th>
              <th className="text-left px-3 py-2 font-semibold rounded-tr-xl">Semester II</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s, i) => (
              <tr key={s.level} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F5F6FF]'}>
                <td className="px-3 py-2 font-bold text-[#1A237E]">{s.level}</td>
                <td className="px-3 py-2 text-gray-700">{s.sem1}</td>
                <td className="px-3 py-2 text-gray-700">{s.sem2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* YouTube CTA */}
      <div className="mt-5 bg-gradient-to-r from-red-600 to-red-500 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="text-white">
          <p className="font-bold text-sm">YouTube Educational Channel</p>
          <p className="text-xs text-white/80 mt-0.5">
            39 Videos · 1,788+ Subscribers · 1,98,114+ Views · 10.7K watch hours
          </p>
          <p className="text-[10px] text-white/60 mt-0.5">Topics: Engineering Mechanics & Surveying</p>
        </div>
        <a
          href="https://www.youtube.com/channel/UCzggPV5gezmNMKmenzi1nYA"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-red-600 font-bold text-xs px-4 py-2 rounded-full hover:bg-red-50 transition-colors shrink-0"
        >
          ▶ Visit Channel
        </a>
      </div>

      {/* Book */}
      <div className="mt-4 bg-[#E8EAF6] rounded-xl p-4 flex gap-3 items-start">
        <span className="text-3xl">📘</span>
        <div>
          <p className="text-[#1A237E] font-bold text-sm">"Engineering Mechanics"</p>
          <p className="text-gray-600 text-xs">Common for All Branches · 2019 Pattern · Nirali Prakashan</p>
          <p className="text-gray-500 text-[10px] mt-0.5">ISBN: 978-93-89406-74-0 (1st Ed.) · 978-93-89406-75-7 (3rd Ed. 2023)</p>
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────── CONTACT SECTION (full page anchor) ─────── */
function ContactSection() {
  return (
    <Card id="contact-section" className="border-2 border-[#1A237E]">
      <SectionHeading>Get In Touch</SectionHeading>
      <p className="text-gray-600 text-sm mb-5">
        Open to research collaborations, expert sessions, PhD co-guideship, NBA consultancy, and academic resource person invitations.
      </p>

      <div className="grid sm:grid-cols-2 gap-3">
        {[
          {
            icon: '✉️',
            label: 'Institutional Email',
            value: 'ajay.gaikwad@pccoepune.org',
            href: 'mailto:ajay.gaikwad@pccoepune.org?subject=Collaboration%20Enquiry&body=Dear%20Dr.%20Gaikwad%2C%0A%0AI%20am%20writing%20to%20you%20regarding%20...',
            btnText: 'Send Email',
            btnClass: 'bg-[#1A237E] hover:bg-[#283593] text-white',
          },
          {
            icon: '💬',
            label: 'WhatsApp',
            value: '+91 9822 406840',
            href: 'https://wa.me/919822406840?text=Hello%20Dr.%20Gaikwad%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect.',
            btnText: 'Open WhatsApp',
            btnClass: 'bg-green-500 hover:bg-green-600 text-white',
          },
          {
            icon: '📞',
            label: 'Phone',
            value: '+91 9822 406840 / 7420995740',
            href: 'tel:+919822406840',
            btnText: 'Call Now',
            btnClass: 'bg-[#3949AB] hover:bg-[#1A237E] text-white',
          },
          {
            icon: 'in',
            label: 'LinkedIn',
            value: 'Connect professionally',
            href: 'https://www.linkedin.com/search/results/all/?keywords=Ajay+Gaikwad+PCCoE',
            btnText: 'View Profile',
            btnClass: 'bg-[#0077B5] hover:bg-[#005f8d] text-white',
          },
          {
            icon: '🔬',
            label: 'ResearchGate',
            value: 'Research Collaboration',
            href: 'https://www.researchgate.net',
            btnText: 'ResearchGate',
            btnClass: 'bg-teal-600 hover:bg-teal-700 text-white',
          },
          {
            icon: '📊',
            label: 'Scopus',
            value: 'ID: 57210729258',
            href: 'https://www.scopus.com/authid/detail.uri?authorId=57210729258',
            btnText: 'View Scopus',
            btnClass: 'bg-orange-500 hover:bg-orange-600 text-white',
          },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith('mailto:') || item.href.startsWith('tel:') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className={`flex items-center gap-3 p-3 rounded-xl border border-[#E8EAF6] hover:border-[#1A237E] group transition-all`}
          >
            <span className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${item.btnClass}`}>
              {item.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[#1A237E] text-xs font-bold">{item.label}</p>
              <p className="text-gray-500 text-[10px] truncate">{item.value}</p>
            </div>
            <span className="text-gray-300 group-hover:text-[#1A237E] text-sm">→</span>
          </a>
        ))}
      </div>

      {/* Office info */}
      <div className="mt-5 bg-[#E8EAF6] rounded-xl p-4">
        <p className="text-[#1A237E] font-bold text-xs mb-1">📍 Office Address</p>
        <p className="text-gray-700 text-xs">
          Head of Department, Civil Engineering,<br />
          Pimpri Chinchwad College of Engineering (PCCoE),<br />
          Pradhikaran, Nigdi, Pune – 411 044, Maharashtra, India.
        </p>
      </div>
    </Card>
  );
}

/* ─────────────────────── MAIN EXPORT ─────────────────────────── */
export default function ContentCards() {
  return (
    <main className="flex flex-col gap-6">
      <HodMessageCard />
      <ResearchImpactCard />
      <PublicationsCard />
      <AchievementsCard />
      <TeachingCard />
      <ContactSection />
    </main>
  );
}
