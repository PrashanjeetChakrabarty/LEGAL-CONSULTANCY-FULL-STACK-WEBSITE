"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "The Partners", href: "/lawyers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b border-white/5",
        isScrolled
          ? "glass-panel-heavy !border-x-0 !border-t-0 !rounded-none py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif tracking-widest text-white hover:text-silver-accent transition-colors">
          F&amp;V <span className="text-sm uppercase tracking-widest text-gold-accent ml-2 block sm:inline">Legal Consultancies</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-gold-accent transition-colors tracking-wide"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/consultation"
            className="px-6 py-2 border border-gold-accent/50 text-gold-accent hover:bg-gold-accent hover:text-black transition-all rounded-sm text-sm font-semibold tracking-wider"
          >
            BOOK CONSULTATION
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full glass-panel-heavy !border-x-0 !rounded-none md:hidden flex flex-col items-center py-8 space-y-6 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-white hover:text-gold-accent transition-colors tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/consultation"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-8 py-3 bg-gold-accent text-black font-semibold text-sm tracking-widest rounded-sm"
          >
            BOOK CONSULTATION
          </Link>
        </div>
      )}
    </header>
  );
}
