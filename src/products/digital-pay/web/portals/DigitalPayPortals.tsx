import React, { useState, useEffect } from 'react';
import { 
  Wallet, QrCode, ArrowRightLeft, ShieldCheck, 
  TrendingUp, Landmark, Plus, Search, Filter, 
  Download, DollarSign, X, CheckCircle2
} from 'lucide-react';
import { PortalAuthenticationGate } from '../../../PortalAuthenticationGate';
import { DigitalPayService, Wallet as IWallet, PaymentTransaction } from '../../domain/DigitalPayService';

export const DigitalPayWalletPortal: React.FC = () => {
  const service = DigitalPayService.getInstance();
  const [wallets] = useState<IWallet[]>(service.getWallets());
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(service.getTransactions());
  const [showPayModal, setShowPayModal] = useState(false);

  // Form State
  const [fromId, setFromId] = useState('WAL-003');
  const [toId, setToId] = useState('WAL-001');
  const [amount, setAmount] = useState<number>(0);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0) {
      service.processPayment(fromId, toId, amount);
      setTransactions([...service.getTransactions()]);
      setShowPayModal(false);
      setAmount(0);
    }
  };

  return (
    <PortalAuthenticationGate
      portalId="digital-pay-wallet"
      portalName="Digital Pay Wallet & Settlement Console"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_FINTECH_USER', 'ROLE_FINTECH_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Virtual Wallets & QR Settlement</h1>
            <p className="text-xs text-slate-500">Real-time payment clearing with automated 1.5% JUMO settlement fee.</p>
          </div>
          <button 
            onClick={() => setShowPayModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition shadow-sm"
          >
            Scan & Pay
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {wallets.map(w => (
            <div key={w.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{w.id}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${w.type === 'MERCHANT' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                  {w.type}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500">{w.ownerName}</p>
                <p className="text-2xl font-black text-slate-900 mt-1 font-mono">{w.balance.toLocaleString()} UGX</p>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-600">Settlement Active</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm">Real-Time Transaction Ledger</h3>
            <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100 uppercase">
              1.5% Fee Engine Active
            </span>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">TX ID</th>
                <th className="px-6 py-4">From/To</th>
                <th className="px-6 py-4 text-right">Gross</th>
                <th className="px-6 py-4 text-right">JUMO Fee (1.5%)</th>
                <th className="px-6 py-4 text-right">Net Settlement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-slate-400">{t.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-slate-900 font-bold">{t.fromWalletId}</span>
                      <span className="text-slate-400 text-[10px] font-mono">→ {t.toWalletId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-slate-500">{t.grossAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-mono text-rose-600">-{t.feeAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-mono font-black text-emerald-600">{t.netAmount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showPayModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Virtual Wallet Transfer</h3>
                <button onClick={() => setShowPayModal(false)}><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handlePay} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Source Wallet</label>
                  <select value={fromId} onChange={e => setFromId(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm">
                    {wallets.map(w => <option key={w.id} value={w.id}>{w.ownerName} ({w.id})</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Destination Merchant</label>
                  <select value={toId} onChange={e => setToId(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm">
                    {wallets.filter(w => w.type === 'MERCHANT').map(w => <option key={w.id} value={w.id}>{w.ownerName} ({w.id})</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Gross Amount (UGX)</label>
                  <input type="number" value={amount || ''} onChange={e => setAmount(Number(e.target.value))} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-mono font-bold" />
                  <p className="text-[10px] text-slate-400 mt-1">A 1.5% settlement fee will be applied automatically.</p>
                </div>
                <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-indigo-700 transition">
                  Confirm QR Payment
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </PortalAuthenticationGate>
  );
};
