"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Placeholder Firebase Auth Login
    setTimeout(() => {
      setLoading(false);
      // Simulate setting token/cookie
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10">
      <div className="glass-panel-heavy rounded-3xl p-10 w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gold-accent/10 blur-[60px] rounded-full pointer-events-none -z-10" />
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gold-accent/10 flex items-center justify-center text-gold-accent">
            <Lock />
          </div>
        </div>
        <h2 className="text-2xl font-serif text-white text-center mb-8">Admin Portal</h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">Admin Email</label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/20 backdrop-blur-md border border-white/10 border-t-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold-accent transition-colors shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]" 
              placeholder="admin@fvlegal.com"
             />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">Password</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/20 backdrop-blur-md border border-white/10 border-t-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold-accent transition-colors shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]" 
              placeholder="••••••••"
             />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="glass-button w-full py-4 bg-gold-accent/80 hover:bg-gold-accent text-black font-semibold tracking-widest rounded-md transition-colors disabled:opacity-50"
          >
            {loading ? "AUTHENTICATING..." : "LOGIN TO DASHBOARD"}
          </button>
        </form>
      </div>
    </div>
  );
}
