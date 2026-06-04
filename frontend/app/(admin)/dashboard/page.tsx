export default function DashboardOverview() {
  const stats = [
    { label: "Total Bookings", value: "24" },
    { label: "Pending Payments", value: "3" },
    { label: "Active Services", value: "6" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-serif text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="glass-panel-light p-6 rounded-xl relative overflow-hidden hover:-translate-y-1 transition-transform cursor-pointer">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gold-accent/10 blur-[30px] rounded-full pointer-events-none" />
            <h3 className="text-white/50 text-xs tracking-widest uppercase mb-2">{stat.label}</h3>
            <p className="text-4xl font-serif text-gold-accent relative z-10">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel-heavy rounded-2xl p-8">
        <h2 className="text-xl font-serif text-white mb-6">Recent Consultations</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/50 text-xs tracking-widest uppercase">
                <th className="pb-4 font-normal">Client Name</th>
                <th className="pb-4 font-normal">Service</th>
                <th className="pb-4 font-normal">Date</th>
                <th className="pb-4 font-normal">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-white/80">
              <tr className="border-b border-white/5">
                <td className="py-4">John Doe</td>
                <td className="py-4">Corporate M&amp;A</td>
                <td className="py-4">Oct 24, 2026</td>
                <td className="py-4"><span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">Paid</span></td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4">Aman Singh</td>
                <td className="py-4">Civil Litigation</td>
                <td className="py-4">Oct 25, 2026</td>
                <td className="py-4"><span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 text-xs rounded-full">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
