import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  FileText,
  PieChart,
  ShieldCheck,
  Building2,
  Calendar,
  Download,
  Plus,
  RefreshCw,
  Search,
  CheckCircle2,
  ArrowUpRight,
  Receipt
} from 'lucide-react';
import { StudioLifecycleNavBar } from '../../components/StudioLifecycleNavBar';

export const FinancialControlStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'billing' | 'subscriptions' | 'ai-costs' | 'invoices'>('billing');

  const invoices = [
    { id: 'INV-2026-0089', institution: 'Wiggins Secondary School', product: 'Academic Management ERP', amount: '$4,200.00', status: 'PAID', date: '2026-08-01', ledgerRef: 'TX-FAAP-99214' },
    { id: 'INV-2026-0090', institution: 'Central Hospital Network', product: 'Clinical Health Records ERP', amount: '$12,800.00', status: 'PAID', date: '2026-08-05', ledgerRef: 'TX-FAAP-99215' },
    { id: 'INV-2026-0091', institution: 'Commercial Trust Bank', product: 'Core Banking & Settlement ERP', amount: '$38,500.00', status: 'PENDING', date: '2026-08-10', ledgerRef: 'TX-FAAP-99216' },
    { id: 'INV-2026-0092', institution: 'National Revenue Authority', product: 'Tax & Customs Administration ERP', amount: '$74,000.00', status: 'PROCESSING', date: '2026-08-12', ledgerRef: 'TX-FAAP-99217' }
  ];

  const aiUsageBreakdown = [
    { department: 'Architecture Engineering Swarm', provider: 'Google Gemini 3.1 Pro', tokens: '42.5M', cost: '$85.00', budgetPercentage: 28 },
    { department: 'Code Synthesis & Triage (Workshop)', provider: 'Anthropic Claude 3.7 Sonnet', tokens: '18.2M', cost: '$162.00', budgetPercentage: 54 },
    { department: 'Zero-Trust Security & Compliance', provider: 'OpenAI GPT-4o', tokens: '6.1M', cost: '$30.50', budgetPercentage: 10 },
    { department: 'Air-Gapped Offline Operations', provider: 'JUMO Local / Ollama', tokens: '128.0M', cost: '$0.00 (Sovereign)', budgetPercentage: 0 }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto" id="financial-control-studio">
      <StudioLifecycleNavBar studioId="financial" />

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 border border-emerald-400/20">
              <CreditCard className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black tracking-tight">JUMO Financial Control</h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-500/30">
                  FAAP Synchronized
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-1">
                Institutional Product Billing, AI Usage Cost Allocation, Subscription Tiers, and Sovereign Revenue Control
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/30 flex items-center gap-2 cursor-pointer">
              <Plus className="w-3.5 h-3.5" />
              <span>Generate Institutional Invoice</span>
            </button>
          </div>
        </div>

        {/* Financial KPI Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Monthly Recurring Billing</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-black text-emerald-400">$129,500.00</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">AI Token Expenditure</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-black text-blue-400">$277.50</span>
              <PieChart className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Settled via FAAP Ledger</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-black text-white">100%</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Active Subscribers</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-black text-indigo-400">18 Institutions</span>
              <Building2 className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-200/70 dark:bg-slate-800/50 rounded-2xl border border-slate-300/60 dark:border-slate-700/60">
        <button
          onClick={() => setActiveTab('billing')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'billing' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Receipt className="w-4 h-4 text-emerald-500" />
          <span>Institutional Invoices & Billing</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-costs')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'ai-costs' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <PieChart className="w-4 h-4 text-blue-500" />
          <span>AI Usage Cost Center</span>
        </button>
      </div>

      {/* Content: Invoices Table */}
      {activeTab === 'billing' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
              Institutional Product Billing Statements
            </h3>
            <span className="text-xs text-slate-400 font-mono">Automated Ledger Reconciliation</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase text-[10px] font-bold">
                <tr>
                  <th className="px-5 py-3">Invoice Ref</th>
                  <th className="px-5 py-3">Operating Organization</th>
                  <th className="px-5 py-3">Product / Ecosystem</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">FAAP Ledger Ref</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {invoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="px-5 py-3.5 font-mono font-bold text-slate-900 dark:text-white">{inv.id}</td>
                    <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200">{inv.institution}</td>
                    <td className="px-5 py-3.5 text-slate-500">{inv.product}</td>
                    <td className="px-5 py-3.5 font-bold font-mono text-emerald-600 dark:text-emerald-400">{inv.amount}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                        inv.status === 'PAID' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[11px] text-slate-400">{inv.ledgerRef}</td>
                    <td className="px-5 py-3.5 text-right">
                      <button className="text-blue-600 hover:text-blue-500 font-bold text-[11px]">Download PDF</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content: AI Usage Costs */}
      {activeTab === 'ai-costs' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiUsageBreakdown.map((b, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">{b.department}</h4>
                    <span className="text-[10px] text-blue-500 font-bold">{b.provider}</span>
                  </div>
                  <span className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400">{b.cost}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Token Consumption: {b.tokens}</span>
                    <span>{b.budgetPercentage}% of AI budget</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${b.budgetPercentage}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
