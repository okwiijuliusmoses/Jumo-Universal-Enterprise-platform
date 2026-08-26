/**
 * JUMO UEOS — Authoritative Universal FinTech Intelligence Platform
 * Payment Gateways (Stripe, M-Pesa, MTN Mobile Money), Wallet Infrastructure, and Settlement Clearing
 * Styled with clean Microsoft 365 / Google Cloud enterprise aesthetic
 */

import React, { useState } from 'react';
import { 
  CreditCard, DollarSign, ArrowRightLeft, ShieldCheck, Zap, Globe, 
  Search, ExternalLink, CheckCircle2, RefreshCw, Smartphone, Landmark, Activity
} from 'lucide-react';
import { EnterpriseLogo } from '../../src/components/EnterpriseLogo';

export const FintechView: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const [activeGateway, setActiveGateway] = useState<'all' | 'mpesa' | 'mtn' | 'stripe' | 'card'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);

  const mockGateways = [
    { id: 'mpesa', name: 'M-Pesa Safaricom / Vodacom Gateway', type: 'CELLULAR_MOBILE_MONEY', status: 'ONLINE', latency: '42ms', currency: 'KES / TZS / UGX', volume: '$45,200.00' },
    { id: 'mtn', name: 'MTN Mobile Money Open API', type: 'CELLULAR_MOBILE_MONEY', status: 'ONLINE', latency: '38ms', currency: 'UGX / RWF / GHS', volume: '$38,900.00' },
    { id: 'stripe', name: 'Stripe Enterprise Global Card Gateway', type: 'CREDIT_DEBIT_CARDS', status: 'ONLINE', latency: '65ms', currency: 'USD / EUR / GBP / CAD', volume: '$42,100.00' },
    { id: 'card', name: 'Airtel Money Clearing Network', type: 'CELLULAR_MOBILE_MONEY', status: 'ONLINE', latency: '48ms', currency: 'UGX / KES / ZMW', volume: '$13,550.00' },
  ];

  const handleSimulateTx = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      alert('FinTech Settlement Simulation Success: $100.00 payment processed via M-Pesa. 1.5% fee ($1.50) credited to JUMO Master Treasury. $98.50 credited to Tenant Org.');
    }, 1000);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <EnterpriseLogo size="md" variant="blue" showText={false} />
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                Universal FinTech Intelligence Platform
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-mono text-[11px] font-semibold rounded border border-blue-200">
                  Ring-0 Gateway Hub
                </span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Cellular Mobile Money (M-Pesa, MTN, Airtel) and Global Card Processing Networks</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleSimulateTx}
              disabled={isSimulating}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-xs flex items-center gap-1.5 disabled:opacity-50"
            >
              <Zap className={`w-3.5 h-3.5 ${isSimulating ? 'animate-bounce' : ''}`} />
              {isSimulating ? 'Simulating Clearing...' : 'Simulate Live Settlement'}
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('/faap')}
              className="px-4 py-2 bg-white hover:bg-white text-white rounded-lg text-xs font-bold transition shadow-xs flex items-center gap-1.5"
            >
              <Landmark className="w-3.5 h-3.5" /> FAAP General Ledger
            </button>
          </div>
        </header>

        {/* FinTech Performance KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-start">
              <div className="text-xs font-bold text-slate-500 uppercase">Total Clearing Volume</div>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">$139,750.00</div>
            <div className="text-[11px] text-slate-600 mt-1">4 Active Networks</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-start">
              <div className="text-xs font-bold text-slate-500 uppercase">Avg Gateway Latency</div>
              <Activity className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-blue-600 mt-1">48 ms</div>
            <div className="text-[11px] text-slate-600 mt-1">Ultra-Low Latency Routing</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-start">
              <div className="text-xs font-bold text-slate-500 uppercase">Settlement SLA</div>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl font-black text-emerald-600 mt-1">99.999% ONLINE</div>
            <div className="text-[11px] text-slate-600 mt-1">Zero Dropped Packets</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-start">
              <div className="text-xs font-bold text-slate-500 uppercase">Multi-Currency Engine</div>
              <Globe className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">8 Currencies</div>
            <div className="text-[11px] text-slate-600 mt-1">Instant FX Parity</div>
          </div>
        </div>

        {/* Gateway Directory */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Active FinTech Clearing Gateways</h3>
              <p className="text-xs text-slate-500">All external API secrets are strictly sealed inside the Owner-Only Production Vault.</p>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-600 absolute left-3 top-2.5" />
              <input 
                type="text"
                placeholder="Search clearing networks..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs w-64 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockGateways.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.type.toLowerCase().includes(searchQuery.toLowerCase())).map((gw) => (
                <div key={gw.id} className="p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 transition space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-100 text-blue-700 rounded-lg">
                        {gw.type === 'CELLULAR_MOBILE_MONEY' ? <Smartphone className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">{gw.name}</div>
                        <div className="text-[10px] font-mono font-semibold text-slate-500">{gw.type}</div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {gw.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-600 block font-sans">Latency</span>
                      <strong className="text-slate-800">{gw.latency}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-600 block font-sans">Supported Currencies</span>
                      <strong className="text-blue-600">{gw.currency}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-600 block font-sans">Settled Vol</span>
                      <strong className="text-emerald-600">{gw.volume}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FintechView;
