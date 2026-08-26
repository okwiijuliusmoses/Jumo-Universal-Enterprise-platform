import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  Activity, 
  Users, 
  ShieldCheck, 
  DollarSign, 
  Layers, 
  CheckSquare, 
  FileText, 
  Mail, 
  Bot, 
  Sparkles, 
  Sliders, 
  BarChart3, 
  Key, 
  Lock, 
  Landmark, 
  Grid, 
  Cpu, 
  ShoppingBag, 
  RefreshCw, 
  Plus, 
  CheckCircle2, 
  ArrowUpRight, 
  Award, 
  Globe, 
  Filter, 
  BookOpen, 
  Send,
  Database,
  Smartphone,
  Eye,
  LogIn,
  LogOut,
  Clock,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Settings,
  HelpCircle,
  X,
  ChevronUp,
  Trash2,
  UserCheck,
  HardHat,
  Sprout,
  HeartPulse,
  Factory,
  Truck,
  Scale,
  Church,
  ShieldAlert,
  Upload,
  Play,
  Briefcase,
  FileCheck,
  Check,
  Download,
  AlertCircle
} from 'lucide-react';

// --- TYPE INTERFACES ---
interface ErpTemplate {
  id: string;
  name: string;
  family: string;
  icon: React.ComponentType<any>;
  baseModules: string[];
  industryModules: string[];
  description: string;
  defaultColor: string;
  defaultSlogan: string;
}

interface ProvisionedErp {
  id: string;
  name: string;
  familyKey: string;
  domain: string;
  themeColor: string;
  slogan: string;
  activeModules: string[];
  departments: string[];
  roles: RoleProfile[];
  version: string;
  status: 'Active' | 'Suspended' | 'Maintenance';
  adminName: string;
  adminEmail: string;
  jumoTrustConfig?: any;
}

interface RoleProfile {
  name: string;
  permissions: {
    read: boolean;
    write: boolean;
    approve: boolean;
    audit: boolean;
    delete: boolean;
  };
}

interface WorkflowChain {
  id: string;
  name: string;
  trigger: string;
  steps: string[];
  slaHours: number;
  status: 'Active' | 'Draft';
}

interface DashboardWidget {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'table';
  metricValue?: string;
  metricLabel?: string;
  cols: 1 | 2 | 3;
}

// --- STANDARD DEFAULT VALUES ---
const STANDARD_DEPARTMENTS = [
  'Finance & Treasury',
  'Human Resources (HR)',
  'Procurement & Spares',
  'Operations & Logistics',
  'Administration Office',
  'ICT Support & Infrastructure',
  'Internal Audit & Trust',
  'Legal & Regulatory Affairs'
];

const STANDARD_ROLES: RoleProfile[] = [
  { name: 'Executive Board Member', permissions: { read: true, write: true, approve: true, audit: true, delete: false } },
  { name: 'Director / Department Head', permissions: { read: true, write: true, approve: true, audit: false, delete: false } },
  { name: 'Manager / Unit Supervisor', permissions: { read: true, write: true, approve: false, audit: false, delete: false } },
  { name: 'Sovereign Compliance Auditor', permissions: { read: true, write: false, approve: false, audit: true, delete: false } },
  { name: 'Operational Officer', permissions: { read: true, write: true, approve: false, audit: false, delete: false } },
  { name: 'Staff Specialist', permissions: { read: true, write: true, approve: false, audit: false, delete: false } },
  { name: 'Customer / Registered Member', permissions: { read: true, write: false, approve: false, audit: false, delete: false } },
  { name: 'Public Citizen Access', permissions: { read: true, write: false, approve: false, audit: false, delete: false } }
];

const PRECONFIGURED_TEMPLATES: ErpTemplate[] = [
  { 
    id: 'edu', 
    name: 'Education ERP', 
    family: 'Education & Academics', 
    icon: BookOpen, 
    baseModules: ['Admissions Office', 'Student Lifecycle Registrar', 'Examinations Hub', 'FAAP Tuition Settlement'], 
    industryModules: ['Academic Senate Desk', 'Alumni Enterprise Integrator', 'LMS Virtual Classrooms', 'Research Grants Index'],
    description: 'Sovereign management for universities, colleges, schools, and state training boards.',
    defaultColor: '#1e3a8a',
    defaultSlogan: 'Excellence Through Distributed Digital Transformation'
  },
  { 
    id: 'hlth', 
    name: 'Healthcare ERP', 
    family: 'Healthcare & Clinical', 
    icon: HeartPulse, 
    baseModules: ['Patient EHR Vault', 'Clinical Pharmacy Desk', 'Ward Bed Allocation', 'FAAP Health Insurance Clearing'], 
    industryModules: ['Clinical Triage Desk', 'Medical PACS Archive', 'ICU Telemetry Alert Engine', 'Outpatient Dispatch Queue'],
    description: 'Comprehensive clinical operations, secure health files, and dynamic medical billing.',
    defaultColor: '#0f766e',
    defaultSlogan: 'Sovereign Care, Precision Intellect'
  },
  { 
    id: 'sacco', 
    name: 'SACCO & FinTech ERP', 
    family: 'Finance & Cooperatives', 
    icon: DollarSign, 
    baseModules: ['KYC Directories', 'Sovereign Deposits Ledger', 'Dividend Amortizer', 'FAAP Ledger Sync'], 
    industryModules: ['AI Credit Score Rating', 'Agency Banking POS Switch', 'Group Chama Collaterals', 'USSD Micro-Disbursement'],
    description: 'Savings credit cooperatives, micro-finance institutions, and community cooperative banks.',
    defaultColor: '#15803d',
    defaultSlogan: 'Decentralized Capital, Empowered Communities'
  },
  { 
    id: 'govt', 
    name: 'Government & Municipal ERP', 
    family: 'Civil Administration', 
    icon: Landmark, 
    baseModules: ['Citizen Directory', 'Sovereign Treasury Allocation', 'Procurement Tenders Portal', 'Land Deeds Registry'], 
    industryModules: ['Municipal Permit Desk', 'IFMIS Sovereign Auditing', 'Judiciary Case Indexer', 'National Registry Gateway'],
    description: 'Public ministries, local authorities, national registries, and sovereign judiciaries.',
    defaultColor: '#4338ca',
    defaultSlogan: 'Transparent Service, Civil Integrity'
  },
  { 
    id: 'agri', 
    name: 'Agribusiness ERP', 
    family: 'Agricultural Operations', 
    icon: Sprout, 
    baseModules: ['Farm Cooperative Index', 'Harvest Logistics Tracker', 'Fertilizer Distribution Engine', 'FAAP Ag-Credit Lines'], 
    industryModules: ['Weighbridge Scale Ledger', 'Soil Sensor Telemetry', 'Crop Weather Index Insurance', 'Silo Inventory Auditor'],
    description: 'Large-scale crop operations, agricultural cooperatives, and food logistics networks.',
    defaultColor: '#166534',
    defaultSlogan: 'Grounding Sovereign Yields'
  },
  { 
    id: 'energy', 
    name: 'Energy & Power Grid ERP', 
    family: 'Utilities & Smart Grid', 
    icon: Factory, 
    baseModules: ['Consumer Meter Directories', 'Substation Telemetry', 'FAAP Smart Metering', 'Carbon Index Offsets'], 
    industryModules: ['Grid Load Balancer AI', 'Preventative Repair Dispatch', 'Tariff Ledger Engine', 'Renewable Feed-in Log'],
    description: 'Electricity grids, water distribution, solar plants, and resource distribution utilities.',
    defaultColor: '#312e81',
    defaultSlogan: 'Energizing Enterprise Futures'
  }
];

export const UniversalERPPlatformRuntime: React.FC = () => {
  // --- PERSISTENT DATA LOADING & STORAGE ---
  const [provisionedErps, setProvisionedErps] = useState<ProvisionedErp[]>(() => {
    const saved = localStorage.getItem('jumo_ueos_v2_erps');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved ERPs', e);
      }
    }
    const defaultTrustConfig = {
      enableJumoTrust: true,
      suspendTrustServices: false,
      trustMode: 'Advanced',
      trustPolicyManagement: 'Strict segregation of duties, multi-stage digital signature verification, and immutable double-entry ledger audits are active by default.',
      trustUpdateManager: 'Automatic',
      trustLicensing: 'Sovereign',
      trustBilling: 'Tokenized',
      trustVersionControl: 'v50.2.1',
      continuousAudit: true,
      scheduledAudit: true,
      onDemandAudit: true,
      departmentAudit: true,
      financialAudit: true,
      operationalAudit: true,
      procurementAudit: true,
      recruitmentAudit: true,
      assetAudit: true,
      complianceAudit: true,
      enableAuditorTeams: true,
      auditLevels: 'Level 3',
      auditFrequency: 'Continuous',
      auditPriorities: 'High & Critical',
      escalationRules: 'Instant',
      evidenceCollectionMode: 'Cryptographic WORM',
      auditIndependence: 'Independent Board Reporting',
      integrityRules: 'Zero-Tolerance Segregation',
      performanceMetrics: 'Audit Accuracy Rate',
      communicationSchedulers: 'Instant push & digest',
      faapReconciliationRules: 'Strict $0.00 Parity',
      doubleEntryParityEnforcement: true,
      revenueLeakageTolerances: 0.05,
      spendingVelocityThresholds: 10000,
      pettyCashFloatAuditingCaps: 500,
      biometricAttendanceVerificationTolerances: 10,
      recruitmentMeritVerificationScoreThresholds: 85,
      appraisalObjectivityControlFlags: true,
      ghostRoleScanningSensitivity: 'Aggressive Fraud Radar',
      riskScoringWeights: 'Financial-heavy',
      predictiveFraudRiskPredictorParameters: 'Deep Neural Simulation',
      businessContinuityBackupValidationRules: 'Hourly check',
      strategicRoadmapAlignmentThresholds: 90,
      executiveMorningBriefingGenerationRules: 'AI-Synthesized Summary',
      boardPackageAssemblyDeadlines: '7 days prior',
      committeeQuorumVerificationParameters: 'Two-thirds majority (>66%)',
      actionItemEscalationSchedules: 'Immediate escalations',
      wormCryptographicVaultRetentionRules: '7 Years (Regulatory)',
      pkiSignatureValidationModes: 'Strict PKI & Hardware',
      physicalReceiptOcrCompletenessThresholds: 95,
      readOnlyLogsVerificationFrequency: 'Continuous',
      publicSectorTransparencyDisclosureLevels: 'Redacted summarized public',
      statutoryRegulatoryComplianceSchedulers: 'Quarterly reports',
      donorGrantComplianceChecklistRules: 'USAID/EU standard rules',
      courtGradeForensicReferralPackages: true,
      masterAuditOverrideAccessToggles: false,
      zeroTrustSessionFirewallLimits: 15,
      multiTenantRowLevelSeparationEnforcements: true,
      administrativeMfaWallActivationToggles: true,
    };
    return [
      {
        id: ' ji-easu',
        name: 'East African Sovereign University',
        familyKey: 'edu',
        domain: 'easu.jumo.app',
        themeColor: '#0f172a',
        slogan: 'Excellence Through Distributed Digital Transformation',
        activeModules: ['Admissions Office', 'Student Lifecycle Registrar', 'Examinations Hub', 'FAAP Tuition Settlement', 'Academic Senate Desk'],
        departments: [...STANDARD_DEPARTMENTS, 'Academic Affairs', 'University Library Services'],
        roles: [...STANDARD_ROLES],
        version: 'v25.0',
        status: 'Active',
        adminName: 'Sarah Jenkins',
        adminEmail: 'chancellor@easu.jumo.app',
        jumoTrustConfig: defaultTrustConfig
      },
      {
        id: 'ji-sacco',
        name: 'Lusaka Cooperative Credit Union',
        familyKey: 'sacco',
        domain: 'lusaka-coop.jumo.app',
        themeColor: '#15803d',
        slogan: 'Decentralized Capital, Empowered Communities',
        activeModules: ['KYC Directories', 'Sovereign Deposits Ledger', 'Dividend Amortizer', 'FAAP Ledger Sync', 'AI Credit Score Rating'],
        departments: [...STANDARD_DEPARTMENTS, 'Member Relations', 'Credit & Risk Auditing'],
        roles: [...STANDARD_ROLES],
        version: 'v25.0',
        status: 'Active',
        adminName: 'Erick Mulenga',
        adminEmail: 'mulenga@lusaka-coop.jumo.app',
        jumoTrustConfig: defaultTrustConfig
      }
    ];
  });

  const [selectedErpIdx, setSelectedErpIdx] = useState<number>(() => {
    const saved = localStorage.getItem('jumo_ueos_v2_active_idx');
    return saved ? Math.min(parseInt(saved, 10), provisionedErps.length - 1) : 0;
  });

  const currentActiveErp = provisionedErps[selectedErpIdx] || provisionedErps[0];

  useEffect(() => {
    localStorage.setItem('jumo_ueos_v2_erps', JSON.stringify(provisionedErps));
  }, [provisionedErps]);

  useEffect(() => {
    localStorage.setItem('jumo_ueos_v2_active_idx', String(selectedErpIdx));
  }, [selectedErpIdx]);

  // --- WORKSPACE NAV STATE ---
  // Active Navigation Tab
  const [activeNavSection, setActiveNavSection] = useState<string>('platform_overview');

  // --- INSTALLER / PROVISIONING ENGINE STATE ---
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [setupBaseTemplate, setSetupBaseTemplate] = useState<string>('edu');
  const [setupInstName, setSetupInstName] = useState<string>('');
  const [setupDomain, setSetupDomain] = useState<string>('');
  const [setupColor, setSetupColor] = useState<string>('#1e3a8a');
  const [setupSlogan, setSetupSlogan] = useState<string>('Transparent Service, Clean Auditing');
  const [setupAdminName, setSetupAdminName] = useState<string>('');
  const [setupAdminEmail, setSetupAdminEmail] = useState<string>('');
  const [wizardModules, setWizardModules] = useState<Record<string, boolean>>({});
  const [wizardProgress, setWizardProgress] = useState<number>(0);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [deployLogs, setDeployLogs] = useState<string[]>([]);

  // Update wizard defaults when base template changes
  useEffect(() => {
    const template = PRECONFIGURED_TEMPLATES.find(t => t.id === setupBaseTemplate);
    if (template) {
      setSetupColor(template.defaultColor);
      setSetupSlogan(template.defaultSlogan);
      // Initialize module selectors
      const mods: Record<string, boolean> = {};
      template.baseModules.forEach(m => { mods[m] = true; });
      template.industryModules.forEach(m => { mods[m] = false; });
      setWizardModules(mods);
    }
  }, [setupBaseTemplate]);

  // Handle Domain Auto-generation
  useEffect(() => {
    if (setupInstName) {
      const slug = setupInstName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setSetupDomain(`${slug}.jumo.app`);
    } else {
      setSetupDomain('');
    }
  }, [setupInstName]);

  // --- UNIVERSAL DEPARTMENT FACTORY STATE ---
  const [customDeptInput, setCustomDeptInput] = useState<string>('');

  // --- UNIVERSAL ROLE FACTORY STATE ---
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number>(0);

  // --- WORKFLOW FACTORY STATE ---
  const [workflows, setWorkflows] = useState<WorkflowChain[]>(() => {
    const saved = localStorage.getItem('jumo_ueos_workflows');
    return saved ? JSON.parse(saved) : [
      { id: 'wf-1', name: 'Purchase Requisition approval', trigger: 'Procurement Request Form', steps: ['Initiator', 'Procurement Manager', 'FAAP Auditor Check', 'CFO Signature', 'Disbursement Post'], slaHours: 24, status: 'Active' },
      { id: 'wf-2', name: 'New Employee Onboarding Contract', trigger: 'Recruitment Contract Request', steps: ['HR Specialist', 'Department Head Review', 'FAAP Budget Match', 'CEO Digital Seal'], slaHours: 48, status: 'Active' },
      { id: 'wf-3', name: 'Clinical Radiology PACS Referral', trigger: 'Doctor EHR Referral Form', steps: ['Consulting Physician', 'Radiology Desk Allocator', 'Clinical Lead Review'], slaHours: 2, status: 'Active' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('jumo_ueos_workflows', JSON.stringify(workflows));
  }, [workflows]);

  const [newWfName, setNewWfName] = useState<string>('');
  const [newWfTrigger, setNewWfTrigger] = useState<string>('');
  const [newWfSteps, setNewWfSteps] = useState<string[]>(['Department Head', 'FAAP Auditor']);
  const [newWfStepInput, setNewWfStepInput] = useState<string>('');
  const [newWfSla, setNewWfSla] = useState<number>(24);
  const [simulatedWorkflowId, setSimulatedWorkflowId] = useState<string | null>(null);
  const [simulatedWorkflowLogs, setSimulatedWorkflowLogs] = useState<string[]>([]);
  const [simulatedStepIdx, setSimulatedStepIdx] = useState<number>(-1);

  // --- REPORT & DASHBOARD FACTORY STATE ---
  const [widgets, setWidgets] = useState<DashboardWidget[]>(() => {
    const saved = localStorage.getItem('jumo_ueos_dashboard_widgets');
    return saved ? JSON.parse(saved) : [
      { id: 'w-1', title: 'Total Capital Ledger Assets', type: 'metric', metricValue: '$4,829,481.00', metricLabel: '$0.00 Double-entry balanced', cols: 1 },
      { id: 'w-2', title: 'Tenant Operations Health Score', type: 'metric', metricValue: '100% Perfect', metricLabel: 'AEGIS active security shields', cols: 1 },
      { id: 'w-3', title: 'Active Staff & Users Registry', type: 'metric', metricValue: '142 Verified', metricLabel: 'With Hardware MFA keys active', cols: 1 }
    ];
  });

  useEffect(() => {
    localStorage.setItem('jumo_ueos_dashboard_widgets', JSON.stringify(widgets));
  }, [widgets]);

  const [newWidgetTitle, setNewWidgetTitle] = useState<string>('');
  const [newWidgetValue, setNewWidgetValue] = useState<string>('');
  const [newWidgetLabel, setNewWidgetLabel] = useState<string>('');
  const [newWidgetCols, setNewWidgetCols] = useState<1 | 2 | 3>(1);

  // --- FAAP FINANCIAL BACKBONE STATE ---
  const [faapDebit, setFaapDebit] = useState<number>(1500);
  const [faapCredit, setFaapCredit] = useState<number>(1500);
  const [faapReference, setFaapReference] = useState<string>('FEES-SEMESTER-B');
  const [faapDescription, setFaapDescription] = useState<string>('Sovereign Student Tuition Settlement Ledger');
  const [ledgerEntries, setLedgerEntries] = useState<any[]>(() => {
    const saved = localStorage.getItem('jumo_ueos_ledger_entries');
    return saved ? JSON.parse(saved) : [
      { id: 'TX-9201', ref: 'REGISTRY-TUITION-HQ', debit: 45000, credit: 45000, fee: 675.00, desc: 'East African University tuition collection', date: '2026-07-28 09:12', status: 'Sovereign Verified Balanced' },
      { id: 'TX-9202', ref: 'PACS-XRAY-REQUISITION', debit: 850, credit: 850, fee: 12.75, desc: 'Medical imaging scan clearance billing', date: '2026-07-28 11:34', status: 'Sovereign Verified Balanced' },
      { id: 'TX-9203', ref: 'CHAMA-COOP-SAVINGS', debit: 25000, credit: 25000, fee: 375.00, desc: 'USSD Member savings deposit posting', date: '2026-07-28 14:02', status: 'Sovereign Verified Balanced' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('jumo_ueos_ledger_entries', JSON.stringify(ledgerEntries));
  }, [ledgerEntries]);

  // --- COMMUNICATIONS LOG STATE ---
  const [commsChannel, setCommsChannel] = useState<'SMS' | 'Email' | 'Push'>('SMS');
  const [commsTarget, setCommsTarget] = useState<string>('All Students & Staff');
  const [commsBody, setCommsBody] = useState<string>('');
  const [commsLog, setCommsLog] = useState<any[]>(() => {
    const saved = localStorage.getItem('jumo_ueos_comms_log');
    return saved ? JSON.parse(saved) : [
      { id: '1', msg: 'Sovereign MFA mandate verified across all accounting terminals.', target: 'All Financial Staff', channel: 'Push', time: '2026-07-28 10:15' },
      { id: '2', msg: 'System Audit completed successfully. $0.00 balanced offset verified.', target: 'Executive Board', channel: 'Email', time: '2026-07-28 12:00' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('jumo_ueos_comms_log', JSON.stringify(commsLog));
  }, [commsLog]);

  // --- INTEGRATIONS MARKETPLACE STATE ---
  const [integrations, setIntegrations] = useState<Record<string, 'Connected' | 'Disconnected'>>(() => {
    const saved = localStorage.getItem('jumo_ueos_integrations');
    return saved ? JSON.parse(saved) : {
      'mpesa': 'Connected',
      'stripe': 'Connected',
      'kcb_api': 'Disconnected',
      'aws_s3': 'Connected',
      'twilio': 'Connected',
      'national_id': 'Connected',
      'whatsapp': 'Disconnected'
    };
  });

  useEffect(() => {
    localStorage.setItem('jumo_ueos_integrations', JSON.stringify(integrations));
  }, [integrations]);

  // --- COGNITIVE AI MEMORY STATE ---
  const [aiInput, setAiInput] = useState<string>('');
  const [aiChatLogs, setAiChatLogs] = useState<any[]>(() => {
    const saved = localStorage.getItem('jumo_ueos_ai_logs');
    return saved ? JSON.parse(saved) : [
      { sender: 'AI', text: 'Greetings Sovereign Administrator. How may I assist with your general ledger audit, active workflows, or departmental allocations?' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('jumo_ueos_ai_logs', JSON.stringify(aiChatLogs));
  }, [aiChatLogs]);

  // --- RECORDS DMS CENTER STATE ---
  const [uploadedDocs, setUploadedDocs] = useState<any[]>(() => {
    const saved = localStorage.getItem('jumo_ueos_uploaded_docs');
    return saved ? JSON.parse(saved) : [
      { name: 'University_Accreditation_Charter_2026.pdf', size: '4.2 MB', signature: 'SHA-256 Verified', status: 'Sealed & Encrypted' },
      { name: 'Q3_Double_Entry_Ledger_Sovereign_Audit.pdf', size: '12.8 MB', signature: 'SHA-256 Verified', status: 'Sealed & Encrypted' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('jumo_ueos_uploaded_docs', JSON.stringify(uploadedDocs));
  }, [uploadedDocs]);

  // --- PORTAL VIEW SIMULATOR STATE ---
  const [activePortalSimulator, setActivePortalSimulator] = useState<'public' | 'leadership' | 'staff' | 'member' | 'mobile'>('leadership');

  // --- SEARCH INDEX STATE ---
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // --- ACTIONS ---
  // Create New Institution Wizard Execution
  const handleDeploySovereignErp = () => {
    if (!setupInstName.trim() || !setupAdminName.trim() || !setupAdminEmail.trim()) {
      alert('Please fill in all requested fields (Name, Admin Name, and Email).');
      return;
    }

    setIsDeploying(true);
    setWizardProgress(5);
    setDeployLogs(['Initializing Kernel Node Container bootstrapping...']);

    const steps = [
      { p: 20, log: 'Initializing Core JUMO Foundation Layer: Mapping Tenant Identity...' },
      { p: 40, log: 'Generating Universal Department Factory: Structuring Finance, HR, ICT and Audit nodes...' },
      { p: 60, log: 'Synthesizing Universal Role Factory: Injecting Zero-Trust RBAC & ABAC Permissions...' },
      { p: 75, log: 'Instantiating FAAP Ledger Balance Engine: Enforcing $0.00 Double-Entry Parity...' },
      { p: 90, log: 'Configuring Branded Cognitive AI Assistant Memory Space...' },
      { p: 100, log: 'Sovereign Certification Seal Completed successfully. Ring-0 AEGIS Shield fully armed!' }
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setWizardProgress(steps[stepIdx].p);
        setDeployLogs(prev => [...prev, `[System] ${steps[stepIdx].log}`]);
        stepIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          // Prepare active modules
          const activeMods = Object.entries(wizardModules)
            .filter(([_, active]) => active)
            .map(([mod]) => mod);

          const newErp: ProvisionedErp = {
            id: `ji-${Date.now().toString().slice(-4)}`,
            name: setupInstName,
            familyKey: setupBaseTemplate,
            domain: setupDomain,
            themeColor: setupColor,
            slogan: setupSlogan,
            activeModules: activeMods,
            departments: [...STANDARD_DEPARTMENTS],
            roles: [...STANDARD_ROLES],
            version: 'v25.0',
            status: 'Active',
            adminName: setupAdminName,
            adminEmail: setupAdminEmail,
            jumoTrustConfig: {
              enableJumoTrust: true,
              suspendTrustServices: false,
              trustMode: 'Advanced',
              trustPolicyManagement: 'Strict segregation of duties, multi-stage digital signature verification, and immutable double-entry ledger audits are active by default.',
              trustUpdateManager: 'Automatic',
              trustLicensing: 'Sovereign',
              trustBilling: 'Tokenized',
              trustVersionControl: 'v50.2.1',
              continuousAudit: true,
              scheduledAudit: true,
              onDemandAudit: true,
              departmentAudit: true,
              financialAudit: true,
              operationalAudit: true,
              procurementAudit: true,
              recruitmentAudit: true,
              assetAudit: true,
              complianceAudit: true,
              enableAuditorTeams: true,
              auditLevels: 'Level 3',
              auditFrequency: 'Continuous',
              auditPriorities: 'High & Critical',
              escalationRules: 'Instant',
              evidenceCollectionMode: 'Cryptographic WORM',
              auditIndependence: 'Independent Board Reporting',
              integrityRules: 'Zero-Tolerance Segregation',
              performanceMetrics: 'Audit Accuracy Rate',
              communicationSchedulers: 'Instant push & digest',
              faapReconciliationRules: 'Strict $0.00 Parity',
              doubleEntryParityEnforcement: true,
              revenueLeakageTolerances: 0.05,
              spendingVelocityThresholds: 10000,
              pettyCashFloatAuditingCaps: 500,
              biometricAttendanceVerificationTolerances: 10,
              recruitmentMeritVerificationScoreThresholds: 85,
              appraisalObjectivityControlFlags: true,
              ghostRoleScanningSensitivity: 'Aggressive Fraud Radar',
              riskScoringWeights: 'Financial-heavy',
              predictiveFraudRiskPredictorParameters: 'Deep Neural Simulation',
              businessContinuityBackupValidationRules: 'Hourly check',
              strategicRoadmapAlignmentThresholds: 90,
              executiveMorningBriefingGenerationRules: 'AI-Synthesized Summary',
              boardPackageAssemblyDeadlines: '7 days prior',
              committeeQuorumVerificationParameters: 'Two-thirds majority (>66%)',
              actionItemEscalationSchedules: 'Immediate escalations',
              wormCryptographicVaultRetentionRules: '7 Years (Regulatory)',
              pkiSignatureValidationModes: 'Strict PKI & Hardware',
              physicalReceiptOcrCompletenessThresholds: 95,
              readOnlyLogsVerificationFrequency: 'Continuous',
              publicSectorTransparencyDisclosureLevels: 'Redacted summarized public',
              statutoryRegulatoryComplianceSchedulers: 'Quarterly reports',
              donorGrantComplianceChecklistRules: 'USAID/EU standard rules',
              courtGradeForensicReferralPackages: true,
              masterAuditOverrideAccessToggles: false,
              zeroTrustSessionFirewallLimits: 15,
              multiTenantRowLevelSeparationEnforcements: true,
              administrativeMfaWallActivationToggles: true,
            }
          };

          const updated = [...provisionedErps, newErp];
          setProvisionedErps(updated);
          setSelectedErpIdx(updated.length - 1); // switch context

          // Reset wizard
          setIsDeploying(false);
          setWizardStep(4); // show success step
        }, 1000);
      }
    }, 800);
  };

  // Quick Auto-Provision Departments (Universal Department Factory)
  const handleAutoGenerateStandardDepts = () => {
    const updated = [...provisionedErps];
    const current = updated[selectedErpIdx];
    
    // Merge standard departments that do not already exist
    const originalCount = current.departments.length;
    STANDARD_DEPARTMENTS.forEach(dept => {
      if (!current.departments.includes(dept)) {
        current.departments.push(dept);
      }
    });

    setProvisionedErps(updated);
    alert(`Universal Department Factory executed: ${current.departments.length - originalCount} standard enterprise departments generated.`);
  };

  // Add Custom Department
  const handleAddCustomDept = () => {
    if (!customDeptInput.trim()) return;
    const updated = [...provisionedErps];
    if (!updated[selectedErpIdx].departments.includes(customDeptInput.trim())) {
      updated[selectedErpIdx].departments.push(customDeptInput.trim());
      setProvisionedErps(updated);
      setCustomDeptInput('');
    } else {
      alert('Department already exists.');
    }
  };

  // Delete Department
  const handleDeleteDept = (deptName: string) => {
    const updated = [...provisionedErps];
    updated[selectedErpIdx].departments = updated[selectedErpIdx].departments.filter(d => d !== deptName);
    setProvisionedErps(updated);
  };

  // Update Role Permissions
  const handleTogglePermission = (roleIndex: number, permKey: 'read' | 'write' | 'approve' | 'audit' | 'delete') => {
    const updated = [...provisionedErps];
    const role = updated[selectedErpIdx].roles[roleIndex];
    role.permissions[permKey] = !role.permissions[permKey];
    setProvisionedErps(updated);
  };

  // Add Custom Workflow
  const handleAddWorkflow = () => {
    if (!newWfName.trim() || !newWfTrigger.trim()) return;
    const newWf: WorkflowChain = {
      id: `wf-${Date.now().toString().slice(-4)}`,
      name: newWfName,
      trigger: newWfTrigger,
      steps: newWfSteps,
      slaHours: newWfSla,
      status: 'Active'
    };
    setWorkflows([...workflows, newWf]);
    setNewWfName('');
    setNewWfTrigger('');
    setNewWfSteps(['Department Head', 'FAAP Auditor']);
  };

  const handleAddWfStep = () => {
    if (!newWfStepInput.trim()) return;
    setNewWfSteps([...newWfSteps, newWfStepInput.trim()]);
    setNewWfStepInput('');
  };

  // Simulated Visual Workflow Execution
  const handleSimulateWorkflow = (wf: WorkflowChain) => {
    setSimulatedWorkflowId(wf.id);
    setSimulatedStepIdx(0);
    setSimulatedWorkflowLogs([`Initializing simulated workflow trigger: "${wf.trigger}"...`]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step <= wf.steps.length) {
        setSimulatedStepIdx(step - 1);
        setSimulatedWorkflowLogs(prev => [
          ...prev, 
          `Step ${step}/${wf.steps.length} Cleared: [${wf.steps[step - 1]}] digital approval signature validated against Zero-Trust RBAC keys.`
        ]);
      } else {
        clearInterval(interval);
        setSimulatedStepIdx(wf.steps.length); // complete
        setSimulatedWorkflowLogs(prev => [
          ...prev, 
          `Sovereign Workflow Cleared: Ledger settlement committed to FAAP under strict $0.00 Parity.`
        ]);
      }
    }, 1200);
  };

  // Add Custom Dashboard Widget
  const handleAddWidget = () => {
    if (!newWidgetTitle.trim() || !newWidgetValue.trim()) return;
    const newW: DashboardWidget = {
      id: `w-${Date.now()}`,
      title: newWidgetTitle,
      type: 'metric',
      metricValue: newWidgetValue,
      metricLabel: newWidgetLabel || 'Custom dynamic telemetry',
      cols: newWidgetCols
    };
    setWidgets([...widgets, newW]);
    setNewWidgetTitle('');
    setNewWidgetValue('');
    setNewWidgetLabel('');
  };

  // Post FAAP Ledger entry
  const handlePostLedger = () => {
    if (faapDebit !== faapCredit) {
      alert('CRITICAL LEDGER PARITY ERROR: Debits must exactly equal credits ($0.00 offset). Integrity check failed.');
      return;
    }

    const calculatedFee = parseFloat((faapDebit * 0.015).toFixed(2));
    const newTx = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      ref: faapReference.toUpperCase(),
      debit: faapDebit,
      credit: faapCredit,
      fee: calculatedFee,
      desc: `${faapDescription} | JUMO Master Treasury 1.5% Settlement Applied`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Sovereign Verified Balanced'
    };

    setLedgerEntries([newTx, ...ledgerEntries]);
    setFaapReference('');
    setFaapDescription('Sovereign Student Tuition Settlement Ledger');
  };

  // Post circular notification
  const handleSendBroadcast = () => {
    if (!commsBody.trim()) return;
    const newLog = {
      id: String(Date.now()),
      msg: commsBody,
      target: commsTarget,
      channel: commsChannel,
      time: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setCommsLog([newLog, ...commsLog]);
    setCommsBody('');
    alert(`Sovereign broadcast Circular dispatched successfully via ${commsChannel} to ${commsTarget}!`);
  };

  // AI Chat Interface
  const handleSendAiMessage = () => {
    if (!aiInput.trim()) return;
    const userMsg = aiInput;
    setAiInput('');
    setAiChatLogs(prev => [...prev, { sender: 'User', text: userMsg }]);

    setTimeout(() => {
      let responseText = `Analyzing cognitive memory indices for **${currentActiveErp.name}**... `;
      const q = userMsg.toLowerCase();
      if (q.includes('fee') || q.includes('payment') || q.includes('faap') || q.includes('ledger')) {
        responseText += `The double-entry ledger database reports total transactions of $${ledgerEntries.reduce((acc, t) => acc + t.debit, 0).toLocaleString()} with zero drift ($0.00 parity offset). M-Pesa & Stripe nodes are online.`;
      } else if (q.includes('dept') || q.includes('department')) {
        responseText += `I have indexed ${currentActiveErp.departments.length} active departments across the Universal Department Factory. Standard endpoints are active.`;
      } else if (q.includes('role') || q.includes('rbac') || q.includes('permission')) {
        responseText += `The security directory records ${currentActiveErp.roles.length} standard roles. Zero privilege drift detected.`;
      } else if (q.includes('workflow') || q.includes('approval')) {
        responseText += `We currently track ${workflows.length} active approval workflow blueprints. Mean processing speed is 1.4 hours under current SLA parameters.`;
      } else {
        responseText += `Continuous diagnostics report 100% optimal runtime metrics. Let me know if you would like to dispatch a global circular, audit the cash flow, or run a digital twin simulator.`;
      }
      setAiChatLogs(prev => [...prev, { sender: 'AI', text: responseText }]);
    }, 1500);
  };

  // DMS Document scanner
  const handleMockDocUpload = () => {
    const filename = `Contract_Procurement_Seal_${Math.floor(100 + Math.random() * 900)}.pdf`;
    const newDoc = {
      name: filename,
      size: `${(1.2 + Math.random() * 8).toFixed(1)} MB`,
      signature: 'SHA-256 Verified',
      status: 'Sealed & Encrypted'
    };
    setUploadedDocs([newDoc, ...uploadedDocs]);
    alert(`DMS OCR Process Completed: Digital Document "${filename}" verified, cryptographically signed, and indexed.`);
  };

  // Global search process
  const handleSearchProcessor = (val: string) => {
    setGlobalSearch(val);
    if (!val.trim()) {
      setSearchResults([]);
      return;
    }
    const l = val.toLowerCase();
    const temp: any[] = [];

    // Search depts
    currentActiveErp.departments.forEach(d => {
      if (d.toLowerCase().includes(l)) {
        temp.push({ cat: 'Department Directory', title: d, desc: 'Active node in Universal Department Factory' });
      }
    });

    // Search workflows
    workflows.forEach(w => {
      if (w.name.toLowerCase().includes(l) || w.trigger.toLowerCase().includes(l)) {
        temp.push({ cat: 'Workflow Blueprint', title: w.name, desc: `Triggered by: ${w.trigger} • SLA: ${w.slaHours} hrs` });
      }
    });

    // Search financial ledger
    ledgerEntries.forEach(tx => {
      if (tx.ref.toLowerCase().includes(l) || tx.desc.toLowerCase().includes(l)) {
        temp.push({ cat: 'FAAP Ledger', title: tx.id, desc: `${tx.desc} • Ref: ${tx.ref} • Balanced ($0.00 parity)` });
      }
    });

    setSearchResults(temp);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-950">
      
      {/* --- PHASE 1 — COMPACT UNIVERSAL HEADER REDESIGN (RULE[AGENTS_md]) --- */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 px-4 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center text-white shadow-xs">
            <Building2 className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xs font-black tracking-tight text-slate-900 flex items-center gap-1.5 uppercase font-mono">
              JUMO UEOS <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded">v25.0 Enterprise</span>
            </h1>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex items-center relative max-w-xs w-full mx-4">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5" />
          <input
            type="text"
            placeholder="Universal institutional search..."
            value={globalSearch}
            onChange={(e) => handleSearchProcessor(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-medium placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-600 outline-none transition"
          />
        </div>

        {/* Essential Global Controls */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-slate-500 hidden sm:inline uppercase">Tenant Workspace:</span>
            <select
              value={selectedErpIdx}
              onChange={(e) => setSelectedErpIdx(parseInt(e.target.value))}
              className="p-1.5 bg-slate-100 border border-slate-200 text-slate-900 rounded-lg text-[10px] font-black outline-none focus:ring-2 focus:ring-indigo-600 max-w-[160px] sm:max-w-none"
            >
              {provisionedErps.map((erp, idx) => (
                <option key={erp.id} value={idx}>{erp.name}</option>
              ))}
            </select>
          </div>

          <span className="h-4 w-px bg-slate-200"></span>

          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 uppercase">AEGIS Active</span>
          </div>
        </div>
      </header>

      {/* --- MAIN PAGE LAYOUT: LEFT NAV + MAIN WORKSPACE (RULE[AGENTS_md]) --- */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto p-4 lg:p-6 gap-6">
        
        {/* LEFT NAVIGATION COLUMN */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-4">
          
          {/* Tenant Details Card */}
          <div className="bg-white border border-slate-200/80 p-4 rounded-xl shadow-xs space-y-1.5">
            <span className="text-[9px] font-mono font-bold uppercase text-slate-400">Current Domain Node</span>
            <h2 className="text-xs font-black text-slate-900 tracking-tight">{currentActiveErp.name}</h2>
            <p className="text-[10px] font-mono font-bold text-indigo-600">{currentActiveErp.domain}</p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] font-mono font-bold text-slate-500">
              <span>Sovereign ID: {currentActiveErp.id.toUpperCase()}</span>
              <span className="text-emerald-700">Active</span>
            </div>
          </div>

          {/* Left Navigation Tree */}
          <nav className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-xs flex flex-col divide-y divide-slate-100">
            
            {/* OCC GROUP */}
            <div className="p-2 space-y-1">
              <span className="block px-2 py-1 text-[9px] font-mono font-black uppercase text-slate-400">Ring-0 Owner Control Center</span>
              
              <button
                onClick={() => { setActiveNavSection('platform_overview'); setGlobalSearch(''); }}
                className={`w-full px-2.5 py-2 rounded-lg text-left text-xs font-bold transition flex items-center justify-between ${
                  activeNavSection === 'platform_overview' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Platform Overview</span>
                </div>
                <span className="text-[9px] font-mono opacity-80">Telemetry</span>
              </button>

              <button
                onClick={() => { setActiveNavSection('erp_factory'); setGlobalSearch(''); }}
                className={`w-full px-2.5 py-2 rounded-lg text-left text-xs font-bold transition flex items-center justify-between ${
                  activeNavSection === 'erp_factory' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Plus className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>ERP Installer & Factory</span>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded">Factory</span>
              </button>

              <button
                onClick={() => { setActiveNavSection('integrations'); setGlobalSearch(''); }}
                className={`w-full px-2.5 py-2 rounded-lg text-left text-xs font-bold transition flex items-center justify-between ${
                  activeNavSection === 'integrations' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Integration APIs</span>
                </div>
                <span className="text-[9px] font-mono opacity-80">APIs</span>
              </button>
            </div>

            {/* ERP SUITE WORKSPACE */}
            <div className="p-2 space-y-1">
              <span className="block px-2 py-1 text-[9px] font-mono font-black uppercase text-slate-400">Institutional Workspace</span>

              <button
                onClick={() => { setActiveNavSection('dashboard_factory'); setGlobalSearch(''); }}
                className={`w-full px-2.5 py-2 rounded-lg text-left text-xs font-bold transition flex items-center justify-between ${
                  activeNavSection === 'dashboard_factory' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Grid className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Report & Dashboard Factory</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveNavSection('dept_role_factory'); setGlobalSearch(''); }}
                className={`w-full px-2.5 py-2 rounded-lg text-left text-xs font-bold transition flex items-center justify-between ${
                  activeNavSection === 'dept_role_factory' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Dept & Role Factories</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveNavSection('faap_ledger'); setGlobalSearch(''); }}
                className={`w-full px-2.5 py-2 rounded-lg text-left text-xs font-bold transition flex items-center justify-between ${
                  activeNavSection === 'faap_ledger' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <DollarSign className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>FAAP Financial Ledger</span>
                </div>
                <span className="text-[9px] font-mono font-bold text-emerald-600">$0.00</span>
              </button>

              <button
                onClick={() => { setActiveNavSection('workflow_factory'); setGlobalSearch(''); }}
                className={`w-full px-2.5 py-2 rounded-lg text-left text-xs font-bold transition flex items-center justify-between ${
                  activeNavSection === 'workflow_factory' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Workflow Factory</span>
                </div>
                <span className="text-[9px] font-mono opacity-80">{workflows.length}</span>
              </button>

              <button
                onClick={() => { setActiveNavSection('records_dms'); setGlobalSearch(''); }}
                className={`w-full px-2.5 py-2 rounded-lg text-left text-xs font-bold transition flex items-center justify-between ${
                  activeNavSection === 'records_dms' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Records & DMS Vault</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveNavSection('comms_hub'); setGlobalSearch(''); }}
                className={`w-full px-2.5 py-2 rounded-lg text-left text-xs font-bold transition flex items-center justify-between ${
                  activeNavSection === 'comms_hub' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Circular Comms Hub</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveNavSection('cognitive_ai'); setGlobalSearch(''); }}
                className={`w-full px-2.5 py-2 rounded-lg text-left text-xs font-bold transition flex items-center justify-between ${
                  activeNavSection === 'cognitive_ai' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bot className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Cognitive AI Assistant</span>
                </div>
                <span className="text-[9px] font-mono text-indigo-600">RAG</span>
              </button>

              <button
                onClick={() => { setActiveNavSection('portal_simulator'); setGlobalSearch(''); }}
                className={`w-full px-2.5 py-2 rounded-lg text-left text-xs font-bold transition flex items-center justify-between ${
                  activeNavSection === 'portal_simulator' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Portals & UI Sim</span>
                </div>
                <span className="text-[9px] font-mono opacity-80">5 Views</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* MAIN WORKSPACE CONTENT */}
        <main className="flex-1 bg-white border border-slate-200/80 rounded-xl p-4 lg:p-6 shadow-xs relative min-h-[500px]">
          
          {/* SEARCH RESULTS DISPLAY (OVERLAYS ALL COVERS) */}
          {globalSearch.trim() !== '' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-xs font-black uppercase text-indigo-700 tracking-wider">Universal Search Index matches</h3>
                <button
                  onClick={() => setGlobalSearch('')}
                  className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-900 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {searchResults.length > 0 ? (
                  searchResults.map((res, i) => (
                    <div key={i} className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-between hover:bg-slate-100/50 transition">
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono font-bold uppercase text-indigo-600 px-1.5 py-0.5 bg-indigo-50 border border-indigo-100 rounded">
                          {res.cat}
                        </span>
                        <h4 className="text-xs font-black text-slate-900">{res.title}</h4>
                        <p className="text-[11px] text-slate-500">{res.desc}</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center text-xs text-slate-400 space-y-1">
                    <AlertCircle className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="font-bold">No matches found in standard directories.</p>
                    <p className="text-[11px] text-slate-400 font-normal">Try searching "Tuition", "HR", or "Procurement".</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STANDALONE SCENARIO TABS (IF NO ACTIVE SEARCH QUERY) */}
          {globalSearch.trim() === '' && (
            <>
              {/* PLATFORM OVERVIEW (TELEMETRY) */}
              {activeNavSection === 'platform_overview' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">JUMO UEOS Platform Telemetry Overview</h2>
                    <p className="text-xs text-slate-500">Global health metrics, cluster micro-kernel statistics, and continuous operating layers.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Micro-Kernel Health</div>
                      <div className="text-lg font-black text-emerald-600">100% Stable</div>
                      <p className="text-[10px] text-slate-400 font-mono">0.02ms latency average</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Active Tenant Domains</div>
                      <div className="text-lg font-black text-slate-900">{provisionedErps.length} Active</div>
                      <p className="text-[10px] text-indigo-600 font-mono">Sovereign sandboxed isolates</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Continuous SLA Audit</div>
                      <div className="text-lg font-black text-indigo-600">Perfect Sync</div>
                      <p className="text-[10px] text-slate-400 font-mono">Ledger Parity Guaranteed</p>
                    </div>
                  </div>

                  {/* System Layers Status */}
                  <div className="bg-slate-50 border rounded-xl overflow-hidden text-xs">
                    <div className="p-3 bg-slate-100 border-b font-extrabold text-slate-800">Bootstrapped System Layers Status</div>
                    <div className="divide-y text-slate-700">
                      <div className="p-3 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900">Experience Layer (Layer 1)</span>
                          <p className="text-[11px] text-slate-400">Renders Universal Header, Left navigation shell, and Custom branded workspaces</p>
                        </div>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded uppercase">Booted</span>
                      </div>
                      <div className="p-3 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900">FAAP Financial Backbone (Layer 2)</span>
                          <p className="text-[11px] text-slate-400">Enforces absolute $0.00 offset parity across double-entry transactions</p>
                        </div>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded uppercase">Booted</span>
                      </div>
                      <div className="p-3 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900">Zero-Trust Directory & RBAC Core (Layer 3)</span>
                          <p className="text-[11px] text-slate-400">Protects administrative endpoints using hardware key simulation logs</p>
                        </div>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded uppercase">Booted</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ERP INSTALLER & FACTORY (UNIVERSAL INSTALLATION & PROVISIONING ENGINE) */}
              {activeNavSection === 'erp_factory' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Sovereign ERP Installation & Factory</h2>
                    <p className="text-xs text-slate-500">Discover templates, customize branding, activate modules, structure standard departments, and deploy dynamically.</p>
                  </div>

                  {/* Template Discovery Step 1 */}
                  {wizardStep === 1 && (
                    <div className="space-y-4">
                      <div className="p-3.5 bg-indigo-50 text-indigo-900 border border-indigo-200/50 rounded-xl text-xs font-bold leading-relaxed">
                        Step 1 of 3: Select base industry vertical template.
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {PRECONFIGURED_TEMPLATES.map(t => {
                          const Icon = t.icon;
                          const isSelected = setupBaseTemplate === t.id;
                          return (
                            <button
                              key={t.id}
                              onClick={() => setSetupBaseTemplate(t.id)}
                              className={`p-3.5 text-left border rounded-xl flex items-start gap-3 transition cursor-pointer ${
                                isSelected ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              <Icon className="w-5 h-5 shrink-0 text-indigo-600 mt-0.5" />
                              <div className="space-y-0.5">
                                <span className="font-black text-xs block">{t.name}</span>
                                <span className="text-[10px] text-slate-500 font-mono font-bold block">{t.family}</span>
                                <p className="text-[11px] text-slate-400 font-normal leading-snug">{t.description}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex justify-end pt-4 border-t">
                        <button
                          onClick={() => setWizardStep(2)}
                          className="px-5 py-2.5 bg-[#0F172A] hover:bg-indigo-950 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                        >
                          Configure Custom Branding <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Branding Configuration Step 2 */}
                  {wizardStep === 2 && (
                    <div className="space-y-4">
                      <div className="p-3.5 bg-indigo-50 text-indigo-900 border border-indigo-200/50 rounded-xl text-xs font-bold leading-relaxed">
                        Step 2 of 3: Configure corporate visual identity & domain properties.
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                        <div className="space-y-1">
                          <label className="text-slate-600">Enterprise / Institution Name</label>
                          <input
                            type="text"
                            value={setupInstName}
                            onChange={(e) => setSetupInstName(e.target.value)}
                            placeholder="e.g. Sovereign Mining Guild, Kampala Municipal"
                            className="w-full p-2.5 border border-slate-300 rounded-lg outline-none font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-slate-600">Target Domain Node (Auto-generated)</label>
                          <input
                            type="text"
                            value={setupDomain}
                            readOnly
                            placeholder="e.g. guild-mining.jumo.app"
                            className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg outline-none font-mono font-bold text-indigo-600"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-slate-600">Institutional Slogan</label>
                          <input
                            type="text"
                            value={setupSlogan}
                            onChange={(e) => setSetupSlogan(e.target.value)}
                            placeholder="e.g. Excellence in Civil Auditing and Service"
                            className="w-full p-2.5 border border-slate-300 rounded-lg outline-none font-medium text-slate-800 focus:ring-2 focus:ring-indigo-600"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-slate-600">Primary Branding Color</label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={setupColor}
                              onChange={(e) => setSetupColor(e.target.value)}
                              className="w-10 h-10 border border-slate-300 rounded-lg cursor-pointer"
                            />
                            <span className="font-mono text-slate-500 uppercase">{setupColor}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4 border-t">
                        <button
                          onClick={() => setWizardStep(1)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          onClick={() => setWizardStep(3)}
                          className="px-5 py-2.5 bg-[#0F172A] hover:bg-indigo-950 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                        >
                          Select Modules & Admin <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Modules & Administrative Node Creation Step 3 */}
                  {wizardStep === 3 && (
                    <div className="space-y-4">
                      <div className="p-3.5 bg-indigo-50 text-indigo-900 border border-indigo-200/50 rounded-xl text-xs font-bold leading-relaxed">
                        Step 3 of 3: Select extensions & designate executive administrator.
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                        <div className="space-y-2">
                          <span className="text-slate-600 block border-b pb-1">Activate Industry Extensions</span>
                          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                            {Object.entries(wizardModules).map(([mod, active]) => (
                              <div
                                key={mod}
                                onClick={() => setWizardModules(prev => ({ ...prev, [mod]: !prev[mod] }))}
                                className={`p-2 rounded-lg border flex items-center justify-between cursor-pointer transition ${
                                  active ? 'bg-indigo-50/70 border-indigo-300 text-indigo-900' : 'bg-slate-50 border-slate-200 text-slate-600'
                                }`}
                              >
                                <span>{mod}</span>
                                <div className={`w-4 h-4 rounded flex items-center justify-center border ${active ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300'}`}>
                                  {active && '✓'}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <span className="text-slate-600 block border-b pb-1">Designate Executive Admin account</span>
                          
                          <div className="space-y-2 font-bold text-xs">
                            <div className="space-y-1">
                              <label className="text-slate-500 font-bold block">Administrator Name</label>
                              <input
                                type="text"
                                value={setupAdminName}
                                onChange={(e) => setSetupAdminName(e.target.value)}
                                placeholder="Sarah Jenkins"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-slate-500 font-bold block">Admin Corporate Email</label>
                              <input
                                type="email"
                                value={setupAdminEmail}
                                onChange={(e) => setSetupAdminEmail(e.target.value)}
                                placeholder="jenkins@yourdomain.com"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Deploy progress logs */}
                      {isDeploying && (
                        <div className="p-4 bg-slate-900 text-slate-200 font-mono text-[10px] rounded-lg border border-slate-800 space-y-2 animate-in slide-in-from-bottom duration-200">
                          <div className="flex items-center justify-between font-bold text-amber-400">
                            <span>PROVISIONING SOVEREIGN INSTANCE ({wizardProgress}%)</span>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          </div>
                          <div className="space-y-1 max-h-32 overflow-y-auto">
                            {deployLogs.map((log, i) => (
                              <div key={i} className="flex gap-2 text-slate-300">
                                <span className="text-indigo-400">✓</span>
                                <span>{log}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between pt-4 border-t">
                        <button
                          onClick={() => setWizardStep(2)}
                          disabled={isDeploying}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition disabled:opacity-50 cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleDeploySovereignErp}
                          disabled={isDeploying}
                          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-lg shadow-md transition disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4" /> Provision & Deploy Instance
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Deployment Completed Success Step */}
                  {wizardStep === 4 && (
                    <div className="p-8 text-center space-y-6 max-w-md mx-auto animate-in zoom-in-95 duration-300">
                      <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-300 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
                        <Award className="w-8 h-8" />
                      </div>

                      <div className="space-y-2">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] uppercase rounded-full">
                          Deployment Active
                        </span>
                        <h3 className="text-base font-black text-slate-900">{setupInstName}</h3>
                        <p className="text-xs text-slate-500">
                          Your sovereign operating platform is provisioned and running.
                        </p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border text-xs text-left font-mono space-y-1">
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-slate-500">Domain Node:</span>
                          <span className="font-bold text-indigo-600">{setupDomain}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Admin Email:</span>
                          <span className="font-bold text-slate-800">{setupAdminEmail}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSetupInstName('');
                          setSetupAdminName('');
                          setSetupAdminEmail('');
                          setWizardStep(1);
                          setActiveNavSection('dept_role_factory');
                        }}
                        className="w-full py-2.5 bg-[#0F172A] hover:bg-indigo-950 text-white font-bold text-xs rounded-lg shadow-md transition"
                      >
                        Launch Department & Role Configuration
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* API INTEGRATIONS MARKETPLACE */}
              {activeNavSection === 'integrations' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">System Integrations & APIs Gateway</h2>
                    <p className="text-xs text-slate-500">Connect third-party payment gateways, core banking APIs, cloud hosting, and national databases.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                    
                    {/* payment gateways */}
                    <div className="p-4 bg-slate-50 border rounded-xl space-y-3">
                      <div className="flex justify-between items-center border-b pb-1.5">
                        <span className="text-slate-500 uppercase font-mono text-[9px]">Sovereign Mobile Money</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${integrations['mpesa'] === 'Connected' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
                          {integrations['mpesa']}
                        </span>
                      </div>
                      <h3 className="font-black text-sm text-slate-900">Safaricom M-Pesa C2B API</h3>
                      <p className="text-slate-500 font-normal leading-relaxed text-[11px]">
                        Disburse micro-loans, collect tuition fees, and balance ledger totals dynamically. Enforces global 1.5% treasury fees automatically.
                      </p>
                      <button
                        onClick={() => setIntegrations(prev => ({ ...prev, mpesa: prev.mpesa === 'Connected' ? 'Disconnected' : 'Connected' }))}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-[11px] font-bold"
                      >
                        {integrations['mpesa'] === 'Connected' ? 'Disconnect API' : 'Activate Connection'}
                      </button>
                    </div>

                    <div className="p-4 bg-slate-50 border rounded-xl space-y-3">
                      <div className="flex justify-between items-center border-b pb-1.5">
                        <span className="text-slate-500 uppercase font-mono text-[9px]">International Credit Cards</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${integrations['stripe'] === 'Connected' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
                          {integrations['stripe']}
                        </span>
                      </div>
                      <h3 className="font-black text-sm text-slate-900">Stripe Payment Gateway</h3>
                      <p className="text-slate-500 font-normal leading-relaxed text-[11px]">
                        Handles international visa/mastercard debit payments, and updates double-entry records center indexes in sub-second speed.
                      </p>
                      <button
                        onClick={() => setIntegrations(prev => ({ ...prev, stripe: prev.stripe === 'Connected' ? 'Disconnected' : 'Connected' }))}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-[11px] font-bold"
                      >
                        {integrations['stripe'] === 'Connected' ? 'Disconnect API' : 'Activate Connection'}
                      </button>
                    </div>

                    <div className="p-4 bg-slate-50 border rounded-xl space-y-3">
                      <div className="flex justify-between items-center border-b pb-1.5">
                        <span className="text-slate-500 uppercase font-mono text-[9px]">Core Banking Rails</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${integrations['kcb_api'] === 'Connected' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
                          {integrations['kcb_api']}
                        </span>
                      </div>
                      <h3 className="font-black text-sm text-slate-900">KCB Commercial Bank Swift API</h3>
                      <p className="text-slate-500 font-normal leading-relaxed text-[11px]">
                        Sync general ledger debit/credit posts with traditional state clearinghouses. Perfect for institutional asset transfers.
                      </p>
                      <button
                        onClick={() => setIntegrations(prev => ({ ...prev, kcb_api: prev.kcb_api === 'Connected' ? 'Disconnected' : 'Connected' }))}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-[11px] font-bold"
                      >
                        {integrations['kcb_api'] === 'Connected' ? 'Disconnect API' : 'Activate Connection'}
                      </button>
                    </div>

                    <div className="p-4 bg-slate-50 border rounded-xl space-y-3">
                      <div className="flex justify-between items-center border-b pb-1.5">
                        <span className="text-slate-500 uppercase font-mono text-[9px]">Sovereign Civil Registry</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${integrations['national_id'] === 'Connected' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
                          {integrations['national_id']}
                        </span>
                      </div>
                      <h3 className="font-black text-sm text-slate-900">National Integrated ID Lookup API</h3>
                      <p className="text-slate-500 font-normal leading-relaxed text-[11px]">
                        Verifies student admissions, patient EHR identities, or SACCO KYC registrations against biological census databases instantly.
                      </p>
                      <button
                        onClick={() => setIntegrations(prev => ({ ...prev, national_id: prev.national_id === 'Connected' ? 'Disconnected' : 'Connected' }))}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-[11px] font-bold"
                      >
                        {integrations['national_id'] === 'Connected' ? 'Disconnect API' : 'Activate Connection'}
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {/* REPORT & DASHBOARD FACTORY */}
              {activeNavSection === 'dashboard_factory' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Report & Dashboard Customizer Factory</h2>
                      <p className="text-xs text-slate-500">Define layout column weights, instantiate customized metric blocks, and monitor live telemetry.</p>
                    </div>
                  </div>

                  {/* Add dynamic metric block form */}
                  <div className="bg-slate-50 p-4 border rounded-xl text-xs font-bold space-y-4">
                    <span className="block border-b pb-1.5 text-slate-800">Generate Custom Widget Block</span>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="space-y-1 col-span-2">
                        <label className="text-slate-600">Widget Title</label>
                        <input
                          type="text"
                          value={newWidgetTitle}
                          onChange={(e) => setNewWidgetTitle(e.target.value)}
                          placeholder="e.g. Active Clinic Patient Registries"
                          className="w-full p-2 bg-white border rounded-lg outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-600">Metric Value</label>
                        <input
                          type="text"
                          value={newWidgetValue}
                          onChange={(e) => setNewWidgetValue(e.target.value)}
                          placeholder="e.g. 481 Active"
                          className="w-full p-2 bg-white border rounded-lg outline-none font-mono focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-600">Widget Width</label>
                        <select
                          value={newWidgetCols}
                          onChange={(e) => setNewWidgetCols(parseInt(e.target.value) as any)}
                          className="w-full p-2 bg-white border rounded-lg outline-none focus:ring-2 focus:ring-indigo-600"
                        >
                          <option value={1}>1 Column Grid</option>
                          <option value={2}>2 Column Grid</option>
                          <option value={3}>3 Column Grid</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-2 border-t">
                      <input
                        type="text"
                        value={newWidgetLabel}
                        onChange={(e) => setNewWidgetLabel(e.target.value)}
                        placeholder="Additional sub-text metadata (e.g. Enforced by AEGIS zero-trust rules)"
                        className="flex-1 p-2 bg-white border rounded-lg outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                      <button
                        onClick={handleAddWidget}
                        className="px-5 py-2 bg-[#0F172A] text-white rounded-lg hover:bg-indigo-950 transition cursor-pointer"
                      >
                        Instantiate Widget
                      </button>
                    </div>
                  </div>

                  {/* Dynamic widgets grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {widgets.map((w, idx) => (
                      <div 
                        key={w.id} 
                        className={`p-4 bg-white border border-slate-200/80 rounded-xl space-y-2 shadow-2xs relative ${
                          w.cols === 2 ? 'md:col-span-2' : w.cols === 3 ? 'md:col-span-3' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start border-b pb-1.5">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{w.title}</span>
                          <button
                            onClick={() => setWidgets(widgets.filter(item => item.id !== w.id))}
                            className="text-slate-300 hover:text-rose-600 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">{w.metricValue}</div>
                        <p className="text-[10px] text-slate-400 font-semibold italic flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600" /> {w.metricLabel}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => alert('Exporting dashboard telemetry to spreadsheet ledger... File complete: JUMO_UEOS_TELEMETRY.csv')}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Download className="w-4 h-4" /> Export Spreadsheet Registry
                    </button>
                  </div>
                </div>
              )}

              {/* UNIVERSAL DEPARTMENT & ROLE FACTORIES */}
              {activeNavSection === 'dept_role_factory' && (
                <div className="space-y-8">
                  
                  {/* DEPARTMENT FACTORY SECTION */}
                  <div className="bg-white border border-slate-200/80 rounded-xl p-5 space-y-4">
                    <div>
                      <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">Universal Department Factory</h3>
                      <p className="text-[11px] text-slate-500">Generate, organize, or destroy departments. Default templates provide Finance, HR, ICT and legal departments automatically.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5 items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <button
                        onClick={handleAutoGenerateStandardDepts}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shrink-0 transition"
                      >
                        1-Click Auto-Generate Standard Departments
                      </button>
                      <span className="text-slate-400 text-xs font-semibold">Or add custom department:</span>
                      <div className="flex-1 flex gap-2 w-full">
                        <input
                          type="text"
                          value={customDeptInput}
                          onChange={(e) => setCustomDeptInput(e.target.value)}
                          placeholder="e.g. Assay Research, Ward Administration"
                          className="flex-1 p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                        <button
                          onClick={handleAddCustomDept}
                          className="px-4 py-2 bg-[#0F172A] hover:bg-indigo-950 text-white rounded-lg text-xs font-bold transition"
                        >
                          Provision Node
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {currentActiveErp.departments.map((dept, i) => (
                        <div key={i} className="p-3 bg-slate-50 border rounded-xl flex items-center justify-between text-xs font-bold text-slate-800">
                          <span className="truncate">✓ {dept}</span>
                          <button
                            onClick={() => handleDeleteDept(dept)}
                            className="text-slate-300 hover:text-rose-600 p-0.5 rounded transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ROLE FACTORY SECTION */}
                  <div className="bg-white border border-slate-200/80 rounded-xl p-5 space-y-4">
                    <div>
                      <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">Universal Role Factory & AEGIS Controls</h3>
                      <p className="text-[11px] text-slate-500">Assign zero-trust cryptographic permissions grid across default roles instantly.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      
                      {/* Left side list of roles */}
                      <div className="bg-slate-50 rounded-xl border divide-y overflow-hidden text-xs">
                        {currentActiveErp.roles.map((r, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedRoleIndex(i)}
                            className={`w-full px-3 py-2.5 text-left font-bold transition ${
                              selectedRoleIndex === i ? 'bg-[#0F172A] text-white' : 'hover:bg-slate-100 text-slate-700'
                            }`}
                          >
                            {r.name}
                          </button>
                        ))}
                      </div>

                      {/* Right side permissions editor */}
                      <div className="sm:col-span-2 p-4 bg-slate-50 border rounded-xl space-y-4 text-xs font-bold">
                        <div className="border-b pb-2">
                          <h4 className="text-sm font-black text-slate-900">
                            Permissions Grid: <span className="text-indigo-600">{currentActiveErp.roles[selectedRoleIndex]?.name}</span>
                          </h4>
                          <p className="text-[11px] text-slate-400 font-normal mt-0.5">Toggle credentials scopes to adjust AEGIS security shield.</p>
                        </div>

                        <div className="space-y-2.5">
                          {[
                            { key: 'read', label: '1. Standard Read Records Scope', desc: 'Verify lists, read circular bulletins, and run search queries.' },
                            { key: 'write', label: '2. Modify & Write Directory Records', desc: 'Create ledger items, update student files, and scan OCR files.' },
                            { key: 'approve', label: '3. Digital Signature Approval Chain Authority', desc: 'Approve procurement requests and disburse wages.' },
                            { key: 'audit', label: '4. Ring-0 Independent Compliance Auditor', desc: 'Run double-entry checks and view compliance telemetry.' },
                            { key: 'delete', label: '5. Destructive Delete & Wipe Node Credentials', desc: 'Highly protected executive credential scope.' }
                          ].map(perm => {
                            const isChecked = currentActiveErp.roles[selectedRoleIndex]?.permissions[perm.key as keyof RoleProfile['permissions']] || false;
                            return (
                              <div
                                key={perm.key}
                                onClick={() => handleTogglePermission(selectedRoleIndex, perm.key as any)}
                                className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition ${
                                  isChecked ? 'bg-indigo-50/70 border-indigo-200 text-indigo-950' : 'bg-white border-slate-200 text-slate-600 font-normal'
                                }`}
                              >
                                <div className="space-y-0.5">
                                  <span className="font-extrabold text-xs block">{perm.label}</span>
                                  <span className="text-[10px] text-slate-400 font-normal block leading-tight">{perm.desc}</span>
                                </div>
                                <div className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 ${isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 border-slate-300'}`}>
                                  {isChecked && '✓'}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              )}

              {/* FAAP FINANCIAL LEDGER */}
              {activeNavSection === 'faap_ledger' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">FAAP ($0.00 Parity) Double-Entry Ledger</h2>
                    <p className="text-xs text-slate-500">Every operational payment collects 1.5% settlement clearing fee, credited automatically to the JUMO Master Treasury.</p>
                  </div>

                  {/* Posting Ledger Entry Form */}
                  <div className="bg-slate-50 p-4 border rounded-xl space-y-4 text-xs font-bold">
                    <span className="block border-b pb-1.5 text-slate-800">Commit Balanced Ledger Transaction</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="space-y-1">
                        <label className="text-slate-500">Transaction Reference</label>
                        <input
                          type="text"
                          value={faapReference}
                          onChange={(e) => setFaapReference(e.target.value)}
                          placeholder="e.g. TUITION-REG-2026"
                          className="w-full p-2 bg-white border rounded-lg outline-none font-mono focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-500">Debit Ledger Amount ($)</label>
                        <input
                          type="number"
                          value={faapDebit}
                          onChange={(e) => setFaapDebit(parseFloat(e.target.value) || 0)}
                          className="w-full p-2 bg-white border rounded-lg outline-none font-mono focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-500">Credit Ledger Amount ($)</label>
                        <input
                          type="number"
                          value={faapCredit}
                          onChange={(e) => setFaapCredit(parseFloat(e.target.value) || 0)}
                          className="w-full p-2 bg-white border rounded-lg outline-none font-mono focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-500">Parity Integrity Difference</label>
                        <div className={`p-1.5 rounded-lg text-center font-mono font-bold text-sm ${faapDebit - faapCredit === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                          ${((faapDebit ?? 0) - (faapCredit ?? 0)).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end pt-2 border-t">
                      <div className="space-y-1 sm:col-span-3">
                        <label className="text-slate-500 font-bold block">Entry Description</label>
                        <input
                          type="text"
                          value={faapDescription}
                          onChange={(e) => setFaapDescription(e.target.value)}
                          className="w-full p-2 bg-white border rounded-lg outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>
                      <button
                        onClick={handlePostLedger}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                      >
                        Commit Posting
                      </button>
                    </div>
                  </div>

                  {/* Financial Journal Table */}
                  <div className="bg-white border rounded-xl overflow-hidden text-xs">
                    <div className="p-3 bg-slate-50 font-bold text-slate-700 flex justify-between items-center border-b">
                      <span>FAAP Ledger Audit Stream (1.5% Swapped fees)</span>
                      <span className="font-mono text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded text-[10px] font-bold">
                        Double-Entry Integrity Checked
                      </span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-medium">
                        <thead className="bg-slate-50 font-bold border-b text-slate-600 uppercase text-[10px]">
                          <tr>
                            <th className="p-3">ID</th>
                            <th className="p-3">Reference</th>
                            <th className="p-3 text-right">Debit ($)</th>
                            <th className="p-3 text-right">Credit ($)</th>
                            <th className="p-3 text-right">1.5% JUMO Fee ($)</th>
                            <th className="p-3">Timestamp</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Compliance</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y text-slate-700">
                          {ledgerEntries.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 font-mono text-[11px]">
                              <td className="p-3 font-bold text-indigo-600">{item.id}</td>
                              <td className="p-3 font-extrabold text-slate-900">{item.ref}</td>
                              <td className="p-3 text-right text-emerald-600 font-bold">${(item.debit ?? 0).toLocaleString()}</td>
                              <td className="p-3 text-right text-emerald-600 font-bold">${(item.credit ?? 0).toLocaleString()}</td>
                              <td className="p-3 text-right text-amber-600 font-bold">${(item.fee ?? 0).toFixed(2)}</td>
                              <td className="p-3 text-slate-500 font-sans">{item.date}</td>
                              <td className="p-3 font-sans font-semibold text-slate-600 truncate max-w-[200px]">{item.desc}</td>
                              <td className="p-3 font-sans">
                                <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-black rounded uppercase">Verified</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* WORKFLOW FACTORY */}
              {activeNavSection === 'workflow_factory' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Universal Workflow Customizer Factory</h2>
                    <p className="text-xs text-slate-500">Configure visual step-by-step approval pipelines, connect SLA timers, and trigger simulation scripts.</p>
                  </div>

                  {/* Create Workflow Block Form */}
                  <div className="bg-slate-50 p-4 border rounded-xl text-xs font-bold space-y-4">
                    <span className="block border-b pb-1.5 text-slate-800">Generate Custom Approval Pipeline</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-slate-600">Workflow Name</label>
                        <input
                          type="text"
                          value={newWfName}
                          onChange={(e) => setNewWfName(e.target.value)}
                          placeholder="e.g. Asset Procurement Request"
                          className="w-full p-2 bg-white border rounded-lg outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-600">Form / Trigger Name</label>
                        <input
                          type="text"
                          value={newWfTrigger}
                          onChange={(e) => setNewWfTrigger(e.target.value)}
                          placeholder="e.g. Capital Expenditure Requisition"
                          className="w-full p-2 bg-white border rounded-lg outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-600">SLA Processing Timeout (Hours)</label>
                        <input
                          type="number"
                          value={newWfSla}
                          onChange={(e) => setNewWfSla(parseInt(e.target.value) || 24)}
                          className="w-full p-2 bg-white border rounded-lg outline-none font-mono focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 border-t pt-3">
                      <label className="text-slate-500 block">Workflow Verification Steps: (Current: {newWfSteps.join(' → ')})</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newWfStepInput}
                          onChange={(e) => setNewWfStepInput(e.target.value)}
                          placeholder="e.g. Procurement Director, Compliance Board"
                          className="flex-1 p-2 bg-white border rounded-lg outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                        <button
                          onClick={handleAddWfStep}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition"
                        >
                          Add Step Node
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end border-t pt-3">
                      <button
                        onClick={handleAddWorkflow}
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                      >
                        Instantiate Workflow Blueprint
                      </button>
                    </div>
                  </div>

                  {/* Workflows List Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
                    {workflows.map((wf) => (
                      <div key={wf.id} className="p-4 bg-white border rounded-xl space-y-3 shadow-2xs">
                        <div className="flex justify-between items-center border-b pb-1.5">
                          <span className="text-slate-900 font-black">{wf.name}</span>
                          <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded font-mono text-[10px]">
                            SLA: {wf.slaHours} Hours
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 leading-relaxed font-normal">
                          <strong className="text-slate-700 font-bold block mb-1">Trigger: {wf.trigger}</strong>
                          <div className="flex flex-wrap items-center gap-1">
                            {wf.steps.map((st, idx) => (
                              <React.Fragment key={idx}>
                                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                                <span className="px-2 py-1 bg-slate-50 border rounded-md text-slate-800 font-bold">
                                  {st}
                                </span>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t flex justify-end">
                          <button
                            onClick={() => handleSimulateWorkflow(wf)}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition"
                          >
                            <Play className="w-3 h-3 text-amber-300" /> Run Simulated Verification
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Simulated Visual Output Panel */}
                  {simulatedWorkflowId && (
                    <div className="p-4 bg-slate-950 text-slate-200 font-mono text-[11px] rounded-xl border space-y-2.5 animate-in slide-in-from-bottom duration-200">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-2 text-amber-300 font-bold">
                        <span>WORKFLOW SIMULATION TRACE RECORD</span>
                        <span className="text-xs">STATUS: RUNNING</span>
                      </div>
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {simulatedWorkflowLogs.map((log, idx) => (
                          <div key={idx} className="flex gap-2">
                            <span className="text-emerald-400">✓</span>
                            <span>{log}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* RECORDS DMS VAULT */}
              {activeNavSection === 'records_dms' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Records Center & DMS Vault</h2>
                    <p className="text-xs text-slate-500">Scan, validate digital signatures, apply AEGIS encryption, and query database indexes dynamically.</p>
                  </div>

                  <div 
                    onClick={handleMockDocUpload}
                    className="p-8 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl text-center space-y-2 cursor-pointer hover:bg-slate-100/50 transition font-bold"
                  >
                    <Upload className="w-8 h-8 text-indigo-600 mx-auto" />
                    <div className="text-slate-900 font-extrabold text-sm">Drag & drop enterprise documents here</div>
                    <p className="text-[11px] text-slate-400 font-normal">Supports PDF, Encrypted XML, Clinical DICOM scans. OCR parsing is instant.</p>
                    <span className="inline-block px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition mt-2">
                      Simulate Document Scanner
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-bold">
                    <span className="block border-b pb-1.5 text-slate-800">Sealed Database Archives Index</span>
                    {uploadedDocs.map((doc, idx) => (
                      <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-indigo-600 shrink-0" />
                          <div>
                            <div className="text-slate-900 font-extrabold">{doc.name}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{doc.size} • Security profile: {doc.status}</div>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[10px] rounded">
                          {doc.signature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CIRCULAR COMMS HUB */}
              {activeNavSection === 'comms_hub' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Circular Communications & Broadcasting</h2>
                    <p className="text-xs text-slate-500">Disseminate official circular messages, payment reminders, or emergency notices across multi-channels.</p>
                  </div>

                  <div className="bg-slate-50 p-4 border rounded-xl text-xs font-bold space-y-4">
                    <span className="block border-b pb-1.5 text-slate-800">Dispatch Broadcast Notice</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-slate-600">Select Circular Channel</label>
                        <select
                          value={commsChannel}
                          onChange={(e: any) => setCommsChannel(e.target.value)}
                          className="w-full p-2 bg-white border rounded-lg outline-none"
                        >
                          <option value="SMS">Twilio SMS Gateway</option>
                          <option value="Email">SendGrid Corporate Email</option>
                          <option value="Push">App Push Notification</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-600">Cohort Target Audience</label>
                        <select
                          value={commsTarget}
                          onChange={(e) => setCommsTarget(e.target.value)}
                          className="w-full p-2 bg-white border rounded-lg outline-none"
                        >
                          <option value="All Students & Staff">All Students & Staff</option>
                          <option value="Executive Board & Leadership">Executive Board & Leadership</option>
                          <option value="All Financial personnel">All Financial Personnel</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-600">Broadcast Message Body</label>
                      <textarea
                        rows={3}
                        value={commsBody}
                        onChange={(e) => setCommsBody(e.target.value)}
                        placeholder="Enter the official notification announcement here..."
                        className="w-full p-2.5 bg-white border rounded-lg outline-none"
                      />
                    </div>

                    <button
                      onClick={handleSendBroadcast}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition cursor-pointer"
                    >
                      Dispatch Notice
                    </button>
                  </div>

                  <div className="space-y-2 text-xs font-bold">
                    <span className="block border-b pb-1.5 text-slate-800">Dispatched Circular Archives</span>
                    {commsLog.map((log) => (
                      <div key={log.id} className="p-3 bg-white border rounded-xl flex justify-between items-center hover:bg-slate-50 transition">
                        <div className="space-y-0.5">
                          <div className="text-slate-900 font-extrabold">{log.msg}</div>
                          <p className="text-[10px] text-slate-400 font-normal">To: <span className="font-semibold text-slate-600">{log.target}</span> via {log.channel}</p>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 font-normal">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* COGNITIVE AI ASSISTANT */}
              {activeNavSection === 'cognitive_ai' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Cognitive AI Assistant & Semantic Memory</h2>
                    <p className="text-xs text-slate-500">Query balanced transaction ledger assets, circular files, or workflows dynamically using RAG model simulation.</p>
                  </div>

                  <div className="p-4 bg-slate-50 border rounded-xl space-y-4">
                    <div className="bg-white p-3 border rounded-xl h-64 overflow-y-auto max-h-64 space-y-3 text-xs">
                      {aiChatLogs.map((log, i) => (
                        <div key={i} className={`p-2.5 rounded-lg leading-relaxed ${log.sender === 'AI' ? 'bg-indigo-50/50 text-slate-800 border' : 'bg-slate-100 text-slate-950 font-bold'}`}>
                          <strong className="text-indigo-950 block text-[10px] uppercase font-mono tracking-wider">{log.sender === 'AI' ? 'JUMO Cognitive Assistant:' : 'Administrator:'}</strong>
                          {log.text}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 text-xs font-bold">
                      <input
                        type="text"
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                        placeholder="e.g. Audit ledger accounts or verify departments list..."
                        className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-600"
                        onKeyDown={(e) => e.key === 'Enter' && handleSendAiMessage()}
                      />
                      <button
                        onClick={handleSendAiMessage}
                        className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition"
                      >
                        Ask AI
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PORTALS & UI SIMULATOR */}
              {activeNavSection === 'portal_simulator' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Universal Multi-View Portal Experiences</h2>
                    <p className="text-xs text-slate-500">Every installed JUMO ERP generates 5 custom operating portals automatically. Choose a view to simulate in real-time.</p>
                  </div>

                  {/* Portal Selectors */}
                  <div className="flex bg-slate-100 p-1.5 rounded-xl text-xs font-black gap-1">
                    {[
                      { id: 'public', label: 'Public Gateway' },
                      { id: 'leadership', label: 'Leadership Board' },
                      { id: 'staff', label: 'Staff Workspace' },
                      { id: 'member', label: 'Customer Portal' },
                      { id: 'mobile', label: 'Smartphone View' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActivePortalSimulator(tab.id as any)}
                        className={`flex-1 py-1.5 text-center rounded-lg transition ${
                          activePortalSimulator === tab.id ? 'bg-[#0F172A] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Simulated screen area */}
                  <div className="p-6 border rounded-xl bg-slate-50 space-y-4">
                    
                    {activePortalSimulator === 'public' && (
                      <div className="space-y-4 text-xs font-bold text-slate-800">
                        <div className="flex justify-between items-center bg-white p-4 rounded-xl border">
                          <div>
                            <h4 className="text-sm font-extrabold text-slate-950">{currentActiveErp.name}</h4>
                            <p className="text-[11px] text-slate-500 font-normal">Sovereign Public Portal • {currentActiveErp.slogan}</p>
                          </div>
                          <Globe className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="p-3 bg-white border rounded-xl text-center space-y-1">
                            <BookOpen className="w-5 h-5 mx-auto text-indigo-600" />
                            <span>Catalog Services</span>
                            <p className="text-[10px] text-slate-400 font-normal">Accredited services list.</p>
                          </div>
                          <div className="p-3 bg-white border rounded-xl text-center space-y-1">
                            <DollarSign className="w-5 h-5 mx-auto text-emerald-600" />
                            <span>Online Payments</span>
                            <p className="text-[10px] text-slate-400 font-normal">Direct FAAP payment gateway.</p>
                          </div>
                          <div className="p-3 bg-white border rounded-xl text-center space-y-1">
                            <ShieldCheck className="w-5 h-5 mx-auto text-purple-600" />
                            <span>Verify Credentials</span>
                            <p className="text-[10px] text-slate-400 font-normal">SHA-256 certificate search.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activePortalSimulator === 'leadership' && (
                      <div className="space-y-4 text-xs font-bold text-slate-800">
                        <div className="flex justify-between items-center bg-white p-4 rounded-xl border">
                          <div>
                            <h4 className="text-sm font-extrabold text-slate-950">Executive Board Strategic Panel</h4>
                            <p className="text-[11px] text-slate-500 font-normal">CEO, Principal & Dean telemetry oversight dashboard.</p>
                          </div>
                          <Award className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                          <div className="p-3 bg-white border rounded-xl">
                            <div className="text-slate-400 font-bold text-[9px] uppercase">General Ledger Assets</div>
                            <div className="text-sm font-black text-slate-900">$4.8M USD</div>
                          </div>
                          <div className="p-3 bg-white border rounded-xl">
                            <div className="text-slate-400 font-bold text-[9px] uppercase">Active Personnel</div>
                            <div className="text-sm font-black text-slate-900">{currentActiveErp.departments.length} Units</div>
                          </div>
                          <div className="p-3 bg-white border rounded-xl">
                            <div className="text-slate-400 font-bold text-[9px] uppercase">Compliance Seals</div>
                            <div className="text-sm font-black text-emerald-700">100% Sealed</div>
                          </div>
                          <div className="p-3 bg-white border rounded-xl">
                            <div className="text-slate-400 font-bold text-[9px] uppercase">System Latency</div>
                            <div className="text-sm font-black text-indigo-700">Optimal</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activePortalSimulator === 'staff' && (
                      <div className="space-y-4 text-xs font-bold text-slate-800">
                        <div className="flex justify-between items-center bg-white p-4 rounded-xl border">
                          <div>
                            <h4 className="text-sm font-extrabold text-slate-950">Staff Operations Workspace</h4>
                            <p className="text-[11px] text-slate-500 font-normal">Operational queue for administrative approvals and record checks.</p>
                          </div>
                          <Sliders className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="p-3 bg-white border rounded-xl space-y-2">
                          <div className="font-black text-slate-900 border-b pb-1">Assigned Tasks Queue</div>
                          <div className="space-y-1.5 text-[11px] font-normal text-slate-600">
                            <div className="flex justify-between items-center p-1 bg-slate-50 border rounded-lg">
                              <span>Verify tuition documents for student registrar.</span>
                              <span className="text-amber-700 font-bold">Awaiting Check</span>
                            </div>
                            <div className="flex justify-between items-center p-1 bg-slate-50 border rounded-lg">
                              <span>Reconcile hospital radiological purchase transaction reference.</span>
                              <span className="text-emerald-700 font-bold">Approved</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activePortalSimulator === 'member' && (
                      <div className="space-y-4 text-xs font-bold text-slate-800">
                        <div className="flex justify-between items-center bg-white p-4 rounded-xl border">
                          <div>
                            <h4 className="text-sm font-extrabold text-slate-950">Customer / Registered Member Portal</h4>
                            <p className="text-[11px] text-slate-500 font-normal">Personal credentials access for students, patients, or SACCO members.</p>
                          </div>
                          <UserCheck className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-white border rounded-xl space-y-1">
                            <span className="font-extrabold block">My Academic / Medical Files</span>
                            <p className="text-[11px] text-slate-400 font-normal">Access personal transcript or radiological charts securely isolated under AEGIS keys.</p>
                          </div>
                          <div className="p-3 bg-white border rounded-xl space-y-1">
                            <span className="font-extrabold block">My Tuition Fee Statements</span>
                            <p className="text-[11px] text-slate-400 font-normal">Summary of balanced ledger transactions. Reports $0.00 outstanding debts.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activePortalSimulator === 'mobile' && (
                      <div className="flex justify-center">
                        <div className="w-60 border-4 border-slate-900 rounded-[24px] bg-slate-900 overflow-hidden shadow-xl relative text-[10px] text-slate-800 font-sans">
                          {/* Notch */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-slate-900 rounded-b-lg z-10"></div>
                          
                          {/* Screen */}
                          <div className="bg-white min-h-[240px] p-3 pt-5 flex flex-col justify-between">
                            <div className="space-y-2">
                              <div className="flex justify-between border-b pb-1">
                                <span className="font-black text-indigo-900">{currentActiveErp.name}</span>
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                              </div>
                              <div className="p-2 bg-slate-50 rounded-lg border font-bold space-y-0.5">
                                <span className="text-[8px] text-slate-400 block uppercase">MFA Active Session</span>
                                <span className="text-indigo-950">Logged in as {currentActiveErp.adminName}</span>
                              </div>
                              <p className="text-[8px] text-slate-400 leading-tight">All transaction requests routed to FAAP require hardware token verification logs.</p>
                            </div>
                            <div className="text-[8px] text-slate-400 font-mono text-center border-t pt-1">
                              JUMO UEOS v25.0
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              )}

            </>
          )}

        </main>

      </div>

      {/* --- PHASE 2 — UNIVERSAL FOOTER OPTIMIZATION (RULE[AGENTS_md]) --- */}
      <footer className="bg-white border-t border-slate-200/80 px-6 py-3 text-slate-500 text-[10px] font-medium tracking-tight text-center shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>JUMO Universal Enterprise Operating System (UEOS) • Ring-0 Platform Console</span>
          <span className="font-mono">Active Nodes: {provisionedErps.length} • System Status: 100% Optimal • Version 25.0 Stable</span>
        </div>
      </footer>

    </div>
  );
};
