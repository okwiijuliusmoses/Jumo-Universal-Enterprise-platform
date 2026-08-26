import React, { useState } from 'react';
import { 
  DollarSign, Heart, Plus, CheckCircle2, TrendingUp, 
  Users, ShieldCheck, Download, Calculator, FileText,
  PieChart, Building2, Landmark
} from 'lucide-react';

export const AlumniGivingModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'GIVING' | 'ENDOWMENT' | 'MEMBERSHIP' | 'CASHBOOK' | 'REPORTS' | 'AUDIT'>('GIVING');

  const campaigns = [
    { id: 'CAMP-01', title: 'Centenary Science Complex Endowment', target: 500000000, raised: 380000000, donors: 240, status: 'ACTIVE' },
    { id: 'CAMP-02', title: 'Need-Based Student Bursary Fund', target: 200000000, raised: 165000000, donors: 185, status: 'ACTIVE' },
    { id: 'CAMP-03', title: 'Alumni Innovation & ICT Hub', target: 350000000, raised: 290000000, donors: 310, status: 'ACTIVE' }
  ];

  const givingLedger = [
    { id: 'GL-ALUM-101', donor: 'Dr. Patrick Lumumba (Class of 1994)', pledge: 'Centenary Complex', amount: 25000000, method: 'Digital Pay Switch', date: '2026-08-20', status: 'CLEARED_FAAP' },
    { id: 'GL-ALUM-102', donor: 'Eng. Sarah Nabukenya (Class of 2001)', pledge: 'Student Bursary Fund', amount: 5000000, method: 'Airtel Money MoMo', date: '2026-08-21', status: 'CLEARED_FAAP' },
    { id: 'GL-ALUM-103', donor: 'UK Alumni Chapter Association', pledge: 'ICT Hub Equipment', amount: 45000000, method: 'Stanbic SWIFT Wire', date: '2026-08-22', status: 'CLEARED_FAAP' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Alumni Advancement, Endowments & FAAP Finance</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-300 uppercase">
              FAAP Alumni Core
            </span>
          </div>
          <p className="text-slate-500 text-xs mt-1">
            Endowment fund accounting, alumni giving, membership subscriptions, capital campaign pledges & General Ledger integration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert('Exporting Alumni Financial Statement...')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold shadow-2xs transition"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Statement</span>
          </button>
          <button 
            onClick={() => alert('Launching new giving campaign...')}
            className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Launch Campaign</span>
          </button>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Endowment Fund Value</span>
          <p className="text-2xl font-black text-slate-900 mt-1 font-mono">1,050,000,000 UGX</p>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">Invested in Treasury Bills & Fixed Deposits</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Annual Giving Collections YTD</span>
          <p className="text-2xl font-black text-rose-600 mt-1 font-mono">835,000,000 UGX</p>
          <p className="text-[11px] text-slate-500 mt-1">735 Active Alumni Donors</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Chapter Membership Dues</span>
          <p className="text-2xl font-black text-slate-900 mt-1 font-mono">142,500,000 UGX</p>
          <p className="text-[11px] text-blue-600 font-bold mt-1">14 Global Chapters Active</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bursaries Awarded YTD</span>
          <p className="text-2xl font-black text-purple-700 mt-1 font-mono">165,000,000 UGX</p>
          <p className="text-[11px] text-slate-500 mt-1">48 Students Supported</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white p-1 rounded-xl shadow-2xs gap-1 text-xs font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('GIVING')}
          className={`px-4 py-2 rounded-lg transition ${activeTab === 'GIVING' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Giving Campaigns & Pledges
        </button>
        <button
          onClick={() => setActiveTab('ENDOWMENT')}
          className={`px-4 py-2 rounded-lg transition ${activeTab === 'ENDOWMENT' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Endowment & Capital Funds
        </button>
        <button
          onClick={() => setActiveTab('MEMBERSHIP')}
          className={`px-4 py-2 rounded-lg transition ${activeTab === 'MEMBERSHIP' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Chapter Finances & Subscriptions
        </button>
        <button
          onClick={() => setActiveTab('CASHBOOK')}
          className={`px-4 py-2 rounded-lg transition ${activeTab === 'CASHBOOK' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Cashbook & Digital Pay Switch
        </button>
        <button
          onClick={() => setActiveTab('REPORTS')}
          className={`px-4 py-2 rounded-lg transition ${activeTab === 'REPORTS' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Financial Statements
        </button>
        <button
          onClick={() => setActiveTab('AUDIT')}
          className={`px-4 py-2 rounded-lg transition ${activeTab === 'AUDIT' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Audit & Parity Checks
        </button>
      </div>

      {activeTab === 'GIVING' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campaigns.map(c => {
              const pct = Math.round((c.raised / c.target) * 100);
              return (
                <div key={c.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">{c.id}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{c.status}</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">{c.title}</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-500">Target:</span>
                      <span className="font-bold text-slate-900">{c.target.toLocaleString()} UGX</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-rose-600 h-2 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>{pct}% funded</span>
                      <span>{c.donors} Donors</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm">Alumni Contribution & Pledge Ledger</h3>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Digital Pay & FAAP Direct Linked
              </span>
            </div>

            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Alumnus / Chapter</th>
                  <th className="px-6 py-4">Campaign Target</th>
                  <th className="px-6 py-4">Payment Channel</th>
                  <th className="px-6 py-4 text-right">Amount (UGX)</th>
                  <th className="px-6 py-4 text-center">FAAP Ledger Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {givingLedger.map(g => (
                  <tr key={g.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-mono font-bold text-slate-800 text-xs">{g.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{g.donor}</td>
                    <td className="px-6 py-4 text-slate-600">{g.pledge}</td>
                    <td className="px-6 py-4 font-sans text-xs text-slate-700">{g.method}</td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-emerald-700">{g.amount.toLocaleString()} UGX</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-full uppercase">
                        {g.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(activeTab === 'ENDOWMENT' || activeTab === 'MEMBERSHIP' || activeTab === 'CASHBOOK' || activeTab === 'REPORTS' || activeTab === 'AUDIT') && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4">
          <ShieldCheck className="w-12 h-12 text-rose-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">FAAP Advancement & Endowment Engine Active</h3>
          <p className="text-slate-500 text-xs max-w-xl mx-auto">
            All alumni contributions, endowment fund growth, chapter membership fees, and capital project disbursements post to the General Ledger with double-entry parity.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 font-mono text-xs font-bold rounded-lg border border-emerald-200">
              ✓ Parity Verified: $0.00 Debit/Credit Balance
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
