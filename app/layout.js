import './globals.css';

export const metadata = {
  title: 'Dr. Ajay Krishnath Gaikwad | Professor & HoD, Civil Engineering – PCCoE Pune',
  description:
    'Official academic portfolio of Dr. Ajay Krishnath Gaikwad, Professor & Head of Department, Civil Engineering, Pimpri Chinchwad College of Engineering (PCCoE), Pune. PhD, 27+ years experience, AVISHKAR State Winner.',
  keywords: [
    'Dr. Ajay Gaikwad', 'PCCoE', 'Civil Engineering', 'HoD', 'PCCOE Pune',
    'RMC Optimization', 'AVISHKAR', 'Engineering Mechanics', 'Surveying',
  ],
  openGraph: {
    title: 'Dr. Ajay Krishnath Gaikwad | PCCoE Pune',
    description: 'Professor & HoD, Civil Engineering – 27+ Years | AVISHKAR State Winner',
    type: 'profile',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F0F2F9]">
        {children}
      </body>
    </html>
  );
}
