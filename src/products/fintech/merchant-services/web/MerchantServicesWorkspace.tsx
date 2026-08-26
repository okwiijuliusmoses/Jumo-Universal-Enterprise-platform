import React, { useState, useEffect } from 'react';
import { Store, Plus, Smartphone, CheckCircle2, AlertCircle, History, CreditCard } from 'lucide-react';
import { merchantService } from '../services/MerchantService';
import { MerchantProfile, MerchantTransaction } from '../domain/Merchant';
import { formatNumber } from '../../../../utils/formatters';

export const MerchantServicesWorkspace: React.FC = () => {
  const [merchants, setMerchants] = useState<MerchantProfile[]>([]);
  const [selectedMerchant, setSelectedMerchant] = useState<MerchantProfile | null>(null);

  useEffect(() => {
    if (merchantService.getAllMerchants().length === 0) {
      const m1 = merchantService.onboardMerchant('Shoprite Stores', 'Retail', 'ENTERPRISE');
      const m2 = merchantService.onboardMerchant('Java House', 'Hospitality', 'STANDARD');
      
      // Seed some transactions
      merchantService.processPayment(m1.id, 4500, 'KES');
      merchantService.processPayment(m1.id, 12000, 'KES');
      merchantService.processPayment(m2.id, 850, 'KES');
    }
    setMerchants(merchantService.getAllMerchants());
  }, []);

  const handleMockPayment = () => {
    if (!selectedMerchant) return;
    merchantService.processPayment(selectedMerchant.id, Math.floor(Math.random() * 5000) + 500, 'KES');
    // Force re-render to see new tx
    setMerchants([...merchantService.getAllMerchants()]);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Store className="w-6 h-6 text-emerald-600" /> Merchant Services
          </h2>
          <p className="text-sm text-slate-500">Merchant acquiring, POS management, and settlements</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2">
            <Plus className="w-4 h-4" /> Onboard Merchant
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">My Merchants</h3>
          {merchants.map(merchant => {
            const txs = merchantService.getMerchantTransactions(merchant.id);
            const totalVol = txs.reduce((sum, tx) => sum + tx.amount, 0);
            
            return (
              <div 
                key={merchant.id}
                onClick={() => setSelectedMerchant(merchant)}
                className={`p-4 rounded-xl border cursor-pointer transition shadow-sm \${
                  selectedMerchant?.id === merchant.id 
                    ? 'bg-slate-900 border-slate-900 text-white' 
                    : 'bg-white border-slate-200 hover:border-emerald-500 text-slate-900'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center \${selectedMerchant?.id === merchant.id ? 'bg-slate-800' : 'bg-slate-100'}`}>
                      <Store className={`w-4 h-4 \${selectedMerchant?.id === merchant.id ? 'text-emerald-400' : 'text-slate-600'}`} />
                    </div>
                    <div>
                      <div className="text-sm font-bold">{merchant.name}</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 font-mono">{merchant.id}</div>
                    </div>
                  </div>
                  <div className={`px-2 py-0.5 rounded text-[10px] font-bold \${
                    merchant.status === 'ACTIVE' 
                      ? selectedMerchant?.id === merchant.id ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {merchant.tier}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold opacity-70 mb-1">Total Volume</div>
                  <div className="text-2xl font-black">KES {formatNumber(totalVol)}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-2">
          {selectedMerchant ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <History className="w-4 h-4 text-slate-500" /> Settlement & Transactions
                </h3>
                <button onClick={handleMockPayment} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg transition">
                  Simulate Payment
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-0">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-500">
                      <th className="p-3 font-bold">Transaction ID</th>
                      <th className="p-3 font-bold text-right">Gross Amount</th>
                      <th className="p-3 font-bold text-right">Commission ({(((selectedMerchant?.commissionRate ?? 0) * 100)).toFixed(1)}%)</th>
                      <th className="p-3 font-bold text-right">Net Settlement</th>
                      <th className="p-3 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {merchantService.getMerchantTransactions(selectedMerchant.id).map(tx => (
                      <tr key={tx.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                        <td className="p-3 font-mono text-xs text-slate-600">{tx.id}</td>
                        <td className="p-3 font-mono text-xs text-slate-900 text-right font-black">
                          {formatNumber(tx.amount)}
                        </td>
                        <td className="p-3 font-mono text-xs text-rose-600 text-right">
                          -{formatNumber(tx.commissionAmount)}
                        </td>
                        <td className="p-3 font-mono text-xs text-emerald-600 text-right font-black">
                          {formatNumber(tx.netSettlement)}
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-xl border border-dashed border-slate-200 h-[500px] flex items-center justify-center text-slate-400">
              Select a merchant to view settlements
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
