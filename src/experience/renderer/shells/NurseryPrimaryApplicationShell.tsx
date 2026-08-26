import React, { useState } from "react";
import { 
  School, Baby, Calendar, BookOpen, DollarSign, Users, MessageSquare, 
  Plus, Search, CheckCircle2, AlertCircle, Clock, UserPlus, FileSpreadsheet,
  Award, Heart, ShieldCheck
} from "lucide-react";
import { JumoMasterManifestRegistry } from "../../../core/specification/manifests/masterManifestRegistry";

interface NurseryPrimaryApplicationShellProps {
  onBack: () => void;
  onNavigateToPlatform?: (platformId: string) => void;
}

export function NurseryPrimaryApplicationShell({ onBack, onNavigateToPlatform }: NurseryPrimaryApplicationShellProps) {
  const manifest = JumoMasterManifestRegistry.get("prod-nursery-primary");
  const [activeTab, setActiveTab] = useState<"pupils" | "attendance" | "curriculum" | "bursar" | "staff" | "parents">("pupils");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [newPupilModalOpen, setNewPupilModalOpen] = useState(false);

  const [pupils, setPupils] = useState([
    { id: "PUP-1001", name: "David Kato", classStream: "Primary 4 Blue", parent: "Grace Kato", contact: "+256 772 110022", feesStatus: "PAID", attendance: "98%" },
    { id: "PUP-1002", name: "Sandra Babirye", classStream: "Primary 2 Gold", parent: "Robert Mutesi", contact: "+256 701 445566", feesStatus: "PARTIAL", attendance: "100%" },
    { id: "PUP-1003", name: "Ethan Ocheing", classStream: "Top Class Nursery", parent: "Dr. Ocheing", contact: "+256 782 990011", feesStatus: "PAID", attendance: "95%" },
    { id: "PUP-1004", name: "Joy Namutebi", classStream: "Primary 7 Eagles", parent: "Sarah Namutebi", contact: "+256 752 334455", feesStatus: "PAID", attendance: "99%" },
    { id: "PUP-1005", name: "Kevin Opio", classStream: "Middle Class Nursery", parent: "Francis Opio", contact: "+256 712 887766", feesStatus: "PENDING", attendance: "92%" },
  ]);

  const [pupilForm, setPupilForm] = useState({ name: "", classStream: "Primary 1", parent: "", contact: "" });

  const handleCreatePupil = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pupilForm.name || !pupilForm.parent) return;
    const newP = {
      id: `PUP-${Math.floor(1000 + Math.random() * 1000)}`,
      name: pupilForm.name,
      classStream: pupilForm.classStream,
      parent: pupilForm.parent,
      contact: pupilForm.contact || "+256 700 000000",
      feesStatus: "PENDING",
      attendance: "100%"
    };
    setPupils([newP, ...pupils]);
    setPupilForm({ name: "", classStream: "Primary 1", parent: "", contact: "" });
    setNewPupilModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" id="jumo-nursery-primary-app">
      {/* 1. APPLICATION TOP BRAND BAR */}
      <header className="bg-slate-900 border-b border-emerald-500/30 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-emerald-700 text-slate-950 rounded-2xl flex items-center justify-center font-black shadow-lg shadow-emerald-500/20 border border-emerald-400/40">
            <School className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-white">JUMO NURSERY & PRIMARY</h1>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full border border-emerald-500/30">
                Early Education ERP
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Authoritative Primary Education Operating Environment</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setNewPupilModalOpen(true)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" /> Enroll New Pupil
          </button>
        </div>
      </header>

      {/* 2. STATS RIBBON */}
      <section className="bg-slate-900/60 border-b border-slate-800 px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-4 rounded-xl border border-emerald-500/20 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Enrolled Pupils</span>
          <div className="text-lg md:text-xl font-black text-white mt-1">1,420 Pupils</div>
          <span className="text-[10px] font-bold text-emerald-400 block mt-1">Nursery: 340 • Primary: 1,080</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Today's Attendance Rate</span>
          <div className="text-lg md:text-xl font-black text-emerald-400 mt-1">98.4%</div>
          <span className="text-[10px] font-bold text-slate-400 block mt-1">48 Absent • Recorded 8:00 AM</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Term Tuition Collections</span>
          <div className="text-lg md:text-xl font-black text-white mt-1">UGX 384.2 Million</div>
          <span className="text-[10px] font-bold text-emerald-400 block mt-1">86.5% Paid • FAAP Synced</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Staff On Duty</span>
          <div className="text-lg md:text-xl font-black text-white mt-1">48 Educators</div>
          <span className="text-[10px] font-bold text-emerald-400 block mt-1">Class Teachers & Care Givers</span>
        </div>
      </section>

      {/* 3. TABS */}
      <nav className="bg-slate-900 border-b border-slate-800 px-6 flex items-center gap-2 overflow-x-auto">
        {[
          { id: "pupils", label: "Pupils & Admissions", icon: Baby },
          { id: "attendance", label: "Daily Attendance & Roll Call", icon: Calendar },
          { id: "curriculum", label: "Curriculum & Assessment", icon: BookOpen },
          { id: "bursar", label: "Fee Receipts & Ledger", icon: DollarSign },
          { id: "staff", label: "Teachers & Duty Roster", icon: Users },
          { id: "parents", label: "Parent Portal & SMS", icon: MessageSquare }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "border-emerald-400 text-emerald-400 bg-emerald-500/10"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* 4. MAIN CONTENT WORKSPACE */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {activeTab === "pupils" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-lg font-black text-white">Pupil Registry & Stream Allocation</h2>
                <p className="text-xs text-slate-400">Manage early child development records, parent contacts, and class streams.</p>
              </div>

              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pupil or parent..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Pupil ID</th>
                    <th className="p-4">Pupil Name</th>
                    <th className="p-4">Class Stream</th>
                    <th className="p-4">Parent / Guardian</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Tuition Status</th>
                    <th className="p-4">Attendance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {pupils
                    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.parent.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((p) => (
                      <tr key={p.id} className="hover:bg-slate-800/40">
                        <td className="p-4 font-mono font-bold text-emerald-400">{p.id}</td>
                        <td className="p-4 font-bold text-white">{p.name}</td>
                        <td className="p-4 text-slate-300">{p.classStream}</td>
                        <td className="p-4 text-slate-400">{p.parent}</td>
                        <td className="p-4 font-mono text-slate-400">{p.contact}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                            p.feesStatus === "PAID" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          }`}>
                            {p.feesStatus}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-emerald-400">{p.attendance}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "attendance" && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-black text-white">Daily Attendance Marking Matrix</h2>
            <p className="text-xs text-slate-400">Class roll calls recorded digitally by primary class teachers.</p>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400">
              [ROLL-CALL] P1 Blue: 42 Present, 1 Absent • P2 Gold: 40 Present, 0 Absent • P7 Eagles: 45 Present, 2 Absent
            </div>
          </div>
        )}

        {activeTab === "bursar" && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-black text-white">Primary School Tuition & Fees Ledger</h2>
            <p className="text-xs text-slate-400">Automated tuition receipting linked with central FAAP Double-Entry ledger.</p>
            <div className="text-2xl font-black text-emerald-400">UGX 384.200.000 Collected</div>
          </div>
        )}
      </main>

      {/* NEW PUPIL MODAL */}
      {newPupilModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-white">Enroll New Primary / Nursery Pupil</h3>
            <form onSubmit={handleCreatePupil} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Pupil Full Name</label>
                <input
                  type="text"
                  required
                  value={pupilForm.name}
                  onChange={(e) => setPupilForm({ ...pupilForm, name: e.target.value })}
                  placeholder="e.g. John Baptist Kato"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Class Stream</label>
                <select
                  value={pupilForm.classStream}
                  onChange={(e) => setPupilForm({ ...pupilForm, classStream: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                >
                  <option>Baby Class Nursery</option>
                  <option>Middle Class Nursery</option>
                  <option>Top Class Nursery</option>
                  <option>Primary 1 Blue</option>
                  <option>Primary 2 Gold</option>
                  <option>Primary 3 Eagles</option>
                  <option>Primary 4 Blue</option>
                  <option>Primary 5 Lions</option>
                  <option>Primary 6 Stars</option>
                  <option>Primary 7 Eagles</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Parent / Guardian Name</label>
                <input
                  type="text"
                  required
                  value={pupilForm.parent}
                  onChange={(e) => setPupilForm({ ...pupilForm, parent: e.target.value })}
                  placeholder="e.g. Mary Kato"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Parent Contact Number</label>
                <input
                  type="text"
                  value={pupilForm.contact}
                  onChange={(e) => setPupilForm({ ...pupilForm, contact: e.target.value })}
                  placeholder="+256 700 000000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setNewPupilModalOpen(false)}
                  className="flex-1 py-3 bg-slate-800 text-slate-300 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-500 text-slate-950 rounded-xl font-black cursor-pointer shadow-md"
                >
                  Confirm Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
