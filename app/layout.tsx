import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

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

import VisitorCounter from "@/components/VisitorCounter";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${roboto.variable} font-sans antialiased text-gray-900 bg-white`}>
        <VisitorCounter />
        {children}
      </body>
    </html>
  );
}
