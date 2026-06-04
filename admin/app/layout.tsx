import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "F&V Legal — Admin Portal",
  description: "Private admin dashboard for F&V Legal Consultancies.",
  robots: "noindex, nofollow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#080808] text-white min-h-screen">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.08),transparent)] pointer-events-none -z-10" />
        {children}
      </body>
    </html>
  );
}
