import React, { useState } from "react";
import { 
  School, Baby, Calendar, BookOpen, DollarSign, Users, MessageSquare, 
  UserPlus, FileSpreadsheet, Award, Heart, ShieldCheck
} from "lucide-react";

interface NurseryPrimaryApplicationShellProps {
  onBack: () => void;
  onNavigateToPlatform?: (platformId: string) => void;
}

export function NurseryPrimaryApplicationShell({ onBack, onNavigateToPlatform }: NurseryPrimaryApplicationShellProps) {
  const [activeTab, setActiveTab] = useState<string>("home");

  const modules = [
    { id: "pupils", label: "Pupils & Enrollment", icon: Baby, color: "bg-emerald-500" },
    { id: "admissions", label: "Admissions Portal", icon: UserPlus, color: "bg-blue-500" },
    { id: "attendance", label: "Attendance / Roll Call", icon: Calendar, color: "bg-amber-500" },
    { id: "curriculum", label: "Curriculum & Lessons", icon: BookOpen, color: "bg-indigo-500" },
    { id: "assessment", label: "Assessment & Grading", icon: Award, color: "bg-rose-500" },
    { id: "bursar", label: "Fees & Finance", icon: DollarSign, color: "bg-emerald-600" },
    { id: "staff", label: "Staff & Educators", icon: Users, color: "bg-violet-500" },
    { id: "parents", label: "Parent Portal / SMS", icon: MessageSquare, color: "bg-cyan-500" },
    { id: "health", label: "Health & Clinic", icon: Heart, color: "bg-red-500" },
    { id: "bus", label: "School Bus Tracking", icon: ShieldCheck, color: "bg-orange-500" },
    { id: "boarding", label: "Boarding / Dorms", icon: School, color: "bg-slate-700" },
    { id: "reports", label: "Management Reports", icon: FileSpreadsheet, color: "bg-teal-600" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans" id="jumo-nursery-primary-app">
      {/* 1. APPLICATION TOP BRAND BAR */}
      <header className="bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-black shadow-xl shadow-emerald-500/20">
            <School className="w-8 h-8 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">JUMO NURSERY & PRIMARY</h1>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full border border-emerald-100">
                Sovereign ERP
              </span>
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Authoritative Education Operating Environment</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="px-6 py-3 text-slate-400 hover:text-slate-900 font-black text-xs uppercase tracking-widest transition-all cursor-pointer"
          >
            Exit Application
          </button>
        </div>
      </header>

      {/* 2. MAIN CONTENT WORKSPACE */}
      <main className="flex-1 p-10 max-w-7xl w-full mx-auto">
        {activeTab === "home" && (
          <div className="space-y-12">
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Application Home</h2>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Select a module to manage school operations</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {modules.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setActiveTab(mod.id)}
                  className="group bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-1 transition-all flex flex-col items-center text-center space-y-6 cursor-pointer"
                >
                  <div className={`w-20 h-20 ${mod.color} text-white rounded-[32px] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <mod.icon className="w-10 h-10" />
                  </div>
                  <span className="text-sm font-black text-slate-900 uppercase tracking-widest group-hover:text-emerald-600 transition-colors">
                    {mod.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab !== "home" && (
          <div className="space-y-10">
            <button 
              onClick={() => setActiveTab("home")}
              className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] hover:text-emerald-700 transition-colors flex items-center gap-2"
            >
              ← Back to Home
            </button>
            
            <div className="bg-white p-16 rounded-[56px] border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col items-center text-center space-y-8">
              <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[40px] flex items-center justify-center">
                {React.createElement(modules.find(m => m.id === activeTab)?.icon || School, { className: "w-12 h-12" })}
              </div>
              <div className="space-y-3">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
                  {modules.find(m => m.id === activeTab)?.label}
                </h2>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
                  Authoritative {activeTab} workspace for Nursery & Primary Operations
                </p>
              </div>
              <div className="w-full max-w-md p-8 bg-emerald-50/50 rounded-[32px] border border-emerald-100/50 font-mono text-[10px] text-emerald-700/70">
                [SYSTEM] Secure portal entry verified. Waiting for live institutional data streams...
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
