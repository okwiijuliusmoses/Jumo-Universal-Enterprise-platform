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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans" id="jumo-nursery-primary-app">
      {/* 1. APPLICATION TOP BRAND BAR */}
      <header className="bg-emerald-50 border-b border-emerald-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-emerald-500/20">
            <School className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-emerald-900">JUMO NURSERY & PRIMARY</h1>
              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full border border-emerald-200">
                Early Education ERP
              </span>
            </div>
            <p className="text-xs text-emerald-600/70 font-medium">Authoritative Primary Education Operating Environment</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setNewPupilModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" /> Enroll New Pupil
          </button>
        </div>
      </header>

      {/* 2. STATS RIBBON */}
      <section className="bg-emerald-50/30 border-b border-emerald-100 px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600/60 block mb-1">Total Enrolled Pupils</span>
          <div className="text-2xl font-black text-slate-900">1,420</div>
          <span className="text-[10px] font-bold text-emerald-600 block mt-1 bg-emerald-50 px-2 py-0.5 rounded-lg w-fit">Nursery: 340 • Primary: 1,080</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600/60 block mb-1">Today's Attendance</span>
          <div className="text-2xl font-black text-emerald-600">98.4%</div>
          <span className="text-[10px] font-bold text-slate-400 block mt-1">48 Absent Today</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600/60 block mb-1">Tuition Collections</span>
          <div className="text-2xl font-black text-slate-900">UGX 384.2M</div>
          <span className="text-[10px] font-bold text-emerald-600 block mt-1 bg-emerald-50 px-2 py-0.5 rounded-lg w-fit">86.5% Paid • FAAP Synced</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600/60 block mb-1">Staff On Duty</span>
          <div className="text-2xl font-black text-slate-900">48</div>
          <span className="text-[10px] font-bold text-emerald-600 block mt-1">Educators Active</span>
        </div>
      </section>

      {/* 3. TABS */}
      <nav className="bg-white border-b border-slate-100 px-6 flex items-center gap-4 overflow-x-auto">
        {[
          { id: "pupils", label: "Pupils & Admissions", icon: Baby },
          { id: "attendance", label: "Roll Call", icon: Calendar },
          { id: "curriculum", label: "Curriculum", icon: BookOpen },
          { id: "bursar", label: "Bursar & Fees", icon: DollarSign },
          { id: "staff", label: "Staff Roster", icon: Users },
          { id: "parents", label: "Parent SMS", icon: MessageSquare }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-5 px-2 font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "border-emerald-600 text-emerald-600"
                  : "border-transparent text-slate-400 hover:text-emerald-600"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* 4. MAIN CONTENT WORKSPACE */}
      <main className="flex-1 p-8 max-w-7xl w-full mx-auto space-y-8">
        {activeTab === "pupils" && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div className="space-y-1">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Pupil Registry</h2>
                <p className="text-sm text-slate-500 font-medium">Class streams and parent directory.</p>
              </div>

              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-emerald-600 absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find a pupil or parent..."
                  className="w-full bg-slate-50 border-none rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                />
              </div>
            </div>

            <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50">
              <table className="w-full text-left text-sm">
                <thead className="bg-emerald-50/50 text-emerald-700 font-black uppercase text-[10px] tracking-[0.2em] border-b border-emerald-100">
                  <tr>
                    <th className="p-6">ID</th>
                    <th className="p-6">Pupil Name</th>
                    <th className="p-6">Stream</th>
                    <th className="p-6">Parent</th>
                    <th className="p-6">Tuition</th>
                    <th className="p-6">Attendance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-bold text-slate-600">
                  {pupils
                    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.parent.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((p) => (
                      <tr key={p.id} className="hover:bg-emerald-50/30 transition-colors">
                        <td className="p-6 font-mono text-emerald-600">{p.id}</td>
                        <td className="p-6 text-slate-900">{p.name}</td>
                        <td className="p-6">{p.classStream}</td>
                        <td className="p-6">
                          <div className="text-slate-900">{p.parent}</div>
                          <div className="text-[10px] text-slate-400 font-medium">{p.contact}</div>
                        </td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                            p.feesStatus === "PAID" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                          }`}>
                            {p.feesStatus}
                          </span>
                        </td>
                        <td className="p-6 text-emerald-600">{p.attendance}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "attendance" && (
          <div className="bg-emerald-50 p-10 rounded-[40px] border border-emerald-100 space-y-6">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
              <Calendar className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-emerald-900">Attendance Marking Matrix</h2>
              <p className="text-emerald-700/70 font-medium">Teachers are currently recording today's roll calls across all streams.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-emerald-100 font-mono text-xs text-emerald-600 shadow-inner">
              [ROLL-CALL] P1 Blue: 42 Present • P2 Gold: 40 Present • P7 Eagles: 45 Present
            </div>
          </div>
        )}

        {activeTab === "bursar" && (
          <div className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-8 text-center">
            <div className="w-20 h-20 bg-emerald-600 text-white rounded-[32px] flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
              <DollarSign className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900">Tuition & Fees Ledger</h2>
              <p className="text-slate-500 font-medium">Real-time collections synced with JUMO FAAP.</p>
            </div>
            <div className="text-5xl font-black text-emerald-600 tracking-tighter">UGX 384.2M</div>
          </div>
        )}
      </main>

      {/* NEW PUPIL MODAL */}
      {newPupilModalOpen && (
        <div className="fixed inset-0 bg-emerald-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-emerald-100 rounded-[32px] max-w-md w-full p-8 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">New Enrollment</h3>
              <p className="text-sm text-slate-500 font-medium">Add a new pupil to the primary registry.</p>
            </div>
            
            <form onSubmit={handleCreatePupil} className="space-y-4 text-sm font-bold">
              <div className="space-y-1.5">
                <label className="text-slate-500 text-[10px] uppercase tracking-widest px-1">Pupil Full Name</label>
                <input
                  type="text"
                  required
                  value={pupilForm.name}
                  onChange={(e) => setPupilForm({ ...pupilForm, name: e.target.value })}
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-500 text-[10px] uppercase tracking-widest px-1">Class Stream</label>
                <select
                  value={pupilForm.classStream}
                  onChange={(e) => setPupilForm({ ...pupilForm, classStream: e.target.value })}
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none"
                >
                  <option>Baby Class Nursery</option>
                  <option>Primary 1 Blue</option>
                  <option>Primary 7 Eagles</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setNewPupilModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-xl shadow-emerald-500/30 hover:bg-emerald-700 transition-colors"
                >
                  Enroll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>

  );
}
