import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, Globe, CreditCard, Zap, Lock, 
  Activity, Settings, RefreshCw, Key, ShieldCheck,
  FileText, Users, DollarSign, Flag, Terminal, ExternalLink
} from 'lucide-react';

export const SovereignControlStudio: React.FC = () => {
  const [panicActive, setPanicActive] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState<'treasury' | 'activation' | 'monitoring'>('treasury');

  return (
    <div className="space-y-6 animate-fadeIn" id="jumo-sovereign-control-center">
      {/* Sovereign Header with Panic Button */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-3xl -mr-32 -mt-32 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-3xl -ml-32 -mb-32 rounded-full"></div>
        
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-14 h-14 bg-amber-500 text-slate-950 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-500/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
              JUMO Sovereign Control Center
              <span className="text-[10px] font-black bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full uppercase tracking-widest animate-pulse">Live</span>
            </h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">National Command Plane for Global Configuration & ERP Activation</p>
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10">
          <button
            onClick={() => setPanicActive(!panicActive)}
            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg cursor-pointer ${
              panicActive 
                ? 'bg-rose-600 text-white animate-bounce shadow-rose-500/40' 
                : 'bg-white/5 text-rose-500 border border-rose-500/30 hover:bg-rose-600 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-5 h-5" />
            {panicActive ? 'System Lockdown Active' : 'Sovereign Emergency Lockdown'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Stats Grid */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Active Nodes", value: "1,248", sub: "Global Sovereign Distribution", icon: Globe, color: "text-blue-400" },
              { label: "Treasury Balance", value: "$4.2B", sub: "FAAP Allocated Funds", icon: DollarSign, color: "text-emerald-400" },
              { label: "AI Load", value: "24.6%", sub: "Registered Agent Workforce", icon: Zap, color: "text-amber-400" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <Activity className="w-4 h-4 text-slate-200" />
                </div>
                <div>
                  <span className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                    <span className="text-[9px] text-slate-500 font-bold mt-0.5">{stat.sub}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Central Workspace Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-6">
                {[
                  { id: 'treasury', label: 'Treasury & Billing', icon: CreditCard },
                  { id: 'activation', label: 'Software Activation', icon: Key },
                  { id: 'monitoring', label: 'System Monitoring', icon: Activity },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveWorkspace(tab.id as any)}
                    className={`text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer ${
                      activeWorkspace === tab.id ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8 min-h-[400px]">
              {activeWorkspace === 'treasury' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">FAAP Treasury Ledger</h3>
                      <p className="text-xs text-slate-500 font-medium">Authoritative financial oversight and billing for sovereign products.</p>
                    </div>
                    <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer border border-slate-200">
                      <FileText className="w-4 h-4" />
                      Export Sovereign Audit
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">
                      <span className="col-span-2">Institution / Product</span>
                      <span>Allocation</span>
                      <span>Status</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: "National Health Bridge", fund: "$250,000,000", status: "Active" },
                        { name: "Sovereign Identity Layer", fund: "$180,000,000", status: "Active" },
                        { name: "Digital Treasury Module", fund: "$500,000,000", status: "Pending" },
                      ].map((item, i) => (
                        <div key={i} className="grid grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl items-center">
                          <span className="col-span-2 text-xs font-extrabold text-slate-900">{item.name}</span>
                          <span className="text-xs font-mono font-black text-slate-700">{item.fund}</span>
                          <span className={`text-[10px] font-black uppercase tracking-wider ${item.status === 'Active' ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeWorkspace === 'activation' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Software & ERP Activation</h3>
                      <p className="text-xs text-slate-500 font-medium">Lifecycle control and activation of enterprise software packages.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: "SAP S/4HANA Adapter", type: "ERP Core", active: true },
                      { name: "Oracle Cloud Bridge", type: "Database Layer", active: true },
                      { name: "JUMO CRM Enterprise", type: "Sovereign App", active: false },
                      { name: "AEGIS Threat Intel", type: "Security", active: true },
                    ].map((item, i) => (
                      <div key={i} className="p-5 border border-slate-200 rounded-2xl flex flex-col justify-between space-y-4 hover:border-blue-300 transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.active ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                              <Flag className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{item.type}</span>
                              <h4 className="text-xs font-black text-slate-900">{item.name}</h4>
                            </div>
                          </div>
                          <div className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${item.active ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                            {item.active ? 'Activated' : 'Inactive'}
                          </div>
                        </div>
                        <button className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                          item.active ? 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600' : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}>
                          {item.active ? 'Deactivate Package' : 'Activate Package'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Console: Global Audit Trail */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-[640px]">
             <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5" />
                Global Sovereign Audit Trail
              </h4>
              <button className="text-slate-500 hover:text-white transition-colors">
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto font-mono text-[10px] p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-800">
              {[
                { time: "14:24:02", user: "SYS", msg: "Treasury allocation verified for 'National Health Bridge'." },
                { time: "14:23:45", user: "OP-1", msg: "Emergency lockdown testing initiated on node 04." },
                { time: "14:21:12", user: "SYS", msg: "SAP S/4HANA Adapter heart-beat stable. 420 agents active." },
                { time: "14:18:30", user: "TREAS", msg: "New FAAP billing cycle initiated. $4.2B target." },
                { time: "14:15:00", user: "SEC", msg: "Zero-Trust perimeter breached on sandbox (simulated)." },
                { time: "14:12:44", user: "SYS", msg: "Sovereign Command Center state synchronized globally." },
                { time: "14:10:02", user: "OP-2", msg: "Identity Layer v2.1 deployment approved." },
                { time: "14:05:55", user: "SYS", msg: "Cognitive swarm optimization completed (1.4s)." },
              ].map((log, i) => (
                <div key={i} className="flex gap-2 leading-relaxed">
                  <span className="text-slate-600 select-none">[{log.time}]</span>
                  <span className="text-blue-400 font-bold select-none">{log.user}:</span>
                  <span className="text-slate-300 break-all">{log.msg}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800">
               <button className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all group cursor-pointer">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Full Command Log</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-blue-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
