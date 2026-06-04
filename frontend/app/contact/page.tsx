"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to send message");

      setSuccess(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Contact The Chamber</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Discreet, professional, and accessible. Reach out to F&V Legal Consultancies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="glass-panel-heavy rounded-3xl p-10 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-accent/10 blur-[50px] rounded-full pointer-events-none" />
              <h3 className="text-2xl font-serif text-white mb-8 border-b border-white/10 pb-4 relative z-10">
                Office & Direct Access
              </h3>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full border border-gold-accent/50 flex items-center justify-center bg-gold-accent/10 shrink-0">
                    <MapPin className="text-gold-accent w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1 tracking-widest uppercase text-sm">Locations</h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      New Delhi | Prayagraj, India<br />London, UK
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full border border-gold-accent/50 flex items-center justify-center bg-gold-accent/10 shrink-0">
                    <Mail className="text-gold-accent w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1 tracking-widest uppercase text-sm">Email</h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      vishishtjaiswal57@gmail.com<br />fawwazmed2003@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {success ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-panel-heavy rounded-3xl p-10 flex flex-col items-center justify-center text-center h-full"
              >
                <CheckCircle2 className="text-green-400 w-12 h-12 mb-4" />
                <h3 className="text-xl font-serif text-white mb-2">Message Sent</h3>
                <p className="text-white/50 text-sm">
                  Thank you for reaching out. We will respond to your inquiry promptly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 text-gold-accent text-xs tracking-widest uppercase hover:text-white transition-colors"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-panel-heavy rounded-3xl p-10 flex flex-col space-y-6 relative overflow-hidden"
              >
                <h3 className="text-2xl font-serif text-white mb-2">Send an Inquiry</h3>
                <p className="text-sm text-white/50">For secure and direct correspondence.</p>

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <AlertCircle size={14} />
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">Full Name *</label>
                  <input
                    required
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-black/20 backdrop-blur-md border border-white/10 border-t-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold-accent transition-colors shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">Email Address *</label>
                  <input
                    required
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-black/20 backdrop-blur-md border border-white/10 border-t-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold-accent transition-colors shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full bg-black/20 backdrop-blur-md border border-white/10 border-t-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold-accent transition-colors shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                    placeholder="+91 xxxxx xxxxx"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">Message *</label>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-black/20 backdrop-blur-md border border-white/10 border-t-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold-accent transition-colors resize-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                    placeholder="Briefly describe your inquiry (do not include highly sensitive details here)."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="glass-button w-full py-4 bg-gold-accent/80 hover:bg-gold-accent text-black font-semibold tracking-widest rounded-md transition-colors mt-4 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "SUBMIT INQUIRY"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
