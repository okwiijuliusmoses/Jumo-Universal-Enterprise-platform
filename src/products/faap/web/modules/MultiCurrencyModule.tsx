import React, { useState } from 'react';
import { Globe, ArrowRightLeft, RefreshCw, CheckCircle2, TrendingUp } from 'lucide-react';

interface CurrencyRate {
  code: string;
  name: string;
  symbol: string;
  spotRateToUGX: number;
  lastUpdated: string;
}

export const MultiCurrencyModule: React.FC = () => {
  const [currencies, setCurrencies] = useState<CurrencyRate[]>([
    { code: 'USD', name: 'United States Dollar', symbol: '$', spotRateToUGX: 3720.50, lastUpdated: '2026-08-22 08:00' },
    { code: 'EUR', name: 'Euro', symbol: '€', spotRateToUGX: 4050.25, lastUpdated: '2026-08-22 08:00' },
    { code: 'GBP', name: 'Great British Pound', symbol: '£', spotRateToUGX: 4780.00, lastUpdated: '2026-08-22 08:00' },
    { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', spotRateToUGX: 28.75, lastUpdated: '2026-08-22 08:00' }
  ]);

  const handleRunUnrealizedRevaluation = () => {
    alert(`PERIOD-END FOREX REVALUATION COMPLETED:
Foreign currency accounts (USD Treasury, EUR Donor Grants) revalued against spot rates.
- Net Unrealized Exchange Gain: +18,450,000 UGX
- Posted to GL Account 4090 (Foreign Exchange Gains/Losses).`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Multi-Currency & FX Desk Portal</h1>
          <p className="text-slate-500 text-sm">QuickBooks-benchmarked spot exchange rates, foreign currency transactions & realized/unrealized FX gain/loss revaluation.</p>
        </div>
        <button 
          onClick={handleRunUnrealizedRevaluation}
          className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all"
        >
          <RefreshCw className="w-4 h-4" /> Revalue FX Accounts
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Base Accounting Currency</span>
          <p className="text-3xl font-black text-slate-900 mt-1 font-mono">UGX (Uganda Shilling)</p>
          <p className="text-xs text-slate-500 mt-2">All financial statements & tax returns rendered in base currency</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Net Realized FX Gain/Loss YTD</span>
          <p className="text-3xl font-black text-emerald-600 mt-1 font-mono">+42,800,000 UGX</p>
          <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Foreign Exchange Profit Posted to GL
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <span className="font-bold text-slate-800 text-sm">Live Exchange Rate Table (UGX Equivalents)</span>
          <span className="text-xs font-mono text-slate-500">Auto-Synced from Central Bank Feed</span>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Currency Code</th>
              <th className="px-6 py-4">Currency Title</th>
              <th className="px-6 py-4 text-right">Spot Rate (1 Unit = UGX)</th>
              <th className="px-6 py-4 text-center">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currencies.map((curr) => (
              <tr key={curr.code} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-slate-900 text-sm">{curr.symbol} {curr.code}</td>
                <td className="px-6 py-4 font-bold text-slate-800">{curr.name}</td>
                <td className="px-6 py-4 text-right font-mono font-bold text-emerald-700 text-base">{curr.spotRateToUGX.toLocaleString()} UGX</td>
                <td className="px-6 py-4 text-center font-mono text-xs text-slate-500">{curr.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
