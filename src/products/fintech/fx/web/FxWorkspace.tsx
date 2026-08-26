import React, { useState, useEffect } from 'react';
import { RefreshCcw, ArrowRight, ArrowDownRight, ArrowUpRight, CheckCircle2, TrendingUp, History } from 'lucide-react';
import { fxService } from '../services/FxService';
import { FxRate, FxOrder } from '../domain/Fx';
import { formatMoney, formatNumber } from '../../../../utils/formatters';

export const FxWorkspace: React.FC = () => {
  const [rates, setRates] = useState<FxRate[]>([]);
  const [orders, setOrders] = useState<FxOrder[]>([]);

  const [base, setBase] = useState('USD');
  const [quote, setQuote] = useState('KES');
  const [amount, setAmount] = useState(1000);

  useEffect(() => {
    setRates(fxService.getRates());
    // Seed an initial order
    if (fxService.getOrders('CUST-001').length === 0) {
      fxService.executeOrder('CUST-001', 'USD', 'KES', 'BUY', 500);
    }
    setOrders(fxService.getOrders('CUST-001'));
  }, []);

  const handleTrade = (side: 'BUY' | 'SELL') => {
    try {
      fxService.executeOrder('CUST-001', base, quote, side, amount);
      setOrders(fxService.getOrders('CUST-001'));
    } catch (e: any) {
      alert(e.message);
    }
  };

  const selectedRate = rates.find(r => r.baseCurrency === base && r.quoteCurrency === quote);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-600" /> Foreign Exchange Treasury
          </h2>
          <p className="text-sm text-slate-500">Real-time FX conversion and rates management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dealing Desk */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 uppercase text-sm tracking-wider">Dealing Desk</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-bold text-slate-500 mb-1 block">Base</label>
                  <select 
                    value={base} onChange={e => setBase(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-xs font-bold text-slate-500 mb-1 block">Quote</label>
                  <select 
                    value={quote} onChange={e => setQuote(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold"
                  >
                    <option value="KES">KES</option>
                    <option value="UGX">UGX</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 block">Amount ({base})</label>
                <input 
                  type="number" 
                  value={amount} onChange={e => setAmount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-black font-mono"
                />
              </div>

              {selectedRate && (
                <div className="p-3 bg-slate-900 rounded-lg text-white space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">Rate:</span>
                    <span>{(selectedRate?.midRate ?? 0).toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">Est. Total:</span>
                    <span className="text-emerald-400 font-mono">{formatMoney(amount * (selectedRate?.midRate ?? 0), '').replace('UGX', '').trim()} {quote}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={() => handleTrade('SELL')} className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition shadow-md">
                SELL {base}
              </button>
              <button onClick={() => handleTrade('BUY')} className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition shadow-md">
                BUY {base}
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-3 text-xs uppercase tracking-wider">Live Rates</h3>
            <div className="space-y-2">
              {rates.map(r => (
                <div key={r.id} className="flex justify-between items-center p-2 hover:bg-slate-50 rounded border border-transparent hover:border-slate-100 cursor-pointer">
                  <span className="font-bold text-sm text-slate-700">{r.baseCurrency}/{r.quoteCurrency}</span>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold">{(r.midRate ?? 0).toFixed(4)}</div>
                    <div className="text-[10px] text-emerald-500 flex items-center justify-end gap-1"><ArrowUpRight className="w-3 h-3" /> 0.02%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Book / History */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col min-h-[500px]">
             <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <History className="w-4 h-4 text-slate-500" /> FX Order History
                </h3>
             </div>
             <div className="flex-1 overflow-y-auto p-0">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-500">
                     <th className="p-3 font-bold">Order ID</th>
                     <th className="p-3 font-bold">Pair</th>
                     <th className="p-3 font-bold">Side</th>
                     <th className="p-3 font-bold text-right">Amount</th>
                     <th className="p-3 font-bold text-right">Rate</th>
                     <th className="p-3 font-bold text-right">Total Quote</th>
                   </tr>
                 </thead>
                 <tbody className="text-sm">
                   {orders.map(order => (
                     <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                       <td className="p-3 font-mono text-xs text-slate-600">{order.id}</td>
                       <td className="p-3 font-bold text-slate-700">{order.baseCurrency}/{order.quoteCurrency}</td>
                       <td className="p-3">
                         <span className={`px-2 py-1 rounded text-[10px] font-bold \${
                           order.side === 'BUY' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                         }`}>
                           {order.side}
                         </span>
                       </td>
                       <td className="p-3 font-mono text-xs text-slate-900 text-right">
                         {formatNumber(order.amount)}
                       </td>
                       <td className="p-3 font-mono text-xs text-slate-600 text-right">
                         {(order.executedRate ?? 0).toFixed(4)}
                       </td>
                       <td className="p-3 font-mono text-xs font-black text-slate-900 text-right">
                         {formatMoney(order.totalQuoteAmount, '').replace('UGX', '').trim()}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
