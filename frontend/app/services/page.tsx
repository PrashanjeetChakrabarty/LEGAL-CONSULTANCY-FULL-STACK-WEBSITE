"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Scale, Briefcase, FileText, Gavel, Shield, BookOpen } from "lucide-react";

export default function ServicesPage() {
  const services = [
    { title: "Corporate Transactions", icon: Briefcase, desc: "M&A Due Diligence, restructuring, and strategic corporate advisory." },
    { title: "Civil Litigation", icon: Scale, desc: "Representation in high-stakes civil disputes and property matters." },
    { title: "Contract Drafting", icon: FileText, desc: "Precision drafting of complex commercial contracts and NDAs." },
    { title: "Intellectual Property", icon: Shield, desc: "Trademark registration, IPR due diligence, and infringement analysis." },
    { title: "Statutory Interpretation", icon: BookOpen, desc: "Expert advisory on complex regulatory frameworks across diverse fields." },
    { title: "Arbitration", icon: Gavel, desc: "Alternative dispute resolution and out-of-court settlements." },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Practice Areas</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Providing comprehensive, elite legal services across specialized domains.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-panel-light p-8 rounded-2xl group hover:glass-panel hover:-translate-y-2 transition-all duration-300 flex flex-col"
              >
                <div className="w-14 h-14 rounded-full glass-panel flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="text-gold-accent w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif text-white mb-3">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8 flex-grow">
                  {service.desc}
                </p>
                <Link href={`/services/${service.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="mt-auto flex items-center text-xs tracking-widest uppercase text-white/50 group-hover:text-white transition-colors">
                  Learn More <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
