"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { RefreshCw, MailOpen, Mail, Database } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
const getToken = () => localStorage.getItem("admin_token") || "";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<any | null>(null);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/contacts`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      setContacts(data.contacts || []);
      setLastSync(new Date());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Mark read — MySQL uses numeric id
  const markAsRead = async (id: number) => {
    try {
      await fetch(`${API_URL}/api/contacts/${id}/read`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, read: true } : c))
      );
      setSelected((prev: any) => prev?.id === id ? { ...prev, read: true } : prev);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContacts();
    // Auto-refresh every 15 seconds
    const interval = setInterval(fetchContacts, 15000);
    return () => clearInterval(interval);
  }, [fetchContacts]);

  const filtered =
    filter === "all"
      ? contacts
      : filter === "unread"
      ? contacts.filter((c) => !c.read)
      : contacts.filter((c) => c.read);

  const formatDate = (d: any) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  const formatDateTime = (d: any) =>
    new Date(d).toLocaleString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-serif text-white">Contact Inquiries</h1>
          <p className="text-white/40 text-sm mt-1 flex items-center gap-2">
            <Database size={11} className="text-[#D4AF37]" />
            Messages from the contact form — {" "}
            <span className="text-[#D4AF37]">{contacts.filter((c) => !c.read).length} unread</span>
            {lastSync && <span className="text-white/20">· {lastSync.toLocaleTimeString("en-IN")}</span>}
          </p>
        </div>
        <button
          id="refresh-contacts"
          onClick={fetchContacts}
          className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-white/60 hover:text-white text-sm transition-all"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </motion.div>

      <div className="flex gap-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="admin-input w-auto text-sm"
        >
          <option value="all">All Messages</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>
        <span className="text-white/20 text-xs self-center">Auto-refreshes every 15s</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message List */}
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
              <p className="text-white/30 text-sm">No inquiries found.</p>
              <p className="text-white/15 text-xs mt-1">Submit the contact form on the public site.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {filtered.map((c: any) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelected(c);
                    if (!c.read) markAsRead(c.id);
                  }}
                  className={`w-full text-left px-5 py-4 hover:bg-white/5 transition-all flex items-start gap-3 ${
                    selected?.id === c.id ? "bg-white/5" : ""
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {c.read ? (
                      <MailOpen size={14} className="text-white/30" />
                    ) : (
                      <Mail size={14} className="text-[#D4AF37]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium truncate ${c.read ? "text-white/60" : "text-white"}`}>
                        {c.name}
                      </p>
                      <p className="text-white/30 text-xs shrink-0 ml-2">
                        {formatDate(c.created_at || c.createdAt)}
                      </p>
                    </div>
                    <p className="text-white/40 text-xs truncate">{c.email}</p>
                    {c.subject && <p className="text-[#D4AF37]/50 text-xs truncate">{c.subject}</p>}
                    <p className="text-white/30 text-xs truncate mt-0.5">{c.message}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
          {!loading && (
            <div className="px-5 py-3 border-t border-white/5 text-white/30 text-xs">
              {filtered.length} messages
            </div>
          )}
        </motion.div>

        {/* Detail Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6"
        >
          {selected ? (
            <div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-serif text-white">{selected.name}</h2>
                  <p className="text-white/40 text-sm">{selected.email}</p>
                  {selected.phone && <p className="text-white/30 text-xs mt-0.5">{selected.phone}</p>}
                  {selected.subject && (
                    <p className="text-[#D4AF37]/70 text-xs mt-1 tracking-wide">{selected.subject}</p>
                  )}
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full ${selected.read ? "badge-gray" : "badge-yellow"}`}>
                  {selected.read ? "Read" : "Unread"}
                </span>
              </div>

              {/* Message body */}
              <div className="glass rounded-xl p-5 mb-4">
                <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>

              {/* Meta */}
              <div className="space-y-2 text-xs text-white/25">
                <p>ID: <span className="font-mono text-white/40">#{selected.id}</span></p>
                <p>Received: {formatDateTime(selected.created_at || selected.createdAt)}</p>
              </div>

              {/* Reply shortcut */}
              <a
                href={`mailto:${selected.email}?subject=Re: Your inquiry — F%26V Legal Consultancies`}
                className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#D4AF37]/20 text-[#D4AF37]/70 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 text-xs tracking-widest uppercase transition-all"
              >
                <Mail size={12} />
                Reply via Email
              </a>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-20 text-center">
              <Mail size={28} className="text-white/10 mb-3" />
              <p className="text-white/20 text-sm">Select a message to view details</p>
              <p className="text-white/10 text-xs mt-1">Click any message on the left</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
