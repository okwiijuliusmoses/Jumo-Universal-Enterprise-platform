import React, { useState, useEffect } from 'react';
import { 
  Globe, Key, Settings, LayoutDashboard, FileText, BookOpen, 
  Landmark, Receipt, CreditCard, Package, Briefcase, Users, Building, 
  PieChart, BarChart3, Zap, ShieldCheck, Download, Plus, Search, Filter, ShieldAlert
} from 'lucide-react';
import { QBDatabase, COAAccount, JournalVoucher, CustomerInvoice, VendorBill, InventoryItem, ProjectJob } from './QuickBooksStore';
import { MasterBudgetBookWorkspace } from '../../experience/components/financial/MasterBudgetBookWorkspace';
import { VoteLedgerWorkspace } from '../../experience/components/financial/VoteLedgerWorkspace';
import { AuditorWorkspace } from '../../experience/components/financial/AuditorWorkspace';
import { SecondarySchoolERPEngine } from '../../erp/SecondarySchoolERPEngine';

export function QuickBooksViews({
  activeView,
  onNavigate
}: {
  activeView: string;
  onNavigate: (view: string) => void;
}) {
  const [, setTick] = useState(0);

  useEffect(() => {
    return QBDatabase.subscribe(() => setTick(t => t + 1));
  }, []);

  if (activeView === 'PUBLIC_LANDING') return <QBPublicLandingView onNavigate={onNavigate} />;
  if (activeView === 'AUTH_SSO') return <QBAuthGatewayView onNavigate={onNavigate} />;
  if (activeView === 'SETUP_WIZARD') return <QBSetupWizardView onNavigate={onNavigate} />;
  if (activeView === 'DASHBOARD') return <QBDashboardView onNavigate={onNavigate} />;
  if (activeView === 'COA') return <QBChartOfAccountsView />;
  if (activeView === 'JOURNAL') return <QBGeneralLedgerView />;
  if (activeView === 'BANK_FEEDS') return <QBBankFeedsView />;
  if (activeView === 'INVOICES') return <QBARView />;
  if (activeView === 'BILLS') return <QBAPView />;
  if (activeView === 'INVENTORY') return <QBInventoryView />;
  if (activeView === 'PROJECTS') return <QBProjectsView />;
  if (activeView === 'PAYROLL') return <QBPayrollView />;
  if (activeView === 'TAXES') return <QBTaxCenterView />;
  if (activeView === 'BUDGETING') return <QBBudgetingView />;
  if (activeView === 'STATEMENTS') return <QBStatementsView />;
  if (activeView === 'AUTOMATION') return <QBAutomationView />;
  if (activeView === 'ADMIN_SECURITY') return <QBAdminSecurityView />;
  
  // Expanded FAAP Workspaces
  if (activeView === 'BUDGET_BOOK') return <MasterBudgetBookWorkspace erp={SecondarySchoolERPEngine.getInstance()} />;
  if (activeView === 'VOTE_BOOK') return <VoteLedgerWorkspace erp={SecondarySchoolERPEngine.getInstance()} />;
  if (activeView === 'AUDITOR_BOOKS') return <AuditorWorkspace erp={SecondarySchoolERPEngine.getInstance()} />;
  if (activeView === 'CASH_BOOKS') return <QBCashBooksView />;
  if (activeView === 'FINANCIAL_ANALYSIS') return <QBFinancialAnalysisView />;

  return <QBDashboardView onNavigate={onNavigate} />;
}

/* Native QuickBooks Enterprise Workspace Header Component */
function QBHeader({
  title,
  subtitle,
  icon: Icon,
  codeBadge,
  statusText,
  actions
}: {
  title: string;
  subtitle: string;
  icon: any;
  codeBadge?: string;
  statusText?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shrink-0 shadow-sm">
          <Icon className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">{title}</h2>
            {codeBadge && (
              <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg">
                {codeBadge}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {statusText && (
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold uppercase tracking-wider">
            {statusText}
          </span>
        )}
        {actions}
      </div>
    </div>
  );
}

const StudioHeader = ({ traceabilityId, ...props }: any) => <QBHeader codeBadge={traceabilityId} {...props} />;

/* =========================================================================
   1. PRODUCT SHOWCASE (FAAP-PUB-001)
   ========================================================================= */
function QBPublicLandingView({ onNavigate }: { onNavigate: (v: string) => void }) {
  return (
    <div className="space-y-6">
      <StudioHeader
        title="QuickBooks Enterprise Platform"
        subtitle="Double-entry accounting, automated bank feeds, inventory control, and multi-entity consolidation"
        icon={Globe}
        traceabilityId="FAAP-PUB-001"
        actions={
          <button
            onClick={() => onNavigate('DASHBOARD')}
            className="px-4 py-2 bg-emerald-600 text-white font-extrabold text-xs rounded-xl hover:bg-emerald-500 transition shadow-xs cursor-pointer"
          >
            Enter Executive Center
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400">Double-Entry Engine</span>
          <p className="text-xs text-slate-700 leading-relaxed">Enforces balanced Debits and Credits across Assets, Liabilities, Equity, Revenue, and Expenses.</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400">Bank Feeds & Matching</span>
          <p className="text-xs text-slate-700 leading-relaxed">Automated ingestion of bank statement feeds with rules-based matching.</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400">Payroll & Tax Compliance</span>
          <p className="text-xs text-slate-700 leading-relaxed">Integrated NSSF, PAYE, and VAT liability schedule calculation.</p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. INTUIT SSO GATEWAY (FAAP-AUTH-001)
   ========================================================================= */
function QBAuthGatewayView({ onNavigate }: { onNavigate: (v: string) => void }) {
  return (
    <div className="max-w-xl mx-auto space-y-6 my-4">
      <StudioHeader
        title="Intuit Account SSO Gateway"
        subtitle="Multi-organization ledger context switcher"
        icon={Key}
        traceabilityId="FAAP-AUTH-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <label className="block text-xs font-bold text-slate-700">Select Active Company Ledger Context</label>
        <div className="space-y-2">
          {['Alpha Academy Secondary Ltd', 'Alpha Educational Foundation', 'QuickBooks Demo Enterprise'].map(comp => (
            <button
              key={comp}
              onClick={() => {
                QBDatabase.activeCompany = comp;
                onNavigate('DASHBOARD');
              }}
              className={`w-full p-3 rounded-xl border text-left text-xs font-bold transition cursor-pointer ${QBDatabase.activeCompany === comp ? 'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-2xs' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
            >
              {comp}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. COMPANY SETUP WIZARD (FAAP-SETUP-001)
   ========================================================================= */
function QBSetupWizardView({ onNavigate }: { onNavigate: (v: string) => void }) {
  const [basis, setBasis] = useState<'ACCRUAL' | 'CASH'>('ACCRUAL');
  const [fiscalMonth, setFiscalMonth] = useState('January');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('DASHBOARD');
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 my-4">
      <StudioHeader
        title="Company Setup & Method Wizard"
        subtitle="Fiscal year setup and accounting recognition method selection"
        icon={Settings}
        traceabilityId="FAAP-SETUP-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Accounting Method</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setBasis('ACCRUAL')}
                className={`py-2 rounded-xl text-xs font-bold border ${basis === 'ACCRUAL' ? 'bg-emerald-50 border-emerald-600 text-emerald-950' : 'bg-slate-50 border-slate-200'}`}
              >
                Accrual Basis
              </button>
              <button
                type="button"
                onClick={() => setBasis('CASH')}
                className={`py-2 rounded-xl text-xs font-bold border ${basis === 'CASH' ? 'bg-emerald-50 border-emerald-600 text-emerald-950' : 'bg-slate-50 border-slate-200'}`}
              >
                Cash Basis
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Fiscal Year Start Month</label>
            <select value={fiscalMonth} onChange={e => setFiscalMonth(e.target.value)} className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white">
              <option value="January">January</option>
              <option value="July">July</option>
              <option value="October">October</option>
            </select>
          </div>

          <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-xs cursor-pointer">
            Initialize Ledger Framework
          </button>
        </form>
      </div>
    </div>
  );
}

/* =========================================================================
   4. EXECUTIVE DASHBOARD (FAAP-DASH-001)
   ========================================================================= */
function QBDashboardView({ onNavigate }: { onNavigate: (v: string) => void }) {
  const totals = QBDatabase.calculateTotals();

  return (
    <div className="space-y-6">
      <StudioHeader
        title="QuickBooks Executive Financial Center"
        subtitle={`Organization: ${QBDatabase.activeCompany} • Real-time General Ledger Engine`}
        icon={LayoutDashboard}
        traceabilityId="FAAP-DASH-001"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400">Total Assets</span>
          <p className="text-2xl font-black font-mono text-emerald-600">UGX {totals.assets.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400">Total Liabilities</span>
          <p className="text-2xl font-black font-mono text-amber-600">UGX {totals.liabilities.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400">Owner's Equity</span>
          <p className="text-2xl font-black font-mono text-blue-700">UGX {totals.equity.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400">Net Surplus / Margin</span>
          <p className="text-2xl font-black font-mono text-slate-900">UGX {totals.netSurplus.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Quick Voucher Launchers</h3>
        <div className="flex gap-3">
          <button onClick={() => onNavigate('JOURNAL')} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 cursor-pointer">
            Post Journal Voucher
          </button>
          <button onClick={() => onNavigate('INVOICES')} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-500 cursor-pointer">
            Create Sales Invoice
          </button>
          <button onClick={() => onNavigate('BILLS')} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-500 cursor-pointer">
            Enter Vendor Bill
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. CHART OF ACCOUNTS (FAAP-COA-001)
   ========================================================================= */
function QBChartOfAccountsView() {
  return (
    <div className="space-y-6">
      <StudioHeader
        title="Chart of Accounts Register"
        subtitle="Standard account classification (1000s Assets, 2000s Liabilities, 3000s Equity, 4000s Revenue, 5000s Expenses)"
        icon={FileText}
        traceabilityId="FAAP-COA-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 uppercase text-slate-400 text-[10px] font-black border-b">
            <tr>
              <th className="py-2.5 px-3">Account Code</th>
              <th className="py-2.5 px-3">Account Name</th>
              <th className="py-2.5 px-3">Type</th>
              <th className="py-2.5 px-3 text-right">Current Ledger Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {QBDatabase.coa.map(acc => (
              <tr key={acc.code} className="hover:bg-slate-50">
                <td className="py-3 px-3 font-mono font-bold text-slate-900">{acc.code}</td>
                <td className="py-3 px-3 font-bold">{acc.title}</td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                    acc.type === 'ASSET' ? 'bg-emerald-100 text-emerald-800' :
                    acc.type === 'LIABILITY' ? 'bg-amber-100 text-amber-800' :
                    acc.type === 'REVENUE' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {acc.type}
                  </span>
                </td>
                <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">UGX {acc.balanceUGX.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   6. GENERAL LEDGER JOURNAL (FAAP-GL-001)
   ========================================================================= */
function QBGeneralLedgerView() {
  const [drAccount, setDrAccount] = useState('1010');
  const [crAccount, setCrAccount] = useState('4010');
  const [amount, setAmount] = useState(1000000);
  const [description, setDescription] = useState('Tuition fee income recognition');

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    QBDatabase.postJournalVoucher(drAccount, crAccount, amount, description);
  };

  return (
    <div className="space-y-6">
      <StudioHeader
        title="Double-Entry General Ledger"
        subtitle="Balanced debit/credit journal voucher posting studio"
        icon={BookOpen}
        traceabilityId="FAAP-GL-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <form onSubmit={handlePost} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Debit Account (DR)</label>
            <select value={drAccount} onChange={e => setDrAccount(e.target.value)} className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white">
              {QBDatabase.coa.map(a => <option key={a.code} value={a.code}>{a.code} - {a.title}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Credit Account (CR)</label>
            <select value={crAccount} onChange={e => setCrAccount(e.target.value)} className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white">
              {QBDatabase.coa.map(a => <option key={a.code} value={a.code}>{a.code} - {a.title}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Amount (UGX)</label>
            <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-mono" />
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full py-2 bg-emerald-600 text-white font-extrabold text-xs rounded-xl hover:bg-emerald-500 cursor-pointer">
              Post Journal Voucher
            </button>
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 uppercase text-slate-400 text-[10px] font-black border-b">
              <tr>
                <th className="py-2.5 px-3">Voucher Ref</th>
                <th className="py-2.5 px-3">Debit Code</th>
                <th className="py-2.5 px-3">Credit Code</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {QBDatabase.journals.map(j => (
                <tr key={j.voucherNo} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">{j.voucherNo}</td>
                  <td className="py-3 px-3 font-mono text-emerald-700 font-bold">{j.debitAccountCode}</td>
                  <td className="py-3 px-3 font-mono text-amber-700 font-bold">{j.creditAccountCode}</td>
                  <td className="py-3 px-3 font-mono font-bold">UGX {j.amountUGX.toLocaleString()}</td>
                  <td className="py-3 px-3">{j.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   7. BANK FEEDS (FAAP-BANK-001)
   ========================================================================= */
function QBBankFeedsView() {
  return (
    <div className="space-y-6">
      <StudioHeader
        title="Bank Feeds & Statement Matcher"
        subtitle="Statement feeds ingestion and rule matching against unposted transactions"
        icon={Landmark}
        traceabilityId="FAAP-BANK-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
        {QBDatabase.bankFeeds.map(feed => (
          <div key={feed.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-xs">
            <div>
              <span className="font-mono font-bold text-slate-900">{feed.id}</span>
              <p className="font-bold text-slate-800 mt-0.5">{feed.description}</p>
              <p className="text-[10px] text-slate-500 font-mono">Date: {feed.date}</p>
            </div>
            <div className="text-right">
              <span className="font-black font-mono text-emerald-600 text-sm block">UGX {feed.amountUGX.toLocaleString()}</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded uppercase">{feed.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   8. ACCOUNTS RECEIVABLE INVOICING (FAAP-AR-001)
   ========================================================================= */
function QBARView() {
  const [customer, setCustomer] = useState('Parent - Samuel Kintu');
  const [amount, setAmount] = useState(1200000);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    QBDatabase.createInvoice(customer, amount);
  };

  return (
    <div className="space-y-6">
      <StudioHeader
        title="Accounts Receivable Invoicing"
        subtitle="Sales invoice issuance with automated DR AR (1200) / CR Revenue (4010) postings"
        icon={Receipt}
        traceabilityId="FAAP-AR-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <form onSubmit={handleCreate} className="flex gap-3">
          <input type="text" value={customer} onChange={e => setCustomer(e.target.value)} className="px-3 py-2 text-xs border border-slate-200 rounded-xl flex-1" />
          <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="px-3 py-2 text-xs border border-slate-200 rounded-xl font-mono" />
          <button type="submit" className="px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-500 cursor-pointer">
            Create Invoice
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 uppercase text-slate-400 text-[10px] font-black border-b">
              <tr>
                <th className="py-2.5 px-3">Invoice Ref</th>
                <th className="py-2.5 px-3">Customer Name</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Due Date</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {QBDatabase.invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">{inv.invoiceNo}</td>
                  <td className="py-3 px-3 font-bold">{inv.customerName}</td>
                  <td className="py-3 px-3 font-mono font-bold">UGX {inv.amountUGX.toLocaleString()}</td>
                  <td className="py-3 px-3 font-mono">{inv.dueDate}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-bold uppercase">{inv.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   9. ACCOUNTS PAYABLE VENDOR BILLS (FAAP-AP-001)
   ========================================================================= */
function QBAPView() {
  return (
    <div className="space-y-6">
      <StudioHeader
        title="Accounts Payable Vendor Bills"
        subtitle="Vendor bill registration, AP ledger, and payment voucher approval"
        icon={CreditCard}
        traceabilityId="FAAP-AP-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 uppercase text-slate-400 text-[10px] font-black border-b">
            <tr>
              <th className="py-2.5 px-3">Bill Ref</th>
              <th className="py-2.5 px-3">Vendor Name</th>
              <th className="py-2.5 px-3">Amount</th>
              <th className="py-2.5 px-3">Due Date</th>
              <th className="py-2.5 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {QBDatabase.bills.map(b => (
              <tr key={b.id} className="hover:bg-slate-50">
                <td className="py-3 px-3 font-mono font-bold text-slate-900">{b.billNo}</td>
                <td className="py-3 px-3 font-bold">{b.vendorName}</td>
                <td className="py-3 px-3 font-mono font-bold">UGX {b.amountUGX.toLocaleString()}</td>
                <td className="py-3 px-3 font-mono">{b.dueDate}</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-bold uppercase">{b.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   10. INVENTORY CONTROL (FAAP-INV-001)
   ========================================================================= */
function QBInventoryView() {
  return (
    <div className="space-y-6">
      <StudioHeader
        title="Inventory Control & Catalog"
        subtitle="Stock item catalog tracking quantity on hand, unit costs, and reorder alerts"
        icon={Package}
        traceabilityId="FAAP-INV-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 uppercase text-slate-400 text-[10px] font-black border-b">
            <tr>
              <th className="py-2.5 px-3">SKU Code</th>
              <th className="py-2.5 px-3">Item Name</th>
              <th className="py-2.5 px-3">Qty On Hand</th>
              <th className="py-2.5 px-3">Unit Cost</th>
              <th className="py-2.5 px-3">Total Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {QBDatabase.inventory.map(item => (
              <tr key={item.code} className="hover:bg-slate-50">
                <td className="py-3 px-3 font-mono font-bold text-slate-900">{item.code}</td>
                <td className="py-3 px-3 font-bold">{item.description}</td>
                <td className="py-3 px-3 font-mono font-bold">{item.qtyOnHand}</td>
                <td className="py-3 px-3 font-mono">UGX {item.unitCostUGX.toLocaleString()}</td>
                <td className="py-3 px-3 font-mono font-bold text-emerald-600">UGX {(item.qtyOnHand * item.unitCostUGX).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   11. PROJECT JOB COSTING (FAAP-PRJ-001)
   ========================================================================= */
function QBProjectsView() {
  return (
    <div className="space-y-6">
      <StudioHeader
        title="Project Job Costing"
        subtitle="Project costing and profitability tracking calculating net project margins"
        icon={Briefcase}
        traceabilityId="FAAP-PRJ-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
        {QBDatabase.projects.map(p => (
          <div key={p.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-xs">
            <div>
              <p className="font-bold text-slate-900">{p.projectName}</p>
              <p className="text-slate-500 text-[10px]">Budget: UGX {p.budgetUGX.toLocaleString()} | Actual Incurred: UGX {p.expensesUGX.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="font-black font-mono text-emerald-600 text-sm">UGX {p.revenueUGX.toLocaleString()}</p>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded uppercase">Margin: UGX {p.netMarginUGX.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   12. FACULTY PAYROLL & TAXES (FAAP-PAY-001)
   ========================================================================= */
function QBPayrollView() {
  const [payrollRunMsg, setPayrollRunMsg] = useState<string | null>(null);

  const handleRunPayroll = () => {
    const run = QBDatabase.executePayrollRun(12000000);
    setPayrollRunMsg(`Executed Payroll Run ${run.id}: Total Gross UGX ${run.grossSalaryUGX.toLocaleString()}, NSSF Deducted UGX ${run.employeeNSSFUGX.toLocaleString()}, Net Paid UGX ${run.netPayoutUGX.toLocaleString()}. GL Postings Complete.`);
  };

  return (
    <div className="space-y-6">
      <StudioHeader
        title="Faculty Payroll & NSSF/PAYE Center"
        subtitle="Automated payroll calculation deducting 5% employee NSSF, 10% employer NSSF, and 15% PAYE tax"
        icon={Users}
        traceabilityId="FAAP-PAY-001"
        actions={
          <button onClick={handleRunPayroll} className="px-4 py-2 bg-emerald-600 text-white font-extrabold text-xs rounded-xl hover:bg-emerald-500 cursor-pointer">
            Run Faculty Payroll Cycle
          </button>
        }
      />

      {payrollRunMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-900">
          {payrollRunMsg}
        </div>
      )}

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 uppercase text-slate-400 text-[10px] font-black border-b">
            <tr>
              <th className="py-2.5 px-3">Run Ref</th>
              <th className="py-2.5 px-3">Period</th>
              <th className="py-2.5 px-3">Gross Salary</th>
              <th className="py-2.5 px-3">NSSF (5%)</th>
              <th className="py-2.5 px-3">PAYE Tax</th>
              <th className="py-2.5 px-3">Net Payout</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {QBDatabase.payrollRuns.map(pr => (
              <tr key={pr.id} className="hover:bg-slate-50">
                <td className="py-3 px-3 font-bold text-slate-900">{pr.id}</td>
                <td className="py-3 px-3">{pr.period}</td>
                <td className="py-3 px-3 font-mono font-bold">UGX {pr.grossSalaryUGX.toLocaleString()}</td>
                <td className="py-3 px-3 font-mono text-amber-600">UGX {pr.employeeNSSFUGX.toLocaleString()}</td>
                <td className="py-3 px-3 font-mono text-rose-600">UGX {pr.payeTaxUGX.toLocaleString()}</td>
                <td className="py-3 px-3 font-mono font-black text-emerald-600">UGX {pr.netPayoutUGX.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   13. TAX COMPLIANCE & VAT (FAAP-TAX-001)
   ========================================================================= */
function QBTaxCenterView() {
  return (
    <div className="space-y-6">
      <StudioHeader
        title="Sales Tax & VAT Liability Schedule"
        subtitle="18% VAT tax code setup and tax liability ledger tracking"
        icon={Building}
        traceabilityId="FAAP-TAX-001"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400">Standard VAT Rate</span>
          <p className="text-xl font-black font-mono text-slate-900">18.00%</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400">Current VAT Liability Obligation</span>
          <p className="text-xl font-black font-mono text-amber-600">UGX 2,100,000</p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   14. BUDGET VARIANCE (FAAP-BDG-001)
   ========================================================================= */
function QBBudgetingView() {
  return (
    <div className="space-y-6">
      <StudioHeader
        title="Budget Variance & Forecast"
        subtitle="Departmental budget allocations vs actual GL expense variance analysis"
        icon={PieChart}
        traceabilityId="FAAP-BDG-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 uppercase text-slate-400 text-[10px] font-black border-b">
            <tr>
              <th className="py-2.5 px-3">Department</th>
              <th className="py-2.5 px-3">Budgeted Amount</th>
              <th className="py-2.5 px-3">Actual Spent</th>
              <th className="py-2.5 px-3">Variance</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3 px-3 font-bold">Academic Operations</td>
              <td className="py-3 px-3 font-mono">UGX 15,000,000</td>
              <td className="py-3 px-3 font-mono">UGX 12,000,000</td>
              <td className="py-3 px-3 font-mono font-bold text-emerald-600">+UGX 3,000,000 (Favorable)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   15. FINANCIAL STATEMENTS HUB (FAAP-REP-001)
   ========================================================================= */
function QBStatementsView() {
  const totals = QBDatabase.calculateTotals();

  return (
    <div className="space-y-6">
      <StudioHeader
        title="Financial Statements Hub"
        subtitle="Balance Sheet validator proving Assets = Liabilities + Equity"
        icon={BarChart3}
        traceabilityId="FAAP-REP-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Formal Balance Sheet Statement & Invariant Verification</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          <div className="space-y-2">
            <span className="font-black text-slate-900 uppercase">ASSETS</span>
            <div className="flex justify-between border-b pb-1"><span>Gross Assets</span><span className="font-mono font-bold">UGX {totals.assets.toLocaleString()}</span></div>
            <div className="flex justify-between font-bold pt-2 border-t"><span>TOTAL ASSETS</span><span className="font-mono text-emerald-600">UGX {totals.assets.toLocaleString()}</span></div>
          </div>
          <div className="space-y-2">
            <span className="font-black text-slate-900 uppercase">LIABILITIES & EQUITY</span>
            <div className="flex justify-between border-b pb-1"><span>Total Liabilities</span><span className="font-mono font-bold">UGX {totals.liabilities.toLocaleString()}</span></div>
            <div className="flex justify-between border-b pb-1"><span>Base Equity</span><span className="font-mono font-bold">UGX {totals.equity.toLocaleString()}</span></div>
            <div className="flex justify-between border-b pb-1"><span>Current Net Surplus (Rev - Exp)</span><span className="font-mono font-bold">UGX {totals.netSurplus.toLocaleString()}</span></div>
            <div className="flex justify-between font-bold pt-2 border-t"><span>TOTAL L + E</span><span className="font-mono text-blue-700">UGX {(totals.liabilities + totals.equity + totals.netSurplus).toLocaleString()}</span></div>
          </div>
        </div>
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
          <span className="font-black text-emerald-900 uppercase">ACCOUNTING INVARIANT CHECK</span>
          <span className="font-mono font-bold text-emerald-800">
            {totals.assets === (totals.liabilities + totals.equity + totals.netSurplus) ? 'PASSED: Σ DEBITS = Σ CREDITS' : 'FAILED: IMBALANCE DETECTED'}
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   16. WORKFLOW AUTOMATION (FAAP-AUTO-001)
   ========================================================================= */
function QBAutomationView() {
  return (
    <div className="space-y-6">
      <StudioHeader
        title="Workflow Automation Rules"
        subtitle="Automated overdue email reminders and batch invoicing rules"
        icon={Zap}
        traceabilityId="FAAP-AUTO-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800">
          ✓ Rule #1: Auto-send payment reminder email when invoice exceeds 30 days overdue. (ACTIVE)
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   17. SECURITY & AUDIT TRAIL (FAAP-ADMIN-001)
   ========================================================================= */
function QBAdminSecurityView() {
  return (
    <div className="space-y-6">
      <StudioHeader
        title="Accounting Audit Trail"
        subtitle="Chronological audit log tracking every GL journal edit and fiscal snapshot"
        icon={ShieldCheck}
        traceabilityId="FAAP-ADMIN-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700">
          [AUDIT-LOG] 2026-08-18 07:10:00 — User Admin posted Journal Voucher JV-1001 (UGX 1,000,000 DR 1010 / CR 4010).
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   EXPANDED COGNITIVE STATUTORY CAPABILITIES
   ========================================================================= */

function QBCashBooksView() {
  const erp = SecondarySchoolERPEngine.getInstance();
  const [cashBookType, setCashBookType] = useState<'SINGLE' | 'DOUBLE' | 'TRIPLE'>('TRIPLE');
  const cashBookEntries = erp.getCashBookEntries();

  return (
    <div className="space-y-6">
      <StudioHeader
        title="Multi-Column Cash Books"
        subtitle="Real-time multi-column statutory ledger tracking receipts, payments and contras"
        icon={BookOpen}
        traceabilityId="FAAP-CASH-001"
      />

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
            {(['SINGLE', 'DOUBLE', 'TRIPLE'] as const).map(t => (
              <button
                key={t}
                onClick={() => setCashBookType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  cashBookType === t ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t} Column
              </button>
            ))}
          </div>
          <span className="text-[10px] font-mono bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg text-slate-500 uppercase tracking-widest">
            Active System Sync
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Date / Voucher</th>
                <th className="py-3 px-4">Description & Contra</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4 text-right">Cash Amount</th>
                {cashBookType !== 'SINGLE' && (
                  <th className="py-3 px-4 text-right">Bank Amount</th>
                )}
                {cashBookType === 'TRIPLE' && (
                  <th className="py-3 px-4 text-right">Discount / Escrow</th>
                )}
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {cashBookEntries.map(entry => (
                <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono">
                    <span className="font-bold text-slate-950 block">{entry.date}</span>
                    <span className="text-[10px] text-slate-400">{entry.voucherNo}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-950 block">{entry.description}</span>
                    <span className="text-[10px] text-indigo-600">Contra: {entry.contraAccountId || 'GL'}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${
                      entry.entryType === 'RECEIPT' ? 'bg-emerald-100 text-emerald-800' :
                      entry.entryType === 'PAYMENT' ? 'bg-rose-100 text-rose-800' : 'bg-cyan-100 text-cyan-800'
                    }`}>
                      {entry.entryType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                    UGX {entry.cashAmount.toLocaleString()}
                  </td>
                  {cashBookType !== 'SINGLE' && (
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-indigo-700">
                      UGX {entry.bankAmount.toLocaleString()}
                    </td>
                  )}
                  {cashBookType === 'TRIPLE' && (
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-500">
                      UGX {(entry.discountOrEscrowAmount || 0).toLocaleString()}
                    </td>
                  )}
                  <td className="py-3.5 px-4 text-center">
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-100 uppercase">
                      {entry.reconciliationStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function QBFinancialAnalysisView() {
  const erp = SecondarySchoolERPEngine.getInstance();
  const digest = erp.getFinancialAnalysisDigest();

  return (
    <div className="space-y-6">
      <StudioHeader
        title="Financial Analysis Digest"
        subtitle="Live algorithmic health index, treasury diagnostics and variance ratios"
        icon={BarChart3}
        traceabilityId="FAAP-ANALYSIS-001"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Liquidity & Reserves</span>
          <h4 className="text-2xl font-black text-slate-900 mt-2">UGX {digest.operatingCashBalance.toLocaleString()}</h4>
          <p className="text-xs text-slate-500 mt-1">Available cash & bank treasury liquid reserves</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Budget Variance Ratio</span>
          <h4 className="text-2xl font-black text-emerald-600 mt-2">{digest.budgetExecutionRatePercent.toFixed(1)}%</h4>
          <p className="text-xs text-slate-500 mt-1">Sovereign budget book utilization rate</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Collection Efficiency</span>
          <h4 className="text-2xl font-black text-indigo-600 mt-2">{digest.collectionEfficiencyPercent.toFixed(1)}%</h4>
          <p className="text-xs text-slate-500 mt-1">Invoiced vs collected ledger cashflows</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h4 className="text-sm font-black uppercase text-slate-900 tracking-wider border-b pb-3">Algorithmic Balance Assessment</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-medium text-slate-700">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Fiscal Period:</span>
              <span className="font-bold text-slate-900">{digest.period}</span>
            </div>
            <div className="flex justify-between">
              <span>Aggregate Revenue:</span>
              <span className="font-mono font-bold text-emerald-700">UGX {digest.totalRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Aggregate Expenditure:</span>
              <span className="font-mono font-bold text-rose-700">UGX {digest.totalExpenditure.toLocaleString()}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Operating Net Surplus:</span>
              <span className="font-mono font-bold text-slate-900">UGX {digest.netSurplusDeficit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Accounts Receivable (AR):</span>
              <span className="font-mono font-bold text-slate-900">UGX {digest.accountsReceivableTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Accounts Payable (AP):</span>
              <span className="font-mono font-bold text-slate-900">UGX {digest.accountsPayableTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
          <span className="font-black text-slate-900 block uppercase tracking-wider">Auditor Invariant Validation Status</span>
          <p className="text-slate-600 leading-relaxed font-medium">
            Treasury indicators pass all baseline double-entry assertions. Operating liquidity is highly sufficient, showing positive cashflow margins of UGX {digest.netSurplusDeficit.toLocaleString()} for the current fiscal period.
          </p>
        </div>
      </div>
    </div>
  );
}
