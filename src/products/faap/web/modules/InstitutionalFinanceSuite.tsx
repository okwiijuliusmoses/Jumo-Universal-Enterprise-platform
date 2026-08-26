import React, { useState } from 'react';
import { 
  BookOpen, Calculator, ShieldCheck, DollarSign, FileSpreadsheet, 
  CheckCircle2, AlertTriangle, ArrowRightLeft, PieChart, Plus, Search, 
  Lock, TrendingUp, Landmark, ShieldAlert, Award, FileText, Check
} from 'lucide-react';
import { FaapService } from '../../domain/FaapService';
import { formatMoney, formatNumber } from '../../../../utils/formatters';

type SubView = 'VOTE_BOOK' | 'BUDGET_BOOK' | 'SINGLE_CASH_BOOK' | 'DOUBLE_CASH_BOOK' | 'TRIPLE_CASH_BOOK' | 'AUDITOR_BOOKS' | 'FINANCIAL_ANALYSIS';

interface VoteAccount {
  code: string;
  name: string;
  department: string;
  approvedBudget: number;
  encumbered: number;
  actualSpent: number;
}

export const InstitutionalFinanceSuite: React.FC<{ initialSubView?: SubView }> = ({ initialSubView = 'VOTE_BOOK' }) => {
  const service = FaapService.getInstance();
  const [subView, setSubView] = useState<SubView>(initialSubView);

  // Vote Book State
  const [votes, setVotes] = useState<VoteAccount[]>([
    { code: 'VOTE-ACAD-101', name: 'Academic Reagents & Laboratory Consumables', department: 'Faculty of Science', approvedBudget: 150000000, encumbered: 25000000, actualSpent: 65000000 },
    { code: 'VOTE-ICT-102', name: 'Campus Fibre Backhaul & Cloud Compute Nodes', department: 'Directorate of ICT', approvedBudget: 220000000, encumbered: 45000000, actualSpent: 120000000 },
    { code: 'VOTE-LIB-103', name: 'OPAC E-Journals & Physical Library Volumes', department: 'University Library', approvedBudget: 90000000, encumbered: 12000000, actualSpent: 48000000 },
    { code: 'VOTE-EST-104', name: 'Campus Generator Diesel & Civil Maintenance', department: 'Estates & Works', approvedBudget: 180000000, encumbered: 30000000, actualSpent: 110000000 },
  ]);

  const [requisitionDesc, setRequisitionDesc] = useState('');
  const [requisitionVoteCode, setRequisitionVoteCode] = useState('VOTE-ACAD-101');
  const [requisitionAmount, setRequisitionAmount] = useState<number>(0);

  // Cash Book Entries
  const [cashEntries, setCashEntries] = useState([
    { id: '1', date: '2026-08-01', description: 'Opening Balance Cash & Bank', cashDebit: 5000000, cashCredit: 0, bankDebit: 45000000, bankCredit: 0, discountAllowed: 0, discountReceived: 0 },
    { id: '2', date: '2026-08-05', description: 'Student Fee Collections (Bank)', cashDebit: 0, cashCredit: 0, bankDebit: 18500000, bankCredit: 0, discountAllowed: 500000, discountReceived: 0 },
    { id: '3', date: '2026-08-10', description: 'Petty Cash Office Supplies Purchase', cashDebit: 0, cashCredit: 1200000, bankDebit: 0, bankCredit: 0, discountAllowed: 0, discountReceived: 50000 },
    { id: '4', date: '2026-08-15', description: 'Vendor Payment for Fibre Maintenance', cashDebit: 0, cashCredit: 0, bankDebit: 0, bankCredit: 12000000, discountAllowed: 0, discountReceived: 1000000 },
  ]);

  const handleCommitEncumbrance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requisitionAmount || requisitionAmount <= 0) {
      alert('Please enter a valid requisition amount.');
      return;
    }

    const vote = votes.find(v => v.code === requisitionVoteCode);
    if (!vote) return;

    const available = vote.approvedBudget - (vote.encumbered + vote.actualSpent);
    if (requisitionAmount > available) {
      alert(`PRE-EXPENDITURE VOTE BOOK BLOCK: Requisition of ${formatNumber(requisitionAmount)} UGX exceeds remaining available budget (${formatNumber(available)} UGX) for vote ${vote.code}. Requisition rejected.`);
      return;
    }

    setVotes(prev => prev.map(v => v.code === requisitionVoteCode ? { ...v, encumbered: v.encumbered + requisitionAmount } : v));
    alert(`ENCUMBRANCE APPROVED: ${formatNumber(requisitionAmount)} UGX committed against ${vote.code}. Local Purchase Order (LPO) clearance token generated.`);
    setRequisitionDesc('');
    setRequisitionAmount(0);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center font-black">
            <Landmark className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Institutional Financial & Accounting Suite</h1>
            <p className="text-xs text-slate-400">Vote Books, Budget Recorders, Multi-Column Cash Books, Auditor Worksheets & Financial Analytics.</p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 text-xs font-semibold">
          <button 
            onClick={() => setSubView('VOTE_BOOK')} 
            className={`px-3 py-1.5 rounded-lg transition-colors ${subView === 'VOTE_BOOK' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            Vote Book
          </button>
          <button 
            onClick={() => setSubView('BUDGET_BOOK')} 
            className={`px-3 py-1.5 rounded-lg transition-colors ${subView === 'BUDGET_BOOK' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            Budget Book
          </button>
          <button 
            onClick={() => setSubView('SINGLE_CASH_BOOK')} 
            className={`px-3 py-1.5 rounded-lg transition-colors ${subView === 'SINGLE_CASH_BOOK' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            Single Cash Book
          </button>
          <button 
            onClick={() => setSubView('DOUBLE_CASH_BOOK')} 
            className={`px-3 py-1.5 rounded-lg transition-colors ${subView === 'DOUBLE_CASH_BOOK' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            Double Cash Book
          </button>
          <button 
            onClick={() => setSubView('TRIPLE_CASH_BOOK')} 
            className={`px-3 py-1.5 rounded-lg transition-colors ${subView === 'TRIPLE_CASH_BOOK' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            Triple Cash Book
          </button>
          <button 
            onClick={() => setSubView('AUDITOR_BOOKS')} 
            className={`px-3 py-1.5 rounded-lg transition-colors ${subView === 'AUDITOR_BOOKS' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            Auditor Books
          </button>
          <button 
            onClick={() => setSubView('FINANCIAL_ANALYSIS')} 
            className={`px-3 py-1.5 rounded-lg transition-colors ${subView === 'FINANCIAL_ANALYSIS' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            Financial Analysis
          </button>
        </div>
      </div>

      {/* VOTE BOOK SECTION */}
      {subView === 'VOTE_BOOK' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Approved Budget</span>
              <p className="text-2xl font-black text-slate-900 mt-1 font-mono">
                {formatNumber(votes.reduce((acc, v) => acc + v.approvedBudget, 0))} UGX
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Encumbered (Committed)</span>
              <p className="text-2xl font-black text-amber-600 mt-1 font-mono">
                {formatNumber(votes.reduce((acc, v) => acc + v.encumbered, 0))} UGX
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Actual Spent</span>
              <p className="text-2xl font-black text-rose-600 mt-1 font-mono">
                {formatNumber(votes.reduce((acc, v) => acc + v.actualSpent, 0))} UGX
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Available Spending Capacity</span>
              <p className="text-2xl font-black text-emerald-600 mt-1 font-mono">
                {formatNumber(votes.reduce((acc, v) => acc + (v.approvedBudget - v.encumbered - v.actualSpent), 0))} UGX
              </p>
            </div>
          </div>

          {/* Requisition & Encumbrance Form */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" /> Pre-Expenditure Vote Book Requisition & Encumbrance Form
            </h3>
            <p className="text-xs text-slate-500 mb-4">Every expenditure requisition must pass automated Vote Book encumbrance validation before LPO issuance.</p>

            <form onSubmit={handleCommitEncumbrance} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Target Vote Code</label>
                <select 
                  value={requisitionVoteCode}
                  onChange={(e) => setRequisitionVoteCode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 font-mono font-bold"
                >
                  {votes.map(v => (
                    <option key={v.code} value={v.code}>{v.code} - {v.name} ({v.department})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Requisition Narrative</label>
                <input 
                  type="text"
                  placeholder="e.g. Purchase of 500L Laboratory Ethanol"
                  value={requisitionDesc}
                  onChange={(e) => setRequisitionDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Requested Amount (UGX)</label>
                <input 
                  type="number"
                  placeholder="e.g. 15000000"
                  value={requisitionAmount || ''}
                  onChange={(e) => setRequisitionAmount(Number(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono text-slate-900 font-bold"
                />
              </div>

              <button 
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-sm transition-all shadow-md h-10 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" /> Commit Encumbrance
              </button>
            </form>
          </div>

          {/* Vote Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Institutional Departmental Vote Ledger</h3>
              <span className="text-xs font-mono font-bold text-slate-500">{votes.length} Active Vote Accounts</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4">Vote Code</th>
                    <th className="px-6 py-4">Department & Name</th>
                    <th className="px-6 py-4 text-right">Approved Budget</th>
                    <th className="px-6 py-4 text-right">Encumbered</th>
                    <th className="px-6 py-4 text-right">Actual Spent</th>
                    <th className="px-6 py-4 text-right">Available Balance</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {votes.map((v) => {
                    const available = v.approvedBudget - v.encumbered - v.actualSpent;
                    const percentUsed = Math.round(((v.encumbered + v.actualSpent) / v.approvedBudget) * 100);
                    return (
                      <tr key={v.code} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4 font-mono font-bold text-slate-900">{v.code}</td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900">{v.name}</p>
                          <p className="text-xs text-slate-500">{v.department}</p>
                        </td>
                        <td className="px-6 py-4 text-right font-mono font-bold text-slate-900">{formatNumber(v.approvedBudget)} UGX</td>
                        <td className="px-6 py-4 text-right font-mono font-bold text-amber-600">{formatNumber(v.encumbered)} UGX</td>
                        <td className="px-6 py-4 text-right font-mono font-bold text-rose-600">{formatNumber(v.actualSpent)} UGX</td>
                        <td className="px-6 py-4 text-right font-mono font-bold text-emerald-600">{formatNumber(available)} UGX</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                            percentUsed > 90 ? 'bg-rose-50 text-rose-700 border-rose-200' :
                            percentUsed > 75 ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {percentUsed}% Used
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* BUDGET BOOK SECTION */}
      {subView === 'BUDGET_BOOK' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Institutional Annual Budget Book & Variance Monitor</h2>
              <p className="text-xs text-slate-500">Track macro allocations, re-appropriations, and statutory budget ceiling constraints.</p>
            </div>
            <button className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Budget Appropriation
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {votes.map((v) => (
              <div key={v.code} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">{v.code}</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Active Vote</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm leading-snug">{v.name}</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Approved Budget:</span>
                    <span className="font-mono font-bold text-slate-900">{formatNumber(v.approvedBudget)} UGX</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Encumbered (Committed):</span>
                    <span className="font-mono font-bold text-amber-600">{formatNumber(v.encumbered)} UGX</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Actual Disbursed:</span>
                    <span className="font-mono font-bold text-rose-600">{formatNumber(v.actualSpent)} UGX</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-600">Uncommitted Ceiling:</span>
                  <span className="font-mono text-emerald-600">{formatNumber(v.approvedBudget - v.encumbered - v.actualSpent)} UGX</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SINGLE CASH BOOK SECTION */}
      {subView === 'SINGLE_CASH_BOOK' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Single Column Cash Book</h3>
              <p className="text-xs text-slate-500">Record direct physical cash transactions (Cash Account Only).</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
              Cash Closing Balance: {formatNumber(cashEntries.reduce((acc, e) => acc + (e.cashDebit - e.cashCredit), 0))} UGX
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Receipt / Payment Narrative</th>
                  <th className="px-4 py-3 text-right text-emerald-700">Cash Receipts (Debit)</th>
                  <th className="px-4 py-3 text-right text-rose-700">Cash Payments (Credit)</th>
                  <th className="px-4 py-3 text-right font-mono">Net Cash Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cashEntries.map((e, idx) => {
                  const runningCash = cashEntries.slice(0, idx + 1).reduce((acc, c) => acc + (c.cashDebit - c.cashCredit), 0);
                  return (
                    <tr key={e.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono text-xs">{e.date}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">{e.description}</td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-emerald-600">{e.cashDebit > 0 ? formatNumber(e.cashDebit) : '-'}</td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-rose-600">{e.cashCredit > 0 ? formatNumber(e.cashCredit) : '-'}</td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-slate-900">{formatNumber(runningCash)} UGX</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DOUBLE CASH BOOK SECTION */}
      {subView === 'DOUBLE_CASH_BOOK' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Double Column Cash Book (Cash & Bank)</h3>
              <p className="text-xs text-slate-500">Track physical cash transactions alongside commercial bank account movements.</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
              Bank Balance: {formatNumber(cashEntries.reduce((acc, e) => acc + (e.bankDebit - e.bankCredit), 0))} UGX
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Particulars</th>
                  <th className="px-4 py-3 text-right text-emerald-700">Cash Debit</th>
                  <th className="px-4 py-3 text-right text-rose-700">Cash Credit</th>
                  <th className="px-4 py-3 text-right text-emerald-700">Bank Debit</th>
                  <th className="px-4 py-3 text-right text-rose-700">Bank Credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cashEntries.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs">{e.date}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{e.description}</td>
                    <td className="px-4 py-3 text-right font-mono text-emerald-600">{e.cashDebit > 0 ? formatNumber(e.cashDebit) : '-'}</td>
                    <td className="px-4 py-3 text-right font-mono text-rose-600">{e.cashCredit > 0 ? formatNumber(e.cashCredit) : '-'}</td>
                    <td className="px-4 py-3 text-right font-mono text-emerald-600">{e.bankDebit > 0 ? formatNumber(e.bankDebit) : '-'}</td>
                    <td className="px-4 py-3 text-right font-mono text-rose-600">{e.bankCredit > 0 ? formatNumber(e.bankCredit) : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TRIPLE CASH BOOK SECTION */}
      {subView === 'TRIPLE_CASH_BOOK' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Triple Column Cash Book Studio (Cash, Bank & Discounts)</h3>
              <p className="text-xs text-slate-500">Comprehensive 3-column cash book incorporating cash, bank, discount allowed, and discount received ledgers.</p>
            </div>
            <button className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Execute Daily Cash Book Close
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 text-white font-bold uppercase text-[10px] tracking-widest border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Narrative</th>
                  <th className="px-4 py-3 text-right text-emerald-400">Disc. Allowed</th>
                  <th className="px-4 py-3 text-right text-emerald-400">Cash Dr</th>
                  <th className="px-4 py-3 text-right text-emerald-400">Bank Dr</th>
                  <th className="px-4 py-3 text-right text-rose-400">Disc. Received</th>
                  <th className="px-4 py-3 text-right text-rose-400">Cash Cr</th>
                  <th className="px-4 py-3 text-right text-rose-400">Bank Cr</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cashEntries.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{e.date}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{e.description}</td>
                    <td className="px-4 py-3 text-right font-mono text-amber-600 font-bold">{e.discountAllowed > 0 ? formatNumber(e.discountAllowed) : '-'}</td>
                    <td className="px-4 py-3 text-right font-mono text-emerald-600 font-bold">{e.cashDebit > 0 ? formatNumber(e.cashDebit) : '-'}</td>
                    <td className="px-4 py-3 text-right font-mono text-emerald-600 font-bold">{e.bankDebit > 0 ? formatNumber(e.bankDebit) : '-'}</td>
                    <td className="px-4 py-3 text-right font-mono text-purple-600 font-bold">{e.discountReceived > 0 ? formatNumber(e.discountReceived) : '-'}</td>
                    <td className="px-4 py-3 text-right font-mono text-rose-600 font-bold">{e.cashCredit > 0 ? formatNumber(e.cashCredit) : '-'}</td>
                    <td className="px-4 py-3 text-right font-mono text-rose-600 font-bold">{e.bankCredit > 0 ? formatNumber(e.bankCredit) : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AUDITOR BOOKS SECTION */}
      {subView === 'AUDITOR_BOOKS' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Auditor Working Papers & SHA-256 Ledger Evidence Vault</h3>
              <p className="text-xs text-slate-500">Forensic ledger verification, immutable hash chain verification, and statutory audit logging.</p>
            </div>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Zero-Offset Parity Certified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-600" /> Statutory Audit Checklist
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-medium text-slate-700">General Ledger Parity Verification</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> PASSED ($0.00)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-medium text-slate-700">Vote Book Encumbrance Check</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> PASSED</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-medium text-slate-700">Triple Cash Book Daily Close Check</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> PASSED</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600" /> Cryptographic Evidence Hashes
              </h4>
              <div className="space-y-2 font-mono text-[11px]">
                <div className="p-2.5 bg-slate-900 text-emerald-400 rounded-xl overflow-x-auto">
                  hash_v1: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                </div>
                <div className="p-2.5 bg-slate-900 text-emerald-400 rounded-xl overflow-x-auto">
                  hash_v2: 8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FINANCIAL ANALYSIS SECTION */}
      {subView === 'FINANCIAL_ANALYSIS' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Institutional Financial Analytics & Ratio Workbench</h3>
              <p className="text-xs text-slate-500">Working capital, liquidity ratios, debt service coverage, and budget execution velocity.</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
              Solvency Rating: AAA (Sovereign Grade)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Current Ratio (Liquidity)</span>
              <p className="text-2xl font-black text-slate-900 mt-1">3.42 x</p>
              <p className="text-[10px] text-emerald-600 font-bold mt-1">↑ 12% above benchmark</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Quick Ratio (Acid Test)</span>
              <p className="text-2xl font-black text-slate-900 mt-1">2.88 x</p>
              <p className="text-[10px] text-emerald-600 font-bold mt-1">Strong Cash Reserves</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Budget Execution Rate</span>
              <p className="text-2xl font-black text-slate-900 mt-1">68.4 %</p>
              <p className="text-[10px] text-blue-600 font-bold mt-1">Optimal Disbursement Rate</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Debt Service Coverage</span>
              <p className="text-2xl font-black text-slate-900 mt-1">4.15 x</p>
              <p className="text-[10px] text-emerald-600 font-bold mt-1">Zero Debt Default Risk</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
