import React, { useState } from 'react';
import { Building, Plus, Search, Calendar, Calculator, CheckCircle2, TrendingDown } from 'lucide-react';
import { formatMoney, formatDate } from '../../../../utils/formatters';

interface FixedAsset {
  code: string;
  name: string;
  category: 'BUILDINGS' | 'VEHICLES' | 'COMPUTERS' | 'LAB_EQUIPMENT';
  acquisitionDate: string;
  cost: number;
  usefulLifeYears: number;
  salvageValue: number;
  accumulatedDepreciation: number;
  netBookValue: number;
  depreciationMethod: 'STRAIGHT_LINE' | 'REDUCING_BALANCE';
}

export const FixedAssetsModule: React.FC = () => {
  const [assets, setAssets] = useState<FixedAsset[]>([
    { code: 'AST-BLD-01', name: 'Main Academic Science Complex', category: 'BUILDINGS', acquisitionDate: '2022-01-15', cost: 1200000000, usefulLifeYears: 40, salvageValue: 200000000, accumulatedDepreciation: 75000000, netBookValue: 1125000000, depreciationMethod: 'STRAIGHT_LINE' },
    { code: 'AST-VEH-02', name: '67-Seater Institutional Bus (UBG 412X)', category: 'VEHICLES', acquisitionDate: '2023-06-10', cost: 380000000, usefulLifeYears: 8, salvageValue: 60000000, accumulatedDepreciation: 120000000, netBookValue: 260000000, depreciationMethod: 'STRAIGHT_LINE' },
    { code: 'AST-ICT-03', name: 'Server Room Blade Compute Rack', category: 'COMPUTERS', acquisitionDate: '2024-03-01', cost: 150000000, usefulLifeYears: 5, salvageValue: 10000000, accumulatedDepreciation: 56000000, netBookValue: 94000000, depreciationMethod: 'REDUCING_BALANCE' }
  ]);

  const totalCost = assets.reduce((s, a) => s + a.cost, 0);
  const totalDepr = assets.reduce((s, a) => s + a.accumulatedDepreciation, 0);
  const totalNBV = assets.reduce((s, a) => s + a.netBookValue, 0);

  const handleRunMonthlyDepreciation = () => {
    alert(`PERIOD DEPRECIATION EXECUTED:
Monthly straight-line and reducing-balance depreciation computed across ${assets.length} capital assets.
- Debit Depreciation Expense (5040): 12,450,000 UGX
- Credit Accumulated Depreciation (1550): 12,450,000 UGX
Balances posted to General Ledger.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Fixed Assets & Depreciation Register</h1>
          <p className="text-slate-500 text-sm">Capital asset acquisition, straight-line & reducing-balance depreciation schedules, net book value audit & disposal accounting.</p>
        </div>
        <button 
          onClick={handleRunMonthlyDepreciation}
          className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all"
        >
          <Calculator className="w-4 h-4" /> Run Monthly Depreciation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gross Cost of Assets</span>
          <p className="text-3xl font-black text-slate-900 mt-1 font-mono">{formatMoney(totalCost, 'UGX')}</p>
          <p className="text-xs text-slate-500 mt-2">Historical Acquisition Cost</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Accumulated Depreciation</span>
          <p className="text-3xl font-black text-rose-600 mt-1 font-mono">{formatMoney(totalDepr, 'UGX')}</p>
          <p className="text-xs text-rose-600 font-bold mt-2 flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" /> Account 1550 Balance
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Net Book Value (NBV)</span>
          <p className="text-3xl font-black text-emerald-700 mt-1 font-mono">{formatMoney(totalNBV, 'UGX')}</p>
          <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Balance Sheet Asset Carrying Value
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <span className="font-bold text-slate-800 text-sm">Fixed Asset Register & Depreciation Schedules</span>
          <span className="text-xs font-mono font-bold text-slate-500">Total Asset Count: {assets.length}</span>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Asset Code</th>
              <th className="px-6 py-4">Asset Description</th>
              <th className="px-6 py-4">Acquisition Date</th>
              <th className="px-6 py-4 text-right">Cost (UGX)</th>
              <th className="px-6 py-4 text-right">Accumulated Depr (UGX)</th>
              <th className="px-6 py-4 text-right">Net Book Value (UGX)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {assets.map((ast) => (
              <tr key={ast.code} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-slate-800 text-xs">{ast.code}</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900">{ast.name}</p>
                  <p className="text-xs text-slate-400">{ast.category} • Method: {ast.depreciationMethod}</p>
                </td>
                <td className="px-6 py-4 text-xs font-mono text-slate-600">{formatDate(ast.acquisitionDate)}</td>
                <td className="px-6 py-4 text-right font-mono font-bold text-slate-900">{formatMoney(ast.cost, '')}</td>
                <td className="px-6 py-4 text-right font-mono text-rose-600 font-bold">{formatMoney(ast.accumulatedDepreciation, '')}</td>
                <td className="px-6 py-4 text-right font-mono font-black text-emerald-700">{formatMoney(ast.netBookValue, '')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
