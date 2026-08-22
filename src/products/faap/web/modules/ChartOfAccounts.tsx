import React, { useState } from 'react';
import { Layers, Search, Filter, Plus, FileText, Download, MoreVertical } from 'lucide-react';
import { FaapService } from '../../domain/FaapService';

export const ChartOfAccounts: React.FC = () => {
  const service = FaapService.getInstance();
  const [accounts] = useState(service.getChartOfAccounts());

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Chart of Accounts (COA)</h1>
          <p className="text-slate-500 text-sm">Authoritative hierarchical account classification and classification management.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export COA
          </button>
          <button className="flex items-center gap-2 bg-[#2ca01c] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
            <Plus className="w-4 h-4" />
            Add New Account
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by code, account name, or type..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-xl text-sm font-bold hover:bg-slate-50">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Account Code</th>
                <th className="px-6 py-4">Account Title</th>
                <th className="px-6 py-4">Classification</th>
                <th className="px-6 py-4">Sub-Type</th>
                <th className="px-6 py-4 text-right">Balance (UGX)</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {accounts.map((acc) => (
                <tr key={acc.code} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-slate-900">{acc.code}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-slate-900">{acc.name}</p>
                      {acc.isSystem && <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">System Locked</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                      acc.type === 'ASSET' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      acc.type === 'LIABILITY' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                      acc.type === 'EQUITY' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                      acc.type === 'REVENUE' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {acc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{acc.subType}</td>
                  <td className="px-6 py-4 text-right font-mono font-black text-slate-900">
                    {acc.balance.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
