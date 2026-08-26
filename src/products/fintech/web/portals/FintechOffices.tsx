import React, { useState } from 'react';
import { 
  Building2, Users, Landmark, DollarSign, Heart, ShieldCheck, 
  Clipboard, Activity, Zap, Search, Plus, Filter, Download, Globe, ShieldAlert,
  PieChart, History, HandCoins, FileCheck, CheckCircle2, AlertTriangle, ArrowRight,
  TrendingUp, RefreshCw, Layers, Sparkles, Send, CreditCard, Lock
} from 'lucide-react';
import { PortalAuthenticationGate } from '../../../PortalAuthenticationGate';
import { 
  FintechService, SaccoMember, SaccoLoan, TreasuryAsset, VoteBookEntry, 
  VoteEncumbrance, FinancialReconciliationItem, AuditTrailEvent, PaymentSwitchTx, TaxFilingRecord 
} from '../../domain/FintechService';
import { FaapService, JournalEntry, Account } from '../../../faap/domain/FaapService';
import { JumoDataTable } from '../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../core/enterprise/components/JumoForm';
import { JumoWorkflowStatus } from '../../../../core/enterprise/components/JumoWorkflowStatus';
import { formatNumber, formatDate } from '../../../../utils/formatters';

// ==========================================
// 1. FINTECH EXECUTIVE (CFO OFFICE)
// ==========================================
export const FintechExecutivePortal: React.FC = () => {
  const service = FintechService.getInstance();
  const [assets, setAssets] = useState<TreasuryAsset[]>(service.getAssets());
  const [showAssetForm, setShowAssetForm] = useState(false);
  const totalValuation = assets.reduce((acc, a) => acc + a.valuation, 0);

  const handleAddAsset = (data: any) => {
    service.addTreasuryAsset({
      name: data.name,
      type: data.type,
      valuation: Number(data.valuation),
      currency: data.currency || 'UGX',
      yieldRate: Number(data.yieldRate || 0)
    });
    setAssets([...service.getAssets()]);
    setShowAssetForm(false);
  };

  return (
    <PortalAuthenticationGate
      portalId="fintech-exec"
      portalName="Fintech Executive Office (C-Suite & CFO)"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_FINTECH_ADMIN', 'ROLE_CEO', 'ROLE_CFO']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Fintech Treasury & CFO Office</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Capital Markets • Institutional Assets • ALM & Master Reserves
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
              <PieChart className="w-3.5 h-3.5 text-emerald-400" /> Total AUM: {formatNumber(totalValuation)} UGX
            </div>
            <button 
              onClick={() => setShowAssetForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Acquire Asset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fixed Income & Bonds</span>
            <div className="text-xl font-black text-slate-900 mt-1">850,000,000 UGX</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1 inline-flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +15.5% Weighted Yield
            </span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cash & Settlement Buffer</span>
            <div className="text-xl font-black text-slate-900 mt-1">420,500,000 UGX</div>
            <span className="text-[10px] text-slate-500 font-bold mt-1">Tier-1 Real-time Liquidity</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Commercial Real Estate</span>
            <div className="text-xl font-black text-slate-900 mt-1">1,250,000,000 UGX</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1 inline-flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +9.2% Rental Yield
            </span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Digital Stablecoin Reserves</span>
            <div className="text-xl font-black text-slate-900 mt-1">380,000,000 UGX</div>
            <span className="text-[10px] text-indigo-600 font-bold mt-1">100,000 USDC Collateralized</span>
          </div>
        </div>

        <JumoDataTable<TreasuryAsset>
          data={assets}
          title="Institutional Asset Registry & Valuation Ledger"
          columns={[
            { header: 'Asset ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Asset Name', accessor: 'name', className: 'font-bold' },
            { header: 'Type', accessor: (a) => (
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-black uppercase">{a.type}</span>
            )},
            { header: 'Yield / ROI', accessor: (a) => `${a.yieldRate}% p.a.`, className: 'font-bold text-emerald-600' },
            { header: 'Valuation', accessor: (a) => (
              <span className="font-mono font-bold text-slate-900">{formatNumber(a.valuation)} {a.currency}</span>
            ), className: 'text-right' },
            { header: 'Last Audit', accessor: (a) => new Date(a.lastAudited).toLocaleDateString(), className: 'text-xs text-slate-400' }
          ]}
        />

        {showAssetForm && (
          <JumoForm
            title="Register Institutional Asset"
            fields={[
              { id: 'name', label: 'Asset Name / Instrument', type: 'text', required: true, placeholder: 'e.g. 5-Yr Treasury Note Series A' },
              { id: 'type', label: 'Asset Class', type: 'select', required: true, options: [
                { value: 'BOND', label: 'Sovereign / Corporate Bond' },
                { value: 'CASH', label: 'Cash & Liquidity Buffer' },
                { value: 'REAL_ESTATE', label: 'Commercial Real Estate' },
                { value: 'STABLECOIN', label: 'Digital Asset / Stablecoin' },
                { value: 'EQUITY', label: 'Institutional Equity' }
              ]},
              { id: 'valuation', label: 'Valuation (UGX)', type: 'number', required: true },
              { id: 'yieldRate', label: 'Annual Yield Rate (%)', type: 'number', required: false, placeholder: '12.5' }
            ]}
            onSubmit={handleAddAsset}
            onCancel={() => setShowAssetForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};

// ==========================================
// 2. VOTE BOOK & COMMITMENTS WORKSPACE
// ==========================================
export const FintechVoteBookPortal: React.FC = () => {
  const service = FintechService.getInstance();
  const [voteBook, setVoteBook] = useState<VoteBookEntry[]>(service.getVoteBook());
  const [encumbrances, setEncumbrances] = useState<VoteEncumbrance[]>(service.getVoteEncumbrances());
  const [showEncumbranceForm, setShowEncumbranceForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'VOTES' | 'ENCUMBRANCES'>('VOTES');

  const totalBudget = (voteBook || []).reduce((acc, v) => acc + v.annualBudget, 0);
  const totalCommitments = (voteBook || []).reduce((acc, v) => acc + v.commitments, 0);
  const totalExpenditure = (voteBook || []).reduce((acc, v) => acc + v.expenditure, 0);
  const totalAvailable = (voteBook || []).reduce((acc, v) => acc + v.balanceAvailable, 0);

  const handleCommit = (data: any) => {
    try {
      service.commitVoteEncumbrance(data.voteCode, data.reference, data.description, Number(data.amount), data.vendorName);
      setVoteBook([...service.getVoteBook()]);
      setEncumbrances([...service.getVoteEncumbrances()]);
      setShowEncumbranceForm(false);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleExpense = (id: string) => {
    try {
      service.expenseVoteEncumbrance(id);
      setVoteBook([...service.getVoteBook()]);
      setEncumbrances([...service.getVoteEncumbrances()]);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleRelease = (id: string) => {
    try {
      service.releaseVoteEncumbrance(id);
      setVoteBook([...service.getVoteBook()]);
      setEncumbrances([...service.getVoteEncumbrances()]);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <PortalAuthenticationGate
      portalId="fintech-votebook"
      portalName="Fintech Vote Book & Commitments Office"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_FINTECH_ADMIN', 'ROLE_CONTROLLER', 'ROLE_ACCOUNTANT']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Vote Book & Commitment Ledger</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Budgetary Control • Encumbrances • FAAP Pre-Audit Commitment Enforcer
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab('VOTES')}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'VOTES' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Vote Codes ({(voteBook || []).length})
              </button>
              <button 
                onClick={() => setActiveTab('ENCUMBRANCES')}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ENCUMBRANCES' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Encumbrance Queue ({(encumbrances || []).length})
              </button>
            </div>
            <button 
              onClick={() => setShowEncumbranceForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Commit Budget
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Approved Vote</span>
            <div className="text-xl font-black text-slate-900 mt-1">{formatNumber(totalBudget)} UGX</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Committed (Encumbered)</span>
            <div className="text-xl font-black text-amber-600 mt-1">{formatNumber(totalCommitments)} UGX</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">Actual Expenditure</span>
            <div className="text-xl font-black text-rose-600 mt-1">{formatNumber(totalExpenditure)} UGX</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Available Balance</span>
            <div className="text-xl font-black text-emerald-600 mt-1">{formatNumber(totalAvailable)} UGX</div>
          </div>
        </div>

        {activeTab === 'VOTES' ? (
          <JumoDataTable<VoteBookEntry>
            data={voteBook}
            title="Sovereign Vote Book Status"
            columns={[
              { header: 'Vote Code', accessor: 'voteCode', className: 'font-mono text-xs font-bold text-indigo-600' },
              { header: 'Vote Name', accessor: 'voteName', className: 'font-bold' },
              { header: 'Department', accessor: 'department', className: 'text-xs text-slate-500 font-bold' },
              { header: 'Annual Budget', accessor: (v) => `${formatNumber(v.annualBudget)} UGX`, className: 'text-right font-mono font-bold' },
              { header: 'Commitments', accessor: (v) => `${formatNumber(v.commitments)} UGX`, className: 'text-right font-mono font-bold text-amber-600' },
              { header: 'Expenditure', accessor: (v) => `${formatNumber(v.expenditure)} UGX`, className: 'text-right font-mono font-bold text-rose-600' },
              { header: 'Available', accessor: (v) => `${formatNumber(v.balanceAvailable)} UGX`, className: 'text-right font-mono font-black text-emerald-600' },
              { header: 'Status', accessor: (v) => (
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase">{v.status}</span>
              )}
            ]}
          />
        ) : (
          <JumoDataTable<VoteEncumbrance>
            data={encumbrances}
            title="Active Encumbrance Commitments"
            columns={[
              { header: 'Encumbrance ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
              { header: 'Vote Code', accessor: 'voteCode', className: 'font-mono text-xs font-bold text-indigo-600' },
              { header: 'Reference', accessor: 'reference', className: 'font-bold' },
              { header: 'Vendor', accessor: 'vendorName', className: 'text-xs font-bold' },
              { header: 'Description', accessor: 'description', className: 'text-xs text-slate-600' },
              { header: 'Amount', accessor: (e) => `${formatNumber(e.amount)} UGX`, className: 'font-mono font-black text-slate-900 text-right' },
              { header: 'Date', accessor: 'date', className: 'text-xs text-slate-400' },
              { header: 'Status', accessor: (e) => (
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${e.status === 'COMMITTED' ? 'bg-amber-100 text-amber-700' : e.status === 'EXPENSED' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  {e.status}
                </span>
              )}
            ]}
            actions={(e) => (
              e.status === 'COMMITTED' && (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleExpense(e.id)}
                    className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline"
                  >
                    Expense & Post GL
                  </button>
                  <button 
                    onClick={() => handleRelease(e.id)}
                    className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline"
                  >
                    Release
                  </button>
                </div>
              )
            )}
          />
        )}

        {showEncumbranceForm && (
          <JumoForm
            title="Create Vote Encumbrance"
            fields={[
              { id: 'voteCode', label: 'Vote Code', type: 'select', required: true, options: voteBook.map(v => ({ value: v.voteCode, label: `${v.voteCode} - ${v.voteName} (Avail: ${formatNumber(v.balanceAvailable)} UGX)` })) },
              { id: 'reference', label: 'PO / Requisition Reference', type: 'text', required: true, placeholder: 'PO-2026-XXXX' },
              { id: 'vendorName', label: 'Vendor / Beneficiary Name', type: 'text', required: true, placeholder: 'e.g. Bank of Uganda / MTN Uganda' },
              { id: 'description', label: 'Commitment Purpose', type: 'text', required: true, placeholder: 'e.g. Bandwidth Lease Q3' },
              { id: 'amount', label: 'Encumbrance Amount (UGX)', type: 'number', required: true }
            ]}
            onSubmit={handleCommit}
            onCancel={() => setShowEncumbranceForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};

// ==========================================
// 3. FAAP GENERAL LEDGER WORKSPACE
// ==========================================
export const FintechGeneralLedgerPortal: React.FC = () => {
  const faap = FaapService.getInstance();
  const [journals, setJournals] = useState<JournalEntry[]>(faap.getJournals());
  const [chartOfAccounts] = useState<Account[]>(faap.getChartOfAccounts());
  const [showJournalForm, setShowJournalForm] = useState(false);
  const [parityState, setParityState] = useState(faap.verifyLedgerParity());

  const handlePostJournal = (data: any) => {
    try {
      faap.postUniversalTransaction({
        sourceProduct: 'FINTECH',
        memo: data.memo,
        debitAccount: data.debitAccount,
        creditAccount: data.creditAccount,
        amount: Number(data.amount)
      });
      setJournals([...faap.getJournals()]);
      setParityState(faap.verifyLedgerParity());
      setShowJournalForm(false);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <PortalAuthenticationGate
      portalId="fintech-gl"
      portalName="FAAP General Ledger & Double-Entry Control"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_FINTECH_ADMIN', 'ROLE_CONTROLLER', 'ROLE_ACCOUNTANT']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">FAAP Sovereign General Ledger</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Multi-Entity Double-Entry Backbone • Zero-Offset Parity Engine • Chart of Accounts
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${parityState.isBalanced ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              <CheckCircle2 className="w-3.5 h-3.5" /> Double-Entry Parity: {parityState.isBalanced ? 'BALANCED ($0.00 OFFSET)' : 'IMBALANCED'}
            </div>
            <button 
              onClick={() => setShowJournalForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" /> Post Journal Entry
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Ledger Debits</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{formatNumber(parityState.totalDebits ?? 0)} UGX</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Ledger Credits</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{formatNumber(parityState.totalCredits ?? 0)} UGX</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Parity Variance</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">{(parityState.variance ?? 0).toFixed(2)} UGX</div>
          </div>
        </div>

        <JumoDataTable<JournalEntry>
          data={journals}
          title="General Ledger Journal Audit Index"
          columns={[
            { header: 'Journal ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Memo', accessor: 'memo', className: 'font-bold' },
            { header: 'Source Product', accessor: 'sourceProduct', className: 'text-xs font-mono font-bold text-indigo-600' },
            { header: 'Debit Code', accessor: (j) => `${j.debitAccount} (${formatNumber(j.amount)} UGX)`, className: 'font-mono text-xs text-rose-600 font-bold' },
            { header: 'Credit Code', accessor: (j) => `${j.creditAccount} (${formatNumber(j.amount)} UGX)`, className: 'font-mono text-xs text-emerald-600 font-bold' },
            { header: 'Status', accessor: (j) => (
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase">{j.status}</span>
            )},
            { header: 'Timestamp', accessor: (j) => formatDate(j.timestamp), className: 'text-xs text-slate-400' }
          ]}
        />

        {showJournalForm && (
          <JumoForm
            title="Post Double-Entry Journal Entry"
            fields={[
              { id: 'memo', label: 'Transaction Memo / Narrative', type: 'text', required: true, placeholder: 'e.g. Liquidity Replenishment from Central Bank' },
              { id: 'debitAccount', label: 'Debit Account', type: 'select', required: true, options: chartOfAccounts.map(a => ({ value: a.code, label: `${a.code} - ${a.name} (${a.type})` })) },
              { id: 'creditAccount', label: 'Credit Account', type: 'select', required: true, options: chartOfAccounts.map(a => ({ value: a.code, label: `${a.code} - ${a.name} (${a.type})` })) },
              { id: 'amount', label: 'Transaction Amount (UGX)', type: 'number', required: true }
            ]}
            onSubmit={handlePostJournal}
            onCancel={() => setShowJournalForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};

// ==========================================
// 4. FINANCIAL RECONCILIATION WORKSPACE
// ==========================================
export const FintechReconciliationPortal: React.FC = () => {
  const service = FintechService.getInstance();
  const [feeds, setFeeds] = useState<FinancialReconciliationItem[]>(service.getReconciliationFeeds());
  const [showFeedForm, setShowFeedForm] = useState(false);

  const matchedCount = feeds.filter(f => f.status === 'MATCHED').length;
  const pendingCount = feeds.filter(f => f.status === 'UNRECONCILED').length;
  const varianceCount = feeds.filter(f => f.status === 'VARIANCE_FLAGGED').length;

  const handleMatch = (id: string) => {
    service.reconcileFeedItem(id, `JE-2026-${Math.floor(100 + Math.random() * 900)}`);
    setFeeds([...service.getReconciliationFeeds()]);
  };

  const handleImportFeed = (data: any) => {
    service.importStatementFeed({
      source: data.source,
      transactionRef: data.transactionRef,
      statementDate: data.statementDate || new Date().toISOString().split('T')[0],
      amount: Number(data.amount),
      type: data.type
    });
    setFeeds([...service.getReconciliationFeeds()]);
    setShowFeedForm(false);
  };

  return (
    <PortalAuthenticationGate
      portalId="fintech-reconciliation"
      portalName="Fintech Bank & Switch Reconciliation Office"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_FINTECH_ADMIN', 'ROLE_CONTROLLER', 'ROLE_ACCOUNTANT']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Bank & Switch Reconciliation Engine</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Multi-Rail Automated Matching • Statement Ingestion • Discrepancy Flagging
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowFeedForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Import External Feed
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Reconciled & Matched</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{matchedCount} Feeds</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Pending Reconciliation</span>
            <div className="text-2xl font-black text-amber-600 mt-1">{pendingCount} Feeds</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">Variance Exceptions</span>
            <div className="text-2xl font-black text-rose-600 mt-1">{varianceCount} Discrepancies</div>
          </div>
        </div>

        <JumoDataTable<FinancialReconciliationItem>
          data={feeds}
          title="Bank & Switch Clearing Feeds"
          columns={[
            { header: 'Feed ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Rail / Source', accessor: 'source', className: 'font-bold text-indigo-600' },
            { header: 'Transaction Ref', accessor: 'transactionRef', className: 'font-mono font-bold' },
            { header: 'Statement Date', accessor: 'statementDate', className: 'text-xs text-slate-500' },
            { header: 'Type', accessor: (f) => (
              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${f.type === 'CREDIT' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{f.type}</span>
            )},
            { header: 'Amount', accessor: (f) => `${formatNumber(f.amount)} UGX`, className: 'font-mono font-black text-right text-slate-900' },
            { header: 'Matched Journal', accessor: (f) => f.matchedJournalId || '—', className: 'font-mono text-xs text-slate-400' },
            { header: 'Status', accessor: (f) => (
              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${f.status === 'MATCHED' ? 'bg-emerald-100 text-emerald-700' : f.status === 'UNRECONCILED' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                {f.status}
              </span>
            )}
          ]}
          actions={(f) => (
            f.status === 'UNRECONCILED' && (
              <button 
                onClick={() => handleMatch(f.id)}
                className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline"
              >
                Auto-Match GL
              </button>
            )
          )}
        />

        {showFeedForm && (
          <JumoForm
            title="Ingest Statement Line Feed"
            fields={[
              { id: 'source', label: 'Payment Rail / Channel', type: 'select', required: true, options: [
                { value: 'MTN_MOMO', label: 'MTN Mobile Money Settlement' },
                { value: 'AIRTEL_MONEY', label: 'Airtel Money Clearing' },
                { value: 'STANBIC_BANK', label: 'Stanbic Bank EFT Stream' },
                { value: 'CENTENARY_BANK', label: 'Centenary Bank ACH' },
                { value: 'DIGITAL_PAY_SWITCH', label: 'JUMO Digital Pay Switch' }
              ]},
              { id: 'transactionRef', label: 'Statement Transaction Ref', type: 'text', required: true, placeholder: 'MM-TXN-XXXX' },
              { id: 'amount', label: 'Amount (UGX)', type: 'number', required: true },
              { id: 'type', label: 'Transaction Type', type: 'select', required: true, options: [
                { value: 'CREDIT', label: 'Credit (Inflow)' },
                { value: 'DEBIT', label: 'Debit (Outflow)' }
              ]}
            ]}
            onSubmit={handleImportFeed}
            onCancel={() => setShowFeedForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};

// ==========================================
// 5. AUDIT TRAIL & ZERO-TRUST WORKSPACE
// ==========================================
export const FintechAuditTrailPortal: React.FC = () => {
  const service = FintechService.getInstance();
  const [audits, setAudits] = useState<AuditTrailEvent[]>(service.getAuditTrails());

  return (
    <PortalAuthenticationGate
      portalId="fintech-audit"
      portalName="Fintech Audit Trail & Security Ledger"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_FINTECH_ADMIN', 'ROLE_COMPLIANCE_OFFICER']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Immutable Financial Audit Trail</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Zero-Trust Event Logging • Cryptographic Integrity Hashes • Actor Role Verification
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
            <Lock className="w-3.5 h-3.5 text-emerald-400" /> Ledger Integrity: Verified
          </div>
        </div>

        <JumoDataTable<AuditTrailEvent>
          data={audits}
          title="Cryptographically Sealed Financial Event Log"
          columns={[
            { header: 'Event ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Action', accessor: 'action', className: 'font-bold text-slate-900' },
            { header: 'Module', accessor: 'module', className: 'font-mono text-xs text-indigo-600 font-bold' },
            { header: 'Actor', accessor: (a) => (
              <div>
                <div className="font-bold text-xs">{a.actor}</div>
                <div className="text-[9px] text-slate-400 font-mono">{a.role}</div>
              </div>
            )},
            { header: 'Details', accessor: 'details', className: 'text-xs text-slate-600' },
            { header: 'Severity', accessor: (a) => (
              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${a.severity === 'CRITICAL' || a.severity === 'SECURITY' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'}`}>
                {a.severity}
              </span>
            )},
            { header: 'SHA-256 Hash', accessor: 'integrityHash', className: 'font-mono text-[9px] text-slate-400' },
            { header: 'Timestamp', accessor: (a) => new Date(a.timestamp).toLocaleTimeString(), className: 'text-xs text-slate-400' }
          ]}
        />
      </div>
    </PortalAuthenticationGate>
  );
};

// ==========================================
// 6. UNIVERSAL PAYMENT SWITCH WORKSPACE
// ==========================================
export const FintechPaymentSwitchPortal: React.FC = () => {
  const service = FintechService.getInstance();
  const [transactions, setTransactions] = useState<PaymentSwitchTx[]>(service.getSwitchTransactions());
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const totalVolume = transactions.reduce((acc, t) => acc + t.grossAmount, 0);
  const totalTreasuryFees = transactions.reduce((acc, t) => acc + t.clearingFee, 0);

  const handleProcessPayment = (data: any) => {
    service.processSwitchPayment({
      payerName: data.payerName,
      channel: data.channel,
      amount: Number(data.amount),
      sourceAccount: data.sourceAccount || '1200-MOMO-POOL',
      destinationAccount: data.destinationAccount || '1010-CASH-BANK'
    });
    setTransactions([...service.getSwitchTransactions()]);
    setShowPaymentForm(false);
  };

  return (
    <PortalAuthenticationGate
      portalId="fintech-switch"
      portalName="Universal Payment Switch & Digital Pay"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_FINTECH_ADMIN', 'ROLE_SWITCH_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Universal Payment Switch (Digital Pay)</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Multi-Rail Clearing • 1.5% Master Treasury Deductions • Real-Time Settlement
            </p>
          </div>
          <button 
            onClick={() => setShowPaymentForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition"
          >
            <Zap className="w-3.5 h-3.5" /> Execute Switch Tx
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Switch Turnover</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{formatNumber(totalVolume)} UGX</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">JUMO 1.5% Master Treasury Fees</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">{formatNumber(totalTreasuryFees)} UGX</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Rails</span>
            <div className="text-2xl font-black text-indigo-600 mt-1">MTN / Airtel / EFT / USDC</div>
          </div>
        </div>

        <JumoDataTable<PaymentSwitchTx>
          data={transactions}
          title="Live Switching & Settlement Stream"
          columns={[
            { header: 'Switch Ref', accessor: 'ref', className: 'font-mono text-xs font-bold text-indigo-600' },
            { header: 'Payer / Entity', accessor: 'payerName', className: 'font-bold' },
            { header: 'Rail', accessor: 'channel', className: 'font-mono text-xs font-bold text-slate-600' },
            { header: 'Gross Amount', accessor: (t) => `${formatNumber(t.grossAmount)} UGX`, className: 'font-mono font-bold text-right' },
            { header: '1.5% Clearing Fee', accessor: (t) => `${formatNumber(t.clearingFee)} UGX`, className: 'font-mono font-bold text-emerald-600 text-right' },
            { header: 'Net Settlement', accessor: (t) => `${formatNumber(t.netSettlement)} UGX`, className: 'font-mono font-black text-slate-900 text-right' },
            { header: 'Status', accessor: (t) => (
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase">{t.status}</span>
            )},
            { header: 'Date', accessor: 'date', className: 'text-xs text-slate-400' }
          ]}
        />

        {showPaymentForm && (
          <JumoForm
            title="Execute Switch Settlement Transaction"
            fields={[
              { id: 'payerName', label: 'Payer / Originator Name', type: 'text', required: true, placeholder: 'e.g. Greenhill Academy PTA' },
              { id: 'channel', label: 'Clearing Rail', type: 'select', required: true, options: [
                { value: 'MTN_MOMO', label: 'MTN Mobile Money' },
                { value: 'AIRTEL_MONEY', label: 'Airtel Money' },
                { value: 'BANK_EFT', label: 'Commercial Bank EFT' },
                { value: 'VISA_CARD', label: 'Visa / Mastercard Acquiring' },
                { value: 'STABLECOIN_USDC', label: 'USDC Treasury Settlement' }
              ]},
              { id: 'amount', label: 'Gross Transaction Amount (UGX)', type: 'number', required: true }
            ]}
            onSubmit={handleProcessPayment}
            onCancel={() => setShowPaymentForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};

// ==========================================
// 7. TAX & STATUTORY REVENUE WORKSPACE
// ==========================================
export const FintechTaxPortal: React.FC = () => {
  const service = FintechService.getInstance();
  const [filings, setFilings] = useState<TaxFilingRecord[]>(service.getTaxFilings());
  const [showFilingForm, setShowFilingForm] = useState(false);

  const handleFileTax = (data: any) => {
    service.fileTaxReturn(data.taxType, data.period, Number(data.grossRevenue), Number(data.taxRate || 18));
    setFilings([...service.getTaxFilings()]);
    setShowFilingForm(false);
  };

  return (
    <PortalAuthenticationGate
      portalId="fintech-tax"
      portalName="Tax & Revenue Management Office"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_FINTECH_ADMIN', 'ROLE_TAX_OFFICER']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Tax & Statutory Revenue Office</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              URA Compliance • Indirect Tax Engine • VAT / PAYE / WHT Filing
            </p>
          </div>
          <button 
            onClick={() => setShowFilingForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition"
          >
            <Plus className="w-3.5 h-3.5" /> File Statutory Return
          </button>
        </div>

        <JumoDataTable<TaxFilingRecord>
          data={filings}
          title="Statutory Tax Filings & Settlements"
          columns={[
            { header: 'Filing ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Period', accessor: 'period', className: 'font-bold' },
            { header: 'Tax Type', accessor: 'taxType', className: 'font-mono font-bold text-indigo-600' },
            { header: 'Gross Revenue', accessor: (t) => `${formatNumber(t.grossRevenue)} UGX`, className: 'font-mono font-bold text-right' },
            { header: 'Tax Payable', accessor: (t) => `${formatNumber(t.taxPayable)} UGX`, className: 'font-mono font-black text-rose-600 text-right' },
            { header: 'URA Reference', accessor: 'filingRef', className: 'font-mono text-xs text-slate-500' },
            { header: 'Status', accessor: (t) => (
              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${t.status === 'SETTLED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {t.status}
              </span>
            )},
            { header: 'Due Date', accessor: 'dueDate', className: 'text-xs text-slate-400' }
          ]}
        />

        {showFilingForm && (
          <JumoForm
            title="File Tax Return"
            fields={[
              { id: 'taxType', label: 'Statutory Tax Type', type: 'select', required: true, options: [
                { value: 'VAT', label: 'Value Added Tax (VAT 18%)' },
                { value: 'PAYE', label: 'Pay As You Earn (PAYE)' },
                { value: 'WHT', label: 'Withholding Tax (WHT 6%)' },
                { value: 'CORPORATE_INCOME', label: 'Corporate Income Tax' }
              ]},
              { id: 'period', label: 'Filing Period', type: 'text', required: true, placeholder: '2026-Q3 or 2026-AUG' },
              { id: 'grossRevenue', label: 'Gross Revenue Base (UGX)', type: 'number', required: true },
              { id: 'taxRate', label: 'Effective Tax Rate (%)', type: 'number', required: false, placeholder: '18' }
            ]}
            onSubmit={handleFileTax}
            onCancel={() => setShowFilingForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};

// ==========================================
// 8. SACCO & MICROFINANCE WORKSPACE
// ==========================================
export const SaccoManagementPortal: React.FC = () => {
  const service = FintechService.getInstance();
  const [members, setMembers] = useState<SaccoMember[]>(service.getMembers());
  const [loans, setLoans] = useState<SaccoLoan[]>(service.getLoans());
  const [activeTab, setActiveTab] = useState<'MEMBERS' | 'LOANS'>('MEMBERS');
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [showLoanForm, setShowLoanForm] = useState(false);

  const handleRegisterMember = (data: any) => {
    service.registerMember(data);
    setMembers([...service.getMembers()]);
    setShowMemberForm(false);
  };

  const handleRequestLoan = (data: any) => {
    service.requestLoan(data.memberId, Number(data.amount), data.purpose);
    setLoans([...service.getLoans()]);
    setShowLoanForm(false);
  };

  const handleApproveLoan = (id: string) => {
    service.approveLoan(id);
    setLoans([...service.getLoans()]);
    setMembers([...service.getMembers()]);
  };

  return (
    <PortalAuthenticationGate
      portalId="sacco-mgmt"
      portalName="SACCO & Microfinance Operations Office"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_FINTECH_USER', 'ROLE_FINTECH_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">SACCO & Cooperative Lending Office</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Member Savings • Credit Underwriting • JLG Microfinance • FAAP Loan Portfolios
            </p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('MEMBERS')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'MEMBERS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Members ({(members || []).length})
            </button>
            <button 
              onClick={() => setActiveTab('LOANS')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'LOANS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Loans ({(loans || []).length})
            </button>
          </div>
        </div>

        {activeTab === 'MEMBERS' ? (
          <>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowMemberForm(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition"
              >
                <Plus className="w-3.5 h-3.5" /> Register Member
              </button>
            </div>
            <JumoDataTable<SaccoMember>
              data={members}
              title="SACCO Member Directory"
              columns={[
                { header: 'No.', accessor: 'memberNumber', className: 'font-mono text-xs font-bold text-slate-400' },
                { header: 'Name', accessor: 'name', className: 'font-bold' },
                { header: 'Phone', accessor: 'phone', className: 'text-xs text-slate-500' },
                { header: 'Savings', accessor: (m) => (
                  <span className="font-mono font-bold text-slate-900">{formatNumber(m.savingsBalance)} UGX</span>
                ), className: 'text-right' },
                { header: 'Loan Bal.', accessor: (m) => (
                  <span className="font-mono font-bold text-rose-600">{formatNumber(m.loanBalance)} UGX</span>
                ), className: 'text-right' },
                { header: 'Shares', accessor: 'shares', className: 'text-center font-bold' },
                { header: 'Status', accessor: (m) => <JumoWorkflowStatus status={m.status} /> }
              ]}
              actions={(m) => (
                m.status === 'PENDING' && (
                  <button 
                    onClick={() => { service.approveMember(String(m.id)); setMembers([...service.getMembers()]); }}
                    className="text-[10px] font-black text-emerald-600 uppercase tracking-widest"
                  >
                    Authorize
                  </button>
                )
              )}
            />
          </>
        ) : (
          <>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowLoanForm(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition"
              >
                <HandCoins className="w-3.5 h-3.5" /> Request Loan
              </button>
            </div>
            <JumoDataTable<SaccoLoan>
              data={loans}
              title="SACCO Loan Underwriting Index"
              columns={[
                { header: 'Loan ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
                { header: 'Member', accessor: 'memberName', className: 'font-bold' },
                { header: 'Purpose', accessor: 'purpose', className: 'text-xs text-slate-600' },
                { header: 'Principal', accessor: (l) => (
                  <span className="font-mono font-bold text-slate-900">{formatNumber(l.amount)} UGX</span>
                ), className: 'text-right' },
                { header: 'Interest', accessor: (l) => `${l.interestRate}%`, className: 'text-center font-bold' },
                { header: 'Installment', accessor: (l) => `${formatNumber(l.monthlyInstallment || 0)} UGX/mo`, className: 'font-mono text-xs text-slate-600 text-right' },
                { header: 'Status', accessor: (l) => <JumoWorkflowStatus status={l.status} /> }
              ]}
              actions={(l) => (
                l.status === 'PENDING' && (
                  <button 
                    onClick={() => handleApproveLoan(String(l.id))}
                    className="text-[10px] font-black text-indigo-600 uppercase tracking-widest"
                  >
                    Approve & Disburse (FAAP)
                  </button>
                )
              )}
            />
          </>
        )}

        {showMemberForm && (
          <JumoForm
            title="Member Registration"
            fields={[
              { id: 'name', label: 'Full Name', type: 'text', required: true },
              { id: 'phone', label: 'Phone Number (MoMo Enabled)', type: 'text', required: true, placeholder: '+256772XXXXXX' },
              { id: 'memberNumber', label: 'Membership No.', type: 'text', required: true, placeholder: 'SAC-2026-XXX' },
              { id: 'shares', label: 'Initial Shares Subscribed', type: 'number', required: true }
            ]}
            onSubmit={handleRegisterMember}
            onCancel={() => setShowMemberForm(false)}
          />
        )}

        {showLoanForm && (
          <JumoForm
            title="Loan Origination"
            fields={[
              { id: 'memberId', label: 'Select Member', type: 'select', required: true, options: members.filter(m => m.status === 'APPROVED').map(m => ({ value: m.id, label: `${m.name} (${m.memberNumber})` })) },
              { id: 'amount', label: 'Loan Principal Amount (UGX)', type: 'number', required: true },
              { id: 'purpose', label: 'Loan Purpose', type: 'text', required: true, placeholder: 'e.g. Small business inventory restocking' }
            ]}
            onSubmit={handleRequestLoan}
            onCancel={() => setShowLoanForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};

// ==========================================
// 9. COMPLIANCE & RISK WORKSPACE
// ==========================================
export const FintechCompliancePortal: React.FC = () => (
  <PortalAuthenticationGate
    portalId="fintech-compliance"
    portalName="Compliance & Risk Office (AML/KYC)"
    domainContext="JUMO-FINTECH"
    requiredRoles={['ROLE_FINTECH_ADMIN', 'ROLE_COMPLIANCE_OFFICER']}
    onAuthenticated={() => {}}
  >
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Compliance & Risk Office</h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
            AML Monitoring • KYC Verification • Regulatory Reporting • Sanction Screens
          </p>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4 text-rose-600 font-black text-[10px] uppercase tracking-widest">
          <ShieldAlert className="w-4 h-4" />
          Critical Security & Compliance Alerts
        </div>
        <div className="space-y-2">
          {[
            { msg: 'High-value transaction alert: 150,000,000 UGX (Account #9942)', priority: 'HIGH' },
            { msg: 'KYC Review Pending: 1,420 new signups from Regional Chapters', priority: 'MEDIUM' },
            { msg: 'Quarterly FIA Regulatory Report Due: 4 days', priority: 'URGENT' }
          ].map((alert, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
              <span className="text-xs text-slate-700 font-bold">{alert.msg}</span>
              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${alert.priority === 'URGENT' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                {alert.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </PortalAuthenticationGate>
);
