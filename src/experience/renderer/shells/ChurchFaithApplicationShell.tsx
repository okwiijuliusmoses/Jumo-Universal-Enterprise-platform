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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" id="jumo-church-app">
      {/* 1. TOP BRAND BAR */}
      <header className="bg-slate-900 border-b border-rose-500/30 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-gradient-to-br from-rose-600 to-rose-900 text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-rose-500/20 border border-rose-400/40">
            <Church className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-white">JUMO CHURCH & FAITH</h1>
              <span className="bg-rose-500/20 text-rose-400 text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full border border-rose-500/30">
                Ministry & Congregational ERP
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Authoritative Faith Ministry Operations & FAAP Financial Governance</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTitheModalOpen(true)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Record Tithe / Offering
          </button>
        </div>
      </header>

      {/* 2. STATS RIBBON */}
      <section className="bg-slate-900/60 border-b border-slate-800 px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-4 rounded-xl border border-rose-500/20 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Active Congregants</span>
          <div className="text-lg md:text-xl font-black text-white mt-1">6,420 Members</div>
          <span className="text-[10px] font-bold text-rose-400 block mt-1">Main Sanctuary & 4 Satellites</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Weekly Tithes & Offerings</span>
          <div className="text-lg md:text-xl font-black text-rose-400 mt-1">UGX 45.8 Million</div>
          <span className="text-[10px] font-bold text-emerald-400 block mt-1">99.8% FAAP Reconciled</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Active Ministries</span>
          <div className="text-lg md:text-xl font-black text-white mt-1">14 Departments</div>
          <span className="text-[10px] font-bold text-slate-400 block mt-1">Worship, Youth, Outreach, Choir</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Community Welfare Fund</span>
          <div className="text-lg md:text-xl font-black text-emerald-400 mt-1">UGX 128.5 Million</div>
          <span className="text-[10px] font-bold text-slate-400 block mt-1">Orphan & Medical Support</span>
        </div>
      </section>

      {/* 3. TABS */}
      <nav className="bg-slate-900 border-b border-slate-800 px-6 flex items-center gap-2 overflow-x-auto">
        {[
          { id: "giving", label: "Tithes, Offerings & Pledges", icon: DollarSign },
          { id: "congregations", label: "Congregations & Cells", icon: Church },
          { id: "members", label: "Member Directory", icon: Users },
          { id: "pastoral", label: "Pastoral Care & Prayer", icon: Heart },
          { id: "welfare", label: "Welfare & Benevolence", icon: HeartHandshake },
          { id: "projects", label: "Church Projects & Building", icon: Building },
          { id: "accounts", label: "Ministry Ledger & Audit", icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "border-rose-400 text-rose-400 bg-rose-500/10"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* 4. MAIN WORKSPACE */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {activeTab === "giving" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-black text-white">Ministry Tithes, Offerings & Building Pledges</h2>
                <p className="text-xs text-slate-400">FAAP double-entry reconciled Sunday giving records and bank transfers.</p>
              </div>

              <div className="relative w-64">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search giving entry or member..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500/50"
                />
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Receipt Ref</th>
                    <th className="p-4">Congregant / Donor</th>
                    <th className="p-4">Giving Category</th>
                    <th className="p-4">Amount (UGX)</th>
                    <th className="p-4">Sanctuary Branch</th>
                    <th className="p-4">FAAP Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {givings
                    .filter(g => g.member.toLowerCase().includes(searchQuery.toLowerCase()) || g.id.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((g) => (
                      <tr key={g.id} className="hover:bg-slate-800/40">
                        <td className="p-4 font-mono font-bold text-rose-400">{g.id}</td>
                        <td className="p-4 font-bold text-white">{g.member}</td>
                        <td className="p-4 text-slate-300">{g.category}</td>
                        <td className="p-4 font-black text-emerald-400">{g.amount}</td>
                        <td className="p-4 text-slate-400 text-[11px]">{g.branch}</td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-black border border-emerald-500/30">
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

        {activeTab === "members" && (
          <div className="space-y-6">
            <h2 className="text-lg font-black text-white">Member Directory & Home Cell Network</h2>
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Member ID</th>
                    <th className="p-4">Full Name</th>
                    <th className="p-4">Ministry Role</th>
                    <th className="p-4">Cell Group</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {members.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-800/40">
                      <td className="p-4 font-mono font-bold text-rose-400">{m.id}</td>
                      <td className="p-4 font-bold text-white">{m.name}</td>
                      <td className="p-4 text-slate-300">{m.role}</td>
                      <td className="p-4 text-slate-400">{m.cellGroup}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-black">
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* TITHE MODAL */}
      {titheModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-white">Record Ministry Tithe / Offering</h3>
            <form onSubmit={handleRecordTithe} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Congregant / Donor Name (Optional)</label>
                <input
                  type="text"
                  value={titheForm.member}
                  onChange={(e) => setTitheForm({ ...titheForm, member: e.target.value })}
                  placeholder="Leave empty for Anonymous"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Giving Category</label>
                <select
                  value={titheForm.category}
                  onChange={(e) => setTitheForm({ ...titheForm, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                >
                  <option>Tithe</option>
                  <option>Sunday Offertory</option>
                  <option>Sanctuary Building Pledge</option>
                  <option>Welfare & Benevolence</option>
                  <option>Missions & Outreach</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Amount (UGX)</label>
                <input
                  type="number"
                  required
                  value={titheForm.amount}
                  onChange={(e) => setTitheForm({ ...titheForm, amount: e.target.value })}
                  placeholder="e.g. 500000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setTitheModalOpen(false)}
                  className="flex-1 py-3 bg-slate-800 text-slate-300 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-rose-600 text-white rounded-xl font-black cursor-pointer shadow-md"
                >
                  Post to Ministry Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
