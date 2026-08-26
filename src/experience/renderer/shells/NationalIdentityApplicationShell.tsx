import React, { useState } from "react";
import { Fingerprint, Users, ShieldCheck, Database, FileText, CheckCircle2 } from "lucide-react";

interface NationalIdentityApplicationShellProps {
  onBack: () => void;
}

export function NationalIdentityApplicationShell({ onBack }: NationalIdentityApplicationShellProps) {
  const [activeTab, setActiveTab] = useState<string>("home");

  const modules = [
    { id: "kyc", label: "KYC & Verification", icon: Fingerprint, color: "bg-indigo-600" },
    { id: "registry", label: "Citizen Registry", icon: Users, color: "bg-blue-600" },
    { id: "credentials", label: "Credential Issuance", icon: FileText, color: "bg-cyan-600" },
    { id: "audit", label: "Security Audit", icon: ShieldCheck, color: "bg-slate-800" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <header className="bg-white border-b border-indigo-200/50 px-8 py-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-indigo-600 text-white rounded-[24px] flex items-center justify-center shadow-xl shadow-indigo-600/20">
            <Fingerprint className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">National Identity</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Citizen Identity Operations</p>
          </div>
        </div>
        <button onClick={onBack} className="px-6 py-3 text-slate-400 hover:text-slate-900 font-black text-xs uppercase tracking-widest">
          Exit
        </button>
      </header>

      <main className="flex-1 p-10 max-w-7xl w-full mx-auto">
        {activeTab === "home" ? (
          <div className="text-center space-y-12">
            <h2 className="text-5xl font-black uppercase tracking-tighter">Identity Services</h2>
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
            <button onClick={() => setActiveTab("home")} className="text-[10px] font-black text-indigo-700 uppercase tracking-[0.3em]">
              ← Return
            </button>
            <div className="bg-white p-24 rounded-[64px] shadow-2xl flex flex-col items-center text-center space-y-10">
              <div className="w-32 h-32 bg-indigo-50 text-indigo-600 rounded-[40px] flex items-center justify-center">
                {React.createElement(modules.find(m => m.id === activeTab)?.icon || Fingerprint, { className: "w-16 h-16" })}
              </div>
              <h2 className="text-5xl font-black uppercase tracking-tighter">{modules.find(m => m.id === activeTab)?.label}</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">System Authorized and Online</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
