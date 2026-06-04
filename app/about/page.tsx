"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">About The Firm</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            A premium legal advisory and litigation chamber dedicated to excellence, integrity, and strategic foresight.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <div className="glass-panel-heavy p-8 md:p-12 mb-12 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-accent/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-gold-accent/20 transition-colors" />
            <h2 className="text-2xl font-serif text-gold-accent mb-4 relative z-10">Our Mission</h2>
            <p className="text-white/70 font-light leading-relaxed mb-0 relative z-10">
              To provide unparalleled legal representation and strategic counsel that empowers our clients to navigate complex legal landscapes with confidence. We bridge the gap between traditional legal craftsmanship and modern, dynamic problem-solving.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="glass-panel-light hover:glass-panel p-8 rounded-xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-serif text-white mb-3">Excellence</h3>
              <p className="text-white/60 font-light text-sm">We demand the highest standards of legal rigor and intellectual depth in every matter we handle.</p>
            </div>
            <div className="glass-panel-light hover:glass-panel p-8 rounded-xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-serif text-white mb-3">Integrity</h3>
              <p className="text-white/60 font-light text-sm">Absolute fidelity to our clients and the rule of law forms the bedrock of our practice.</p>
            </div>
            <div className="glass-panel-light hover:glass-panel p-8 rounded-xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-serif text-white mb-3">Discretion</h3>
              <p className="text-white/60 font-light text-sm">We guard our clients' confidentiality with unflinching resolve, ensuring total privacy.</p>
            </div>
            <div className="glass-panel-light hover:glass-panel p-8 rounded-xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-serif text-white mb-3">Strategy</h3>
              <p className="text-white/60 font-light text-sm">Every legal move is calculated to yield the maximum strategic advantage toward the ultimate goal.</p>
            </div>
          </div>
          
          <div className="border-l-4 border-gold-accent pl-8 py-2">
            <p className="text-white/80 italic text-xl font-serif">
              "The law is not just an instrument of justice, but the absolute architecture of progressive business."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
