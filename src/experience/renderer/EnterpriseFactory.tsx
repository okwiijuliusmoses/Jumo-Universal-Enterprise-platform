import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, Cpu, Globe, Layers, Settings, Shield, Workflow, ChevronRight, CheckCircle2, ArrowRight, Database, Loader2, FileText, LayoutGrid, Users, Plus, Trash2, Sliders, Lock, Sparkles, Check, BarChart3, Activity, Zap, Network, RefreshCw, Clock, BrainCircuit, DollarSign, Package
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function EnterpriseFactory({ 
  initialTemplateId,
  onProvisionSuccess 
}: { 
  initialTemplateId?: string;
  onProvisionSuccess?: (instance: any) => void; 
}) {
  const [view, setView] = useState<"dashboard" | "blueprint" | "workspace" | "queue">("dashboard");
  const [step, setStep] = useState(1);
  const [ecosystems, setEcosystems] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAIThinking, setIsAIThinking] = useState(false);

  const stepsList = [
    { num: 1, label: "Ecosystem" },
    { num: 2, label: "Template" },
    { num: 3, label: "Identity" },
    { num: 4, label: "Infrastructure" },
    { num: 5, label: "Financial" },
    { num: 6, label: "Database" },
    { num: 7, label: "Security" },
    { num: 8, label: "API" },
    { num: 9, label: "Workflow" },
    { num: 10, label: "UI/UX" },
    { num: 11, label: "Memory" },
    { num: 12, label: "Governance" },
    { num: 13, label: "Review" },
    { num: 14, label: "Complete" },
  ];
  
  // Manufacturing Modules State (Dynamic)
  const [manufacturingModules, setManufacturingModules] = useState<any[]>([]);
  
  // Restored state variables
  const [selectedEcosystem, setSelectedEcosystem] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>(initialTemplateId || "");
  const [newDeptInput, setNewDeptInput] = useState("");
  const [activeAIJobs, setActiveAIJobs] = useState<any[]>([
    { id: "ENG-001", role: "Sovereign AI Engineer", status: "thinking", progress: 85, task: "Designing complete ERP architecture" },
    { id: "GOV-001", role: "Governance AI", status: "thinking", progress: 62, task: "Generating council structures" },
    { id: "SEC-001", role: "Security AI", status: "thinking", progress: 45, task: "Generatig AEGIS RBAC policies" }
  ]);

  // Registry-backed Selectors
  const countries = ["Uganda", "Kenya", "Tanzania", "Rwanda", "Zambia", "Ethiopia", "South Sudan", "Burundi", "Malawi", "South Africa"];
  const regions = ["Central", "East", "West", "North", "South", "Region 1", "Region 2", "National HQ"];
  const institutionCategories = [
    "National Institution", 
    "Regional Body", 
    "Private Enterprise", 
    "Government Ministry", 
    "Public Authority", 
    "Academic Institution", 
    "Healthcare Provider", 
    "Financial Institution", 
    "Cooperative / SACCO",
    "Non-Governmental Organization"
  ];

  // Derived state
  const availableTemplates = templates.filter(t => !selectedEcosystem || t.ecosystemId === selectedEcosystem || t.ecosystem === selectedEcosystem);
  const currentTemplate = templates.find(t => t.id === selectedTemplate);

  useEffect(() => {
    async function fetchFactoryMetadata() {
      const metadata = await UEOSRuntimeClient.fetchFactoryMetadata();
      setManufacturingModules(metadata.modules || []);
      // ... (other metadata fetching)
    }
    fetchFactoryMetadata();
  }, []);

  const aiEngineers = [
    { role: "Sovereign AI", desc: "Designs complete ERP automatically.", icon: Sparkles },
    { role: "Governance AI", desc: "Generates councils, committees, departments.", icon: Shield },
    { role: "Portal AI", desc: "Creates portals, navigation, dashboards.", icon: Globe },
    { id: "dept", role: "Department AI", desc: "Creates departments, offices, directorates.", icon: Building2 },
    { role: "Module AI", desc: "Creates modules automatically.", icon: Cpu },
    { role: "Form AI", desc: "Creates digital forms.", icon: FileText },
    { role: "Workflow AI", desc: "Creates approval workflows.", icon: Workflow },
    { role: "Reports AI", desc: "Creates reports automatically.", icon: BarChart3 },
    { role: "UI AI", desc: "Creates enterprise pages & layouts.", icon: LayoutGrid },
    { role: "Provisioning AI", desc: "Creates institution deployment package.", icon: Zap },
    { role: "Compliance AI", desc: "Checks national standards.", icon: CheckCircle2 },
    { role: "Security AI", desc: "Generates AEGIS RBAC & Zero Trust.", icon: Lock },
    { role: "FAAP AI", desc: "Creates financial architecture & ledger.", icon: Activity },
  ];
  const regulatoryAuthorities = [
    "National Council for Higher Education (NCHE)", 
    "Bank of Uganda (BoU)", 
    "Ministry of Health", 
    "Ministry of Education", 
    "NGO Bureau", 
    "Capital Markets Authority",
    "Insurance Regulatory Authority"
  ];

  const [institutionConfig, setInstitutionConfig] = useState({
    name: "",
    domain: "",
    country: "Uganda",
    region: "Central",
    category: "National Institution",
    regulatoryAuthority: "Ministry of Education",
    branchCount: 1,
    estimatedUsers: 1000,
    adminEmail: "admin@institution.gov",
    deploymentTarget: "Cloud Run (Sovereign)",
  });

  const [governanceConfig, setGovernanceConfig] = useState({
    councilTitle: "Governing Council",
    executiveLeadership: "Vice Chancellor / Executive Director",
    academicSenateTitle: "Senate / Board of Trustees",
    financeCommittee: "Bursar & FAAP Treasury Committee",
    auditCommittee: "Internal Audit Directorate",
    complianceFramework: "UEOS Standard Compliance v5"
  });

  const [departments, setDepartments] = useState<string[]>([
    "Executive Directorate & Policy",
    "Operations & Logistics Directorate",
    "FAAP Treasury & Finance Directorate",
    "Human Capital & Payroll Directorate",
    "ICT & Security Governance Directorate"
  ]);

  const [portals, setPortals] = useState<any[]>([
    { id: "exec", name: "Executive Leadership Portal", enabled: true, role: "Board / Executive" },
    { id: "dept", name: "Directorate & Department Workspace", enabled: true, role: "Directors / Heads of Dept" },
    { id: "staff", name: "Operational Staff Portal", enabled: true, role: "Staff Officers" },
    { id: "public", name: "Public Gateway Experience", enabled: true, role: "Public / Applicants" },
    { id: "consumer", name: "Client / Consumer Workspace", enabled: true, role: "Students / Patients / Members" }
  ]);

  const [activeModuleIds, setActiveModuleIds] = useState<string[]>([
    "faap-ledger", "faap-treasury", "hr-payroll", "procurement-assets", "identity-rbac", "document-intelligence", "ai-copilot", "service-desk"
  ]);

  const [enabledForms, setEnabledForms] = useState<string[]>([
    "Institutional Registration / Application Form",
    "Staff Onboarding & Access Requisition",
    "Procurement & Financial Expenditure Voucher",
    "FAAP Treasury Rebalancing Voucher",
    "Operational Task Request & Incident Report"
  ]);

  const [components, setComponents] = useState<string[]>([
    "Dynamic Data Tables", "FAAP Balance Visualizers", "Workflow Timeline", "AI Chat Interface", "Document Viewer"
  ]);

  const [workflows, setWorkflows] = useState<string[]>([
    "Expenditure Approval Chain", "Staff Recruitment Flow", "Institutional Licensing Cycle", "Audit Log Review"
  ]);

  const [reports, setReports] = useState<string[]>([
    "FAAP Balance Sheet", "Income & Expenditure", "Staff Attendance", "Module Utilization", "Audit Compliance Report"
  ]);

  const [aiConfig, setAiConfig] = useState({
    model: "Gemini 3.6 Flash (Sovereign)",
    researchAgentEnabled: true,
    autoAuditEnabled: true,
    smartSummaries: true
  });

  const [securityConfig, setSecurityConfig] = useState({
    mfaRequired: true,
    rbacMode: "Zero-Trust Strict",
    sessionTimeout: 30,
    encryptionLevel: "AES-256-GCM"
  });

  const [approvalRoles, setApprovalRoles] = useState<string[]>([
    "Executive Director", "Head of Finance", "Head of HR", "Audit Supervisor"
  ]);

  const [faapConfig, setFaapConfig] = useState({
    approvalThreshold: 10000,
    autoPostToGeneralLedger: true,
    requireMfaForDisbursements: true,
    fiscalYearStart: "January"
  });

  const [provisioningStatus, setProvisioningStatus] = useState({
    status: "idle", // idle, provisioning, complete
    logs: [] as string[]
  });
  const [manufacturedInstance, setManufacturedInstance] = useState<any>(null);

  // Advanced Manufacturing State Machine & Lifecycle State
  const [mfgStepIndex, setMfgStepIndex] = useState(-1);
  const [instanceVersion, setInstanceVersion] = useState("v13.0.0-LOCKED");
  const [isPatching, setIsPatching] = useState(false);
  const [patchLogs, setPatchLogs] = useState<string[]>([]);
  const [mfaChallengeActive, setMfaChallengeActive] = useState(false);
  const [mfaVerified, setMfaVerified] = useState(false);
  const [mfaInput, setMfaInput] = useState("");
  const [selectedCompletedTab, setSelectedCompletedTab] = useState<"workspace" | "faap" | "aegis" | "telemetry" | "marketplace" | "upgrade">("workspace");
  const [ledgerTxCount, setLedgerTxCount] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const ecos = await UEOSRuntimeClient.fetchEcosystems();
        const tpls = await UEOSRuntimeClient.fetchTemplates();
        setEcosystems(ecos || []);
        setTemplates(tpls || []);

        if (initialTemplateId) {
          const tpl = tpls.find((t: any) => t.id === initialTemplateId);
          if (tpl) {
            setSelectedTemplate(tpl.id);
            setSelectedEcosystem(tpl.ecosystemId);
            setStep(3); // Jump straight to Institution config if template pre-selected
          }
        }
      } catch (err) {
        console.error("Manufacturing engine data fetch error", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [initialTemplateId]);

  const generateAIRecommendation = async () => {
    if (!selectedTemplate) return;
    setIsAIThinking(true);
    
    // Simulate AI Manufacturing Decision Engine
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const tpl = templates.find(t => t.id === selectedTemplate);
    if (tpl) {
      if (tpl.availableModules) setActiveModuleIds(tpl.availableModules.map((m: any) => m.id || m));
      if (tpl.portals) setPortals(tpl.portals.map((p: any) => ({
        id: p.id || p.name.toLowerCase().replace(/\s+/g, '-'),
        name: p.name, enabled: true, role: p.role || "Standard"
      })));
      if (tpl.directorates) setDepartments(tpl.directorates.map((d: any) => d.name));
      
      // Auto-set intelligent defaults based on template type
      const tplId = selectedTemplate.toLowerCase();
      
      if (tplId.includes('university') || tplId.includes('education')) {
        setGovernanceConfig(prev => ({ ...prev, councilTitle: "University Council", executiveLeadership: "Vice Chancellor" }));
        setEnabledForms(prev => [...prev, "Tuition Payment Waiver", "Course Enrollment Form"]);
        // Automatic attachment of Education Service Suites
        setActiveModuleIds(prev => [...prev, "faap-edu-finance", "student-pay-gateway", "edu-ai-agents", "aegis-edu-security", "jumo-cloud-edu-runtime"]);
      } else if (tplId.includes('hospital') || tplId.includes('healthcare') || tplId.includes('medical')) {
        setGovernanceConfig(prev => ({ ...prev, councilTitle: "Medical Board", executiveLeadership: "Chief Medical Officer" }));
        setEnabledForms(prev => [...prev, "Patient Admission Form", "Medical Insurance Claim"]);
        // Automatic attachment of Healthcare Service Suites
        setActiveModuleIds(prev => [...prev, "healthcare-ledger", "patient-billing-gateway", "health-ai-diagnostics", "aegis-health-privacy", "jumo-cloud-health-runtime"]);
      } else if (tplId.includes('banking') || tplId.includes('finance') || tplId.includes('bank')) {
        setGovernanceConfig(prev => ({ ...prev, councilTitle: "Board of Directors", executiveLeadership: "Chief Executive Officer" }));
        setFaapConfig(prev => ({ ...prev, approvalThreshold: 50000 }));
        // Automatic attachment of Banking Service Suites
        setActiveModuleIds(prev => [...prev, "banking-ledger", "digital-banking-gateway", "fraud-ai-agent", "aegis-fin-security", "jumo-cloud-fin-runtime"]);
      } else if (tplId.includes('sacco')) {
        setGovernanceConfig(prev => ({ ...prev, councilTitle: "SACCO Board", executiveLeadership: "General Manager" }));
        setFaapConfig(prev => ({ ...prev, approvalThreshold: 5000 }));
        setActiveModuleIds(prev => [...prev, "faap-sacco-ledger", "aegis-fin-security"]);
      }
    }
    
    setIsAIThinking(false);
    setStep(3); // Proceed to Institution Details
  };

  const toggleModule = (id: string) => {
    setActiveModuleIds(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  };

  const togglePortal = (id: string) => {
    setPortals(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  const toggleForm = (formName: string) => {
    setEnabledForms(prev => prev.includes(formName) ? prev.filter(f => f !== formName) : [...prev, formName]);
  };

  const addDepartment = () => {
    if (newDeptInput.trim() && !departments.includes(newDeptInput.trim())) {
      setDepartments([...departments, newDeptInput.trim()]);
      setNewDeptInput("");
    }
  };

  const removeDepartment = (dept: string) => {
    setDepartments(departments.filter(d => d !== dept));
  };

  const startProvisioning = async () => {
    setStep(14);
    setMfgStepIndex(0);
    setProvisioningStatus({ 
      status: "provisioning", 
      logs: [
        "Initializing JUMO UEOS Intelligent Manufacturing Engine...",
        "Freezing architecture baseline v13-LOCKED and locking factory pipelines."
      ] 
    });
    
    const log = (msg: string, delay: number) => {
      return new Promise(resolve => {
        setTimeout(() => {
          setProvisioningStatus(prev => ({
            ...prev,
            logs: [...prev.logs, msg]
          }));
          resolve(true);
        }, delay);
      });
    };

    try {
      // Step 1: Sovereign Instance Generation
      await log("STAGE 1/12: Spawning Sovereign Instance Record...", 300);
      await log(`Validating requested template parameters [${selectedTemplate}] against central repository...`, 200);
      await log("Success: Empty instance registered in-memory under parent kernel.", 200);
      setMfgStepIndex(1);

      // Step 2: Tenant Identity Allocation
      await log("STAGE 2/12: Triggering Tenant Identity Allocation...", 300);
      const computedTenantId = `tenant-id-${institutionConfig.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      await log(`Allocating unique multi-tenant boundary token: ${computedTenantId}`, 250);
      await log("Zero-trust workspace boundary mapped to SecOps administrators.", 200);
      setMfgStepIndex(2);

      // Step 3: Identity Portal Suite Compilation
      await log("STAGE 3/12: Initiating Portal Suite Compilation...", 300);
      await log(`Generating ${portals.filter(p => p.enabled).length} identity portal instances.`, 250);
      await log("Linking portal gateways back to the single sign-on database.", 200);
      setMfgStepIndex(3);

      // Step 4: Core Module Installation
      await log("STAGE 4/12: Mounting Core Enterprise Modules...", 350);
      await log(`Installing requested modules: ${activeModuleIds.join(", ")}`, 300);
      await log("Modules integrated into the system-wide plugin registry.", 200);
      setMfgStepIndex(4);

      // Step 5: AI Cognitive Agent Swarm Spawn
      await log("STAGE 5/12: Activating Cognitive Assistant Swarm...", 350);
      await log("Spawning specialized AI subagents (Ledger Auditor, CFOBot, SecOpsAnalyst)...", 300);
      await log("Memory contexts and retrieval buffers successfully established.", 200);
      setMfgStepIndex(5);

      // Step 6: FAAP Ledger Connection
      await log("STAGE 6/12: Establishing FAAP Ledger Sync...", 350);
      await log("Opening Chart of Accounts general sub-ledgers (1010-CASH, 4020-JUMO-FEES)...", 300);
      await log("Enforcing master 1.5% settlement fee rule on fintech routers.", 200);
      setMfgStepIndex(6);

      // Step 7: AEGIS Zero-Trust Gating
      await log("STAGE 7/12: Initializing AEGIS Security Gateways...", 350);
      await log(`Setting security clearance to: ${securityConfig.rbacMode}. Enforcing AES-256-GCM.`, 300);
      await log("MFA signature wall triggers armed for administrative actions.", 200);
      setMfgStepIndex(7);

      // Step 8: JUMO Cloud Environment Provisioning
      await log("STAGE 8/12: Provisioning JUMO Cloud Virtual Nodes...", 350);
      await log(`Carving safe container namespace on '${institutionConfig.deploymentTarget}'...`, 300);
      const computedDomain = institutionConfig.domain || `${institutionConfig.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.jumo.net`;
      await log(`Domain router link: ${computedDomain} mapped to primary ingress gateway.`, 250);
      setMfgStepIndex(8);

      // Step 9: Public Landing Portal Live-Launch
      await log("STAGE 9/12: Packing Public Landing Gateway Static Assets...", 300);
      await log("Generating landing layout from template blueprint.", 250);
      await log("Public portal endpoint primed and cached in local server routers.", 200);
      setMfgStepIndex(9);

      // Step 10: Post-Login Workspace Assembly
      await log("STAGE 10/12: Compiling Secure Post-Login Dashboards...", 350);
      await log("Generating department workspaces and workflow clearance sheets.", 300);
      await log("Session tokens synced to the identity gateway.", 200);
      setMfgStepIndex(10);

      // Step 11: Marketplace Package Publication
      await log("STAGE 11/12: Compiling Marketplace Installation Package...", 350);
      const computedPkg = `pkg-${institutionConfig.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-v13`;
      await log(`Packaging compiled payload to: ${computedPkg}.pkg`, 300);
      await log("Listing package registered in the active marketplace registry.", 200);
      setMfgStepIndex(11);

      // Step 12: Upgrade & Patch Lifecycle Integration
      await log("STAGE 12/12: Embedding Active Lifecycle Upgrade Hook...", 350);
      await log("Version listener active. Fallback state-restores and rollback snapshots activated.", 300);
      setMfgStepIndex(12);

      // Request actual server-side provisioning
      const selectedModules = currentTemplate?.availableModules?.filter((m: any) => activeModuleIds.includes(m.id || m)) || activeModuleIds;

      const newInstance = await UEOSRuntimeClient.provisionPlatform(selectedTemplate || "university-erp", {
        name: institutionConfig.name,
        domain: institutionConfig.domain || `${institutionConfig.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.jumo.net`,
        country: institutionConfig.country,
        region: institutionConfig.region,
        category: institutionConfig.category,
        regulatoryAuthority: institutionConfig.regulatoryAuthority,
        deploymentTarget: institutionConfig.deploymentTarget,
        adminEmail: institutionConfig.adminEmail,
        governanceConfig,
        activeModules: selectedModules,
        portals: portals.filter(p => p.enabled),
        departments,
        enabledForms,
        components,
        workflows,
        reports,
        aiConfig,
        securityConfig,
        faapConfig,
        signature: "JUMO-AI-MANUFACTURED-2026-v14"
      }, "JUMO-VALID-SIG-2026");

      // Register the package and active agents dynamically in the local server state as well
      await log("COMMITTING SYSTEM MANUFACTURE AND UPDATING GLOBAL REGISTRIES...", 300);
      await log("SUCCESS: ALL 12 MANUFACTURING PHASES COMPILED WITHOUT ERRORS.", 250);

      setManufacturedInstance(newInstance);
      setMfgStepIndex(13); // Completed!
      setProvisioningStatus(prev => ({ ...prev, status: "complete" }));
      if (onProvisionSuccess) {
        onProvisionSuccess(newInstance);
      }
    } catch (err: any) {
      console.error(err);
      await log(`ERROR: Platform manufacturing failed. Cause: ${err.message || err}`, 200);
      setProvisioningStatus(prev => ({ ...prev, status: "idle" }));
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-96"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  const renderDashboard = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Manufacturing Control Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {manufacturingModules.map((mod) => (
          <div 
            key={mod.id} 
            onClick={() => setView(mod.id as any)}
            className={`p-8 rounded-[2.5rem] border transition-all cursor-pointer group shadow-sm hover:shadow-2xl ${
              view === mod.id ? "bg-blue-600 border-blue-600 text-white shadow-blue-200" : "bg-white border-slate-200 hover:border-blue-400"
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all ${
              view === mod.id ? "bg-white/20 text-white" : `bg-${mod.color}-50 text-${mod.color}-600 group-hover:bg-${mod.color}-600 group-hover:text-white`
            }`}>
              <mod.icon className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-black tracking-tight mb-1">{mod.label}</h4>
            <span className={`text-[10px] font-black uppercase tracking-widest ${view === mod.id ? "text-blue-100" : "text-slate-400"}`}>{mod.count}</span>
          </div>
        ))}
      </div>

      {/* Main Manufacturing Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Statistics & Queue */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight italic mb-8">AI Manufacturing <span className="text-blue-600">Status</span></h3>
              <div className="space-y-6">
                {activeAIJobs.map((job) => (
                  <div key={job.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-6">
                    <div className="w-14 h-14 bg-white border border-slate-200 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                      <BrainCircuit className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-black text-slate-900 tracking-tight">{job.role}</span>
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{job.status} • {job.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${job.progress}%` }}
                          className="h-full bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 mt-2 block italic">{job.task}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-3xl font-black text-slate-900 block leading-none mb-1">32</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completed Platforms</span>
            </div>
            <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-3xl font-black text-slate-900 block leading-none mb-1">12</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Reviews</span>
            </div>
            <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-3xl font-black text-slate-900 block leading-none mb-1">245</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Provisioned Nodes</span>
            </div>
          </div>
        </div>

        {/* AI Engineers List */}
        <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-8 shadow-2xl">
          <div className="flex items-center gap-4 border-b border-white/10 pb-6">
            <BrainCircuit className="w-8 h-8 text-blue-500" />
            <h3 className="text-xl font-black tracking-tight">AI Manufacturing Engineers</h3>
          </div>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
            {aiEngineers.map((eng, i) => (
              <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-blue-500 transition-all group">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-white/10 text-blue-400 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <eng.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-black tracking-tight">{eng.role}</span>
                </div>
                <p className="text-[10px] text-slate-400 font-bold leading-relaxed">{eng.desc}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setView("blueprint")}
            className="w-full py-5 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-blue-900/40"
          >
            Start New Manufacture
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {view === "dashboard" && renderDashboard()}
      {view === "blueprint" && (
        <div className="bg-white border border-slate-200 rounded-[3rem] p-12 shadow-sm animate-in zoom-in duration-500">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-4xl font-black text-slate-900 tracking-tighter">Blueprint <span className="text-blue-600">Library</span></h3>
              <p className="text-slate-500 font-bold mt-2">Select a National Enterprise Blueprint to begin manufacturing.</p>
            </div>
            <button onClick={() => setView("dashboard")} className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
              Cancel Manufacture
            </button>
            <button 
                onClick={async () => {
                    if (!selectedTemplate || !selectedEcosystem) return;
                    setIsAIThinking(true);
                    try {
                        const pipelineResult = await UEOSRuntimeClient.runManufacturingPipeline(selectedTemplate, selectedEcosystem);
                        onProvisionSuccess?.(pipelineResult);
                    } catch (err) {
                        console.error("AI Pipeline failed", err);
                    } finally {
                        setIsAIThinking(false);
                    }
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2"
            >
                <Sparkles className="w-4 h-4" /> AI Auto-Manufacture
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ecosystems.map((eco) => (
              <div 
                key={eco.id}
                onClick={() => { setSelectedEcosystem(eco.id); setStep(2); }}
                className={`p-10 rounded-[2.5rem] border-2 transition-all cursor-pointer relative overflow-hidden group ${
                  selectedEcosystem === eco.id ? "border-blue-600 bg-blue-50/50 shadow-2xl" : "border-slate-100 bg-slate-50 hover:border-blue-400 hover:bg-white"
                }`}
              >
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner">
                  <Globe className="w-10 h-10" />
                </div>
                <h4 className="font-black text-slate-900 text-2xl mb-4 italic tracking-tight">{eco.name}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{eco.description}</p>
                {selectedEcosystem === eco.id && (
                  <div className="absolute bottom-6 right-6 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl">
                    <Check className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {selectedEcosystem && (
            <div className="mt-16 space-y-8 animate-in slide-in-from-bottom-10 duration-700">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">Approved Enterprise Templates</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {availableTemplates.map((tpl) => (
                  <div 
                    key={tpl.id}
                    onClick={() => { setSelectedTemplate(tpl.id); setView("workspace"); setStep(3); }}
                    className="p-8 rounded-[3rem] border-2 border-slate-100 bg-white hover:border-indigo-600 hover:shadow-3xl transition-all cursor-pointer flex items-start gap-8 group"
                  >
                    <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center shrink-0 shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Building2 className="w-10 h-10" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-black text-slate-900 text-2xl tracking-tight">{tpl.name}</h4>
                        <span className="text-[10px] font-black bg-slate-200 px-3 py-1 rounded-full text-slate-600">v{tpl.version}</span>
                      </div>
                      <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">{tpl.description}</p>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-1.5 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl">{tpl.availableModules?.length || 0} Modules</span>
                        <span className="px-4 py-1.5 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl">{tpl.portals?.length || 0} Portals</span>
                        <span className="px-4 py-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-widest rounded-xl">Validated</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {view === "workspace" && (
        <div className="bg-white border border-slate-200 rounded-[3rem] p-12 shadow-sm animate-in slide-in-from-right-10 duration-500">
           {/* Legacy Stepper for configuration steps 3-13 */}
           <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic">Manufacturing <span className="text-blue-600">Workspace</span></h3>
              <p className="text-slate-500 font-bold mt-2">Constructing {institutionConfig.name || "Untitled Platform"} based on {currentTemplate?.name}.</p>
            </div>
            <button onClick={() => setView("dashboard")} className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
              Save Draft & Exit
            </button>
          </div>

          {/* Stepper logic preserved but UI updated */}
          <div className="flex items-center justify-between mb-16 relative overflow-x-auto pb-4 scrollbar-hide">
            {stepsList.filter(s => s.num >= 3 && s.num <= 13).map((s) => (
              <div key={s.num} className="flex flex-col items-center gap-3 cursor-pointer group" onClick={() => { if (s.num < step) setStep(s.num); }}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm border-2 transition-all ${
                  step > s.num ? "bg-emerald-500 border-emerald-500 text-white shadow-xl shadow-emerald-100" :
                  step === s.num ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-100 ring-8 ring-blue-50 scale-110" :
                  "bg-slate-50 border-slate-200 text-slate-400 group-hover:border-blue-400"
                }`}>
                  {step > s.num ? <Check className="w-6 h-6" /> : s.num}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${step >= s.num ? "text-slate-900" : "text-slate-400"}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 3 && (
               <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
               {/* Metadata logic remains identical to preserve core functionality */}
               <div className="max-w-4xl bg-slate-50 p-12 rounded-[3rem] border border-slate-200 space-y-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="col-span-full">
                     <label className="block text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Institution Legal Name</label>
                     <input 
                       type="text" 
                       value={institutionConfig.name}
                       onChange={(e) => setInstitutionConfig({ ...institutionConfig, name: e.target.value })}
                       placeholder="e.g. Makerere National University" 
                       className="w-full px-6 py-5 bg-white border border-slate-200 rounded-2xl text-lg font-black outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all italic"
                     />
                   </div>
                   {/* ... rest of metadata inputs ... */}

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Category</label>
                    <select
                      value={institutionConfig.category}
                      onChange={(e) => setInstitutionConfig({ ...institutionConfig, category: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {institutionCategories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Country</label>
                    <select
                      value={institutionConfig.country}
                      onChange={(e) => setInstitutionConfig({ ...institutionConfig, country: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {countries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Region</label>
                    <select
                      value={institutionConfig.region}
                      onChange={(e) => setInstitutionConfig({ ...institutionConfig, region: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {regions.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  <div className="col-span-full md:col-span-2">
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Regulatory Authority</label>
                    <select
                      value={institutionConfig.regulatoryAuthority}
                      onChange={(e) => setInstitutionConfig({ ...institutionConfig, regulatoryAuthority: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {regulatoryAuthorities.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Deployment Target</label>
                    <select
                      value={institutionConfig.deploymentTarget}
                      onChange={(e) => setInstitutionConfig({ ...institutionConfig, deploymentTarget: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Cloud Run (Sovereign)">Cloud Run (Sovereign)</option>
                      <option value="Kubernetes (Private)">Kubernetes (Private Cluster)</option>
                      <option value="On-Premise (Hybrid)">On-Premise (Hybrid Bridge)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Subdomain / Domain</label>
                    <input 
                      type="text" 
                      value={institutionConfig.domain}
                      onChange={(e) => setInstitutionConfig({ ...institutionConfig, domain: e.target.value })}
                      placeholder="e.g. makerere.jumo.net" 
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Primary Admin Email</label>
                    <input 
                      type="email" 
                      value={institutionConfig.adminEmail}
                      onChange={(e) => setInstitutionConfig({ ...institutionConfig, adminEmail: e.target.value })}
                      placeholder="admin@institution.gov" 
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button 
                    disabled={!institutionConfig.name}
                    onClick={() => setStep(4)}
                    className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    Next: Governance Architecture <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Governance Structure */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Stage 4: Sovereign Governance Architecture</h3>
                  <p className="text-sm text-slate-500">Configure supreme governing bodies and executive leadership titles.</p>
                </div>
                <button onClick={() => setStep(3)} className="text-xs font-bold text-slate-500 hover:text-slate-800">← Back</button>
              </div>

              <div className="max-w-3xl bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Supreme Governing Council Title</label>
                    <input 
                      type="text" 
                      value={governanceConfig.councilTitle}
                      onChange={(e) => setGovernanceConfig({ ...governanceConfig, councilTitle: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Chief Executive Leadership Title</label>
                    <input 
                      type="text" 
                      value={governanceConfig.executiveLeadership}
                      onChange={(e) => setGovernanceConfig({ ...governanceConfig, executiveLeadership: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Academic / Policy Board Title</label>
                    <input 
                      type="text" 
                      value={governanceConfig.academicSenateTitle}
                      onChange={(e) => setGovernanceConfig({ ...governanceConfig, academicSenateTitle: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">FAAP Treasury & Audit Committee</label>
                    <input 
                      type="text" 
                      value={governanceConfig.financeCommittee}
                      onChange={(e) => setGovernanceConfig({ ...governanceConfig, financeCommittee: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Audit Committee</label>
                    <input 
                      type="text" 
                      value={governanceConfig.auditCommittee}
                      onChange={(e) => setGovernanceConfig({ ...governanceConfig, auditCommittee: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Compliance Framework</label>
                    <select 
                      value={governanceConfig.complianceFramework}
                      onChange={(e) => setGovernanceConfig({ ...governanceConfig, complianceFramework: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="UEOS Standard Compliance v5">UEOS Standard Compliance v5</option>
                      <option value="National Regulatory Framework (Strict)">National Regulatory Framework (Strict)</option>
                      <option value="Financial Services Tier 1 Compliance">Financial Services Tier 1 Compliance</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button 
                    onClick={() => setStep(5)}
                    className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    Next: Departments & Directorates <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 5: Directorates & Departments */}
          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Stage 5: Directorates & Department Workspaces</h3>
                  <p className="text-sm text-slate-500">Define operational divisions for institution staff.</p>
                </div>
                <button onClick={() => setStep(4)} className="text-xs font-bold text-slate-500 hover:text-slate-800">← Back</button>
              </div>

              <div className="max-w-3xl bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-6">
                <div className="flex gap-3">
                  <input 
                    type="text"
                    value={newDeptInput}
                    onChange={(e) => setNewDeptInput(e.target.value)}
                    placeholder="Enter new Directorate or Department name..."
                    className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    onClick={addDepartment}
                    className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-slate-800"
                  >
                    <Plus className="w-4 h-4" /> Add Directorate
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                  {departments.map((dept, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                        <span className="text-sm font-bold text-slate-800">{dept}</span>
                      </div>
                      <button onClick={() => removeDepartment(dept)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button 
                    onClick={() => setStep(6)}
                    className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    Next: Identity Portals <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 6: Identity Portals */}
          {step === 6 && (
            <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Stage 6: Identity Workspaces & Portals</h3>
                  <p className="text-sm text-slate-500">Configure public, staff, executive, and client portals.</p>
                </div>
                <button onClick={() => setStep(5)} className="text-xs font-bold text-slate-500 hover:text-slate-800">← Back</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
                {portals.map((portal) => (
                  <div 
                    key={portal.id}
                    onClick={() => togglePortal(portal.id)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      portal.enabled ? "bg-white border-blue-600 shadow-xl ring-4 ring-blue-50" : "bg-slate-50 border-slate-200 opacity-60"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${portal.enabled ? "bg-blue-600 text-white" : "border border-slate-300"}`}>
                        {portal.enabled && <Check className="w-4 h-4" />}
                      </div>
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-slate-900">{portal.name}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 mt-1 block">Role: {portal.role}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-200 flex justify-end max-w-5xl mt-8">
                <button 
                  onClick={() => setStep(7)}
                  className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Next: Enterprise Modules <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 7: Enterprise Modules */}
          {step === 7 && (
            <motion.div key="step7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Stage 7: Configure Enterprise Modules</h3>
                  <p className="text-sm text-slate-500">Select active modules to install in the platform instance.</p>
                </div>
                <button onClick={() => setStep(6)} className="text-xs font-bold text-slate-500 hover:text-slate-800">← Back</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
                {[
                  { id: "faap-ledger", name: "FAAP General Ledger", desc: "Double-entry financial accounting & settlement." },
                  { id: "faap-treasury", name: "Treasury Management", desc: "Bank accounts & mobile money clearing." },
                  { id: "hr-payroll", name: "HR & Payroll", desc: "Staff compensation & timekeeping." },
                  { id: "procurement-assets", name: "Procurement & Assets", desc: "Vouchers, POs, and fixed assets." },
                  { id: "identity-rbac", name: "Identity & RBAC", desc: "MFA and RBAC permissions matrix." },
                  { id: "document-intelligence", name: "Document Intelligence", desc: "Automated OCR indexer." },
                  { id: "ai-copilot", name: "Cognitive AI Assistant", desc: "Gemini 3.6 powered assistant." },
                  { id: "service-desk", name: "Public E-Service Desk", desc: "Online application processing." },
                  { id: "logistics-fleet", name: "Logistics & Fleet", desc: "Vehicle tracking and logistics." },
                ].map((mod) => (
                  <div 
                    key={mod.id}
                    onClick={() => toggleModule(mod.id)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start justify-between ${
                      activeModuleIds.includes(mod.id) ? "bg-white border-blue-600 shadow-xl ring-4 ring-blue-50" : "bg-slate-50 border-slate-200 opacity-60"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-3">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <span className="block text-sm font-bold text-slate-900 mb-1">{mod.name}</span>
                      <span className="text-[10px] text-slate-500 leading-tight block">{mod.desc}</span>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${activeModuleIds.includes(mod.id) ? "bg-blue-600 text-white" : "border border-slate-300"}`}>
                      {activeModuleIds.includes(mod.id) && <Check className="w-4 h-4" />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-200 flex justify-end max-w-6xl mt-8">
                <button 
                  onClick={() => setStep(8)}
                  className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Next: Forms Engine <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 8: Digital Forms Engine */}
          {step === 8 && (
            <motion.div key="step8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Stage 8: Digital Hybrid Forms Engine</h3>
                  <p className="text-sm text-slate-500">Enable default digital forms and approval chain triggers.</p>
                </div>
                <button onClick={() => setStep(7)} className="text-xs font-bold text-slate-500 hover:text-slate-800">← Back</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl">
                {[
                  "Institutional Registration / Application Form",
                  "Staff Onboarding & Access Requisition",
                  "Procurement & Financial Expenditure Voucher",
                  "FAAP Treasury Rebalancing Voucher",
                  "Operational Task Request & Incident Report",
                  "Client Service Clearance & Identity Form",
                  "Audit Exception & Policy Sign-off Form",
                  "Leave & Absence Request Form"
                ].map((formName, idx) => (
                  <div 
                    key={idx}
                    onClick={() => toggleForm(formName)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      enabledForms.includes(formName) ? "bg-white border-blue-600 shadow-lg" : "bg-slate-50 border-slate-200 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-bold text-slate-800">{formName}</span>
                    </div>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${enabledForms.includes(formName) ? "bg-blue-600 text-white" : "border border-slate-300"}`}>
                      {enabledForms.includes(formName) && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-200 flex justify-end max-w-4xl mt-8">
                <button 
                  onClick={() => setStep(9)}
                  className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Next: Platform Components <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 9: Components */}
          {step === 9 && (
            <motion.div key="step9" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Stage 9: Enterprise UI Components</h3>
                  <p className="text-sm text-slate-500">Select pre-built components for the institution's portals.</p>
                </div>
                <button onClick={() => setStep(8)} className="text-xs font-bold text-slate-500 hover:text-slate-800">← Back</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
                {[
                  "Dynamic Data Tables", "FAAP Balance Visualizers", "Workflow Timeline", "AI Chat Interface", 
                  "Document Viewer", "Audit Log Stream", "Institutional Calendar", "Staff Directory", "Interactive Maps"
                ].map((comp, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setComponents(prev => prev.includes(comp) ? prev.filter(c => c !== comp) : [...prev, comp])}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      components.includes(comp) ? "bg-white border-indigo-600 shadow-xl" : "bg-slate-50 border-slate-200 opacity-60"
                    }`}
                  >
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-3">
                      <LayoutGrid className="w-5 h-5" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-900">{comp}</span>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${components.includes(comp) ? "bg-indigo-600 text-white" : "border border-slate-300"}`}>
                        {components.includes(comp) && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-200 flex justify-end max-w-5xl mt-8">
                <button 
                  onClick={() => setStep(10)}
                  className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Next: Workflows <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 10: Workflows */}
          {step === 10 && (
            <motion.div key="step10" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Stage 10: Automated Enterprise Workflows</h3>
                  <p className="text-sm text-slate-500">Define automated business processes and approval chains.</p>
                </div>
                <button onClick={() => setStep(9)} className="text-xs font-bold text-slate-500 hover:text-slate-800">← Back</button>
              </div>

              <div className="space-y-4 max-w-3xl">
                {[
                  "Expenditure Approval Chain", "Staff Recruitment Flow", "Institutional Licensing Cycle", 
                  "Audit Log Review", "Inventory Restock Flow", "Client Service Ticketing"
                ].map((wf, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setWorkflows(prev => prev.includes(wf) ? prev.filter(w => w !== wf) : [...prev, wf])}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      workflows.includes(wf) ? "bg-white border-blue-600 shadow-md" : "bg-slate-50 border-slate-200 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                        <Workflow className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-slate-900">{wf}</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Status: Optimized by AI</span>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${workflows.includes(wf) ? "bg-blue-600 text-white" : "border border-slate-300"}`}>
                      {workflows.includes(wf) && <Check className="w-4 h-4" />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-200 flex justify-end max-w-3xl mt-8">
                <button 
                  onClick={() => setStep(11)}
                  className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Next: Reporting <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 11: Reports */}
          {step === 11 && (
            <motion.div key="step11" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Stage 11: Executive Reports & Analytics</h3>
                  <p className="text-sm text-slate-500">Configure core analytical dashboards and regulatory reports.</p>
                </div>
                <button onClick={() => setStep(10)} className="text-xs font-bold text-slate-500 hover:text-slate-800">← Back</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                {[
                  "FAAP Balance Sheet", "Income & Expenditure", "Staff Attendance", 
                  "Module Utilization", "Audit Compliance Report", "Regulatory Submission Pack",
                  "Real-time Revenue Stream", "Departmental KPI Tracker"
                ].map((rep, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setReports(prev => prev.includes(rep) ? prev.filter(r => r !== rep) : [...prev, rep])}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      reports.includes(rep) ? "bg-white border-emerald-600 shadow-md" : "bg-slate-50 border-slate-200 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-bold text-slate-800">{rep}</span>
                    </div>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${reports.includes(rep) ? "bg-emerald-600 text-white" : "border border-slate-300"}`}>
                      {reports.includes(rep) && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-200 flex justify-end max-w-4xl mt-8">
                <button 
                  onClick={() => setStep(12)}
                  className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Next: AI & Security <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 12: AI & Security */}
          {step === 12 && (
            <motion.div key="step12" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Stage 12: Cognitive AI & Security Configuration</h3>
                  <p className="text-sm text-slate-500">Fine-tune the intelligent kernel and Zero-Trust identity perimeter.</p>
                </div>
                <button onClick={() => setStep(11)} className="text-xs font-bold text-slate-500 hover:text-slate-800">← Back</button>
              </div>

              <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h4 className="flex items-center gap-2 font-black text-slate-900 mb-4 uppercase tracking-tighter text-sm">
                      <Sparkles className="w-4 h-4 text-amber-500" /> Cognitive AI Parameters
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Inference Model</label>
                        <select 
                          value={aiConfig.model}
                          onChange={(e) => setAiConfig({ ...aiConfig, model: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="Gemini 3.6 Flash (Sovereign)">Gemini 3.6 Flash (Sovereign)</option>
                          <option value="Gemini 3.6 Pro (Advanced)">Gemini 3.6 Pro (Advanced)</option>
                          <option value="UEOS Local Cognitive Node">UEOS Local Cognitive Node</option>
                        </select>
                      </div>

                      <label className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 cursor-pointer">
                        <span className="text-xs font-bold text-slate-700">Deep Research Agent</span>
                        <input 
                          type="checkbox" 
                          checked={aiConfig.researchAgentEnabled}
                          onChange={(e) => setAiConfig({ ...aiConfig, researchAgentEnabled: e.target.checked })}
                          className="w-4 h-4 rounded text-indigo-600"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 cursor-pointer">
                        <span className="text-xs font-bold text-slate-700">Continuous Auto-Audit</span>
                        <input 
                          type="checkbox" 
                          checked={aiConfig.autoAuditEnabled}
                          onChange={(e) => setAiConfig({ ...aiConfig, autoAuditEnabled: e.target.checked })}
                          className="w-4 h-4 rounded text-indigo-600"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h4 className="flex items-center gap-2 font-black text-slate-900 mb-4 uppercase tracking-tighter text-sm">
                      <Shield className="w-4 h-4 text-emerald-600" /> AEGIS Security Perimeter
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">RBAC Mode</label>
                        <select 
                          value={securityConfig.rbacMode}
                          onChange={(e) => setSecurityConfig({ ...securityConfig, rbacMode: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="Zero-Trust Strict">Zero-Trust Strict</option>
                          <option value="Enterprise Standard">Enterprise Standard</option>
                          <option value="Public Open Access">Public Open Access</option>
                        </select>
                      </div>

                      <label className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 cursor-pointer">
                        <span className="text-xs font-bold text-slate-700">Mandatory MFA</span>
                        <input 
                          type="checkbox" 
                          checked={securityConfig.mfaRequired}
                          onChange={(e) => setSecurityConfig({ ...securityConfig, mfaRequired: e.target.checked })}
                          className="w-4 h-4 rounded text-emerald-600"
                        />
                      </label>

                      <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Encryption Protocol</label>
                        <div className="px-4 py-2.5 bg-emerald-100/50 border border-emerald-200 rounded-xl text-sm font-black text-emerald-700">
                          {securityConfig.encryptionLevel} (Sovereign)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-200 flex justify-end max-w-4xl mt-8">
                <button 
                  onClick={() => setStep(13)}
                  className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Next: Final Review <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 13: Review */}
          {step === 13 && (
            <motion.div key="step13" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Stage 13: AI Manufacturing Validation & Review</h3>
                  <p className="text-sm text-slate-500">Review the generated enterprise architecture before deployment.</p>
                </div>
                <button onClick={() => setStep(12)} className="text-xs font-bold text-slate-500 hover:text-slate-800">← Back</button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                      <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest">Platform Manifest</h4>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase">Ready for Provisioning</span>
                    </div>
                    <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-12">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Institution</label>
                        <div className="text-sm font-bold text-slate-800">{institutionConfig.name}</div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Ecosystem</label>
                        <div className="text-sm font-bold text-slate-800">{ecosystems.find(e => e.id === selectedEcosystem)?.name}</div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Jurisdiction</label>
                        <div className="text-sm font-bold text-slate-800">{institutionConfig.country} ({institutionConfig.region})</div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Registry</label>
                        <div className="text-sm font-bold text-slate-800">{institutionConfig.regulatoryAuthority}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                      <h4 className="font-black text-slate-900 text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-blue-600" /> Active Modules
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeModuleIds.slice(0, 5).map(m => (
                          <span key={m} className="px-2 py-1 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-600">{m}</span>
                        ))}
                        {activeModuleIds.length > 5 && <span className="px-2 py-1 bg-blue-50 rounded-lg text-[10px] font-bold text-blue-600">+{activeModuleIds.length - 5} more</span>}
                      </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                      <h4 className="font-black text-slate-900 text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Workflow className="w-3.5 h-3.5 text-indigo-600" /> Workflows
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {workflows.map(w => (
                          <span key={w} className="px-2 py-1 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-600">{w}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-xl shadow-indigo-100 relative overflow-hidden">
                    <Sparkles className="absolute -right-4 -top-4 w-24 h-24 text-white/10 rotate-12" />
                    <h4 className="font-black text-[10px] uppercase tracking-widest mb-4 opacity-80">AI Manufacturing Score</h4>
                    <div className="text-4xl font-black mb-2">98.4%</div>
                    <p className="text-[10px] font-medium opacity-70 leading-relaxed mb-6">
                      Institutional architecture has been optimized for the {institutionConfig.country} regulatory environment. All double-entry FAAP parity rules are pre-validated.
                    </p>
                    <button 
                      onClick={startProvisioning}
                      className="w-full bg-white text-indigo-900 font-black py-4 rounded-xl hover:bg-indigo-50 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" /> Approve & Deploy
                    </button>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl">
                    <h4 className="font-black text-emerald-900 text-[10px] uppercase tracking-widest mb-2">SecOps Status</h4>
                    <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                      <Shield className="w-4 h-4" /> Signature Wall Validated
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 14: Deployment */}
          {step === 14 && (
            <div className="w-full">
              {provisioningStatus.status !== "complete" ? (
                <motion.div key="step14-provisioning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left: Interactive State Machine Checklist */}
                  <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                    <div>
                      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Active State Machine</span>
                      <h3 className="text-xl font-black text-slate-900 mt-1">UEOS Manufacturing Pipeline</h3>
                      <p className="text-xs text-slate-500 font-medium">Monitoring the 12 primary sovereign platform layers in real-time.</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-slate-100 rounded-full h-2.5 overflow-hidden relative">
                      <div 
                        className="bg-indigo-600 h-full transition-all duration-500 rounded-full" 
                        style={{ width: `${Math.max(5, (Math.max(0, mfgStepIndex) / 12) * 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      <span>Initializing</span>
                      <span className="text-indigo-600">{Math.round((Math.max(0, mfgStepIndex) / 12) * 100)}% Complete</span>
                      <span>Operational</span>
                    </div>

                    {/* Checklist Steps */}
                    <div className="space-y-3.5 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                      {[
                        { label: "Sovereign Instance Generation", desc: "Creating unique platform container record in HQ Registry." },
                        { label: "Tenant Identity Allocation", desc: "Generating secure tenant token and OAuth single sign-on boundaries." },
                        { label: "Identity Portal Suite Compilation", desc: "Compiling /exec, /dept, /staff, /public portals." },
                        { label: "Core ERP Module Installation", desc: "Mounting chosen modules to the active platform kernel." },
                        { label: "AI Cognitive Swarm Activation", desc: "Activating LedgerAuditor, CFOBot, and memory context vectors." },
                        { label: "FAAP Ledger Connectivity", desc: "Opening general ledgers & mapping 1.5% transaction fee rules." },
                        { label: "AEGIS Zero-Trust Gating", desc: "Deploying secure firewalls, MFA barriers, and AES storage." },
                        { label: "JUMO Cloud Cluster Creation", desc: "Spawning secure multi-tenant nodes and DNS route maps." },
                        { label: "Public Landing Portal Live-Launch", desc: "Compiling static asset paths for the public landing gateway." },
                        { label: "Post-Login Workspace Assembly", desc: "Configuring private member dashboards & session rules." },
                        { label: "Marketplace Package Publication", desc: "Packaging compiled payload to .pkg distribution catalog." },
                        { label: "Upgrade Lifecycle Verification", desc: "Activating automated delta-patch listeners and rollbacks." }
                      ].map((item, idx) => {
                        const isSuccess = idx < mfgStepIndex;
                        const isActive = idx === mfgStepIndex;
                        return (
                          <div 
                            key={idx} 
                            className={`flex items-start gap-3 p-3 rounded-2xl transition-all ${
                              isActive ? "bg-indigo-50/60 border border-indigo-100 shadow-sm" : "border border-transparent"
                            }`}
                          >
                            <div className="shrink-0 mt-0.5">
                              {isSuccess ? (
                                <div className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </div>
                              ) : isActive ? (
                                <div className="w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center relative">
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                </div>
                              ) : (
                                <div className="w-5 h-5 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center text-[10px] font-bold">
                                  {idx + 1}
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className={`text-xs font-bold leading-tight ${isActive ? "text-indigo-900" : isSuccess ? "text-slate-800" : "text-slate-400"}`}>
                                {item.label}
                              </h4>
                              <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-0.5">{item.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: Interactive Live Log Terminal */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 font-mono text-[11px] leading-relaxed shadow-xl flex-1 flex flex-col h-full min-h-[450px]">
                      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                          <span className="ml-2 text-slate-500 font-bold uppercase tracking-widest text-[9px]">Sovereign Manufacture Kern-Logs</span>
                        </div>
                        <span className="text-[9px] bg-slate-800 text-indigo-400 font-bold px-2 py-0.5 rounded-lg border border-slate-700 font-mono">
                          LOCKED v13.0
                        </span>
                      </div>
                      <div className="space-y-2 flex-1 overflow-y-auto max-h-[380px] custom-scrollbar pr-2">
                        {provisioningStatus.logs.map((logLine, i) => (
                          <div key={i} className="flex gap-3">
                            <span className="text-slate-600 shrink-0">[{new Date().toLocaleTimeString()}]</span>
                            <span className={
                              logLine.includes("SUCCESS") || logLine.includes("STAGE") 
                                ? "text-emerald-400 font-bold" 
                                : logLine.includes("ERROR") 
                                ? "text-red-400 font-bold" 
                                : logLine.includes("STAGE") 
                                ? "text-indigo-400" 
                                : "text-blue-200"
                            }>
                              {logLine}
                            </span>
                          </div>
                        ))}
                        <div className="animate-pulse text-indigo-400">_</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="step14-complete" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="py-2 max-w-7xl mx-auto space-y-6">
                  {/* Header Banner */}
                  <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-6 relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-60" />
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-100 shadow-inner">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block font-mono">Platform Integrity Confirmed</span>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5 uppercase italic">SOVEREIGN ERP MANUFACTURED</h3>
                        <p className="text-slate-500 font-bold text-xs mt-0.5">
                          Sovereign instance compiled, tenant-isolated, modules activated, and registered in live environment.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 shrink-0 relative z-10">
                      <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-[10px] font-black rounded-lg border border-slate-200 font-mono">
                        VERSION: {instanceVersion}
                      </span>
                      <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-lg border border-emerald-200 font-mono flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        ACTIVE & SECURE
                      </span>
                    </div>
                  </div>

                  {/* Active Lifecycle Control Center Tabs */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Navigation Links for Operations Tabs */}
                    <div className="bg-white border border-slate-200 rounded-[2rem] p-4 shadow-sm space-y-1">
                      <span className="px-3 block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">HQ Control Center</span>
                      {[
                        { id: "workspace", label: "Portals & Workspace", icon: Globe, desc: "Explore generated interfaces" },
                        { id: "faap", label: "FAAP Ledger & Fees", icon: DollarSign, desc: "Check 1.5% double-entry rules" },
                        { id: "aegis", label: "AEGIS Zero-Trust Security", icon: Shield, desc: "Manage signatures & MFA wall" },
                        { id: "telemetry", label: "Continuous Diagnostics", icon: Activity, desc: "Live cluster resource logs" },
                        { id: "marketplace", label: "Marketplace Listing", icon: Package, desc: "Distribute .pkg listings" },
                        { id: "upgrade", label: "Upgrade & Patch Lifecycle", icon: RefreshCw, desc: "Hot-patches and rolling rollbacks" }
                      ].map((tab) => {
                        const Icon = tab.icon;
                        const isSel = selectedCompletedTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setSelectedCompletedTab(tab.id as any)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                              isSel 
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" 
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                          >
                            <Icon className={`w-4 h-4 shrink-0 ${isSel ? "text-white" : "text-slate-400"}`} />
                            <div>
                              <div className="text-xs font-bold leading-tight">{tab.label}</div>
                              <div className={`text-[9px] font-medium leading-none mt-0.5 ${isSel ? "text-indigo-100" : "text-slate-400"}`}>
                                {tab.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Operational Tab Dashboard Screens */}
                    <div className="lg:col-span-3 bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm min-h-[450px] flex flex-col justify-between">
                      <div>
                        {/* Tab 1: Portals */}
                        {selectedCompletedTab === "workspace" && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <div>
                              <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">Generated Portal Suite</h4>
                              <p className="text-xs text-slate-500 font-medium">Both public-facing and post-login interfaces have been fully compiled and mounted.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Public Portal mockup */}
                              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">Public Gateway Experience</span>
                                  <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[8px] font-black rounded font-mono uppercase">ONLINE</span>
                                </div>
                                <div className="space-y-1.5">
                                  <div className="text-sm font-bold text-slate-800">{institutionConfig.name} - Public Hub</div>
                                  <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                                    Enables public sign-ups, service applications, regulatory disclosures, and official announcements. Renders custom form templates dynamically.
                                  </p>
                                </div>
                                <div className="text-[10px] font-mono text-blue-600 bg-white p-2 rounded border border-slate-100 select-all">
                                  https://{institutionConfig.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.jumo.net/gateway
                                </div>
                              </div>

                              {/* Private Admin Workspace mockup */}
                              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">Post-Login Admins Workspace</span>
                                  <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[8px] font-black rounded font-mono uppercase">AUTHORIZED</span>
                                </div>
                                <div className="space-y-1.5">
                                  <div className="text-sm font-bold text-slate-800">Sovereign Directorate Operations Dashboard</div>
                                  <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                                    Provides administrative controls, secure JWT sessions, operational audits, and direct integration with the FAAP treasury ledgers.
                                  </p>
                                </div>
                                <div className="text-[10px] font-mono text-blue-600 bg-white p-2 rounded border border-slate-100 select-all">
                                  https://{institutionConfig.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.jumo.net/workspace/dashboard
                                </div>
                              </div>
                            </div>

                            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl space-y-1">
                              <span className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Workspace Token Isolation</span>
                              <p className="text-xs text-indigo-700 leading-relaxed font-semibold">
                                SSO JWT claims are securely isolated utilizing browser local sessionStorage and strict security cookie flags (SameSite=Strict) within tenant boundaries.
                              </p>
                            </div>
                          </motion.div>
                        )}

                        {/* Tab 2: FAAP Ledger */}
                        {selectedCompletedTab === "faap" && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">FAAP Ledger Integrity & Fees</h4>
                                <p className="text-xs text-slate-500 font-medium">Double-entry ledger with real-time balance integrity check and 1.5% transaction routing.</p>
                              </div>
                              <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase rounded-lg border border-emerald-200 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Balanced ($0.00 Parity)
                              </span>
                            </div>

                            {/* Live Accounts Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-slate-50 p-4 border border-slate-200 rounded-2xl">
                                <div className="text-[9px] text-slate-400 font-black uppercase font-mono mb-1">1010-Sovereign-Cash</div>
                                <div className="text-xl font-bold text-slate-800">${(50000 + (ledgerTxCount * 1000)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                <div className="text-[9px] text-slate-500 font-bold mt-1">Sovereign Treasury Assets</div>
                              </div>
                              <div className="bg-slate-50 p-4 border border-slate-200 rounded-2xl">
                                <div className="text-[9px] text-slate-400 font-black uppercase font-mono mb-1">4020-JUMO-Settlement-Fees</div>
                                <div className="text-xl font-bold text-blue-600">${(750 + (ledgerTxCount * 15)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                <div className="text-[9px] text-slate-500 font-bold mt-1">1.5% Universal Clearing Revenue</div>
                              </div>
                              <div className="bg-slate-50 p-4 border border-slate-200 rounded-2xl">
                                <div className="text-[9px] text-slate-400 font-black uppercase font-mono mb-1">3010-Operational-Revenue</div>
                                <div className="text-xl font-bold text-slate-800">${(49250 + (ledgerTxCount * 985)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                <div className="text-[9px] text-slate-500 font-bold mt-1">Institution Licensing Earnings</div>
                              </div>
                            </div>

                            {/* Interactive Transaction Poster */}
                            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                              <div className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center justify-between">
                                <span>Simulate Direct Transaction Voucher (M-Pesa / Bank-API)</span>
                                <span className="text-[10px] text-indigo-600 lowercase font-mono">Count: {ledgerTxCount} tx posted</span>
                              </div>
                              <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                                Post a direct licensing transaction. FAAP will automatically apply the global 1.5% settlement clearing rule and route the fee to the JUMO Master Treasury ledger account.
                              </p>
                              <div className="flex gap-3">
                                <button
                                  onClick={() => setLedgerTxCount(prev => prev + 1)}
                                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-black px-4 py-2 rounded-xl transition-all shadow flex items-center gap-2"
                                >
                                  <Plus className="w-3.5 h-3.5" /> Post Transaction ($1,000.00)
                                </button>
                                <button
                                  onClick={() => setLedgerTxCount(0)}
                                  className="bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-bold px-4 py-2 rounded-xl transition-all border border-slate-200 flex items-center gap-1.5"
                                >
                                  Reset Ledger States
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Tab 3: AEGIS Security */}
                        {selectedCompletedTab === "aegis" && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <div>
                              <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">AEGIS Zero-Trust Gating</h4>
                              <p className="text-xs text-slate-500 font-medium">Continuous session verification, cryptographic signatures, and MFA guardrails.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="border border-slate-200 rounded-2xl p-4 space-y-3 bg-slate-50/50">
                                <div className="text-xs font-black text-slate-800 uppercase tracking-wider">Active Safeguard Perimeters</div>
                                <div className="space-y-2 text-xs">
                                  <div className="flex items-center gap-2 font-bold text-slate-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    AES-256-GCM Storage Encryption
                                  </div>
                                  <div className="flex items-center gap-2 font-bold text-slate-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    Row-Level Database Segregation
                                  </div>
                                  <div className="flex items-center gap-2 font-bold text-slate-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    Zero-Trust Firewall enabled
                                  </div>
                                </div>
                              </div>

                              {/* Interactive MFA Challenge */}
                              <div className="border border-slate-200 rounded-2xl p-4 space-y-4 bg-slate-50/50">
                                <div className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                  <Lock className="w-3.5 h-3.5 text-blue-600" /> Administrative Challenge
                                </div>
                                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                                  Test the secure MFA lock wall. High-risk actions require the signature token to authorize.
                                </p>

                                {mfaVerified ? (
                                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                                    <Check className="w-4 h-4 text-emerald-600" />
                                    SecOps authorization verified. Admin privileges granted.
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    <div className="flex gap-2">
                                      <input
                                        type="password"
                                        placeholder="Enter SecOps Signature Code..."
                                        value={mfaInput}
                                        onChange={(e) => setMfaInput(e.target.value)}
                                        className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 flex-1 font-mono placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                                      />
                                      <button
                                        onClick={() => {
                                          if (mfaInput === "JUMO-VALID-SIG-2026") {
                                            setMfaVerified(true);
                                          } else {
                                            alert("INCORRECT SIGNATURE CODE! Provide 'JUMO-VALID-SIG-2026' to approve.");
                                          }
                                        }}
                                        className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                                      >
                                        Verify
                                      </button>
                                    </div>
                                    <span className="text-[9px] text-slate-400 block font-semibold leading-relaxed">
                                      Hint: Type <strong>JUMO-VALID-SIG-2026</strong> inside the field to simulate authorization.
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Tab 4: Telemetry Diagnostics */}
                        {selectedCompletedTab === "telemetry" && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <div>
                              <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">Diagnostics & Live Telemetry</h4>
                              <p className="text-xs text-slate-500 font-medium">Continuous real-time system performance monitor of active cloud nodes.</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 flex flex-col justify-between">
                                <span className="text-[9px] text-slate-400 font-black uppercase">CPU Allocation</span>
                                <div className="text-2xl font-bold text-slate-800 mt-2 font-mono">18.4%</div>
                                <span className="text-[9px] text-slate-500 font-semibold mt-1">Fluctuating safe load</span>
                              </div>
                              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 flex flex-col justify-between">
                                <span className="text-[9px] text-slate-400 font-black uppercase">RAM Utilization</span>
                                <div className="text-2xl font-bold text-slate-800 mt-2 font-mono">142 MB</div>
                                <span className="text-[9px] text-slate-500 font-semibold mt-1">Memory cap 512 MB</span>
                              </div>
                              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 flex flex-col justify-between">
                                <span className="text-[9px] text-slate-400 font-black uppercase">Active Nodes</span>
                                <div className="text-2xl font-bold text-slate-800 mt-2 font-mono">8 Nodes</div>
                                <span className="text-[9px] text-slate-500 font-semibold mt-1">Replica cluster online</span>
                              </div>
                              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 flex flex-col justify-between">
                                <span className="text-[9px] text-slate-400 font-black uppercase">Socket Connections</span>
                                <div className="text-2xl font-bold text-indigo-600 mt-2 font-mono">18 Live</div>
                                <span className="text-[9px] text-slate-500 font-semibold mt-1">Active channels logged</span>
                              </div>
                            </div>

                            {/* Node relation mockup */}
                            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-900 text-slate-100 font-mono text-[10px] space-y-2 shadow">
                              <div className="text-slate-500 border-b border-slate-800 pb-2 flex justify-between uppercase">
                                <span>Core Node Cluster Diagram</span>
                                <span className="text-indigo-400 font-bold">TELEMETRY SECURE</span>
                              </div>
                              <div className="text-blue-300">
                                [JUMO-CORE-MAIN] ──► [TENANT-Isolated-Proxy] ──► [FAAP-Ledger-Node-001] (UPTIME: 100%)
                              </div>
                              <div className="text-slate-400">
                                LoadBalancer: Round-robin. Query latency: 1.8ms. Cache hits: 94.2%.
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Tab 5: Marketplace Listing */}
                        {selectedCompletedTab === "marketplace" && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <div>
                              <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">Marketplace Package Listing</h4>
                              <p className="text-xs text-slate-500 font-medium">Control the distribution payload, package compilation, and marketplace access configurations.</p>
                            </div>

                            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-4">
                              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                <span className="text-xs font-black text-slate-800 uppercase">Package Distribution Spec</span>
                                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[9px] font-bold rounded">pkg_v13_active</span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
                                <div>
                                  <span className="text-[9px] text-slate-400 font-black uppercase block">Bundle ID</span>
                                  <span className="text-slate-800 font-mono text-xs">pkg-{institutionConfig.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-v13.pkg</span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-slate-400 font-black uppercase block">Licensing Code</span>
                                  <span className="text-slate-800">Enterprise Hybrid Tier</span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-slate-400 font-black uppercase block">Modules Bundled</span>
                                  <span className="text-slate-800">{activeModuleIds.length} active ERP modules</span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-slate-400 font-black uppercase block">Deployment Package Status</span>
                                  <span className="text-emerald-600">COMPILED & VERIFIED</span>
                                </div>
                              </div>

                              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center gap-2">
                                <Package className="w-4 h-4 text-indigo-600" />
                                <span className="text-[10px] text-indigo-800 font-semibold leading-relaxed">
                                  This sovereign platform package is indexed inside the JUMO UEOS marketplace, allowing authorized multi-tenant nodes to download the blueprint delta schema.
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Tab 6: Upgrade & Patch Lifecycle */}
                        {selectedCompletedTab === "upgrade" && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <div>
                              <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">Upgrade & Patch Lifecycle</h4>
                              <p className="text-xs text-slate-500 font-medium">Verify rolling platform patches, perform delta hot-updates, or rollback safely to base versions.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Current Status */}
                              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                                <span className="text-[10px] text-slate-400 font-black uppercase font-mono block">Version Metrics</span>
                                <div className="text-3xl font-black text-slate-900 tracking-tight">{instanceVersion}</div>
                                <div className="text-xs text-slate-600 font-semibold flex items-center gap-1.5 mt-2">
                                  <span className={`w-2 h-2 rounded-full ${instanceVersion.includes("PATCHED") ? "bg-amber-500" : "bg-emerald-500"}`} />
                                  System Registry Lock State: Stable
                                </div>
                              </div>

                              {/* Interactive patcher */}
                              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3 flex flex-col justify-between">
                                <div>
                                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider block">Execute Live Hot-Patching</span>
                                  <p className="text-[10px] text-slate-400 leading-relaxed font-semibold mt-1">
                                    Delta patches can be hot-deployed into the running instance container without taking the server offline.
                                  </p>
                                </div>

                                <div className="flex gap-2 pt-2">
                                  <button
                                    onClick={async () => {
                                      setIsPatching(true);
                                      setPatchLogs(["Initiating platform patch sequence...", "Downloading delta-patch files..."]);
                                      setTimeout(() => {
                                        setPatchLogs(prev => [...prev, "Running unit test checks against v13 registries...", "Validating double-entry ledger integrity..."]);
                                      }, 600);
                                      setTimeout(() => {
                                        setPatchLogs(prev => [...prev, "SUCCESS: Version upgraded to v13.1.0-PATCHED safely.", "Hot reload completed."]);
                                        setInstanceVersion("v13.1.0-PATCHED");
                                        setIsPatching(false);
                                      }, 1500);
                                    }}
                                    disabled={isPatching}
                                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-[11px] font-black px-4 py-2 rounded-xl transition-all shadow flex items-center gap-1.5"
                                  >
                                    {isPatching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                                    Apply Patch v13.1.0
                                  </button>
                                  <button
                                    onClick={() => {
                                      setInstanceVersion("v13.0.0-LOCKED");
                                      setPatchLogs(["Rollback initiated...", "Restored to central base registry baseline. Uptime secure."]);
                                    }}
                                    disabled={isPatching}
                                    className="bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-bold px-4 py-2 rounded-xl transition-all border border-slate-200"
                                  >
                                    Rollback Baseline
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Rolling Upgrade Logger Output */}
                            {patchLogs.length > 0 && (
                              <div className="bg-slate-900 text-slate-200 font-mono text-[10px] p-4 rounded-2xl space-y-1 shadow">
                                <div className="text-slate-500 border-b border-slate-800 pb-1 uppercase tracking-widest text-[8px] font-bold">Patch-Deploy Stream Logs</div>
                                {patchLogs.map((pl, idx) => (
                                  <div key={idx} className={pl.includes("SUCCESS") ? "text-emerald-400 font-bold" : "text-blue-300"}>{pl}</div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>

                      {/* Bottom action panel */}
                      <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-3 mt-8">
                        <button 
                          onClick={() => window.location.reload()} 
                          className="w-full sm:w-auto bg-slate-950 text-white font-black text-xs uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-slate-800 transition-all shadow flex items-center justify-center gap-2"
                        >
                          <Activity className="w-4 h-4 text-blue-500" /> Back to HQ Registry
                        </button>
                        <button 
                          onClick={() => {
                            localStorage.removeItem("ueos_user");
                            window.location.reload();
                          }} 
                          className="w-full sm:w-auto bg-blue-600 text-white font-black text-xs uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-blue-700 transition-all shadow flex items-center justify-center gap-2"
                        >
                          <Globe className="w-4 h-4 text-white" /> Access Public Gateway
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    )}
  </div>
);
}
