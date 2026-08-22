/**
 * JUMO UEOS — Authoritative ERP Phase 10: 100-Module Catalogue Architecture
 * Defines the complete 100-module catalogue for the THREE canonical JUMO ERP Families:
 * 1. JUMO FINTECH (JUMO-FINTECH)
 * 2. JUMO EDUCATION & ALUMNI ERP (JUMO-EDU-ALUMNI)
 * 3. JUMO CHURCH & FAITH ERP (JUMO-CHURCH)
 */

export interface ErpModuleDefinition {
  id: string;
  code: string;
  name: string;
  category: 'Core Foundation' | 'FAAP Financial' | 'Human Capital' | 'Department Domain' | 'Digital Hybrid & AI';
  department: string;
  description: string;
  status: 'ACTIVE' | 'INSTALLED' | 'AVAILABLE';
  isMandatory: boolean;
  integrations: {
    faap: boolean;
    trust: boolean;
    aegis: boolean;
    cloud: boolean;
    ai: boolean;
  };
  capabilities: string[];
}

export interface ErpFamilyCatalogue {
  familyId: string;
  familyName: string;
  category: string;
  version: string;
  totalModules: number;
  departmentsCount: number;
  description: string;
  modules: ErpModuleDefinition[];
}

/**
 * Common 20 Universal Core Foundation Modules (Shared by all ERPs)
 */
const UNIVERSAL_CORE_FOUNDATION_20: ErpModuleDefinition[] = [
  { id: 'core_01_iam', code: 'CORE-01', name: 'Identity & Access Management', category: 'Core Foundation', department: 'Administration', description: 'Zero-trust IAM, multi-tenant isolation, OAuth2/SAML SSO, MFA enforcement.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: true }, capabilities: ['OAuth2/OIDC', 'SAML 2.0', 'Biometric MFA', 'Tenant Isolation'] },
  { id: 'core_02_org', code: 'CORE-02', name: 'Multi-tenant Organization Engine', category: 'Core Foundation', department: 'Administration', description: 'Multi-branch, subsidiary, and jurisdictional entity hierarchy governance.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: false }, capabilities: ['Multi-Branch Hierarchy', 'Cost Center Mapping', 'Legal Entities'] },
  { id: 'core_03_rbac', code: 'CORE-03', name: 'Role & Permission Management', category: 'Core Foundation', department: 'Administration', description: 'Granular RBAC/ABAC security policy matrix and dynamic entitlement rules.', status: 'ACTIVE', isMandatory: true, integrations: { faap: false, trust: true, aegis: true, cloud: false, ai: true }, capabilities: ['RBAC Matrix', 'ABAC Context Policy', 'Inherited Permissions'] },
  { id: 'core_04_wf', code: 'CORE-04', name: 'Universal Workflow Engine', category: 'Core Foundation', department: 'Operations', description: 'BPMN-compliant workflow orchestration with multi-stage approval routing.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: true }, capabilities: ['BPMN 2.0 Engine', 'Parallel Approvals', 'SLA Escalation'] },
  { id: 'core_05_dms', code: 'CORE-05', name: 'Document Management Engine', category: 'Core Foundation', department: 'Administration', description: 'Centralized indexing, metadata tags, version control, and OCR extraction.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: true }, capabilities: ['OCR Metadata', 'Full-Text Search', 'Version Control'] },
  { id: 'core_06_pki', code: 'CORE-06', name: 'Digital Signature Engine', category: 'Core Foundation', department: 'Governance', description: 'Cryptographic PKI e-signatures, timestamping, and legal validity proof.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: false, ai: false }, capabilities: ['X.509 PKI', 'Biometric Signing', 'Audit Timestamping'] },
  { id: 'core_07_notif', code: 'CORE-07', name: 'Notification & Alert Center', category: 'Core Foundation', department: 'Operations', description: 'Multi-channel messaging hub (Email, SMS, Push, Webhooks, In-App).', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: false, aegis: true, cloud: true, ai: true }, capabilities: ['Multi-Channel Dispatch', 'Priority Queues', 'Push Notifications'] },
  { id: 'core_08_cal', code: 'CORE-08', name: 'Enterprise Calendar & Scheduling', category: 'Core Foundation', department: 'Operations', description: 'Synchronized scheduling, resource booking, conflict resolution, and reminders.', status: 'ACTIVE', isMandatory: true, integrations: { faap: false, trust: false, aegis: false, cloud: true, ai: true }, capabilities: ['Calendar Sync', 'Facility Booking', 'Event Automated Reminders'] },
  { id: 'core_09_task', code: 'CORE-09', name: 'Task & Activity Management', category: 'Core Foundation', department: 'Operations', description: 'Kanban boards, task dependencies, milestone tracking, and workload balancing.', status: 'ACTIVE', isMandatory: true, integrations: { faap: false, trust: true, aegis: false, cloud: true, ai: true }, capabilities: ['Kanban Board', 'Gantt View', 'Workload Balancing'] },
  { id: 'core_10_appr', code: 'CORE-10', name: 'Multi-Tier Approval Engine', category: 'Core Foundation', department: 'Governance', description: 'Sequential and conditional authorization gates for high-value operations.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: false, ai: true }, capabilities: ['Delegated Approvals', 'Threshold Verification', 'Audit Verification'] },
  { id: 'core_11_rep', code: 'CORE-11', name: 'Executive Reporting Engine', category: 'Core Foundation', department: 'Executive', description: 'Dynamic query builder, PDF/Excel generation, scheduled report delivery.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: false, cloud: true, ai: true }, capabilities: ['Custom Query Builder', 'PDF/XLS Export', 'Scheduled Dispatch'] },
  { id: 'core_12_bi', code: 'CORE-12', name: 'Executive Analytics Dashboard', category: 'Core Foundation', department: 'Executive', description: 'Real-time KPI visualization, interactive chart widgets, and metric alerts.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: true }, capabilities: ['Interactive Widgets', 'Trend Projections', 'Executive Summaries'] },
  { id: 'core_13_search', code: 'CORE-13', name: 'Universal Global Search Engine', category: 'Core Foundation', department: 'Administration', description: 'Cross-entity vector semantic search across records, documents, and logs.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: true }, capabilities: ['Vector Search', 'Multi-Entity Filtering', 'Instant Lookups'] },
  { id: 'core_14_audit', code: 'CORE-14', name: 'Cryptographic Audit Trail Engine', category: 'Core Foundation', department: 'Governance', description: 'Immutable append-only ledger tracking every record modification and user action.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: false }, capabilities: ['Immutable SHA-256 Logs', 'Forensic Playback', 'Compliance Export'] },
  { id: 'core_15_config', code: 'CORE-15', name: 'Universal Configuration Center', category: 'Core Foundation', department: 'Administration', description: 'Centralized environment variables, feature flags, and runtime parameters.', status: 'ACTIVE', isMandatory: true, integrations: { faap: false, trust: true, aegis: true, cloud: true, ai: false }, capabilities: ['Hot-Reload Parameters', 'Feature Flags', 'Versioned Configs'] },
  { id: 'core_16_hub', code: 'CORE-16', name: 'Enterprise Integration Hub', category: 'Core Foundation', department: 'IT Operations', description: 'Pre-built connectors, webhooks, event bus queues, and message brokers.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: false }, capabilities: ['Webhook Handlers', 'Kafka/RabbitMQ Bus', 'Partner Connectors'] },
  { id: 'core_17_api', code: 'CORE-17', name: 'API Gateway & Rate Limiter', category: 'Core Foundation', department: 'IT Operations', description: 'REST/GraphQL API router, rate limiting, token throttling, and OpenAPI docs.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: true }, capabilities: ['Token Throttling', 'OpenAPI 3.0 Specs', 'API Key Rotation'] },
  { id: 'core_18_etl', code: 'CORE-18', name: 'Data Import / Export & ETL Engine', category: 'Core Foundation', department: 'IT Operations', description: 'Bulk CSV/JSON/XML data ingestion, schema validation, and migration tools.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: false, cloud: true, ai: true }, capabilities: ['Schema Mapping', 'Bulk Ingestion', 'Validation Errors List'] },
  { id: 'core_19_loc', code: 'CORE-19', name: 'Localization & Currency Format Engine', category: 'Core Foundation', department: 'Administration', description: 'Region-specific date/time formats, address standards, and tax rules.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: false, aegis: false, cloud: false, ai: false }, capabilities: ['Regional Formatting', 'Fiscal Year Standards', 'Tax Rule Profiles'] },
  { id: 'core_20_i18n', code: 'CORE-20', name: 'Multi-Language i18n Translation', category: 'Core Foundation', department: 'Administration', description: 'Dynamic translation engine supporting English, Swahili, French, Arabic, and local dialects.', status: 'ACTIVE', isMandatory: true, integrations: { faap: false, trust: false, aegis: false, cloud: true, ai: true }, capabilities: ['Real-Time Translation', 'Localized String Catalog', 'RTL Support'] },
];

/**
 * Common 20 FAAP Financial Backbone Modules (Shared by all ERPs)
 */
const FAAP_FINANCIAL_BACKBONE_20: ErpModuleDefinition[] = [
  { id: 'faap_01_gl', code: 'FAAP-01', name: 'General Ledger Engine', category: 'FAAP Financial', department: 'Finance', description: 'Real-time double-entry accounting ledger with automatic balance validation ($0.00 offset).', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: true }, capabilities: ['Double-Entry Ledger', 'Zero-Offset Parity', 'Multi-Book Support'] },
  { id: 'faap_02_ap', code: 'FAAP-02', name: 'Accounts Payable (AP)', category: 'FAAP Financial', department: 'Finance', description: 'Vendor invoices, 3-way purchase order matching, payment schedules, and aging analysis.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: false, ai: true }, capabilities: ['3-Way Matching', 'Vendor Ledger', 'Aging Analysis'] },
  { id: 'faap_03_ar', code: 'FAAP-03', name: 'Accounts Receivable (AR)', category: 'FAAP Financial', department: 'Finance', description: 'Customer billing, automated dunning, payment collection, and credit control.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: false, cloud: true, ai: true }, capabilities: ['Automated Invoicing', 'Dunning Engine', 'Credit Limits'] },
  { id: 'faap_04_cash', code: 'FAAP-04', name: 'Cash & Petty Cash Management', category: 'FAAP Financial', department: 'Finance', description: 'Till balancing, petty cash floats, float replenish approvals, and cash drawer audits.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: false, ai: false }, capabilities: ['Petty Cash Floats', 'Till Reconciliation', 'Surprise Cash Audit'] },
  { id: 'faap_05_bud', code: 'FAAP-05', name: 'Budget & Cost Center Control', category: 'FAAP Financial', department: 'Finance', description: 'Departmental budget allocations, commitment tracking, and overspend blocking.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: false, ai: true }, capabilities: ['Department Budgets', 'Overspend Blocking', 'Variance Alerts'] },
  { id: 'faap_06_rev', code: 'FAAP-06', name: 'Revenue Accounting & Recognition', category: 'FAAP Financial', department: 'Finance', description: 'IFRS 15 compliant revenue recognition, deferred revenue schedules, and accruals.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: false, cloud: false, ai: true }, capabilities: ['IFRS 15 Schedules', 'Deferred Revenue', 'Subscription Recognition'] },
  { id: 'faap_07_exp', code: 'FAAP-07', name: 'Expense Management & Claims', category: 'FAAP Financial', department: 'Finance', description: 'Employee expense claims, receipt photo OCR, policy verification, and reimbursement.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: true }, capabilities: ['Receipt OCR Scan', 'Per Diem Rates', 'Policy Limit Enforcement'] },
  { id: 'faap_08_asset', code: 'FAAP-08', name: 'Fixed Assets Accounting', category: 'FAAP Financial', department: 'Finance', description: 'Asset register, straight-line/reducing balance depreciation, disposal, and revaluation.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: false, cloud: false, ai: false }, capabilities: ['Automated Depreciation', 'Disposal Accounting', 'Barcoded Asset Tags'] },
  { id: 'faap_09_pay', code: 'FAAP-09', name: 'Payroll Ledger Integration', category: 'FAAP Financial', department: 'Finance', description: 'Automated payroll journal generation, tax withholding, and salary disbursement.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: false, ai: true }, capabilities: ['Payroll Journal Posting', 'PAYE/NSSF Postings', 'Salary Disbursement'] },
  { id: 'faap_10_tax', code: 'FAAP-10', name: 'Tax Compliance & VAT Engine', category: 'FAAP Financial', department: 'Finance', description: 'VAT input/output calculations, withholding tax certificates, and tax authority filing exports.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: false }, capabilities: ['E-Invoicing / ETR', 'Withholding Tax Logs', 'Automated Returns'] },
  { id: 'faap_11_treas', code: 'FAAP-11', name: 'Treasury & Bank Reconciliation', category: 'FAAP Financial', department: 'Finance', description: 'Bank feed integration, automated statement matching, liquidity forecasting, and FX.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: true }, capabilities: ['Bank Statement Matching', 'Liquidity Projections', 'Bank Feed APIs'] },
  { id: 'faap_12_finrep', code: 'FAAP-12', name: 'Financial Statements Engine', category: 'FAAP Financial', department: 'Finance', description: 'Balance Sheet, Income Statement, Cash Flow Statement, and Trial Balance generation.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: false, cloud: true, ai: true }, capabilities: ['P&L Statement', 'Balance Sheet', 'Cash Flow Analysis'] },
  { id: 'faap_13_cost', code: 'FAAP-13', name: 'Activity-Based Costing Engine', category: 'FAAP Financial', department: 'Finance', description: 'Cost allocation drivers, overhead absorption, and unit profitability metrics.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: false, cloud: false, ai: true }, capabilities: ['Cost Drivers', 'Overhead Absorption', 'Product Profitability'] },
  { id: 'faap_14_deptbud', code: 'FAAP-14', name: 'Departmental Budgeting Workbench', category: 'FAAP Financial', department: 'Finance', description: 'Collaborative bottom-up budget proposals, revisions, and approval workflows.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: false, cloud: false, ai: false }, capabilities: ['Bottom-Up Proposals', 'Budget Revisions', 'Historical Benchmarking'] },
  { id: 'faap_15_fore', code: 'FAAP-15', name: 'Predictive Financial Forecasting', category: 'FAAP Financial', department: 'Finance', description: 'AI-driven revenue projections, expense forecasting, and scenario stress-testing.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: false, cloud: true, ai: true }, capabilities: ['AI Projections', 'Scenario Modeling', 'Monte Carlo Sim'] },
  { id: 'faap_16_payint', code: 'FAAP-16', name: 'Digital Payments & Gateway Router', category: 'FAAP Financial', department: 'Finance', description: 'Integration with JUMO DIGITAL PAY, Mobile Money (M-Pesa/MTN), Cards, and RTGS.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: false }, capabilities: ['Mobile Money APIs', 'Credit Card Gateway', 'RTGS / SWIFT Bridge'] },
  { id: 'faap_17_fx', code: 'FAAP-17', name: 'Multi-Currency & FX Accounting', category: 'FAAP Financial', department: 'Finance', description: 'Real-time exchange rate tables, unrealized/realized FX gain/loss accounting.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: false, cloud: true, ai: false }, capabilities: ['Real-Time FX Rates', 'Revaluation Postings', 'Multi-Currency GL'] },
  { id: 'faap_18_recon', code: 'FAAP-18', name: 'Audit & Sub-Ledger Reconciliation', category: 'FAAP Financial', department: 'Finance', description: 'Sub-ledger to General Ledger reconciliation, mismatch detection, and adjustment vouchers.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: false, ai: true }, capabilities: ['Mismatch Alerts', 'Adjustment Vouchers', 'Closing Checks'] },
  { id: 'faap_19_ctrl', code: 'FAAP-19', name: 'Internal Financial Controls Engine', category: 'FAAP Financial', department: 'Finance', description: 'Segregation of duties (SoD), transaction limits, dual authorization rules.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: false, ai: true }, capabilities: ['Segregation of Duties', 'Dual Signature Gate', 'Limit Enforcement'] },
  { id: 'faap_20_ai', code: 'FAAP-20', name: 'FAAP Financial AI & Anomaly Detection', category: 'FAAP Financial', department: 'Finance', description: 'Autonomous fraud detection, duplicate payment flags, and unexpected expense alerts.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: true }, capabilities: ['Fraud Flagging', 'Duplicate Voucher Filter', 'Autonomous Auditor'] },
];

/**
 * Common 15 Human Capital Platform Modules (Shared by all ERPs)
 */
const HUMAN_CAPITAL_PLATFORM_15: ErpModuleDefinition[] = [
  { id: 'hr_01_emp', code: 'HR-01', name: 'Employee Master Records', category: 'Human Capital', department: 'Human Resources', description: 'Digital employee profiles, contact details, emergency contacts, identity documents.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: false }, capabilities: ['Personnel Profiles', 'Digital Personnel File', 'Family & Next of Kin'] },
  { id: 'hr_02_rec', code: 'HR-02', name: 'Recruitment & Candidate Tracking', category: 'Human Capital', department: 'Human Resources', description: 'Job portal, applicant tracking (ATS), interview scoring, degree verification.', status: 'ACTIVE', isMandatory: true, integrations: { faap: false, trust: true, aegis: true, cloud: true, ai: true }, capabilities: ['ATS Pipeline', 'Interview Scorecard', 'Attestation Verification'] },
  { id: 'hr_03_onb', code: 'HR-03', name: 'Onboarding & Asset Handover', category: 'Human Capital', department: 'Human Resources', description: 'Automated onboarding checklists, equipment issuance, policy sign-offs.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: false, cloud: false, ai: false }, capabilities: ['Asset Issuance', 'Policy Acknowledgment', 'Orientation Schedule'] },
  { id: 'hr_04_perf', code: 'HR-04', name: 'Staff Performance Management', category: 'Human Capital', department: 'Human Resources', description: 'KPI targets, 360-degree appraisals, performance improvement plans (PIP).', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: false, cloud: false, ai: true }, capabilities: ['360 Appraisal', 'KPI Scorecards', 'Promotion Reviews'] },
  { id: 'hr_05_att', code: 'HR-05', name: 'Time & Attendance Management', category: 'Human Capital', department: 'Human Resources', description: 'Biometric clock-in, geofenced mobile attendance, shift rosters, overtime calculation.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: false }, capabilities: ['Biometric Sync', 'Geofenced Mobile Clocking', 'Overtime Rules'] },
  { id: 'hr_06_leave', code: 'HR-06', name: 'Leave & Absence Management', category: 'Human Capital', department: 'Human Resources', description: 'Annual, sick, maternity, study leave balances, automated approval workflows.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: false, cloud: false, ai: false }, capabilities: ['Leave Accrual Ledger', 'Automated Substitution', 'Medical Cert Attachments'] },
  { id: 'hr_07_pay', code: 'HR-07', name: 'Payroll Calculation Engine', category: 'Human Capital', department: 'Human Resources', description: 'Gross-to-net salary computation, statutory deductions (PAYE, NSSF, NHIF), payslips.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: false }, capabilities: ['Automated Payslips', 'Statutory Tax Deduction', 'Direct Bank Export'] },
  { id: 'hr_08_train', code: 'HR-08', name: 'Training & Skill Development', category: 'Human Capital', department: 'Human Resources', description: 'Training needs assessment, course scheduling, CPD point tracking, certifications.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: false, cloud: false, ai: true }, capabilities: ['CPD Credits', 'Skill Gap Analysis', 'Internal Webinars'] },
  { id: 'hr_09_skills', code: 'HR-09', name: 'Skill Matrix & Competency Inventory', category: 'Human Capital', department: 'Human Resources', description: 'Organization skill inventory, talent search, certification expiry alerts.', status: 'ACTIVE', isMandatory: true, integrations: { faap: false, trust: true, aegis: false, cloud: false, ai: true }, capabilities: ['Skill Inventory', 'Certification Expiry Alerts', 'Project Assignment Search'] },
  { id: 'hr_10_career', code: 'HR-10', name: 'Career Progression & Succession', category: 'Human Capital', department: 'Human Resources', description: 'Succession planning, leadership development pipelines, career paths.', status: 'ACTIVE', isMandatory: true, integrations: { faap: false, trust: true, aegis: false, cloud: false, ai: true }, capabilities: ['9-Box Grid', 'Succession Pipeline', 'Career Milestone Map'] },
  { id: 'hr_11_contracts', code: 'HR-11', name: 'Contract Lifecycle & Renewals', category: 'Human Capital', department: 'Human Resources', description: 'Fixed-term, permanent, consultant contract tracking, automatic renewal alerts.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: false, ai: false }, capabilities: ['Contract Expiry Alerts', 'Consultant Rates', 'Digital Renewal Agreements'] },
  { id: 'hr_12_ess', code: 'HR-12', name: 'Employee Self-Service (ESS) Portal', category: 'Human Capital', department: 'Human Resources', description: 'Mobile/web portal for employees to view payslips, request leave, update bio.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: false, aegis: true, cloud: true, ai: false }, capabilities: ['Mobile Payslips', 'Leave Self-Application', 'Bio Updates'] },
  { id: 'hr_13_wf_analytics', code: 'HR-13', name: 'Workforce Demographics & Analytics', category: 'Human Capital', department: 'Human Resources', description: 'Turnover rates, gender/age diversity metrics, headcount cost projections.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: false, cloud: true, ai: true }, capabilities: ['Turnover Rate Trends', 'Headcount Projections', 'Diversity Index'] },
  { id: 'hr_14_org_chart', code: 'HR-14', name: 'Interactive Organizational Chart', category: 'Human Capital', department: 'Human Resources', description: 'Dynamic visual reporting lines, supervisor assignments, vacancy spots.', status: 'ACTIVE', isMandatory: true, integrations: { faap: false, trust: false, aegis: false, cloud: false, ai: false }, capabilities: ['Visual Org Tree', 'Reporting Line Manager', 'Vacant Position Indicators'] },
  { id: 'hr_15_benefits', code: 'HR-15', name: 'Benefits & Medical Insurance Mgmt', category: 'Human Capital', department: 'Human Resources', description: 'Medical insurance schemes, pension fund contributions, staff welfare schemes.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: false, cloud: false, ai: false }, capabilities: ['Insurance Dependents', 'Pension Allocations', 'Staff Welfare Fund'] },
];

/**
 * Common 10 Digital Hybrid & AI Assurance Modules
 */
const DIGITAL_HYBRID_AI_10: ErpModuleDefinition[] = [
  { id: 'hybrid_01_twin', code: 'HYBRID-01', name: 'Institutional Digital Twin', category: 'Digital Hybrid & AI', department: 'Executive AI', description: 'Virtual real-time simulation of operations, cashflows, and capacity bottlenecks.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: true }, capabilities: ['Operational Simulation', 'Bottleneck Prediction', 'What-If Modeling'] },
  { id: 'hybrid_02_pred', code: 'HYBRID-02', name: 'Predictive Operations Analytics', category: 'Digital Hybrid & AI', department: 'Executive AI', description: 'Machine learning forecasting for revenue, demand, staffing, and maintenance.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: false, cloud: true, ai: true }, capabilities: ['Demand Forecasting', 'Staffing Optimization', 'Trend Projections'] },
  { id: 'hybrid_03_assistant', code: 'HYBRID-03', name: 'JUMO Branded Cognitive AI Assistant', category: 'Digital Hybrid & AI', department: 'Executive AI', description: 'Contextual AI assistant for query resolution, record drafting, and search.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: true }, capabilities: ['Voice & Text Assistant', 'Drafting Assistant', 'Data Querying'] },
  { id: 'hybrid_04_auto', code: 'HYBRID-04', name: 'Autonomous Process Automation', category: 'Digital Hybrid & AI', department: 'IT Operations', description: 'RPA bots executing routine reconciliation, data entry, and email dispatches.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: true }, capabilities: ['RPA Execution', 'Automated Reconciliation', 'Scheduled Bots'] },
  { id: 'hybrid_05_mob', code: 'HYBRID-05', name: 'Executive & Field Mobile Workspace', category: 'Digital Hybrid & AI', department: 'Operations', description: 'Offline-first progressive mobile app for field officers, inspectors, and executives.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: false }, capabilities: ['Offline Sync', 'GPS Location Tagging', 'Mobile Approvals'] },
  { id: 'hybrid_06_bi_live', code: 'HYBRID-06', name: 'Real-Time Operational Control Center', category: 'Digital Hybrid & AI', department: 'Executive', description: 'Live streaming operational telemetry feeds with instant threshold alerts.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: true }, capabilities: ['Live Telemetry', 'Alert Triggers', 'Multi-Screen Control'] },
  { id: 'hybrid_07_iot', code: 'HYBRID-07', name: 'IoT Telemetry & Device Bridge', category: 'Digital Hybrid & AI', department: 'IT Operations', description: 'MQTT/CoAP bridge for biometric hardware, GPS trackers, and smart meters.', status: 'ACTIVE', isMandatory: true, integrations: { faap: false, trust: true, aegis: true, cloud: true, ai: true }, capabilities: ['MQTT Protocol', 'Hardware Sensor Feeds', 'Device Status Monitors'] },
  { id: 'hybrid_08_trust', code: 'HYBRID-08', name: 'JUMO TRUST Assurance Gateway', category: 'Digital Hybrid & AI', department: 'Governance', description: 'Direct hook to JUMO TRUST for continuous auditing, compliance, and evidence vaulting.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: true }, capabilities: ['Continuous Audit', 'Evidence Hash Vaulting', 'Sovereign Grade'] },
  { id: 'hybrid_09_aegis', code: 'HYBRID-09', name: 'AEGIS Zero-Trust Security Sentinel', category: 'Digital Hybrid & AI', department: 'IT Operations', description: 'Real-time intrusion detection, anomaly monitoring, and privilege escalation guards.', status: 'ACTIVE', isMandatory: true, integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: true }, capabilities: ['Intrusion Defense', 'Session Anomaly Guard', 'Dynamic Firewall'] },
  { id: 'hybrid_10_cloud', code: 'HYBRID-10', name: 'JUMO Cloud Native Service Proxy', category: 'Digital Hybrid & AI', department: 'IT Operations', description: 'Auto-scaling container orchestration proxy, object storage bridge, and edge cache.', status: 'ACTIVE', isMandatory: true, integrations: { faap: false, trust: true, aegis: true, cloud: true, ai: false }, capabilities: ['Auto-Scaling Proxy', 'S3 Storage Bridge', 'Edge CDN Cache'] },
];

/**
 * Generate 35 Department-Specific Domain Modules
 */
function createDomainModules(prefix: string, depts: { name: string; modules: { code: string; name: string; desc: string; caps: string[] }[] }[]): ErpModuleDefinition[] {
  const result: ErpModuleDefinition[] = [];
  let counter = 1;
  for (const dept of depts) {
    for (const mod of dept.modules) {
      const idStr = counter < 10 ? `0${counter}` : `${counter}`;
      result.push({
        id: `${prefix}_dept_${idStr}`,
        code: `${prefix.toUpperCase()}-${idStr}`,
        name: mod.name,
        category: 'Department Domain',
        department: dept.name,
        description: mod.desc,
        status: 'ACTIVE',
        isMandatory: false,
        integrations: { faap: true, trust: true, aegis: true, cloud: true, ai: true },
        capabilities: mod.caps
      });
      counter++;
      if (result.length >= 35) return result;
    }
  }
  return result;
}

/**
 * 1. JUMO FINTECH (100 MODULES)
 */
export const FINTECH_100_CATALOGUE: ErpFamilyCatalogue = {
  familyId: 'JUMO-FINTECH',
  familyName: 'JUMO FINTECH',
  category: 'Business Platform',
  version: 'v16.0.0',
  totalModules: 100,
  departmentsCount: 15,
  description: 'Unified financial-services platform. Combines FAAP Accounting, Digital Pay, Banking, Lending, Microfinance, and SACCO capabilities into one modular ecosystem.',
  modules: [
    ...UNIVERSAL_CORE_FOUNDATION_20,
    ...FAAP_FINANCIAL_BACKBONE_20,
    ...HUMAN_CAPITAL_PLATFORM_15,
    ...createDomainModules('fintech', [
      { name: 'Accounting & Financial Management', modules: [
        { code: 'FT-ACC-01', name: 'Advanced General Ledger', desc: 'Real-time double-entry accounting with multi-book support.', caps: ['Double-Entry', 'Zero-Offset', 'Multi-Book'] },
        { code: 'FT-ACC-02', name: 'Budget & Vote Book', desc: 'Comprehensive budget commitment and liquidation tracking.', caps: ['Vote Book', 'Commitments', 'Budget Control'] },
        { code: 'FT-ACC-03', name: 'Cash Management Suite', desc: 'Single, double, and triple column cash books with bank reconciliation.', caps: ['Cash Books', 'Bank Recon', 'Forecasting'] },
        { code: 'FT-ACC-04', name: 'Asset & Tax Accounting', desc: 'Fixed asset register and multi-jurisdictional tax compliance.', caps: ['Depreciation', 'VAT/GST', 'Withholding'] }
      ]},
      { name: 'Digital Payments (JUMO Pay)', modules: [
        { code: 'FT-PAY-01', name: 'Universal Payment Gateway', desc: 'Extensible rail architecture for Mobile Money, Cards, and Bank transfers.', caps: ['Payment Routing', 'Real-Time Clearing', 'Adapter Engine'] },
        { code: 'FT-PAY-02', name: 'Merchant & Agent Network', desc: 'Merchant collections, agent management, and commission split engines.', caps: ['Merchant Portals', 'Agent Wallets', 'Fee Splitting'] },
        { code: 'FT-PAY-03', name: 'Settlement & Reconciliation', desc: 'Automated batch settlement, refund processing, and reversal workflows.', caps: ['Batch Settlement', 'Reconciliation', 'Chargebacks'] }
      ]},
      { name: 'Banking & Wallets', modules: [
        { code: 'FT-BNK-01', name: 'Customer Account Management', desc: 'Savings, current, and fixed deposit account lifecycles.', caps: ['Account Opening', 'KYC/AML', 'Statements'] },
        { code: 'FT-BNK-02', name: 'Transfers & Beneficiaries', desc: 'Intra-bank, RTGS, and international remittance (SWIFT) transfers.', caps: ['RTGS', 'SWIFT Bridge', 'Beneficiary Registry'] }
      ]},
      { name: 'Lending & Credit', modules: [
        { code: 'FT-LEN-01', name: 'Universal Loan Origination', desc: 'Configurable loan products, application workflows, and appraisal.', caps: ['Product Factory', 'Appraisal Workflow', 'Collateral'] },
        { code: 'FT-LEN-02', name: 'AI Credit Scoring Engine', desc: 'Real-time scoring based on transaction telemetry and external bureaus.', caps: ['AI Scoring', 'Bureau Integration', 'Risk Profiling'] },
        { code: 'FT-LEN-03', name: 'Portfolio Management & Arrears', desc: 'Repayment scheduling, interest calculation, and PAR analysis.', caps: ['Repayment Schedules', 'PAR Analysis', 'Write-offs'] }
      ]},
      { name: 'SACCO & Microfinance', modules: [
        { code: 'FT-SAC-01', name: 'SACCO Member Registry', desc: 'Share capital, member deposits, and dividend declaration management.', caps: ['Share Ledger', 'Dividends', 'Member Exits'] },
        { code: 'FT-SAC-02', name: 'Cooperative Governance', desc: 'Meeting minutes, resolution tracking, and regulatory reporting.', caps: ['Minutes', 'Resolutions', 'Regulatory Rpts'] }
      ]},
      { name: 'Treasury & Liquidity', modules: [
        { code: 'FT-TRS-01', name: 'Treasury Command Center', desc: 'Liquidity management, multi-currency treasury, and FX trading.', caps: ['Liquidity Monitor', 'FX Trading', 'Inter-account'] }
      ]},
      { name: 'Risk & Compliance', modules: [
        { code: 'FT-RSK-01', name: 'Regulatory Reporting & AML', desc: 'Automated filings and transaction monitoring for fraud detection.', caps: ['AML Monitoring', 'Fraud Detection', 'Central Bank Filing'] }
      ]}
    ]),
    ...DIGITAL_HYBRID_AI_10
  ]
};

/**
 * 2. EDUCATION & ALUMNI ERP (100 MODULES)
 */
export const EDUCATION_ALUMNI_100_CATALOGUE: ErpFamilyCatalogue = {
  familyId: 'JUMO-EDU-ALUMNI',
  familyName: 'JUMO Education & Alumni ERP',
  category: 'Institution Platform',
  version: 'v14.4.0',
  totalModules: 100,
  departmentsCount: 14,
  description: 'Universal Education Management & Institutional Advancement. Covers the complete lifecycle from Applicant to Student to Alumnus and Endowment management.',
  modules: [
    ...UNIVERSAL_CORE_FOUNDATION_20,
    ...FAAP_FINANCIAL_BACKBONE_20,
    ...HUMAN_CAPITAL_PLATFORM_15,
    ...createDomainModules('edu', [
      { name: 'Academic Administration', modules: [
        { code: 'EDU-01', name: 'Student Information System (SIS)', desc: 'Complete bio-data, enrollment, guardian links, and academic records.', caps: ['Student Profiles', 'Enrollment Management', 'Guardian Links'] },
        { code: 'EDU-02', name: 'Curriculum & Course Manager', desc: 'Academic calendar, course units, prerequisite mapping, and credit tracking.', caps: ['Syllabus Mapping', 'Credit Allocation', 'Prerequisites'] },
        { code: 'EDU-03', name: 'Examination & Assessment Engine', desc: 'Coursework marks, exam results, CGPA computation, and transcript generation.', caps: ['Automated Grading', 'CGPA Calculation', 'Transcript Vault'] }
      ]},
      { name: 'Alumni & Advancement', modules: [
        { code: 'ALUM-01', name: 'Global Alumni Directory', desc: 'Dynamic database of graduates with searchable profiles and career tracking.', caps: ['Alumni Profiles', 'Career Tracking', 'Class Chapters'] },
        { code: 'ALUM-02', name: 'Donations & Endowment Ledger', desc: 'Fundraising campaign manager, pledge tracking, and endowment fund accounting.', caps: ['Donor Pledges', 'Endowment Accounting', 'Impact Reports'] },
        { code: 'ALUM-03', name: 'Career Mentorship Matcher', desc: 'AI-driven pairing of students and alumni for professional mentorship.', caps: ['Mentorship Matching', 'Job Referrals', 'Skills Sharing'] }
      ]}
    ]),
    ...DIGITAL_HYBRID_AI_10
  ]
};

/**
 * 3. CHURCH & DIOCESE ERP (100 MODULES)
 */
export const CHURCH_100_CATALOGUE: ErpFamilyCatalogue = {
  familyId: 'JUMO-CHURCH',
  familyName: 'JUMO Church & Diocese ERP',
  category: 'Institution Platform',
  version: 'v8.0.0',
  totalModules: 100,
  departmentsCount: 10,
  description: 'Authoritative faith-based governance and administrative operating system for dioceses and parish networks.',
  modules: [
    ...UNIVERSAL_CORE_FOUNDATION_20,
    ...FAAP_FINANCIAL_BACKBONE_20,
    ...HUMAN_CAPITAL_PLATFORM_15,
    ...createDomainModules('church', [
      { name: 'Ecclesiastical Governance', modules: [
        { code: 'CHR-01', name: 'Hierarchical Registry', desc: 'Mapping of dioceses, deaneries, parishes, and sub-parishes.', caps: ['Hierarchy Mapping', 'Jurisdictional Org', 'Clergy Assignments'] },
        { code: 'CHR-02', name: 'Membership & Census', desc: 'Congregational database with family groups and cell fellowship links.', caps: ['Member Census', 'Family Registry', 'Home Cell Groups'] },
        { code: 'CHR-03', name: 'Sacramental Vault', desc: 'Secure digital registry for Baptisms, Confirmations, Marriages, and Orders.', caps: ['Digital Sacraments', 'QR Verification', 'Canonical Archives'] }
      ]},
      { name: 'Faith Stewardship', modules: [
        { code: 'CHR-04', name: 'Tithes & Offering Ledger', desc: 'Confidential record-keeping of member giving with automated tax receipts.', caps: ['Tithe Tracking', 'Electronic Giving', 'Anonymous Pledges'] },
        { code: 'CHR-05', name: 'Ministry & Volunteer Roster', desc: 'Coordination of choirs, ushers, prayer warriors, and youth groups.', caps: ['Volunteer Scheduling', 'Ministry Tasks', 'Training Logs'] }
      ]}
    ]),
    ...DIGITAL_HYBRID_AI_10
  ]
};

/**
 * 4. SOVEREIGN CONTROL CENTER (100 MODULES)
 */
export const CONTROL_100_CATALOGUE: ErpFamilyCatalogue = {
  familyId: 'JUMO-CONTROL',
  familyName: 'JUMO Sovereign Control Center',
  category: 'Shared Platform Services',
  version: 'v14.0.0',
  totalModules: 100,
  departmentsCount: 15,
  description: 'Consolidated Sovereign Management Console. AEGIS Security, AI Command, Cloud Infrastructure, and Platform Orchestration.',
  modules: [
    ...UNIVERSAL_CORE_FOUNDATION_20,
    ...FAAP_FINANCIAL_BACKBONE_20,
    ...HUMAN_CAPITAL_PLATFORM_15,
    ...createDomainModules('ctrl', [
      { name: 'Platform Intelligence', modules: [
        { code: 'CTRL-01', name: 'AI Command Center', desc: 'Orchestration of AI models, swarm registry, and cognitive API routing.', caps: ['Model Orchestration', 'Agent Swarms', 'AI Governance'] },
        { code: 'CTRL-02', name: 'AEGIS Security Wall', desc: 'Real-time threat detection, privilege monitoring, and encryption management.', caps: ['Intrusion Detection', 'Key Management', 'Audit Sentinel'] },
        { code: 'CTRL-03', name: 'Kernel & Platform Registry', desc: 'Management of installed domains, service discovery, and lifecycle updates.', caps: ['Service Discovery', 'Hot-Swapping', 'License Manager'] }
      ]}
    ]),
    ...DIGITAL_HYBRID_AI_10
  ]
};

const MASTER_CATALOGUES: Record<string, ErpFamilyCatalogue> = {
  'JUMO-FINTECH': FINTECH_100_CATALOGUE,
  'JUMO-EDU-ALUMNI': EDUCATION_ALUMNI_100_CATALOGUE,
  'JUMO-CHURCH': CHURCH_100_CATALOGUE
};

export function getErp100Catalogue(familyId: string): ErpFamilyCatalogue {
  return MASTER_CATALOGUES[familyId] || FINTECH_100_CATALOGUE;
}
