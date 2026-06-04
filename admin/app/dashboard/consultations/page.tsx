"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, RefreshCw, Database } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
const getToken = () => localStorage.getItem("admin_token") || "";

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const fetchConsultations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/consultations`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      setConsultations(data.consultations || []);
      setFiltered(data.consultations || []);
      setLastSync(new Date());
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
    fetchConsultations();
    // Auto-refresh every 15 seconds — picks up new form submissions instantly
    const interval = setInterval(fetchConsultations, 15000);
    return () => clearInterval(interval);
  }, [fetchConsultations]);

  useEffect(() => {
    let list = [...consultations];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name?.toLowerCase().includes(q) ||
          c.email?.toLowerCase().includes(q) ||
          (c.practice_area || c.practiceArea)?.toLowerCase().includes(q)
      );
    }
    setFiltered(list);
  }, [search, consultations]);

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      confirmed: "badge-green", pending: "badge-yellow", completed: "badge-blue", cancelled: "badge-red",
    };
    return map[status] || "badge-gray";
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-serif text-white">Consultations</h1>
          <p className="text-white/40 text-sm mt-1 flex items-center gap-2">
            <Database size={11} className="text-[#D4AF37]" />
            All booking requests from MySQL
            {lastSync && <span className="text-white/20">· {lastSync.toLocaleTimeString("en-IN")}</span>}
          </p>
        </div>
        <button
          id="refresh-consultations"
          onClick={fetchConsultations}
          className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-white/60 hover:text-white text-sm transition-all"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </motion.div>

      {/* Filters */}
      <div className="mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search by name, email, area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input pl-9 text-sm"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl overflow-hidden"
      >
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-6 h-6 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-white/30 text-sm">No consultations found.</p>
            <p className="text-white/15 text-xs mt-1">Submit the booking form on the public site to see data here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Client</th>
                  <th>Practice Area</th>
                  <th>Mode</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c: any) => (
                  <tr key={c.id}>
                    <td className="text-white/20 font-mono text-xs">{c.id}</td>
                    <td>
                      <div>
                        <p className="font-medium text-white">{c.name}</p>
                        <p className="text-white/40 text-xs">{c.email}</p>
                        {c.phone && <p className="text-white/30 text-xs">{c.phone}</p>}
                      </div>
                    </td>
                    <td className="whitespace-nowrap">{c.practice_area || c.practiceArea}</td>
                    <td className="capitalize text-white/70">{c.consultation_mode || c.consultationMode}</td>
                    <td>
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
                        <option value="pending" className="bg-[#0a0a0a] text-white">Pending</option>
                        <option value="confirmed" className="bg-[#0a0a0a] text-white">Confirmed</option>
                        <option value="completed" className="bg-[#0a0a0a] text-white">Completed</option>
                        <option value="cancelled" className="bg-[#0a0a0a] text-white">Cancelled</option>
                      </select>
                    </td>
                    <td className="text-white/40 text-xs whitespace-nowrap">
                      {new Date(c.created_at || c.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </td>
                    <td className="max-w-[200px]">
                      <p className="text-white/50 text-xs truncate" title={c.description}>
                        {c.description}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && (
          <div className="px-6 py-3 border-t border-white/5 text-white/30 text-xs flex items-center justify-between">
            <span>{filtered.length} of {consultations.length} records</span>
            <span className="text-white/15">Auto-refreshes every 15s</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
