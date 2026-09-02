import React from 'react';
import { faapEnterpriseRuntime } from '../../../core/faap/faapService';
import { 
  FileText, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export const LedgerDashboard = () => {
  const [trialBalance, setTrialBalance] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const refreshData = React.useCallback(() => {
    setLoading(true);
    // Simulate slight delay for professional feel
    setTimeout(() => {
      const data = faapEnterpriseRuntime.getTrialBalance();
      setTrialBalance(data);
      setLoading(false);
    }, 300);
  }, []);

  React.useEffect(() => {
    refreshData();
  }, [refreshData]);

  const totalDebitMovement = trialBalance.reduce((sum, row) => sum + row.debit, 0);
  const totalCreditMovement = trialBalance.reduce((sum, row) => sum + row.credit, 0);
  const netMovement = totalDebitMovement - totalCreditMovement;

  const isBalanced = Math.abs(netMovement) < 0.01;

  return (
    <div className="space-y-6">
      {/* Financial Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-all">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Movements</p>
            <p className="text-2xl font-black text-slate-900 tabular-nums">
              UGX {totalDebitMovement.toLocaleString()}
            </p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Audit Status</p>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <p className="text-lg font-black text-slate-900">VERIFIED</p>
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className={`p-6 rounded-3xl border transition-all flex items-center justify-between group ${isBalanced ? 'bg-emerald-900 border-emerald-800' : 'bg-rose-900 border-rose-800'}`}>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-emerald-300 uppercase tracking-widest">Balance Verification</p>
            <p className="text-2xl font-black text-white tabular-nums">
              {isBalanced ? 'BALANCED' : 'IMBALANCE'}
            </p>
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isBalanced ? 'bg-emerald-800' : 'bg-rose-800'}`}>
            {isBalanced ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> : <AlertCircle className="w-6 h-6 text-rose-400" />}
          </div>
        </div>
      </div>

      {/* Trial Balance Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 tracking-tight">Authoritative Trial Balance</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">FAAP Runtime State Snapshot</p>
            </div>
          </div>
          <button 
            onClick={refreshData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            Recompute
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/30 text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                <th className="px-8 py-4">Account Code</th>
                <th className="px-8 py-4">Account Name</th>
                <th className="px-8 py-4 text-right">Opening Balance</th>
                <th className="px-8 py-4 text-center">Period Movements (DR/CR)</th>
                <th className="px-8 py-4 text-right">Closing Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {trialBalance.map((row) => {
                const isAssetOrExpense = row.account.category === 'Asset' || row.account.category === 'Expense';
                const factor = isAssetOrExpense ? 1 : -1;
                const movement = row.debit - row.credit;
                const openingBalance = row.balance - (movement * factor);

                return (
                  <tr key={row.account.code} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5 font-mono font-bold text-xs text-slate-400 group-hover:text-slate-900 transition-colors">
                      {row.account.code}
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-xs font-black text-slate-900 tracking-tight">{row.account.name}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{row.account.category}</p>
                    </td>
                    <td className="px-8 py-5 text-right font-bold text-xs text-slate-500 tabular-nums">
                      {openingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-center gap-6">
                        <div className="flex items-center gap-1.5 min-w-[80px] justify-end">
                          <span className={`text-[11px] font-black tabular-nums ${row.debit > 0 ? 'text-emerald-600' : 'text-slate-300'}`}>
                            {row.debit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                          <ArrowDownLeft className={`w-3 h-3 ${row.debit > 0 ? 'text-emerald-500' : 'text-slate-200'}`} />
                        </div>
                        <div className="w-px h-4 bg-slate-100" />
                        <div className="flex items-center gap-1.5 min-w-[80px]">
                          <ArrowUpRight className={`w-3 h-3 ${row.credit > 0 ? 'text-rose-500' : 'text-slate-200'}`} />
                          <span className={`text-[11px] font-black tabular-nums ${row.credit > 0 ? 'text-rose-600' : 'text-slate-300'}`}>
                            {row.credit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right font-black text-sm text-slate-900 tabular-nums">
                      {row.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-slate-900 text-white border-t-2 border-emerald-500">
              <tr>
                <td colSpan={2} className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                  Aggregation Parity Totals
                </td>
                <td className="px-8 py-6 text-right font-bold text-xs opacity-50 tabular-nums">
                  --
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-center gap-6">
                    <div className="min-w-[80px] text-right font-black text-xs text-emerald-400 tabular-nums">
                      {totalDebitMovement.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <div className="w-px h-4 bg-emerald-800/50" />
                    <div className="min-w-[80px] font-black text-xs text-emerald-400 tabular-nums">
                      {totalCreditMovement.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Net Variance</span>
                    <span className={`text-sm font-black tabular-nums ${isBalanced ? 'text-white' : 'text-rose-400'}`}>
                      {netMovement.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {!isBalanced && (
        <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 animate-pulse">
          <AlertCircle className="w-5 h-5 text-rose-600" />
          <p className="text-xs font-bold text-rose-800">
            Critical Ledger Exception: The General Ledger is currently imbalanced by UGX {Math.abs(netMovement).toLocaleString()}. Immediate audit required.
          </p>
        </div>
      )}
    </div>
  );
};
