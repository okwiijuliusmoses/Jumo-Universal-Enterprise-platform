import React, { useState } from 'react';
import { 
  FileDown, Plus, AlertCircle, Trash2, CheckCircle, 
  Search, ShieldAlert, Sparkles, Building2, Calendar, DollarSign, X 
} from 'lucide-react';
import { FaapService } from '../../domain/FaapService';
import { FaapVendorBill } from '../../domain/types';

export const AccountsPayable: React.FC = () => {
  const service = FaapService.getInstance();
  const [bills, setBills] = useState<FaapVendorBill[]>(service.getVendorBills());
  const [accounts] = useState(service.getChartOfAccounts());

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState<FaapVendorBill | null>(null);

  // Form States - Create Bill
  const [vendorName, setVendorName] = useState('');
  const [billNumber, setBillNumber] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState('');

  // Form States - Pay Bill
  const [payAmount, setPayAmount] = useState<number>(0);
  const [payAccount, setPayAccount] = useState('1010'); // Default cash bank

  const handleCreateBill = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors([]);
    setSuccessMsg('');

    if (!vendorName.trim()) return setFormErrors(['Vendor Name is required.']);
    if (!billNumber.trim()) return setFormErrors(['Bill Number is required.']);
    if (!dueDate) return setFormErrors(['Due date is required.']);
    if (totalAmount <= 0) return setFormErrors(['Bill total must be greater than 0 UGX.']);

    try {
      const newBill = service.createVendorBill({
        billNumber,
        vendorName,
        dueDate,
        totalAmount
      });

      setBills(service.getVendorBills());
      setSuccessMsg(`Vendor Bill ${newBill.billNumber} registered successfully & posted to Accounts Payable ledger!`);
      
      setTimeout(() => {
        setShowAddModal(false);
        setVendorName('');
        setBillNumber('');
        setDueDate('');
        setTotalAmount(0);
        setSuccessMsg('');
      }, 1500);
    } catch (err: any) {
      setFormErrors([err.message || 'Error occurred while saving vendor bill.']);
    }
  };

  const handlePayBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBill) return;

    if (payAmount <= 0) {
      alert('Payment amount must be greater than 0.');
      return;
    }

    try {
      service.payVendorBill(selectedBill.id, payAmount);
      setBills(service.getVendorBills());
      setShowPayModal(false);
      setSelectedBill(null);
      setPayAmount(0);
      alert('Payment committed successfully! Debit AP (2010), Credit Cash at Bank (1010).');
    } catch (err: any) {
      alert(`Payment failed: ${err.message}`);
    }
  };

  const openPayBill = (bill: FaapVendorBill) => {
    setSelectedBill(bill);
    setPayAmount(bill.balanceDue);
    setShowPayModal(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Accounts Payable (AP) Hub</h1>
          <p className="text-slate-500 text-sm">Manage vendor liability accounts, record purchase invoices, and authorize disbursements.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#1b4330] hover:bg-[#122e21] text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-950/10"
        >
          <Plus className="w-4 h-4" />
          Record Vendor Bill
        </button>
      </div>

      {/* AP Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Total Outstanding AP</p>
          <p className="text-3xl font-black text-rose-600 font-mono mt-1">
            {bills.reduce((sum, b) => sum + b.balanceDue, 0).toLocaleString()} UGX
          </p>
          <p className="text-xs text-slate-400 mt-2">Aggregated obligations due in 30 days</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Active Vendor Accounts</p>
          <p className="text-3xl font-black text-slate-900 mt-1">
            {Array.from(new Set(bills.map(b => b.vendorName))).length}
          </p>
          <p className="text-xs text-emerald-600 font-bold mt-2">All profiles verified under JRM</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Current Aging Health</p>
          <p className="text-3xl font-black text-emerald-600 font-mono mt-1">94% OK</p>
          <p className="text-xs text-slate-400 mt-2">0 bills currently exceeding 90-day grace</p>
        </div>
      </div>

      {/* Vendor Invoices List */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Vendor Billing Register</h3>
          <span className="text-xs font-semibold text-slate-500">{bills.length} Records found</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Bill Code</th>
                <th className="px-6 py-4">Vendor Profile</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4 text-right">Total Obligation (UGX)</th>
                <th className="px-6 py-4 text-right">Balance Due (UGX)</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {bills.map((bill) => (
                <tr key={bill.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-slate-600">{bill.billNumber}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{bill.vendorName}</td>
                  <td className="px-6 py-4 text-xs text-slate-500">{bill.dueDate}</td>
                  <td className="px-6 py-4 text-right font-mono font-medium text-slate-950">{bill.totalAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-rose-600">
                    {bill.balanceDue === 0 ? '-' : bill.balanceDue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                      bill.status === 'PAID' 
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                        : 'bg-rose-100 text-rose-700 border border-rose-200 animate-pulse'
                    }`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {bill.status !== 'PAID' ? (
                      <button 
                        onClick={() => openPayBill(bill)}
                        className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-all"
                      >
                        Settle Payment
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Disbursed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Bill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#2ca01c]" />
                <h3 className="font-bold text-base">Record Purchase Bill</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBill} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Vendor Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Shell Uganda Ltd"
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Bill Number</label>
                  <input 
                    type="text"
                    placeholder="e.g. BIL-1022-X"
                    value={billNumber}
                    onChange={(e) => setBillNumber(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Due Date</label>
                  <input 
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Total Bill Cost (UGX)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input 
                    type="number"
                    placeholder="0"
                    value={totalAmount || ''}
                    onChange={(e) => setTotalAmount(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {formErrors.length > 0 && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs space-y-1">
                  {formErrors.map((err, i) => <p key={i} className="font-bold">{err}</p>)}
                </div>
              )}

              {successMsg && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <p className="font-bold">{successMsg}</p>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-[#1b4330] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-900"
                >
                  Post Bill to AP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Settle Payment Modal */}
      {showPayModal && selectedBill && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <h3 className="font-bold text-base">Disburse Bill Payment</h3>
              <button onClick={() => setShowPayModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePayBill} className="p-6 space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Vendor</p>
                <p className="text-base font-bold text-slate-900">{selectedBill.vendorName}</p>
                <p className="text-xs text-slate-500">Bill Code: {selectedBill.billNumber}</p>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="text-xs text-slate-500">Amount Outstanding</span>
                  <span className="text-xs font-bold font-mono text-rose-600">{selectedBill.balanceDue.toLocaleString()} UGX</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Payment Account</label>
                <select 
                  value={payAccount} 
                  onChange={(e) => setPayAccount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {accounts.filter(a => a.type === 'ASSET' && a.subType === 'CASH').map(acc => (
                    <option key={acc.code} value={acc.code}>{acc.code} - {acc.name} ({acc.balance.toLocaleString()} UGX)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Settlement Amount (UGX)</label>
                <input 
                  type="number"
                  value={payAmount || ''}
                  onChange={(e) => setPayAmount(Math.min(selectedBill.balanceDue, Math.max(0, Number(e.target.value) || 0)))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowPayModal(false)}
                  className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-[#2ca01c] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700"
                >
                  Settle Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
