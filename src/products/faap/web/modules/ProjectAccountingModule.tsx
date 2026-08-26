import React, { useState } from 'react';
import { Briefcase, Plus, DollarSign, PieChart, CheckCircle2 } from 'lucide-react';
import { formatMoney, formatPercentage } from '../../../../utils/formatters';

interface ProjectCostCenter {
  code: string;
  title: string;
  client: string;
  budget: number;
  incurredCost: number;
  billedRevenue: number;
  marginPercentage: number;
}

export const ProjectAccountingModule: React.FC = () => {
  const [projects] = useState<ProjectCostCenter[]>([
    { code: 'PRJ-2026-01', title: 'Campus Solar Microgrid Installation', client: 'USAID Renewable Energy Fund', budget: 450000000, incurredCost: 280000000, billedRevenue: 380000000, marginPercentage: 26.3 },
    { code: 'PRJ-2026-02', title: 'High-Performance Fibre Optic Network Phase II', client: 'Uganda National Research Network (RENU)', budget: 320000000, incurredCost: 195000000, billedRevenue: 240000000, marginPercentage: 18.75 },
    { code: 'PRJ-2026-03', title: 'Central Science Laboratory Refurbishment', client: 'Ministry of Education & Sports', budget: 180000000, incurredCost: 110000000, billedRevenue: 150000000, marginPercentage: 26.6 }
  ]);

  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalCost = projects.reduce((s, p) => s + p.incurredCost, 0);
  const totalRev = projects.reduce((s, p) => s + p.billedRevenue, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Job Costing & Project Accounting</h1>
          <p className="text-slate-500 text-sm">Sovereign FAAP-compliant project costing, labor & material cost allocation, milestone billing & project profit margins.</p>
        </div>
        <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Project Cost Center
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Contract Budgets</span>
          <p className="text-3xl font-black text-slate-900 mt-1 font-mono">{formatMoney(totalBudget, 'UGX')}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Incurred Work-in-Progress (WIP)</span>
          <p className="text-3xl font-black text-rose-600 mt-1 font-mono">{formatMoney(totalCost, 'UGX')}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Billed Revenue Recognized</span>
          <p className="text-3xl font-black text-emerald-700 mt-1 font-mono">{formatMoney(totalRev, 'UGX')}</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <span className="font-bold text-slate-800 text-sm">Active Project Job Costing Register</span>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Project Code</th>
              <th className="px-6 py-4">Project Title & Sponsor</th>
              <th className="px-6 py-4 text-right">Approved Budget (UGX)</th>
              <th className="px-6 py-4 text-right">Incurred Cost (UGX)</th>
              <th className="px-6 py-4 text-right">Billed Revenue (UGX)</th>
              <th className="px-6 py-4 text-center">Profit Margin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.map((p) => (
              <tr key={p.code} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-slate-800 text-xs">{p.code}</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900">{p.title}</p>
                  <p className="text-xs text-slate-400">{p.client}</p>
                </td>
                <td className="px-6 py-4 text-right font-mono text-slate-700">{formatMoney(p.budget, '')}</td>
                <td className="px-6 py-4 text-right font-mono text-rose-600 font-bold">{formatMoney(p.incurredCost, '')}</td>
                <td className="px-6 py-4 text-right font-mono text-emerald-700 font-bold">{formatMoney(p.billedRevenue, '')}</td>
                <td className="px-6 py-4 text-center">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-black text-xs rounded-full">
                    +{formatPercentage(p.marginPercentage)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
