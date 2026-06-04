"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText, Calendar, DollarSign, Settings, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menu = [
    { name: "Overview", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Lawyers", icon: Users, path: "/dashboard/lawyers" },
    { name: "Services", icon: FileText, path: "/dashboard/services" },
    { name: "Bookings", icon: Calendar, path: "/dashboard/bookings" },
    { name: "Payments", icon: DollarSign, path: "/dashboard/payments" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black/50 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="text-xl font-serif text-white tracking-widest">
            F&amp;V <span className="text-gold-accent text-xs block mt-1 uppercase">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.name} 
                href={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-sm transition-colors ${
                  isActive ? "bg-gold-accent/10 text-gold-accent" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span className="text-sm tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link href="/login" className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-sm transition-colors">
            <LogOut size={18} />
            <span className="text-sm tracking-wide">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0a0a0a]">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
