import type { Metadata, Viewport } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import VisitorCounter from "@/components/VisitorCounter";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Dr. Ajay K. Gaikwad | Professor & HoD Civil Engineering - PCCoE",
  description: "Official academic portfolio of Dr. Ajay Krishnath Gaikwad, HoD Civil Engineering Department at Pimpri Chinchwad College of Engineering (PCCoE), Pune.",
  keywords: ["Dr. Ajay Gaikwad", "Civil Engineering", "PCCoE Pune", "HoD", "Construction Management", "RMC Optimization"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Dr. Ajay K. Gaikwad | Academic Portfolio",
    description: "Academic portfolio of Dr. Ajay Krishnath Gaikwad, Professor & HoD Civil Engineering at PCCoE Pune.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Ajay K. Gaikwad | Academic Portfolio",
    description: "Academic portfolio of Dr. Ajay Krishnath Gaikwad, Professor & HoD Civil Engineering at PCCoE Pune.",
  },
};

export const viewport: Viewport = {
  themeColor: "#1A237E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${roboto.variable} font-sans antialiased text-slate-800 bg-white`}>
        <VisitorCounter />
        {children}
      </body>
    </html>
  );
}
