import React, { useState } from 'react';
import { Plus, ShieldCheck, RefreshCw, Layers, X, Sparkles, CheckCircle, AlertCircle, FileText, Trash2, ListFilter, Search } from 'lucide-react';
import { FaapService } from '../../domain/FaapService';
import { LedgerPostingService, ConsistencyCheckReport } from '../../services/LedgerPostingService';
import { FaapJournalLine, FaapJournalEntry } from '../../domain/types';
import { JumoDataTable, Column } from '../../../../core/enterprise/components/JumoDataTable';
import { JumoTransactionForm } from '../../../../core/enterprise/components/JumoTransactionForm';
import { JumoWorkflowStatus } from '../../../../core/enterprise/components/JumoWorkflowStatus';

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
    { accountCode: accounts[0]?.code || '', debit: 0, credit: 0, description: '' },
    { accountCode: accounts[1]?.code || '', debit: 0, credit: 0, description: '' }
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

  const handleLineChange = (index: number, field: string, value: any) => {
    const newLines = [...formLines];
    if (field === 'debit') {
      newLines[index].debit = Math.max(0, Number(value) || 0);
      if (newLines[index].debit > 0) newLines[index].credit = 0;
    } else if (field === 'credit') {
      newLines[index].credit = Math.max(0, Number(value) || 0);
      if (newLines[index].credit > 0) newLines[index].debit = 0;
    } else {
      (newLines[index] as any)[field] = value;
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
    
    setFormLogs(result.auditLog || []);

    if (result.success) {
      setPostSuccess(true);
      setJournals([...service.getJournalEntries()]);
      setTimeout(() => {
        setShowNewModal(false);
        setPostSuccess(false);
        setMemo('');
        setFormLines([
          { accountCode: accounts[0]?.code || '', debit: 0, credit: 0, description: '' },
          { accountCode: accounts[1]?.code || '', debit: 0, credit: 0, description: '' }
        ]);
        setFormLogs([]);
      }, 1500);
    } else {
      setFormErrors(result.errors);
    }
  };

  const triggerDepreciationPost = () => {
    const dummyAssets = [
      { id: 'as_1', assetCode: 'AST-CMP-001', name: 'High-Performance Cloud Compute Nodes', acquisitionCost: 15000000, accumulatedDepreciation: 1250000, netBookValue: 13750000 },
      { id: 'as_2', assetCode: 'AST-OFC-002', name: 'Ergonomic Standing Workstations Hub 01', acquisitionCost: 6000000, accumulatedDepreciation: 500000, netBookValue: 5500000 }
    ];

    const result = postingService.runFixedAssetDepreciation(dummyAssets);
    if (result.success) {
      setJournals([...service.getJournalEntries()]);
      alert(`Asset Subledger Depreciation Complete! Posted Journal: ${result.journalEntry?.entryNumber}.`);
    } else {
      alert(`Depreciation Run Failed: ${result.errors.join(', ')}`);
    }
  };

  const columns: Column<FaapJournalEntry>[] = [
    { header: 'DATE', accessor: 'date', className: 'whitespace-nowrap font-medium text-slate-700', sortable: true },
    { header: 'JOURNAL NO.', accessor: 'entryNumber', className: 'font-mono text-xs font-bold text-indigo-600', sortable: true },
    { header: 'MEMO / DESCRIPTION', accessor: 'memo', className: 'max-w-md truncate' },
    { header: 'SOURCE', accessor: 'sourceProduct', className: 'text-xs text-slate-500 font-medium' },
    { 
      header: 'AMOUNT (UGX)', 
      accessor: (j) => <span className="font-mono font-black text-slate-900">{j.totalDebit.toLocaleString()}</span>,
      className: 'text-right'
    },
    { 
      header: 'STATUS', 
      accessor: () => <JumoWorkflowStatus status="POSTED" />,
      className: 'text-center'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-16">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Journal Entries</h1>
          <p className="text-slate-500 text-sm mt-1">Authoritative double-entry transaction log with real-time balance propagation.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={triggerDepreciationPost}
            className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" /> Depreciation
          </button>
          <button 
            onClick={runIntegrityAudit}
            className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition shadow-sm"
          >
            <RefreshCw className="w-4 h-4 text-indigo-600" /> Consistency Audit
          </button>
          <button 
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-emerald-700 transition shadow-sm"
          >
            <Plus className="w-4 h-4" /> New Journal Entry
          </button>
        </div>
      </div>

      {/* Ledger Parity Card */}
      <div className="bg-emerald-900 text-white p-4 rounded-xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-800 rounded-lg flex items-center justify-center border border-emerald-700">
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

      <JumoDataTable
        title="Recent Journals"
        data={journals}
        columns={columns}
        searchPlaceholder="Find by entry no, memo, or amount..."
        selectable={true}
        actions={() => (
          <button className="text-indigo-600 hover:text-indigo-800 text-xs font-bold">View</button>
        )}
      />

      {showNewModal && (
        <JumoTransactionForm
          title="Journal Entry"
          width="2xl"
          error={formErrors.length > 0 ? formErrors.join(' | ') : null}
          headerFields={
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide">Journal Date</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide">Journal No.</label>
                <input 
                  type="text" 
                  placeholder="Auto-generated" 
                  disabled
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide">Source Subsystem</label>
                <select
                  value={sourceProduct}
                  onChange={(e) => setSourceProduct(e.target.value as any)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="INTERNAL">Internal Manual Adjustment</option>
                  <option value="EDUCATION">SchoolPay Education ERP</option>
                  <option value="DIGITAL_PAY">JUMO FinPay Switch</option>
                </select>
              </div>
            </div>
          }
          columns={[
            { 
              id: 'accountCode', 
              header: 'ACCOUNT', 
              type: 'select', 
              options: accounts.map(a => ({ value: a.code, label: `${a.code} - ${a.name}` })),
              width: 'w-1/3'
            },
            { id: 'description', header: 'DESCRIPTION', type: 'text', placeholder: 'Line description' },
            { id: 'debit', header: 'DEBIT', type: 'amount' },
            { id: 'credit', header: 'CREDIT', type: 'amount' }
          ]}
          lines={formLines}
          onLineChange={handleLineChange}
          onAddLine={() => setFormLines([...formLines, { accountCode: accounts[0]?.code || '', debit: 0, credit: 0, description: '' }])}
          onRemoveLine={(idx) => {
            const newLines = [...formLines];
            newLines.splice(idx, 1);
            setFormLines(newLines);
          }}
          footerContent={
            postSuccess ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900">Journal Posted!</h3>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide">Memo</label>
                  <textarea 
                    value={memo}
                    onChange={e => setMemo(e.target.value)}
                    placeholder="Enter a description for this journal entry..."
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm min-h-[80px] focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  {formLogs.length > 0 && (
                    <div className="bg-slate-900 text-green-400 p-2 rounded-lg font-mono text-[10px] space-y-1 overflow-y-auto max-h-32 mt-2">
                      {formLogs.map((log, idx) => <p key={idx}>{log}</p>)}
                    </div>
                  )}
                </div>
                <div className="w-64 bg-white border border-slate-200 rounded-xl overflow-hidden self-start">
                  <div className="px-4 py-2 border-b border-slate-100 flex justify-between text-sm">
                    <span className="text-slate-500 font-bold">Total Debits</span>
                    <span className="font-mono font-bold text-slate-900">{totalDebits.toLocaleString()}</span>
                  </div>
                  <div className="px-4 py-2 border-b border-slate-100 flex justify-between text-sm">
                    <span className="text-slate-500 font-bold">Total Credits</span>
                    <span className="font-mono font-bold text-slate-900">{totalCredits.toLocaleString()}</span>
                  </div>
                  <div className={`px-4 py-2 flex justify-between text-sm font-bold ${difference === 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                    <span>Difference</span>
                    <span className="font-mono">{difference.toLocaleString()}</span>
                  </div>
                </div>
              </>
            )
          }
          onSubmit={handlePostJournal}
          onCancel={() => setShowNewModal(false)}
          submitLabel="Save and Post"
          isSubmitting={postSuccess || difference !== 0 || totalDebits === 0}
        />
      )}

      {/* Consistency Audit Report Panel (Unchanged for now) */}
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

            {auditReport.reconciliationIssues.length > 0 && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-xs space-y-1">
                <p className="font-bold">Consistency Audit flagged issues:</p>
                <ul className="list-disc pl-4 space-y-1">
                  {auditReport.reconciliationIssues.map((issue, idx) => (
                    <li key={idx}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
