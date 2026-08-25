import React, { useState } from 'react';
import { DollarSign, FileText, ArrowUpRight, ArrowDownRight, CreditCard, Plus } from 'lucide-react';
import { JumoDataTable } from '../../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../../core/enterprise/components/JumoForm';

interface PaymentRecord {
  id: string;
  rcp: string;
  name: string;
  level: string;
  mode: string;
  amt: number;
  date: string;
  status: 'CLEARED' | 'PENDING' | 'FAILED';
}

export const SecondaryBursarPortal: React.FC = () => {
  const [payments, setPayments] = useState<PaymentRecord[]>([
    { id: 'RCP-S-0912', rcp: 'RCP-S-0912', name: 'John Doe', level: 'S.1', mode: 'SchoolPay', amt: 850000, date: new Date().toISOString().split('T')[0], status: 'CLEARED' },
    { id: 'RCP-S-0911', rcp: 'RCP-S-0911', name: 'Mary Jane', level: 'S.4', mode: 'Bank Slip', amt: 600000, date: new Date().toISOString().split('T')[0], status: 'CLEARED' },
    { id: 'RCP-S-0910', rcp: 'RCP-S-0910', name: 'Peter Pan', level: 'S.6 (Arts)', mode: 'Cash', amt: 450000, date: new Date(Date.now() - 86400000).toISOString().split('T')[0], status: 'CLEARED' },
    { id: 'RCP-S-0909', rcp: 'RCP-S-0909', name: 'Alice W.', level: 'S.3', mode: 'Mobile Money', amt: 300000, date: new Date(Date.now() - 86400000).toISOString().split('T')[0], status: 'PENDING' },
  ]);
  const [showForm, setShowForm] = useState(false);

  const handleRecordPayment = (data: any) => {
    const newRecord: PaymentRecord = {
      id: `RCP-S-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      rcp: `RCP-S-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      name: data.studentName,
      level: data.studentLevel,
      mode: data.mode,
      amt: Number(data.amount),
      date: data.date,
      status: 'CLEARED'
    };
    setPayments([newRecord, ...payments]);
    setShowForm(false);
  };

  const totalCollected = payments.filter(p => p.status === 'CLEARED').reduce((acc, p) => acc + p.amt, 0) + 420000000;

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Secondary Bursar</h2>
            <p className="text-xs text-slate-500">Fees Collection & FAAP Ledger</p>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Record Payment
        </button>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Expected Term Fees</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">UGX 845M</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-md text-slate-400">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-emerald-200 shadow-sm flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-emerald-700">Collected</p>
              <p className="text-2xl font-bold text-emerald-900 mt-1">UGX {totalCollected.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-emerald-50 rounded-md text-emerald-500">
              <ArrowDownRight className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-red-200 shadow-sm flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-red-700">Arrears / Deficits</p>
              <p className="text-2xl font-bold text-red-900 mt-1">UGX {(845000000 - totalCollected).toLocaleString()}</p>
            </div>
            <div className="p-2 bg-red-50 rounded-md text-red-500">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        <JumoDataTable<PaymentRecord>
          data={payments}
          title="Recent Secondary Transactions (FAAP)"
          columns={[
            { header: 'Receipt No.', accessor: 'rcp', className: 'font-mono text-xs font-bold text-slate-500' },
            { header: 'Student Name', accessor: 'name', className: 'font-medium' },
            { header: 'Level', accessor: 'level' },
            { header: 'Payment Mode', accessor: 'mode' },
            { header: 'Amount (UGX)', accessor: (t) => <span className="font-mono font-bold text-emerald-600">{t.amt.toLocaleString()}</span> },
            { header: 'Date', accessor: 'date' },
            { 
              header: 'Status', 
              accessor: (t) => (
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider ${t.status === 'CLEARED' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {t.status}
                </span>
              ) 
            }
          ]}
        />

        {showForm && (
          <JumoForm
            title="Record New Student Payment"
            fields={[
              { id: 'studentName', label: 'Student Name', type: 'text', required: true },
              { id: 'studentLevel', label: 'Level (e.g. S.1, S.4)', type: 'text', required: true },
              { id: 'amount', label: 'Amount (UGX)', type: 'number', required: true },
              { id: 'mode', label: 'Payment Mode', type: 'select', required: true, options: [
                { value: 'Bank Slip', label: 'Bank Slip' },
                { value: 'SchoolPay', label: 'SchoolPay' },
                { value: 'Mobile Money', label: 'Mobile Money' },
                { value: 'Cash', label: 'Cash' },
                { value: 'Cheque', label: 'Cheque' }
              ] },
              { id: 'date', label: 'Date of Payment', type: 'date', required: true }
            ]}
            onSubmit={handleRecordPayment}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};
