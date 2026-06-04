"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, ExternalLink } from "lucide-react";

export default function LawyersPage() {
  const lawyers = [
    {
      name: "Vishishta Jaiswal",
      designation: "Founding Partner & Corporate Lawyer",
      specialization: "Corporate Transactions, IPR, Statutes",
      bio: "Aspiring Corporate Lawyer with expertise in statutory interpretation, Corporate Transactions, and drafting across diverse fields including M&A Due Diligence, real estate, environmental regulations, and IPR. Significant experience working with Amazon and high-court justices.",
      image: "/vishishta.jpg", 
      credentials: [
        "University of London – SOAS, Global Diplomacy",
        "National Law University Odisha (NLUO)",
        "University of Allahabad, BA LL.B (Hons.)",
      ],
      slug: "vishishta-jaiswal"
    },
    {
      name: "Fawwaz Ahmed",
      designation: "Founding Partner & International Consultant",
      specialization: "Contract Law, Public Law, Pro-Bono Disputes",
      bio: "Pursuing an LLB (Hons.) at the University of East London, UK. Fawwaz brings robust international legal perspective and extensive experience across pro-bono clinics handling housing, employment, and immigration disputes.",
      image: "/fawwaz.jpg",
      imagePosition: "object-bottom",
      credentials: [
        "University of East London, Level 4 LLB (Hons.)",
        "Legal Advice Centre (UEL) - Pro Bono Volunteer",
        "St. Joseph's College Allahabad, India"
      ],
      slug: "fawwaz-ahmed"
    }
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
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">The Partners</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Meet the visionary advocates driving F&V Legal Consultancies with uncompromising dedication and strategic brilliance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {lawyers.map((lawyer, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="glass-panel-heavy rounded-3xl group overflow-hidden flex flex-col h-full"
            >
              <div className="h-80 bg-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <img src={lawyer.image} alt={lawyer.name} className={`absolute inset-0 w-full h-full object-cover z-0 grayscale-[20%] transition-transform duration-700 group-hover:scale-105 ${lawyer.imagePosition || 'object-center'}`} />
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-accent/20 via-background to-background z-0"></div>
                
                <div className="absolute bottom-6 left-6 z-20">
                  <h2 className="text-3xl font-serif text-white">{lawyer.name}</h2>
                  <p className="text-gold-accent font-medium tracking-wide mt-1">{lawyer.designation}</p>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-6">
                  <h4 className="text-sm tracking-widest text-white/40 uppercase mb-2">Specialization</h4>
                  <p className="text-white/80">{lawyer.specialization}</p>
                </div>
                
                <p className="text-white/60 leading-relaxed font-light mb-8 flex-grow">
                  {lawyer.bio}
                </p>

                <div className="mb-8">
                   <h4 className="text-sm tracking-widest text-white/40 uppercase mb-3">Credentials</h4>
                   <ul className="space-y-2">
                     {lawyer.credentials.map((cred, j) => (
                       <li key={j} className="text-white/70 text-sm flex items-start">
                         <span className="text-gold-accent mr-2 mt-0.5">•</span>
                         {cred}
                       </li>
                     ))}
                   </ul>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
                  <div className="flex space-x-4">
                    <button className="glass-button w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-gold-accent transition-colors">
                      <Mail size={18} />
                    </button>
                  </div>
                  
                  <Link href={`/lawyers/${lawyer.slug}`} className="flex items-center text-sm uppercase tracking-widest text-gold-accent hover:text-white transition-colors group-hover:gap-2 duration-300 gap-1">
                    Full Profile <ExternalLink size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
