import React, { useState } from 'react';
import { 
  DollarSign, CheckCircle2, Search, Filter, Plus, 
  Printer, ArrowUpRight, TrendingUp, ShieldCheck, Layers
} from 'lucide-react';

export const ChurchFinanceOffice: React.FC = () => {
  const tithes = [
    { id: 'TTH-9941', giver: 'Eng. Patrick Byaruhanga (Pledge #204)', amount: '$1,200.00', type: 'Tithes & Thanksgiving', channel: 'FAAP Direct Settlement', time: 'Today, 08:45 AM' },
    { id: 'TTH-9942', giver: 'St. Paul Mothers Union Fellowship', amount: '$850.00', type: 'Missionary Outreach Fund', channel: 'Mobile Money Switch', time: 'Today, 09:12 AM' },
    { id: 'TTH-9943', giver: 'Sunday 1st Service General Offering', amount: '$3,420.00', type: 'Sunday Worship Offertory', channel: 'Cash Book Verified', time: 'Yesterday, 11:30 AM' },
    { id: 'TTH-9944', giver: 'Dr. Stella Nakalema (Tithe Envelope #082)', amount: '$600.00', type: 'Monthly Tithe', channel: 'Card Gateway', time: 'Yesterday, 04:15 PM' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-xs">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">STEWARDSHIP, TITHES & DIOCESAN QUOTA</h1>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                FAAP Double-Entry ($0.00 Parity)
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Tithes, Sunday offerings, capital campaign pledges, and automated Diocesan quota remittances.
            </p>
          </div>
        </div>

        <button 
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Record Tithe Remittance</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">Monthly Stewardship Inflow</div>
          <div className="text-2xl font-black text-slate-900 mt-1">$39,720.00</div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1">100% General Ledger Posted</div>
        </div>
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">Diocesan Quota Cleared</div>
          <div className="text-2xl font-black text-purple-600 mt-1">$24,000.00</div>
          <div className="text-[11px] font-semibold text-purple-700 mt-1">100% On-Time Remittance</div>
        </div>
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">Cathedral Building Fund</div>
          <div className="text-2xl font-black text-blue-600 mt-1">$142,500.00</div>
          <div className="text-[11px] font-semibold text-slate-500 mt-1">Restricted Project Reserve</div>
        </div>
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">Audit Parity Status</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">$0.00 Var</div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1">FAAP Ledger Verified</div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Recent Stewardship Transactions & Cash Book</h3>
          <span className="text-xs text-slate-500 font-mono">Live FAAP Ledger Backbone</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
              <tr>
                <th className="px-4 py-2.5">Transaction ID</th>
                <th className="px-4 py-2.5">Giver / Fellowship Pledge</th>
                <th className="px-4 py-2.5">Giving Type</th>
                <th className="px-4 py-2.5">Payment Channel</th>
                <th className="px-4 py-2.5 text-right">Amount ($)</th>
                <th className="px-4 py-2.5 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {tithes.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-4 py-3 font-mono font-bold text-slate-500">{t.id}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">{t.giver}</td>
                  <td className="px-4 py-3 text-purple-700 font-semibold">{t.type}</td>
                  <td className="px-4 py-3 text-slate-600">{t.channel}</td>
                  <td className="px-4 py-3 text-right font-mono text-emerald-600 font-bold">{t.amount}</td>
                  <td className="px-4 py-3 text-right text-slate-500 font-mono text-[11px]">{t.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
