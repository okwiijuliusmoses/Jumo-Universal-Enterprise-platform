import React, { useState } from "react";
import { 
  Building, GraduationCap, Users, BookOpen, Scroll, 
  DollarSign, FileText, Landmark, ShieldCheck, Library, 
  FlaskConical, Globe, UserCheck, Briefcase, Settings, Laptop
} from "lucide-react";

interface UniversityTertiaryApplicationShellProps {
  onBack: () => void;
  onNavigateToPlatform?: (platformId: string) => void;
}

export function UniversityTertiaryApplicationShell({ onBack, onNavigateToPlatform }: UniversityTertiaryApplicationShellProps) {
  const [activeTab, setActiveTab] = useState<string>("home");

  const modules = [
    { id: "admissions", label: "Registrar / Admissions", icon: UserCheck, color: "bg-indigo-900" },
    { id: "students", label: "Student Life & Affairs", icon: Users, color: "bg-indigo-700" },
    { id: "faculties", label: "Faculties & Schools", icon: Building, color: "bg-indigo-800" },
    { id: "departments", label: "Academic Departments", icon: BookOpen, color: "bg-blue-900" },
    { id: "curriculum", label: "Courses & Programs", icon: FileText, color: "bg-blue-800" },
    { id: "exams", label: "Examinations / Senate", icon: Scroll, color: "bg-slate-900" },
    { id: "finance", label: "University Treasury", icon: DollarSign, color: "bg-emerald-900" },
    { id: "research", label: "Research & Graduate", icon: FlaskConical, color: "bg-rose-900" },
    { id: "library", label: "Digital Library", icon: Library, color: "bg-amber-900" },
    { id: "hr", label: "Human Resources", icon: Briefcase, color: "bg-sky-900" },
    { id: "ict", label: "ICT & Digital Services", icon: Laptop, color: "bg-slate-800" },
    { id: "governance", label: "Senate & Council", icon: Landmark, color: "bg-slate-950" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans" id="jumo-university-app">
      <header className="bg-white border-b border-indigo-100 px-8 py-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-indigo-950 text-white rounded-[20px] flex items-center justify-center font-black shadow-2xl">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">JUMO UNIVERSITY</h1>
              <span className="bg-indigo-950 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-md">
                Authoritative ERP
              </span>
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Sovereign Tertiary Education & Research Environment</p>
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
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Academic Command Home</h2>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Select an institutional portal</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {modules.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setActiveTab(mod.id)}
                  className="group bg-white p-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-indigo-200 transition-all flex flex-col items-center text-center space-y-6 cursor-pointer"
                >
                  <div className={`w-20 h-20 ${mod.color} text-white rounded-[24px] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}>
                    <mod.icon className="w-10 h-10" />
                  </div>
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] leading-relaxed">
                    {mod.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab !== "home" && (
          <div className="space-y-10">
            <button onClick={() => setActiveTab("home")} className="text-[10px] font-black text-indigo-900 uppercase tracking-[0.3em] flex items-center gap-2">
              ← Return Home
            </button>
            <div className="bg-white p-24 rounded-[64px] border border-slate-200 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] flex flex-col items-center text-center space-y-10">
              <div className="w-32 h-32 bg-indigo-950 text-white rounded-[40px] flex items-center justify-center shadow-2xl">
                {React.createElement(modules.find(m => m.id === activeTab)?.icon || GraduationCap, { className: "w-16 h-16" })}
              </div>
              <div className="space-y-4">
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">
                  {modules.find(m => m.id === activeTab)?.label}
                </h2>
                <p className="text-slate-500 font-bold uppercase tracking-[0.25em] text-sm">Authoritative University Resource portal</p>
              </div>
              <div className="w-full max-w-md p-8 bg-slate-950 rounded-[32px] font-mono text-[10px] text-indigo-400/80 tracking-widest leading-relaxed">
                [UNI-OS] SECURING INSTITUTIONAL CHANNEL...<br/>
                [UNI-OS] LOADING SENATE-APPROVED SPECIFICATIONS...
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
