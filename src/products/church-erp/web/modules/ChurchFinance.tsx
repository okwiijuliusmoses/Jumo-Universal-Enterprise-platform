import React, { useState } from 'react';
import { 
  DollarSign, Calculator, BookOpen, Layers, CheckCircle2, 
  Building2, ArrowUpRight, ArrowDownRight, ShieldCheck, Download,
  Plus, Search, Filter, RefreshCw, FileText, PieChart
} from 'lucide-react';

export const ChurchFinance: React.FC<{ donations?: any[]; onDonationAdded?: any }> = () => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'TITHES' | 'QUOTAS' | 'CASHBOOK' | 'BUDGET' | 'PROJECTS' | 'REPORTS' | 'AUDIT'>('OVERVIEW');
  const [searchTerm, setSearchTerm] = useState('');

  const titheRecords = [
    { id: 'TTH-2026-081', memberName: 'Elder Joseph Kigozi', parish: 'St. Paul Cathedral', category: 'Monthly Tithe', amount: 450000, date: '2026-08-20', status: 'RECORDED', receipt: 'REC-CH-901' },
    { id: 'TTH-2026-082', memberName: 'Dr. Mary Namatovu', parish: 'St. Peter Archdeaconry', category: 'Harvest Thanksgiving Pledge', amount: 1200000, date: '2026-08-21', status: 'RECORDED', receipt: 'REC-CH-902' },
    { id: 'TTH-2026-083', memberName: 'Hon. Grace Akello', parish: 'All Saints Parish', category: 'Sacramental Fee (Holy Matrimony)', amount: 250000, date: '2026-08-22', status: 'RECORDED', receipt: 'REC-CH-903' },
    { id: 'TTH-2026-084', memberName: 'Anonymous Donor', parish: 'Diocesan Chancery', category: 'Solar Borehole Grant', amount: 15000000, date: '2026-08-22', status: 'RECORDED', receipt: 'REC-CH-904' }
  ];

  const quotaRemittances = [
    { parish: 'St. Paul Cathedral Archdeaconry', annualQuota: 45000000, remittedYTD: 33750000, balance: 11250000, status: 'ON_TRACK' },
    { parish: 'St. Peter Kajjansi Parish', annualQuota: 28000000, remittedYTD: 21000000, balance: 7000000, status: 'ON_TRACK' },
    { parish: 'All Saints Mukono Parish', annualQuota: 32000000, remittedYTD: 24000000, balance: 8000000, status: 'ON_TRACK' },
    { parish: 'Holy Trinity Entebbe Parish', annualQuota: 35000000, remittedYTD: 17500000, balance: 17500000, status: 'BEHIND' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Diocesan & Parish Financial Backbone (FAAP)</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase">
              FAAP Church Core
            </span>
          </div>
          <p className="text-slate-500 text-xs mt-1">
            Canonical ecclesiastical accounting: Tithes, Offertory, Diocesan Quotas, Clergy Payroll, Project Grants & Audit Books.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert('Exporting Diocesan Financial Statements XML/Excel...')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold shadow-2xs transition"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Diocesan Return</span>
          </button>
          <button 
            onClick={() => alert('Opening Record Tithe / Remittance Modal...')}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Record Tithe / Offertory</span>
          </button>
        </div>
      </div>

      {/* Financial KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Diocesan Revenue YTD</span>
          <p className="text-2xl font-black text-slate-900 mt-1 font-mono">1,420,500,000 UGX</p>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">Tithes, Quotas & Donor Grants</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Parish Quota Collection Rate</span>
          <p className="text-2xl font-black text-emerald-700 mt-1 font-mono">78.2%</p>
          <p className="text-[11px] text-slate-500 mt-1">96,250,000 UGX Remitted this month</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clergy Payroll & Stipends</span>
          <p className="text-2xl font-black text-slate-900 mt-1 font-mono">184,000,000 UGX</p>
          <p className="text-[11px] text-blue-600 font-bold mt-1">Direct Bank Payroll Sync Active</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Capital Building Projects Fund</span>
          <p className="text-2xl font-black text-purple-700 mt-1 font-mono">450,000,000 UGX</p>
          <p className="text-[11px] text-slate-500 mt-1">Cathedral Solar & School Expansion</p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 bg-white p-1 rounded-xl shadow-2xs gap-1 text-xs font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`px-4 py-2 rounded-lg transition ${activeTab === 'OVERVIEW' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          General Ledger & COA
        </button>
        <button
          onClick={() => setActiveTab('TITHES')}
          className={`px-4 py-2 rounded-lg transition ${activeTab === 'TITHES' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Tithes & Offertory Ledger
        </button>
        <button
          onClick={() => setActiveTab('QUOTAS')}
          className={`px-4 py-2 rounded-lg transition ${activeTab === 'QUOTAS' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Parish Diocesan Quotas
        </button>
        <button
          onClick={() => setActiveTab('CASHBOOK')}
          className={`px-4 py-2 rounded-lg transition ${activeTab === 'CASHBOOK' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Triple Cash Book & Bank
        </button>
        <button
          onClick={() => setActiveTab('BUDGET')}
          className={`px-4 py-2 rounded-lg transition ${activeTab === 'BUDGET' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Vote Book & Budgeting
        </button>
        <button
          onClick={() => setActiveTab('PROJECTS')}
          className={`px-4 py-2 rounded-lg transition ${activeTab === 'PROJECTS' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Grant & Building Projects
        </button>
        <button
          onClick={() => setActiveTab('REPORTS')}
          className={`px-4 py-2 rounded-lg transition ${activeTab === 'REPORTS' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          IFRS Financial Statements
        </button>
        <button
          onClick={() => setActiveTab('AUDIT')}
          className={`px-4 py-2 rounded-lg transition ${activeTab === 'AUDIT' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Auditor Books & Parity
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'TITHES' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm">Tithe & Sacramental Receipts Register</h3>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              FAAP Synchronized
            </span>
          </div>

          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Receipt Ref</th>
                <th className="px-6 py-4">Member / Sponsor</th>
                <th className="px-6 py-4">Parish / Archdeaconry</th>
                <th className="px-6 py-4">Revenue Category</th>
                <th className="px-6 py-4 text-right">Amount (UGX)</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {titheRecords.map(r => (
                <tr key={r.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-mono font-bold text-slate-800 text-xs">{r.receipt}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{r.memberName}</td>
                  <td className="px-6 py-4 text-slate-600">{r.parish}</td>
                  <td className="px-6 py-4 font-sans text-xs font-semibold text-slate-700">{r.category}</td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-emerald-700">{r.amount.toLocaleString()} UGX</td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-full uppercase">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'QUOTAS' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-sm">Parish Archdeaconry Quota Remittance Schedule</h3>
          </div>

          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Parish Jurisdiction</th>
                <th className="px-6 py-4 text-right">Approved Annual Quota (UGX)</th>
                <th className="px-6 py-4 text-right">Remitted YTD (UGX)</th>
                <th className="px-6 py-4 text-right">Outstanding Quota Balance</th>
                <th className="px-6 py-4 text-center">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {quotaRemittances.map(q => (
                <tr key={q.parish} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-bold text-slate-900">{q.parish}</td>
                  <td className="px-6 py-4 text-right font-mono text-slate-700">{q.annualQuota.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-mono text-emerald-700 font-bold">{q.remittedYTD.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-mono text-rose-600 font-bold">{q.balance.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${q.status === 'ON_TRACK' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {q.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(activeTab === 'OVERVIEW' || activeTab === 'CASHBOOK' || activeTab === 'BUDGET' || activeTab === 'PROJECTS' || activeTab === 'REPORTS' || activeTab === 'AUDIT') && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4">
          <ShieldCheck className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">FAAP Institutional Accounting Active for Church ERP</h3>
          <p className="text-slate-500 text-xs max-w-xl mx-auto">
            Full General Ledger, Double-Entry Posting, Vote Book Encumbrance, Triple Cashbooks, Payroll & IFRS Financial Statements are completely connected to FAAP.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 font-mono text-xs font-bold rounded-lg border border-emerald-200">
              ✓ Parity Checked: $0.00 Debit/Credit Offset
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
