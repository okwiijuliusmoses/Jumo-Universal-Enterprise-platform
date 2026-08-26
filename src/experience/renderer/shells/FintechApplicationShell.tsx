import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, DollarSign, CreditCard, Users, TrendingUp, ShieldCheck, 
  Search, Plus, Filter, ArrowUpRight, ArrowDownRight, RefreshCw, 
  CheckCircle2, AlertCircle, FileText, ChevronRight, Lock, Landmark,
  Wallet, PieChart, Shield, Download, ExternalLink, Activity
} from "lucide-react";
import { JumoMasterManifestRegistry } from "../../../core/specification/manifests/masterManifestRegistry";

interface FintechApplicationShellProps {
  onBack: () => void;
  onNavigateToPlatform?: (platformId: string) => void;
}

export function FintechApplicationShell({ onBack, onNavigateToPlatform }: FintechApplicationShellProps) {
  const manifest = JumoMasterManifestRegistry.get("prod-fintech");
  const [activeTab, setActiveTab] = useState<"accounts" | "loans" | "members" | "payments" | "analytics" | "compliance">("accounts");
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  
  // Modals & Drawers
  const [newLoanModalOpen, setNewLoanModalOpen] = useState(false);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);

  // Mock Data States
  const [accounts, setAccounts] = useState([
    { id: "ACC-8801", name: "Kampala Traders Cooperative", type: "Savings & Investment", balance: "UGX 485,200,000", status: "ACTIVE", updated: "2 mins ago" },
    { id: "ACC-8802", name: "Victoria Women Farmers Group", type: "Group Micro-Credit", balance: "UGX 124,500,000", status: "ACTIVE", updated: "10 mins ago" },
    { id: "ACC-8803", name: "Jinja Boda Transport SACCO", type: "Asset Financing", balance: "UGX 310,000,000", status: "ACTIVE", updated: "1 hour ago" },
    { id: "ACC-8804", name: "Mbarara Dairy Producers Union", type: "Commercial Treasury", balance: "UGX 890,400,000", status: "ACTIVE", updated: "5 mins ago" },
    { id: "ACC-8805", name: "Gulu Youth Tech Syndicate", type: "Innovation Loan", balance: "UGX 78,900,000", status: "UNDER_REVIEW", updated: "Just now" },
  ]);

  const [loans, setLoans] = useState([
    { id: "LN-4091", borrower: "Kampala Produce Ltd", amount: "UGX 150,000,000", term: "24 Months", interest: "12.5%", score: "94/100 A+", status: "DISBURSED", faapRef: "FAAP-TX-9901" },
    { id: "LN-4092", borrower: "Kalerwe Solar Energy Group", amount: "UGX 45,000,000", term: "12 Months", interest: "11.0%", score: "88/100 A", status: "APPROVED", faapRef: "FAAP-TX-9902" },
    { id: "LN-4093", borrower: "Arua Timber Merchants", amount: "UGX 80,000,000", term: "18 Months", interest: "14.0%", score: "76/100 B+", status: "UNDERWRITING", faapRef: "FAAP-TX-9903" },
    { id: "LN-4094", borrower: "Entebbe Artisanal Fishermen", amount: "UGX 30,000,000", term: "6 Months", interest: "10.0%", score: "91/100 A+", status: "DISBURSED", faapRef: "FAAP-TX-9904" },
  ]);

  const [members, setMembers] = useState([
    { id: "MBR-101", name: "Dr. Sarah Mukasa", role: "Board Member", shares: "4,500 Shares", savings: "UGX 68,400,000", kyc: "VERIFIED" },
    { id: "MBR-102", name: "Joseph Kintu", role: "Ordinary Member", shares: "1,200 Shares", savings: "UGX 18,900,000", kyc: "VERIFIED" },
    { id: "MBR-103", name: "Grace Akello", role: "Committee Lead", shares: "3,800 Shares", savings: "UGX 45,200,000", kyc: "VERIFIED" },
    { id: "MBR-104", name: "Emmanuel Otim", role: "Ordinary Member", shares: "850 Shares", savings: "UGX 12,100,000", kyc: "VERIFIED" },
  ]);

  // Form States
  const [loanForm, setLoanForm] = useState({ borrower: "", amount: "", term: "12 Months", purpose: "" });

  const handleCreateLoan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loanForm.borrower || !loanForm.amount) return;
    const newLoan = {
      id: `LN-${Math.floor(4000 + Math.random() * 1000)}`,
      borrower: loanForm.borrower,
      amount: `UGX ${Number(loanForm.amount).toLocaleString()}`,
      term: loanForm.term,
      interest: "12.0%",
      score: "92/100 A+",
      status: "UNDERWRITING",
      faapRef: `FAAP-TX-${Math.floor(9000 + Math.random() * 1000)}`
    };
    setLoans([newLoan, ...loans]);
    setLoanForm({ borrower: "", amount: "", term: "12 Months", purpose: "" });
    setNewLoanModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" id="jumo-fintech-app">
      {/* 1. APPLICATION TOP BRAND BAR */}
      <header className="bg-slate-900 border-b border-amber-500/30 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 rounded-2xl flex items-center justify-center font-black shadow-lg shadow-amber-500/20 border border-amber-400/40">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-white">JUMO FINTECH</h1>
              <span className="bg-amber-500/20 text-amber-400 text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full border border-amber-500/30">
                SACCO & Financial Services
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Authoritative Sovereign Financial Engine • FAAP Ledger Integrated</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDepositModalOpen(true)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Deposit Cash
          </button>
          <button
            onClick={() => setNewLoanModalOpen(true)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <DollarSign className="w-4 h-4" /> Underwrite Loan
          </button>
        </div>
      </header>

      {/* 2. FINANCIAL KPI STATS RIBBON */}
      <section className="bg-slate-900/60 border-b border-slate-800 px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-4 rounded-xl border border-amber-500/20 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Savings Deposits</span>
          <div className="text-lg md:text-xl font-black text-white mt-1">UGX 4.825 Billion</div>
          <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3 h-3" /> +12.4% MoM • 100% FAAP Synced
          </span>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Active Credit Portfolio</span>
          <div className="text-lg md:text-xl font-black text-amber-400 mt-1">UGX 1.250 Billion</div>
          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mt-1">
            NPL Ratio: <strong className="text-emerald-400">0.8%</strong> (Performing)
          </span>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Treasury Liquidity</span>
          <div className="text-lg md:text-xl font-black text-white mt-1">UGX 840.5 Million</div>
          <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1 mt-1">
            Reserve Ratio: <strong>22.4%</strong> (Compliant)
          </span>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">FAAP Ledger Parity</span>
          <div className="text-lg md:text-xl font-black text-emerald-400 mt-1">100.00% Zero-Variance</div>
          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mt-1">
            Aegis Keyring: <strong className="text-emerald-400">ACTIVE</strong>
          </span>
        </div>
      </section>

      {/* 3. DOMAIN NAVIGATION TABS */}
      <nav className="bg-slate-900 border-b border-slate-800 px-6 flex items-center gap-2 overflow-x-auto">
        {[
          { id: "accounts", label: "Accounts & Deposits", icon: Wallet },
          { id: "loans", label: "Credit & Underwriting", icon: DollarSign },
          { id: "members", label: "SACCO Members", icon: Users },
          { id: "payments", label: "Digital Pay Switch", icon: CreditCard },
          { id: "analytics", label: "Risk & Balance Sheet", icon: PieChart },
          { id: "compliance", label: "Aegis & FAAP Audit", icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "border-amber-400 text-amber-400 bg-amber-500/10"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* 4. MAIN CONTENT WORKSPACE */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        
        {/* === TAB 1: ACCOUNTS & DEPOSITS === */}
        {activeTab === "accounts" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-lg font-black text-white">Member Savings & Deposit Accounts</h2>
                <p className="text-xs text-slate-400">Real-time balances, interest yield accruals, and transaction ledgers.</p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search account name or ID..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Accounts Table */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-md">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Account ID</th>
                    <th className="p-4">Member / Organization</th>
                    <th className="p-4">Account Type</th>
                    <th className="p-4">Current Balance</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Last Activity</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-medium">
                  {accounts
                    .filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.id.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((acc) => (
                      <tr key={acc.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-mono font-bold text-amber-400">{acc.id}</td>
                        <td className="p-4 font-bold text-white">{acc.name}</td>
                        <td className="p-4 text-slate-400">{acc.type}</td>
                        <td className="p-4 font-black text-white">{acc.balance}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider ${
                            acc.status === "ACTIVE" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          }`}>
                            {acc.status}
                          </span>
                        </td>
                        <td className="p-4 text-slate-400 text-[11px]">{acc.updated}</td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => setSelectedAccount(acc)}
                            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-[11px] font-bold border border-slate-700 cursor-pointer"
                          >
                            Inspect Ledger
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* === TAB 2: CREDIT & UNDERWRITING === */}
        {activeTab === "loans" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-black text-white">Credit Portfolio & Loan Underwriting</h2>
                <p className="text-xs text-slate-400">Automated credit scoring, collateral verification, and FAAP disbursement.</p>
              </div>

              <button
                onClick={() => setNewLoanModalOpen(true)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Underwrite New Loan
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {loans.map((loan) => (
                <div key={loan.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 hover:border-amber-500/40 transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-amber-400">{loan.id}</span>
                      <h3 className="font-bold text-white text-sm mt-0.5">{loan.borrower}</h3>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                      loan.status === "DISBURSED" ? "bg-emerald-500/20 text-emerald-400" : loan.status === "APPROVED" ? "bg-blue-500/20 text-blue-400" : "bg-amber-500/20 text-amber-400"
                    }`}>
                      {loan.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Loan Amount:</span>
                      <strong className="text-white font-black">{loan.amount}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Term & Interest:</span>
                      <span className="text-slate-200">{loan.term} @ {loan.interest}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>AI Credit Score:</span>
                      <span className="text-emerald-400 font-bold">{loan.score}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[10px]">
                      <span>FAAP Ledger Ref:</span>
                      <span className="font-mono text-slate-500">{loan.faapRef}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === TAB 3: SACCO MEMBERS === */}
        {activeTab === "members" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-black text-white">SACCO Member Directory & Share Register</h2>
              <p className="text-xs text-slate-400">Verified identity registry, statutory share holdings, and dividend distributions.</p>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Member ID</th>
                    <th className="p-4">Full Name</th>
                    <th className="p-4">Governance Role</th>
                    <th className="p-4">Share Holdings</th>
                    <th className="p-4">Total Savings</th>
                    <th className="p-4">KYC Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {members.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-800/40">
                      <td className="p-4 font-mono font-bold text-amber-400">{m.id}</td>
                      <td className="p-4 font-bold text-white">{m.name}</td>
                      <td className="p-4 text-slate-400">{m.role}</td>
                      <td className="p-4 font-bold text-slate-200">{m.shares}</td>
                      <td className="p-4 font-black text-white">{m.savings}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-black border border-emerald-500/30">
                          {m.kyc}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* === TAB 4: PAYMENTS & SWITCH === */}
        {activeTab === "payments" && (
          <div className="space-y-6">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="text-lg font-black text-white">Digital Pay Switch & Clearing API</h2>
              <p className="text-xs text-slate-400">Direct integration with Mobile Money (MTN/Airtel), Bank EFT, and Interbank Clearing.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-bold uppercase text-slate-500">MTN Mobile Money API</span>
                  <div className="text-sm font-bold text-emerald-400 mt-1">Operational • 99.9% Uptime</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Airtel Money Switch</span>
                  <div className="text-sm font-bold text-emerald-400 mt-1">Operational • 100% Uptime</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Bank Interbank EFT</span>
                  <div className="text-sm font-bold text-emerald-400 mt-1">FAAP Parity Verified</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === TAB 5: ANALYTICS === */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="text-lg font-black text-white">Financial Risk & Balance Sheet Analytics</h2>
              <p className="text-xs text-slate-400">Statutory financial reporting, liquidity stress testing, and capital adequacy ratio.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="font-bold text-xs text-slate-300">Assets & Capital Reserve</h3>
                  <div className="text-2xl font-black text-amber-400">UGX 6.075 Billion</div>
                  <p className="text-[11px] text-slate-400">Comprising loans receivable, bank cash deposits, and statutory reserve assets.</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="font-bold text-xs text-slate-300">Liabilities & Member Equity</h3>
                  <div className="text-2xl font-black text-white">UGX 6.075 Billion</div>
                  <p className="text-[11px] text-slate-400">Comprising member savings deposits, share capital equity, and retained earnings.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === TAB 6: COMPLIANCE === */}
        {activeTab === "compliance" && (
          <div className="space-y-6">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="text-lg font-black text-white">Aegis Zero-Trust & FAAP Double-Entry Audit</h2>
              <p className="text-xs text-slate-400">Cryptographically signed transaction ledger logs verified against central security keyring.</p>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 space-y-2">
                <div>[AEGIS-KEYRING] Key 0x4BB1177 Verified • Signature Parity Valid</div>
                <div>[FAAP-AUDIT-01] Ledger debit/credit balance checksum: 0.000000000 (Zero Variance)</div>
                <div>[STATUTORY-GATE] SACCO Regulatory Act Compliance: 100% Passed</div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* NEW LOAN MODAL */}
      {newLoanModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-white">Underwrite New SACCO Loan</h3>
            <form onSubmit={handleCreateLoan} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Borrower Organization / Member</label>
                <input
                  type="text"
                  required
                  value={loanForm.borrower}
                  onChange={(e) => setLoanForm({ ...loanForm, borrower: e.target.value })}
                  placeholder="e.g. Mukono Farmers Co-op"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Loan Amount (UGX)</label>
                <input
                  type="number"
                  required
                  value={loanForm.amount}
                  onChange={(e) => setLoanForm({ ...loanForm, amount: e.target.value })}
                  placeholder="e.g. 50000000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Repayment Term</label>
                <select
                  value={loanForm.term}
                  onChange={(e) => setLoanForm({ ...loanForm, term: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                >
                  <option>6 Months</option>
                  <option>12 Months</option>
                  <option>18 Months</option>
                  <option>24 Months</option>
                  <option>36 Months</option>
                </select>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setNewLoanModalOpen(false)}
                  className="flex-1 py-3 bg-slate-800 text-slate-300 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-amber-500 text-slate-950 rounded-xl font-black cursor-pointer shadow-md"
                >
                  Submit Underwriting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DEPOSIT CASH MODAL */}
      {depositModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-white">Deposit Cash / FAAP Entry</h3>
            <p className="text-xs text-slate-400">Post a double-entry cash deposit directly to member account and FAAP ledger.</p>
            <div className="space-y-3 text-xs">
              <input type="text" placeholder="Account ID (e.g. ACC-8801)" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200" />
              <input type="number" placeholder="Deposit Amount (UGX)" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200" />
              <button 
                onClick={() => setDepositModalOpen(false)}
                className="w-full py-3 bg-amber-500 text-slate-950 font-black rounded-xl cursor-pointer"
              >
                Post Deposit to FAAP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
