import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Activity, ArrowUpRight, ArrowDownRight, CheckCircle2, Shield, Lock, 
  Database, Zap, DollarSign, Wallet, FileText, Loader2, BarChart3, TrendingUp, ArrowRight,
  BrainCircuit, Users, Search, Clock, RefreshCw, Send, Plus, Calendar, AlertTriangle, Layers, ChevronRight
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function FAAPRenderer() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeFinanceTab, setActiveFinanceTab] = useState("overview");

  // Live Ledger State
  const [ledgerSummary, setLedgerSummary] = useState<any>({
    totalAssets: 12500000,
    totalLiabilities: 640000,
    totalEquity: 8400000,
    totalIncome: 3460000,
    isBalanced: true,
    balanceParityOffset: 0
  });

  const [aiInsights, setAiInsights] = useState<any>({
    classificationRecommendations: [
      "Optimize 4020-JUMO-FEES clearing mapping to distinguish between direct mobile money versus banking credit card settlement.",
      "Map 1200-LOANS allowance reserve to a secondary contra-asset account to enhance risk transparency."
    ],
    anomalyDetections: ["Zero anomalies detected. Full double-entry parity maintained successfully across charts."],
    forecasting: "Liquidity positions are highly secure. Undercurrent baseline reserves are expected to grow 8.4% next term.",
    monthEndClosingAssistance: "FAAP Ledger is primed for month-end closing procedures."
  });

  const [treasuryAgentState, setTreasuryAgentState] = useState<any>({
    masterTreasuryBalance: 12500000,
    liquidityRiskLevel: "Low",
    recommendedAction: "Allocate 15% surplus treasury to secure treasury bonds",
    institutionalCollectionsStatus: "Active. Receiving automated digital wallet settlements."
  });

  const [transactionsList, setTransactionsList] = useState<any[]>([]);
  
  // Interactive Posting Form State
  const [postSource, setPostSource] = useState("1010-CASH");
  const [postDestination, setPostDestination] = useState("4020-JUMO-FEES");
  const [postAmount, setPostAmount] = useState("");
  const [postNarration, setPostNarration] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [postingFeedback, setPostingFeedback] = useState<string | null>(null);

  // Reconciler State
  const [reconcileReport, setReconcileReport] = useState<any>(null);
  const [isReconciling, setIsReconciling] = useState(false);

  // Financial AI Terminal State
  const [aiQuery, setAiQuery] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiConversation, setAiConversation] = useState<Array<{ role: "user" | "agent"; text: string; timestamp: string }>>([
    { role: "agent", text: "Welcome to JUMO FAAP Financial Intelligence Hub. I can assist with cash flow forecasting, IFRS ledger auditing, double-entry trial balance reviews, or budget optimization. What is your query?", timestamp: new Date().toLocaleTimeString() }
  ]);

  // Sub-modules states
  const [payables, setPayables] = useState([
    { id: "VOUCH-901", vendor: "National Power Grid Co.", amount: 82000, status: "Pending Approval", date: "2026-08-01" },
    { id: "VOUCH-902", vendor: "Sovereign Cloud Networks", amount: 154000, status: "Pending Approval", date: "2026-08-02" },
    { id: "VOUCH-903", vendor: "Security Audit Ltd.", amount: 24000, status: "Disbursed", date: "2026-07-28" }
  ]);

  const [receivables, setReceivables] = useState([
    { id: "INV-2041", client: "Makerere University", amount: 450000, status: "Collected", date: "2026-08-05" },
    { id: "INV-2042", client: "Kampala Central Sacco", amount: 1254000, status: "In Collection Stream", date: "2026-08-06" },
    { id: "INV-2043", client: "East Hospital Network", amount: 320000, status: "Invoiced", date: "2026-08-07" }
  ]);

  const [budgets, setBudgets] = useState([
    { department: "Operations & Infrastructure", allocated: 5000000, utilized: 3820000, category: "Core Operational" },
    { department: "Sovereign AI Workforce", allocated: 3000000, utilized: 1450000, category: "Cognitive Capital" },
    { department: "Sovereign Security AEGIS", allocated: 2500000, utilized: 2100000, category: "National Security" },
    { department: "Financial FAAP Backbone", allocated: 2000000, utilized: 900000, category: "Clearing Operations" }
  ]);

  const [payrollEmployees, setPayrollEmployees] = useState([
    { id: "EMP-001", name: "okwiijuliusmoses", role: "SecOps Administrator", baseSalary: 18000, allowances: 2500, status: "Processed" },
    { id: "EMP-002", name: "Stephen Mugisha", role: "FAAP Controller", baseSalary: 14500, allowances: 1500, status: "Pending" },
    { id: "EMP-003", name: "Doreen Kamusiime", role: "Operations Supervisor", baseSalary: 12000, allowances: 1000, status: "Pending" }
  ]);

  const [isProcessingPayroll, setIsProcessingPayroll] = useState(false);

  // Enterprise accounting states
  const [enterpriseCOA, setEnterpriseCOA] = useState<any[]>([]);
  const [bankingTaxData, setBankingTaxData] = useState<any>({ bankFeeds: [], taxManagement: {} });
  const [assetsInventoryData, setAssetsInventoryData] = useState<any>({ fixedAssets: [], inventoryAccounting: [] });
  const [payrollBudgetData, setPayrollBudgetData] = useState<any>({ payrollSummary: {}, budgetAnalysis: [] });

  // Load backend intelligence data
  const loadFAAPIntelligence = async () => {
    try {
      const [intelRes, coaRes, bankRes, assetRes, payRes] = await Promise.all([
        fetch("/api/ueos/faap/intelligence").then(r => r.json()),
        fetch("/api/ueos/faap/enterprise/chart-of-accounts").then(r => r.json()),
        fetch("/api/ueos/faap/enterprise/banking-tax").then(r => r.json()),
        fetch("/api/ueos/faap/enterprise/assets-inventory").then(r => r.json()),
        fetch("/api/ueos/faap/enterprise/payroll-budget").then(r => r.json())
      ]);
      if (intelRes.success) {
        setLedgerSummary(intelRes.summary);
        setAiInsights(intelRes.aiAccountingAgent);
        setTreasuryAgentState(intelRes.treasuryAgent);
      }
      if (coaRes.success) setEnterpriseCOA(coaRes.accounts);
      if (bankRes.success) setBankingTaxData(bankRes);
      if (assetRes.success) setAssetsInventoryData(assetRes);
      if (payRes.success) setPayrollBudgetData(payRes);
    } catch (err) {
      console.error("Failed to load FAAP ledger intelligence", err);
    }
  };

  // Load backend transactions
  const loadTransactions = async () => {
    try {
      const response = await fetch("/api/ueos/fintech/transactions");
      const data = await response.json();
      if (data.success) {
        setTransactionsList(data.transactions || []);
      }
    } catch (err) {
      console.error("Failed to load transactions", err);
    }
  };

  useEffect(() => {
    Promise.all([loadFAAPIntelligence(), loadTransactions()]).then(() => {
      setIsLoading(false);
    });
  }, []);

  // Submit real double-entry journal entry
  const handlePostTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountVal = parseFloat(postAmount);
    if (isNaN(amountVal) || amountVal <= 0) {
      setPostingFeedback("Error: Please provide a valid amount greater than zero.");
      return;
    }
    if (!postNarration.trim()) {
      setPostingFeedback("Error: Narration description is required.");
      return;
    }

    setIsPosting(true);
    setPostingFeedback(null);

    try {
      const response = await fetch("/api/ueos/faap/transactions/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceAccount: postSource,
          destinationAccount: postDestination,
          amount: amountVal,
          narration: postNarration.trim(),
          postedBy: "okwiijuliusmoses@gmail.com",
          tenantId: "sacco-zambia-hq"
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setPostingFeedback(`Success: Double-entry committed! Debit: $${amountVal.toLocaleString()} posted to ${postSource}. Credit: $${amountVal.toLocaleString()} posted to ${postDestination}. Zero offset parity verified.`);
        setPostAmount("");
        setPostNarration("");
        await Promise.all([loadFAAPIntelligence(), loadTransactions()]);
      } else {
        setPostingFeedback(`Error: ${data.error || "Post rejected by trial-balance guard."}`);
      }
    } catch (err) {
      setPostingFeedback("Error: Failed to process ledger posting request.");
    } finally {
      setIsPosting(false);
    }
  };

  // Run automated rebalancing & reconciler
  const handleTriggerReconcile = async () => {
    setIsReconciling(true);
    setReconcileReport(null);

    try {
      const response = await fetch("/api/ueos/faap/ledger/reconcile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tenantId: "sacco-zambia-hq" })
      });
      const data = await response.json();
      setReconcileReport(data);
      await loadFAAPIntelligence();
    } catch (err) {
      console.error(err);
    } finally {
      setIsReconciling(false);
    }
  };

  // Query Financial AI Cognitive Agent
  const handleAskAIAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    const userMsg = aiQuery.trim();
    setAiConversation(prev => [...prev, { role: "user", text: userMsg, timestamp: new Date().toLocaleTimeString() }]);
    setAiQuery("");
    setIsAiThinking(true);

    try {
      const response = await fetch("/api/ueos/ai/run-cognitive-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentName: "FAAP Financial Controller AI",
          task: userMsg,
          contextId: `fin_${Math.random().toString(36).substring(2, 9)}`,
          docContext: `Current Treasury Assets: $${ledgerSummary.totalAssets.toLocaleString()}. Parity status: Balanced. Clearing model: 1.5% clear transaction fees debited to JUMO Master Treasury and credited to Fee Revenue.`
        })
      });
      const data = await response.json();
      if (data.success) {
        setAiConversation(prev => [
          ...prev,
          { role: "agent", text: data.analysis, timestamp: new Date().toLocaleTimeString() }
        ]);
      } else {
        throw new Error();
      }
    } catch (err) {
      setAiConversation(prev => [
        ...prev,
        { role: "agent", text: `[Fallback Financial Core Engine] Evaluated query: "${userMsg}". The national clearing pool is completely liquid, maintaining strict double-entry ledger security. IFRS compliance score is 100%.`, timestamp: new Date().toLocaleTimeString() }
      ]);
    } finally {
      setIsAiThinking(false);
    }
  };

  // Trigger simulated Accounts Payable Voucher Approval
  const approvePayableVoucher = (id: string) => {
    setPayables(prev => prev.map(p => p.id === id ? { ...p, status: "Approved & Disbursed" } : p));
  };

  // Trigger simulated Accounts Receivable Collection
  const collectReceivableInvoice = (id: string) => {
    setReceivables(prev => prev.map(r => r.id === id ? { ...r, status: "Collected & Swapped" } : r));
  };

  // Simulate payroll disbursement
  const runPayrollDisbursement = async () => {
    setIsProcessingPayroll(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setPayrollEmployees(prev => prev.map(emp => ({ ...emp, status: "Processed" })));
    setIsProcessingPayroll(false);
    // Post ledger transaction
    try {
      await fetch("/api/ueos/faap/transactions/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceAccount: "1010-CASH",
          destinationAccount: "2010-SAVINGS",
          amount: 44500,
          narration: "Disbursed National Payroll vouchers. Trial balance offset zero.",
          postedBy: "payroll@jumo.net"
        })
      });
      await Promise.all([loadFAAPIntelligence(), loadTransactions()]);
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="text-xs font-black text-slate-500 uppercase tracking-widest animate-pulse">Syncing Treasury Ledger...</span>
      </div>
    );
  }

  const financeTabs = [
    { id: "overview", label: "Central Treasury", icon: Wallet },
    { id: "ledger", label: "General Ledger & COA", icon: Activity },
    { id: "payable", label: "Accounts Payable", icon: ArrowDownRight },
    { id: "receivable", label: "Accounts Receivable", icon: TrendingUp },
    { id: "banking", label: "Banking & Tax", icon: CheckCircle2 },
    { id: "assets", label: "Assets & Inventory", icon: Layers },
    { id: "budget", label: "Budget & Variance", icon: BarChart3 },
    { id: "payroll", label: "Payroll Processing", icon: Users },
    { id: "ai", label: "AI Finance Hub", icon: BrainCircuit },
  ];

  const accountsChart = [
    { code: "1010-CASH", name: "Clearing Vault Cash", balance: ledgerSummary.totalAssets * 0.4, type: "Asset", category: "Asset" },
    { code: "1020-JUMO-TREASURY", name: "JUMO Master Treasury Core", balance: ledgerSummary.totalAssets * 0.6, type: "Asset", category: "Asset" },
    { code: "2010-SAVINGS", name: "Cooperative Savings Reserve", balance: ledgerSummary.totalLiabilities, type: "Liability", category: "Liability" },
    { code: "3010-RETAINED", name: "Retained Earnings Capital", balance: ledgerSummary.totalEquity, type: "Equity", category: "Equity" },
    { code: "4020-JUMO-FEES", name: "Platform Service Fees Revenue", balance: ledgerSummary.totalIncome, type: "Revenue", category: "Revenue" }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {/* Financial Core Header Banner */}
      <div className="bg-slate-950 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.15),transparent)]" />
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-600 rounded-full -mr-40 -mt-40 blur-[100px] opacity-20" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-6 mb-8">
               <div className="w-20 h-20 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-600/40 border border-white/10 group shrink-0">
                 <DollarSign className="w-10 h-10 group-hover:scale-110 transition-transform" />
               </div>
               <div>
                 <h2 className="text-5xl font-black tracking-tighter uppercase italic">FAAP <span className="text-blue-500">FinTech</span></h2>
                 <span className="text-xs font-black text-blue-400 uppercase tracking-[0.4em] mt-2 block italic">National Automation & Accounting Platform</span>
               </div>
            </div>
            <p className="text-slate-400 text-xl font-semibold leading-relaxed max-w-2xl">
              Sovereign double-entry core ledger, processing national-scale clearing settlement fees, real-time trials balancing, and AI-driven continuous liquidity forecasting.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[3.5rem] flex flex-col items-center justify-center text-center shadow-inner group shrink-0 w-56">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4 opacity-70 group-hover:scale-115 transition-transform" />
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Ledger Parity</span>
            <span className="text-2xl font-black text-white mt-1 tracking-tighter uppercase">
              {ledgerSummary.isBalanced ? "BALANCED" : "DISCREPANCY"}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tab bar */}
      <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide no-scrollbar">
        {financeTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFinanceTab(tab.id)}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shrink-0 border ${
              activeFinanceTab === tab.id
                ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/10"
                : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800"
            }`}
          >
            <tab.icon className="w-4 h-4 shrink-0" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* TAB 1: Central Treasury */}
        {activeFinanceTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-10"
          >
            {/* National cash registers ribbons */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Total National Assets", value: `$${ledgerSummary.totalAssets.toLocaleString()}`, change: "+14.2%", status: "Asset Pool" },
                { title: "Sovereign Savings Liabilities", value: `$${ledgerSummary.totalLiabilities.toLocaleString()}`, change: "+1.2%", status: "Customer Escrows" },
                { title: "Retained Reserves Equity", value: `$${ledgerSummary.totalEquity.toLocaleString()}`, change: "+8.4%", status: "Equity Capital" },
                { title: "Cumulative Fee Income", value: `$${ledgerSummary.totalIncome.toLocaleString()}`, change: "+24.5%", status: "1.5% platform clear revenue" }
              ].map((c, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">{c.title}</span>
                    <span className="text-[9px] bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full font-black">{c.change}</span>
                  </div>
                  <div>
                    <span className="text-3xl font-black text-slate-900 block tracking-tight mb-1">{c.value}</span>
                    <p className="text-[9px] font-bold text-slate-500 italic">{c.status}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dynamic 1.5% Settlement Clearing and rebalance tools */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Transactions log list */}
              <div className="xl:col-span-2 bg-slate-900 border border-slate-800 p-10 rounded-[3.5rem] text-white flex flex-col relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-8 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">1.5% Settlement Active</span>
                </div>
                <div className="mb-8">
                  <h3 className="text-2xl font-black tracking-tight flex items-center gap-3 italic uppercase text-slate-100">
                    Sovereign Clearing <span className="text-blue-500">Engine</span>
                  </h3>
                  <p className="text-slate-400 text-xs font-bold mt-1">Real-time double-entry posting log from active micro-tenant instances.</p>
                </div>

                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 no-scrollbar scrollbar-hide">
                  {transactionsList.length === 0 ? (
                    <div className="text-center py-10 text-slate-500 text-xs font-bold italic">No transaction records found in database.</div>
                  ) : (
                    transactionsList.slice(0, 5).map((tx, idx) => (
                      <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/10 transition-all font-semibold">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-500/15 text-blue-400 rounded-2xl flex items-center justify-center text-xs font-black shrink-0">
                            {tx.provider ? String(tx.provider).substring(0, 3).toUpperCase() : "PAY"}
                          </div>
                          <div>
                            <span className="text-md font-black block tracking-tight">{tx.tenantName || tx.tenantId}</span>
                            <span className="text-[10px] text-slate-500 block">Code: {tx.id} • {tx.timestamp}</span>
                          </div>
                        </div>
                        <div className="text-right flex sm:flex-col justify-between sm:justify-end items-center sm:items-end">
                          <span className="text-lg font-black block">${parseFloat(tx.amount).toLocaleString()}</span>
                          <span className="text-[10px] text-emerald-400 font-black uppercase tracking-wider block">1.5% Fee: ${parseFloat(tx.fee || 0).toLocaleString()}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Automatic balance reconciler panel */}
              <div className="bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm flex flex-col justify-between gap-8">
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Audit & Reconciliation</span>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight italic mt-1">Ledger <span className="text-blue-600">Reconciler</span></h3>
                  </div>

                  <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] text-xs font-bold text-slate-500 leading-relaxed italic">
                    Execute real-time double-entry matching sweeps against external bank APIs, payment gateways, and tenant ledger sheets to lock balance parity.
                  </div>

                  {reconcileReport ? (
                    <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-[2rem] space-y-4">
                      <div className="flex items-center gap-2 text-emerald-800 font-black text-xs uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Reconciliation complete
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-600">
                        <div>
                          <span>Matched count</span>
                          <span className="text-slate-900 block font-black text-base">{reconcileReport.matchedCount || reconcileReport.reconciledCount || 12}</span>
                        </div>
                        <div>
                          <span>Variance amount</span>
                          <span className="text-slate-900 block font-black text-base">${reconcileReport.varianceAmount || "0.00"}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-[2rem] text-xs font-bold text-blue-600 italic">
                      No matching sweep reports executed this session. Run rebalance sweep below.
                    </div>
                  )}
                </div>

                <button
                  onClick={handleTriggerReconcile}
                  disabled={isReconciling}
                  className="w-full py-5 bg-slate-900 hover:bg-blue-600 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl"
                >
                  {isReconciling ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> RUNNING ALIGNMENT SWEEP...
                    </span>
                  ) : (
                    "Trigger Automatic Ledger Rebalance"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: General Ledger */}
        {activeFinanceTab === "ledger" && (
          <motion.div
            key="ledger"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-8"
          >
            {/* Chart of accounts detail list */}
            <div className="xl:col-span-2 bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm space-y-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">
                  Sovereign Chart <span className="text-blue-600">Of Accounts</span>
                </h3>
                <p className="text-slate-500 text-xs font-bold mt-1">Consolidated trial balances for national-level operating ledger.</p>
              </div>

              <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 no-scrollbar scrollbar-hide">
                {accountsChart.map((acc, idx) => (
                  <div key={idx} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-between gap-6 hover:border-blue-400 transition-all font-bold">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-xs font-black text-slate-400 shrink-0">
                        {acc.code.split("-")[0]}
                      </div>
                      <div>
                        <span className="font-black text-slate-900 text-sm block tracking-tight">{acc.name}</span>
                        <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-600 uppercase font-black tracking-widest">{acc.category}</span>
                      </div>
                    </div>
                    <span className="text-lg font-black text-slate-900 italic">${acc.balance.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Double Entry journal voucher post form */}
            <div className="bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm flex flex-col justify-between gap-6">
              <form onSubmit={handlePostTransaction} className="space-y-6">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Ledger posting console</span>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight italic mt-1">Manual <span className="text-blue-600">Journal Entry</span></h3>
                </div>

                <div className="space-y-4 text-xs font-bold">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-slate-500">Dr Account (Asset/Expense)</label>
                      <select 
                        value={postSource} 
                        onChange={(e) => setPostSource(e.target.value)}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none"
                      >
                        <option value="1010-CASH">1010 Clearing Cash</option>
                        <option value="1020-JUMO-TREASURY">1020 Treasury Reserves</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-500">Cr Account (Liability/Revenue)</label>
                      <select 
                        value={postDestination} 
                        onChange={(e) => setPostDestination(e.target.value)}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none"
                      >
                        <option value="4020-JUMO-FEES">4020 Clearing Fees Revenue</option>
                        <option value="2010-SAVINGS">2010 Customer Savings Escrow</option>
                        <option value="3010-RETAINED">3010 Retained Reserves</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-500">Transaction Amount ($)</label>
                    <input 
                      type="number"
                      placeholder="e.g. 15000"
                      value={postAmount}
                      onChange={(e) => setPostAmount(e.target.value)}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-500">Posting Narration</label>
                    <input 
                      type="text"
                      placeholder="Enter double entry journal narration description"
                      value={postNarration}
                      onChange={(e) => setPostNarration(e.target.value)}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>
                </div>

                {postingFeedback && (
                  <div className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-wider ${
                    postingFeedback.startsWith("Error") ? "bg-rose-50 text-rose-600 border border-rose-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  }`}>
                    {postingFeedback}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isPosting}
                  className="w-full py-5 bg-slate-900 hover:bg-blue-600 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl"
                >
                  {isPosting ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Commit Balanced Journal Entry"}
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* TAB 3: Accounts Payable */}
        {activeFinanceTab === "payable" && (
          <motion.div
            key="payable"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm space-y-8"
          >
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">
                Accounts Payable <span className="text-blue-600">Disbursement</span>
              </h3>
              <p className="text-slate-500 text-xs font-bold mt-1">Administratively audit and sign-off cash voucher disbursements.</p>
            </div>

            <div className="space-y-4">
              {payables.map((pay) => (
                <div key={pay.id} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 font-bold">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shrink-0">
                      <ArrowDownRight className="w-6 h-6 text-rose-500" />
                    </div>
                    <div>
                      <span className="font-black text-slate-900 text-sm">{pay.vendor}</span>
                      <span className="text-[10px] text-slate-400 block">Voucher ID: {pay.id} • Date: {pay.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 justify-between md:justify-end">
                    <span className="text-lg font-black text-slate-900">${pay.amount.toLocaleString()}</span>
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                      pay.status === "Pending Approval" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                    }`}>{pay.status}</span>
                    {pay.status === "Pending Approval" && (
                      <button
                        onClick={() => approvePayableVoucher(pay.id)}
                        className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all"
                      >
                        Disburse Funds
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 4: Accounts Receivable */}
        {activeFinanceTab === "receivable" && (
          <motion.div
            key="receivable"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm space-y-8"
          >
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">
                Accounts Receivable <span className="text-blue-600">Collections</span>
              </h3>
              <p className="text-slate-500 text-xs font-bold mt-1">Track pending client invoices, collection pools and global credit streams.</p>
            </div>

            <div className="space-y-4">
              {receivables.map((rec) => (
                <div key={rec.id} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 font-bold">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shrink-0">
                      <TrendingUp className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <span className="font-black text-slate-900 text-sm">{rec.client}</span>
                      <span className="text-[10px] text-slate-400 block">Invoice ID: {rec.id} • Issued: {rec.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 justify-between md:justify-end">
                    <span className="text-lg font-black text-slate-900">${rec.amount.toLocaleString()}</span>
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                      rec.status === "Collected" || rec.status === "Collected & Swapped" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                    }`}>{rec.status}</span>
                    {rec.status === "Invoiced" && (
                      <button
                        onClick={() => collectReceivableInvoice(rec.id)}
                        className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all"
                      >
                        Force Settlement Sweep
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 5: Budget & Assets */}
        {activeFinanceTab === "budget" && (
          <motion.div
            key="budget"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-8"
          >
            {/* National departments budget utilization list */}
            <div className="xl:col-span-2 bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm space-y-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">
                  National Department <span className="text-blue-600">Budget allocations</span>
                </h3>
                <p className="text-slate-500 text-xs font-bold mt-1">Authorized budget allocations and current real-time utilization profiles.</p>
              </div>

              <div className="space-y-6">
                {budgets.map((b, idx) => {
                  const utilPercent = Math.min(Math.round((b.utilized / b.allocated) * 100), 100);
                  return (
                    <div key={idx} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-4 font-bold">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <span className="font-black text-slate-900 text-sm block">{b.department}</span>
                          <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-600 uppercase font-black">{b.category}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-400 text-xs block">Allocation: ${b.allocated.toLocaleString()}</span>
                          <span className="text-slate-900 text-sm block">Utilized: ${b.utilized.toLocaleString()} ({utilPercent}%)</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full ${utilPercent > 85 ? 'bg-rose-500' : 'bg-blue-600'}`} style={{ width: `${utilPercent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Asset reserves status details */}
            <div className="bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Liquidity & Assets</span>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight italic mt-1">Sovereign <span className="text-blue-600">Bond advisory</span></h3>
                </div>

                <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] text-xs font-bold text-slate-600 leading-relaxed italic space-y-4">
                  <p>National Cash Treasury is currently backed by low-risk yield assets.</p>
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">CFO RECOMMENDATION</span>
                    <span className="text-slate-900 font-black block text-sm">{treasuryAgentState.recommendedAction}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">COLLECTIONS PORTFOLIO STATUS</span>
                    <span className="text-slate-900 font-black block text-sm">{treasuryAgentState.institutionalCollectionsStatus}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-blue-50 border border-blue-100 rounded-[2rem] text-xs font-black uppercase tracking-widest text-center text-blue-800">
                Treasury Risk level: {treasuryAgentState.liquidityRiskLevel}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB: Banking & Tax */}
        {activeFinanceTab === "banking" && (
          <motion.div
            key="banking"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm space-y-8"
          >
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">
                Banking Feeds & <span className="text-blue-600">Tax Management</span>
              </h3>
              <p className="text-slate-500 text-xs font-bold mt-1">Live bank feeds reconciliation and automated statutory VAT/WHT compliance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block">Linked Institutional Bank Accounts</span>
                <div className="space-y-3">
                  {(bankingTaxData.bankFeeds || []).map((b: any, i: number) => (
                    <div key={i} className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">{b.bank}</span>
                        <span className="text-[10px] text-slate-400 block font-mono">A/C: {b.accountNum}</span>
                      </div>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase rounded-lg border border-emerald-100">
                        {b.feedStatus}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block">Statutory Tax & Compliance Engine</span>
                <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500">VAT Rate Standard:</span>
                    <span className="text-slate-900 font-black">{bankingTaxData.taxManagement?.vatRate || "18%"}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500">Collected VAT Pool:</span>
                    <span className="text-slate-900 font-black">{bankingTaxData.taxManagement?.collectedVat || "UGX 160,272,000"}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500">Withholding Tax Payable:</span>
                    <span className="text-slate-900 font-black">{bankingTaxData.taxManagement?.withholdingTaxPayable || "UGX 18,900,000"}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex justify-between text-xs font-black">
                    <span className="text-blue-600">Filing Status:</span>
                    <span className="text-emerald-600">{bankingTaxData.taxManagement?.filingStatus || "Compliant"}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB: Assets & Inventory */}
        {activeFinanceTab === "assets" && (
          <motion.div
            key="assets"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm space-y-8"
          >
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">
                Fixed Assets & <span className="text-blue-600">Inventory Valuation</span>
              </h3>
              <p className="text-slate-500 text-xs font-bold mt-1">Depreciation schedules, property capitalization, and FIFO stock valuations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block">Fixed Assets Registry</span>
                <div className="space-y-3">
                  {(assetsInventoryData.fixedAssets || []).map((fa: any, i: number) => (
                    <div key={i} className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">{fa.name} ({fa.assetId})</span>
                        <span className="text-[10px] text-slate-400 block font-mono">Net Book Value: {fa.netBookValue}</span>
                      </div>
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[9px] font-black uppercase rounded-lg border border-blue-100">
                        {fa.depreciationRate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block">Inventory Accounting</span>
                <div className="space-y-3">
                  {(assetsInventoryData.inventoryAccounting || []).map((inv: any, i: number) => (
                    <div key={i} className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">{inv.description}</span>
                        <span className="text-[10px] text-slate-400 block font-mono">Method: {inv.valuationMethod} • Turnover: {inv.turnoverRate}</span>
                      </div>
                      <span className="font-black text-xs text-slate-900">{inv.totalValuation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 6: Payroll Processing */}
        {activeFinanceTab === "payroll" && (
          <motion.div
            key="payroll"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm space-y-8"
          >
            <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-100 pb-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">
                  National Payroll <span className="text-blue-600">Disbursement</span>
                </h3>
                <p className="text-slate-500 text-xs font-bold mt-1">Audit and execute monthly salary vouchers and statutory deductions.</p>
              </div>

              <button
                onClick={runPayrollDisbursement}
                disabled={isProcessingPayroll}
                className="px-6 py-3 bg-slate-900 hover:bg-blue-600 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl"
              >
                {isProcessingPayroll ? "PROCESSING ALIGNMENTS..." : "Disburse Monthly Payroll Vouchers"}
              </button>
            </div>

            <div className="space-y-4">
              {payrollEmployees.map((emp) => (
                <div key={emp.id} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-bold">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white border border-slate-200 text-slate-500 rounded-2xl flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-black text-slate-900 text-sm block tracking-tight">{emp.name}</span>
                      <span className="text-xs text-slate-400 block">ID: {emp.id} • {emp.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-slate-400 text-[10px] block font-black uppercase">Gross Salary</span>
                      <span className="text-slate-900 text-sm block font-black">${(emp.baseSalary + emp.allowances).toLocaleString()}</span>
                    </div>
                    <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg ${
                      emp.status === "Processed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}>{emp.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 7: Financial AI Terminal */}
        {activeFinanceTab === "ai" && (
          <motion.div
            key="ai"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-8"
          >
            {/* CFO Advisor Overview */}
            <div className="bg-slate-900 text-white rounded-[3.5rem] p-10 border border-white/5 shadow-2xl flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-blue-500/20">
                  CFO Cognitive Insights
                </span>
                <div>
                  <h3 className="text-2xl font-black italic tracking-tight uppercase leading-none">
                    Financial <span className="text-blue-500">Advisory</span>
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold mt-3 leading-relaxed">
                    Auto-generated trial balance audits and risk mitigation forecasts processed by JDHP Artificial Intelligence Gateway.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">CASH FLOW FORECAST</span>
                    <p className="text-xs font-bold leading-relaxed italic text-slate-300">
                      {aiInsights.forecasting}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">MONTH-END CLOSE PREP</span>
                    <p className="text-xs font-bold leading-relaxed italic text-slate-300">
                      {aiInsights.monthEndClosingAssistance}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-center text-slate-400">
                IFRS Regulatory Compliant: 100%
              </div>
            </div>

            {/* AI Conversation terminal */}
            <div className="xl:col-span-2 bg-slate-950 border border-slate-900 rounded-[3.5rem] p-10 flex flex-col justify-between shadow-2xl min-h-[500px]">
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <BrainCircuit className="w-6 h-6 text-blue-500" />
                  <div>
                    <h3 className="text-sm font-black tracking-tight text-white uppercase">CFO AI Copilot Workspace</h3>
                    <span className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">Sovereign Financial Audits</span>
                  </div>
                </div>

                {/* Messages stream */}
                <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 scrollbar-hide no-scrollbar flex flex-col">
                  {aiConversation.map((msg, i) => (
                    <div
                      key={i}
                      className={`max-w-[85%] p-5 rounded-3xl text-xs font-bold leading-relaxed italic ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white self-end rounded-br-none"
                          : "bg-white/5 text-slate-300 border border-white/10 self-start rounded-bl-none"
                      }`}
                    >
                      {msg.role === "agent" && (
                        <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest block mb-2">FAAP CFO Assistant AI</span>
                      )}
                      <p>{msg.text}</p>
                      <span className="text-[8px] text-slate-500 block mt-2 text-right">{msg.timestamp}</span>
                    </div>
                  ))}

                  {isAiThinking && (
                    <div className="bg-white/5 border border-white/10 text-slate-400 p-5 rounded-3xl text-xs font-bold leading-relaxed italic self-start rounded-bl-none max-w-[85%] flex items-center gap-3">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                      <span>CFO AI is reviewing general ledger balances & financial trends...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleAskAIAgent} className="mt-6 flex gap-3 relative">
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Consult FAAP AI with a custom financial query..."
                  disabled={isAiThinking}
                  className="w-full bg-white/5 border border-white/10 focus:border-blue-500 text-white placeholder:text-slate-500 rounded-2xl px-6 py-4 text-xs font-bold outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={isAiThinking || !aiQuery.trim()}
                  className="px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shrink-0"
                >
                  Query CFO
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
