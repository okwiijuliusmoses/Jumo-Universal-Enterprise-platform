import React, { useState } from 'react';
import { 
  Landmark, Users, DollarSign, Shield, CreditCard, ArrowLeft, 
  Search, Plus, CheckCircle2, ChevronRight, UserCheck, Send, Eye, RefreshCw, Sliders, Activity, FileText
} from 'lucide-react';
import { FINTECH_MANIFEST } from '../manifest';
import { FINTECH_MODULES } from '../modules';
import { faapClient } from '../../../platforms/contracts/faapContract';
import { digitalPayClient } from '../../../platforms/contracts/digitalPayContract';
import { EnterpriseWorkspaceLayout } from '../../../components/EnterpriseWorkspaceLayout';

export interface FintechStandaloneAppProps {
  onBackToLauncher?: () => void;
}

// FTERP Officer Portals Definition
const FINTECH_PORTALS = [
  {
    id: 'FT-PORTAL-CEO-BOARD',
    code: 'EXECUTIVE_COCKPIT',
    title: 'CEO & Board of Directors Core Banking Cockpit',
    role: 'Chief Executive Officer / General Manager',
    office: 'Chief Executive Office & Boardroom',
    directorate: 'Directorate of Core Banking, Strategy & Governance',
    moduleIds: ['FT-MOD-MEMBER-KYC', 'FT-MOD-SAVINGS-ACCOUNTS', 'FT-MOD-SHARE-CAPITAL', 'FT-MOD-LOAN-UNDERWRITING', 'FT-MOD-GENERAL-LEDGER', 'FT-MOD-UMRA-COMPLIANCE']
  },
  {
    id: 'FT-PORTAL-CREDIT-COMMITTEE',
    code: 'CREDIT_OFFICER_PORTAL',
    title: 'SACCO Credit Officer & Loan Underwriting Portal',
    role: 'Senior Credit Officer / Underwriter',
    office: 'Credit Appraisal & Loan Committee Desk',
    directorate: 'Directorate of Credit Risk, Underwriting & Recovery',
    moduleIds: ['FT-MOD-LOAN-UNDERWRITING', 'FT-MOD-CRB-COLLATERAL']
  },
  {
    id: 'FT-PORTAL-STAFF-CORE',
    code: 'TELLER_VAULT_TERMINAL',
    title: 'Chief Cashier, Teller & Strongroom Vault Terminal',
    role: 'Chief Teller / Branch Cashier',
    office: 'Strongroom Vault Counter & Tellers',
    directorate: 'Directorate of Core Banking & Cash Operations',
    moduleIds: ['FT-MOD-MEMBER-KYC', 'FT-MOD-SAVINGS-ACCOUNTS', 'FT-MOD-VAULT-CASH', 'FT-MOD-DIGITAL-MOMO']
  },
  {
    id: 'FT-PORTAL-COMPLIANCE',
    code: 'CFO_GL_TERMINAL',
    title: 'Financial Controller & UMRA Regulatory Terminal',
    role: 'Chief Financial Officer / Compliance MLRO',
    office: 'CFO & General Ledger Desk',
    directorate: 'Directorate of Compliance, Audit & FAAP GL',
    moduleIds: ['FT-MOD-GENERAL-LEDGER', 'FT-MOD-UMRA-COMPLIANCE', 'FT-MOD-DIGITAL-MOMO']
  }
];

export function FintechStandaloneApp({ onBackToLauncher }: FintechStandaloneAppProps) {
  const [activePortalId, setActivePortalId] = useState<string>('FT-PORTAL-CREDIT-COMMITTEE');
  const [activeModuleId, setActiveModuleId] = useState<string>('FT-MOD-LOAN-UNDERWRITING');
  const [activeTab, setActiveTab] = useState<'RECORDS' | 'FORM' | 'ANALYTICS'>('RECORDS');
  const [searchQuery, setSearchQuery] = useState('');
  const [executionMessage, setExecutionMessage] = useState<string | null>(null);

  const [formState, setFormState] = useState<Record<string, string>>({});

  const currentPortal = FINTECH_PORTALS.find(p => p.id === activePortalId) || FINTECH_PORTALS[1];
  const availableModules = FINTECH_MODULES.filter(m => currentPortal.moduleIds.includes(m.id));
  const currentModule = FINTECH_MODULES.find(m => m.id === activeModuleId) || availableModules[0] || FINTECH_MODULES[0];

  // Live Core Banking Datasets
  const [members, setMembers] = useState([
    { id: 'MEM-2001', name: 'John Baptist Otim', nin: 'CM840121009KLA', phone: '+256 772 334455', savingsBalance: 4250000, shares: 50, status: 'ACTIVE_MEMBER' },
    { id: 'MEM-2002', name: 'Harriet Namukasa', nin: 'CF900314008EBB', phone: '+256 782 112233', savingsBalance: 1850000, shares: 20, status: 'ACTIVE_MEMBER' },
    { id: 'MEM-2003', name: 'Mbabazi Farmers Cooperative', nin: 'REG-COOP-8821', phone: '+256 701 998877', savingsBalance: 12400000, shares: 200, status: 'CORPORATE' }
  ]);

  const [loans, setLoans] = useState([
    { id: 'LOAN-801', borrower: 'John Baptist Otim', amount: 5000000, interestRate: '15% p.a.', dscr: '2.4x', collateral: 'Toyota Premio Logbook', crbScore: 740, status: 'PERFORMING', balance: 3200000 },
    { id: 'LOAN-802', borrower: 'Harriet Namukasa', amount: 2000000, interestRate: '15% p.a.', dscr: '1.8x', collateral: 'Kibanja Land Agreement', crbScore: 680, status: 'UNDERWRITTEN', balance: 2000000 }
  ]);

  const [vaultTransactions] = useState([
    { id: 'TX-401', member: 'John Baptist Otim', type: 'CASH_DEPOSIT', amount: 500000, teller: 'Teller 01', time: '2026-08-31 09:15 AM' },
    { id: 'TX-402', member: 'Harriet Namukasa', type: 'C2B_MOMO_SAVINGS', amount: 200000, teller: 'Digital Pay Switch', time: '2026-08-31 10:30 AM' }
  ]);

  const [collaterals] = useState([
    { id: 'COL-701', owner: 'John Baptist Otim', asset: 'Toyota Premio Logbook UBF 412X', valuationUGX: 12000000, crbStatus: 'VERIFIED_CLEAN' },
    { id: 'COL-702', owner: 'Harriet Namukasa', asset: 'Kibanja Land Agreement (Wakiso Block 4)', valuationUGX: 8500000, crbStatus: 'VERIFIED_CLEAN' }
  ]);

  const [generalLedger] = useState([
    { id: 'GL-901', vote: 'VOTE-1002-LOANS', account: 'Loan Portfolio Asset', debit: 5000000, credit: 0, status: 'FAAP_BALANCED' },
    { id: 'GL-902', vote: 'VOTE-2001-SAVINGS', account: 'Member Savings Liability', debit: 0, credit: 5000000, status: 'FAAP_BALANCED' }
  ]);

  const [umraReturns] = useState([
    { id: 'UMRA-2026-Q2', returnType: 'Tier 4 Microfinance Prudential Return', capitalAdequacy: '18.4% (Min 12%)', NPLRatio: '2.1% (Limit 5%)', liquidityRatio: '34.2%', status: 'SUBMITTED_APPROVED' }
  ]);

  const handleSwitchPortal = (portalId: string) => {
    setActivePortalId(portalId);
    const targetPortal = FINTECH_PORTALS.find(p => p.id === portalId);
    if (targetPortal && targetPortal.moduleIds.length > 0) {
      setActiveModuleId(targetPortal.moduleIds[0]);
    }
    setExecutionMessage(null);
  };

  const handleExecuteAction = (actionName: string) => {
    setExecutionMessage(null);

    if (activeModuleId === 'FT-MOD-LOAN-UNDERWRITING') {
      const borrower = formState['borrower'] || 'New Applicant';
      const amt = Number(formState['amount']) || 3000000;
      const collateral = formState['collateral'] || 'Kibanja Agreement';

      // Digital Pay Disbursement Trigger
      const payout = digitalPayClient.processPayment({
        idempotencyKey: `IDEM-LOAN-${Date.now()}`,
        payCode: 'PAY-FIN-8801',
        amount: amt,
        currency: 'UGX',
        rail: 'MTN_MOMO',
        payerName: borrower,
        payerPhoneOrAccount: formState['phone'] || '+256772000000',
        narrative: `Loan disbursement to ${borrower}`
      });

      // FAAP GL Post
      const journal = faapClient.recordJournal(
        'VOTE-LOAN-DISBURSEMENT',
        `Disbursement of Loan to ${borrower}`,
        'PAYMENT_GATEWAY',
        [
          { accountId: 'ACC-1002-LOANS', description: 'Debit Loan Receivable Asset', debit: amt, credit: 0 },
          { accountId: 'ACC-1001-BANK', description: 'Credit Vault/Bank Account', debit: 0, credit: amt }
        ],
        true
      );

      const newLoan = {
        id: `LOAN-${Math.floor(800 + Math.random() * 100)}`,
        borrower,
        amount: amt,
        interestRate: '15% p.a.',
        dscr: '2.1x',
        collateral,
        crbScore: 710,
        status: 'DISBURSED',
        balance: amt
      };

      setLoans([newLoan, ...loans]);
      setExecutionMessage(
        `Underwritten & Disbursed UGX ${amt.toLocaleString()} to ${borrower} via Digital Pay Switch (Ref: ${payout.transactionId}). ` +
        `FAAP GL Journal Ref: ${journal.id}.`
      );
    } 
    else if (activeModuleId === 'FT-MOD-MEMBER-KYC') {
      const name = formState['memberName'] || 'New Member';
      const nin = formState['nin'] || 'CM900000000XXX';
      const phone = formState['phone'] || '+256 700 000000';

      const newMember = {
        id: `MEM-${Math.floor(2000 + Math.random() * 8000)}`,
        name,
        nin,
        phone,
        savingsBalance: Number(formState['initialDeposit']) || 100000,
        shares: Number(formState['initialShares']) || 10,
        status: 'ACTIVE_MEMBER'
      };

      setMembers([newMember, ...members]);
      setExecutionMessage(`Enrolled SACCO Member [${name}] with NIN [${nin}]. Issued Share Certificate.`);
    }
    else {
      setExecutionMessage(`Core banking transaction executed for ${currentModule.name}. Ledger updated.`);
    }

    setFormState({});
    setActiveTab('RECORDS');
  };

  const moduleSidebarOptions = availableModules.map(m => ({
    id: m.id,
    code: m.code,
    name: m.name,
    description: m.description,
    icon: Landmark
  }));

  return (
    <EnterpriseWorkspaceLayout
      productCode={FINTECH_MANIFEST.code}
      productName={FINTECH_MANIFEST.name}
      benchmarkBadge="UMRA CORE BANKING BENCHMARK"
      productIcon={Landmark}
      badgeThemeClass="bg-emerald-50 text-emerald-900 border-emerald-300"
      portals={FINTECH_PORTALS}
      activePortalId={activePortalId}
      onPortalChange={handleSwitchPortal}
      modules={moduleSidebarOptions}
      activeModuleId={activeModuleId}
      onModuleChange={(modId) => {
        setActiveModuleId(modId);
        setExecutionMessage(null);
        setActiveTab('RECORDS');
      }}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      executionMessage={executionMessage}
      onDismissExecutionMessage={() => setExecutionMessage(null)}
      onBackToLauncher={onBackToLauncher}
    >
      <div className="space-y-6">
        {/* TAB 1: OPERATIONAL RECORDS TABLE */}
        {activeTab === 'RECORDS' && (
          <div className="space-y-4">
            {activeModuleId === 'FT-MOD-LOAN-UNDERWRITING' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-800">SACCO Credit Risk & Underwritten Loan Portfolio</h3>
                  <button
                    onClick={() => setActiveTab('FORM')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Appraise & Disburse Loan
                  </button>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                      <tr>
                        <th className="p-3">Loan ID</th>
                        <th className="p-3">Borrower Member</th>
                        <th className="p-3">Principal (UGX)</th>
                        <th className="p-3">Interest</th>
                        <th className="p-3">Collateral Security</th>
                        <th className="p-3">CRB Score</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {loans
                        .filter(l => searchQuery === '' || l.borrower.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(l => (
                          <tr key={l.id} className="hover:bg-slate-50/80">
                            <td className="p-3 font-mono font-bold text-slate-500">{l.id}</td>
                            <td className="p-3 font-bold text-slate-900">{l.borrower}</td>
                            <td className="p-3 font-mono font-bold text-emerald-800">UGX {l.amount.toLocaleString()}</td>
                            <td className="p-3">{l.interestRate}</td>
                            <td className="p-3">{l.collateral}</td>
                            <td className="p-3 font-mono font-bold text-slate-700">{l.crbScore}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                                {l.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeModuleId === 'FT-MOD-MEMBER-KYC' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-800">Member KYC, NIRA Registry & Savings Ledger</h3>
                  <button
                    onClick={() => setActiveTab('FORM')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Enroll New Member
                  </button>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                      <tr>
                        <th className="p-3">Member Ref</th>
                        <th className="p-3">Member Name</th>
                        <th className="p-3">NIRA NIN</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Savings Balance</th>
                        <th className="p-3">Shares</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {members
                        .filter(m => searchQuery === '' || m.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(m => (
                          <tr key={m.id} className="hover:bg-slate-50/80">
                            <td className="p-3 font-mono font-bold text-slate-500">{m.id}</td>
                            <td className="p-3 font-bold text-slate-900">{m.name}</td>
                            <td className="p-3 font-mono text-slate-600">{m.nin}</td>
                            <td className="p-3 font-mono text-slate-600">{m.phone}</td>
                            <td className="p-3 font-mono font-bold text-emerald-800">UGX {m.savingsBalance.toLocaleString()}</td>
                            <td className="p-3 font-mono font-bold text-slate-800">{m.shares}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeModuleId === 'FT-MOD-SAVINGS-ACCOUNTS' && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-slate-800">Member Savings Deposit Ledger & Balance Summary</h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                      <tr>
                        <th className="p-3">Account Ref</th>
                        <th className="p-3">Account Holder</th>
                        <th className="p-3">Account Type</th>
                        <th className="p-3">Current Balance (UGX)</th>
                        <th className="p-3">Account Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {members.map(m => (
                        <tr key={m.id} className="hover:bg-slate-50/80">
                          <td className="p-3 font-mono font-bold text-slate-500">{m.id}</td>
                          <td className="p-3 font-bold text-slate-900">{m.name}</td>
                          <td className="p-3 font-mono text-slate-600">ORDINARY_SAVINGS</td>
                          <td className="p-3 font-mono font-bold text-emerald-800">UGX {m.savingsBalance.toLocaleString()}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                              ACTIVE
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeModuleId === 'FT-MOD-VAULT-CASH' && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-slate-800">Branch Cashier & Strongroom Vault Stream</h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                      <tr>
                        <th className="p-3">Tx Ref</th>
                        <th className="p-3">Member / Narration</th>
                        <th className="p-3">Transaction Type</th>
                        <th className="p-3">Amount (UGX)</th>
                        <th className="p-3">Teller Station</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {vaultTransactions.map(tx => (
                        <tr key={tx.id} className="hover:bg-slate-50/80">
                          <td className="p-3 font-mono font-bold text-slate-500">{tx.id}</td>
                          <td className="p-3 font-bold text-slate-900">{tx.member}</td>
                          <td className="p-3 font-mono font-bold text-emerald-800">{tx.type}</td>
                          <td className="p-3 font-mono font-bold text-slate-900">UGX {tx.amount.toLocaleString()}</td>
                          <td className="p-3">{tx.teller}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeModuleId === 'FT-MOD-CRB-COLLATERAL' && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-slate-800">Collateral Security Registry & Credit Bureau (CRB) Checks</h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                      <tr>
                        <th className="p-3">Collateral ID</th>
                        <th className="p-3">Pledging Member</th>
                        <th className="p-3">Asset Description</th>
                        <th className="p-3">Valuation (UGX)</th>
                        <th className="p-3">CRB Registry Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {collaterals.map(c => (
                        <tr key={c.id} className="hover:bg-slate-50/80">
                          <td className="p-3 font-mono font-bold text-slate-500">{c.id}</td>
                          <td className="p-3 font-bold text-slate-900">{c.owner}</td>
                          <td className="p-3">{c.asset}</td>
                          <td className="p-3 font-mono font-bold text-slate-900">UGX {c.valuationUGX.toLocaleString()}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                              {c.crbStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeModuleId === 'FT-MOD-GENERAL-LEDGER' && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-slate-800">General Ledger & FAAP Financial Accounting Journal</h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                      <tr>
                        <th className="p-3">GL Entry ID</th>
                        <th className="p-3">Vote Book</th>
                        <th className="p-3">Account Description</th>
                        <th className="p-3">Debit (UGX)</th>
                        <th className="p-3">Credit (UGX)</th>
                        <th className="p-3">FAAP Reconciled</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {generalLedger.map(g => (
                        <tr key={g.id} className="hover:bg-slate-50/80">
                          <td className="p-3 font-mono font-bold text-slate-500">{g.id}</td>
                          <td className="p-3 font-mono text-slate-600">{g.vote}</td>
                          <td className="p-3 font-bold text-slate-900">{g.account}</td>
                          <td className="p-3 font-mono font-bold text-emerald-800">UGX {g.debit.toLocaleString()}</td>
                          <td className="p-3 font-mono font-bold text-slate-700">UGX {g.credit.toLocaleString()}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                              {g.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeModuleId === 'FT-MOD-UMRA-COMPLIANCE' && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-slate-800">UMRA Regulatory Returns & Tier 4 Microfinance Prudential Ratios</h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                      <tr>
                        <th className="p-3">Return ID</th>
                        <th className="p-3">Return Schedule</th>
                        <th className="p-3">Capital Adequacy</th>
                        <th className="p-3">NPL Ratio</th>
                        <th className="p-3">Liquidity Ratio</th>
                        <th className="p-3">UMRA Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {umraReturns.map(u => (
                        <tr key={u.id} className="hover:bg-slate-50/80">
                          <td className="p-3 font-mono font-bold text-slate-500">{u.id}</td>
                          <td className="p-3 font-bold text-slate-900">{u.returnType}</td>
                          <td className="p-3 font-mono font-bold text-emerald-800">{u.capitalAdequacy}</td>
                          <td className="p-3 font-mono text-slate-700">{u.NPLRatio}</td>
                          <td className="p-3 font-mono text-slate-700">{u.liquidityRatio}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                              {u.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeModuleId !== 'FT-MOD-LOAN-UNDERWRITING' && 
             activeModuleId !== 'FT-MOD-MEMBER-KYC' && 
             activeModuleId !== 'FT-MOD-SAVINGS-ACCOUNTS' && 
             activeModuleId !== 'FT-MOD-VAULT-CASH' &&
             activeModuleId !== 'FT-MOD-CRB-COLLATERAL' &&
             activeModuleId !== 'FT-MOD-GENERAL-LEDGER' &&
             activeModuleId !== 'FT-MOD-UMRA-COMPLIANCE' && (
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="font-bold text-slate-900">Module [<strong>{currentModule.name}</strong>] Active</div>
                <p>Core banking workspace active for {currentPortal.role}. Execute actions to post transaction entries.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DATA ENTRY & FORMS */}
        {activeTab === 'FORM' && (
          <div className="space-y-4 max-w-2xl">
            <h3 className="font-bold text-sm text-slate-800">Core Banking Action Form</h3>

            {activeModuleId === 'FT-MOD-LOAN-UNDERWRITING' && (
              <div className="space-y-4 p-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-xs text-slate-800">Loan Underwriting & Digital Disbursal</div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Borrower Member Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John Baptist Otim"
                      value={formState['borrower'] || ''}
                      onChange={e => setFormState({ ...formState, borrower: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Principal Amount (UGX)</label>
                      <input
                        type="number"
                        placeholder="e.g. 3000000"
                        value={formState['amount'] || ''}
                        onChange={e => setFormState({ ...formState, amount: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Money Phone</label>
                      <input
                        type="text"
                        placeholder="e.g. +256 772 334455"
                        value={formState['phone'] || ''}
                        onChange={e => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Pledged Collateral Asset</label>
                    <input
                      type="text"
                      placeholder="e.g. Land Title / Kibanja Sales Agreement"
                      value={formState['collateral'] || ''}
                      onChange={e => setFormState({ ...formState, collateral: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleExecuteAction('Appraise & Disburse Loan')}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Underwrite & Disburse via Digital Pay Switch
                </button>
              </div>
            )}

            {activeModuleId === 'FT-MOD-MEMBER-KYC' && (
              <div className="space-y-4 p-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-xs text-slate-800">SACCO Member Enrollment & Share Issuance</div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Member Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Harriet Namukasa"
                      value={formState['memberName'] || ''}
                      onChange={e => setFormState({ ...formState, memberName: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">NIRA NIN Number</label>
                      <input
                        type="text"
                        placeholder="e.g. CF900314008EBB"
                        value={formState['nin'] || ''}
                        onChange={e => setFormState({ ...formState, nin: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Initial Share Capital Count</label>
                      <input
                        type="number"
                        placeholder="e.g. 20"
                        value={formState['initialShares'] || ''}
                        onChange={e => setFormState({ ...formState, initialShares: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleExecuteAction('Enroll Member')}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Enroll SACCO Member & Issue Share Certificate
                </button>
              </div>
            )}

            {activeModuleId !== 'FT-MOD-LOAN-UNDERWRITING' && activeModuleId !== 'FT-MOD-MEMBER-KYC' && (
              <div className="space-y-3 p-5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-600">
                  Form binding for <strong>{currentModule.name}</strong> is synchronized with UMRA core banking schema.
                </p>
                <button
                  onClick={() => handleExecuteAction(`Submit ${currentModule.name} Form`)}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Execute Core Banking Action
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ANALYTICS */}
        {activeTab === 'ANALYTICS' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-[10px] font-mono font-bold text-emerald-800 uppercase">Active Members</div>
                <div className="text-2xl font-black text-emerald-900 mt-1">{members.length}</div>
                <div className="text-[11px] text-emerald-700 mt-1">NIRA NIN Verified</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="text-[10px] font-mono font-bold text-blue-800 uppercase">Gross Loan Portfolio</div>
                <div className="text-xl font-black text-blue-900 mt-1">
                  UGX {loans.reduce((acc, l) => acc + l.amount, 0).toLocaleString()}
                </div>
                <div className="text-[11px] text-blue-700 mt-1">Underwritten & Disbursed</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="text-[10px] font-mono font-bold text-purple-800 uppercase">Member Savings Deposits</div>
                <div className="text-xl font-black text-purple-900 mt-1">
                  UGX {members.reduce((acc, m) => acc + m.savingsBalance, 0).toLocaleString()}
                </div>
                <div className="text-[11px] text-purple-700 mt-1">Strongroom & Mobile Ledger</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </EnterpriseWorkspaceLayout>
  );
}
