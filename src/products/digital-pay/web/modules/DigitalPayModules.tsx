
import React, { useState } from 'react';
import { ShieldCheck, Activity, Zap, CheckCircle2 } from "lucide-react";

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
