import React, { useState } from 'react';
import { Plus, Download, RefreshCw, Upload } from 'lucide-react';
import { FaapService } from '../../domain/FaapService';
import { LedgerPostingService } from '../../services/LedgerPostingService';
import { JumoDataTable, Column } from '../../../../core/enterprise/components/JumoDataTable';
import { JumoTransactionForm } from '../../../../core/enterprise/components/JumoTransactionForm';
import { JumoWorkflowStatus } from '../../../../core/enterprise/components/JumoWorkflowStatus';
import { formatNumber } from '../../../../utils/formatters';

export const BankingModule: React.FC = () => {
  const service = FaapService.getInstance();
  const postingService = LedgerPostingService.getInstance();

  const [accounts] = useState(service.getChartOfAccounts().filter(a => a.type === 'ASSET' && a.subType === 'CASH'));
  const [activeAccount, setActiveAccount] = useState(accounts[0]?.code || '');
  
  // Create dummy bank feeds for the active account
  const [bankFeeds, setBankFeeds] = useState<any[]>([
    { id: '1', date: '2026-08-20', description: 'WIRE TRANSFER IN', amount: 5000000, type: 'DEPOSIT', status: 'UNRECONCILED' },
    { id: '2', date: '2026-08-21', description: 'VENDOR PAYMENT - MTN', amount: -250000, type: 'WITHDRAWAL', status: 'UNRECONCILED' },
    { id: '3', date: '2026-08-22', description: 'POS DEPOSIT REF 990', amount: 1250000, type: 'DEPOSIT', status: 'RECONCILED' },
  ]);

  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showReconcileModal, setShowReconcileModal] = useState(false);
  
  // Transfer state
  const [transferFrom, setTransferFrom] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState<number>(0);
  const [transferMemo, setTransferMemo] = useState('');
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors([]);

    if (!transferFrom) return setFormErrors(['Source account is required.']);
    if (!transferTo) return setFormErrors(['Destination account is required.']);
    if (transferFrom === transferTo) return setFormErrors(['Accounts must be different.']);
    if (transferAmount <= 0) return setFormErrors(['Amount must be greater than 0.']);

    const result = postingService.postJournalWithValidation({
      memo: transferMemo || 'Internal Bank Transfer',
      date: new Date().toISOString().split('T')[0],
      sourceProduct: 'INTERNAL',
      lines: [
        { accountCode: transferFrom, credit: transferAmount, debit: 0, description: 'Transfer Out' },
        { accountCode: transferTo, debit: transferAmount, credit: 0, description: 'Transfer In' }
      ]
    });

    if (result.success) {
      setShowTransferModal(false);
      setTransferAmount(0);
      setTransferMemo('');
    } else {
      setFormErrors(result.errors);
    }
  };

  const columns: Column<any>[] = [
    { header: 'DATE', accessor: 'date', className: 'text-xs text-slate-600', sortable: true },
    { header: 'DESCRIPTION', accessor: 'description', className: 'font-medium text-slate-900', sortable: true },
    { 
      header: 'AMOUNT', 
      accessor: (f) => <span className={`font-mono font-bold ${f.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>{formatNumber(Math.abs(f.amount))}</span>,
      className: 'text-right'
    },
    { 
      header: 'STATUS', 
      accessor: (f) => <JumoWorkflowStatus status={f.status} />,
      className: 'text-center'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Banking & Reconciliations</h1>
          <p className="text-slate-500 text-sm mt-1">Manage bank accounts, feeds, deposits, transfers, and reconcile statements.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowTransferModal(true)}
            className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition shadow-sm"
          >
            <RefreshCw className="w-4 h-4 text-indigo-600" /> Transfer Funds
          </button>
          <button 
            onClick={() => setShowReconcileModal(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700 transition shadow-sm"
          >
            <Upload className="w-4 h-4" /> Reconcile
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
        {accounts.map(acc => (
          <button
            key={acc.code}
            onClick={() => setActiveAccount(acc.code)}
            className={`flex-none p-4 rounded-xl border ${activeAccount === acc.code ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50' : 'border-slate-200 bg-white shadow-sm'} text-left min-w-[240px] transition`}
          >
            <p className="text-xs font-bold text-slate-500">{acc.code}</p>
            <p className="text-sm font-bold text-slate-900 truncate">{acc.name}</p>
            <p className="text-xl font-black font-mono text-indigo-600 mt-2">{formatNumber(acc.balance)} UGX</p>
          </button>
        ))}
      </div>

      <JumoDataTable
        title="Bank Feeds & Transactions"
        data={bankFeeds}
        columns={columns}
        searchPlaceholder="Find transactions..."
        selectable={true}
        emptyStateMessage="No bank transactions found."
        actions={(feed) => (
          <div className="flex items-center justify-end gap-2">
            {feed.status === 'UNRECONCILED' && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setBankFeeds(feeds => feeds.map(f => f.id === feed.id ? {...f, status: 'RECONCILED'} : f));
                }}
                className="text-indigo-600 hover:text-indigo-800 text-xs font-bold bg-indigo-50 px-2 py-1 rounded"
              >
                Match / Add
              </button>
            )}
          </div>
        )}
      />

      {showTransferModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Transfer Funds</h3>
            </div>
            <form onSubmit={handleTransfer} className="p-5 space-y-4">
              {formErrors.length > 0 && (
                <div className="bg-rose-50 text-rose-700 p-2 rounded text-xs font-bold">
                  {formErrors[0]}
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Transfer From</label>
                <select 
                  value={transferFrom} 
                  onChange={(e) => setTransferFrom(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">Select Account...</option>
                  {accounts.map(acc => (
                    <option key={acc.code} value={acc.code}>{acc.code} - {acc.name} ({formatNumber(acc.balance)} UGX)</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Transfer To</label>
                <select 
                  value={transferTo} 
                  onChange={(e) => setTransferTo(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">Select Account...</option>
                  {accounts.map(acc => (
                    <option key={acc.code} value={acc.code}>{acc.code} - {acc.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Amount</label>
                <input 
                  type="number"
                  value={transferAmount || ''}
                  onChange={(e) => setTransferAmount(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Memo</label>
                <input 
                  type="text"
                  value={transferMemo}
                  onChange={(e) => setTransferMemo(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Optional description"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowTransferModal(false)} className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Cancel</button>
                <button type="submit" className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Record Transfer</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {showReconcileModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Reconcile Account</h3>
            </div>
            <div className="p-8 flex flex-col items-center text-center space-y-4">
               <Upload className="w-12 h-12 text-indigo-200" />
               <p className="text-slate-600 font-medium">Upload your bank statement (CSV, OFX) to automatically reconcile transactions.</p>
               <button onClick={() => setShowReconcileModal(false)} className="px-5 py-2 bg-indigo-600 text-white font-bold text-xs rounded-lg hover:bg-indigo-700 mt-4">
                 Select File
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
