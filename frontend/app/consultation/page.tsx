"use client";

import { motion } from "framer-motion";
import ConsultationForm from "@/components/forms/ConsultationForm";

export default function ConsultationPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif text-white mb-6"
          >
            Book a Consultation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            Secure a dedicated session with our specialized advocates to discuss your legal matter in strict confidence.
          </motion.p>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ConsultationForm />
        </motion.div>
      </div>
    </div>
  );
}
