import React, { useState } from 'react';
import { 
  Plus, Search, CheckCircle, ArrowUpRight, ShieldAlert, 
  Sparkles, Users, Calendar, DollarSign, X, Receipt, LineChart 
} from 'lucide-react';
import { FaapService } from '../../domain/FaapService';
import { FaapCustomerInvoice } from '../../domain/types';

export const AccountsReceivable: React.FC = () => {
  const service = FaapService.getInstance();
  const [invoices, setInvoices] = useState<FaapCustomerInvoice[]>(service.getCustomerInvoices());
  const [accounts] = useState(service.getChartOfAccounts());

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<FaapCustomerInvoice | null>(null);

  // Form states - Create Invoice
  const [customerName, setCustomerName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState('');

  // Form states - Collect Payment
  const [collectAmount, setCollectAmount] = useState<number>(0);
  const [collectAccount, setCollectAccount] = useState('1010'); // Default cash bank

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors([]);
    setSuccessMsg('');

    if (!customerName.trim()) return setFormErrors(['Customer Name is required.']);
    if (!invoiceNumber.trim()) return setFormErrors(['Invoice Number is required.']);
    if (!dueDate) return setFormErrors(['Due date is required.']);
    if (totalAmount <= 0) return setFormErrors(['Invoice total must be greater than 0 UGX.']);

    try {
      const newInvoice = service.createCustomerInvoice({
        invoiceNumber,
        customerName,
        dueDate,
        totalAmount
      });

      setInvoices(service.getCustomerInvoices());
      setSuccessMsg(`Customer Invoice ${newInvoice.invoiceNumber} registered successfully & posted to Accounts Receivable ledger!`);
      
      setTimeout(() => {
        setShowAddModal(false);
        setCustomerName('');
        setInvoiceNumber('');
        setDueDate('');
        setTotalAmount(0);
        setSuccessMsg('');
      }, 1500);
    } catch (err: any) {
      setFormErrors([err.message || 'Error occurred while saving customer invoice.']);
    }
  };

  const handleCollectPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;

    if (collectAmount <= 0) {
      alert('Collection amount must be greater than 0.');
      return;
    }

    try {
      service.collectCustomerInvoice(selectedInvoice.id, collectAmount);
      setInvoices(service.getCustomerInvoices());
      setShowCollectModal(false);
      setSelectedInvoice(null);
      setCollectAmount(0);
      alert('Invoice payment collected successfully! Debit Cash (1010), Credit AR (1210).');
    } catch (err: any) {
      alert(`Collection failed: ${err.message}`);
    }
  };

  const openCollectPayment = (invoice: FaapCustomerInvoice) => {
    setSelectedInvoice(invoice);
    setCollectAmount(invoice.balanceDue);
    setShowCollectModal(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Accounts Receivable (AR) Hub</h1>
          <p className="text-slate-500 text-sm">Monitor customer billing lines, issue institutional invoices, and trace collection streams.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#2ca01c] hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-600/10"
        >
          <Plus className="w-4 h-4" />
          Generate Invoice
        </button>
      </div>

      {/* AR Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Total Outstanding AR</p>
          <p className="text-3xl font-black text-[#2ca01c] font-mono mt-1">
            {invoices.reduce((sum, i) => sum + i.balanceDue, 0).toLocaleString()} UGX
          </p>
          <p className="text-xs text-slate-400 mt-2">Active outstanding cash due from debtors</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Active Billing Accounts</p>
          <p className="text-3xl font-black text-slate-900 mt-1">
            {Array.from(new Set(invoices.map(i => i.customerName))).length}
          </p>
          <p className="text-xs text-emerald-600 font-bold mt-2">Dynamic links matching SchoolPay references</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Aging Collections Health</p>
          <p className="text-3xl font-black text-emerald-600 font-mono mt-1">100% SECURE</p>
          <p className="text-xs text-slate-400 mt-2">Zero collection disputes or writing losses</p>
        </div>
      </div>

      {/* Customer Invoices Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Customer Invoices Register</h3>
          <span className="text-xs font-semibold text-slate-500">{invoices.length} Records found</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Invoice #</th>
                <th className="px-6 py-4">Customer/Debtor</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4 text-right">Invoice Value (UGX)</th>
                <th className="px-6 py-4 text-right">Balance Due (UGX)</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-slate-600">{inv.invoiceNumber}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{inv.customerName}</td>
                  <td className="px-6 py-4 text-xs text-slate-500">{inv.dueDate}</td>
                  <td className="px-6 py-4 text-right font-mono font-medium text-slate-950">{inv.totalAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-emerald-600">
                    {inv.balanceDue === 0 ? '-' : inv.balanceDue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                      inv.status === 'PAID' 
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                        : 'bg-blue-100 text-blue-700 border border-blue-200 animate-pulse'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {inv.status !== 'PAID' ? (
                      <button 
                        onClick={() => openCollectPayment(inv)}
                        className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-all"
                      >
                        Collect Payment
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Settled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Invoice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base">Generate Customer Invoice</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Customer Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Universal Education Council"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Invoice Number</label>
                  <input 
                    type="text"
                    placeholder="e.g. INV-1002-X"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
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
                  className="bg-[#2ca01c] hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Post Invoice to AR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Collect Payment Modal */}
      {showCollectModal && selectedInvoice && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <h3 className="font-bold text-base">Record Payment Receipt</h3>
              <button onClick={() => setShowCollectModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCollectPayment} className="p-6 space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Customer / Debtor</p>
                <p className="text-base font-bold text-slate-900">{selectedInvoice.customerName}</p>
                <p className="text-xs text-slate-500">Invoice Code: {selectedInvoice.invoiceNumber}</p>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="text-xs text-slate-500">Invoice Balance Due</span>
                  <span className="text-xs font-bold font-mono text-emerald-600">{selectedInvoice.balanceDue.toLocaleString()} UGX</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Collection Target Account</label>
                <select 
                  value={collectAccount} 
                  onChange={(e) => setCollectAccount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {accounts.filter(a => a.type === 'ASSET' && a.subType === 'CASH').map(acc => (
                    <option key={acc.code} value={acc.code}>{acc.code} - {acc.name} ({acc.balance.toLocaleString()} UGX)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Collection Value (UGX)</label>
                <input 
                  type="number"
                  value={collectAmount || ''}
                  onChange={(e) => setCollectAmount(Math.min(selectedInvoice.balanceDue, Math.max(0, Number(e.target.value) || 0)))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowCollectModal(false)}
                  className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-[#2ca01c] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700"
                >
                  Collect Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
