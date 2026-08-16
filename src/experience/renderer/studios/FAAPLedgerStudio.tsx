import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  ShieldCheck, 
  FileText, 
  TrendingUp, 
  DollarSign,
  PieChart,
  Activity,
  Lock,
  Search
} from 'lucide-react';
import { faapEnterpriseRuntime } from '../../../core/faap/faapService';
import type { FAAPJournal, FAAPTreasuryPosition } from '../../../core/faap/faapService';
import { StudioLifecycleNavBar } from '../../components/StudioLifecycleNavBar';

export const FAAPLedgerStudio: React.FC = () => {
  const [journals, setJournals] = useState<FAAPJournal[]>([]);
  const [treasury, setTreasury] = useState<FAAPTreasuryPosition[]>([]);
  const [financials, setFinancials] = useState<any>(null);
  const [health, setHealth] = useState<any>(null);
  
  useEffect(() => {
    // Initial load
    refreshData();
    
    // Poll for updates
    const interval = setInterval(refreshData, 5000);
    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    setJournals(faapEnterpriseRuntime.listJournals());
    setTreasury(faapEnterpriseRuntime.listTreasuryPositions());
    setFinancials(faapEnterpriseRuntime.getFinancialPosition());
    setHealth(faapEnterpriseRuntime.health());
  };

  if (!financials) return null;

  return (
    <div className="space-y-6" id="faap-sovereign-ledger-studio">
      <StudioLifecycleNavBar studioId="faap" />
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">FAAP Sovereign Ledger</h2>
            <p className="text-xs text-slate-500 font-semibold">Authoritative Financial Asset & Accountability Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">Ledger Healthy</span>
          </div>
          <button className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-all">
            <Search className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="Total Sovereign Assets" 
          value={`$${financials.assets.toLocaleString()}`} 
          trend="+4.2%" 
          positive 
          icon={<DollarSign className="text-emerald-500" />} 
        />
        <MetricCard 
          label="Liabilities" 
          value={`$${financials.liabilities.toLocaleString()}`} 
          trend="-1.5%" 
          positive 
          icon={<ArrowDownLeft className="text-amber-500" />} 
        />
        <MetricCard 
          label="Net Sovereign Equity" 
          value={`$${financials.equity.toLocaleString()}`} 
          trend="+8.1%" 
          positive 
          icon={<ShieldCheck className="text-blue-500" />} 
        />
        <MetricCard 
          label="Revenue (FAAP Bridge)" 
          value={`$${financials.revenue.toLocaleString()}`} 
          trend="+12.4%" 
          positive 
          icon={<TrendingUp className="text-indigo-500" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Journals - Span 8 */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-slate-400" />
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Authoritative Journal Stream</h3>
              </div>
              <button className="text-[10px] font-black text-blue-600 uppercase hover:underline">Export Ledger</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reference</th>
                    <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                    <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {journals.map((journal) => (
                    <tr key={journal.id} className="hover:bg-slate-50/30 transition-all">
                      <td className="px-6 py-4 text-[10px] font-mono font-bold text-slate-900">{journal.reference}</td>
                      <td className="px-6 py-4 text-[11px] text-slate-600 font-medium">{journal.description}</td>
                      <td className="px-6 py-4 text-[10px] text-slate-400 font-semibold">{new Date(journal.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider border ${
                          journal.status === 'posted' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                          journal.status === 'approved' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                          'bg-slate-50 text-slate-500 border-slate-200'
                        }`}>
                          {journal.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-xs font-black text-slate-900">
                          {journal.currency} {journal.entries.reduce((sum, e) => sum + e.debit, 0).toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {journals.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-xs font-semibold italic">
                        No financial records found in the authoritative ledger.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Treasury & Health - Span 4 */}
        <div className="lg:col-span-4 space-y-6">
          {/* Treasury Positions */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <PieChart className="w-4 h-4 text-slate-400" />
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Treasury Liquidity</h3>
            </div>
            <div className="space-y-3">
              {treasury.map(pos => (
                <div key={pos.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{pos.institution}</span>
                    <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${
                      pos.liquidityRisk === 'low' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>Risk: {pos.liquidityRisk}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">{pos.accountReference}</span>
                    <span className="text-sm font-black text-slate-900">{pos.currency} {pos.availableBalance.toLocaleString()}</span>
                  </div>
                  {pos.reservedBalance > 0 && (
                    <div className="pt-2 border-t border-slate-200/50 flex items-center justify-between text-[9px] text-slate-400 font-bold uppercase">
                      <span>Reserved</span>
                      <span>{pos.currency} {pos.reservedBalance.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              ))}
              {treasury.length === 0 && (
                <div className="text-center py-6 text-slate-400 text-[10px] font-bold italic">No active treasury positions.</div>
              )}
            </div>
          </div>

          {/* Ledger Health */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 text-white">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
              <Activity className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Runtime Health</h3>
            </div>
            <div className="space-y-4">
              <HealthItem label="Core Ledger" status={health.ledger} />
              <HealthItem label="Subledgers" status={health.subledgers} />
              <HealthItem label="Treasury Sync" status={health.treasury} />
              <HealthItem label="Hybrid Bridge" status={health.hybridSync} />
            </div>
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-500 uppercase">Pending Operations</span>
              <span className="text-xs font-black text-emerald-400">{health.pendingOperations}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{ label: string; value: string; trend: string; positive?: boolean; icon: React.ReactNode }> = ({ label, value, trend, positive, icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 relative overflow-hidden group hover:shadow-sm transition-all">
    <div className="absolute -top-6 -right-6 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.07] transition-all rotate-12">
      {icon && React.cloneElement(icon as React.ReactElement, { className: 'w-full h-full' })}
    </div>
    <div className="flex items-center justify-between">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
        {icon}
      </div>
      <div className={`px-2 py-0.5 rounded-full text-[9px] font-black flex items-center gap-1 ${
        positive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
      }`}>
        {positive ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownLeft className="w-2.5 h-2.5" />}
        {trend}
      </div>
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <h3 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">{value}</h3>
    </div>
  </div>
);

const HealthItem: React.FC<{ label: string; status: string }> = ({ label, status }) => {
  const isHealthy = status === 'healthy' || status === 'online';
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`text-[8px] font-black uppercase tracking-widest ${isHealthy ? 'text-emerald-400' : 'text-amber-400'}`}>
          {status}
        </span>
        <div className={`w-1.5 h-1.5 rounded-full ${isHealthy ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 animate-pulse'}`} />
      </div>
    </div>
  );
};
