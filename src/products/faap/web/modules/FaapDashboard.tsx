import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, ArrowUpRight, ArrowDownRight, CheckCircle2 } from 'lucide-react';

export const FaapDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Financial Intelligence Hub</h1>
        <p className="text-slate-500 text-sm">Real-time consolidated ledger telemetry and commercial performance analytics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Net Income (YTD)', value: 'UGX 138.2M', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' },
          { label: 'Total Accounts Receivable', value: 'UGX 12.5M', icon: ArrowUpRight, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Total Accounts Payable', value: 'UGX 8.4M', icon: ArrowDownRight, color: 'text-rose-600', bg: 'bg-rose-100' },
          { label: 'Cash On Hand', value: 'UGX 45.0M', icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-100' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">+4.5%</span>
            </div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 text-sm">Cash Flow Trend (Last 6 Months)</h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Inflow</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-rose-500 rounded-full" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Outflow</span>
              </div>
            </div>
          </div>
          <div className="h-48 flex items-end justify-between gap-2 px-2">
            {[45, 62, 58, 84, 72, 95].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full flex items-end gap-1 h-full">
                   <div className="bg-emerald-500/80 rounded-t w-full transition-all group-hover:bg-emerald-500" style={{ height: `${val}%` }} />
                   <div className="bg-rose-500/80 rounded-t w-full transition-all group-hover:bg-rose-500" style={{ height: `${val * 0.6}%` }} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#123424] text-white rounded-2xl p-6 shadow-xl shadow-emerald-900/10 flex flex-col relative overflow-hidden">
          <Activity className="absolute -right-8 -bottom-8 w-48 h-48 text-emerald-800/30" />
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold tracking-tight">Authoritative Audit Status</h3>
            </div>
            <p className="text-emerald-100/70 text-xs leading-relaxed mb-8">All active ledgers are currently in full double-entry parity. Zero discrepancies detected in trial balance verification across all system nodes.</p>
            <div className="mt-auto space-y-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-emerald-500 font-bold uppercase tracking-widest">Global Parity Offset</span>
                <span className="text-emerald-400 font-black">$0.00 (BALANCED)</span>
              </div>
              <div className="w-full bg-emerald-950 h-1 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-full" />
              </div>
            </div>
            <button className="mt-8 bg-[#2ca01c] hover:bg-emerald-500 text-white py-3 rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-900/20">
              Run Full Trial Balance Audit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
