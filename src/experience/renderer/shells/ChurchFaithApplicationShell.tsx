import React, { useState } from "react";
import { 
  Church, Users, Heart, DollarSign, Calendar, 
  Building, ShieldCheck, HeartHandshake, BookOpen, 
  Music, MessageSquare, FileText, Settings, Milestone
} from "lucide-react";

interface ChurchFaithApplicationShellProps {
  onBack: () => void;
  onNavigateToPlatform?: (platformId: string) => void;
}

export function ChurchFaithApplicationShell({ onBack, onNavigateToPlatform }: ChurchFaithApplicationShellProps) {
  const [activeTab, setActiveTab] = useState<string>("home");

  const modules = [
    { id: "members", label: "Member Directory", icon: Users, color: "bg-amber-600" },
    { id: "giving", label: "Tithes & Offerings", icon: DollarSign, color: "bg-emerald-600" },
    { id: "congregations", label: "Congregations / Cells", icon: Church, color: "bg-amber-700" },
    { id: "pastoral", label: "Pastoral Care", icon: Heart, color: "bg-rose-500" },
    { id: "ministries", label: "Ministry Groups", icon: HeartHandshake, color: "bg-amber-500" },
    { id: "events", label: "Calendar & Events", icon: Calendar, color: "bg-indigo-600" },
    { id: "welfare", label: "Welfare & Benevolence", icon: Milestone, color: "bg-cyan-600" },
    { id: "projects", label: "Church Projects", icon: Building, color: "bg-slate-700" },
    { id: "education", label: "Bible Study / Sunday", icon: BookOpen, color: "bg-blue-600" },
    { id: "worship", label: "Worship & Choir", icon: Music, color: "bg-violet-600" },
    { id: "missions", label: "Outreach & Missions", icon: FileText, color: "bg-teal-600" },
    { id: "audit", label: "Ministry Audit", icon: ShieldCheck, color: "bg-slate-900" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans" id="jumo-church-app">
      <header className="bg-white border-b border-amber-200/50 px-8 py-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-amber-600 text-white rounded-[24px] flex items-center justify-center font-black shadow-xl shadow-amber-600/20">
            <Church className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">JUMO CHURCH & FAITH</h1>
              <span className="bg-amber-50 text-amber-700 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full border border-amber-100">
                Ministry ERP
              </span>
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Sovereign Congregational Operating Environment</p>
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
          <div className="space-y-12 text-center">
            <div className="space-y-3">
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">Sanctuary Home</h2>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-[0.4em]">Select a ministry portal</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {modules.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setActiveTab(mod.id)}
                  className="group bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col items-center space-y-6 cursor-pointer"
                >
                  <div className={`w-20 h-20 ${mod.color} text-white rounded-[32px] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}>
                    <mod.icon className="w-10 h-10" />
                  </div>
                  <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest leading-relaxed">
                    {mod.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab !== "home" && (
          <div className="space-y-10">
            <button onClick={() => setActiveTab("home")} className="text-[10px] font-black text-amber-700 uppercase tracking-[0.3em] flex items-center gap-2">
              ← Return Home
            </button>
            <div className="bg-white p-24 rounded-[72px] border border-amber-100/50 shadow-2xl flex flex-col items-center text-center space-y-10">
              <div className="w-32 h-32 bg-amber-50 text-amber-600 rounded-[40px] flex items-center justify-center">
                {React.createElement(modules.find(m => m.id === activeTab)?.icon || Church, { className: "w-16 h-16" })}
              </div>
              <div className="space-y-4">
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">
                  {modules.find(m => m.id === activeTab)?.label}
                </h2>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Authoritative Ministry Workspace</p>
              </div>
              <div className="w-full max-w-sm p-8 bg-amber-50/30 rounded-[32px] border border-amber-100/30 font-mono text-[9px] text-amber-700/60 leading-relaxed uppercase tracking-widest">
                [FAITH-OS] Establishing ministry channel...<br/>
                [FAITH-OS] Validating congregational records...
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
