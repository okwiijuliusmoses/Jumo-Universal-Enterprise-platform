import React, { useState } from 'react';
import { Download, Plus } from 'lucide-react';
import { FaapService } from '../../domain/FaapService';
import { JumoDataTable, Column } from '../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../core/enterprise/components/JumoForm';

export const ChartOfAccounts: React.FC = () => {
  const service = FaapService.getInstance();
  const [accounts, setAccounts] = useState(service.getChartOfAccounts());
  const [showAccountForm, setShowAccountForm] = useState(false);

  const handleAdd = (data: any) => {
    service.createAccount(data);
    setAccounts([...service.getChartOfAccounts()]);
    setShowAccountForm(false);
  };

  const columns: Column<any>[] = [
    { 
      header: 'CODE', 
      accessor: 'code', 
      className: 'font-mono text-xs font-bold text-slate-500',
      sortable: true
    },
    { 
      header: 'NAME', 
      accessor: (a) => (
        <div>
          <p className="font-bold text-slate-900">{a.name}</p>
          {a.isSystem && <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-tighter">System Locked</span>}
        </div>
      ),
      sortable: true
    },
    { 
      header: 'TYPE', 
      accessor: (a) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
          a.type === 'ASSET' ? 'bg-blue-50 text-blue-700 border-blue-200' :
          a.type === 'LIABILITY' ? 'bg-rose-50 text-rose-700 border-rose-200' :
          a.type === 'EQUITY' ? 'bg-purple-50 text-purple-700 border-purple-200' :
          a.type === 'REVENUE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
          'bg-amber-50 text-amber-700 border-amber-200'
        }`}>
          {a.type}
        </span>
      ),
      sortable: true
    },
    { 
      header: 'DETAIL TYPE', 
      accessor: 'subType', 
      className: 'text-slate-600 font-medium text-xs',
      sortable: true
    },
    { 
      header: 'FAAP BALANCE', 
      accessor: (a) => (
        <span className="font-mono font-black text-slate-900">
          {a.balance.toLocaleString()} {a.currency}
        </span>
      ), 
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Chart of Accounts</h1>
          <p className="text-slate-500 text-sm mt-1">
            Categorize financial transactions across assets, liabilities, equity, revenue, and expenses.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
          <button 
            onClick={() => setShowAccountForm(true)}
            className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition shadow-sm"
          >
            <Plus className="w-4 h-4" /> New Account
          </button>
        </div>
      </div>

      <JumoDataTable
        data={accounts}
        columns={columns}
        searchPlaceholder="Filter by name or number..."
        emptyStateMessage="No accounts found in the chart of accounts."
        selectable={true}
        bulkActions={
          <button className="text-xs font-bold text-slate-600 bg-white border border-slate-300 px-3 py-1.5 rounded hover:bg-slate-50">
            Make Inactive
          </button>
        }
        actions={(acc) => (
          <div className="flex justify-end gap-2">
             <button className="text-indigo-600 hover:text-indigo-800 text-xs font-bold">View register</button>
             <button className="text-slate-400 hover:text-slate-600 text-xs font-medium">Edit</button>
          </div>
        )}
      />

      {showAccountForm && (
        <JumoForm
          title="New Account"
          width="lg"
          submitLabel="Save and Close"
          fields={[
            { id: 'type', label: 'Account Type', type: 'select', required: true, section: 'Classification', options: [
              { value: 'ASSET', label: 'Asset' },
              { value: 'LIABILITY', label: 'Liability' },
              { value: 'EQUITY', label: 'Equity' },
              { value: 'REVENUE', label: 'Revenue' },
              { value: 'EXPENSE', label: 'Expense' }
            ]},
            { id: 'subType', label: 'Detail Type', type: 'text', required: true, section: 'Classification', placeholder: 'e.g. CASH, PAYABLE, INCOME' },
            { id: 'name', label: 'Name', type: 'text', required: true, section: 'Account Details' },
            { id: 'code', label: 'Number', type: 'text', required: true, section: 'Account Details' },
            { id: 'description', label: 'Description', type: 'textarea', required: false, section: 'Account Details' },
            { id: 'currency', label: 'Currency', type: 'text', required: true, section: 'Opening Balance', defaultValue: 'UGX' }
          ]}
          onSubmit={handleAdd}
          onCancel={() => setShowAccountForm(false)}
        />
      )}
    </div>
  );
};
