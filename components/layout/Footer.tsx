import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background/20 backdrop-blur-lg border-t border-white/10 shadow-[0_-4px_32px_rgba(0,0,0,0.4)] py-16 relative z-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-3xl font-serif tracking-widest text-white">
            F&amp;V <span className="text-gold-accent block text-lg uppercase mt-2">Legal Consultancies</span>
          </Link>
          <p className="mt-6 text-white/50 leading-relaxed max-w-sm">
            Premium legal representation, unwavering trust, and expert strategic guidance for businesses and individuals
            navigating complex legal landscapes.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white tracking-widest mb-6">QUICK LINKS</h4>
          <ul className="space-y-4 text-white/60">
            <li><Link href="/about" className="hover:text-gold-accent transition-colors">About the Firm</Link></li>
            <li><Link href="/services" className="hover:text-gold-accent transition-colors">Practice Areas</Link></li>
            <li><Link href="/lawyers" className="hover:text-gold-accent transition-colors">The Partners</Link></li>
            <li><Link href="/consultation" className="hover:text-gold-accent transition-colors">Book Consultation</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white tracking-widest mb-6">CONTACT</h4>
          <ul className="space-y-4 text-white/60">
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gold-accent mt-0.5 shrink-0" />
              <span>New Delhi | Prayagraj, India<br/>London, UK</span>
            </li>
            <li className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-gold-accent shrink-0 mt-0.5" />
              <div className="flex flex-col space-y-1">
                <a href="mailto:vishishtjaiswal57@gmail.com" className="hover:text-gold-accent transition-colors">vishishtjaiswal57@gmail.com</a>
                <a href="mailto:fawwazmed2003@gmail.com" className="hover:text-gold-accent transition-colors">fawwazmed2003@gmail.com</a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-white/40 text-sm">
        <p>&copy; {new Date().getFullYear()} F&amp;V Legal Consultancies. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
