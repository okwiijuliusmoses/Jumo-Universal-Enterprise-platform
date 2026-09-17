import React, { useState } from 'react';
import { 
  Landmark, Users, DollarSign, Shield, CreditCard, Briefcase, 
  Activity, Bell, Search, Menu, X, Sliders, LayoutGrid
} from 'lucide-react';
import { motion } from 'framer-motion';

export interface FintechShellProps {
  children: React.ReactNode;
  activePortalId: string;
  onPortalSwitch: (id: string) => void;
  portals: any[];
}

export const FintechShell = ({ children, activePortalId, onPortalSwitch, portals }: FintechShellProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden">
      {/* PROFESSIONAL NAVIGATION SIDEBAR */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-[#0F172A] text-white flex flex-col shrink-0 border-r border-slate-800 z-50 relative shadow-2xl"
      >
        <div className="p-6 flex items-center gap-3 border-b border-slate-800/50">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/20">
            <Landmark className="w-6 h-6 text-white" />
          </div>
          {isSidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-black text-lg tracking-tighter leading-none">JUMO FINTECH</h1>
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Enterprise OS</p>
            </motion.div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-hide">
          <div className="space-y-2">
            {isSidebarOpen && <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Operational Portals</p>}
            {portals.map(portal => (
              <button
                key={portal.id}
                onClick={() => onPortalSwitch(portal.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all group relative ${
                  activePortalId === portal.id ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <portal.icon className={`w-5 h-5 shrink-0 ${activePortalId === portal.id ? 'text-white' : 'group-hover:text-emerald-400'}`} />
                {isSidebarOpen && (
                  <div className="text-left">
                    <p className="text-xs font-bold leading-none">{portal.name}</p>
                    <p className={`text-[9px] mt-1 truncate max-w-[160px] ${activePortalId === portal.id ? 'text-emerald-100' : 'text-slate-500'}`}>{portal.role}</p>
                  </div>
                )}
                {activePortalId === portal.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900/20">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg text-slate-500 hover:bg-slate-900 hover:text-white transition-all"
          >
            {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.aside>

      {/* MAIN WORKSPACE AREA */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-40">
          <div className="flex items-center gap-4">
             <div className="h-8 w-px bg-slate-200 mx-2" />
             <div className="flex flex-col">
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest leading-none">Operational Workspace</h2>
                <p className="text-xs text-slate-900 font-bold mt-1.5">JUMO FINTECH v1.0.0-Stable</p>
             </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search accounts, txn, members..." className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-xs outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2.5 bg-white text-slate-600 rounded-xl hover:bg-slate-50 border border-slate-200 shadow-sm transition-all relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full border border-white"></span>
              </button>
              <div className="h-8 w-px bg-slate-200" />
              <div className="flex items-center gap-3 pl-2">
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none">Moses J.</p>
                  <p className="text-[9px] text-emerald-600 font-bold mt-1 uppercase leading-none">System Admin</p>
                </div>
                <div className="w-9 h-9 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-black shadow-lg">MJ</div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
};
