import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "F&V Legal Consultancies | Premium Law Firm",
  description: "Elite legal positioning, sophisticated representation, and expert advice at F&V Legal Consultancies.",
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <SmoothScroll>
          <div className="fixed inset-0 bg-[#080808] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.12),rgba(0,0,0,0))] -z-50 pointer-events-none" />
          <Navbar />
          <main className="min-h-screen relative z-0">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
