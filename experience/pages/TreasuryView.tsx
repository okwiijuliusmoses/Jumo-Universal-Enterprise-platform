/**
 * Interactive Treasury Management & Liquidity Console (/treasury)
 */

import React, { useState, useEffect } from 'react';
import { DollarSign, RefreshCw, PlusCircle, ArrowUpRight, TrendingUp, ShieldCheck, Activity } from 'lucide-react';
import { apiService } from '../services/api';

export const TreasuryView: React.FC = () => {
  const [pools, setPools] = useState<any[]>([]);
  const [ledger, setLedger] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [injectAmount, setInjectAmount] = useState<number>(5000000);
  const [selectedPoolId, setSelectedPoolId] = useState<string>('pool_us_east_01');
  const [message, setMessage] = useState<string | null>(null);

  const fetchTreasuryData = async () => {
    setLoading(true);
    try {
      const [pRes, lRes] = await Promise.all([
        apiService.getTreasuryPools(),
        apiService.getTreasuryLedger(),
      ]);

      if (pRes.status === 'SUCCESS') setPools(pRes.pools || []);
      if (lRes.status === 'SUCCESS') setLedger(lRes.ledger || []);
    } catch (err: any) {
      console.error('Failed to load treasury data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreasuryData();
  }, []);

  const handleInject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiService.injectLiquidity(selectedPoolId, injectAmount);
      if (res.status === 'SUCCESS') {
        setMessage(`Successfully injected $${injectAmount.toLocaleString()} USD into ${selectedPoolId}`);
        fetchTreasuryData();
      }
    } catch (err: any) {
      setMessage(`Injection Failed: ${err.message}`);
    }
  };

  const handleRebalance = async (poolId: string) => {
    try {
      const res = await apiService.rebalancePool(poolId);
      if (res.status === 'SUCCESS') {
        setMessage(`Rebalance initiated for pool ${poolId}`);
        fetchTreasuryData();
      }
    } catch (err: any) {
      setMessage(`Rebalance Failed: ${err.message}`);
    }
  };

  const totalCapacity = pools.reduce((acc, p) => acc + (p.totalCapacityUSD || 0), 0);
  const totalAllocated = pools.reduce((acc, p) => acc + (p.allocatedAmountUSD || 0), 0);
  const totalAvailable = pools.reduce((acc, p) => acc + (p.availableAmountUSD || 0), 0);

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Global Treasury & Capital Allocation</h2>
          <p className="text-xs text-slate-600 font-mono">
            Multi-Currency Liquidity Pools & Settlement Ledger
          </p>
        </div>
        <button
          onClick={fetchTreasuryData}
          className="flex items-center space-x-2 px-3 py-2 bg-white border border-slate-200 hover:border-slate-200 text-slate-700 text-xs font-mono rounded-lg transition-colors w-fit"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Sync Liquidity</span>
        </button>
      </div>

      {message && (
        <div className="p-3 bg-blue-500/10 border border-blue-500/30 text-[#0078D4] text-xs font-mono rounded-lg flex items-center justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage(null)} className="text-[#0078D4] hover:text-white text-sm font-bold">
            ×
          </button>
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-white/60 border border-slate-200 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-600">
            <span>Total Capital Reserve</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white tracking-tight">
            ${totalCapacity.toLocaleString()} USD
          </div>
          <div className="text-[11px] text-emerald-400 font-mono flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>Multi-Region Enterprise Reserves</span>
          </div>
        </div>

        <div className="p-5 bg-white/60 border border-slate-200 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-600">
            <span>Active Tenant Drawdowns</span>
            <ArrowUpRight className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-extrabold text-sky-400 tracking-tight">
            ${totalAllocated.toLocaleString()} USD
          </div>
          <div className="text-[11px] text-slate-600 font-mono">
            {((totalAllocated / (totalCapacity || 1)) * 100).toFixed(1)}% Capital Utilization
          </div>
        </div>

        <div className="p-5 bg-white/60 border border-slate-200 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-600">
            <span>Available Unallocated Liquidity</span>
            <ShieldCheck className="w-4 h-4 text-[#0078D4]" />
          </div>
          <div className="text-2xl font-extrabold text-[#0078D4] tracking-tight">
            ${totalAvailable.toLocaleString()} USD
          </div>
          <div className="text-[11px] text-emerald-400 font-mono">Ready for FAAP Instant Settlement</div>
        </div>
      </div>

      {/* Treasury Pools Table & Injection Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pool Table */}
        <div className="lg:col-span-2 p-6 bg-white/60 border border-slate-200 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Activity className="w-4 h-4 text-[#0078D4]" />
              <span>Multi-Currency Treasury Pools</span>
            </h3>
            <span className="text-xs font-mono text-slate-600">{pools.length} Pools Active</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600">
                  <th className="py-3 px-3">Pool ID</th>
                  <th className="py-3 px-3">Currency</th>
                  <th className="py-3 px-3">Capacity (USD)</th>
                  <th className="py-3 px-3">Allocated</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-700">
                {pools.map((p) => (
                  <tr key={p.poolId} className="hover:bg-white/30 transition-colors">
                    <td className="py-3 px-3 text-white font-bold">{p.poolId}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 bg-white text-[#0078D4] rounded text-[10px]">
                        {p.currency}
                      </span>
                    </td>
                    <td className="py-3 px-3">${p.totalCapacityUSD.toLocaleString()}</td>
                    <td className="py-3 px-3">${p.allocatedAmountUSD.toLocaleString()}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] ${
                          p.status === 'ACTIVE'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-200'
                            : 'bg-blue-500/10 text-[#0078D4] border border-blue-500/30'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleRebalance(p.poolId)}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-200 text-[11px] rounded transition-colors"
                      >
                        Rebalance
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inject Capital Form */}
        <div className="p-6 bg-white/60 border border-slate-200 rounded-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Inject Liquidity Capital</span>
          </h3>
          <p className="text-xs text-slate-600">
            Expand treasury capacity by executing an authoritative capital injection.
          </p>

          <form onSubmit={handleInject} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-slate-600 mb-1">Select Target Pool</label>
              <select
                value={selectedPoolId}
                onChange={(e) => setSelectedPoolId(e.target.value)}
                className="w-full bg-white border border-slate-200 text-white p-2.5 rounded-lg focus:outline-none focus:border-blue-500"
              >
                {pools.map((p) => (
                  <option key={p.poolId} value={p.poolId}>
                    {p.poolId} ({p.currency})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-600 mb-1">Injection Amount (USD)</label>
              <input
                type="number"
                value={injectAmount}
                onChange={(e) => setInjectAmount(Number(e.target.value))}
                step="100000"
                min="100000"
                className="w-full bg-white border border-slate-200 text-white p-2.5 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Execute Capital Injection</span>
            </button>
          </form>
        </div>
      </div>

      {/* Transaction Ledger */}
      <div className="p-6 bg-white/60 border border-slate-200 rounded-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-sky-400" />
          <span>Settlement Ledger History</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="py-3 px-3">Tx Ref</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Pool</th>
                <th className="py-3 px-3">Tenant ID</th>
                <th className="py-3 px-3">Amount (USD)</th>
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-700">
              {ledger.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/30 transition-colors">
                  <td className="py-3 px-3 text-white">{tx.reference || tx.id}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        tx.type === 'DRAWDOWN'
                          ? 'bg-sky-500/10 text-sky-400'
                          : tx.type === 'INJECTION'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-white text-slate-700'
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3 px-3">{tx.poolId}</td>
                  <td className="py-3 px-3 text-[#0078D4]">{tx.tenantId || 'SYSTEM'}</td>
                  <td className="py-3 px-3 font-bold text-white">${tx.amountUSD?.toLocaleString()}</td>
                  <td className="py-3 px-3 text-slate-600">{new Date(tx.timestamp).toLocaleString()}</td>
                  <td className="py-3 px-3 text-right">
                    <span className="text-emerald-400">{tx.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
