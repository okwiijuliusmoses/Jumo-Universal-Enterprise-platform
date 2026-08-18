import React, { useState } from 'react';
import { SecondarySchoolERPEngine } from '../../../erp/SecondarySchoolERPEngine';
import { VoteLedgerEntry } from '../../../erp/types';
import { 
  Lock, CheckCircle, AlertTriangle, Plus, FileSpreadsheet, Send, DollarSign
} from 'lucide-react';

interface Props {
  erp: SecondarySchoolERPEngine;
}

export const VoteLedgerWorkspace: React.FC<Props> = ({ erp }) => {
  const [entries, setEntries] = useState<VoteLedgerEntry[]>(erp.getVoteLedgerEntries());
  const [selectedVoteCode, setSelectedVoteCode] = useState<string>(entries[0]?.voteCode || '');
  const [showCommitmentModal, setShowCommitmentModal] = useState<boolean>(false);

  // Form states for encumbrance
  const [commitmentAmount, setCommitmentAmount] = useState<number>(5000000);
  const [commitmentDesc, setCommitmentDesc] = useState<string>('LPO Requisition for Chemistry Chemicals');
  const [commitmentVoucher, setCommitmentVoucher] = useState<string>(`PO-2026-${Math.floor(100 + Math.random() * 900)}`);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const selectedVote = entries.find(e => e.voteCode === selectedVoteCode) || entries[0];

  const handleRecordCommitment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      erp.recordVoteCommitment(selectedVoteCode, commitmentAmount, commitmentDesc, commitmentVoucher, 'STF-PROC-01');
      setEntries(erp.getVoteLedgerEntries());
      setShowCommitmentModal(false);
      setCommitmentDesc('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to record commitment encumbrance.');
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen p-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Institutional Vote Book Ledger</h1>
              <p className="text-sm text-slate-400">Vote-level Expenditure Control, Requisition Commitments & Available Margin Verification</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setShowCommitmentModal(true)}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Encumber Vote Commitment (LPO)
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vote Cards List */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Approved Institutional Votes</h2>
          {entries.map(vote => (
            <div 
              key={vote.id}
              onClick={() => setSelectedVoteCode(vote.voteCode)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${vote.voteCode === selectedVoteCode ? 'bg-slate-800 border-amber-500/80 shadow-lg' : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80'}`}
            >
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold rounded-md">
                  {vote.voteCode}
                </span>
                <span className="text-xs text-slate-400">{vote.directorate}</span>
              </div>
              <h3 className="text-base font-bold text-white mt-2">{vote.voteName}</h3>
              
              <div className="mt-4 pt-3 border-t border-slate-700/60 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400">Allocation:</span>
                  <div className="font-medium text-slate-200">UGX {vote.approvedAllocation.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-slate-400">Available Balance:</span>
                  <div className="font-bold text-emerald-400">UGX {vote.availableBalance.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Vote Ledger Audit Activity */}
        <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700/60 rounded-xl p-5">
          {selectedVote ? (
            <div>
              <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-700/60">
                <div>
                  <div className="text-xs text-amber-400 font-mono font-bold uppercase">{selectedVote.voteCode} — {selectedVote.costCentre}</div>
                  <h2 className="text-xl font-bold text-white mt-0.5">{selectedVote.voteName}</h2>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Unencumbered Available</span>
                  <div className="text-xl font-extrabold text-emerald-400">UGX {selectedVote.availableBalance.toLocaleString()}</div>
                </div>
              </div>

              {/* Vote Formula Summary */}
              <div className="grid grid-cols-4 gap-3 mb-6 bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl text-center text-xs">
                <div>
                  <span className="text-slate-400 block">Approved Allocation</span>
                  <span className="text-sm font-bold text-white mt-1 block">UGX {selectedVote.approvedAllocation.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">− Encumbered Commitments</span>
                  <span className="text-sm font-bold text-amber-400 mt-1 block">UGX {selectedVote.commitments.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">− Actual Expenditure</span>
                  <span className="text-sm font-bold text-sky-400 mt-1 block">UGX {selectedVote.actualExpenditure.toLocaleString()}</span>
                </div>
                <div className="border-l border-slate-700 pl-2">
                  <span className="text-slate-400 block">= Available Margin</span>
                  <span className="text-sm font-extrabold text-emerald-400 mt-1 block">UGX {selectedVote.availableBalance.toLocaleString()}</span>
                </div>
              </div>

              {/* Transaction Register */}
              <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                Vote Ledger Transactions ({selectedVote.transactions.length})
              </h3>

              <div className="overflow-x-auto border border-slate-700/60 rounded-lg">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-800 text-slate-400 font-semibold border-b border-slate-700">
                    <tr>
                      <th className="px-3 py-2">Date / Voucher</th>
                      <th className="px-3 py-2">Transaction Details</th>
                      <th className="px-3 py-2">Type</th>
                      <th className="px-3 py-2 text-right">Amount</th>
                      <th className="px-3 py-2 text-right">Running Available</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                    {selectedVote.transactions.map(tx => (
                      <tr key={tx.id} className="hover:bg-slate-800/40">
                        <td className="px-3 py-2 font-mono">
                          <div className="text-white">{tx.voucherNo}</div>
                          <div className="text-[10px] text-slate-400">{tx.date}</div>
                        </td>
                        <td className="px-3 py-2">
                          <div className="font-medium text-slate-200">{tx.description}</div>
                          <div className="text-[10px] text-slate-400">By: {tx.performedBy}</div>
                        </td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${tx.transactionType === 'APPROVED_ALLOCATION' ? 'bg-emerald-500/10 text-emerald-400' : tx.transactionType === 'PURCHASE_COMMITMENT' ? 'bg-amber-500/10 text-amber-400' : 'bg-sky-500/10 text-sky-400'}`}>
                            {tx.transactionType}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-right font-medium text-white">UGX {tx.amount.toLocaleString()}</td>
                        <td className="px-3 py-2 text-right font-bold text-emerald-400">UGX {tx.availableBalanceAfter.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">Select a vote from the ledger list to view audit trail.</div>
          )}
        </div>
      </div>

      {/* Encumbrance Modal */}
      {showCommitmentModal && selectedVote && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Encumber Vote Commitment</h3>
            <p className="text-xs text-slate-400 mb-4">Book LPO Requisition against Vote <span className="font-mono text-amber-400 font-bold">{selectedVote.voteCode}</span></p>

            {errorMsg && (
              <div className="p-3 mb-4 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleRecordCommitment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Available Vote Balance</label>
                <input 
                  type="text" 
                  disabled 
                  value={`UGX ${selectedVote.availableBalance.toLocaleString()}`} 
                  className="w-full bg-slate-800 border border-slate-700 text-emerald-400 text-sm font-bold rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Requisition Amount (UGX)</label>
                <input 
                  type="number" 
                  required
                  value={commitmentAmount}
                  onChange={(e) => setCommitmentAmount(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">LPO / Requisition Voucher No.</label>
                <input 
                  type="text" 
                  required
                  value={commitmentVoucher}
                  onChange={(e) => setCommitmentVoucher(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Commitment Purpose & Item Details</label>
                <textarea 
                  required
                  rows={3}
                  value={commitmentDesc}
                  onChange={(e) => setCommitmentDesc(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCommitmentModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Confirm Encumbrance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
