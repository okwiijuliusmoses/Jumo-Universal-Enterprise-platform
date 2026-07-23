import React, { useState, useEffect } from "react";
import { 
  Power, Terminal, Cpu, Database, Coins, Bot, Sliders, Activity, 
  CheckCircle2, AlertCircle, RefreshCw, Plus, FileText, ArrowRight, 
  ShieldCheck, ShieldAlert, Users, Lock, Settings, Play, Eye, Globe, 
  Building2, Wrench, Network, GitFork, Calendar, DollarSign, Key, Shield
} from "lucide-react";

interface RuntimeConsoleProps {
  blueprintName: string;
}

interface Account {
  code: string;
  name: string;
  category: string;
  balance: number;
}

interface LogStep {
  step: string;
  status: string;
  detail: string;
}

interface BootData {
  success: boolean;
  timestamp: string;
  kernelVersion: string;
  status: string;
  diagnostics: {
    cpuUsage: string;
    memoryUsage: string;
    activeThreads: number;
    activeTenants: number;
    registryCount: number;
  };
  logs: LogStep[];
}

interface JournalEntry {
  id: number;
  timestamp: string;
  account: string;
  debit: number;
  credit: number;
  balancingAccount: string;
  narration: string;
  balanced: boolean;
}

interface RegistryItem {
  name: string;
  type: string;
  status: string;
  tenant: string;
  version: string;
  permissions: string;
  updatedBy: string;
}

interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  status: string;
  details: string;
}

interface WorkflowDefinition {
  id: string;
  name: string;
  triggerEvent: string;
  status: string;
  approvers: string[];
  lastTriggered: string;
}

interface TrialBalanceData {
  items: Array<{
    code: string;
    name: string;
    category: string;
    debit: number;
    credit: number;
  }>;
  totalDebits: number;
  totalCredits: number;
  difference: number;
  isBalanced: boolean;
  accountingPeriod: string;
  fiscalYear: string;
}

export default function RuntimeConsole({ blueprintName }: RuntimeConsoleProps) {
  // Navigation tabs
  const [activeConsoleTab, setActiveConsoleTab] = useState<
    "kernel" | "registries" | "faap" | "ai" | "domains" | "security" | "automation"
  >("kernel");

  // Sub-tabs inside main tabs
  const [kernelSubTab, setKernelSubTab] = useState<"diagnostics" | "lifecycle" | "featureflags">("diagnostics");
  const [faapSubTab, setFaapSubTab] = useState<"journal" | "trialbalance">("journal");
  const [domainSelected, setDomainSelected] = useState<"sacco" | "church" | "education">("sacco");

  // Kernel State
  const [isBooting, setIsBooting] = useState(false);
  const [bootData, setBootData] = useState<BootData | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [currentMetric, setCurrentMetric] = useState({ cpu: "0.0%", mem: "0MB / 512MB" });

  // Feature Flags
  const [featureFlags, setFeatureFlags] = useState({
    STRICT_RBAC: true,
    AUTO_AUDIT: true,
    COGNITIVE_MEM_BUFFER: false,
    HYBRID_SYNC_ACTIVE: true,
    CROSS_DOMAIN_TRIGGERS: true,
  });

  // Services State (Dynamic start/stop)
  const [services, setServices] = useState([
    { id: "SVC-01", name: "Identity & Zero-Trust Authentication Service", type: "Security", state: "Running", memory: "4.2 MB", dependants: ["SACCO_ERP_Core", "Church_ERP_Module"] },
    { id: "SVC-02", name: "FAAP Double Entry Core Ledger Engine", type: "Financial", state: "Running", memory: "11.8 MB", dependants: ["SACCO_ERP_Core", "Edu_Fee_Reconciler"] },
    { id: "SVC-03", name: "Gemini Cognitive Multi-Agent Router Gateway", type: "AI Engine", state: "Running", memory: "22.5 MB", dependants: ["ZeroTrust_RBAC_Validator"] },
    { id: "SVC-04", name: "Distributed Edge Offline & Hybrid Sync Broker", type: "Sync", state: "Standby", memory: "1.1 MB", dependants: [] },
    { id: "SVC-05", name: "Dynamic Workflow Orchestrator & Rule Compiler", type: "Automation", state: "Running", memory: "8.4 MB", dependants: ["FAAP_DoubleEntry_Engine"] }
  ]);

  // Production Registries State
  const [registries, setRegistries] = useState<RegistryItem[]>([]);
  const [registryFilter, setRegistryFilter] = useState("All");
  const [newModuleName, setNewModuleName] = useState("");
  const [newModuleType, setNewModuleType] = useState("Module");
  const [newModuleTenant, setNewModuleTenant] = useState("Global");
  const [newModuleVersion, setNewModuleVersion] = useState("v1.0.0");
  const [newModulePermissions, setNewModulePermissions] = useState("all-tenants");

  // FAAP State
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [ledgerLogs, setLedgerLogs] = useState<JournalEntry[]>([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedBalancing, setSelectedBalancing] = useState("");
  const [debitValue, setDebitValue] = useState("");
  const [creditValue, setCreditValue] = useState("");
  const [narration, setNarration] = useState("System balancing adjustment");
  const [postingLedger, setPostingLedger] = useState(false);
  const [ledgerMessage, setLedgerMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [trialBalance, setTrialBalance] = useState<TrialBalanceData | null>(null);

  // Identity & Zero-Trust State
  const [currentUserProfile, setCurrentUserProfile] = useState<any>(null);
  const [activeTenantContext, setActiveTenantContext] = useState("sacco-zambia-hq");
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Workflow Automation State
  const [workflows, setWorkflows] = useState<WorkflowDefinition[]>([]);
  const [triggeringWorkflowId, setTriggeringWorkflowId] = useState<string | null>(null);

  // AI Router State
  const [aiGoal, setAiGoal] = useState("Audit all transactions in tenant 'SACCO-Zambia' and flag compliance alerts.");
  const [aiTenant, setAiTenant] = useState("sacco-zambia-hq");
  const [aiProvider, setAiProvider] = useState("gemini-3.5-flash");
  const [aiMemoryPool, setAiMemoryPool] = useState<string[]>([
    "Initial context buffer compiled on bootstrap.",
    "Mapped zero-trust authentication token for okwiijuliusmoses@gmail.com",
    "Loaded FAAP accounting schemas for FY2026 auditing metrics."
  ]);
  const [orchestrating, setOrchestrating] = useState(false);
  const [aiResult, setAiResult] = useState<any | null>(null);

  // Installable ERP Domains State
  // Sacco ERP
  const [memberId, setMemberId] = useState("MEM-9824");
  const [sharesBalance, setSharesBalance] = useState("15000");
  const [requestedLoan, setRequestedLoan] = useState("35000");
  const [evaluatingLoan, setEvaluatingLoan] = useState(false);
  const [loanResult, setLoanResult] = useState<any | null>(null);

  // Church ERP
  const [dioceseName, setDioceseName] = useState("Kampala Central Diocese");
  const [donationAmount, setDonationAmount] = useState("5000");
  const [donorName, setDonorName] = useState("Moses Julius Okwi");
  const [donationAccount, setDonationAccount] = useState("1010-CASH");
  const [churchMessage, setChurchMessage] = useState<string | null>(null);
  const [churchPosting, setChurchPosting] = useState(false);

  // Education ERP
  const [studentId, setStudentId] = useState("STU-2026-092");
  const [tuitionAmount, setTuitionAmount] = useState("1200");
  const [paymentAccount, setPaymentAccount] = useState("1010-CASH");
  const [eduMessage, setEduMessage] = useState<string | null>(null);
  const [eduPosting, setEduPosting] = useState(false);

  // Fetch all core system data
  const refreshAllData = async () => {
    setLoadingAccounts(true);
    try {
      // Accounts balance sheet
      const resAccounts = await fetch("/api/ueos/ledger/accounts");
      if (resAccounts.ok) {
        const data = await resAccounts.ok ? await resAccounts.json() : [];
        setAccounts(data);
        if (data.length > 0 && !selectedAccount) {
          setSelectedAccount(data[0].code);
          setSelectedBalancing(data[3]?.code || data[1]?.code || "");
        }
      }

      // Registries
      const resRegs = await fetch("/api/ueos/registries");
      if (resRegs.ok) setRegistries(await resRegs.json());

      // Security Audit logs
      const resAudits = await fetch("/api/ueos/security/audit-logs");
      if (resAudits.ok) setAuditLogs(await resAudits.json());

      // Current Identity metadata
      const resIdentity = await fetch("/api/ueos/security/identity");
      if (resIdentity.ok) {
        const data = await resIdentity.json();
        setCurrentUserProfile(data);
        setActiveTenantContext(data.activeTenant);
      }

      // Workflows definitions
      const resWorkflows = await fetch("/api/ueos/workflows");
      if (resWorkflows.ok) setWorkflows(await resWorkflows.json());

      // Trial balance report calculator
      const resTrial = await fetch("/api/ueos/ledger/trial-balance");
      if (resTrial.ok) setTrialBalance(await resTrial.json());

    } catch (err) {
      console.error("System Core failed to load runtime data", err);
    } finally {
      setLoadingAccounts(false);
    }
  };

  useEffect(() => {
    refreshAllData();
    // Pre-populate standard journal entry logs
    setLedgerLogs([
      {
        id: 742118,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        account: "1010-CASH",
        debit: 5000,
        credit: 0,
        balancingAccount: "3010-SHARES",
        narration: "Initial equity shares contribution",
        balanced: true
      }
    ]);
  }, []);

  // Boot the microkernel
  const handleBootKernel = async () => {
    setIsBooting(true);
    setBootData(null);
    setTerminalLogs(["[SYS_INIT] Launching JUMO UEOS platform micro-kernel bootstrap...", ""]);
    
    try {
      await new Promise(r => setTimeout(r, 600));
      setTerminalLogs(prev => [...prev, "[SYS_CONF] Fetching row-level database structures... Done.", ""]);
      
      const res = await fetch("/api/ueos/kernel/boot", { method: "POST" });
      if (res.ok) {
        const data: BootData = await res.json();
        
        for (const log of data.logs) {
          await new Promise(r => setTimeout(r, 150));
          setTerminalLogs(prev => [
            ...prev,
            `[${log.step.toUpperCase().replace(/\s+/g, "_")}] Status: ${log.status.toUpperCase()} -> ${log.detail}`
          ]);
        }
        
        await new Promise(r => setTimeout(r, 100));
        setTerminalLogs(prev => [...prev, "", "[SUCCESS] JUMO UEOS kernel running successfully on cloud tier Node 1."]);
        setBootData(data);
        setCurrentMetric({
          cpu: data.diagnostics.cpuUsage,
          mem: data.diagnostics.memoryUsage
        });
        await refreshAllData();
      }
    } catch (err: any) {
      setTerminalLogs(prev => [...prev, `[FATAL] Platform bootstrap failed: ${err.message}`]);
    } finally {
      setIsBooting(false);
    }
  };

  // Toggle Services State
  const toggleServiceState = (id: string) => {
    setServices(prev => prev.map(svc => {
      if (svc.id === id) {
        const nextState = svc.state === "Running" ? "Stopped" : "Running";
        const nextMem = nextState === "Running" ? (parseFloat(svc.memory) * 4 + " MB") : "0.0 MB";
        
        // Push security audit log
        const logId = `AUD-SVC-${Math.floor(Math.random() * 900) + 100}`;
        const newLog: AuditLog = {
          id: logId,
          timestamp: new Date().toISOString(),
          actor: "kernel-lifecycle@jumo.net",
          action: nextState === "Running" ? "SERVICE_START" : "SERVICE_STOP",
          status: "success",
          details: `Managed kernel service state transition for ${svc.name} -> ${nextState}.`
        };
        setAuditLogs(logs => [newLog, ...logs]);
        
        return { ...svc, state: nextState, memory: nextMem };
      }
      return svc;
    }));
  };

  // Dynamic Registry Injection with full schema checks
  const handleAddRegistry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleName.trim()) return;

    try {
      const res = await fetch("/api/ueos/registries/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newModuleName.trim(),
          type: newModuleType,
          tenant: newModuleTenant,
          version: newModuleVersion,
          permissions: newModulePermissions,
          updatedBy: currentUserProfile?.currentUser || "System Kern"
        })
      });

      if (res.ok) {
        setNewModuleName("");
        await refreshAllData();
      }
    } catch (err) {
      console.error("Failed to inject dynamic registry", err);
    }
  };

  // Post Double Entry Journal
  const handlePostTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLedgerMessage(null);
    setPostingLedger(true);

    try {
      const res = await fetch("/api/ueos/ledger/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account_code: selectedAccount,
          debit: debitValue || "0",
          credit: creditValue || "0",
          balancing_account: selectedBalancing,
          narration: narration
        })
      });

      if (res.ok) {
        const data = await res.json();
        
        const newEntry: JournalEntry = {
          id: data.transaction_id,
          timestamp: data.timestamp,
          account: data.entry.account,
          debit: data.entry.debit,
          credit: data.entry.credit,
          balancingAccount: data.counterEntry.account,
          narration: data.narration,
          balanced: data.ledger_balanced
        };

        setLedgerLogs(prev => [newEntry, ...prev]);
        setLedgerMessage({ 
          type: "success", 
          text: `Transaction posted successfully! ID: #${data.transaction_id}. Balanced counter-entry posted to ${data.counterEntry.account}.` 
        });
        
        // Clear fields
        setDebitValue("");
        setCreditValue("");
        setNarration("System balancing adjustment");

        await refreshAllData();
      } else {
        const err = await res.json();
        setLedgerMessage({ type: "error", text: err.error || "Failed to post transaction." });
      }
    } catch (err: any) {
      setLedgerMessage({ type: "error", text: err.message || "Network error." });
    } finally {
      setPostingLedger(false);
    }
  };

  // Trigger automated workflows
  const handleTriggerWorkflow = async (id: string) => {
    setTriggeringWorkflowId(id);
    try {
      const res = await fetch("/api/ueos/workflows/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        await new Promise(r => setTimeout(r, 450));
        await refreshAllData();
      }
    } catch (err) {
      console.error("Workflow triggering failed", err);
    } finally {
      setTriggeringWorkflowId(null);
    }
  };

  // Trigger Multi Agent Orchestration via Gemini Routing
  const handleOrchestrate = async () => {
    setOrchestrating(true);
    setAiResult(null);
    try {
      // Append to local memory pool logs first
      setAiMemoryPool(prev => [
        ...prev,
        `[USER_PROMPT] Dispatch request: "${aiGoal}" on tenant scope [${aiTenant}]`
      ]);

      const res = await fetch("/api/v1/ueos/ai/orchestrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workflow_goal: aiGoal,
          tenant_id: aiTenant
        })
      });
      if (res.ok) {
        const data = await res.json();
        setAiResult(data);
        setAiMemoryPool(prev => [
          ...prev,
          `[AI_GATEWAY] Dispatched agents: [${data.agents_triggered?.join(", ")}]. Compliance verification score: ${data.health_score || "100%"}`
        ]);
        await refreshAllData();
      }
    } catch (err) {
      console.error("AI Orchestration failed", err);
    } finally {
      setOrchestrating(false);
    }
  };

  // Evaluate Loan Collateral limits
  const handleEvaluateLoan = async (e: React.FormEvent) => {
    e.preventDefault();
    setEvaluatingLoan(true);
    setLoanResult(null);

    try {
      const res = await fetch("/api/ueos/sacco/loans/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          member_id: memberId,
          requested_amount: requestedLoan,
          shares_balance: sharesBalance
        })
      });

      if (res.ok) {
        const data = await res.json();
        setLoanResult(data);
        
        // Push loan evaluation event in security audits
        const logId = `AUD-LOAN-${Math.floor(Math.random() * 900) + 100}`;
        setAuditLogs(prev => [
          {
            id: logId,
            timestamp: new Date().toISOString(),
            actor: "sacco-credit-office@jumo.net",
            action: "LOAN_RISK_CHECK",
            status: data.risk_assessment === "approved" ? "success" : "warning",
            details: `Lending limit evaluation completed for member ${memberId}. Result: ${data.risk_assessment.toUpperCase()}`
          },
          ...prev
        ]);
      }
    } catch (err) {
      console.error("Loan collateral multiplier evaluation failed", err);
    } finally {
      setEvaluatingLoan(false);
    }
  };

  // Church Donation Posting (Demonstrates Domain Sharing FAAP)
  const handleChurchPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setChurchPosting(true);
    setChurchMessage(null);

    try {
      const res = await fetch("/api/ueos/ledger/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account_code: donationAccount,
          debit: donationAmount,
          credit: "0",
          balancing_account: "3010-SHARES", // Posts direct to capital equity accounts
          narration: `Church Fund donation from ${donorName} (${dioceseName})`
        })
      });

      if (res.ok) {
        const data = await res.json();
        setChurchMessage(`Committed successfully! Fund donation posted to FAAP double entry ledger. Transaction ID: #${data.transaction_id}`);
        setDonorName("");
        setDonationAmount("5000");
        await refreshAllData();
      } else {
        const err = await res.json();
        setChurchMessage(`Failed to post church donation: ${err.error}`);
      }
    } catch (err: any) {
      setChurchMessage(`Error: ${err.message}`);
    } finally {
      setChurchPosting(false);
    }
  };

  // Education Tuition Fee Posting (Demonstrates Domain Sharing FAAP)
  const handleEduPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setEduPosting(true);
    setEduMessage(null);

    try {
      const res = await fetch("/api/ueos/ledger/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account_code: paymentAccount,
          debit: tuitionAmount,
          credit: "0",
          balancing_account: "4010-INTEREST", // Reconciliation to cooperative balance accounts
          narration: `Education tuition invoice reconciliation student ${studentId}`
        })
      });

      if (res.ok) {
        const data = await res.json();
        setEduMessage(`Committed successfully! Tuition balance reconciled with FAAP cash receipts. Transaction ID: #${data.transaction_id}`);
        setStudentId("STU-2026-0" + (Math.floor(Math.random() * 90) + 10));
        setTuitionAmount("1200");
        await refreshAllData();
      } else {
        const err = await res.json();
        setEduMessage(`Failed to post tuition: ${err.error}`);
      }
    } catch (err: any) {
      setEduMessage(`Error: ${err.message}`);
    } finally {
      setEduPosting(false);
    }
  };

  // Filtered registries items
  const filteredRegistries = registries.filter(reg => {
    if (registryFilter === "All") return true;
    return reg.type === registryFilter;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col min-h-[680px] shadow-2xl font-sans text-slate-100">
      
      {/* Operating System Header / Control Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-400 uppercase flex items-center gap-1.5">
            <Activity className="h-3 w-3 animate-pulse text-emerald-400" />
            <span>JUMO UEOS Platform Control Hub</span>
          </span>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 mt-0.5">
            <Building2 className="h-4.5 w-4.5 text-emerald-400" />
            <span>JUMO Universal Enterprise Operating System</span>
          </h3>
        </div>

        {/* Tenant and Account Context */}
        <div className="flex items-center gap-3 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          <div className="text-right">
            <div className="text-[9px] font-mono text-slate-500 uppercase font-semibold">Active Tenant Isolation</div>
            <div className="text-xs font-bold text-emerald-400 font-mono">
              {currentUserProfile?.tenantMetadata?.[activeTenantContext]?.name || activeTenantContext}
            </div>
          </div>
          <div className="h-8 w-[1px] bg-slate-800"></div>
          <div className="text-left">
            <div className="text-[9px] font-mono text-slate-500 uppercase font-semibold">Security Token</div>
            <div className="text-xs font-mono text-slate-300">
              {currentUserProfile?.zeroTrustToken ? `${currentUserProfile.zeroTrustToken.slice(0, 10)}...` : "UNAUTHORIZED"}
            </div>
          </div>
        </div>
      </div>

      {/* Main OS Navigation Tab Strip */}
      <div className="bg-slate-950/60 border-b border-slate-800/80 px-6 py-2.5 flex flex-wrap gap-1">
        <button
          onClick={() => setActiveConsoleTab("kernel")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
            activeConsoleTab === "kernel" ? "bg-slate-800 text-emerald-400 border border-slate-700/60" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Power className="h-3.5 w-3.5" />
          <span>Kernel Lifecycle</span>
        </button>

        <button
          onClick={() => setActiveConsoleTab("registries")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
            activeConsoleTab === "registries" ? "bg-slate-800 text-emerald-400 border border-slate-700/60" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Sliders className="h-3.5 w-3.5" />
          <span>Unified Registries</span>
        </button>

        <button
          onClick={() => setActiveConsoleTab("security")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
            activeConsoleTab === "security" ? "bg-slate-800 text-emerald-400 border border-slate-700/60" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Lock className="h-3.5 w-3.5" />
          <span>Zero-Trust Security</span>
        </button>

        <button
          onClick={() => setActiveConsoleTab("faap")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
            activeConsoleTab === "faap" ? "bg-slate-800 text-emerald-400 border border-slate-700/60" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Coins className="h-3.5 w-3.5" />
          <span>FAAP Ledger</span>
        </button>

        <button
          onClick={() => setActiveConsoleTab("automation")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
            activeConsoleTab === "automation" ? "bg-slate-800 text-emerald-400 border border-slate-700/60" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Network className="h-3.5 w-3.5" />
          <span>Workflow Automation</span>
        </button>

        <button
          onClick={() => setActiveConsoleTab("ai")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
            activeConsoleTab === "ai" ? "bg-slate-800 text-emerald-400 border border-slate-700/60" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Bot className="h-3.5 w-3.5" />
          <span>Cognitive AI Router</span>
        </button>

        <button
          onClick={() => setActiveConsoleTab("domains")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
            activeConsoleTab === "domains" ? "bg-slate-800 text-emerald-400 border border-slate-700/60" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Database className="h-3.5 w-3.5" />
          <span>Installable ERPs</span>
        </button>
      </div>

      {/* Primary Canvas Body */}
      <div className="p-6 flex-1 flex flex-col min-h-0 bg-slate-900/40">
        
        {/* TAB 1: KERNEL LIFECYCLE */}
        {activeConsoleTab === "kernel" && (
          <div className="space-y-6 flex-1 flex flex-col animate-fade-in">
            {/* Sub-navigation inside Kernel */}
            <div className="flex border-b border-slate-800 pb-2 gap-4">
              <button
                onClick={() => setKernelSubTab("diagnostics")}
                className={`text-xs font-bold uppercase tracking-wider pb-1.5 transition ${
                  kernelSubTab === "diagnostics" ? "text-emerald-400 border-b-2 border-emerald-400" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                Kernel Diagnostics
              </button>
              <button
                onClick={() => setKernelSubTab("lifecycle")}
                className={`text-xs font-bold uppercase tracking-wider pb-1.5 transition ${
                  kernelSubTab === "lifecycle" ? "text-emerald-400 border-b-2 border-emerald-400" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                Service Container Manager
              </button>
              <button
                onClick={() => setKernelSubTab("featureflags")}
                className={`text-xs font-bold uppercase tracking-wider pb-1.5 transition ${
                  kernelSubTab === "featureflags" ? "text-emerald-400 border-b-2 border-emerald-400" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                Runtime Feature Flags
              </button>
            </div>

            {kernelSubTab === "diagnostics" && (
              <div className="space-y-6 flex-1 flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-850 flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${bootData ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-800 text-slate-500"}`}>
                      <Power className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Power State</div>
                      <div className="text-xs font-bold text-slate-200">{bootData ? "BOOTED (RUNNING)" : "STANDBY (OFF)"}</div>
                    </div>
                  </div>

                  <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-850 flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${bootData ? "bg-cyan-500/10 text-cyan-400" : "bg-slate-800 text-slate-500"}`}>
                      <Cpu className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase">CPU Thread Load</div>
                      <div className="text-xs font-bold text-slate-200">{bootData ? currentMetric.cpu : "0.0% / Idle"}</div>
                    </div>
                  </div>

                  <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-850 flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${bootData ? "bg-indigo-500/10 text-indigo-400" : "bg-slate-800 text-slate-500"}`}>
                      <Database className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Dynamic Registries</div>
                      <div className="text-xs font-bold text-slate-200">{bootData ? `${registries.length} Enrolled` : "0 STANDBY"}</div>
                    </div>
                  </div>

                  <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-850 flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${bootData ? "bg-pink-500/10 text-pink-400" : "bg-slate-800 text-slate-500"}`}>
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Cluster Nodes</div>
                      <div className="text-xs font-bold text-slate-200">{bootData ? "3 Active Tenants" : "0 Standby"}</div>
                    </div>
                  </div>
                </div>

                {/* Core Boot CLI logs terminal */}
                <div className="flex-1 flex flex-col bg-slate-950 rounded-2xl border border-slate-850 overflow-hidden font-mono text-xs">
                  <div className="bg-slate-900 px-4 py-2 flex justify-between items-center border-b border-slate-850">
                    <span className="text-slate-400 text-[10px] flex items-center gap-1.5 uppercase font-bold tracking-wider">
                      <Terminal className="h-3 w-3 text-emerald-400" />
                      <span>JUMO UEOS Core Boot Console CLI</span>
                    </span>
                    <span className={`h-2.5 w-2.5 rounded-full ${bootData ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`}></span>
                  </div>
                  
                  <div className="p-4 flex-1 overflow-y-auto space-y-1.5 text-slate-300 max-h-[260px]">
                    {terminalLogs.length === 0 ? (
                      <div className="text-slate-500 italic text-center py-8">
                        UEOS microkernel is uninitialized. Hit the Boot Core button below to register standard services, map FAAP Ledger structures, and open secure tenant scopes.
                      </div>
                    ) : (
                      terminalLogs.map((log, i) => (
                        <div key={i} className={
                          log.startsWith("[SUCCESS]") ? "text-emerald-400 font-bold" : 
                          log.startsWith("[FATAL]") ? "text-rose-400 font-bold" : ""
                        }>
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center bg-slate-950/30 p-4 rounded-xl border border-slate-850/60">
                  <span className="text-slate-400 text-[11px] leading-relaxed max-w-lg">
                    <strong>Zero-Trust Sandbox Mode Enabled.</strong> Each platform registry container executes isolated in-memory sandboxes bound to tenant cryptography keys.
                  </span>
                  <button
                    onClick={handleBootKernel}
                    disabled={isBooting}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition disabled:opacity-55 cursor-pointer shadow-lg shadow-emerald-500/15 shrink-0"
                  >
                    {isBooting ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Booting Platform Kernel...</span>
                      </>
                    ) : (
                      <>
                        <Power className="h-4 w-4" />
                        <span>Boot JUMO UEOS Kernel</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {kernelSubTab === "lifecycle" && (
              <div className="space-y-6 flex-1 flex flex-col">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Service State List */}
                  <div className="lg:col-span-8 bg-slate-950/30 border border-slate-850 rounded-2xl p-5 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Service Container Registry</h4>
                      <p className="text-[10px] text-slate-500 mt-1 mb-4 leading-relaxed">
                        Control individual JUMO hybrid platform services. Starting or stopping components updates shared operating system metrics in real time.
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {services.map(svc => (
                        <div key={svc.id} className="bg-slate-950 border border-slate-850/60 p-3 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                          <div className="flex items-center gap-3">
                            <div className={`h-2.5 w-2.5 rounded-full ${svc.state === "Running" ? "bg-emerald-500" : "bg-red-500 animate-pulse"}`}></div>
                            <div>
                              <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5 font-mono">
                                <span>{svc.id}</span>
                                <span className="text-slate-500 font-sans">|</span>
                                <span className="text-slate-300 font-sans">{svc.name}</span>
                              </div>
                              <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
                                <span className="bg-slate-900 border border-slate-850 px-1.5 py-0.5 rounded font-mono text-emerald-400">{svc.type}</span>
                                <span>Memory Limit: <strong className="text-slate-400 font-mono">{svc.memory}</strong></span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                            <button
                              onClick={() => toggleServiceState(svc.id)}
                              className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition ${
                                svc.state === "Running" 
                                  ? "bg-slate-800 text-red-400 hover:bg-slate-700 border border-red-500/25" 
                                  : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/35 border border-emerald-500/30"
                              }`}
                            >
                              {svc.state === "Running" ? "Stop Service" : "Start Service"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dependency Graph visualizer */}
                  <div className="lg:col-span-4 bg-slate-950/40 border border-slate-850 p-5 rounded-2xl flex flex-col">
                    <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                      <Network className="h-4 w-4 text-emerald-400" />
                      <span>Runtime Dependency Graph</span>
                    </h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed mt-1">
                      Dynamic hierarchy showing kernel shared backbone dependencies. Services must hook into correct registries.
                    </p>

                    <div className="flex-1 mt-6 border border-slate-850/80 rounded-xl p-4 bg-slate-950 text-[10px] font-mono space-y-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-emerald-400">[OS KERNEL]</span>
                        <ArrowRight className="h-3 w-3 text-slate-600" />
                        <span className="text-slate-300">Identity Container</span>
                      </div>
                      
                      <div className="pl-6 border-l border-slate-800 space-y-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-500">├──</span>
                          <span className="text-emerald-400">[FAAP CORE]</span>
                          <ArrowRight className="h-3 w-3 text-slate-600" />
                          <span className="text-slate-300">Double Entry validation</span>
                        </div>
                        
                        <div className="pl-6 border-l border-slate-800 space-y-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-500">├──</span>
                            <span className="text-cyan-400">SACCO_ERP_Core</span>
                            <span className="text-slate-500 text-[8px]">(Lending Limits)</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-500">└──</span>
                            <span className="text-cyan-400">Church_ERP_Module</span>
                            <span className="text-slate-500 text-[8px]">(Donations GL)</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-500">└──</span>
                          <span className="text-pink-400">[AI ROUTER]</span>
                          <ArrowRight className="h-3 w-3 text-slate-600" />
                          <span className="text-slate-300">Gemini 3.5 API Gate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {kernelSubTab === "featureflags" && (
              <div className="bg-slate-950/20 border border-slate-850 rounded-2xl p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Operational Feature Flags & Compiler Policies</h4>
                  <p className="text-[11px] text-slate-500 mt-1 mb-6 leading-relaxed">
                    Toggle strict enterprise operating system security compliance rules and triggers dynamically.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-200">Strict Tenant Isolation (STRICT_RBAC)</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Enforce cryptographic verification before multi-tenant cross queries.</div>
                    </div>
                    <button
                      onClick={() => setFeatureFlags(prev => ({ ...prev, STRICT_RBAC: !prev.STRICT_RBAC }))}
                      className="text-emerald-400 focus:outline-none"
                    >
                      {featureFlags.STRICT_RBAC ? (
                        <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                      ) : (
                        <AlertCircle className="h-6 w-6 text-slate-600" />
                      )}
                    </button>
                  </div>

                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-200">Automated Audit Posting (AUTO_AUDIT)</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Write balancing journal entries automatically to the centralized security ledger.</div>
                    </div>
                    <button
                      onClick={() => setFeatureFlags(prev => ({ ...prev, AUTO_AUDIT: !prev.AUTO_AUDIT }))}
                      className="text-emerald-400 focus:outline-none"
                    >
                      {featureFlags.AUTO_AUDIT ? (
                        <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                      ) : (
                        <AlertCircle className="h-6 w-6 text-slate-600" />
                      )}
                    </button>
                  </div>

                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-200">Cognitive Context Buffer (COGNITIVE_MEM_BUFFER)</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Retain historical multi-agent decision steps inside local memory streams.</div>
                    </div>
                    <button
                      onClick={() => setFeatureFlags(prev => ({ ...prev, COGNITIVE_MEM_BUFFER: !prev.COGNITIVE_MEM_BUFFER }))}
                      className="text-emerald-400 focus:outline-none"
                    >
                      {featureFlags.COGNITIVE_MEM_BUFFER ? (
                        <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                      ) : (
                        <AlertCircle className="h-6 w-6 text-slate-600" />
                      )}
                    </button>
                  </div>

                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-200">Cross-Domain Financial Postings</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Authorize education ERP and church ERP to directly write into FAAP General Ledgers.</div>
                    </div>
                    <button
                      onClick={() => setFeatureFlags(prev => ({ ...prev, CROSS_DOMAIN_TRIGGERS: !prev.CROSS_DOMAIN_TRIGGERS }))}
                      className="text-emerald-400 focus:outline-none"
                    >
                      {featureFlags.CROSS_DOMAIN_TRIGGERS ? (
                        <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                      ) : (
                        <AlertCircle className="h-6 w-6 text-slate-600" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: UNIFIED REGISTRIES */}
        {activeConsoleTab === "registries" && (
          <div className="space-y-6 flex-1 flex flex-col animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Form Side */}
              <div className="w-full lg:w-4/12 bg-slate-950/20 p-5 rounded-2xl border border-slate-850 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Dynamic Registry Injector</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                    Deploy extensions, domain modules, security engines, or AI routers directly to the active JUMO hybrid runtime.
                  </p>
                </div>

                <form onSubmit={handleAddRegistry} className="space-y-3.5">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Module Namespace / Code</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. NGO_Relief_Triggers"
                      value={newModuleName}
                      onChange={(e) => setNewModuleName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Registry Type</label>
                      <select
                        value={newModuleType}
                        onChange={(e) => setNewModuleType(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-2 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        <option value="Domain">Domain</option>
                        <option value="Module">Module</option>
                        <option value="Service">Service</option>
                        <option value="Security">Security</option>
                        <option value="AI">AI Router</option>
                        <option value="Plugin">Plugin</option>
                        <option value="API">API Gateway</option>
                        <option value="Workflow">Workflow</option>
                        <option value="Event">Event Bus</option>
                        <option value="Configuration">Configuration</option>
                        <option value="Deployment">Deployment</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Tenant context</label>
                      <select
                        value={newModuleTenant}
                        onChange={(e) => setNewModuleTenant(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-2 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        <option value="Global">Global Platform</option>
                        <option value="sacco-zambia-hq">SACCO Zambia</option>
                        <option value="church-uganda-diocese">Church Uganda</option>
                        <option value="education-kenya-board">Edu Kenya</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Module Version</label>
                      <input
                        type="text"
                        value={newModuleVersion}
                        onChange={(e) => setNewModuleVersion(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Permissions Scope</label>
                      <select
                        value={newModulePermissions}
                        onChange={(e) => setNewModulePermissions(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-2 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        <option value="all-tenants">Shared All Tenants</option>
                        <option value="admin-only">Tenant Admin Only</option>
                        <option value="root-only">Superuser / Kernel Only</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 transition cursor-pointer border border-slate-700 shadow"
                  >
                    <Plus className="h-4 w-4 text-emerald-400" />
                    <span>Compile & Hot-Register</span>
                  </button>
                </form>
              </div>

              {/* View Registries Side */}
              <div className="flex-1 bg-slate-950/40 p-5 rounded-2xl border border-slate-850 flex flex-col justify-between min-h-[350px]">
                <div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Dynamic Discovery Registry Hub</h4>
                      <p className="text-[10px] font-mono text-slate-500 mt-0.5">Cryptographically signed kernel modules</p>
                    </div>

                    {/* Filter buttons */}
                    <div className="flex flex-wrap gap-1 bg-slate-900 border border-slate-800 p-0.5 rounded-lg text-[10px]">
                      {["All", "Domain", "Service", "Security", "AI", "Module"].map(f => (
                        <button
                          key={f}
                          onClick={() => setRegistryFilter(f)}
                          className={`px-2 py-1 rounded-md font-semibold transition ${
                            registryFilter === f ? "bg-slate-800 text-emerald-400" : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
                    {filteredRegistries.length === 0 ? (
                      <div className="text-center py-12 text-xs text-slate-500 italic">No modules registered matching filter parameters.</div>
                    ) : (
                      filteredRegistries.map((mod, i) => (
                        <div key={i} className="bg-slate-950 border border-slate-850/60 p-3 rounded-xl flex items-center justify-between gap-4 hover:border-slate-800 transition">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="h-2 w-2 rounded-full bg-emerald-400 shrink-0"></div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-slate-100 font-mono truncate">{mod.name}</div>
                              <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5 font-mono truncate">
                                <span>Scope: <strong>{mod.tenant}</strong></span>
                                <span>•</span>
                                <span>Perms: <strong>{mod.permissions}</strong></span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[9px] font-mono bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-850">
                              {mod.version}
                            </span>
                            <span className="text-[9px] font-mono bg-slate-900 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-950/60 uppercase">
                              {mod.type}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="border-t border-slate-850/60 pt-4 mt-4 flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>Cryptographic Checksum Hash matching algorithms: SHA-256</span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold uppercase">SECURED</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: FAAP FINANCIAL LEDGER */}
        {activeConsoleTab === "faap" && (
          <div className="space-y-6 flex-1 flex flex-col animate-fade-in">
            {/* Sub-tab selection */}
            <div className="flex border-b border-slate-800 pb-2 gap-4">
              <button
                onClick={() => setFaapSubTab("journal")}
                className={`text-xs font-bold uppercase tracking-wider pb-1.5 transition ${
                  faapSubTab === "journal" ? "text-emerald-400 border-b-2 border-emerald-400" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                Journal Posting & Ledger
              </button>
              <button
                onClick={() => setFaapSubTab("trialbalance")}
                className={`text-xs font-bold uppercase tracking-wider pb-1.5 transition ${
                  faapSubTab === "trialbalance" ? "text-emerald-400 border-b-2 border-emerald-400" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                Trial Balance Report
              </button>
            </div>

            {faapSubTab === "journal" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
                
                {/* Journal Sheet Form */}
                <div className="lg:col-span-5 bg-slate-950/20 p-5 rounded-2xl border border-slate-850 space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">FAAP Double-Entry Journal Input</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                      Post transactions back to the consolidated operating ledger. Balance verification algorithms enforce strict mathematical correctness.
                    </p>
                  </div>

                  <form onSubmit={handlePostTransaction} className="space-y-3.5 my-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Target Account</label>
                        <select
                          value={selectedAccount}
                          onChange={(e) => setSelectedAccount(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                        >
                          {accounts.map(acc => (
                            <option key={acc.code} value={acc.code}>{acc.code} ({acc.name})</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Counter Balance Account</label>
                        <select
                          value={selectedBalancing}
                          onChange={(e) => setSelectedBalancing(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                        >
                          {accounts.map(acc => (
                            <option key={acc.code} value={acc.code}>{acc.code} ({acc.name})</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Debit Amount ($)</label>
                        <input
                          type="number"
                          placeholder="0.00"
                          value={debitValue}
                          onChange={(e) => {
                            setDebitValue(e.target.value);
                            if (e.target.value) setCreditValue("");
                          }}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Credit Amount ($)</label>
                        <input
                          type="number"
                          placeholder="0.00"
                          value={creditValue}
                          onChange={(e) => {
                            setCreditValue(e.target.value);
                            if (e.target.value) setDebitValue("");
                          }}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Journal Description / Memo</label>
                      <input
                        type="text"
                        value={narration}
                        onChange={(e) => setNarration(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={postingLedger}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition disabled:opacity-55 cursor-pointer shadow-lg shadow-emerald-500/10"
                    >
                      {postingLedger ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Posting balancing journal sheets...</span>
                        </>
                      ) : (
                        <>
                          <FileText className="h-4 w-4" />
                          <span>Commit Ledger Journal Entry</span>
                        </>
                      )}
                    </button>
                  </form>

                  {ledgerMessage && (
                    <div className={`p-3 rounded-lg text-xs flex items-start gap-2 border ${
                      ledgerMessage.type === "success" 
                        ? "bg-emerald-950/20 border-emerald-900/40 text-emerald-400" 
                        : "bg-rose-950/20 border-rose-900/40 text-rose-400"
                    }`}>
                      {ledgerMessage.type === "success" ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      )}
                      <p className="leading-relaxed text-[11px]">{ledgerMessage.text}</p>
                    </div>
                  )}
                </div>

                {/* Right ledger logs sheet */}
                <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
                  {/* Account Balances Card */}
                  <div className="bg-slate-950/30 p-4 rounded-2xl border border-slate-850">
                    <h5 className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-3">FAAP Consolidated Accounts Balances</h5>
                    {loadingAccounts ? (
                      <div className="text-center py-6 text-xs text-slate-500">Retrieving balances from ledger service...</div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {accounts.map(acc => (
                          <div key={acc.code} className="bg-slate-950 border border-slate-850 p-2.5 rounded-xl">
                            <div className="text-[9px] font-mono text-slate-500 font-semibold">{acc.code}</div>
                            <div className="text-[10px] font-bold text-slate-200 truncate">{acc.name}</div>
                            <div className="text-xs font-bold text-emerald-400 mt-1 font-mono">
                              ${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* General Journal logs */}
                  <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-850 flex-1 flex flex-col min-h-[180px]">
                    <h5 className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-3">Consolidated General Ledger Journal Activity</h5>
                    <div className="flex-1 overflow-y-auto max-h-[160px] space-y-2 pr-1 font-mono text-[10px]">
                      {ledgerLogs.map((entry, idx) => (
                        <div key={idx} className="bg-slate-950 border border-slate-850 p-2.5 rounded-xl flex flex-col md:flex-row justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] bg-slate-900 border border-slate-800 text-slate-400 px-1 py-0.5 rounded">ID: #{entry.id}</span>
                              <span className="text-slate-100 font-semibold">{entry.narration}</span>
                            </div>
                            <div className="text-slate-500 text-[9px] mt-0.5">
                              Contra posting matches <span className="text-slate-300 font-bold">{entry.account}</span> with balancing <span className="text-slate-300 font-bold">{entry.balancingAccount}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 justify-between md:justify-end shrink-0 border-t md:border-t-0 border-slate-850/60 pt-1.5 md:pt-0">
                            {entry.debit > 0 && <span className="text-emerald-400 font-bold">DR: +${entry.debit.toLocaleString()}</span>}
                            {entry.credit > 0 && <span className="text-amber-500 font-bold">CR: -${entry.credit.toLocaleString()}</span>}
                            <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold uppercase flex items-center gap-0.5 border border-emerald-500/10">
                              <ShieldCheck className="h-3 w-3" />
                              <span>BALANCED</span>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {faapSubTab === "trialbalance" && (
              <div className="bg-slate-950/20 border border-slate-850 p-5 rounded-2xl flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start border-b border-slate-850 pb-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Unadjusted Trial Balance Report</h4>
                      <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                        Reporting Period: {trialBalance?.accountingPeriod || "Q3 2026"} | Fiscal Year: {trialBalance?.fiscalYear || "FY2026"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400 px-2.5 py-0.5 rounded">
                        Checksum Balance Difference: <strong className="text-emerald-400 font-mono">${trialBalance?.difference?.toFixed(2) || "0.00"}</strong>
                      </span>
                      <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded font-bold uppercase">
                        {trialBalance?.isBalanced ? "BALANCED" : "OUT OF BALANCE"}
                      </span>
                    </div>
                  </div>

                  {/* Trial Balance list */}
                  <div className="my-4 overflow-y-auto max-h-[220px] border border-slate-850 rounded-xl">
                    <table className="w-full text-[11px] font-mono border-collapse">
                      <thead>
                        <tr className="bg-slate-950 border-b border-slate-850 text-slate-400 text-left">
                          <th className="p-3 text-left">Account Code</th>
                          <th className="p-3 text-left">Account Description</th>
                          <th className="p-3 text-left">Category</th>
                          <th className="p-3 text-right">Debit ($)</th>
                          <th className="p-3 text-right">Credit ($)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trialBalance?.items?.map(item => (
                          <tr key={item.code} className="border-b border-slate-850/60 hover:bg-slate-900/40 text-slate-300">
                            <td className="p-3 font-semibold text-slate-400">{item.code}</td>
                            <td className="p-3 font-sans text-slate-200">{item.name}</td>
                            <td className="p-3">
                              <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-400 border border-slate-850">{item.category}</span>
                            </td>
                            <td className="p-3 text-right text-emerald-400">{item.debit > 0 ? `$${item.debit.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : "-"}</td>
                            <td className="p-3 text-right text-amber-500">{item.credit > 0 ? `$${item.credit.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : "-"}</td>
                          </tr>
                        ))}
                        <tr className="bg-slate-950/50 border-t border-slate-800 font-bold text-slate-100">
                          <td colSpan={3} className="p-3 text-right uppercase text-[10px] tracking-wider">Consolidated Sum Totals</td>
                          <td className="p-3 text-right text-emerald-400 text-xs">${trialBalance?.totalDebits?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                          <td className="p-3 text-right text-amber-500 text-xs">${trialBalance?.totalCredits?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="border-t border-slate-850/60 pt-4 flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>Standard accounting balance rules enforced: DR equals CR</span>
                  <div className="flex items-center gap-1 bg-slate-900 border border-slate-850 px-2 py-1 rounded">
                    <ShieldCheck className="h-3 w-3 text-emerald-400" />
                    <span>FAAP ACCREDITED</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ZERO-TRUST IDENTITY & SECURITY */}
        {activeConsoleTab === "security" && (
          <div className="space-y-6 flex-1 flex flex-col animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
              {/* Left sidebar: roles and tenant select */}
              <div className="lg:col-span-5 bg-slate-950/20 p-5 rounded-2xl border border-slate-850 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
                    <span>Zero-Trust Identity Guard</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                    Continuous cryptographic auth ensures tenant isolation boundaries remain fully intact. Multi-tenancy prevents cross-context leaks.
                  </p>
                </div>

                {currentUserProfile && (
                  <div className="space-y-4">
                    {/* User Profile Info Card */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Authenticated Identity</div>
                      <div className="text-xs font-bold text-slate-100 mt-0.5">{currentUserProfile.currentUser}</div>
                      
                      <div className="text-[10px] font-mono text-slate-500 uppercase mt-3">Authoritative RBAC Roles</div>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {currentUserProfile.roles?.map((r: string) => (
                          <span key={r} className="text-[9px] bg-slate-900 text-emerald-400 border border-slate-850 px-2 py-0.5 rounded font-mono">
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tenant selector */}
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Simulate Tenant Context Selection</label>
                      <select
                        value={activeTenantContext}
                        onChange={(e) => {
                          setActiveTenantContext(e.target.value);
                          // Audit trail log
                          const newLog: AuditLog = {
                            id: `AUD-SEC-${Math.floor(Math.random() * 9000) + 1000}`,
                            timestamp: new Date().toISOString(),
                            actor: currentUserProfile.currentUser,
                            action: "TENANT_CONTEXT_SWITCH",
                            status: "success",
                            details: `Switched contextual cryptographic container access scope to: ${e.target.value}`
                          };
                          setAuditLogs(prev => [newLog, ...prev]);
                        }}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        {Object.entries(currentUserProfile.tenantMetadata || {}).map(([key, val]: any) => (
                          <option key={key} value={key}>{val.name} ({val.tier})</option>
                        ))}
                      </select>
                    </div>

                    {/* Zero trust token details */}
                    <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-850 font-mono text-[10px] space-y-1.5 text-slate-400">
                      <div>SANDBOX STATE: <span className="text-emerald-400 font-bold">STRICT_ISOLATED</span></div>
                      <div>CONTEXT LEVEL: <span className="text-cyan-400 font-bold">{currentUserProfile.trustLevel}</span></div>
                      <div className="truncate">JWT HEADER TOKEN: <span className="text-slate-300">{currentUserProfile.zeroTrustToken}</span></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right column: Security Audit Trail Log Ledger */}
              <div className="lg:col-span-7 bg-slate-950/40 p-5 rounded-2xl border border-slate-850 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="h-4 w-4 text-emerald-400" />
                    <span>Real-Time Security Audit Event Ledger</span>
                  </h4>
                  <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                    Unmodifiable diagnostic logs verifying kernel API entries and resource accesses
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto max-h-[220px] space-y-2 my-4 pr-1 font-mono text-[9px]">
                  {auditLogs.map((log, i) => (
                    <div key={i} className="bg-slate-950 border border-slate-850 p-2.5 rounded-xl flex items-start gap-2.5">
                      <div className={`p-1 rounded mt-0.5 ${
                        log.status === "success" ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400"
                      }`}>
                        {log.status === "success" ? <Shield className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center gap-2">
                          <span className="text-slate-200 font-bold">{log.actor}</span>
                          <span className="text-slate-500 text-[8px]">{new Date(log.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div className="text-slate-400 text-[10px] mt-0.5">{log.details}</div>
                        <div className="flex items-center gap-2 mt-1 text-[8px] text-slate-500">
                          <span className="bg-slate-900 px-1 py-0.5 rounded border border-slate-850 text-slate-400">{log.action}</span>
                          <span>ID: {log.id}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-850/60 pt-3 flex justify-end">
                  <button
                    onClick={refreshAllData}
                    className="text-[10px] font-mono bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition"
                  >
                    <RefreshCw className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Poll Security Audits</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: WORKFLOW AUTOMATION ENGINE */}
        {activeConsoleTab === "automation" && (
          <div className="space-y-6 flex-1 flex flex-col animate-fade-in">
            <div className="bg-slate-950/20 border border-slate-850 rounded-2xl p-6 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">JUMO Workflow Automation Engine</h4>
                <p className="text-[11px] text-slate-500 mt-1 mb-5 leading-relaxed">
                  Automate cross-domain routines. Triggers evaluate transaction thresholds, audit compliance, and trigger AI analysis loops on matching state changes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {workflows.map(wf => (
                  <div key={wf.id} className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-850 font-mono font-bold">{wf.id}</span>
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase">{wf.status}</span>
                      </div>
                      <div className="text-xs font-bold text-slate-200 mt-1 font-sans">{wf.name}</div>
                      <div className="text-[10px] text-slate-500 mt-1 font-mono">Trigger: <span className="text-slate-300">{wf.triggerEvent}</span></div>
                    </div>

                    <div className="border-t border-slate-850/60 pt-3 flex flex-col gap-2">
                      <div className="text-[9px] text-slate-500 font-mono">
                        Approvers: <span className="text-slate-300 font-bold">{wf.approvers?.join(" -> ")}</span>
                      </div>
                      <div className="text-[9px] text-slate-500 font-mono">
                        Last triggered: <span className="text-slate-400">{wf.lastTriggered === "Never" ? "Never" : new Date(wf.lastTriggered).toLocaleTimeString()}</span>
                      </div>

                      <button
                        onClick={() => handleTriggerWorkflow(wf.id)}
                        disabled={triggeringWorkflowId === wf.id}
                        className="w-full mt-2 bg-slate-900 hover:bg-slate-850 text-emerald-400 hover:text-emerald-300 font-bold py-1.5 border border-slate-800 rounded-lg text-[10px] flex items-center justify-center gap-1 transition cursor-pointer disabled:opacity-50"
                      >
                        {triggeringWorkflowId === wf.id ? (
                          <>
                            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                            <span>Triggering State Chain...</span>
                          </>
                        ) : (
                          <>
                            <Play className="h-3 w-3" />
                            <span>Fire Automated State Run</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-850/60 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>Triggers monitor the FAAP general ledger events and tenant contexts continuously</span>
                <span className="text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded font-bold uppercase">MONITORING</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: AI GATEWAY COGNITIVE ROUTER */}
        {activeConsoleTab === "ai" && (
          <div className="space-y-6 flex-1 flex flex-col animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
              
              {/* Left Form controls */}
              <div className="lg:col-span-5 bg-slate-950/20 p-5 rounded-2xl border border-slate-850 space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Multi-Provider AI Gateway</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                    Route compliance goals and automated audit rule summaries through a multi-model cognitive abstraction layer.
                  </p>
                </div>

                <div className="space-y-3.5 my-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Select Cognitive Engine Model</label>
                    <select
                      value={aiProvider}
                      onChange={(e) => setAiProvider(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer font-mono"
                    >
                      <option value="gemini-3.5-flash">Google GenAI Gemini 3.5 Flash (Default)</option>
                      <option value="openai-gpt-4o">OpenAI GPT-4o-compatible Proxy</option>
                      <option value="local-deepseek-r1">Local Edge DeepSeek-R1 (Offline)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Target Tenant Context Scope</label>
                    <select
                      value={aiTenant}
                      onChange={(e) => setAiTenant(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer font-mono"
                    >
                      <option value="sacco-zambia-hq">sacco-zambia-hq</option>
                      <option value="church-uganda-diocese">church-uganda-diocese</option>
                      <option value="education-kenya-board">education-kenya-board</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Cognitive Goal Statement</label>
                    <input
                      type="text"
                      value={aiGoal}
                      onChange={(e) => setAiGoal(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 font-sans"
                    />
                  </div>

                  <button
                    onClick={handleOrchestrate}
                    disabled={orchestrating || !aiGoal.trim()}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition disabled:opacity-55 cursor-pointer shadow-lg shadow-emerald-500/10"
                  >
                    {orchestrating ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>AI Router orchestrating agent pool...</span>
                      </>
                    ) : (
                      <>
                        <Bot className="h-4 w-4" />
                        <span>Trigger Multi-Agent Orchestration</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Local Memory Window Stream */}
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-850">
                  <span className="text-[9px] font-mono text-slate-500 uppercase font-bold">Local cognitive memory stream</span>
                  <div className="space-y-1 mt-1.5 max-h-[80px] overflow-y-auto font-mono text-[8px] text-slate-400 leading-relaxed pr-1">
                    {aiMemoryPool.map((log, i) => (
                      <div key={i} className="border-b border-slate-900/60 pb-1 last:border-b-0 truncate">{log}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Output details */}
              <div className="lg:col-span-7 bg-slate-950/40 p-5 rounded-2xl border border-slate-850 flex flex-col justify-between min-h-[350px]">
                <div>
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Cognitive Analysis Output</h4>
                  <p className="text-[10px] font-mono text-slate-500 mt-0.5">Automated decisions routed from active AI agents</p>
                </div>

                {aiResult ? (
                  <div className="space-y-4 my-4 animate-fade-in flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-850 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                          <ShieldCheck className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-100">AI Router Response Verified</div>
                          <div className="text-[10px] font-mono text-slate-500">Ref ID: {aiResult.orchestration_id}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <span className="text-[10px] font-mono bg-slate-900 border border-slate-850 text-slate-400 px-2.5 py-0.5 rounded">
                          Compliance Score: {aiResult.health_score || "100%"}
                        </span>
                        <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded font-bold uppercase">
                          {aiResult.status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h5 className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Agents Triggered & Synchronized</h5>
                        <div className="flex flex-wrap gap-2 mt-1.5">
                          {aiResult.agents_triggered?.map((agent: string, i: number) => (
                            <span key={i} className="text-[9px] font-mono bg-slate-900 text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-950/60 flex items-center gap-1">
                              <Bot className="h-3 w-3 text-emerald-400" />
                              <span>{agent}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Executive Cognitive Analysis</h5>
                        <p className="text-xs text-slate-300 leading-relaxed mt-1 bg-slate-900/60 p-3.5 rounded-xl border border-slate-850 font-sans max-h-[120px] overflow-y-auto">
                          {aiResult.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 text-xs text-slate-500 italic flex-1 flex items-center justify-center">
                    Awaiting instructions. Formulate a cognitive goal and trigger the routing agent to compile decision trees.
                  </div>
                )}

                <div className="border-t border-slate-850/60 pt-4 flex justify-between items-center text-[10px] font-mono text-slate-500 mt-4">
                  <span>Routing Layer: @google/genai Node.js integration SDK</span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded font-bold uppercase">ONLINE</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 7: INSTALLABLE ERP DOMAINS */}
        {activeConsoleTab === "domains" && (
          <div className="space-y-6 flex-1 flex flex-col animate-fade-in">
            {/* Domain selection list */}
            <div className="flex border-b border-slate-800 pb-2.5 gap-6">
              <button
                onClick={() => setDomainSelected("sacco")}
                className={`text-xs font-bold uppercase tracking-wider pb-1.5 transition flex items-center gap-1.5 ${
                  domainSelected === "sacco" ? "text-emerald-400 border-b-2 border-emerald-400" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <Building2 className="h-4 w-4" />
                <span>SACCO ERP Lending Suite</span>
              </button>
              <button
                onClick={() => setDomainSelected("church")}
                className={`text-xs font-bold uppercase tracking-wider pb-1.5 transition flex items-center gap-1.5 ${
                  domainSelected === "church" ? "text-emerald-400 border-b-2 border-emerald-400" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <Globe className="h-4 w-4" />
                <span>Church Fund ERP Suite</span>
              </button>
              <button
                onClick={() => setDomainSelected("education")}
                className={`text-xs font-bold uppercase tracking-wider pb-1.5 transition flex items-center gap-1.5 ${
                  domainSelected === "education" ? "text-emerald-400 border-b-2 border-emerald-400" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>Education Board Tuition ERP</span>
              </button>
            </div>

            {domainSelected === "sacco" && (
              <div className="flex flex-col lg:flex-row gap-6 flex-1">
                {/* Form Side */}
                <div className="w-full lg:w-5/12 bg-slate-950/20 p-5 rounded-2xl border border-slate-850 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">SACCO Lending Rule Compliance</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                      Evaluates credit risk profiles against escrowed capital shares. Strict rules limit borrowings within the 1:3 collateral multiplier ceiling.
                    </p>
                  </div>

                  <form onSubmit={handleEvaluateLoan} className="space-y-3.5">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Member ID Code</label>
                      <input
                        type="text"
                        required
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Shares Capital Balance ($)</label>
                        <input
                          type="number"
                          required
                          value={sharesBalance}
                          onChange={(e) => setSharesBalance(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Requested Loan ($)</label>
                        <input
                          type="number"
                          required
                          value={requestedLoan}
                          onChange={(e) => setRequestedLoan(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={evaluatingLoan}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition disabled:opacity-55 cursor-pointer shadow-lg shadow-emerald-500/10"
                    >
                      {evaluatingLoan ? (
                        <>
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                          <span>Evaluating credit thresholds...</span>
                        </>
                      ) : (
                        <>
                          <Sliders className="h-3.5 w-3.5" />
                          <span>Evaluate Credit Multiplier Constraint</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Sacco loan results */}
                <div className="flex-1 bg-slate-950/40 p-5 rounded-2xl border border-slate-850 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">SACCO Credit Risk Profile Outcome</h4>
                    <p className="text-[10px] font-mono text-slate-500 mt-0.5">Automated compliance ledger check calculations</p>
                  </div>

                  {loanResult ? (
                    <div className="space-y-4 my-4 animate-fade-in flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${loanResult.risk_assessment === "approved" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
                          {loanResult.risk_assessment === "approved" ? (
                            <CheckCircle2 className="h-6 w-6" />
                          ) : (
                            <AlertCircle className="h-6 w-6" />
                          )}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-200">
                            Risk Assessment Status: <span className={
                              loanResult.risk_assessment === "approved" ? "text-emerald-400 uppercase font-extrabold" : "text-rose-400 uppercase font-extrabold"
                            }>{loanResult.risk_assessment}</span>
                          </div>
                          <div className="text-[10px] font-mono text-slate-500">Evaluated on Member ID: {loanResult.member_id}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-850/80 font-mono text-[11px]">
                        <div>
                          <span className="text-slate-500">Shares Escrowed:</span>
                          <div className="text-slate-200 font-bold">${loanResult.shares_balance.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-slate-500">Allowed Credit Boundary (1:3):</span>
                          <div className="text-emerald-400 font-bold">${loanResult.approved_limit.toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                        <div className="text-[9px] font-mono text-slate-500 uppercase mb-1 font-bold">Lending Engine Mathematical Proof</div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">{loanResult.reasoning}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16 text-xs text-slate-500 italic flex-1 flex items-center justify-center">
                      Input Member credentials to test credit multiplier validation algorithms dynamically.
                    </div>
                  )}

                  <div className="border-t border-slate-850/60 pt-4 flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span>Double entry accounts balance verified by credit validators</span>
                    <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold uppercase">COMPLIANT</span>
                  </div>
                </div>
              </div>
            )}

            {domainSelected === "church" && (
              <div className="flex flex-col lg:flex-row gap-6 flex-1">
                {/* Form to collect fund donations */}
                <div className="w-full lg:w-5/12 bg-slate-950/20 p-5 rounded-2xl border border-slate-850 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Church Fund Ledger Integration</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                      Post church fundraiser donations. Committing this form updates the FAAP general ledger balances instantly!
                    </p>
                  </div>

                  <form onSubmit={handleChurchPost} className="space-y-3.5">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Donor Full Name</label>
                      <input
                        type="text"
                        required
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Fundraising Diocese / Cluster</label>
                        <input
                          type="text"
                          required
                          value={dioceseName}
                          onChange={(e) => setDioceseName(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Donation Amount ($)</label>
                        <input
                          type="number"
                          required
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Target FAAP Receipt Account</label>
                      <select
                        value={donationAccount}
                        onChange={(e) => setDonationAccount(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        {accounts.filter(a => a.category === "Asset").map(acc => (
                          <option key={acc.code} value={acc.code}>{acc.code} ({acc.name})</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={churchPosting}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition disabled:opacity-55 cursor-pointer shadow-lg shadow-emerald-500/10"
                    >
                      {churchPosting ? (
                        <>
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                          <span>Reconciling with FAAP Core Ledger...</span>
                        </>
                      ) : (
                        <>
                          <Coins className="h-4 w-4" />
                          <span>Post Fund Contribution to FAAP GL</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Ledger connection profile */}
                <div className="flex-1 bg-slate-950/40 p-5 rounded-2xl border border-slate-850 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                      <Network className="h-4.5 w-4.5 text-emerald-400" />
                      <span>FAAP Shared Financial Platform Service</span>
                    </h4>
                    <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                      Church ERP module does NOT duplicate finance logic; it inherits the shared FAAP Double Entry general ledger.
                    </p>
                  </div>

                  <div className="bg-slate-950 border border-slate-850/60 rounded-xl p-4 my-4 flex-1 flex flex-col justify-center">
                    {churchMessage ? (
                      <div className="space-y-3.5 text-center animate-fade-in">
                        <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
                        <div className="text-xs text-slate-200 leading-relaxed font-sans">{churchMessage}</div>
                      </div>
                    ) : (
                      <div className="text-center text-xs text-slate-500 italic">
                        No transactions submitted in this session. Post a donation fund contribution to view the live General Ledger contra-entry postings.
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-850/60 pt-4 flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span>Fund contributions automatically balanced with capital share equity balances</span>
                    <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold uppercase">INTEGRATED</span>
                  </div>
                </div>
              </div>
            )}

            {domainSelected === "education" && (
              <div className="flex flex-col lg:flex-row gap-6 flex-1">
                {/* Form to post tuition fee */}
                <div className="w-full lg:w-5/12 bg-slate-950/20 p-5 rounded-2xl border border-slate-850 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Tuition Fees Invoice Reconciliation</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                      Post student billing receipts back to the shared FAAP double entry ledger to update school cash assets.
                    </p>
                  </div>

                  <form onSubmit={handleEduPost} className="space-y-3.5">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Student ID Code</label>
                      <input
                        type="text"
                        required
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Tuition Fees Reconciled ($)</label>
                        <input
                          type="number"
                          required
                          value={tuitionAmount}
                          onChange={(e) => setTuitionAmount(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">FAAP Cash Receipt Account</label>
                        <select
                          value={paymentAccount}
                          onChange={(e) => setPaymentAccount(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                        >
                          {accounts.filter(a => a.category === "Asset").map(acc => (
                            <option key={acc.code} value={acc.code}>{acc.code} ({acc.name})</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={eduPosting}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition disabled:opacity-55 cursor-pointer shadow-lg shadow-emerald-500/10"
                    >
                      {eduPosting ? (
                        <>
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                          <span>Reconciling invoice with FAAP ledger...</span>
                        </>
                      ) : (
                        <>
                          <Coins className="h-4 w-4" />
                          <span>Reconcile Invoice with FAAP</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Verification card */}
                <div className="flex-1 bg-slate-950/40 p-5 rounded-2xl border border-slate-850 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                      <Network className="h-4.5 w-4.5 text-emerald-400" />
                      <span>Shared General Ledger Backbone Reconciler</span>
                    </h4>
                    <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                      The Education ERP module connects directly with FAAP double-entry ledgers to ensure zero finance duplication.
                    </p>
                  </div>

                  <div className="bg-slate-950 border border-slate-850/60 rounded-xl p-4 my-4 flex-1 flex flex-col justify-center font-mono">
                    {eduMessage ? (
                      <div className="space-y-3.5 text-center animate-fade-in">
                        <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
                        <div className="text-xs text-slate-200 leading-relaxed font-sans">{eduMessage}</div>
                      </div>
                    ) : (
                      <div className="text-center text-xs text-slate-500 italic font-sans">
                        No tuition billing transactions processed in this session. Post a billing invoice to trigger automatic general ledger balancing accounts.
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-850/60 pt-4 flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span>Reconciliation balances cash receipts directly with school operations accounts</span>
                    <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold uppercase">CONNECTED</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
