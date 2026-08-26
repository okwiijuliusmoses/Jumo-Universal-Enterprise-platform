import React, { useState } from "react";
import { HeartPulse, FileText, Database, Activity, Stethoscope } from "lucide-react";

interface NationalHealthApplicationShellProps {
  onBack: () => void;
}

export function NationalHealthApplicationShell({ onBack }: NationalHealthApplicationShellProps) {
  const [activeTab, setActiveTab] = useState<string>("home");

  const modules = [
    { id: "emr", label: "EMR Portal", icon: FileText, color: "bg-rose-600" },
    { id: "clinical", label: "Clinical Data", icon: Database, color: "bg-red-600" },
    { id: "vitals", label: "Patient Vitals", icon: Activity, color: "bg-pink-600" },
    { id: "records", label: "Health Records", icon: Stethoscope, color: "bg-rose-800" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <header className="bg-white border-b border-rose-200/50 px-8 py-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-rose-600 text-white rounded-[24px] flex items-center justify-center shadow-xl shadow-rose-600/20">
            <HeartPulse className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">National Health</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Healthcare & Clinical Operations</p>
          </div>
        </div>
        <button onClick={onBack} className="px-6 py-3 text-slate-400 hover:text-slate-900 font-black text-xs uppercase tracking-widest">
          Exit
        </button>
      </header>

      <main className="flex-1 p-10 max-w-7xl w-full mx-auto">
        {activeTab === "home" ? (
          <div className="text-center space-y-12">
            <h2 className="text-5xl font-black uppercase tracking-tighter">Health Portals</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {modules.map(mod => (
                <button
                  key={mod.id}
                  onClick={() => setActiveTab(mod.id)}
                  className="group bg-white p-8 rounded-[40px] shadow-sm hover:shadow-2xl flex flex-col items-center space-y-6 transition-all"
                >
                  <div className={`w-20 h-20 ${mod.color} text-white rounded-[32px] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}>
                    <mod.icon className="w-10 h-10" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest">{mod.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            <button onClick={() => setActiveTab("home")} className="text-[10px] font-black text-rose-700 uppercase tracking-[0.3em]">
              ← Return
            </button>
            <div className="bg-white p-24 rounded-[64px] shadow-2xl flex flex-col items-center text-center space-y-10">
              <div className="w-32 h-32 bg-rose-50 text-rose-600 rounded-[40px] flex items-center justify-center">
                {React.createElement(modules.find(m => m.id === activeTab)?.icon || HeartPulse, { className: "w-16 h-16" })}
              </div>
              <h2 className="text-5xl font-black uppercase tracking-tighter">{modules.find(m => m.id === activeTab)?.label}</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Clinical Module Initialized</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
