"use client";

import { useEffect, useState, useCallback } from "react";
import { Calendar, CreditCard, Mail, TrendingUp, Clock, CheckCircle2, RefreshCw, Database } from "lucide-react";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("admin_token") : "");

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon: Icon, color, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl border border-white/5 bg-[#0d0d0d] p-6 relative overflow-hidden group hover:-translate-y-0.5 transition-transform cursor-default"
    >
      <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity" style={{ background: color }} />
      <div className="flex items-start justify-between mb-4">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
          <Icon size={16} style={{ color }} />
        </div>
      </div>
      <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">{label}</p>
      <p className="text-3xl font-serif text-white">{value}</p>
      {sub && <p className="text-white/25 text-xs mt-1">{sub}</p>}
    </motion.div>
  );
}

// ── Status badge ──────────────────────────────────────────────────────────────
function Badge({ value, colorMap }: { value: string; colorMap: Record<string, string> }) {
  const cls = colorMap[value] || "bg-white/10 text-white/40";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize ${cls}`}>
      {value}
    </span>
  );
}

const paymentColors: Record<string, string> = {
  paid: "bg-green-500/15 text-green-400",
  unpaid: "bg-yellow-500/15 text-yellow-400",
  failed: "bg-red-500/15 text-red-400",
  refunded: "bg-blue-500/15 text-blue-400",
};
const statusColors: Record<string, string> = {
  confirmed: "bg-green-500/15 text-green-400",
  pending: "bg-yellow-500/15 text-yellow-400",
  completed: "bg-blue-500/15 text-blue-400",
  cancelled: "bg-red-500/15 text-red-400",
};

// ── Main dashboard ────────────────────────────────────────────────────────────
export default function DashboardOverview() {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${getToken()}` };
      const [cRes, pRes, ctRes] = await Promise.all([
        fetch(`${API_URL}/api/consultations`, { headers }),
        fetch(`${API_URL}/api/payments`, { headers }),
        fetch(`${API_URL}/api/contacts`, { headers }),
      ]);
      const [cData, pData, ctData] = await Promise.all([cRes.json(), pRes.json(), ctRes.json()]);
      setConsultations(cData.consultations || []);
      setPayments(pData.payments || []);
      setContacts(ctData.contacts || []);
      setLastRefresh(new Date());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`${API_URL}/api/consultations/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setConsultations((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        );
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  useEffect(() => {
    fetchAll();
    // Auto-refresh every 30 seconds so new form submissions appear automatically
    const interval = setInterval(fetchAll, 30000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  const stats = {
    total: consultations.length,
    contacts: contacts.length,
    unread: contacts.filter((c) => !c.read).length,
  };

  const recent = consultations.slice(0, 8);

  return (
    <div>
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-serif text-white">Dashboard Overview</h1>
          <p className="text-white/30 text-sm mt-1 flex items-center gap-2">
            <Database size={12} className="text-[#D4AF37]" />
            Live data from MySQL · F&V Legal Consultancies
            {lastRefresh && (
              <span className="text-white/20">· Last synced {lastRefresh.toLocaleTimeString("en-IN")}</span>
            )}
          </p>
        </div>
        <button
          onClick={fetchAll}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/8 text-white/50 hover:text-white hover:border-white/20 text-sm transition-all"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </motion.div>

      {/* ── KPI Grid ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <StatCard label="Total Consultations" value={stats.total} icon={Calendar} color="#D4AF37" delay={0} />
        <StatCard label="Contact Inquiries" value={stats.contacts} icon={Mail} color="#A78BFA" delay={0.2} />
        <StatCard label="Unread Inquiries" value={stats.unread} sub="Needs attention" icon={TrendingUp} color="#F472B6" delay={0.25} />
      </div>

      {/* ── Recent Consultations Table ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-white/5 bg-[#0d0d0d] overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-base font-serif text-white">Recent Consultations</h2>
            <p className="text-white/30 text-xs mt-0.5">Auto-refreshes every 30 seconds from MySQL</p>
          </div>
          <span className="text-xs text-white/20">{consultations.length} total records</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-6 h-6 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
          </div>
        ) : recent.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-white/20 text-sm">No consultations yet.</p>
            <p className="text-white/10 text-xs mt-1">Submit a booking from the public website to see it here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {["#", "Client", "Practice Area", "Mode", "Status", "Date"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] uppercase tracking-widest text-white/25 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {recent.map((c: any, i: number) => (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4 text-white/20 text-xs font-mono">{c.id}</td>
                    <td className="px-5 py-4">
                      <p className="text-white font-medium">{c.name}</p>
                      <p className="text-white/30 text-xs">{c.email}</p>
                      {c.phone && <p className="text-white/20 text-xs">{c.phone}</p>}
                    </td>
                    <td className="px-5 py-4 text-white/60 whitespace-nowrap">{c.practice_area || c.practiceArea}</td>
                    <td className="px-5 py-4 capitalize text-white/50">{c.consultation_mode || c.consultationMode}</td>
                    <td className="px-5 py-4">
                      <select
                        value={c.status || "pending"}
                        onChange={(e) => updateStatus(c.id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-full font-medium capitalize bg-transparent border outline-none appearance-none cursor-pointer ${
                          c.status === "confirmed" ? "border-green-500/30 text-green-400 bg-green-500/10" :
                          c.status === "completed" ? "border-blue-500/30 text-blue-400 bg-blue-500/10" :
                          c.status === "cancelled" ? "border-red-500/30 text-red-400 bg-red-500/10" :
                          "border-yellow-500/30 text-yellow-400 bg-yellow-500/10"
                        }`}
                      >
                        <option value="pending" className="bg-[#0d0d0d] text-white">Pending</option>
                        <option value="confirmed" className="bg-[#0d0d0d] text-white">Confirmed</option>
                        <option value="completed" className="bg-[#0d0d0d] text-white">Completed</option>
                        <option value="cancelled" className="bg-[#0d0d0d] text-white">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-5 py-4 text-white/25 text-xs whitespace-nowrap">
                      {new Date(c.created_at || c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* ── Recent Contacts ────────────────────────────────────────────────── */}
      {contacts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 rounded-2xl border border-white/5 bg-[#0d0d0d] overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-white/5">
            <h2 className="text-base font-serif text-white">Recent Contact Inquiries</h2>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {contacts.slice(0, 5).map((c: any) => (
              <div key={c.id} className="px-6 py-4 flex items-start gap-4">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${c.read ? "bg-white/10" : "bg-[#D4AF37]"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-white text-sm font-medium">{c.name}</span>
                    <span className="text-white/30 text-xs">{c.email}</span>
                    <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full ${c.read ? "bg-white/5 text-white/30" : "bg-[#D4AF37]/15 text-[#D4AF37]"}`}>
                      {c.read ? "Read" : "New"}
                    </span>
                  </div>
                  <p className="text-white/40 text-xs truncate">{c.subject} — {c.message}</p>
                </div>
                <span className="text-white/20 text-xs shrink-0">
                  {new Date(c.created_at || c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
