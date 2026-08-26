import React, { useState } from "react";
import { 
  GraduationCap, Landmark, BookOpen, FlaskConical, Building2, DollarSign, 
  ShieldCheck, Plus, Search, UserPlus, Award, FileCheck, CheckCircle2, Lock
} from "lucide-react";
import { JumoMasterManifestRegistry } from "../../../core/specification/manifests/masterManifestRegistry";

interface UniversityTertiaryApplicationShellProps {
  onBack: () => void;
  onNavigateToPlatform?: (platformId: string) => void;
}

export function UniversityTertiaryApplicationShell({ onBack, onNavigateToPlatform }: UniversityTertiaryApplicationShellProps) {
  const manifest = JumoMasterManifestRegistry.get("prod-university-tertiary");
  const [activeTab, setActiveTab] = useState<"registry" | "faculties" | "academics" | "research" | "library" | "halls" | "finance" | "senate">("registry");
  const [searchQuery, setSearchQuery] = useState("");
  const [newAdmissionModalOpen, setNewAdmissionModalOpen] = useState(false);

  const [students, setStudents] = useState([
    { id: "UNI-2026/0891", name: "Dr. Ronald Mugisha", faculty: "School of Engineering & Technology", program: "BSc Software Engineering", year: "Year 3 • Semester 2", status: "ENROLLED", clearance: "CLEARED" },
    { id: "UNI-2026/0412", name: "Patricia Namugenyi", faculty: "Faculty of Law", program: "Bachelor of Laws (LLB)", year: "Year 4 • Semester 2", status: "ENROLLED", clearance: "CLEARED" },
    { id: "UNI-2026/1190", name: "Andrew Kigozi", faculty: "College of Business & Economics", program: "BCom Finance & Accounting", year: "Year 2 • Semester 1", status: "ENROLLED", clearance: "PENDING_FEES" },
    { id: "UNI-2026/0014", name: "Esther Chebet", faculty: "School of Medicine & Health", program: "MBChB Medicine & Surgery", year: "Year 5 • Final", status: "GRADUATING", clearance: "SENATE_APPROVED" },
  ]);

  const [admissionForm, setAdmissionForm] = useState({ name: "", faculty: "School of Engineering & Technology", program: "BSc Software Engineering" });

  const handleCreateAdmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!admissionForm.name) return;
    const newStudent = {
      id: `UNI-2026/${Math.floor(1000 + Math.random() * 8000)}`,
      name: admissionForm.name,
      faculty: admissionForm.faculty,
      program: admissionForm.program,
      year: "Year 1 • Semester 1",
      status: "ENROLLED",
      clearance: "CLEARED"
    };
    setStudents([newStudent, ...students]);
    setAdmissionForm({ name: "", faculty: "School of Engineering & Technology", program: "BSc Software Engineering" });
    setNewAdmissionModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden" id="jumo-university-app">
      {/* 1. SIDEBAR NAVIGATION (Academic Pillars) */}
      <aside className="w-72 bg-slate-900 flex flex-col shrink-0">
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center font-black shadow-xl shadow-purple-500/20">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-sm font-black text-white leading-tight">JUMO UNIVERSITY</h1>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mt-0.5">Sovereign ERP</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {[
            { id: "registry", label: "Academic Registry", icon: GraduationCap },
            { id: "faculties", label: "Schools & Faculties", icon: Landmark },
            { id: "academics", label: "Course & Exams", icon: BookOpen },
            { id: "research", label: "Research Grants", icon: FlaskConical },
            { id: "library", label: "Electronic Library", icon: BookOpen },
            { id: "halls", label: "Residential Halls", icon: Building2 },
            { id: "finance", label: "Fiscal Ledger", icon: DollarSign },
            { id: "senate", label: "Senate Governance", icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-[11px] font-black tracking-wider uppercase transition-all cursor-pointer ${
                  isActive
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button
            onClick={onBack}
            className="w-full py-4 border border-slate-700 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
          >
            Exit Environment
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP BAR */}
        <header className="h-20 bg-white border-b border-slate-200 px-10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-6 flex-1">
            <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">
              {activeTab === "registry" ? "Student Academic Registry" : activeTab.replace("_", " ")}
            </h2>
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Query University Records..."
                className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Senate Status</div>
              <div className="text-xs font-bold text-emerald-600 mt-1 uppercase">Quorum Active</div>
            </div>
            <button
              onClick={() => setNewAdmissionModalOpen(true)}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all cursor-pointer"
            >
              Issue Admission
            </button>
          </div>
        </header>

        {/* CONTENT CANVAS */}
        <main className="flex-1 overflow-y-auto p-10 space-y-10">
          {activeTab === "registry" && (
            <div className="space-y-10">
              {/* UNIVERSITY METRICS GRID */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { label: "Active Enrollment", value: "14,850", detail: "12,200 Undergrad • 2,650 Postgrad", color: "text-purple-600" },
                  { label: "Research Portfolio", value: "UGX 3.42B", detail: "24 Peer Reviewed Projects", color: "text-slate-900" },
                  { label: "Transcript Parity", value: "100.0%", detail: "Senate Certified • Aegis Signed", color: "text-emerald-600" }
                ].map(metric => (
                  <div key={metric.label} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">{metric.label}</span>
                    <div className={`text-3xl font-black ${metric.color} tracking-tighter`}>{metric.value}</div>
                    <p className="text-[11px] text-slate-500 font-bold mt-2">{metric.detail}</p>
                  </div>
                ))}
              </div>

              {/* REGISTER TABLE */}
              <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/50">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-400 font-black uppercase tracking-[0.2em] border-b border-slate-200">
                    <tr>
                      <th className="p-8">Registration ID</th>
                      <th className="p-8">Scholar Name</th>
                      <th className="p-8">Faculty / School</th>
                      <th className="p-8">Program</th>
                      <th className="p-8 text-right">Senate Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 font-bold text-slate-700">
                    {students
                      .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((s) => (
                        <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-8 font-mono text-purple-600">{s.id}</td>
                          <td className="p-8 text-slate-900 text-sm">{s.name}</td>
                          <td className="p-8 text-[11px] uppercase tracking-wide">{s.faculty}</td>
                          <td className="p-8 text-slate-500">{s.program}</td>
                          <td className="p-8 text-right">
                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase ${
                              s.clearance === "CLEARED" || s.clearance === "SENATE_APPROVED" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                            }`}>
                              {s.clearance}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "senate" && (
            <div className="max-w-3xl space-y-8">
              <div className="bg-slate-900 p-12 rounded-[48px] text-white space-y-6 shadow-2xl">
                <div className="w-20 h-20 bg-purple-600 rounded-3xl flex items-center justify-center font-black">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black tracking-tighter">Senate Governance Hub</h2>
                  <p className="text-slate-400 font-medium">Authoritative transcript certification and degree audit engine.</p>
                </div>
                <div className="p-8 bg-black/20 rounded-3xl border border-white/5 font-mono text-sm text-purple-400 leading-relaxed shadow-inner">
                  [SENATE-KEYRING] Handshake Established<br/>
                  [AEGIS] RSA-4096 Signatures Verified<br/>
                  [AUDIT] 14,850 Records Scanned • 0 Variance Detected
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ADMISSION MODAL */}
      {newAdmissionModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-[48px] max-w-md w-full p-10 space-y-8 shadow-2xl">
            <div className="space-y-1">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Academic Admission</h3>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Entry Year 2026/27</p>
            </div>
            
            <form onSubmit={handleCreateAdmission} className="space-y-6 text-xs font-black uppercase tracking-widest text-slate-400">
              <div className="space-y-2">
                <label>Scholar Full Name</label>
                <input
                  type="text"
                  required
                  value={admissionForm.name}
                  onChange={(e) => setAdmissionForm({ ...admissionForm, name: e.target.value })}
                  className="w-full bg-slate-50 border-none rounded-2xl p-5 text-slate-900 outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div className="space-y-2">
                <label>Institutional Faculty</label>
                <select
                  value={admissionForm.faculty}
                  onChange={(e) => setAdmissionForm({ ...admissionForm, faculty: e.target.value })}
                  className="w-full bg-slate-50 border-none rounded-2xl p-5 text-slate-900 outline-none focus:ring-2 focus:ring-purple-500/20 appearance-none"
                >
                  <option>School of Engineering & Technology</option>
                  <option>Faculty of Law</option>
                  <option>School of Medicine</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setNewAdmissionModalOpen(false)}
                  className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-3xl font-black hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-5 bg-purple-600 text-white rounded-3xl font-black shadow-xl shadow-purple-500/30 hover:bg-purple-700 transition-all"
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
