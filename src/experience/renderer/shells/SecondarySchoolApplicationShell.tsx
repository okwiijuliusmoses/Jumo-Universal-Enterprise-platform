import React, { useState } from "react";
import { 
  Building2, Users, GraduationCap, BookOpen, ClipboardCheck, 
  DollarSign, FileText, Home, ShieldCheck, Library, Microscope,
  Trophy, MessageSquare, FileSpreadsheet, UserCheck
} from "lucide-react";

interface SecondarySchoolApplicationShellProps {
  onBack: () => void;
  onNavigateToPlatform?: (platformId: string) => void;
}

export function SecondarySchoolApplicationShell({ onBack, onNavigateToPlatform }: SecondarySchoolApplicationShellProps) {
  const [activeTab, setActiveTab] = useState<string>("home");

  const modules = [
    { id: "students", label: "Student Registry", icon: Users, color: "bg-blue-600" },
    { id: "academics", label: "Academics & UNEB", icon: GraduationCap, color: "bg-indigo-600" },
    { id: "curriculum", label: "Curriculum Planning", icon: BookOpen, color: "bg-violet-600" },
    { id: "exams", label: "Examinations Center", icon: ClipboardCheck, color: "bg-cyan-600" },
    { id: "boarding", label: "Boarding & Houses", icon: Home, color: "bg-slate-700" },
    { id: "finance", label: "Fees & Finance", icon: DollarSign, color: "bg-emerald-600" },
    { id: "bursary", label: "Bursary Control", icon: ShieldCheck, color: "bg-blue-800" },
    { id: "library", label: "Library Management", icon: Library, color: "bg-amber-600" },
    { id: "labs", label: "Science Laboratories", icon: Microscope, color: "bg-teal-600" },
    { id: "discipline", label: "Discipline & Welfare", icon: Trophy, color: "bg-rose-600" },
    { id: "staff", label: "Staff Directory", icon: UserCheck, color: "bg-sky-600" },
    { id: "reports", label: "Management Reports", icon: FileSpreadsheet, color: "bg-slate-900" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans" id="jumo-secondary-app">
      <header className="bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-blue-900 text-white rounded-xl flex items-center justify-center font-black shadow-lg">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">JUMO SECONDARY SCHOOL</h1>
              <span className="bg-blue-50 text-blue-900 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-lg border border-blue-100">
                Authoritative ERP
              </span>
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Sovereign Boarding Education Operating Environment</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={onBack} className="px-6 py-3 text-slate-400 hover:text-slate-900 font-black text-xs uppercase tracking-widest transition-all">
            Exit
          </button>
        </div>
      </header>

      <main className="flex-1 p-10 max-w-7xl w-full mx-auto">
        {activeTab === "home" && (
          <div className="space-y-12">
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Application Home</h2>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Select a specialized module</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {modules.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setActiveTab(mod.id)}
                  className="group bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all flex flex-col items-center text-center space-y-4 cursor-pointer"
                >
                  <div className={`w-16 h-16 ${mod.color} text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                    <mod.icon className="w-8 h-8" />
                  </div>
                  <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest leading-tight">
                    {mod.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab !== "home" && (
          <div className="space-y-10">
            <button onClick={() => setActiveTab("home")} className="text-[10px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
              ← Home
            </button>
            <div className="bg-white p-20 rounded-[48px] border border-slate-200 shadow-2xl flex flex-col items-center text-center space-y-8">
              <div className="w-24 h-24 bg-blue-50 text-blue-900 rounded-[32px] flex items-center justify-center">
                {React.createElement(modules.find(m => m.id === activeTab)?.icon || Building2, { className: "w-12 h-12" })}
              </div>
              <div className="space-y-3">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
                  {modules.find(m => m.id === activeTab)?.label}
                </h2>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Sovereign Secondary Education Workspace</p>
              </div>
              <div className="w-full max-w-sm p-6 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-[9px] text-slate-400">
                [SEC-OS] INITIALIZING SECURE MODULE CONTEXT...
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
