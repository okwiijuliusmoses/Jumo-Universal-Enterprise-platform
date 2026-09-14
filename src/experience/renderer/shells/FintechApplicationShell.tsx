import React, { useState } from "react";
import { 
  CircleDollarSign, Users, TrendingUp, Wallet, Landmark, 
  ShieldCheck, ArrowUpRight, ArrowDownLeft, FilePieChart, 
  Settings, UserCheck, CreditCard, Banknote, ShieldAlert
} from "lucide-react";

interface FintechApplicationShellProps {
  onBack: () => void;
  onNavigateToPlatform?: (platformId: string) => void;
}

export function FintechApplicationShell({ onBack, onNavigateToPlatform }: FintechApplicationShellProps) {
  const [activeTab, setActiveTab] = useState<string>("home");

  const modules = [
    { id: "accounts", label: "Member Accounts", icon: UserCheck, color: "bg-emerald-600" },
    { id: "savings", label: "Savings & Deposits", icon: Wallet, color: "bg-blue-600" },
    { id: "shares", label: "Shares Registry", icon: FilePieChart, color: "bg-indigo-600" },
    { id: "loans", label: "Loan Management", icon: TrendingUp, color: "bg-violet-600" },
    { id: "credit", label: "Credit Appraisal", icon: ShieldCheck, color: "bg-cyan-600" },
    { id: "banking", label: "Core Banking / ERP", icon: Landmark, color: "bg-slate-900" },
    { id: "payments", label: "Digital Payments", icon: CreditCard, color: "bg-emerald-500" },
    { id: "treasury", label: "Treasury Ops", icon: Banknote, color: "bg-amber-600" },
    { id: "collections", label: "Revenue Collections", icon: ArrowDownLeft, color: "bg-rose-600" },
    { id: "disbursements", label: "Fund Disbursements", icon: ArrowUpRight, color: "bg-sky-600" },
    { id: "audit", label: "Internal Audit", icon: ShieldAlert, color: "bg-red-900" },
    { id: "reports", label: "Financial Reports", icon: Settings, color: "bg-slate-800" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" id="jumo-fintech-app">
      <header className="bg-slate-900 border-b border-emerald-500/30 px-8 py-6 flex items-center justify-between sticky top-0 z-30 shadow-2xl">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-emerald-600 text-white rounded-[20px] flex items-center justify-center font-black shadow-lg shadow-emerald-500/20 border border-emerald-400/40">
            <CircleDollarSign className="w-8 h-8 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black tracking-tight text-white uppercase">JUMO FINTECH</h1>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full border border-emerald-500/30">
                Authoritative ERP
              </span>
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Sovereign Financial Services & SACCO Environment</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={onBack} className="px-6 py-3 text-slate-500 hover:text-white font-black text-xs uppercase tracking-widest transition-all">
            Exit System
          </button>
        </div>
      </header>

      <main className="flex-1 p-10 max-w-7xl w-full mx-auto">
        {activeTab === "home" && (
          <div className="space-y-12">
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Application Workspace</h2>
              <p className="text-sm text-emerald-500/60 font-black uppercase tracking-widest">Select a financial engine</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {modules.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setActiveTab(mod.id)}
                  className="group bg-slate-900 p-10 rounded-[40px] border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/50 hover:-translate-y-2 transition-all flex flex-col items-center text-center space-y-6 cursor-pointer shadow-xl"
                >
                  <div className={`w-20 h-20 ${mod.color} text-white rounded-[32px] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform`}>
                    <mod.icon className="w-10 h-10" />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] group-hover:text-emerald-400 transition-colors">
                    {mod.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab !== "home" && (
          <div className="space-y-10">
            <button onClick={() => setActiveTab("home")} className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
              ← System Home
            </button>
            <div className="bg-slate-900 p-24 rounded-[64px] border border-slate-800 shadow-2xl flex flex-col items-center text-center space-y-10">
              <div className="w-32 h-32 bg-emerald-600 text-white rounded-[40px] flex items-center justify-center shadow-[0_0_50px_-12px_rgba(16,185,129,0.5)]">
                {React.createElement(modules.find(m => m.id === activeTab)?.icon || CircleDollarSign, { className: "w-16 h-16" })}
              </div>
              <div className="space-y-4">
                <h2 className="text-5xl font-black text-white tracking-tighter uppercase">
                  {modules.find(m => m.id === activeTab)?.label}
                </h2>
                <p className="text-emerald-500/60 font-black uppercase tracking-[0.3em] text-xs">Authoritative Financial Portal</p>
              </div>
              <div className="w-full max-w-md p-8 bg-slate-950 rounded-[32px] border border-slate-800 font-mono text-[9px] text-emerald-500/50 tracking-widest leading-relaxed">
                [FIN-OS] ENCRYPTING SESSION CONTEXT...<br/>
                [FIN-OS] LOADING SECURE FINANCIAL LEDGER...
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
