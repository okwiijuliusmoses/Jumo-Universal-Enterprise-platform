import React, { useState } from 'react';
import { SecondarySchoolERPEngine } from '../../../erp/SecondarySchoolERPEngine';
import { BudgetBook, BudgetBookLine } from '../../../erp/types';
import { 
  BookOpen, DollarSign, TrendingUp, CheckCircle, 
  AlertCircle, FileText, Plus, ShieldCheck, Download, Filter
} from 'lucide-react';

interface Props {
  erp: SecondarySchoolERPEngine;
}

export const MasterBudgetBookWorkspace: React.FC<Props> = ({ erp }) => {
  const [budgetBooks] = useState<BudgetBook[]>(erp.getBudgetBooks());
  const [selectedBookId, setSelectedBookId] = useState<string>(budgetBooks[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'LINES' | 'APPROVALS'>('OVERVIEW');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const selectedBook = budgetBooks.find(b => b.id === selectedBookId) || budgetBooks[0];

  const filteredLines = selectedBook?.lines.filter(l => {
    if (categoryFilter === 'ALL') return true;
    return l.expenditureCategory === categoryFilter;
  }) || [];

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen p-6 font-sans">
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Master Budget Book Subsystem</h1>
              <p className="text-sm text-slate-400">Institutional FY 2026 Consolidated Budget, Recurrent/Capital Allocation & Governance Approval</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select 
            value={selectedBookId}
            onChange={(e) => setSelectedBookId(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            {budgetBooks.map(b => (
              <option key={b.id} value={b.id}>{b.title} ({b.version})</option>
            ))}
          </select>
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            Export Budget Book
          </button>
        </div>
      </div>

      {selectedBook && (
        <>
          {/* Executive Key Figures */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4">
              <div className="text-xs text-slate-400 uppercase font-semibold">Total Approved Budget</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">
                UGX {selectedBook.approvedTotal.toLocaleString()}
              </div>
              <div className="text-xs text-emerald-500/80 mt-1 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Status: {selectedBook.status}
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4">
              <div className="text-xs text-slate-400 uppercase font-semibold">Committed (Encumbered)</div>
              <div className="text-2xl font-bold text-amber-400 mt-1">
                UGX {selectedBook.committedAmount.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">Active LPOs & Requisitions</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4">
              <div className="text-xs text-slate-400 uppercase font-semibold">Actual Expenditure</div>
              <div className="text-2xl font-bold text-sky-400 mt-1">
                UGX {selectedBook.spentAmount.toLocaleString()}
              </div>
              <div className="text-xs text-sky-500/80 mt-1">Vouched GL Outflows</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4">
              <div className="text-xs text-slate-400 uppercase font-semibold">Available Uncommitted</div>
              <div className="text-2xl font-bold text-indigo-400 mt-1">
                UGX {selectedBook.availableBalance.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">Free Unencumbered Margin</div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-800 mb-6 gap-6">
            <button
              onClick={() => setActiveTab('OVERVIEW')}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'OVERVIEW' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
            >
              Budget Book Overview
            </button>
            <button
              onClick={() => setActiveTab('LINES')}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'LINES' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
            >
              Detailed Vote Lines ({selectedBook.lines.length})
            </button>
            <button
              onClick={() => setActiveTab('APPROVALS')}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'APPROVALS' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
            >
              Governance Approval Log
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'OVERVIEW' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  Expenditure Category Breakdown
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">Recurrent Expenditure (Personnel & Operations)</span>
                      <span className="font-semibold text-white">UGX {selectedBook.recurrentExpenditure.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: `${(selectedBook.recurrentExpenditure / selectedBook.approvedTotal) * 100}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">Capital & Infrastructure Development</span>
                      <span className="font-semibold text-white">UGX {selectedBook.capitalExpenditure.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-sky-500 h-full" style={{ width: `${(selectedBook.capitalExpenditure / selectedBook.approvedTotal) * 100}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/60 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400">Funding Source:</span>
                    <p className="font-medium text-slate-200 mt-0.5">{selectedBook.fundingSource}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Version State:</span>
                    <p className="font-medium text-emerald-400 mt-0.5">{selectedBook.version}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-400" />
                  Planned Revenue vs Expenditure
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-slate-800/80 rounded-lg">
                    <span className="text-sm text-slate-300">Planned Institutional Revenue</span>
                    <span className="text-base font-bold text-emerald-400">UGX {selectedBook.plannedRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-800/80 rounded-lg">
                    <span className="text-sm text-slate-300">Approved Budget Total</span>
                    <span className="text-base font-bold text-slate-200">UGX {selectedBook.approvedTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-800/80 rounded-lg">
                    <span className="text-sm text-slate-300">Projected Fiscal Reserve</span>
                    <span className="text-base font-bold text-sky-400">UGX {(selectedBook.plannedRevenue - selectedBook.approvedTotal).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Detailed Vote Lines */}
          {activeTab === 'LINES' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-300">Filter Category:</span>
                  <select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-md px-2 py-1"
                  >
                    <option value="ALL">All Categories</option>
                    <option value="RECURRENT_OPERATIONAL">Recurrent Operational</option>
                    <option value="RECURRENT_PERSONNEL">Recurrent Personnel</option>
                    <option value="CAPITAL_DEVELOPMENT">Capital Development</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-800/90 text-xs uppercase text-slate-400 font-semibold border-b border-slate-700">
                    <tr>
                      <th className="px-4 py-3">Vote / Sub-Vote</th>
                      <th className="px-4 py-3">Account Description</th>
                      <th className="px-4 py-3 text-right">Approved Budget</th>
                      <th className="px-4 py-3 text-right">Committed</th>
                      <th className="px-4 py-3 text-right">Actual Spent</th>
                      <th className="px-4 py-3 text-right">Available Margin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-900/50">
                    {filteredLines.map(line => (
                      <tr key={line.id} className="hover:bg-slate-800/40">
                        <td className="px-4 py-3 font-mono text-xs text-emerald-400">{line.voteCode}</td>
                        <td className="px-4 py-3 font-medium text-white">
                          {line.accountName}
                          <div className="text-xs text-slate-400 mt-0.5">{line.justification}</div>
                        </td>
                        <td className="px-4 py-3 text-right font-medium">UGX {line.approvedBudget.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right text-amber-400 font-medium">UGX {line.committedAmount.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right text-sky-400 font-medium">UGX {line.actualExpenditure.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right text-emerald-400 font-bold">UGX {line.availableBalance.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Governance Approval Log */}
          {activeTab === 'APPROVALS' && (
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Board & Executive Governance Sign-Off Trail
              </h3>
              <div className="space-y-4">
                {selectedBook.approvalHistory.map((history, idx) => (
                  <div key={idx} className="p-4 bg-slate-800/80 border border-slate-700/60 rounded-lg flex justify-between items-center">
                    <div>
                      <span className="text-xs font-mono text-emerald-400 uppercase">{history.role}</span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{history.actor}</h4>
                      <p className="text-xs text-slate-300 mt-1">{history.notes}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-full">
                        {history.action}
                      </span>
                      <div className="text-xs text-slate-400 mt-1">{history.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
