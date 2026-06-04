import Link from "next/link";
import { Mail, ArrowLeft, Award, Scale, BookOpen } from "lucide-react";
import { notFound } from "next/navigation";

const lawyers = [
  {
    name: "Vishishta Jaiswal",
    designation: "Founding Partner & Corporate Lawyer",
    specialization: "Corporate Transactions, IPR, Statutes",
    bio: "Aspiring Corporate Lawyer with expertise in statutory interpretation, Corporate Transactions, and drafting across diverse fields including M&A Due Diligence, real estate, environmental regulations, and IPR. Significant experience working with Amazon and high-court justices.",
    image: "/vishishta.jpg", 
    email: "vishishtjaiswal57@gmail.com",
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
    email: "fawwazmed2003@gmail.com",
    credentials: [
      "University of East London, Level 4 LLB (Hons.)",
      "Legal Advice Centre (UEL) - Pro Bono Volunteer",
      "St. Joseph's College Allahabad, India"
    ],
    slug: "fawwaz-ahmed"
  }
];

export default function LawyerProfilePage({ params }: { params: { slug: string } }) {
  const lawyer = lawyers.find(l => l.slug === params.slug);

  if (!lawyer) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-background">
      <div className="container mx-auto px-6 max-w-5xl">
        <Link href="/lawyers" className="inline-flex items-center text-gold-accent hover:text-white transition-colors uppercase tracking-widest text-xs mb-10">
          <ArrowLeft size={16} className="mr-2" /> Back to Partners
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Column - Image */}
          <div className="md:col-span-1">
            <div className="sticky top-32">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-6 border border-white/10 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                <img src={lawyer.image} alt={lawyer.name} className={`w-full h-full object-cover ${lawyer.imagePosition || 'object-center'}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              
              <div className="bg-black/50 border border-white/5 p-6 rounded-sm">
                <h3 className="text-white/50 text-xs uppercase tracking-widest mb-4">Contact Detail</h3>
                <a href={`mailto:${lawyer.email}`} className="flex items-center space-x-3 text-white hover:text-gold-accent transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gold-accent/10 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-gold-accent" />
                  </div>
                  <span className="text-sm truncate">{lawyer.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">{lawyer.name}</h1>
            <h2 className="text-xl text-gold-accent tracking-wide mb-8">{lawyer.designation}</h2>
            
            <div className="glass-panel p-8 mb-12 border-l-4 border-l-gold-accent">
              <h3 className="text-white/50 text-xs uppercase tracking-widest mb-4">Practice Specialization</h3>
              <p className="text-white text-lg">{lawyer.specialization}</p>
            </div>
            
            <div className="mb-12">
              <h3 className="text-2xl font-serif text-white mb-6 flex items-center">
                <BookOpen size={20} className="text-gold-accent mr-3" /> Biography
              </h3>
              <p className="text-white/70 leading-relaxed font-light text-lg">
                {lawyer.bio}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-6 flex items-center">
                <Award size={20} className="text-gold-accent mr-3" /> Educational Credentials
              </h3>
              <ul className="space-y-4">
                {lawyer.credentials.map((cred, i) => (
                  <li key={i} className="flex items-start text-white/70">
                    <Scale size={16} className="text-gold-accent mr-4 mt-1 shrink-0" />
                    <span className="text-lg font-light">{cred}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-16 pt-8 border-t border-white/10">
              <Link href="/consultation" className="inline-block px-10 py-4 bg-gold-accent hover:bg-white text-black font-semibold tracking-widest rounded-sm transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                BOOK CONSULTATION WITH {lawyer.name.split(' ')[0].toUpperCase()}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
