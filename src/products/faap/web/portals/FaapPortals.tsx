import { FaapJournalEntry, FaapAccount, FaapCashBookEntry } from '../../domain/types';
import React, { useState } from 'react';
import { 
  Landmark, BookOpen, Layers, DollarSign, Calculator, Users, Building, 
  History, Plus, Search, Filter, Download, ArrowRightLeft, 
  CheckCircle2, ShieldAlert, FileSpreadsheet, TrendingUp,
  Receipt, Wallet
} from 'lucide-react';
import { PortalAuthenticationGate } from '../../../PortalAuthenticationGate';
import { FaapService } from '../../domain/FaapService';
import { JumoDataTable } from '../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../core/enterprise/components/JumoForm';
import { JumoWorkflowStatus } from '../../../../core/enterprise/components/JumoWorkflowStatus';
import { formatMoney } from '../../../../utils/formatters';

export const FaapLedgerPortal: React.FC = () => {
  const service = FaapService.getInstance();
  const [journals, setJournals] = useState(service.getJournalEntries());
  const [showEntryForm, setShowEntryForm] = useState(false);

  const handlePost = (data: any) => {
    try {
      service.postUniversalTransaction({
        sourceProduct: 'INTERNAL',
        memo: data.memo,
        debitAccount: data.debitAccount,
        creditAccount: data.creditAccount,
        amount: Number(data.amount)
      });
      setJournals([...service.getJournalEntries()]);
      setShowEntryForm(false);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const accounts = service.getChartOfAccounts().map(a => ({ value: a.code, label: `${a.code} - ${a.name}` }));

  return (
    <PortalAuthenticationGate
      portalId="faap-ledger"
      portalName="FAAP General Ledger Console"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_ACCOUNTANT', 'ROLE_CFO', 'ROLE_FINTECH_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">General Ledger Console</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Double-Entry Persistence • $0.00 Parity Guard • Audit Trail
            </p>
          </div>
          <button 
            onClick={() => setShowEntryForm(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Manual Journal
          </button>
        </div>

        <JumoDataTable<FaapJournalEntry>
          data={journals}
          title="Master Journal Registry"
          columns={[
            { header: 'Entry #', accessor: 'entryNumber', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Date', accessor: 'date', className: 'text-xs font-bold' },
            { header: 'Memo', accessor: 'memo', className: 'font-medium max-w-xs truncate' },
            { header: 'Debit', accessor: (j) => (
              <span className="font-mono font-bold text-slate-900">{formatMoney(j.totalDebit, '')}</span>
            ), className: 'text-right' },
            { header: 'Credit', accessor: (j) => (
              <span className="font-mono font-bold text-slate-900">{formatMoney(j.totalCredit, '')}</span>
            ), className: 'text-right' },
            { header: 'Status', accessor: (j) => <JumoWorkflowStatus status={j.status} /> }
          ]}
        />

        {showEntryForm && (
          <JumoForm
            title="Manual Journal Posting"
            fields={[
              { id: 'date', label: 'Transaction Date', type: 'date', required: true },
              { id: 'memo', label: 'Transaction Memo', type: 'text', required: true },
              { id: 'debitAccount', label: 'Debit Account', type: 'select', required: true, options: accounts },
              { id: 'creditAccount', label: 'Credit Account', type: 'select', required: true, options: accounts },
              { id: 'amount', label: 'Amount (UGX)', type: 'number', required: true }
            ]}
            onSubmit={handlePost}
            onCancel={() => setShowEntryForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};

export const FaapCoaPortal: React.FC = () => {
  const service = FaapService.getInstance();
  const [accounts, setAccounts] = useState(service.getChartOfAccounts());
  const [showAccountForm, setShowAccountForm] = useState(false);

  const handleAdd = (data: any) => {
    service.createAccount(data);
    setAccounts([...service.getChartOfAccounts()]);
    setShowAccountForm(false);
  };

  return (
    <PortalAuthenticationGate
      portalId="faap-coa"
      portalName="Chart of Accounts Registry"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_ACCOUNTANT', 'ROLE_CFO', 'ROLE_FINTECH_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Chart of Accounts</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Hierarchical Registry • 5-Digit Classification
            </p>
          </div>
          <button 
            onClick={() => setShowAccountForm(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-slate-100 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition"
          >
            <Plus className="w-3.5 h-3.5" /> Add Account
          </button>
        </div>

        <JumoDataTable<FaapAccount & { id: string }>
          data={accounts.map(a => ({ ...a, id: a.code }))}
          title="COA Master Registry"
          columns={[
            { header: 'Code', accessor: 'code', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Account Name', accessor: 'name', className: 'font-bold' },
            { header: 'Type', accessor: (a) => (
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-black uppercase">{a.type}</span>
            )},
            { header: 'Sub-Type', accessor: 'subType', className: 'text-xs text-slate-500' },
            { header: 'Balance', accessor: (a) => (
              <span className="font-mono font-bold text-slate-900">{formatMoney(a.balance, a.currency)}</span>
            ), className: 'text-right' }
          ]}
        />

        {showAccountForm && (
          <JumoForm
            title="Add New GL Account"
            fields={[
              { id: 'code', label: 'Account Code (4-5 Digits)', type: 'text', required: true },
              { id: 'name', label: 'Account Name', type: 'text', required: true },
              { id: 'type', label: 'Account Category', type: 'select', required: true, options: [
                { value: 'ASSET', label: 'Asset' },
                { value: 'LIABILITY', label: 'Liability' },
                { value: 'EQUITY', label: 'Equity' },
                { value: 'REVENUE', label: 'Revenue' },
                { value: 'EXPENSE', label: 'Expense' }
              ]},
              { id: 'subType', label: 'Classification', type: 'text', required: true, placeholder: 'e.g. CASH, PAYABLE, INCOME' },
              { id: 'currency', label: 'Base Currency', type: 'text', required: true, defaultValue: 'UGX' }
            ]}
            onSubmit={handleAdd}
            onCancel={() => setShowAccountForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};

export const FaapCashBookPortal: React.FC = () => {
  const service = FaapService.getInstance();
  const [entries, setEntries] = useState(service.getCashBook());
  const [showEntryForm, setShowEntryForm] = useState(false);

  const handleEntry = (data: any) => {
    service.recordCashEntry(data);
    setEntries([...service.getCashBook()]);
    setShowEntryForm(false);
  };

  const accounts = service.getChartOfAccounts().filter(a => a.subType === 'CASH').map(a => ({ value: a.code, label: `${a.code} - ${a.name}` }));

  return (
    <PortalAuthenticationGate
      portalId="faap-cashbook"
      portalName="Cash & Bank Management Office"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_TREASURER', 'ROLE_ACCOUNTANT', 'ROLE_FINTECH_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Cash & Bank Registry</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Contra Entries • Petty Cash • Bank Reconciliations
            </p>
          </div>
          <button 
            onClick={() => setShowEntryForm(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition"
          >
            <Plus className="w-3.5 h-3.5" /> Cash Transaction
          </button>
        </div>

        <JumoDataTable<FaapCashBookEntry>
          data={entries}
          title="Triple-Column Cashbook"
          columns={[
            { header: 'Date', accessor: 'date', className: 'text-xs font-bold' },
            { header: 'Description', accessor: 'description', className: 'font-medium' },
            { header: 'Folio', accessor: 'folioReference', className: 'font-mono text-[10px] text-slate-400' },
            { header: 'Type', accessor: (e) => (
              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${e.type === 'RECEIPT' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                {e.type}
              </span>
            )},
            { header: 'Cash (UGX)', accessor: (e) => (
              <span className="font-mono text-slate-900">{formatMoney(e.cashAmount, '')}</span>
            ), className: 'text-right' },
            { header: 'Bank (UGX)', accessor: (e) => (
              <span className="font-mono text-slate-900">{formatMoney(e.bankAmount, '')}</span>
            ), className: 'text-right' }
          ]}
        />

        {showEntryForm && (
          <JumoForm
            title="Record Cash Transaction"
            fields={[
              { id: 'date', label: 'Date', type: 'date', required: true },
              { id: 'description', label: 'Narration', type: 'text', required: true },
              { id: 'type', label: 'Entry Type', type: 'select', required: true, options: [
                { value: 'RECEIPT', label: 'Receipt (Dr)' },
                { value: 'PAYMENT', label: 'Payment (Cr)' }
              ]},
              { id: 'accountCode', label: 'Contra Account', type: 'select', required: true, options: accounts },
              { id: 'cashAmount', label: 'Cash Amount', type: 'number', required: true },
              { id: 'bankAmount', label: 'Bank Amount', type: 'number', required: true },
              { id: 'folioReference', label: 'Folio Ref', type: 'text', required: true }
            ]}
            onSubmit={handleEntry}
            onCancel={() => setShowEntryForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};
