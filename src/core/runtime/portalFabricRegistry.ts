/**
 * JUMO UEOS Enterprise Portal Fabric Registry (Roadmap v20.0 & v21.0)
 * Authoritative system definitions for all Sovereign Platforms, ERP Domain Categories,
 * Templates (41+), Universal Modules (15+), Platform-Specific Modules, Licensing, and Deployment Schemas.
 */

export interface SovereignPlatformDef {
  id: string;
  name: string;
  category: 'Core Kernel' | 'Financial & Treasury' | 'Security & Identity' | 'Infrastructure & Cloud' | 'Cognitive & AI' | 'Developer & Scaffolding' | 'Ecosystem & Marketplace' | 'Governance & Integrity';
  description: string;
  modulesCount: number;
  servicesCount: number;
  version: string;
  licensingTier: 'Included (Ring-0)' | 'Standard Subscription' | 'Enterprise Sovereign' | 'Sovereign Integrity';
  workspaceRoute: string;
  iconName: string;
  status: 'Online (Ring-0 Verified)' | 'Active Node' | 'Multi-Cluster Active' | 'Online (Sovereign Integrity Verified)';
  coreCapabilities: string[];
}

export interface ErpTemplateDef {
  id: string;
  name: string;
  category: 'Education ERP' | 'Financial & Cooperative ERP' | 'Institution ERP' | 'Industry ERP' | 'Government ERP';
  description: string;
  modulesIncluded: number;
  targetTenants: string;
  defaultTier: 'Trial Ready' | 'Standard' | 'Sovereign Enterprise';
  keyModules: string[];
  dbTablesCount: number;
  aiWorkflowCount: number;
}

export interface UniversalModuleDef {
  id: string;
  name: string;
  type: 'Universal Core' | 'Platform Specific';
  targetPlatform?: string;
  description: string;
  version: string;
  status: 'Installed & Active' | 'Available' | 'Configured' | 'License Required';
  dependencies: string[];
  licensing: 'Included' | 'Add-on License' | 'Sovereign Core';
  category: 'Security' | 'Finance' | 'Operations' | 'Human Resources' | 'Intelligence' | 'Communication' | 'Governance';
}

export interface SubscriptionTierDef {
  id: string;
  name: string;
  price: string;
  billingPeriod: string;
  userSeats: string;
  features: string[];
  unpaidAccessRule: string;
  highlight?: boolean;
}

/**
 * PHASE 1 (v20.0 & v21.0): Authoritative Sovereign Platforms Registry (13 Platforms)
 */
export const SOVEREIGN_PLATFORMS_REGISTRY: SovereignPlatformDef[] = [
  {
    id: 'ueos-core',
    name: 'JUMO UEOS Core Platform',
    category: 'Core Kernel',
    description: 'The micro-kernel architecture foundation, dynamic plugin registry, state-authoritative ledger framework, and hybrid deployment orchestrator.',
    modulesCount: 98,
    servicesCount: 42,
    version: 'v14.4.0 LTS',
    licensingTier: 'Included (Ring-0)',
    workspaceRoute: '/control-center',
    iconName: 'Cpu',
    status: 'Online (Ring-0 Verified)',
    coreCapabilities: ['Micro-Kernel Bootstrap', 'Dynamic Dependency Injection', 'Runtime Hot-Reloading', 'Telemetry & Diagnostics']
  },
  {
    id: 'faap-platform',
    name: 'FAAP Financial Backbone Platform',
    category: 'Financial & Treasury',
    description: 'Shared general ledger, chart of accounts, budgeting, treasury, revenue management, tax accounting, and 1.5% settlement clearing switch.',
    modulesCount: 24,
    servicesCount: 18,
    version: 'v4.2.0',
    licensingTier: 'Included (Ring-0)',
    workspaceRoute: '/platform/faap',
    iconName: 'DollarSign',
    status: 'Online (Ring-0 Verified)',
    coreCapabilities: ['Double-Entry Ledger Parity ($0.00)', 'Automated Tax Compliance', '1.5% Inter-Bank Clearing', 'Multi-Currency Treasury']
  },
  {
    id: 'fintech-platform',
    name: 'JUMO FINTECH Switch Platform',
    category: 'Financial & Treasury',
    description: 'Universal fintech switch integrating M-Pesa, Airtel Money, commercial banking APIs, SWIFT routing, and instant payment settlement.',
    modulesCount: 16,
    servicesCount: 12,
    version: 'v3.8.5',
    licensingTier: 'Standard Subscription',
    workspaceRoute: '/platform/fintech',
    iconName: 'Zap',
    status: 'Active Node',
    coreCapabilities: ['Mobile Money Clearing', 'Commercial Bank API Integration', 'RTGS Settlement Switch', 'Merchant Payment Routing']
  },
  {
    id: 'digital-pay',
    name: 'JUMO DIGITAL PAY Platform',
    category: 'Financial & Treasury',
    description: 'Sovereign institutional wallets, RTGS treasury switch, liquidity clearing house, automated fee revenue routing, and merchant settlement.',
    modulesCount: 14,
    servicesCount: 10,
    version: 'v3.5.0',
    licensingTier: 'Standard Subscription',
    workspaceRoute: '/platform/digital-pay',
    iconName: 'Landmark',
    status: 'Active Node',
    coreCapabilities: ['Institutional Wallet Engine', 'Liquidity Clearing House', 'Automated Fee Deduction', 'Card & POS Processing']
  },
  {
    id: 'cloud-platform',
    name: 'JUMO CLOUD Console & Infrastructure',
    category: 'Infrastructure & Cloud',
    description: 'Multi-cloud K8s compute clusters, serverless containers, distributed PostgreSQL databases, object storage, CDN, and DNS networking.',
    modulesCount: 32,
    servicesCount: 25,
    version: 'v5.1.0',
    licensingTier: 'Enterprise Sovereign',
    workspaceRoute: '/platform/cloud',
    iconName: 'Cloud',
    status: 'Multi-Cluster Active',
    coreCapabilities: ['Kubernetes Cluster Orchestration', 'Auto-Scaling Compute Nodes', 'Distributed PostgreSQL Pools', 'Edge CDN & DNS Routing']
  },
  {
    id: 'aegis-platform',
    name: 'JUMO AEGIS Security Platform',
    category: 'Security & Identity',
    description: 'Zero-Trust continuous Ring-0 surveillance, RBAC/ABAC boundaries, cryptographic AES-256 secrets vault, and MFA administrative challenge walls.',
    modulesCount: 22,
    servicesCount: 16,
    version: 'v6.0.0',
    licensingTier: 'Included (Ring-0)',
    workspaceRoute: '/platform/aegis',
    iconName: 'Shield',
    status: 'Online (Ring-0 Verified)',
    coreCapabilities: ['Continuous Zero-Trust Surveillance', 'Row-Level Database Segregation', 'AES-256 Secrets Encryption Vault', 'Administrative MFA Challenge']
  },
  {
    id: 'trust-platform',
    name: 'JUMO TRUST Integrity Platform',
    category: 'Governance & Integrity',
    description: 'Sovereign institutional governance, board resolution tracking, FAAP financial irregularity scanner, CCTV vision AI, procurement transparency, whistleblower evidence vault, and compliance auditing.',
    modulesCount: 24,
    servicesCount: 18,
    version: 'v1.0.0',
    licensingTier: 'Sovereign Integrity',
    workspaceRoute: '/platform/trust',
    iconName: 'ShieldCheck',
    status: 'Online (Sovereign Integrity Verified)',
    coreCapabilities: ['Institutional Governance Core', 'FAAP Double-Entry Parity Scanner', 'CCTV Vision AI Event Detection', 'Whistleblower AES-256 Vault', 'JUMO TRUST Assistant AI']
  },
  {
    id: 'ai-platform',
    name: 'JUMO AI Cognitive Platform',
    category: 'Cognitive & AI',
    description: 'Multi-model AI router (Gemini 2.5 Flash / Pro, Google GenAI), agent swarm registry, RAG databases, vector semantic memory, and model governance.',
    modulesCount: 28,
    servicesCount: 20,
    version: 'v4.5.0',
    licensingTier: 'Included (Ring-0)',
    workspaceRoute: '/platform/ai',
    iconName: 'Cpu',
    status: 'Online (Ring-0 Verified)',
    coreCapabilities: ['Multi-Model AI Cognitive Router', 'Vector Semantic Memory Indices', 'Autonomous Agent Swarms', 'RAG Compliance Grounding']
  },
  {
    id: 'factory-platform',
    name: 'Software Factory Studio Platform',
    category: 'Developer & Scaffolding',
    description: 'Sovereign scaffolding engine: Low-code studio, No-code builder, UI generator, API schema mapper, and automated CI/CD deployment pipelines.',
    modulesCount: 26,
    servicesCount: 18,
    version: 'v3.2.0',
    licensingTier: 'Standard Subscription',
    workspaceRoute: '/platform/factory',
    iconName: 'Code',
    status: 'Active Node',
    coreCapabilities: ['Dynamic Module Scaffolding', 'No-Code Form & Workflow Builder', 'Database Schema Auto-Mapper', 'CI/CD Pipeline Injector']
  },
  {
    id: 'research-platform',
    name: 'Innovation & Research Center (DIRC)',
    category: 'Developer & Scaffolding',
    description: 'Experimental sandbox, synthetic digital twin simulation engine, post-quantum cryptography labs, and sovereign patent registry.',
    modulesCount: 18,
    servicesCount: 14,
    version: 'v2.1.0',
    licensingTier: 'Enterprise Sovereign',
    workspaceRoute: '/platform/research',
    iconName: 'Microscope',
    status: 'Active Node',
    coreCapabilities: ['Digital Twin State Simulation', 'Post-Quantum Encryption Testing', 'Cluster Performance Benchmarking', 'Experimental AI Lab']
  },
  {
    id: 'comms-platform',
    name: 'Universal Communications Platform',
    category: 'Core Kernel',
    description: 'Integrated messaging switch, email dispatching, SMS gateway, push notifications, event-bus message queues, and central automation engines.',
    modulesCount: 16,
    servicesCount: 12,
    version: 'v4.0.0',
    licensingTier: 'Included (Ring-0)',
    workspaceRoute: '/control-center/monitoring',
    iconName: 'Globe',
    status: 'Online (Ring-0 Verified)',
    coreCapabilities: ['Multi-Channel Dispatch Engine', 'SMS & WhatsApp Gateway', 'Event-Bus Message Queues', 'Automated Retry & Failover']
  },
  {
    id: 'integration-platform',
    name: 'Universal Integration Platform',
    category: 'Infrastructure & Cloud',
    description: 'Unified abstractions for REST, GraphQL, WebSockets, Event Streaming, Webhooks, and external adapters (Payment Gateways, Banking/Government APIs).',
    modulesCount: 20,
    servicesCount: 15,
    version: 'v3.9.0',
    licensingTier: 'Standard Subscription',
    workspaceRoute: '/api-management',
    iconName: 'Layers',
    status: 'Active Node',
    coreCapabilities: ['REST & GraphQL API Gateway', 'Real-Time WebSocket Streaming', 'External Banking & Tax API Adapters', 'Webhook Event Transformers']
  },
  {
    id: 'developer-platform',
    name: 'Sovereign Developer Platform',
    category: 'Developer & Scaffolding',
    description: 'Comprehensive developer portal, API documentation, SDK generators, sandbox testing environments, and third-party app certification.',
    modulesCount: 15,
    servicesCount: 10,
    version: 'v3.0.0',
    licensingTier: 'Included (Ring-0)',
    workspaceRoute: '/developer-center',
    iconName: 'Terminal',
    status: 'Online (Ring-0 Verified)',
    coreCapabilities: ['Interactive OpenAPI Spec Explorer', 'Sandbox Tenant Scaffolding', 'SDK Client Code Generators', 'Plugin Certification Desk']
  },
  {
    id: 'marketplace-platform',
    name: 'JUMO Platform Store & Marketplace',
    category: 'Ecosystem & Marketplace',
    description: 'Official repository and distribution registry for discovering, licensing, installing, updating, and upgrading sovereign enterprise plugins and ERP templates.',
    modulesCount: 30,
    servicesCount: 22,
    version: 'v5.0.0',
    licensingTier: 'Included (Ring-0)',
    workspaceRoute: '/platform/store',
    iconName: 'Package',
    status: 'Online (Ring-0 Verified)',
    coreCapabilities: ['180+ Enterprise Plugins Registry', '1-Click Template Deployment Engine', 'Automated Dependency Resolution', 'License Compliance Verification']
  }
];

/**
 * PHASE 2 (v20.0 & v21.0): Authoritative ERP Ecosystem Registry (41+ Templates across 5 Categories)
 */
export const ERP_PORTAL_REGISTRY: ErpTemplateDef[] = [
  // Education ERP (12 Templates)
  { id: 'edu-univ', name: 'University ERP Template', category: 'Education ERP', description: 'Faculties, research grant accounting (FAAP), SIS, alumni integration, senate governance, and multi-campus management.', modulesIncluded: 28, targetTenants: 'Universities & Higher Ed', defaultTier: 'Sovereign Enterprise', keyModules: ['Student SIS', 'Research Grants', 'Senate Governance', 'FAAP Billing'], dbTablesCount: 64, aiWorkflowCount: 18 },
  { id: 'edu-coll', name: 'College ERP Template', category: 'Education ERP', description: 'TVET accreditation, diploma tracks, course scheduling, workshop tracking, and certification records.', modulesIncluded: 22, targetTenants: 'Colleges & Diplomas', defaultTier: 'Standard', keyModules: ['Course Scheduling', 'TVET Accreditation', 'Equipment Booking', 'Student Portal'], dbTablesCount: 48, aiWorkflowCount: 12 },
  { id: 'edu-sec', name: 'Secondary School ERP Template', category: 'Education ERP', description: 'Boarding house discipline, term exam grading, subject departments, parent portal, and school fee billing.', modulesIncluded: 20, targetTenants: 'High Schools & Academies', defaultTier: 'Standard', keyModules: ['Boarding & Dorms', 'Exam Grading', 'Parent Portal', 'Fee Billing Switch'], dbTablesCount: 42, aiWorkflowCount: 10 },
  { id: 'edu-prim', name: 'Primary School ERP Template', category: 'Education ERP', description: 'Class teacher attendance, basic continuous assessment, report cards, parent comms, and uniform inventory.', modulesIncluded: 16, targetTenants: 'Primary & Elementary', defaultTier: 'Standard', keyModules: ['Daily Attendance', 'Report Card Generator', 'Parent Messaging', 'Uniform Store'], dbTablesCount: 36, aiWorkflowCount: 8 },
  { id: 'edu-nurs', name: 'Nursery & Early Ed ERP Template', category: 'Education ERP', description: 'Early childhood centers, child daily care logs, health allergies, guardian pickup verification, and play activities.', modulesIncluded: 12, targetTenants: 'Nurseries & Daycares', defaultTier: 'Trial Ready', keyModules: ['Daily Child Log', 'Guardian Security Verification', 'Health & Allergy Tracker', 'Term Fees'], dbTablesCount: 24, aiWorkflowCount: 6 },
  { id: 'edu-tvet', name: 'Technical Institute ERP Template', category: 'Education ERP', description: 'Workshop machinery tracking, apprenticeship hours, craft testing, and industrial attachment supervision.', modulesIncluded: 18, targetTenants: 'Technical Institutes', defaultTier: 'Standard', keyModules: ['Machinery Maintenance', 'Apprenticeship Tracker', 'Guild Craft Testing', 'Safety Audit'], dbTablesCount: 38, aiWorkflowCount: 9 },
  { id: 'edu-voc', name: 'Vocational Institute ERP Template', category: 'Education ERP', description: 'Practical trade skills training, guild testing certification, equipment inventory, and job placement tracking.', modulesIncluded: 16, targetTenants: 'Vocational Centers', defaultTier: 'Standard', keyModules: ['Trade Certification', 'Toolbox Inventory', 'Job Placement Desk', 'Practicum Billing'], dbTablesCount: 34, aiWorkflowCount: 8 },
  { id: 'edu-res', name: 'Research Institute ERP Template', category: 'Education ERP', description: 'Grant accounting (FAAP), laboratory equipment booking, peer review tracking, intellectual property vault, and clinical ethics.', modulesIncluded: 24, targetTenants: 'Research & R&D Labs', defaultTier: 'Sovereign Enterprise', keyModules: ['FAAP Grant Ledger', 'Lab Equipment Scheduler', 'IP & Patent Vault', 'Ethics Compliance'], dbTablesCount: 52, aiWorkflowCount: 15 },
  { id: 'edu-elearn', name: 'E-learning Platform ERP Template', category: 'Education ERP', description: 'Asynchronous LMS delivery, video streaming integration, auto-graded quizzes, course completion badges, and remote proctoring.', modulesIncluded: 20, targetTenants: 'Digital Academies & MOOCs', defaultTier: 'Standard', keyModules: ['Asynchronous LMS', 'Video Stream Switch', 'Auto-Graded Quizzes', 'Remote Proctor AI'], dbTablesCount: 44, aiWorkflowCount: 14 },
  { id: 'edu-exam', name: 'Examination Management ERP Template', category: 'Education ERP', description: 'National/regional exam board administration, candidate registration, secure exam paper vault, anonymous grading, and result dispatch.', modulesIncluded: 18, targetTenants: 'Exam Boards & Certification', defaultTier: 'Sovereign Enterprise', keyModules: ['Candidate Registration', 'Encrypted Exam Vault', 'Anonymous Grading', 'Certificate Verification'], dbTablesCount: 40, aiWorkflowCount: 12 },
  { id: 'edu-lib', name: 'Library Management ERP Template', category: 'Education ERP', description: 'Digital & physical catalog indexing, RFID checkout tracking, overdue fine automated calculation (FAAP), and inter-library loan.', modulesIncluded: 14, targetTenants: 'University & Public Libraries', defaultTier: 'Standard', keyModules: ['RFID Catalog Index', 'Checkout & Returns', 'Overdue Fine Calculator', 'Digital E-Book Reader'], dbTablesCount: 28, aiWorkflowCount: 6 },
  { id: 'edu-sis', name: 'Student Information System (SIS) ERP', category: 'Education ERP', description: 'Master student demographic vault, academic transcripts, disciplinary records, medical profiles, and graduation audit.', modulesIncluded: 18, targetTenants: 'School Districts & Networks', defaultTier: 'Standard', keyModules: ['Demographic Vault', 'Academic Transcripts', 'Disciplinary Log', 'Graduation Auditor'], dbTablesCount: 36, aiWorkflowCount: 10 },

  // Financial & Cooperative ERP (6 Templates)
  { id: 'fin-sacco', name: 'SACCO ERP Template', category: 'Financial & Cooperative ERP', description: 'High-throughput savings and credit cooperative accounting, share capital dividends, loan origination, and M-Pesa automated clearing.', modulesIncluded: 24, targetTenants: 'SACCOs & Credit Unions', defaultTier: 'Standard', keyModules: ['Share Capital Register', 'Loan Origination Engine', 'M-Pesa Auto-Clearing', 'Dividend Calculator'], dbTablesCount: 56, aiWorkflowCount: 16 },
  { id: 'fin-coop', name: 'Cooperative Union ERP Template', category: 'Financial & Cooperative ERP', description: 'Agricultural & producer union management, member produce intake weighing, inventory warehousing, and bulk farmer settlement.', modulesIncluded: 22, targetTenants: 'Farmer & Producer Coops', defaultTier: 'Standard', keyModules: ['Produce Weight Intake', 'Warehouse Receipting', 'Bulk Farmer Settlement', 'Input Credit Recovery'], dbTablesCount: 48, aiWorkflowCount: 14 },
  { id: 'fin-sav', name: 'Micro-Savings ERP Template', category: 'Financial & Cooperative ERP', description: 'Group savings (Chamas/VSLA), cycle distributions, emergency fund tracking, and interest yield allocation.', modulesIncluded: 16, targetTenants: 'Savings Groups & VSLAs', defaultTier: 'Trial Ready', keyModules: ['Chama Ledger', 'Cycle Distribution', 'Emergency Loan Fund', 'Interest Yield Matrix'], dbTablesCount: 32, aiWorkflowCount: 8 },
  { id: 'fin-lend', name: 'Commercial Lending ERP Template', category: 'Financial & Cooperative ERP', description: 'Credit scoring AI router, collateral valuation registry, automated collection schedules, and non-performing loan (NPL) recovery.', modulesIncluded: 26, targetTenants: 'Microfinance & Lenders', defaultTier: 'Sovereign Enterprise', keyModules: ['AI Credit Scoring', 'Collateral Registry', 'Automated Collections', 'NPL Recovery Engine'], dbTablesCount: 58, aiWorkflowCount: 18 },
  { id: 'fin-credit', name: 'Credit Management & Risk ERP Template', category: 'Financial & Cooperative ERP', description: 'Portfolio risk exposure modeling, credit bureau API feeds, provisioning calculation, and regulatory capital adequacy reporting.', modulesIncluded: 20, targetTenants: 'Risk & Credit Houses', defaultTier: 'Sovereign Enterprise', keyModules: ['Risk Exposure Modeling', 'Credit Bureau API Feeds', 'Capital Provisioning', 'Regulatory Reporting'], dbTablesCount: 44, aiWorkflowCount: 12 },
  { id: 'fin-union', name: 'National Union Management ERP Template', category: 'Financial & Cooperative ERP', description: 'Federated union governance, affiliate society dues billing, central liquidity facility, and delegates voting registry.', modulesIncluded: 24, targetTenants: 'Federated Unions & Apexes', defaultTier: 'Sovereign Enterprise', keyModules: ['Affiliate Dues Billing', 'Central Liquidity Pool', 'Delegates Voting Vault', 'Federation Ledger'], dbTablesCount: 50, aiWorkflowCount: 14 },

  // Institution ERP (8 Templates)
  { id: 'inst-church', name: 'Church & Parish ERP Template', category: 'Institution ERP', description: 'Parishioner census, tithe & offering digital recording, ministry group rosters, pastoral care visits, and diocesan ledger consolidation.', modulesIncluded: 20, targetTenants: 'Churches & Parishes', defaultTier: 'Standard', keyModules: ['Parishioner Census', 'Tithe & Offering Recording', 'Ministry Rosters', 'Diocesan Consolidation'], dbTablesCount: 40, aiWorkflowCount: 10 },
  { id: 'inst-rel', name: 'Religious Institution ERP Template', category: 'Institution ERP', description: 'Monasteries, convents, theological seminaries, chaplaincy dispatching, missionary outreach accounting, and relic inventory.', modulesIncluded: 18, targetTenants: 'Religious Orders & Seminaries', defaultTier: 'Standard', keyModules: ['Seminary Administration', 'Missionary Outreach Ledger', 'Chaplaincy Dispatch', 'Asset & Relic Vault'], dbTablesCount: 38, aiWorkflowCount: 9 },
  { id: 'inst-ngo', name: 'NGO & Grant Management ERP Template', category: 'Institution ERP', description: 'Donor restriction fund accounting (FAAP), multi-currency project budget burn rate, field office logistics, and impact M&E reporting.', modulesIncluded: 24, targetTenants: 'NGOs & Non-Profits', defaultTier: 'Standard', keyModules: ['Donor Restricted Funds', 'Project Budget Burn Rate', 'Field Logistics & Fleet', 'M&E Impact Tracker'], dbTablesCount: 52, aiWorkflowCount: 15 },
  { id: 'inst-found', name: 'Foundation ERP Template', category: 'Institution ERP', description: 'Endowment capital management, scholarship award disbursement, grantee compliance auditing, and tax-exempt filing.', modulesIncluded: 20, targetTenants: 'Philanthropic Foundations', defaultTier: 'Sovereign Enterprise', keyModules: ['Endowment Investment Ledger', 'Scholarship Disbursement', 'Grantee Audit Trail', 'Tax-Exempt Compliance'], dbTablesCount: 42, aiWorkflowCount: 12 },
  { id: 'inst-cult', name: 'Cultural Institution ERP Template', category: 'Institution ERP', description: 'Museums, national theaters, gallery exhibition scheduling, artifact preservation archives, and ticketing box office.', modulesIncluded: 18, targetTenants: 'Museums & Theaters', defaultTier: 'Standard', keyModules: ['Exhibition Scheduler', 'Artifact Preservation Archive', 'Ticketing Box Office', 'Curator Catalog'], dbTablesCount: 36, aiWorkflowCount: 8 },
  { id: 'inst-trad', name: 'Traditional Kingdom & Chiefdom ERP', category: 'Institution ERP', description: 'Royal clan registries, chiefdom customary land registry, cultural heritage events, subject tribute accounting, and council of elders.', modulesIncluded: 22, targetTenants: 'Traditional Kingdoms', defaultTier: 'Sovereign Enterprise', keyModules: ['Royal Clan Registry', 'Customary Land Vault', 'Tribute Accounting', 'Council of Elders Governance'], dbTablesCount: 46, aiWorkflowCount: 12 },
  { id: 'inst-clan', name: 'Clan & Heritage ERP Template', category: 'Institution ERP', description: 'Genealogical lineage mapping, community welfare contributions, ceremonial event planning, and dispute arbitration records.', modulesIncluded: 14, targetTenants: 'Clans & Family Associations', defaultTier: 'Trial Ready', keyModules: ['Genealogical Tree Vault', 'Welfare Contribution Pool', 'Ceremonial Calendar', 'Arbitration Log'], dbTablesCount: 28, aiWorkflowCount: 6 },
  { id: 'inst-fam', name: 'Family Office & Wealth ERP Template', category: 'Institution ERP', description: 'Multi-generational asset portfolio consolidation, private trust accounting, estate planning documents, and tax optimization.', modulesIncluded: 24, targetTenants: 'Private Family Offices', defaultTier: 'Sovereign Enterprise', keyModules: ['Multi-Asset Consolidation', 'Private Trust Ledger', 'Estate Planning Vault', 'Tax Optimization AI'], dbTablesCount: 50, aiWorkflowCount: 16 },

  // Industry ERP (10 Templates)
  { id: 'ind-agri', name: 'Agriculture & Farm ERP Template', category: 'Industry ERP', description: 'Crop cycle tracking, livestock pedigree log, irrigation scheduling, fertilizer harvest inventory, and cold chain logistics.', modulesIncluded: 22, targetTenants: 'Commercial Farms & Ranches', defaultTier: 'Standard', keyModules: ['Crop Cycle Tracker', 'Livestock Pedigree Log', 'Fertilizer & Feed Store', 'Cold Chain Logistics'], dbTablesCount: 48, aiWorkflowCount: 14 },
  { id: 'ind-mfg', name: 'Manufacturing & Assembly ERP Template', category: 'Industry ERP', description: 'Bill of Materials (BOM), shop floor work orders, machine quality control, raw material MRP procurement, and finished goods warehouse.', modulesIncluded: 28, targetTenants: 'Factories & Manufacturers', defaultTier: 'Sovereign Enterprise', keyModules: ['Multi-Level BOM Engine', 'Shop Floor Work Orders', 'MRP Procurement Switch', 'Quality Assurance Audit'], dbTablesCount: 62, aiWorkflowCount: 18 },
  { id: 'ind-health', name: 'Healthcare & Hospital ERP Template', category: 'Industry ERP', description: 'Inpatient/outpatient EMR, doctor shift scheduling, pharmacy dispensing billing, lab pathology diagnostics, and insurance claim billing.', modulesIncluded: 30, targetTenants: 'Hospitals & Medical Centers', defaultTier: 'Sovereign Enterprise', keyModules: ['Inpatient/Outpatient EMR', 'Pharmacy Dispensing Billing', 'Laboratory Diagnostics', 'Insurance Claims Gateway'], dbTablesCount: 68, aiWorkflowCount: 20 },
  { id: 'ind-hosp', name: 'Hospitality & Hotel ERP Template', category: 'Industry ERP', description: 'Property Management System (PMS), room booking desk, restaurant POS billing, housekeeping dispatch, and banquet event planner.', modulesIncluded: 24, targetTenants: 'Hotels & Resorts', defaultTier: 'Standard', keyModules: ['Property Booking Desk', 'Restaurant POS Switch', 'Housekeeping Dispatch', 'Banquet Event Planner'], dbTablesCount: 52, aiWorkflowCount: 14 },
  { id: 'ind-const', name: 'Construction & Engineering ERP Template', category: 'Industry ERP', description: 'Project milestone Gantt charts, heavy equipment leasing logs, subcontractor progress billing, and architectural blueprint vault.', modulesIncluded: 26, targetTenants: 'Construction Firms', defaultTier: 'Sovereign Enterprise', keyModules: ['Milestone Gantt Tracker', 'Heavy Equipment Log', 'Subcontractor Billing', 'Blueprint Vault'], dbTablesCount: 56, aiWorkflowCount: 16 },
  { id: 'ind-trans', name: 'Transport & Logistics ERP Template', category: 'Industry ERP', description: 'Fleet GPS telematics, fuel consumption auditing, driver duty rosters, freight waybill invoicing, and customs clearance tracking.', modulesIncluded: 24, targetTenants: 'Logistics & Fleet Operators', defaultTier: 'Standard', keyModules: ['Fleet GPS Telematics', 'Fuel Consumption Audit', 'Freight Waybill Invoicing', 'Customs Clearance Log'], dbTablesCount: 50, aiWorkflowCount: 14 },
  { id: 'ind-mine', name: 'Mining & Extraction ERP Template', category: 'Industry ERP', description: 'Mineral yield tonnage tracking, explosive safety audit, royalty government tax calculation, heavy plant maintenance, and environmental remediation.', modulesIncluded: 28, targetTenants: 'Mining & Extraction Firms', defaultTier: 'Sovereign Enterprise', keyModules: ['Tonnage Yield Tracker', 'Explosives Safety Audit', 'Government Royalty Tax', 'Environmental Compliance'], dbTablesCount: 60, aiWorkflowCount: 18 },
  { id: 'ind-energy', name: 'Energy & Utility ERP Template', category: 'Industry ERP', description: 'Smart meter billing, power grid maintenance scheduling, renewable solar farm yield auditing, and customer outage dispatch.', modulesIncluded: 26, targetTenants: 'Power & Utility Providers', defaultTier: 'Sovereign Enterprise', keyModules: ['Smart Meter Billing Switch', 'Grid Maintenance Scheduler', 'Solar Yield Auditor', 'Outage Dispatch Desk'], dbTablesCount: 56, aiWorkflowCount: 16 },
  { id: 'ind-telco', name: 'Telecom & ISP ERP Template', category: 'Industry ERP', description: 'Fiber network node monitoring, bandwidth subscriber billing, SIM registration compliance, and cell tower lease accounting.', modulesIncluded: 28, targetTenants: 'Telecoms & ISPs', defaultTier: 'Sovereign Enterprise', keyModules: ['Fiber Node Monitoring', 'Subscriber Bandwidth Billing', 'SIM Compliance Vault', 'Tower Lease Accounting'], dbTablesCount: 62, aiWorkflowCount: 18 },
  { id: 'ind-retail', name: 'Retail & Multi-Branch POS ERP Template', category: 'Industry ERP', description: 'Multi-store cashier POS terminals, barcode scanner inventory, loyalty points engine, supplier consignment, and daily cash reconciliation.', modulesIncluded: 24, targetTenants: 'Supermarkets & Retail Chains', defaultTier: 'Standard', keyModules: ['Multi-Store POS Switch', 'Barcode Inventory Engine', 'Loyalty Points Matrix', 'Daily Cash Reconciliation'], dbTablesCount: 50, aiWorkflowCount: 14 },

  // Government ERP (5 Templates)
  { id: 'gov-min', name: 'Ministry ERP Template', category: 'Government ERP', description: 'National budget appropriation accounting, civil service payroll, parliamentary query tracking, public procurement portal, and ministerial decree vault.', modulesIncluded: 32, targetTenants: 'National Ministries', defaultTier: 'Sovereign Enterprise', keyModules: ['Budget Appropriation Ledger', 'Civil Service Payroll', 'Procurement Portal', 'Ministerial Decree Vault'], dbTablesCount: 72, aiWorkflowCount: 22 },
  { id: 'gov-local', name: 'Local Government & Municipal ERP', category: 'Government ERP', description: 'Property rate tax valuation, trade license permit issuance, waste collection route dispatch, municipal court fines, and citizen grievance desk.', modulesIncluded: 28, targetTenants: 'Counties & Municipalities', defaultTier: 'Sovereign Enterprise', keyModules: ['Property Rate Valuation', 'Trade License Issuance', 'Waste Route Dispatch', 'Citizen Grievance Desk'], dbTablesCount: 64, aiWorkflowCount: 18 },
  { id: 'gov-rev', name: 'National Revenue Authority ERP', category: 'Government ERP', description: 'Taxpayer PIN registry, customs declaration clearing, VAT e-invoicing verification, excise stamp tracking, and audit enforcement.', modulesIncluded: 34, targetTenants: 'Revenue Authorities', defaultTier: 'Sovereign Enterprise', keyModules: ['Taxpayer PIN Registry', 'Customs Declaration Switch', 'VAT E-Invoicing Engine', 'Audit Enforcement AI'], dbTablesCount: 78, aiWorkflowCount: 25 },
  { id: 'gov-citizen', name: 'Citizen Service & Identity ERP', category: 'Government ERP', description: 'National biometric identity registry, birth/marriage/death civil registration, e-passport issuance, and digital citizen services portal.', modulesIncluded: 30, targetTenants: 'Civil Registration Depts', defaultTier: 'Sovereign Enterprise', keyModules: ['Biometric Identity Vault', 'Civil Registration Log', 'E-Passport Processing', 'Citizen Digital Gateway'], dbTablesCount: 68, aiWorkflowCount: 20 },
  { id: 'gov-pub', name: 'Public Administration & Civil Service ERP', category: 'Government ERP', description: 'Civil service establishment ceiling, pension fund calculation, performance contract evaluation, and government asset inventory.', modulesIncluded: 28, targetTenants: 'Public Service Commissions', defaultTier: 'Sovereign Enterprise', keyModules: ['Establishment Ceiling Log', 'Pension Calculation Engine', 'Performance Evaluation', 'Public Asset Inventory'], dbTablesCount: 62, aiWorkflowCount: 18 }
];

/**
 * PHASE 4 & 5 (v20.0 & v21.0): Universal Core Module Library (15 Reusable Modules)
 */
export const UNIVERSAL_CORE_MODULES: UniversalModuleDef[] = [
  { id: 'mod-id', name: 'Zero-Trust Identity & RBAC', type: 'Universal Core', description: 'Multi-tenant role boundaries, session tokens, MFA authentication, and cryptographic audit logs.', version: 'v6.1.0', status: 'Installed & Active', dependencies: [], licensing: 'Included', category: 'Security' },
  { id: 'mod-fin', name: 'FAAP General Ledger & Treasury', type: 'Universal Core', description: 'Double-entry general ledger with automated debits/credits, chart of accounts, and 1.5% clearing switch.', version: 'v4.2.0', status: 'Installed & Active', dependencies: ['mod-id'], licensing: 'Included', category: 'Finance' },
  { id: 'mod-hr', name: 'Universal Human Resources & Payroll', type: 'Universal Core', description: 'Employee master file, contracts, leave management, automated payroll tax deduction, and payslip generation.', version: 'v3.8.0', status: 'Installed & Active', dependencies: ['mod-id', 'mod-fin'], licensing: 'Included', category: 'Human Resources' },
  { id: 'mod-crm', name: 'Universal CRM & Stakeholder Manager', type: 'Universal Core', description: 'Client/member/citizen profile indexing, interaction history, support tickets, and communication logs.', version: 'v3.5.0', status: 'Installed & Active', dependencies: ['mod-id'], licensing: 'Included', category: 'Operations' },
  { id: 'mod-proc', name: 'Universal Procurement & Requisition', type: 'Universal Core', description: 'Purchase requisition approval hierarchies, supplier quotation comparison, LPO issuance, and goods receipt notes.', version: 'v3.6.0', status: 'Installed & Active', dependencies: ['mod-id', 'mod-fin'], licensing: 'Included', category: 'Operations' },
  { id: 'mod-inv', name: 'Universal Inventory & Asset Management', type: 'Universal Core', description: 'Stock movement ledger, barcode tracking, re-order level alerts, depreciation calculation, and physical stocktaking.', version: 'v4.0.0', status: 'Installed & Active', dependencies: ['mod-id', 'mod-fin'], licensing: 'Included', category: 'Operations' },
  { id: 'mod-doc', name: 'Sovereign Document Management Vault', type: 'Universal Core', description: 'AES-256 encrypted file indexing, OCR text scanning, version control, and granular access sharing.', version: 'v4.5.0', status: 'Installed & Active', dependencies: ['mod-id'], licensing: 'Included', category: 'Governance' },
  { id: 'mod-work', name: 'Workflow & Rule Automation Engine', type: 'Universal Core', description: 'Custom multi-tier approval hierarchies, cron schedulers, conditional triggers, and automated escalations.', version: 'v5.0.0', status: 'Installed & Active', dependencies: ['mod-id'], licensing: 'Included', category: 'Operations' },
  { id: 'mod-analy', name: 'Universal Analytics & BI Dashboard', type: 'Universal Core', description: 'Real-time multi-dimensional data visualization, interactive chart widgets, and drill-down metric analysis.', version: 'v4.2.0', status: 'Installed & Active', dependencies: ['mod-id'], licensing: 'Included', category: 'Intelligence' },
  { id: 'mod-rep', name: 'Compliance Reporting & Export Studio', type: 'Universal Core', description: 'Standard financial, operational, and regulatory PDF/Excel report generator with digital signature stamping.', version: 'v3.9.0', status: 'Installed & Active', dependencies: ['mod-id', 'mod-fin'], licensing: 'Included', category: 'Governance' },
  { id: 'mod-notif', name: 'Universal Notification Switch', type: 'Universal Core', description: 'SMS, Email, WhatsApp, and in-app alert dispatching with retry queues and delivery receipt tracking.', version: 'v4.0.0', status: 'Installed & Active', dependencies: ['mod-id'], licensing: 'Included', category: 'Communication' },
  { id: 'mod-audit', name: 'Immutable Audit Trail & Telemetry', type: 'Universal Core', description: 'Append-only cryptographically signed transaction log, user activity surveillance, and system health metrics.', version: 'v5.2.0', status: 'Installed & Active', dependencies: ['mod-id'], licensing: 'Included', category: 'Governance' },
  { id: 'mod-ai', name: 'JUMO AI Cognitive Assistant Add-on', type: 'Universal Core', description: 'Embedded conversational AI setup guide, workflow generator, anomaly detector, and automated data mapper.', version: 'v4.5.0', status: 'Installed & Active', dependencies: ['mod-id'], licensing: 'Included', category: 'Intelligence' },
  { id: 'mod-bill', name: 'Subscription & Institutional Billing', type: 'Universal Core', description: 'Automated invoice generation, recurring fee subscription management, M-Pesa/Bank clearing, and receipting.', version: 'v3.8.0', status: 'Installed & Active', dependencies: ['mod-id', 'mod-fin'], licensing: 'Included', category: 'Finance' },
  { id: 'mod-sec', name: 'AEGIS Ring-0 Security Firewall', type: 'Universal Core', description: 'Continuous intrusion detection, IP rate limiting, DDoS mitigation, and administrative MFA challenge walls.', version: 'v6.0.0', status: 'Installed & Active', dependencies: ['mod-id'], licensing: 'Included', category: 'Security' }
];

/**
 * PHASE 6 (v21.0): Platform-Specific Module Libraries
 */
export const PLATFORM_SPECIFIC_MODULES: UniversalModuleDef[] = [
  // FAAP Specific
  { id: 'faap-gl', name: 'General Ledger Core Engine', type: 'Platform Specific', targetPlatform: 'faap-platform', description: 'Authoritative debit/credit transaction table with $0.00 parity check.', version: 'v4.2.0', status: 'Installed & Active', dependencies: ['mod-fin'], licensing: 'Sovereign Core', category: 'Finance' },
  { id: 'faap-ap', name: 'Accounts Payable Switch', type: 'Platform Specific', targetPlatform: 'faap-platform', description: 'Supplier invoice aging, payment authorization scheduling, and disbursement.', version: 'v4.1.0', status: 'Installed & Active', dependencies: ['mod-fin'], licensing: 'Sovereign Core', category: 'Finance' },
  { id: 'faap-ar', name: 'Accounts Receivable Switch', type: 'Platform Specific', targetPlatform: 'faap-platform', description: 'Customer billing, debt aging analysis, dunning letters, and receipt reconciliation.', version: 'v4.1.0', status: 'Installed & Active', dependencies: ['mod-fin'], licensing: 'Sovereign Core', category: 'Finance' },
  { id: 'faap-treasury', name: 'Multi-Currency Treasury Router', type: 'Platform Specific', targetPlatform: 'faap-platform', description: 'Bank account reconciliation, liquidity yield forecasting, and FX gain/loss accounting.', version: 'v4.2.0', status: 'Installed & Active', dependencies: ['mod-fin'], licensing: 'Sovereign Core', category: 'Finance' },
  { id: 'faap-tax', name: 'Automated Tax Compliance Engine', type: 'Platform Specific', targetPlatform: 'faap-platform', description: 'VAT withholding, PAYE calculation, excise stamp tracking, and tax authority API e-invoicing.', version: 'v4.0.0', status: 'Installed & Active', dependencies: ['mod-fin'], licensing: 'Sovereign Core', category: 'Finance' },

  // DIGITAL PAY Specific
  { id: 'pay-gateway', name: 'Universal Payment Gateway Switch', type: 'Platform Specific', targetPlatform: 'digital-pay', description: 'Direct API routing to Visa, Mastercard, UnionPay, and regional banking switches.', version: 'v3.5.0', status: 'Installed & Active', dependencies: [], licensing: 'Sovereign Core', category: 'Finance' },
  { id: 'pay-mobile', name: 'Mobile Money Clearing Router', type: 'Platform Specific', targetPlatform: 'digital-pay', description: 'Real-time STK push and C2B/B2C automated clearing for M-Pesa, Airtel Money, and MTN.', version: 'v3.8.0', status: 'Installed & Active', dependencies: [], licensing: 'Sovereign Core', category: 'Finance' },
  { id: 'pay-settle', name: '1.5% Clearing & Settlement Switch', type: 'Platform Specific', targetPlatform: 'digital-pay', description: 'Automated 1.5% transaction clearing fee deduction routing directly to JUMO Master Treasury.', version: 'v4.0.0', status: 'Installed & Active', dependencies: [], licensing: 'Sovereign Core', category: 'Finance' },

  // CLOUD Specific
  { id: 'cloud-k8s', name: 'Kubernetes Cluster Controller', type: 'Platform Specific', targetPlatform: 'cloud-platform', description: 'Automated pod provisioning, container self-healing, load balancing, and ingress routing.', version: 'v5.1.0', status: 'Installed & Active', dependencies: [], licensing: 'Sovereign Core', category: 'Operations' },
  { id: 'cloud-db', name: 'Distributed PostgreSQL Pool Manager', type: 'Platform Specific', targetPlatform: 'cloud-platform', description: 'Managed database connection pools, read-replica routing, and automated point-in-time recovery.', version: 'v5.0.0', status: 'Installed & Active', dependencies: [], licensing: 'Sovereign Core', category: 'Operations' },

  // AEGIS Specific
  { id: 'aegis-zt', name: 'Zero-Trust Continuous Authorization', type: 'Platform Specific', targetPlatform: 'aegis-platform', description: 'Cryptographic token session validation, IP geolocation fencing, and continuous device trust evaluation.', version: 'v6.0.0', status: 'Installed & Active', dependencies: [], licensing: 'Sovereign Core', category: 'Security' },
  { id: 'aegis-vault', name: 'AES-256 Production Secrets Vault', type: 'Platform Specific', targetPlatform: 'aegis-platform', description: 'Hardware security module (HSM) simulated encrypted storage for Stripe, Gemini, and banking API keys.', version: 'v6.0.0', status: 'Installed & Active', dependencies: [], licensing: 'Sovereign Core', category: 'Security' }
];

/**
 * PHASE 9 (v20.0): Subscription & Licensing Tier Definitions
 */
export const SUBSCRIPTION_LICENSING_PLANS: SubscriptionTierDef[] = [
  {
    id: 'trial-sandbox',
    name: 'Institutional Developer Trial',
    price: '$0',
    billingPeriod: '/ 30-Day Sandbox',
    userSeats: 'Up to 15 Tenant Users',
    features: [
      'Access to any selected ERP Template (Education, SACCO, Church, etc.)',
      'Standard 15 Universal Core Modules Included',
      'Local SQLite / JSON Cache database sandbox',
      'Standard Portal AI Assistant Guidance',
      'Community & Documentation Access'
    ],
    unpaidAccessRule: 'Fully functional in evaluation sandbox mode; public portal visibility maintained forever.',
    highlight: false
  },
  {
    id: 'standard-sub',
    name: 'Institutional Standard Subscription',
    price: '$499',
    billingPeriod: '/ month per domain tenant',
    userSeats: 'Up to 500 Active Users',
    features: [
      'Full production deployment of selected ERP Template',
      'All 98 Universal Core + Domain Specialist Modules',
      'FAAP General Ledger with $0.00 double-entry parity enforcement',
      'Automated daily cloud backups & SLA 99.99% uptime',
      '24/7 Priority Concierge Support & automated LTS updates'
    ],
    unpaidAccessRule: 'If unpaid, public portal remains accessible for transparency, but internal operational write transactions are restricted to read-only until renewal.',
    highlight: true
  },
  {
    id: 'enterprise-sov',
    name: 'Sovereign Enterprise Cluster',
    price: 'Custom',
    billingPeriod: '/ annual enterprise licensing',
    userSeats: 'Unlimited Users & Multi-Campus/Branch',
    features: [
      'Dedicated multi-node Kubernetes replication cluster',
      'Custom AI vector database training & institutional RAG grounding',
      'On-premise, private cloud, or air-gapped edge server installation',
      'Dedicated institutional deployment engineer & 99.999% Ring-0 SLA',
      'Custom API adapter integrations with central bank / government registries'
    ],
    unpaidAccessRule: 'Sovereign contract term governance; graceful degraded read-only mode with zero data loss.',
    highlight: false
  }
];
