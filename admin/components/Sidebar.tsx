"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  CreditCard,
  Mail,
  LogOut,
  ChevronRight,
} from "lucide-react";

const menu = [
  { name: "Overview", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Consultations", icon: Calendar, path: "/dashboard/consultations" },
  { name: "Contact Inquiries", icon: Mail, path: "/dashboard/contacts" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; max-age=0";
    localStorage.removeItem("admin_token");
    router.push("/login");
  };

  return (
    <aside className="w-64 min-h-screen glass border-r border-white/5 flex flex-col fixed left-0 top-0 bottom-0 z-40">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/dashboard" className="block">
          <p className="text-xl font-serif text-white tracking-widest">F&V</p>
          <p className="text-[#D4AF37] text-xs uppercase tracking-[0.25em] mt-0.5">
            Admin Portal
          </p>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.path === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.path);

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all group ${
                isActive
                  ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={16} />
                <span className="font-medium">{item.name}</span>
              </div>
              {isActive && <ChevronRight size={14} />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/5">
        <button
          id="admin-logout-btn"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-all"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
