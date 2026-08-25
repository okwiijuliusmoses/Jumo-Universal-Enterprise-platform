
import React, { useState } from 'react';
import { BookOpen, ArrowRightLeft, FileText, CheckCircle2 } from 'lucide-react';

export const ChartOfAccounts = ({accounts = []}: any) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-emerald-600"/> Chart of Accounts</h2>
    <table className="w-full text-left text-sm">
      <thead className="bg-slate-50 text-slate-500">
        <tr><th className="p-3">Code</th><th className="p-3">Name</th><th className="p-3">Type</th></tr>
      </thead>
      <tbody>
        <tr><td className="p-3 border-t font-mono text-emerald-700">1000</td><td className="p-3 border-t">Cash & Equivalents</td><td className="p-3 border-t">Asset</td></tr>
        <tr><td className="p-3 border-t font-mono text-emerald-700">2000</td><td className="p-3 border-t">Accounts Payable</td><td className="p-3 border-t">Liability</td></tr>
      </tbody>
    </table>
  </div>
);

export const GeneralJournal = ({transactions = [], onPost}: any) => {
  const [amount, setAmount] = useState('');
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><ArrowRightLeft className="w-5 h-5 text-emerald-600"/> General Journal Entry</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input type="number" placeholder="Debit Amount" value={amount} onChange={e=>setAmount(e.target.value)} className="border border-slate-300 p-2 rounded-lg text-sm" />
        <input type="number" placeholder="Credit Amount" value={amount} onChange={e=>setAmount(e.target.value)} className="border border-slate-300 p-2 rounded-lg text-sm" />
      </div>
      <button onClick={onPost} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">Commit $0.00 Offset Ledger</button>
    </div>
  );
};
