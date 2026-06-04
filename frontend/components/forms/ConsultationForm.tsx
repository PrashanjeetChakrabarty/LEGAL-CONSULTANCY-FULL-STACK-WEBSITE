"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PRACTICE_AREAS = [
  "Corporate & Commercial Law",
  "Civil Litigation",
  "Intellectual Property Rights",
  "Family Law",
  "Criminal Defense",
  "Real Estate Law",
  "International Consulting",
  "Other",
];

export default function ConsultationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    practiceArea: "Corporate & Commercial Law",
    consultationMode: "online",
    description: "",
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleNext = (e: React.FormEvent) => { e.preventDefault(); setStep(step + 1); };
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/consultations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");

      setSuccess(true);
      setStep(4);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (step === 4 && success) {
    return (
      <div className="w-full max-w-2xl mx-auto rounded-3xl border border-white/10 bg-[#0a0a0a] p-12 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6"
        >
          <svg className="w-9 h-9 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="text-2xl font-serif text-white mb-3">Consultation Booked!</h3>
        <p className="text-white/40 text-sm max-w-sm mx-auto leading-relaxed">
          Your consultation request has been recorded and we will reach out to{" "}
          <span className="text-[#D4AF37]">{form.email}</span> shortly.
        </p>
        <p className="text-white/20 text-xs mt-6 tracking-widest uppercase">
          Data saved to our secure database
        </p>
      </div>
    );
  }

  // ── Step indicator ────────────────────────────────────────────────────────
  const STEPS = ["Personal Details", "Legal Matter", "Review & Submit"];

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl border border-white/8 bg-[#0a0a0a] shadow-2xl overflow-hidden">
      {/* Step header bar */}
      <div className="flex border-b border-white/5">
        {STEPS.map((label, i) => (
          <div
            key={i}
            className={`flex-1 py-4 px-3 text-center text-xs tracking-widest uppercase transition-colors border-r border-white/5 last:border-r-0 ${
              step === i + 1
                ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                : step > i + 1
                ? "text-white/40 bg-white/[0.02]"
                : "text-white/20"
            }`}
          >
            <span className={`inline-flex items-center gap-2`}>
              <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                step > i + 1 ? "bg-green-500/20 text-green-400" :
                step === i + 1 ? "bg-[#D4AF37] text-black" : "bg-white/5 text-white/30"
              }`}>
                {step > i + 1 ? "✓" : i + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="p-8 md:p-12">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={step === 3 ? handleSubmit : handleNext}>
          <AnimatePresence mode="wait">
            {/* ── STEP 1: Personal Details ──────────────────────────────── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-xl font-serif text-white mb-1">Personal Details</h3>
                <p className="text-sm text-white/30 mb-8">Your valid contact information for booking confirmation.</p>
                <div className="space-y-5">
                  {[
                    { label: "Full Name", name: "name", type: "text", placeholder: "John Doe", required: true },
                    { label: "Email Address", name: "email", type: "email", placeholder: "john@example.com", required: true },
                    { label: "Phone Number", name: "phone", type: "tel", placeholder: "+91 98765 43210", required: false },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                        {field.label} {field.required && <span className="text-[#D4AF37]">*</span>}
                      </label>
                      <input
                        required={field.required}
                        name={field.name}
                        type={field.type}
                        value={(form as any)[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full bg-black/30 border border-white/8 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37]/50 transition-colors text-sm"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Legal Matter ──────────────────────────────────── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-xl font-serif text-white mb-1">Legal Matter</h3>
                <p className="text-sm text-white/30 mb-8">Details about your case or inquiry.</p>
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                      Practice Area <span className="text-[#D4AF37]">*</span>
                    </label>
                    <select
                      name="practiceArea"
                      value={form.practiceArea}
                      onChange={handleChange}
                      className="w-full bg-black/30 border border-white/8 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors text-sm"
                    >
                      {PRACTICE_AREAS.map((a) => (
                        <option key={a} className="bg-[#0a0a0a]">{a}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                      Session Mode
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { val: "online", label: "Online (Video Call)", icon: "🎥" },
                        { val: "in-person", label: "In-Person (Office)", icon: "🏛️" },
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() => setForm({ ...form, consultationMode: opt.val })}
                          className={`p-4 rounded-xl border text-left transition-all text-sm ${
                            form.consultationMode === opt.val
                              ? "border-[#D4AF37]/50 bg-[#D4AF37]/8 text-white"
                              : "border-white/8 text-white/40 hover:border-white/20"
                          }`}
                        >
                          <span className="block mb-1">{opt.icon}</span>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                      Brief Description <span className="text-[#D4AF37]">*</span>
                    </label>
                    <textarea
                      required
                      name="description"
                      rows={4}
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Briefly describe your legal matter (avoid highly sensitive details here)..."
                      className="w-full bg-black/30 border border-white/8 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none text-sm"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: Review & Submit ──────────────────────────────────── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-xl font-serif text-white mb-1">Review Details</h3>
                <p className="text-sm text-white/30 mb-8">Please review your information before submitting.</p>

                <div className="rounded-2xl border border-white/8 bg-black/20 divide-y divide-white/5 mb-6">
                  {[
                    { label: "Client Name", value: form.name },
                    { label: "Email", value: form.email },
                    { label: "Phone", value: form.phone || "—" },
                    { label: "Practice Area", value: form.practiceArea },
                    { label: "Session Mode", value: form.consultationMode === "online" ? "Online (Video Call)" : "In-Person (Office)" },
                    { label: "Matter", value: form.description },
                  ].map((row) => (
                    <div key={row.label} className="flex px-5 py-3.5 gap-4">
                      <span className="text-white/30 text-xs uppercase tracking-widest w-32 shrink-0 pt-0.5">{row.label}</span>
                      <span className="text-white/80 text-sm flex-1">{row.value}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-white/20 leading-relaxed mb-6">
                  By proceeding, you agree to our Terms of Service. Your booking details will be saved to our secure database immediately.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Navigation ─────────────────────────────────────────────── */}
          <div className="flex justify-between mt-10 pt-6 border-t border-white/5">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm tracking-widest uppercase transition-all"
              >
                Back
              </button>
            ) : <div />}

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-10 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#E8C84A] text-black font-semibold text-sm tracking-widest uppercase transition-all disabled:opacity-50 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              {step === 3
                ? isSubmitting ? "Processing..." : "Submit Request"
                : "Continue →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
