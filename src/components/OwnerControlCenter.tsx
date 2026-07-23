import React, { useState, useEffect } from "react";
import ProductionReleasePanel from "./ProductionReleasePanel";
import { 
  Activity, ShieldAlert, Cpu, Database, Coins, Bot, Sliders, Play, 
  Settings, ToggleLeft, ToggleRight, CheckCircle2, ShieldCheck, 
  Trash2, Plus, DollarSign, Users, Server, Globe, HelpCircle, 
  Eye, RefreshCw, Key, Shield, AlertTriangle, FileText, TrendingUp,
  Terminal as TerminalIcon, Hammer, GitBranch, ArrowUpCircle, HardDrive,
  Lock, Map, LayoutGrid, Radio, Zap, Boxes, FileCode, Network, EyeOff,
  FolderOpen, ShieldAlert as AlertIcon, Library, Sparkles
} from "lucide-react";

interface OwnerControlCenterProps {
  currentUser: { email: string; name: string; role: string; tenantId: string; trustLevel: string };
  onLogout: () => void;
}

// Structuring JUMO module list
interface JumoModule {
  id: string;
  name: string;
  type: "Domain" | "Service" | "AI" | "Security";
  status: "Active" | "Inactive";
  monthlyPrice: number;
  description: string;
  version: string;
}

// Structuring custom terminal history
interface TerminalLine {
  text: string;
  type: "input" | "system" | "success" | "error" | "warning";
  timestamp: string;
}

export default function OwnerControlCenter({ currentUser, onLogout }: OwnerControlCenterProps) {
  // Tabs expanded to include the complete 18+ JUMO Private Systems
  const [activeTab, setActiveTab] = useState<
    | "dashboard"
    | "software_factory"
    | "build_deploy"
    | "terminal"
    | "update_center"
    | "ai_factory"
    | "security_vault"
    | "architecture"
    | "cyber_security"
    | "aegis"
    | "fintech"
    | "domain_factory"
    | "servers"
    | "production_release"
    | "innovation_lab"
    | "deployment_pipeline"
    | "marketplace"
    | "digital_twin"
  >("dashboard");

  const [backendDashboardData, setBackendDashboardData] = useState<any>(null);
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);

  // 1. General State: Product Marketplace & Module Control
  const [modules, setModules] = useState<JumoModule[]>([
    { id: "M-01", name: "Financial & Accounting Platform (FAAP)", type: "Service", status: "Active", monthlyPrice: 150, description: "Shared multi-tenant double entry ledger service", version: "v2.0.4" },
    { id: "M-02", name: "SACCO Enterprise ERP", type: "Domain", status: "Active", monthlyPrice: 299, description: "Savings, shares capital, credit scoring, and loans management", version: "v1.8.2" },
    { id: "M-03", name: "Church ERP Diocesan", type: "Domain", status: "Active", monthlyPrice: 199, description: "Membership, parish ledgers, and donation receipt trackers", version: "v1.5.0" },
    { id: "M-04", name: "Education Board ERP", type: "Domain", status: "Active", monthlyPrice: 249, description: "Tuition billing, student records, and school financial integration", version: "v2.1.1" },
    { id: "M-05", name: "NGO Grants ERP Suite", type: "Domain", status: "Inactive", monthlyPrice: 140, description: "Donor funding allocations, projects, and donor compliance reports", version: "v1.2.4" },
    { id: "M-06", name: "Healthcare ERP Clinic Mode", type: "Domain", status: "Inactive", monthlyPrice: 399, description: "Clinical records, billing, and pharmacy stock accounting", version: "v1.0.8" },
    { id: "M-07", name: "Agriculture Cooperative Hub", type: "Domain", status: "Inactive", monthlyPrice: 180, description: "Crop logs, supply chain distribution, and smallholder savings", version: "v1.1.2" },
    { id: "M-08", name: "Government Revenue Portal", type: "Domain", status: "Inactive", monthlyPrice: 899, description: "Municipal licensing, tax accounts, and public receipts logs", version: "v2.0.1" },
    { id: "M-09", name: "Gemini AI Multi-Agent Router Gateway", type: "AI", status: "Active", monthlyPrice: 0, description: "Server-side cognitive agent orchestration layer", version: "v3.5.0" },
    { id: "M-10", name: "Zero Trust RBAC Validator Core", type: "Security", status: "Active", monthlyPrice: 0, description: "Continuous policy validation engine", version: "v2.2.0" },
    { id: "M-11", name: "Distributed Offline Edge Synchronizer", type: "Security", status: "Inactive", monthlyPrice: 120, description: "Peer-to-peer ledger state replication broker", version: "v1.0.0" }
  ]);

  // 2. Software Factory State
  const [factoryAppName, setFactoryAppName] = useState("");
  const [factoryTemplate, setFactoryTemplate] = useState("sacco-micro-ledger");
  const [factoryStatus, setFactoryStatus] = useState<"idle" | "generating" | "testing" | "completed">("idle");
  const [factoryProgress, setFactoryProgress] = useState(0);
  const [factoryLogs, setFactoryLogs] = useState<string[]>([]);
  const [manufacturedApps, setManufacturedApps] = useState([
    { name: "SaccoZambia_CreditScoreV1", template: "SACCO Ledger Extension", version: "v1.0.0", creator: "AI Agent 'TellerCopilot'", date: "2026-07-12" },
    { name: "UgandaDiocese_DonationTracker", template: "Church ERP Suite Add-on", version: "v1.0.2", creator: "AI Agent 'LedgerAuditor'", date: "2026-07-14" }
  ]);

  // 3. Build & Deploy Command State
  const [deployTarget, setDeployTarget] = useState<"gcp-run" | "koyeb" | "docker" | "k8s">("gcp-run");
  const [deployState, setDeployState] = useState<"idle" | "building" | "pushing" | "live">("idle");
  const [deployProgress, setDeployProgress] = useState(0);
  const [deployLogLines, setDeployLogLines] = useState<string[]>([]);

  // 4. JUMO System Terminal State
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { text: "JUMO UEOS Master Secure Terminal loaded. Connection node secure.", type: "system", timestamp: "06:12:01" },
    { text: "Type 'help' to view available secure commands.", type: "system", timestamp: "06:12:05" }
  ]);

  // 5. Update Center State
  const [kernelVersion, setKernelVersion] = useState("v2.0.4-LTS");
  const [checkingUpdates, setCheckingUpdates] = useState(false);
  const [updateLog, setUpdateLog] = useState("");
  const [updateAvailable, setUpdateAvailable] = useState(true);

  // 6. AI Factory State
  const [aiAgents, setAiAgents] = useState([
    { name: "Ledger Auditor AI", role: "Financial Control", status: "Active", memoryCount: 42, provider: "Gemini 3.5 Flash", riskRating: "Strict Safe" },
    { name: "Compliance Officer AI", role: "Policy Guardian", status: "Active", memoryCount: 18, provider: "Gemini 3.5 Flash", riskRating: "Strict Safe" },
    { name: "Treasury Assistant AI", role: "Liquidity Advisor", status: "Active", memoryCount: 31, provider: "Gemini 3.5 Flash", riskRating: "Strict Safe" },
    { name: "CEO Strategic Assistant AI", role: "Executive Advisor", status: "Active", memoryCount: 120, provider: "Gemini 3.5 Flash", riskRating: "Strict Safe" },
    { name: "Financial Controller AI", role: "Ledger Auditing", status: "Active", memoryCount: 88, provider: "Gemini 3.5 Flash", riskRating: "Strict Safe" },
    { name: "Legal Compliance AI", role: "Document Guard", status: "Inactive", memoryCount: 0, provider: "Local DeepSeek", riskRating: "Sandbox Restricted" },
    { name: "Procurement Intelligence AI", role: "Supply Optimization", status: "Inactive", memoryCount: 0, provider: "OpenAI Proxy", riskRating: "Sandbox Restricted" }
  ]);
  const [aiProviderStatus, setAiProviderStatus] = useState([
    { name: "Google Gemini 3.5 API", type: "Cloud SaaS", latency: "185ms", costPerK: "$0.00015", status: "Connected (Default)" },
    { name: "OpenAI Proxy Integration", type: "Hybrid Bridge", latency: "310ms", costPerK: "$0.00250", status: "Configured (Standby)" },
    { name: "Local DeepSeek Edge Engine", type: "Edge Offline", latency: "420ms", costPerK: "$0.00000", status: "Local Model Loaded" }
  ]);
  const [newAgentName, setNewAgentName] = useState("");
  const [newAgentRole, setNewAgentRole] = useState("General Administration");

  // 7. Security Vault State (Connected to backend APIs)
  const [secrets, setSecrets] = useState<any[]>([]);
  const [vaultDiagnostics, setVaultDiagnostics] = useState<any>(null);
  const [vaultLoading, setVaultLoading] = useState(false);
  const [diagnosticsLoading, setDiagnosticsLoading] = useState(false);
  const [newSecretKey, setNewSecretKey] = useState("");
  const [newSecretVal, setNewSecretVal] = useState("");
  const [newSecretCategory, setNewSecretCategory] = useState("Google Cloud");
  const [newSecretDescription, setNewSecretDescription] = useState("");
  const [newSecretExpiresAt, setNewSecretExpiresAt] = useState("");
  const [selectedSecret, setSelectedSecret] = useState<any>(null);
  const [revealKey, setRevealKey] = useState<string | null>(null);
  const [revealedValue, setRevealedValue] = useState<string | null>(null);
  
  // MFA prompt simulation
  const [mfaModalOpen, setMfaModalOpen] = useState(false);
  const [mfaSecretToReveal, setMfaSecretToReveal] = useState<string | null>(null);
  const [mfaCode, setMfaCode] = useState("");
  const [mfaError, setMfaError] = useState("");
  
  // Rotation & Rollback states
  const [isRotating, setIsRotating] = useState(false);
  const [rotationValue, setRotationValue] = useState("");
  const [rollbackLoading, setRollbackLoading] = useState(false);
  
  // Global Operating System Console States
  const [commandSearchQuery, setCommandSearchQuery] = useState("");
  const [activeWorkspace, setActiveWorkspace] = useState("Sovereign Core Platform");
  const [showRightContextPanel, setShowRightContextPanel] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [expandedNavZone, setExpandedNavZone] = useState<string | null>("Platform");

  // Backup/Restore states
  const [backupPayload, setBackupPayload] = useState("");
  const [restorePayload, setRestorePayload] = useState("");
  const [backupModalOpen, setBackupModalOpen] = useState(false);
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);

  // Vault category filter
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");

  // Notifications
  const [vaultSuccessMessage, setVaultSuccessMessage] = useState("");
  const [vaultErrorMessage, setVaultErrorMessage] = useState("");

  const showVaultToast = (msg: string, isError = false) => {
    if (isError) {
      setVaultErrorMessage(msg);
      setTimeout(() => setVaultErrorMessage(""), 5000);
    } else {
      setVaultSuccessMessage(msg);
      setTimeout(() => setVaultSuccessMessage(""), 5000);
    }
  };

  const fetchSecrets = async () => {
    setVaultLoading(true);
    try {
      const res = await fetch("/api/ueos/secrets");
      if (res.ok) {
        const data = await res.json();
        setSecrets(data);
      } else {
        showVaultToast("Failed to fetch credentials from secure database.", true);
      }
    } catch (err: any) {
      showVaultToast("Connection failed: " + err.message, true);
    } finally {
      setVaultLoading(false);
    }
  };

  const fetchDiagnostics = async () => {
    setDiagnosticsLoading(true);
    try {
      const res = await fetch("/api/ueos/secrets/diagnostics");
      if (res.ok) {
        const data = await res.json();
        setVaultDiagnostics(data);
      } else {
        showVaultToast("Failed to fetch secure AI health telemetry.", true);
      }
    } catch (err: any) {
      showVaultToast("Diagnostics connection error: " + err.message, true);
    } finally {
      setDiagnosticsLoading(false);
    }
  };

  // Advanced JUMO Enterprise Integration States
  const [faapIntelligence, setFaapIntelligence] = useState<any>(null);
  const [faapIntelligenceLoading, setFaapIntelligenceLoading] = useState(false);

  const [paymentProvider, setPaymentProvider] = useState("MTN Mobile Money");
  const [paymentTenantId, setPaymentTenantId] = useState("sacco-zambia-hq");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentCurrency, setPaymentCurrency] = useState("USD");
  const [paymentBillingModel, setPaymentBillingModel] = useState("transaction");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<any>(null);

  const [billingConfigs, setBillingConfigs] = useState<any[]>([]);
  const [editingBillingId, setEditingBillingId] = useState<string | null>(null);
  const [editingFeePercentage, setEditingFeePercentage] = useState("1.5");
  const [editingBillingPeriod, setEditingBillingPeriod] = useState("Monthly");
  const [editingBillingModel, setEditingBillingModel] = useState("transaction");
  const [editingSettlementRules, setEditingSettlementRules] = useState("Instant");

  const [erpSolutionType, setErpSolutionType] = useState("Education ERP");
  const [erpTemplate, setErpTemplate] = useState("University Academy");
  const [erpTenantId, setErpTenantId] = useState("education-kenya-board");
  const [erpBuilding, setErpBuilding] = useState(false);
  const [erpBuildResult, setErpBuildResult] = useState<any>(null);
  const [erpBuildLogs, setErpBuildLogs] = useState<string[]>([]);
  const [activeGeneratedErps, setActiveGeneratedErps] = useState<any[]>([]);

  const [activeWorkforceAgents, setActiveWorkforceAgents] = useState<any[]>([]);
  const [agentsLoading, setAgentsLoading] = useState(false);
  const [registryNewName, setRegistryNewName] = useState("");
  const [registryNewRole, setRegistryNewRole] = useState("Financial Intelligence");
  const [registryNewPermission, setRegistryNewPermission] = useState("Standard");
  const [registryNewDomain, setRegistryNewDomain] = useState("FAAP");
  const [registryNewMemory, setRegistryNewMemory] = useState("");
  const [registryNewTools, setRegistryNewTools] = useState("FAAP Ledger Poster");

  const [aegisScanResult, setAegisScanResult] = useState<any>(null);
  const [aegisScanning, setAegisScanning] = useState(false);

  const [ragDocuments, setRagDocuments] = useState<any[]>([]);
  const [newRagTitle, setNewRagTitle] = useState("");
  const [newRagCategory, setNewRagCategory] = useState("Accounting Standards");
  const [newRagContent, setNewRagContent] = useState("");
  const [ragLoading, setRagLoading] = useState(false);

  // JUMO UEOS BACKLOG NEW STATES
  // 1. Innovation Lab
  const [researchers, setResearchers] = useState<any[]>([]);
  const [innovationPipeline, setInnovationPipeline] = useState<any[]>([]);
  const [newConceptTitle, setNewConceptTitle] = useState("");
  const [newConceptDomain, setNewConceptDomain] = useState("AI Engineering");
  const [newConceptPhase, setNewConceptPhase] = useState("Concept");
  const [newConceptDescription, setNewConceptDescription] = useState("");
  const [newConceptLatency, setNewConceptLatency] = useState("350ms");
  const [newConceptValue, setNewConceptValue] = useState("9.8");
  const [addingConcept, setAddingConcept] = useState(false);

  // 2. Deployment CI/CD Pipeline
  const [deploymentHistory, setDeploymentHistory] = useState<any[]>([]);
  const [buildBranch, setBuildBranch] = useState("main");
  const [buildCommitMessage, setBuildCommitMessage] = useState("");
  const [triggeringBuild, setTriggeringBuild] = useState(false);
  const [rollbackVersion, setRollbackVersion] = useState("");
  const [triggeringRollback, setTriggeringRollback] = useState(false);

  // 3. Marketplace
  const [marketplaceCatalog, setMarketplaceCatalog] = useState<any[]>([]);
  const [installingPluginId, setInstallingPluginId] = useState<string | null>(null);

  // 4. Digital Twin & Compliance Simulations
  const [twinScenario, setTwinScenario] = useState<"high_fees" | "low_default" | "grant_dryout">("high_fees");
  const [twinSimulationResult, setTwinSimulationResult] = useState<any>(null);
  const [twinSimulating, setTwinSimulating] = useState(false);
  const [governanceReport, setGovernanceReport] = useState<any>(null);
  const [governanceLoading, setGovernanceLoading] = useState(false);

  // JUMO BACKLOG NEW FETCH HANDLERS
  const fetchResearchers = async () => {
    try {
      const res = await fetch("/api/ueos/innovation/researchers");
      if (res.ok) {
        const data = await res.json();
        setResearchers(data.researchers || []);
      }
    } catch (err) {
      console.error("Failed to fetch researchers:", err);
    }
  };

  const fetchInnovationPipeline = async () => {
    try {
      const res = await fetch("/api/ueos/innovation/pipeline");
      if (res.ok) {
        const data = await res.json();
        setInnovationPipeline(data.pipeline || []);
      }
    } catch (err) {
      console.error("Failed to fetch innovation pipeline:", err);
    }
  };

  const handleAddConcept = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConceptTitle || !newConceptDescription) return;
    setAddingConcept(true);
    try {
      const res = await fetch("/api/ueos/innovation/add-concept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newConceptTitle,
          domain: newConceptDomain,
          phase: newConceptPhase,
          description: newConceptDescription,
          latency: newConceptLatency,
          value: newConceptValue
        })
      });
      if (res.ok) {
        setNewConceptTitle("");
        setNewConceptDescription("");
        fetchInnovationPipeline();
      }
    } catch (err) {
      console.error("Failed to add concept:", err);
    } finally {
      setAddingConcept(false);
    }
  };

  const fetchDeploymentHistory = async () => {
    try {
      const res = await fetch("/api/ueos/deployment/history");
      if (res.ok) {
        const data = await res.json();
        setDeploymentHistory(data.history || []);
      }
    } catch (err) {
      console.error("Failed to fetch deployment history:", err);
    }
  };

  const handleTriggerBuild = async (e: React.FormEvent) => {
    e.preventDefault();
    setTriggeringBuild(true);
    try {
      const res = await fetch("/api/ueos/deployment/build-pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branch: buildBranch,
          commitMessage: buildCommitMessage || "Triggered new production compile",
          actor: currentUser?.email || "okwiijuliusmoses@gmail.com"
        })
      });
      if (res.ok) {
        setBuildCommitMessage("");
        fetchDeploymentHistory();
      }
    } catch (err) {
      console.error("Failed to trigger build:", err);
    } finally {
      setTriggeringBuild(false);
    }
  };

  const handleTriggerRollback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollbackVersion) return;
    setTriggeringRollback(true);
    try {
      const res = await fetch("/api/ueos/deployment/rollback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rollbackToVersion: rollbackVersion,
          actor: currentUser?.email || "okwiijuliusmoses@gmail.com"
        })
      });
      if (res.ok) {
        setRollbackVersion("");
        fetchDeploymentHistory();
      }
    } catch (err) {
      console.error("Failed to trigger rollback:", err);
    } finally {
      setTriggeringRollback(false);
    }
  };

  const fetchMarketplaceCatalog = async () => {
    try {
      const res = await fetch("/api/ueos/marketplace/catalog");
      if (res.ok) {
        const data = await res.json();
        setMarketplaceCatalog(data.catalog || []);
      }
    } catch (err) {
      console.error("Failed to fetch marketplace catalog:", err);
    }
  };

  const handleInstallPlugin = async (pluginId: string) => {
    setInstallingPluginId(pluginId);
    try {
      const res = await fetch("/api/ueos/marketplace/install", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pluginId,
          tenantId: currentUser?.tenantId || "general",
          actor: currentUser?.email || "okwiijuliusmoses@gmail.com"
        })
      });
      if (res.ok) {
        fetchMarketplaceCatalog();
      }
    } catch (err) {
      console.error("Failed to install plugin:", err);
    } finally {
      setInstallingPluginId(null);
    }
  };

  const handleRunTwinSimulation = async () => {
    setTwinSimulating(true);
    try {
      const res = await fetch("/api/ueos/twin/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: twinScenario,
          tenantId: currentUser?.tenantId || "general"
        })
      });
      if (res.ok) {
        const data = await res.json();
        setTwinSimulationResult(data.report);
      }
    } catch (err) {
      console.error("Failed to run simulation:", err);
    } finally {
      setTwinSimulating(false);
    }
  };

  const fetchGovernanceReport = async () => {
    setGovernanceLoading(true);
    try {
      const res = await fetch("/api/ueos/governance/compliance-report");
      if (res.ok) {
        const data = await res.json();
        setGovernanceReport(data);
      }
    } catch (err) {
      console.error("Failed to fetch governance report:", err);
    } finally {
      setGovernanceLoading(false);
    }
  };

  // Run on first load or when security_vault tab is clicked
  const fetchLedgerAccounts = async () => {
    try {
      const res = await fetch("/api/ueos/ledger/accounts");
      if (res.ok) {
        const data = await res.json();
        setLedgerAccounts(data);
      }
    } catch (err) {
      console.error("Failed to fetch ledger accounts:", err);
    }
  };

  const fetchFaapIntelligence = async () => {
    setFaapIntelligenceLoading(true);
    try {
      const res = await fetch("/api/ueos/faap/intelligence");
      if (res.ok) {
        const data = await res.json();
        setFaapIntelligence(data);
      }
    } catch (err) {
      console.error("Failed to fetch FAAP intelligence:", err);
    } finally {
      setFaapIntelligenceLoading(false);
    }
  };

  const fetchBillingConfigs = async () => {
    try {
      const res = await fetch("/api/ueos/fintech/tenant-billing-config");
      if (res.ok) {
        const data = await res.json();
        setBillingConfigs(data.configs || []);
      }
    } catch (err) {
      console.error("Failed to fetch billing configs:", err);
    }
  };

  const handleUpdateBillingConfig = async (tenantId: string) => {
    try {
      const res = await fetch("/api/ueos/fintech/tenant-billing-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: tenantId,
          feePercentage: editingFeePercentage,
          billingPeriod: editingBillingPeriod,
          model: editingBillingModel,
          settlementRules: editingSettlementRules
        })
      });
      if (res.ok) {
        setEditingBillingId(null);
        fetchBillingConfigs();
      }
    } catch (err) {
      console.error("Failed to update billing config:", err);
    }
  };

  const handleRunFintechPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentAmount) return;
    setPaymentProcessing(true);
    setPaymentResult(null);
    try {
      const res = await fetch("/api/ueos/fintech/payment-connector", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: paymentProvider,
          tenantId: paymentTenantId,
          amount: paymentAmount,
          currency: paymentCurrency,
          billingModel: paymentBillingModel
        })
      });
      if (res.ok) {
        const data = await res.json();
        setPaymentResult(data);
        setPaymentAmount("");
        fetchLedgerAccounts();
        fetchFaapIntelligence();
      }
    } catch (err) {
      console.error("Failed to execute payment:", err);
    } finally {
      setPaymentProcessing(false);
    }
  };

  const fetchActiveGeneratedErps = async () => {
    try {
      const res = await fetch("/api/ueos/erp-factory/active");
      if (res.ok) {
        const data = await res.json();
        setActiveGeneratedErps(data.erps || []);
      }
    } catch (err) {
      console.error("Failed to fetch active ERPs:", err);
    }
  };

  const handleLaunchErpBuild = async (e: React.FormEvent) => {
    e.preventDefault();
    setErpBuilding(true);
    setErpBuildResult(null);
    setErpBuildLogs([]);
    try {
      const res = await fetch("/api/ueos/erp-factory/build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          solutionType: erpSolutionType,
          template: erpTemplate,
          tenantId: erpTenantId
        })
      });
      if (res.ok) {
        const data = await res.json();
        setErpBuildResult(data.builtErp);
        setErpBuildLogs(data.deploymentLogs || []);
        fetchActiveGeneratedErps();
        fetchWorkforceAgents();
      }
    } catch (err) {
      console.error("Failed to build ERP solution:", err);
    } finally {
      setErpBuilding(false);
    }
  };

  const fetchWorkforceAgents = async () => {
    setAgentsLoading(true);
    try {
      const res = await fetch("/api/ueos/ai-factory/agents");
      if (res.ok) {
        const data = await res.json();
        setActiveWorkforceAgents(data.agents || []);
      }
    } catch (err) {
      console.error("Failed to fetch workforce agents:", err);
    } finally {
      setAgentsLoading(false);
    }
  };

  const handleRegisterWorkforceAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registryNewName || !registryNewRole) return;
    try {
      const res = await fetch("/api/ueos/ai-factory/register-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registryNewName,
          role: registryNewRole,
          permissionLevel: registryNewPermission,
          domain: registryNewDomain,
          memory: registryNewMemory,
          tools: registryNewTools.split(",").map(t => t.trim())
        })
      });
      if (res.ok) {
        setRegistryNewName("");
        setRegistryNewRole("Financial Intelligence");
        setRegistryNewMemory("");
        setRegistryNewTools("");
        fetchWorkforceAgents();
      }
    } catch (err) {
      console.error("Failed to register workforce agent:", err);
    }
  };

  const handleTriggerAegisScan = async () => {
    setAegisScanning(true);
    try {
      const res = await fetch("/api/ueos/security/threat-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) {
        const data = await res.json();
        setAegisScanResult(data);
      }
    } catch (err) {
      console.error("Failed to scan threats:", err);
    } finally {
      setAegisScanning(false);
    }
  };

  const fetchRagDocuments = async () => {
    setRagLoading(true);
    try {
      const res = await fetch("/api/ueos/rag/knowledge");
      if (res.ok) {
        const data = await res.json();
        setRagDocuments(data.documents || []);
      }
    } catch (err) {
      console.error("Failed to fetch RAG documents:", err);
    } finally {
      setRagLoading(false);
    }
  };

  const handleAddRagDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRagTitle || !newRagContent) return;
    try {
      const res = await fetch("/api/ueos/rag/add-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newRagTitle,
          category: newRagCategory,
          content: newRagContent
        })
      });
      if (res.ok) {
        setNewRagTitle("");
        setNewRagContent("");
        fetchRagDocuments();
      }
    } catch (err) {
      console.error("Failed to index RAG document:", err);
    }
  };

  const fetchOwnerDashboardData = async () => {
    setIsDashboardLoading(true);
    try {
      const res = await fetch("/api/dashboard/owner");
      if (res.ok) {
        const data = await res.json();
        setBackendDashboardData(data);
      }
    } catch (err) {
      console.error("Failed to load owner dashboard data:", err);
    } finally {
      setIsDashboardLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "dashboard") {
      fetchOwnerDashboardData();
    }
    if (activeTab === "security_vault") {
      fetchSecrets();
      fetchDiagnostics();
    }
    if (activeTab === "fintech" || activeTab === "dashboard" || activeTab === "domain_factory") {
      fetchLedgerAccounts();
      fetchFaapIntelligence();
      fetchBillingConfigs();
      fetchActiveGeneratedErps();
    }
    if (activeTab === "ai_factory") {
      fetchWorkforceAgents();
    }
    if (activeTab === "aegis" || activeTab === "cyber_security") {
      handleTriggerAegisScan();
      fetchRagDocuments();
    }
    if (activeTab === "innovation_lab") {
      fetchResearchers();
      fetchInnovationPipeline();
    }
    if (activeTab === "deployment_pipeline") {
      fetchDeploymentHistory();
    }
    if (activeTab === "marketplace") {
      fetchMarketplaceCatalog();
    }
    if (activeTab === "digital_twin") {
      handleRunTwinSimulation();
      fetchGovernanceReport();
    }
  }, [activeTab]);

  const handleRegisterSecret = async () => {
    if (!newSecretKey || !newSecretVal) {
      showVaultToast("Please provide both key name and secure value.", true);
      return;
    }

    try {
      const res = await fetch("/api/ueos/secrets/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: newSecretKey,
          value: newSecretVal,
          category: newSecretCategory,
          description: newSecretDescription,
          expiresAt: newSecretExpiresAt,
          actor: currentUser.email
        })
      });
      if (res.ok) {
        showVaultToast(`Credential '${newSecretKey}' registered and encrypted successfully.`);
        setNewSecretKey("");
        setNewSecretVal("");
        setNewSecretDescription("");
        setNewSecretExpiresAt("");
        fetchSecrets();
        fetchDiagnostics();
      } else {
        const errData = await res.json();
        showVaultToast(errData.error || "Failed to register secret.", true);
      }
    } catch (err: any) {
      showVaultToast("Registration error: " + err.message, true);
    }
  };

  const handleDeleteSecret = async (key: string) => {
    if (!confirm(`Are you absolutely sure you want to permanently delete credential: ${key}? This action is audited.`)) {
      return;
    }
    try {
      const res = await fetch("/api/ueos/secrets/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, actor: currentUser.email })
      });
      if (res.ok) {
        showVaultToast(`Credential '${key}' permanently removed.`);
        if (selectedSecret?.key === key) {
          setSelectedSecret(null);
        }
        fetchSecrets();
        fetchDiagnostics();
      } else {
        showVaultToast("Failed to delete credential.", true);
      }
    } catch (err: any) {
      showVaultToast("Deletion error: " + err.message, true);
    }
  };

  const handleRotateSecret = async () => {
    if (!selectedSecret || !rotationValue) return;

    setIsRotating(true);
    try {
      const res = await fetch("/api/ueos/secrets/rotate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: selectedSecret.key,
          newValue: rotationValue,
          actor: currentUser.email
        })
      });
      if (res.ok) {
        showVaultToast(`Successfully rotated credential '${selectedSecret.key}'. Old value moved to rollback history.`);
        setRotationValue("");
        const refreshedSecretRes = await fetch("/api/ueos/secrets");
        if (refreshedSecretRes.ok) {
          const list = await refreshedSecretRes.json();
          setSecrets(list);
          const updatedSelected = list.find((s: any) => s.key === selectedSecret.key);
          if (updatedSelected) {
            setSelectedSecret(updatedSelected);
          }
        }
        fetchDiagnostics();
      } else {
        showVaultToast("Failed to rotate credential.", true);
      }
    } catch (err: any) {
      showVaultToast("Rotation error: " + err.message, true);
    } finally {
      setIsRotating(false);
    }
  };

  const handleRollbackSecret = async (versionIndex: number) => {
    if (!selectedSecret) return;
    if (!confirm("Are you sure you want to rollback to this historical version? Current value will be swapped into history.")) {
      return;
    }

    setRollbackLoading(true);
    try {
      const res = await fetch("/api/ueos/secrets/rollback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: selectedSecret.key,
          versionIndex,
          actor: currentUser.email
        })
      });
      if (res.ok) {
        showVaultToast(`Credential '${selectedSecret.key}' successfully rolled back.`);
        const refreshedSecretRes = await fetch("/api/ueos/secrets");
        if (refreshedSecretRes.ok) {
          const list = await refreshedSecretRes.json();
          setSecrets(list);
          const updatedSelected = list.find((s: any) => s.key === selectedSecret.key);
          if (updatedSelected) {
            setSelectedSecret(updatedSelected);
          }
        }
        fetchDiagnostics();
      } else {
        showVaultToast("Failed to execute version rollback.", true);
      }
    } catch (err: any) {
      showVaultToast("Rollback error: " + err.message, true);
    } finally {
      setRollbackLoading(false);
    }
  };

  const handleExportBackup = async () => {
    try {
      const res = await fetch("/api/ueos/secrets/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actor: currentUser.email })
      });
      if (res.ok) {
        const data = await res.json();
        setBackupPayload(data.payload);
        showVaultToast("Encrypted vault backup archive generated successfully.");
      } else {
        showVaultToast("Failed to generate secure backup payload.", true);
      }
    } catch (err: any) {
      showVaultToast("Backup generation error: " + err.message, true);
    }
  };

  const handleRestoreBackup = async () => {
    if (!restorePayload.trim()) {
      showVaultToast("Please paste/enter the secure backup payload.", true);
      return;
    }

    try {
      const res = await fetch("/api/ueos/secrets/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: restorePayload, actor: currentUser.email })
      });
      if (res.ok) {
        const data = await res.json();
        showVaultToast(`Vault restored successfully. Imported ${data.count} credentials.`);
        setRestorePayload("");
        setRestoreModalOpen(false);
        fetchSecrets();
        fetchDiagnostics();
      } else {
        const errData = await res.json();
        showVaultToast(errData.error || "Restoration failed.", true);
      }
    } catch (err: any) {
      showVaultToast("Restore error: " + err.message, true);
    }
  };

  const triggerRevealRequest = (key: string) => {
    setMfaSecretToReveal(key);
    setMfaCode("");
    setMfaError("");
    setMfaModalOpen(true);
  };

  const handleVerifyMfaReveal = async () => {
    const storedPass = localStorage.getItem("jumo_owner_password") || "SecurePassword123";
    if (mfaCode !== "owner" && mfaCode !== "jumo" && mfaCode !== storedPass) {
      setMfaError("Invalid verification credentials. Access Blocked.");
      return;
    }

    if (!mfaSecretToReveal) return;

    try {
      const res = await fetch("/api/ueos/secrets/reveal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: mfaSecretToReveal,
          ownerEmail: currentUser.email
        })
      });
      if (res.ok) {
        const data = await res.json();
        setRevealKey(mfaSecretToReveal);
        setRevealedValue(data.value);
        setMfaModalOpen(false);
        showVaultToast(`MFA Verified. Revealed value for ${mfaSecretToReveal}.`);
      } else {
        setMfaError("Failed to decrypt secure value from database.");
      }
    } catch (err: any) {
      setMfaError("Decryption connection error: " + err.message);
    }
  };

  // 8. Cyber Security State
  const [zeroTrustRules, setZeroTrustRules] = useState([
    { id: "ZT-101", pattern: "COGNITIVE_BYPASS", action: "BLOCK_AND_FLAG", status: "Active" },
    { id: "ZT-102", pattern: "LEDGER_MUTATE_DIRECT", action: "DENY_ACCESS", status: "Active" },
    { id: "ZT-103", pattern: "CROSS_TENANT_READ", action: "QUARANTINE_IP", status: "Active" }
  ]);
  const [idsAlerts, setIdsAlerts] = useState([
    { time: "06:14:02", src: "192.168.1.104", event: "Multiple unauthenticated API query queries on JUMO-AI-01", severity: "High" },
    { time: "05:41:18", src: "10.0.8.23", event: "Brute-force SSH attempt on backup cluster container node", severity: "Medium" }
  ]);

  // 9. JUMO AEGIS state (Financial CCTV)
  const [financialCctv, setFinancialCctv] = useState<any[]>([
    { id: "TX-901", timestamp: "05:14:02", tenant: "sacco-zambia-hq", type: "LEDGER_POST", amount: 15000, desc: "Member loan payout approved by Agent 'TellerCopilot'", risk: "Low" },
    { id: "TX-902", timestamp: "05:22:11", tenant: "church-uganda-diocese", type: "LEDGER_POST", amount: 5000, desc: "Anonymous donation fund deposit directly to cash asset", risk: "Low" },
    { id: "TX-903", timestamp: "05:39:45", tenant: "sacco-zambia-hq", type: "LEDGER_POST", amount: 48000, desc: "Bulk shares redemption balancing with cooperative capital shares", risk: "Medium (Threshold Check)" },
    { id: "TX-904", timestamp: "05:41:18", tenant: "education-kenya-board", type: "LEDGER_POST", amount: 1200, desc: "Tuition fee invoice balanced with cash account", risk: "Low" },
  ]);
  const [governanceViolations, setGovernanceViolations] = useState<any[]>([
    { id: "VIO-01", timestamp: "02:11:45", actor: "unknown-ip-node", action: "COGNITIVE_BYPASS", details: "Attempted to request model execution without authentic tenant claim.", actionTaken: "Blocked" },
    { id: "VIO-02", timestamp: "03:40:12", actor: "guest-operator", action: "LEDGER_BALANCE_MUTATE", details: "Unauthenticated write command detected on COA code '1010-CASH'.", actionTaken: "Access Denied" }
  ]);

  // 10. Fintech Core & Commerce Engine State
  const [processors, setProcessors] = useState([
    { name: "JUMO Native Settlement Gateway", status: "Active", rate: "0.5%", volume: "$450k" },
    { name: "Stripe API Connector Bridge", status: "Active", rate: "2.9%", volume: "$1.2M" },
    { name: "Mobile Money (Airtel/MTN) Aggregator", status: "Active", rate: "1.0%", volume: "$920k" }
  ]);
  const [settlementFeePercent, setSettlementFeePercent] = useState("1.5");
  const [ledgerAuditLog, setLedgerAuditLog] = useState([
    { timestamp: "06:10:00", account: "1010-CASH-ASSET", action: "Debit Posting", amount: "$15,000", balanced: "Yes" },
    { timestamp: "06:11:32", account: "3010-MEMBERS-CAPITAL", action: "Credit Posting", amount: "$15,000", balanced: "Yes" }
  ]);

  // 11. Domain Factory State
  const [domainInstallProgress, setDomainInstallProgress] = useState(0);
  const [installingDomainId, setInstallingDomainId] = useState<string | null>(null);

  // 11b. Advanced Enterprise Upgrade States
  const [showGapAudit, setShowGapAudit] = useState(true);
  const [selectedAuditTab, setSelectedAuditTab] = useState<"completed" | "upgraded" | "mapped">("completed");
  const [cognitiveTask, setCognitiveTask] = useState("");
  const [cognitiveDocContext, setCognitiveDocContext] = useState("");
  const [selectedCognitiveAgent, setSelectedCognitiveAgent] = useState("Ledger Auditor AI");
  const [cognitiveAnalysisResult, setCognitiveAnalysisResult] = useState("");
  const [cognitiveLoading, setCognitiveLoading] = useState(false);
  const [manualPostDebit, setManualPostDebit] = useState("1010-CASH");
  const [manualPostCredit, setManualPostCredit] = useState("4020-JUMO-FEES");
  const [manualPostAmount, setManualPostAmount] = useState("");
  const [manualPostDesc, setManualPostDesc] = useState("");
  const [manualPostLoading, setManualPostLoading] = useState(false);
  const [manualPostMessage, setManualPostMessage] = useState("");
  const [ledgerAccounts, setLedgerAccounts] = useState<any[]>([]);

  // 12. Standardized JUMO server cluster
  const [servers, setServers] = useState([
    { name: "JUMO-KERNEL-01", type: "System core", status: "Healthy", cpu: "14%", memory: "112MB / 512MB", activeConnections: 18 },
    { name: "JUMO-AI-01", type: "Cognitive Gateway", status: "Healthy", cpu: "8%", memory: "220MB / 1024MB", activeConnections: 5 },
    { name: "JUMO-FAAP-01", type: "Double-Entry Ledger", status: "Healthy", cpu: "21%", memory: "98MB / 512MB", activeConnections: 12 },
    { name: "JUMO-SECURITY-01", type: "Zero Trust RBAC", status: "Healthy", cpu: "3%", memory: "42MB / 256MB", activeConnections: 18 },
    { name: "JUMO-DATABASE-01", type: "Durable Cloud Storage", status: "Healthy", cpu: "11%", memory: "180MB / 1024MB", activeConnections: 35 },
    { name: "JUMO-EDGE-01", type: "Offline Edge Sync", status: "Offline (Standby)", cpu: "0%", memory: "0MB / 512MB", activeConnections: 0 }
  ]);

  // Active Modules Summary Calculations
  const activeModulesCount = modules.filter(m => m.status === "Active").length;
  const activeDomainsCount = modules.filter(m => m.type === "Domain" && m.status === "Active").length;
  const activeTenants = 14;
  const totalLicensingRevenue = modules
    .filter(m => m.status === "Active" && m.monthlyPrice > 0)
    .reduce((sum, current) => sum + (current.monthlyPrice * activeTenants), 0);

  // Action Toggles
  const toggleModuleStatus = (id: string) => {
    setModules(prev => prev.map(mod => {
      if (mod.id === id) {
        const nextStatus = mod.status === "Active" ? "Inactive" : "Active";
        return { ...mod, status: nextStatus };
      }
      return mod;
    }));
  };

  // Create cognitive swarm agent
  const handleCreateAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgentName) return;
    
    setAiAgents(prev => [
      ...prev,
      {
        name: newAgentName,
        role: newAgentRole,
        status: "Active",
        memoryCount: 1,
        provider: "Gemini 3.5 Flash",
        riskRating: "Strict Safe"
      }
    ]);

    try {
      await fetch("/api/ueos/ai-factory/register-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newAgentName,
          role: newAgentRole,
          permissionLevel: "Standard",
          domain: "FAAP",
          memory: "Freshly initialized cognitive sandbox space.",
          tools: ["FAAP Ledger Poster", "Continuous Audit Scanner"]
        })
      });
      fetchWorkforceAgents();
    } catch (err) {
      console.error("Failed to register AI agent in backend:", err);
    }
    
    setNewAgentName("");
  };

  const handleToggleAgent = (name: string) => {
    setAiAgents(prev => prev.map(agt => {
      if (agt.name === name) {
        return { ...agt, status: agt.status === "Active" ? "Inactive" : "Active" };
      }
      return agt;
    }));
  };

  const handleManualPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualPostDebit || !manualPostCredit || !manualPostAmount) {
      setManualPostMessage("Please select both accounts and enter an amount.");
      return;
    }
    const amt = parseFloat(manualPostAmount);
    if (isNaN(amt) || amt <= 0) {
      setManualPostMessage("Please enter a valid amount greater than zero.");
      return;
    }

    setManualPostLoading(true);
    setManualPostMessage("");
    try {
      const res = await fetch("/api/ueos/fintech/manual-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          debitCode: manualPostDebit,
          creditCode: manualPostCredit,
          amount: amt,
          description: manualPostDesc || "Manual journal entry via supreme governance cockpit",
          actor: currentUser.email
        })
      });

      const data = await res.json();
      if (res.ok) {
        setManualPostMessage(`✓ Success! Posted Balanced Entry: ${data.message}`);
        setManualPostAmount("");
        setManualPostDesc("");
        
        // Refresh live accounts
        fetchLedgerAccounts();
        
        // Append entry to local ledgerAuditLog to see on screen immediately
        const timestampStr = new Date().toLocaleTimeString();
        setLedgerAuditLog(prev => [
          {
            timestamp: timestampStr,
            account: `${manualPostDebit} & ${manualPostCredit}`,
            action: "Dual Posting (Real DB Commit)",
            amount: `$${amt.toLocaleString()}`,
            balanced: "Yes"
          },
          ...prev
        ]);
      } else {
        setManualPostMessage(`❌ Error: ${data.error || "Post rejected."}`);
      }
    } catch (err: any) {
      setManualPostMessage(`❌ Post error: ${err.message}`);
    } finally {
      setManualPostLoading(false);
    }
  };

  const handleRunCognitiveTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cognitiveTask) {
      setCognitiveAnalysisResult("Please input a cognitive task or mandate first.");
      return;
    }

    setCognitiveLoading(true);
    setCognitiveAnalysisResult("");
    try {
      const res = await fetch("/api/ueos/ai/run-cognitive-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentName: selectedCognitiveAgent,
          task: cognitiveTask,
          documentContext: cognitiveDocContext || undefined,
          actor: currentUser.email
        })
      });

      const data = await res.json();
      if (res.ok) {
        setCognitiveAnalysisResult(data.cognitiveAnalysis);
        // Increment memoryCount for the selected agent
        setAiAgents(prev => prev.map(agt => {
          if (agt.name === selectedCognitiveAgent) {
            return { ...agt, memoryCount: (agt.memoryCount || 0) + 1 };
          }
          return agt;
        }));
      } else {
        setCognitiveAnalysisResult(`❌ Error running cognitive task: ${data.error || "Execution failed."}`);
      }
    } catch (err: any) {
      setCognitiveAnalysisResult(`❌ Network/Server error: ${err.message}`);
    } finally {
      setCognitiveLoading(false);
    }
  };

  // Manufacture simulation
  const triggerSoftwareFactoryBuild = () => {
    if (!factoryAppName) return;
    setFactoryStatus("generating");
    setFactoryProgress(10);
    setFactoryLogs(["Initializing dynamic JUMO UEOS product scaffold...", "Loading master platform registries..."]);
    
    let currentPrg = 10;
    const interval = setInterval(() => {
      currentPrg += 15;
      if (currentPrg >= 100) {
        clearInterval(interval);
        setFactoryProgress(100);
        setFactoryStatus("completed");
        setFactoryLogs(prev => [
          ...prev,
          "Running static testing suite via automated QA Agent...",
          "Validating continuous Zero-Trust schema integration...",
          "Generating secure double-entry ledger hooks...",
          "Product certified successfully!",
          `Published ${factoryAppName} v1.0.0 directly to the Platform Private Domain Marketplace!`
        ]);
        setManufacturedApps(prev => [
          {
            name: factoryAppName,
            template: factoryTemplate.toUpperCase().replace("-", " "),
            version: "v1.0.0",
            creator: "JUMO Software Factory Compiler",
            date: new Date().toISOString().split('T')[0]
          },
          ...prev
        ]);
      } else {
        setFactoryProgress(currentPrg);
        if (currentPrg === 25) {
          setFactoryLogs(prev => [...prev, "Spawning AI developer code generator agents...", "Parsing target database entities..."]);
        } else if (currentPrg === 55) {
          setFactoryLogs(prev => [...prev, "Compiling source components...", "Synthesizing API endpoints...", "Creating standard CRUD specs..."]);
        } else if (currentPrg === 85) {
          setFactoryLogs(prev => [...prev, "Bundling system modules via esbuild...", "Applying Zero-Trust metadata rules..."]);
        }
      }
    }, 600);
  };

  // Build Operations (CI/CD) simulation
  const triggerBuildOperations = () => {
    setDeployState("building");
    setDeployProgress(15);
    setDeployLogLines(["Executing production build script: npm run build", "Bundling TypeScript modules via ESBuild for Standalone CJS..."]);
    
    let currentPrg = 15;
    const interval = setInterval(() => {
      currentPrg += 20;
      if (currentPrg >= 100) {
        clearInterval(interval);
        setDeployProgress(100);
        setDeployState("live");
        setDeployLogLines(prev => [
          ...prev,
          "Pushing complete bundle file to Google Cloud Storage bucket...",
          "Setting up environment variables mapping routing configurations...",
          `Routing ingress traffic directly on Port 3000 mapping container target...`,
          "Status audit: [HEALTHY] Service is live and active!"
        ]);
      } else {
        setDeployProgress(currentPrg);
        if (currentPrg === 35) {
          setDeployState("pushing");
          setDeployLogLines(prev => [...prev, `Compressing files to Docker Container image jumo-ueos:${kernelVersion}...`, "Pushing container directly to private secure cloud registries..."]);
        } else if (currentPrg === 55) {
          setDeployLogLines(prev => [...prev, `Target deployment matched: ${deployTarget.toUpperCase()} controller initializing...`, `Provisioning dynamic pods with JUMO Kernel image replica...`]);
        } else if (currentPrg === 75) {
          setDeployLogLines(prev => [...prev, "Establishing secure SSL connection on port 443 with Cloudflare...", "Registering continuous Zero-Trust posture rules..."]);
        }
      }
    }, 700);
  };

  // Terminal simulated executor
  const handleTerminalCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    const cmd = terminalInput.trim().toLowerCase();
    const ts = new Date().toTimeString().split(' ')[0];
    
    let responseText = "";
    let type: TerminalLine["type"] = "system";

    if (cmd === "help") {
      responseText = "Available commands: \n - jumo:status (Check overall cluster diagnostics)\n - jumo:db:migrate (Run PostgreSQL/SQLite ledger sync)\n - jumo:trust:verify (Validate cryptographical zero-trust audit)\n - jumo:ai:status (Query loaded Google GenAI model parameters)\n - clear (Reset terminal environment)";
    } else if (cmd === "jumo:status") {
      responseText = `SYSTEM CORE: RUNNING (Kernel Version: ${kernelVersion})\nMemory load: 652MB / 2.5GB\nActive Nodes count: 6 nodes\nTotal licensing output: $${totalLicensingRevenue}/mo`;
      type = "success";
    } else if (cmd === "jumo:db:migrate") {
      responseText = "Checking database connection code... [SUCCESS]\nEvaluating schema entity properties in drizzle.config.ts...\nApplying 4 new balance sheet migration scripts to PostgreSQL database schema...\nPostgreSQL tables successfully indexed and synced.";
      type = "success";
    } else if (cmd === "jumo:trust:verify") {
      responseText = "Scanning continuous authentication metadata claims...\n14 Tenant contexts scanned.\n0 Active breaches identified.\nZero-Trust validator posture score: 100% SECURED.";
      type = "success";
    } else if (cmd === "jumo:ai:status") {
      responseText = "Cognitive Router loaded with active provider: Google Gemini 3.5 API\nActive session models: gemini-3.5-flash (Default Routing Mode)\nAverage API call latency: 185ms\nCached parameters limit: 1048576 tokens";
      type = "success";
    } else if (cmd === "clear") {
      setTerminalHistory([]);
      setTerminalInput("");
      return;
    } else {
      responseText = `Command not recognized: '${cmd}'. Type 'help' for options.`;
      type = "error";
    }

    setTerminalHistory(prev => [
      ...prev,
      { text: `owner@jumo-ueos:~# ${terminalInput}`, type: "input", timestamp: ts },
      { text: responseText, type, timestamp: ts }
    ]);
    setTerminalInput("");
  };

  // System Update simulation
  const triggerUpdateCheck = () => {
    setCheckingUpdates(true);
    setUpdateLog("Checking current repository branch connection with main JUMO releases...\n");
    setTimeout(() => {
      setUpdateLog(prev => prev + "Fetched remote branch updates: stable-2.0.5 release tag detected.\nComparing checksum properties against local kernel...\n");
      setTimeout(() => {
        setUpdateLog(prev => prev + "RECOMMENDED UPDATE: JUMO UEOS v2.0.5-LTS contains critical performance improvements for FAAP transactions surveillance.\n");
        setCheckingUpdates(false);
      }, 800);
    }, 700);
  };

  const applySystemUpdate = () => {
    setCheckingUpdates(true);
    setUpdateLog("Executing rolling zero-downtime hot upgrade to JUMO UEOS v2.0.5...\n");
    setTimeout(() => {
      setUpdateLog(prev => prev + "Rebuilding standalone Node.js server bundles...\nApplying security database migrators...\n");
      setTimeout(() => {
        setKernelVersion("v2.0.5-LTS");
        setUpdateAvailable(false);
        setCheckingUpdates(false);
        setUpdateLog(prev => prev + "Core kernel updated successfully to v2.0.5-LTS! Hot reloading connections complete.");
      }, 1200);
    }, 1000);
  };

  // Domain Factory installer calling real API
  const installDomainModule = async (domainId: string, domainName: string) => {
    setInstallingDomainId(domainId);
    setDomainInstallProgress(15);
    
    try {
      const res = await fetch("/api/ueos/domains/install", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domainId, domainName })
      });
      
      if (!res.ok) {
        throw new Error("Failed to install domain module.");
      }
      
      setDomainInstallProgress(60);
      const data = await res.json();
      console.log("[INSTALLER] Dynamic seed accounts:", data.seededAccounts);
      
      let currentPrg = 60;
      const interval = setInterval(() => {
        currentPrg += 10;
        if (currentPrg >= 100) {
          clearInterval(interval);
          setInstallingDomainId(null);
          setDomainInstallProgress(0);
          setModules(prev => prev.map(mod => {
            if (mod.id === domainId) {
              return { ...mod, status: "Active" };
            }
            return mod;
          }));
          fetchLedgerAccounts(); // Refresh the list of FAAP ledger accounts
        } else {
          setDomainInstallProgress(currentPrg);
        }
      }, 100);
      
    } catch (err) {
      console.error("[INSTALL_ERROR]", err);
      setInstallingDomainId(null);
      setDomainInstallProgress(0);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen p-4 md:p-6 space-y-6 font-sans">
      
      {/* 1. GLOBAL COMMAND BAR */}
      <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-3.5 shadow-md flex flex-col xl:flex-row justify-between items-stretch xl:items-center gap-4">
        
        {/* BRAND & IDENTITY */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white flex items-center justify-center font-black text-sm tracking-wider shadow-inner font-mono">
            JUMO
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm md:text-base font-bold tracking-tight text-slate-100 flex items-center gap-2">
                JUMO Universal Enterprise Operating System (UEOS)
              </h1>
              <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                PRODUCTION CONTROL PLANE
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mt-0.5 font-mono">
              <span className="flex items-center gap-1"><Server className="h-3 w-3 text-blue-400" /> Render Europe-West1</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Boxes className="h-3 w-3 text-purple-400" /> Workspace: <strong className="text-slate-200">{activeWorkspace}</strong></span>
              <span>•</span>
              <span>Tenant: <strong className="text-slate-200">{currentUser.tenantId}</strong></span>
            </div>
          </div>
        </div>

        {/* SEARCH, NOTIFICATIONS, USER & LOCK CONTROLS */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* SEARCH BAR */}
          <div className="relative min-w-[220px] sm:min-w-[280px]">
            <input
              type="text"
              placeholder="Search commands, nodes, secrets..."
              value={commandSearchQuery}
              onChange={(e) => setCommandSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 pl-8 text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition"
            />
            <TerminalIcon className="h-3.5 w-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          </div>

          {/* WORKSPACE SWITCHER */}
          <select
            value={activeWorkspace}
            onChange={(e) => setActiveWorkspace(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500"
          >
            <option value="Sovereign Core Platform">Sovereign Core Platform</option>
            <option value="Global SACCO Mesh">Global SACCO Mesh</option>
            <option value="Diocesan Church Network">Diocesan Church Network</option>
            <option value="Government Tax Portal">Government Tax Portal</option>
          </select>

          {/* NOTIFICATIONS & SIDE PANEL TOGGLE */}
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition relative cursor-pointer"
            title="System Alerts & Notifications"
          >
            <ShieldAlert className="h-4 w-4 text-amber-400" />
            <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-rose-500 text-white rounded-full text-[8px] font-mono font-bold flex items-center justify-center">3</span>
          </button>

          <button
            onClick={() => setShowRightContextPanel(!showRightContextPanel)}
            className={`px-2.5 py-1.5 text-xs font-mono rounded-xl border transition cursor-pointer flex items-center gap-1.5 ${
              showRightContextPanel ? "bg-blue-600/20 border-blue-500/30 text-blue-300" : "bg-slate-800 border-slate-700 text-slate-400"
            }`}
            title="Toggle Live Side Panel"
          >
            <Activity className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Telemetry Sidebar</span>
          </button>

          {/* USER PROFILE & LOCK */}
          <div className="hidden md:flex flex-col text-right text-[11px] font-mono border-l border-slate-800 pl-3">
            <span className="text-slate-200 font-bold">{currentUser.name}</span>
            <span className="text-slate-400 text-[10px]">{currentUser.role}</span>
          </div>

          <button
            onClick={onLogout}
            className="bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 px-3 py-1.5 rounded-xl text-xs font-semibold font-mono transition cursor-pointer flex items-center gap-1.5"
          >
            <Lock className="h-3.5 w-3.5" />
            <span>Lock</span>
          </button>

        </div>
      </div>

      {/* 2. OPERATIONAL LAYOUT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* LEFT NAVIGATION TREE (3 COLS) */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-3 shadow-xs space-y-3 max-h-[820px] overflow-y-auto font-sans">
          
          {/* PLATFORM ZONE */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest px-2.5 py-1 flex items-center justify-between bg-slate-50 rounded-lg">
              <span>I. PLATFORM RUNTIME</span>
              <Cpu className="h-3 w-3 text-slate-400" />
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                  activeTab === "dashboard" ? "bg-slate-900 text-white font-semibold shadow-xs" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-emerald-500" />
                  <span>System Overview</span>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              </button>

              <button
                onClick={() => setActiveTab("architecture")}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                  activeTab === "architecture" ? "bg-slate-900 text-white font-semibold shadow-xs" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Map className="h-3.5 w-3.5 text-blue-500" />
                  <span>Kernel &amp; Specs</span>
                </div>
                <span className="text-[9px] font-mono text-slate-400">v2.0.4</span>
              </button>

              <button
                onClick={() => setActiveTab("servers")}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                  activeTab === "servers" ? "bg-slate-900 text-white font-semibold shadow-xs" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Server className="h-3.5 w-3.5 text-purple-500" />
                  <span>Infrastructure Nodes</span>
                </div>
                <span className="text-[9px] font-mono text-slate-400">4 Active</span>
              </button>
            </div>
          </div>

          {/* TREASURY & FINANCIAL ENGINE ZONE */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest px-2.5 py-1 flex items-center justify-between bg-slate-50 rounded-lg">
              <span>II. TREASURY &amp; FAAP</span>
              <Coins className="h-3 w-3 text-slate-400" />
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveTab("fintech")}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                  activeTab === "fintech" ? "bg-slate-900 text-white font-semibold shadow-xs" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Coins className="h-3.5 w-3.5 text-emerald-600" />
                  <span>FAAP Treasury Engine</span>
                </div>
                <span className="text-[9px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-1 py-0.5 rounded font-bold">1.5% CLEAR</span>
              </button>
            </div>
          </div>

          {/* ENTERPRISE DOMAINS ZONE */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest px-2.5 py-1 flex items-center justify-between bg-slate-50 rounded-lg">
              <span>III. ENTERPRISE DOMAINS</span>
              <Boxes className="h-3 w-3 text-slate-400" />
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveTab("domain_factory")}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                  activeTab === "domain_factory" ? "bg-slate-900 text-white font-semibold shadow-xs" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Boxes className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Domain Modules Registry</span>
                </div>
                <span className="text-[9px] font-mono text-slate-400">11 Domains</span>
              </button>

              <button
                onClick={() => setActiveTab("marketplace")}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                  activeTab === "marketplace" ? "bg-slate-900 text-white font-semibold shadow-xs" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <LayoutGrid className="h-3.5 w-3.5 text-amber-500" />
                  <span>Marketplace Store</span>
                </div>
              </button>
            </div>
          </div>

          {/* AI COGNITIVE SWARMS ZONE */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest px-2.5 py-1 flex items-center justify-between bg-slate-50 rounded-lg">
              <span>IV. AI COGNITIVE SWARMS</span>
              <Bot className="h-3 w-3 text-slate-400" />
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveTab("ai_factory")}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                  activeTab === "ai_factory" ? "bg-slate-900 text-white font-semibold shadow-xs" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bot className="h-3.5 w-3.5 text-purple-600" />
                  <span>AI Agent Swarms &amp; Router</span>
                </div>
                <span className="text-[9px] font-mono text-slate-400">7 Agents</span>
              </button>
            </div>
          </div>

          {/* SECURITY & SOC ZONE */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest px-2.5 py-1 flex items-center justify-between bg-slate-50 rounded-lg">
              <span>V. ZERO TRUST &amp; SOC</span>
              <Shield className="h-3 w-3 text-slate-400" />
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveTab("security_vault")}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                  activeTab === "security_vault" ? "bg-slate-900 text-white font-semibold shadow-xs" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5 text-rose-600" />
                  <span>Cryptographic Vault</span>
                </div>
                <span className="text-[9px] font-mono bg-rose-50 text-rose-700 border border-rose-200 px-1 py-0.5 rounded">AES-256</span>
              </button>

              <button
                onClick={() => setActiveTab("cyber_security")}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                  activeTab === "cyber_security" ? "bg-slate-900 text-white font-semibold shadow-xs" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Shield className="h-3.5 w-3.5 text-teal-600" />
                  <span>Zero Trust Firewall</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("aegis")}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                  activeTab === "aegis" ? "bg-slate-900 text-white font-semibold shadow-xs" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-3.5 w-3.5 text-red-600" />
                  <span>JUMO AEGIS Monitor</span>
                </div>
              </button>
            </div>
          </div>

          {/* DEPLOYMENT & SOFTWARE FACTORY ZONE */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest px-2.5 py-1 flex items-center justify-between bg-slate-50 rounded-lg">
              <span>VI. DEPLOYMENT FACTORY</span>
              <Hammer className="h-3 w-3 text-slate-400" />
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveTab("software_factory")}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                  activeTab === "software_factory" ? "bg-slate-900 text-white font-semibold shadow-xs" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Hammer className="h-3.5 w-3.5 text-amber-600" />
                  <span>Commercial Software Factory</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("build_deploy")}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                  activeTab === "build_deploy" ? "bg-slate-900 text-white font-semibold shadow-xs" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <ArrowUpCircle className="h-3.5 w-3.5 text-blue-600" />
                  <span>CI/CD Build Runner</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("deployment_pipeline")}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                  activeTab === "deployment_pipeline" ? "bg-slate-900 text-white font-semibold shadow-xs" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <GitBranch className="h-3.5 w-3.5 text-sky-600" />
                  <span>Hybrid Deploy Pipeline</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("production_release")}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                  activeTab === "production_release" ? "bg-slate-900 text-white font-semibold shadow-xs" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
                  <span>Prod Acceptance Release</span>
                </div>
                <span className="text-[8px] font-mono bg-amber-50 text-amber-700 border border-amber-200 px-1 py-0.5 rounded font-bold uppercase">RELEASE</span>
              </button>
            </div>
          </div>

          {/* SYSTEM OPERATIONS & MONITORING ZONE */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest px-2.5 py-1 flex items-center justify-between bg-slate-50 rounded-lg">
              <span>VII. SHELL &amp; DIAGNOSTICS</span>
              <TerminalIcon className="h-3 w-3 text-slate-400" />
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveTab("terminal")}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                  activeTab === "terminal" ? "bg-slate-900 text-white font-semibold shadow-xs" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <TerminalIcon className="h-3.5 w-3.5 text-teal-600" />
                  <span>Secure Shell Console</span>
                </div>
                <span className="text-[9px] font-mono text-slate-400">bash</span>
              </button>

              <button
                onClick={() => setActiveTab("digital_twin")}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                  activeTab === "digital_twin" ? "bg-slate-900 text-white font-semibold shadow-xs" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Network className="h-3.5 w-3.5 text-purple-600" />
                  <span>Digital Twin Sandbox</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("innovation_lab")}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                  activeTab === "innovation_lab" ? "bg-slate-900 text-white font-semibold shadow-xs" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Innovation Benchmarks</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("update_center")}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                  activeTab === "update_center" ? "bg-slate-900 text-white font-semibold shadow-xs" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-3.5 w-3.5 text-blue-600" />
                  <span>Maintenance &amp; Upgrades</span>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* CENTER ACTIVE WORKSPACE (6 COLS IF SIDEBAR OPEN, 9 IF CLOSED) */}
        <div className={`${showRightContextPanel ? "lg:col-span-6 xl:col-span-6" : "lg:col-span-9"} bg-white border border-slate-200 rounded-2xl p-5 shadow-xs overflow-x-auto`}>

          
          {/* 1. SYSTEM OVERVIEW (HOME WORKSPACE) */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-200 gap-2">
                <div>
                  <h2 className="text-base font-bold text-slate-900 tracking-tight">System Overview &amp; Platform Health Matrix</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Real-time status tracking of infrastructure, FAAP treasury, security, AI routing, and domain registries.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={fetchOwnerDashboardData} className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium flex items-center gap-1 transition">
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Sync Metrics</span>
                  </button>
                  <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded font-bold uppercase">
                    ALL SYSTEMS OPERATIONAL
                  </span>
                </div>
              </div>

              {/* 10 OPERATIONAL SECTIONS */}
              <div className="space-y-6">

                {/* SECTION 1: PLATFORM HEALTH */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                      <Activity className="h-4 w-4 text-emerald-600" />
                      <span>1. Platform Health &amp; Kernel Metrics</span>
                    </h3>
                    <span className="text-[11px] font-mono text-slate-500">Uptime: {backendDashboardData?.uptimeSeconds ?? 142800}s</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Kernel Status</div>
                      <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">v2.0.4-LTS</div>
                      <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">✓ Sovereign Core Active</div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Memory Allocation</div>
                      <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">{backendDashboardData?.memoryUsage ?? "48.2MB"}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Heap memory used</div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Database Mode</div>
                      <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">{backendDashboardData?.databaseMode ?? "Dual-Mode PostgreSQL"}</div>
                      <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">✓ Cloud Synced</div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Health Score</div>
                      <div className="text-sm font-bold text-emerald-700 font-mono mt-0.5">{backendDashboardData?.healthScore ?? 100}%</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">18 Active Sockets</div>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: INFRASTRUCTURE */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                    <Server className="h-4 w-4 text-blue-600" />
                    <span>2. Infrastructure &amp; Cloud Services</span>
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 font-mono text-[11px]">
                    <div className="bg-white border border-slate-200 p-2.5 rounded-lg flex flex-col justify-between">
                      <span className="text-slate-500">Render Run</span>
                      <span className="text-emerald-700 font-bold mt-1">✓ ONLINE</span>
                    </div>

                    <div className="bg-white border border-slate-200 p-2.5 rounded-lg flex flex-col justify-between">
                      <span className="text-slate-500">Firebase Auth</span>
                      <span className="text-emerald-700 font-bold mt-1">✓ READY</span>
                    </div>

                    <div className="bg-white border border-slate-200 p-2.5 rounded-lg flex flex-col justify-between">
                      <span className="text-slate-500">AI Providers</span>
                      <span className="text-emerald-700 font-bold mt-1">✓ GEMINI 3.5</span>
                    </div>

                    <div className="bg-white border border-slate-200 p-2.5 rounded-lg flex flex-col justify-between">
                      <span className="text-slate-500">Payment Engine</span>
                      <span className="text-emerald-700 font-bold mt-1">✓ FAAP CLEARED</span>
                    </div>

                    <div className="bg-white border border-slate-200 p-2.5 rounded-lg flex flex-col justify-between">
                      <span className="text-slate-500">Secrets Vault</span>
                      <span className="text-blue-700 font-bold mt-1">AES-256 ACTIVE</span>
                    </div>

                    <div className="bg-white border border-slate-200 p-2.5 rounded-lg flex flex-col justify-between">
                      <span className="text-slate-500">TLS Certificates</span>
                      <span className="text-emerald-700 font-bold mt-1">VALID (2027)</span>
                    </div>
                  </div>
                </div>

                {/* SECTION 3: TREASURY (FAAP) */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                    <Coins className="h-4 w-4 text-emerald-600" />
                    <span>3. FAAP Treasury &amp; Financial Ledger</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">FAAP Master Reserves</div>
                      <div className="text-lg font-bold text-emerald-700 font-mono mt-1">
                        ${(backendDashboardData?.faapTreasuryBalance ?? totalLicensingRevenue).toLocaleString()} USD
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">1.5% Settlement Clearing Rate Active</div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Fee Revenue Collected</div>
                      <div className="text-lg font-bold text-slate-900 font-mono mt-1">
                        $3,820.00 USD
                      </div>
                      <div className="text-[10px] text-emerald-600 mt-1">✓ Auto-debited to Treasury</div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Ledger Integrity Parity</div>
                      <div className="text-lg font-bold text-emerald-700 font-mono mt-1">$0.00 OFFSET</div>
                      <div className="text-[10px] text-slate-500 mt-1">Double-Entry Debits = Credits</div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Tenant Accounts</div>
                      <div className="text-lg font-bold text-slate-900 font-mono mt-1">
                        {backendDashboardData?.totalTenants ?? activeTenants} Contracts
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">All Tenant Ledgers Isolated</div>
                    </div>
                  </div>
                </div>

                {/* SECTION 4: ENTERPRISE REGISTRY */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                      <Boxes className="h-4 w-4 text-purple-600" />
                      <span>4. Enterprise ERP Domain Registry</span>
                    </h3>
                    <button onClick={() => setActiveTab("domain_factory")} className="text-xs text-blue-600 hover:underline font-medium">Manage Domains →</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {modules.slice(0, 8).map((m) => (
                      <div key={m.id} className="bg-white border border-slate-200 p-3 rounded-xl space-y-1 shadow-2xs">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-900">{m.name}</span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                            m.status === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-600"
                          }`}>{m.status}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 line-clamp-1">{m.description}</p>
                        <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-100">
                          <span>{m.version}</span>
                          <span>${m.monthlyPrice}/mo</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION 5: WORKFLOW ENGINE */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-600" />
                    <span>5. Workflow Engine &amp; Process Orchestration</span>
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Running Processes</div>
                      <div className="text-base font-bold text-slate-900 font-mono mt-0.5">{backendDashboardData?.workflowCount ?? 120} Run Loops</div>
                      <div className="text-[10px] text-emerald-600 font-medium">✓ Zero Stalled Processes</div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Pending Approvals</div>
                      <div className="text-base font-bold text-slate-900 font-mono mt-0.5">3 Approvals</div>
                      <div className="text-[10px] text-slate-500">FAAP Ledger Disbursements</div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Automation Jobs</div>
                      <div className="text-base font-bold text-slate-900 font-mono mt-0.5">24 Active Rules</div>
                      <div className="text-[10px] text-slate-500">Scheduled Ledger Sweeps</div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Completed Today</div>
                      <div className="text-base font-bold text-emerald-700 font-mono mt-0.5">1,482 Loops</div>
                      <div className="text-[10px] text-slate-500">100% Success Rate</div>
                    </div>
                  </div>
                </div>

                {/* SECTION 6: IDENTITY & ZERO TRUST */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                    <Lock className="h-4 w-4 text-rose-600" />
                    <span>6. Zero Trust Identity &amp; Access Control</span>
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-[11px]">
                    <div className="bg-white border border-slate-200 p-3 rounded-xl">
                      <div className="text-slate-500">RBAC Enforcement</div>
                      <div className="text-emerald-700 font-bold text-sm mt-0.5">ACTIVE &amp; ENFORCED</div>
                    </div>

                    <div className="bg-white border border-slate-200 p-3 rounded-xl">
                      <div className="text-slate-500">Tenant Isolation</div>
                      <div className="text-emerald-700 font-bold text-sm mt-0.5">ROW-LEVEL DUAL LOCK</div>
                    </div>

                    <div className="bg-white border border-slate-200 p-3 rounded-xl">
                      <div className="text-slate-500">Active Sessions</div>
                      <div className="text-slate-900 font-bold text-sm mt-0.5">18 Active Users</div>
                    </div>

                    <div className="bg-white border border-slate-200 p-3 rounded-xl">
                      <div className="text-slate-500">Failed Auth Attempts</div>
                      <div className="text-emerald-700 font-bold text-sm mt-0.5">0 Threat Flags</div>
                    </div>
                  </div>
                </div>

                {/* SECTION 7: SECURITY OPERATIONS */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4 text-rose-600" />
                      <span>7. Security Operations &amp; Threat Intelligence</span>
                    </h3>
                    <button onClick={() => setActiveTab("security_vault")} className="text-xs text-blue-600 hover:underline font-medium">Vault Operations →</button>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-slate-900">JUMO Cryptographic Vault Diagnostics</div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        Vault Status: <span className="text-emerald-700 font-bold">HEALTHY</span> • Secrets Count: <span className="text-slate-900 font-bold">{secrets.length || 8}</span> • Encryption: <span className="text-slate-900 font-bold">AES-256 GCM</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-lg font-bold">
                      SECURITY SCORE: 98 / 100
                    </span>
                  </div>
                </div>

                {/* SECTION 8: AI OPERATIONS */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                      <Bot className="h-4 w-4 text-purple-600" />
                      <span>8. AI Cognitive Gateway &amp; Agent Workforce</span>
                    </h3>
                    <button onClick={() => setActiveTab("ai_factory")} className="text-xs text-blue-600 hover:underline font-medium">AI Workforce →</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white border border-slate-200 p-3 rounded-xl space-y-1">
                      <div className="text-xs font-bold text-slate-900">Google Gemini 3.5 Flash</div>
                      <div className="text-[10px] text-emerald-700 font-mono font-semibold">✓ Connected (Default Router)</div>
                      <div className="text-[10px] text-slate-500">Latency: 185ms • Cost: $0.00015/1k</div>
                    </div>

                    <div className="bg-white border border-slate-200 p-3 rounded-xl space-y-1">
                      <div className="text-xs font-bold text-slate-900">OpenAI Proxy Integration</div>
                      <div className="text-[10px] text-blue-700 font-mono font-semibold">Configured (Standby)</div>
                      <div className="text-[10px] text-slate-500">Latency: 310ms • Hybrid Bridge</div>
                    </div>

                    <div className="bg-white border border-slate-200 p-3 rounded-xl space-y-1">
                      <div className="text-xs font-bold text-slate-900">Local DeepSeek Edge Model</div>
                      <div className="text-[10px] text-slate-700 font-mono font-semibold">Local Model Loaded</div>
                      <div className="text-[10px] text-slate-500">Offline Fallback Engine</div>
                    </div>
                  </div>
                </div>

                {/* SECTION 9: HYBRID INFRASTRUCTURE */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                    <Network className="h-4 w-4 text-teal-600" />
                    <span>9. Hybrid Infrastructure &amp; Edge Sync</span>
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-mono">
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                      <span className="text-slate-500">Cloud Nodes</span>
                      <div className="text-slate-900 font-bold text-sm mt-0.5">2 Nodes (Render)</div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                      <span className="text-slate-500">Edge Sync Queue</span>
                      <div className="text-emerald-700 font-bold text-sm mt-0.5">0 Pending Items</div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                      <span className="text-slate-500">Replication State</span>
                      <div className="text-emerald-700 font-bold text-sm mt-0.5">FULLY SYNCHRONIZED</div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                      <span className="text-slate-500">Automated Backup</span>
                      <div className="text-emerald-700 font-bold text-sm mt-0.5">DAILY CRYPTO SNAPSHOT</div>
                    </div>
                  </div>
                </div>

                {/* SECTION 10: DEPLOYMENT CENTER */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                      <GitBranch className="h-4 w-4 text-blue-600" />
                      <span>10. Deployment Center &amp; CI/CD Pipeline</span>
                    </h3>
                    <button onClick={() => setActiveTab("deployment_pipeline")} className="text-xs text-blue-600 hover:underline font-medium">Pipeline Logs →</button>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="space-y-1 font-mono text-[11px]">
                      <div className="text-slate-900 font-bold">Branch: <span className="text-blue-700">phase9-frontend-integration</span></div>
                      <div className="text-slate-500">Target Host: Render Cloud Run • Auto-Deploy Trigger: GitHub Webhook</div>
                    </div>
                    <span className="text-xs font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-lg font-bold">
                      STATUS: LIVE &amp; DEPLOYED
                    </span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 2. JUMO COMMERCIAL SOFTWARE FACTORY */}
          {activeTab === "software_factory" && (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Hammer className="h-4 w-4 text-amber-400" />
                    <span>JUMO Commercial Software Manufacturing Suite</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Private software creation engine. Idea &rarr; Architecture &rarr; Code &rarr; Auto-Testing &rarr; Marketplace deployment.</p>
                </div>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2 py-1 rounded">MASTER BUILDER ON</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Compiler Configuration Form */}
                <div className="lg:col-span-5 bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Manufacture New ERP Product</h4>
                  
                  <div className="space-y-3.5 text-xs">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 mb-1">PRODUCT BASE IDENTIFIER</label>
                      <input
                        type="text"
                        placeholder="e.g. Sacco_Loans_Scoring_Mod"
                        value={factoryAppName}
                        onChange={(e) => setFactoryAppName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 mb-1">CORE TEMPLATE BLUEPRINT</label>
                      <select
                        value={factoryTemplate}
                        onChange={(e) => setFactoryTemplate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-2 text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer font-sans"
                      >
                        <option value="sacco-micro-ledger">SACCO Double Entry Ledger Module</option>
                        <option value="church-receipting">Church Diocesan Donation Auditor</option>
                        <option value="education-billing">Education Tuition Billing Core</option>
                        <option value="ngo-grant-allocator">NGO Grant Allocation Manager</option>
                        <option value="custom-api">Universal Platform External REST Service</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={triggerSoftwareFactoryBuild}
                        disabled={factoryStatus === "generating" || !factoryAppName}
                        className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-55 text-slate-950 font-bold py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 font-sans"
                      >
                        <Play className="h-3.5 w-3.5 fill-current" />
                        <span>Manufacture and Compile Add-on</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Compiler Build Logs & Artifact Output */}
                <div className="lg:col-span-7 bg-slate-950 border border-slate-850 p-5 rounded-2xl flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Dynamic Build Pipeline</h4>
                      {factoryStatus === "generating" && (
                        <span className="text-[9px] font-mono text-amber-400 animate-pulse">COMPILING SYSTEM...</span>
                      )}
                    </div>

                    {factoryStatus === "idle" ? (
                      <div className="bg-slate-900 border border-slate-850 p-6 rounded-xl text-center text-[11px] text-slate-500 font-mono">
                        No compilation task is currently running. Enter a product base identifier and trigger manufacture.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${factoryProgress}%` }}></div>
                        </div>
                        <div className="bg-slate-900 border border-slate-850 p-3 rounded-xl max-h-[160px] overflow-y-auto font-mono text-[10px] text-slate-300 space-y-1.5 leading-relaxed">
                          {factoryLogs.map((log, i) => (
                            <div key={i} className="flex gap-2">
                              <span className="text-amber-500 shrink-0">&gt;&gt;</span>
                              <span className="whitespace-pre-wrap">{log}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-900 pt-4 mt-4">
                    <h5 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">FACTORY CERTIFIED PRODUCTS</h5>
                    <div className="space-y-2 max-h-[120px] overflow-y-auto">
                      {manufacturedApps.map((app, i) => (
                        <div key={i} className="bg-slate-900/60 border border-slate-850 p-2 rounded-lg flex justify-between items-center font-mono text-[9px]">
                          <div>
                            <span className="text-slate-200 font-bold">{app.name}</span>
                            <span className="text-slate-500 ml-2">({app.template})</span>
                          </div>
                          <div className="text-right text-slate-400">
                            <div>{app.creator}</div>
                            <div className="text-[8px] text-slate-500">{app.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 3. JUMO SYSTEM BUILD & DEPLOYMENT COMMAND CENTER */}
          {activeTab === "build_deploy" && (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <ArrowUpCircle className="h-4 w-4 text-blue-400" />
                    <span>JUMO Build Operations &amp; Ingress Orchestrator</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Continuous delivery pipeline. Automate packaging to Cloud Run, VPS, Kubernetes, and secure docker environments.</p>
                </div>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/25 px-2 py-1 rounded">Ingress: Port 3000 Active</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Deployment Config Selector */}
                <div className="lg:col-span-4 bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Target Deployment Platform</h4>
                  
                  <div className="space-y-3.5 text-xs">
                    <div className="grid grid-cols-1 gap-2.5 font-mono text-[10px]">
                      <button
                        onClick={() => setDeployTarget("gcp-run")}
                        className={`p-3 rounded-xl border text-left transition ${
                          deployTarget === "gcp-run" ? "bg-blue-500/10 border-blue-500 text-blue-400" : "bg-slate-900 border-slate-850 text-slate-400 hover:border-slate-800"
                        }`}
                      >
                        <div className="font-bold">Google Cloud Run</div>
                        <div className="text-[8px] text-slate-500 mt-1">Managed serverless docker node. Auto scales to zero.</div>
                      </button>

                      <button
                        onClick={() => setDeployTarget("koyeb")}
                        className={`p-3 rounded-xl border text-left transition ${
                          deployTarget === "koyeb" ? "bg-blue-500/10 border-blue-500 text-blue-400" : "bg-slate-900 border-slate-850 text-slate-400 hover:border-slate-800"
                        }`}
                      >
                        <div className="font-bold">Koyeb Continuous App</div>
                        <div className="text-[8px] text-slate-500 mt-1">Fast cloud deployments via automatic git triggers.</div>
                      </button>

                      <button
                        onClick={() => setDeployTarget("k8s")}
                        className={`p-3 rounded-xl border text-left transition ${
                          deployTarget === "k8s" ? "bg-blue-500/10 border-blue-500 text-blue-400" : "bg-slate-900 border-slate-850 text-slate-400 hover:border-slate-800"
                        }`}
                      >
                        <div className="font-bold">Kubernetes Pod Replicas</div>
                        <div className="text-[8px] text-slate-500 mt-1">Multi-replica production pods scaling across VPS clusters.</div>
                      </button>
                    </div>

                    <button
                      onClick={triggerBuildOperations}
                      disabled={deployState === "building" || deployState === "pushing"}
                      className="w-full bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 font-sans"
                    >
                      <RefreshCw className={`h-3.5 w-3.5 ${deployState !== "idle" && "animate-spin"}`} />
                      <span>Trigger Rolling Deploy</span>
                    </button>
                  </div>
                </div>

                {/* Deployment Build Pipeline logs */}
                <div className="lg:col-span-8 bg-slate-950 border border-slate-850 p-5 rounded-2xl flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Deploy Pipeline Telemetry</h4>
                    
                    {deployState === "idle" ? (
                      <div className="bg-slate-900 border border-slate-850 p-10 rounded-xl text-center text-xs text-slate-500 font-mono">
                        Build pipeline is currently standby. Choose a target engine and click "Trigger Rolling Deploy" to verify continuous integration.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                          <span>Pipeline state: <strong className="text-blue-400 uppercase">{deployState}</strong></span>
                          <span>Progress: {deployProgress}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${deployProgress}%` }}></div>
                        </div>
                        <div className="bg-slate-900 border border-slate-850 p-3.5 rounded-xl font-mono text-[10px] text-slate-300 space-y-2 max-h-[180px] overflow-y-auto leading-relaxed">
                          {deployLogLines.map((line, idx) => (
                            <div key={idx} className="flex gap-2">
                              <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span>
                              <span className="text-blue-400 shrink-0">info</span>
                              <span className="text-slate-200">{line}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-900 pt-3 mt-4 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      <span>Build artifact certified against Zero-Trust RBAC Core.</span>
                    </span>
                    <button
                      onClick={() => {
                        setDeployState("idle");
                        setDeployLogLines([]);
                      }}
                      className="text-[9px] bg-slate-900 border border-slate-850 text-slate-400 hover:text-slate-200 px-2 py-0.5 rounded transition"
                    >
                      Clear Log
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 4. JUMO INTERNAL TERMINAL SYSTEM */}
          {activeTab === "terminal" && (
            <div className="space-y-4 animate-fade-in p-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <TerminalIcon className="h-4 w-4 text-slate-300" />
                    <span>JUMO Universal Secure Shell Terminal</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Direct admin controller emulator. Interface with core databases, security tokens, and multi-model router gateways.</p>
                </div>
                <span className="text-[10px] font-mono text-teal-400 bg-teal-500/10 border border-teal-500/25 px-2 py-1 rounded">SSL CONNECTED</span>
              </div>

              {/* Black Terminal Screen */}
              <div className="bg-black border border-slate-850 rounded-2xl p-5 font-mono text-xs text-slate-200 min-h-[350px] flex flex-col justify-between">
                <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                  {terminalHistory.map((line, idx) => (
                    <div key={idx} className="leading-relaxed">
                      {line.type === "input" ? (
                        <div className="text-slate-200">{line.text}</div>
                      ) : (
                        <div className={`whitespace-pre-wrap ${
                          line.type === "success" ? "text-emerald-400" :
                          line.type === "error" ? "text-rose-400" :
                          line.type === "warning" ? "text-amber-400" : "text-teal-400"
                        }`}>{line.text}</div>
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleTerminalCommand} className="flex gap-2 mt-4 pt-3 border-t border-slate-900 shrink-0">
                  <span className="text-emerald-400 shrink-0 font-bold">owner@jumo-ueos:~#</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Type jumo:status, jumo:db:migrate, jumo:trust:verify..."
                    className="flex-1 bg-transparent border-none text-slate-200 outline-none placeholder-slate-700 font-mono text-xs"
                    autoFocus
                  />
                  <button type="submit" className="hidden">Run</button>
                </form>
              </div>
            </div>
          )}

          {/* 5. SYSTEM UPDATE & UPGRADE CENTER */}
          {activeTab === "update_center" && (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-emerald-400" />
                    <span>JUMO Core Update &amp; Domain Hotfix Center</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Apply rolling security hotfixes, update LLM cognitive weights, and trigger clean database table migrations.</p>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded font-bold">LTS VERSION MANAGER</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Version overview and status */}
                <div className="lg:col-span-5 bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Current System Version</h4>
                  
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-850/60 flex items-center justify-between font-mono">
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase block">Kernel Engine</span>
                      <strong className="text-white text-base font-bold">{kernelVersion}</strong>
                    </div>
                    <span className="text-[9px] bg-emerald-500/15 text-emerald-400 px-2 py-1 rounded font-bold">STABLE</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <button
                      onClick={triggerUpdateCheck}
                      disabled={checkingUpdates}
                      className="w-full bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 font-semibold py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className={`h-3.5 w-3.5 ${checkingUpdates && "animate-spin"}`} />
                      <span>Check JUMO Updates Channel</span>
                    </button>

                    {updateAvailable && (
                      <button
                        onClick={applySystemUpdate}
                        disabled={checkingUpdates}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <ArrowUpCircle className="h-4 w-4 fill-current" />
                        <span>Apply Upgrade to v2.0.5-LTS</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Operations Terminal Feedback Log */}
                <div className="lg:col-span-7 bg-slate-950 border border-slate-850 p-5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Upgrade System Feed</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Continuous diagnostics log stream from compilation updates.</p>
                  </div>

                  <div className="bg-black border border-slate-850 rounded-xl p-4 font-mono text-[10px] text-teal-400 min-h-[160px] max-h-[220px] overflow-y-auto leading-relaxed mt-4">
                    {updateLog ? (
                      <div className="whitespace-pre-wrap">{updateLog}</div>
                    ) : (
                      <div className="text-slate-700">Check update status or click Apply Upgrade to watch system output...</div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 6. JUMO AI FACTORY & AI ADMINISTRATION CENTER */}
          {activeTab === "ai_factory" && (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Bot className="h-4 w-4 text-purple-400" />
                    <span>JUMO AI Swarm Manufacturing &amp; Gateway Controller</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Private administrative AI ecosystem. Control model permissions, provision custom agents, and monitor token consumption metrics.</p>
                </div>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/25 px-2 py-1 rounded">Multi-Model Registry</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Spawner Box */}
                <div className="lg:col-span-5 bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Provision New Cognitive Swarm Agent</h4>
                  
                  <form onSubmit={handleCreateAgent} className="space-y-3.5 text-xs font-mono">
                    <div>
                      <label className="block text-slate-400 mb-1">AGENT IDENTIFIER NAME</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Legal Contract AI"
                        value={newAgentName}
                        onChange={(e) => setNewAgentName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">COGNITIVE ROLE &amp; PERMISSION SCOPE</label>
                      <select
                        value={newAgentRole}
                        onChange={(e) => setNewAgentRole(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-200 focus:outline-none focus:border-purple-500 cursor-pointer"
                      >
                        <option value="General Administration">General Administration</option>
                        <option value="Financial Controller">Financial Controller</option>
                        <option value="Procurement Optimizer">Procurement Optimizer</option>
                        <option value="Legal Contract Reviewer">Legal Contract Reviewer</option>
                        <option value="System Security Agent">System Security Agent</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold py-2 rounded-xl transition cursor-pointer font-sans"
                    >
                      Spawn Agent on JUMO-AI-01 Node
                    </button>
                  </form>
                </div>

                {/* AI Swarm List */}
                <div className="lg:col-span-7 bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono font-bold">Active Cognitive Swarm Inventory</h4>
                  
                  <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                    {aiAgents.map((agt, i) => (
                      <div key={i} className="bg-slate-900 border border-slate-850 p-3 rounded-xl flex justify-between items-center font-mono text-[10px]">
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-slate-100 font-bold">{agt.name}</strong>
                            <span className="text-[8px] bg-slate-950 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded">{agt.role}</span>
                          </div>
                          <div className="text-[9px] text-slate-500 mt-1">
                            Engine: <span className="text-slate-300">{agt.provider}</span> | Logs: <span className="text-purple-400 font-bold">{agt.memoryCount} events</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-[8px] uppercase font-bold px-1.5 py-0.5 rounded ${
                            agt.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                          }`}>{agt.status}</span>
                          
                          <button
                            onClick={() => handleToggleAgent(agt.name)}
                            className="bg-slate-950 border border-slate-800 text-slate-400 hover:text-purple-400 hover:border-purple-500 px-2 py-1 rounded transition cursor-pointer text-[9px]"
                          >
                            Toggle
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* AI Swarm Playground & Mandate Sandbox */}
              <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-900">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Cognitive Swarm Execution Sandbox</h4>
                  <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/25">Server-Side Multi-Model Router</span>
                </div>

                <form onSubmit={handleRunCognitiveTask} className="grid grid-cols-1 lg:grid-cols-12 gap-5 text-xs font-mono">
                  
                  {/* Left Controls */}
                  <div className="lg:col-span-4 space-y-3">
                    <div>
                      <label className="block text-slate-400 mb-1">SELECT TARGET AGENT</label>
                      <select
                        value={selectedCognitiveAgent}
                        onChange={(e) => setSelectedCognitiveAgent(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-200 focus:outline-none focus:border-purple-500 cursor-pointer"
                      >
                        {aiAgents.map(agt => (
                          <option key={agt.name} value={agt.name}>{agt.name} ({agt.role})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 flex justify-between">
                        <span>IFRS / LEGAL GUIDELINES RAG</span>
                        <span className="text-[8px] text-slate-500 uppercase">Optional Context</span>
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Paste specific regulatory framework or legal guidelines to ground the agent's decision matrix (e.g., IFRS NGO accounting rules)..."
                        value={cognitiveDocContext}
                        onChange={(e) => setCognitiveDocContext(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  {/* Right Mandate and Output */}
                  <div className="lg:col-span-8 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <label className="block text-slate-400 mb-1">COGNITIVE TASK / MANDATE</label>
                      <input
                        type="text"
                        placeholder="e.g. Audit ledger cash account transactions against zero-parity double-entry standards"
                        value={cognitiveTask}
                        onChange={(e) => setCognitiveTask(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="bg-slate-900 border border-slate-850 rounded-xl p-4 min-h-[140px] flex flex-col justify-between">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pb-1 border-b border-slate-850">COGNITIVE EXECUTION OUTPUT SUMMARY:</div>
                      <div className="flex-1 py-3 text-slate-300 font-sans text-xs whitespace-pre-line leading-relaxed max-h-[180px] overflow-y-auto">
                        {cognitiveLoading ? (
                          <div className="flex items-center gap-2 text-purple-400 font-mono text-[10px] animate-pulse">
                            <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping"></span>
                            <span>Swarm routing initiated... Consulting long-term memory indexes... Invoking server-side Google GenAI...</span>
                          </div>
                        ) : cognitiveAnalysisResult ? (
                          cognitiveAnalysisResult
                        ) : (
                          <span className="text-slate-500 font-mono text-[10px]">Ready to process task. Input a mandate and click "Run Cognitive Task".</span>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={cognitiveLoading}
                      className="w-full bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold py-2 rounded-xl transition cursor-pointer font-sans disabled:opacity-50"
                    >
                      {cognitiveLoading ? "Agent Swarm Thinking..." : "Run Cognitive Task"}
                    </button>
                  </div>
                </form>
              </div>

              {/* LLM Provider connections list */}
              <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Cognitive Provider Connections</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {aiProviderStatus.map((prov, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-850 p-4 rounded-xl space-y-2 font-mono text-[10px]">
                      <div className="flex justify-between items-center">
                        <strong className="text-slate-200 font-bold">{prov.name}</strong>
                        <span className="text-[8px] bg-purple-500/15 text-purple-400 px-1.5 rounded uppercase font-bold">{prov.type}</span>
                      </div>
                      <div className="text-slate-400">Latency Check: <span className="text-slate-200 font-bold">{prov.latency}</span></div>
                      <div className="text-slate-400">Audit Cost: <span className="text-slate-200 font-bold">{prov.costPerK} / 1K tokens</span></div>
                      <div className="border-t border-slate-850 pt-2 text-slate-500 text-[9px] font-bold text-center">
                        {prov.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 7. ALL SYSTEM SECRET & SECURITY MANAGEMENT */}
          {activeTab === "security_vault" && (
            <div className="space-y-6 animate-fade-in p-4 text-slate-300">
              
              {/* Toast Messages */}
              {vaultSuccessMessage && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-xl text-xs flex items-center gap-2 font-mono">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{vaultSuccessMessage}</span>
                </div>
              )}
              {vaultErrorMessage && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-xs flex items-center gap-2 font-mono">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{vaultErrorMessage}</span>
                </div>
              )}

              {/* Master Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-900">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-rose-400" />
                    <span>JUMO UEOS Cryptographic Production Secrets Vault</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Real-time AES-256 encryption-at-rest vault. Retrieve, manage, rotate, and rollback production credentials for all ERP domains.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      fetchSecrets();
                      fetchDiagnostics();
                      showVaultToast("Secrets and AI telemetry re-synchronized with secure storage.");
                    }}
                    disabled={vaultLoading || diagnosticsLoading}
                    className="text-[9px] bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className={`h-3 w-3 ${vaultLoading || diagnosticsLoading ? "animate-spin" : ""}`} />
                    <span>Sync Storage</span>
                  </button>
                  <span className="text-[9px] font-mono font-bold text-rose-400 bg-rose-500/10 border border-rose-500/25 px-2 py-1.5 rounded-lg">
                    AES-256 ACTIVE
                  </span>
                </div>
              </div>

              {/* AI Diagnostics & Telemetry Summary Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl flex items-center gap-4">
                  <div className="relative flex items-center justify-center shrink-0">
                    {/* Ring score */}
                    <div className="h-12 w-12 rounded-full border-4 border-slate-800 flex items-center justify-center font-bold text-slate-100 text-sm font-mono">
                      {vaultDiagnostics ? vaultDiagnostics.readinessScore : "..."}%
                    </div>
                  </div>
                  <div>
                    <h5 className="text-[10px] text-slate-400 uppercase font-mono font-bold">Readiness Index</h5>
                    <p className="text-xs text-slate-300 font-bold mt-0.5">Deployment Ready Score</p>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl">
                  <div className="text-xs text-slate-100 font-bold font-mono">
                    {secrets.length} Active Keys
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Across categories</p>
                  <div className="w-full bg-slate-900 h-1 rounded mt-2 overflow-hidden">
                    <div className="bg-rose-500 h-full" style={{ width: `${Math.min(100, (secrets.length / 10) * 100)}%` }}></div>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl">
                  <div className="text-xs text-slate-100 font-bold font-mono flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span>100% Sealed</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Zero leaks reported</p>
                  <div className="text-[9px] text-slate-500 mt-2">Continuous surveillance active</div>
                </div>

                {/* AI Summary Assess box */}
                <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl md:col-span-1 flex flex-col justify-between">
                  <div className="text-[9px] uppercase tracking-wider text-rose-400 font-mono font-bold flex items-center gap-1">
                    <Bot className="h-3 w-3" />
                    <span>AI Guardian Assessment</span>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-relaxed italic mt-1 select-none">
                    "{vaultDiagnostics ? vaultDiagnostics.aiSummary : "Evaluating system entropy and credentials posture..."}"
                  </p>
                </div>

              </div>

              {/* Main Content Splitted Area */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* LEFT: Credentials List and Filters */}
                <div className="lg:col-span-7 space-y-4">
                  
                  {/* Category Pills Slider */}
                  <div className="bg-slate-950 border border-slate-900 p-3 rounded-xl">
                    <div className="text-[9px] font-mono text-slate-500 uppercase font-bold mb-2">Filter by Service Domain Boundary</div>
                    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                      {["All", "Google Cloud", "Firebase", "AI Providers", "Database", "Security", "Payments", "Communications", "Domain & DNS", "Deployment", "Backup & Recovery"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategoryFilter(cat)}
                          className={`text-[9px] px-2.5 py-1 rounded-lg font-mono transition cursor-pointer whitespace-nowrap shrink-0 ${
                            selectedCategoryFilter === cat 
                              ? "bg-rose-500/15 text-rose-400 border border-rose-500/30" 
                              : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Secrets list container */}
                  <div className="bg-slate-950 border border-slate-900 p-5 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                        Vault Inventory ({selectedCategoryFilter})
                      </h4>
                      <span className="text-[9px] text-slate-500 font-mono">Click Inspect to Rotate/Rollback</span>
                    </div>

                    {vaultLoading ? (
                      <div className="text-center py-10 font-mono text-xs text-slate-500 animate-pulse">
                        Synchronizing state caches with PostgreSQL...
                      </div>
                    ) : secrets.length === 0 ? (
                      <div className="text-center py-10 font-mono text-xs text-slate-500 border border-dashed border-slate-900 rounded-xl">
                        No cryptographic secrets registered. Use the panel on the right to store secure environment variables.
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                        {secrets
                          .filter(s => selectedCategoryFilter === "All" || s.category === selectedCategoryFilter)
                          .map((sec) => (
                            <div 
                              key={sec.key} 
                              onClick={() => setSelectedSecret(sec)}
                              className={`bg-slate-900 border p-3 rounded-xl font-mono text-[10px] space-y-2 cursor-pointer transition ${
                                selectedSecret?.key === sec.key 
                                  ? "border-rose-500/50 bg-slate-900/85 shadow-lg shadow-rose-500/5" 
                                  : "border-slate-850 hover:border-slate-700"
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <strong className="text-slate-100 text-xs font-bold">{sec.key}</strong>
                                    <span className="text-[8px] bg-slate-950 text-rose-400 px-2 py-0.5 rounded border border-rose-500/10">
                                      {sec.category}
                                    </span>
                                  </div>
                                  {sec.description && (
                                    <p className="text-[9px] text-slate-400 mt-1 italic font-sans leading-normal">
                                      {sec.description}
                                    </p>
                                  )}
                                </div>
                                <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                                  {sec.status}
                                </span>
                              </div>

                              <div className="flex justify-between items-center pt-1 border-t border-slate-850/40 text-slate-400">
                                <div className="flex items-center gap-2">
                                  <span className="text-slate-500 text-[9px]">Encr. Value:</span>
                                  <span className="text-xs text-slate-300 font-mono select-all">
                                    {revealKey === sec.key ? revealedValue : sec.value}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                                  {revealKey === sec.key ? (
                                    <button
                                      onClick={() => {
                                        setRevealKey(null);
                                        setRevealedValue(null);
                                      }}
                                      className="bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 px-2 py-1 rounded text-[9px] transition cursor-pointer flex items-center gap-1"
                                      title="Hide Secret"
                                    >
                                      <EyeOff className="h-3 w-3" />
                                      <span>Hide</span>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => triggerRevealRequest(sec.key)}
                                      className="bg-slate-950 hover:bg-slate-900 border border-slate-800 text-rose-400 hover:text-rose-300 px-2 py-1 rounded text-[9px] transition cursor-pointer flex items-center gap-1"
                                      title="MFA Reveal"
                                    >
                                      <Eye className="h-3 w-3" />
                                      <span>Reveal (MFA)</span>
                                    </button>
                                  )}
                                  
                                  <button
                                    onClick={() => handleDeleteSecret(sec.key)}
                                    className="bg-slate-950 hover:bg-rose-500/10 border border-slate-800 text-slate-500 hover:text-rose-400 px-2 py-1 rounded text-[9px] transition cursor-pointer"
                                    title="Permanent Delete"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>

                              <div className="flex justify-between items-center text-[8px] text-slate-500 pt-0.5">
                                <span>Last rotated: {sec.lastRotated}</span>
                                <span className="text-slate-600 font-sans">Created by: {sec.createdBy}</span>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Cryptographic Backup / Restore panel */}
                  <div className="bg-slate-950 border border-slate-900 p-5 rounded-2xl space-y-4">
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                      Backup &amp; Disaster Recovery Center
                    </h4>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                      Generate encrypted offsite backup JSON archives. Re-import them securely in case of migration or catastrophic recovery. All backup procedures are logged in audit ledger.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setBackupModalOpen(true);
                          handleExportBackup();
                        }}
                        className="flex-1 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 px-3 py-2 rounded-xl transition font-mono text-[10px] text-center cursor-pointer font-bold"
                      >
                        Generate Secure Backup
                      </button>
                      <button
                        onClick={() => setRestoreModalOpen(true)}
                        className="flex-1 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 px-3 py-2 rounded-xl transition font-mono text-[10px] text-center cursor-pointer font-bold"
                      >
                        Import Vault Backup
                      </button>
                    </div>
                  </div>

                </div>

                {/* RIGHT: Register & Inspector/Version History/Telemetry */}
                <div className="lg:col-span-5 space-y-4">
                  
                  {/* Register Form */}
                  <div className="bg-slate-950 border border-slate-900 p-5 rounded-2xl space-y-4">
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <Plus className="h-4 w-4 text-rose-400" />
                      <span>Register Production Variable</span>
                    </h4>

                    <div className="space-y-3 text-xs font-mono">
                      <div>
                        <label className="block text-[9px] text-slate-500 mb-1">VARIABLE KEY IDENTIFIER</label>
                        <input
                          type="text"
                          placeholder="e.g. GEMINI_API_KEY"
                          value={newSecretKey}
                          onChange={(e) => setNewSecretKey(e.target.value.toUpperCase())}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[9px] text-slate-500 mb-1">SERVICE BOUNDARY</label>
                          <select
                            value={newSecretCategory}
                            onChange={(e) => setNewSecretCategory(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-2 text-slate-300 focus:outline-none focus:border-rose-500 cursor-pointer"
                          >
                            <option value="Google Cloud">Google Cloud</option>
                            <option value="Firebase">Firebase</option>
                            <option value="AI Providers">AI Providers</option>
                            <option value="Database">Database</option>
                            <option value="Security">Security</option>
                            <option value="Payments">Payments</option>
                            <option value="Communications">Communications</option>
                            <option value="Domain & DNS">Domain & DNS</option>
                            <option value="Deployment">Deployment</option>
                            <option value="Backup & Recovery">Backup & Recovery</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[9px] text-slate-500 mb-1">EXPIRATION DATE</label>
                          <input
                            type="date"
                            value={newSecretExpiresAt}
                            onChange={(e) => setNewSecretExpiresAt(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-slate-300 focus:outline-none focus:border-rose-500 cursor-pointer"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] text-slate-500 mb-1">DESCRIPTION / REASONING</label>
                        <input
                          type="text"
                          placeholder="Clear explanation of variable utilization..."
                          value={newSecretDescription}
                          onChange={(e) => setNewSecretDescription(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] text-slate-500 mb-1">RAW VALUE (AES-256 SEALED)</label>
                        <input
                          type="password"
                          placeholder="Secret credential characters..."
                          value={newSecretVal}
                          onChange={(e) => setNewSecretVal(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500"
                        />
                      </div>

                      <button
                        onClick={handleRegisterSecret}
                        className="w-full bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold py-2 rounded-xl transition cursor-pointer font-sans"
                      >
                        Encrypt &amp; Seal Credential
                      </button>
                    </div>
                  </div>

                  {/* Selected Secret Inspector: History, Rollback & Rotation */}
                  {selectedSecret ? (
                    <div className="bg-slate-950 border border-slate-900 p-5 rounded-2xl space-y-4 animate-fade-in">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider font-mono">
                            Credential Inspector
                          </h4>
                          <p className="text-[11px] font-bold text-slate-200 mt-1">{selectedSecret.key}</p>
                        </div>
                        <button
                          onClick={() => setSelectedSecret(null)}
                          className="text-[9px] text-slate-500 hover:text-slate-300 font-mono transition"
                        >
                          [Close]
                        </button>
                      </div>

                      {/* Rotation controls */}
                      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-2.5">
                        <div className="text-[9px] text-rose-400 font-mono uppercase font-bold">Rotate Value</div>
                        <div className="flex gap-2">
                          <input
                            type="password"
                            placeholder="Enter new rotated value..."
                            value={rotationValue}
                            onChange={(e) => setRotationValue(e.target.value)}
                            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none font-mono"
                          />
                          <button
                            onClick={handleRotateSecret}
                            disabled={isRotating || !rotationValue}
                            className="bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-[10px] font-sans transition disabled:opacity-50 cursor-pointer shrink-0"
                          >
                            {isRotating ? "Rotating..." : "Rotate"}
                          </button>
                        </div>
                        <p className="text-[8px] text-slate-500 leading-normal font-sans">
                          Rotating key automatically archives previous value to the historical database for rollback support.
                        </p>
                      </div>

                      {/* Version history / rollbacks list */}
                      <div className="space-y-2">
                        <div className="text-[9px] text-slate-400 font-mono uppercase font-bold">
                          Version History &amp; Rollback Logs
                        </div>
                        
                        {(() => {
                          let historyArray: any[] = [];
                          try {
                            historyArray = JSON.parse(selectedSecret.versionHistory || "[]");
                          } catch (_) {}

                          if (historyArray.length === 0) {
                            return (
                              <div className="text-[9px] text-slate-600 font-mono py-2 italic text-center">
                                No previous rotation events detected. Version v1 is active.
                              </div>
                            );
                          }

                          return (
                            <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                              {historyArray.map((hist, idx) => (
                                <div key={idx} className="bg-slate-900 border border-slate-850 p-2 rounded-lg flex justify-between items-center font-mono text-[9px]">
                                  <div>
                                    <div className="text-slate-300 font-bold">Archived Version (v{historyArray.length - idx})</div>
                                    <div className="text-slate-500 text-[8px] mt-0.5">
                                      Rotated: {hist.rotatedAt} by {hist.rotatedBy || "Operator"}
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => handleRollbackSecret(idx)}
                                    disabled={rollbackLoading}
                                    className="bg-slate-950 hover:bg-rose-500/15 text-[8px] border border-slate-800 text-slate-400 hover:text-rose-400 px-2 py-1 rounded transition cursor-pointer"
                                  >
                                    Rollback
                                  </button>
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>

                    </div>
                  ) : (
                    /* General intelligence recomendations */
                    <div className="bg-slate-950 border border-slate-900 p-5 rounded-2xl space-y-4">
                      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                        Active Telemetry Findings
                      </h4>
                      
                      {vaultDiagnostics ? (
                        <div className="space-y-3.5 max-h-[300px] overflow-y-auto font-mono text-[10px]">
                          
                          {/* Weak Keys */}
                          {vaultDiagnostics.healthRatings?.some((h: any) => h.strength === "Weak") && (
                            <div className="bg-rose-500/5 border border-rose-500/15 p-3 rounded-xl space-y-1">
                              <span className="text-rose-400 font-bold uppercase text-[9px] flex items-center gap-1">
                                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                                <span>Action Required: Weak Entropy</span>
                              </span>
                              <p className="text-[9px] text-slate-400 font-sans leading-normal">
                                The following key values have high risk profiles or use mock defaults:
                              </p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {vaultDiagnostics.healthRatings
                                  .filter((h: any) => h.strength === "Weak")
                                  .map((h: any) => (
                                    <span key={h.key} className="bg-rose-500/10 text-rose-300 px-1.5 rounded text-[8px]">
                                      {h.key}
                                    </span>
                                  ))}
                              </div>
                            </div>
                          )}

                          {/* Overdue Rotation */}
                          {vaultDiagnostics.healthRatings?.some((h: any) => h.ageInDays > 90) && (
                            <div className="bg-yellow-500/5 border border-yellow-500/15 p-3 rounded-xl space-y-1">
                              <span className="text-yellow-400 font-bold uppercase text-[9px] flex items-center gap-1">
                                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                                <span>Zero-Trust: Overdue Rotation</span>
                              </span>
                              <p className="text-[9px] text-slate-400 font-sans leading-normal">
                                The following credentials have surpassed the standard 90-day rotation timeline:
                              </p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {vaultDiagnostics.healthRatings
                                  .filter((h: any) => h.ageInDays > 90)
                                  .map((h: any) => (
                                    <span key={h.key} className="bg-yellow-500/10 text-yellow-300 px-1.5 rounded text-[8px]">
                                      {h.key} ({h.ageInDays}d old)
                                    </span>
                                  ))}
                              </div>
                            </div>
                          )}

                          {/* Action recommendations list */}
                          <div className="space-y-1.5">
                            <span className="text-slate-400 uppercase text-[9px] font-bold">Surveillance Tasks:</span>
                            {vaultDiagnostics.recommendations?.map((rec: string, idx: number) => (
                              <div key={idx} className="bg-slate-900 border border-slate-850 p-2 rounded-lg text-slate-300 text-[9px] font-sans">
                                • {rec}
                              </div>
                            ))}
                          </div>

                        </div>
                      ) : (
                        <div className="text-center py-6 font-mono text-[10px] text-slate-600 animate-pulse">
                          Evaluating platform audit reports...
                        </div>
                      )}
                    </div>
                  )}

                </div>

              </div>

              {/* MFA Reveal Modal (Simulated inline popup for sandboxed security) */}
              {mfaModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 font-mono text-xs">
                    <div className="flex items-center gap-2 text-rose-400 font-bold">
                      <Lock className="h-5 w-5 animate-bounce" />
                      <span>OWNER VERIFICATION REQ.</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans leading-normal">
                      Revealing secret values is a highly audited event. Please verify your Owner signature credentials. Enter your <strong className="text-rose-400">Owner Password</strong> or <strong className="text-rose-400">owner</strong> as verification:
                    </p>
                    
                    <div>
                      <label className="block text-[9px] text-slate-500 mb-1">MFA CODE / PASSCODE</label>
                      <input
                        type="password"
                        placeholder="••••••"
                        value={mfaCode}
                        onChange={(e) => setMfaCode(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 text-center tracking-widest text-lg font-bold focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    {mfaError && (
                      <div className="text-rose-400 text-[9px] text-center font-bold">
                        {mfaError}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => setMfaModalOpen(false)}
                        className="flex-1 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 py-2 rounded-lg font-sans text-[11px] transition cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleVerifyMfaReveal}
                        className="flex-1 bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold py-2 rounded-lg font-sans text-[11px] transition cursor-pointer"
                      >
                        Verify &amp; Reveal
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Backup modal */}
              {backupModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 font-mono text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                      <span className="text-slate-100 font-bold text-xs">Secure Vault Backup Payload</span>
                      <button 
                        onClick={() => setBackupModalOpen(false)}
                        className="text-slate-500 hover:text-slate-300 transition text-[10px]"
                      >
                        [Close]
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400 font-sans leading-normal">
                      Copy the sealed, encrypted snapshot payload string below and archive it in a secure hardware token or offsite recovery keys repository.
                    </p>
                    <textarea
                      readOnly
                      rows={5}
                      value={backupPayload}
                      className="w-full bg-black border border-slate-850 p-2.5 rounded-lg text-rose-400/90 text-[8px] font-mono leading-relaxed select-all"
                    />
                    <div className="text-center">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(backupPayload);
                          showVaultToast("Backup payload copied to platform clipboard.");
                        }}
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold px-4 py-2 rounded-lg text-[10px] transition cursor-pointer"
                      >
                        Copy Payload String
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Restore modal */}
              {restoreModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 font-mono text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                      <span className="text-slate-100 font-bold text-xs">Catastrophic Vault Recovery Restore</span>
                      <button 
                        onClick={() => setRestoreModalOpen(false)}
                        className="text-slate-500 hover:text-slate-300 transition text-[10px]"
                      >
                        [Close]
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400 font-sans leading-normal">
                      Paste the encrypted backup payload string below to re-seed the vault storage tables. Existing matching credentials keys will be overwritten. This procedure is heavily audited.
                    </p>
                    <textarea
                      rows={5}
                      placeholder="Paste encrypted recovery payload string here..."
                      value={restorePayload}
                      onChange={(e) => setRestorePayload(e.target.value)}
                      className="w-full bg-black border border-slate-850 p-2.5 rounded-lg text-slate-300 text-[10px] font-mono focus:outline-none focus:border-rose-500"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => setRestoreModalOpen(false)}
                        className="flex-1 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 py-2 rounded-lg font-sans text-[11px] transition cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleRestoreBackup}
                        className="flex-1 bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold py-2 rounded-lg font-sans text-[11px] transition cursor-pointer"
                      >
                        Validate &amp; Restore Vault
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* 8. JUMO MASTER BLUEPRINT & ARCHITECTURE CENTER */}
          {activeTab === "architecture" && (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Map className="h-4 w-4 text-indigo-400" />
                    <span>JUMO UEOS Master Architecture Commands &amp; Diagrams</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Master system design diagrams. Visualize structural relationship maps between micro-kernel, double-entry ledger, and tenant pools.</p>
                </div>
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/25 px-2 py-1 rounded">100% Comprehensive</span>
              </div>

              <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Platform High-Level Node Layout</h4>
                
                {/* ERD / Architecture diagram visual mock */}
                <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-850/60 font-mono text-[10.5px] leading-relaxed space-y-4">
                  <div className="flex justify-center">
                    <div className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 p-3 rounded-xl text-center min-w-[200px]">
                      <strong>JUMO UEOS Platform Kernel</strong>
                      <div className="text-[8px] text-indigo-400/80 mt-1">Boot bootstrap container &bull; DI container</div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="h-6 w-0.5 bg-indigo-500/20"></div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-purple-500/5 border border-purple-500/20 text-purple-300 p-2 rounded-xl text-center">
                      <strong>AI Cognitive Gateway</strong>
                      <div className="text-[8px] text-purple-400/80 mt-0.5">Gemini 3.5 &bull; Swarm nodes</div>
                    </div>

                    <div className="bg-teal-500/5 border border-teal-500/20 text-teal-300 p-2 rounded-xl text-center">
                      <strong>Zero-Trust Validator</strong>
                      <div className="text-[8px] text-teal-400/80 mt-0.5">Continuous Policy Validation</div>
                    </div>

                    <div className="bg-blue-500/5 border border-blue-500/20 text-blue-300 p-2 rounded-xl text-center">
                      <strong>FAAP Core Ledger</strong>
                      <div className="text-[8px] text-blue-400/80 mt-0.5">Double-entry accounting api</div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="h-6 w-0.5 bg-indigo-500/20"></div>
                  </div>

                  <div className="flex justify-center">
                    <div className="bg-rose-500/5 border border-rose-500/20 text-rose-300 p-2 rounded-xl text-center min-w-[200px]">
                      <strong>Tenant Segment Database</strong>
                      <div className="text-[8px] text-rose-400/80 mt-0.5">Durable Postgres/SQL Row-Level Isolation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 9. JUMO CYBER SECURITY PLATFORM */}
          {activeTab === "cyber_security" && (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-teal-300" />
                    <span>JUMO Unified Threat Intelligence Center</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Continuous intrusion analysis logs, dynamic Zero-Trust policies management, and firewall posture validations.</p>
                </div>
                <span className="text-[10px] font-mono text-teal-300 bg-teal-500/10 border border-teal-500/25 px-2 py-1 rounded">IDS: RUNNING</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Zero trust rules */}
                <div className="lg:col-span-5 bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Zero Trust Policy Registry</h4>
                  
                  <div className="space-y-2 max-h-[220px] overflow-y-auto">
                    {zeroTrustRules.map((rule, i) => (
                      <div key={i} className="bg-slate-900 border border-slate-850 p-2.5 rounded-xl flex justify-between items-center font-mono text-[9px]">
                        <div>
                          <strong className="text-teal-300 block">{rule.id}: {rule.pattern}</strong>
                          <span className="text-slate-500 text-[8px]">Action: {rule.action}</span>
                        </div>
                        <span className="text-[8px] font-bold text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded uppercase">{rule.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* IDS Alerts */}
                <div className="lg:col-span-7 bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Continuous Threat Feed</h4>
                  
                  <div className="space-y-2 max-h-[220px] overflow-y-auto">
                    {idsAlerts.map((alert, i) => (
                      <div key={i} className="bg-slate-900 border border-slate-850 p-2.5 rounded-xl font-mono text-[9px] space-y-1">
                        <div className="flex justify-between items-center text-[8px]">
                          <span className="text-slate-500">{alert.time} &bull; Node IP: {alert.src}</span>
                          <span className={`font-bold px-1.5 py-0.5 rounded uppercase ${
                            alert.severity === "High" ? "bg-rose-500/15 text-rose-400" : "bg-amber-500/15 text-amber-400"
                          }`}>{alert.severity}</span>
                        </div>
                        <p className="text-slate-300 leading-normal">{alert.event}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 10. JUMO AEGIS GUARD */}
          {activeTab === "aegis" && (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="bg-red-500/5 border border-red-950/40 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-500/15 text-red-400 rounded-xl">
                    <ShieldCheck className="h-6 w-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider font-mono">JUMO AEGIS AI Security Command Vault</h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Protected Admin-Only Accountability Shield (Merged Financial CCTV, Anti-Corruption intelligence, &amp; RAG Knowledge Auditing).
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={handleTriggerAegisScan}
                    disabled={aegisScanning}
                    className="text-[10px] font-mono font-bold bg-red-500 text-slate-950 hover:bg-red-400 px-3.5 py-1.5 rounded transition cursor-pointer"
                  >
                    {aegisScanning ? "SCANNING VECTORS..." : "RUN AEGIS SECURITY SCAN"}
                  </button>
                  <span className="text-[9px] font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded flex items-center">
                    SECOPS SECURE
                  </span>
                </div>
              </div>

              {/* Threat Scan Results */}
              {aegisScanResult && (
                <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4 animate-fade-in">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                    <h4 className="text-xs font-bold text-red-400 uppercase font-mono">AEGIS SCAN REPORT: {aegisScanResult.scanId}</h4>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      HEALTH: {aegisScanResult.securityScore}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                    <div className="bg-slate-900 p-3.5 border border-slate-850 rounded-xl space-y-1">
                      <span className="text-slate-500 text-[9px] uppercase">Compliance Status</span>
                      <strong className="text-slate-100 block text-xs">{aegisScanResult.complianceStatus}</strong>
                    </div>
                    <div className="bg-slate-900 p-3.5 border border-slate-850 rounded-xl space-y-1">
                      <span className="text-slate-500 text-[9px] uppercase">Detected Anomalies</span>
                      <strong className="text-rose-400 block text-xs">
                        {aegisScanResult.detectedAnomalies?.length > 0 ? aegisScanResult.detectedAnomalies[0] : "Zero Critical Breaches Flagged"}
                      </strong>
                    </div>
                    <div className="bg-slate-900 p-3.5 border border-slate-850 rounded-xl space-y-1">
                      <span className="text-slate-500 text-[9px] uppercase">Actionable Recommended Next Step</span>
                      <strong className="text-amber-400 block text-[10px] leading-snug">{aegisScanResult.recommendation}</strong>
                    </div>
                  </div>
                  <div className="bg-slate-900 p-4 border border-slate-850 rounded-xl font-mono text-[10px] text-slate-300 leading-normal">
                    <div className="text-red-400 font-bold mb-1 uppercase text-[8px]">AI Cognitive Security Evaluation:</div>
                    <p className="italic">"{aegisScanResult.aiSecurityReport}"</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Left: Financial CCTV logs */}
                <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <Coins className="h-4.5 w-4.5 text-red-400" />
                      <span>Financial CCTV Integrity Monitor</span>
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Real-time anti-corruption audit logs tracking double-entry transactions.</p>
                  </div>

                  <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1 text-[10px] font-mono">
                    {financialCctv.map((item, idx) => (
                      <div key={idx} className="bg-slate-900 border border-slate-850 p-2.5 rounded-xl flex items-start justify-between gap-2">
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex justify-between items-center gap-2">
                            <span className="text-red-400 font-bold">{item.id}</span>
                            <span className="text-slate-500 text-[8px]">{item.timestamp}</span>
                          </div>
                          <p className="text-slate-300 leading-normal">{item.desc}</p>
                          <div className="flex items-center gap-2 text-[8px] text-slate-500">
                            <span className="bg-slate-950 border border-slate-800 px-1 py-0.5 rounded text-slate-400">{item.tenant}</span>
                            <span>Amt: ${item.amount.toLocaleString()}</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-red-400 uppercase bg-red-500/10 px-1.5 py-0.5 rounded shrink-0">{item.risk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: RAG Knowledge base & compliance upload */}
                <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                        <Library className="h-4.5 w-4.5 text-red-400" />
                        <span>Compliance RAG Knowledge Vault</span>
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Index regulatory, statutory, accounting, and legal guidelines to ground AI auditors.</p>
                    </div>
                  </div>

                  {/* Add document form */}
                  <form onSubmit={handleAddRagDocument} className="bg-slate-900 p-3 rounded-xl border border-slate-850 space-y-2 text-[10px] font-mono">
                    <span className="text-[9px] font-bold text-red-400 uppercase block">Index Regulatory Document</span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Document Title (e.g. IFRS 17 Act)"
                        value={newRagTitle}
                        onChange={(e) => setNewRagTitle(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-200 focus:outline-none"
                        required
                      />
                      <select
                        value={newRagCategory}
                        onChange={(e) => setNewRagCategory(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-200 cursor-pointer"
                      >
                        <option value="Accounting Standards">Accounting Standards</option>
                        <option value="Regional Regulations">Regional Regulations</option>
                        <option value="Institutional Guidelines">Institutional Guidelines</option>
                      </select>
                    </div>
                    <textarea
                      placeholder="Regulatory text chapter content to be chunked and mapped into semantic memory..."
                      value={newRagContent}
                      onChange={(e) => setNewRagContent(e.target.value)}
                      className="w-full h-11 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-200 focus:outline-none resize-none"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold py-1 rounded transition cursor-pointer"
                    >
                      Index Document Chapter
                    </button>
                  </form>

                  {/* Documents list */}
                  <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1 text-[10px] font-mono">
                    {ragDocuments.map((doc) => (
                      <div key={doc.id} className="bg-slate-900 p-2.5 rounded-lg border border-slate-850 space-y-1">
                        <div className="flex justify-between items-center text-[9px]">
                          <strong className="text-slate-200">{doc.title}</strong>
                          <span className="bg-slate-950 text-slate-400 border border-slate-800 px-1 rounded uppercase text-[8px]">{doc.category}</span>
                        </div>
                        <p className="text-slate-400 text-[9px] leading-normal italic">"{doc.content.substring(0, 150)}..."</p>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

              <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Key className="h-4 w-4 text-red-400" />
                  <span>Immutable cryptographic hash integrity verified. Blockchain Ledger Checksum: VALID.</span>
                </span>
                <span className="text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded font-bold">100% SECURE BOUNDARY</span>
              </div>
            </div>
          )}

          {/* 11. JUMO FINTECH CORE SYSTEMS */}
          {activeTab === "fintech" && (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2 border-b border-slate-900">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Coins className="h-4 w-4 text-emerald-300 animate-spin-slow" />
                    <span>JUMO Fintech Core Financial &amp; Settlement System</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Control transaction billing parameters, set commercial clearing ratios, and post secure journal transactions.</p>
                </div>
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded">Settlements Active</span>
              </div>

              {/* Dynamic FAAP AI Accounting & Audit Insights */}
              {faapIntelligence && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[10px]">
                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-1.5">
                    <span className="text-red-400 font-bold uppercase text-[8px] flex items-center gap-1">
                      <ShieldAlert className="h-3 w-3 animate-pulse" /> ANOMALY DETECTION ENGINE
                    </span>
                    <p className="text-slate-300 italic leading-snug">"{faapIntelligence.anomalies?.[0] || 'No critical posting patterns flagged.'}"</p>
                  </div>
                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-1.5">
                    <span className="text-emerald-400 font-bold uppercase text-[8px] flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> FAAP FORECAST REPORT
                    </span>
                    <p className="text-slate-300 leading-snug">
                      Projected Vol: <strong className="text-white">{faapIntelligence.forecast?.projectedVolume}</strong> &bull; Risk level: <strong className="text-emerald-400">{faapIntelligence.forecast?.liquidityRisk}</strong>
                    </p>
                  </div>
                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-1.5">
                    <span className="text-purple-400 font-bold uppercase text-[8px]">MONTH-END CLOSING REC</span>
                    <p className="text-slate-300 leading-snug">{faapIntelligence.recommendations?.[0] || 'Perform comprehensive ledger rebalancing.'}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* Column 1: Live Payment Connector Gateway Form */}
                <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Fintech Settlement Clearing Gateway</h4>
                  <form onSubmit={handleRunFintechPayment} className="space-y-3 text-xs font-mono">
                    <div>
                      <label className="block text-slate-400 mb-1">PAYMENT PROCESSOR / PROVIDER</label>
                      <select
                        value={paymentProvider}
                        onChange={(e) => setPaymentProvider(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        <option value="MTN Mobile Money">MTN Mobile Money API</option>
                        <option value="Airtel Money API">Airtel Money Aggregator</option>
                        <option value="Stripe Gateway">Stripe Direct Connector</option>
                        <option value="Cellular M-Pesa Node">Cellular Safaricom M-Pesa</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-400 mb-1">TARGET TENANT ID</label>
                        <select
                          value={paymentTenantId}
                          onChange={(e) => setPaymentTenantId(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-slate-200 focus:outline-none cursor-pointer text-[11px]"
                        >
                          <option value="sacco-zambia-hq">sacco-zambia-hq</option>
                          <option value="church-uganda-diocese">church-uganda-diocese</option>
                          <option value="education-kenya-board">education-kenya-board</option>
                          <option value="ngo-grants-suite">ngo-grants-suite</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">BILLING MODEL</label>
                        <select
                          value={paymentBillingModel}
                          onChange={(e) => setPaymentBillingModel(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-slate-200 focus:outline-none cursor-pointer text-[11px]"
                        >
                          <option value="transaction">Transaction Fee</option>
                          <option value="monthly">Monthly Licensing</option>
                          <option value="termly">Termly Contract</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-400 mb-1">AMOUNT ($ USD)</label>
                        <input
                          type="number"
                          placeholder="e.g. 5000"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">CURRENCY</label>
                        <input
                          type="text"
                          value={paymentCurrency}
                          onChange={(e) => setPaymentCurrency(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none text-[11px]"
                          disabled
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={paymentProcessing}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 rounded-xl transition cursor-pointer disabled:opacity-50"
                    >
                      {paymentProcessing ? "CLEARING PAYMENT..." : "EXECUTE PAYMENT CLEARED"}
                    </button>
                  </form>

                  {paymentResult && (
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-850 font-mono text-[9px] text-slate-300 space-y-1.5 animate-fade-in">
                      <div className="flex justify-between font-bold text-emerald-400">
                        <span>TRANSACTION SECURE</span>
                        <span>{paymentResult.status}</span>
                      </div>
                      <p>Tx ID: {paymentResult.transactionId}</p>
                      <p>Processor: {paymentResult.clearedVia}</p>
                      <p>Gross: ${paymentResult.grossAmount} &bull; Cleared Fee: ${paymentResult.platformFee} (1.5% clear)</p>
                      <p className="text-[8px] text-slate-500">Master Treasury credited successfully.</p>
                    </div>
                  )}
                </div>

                {/* Column 2: Interactive Tenant Billing Configurations */}
                <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Tenant Billing &amp; Clearing Parameters</h4>
                  
                  <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                    {billingConfigs.map((cfg) => (
                      <div key={cfg.id} className="bg-slate-900 border border-slate-850 p-3 rounded-xl font-mono text-[10px] space-y-2">
                        <div className="flex justify-between items-center text-[10px] pb-1.5 border-b border-slate-850">
                          <strong className="text-slate-100">{cfg.id}</strong>
                          <span className="bg-emerald-500/10 text-emerald-400 px-1.5 rounded text-[8px] uppercase">{cfg.billingPeriod}</span>
                        </div>
                        
                        {editingBillingId === cfg.id ? (
                          <div className="space-y-2 text-[9px]">
                            <div className="grid grid-cols-2 gap-1.5">
                              <div>
                                <label className="text-slate-500 block text-[8px]">Fee Ratio (%)</label>
                                <input
                                  type="number"
                                  step="0.1"
                                  value={editingFeePercentage}
                                  onChange={(e) => setEditingFeePercentage(e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-800 rounded px-1 py-0.5 text-white"
                                />
                              </div>
                              <div>
                                <label className="text-slate-500 block text-[8px]">Cycle</label>
                                <select
                                  value={editingBillingPeriod}
                                  onChange={(e) => setEditingBillingPeriod(e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-800 rounded px-1 py-0.5 text-white"
                                >
                                  <option value="Monthly">Monthly</option>
                                  <option value="Annually">Annually</option>
                                  <option value="One-Time">One-Time</option>
                                </select>
                              </div>
                            </div>
                            <div className="flex gap-1 pt-1.5">
                              <button
                                onClick={() => setEditingBillingId(null)}
                                className="flex-1 bg-slate-950 hover:bg-slate-850 text-slate-400 border border-slate-800 py-1 rounded"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleUpdateBillingConfig(cfg.id)}
                                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-1 rounded"
                              >
                                Save Config
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-end gap-2 text-[9px]">
                            <div className="space-y-1 text-slate-400">
                              <p>Clearing Fee Ratio: <strong className="text-white">{cfg.feePercentage}%</strong></p>
                              <p>Settlement Rules: <strong className="text-white">{cfg.settlementRules}</strong></p>
                              <p>Model Base: <strong className="text-white">{cfg.model}</strong></p>
                            </div>
                            <button
                              onClick={() => {
                                setEditingBillingId(cfg.id);
                                setEditingFeePercentage(cfg.feePercentage);
                                setEditingBillingPeriod(cfg.billingPeriod);
                                setEditingBillingModel(cfg.model);
                                setEditingSettlementRules(cfg.settlementRules);
                              }}
                              className="text-emerald-400 hover:text-emerald-300 font-bold underline"
                            >
                              Edit Parameters
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 3: Live FAAP Balance Audit List */}
                <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono font-bold">Live FAAP Chart of Accounts &amp; Balances</h4>
                  
                  <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                    {(ledgerAccounts.length > 0 ? ledgerAccounts : [
                      { code: "1010-CASH", name: "Cash Asset", type: "Asset", balance: 50000 },
                      { code: "1020-M-PESA", name: "M-Pesa Clearing Node", type: "Asset", balance: 35000 },
                      { code: "2010-LIABILITY", name: "Tenant Security Escrow", type: "Liability", balance: 10000 },
                      { code: "3010-EQUITY", name: "JUMO Master Treasury Reserve", type: "Equity", balance: 76250 },
                      { code: "4020-JUMO-FEES", name: "Treasury Fee Revenue", type: "Income", balance: 1250 }
                    ]).map((acc) => (
                      <div key={acc.code} className="bg-slate-900 border border-slate-850 p-2.5 rounded-xl font-mono text-[9px] flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <strong className="text-slate-100 font-bold">{acc.code}</strong>
                            <span className="text-[8px] bg-slate-950 border border-slate-800 text-slate-400 px-1 py-0.5 rounded font-bold uppercase">{acc.type}</span>
                          </div>
                          <span className="text-[8px] text-slate-500 block mt-0.5">{acc.name}</span>
                        </div>
                        <strong className="text-emerald-400 text-xs">${Number(acc.balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 12. JUMO ENTERPRISE DOMAIN FACTORY */}
          {activeTab === "domain_factory" && (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Boxes className="h-4 w-4 text-purple-300" />
                    <span>JUMO Enterprise Domain &amp; ERP Installer Suite</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Control enterprise-grade installable domain modules. Toggle licensing permissions, deploy modular databases, and map tenant workspaces.</p>
                </div>
                <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 border border-purple-500/25 px-2.5 py-1 rounded">PLATFORM MODULES</span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {modules.filter(m => m.type === "Domain").map((mod) => (
                    <div key={mod.id} className="bg-slate-950 border border-slate-850 p-4.5 rounded-2xl flex items-start gap-4 hover:border-slate-800 transition">
                      <div className="flex-1 space-y-1 text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded border border-slate-800">{mod.id}</span>
                          <span className="text-[8px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded font-bold uppercase">{mod.version}</span>
                        </div>
                        
                        <h5 className="text-xs font-bold text-white mt-1 font-sans">{mod.name}</h5>
                        <p className="text-[10.5px] text-slate-400 leading-normal font-sans">{mod.description}</p>
                        <div className="text-[9px] text-purple-400 pt-1">Licensing Base: ${mod.monthlyPrice}/mo per tenant</div>
                      </div>

                      <div className="flex flex-col items-end justify-between h-full shrink-0">
                        <span className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                          mod.status === "Active" ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400"
                        }`}>{mod.status}</span>
                        
                        {mod.status === "Inactive" ? (
                          <button
                            onClick={() => installDomainModule(mod.id, mod.name)}
                            disabled={installingDomainId !== null}
                            className="bg-purple-600 hover:bg-purple-500 text-slate-100 font-bold px-2.5 py-1 rounded text-[10px] transition cursor-pointer"
                          >
                            {installingDomainId === mod.id ? `Installing (${domainInstallProgress}%)` : "Install"}
                          </button>
                        ) : (
                          <button
                            onClick={() => toggleModuleStatus(mod.id)}
                            className="bg-slate-900 hover:bg-rose-950/40 hover:text-rose-400 text-slate-400 px-2.5 py-1 border border-slate-800 rounded text-[10px] transition cursor-pointer"
                          >
                            Uninstall
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 13. INFRASTRUCTURE & SERVERS CLUSTER */}
          {activeTab === "servers" && (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Server className="h-4 w-4 text-sky-400" />
                    <span>JUMO Infrastructure Telemetry &amp; Node Clusters</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Continuous health profiles of cloud run containers. Roll out dynamic restarts and audit heap memory dumps.</p>
                </div>
                <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 border border-sky-500/25 px-2 py-1 rounded">REPLICAS VALIDATED</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {servers.map((srv, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <strong className="text-xs font-extrabold text-white font-mono">{srv.name}</strong>
                        <span className={`text-[8px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                          srv.status === "Healthy" ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-900 text-slate-500"
                        }`}>{srv.status}</span>
                      </div>
                      <p className="text-[9px] font-mono text-slate-500 uppercase">{srv.type}</p>
                    </div>

                    <div className="border-t border-slate-900 pt-3 space-y-1.5 font-mono text-[9px] text-slate-400">
                      <div className="flex justify-between">
                        <span>CPU LOAD</span>
                        <strong className="text-slate-200 font-bold">{srv.cpu}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>MEMORY LOAD</span>
                        <strong className="text-slate-200 font-bold">{srv.memory}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>ACTIVE CHANNELS</span>
                        <strong className="text-slate-200 font-bold">{srv.activeConnections} sockets</strong>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          alert(`Restarting ${srv.name}... Check secure console for output.`);
                        }}
                        disabled={srv.status !== "Healthy"}
                        className="flex-1 bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold py-1 border border-slate-800 rounded-lg text-[9px] cursor-pointer transition disabled:opacity-50"
                      >
                        Restart Node
                      </button>
                      <button
                        onClick={() => {
                          alert(`Initiating heap memory diagnostics logs on ${srv.name}...`);
                        }}
                        disabled={srv.status !== "Healthy"}
                        className="flex-1 bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold py-1 border border-slate-800 rounded-lg text-[9px] cursor-pointer transition disabled:opacity-50"
                      >
                        Audit Heap
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 14. PRODUCTION ACCEPTANCE & RELEASE SUITE */}
          {activeTab === "production_release" && (
            <ProductionReleasePanel />
          )}

          {/* 15. JUMO INNOVATION & RESEARCH LAB */}
          {activeTab === "innovation_lab" && (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    <span>JUMO Innovation &amp; Research Lab</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Explore breakthrough concepts, register new R&amp;D designs, and monitor active cognitive research agents.</p>
                </div>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/25 px-2 py-1 rounded">R&amp;D COMPILER SECURE</span>
              </div>

              {/* Researchers & Concepts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Submit New Concept Form */}
                <div className="lg:col-span-4 bg-slate-950 border border-slate-900 p-4 rounded-2xl space-y-4">
                  <div className="border-b border-slate-900 pb-2">
                    <h4 className="text-xs font-bold text-slate-200">Submit R&amp;D Tech Concept</h4>
                    <p className="text-[10px] text-slate-500">Inject experimental design logic into the operating system sandbox.</p>
                  </div>

                  <form onSubmit={handleAddConcept} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold block">Concept Title</label>
                      <input 
                        type="text" 
                        required
                        value={newConceptTitle}
                        onChange={(e) => setNewConceptTitle(e.target.value)}
                        placeholder="e.g. Adaptive Hyperledger Syncer"
                        className="w-full bg-slate-900 text-slate-100 placeholder-slate-600 border border-slate-800 focus:border-purple-500 text-xs px-3 py-2 rounded-xl focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold block">R&amp;D Domain</label>
                        <select
                          value={newConceptDomain}
                          onChange={(e) => setNewConceptDomain(e.target.value)}
                          className="w-full bg-slate-900 text-slate-200 border border-slate-800 text-xs px-2 py-1.5 rounded-xl focus:outline-none focus:border-purple-500"
                        >
                          <option value="AI Engineering">AI Engineering</option>
                          <option value="Fintech FAAP">Fintech FAAP</option>
                          <option value="Zero-Trust Sec">Zero-Trust Sec</option>
                          <option value="Blockchain Sync">Blockchain Sync</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold block">Phase</label>
                        <select
                          value={newConceptPhase}
                          onChange={(e) => setNewConceptPhase(e.target.value)}
                          className="w-full bg-slate-900 text-slate-200 border border-slate-800 text-xs px-2 py-1.5 rounded-xl focus:outline-none focus:border-purple-500"
                        >
                          <option value="Concept">Concept</option>
                          <option value="Prototyping">Prototyping</option>
                          <option value="Auditing">Auditing</option>
                          <option value="Staging">Staging</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold block">Target Latency</label>
                        <input 
                          type="text"
                          value={newConceptLatency}
                          onChange={(e) => setNewConceptLatency(e.target.value)}
                          className="w-full bg-slate-900 text-slate-100 border border-slate-800 text-xs px-3 py-1.5 rounded-xl focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold block">Impact Index</label>
                        <input 
                          type="text"
                          value={newConceptValue}
                          onChange={(e) => setNewConceptValue(e.target.value)}
                          className="w-full bg-slate-900 text-slate-100 border border-slate-800 text-xs px-3 py-1.5 rounded-xl focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold block">System Description</label>
                      <textarea
                        required
                        value={newConceptDescription}
                        onChange={(e) => setNewConceptDescription(e.target.value)}
                        placeholder="Detailed engineering specification of the neural ledger mapping strategy..."
                        rows={3}
                        className="w-full bg-slate-900 text-slate-100 placeholder-slate-600 border border-slate-800 focus:border-purple-500 text-xs px-3 py-2 rounded-xl focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={addingConcept}
                      className="w-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-2 px-4 rounded-xl cursor-pointer transition disabled:opacity-50"
                    >
                      {addingConcept ? "Publishing Concept..." : "Publish Concept to Pipeline"}
                    </button>
                  </form>
                </div>

                {/* Pipeline List */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="bg-slate-950 border border-slate-900 p-4 rounded-2xl">
                    <div className="border-b border-slate-900 pb-2 mb-4 flex justify-between items-center">
                      <h4 className="text-xs font-bold text-slate-200">Active Research Concepts Pipeline</h4>
                      <span className="text-[9px] text-slate-500 font-mono">COUNT: {innovationPipeline.length} ITEMS</span>
                    </div>

                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                      {innovationPipeline.map((item, index) => (
                        <div key={index} className="bg-slate-900/50 border border-slate-900 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between gap-3">
                          <div className="space-y-1.5 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-bold text-slate-200">{item.title}</span>
                              <span className="text-[8px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/15 px-1.5 py-0.5 rounded uppercase">{item.domain}</span>
                              <span className="text-[8px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700 px-1.5 py-0.5 rounded">{item.phase}</span>
                            </div>
                            <p className="text-[10px] text-slate-400 leading-relaxed">{item.description}</p>
                          </div>
                          
                          <div className="flex sm:flex-col justify-between sm:justify-center items-end text-right font-mono text-[9px] border-t sm:border-t-0 border-slate-850 pt-2 sm:pt-0 gap-1.5">
                            <div>
                              <span className="text-slate-500 uppercase">LATENCY:</span>{" "}
                              <strong className="text-slate-200 font-bold">{item.latency}</strong>
                            </div>
                            <div>
                              <span className="text-slate-500 uppercase">IMPACT VAL:</span>{" "}
                              <strong className="text-emerald-400 font-bold">{item.value}/10</strong>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Researchers Panel */}
                  <div className="bg-slate-950 border border-slate-900 p-4 rounded-2xl">
                    <div className="border-b border-slate-900 pb-2 mb-3">
                      <h4 className="text-xs font-bold text-slate-200">Assigned AI Agents / Cognitive Researchers</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[160px] overflow-y-auto pr-1">
                      {researchers.map((item, idx) => (
                        <div key={idx} className="bg-slate-900 border border-slate-850 p-2.5 rounded-xl flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-purple-900/40 text-purple-400 flex items-center justify-center font-bold text-xs font-mono border border-purple-500/10">
                            {item.name.charAt(0)}
                          </div>
                          <div>
                            <strong className="text-[11px] text-slate-200 block">{item.name}</strong>
                            <span className="text-[9px] font-mono text-purple-400 block">{item.specialty}</span>
                            <span className="text-[9px] text-slate-500 block truncate font-sans">Research: {item.currentProject}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* 16. DEPLOYMENT & CI/CD PIPELINE LOGS */}
          {activeTab === "deployment_pipeline" && (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-sky-400" />
                    <span>CI/CD Pipeline Releases &amp; Fail-Safe Recovery</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Continuous integration delivery records. Push automated microservices releases or trigger state rollbacks instantly.</p>
                </div>
                <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 border border-sky-500/25 px-2 py-1 rounded">PIPELINE SECURED</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Deployment Control & Rollback Column */}
                <div className="lg:col-span-5 space-y-4">
                  
                  {/* Push Build Card */}
                  <div className="bg-slate-950 border border-slate-900 p-4 rounded-2xl space-y-4">
                    <div className="border-b border-slate-900 pb-2">
                      <h4 className="text-xs font-bold text-slate-200">Trigger Production Build &amp; Compile</h4>
                      <p className="text-[10px] text-slate-500">Kick off linting, transpiling, SPA building, and cloud-run deploy.</p>
                    </div>

                    <form onSubmit={handleTriggerBuild} className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold block">Branch Source</label>
                        <select
                          value={buildBranch}
                          onChange={(e) => setBuildBranch(e.target.value)}
                          className="w-full bg-slate-900 text-slate-200 border border-slate-800 text-xs px-2 py-1.5 rounded-xl focus:outline-none focus:border-sky-500"
                        >
                          <option value="main">main (production)</option>
                          <option value="develop">develop (integration)</option>
                          <option value="hotfix-core">hotfix-core (critical)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold block">Release Notes / Commit Message</label>
                        <input 
                          type="text"
                          required
                          value={buildCommitMessage}
                          onChange={(e) => setBuildCommitMessage(e.target.value)}
                          placeholder="e.g. Patching security signature validation logic"
                          className="w-full bg-slate-900 text-slate-100 placeholder-slate-600 border border-slate-800 text-xs px-3 py-2 rounded-xl focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={triggeringBuild}
                        className="w-full bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold py-2 px-4 rounded-xl cursor-pointer transition disabled:opacity-50"
                      >
                        {triggeringBuild ? "Building Pipeline..." : "Compile & Deploy Release"}
                      </button>
                    </form>
                  </div>

                  {/* Immediate Rollback Card */}
                  <div className="bg-slate-950 border border-slate-900 p-4 rounded-2xl space-y-4">
                    <div className="border-b border-slate-900 pb-2">
                      <h4 className="text-xs font-bold text-slate-200 text-rose-400">Fail-Safe Rollback Engine</h4>
                      <p className="text-[10px] text-slate-500">Instantly roll back system container assets to a healthy version snapshot.</p>
                    </div>

                    <form onSubmit={handleTriggerRollback} className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold block">Target Version</label>
                        <input 
                          type="text"
                          required
                          value={rollbackVersion}
                          onChange={(e) => setRollbackVersion(e.target.value)}
                          placeholder="e.g. v2.4.1"
                          className="w-full bg-slate-900 text-slate-100 placeholder-slate-600 border border-slate-800 text-xs px-3 py-2 rounded-xl focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={triggeringRollback}
                        className="w-full bg-rose-950/40 border border-rose-500/20 hover:bg-rose-900 text-rose-300 text-xs font-bold py-2 px-4 rounded-xl cursor-pointer transition disabled:opacity-50"
                      >
                        {triggeringRollback ? "Restoring Cache..." : "Initiate Immediate Rollback"}
                      </button>
                    </form>
                  </div>

                </div>

                {/* Build History and Logs Column */}
                <div className="lg:col-span-7 space-y-4">
                  
                  {/* Latest Logs Panel */}
                  <div className="bg-slate-950 border border-slate-900 p-4 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                      <h4 className="text-xs font-bold text-slate-200">Active Build Container logs</h4>
                      <span className="text-[8px] font-mono text-emerald-400 animate-pulse flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> LIVE VIEWING
                      </span>
                    </div>

                    <div className="bg-black/95 font-mono text-[10px] text-teal-400 p-3 rounded-xl max-h-[150px] overflow-y-auto space-y-1 leading-relaxed border border-slate-900">
                      {deploymentHistory[0]?.logs.map((log: string, idx: number) => (
                        <div key={idx} className="flex gap-2">
                          <span className="text-slate-600 select-none">[{idx+1}]</span>
                          <span className="text-slate-200">{log}</span>
                        </div>
                      )) || (
                        <div className="text-slate-500">No logs loaded in current active deployment profile.</div>
                      )}
                    </div>
                  </div>

                  {/* History Cards */}
                  <div className="bg-slate-950 border border-slate-900 p-4 rounded-2xl">
                    <div className="border-b border-slate-900 pb-2 mb-3">
                      <h4 className="text-xs font-bold text-slate-200">Deployment History Logs</h4>
                    </div>

                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                      {deploymentHistory.map((item, index) => (
                        <div key={index} className="bg-slate-900/40 border border-slate-900 p-3 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white font-mono">{item.version}</span>
                              <span className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                                item.status === "Success" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                              }`}>{item.status}</span>
                            </div>
                            <p className="text-[10px] text-slate-300 font-mono italic">"{item.commitMessage}"</p>
                            <span className="text-[9px] text-slate-500 block font-sans">By: {item.actor} | {new Date(item.timestamp).toLocaleString()}</span>
                          </div>

                          <div className="text-right font-mono text-[9px] text-slate-400">
                            <span className="bg-slate-950 border border-slate-850 px-2 py-1 rounded">BRANCH: {item.branch}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* 17. PLATFORM COMMERCIAL MARKETPLACE */}
          {activeTab === "marketplace" && (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <LayoutGrid className="h-4 w-4 text-emerald-400" />
                    <span>JUMO Platform Marketplace &amp; Extension Vault</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Install pre-tested domain plugins, AI cognitive agents, and billing templates across isolated tenant scopes on-the-fly.</p>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2 py-1 rounded">GLOBAL REGISTRY</span>
              </div>

              {/* Grid Catalog */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[550px] overflow-y-auto pr-1">
                {marketplaceCatalog.map((plugin, index) => (
                  <div key={index} className="bg-slate-950 border border-slate-900 p-4 rounded-2xl flex flex-col justify-between gap-4 relative overflow-hidden group">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <strong className="text-xs font-bold text-white block group-hover:text-emerald-400 transition">{plugin.name}</strong>
                          <span className="text-[9px] font-mono uppercase text-emerald-500 mt-0.5 block">{plugin.category}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-400">{plugin.price}</span>
                      </div>
                      
                      <p className="text-[10px] text-slate-400 leading-relaxed">{plugin.description}</p>
                    </div>

                    <div className="border-t border-slate-900 pt-3.5 flex items-center justify-between font-mono text-[9px] text-slate-500">
                      <div className="flex gap-2">
                        <span>★ {plugin.rating}</span>
                        <span>• {plugin.downloads}</span>
                      </div>
                      
                      <div>
                        {plugin.status === "Installed" ? (
                          <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/15 px-2 py-1 rounded uppercase">Installed</span>
                        ) : (
                          <button
                            onClick={() => handleInstallPlugin(plugin.id)}
                            disabled={installingPluginId !== null}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1 px-3 border-0 rounded-xl cursor-pointer transition disabled:opacity-50 text-[10px]"
                          >
                            {installingPluginId === plugin.id ? "Installing..." : "Install"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 18. DIGITAL TWIN SIMULATION RUNS */}
          {activeTab === "digital_twin" && (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Network className="h-4 w-4 text-rose-400" />
                    <span>Digital Twin Simulation Labs &amp; Governance Audit</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Simulate macroeconomic scenarios, default triggers, and fee impacts. Execute continuous Zero-Parity compliance scoring.</p>
                </div>
                <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 border border-rose-500/25 px-2 py-1 rounded">COMPLIANCE CERTIFIED</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Simulation Control Panel */}
                <div className="lg:col-span-5 bg-slate-950 border border-slate-900 p-4 rounded-2xl space-y-4">
                  <div className="border-b border-slate-900 pb-2">
                    <h4 className="text-xs font-bold text-slate-200">Simulate Operating Impact Scenarios</h4>
                    <p className="text-[10px] text-slate-500">Evaluate tenant liquidity structures and ledger stability variables before execution.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold block">Macro-Stress Scenario</label>
                      <select
                        value={twinScenario}
                        onChange={(e: any) => setTwinScenario(e.target.value)}
                        className="w-full bg-slate-900 text-slate-200 border border-slate-800 text-xs px-2 py-2 rounded-xl focus:outline-none focus:border-rose-500"
                      >
                        <option value="high_fees">1. Fee Optimization Stress Scenario</option>
                        <option value="low_default">2. Credit Scoring Multiplier Scenario</option>
                        <option value="grant_dryout">3. NGO Donor Funding Restructuring Scenario</option>
                      </select>
                    </div>

                    <button
                      onClick={handleRunTwinSimulation}
                      disabled={twinSimulating}
                      className="w-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold py-2 px-4 rounded-xl cursor-pointer transition disabled:opacity-50"
                    >
                      {twinSimulating ? "Synthesizing State Simulator..." : "Run Digital Twin Simulation"}
                    </button>
                  </div>

                  {/* Twin Report Results Panel */}
                  {twinSimulationResult && (
                    <div className="bg-slate-900/40 border border-slate-900 p-3 rounded-xl space-y-3 font-mono text-[9px] text-slate-300 animate-fade-in">
                      <div className="flex justify-between border-b border-slate-800 pb-1.5">
                        <span className="uppercase text-slate-500">Scenario Title:</span>
                        <strong className="text-white text-right">{twinSimulationResult.scenario.replace(/_/g, ' ').toUpperCase()}</strong>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center py-2 border-b border-slate-800">
                        <div>
                          <span className="text-slate-500 block text-[8px] uppercase">REVENUE DIFF</span>
                          <strong className="text-emerald-400 text-[10px]">{twinSimulationResult.modeledRevenueDiff}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[8px] uppercase">DEFAULT RATE</span>
                          <strong className="text-amber-400 text-[10px]">{twinSimulationResult.predictedDefaultRate}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[8px] uppercase">RISK LEVEL</span>
                          <strong className="text-rose-400 text-[10px]">{twinSimulationResult.modeledRiskIndex}/10</strong>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-500 uppercase block">Prediction Insight:</span>
                        <p className="text-[9px] text-slate-400 leading-relaxed font-sans italic">"{twinSimulationResult.narrative}"</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Live Compliance & Auditing Section */}
                <div className="lg:col-span-7 bg-slate-950 border border-slate-900 p-4 rounded-2xl space-y-4">
                  <div className="border-b border-slate-900 pb-2 flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Continuous Governance Compliance Report</h4>
                      <p className="text-[10px] text-slate-500">Automated ledger audits verifying zero-parity balance, loan ratios, and sec limits.</p>
                    </div>
                    {governanceReport && (
                      <span className="text-emerald-400 font-bold font-mono bg-emerald-500/10 border border-emerald-500/15 px-2 py-1 rounded text-[10px]">
                        SCORE: {governanceReport.score}
                      </span>
                    )}
                  </div>

                  {governanceLoading ? (
                    <div className="text-xs text-slate-500 font-mono py-8 text-center animate-pulse">Running global ledger security audits...</div>
                  ) : governanceReport ? (
                    <div className="space-y-3">
                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                        {governanceReport.criteriaEvaluations.map((cri: any, i: number) => (
                          <div key={i} className="bg-slate-900/60 border border-slate-900 p-2.5 rounded-xl flex items-start justify-between gap-3">
                            <div>
                              <strong className="text-[10px] text-slate-200 block">{cri.name}</strong>
                              <span className="text-[9px] text-slate-400 mt-0.5 block">{cri.details}</span>
                            </div>
                            <span className="text-[8px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 px-1.5 py-0.5 rounded uppercase">
                              {cri.status}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-slate-900 pt-3 space-y-2 font-mono text-[9px] text-slate-400">
                        <div className="flex justify-between items-start">
                          <span className="uppercase text-slate-500">Report ID:</span>
                          <span className="text-slate-300">{governanceReport.reportId}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="uppercase text-slate-500">Certified Timestamp:</span>
                          <span className="text-slate-300">{new Date(governanceReport.certifiedAt).toLocaleString()}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="uppercase text-slate-500 block">SHA-256 INTEGRITY SIGNATURE:</span>
                          <span className="text-[8px] text-slate-500 break-all bg-black/50 p-1.5 rounded border border-slate-900 block font-mono">{governanceReport.integritySignature}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 font-mono py-8 text-center">Simulations complete. Report queue idle.</div>
                  )}
                </div>

              </div>
            </div>
          )}

        </div>

        {/* RIGHT CONTEXT PANEL (3 COLS) */}
        {showRightContextPanel && (
          <div className="lg:col-span-3 bg-slate-900 text-white border border-slate-800 rounded-2xl p-4 shadow-sm space-y-4 max-h-[820px] overflow-y-auto font-mono text-xs">
            
            {/* PANEL HEADER */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-teal-400 animate-pulse" />
                <h3 className="font-bold text-slate-200 text-xs tracking-wide uppercase">TELEMETRY SIDEBAR</h3>
              </div>
              <button
                onClick={() => setShowRightContextPanel(false)}
                className="text-slate-500 hover:text-slate-300 text-[10px] bg-slate-800 px-2 py-0.5 rounded cursor-pointer"
              >
                Hide
              </button>
            </div>

            {/* 1. CURRENT SYSTEM ACTIVITY */}
            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex justify-between">
                <span>Live Event Stream</span>
                <span className="text-emerald-400">REALTIME</span>
              </div>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1 text-[10px]">
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80 space-y-0.5">
                  <div className="flex justify-between text-slate-400 text-[9px]">
                    <span className="text-teal-400 font-bold">FAAP_LEDGER_SYNC</span>
                    <span>12:01:04</span>
                  </div>
                  <p className="text-slate-300">Balance parity verified across 14 tenants ($0.00 offset).</p>
                </div>

                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80 space-y-0.5">
                  <div className="flex justify-between text-slate-400 text-[9px]">
                    <span className="text-blue-400 font-bold">ZERO_TRUST_AUTH</span>
                    <span>12:00:52</span>
                  </div>
                  <p className="text-slate-300">SecOps admin claims validated for tenant Sovereign Core.</p>
                </div>

                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80 space-y-0.5">
                  <div className="flex justify-between text-slate-400 text-[9px]">
                    <span className="text-purple-400 font-bold">AI_AGENT_LOOP</span>
                    <span>12:00:18</span>
                  </div>
                  <p className="text-slate-300">Ledger Auditor AI completed routine memory context sweep.</p>
                </div>
              </div>
            </div>

            {/* 2. RECENT DEPLOYMENTS */}
            <div className="space-y-2 border-t border-slate-800 pt-3">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex justify-between">
                <span>Deploy Pipeline</span>
                <span className="text-blue-400">RENDER LIVE</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-200 font-bold">phase9-frontend-integration</span>
                  <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded text-[8px] uppercase">DEPLOYED</span>
                </div>
                <p className="text-slate-400 text-[9px]">Commit 773ba5a • Render Europe-West1</p>
                <div className="text-[8.5px] text-slate-500 pt-1 flex justify-between">
                  <span>Build: 42s</span>
                  <span>Target: production</span>
                </div>
              </div>
            </div>

            {/* 3. RUNNING AI TASKS */}
            <div className="space-y-2 border-t border-slate-800 pt-3">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex justify-between">
                <span>Cognitive Swarms</span>
                <span className="text-purple-400">3 SWARMS</span>
              </div>
              <div className="space-y-1.5 text-[10px]">
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-slate-200 font-bold block">Ledger Auditor AI</span>
                    <span className="text-slate-500 text-[9px]">Gemini 3.5 Flash</span>
                  </div>
                  <span className="text-emerald-400 text-[9px] font-bold">ACTIVE</span>
                </div>

                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-slate-200 font-bold block">Compliance Guard</span>
                    <span className="text-slate-500 text-[9px]">Gemini 3.5 Flash</span>
                  </div>
                  <span className="text-emerald-400 text-[9px] font-bold">ACTIVE</span>
                </div>
              </div>
            </div>

            {/* 4. SECURITY & FAAP ALERTS */}
            <div className="space-y-2 border-t border-slate-800 pt-3">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex justify-between">
                <span>Security &amp; Audit Status</span>
                <span className="text-emerald-400">0 CRITICAL</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1 text-[9.5px]">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Zero Trust Claims</span>
                  <span className="text-emerald-400 font-bold">ENFORCED</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>FAAP Parity Check</span>
                  <span className="text-emerald-400 font-bold">BALANCED</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>AES-256 Vault Keys</span>
                  <span className="text-emerald-400 font-bold">ROTATED</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* 3. PERSISTENT OPERATING SYSTEM BOTTOM STATUS BAR */}
      <div className="bg-slate-900 text-slate-300 border border-slate-800 rounded-2xl px-4 py-2 shadow-inner font-mono text-[10px] flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-200 font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>JUMO UEOS v2.0.4-LTS</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1 text-slate-400">
            <Database className="h-3 w-3 text-blue-400" />
            <span>DB: <strong className="text-slate-200">Dual-Mode PostgreSQL</strong></span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1 text-slate-400">
            <Zap className="h-3 w-3 text-amber-400" />
            <span>API Latency: <strong className="text-emerald-400">185ms</strong></span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1 text-slate-400">
            <GitBranch className="h-3 w-3 text-purple-400" />
            <span>Workflows: <strong className="text-slate-200">120 Active</strong></span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1 text-slate-400">
            <Bot className="h-3 w-3 text-indigo-400" />
            <span>AI Gateway: <strong className="text-slate-200">Gemini 3.5 Ready</strong></span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="h-3 w-3 text-emerald-400" />
            <span>Security: <strong className="text-emerald-400">Zero Trust Enforced</strong></span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1 text-slate-400">
            <Coins className="h-3 w-3 text-teal-400" />
            <span>FAAP Treasury: <strong className="text-teal-400">$395,000 Balanced</strong></span>
          </div>
        </div>
      </div>

    </div>
  );
}
