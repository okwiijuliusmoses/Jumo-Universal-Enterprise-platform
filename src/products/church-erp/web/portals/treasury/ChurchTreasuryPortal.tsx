import React, { useState } from 'react';
import { Landmark, TrendingUp, CheckCircle, Activity, Plus, FileText, Download } from 'lucide-react';
import { JumoDataTable } from '../../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../../core/enterprise/components/JumoForm';

interface QuotaRecord {
  id: string;
  parish: string;
  mode: string;
  amount: number;
  date: string;
  status: 'PENDING' | 'CLEARED' | 'REJECTED';
}

export const ChurchTreasuryPortal: React.FC = () => {
  const [quotas, setQuotas] = useState<QuotaRecord[]>([
    { id: 'Q-2026-001', parish: 'St. Paul Cathedral', mode: 'Bank Transfer', amount: 15000000, date: new Date().toISOString().split('T')[0], status: 'CLEARED' },
    { id: 'Q-2026-002', parish: 'All Saints Parish', mode: 'Cheque', amount: 4500000, date: new Date().toISOString().split('T')[0], status: 'PENDING' },
    { id: 'Q-2026-003', parish: 'St. Luke Chapel', mode: 'Mobile Money', amount: 2100000, date: new Date(Date.now() - 86400000).toISOString().split('T')[0], status: 'CLEARED' }
  ]);
  const [showForm, setShowForm] = useState(false);

  const handleRegister = (data: any) => {
    const newRecord: QuotaRecord = {
      id: `Q-${new Date().getFullYear()}-${String(quotas.length + 1).padStart(3, '0')}`,
      parish: data.parish,
      mode: data.mode,
      amount: Number(data.amount),
      date: data.date,
      status: 'PENDING'
    };
    setQuotas([newRecord, ...quotas]);
    setShowForm(false);
  };

  const handleClear = (id: string) => {
    setQuotas(quotas.map(q => q.id === id ? { ...q, status: 'CLEARED' } : q));
  };

  const totalCleared = quotas.filter(q => q.status === 'CLEARED').reduce((acc, curr) => acc + curr.amount, 0);
  const totalPending = quotas.filter(q => q.status === 'PENDING').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Diocesan Treasury</h2>
            <p className="text-xs text-slate-500">Quota Contributions & Tithe Management</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition shadow-sm">
            <Download className="w-4 h-4" /> Export Report
          </button>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition shadow-sm"
          >
            <Plus className="w-4 h-4" /> Record Remittance
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Expected Annual Quota</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">UGX 1.2B</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-emerald-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-700">Collected to Date</p>
              <p className="text-2xl font-bold text-emerald-900 mt-1">UGX {(850000000 + totalCleared).toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-amber-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-700">Pending Remittances</p>
              <p className="text-2xl font-bold text-amber-900 mt-1">UGX {totalPending.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
              <Activity className="w-6 h-6" />
            </div>
          </div>
        </div>

        <JumoDataTable<QuotaRecord>
          data={quotas}
          title="Recent Quota Remittances"
          columns={[
            { header: 'Receipt No.', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-500' },
            { header: 'Parish', accessor: 'parish', className: 'font-medium' },
            { header: 'Payment Mode', accessor: 'mode' },
            { header: 'Amount (UGX)', accessor: (t) => <span className="font-mono font-bold text-emerald-600">{t.amount.toLocaleString()}</span> },
            { header: 'Date', accessor: 'date' },
            { 
              header: 'Status', 
              accessor: (t) => (
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider ${t.status === 'CLEARED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {t.status}
                </span>
              ) 
            }
          ]}
          actions={(t) => t.status === 'PENDING' ? (
            <button 
              onClick={() => handleClear(t.id)}
              className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-800 bg-emerald-50 px-3 py-1 rounded"
            >
              Clear Funds
            </button>
          ) : null}
        />

        {showForm && (
          <JumoForm
            title="Record New Quota Remittance"
            fields={[
              { id: 'parish', label: 'Parish Name', type: 'text', required: true },
              { id: 'amount', label: 'Amount (UGX)', type: 'number', required: true },
              { id: 'mode', label: 'Payment Mode', type: 'select', required: true, options: [
                { value: 'Bank Transfer', label: 'Bank Transfer' },
                { value: 'Cheque', label: 'Cheque' },
                { value: 'Mobile Money', label: 'Mobile Money' },
                { value: 'Cash', label: 'Cash' }
              ] },
              { id: 'date', label: 'Date of Remittance', type: 'date', required: true }
            ]}
            onSubmit={handleRegister}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};
