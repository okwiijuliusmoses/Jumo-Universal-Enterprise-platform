/**
 * JUMO UEOS Central Governance State & Persistence Engine (Metadata Registry v13.1)
 */

export interface SystemComponent {
  id: string;
  category: 'Core' | 'Financial' | 'AI' | 'Experience' | 'Enterprise';
  name: string;
  status: 'ACTIVE' | 'DISABLED' | 'MAINTENANCE';
  version: string;
  dependencies: string[];
  allowedTenants: string; // 'All' | 'Restricted' | 'Enterprise Only'
  usageLimits: string;
  securityPolicy: string;
  ownerApprovalRequired: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  status: 'ACTIVE' | 'DISABLED';
  maintenanceReason?: string;
  affectedTenants?: string;
  group: 'governance' | 'identity' | 'security' | 'ai' | 'domains' | 'factories' | 'financial' | 'infrastructure' | 'marketplace' | 'innovation';
  order: number;
  icon: string; // Icon identifier
  routingPath: string;
  featureFlags: string[];
  visibility: {
    public: boolean;
    tenant: boolean;
    owner: boolean;
    internal: boolean;
  };
  permissions: {
    view: boolean;
    create: boolean;
    configure: boolean;
    approve: boolean;
    disable: boolean;
  };
}

export interface AIAgent {
  id: string;
  name: string;
  category: 'Financial' | 'Security' | 'Public' | 'Domain';
  status: 'ACTIVE' | 'DISABLED';
  usage: number;
  limit: number;
  costControl: boolean;
  tenantAccess: 'Global' | 'Restricted' | 'Domain Specific';
  knowledgeSources: string[];
  model: string;
  costLimitUSD: number;
  promptTemplate: string;
  memoryPolicy: string;
  automationTriggers: string[];
  approvalRules: string;
}

export interface FactoryCapability {
  name: string;
  status: 'ACTIVE' | 'DISABLED';
  templatesCount: number;
}

export interface FactoryPipeline {
  id: string;
  name: string;
  trigger: string;
  status: 'IDLE' | 'RUNNING' | 'FAILED' | 'COMPLETED';
}

export interface DigitalFactory {
  id: string;
  name: string;
  status: 'ACTIVE' | 'DISABLED' | 'MAINTENANCE';
  capabilities: string[];
  capabilitiesExpanded: FactoryCapability[];
  pipelines: FactoryPipeline[];
  versionHistory: { version: string; date: string; author: string; changes: string }[];
  generatedCount: number;
  monitoring: {
    cpuUsagePercent: number;
    memoryUsagePercent: number;
    activeBuilds: number;
  };
}

export interface ERPModuleTemplate {
  id: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'DISABLED';
  fields: string[];
}

export interface DomainEcosystem {
  id: string;
  name: string;
  displayName: string;
  icon: string; // lucide icon identifier
  status: 'AVAILABLE' | 'DISABLED' | 'PENDING';
  aiProfile: {
    agentId: string;
    modelName: string;
    promptTemplate: string;
    memoryPolicy: string;
  };
  workflowTemplate: {
    id: string;
    name: string;
    steps: string[];
    approvalPolicy: string;
  };
  erpModules: {
    id: string;
    name: string;
    description: string;
    status: 'ACTIVE' | 'DISABLED';
    config: Record<string, any>;
  }[];
  enabledServices: string[];
  onboardingPolicy: 'Auto-approve' | 'Manual Review' | 'MFA Restricted';
  approvalPolicy: 'Strict Single Owner' | 'Dual Consent' | 'Consensus Weighted';
  subscriptionOptions: {
    tier: string;
    priceUSD: number;
    billingCycle: string;
  }[];
  securityProfile: {
    isolationLevel: 'Schema-Level' | 'Database-Level' | 'Row-Level' | 'Hardware Sandbox';
    encryptionType: 'AES-256' | 'ChaCha20-Poly1305' | 'HSM Cryptographic Seal';
    compliancePostures: string[];
  };
  documentTemplates: string[];
  reportingTemplates: string[];
  analyticsTemplates: string[];
}

export interface TenantOrg {
  id: string;
  name: string;
  email: string;
  industry: string;
  domainTemplate: string;
  status: 'ACTIVE' | 'PENDING' | 'BLOCKED';
  riskScore: number; // 0 - 100
  registrationDate: string;
  activatedServices: string[];
  verificationDocuments: string[];
}

export interface RegistrationRules {
  requiredBusinessInfo: boolean;
  requiredVerificationDocs: boolean;
  requiredIndustrySelection: boolean;
  requiredDomainRequest: boolean;
  approvalMode: 'Automatic' | 'Manual' | 'Hybrid';
  riskAutoApproveMax: number;
  riskManualReviewMin: number;
}

export interface LedgerEntry {
  id: string;
  timestamp: string;
  debitAccount: string;
  creditAccount: string;
  amountUSD: number;
  description: string;
  tenantId: string;
  balanced: boolean;
}

export interface PlatformConfig {
  branding: {
    name: string;
    shortName: string;
    logoLetter: string;
    accentColor: string;
    theme: 'light' | 'dark' | 'hybrid';
  };
  footerSignature: {
    text: string;
    copyright: string;
    supportEmail: string;
    documentationUrl: string;
    apiVersion: string;
    buildVersion: string;
    systemSignature?: string;
    branch?: string;
    commit?: string;
    deploymentStatus?: string;
  };
  communicationChannels: {
    supportEmail: string;
    securityEmail: string;
    whatsapp: string;
    mobile: string;
    linkedin: string;
    twitter: string;
  };
  runtimeMode: 'Online' | 'Offline' | 'Hybrid' | 'Maintenance' | 'Disaster Recovery' | 'Demonstration' | 'Development' | 'Testing' | 'Production';
  deploymentEnvironment: 'Staging' | 'Production' | 'Sovereign-Cloud' | 'Local-Secure';
  apiStatus: 'NOMINAL' | 'DEGRADED' | 'MAINTENANCE';
  securityPolicies: {
    mfaLevel: string;
    sessionTimeoutMin: number;
    isolationLevel: string;
    encryptionAlgorithm: string;
    auditLogRetentionDays: number;
  };
  integrations: {
    erpEnabled: boolean;
    financialScoringEnabled: boolean;
    aiOrchestrationEnabled: boolean;
    paymentGateways: string[];
  };
}

// Default static lists corresponding to complete enterprise blueprints
export const INITIAL_COMPONENTS: SystemComponent[] = [
  // Core Platform
  { id: 'ueos-kernel', category: 'Core', name: 'UEOS Kernel', status: 'ACTIVE', version: '12.8.1-hardened', dependencies: [], allowedTenants: 'All', usageLimits: 'Infinite', securityPolicy: 'Level 5 Military Isolation', ownerApprovalRequired: true },
  { id: 'event-bus', category: 'Core', name: 'Event Bus', status: 'ACTIVE', version: '4.2.0', dependencies: ['ueos-kernel'], allowedTenants: 'All', usageLimits: '10,000 req/sec', securityPolicy: 'Signed Payload Verification', ownerApprovalRequired: false },
  { id: 'identity-engine', category: 'Core', name: 'Identity Engine', status: 'ACTIVE', version: '6.1.1', dependencies: ['ueos-kernel'], allowedTenants: 'All', usageLimits: 'Infinite', securityPolicy: 'Strict HSM Tokenization', ownerApprovalRequired: true },
  { id: 'multi-tenant-engine', category: 'Core', name: 'Multi-Tenant Engine', status: 'ACTIVE', version: '3.5.0', dependencies: ['ueos-kernel'], allowedTenants: 'All', usageLimits: 'Infinite', securityPolicy: 'Schema-level Isolation', ownerApprovalRequired: true },
  { id: 'policy-engine', category: 'Core', name: 'Policy Engine', status: 'ACTIVE', version: '2.1.0', dependencies: ['ueos-kernel'], allowedTenants: 'All', usageLimits: 'Infinite', securityPolicy: 'Real-time Policy Assertions', ownerApprovalRequired: true },
  { id: 'audit-engine', category: 'Core', name: 'Audit Engine', status: 'ACTIVE', version: '5.0.1', dependencies: ['event-bus'], allowedTenants: 'All', usageLimits: 'Infinite', securityPolicy: 'Immutable Append-Only Log', ownerApprovalRequired: true },

  // Financial Components
  { id: 'faap-core', category: 'Financial', name: 'FAAP scoring engine', status: 'ACTIVE', version: '12.4.2', dependencies: ['multi-tenant-engine'], allowedTenants: 'All', usageLimits: '5,000 calculations/day', securityPolicy: 'Zero-trust score computation', ownerApprovalRequired: true },
  { id: 'treasury-engine', category: 'Financial', name: 'Treasury Engine', status: 'ACTIVE', version: '9.3.0', dependencies: ['faap-core'], allowedTenants: 'Restricted', usageLimits: '$50M allocation limit', securityPolicy: 'Dual-signature authority required', ownerApprovalRequired: true },
  { id: 'ledger-core', category: 'Financial', name: 'Ledger Engine', status: 'ACTIVE', version: '7.1.0', dependencies: ['ueos-kernel'], allowedTenants: 'All', usageLimits: 'Infinite', securityPolicy: 'Double-entry cryptographically signed', ownerApprovalRequired: true },
  { id: 'revenue-router', category: 'Financial', name: 'Revenue Router', status: 'ACTIVE', version: '3.0.0', dependencies: ['ledger-core'], allowedTenants: 'All', usageLimits: 'No limit', securityPolicy: 'Encrypted Routing', ownerApprovalRequired: false },
  { id: 'billing-engine', category: 'Financial', name: 'Billing Engine', status: 'ACTIVE', version: '4.1.0', dependencies: ['ledger-core'], allowedTenants: 'All', usageLimits: 'Infinite', securityPolicy: 'Automated invoice signing', ownerApprovalRequired: false },
  { id: 'payment-gateway', category: 'Financial', name: 'Payment Gateway', status: 'ACTIVE', version: '5.2.0', dependencies: ['event-bus'], allowedTenants: 'All', usageLimits: 'No limits', securityPolicy: 'PCI-DSS Compliant Isolation', ownerApprovalRequired: true },

  // AI Components
  { id: 'jumo-ai-core', category: 'AI', name: 'JUMO AI Core', status: 'ACTIVE', version: '1.2.0', dependencies: ['ueos-kernel'], allowedTenants: 'All', usageLimits: '200,000 tokens/min', securityPolicy: 'Private LLM Gateway Proxy', ownerApprovalRequired: true },
  { id: 'ai-agents-orch', category: 'AI', name: 'AI Agents Orchestration', status: 'ACTIVE', version: '2.0.1', dependencies: ['jumo-ai-core'], allowedTenants: 'All', usageLimits: '14 Specialized Agents', securityPolicy: 'Sovereign Context Pinning', ownerApprovalRequired: false },
  { id: 'agent-marketplace', category: 'AI', name: 'Agent Marketplace', status: 'ACTIVE', version: '1.0.0', dependencies: ['ai-agents-orch'], allowedTenants: 'All', usageLimits: 'No limits', securityPolicy: 'Code-vetted AI deployments', ownerApprovalRequired: true },
  { id: 'ai-knowledge-engine', category: 'AI', name: 'AI Knowledge Engine', status: 'ACTIVE', version: '3.1.2', dependencies: ['jumo-ai-core'], allowedTenants: 'All', usageLimits: '50GB vector space', securityPolicy: 'Multi-tenant index isolation', ownerApprovalRequired: false },
  { id: 'ai-governance', category: 'AI', name: 'AI Governance', status: 'ACTIVE', version: '1.5.0', dependencies: ['jumo-ai-core'], allowedTenants: 'All', usageLimits: 'Infinite checks', securityPolicy: 'Toxicity and Leakage filters', ownerApprovalRequired: true },

  // Experience Components
  { id: 'public-portal', category: 'Experience', name: 'Public Portal', status: 'ACTIVE', version: '12.8.0', dependencies: ['ueos-kernel'], allowedTenants: 'All', usageLimits: 'No limit', securityPolicy: 'WAF Guarded Read-Only', ownerApprovalRequired: false },
  { id: 'tenant-portal', category: 'Experience', name: 'Tenant Portal', status: 'ACTIVE', version: '12.8.0', dependencies: ['multi-tenant-engine'], allowedTenants: 'All', usageLimits: 'No limit', securityPolicy: 'OAuth Federated Session', ownerApprovalRequired: false },
  { id: 'owner-console', category: 'Experience', name: 'Owner Console', status: 'ACTIVE', version: '12.8.0', dependencies: ['ueos-kernel', 'policy-engine'], allowedTenants: 'Restricted', usageLimits: 'Owner access only', securityPolicy: 'Strict Hardware Key MFA', ownerApprovalRequired: true },
  { id: 'advertising-centre', category: 'Experience', name: 'Advertising Centre', status: 'ACTIVE', version: '2.5.0', dependencies: ['public-portal'], allowedTenants: 'All', usageLimits: 'No limits', securityPolicy: 'Vetted uploads only', ownerApprovalRequired: false },
  { id: 'communication-centre', category: 'Experience', name: 'Communication Centre', status: 'ACTIVE', version: '4.1.0', dependencies: ['event-bus'], allowedTenants: 'All', usageLimits: 'No limits', securityPolicy: 'TLS E2E Encrypted', ownerApprovalRequired: false },
  { id: 'chatbot-assistant', category: 'Experience', name: 'Chatbot Assistant', status: 'ACTIVE', version: '3.0.1', dependencies: ['jumo-ai-core'], allowedTenants: 'All', usageLimits: '10,000 sessions/day', securityPolicy: 'Isolated sandbox conversation', ownerApprovalRequired: false },

  // Enterprise Components
  { id: 'workflow-engine', category: 'Enterprise', name: 'Workflow Engine', status: 'ACTIVE', version: '8.4.1', dependencies: ['event-bus'], allowedTenants: 'All', usageLimits: '100,000 steps/day', securityPolicy: 'Sealed Rule Executor', ownerApprovalRequired: true },
  { id: 'document-engine', category: 'Enterprise', name: 'Document Engine', status: 'ACTIVE', version: '3.2.0', dependencies: ['ueos-kernel'], allowedTenants: 'All', usageLimits: '20,000 docs/day', securityPolicy: 'At-rest cryptographically signed', ownerApprovalRequired: false },
  { id: 'reporting-engine', category: 'Enterprise', name: 'Reporting Engine', status: 'ACTIVE', version: '5.1.0', dependencies: ['multi-tenant-engine'], allowedTenants: 'All', usageLimits: 'No limits', securityPolicy: 'Isolated read-replica query', ownerApprovalRequired: false },
  { id: 'notification-engine', category: 'Enterprise', name: 'Notification Engine', status: 'ACTIVE', version: '4.0.0', dependencies: ['event-bus'], allowedTenants: 'All', usageLimits: '1,000,000 emails/day', securityPolicy: 'Whitelisted templates only', ownerApprovalRequired: false },
  { id: 'integration-engine', category: 'Enterprise', name: 'Integration Engine', status: 'ACTIVE', version: '2.8.0', dependencies: ['event-bus'], allowedTenants: 'All', usageLimits: '10,000 syncs/sec', securityPolicy: 'Mutual TLS API Gateways', ownerApprovalRequired: true }
];

export const INITIAL_NAVIGATION: NavigationItem[] = [
  {
    id: 'owner',
    label: 'Owner Console',
    status: 'ACTIVE',
    group: 'governance',
    order: 1,
    icon: 'Server',
    routingPath: '/owner',
    featureFlags: [],
    visibility: { public: false, tenant: false, owner: true, internal: false },
    permissions: { view: true, create: true, configure: true, approve: true, disable: true }
  },
  {
    id: 'security',
    label: 'AEGIS Security',
    status: 'ACTIVE',
    group: 'security',
    order: 2,
    icon: 'Shield',
    routingPath: '/security',
    featureFlags: [],
    visibility: { public: false, tenant: false, owner: true, internal: true },
    permissions: { view: true, create: true, configure: true, approve: true, disable: true }
  },
  {
    id: 'ai-platform',
    label: 'AI Platform',
    status: 'ACTIVE',
    group: 'ai',
    order: 3,
    icon: 'Brain',
    routingPath: '/ai-platform',
    featureFlags: ['AI_ENABLED'],
    visibility: { public: true, tenant: true, owner: true, internal: true },
    permissions: { view: true, create: true, configure: true, approve: true, disable: true }
  },
  {
    id: 'domains',
    label: 'Domains Ecosystem',
    status: 'ACTIVE',
    group: 'domains',
    order: 4,
    icon: 'Layers',
    routingPath: '/domains',
    featureFlags: ['DOMAINS_ENABLED'],
    visibility: { public: true, tenant: true, owner: true, internal: true },
    permissions: { view: true, create: true, configure: true, approve: true, disable: true }
  },
  {
    id: 'factories',
    label: 'Digital Factories',
    status: 'ACTIVE',
    group: 'factories',
    order: 5,
    icon: 'Cpu',
    routingPath: '/sovereign',
    featureFlags: ['FACTORIES_ENABLED'],
    visibility: { public: false, tenant: true, owner: true, internal: true },
    permissions: { view: true, create: true, configure: true, approve: true, disable: true }
  },
  {
    id: 'faap',
    label: 'FAAP Core',
    status: 'ACTIVE',
    group: 'financial',
    order: 6,
    icon: 'DollarSign',
    routingPath: '/faap',
    featureFlags: [],
    visibility: { public: false, tenant: true, owner: true, internal: true },
    permissions: { view: true, create: true, configure: true, approve: true, disable: true }
  },
  {
    id: 'treasury',
    label: 'Treasury Core',
    status: 'ACTIVE',
    group: 'financial',
    order: 7,
    icon: 'Wallet',
    routingPath: '/treasury',
    featureFlags: ['FINANCIAL_ENABLED'],
    visibility: { public: false, tenant: true, owner: true, internal: true },
    permissions: { view: true, create: true, configure: true, approve: true, disable: true }
  },
  {
    id: 'fintech',
    label: 'FinTech Core',
    status: 'ACTIVE',
    group: 'financial',
    order: 8,
    icon: 'Globe',
    routingPath: '/fintech',
    featureFlags: [],
    visibility: { public: false, tenant: true, owner: true, internal: true },
    permissions: { view: true, create: true, configure: true, approve: true, disable: true }
  },
  {
    id: 'marketplace',
    label: 'Marketplace',
    status: 'ACTIVE',
    group: 'marketplace',
    order: 9,
    icon: 'Sparkles',
    routingPath: '/marketplace',
    featureFlags: ['MARKETPLACE_ENABLED'],
    visibility: { public: true, tenant: true, owner: true, internal: true },
    permissions: { view: true, create: true, configure: true, approve: false, disable: true }
  },
  {
    id: 'dirc',
    label: 'DIRC Innovation',
    status: 'ACTIVE',
    group: 'innovation',
    order: 10,
    icon: 'Activity',
    routingPath: '/dirc',
    featureFlags: [],
    visibility: { public: true, tenant: true, owner: true, internal: true },
    permissions: { view: true, create: true, configure: true, approve: true, disable: true }
  },
  {
    id: 'documentation',
    label: 'Architecture Docs',
    status: 'ACTIVE',
    group: 'innovation',
    order: 11,
    icon: 'FileText',
    routingPath: '/documentation',
    featureFlags: [],
    visibility: { public: true, tenant: true, owner: true, internal: true },
    permissions: { view: true, create: false, configure: false, approve: false, disable: false }
  }
];

export const INITIAL_AI_AGENTS: AIAgent[] = [
  { 
    id: 'fin-ai', 
    name: 'Financial AI Agent', 
    category: 'Financial', 
    status: 'ACTIVE', 
    usage: 82140, 
    limit: 100000, 
    costControl: true, 
    tenantAccess: 'Global', 
    knowledgeSources: ['FAAP Ledger Guidelines v12', 'Ecosystem Baseline Standards'], 
    model: 'JUMO AI Enterprise Engine', 
    costLimitUSD: 500,
    promptTemplate: 'You are an expert dual-entry FAAP sovereign ledger audit agent. Verify all debits and credits.',
    memoryPolicy: 'Sliding Session Window (10 turns)',
    automationTriggers: ['on_ledger_write', 'on_disbursement_request'],
    approvalRules: 'Requires second owner signature if allocation exceeds $50,000'
  },
  { 
    id: 'sec-ai', 
    name: 'Security AI Agent', 
    category: 'Security', 
    status: 'ACTIVE', 
    usage: 4501, 
    limit: 10000, 
    costControl: true, 
    tenantAccess: 'Restricted', 
    knowledgeSources: ['AEGIS Firewall Signatures', 'SIEM Anomaly DB'], 
    model: 'JUMO AI Enterprise Engine', 
    costLimitUSD: 200,
    promptTemplate: 'You are AEGIS intelligence. Monitor API packet signatures and enforce zero-trust isolation boundaries.',
    memoryPolicy: 'Stateless Token Enforcement',
    automationTriggers: ['on_mfa_failure', 'on_anomalous_ip_detected'],
    approvalRules: 'Auto-block IP, notify security admin immediately'
  },
  { 
    id: 'pub-ai', 
    name: 'Public AI Assistant', 
    category: 'Public', 
    status: 'ACTIVE', 
    usage: 9102, 
    limit: 10000, 
    costControl: true, 
    tenantAccess: 'Global', 
    knowledgeSources: ['Public Showcase documentation', 'JUMO News releases'], 
    model: 'JUMO AI Flash Engine', 
    costLimitUSD: 100,
    promptTemplate: 'You are a professional assistant greeting public visitors. Help them select the right ERP templates.',
    memoryPolicy: 'Single Session Memory',
    automationTriggers: ['on_public_chat_init'],
    approvalRules: 'Auto-reply, no restricted internal metrics disclosure'
  },
  { 
    id: 'banking-ai', 
    name: 'Banking AI Agent', 
    category: 'Domain', 
    status: 'ACTIVE', 
    usage: 14210, 
    limit: 50000, 
    costControl: false, 
    tenantAccess: 'Domain Specific', 
    knowledgeSources: ['Sovereign Banking Acts', 'Fintech Wallet Standards'], 
    model: 'JUMO AI Enterprise Engine', 
    costLimitUSD: 300,
    promptTemplate: 'Analyze commercial micro-savings portfolios and perform risk scores for auto-approval underwriting.',
    memoryPolicy: 'Sovereign Secure Database Sync',
    automationTriggers: ['on_loan_application'],
    approvalRules: 'Auto-approve loans with FAAP scores > 75'
  }
];

export const INITIAL_FACTORIES: DigitalFactory[] = [
  { 
    id: 'software-factory', 
    name: 'Software Factory', 
    status: 'ACTIVE', 
    capabilities: ['Generate Applications', 'Generate APIs', 'Generate Modules'], 
    generatedCount: 41,
    capabilitiesExpanded: [
      { name: 'Application Boilerplate Generator', status: 'ACTIVE', templatesCount: 15 },
      { name: 'FastAPI Code Injector', status: 'ACTIVE', templatesCount: 8 },
      { name: 'React Component Assembler', status: 'ACTIVE', templatesCount: 22 }
    ],
    pipelines: [
      { id: 'sf_p_01', name: 'Build Core Microservices', trigger: 'Git Release', status: 'COMPLETED' },
      { id: 'sf_p_02', name: 'Lint and Test Components', trigger: 'Webhook Call', status: 'IDLE' }
    ],
    versionHistory: [
      { version: 'v3.2.1', date: '2026-07-20', author: 'Sovereign Owner', changes: 'Upgraded Node build engines' },
      { version: 'v3.2.0', date: '2026-06-15', author: 'Dev Engineer', changes: 'Added React 19 template' }
    ],
    monitoring: { cpuUsagePercent: 12, memoryUsagePercent: 24, activeBuilds: 0 }
  },
  { 
    id: 'ai-factory', 
    name: 'AI Factory', 
    status: 'ACTIVE', 
    capabilities: ['Create AI Agents', 'Train Domain Models'], 
    generatedCount: 14,
    capabilitiesExpanded: [
      { name: 'Model Fine-Tuning Pipeline', status: 'ACTIVE', templatesCount: 4 },
      { name: 'Prompt Template Compiler', status: 'ACTIVE', templatesCount: 10 }
    ],
    pipelines: [
      { id: 'ai_p_01', name: 'Fine-tune banking-model-v2', trigger: 'Cron Schedule', status: 'COMPLETED' }
    ],
    versionHistory: [
      { version: 'v1.4.0', date: '2026-07-10', author: 'AI Architect', changes: 'Integrated JUMO AI Enterprise Engine fine-tuning API' }
    ],
    monitoring: { cpuUsagePercent: 88, memoryUsagePercent: 92, activeBuilds: 1 }
  },
  { 
    id: 'website-factory', 
    name: 'Website Factory', 
    status: 'ACTIVE', 
    capabilities: ['Generate Public Portals', 'Generate Tenant Sites'], 
    generatedCount: 8,
    capabilitiesExpanded: [
      { name: 'Static SPA Renderer', status: 'ACTIVE', templatesCount: 6 },
      { name: 'Dynamic Landing Assembler', status: 'ACTIVE', templatesCount: 12 }
    ],
    pipelines: [],
    versionHistory: [],
    monitoring: { cpuUsagePercent: 5, memoryUsagePercent: 15, activeBuilds: 0 }
  },
  { 
    id: 'mobile-factory', 
    name: 'Mobile Factory', 
    status: 'ACTIVE', 
    capabilities: ['Build iOS Assets', 'Build Android SDKs'], 
    generatedCount: 4,
    capabilitiesExpanded: [
      { name: 'Kotlin Native Builder', status: 'ACTIVE', templatesCount: 3 },
      { name: 'Capacitor Wrapper Engine', status: 'ACTIVE', templatesCount: 2 }
    ],
    pipelines: [],
    versionHistory: [],
    monitoring: { cpuUsagePercent: 0, memoryUsagePercent: 0, activeBuilds: 0 }
  },
  { 
    id: 'document-factory', 
    name: 'Document Factory', 
    status: 'ACTIVE', 
    capabilities: ['PDF Secure Seals', 'ISO Format Standardizer'], 
    generatedCount: 310,
    capabilitiesExpanded: [
      { name: 'Cryptographic PDF Signer', status: 'ACTIVE', templatesCount: 5 },
      { name: 'Corporate Invoice Formatter', status: 'ACTIVE', templatesCount: 18 }
    ],
    pipelines: [],
    versionHistory: [],
    monitoring: { cpuUsagePercent: 3, memoryUsagePercent: 8, activeBuilds: 0 }
  },
  { 
    id: 'integration-factory', 
    name: 'Integration Factory', 
    status: 'ACTIVE', 
    capabilities: ['Webhook Dispatchers', 'mTLS Gateway Bindings'], 
    generatedCount: 89,
    capabilitiesExpanded: [
      { name: 'mTLS Client Proxy Builder', status: 'ACTIVE', templatesCount: 4 },
      { name: 'Webhook Event Dispatcher', status: 'ACTIVE', templatesCount: 11 }
    ],
    pipelines: [],
    versionHistory: [],
    monitoring: { cpuUsagePercent: 2, memoryUsagePercent: 11, activeBuilds: 0 }
  },
  { 
    id: 'deployment-factory', 
    name: 'Deployment Factory', 
    status: 'ACTIVE', 
    capabilities: ['Cloud Run Packing', 'Kubernetes Helm Assembler'], 
    generatedCount: 15,
    capabilitiesExpanded: [
      { name: 'Docker Multi-Stage Packager', status: 'ACTIVE', templatesCount: 5 },
      { name: 'Helm sovereign release deployer', status: 'ACTIVE', templatesCount: 3 }
    ],
    pipelines: [],
    versionHistory: [],
    monitoring: { cpuUsagePercent: 1, memoryUsagePercent: 5, activeBuilds: 0 }
  },
  { 
    id: 'automation-factory', 
    name: 'Automation Factory', 
    status: 'ACTIVE', 
    capabilities: ['Create Workflows', 'Create Business Rules'], 
    generatedCount: 57,
    capabilitiesExpanded: [
      { name: 'DAG Workflow Compiler', status: 'ACTIVE', templatesCount: 12 },
      { name: 'DSL Business Rule Interpreter', status: 'ACTIVE', templatesCount: 25 }
    ],
    pipelines: [
      { id: 'aut_p_01', name: 'Compile Global Business Rules', trigger: 'Admin Force', status: 'COMPLETED' }
    ],
    versionHistory: [],
    monitoring: { cpuUsagePercent: 10, memoryUsagePercent: 18, activeBuilds: 0 }
  }
];

// All 21 Authorized JUMO Domains with Extended Config Profiles
export const INITIAL_DOMAINS: DomainEcosystem[] = [
  {
    id: 'banking',
    name: 'Banking',
    displayName: 'Sovereign Banking Core',
    icon: 'Landmark',
    status: 'AVAILABLE',
    aiProfile: {
      agentId: 'banking-ai',
      modelName: 'JUMO AI Enterprise Engine',
      promptTemplate: 'Analyze commercial micro-savings portfolios and perform risk scores for auto-approval underwriting.',
      memoryPolicy: 'Secure Sync Window'
    },
    workflowTemplate: {
      id: 'banking_wf',
      name: 'Credit Underwriting Pipeline',
      steps: ['Risk Scoring Engine Check', 'HSM Vault Lock Seal', 'Disbursement Routing', 'Double-Entry Reconciliation'],
      approvalPolicy: 'Strict Dual Consent'
    },
    erpModules: [
      { id: 'b_mod_01', name: 'Deposits Ledger', description: 'Handles deposit bookkeeping and double-entry savings postings.', status: 'ACTIVE', config: { interestRate: 4.5, allowOverdraft: false } },
      { id: 'b_mod_02', name: 'Loans Manager', description: 'Underwrite, record, and track interest and repayments.', status: 'ACTIVE', config: { maxLtv: 80, defaultGraceDays: 5 } },
      { id: 'b_mod_03', name: 'Payments Switch', description: 'Real-time clearing routing for interbank settlement rails.', status: 'ACTIVE', config: { routeTimeoutMs: 1500, maxLimit: 1000000 } },
      { id: 'b_mod_04', name: 'Treasury Reserves', description: 'Allocates sovereign fund liquidity across global accounts.', status: 'ACTIVE', config: { reserveRatio: 15 } }
    ],
    enabledServices: ['Financial Services', 'AI Services', 'Business ERP'],
    onboardingPolicy: 'Manual Review',
    approvalPolicy: 'Dual Consent',
    subscriptionOptions: [
      { tier: 'Community FinTech', priceUSD: 150, billingCycle: 'Monthly' },
      { tier: 'Commercial Sovereign', priceUSD: 1200, billingCycle: 'Monthly' }
    ],
    securityProfile: {
      isolationLevel: 'Hardware Sandbox',
      encryptionType: 'HSM Cryptographic Seal',
      compliancePostures: ['PCI-DSS Level 1', 'Basel III Liquidity Rules']
    },
    documentTemplates: ['Sovereign Loan Agreement.pdf', 'Depositor Term Conditions.docx'],
    reportingTemplates: ['Treasury Position Ledger.xlsx', 'FAAP Portfolio Risk Summary.xlsx'],
    analyticsTemplates: ['Default Probability Heatmap', 'Liquidity Stress Simulator']
  },
  {
    id: 'sacco',
    name: 'SACCO',
    displayName: 'SACCO & Microfinance Ledger',
    icon: 'Wallet',
    status: 'AVAILABLE',
    aiProfile: {
      agentId: 'fin-ai',
      modelName: 'JUMO AI Enterprise Engine',
      promptTemplate: 'Analyze SACCO community credit groups and evaluate guarantor circles.',
      memoryPolicy: 'Community Circle Trust'
    },
    workflowTemplate: {
      id: 'sacco_wf',
      name: 'Guarantor Voting Pipeline',
      steps: ['Verify Share Capital Threshold', 'Request Co-Guarantor Signatures', 'Check Micro-Credit Portfolio Caps'],
      approvalPolicy: 'Strict Single Owner'
    },
    erpModules: [
      { id: 'sc_mod_01', name: 'Member Shares Ledger', description: 'Manages member contributions, dividend weights, and share splits.', status: 'ACTIVE', config: { minShareCapitalUSD: 50 } },
      { id: 'sc_mod_02', name: 'Guarantor Matrix', description: 'Tracks guarantor backing thresholds and cross-liability risks.', status: 'ACTIVE', config: { maxGuarantorsPerLoan: 4 } },
      { id: 'sc_mod_03', name: 'Emergency Micro-Loans', description: 'Auto-disburses small liquidity requests within limits.', status: 'ACTIVE', config: { limitUSD: 500, apr: 12 } }
    ],
    enabledServices: ['Financial Services', 'Business ERP'],
    onboardingPolicy: 'Auto-approve',
    approvalPolicy: 'Strict Single Owner',
    subscriptionOptions: [
      { tier: 'Micro SACCO Basic', priceUSD: 45, billingCycle: 'Monthly' },
      { tier: 'National Cooperative Tier', priceUSD: 300, billingCycle: 'Monthly' }
    ],
    securityProfile: {
      isolationLevel: 'Schema-Level',
      encryptionType: 'AES-256',
      compliancePostures: ['Cooperative Societies Act', 'Local AML Thresholds']
    },
    documentTemplates: ['Guarantor Indemnity Agreement.pdf', 'Savings Split Form.xlsx'],
    reportingTemplates: ['Monthly Dividend Allocation.xlsx', 'Guarantor Exposure Map.xlsx'],
    analyticsTemplates: ['Dynamic Peer Default Rate', 'Savings-to-Loan Ratio Tracker']
  },
  {
    id: 'insurance',
    name: 'Insurance',
    displayName: 'Sovereign Underwriting Core',
    icon: 'ShieldCheck',
    status: 'AVAILABLE',
    aiProfile: {
      agentId: 'sec-ai',
      modelName: 'JUMO AI Enterprise Engine',
      promptTemplate: 'Verify claim documents against dynamic risk guidelines using OCR verification summaries.',
      memoryPolicy: 'Strict Isolation'
    },
    workflowTemplate: {
      id: 'ins_wf',
      name: 'Claim Liquidation Pipeline',
      steps: ['Anomaly Check', 'Deductible Valuation Check', 'Reinsurance Allocation', 'Disbursement Approval'],
      approvalPolicy: 'Consensus Weighted'
    },
    erpModules: [
      { id: 'i_mod_01', name: 'Premium Underwriting', description: 'Configures actuarial premium schedules based on dynamic risk factors.', status: 'ACTIVE', config: { basePremiumUSD: 10 } },
      { id: 'i_mod_02', name: 'Claims Verification', description: 'Coordinates secure claims tracking and automated ledger liquidations.', status: 'ACTIVE', config: { autoClaimThresholdUSD: 200 } },
      { id: 'i_mod_03', name: 'Reinsurance Pool Router', description: 'Splits premium risks into shared sovereign global reinsurer funds.', status: 'ACTIVE', config: { poolSplitPercent: 40 } }
    ],
    enabledServices: ['Financial Services', 'AI Services'],
    onboardingPolicy: 'MFA Restricted',
    approvalPolicy: 'Consensus Weighted',
    subscriptionOptions: [
      { tier: 'Sovereign Reinsurer Core', priceUSD: 2500, billingCycle: 'Monthly' }
    ],
    securityProfile: {
      isolationLevel: 'Database-Level',
      encryptionType: 'ChaCha20-Poly1305',
      compliancePostures: ['Solvency II Solvency Standards', 'IAIS Core Principles']
    },
    documentTemplates: ['Dynamic Actuarial Policy Contract.pdf'],
    reportingTemplates: ['Claims Loss Ratio Statement.xlsx'],
    analyticsTemplates: ['Actuarial Curve Projection', 'Catastrophic Loss Simulator']
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    displayName: 'Clinical Health ERP',
    icon: 'Activity',
    status: 'AVAILABLE',
    aiProfile: {
      agentId: 'sec-ai',
      modelName: 'JUMO AI Enterprise Engine',
      promptTemplate: 'Ensure medical files conform to strictly restricted encryption and patient anonymity policies.',
      memoryPolicy: 'Stateless Token Enforcement'
    },
    workflowTemplate: {
      id: 'hc_wf',
      name: 'Patient Visit and Billing Pipeline',
      steps: ['Intake EHR Register', 'Clinic Fee Routing', 'Co-Pay Insurance Validation', 'Double-Entry Settlement'],
      approvalPolicy: 'Strict Single Owner'
    },
    erpModules: [
      { id: 'h_mod_01', name: 'Patient EHR Records', description: 'Sealed database for secure health status, diagnoses, and prescriptions.', status: 'ACTIVE', config: { anonymizeData: true } },
      { id: 'h_mod_02', name: 'Medical Invoicing', description: 'Calculates clinic visits, ward charges, and pharmaceutical orders.', status: 'ACTIVE', config: { includeTax: false } },
      { id: 'h_mod_03', name: 'Pharmacy Dispensing', description: 'Inventory management and double-entry sales books for prescription drugs.', status: 'ACTIVE', config: { restrictDangerousDrugs: true } }
    ],
    enabledServices: ['Business ERP', 'AI Services'],
    onboardingPolicy: 'Manual Review',
    approvalPolicy: 'Strict Single Owner',
    subscriptionOptions: [
      { tier: 'Clinic Sovereign Pack', priceUSD: 180, billingCycle: 'Monthly' },
      { tier: 'Hospital Consolidated ERP', priceUSD: 950, billingCycle: 'Monthly' }
    ],
    securityProfile: {
      isolationLevel: 'Hardware Sandbox',
      encryptionType: 'HSM Cryptographic Seal',
      compliancePostures: ['HIPAA Protected Information', 'Local Medical Council Directives']
    },
    documentTemplates: ['Patient Intake Consent.pdf', 'Clinic Discharge Slip.docx'],
    reportingTemplates: ['Pharmacy Inventory Audit.xlsx', 'Monthly Copay Settlement.xlsx'],
    analyticsTemplates: ['Clinic Throughput Metrics', 'Epidemiological Heatmap']
  },
  {
    id: 'education',
    name: 'Education',
    displayName: 'Academy ERP Portal',
    icon: 'BookOpen',
    status: 'AVAILABLE',
    aiProfile: {
      agentId: 'pub-ai',
      modelName: 'JUMO AI Flash Engine',
      promptTemplate: 'Assist educators and student managers in deploying standardized grading and tuition templates.',
      memoryPolicy: 'Single Session Memory'
    },
    workflowTemplate: {
      id: 'edu_wf',
      name: 'Scholarship Grant Allocation Pipeline',
      steps: ['Verify Academic GPA threshold', 'Check Endowment Pool Allocation Limits', 'Disburse to Student Accounts'],
      approvalPolicy: 'Strict Single Owner'
    },
    erpModules: [
      { id: 'e_mod_01', name: 'Tuition Invoicing', description: 'Automates quarterly student billing, arrears notifications, and installment plans.', status: 'ACTIVE', config: { lateFeePercent: 1.5, installmentOptions: true } },
      { id: 'e_mod_02', name: 'Academic Records', description: 'Standardized student gradebook, transcripts, and degree registries.', status: 'ACTIVE', config: { enableBlockchainVerify: false } },
      { id: 'e_mod_03', name: 'Scholarship Allocator', description: 'Tracks university grant balances and distributes fundings.', status: 'ACTIVE', config: { maxScholarships: 500 } }
    ],
    enabledServices: ['Business ERP', 'AI Services', 'Communication'],
    onboardingPolicy: 'Auto-approve',
    approvalPolicy: 'Strict Single Owner',
    subscriptionOptions: [
      { tier: 'Academy Basic', priceUSD: 85, billingCycle: 'Monthly' },
      { tier: 'University Enterprise', priceUSD: 550, billingCycle: 'Monthly' }
    ],
    securityProfile: {
      isolationLevel: 'Row-Level',
      encryptionType: 'AES-256',
      compliancePostures: ['FERPA Privacy Guidelines', 'Ministry of Education Mandates']
    },
    documentTemplates: ['Student Matriculation Letter.docx', 'Official Academic Transcript.pdf'],
    reportingTemplates: ['Tuition Aging Ledger.xlsx', 'Endowment Disbursement Summary.xlsx'],
    analyticsTemplates: ['Student Cohort Progression', 'Tuition Collection Stress Curve']
  },
  {
    id: 'government',
    name: 'Government',
    displayName: 'Public Sector Treasury',
    icon: 'Globe',
    status: 'AVAILABLE',
    aiProfile: {
      agentId: 'sec-ai',
      modelName: 'JUMO AI Enterprise Engine',
      promptTemplate: 'Audit state agency disbursements and ensure adherence to national budget ceilings.',
      memoryPolicy: 'Strict Isolation'
    },
    workflowTemplate: {
      id: 'gov_wf',
      name: 'Sovereign Grant Release',
      steps: ['Budget Authority Check', 'State Treasury Dual Authorization', 'Disbursement Release Routing', 'Auditor General Sealed Receipt'],
      approvalPolicy: 'Dual Consent'
    },
    erpModules: [
      { id: 'g_mod_01', name: 'Sovereign Fund Routing', description: 'Routes treasury-pool allocations directly into local development accounts.', status: 'ACTIVE', config: { routingThresholdUSD: 500000 } },
      { id: 'g_mod_02', name: 'Municipal Ledger', description: 'Tracks public collections, developmental budgets, and agency expenses.', status: 'ACTIVE', config: { publicViewEnabled: true } },
      { id: 'g_mod_03', name: 'Grants Disbursement', description: 'Coordinates social welfare disbursements and cooperative grants.', status: 'ACTIVE', config: { dailyDisbLimitUSD: 2000000 } }
    ],
    enabledServices: ['Financial Services', 'Business ERP', 'AI Services'],
    onboardingPolicy: 'MFA Restricted',
    approvalPolicy: 'Dual Consent',
    subscriptionOptions: [
      { tier: 'State Agency Core', priceUSD: 5000, billingCycle: 'Monthly' }
    ],
    securityProfile: {
      isolationLevel: 'Hardware Sandbox',
      encryptionType: 'HSM Cryptographic Seal',
      compliancePostures: ['Public Finance Management Act', 'Auditor General Regulations']
    },
    documentTemplates: ['Sovereign Warrant Release.pdf', 'Sovereign Audit Log Receipt.pdf'],
    reportingTemplates: ['State Budget Performance.xlsx', 'Agency Expense Breakdown.xlsx'],
    analyticsTemplates: ['Public Expenditure Heatmap', 'National Reserves Pool stress simulation']
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    displayName: 'Agri-Cooperative Network',
    icon: 'Layers',
    status: 'AVAILABLE',
    aiProfile: {
      agentId: 'pub-ai',
      modelName: 'JUMO AI Flash Engine',
      promptTemplate: 'Analyze local crop yield estimations and coordinate harvest inventory logistics.',
      memoryPolicy: 'Single Session Memory'
    },
    workflowTemplate: {
      id: 'agri_wf',
      name: 'Agri-Credit Disbursement',
      steps: ['Cooperative Membership Verification', 'Assess Seed Sowing Acreage', 'Disburse Seed Grant Funds', 'Reconcile on Harvest Share'],
      approvalPolicy: 'Strict Single Owner'
    },
    erpModules: [
      { id: 'ag_mod_01', name: 'Cooperative Inventory', description: 'Tracks warehouse stocks for grains, fertilizers, and logistics assets.', status: 'ACTIVE', config: { grainSiloCapMetricTons: 5000 } },
      { id: 'ag_mod_02', name: 'Yield Tracking', description: 'Calculates dynamic sowing-to-harvest schedules and projected returns.', status: 'ACTIVE', config: { defaultYieldRatio: 3.5 } },
      { id: 'ag_mod_03', name: 'Agri-Credit Advances', description: 'Manages fertilizer advance loans and member harvest dividends.', status: 'ACTIVE', config: { maxAdvancePercent: 30 } }
    ],
    enabledServices: ['Business ERP'],
    onboardingPolicy: 'Auto-approve',
    approvalPolicy: 'Strict Single Owner',
    subscriptionOptions: [
      { tier: 'Agri-Cooperative Standard', priceUSD: 40, billingCycle: 'Monthly' }
    ],
    securityProfile: {
      isolationLevel: 'Row-Level',
      encryptionType: 'AES-256',
      compliancePostures: ['Cooperative Agricultural Guidelines', 'Local FairTrade Standards']
    },
    documentTemplates: ['Grain Warehouse Receipt.pdf', 'AgriCredit Advance Agreement.docx'],
    reportingTemplates: ['Warehouse Stock Valuation.xlsx', 'Co-op Loan Arrears.xlsx'],
    analyticsTemplates: ['Harvest Yield Stress Projection', 'Fertilizer Demand Optimization']
  },

  // Remaining 14 Configurable Sovereign Domains to hit all 21 JUMO Domains!
  {
    id: 'insurance_sec',
    name: 'Insurance_Secondary',
    displayName: 'Commercial Reinsurance Platform',
    icon: 'ShieldAlert',
    status: 'AVAILABLE',
    aiProfile: { agentId: 'sec-ai', modelName: 'JUMO AI Enterprise Engine', promptTemplate: 'Assess risk thresholds on commercial pools.', memoryPolicy: 'Strict' },
    workflowTemplate: { id: 'wf_reins', name: 'Reinsurance Valuation', steps: ['Valuate Pool', 'Seal Block'], approvalPolicy: 'Consensus Weighted' },
    erpModules: [{ id: 're_mod_01', name: 'Pool Allocation Ledger', description: 'Maintains reinsurance split ratios.', status: 'ACTIVE', config: {} }],
    enabledServices: ['Financial Services'], onboardingPolicy: 'MFA Restricted', approvalPolicy: 'Dual Consent',
    subscriptionOptions: [{ tier: 'Enterprise Core', priceUSD: 1900, billingCycle: 'Monthly' }],
    securityProfile: { isolationLevel: 'Hardware Sandbox', encryptionType: 'HSM Cryptographic Seal', compliancePostures: ['Solvency II'] },
    documentTemplates: ['Reinsurance Binder.pdf'], reportingTemplates: ['Loss Risk Ledger.xlsx'], analyticsTemplates: ['Solvency Projection']
  },
  {
    id: 'church',
    name: 'Church',
    displayName: 'Church & Faith ERP',
    icon: 'Users',
    status: 'AVAILABLE',
    aiProfile: { agentId: 'pub-ai', modelName: 'JUMO AI Flash Engine', promptTemplate: 'Enforce welfare and tithe accountability.', memoryPolicy: 'Stateless' },
    workflowTemplate: { id: 'wf_church', name: 'Tithe Verification Pipeline', steps: ['Audit Collection', 'Welfare Allocation'], approvalPolicy: 'Strict Single Owner' },
    erpModules: [
      { id: 'ch_mod_01', name: 'Tithes & Offerings', description: 'Bookkeeping of faith contributions with sealed transaction IDs.', status: 'ACTIVE', config: { enableAnonymity: true } },
      { id: 'ch_mod_02', name: 'Welfare Ledger', description: 'Allocates emergency funds to community families in need.', status: 'ACTIVE', config: { maxGrantUSD: 200 } }
    ],
    enabledServices: ['Business ERP'], onboardingPolicy: 'Auto-approve', approvalPolicy: 'Strict Single Owner',
    subscriptionOptions: [{ tier: 'Faith Standard', priceUSD: 25, billingCycle: 'Monthly' }],
    securityProfile: { isolationLevel: 'Schema-Level', encryptionType: 'AES-256', compliancePostures: ['Faith Institution Transparency'] },
    documentTemplates: ['Welfare Disbursement Form.pdf'], reportingTemplates: ['Tithe Accounting.xlsx'], analyticsTemplates: ['Welfare Impact Trend']
  },
  {
    id: 'ngo',
    name: 'NGO',
    displayName: 'NGO & Grant ERP',
    icon: 'Briefcase',
    status: 'AVAILABLE',
    aiProfile: { agentId: 'fin-ai', modelName: 'JUMO AI Enterprise Engine', promptTemplate: 'Track donor funds and correlate matching impact receipts.', memoryPolicy: 'Strict' },
    workflowTemplate: { id: 'wf_ngo', name: 'Milestone Disburse Pipeline', steps: ['Review Project Milestones', 'Auto-Authorize Transfer'], approvalPolicy: 'Strict Dual Consent' },
    erpModules: [
      { id: 'ng_mod_01', name: 'Grant Multi-Currency Accounting', description: 'Ledgers to manage multiple foreign currencies and conversion variances.', status: 'ACTIVE', config: { enforceSovereignSells: true } },
      { id: 'ng_mod_02', name: 'Beneficiary Registry', description: 'Double-entry tracking of relief aid distributions directly to verified IDs.', status: 'ACTIVE', config: { useBiometricID: false } }
    ],
    enabledServices: ['Business ERP', 'Financial Services'], onboardingPolicy: 'Manual Review', approvalPolicy: 'Dual Consent',
    subscriptionOptions: [{ tier: 'Global NGO Core', priceUSD: 350, billingCycle: 'Monthly' }],
    securityProfile: { isolationLevel: 'Database-Level', encryptionType: 'ChaCha20-Poly1305', compliancePostures: ['UN Financial Standards'] },
    documentTemplates: ['Donor Milestone Agreement.pdf'], reportingTemplates: ['Grant Disbursement Audit.xlsx'], analyticsTemplates: ['Beneficiary Distribution Analytics']
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    displayName: 'Universal Enterprise ERP',
    icon: 'Building2',
    status: 'AVAILABLE',
    aiProfile: { agentId: 'fin-ai', modelName: 'JUMO AI Enterprise Engine', promptTemplate: 'Analyze subsidiary margins and auto-generate consolidated balance sheets.', memoryPolicy: 'Secure Sync Window' },
    workflowTemplate: { id: 'wf_ent', name: 'Procurement Order Pipeline', steps: ['Vendor Bid Check', 'C-Level MFA Release', 'Sovereign Bank Clearance'], approvalPolicy: 'Strict Dual Consent' },
    erpModules: [
      { id: 'ent_mod_01', name: 'FAAP Ledger Sync', description: 'Aggregates books from multiple branches into a single consolidated journal.', status: 'ACTIVE', config: { baseCurrency: 'USD' } },
      { id: 'ent_mod_02', name: 'Multi-Subsidiary Payroll', description: 'Handles international taxes, social security, and local bank transfers.', status: 'ACTIVE', config: { defaultTaxRate: 30 } }
    ],
    enabledServices: ['Business ERP', 'AI Services'], onboardingPolicy: 'MFA Restricted', approvalPolicy: 'Dual Consent',
    subscriptionOptions: [{ tier: 'Sovereign Enterprise Core', priceUSD: 800, billingCycle: 'Monthly' }],
    securityProfile: { isolationLevel: 'Hardware Sandbox', encryptionType: 'HSM Cryptographic Seal', compliancePostures: ['IFRS Core Guidelines', 'SOX 404 compliance'] },
    documentTemplates: ['Consolidated Balance Statement.pdf'], reportingTemplates: ['Payroll Regional Ledger.xlsx'], analyticsTemplates: ['Subsidiary Contribution Margin']
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    displayName: 'Industrial Manufacturing ERP',
    icon: 'Server',
    status: 'AVAILABLE',
    aiProfile: { agentId: 'sec-ai', modelName: 'JUMO AI Enterprise Engine', promptTemplate: 'Monitor material consumption rates against warehouse inventories.', memoryPolicy: 'Stateless' },
    workflowTemplate: { id: 'wf_mfg', name: 'Raw Material Purchase', steps: ['Verify Silo Stock', 'Trigger Supplier Request', 'Double-Entry Deposit'], approvalPolicy: 'Strict Single Owner' },
    erpModules: [
      { id: 'mf_mod_01', name: 'Silo Material Stocks', description: 'Real-time bookkeeping of steel, chemical, or agricultural raw reserves.', status: 'ACTIVE', config: { reorderThresholdMetricTons: 15 } },
      { id: 'mf_mod_02', name: 'Production Pipelines', description: 'Coordinates active factory runs, equipment wear monitoring, and output yields.', status: 'ACTIVE', config: { targetEfficiency: 95 } }
    ],
    enabledServices: ['Business ERP'], onboardingPolicy: 'Auto-approve', approvalPolicy: 'Strict Single Owner',
    subscriptionOptions: [{ tier: 'Heavy Industry Suite', priceUSD: 1400, billingCycle: 'Monthly' }],
    securityProfile: { isolationLevel: 'Database-Level', encryptionType: 'AES-256', compliancePostures: ['ISO 9001 Standards'] },
    documentTemplates: ['Supplier Invoice Warrant.docx'], reportingTemplates: ['Equipment Wear Metrics.xlsx'], analyticsTemplates: ['Production Queue Efficiency']
  },
  {
    id: 'commerce',
    name: 'Commerce',
    displayName: 'Sovereign Commerce & Retail',
    icon: 'DollarSign',
    status: 'AVAILABLE',
    aiProfile: { agentId: 'pub-ai', modelName: 'JUMO AI Flash Engine', promptTemplate: 'Evaluate high-volume retail transactions and flag potential chargeback anomalies.', memoryPolicy: 'Single Session Memory' },
    workflowTemplate: { id: 'wf_com', name: 'Refund Authorization', steps: ['Settle Transaction Reversal', 'Deduce Retained Margin', 'Post to Ledger'], approvalPolicy: 'Strict Single Owner' },
    erpModules: [
      { id: 'co_mod_01', name: 'Consolidated POS Ledger', description: 'Merges multi-store cash and card registries into double-entry balances.', status: 'ACTIVE', config: { syncIntervalSeconds: 60 } },
      { id: 'co_mod_02', name: 'Inventory Replenishment', description: 'Calculates sales volumes and automatically triggers re-order lists.', status: 'ACTIVE', config: { marginSafetyFactor: 1.2 } }
    ],
    enabledServices: ['Business ERP', 'Financial Services'], onboardingPolicy: 'Auto-approve', approvalPolicy: 'Strict Single Owner',
    subscriptionOptions: [{ tier: 'Retail Chain Core', priceUSD: 120, billingCycle: 'Monthly' }],
    securityProfile: { isolationLevel: 'Schema-Level', encryptionType: 'AES-256', compliancePostures: ['PCI-DSS Level 2'] },
    documentTemplates: ['Automated Store Purchase Slip.pdf'], reportingTemplates: ['POS Daily Ledger.xlsx'], analyticsTemplates: ['Retail Product Stress-Yields']
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    displayName: 'Hospitality & Resorts ERP',
    icon: 'Sliders',
    status: 'AVAILABLE',
    aiProfile: { agentId: 'pub-ai', modelName: 'JUMO AI Flash Engine', promptTemplate: 'Maximize guest room occupancy while auditing real-time hospitality cash transactions.', memoryPolicy: 'Stateless' },
    workflowTemplate: { id: 'wf_hosp', name: 'Resort Booking Settle', steps: ['Reserve Guest Room', 'Pre-Authorize Security Token', 'Clear Double-Entry Invoice'], approvalPolicy: 'Strict Single Owner' },
    erpModules: [
      { id: 'ho_mod_01', name: 'Booking Manager', description: 'Guest reservations, front-desk check-ins, and housekeeping rosters.', status: 'ACTIVE', config: { checkoutTimeHour: 11 } },
      { id: 'ho_mod_02', name: 'Restaurant POS Split', description: 'Auditable food and beverages postings linked directly to guest room folios.', status: 'ACTIVE', config: { serviceChargePercent: 10 } }
    ],
    enabledServices: ['Business ERP'], onboardingPolicy: 'Auto-approve', approvalPolicy: 'Strict Single Owner',
    subscriptionOptions: [{ tier: 'Resorts Pro Suite', priceUSD: 280, billingCycle: 'Monthly' }],
    securityProfile: { isolationLevel: 'Row-Level', encryptionType: 'AES-256', compliancePostures: ['GDPR Personal Data Protection'] },
    documentTemplates: ['Guest Booking Confirmation.docx'], reportingTemplates: ['RevPar Performance Report.xlsx'], analyticsTemplates: ['Guest Occupancy Heatmap']
  },
  {
    id: 'legal',
    name: 'Legal',
    displayName: 'Legal & Escrow System',
    icon: 'Shield',
    status: 'AVAILABLE',
    aiProfile: { agentId: 'sec-ai', modelName: 'JUMO AI Enterprise Engine', promptTemplate: 'Verify statutory compliance conditions and draft standard sovereign deed files.', memoryPolicy: 'Strict' },
    workflowTemplate: { id: 'wf_legal', name: 'Escrow Liquidation', steps: ['Verify Contract Signatures', 'Verify Funds Presence', 'MFA Dual Token Release', 'Audit Ledger Post'], approvalPolicy: 'Dual Consent' },
    erpModules: [
      { id: 'le_mod_01', name: 'Trust Escrow Accounts', description: 'Segregated client trust ledgers, cryptographically sealed to prevent misappropriations.', status: 'ACTIVE', config: { escrowMaxLimitUSD: 10000000 } },
      { id: 'le_mod_02', name: 'Deed Document Signer', description: 'Immutable digital signature tracker with tamper-evident audit receipts.', status: 'ACTIVE', config: { keyStrengthBits: 4096 } }
    ],
    enabledServices: ['Business ERP', 'Financial Services', 'AI Services'], onboardingPolicy: 'MFA Restricted', approvalPolicy: 'Dual Consent',
    subscriptionOptions: [{ tier: 'Law Practice Suite', priceUSD: 450, billingCycle: 'Monthly' }],
    securityProfile: { isolationLevel: 'Hardware Sandbox', encryptionType: 'HSM Cryptographic Seal', compliancePostures: ['Bar Association Ethics Directives'] },
    documentTemplates: ['Legal Escrow Release Warrant.pdf'], reportingTemplates: ['Trust Accounts Balancing Audit.xlsx'], analyticsTemplates: ['Case Pipeline Duration Analyzer']
  },
  {
    id: 'alumni',
    name: 'Alumni',
    displayName: 'Alumni & Endowments Framework',
    icon: 'BookOpen',
    status: 'AVAILABLE',
    aiProfile: { agentId: 'pub-ai', modelName: 'JUMO AI Flash Engine', promptTemplate: 'Coordinate donation campaign outreach profiles.', memoryPolicy: 'Stateless' },
    workflowTemplate: { id: 'wf_alumni', name: 'Endowment Contribution Settle', steps: ['Donor Pledge Match', 'Disburse to Scholarship Ledger'], approvalPolicy: 'Strict Single Owner' },
    erpModules: [
      { id: 'al_mod_01', name: 'Member Registry', description: 'Maintains verified alumni contact logs and career status tracking.', status: 'ACTIVE', config: {} },
      { id: 'al_mod_02', name: 'Endowments Ledger', description: 'Double-entry books for long-term investments and social grants.', status: 'ACTIVE', config: { payoutRatio: 4 } }
    ],
    enabledServices: ['Business ERP'], onboardingPolicy: 'Auto-approve', approvalPolicy: 'Strict Single Owner',
    subscriptionOptions: [{ tier: 'University Alumni Pack', priceUSD: 190, billingCycle: 'Monthly' }],
    securityProfile: { isolationLevel: 'Schema-Level', encryptionType: 'AES-256', compliancePostures: ['FERPA Privacy'] },
    documentTemplates: ['Pledge Commitment form.pdf'], reportingTemplates: ['Endowment Yield Ledger.xlsx'], analyticsTemplates: ['Campaign Progress Chart']
  },
  {
    id: 'fintech',
    name: 'FinTech',
    displayName: 'FinTech Core & Payments',
    icon: 'Zap',
    status: 'AVAILABLE',
    aiProfile: { agentId: 'fin-ai', modelName: 'JUMO AI Enterprise Engine', promptTemplate: 'Evaluate high-volume payment streams and isolate anomalous micro-charges.', memoryPolicy: 'Secure Sync Window' },
    workflowTemplate: { id: 'wf_fintech', name: 'Instant Payment Route', steps: ['Settle Transaction ID', 'Post to FAAP Ledger', 'Mutual Gateway Forward'], approvalPolicy: 'Strict Single Owner' },
    erpModules: [
      { id: 'ft_mod_01', name: 'Sovereign Payment Gateway', description: 'High-performance Mutual TLS payment switches routing millions of records.', status: 'ACTIVE', config: { maxTxSec: 5000 } },
      { id: 'ft_mod_02', name: 'Micro-Savings Pools', description: 'Interest accrual routines and yield split ledgers.', status: 'ACTIVE', config: { dailyInterestRate: 0.02 } }
    ],
    enabledServices: ['Financial Services', 'AI Services'], onboardingPolicy: 'MFA Restricted', approvalPolicy: 'Dual Consent',
    subscriptionOptions: [{ tier: 'FinTech Startup Pack', priceUSD: 199, billingCycle: 'Monthly' }, { tier: 'Syndicate Operator Core', priceUSD: 1500, billingCycle: 'Monthly' }],
    securityProfile: { isolationLevel: 'Hardware Sandbox', encryptionType: 'HSM Cryptographic Seal', compliancePostures: ['PCI-DSS Level 1', 'ISO 20022 messaging standards'] },
    documentTemplates: ['Sovereign Wallet API Manual.pdf'], reportingTemplates: ['High-Value Clearings Statement.xlsx'], analyticsTemplates: ['Anomaly Settlement Curve']
  },
  {
    id: 'realestate',
    name: 'RealEstate',
    displayName: 'Sovereign Real Estate Escrow',
    icon: 'Building2',
    status: 'AVAILABLE',
    aiProfile: { agentId: 'fin-ai', modelName: 'JUMO AI Enterprise Engine', promptTemplate: 'Audit real estate land transfers and trace escrow payouts.', memoryPolicy: 'Strict' },
    workflowTemplate: { id: 'wf_re', name: 'Land Title Transfer', steps: ['Escrow Validation', 'Register Deed Ledger', 'Reconciliation'], approvalPolicy: 'Dual Consent' },
    erpModules: [
      { id: 're_mod_02', name: 'Rental Yields Ledger', description: 'Double-entry tracking of monthly rental deposits and arrears schedules.', status: 'ACTIVE', config: { graceDays: 3 } },
      { id: 're_mod_03', name: 'Escrow Bond Manager', description: 'Sovereign land deposit locks holding down-payments securely.', status: 'ACTIVE', config: { interestYield: 2 } }
    ],
    enabledServices: ['Business ERP', 'Financial Services'], onboardingPolicy: 'MFA Restricted', approvalPolicy: 'Dual Consent',
    subscriptionOptions: [{ tier: 'Commercial Developer Pack', priceUSD: 750, billingCycle: 'Monthly' }],
    securityProfile: { isolationLevel: 'Database-Level', encryptionType: 'ChaCha20-Poly1305', compliancePostures: ['Title Deed Registry Directives'] },
    documentTemplates: ['Sovereign Property Lease.pdf'], reportingTemplates: ['Rental Statement Ledger.xlsx'], analyticsTemplates: ['Portfolio Vacancy Rates']
  },
  {
    id: 'transportation',
    name: 'Transportation',
    displayName: 'Sovereign Logistics & Transit',
    icon: 'RefreshCw',
    status: 'AVAILABLE',
    aiProfile: { agentId: 'pub-ai', modelName: 'JUMO AI Flash Engine', promptTemplate: 'Optimize regional logistics queues and fleet dispatch times.', memoryPolicy: 'Stateless' },
    workflowTemplate: { id: 'wf_trans', name: 'Transit Fuel Allocation', steps: ['Verify Fleet Log', 'Underwrite Fuel Grant', 'Post to FAAP Ledger'], approvalPolicy: 'Strict Single Owner' },
    erpModules: [
      { id: 'tr_mod_01', name: 'Transit Logistics Books', description: 'Tracks fleet depreciations, maintenance logs, and double-entry fuel bookings.', status: 'ACTIVE', config: { fuelAllowanceMaxUSD: 150 } },
      { id: 'tr_mod_02', name: 'Cargo Dispatch Ledger', description: 'Coordinates seed-to-shelf delivery notes and billing vouchers.', status: 'ACTIVE', config: { deliverySLAHours: 48 } }
    ],
    enabledServices: ['Business ERP'], onboardingPolicy: 'Auto-approve', approvalPolicy: 'Strict Single Owner',
    subscriptionOptions: [{ tier: 'Fleet Logistics Suite', priceUSD: 310, billingCycle: 'Monthly' }],
    securityProfile: { isolationLevel: 'Schema-Level', encryptionType: 'AES-256', compliancePostures: ['Local Transit Ministry Mandates'] },
    documentTemplates: ['Logistics Delivery Note.docx'], reportingTemplates: ['Fleet Depreciation Schedule.xlsx'], analyticsTemplates: ['Logistics SLA Stress-Test']
  },
  {
    id: 'energy',
    name: 'Energy',
    displayName: 'Sovereign Energy & Utilities',
    icon: 'Power',
    status: 'AVAILABLE',
    aiProfile: { agentId: 'sec-ai', modelName: 'JUMO AI Enterprise Engine', promptTemplate: 'Monitor grid transmission loads and audit dynamic prepaid energy bookings.', memoryPolicy: 'Strict' },
    workflowTemplate: { id: 'wf_energy', name: 'Grid Capacity Allocate', steps: ['Verify Prepayment Ledger', 'MFA Switch Turn On', 'Reconcile Usage Token'], approvalPolicy: 'Dual Consent' },
    erpModules: [
      { id: 'en_mod_01', name: 'Utility Prepayments Ledger', description: 'Ledgers to manage prepaid token codes, tariff rate scales, and refunds.', status: 'ACTIVE', config: { baseTariffPerKwhUSD: 0.12 } },
      { id: 'en_mod_02', name: 'Grid Operations Books', description: 'Bookkeeping of active transmission assets, upkeep expenses, and power split pools.', status: 'ACTIVE', config: { capacityLimitMw: 500 } }
    ],
    enabledServices: ['Business ERP', 'Financial Services'], onboardingPolicy: 'MFA Restricted', approvalPolicy: 'Dual Consent',
    subscriptionOptions: [{ tier: 'Utility Provider Core', priceUSD: 2400, billingCycle: 'Monthly' }],
    securityProfile: { isolationLevel: 'Hardware Sandbox', encryptionType: 'HSM Cryptographic Seal', compliancePostures: ['National Energy Grid Rules'] },
    documentTemplates: ['Utility Prepaid Receipt.pdf'], reportingTemplates: ['Prepaid Daily Revenue.xlsx'], analyticsTemplates: ['Grid Load Forecast Model']
  },
  {
    id: 'media',
    name: 'Media',
    displayName: 'Sovereign Media & Advertising',
    icon: 'Bell',
    status: 'AVAILABLE',
    aiProfile: { agentId: 'pub-ai', modelName: 'JUMO AI Flash Engine', promptTemplate: 'Coordinate global advertising campaigns and review billing clicks.', memoryPolicy: 'Stateless' },
    workflowTemplate: { id: 'wf_media', name: 'Campaign Budget MFA Release', steps: ['Assess Campaign Reach', 'Reserve Ledger Deposit', 'Post to Advertising Centre'], approvalPolicy: 'Strict Single Owner' },
    erpModules: [
      { id: 'me_mod_01', name: 'Ad Campaign Manager', description: 'Coordinates active client campaigns, billing click records, and slot allocations.', status: 'ACTIVE', config: { baseCpcUSD: 0.2 } },
      { id: 'me_mod_02', name: 'Copyright Royalty Ledger', description: 'Bookkeeping of creator royalty splits, contract durations, and automated payouts.', status: 'ACTIVE', config: { royaltyPercentage: 15 } }
    ],
    enabledServices: ['Business ERP', 'Communication'], onboardingPolicy: 'Auto-approve', approvalPolicy: 'Strict Single Owner',
    subscriptionOptions: [{ tier: 'Media Agency Pack', priceUSD: 140, billingCycle: 'Monthly' }],
    securityProfile: { isolationLevel: 'Row-Level', encryptionType: 'AES-256', compliancePostures: ['COPPA Compliance Mandates'] },
    documentTemplates: ['Media Campaign Agreement.docx'], reportingTemplates: ['Monthly Royalty Split Audit.xlsx'], analyticsTemplates: ['CPC Margin ROI Estimator']
  },
  {
    id: 'profservices',
    name: 'Professional Services',
    displayName: 'Professional Services Consulting',
    icon: 'Sliders',
    status: 'AVAILABLE',
    aiProfile: { agentId: 'pub-ai', modelName: 'JUMO AI Flash Engine', promptTemplate: 'Verify staff hour logs and draft professional advice briefs.', memoryPolicy: 'Stateless' },
    workflowTemplate: { id: 'wf_prof', name: 'Consulting Retainer Liquidation', steps: ['Verify Hour logs', 'Clear Escrow Bond', 'Deposit Retainer Ledger'], approvalPolicy: 'Strict Single Owner' },
    erpModules: [
      { id: 'pr_mod_01', name: 'Hour Logs billing', description: 'Coordinates staff timesheets, client retainer rates, and arrears invoicing.', status: 'ACTIVE', config: { hourlyBillingUSD: 120 } },
      { id: 'pr_mod_02', name: 'Consulting Project Ledger', description: 'Bookkeeping of consulting project expenses, supplier bills, and margins.', status: 'ACTIVE', config: { profitTargetPercent: 35 } }
    ],
    enabledServices: ['Business ERP'], onboardingPolicy: 'Auto-approve', approvalPolicy: 'Strict Single Owner',
    subscriptionOptions: [{ tier: 'Consulting Suite Pack', priceUSD: 95, billingCycle: 'Monthly' }],
    securityProfile: { isolationLevel: 'Schema-Level', encryptionType: 'AES-256', compliancePostures: ['Corporate Transparency Directives'] },
    documentTemplates: ['Retainer Terms Engagement.pdf'], reportingTemplates: ['Hour Sheets balancing.xlsx'], analyticsTemplates: ['Consulting Resource Capacity Matrix']
  }
];

export const INITIAL_TENANTS: TenantOrg[] = [
  {
    id: 'finbank-ug',
    name: 'FinBank Uganda Ltd',
    email: 'admin@finbank.ug',
    industry: 'Commercial Banking',
    domainTemplate: 'Commercial Bank',
    status: 'ACTIVE',
    riskScore: 12,
    registrationDate: '2026-07-25T01:10:00Z',
    activatedServices: ['Financial Services', 'AI Services', 'Business ERP'],
    verificationDocuments: ['Incorporation Cert.pdf', 'Banking License.pdf'],
  },
  {
    id: 'st-mary-sacco',
    name: 'St. Mary\'s SACCO',
    email: 'mgr@stmarys.org',
    industry: 'SACCO / Microfinance',
    domainTemplate: 'SACCO',
    status: 'ACTIVE',
    riskScore: 28,
    registrationDate: '2026-07-25T01:12:00Z',
    activatedServices: ['Financial Services', 'Business ERP'],
    verificationDocuments: ['Cooperative Certificate.pdf'],
  },
  {
    id: 'kampala-med',
    name: 'Kampala Medical Center',
    email: 'it@kampalamed.org',
    industry: 'Healthcare Systems',
    domainTemplate: 'Hospital',
    status: 'ACTIVE',
    riskScore: 18,
    registrationDate: '2026-07-25T01:15:00Z',
    activatedServices: ['Business ERP', 'AI Services'],
    verificationDocuments: ['Health Council License.pdf'],
  },
  {
    id: 'makerere-erp',
    name: 'Makerere University ERP',
    email: 'erp@makerere.ug',
    industry: 'Education & Universities',
    domainTemplate: 'University',
    status: 'ACTIVE',
    riskScore: 10,
    registrationDate: '2026-07-25T01:18:00Z',
    activatedServices: ['Business ERP', 'AI Services', 'Communication'],
    verificationDocuments: ['Charter Gazetted Document.pdf'],
  },
  {
    id: 'nile-agro',
    name: 'Nile Agro Co-op',
    email: 'ops@nileagro.com',
    industry: 'Agriculture & Co-ops',
    domainTemplate: 'Cooperative',
    status: 'ACTIVE',
    riskScore: 45,
    registrationDate: '2026-07-25T01:20:00Z',
    activatedServices: ['Business ERP'],
    verificationDocuments: ['Agric Certificate.pdf'],
  }
];

export const INITIAL_RULES: RegistrationRules = {
  requiredBusinessInfo: true,
  requiredVerificationDocs: true,
  requiredIndustrySelection: true,
  requiredDomainRequest: true,
  approvalMode: 'Hybrid',
  riskAutoApproveMax: 20,
  riskManualReviewMin: 21,
};

export const INITIAL_LEDGER: LedgerEntry[] = [
  { id: 'TX_10201', timestamp: '2026-07-25T01:10:00Z', debitAccount: '1010 (Cash Reserve)', creditAccount: '4010 (SaaS Revenue)', amountUSD: 250000, description: 'FinBank Uganda SaaS License Renewal', tenantId: 'finbank-ug', balanced: true },
  { id: 'TX_10202', timestamp: '2026-07-25T01:12:00Z', debitAccount: '1020 (Operational Clearing)', creditAccount: '1010 (Cash Reserve)', amountUSD: 150000, description: 'St. Mary’s SACCO Liquidity Drawdown', tenantId: 'st-mary-sacco', balanced: true },
  { id: 'TX_10203', timestamp: '2026-07-25T01:15:00Z', debitAccount: '2010 (Accounts Payable)', creditAccount: '1010 (Cash Reserve)', amountUSD: 45000, description: 'Automated Cloud Proxy Sub-Allocation', tenantId: 'global', balanced: true },
  { id: 'TX_10204', timestamp: '2026-07-25T01:18:00Z', debitAccount: '1010 (Cash Reserve)', creditAccount: '3010 (Retained Earnings)', amountUSD: 890000, description: 'Uganda Treasury Sovereign Pool Rebalance', tenantId: 'global', balanced: true },
];

export const INITIAL_PLATFORM_CONFIG: PlatformConfig = {
  branding: {
    name: 'JUMO DIGITAL ENTERPRISE PLATFORM',
    shortName: 'JUMO UEOS',
    logoLetter: 'J',
    accentColor: '#0078D4',
    theme: 'light'
  },
  footerSignature: {
    text: 'JUMO DIGITAL ENTERPRISE PLATFORM — Sovereign Operating System',
    copyright: '© 2026 JUMO Digital Enterprise Platform. All Sovereign Rights, Trademarks & Patents Reserved.',
    supportEmail: 'contact@jumo.ug.com',
    documentationUrl: '/documentation',
    apiVersion: 'v13.5-enterprise',
    buildVersion: 'build-2026-07-25-sovereign',
    systemSignature: 'JUMO-DIGITAL-ENTERPRISE-PLATFORM-SECURE',
    branch: 'phase12-platform-hardening',
    commit: 'ae9031c2',
    deploymentStatus: 'DEPLOYED_NOMINAL'
  },
  communicationChannels: {
    supportEmail: 'info@jumo.ug.com',
    securityEmail: 'ueos@jumo.com',
    whatsapp: '+256752964856',
    mobile: '+256786981892',
    linkedin: 'jumo digital enterprise platform',
    twitter: '@jumodigitalenterpriseplatform'
  },
  runtimeMode: 'Hybrid',
  deploymentEnvironment: 'Production',
  apiStatus: 'NOMINAL',
  securityPolicies: {
    mfaLevel: 'Strict Hardware Key Only',
    sessionTimeoutMin: 15,
    isolationLevel: 'Schema-Level Isolation',
    encryptionAlgorithm: 'AES-256-GCM',
    auditLogRetentionDays: 365
  },
  integrations: {
    erpEnabled: true,
    financialScoringEnabled: true,
    aiOrchestrationEnabled: true,
    paymentGateways: ['FAAP ledger clearings', 'Interbank Settlement Rails', 'Mobile Money APIs']
  }
};

export class UEOSGovernanceState {
  static get<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    try {
      return JSON.parse(item) as T;
    } catch {
      return defaultValue;
    }
  }

  static set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Loaders
  static getComponents(): SystemComponent[] {
    return this.get<SystemComponent[]>('ueos_components', INITIAL_COMPONENTS);
  }

  static getNavigation(): NavigationItem[] {
    return this.get<NavigationItem[]>('ueos_navigation', INITIAL_NAVIGATION);
  }

  static getAIAgents(): AIAgent[] {
    return this.get<AIAgent[]>('ueos_ai_agents', INITIAL_AI_AGENTS);
  }

  static getFactories(): DigitalFactory[] {
    return this.get<DigitalFactory[]>('ueos_factories', INITIAL_FACTORIES);
  }

  static getDomains(): DomainEcosystem[] {
    return this.get<DomainEcosystem[]>('ueos_domains', INITIAL_DOMAINS);
  }

  static getTenants(): TenantOrg[] {
    return this.get<TenantOrg[]>('ueos_tenants', INITIAL_TENANTS);
  }

  static getRules(): RegistrationRules {
    return this.get<RegistrationRules>('ueos_registration_rules', INITIAL_RULES);
  }

  static getLedger(): LedgerEntry[] {
    return this.get<LedgerEntry[]>('ueos_faap_ledger', INITIAL_LEDGER);
  }

  static getPlatformConfig(): PlatformConfig {
    return this.get<PlatformConfig>('ueos_platform_config', INITIAL_PLATFORM_CONFIG);
  }

  // Savers
  static saveComponents(data: SystemComponent[]) { this.set('ueos_components', data); }
  static saveNavigation(data: NavigationItem[]) { this.set('ueos_navigation', data); }
  static saveAIAgents(data: AIAgent[]) { this.set('ueos_ai_agents', data); }
  static saveFactories(data: DigitalFactory[]) { this.set('ueos_factories', data); }
  static saveDomains(data: DomainEcosystem[]) { this.set('ueos_domains', data); }
  static saveTenants(data: TenantOrg[]) { this.set('ueos_tenants', data); }
  static saveRules(data: RegistrationRules) { this.set('ueos_registration_rules', data); }
  static saveLedger(data: LedgerEntry[]) { this.set('ueos_faap_ledger', data); }
  static savePlatformConfig(data: PlatformConfig) { this.set('ueos_platform_config', data); }
}
