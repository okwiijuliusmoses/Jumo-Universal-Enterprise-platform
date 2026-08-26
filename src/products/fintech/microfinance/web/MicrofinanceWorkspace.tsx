import React, { useState } from 'react';
import { Briefcase, Users, TrendingUp, AlertTriangle, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

export const MicrofinanceWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'applications' | 'members'>('portfolio');

  return (
    <div className="bg-slate-50 min-h-screen">
      <header className="bg-slate-900 text-white px-6 py-4 border-b border-slate-800">
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-xl font-black">Microfinance Operations</h1>
            <p className="text-xs text-slate-400 font-mono">FT-LND-01 • Group Lending & Portfolio Management</p>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Navigation Tabs */}
        <div className="flex gap-4 border-b border-slate-200 pb-2">
          {['portfolio', 'applications', 'members', 'field_officers'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 font-bold text-sm uppercase tracking-wider transition ${
                activeTab === tab 
                  ? 'text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        {activeTab === 'portfolio' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Active Loan Book', value: '$4.2M', icon: TrendingUp, color: 'text-indigo-600' },
                { label: 'Active Members', value: '12,450', icon: Users, color: 'text-blue-600' },
                { label: 'PAR > 30 Days', value: '3.2%', icon: AlertTriangle, color: 'text-amber-600' },
                { label: 'Disbursed MTD', value: '$850k', icon: CheckCircle2, color: 'text-emerald-600' }
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

            {/* Active Applications */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-500" /> Pending Appraisals
                </h2>
                <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                  View Pipeline <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  { id: 'APP-2991', name: 'Kikubo Traders JLG', type: 'GROUP BUSINESS', amount: '$5,000', status: 'APPRAISAL' },
                  { id: 'APP-2992', name: 'Sarah N.', type: 'AGRICULTURE', amount: '$800', status: 'SUBMITTED' }
                ].map((app, i) => (
                  <div key={i} className="p-4 hover:bg-slate-50 transition flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-slate-900">{app.name}</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded text-[9px] font-black uppercase">
                          {app.type}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-mono">{app.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-slate-800">{app.amount}</div>
                      <div className="text-[10px] font-bold text-amber-600 uppercase mt-1">{app.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
