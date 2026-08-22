import React, { useState } from 'react';
import { 
  CheckCircle, Plus, Search, ShieldCheck, AlertCircle, RefreshCw, 
  Trash2, Landmark, CheckCircle2, ArrowDownCircle, ArrowUpCircle, X 
} from 'lucide-react';
import { FaapService } from '../../domain/FaapService';
import { FaapBankFeedTransaction } from '../../domain/types';

export const BankingModule: React.FC = () => {
  const service = FaapService.getInstance();
  const [feeds, setFeeds] = useState<FaapBankFeedTransaction[]>(service.getBankFeedTransactions());
  const [accounts] = useState(service.getChartOfAccounts());

  // Modal State
  const [showImportModal, setShowImportModal] = useState(false);
  const [showReconcileModal, setShowReconcileModal] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState<FaapBankFeedTransaction | null>(null);

  // Form State - Import
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Form State - Reconcile
  const [offsetAccount, setOffsetAccount] = useState('4010'); // Default sales revenue

  const handleImportTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Description is required.');
      return;
    }

    try {
      service.importBankFeed({
        date,
        description,
        amount
      });
      setFeeds(service.getBankFeedTransactions());
      setShowImportModal(false);
      setDescription('');
      setAmount(0);
      alert('External transaction imported into Bank Feeds subledger successfully!');
    } catch (err: any) {
      alert(`Import failed: ${err.message}`);
    }
  };

  const handleReconcile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFeed) return;

    try {
      service.reconcileBankFeed(selectedFeed.id, offsetAccount);
      setFeeds(service.getBankFeedTransactions());
      setShowReconcileModal(false);
      setSelectedFeed(null);
      alert('Transaction reconciled and cleared successfully! General Ledger double-entry lines posted.');
    } catch (err: any) {
      alert(`Reconciliation failed: ${err.message}`);
    }
  };

  const openReconcile = (feed: FaapBankFeedTransaction) => {
    setSelectedFeed(feed);
    // Suggest expense account for negative feeds, revenue for positive feeds
    setOffsetAccount(feed.amount > 0 ? '4010' : '6010');
    setShowReconcileModal(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Bank Feeds & Reconciliation</h1>
          <p className="text-slate-500 text-sm">Synchronize external statements, verify physical cash flows, and clear general ledger mismatches.</p>
        </div>
        <button 
          onClick={() => setShowImportModal(true)}
          className="flex items-center gap-2 bg-[#1e293b] hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Import Bank Entry
        </button>
      </div>

      {/* Bank Status card */}
      <div className="bg-[#0f172a] text-white p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
            <Landmark className="w-6 h-6 text-slate-300" />
          </div>
          <div>
            <h3 className="font-bold text-base">JUMO Sovereign Clearing Bank</h3>
            <p className="text-xs text-slate-400 font-mono">Routing Account: 442-9901-X (UGX)</p>
          </div>
        </div>
        <div className="text-left md:text-right">
          <p className="text-sm text-slate-400">Total Book Balance</p>
          <p className="text-2xl font-black font-mono text-emerald-400">
            {accounts.find(a => a.code === '1010')?.balance.toLocaleString()} UGX
          </p>
        </div>
      </div>

      {/* Bank Feed Grid */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Statement Feed Inbox</h3>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold">
              {feeds.filter(f => f.status === 'UNRECONCILED').length} Unreconciled
            </span>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold">
              {feeds.filter(f => f.status === 'MATCHED').length} Reconciled
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Transaction Date</th>
                <th className="px-6 py-4">Bank Statement Description</th>
                <th className="px-6 py-4 text-right">Amount (UGX)</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {feeds.map((feed) => (
                <tr key={feed.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs text-slate-500 font-mono">{feed.date}</td>
                  <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-2">
                    {feed.amount > 0 ? (
                      <ArrowDownCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <ArrowUpCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                    {feed.description}
                  </td>
                  <td className={`px-6 py-4 text-right font-mono font-bold ${feed.amount > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {feed.amount > 0 ? `+${feed.amount.toLocaleString()}` : feed.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                      feed.status === 'MATCHED'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
                    }`}>
                      {feed.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {feed.status === 'UNRECONCILED' ? (
                      <button 
                        onClick={() => openReconcile(feed)}
                        className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                      >
                        Reconcile Match
                      </button>
                    ) : (
                      <div className="flex items-center justify-center gap-1 text-xs text-emerald-600 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Matched
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Import Transaction Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <h3 className="font-bold text-base">Import External Bank Transaction</h3>
              <button onClick={() => setShowImportModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleImportTransaction} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Date of statement transaction</label>
                <input 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Transaction description / narrative</label>
                <input 
                  type="text"
                  placeholder="e.g. CHEQUE DEP #90823"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Amount (Use negative for outflows) (UGX)</label>
                <input 
                  type="number"
                  placeholder="e.g. -25000"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowImportModal(false)}
                  className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800"
                >
                  Import Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reconcile Modal */}
      {showReconcileModal && selectedFeed && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <h3 className="font-bold text-base">Select Offsetting Ledger Account</h3>
              <button onClick={() => setShowReconcileModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReconcile} className="p-6 space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Statement Line</p>
                <p className="text-sm font-bold text-slate-900">{selectedFeed.description}</p>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="text-xs text-slate-500">Value to Reconcile</span>
                  <span className={`text-xs font-bold font-mono ${selectedFeed.amount > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {selectedFeed.amount.toLocaleString()} UGX
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Offsetting General Ledger Account</label>
                <select 
                  value={offsetAccount} 
                  onChange={(e) => setOffsetAccount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {accounts.filter(a => a.code !== '1010').map(acc => (
                    <option key={acc.code} value={acc.code}>
                      {acc.code} - {acc.name} ({acc.type} • Balance: {acc.balance.toLocaleString()} UGX)
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-400 mt-1.5">
                  Reconciliation automatically debits/credits Cash at Bank (1010) and posts the balancing entry to this selected ledger.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowReconcileModal(false)}
                  className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Post Reconciliation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
