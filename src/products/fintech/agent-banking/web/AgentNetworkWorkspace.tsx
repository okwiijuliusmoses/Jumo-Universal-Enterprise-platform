import React, { useState } from 'react';
import { Users, DollarSign, Activity, MapPin, ArrowRight } from 'lucide-react';

export const AgentNetworkWorkspace: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <header className="bg-slate-900 text-white px-6 py-4 border-b border-slate-800">
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-black">Agent Banking Network</h1>
            <p className="text-xs text-slate-400 font-mono">FT-BNK-04 • Hierarchy & Float Operations</p>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Agents', value: '4,281', icon: Users, color: 'text-blue-600' },
            { label: 'Network Float Liquidity', value: '$1.2M', icon: DollarSign, color: 'text-emerald-600' },
            { label: 'Daily Cash-In Vol', value: '$840k', icon: Activity, color: 'text-indigo-600' },
            { label: 'Regions Active', value: '14', icon: MapPin, color: 'text-amber-600' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Recent Network Activity</h2>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-800">View All Hierarchy</button>
          </div>
          <div className="p-6 text-center text-slate-500">
            {/* Real implementation maps Agent activity here */}
            Agent hierarchical activity and float transfers will render here, bridged to FAAP ledger logs.
          </div>
        </div>
      </main>
    </div>
  );
};
