import React, { useState } from 'react';
import { Plus, Download, RefreshCw, Upload, Receipt, FileText } from 'lucide-react';
import { JumoDataTable, Column } from '../../../../core/enterprise/components/JumoDataTable';
import { JumoTransactionForm } from '../../../../core/enterprise/components/JumoTransactionForm';
import { JumoWorkflowStatus } from '../../../../core/enterprise/components/JumoWorkflowStatus';

export const BursaryModule: React.FC = () => {

  const [invoices, setInvoices] = useState<any[]>([
    { id: '1', invoiceNumber: 'INV-ST-101', studentName: 'Moses Okwii', amount: 1500000, balanceDue: 1500000, term: 'Term 1 2026', status: 'UNPAID', dueDate: '2026-09-01' },
    { id: '2', invoiceNumber: 'INV-ST-102', studentName: 'Sarah Namukasa', amount: 1500000, balanceDue: 500000, term: 'Term 1 2026', status: 'PARTIAL', dueDate: '2026-09-01' },
    { id: '3', invoiceNumber: 'INV-ST-103', studentName: 'John Doe', amount: 1500000, balanceDue: 0, term: 'Term 1 2026', status: 'PAID', dueDate: '2026-09-01' }
  ]);
  
  const [receipts, setReceipts] = useState<any[]>([
    { id: '1', receiptNumber: 'REC-1001', studentName: 'Sarah Namukasa', amountPaid: 1000000, channel: 'SchoolPay / Mobile Money', paymentDate: '2026-08-20' },
    { id: '2', receiptNumber: 'REC-1002', studentName: 'John Doe', amountPaid: 1500000, channel: 'Direct Bank Clearing Swift', paymentDate: '2026-08-21' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  
  // Create Invoice State
  const [studentName, setStudentName] = useState('');
  const [term, setTerm] = useState('Term 1 2026');
  const [formLines, setFormLines] = useState<any[]>([
    { item: 'Tuition Fee', amount: 1000000 },
    { item: 'Development Fund', amount: 200000 },
    { item: 'Meals', amount: 300000 }
  ]);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  
  const totalInvoiceAmount = formLines.reduce((sum, line) => sum + (Number(line.amount) || 0), 0);

  // Pay State
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentChannel, setPaymentChannel] = useState('SchoolPay / Mobile Money');

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors([]);
    
    if (!studentName.trim()) return setFormErrors(['Student Name is required.']);
    
    const newInvoice = {
      id: Math.random().toString(),
      invoiceNumber: `INV-ST-${Math.floor(Math.random() * 10000)}`,
      studentName,
      term,
      amount: totalInvoiceAmount,
      balanceDue: totalInvoiceAmount,
      status: 'UNPAID',
      dueDate: new Date().toISOString().split('T')[0]
    };
    
    setInvoices([newInvoice, ...invoices]);
    setShowAddModal(false);
    setStudentName('');
  };

  const handleReceivePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice || paymentAmount <= 0) return;
    
    const newReceipt = {
      id: Math.random().toString(),
      receiptNumber: `REC-${Math.floor(Math.random() * 10000)}`,
      studentName: selectedInvoice.studentName,
      amountPaid: paymentAmount,
      channel: paymentChannel,
      paymentDate: new Date().toISOString().split('T')[0]
    };
    
    setReceipts([newReceipt, ...receipts]);
    setInvoices(invoices.map(inv => {
      if (inv.id === selectedInvoice.id) {
        const newBalance = Math.max(0, inv.balanceDue - paymentAmount);
        return {
          ...inv,
          balanceDue: newBalance,
          status: newBalance === 0 ? 'PAID' : (newBalance < inv.amount ? 'PARTIAL' : 'UNPAID')
        };
      }
      return inv;
    }));
    
    setShowPayModal(false);
    setSelectedInvoice(null);
  };

  const invoiceColumns: Column<any>[] = [
    { header: 'INVOICE #', accessor: 'invoiceNumber', className: 'font-mono text-xs font-bold text-indigo-600', sortable: true },
    { header: 'STUDENT', accessor: 'studentName', className: 'font-medium text-slate-800', sortable: true },
    { header: 'TERM', accessor: 'term', className: 'text-slate-600 text-xs' },
    { header: 'DUE DATE', accessor: 'dueDate', className: 'text-slate-600 text-xs', sortable: true },
    { 
      header: 'TOTAL AMOUNT', 
      accessor: (i) => <span className="font-mono font-medium text-slate-900">{i.amount.toLocaleString()}</span>,
      className: 'text-right'
    },
    { 
      header: 'BALANCE DUE', 
      accessor: (i) => <span className="font-mono font-black text-slate-900">{i.balanceDue.toLocaleString()}</span>,
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Bursary & Student Billing</h1>
          <p className="text-slate-500 text-sm mt-1">Manage student fee structures, track tuition collections, and reconcile SchoolPay payments.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition shadow-sm"
          >
            <Plus className="w-4 h-4" /> Generate Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Total Outstanding Tuition</p>
          <p className="text-2xl font-black text-slate-900 font-mono mt-1">
            {invoices.reduce((sum, i) => sum + i.balanceDue, 0).toLocaleString()} UGX
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Total Collected (This Term)</p>
          <p className="text-2xl font-black text-emerald-600 font-mono mt-1">
            {receipts.reduce((sum, r) => sum + r.amountPaid, 0).toLocaleString()} UGX
          </p>
        </div>
      </div>

      <JumoDataTable
        title="Student Fee Accounts"
        data={invoices}
        columns={invoiceColumns}
        searchPlaceholder="Find by student name, invoice #..."
        selectable={true}
        emptyStateMessage="No invoices found."
        actions={(inv) => (
          <div className="flex items-center justify-end gap-2">
            {inv.status !== 'PAID' && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedInvoice(inv);
                  setPaymentAmount(inv.balanceDue);
                  setShowPayModal(true);
                }}
                className="text-emerald-600 hover:text-emerald-800 text-xs font-bold bg-emerald-50 px-2 py-1 rounded"
              >
                Collect Payment
              </button>
            )}
            <button className="text-indigo-600 hover:text-indigo-800 text-xs font-bold">View</button>
          </div>
        )}
      />

      {showAddModal && (
        <JumoTransactionForm
          title="Student Tuition Invoice"
          width="2xl"
          error={formErrors.length > 0 ? formErrors.join(' | ') : null}
          headerFields={
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide">Student Name</label>
                <input 
                  type="text" 
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide">Academic Term</label>
                <select 
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Term 1 2026">Term 1 2026</option>
                  <option value="Term 2 2026">Term 2 2026</option>
                  <option value="Term 3 2026">Term 3 2026</option>
                </select>
              </div>
            </div>
          }
          columns={[
            { id: 'item', header: 'FEE STRUCTURE ITEM', type: 'text', width: 'w-2/3', placeholder: 'e.g. Tuition, Development...' },
            { id: 'amount', header: 'AMOUNT', type: 'amount' }
          ]}
          lines={formLines}
          onLineChange={(idx, field, val) => {
            const newLines = [...formLines];
            newLines[idx][field] = val;
            setFormLines(newLines);
          }}
          onAddLine={() => setFormLines([...formLines, { item: '', amount: 0 }])}
          onRemoveLine={(idx) => {
            const newLines = [...formLines];
            newLines.splice(idx, 1);
            setFormLines(newLines);
          }}
          footerContent={
            <div className="ml-auto w-64 bg-white border border-slate-200 rounded-xl overflow-hidden self-start">
              <div className="px-4 py-3 bg-slate-50 flex justify-between text-base font-black text-slate-900">
                <span>Total</span>
                <span className="font-mono">{totalInvoiceAmount.toLocaleString()} UGX</span>
              </div>
            </div>
          }
          onSubmit={handleCreateInvoice}
          onCancel={() => setShowAddModal(false)}
          submitLabel="Issue Invoice"
          isSubmitting={false}
        />
      )}

      {showPayModal && selectedInvoice && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Receive Tuition Payment</h3>
            </div>
            <form onSubmit={handleReceivePayment} className="p-5 space-y-4">
              <div className="bg-blue-50 text-blue-900 p-3 rounded-lg border border-blue-100 space-y-1">
                <p className="text-xs font-bold uppercase">{selectedInvoice.studentName}</p>
                <p className="text-sm">Invoice {selectedInvoice.invoiceNumber}</p>
                <p className="text-lg font-black font-mono">Bal: {selectedInvoice.balanceDue.toLocaleString()} UGX</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Collection Channel</label>
                <select 
                  value={paymentChannel} 
                  onChange={(e) => setPaymentChannel(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="SchoolPay / Mobile Money">SchoolPay MTN/Airtel MM</option>
                  <option value="Direct Bank Clearing Swift">Direct Bank clearing</option>
                  <option value="Physical POS Card Terminal">Physical POS Sabi Card</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Amount Received</label>
                <input 
                  type="number"
                  value={paymentAmount || ''}
                  onChange={(e) => setPaymentAmount(Math.min(selectedInvoice.balanceDue, Math.max(0, Number(e.target.value) || 0)))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowPayModal(false)} className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Cancel</button>
                <button type="submit" className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700">Record Payment & Receipt</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
