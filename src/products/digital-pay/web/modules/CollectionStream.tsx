import React, { useState } from 'react';
import { Smartphone, Landmark, CreditCard, RefreshCw, ArrowUpRight, CheckCircle, Clock, Search } from 'lucide-react';
import { DigitalPayService } from '../../domain/DigitalPayService';

export const CollectionStream: React.FC = () => {
  const service = DigitalPayService.getInstance();
  const [txs] = useState(service.getTransactions());
  const [filterChannel, setFilterChannel] = useState<string>('ALL');

  const filtered = filterChannel === 'ALL' 
    ? txs 
    : txs.filter(t => t.channel === filterChannel);

  const channelTotals = txs.reduce((acc, t) => {
    acc[t.channel] = (acc[t.channel] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Live Collection Stream</h1>
          <p className="text-slate-500 text-sm">Consolidated real-time transaction ingestion across all payment channels.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-200">
            <RefreshCw className="w-3 h-3 animate-spin text-emerald-600" />
            Live Monitoring
          </div>
        </div>
      </div>

      {/* Dynamic Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { key: 'MOBILE_MONEY', label: 'Mobile Money Gateways', value: channelTotals['MOBILE_MONEY'] || 0, icon: Smartphone, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { key: 'BANK_TRANSFER', label: 'EFT & Bank Transfers', value: channelTotals['BANK_TRANSFER'] || 0, icon: Landmark, color: 'text-blue-600', bg: 'bg-blue-50' },
          { key: 'CARD', label: 'Visa / Credit Card', value: channelTotals['CARD'] || 0, icon: CreditCard, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { key: 'WALLET', label: 'Internal JUMO Wallet', value: channelTotals['WALLET'] || 0, icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((chan, i) => (
          <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <div className={`w-10 h-10 ${chan.bg} ${chan.color} rounded-xl flex items-center justify-center mb-4`}>
              <chan.icon className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{chan.label}</p>
            <p className="text-xl font-black text-slate-900 mt-1">{chan.value.toLocaleString()} UGX</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="font-bold text-slate-900 text-sm">Real-time Transaction Journal</h3>
          <div className="flex items-center gap-3">
            <select 
              value={filterChannel}
              onChange={(e) => setFilterChannel(e.target.value)}
              className="bg-white border border-slate-200 text-xs font-bold text-slate-700 px-3 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="ALL">All Channels</option>
              <option value="MOBILE_MONEY">Mobile Money</option>
              <option value="BANK_TRANSFER">Bank Transfer</option>
              <option value="CARD">Card Payments</option>
              <option value="WALLET">Wallet</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Transaction Ref</th>
                <th className="px-6 py-4">Channel</th>
                <th className="px-6 py-4">PRN / Reference</th>
                <th className="px-6 py-4 text-right">Fee Deduction (1.5%)</th>
                <th className="px-6 py-4 text-right">Settled Amount (UGX)</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((tx) => {
                const fee = Math.round(tx.amount * 0.015);
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-[11px] font-bold text-slate-600">{tx.transactionRef}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-700 text-xs uppercase">{tx.channel.replace('_', ' ')}</span>
                    </td>
                    <td className="px-6 py-4 font-mono text-[11px] font-black text-blue-600">{tx.reference}</td>
                    <td className="px-6 py-4 text-right font-mono font-medium text-rose-600">-{fee.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-black text-slate-900">{(tx.amount - fee).toLocaleString()}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-200">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
