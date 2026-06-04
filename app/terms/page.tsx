export default function TermsOfService() {
  return (
    <div className="container mx-auto px-6 py-32 max-w-4xl min-h-screen relative z-10">
      <div className="glass-panel-heavy p-8 md:p-14 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-accent/5 blur-[80px] rounded-full pointer-events-none -z-10" />
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-8 relative z-10">Terms of Service</h1>
        <div className="text-white/70 space-y-6 leading-relaxed font-light relative z-10">
          <p><strong>Effective Date: {new Date().toLocaleDateString()}</strong></p>
          
          <h2 className="text-2xl text-gold-accent font-serif mt-12 mb-4">1. No Attorney-Client Relationship</h2>
          <p>The information provided on the F&amp;V Legal Consultancies website is for general informational purposes only and does not constitute legal advice. Using this website, submitting forms, or communicating with us digitally does not implicitly establish an attorney-client relationship until a formal retainer agreement is signed.</p>
          
          <h2 className="text-2xl text-gold-accent font-serif mt-12 mb-4">2. Consultations &amp; Payments</h2>
          <p>Any initial consultation fee charged via the web portal (Razorpay) secures a priority review block of time. This fee may be non-refundable if appointments are missed or canceled without at least 24 hours of prior notice, at the sole discretion of the firm.</p>
          
          <h2 className="text-2xl text-gold-accent font-serif mt-12 mb-4">3. Prohibited Conduct</h2>
          <p>You agree not to exploit this digital platform using automated scraping mechanisms, upload hazardous materials, or misuse the contact vectors to harass attorneys or affiliates of F&amp;V Legal Consultancies.</p>

          <h2 className="text-2xl text-gold-accent font-serif mt-12 mb-4">4. Governing Law</h2>
          <p>These terms shall be governed under the robust jurisdiction and applicable laws governing the operational sectors of F&amp;V Legal Consultancies (including New Delhi and London), without regard to conflict of law provisions.</p>
        </div>
      </div>
    </div>
  );
}
