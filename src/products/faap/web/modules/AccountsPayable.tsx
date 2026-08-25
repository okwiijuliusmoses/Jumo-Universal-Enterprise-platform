import React, { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import { formatNumeric, formatCurrency } from '../../../../core/utils/Formatters';
import { FaapService } from '../../domain/FaapService';
import { LedgerPostingService } from '../../services/LedgerPostingService';
import { FaapVendorBill } from '../../domain/types';
import { JumoDataTable, Column } from '../../../../core/enterprise/components/JumoDataTable';
import { JumoTransactionForm } from '../../../../core/enterprise/components/JumoTransactionForm';
import { JumoWorkflowStatus } from '../../../../core/enterprise/components/JumoWorkflowStatus';

export const AccountsPayable: React.FC = () => {
  const service = FaapService.getInstance();
  const postingService = LedgerPostingService.getInstance();

  const [bills, setBills] = useState<FaapVendorBill[]>(service.getVendorBills());
  const [accounts] = useState(service.getChartOfAccounts());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState<FaapVendorBill | null>(null);

  // New Bill State
  const [vendorName, setVendorName] = useState('');
  const [billDate, setBillDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [billNumber, setBillNumber] = useState('');
  const [formLines, setFormLines] = useState<any[]>([
    { accountCode: '', description: '', amount: 0 }
  ]);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  // Pay Bill State
  const [payAmount, setPayAmount] = useState<number>(0);
  const [payAccount, setPayAccount] = useState('1010');

  const totalAmount = formLines.reduce((sum, line) => sum + (Number(line.amount) || 0), 0);

  const handleLineChange = (index: number, field: string, value: any) => {
    const newLines = [...formLines];
    newLines[index][field] = value;
    setFormLines(newLines);
  };

  const handleCreateBill = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors([]);

    if (!vendorName.trim()) return setFormErrors(['Vendor Name is required.']);
    if (!dueDate) return setFormErrors(['Due date is required.']);
    if (totalAmount <= 0) return setFormErrors(['Bill total must be greater than 0 UGX.']);

    const newBill = service.createVendorBill({
      billNumber: billNumber || `BILL-${Math.floor(Math.random() * 10000)}`,
      vendorName,
      dueDate,
      totalAmount
    });

    setBills(service.getVendorBills());
    setShowAddModal(false);
    setVendorName('');
    setDueDate('');
    setBillNumber('');
    setFormLines([{ accountCode: '', description: '', amount: 0 }]);
  };

  const handlePayBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBill || payAmount <= 0) return;
    
    service.payVendorBill(selectedBill.id, payAmount);
    setBills(service.getVendorBills());
    setShowPayModal(false);
    setSelectedBill(null);
  };

  const columns: Column<FaapVendorBill>[] = [
    { header: 'BILL #', accessor: 'billNumber', className: 'font-mono text-xs font-bold text-indigo-600', sortable: true },
    { header: 'VENDOR', accessor: 'vendorName', className: 'font-medium text-slate-800', sortable: true },
    { header: 'DATE', accessor: 'createdAt', className: 'text-slate-600 text-xs' },
    { header: 'DUE DATE', accessor: 'dueDate', className: 'text-slate-600 text-xs', sortable: true },
    { 
      header: 'AMOUNT', 
      accessor: (i) => <span className="font-mono font-medium text-slate-900">{formatNumeric(i.totalAmount)}</span>,
      className: 'text-right'
    },
    { 
      header: 'BALANCE DUE', 
      accessor: (i) => <span className="font-mono font-black text-slate-900">{formatNumeric(i.balanceDue)}</span>,
      className: 'text-right'
    },
    { 
      header: 'STATUS', 
      accessor: (i) => <JumoWorkflowStatus status={i.status} />,
      className: 'text-center'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Expenses & AP</h1>
          <p className="text-slate-500 text-sm mt-1">Manage vendor bills, track payables, and record expenses.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 transition shadow-sm"
          >
            <Plus className="w-4 h-4" /> Enter Bill
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Total Outstanding AP</p>
          <p className="text-2xl font-black text-slate-900 font-mono mt-1">
            {formatCurrency(bills.reduce((sum, i) => sum + i.balanceDue, 0))}
          </p>
        </div>
      </div>

      <JumoDataTable
        title="Recent Bills"
        data={bills}
        columns={columns}
        searchPlaceholder="Find by vendor, bill #..."
        selectable={true}
        emptyStateMessage="No bills found."
        actions={(bill) => (
          <div className="flex items-center justify-end gap-2">
            {bill.status !== 'PAID' && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBill(bill);
                  setPayAmount(bill.balanceDue);
                  setShowPayModal(true);
                }}
                className="text-rose-600 hover:text-rose-800 text-xs font-bold bg-rose-50 px-2 py-1 rounded"
              >
                Make Payment
              </button>
            )}
            <button className="text-indigo-600 hover:text-indigo-800 text-xs font-bold">View</button>
          </div>
        )}
      />

      {showAddModal && (
        <JumoTransactionForm
          title="Bill"
          width="2xl"
          error={formErrors.length > 0 ? formErrors.join(' | ') : null}
          headerFields={
            <div className="grid grid-cols-4 gap-6">
              <div className="space-y-1.5 col-span-2">
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide">Vendor</label>
                <input 
                  type="text" 
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  placeholder="Choose a vendor"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide">Bill Date</label>
                <input 
                  type="date" 
                  value={billDate}
                  onChange={(e) => setBillDate(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide">Due Date</label>
                <input 
                  type="date" 
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          }
          columns={[
            { 
              id: 'accountCode', 
              header: 'CATEGORY / ACCOUNT', 
              type: 'select', 
              options: accounts.map(a => ({ value: a.code, label: `${a.code} - ${a.name}` })),
              width: 'w-1/3'
            },
            { id: 'description', header: 'DESCRIPTION', type: 'text', placeholder: 'What is this for?' },
            { id: 'amount', header: 'AMOUNT', type: 'amount' }
          ]}
          lines={formLines}
          onLineChange={handleLineChange}
          onAddLine={() => setFormLines([...formLines, { accountCode: '', description: '', amount: 0 }])}
          onRemoveLine={(idx) => {
            const newLines = [...formLines];
            newLines.splice(idx, 1);
            setFormLines(newLines);
          }}
          footerContent={
            <div className="ml-auto w-64 bg-white border border-slate-200 rounded-xl overflow-hidden self-start">
              <div className="px-4 py-3 bg-slate-50 flex justify-between text-base font-black text-slate-900">
                <span>Total</span>
                <span className="font-mono">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          }
          onSubmit={handleCreateBill}
          onCancel={() => setShowAddModal(false)}
          submitLabel="Save Bill"
          isSubmitting={false}
        />
      )}

      {showPayModal && selectedBill && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Record Bill Payment</h3>
            </div>
            <form onSubmit={handlePayBill} className="p-5 space-y-4">
              <div className="bg-rose-50 text-rose-900 p-3 rounded-lg border border-rose-100 space-y-1">
                <p className="text-xs font-bold uppercase">{selectedBill.vendorName}</p>
                <p className="text-sm">Bill {selectedBill.billNumber}</p>
                <p className="text-lg font-black font-mono">Bal: {formatCurrency(selectedBill.balanceDue)}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Payment Account</label>
                <select 
                  value={payAccount} 
                  onChange={(e) => setPayAccount(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  {accounts.filter(a => a.type === 'ASSET' && a.subType === 'CASH').map(acc => (
                    <option key={acc.code} value={acc.code}>{acc.code} - {acc.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Amount Paid</label>
                <input 
                  type="number"
                  value={payAmount || ''}
                  onChange={(e) => setPayAmount(Math.min(selectedBill.balanceDue, Math.max(0, Number(e.target.value) || 0)))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowPayModal(false)} className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Cancel</button>
                <button type="submit" className="px-4 py-2 text-xs font-bold text-white bg-rose-600 rounded-lg hover:bg-rose-700">Save Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
