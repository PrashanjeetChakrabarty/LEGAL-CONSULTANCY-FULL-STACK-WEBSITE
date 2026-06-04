"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Database } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
const getToken = () => localStorage.getItem("admin_token") || "";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/payments`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      setPayments(data.payments || []);
      setLastSync(new Date());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
    const interval = setInterval(fetchPayments, 15000);
    return () => clearInterval(interval);
  }, [fetchPayments]);

  const filtered = filter === "all" ? payments : payments.filter((p) => p.status === filter);

  const totalRevenue = payments
    .filter((p) => p.status === "captured")
    .reduce((acc, p) => acc + p.amount / 100, 0);

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      captured: "badge-green", created: "badge-yellow",
      failed: "badge-red", refunded: "badge-blue",
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
          <h1 className="text-3xl font-serif text-white">Payments</h1>
          <p className="text-white/40 text-sm mt-1 flex items-center gap-2">
            <Database size={11} className="text-[#D4AF37]" />
            All Razorpay payment records · Total captured:{" "}
            <span className="text-[#D4AF37]">₹{totalRevenue.toLocaleString("en-IN")}</span>
            {lastSync && <span className="text-white/20">· {lastSync.toLocaleTimeString("en-IN")}</span>}
          </p>
        </div>
        <button
          id="refresh-payments"
          onClick={fetchPayments}
          className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-white/60 hover:text-white text-sm transition-all"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </motion.div>

      <div className="flex gap-4 mb-6 items-center">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="admin-input w-auto text-sm"
        >
          <option value="all">All Statuses</option>
          <option value="captured">Captured</option>
          <option value="created">Created</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
        <span className="text-white/20 text-xs">Auto-refreshes every 15s</span>
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
          <div className="py-16 text-center">
            <p className="text-white/30 text-sm">
              No payment records yet. They appear after Razorpay checkout completes.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Consultation ID</th>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Status</th>
                  <th>Razorpay Order ID</th>
                  <th>Razorpay Payment ID</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p: any) => (
                  <tr key={p.id}>
                    <td className="text-white/20 font-mono text-xs">{p.id}</td>
                    <td className="font-mono text-xs text-white/50">
                      #{p.consultation_id || p.consultationId}
                    </td>
                    <td className="text-[#D4AF37] font-semibold text-base">
                      ₹{(p.amount / 100).toLocaleString("en-IN")}
                    </td>
                    <td className="text-white/50">{p.currency}</td>
                    <td>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusBadge(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="font-mono text-xs text-white/40 max-w-[160px]">
                      <span className="truncate block" title={p.razorpay_order_id || p.razorpayOrderId}>
                        {p.razorpay_order_id || p.razorpayOrderId || "—"}
                      </span>
                    </td>
                    <td className="font-mono text-xs text-white/40 max-w-[160px]">
                      <span className="truncate block" title={p.razorpay_payment_id || p.razorpayPaymentId}>
                        {p.razorpay_payment_id || p.razorpayPaymentId || "—"}
                      </span>
                    </td>
                    <td className="text-white/40 text-xs whitespace-nowrap">
                      {new Date(p.created_at || p.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && (
          <div className="px-6 py-3 border-t border-white/5 text-white/30 text-xs flex justify-between">
            <span>{filtered.length} records</span>
            <span className="text-white/15">Auto-refreshes every 15s</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
