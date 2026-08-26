import React, { useState } from "react";
import { 
  BookOpen, GraduationCap, Award, Building, DollarSign, Shield, 
  Plus, Search, UserPlus, FileSpreadsheet, Layers, CheckCircle2, Clock
} from "lucide-react";
import { JumoMasterManifestRegistry } from "../../../core/specification/manifests/masterManifestRegistry";

interface SecondarySchoolApplicationShellProps {
  onBack: () => void;
  onNavigateToPlatform?: (platformId: string) => void;
}

export function SecondarySchoolApplicationShell({ onBack, onNavigateToPlatform }: SecondarySchoolApplicationShellProps) {
  const manifest = JumoMasterManifestRegistry.get("prod-secondary-school");
  const [activeTab, setActiveTab] = useState<"students" | "academics" | "exams" | "bursar" | "facilities" | "discipline">("students");
  const [searchQuery, setSearchQuery] = useState("");
  const [newStudentModalOpen, setNewStudentModalOpen] = useState(false);

  const [students, setStudents] = useState([
    { id: "SEC-401", name: "Patrick Ssemwanga", class: "Senior 4 Science", house: "Speke House", unebNo: "U0842/012", status: "BOARDER", fees: "PAID" },
    { id: "SEC-402", name: "Claire Nabukenya", class: "Senior 6 PCM/ICT", house: "Lugard House", unebNo: "U0842/504", status: "BOARDER", fees: "PAID" },
    { id: "SEC-403", name: "Brian Okello", class: "Senior 2 Arts", house: "Kabalega House", unebNo: "U0842/188", status: "DAY", fees: "PARTIAL" },
    { id: "SEC-404", name: "Hannah Atuhaire", class: "Senior 5 BCM/SubMath", house: "Speke House", unebNo: "U0842/510", status: "BOARDER", fees: "PAID" },
  ]);

  const [studentForm, setStudentForm] = useState({ name: "", class: "Senior 1", house: "Speke House", status: "BOARDER" });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.name) return;
    const newS = {
      id: `SEC-${Math.floor(400 + Math.random() * 500)}`,
      name: studentForm.name,
      class: studentForm.class,
      house: studentForm.house,
      unebNo: `U0842/${Math.floor(100 + Math.random() * 800)}`,
      status: studentForm.status,
      fees: "PENDING"
    };
    setStudents([newS, ...students]);
    setStudentForm({ name: "", class: "Senior 1", house: "Speke House", status: "BOARDER" });
    setNewStudentModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans" id="jumo-secondary-app">
      {/* 1. TOP BRAND BAR */}
      <header className="bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-blue-700 text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-blue-700/20">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black tracking-tighter text-slate-900">JUMO SECONDARY SCHOOL</h1>
              <span className="bg-blue-50 text-blue-700 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-lg border border-blue-100">
                Secondary & Boarding ERP
              </span>
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Authoritative UNEB Academic Engine • Center U0842</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setNewStudentModalOpen(true)}
            className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" /> Register Student
          </button>
          <button
            onClick={onBack}
            className="px-4 py-3 border border-slate-200 text-slate-400 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all cursor-pointer"
          >
            Exit
          </button>
        </div>
      </header>

      {/* 2. STATS RIBBON */}
      <section className="px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Enrolled Students", value: "2,150", sub: "1,820 Boarding • 330 Day", icon: GraduationCap, color: "text-blue-700" },
          { label: "UNEB Center Status", value: "Center U0842", sub: "O-Level & A-Level Certified", icon: Award, color: "text-slate-900" },
          { label: "Tuition Collections", value: "UGX 942.8M", sub: "91.2% Fee Clearance Rate", icon: DollarSign, color: "text-emerald-600" },
          { label: "Boarding Occupancy", value: "94% Capacity", sub: "Speke, Lugard & Kabalega", icon: Building, color: "text-blue-700" }
        ].map(stat => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">{stat.label}</span>
              <div className={`text-2xl font-black ${stat.color} tracking-tight`}>{stat.value}</div>
              <span className="text-[10px] font-bold text-slate-500 block mt-2">{stat.sub}</span>
            </div>
            <stat.icon className={`w-6 h-6 ${stat.color} opacity-20`} />
          </div>
        ))}
      </section>

      {/* 3. TABS */}
      <nav className="bg-white border-y border-slate-200 px-8 flex items-center gap-4 overflow-x-auto">
        {[
          { id: "students", label: "Students & Houses", icon: GraduationCap },
          { id: "academics", label: "Curriculum", icon: BookOpen },
          { id: "exams", label: "Performance", icon: Award },
          { id: "bursar", label: "Bursary", icon: DollarSign },
          { id: "facilities", label: "Facilities", icon: Building },
          { id: "discipline", label: "Discipline", icon: Shield }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-5 px-4 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 border-b-4 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "border-blue-700 text-blue-700 bg-blue-50/50"
                  : "border-transparent text-slate-400 hover:text-slate-600"
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
        {activeTab === "students" && (
          <div className="space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Student Registry</h2>
                <p className="text-sm text-slate-500 font-medium">Authoritative academic roster for O-Level & A-Level scholars.</p>
              </div>

              <div className="relative w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search scholars..."
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-700/10"
                />
              </div>
            </div>

            <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/50">
              <table className="w-full text-left text-xs font-bold text-slate-600">
                <thead className="bg-slate-50 text-slate-400 font-black uppercase tracking-widest border-b border-slate-200">
                  <tr>
                    <th className="p-8">ID</th>
                    <th className="p-8">Scholar Name</th>
                    <th className="p-8">Class Level</th>
                    <th className="p-8">Boarding House</th>
                    <th className="p-8">UNEB Index</th>
                    <th className="p-8 text-right">Fee Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {students
                    .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.unebNo.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-8 font-mono text-blue-700">{s.id}</td>
                        <td className="p-8 text-slate-900 text-sm font-black">{s.name}</td>
                        <td className="p-8 uppercase tracking-wide">{s.class}</td>
                        <td className="p-8 text-slate-400">{s.house}</td>
                        <td className="p-8 font-mono">{s.unebNo}</td>
                        <td className="p-8 text-right">
                          <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black tracking-widest uppercase ${
                            s.fees === "PAID" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-amber-50 text-amber-700 border border-amber-100"
                          }`}>
                            {s.fees}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "academics" && (
          <div className="bg-white p-12 rounded-[40px] border border-slate-200 space-y-6 shadow-sm">
            <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center">
              <FileSpreadsheet className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter">UNEB Curriculum Center</h2>
              <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">Manage secondary curriculum alignment, subject allocations, and national examination schedules for O-Level (UCE) and A-Level (UACE) candidates.</p>
            </div>
          </div>
        )}
      </main>

      {/* NEW STUDENT MODAL */}
      {newStudentModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-[40px] max-w-md w-full p-10 space-y-8 shadow-2xl">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Scholar Admission</h3>
            <form onSubmit={handleCreateStudent} className="space-y-6 text-xs font-black uppercase tracking-widest text-slate-400">
              <div className="space-y-2">
                <label>Student Full Name</label>
                <input
                  type="text"
                  required
                  value={studentForm.name}
                  onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                  className="w-full bg-slate-50 border-none rounded-2xl p-5 text-slate-900 outline-none focus:ring-2 focus:ring-blue-700/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label>Class Level</label>
                  <select
                    value={studentForm.class}
                    onChange={(e) => setStudentForm({ ...studentForm, class: e.target.value })}
                    className="w-full bg-slate-50 border-none rounded-2xl p-5 text-slate-900 outline-none focus:ring-2 focus:ring-blue-700/20 appearance-none"
                  >
                    <option>Senior 1</option>
                    <option>Senior 2</option>
                    <option>Senior 4</option>
                    <option>Senior 6</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label>Boarding House</label>
                  <select
                    value={studentForm.house}
                    onChange={(e) => setStudentForm({ ...studentForm, house: e.target.value })}
                    className="w-full bg-slate-50 border-none rounded-2xl p-5 text-slate-900 outline-none focus:ring-2 focus:ring-blue-700/20 appearance-none"
                  >
                    <option>Speke House</option>
                    <option>Lugard House</option>
                    <option>Kabalega House</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setNewStudentModalOpen(false)}
                  className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-3xl font-black hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-5 bg-blue-700 text-white rounded-3xl font-black shadow-xl shadow-blue-700/30 hover:bg-blue-800 transition-all"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
