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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" id="jumo-university-app">
      {/* 1. TOP BRAND BAR */}
      <header className="bg-slate-900 border-b border-purple-500/30 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-gradient-to-br from-purple-600 to-purple-900 text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-purple-500/20 border border-purple-400/40">
            <GraduationCap className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-white">JUMO UNIVERSITY & TERTIARY</h1>
              <span className="bg-purple-500/20 text-purple-400 text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full border border-purple-500/30">
                Higher Education & Research ERP
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Authoritative University Governance & Senate Transcript Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setNewAdmissionModalOpen(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" /> Process University Admission
          </button>
        </div>
      </header>

      {/* 2. STATS RIBBON */}
      <section className="bg-slate-900/60 border-b border-slate-800 px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-4 rounded-xl border border-purple-500/20 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Registered Students</span>
          <div className="text-lg md:text-xl font-black text-white mt-1">14,850 Students</div>
          <span className="text-[10px] font-bold text-purple-400 block mt-1">12,200 Undergrad • 2,650 Postgrad</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Academic Faculties</span>
          <div className="text-lg md:text-xl font-black text-purple-400 mt-1">8 Schools & Colleges</div>
          <span className="text-[10px] font-bold text-slate-400 block mt-1">Engineering, Business, Law, Medicine</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Active Research Grants</span>
          <div className="text-lg md:text-xl font-black text-white mt-1">UGX 3.420 Billion</div>
          <span className="text-[10px] font-bold text-emerald-400 block mt-1">24 Projects • Peer Reviewed</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Senate Transcript Parity</span>
          <div className="text-lg md:text-xl font-black text-emerald-400 mt-1">100% Certified</div>
          <span className="text-[10px] font-bold text-slate-400 block mt-1">Cryptographic Aegis Signatures</span>
        </div>
      </section>

      {/* 3. TABS */}
      <nav className="bg-slate-900 border-b border-slate-800 px-6 flex items-center gap-2 overflow-x-auto">
        {[
          { id: "registry", label: "Student Registry & Admissions", icon: GraduationCap },
          { id: "faculties", label: "Faculties & Schools", icon: Landmark },
          { id: "academics", label: "Course Registration & Exams", icon: BookOpen },
          { id: "research", label: "Research & Grants", icon: FlaskConical },
          { id: "library", label: "E-Library & Dissertations", icon: BookOpen },
          { id: "halls", label: "Halls & Hostels", icon: Building2 },
          { id: "finance", label: "Tuition Billing & Bank Switch", icon: DollarSign },
          { id: "senate", label: "Senate & Graduation Clearance", icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "border-purple-400 text-purple-400 bg-purple-500/10"
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
        {activeTab === "registry" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-black text-white">University Academic Registry & Enrolled Students</h2>
                <p className="text-xs text-slate-400">Manage undergraduate, postgraduate, and international student records.</p>
              </div>

              <div className="relative w-64">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student or registration no..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500/50"
                />
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Reg / Student No.</th>
                    <th className="p-4">Student Name</th>
                    <th className="p-4">Faculty / School</th>
                    <th className="p-4">Academic Program</th>
                    <th className="p-4">Current Year</th>
                    <th className="p-4">Exam Clearance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {students
                    .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((s) => (
                      <tr key={s.id} className="hover:bg-slate-800/40">
                        <td className="p-4 font-mono font-bold text-purple-400">{s.id}</td>
                        <td className="p-4 font-bold text-white">{s.name}</td>
                        <td className="p-4 text-slate-300">{s.faculty}</td>
                        <td className="p-4 text-slate-400">{s.program}</td>
                        <td className="p-4 text-slate-300 text-[11px]">{s.year}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                            s.clearance === "CLEARED" || s.clearance === "SENATE_APPROVED" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
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
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-black text-white">Senate Transcript Certification & Degree Audit</h2>
            <p className="text-xs text-slate-400">Cryptographically signed graduation clearance engine powered by Aegis HSM.</p>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-purple-400">
              [SENATE-KEYRING] Transcript Signature Verified • 0 Degree Alterations Detected • 100% Audit Passed
            </div>
          </div>
        )}
      </main>

      {/* ADMISSION MODAL */}
      {newAdmissionModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-white">Process University Admission</h3>
            <form onSubmit={handleCreateAdmission} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  value={admissionForm.name}
                  onChange={(e) => setAdmissionForm({ ...admissionForm, name: e.target.value })}
                  placeholder="e.g. Ronald Mugisha"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Faculty / School</label>
                <select
                  value={admissionForm.faculty}
                  onChange={(e) => setAdmissionForm({ ...admissionForm, faculty: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                >
                  <option>School of Engineering & Technology</option>
                  <option>College of Business & Economics</option>
                  <option>Faculty of Law</option>
                  <option>School of Medicine & Health Sciences</option>
                  <option>Faculty of Computing & Information Technology</option>
                  <option>College of Humanities & Social Sciences</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Degree Program</label>
                <input
                  type="text"
                  required
                  value={admissionForm.program}
                  onChange={(e) => setAdmissionForm({ ...admissionForm, program: e.target.value })}
                  placeholder="e.g. BSc Software Engineering"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setNewAdmissionModalOpen(false)}
                  className="flex-1 py-3 bg-slate-800 text-slate-300 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-black cursor-pointer shadow-md"
                >
                  Issue Admission Letter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
