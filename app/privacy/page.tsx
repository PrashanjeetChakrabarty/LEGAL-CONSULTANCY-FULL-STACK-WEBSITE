export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-6 py-32 max-w-4xl min-h-screen relative z-10">
      <div className="glass-panel-heavy p-8 md:p-14 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-accent/5 blur-[80px] rounded-full pointer-events-none -z-10" />
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-8 relative z-10">Privacy Policy</h1>
        <div className="text-white/70 space-y-6 leading-relaxed font-light relative z-10">
          <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
          
          <h2 className="text-2xl text-gold-accent font-serif mt-12 mb-4">1. Information We Collect</h2>
          <p>At F&amp;V Legal Consultancies, we take your privacy extremely seriously. We may collect personal information such as your name, email address, and any details pertaining to your legal inquiries when you submit forms or communicate with our chamber.</p>
          
          <h2 className="text-2xl text-gold-accent font-serif mt-12 mb-4">2. Use of Information</h2>
          <p>Your information is used strictly to provide you with secure legal counsel, optimize your consultation scheduling experience, and comply with mandatory regulatory obligations. F&amp;V Legal Consultancies does not sell, trade, or maliciously distribute confidential client data.</p>
          
          <h2 className="text-2xl text-gold-accent font-serif mt-12 mb-4">3. Data Protection and Security</h2>
          <p>Information shared via our digital portals is heavily encrypted and guarded across secure servers. Strict attorney-client privilege protocols apply to all matters discussed internally within the constraints of applicable law.</p>

          <h2 className="text-2xl text-gold-accent font-serif mt-12 mb-4">4. Client Rights</h2>
          <p>You have the absolute right to request digital copies of your retained data, demand complete erasure, or formally amend any misinformation we may hold concerning you, subject to ongoing legal proceedings.</p>
        </div>
      </div>
    </div>
  );
}
