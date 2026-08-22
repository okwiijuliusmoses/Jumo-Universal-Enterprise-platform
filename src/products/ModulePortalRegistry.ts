/**
 * JUMO UEOS — Sovereign Module Portal Registry
 * Manifest, icon mappings, routes, authorization roles, and capability baselines
 * for every independent portal in Fintech, School ERP, Church ERP, and Alumni ERP.
 * 
 * Absolute Isolation Guarantee: Zero reliance on universal shells or cross-product sidebars.
 */

export interface PortalCapability {
  id: string;
  name: string;
  description: string;
  status: 'PRESERVED' | 'RECONSTRUCTED' | 'ENHANCED';
}

export interface ModulePortalManifest {
  id: string;
  productId: 'JUMO-FINTECH' | 'JUMO-SCHOOL-ERP' | 'JUMO-CHURCH-ERP' | 'JUMO-ALUMNI-ERP';
  portalName: string;
  category: string;
  description: string;
  iconName: string;
  route: string;
  authorizedRoles: string[];
  verificationStatus: 'VERIFIED' | 'PRESERVED' | 'RECONSTRUCTED';
  capabilities: PortalCapability[];
}

export const FINTECH_PORTALS: ModulePortalManifest[] = [
  {
    id: 'FAAP-PORTAL-GL',
    productId: 'JUMO-FINTECH',
    portalName: 'FAAP General Ledger Portal',
    category: 'Financial Accounting (FAAP)',
    description: 'Double-entry general ledger, real-time journal posting, trial balance & $0.00 debit/credit parity auditor.',
    iconName: 'BookOpen',
    route: '/fintech/gl',
    authorizedRoles: ['ROLE_CONTROLLER', 'ROLE_ACCOUNTANT', 'ROLE_CFO', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-FAAP-GL-01', name: 'Real-Time Journal Entry Posting', description: 'Immediate debit and credit posting to double-entry general ledger.', status: 'PRESERVED' },
      { id: 'CAP-FAAP-GL-02', name: 'Parity Audit Guard', description: '$0.00 debit/credit offset validator blocking imbalanced commits.', status: 'PRESERVED' },
      { id: 'CAP-FAAP-GL-03', name: 'Trial Balance & Ledger Reports', description: 'Automated trial balance compilation with drill-down transaction trails.', status: 'ENHANCED' },
      { id: 'CAP-FAAP-GL-04', name: 'Accounting Period & Closing Procedures', description: 'Fiscal year setup, retained earnings roll-forward, period locks.', status: 'RECONSTRUCTED' }
    ]
  },
  {
    id: 'FAAP-PORTAL-COA',
    productId: 'JUMO-FINTECH',
    portalName: 'Chart of Accounts Portal',
    category: 'Financial Accounting (FAAP)',
    description: 'Hierarchical chart of accounts, account numbering, types, balances, and opening balance setup.',
    iconName: 'Layers',
    route: '/fintech/coa',
    authorizedRoles: ['ROLE_CONTROLLER', 'ROLE_ACCOUNTANT', 'ROLE_CFO', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-FAAP-COA-01', name: '5-Digit Account Code Hierarchy', description: 'Structured Assets, Liabilities, Equity, Revenue, Expense codes.', status: 'PRESERVED' },
      { id: 'CAP-FAAP-COA-02', name: 'Opening Balance Setup & Sub-Accounts', description: 'Opening balance entry and multi-level parent/child account relationships.', status: 'RECONSTRUCTED' },
      { id: 'CAP-FAAP-COA-03', name: 'Account Registers', description: 'Detailed account register transaction history.', status: 'ENHANCED' }
    ]
  },
  {
    id: 'FAAP-PORTAL-AP',
    productId: 'JUMO-FINTECH',
    portalName: 'Accounts Payable Portal',
    category: 'Financial Accounting (FAAP)',
    description: 'Vendor/supplier registry, purchase bills, recurring bills, supplier statements, aging & payment scheduling.',
    iconName: 'FileText',
    route: '/fintech/ap',
    authorizedRoles: ['ROLE_CONTROLLER', 'ROLE_ACCOUNTANT', 'ROLE_CFO', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-FAAP-AP-01', name: 'Vendor Directory & Billing', description: 'Supplier profile management and purchase bill processing.', status: 'PRESERVED' },
      { id: 'CAP-FAAP-AP-02', name: 'Payables Aging & Voucher Approval', description: '30/60/90-day AP aging analysis and voucher authorization.', status: 'ENHANCED' },
      { id: 'CAP-FAAP-AP-03', name: 'Vendor Credits & Purchase Orders', description: 'Credit notes, supplier statement reconciliation, and PO linkage.', status: 'RECONSTRUCTED' }
    ]
  },
  {
    id: 'FAAP-PORTAL-AR',
    productId: 'JUMO-FINTECH',
    portalName: 'Accounts Receivable Portal',
    category: 'Financial Accounting (FAAP)',
    description: 'Customer directory, invoices, quotes, receipts, credit notes, receivables aging & overdue reminders.',
    iconName: 'CreditCard',
    route: '/fintech/ar',
    authorizedRoles: ['ROLE_CONTROLLER', 'ROLE_ACCOUNTANT', 'ROLE_CFO', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-FAAP-AR-01', name: 'Customer Invoicing & Receipts', description: 'Itemized invoice generation, sales receipts, and PRN payment matching.', status: 'PRESERVED' },
      { id: 'CAP-FAAP-AR-02', name: 'Receivables Aging & Customer Statements', description: 'Real-time aging schedules and automated customer account statements.', status: 'ENHANCED' },
      { id: 'CAP-FAAP-AR-03', name: 'Estimates, Quotes & Credit Memos', description: 'Sales quotes conversion to invoice, credit memos, and refund tracking.', status: 'RECONSTRUCTED' }
    ]
  },
  {
    id: 'FAAP-PORTAL-CASHBOOK',
    productId: 'JUMO-FINTECH',
    portalName: 'Cashbooks & Cash Management Portal',
    category: 'Financial Accounting (FAAP)',
    description: 'Single-column, double-column, and triple-column cashbooks, petty cash registers, daily cash closure.',
    iconName: 'DollarSign',
    route: '/fintech/cashbook',
    authorizedRoles: ['ROLE_CONTROLLER', 'ROLE_ACCOUNTANT', 'ROLE_TREASURER', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-FAAP-CB-01', name: 'Triple-Column Cashbook Architecture', description: 'Cash, Bank, and Discount columns with automated contra entry posting.', status: 'PRESERVED' },
      { id: 'CAP-FAAP-CB-02', name: 'Petty Cash & Voucher Management', description: 'Imprest petty cashbook, voucher receipts, and cash float balancing.', status: 'ENHANCED' },
      { id: 'CAP-FAAP-CB-03', name: 'Daily Cash Position & Closure', description: 'End-of-day physical cash count and ledger cash register reconciliation.', status: 'RECONSTRUCTED' }
    ]
  },
  {
    id: 'FAAP-PORTAL-BANKING',
    productId: 'JUMO-FINTECH',
    portalName: 'Banking & Feeds Portal',
    category: 'Financial Accounting (FAAP)',
    description: 'Bank account management, automated transaction feeds, bank rules, matching, transfers & deposits.',
    iconName: 'Landmark',
    route: '/fintech/banking',
    authorizedRoles: ['ROLE_CONTROLLER', 'ROLE_TREASURER', 'ROLE_ACCOUNTANT', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-FAAP-BNK-01', name: 'Live Banking Statement Import', description: 'Direct API and CSV bank statement feed integration.', status: 'PRESERVED' },
      { id: 'CAP-FAAP-BNK-02', name: 'Auto-Categorization & Rules', description: 'Bank feed transaction rule matching and automated ledger posting.', status: 'ENHANCED' },
      { id: 'CAP-FAAP-BNK-03', name: 'Inter-Account Cash Transfers', description: 'Controlled bank-to-bank and bank-to-cash transfer vouchers.', status: 'RECONSTRUCTED' }
    ]
  },
  {
    id: 'FAAP-PORTAL-RECON',
    productId: 'JUMO-FINTECH',
    portalName: 'Bank Reconciliation Portal',
    category: 'Financial Accounting (FAAP)',
    description: 'Automated bank statement reconciliation, un-cleared checks tracking, discrepancy resolution & audit reports.',
    iconName: 'CheckCircle2',
    route: '/fintech/recon',
    authorizedRoles: ['ROLE_CONTROLLER', 'ROLE_AUDITOR', 'ROLE_ACCOUNTANT', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-FAAP-REC-01', name: 'Automated Statement Matching', description: 'Match bank feed records against General Ledger cashbook entries.', status: 'PRESERVED' },
      { id: 'CAP-FAAP-REC-02', name: 'Discrepancy Resolution & Audit Certificate', description: 'Identify timing differences, un-cleared deposits, and generate clearance certificates.', status: 'ENHANCED' }
    ]
  },
  {
    id: 'FAAP-PORTAL-BUDGET',
    productId: 'JUMO-FINTECH',
    portalName: 'Budget & Variance Portal',
    category: 'Financial Accounting (FAAP)',
    description: 'Institutional budgeting, cost center allocations, budget vs actual variance analysis & revision tracking.',
    iconName: 'PieChart',
    route: '/fintech/budget',
    authorizedRoles: ['ROLE_CONTROLLER', 'ROLE_CFO', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-FAAP-BDG-01', name: 'Departmental Budget Allocation', description: 'Fiscal budget limits by department and expense account.', status: 'PRESERVED' },
      { id: 'CAP-FAAP-BDG-02', name: 'Budget vs Actual Variance Analysis', description: 'Real-time percentage utilization tracking and alert thresholds.', status: 'ENHANCED' }
    ]
  },
  {
    id: 'FAAP-PORTAL-VOTEBOOK',
    productId: 'JUMO-FINTECH',
    portalName: 'Vote Book & Commitment Portal',
    category: 'Financial Accounting (FAAP)',
    description: 'Public sector & institutional Vote Book, pre-expenditure encumbrance validation & LPO clearance.',
    iconName: 'Calculator',
    route: '/fintech/votebook',
    authorizedRoles: ['ROLE_CONTROLLER', 'ROLE_ACCOUNTANT', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-FAAP-VB-01', name: 'Pre-Expenditure Encumbrance Check', description: 'Automated blocking of purchase requisitions exceeding available vote budget.', status: 'PRESERVED' },
      { id: 'CAP-FAAP-VB-02', name: 'Vote Ledger & Commitment Tracking', description: 'Itemized tracking of approved budget, encumbered funds, and actual disbursements.', status: 'ENHANCED' }
    ]
  },
  {
    id: 'FAAP-PORTAL-INVENTORY',
    productId: 'JUMO-FINTECH',
    portalName: 'Inventory & Stock Accounting Portal',
    category: 'Financial Accounting (FAAP)',
    description: 'Item catalogue, stock quantities, valuation (FIFO/AVCO), stock adjustments & sales/purchase linkage.',
    iconName: 'Boxes',
    route: '/fintech/inventory',
    authorizedRoles: ['ROLE_CONTROLLER', 'ROLE_ACCOUNTANT', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-FAAP-INV-01', name: 'Stock Valuation & COGS', description: 'Inventory valuation models integrated with Cost of Goods Sold ledger.', status: 'RECONSTRUCTED' },
      { id: 'CAP-FAAP-INV-02', name: 'Reorder Alerts & Stock Adjustments', description: 'Low stock thresholds, damage write-offs, and physical stock count audit.', status: 'RECONSTRUCTED' }
    ]
  },
  {
    id: 'FAAP-PORTAL-PAYROLL',
    productId: 'JUMO-FINTECH',
    portalName: 'Payroll & Human Capital Ledger Portal',
    category: 'Financial Accounting (FAAP)',
    description: 'Employee registry, salary components, statutory deductions (PAYE, NSSF), payslips & payroll posting.',
    iconName: 'Users',
    route: '/fintech/payroll',
    authorizedRoles: ['ROLE_CONTROLLER', 'ROLE_ACCOUNTANT', 'ROLE_CFO', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-FAAP-PAY-01', name: 'Uganda Statutory Payroll Processing', description: 'Automated calculation of PAYE, NSSF, Local Service Tax, and net salaries.', status: 'RECONSTRUCTED' },
      { id: 'CAP-FAAP-PAY-02', name: 'Payslip Generation & GL Journal Linkage', description: 'Itemized digital payslips and automatic salary expense posting to General Ledger.', status: 'RECONSTRUCTED' }
    ]
  },
  {
    id: 'FAAP-PORTAL-ASSETS',
    productId: 'JUMO-FINTECH',
    portalName: 'Fixed Assets & Depreciation Portal',
    category: 'Financial Accounting (FAAP)',
    description: 'Asset register, acquisition, straight-line/reducing balance depreciation schedules & asset disposals.',
    iconName: 'Building',
    route: '/fintech/assets',
    authorizedRoles: ['ROLE_CONTROLLER', 'ROLE_ACCOUNTANT', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-FAAP-AST-01', name: 'Fixed Asset Register', description: 'Categorized capital assets, serial numbers, locations, and historical costs.', status: 'RECONSTRUCTED' },
      { id: 'CAP-FAAP-AST-02', name: 'Automated Depreciation Engine', description: 'Monthly/annual depreciation calculations and accumulative depreciation GL posting.', status: 'RECONSTRUCTED' }
    ]
  },
  {
    id: 'FAAP-PORTAL-FX',
    productId: 'JUMO-FINTECH',
    portalName: 'Multi-Currency & FX Desk Portal',
    category: 'Financial Accounting (FAAP)',
    description: 'Currencies, spot exchange rates, foreign transaction posting & realized/unrealized FX gain/loss accounting.',
    iconName: 'Globe',
    route: '/fintech/fx',
    authorizedRoles: ['ROLE_CONTROLLER', 'ROLE_TREASURER', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-FAAP-FX-01', name: 'Multi-Currency Journal Posting', description: 'Post transactions in USD, EUR, KES, UGX with automated exchange rate conversion.', status: 'RECONSTRUCTED' },
      { id: 'CAP-FAAP-FX-02', name: 'Unrealized FX Gain/Loss Revaluation', description: 'Period-end currency revaluation for foreign bank and currency balance accounts.', status: 'RECONSTRUCTED' }
    ]
  },
  {
    id: 'FAAP-PORTAL-PROJECTS',
    productId: 'JUMO-FINTECH',
    portalName: 'Job Costing & Project Finance Portal',
    category: 'Financial Accounting (FAAP)',
    description: 'Project accounting, job cost codes, project revenue/expenses, labor allocation & profitability reports.',
    iconName: 'Briefcase',
    route: '/fintech/projects',
    authorizedRoles: ['ROLE_CONTROLLER', 'ROLE_ACCOUNTANT', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-FAAP-PRJ-01', name: 'Job Costing & Work-in-Progress', description: 'Track direct materials, direct labor, and overheads per project/contract.', status: 'RECONSTRUCTED' },
      { id: 'CAP-FAAP-PRJ-02', name: 'Project Profitability & Ledger Audit', description: 'Compare project revenues against actual incurred expenses.', status: 'RECONSTRUCTED' }
    ]
  },
  {
    id: 'FAAP-PORTAL-TAX',
    productId: 'JUMO-FINTECH',
    portalName: 'Tax & Statutory Compliance Portal',
    category: 'Financial Accounting (FAAP)',
    description: 'Tax codes, VAT 18%, withholding tax, tax-inclusive/exclusive pricing & statutory compliance reports.',
    iconName: 'Receipt',
    route: '/fintech/tax',
    authorizedRoles: ['ROLE_CONTROLLER', 'ROLE_ACCOUNTANT', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-FAAP-TAX-01', name: 'VAT & Statutory Withholding Tax', description: 'Automated 18% VAT and 6% WHT calculation on invoices and bills.', status: 'PRESERVED' },
      { id: 'CAP-FAAP-TAX-02', name: 'Statutory Tax Filing Exports', description: 'Generate monthly URA-compliant e-returns and tax liability schedules.', status: 'ENHANCED' }
    ]
  },
  {
    id: 'FAAP-PORTAL-AUDIT',
    productId: 'JUMO-FINTECH',
    portalName: 'Financial Audit & Controls Portal',
    category: 'Financial Accounting (FAAP)',
    description: 'Auditor worksheets, immutable transaction history, period locks, role permissions & anomaly detection.',
    iconName: 'ShieldAlert',
    route: '/fintech/audit',
    authorizedRoles: ['ROLE_AUDITOR', 'ROLE_CONTROLLER', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-FAAP-AUD-01', name: 'Immutable Audit Trail', description: 'Cryptographically logged user actions, transaction revisions, and timestamps.', status: 'PRESERVED' },
      { id: 'CAP-FAAP-AUD-02', name: 'AI Anomaly & Fraud Detection', description: 'Automated flagging of irregular journal entries, round sums, or off-hour postings.', status: 'ENHANCED' }
    ]
  },
  {
    id: 'FAAP-PORTAL-REPORTS',
    productId: 'JUMO-FINTECH',
    portalName: 'Financial Reporting & Statements Portal',
    category: 'Financial Accounting (FAAP)',
    description: 'Balance Sheet, Income Statement (P&L), Cash Flow Statement, Trial Balance & custom management reports.',
    iconName: 'FileSpreadsheet',
    route: '/fintech/reports',
    authorizedRoles: ['ROLE_CONTROLLER', 'ROLE_CFO', 'ROLE_AUDITOR', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-FAAP-REP-01', name: 'IFRS-Compliant Financial Statements', description: 'One-click Balance Sheet, Income Statement, and Cash Flow Statement.', status: 'PRESERVED' },
      { id: 'CAP-FAAP-REP-02', name: 'Export & Management Dashboards', description: 'Export to Excel, PDF, CSV, and interactive financial ratio charts.', status: 'ENHANCED' }
    ]
  },
  {
    id: 'FAAP-PORTAL-ADMIN',
    productId: 'JUMO-FINTECH',
    portalName: 'FAAP Administration & Settings Portal',
    category: 'Financial Accounting (FAAP)',
    description: 'Fiscal period controls, base currency, approval workflows, user permissions & ledger security.',
    iconName: 'Settings',
    route: '/fintech/faap-admin',
    authorizedRoles: ['ROLE_FINTECH_ADMIN', 'ROLE_CFO'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-FAAP-ADM-01', name: 'Ledger Security & Period Locks', description: 'Lock completed financial months to prevent retro-active edits.', status: 'PRESERVED' },
      { id: 'CAP-FAAP-ADM-02', name: 'Multi-Tenant Ledger Isolation', description: 'Strict tenant-scoped database row filtering for workspace security.', status: 'PRESERVED' }
    ]
  },
  {
    id: 'DP-PORTAL-PRN',
    productId: 'JUMO-FINTECH',
    portalName: 'SchoolPay PRN & Collections Portal',
    category: 'Digital Pay Switch',
    description: 'Student Payment Reference Number (PRN) generator, real-time fee payment receipts & bank notifications.',
    iconName: 'Key',
    route: '/fintech/prn',
    authorizedRoles: ['ROLE_OPS', 'ROLE_MERCHANT', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-DP-PRN-01', name: 'Real-Time PRN Reference Issuance', description: 'Generate unique 10-digit PRNs mapped to student LIN and fee categories.', status: 'PRESERVED' },
      { id: 'CAP-DP-PRN-02', name: 'Bank Switch Notification Hook', description: 'Instant webhook processing when fees are paid via Stanbic/Centenary/NMB.', status: 'ENHANCED' }
    ]
  },
  {
    id: 'DP-PORTAL-TUITION',
    productId: 'JUMO-FINTECH',
    portalName: 'Tuition Fee Switch Portal',
    category: 'Digital Pay Switch',
    description: 'Direct institutional fee collection switch, parent channel integration & allocation rules.',
    iconName: 'GraduationCap',
    route: '/fintech/tuition',
    authorizedRoles: ['ROLE_OPS', 'ROLE_MERCHANT', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-DP-TUIT-01', name: 'Direct Institution Fee Clearing', description: 'Automated routing of incoming tuition payments to school bank accounts.', status: 'PRESERVED' }
    ]
  },
  {
    id: 'DP-PORTAL-SETTLEMENT',
    productId: 'JUMO-FINTECH',
    portalName: '1.5% Protocol Settlement Fee Portal',
    category: 'Digital Pay Switch',
    description: 'Global 1.5% settlement fee splitting engine, master treasury ledger debits & revenue reporting.',
    iconName: 'Scale',
    route: '/fintech/settlement',
    authorizedRoles: ['ROLE_TREASURER', 'ROLE_OPS', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-DP-STL-01', name: '1.5% Clearing Fee Treasury Split', description: 'Automatically deduct 1.5% fee on all switch transactions to JUMO Master Treasury.', status: 'PRESERVED' }
    ]
  },
  {
    id: 'DP-PORTAL-POS',
    productId: 'JUMO-FINTECH',
    portalName: 'POS & Agency Banking Network Portal',
    category: 'Digital Pay Switch',
    description: 'Agency POS terminal management, agent float balances, cash-in/cash-out & agent commission ledgers.',
    iconName: 'Server',
    route: '/fintech/pos',
    authorizedRoles: ['ROLE_AGENT', 'ROLE_OPS', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-DP-POS-01', name: 'ISO 8583 Terminal Switch Engine', description: 'Real-time agent POS transaction processing and float validation.', status: 'PRESERVED' }
    ]
  },
  {
    id: 'DP-PORTAL-MOMO',
    productId: 'JUMO-FINTECH',
    portalName: 'Mobile Money & Digital Wallet Switch Portal',
    category: 'Digital Pay Switch',
    description: 'MTN MoMo, Airtel Money, and M-Pesa gateway switching, C2B/B2C disburse & wallet ledger.',
    iconName: 'ArrowRightLeft',
    route: '/fintech/momo',
    authorizedRoles: ['ROLE_OPS', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-DP-MOMO-01', name: 'Unified MoMo Gateway', description: 'C2B fee collection and B2C bulk payouts across MTN and Airtel.', status: 'PRESERVED' }
    ]
  },
  {
    id: 'DP-PORTAL-SACCO',
    productId: 'JUMO-FINTECH',
    portalName: 'Microfinance & SACCO Credit Portal',
    category: 'Digital Pay Switch',
    description: 'SACCO member savings accounts, loan application appraisal, repayment schedules & dividend books.',
    iconName: 'HeartHandshake',
    route: '/fintech/sacco',
    authorizedRoles: ['ROLE_CREDIT_OFFICER', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-FIN-SACCO-01', name: 'SACCO Savings & Loan Books', description: 'Member shares, loan principal disbursement, and interest accruals.', status: 'PRESERVED' }
    ]
  },
  {
    id: 'DP-PORTAL-MERCHANT',
    productId: 'JUMO-FINTECH',
    portalName: 'Merchant Acquiring & QR Payments Portal',
    category: 'Digital Pay Switch',
    description: 'EMVCo compliant QR code payments, merchant store codes, daily settlement & till management.',
    iconName: 'Briefcase',
    route: '/fintech/merchant',
    authorizedRoles: ['ROLE_MERCHANT', 'ROLE_OPS', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-DP-MERCH-01', name: 'Dynamic QR Merchant Checkout', description: 'Generate instant payment QR codes for point-of-sale customer scanning.', status: 'PRESERVED' }
    ]
  },
  {
    id: 'DP-PORTAL-TREASURY',
    productId: 'JUMO-FINTECH',
    portalName: 'Treasury & Liquidity Routing Portal',
    category: 'Digital Pay Switch',
    description: 'Inter-bank liquidity routing, automated sweep rules, reserve monitoring & yield optimization.',
    iconName: 'TrendingUp',
    route: '/fintech/treasury',
    authorizedRoles: ['ROLE_TREASURER', 'ROLE_CFO', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-FIN-TRS-01', name: 'Master Treasury Router', description: 'Inter-bank liquidity balancing and surplus account sweeping.', status: 'PRESERVED' }
    ]
  },
  {
    id: 'DP-PORTAL-RISK',
    productId: 'JUMO-FINTECH',
    portalName: 'Fraud Radar & Risk Sentinel Portal',
    category: 'Digital Pay Switch',
    description: 'Real-time transaction velocity checks, AML/sanctions screening & automated account freezing.',
    iconName: 'ShieldAlert',
    route: '/fintech/risk',
    authorizedRoles: ['ROLE_RISK_ANALYST', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-DP-RSK-01', name: 'Aegis Real-Time Fraud Radar', description: 'Sub-second risk scoring and automated high-risk transaction blocking.', status: 'PRESERVED' }
    ]
  },
  {
    id: 'FINTECH-DEV-HUB',
    productId: 'JUMO-FINTECH',
    portalName: 'Fintech Developer Hub & API Portal',
    category: 'Developer & API',
    description: 'API key management, webhook subscriptions, sandbox testing console & live switch telemetry.',
    iconName: 'Cpu',
    route: '/fintech/developer',
    authorizedRoles: ['ROLE_DEVELOPER', 'ROLE_FINTECH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-FIN-DEV-01', name: 'Developer REST API Gateway', description: 'OAuth2 credential issuance, API usage logs, and sandbox simulation.', status: 'PRESERVED' }
    ]
  }
];

export const SCHOOL_PORTALS: ModulePortalManifest[] = [
  {
    id: 'EDU-PORTAL-NURSERY',
    productId: 'JUMO-SCHOOL-ERP',
    portalName: 'Nursery & Pre-Primary Office Portal',
    category: 'Pre-Primary / Nursery Tier',
    description: 'Early Childhood Development (ECD) milestones, toddler daily care logs, infant nutrition & guardian pickup security.',
    iconName: 'HeartHandshake',
    route: '/education/nursery',
    authorizedRoles: ['ROLE_NURSERY_HEAD', 'ROLE_CARE_TEACHER', 'ROLE_SCHOOL_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-EDU-NUR-01', name: 'ECD Milestone Tracking', description: 'Track physical, cognitive, and social development milestones.', status: 'RECONSTRUCTED' },
      { id: 'CAP-EDU-NUR-02', name: 'Guardian Pickup Authorization', description: 'Biometric/photo pickup verification cards for child safety.', status: 'RECONSTRUCTED' }
    ]
  },
  {
    id: 'EDU-PORTAL-PRIMARY',
    productId: 'JUMO-SCHOOL-ERP',
    portalName: 'Primary School Office Portal',
    category: 'Primary School Tier',
    description: 'Hillside Naalya Primary benchmark model, P.1-P.7 Pupil Census, Thematic Curriculum, PLE UNEB candidate index.',
    iconName: 'GraduationCap',
    route: '/education/primary',
    authorizedRoles: ['ROLE_PRIMARY_HEAD', 'ROLE_CLASS_TEACHER', 'ROLE_SCHOOL_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-EDU-PRI-01', name: 'P.1-P.7 Pupil Census & LIN', description: 'National Learner Identification Number allocation and class registers.', status: 'RECONSTRUCTED' },
      { id: 'CAP-EDU-PRI-02', name: 'PLE UNEB Examination Index', description: 'Primary Leaving Examination registration and mock exam analysis.', status: 'RECONSTRUCTED' }
    ]
  },
  {
    id: 'EDU-PORTAL-BURSAR',
    productId: 'JUMO-SCHOOL-ERP',
    portalName: 'Bursar Office & Treasury Portal',
    category: 'Institutional Finance',
    description: 'Student fees ledgers, itemized tuition invoices, SchoolPay PRN tracking, Vote Book spending & FAAP cashbook.',
    iconName: 'Calculator',
    route: '/education/bursar',
    authorizedRoles: ['ROLE_BURSAR', 'ROLE_SCHOOL_ACCOUNTANT', 'ROLE_SCHOOL_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-EDU-BUR-01', name: 'Student Fees Ledger & PRN Tracking', description: 'Real-time tuition fee tracking with instant payment receipting.', status: 'PRESERVED' },
      { id: 'CAP-EDU-BUR-02', name: 'Invoice Tracking & Term Billing', description: 'Automated termly invoice dispatch and overdue fees aging.', status: 'ENHANCED' },
      { id: 'CAP-EDU-BUR-03', name: 'Budget Monitoring & Variance', description: 'Departmental budget allocations and encumbrance tracking.', status: 'ENHANCED' }
    ]
  },
  {
    id: 'EDU-PORTAL-REGISTRAR',
    productId: 'JUMO-SCHOOL-ERP',
    portalName: 'Academic Registrar Office Portal',
    category: 'Secondary School Tier',
    description: 'Student admissions, National LIN registry, transfer clearance certificates, cumulative academic archives.',
    iconName: 'UserCheck',
    route: '/education/registrar',
    authorizedRoles: ['ROLE_REGISTRAR', 'ROLE_SCHOOL_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-EDU-REG-01', name: 'Learner Identification Number (LIN) Registry', description: 'Centralized Ministry of Education LIN profile management.', status: 'PRESERVED' }
    ]
  },
  {
    id: 'EDU-PORTAL-HEAD',
    productId: 'JUMO-SCHOOL-ERP',
    portalName: 'Head Teacher & Governance Portal',
    category: 'Secondary School Tier',
    description: 'St. Lawrence Academy benchmark model, institutional KPI dashboard, staff workload audit & Board of Governors minutes.',
    iconName: 'Award',
    route: '/education/headteacher',
    authorizedRoles: ['ROLE_HEAD_TEACHER', 'ROLE_SCHOOL_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-EDU-HT-01', name: 'Executive Institutional Governance', description: 'Overall school performance, ministry compliance, and staff load audit.', status: 'PRESERVED' }
    ]
  },
  {
    id: 'EDU-PORTAL-DOS',
    productId: 'JUMO-SCHOOL-ERP',
    portalName: 'Academic DOS Office Portal',
    category: 'Secondary School Tier',
    description: 'Director of Studies office, O-Level & A-Level subject combinations, NCDC Competency Curriculum, UNEB center status.',
    iconName: 'BookOpen',
    route: '/education/dos',
    authorizedRoles: ['ROLE_DOS', 'ROLE_HEAD_TEACHER', 'ROLE_SCHOOL_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-EDU-DOS-01', name: 'O/A Level Subject Combination Engine', description: 'Curriculum combination assignment for S.1-S.6 students.', status: 'PRESERVED' },
      { id: 'CAP-EDU-DOS-02', name: 'UNEB Candidate Index Matrix', description: 'UCE and UACE candidate registration and exam center management.', status: 'ENHANCED' }
    ]
  },
  {
    id: 'EDU-PORTAL-BOARDING',
    productId: 'JUMO-SCHOOL-ERP',
    portalName: 'Boarding & Hostel Management Portal',
    category: 'Secondary School Tier',
    description: 'Dormitory house roll calls, bed allocations, hostel capacity maps & student exeat permission workflow.',
    iconName: 'Building',
    route: '/education/boarding',
    authorizedRoles: ['ROLE_WARDEN', 'ROLE_MATRON', 'ROLE_SCHOOL_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-EDU-BRD-01', name: 'Dormitory Allocation & Exeat Logs', description: 'Real-time bed assignment and digital exeat pass issuance.', status: 'RECONSTRUCTED' }
    ]
  },
  {
    id: 'EDU-PORTAL-LABS',
    productId: 'JUMO-SCHOOL-ERP',
    portalName: 'Science & ICT Laboratories Portal',
    category: 'Secondary School Tier',
    description: 'Physics/Chemistry/Biology apparatus stock, reagent MSDS tracking & 85-terminal ICT lab booking.',
    iconName: 'Cpu',
    route: '/education/labs',
    authorizedRoles: ['ROLE_LAB_MASTER', 'ROLE_ICT_ADMIN', 'ROLE_SCHOOL_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-EDU-LAB-01', name: 'Apparatus & Reagent Inventory', description: 'Laboratory equipment tracking and safety compliance.', status: 'RECONSTRUCTED' }
    ]
  },
  {
    id: 'EDU-PORTAL-LIBRARY',
    productId: 'JUMO-SCHOOL-ERP',
    portalName: 'Library & Learning Center Portal',
    category: 'Secondary School Tier',
    description: '12,400 volume ISBN catalogue, barcode scanner check-out, overdue book fines & e-resource portal.',
    iconName: 'BookOpen',
    route: '/education/library',
    authorizedRoles: ['ROLE_LIBRARIAN', 'ROLE_SCHOOL_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-EDU-LIB-01', name: 'ISBN Book Circulation & Loans', description: 'Automated lending, due date alerts, and missing volume tracking.', status: 'RECONSTRUCTED' }
    ]
  },
  {
    id: 'EDU-PORTAL-DISCIPLINE',
    productId: 'JUMO-SCHOOL-ERP',
    portalName: 'Discipline, Prefects & Student Welfare Portal',
    category: 'Secondary School Tier',
    description: 'Disciplinary committee hearing logs, prefects council roster, guidance counseling sessions & welfare tracking.',
    iconName: 'ShieldAlert',
    route: '/education/discipline',
    authorizedRoles: ['ROLE_DISCIPLINE_MASTER', 'ROLE_COUNSELOR', 'ROLE_SCHOOL_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-EDU-DISC-01', name: 'Disciplinary Case Hearing Registry', description: 'Record student infractions, sanctions, and parent notification letters.', status: 'RECONSTRUCTED' }
    ]
  },
  {
    id: 'EDU-PORTAL-CONTROL',
    productId: 'JUMO-SCHOOL-ERP',
    portalName: 'School Control Center Portal',
    category: 'Administration',
    description: 'School configuration, term dates, fee structures, role permissions & system health monitoring.',
    iconName: 'Settings',
    route: '/education/control',
    authorizedRoles: ['ROLE_SCHOOL_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-EDU-CTRL-01', name: 'Institutional Parameter Config', description: 'Academic calendar, class streams, and grading scale parameters.', status: 'PRESERVED' }
    ]
  },
  {
    id: 'EDU-DEV-HUB',
    productId: 'JUMO-SCHOOL-ERP',
    portalName: 'Education Developer Hub Portal',
    category: 'Developer & API',
    description: 'API keys, webhooks for Ministry data export, integration logs & sandbox test console.',
    iconName: 'Server',
    route: '/education/developer',
    authorizedRoles: ['ROLE_DEVELOPER', 'ROLE_SCHOOL_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-EDU-DEV-01', name: 'Ministry Sync REST API Gateway', description: 'Secure API endpoints for exporting census and exam data to Ministry servers.', status: 'PRESERVED' }
    ]
  }
];

export const CHURCH_PORTALS: ModulePortalManifest[] = [
  {
    id: 'CH-PORTAL-BISHOP',
    productId: 'JUMO-CHURCH-ERP',
    portalName: 'Episcopal Chancery & Bishop Portal',
    category: 'Diocesan Chancery',
    description: 'Diocesan Synod decrees, Archdeaconry quota assessment, clergy postings, bishop mandates & Chancery finance.',
    iconName: 'Award',
    route: '/church/diocese',
    authorizedRoles: ['ROLE_BISHOP', 'ROLE_CHANCELLOR', 'ROLE_CHURCH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-CH-BISH-01', name: 'Diocesan Synod Decrees & Quota Assessment', description: 'Archdeaconry quota assessment and official bishop decree management.', status: 'RECONSTRUCTED' }
    ]
  },
  {
    id: 'CH-PORTAL-PARISH',
    productId: 'JUMO-CHURCH-ERP',
    portalName: 'Parish Priest & Vicar Office Portal',
    category: 'Parish Administration',
    description: 'Sunday & midweek liturgical service rosters, communicants roll, parish family directory & sub-parish curate supervision.',
    iconName: 'Compass',
    route: '/church/parish',
    authorizedRoles: ['ROLE_PARISH_PRIEST', 'ROLE_VICAR', 'ROLE_CHURCH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-CH-PAR-01', name: 'Liturgy Roster & Communicants Roll', description: 'Manage parish family members and liturgical service assignments.', status: 'RECONSTRUCTED' }
    ]
  },
  {
    id: 'CH-PORTAL-SACRAMENTS',
    productId: 'JUMO-CHURCH-ERP',
    portalName: 'Sacramental Registrar Portal',
    category: 'Canonical Registers',
    description: 'Canonical Holy Baptism, Episcopal Confirmation, Holy Matrimony, and Burial registers with cryptographic certificate QR codes.',
    iconName: 'FileCheck',
    route: '/church/sacraments',
    authorizedRoles: ['ROLE_SACRAMENTAL_OFFICER', 'ROLE_PARISH_PRIEST', 'ROLE_CHURCH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-CH-SAC-01', name: 'Canonical Sacramental Registers', description: 'Immutable digital record keeping for Baptism, Confirmation, and Marriage.', status: 'RECONSTRUCTED' }
    ]
  },
  {
    id: 'CH-PORTAL-FINANCE',
    productId: 'JUMO-CHURCH-ERP',
    portalName: 'Church Finance & Tithes Portal',
    category: 'Stewardship & Treasury',
    description: 'Member tithe remittance ledger, Sunday offertory collections, harvest thanksgiving pledges & FAAP General Ledger sync.',
    iconName: 'Calculator',
    route: '/church/tithes',
    authorizedRoles: ['ROLE_CHURCH_TREASURER', 'ROLE_PARISH_PRIEST', 'ROLE_CHURCH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-CH-FIN-01', name: 'Tithe Ledger & Diocesan Quota Remittance', description: 'Itemized member tithe tracking and automatic quota remittance calculation.', status: 'RECONSTRUCTED' }
    ]
  },
  {
    id: 'CH-PORTAL-PROJECTS',
    productId: 'JUMO-CHURCH-ERP',
    portalName: 'Capital Works & Building Projects Portal',
    category: 'Capital Projects',
    description: 'Cathedral & parish expansion budgets, solar borehole projects, contractor payment vouchers & fundraising progress.',
    iconName: 'Building',
    route: '/church/projects',
    authorizedRoles: ['ROLE_PROJECTS_DIRECTOR', 'ROLE_CHURCH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-CH-PRJ-01', name: 'Church Building Works Procurement', description: 'Capital project budget tracking and contractor voucher approvals.', status: 'RECONSTRUCTED' }
    ]
  },
  {
    id: 'CH-PORTAL-CONTROL',
    productId: 'JUMO-CHURCH-ERP',
    portalName: 'Church Control Center Portal',
    category: 'Administration',
    description: 'Church configuration, archdeaconry settings, role permissions & system telemetry.',
    iconName: 'Settings',
    route: '/church/control',
    authorizedRoles: ['ROLE_CHURCH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-CH-CTRL-01', name: 'Diocesan Jurisdiction Settings', description: 'Configure parish boundaries, archdeaconries, and user security roles.', status: 'PRESERVED' }
    ]
  },
  {
    id: 'CH-DEV-HUB',
    productId: 'JUMO-CHURCH-ERP',
    portalName: 'Church Developer Hub Portal',
    category: 'Developer & API',
    description: 'API keys, sacramental verification QR code API, SMS/WhatsApp pastoral broadcast gateway.',
    iconName: 'Cpu',
    route: '/church/developer',
    authorizedRoles: ['ROLE_DEVELOPER', 'ROLE_CHURCH_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-CH-DEV-01', name: 'Sacramental QR Verification API', description: 'Public API endpoint for validating authenticity of baptism and marriage certificates.', status: 'PRESERVED' }
    ]
  }
];

export const ALUMNI_PORTALS: ModulePortalManifest[] = [
  {
    id: 'ALUM-PORTAL-CENSUS',
    productId: 'JUMO-ALUMNI-ERP',
    portalName: 'Graduate Census Directory Portal',
    category: 'Alumni Census',
    description: 'Verified alumni census registry, graduation cohort archives, transcript clearance & digital alumnus identity cards.',
    iconName: 'Users',
    route: '/alumni/census',
    authorizedRoles: ['ROLE_ALUM_REGISTRAR', 'ROLE_ALUM_DIRECTOR', 'ROLE_ALUMNI_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-ALU-CEN-01', name: 'Verified Graduate Directory & Digital ID', description: 'Graduate verification and digital alumnus pass generation.', status: 'PRESERVED' }
    ]
  },
  {
    id: 'ALUM-PORTAL-GIVING',
    productId: 'JUMO-ALUMNI-ERP',
    portalName: 'Endowment & Giving Campaign Portal',
    category: 'Advancement & Giving',
    description: 'Capital building campaign pledges, student scholarship endowment funds, Digital Pay card/MoMo donation checkout.',
    iconName: 'HeartHandshake',
    route: '/alumni/giving',
    authorizedRoles: ['ROLE_ALUM_GIVER', 'ROLE_ALUM_DIRECTOR', 'ROLE_ALUMNI_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-ALU-GIV-01', name: 'Endowment Fund & Digital Donation Checkout', description: 'Capital pledge tracking with integrated Digital Pay donation switch.', status: 'PRESERVED' }
    ]
  },
  {
    id: 'ALUM-PORTAL-CAREERS',
    productId: 'JUMO-ALUMNI-ERP',
    portalName: 'Career & Mentorship Network Portal',
    category: 'Networking & Careers',
    description: 'Student-alumni mentorship matchmaking, job opportunity board, industry networking circles & career guidance.',
    iconName: 'Briefcase',
    route: '/alumni/careers',
    authorizedRoles: ['ROLE_ALUM_MEMBER', 'ROLE_ALUM_DIRECTOR', 'ROLE_ALUMNI_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-ALU-CAR-01', name: 'Alumni Mentorship & Job Matching Engine', description: 'Match student mentees with experienced alumni mentors based on career field.', status: 'PRESERVED' }
    ]
  },
  {
    id: 'ALUM-PORTAL-CHAPTERS',
    productId: 'JUMO-ALUMNI-ERP',
    portalName: 'Regional Chapters & AGM Portal',
    category: 'Chapter Engagement',
    description: 'Domestic & international chapter rosters, local executive leadership, alumni reunion registration & AGM voting.',
    iconName: 'Globe',
    route: '/alumni/chapters',
    authorizedRoles: ['ROLE_CHAPTER_LEAD', 'ROLE_ALUM_DIRECTOR', 'ROLE_ALUMNI_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-ALU-CHP-01', name: 'Global Alumni Chapter Management', description: 'Regional chapter coordination, event tickets, and annual voting.', status: 'PRESERVED' }
    ]
  },
  {
    id: 'ALUM-DEV-HUB',
    productId: 'JUMO-ALUMNI-ERP',
    portalName: 'Alumni Developer Hub Portal',
    category: 'Developer & API',
    description: 'API keys, graduate verification API, integration logs & sandbox test console.',
    iconName: 'Cpu',
    route: '/alumni/developer',
    authorizedRoles: ['ROLE_DEVELOPER', 'ROLE_ALUMNI_ADMIN'],
    verificationStatus: 'VERIFIED',
    capabilities: [
      { id: 'CAP-ALU-DEV-01', name: 'Alumni Verification REST API Gateway', description: 'Employer portal endpoint for instant degree/alumnus verification.', status: 'PRESERVED' }
    ]
  }
];

export const ALL_MODULE_PORTALS: ModulePortalManifest[] = [
  ...FINTECH_PORTALS,
  ...SCHOOL_PORTALS,
  ...CHURCH_PORTALS,
  ...ALUMNI_PORTALS
];

export function getPortalsForProduct(productId: string): ModulePortalManifest[] {
  return ALL_MODULE_PORTALS.filter(p => p.productId === productId);
}

export function getPortalByRoute(route: string): ModulePortalManifest | undefined {
  return ALL_MODULE_PORTALS.find(p => p.route === route);
}

export function getPortalById(id: string): ModulePortalManifest | undefined {
  return ALL_MODULE_PORTALS.find(p => p.id === id);
}
