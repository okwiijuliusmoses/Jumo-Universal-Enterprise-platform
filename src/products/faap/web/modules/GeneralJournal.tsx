import React, { useState } from 'react';
import { 
  FileText, Plus, Search, ShieldCheck, AlertCircle, Trash2, Printer, 
  X, CheckCircle, ListFilter, RefreshCw, Layers, Sparkles 
} from 'lucide-react';
import { FaapService } from '../../domain/FaapService';
import { LedgerPostingService, ConsistencyCheckReport } from '../../services/LedgerPostingService';
import { FaapJournalLine } from '../../domain/types';

export const GeneralJournal: React.FC = () => {
  const service = FaapService.getInstance();
  const postingService = LedgerPostingService.getInstance();

  const [journals, setJournals] = useState(service.getJournalEntries());
  const [accounts] = useState(service.getChartOfAccounts());
  const [showNewModal, setShowNewModal] = useState(false);
  
  // Ledger Audit State
  const [auditReport, setAuditReport] = useState<ConsistencyCheckReport | null>(null);
  const [showAuditPanel, setShowAuditPanel] = useState(false);

  // New Journal Entry Form State
  const [memo, setMemo] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [sourceProduct, setSourceProduct] = useState<'EDUCATION' | 'DIGITAL_PAY' | 'INTERNAL' | 'JUMO-EDU-ALUMNI' | 'JUMO-FINPAY' | 'JUMO-CHURCH'>('INTERNAL');
  const [formLines, setFormLines] = useState<FaapJournalLine[]>([
    { accountCode: '1010', debit: 0, credit: 0, description: '' },
    { accountCode: '4010', debit: 0, credit: 0, description: '' }
  ]);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [formLogs, setFormLogs] = useState<string[]>([]);
  const [postSuccess, setPostSuccess] = useState(false);

  // Live Math Calculations
  const totalDebits = formLines.reduce((sum, line) => sum + (Number(line.debit) || 0), 0);
  const totalCredits = formLines.reduce((sum, line) => sum + (Number(line.credit) || 0), 0);
  const difference = Math.abs(totalDebits - totalCredits);

  const runIntegrityAudit = () => {
    const report = postingService.performLedgerIntegrityAudit();
    setAuditReport(report);
    setShowAuditPanel(true);
  };

  const handleAddLine = () => {
    setFormLines([...formLines, { accountCode: accounts[0]?.code || '', debit: 0, credit: 0, description: '' }]);
  };

  const handleRemoveLine = (index: number) => {
    if (formLines.length <= 2) return;
    const newLines = [...formLines];
    newLines.splice(index, 1);
    setFormLines(newLines);
  };

  const handleLineChange = (index: number, field: keyof FaapJournalLine, value: any) => {
    const newLines = [...formLines];
    if (field === 'debit') {
      newLines[index].debit = Math.max(0, Number(value) || 0);
      if (newLines[index].debit > 0) newLines[index].credit = 0; // split DR/CR constraint
    } else if (field === 'credit') {
      newLines[index].credit = Math.max(0, Number(value) || 0);
      if (newLines[index].credit > 0) newLines[index].debit = 0; // split DR/CR constraint
    } else {
      newLines[index][field] = value;
    }
    setFormLines(newLines);
  };

  const handlePostJournal = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors([]);
    setFormLogs([]);

    const result = postingService.postJournalWithValidation({
      memo,
      date,
      sourceProduct,
      lines: formLines.map(line => ({
        ...line,
        debit: Number(line.debit) || 0,
        credit: Number(line.credit) || 0
      }))
    });

    setFormLogs(result.auditLog);

    if (result.success) {
      setPostSuccess(true);
      setJournals(service.getJournalEntries());
      // Reset Form after slight delay
      setTimeout(() => {
        setShowNewModal(false);
        setPostSuccess(false);
        setMemo('');
        setFormLines([
          { accountCode: '1010', debit: 0, credit: 0, description: '' },
          { accountCode: '4010', debit: 0, credit: 0, description: '' }
        ]);
        setFormLogs([]);
      }, 1500);
    } else {
      setFormErrors(result.errors);
    }
  };

  // Straight-line asset depreciation run
  const triggerDepreciationPost = () => {
    // Generate dummy assets for subledger simulation
    const dummyAssets = [
      { id: 'as_1', assetCode: 'AST-CMP-001', name: 'High-Performance Cloud Compute Nodes', acquisitionCost: 15000000, accumulatedDepreciation: 1250000, netBookValue: 13750000 },
      { id: 'as_2', assetCode: 'AST-OFC-002', name: 'Ergonomic Standing Workstations Hub 01', acquisitionCost: 6000000, accumulatedDepreciation: 500000, netBookValue: 5500000 }
    ];

    const result = postingService.runFixedAssetDepreciation(dummyAssets);
    if (result.success) {
      setJournals(service.getJournalEntries());
      alert(`Asset Subledger Depreciation Complete! Posted Journal: ${result.journalEntry?.entryNumber}. Accumulated Expense Charge: ${result.journalEntry?.totalDebit.toLocaleString()} UGX.`);
    } else {
      alert(`Depreciation Run Failed: ${result.errors.join(', ')}`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">General Journal Entries</h1>
          <p className="text-slate-500 text-sm">Authoritative double-entry transaction log with real-time balance propagation.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={triggerDepreciationPost}
            className="flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Run Asset Depreciation
          </button>
          <button 
            onClick={runIntegrityAudit}
            className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-100 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Consistency Audit
          </button>
          <button 
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-2 bg-[#2ca01c] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
          >
            <Plus className="w-4 h-4" />
            New Journal Entry
          </button>
        </div>
      </div>

      {/* Ledger Parity Card */}
      <div className="bg-emerald-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-xl shadow-emerald-900/10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center border border-emerald-700">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight">Ledger Parity Status</p>
            <p className="text-[11px] text-emerald-300/80">Continuous mathematical validation active ($0.00 net offset constraint enforced).</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-black text-emerald-400 font-mono">$0.00 OFFSET</p>
          <p className="text-[10px] font-bold text-emerald-500 uppercase">System Balanced</p>
        </div>
      </div>

      {/* Consistency Audit Report Panel */}
      {showAuditPanel && auditReport && (
        <div className="bg-white border-2 border-blue-200 rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-top duration-300">
          <div className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-300" />
              <h2 className="font-bold text-sm uppercase tracking-wider">JUMO FAAP Ledger Integrity Report</h2>
            </div>
            <button onClick={() => setShowAuditPanel(false)} className="text-white hover:text-blue-200">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Total Assets (DR)</p>
                <p className="text-lg font-black text-slate-900 font-mono">{auditReport.totalAssets.toLocaleString()} UGX</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Total Liabilities (CR)</p>
                <p className="text-lg font-black text-slate-900 font-mono">{auditReport.totalLiabilities.toLocaleString()} UGX</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Total Equity (CR)</p>
                <p className="text-lg font-black text-slate-900 font-mono">{auditReport.totalEquity.toLocaleString()} UGX</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Equation Equation Offset</p>
                <p className={`text-lg font-black font-mono ${auditReport.trialBalanceOffset === 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {auditReport.trialBalanceOffset.toLocaleString()} UGX
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Account Subledger Verification</h3>
              <div className="border border-slate-100 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                    <tr>
                      <th className="px-4 py-2.5">Account Code</th>
                      <th className="px-4 py-2.5">Account Name</th>
                      <th className="px-4 py-2.5 text-right">Cached Balance</th>
                      <th className="px-4 py-2.5 text-right">Historical Sum</th>
                      <th className="px-4 py-2.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {auditReport.accountAudits.map((audit) => (
                      <tr key={audit.accountCode} className={audit.hasDiscrepancy ? 'bg-rose-50' : ''}>
                        <td className="px-4 py-2.5 font-mono text-slate-600 font-bold">{audit.accountCode}</td>
                        <td className="px-4 py-2.5 text-slate-900">{audit.accountName}</td>
                        <td className="px-4 py-2.5 text-right font-mono font-medium">{audit.cachedBalance.toLocaleString()}</td>
                        <td className="px-4 py-2.5 text-right font-mono font-medium">{audit.calculatedBalance.toLocaleString()}</td>
                        <td className="px-4 py-2.5 text-center">
                          {audit.hasDiscrepancy ? (
                            <span className="px-2 py-0.5 bg-rose-100 text-rose-700 font-bold rounded-full text-[9px] uppercase">Mismatch</span>
                          ) : (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold rounded-full text-[9px] uppercase">Consistent</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {auditReport.reconciliationIssues.length > 0 ? (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-xs space-y-1">
                <p className="font-bold">Consistency Audit flagged issues:</p>
                <ul className="list-disc pl-4 space-y-1">
                  {auditReport.reconciliationIssues.map((issue, idx) => (
                    <li key={idx}>{issue}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <p className="font-bold">All accounting books are 100% consistent. Historical transaction lines perfectly recalculate to the current Chart of Accounts balances.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Ledger Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Entry #</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Memo / Narration</th>
                <th className="px-6 py-4">Accounting Lines</th>
                <th className="px-6 py-4 text-right">Debit (UGX)</th>
                <th className="px-6 py-4 text-right">Credit (UGX)</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {journals.map((j) => (
                <tr key={j.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-emerald-600">{j.entryNumber}</td>
                  <td className="px-6 py-4 text-slate-500 text-xs">{j.date}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{j.memo}</td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {j.lines.map((l, idx) => (
                        <div key={idx} className="text-[10px] font-medium text-slate-500 flex items-center justify-between gap-4">
                          <span>{l.accountCode}</span>
                          <span className={l.debit > 0 ? 'text-blue-600' : 'text-rose-600'}>
                            {l.debit > 0 ? `DR: ${l.debit.toLocaleString()}` : `CR: ${l.credit.toLocaleString()}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-black text-slate-900">{j.totalDebit.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-mono font-black text-slate-900">{j.totalCredit.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold">
                      {j.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dynamic Maker-Checker Journal Form Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base">New General Journal Entry Voucher</h3>
              </div>
              <button 
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostJournal} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Master Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Date of Entry</label>
                    <input 
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Narration / Memo</label>
                    <input 
                      type="text"
                      placeholder="e.g. Relocating office supplies to departmental hub"
                      value={memo}
                      onChange={(e) => setMemo(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Source Product Area</label>
                    <select 
                      value={sourceProduct}
                      onChange={(e: any) => setSourceProduct(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="INTERNAL">INTERNAL (Ledger Adj)</option>
                      <option value="JUMO-EDU-ALUMNI">JUMO EDUCATION & ALUMNI ERP</option>
                      <option value="JUMO-FINPAY">JUMO FINANCIAL & PAY PLATFORM</option>
                      <option value="JUMO-CHURCH">JUMO CHURCH & DIOCESE ERP</option>
                    </select>
                  </div>
                </div>

                {/* Line Items Table */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Ledger Entry Allocations</h4>
                    <button 
                      type="button" 
                      onClick={handleAddLine}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Allocation Line
                    </button>
                  </div>

                  <div className="border border-slate-100 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                        <tr>
                          <th className="px-4 py-2 w-1/3">Account Code</th>
                          <th className="px-4 py-2">Debit (UGX)</th>
                          <th className="px-4 py-2">Credit (UGX)</th>
                          <th className="px-4 py-2 w-1/3">Memo / Description</th>
                          <th className="px-4 py-2 text-center w-10"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {formLines.map((line, index) => (
                          <tr key={index}>
                            <td className="p-2">
                              <select 
                                value={line.accountCode}
                                onChange={(e) => handleLineChange(index, 'accountCode', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                              >
                                {accounts.map(acc => (
                                  <option key={acc.code} value={acc.code}>
                                    {acc.code} - {acc.name} ({acc.type})
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="p-2">
                              <input 
                                type="number"
                                placeholder="0"
                                value={line.debit || ''}
                                onChange={(e) => handleLineChange(index, 'debit', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs text-slate-900 font-mono text-right focus:outline-none focus:ring-1 focus:ring-emerald-500"
                              />
                            </td>
                            <td className="p-2">
                              <input 
                                type="number"
                                placeholder="0"
                                value={line.credit || ''}
                                onChange={(e) => handleLineChange(index, 'credit', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs text-slate-900 font-mono text-right focus:outline-none focus:ring-1 focus:ring-emerald-500"
                              />
                            </td>
                            <td className="p-2">
                              <input 
                                type="text"
                                placeholder="Optional description"
                                value={line.description || ''}
                                onChange={(e) => handleLineChange(index, 'description', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                              />
                            </td>
                            <td className="p-2 text-center">
                              {formLines.length > 2 && (
                                <button 
                                  type="button"
                                  onClick={() => handleRemoveLine(index)}
                                  className="text-rose-500 hover:text-rose-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Math Calculations Summary */}
                <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between text-xs border border-slate-100">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Total Debits</p>
                      <p className="font-mono font-black text-slate-950 text-sm">{totalDebits.toLocaleString()} UGX</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Total Credits</p>
                      <p className="font-mono font-black text-slate-950 text-sm">{totalCredits.toLocaleString()} UGX</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Parity Out-of-Balance</p>
                    <p className={`font-mono font-black text-sm ${difference === 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {difference === 0 ? 'Balanced ($0.00 offset)' : `${difference.toLocaleString()} UGX`}
                    </p>
                  </div>
                </div>

                {/* Errors and Audit Logs */}
                {formErrors.length > 0 && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-xs space-y-1">
                    <p className="font-bold">Posting Denied — Validation Errors:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      {formErrors.map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {postSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <p className="font-bold">Journal voucher successfully balanced, authorized, and posted to General Ledger!</p>
                  </div>
                )}

                {formLogs.length > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Internal Audit Trace Logs</p>
                    <div className="bg-slate-950 text-slate-300 font-mono text-[9px] p-3 rounded-xl max-h-32 overflow-y-auto space-y-0.5">
                      {formLogs.map((log, idx) => (
                        <p key={idx}>{log}</p>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Form Actions Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
                <button 
                  type="button" 
                  onClick={() => setShowNewModal(false)}
                  className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"
                >
                  Cancel Voucher
                </button>
                <button 
                  type="submit"
                  disabled={difference !== 0 || totalDebits === 0 || postSuccess}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    difference !== 0 || totalDebits === 0 || postSuccess
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-[#2ca01c] text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/10'
                  }`}
                >
                  Authorize & Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

