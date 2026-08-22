import React, { useState } from 'react';
import { Scale, Database, ShieldCheck, AlertCircle, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { JournalEntry } from '../domain/FaapModels';

export const FaapControllerWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gl' | 'journals' | 'cashbook'>('journals');

  const mockJournals: JournalEntry[] = [
    {
      entryId: 'JRN-2026-001',
      transactionRef: 'PAY-SW-8821',
      date: '2026-08-21T10:00:00Z',
      description: 'Mobile Money Deposit Settlement',
      status: 'POSTED',
      postedBy: 'SYS_ROUTER',
      tenantId: 'TENANT_01',
      integrityHash: 'faap_sealed_8f72a...',
      lines: [
        { accountId: '1001-CASH', type: 'DEBIT', amount: 50000, currency: 'USD' },
        { accountId: '2001-USER_WALLET_LIAB', type: 'CREDIT', amount: 50000, currency: 'USD' }
      ]
    },
    {
      entryId: 'JRN-2026-002',
      transactionRef: 'LND-DISB-991',
      date: '2026-08-21T10:15:00Z',
      description: 'Microfinance Loan Disbursement',
      status: 'POSTED',
      postedBy: 'LENDING_ENGINE',
      tenantId: 'TENANT_01',
      integrityHash: 'faap_sealed_b3a19...',
      lines: [
        { accountId: '1005-LOAN_REC', type: 'DEBIT', amount: 2500, currency: 'USD' },
        { accountId: '1001-CASH', type: 'CREDIT', amount: 2500, currency: 'USD' }
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <header className="bg-slate-900 text-white px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
            <Scale className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-black">Financial Accounting & FAAP Ledger</h1>
            <p className="text-xs text-slate-400 font-mono">FT-ACC-01 • Cryptographic Double-Entry Core</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-xs font-bold font-mono flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> PARITY: ZERO
          </span>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Navigation */}
        <div className="flex gap-4 border-b border-slate-200 pb-2">
          {['gl', 'journals', 'cashbook', 'reports'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 font-bold text-sm uppercase tracking-wider transition ${
                activeTab === tab 
                  ? 'text-emerald-600 border-b-2 border-emerald-600' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'journals' && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <Database className="w-4 h-4 text-slate-500" /> General Journal Entries
              </h2>
              <button className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded shadow hover:bg-slate-800">
                + Manual Journal Entry
              </button>
            </div>
            
            <div className="divide-y divide-slate-100">
              {mockJournals.map(jrn => (
                <div key={jrn.entryId} className="p-4 hover:bg-slate-50 transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm font-bold text-slate-900">{jrn.entryId}</span>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded text-[9px] font-black uppercase">
                          {jrn.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{jrn.description} • Source: <span className="font-mono">{jrn.transactionRef}</span></p>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 font-mono">{new Date(jrn.date).toLocaleString()}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-1 flex items-center gap-1 justify-end">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" /> {jrn.integrityHash}
                      </div>
                    </div>
                  </div>
                  
                  {/* Lines */}
                  <div className="bg-slate-100 rounded-lg p-3 grid gap-2">
                    {jrn.lines.map((line, i) => (
                      <div key={i} className="flex justify-between text-xs font-mono">
                        <span className="text-slate-600">{line.accountId}</span>
                        <div className="flex gap-4 min-w-[200px] justify-end">
                          <span className={`w-24 text-right ${line.type === 'DEBIT' ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}>
                            {line.type === 'DEBIT' ? line.amount.toFixed(2) : '-'}
                          </span>
                          <span className={`w-24 text-right ${line.type === 'CREDIT' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
                            {line.type === 'CREDIT' ? line.amount.toFixed(2) : '-'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
