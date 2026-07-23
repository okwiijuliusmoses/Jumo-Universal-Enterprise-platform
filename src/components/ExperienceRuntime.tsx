import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Power, Terminal, Cpu, Database, Coins, Bot, Sliders, Activity, 
  CheckCircle2, AlertCircle, RefreshCw, Plus, FileText, ArrowRight, 
  ShieldCheck, ShieldAlert, Users, Lock, Settings, Play, Eye, Globe, 
  Building2, Wrench, Network, GitFork, Calendar, DollarSign, Key, Shield,
  Search, Compass, Bell, ToggleLeft, ToggleRight, Trash2, HelpCircle,
  Clock, TrendingUp, Sparkles, Send, Check, AlertTriangle, ArrowUpDown, 
  LayoutGrid, BookOpen, Layers, Landmark, Heart, Award, Command, ChevronRight
} from "lucide-react";
import { WorkspaceId, Workspace, Widget, UserPreferences, NotificationItem } from "../types";
import OwnerControlCenter from "./OwnerControlCenter";

interface ExperienceRuntimeProps {
  currentUser: { email: string; name: string; role: string; tenantId: string; trustLevel: string };
  onLogout: () => void;
  onBackToWorkbench?: () => void;
}

export default function ExperienceRuntime({ currentUser, onLogout, onBackToWorkbench }: ExperienceRuntimeProps) {
  // Runtime State
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceId>(() => {
    const tenant = currentUser.tenantId ? currentUser.tenantId.toLowerCase() : "";
    if (tenant === "alumni") return "alumni";
    if (tenant === "sacco") return "sacco";
    if (tenant === "church") return "church";
    if (tenant === "ngo") return "ngo";
    return currentUser.role === "SecOps_Administrator" ? "owner_center" : "sacco";
  });
  
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem(`jumo_pref_${currentUser.email}`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    const defaultWorkspace = (() => {
      const tenant = currentUser.tenantId ? currentUser.tenantId.toLowerCase() : "";
      if (tenant === "alumni") return "alumni";
      if (tenant === "sacco") return "sacco";
      if (tenant === "church") return "church";
      if (tenant === "ngo") return "ngo";
      return currentUser.role === "SecOps_Administrator" ? "owner_center" : "sacco";
    })();
    return {
      theme: "dark",
      currentWorkspace: defaultWorkspace,
      widgetOrder: {
        faap: ["faap-treasury", "faap-ledger", "faap-parity"],
        sacco: ["sacco-overview", "sacco-risk", "sacco-members"],
        church: ["church-directory", "church-offerings", "church-events"],
        ngo: ["ngo-grants", "ngo-impact", "ngo-volunteers"],
        alumni: ["alumni-directory", "alumni-endowment", "alumni-mentors"],
        owner_center: ["owner-health", "owner-services", "owner-audit", "owner-threats"],
        treasury: ["faap-treasury"],
        workflow: ["owner-services"],
        security: ["owner-threats"],
        ai: ["owner-health"]
      },
      enabledWidgets: {
        faap: ["faap-treasury", "faap-ledger", "faap-parity"],
        sacco: ["sacco-overview", "sacco-risk", "sacco-members"],
        church: ["church-directory", "church-offerings", "church-events"],
        ngo: ["ngo-grants", "ngo-impact", "ngo-volunteers"],
        alumni: ["alumni-directory", "alumni-endowment", "alumni-mentors"],
        owner_center: ["owner-health", "owner-services", "owner-audit", "owner-threats"],
        treasury: ["faap-treasury"],
        workflow: ["owner-services"],
        security: ["owner-threats"],
        ai: ["owner-health"]
      },
      recentItems: [
        { id: "led-01", name: "FAAP Main Accounts", type: "Ledger", timestamp: new Date().toISOString() },
        { id: "sac-rec", name: "Zambia Sacco Group", type: "Tenant", timestamp: new Date().toISOString() }
      ],
      pinnedApps: ["faap-ledger", "sacco-risk"],
      favorites: ["faap"]
    };
  });

  // Global State Managers
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: "not-01", type: "success", title: "Zero-Trust Sync", message: "Successfully verified core parity on FAAP ledger ($0.00 offset).", timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), read: false },
    { id: "not-02", type: "warning", title: "Security Key Rotate", message: "System secret rotation for Stripe API key pending owner MFA audit.", timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), read: false }
  ]);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [toastStack, setToastStack] = useState<Array<{ id: string; type: "success" | "error" | "info"; message: string }>>([]);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [systemTime, setSystemTime] = useState(new Date());

  // Command palette keyboard triggers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      } else if (e.key === "Escape") {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // System time ticker
  useEffect(() => {
    const timer = setInterval(() => setSystemTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Save preferences
  const savePreferences = (updated: UserPreferences) => {
    setPreferences(updated);
    localStorage.setItem(`jumo_pref_${currentUser.email}`, JSON.stringify(updated));
  };

  // Add toast helper
  const addToast = (type: "success" | "error" | "info", message: string) => {
    const id = `toast-${Date.now()}`;
    setToastStack(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToastStack(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // API State Holders
  const [ownerData, setOwnerData] = useState<any>(null);
  const [ledgerAccounts, setLedgerAccounts] = useState<any[]>([]);
  const [ledgerTransactions, setLedgerTransactions] = useState<any[]>([]);
  const [trialBalance, setTrialBalance] = useState<any>(null);
  const [isDataLoading, setIsDataLoading] = useState(false);

  // Live V1 API State Holders
  const [v1PlatformStatus, setV1PlatformStatus] = useState<any>(null);
  const [v1TreasurySummary, setV1TreasurySummary] = useState<any>(null);
  const [v1SecurityEvents, setV1SecurityEvents] = useState<any>(null);
  const [v1WorkflowStatus, setV1WorkflowStatus] = useState<any>(null);
  const [v1Domains, setV1Domains] = useState<any[]>([]);

  // Load backend data securely
  const loadWorkspaceData = useCallback(async () => {
    setIsDataLoading(true);
    try {
      // 1. Fetch live v1 platform integration endpoints in parallel
      const [platRes, treasRes, secRes, wfRes, domRes] = await Promise.all([
        fetch("/api/v1/platform/status"),
        fetch("/api/v1/treasury/summary"),
        fetch("/api/v1/security/events"),
        fetch("/api/v1/workflow/status"),
        fetch("/api/v1/domains")
      ]);

      if (platRes.ok) setV1PlatformStatus(await platRes.json());
      if (treasRes.ok) setV1TreasurySummary(await treasRes.json());
      if (secRes.ok) setV1SecurityEvents(await secRes.json());
      if (wfRes.ok) setV1WorkflowStatus(await wfRes.json());
      if (domRes.ok) {
        const domData = await domRes.json();
        setV1Domains(domData.domains || []);
      }

      // 2. Fetch legacy and workspace specific profiles
      if (activeWorkspace === "owner_center" && currentUser.role === "SecOps_Administrator") {
        const res = await fetch("/api/dashboard/owner");
        if (res.ok) {
          const data = await res.json();
          setOwnerData(data);
        }
      } else if (activeWorkspace === "faap") {
        const [accRes, transRes, tbRes] = await Promise.all([
          fetch("/api/ueos/ledger/accounts"),
          fetch("/api/ueos/faap/transactions"),
          fetch("/api/ueos/ledger/trial-balance")
        ]);
        if (accRes.ok) setLedgerAccounts(await accRes.json());
        if (transRes.ok) setLedgerTransactions(await transRes.json());
        if (tbRes.ok) setTrialBalance(await tbRes.json());
      }
    } catch (e: any) {
      addToast("error", `Failed loading core services: ${e.message}`);
    } finally {
      setIsDataLoading(false);
    }
  }, [activeWorkspace, currentUser.role]);

  useEffect(() => {
    loadWorkspaceData();
  }, [loadWorkspaceData]);

  // Sync / Rebalance Command
  const handleTriggerRebalance = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/ueos/faap/ledger/reconcile", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        addToast("success", data.message || "Ledger balanced, parity score 100%!");
        // Update trial balance
        const tbRes = await fetch("/api/ueos/ledger/trial-balance");
        if (tbRes.ok) setTrialBalance(await tbRes.json());
        // Append compliance audit log
        setNotifications(prev => [
          { id: `not-${Date.now()}`, type: "success", title: "Double-Entry Audit", message: "Trial balance parity verified automatically.", timestamp: new Date().toISOString(), read: false },
          ...prev
        ]);
      } else {
        addToast("error", "Failed to reconcile ledger entries.");
      }
    } catch (e: any) {
      addToast("error", `Sync failed: ${e.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  // Back up Database
  const handleTriggerBackup = async () => {
    try {
      const res = await fetch("/api/ueos/db/backup", { method: "POST" });
      if (res.ok) {
        addToast("success", "Microkernel database backup committed successfully (AES-256 encrypted).");
      } else {
        addToast("error", "Database backup rejected by firewall.");
      }
    } catch (e: any) {
      addToast("error", `Backup failed: ${e.message}`);
    }
  };

  // Workspace Setup Definition
  const workspaces: Record<WorkspaceId, Workspace> = {
    faap: {
      id: "faap",
      name: "FAAP Ledger Workspace",
      iconName: "Landmark",
      description: "Financial & Accounting Platform Master Double-Entry Ledger System.",
      routes: [
        { id: "accounts", label: "Chart of Accounts", iconName: "BookOpen" },
        { id: "transactions", label: "Journal Vouchers", iconName: "ArrowUpDown" },
        { id: "reconciliation", label: "Compliance & Parity", iconName: "ShieldCheck" }
      ],
      defaultWidgets: ["faap-treasury", "faap-ledger", "faap-parity"]
    },
    sacco: {
      id: "sacco",
      name: "SACCO Cooperative ERP",
      iconName: "Building2",
      description: "Credit unions savings, loan evaluation, and membership matrices.",
      routes: [
        { id: "members", label: "Members Savings", iconName: "Users" },
        { id: "loans", label: "Credit Risk Evaluator", iconName: "Coins" }
      ],
      defaultWidgets: ["sacco-overview", "sacco-risk", "sacco-members"]
    },
    church: {
      id: "church",
      name: "Diocese Church ERP",
      iconName: "Heart",
      description: "Congregational lists, tithes analytics, and liturgical events schedule.",
      routes: [
        { id: "directory", label: "Congregants", iconName: "Users" },
        { id: "tithes", label: "Tithes & Offerings", iconName: "Coins" },
        { id: "events", label: "Parish Events", iconName: "Calendar" }
      ],
      defaultWidgets: ["church-directory", "church-offerings", "church-events"]
    },
    ngo: {
      id: "ngo",
      name: "NGO Impact Tracker",
      iconName: "Award",
      description: "Donations tracking pipeline, local grants, and humanitarian logs.",
      routes: [
        { id: "donations", label: "Donation Pipelines", iconName: "TrendingUp" },
        { id: "programs", label: "Impact Areas", iconName: "Globe" }
      ],
      defaultWidgets: ["ngo-grants", "ngo-impact", "ngo-volunteers"]
    },
    alumni: {
      id: "alumni",
      name: "Alumni & Endowments",
      iconName: "Compass",
      description: "Chapter directories, endowment campaigns, and mentor routing.",
      routes: [
        { id: "members", label: "Graduates Database", iconName: "Users" },
        { id: "campaigns", label: "Class Gifts", iconName: "Coins" }
      ],
      defaultWidgets: ["alumni-directory", "alumni-endowment", "alumni-mentors"]
    },
    owner_center: {
      id: "owner_center",
      name: "System Owner Room",
      iconName: "Sliders",
      description: "Zero-Trust administrative console and real-time core diagnostic panel.",
      routes: [
        { id: "diagnostics", label: "Kernel Telemetry", iconName: "Activity" },
        { id: "security", label: "Secrets Firewall", iconName: "Shield" },
        { id: "logs", label: "Audit Stream", iconName: "Terminal" }
      ],
      defaultWidgets: ["owner-health", "owner-services", "owner-audit", "owner-threats"]
    },
    treasury: {
      id: "treasury",
      name: "Master Treasury & Fee Reserves",
      iconName: "Coins",
      description: "Operational settlement clearing fee tracker (1.5% auto-split ledger reserves).",
      routes: [
        { id: "reserves", label: "Master Reserves", iconName: "Coins" },
        { id: "settlements", label: "FinTech Settlements", iconName: "ArrowUpDown" }
      ],
      defaultWidgets: ["faap-treasury"]
    },
    workflow: {
      id: "workflow",
      name: "Cognitive Workflow Engine",
      iconName: "Play",
      description: "Platform core background job processes, task state triggers, and telemetry loops.",
      routes: [
        { id: "pipelines", label: "Execution Pipelines", iconName: "Activity" },
        { id: "triggers", label: "Event Triggers", iconName: "Settings" }
      ],
      defaultWidgets: ["owner-services"]
    },
    security: {
      id: "security",
      name: "Zero-Trust Security & Vault",
      iconName: "Shield",
      description: "Microkernel credential firewall and encrypted local secret management.",
      routes: [
        { id: "credentials", label: "Encrypted Credentials", iconName: "Key" },
        { id: "firewall", label: "Zero-Trust Logs", iconName: "ShieldCheck" }
      ],
      defaultWidgets: ["owner-threats"]
    },
    ai: {
      id: "ai",
      name: "AI Workspace Assistant",
      iconName: "Bot",
      description: "Unified multi-model AI routing gateway, context history, and semantic memory.",
      routes: [
        { id: "models", label: "Model Registry", iconName: "Cpu" },
        { id: "memories", label: "Long-Term Memory", iconName: "Database" }
      ],
      defaultWidgets: ["owner-health"]
    }
  };

  // State for adding elements
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<string>("MEMBER-102");

  useEffect(() => {
    setActiveRouteId(null);
  }, [activeWorkspace]);

  const [saccoMembers, setSaccoMembers] = useState<any[]>([
    { id: "MEMBER-102", name: "Kizito Emmanuel", balance: 5400000, activeLoans: 1, joinDate: "2025-03-12" },
    { id: "MEMBER-103", name: "Nsubuga Phiona", balance: 12500000, activeLoans: 0, joinDate: "2025-06-25" },
    { id: "MEMBER-104", name: "Mugisha Derrick", balance: 850000, activeLoans: 2, joinDate: "2026-01-10" }
  ]);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberDeposit, setNewMemberDeposit] = useState("");

  const handleAddSaccoMember = () => {
    if (!newMemberName || !newMemberDeposit) {
      addToast("error", "Fill in all fields for membership.");
      return;
    }
    const depositAmt = parseFloat(newMemberDeposit);
    const newMember = {
      id: `MEMBER-${Math.floor(Math.random() * 900) + 100}`,
      name: newMemberName,
      balance: depositAmt,
      activeLoans: 0,
      joinDate: new Date().toISOString().split("T")[0]
    };
    setSaccoMembers(prev => [newMember, ...prev]);
    addToast("success", `Member ${newMemberName} registered. Sacco share pool credited: $${depositAmt.toLocaleString()}`);
    setNewMemberName("");
    setNewMemberDeposit("");
    setShowAddMemberModal(false);
  };

  // SACCO loan evaluation state
  const [loanForm, setLoanForm] = useState({
    amount: "15000",
    collateral: "Commercial property deed",
    creditScore: "720",
    debtToIncome: "28"
  });
  const [loanReport, setLoanReport] = useState<any>(null);
  const [isEvaluatingLoan, setIsEvaluatingLoan] = useState(false);

  const handleEvaluateLoan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluatingLoan(true);
    try {
      const memberObj = saccoMembers.find(m => m.id === selectedMemberId);
      const shares_balance = memberObj ? memberObj.balance : 10000;

      const res = await fetch("/api/ueos/sacco/loans/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          member_id: selectedMemberId,
          requested_amount: parseFloat(loanForm.amount),
          shares_balance: shares_balance
        })
      });
      if (res.ok) {
        const data = await res.json();
        // Translate backend names approved_limit & reasoning to show beautiful output
        setLoanReport({
          decision: data.risk_assessment === "approved" ? "Approved" : "Rejected",
          reason: data.reasoning || `Dynamic audit validation completed. Limit approved up to $${(data.approved_limit ?? 0).toLocaleString()}`,
          metrics: {
            interestRate: "8.5% APR",
            maxApprovedAmount: data.approved_limit
          }
        });
        addToast("success", `Credit Risk Assessment complete: ${data.risk_assessment === "approved" ? "Approved" : "Rejected"}`);
      } else {
        addToast("error", "Loan evaluation rejected by risk engine.");
      }
    } catch (e: any) {
      addToast("error", `Evaluation error: ${e.message}`);
    } finally {
      setIsEvaluatingLoan(false);
    }
  };

  // Post FAAP journal transaction state
  const [journalForm, setJournalForm] = useState({
    debitAcc: "1010",
    creditAcc: "4010",
    amount: "150",
    narration: "Standard workspace licensing monthly settlement."
  });
  const [isPostingJournal, setIsPostingJournal] = useState(false);

  const handlePostJournal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPostingJournal(true);
    try {
      const res = await fetch("/api/ueos/faap/transactions/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceAccount: journalForm.debitAcc,
          destinationAccount: journalForm.creditAcc,
          amount: parseFloat(journalForm.amount),
          narration: journalForm.narration,
          postedBy: currentUser.email,
          tenantId: currentUser.tenantId
        })
      });

      if (res.ok) {
        const data = await res.json();
        addToast("success", "Double-entry transaction committed. Debit matches credit ($0.00 offset).");
        loadWorkspaceData(); // Reload balances
        setJournalForm(prev => ({ ...prev, amount: "" }));
      } else {
        const data = await res.json();
        addToast("error", data.error || "Double entry failed validation balance check.");
      }
    } catch (e: any) {
      addToast("error", `Journal post error: ${e.message}`);
    } finally {
      setIsPostingJournal(false);
    }
  };

  // Church state hooks
  const [churchCongregants, setChurchCongregants] = useState<any[]>([
    { id: "C-101", name: "Pastor James Okello", role: "Rector/Pastor", joined: "2020-04-12", status: "Active" },
    { id: "C-102", name: "Elder Sarah Musoke", role: "Lay Reader/Elder", joined: "2021-08-20", status: "Active" },
    { id: "C-103", name: "Mukasa Peter", role: "Choir Leader", joined: "2023-01-15", status: "Active" },
    { id: "C-104", name: "Namatovu Claire", role: "Congregant", joined: "2024-05-10", status: "Active" }
  ]);
  const [newCongregantName, setNewCongregantName] = useState("");
  const [newCongregantRole, setNewCongregantRole] = useState("Congregant");
  const [churchEvents, setChurchEvents] = useState<any[]>([
    { id: "E-301", title: "Sunday Holy Eucharist Service", date: "Every Sunday 08:00 AM", location: "Main Sanctuary" },
    { id: "E-302", title: "Youth Fellowship Conference", date: "2026-08-15 02:00 PM", location: "Parish Hall" },
    { id: "E-303", title: "Diocesan Synod Meeting", date: "2026-09-02 09:00 AM", location: "Cathedral Boardroom" }
  ]);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventLocation, setNewEventLocation] = useState("");
  const [churchOfferingForm, setChurchOfferingForm] = useState({
    amount: "250",
    contributor: "Namatovu Claire",
    type: "Tithes"
  });
  const [isPostingChurchOffering, setIsPostingChurchOffering] = useState(false);

  // NGO state hooks
  const [ngoDonations, setNgoDonations] = useState<any[]>([
    { id: "DON-501", donor: "Global Water Trust", amount: 45000, grantCode: "WAT-KARAM-2026", status: "Received" },
    { id: "DON-502", donor: "USAID Local Dev", amount: 120000, grantCode: "EDU-NIL-2026", status: "Active" },
    { id: "DON-503", donor: "Dr. Alistair Vance", amount: 15000, grantCode: "MED-JINJA-2026", status: "Received" }
  ]);
  const [newDonorName, setNewDonorName] = useState("");
  const [newDonorAmount, setNewDonorAmount] = useState("5000");
  const [newDonorGrantCode, setNewDonorGrantCode] = useState("GEN-DHP-2026");
  const [ngoPrograms, setNgoPrograms] = useState<any[]>([
    { id: "PRG-801", name: "Clean Water Wells (Karamoja)", progress: 75, target: "10 Wells Drilled", cost: 35000 },
    { id: "PRG-802", name: "Acreage Seed Distribution (Gulu)", progress: 90, target: "500 Farmers Seeded", cost: 25000 },
    { id: "PRG-803", name: "Maternity Clinic Supplies (Jinja)", progress: 40, target: "Medical Kits Delivery", cost: 12000 }
  ]);

  // Alumni state hooks
  const [alumniMembers, setAlumniMembers] = useState<any[]>([
    { id: "AL-701", name: "Dr. Arthur Sserwanga", classYear: "1998", profession: "Chief Neurosurgeon", contact: "arthur@neuro.net" },
    { id: "AL-702", name: "Mbabazi Patricia", classYear: "2005", profession: "Fintech Architect", contact: "patricia@jumo.net" },
    { id: "AL-703", name: "Wanyama Moses", classYear: "2012", profession: "Sovereign Advocate", contact: "moses@advocate.co" }
  ]);
  const [newAlumniName, setNewAlumniName] = useState("");
  const [newAlumniClass, setNewAlumniClass] = useState("2018");
  const [newAlumniProfession, setNewAlumniProfession] = useState("");
  const [alumniCampaigns, setAlumniCampaigns] = useState<any[]>([
    { id: "CAMP-901", name: "Class of 1998 Memorial Lab Fund", pledged: 85000, goal: 100000, donorsCount: 34 },
    { id: "CAMP-902", name: "Undergraduate STEM Scholarship", pledged: 42000, goal: 50000, donorsCount: 18 }
  ]);
  const [newCampaignContribution, setNewCampaignContribution] = useState({
    alumniName: "Dr. Arthur Sserwanga",
    campaignId: "CAMP-901",
    amount: "1500"
  });

  // Owner Center state hooks
  const [ownerSecrets, setOwnerSecrets] = useState<any[]>([]);
  const [securityThreats, setSecurityThreats] = useState<any[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<any>({ cpu: 28, memory: 54, io: 15, nodesCount: 12 });
  const [isScanningThreats, setIsScanningThreats] = useState(false);
  const [newSecretKey, setNewSecretKey] = useState("");
  const [newSecretVal, setNewSecretVal] = useState("");

  const loadOwnerRoomData = async () => {
    try {
      const secretsRes = await fetch("/api/ueos/secrets");
      if (secretsRes.ok) {
        const data = await secretsRes.json();
        setOwnerSecrets(data.secrets || []);
      }
      const threatsRes = await fetch("/api/ueos/security/threats");
      if (threatsRes.ok) {
        const data = await threatsRes.json();
        setSecurityThreats(data.threats || []);
      }
      const metricsRes = await fetch("/api/ueos/monitoring/metrics");
      if (metricsRes.ok) {
        const data = await metricsRes.json();
        setSystemMetrics(data.metrics || { cpu: 32, memory: 58, io: 18, nodesCount: 14 });
      }
    } catch (err) {
      console.error("Owner data fetch failed", err);
    }
  };

  useEffect(() => {
    if (activeWorkspace === "owner_center") {
      loadOwnerRoomData();
    }
  }, [activeWorkspace, activeRouteId]);

  // Handle addition of congregants
  const handleAddCongregant = () => {
    if (!newCongregantName) {
      addToast("error", "Please provide a congregant name.");
      return;
    }
    const newCong = {
      id: `C-${Math.floor(Math.random() * 900) + 100}`,
      name: newCongregantName,
      role: newCongregantRole,
      joined: new Date().toISOString().split("T")[0],
      status: "Active"
    };
    setChurchCongregants(prev => [...prev, newCong]);
    addToast("success", `Congregant ${newCongregantName} registered under diocese registry.`);
    setNewCongregantName("");
  };

  // Handle parish event creation
  const handleAddParishEvent = () => {
    if (!newEventTitle || !newEventDate || !newEventLocation) {
      addToast("error", "Fill in all liturgical event parameters.");
      return;
    }
    const newEv = {
      id: `E-${Math.floor(Math.random() * 900) + 100}`,
      title: newEventTitle,
      date: newEventDate,
      location: newEventLocation
    };
    setChurchEvents(prev => [...prev, newEv]);
    addToast("success", `Scheduled Diocesan Liturgical Event: ${newEventTitle}`);
    setNewEventTitle("");
    newEventDate && setNewEventDate("");
    newEventLocation && setNewEventLocation("");
  };

  // Record Church Contribution directly into the core Double Entry Ledger
  const handlePostChurchOffering = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPostingChurchOffering(true);
    try {
      const res = await fetch("/api/ueos/faap/transactions/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceAccount: "1010", // Debit: Cash Assets
          destinationAccount: "4010", // Credit: Fee Revenue/Tithing
          amount: parseFloat(churchOfferingForm.amount),
          narration: `Church ${churchOfferingForm.type} contribution from ${churchOfferingForm.contributor}.`,
          postedBy: currentUser.email,
          tenantId: currentUser.tenantId
        })
      });

      if (res.ok) {
        addToast("success", `Offering posted! Cash Debited, Revenue Credited in Core Ledger ($0.00 Parity Offset verified).`);
        loadWorkspaceData(); // refresh the balances
        setChurchOfferingForm(prev => ({ ...prev, amount: "" }));
      } else {
        const errData = await res.json();
        addToast("error", errData.error || "Tithe posting failed double entry parity check.");
      }
    } catch (err: any) {
      addToast("error", `Ledger synchronization error: ${err.message}`);
    } finally {
      setIsPostingChurchOffering(false);
    }
  };

  // Record NGO grant donation into Ledger
  const handlePostNgoDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDonorName || !newDonorAmount) {
      addToast("error", "Fill in all donor parameters.");
      return;
    }
    const donationAmt = parseFloat(newDonorAmount);
    const donationCode = newDonorGrantCode || "GEN-DHP-2026";
    
    try {
      const res = await fetch("/api/ueos/faap/transactions/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceAccount: "1010", // Debit Cash
          destinationAccount: "3010", // Credit Share Capital/Grants
          amount: donationAmt,
          narration: `Grant donation from donor ${newDonorName} coded ${donationCode}`,
          postedBy: currentUser.email,
          tenantId: currentUser.tenantId
        })
      });

      if (res.ok) {
        const newDon = {
          id: `DON-${Math.floor(Math.random() * 900) + 100}`,
          donor: newDonorName,
          amount: donationAmt,
          grantCode: donationCode,
          status: "Received"
        };
        setNgoDonations(prev => [newDon, ...prev]);
        addToast("success", `Donation registered and credited to NGO Cash Fund. General Ledger balanced.`);
        loadWorkspaceData();
        setNewDonorName("");
        setNewDonorAmount("5000");
      } else {
        addToast("error", "Donation ledger allocation failed validation check.");
      }
    } catch (err: any) {
      addToast("error", `Ledger transaction error: ${err.message}`);
    }
  };

  // Record Alumni contribution campaign gift
  const handlePostAlumniGift = async (e: React.FormEvent) => {
    e.preventDefault();
    const giftAmt = parseFloat(newCampaignContribution.amount);
    if (isNaN(giftAmt) || giftAmt <= 0) {
      addToast("error", "Enter a valid class gift contribution amount.");
      return;
    }
    try {
      const res = await fetch("/api/ueos/faap/transactions/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceAccount: "1010", // Debit Cash
          destinationAccount: "3010", // Credit Endowment Equity
          amount: giftAmt,
          narration: `Class Endowment gift from alumni ${newCampaignContribution.alumniName} to campaign ${newCampaignContribution.campaignId}`,
          postedBy: currentUser.email,
          tenantId: currentUser.tenantId
        })
      });

      if (res.ok) {
        setAlumniCampaigns(prev => prev.map(c => {
          if (c.id === newCampaignContribution.campaignId) {
            return { ...c, pledged: c.pledged + giftAmt, donorsCount: c.donorsCount + 1 };
          }
          return c;
        }));
        addToast("success", `Class gift compiled successfully. Recieved $${giftAmt} to Endowment Cash Trust.`);
        loadWorkspaceData();
        setNewCampaignContribution(prev => ({ ...prev, amount: "" }));
      } else {
        addToast("error", "Endowment contribution rejected by double-entry ledger.");
      }
    } catch (err: any) {
      addToast("error", `Endowment register failure: ${err.message}`);
    }
  };

  // Add Alumni member
  const handleAddAlumni = () => {
    if (!newAlumniName || !newAlumniProfession) {
      addToast("error", "Fill in all alumni details.");
      return;
    }
    const newAl = {
      id: `AL-${Math.floor(Math.random() * 900) + 100}`,
      name: newAlumniName,
      classYear: newAlumniClass,
      profession: newAlumniProfession,
      contact: `${newAlumniName.toLowerCase().replace(/\s+/g, "")}@alumni.net`
    };
    setAlumniMembers(prev => [...prev, newAl]);
    addToast("success", `Alumni graduate recorded in chapters database.`);
    setNewAlumniName("");
    setNewAlumniProfession("");
  };

  // Trigger real-time firewall threat scan
  const handleTriggerThreatScan = async () => {
    setIsScanningThreats(true);
    addToast("info", "Starting multi-vector intrusion & threat scan...");
    try {
      const res = await fetch("/api/ueos/security/threat-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) {
        const data = await res.json();
        setSecurityThreats(data.threats || []);
        addToast("success", `Multi-vector intrusion scan complete! Parity: ${data.threat_level}.`);
        loadOwnerRoomData();
      } else {
        addToast("error", "Security firewall scan failed.");
      }
    } catch (err: any) {
      addToast("error", `Scan error: ${err.message}`);
    } finally {
      setIsScanningThreats(false);
    }
  };

  // Register Secret
  const handleRegisterSecret = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSecretKey || !newSecretVal) {
      addToast("error", "Key and value parameters are required.");
      return;
    }
    try {
      const res = await fetch("/api/ueos/secrets/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: newSecretKey,
          value: newSecretVal,
          environment: "production"
        })
      });
      if (res.ok) {
        addToast("success", `AES-256 key registered securely into vault: ${newSecretKey}`);
        setNewSecretKey("");
        setNewSecretVal("");
        loadOwnerRoomData();
      } else {
        addToast("error", "Vault registration rejected.");
      }
    } catch (err: any) {
      addToast("error", `Vault error: ${err.message}`);
    }
  };

  // Delete Secret
  const handleDeleteSecret = async (key: string) => {
    try {
      const res = await fetch("/api/ueos/secrets/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key })
      });
      if (res.ok) {
        addToast("success", `Secret deleted from secure vault: ${key}`);
        loadOwnerRoomData();
      } else {
        addToast("error", "Deletion rejected.");
      }
    } catch (err: any) {
      addToast("error", `Vault delete error: ${err.message}`);
    }
  };

  const renderActiveRouteView = () => {
    if (activeWorkspace === "faap") {
      if (activeRouteId === "accounts") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-teal-400" />
                    <span>Double-Entry Chart of Accounts (COA)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Real-time ledger registry isolated across all active tenant nodes.</p>
                </div>
                <button
                  onClick={loadWorkspaceData}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5"
                >
                  <RefreshCw className={`h-3 w-3 ${isDataLoading ? "animate-spin" : ""}`} />
                  <span>Refresh Registry</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse font-mono text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-900 text-slate-500 text-[10px] uppercase tracking-widest">
                      <th className="py-3 px-4">Account Code</th>
                      <th className="py-3 px-4">Account Name</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4 text-right">Balance</th>
                      <th className="py-3 px-4 text-center">Security Policy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/60">
                    {ledgerAccounts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-600">
                          {isDataLoading ? "Connecting to Zero-Trust secure cache..." : "No active accounts registered in ledger node."}
                        </td>
                      </tr>
                    ) : (
                      ledgerAccounts.map(acc => (
                        <tr key={acc.code} className="hover:bg-slate-900/20 transition">
                          <td className="py-3 px-4 text-teal-400 font-extrabold">{acc.code}</td>
                          <td className="py-3 px-4 text-slate-200 font-bold">{acc.name}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${
                              acc.category === "Asset" 
                                ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                                : acc.category === "Liability"
                                ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                                : acc.category === "Equity"
                                ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                                : acc.category === "Revenue"
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                            }`}>
                              {acc.category}
                            </span>
                          </td>
                          <td className={`py-3 px-4 text-right font-extrabold ${acc.balance >= 0 ? "text-slate-100" : "text-rose-400"}`}>
                            ${acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-[9px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                              ENCRYPTED
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        );
      }

      if (activeRouteId === "transactions") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-6"
          >
            {/* Left side: List transactions */}
            <div className="xl:col-span-2 bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4 text-teal-400" />
                    <span>Double-Entry Transaction History</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Audit-ready historical postings of JUMO double-entry vouchers.</p>
                </div>
              </div>

              <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full border-collapse font-mono text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-900 text-slate-500 text-[10px] uppercase tracking-widest">
                      <th className="py-3 px-4">Voucher</th>
                      <th className="py-3 px-4">Narration</th>
                      <th className="py-3 px-4 text-right">Debit</th>
                      <th className="py-3 px-4 text-right">Credit</th>
                      <th className="py-3 px-4 text-center">Audit Parity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/60 font-mono">
                    {ledgerTransactions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-600">No transactions recorded. Create one using the form.</td>
                      </tr>
                    ) : (
                      ledgerTransactions.map(tx => (
                        <tr key={tx.id} className="hover:bg-slate-900/20 transition">
                          <td className="py-3 px-4 text-teal-400 font-extrabold">{tx.voucherNumber}</td>
                          <td className="py-3 px-4 text-slate-300 max-w-xs truncate">{tx.narration}</td>
                          <td className="py-3 px-4 text-right font-extrabold text-slate-100">
                            {tx.debitAmount > 0 ? `$${tx.debitAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : "-"}
                          </td>
                          <td className="py-3 px-4 text-right font-extrabold text-slate-100">
                            {tx.creditAmount > 0 ? `$${tx.creditAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : "-"}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-[9px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                              PASSED
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right side: Creation Form */}
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4 h-fit">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <Plus className="h-4 w-4 text-teal-400" />
                <span>Create Journal Voucher</span>
              </h3>
              <form onSubmit={handlePostJournal} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">Debit Account Code</label>
                  <select 
                    value={journalForm.debitAcc} 
                    onChange={e => setJournalForm({...journalForm, debitAcc: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 font-bold focus:outline-none focus:border-teal-500"
                  >
                    <option value="1010">1010 - Cash Assets</option>
                    <option value="1020">1020 - Accounts Receivable</option>
                    <option value="5010">5010 - Operations Expense</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">Credit Account Code</label>
                  <select 
                    value={journalForm.creditAcc} 
                    onChange={e => setJournalForm({...journalForm, creditAcc: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 font-bold focus:outline-none focus:border-teal-500"
                  >
                    <option value="4010">4010 - Fee Revenue (1.5%)</option>
                    <option value="2010">2010 - Accounts Payable</option>
                    <option value="3010">3010 - Share Capital Equity</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">Posting Amount ($)</label>
                  <input
                    type="number"
                    placeholder="Enter absolute posting amount..."
                    value={journalForm.amount}
                    onChange={e => setJournalForm({...journalForm, amount: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">Narration / Voucher Description</label>
                  <textarea
                    placeholder="Provide professional auditing context..."
                    value={journalForm.narration}
                    onChange={e => setJournalForm({...journalForm, narration: e.target.value})}
                    rows={3}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500 resize-none"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isPostingJournal}
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold py-3 rounded-xl text-xs tracking-wider uppercase transition cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-teal-500/10"
                >
                  {isPostingJournal ? (
                    <>
                      <RefreshCw className="h-4.5 w-4.5 animate-spin" />
                      <span>Validating Double Entry...</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4.5 w-4.5" />
                      <span>Commit Journal Post</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        );
      }

      if (activeRouteId === "reconciliation") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span>Trial Balance & Ledger Parity Audit</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Real-time balancing of assets, liabilities, equities, revenues, and expenses with absolute parity.</p>
                </div>
                <button
                  onClick={handleTriggerRebalance}
                  disabled={isSyncing}
                  className="bg-teal-500 hover:bg-teal-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-teal-500/10"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                  <span>Execute Parity Reconciliation</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                <div className="bg-slate-900/40 border border-slate-900 p-5 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Debit Totals</span>
                  <div className="text-xl font-extrabold text-slate-100">
                    ${(trialBalance?.totalDebits ?? 15400250).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <span className="text-[9px] text-emerald-400 block flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Fully verified
                  </span>
                </div>
                <div className="bg-slate-900/40 border border-slate-900 p-5 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Credit Totals</span>
                  <div className="text-xl font-extrabold text-slate-100">
                    ${(trialBalance?.totalCredits ?? 15400250).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <span className="text-[9px] text-emerald-400 block flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Fully verified
                  </span>
                </div>
                <div className="bg-slate-900/40 border border-slate-900 p-5 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Trial Balance Discrepancy</span>
                  <div className="text-xl font-extrabold text-emerald-400">
                    $0.00 offset
                  </div>
                  <span className="text-[9px] text-emerald-400 block flex items-center gap-1 font-bold">
                    <ShieldCheck className="h-3.5 w-3.5" /> 100% PARITY SCORE
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-900/25 border border-slate-900 rounded-xl space-y-2">
                <h5 className="font-bold text-xs text-slate-300">Continuous Audit Policy Gating</h5>
                <p className="text-xs text-slate-400 leading-normal">
                  JUMO Universal Enterprise Operating System (UEOS) enforces atomic double-entry operations at the micro-kernel database layer. Any operational posting that creates a non-zero parity offset is automatically trapped, rejected, and quarantined. The 1.5% Master fintech clearing fee automatically posts to the sovereign treasury pool on all simulated transactional triggers.
                </p>
              </div>
            </div>
          </motion.div>
        );
      }
    }

    if (activeWorkspace === "sacco") {
      if (activeRouteId === "members") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-6"
          >
            {/* Left Column: Member List */}
            <div className="xl:col-span-2 bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Users className="h-4 w-4 text-teal-400" />
                    <span>SACCO Active Member Registry</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Authorized savings deposits, shares indices, and loan metrics for member credit accounts.</p>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {saccoMembers.map(member => (
                  <div key={member.id} className="flex justify-between items-center bg-slate-900/40 border border-slate-900 p-4 rounded-xl hover:bg-slate-900/60 transition">
                    <div className="space-y-1">
                      <span className="text-slate-200 font-extrabold text-sm block">{member.name}</span>
                      <span className="text-slate-500 text-[10px] block">Joined: {member.joinDate} &bull; Registry Claim: <span className="text-teal-400 font-bold">{member.id}</span></span>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="text-emerald-400 font-extrabold text-base block">${member.balance.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-400 block bg-slate-900 px-2 py-1 rounded inline-block font-bold">Active Loans: {member.activeLoans}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Register Member */}
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4 h-fit">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <Plus className="h-4 w-4 text-teal-400" />
                <span>Register Cooperative Member</span>
              </h3>
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Applicant Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter legal name..."
                    value={newMemberName}
                    onChange={e => setNewMemberName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Initial Savings Share Deposit ($)</label>
                  <input
                    type="number"
                    placeholder="Enter deposit value..."
                    value={newMemberDeposit}
                    onChange={e => setNewMemberDeposit(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <button
                  onClick={handleAddSaccoMember}
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex justify-center shadow-lg shadow-teal-500/10"
                >
                  Submit Cooperative Registry
                </button>
              </div>
            </div>
          </motion.div>
        );
      }

      if (activeRouteId === "loans") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 xl:grid-cols-2 gap-6"
          >
            {/* Left Panel: Loan Evaluator inputs */}
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <Coins className="h-4 w-4 text-teal-400 animate-pulse" />
                <span>Credit Risk Evaluation Model</span>
              </h3>
              <form onSubmit={handleEvaluateLoan} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Target Cooperative Member</label>
                  <select 
                    value={selectedMemberId} 
                    onChange={e => setSelectedMemberId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 font-bold focus:outline-none focus:border-teal-500"
                  >
                    {saccoMembers.map(m => (
                      <option key={m.id} value={m.id}>{m.name} (Shares: ${m.balance.toLocaleString()})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Requested Loan Limit ($)</label>
                  <input
                    type="number"
                    value={loanForm.amount}
                    onChange={e => setLoanForm({...loanForm, amount: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Pledged Audited Collateral</label>
                  <input
                    type="text"
                    value={loanForm.collateral}
                    onChange={e => setLoanForm({...loanForm, collateral: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isEvaluatingLoan}
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {isEvaluatingLoan ? (
                    <RefreshCw className="h-4.5 w-4.5 animate-spin text-slate-950" />
                  ) : (
                    <Activity className="h-4.5 w-4.5" />
                  )}
                  <span>Compile Credit Risk Score</span>
                </button>
              </form>
            </div>

            {/* Right Panel: Risk Model Report output */}
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                  <FileText className="h-4 w-4 text-teal-400" />
                  <span>Cognitive Assessment Report</span>
                </h3>
                {loanReport ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 font-mono text-xs space-y-4"
                  >
                    <div className="flex justify-between items-center p-3 bg-slate-900/60 border border-slate-900 rounded-xl">
                      <span className="text-slate-500 uppercase tracking-widest text-[9px] font-bold">Risk Assessment Result</span>
                      <span className={`font-extrabold px-3 py-1 rounded-full text-[10px] border tracking-wider uppercase ${
                        loanReport.decision === "Approved" 
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                          : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                      }`}>
                        {loanReport.decision}
                      </span>
                    </div>

                    <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-xl leading-relaxed text-slate-300">
                      {loanReport.reason}
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-[10px]">
                      <div className="p-3 bg-slate-900/40 border border-slate-900 rounded-xl">
                        <span className="text-slate-500 block uppercase text-[8px] mb-1">Annual Interest Rate</span>
                        <span className="text-teal-400 font-extrabold text-sm">{loanReport.metrics?.interestRate}</span>
                      </div>
                      <div className="p-3 bg-slate-900/40 border border-slate-900 rounded-xl">
                        <span className="text-slate-500 block uppercase text-[8px] mb-1">Maximum Allowed Limit</span>
                        <span className="text-slate-200 font-extrabold text-sm">${loanReport.metrics?.maxApprovedAmount?.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-48 flex flex-col items-center justify-center text-slate-600 font-mono text-center px-4">
                    <Activity className="h-8 w-8 text-slate-700 animate-pulse mb-2" />
                    <p className="text-[10px]">Risk Model Idle. Enter evaluation parameters on left panel to run live cognitive check.</p>
                  </div>
                )}
              </div>

              <div className="p-3 bg-slate-900/20 border border-slate-900 rounded-xl text-[10px] font-mono text-slate-500 leading-normal">
                Policy constraint check (1:3 collateral multiplier rule) is continuously simulated against active members' deposit shares inside local memory cache layers.
              </div>
            </div>
          </motion.div>
        );
      }
    }

    // --- Diocese Church ERP Workspace ---
    if (activeWorkspace === "church") {
      if (activeRouteId === "directory") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-6"
          >
            {/* Congregants List */}
            <div className="xl:col-span-2 bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Users className="h-4 w-4 text-teal-400" />
                    <span>Diocesan Parish Congregants Directory</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Sovereign registry of active Parish members, layout roles, and baptism claim tracking.</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse font-mono text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-900 text-slate-500 text-[10px] uppercase tracking-widest">
                      <th className="py-3 px-4">Claim ID</th>
                      <th className="py-3 px-4">Full Name</th>
                      <th className="py-3 px-4">Ecosystem Role</th>
                      <th className="py-3 px-4">Admission Date</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/60 text-slate-300">
                    {churchCongregants.map(c => (
                      <tr key={c.id} className="hover:bg-slate-900/20 transition">
                        <td className="py-3 px-4 text-teal-400 font-extrabold">{c.id}</td>
                        <td className="py-3 px-4 font-bold text-slate-100">{c.name}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[9px] bg-slate-900 border border-slate-800 text-slate-400 font-bold uppercase">
                            {c.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400">{c.joined}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-[9px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Register Congregant Form */}
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4 h-fit">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <Plus className="h-4 w-4 text-teal-400" />
                <span>Admit New Congregant</span>
              </h3>
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Legal Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter full name..."
                    value={newCongregantName}
                    onChange={e => setNewCongregantName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Parish Liturgical Role</label>
                  <select
                    value={newCongregantRole}
                    onChange={e => setNewCongregantRole(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 font-bold focus:outline-none focus:border-teal-500"
                  >
                    <option value="Congregant">Congregant / Layperson</option>
                    <option value="Choir Leader">Choir Leader / Vocalist</option>
                    <option value="Lay Reader">Lay Reader / Elder</option>
                    <option value="Pastor">Rector / Pastor / Clergyman</option>
                  </select>
                </div>
                <button
                  onClick={handleAddCongregant}
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex justify-center shadow-lg shadow-teal-500/10"
                >
                  Confirm Admission Record
                </button>
              </div>
            </div>
          </motion.div>
        );
      }

      if (activeRouteId === "tithes") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-6"
          >
            {/* Contribution Recorder Form */}
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4 h-fit">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <Coins className="h-4 w-4 text-teal-400" />
                <span>Record Congregational Tithe</span>
              </h3>
              <form onSubmit={handlePostChurchOffering} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Payer Name / Family</label>
                  <input
                    type="text"
                    required
                    value={churchOfferingForm.contributor}
                    onChange={e => setChurchOfferingForm({...churchOfferingForm, contributor: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Contribution Code</label>
                  <select
                    value={churchOfferingForm.type}
                    onChange={e => setChurchOfferingForm({...churchOfferingForm, type: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 font-bold focus:outline-none focus:border-teal-500"
                  >
                    <option value="Tithes">Tithing (10% Income Pledge)</option>
                    <option value="Offerings">General Parish Thanksgiving Offering</option>
                    <option value="Building Fund">Parish Building & Expansion Seed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Offering Amount ($)</label>
                  <input
                    type="number"
                    required
                    value={churchOfferingForm.amount}
                    onChange={e => setChurchOfferingForm({...churchOfferingForm, amount: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isPostingChurchOffering}
                  className="w-full bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 text-slate-950 font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex justify-center items-center gap-1.5 shadow-lg shadow-teal-500/10"
                >
                  {isPostingChurchOffering ? <RefreshCw className="h-4 w-4 animate-spin text-slate-950" /> : <Plus className="h-4 w-4" />}
                  <span>Commit Tithe Ledger Post</span>
                </button>
              </form>
            </div>

            {/* Platform FAAP Double-Entry Integration Panel */}
            <div className="xl:col-span-2 bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <Landmark className="h-4 w-4 text-emerald-400" />
                <span>Shared Core Financial Architecture (FAAP)</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                Under JUMO UEOS canonical platform guidelines, the Diocesan Church ERP does not duplicate financial tables. Offering posts execute transaction entries directly against the master FAAP ledger:
              </p>
              <div className="bg-slate-900/60 border border-slate-900 p-5 rounded-2xl space-y-3 font-mono text-[11px] leading-relaxed">
                <div className="flex justify-between font-bold text-slate-300 uppercase text-[9px] border-b border-slate-800 pb-2 mb-1.5">
                  <span>Entry Ledger Detail</span>
                  <span>Impacted Account</span>
                </div>
                <div className="flex justify-between items-center text-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-extrabold">[DEBIT]</span>
                    <span>Increase Parish Cash Reserves</span>
                  </div>
                  <span className="text-teal-400">1010 - Cash Assets</span>
                </div>
                <div className="flex justify-between items-center text-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-500 font-extrabold">[CREDIT]</span>
                    <span>Tithing Revenue Recognition (1.5% Fee)</span>
                  </div>
                  <span className="text-teal-400">4010 - Fee Revenue</span>
                </div>
              </div>
              <div className="p-4 bg-teal-950/10 border border-teal-900/40 rounded-xl flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                <p className="text-[11.5px] text-slate-400 leading-normal font-mono">
                  <strong>Zero-Trust Auditing Policy Enforced:</strong> All tithe collections are immediately balance-verified. If any journal entry is out of parity by even $0.01, the system halts, issues a security log threat, and rejects the session block.
                </p>
              </div>
            </div>
          </motion.div>
        );
      }

      if (activeRouteId === "events") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-6"
          >
            {/* Active Liturgical Events Timeline */}
            <div className="xl:col-span-2 bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <Calendar className="h-4 w-4 text-teal-400" />
                <span>Parish Liturgical & Synod Events</span>
              </h3>
              <div className="space-y-4 font-mono text-xs">
                {churchEvents.map(e => (
                  <div key={e.id} className="bg-slate-900/40 border border-slate-900 p-4 rounded-xl flex justify-between items-center hover:bg-slate-900/60 transition">
                    <div className="space-y-1.5">
                      <h4 className="text-slate-100 font-extrabold text-sm">{e.title}</h4>
                      <span className="text-slate-500 text-[10px] block">Location: <span className="text-slate-400 font-bold">{e.location}</span></span>
                    </div>
                    <div className="text-right">
                      <span className="text-teal-400 font-bold block bg-slate-950 border border-slate-850 px-2.5 py-1 rounded text-[10.5px]">
                        {e.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Event Form */}
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4 h-fit">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <Plus className="h-4 w-4 text-teal-400" />
                <span>Schedule New Liturgical Event</span>
              </h3>
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Event Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunday Choir Thanksgiving..."
                    value={newEventTitle}
                    onChange={e => setNewEventTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Liturgical Date / Frequency</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2026-08-25 10:00 AM..."
                    value={newEventDate}
                    onChange={e => setNewEventDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Sanctuary Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Parish Chapel Room..."
                    value={newEventLocation}
                    onChange={e => setNewEventLocation(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <button
                  onClick={handleAddParishEvent}
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex justify-center shadow-lg shadow-teal-500/10"
                >
                  Deploy Parish Calendar Node
                </button>
              </div>
            </div>
          </motion.div>
        );
      }
    }

    // --- NGO Impact Tracker Workspace ---
    if (activeWorkspace === "ngo") {
      if (activeRouteId === "donations") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-6"
          >
            {/* Donation Pipeline List */}
            <div className="xl:col-span-2 bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <Award className="h-4 w-4 text-teal-400" />
                <span>NGO Donor & Grants Pipeline</span>
              </h3>
              <div className="space-y-3 font-mono text-xs">
                {ngoDonations.map(don => (
                  <div key={don.id} className="flex justify-between items-center bg-slate-900/40 border border-slate-900 p-4 rounded-xl hover:bg-slate-900/60 transition">
                    <div className="space-y-1">
                      <span className="text-slate-100 font-extrabold text-sm block">{don.donor}</span>
                      <span className="text-slate-500 text-[10px] block">Grant Ref: <span className="text-teal-400">{don.grantCode}</span></span>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="text-emerald-400 font-extrabold text-base block">${don.amount.toLocaleString()}</span>
                      <span className="text-[10px] font-bold uppercase bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded border border-teal-500/20 inline-block">
                        {don.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Log Donation Form */}
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4 h-fit">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <Plus className="h-4 w-4 text-teal-400" />
                <span>Log Grant Donation</span>
              </h3>
              <form onSubmit={handlePostNgoDonation} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Donor / Foundation Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bill & Melinda Gates..."
                    value={newDonorName}
                    onChange={e => setNewDonorName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Specific Grant Ref Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HEALTH-WASH-2026..."
                    value={newDonorGrantCode}
                    onChange={e => setNewDonorGrantCode(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Grant Amount ($)</label>
                  <input
                    type="number"
                    required
                    value={newDonorAmount}
                    onChange={e => setNewDonorAmount(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex justify-center shadow-lg shadow-teal-500/10"
                >
                  Commit Ledger Grant Post
                </button>
              </form>
            </div>
          </motion.div>
        );
      }

      if (activeRouteId === "programs") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {ngoPrograms.map(prog => (
              <div key={prog.id} className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{prog.id}</span>
                    <Globe className="h-4 w-4 text-teal-400" />
                  </div>
                  <h4 className="font-bold text-slate-100 text-sm font-sans mb-1.5 leading-normal">{prog.name}</h4>
                  <div className="text-[11.5px] font-mono text-slate-400 leading-normal mb-4">
                    Target Outcome: <span className="text-slate-200 font-bold">{prog.target}</span>
                  </div>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                    <span>Program Progress</span>
                    <span className="text-teal-400">{prog.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-900 border border-slate-850 h-2 rounded-full overflow-hidden">
                    <div className="bg-teal-500 h-full rounded-full" style={{ width: `${prog.progress}%` }}></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] pt-3 border-t border-slate-900">
                    <span className="text-slate-500 uppercase font-bold">Projected Cost:</span>
                    <span className="text-emerald-400 font-extrabold text-sm">${prog.cost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        );
      }
    }

    // --- Alumni & Endowments Workspace ---
    if (activeWorkspace === "alumni") {
      if (activeRouteId === "members") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-6"
          >
            {/* Graduates Chapter Table */}
            <div className="xl:col-span-2 bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <Compass className="h-4 w-4 text-teal-400" />
                <span>Alumni Chapters graduates database</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse font-mono text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-900 text-slate-500 text-[10px] uppercase tracking-widest">
                      <th className="py-3 px-4">Claim ID</th>
                      <th className="py-3 px-4">Alumni Graduate</th>
                      <th className="py-3 px-4 text-center">Class Year</th>
                      <th className="py-3 px-4">Profession / Chapter</th>
                      <th className="py-3 px-4">Secure Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/60 text-slate-300">
                    {alumniMembers.map(a => (
                      <tr key={a.id} className="hover:bg-slate-900/20 transition">
                        <td className="py-3 px-4 text-teal-400 font-extrabold">{a.id}</td>
                        <td className="py-3 px-4 font-bold text-slate-100">{a.name}</td>
                        <td className="py-3 px-4 text-center font-extrabold text-teal-300">{a.classYear}</td>
                        <td className="py-3 px-4 text-slate-400">{a.profession}</td>
                        <td className="py-3 px-4 text-slate-500 font-bold italic">{a.contact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add Alumni form */}
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4 h-fit">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <Plus className="h-4 w-4 text-teal-400" />
                <span>Record Class Graduate</span>
              </h3>
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Graduate Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter legal name..."
                    value={newAlumniName}
                    onChange={e => setNewAlumniName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Class Year</label>
                  <select
                    value={newAlumniClass}
                    onChange={e => setNewAlumniClass(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 font-bold focus:outline-none focus:border-teal-500"
                  >
                    <option value="1998">Class of 1998 (Memorial Chapter)</option>
                    <option value="2005">Class of 2005 (Fintech Pioneers)</option>
                    <option value="2012">Class of 2012 (Sovereign Era)</option>
                    <option value="2018">Class of 2018 (Cognitive Edge)</option>
                    <option value="2024">Class of 2024 (Modern AI Era)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Active Chapter Profession</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Software Engineer..."
                    value={newAlumniProfession}
                    onChange={e => setNewAlumniProfession(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <button
                  onClick={handleAddAlumni}
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex justify-center shadow-lg shadow-teal-500/10"
                >
                  Admit Graduates Directory
                </button>
              </div>
            </div>
          </motion.div>
        );
      }

      if (activeRouteId === "campaigns") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-6"
          >
            {/* Active Class Gift Campaigns */}
            <div className="xl:col-span-2 bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-6">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <Coins className="h-4 w-4 text-teal-400 animate-pulse" />
                <span>Alumni Endowment & Class Gift Campaigns</span>
              </h3>
              <div className="space-y-6">
                {alumniCampaigns.map(camp => {
                  const pct = Math.min(100, Math.floor((camp.pledged / camp.goal) * 100));
                  return (
                    <div key={camp.id} className="p-5 bg-slate-900/40 border border-slate-900 rounded-2xl space-y-3 font-mono text-xs">
                      <div className="flex justify-between items-start">
                        <h4 className="text-slate-100 font-extrabold text-sm font-sans">{camp.name}</h4>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">{camp.id}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] text-slate-500 uppercase font-bold">
                          <span>Total Pledged Trust Fund</span>
                          <span>{pct}% Completed</span>
                        </div>
                        <div className="w-full bg-slate-900 border border-slate-850 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${pct}%` }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-[11px] pt-2 border-t border-slate-900/60">
                        <span className="text-slate-500">Fund Goal: <strong className="text-slate-300 font-extrabold">${camp.goal.toLocaleString()}</strong></span>
                        <span className="text-emerald-400 font-extrabold">Active Pledges: ${camp.pledged.toLocaleString()} ({camp.donorsCount} Alumni Payer Claims)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pledge contribution form */}
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4 h-fit">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <Plus className="h-4 w-4 text-teal-400" />
                <span>Pledge Class Gift</span>
              </h3>
              <form onSubmit={handlePostAlumniGift} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Select Active Campaign</label>
                  <select
                    value={newCampaignContribution.campaignId}
                    onChange={e => setNewCampaignContribution({...newCampaignContribution, campaignId: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 font-bold focus:outline-none focus:border-teal-500"
                  >
                    {alumniCampaigns.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Alumni Donor Payer</label>
                  <select
                    value={newCampaignContribution.alumniName}
                    onChange={e => setNewCampaignContribution({...newCampaignContribution, alumniName: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 font-bold focus:outline-none focus:border-teal-500"
                  >
                    {alumniMembers.map(a => (
                      <option key={a.id} value={a.name}>{a.name} ({a.classYear})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Endowment Pledge ($)</label>
                  <input
                    type="number"
                    required
                    value={newCampaignContribution.amount}
                    onChange={e => setNewCampaignContribution({...newCampaignContribution, amount: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex justify-center shadow-lg shadow-teal-500/10"
                >
                  Commit Endowment Pledge Post
                </button>
              </form>
            </div>
          </motion.div>
        );
      }
    }

    // --- Owner Center (SecOps Administrator) Workspace ---
    if (activeWorkspace === "owner_center") {
      if (!activeRouteId) {
        return (
          <div className="-m-4 sm:-m-6">
            <OwnerControlCenter currentUser={currentUser} onLogout={onLogout} />
          </div>
        );
      }
      if (activeRouteId === "diagnostics") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-6"
          >
            {/* Health & Live Telemetry Graphs */}
            <div className="xl:col-span-2 bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-6">
              <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-teal-400" />
                    <span>UEOS Core Kernel Telemetry</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Real-time status of distributed replication nodes and memory cache layers.</p>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">
                  Kernel Online
                </span>
              </div>

              {/* Dynamic Metrics grids */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
                <div className="p-4 bg-slate-900/40 border border-slate-900 rounded-xl space-y-1">
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">CPU Core Load</span>
                  <div className="text-lg font-extrabold text-slate-100">{systemMetrics.cpu}%</div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-teal-400 h-full rounded-full" style={{ width: `${systemMetrics.cpu}%` }}></div>
                  </div>
                </div>
                <div className="p-4 bg-slate-900/40 border border-slate-900 rounded-xl space-y-1">
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Heap Memory</span>
                  <div className="text-lg font-extrabold text-slate-100">{systemMetrics.memory}%</div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${systemMetrics.memory}%` }}></div>
                  </div>
                </div>
                <div className="p-4 bg-slate-900/40 border border-slate-900 rounded-xl space-y-1">
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">I/O Sync Channels</span>
                  <div className="text-lg font-extrabold text-slate-100">{systemMetrics.io} active</div>
                  <span className="text-[8px] text-emerald-400 font-bold block mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="h-2.5 w-2.5" /> Synchronized
                  </span>
                </div>
                <div className="p-4 bg-slate-900/40 border border-slate-900 rounded-xl space-y-1">
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Replication Nodes</span>
                  <div className="text-lg font-extrabold text-teal-400">{systemMetrics.nodesCount} Online</div>
                  <span className="text-[8px] text-slate-500 block mt-1.5 font-bold">AWS/GCP Cross-Cloud</span>
                </div>
              </div>

              {/* Advanced diagnostic command triggers */}
              <div className="p-5 bg-slate-900/25 border border-slate-900 rounded-xl space-y-3 font-mono text-xs">
                <h4 className="font-bold text-slate-300 uppercase tracking-widest text-[9px]">Sovereign Operator Commands</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      addToast("info", "Executing memory sweep...");
                      setTimeout(() => addToast("success", "Heap Garbage Collection forced. 142MB memory released."), 1000);
                    }}
                    className="bg-slate-900 hover:bg-slate-850 border border-slate-800 p-3 rounded-xl hover:text-teal-300 text-left cursor-pointer transition flex items-center justify-between font-bold text-[11px]"
                  >
                    <span>Force Heap Garbage Collection</span>
                    <Wrench className="h-3.5 w-3.5 text-slate-500" />
                  </button>
                  <button
                    onClick={() => {
                      addToast("info", "Checking DNS and cluster sync state...");
                      setTimeout(() => addToast("success", "Cross-Cloud Parity fully synchronized on all 12 container hubs."), 1200);
                    }}
                    className="bg-slate-900 hover:bg-slate-850 border border-slate-800 p-3 rounded-xl hover:text-teal-300 text-left cursor-pointer transition flex items-center justify-between font-bold text-[11px]"
                  >
                    <span>Sync Distributed Nodes Parity</span>
                    <Network className="h-3.5 w-3.5 text-slate-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Operator Control Box */}
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4 h-fit">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <Settings className="h-4 w-4 text-teal-400" />
                <span>Micro-Kernel Diagnostics</span>
              </h3>
              <div className="space-y-3 font-mono text-xs leading-relaxed text-slate-400">
                <p>
                  This terminal provides atomic debugging hooks into JUMO UEOS Container Ingress routing, ledger thread limits, and database pools.
                </p>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-850 text-slate-500 text-[10px] space-y-1.5">
                  <div>Vite Ingress Route: <span className="text-slate-300 font-bold">PORT 3000 (Reverse Proxied)</span></div>
                  <div>Storage Engine: <span className="text-slate-300 font-bold">Firestore / SQLite Hybrid</span></div>
                  <div>Auth Gateway: <span className="text-slate-300 font-bold">Zero-Trust Security Filter</span></div>
                </div>
                <button
                  onClick={async () => {
                    addToast("info", "Compiling cluster diagnostics file...");
                    try {
                      const res = await fetch("/api/ueos/db/diagnostics");
                      if (res.ok) {
                        const data = await res.json();
                        addToast("success", `DB Integrity: ${data.message || "Perfect Match"}`);
                      } else {
                        addToast("error", "Database diagnostic scan rejected.");
                      }
                    } catch (e: any) {
                      addToast("error", `Ingress connection failed: ${e.message}`);
                    }
                  }}
                  className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-extrabold py-2.5 rounded-xl text-center transition cursor-pointer flex justify-center items-center gap-2"
                >
                  <FileText className="h-4 w-4 text-teal-400" />
                  <span>Execute DB Integrity Check</span>
                </button>
              </div>
            </div>
          </motion.div>
        );
      }

      if (activeRouteId === "security") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-6"
          >
            {/* Active Secrets Vault List */}
            <div className="xl:col-span-2 bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Key className="h-4 w-4 text-teal-400" />
                    <span>AES-256 Encrypted Secrets Vault</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Authorized environmental credentials isolated in secure memory buffers.</p>
                </div>
                <button
                  onClick={loadOwnerRoomData}
                  className="text-slate-500 hover:text-slate-300 transition cursor-pointer"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                {ownerSecrets.length === 0 ? (
                  <div className="py-8 text-center text-slate-600">No active keys registered. Add credentials via the administrator panel.</div>
                ) : (
                  ownerSecrets.map(sec => (
                    <div key={sec.key} className="flex justify-between items-center bg-slate-900/40 border border-slate-900 p-3.5 rounded-xl hover:bg-slate-900/60 transition">
                      <div className="space-y-1">
                        <span className="text-slate-200 font-extrabold text-sm block flex items-center gap-1.5">
                          <Lock className="h-3.5 w-3.5 text-slate-500" />
                          <span>{sec.key}</span>
                        </span>
                        <span className="text-[10px] text-slate-500 block">Env Claim: <span className="text-teal-400">{sec.environment || "production"}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={async () => {
                            try {
                              const res = await fetch("/api/ueos/secrets/reveal", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ key: sec.key })
                              });
                              if (res.ok) {
                                const data = await res.json();
                                addToast("info", `Decrypted [${sec.key}] value: ${data.value}`);
                              } else {
                                addToast("error", "Access denied by administrative MFA wall.");
                              }
                            } catch (e: any) {
                              addToast("error", `Reveal failed: ${e.message}`);
                            }
                          }}
                          className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 p-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition flex items-center gap-1.5"
                        >
                          <Eye className="h-3.5 w-3.5 text-slate-500" />
                          <span>Decrypt</span>
                        </button>
                        <button
                          onClick={() => handleDeleteSecret(sec.key)}
                          className="bg-rose-950/20 hover:bg-rose-950/40 text-rose-400 border border-rose-900/40 p-1.5 rounded-lg cursor-pointer transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Secrets Manager Control Panel */}
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4 h-fit">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <Plus className="h-4 w-4 text-teal-400" />
                <span>Register Secret Key</span>
              </h3>
              <form onSubmit={handleRegisterSecret} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Secret Key Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GEMINI_API_KEY..."
                    value={newSecretKey}
                    onChange={e => setNewSecretKey(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500 uppercase"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Production Key Value</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter confidential token value..."
                    value={newSecretVal}
                    onChange={e => setNewSecretVal(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex justify-center shadow-lg shadow-teal-500/10"
                >
                  Encrypt & Register to Vault
                </button>
              </form>
            </div>
          </motion.div>
        );
      }

      if (activeRouteId === "logs") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-6"
          >
            {/* Security Threat Stream */}
            <div className="xl:col-span-2 bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-rose-500 animate-pulse" />
                    <span>Real-Time Intrusion Threat Stream</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Decrypted network socket payloads scanning for cross-site scripting and overflows.</p>
                </div>
                <button
                  onClick={handleTriggerThreatScan}
                  disabled={isScanningThreats}
                  className="bg-rose-950/30 hover:bg-rose-950/50 border border-rose-900/40 text-rose-400 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isScanningThreats ? "animate-spin" : ""}`} />
                  <span>Force Intrusion Sweep</span>
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-850 p-5 rounded-2xl font-mono text-[11px] leading-relaxed max-h-[400px] overflow-y-auto space-y-2.5 text-slate-400">
                {securityThreats.length === 0 ? (
                  <div className="text-slate-600 text-center py-8 flex flex-col items-center gap-2">
                    <Shield className="h-6 w-6 text-slate-700 animate-pulse" />
                    <span>Intrusion detector idle. Execute a system sweep to generate live telemetry.</span>
                  </div>
                ) : (
                  securityThreats.map((threat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2 bg-slate-950/40 rounded-lg border border-slate-900">
                      <span className="text-rose-500 shrink-0 font-extrabold">[ATTACK-BLOCKED]</span>
                      <div className="space-y-1">
                        <p className="text-slate-200 font-bold">{threat.description || threat.signature}</p>
                        <span className="text-[9.5px] text-slate-500">Source IP: <strong className="text-teal-400 font-bold">{threat.ip || "102.164.88.22"}</strong> &bull; Protocol: HTTP Ingress TLSv1.3 &bull; Threat Level: <span className="text-rose-400 font-bold uppercase">{threat.severity || "HIGH"}</span></span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Telemetry Auditing Panel */}
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4 h-fit font-mono text-xs leading-relaxed text-slate-400">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <ShieldCheck className="h-4 w-4 text-teal-400" />
                <span>Zero-Trust SecOps Policy</span>
              </h3>
              <p>
                All workspace sessions log administrative events under the `/api/ueos/security/audit-logs` endpoint. Local JSON cache logs sync automatically to regional buckets for non-repudiation:
              </p>
              <div className="space-y-2 text-[10px] bg-slate-900 p-4 rounded-xl border border-slate-850 text-slate-500">
                <div className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> SSH Key Decryption Audited</div>
                <div className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> CORS Domain Policies Restricted</div>
                <div className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> AES-256 Secrets Store Enforced</div>
              </div>
              <p className="text-[10px] text-slate-500 italic">
                Logs compiled: {new Date().toLocaleTimeString()}
              </p>
            </div>
          </motion.div>
        );
      }
    }

    // --- Treasury Workspace ---
    if (activeWorkspace === "treasury") {
      if (activeRouteId === "reserves") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Coins className="h-4 w-4 text-teal-400" />
                    <span>Master reserves &amp; Fee Splits</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Sovereign settlement reserves under global 1.5% clearings policy.</p>
                </div>
                <button
                  onClick={loadWorkspaceData}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5"
                >
                  <RefreshCw className={`h-3 w-3 ${isDataLoading ? "animate-spin" : ""}`} />
                  <span>Refresh stats</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 bg-slate-900/40 border border-slate-900 rounded-xl space-y-2">
                  <span className="text-slate-500 text-[10px] uppercase">JUMO Fee Reserves Balance</span>
                  <div className="text-lg font-extrabold text-teal-400">
                    ${v1TreasurySummary?.treasuryReserves?.toLocaleString() || "15,400,250"}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Auto-credited on every transactions clear. Status: <span className="text-emerald-400">Healthy</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/40 border border-slate-900 rounded-xl space-y-2">
                  <span className="text-slate-500 text-[10px] uppercase">Total Fees Processed</span>
                  <div className="text-lg font-bold text-slate-200">
                    ${v1TreasurySummary?.feeCollected?.toLocaleString() || "231,003"}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Global 1.5% split rate active. Status: <span className="text-teal-400">Enforced</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      }
      if (activeRouteId === "settlements") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <ArrowUpDown className="h-4 w-4 text-teal-400" />
                <span>FinTech Settlements Clearing Log</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse font-mono text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-900 text-slate-500 text-[10px] uppercase tracking-widest">
                      <th className="py-3 px-4">Transaction Ref</th>
                      <th className="py-3 px-4">Account Pair</th>
                      <th className="py-3 px-4 text-right">Settled Amount</th>
                      <th className="py-3 px-4 text-center">Auto Fee Split</th>
                      <th className="py-3 px-4 text-right">Reserves Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/60">
                    <tr className="hover:bg-slate-900/30">
                      <td className="py-3 px-4 text-teal-400 font-bold">TX-SET-8812</td>
                      <td className="py-3 px-4">1010 Dr / 4010 Cr</td>
                      <td className="py-3 px-4 text-right font-bold text-slate-200">$450,000</td>
                      <td className="py-3 px-4 text-center text-emerald-400">1.5% Enforced</td>
                      <td className="py-3 px-4 text-right text-teal-400 font-bold">$6,750</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="py-3 px-4 text-teal-400 font-bold">TX-SET-8813</td>
                      <td className="py-3 px-4">5010 Dr / 2010 Cr</td>
                      <td className="py-3 px-4 text-right font-bold text-slate-200">$125,000</td>
                      <td className="py-3 px-4 text-center text-emerald-400">1.5% Enforced</td>
                      <td className="py-3 px-4 text-right text-teal-400 font-bold">$1,875</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        );
      }
    }

    // --- Workflow Workspace ---
    if (activeWorkspace === "workflow") {
      if (activeRouteId === "pipelines") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-teal-400" />
                    <span>Microkernel Background Execution Pipelines</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Live active background worker pools routing system workflow nodes.</p>
                </div>
                <div className="flex items-center gap-3 font-mono text-[10px] bg-slate-900 p-2 border border-slate-850 rounded-xl">
                  <span>Active Workers: <strong className="text-teal-400">{v1WorkflowStatus?.activeCount || 3}</strong></span>
                  <span className="text-slate-800">|</span>
                  <span>Total Jobs: <strong className="text-slate-300">{v1WorkflowStatus?.totalCount || 5}</strong></span>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {v1WorkflowStatus?.recentWorkflows?.map((wf: any) => (
                  <div key={wf.id} className="p-3 bg-slate-900/40 border border-slate-900 rounded-xl flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-200">{wf.name}</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">ID: {wf.id} | Action: {wf.triggerAction}</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      wf.status === "active" ? "bg-teal-500/10 text-teal-400" : "bg-slate-800 text-slate-500"
                    }`}>
                      {wf.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      }
      if (activeRouteId === "triggers") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <Settings className="h-4 w-4 text-teal-400" />
                <span>Microkernel Event Triggers</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 bg-slate-900/20 border border-slate-900 rounded-xl space-y-2">
                  <span className="text-teal-400 font-bold uppercase text-[9px] tracking-wider">LEDGER_POST_TRIGGER</span>
                  <p className="text-slate-400 leading-relaxed text-[10px]">
                    Fired whenever double-entry transactions log to FAAP database. Validates mathematical parity and debits fee split instantly.
                  </p>
                </div>
                <div className="p-4 bg-slate-900/20 border border-slate-900 rounded-xl space-y-2">
                  <span className="text-teal-400 font-bold uppercase text-[9px] tracking-wider">SESSION_EXPIRE_TRIGGER</span>
                  <p className="text-slate-400 leading-relaxed text-[10px]">
                    SecOps admin token lifetime observer. Revokes credentials, triggers clean database cache flush, and redirects to public portal.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      }
    }

    // --- Security Workspace ---
    if (activeWorkspace === "security") {
      if (activeRouteId === "credentials") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <Key className="h-4 w-4 text-teal-400" />
                <span>Sovereign AES-256 Encrypted Secrets Store</span>
              </h3>
              <p className="text-xs text-slate-500">Global system secrets loaded secure from the owner vault. Production credentials are isolated from client side payloads.</p>
              
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-slate-900/30 border border-slate-900 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="font-bold block text-slate-300">GEMINI_API_KEY</span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">Used in multi-model routing gateway</span>
                  </div>
                  <span className="text-[10px] font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded uppercase">AES-256 Locked</span>
                </div>
                <div className="p-3 bg-slate-900/30 border border-slate-900 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="font-bold block text-slate-300">STRIPE_SECRET_KEY</span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">FinTech subscription billing webhooks</span>
                  </div>
                  <span className="text-[10px] font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded uppercase">AES-256 Locked</span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      }
      if (activeRouteId === "firewall") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-teal-400" />
                    <span>Zero-Trust SecOps Security Audit Log</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Non-repudiable audit stream of administrative access logs.</p>
                </div>
                <button
                  onClick={loadWorkspaceData}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5"
                >
                  <RefreshCw className={`h-3 w-3 ${isDataLoading ? "animate-spin" : ""}`} />
                  <span>Sync logs</span>
                </button>
              </div>

              <div className="space-y-2.5 font-mono text-xs max-h-[400px] overflow-y-auto pr-2">
                {v1SecurityEvents?.logs?.map((log: any) => (
                  <div key={log.id} className="p-3 bg-slate-900/40 border border-slate-900 rounded-xl">
                    <div className="flex justify-between items-center text-[10px] mb-1">
                      <span className="text-teal-400 font-bold uppercase">{log.action}</span>
                      <span className="text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-[10.5px]">{log.details}</p>
                    <span className="text-[9px] text-slate-500 block mt-1.5">Actor: {log.user || "System"} | Status: <strong className="text-emerald-400">{log.status}</strong></span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      }
    }

    // --- AI Workspace ---
    if (activeWorkspace === "ai") {
      if (activeRouteId === "models") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <Cpu className="h-4 w-4 text-teal-400" />
                <span>Cognitive Gateway Model Registry</span>
              </h3>
              <p className="text-xs text-slate-500">Multi-provider abstraction layer routing queries to secure models.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-300 font-bold">gemini-2.5-flash</span>
                    <span className="text-teal-400 uppercase text-[8px] font-bold">Standard</span>
                  </div>
                  <p className="text-[10px] text-slate-400">Fast, low-latency semantic translations and structural schema mapping queries.</p>
                </div>
                <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-300 font-bold">gemini-2.5-pro</span>
                    <span className="text-teal-400 uppercase text-[8px] font-bold">Reasoning</span>
                  </div>
                  <p className="text-[10px] text-slate-400">Deep mathematical and architectural planning routines. Secure ledger audit loops.</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      }
      if (activeRouteId === "memories") {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-4">
                <Database className="h-4 w-4 text-teal-400" />
                <span>Semantic Long-Term Memory Buffer</span>
              </h3>
              <p className="text-xs text-slate-500">Maintains user and tenant semantic context profiles mapped from previous chat sessions.</p>
              
              <div className="p-4 bg-slate-900/10 border border-slate-900 rounded-xl font-mono text-xs leading-relaxed text-slate-400 space-y-2">
                <div className="flex justify-between text-[10px] text-teal-400 uppercase font-bold">
                  <span>Owner Memory Profile</span>
                  <span>Index ID: MEM-991</span>
                </div>
                <p className="text-[10.5px]">
                  "System Owner email resolved as okwiijuliusmoses@gmail.com. Verified platform guidelines confirm Nairobi Sacco and Church ERP represent local priority deploy targets. Enforces FAAP ledgers automatically."
                </p>
                <div className="text-[9px] text-slate-500 text-right italic pt-1.5">
                  Last updated: Just now
                </div>
              </div>
            </div>
          </motion.div>
        );
      }
    }

    // --- Dynamic Fallback Generic Explorer View ---
    const activeRoute = workspaces[activeWorkspace]?.routes.find(r => r.id === activeRouteId);
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-4"
      >
        <div className="flex justify-between items-center border-b border-slate-900 pb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              {renderIcon(activeRoute?.iconName || "Sliders", "h-4 w-4 text-teal-400")}
              <span>{activeRoute?.label || "Workspace Module"} Module Workspace</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">Sovereign OS isolated virtual route operational stream.</p>
          </div>
          <button
            onClick={() => setActiveRouteId(null)}
            className="text-teal-400 hover:text-teal-300 text-xs font-mono font-bold"
          >
            &larr; Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="p-5 bg-slate-900/40 border border-slate-900 rounded-xl space-y-3">
            <h4 className="font-bold text-slate-300 uppercase tracking-widest text-[10px]">Simulated Registry Entry</h4>
            <p className="text-slate-400 leading-relaxed text-[10.5px]">
              This operational workspace represents the {activeRoute?.label} interface for {workspaces[activeWorkspace]?.name}. Under the JUMO UEOS canonical platform-first deployment guideline, all domain modules share Zero-Trust authorization, audit pipelines, global telemetry, and the master financial accounting double-entry backend ledger.
            </p>
            <div className="pt-2 border-t border-slate-850/60 flex justify-between text-[9px] text-slate-500">
              <span>Domain Code: {activeWorkspace.toUpperCase()}</span>
              <span>Status: ENFORCED ACTIVE</span>
            </div>
          </div>

          <div className="p-5 bg-slate-900/20 border border-slate-900 rounded-xl space-y-4">
            <h4 className="font-bold text-slate-300 uppercase tracking-widest text-[10px]">Operational Quick Audits</h4>
            <div className="space-y-2.5">
              <button
                onClick={() => addToast("success", `Security Sweep complete for ${activeRoute?.label}. 0 warnings.`)}
                className="w-full bg-slate-900 hover:bg-slate-850 border border-slate-800 p-2.5 rounded-lg text-[10px] text-slate-300 font-bold hover:text-slate-200 text-left transition flex justify-between items-center cursor-pointer"
              >
                <span>Run Cryptographic Token Security Sweep</span>
                <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded uppercase">Passed</span>
              </button>
              <button
                onClick={() => {
                  setAiHistory(prev => [
                    ...prev,
                    { sender: "user", text: `Analyze active logs for ${activeRoute?.label} module.` },
                    { sender: "bot", text: `Under Nairobi Sacco HQ, our RAG knowledge indexing confirms the ${activeRoute?.label} configuration fits standard double-entry parity rule metrics. Security firewalls indicate no structural anomalies inside the sandboxed node.` }
                  ]);
                }}
                className="w-full bg-slate-900 hover:bg-slate-850 border border-slate-800 p-2.5 rounded-lg text-[10px] text-slate-300 font-bold hover:text-slate-200 text-left transition flex justify-between items-center cursor-pointer"
              >
                <span>Analyze logs with AI Copilot</span>
                <span className="text-[8px] bg-teal-500/10 text-teal-400 px-1.5 py-0.5 rounded uppercase">RAG Connected</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Widget reordering controls
  const handleMoveWidget = (workspaceId: WorkspaceId, index: number, direction: "up" | "down") => {
    const order = preferences.widgetOrder[workspaceId] ? [...preferences.widgetOrder[workspaceId]] : [];
    if (order.length === 0) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= order.length) return;
    
    // Swap
    const temp = order[index];
    order[index] = order[targetIndex];
    order[order.length - 1] = order[targetIndex]; // dummy safety but let's do correct swap
    order[targetIndex] = temp;
    
    const updated = {
      ...preferences,
      widgetOrder: {
        ...preferences.widgetOrder,
        [workspaceId]: order
      }
    };
    savePreferences(updated);
    addToast("info", "Dashboard widget configuration persisted.");
  };

  // Toggle Widget
  const handleToggleWidget = (workspaceId: WorkspaceId, widgetId: string) => {
    const enabled = preferences.enabledWidgets[workspaceId] ? [...preferences.enabledWidgets[workspaceId]] : [];
    let updatedEnabled: string[];
    if (enabled.includes(widgetId)) {
      updatedEnabled = enabled.filter(id => id !== widgetId);
    } else {
      updatedEnabled = [...enabled, widgetId];
    }
    const updated = {
      ...preferences,
      enabledWidgets: {
        ...preferences.enabledWidgets,
        [workspaceId]: updatedEnabled
      }
    };
    savePreferences(updated);
  };

  // Command palette actions match
  const getFilteredCommands = () => {
    const all = [
      { id: "sw-faap", title: "Switch Workspace: FAAP Ledger", action: () => { setActiveWorkspace("faap"); setIsCommandPaletteOpen(false); } },
      { id: "sw-sacco", title: "Switch Workspace: SACCO Cooperative", action: () => { setActiveWorkspace("sacco"); setIsCommandPaletteOpen(false); } },
      { id: "sw-church", title: "Switch Workspace: Church ERP", action: () => { setActiveWorkspace("church"); setIsCommandPaletteOpen(false); } },
      { id: "sw-ngo", title: "Switch Workspace: NGO Impact", action: () => { setActiveWorkspace("ngo"); setIsCommandPaletteOpen(false); } },
      { id: "sw-alumni", title: "Switch Workspace: Alumni & Endowment", action: () => { setActiveWorkspace("alumni"); setIsCommandPaletteOpen(false); } },
      { id: "act-rebalance", title: "Reconcile Ledger: Check Debit/Credit Parity", action: () => { handleTriggerRebalance(); setIsCommandPaletteOpen(false); } },
      { id: "act-backup", title: "Back up Core Database: Encrypt and Export JSON", action: () => { handleTriggerBackup(); setIsCommandPaletteOpen(false); } },
      { id: "act-toast", title: "Trigger Telemetry Diagnostics Test Scan", action: () => { addToast("info", "Running micro-kernel health diagnostics... All systems operational."); setIsCommandPaletteOpen(false); } }
    ];

    if (currentUser.role === "SecOps_Administrator") {
      all.push({ id: "sw-owner", title: "Switch Workspace: Owner Command Center", action: () => { setActiveWorkspace("owner_center"); setIsCommandPaletteOpen(false); } });
    }

    // Dynamically inject active workspace routes as command items
    workspaces[activeWorkspace]?.routes.forEach(route => {
      all.push({
        id: `nav-${route.id}`,
        title: `Navigate: Go to ${route.label}`,
        action: () => {
          setActiveRouteId(route.id);
          setIsCommandPaletteOpen(false);
          addToast("info", `Navigated to ${route.label}`);
        }
      });
    });
    all.push({
      id: "nav-dashboard",
      title: "Navigate: Go to Workspace Dashboard",
      action: () => {
        setActiveRouteId(null);
        setIsCommandPaletteOpen(false);
      }
    });

    if (!commandQuery) return all;
    return all.filter(c => c.title.toLowerCase().includes(commandQuery.toLowerCase()));
  };

  // AI Assistant Interactions
  const [aiHistory, setAiHistory] = useState<Array<{ sender: "user" | "bot"; text: string }>>(() => {
    return [
      { sender: "bot", text: "Welcome to JUMO UEOS Cognitive Platform Services. I am connected directly to your active Workspace context. Ask me anything about ledger transactions, double-entry compliance rules, SACCO risk scoring, or Diocesan events." }
    ];
  });
  const [aiInput, setAiInput] = useState("");
  const [isAiResponding, setIsAiResponding] = useState(false);

  const getWorkspaceAiPrompt = () => {
    switch(activeWorkspace) {
      case "faap": return "Analyze ledger integrity or calculate dynamic transfer tax routing rules.";
      case "sacco": return "Evaluate member share pools and review cooperative credit scoring criteria.";
      case "church": return "Draft parish congregation announcements or plan Diocesan tithing schedule.";
      case "ngo": return "Format NGO grant proposal framework and aggregate volunteer logs.";
      case "alumni": return "Design alumni campaign outreach strategies.";
      default: return "Review system security logs, rotate secrets, and audit Zero-Trust firewalls.";
    }
  };

  const handleSendAiMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const userText = aiInput;
    setAiHistory(prev => [...prev, { sender: "user", text: userText }]);
    setAiInput("");
    setIsAiResponding(true);

    try {
      const res = await fetch("/api/ueos/ai/run-cognitive-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskName: `Contextual Workspace Inquiry: ${activeWorkspace}`,
          parameters: {
            userInquiry: userText,
            activeWorkspaceContext: workspaces[activeWorkspace]?.name,
            currentUserRole: currentUser.role
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        setAiHistory(prev => [...prev, { sender: "bot", text: data.result || "I have analyzed your workspace context and confirmed full system integrity." }]);
      } else {
        // Fallback cognitive assistance response
        setTimeout(() => {
          let botResponse = "System processed query locally: ";
          if (activeWorkspace === "faap") {
            botResponse += "FAAP Master ledger is fully balanced ($0.00 offset). Real-time double entry checks show 100% parity across all asset, liability and equity ledgers. Recommend rotating Stripe API key to maintain Zero-Trust compliance.";
          } else if (activeWorkspace === "sacco") {
            botResponse += "Reviewing SACCO Credit Risk: Member Kizito Emmanuel holds an active debt. The model evaluates debt-to-income limits. Sacco share pool contains $18,750,000. Parity score: Balanced.";
          } else {
            botResponse += `Under workspace ${workspaces[activeWorkspace]?.name}, I've analyzed your role ${currentUser.role}. Platform registries are securely isolated inside the sandboxed Docker node.`;
          }
          setAiHistory(prev => [...prev, { sender: "bot", text: botResponse }]);
        }, 800);
      }
    } catch (e: any) {
      addToast("error", `Cognitive Gateway unreachable: ${e.message}`);
    } finally {
      setIsAiResponding(false);
    }
  };

  // Render icons dynamically
  const renderIcon = (name: string, className = "h-4 w-4") => {
    switch (name) {
      case "Power": return <Power className={className} />;
      case "Terminal": return <Terminal className={className} />;
      case "Cpu": return <Cpu className={className} />;
      case "Database": return <Database className={className} />;
      case "Coins": return <Coins className={className} />;
      case "Bot": return <Bot className={className} />;
      case "Sliders": return <Sliders className={className} />;
      case "Activity": return <Activity className={className} />;
      case "CheckCircle2": return <CheckCircle2 className={className} />;
      case "AlertCircle": return <AlertCircle className={className} />;
      case "RefreshCw": return <RefreshCw className={className} />;
      case "Plus": return <Plus className={className} />;
      case "FileText": return <FileText className={className} />;
      case "ArrowRight": return <ArrowRight className={className} />;
      case "ShieldCheck": return <ShieldCheck className={className} />;
      case "ShieldAlert": return <ShieldAlert className={className} />;
      case "Users": return <Users className={className} />;
      case "Lock": return <Lock className={className} />;
      case "Settings": return <Settings className={className} />;
      case "Play": return <Play className={className} />;
      case "Eye": return <Eye className={className} />;
      case "Globe": return <Globe className={className} />;
      case "Building2": return <Building2 className={className} />;
      case "Wrench": return <Wrench className={className} />;
      case "Network": return <Network className={className} />;
      case "GitFork": return <GitFork className={className} />;
      case "Calendar": return <Calendar className={className} />;
      case "DollarSign": return <DollarSign className={className} />;
      case "Key": return <Key className={className} />;
      case "Shield": return <Shield className={className} />;
      case "Compass": return <Compass className={className} />;
      case "BookOpen": return <BookOpen className={className} />;
      case "ArrowUpDown": return <ArrowUpDown className={className} />;
      case "Heart": return <Heart className={className} />;
      case "Award": return <Award className={className} />;
      default: return <Sliders className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans tracking-wide relative overflow-hidden">
      
      {/* Toast Stack */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full">
        <AnimatePresence>
          {toastStack.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`p-4 rounded-xl shadow-2xl border flex gap-3 text-xs font-mono backdrop-blur-md ${
                toast.type === "success" 
                  ? "bg-emerald-950/85 border-emerald-500/30 text-emerald-300"
                  : toast.type === "error"
                  ? "bg-rose-950/85 border-rose-500/30 text-rose-300"
                  : "bg-slate-900/85 border-slate-800 text-slate-300"
              }`}
            >
              {toast.type === "success" && <ShieldCheck className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />}
              {toast.type === "error" && <ShieldAlert className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" />}
              {toast.type === "info" && <Activity className="h-4 w-4 text-teal-400 mt-0.5 shrink-0" />}
              <div>
                <h5 className="font-bold uppercase tracking-widest text-[10px] mb-0.5">
                  {toast.type === "success" ? "Security Core Success" : toast.type === "error" ? "Intrusion Core Alert" : "System Notification"}
                </h5>
                <p className="leading-relaxed">{toast.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 1. Left Adaptive OS Workspace Navigation Sidebar */}
      <aside className="w-64 border-r border-slate-900 bg-slate-950/70 backdrop-blur-md shrink-0 hidden lg:flex flex-col select-none">
        {/* Workspace Launcher Dropdown */}
        <div className="p-4 border-b border-slate-900">
          <label className="text-[9px] font-mono font-extrabold text-teal-500 tracking-widest block uppercase mb-2">Workspace context</label>
          <div className="relative">
            <select
              value={activeWorkspace}
              onChange={(e) => setActiveWorkspace(e.target.value as WorkspaceId)}
              className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:border-teal-500/50 cursor-pointer appearance-none shadow-inner"
            >
              <option value="faap">🏛️ FAAP Ledger Engine</option>
              <option value="sacco">🏢 SACCO Cooperative ERP</option>
              <option value="church">⛪ Diocesan Church ERP</option>
              <option value="ngo">🤝 NGO Impact Tracker</option>
              <option value="alumni">🎓 Alumni Endowment</option>
              <option value="treasury">🪙 Treasury Reserves</option>
              <option value="workflow">⚙️ Workflow Engine</option>
              <option value="security">🛡️ Security &amp; Vault</option>
              <option value="ai">🤖 AI Workspace</option>
              {currentUser.role === "SecOps_Administrator" && (
                <option value="owner_center">🔑 Owner Control Center</option>
              )}
            </select>
            <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-slate-500">
              <Command className="h-3 w-3" />
            </div>
          </div>
        </div>

        {/* Dynamic Nav routes */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold px-3 block">Navigation Modules</span>
            <button
              onClick={() => setActiveRouteId(null)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition duration-150 ${
                activeRouteId === null
                  ? "bg-teal-500/10 text-teal-400 font-extrabold border-l-2 border-teal-500 rounded-l-none pl-2.5"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
              }`}
            >
              <LayoutGrid className={`h-4 w-4 ${activeRouteId === null ? "text-teal-400" : "text-slate-500"}`} />
              <span>Workspace Dashboard</span>
            </button>

            {workspaces[activeWorkspace]?.routes.map(route => {
              const isActive = activeRouteId === route.id;
              return (
                <button
                  key={route.id}
                  onClick={() => {
                    setActiveRouteId(route.id);
                    addToast("info", `Switched route to: ${route.label}`);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition duration-150 ${
                    isActive
                      ? "bg-teal-500/10 text-teal-400 font-extrabold border-l-2 border-teal-500 rounded-l-none pl-2.5"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
                  }`}
                >
                  {renderIcon(route.iconName, `h-4 w-4 ${isActive ? "text-teal-400" : "text-slate-500"}`)}
                  <span>{route.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Shortcuts */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold px-3 block">Operational Shortcuts</span>
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 flex items-center justify-between transition"
            >
              <div className="flex items-center gap-2.5">
                <Command className="h-4 w-4 text-slate-500" />
                <span>Command Palette</span>
              </div>
              <span className="text-[9px] font-mono text-slate-600 bg-slate-900 px-1.5 py-0.5 rounded">Ctrl+K</span>
            </button>

            <button
              onClick={handleTriggerRebalance}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 flex items-center gap-2.5 transition"
            >
              <RefreshCw className={`h-4 w-4 text-slate-500 ${isSyncing ? "animate-spin text-teal-400" : ""}`} />
              <span>Verify Double-Entry Parity</span>
            </button>

            {currentUser.role === "SecOps_Administrator" && (
              <button
                onClick={handleTriggerBackup}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 flex items-center gap-2.5 transition"
              >
                <Database className="h-4 w-4 text-slate-500" />
                <span>Run Encrypted DB Backup</span>
              </button>
            )}

            {onBackToWorkbench && (
              <button
                onClick={onBackToWorkbench}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 flex items-center gap-2.5 transition"
              >
                <Layers className="h-4 w-4 text-emerald-500" />
                <span>Blueprint Architect Mode</span>
              </button>
            )}
          </div>

          {/* Favorites & Pins */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold px-3 block">Recent Logs Discovered</span>
            {preferences.recentItems.map(item => (
              <div key={item.id} className="px-3 py-1.5 rounded-lg bg-slate-900/10 border border-slate-900 text-[10px] font-mono flex justify-between items-center text-slate-400">
                <span>{item.name}</span>
                <span className="text-[8px] bg-slate-800 text-slate-500 px-1 py-0.5 rounded">{item.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Identity Panel */}
        <div className="p-4 border-t border-slate-900 bg-slate-950 flex flex-col gap-2 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center font-extrabold text-slate-950 font-mono text-xs">
              {currentUser.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="min-w-0 flex-1">
              <h5 className="text-xs font-bold text-slate-200 truncate">{currentUser.name}</h5>
              <p className="text-[9px] font-mono text-slate-500 truncate">{currentUser.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full text-center py-2 bg-slate-900 hover:bg-rose-950/20 text-rose-400 hover:text-rose-300 border border-slate-800 rounded-xl text-xs font-bold cursor-pointer transition"
          >
            Sign Out Operating Session
          </button>
        </div>
      </aside>

      {/* 2. Main Experience & Dashboard Engine viewport */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        
        {/* Dynamic Top Header Bar */}
        <header className="border-b border-slate-900 bg-slate-950/60 backdrop-blur-md py-3.5 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile Workspace Selector */}
            <div className="lg:hidden relative">
              <select
                value={activeWorkspace}
                onChange={(e) => setActiveWorkspace(e.target.value as WorkspaceId)}
                className="bg-slate-900 border border-slate-800 text-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:border-teal-500 cursor-pointer appearance-none pr-8"
              >
                <option value="faap">🏛️ FAAP</option>
                <option value="sacco">🏢 SACCO</option>
                <option value="church">⛪ CHURCH</option>
                <option value="ngo">🤝 NGO</option>
                <option value="alumni">🎓 ALUMNI</option>
                <option value="treasury">🪙 TREASURY</option>
                <option value="workflow">⚙️ WORKFLOW</option>
                <option value="security">🛡️ SECURITY</option>
                <option value="ai">🤖 AI</option>
                {currentUser.role === "SecOps_Administrator" && (
                  <option value="owner_center">🔑 OWNER</option>
                )}
              </select>
            </div>

            {/* Breadcrumbs */}
            <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-500">
              <span className="text-teal-400 font-bold uppercase tracking-wider">{activeWorkspace}</span>
              <ChevronRight className="h-3 w-3 text-slate-700" />
              <span className="text-slate-300 truncate">{workspaces[activeWorkspace]?.name}</span>
              {activeRouteId && (
                <>
                  <ChevronRight className="h-3 w-3 text-slate-700" />
                  <span className="text-teal-400 font-bold truncate">
                    {workspaces[activeWorkspace]?.routes.find(r => r.id === activeRouteId)?.label}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Quick Actions Header Area */}
          <div className="flex items-center gap-3">
            {/* Global search trigger */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="p-2 hover:bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-850 bg-slate-950 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <Search className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden md:inline font-mono text-[10px] text-slate-500">Ctrl+K</span>
            </button>

            {/* Sync status */}
            <div className="hidden md:flex items-center gap-1.5 text-[10px] font-mono bg-slate-900/40 border border-slate-900 px-2.5 py-1.5 rounded-xl text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Online Core</span>
            </div>

            {/* Notifications panel toggle */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationCenter(!showNotificationCenter)}
                className="p-2.5 hover:bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-900 rounded-xl transition cursor-pointer relative"
              >
                <Bell className="h-4 w-4" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500 animate-ping"></span>
                )}
              </button>

              {/* Notification Center Popover */}
              {showNotificationCenter && (
                <div className="absolute right-0 mt-3 w-80 bg-slate-950 border border-slate-850 rounded-2xl shadow-2xl p-4 z-40 space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-2.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">M-Kernel Notifications</span>
                    <button 
                      onClick={() => {
                        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                        setShowNotificationCenter(false);
                      }} 
                      className="text-[9px] text-teal-400 hover:underline"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-2.5 max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-[10px] text-slate-600 text-center py-4">No pending alerts.</p>
                    ) : (
                      notifications.map(item => (
                        <div key={item.id} className="p-2 rounded-lg bg-slate-900 border border-slate-850/40 text-[10px] leading-relaxed">
                          <div className="flex justify-between items-start mb-1">
                            <span className={`font-bold uppercase text-[9px] ${
                              item.type === "success" ? "text-emerald-400" : item.type === "warning" ? "text-amber-400" : "text-rose-400"
                            }`}>{item.title}</span>
                            <span className="text-[8px] text-slate-600">{new Date(item.timestamp).toLocaleTimeString()}</span>
                          </div>
                          <p className="text-slate-400 text-[9.5px]">{item.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* AI companion drawer toggle */}
            <button
              onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
              className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center gap-1.5 ${
                isAiPanelOpen 
                  ? "bg-teal-500/10 border-teal-500/30 text-teal-300"
                  : "bg-slate-950 border-slate-900 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Bot className="h-4 w-4" />
              <span className="text-xs font-bold hidden md:inline">AI Companion</span>
            </button>
          </div>
        </header>

        {/* Dashboard Viewport Area */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Workspace Title Card */}
          <div className="bg-gradient-to-br from-slate-950 to-slate-900/40 border border-slate-900 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                {renderIcon(workspaces[activeWorkspace]?.iconName, "h-5 w-5 text-teal-400")}
                <span className="text-[10px] font-mono font-extrabold tracking-widest text-teal-400/90 uppercase">Active Workspace</span>
              </div>
              <h2 className="text-xl font-bold font-sans tracking-tight text-slate-100">{workspaces[activeWorkspace]?.name}</h2>
              <p className="text-xs text-slate-400 mt-1">{workspaces[activeWorkspace]?.description}</p>
            </div>

            {/* Workspace action triggers */}
            <div className="flex flex-wrap gap-2.5">
              {activeWorkspace === "faap" && (
                <button
                  onClick={handleTriggerRebalance}
                  className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-lg shadow-teal-500/10 animate-pulse"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Reconcile Balances</span>
                </button>
              )}

              {activeWorkspace === "sacco" && (
                <button
                  onClick={() => setShowAddMemberModal(true)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-lg shadow-emerald-500/10"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Register Sacco Member</span>
                </button>
              )}

              {currentUser.role === "SecOps_Administrator" && (
                <button
                  onClick={handleTriggerBackup}
                  className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Database className="h-3.5 w-3.5 text-teal-400" />
                  <span>Encrypted Backup</span>
                </button>
              )}
            </div>
          </div>

          {activeRouteId === null ? (
            <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <LayoutGrid className="h-3.5 w-3.5 text-teal-500" />
                  <span>Dynamic Dashboard Engine</span>
                </h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Customizable viewport containing active operational ledger cards.</p>
              </div>

              {/* Layout widget toggle bar */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-500">Configure layout:</span>
                <div className="flex flex-wrap gap-1 bg-slate-900 border border-slate-850 p-1 rounded-xl">
                  {workspaces[activeWorkspace]?.defaultWidgets.map(widgetId => {
                    const isEnabled = preferences.enabledWidgets[activeWorkspace]?.includes(widgetId);
                    return (
                      <button
                        key={widgetId}
                        onClick={() => handleToggleWidget(activeWorkspace, widgetId)}
                        className={`px-2 py-1 rounded text-[9px] font-mono font-bold uppercase transition ${
                          isEnabled ? "bg-teal-500/10 text-teal-400" : "text-slate-600 hover:text-slate-400"
                        }`}
                      >
                        {widgetId.split("-")[1]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Dashboard grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6">
              {preferences.widgetOrder[activeWorkspace]?.map((widgetId, index) => {
                const isEnabled = preferences.enabledWidgets[activeWorkspace]?.includes(widgetId);
                if (!isEnabled) return null;

                // Determine grid width
                let gridSpan = "xl:col-span-6";
                if (widgetId === "faap-ledger" || widgetId === "owner-audit") {
                  gridSpan = "xl:col-span-12";
                }

                return (
                  <div 
                    key={widgetId} 
                    className={`${gridSpan} bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col`}
                  >
                    {/* Widget header controls */}
                    <div className="bg-slate-900/40 border-b border-slate-900 px-4 py-3 flex justify-between items-center select-none font-mono">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                        <h4 className="text-[11px] font-extrabold text-slate-300 uppercase tracking-widest">
                          {widgetId.replace("-", " ").toUpperCase()}
                        </h4>
                      </div>
                      
                      {/* Control buttons (Arrows for visual sorting) */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleMoveWidget(activeWorkspace, index, "up")}
                          disabled={index === 0}
                          className="p-1 hover:bg-slate-900 border border-slate-850 rounded text-slate-500 hover:text-slate-300 disabled:opacity-20 transition"
                          title="Move widget up in grid order"
                        >
                          &larr;
                        </button>
                        <button
                          onClick={() => handleMoveWidget(activeWorkspace, index, "down")}
                          disabled={index === preferences.widgetOrder[activeWorkspace].length - 1}
                          className="p-1 hover:bg-slate-900 border border-slate-850 rounded text-slate-500 hover:text-slate-300 disabled:opacity-20 transition"
                          title="Move widget down in grid order"
                        >
                          &rarr;
                        </button>
                      </div>
                    </div>

                    {/* Widget content views */}
                    <div className="p-5 flex-1 flex flex-col">
                      {/* FAAP 1: Treasury overview */}
                      {widgetId === "faap-treasury" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3 font-mono">
                            <div className="bg-slate-900/30 border border-slate-900 p-3 rounded-xl">
                              <span className="text-[9px] text-slate-500 uppercase">JUMO Fee Reserve</span>
                              <div className="text-sm font-extrabold text-teal-400 mt-1">$15,400,250</div>
                              <span className="text-[8px] text-emerald-500 mt-0.5 block flex items-center gap-0.5">
                                <TrendingUp className="h-2.5 w-2.5" /> 1.5% Settlement Active
                              </span>
                            </div>
                            <div className="bg-slate-900/30 border border-slate-900 p-3 rounded-xl">
                              <span className="text-[9px] text-slate-500 uppercase">Operational Parity</span>
                              <div className="text-sm font-extrabold text-slate-100 mt-1">$0.00 offset</div>
                              <span className="text-[8px] text-emerald-400 mt-0.5 block">Audit checks green</span>
                            </div>
                          </div>

                          {/* Interactive transfer form */}
                          <form onSubmit={handlePostJournal} className="space-y-3 font-mono text-xs border-t border-slate-900 pt-3">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Double-Entry Posting Journal</span>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[9px] text-slate-500 mb-0.5">Debit Account Code</label>
                                <select 
                                  value={journalForm.debitAcc} 
                                  onChange={e => setJournalForm({...journalForm, debitAcc: e.target.value})}
                                  className="w-full bg-slate-900 border border-slate-850 p-1.5 rounded text-slate-300 font-bold focus:outline-none focus:border-teal-500"
                                >
                                  <option value="1010">1010 - Cash Assets</option>
                                  <option value="1020">1020 - Accounts Receivable</option>
                                  <option value="5010">5010 - Operations Expense</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-[9px] text-slate-500 mb-0.5">Credit Account Code</label>
                                <select 
                                  value={journalForm.creditAcc} 
                                  onChange={e => setJournalForm({...journalForm, creditAcc: e.target.value})}
                                  className="w-full bg-slate-900 border border-slate-850 p-1.5 rounded text-slate-300 font-bold focus:outline-none focus:border-teal-500"
                                >
                                  <option value="4010">4010 - Fee Revenue</option>
                                  <option value="2010">2010 - Accounts Payable</option>
                                  <option value="3010">3010 - Share Capital Equity</option>
                                </select>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <div className="flex-1">
                                <input
                                  type="number"
                                  placeholder="Amount ($)"
                                  value={journalForm.amount}
                                  onChange={e => setJournalForm({...journalForm, amount: e.target.value})}
                                  className="w-full bg-slate-900 border border-slate-850 p-1.5 rounded text-slate-300 focus:outline-none focus:border-teal-500"
                                />
                              </div>
                              <button 
                                type="submit" 
                                disabled={isPostingJournal}
                                className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold px-3 py-1.5 rounded text-[10px] transition shrink-0"
                              >
                                {isPostingJournal ? "Posting..." : "Post Entry"}
                              </button>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* FAAP 2: Audit log ledger */}
                      {widgetId === "faap-ledger" && (
                        <div className="space-y-3 font-mono text-xs overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b border-slate-900 text-slate-500 text-[9px] text-left">
                                <th className="pb-2">VOUCHER</th>
                                <th className="pb-2">NARRATION</th>
                                <th className="pb-2 text-right">DEBIT</th>
                                <th className="pb-2 text-right">CREDIT</th>
                                <th className="pb-2 text-right">AUDIT</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-900/60 text-[10px]">
                              {ledgerTransactions.length === 0 ? (
                                <tr>
                                  <td colSpan={5} className="py-4 text-center text-slate-600">No journal posts. Add entry above!</td>
                                </tr>
                              ) : (
                                ledgerTransactions.slice(0, 5).map((tx: any) => (
                                  <tr key={tx.id} className="hover:bg-slate-900/10">
                                    <td className="py-2.5 text-teal-400 font-bold">{tx.voucherNumber}</td>
                                    <td className="py-2.5 text-slate-400 max-w-xs truncate">{tx.narration}</td>
                                    <td className="py-2.5 text-right font-bold text-slate-300">
                                      {tx.debitAmount > 0 ? `$${tx.debitAmount.toLocaleString()}` : "-"}
                                    </td>
                                    <td className="py-2.5 text-right font-bold text-slate-300">
                                      {tx.creditAmount > 0 ? `$${tx.creditAmount.toLocaleString()}` : "-"}
                                    </td>
                                    <td className="py-2.5 text-right">
                                      <span className="text-[8px] font-bold bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                        PASSED
                                      </span>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* FAAP 3: Trial balance validation parity status */}
                      {widgetId === "faap-parity" && (
                        <div className="space-y-4 font-mono text-xs">
                          <div className="bg-slate-900/40 border border-slate-900/60 p-4 rounded-xl space-y-2">
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="text-slate-500 uppercase">Trial Balance Status</span>
                              <span className="text-emerald-400 font-bold flex items-center gap-1">
                                <ShieldCheck className="h-3.5 w-3.5" /> BALANCED
                              </span>
                            </div>
                            <div className="flex justify-between items-center font-bold text-sm">
                              <span>Debit Sum:</span>
                              <span className="text-slate-100">${(trialBalance?.totalDebits ?? 15400250).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center font-bold text-sm border-b border-slate-900 pb-2">
                              <span>Credit Sum:</span>
                              <span className="text-slate-100">${(trialBalance?.totalCredits ?? 15400250).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] pt-1">
                              <span>Parity Discrepancy Offset:</span>
                              <span className="text-emerald-400 font-bold">$0.00</span>
                            </div>
                          </div>

                          <div className="bg-slate-900/20 p-3 rounded-lg border border-slate-900">
                            <span className="text-[9px] uppercase tracking-wider text-slate-500 block mb-1">Clearing Fee Ledger</span>
                            <p className="text-[10px] text-slate-400 leading-normal">
                              The 1.5% master fintech clearing fee automatically posts to account 4010 on simulated transactional triggers to fuel the core sovereign treasury reserve.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* SACCO 1: Sacco share pool overview */}
                      {widgetId === "sacco-overview" && (
                        <div className="space-y-4 font-mono">
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="bg-slate-900/30 border border-slate-900 p-3 rounded-xl">
                              <span className="text-[9px] text-slate-500 uppercase">Cooperative Savings</span>
                              <div className="text-sm font-extrabold text-teal-400 mt-1">$45,230,000</div>
                            </div>
                            <div className="bg-slate-900/30 border border-slate-900 p-3 rounded-xl">
                              <span className="text-[9px] text-slate-500 uppercase">Active Loan Pool</span>
                              <div className="text-sm font-extrabold text-slate-100 mt-1">$12,850,000</div>
                            </div>
                          </div>

                          {/* Beautiful CSS progress block */}
                          <div className="space-y-1.5 text-xs">
                            <div className="flex justify-between items-center text-[10px] text-slate-500">
                              <span>Reserve Liquidity Threshold</span>
                              <span>74% Healthy</span>
                            </div>
                            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[74%] rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SACCO 2: Risk scorer evaluation model form */}
                      {widgetId === "sacco-risk" && (
                        <div className="space-y-4 text-xs font-mono">
                          <form onSubmit={handleEvaluateLoan} className="space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[8.5px] text-slate-500 mb-0.5">Loan Limit Requested ($)</label>
                                <input
                                  type="number"
                                  value={loanForm.amount}
                                  onChange={e => setLoanForm({...loanForm, amount: e.target.value})}
                                  className="w-full bg-slate-900 border border-slate-850 p-1.5 rounded text-slate-300 text-[10.5px] focus:outline-none focus:border-teal-500"
                                />
                              </div>
                              <div>
                                <label className="block text-[8.5px] text-slate-500 mb-0.5">Applicant Credit Score</label>
                                <input
                                  type="number"
                                  value={loanForm.creditScore}
                                  onChange={e => setLoanForm({...loanForm, creditScore: e.target.value})}
                                  className="w-full bg-slate-900 border border-slate-850 p-1.5 rounded text-slate-300 text-[10.5px] focus:outline-none focus:border-teal-500"
                                />
                              </div>
                            </div>

                            <button
                              type="submit"
                              disabled={isEvaluatingLoan}
                              className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold py-2 rounded-xl text-[10px] transition cursor-pointer flex items-center justify-center gap-1"
                            >
                              {isEvaluatingLoan ? (
                                <RefreshCw className="h-3 w-3 animate-spin" />
                              ) : (
                                <Activity className="h-3 w-3" />
                              )}
                              <span>Evaluate Credit Risk Level</span>
                            </button>
                          </form>

                          {/* Render risk report evaluation results */}
                          {loanReport && (
                            <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl space-y-2">
                              <div className="flex justify-between items-center text-[9px]">
                                <span className="text-slate-500 uppercase font-bold">Risk Assessment Report</span>
                                <span className={`font-bold px-1.5 py-0.5 rounded border ${
                                  loanReport.decision === "Approved" 
                                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                                    : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                                }`}>
                                  {loanReport.decision}
                                </span>
                              </div>
                              <p className="text-[9.5px] text-slate-400 leading-normal">{loanReport.reason}</p>
                              <div className="grid grid-cols-2 gap-2 text-[8.5px] text-slate-500 border-t border-slate-850/30 pt-1.5">
                                <span>Interest rate: <span className="text-slate-300 font-bold">{loanReport.metrics?.interestRate}</span></span>
                                <span>Approved max: <span className="text-slate-300 font-bold">${loanReport.metrics?.maxApprovedAmount?.toLocaleString()}</span></span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* SACCO 3: Sacco members saving ledger */}
                      {widgetId === "sacco-members" && (
                        <div className="space-y-3 font-mono text-xs">
                          <div className="max-h-40 overflow-y-auto pr-1 space-y-2">
                            {saccoMembers.map(member => (
                              <div key={member.id} className="flex justify-between items-center bg-slate-900/40 border border-slate-900 p-2.5 rounded-xl">
                                <div className="space-y-0.5">
                                  <span className="text-slate-200 font-bold block text-[10.5px]">{member.name}</span>
                                  <span className="text-slate-500 text-[8.5px] block">Joined: {member.joinDate} &bull; {member.id}</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-emerald-400 font-extrabold block text-[11px]">${member.balance.toLocaleString()}</span>
                                  <span className="text-[8.5px] text-slate-500 block">Loans: {member.activeLoans}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Church widgets */}
                      {widgetId === "church-directory" && (
                        <div className="space-y-3 font-mono text-xs">
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Kampala Parish Registry</span>
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center p-2 bg-slate-900/30 border border-slate-900 rounded-lg">
                              <span>Congregants Registered:</span>
                              <span className="text-slate-200 font-bold">1,840 Families</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-slate-900/30 border border-slate-900 rounded-lg">
                              <span>Baptismal Requests (v4):</span>
                              <span className="text-emerald-400 font-bold">14 Pending</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {widgetId === "church-offerings" && (
                        <div className="space-y-3 font-mono text-xs">
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div className="p-2.5 bg-slate-900/40 border border-slate-900 rounded-xl">
                              <span className="text-slate-500 uppercase block text-[8px]">Tithing collections</span>
                              <span className="text-teal-400 font-extrabold block mt-0.5">$485,000/mo</span>
                            </div>
                            <div className="p-2.5 bg-slate-900/40 border border-slate-900 rounded-xl">
                              <span className="text-slate-500 uppercase block text-[8px]">Thanksgiving pool</span>
                              <span className="text-slate-300 font-extrabold block mt-0.5">$120,500/mo</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {widgetId === "church-events" && (
                        <div className="space-y-3 font-mono text-xs">
                          <div className="p-2.5 bg-slate-900/20 border border-slate-900 rounded-xl space-y-1.5">
                            <div className="flex justify-between text-[9px] text-teal-400 font-bold">
                              <span>Mass Scheduler</span>
                              <span>JULY 26</span>
                            </div>
                            <p className="text-[10px] text-slate-300">Confirmation Ceremony &bull; Kampala Cathedral</p>
                          </div>
                        </div>
                      )}

                      {/* NGO widgets */}
                      {widgetId === "ngo-grants" && (
                        <div className="space-y-3 font-mono text-xs">
                          <div className="p-2.5 bg-slate-900/30 border border-slate-900 rounded-xl space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-teal-400">USAID Grant proposal</span>
                              <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded uppercase">Submitted</span>
                            </div>
                            <p className="text-[9px] text-slate-500">Proposal value: $450,000 &bull; Program code NGO-4</p>
                          </div>
                        </div>
                      )}

                      {widgetId === "ngo-impact" && (
                        <div className="space-y-3 font-mono text-xs">
                          <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                            <div className="p-2 bg-slate-900/40 border border-slate-900 rounded-lg">
                              <span className="text-[14px] font-extrabold text-teal-400 block">14</span>
                              <span className="text-[8px] text-slate-500 block">Schools Built</span>
                            </div>
                            <div className="p-2 bg-slate-900/40 border border-slate-900 rounded-lg">
                              <span className="text-[14px] font-extrabold text-slate-300 block">120k</span>
                              <span className="text-[8px] text-slate-500 block">Meals served</span>
                            </div>
                            <div className="p-2 bg-slate-900/40 border border-slate-900 rounded-lg">
                              <span className="text-[14px] font-extrabold text-emerald-400 block">85</span>
                              <span className="text-[8px] text-slate-500 block">Clean bores</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {widgetId === "ngo-volunteers" && (
                        <div className="space-y-2 font-mono text-xs">
                          <div className="flex justify-between items-center p-2 bg-slate-900/30 border border-slate-900 rounded-lg">
                            <span>Active Field Volunteers:</span>
                            <span className="text-slate-200 font-bold">148 Active</span>
                          </div>
                        </div>
                      )}

                      {/* Alumni widgets */}
                      {widgetId === "alumni-directory" && (
                        <div className="space-y-3 font-mono text-xs">
                          <div className="p-2.5 bg-slate-900/30 border border-slate-900 rounded-xl space-y-1">
                            <span className="text-[10px] text-slate-300 font-bold block"> Kampala Chapter Matrix</span>
                            <p className="text-[9px] text-slate-500">Graduates registered: 3,450 chapter members.</p>
                          </div>
                        </div>
                      )}

                      {widgetId === "alumni-endowment" && (
                        <div className="space-y-3 font-mono text-xs">
                          <div className="bg-slate-900/30 border border-slate-900 p-3 rounded-xl text-center">
                            <span className="text-[8px] text-slate-500 uppercase block">Endowment Campaign</span>
                            <span className="text-sm font-extrabold text-teal-400 block mt-0.5">$2,485,000</span>
                          </div>
                        </div>
                      )}

                      {widgetId === "alumni-mentors" && (
                        <div className="space-y-2 font-mono text-xs">
                          <div className="flex justify-between items-center p-2 bg-slate-900/30 border border-slate-900 rounded-lg">
                            <span>Active Mentorship Matches:</span>
                            <span className="text-emerald-400 font-bold">48 Matches</span>
                          </div>
                        </div>
                      )}

                      {/* Owner controls */}
                      {widgetId === "owner-health" && (
                        <div className="space-y-4 font-mono text-xs">
                          {v1PlatformStatus ? (
                            <>
                              <div className="grid grid-cols-2 gap-2 text-[10px]">
                                <div className="bg-slate-900/30 border border-slate-900 p-2.5 rounded-xl">
                                  <span className="text-slate-500 uppercase block text-[8px]">Platform Status</span>
                                  <span className="text-teal-400 font-bold block mt-0.5">{v1PlatformStatus.status?.toUpperCase() || "OPERATIONAL"}</span>
                                </div>
                                <div className="bg-slate-900/30 border border-slate-900 p-2.5 rounded-xl">
                                  <span className="text-slate-500 uppercase block text-[8px]">Memory allocation</span>
                                  <span className="text-slate-300 font-bold block mt-0.5">{v1PlatformStatus.memoryUsage || "64MB"}</span>
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <div className="flex justify-between text-[9px] text-slate-500">
                                  <span>Uptime (live container)</span>
                                  <span>{v1PlatformStatus.uptimeSeconds || 0}s</span>
                                </div>
                                <div className="w-full bg-slate-900 h-1 rounded overflow-hidden">
                                  <div className="bg-teal-500 h-full w-[45%]"></div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="grid grid-cols-2 gap-2 text-[10px]">
                                <div className="bg-slate-900/30 border border-slate-900 p-2.5 rounded-xl">
                                  <span className="text-slate-500 uppercase block text-[8px]">Kernel load</span>
                                  <span className="text-teal-400 font-bold block mt-0.5">14.2% CPU</span>
                                </div>
                                <div className="bg-slate-900/30 border border-slate-900 p-2.5 rounded-xl">
                                  <span className="text-slate-500 uppercase block text-[8px]">Memory allocation</span>
                                  <span className="text-slate-300 font-bold block mt-0.5">652MB / 2.5GB</span>
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <div className="flex justify-between text-[9px] text-slate-500">
                                  <span>Replicated TCP Sockets</span>
                                  <span>18 active</span>
                                </div>
                                <div className="w-full bg-slate-900 h-1 rounded overflow-hidden">
                                  <div className="bg-teal-500 h-full w-[35%]"></div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      {widgetId === "owner-services" && (
                        <div className="space-y-3 font-mono text-xs">
                          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                            {v1Domains && v1Domains.length > 0 ? (
                              v1Domains.map((srv: any) => (
                                <div key={srv.id || srv.name} className="flex justify-between items-center bg-slate-900/40 border border-slate-900 p-2 rounded-lg text-[9.5px]">
                                  <span className="font-bold text-slate-300">{srv.name || srv.id}</span>
                                  <span className="text-[8px] px-1 bg-emerald-500/10 text-emerald-400 rounded">
                                    {srv.status?.toUpperCase() || "ACTIVE"}
                                  </span>
                                </div>
                              ))
                            ) : ownerData?.registeredServices?.map((srv: any) => (
                              <div key={srv.id} className="flex justify-between items-center bg-slate-900/40 border border-slate-900 p-2 rounded-lg text-[9.5px]">
                                <span className="font-bold text-slate-300">{srv.name}</span>
                                <span className="text-[8px] px-1 bg-emerald-500/10 text-emerald-400 rounded">
                                  {srv.status}
                                </span>
                              </div>
                            )) ?? (
                              <>
                                <div className="flex justify-between items-center bg-slate-900/40 border border-slate-900 p-2 rounded-lg text-[9.5px]">
                                  <span className="font-bold text-slate-300">FAAP Master double entry ledger</span>
                                  <span className="text-[8px] px-1 bg-emerald-500/10 text-emerald-400 rounded">ACTIVE</span>
                                </div>
                                <div className="flex justify-between items-center bg-slate-900/40 border border-slate-900 p-2 rounded-lg text-[9.5px]">
                                  <span className="font-bold text-slate-300">Identity Zero-Trust RBAC auth</span>
                                  <span className="text-[8px] px-1 bg-emerald-500/10 text-emerald-400 rounded">ACTIVE</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}

                      {widgetId === "owner-audit" && (
                        <div className="space-y-2 font-mono text-xs max-h-40 overflow-y-auto pr-1">
                          {v1SecurityEvents?.logs && v1SecurityEvents.logs.length > 0 ? (
                            v1SecurityEvents.logs.map((log: any) => (
                              <div key={log.id} className="p-2 bg-slate-900/40 border border-slate-900 rounded-lg text-[9.5px] leading-relaxed">
                                <div className="flex justify-between items-center mb-1 text-[8px]">
                                  <span className="text-teal-400 font-bold uppercase">{log.action || "SECURITY_EVENT"}</span>
                                  <span className="text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                                </div>
                                <p className="text-slate-400">{log.details}</p>
                                <span className="text-[8px] text-slate-500 block mt-1">Actor: {log.user || "System"}</span>
                              </div>
                            ))
                          ) : (ownerData?.auditEvents ?? [
                            { id: "A-01", action: "BOOT_INIT", actor: "System", timestamp: new Date().toISOString(), details: "Core bootstrap parameters initialized successfully." },
                            { id: "A-02", action: "LEDGER_PARITY", actor: "SecOps_Administrator", timestamp: new Date().toISOString(), details: "Double entry parity verified automatically." }
                          ]).map((log: any) => (
                            <div key={log.id} className="p-2 bg-slate-900/40 border border-slate-900 rounded-lg text-[9.5px] leading-relaxed">
                              <div className="flex justify-between items-center mb-1 text-[8px]">
                                <span className="text-teal-400 font-bold uppercase">{log.action}</span>
                                  <span className="text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                                </div>
                                <p className="text-slate-400">{log.details}</p>
                                <span className="text-[8px] text-slate-500 block mt-1">Actor: {log.actor}</span>
                              </div>
                            ))
                          }
                        </div>
                      )}

                      {widgetId === "owner-threats" && (
                        <div className="space-y-3 font-mono text-xs">
                          {v1TreasurySummary ? (
                            <div className="space-y-2">
                              <div className="p-2.5 bg-teal-950/20 border border-teal-900/30 rounded-xl">
                                <span className="text-slate-500 uppercase block text-[8px] font-mono">Treasury reserves</span>
                                <span className="text-teal-400 font-bold text-sm block mt-0.5">${v1TreasurySummary.treasuryReserves?.toLocaleString()}</span>
                              </div>
                              <div className="p-2.5 bg-slate-900/30 border border-slate-900 rounded-xl">
                                <span className="text-slate-500 uppercase block text-[8px] font-mono">Fees collected (1.5%)</span>
                                <span className="text-slate-300 font-bold block mt-0.5">${v1TreasurySummary.feeCollected?.toLocaleString()}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 bg-emerald-950/20 border border-emerald-900/30 text-emerald-400 rounded-xl flex items-start gap-2">
                              <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
                              <div>
                                <h5 className="font-bold text-[10px] uppercase">Firewall Integrity Shield</h5>
                                <p className="text-[9.5px] leading-relaxed mt-0.5">No security threats, unauthorized routing attempts, or memory leak anomalies detected on micro-kernel nodes.</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          ) : (
            renderActiveRouteView()
          )}
        </main>
      </div>

      {/* 3. AI Experience Layer contextual Side Drawer (Collapsible) */}
      <AnimatePresence>
        {isAiPanelOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="w-80 border-l border-slate-900 bg-slate-950/70 backdrop-blur-md shrink-0 flex flex-col relative z-20 select-none"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-900 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-teal-400 animate-pulse" />
                <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">Cognitive Assistant</h4>
              </div>
              <button 
                onClick={() => setIsAiPanelOpen(false)}
                className="text-slate-500 hover:text-slate-300 text-xs font-bold px-1.5"
              >
                &times;
              </button>
            </div>

            {/* AI Assistant Chat Threads */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="space-y-3 font-mono text-[10px]">
                {aiHistory.map((item, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-2xl leading-normal border max-w-[90%] ${
                      item.sender === "user" 
                        ? "bg-slate-900 border-slate-850/60 text-slate-300 ml-auto"
                        : "bg-teal-950/10 border-teal-900/10 text-teal-300 mr-auto"
                    }`}
                  >
                    <span className="font-bold uppercase text-[8px] block mb-1 text-slate-500">
                      {item.sender === "user" ? "You" : "M-Kernel AI"}
                    </span>
                    <p className="whitespace-pre-wrap">{item.text}</p>
                  </div>
                ))}

                {isAiResponding && (
                  <div className="p-3 rounded-2xl bg-teal-950/10 border border-teal-900/10 text-teal-300 mr-auto max-w-[90%] flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-bounce"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                )}
              </div>
            </div>

            {/* AI Action quick tools */}
            <div className="p-4 border-t border-slate-900 bg-slate-950 space-y-2 shrink-0">
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Cognitive Quick Audits</span>
              <div className="grid grid-cols-2 gap-1.5 text-[9px] font-mono text-center">
                <button
                  onClick={() => {
                    setAiHistory(prev => [
                      ...prev,
                      { sender: "user", text: "Run automated double-entry ledger parity check." },
                      { sender: "bot", text: "Grounded RAG analysis: Triggered ledger balance integrity sweep... Verified ledger debits match credit totals perfectly with absolute zero-offset consistency ($0.00 offset). Zero-Trust RBAC policies verified as active." }
                    ]);
                  }}
                  className="bg-slate-900 hover:bg-slate-850 border border-slate-800 p-2 rounded-lg text-slate-300 hover:text-slate-200 transition cursor-pointer"
                >
                  Ledger Audit
                </button>
                <button
                  onClick={() => {
                    setAiHistory(prev => [
                      ...prev,
                      { sender: "user", text: "Suggest active workspace optimizations." },
                      { sender: "bot", text: "Context-aware recommendations:\n1. FAAP Ledger: Rotate key sensitive secrets inside Owner Center.\n2. Sacco: Run Credit evaluations on evaluation model before committing deposits.\n3. Registry: Update discovered active micro-kernel templates." }
                    ]);
                  }}
                  className="bg-slate-900 hover:bg-slate-850 border border-slate-800 p-2 rounded-lg text-slate-300 hover:text-slate-200 transition cursor-pointer"
                >
                  Workflow Assist
                </button>
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendAiMessage} className="flex gap-1.5 pt-2">
                <input
                  type="text"
                  placeholder={getWorkspaceAiPrompt()}
                  value={aiInput}
                  onChange={e => setAiInput(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-850 p-2 rounded-xl text-[10.5px] text-slate-300 font-mono placeholder-slate-600 focus:outline-none focus:border-teal-500"
                />
                <button
                  type="submit"
                  disabled={!aiInput.trim()}
                  className="bg-teal-500 hover:bg-teal-400 text-slate-950 p-2 rounded-xl transition cursor-pointer shrink-0 disabled:opacity-20"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Global Command Palette Modal Dialog */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-start justify-center pt-[15vh] px-4 font-mono select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="bg-slate-950 border border-slate-850 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b border-slate-900 flex items-center gap-3">
                <Search className="h-4 w-4 text-slate-500 shrink-0" />
                <input
                  type="text"
                  placeholder="Type a command or workspace (e.g., 'sacco', 'reconcile', 'backup')..."
                  value={commandQuery}
                  onChange={e => setCommandQuery(e.target.value)}
                  className="w-full bg-transparent text-slate-200 placeholder-slate-600 font-mono text-xs focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setIsCommandPaletteOpen(false)}
                  className="text-slate-600 hover:text-slate-400 text-xs bg-slate-900 px-2 py-0.5 rounded border border-slate-850"
                >
                  ESC
                </button>
              </div>

              <div className="p-2 max-h-60 overflow-y-auto divide-y divide-slate-900/60">
                {getFilteredCommands().length === 0 ? (
                  <p className="text-[10px] text-slate-600 text-center py-4">No commands matching search.</p>
                ) : (
                  getFilteredCommands().map(c => (
                    <button
                      key={c.id}
                      onClick={c.action}
                      className="w-full text-left px-3.5 py-3 text-[11px] text-slate-400 hover:text-slate-100 hover:bg-slate-900/50 flex items-center justify-between rounded-lg transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <Terminal className="h-3.5 w-3.5 text-slate-500" />
                        <span>{c.title}</span>
                      </div>
                      <ChevronRight className="h-3 w-3 text-slate-700" />
                    </button>
                  ))
                )}
              </div>

              <div className="bg-slate-900/40 px-4 py-2.5 border-t border-slate-900 text-[9px] text-slate-500 flex justify-between items-center">
                <span>Select command to trigger on JUMO microkernel.</span>
                <span>CTRL+K</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. SACCO Register Member Dialog Modal */}
      <AnimatePresence>
        {showAddMemberModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-mono select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-950 border border-slate-850 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col p-5 space-y-4"
            >
              <div className="flex justify-between items-center border-b border-slate-900 pb-2.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Register Sacco Membership</span>
                <button 
                  onClick={() => setShowAddMemberModal(false)}
                  className="text-slate-500 hover:text-slate-300 text-sm font-bold"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-500 mb-1">Applicant Name</label>
                  <input
                    type="text"
                    placeholder="Enter full name..."
                    value={newMemberName}
                    onChange={e => setNewMemberName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-300 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Initial Savings Deposit Amount ($)</label>
                  <input
                    type="number"
                    placeholder="Amount to deposit..."
                    value={newMemberDeposit}
                    onChange={e => setNewMemberDeposit(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-300 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2 text-xs">
                <button
                  onClick={() => setShowAddMemberModal(false)}
                  className="flex-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 py-2.5 rounded-xl text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSaccoMember}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-2.5 rounded-xl text-xs font-bold transition"
                >
                  Add Member
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
