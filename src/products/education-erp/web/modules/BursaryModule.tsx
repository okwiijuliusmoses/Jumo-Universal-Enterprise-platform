import React, { useState } from 'react';
import { 
  Landmark, Briefcase, FileText, ArrowUpRight, ArrowDownRight, 
  Search, Plus, AlertTriangle, CheckCircle, X, CreditCard, Layers 
} from 'lucide-react';
import { EducationErpService } from '../../domain/EducationErpService';

export const BursaryModule: React.FC = () => {
  const service = EducationErpService.getInstance();
  const [activeTab, setActiveTab] = useState<'VOTEBOOK' | 'TUITION'>('VOTEBOOK');

  // Subscriptions
  const [commitments, setCommitments] = useState(service.getVoteBookCommitments());
  const [invoices, setInvoices] = useState(service.getInvoices());
  const [receipts, setReceipts] = useState(service.getReceipts());

  // Vote Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedVote, setSelectedVote] = useState('V-RES-01');
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const [requisitionMemo, setRequisitionMemo] = useState('');
  const [errorBlock, setErrorBlock] = useState('');

  // Payment Modal State
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState('');
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentChannel, setPaymentChannel] = useState('SchoolPay / Mobile Money');

  const handleCommit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorBlock('');

    if (expenseAmount <= 0) {
      setErrorBlock('Requisition cost must be greater than 0 UGX.');
      return;
    }
    if (!requisitionMemo.trim()) {
      setErrorBlock('Expenditure description/memo is required.');
      return;
    }

    try {
      service.commitVoteExpenditure(selectedVote, expenseAmount, requisitionMemo.trim());
      setCommitments(service.getVoteBookCommitments());
      setShowAddModal(false);
      setExpenseAmount(0);
      setRequisitionMemo('');
      alert('Sovereign vote book commitment verified! Funds allocated and universal ledger updated in JUMO FAAP.');
    } catch (err: any) {
      setErrorBlock(err.message || 'Error occurred while committing funds.');
    }
  };

  const handleReceivePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentAmount <= 0) return alert('Payment must be positive.');
    try {
      service.postDirectPayment(selectedInvoiceId, paymentAmount, paymentChannel);
      setInvoices(service.getInvoices());
      setReceipts(service.getReceipts());
      setShowPayModal(false);
      setPaymentAmount(0);
      alert('Tuition payment registered successfully. Cashbooks and General Ledgers synchronized in FAAP.');
    } catch (err: any) {
      alert(err.message || 'Error executing student receipting.');
    }
  };

  const totalAllocated = commitments.reduce((sum, v) => sum + v.allocatedAmount, 0);
  const totalUtilized = commitments.reduce((sum, v) => sum + v.committedAmount, 0);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Bursary, Tuition & Vote Book Office</h1>
          <p className="text-slate-500 text-sm">Financial resource allocation, vote book commitments, and student tuition collections.</p>
        </div>
        {activeTab === 'VOTEBOOK' ? (
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#064e3b] text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-emerald-800 transition-all"
          >
            <Plus className="w-4 h-4" />
            Commit Vote Funds
          </button>
        ) : (
          <button 
            onClick={() => {
              if (invoices.length > 0) {
                setSelectedInvoiceId(invoices[0].id);
              }
              setShowPayModal(true);
            }}
            className="flex items-center gap-2 bg-[#064e3b] text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-emerald-800 transition-all"
          >
            <CreditCard className="w-4 h-4" />
            Post Student Payment
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => setActiveTab('VOTEBOOK')}
          className={`pb-3 pt-1 text-xs font-bold border-b-2 uppercase tracking-wider transition-all ${
            activeTab === 'VOTEBOOK' 
              ? 'border-[#064e3b] text-[#064e3b]' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Vote Book Ledger
        </button>
        <button
          onClick={() => setActiveTab('TUITION')}
          className={`pb-3 pt-1 text-xs font-bold border-b-2 uppercase tracking-wider transition-all ${
            activeTab === 'TUITION' 
              ? 'border-[#064e3b] text-[#064e3b]' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Tuition & Receipts
        </button>
      </div>

      {activeTab === 'VOTEBOOK' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Budgetary Allocation', value: `${totalAllocated.toLocaleString()} UGX`, icon: Landmark, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Utilized Funds (YTD)', value: `${totalUtilized.toLocaleString()} UGX`, icon: ArrowUpRight, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Active Vote Heads', value: commitments.length.toString(), icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Control status', value: 'ACTIVE', icon: Briefcase, color: 'text-[#064e3b]', bg: 'bg-emerald-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                 <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                    <stat.icon className="w-5 h-5" />
                 </div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                 <p className="text-lg font-black text-slate-900 mt-1 font-mono">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Vote Commitments Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Vote Book Commitment Ledger</h3>
              <span className="text-xs text-slate-400 font-semibold">{commitments.length} Vote Heads active</span>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Vote Code</th>
                  <th className="px-6 py-4">Department / Purpose</th>
                  <th className="px-6 py-4 text-right">Budget Allocation</th>
                  <th className="px-6 py-4 text-right">Committed Expenditures</th>
                  <th className="px-6 py-4 text-right">Available Balance</th>
                  <th className="px-6 py-4 text-center">Overdraft Gating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {commitments.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-[11px] font-black text-emerald-800">{v.voteCode}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{v.voteName}</td>
                    <td className="px-6 py-4 text-right font-mono text-xs text-slate-600">{v.allocatedAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-mono text-xs text-rose-600">({v.committedAmount.toLocaleString()})</td>
                    <td className={`px-6 py-4 text-right font-mono text-xs font-black ${v.balance < 5000000 ? 'text-rose-600 animate-pulse' : 'text-emerald-700'}`}>
                      {v.balance.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        v.balance < 5000000 
                          ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {v.balance < 5000000 ? 'EXHAUSTING' : 'SECURE'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'TUITION' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Outstanding tuition invoices */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm">Tuition Billing & Student Accounts</h3>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Invoice #</th>
                  <th className="px-6 py-4">Student Profile</th>
                  <th className="px-6 py-4 text-right">Total Owed</th>
                  <th className="px-6 py-4 text-right">Paid To Date</th>
                  <th className="px-6 py-4 text-center">Billing Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {invoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-emerald-800 font-bold">{inv.invoiceNumber}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-slate-900">{inv.studentName}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">{inv.termOrSemester}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-slate-900">{inv.amount.toLocaleString()} UGX</td>
                    <td className="px-6 py-4 text-right font-mono text-emerald-600">{inv.paidAmount.toLocaleString()} UGX</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                        inv.status === 'PAID' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        inv.status === 'PARTIALLY_PAID' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Receipts audit trail */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              Receipts Journal Log
            </h3>
            <div className="space-y-3 max-h-[380px] overflow-y-auto">
              {receipts.map(rec => {
                const inv = invoices.find(i => i.id === rec.invoiceId);
                return (
                  <div key={rec.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-100/50 px-1.5 py-0.5 rounded">{rec.receiptNumber}</span>
                      <span className="text-[10px] text-slate-400 font-bold">{rec.paymentDate}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 mt-2">{rec.amountPaid.toLocaleString()} UGX</p>
                    <p className="text-[11px] text-slate-500 mt-1">Student: {inv ? inv.studentName : 'Unknown'}</p>
                    <p className="text-[10px] text-slate-400 italic mt-1 font-mono">{rec.channel}</p>
                  </div>
                );
              })}
              {receipts.length === 0 && (
                <p className="text-xs text-slate-400 italic text-center py-6">No receipt logs collected today.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Commit expenditure modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Authorize Vote Book Expenditure</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCommit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Select Budget Vote Head</label>
                <select 
                  value={selectedVote}
                  onChange={(e) => setSelectedVote(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {commitments.map(c => (
                    <option key={c.id} value={c.voteCode}>
                      {c.voteCode} - {c.voteName} (Avail: {c.balance.toLocaleString()} UGX)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Expenditure Description / Memo</label>
                <input 
                  type="text"
                  placeholder="e.g. Lab Chemicals and Glassware procurement"
                  value={requisitionMemo}
                  onChange={(e) => setRequisitionMemo(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Required Allocation Amount (UGX)</label>
                <input 
                  type="number"
                  placeholder="0"
                  value={expenseAmount || ''}
                  onChange={(e) => setExpenseAmount(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono text-slate-900 focus:outline-none"
                />
              </div>

              {errorBlock && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3.5 rounded-xl text-xs flex items-start gap-2.5 animate-bounce">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold uppercase tracking-tight">Overdraft Refused</p>
                    <p className="font-medium">{errorBlock}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddModal(false)} className="bg-white border px-4 py-2 rounded-xl text-xs font-bold">Cancel</button>
                <button type="submit" className="bg-[#064e3b] text-white px-4 py-2 rounded-xl text-xs font-bold">Authorize Commitment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student payment modal */}
      {showPayModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Direct Tuition Cashbook Receipting</h3>
              <button onClick={() => setShowPayModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleReceivePayment} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Select Student Tuition Bill Invoice</label>
                <select 
                  value={selectedInvoiceId}
                  onChange={(e) => setSelectedInvoiceId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none"
                >
                  {invoices.map(i => (
                    <option key={i.id} value={i.id}>
                      {i.invoiceNumber} - {i.studentName} (Owed: {i.amount.toLocaleString()} UGX)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Payment Amount (UGX)</label>
                  <input 
                    type="number"
                    value={paymentAmount || ''}
                    onChange={(e) => setPaymentAmount(Math.max(0, Number(e.target.value) || 0))}
                    placeholder="e.g. 500000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Collection Channel</label>
                  <select 
                    value={paymentChannel}
                    onChange={(e) => setPaymentChannel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                  >
                    <option value="SchoolPay / Mobile Money">SchoolPay MTN/Airtel MM</option>
                    <option value="Direct Bank Clearing Swift">Direct Bank clearing</option>
                    <option value="Physical POS Card Terminal">Physical POS Sabi Card</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowPayModal(false)} className="bg-white border px-4 py-2 rounded-xl text-xs font-bold">Cancel</button>
                <button type="submit" className="bg-[#064e3b] text-white px-4 py-2 rounded-xl text-xs font-bold">Verify & Post Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
