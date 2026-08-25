import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, FileText, Lock, Sparkles } from 'lucide-react';

export const AuditModule: React.FC = () => {
  const [logs] = useState([
    { id: 'LOG-8812', timestamp: '2026-08-22 08:14:10', user: 'cfo@jumo.org', action: 'POST_JOURNAL_ENTRY', details: 'Posted Journal #JRN-2026-88 (Debit 1010 4,500,000 UGX, Credit 4010 4,500,000 UGX)', parityOffset: '0.00 UGX', status: 'VERIFIED' },
    { id: 'LOG-8811', timestamp: '2026-08-22 07:45:02', user: 'bursar@school.ac.ug', action: 'ENCUMBER_VOTE_BOOK', details: 'Committed LPO requisition against Vote VOTE-ACAD-101 (25,000,000 UGX)', parityOffset: '0.00 UGX', status: 'VERIFIED' },
    { id: 'LOG-8810', timestamp: '2026-08-21 17:30:00', user: 'system_cron', action: 'AUTO_RECONCILE_BANK', details: 'Matched 14 Stanbic bank feed entries with cashbook register', parityOffset: '0.00 UGX', status: 'VERIFIED' }
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Financial Audit & Internal Controls Portal</h1>
          <p className="text-slate-500 text-sm">Immutable transaction audit logs, cryptographic parity validation, segregation of duties & AI anomaly detection sentinel.</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Parity Enforcement: $0.00 Offset Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Parity Check Pass Rate</span>
          <p className="text-3xl font-black text-emerald-600 mt-1 font-mono">100.0%</p>
          <p className="text-xs text-slate-500 mt-2">Zero imbalanced ledger transactions allowed</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Audit Trail Integrity</span>
          <p className="text-3xl font-black text-slate-900 mt-1 font-mono">SEALED</p>
          <p className="text-xs text-emerald-600 font-bold mt-2">SHA-256 Ledger Hash Chain Intact</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Anomaly Sentinel Alerts</span>
          <p className="text-3xl font-black text-slate-900 mt-1 font-mono">0 Flagged</p>
          <p className="text-xs text-slate-500 mt-2">Continuous scan across all ledger postings</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <span className="font-bold text-slate-800 text-sm">Immutable Financial Audit Trail Log</span>
          <span className="text-xs font-mono font-bold text-slate-500">Real-Time Event Stream</span>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Event ID</th>
              <th className="px-6 py-4">Timestamp & User</th>
              <th className="px-6 py-4">Action Event</th>
              <th className="px-6 py-4">Transaction Narrative</th>
              <th className="px-6 py-4 text-center">Debit/Credit Parity</th>
              <th className="px-6 py-4 text-center">Integrity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-slate-800 text-xs">{log.id}</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900">{log.user}</p>
                  <p className="text-xs font-mono text-slate-400">{log.timestamp}</p>
                </td>
                <td className="px-6 py-4 font-mono text-xs font-bold text-slate-800">{log.action}</td>
                <td className="px-6 py-4 text-xs text-slate-700">{log.details}</td>
                <td className="px-6 py-4 text-center font-mono font-bold text-emerald-700">{log.parityOffset}</td>
                <td className="px-6 py-4 text-center">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-full">
                    {log.status}
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
