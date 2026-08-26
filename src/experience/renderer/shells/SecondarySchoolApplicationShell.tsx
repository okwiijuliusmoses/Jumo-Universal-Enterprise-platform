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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" id="jumo-secondary-app">
      {/* 1. TOP BRAND BAR */}
      <header className="bg-slate-900 border-b border-blue-500/30 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-blue-500/20 border border-blue-400/40">
            <BookOpen className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-white">JUMO SECONDARY SCHOOL</h1>
              <span className="bg-blue-500/20 text-blue-400 text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full border border-blue-500/30">
                Secondary & Boarding ERP
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Authoritative Secondary Education & UNEB Academic Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setNewStudentModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" /> Register Student
          </button>
        </div>
      </header>

      {/* 2. STATS RIBBON */}
      <section className="bg-slate-900/60 border-b border-slate-800 px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-4 rounded-xl border border-blue-500/20 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Enrolled Students</span>
          <div className="text-lg md:text-xl font-black text-white mt-1">2,150 Students</div>
          <span className="text-[10px] font-bold text-blue-400 block mt-1">1,820 Boarding • 330 Day Scholars</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">UNEB Examination Center</span>
          <div className="text-lg md:text-xl font-black text-blue-400 mt-1">Center U0842</div>
          <span className="text-[10px] font-bold text-slate-400 block mt-1">O-Level & A-Level Certified</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Term Tuition Collections</span>
          <div className="text-lg md:text-xl font-black text-white mt-1">UGX 942.8 Million</div>
          <span className="text-[10px] font-bold text-emerald-400 block mt-1">91.2% Fee Clearance Rate</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Boarding Occupancy</span>
          <div className="text-lg md:text-xl font-black text-white mt-1">94% Capacity</div>
          <span className="text-[10px] font-bold text-blue-400 block mt-1">Speke, Lugard & Kabalega Houses</span>
        </div>
      </section>

      {/* 3. TABS */}
      <nav className="bg-slate-900 border-b border-slate-800 px-6 flex items-center gap-2 overflow-x-auto">
        {[
          { id: "students", label: "Students & Houses", icon: GraduationCap },
          { id: "academics", label: "UNEB Curriculum", icon: BookOpen },
          { id: "exams", label: "Exam Performance", icon: Award },
          { id: "bursar", label: "Bursary & Fees", icon: DollarSign },
          { id: "facilities", label: "Labs & Library", icon: Building },
          { id: "discipline", label: "Discipline & Welfare", icon: Shield }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "border-blue-400 text-blue-400 bg-blue-500/10"
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
        {activeTab === "students" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-black text-white">Secondary Student Roster & House Allocations</h2>
                <p className="text-xs text-slate-400">Manage O-Level & A-Level students, dormitories, and UNEB indexes.</p>
              </div>

              <div className="relative w-64">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student or UNEB index..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50"
                />
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Student ID</th>
                    <th className="p-4">Student Name</th>
                    <th className="p-4">Class & Stream</th>
                    <th className="p-4">Boarding House</th>
                    <th className="p-4">UNEB Index No.</th>
                    <th className="p-4">Residency</th>
                    <th className="p-4">Fee Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {students
                    .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.unebNo.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((s) => (
                      <tr key={s.id} className="hover:bg-slate-800/40">
                        <td className="p-4 font-mono font-bold text-blue-400">{s.id}</td>
                        <td className="p-4 font-bold text-white">{s.name}</td>
                        <td className="p-4 text-slate-200">{s.class}</td>
                        <td className="p-4 text-slate-400">{s.house}</td>
                        <td className="p-4 font-mono text-slate-400">{s.unebNo}</td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[9px] font-black border border-blue-500/30">
                            {s.status}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-emerald-400">{s.fees}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "academics" && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-black text-white">UNEB Curriculum & Science Laboratory Timetables</h2>
            <p className="text-xs text-slate-400">Physics, Chemistry, Biology practical rotas and ICT computer lab allocation.</p>
          </div>
        )}
      </main>

      {/* NEW STUDENT MODAL */}
      {newStudentModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-white">Register Secondary Student</h3>
            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  value={studentForm.name}
                  onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                  placeholder="e.g. Patrick Ssemwanga"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Class Level</label>
                <select
                  value={studentForm.class}
                  onChange={(e) => setStudentForm({ ...studentForm, class: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                >
                  <option>Senior 1 Arts</option>
                  <option>Senior 2 Science</option>
                  <option>Senior 3 General</option>
                  <option>Senior 4 Candidate Science</option>
                  <option>Senior 5 PCM/ICT</option>
                  <option>Senior 5 BCM/SubMath</option>
                  <option>Senior 6 HEG/Div</option>
                  <option>Senior 6 Candidate PCM/ICT</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Boarding House</label>
                <select
                  value={studentForm.house}
                  onChange={(e) => setStudentForm({ ...studentForm, house: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                >
                  <option>Speke House</option>
                  <option>Lugard House</option>
                  <option>Kabalega House</option>
                  <option>Nyerere House</option>
                </select>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setNewStudentModalOpen(false)}
                  className="flex-1 py-3 bg-slate-800 text-slate-300 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-black cursor-pointer shadow-md"
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
