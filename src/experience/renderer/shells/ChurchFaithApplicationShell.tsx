import React, { useState } from "react";
import { 
  Church, Heart, Users, DollarSign, Calendar, Building, BookOpen, 
  Plus, Search, UserPlus, HeartHandshake, ShieldCheck, CheckCircle2
} from "lucide-react";
import { JumoMasterManifestRegistry } from "../../../core/specification/manifests/masterManifestRegistry";

interface ChurchFaithApplicationShellProps {
  onBack: () => void;
  onNavigateToPlatform?: (platformId: string) => void;
}

export function ChurchFaithApplicationShell({ onBack, onNavigateToPlatform }: ChurchFaithApplicationShellProps) {
  const manifest = JumoMasterManifestRegistry.get("prod-church-faith");
  const [activeTab, setActiveTab] = useState<"congregations" | "members" | "pastoral" | "giving" | "welfare" | "projects" | "accounts">("giving");
  const [searchQuery, setSearchQuery] = useState("");
  const [titheModalOpen, setTitheModalOpen] = useState(false);

  const [givings, setGivings] = useState([
    { id: "TTH-8801", member: "Elder Isaac Wandera", category: "Tithe", amount: "UGX 2,500,000", branch: "Main Sanctuary Kampala", date: "Sunday 24 Aug", status: "FAAP_POSTED" },
    { id: "TTH-8802", member: "Anonymous Congregant", category: "Offertory", amount: "UGX 480,000", branch: "Main Sanctuary Kampala", date: "Sunday 24 Aug", status: "FAAP_POSTED" },
    { id: "TTH-8803", member: "Apostle & Mrs. Ssebaggala", category: "Building Pledge", amount: "UGX 10,000,000", branch: "Entebbe Satellite", date: "Friday Service", status: "FAAP_POSTED" },
    { id: "TTH-8804", member: "Youth Ministry Choir", category: "Welfare Fund", amount: "UGX 850,000", branch: "Jinja Satellite", date: "Sunday 24 Aug", status: "FAAP_POSTED" },
  ]);

  const [members] = useState([
    { id: "CHR-101", name: "Pastor Samuel Kiggundu", role: "Senior Pastor", cellGroup: "Zion Cell - Kololo", status: "ACTIVE" },
    { id: "CHR-102", name: "Deaconess Mary Nabwire", role: "Welfare Team Lead", cellGroup: "Bethel Cell - Ntinda", status: "ACTIVE" },
    { id: "CHR-103", name: "Joshua Lwanga", role: "Worship Leader", cellGroup: "Shiloh Cell - Bugolobi", status: "ACTIVE" },
  ]);

  const [titheForm, setTitheForm] = useState({ member: "", category: "Tithe", amount: "", branch: "Main Sanctuary Kampala" });

  const handleRecordTithe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titheForm.amount) return;
    const newG = {
      id: `TTH-${Math.floor(8800 + Math.random() * 1000)}`,
      member: titheForm.member || "Anonymous Congregant",
      category: titheForm.category,
      amount: `UGX ${Number(titheForm.amount).toLocaleString()}`,
      branch: titheForm.branch,
      date: "Today",
      status: "FAAP_POSTED"
    };
    setGivings([newG, ...givings]);
    setTitheForm({ member: "", category: "Tithe", amount: "", branch: "Main Sanctuary Kampala" });
    setTitheModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans" id="jumo-church-app">
      {/* 1. TOP BRAND BAR */}
      <header className="bg-white border-b border-amber-200/50 px-8 py-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-amber-600 text-white rounded-[24px] flex items-center justify-center font-black shadow-xl shadow-amber-600/20">
            <Church className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black tracking-tight text-slate-900">JUMO CHURCH & FAITH</h1>
              <span className="bg-amber-50 text-amber-700 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full border border-amber-100">
                Ministry Governance
              </span>
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Sovereign Congregational ERP • FAAP Reconciled</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTitheModalOpen(true)}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Record Giving
          </button>
          <button
            onClick={onBack}
            className="px-4 py-3 text-slate-400 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer"
          >
            Exit
          </button>
        </div>
      </header>

      {/* 2. STATS RIBBON */}
      <section className="px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Congregants", value: "6,420", sub: "Main Sanctuary & 4 Satellites", icon: Users, color: "text-amber-600" },
          { label: "Weekly Offerings", value: "UGX 45.8M", sub: "99.8% FAAP Reconciled", icon: DollarSign, color: "text-emerald-600" },
          { label: "Active Ministries", value: "14 Depts", sub: "Worship, Youth, Outreach", icon: Heart, color: "text-rose-500" },
          { label: "Community Welfare", value: "UGX 128.5M", sub: "Orphan & Medical Support", icon: HeartHandshake, color: "text-amber-600" }
        ].map(stat => (
          <div key={stat.label} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">{stat.label}</span>
              <stat.icon className={`w-5 h-5 ${stat.color} opacity-40`} />
            </div>
            <div className="mt-4">
              <div className={`text-3xl font-black ${stat.color} tracking-tighter`}>{stat.value}</div>
              <span className="text-[11px] font-bold text-slate-500 block mt-2">{stat.sub}</span>
            </div>
          </div>
        ))}
      </section>

      {/* 3. TABS */}
      <nav className="bg-white border-y border-slate-200 px-8 flex items-center gap-2 overflow-x-auto">
        {[
          { id: "giving", label: "Offerings & Pledges", icon: DollarSign },
          { id: "congregations", label: "Congregations", icon: Church },
          { id: "members", label: "Member Directory", icon: Users },
          { id: "pastoral", label: "Pastoral Care", icon: Heart },
          { id: "welfare", label: "Welfare Fund", icon: HeartHandshake },
          { id: "projects", label: "Construction", icon: Building },
          { id: "accounts", label: "Ministry Audit", icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-6 px-5 font-black text-[10px] uppercase tracking-[0.25em] flex items-center gap-3 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "text-amber-700 bg-amber-50 shadow-[inset_0_-4px_0_0_#d97706]"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* 4. MAIN WORKSPACE */}
      <main className="flex-1 p-8 max-w-7xl w-full mx-auto space-y-10">
        {activeTab === "giving" && (
          <div className="space-y-10">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Ministry Offerings</h2>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-2">Authoritative Financial Stewardship & Ledger</p>
              </div>

              <div className="relative w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Query ledger records..."
                  className="w-full bg-white border border-slate-200 rounded-3xl pl-12 pr-4 py-4 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/10"
                />
              </div>
            </div>

            <div className="bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/50">
              <table className="w-full text-left text-xs font-bold text-slate-600">
                <thead className="bg-slate-50 text-slate-400 font-black uppercase tracking-[0.2em] border-b border-slate-200">
                  <tr>
                    <th className="p-10">Reference</th>
                    <th className="p-10">Member / Donor</th>
                    <th className="p-10">Giving Category</th>
                    <th className="p-10">Amount (UGX)</th>
                    <th className="p-10 text-right">FAAP Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {givings
                    .filter(g => g.member.toLowerCase().includes(searchQuery.toLowerCase()) || g.id.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((g) => (
                      <tr key={g.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-10 font-mono text-amber-600">{g.id}</td>
                        <td className="p-10 text-slate-900 text-sm font-black">{g.member}</td>
                        <td className="p-10 uppercase tracking-widest text-[10px] text-slate-400">{g.category}</td>
                        <td className="p-10 font-black text-emerald-600 text-lg tracking-tighter">{g.amount}</td>
                        <td className="p-10 text-right">
                          <span className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-black tracking-widest uppercase border border-emerald-100">
                            {g.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "pastoral" && (
          <div className="max-w-2xl space-y-8">
            <div className="bg-amber-600 p-12 rounded-[56px] text-white shadow-2xl shadow-amber-600/30">
              <Heart className="w-12 h-12 mb-6 opacity-80" />
              <h2 className="text-4xl font-black tracking-tighter mb-4">Pastoral Care Engine</h2>
              <p className="text-amber-50 font-medium leading-relaxed">Centralized management for pastoral counseling sessions, prayer request tracking, and spiritual growth monitoring across all church cells.</p>
            </div>
          </div>
        )}
      </main>

      {/* TITHE MODAL */}
      {titheModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xl flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-[56px] max-w-md w-full p-12 space-y-8 shadow-2xl">
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Record Ministry Offering</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Sovereign Financial Entry</p>
            </div>
            
            <form onSubmit={handleRecordTithe} className="space-y-6 text-xs font-black uppercase tracking-widest text-slate-400">
              <div className="space-y-3">
                <label>Member / Donor Name</label>
                <input
                  type="text"
                  value={titheForm.member}
                  onChange={(e) => setTitheForm({ ...titheForm, member: e.target.value })}
                  placeholder="Anonymous"
                  className="w-full bg-slate-50 border-none rounded-3xl p-5 text-slate-900 outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-3">
                  <label>Giving Category</label>
                  <select
                    value={titheForm.category}
                    onChange={(e) => setTitheForm({ ...titheForm, category: e.target.value })}
                    className="w-full bg-slate-50 border-none rounded-3xl p-5 text-slate-900 outline-none focus:ring-2 focus:ring-amber-500/20 appearance-none"
                  >
                    <option>Tithe</option>
                    <option>Sunday Offertory</option>
                    <option>Building Pledge</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label>Amount (UGX)</label>
                  <input
                    type="number"
                    required
                    value={titheForm.amount}
                    onChange={(e) => setTitheForm({ ...titheForm, amount: e.target.value })}
                    className="w-full bg-slate-50 border-none rounded-3xl p-5 text-slate-900 outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setTitheModalOpen(false)}
                  className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-3xl font-black hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-5 bg-amber-600 text-white rounded-3xl font-black shadow-xl shadow-amber-600/30 hover:bg-amber-700 transition-all"
                >
                  Confirm Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
