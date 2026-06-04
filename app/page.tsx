"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import Service3DCard from "@/components/ui/Service3DCard";

const HeroCanvas = dynamic(() => import("@/components/3d/HeroCanvas"), { ssr: false });

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        <HeroCanvas />
        <div className="z-10 container mx-auto px-6 flex flex-col items-center mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white mb-6 drop-shadow-2xl"
          >
            F&amp;V
            <span className="block text-2xl md:text-4xl uppercase tracking-[0.3em] gold-gradient-text mt-4">
              Legal Consultancies
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="max-w-2xl text-lg md:text-xl text-white/80 font-light tracking-wide mb-10"
          >
            Elite legal positioning, sophisticated representation, and expert advice for businesses and individuals navigating complex legal landscapes.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Link href="/consultation" className="px-8 py-4 bg-gold-accent hover:bg-white text-black font-semibold tracking-widest rounded-sm transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              BOOK CONSULTATION
            </Link>
            <Link href="/lawyers" className="glass-button px-8 py-4 text-white hover:text-gold-accent font-medium tracking-widest rounded-sm">
              MEET THE LAWYERS
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50"
        >
          <span className="text-sm tracking-widest mb-4 uppercase">Discover Excellence</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-16 bg-gradient-to-b from-gold-accent to-transparent"
          />
        </motion.div>
      </section>

      {/* About Overview */}
      <section className="py-32 relative z-10 overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="glass-panel-heavy p-12 md:p-20 text-center rounded-3xl relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-accent/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">Unwavering Trust. Unmatched Expertise.</h2>
              <p className="text-lg text-white/60 leading-relaxed font-light mb-12 max-w-3xl mx-auto">
                At F&amp;V Legal Consultancies, we bridge the gap between traditional legal authority and modern, strategic problem-solving. Founded by visionary advocates, our chamber brings a formidable presence to both courtrooms and boardrooms. We specialize in corporate transactions, civil litigation, and high-stakes dispute resolution.
              </p>
              <Link href="/about" className="glass-button px-8 py-4 inline-flex items-center text-sm uppercase tracking-widest text-gold-accent hover:text-white transition-colors rounded-sm">
                Learn deeper about the firm →
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Practice Areas */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Practice Areas</h2>
              <p className="text-white/60 max-w-xl">Comprehensive legal solutions tailored to protect your interests and drive your success across diverse domains.</p>
            </div>
            <Link href="/services" className="mt-6 md:mt-0 text-gold-accent text-sm tracking-widest hover:text-white transition-colors uppercase flex items-center">
              Explore All Services
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[1000px]">
            {[
              "Corporate & Commercial Law", 
              "Civil Litigation", 
              "Intellectual Property Rights"
            ].map((area, i) => (
              <Service3DCard key={i} title={area} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
