import React, { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import { FaapService } from '../../domain/FaapService';
import { LedgerPostingService } from '../../services/LedgerPostingService';
import { FaapCustomerInvoice } from '../../domain/types';
import { JumoDataTable, Column } from '../../../../core/enterprise/components/JumoDataTable';
import { JumoTransactionForm } from '../../../../core/enterprise/components/JumoTransactionForm';
import { JumoWorkflowStatus } from '../../../../core/enterprise/components/JumoWorkflowStatus';
import { formatNumber } from '../../../../utils/formatters';

export const AccountsReceivable: React.FC = () => {
  const service = FaapService.getInstance();
  const postingService = LedgerPostingService.getInstance();

  const [invoices, setInvoices] = useState<FaapCustomerInvoice[]>(service.getCustomerInvoices());
  const [accounts] = useState(service.getChartOfAccounts());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<FaapCustomerInvoice | null>(null);

  // New Invoice State
  const [customerName, setCustomerName] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [formLines, setFormLines] = useState<any[]>([
    { product: '', description: '', qty: 1, rate: 0, amount: 0 }
  ]);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  // Collect Payment State
  const [collectAmount, setCollectAmount] = useState<number>(0);
  const [collectAccount, setCollectAccount] = useState('1010');

  const totalAmount = formLines.reduce((sum, line) => sum + (Number(line.amount) || 0), 0);

  const handleLineChange = (index: number, field: string, value: any) => {
    const newLines = [...formLines];
    newLines[index][field] = value;
    if (field === 'qty' || field === 'rate') {
      newLines[index].amount = (Number(newLines[index].qty) || 0) * (Number(newLines[index].rate) || 0);
    }
    setFormLines(newLines);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors([]);

    if (!customerName.trim()) return setFormErrors(['Customer Name is required.']);
    if (!dueDate) return setFormErrors(['Due date is required.']);
    if (totalAmount <= 0) return setFormErrors(['Invoice total must be greater than 0 UGX.']);

    const newInvoice = service.createCustomerInvoice({
      invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
      customerName,
      dueDate,
      totalAmount
    });

    setInvoices(service.getCustomerInvoices());
    setShowAddModal(false);
    setCustomerName('');
    setDueDate('');
    setFormLines([{ product: '', description: '', qty: 1, rate: 0, amount: 0 }]);
  };

  const handleCollectPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice || collectAmount <= 0) return;
    
    // Process payment in ledger logic would go here
    service.collectInvoicePayment(selectedInvoice.id, collectAmount);
    setInvoices(service.getCustomerInvoices());
    setShowCollectModal(false);
    setSelectedInvoice(null);
  };

  const columns: Column<FaapCustomerInvoice>[] = [
    { header: 'INVOICE #', accessor: 'invoiceNumber', className: 'font-mono text-xs font-bold text-indigo-600', sortable: true },
    { header: 'CUSTOMER', accessor: 'customerName', className: 'font-medium text-slate-800', sortable: true },
    { header: 'DATE', accessor: 'createdAt', className: 'text-slate-600 text-xs' },
    { header: 'DUE DATE', accessor: 'dueDate', className: 'text-slate-600 text-xs', sortable: true },
    { 
      header: 'AMOUNT', 
      accessor: (i) => <span className="font-mono font-medium text-slate-900">{formatNumber(i.totalAmount)}</span>,
      className: 'text-right'
    },
    { 
      header: 'BALANCE DUE', 
      accessor: (i) => <span className="font-mono font-black text-slate-900">{formatNumber(i.balanceDue)}</span>,
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Invoices & AR</h1>
          <p className="text-slate-500 text-sm mt-1">Manage customer invoices, track receivables, and record payments.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition shadow-sm"
          >
            <Plus className="w-4 h-4" /> Create Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Total Outstanding AR</p>
          <p className="text-2xl font-black text-slate-900 font-mono mt-1">
            {formatNumber(invoices.reduce((sum, i) => sum + i.balanceDue, 0))} UGX
          </p>
        </div>
      </div>

      <JumoDataTable
        title="Recent Invoices"
        data={invoices}
        columns={columns}
        searchPlaceholder="Find by customer, invoice #..."
        selectable={true}
        emptyStateMessage="No invoices found."
        actions={(inv) => (
          <div className="flex items-center justify-end gap-2">
            {inv.status !== 'PAID' && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedInvoice(inv);
                  setCollectAmount(inv.balanceDue);
                  setShowCollectModal(true);
                }}
                className="text-emerald-600 hover:text-emerald-800 text-xs font-bold bg-emerald-50 px-2 py-1 rounded"
              >
                Receive Payment
              </button>
            )}
            <button className="text-indigo-600 hover:text-indigo-800 text-xs font-bold">View</button>
          </div>
        )}
      />

      {showAddModal && (
        <JumoTransactionForm
          title="Invoice"
          width="2xl"
          error={formErrors.length > 0 ? formErrors.join(' | ') : null}
          headerFields={
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide">Customer</label>
                <input 
                  type="text" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Choose a customer"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide">Invoice Date</label>
                <input 
                  type="date" 
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
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
            { id: 'product', header: 'PRODUCT/SERVICE', type: 'text', width: 'w-1/4', placeholder: 'Select product...' },
            { id: 'description', header: 'DESCRIPTION', type: 'text', placeholder: 'Line description' },
            { id: 'qty', header: 'QTY', type: 'amount' },
            { id: 'rate', header: 'RATE', type: 'amount' },
            { id: 'amount', header: 'AMOUNT', type: 'amount', readOnly: true }
          ]}
          lines={formLines}
          onLineChange={handleLineChange}
          onAddLine={() => setFormLines([...formLines, { product: '', description: '', qty: 1, rate: 0, amount: 0 }])}
          onRemoveLine={(idx) => {
            const newLines = [...formLines];
            newLines.splice(idx, 1);
            setFormLines(newLines);
          }}
          footerContent={
            <div className="ml-auto w-64 bg-white border border-slate-200 rounded-xl overflow-hidden self-start">
              <div className="px-4 py-2 border-b border-slate-100 flex justify-between text-sm">
                <span className="text-slate-500 font-bold">Subtotal</span>
                <span className="font-mono font-medium text-slate-900">{formatNumber(totalAmount)}</span>
              </div>
              <div className="px-4 py-3 bg-slate-50 flex justify-between text-base font-black text-slate-900">
                <span>Total</span>
                <span className="font-mono">{formatNumber(totalAmount)} UGX</span>
              </div>
            </div>
          }
          onSubmit={handleCreateInvoice}
          onCancel={() => setShowAddModal(false)}
          submitLabel="Save and Send"
          isSubmitting={false}
        />
      )}

      {showCollectModal && selectedInvoice && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Receive Payment</h3>
            </div>
            <form onSubmit={handleCollectPayment} className="p-5 space-y-4">
              <div className="bg-emerald-50 text-emerald-900 p-3 rounded-lg border border-emerald-100 space-y-1">
                <p className="text-xs font-bold uppercase">{selectedInvoice.customerName}</p>
                <p className="text-sm">Invoice {selectedInvoice.invoiceNumber}</p>
                <p className="text-lg font-black font-mono">Bal: {formatNumber(selectedInvoice.balanceDue)} UGX</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Deposit To</label>
                <select 
                  value={collectAccount} 
                  onChange={(e) => setCollectAccount(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  {accounts.filter(a => a.type === 'ASSET' && a.subType === 'CASH').map(acc => (
                    <option key={acc.code} value={acc.code}>{acc.code} - {acc.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Amount Received</label>
                <input 
                  type="number"
                  value={collectAmount || ''}
                  onChange={(e) => setCollectAmount(Math.min(selectedInvoice.balanceDue, Math.max(0, Number(e.target.value) || 0)))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowCollectModal(false)} className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Cancel</button>
                <button type="submit" className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700">Save and Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
