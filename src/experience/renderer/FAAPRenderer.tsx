import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Building2,
  Calculator,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  CloudOff,
  CreditCard,
  Database,
  Download,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Landmark,
  Layers3,
  LockKeyhole,
  Menu,
  RefreshCw,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Wallet,
  Workflow,
  X,
  Zap
} from "lucide-react";

type CurrencyCode =
  | "UGX"
  | "USD"
  | "EUR"
  | "GBP"
  | "KES"
  | "TZS"
  | "RWF"
  | "ZAR"
  | "NGN";

type FinanceTab =
  | "overview"
  | "ledger"
  | "payables"
  | "receivables"
  | "banking"
  | "budget"
  | "assets"
  | "inventory"
  | "payroll"
  | "tax"
  | "treasury"
  | "reports"
  | "controls"
  | "documents"
  | "automation";

interface JournalEntry {
  id: string;
  reference: string;
  account: string;
  description: string;
  debit: number;
  credit: number;
  currency: CurrencyCode;
  status: "Posted" | "Pending" | "Approved";
  date: string;
}

interface Payable {
  id: string;
  vendor: string;
  amount: number;
  currency: CurrencyCode;
  due: string;
  status: "Pending Approval" | "Approved" | "Paid";
}

interface Receivable {
  id: string;
  client: string;
  amount: number;
  currency: CurrencyCode;
  due: string;
  status: "Invoiced" | "Collected";
}

interface Budget {
  id: string;
  department: string;
  category: string;
  allocated: number;
  committed: number;
  utilized: number;
}

const currencySymbols: Record<CurrencyCode, string> = {
  UGX: "UGX",
  USD: "$",
  EUR: "€",
  GBP: "£",
  KES: "KES",
  TZS: "TZS",
  RWF: "RWF",
  ZAR: "R",
  NGN: "₦"
};

const initialJournals: JournalEntry[] = [
  {
    id: "JE-10001",
    reference: "FAAP-GL-10001",
    account: "1100 · Main Operating Bank",
    description: "Institutional operating receipt",
    debit: 245000000,
    credit: 0,
    currency: "UGX",
    status: "Posted",
    date: "2026-08-08"
  },
  {
    id: "JE-10002",
    reference: "FAAP-GL-10002",
    account: "4100 · Service Revenue",
    description: "Enterprise service revenue recognition",
    debit: 0,
    credit: 245000000,
    currency: "UGX",
    status: "Posted",
    date: "2026-08-08"
  },
  {
    id: "JE-10003",
    reference: "FAAP-GL-10003",
    account: "5200 · Operating Expense",
    description: "Approved supplier expenditure",
    debit: 18500000,
    credit: 0,
    currency: "UGX",
    status: "Approved",
    date: "2026-08-08"
  },
  {
    id: "JE-10004",
    reference: "FAAP-GL-10004",
    account: "2100 · Accounts Payable",
    description: "Supplier liability recognition",
    debit: 0,
    credit: 18500000,
    currency: "UGX",
    status: "Approved",
    date: "2026-08-08"
  }
];

const initialPayables: Payable[] = [
  {
    id: "AP-24001",
    vendor: "Enterprise Infrastructure Services",
    amount: 18500000,
    currency: "UGX",
    due: "2026-08-15",
    status: "Pending Approval"
  },
  {
    id: "AP-24002",
    vendor: "Digital Communications Provider",
    amount: 4200000,
    currency: "UGX",
    due: "2026-08-18",
    status: "Approved"
  },
  {
    id: "AP-24003",
    vendor: "Cloud Infrastructure Partner",
    amount: 3200,
    currency: "USD",
    due: "2026-08-20",
    status: "Paid"
  }
];

const initialReceivables: Receivable[] = [
  {
    id: "AR-34001",
    client: "Enterprise Platform Tenant",
    amount: 78000000,
    currency: "UGX",
    due: "2026-08-12",
    status: "Invoiced"
  },
  {
    id: "AR-34002",
    client: "National Services Institution",
    amount: 124000000,
    currency: "UGX",
    due: "2026-08-10",
    status: "Collected"
  },
  {
    id: "AR-34003",
    client: "Regional Enterprise Group",
    amount: 8500,
    currency: "USD",
    due: "2026-08-25",
    status: "Invoiced"
  }
];

const initialBudgets: Budget[] = [
  {
    id: "B-001",
    department: "Digital Infrastructure",
    category: "Operations",
    allocated: 850000000,
    committed: 420000000,
    utilized: 318000000
  },
  {
    id: "B-002",
    department: "Enterprise Services",
    category: "Service Delivery",
    allocated: 620000000,
    committed: 284000000,
    utilized: 221000000
  },
  {
    id: "B-003",
    department: "Research & Innovation",
    category: "Development",
    allocated: 380000000,
    committed: 141000000,
    utilized: 96000000
  },
  {
    id: "B-004",
    department: "Administration",
    category: "Corporate",
    allocated: 260000000,
    committed: 97000000,
    utilized: 74000000
  }
];

const tabs: Array<{
  id: FinanceTab;
  label: string;
  icon: React.ElementType;
}> = [
  { id: "overview", label: "Executive Overview", icon: BarChart3 },
  { id: "ledger", label: "General Ledger", icon: BookOpen },
  { id: "payables", label: "Accounts Payable", icon: ArrowDownRight },
  { id: "receivables", label: "Accounts Receivable", icon: ArrowUpRight },
  { id: "banking", label: "Banking & Reconciliation", icon: Landmark },
  { id: "budget", label: "Budget & Commitments", icon: Calculator },
  { id: "assets", label: "Fixed Assets", icon: Building2 },
  { id: "inventory", label: "Inventory Accounting", icon: Layers3 },
  { id: "payroll", label: "Payroll", icon: Wallet },
  { id: "tax", label: "Tax & Compliance", icon: FileCheck2 },
  { id: "treasury", label: "Treasury", icon: CircleDollarSign },
  { id: "reports", label: "Financial Reports", icon: FileText },
  { id: "controls", label: "Controls & Audit", icon: ShieldCheck },
  { id: "documents", label: "Digital Documents", icon: FileSpreadsheet },
  { id: "automation", label: "Automation & Upgrades", icon: Workflow }
];

function formatMoney(amount: number, currency: CurrencyCode = "UGX") {
  const symbol = currencySymbols[currency];

  return `${symbol} ${amount.toLocaleString("en-US", {
    maximumFractionDigits: currency === "UGX" || currency === "RWF" ? 0 : 2
  })}`;
}

function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  tone = "blue"
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
  trend?: string;
  tone?: "blue" | "emerald" | "amber" | "violet";
}) {
  const tones = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    violet: "bg-violet-50 text-violet-700 border-violet-100"
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {title}
          </span>
          <div className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
            {value}
          </div>
          <p className="text-[11px] font-semibold text-slate-500 mt-1">
            {subtitle}
          </p>
        </div>
        <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${tones[tone]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {trend && (
        <div className="mt-5 text-[10px] font-black uppercase tracking-wider text-emerald-600 flex items-center gap-1">
          <ArrowUpRight className="w-3.5 h-3.5" />
          {trend}
        </div>
      )}
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 border-b border-slate-100 pb-6">
      <div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
          {eyebrow}
        </span>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
          {title}
        </h3>
        <p className="text-xs font-semibold text-slate-500 mt-1 max-w-3xl">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

export function FAAPRenderer() {
  const [activeFinanceTab, setActiveFinanceTab] =
    useState<FinanceTab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCurrency, setSelectedCurrency] =
    useState<CurrencyCode>("UGX");
  const [journals, setJournals] = useState<JournalEntry[]>(initialJournals);
  const [payables, setPayables] = useState<Payable[]>(initialPayables);
  const [receivables, setReceivables] =
    useState<Receivable[]>(initialReceivables);
  const [budgets] = useState<Budget[]>(initialBudgets);
  const [notification, setNotification] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState(0);
  const [showCommand, setShowCommand] = useState(false);

  useEffect(() => {
    const savedQueue = Number(
      (() => { try { return window.localStorage.getItem("faap-offline-queue") || "0"; } catch(e) { return "0"; } })()
    );
    setOfflineQueue(savedQueue);
  }, []);

  const pushQueue = (operation: string) => {
    const next = offlineQueue + 1;
    setOfflineQueue(next);
    try { window.localStorage.setItem("faap-offline-queue", String(next)); } catch (e) {}
    setNotification(`${operation} queued for hybrid synchronization.`);
    window.setTimeout(() => setNotification(""), 3500);
  };

  const synchronize = async () => {
    setSyncing(true);
    setNotification("FAAP hybrid synchronization in progress...");

    await new Promise((resolve) => setTimeout(resolve, 900));

    setOfflineQueue(0);
    try { window.localStorage.setItem("faap-offline-queue", "0"); } catch (e) {}
    setSyncing(false);
    setNotification("FAAP synchronization completed successfully.");
    window.setTimeout(() => setNotification(""), 3500);
  };

  const approvePayable = (id: string) => {
    setPayables((current) =>
      current.map((pay) =>
        pay.id === id ? { ...pay, status: "Approved" } : pay
      )
    );
    pushQueue(`Payable ${id} approved`);
  };

  const settlePayable = (id: string) => {
    setPayables((current) =>
      current.map((pay) =>
        pay.id === id ? { ...pay, status: "Paid" } : pay
      )
    );
    pushQueue(`Payable ${id} settlement initiated`);
  };

  const collectReceivable = (id: string) => {
    setReceivables((current) =>
      current.map((rec) =>
        rec.id === id ? { ...rec, status: "Collected" } : rec
      )
    );
    pushQueue(`Receivable ${id} collection recorded`);
  };

  const postJournal = () => {
    const id = `JE-${Date.now().toString().slice(-6)}`;

    const entry: JournalEntry = {
      id,
      reference: `FAAP-AUTO-${Date.now().toString().slice(-6)}`,
      account: "1000 · Automated Clearing",
      description: "Automated FAAP clearing journal",
      debit: 1250000,
      credit: 1250000,
      currency: selectedCurrency,
      status: "Posted",
      date: new Date().toISOString().slice(0, 10)
    };

    setJournals((current) => [entry, ...current]);
    pushQueue(`Journal ${id} posted`);
  };

  const runAutomation = (name: string) => {
    pushQueue(`${name} automation executed`);
  };

  const filteredJournals = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return journals;

    return journals.filter((entry) =>
      `${entry.id} ${entry.reference} ${entry.account} ${entry.description}`
        .toLowerCase()
        .includes(query)
    );
  }, [journals, search]);

  const totalAssets = 2840000000;
  const totalLiabilities = 1160000000;
  const netPosition = totalAssets - totalLiabilities;
  const cashPosition = 1680000000;
  const receivableValue = receivables
    .filter((r) => r.status === "Invoiced")
    .reduce((sum, r) => sum + r.amount, 0);
  const payableValue = payables
    .filter((p) => p.status !== "Paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const budgetUtilization = Math.round(
    (budgets.reduce((sum, b) => sum + b.utilized, 0) /
      budgets.reduce((sum, b) => sum + b.allocated, 0)) *
      100
  );

  return (
    <div className="min-h-full bg-slate-50 text-slate-900">
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-5 right-5 z-[100] bg-slate-950 text-white px-5 py-4 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-3"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {notification}
        </motion.div>
      )}

      <div className="flex min-h-[calc(100vh-2rem)]">
        <AnimatePresence>
          {(sidebarOpen || typeof window !== "undefined") && (
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              className={`fixed md:sticky md:top-0 z-40 md:z-auto h-screen md:h-auto w-72 shrink-0 bg-slate-950 text-white p-5 overflow-y-auto ${
                sidebarOpen ? "block" : "hidden md:block"
              }`}
            >
              <div className="flex items-center justify-between mb-8 px-2">
                <div>
                  <div className="text-lg font-black tracking-tight">
                    JUMO <span className="text-blue-400">FAAP</span>
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mt-1">
                    Enterprise Finance Core
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="md:hidden text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-black uppercase tracking-wider">
                    Finance Runtime Online
                  </span>
                </div>
                <div className="text-[9px] text-slate-500 mt-2">
                  UEOS Kernel • FAAP Runtime v13
                </div>
              </div>

              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeFinanceTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveFinanceTab(tab.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-[11px] font-bold transition-all ${
                        active
                          ? "bg-blue-600 text-white shadow-lg"
                          : "text-slate-400 hover:bg-slate-900 hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                      {active && (
                        <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                  Hybrid Runtime
                </span>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[10px] font-bold text-slate-300">
                    Offline queue
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-amber-500/10 text-amber-400 text-[9px] font-black">
                    {offlineQueue}
                  </span>
                </div>
                <button
                  onClick={synchronize}
                  disabled={syncing}
                  className="mt-3 w-full px-3 py-2 bg-white text-slate-950 rounded-xl text-[9px] font-black uppercase tracking-wider disabled:opacity-50"
                >
                  {syncing ? "Synchronizing..." : "Sync Runtime"}
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="flex-1 min-w-0">
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
            <div className="px-4 md:px-8 py-4 flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-xl bg-slate-100"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex-1 relative max-w-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search ledger, invoices, accounts, references..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-blue-400"
                />
              </div>

              <select
                value={selectedCurrency}
                onChange={(e) =>
                  setSelectedCurrency(e.target.value as CurrencyCode)
                }
                className="hidden sm:block bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-black outline-none"
              >
                {Object.keys(currencySymbols).map((code) => (
                  <option key={code}>{code}</option>
                ))}
              </select>

              <button
                onClick={() => setShowCommand(true)}
                className="p-2.5 bg-slate-950 text-white rounded-xl"
                title="Finance command centre"
              >
                <Zap className="w-4 h-4" />
              </button>
            </div>
          </header>

          <div className="p-4 md:p-8 max-w-[1800px] mx-auto">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-7">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-[9px] font-black uppercase tracking-widest">
                    Enterprise Finance
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Digital • Automated • Hybrid
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                  FAAP Finance Command Centre
                </h1>
                <p className="text-xs md:text-sm font-semibold text-slate-500 mt-2 max-w-3xl">
                  Financial Accounting and Allocation Platform operating as
                  the UEOS financial system of record with automated controls,
                  digital workflows and hybrid transaction continuity.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => runAutomation("Financial reconciliation")}
                  className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reconcile
                </button>
                <button
                  onClick={() => runAutomation("Financial period close")}
                  className="px-4 py-2.5 bg-slate-950 text-white rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-2"
                >
                  <LockKeyhole className="w-3.5 h-3.5" />
                  Close Controls
                </button>
              </div>
            </div>

            {activeFinanceTab === "overview" && (
              <div className="space-y-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                  <MetricCard
                    title="Cash & Equivalents"
                    value={formatMoney(cashPosition)}
                    subtitle="Consolidated liquidity position"
                    icon={Wallet}
                    trend="4.8% vs previous period"
                    tone="emerald"
                  />
                  <MetricCard
                    title="Total Assets"
                    value={formatMoney(totalAssets)}
                    subtitle="Enterprise balance sheet"
                    icon={Building2}
                    trend="2.4% growth"
                    tone="blue"
                  />
                  <MetricCard
                    title="Net Position"
                    value={formatMoney(netPosition)}
                    subtitle="Assets less liabilities"
                    icon={CircleDollarSign}
                    trend="Healthy position"
                    tone="violet"
                  />
                  <MetricCard
                    title="Budget Utilization"
                    value={`${budgetUtilization}%`}
                    subtitle="Across active allocations"
                    icon={Calculator}
                    tone="amber"
                  />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2 bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
                    <SectionHeader
                      eyebrow="Financial position"
                      title="Enterprise financial health"
                      description="Real-time control indicators assembled from the FAAP transaction and allocation runtime."
                      action={
                        <button
                          onClick={() => setActiveFinanceTab("reports")}
                          className="text-[10px] font-black uppercase text-blue-600"
                        >
                          Open reports →
                        </button>
                      }
                    />

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                      {[
                        ["Receivables", formatMoney(receivableValue), "blue"],
                        ["Payables", formatMoney(payableValue), "amber"],
                        ["Liabilities", formatMoney(totalLiabilities), "violet"],
                        ["Journal Entries", journals.length.toString(), "emerald"]
                      ].map(([label, value, tone]) => (
                        <div
                          key={label}
                          className="p-5 rounded-2xl bg-slate-50 border border-slate-100"
                        >
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                            {label}
                          </span>
                          <div className="font-black text-slate-900 mt-2">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-7 space-y-4">
                      {[
                        ["Ledger integrity", "Balanced", "100%"],
                        ["Bank reconciliation", "Automated", "98.6%"],
                        ["Approval controls", "Healthy", "96.4%"],
                        ["Tax compliance", "Current", "100%"]
                      ].map(([label, status, percent]) => (
                        <div key={label}>
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-wider mb-2">
                            <span>{label}</span>
                            <span className="text-emerald-600">
                              {status} · {percent}
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: percent }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-950 text-white rounded-3xl p-7 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
                        FAAP Automation
                      </span>
                    </div>
                    <h3 className="text-xl font-black mt-3">
                      Finance operations without paperwork
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 mt-2 leading-relaxed">
                      Digital approvals, automated journal creation,
                      reconciliation, document generation, tax controls and
                      synchronization are coordinated by the UEOS runtime.
                    </p>

                    <div className="mt-6 space-y-3">
                      {[
                        "Auto-post approved transactions",
                        "Reconcile connected bank feeds",
                        "Generate financial statements",
                        "Queue offline transactions",
                        "Synchronize when connectivity returns",
                        "Validate upgrades before activation"
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-[10px] font-bold text-slate-300"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    {
                      title: "Digital Ledger",
                      text: "Double-entry journal processing with controlled posting and audit history.",
                      icon: BookOpen,
                      tab: "ledger" as FinanceTab
                    },
                    {
                      title: "Treasury",
                      text: "Multi-currency liquidity, allocations, settlement and exposure controls.",
                      icon: CircleDollarSign,
                      tab: "treasury" as FinanceTab
                    },
                    {
                      title: "Digital Documents",
                      text: "Generate structured finance documents for Excel and Word workflows.",
                      icon: FileSpreadsheet,
                      tab: "documents" as FinanceTab
                    }
                  ].map((card) => {
                    const Icon = card.icon;
                    return (
                      <button
                        key={card.title}
                        onClick={() => setActiveFinanceTab(card.tab)}
                        className="text-left bg-white border border-slate-200 rounded-3xl p-6 hover:border-blue-300 hover:shadow-md transition-all"
                      >
                        <Icon className="w-6 h-6 text-blue-600" />
                        <h3 className="font-black mt-4">{card.title}</h3>
                        <p className="text-xs font-semibold text-slate-500 mt-1">
                          {card.text}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {activeFinanceTab === "ledger" && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
                <SectionHeader
                  eyebrow="Double-entry accounting"
                  title="General Ledger"
                  description="Controlled journal creation, posting, approval and audit-ready transaction history."
                  action={
                    <button
                      onClick={postJournal}
                      className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider"
                    >
                      + Post Automated Journal
                    </button>
                  }
                />

                <div className="overflow-x-auto mt-6">
                  <table className="w-full min-w-[850px] text-left">
                    <thead>
                      <tr className="border-b border-slate-100">
                        {["Reference", "Account", "Description", "Debit", "Credit", "Status"].map(
                          (head) => (
                            <th
                              key={head}
                              className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-slate-400"
                            >
                              {head}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredJournals.map((entry) => (
                        <tr
                          key={entry.id}
                          className="border-b border-slate-50 hover:bg-slate-50"
                        >
                          <td className="px-4 py-4">
                            <span className="font-black text-xs">
                              {entry.reference}
                            </span>
                            <span className="block text-[9px] text-slate-400">
                              {entry.date}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-xs font-bold">
                            {entry.account}
                          </td>
                          <td className="px-4 py-4 text-xs font-semibold text-slate-500">
                            {entry.description}
                          </td>
                          <td className="px-4 py-4 text-xs font-black">
                            {entry.debit
                              ? formatMoney(entry.debit, entry.currency)
                              : "—"}
                          </td>
                          <td className="px-4 py-4 text-xs font-black">
                            {entry.credit
                              ? formatMoney(entry.credit, entry.currency)
                              : "—"}
                          </td>
                          <td className="px-4 py-4">
                            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase">
                              {entry.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeFinanceTab === "payables" && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
                <SectionHeader
                  eyebrow="Supplier liabilities"
                  title="Accounts Payable"
                  description="Digital invoice approval, controlled settlement and automated liability posting."
                />

                <div className="space-y-4 mt-6">
                  {payables.map((pay) => (
                    <div
                      key={pay.id}
                      className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center">
                          <ArrowDownRight className="w-5 h-5 text-rose-500" />
                        </div>
                        <div>
                          <span className="font-black text-sm">
                            {pay.vendor}
                          </span>
                          <span className="block text-[9px] text-slate-400 font-mono mt-1">
                            {pay.id} · Due {pay.due}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-black">
                          {formatMoney(pay.amount, pay.currency)}
                        </span>
                        <span
                          className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase ${
                            pay.status === "Paid"
                              ? "bg-emerald-100 text-emerald-700"
                              : pay.status === "Approved"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {pay.status}
                        </span>

                        {pay.status === "Pending Approval" && (
                          <button
                            onClick={() => approvePayable(pay.id)}
                            className="px-4 py-2 bg-slate-950 text-white rounded-xl text-[9px] font-black uppercase"
                          >
                            Approve
                          </button>
                        )}

                        {pay.status === "Approved" && (
                          <button
                            onClick={() => settlePayable(pay.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase"
                          >
                            Disburse
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeFinanceTab === "receivables" && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
                <SectionHeader
                  eyebrow="Customer collections"
                  title="Accounts Receivable"
                  description="Invoice lifecycle, collections and automatic settlement recording."
                />

                <div className="space-y-4 mt-6">
                  {receivables.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      <div>
                        <span className="font-black text-sm">
                          {rec.client}
                        </span>
                        <span className="block text-[9px] text-slate-400 font-mono mt-1">
                          {rec.id} · Due {rec.due}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-black">
                          {formatMoney(rec.amount, rec.currency)}
                        </span>
                        <span
                          className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase ${
                            rec.status === "Collected"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {rec.status}
                        </span>

                        {rec.status === "Invoiced" && (
                          <button
                            onClick={() => collectReceivable(rec.id)}
                            className="px-4 py-2 bg-slate-950 text-white rounded-xl text-[9px] font-black uppercase"
                          >
                            Record Collection
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeFinanceTab === "banking" && (
              <div className="space-y-6">
                <SectionHeader
                  eyebrow="Banking infrastructure"
                  title="Banking & Reconciliation"
                  description="Digital bank feeds, transaction matching, reconciliation exceptions and settlement controls."
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {[
                    ["Primary Operating Bank", "Connected", "1,248 transactions"],
                    ["Settlement Account", "Connected", "426 transactions"],
                    ["Treasury Account", "Connected", "98 transactions"]
                  ].map(([name, status, volume]) => (
                    <div
                      key={name}
                      className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm"
                    >
                      <Landmark className="w-6 h-6 text-blue-600" />
                      <h3 className="font-black mt-4">{name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-black uppercase text-emerald-600">
                          {status}
                        </span>
                      </div>
                      <p className="text-[10px] font-semibold text-slate-500 mt-2">
                        {volume}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-black">Automated reconciliation</h3>
                      <p className="text-xs font-semibold text-slate-500 mt-1">
                        Matching rules are applied before exceptions enter the
                        finance work queue.
                      </p>
                    </div>
                    <button
                      onClick={() => runAutomation("Bank reconciliation")}
                      className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase"
                    >
                      Run Reconciliation
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="p-4 rounded-2xl bg-emerald-50">
                      <span className="text-[9px] font-black uppercase text-emerald-700">
                        Matched
                      </span>
                      <div className="text-xl font-black mt-1">98.6%</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-amber-50">
                      <span className="text-[9px] font-black uppercase text-amber-700">
                        Exceptions
                      </span>
                      <div className="text-xl font-black mt-1">17</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-blue-50">
                      <span className="text-[9px] font-black uppercase text-blue-700">
                        Auto-posted
                      </span>
                      <div className="text-xl font-black mt-1">1,143</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeFinanceTab === "budget" && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
                <SectionHeader
                  eyebrow="Financial planning"
                  title="Budget & Commitments"
                  description="Allocation control, commitments, utilization and variance monitoring."
                />

                <div className="space-y-5 mt-6">
                  {budgets.map((budget) => {
                    const utilization = Math.min(
                      100,
                      Math.round(
                        (budget.utilized / budget.allocated) * 100
                      )
                    );
                    const committed = Math.min(
                      100,
                      Math.round(
                        (budget.committed / budget.allocated) * 100
                      )
                    );

                    return (
                      <div
                        key={budget.id}
                        className="p-6 bg-slate-50 border border-slate-100 rounded-2xl"
                      >
                        <div className="flex justify-between gap-4 flex-wrap">
                          <div>
                            <span className="font-black">{budget.department}</span>
                            <span className="block text-[9px] uppercase tracking-widest text-slate-400 mt-1">
                              {budget.category}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] uppercase font-black text-slate-400 block">
                              Allocation
                            </span>
                            <span className="font-black">
                              {formatMoney(budget.allocated)}
                            </span>
                          </div>
                        </div>

                        <div className="mt-5">
                          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${utilization}%` }}
                            />
                          </div>
                          <div className="flex justify-between mt-2 text-[9px] font-black uppercase">
                            <span className="text-slate-400">
                              Utilized {utilization}%
                            </span>
                            <span className="text-amber-600">
                              Committed {committed}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeFinanceTab === "assets" && (
              <div className="space-y-6">
                <SectionHeader
                  eyebrow="Capital management"
                  title="Fixed Assets"
                  description="Digital asset registry, capitalization, depreciation and disposal controls."
                  action={
                    <button
                      onClick={() => runAutomation("Depreciation run")}
                      className="px-4 py-2.5 bg-slate-950 text-white rounded-xl text-[9px] font-black uppercase"
                    >
                      Run Depreciation
                    </button>
                  }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {[
                    ["Enterprise Server Cluster", "FA-001", "UGX 820,000,000", "12.5%"],
                    ["Office Property", "FA-002", "UGX 1,240,000,000", "2.5%"],
                    ["Transport Fleet", "FA-003", "UGX 310,000,000", "20%"],
                    ["Network Infrastructure", "FA-004", "UGX 185,000,000", "15%"],
                    ["Office Equipment", "FA-005", "UGX 92,000,000", "20%"],
                    ["Digital Infrastructure", "FA-006", "UGX 148,000,000", "25%"]
                  ].map(([name, id, value, rate]) => (
                    <div
                      key={id}
                      className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm"
                    >
                      <Building2 className="w-6 h-6 text-blue-600" />
                      <h3 className="font-black mt-4">{name}</h3>
                      <span className="text-[9px] text-slate-400 font-mono">
                        {id}
                      </span>
                      <div className="mt-5 flex justify-between">
                        <span className="text-[9px] font-black uppercase text-slate-400">
                          Net book value
                        </span>
                        <span className="text-xs font-black">{value}</span>
                      </div>
                      <div className="mt-3 text-[9px] font-black text-blue-600 uppercase">
                        Depreciation {rate}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeFinanceTab === "inventory" && (
              <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
                <SectionHeader
                  eyebrow="Inventory accounting"
                  title="Stock Valuation & Control"
                  description="Accounting integration for inventory receipts, issues, valuation, turnover and cost recognition."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
                  {[
                    ["Inventory Value", "UGX 486,000,000", "FIFO"],
                    ["Stock Turnover", "7.8x", "Annualized"],
                    ["Pending Receipts", "26", "Purchase orders"]
                  ].map(([label, value, detail]) => (
                    <div
                      key={label}
                      className="p-6 bg-slate-50 rounded-2xl border border-slate-100"
                    >
                      <span className="text-[9px] uppercase font-black tracking-widest text-slate-400">
                        {label}
                      </span>
                      <div className="text-2xl font-black mt-2">{value}</div>
                      <span className="text-[9px] font-bold text-blue-600 uppercase">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => runAutomation("Inventory valuation")}
                  className="mt-6 px-5 py-3 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase"
                >
                  Run Automated Valuation
                </button>
              </div>
            )}

            {activeFinanceTab === "payroll" && (
              <div className="space-y-6">
                <SectionHeader
                  eyebrow="People finance"
                  title="Payroll Processing"
                  description="Digital payroll calculation, approval, statutory deduction and disbursement workflow."
                  action={
                    <button
                      onClick={() => runAutomation("Payroll calculation")}
                      className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase"
                    >
                      Run Payroll
                    </button>
                  }
                />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                  {[
                    ["Employees", "1,284"],
                    ["Gross Payroll", "UGX 1.84B"],
                    ["Statutory Deductions", "UGX 312M"],
                    ["Net Disbursement", "UGX 1.53B"]
                  ].map(([label, value]) => (
                    <MetricCard
                      key={label}
                      title={label}
                      value={value}
                      subtitle="Current payroll period"
                      icon={Wallet}
                    />
                  ))}
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black">Payroll processing pipeline</h3>
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase">
                      Ready
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
                    {[
                      "Attendance",
                      "Calculation",
                      "Approval",
                      "Statutory",
                      "Disbursement"
                    ].map((step, index) => (
                      <div
                        key={step}
                        className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center"
                      >
                        <div className="w-8 h-8 mx-auto rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs">
                          {index + 1}
                        </div>
                        <span className="text-[9px] font-black uppercase mt-3 block">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeFinanceTab === "tax" && (
              <div className="space-y-6">
                <SectionHeader
                  eyebrow="Statutory finance"
                  title="Tax & Compliance"
                  description="Automated tax calculations, withholding, VAT control, filing readiness and compliance evidence."
                  action={
                    <button
                      onClick={() => runAutomation("Tax compliance validation")}
                      className="px-4 py-2.5 bg-slate-950 text-white rounded-xl text-[9px] font-black uppercase"
                    >
                      Validate Compliance
                    </button>
                  }
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    ["VAT Control", "18%", "Current configured rate"],
                    ["VAT Pool", "UGX 160.27M", "Collected"],
                    ["WHT Payable", "UGX 18.9M", "Pending statutory settlement"]
                  ].map(([label, value, detail]) => (
                    <div
                      key={label}
                      className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm"
                    >
                      <FileCheck2 className="w-6 h-6 text-blue-600" />
                      <span className="block text-[9px] uppercase font-black tracking-widest text-slate-400 mt-4">
                        {label}
                      </span>
                      <div className="text-2xl font-black mt-2">{value}</div>
                      <p className="text-[10px] font-semibold text-slate-500 mt-1">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeFinanceTab === "treasury" && (
              <div className="space-y-6">
                <SectionHeader
                  eyebrow="Liquidity management"
                  title="Treasury & Multi-Currency"
                  description="Liquidity allocation, currency exposure, settlement pools and treasury controls."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                  {[
                    ["UGX", "UGX 1.68B", "Primary liquidity"],
                    ["USD", "$184,200", "Settlement reserve"],
                    ["EUR", "€72,400", "Operating reserve"],
                    ["KES", "KES 9.4M", "Regional reserve"]
                  ].map(([currency, amount, detail]) => (
                    <div
                      key={currency}
                      className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm"
                    >
                      <CircleDollarSign className="w-6 h-6 text-blue-600" />
                      <div className="text-2xl font-black mt-4">{amount}</div>
                      <span className="text-[9px] uppercase tracking-widest font-black text-slate-400">
                        {currency} · {detail}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-950 text-white rounded-3xl p-7">
                  <span className="text-[9px] uppercase tracking-widest font-black text-blue-400">
                    Treasury automation
                  </span>
                  <h3 className="text-xl font-black mt-2">
                    Intelligent liquidity allocation
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold mt-2 max-w-2xl">
                    FAAP can route approved allocations through the treasury
                    workflow while preserving currency, authorization,
                    settlement and audit controls.
                  </p>
                  <button
                    onClick={() => runAutomation("Treasury liquidity allocation")}
                    className="mt-5 px-5 py-3 bg-white text-slate-950 rounded-xl text-[9px] font-black uppercase"
                  >
                    Run Liquidity Allocation
                  </button>
                </div>
              </div>
            )}

            {activeFinanceTab === "reports" && (
              <div className="space-y-6">
                <SectionHeader
                  eyebrow="Financial intelligence"
                  title="Financial Reports"
                  description="Generate controlled financial statements and management reporting from the FAAP ledger."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {[
                    ["Statement of Financial Position", "Balance Sheet"],
                    ["Statement of Comprehensive Income", "Income Statement"],
                    ["Cash Flow Statement", "Cash Flow"],
                    ["Trial Balance", "Ledger Control"],
                    ["Budget vs Actual", "Management"],
                    ["General Ledger Detail", "Audit"]
                  ].map(([name, category]) => (
                    <div
                      key={name}
                      className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm"
                    >
                      <FileText className="w-6 h-6 text-blue-600" />
                      <span className="block text-[9px] uppercase font-black text-slate-400 tracking-widest mt-4">
                        {category}
                      </span>
                      <h3 className="font-black mt-2">{name}</h3>
                      <div className="flex gap-2 mt-5">
                        <button
                          onClick={() =>
                            runAutomation(`Generate ${name}`)
                          }
                          className="px-3 py-2 bg-slate-950 text-white rounded-lg text-[9px] font-black uppercase"
                        >
                          Generate
                        </button>
                        <button
                          onClick={() =>
                            runAutomation(`Export ${name} to Excel`)
                          }
                          className="px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-[9px] font-black uppercase flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          Excel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeFinanceTab === "controls" && (
              <div className="space-y-6">
                <SectionHeader
                  eyebrow="Governance & assurance"
                  title="Controls & Audit"
                  description="Continuous finance controls, segregation of duties, approvals, audit evidence and exception monitoring."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                  {[
                    ["Ledger Integrity", "100%", "Passed"],
                    ["Segregation of Duties", "98.7%", "Healthy"],
                    ["Approval Compliance", "96.4%", "Healthy"],
                    ["Audit Evidence", "100%", "Available"]
                  ].map(([name, value, status]) => (
                    <div
                      key={name}
                      className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm"
                    >
                      <ShieldCheck className="w-6 h-6 text-emerald-600" />
                      <span className="block text-[9px] uppercase font-black tracking-widest text-slate-400 mt-4">
                        {name}
                      </span>
                      <div className="text-2xl font-black mt-2">{value}</div>
                      <span className="text-[9px] font-black uppercase text-emerald-600">
                        {status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
                  <h3 className="font-black">Continuous control monitor</h3>
                  <div className="space-y-3 mt-5">
                    {[
                      "Duplicate transaction detection",
                      "Unbalanced journal detection",
                      "Unauthorized account access",
                      "Budget overspend prevention",
                      "Supplier payment approval",
                      "Period close integrity"
                    ].map((control) => (
                      <div
                        key={control}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
                      >
                        <span className="text-xs font-bold">{control}</span>
                        <span className="flex items-center gap-1 text-[9px] font-black uppercase text-emerald-600">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Monitoring
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeFinanceTab === "documents" && (
              <div className="space-y-6">
                <SectionHeader
                  eyebrow="Digital office integration"
                  title="Excel & Word Finance Workspace"
                  description="Structured financial data can move between FAAP, spreadsheet analysis and document reporting without paper-based workflows."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
                    <FileSpreadsheet className="w-8 h-8 text-emerald-600" />
                    <h3 className="text-xl font-black mt-4">
                      Microsoft Excel interoperability
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-2">
                      Export ledgers, budgets, reconciliations and reports into
                      spreadsheet-ready structures and import validated
                      finance datasets.
                    </p>
                    <div className="space-y-2 mt-6">
                      {[
                        "Ledger export",
                        "Budget templates",
                        "Bank reconciliation data",
                        "Bulk journal import",
                        "Management analysis datasets"
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-[10px] font-bold"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => runAutomation("Excel finance export")}
                      className="mt-6 px-5 py-3 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase"
                    >
                      Generate Excel Dataset
                    </button>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <h3 className="text-xl font-black mt-4">
                      Microsoft Word interoperability
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-2">
                      Produce structured finance reports, approval documents,
                      statements and audit evidence from controlled FAAP data.
                    </p>
                    <div className="space-y-2 mt-6">
                      {[
                        "Financial statements",
                        "Payment vouchers",
                        "Audit reports",
                        "Budget reports",
                        "Approval documents"
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-[10px] font-bold"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => runAutomation("Word finance document")}
                      className="mt-6 px-5 py-3 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase"
                    >
                      Generate Word Document
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeFinanceTab === "automation" && (
              <div className="space-y-6">
                <SectionHeader
                  eyebrow="UEOS automation"
                  title="Automation, Hybrid Runtime & Upgrades"
                  description="FAAP lifecycle operations are designed around digital execution, validation, synchronization and controlled upgrades rather than manual paperwork."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                  {[
                    ["Workflow Engine", "Operational", Workflow],
                    ["Hybrid Sync", "Operational", RefreshCw],
                    ["Upgrade Engine", "Ready", Zap],
                    ["Audit Engine", "Monitoring", ShieldCheck]
                  ].map(([name, status, Icon]) => {
                    const RuntimeIcon = Icon as React.ElementType;
                    return (
                      <div
                        key={name as string}
                        className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm"
                      >
                        <RuntimeIcon className="w-6 h-6 text-blue-600" />
                        <h3 className="font-black mt-4">{name as string}</h3>
                        <span className="text-[9px] font-black uppercase text-emerald-600">
                          {status as string}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-slate-950 text-white rounded-3xl p-7">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-400" />
                    <span className="text-[9px] uppercase tracking-widest font-black text-blue-400">
                      Automated lifecycle
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    {[
                      ["1", "Detect"],
                      ["2", "Validate"],
                      ["3", "Migrate"],
                      ["4", "Activate"]
                    ].map(([number, label]) => (
                      <div
                        key={number}
                        className="p-5 rounded-2xl bg-white/5 border border-white/10"
                      >
                        <span className="text-2xl font-black text-blue-400">
                          {number}
                        </span>
                        <span className="block font-black mt-2">{label}</span>
                        <span className="block text-[9px] text-slate-500 mt-1">
                          UEOS controlled lifecycle stage
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 mt-7">
                    <button
                      onClick={() => runAutomation("FAAP upgrade validation")}
                      className="px-5 py-3 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase"
                    >
                      Validate Upgrade
                    </button>
                    <button
                      onClick={() => runAutomation("FAAP migration preparation")}
                      className="px-5 py-3 bg-white text-slate-950 rounded-xl text-[9px] font-black uppercase"
                    >
                      Prepare Migration
                    </button>
                    <button
                      onClick={() => runAutomation("FAAP health audit")}
                      className="px-5 py-3 bg-slate-800 text-white rounded-xl text-[9px] font-black uppercase"
                    >
                      Run Health Audit
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
                  <div className="flex items-center gap-3">
                    <CloudOff className="w-5 h-5 text-amber-600" />
                    <div>
                      <h3 className="font-black">
                        Hybrid / offline transaction continuity
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 mt-1">
                        Finance operations can queue locally and synchronize
                        when connectivity becomes available.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <span className="px-4 py-2 rounded-xl bg-amber-50 text-amber-700 text-[9px] font-black uppercase">
                      Queue: {offlineQueue}
                    </span>
                    <button
                      onClick={synchronize}
                      disabled={syncing}
                      className="px-5 py-3 bg-slate-950 text-white rounded-xl text-[9px] font-black uppercase disabled:opacity-50"
                    >
                      {syncing
                        ? "Synchronizing..."
                        : "Synchronize Finance Runtime"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <AnimatePresence>
        {showCommand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowCommand(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(event) => event.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-7"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-blue-600">
                    UEOS Finance Command
                  </span>
                  <h3 className="text-2xl font-black mt-1">
                    FAAP Operations
                  </h3>
                </div>
                <button
                  onClick={() => setShowCommand(false)}
                  className="p-2 rounded-xl bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {[
                  ["Post Journal", postJournal],
                  ["Reconcile Banks", () => runAutomation("Bank reconciliation")],
                  ["Run Payroll", () => runAutomation("Payroll")],
                  ["Generate Reports", () => setActiveFinanceTab("reports")],
                  ["Validate Controls", () => setActiveFinanceTab("controls")],
                  ["Synchronize", synchronize]
                ].map(([label, action]) => (
                  <button
                    key={label as string}
                    onClick={() => {
                      (action as () => void)();
                      setShowCommand(false);
                    }}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-left flex items-center justify-between"
                  >
                    <span className="text-xs font-black">{label as string}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
                <Database className="w-5 h-5 text-blue-600" />
                <div>
                  <span className="text-[9px] font-black uppercase text-slate-400">
                    Runtime
                  </span>
                  <span className="block text-xs font-black">
                    UEOS → FAAP → Finance Operations
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FAAPRenderer;
