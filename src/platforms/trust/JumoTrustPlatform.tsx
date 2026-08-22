/**
 * JUMO UEOS Roadmap v32.0 — JUMO TRUST Advanced Digital Hybrid Operating Workspace Upgrade
 * Master Institutional Command Platform & Digital Institutional Assurance Operating System
 * 
 * Features:
 * 1. JUMO TRUST Enterprise Workspace Fabric (Executive, Auditor, Financial, Administrative)
 * 2. JUMO TRUST Institutional Digital Control Room (Financial, Admin, Governance Views)
 * 3. JUMO TRUST Evidence Intelligence Engine (Auto Indexing, Authenticity, Timeline, Missing Evidence)
 * 4. JUMO TRUST Digital Audit Mission Center (Financial, Recruitment, Asset, Governance Missions)
 * 5. JUMO TRUST Digital Advisory Office (Actionable Recommendations, Policy, Cost Optimization)
 * 6. JUMO TRUST Institutional Health Score (Financial, Ops, Gov, Digital Health)
 * 7. JUMO TRUST Digital Case Management (Investigation Workflow, Findings, Closure)
 * 8. JUMO TRUST Enterprise Notification Intelligence (Real-time Alerts)
 * 9. JUMO TRUST Institutional Benchmarking Engine (Financial, Governance, Digital Ranks)
 * 10. JUMO TRUST Digital Audit Knowledge Cloud (Standards, Frameworks, Guidelines)
 * 11. JUMO TRUST Role-Based Enterprise Portals (Director, Auditor, Finance, HR, Govt Oversight)
 * 12. JUMO TRUST Universal Configuration Center (Ring-0 Controlled Module & Service Toggles)
 * 13. JUMO TRUST Integration Fabric (Native Connections to ERPs, FAAP, Pay, AEGIS, Cloud)
 * 14. JUMO TRUST Mobile Executive Experience (Mobile-First Operational Access)
 * 15. JUMO TRUST Enterprise Marketplace (Governance, Compliance, Assurance Packs)
 */

import React, { useState } from 'react';
import {
  ShieldCheck, Scale, FileText, CheckCircle2, AlertTriangle, Search, Filter,
  Lock, Users, Building2, Landmark, DollarSign, Activity,
  BarChart3, PieChart, Sparkles, Send, Download, Upload, RefreshCw,
  Sliders, Database, Layers, Globe, UserCheck, Key,
  Clock, FolderLock, FileCheck, ArrowUpRight, ChevronRight, Zap,
  Award, ShieldAlert, Settings, Package, Cpu, BookOpen, AlertCircle, Plus,
  FileSearch, CheckSquare, XCircle, ArrowRight, Eye, ClipboardCheck, Briefcase,
  TrendingUp, HelpCircle, HardDrive, Network, Video, Radio, PhoneCall, Smartphone,
  Check, X, Share2, CornerDownRight, Compass, Shield
} from 'lucide-react';

import {
  TrustModuleDef,
  TrustDepartmentDef,
  TrustAgentDef,
  CCTVLensDef,
  WorkspaceDef,
  TRUST_DEPARTMENTS_20,
  DIGITAL_AUDITOR_WORKFORCE,
  CCTV_LENSES_12,
  TRUST_MODULES_100,
  WORKSPACES_15,
  AuditMissionDef,
  AUDIT_MISSIONS_V32,
  NotificationAlertDef,
  REALTIME_ALERTS_V32,
  CaseManagementDef,
  INVESTIGATION_CASES_V32,
  AdvisoryRecommendationDef,
  ADVISORY_RECOMMENDATIONS_V32,
  HealthScorePillarDef,
  HEALTH_SCORE_PILLARS_V32,
  BenchmarkingMetricDef,
  BENCHMARKING_METRICS_V32,
  KnowledgeArticleDef,
  KNOWLEDGE_CLOUD_V32,
  EnterprisePortalRoleDef,
  PORTALS_V32,
  IntegrationFabricItemDef,
  INTEGRATION_FABRIC_V32,
  MarketplaceExtensionDef,
  MARKETPLACE_EXTENSIONS_V32,
  DIGITAL_AUDITOR_TEAMS_V34,
  DIGITAL_INVESTIGATIONS_V35,
  RECRUITMENT_RECORDS_V36,
  FINANCIAL_INTEGRITY_MODULES_V37,
  DEPT_OPERATIONAL_METRICS_V38,
  SMART_DOC_VAULT_V39,
  GOVERNANCE_RESOLUTIONS_V40,
  RISK_REGISTER_V41,
  COMPLIANCE_PACKAGES_V42,
  FIELD_INSPECTIONS_V43,
  DIGITAL_TWIN_MODELS_V44,
  GLOBAL_TRUST_NETWORK_V45,
  AUTONOMOUS_WORKFLOWS_V46,
  MOBILE_APPS_V47,
  GLOBAL_TRUST_EXCHANGE_V48,
  ECOSYSTEM_MARKETPLACE_V49,
  SOVEREIGN_ARCHITECTURE_V50
} from './trustTypesAndData';

export interface JumoTrustPlatformProps {
  onNavigate?: (route: string) => void;
  currentUser?: { name?: string; role?: string; email?: string };
  sectorTemplate?: 'government' | 'corporate' | 'ngo' | 'church' | 'healthcare' | 'education';
}

export const JumoTrustPlatform: React.FC<JumoTrustPlatformProps> = ({
  onNavigate,
  currentUser = { name: 'Executive Auditor General', role: 'Sovereign Institutional Auditor', email: 'auditor@jumo.ueos' },
  sectorTemplate = 'government'
}) => {
  // Navigation & Primary Tab State (Roadmap v34.0 – v50.0 Master Platform)
  const [activeTab, setActiveTab] = useState<
    | 'hq'
    | 'workspace_fabric'
    | 'control_room'
    | 'evidence_engine'
    | 'mission_center'
    | 'advisory_office'
    | 'health_score'
    | 'case_management'
    | 'notifications'
    | 'benchmarking'
    | 'knowledge_cloud'
    | 'portals'
    | 'config_center'
    | 'integration_fabric'
    | 'mobile_exec'
    | 'marketplace'
    | 'departments'
    | 'surveillance'
    | 'workforce'
    | 'modules_registry'
    | 'v34_auditor_teams'
    | 'v35_investigation'
    | 'v36_recruitment'
    | 'v37_financial'
    | 'v38_operations'
    | 'v39_evidence_vault'
    | 'v40_governance'
    | 'v41_risk'
    | 'v42_compliance'
    | 'v43_inspector'
    | 'v44_digital_twin'
    | 'v45_global_network'
    | 'v46_autonomous_wf'
    | 'v47_mobile_exec'
    | 'v48_trust_exchange'
    | 'v49_ecosystem'
    | 'v50_sovereign'
  >('hq');

  // Sub-view states
  const [workspaceFabricSubView, setWorkspaceFabricSubView] = useState<'executive' | 'auditor' | 'financial' | 'admin'>('executive');
  const [controlRoomSubView, setControlRoomSubView] = useState<'financial' | 'admin' | 'governance'>('financial');
  const [selectedPortalRole, setSelectedPortalRole] = useState<'director' | 'auditor' | 'finance' | 'hr' | 'government'>('director');

  // Interactive Data States
  const [alertsList, setAlertsList] = useState<NotificationAlertDef[]>(REALTIME_ALERTS_V32);
  const [casesList, setCasesList] = useState<CaseManagementDef[]>(INVESTIGATION_CASES_V32);
  const [missionsList, setMissionsList] = useState<AuditMissionDef[]>(AUDIT_MISSIONS_V32);
  const [advisoriesList, setAdvisoriesList] = useState<AdvisoryRecommendationDef[]>(ADVISORY_RECOMMENDATIONS_V32);
  const [marketplaceList, setMarketplaceList] = useState<MarketplaceExtensionDef[]>(MARKETPLACE_EXTENSIONS_V32);
  const [moduleList, setModuleList] = useState<TrustModuleDef[]>(TRUST_MODULES_100);

  // Master JUMO TRUST Configuration State (10 areas)
  const [trustConfig, setTrustConfig] = useState(() => {
    const saved = localStorage.getItem('jumo_trust_master_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse trust config', e);
      }
    }
    return {
      // 1. Trust Engine Controls
      enableJumoTrust: true,
      suspendTrustServices: false,
      trustMode: 'Advanced',
      trustPolicyManagement: 'Strict segregation of duties, multi-stage digital signature verification, and immutable double-entry ledger audits are active by default.',
      trustUpdateManager: 'Automatic',
      trustLicensing: 'Sovereign',
      trustBilling: 'Tokenized',
      trustVersionControl: 'v50.2.1',

      // 2. Digital Audit Controls
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

      // 3. Digital Auditor Team Configuration
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

      // 4. Financial Vision
      faapReconciliationRules: 'Strict $0.00 Parity',
      doubleEntryParityEnforcement: true,
      revenueLeakageTolerances: 0.05,
      spendingVelocityThresholds: 10000,
      pettyCashFloatAuditingCaps: 500,

      // 5. Administrative Vision
      biometricAttendanceVerificationTolerances: 10,
      recruitmentMeritVerificationScoreThresholds: 85,
      appraisalObjectivityControlFlags: true,
      ghostRoleScanningSensitivity: 'Aggressive Fraud Radar',

      // 6. Risk Intelligence
      riskScoringWeights: 'Financial-heavy',
      predictiveFraudRiskPredictorParameters: 'Deep Neural Simulation',
      businessContinuityBackupValidationRules: 'Hourly check',
      strategicRoadmapAlignmentThresholds: 90,

      // 7. Executive Reporting
      executiveMorningBriefingGenerationRules: 'AI-Synthesized Summary',
      boardPackageAssemblyDeadlines: '7 days prior',
      committeeQuorumVerificationParameters: 'Two-thirds majority (>66%)',
      actionItemEscalationSchedules: 'Immediate escalations',

      // 8. Evidence Management
      wormCryptographicVaultRetentionRules: '7 Years (Regulatory)',
      pkiSignatureValidationModes: 'Strict PKI & Hardware',
      physicalReceiptOcrCompletenessThresholds: 95,
      readOnlyLogsVerificationFrequency: 'Continuous',

      // 9. External Reporting
      publicSectorTransparencyDisclosureLevels: 'Redacted summarized public',
      statutoryRegulatoryComplianceSchedulers: 'Quarterly reports',
      donorGrantComplianceChecklistRules: 'USAID/EU standard rules',
      courtGradeForensicReferralPackages: true,

      // 10. Ring-0 Owner Controls
      masterAuditOverrideAccessToggles: false,
      zeroTrustSessionFirewallLimits: 15,
      multiTenantRowLevelSeparationEnforcements: true,
      administrativeMfaWallActivationToggles: true,
    };
  });

  const [activeConfigTab, setActiveConfigTab] = useState<string>('engine');
  const [configSuccessMsg, setConfigSuccessMsg] = useState<string | null>(null);

  const handleSaveTrustConfig = (newConfig = trustConfig) => {
    localStorage.setItem('jumo_trust_master_config', JSON.stringify(newConfig));
    setTrustConfig(newConfig);
    setConfigSuccessMsg('✓ All master JUMO TRUST configurations securely written to active Ring-0 state store.');
    setTimeout(() => setConfigSuccessMsg(null), 4000);
  };

  // New Case Modal Form State
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [newCaseTitle, setNewCaseTitle] = useState('');
  const [newCaseCategory, setNewCaseCategory] = useState<CaseManagementDef['category']>('Financial Irregularity');
  const [newCasePriority, setNewCasePriority] = useState<'HIGH' | 'CRITICAL' | 'MEDIUM'>('HIGH');

  // Module Registry Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Simulation & Scan State
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState(100);
  const [ocrScanning, setOcrScanning] = useState(false);
  const [ocrResult, setOcrResult] = useState<string | null>(null);

  // Actions & Handlers
  const handleRunFullAudit = () => {
    setIsAuditing(true);
    setAuditProgress(10);

    const interval = setInterval(() => {
      setAuditProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAuditing(false);
          return 100;
        }
        return prev + 25;
      });
    }, 350);
  };

  const handleScanPhysicalFile = () => {
    setOcrScanning(true);
    setOcrResult(null);

    setTimeout(() => {
      setOcrScanning(false);
      setOcrResult('EVIDENCE VERIFIED: 5/5 Required Documents Present (Requisition, Approval, Invoice, Receipt, Delivery Proof). Cryptographic Signature Authenticated.');
    }, 1200);
  };

  const handleResolveAlert = (id: string) => {
    setAlertsList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, resolved: true } : a))
    );
  };

  const handleRunMissionSweep = (missionId: string) => {
    setMissionsList((prev) =>
      prev.map((m) =>
        m.id === missionId
          ? {
              ...m,
              status: 'ACTIVE_SWEEP',
              checksCompleted: m.checksCompleted + 150,
              lastRun: 'Just now'
            }
          : m
      )
    );

    setTimeout(() => {
      setMissionsList((prev) =>
        prev.map((m) =>
          m.id === missionId ? { ...m, status: 'CONTINUOUS_LIVE' } : m
        )
      );
    }, 1500);
  };

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaseTitle.trim()) return;

    const newCase: CaseManagementDef = {
      id: `case-${Date.now()}`,
      caseNumber: `JUMO-INV-2026-00${casesList.length + 1}`,
      title: newCaseTitle,
      category: newCaseCategory,
      status: 'REGISTERED',
      leadInvestigator: currentUser?.name || 'JUMO Forensic Investigator',
      priority: newCasePriority,
      evidenceItemsCount: 1,
      dateOpened: new Date().toISOString().split('T')[0],
      findingsSummary: 'New investigation case registered. Evidence collection and preliminary review initiated.',
      recommendations: ['Gather read-only audit log evidence from FAAP and ERP.', 'Assign forensic specialist to conduct interview.']
    };

    setCasesList([newCase, ...casesList]);
    setNewCaseTitle('');
    setIsCaseModalOpen(false);
  };

  const handleInstallExtension = (extId: string) => {
    setMarketplaceList((prev) =>
      prev.map((item) => (item.id === extId ? { ...item, status: 'INSTALLED' } : item))
    );
  };

  const toggleModuleStatus = (id: number) => {
    setModuleList((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
    );
  };

  // Filter Modules
  const filteredModules = moduleList.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || m.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans antialiased">
      
      {/* UNIVERSAL COMPACT PLATFORM HEADER */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-4 py-2 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center shadow-md">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase font-mono">
                JUMO TRUST v50.0
              </span>
              <span className="text-[9px] bg-amber-950 text-amber-300 border border-amber-700/60 px-2 py-0.5 rounded-full font-mono font-bold">
                SOVEREIGN INSTITUTIONAL TRUST PLATFORM
              </span>
            </div>
            <h1 className="text-xs font-extrabold text-white flex items-center gap-2">
              <span>Universal Digital Institutional Assurance & Governance System</span>
              <span className="text-[10px] font-mono text-slate-400">({sectorTemplate.toUpperCase()} SECTOR)</span>
            </h1>
          </div>
        </div>

        {/* Global Action & Context Bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRunFullAudit}
            disabled={isAuditing}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs font-mono flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
            <span>{isAuditing ? `Continuous Sweep ${auditProgress}%` : 'Run Continuous Audit Scan'}</span>
          </button>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono">
            <span className="text-slate-400">FAAP PARITY:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> $0.00 OFFSET
            </span>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-amber-400">
              EA
            </div>
            <div className="hidden xl:block text-right text-[11px]">
              <div className="font-bold text-slate-200">{currentUser?.name || 'Administrator'}</div>
              <div className="text-[9px] text-amber-400 font-mono">{currentUser?.role || 'INVESTIGATOR'}</div>
            </div>
          </div>
        </div>
      </header>

      {/* ROADMAP SECONDARY NAVIGATION BAR */}
      <nav className="bg-white border-b border-slate-200 px-4 py-1.5 flex items-center justify-between gap-1 overflow-x-auto text-xs font-bold text-slate-700 shadow-2xs">
        <div className="flex items-center gap-1">
          {[
            { id: 'hq', label: 'Executive Command', icon: Landmark },
            { id: 'v50_sovereign', label: 'v50.0 Sovereign Architecture', icon: Landmark, badge: 'FINAL ARCH' },
            { id: 'v34_auditor_teams', label: 'v34.0 Auditor Teams', icon: Cpu, badge: '8 TEAMS' },
            { id: 'v35_investigation', label: 'v35.0 Investigation Platform', icon: Briefcase, badge: 'FORENSICS' },
            { id: 'v36_recruitment', label: 'v36.0 Recruitment Integrity', icon: UserCheck, badge: 'VERIFIED' },
            { id: 'v37_financial', label: 'v37.0 FAAP Financial Integrity', icon: DollarSign, badge: 'FAAP LINK' },
            { id: 'v38_operations', label: 'v38.0 Operational Intelligence', icon: Activity, badge: 'SLAs' },
            { id: 'v39_evidence_vault', label: 'v39.0 Smart Document Vault', icon: FileCheck, badge: 'WORM/PKI' },
            { id: 'v40_governance', label: 'v40.0 Governance Platform', icon: Scale, badge: 'ETHICS' },
            { id: 'v41_risk', label: 'v41.0 Risk Intelligence', icon: AlertCircle, badge: 'HEATMAP' },
            { id: 'v42_compliance', label: 'v42.0 Compliance Marketplace', icon: Package, badge: 'SECTORS' },
            { id: 'v43_inspector', label: 'v43.0 Digital Inspector', icon: ClipboardCheck, badge: 'INSPECTIONS' },
            { id: 'v44_digital_twin', label: 'v44.0 Institutional Digital Twin', icon: Layers, badge: 'SIMULATION' },
            { id: 'v45_global_network', label: 'v45.0 Global Trust Network', icon: Globe, badge: 'BENCHMARK' },
            { id: 'v46_autonomous_wf', label: 'v46.0 Autonomous Workflows', icon: Zap, badge: 'AUTO-APPROVE' },
            { id: 'v47_mobile_exec', label: 'v47.0 Mobile Apps', icon: Smartphone, badge: 'FIELD/EXEC' },
            { id: 'v48_trust_exchange', label: 'v48.0 Trust Exchange', icon: Award, badge: 'SOVEREIGN' },
            { id: 'v49_ecosystem', label: 'v49.0 Ecosystem Marketplace', icon: Network, badge: 'PACKAGES' },
            { id: 'workspace_fabric', label: 'Workspace Fabric', icon: Layers, badge: '4 WORKSPACES' },
            { id: 'control_room', label: 'Control Room', icon: Activity, badge: 'LIVE' },
            { id: 'evidence_engine', label: 'Evidence Engine', icon: FileSearch, badge: 'OCR/PKI' },
            { id: 'mission_center', label: 'Audit Mission Center', icon: Compass, badge: '5 MISSIONS' },
            { id: 'advisory_office', label: 'Digital Advisory Office', icon: Zap, badge: 'ADVISORY' },
            { id: 'health_score', label: 'Institutional Health', icon: Shield, badge: '98.9 IHI' },
            { id: 'case_management', label: 'Case Management', icon: Briefcase, badge: `${casesList.length} CASES` },
            { id: 'notifications', label: 'Alert Intelligence', icon: AlertTriangle, badge: `${alertsList.filter(a => !a.resolved).length} UNRESOLVED` },
            { id: 'benchmarking', label: 'Benchmarking Engine', icon: BarChart3, badge: 'TOP 1%' },
            { id: 'knowledge_cloud', label: 'Knowledge Cloud', icon: BookOpen, badge: '500+ LAWS' },
            { id: 'portals', label: 'Role-Based Portals', icon: Users, badge: '5 PORTALS' },
            { id: 'config_center', label: 'Universal Configuration', icon: Lock, badge: 'RING-0' },
            { id: 'integration_fabric', label: 'Integration Fabric', icon: Network, badge: '7 FABRICS' },
            { id: 'marketplace', label: 'Enterprise Marketplace', icon: Package, badge: 'PACKAGES' },
            { id: 'departments', label: '20 Departments', icon: Building2 },
            { id: 'surveillance', label: '12 CCTV Lenses', icon: Video },
            { id: 'workforce', label: '8 Auditor Agents', icon: Cpu },
            { id: 'modules_registry', label: '100+ Modules', icon: Package }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap text-xs font-medium ${
                  isActive
                    ? 'bg-slate-900 text-amber-400 font-bold shadow-2xs'
                    : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-amber-950 text-amber-300 border border-amber-700/60' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* MAIN WORKSPACE AREA */}
      <main className="flex-1 p-4 md:p-6 max-w-[1800px] w-full mx-auto space-y-6">

        {/* ========================================== */}
        {/* VIEW 1: EXECUTIVE COMMAND HQ             */}
        {/* ========================================== */}
        {activeTab === 'hq' && (
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/40">
                    ROADMAP v32.0 — EXECUTIVE COMMAND PLATFORM
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/40">
                    READ-ONLY ISOLATION ACTIVE
                  </span>
                </div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Landmark className="w-6 h-6 text-amber-400" />
                  <span>JUMO TRUST Institutional Assurance Operating Platform</span>
                </h2>
                <p className="text-xs text-slate-300 max-w-4xl leading-relaxed">
                  Enterprise operating workspace providing continuous digital assurance across board governance, financial integrity, administrative workflows, and regulatory compliance.
                </p>
              </div>

              <div className="flex flex-col items-end gap-2 bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-right">
                <span className="text-[10px] font-mono text-slate-400">INSTITUTIONAL HEALTH INDEX (IHI)</span>
                <span className="text-3xl font-black text-amber-400 font-mono">98.9 / 100</span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">SOVEREIGN GRADE A+</span>
              </div>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div onClick={() => setActiveTab('workspace_fabric')} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-amber-400 cursor-pointer transition-all space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="font-bold text-slate-900">Workspace Fabric</span>
                  <Layers className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-lg font-black text-slate-900">4 Core Workspaces</div>
                <p className="text-[11px] text-slate-500">Executive, Auditor Ops, Financial Assurance, Admin Intelligence.</p>
                <div className="pt-2 border-t border-slate-100 font-mono text-[10px] text-emerald-700 font-bold">100% Operational</div>
              </div>

              <div onClick={() => setActiveTab('control_room')} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-amber-400 cursor-pointer transition-all space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="font-bold text-slate-900">Digital Control Room</span>
                  <Activity className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-lg font-black text-slate-900">Live Control Center</div>
                <p className="text-[11px] text-slate-500">Real-time Financial, Administrative & Governance operational views.</p>
                <div className="pt-2 border-t border-slate-100 font-mono text-[10px] text-blue-700 font-bold">Live Stream Active</div>
              </div>

              <div onClick={() => setActiveTab('mission_center')} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-amber-400 cursor-pointer transition-all space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="font-bold text-slate-900">Audit Missions</span>
                  <Compass className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-lg font-black text-slate-900">5 Continuous Missions</div>
                <p className="text-[11px] text-slate-500">Financial, Recruitment, Asset Protection, Governance, Grant Sweeps.</p>
                <div className="pt-2 border-t border-slate-100 font-mono text-[10px] text-purple-700 font-bold">27,170 Checks Swept</div>
              </div>

              <div onClick={() => setActiveTab('case_management')} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-amber-400 cursor-pointer transition-all space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="font-bold text-slate-900">Case Management</span>
                  <Briefcase className="w-4 h-4 text-red-600" />
                </div>
                <div className="text-lg font-black text-slate-900">{casesList.length} Active Cases</div>
                <p className="text-[11px] text-slate-500">Forensic inquiries, investigation workflow & findings tracking.</p>
                <div className="pt-2 border-t border-slate-100 font-mono text-[10px] text-red-700 font-bold">1 Board Review Pending</div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 2: ENTERPRISE WORKSPACE FABRIC        */}
        {/* ========================================== */}
        {activeTab === 'workspace_fabric' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-amber-600" />
                    <span>JUMO TRUST Enterprise Workspace Fabric</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Dedicated institutional operating workspaces tailored for leadership, digital audit teams, financial controllers, and operational heads.
                  </p>
                </div>
                <span className="px-3 py-1 bg-slate-900 text-amber-300 font-mono font-bold text-xs rounded-xl">
                  4 FABRIC WORKSPACES
                </span>
              </div>

              {/* Sub-view switcher */}
              <div className="flex items-center gap-2 border-t border-slate-100 pt-3 text-xs font-bold">
                {[
                  { id: 'executive', label: 'Executive Command Workspace', icon: Landmark, desc: 'For Directors, CEOs, Boards & Govt Leadership' },
                  { id: 'auditor', label: 'Auditor Operations Workspace', icon: Search, desc: 'For Digital Audit Teams & Forensic Auditors' },
                  { id: 'financial', label: 'Financial Assurance Workspace', icon: DollarSign, desc: 'FAAP Connected: Revenue, Expenses, Petty Cash' },
                  { id: 'admin', label: 'Administrative Intelligence Workspace', icon: Activity, desc: 'Department Activities, Workflows & SLA Checks' }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSel = workspaceFabricSubView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setWorkspaceFabricSubView(item.id as any)}
                      className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                        isSel
                          ? 'bg-slate-900 text-amber-400 font-black shadow-sm'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sub-view Content */}
            {workspaceFabricSubView === 'executive' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6 text-xs">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-slate-900 text-sm">Executive Command Workspace (Directors / CEOs / Boards)</h3>
                  <p className="text-slate-500 text-xs">High-level institutional health, risk intelligence, compliance position, and decision support.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Institutional Health Score</span>
                    <div className="text-3xl font-black text-amber-600 font-mono">98.9 / 100</div>
                    <p className="text-slate-500 text-[11px]">Sovereign Grade A+ rating across all 4 operational health pillars.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Risk Intelligence Posture</span>
                    <div className="text-2xl font-black text-emerald-700">LOW EXPOSURE</div>
                    <p className="text-slate-500 text-[11px]">Predictive Fraud Indicator: 0 critical vulnerabilities flagged.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Pending Pre-Decision Sign-Offs</span>
                    <div className="text-2xl font-black text-blue-700">2 Packages</div>
                    <p className="text-slate-500 text-[11px]">Capital infrastructure tender & IT software consolidation package.</p>
                  </div>
                </div>
              </div>
            )}

            {workspaceFabricSubView === 'auditor' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6 text-xs">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-slate-900 text-sm">Auditor Operations Workspace (Digital Audit Teams)</h3>
                  <p className="text-slate-500 text-xs">Active audit assignments, evidence review, findings management, and investigation tracking.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <span className="font-extrabold text-slate-900">Active Audit Assignments</span>
                    <div className="space-y-2">
                      <div className="p-2 bg-white rounded-xl border border-slate-200 flex justify-between font-mono text-[11px]">
                        <span>Q3 FAAP Ledger Parity Audit</span>
                        <span className="text-emerald-700 font-bold">98% COMPLETE</span>
                      </div>
                      <div className="p-2 bg-white rounded-xl border border-slate-200 flex justify-between font-mono text-[11px]">
                        <span>Regional Petty Cash Float Verification</span>
                        <span className="text-amber-700 font-bold">AUDITING</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <span className="font-extrabold text-slate-900">Findings & Follow-up Tracker</span>
                    <div className="space-y-2">
                      <div className="p-2 bg-white rounded-xl border border-slate-200 flex justify-between font-mono text-[11px]">
                        <span>94 Resolved Recommendations</span>
                        <span className="text-blue-700 font-bold">CLOSED</span>
                      </div>
                      <div className="p-2 bg-white rounded-xl border border-slate-200 flex justify-between font-mono text-[11px]">
                        <span>2 Pending Management Actions</span>
                        <span className="text-amber-700 font-bold">IN PROGRESS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {workspaceFabricSubView === 'financial' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6 text-xs">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-slate-900 text-sm">Financial Assurance Workspace (Connected to FAAP)</h3>
                  <p className="text-slate-500 text-xs">Revenue monitoring, expenditure assurance, petty cash floats, budget control, and anomaly detection.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
                    <span className="text-[10px] font-mono text-emerald-800 font-bold">FAAP LEDGER PARITY</span>
                    <div className="text-xl font-black text-emerald-900 font-mono">$0.00 OFFSET</div>
                    <span className="text-[10px] text-emerald-700">Zero imbalance across accounts.</span>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 font-bold">PETTY CASH ASSURANCE</span>
                    <div className="text-xl font-black text-slate-900 font-mono">$10,000 VERIFIED</div>
                    <span className="text-[10px] text-slate-500">Receipts matched via OCR.</span>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 font-bold">PAYROLL ASSURANCE</span>
                    <div className="text-xl font-black text-slate-900 font-mono">1,420 STAFF PASSED</div>
                    <span className="text-[10px] text-slate-500">0 ghost worker roles detected.</span>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 font-bold">REVENUE LEAKAGE RADAR</span>
                    <div className="text-xl font-black text-emerald-700 font-mono">$0 LEAKAGE</div>
                    <span className="text-[10px] text-slate-500">100% tuition collection match.</span>
                  </div>
                </div>
              </div>
            )}

            {workspaceFabricSubView === 'admin' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6 text-xs">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-slate-900 text-sm">Administrative Intelligence Workspace</h3>
                  <p className="text-slate-500 text-xs">Monitors department activities, workflow SLA turnaround, approval chains, and document movement.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Approval SLA Speed</span>
                    <div className="text-2xl font-black text-slate-900 font-mono">3.4 Hours Avg</div>
                    <p className="text-slate-500 text-[11px]">Executive approval turnaround velocity exceeds institutional SLA target (24h).</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Biometric Attendance Log</span>
                    <div className="text-2xl font-black text-emerald-700 font-mono">99.1% Sync</div>
                    <p className="text-slate-500 text-[11px]">Cross-referenced door access, biometric clock-in, and payroll timecards.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Document Movement SLA</span>
                    <div className="text-2xl font-black text-blue-700 font-mono">0 Delays</div>
                    <p className="text-slate-500 text-[11px]">Zero stuck or delayed files detected across approval queues.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 3: INSTITUTIONAL DIGITAL CONTROL ROOM */}
        {/* ========================================== */}
        {activeTab === 'control_room' && (
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/40 flex items-center gap-1.5 w-max">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE OPERATIONAL CONTROL ROOM
                  </span>
                  <h2 className="text-lg font-black text-white mt-1">JUMO TRUST Institutional Digital Control Room</h2>
                  <p className="text-xs text-slate-300">Live streaming operational intelligence center for financial, administrative, and governance operations.</p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <button
                    onClick={() => setControlRoomSubView('financial')}
                    className={`px-3 py-1.5 rounded-xl transition-all ${controlRoomSubView === 'financial' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300'}`}
                  >
                    Financial Ops View
                  </button>
                  <button
                    onClick={() => setControlRoomSubView('admin')}
                    className={`px-3 py-1.5 rounded-xl transition-all ${controlRoomSubView === 'admin' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300'}`}
                  >
                    Admin Ops View
                  </button>
                  <button
                    onClick={() => setControlRoomSubView('governance')}
                    className={`px-3 py-1.5 rounded-xl transition-all ${controlRoomSubView === 'governance' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300'}`}
                  >
                    Governance View
                  </button>
                </div>
              </div>
            </div>

            {controlRoomSubView === 'financial' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="font-bold text-slate-900">Revenue Status & Collections</span>
                  <div className="text-2xl font-black text-emerald-700 font-mono">$12,450,000 Inflow</div>
                  <p className="text-slate-500 text-[11px]">Real-time match between point-of-sale feeds and bank credit notifications.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="font-bold text-slate-900">Expense Activity & Vouchers</span>
                  <div className="text-2xl font-black text-slate-900 font-mono">$8,210,000 Outflow</div>
                  <p className="text-slate-500 text-[11px]">100% voucher DOA threshold verification passed.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="font-bold text-slate-900">Budget Utilization Rate</span>
                  <div className="text-2xl font-black text-blue-700 font-mono">68.2% Utilized</div>
                  <p className="text-slate-500 text-[11px]">Zero unauthorized budget virement or over-expenditure detected.</p>
                </div>
              </div>
            )}

            {controlRoomSubView === 'admin' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="font-bold text-slate-900">Department Workloads</span>
                  <div className="text-2xl font-black text-slate-900 font-mono">20 / 20 Dept Active</div>
                  <p className="text-slate-500 text-[11px]">Balanced span-of-control across all administrative units.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="font-bold text-slate-900">Workflow Approval Queues</span>
                  <div className="text-2xl font-black text-emerald-700 font-mono">14 Items Pending</div>
                  <p className="text-slate-500 text-[11px]">Zero approvals exceeding the 24-hour SLA limit.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="font-bold text-slate-900">Service Performance SLA</span>
                  <div className="text-2xl font-black text-purple-700 font-mono">98.4% Score</div>
                  <p className="text-slate-500 text-[11px]">Public & internal institutional service requests fulfilled on time.</p>
                </div>
              </div>
            )}

            {controlRoomSubView === 'governance' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="font-bold text-slate-900">Policy Compliance Position</span>
                  <div className="text-2xl font-black text-emerald-700 font-mono">99.4% Compliant</div>
                  <p className="text-slate-500 text-[11px]">Statutory regulatory filings and internal policy attestations up to date.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="font-bold text-slate-900">Board Actions & Resolutions</span>
                  <div className="text-2xl font-black text-slate-900 font-mono">12 Enacted</div>
                  <p className="text-slate-500 text-[11px]">100% board resolutions signed via PKI and tracked through enactment.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="font-bold text-slate-900">Risk Exposure Heatmap</span>
                  <div className="text-2xl font-black text-blue-700 font-mono">Low Exposure</div>
                  <p className="text-slate-500 text-[11px]">Predictive Risk Indicator confirms low operational risk level.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 4: EVIDENCE INTELLIGENCE ENGINE        */}
        {/* ========================================== */}
        {activeTab === 'evidence_engine' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <FileSearch className="w-5 h-5 text-emerald-600" />
                    <span>JUMO TRUST Evidence Intelligence Engine</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Upgrades evidence management into an intelligent, cryptographically sealed verification system.
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-mono font-bold text-xs rounded-xl">
                  WORM VAULT ACTIVE
                </span>
              </div>

              {/* 6 Core Capabilities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <FileSearch className="w-4 h-4 text-emerald-600" />
                    <span>1. Automatic Document Indexing</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">OCR metadata extraction tags document date, vendor PIN, amount, and approver.</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>2. Document Authenticity Checks</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">Validates PKI cryptographic signatures and matches SHA-256 hashes against original upload.</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Network className="w-4 h-4 text-purple-600" />
                    <span>3. Relationship Mapping</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">Cross-links suppliers, board members, employees, and payment vouchers into a visual graph.</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <DollarSign className="w-4 h-4 text-amber-600" />
                    <span>4. Transaction-to-Document Linking</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">Directly attaches bank credit/debit transaction IDs to verified receipt & contract scans.</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Clock className="w-4 h-4 text-rose-600" />
                    <span>5. Timeline Reconstruction</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">Builds precise millisecond-by-millisecond audit trail of approvals and file edits.</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>6. Missing Evidence Detection</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">Flags incomplete voucher packages missing 1 of the 5 mandatory audit attachments.</p>
                </div>
              </div>

              {/* Physical Scan Trigger */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-extrabold text-sm">Scan Paper Document or Receipt (OCR Verifier)</h4>
                  <p className="text-xs text-slate-300">Extracts metadata, checks 5-point completeness, and seals cryptographic hash.</p>
                </div>
                <button
                  onClick={handleScanPhysicalFile}
                  disabled={ocrScanning}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl font-mono flex items-center gap-2 disabled:opacity-50"
                >
                  <FileSearch className="w-4 h-4" />
                  <span>{ocrScanning ? 'Scanning Paper File...' : 'Trigger Paper OCR Scan'}</span>
                </button>
              </div>

              {ocrResult && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-mono rounded-xl">
                  {ocrResult}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 5: DIGITAL AUDIT MISSION CENTER       */}
        {/* ========================================== */}
        {activeTab === 'mission_center' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-purple-600" />
                  <span>JUMO TRUST Digital Audit Mission Center</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Replaces static periodic audits with continuous, automated institutional audit missions.
                </p>
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-900 font-mono font-bold text-xs rounded-xl">
                5 ACTIVE MISSIONS
              </span>
            </div>

            {/* Missions List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {missionsList.map((m) => (
                <div key={m.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-mono text-[10px] font-bold">
                        {m.category.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {m.status}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-sm">{m.name}</h3>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{m.description}</p>

                    <div className="space-y-1 pt-2">
                      <span className="font-bold text-[10px] text-slate-700 uppercase font-mono block">Sub-Checks Executed:</span>
                      <div className="flex flex-wrap gap-1">
                        {m.subChecks.map((sc, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-mono">
                            ✓ {sc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-slate-500">Swept: {m.checksCompleted} Checks ({m.anomaliesDetected} Anomalies)</span>
                    <button
                      onClick={() => handleRunMissionSweep(m.id)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-xl transition-all flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Run Mission Sweep</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 6: DIGITAL ADVISORY OFFICE           */}
        {/* ========================================== */}
        {activeTab === 'advisory_office' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-600" />
                  <span>JUMO TRUST Digital Advisory Office</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Transforms audit findings into actionable strategic improvement recommendations, cost optimizations, and governance plans.
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-900 font-mono font-bold text-xs rounded-xl">
                3 ACTIONABLE ADVISORIES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {advisoriesList.map((adv) => (
                <div key={adv.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 font-mono text-[10px] font-bold">
                        {adv.type}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {adv.status}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-sm">{adv.title}</h3>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{adv.summary}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-1 font-mono text-[10px]">
                    <div className="flex justify-between text-slate-500">
                      <span>Est. Impact / Savings:</span>
                      <span className="font-bold text-emerald-700">{adv.estimatedSavings}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Department:</span>
                      <span className="font-bold text-slate-800">{adv.department}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 7: INSTITUTIONAL HEALTH SCORE         */}
        {/* ========================================== */}
        {activeTab === 'health_score' && (
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/40">
                  UNIVERSAL RATING SYSTEM
                </span>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Shield className="w-6 h-6 text-amber-400" />
                  <span>JUMO TRUST Institutional Health Score (IHI)</span>
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                  Universal rating system quantifying institutional strength across Financial, Operational, Governance, and Digital health pillars.
                </p>
              </div>

              <div className="flex flex-col items-end gap-1 bg-slate-800 p-4 rounded-2xl border border-slate-700 text-right">
                <span className="text-[10px] font-mono text-slate-400">OVERALL INSTITUTIONAL SCORE</span>
                <span className="text-3xl font-black text-amber-400 font-mono">98.9 / 100</span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">SOVEREIGN GRADE A+</span>
              </div>
            </div>

            {/* 4 Health Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {HEALTH_SCORE_PILLARS_V32.map((p) => (
                <div key={p.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="font-extrabold text-slate-900">{p.pillar}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold">
                      Grade {p.grade} ({p.score})
                    </span>
                  </div>

                  <div className="space-y-2">
                    {p.keyMetrics.map((km, i) => (
                      <div key={i} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                        <span className="text-slate-600 text-[11px]">{km.label}</span>
                        <span className="font-bold font-mono text-emerald-700 text-[11px]">{km.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${p.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 8: DIGITAL CASE MANAGEMENT            */}
        {/* ========================================== */}
        {activeTab === 'case_management' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-red-600" />
                  <span>JUMO TRUST Digital Case Management (Forensic Inquiries)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Enterprise investigation environment for logging inquiries, collecting evidence, conducting review boards, and issuing findings.
                </p>
              </div>

              <button
                onClick={() => setIsCaseModalOpen(true)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl flex items-center gap-1.5 font-mono shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Register New Inquiry Case</span>
              </button>
            </div>

            {/* Case List */}
            <div className="space-y-4 text-xs">
              {casesList.map((c) => (
                <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-slate-900 text-amber-400 font-mono text-[10px] font-bold">
                        {c.caseNumber}
                      </span>
                      <span className="px-2.5 py-0.5 rounded bg-red-100 text-red-900 font-mono text-[10px] font-bold">
                        PRIORITY: {c.priority}
                      </span>
                      <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                        {c.category}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 w-max">
                      STATUS: {c.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm">{c.title}</h3>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{c.findingsSummary}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <span className="font-bold text-[10px] text-slate-700 uppercase font-mono block">Recommendations / Action Steps:</span>
                    <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-0.5">
                      {c.recommendations.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-between text-[10px] font-mono text-slate-500">
                    <span>Opened: {c.dateOpened} | Lead: {c.leadInvestigator}</span>
                    <span>Evidence Items Attached: {c.evidenceItemsCount}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* New Case Registration Modal */}
            {isCaseModalOpen && (
              <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-red-600" />
                      <span>Register New Forensic Case</span>
                    </h3>
                    <button onClick={() => setIsCaseModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateCase} className="space-y-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 text-[11px]">Inquiry Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Unreconciled Supplier Invoice Inquiry..."
                        value={newCaseTitle}
                        onChange={(e) => setNewCaseTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-hidden focus:ring-2 focus:ring-amber-500 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 text-[11px]">Category</label>
                      <select
                        value={newCaseCategory}
                        onChange={(e) => setNewCaseCategory(e.target.value as any)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-hidden focus:ring-2 focus:ring-amber-500 text-xs"
                      >
                        <option value="Financial Irregularity">Financial Irregularity</option>
                        <option value="Procurement Deviation">Procurement Deviation</option>
                        <option value="Recruitment Inquiry">Recruitment Inquiry</option>
                        <option value="Asset Misappropriation">Asset Misappropriation</option>
                        <option value="Governance Breach">Governance Breach</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 text-[11px]">Priority</label>
                      <select
                        value={newCasePriority}
                        onChange={(e) => setNewCasePriority(e.target.value as any)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-hidden focus:ring-2 focus:ring-amber-500 text-xs"
                      >
                        <option value="HIGH">HIGH</option>
                        <option value="CRITICAL">CRITICAL</option>
                        <option value="MEDIUM">MEDIUM</option>
                      </select>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsCaseModalOpen(false)}
                        className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-slate-900 text-amber-400 font-bold rounded-xl"
                      >
                        Create Case
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 9: NOTIFICATION INTELLIGENCE           */}
        {/* ========================================== */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>JUMO TRUST Enterprise Notification Intelligence</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Real-time automated alerts for control breaches, missing approvals, limit excesses, and policy deadlines.
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-900 font-mono font-bold text-xs rounded-xl">
                {alertsList.filter((a) => !a.resolved).length} UNRESOLVED ALERTS
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {alertsList.map((a) => (
                <div
                  key={a.id}
                  className={`p-4 rounded-2xl border transition-all space-y-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    a.resolved
                      ? 'bg-slate-50 border-slate-200 opacity-60'
                      : a.severity === 'CRITICAL'
                      ? 'bg-red-50 border-red-200'
                      : a.severity === 'WARNING'
                      ? 'bg-amber-50 border-amber-200'
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="space-y-1 max-w-3xl">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                        a.severity === 'CRITICAL' ? 'bg-red-200 text-red-900' : 'bg-amber-200 text-amber-900'
                      }`}>
                        {a.severity}
                      </span>
                      <span className="font-extrabold text-slate-900 text-sm">{a.title}</span>
                      <span className="text-[10px] font-mono text-slate-500">{a.timestamp}</span>
                    </div>

                    <p className="text-slate-700 text-[11px] leading-relaxed">{a.message}</p>
                    <span className="text-[10px] font-mono font-bold text-slate-500 block">Required Action: {a.actionRequired}</span>
                  </div>

                  <div>
                    {!a.resolved ? (
                      <button
                        onClick={() => handleResolveAlert(a.id)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-xl font-mono text-xs whitespace-nowrap"
                      >
                        Acknowledge & Resolve
                      </button>
                    ) : (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold font-mono rounded-xl text-xs flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> RESOLVED
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 10: BENCHMARKING ENGINE               */}
        {/* ========================================== */}
        {activeTab === 'benchmarking' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span>JUMO TRUST Institutional Benchmarking Engine</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Compares institutional performance against national and international sector peer benchmarks.
                </p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-900 font-mono font-bold text-xs rounded-xl">
                RANKED TOP 1%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {BENCHMARKING_METRICS_V32.map((bm) => (
                <div key={bm.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <span className="font-extrabold text-slate-900">{bm.category}</span>
                  <div className="space-y-2">
                    <div className="flex justify-between font-mono">
                      <span className="text-slate-500">Your Institution:</span>
                      <span className="font-bold text-emerald-700 text-sm">{bm.institutionScore} {bm.unit}</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span className="text-slate-500">Sector Average:</span>
                      <span className="font-bold text-slate-600">{bm.sectorAverage} {bm.unit}</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span className="text-slate-500">Top 10th Percentile:</span>
                      <span className="font-bold text-amber-600">{bm.topPercentile} {bm.unit}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 font-mono text-[10px] text-emerald-700 font-bold">
                    ★ {bm.rankingText}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 11: KNOWLEDGE CLOUD                   */}
        {/* ========================================== */}
        {activeTab === 'knowledge_cloud' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-teal-600" />
                  <span>JUMO TRUST Digital Audit Knowledge Cloud</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Indexed knowledge base containing national public finance laws, ISO standards, audit frameworks, and case studies.
                </p>
              </div>
              <span className="px-3 py-1 bg-teal-100 text-teal-900 font-mono font-bold text-xs rounded-xl">
                500+ AUDIT CODES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {KNOWLEDGE_CLOUD_V32.map((kn) => (
                <div key={kn.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                        {kn.code}
                      </span>
                      <span className="text-[10px] font-mono text-teal-700 font-bold">{kn.category}</span>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-sm">{kn.title}</h3>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{kn.summary}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400 flex justify-between">
                    <span>Last Updated: {kn.lastUpdated}</span>
                    <button className="text-amber-600 font-bold hover:underline">Read Full Standard →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 12: ROLE-BASED PORTALS               */}
        {/* ========================================== */}
        {activeTab === 'portals' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-600" />
                    <span>JUMO TRUST Role-Based Enterprise Portals</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Custom operational portals delivering role-tailored views for Directors, Auditors, Finance, HR, and Oversight Officials.
                  </p>
                </div>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-900 font-mono font-bold text-xs rounded-xl">
                  5 ROLE PORTALS
                </span>
              </div>

              {/* Portal Selector */}
              <div className="flex items-center gap-2 border-t border-slate-100 pt-3 text-xs font-bold overflow-x-auto">
                {PORTALS_V32.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPortalRole(p.id)}
                    className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                      selectedPortalRole === p.id
                        ? 'bg-slate-900 text-amber-400 font-extrabold shadow-sm'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>{p.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Portal Selected Box */}
            {(() => {
              const portal = PORTALS_V32.find((p) => p.id === selectedPortalRole) || PORTALS_V32[0];
              return (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <div>
                      <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 font-mono text-[10px] font-bold">
                        {portal.badge}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-base mt-1">{portal.title}</h3>
                      <p className="text-slate-500 text-xs">{portal.description}</p>
                    </div>

                    <button className="px-4 py-2 bg-slate-900 text-amber-400 font-bold rounded-xl font-mono text-xs">
                      Enter {portal.badge} View
                    </button>
                  </div>

                  <div className="space-y-2">
                    <span className="font-bold text-slate-800 text-xs block">Featured Modules in this Portal:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {portal.featuredModules.map((mod, i) => (
                        <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-extrabold text-slate-900">
                          ✓ {mod}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 13: UNIVERSAL CONFIGURATION CENTER    */}
        {/* ========================================== */}
        {activeTab === 'config_center' && (
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-md space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Lock className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <h2 className="text-sm font-black uppercase text-white tracking-wider font-mono">
                      JUMO TRUST Master Configuration Center
                    </h2>
                    <p className="text-[11px] text-slate-300">
                      Sovereign Platform Governance, Immutable Evidence Rules, and Zero-Trust Ledger Controls.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-amber-500 text-slate-950 font-mono text-[9px] font-black rounded uppercase">
                    v50.0 Ring-0
                  </span>
                  <span className="px-2.5 py-1 bg-slate-800 text-slate-300 font-mono text-[9px] font-bold rounded">
                    Isolation Active
                  </span>
                </div>
              </div>
            </div>

            {configSuccessMsg && (
              <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
                <Check className="w-4 h-4 shrink-0" />
                <span>{configSuccessMsg}</span>
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col md:flex-row text-xs min-h-[500px]">
              
              {/* Internal Configuration Category Tabs */}
              <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 shrink-0 p-3 flex flex-col gap-1 select-none">
                <span className="px-2.5 py-1 text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest block mb-1">
                  Governance Areas
                </span>
                
                {[
                  { id: 'engine', label: '1. Trust Engine Controls', icon: Shield },
                  { id: 'audit', label: '2. Digital Audit Controls', icon: ClipboardCheck },
                  { id: 'workforce', label: '3. Auditor Workforce', icon: Users },
                  { id: 'finance', label: '4. Financial Vision', icon: DollarSign },
                  { id: 'admin', label: '5. Administrative Vision', icon: UserCheck },
                  { id: 'risk', label: '6. Risk Intelligence', icon: ShieldAlert },
                  { id: 'exec', label: '7. Executive Reporting', icon: FileText },
                  { id: 'evidence', label: '8. Evidence Management', icon: FolderLock },
                  { id: 'external', label: '9. External Reporting', icon: Globe },
                  { id: 'ring0', label: '10. Ring-0 Owner Controls', icon: Key }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isSel = activeConfigTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveConfigTab(tab.id)}
                      className={`w-full px-3 py-2 rounded-xl text-left text-[11px] font-bold transition flex items-center gap-2 ${
                        isSel
                          ? 'bg-slate-900 text-amber-400 font-black shadow-xs'
                          : 'text-slate-600 hover:bg-slate-200/50'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isSel ? 'text-amber-400' : 'text-slate-400'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}

                <div className="mt-auto pt-4 border-t border-slate-200/60 space-y-2">
                  <button
                    onClick={() => handleSaveTrustConfig()}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-xl flex items-center justify-center gap-1.5 font-mono shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Save Config</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Load recommended sovereign JUMO TRUST defaults?')) {
                        const defaults = {
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
                        handleSaveTrustConfig(defaults);
                      }
                    }}
                    className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-1 font-mono border"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Defaults</span>
                  </button>
                </div>
              </div>

              {/* Active Sub-tab Content Area */}
              <div className="flex-1 p-5 lg:p-6 space-y-6 overflow-y-auto max-h-[600px]">
                
                {/* 1. TRUST ENGINE CONTROLS */}
                {activeConfigTab === 'engine' && (
                  <div className="space-y-4">
                    <div className="border-b pb-2.5">
                      <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-amber-500" />
                        <span>Trust Engine Configuration</span>
                      </h3>
                      <p className="text-[11px] text-slate-500">Core parameters governing active JUMO TRUST engine runtimes.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">JUMO TRUST Active Status</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={trustConfig.enableJumoTrust}
                            onChange={(e) => setTrustConfig({ ...trustConfig, enableJumoTrust: e.target.checked })}
                            className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                          />
                          <span className="text-slate-600 font-medium">Enable general JUMO TRUST oversight</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Suspend Trust Services</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={trustConfig.suspendTrustServices}
                            onChange={(e) => setTrustConfig({ ...trustConfig, suspendTrustServices: e.target.checked })}
                            className="w-4 h-4 text-rose-600 focus:ring-rose-500 border-slate-300 rounded"
                          />
                          <span className="text-rose-600 font-bold">Emergency Kill-Switch (Lock down audits)</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Trust Mode</label>
                        <select
                          value={trustConfig.trustMode}
                          onChange={(e) => setTrustConfig({ ...trustConfig, trustMode: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="Basic">Basic (Passive Alerts)</option>
                          <option value="Standard">Standard (Continuous Monitoring)</option>
                          <option value="Advanced">Advanced (Sovereign Dual-Verification)</option>
                          <option value="Government">Government (Immutable Ring-0 Sign-off)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Audit Update Manager</label>
                        <select
                          value={trustConfig.trustUpdateManager}
                          onChange={(e) => setTrustConfig({ ...trustConfig, trustUpdateManager: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="Automatic">Automatic Hot-Deploy updates</option>
                          <option value="Manual">Manual review required</option>
                          <option value="Scheduled">Scheduled maintenance windows</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">License Profile</label>
                        <select
                          value={trustConfig.trustLicensing}
                          onChange={(e) => setTrustConfig({ ...trustConfig, trustLicensing: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                        >
                          <option value="Developer">Developer Sandbox (No Ring-0 Enforcements)</option>
                          <option value="Standard">Standard Enterprise Tier</option>
                          <option value="Enterprise">Enterprise Multi-Tenant Group Tier</option>
                          <option value="Sovereign">Sovereign State Grade Isolation Tier</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Billing Scheme</label>
                        <select
                          value={trustConfig.trustBilling}
                          onChange={(e) => setTrustConfig({ ...trustConfig, trustBilling: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="Monthly">Monthly Flat Subscription</option>
                          <option value="Annual">Annual Cleared Treasury Account</option>
                          <option value="Tokenized">Tokenized pay-per-event-cleared</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Version Controller</label>
                        <input
                          type="text"
                          value={trustConfig.trustVersionControl}
                          onChange={(e) => setTrustConfig({ ...trustConfig, trustVersionControl: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <label className="font-bold text-slate-700 block">Policy Management Constitution</label>
                      <textarea
                        value={trustConfig.trustPolicyManagement}
                        onChange={(e) => setTrustConfig({ ...trustConfig, trustPolicyManagement: e.target.value })}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl h-20 text-[11px] leading-relaxed"
                      />
                    </div>
                  </div>
                )}

                {/* 2. DIGITAL AUDIT CONTROLS */}
                {activeConfigTab === 'audit' && (
                  <div className="space-y-4">
                    <div className="border-b pb-2.5">
                      <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                        <ClipboardCheck className="w-4 h-4 text-indigo-500" />
                        <span>Digital Audit Target Controls</span>
                      </h3>
                      <p className="text-[11px] text-slate-500">Configure target modules currently subject to continuous digital audits.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { key: 'continuousAudit', label: 'Continuous Real-Time Auditing' },
                        { key: 'scheduledAudit', label: 'Scheduled Compliance Checks' },
                        { key: 'onDemandAudit', label: 'Allow On-Demand Audits' },
                        { key: 'departmentAudit', label: 'Individual Department Auditing' },
                        { key: 'financialAudit', label: 'FAAP Financial Ledger Audits' },
                        { key: 'operationalAudit', label: 'Workflow SLA Audit Sweeps' },
                        { key: 'procurementAudit', label: 'Procurement Bid & RFQ Checks' },
                        { key: 'recruitmentAudit', label: 'HR Recruitment Merit Checks' },
                        { key: 'assetAudit', label: 'Physical Asset GPS & Depreciation audits' },
                        { key: 'complianceAudit', label: 'ISO & Statutory regulatory audits' }
                      ].map((item) => (
                        <div key={item.key} className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-between">
                          <span className="font-bold text-slate-800">{item.label}</span>
                          <input
                            type="checkbox"
                            checked={!!(trustConfig as any)[item.key]}
                            onChange={(e) => setTrustConfig({ ...trustConfig, [item.key]: e.target.checked })}
                            className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. DIGITAL AUDITOR TEAM CONFIGURATION */}
                {activeConfigTab === 'workforce' && (
                  <div className="space-y-4">
                    <div className="border-b pb-2.5">
                      <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-amber-500" />
                        <span>Digital Auditor Team Configuration</span>
                      </h3>
                      <p className="text-[11px] text-slate-500">Set behavior patterns for autonomous AI audit swarm networks.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Autonomous Auditor Teams</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={trustConfig.enableAuditorTeams}
                            onChange={(e) => setTrustConfig({ ...trustConfig, enableAuditorTeams: e.target.checked })}
                            className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                          />
                          <span className="text-slate-600 font-medium">Activate autonomous multi-agent swarms</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Audit Sign-off Levels</label>
                        <select
                          value={trustConfig.auditLevels}
                          onChange={(e) => setTrustConfig({ ...trustConfig, auditLevels: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="Level 1">Level 1: Departmental officer approval</option>
                          <option value="Level 2">Level 2: Director-level validation</option>
                          <option value="Level 3">Level 3: Executive Sovereign Sign-off</option>
                          <option value="Level 4 (Board)">Level 4: Independent Board Resolution required</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Scan Frequency</label>
                        <select
                          value={trustConfig.auditFrequency}
                          onChange={(e) => setTrustConfig({ ...trustConfig, auditFrequency: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="Continuous">Continuous (Real-time socket streams)</option>
                          <option value="Hourly">Hourly batch processing</option>
                          <option value="Daily">Daily midnight reconciliation</option>
                          <option value="Weekly">Weekly Friday summaries</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Audit Reporting Priorities</label>
                        <select
                          value={trustConfig.auditPriorities}
                          onChange={(e) => setTrustConfig({ ...trustConfig, auditPriorities: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="Critical Only">Critical structural failures only</option>
                          <option value="High & Critical">High & Critical anomalies</option>
                          <option value="All Findings">Report all variance alerts</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Escalation Threshold</label>
                        <select
                          value={trustConfig.escalationRules}
                          onChange={(e) => setTrustConfig({ ...trustConfig, escalationRules: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="Instant">Instant (SMS & Mobile Alert)</option>
                          <option value="24 Hours">24 Hours grace period</option>
                          <option value="48 Hours">48 Hours resolution timer</option>
                          <option value="72 Hours">72 Hours standard SLA escalation</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Evidence Logging Protocol</label>
                        <select
                          value={trustConfig.evidenceCollectionMode}
                          onChange={(e) => setTrustConfig({ ...trustConfig, evidenceCollectionMode: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                        >
                          <option value="Cryptographic WORM">SHA-256 Sealed WORM Storage (Immutable)</option>
                          <option value="Standard Secure Log">Encrypted PostgreSQL Standard Audit Log</option>
                          <option value="Cloud Archive">Secure Cloud File Archive Store</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Auditor Independence Scope</label>
                        <select
                          value={trustConfig.auditIndependence}
                          onChange={(e) => setTrustConfig({ ...trustConfig, auditIndependence: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="Independent Board Reporting">Independent Board Reporting (Highly Secure)</option>
                          <option value="Executive Directed">Executive-directed advisory limits</option>
                          <option value="Internal Departmental">Internal Departmental review scopes</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Auditor Integrity Rule Mode</label>
                        <select
                          value={trustConfig.integrityRules}
                          onChange={(e) => setTrustConfig({ ...trustConfig, integrityRules: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="Zero-Tolerance Segregation">Zero-Tolerance Segregation (Hard blocking)</option>
                          <option value="Warning Flags">Warning Flags & Soft bypass</option>
                          <option value="Flexible Review">Flexible Review with explanatory logs</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Auditor Performance Metric KPI</label>
                        <select
                          value={trustConfig.performanceMetrics}
                          onChange={(e) => setTrustConfig({ ...trustConfig, performanceMetrics: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="SLA Focus">Approval Velocity / SLA Focus</option>
                          <option value="Compliance Coverage">Regulatory & Compliance Coverage Index</option>
                          <option value="Audit Accuracy Rate">99.9% Audit Accuracy Rate minimum</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Communication & Reports Dispatcher</label>
                        <select
                          value={trustConfig.communicationSchedulers}
                          onChange={(e) => setTrustConfig({ ...trustConfig, communicationSchedulers: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="Instant push & digest">Instant push notifications & hourly email digests</option>
                          <option value="Daily digest">Daily consolidated PDF report</option>
                          <option value="Weekly summary">Weekly board executive brief packages</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. FINANCIAL VISION */}
                {activeConfigTab === 'finance' && (
                  <div className="space-y-4">
                    <div className="border-b pb-2.5">
                      <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4 text-emerald-500" />
                        <span>Financial Vision & FAAP Integration</span>
                      </h3>
                      <p className="text-[11px] text-slate-500">Configure financial rules linked to the FAAP ledger backend.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">FAAP Ledger Reconciliation Rules</label>
                        <select
                          value={trustConfig.faapReconciliationRules}
                          onChange={(e) => setTrustConfig({ ...trustConfig, faapReconciliationRules: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                        >
                          <option value="Strict $0.00 Parity">Strict $0.00 Parity (Reject any ledger drift)</option>
                          <option value="Tolerance within $1.00">Soft tolerance within $1.00 variance limits</option>
                          <option value="Manual Review override">Manual Review override with auditor signatures</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Double-Entry Parity Enforcement</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={trustConfig.doubleEntryParityEnforcement}
                            onChange={(e) => setTrustConfig({ ...trustConfig, doubleEntryParityEnforcement: e.target.checked })}
                            className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                          />
                          <span className="text-slate-600 font-medium">Prevent single-entry posts from compiling</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Expected Revenue Leakage Tolerance (%)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={trustConfig.revenueLeakageTolerances}
                          onChange={(e) => setTrustConfig({ ...trustConfig, revenueLeakageTolerances: parseFloat(e.target.value) || 0 })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Spending Velocity Cap Threshold ($)</label>
                        <input
                          type="number"
                          value={trustConfig.spendingVelocityThresholds}
                          onChange={(e) => setTrustConfig({ ...trustConfig, spendingVelocityThresholds: parseInt(e.target.value, 10) || 0 })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Petty Cash Float Audit Cap Limit ($)</label>
                        <input
                          type="number"
                          value={trustConfig.pettyCashFloatAuditingCaps}
                          onChange={(e) => setTrustConfig({ ...trustConfig, pettyCashFloatAuditingCaps: parseInt(e.target.value, 10) || 0 })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. ADMINISTRATIVE VISION */}
                {activeConfigTab === 'admin' && (
                  <div className="space-y-4">
                    <div className="border-b pb-2.5">
                      <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-indigo-500" />
                        <span>Administrative Vision & HR Controls</span>
                      </h3>
                      <p className="text-[11px] text-slate-500">Configure strict personnel, qualification, and attendance parameters.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Biometric Attendance Tolerance (Minutes)</label>
                        <input
                          type="number"
                          value={trustConfig.biometricAttendanceVerificationTolerances}
                          onChange={(e) => setTrustConfig({ ...trustConfig, biometricAttendanceVerificationTolerances: parseInt(e.target.value, 10) || 0 })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Recruitment Merit Target Score (%)</label>
                        <input
                          type="number"
                          value={trustConfig.recruitmentMeritVerificationScoreThresholds}
                          onChange={(e) => setTrustConfig({ ...trustConfig, recruitmentMeritVerificationScoreThresholds: parseInt(e.target.value, 10) || 0 })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Appraisal Objectivity Verification Controls</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={trustConfig.appraisalObjectivityControlFlags}
                            onChange={(e) => setTrustConfig({ ...trustConfig, appraisalObjectivityControlFlags: e.target.checked })}
                            className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                          />
                          <span className="text-slate-600 font-medium">Flag multi-person rating variance anomalies</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Ghost Worker & Role Radar Sensitivity</label>
                        <select
                          value={trustConfig.ghostRoleScanningSensitivity}
                          onChange={(e) => setTrustConfig({ ...trustConfig, ghostRoleScanningSensitivity: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="Low">Low (Basic registration sync checks)</option>
                          <option value="Medium">Medium (Cross-reference attendance and bank)</option>
                          <option value="High">High (Analyze biometric files against payroll daily)</option>
                          <option value="Aggressive Fraud Radar">Aggressive Fraud Radar (Continuous telemetry checks)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. RISK INTELLIGENCE */}
                {activeConfigTab === 'risk' && (
                  <div className="space-y-4">
                    <div className="border-b pb-2.5">
                      <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-rose-500" />
                        <span>Risk Intelligence & Mitigation Control</span>
                      </h3>
                      <p className="text-[11px] text-slate-500">Configure parameters for predictive fraud scoring and continuous risk matrices.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">General Risk Scoring Weighting Scheme</label>
                        <select
                          value={trustConfig.riskScoringWeights}
                          onChange={(e) => setTrustConfig({ ...trustConfig, riskScoringWeights: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="Equal weights">Equal weights across all categories</option>
                          <option value="Financial-heavy">Financial-heavy (Prioritize ledger & petty cash variance)</option>
                          <option value="Compliance-heavy">Compliance-heavy (Prioritize statutory fines risk)</option>
                          <option value="Operational-heavy">Operational-heavy (Prioritize SLA & contract bottlenecks)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Fraud Predictor Simulation Engine</label>
                        <select
                          value={trustConfig.predictiveFraudRiskPredictorParameters}
                          onChange={(e) => setTrustConfig({ ...trustConfig, predictiveFraudRiskPredictorParameters: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="Deep Neural Simulation">Deep Neural Simulation (RAG-grounded model)</option>
                          <option value="Heuristic rule-based">Heuristic rule-based (Pre-defined criteria check)</option>
                          <option value="Standard deviation analysis">Standard deviation variance analysis</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Continuity Backup Validation Policy</label>
                        <select
                          value={trustConfig.businessContinuityBackupValidationRules}
                          onChange={(e) => setTrustConfig({ ...trustConfig, businessContinuityBackupValidationRules: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                        >
                          <option value="Hourly check">Hourly check (Highly secure)</option>
                          <option value="Daily full backup">Daily full database snapshot</option>
                          <option value="Continuous replication log">Continuous transaction-level replication</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Strategic Roadmap Alignment Target (%)</label>
                        <input
                          type="number"
                          value={trustConfig.strategicRoadmapAlignmentThresholds}
                          onChange={(e) => setTrustConfig({ ...trustConfig, strategicRoadmapAlignmentThresholds: parseInt(e.target.value, 10) || 0 })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. EXECUTIVE REPORTING */}
                {activeConfigTab === 'exec' && (
                  <div className="space-y-4">
                    <div className="border-b pb-2.5">
                      <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-indigo-500" />
                        <span>Executive Reporting & Oversight Rules</span>
                      </h3>
                      <p className="text-[11px] text-slate-500">Configure parameters for morning briefings and board package assembly.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Morning Executive Briefings Generator</label>
                        <select
                          value={trustConfig.executiveMorningBriefingGenerationRules}
                          onChange={(e) => setTrustConfig({ ...trustConfig, executiveMorningBriefingGenerationRules: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="AI-Synthesized Summary">AI-Synthesized Narrative Summary (Recommended)</option>
                          <option value="Raw Logs feed">Raw logs stream feed of yesterday's anomalies</option>
                          <option value="KPI Dashboard snapshot">Static KPI dashboard telemetry snapshot</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Board Package Assembly Deadline</label>
                        <select
                          value={trustConfig.boardPackageAssemblyDeadlines}
                          onChange={(e) => setTrustConfig({ ...trustConfig, boardPackageAssemblyDeadlines: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="7 days prior">7 Days prior to meeting schedule</option>
                          <option value="3 days prior">3 Days prior to meeting schedule</option>
                          <option value="On-demand generation">On-demand generation (Instant compile)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Committee Quorum Rules</label>
                        <select
                          value={trustConfig.committeeQuorumVerificationParameters}
                          onChange={(e) => setTrustConfig({ ...trustConfig, committeeQuorumVerificationParameters: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="Strict majority (>50%)">Strict majority (&gt;50% verified directors)</option>
                          <option value="Two-thirds majority (>66%)">Two-thirds majority (&gt;66% verified directors)</option>
                          <option value="Quorum minimums">Strict minimum headcount of directors present</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Action Item Escalation Schedulers</label>
                        <select
                          value={trustConfig.actionItemEscalationSchedules}
                          onChange={(e) => setTrustConfig({ ...trustConfig, actionItemEscalationSchedules: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="Immediate escalations">Immediate escalations upon deadline failure</option>
                          <option value="24h after target SLA">24h after target SLA breach</option>
                          <option value="Weekly reviews">Weekly audit reviews & manual tracking escalation</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* 8. EVIDENCE MANAGEMENT */}
                {activeConfigTab === 'evidence' && (
                  <div className="space-y-4">
                    <div className="border-b pb-2.5">
                      <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                        <FolderLock className="w-4 h-4 text-amber-500" />
                        <span>Evidence Management & Integrity Controls</span>
                      </h3>
                      <p className="text-[11px] text-slate-500">Configure parameters for immutable cryptographic evidence logging.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">WORM Vault Retention Duration</label>
                        <select
                          value={trustConfig.wormCryptographicVaultRetentionRules}
                          onChange={(e) => setTrustConfig({ ...trustConfig, wormCryptographicVaultRetentionRules: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                        >
                          <option value="Indefinite">Indefinite (No deletion allowed)</option>
                          <option value="7 Years (Regulatory)">7 Years Regulatory standard</option>
                          <option value="10 Years">10 Years high-assurance standard</option>
                          <option value="Custom Schedule">Custom retention policy schedules</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">PKI Signature Verification Mode</label>
                        <select
                          value={trustConfig.pkiSignatureValidationModes}
                          onChange={(e) => setTrustConfig({ ...trustConfig, pkiSignatureValidationModes: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="Strict PKI & Hardware">Strict Cryptographic PKI & Hardware tokens</option>
                          <option value="Soft signature validation">Soft signature sign-off verification</option>
                          <option value="Single sign-on verification">Single sign-on validation log only</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Physical Receipt OCR Match Threshold (%)</label>
                        <input
                          type="number"
                          value={trustConfig.physicalReceiptOcrCompletenessThresholds}
                          onChange={(e) => setTrustConfig({ ...trustConfig, physicalReceiptOcrCompletenessThresholds: parseInt(e.target.value, 10) || 0 })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Read-Only Logs Verification Frequency</label>
                        <select
                          value={trustConfig.readOnlyLogsVerificationFrequency}
                          onChange={(e) => setTrustConfig({ ...trustConfig, readOnlyLogsVerificationFrequency: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                        >
                          <option value="Continuous">Continuous (Real-time checksum stream)</option>
                          <option value="Daily automated cron">Daily automated cron validation</option>
                          <option value="Weekly task checklist">Weekly manual checklist checks</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* 9. EXTERNAL REPORTING */}
                {activeConfigTab === 'external' && (
                  <div className="space-y-4">
                    <div className="border-b pb-2.5">
                      <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                        <Globe className="w-4 h-4 text-indigo-500" />
                        <span>External Transparency & Disclosure</span>
                      </h3>
                      <p className="text-[11px] text-slate-500">Configure public sector disclosure, donor reporting, and regulatory submissions.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Public Transparency Disclosures</label>
                        <select
                          value={trustConfig.publicSectorTransparencyDisclosureLevels}
                          onChange={(e) => setTrustConfig({ ...trustConfig, publicSectorTransparencyDisclosureLevels: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="Full Public ledger">Full Public ledger access (Open-data protocol)</option>
                          <option value="Redacted summarized public">Redacted summarized public data feeds</option>
                          <option value="Government-restricted">Government-restricted (No public disclosure)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Statutory Regulatory Compliance Schedule</label>
                        <select
                          value={trustConfig.statutoryRegulatoryComplianceSchedulers}
                          onChange={(e) => setTrustConfig({ ...trustConfig, statutoryRegulatoryComplianceSchedulers: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="Monthly statutory returns">Monthly statutory returns dispatcher</option>
                          <option value="Quarterly reports">Quarterly certified reports</option>
                          <option value="Annual compliance packet">Annual comprehensive compliance package</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Donor & Grant Checklist Rules</label>
                        <select
                          value={trustConfig.donorGrantComplianceChecklistRules}
                          onChange={(e) => setTrustConfig({ ...trustConfig, donorGrantComplianceChecklistRules: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="USAID/EU standard rules">USAID / EU High-assurance standard checks</option>
                          <option value="Custom Donor checklists">Custom Donor checklists & grant parameters</option>
                          <option value="Standard institutional audit">Standard institutional internal controls</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Court-Grade Forensic Referral Packages</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={trustConfig.courtGradeForensicReferralPackages}
                            onChange={(e) => setTrustConfig({ ...trustConfig, courtGradeForensicReferralPackages: e.target.checked })}
                            className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                          />
                          <span className="text-slate-600 font-medium">Auto-generate sealed digital evidence chain PDFs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 10. RING-0 OWNER CONTROLS */}
                {activeConfigTab === 'ring0' && (
                  <div className="space-y-4">
                    <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-xl space-y-2">
                      <div className="flex items-center gap-1.5 text-amber-400">
                        <Lock className="w-4 h-4 shrink-0" />
                        <span className="font-extrabold text-xs uppercase font-mono tracking-wider">Ring-0 Sovereign Shield Enforced</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        These settings are reserved exclusively for the platform owner control center. Modifications trigger permanent PKI security ledger writes.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Master Audit Override Access</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={trustConfig.masterAuditOverrideAccessToggles}
                            onChange={(e) => setTrustConfig({ ...trustConfig, masterAuditOverrideAccessToggles: e.target.checked })}
                            className="w-4 h-4 text-rose-600 focus:ring-rose-500 border-slate-300 rounded"
                          />
                          <span className="text-slate-700 font-bold">Override all department blocks (Emergency Only)</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Zero-Trust Session Firewall Limit (Minutes)</label>
                        <input
                          type="number"
                          value={trustConfig.zeroTrustSessionFirewallLimits}
                          onChange={(e) => setTrustConfig({ ...trustConfig, zeroTrustSessionFirewallLimits: parseInt(e.target.value, 10) || 0 })}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Multi-Tenant Row-Level Separation</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={trustConfig.multiTenantRowLevelSeparationEnforcements}
                            disabled
                            className="w-4 h-4 text-indigo-600 border-slate-300 rounded cursor-not-allowed"
                          />
                          <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                            ✓ Hard-coded Cryptographic isolation (Permanently Active)
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-700 block">Administrative MFA Challenge Wall</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={trustConfig.administrativeMfaWallActivationToggles}
                            onChange={(e) => setTrustConfig({ ...trustConfig, administrativeMfaWallActivationToggles: e.target.checked })}
                            className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                          />
                          <span className="text-slate-600 font-medium">Require physical hardware MFA key signature verification</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 14: INTEGRATION FABRIC                */}
        {/* ========================================== */}
        {activeTab === 'integration_fabric' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Network className="w-5 h-5 text-indigo-600" />
                  <span>JUMO TRUST Integration Fabric</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Native connections into all JUMO Enterprise platforms for real-time read-only evidence streams.
                </p>
              </div>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-900 font-mono font-bold text-xs rounded-xl">
                7 FABRICS CONNECTED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {INTEGRATION_FABRIC_V32.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {item.status}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">Latency: {item.latency}</span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-sm">{item.name}</h3>
                    <span className="text-[10px] font-mono text-indigo-700 font-bold block">{item.type}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] space-y-1">
                    <div className="flex justify-between text-slate-500">
                      <span>Events Streamed Today:</span>
                      <span className="font-bold text-slate-800">{item.eventsProcessedToday}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Isolation Guarantee:</span>
                      <span className="font-bold text-emerald-700">{item.isolationGuarantee}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 15: MOBILE EXECUTIVE EXPERIENCE       */}
        {/* ========================================== */}
        {activeTab === 'mobile_exec' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-amber-600" />
                  <span>JUMO TRUST Mobile Executive Experience</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Mobile-first operational access delivering alerts, approval visibility, risk monitoring, and institutional health on executive phones.
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-900 font-mono font-bold text-xs rounded-xl">
                MOBILE COMMAND READY
              </span>
            </div>

            {/* Mobile Interface Mock View */}
            <div className="max-w-md mx-auto bg-slate-900 text-white rounded-3xl p-5 border-4 border-slate-800 shadow-2xl space-y-4 text-xs font-sans">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2 font-mono text-[10px]">
                <span className="text-amber-400 font-bold">JUMO TRUST MOBILE</span>
                <span className="text-slate-400">98.9 IHI SCORE</span>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl space-y-1 text-center">
                <span className="text-[10px] font-mono text-slate-400">INSTITUTIONAL HEALTH</span>
                <div className="text-2xl font-black text-amber-400 font-mono">98.9 / 100</div>
                <span className="text-[9px] text-emerald-400 font-mono">SOVEREIGN GRADE A+</span>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-[10px] text-slate-400 uppercase font-mono block">Executive Alerts (Mobile):</span>
                {alertsList.slice(0, 2).map((a) => (
                  <div key={a.id} className="p-3 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
                    <span className="font-bold text-amber-400 block text-[11px]">{a.title}</span>
                    <p className="text-[10px] text-slate-300 leading-snug">{a.message}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={handleRunFullAudit}
                className="w-full py-2 bg-amber-500 text-slate-950 font-black rounded-xl font-mono text-xs"
              >
                Trigger Instant Audit Sweep
              </button>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 16: ENTERPRISE MARKETPLACE            */}
        {/* ========================================== */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-amber-600" />
                  <span>JUMO TRUST Enterprise Marketplace</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Installable governance packages, compliance frameworks, audit templates, and industry assurance suites.
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-900 font-mono font-bold text-xs rounded-xl">
                ENTERPRISE MARKETPLACE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {marketplaceList.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-[10px] font-bold">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{item.version}</span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-sm">{item.name}</h3>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{item.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-between items-center font-mono text-[10px]">
                    <span className="text-slate-400">Publisher: {item.publisher}</span>
                    {item.status === 'INSTALLED' ? (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-xl">
                        INSTALLED
                      </span>
                    ) : (
                      <button
                        onClick={() => handleInstallExtension(item.id)}
                        className="px-3 py-1 bg-slate-900 text-amber-400 font-bold rounded-xl hover:bg-slate-800"
                      >
                        Install Package
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 17: 20 DIGITAL DEPARTMENTS            */}
        {/* ========================================== */}
        {activeTab === 'departments' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-600" />
                  <span>20 Permanent Digital Audit Departments</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Structured as permanent digital assurance departments within JUMO UEOS, each department operates assigned specialists and modules.
                </p>
              </div>
              <span className="px-3 py-1 bg-slate-900 text-amber-300 font-mono font-bold text-xs rounded-xl">
                20 / 20 OPERATIONAL
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {TRUST_DEPARTMENTS_20.map((dept) => (
                <div
                  key={dept.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded">
                        {dept.code}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {dept.healthIndex}%
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-sm">{dept.name}</h3>
                    <p className="text-[11px] text-slate-500 leading-snug">{dept.role}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-slate-600 font-mono">
                      <span>Lead: {dept.leadSpecialist}</span>
                      <span>{dept.activeModules} Modules</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 18: 12 CCTV LENSES                    */}
        {/* ========================================== */}
        {activeTab === 'surveillance' && (
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/40 flex items-center gap-1.5 w-max">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE PROCESS OBSERVATION
                </span>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Video className="w-5 h-5 text-amber-400" />
                  <span>Digital Hybrid Surveillance Division — 12 Operational CCTV Lenses</span>
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                  Observes enterprise operations through live read-only evidence streams across Financial, Admin, Procurement, and Payroll lenses.
                </p>
              </div>

              <span className="text-xs font-bold text-amber-400 bg-slate-800 p-3 rounded-xl border border-slate-700">
                12 CCTV Lenses Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {CCTV_LENSES_12.map((lens) => (
                <div key={lens.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 text-sm">{lens.name}</span>
                      <span className="text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded flex items-center gap-1">
                        <Radio className="w-2.5 h-2.5 text-emerald-600 animate-pulse" /> {lens.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">{lens.coverage}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>Rate: {lens.eventsPerMin}</span>
                      <span className="text-emerald-700 font-bold">100% Coverage</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl border border-slate-200 text-[10px] text-slate-700 font-mono">
                      <span className="text-slate-400">Last Event: </span>{lens.lastEvent}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 19: 8 AUDITOR AGENTS WORKFORCE        */}
        {/* ========================================== */}
        {activeTab === 'workforce' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-purple-600" />
                  <span>JUMO TRUST Digital Auditor Workforce Engine (8 Specialized AI Agents)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Enterprise digital specialist agents executing continuous control testing, evidence review, and recommendation generation.
                </p>
              </div>
              <span className="px-3 py-1 bg-slate-900 text-amber-300 font-mono font-bold text-xs rounded-xl">
                8 AGENTS OPERATIONAL
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {DIGITAL_AUDITOR_WORKFORCE.map((agent) => (
                <div key={agent.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-purple-100 text-purple-800 rounded-xl font-bold">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded">
                        {agent.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm">{agent.name}</h3>
                      <span className="text-[10px] font-mono text-purple-700 font-bold block">{agent.title}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-snug">{agent.specialization}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-1 font-mono text-[10px]">
                    <div className="flex justify-between text-slate-600">
                      <span>Reviews Today:</span>
                      <span className="font-bold text-slate-900">{agent.reviewsCompletedToday}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Accuracy Rate:</span>
                      <span className="font-bold text-emerald-700">{agent.accuracyRate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 20: 100+ MODULES REGISTRY            */}
        {/* ========================================== */}
        {activeTab === 'modules_registry' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Package className="w-5 h-5 text-amber-600" />
                    <span>100+ Enterprise Assurance Modules Registry</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Search and filter modules across 12 core enterprise assurance domains.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search 100+ modules..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 outline-hidden w-64"
                    />
                  </div>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs pt-2 border-t border-slate-100">
                {[
                  'ALL',
                  'Executive Management',
                  'Financial Assurance',
                  'Administrative Assurance',
                  'Governance',
                  'Risk',
                  'Compliance',
                  'Investigation',
                  'Institutional Health',
                  'Decision Intelligence',
                  'Digital Consultancy',
                  'Knowledge & Academy',
                  'Enterprise Collaboration'
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap text-xs transition-all ${
                      selectedCategory === cat
                        ? 'bg-slate-900 text-amber-400 font-bold'
                        : 'hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Module Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {filteredModules.map((mod) => (
                <div key={mod.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded">
                        {mod.code}
                      </span>
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                        mod.status === 'RING_0' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {mod.status}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-sm">{mod.name}</h3>
                    <span className="text-[10px] font-mono text-slate-500 block">Department: {mod.department}</span>
                    <p className="text-[11px] text-slate-500 leading-snug">{mod.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-400">Tier: {mod.tier}</span>
                    <button
                      onClick={() => toggleModuleStatus(mod.id)}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                        mod.enabled
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {mod.enabled ? 'ENABLED' : 'DISABLED'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* PHASE v50.0: SOVEREIGN PLATFORM ARCHITECTURE */}
        {/* ========================================== */}
        {activeTab === 'v50_sovereign' && (
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/40">
                  ROADMAP v50.0 — SOVEREIGN INSTITUTIONAL INTELLIGENCE ARCHITECTURE
                </span>
              </div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Landmark className="w-6 h-6 text-amber-400" />
                <span>Universal Institutional Assurance & Governance Ecosystem</span>
              </h2>
              <p className="text-xs text-slate-300 max-w-4xl leading-relaxed">
                JUMO TRUST acts as the universal digital institutional assurance and governance backbone, directly integrated with FAAP (Financial Accounting), AEGIS Security, JUMO Cloud, JUMO DIGITAL PAY, and all JUMO ERP families (Government, Education, Healthcare, Corporate, SACCO, Church, NGO, Agriculture, Industry).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {SOVEREIGN_ARCHITECTURE_V50.map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      {item.layer}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {item.status}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{item.systemName}</h3>
                  <p className="text-slate-600 text-xs">{item.integrationRole}</p>
                  <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                    <span className="font-bold text-slate-800">Capability:</span> {item.capability}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* PHASE v34.0: DIGITAL AUDITOR TEAMS          */}
        {/* ========================================== */}
        {activeTab === 'v34_auditor_teams' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-600" />
                <span>Phase v34.0 — Continuous Digital Auditor Workforce Teams</span>
              </h2>
              <p className="text-xs text-slate-500">
                Specialized digital auditor teams conducting non-stop evidence analysis, risk identification, audit recommendations, and executive reporting across all operational domains.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {DIGITAL_AUDITOR_TEAMS_V34.map((team) => (
                <div key={team.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {team.status}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-amber-600">{team.accuracyRate} Accuracy</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{team.name}</h3>
                  <p className="text-slate-500 text-[11px]"><strong className="text-slate-700">Lead:</strong> {team.teamLeadAgent}</p>
                  <p className="text-slate-500 text-[11px]"><strong className="text-slate-700">Focus:</strong> {team.focusArea}</p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-slate-500">Reviews 24h: {team.activeReviewsCount}</span>
                    <span className="text-red-600 font-bold">Risks: {team.riskDetected24h}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* PHASE v35.0: DIGITAL INVESTIGATION PLATFORM */}
        {/* ========================================== */}
        {activeTab === 'v35_investigation' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-600" />
                <span>Phase v35.0 — JUMO TRUST Digital Investigation Platform</span>
              </h2>
              <p className="text-xs text-slate-500">
                Institutional forensic case center, evidence timeline engine, document forensics, transaction investigation, conflict detection, incident management, and board resolution tracking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {DIGITAL_INVESTIGATIONS_V35.map((c) => (
                <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {c.caseRef}
                    </span>
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                      c.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {c.severity} SEVERITY
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{c.title}</h3>
                  <p className="text-slate-500 text-[11px]"><strong className="text-slate-700">Type:</strong> {c.type}</p>
                  <p className="text-slate-500 text-[11px]"><strong className="text-slate-700">Lead Investigator:</strong> {c.leadInvestigator}</p>
                  <div className="p-3 bg-slate-50 rounded-xl text-slate-700 text-[11px] leading-relaxed border border-slate-100">
                    {c.resolutionStatus}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* PHASE v36.0: RECRUITMENT INTEGRITY        */}
        {/* ========================================== */}
        {activeTab === 'v36_recruitment' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-amber-600" />
                <span>Phase v36.0 — JUMO TRUST Recruitment Integrity Platform</span>
              </h2>
              <p className="text-xs text-slate-500">
                Transparent recruitment verification across Government, Corporate, Education, and Healthcare ERPs. Automated degree attestation, applicant qualification audit, and selection integrity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {RECRUITMENT_RECORDS_V36.map((rec) => (
                <div key={rec.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {rec.vacancyCode}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {rec.targetERP}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{rec.jobTitle}</h3>
                  <p className="text-slate-500 text-[11px]"><strong className="text-slate-700">Dept:</strong> {rec.department}</p>
                  <div className="pt-2 border-t border-slate-100 font-mono text-[10px] space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>Verified Applicants:</span> <strong>{rec.applicantsVerified}</strong>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Audit Stage:</span> <strong className="text-amber-700">{rec.auditStage}</strong>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Integrity Index:</span> <strong className="text-emerald-700">{rec.integrityIndex}%</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* PHASE v37.0: FINANCIAL INTEGRITY EXPANSION  */}
        {/* ========================================== */}
        {activeTab === 'v37_financial' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-amber-600" />
                <span>Phase v37.0 — JUMO TRUST Financial Integrity Expansion (FAAP Linked)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Continuous double-entry parity auditing, petty cash float intelligence, revenue assurance, expense 3-way matching, payroll ghost scan, treasury monitoring, and fraud pattern detection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {FINANCIAL_INTEGRITY_MODULES_V37.map((mod) => (
                <div key={mod.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {mod.status}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">{mod.lastAuditRun}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{mod.name}</h3>
                  <p className="text-slate-500 text-[11px]"><strong className="text-slate-700">FAAP Target:</strong> {mod.faapIntegration}</p>
                  <p className="text-slate-500 text-[11px]"><strong className="text-slate-700">Coverage:</strong> {mod.monthlyCoverage}</p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-slate-500">Fraud Blocked:</span>
                    <span className="text-emerald-700 font-bold">{mod.fraudAlertsBlocked} Alerts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* PHASE v38.0: OPERATIONAL INTELLIGENCE       */}
        {/* ========================================== */}
        {activeTab === 'v38_operations' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-amber-600" />
                <span>Phase v38.0 — JUMO TRUST Operational Intelligence Center</span>
              </h2>
              <p className="text-xs text-slate-500">
                Institutional control rooms tracking department performance, workflow SLA velocity, service delivery analytics, resource utilization, and productivity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {DEPT_OPERATIONAL_METRICS_V38.map((dept) => (
                <div key={dept.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 text-sm">{dept.departmentName}</h3>
                    <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {dept.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div>SLA Performance: <strong className="text-emerald-700">{dept.slaPerformance}%</strong></div>
                    <div>Workflow Velocity: <strong className="text-slate-800">{dept.workflowVelocity}</strong></div>
                    <div>Resource Util: <strong className="text-slate-800">{dept.resourceUtilization}%</strong></div>
                    <div>Productivity: <strong className="text-amber-700">{dept.productivityIndex}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* PHASE v39.0: SMART DOCUMENT VAULT         */}
        {/* ========================================== */}
        {activeTab === 'v39_evidence_vault' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-amber-600" />
                <span>Phase v39.0 — Digital Evidence & Smart Document Vault</span>
              </h2>
              <p className="text-xs text-slate-500">
                WORM cryptographic vault, digital file verification, records lifecycle management, PKI digital signatures, archive intelligence, and statutory compliance retention.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {SMART_DOC_VAULT_V39.map((doc) => (
                <div key={doc.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {doc.docCode}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {doc.verificationStatus}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{doc.title}</h3>
                  <p className="text-slate-500 text-[11px]"><strong className="text-slate-700">Category:</strong> {doc.category}</p>
                  <p className="text-slate-500 text-[11px]"><strong className="text-slate-700">PKI Signature:</strong> {doc.pkiSignature}</p>
                  <div className="p-2.5 bg-slate-900 text-slate-300 font-mono text-[9px] rounded-xl overflow-x-auto">
                    {doc.cryptographicHash}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* PHASE v40.0: GOVERNANCE PLATFORM          */}
        {/* ========================================== */}
        {activeTab === 'v40_governance' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-600" />
                <span>Phase v40.0 — JUMO TRUST Governance Platform</span>
              </h2>
              <p className="text-xs text-slate-500">
                Board management, policy governance, resolution tracking, ethics controls, conflict-of-interest mapping, and corporate governance reporting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {GOVERNANCE_RESOLUTIONS_V40.map((res) => (
                <div key={res.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {res.resolutionCode}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {res.status}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{res.title}</h3>
                  <p className="text-slate-500 text-[11px]"><strong className="text-slate-700">Governing Body:</strong> {res.governingBody}</p>
                  <p className="text-slate-500 text-[11px]"><strong className="text-slate-700">Ethics / COI:</strong> {res.ethicsStatus}</p>
                  <div className="pt-2 border-t border-slate-100 flex justify-between font-mono text-[10px]">
                    <span className="text-slate-500">Compliance Rate:</span>
                    <strong className="text-emerald-700">{res.complianceRate}%</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* PHASE v41.0: RISK INTELLIGENCE             */}
        {/* ========================================== */}
        {activeTab === 'v41_risk' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span>Phase v41.0 — JUMO TRUST Risk Intelligence Platform</span>
              </h2>
              <p className="text-xs text-slate-500">
                Enterprise risk register, risk scoring engine, predictive risk analysis, control assessment, risk heatmaps, response management, and early warning systems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {RISK_REGISTER_V41.map((risk) => (
                <div key={risk.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {risk.riskCode}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {risk.controlAssessment}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{risk.title}</h3>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[10px] bg-slate-50 p-2.5 rounded-xl">
                    <div>Inherent Risk: <strong className="text-red-700">{risk.inherentRiskScore} / 10</strong></div>
                    <div>Residual Risk: <strong className="text-emerald-700">{risk.residualRiskScore} / 10</strong></div>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed"><strong className="text-slate-800">Mitigation:</strong> {risk.mitigationStrategy}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* PHASE v42.0: COMPLIANCE MARKETPLACE       */}
        {/* ========================================== */}
        {activeTab === 'v42_compliance' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-600" />
                <span>Phase v42.0 — JUMO TRUST Compliance Marketplace</span>
              </h2>
              <p className="text-xs text-slate-500">
                Configurable sector compliance packages (Education, Banking, Government, Healthcare, NGO) with pre-loaded regulations, checklists, and automated compliance reports.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {COMPLIANCE_PACKAGES_V42.map((pkg) => (
                <div key={pkg.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                        {pkg.sector} Sector
                      </span>
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                        pkg.status === 'INSTALLED_ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {pkg.status}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-sm">{pkg.name}</h3>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{pkg.coverageDescription}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-600">
                    <span>{pkg.regulationsCount} Regulations</span>
                    <span>{pkg.checklistsCount} Checklists</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* PHASE v43.0: DIGITAL INSPECTOR PLATFORM    */}
        {/* ========================================== */}
        {activeTab === 'v43_inspector' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-amber-600" />
                <span>Phase v43.0 — JUMO TRUST Digital Inspector Platform</span>
              </h2>
              <p className="text-xs text-slate-500">
                Government and regulatory inspection scheduling, field verification records, regulatory reporting, institution rankings, and corrective action tracking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {FIELD_INSPECTIONS_V43.map((insp) => (
                <div key={insp.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {insp.inspectionCode}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {insp.status}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{insp.targetInstitution}</h3>
                  <p className="text-slate-500 text-[11px]"><strong className="text-slate-700">Inspector:</strong> {insp.inspectorName}</p>
                  <p className="text-slate-500 text-[11px]"><strong className="text-slate-700">Ranking:</strong> {insp.institutionRanking}</p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-slate-500">Score: <strong className="text-emerald-700">{insp.score}%</strong></span>
                    <span className="text-slate-500">Findings: <strong className="text-slate-800">{insp.findingsCount}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* PHASE v44.0: INSTITUTIONAL DIGITAL TWIN    */}
        {/* ========================================== */}
        {activeTab === 'v44_digital_twin' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-600" />
                <span>Phase v44.0 — JUMO TRUST Institutional Digital Twin</span>
              </h2>
              <p className="text-xs text-slate-500">
                Virtual simulation of financial operations, HR capacity, asset lifecycles, and department workflows for performance prediction and strategic improvement planning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {DIGITAL_TWIN_MODELS_V44.map((twin) => (
                <div key={twin.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      {twin.simulatedArea}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">{twin.lastSimulationRun}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{twin.modelName}</h3>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[10px] bg-slate-50 p-2.5 rounded-xl">
                    <div>Fidelity: <strong className="text-emerald-700">{twin.realtimeFidelity}%</strong></div>
                    <div>Confidence: <strong className="text-blue-700">{twin.predictiveConfidence}%</strong></div>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed border-t border-slate-100 pt-2"><strong className="text-slate-900">Scenario Outcome:</strong> {twin.simulatedScenarioResult}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* PHASE v45.0: GLOBAL INTELLIGENCE NETWORK  */}
        {/* ========================================== */}
        {activeTab === 'v45_global_network' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-600" />
                <span>Phase v45.0 — JUMO TRUST Global Intelligence Network</span>
              </h2>
              <p className="text-xs text-slate-500">
                Cross-institution benchmarking, industry intelligence, performance comparison, trend analysis, and knowledge sharing across sovereign and enterprise networks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {GLOBAL_TRUST_NETWORK_V45.map((net) => (
                <div key={net.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <h3 className="font-extrabold text-slate-900 text-sm">{net.sectorName}</h3>
                  <p className="text-slate-500 text-[11px]">Participating Institutions: <strong className="text-slate-800 font-mono">{net.participatingInstitutionsCount}</strong></p>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[10px] bg-slate-50 p-2.5 rounded-xl">
                    <div>Sector Avg: <strong className="text-slate-800">{net.averageTrustScore}</strong></div>
                    <div>Top Score: <strong className="text-emerald-700">{net.topPercentileScore}</strong></div>
                  </div>
                  <p className="text-emerald-700 font-bold text-[11px] border-t border-slate-100 pt-2 font-mono">{net.industryTrend}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* PHASE v46.0: AUTONOMOUS WORKFLOW ENGINE   */}
        {/* ========================================== */}
        {activeTab === 'v46_autonomous_wf' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-600" />
                <span>Phase v46.0 — JUMO TRUST Autonomous Workflow Engine</span>
              </h2>
              <p className="text-xs text-slate-500">
                Automated reviews, automated approvals, escalations, compliance workflows, and corrective action automation connected directly to the JUMO Workflow Engine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {AUTONOMOUS_WORKFLOWS_V46.map((wf) => (
                <div key={wf.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {wf.escalationStatus}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">24h Executions: {wf.actionsCount24h}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{wf.workflowName}</h3>
                  <p className="text-slate-500 text-[11px]"><strong className="text-slate-700">Trigger:</strong> {wf.triggerEvent}</p>
                  <p className="text-slate-600 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100"><strong className="text-slate-900">Rule:</strong> {wf.automationRule}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* PHASE v47.0: MOBILE EXECUTIVE PLATFORM     */}
        {/* ========================================== */}
        {activeTab === 'v47_mobile_exec' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-amber-600" />
                <span>Phase v47.0 — JUMO TRUST Mobile Executive & Auditor Platform</span>
              </h2>
              <p className="text-xs text-slate-500">
                Mobile application suites for Directors (institutional health & approvals), Digital Auditors (audit missions & evidence capture), and Field Inspectors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {MOBILE_APPS_V47.map((app) => (
                <div key={app.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {app.appStatus}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{app.activeUsers} Active Users</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{app.appName}</h3>
                  <p className="text-slate-500 text-[11px]"><strong className="text-slate-700">Role:</strong> {app.targetRole}</p>
                  <div className="space-y-1 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-700 block">Mobile Features:</span>
                    <ul className="list-disc pl-4 text-slate-600 text-[11px] space-y-0.5">
                      {app.keyFeatures.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* PHASE v48.0: GLOBAL TRUST EXCHANGE         */}
        {/* ========================================== */}
        {activeTab === 'v48_trust_exchange' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                <span>Phase v48.0 — JUMO TRUST Global Trust Exchange</span>
              </h2>
              <p className="text-xs text-slate-500">
                Trusted network of verified institution profiles, sovereign trust scores, certification records, compliance status, and partnership verification.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {GLOBAL_TRUST_EXCHANGE_V48.map((inst) => (
                <div key={inst.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {inst.certificationStatus}
                    </span>
                    <span className="text-[10px] font-mono text-amber-600 font-bold">{inst.assuranceGrade}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{inst.institutionName}</h3>
                  <p className="text-slate-500 text-[11px]"><strong className="text-slate-700">Sector:</strong> {inst.sector}</p>
                  <div className="p-2.5 bg-slate-50 rounded-xl font-mono text-[10px] flex justify-between">
                    <span>Trust Score:</span> <strong className="text-amber-700 text-xs">{inst.trustScore} / 100</strong>
                  </div>
                  <div className="p-2 bg-slate-900 text-slate-300 font-mono text-[9px] rounded-xl overflow-x-auto">
                    {inst.verificationHash}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* PHASE v49.0: ECOSYSTEM MARKETPLACE         */}
        {/* ========================================== */}
        {activeTab === 'v49_ecosystem' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Network className="w-5 h-5 text-amber-600" />
                <span>Phase v49.0 — JUMO TRUST Enterprise Marketplace & Ecosystem</span>
              </h2>
              <p className="text-xs text-slate-500">
                Ecosystem marketplace for audit templates, compliance packages, industry assurance modules, reporting standards, and governance frameworks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {ECOSYSTEM_MARKETPLACE_V49.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 font-bold">{item.priceModel}</span>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-sm">{item.title}</h3>
                    <p className="text-slate-500 text-[11px]"><strong className="text-slate-700">Publisher:</strong> {item.publisher}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between font-mono text-[10px] text-slate-600">
                    <span>Downloads: {item.downloadsCount}</span>
                    <span className="text-amber-600 font-bold">★ {item.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* COMPACT UNIVERSAL FOOTER */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-amber-400 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> JUMO TRUST v50.0 SOVEREIGN INSTITUTIONAL ASSURANCE PLATFORM
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">Context: {sectorTemplate.toUpperCase()}</span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-slate-400 text-[11px]">
          <span>FAAP Parity: $0.00</span>
          <span>Missions: 5 Live</span>
          <span>Alerts: {alertsList.filter((a) => !a.resolved).length} Unresolved</span>
          <span className="text-emerald-400 font-bold">Ring-0 Enforced</span>
        </div>
      </footer>

    </div>
  );
};

export default JumoTrustPlatform;
