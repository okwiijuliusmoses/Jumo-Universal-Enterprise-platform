import React, { useState } from "react";
import { 
  Users, Globe, Calendar, DollarSign, Briefcase, 
  FileCheck, Heart, Award, GraduationCap, Building,
  MessageSquare, Settings, ShieldCheck, FileText
} from "lucide-react";

interface AlumniCommunityApplicationShellProps {
  onBack: () => void;
  onNavigateToPlatform?: (platformId: string) => void;
}

export function AlumniCommunityApplicationShell({ onBack, onNavigateToPlatform }: AlumniCommunityApplicationShellProps) {
  const [activeTab, setActiveTab] = useState<string>("home");

  const modules = [
    { id: "directory", label: "Alumni Directory", icon: Users, color: "bg-rose-900" },
    { id: "chapters", label: "Global Chapters", icon: Globe, color: "bg-slate-900" },
    { id: "events", label: "Events & Reunions", icon: Calendar, color: "bg-rose-800" },
    { id: "giving", label: "Endowment Giving", icon: DollarSign, color: "bg-emerald-800" },
    { id: "mentorship", label: "Career Mentorship", icon: Briefcase, color: "bg-rose-700" },
    { id: "verification", label: "Degree Verification", icon: FileCheck, color: "bg-slate-800" },
    { id: "projects", label: "Legacy Projects", icon: Building, color: "bg-indigo-900" },
    { id: "benefits", label: "Member Benefits", icon: Award, color: "bg-amber-700" },
    { id: "communications", label: "Press & News", icon: MessageSquare, color: "bg-cyan-800" },
    { id: "history", label: "Institution History", icon: GraduationCap, color: "bg-rose-950" },
    { id: "records", label: "Academic Records", icon: FileText, color: "bg-slate-700" },
    { id: "audit", label: "Audit & Compliance", icon: ShieldCheck, color: "bg-slate-950" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans" id="jumo-alumni-app">
      <header className="bg-white border-b border-rose-200 px-8 py-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-rose-900 text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-rose-900/20">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">JUMO ALUMNI</h1>
              <span className="bg-rose-50 text-rose-900 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-lg border border-rose-100">
                Community Network
              </span>
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Sovereign Graduate Registry • Verification Gateway</p>
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
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Application Home</h2>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Select a specialized alumni portal</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {modules.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setActiveTab(mod.id)}
                  className="group bg-white p-10 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-2xl hover:border-rose-200 hover:-translate-y-1 transition-all flex flex-col items-center text-center space-y-4 cursor-pointer"
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
            <button onClick={() => setActiveTab("home")} className="text-[10px] font-black text-rose-900 uppercase tracking-widest flex items-center gap-2">
              ← Return Home
            </button>
            <div className="bg-white p-24 rounded-[64px] border border-rose-100 shadow-2xl flex flex-col items-center text-center space-y-10">
              <div className="w-32 h-32 bg-rose-900 text-white rounded-[40px] flex items-center justify-center shadow-2xl">
                {React.createElement(modules.find(m => m.id === activeTab)?.icon || GraduationCap, { className: "w-16 h-16" })}
              </div>
              <div className="space-y-4">
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">
                  {modules.find(m => m.id === activeTab)?.label}
                </h2>
                <p className="text-slate-500 font-bold uppercase tracking-[0.25em] text-sm">Authoritative Alumni Resource Gateway</p>
              </div>
              <div className="w-full max-w-sm p-8 bg-rose-50/50 rounded-[32px] border border-rose-100/50 font-mono text-[9px] text-rose-900/60 leading-relaxed uppercase tracking-widest">
                [ALUM-OS] INITIALIZING SECURE NETWORK CHANNEL...<br/>
                [ALUM-OS] VERIFYING COMMUNITY CREDENTIALS...
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
