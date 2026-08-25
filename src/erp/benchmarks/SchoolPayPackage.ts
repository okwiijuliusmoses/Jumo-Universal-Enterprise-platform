/**
 * JUMO UEOS — SchoolPay Benchmark Package Extraction
 * Complete Forensic Decomposition of Institutional Payment Gateway & Interbank Clearing Rails.
 */

import { BenchmarkPackageExtraction } from './types';
import { BENCHMARK_SOURCES } from './sources';

export const SCHOOLPAY_EXTRACTION: BenchmarkPackageExtraction = {
  source: BENCHMARK_SOURCES.SCHOOLPAY_NETWORK,
  portals: [
    { portalId: 'PORTAL-SP-01', sourceId: 'SRC-SPAY', name: 'SchoolPay Institutional Bursar Portal', targetAudience: 'School Bursars, University Cashiers, Revenue Officers', authenticationType: 'STAFF_MFA_HSM', workspaceBoundary: 'Real-time Payment Stream, Payment Code (PRN) Inquiries, Daily Settlement Statements, Suspense Ledger', keyApplications: ['SchoolPay Switch Desk', 'PRN Lookup Workbench', 'Settlement Recon Suite'], provenance: 'OBSERVED' },
    { portalId: 'PORTAL-SP-02', sourceId: 'SRC-SPAY', name: 'SchoolPay Payer Self-Service Web & USSD', targetAudience: 'Parents, Students, Sponsors', authenticationType: 'PARENT_MOBILE_OTP', workspaceBoundary: 'Payment Code Validation, Fee Breakdown, Mobile Money Push / Card Checkout, Instant Digital Receipt', keyApplications: ['Web Checkout Rail', 'USSD *165# Menu', 'Receipt Validator'], provenance: 'OBSERVED' },
    { portalId: 'PORTAL-SP-03', sourceId: 'SRC-SPAY', name: 'SchoolPay Commercial Bank Teller Gateway', targetAudience: 'Bank Branch Cashiers, Agency Banking Tellers', authenticationType: 'STAFF_MFA_HSM', workspaceBoundary: 'Bank Counter Deposit, Real-Time Student Lookup, Deposit Slip Verification, Core Banking Posting', keyApplications: ['Bank Teller Bridge', 'Agency POS Terminal'], provenance: 'OBSERVED' }
  ],
  directorates: [
    { directorateId: 'DIR-SP-PAY', sourceId: 'SRC-SPAY', name: 'Institutional Payments & Digital Clearing Directorate', mandate: 'Interbank switching, cellular mobile money routing, real-time student PRN validation, settlement reconciliation.', parentOrganization: 'SchoolPay Clearing Switch', departmentsCount: 3, provenance: 'OBSERVED' }
  ],
  departments: [
    { departmentId: 'DEP-SP-SWITCH', directorateId: 'DIR-SP-PAY', sourceId: 'SRC-SPAY', name: 'Payment Switch & API Gateway Engine', purpose: 'Deterministic Payment Code resolution, mobile money STK pushes, bank teller API feeds.', officesCount: 1, provenance: 'OBSERVED' },
    { departmentId: 'DEP-SP-SETTLE', directorateId: 'DIR-SP-PAY', sourceId: 'SRC-SPAY', name: 'Settlement, Clearing & Escrow Management', purpose: 'Daily merchant account settlement sweeps, fee splitting, bank reconciliation, dispute management.', officesCount: 2, provenance: 'OBSERVED' }
  ],
  offices: [
    { officeId: 'OFF-SP-SWITCH', departmentId: 'DEP-SP-SWITCH', directorateId: 'DIR-SP-PAY', sourceId: 'SRC-SPAY', name: 'Payment Gateway Switching Office', mandate: 'Operate ISO 8583 and REST APIs for real-time mobile money and bank collections.', owningRole: 'Head of Payment Operations', workspaceRoute: '/schoolpay/switch', applications: ['SchoolPay Core Switch'], modulesCount: 3, capabilitiesCount: 14, isolationBoundary: 'FINANCIAL', provenance: 'OBSERVED' },
    { officeId: 'OFF-SP-SETTLE', departmentId: 'DEP-SP-SETTLE', directorateId: 'DIR-SP-PAY', sourceId: 'SRC-SPAY', name: 'Settlement & Bank Reconciliation Office', mandate: 'Execute end-of-day funds transfer from escrow to school bank accounts, audit 3-way logs.', owningRole: 'Settlement Officer', workspaceRoute: '/schoolpay/settlement', applications: ['SchoolPay Settlement Engine'], modulesCount: 2, capabilitiesCount: 10, isolationBoundary: 'FINANCIAL', provenance: 'OBSERVED' }
  ],
  roles: [
    { roleId: 'ROLE-SP-OPERATOR', sourceId: 'SRC-SPAY', name: 'Payment Switch Operations Engineer', officeId: 'OFF-SP-SWITCH', portalId: 'PORTAL-SP-01', hierarchyLevel: 'SENIOR_OFFICER', permissionsCount: 35, provenance: 'OBSERVED' },
    { roleId: 'ROLE-SP-BURSAR', sourceId: 'SRC-SPAY', name: 'Institutional School Bursar', officeId: 'OFF-SP-SWITCH', portalId: 'PORTAL-SP-01', hierarchyLevel: 'OFFICE_HEAD', permissionsCount: 28, provenance: 'OBSERVED' },
    { roleId: 'ROLE-SP-TELLER', sourceId: 'SRC-SPAY', name: 'Commercial Bank Branch Teller', officeId: 'OFF-SP-SWITCH', portalId: 'PORTAL-SP-03', hierarchyLevel: 'OPERATIONAL_CLERK', permissionsCount: 18, provenance: 'OBSERVED' }
  ],
  applications: [
    { appId: 'APP-SP-SWITCH', sourceId: 'SRC-SPAY', name: 'SchoolPay Universal Switching & API Platform', owningOfficeId: 'OFF-SP-SWITCH', portalId: 'PORTAL-SP-01', purpose: 'PRN resolution, cellular network STK push, instant webhook dispatch.', modules: ['MOD-SP-PRN-01', 'MOD-SP-MOMO-02', 'MOD-SP-WEBHOOK-03'], provenance: 'OBSERVED' },
    { appId: 'APP-SP-SETTLE', sourceId: 'SRC-SPAY', name: 'SchoolPay Multi-Bank Automated Settlement Engine', owningOfficeId: 'OFF-SP-SETTLE', portalId: 'PORTAL-SP-01', purpose: 'Daily merchant clearing sweeps, fee deductions, 3-way matching.', modules: ['MOD-SP-SWEEP-01', 'MOD-SP-RECON-02'], provenance: 'OBSERVED' }
  ],
  workflows: [
    { workflowId: 'WF-SP-PAY-LIFECYCLE', sourceId: 'SRC-SPAY', name: 'End-to-End Student Fee Payment & Sub-Ledger Posting Workflow', trigger: 'Payer initiates payment via Mobile Money, Web, or Bank Branch', initiatingOffice: 'Payment Gateway Switching Office', initiatingRole: 'Payer / Teller', stepsCount: 6, approvalStages: ['Deterministic PRN Lookup & Validation', 'Fee Component Breakdown Ingestion', 'Telco / Bank Authorization Handshake', 'Real-Time Clearing & Webhook Dispatch', 'School Sub-Ledger Credit Posting', 'Instant SMS Receipt Dispatch'], rejectionPath: 'Return Payment Failure Code & Reverse Funds to Payer', notifications: ['SMS Receipt to Parent with Trx Reference', 'ERP Webhook to School Bursar'], resultingRecords: ['SchoolPay Transaction Record', 'School Fee Ledger Credit', 'Escrow Ledger Entry'], accountingEffects: 'Debit SchoolPay Escrow Account, Credit Student Fee Receivable', provenance: 'OBSERVED' },
    { workflowId: 'WF-SP-DAILY-SWEEP', sourceId: 'SRC-SPAY', name: 'End-of-Day Multi-Bank Settlement Sweep Workflow', trigger: 'Scheduled batch trigger at 23:59:00 UTC', initiatingOffice: 'Settlement Office', initiatingRole: 'Settlement Officer', stepsCount: 4, approvalStages: ['Daily Transaction Net Volume Aggregation', 'Platform Service Fee Calculation', 'EFT / RTGS Transfer File Generation', 'Partner Commercial Bank Execution'], rejectionPath: 'Flag Settlement Discrepancy & Halt Affected School Batch', notifications: ['Daily Settlement Statement Email to School Bursar'], resultingRecords: ['Daily Settlement Batch File', 'Bank Transfer Confirmation'], accountingEffects: 'Debit Escrow Account, Credit School Commercial Bank Operating Account', provenance: 'OBSERVED' }
  ],
  screens: [
    { screenId: 'SCR-SP-STREAM-01', sourceId: 'SRC-SPAY', name: 'Live Fee Collection Stream & PRN Lookup Desk', officeId: 'OFF-SP-SWITCH', portalId: 'PORTAL-SP-01', routePath: '/schoolpay/stream', layoutType: 'DATA_TABLE_EXPANDABLE', primaryControls: ['Search Payment Code', 'Filter by Date / Class', 'Verify Telco Trx ID', 'Re-send SMS Receipt', 'Export CSV'], provenance: 'OBSERVED' },
    { screenId: 'SCR-SP-SETTLE-01', sourceId: 'SRC-SPAY', name: 'Daily Settlement & Bank Transfer Dashboard', officeId: 'OFF-SP-SETTLE', portalId: 'PORTAL-SP-01', routePath: '/schoolpay/settlement/batches', layoutType: 'SPLIT_VIEW_MASTER_DETAIL', primaryControls: ['View Gross Collection', 'View Deducted Charges', 'Download Bank EFT File', 'Approve Batch Sweep'], provenance: 'OBSERVED' },
    { screenId: 'SCR-SP-RECON-01', sourceId: 'SRC-SPAY', name: '3-Way Payment Reconciliation Workbench', officeId: 'OFF-SP-SETTLE', portalId: 'PORTAL-SP-01', routePath: '/schoolpay/reconciliation', layoutType: 'SPLIT_VIEW_MASTER_DETAIL', primaryControls: ['Compare Telco Log vs SchoolPay vs School ERP', 'Auto-Resolve Matches', 'Assign Suspense Transactions'], provenance: 'OBSERVED' }
  ],
  forms: [
    { formId: 'FORM-SP-001', sourceId: 'SRC-SPAY', name: 'Student Payment Code (PRN) Generator Form', owningOfficeId: 'OFF-SP-SWITCH', initiatingRole: 'Institutional School Bursar', resultingRecord: 'SchoolPayPRNEntity', fields: [{ name: 'studentRegistrationNumber', type: 'TEXT', required: true }, { name: 'studentFullName', type: 'TEXT', required: true }, { name: 'termFeeObligation', type: 'CURRENCY', required: true }, { name: 'academicYear', type: 'TEXT', required: true }], provenance: 'OBSERVED' }
  ],
  dataObjects: [
    { entityId: 'ENT-SP-TRX', sourceId: 'SRC-SPAY', name: 'SchoolPayTransactionRecord', owningDomain: 'Payments', primaryKey: 'transactionId', fieldsCount: 24, relationships: ['SchoolPayPRNEntity', 'SchoolProfile', 'SettlementBatch'], persistenceType: 'IMMUTABLE_SHA256_LEDGER', provenance: 'OBSERVED' },
    { entityId: 'ENT-SP-PRN', sourceId: 'SRC-SPAY', name: 'SchoolPayPRNRecord', owningDomain: 'Payments', primaryKey: 'paymentCode', fieldsCount: 16, relationships: ['StudentProfile', 'SchoolFeeStructure'], persistenceType: 'POSTGRESQL_RELATIONAL', provenance: 'OBSERVED' }
  ],
  reports: [
    { reportId: 'REP-SP-01', sourceId: 'SRC-SPAY', name: 'Daily School Collection & Settlement Certificate', category: 'FINANCIAL_IFRS', owningOfficeId: 'OFF-SP-SETTLE', targetAudience: ['School Bursar', 'Bank Manager', 'Auditors'], dataSources: ['SchoolPayTransactionRecord'], exportFormats: ['PDF', 'EXCEL_XLSX'], provenance: 'OBSERVED' },
    { reportId: 'REP-SP-02', sourceId: 'SRC-SPAY', name: '3-Way Reconciliation Variance & Suspense Report', category: 'AUDIT_ASSURANCE', owningOfficeId: 'OFF-SP-SETTLE', targetAudience: ['Internal Auditor', 'CFO'], dataSources: ['SchoolPayTransactionRecord', 'BankStatementLog'], exportFormats: ['PDF', 'EXCEL_XLSX', 'CSV'], provenance: 'OBSERVED' }
  ],
  notifications: [
    { notifId: 'NOT-SP-01', sourceId: 'SRC-SPAY', name: 'Instant Payment Confirmation SMS', triggerEvent: 'Telco switch returns successful transaction response', channels: ['SMS'], recipientType: 'PARENT', provenance: 'OBSERVED' },
    { notifId: 'NOT-SP-02', sourceId: 'SRC-SPAY', name: 'ERP Real-Time Webhook Notification', triggerEvent: 'Transaction confirmed on SchoolPay switch', channels: ['WEBHOOK'], recipientType: 'BURSAR', provenance: 'OBSERVED' }
  ],
  integrations: [
    { integrationId: 'INT-SP-MOMO', sourceId: 'SRC-SPAY', name: 'Cellular Mobile Money Open APIs (MTN / Airtel / M-Pesa)', protocol: 'REST_JSON', externalSystem: 'Cellular Mobile Network Operators', flowDirection: 'BI_DIRECTIONAL', securityProtocol: 'HMAC_SHA256_SIGNATURE', provenance: 'OBSERVED' },
    { integrationId: 'INT-SP-BANKAPI', sourceId: 'SRC-SPAY', name: 'Direct Commercial Bank Host-to-Host Clearing API', protocol: 'ISO_8583', externalSystem: 'Tier-1 Commercial Banks', flowDirection: 'BI_DIRECTIONAL', securityProtocol: 'MUTUAL_TLS', provenance: 'OBSERVED' }
  ],
  capabilities: [
    { capabilityId: 'CAP-SP-01', sourceId: 'SRC-SPAY', code: 'SP-PRN-01', name: 'Deterministic Student Payment Code (PRN) Resolution', domain: 'Payments', directorateId: 'DIR-SP-PAY', departmentId: 'DEP-SP-SWITCH', officeId: 'OFF-SP-SWITCH', applicationId: 'APP-SP-SWITCH', moduleId: 'MOD-SP-PRN-01', submoduleId: 'SUB-SP-PRN-01', description: 'Enable banks and mobile wallets to resolve student details and exact fee arrears in under 200ms.', operations: [{ operationId: 'OP-SP-LOOKUP-01', name: 'Resolve Payment Code', actionType: 'CREATE', initiatorRole: 'Commercial Bank Branch Teller', targetEntity: 'SchoolPayPRNRecord' }], associatedWorkflows: ['WF-SP-PAY-LIFECYCLE'], associatedScreens: ['SCR-SP-STREAM-01'], associatedForms: ['FORM-SP-001'], associatedReports: ['REP-SP-01'], rolesWithAccess: ['ROLE-SP-TELLER', 'ROLE-SP-BURSAR'], permissionsRequired: ['payments.prn.lookup'], integrationsUsed: ['INT-SP-BANKAPI', 'INT-SP-MOMO'], jumoStatus: 'IMPLEMENTED', priority: 'P0', provenance: 'OBSERVED', confidence: 'HIGH' },
    { capabilityId: 'CAP-SP-02', sourceId: 'SRC-SPAY', code: 'SP-SETTLE-01', name: 'Automated Multi-Bank End-of-Day Settlement Sweeping', domain: 'Payments', directorateId: 'DIR-SP-PAY', departmentId: 'DEP-SP-SETTLE', officeId: 'OFF-SP-SETTLE', applicationId: 'APP-SP-SETTLE', moduleId: 'MOD-SP-SWEEP-01', submoduleId: 'SUB-SP-SETTLE-01', description: 'Consolidate daily collections across telcos and sweep funds directly to school bank operating accounts.', operations: [{ operationId: 'OP-SP-SWEEP-01', name: 'Execute Settlement Sweep', actionType: 'POST_LEDGER', initiatorRole: 'ROLE-SP-OPERATOR', targetEntity: 'SchoolPayTransactionRecord', accountingEffect: 'Debit Escrow Bank Account, Credit School General Account' }], associatedWorkflows: ['WF-SP-DAILY-SWEEP'], associatedScreens: ['SCR-SP-SETTLE-01'], associatedForms: [], associatedReports: ['REP-SP-01'], rolesWithAccess: ['ROLE-SP-OPERATOR', 'ROLE-SP-BURSAR'], permissionsRequired: ['payments.settlement.execute'], integrationsUsed: ['INT-SP-BANKAPI'], jumoStatus: 'IMPLEMENTED', priority: 'P0', provenance: 'OBSERVED', confidence: 'HIGH' }
  ]
};
