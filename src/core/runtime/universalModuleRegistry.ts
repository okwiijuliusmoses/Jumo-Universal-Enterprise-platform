/**
 * JUMO UEOS v28.0 — Universal Sovereign Module Registry (Ring-0 Governed)
 * Authoritative catalog of 180+ digital hybrid enterprise modules across 15 major domains.
 * Only the Owner Control Center (Ring-0) may globally install, remove, license, or publish modules.
 */

export interface UniversalModuleDefinition {
  id: string;
  name: string;
  description: string;
  domainCategory: 
    | 'Enterprise Foundation'
    | 'Financial Platform'
    | 'Human Capital'
    | 'Education'
    | 'Communication'
    | 'AI & Intelligence'
    | 'Security & Governance'
    | 'Cloud & Infrastructure'
    | 'Software Factory'
    | 'Innovation & Research';
  version: string;
  status: 'INSTALLED' | 'AVAILABLE' | 'BETA' | 'DISABLED' | 'RING_0_LOCKED';
  isRing0Governed: boolean;
  assignedErpFamilies: string[]; // e.g. ['all'] or specific ERP IDs like ['church', 'education']
  permissions: string[];
  features: string[];
  licenseTier: 'Core Foundation' | 'Enterprise Hybrid' | 'Sovereign Pro' | 'Beta Sandbox';
}

const UNIVERSAL_MODULE_CATALOG: UniversalModuleDefinition[] = [
  // ==========================================
  // 1. ENTERPRISE FOUNDATION (21 Modules)
  // ==========================================
  {
    id: 'fnd_identity',
    name: 'Zero-Trust Identity & MFA Gateway',
    description: 'Sovereign digital identity, MFA challenge wall, and OAuth session federation.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['IDENTITY_ADMIN', 'RBAC_READ'],
    features: ['Dashboard', 'Operational Workspace', 'Configuration Center', 'Reports', 'Audit Logs', 'API Endpoints'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'fnd_org',
    name: 'Sovereign Organization Hierarchy Manager',
    description: 'Multi-subsidiary, holding structure, and institutional boundary demarcation.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['ORG_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Configuration Center', 'Reports', 'AI Assistant'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'fnd_branches',
    name: 'Multi-Branch & Regional Center Switch',
    description: 'Global campus, parish, municipal branch, and satellite office management.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['BRANCH_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Configuration Center', 'Reports', 'Analytics'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'fnd_departments',
    name: 'Departmental Governance & Cost Allocator',
    description: 'Departmental charter, cost allocation, staff roster, and budget demarcation.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['DEPT_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Configuration Center', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'fnd_users',
    name: 'Universal User Directory & Biometric Census',
    description: 'Master user registry, biometric KYC, demographic census, and credential management.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['USER_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Configuration Center', 'Reports', 'AI Assistant', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'fnd_roles',
    name: 'Aegis Role-Based Access Control (RBAC)',
    description: 'Role assignment, privilege segregation, and Maker-Checker authorization policies.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['RBAC_ADMIN'],
    features: ['Dashboard', 'Configuration Center', 'Reports', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'fnd_permissions',
    name: 'Granular Attribute-Based Permission Scope',
    description: 'Row-level and attribute-level database segregation policies per tenant.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['PERM_ADMIN'],
    features: ['Dashboard', 'Configuration Center', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'fnd_workflow',
    name: 'Universal Event Workflow Automation Engine',
    description: 'Event-driven workflow triggers, BPMN automation, and automated routing loops.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['WORKFLOW_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Configuration Center', 'Reports', 'AI Assistant'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'fnd_approvals',
    name: 'Multi-Tier Maker-Checker Approval Pipeline',
    description: 'Hierarchical requisition approval, financial sign-off, and compliance stamping.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['APPROVAL_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Notifications'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'fnd_notifications',
    name: 'Omnichannel Notification & Alert Hub',
    description: 'Integrated push, SMS, email, and WhatsApp notification dispatch engine.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['NOTIF_ADMIN'],
    features: ['Dashboard', 'Configuration Center', 'Reports', 'API Endpoints'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'fnd_calendar',
    name: 'Universal Institutional Scheduling Calendar',
    description: 'Institutional master calendar, event scheduling, resource reservation, and reminders.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['CALENDAR_READ', 'CALENDAR_WRITE'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'fnd_dashboard',
    name: 'Executive Sovereign Command Dashboard',
    description: 'Customizable executive KPI widgets, operational charts, and live system status.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['DASHBOARD_VIEW'],
    features: ['Dashboard', 'Configuration Center', 'Analytics'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'fnd_reports',
    name: 'Real-Time Dynamic Reporting Engine',
    description: 'Generate, schedule, and export custom PDF, Excel, and JSON compliance reports.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['REPORT_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'AI Assistant'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'fnd_analytics',
    name: 'Operational Intelligence & Telemetry Studio',
    description: 'High-resolution telemetry, operational benchmarking, and trend forecasting.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['ANALYTICS_VIEW'],
    features: ['Dashboard', 'Analytics', 'Reports', 'AI Assistant'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'fnd_search',
    name: 'Global Neural & Semantic Indexing Search',
    description: 'Natural language search across all institutional records, ledgers, and documents.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['SEARCH_ALL'],
    features: ['Dashboard', 'Operational Workspace', 'AI Assistant'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'fnd_documents',
    name: 'Universal Sovereign Document Vault',
    description: 'Structured document repository, versioning, indexing, and OCR metadata parsing.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['DOC_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Configuration Center', 'AI Assistant'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'fnd_audit',
    name: 'AEGIS 10-W Immutable Audit Ledger',
    description: 'Tamper-proof cryptographic SHA-256 log of every administrative and financial action.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['AUDIT_VIEW'],
    features: ['Dashboard', 'Reports', 'Audit Logs', 'API Endpoints'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'fnd_settings',
    name: 'Tenant Configuration & Governance Parameter',
    description: 'Institutional settings, fiscal year demarcation, currency defaults, and localization.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['TENANT_ADMIN'],
    features: ['Configuration Center', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'fnd_branding',
    name: 'White-Label Sovereign Branding Studio',
    description: 'Custom institutional colors, official logos, motto, seals, and CSS theme overrides.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['BRANDING_ADMIN'],
    features: ['Dashboard', 'Configuration Center'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'fnd_licensing',
    name: 'Sovereign Tenant License & Entitlement Manager',
    description: 'Subscription enforcement, module entitlement tracking, and seat allocation.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['LICENSE_ADMIN'],
    features: ['Dashboard', 'Configuration Center', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'fnd_marketplace',
    name: 'Ring-0 Governed Module Marketplace',
    description: 'Browse, request, and discover enterprise hybrid modules governed by Owner Control Center.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['MARKETPLACE_VIEW'],
    features: ['Dashboard', 'Operational Workspace'],
    licenseTier: 'Core Foundation'
  },

  // ==========================================
  // 2. FINANCIAL PLATFORM (20 Modules)
  // ==========================================
  {
    id: 'faap_ledger',
    name: 'FAAP Double-Entry Cryptographic Ledger',
    description: 'Sovereign general ledger guaranteeing exact $0.00 debit/credit balance parity.',
    domainCategory: 'Financial Platform',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['FAAP_ADMIN', 'LEDGER_POST'],
    features: ['Dashboard', 'Operational Workspace', 'Configuration Center', 'Reports', 'Audit Logs', 'API Endpoints'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'faap_budgeting',
    name: 'Zero-Based Budgeting & Variance Control',
    description: 'Annual budget formulation, departmental allocation, and real-time variance locking.',
    domainCategory: 'Financial Platform',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['BUDGET_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Analytics'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'faap_payroll',
    name: 'Sovereign Enterprise Payroll & Tax Disbursement',
    description: 'Automated staff salary calculation, statutory tax deduction, and RTGS bank clearing.',
    domainCategory: 'Financial Platform',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['PAYROLL_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Configuration Center', 'Reports', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'faap_treasury',
    name: 'Master Treasury & RTGS Liquidity Pool',
    description: 'Institutional cash pooling, investment portfolio management, and liquidity forecasting.',
    domainCategory: 'Financial Platform',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['fin', 'ent', 'coop', 'gov', 'ins', 'church', 'edu'],
    permissions: ['TREASURY_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Analytics', 'API Endpoints'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'faap_banking',
    name: 'SWIFT / SEPA / Open Banking Settlement Gateway',
    description: 'Automated bank statement reconciliation, SWIFT wire routing, and ISO 20022 messaging.',
    domainCategory: 'Financial Platform',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['fin', 'ent', 'coop', 'gov', 'ins', 'commerce', 'realestate'],
    permissions: ['BANKING_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Configuration Center', 'API Endpoints'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'faap_procurement',
    name: 'Automated E-Procurement & Vendor Bidding',
    description: 'Purchase requisitions, vendor quotation scoring, LPO issuance, and goods receipt notes.',
    domainCategory: 'Financial Platform',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['PROCUREMENT_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Workflow Engine'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'faap_inventory',
    name: 'Multi-Warehouse Inventory & Valuation Ledger',
    description: 'FIFO/LIFO stock valuation, barcode tracking, reorder triggers, and warehouse transfers.',
    domainCategory: 'Financial Platform',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['commerce', 'manu', 'agri', 'hlth', 'ent', 'const'],
    permissions: ['INVENTORY_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Analytics'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'faap_assets',
    name: 'Fixed Asset Depreciation & Valuation Tracker',
    description: 'Capital asset registry, straight-line/reducing balance depreciation, and maintenance log.',
    domainCategory: 'Financial Platform',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['ASSET_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'faap_taxation',
    name: 'Statutory Tax Compliance & Automated VAT Filing',
    description: 'Real-time withholding tax calculation, VAT returns, and direct national tax authority clearing.',
    domainCategory: 'Financial Platform',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['TAX_ADMIN'],
    features: ['Dashboard', 'Reports', 'Audit Logs', 'API Endpoints'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'faap_billing',
    name: 'Recurring Invoicing & Automated Dunning Engine',
    description: 'Automated client billing, payment reminders, aging analysis, and credit control.',
    domainCategory: 'Financial Platform',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['BILLING_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Notifications'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'faap_subscriptions',
    name: 'Subscription Tier & Revenue Recognition Engine',
    description: 'IFRS 15 deferred revenue schedules, subscription upgrade/downgrade, and churn analytics.',
    domainCategory: 'Financial Platform',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['telecom', 'media', 'memb', 'ent', 'fin', 'ins'],
    permissions: ['SUB_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Analytics', 'Reports'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'faap_receivables',
    name: 'Accounts Receivable & Debt Recovery Router',
    description: 'Customer ledger, debtor aging analysis, payment collection, and legal dispute tracking.',
    domainCategory: 'Financial Platform',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['AR_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Workflow Engine'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'faap_payables',
    name: 'Accounts Payable & Vendor Disbursement Engine',
    description: 'Supplier invoices, automated 3-way matching, payment scheduling, and remittance advice.',
    domainCategory: 'Financial Platform',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['AP_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'faap_cash',
    name: 'Real-Time Cash Flow Forecasting & Sweeping',
    description: 'AI cash flow horizon modeling, overnight sweeps, and liquidity stress testing.',
    domainCategory: 'Financial Platform',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['CASH_ADMIN'],
    features: ['Dashboard', 'Analytics', 'AI Assistant', 'Reports'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'faap_costcenters',
    name: 'Departmental Cost Center & P&L Attribution',
    description: 'Granular profit & loss reporting per branch, project, ministry, or academic department.',
    domainCategory: 'Financial Platform',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['COST_ADMIN'],
    features: ['Dashboard', 'Reports', 'Analytics'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'faap_multicurrency',
    name: 'Real-Time Foreign Exchange & Hedging Gateway',
    description: 'Multi-currency ledger revaluation, real-time FX feed integration, and forex gain/loss tracking.',
    domainCategory: 'Financial Platform',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['ent', 'fin', 'trans', 'commerce', 'gov', 'ngo'],
    permissions: ['FX_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'API Endpoints', 'Reports'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'faap_forecasting',
    name: 'AI-Powered Financial Horizon & Solvency Modeler',
    description: 'Monte Carlo solvency simulation, revenue forecasting, and capital expenditure modeling.',
    domainCategory: 'Financial Platform',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['FORECAST_ADMIN'],
    features: ['Dashboard', 'AI Assistant', 'Analytics', 'Reports'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'faap_analytics',
    name: 'Executive Financial KPI & Ratio Dashboard',
    description: 'Real-time liquidity ratios, EBITDA, ROI, working capital, and DuPont financial analysis.',
    domainCategory: 'Financial Platform',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['FIN_ANALYTICS'],
    features: ['Dashboard', 'Analytics', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'faap_revenue',
    name: 'Automated Revenue Management & Yield Optimizer',
    description: 'Dynamic pricing optimization, fee collection assurance, and revenue leak detection.',
    domainCategory: 'Financial Platform',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['hospitality', 'telecom', 'commerce', 'fin', 'realestate'],
    permissions: ['REVENUE_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'AI Assistant', 'Analytics'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'faap_grant',
    name: 'Restricted Grant Accounting & Donor Compliance',
    description: 'Fund accounting, donor restriction tracking, grant burn rate, and institutional reporting.',
    domainCategory: 'Financial Platform',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['ngo', 'church', 'edu', 'gov', 'hlth', 'cult'],
    permissions: ['GRANT_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Enterprise Hybrid'
  },

  // ==========================================
  // 3. HUMAN CAPITAL (15 Modules)
  // ==========================================
  {
    id: 'hr_core',
    name: 'Core Human Resource & Employee File Directory',
    description: 'Master staff registry, digital employment contracts, career history, and organizational chart.',
    domainCategory: 'Human Capital',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['HR_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Configuration Center', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'hr_recruitment',
    name: 'AI-Powered Talent Acquisition & Applicant Tracker',
    description: 'Job posting distribution, resume AI screening, interview scheduling, and offer letter generation.',
    domainCategory: 'Human Capital',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['RECRUIT_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'AI Assistant', 'Workflow Engine'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'hr_onboarding',
    name: 'Automated Digital Staff Onboarding & Induction',
    description: 'New hire onboarding workflows, equipment provisioning, policy sign-off, and buddy assignment.',
    domainCategory: 'Human Capital',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['ONBOARD_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Workflow Engine'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'hr_performance',
    name: 'OKRs, KPIs & 360-Degree Performance Appraisal',
    description: 'Objective tracking, continuous feedback, peer reviews, and annual performance calibration.',
    domainCategory: 'Human Capital',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['PERF_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Analytics'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'hr_leave',
    name: 'Automated Absence, Vacation & Maternity Management',
    description: 'Leave entitlement accrual, calendar integration, holiday tracking, and absence reporting.',
    domainCategory: 'Human Capital',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['LEAVE_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Workflow Engine', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'hr_attendance',
    name: 'Biometric & Geo-Fenced Time & Attendance Log',
    description: 'Biometric clock-in, mobile geo-fenced attendance, shift roster scheduling, and overtime audit.',
    domainCategory: 'Human Capital',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['ATTEND_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'hr_timetracking',
    name: 'Project & Billable Hour Time-Sheet Router',
    description: 'Granular timesheet entry, billable rate multiplier, project cost attribution, and client invoicing.',
    domainCategory: 'Human Capital',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['ent', 'const', 'manu', 'legal', 'media'],
    permissions: ['TIME_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Analytics'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'hr_training',
    name: 'Corporate LMS & Staff Skill Upliftment Portal',
    description: 'E-learning modules, mandatory compliance training courses, certification tracking, and quizzes.',
    domainCategory: 'Human Capital',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['TRAIN_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'AI Assistant'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'hr_competency',
    name: 'Skill Gap Analysis & Competency Matrix',
    description: 'Organizational skill inventory, competency framework mapping, and targeted training triggers.',
    domainCategory: 'Human Capital',
    version: '28.0.1',
    status: 'AVAILABLE',
    isRing0Governed: true,
    assignedErpFamilies: ['ent', 'gov', 'edu', 'hlth', 'manu'],
    permissions: ['COMP_ADMIN'],
    features: ['Dashboard', 'Analytics', 'Reports', 'AI Assistant'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'hr_succession',
    name: 'Executive Succession Planning & Bench Strength',
    description: 'Key leadership risk identification, bench strength readiness scoring, and retention planning.',
    domainCategory: 'Human Capital',
    version: '28.0.1',
    status: 'AVAILABLE',
    isRing0Governed: true,
    assignedErpFamilies: ['ent', 'gov', 'fin', 'ins'],
    permissions: ['SUCCESSION_ADMIN'],
    features: ['Dashboard', 'Analytics', 'Reports'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'hr_wellness',
    name: 'Employee Occupational Health & Wellness Tracker',
    description: 'Workplace safety incidents, mental health assistance programs, and ergonomic compliance.',
    domainCategory: 'Human Capital',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['WELLNESS_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'hr_benefits',
    name: 'Staff Medical, Pension & Fringe Benefit Router',
    description: 'Health insurance administration, pension contributions, stock options, and staff loan ledger.',
    domainCategory: 'Human Capital',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['BENEFITS_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'hr_discipline',
    name: 'Grievance, Disciplinary & Industrial Relations Log',
    description: 'Confidential grievance tracking, warning letter generation, union relations, and legal defense.',
    domainCategory: 'Human Capital',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['DISCIPLINE_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Audit Logs', 'Reports'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'hr_selfservice',
    name: 'Employee Self-Service (ESS) Mobile Portal',
    description: 'Mobile app for staff payslip download, leave requests, expense claims, and profile updates.',
    domainCategory: 'Human Capital',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['ESS_USER'],
    features: ['Dashboard', 'Operational Workspace', 'Notifications'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'hr_payroll_int',
    name: 'Direct HR-to-FAAP Payroll Clearing Connector',
    description: 'Automated cryptographic bridging of attendance/leave deductions into FAAP general ledger.',
    domainCategory: 'Human Capital',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['PAYROLL_INT_ADMIN'],
    features: ['Configuration Center', 'Audit Logs', 'API Endpoints'],
    licenseTier: 'Core Foundation'
  },

  // ==========================================
  // 4. EDUCATION (20 Modules)
  // ==========================================
  {
    id: 'edu_admissions',
    name: 'Student Admissions & Application Processing',
    description: 'Online application portal, entrance examination scoring, merit ranking, and offer letters.',
    domainCategory: 'Education',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['edu'],
    permissions: ['EDU_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Workflow Engine', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'edu_registration',
    name: 'Academic Semester Registration & Course Enrollment',
    description: 'Course catalog, pre-requisite enforcement, credit hour limits, and semester registration.',
    domainCategory: 'Education',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['edu'],
    permissions: ['EDU_REG_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'edu_records',
    name: 'Sovereign Academic Transcript & Student File Vault',
    description: 'Immutable student permanent academic record, transcript generation, and disciplinary notes.',
    domainCategory: 'Education',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['edu'],
    permissions: ['EDU_RECORDS_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Audit Logs', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'edu_timetabling',
    name: 'AI-Powered Lecture & Exam Room Timetabling',
    description: 'Automated clash-free scheduling of lecture halls, faculty timetables, and laboratory slots.',
    domainCategory: 'Education',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['edu'],
    permissions: ['EDU_TIME_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'AI Assistant', 'Reports'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'edu_examinations',
    name: 'Examination Seating, Grading & Invigilation Log',
    description: 'Exam booklet tracking, invigilation rosters, seating charts, and anonymous marking codes.',
    domainCategory: 'Education',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['edu'],
    permissions: ['EDU_EXAM_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'edu_grading',
    name: 'GPA Calculation & Academic Standing Assessment',
    description: 'Automated GPA/CGPA computation, academic honors classification, and probation rules.',
    domainCategory: 'Education',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['edu'],
    permissions: ['EDU_GRADE_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Analytics'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'edu_learning',
    name: 'Digital Learning Management & Content Repository',
    description: 'Course materials upload, lecture notes, syllabus tracking, and student discussion forums.',
    domainCategory: 'Education',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['edu'],
    permissions: ['EDU_LMS_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'edu_virtual',
    name: 'Real-Time Virtual Classroom & Webinar Broadcast',
    description: 'Integrated WebRTC live streaming lectures, breakout rooms, and session recordings.',
    domainCategory: 'Education',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['edu'],
    permissions: ['EDU_VIRTUAL_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'API Endpoints'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'edu_assignments',
    name: 'Digital Assignment Submission & Plagiarism Checker',
    description: 'Student homework upload portal, automated deadline enforcement, and AI originality scoring.',
    domainCategory: 'Education',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['edu'],
    permissions: ['EDU_ASSIGN_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'AI Assistant', 'Reports'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'edu_research',
    name: 'Postgraduate Research Thesis & Grant Manager',
    description: 'Thesis supervision tracking, defense scheduling, ethical review board, and research grants.',
    domainCategory: 'Education',
    version: '28.0.1',
    status: 'AVAILABLE',
    isRing0Governed: true,
    assignedErpFamilies: ['edu'],
    permissions: ['EDU_RESEARCH_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Workflow Engine'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'edu_library',
    name: 'Integrated Digital & Physical Library Catalog',
    description: 'Book barcode borrowing, digital e-book lending repository, overdue fines, and inter-library loan.',
    domainCategory: 'Education',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['edu'],
    permissions: ['EDU_LIB_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'edu_hostels',
    name: 'Student Dormitory, Hostel & Accommodation Allocator',
    description: 'Room allocation, dormitory fee billing, check-in/check-out inventory, and curfew tracking.',
    domainCategory: 'Education',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['edu'],
    permissions: ['EDU_HOSTEL_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'edu_transport',
    name: 'Campus Shuttle Fleet & Student Transport Tracker',
    description: 'Bus route optimization, student transport passes, driver rosters, and fuel maintenance log.',
    domainCategory: 'Education',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['edu'],
    permissions: ['EDU_TRANS_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'edu_finance',
    name: 'Student Bursary, Fee Billing & Scholarship Ledger',
    description: 'Tuition invoice generation, bursary allocation, payment gateway clearing, and exam financial hold.',
    domainCategory: 'Education',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['edu'],
    permissions: ['EDU_FIN_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'edu_alumni',
    name: 'Alumni Network Engagement & Endowment Directory',
    description: 'Graduating class directory, homecoming event ticketing, endowment pledges, and networking.',
    domainCategory: 'Education',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['edu'],
    permissions: ['EDU_ALUMNI_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'edu_parents',
    name: 'Parent & Guardian Academic Monitoring Portal',
    description: 'Secure mobile access for parents to view attendance, fee balances, report cards, and notices.',
    domainCategory: 'Education',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['edu'],
    permissions: ['EDU_PARENT_USER'],
    features: ['Dashboard', 'Operational Workspace', 'Notifications'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'edu_quality',
    name: 'Academic Quality Assurance & Audit Standards',
    description: 'Curriculum evaluation, student course evaluations, teaching inspection logs, and peer review.',
    domainCategory: 'Education',
    version: '28.0.1',
    status: 'AVAILABLE',
    isRing0Governed: true,
    assignedErpFamilies: ['edu'],
    permissions: ['EDU_QA_ADMIN'],
    features: ['Dashboard', 'Reports', 'Audit Logs'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'edu_accreditation',
    name: 'Institutional & Program Accreditation Tracker',
    description: 'National higher education commission compliance, statutory self-assessment, and faculty ratios.',
    domainCategory: 'Education',
    version: '28.0.1',
    status: 'AVAILABLE',
    isRing0Governed: true,
    assignedErpFamilies: ['edu'],
    permissions: ['EDU_ACCREDIT_ADMIN'],
    features: ['Dashboard', 'Reports', 'Configuration Center'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'edu_graduation',
    name: 'Graduation Clearance & Ceremony Ticketing',
    description: 'Automated graduation audit, library/finance clearance sign-off, and gown issuance tracking.',
    domainCategory: 'Education',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['edu'],
    permissions: ['EDU_GRAD_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Workflow Engine'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'edu_certificates',
    name: 'SHA-256 Verifiable Digital Degree Seal Generator',
    description: 'Cryptographic QR diploma generation, tamper-proof academic seals, and employer verification portal.',
    domainCategory: 'Education',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['edu'],
    permissions: ['EDU_CERT_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Audit Logs', 'API Endpoints'],
    licenseTier: 'Sovereign Pro'
  },

  // ==========================================
  // 5. HEALTHCARE (15 Modules)
  // ==========================================
  {
    id: 'hlth_patients',
    name: 'Master Patient Index & Demographics Census',
    description: 'Unique patient identification, duplicate medical record merging, emergency contact, and insurance ID.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['HLTH_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'hlth_appointments',
    name: 'Outpatient Specialist Scheduling & Queue Manager',
    description: 'Doctor consultation booking, SMS reminders, clinic queue token issuance, and check-in desk.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['HLTH_APPT_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Notifications', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'hlth_emr',
    name: 'Electronic Medical Record (EMR) & Clinical History',
    description: 'Doctor SOAP notes, vital signs charting, nursing assessments, allergies, and diagnosis codes.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['HLTH_EMR_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Audit Logs', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'hlth_laboratory',
    name: 'Diagnostic Laboratory Information System (LIS)',
    description: 'Lab test orders, specimen barcode labeling, automated analyzer feed ingestion, and pathology reports.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['HLTH_LAB_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'API Endpoints'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'hlth_radiology',
    name: 'Picture Archiving & Radiology Information (PACS)',
    description: 'X-ray, MRI, CT scan scheduling, DICOM image storage integration, and radiologist diagnostic reporting.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['HLTH_RAD_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'hlth_pharmacy',
    name: 'Hospital Pharmacy & Controlled Drug Inventory',
    description: 'E-prescriptions, automated drug interaction warnings, stock expiration alerts, and narcotics audit.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['HLTH_PHARM_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'hlth_billing',
    name: 'Medical Billing, ICD-10 Coding & Tariff Clearing',
    description: 'Automated inpatient/outpatient invoicing, itemized bill generation, procedures tariff codes.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['HLTH_BILL_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'hlth_insurance',
    name: 'Automated E-Claim Adjudication & NHIF Gateway',
    description: 'Instant insurance eligibility verification, electronic pre-authorization, and insurance claims batching.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['HLTH_INS_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'API Endpoints', 'Reports'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'hlth_clinical',
    name: 'AI Clinical Decision Support & Triage Assistant',
    description: 'AI symptom checker, emergency room triage prioritization, and clinical risk alert flags.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'AVAILABLE',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['HLTH_AI_ADMIN'],
    features: ['Dashboard', 'AI Assistant', 'Reports'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'hlth_telemedicine',
    name: 'HD Telehealth & Remote Patient Monitoring Suite',
    description: 'Secure HIPAA-compliant video consultations, digital prescription transmission, and remote vitals.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'AVAILABLE',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['HLTH_TELE_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'API Endpoints'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'hlth_ambulance',
    name: 'Emergency Medical Dispatch & Ambulance Tracking',
    description: 'GPS ambulance fleet dispatch, paramedic onboard vitals streaming, and emergency room pre-arrival alert.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'AVAILABLE',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['HLTH_AMB_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'hlth_ward',
    name: 'Inpatient Ward, Bed Occupancy & Discharge Manager',
    description: 'Real-time bed census, nursing handover notes, discharge summary generation, and housekeeping alerts.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['HLTH_WARD_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'hlth_theatre',
    name: 'Surgical Operating Theatre & Anesthesia Scheduling',
    description: 'Operating room booking, surgeon team rosters, surgical implant inventory, and anesthesia logs.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['HLTH_THEATRE_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'hlth_blood',
    name: 'Blood Bank Inventory & Cross-Matching Log',
    description: 'Donor blood collection tracking, ABO/Rh typing, serology screening, cold storage alarm, and transfusions.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['HLTH_BLOOD_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'hlth_vaccination',
    name: 'Immunization Registry & Epidemic Surveillance',
    description: 'Childhood and adult vaccination schedules, cold-chain monitoring, and statutory public health reporting.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['hlth', 'gov'],
    permissions: ['HLTH_VACC_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },

  // ==========================================
  // 6. GOVERNMENT (13 Modules)
  // ==========================================
  {
    id: 'gov_citizens',
    name: 'National Citizen Identity & Biometric Registry',
    description: 'Master population register, national ID card numbering, fingerprint/facial biometrics, and lineage.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['GOV_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Audit Logs', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'gov_civil',
    name: 'Civil Registration of Births, Deaths & Marriages',
    description: 'Official birth certificates, burial permits, marital status registry, and adoption documentation.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['GOV_CIVIL_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'gov_licensing',
    name: 'Municipal Business Licensing & Inspection Portal',
    description: 'Commercial operating permits, health inspection scoring, annual license renewals, and fee collection.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['GOV_LIC_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Workflow Engine'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'gov_permits',
    name: 'Building Permits & Urban Development Authority',
    description: 'Architectural plan submission, structural safety sign-off, zoning compliance, and occupancy certs.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['GOV_PERMIT_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Workflow Engine'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'gov_land',
    name: 'National Land Registry, GIS & Title Deed Cadastre',
    description: 'Parcel cadastral mapping, land ownership title deeds, encumbrance search, and transfer duty clearing.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['GOV_LAND_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'gov_tax',
    name: 'Municipal Revenue Collection & Property Tax Assessment',
    description: 'Property rate valuation rolls, land rates billing, market stall fee collection, and parking revenue.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['GOV_TAX_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'gov_procurement',
    name: 'Public E-Procurement & Sovereign Tender Portal',
    description: 'Open government tender publication, supplier bidding, tender committee evaluation, and contract awards.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['GOV_PROC_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Workflow Engine'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'gov_council',
    name: 'Municipal Council Governance & Resolution Tracking',
    description: 'Council meeting agendas, assembly minutes recording, statutory resolution tracking, and gazetting.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['GOV_COUNCIL_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'gov_publicfinance',
    name: 'Public Finance Management & Treasury Clearing',
    description: 'Exchequer budget releases, commitment accounting, IFMIS synchronization, and sovereign debt audit.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['GOV_FIN_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs', 'API Endpoints'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'gov_elections',
    name: 'Secure Electronic Voting & Electoral Roll Manager',
    description: 'Voter registration roll, biometric polling station check-in, encrypted ballot tallying, and election audits.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'AVAILABLE',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['GOV_VOTE_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'gov_service',
    name: 'Public Service Delivery & Citizen Feedback Dispatch',
    description: 'Citizen service request portal, road repair/water leak ticketing, SLAs, and public satisfaction index.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['GOV_SVC_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Notifications', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'gov_casemgmt',
    name: 'Sovereign Legal Case & Administrative Docket Vault',
    description: 'Public prosecutor dockets, administrative court filings, hearing schedules, and judicial rulings.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['gov', 'legal'],
    permissions: ['GOV_CASE_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'gov_compliance',
    name: 'Public Sector Audit & Statutory Compliance Engine',
    description: 'Auditor General compliance tracking, anti-corruption whistleblowing log, and public transparency reports.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['GOV_COMP_ADMIN'],
    features: ['Dashboard', 'Reports', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },

  // ==========================================
  // 7. AGRICULTURE (10 Modules)
  // ==========================================
  {
    id: 'agri_farm',
    name: 'Master Farm & Acreage Demarcation Registry',
    description: 'Farmer registration, GIS polygon acreage mapping, soil fertility profiles, and irrigation infrastructure.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['AGRI_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'agri_livestock',
    name: 'Livestock Pedigree, Veterinary & Breeding Tracker',
    description: 'RFID ear tag cattle registry, vaccination histories, artificial insemination logs, and daily milk yield.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['AGRI_LIVE_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'agri_crop',
    name: 'Crop Production, Planting Cycle & Harvesting Log',
    description: 'Seed planting calendars, fertilizer application schedules, pest outbreak alerts, and harvest yield records.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['AGRI_CROP_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'agri_extension',
    name: 'Agronomy Extension Officer Deployment & Coaching',
    description: 'Field officer visit routing, mobile agronomy advisory checklists, and farmer field school attendance.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['AGRI_EXT_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Notifications'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'agri_finance',
    name: 'Agri-Credit, Smallholder Loan & Input Subsidy Ledger',
    description: 'Harvest-backed micro-loans, government subsidized fertilizer vouchers, and crop insurance settlement.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['agri', 'coop', 'fin'],
    permissions: ['AGRI_FIN_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'agri_warehouse',
    name: 'Grain Elevator, Silo & Cold Chain Inventory',
    description: 'Warehouse receipt systems WRS, moisture content grading, cold storage temperature alarms, and fumigation.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['agri', 'commerce', 'manu'],
    permissions: ['AGRI_WH_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'agri_traceability',
    name: 'Seed-to-Shelf Farm Produce Traceability Blockchain',
    description: 'QR code origin tracking, organic certification audit trails, and export phytosanitary documentation.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'AVAILABLE',
    isRing0Governed: true,
    assignedErpFamilies: ['agri', 'manu'],
    permissions: ['AGRI_TRACE_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'agri_weather',
    name: 'Satellite Weather Intelligence & Drought Prediction',
    description: 'Real-time rainfall radar feeds, soil moisture satellite index, frost warnings, and planting advisories.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'AVAILABLE',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['AGRI_WX_ADMIN'],
    features: ['Dashboard', 'AI Assistant', 'Reports', 'Analytics'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'agri_pricing',
    name: 'Real-Time Commodity Exchange & Auction Pricing',
    description: 'Live agricultural commodity market prices, auction bidding floor, cooperative pooling, and bulk buyer bids.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['agri', 'commerce'],
    permissions: ['AGRI_PRICE_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Analytics'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'agri_coop',
    name: 'Agricultural Cooperative Member & Dividend Clearing',
    description: 'Farmer cooperative share capital, produce delivery weighing, automated payout calculation, and dividends.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['agri', 'coop'],
    permissions: ['AGRI_COOP_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },

  // ==========================================
  // 8. MANUFACTURING (10 Modules)
  // ==========================================
  {
    id: 'manu_production',
    name: 'Master Production Schedule & Shop Floor Control',
    description: 'Production work orders, assembly line balancing, machine operator shifts, and daily output tallying.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['MANU_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'manu_mrp',
    name: 'Material Requirements Planning (MRP) & BOM Engine',
    description: 'Multi-level Bill of Materials BOM, scrap factor calculation, component explosion, and lead-time scheduling.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['MANU_MRP_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Workflow Engine'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'manu_quality',
    name: 'Six Sigma Quality Control & Defect Tracking Log',
    description: 'Incoming raw material inspection, SPC charts, quarantine holds, root cause CAPA, and ISO 9001 compliance.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['MANU_QC_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'manu_maintenance',
    name: 'Preventive Equipment Maintenance & MTBF Tracker',
    description: 'Factory equipment registry, scheduled maintenance lubrication, spare parts inventory, and breakdown repairs.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['manu', 'const', 'trans'],
    permissions: ['MANU_MAINT_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Notifications'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'manu_warehouse',
    name: 'Automated Factory Warehouse & Forklift Routing',
    description: 'Raw material storage bins, work-in-progress WIP staging, finished goods dispatch, and forklift tasking.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['manu', 'commerce'],
    permissions: ['MANU_WH_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'manu_supplychain',
    name: 'End-to-End Supply Chain & Vendor Lead-Time Modeler',
    description: 'Supplier lead-time tracking, freight forwarding customs clearance, bottleneck prediction, and safety stock.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['manu', 'commerce', 'ent'],
    permissions: ['MANU_SCM_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Analytics'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'manu_procurement',
    name: 'Raw Material Sourcing & Just-In-Time Procurement',
    description: 'Automated raw material purchase orders, vendor price agreement negotiation, and consignment inventory.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['MANU_PROC_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'manu_analytics',
    name: 'Factory OEE Analytics & Efficiency Telemetry',
    description: 'Overall Equipment Effectiveness OEE computation, downtime categorization, scrap cost ratio, and output rate.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['MANU_ANALYTICS'],
    features: ['Dashboard', 'Analytics', 'Reports', 'AI Assistant'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'manu_iot',
    name: 'Industrial IoT Sensor Integration & SCADA Monitoring',
    description: 'PLC data ingestion, SCADA alarms, real-time machine RPM/temperature streaming, and energy consumption.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'AVAILABLE',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['MANU_IOT_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'API Endpoints', 'Analytics'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'manu_monitoring',
    name: 'Real-Time Equipment Vibration & Thermal Health',
    description: 'Predictive acoustic vibration analysis, thermal imaging anomalies, and automated bearing failure alert.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'AVAILABLE',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['MANU_MON_ADMIN'],
    features: ['Dashboard', 'AI Assistant', 'Reports', 'Notifications'],
    licenseTier: 'Sovereign Pro'
  },

  // ==========================================
  // 9. CUSTOMER & BUSINESS (11 Modules)
  // ==========================================
  {
    id: 'biz_crm',
    name: 'Enterprise Customer Relationship Management (CRM)',
    description: '360-degree account directory, contact history, interaction logs, sentiment scoring, and customer notes.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['CRM_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'AI Assistant'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'biz_sales',
    name: 'Sales Pipeline, Opportunity & Quotation Engine',
    description: 'Deal kanban stages, win/loss probability calculation, quotation builder, and sales commission tracking.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['SALES_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Analytics'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'biz_marketing',
    name: 'Omnichannel Marketing Campaign & Lead Nurturer',
    description: 'Email newsletter broadcasts, SMS promotions, lead scoring automation, landing pages, and ROI attribution.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['MKTG_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Analytics'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'biz_contracts',
    name: 'Sovereign Contract Lifecycle Management (CLM)',
    description: 'Contract template drafting, redlining, digital e-signatures, expiration alert timers, and renewal negotiation.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['CLM_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'biz_helpdesk',
    name: 'ITIL Service Desk & Multi-Tier Ticketing Engine',
    description: 'Customer incident tickets, SLA resolution escalation timers, knowledge base suggestions, and CSAT surveys.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['HELPDESK_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Notifications'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'biz_projects',
    name: 'Enterprise Project Management & Gantt Scheduling',
    description: 'Work breakdown structures WBS, Gantt charts, milestone billing triggers, resource leveling, and risk logs.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['PROJ_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Workflow Engine'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'biz_taskmgmt',
    name: 'Kanban Task Allocation & Agile Sprint Router',
    description: 'Agile sprint boards, task assignment, burndown charts, daily standup logs, and sub-task checklists.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['TASK_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Notifications'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'biz_servicedesk',
    name: 'Field Service Management & Technician Dispatch',
    description: 'Mobile technician GPS routing, on-site job completion signatures, spare parts usage, and customer sign-off.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['telecom', 'const', 'manu', 'ent', 'realestate'],
    permissions: ['FSM_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Notifications'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'biz_custportal',
    name: 'Customer Self-Service & Account Statement Portal',
    description: 'Secure client login to download invoice PDFs, pay online via M-Pesa/Card, open tickets, and view contracts.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['CUST_PORTAL_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Notifications'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'biz_vendorportal',
    name: 'Supplier & Vendor Procurement Bidding Portal',
    description: 'Vendor onboarding registration, RFQ response submission, LPO download, and invoice status checking.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['VENDOR_PORTAL_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'biz_partnerportal',
    name: 'Reseller & Channel Partner Commission Gateway',
    description: 'Partner lead registration, deal registration protection, tier discounting schedules, and commission payouts.',
    domainCategory: 'Enterprise Foundation',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['ent', 'telecom', 'media', 'fin'],
    permissions: ['PARTNER_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Analytics'],
    licenseTier: 'Enterprise Hybrid'
  },

  // ==========================================
  // 10. COMMUNICATION (10 Modules)
  // ==========================================
  {
    id: 'comm_email',
    name: 'Sovereign Encrypted Enterprise Email Gateway',
    description: 'Institutional webmail client, domain DKIM/SPF verification, spam filtering, and archive retention.',
    domainCategory: 'Communication',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['EMAIL_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Configuration Center'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'comm_sms',
    name: 'Bulk SMS & OTP Transactional Messaging Router',
    description: 'High-throughput SMS dispatch, alphanumeric sender ID routing, delivery receipt tracking, and OTP verification.',
    domainCategory: 'Communication',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['SMS_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'API Endpoints'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'comm_whatsapp',
    name: 'WhatsApp Business API & Conversational Bot Hub',
    description: 'Official WhatsApp Business API integration, automated customer service chatbots, and rich template messaging.',
    domainCategory: 'Communication',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['WA_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'AI Assistant', 'API Endpoints'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'comm_push',
    name: 'Mobile Push Notification & Alert Dispatcher',
    description: 'Firebase Cloud Messaging FCM / APNS push alert routing to institutional mobile app subscribers.',
    domainCategory: 'Communication',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['PUSH_ADMIN'],
    features: ['Dashboard', 'Configuration Center', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'comm_video',
    name: 'Secure WebRTC Video Conferencing & Townhall Suite',
    description: 'HD browser video meetings, screen sharing, virtual townhalls up to 5,000 attendees, and cloud recording.',
    domainCategory: 'Communication',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['VIDEO_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'API Endpoints'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'comm_chat',
    name: 'Enterprise Team Messaging & Collaboration Chat',
    description: 'Encrypted departmental channels, direct messaging, file sharing, and topic threaded discussions.',
    domainCategory: 'Communication',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['CHAT_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Notifications'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'comm_announcements',
    name: 'Institutional Notice Board & Policy Broadcast',
    description: 'Organization-wide announcements, mandatory policy read-and-acknowledge tracking, and circular archives.',
    domainCategory: 'Communication',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['ANNOUNCE_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'comm_kb',
    name: 'Sovereign Knowledge Base & Wiki Documentation',
    description: 'Hierarchical institutional wiki, standard operating procedures SOPs, article search, and version history.',
    domainCategory: 'Communication',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['KB_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'AI Assistant'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'comm_forms',
    name: 'Dynamic Digital Form Builder & Survey Engine',
    description: 'Drag-and-drop custom form creator, conditional logic branching, data collection, and statistical summary.',
    domainCategory: 'Communication',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['FORM_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Analytics'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'comm_sharing',
    name: 'Secure External Document Sharing & Data Room',
    description: 'Password-protected external document links, watermarking, expiration timers, and download audit logs.',
    domainCategory: 'Communication',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['SHARE_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Audit Logs'],
    licenseTier: 'Enterprise Hybrid'
  },

  // ==========================================
  // 11. AI & INTELLIGENCE (12 Modules)
  // ==========================================
  {
    id: 'ai_jumo',
    name: 'JUMO AI Universal Concierge & Sovereign Copilot',
    description: 'Domain-aware conversational assistant trained on institutional bylaws, ledger rules, and workflows.',
    domainCategory: 'AI & Intelligence',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['AI_USER', 'AI_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'AI Assistant', 'Configuration Center'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'ai_agents',
    name: 'Specialized Autonomous AI Agent Registry',
    description: 'Registry of domain subagents (Auditor Agent, HR Recruiter Agent, Procurement Scorer Agent, Tax Agent).',
    domainCategory: 'AI & Intelligence',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['AI_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Configuration Center', 'Reports'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'ai_swarms',
    name: 'Cooperative Multi-Agent Swarm Orchestration Loop',
    description: 'Multi-agent reasoning loops where autonomous agents debate, cross-verify, and execute complex audits.',
    domainCategory: 'AI & Intelligence',
    version: '28.0.1',
    status: 'AVAILABLE',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['AI_SWARM_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Analytics', 'Reports'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'ai_graph',
    name: 'Enterprise Semantic Knowledge Graph & Ontology',
    description: 'Neural mapping of institutional entities, personnel relationships, asset ownership, and transaction graphs.',
    domainCategory: 'AI & Intelligence',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['AI_GRAPH_ADMIN'],
    features: ['Dashboard', 'Analytics', 'AI Assistant'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'ai_search',
    name: 'Natural Language RAG Semantic Search & Retrieval',
    description: 'Retrieval-Augmented Generation RAG vector embeddings index for instant policy and contract answers.',
    domainCategory: 'AI & Intelligence',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['AI_SEARCH_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'AI Assistant'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'ai_docintel',
    name: 'Document Intelligence & Automated Data Extraction',
    description: 'AI extraction of invoice line items, bank statement tables, contract clauses, and ID card fields.',
    domainCategory: 'AI & Intelligence',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['AI_DOC_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'API Endpoints'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'ai_ocr',
    name: 'High-Precision Multilingual OCR & Layout Parser',
    description: 'Optical character recognition for scanned handwritten registers, old parish archives, and court filings.',
    domainCategory: 'AI & Intelligence',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['AI_OCR_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'ai_predictions',
    name: 'Predictive Forecasting & Trend Horizon Engine',
    description: 'Time-series machine learning forecasting for student enrollment, hospital admissions, and crop yields.',
    domainCategory: 'AI & Intelligence',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['AI_PREDICT_ADMIN'],
    features: ['Dashboard', 'Analytics', 'Reports', 'AI Assistant'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'ai_recommendations',
    name: 'Actionable AI Operational Recommendation Engine',
    description: 'Proactive operational suggestions (e.g., reorder low stock, re-assign overloaded nurse, chase overdue invoice).',
    domainCategory: 'AI & Intelligence',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['AI_REC_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Notifications'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'ai_automation',
    name: 'Self-Healing Workflow Automation & Trigger Hub',
    description: 'AI detection of broken workflow loops, stale approvals, and automatic escalation or rerouting.',
    domainCategory: 'AI & Intelligence',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['AI_AUTO_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Workflow Engine', 'Reports'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'ai_analytics',
    name: 'Natural Language Conversational Analytics Studio',
    description: 'Ask questions in plain English ("Show me Q3 revenue by branch compared to last year") and get instant charts.',
    domainCategory: 'AI & Intelligence',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['AI_ANALYTICS_ADMIN'],
    features: ['Dashboard', 'Analytics', 'AI Assistant', 'Reports'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'ai_governance',
    name: 'Sovereign AI Ethics, Safety & Token Guardrail',
    description: 'LLM token consumption auditing, prompt injection defense, PII masking, and data sovereignty compliance.',
    domainCategory: 'AI & Intelligence',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['AI_GOV_ADMIN'],
    features: ['Dashboard', 'Configuration Center', 'Audit Logs', 'Reports'],
    licenseTier: 'Core Foundation'
  },

  // ==========================================
  // 12. SECURITY & GOVERNANCE (11 Modules)
  // ==========================================
  {
    id: 'sec_aegis',
    name: 'AEGIS Zero-Trust Security Kernel & Intrusion Shield',
    description: 'Continuous Ring-0 session surveillance, IP geo-fencing, brute force lockout, and WAF firewall.',
    domainCategory: 'Security & Governance',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['SEC_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Configuration Center', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'sec_mfa',
    name: 'Hardware Key & Biometric MFA Authentication Wall',
    description: 'FIDO2 / WebAuthn hardware security key enforcement, authenticator app TOTP, and biometric passkeys.',
    domainCategory: 'Security & Governance',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['SEC_MFA_ADMIN'],
    features: ['Dashboard', 'Configuration Center', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'sec_rbac',
    name: 'Zero-Trust Role & Attribute Access Enforcement',
    description: 'Strict least-privilege attribute-based access control ABAC and separation of duties SOD validation.',
    domainCategory: 'Security & Governance',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['SEC_RBAC_ADMIN'],
    features: ['Dashboard', 'Configuration Center', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'sec_policy',
    name: 'Sovereign Security Policy & Compliance Engine',
    description: 'Automated enforcement of password complexity, session idle timeouts, device compliance, and VPN rules.',
    domainCategory: 'Security & Governance',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['SEC_POLICY_ADMIN'],
    features: ['Dashboard', 'Configuration Center', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'sec_encryption',
    name: 'AES-256 & RSA-4096 Data Encryption-at-Rest/Transit',
    description: 'Field-level database column encryption, TLS 1.3 strict transit enforcement, and KMS key rotation.',
    domainCategory: 'Security & Governance',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['SEC_ENC_ADMIN'],
    features: ['Dashboard', 'Configuration Center', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'sec_vault',
    name: 'Owner-Only Cryptographic Production Secrets Vault',
    description: 'AES-GCM sealed vault protecting Stripe, M-Pesa, Gemini, SWIFT, and banking API credentials.',
    domainCategory: 'Security & Governance',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['RING_0_OWNER'],
    features: ['Dashboard', 'Configuration Center', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'sec_trails',
    name: 'Immutable Tamper-Proof Audit Trail & Forensics Log',
    description: 'Write-once-read-many WORM cryptographic audit hashing preventing log modification or deletion.',
    domainCategory: 'Security & Governance',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['SEC_AUDIT_VIEW'],
    features: ['Dashboard', 'Reports', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'sec_apisec',
    name: 'API Gateway Rate Limiting & WAF Protection Shield',
    description: 'DDoS mitigation, API token rate limiting, SQL injection filter, and cross-site scripting XSS shield.',
    domainCategory: 'Security & Governance',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['SEC_API_ADMIN'],
    features: ['Dashboard', 'Configuration Center', 'Reports', 'API Endpoints'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'sec_threat',
    name: 'Real-Time Threat Detection & Behavioral Anomaly AI',
    description: 'AI detection of abnormal login times, massive data downloads, or unauthorized lateral movement.',
    domainCategory: 'Security & Governance',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['SEC_THREAT_ADMIN'],
    features: ['Dashboard', 'AI Assistant', 'Notifications', 'Reports'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'sec_risk',
    name: 'Continuous Enterprise Risk Monitoring & Scoring',
    description: 'Institutional risk register, financial exposure heatmap, vendor risk scoring, and mitigation tracking.',
    domainCategory: 'Security & Governance',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['SEC_RISK_ADMIN'],
    features: ['Dashboard', 'Reports', 'Analytics'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'sec_compliance',
    name: 'Statutory Compliance & Regulatory Reporting Hub',
    description: 'Automated adherence tracking for GDPR, HIPAA, ISO 27001, SOC 2 Type II, and central bank regulations.',
    domainCategory: 'Security & Governance',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['SEC_COMP_ADMIN'],
    features: ['Dashboard', 'Reports', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },

  // ==========================================
  // 13. CLOUD & INFRASTRUCTURE (11 Modules)
  // ==========================================
  {
    id: 'cld_k8s',
    name: 'Kubernetes Cluster & Pod Autoscaling Orchestrator',
    description: 'Multi-region K8s node management, horizontal pod autoscaling HPA, and rolling zero-downtime updates.',
    domainCategory: 'Cloud & Infrastructure',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['CLOUD_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Configuration Center', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'cld_containers',
    name: 'Sovereign Docker Container & Image Registry',
    description: 'Private container image registry, vulnerability CVE scanning, image signing, and layer caching.',
    domainCategory: 'Cloud & Infrastructure',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['CLOUD_CONTAINER_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'cld_storage',
    name: 'Distributed Cloud Object Storage & Volume Manager',
    description: 'S3-compatible object storage buckets, block volumes, automated encryption, and lifecycle tiering.',
    domainCategory: 'Cloud & Infrastructure',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['CLOUD_STORAGE_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Configuration Center'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'cld_backup',
    name: 'Automated Snapshot & Cryptographic Backup Engine',
    description: 'Scheduled hourly/daily database snapshots, offsite replication, and cryptographic checksum verification.',
    domainCategory: 'Cloud & Infrastructure',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['CLOUD_BACKUP_ADMIN'],
    features: ['Dashboard', 'Configuration Center', 'Reports', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'cld_restore',
    name: 'Point-in-Time Disaster Recovery & Restore Injector',
    description: 'One-click automated rollback and point-in-time database restoration with zero transaction loss.',
    domainCategory: 'Cloud & Infrastructure',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['CLOUD_DR_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'cld_monitoring',
    name: 'High-Resolution Node Telemetry & Resource Monitor',
    description: 'Real-time CPU load, memory utilization, disk I/O, network ingress/egress, and socket saturation metrics.',
    domainCategory: 'Cloud & Infrastructure',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['CLOUD_MON_VIEW'],
    features: ['Dashboard', 'Analytics', 'Reports', 'Notifications'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'cld_logging',
    name: 'Centralized Log Aggregation & Diagnostic Elastic Index',
    description: 'Log ingestion from all microservices, real-time error traceback, query syntax highlighting, and alerting.',
    domainCategory: 'Cloud & Infrastructure',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['CLOUD_LOG_VIEW'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'cld_cdn',
    name: 'Global Content Delivery Network & Edge Acceleration',
    description: 'Anycast edge caching, static asset minification, DDoS scrubbing, and low-latency global delivery.',
    domainCategory: 'Cloud & Infrastructure',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['CLOUD_CDN_ADMIN'],
    features: ['Dashboard', 'Configuration Center', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'cld_dns',
    name: 'Sovereign DNS Routing & SSL Certificate Manager',
    description: 'Automated Let\'s Encrypt SSL/TLS certificate issuance, wildcard DNS management, and geo-DNS failover.',
    domainCategory: 'Cloud & Infrastructure',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['CLOUD_DNS_ADMIN'],
    features: ['Dashboard', 'Configuration Center', 'Audit Logs'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'cld_networking',
    name: 'Software-Defined Virtual Private Cloud (VPC) Switch',
    description: 'Isolated VPC subnets, peering bridges, NAT gateways, internal routing tables, and firewall rules.',
    domainCategory: 'Cloud & Infrastructure',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['CLOUD_VPC_ADMIN'],
    features: ['Dashboard', 'Configuration Center', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'cld_dr',
    name: 'Multi-Region Disaster Recovery Failover Controller',
    description: 'Active-passive cloud replication across Europe-West1, US-East1, and Africa-South1 regions.',
    domainCategory: 'Cloud & Infrastructure',
    version: '28.0.1',
    status: 'AVAILABLE',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['CLOUD_FAILOVER_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Sovereign Pro'
  },

  // ==========================================
  // 14. SOFTWARE FACTORY (10 Modules)
  // ==========================================
  {
    id: 'dev_appbuilder',
    name: 'Low-Code / No-Code Sovereign App Scaffolder',
    description: 'Visual drag-and-drop UI builder, data entity designer, and automatic TypeScript module code generator.',
    domainCategory: 'Software Factory',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['DEV_APP_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Workflow Engine', 'AI Assistant'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'dev_wfbuilder',
    name: 'Visual Workflow & BPMN Process Diagram Builder',
    description: 'Graphical business process modeler, approval node wiring, webhook trigger setup, and state execution.',
    domainCategory: 'Software Factory',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['DEV_WF_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Workflow Engine'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'dev_apibuilder',
    name: 'Dynamic REST & GraphQL API Schema Generator',
    description: 'Instant Swagger / OpenAPI 3.0 documentation generation, custom endpoint creation, and schema mocking.',
    domainCategory: 'Software Factory',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['DEV_API_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'API Endpoints'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'dev_templates',
    name: 'Sovereign Template Studio & Cloning Engine',
    description: 'Save customized ERP configurations as reusable institutional templates for instant multi-branch deployment.',
    domainCategory: 'Software Factory',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['DEV_TPL_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'dev_publisher',
    name: 'Marketplace Module Publisher & Verification Bench',
    description: 'Submit custom domain modules for security scanning, Ring-0 code review, and global marketplace listing.',
    domainCategory: 'Software Factory',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['DEV_PUB_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Audit Logs'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'dev_cicd',
    name: 'Continuous Integration & Automated Deployment Pipeline',
    description: 'Automated git webhook triggers, unit test runners, build artifact bundling, and container deployment.',
    domainCategory: 'Software Factory',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['DEV_CICD_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'dev_testing',
    name: 'Automated Test Execution & QA Regression Suite',
    description: 'Automated end-to-end Cypress/Playwright regression suites, load testing simulation, and test reports.',
    domainCategory: 'Software Factory',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['DEV_QA_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'dev_packages',
    name: 'Sovereign Package & Dependency Manager',
    description: 'Internal npm/maven dependency registry, version lockfile auditing, and vulnerability license check.',
    domainCategory: 'Software Factory',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['DEV_PKG_ADMIN'],
    features: ['Dashboard', 'Configuration Center', 'Reports'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'dev_plugins',
    name: 'Dynamic Micro-Kernel Plugin Builder & Loader',
    description: 'Hot-swappable micro-kernel runtime plugin injector allowing zero-restart module feature expansion.',
    domainCategory: 'Software Factory',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['DEV_PLUGIN_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Configuration Center'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'dev_console',
    name: 'Advanced Developer Diagnostic & Debug Console',
    description: 'Real-time database query inspector, Redux state time-travel debugger, API network monitor, and logs.',
    domainCategory: 'Software Factory',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['DEV_DEBUG_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Core Foundation'
  },

  // ==========================================
  // 15. INNOVATION & RESEARCH (8 Modules)
  // ==========================================
  {
    id: 'inv_research',
    name: 'R&D Research Project & Clinical Trial Tracker',
    description: 'Scientific research protocol tracking, grant milestone billing, laboratory notebook encryption, and findings.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['edu', 'hlth', 'agri', 'manu', 'ent'],
    permissions: ['INV_RES_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'inv_lab',
    name: 'Sovereign Innovation Lab & Sandbox Experimenter',
    description: 'Isolated test environment for evaluating new third-party APIs, AI prompts, and database schema changes.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['INV_LAB_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Configuration Center'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'inv_twin',
    name: 'Real-Time Digital Twin & Operational Simulation Studio',
    description: 'Synthetic 3D/mathematical digital twin representing hospital patient flow, factory line, or campus traffic.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'AVAILABLE',
    isRing0Governed: true,
    assignedErpFamilies: ['manu', 'hlth', 'edu', 'gov', 'trans', 'energy'],
    permissions: ['INV_TWIN_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'AI Assistant', 'Analytics'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'inv_simulation',
    name: 'Monte Carlo Financial & Stress Simulation Modeler',
    description: 'Simulate economic shocks, interest rate hikes, inflation surges, and pandemic lockdowns on treasury solvency.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'AVAILABLE',
    isRing0Governed: true,
    assignedErpFamilies: ['fin', 'ent', 'gov', 'ins', 'coop'],
    permissions: ['INV_SIM_ADMIN'],
    features: ['Dashboard', 'Analytics', 'Reports', 'AI Assistant'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'inv_patents',
    name: 'Intellectual Property & Patent Registry Vault',
    description: 'Sovereign IP disclosure logging, patent application tracking, trademark renewal dates, and licensing revenue.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['ent', 'edu', 'manu', 'hlth', 'legal'],
    permissions: ['INV_IP_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'Reports', 'Audit Logs'],
    licenseTier: 'Enterprise Hybrid'
  },
  {
    id: 'inv_prototype',
    name: 'Rapid Prototype Studio & Wireframe Simulator',
    description: 'Interactive UI mockup studio for prototyping new citizen portals, banking screens, or student dashboards.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['INV_PROTO_ADMIN'],
    features: ['Dashboard', 'Operational Workspace'],
    licenseTier: 'Core Foundation'
  },
  {
    id: 'inv_experimental',
    name: 'Experimental AI Models & Quantum Algo Sandbox',
    description: 'Testbed for emerging quantum-resistant encryption algorithms and experimental next-gen reasoning models.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'AVAILABLE',
    isRing0Governed: true,
    assignedErpFamilies: ['ent', 'fin', 'gov', 'edu'],
    permissions: ['INV_EXP_ADMIN'],
    features: ['Dashboard', 'Operational Workspace', 'AI Assistant'],
    licenseTier: 'Sovereign Pro'
  },
  {
    id: 'inv_emerging',
    name: 'Emerging Technology Radar & Incubation Hub',
    description: 'Technology scouting radar, pilot startup incubation tracking, and university research commercialization.',
    domainCategory: 'Innovation & Research',
    version: '28.0.1',
    status: 'INSTALLED',
    isRing0Governed: true,
    assignedErpFamilies: ['all'],
    permissions: ['INV_EMERGE_ADMIN'],
    features: ['Dashboard', 'Reports', 'Analytics'],
    licenseTier: 'Core Foundation'
  }
];

export const UniversalModuleRegistry = {
  /**
   * Return all 180+ universal sovereign modules
   */
  getAllModules(): UniversalModuleDefinition[] {
    return UNIVERSAL_MODULE_CATALOG;
  },

  /**
   * Get all distinct domain categories
   */
  getCategories(): string[] {
    return Array.from(new Set(UNIVERSAL_MODULE_CATALOG.map(m => m.domainCategory)));
  },

  /**
   * Filter modules by domain category
   */
  getModulesByCategory(category: string): UniversalModuleDefinition[] {
    return UNIVERSAL_MODULE_CATALOG.filter(m => m.domainCategory === category);
  },

  /**
   * Get modules assigned to a specific ERP family (e.g. 'church', 'education', 'sacco', 'ent')
   */
  getModulesForErpFamily(erpId: string): UniversalModuleDefinition[] {
    const cleanId = erpId.toUpperCase().trim();
    
    // Control Center (Ring-0) sees the entire sovereign catalog
    if (cleanId === 'JUMO-CONTROL' || cleanId.includes('CONTROL')) {
      return UNIVERSAL_MODULE_CATALOG;
    }

    // Consolidated 4-Product Filter
    return UNIVERSAL_MODULE_CATALOG.filter(m => {
      // 1. Modules assigned to 'all' are universal
      if (m.assignedErpFamilies.includes('all')) return true;

      // 2. Map legacy and canonical families to the 4 approved products
      const isFinPay = cleanId === 'JUMO-FINPAY' || cleanId.includes('FINPAY') || cleanId.includes('FAAP') || cleanId.includes('PAY');
      const isEduAlumni = cleanId === 'JUMO-EDU-ALUMNI' || cleanId.includes('EDU-ALUMNI') || cleanId.includes('EDUCATION') || cleanId.includes('ALUMNI');
      const isChurch = cleanId === 'JUMO-CHURCH' || cleanId.includes('CHURCH') || cleanId.includes('DIOCESE');

      if (isFinPay) {
        return m.assignedErpFamilies.some(fam => 
          ['fin', 'pay', 'coop', 'sacco', 'bank', 'commerce', 'realestate', 'finpay', 'faap'].includes(fam.toLowerCase())
        );
      }

      if (isEduAlumni) {
        return m.assignedErpFamilies.some(fam => 
          ['edu', 'school', 'alumni', 'univ', 'highered', 'edu-alumni'].includes(fam.toLowerCase())
        );
      }

      if (isChurch) {
        return m.assignedErpFamilies.some(fam => 
          ['church', 'faith', 'diocese', 'parish', 'mission'].includes(fam.toLowerCase())
        );
      }

      // Fallback: substring matching for custom or legacy identifiers
      return m.assignedErpFamilies.some(fam => 
        cleanId.includes(fam.toUpperCase()) || fam.toUpperCase().includes(cleanId)
      );
    });
  },

  /**
   * Get module by ID
   */
  getModuleById(id: string): UniversalModuleDefinition | undefined {
    return UNIVERSAL_MODULE_CATALOG.find(m => m.id === id);
  },

  /**
   * Ring-0 Governance check: Validate that global modifications can only happen from Owner Control Center
   */
  validateRing0Authority(userRole: string): boolean {
    return userRole === 'RING_0_OWNER' || userRole === 'SUPER_ADMIN' || userRole === 'SYSTEM_KERNEL' || userRole === 'owner';
  }
};

export interface UniversalModuleLayerV26 {
  id: string;
  layerNumber: number;
  name: string;
  description: string;
  modules: {
    id: string;
    name: string;
    category: string;
    description: string;
    status: 'ACTIVE' | 'INSTALLED' | 'AVAILABLE';
    tier: 'Core' | 'Standard' | 'Enterprise';
  }[];
}

export const UNIVERSAL_MODULE_LAYERS_V26: UniversalModuleLayerV26[] = [
  {
    id: 'layer_1_core',
    layerNumber: 1,
    name: 'Layer 1: Core Enterprise Modules',
    description: 'Authoritative kernel foundation inherited by every sovereign ERP instance.',
    modules: [
      'Identity', 'Authentication', 'RBAC', 'Multi Tenant', 'Workspace Manager', 'Notifications',
      'Messaging', 'Calendar', 'Contacts', 'Organization Structure', 'Departments', 'Branches',
      'Locations', 'Document Center', 'Digital Filing', 'Reports', 'Analytics', 'Dashboard',
      'Search Engine', 'Workflow Engine', 'Approvals', 'Audit Trail', 'Activity Logs', 'API Manager',
      'Automation', 'Scheduling', 'Digital Signatures', 'Version Control', 'Archive', 'Knowledge Base',
      'Settings', 'AI Assistant'
    ].map((m, i) => ({
      id: `l1-${m.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: m,
      category: 'Core Enterprise',
      description: `Authoritative ${m} kernel service providing type-safe multi-tenant runtime execution.`,
      status: 'ACTIVE' as const,
      tier: 'Core' as const
    }))
  },
  {
    id: 'layer_2_faap',
    layerNumber: 2,
    name: 'Layer 2: Financial Modules (FAAP)',
    description: 'Shared Financial & Accounting Platform backbone with $0.00 double-entry ledger parity.',
    modules: [
      'General Ledger', 'Accounts Payable', 'Accounts Receivable', 'Budget', 'Procurement',
      'Assets', 'Payroll', 'Treasury', 'Banking', 'Tax', 'Revenue', 'Expenses', 'Subscriptions',
      'Billing', 'Invoices', 'Receipts', 'Inventory Valuation', 'Cost Centers', 'Multi Currency',
      'Financial Analytics', 'Cash Flow', 'Investments', 'Grant Management', 'Donor Accounting',
      'Project Accounting', 'Settlement Engine', 'Digital Wallet', 'Mobile Money', 'Payment Gateway'
    ].map((m, i) => ({
      id: `l2-${m.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: m,
      category: 'Financial FAAP',
      description: `FAAP ${m} engine enforcing strict double-entry ledger rules and automated treasury settlement.`,
      status: 'ACTIVE' as const,
      tier: 'Core' as const
    }))
  },
  {
    id: 'layer_3_ai',
    layerNumber: 3,
    name: 'Layer 3: AI Digital Hybrid Modules',
    description: 'Multi-model cognitive AI router, RAG vectors, and autonomous agent swarms.',
    modules: [
      'JUMO AI Assistant', 'JUMO AI Agents', 'Workflow AI', 'Document AI', 'Speech AI', 'OCR',
      'Translation', 'Recommendation Engine', 'Prediction', 'Risk Analysis', 'Fraud Detection',
      'Chat', 'Knowledge Search', 'Semantic Search', 'Voice Commands', 'Automation AI',
      'Decision Support', 'AI Reports', 'AI Monitoring', 'AI Configuration'
    ].map((m, i) => ({
      id: `l3-${m.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: m,
      category: 'AI Digital Hybrid',
      description: `Cognitive ${m} runtime powered by Gemini & Google GenAI routing gateway.`,
      status: 'ACTIVE' as const,
      tier: 'Standard' as const
    }))
  },
  {
    id: 'layer_4_collab',
    layerNumber: 4,
    name: 'Layer 4: Enterprise Collaboration',
    description: 'Unified communication, project tracking, help desk, and customer relationship suites.',
    modules: [
      'Email', 'Chat', 'Video Meetings', 'Discussion Boards', 'Announcements', 'News', 'Tasks',
      'Projects', 'Kanban', 'Wiki', 'Communities', 'Events', 'Bookings', 'Help Desk',
      'Customer Support', 'CRM', 'Surveys', 'Forms', 'Notifications', 'SMS', 'WhatsApp', 'Push Notifications'
    ].map((m, i) => ({
      id: `l4-${m.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: m,
      category: 'Collaboration',
      description: `Integrated ${m} collaboration module with real-time notification synchronization.`,
      status: 'ACTIVE' as const,
      tier: 'Standard' as const
    }))
  },
  {
    id: 'layer_5_ops',
    layerNumber: 5,
    name: 'Layer 5: Operations',
    description: 'End-to-end supply chain, warehouse, asset maintenance, and manufacturing controls.',
    modules: [
      'Inventory', 'Warehouse', 'Supply Chain', 'Fleet', 'Transport', 'Maintenance',
      'Innovation & Research', 'Production', 'Quality Assurance', 'Procurement', 'Vendor Portal',
      'Customer Portal', 'Contract Management', 'Equipment', 'Assets', 'Facilities',
      'Projects', 'Service Requests', 'Resource Planning', 'Operations Dashboard'
    ].map((m, i) => ({
      id: `l5-${m.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: m,
      category: 'Operations',
      description: `Sovereign operational ${m} controller with barcode and IoT telemetric tracking.`,
      status: 'ACTIVE' as const,
      tier: 'Standard' as const
    }))
  },
  {
    id: 'layer_6_comp',
    layerNumber: 6,
    name: 'Layer 6: Compliance',
    description: 'Zero-trust governance, audit trails, statutory reporting, and cryptographic evidence vaults.',
    modules: [
      'Policy Management', 'Risk Register', 'Compliance', 'Internal Audit', 'External Audit',
      'ISO', 'GDPR', 'SOC', 'Cyber Security', 'Zero Trust', 'Encryption', 'Backup',
      'Recovery', 'Monitoring', 'Incident Response', 'Legal', 'Governance', 'Evidence',
      'Certificates', 'Licensing'
    ].map((m, i) => ({
      id: `l6-${m.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: m,
      category: 'Compliance',
      description: `Statutory ${m} enforcement module guaranteeing immutable audit trails and zero-trust policies.`,
      status: 'ACTIVE' as const,
      tier: 'Enterprise' as const
    }))
  },
  {
    id: 'layer_7_comm',
    layerNumber: 7,
    name: 'Layer 7: Communication',
    description: 'Public portals, brand marketing, media distribution, and digital campaign engines.',
    modules: [
      'Website CMS', 'Portal Builder', 'Public Portal', 'Forms Builder', 'Advertising',
      'Digital Marketing', 'Media Center', 'Brand Management', 'Social Media', 'Email Campaigns',
      'SMS Campaigns', 'Digital Signage', 'Public AI Assistant'
    ].map((m, i) => ({
      id: `l7-${m.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: m,
      category: 'Communication',
      description: `Omnichannel ${m} distribution platform with real-time engagement analytics.`,
      status: 'ACTIVE' as const,
      tier: 'Standard' as const
    }))
  },
  {
    id: 'layer_8_integ',
    layerNumber: 8,
    name: 'Layer 8: Integration',
    description: 'Open API gateways, banking/government connectors, and hybrid offline synchronization.',
    modules: [
      'REST APIs', 'GraphQL', 'Webhooks', 'Mobile SDK', 'Desktop SDK', 'ERP Connectors',
      'Payment Connectors', 'Government Connectors', 'Third Party Integrations', 'Import',
      'Export', 'Synchronization', 'Offline Engine', 'Hybrid Sync'
    ].map((m, i) => ({
      id: `l8-${m.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: m,
      category: 'Integration',
      description: `High-throughput ${m} connector bridging internal micro-kernel buses with external APIs.`,
      status: 'ACTIVE' as const,
      tier: 'Enterprise' as const
    }))
  },
  {
    id: 'layer_9_admin',
    layerNumber: 9,
    name: 'Layer 9: Administration',
    description: 'Owner Control Center Ring-0 administration, tenant governance, and system telemetry.',
    modules: [
      'Tenant Management', 'User Management', 'Role Management', 'Storage', 'Licensing',
      'Subscription', 'Usage Analytics', 'Performance', 'Health', 'Monitoring', 'Logs',
      'Deployment', 'Feature Flags', 'Updates', 'Migration', 'Marketplace', 'Plugins',
      'Extensions', 'Configuration'
    ].map((m, i) => ({
      id: `l9-${m.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: m,
      category: 'Administration',
      description: `Ring-0 ${m} control console restricted to authoritative Owner Control Center operations.`,
      status: 'ACTIVE' as const,
      tier: 'Enterprise' as const
    }))
  }
];

export const getErpSpecializedModules = (erpId: string): { name: string; category: string; description: string }[] => {
  const id = erpId.toLowerCase();
  
  // 1. JUMO Financial & Digital Pay Platform
  if (id.includes('finpay') || id.includes('financial') || id.includes('pay') || id.includes('sacco') || id.includes('coop')) {
    return [
      { name: 'FAAP Double-Entry Cryptographic Ledger', category: 'Financial Platform', description: 'Sovereign general ledger guaranteeing exact $0.00 debit/credit balance parity.' },
      { name: 'Vote Book & Budget Book Recorder', category: 'Financial Platform', description: 'Commitment tracking, budget preparation, and expenditure control ledger.' },
      { name: 'Master Treasury & RTGS Liquidity Pool', category: 'Financial Platform', description: 'Institutional cash pooling, investment portfolio management, and liquidity forecasting.' },
      { name: 'M-Pesa & Mobile Money Switch', category: 'Digital Payments', description: 'Direct integration with mobile money providers for collection and disbursement.' },
      { name: 'Merchant Payment & Universal QR Hub', category: 'Digital Payments', description: 'Unified merchant collection via QR, payment links, and card gateways.' },
      { name: 'Real-Time Settlement & Split Clearing', category: 'Digital Payments', description: 'Automated 1.5% settlement fee calculation and multi-party revenue splitting.' },
      { name: 'Member Share Capital & Deposits', category: 'FinTech', description: 'Non-withdrawable shares, monthly savings deposits, and statutory registers.' },
      { name: 'Loan Underwriting & Amortization', category: 'FinTech', description: 'Automated credit appraisal, interest amortization schedules, and collateral custody.' }
    ];
  }
  
  // 2. JUMO Education & Alumni ERP
  if (id.includes('edu') || id.includes('school') || id.includes('alumni')) {
    return [
      { name: 'Admissions & Online Enrollment', category: 'Education', description: 'Automated application processing, entrance test grading, and merit lists.' },
      { name: 'Student Information System (SIS)', category: 'Education', description: '360-degree student demographic, disciplinary, and attendance tracking.' },
      { name: 'Examinations & Grading Engine', category: 'Education', description: 'GPA/CGPA calculation, transcript generation, and secure exam hall seating.' },
      { name: 'Alumni Association & Endowments', category: 'Alumni & Advancement', description: 'Alumni networking portal, fundraising drives, and donor trust accounting.' },
      { name: 'Mentorship & Career Network', category: 'Alumni & Advancement', description: 'AI-powered matching of graduates with mentors and career opportunities.' },
      { name: 'Degree & Transcript Verification Ledger', category: 'Alumni & Advancement', description: 'Cryptographic diploma generation and blockchain degree verification.' },
      { name: 'Endowment Donation & Giving Portal', category: 'Alumni & Advancement', description: 'Secure channel for institutional advancement and philanthropic contributions.' },
      { name: 'Virtual Classroom LMS & SCORM', category: 'Education', description: 'Interactive courseware, video lectures, and automated assignment grading.' }
    ];
  }
  
  // 3. JUMO Church & Diocese ERP
  if (id.includes('church') || id.includes('faith') || id.includes('diocese')) {
    return [
      { name: 'Parishioner Census & Membership', category: 'Faith', description: 'Family tree mapping, baptismal/confirmation records, and cell fellowship assignment.' },
      { name: 'Tithe, Offering & Pledge Registry', category: 'Faith', description: 'Automated SMS gift receipts, mobile money tithe collection, and fund segregation.' },
      { name: 'Diocesan Synod & Governance', category: 'Faith', description: 'Synod resolutions, clergy licensing, and parish canonical compliance checks.' },
      { name: 'Clergy Pension & Welfare Fund', category: 'Faith', description: 'Retirement fund actuarial tracking, health insurance, and pastoral stipends.' },
      { name: 'Church Asset & Real Estate Deeds', category: 'Faith', description: 'Sanctuary land titles, sacred regalia inventory, and church vehicles.' },
      { name: 'Home Cell & Fellowship Groups', category: 'Faith', description: 'Weekly cell group attendance, sermon discussion guides, and pastoral care requests.' }
    ];
  }
  
  // 4. JUMO Control Center
  if (id.includes('control') || id.includes('cc') || id.includes('root')) {
    return [
      { name: 'AEGIS Ring-0 Security Operations', category: 'Sovereign Control', description: 'Zero-Trust surveillance, RBAC/ABAC boundaries, and secrets vault.' },
      { name: 'AI Command Center & Gateway', category: 'Sovereign Control', description: 'Multi-model AI router, agent workforce registry, and RAG buffers.' },
      { name: 'JUMO TRUST & Governance', category: 'Sovereign Control', description: 'Institutional integrity, board governance, and audit certification.' },
      { name: 'Cloud & Infrastructure Console', category: 'Sovereign Control', description: 'K8s cluster management, workloads, and distributed databases.' },
      { name: 'Platform Store & Registry', category: 'Sovereign Control', description: 'Official catalog for discovering and installing enterprise capabilities.' }
    ];
  }

  return [
    { name: 'Universal Enterprise Foundation', category: 'Specialized Domain', description: 'Core identity, organization, and workflow modules extending the institutional runtime.' },
    { name: 'Statutory Compliance & Audit Hub', category: 'Specialized Domain', description: 'Automated regulatory reporting and statutory audit compliance tools.' },
    { name: 'Predictive Intelligence Dashboard', category: 'Specialized Domain', description: 'Real-time industry key performance indicators and predictive trend analysis.' }
  ];
};

export const getUniversalLayersV26 = (erpId?: string): UniversalModuleLayerV26[] => {
  const baseLayers = [...UNIVERSAL_MODULE_LAYERS_V26];
  if (erpId) {
    const specializedMods = getErpSpecializedModules(erpId);
    baseLayers.push({
      id: 'layer_10_specialized',
      layerNumber: 10,
      name: `Layer 10: Domain Specialization (${erpId.toUpperCase()} Modules)`,
      description: 'Domain-specific enterprise capabilities extending the 191 Universal Core Modules.',
      modules: specializedMods.map((m, i) => ({
        id: `l10-${i}-${m.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        name: m.name,
        category: m.category,
        description: m.description,
        status: 'ACTIVE' as const,
        tier: 'Enterprise' as const
      }))
    });
  }
  return baseLayers;
};

export const validateRing0Authority = (userRole: string): boolean => {
  return UniversalModuleRegistry.validateRing0Authority(userRole);
};

export const getModulesForErpFamily = (erpId: string): UniversalModuleDefinition[] => {
  return UniversalModuleRegistry.getModulesForErpFamily(erpId);
};

export const getModulesByDomain = (domainId: string): UniversalModuleDefinition[] => {
  return UniversalModuleRegistry.getModulesForErpFamily(domainId);
};

export const UNIVERSAL_MODULE_REGISTRY = UniversalModuleRegistry.getAllModules();

export default UniversalModuleRegistry;
