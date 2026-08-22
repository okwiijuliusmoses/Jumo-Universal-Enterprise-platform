const fs = require('fs');

// Digital Pay Modules
const dpModules = `
import React, { useState } from 'react';
import { Activity, ShieldCheck, Zap, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

export const TransactionsModule = ({transactions = []}: any) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-indigo-600"/> Universal Ledger</h2>
    <table className="w-full text-left text-sm">
      <thead className="bg-slate-50 text-slate-500">
        <tr><th className="p-3">ID</th><th className="p-3">Amount</th><th className="p-3">Status</th></tr>
      </thead>
      <tbody>
        <tr><td className="p-3 border-t">TX-991</td><td className="p-3 border-t">UGX 50,000</td><td className="p-3 border-t text-green-600">SETTLED</td></tr>
      </tbody>
    </table>
  </div>
);

export const GatewayModule = () => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-indigo-600"/> Routing Engine</h2>
    <p className="text-sm text-slate-600 mb-4">Active Gateways mapped to Digital Pay Switch.</p>
    <div className="grid grid-cols-2 gap-4">
      <div className="border border-green-200 bg-green-50 p-4 rounded-lg flex items-center gap-3"><CheckCircle2 className="text-green-600 w-6 h-6"/><div><div className="font-bold text-green-900">MTN Mobile Money</div><div className="text-xs text-green-700">Uptime 99.9%</div></div></div>
      <div className="border border-green-200 bg-green-50 p-4 rounded-lg flex items-center gap-3"><CheckCircle2 className="text-green-600 w-6 h-6"/><div><div className="font-bold text-green-900">Airtel Money</div><div className="text-xs text-green-700">Uptime 99.8%</div></div></div>
    </div>
  </div>
);
`;
fs.writeFileSync('src/products/digital-pay/web/modules/DigitalPayModules.tsx', dpModules);

// FAAP Modules
const faapModules = `
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
`;
fs.writeFileSync('src/products/faap/web/modules/FaapModules.tsx', faapModules);

console.log("Modules generated");
