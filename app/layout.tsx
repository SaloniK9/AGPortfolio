import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import VisitorCounter from "@/components/VisitorCounter";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({ 
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"], 
  variable: "--font-roboto" 
});

export const metadata: Metadata = {
  title: "Dr. Ajay K. Gaikwad | Professor & HoD Civil Engineering - PCCoE",
  description: "Official academic portfolio of Dr. Ajay Krishnath Gaikwad, HoD Civil Engineering Department at Pimpri Chinchwad College of Engineering (PCCoE), Pune.",
  keywords: "Dr. Ajay Gaikwad, Civil Engineering, PCCoE Pune, HoD, Construction Management, RMC Optimization",
};

import BrandingTicker from "@/components/BrandingTicker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${roboto.variable} font-sans text-slate-200 antialiased`}>
        <VisitorCounter />
        <div className="fixed top-0 left-0 right-0 z-50">
          <BrandingTicker />
        </div>
        <div className="fixed inset-0 -z-50 bg-[#030712]">
          <div className="absolute inset-0 bg-gradient-to-tr from-pccoe-blue/20 via-transparent to-pccoe-accent/10 opacity-60" />
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-pccoe-blue/10 to-transparent blur-3xl" />
        </div>
        {children}
      </body>
    </html>
  );
}
