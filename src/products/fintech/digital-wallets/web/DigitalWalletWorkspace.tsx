import React, { useState, useEffect } from 'react';
import { Wallet, Plus, ArrowRightLeft, Shield, AlertCircle, CheckCircle2, History, CreditCard } from 'lucide-react';
import { walletService } from '../services/WalletService';
import { DigitalWallet } from '../domain/Wallet';

export const DigitalWalletWorkspace: React.FC = () => {
  const [wallets, setWallets] = useState<DigitalWallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<DigitalWallet | null>(null);

  useEffect(() => {
    // Seed some demo wallets
    if (walletService.getWalletsByCustomer('CUST-001').length === 0) {
      const w1 = walletService.provisionWallet('CUST-001', 'USD', 'TIER_2');
      const w2 = walletService.provisionWallet('CUST-001', 'EUR', 'TIER_1');
      const w3 = walletService.provisionWallet('CUST-002', 'USD', 'TIER_1');
      
      // Give some initial balance manually for demo
      w1.balance = 5400.00;
      w2.balance = 1250.50;
      
      walletService.transferFunds(w1.id, w3.id, 400.00);
    }
    setWallets(walletService.getWalletsByCustomer('CUST-001'));
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Wallet className="w-6 h-6 text-emerald-600" /> Digital Wallets
          </h2>
          <p className="text-sm text-slate-500">Stored value facilities and digital account management</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4" /> Transfer
          </button>
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2">
            <Plus className="w-4 h-4" /> Provision Wallet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">My Wallets</h3>
          {wallets.map(wallet => (
            <div 
              key={wallet.id}
              onClick={() => setSelectedWallet(wallet)}
              className={`p-4 rounded-xl border cursor-pointer transition shadow-sm \${
                selectedWallet?.id === wallet.id 
                  ? 'bg-slate-900 border-slate-900 text-white' 
                  : 'bg-white border-slate-200 hover:border-emerald-500 text-slate-900'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center \${selectedWallet?.id === wallet.id ? 'bg-slate-800' : 'bg-slate-100'}`}>
                    <CreditCard className={`w-4 h-4 \${selectedWallet?.id === wallet.id ? 'text-emerald-400' : 'text-slate-600'}`} />
                  </div>
                  <div>
                    <div className="text-xs font-bold font-mono opacity-80">{wallet.id}</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider opacity-60">{wallet.tier}</div>
                  </div>
                </div>
                <div className={`px-2 py-0.5 rounded text-[10px] font-bold \${
                  wallet.status === 'ACTIVE' 
                    ? selectedWallet?.id === wallet.id ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {wallet.status}
                </div>
              </div>
              <div>
                <div className="text-2xl font-black">{wallet.currency} {wallet.balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                <div className="text-xs opacity-70 flex items-center gap-1 mt-1">
                  <Shield className="w-3 h-3" /> Ledger Parity Verified
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          {selectedWallet ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <History className="w-4 h-4 text-slate-500" /> Transaction History
                </h3>
                <div className="text-xs font-mono text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                  {selectedWallet.id}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-0">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-500">
                      <th className="p-3 font-bold">Transaction ID</th>
                      <th className="p-3 font-bold">Type</th>
                      <th className="p-3 font-bold">Reference</th>
                      <th className="p-3 font-bold">Date</th>
                      <th className="p-3 font-bold text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {walletService.getWalletTransactions(selectedWallet.id).length > 0 ? (
                      walletService.getWalletTransactions(selectedWallet.id).map(tx => (
                        <tr key={tx.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                          <td className="p-3 font-mono text-xs text-slate-600">{tx.id}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold \${
                              tx.type.includes('IN') ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {tx.type}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-xs text-slate-500">{tx.reference}</td>
                          <td className="p-3 text-slate-500 text-xs">
                            {new Date(tx.timestamp).toLocaleString()}
                          </td>
                          <td className={`p-3 font-black text-right font-mono \${
                            tx.type.includes('IN') ? 'text-emerald-600' : 'text-slate-900'
                          }`}>
                            {tx.type.includes('IN') ? '+' : '-'}{tx.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-400">
                          <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-20" />
                          No transactions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-xl border border-dashed border-slate-200 h-[500px] flex items-center justify-center text-slate-400">
              Select a wallet to view history
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
