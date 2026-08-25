import React, { useState } from 'react';
import { Landmark, ArrowUpRight, DollarSign, Calendar, RefreshCw, Layers, CheckCircle2 } from 'lucide-react';
import { DigitalPayService } from '../../domain/DigitalPayService';

export const SettlementSwitch: React.FC = () => {
  const service = DigitalPayService.getInstance();
  const [batches, setBatches] = useState(service.getBatches());
  const [txs, setTxs] = useState(service.getTransactions());

  const handleCloseBatch = () => {
    try {
      const closed = service.closeDailyBatch();
      setBatches(service.getBatches());
      setTxs(service.getTransactions());
      alert(`Daily Batch ${closed.batchRef} closed successfully! Net merchant settlement split disbursed via bank RTGS API.`);
    } catch (err: any) {
      alert(err.message || 'Error closing daily batch.');
    }
  };

  const totalGross = txs.reduce((sum, t) => sum + t.amount, 0);
  const totalCommission = Math.round(totalGross * 0.015);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Daily Settlement Switch</h1>
          <p className="text-slate-500 text-sm">Automated end-of-day clearing, commission debiting, and merchant payouts.</p>
        </div>
        <button 
          onClick={handleCloseBatch}
          className="flex items-center gap-2 bg-[#0f172a] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg"
        >
          <Layers className="w-4 h-4 text-amber-400" />
          Close Daily Batch
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 border border-blue-100 shadow-inner">
            <Landmark className="w-7 h-7 text-blue-600" />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Settlement Pool</p>
          <p className="text-2xl font-black font-mono text-slate-900 mt-2">
            {(totalGross - totalCommission).toLocaleString()} UGX
          </p>
          <p className="text-[10px] text-emerald-600 font-bold mt-2 uppercase">Scheduled for 00:00 RTGS</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 border border-emerald-100 shadow-inner">
            <DollarSign className="w-7 h-7 text-[#2ca01c]" />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Commission Revenue (1.5%)</p>
          <p className="text-2xl font-black font-mono text-emerald-700 mt-2">
            {totalCommission.toLocaleString()} UGX
          </p>
          <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase">Switch Operating Fee</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-4 shadow-xl">
            <RefreshCw className="w-7 h-7 text-amber-400" />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Settlement Success Rate</p>
          <p className="text-2xl font-black text-slate-900 mt-2">100%</p>
          <p className="text-[10px] text-emerald-500 font-bold mt-2 uppercase font-mono">Verified Node Status</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Settlement Batch History</h3>
          <Calendar className="w-4 h-4 text-slate-400" />
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Batch ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Gross Collections</th>
              <th className="px-6 py-4 text-right">Commission (1.5%)</th>
              <th className="px-6 py-4 text-right">Net Payout</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {batches.map((batch) => (
              <tr key={batch.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono text-[11px] font-bold text-blue-600">{batch.batchRef}</td>
                <td className="px-6 py-4 text-slate-500 font-medium">{batch.collectionDate}</td>
                <td className="px-6 py-4 text-right font-mono font-bold text-slate-900">{batch.totalGross.toLocaleString()}</td>
                <td className="px-6 py-4 text-right font-mono font-bold text-rose-600">{batch.commissionAmount.toLocaleString()}</td>
                <td className="px-6 py-4 text-right font-mono font-black text-emerald-700">{batch.netSettlement.toLocaleString()}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {batch.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
