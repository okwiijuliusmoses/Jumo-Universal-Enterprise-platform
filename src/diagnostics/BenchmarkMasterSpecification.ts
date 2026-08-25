
export type BenchmarkSource = 'QuickBooks' | 'SchoolPay';
export type JumoStatus = 'VERIFIED' | 'DERIVED' | 'UNVERIFIED' | 'MISSING' | 'PARTIAL' | 'IMPLEMENTED' | 'VERIFIED_IMPLEMENTED';

export interface UIReconstructionModel {
  navigationPath?: string;
  screenType?: string;
  parentScreen?: string;
  childScreens?: string[];
  navigationActions?: string[];
  toolbarActions?: string[];
  primaryActions?: string[];
  secondaryActions?: string[];
  tableColumns?: string[];
  filters?: string[];
  searchBehavior?: string;
  formSections?: string[];
  fieldDefinitions?: string[];
  fieldDependencies?: string[];
  dialogs?: string[];
  drawers?: string[];
  tabs?: string[];
  cards?: string[];
  charts?: string[];
  statusStates?: string[];
  emptyStates?: string[];
  loadingStates?: string[];
  errorStates?: string[];
  responsiveBehavior?: string;
  accessibilityRequirements?: string[];
  userInteractionFlow?: string;
  
  // Benchmark actions
  supportedOperations?: ('create' | 'view' | 'edit' | 'delete' | 'approve' | 'reject' | 'submit' | 'cancel' | 'print' | 'export' | 'import' | 'duplicate' | 'archive' | 'restore' | 'reconcile' | 'reverse' | 'refund' | 'allocate')[];
}

export interface BenchmarkEntry {
  id: string;
  benchmark: BenchmarkSource;
  category: string;
  product: string; // Jumo Target Product
  portal: string;
  office: string;
  module: string;
  submodule: string;
  capability: string;
  businessPurpose: string;
  userRoles: string[];
  permissions: string[];
  workflow: string;
  forms: string[];
  importantFields: string[];
  entities: string[];
  transactions: string[];
  validation: string[];
  approvals: string[];
  reports: string[];
  integrations: string[];
  uiRequirements: string[];
  jumoTargetProduct: string;
  jumoTargetOffice: string;
  jumoTargetModule: string;
  status: JumoStatus;
  evidenceSource: string;
  verificationStatus: 'VERIFIED' | 'DERIVED' | 'UNVERIFIED';
  
  // UI Reconstruction Fields
  uiModel?: UIReconstructionModel;
}

export const BenchmarkMasterSpecification: BenchmarkEntry[] = [
  // ==========================================
  // QUICKBOOKS - CHART OF ACCOUNTS
  // ==========================================
  {
    id: 'QB-GL-001',
    benchmark: 'QuickBooks',
    category: 'Accounting',
    product: 'FAAP',
    portal: 'Ledger',
    office: 'Treasury',
    module: 'General Ledger',
    submodule: 'Chart of Accounts',
    capability: 'Account List and Hierarchy Management',
    businessPurpose: 'Categorize financial transactions across assets, liabilities, equity, revenue, and expenses.',
    userRoles: ['Master Admin', 'Company Admin', 'Standard User with Accounting Access'], // QB roles
    permissions: ['Chart of Accounts - View/Create/Edit/Delete'],
    workflow: 'COA_Management_Flow',
    forms: ['Account Creation Dialog', 'Account Edit Dialog'],
    importantFields: ['Account Type', 'Detail Type', 'Name', 'Number', 'Description', 'Sub-account of', 'Balance'],
    entities: ['Account'],
    transactions: ['Create Account', 'Edit Account', 'Make Inactive'],
    validation: ['Account name must be unique', 'Account number must be unique', 'Cannot delete account with non-zero balance', 'Cannot change type of accounts with transactions (limited)'],
    approvals: ['None standard, relies on audit log'],
    reports: ['Account List', 'Chart of Accounts Report'],
    integrations: ['Bank Feeds (for matching)'],
    uiRequirements: ['Data Table', 'Action Dropdown', 'Modal Dialog', 'Hierarchical Indentation'],
    jumoTargetProduct: 'FAAP',
    jumoTargetOffice: 'Treasury',
    jumoTargetModule: 'Chart of Accounts Registry',
    status: 'IMPLEMENTED',
    evidenceSource: 'QuickBooks Online Advanced Documentation / Product UI',
    verificationStatus: 'VERIFIED',
    uiModel: {
      navigationPath: 'Accounting -> Chart of accounts',
      screenType: 'List View',
      navigationActions: ['See your Chart of Accounts'],
      toolbarActions: ['Run report', 'New'],
      primaryActions: ['New', 'View register', 'Run report'],
      secondaryActions: ['Edit', 'Make inactive'],
      tableColumns: ['NAME', 'TYPE', 'DETAIL TYPE', 'QUICKBOOKS BALANCE', 'BANK BALANCE', 'ACTION'],
      filters: ['Account Type filter'],
      searchBehavior: 'Filter by Name or Number',
      formSections: ['Account Details', 'Starting Balance'],
      fieldDefinitions: ['Account Type (Dropdown)', 'Detail Type (Dropdown)', 'Name (Text)', 'Number (Text)', 'Description (Text)', 'Is sub-account (Checkbox)', 'Parent Account (Dropdown)'],
      dialogs: ['New Account Modal', 'Edit Account Modal'],
      tabs: [],
      cards: [],
      statusStates: ['Active', 'Inactive', 'Deleted'],
      emptyStates: ['No accounts found for current filter'],
      supportedOperations: ['create', 'view', 'edit', 'delete', 'export', 'print']
    }
  },
  // ==========================================
  // QUICKBOOKS - JOURNAL ENTRIES
  // ==========================================
  {
    id: 'QB-GL-002',
    benchmark: 'QuickBooks',
    category: 'Accounting',
    product: 'FAAP',
    portal: 'Ledger',
    office: 'Treasury',
    module: 'General Ledger',
    submodule: 'Journal Entries',
    capability: 'Double-Entry Journal Posting',
    businessPurpose: 'Manually adjust balances, transfer money between accounts, or record depreciation/accruals.',
    userRoles: ['Master Admin', 'Accountant'],
    permissions: ['Journal Entries - Create/Edit/Delete'],
    workflow: 'Journal_Entry_Flow',
    forms: ['Journal Entry Form'],
    importantFields: ['Journal date', 'Journal no.', 'Account', 'Debits', 'Credits', 'Description', 'Name (Entity)', 'Location', 'Class'],
    entities: ['JournalEntry', 'JournalLine'],
    transactions: ['Post Journal Entry', 'Reverse Journal Entry'],
    validation: ['Total Debits must equal Total Credits ($0.00 offset)', 'Cannot post to restricted system accounts (e.g. Accounts Receivable without Customer)'],
    approvals: ['None standard'],
    reports: ['Journal', 'General Ledger', 'Trial Balance'],
    integrations: ['Internal'],
    uiRequirements: ['Line Item Grid', 'Debit/Credit Parity Footer', 'Date Picker'],
    jumoTargetProduct: 'FAAP',
    jumoTargetOffice: 'Treasury',
    jumoTargetModule: 'General Ledger Engine',
    status: 'IMPLEMENTED',
    evidenceSource: 'QuickBooks Online Advanced Documentation / Product UI',
    verificationStatus: 'VERIFIED',
    uiModel: {
      navigationPath: '+ New -> Journal entry',
      screenType: 'Transaction Form',
      primaryActions: ['Save and close', 'Save and new'],
      secondaryActions: ['Clear', 'Reverse', 'Make recurring', 'Delete'],
      tableColumns: ['ACCOUNT', 'DEBITS', 'CREDITS', 'DESCRIPTION', 'NAME'],
      formSections: ['Header (Date, Journal No.)', 'Line Items (Grid)', 'Footer (Memo, Attachments, Totals)'],
      fieldDefinitions: ['Journal Date (Date)', 'Journal No (Text)', 'Account (Dropdown with search)', 'Debit (Currency)', 'Credit (Currency)', 'Description (Text)', 'Name (Dropdown)'],
      fieldDependencies: ['If AR/AP account selected, Name (Customer/Vendor) becomes required'],
      statusStates: ['Draft', 'Posted', 'Reversed'],
      userInteractionFlow: 'User selects date -> Enters lines -> Must balance debits and credits -> Save',
      supportedOperations: ['create', 'view', 'edit', 'delete', 'reverse', 'duplicate']
    }
  },
  // ==========================================
  // QUICKBOOKS - INVOICES
  // ==========================================
  {
    id: 'QB-SALES-001',
    benchmark: 'QuickBooks',
    category: 'Sales',
    product: 'FAAP',
    portal: 'Sales',
    office: 'Accounts Receivable',
    module: 'Invoices',
    submodule: 'Creation',
    capability: 'Customer Invoicing',
    businessPurpose: 'Bill customers for goods/services and recognize revenue.',
    userRoles: ['Master Admin', 'Standard User (Sales access)'],
    permissions: ['Invoices - View/Create/Edit/Delete'],
    workflow: 'Invoice_Lifecycle',
    forms: ['Invoice Form'],
    importantFields: ['Customer', 'Customer email', 'Billing address', 'Terms', 'Invoice date', 'Due date', 'Product/Service', 'QTY', 'Rate', 'Amount', 'Tax'],
    entities: ['Invoice', 'InvoiceLine', 'Customer', 'Item'],
    transactions: ['Create Invoice', 'Send Invoice', 'Void Invoice'],
    validation: ['Customer must be selected', 'At least one line item required', 'Amount must be >= 0'],
    approvals: ['Invoice Approval Workflow (Advanced tier)'],
    reports: ['A/R Aging Detail', 'Open Invoices', 'Sales by Customer'],
    integrations: ['QuickBooks Payments', 'Sales Tax Engine'],
    uiRequirements: ['Customer Select Header', 'Line Item Grid', 'Totals Footer', 'Send/Print Dropdown'],
    jumoTargetProduct: 'FAAP',
    jumoTargetOffice: 'Accounts Receivable',
    jumoTargetModule: 'Invoicing Engine',
    status: 'MISSING',
    evidenceSource: 'QuickBooks Online Product UI',
    verificationStatus: 'VERIFIED',
    uiModel: {
      navigationPath: 'Sales -> Invoices -> Create invoice',
      screenType: 'Transaction Form',
      primaryActions: ['Save and send', 'Save and close'],
      secondaryActions: ['Save and share link', 'Print or Preview', 'Void', 'Delete', 'Receive payment'],
      tableColumns: ['PRODUCT/SERVICE', 'DESCRIPTION', 'QTY', 'RATE', 'AMOUNT', 'TAX'],
      formSections: ['Customer Info', 'Invoice Details', 'Line Items', 'Message', 'Totals'],
      fieldDefinitions: ['Customer (Dropdown)', 'Email (Text)', 'Terms (Dropdown)', 'Invoice Date (Date)', 'Due Date (Date)'],
      statusStates: ['Needs Attention', 'Unpaid', 'Paid', 'Overdue', 'Voided'],
      userInteractionFlow: 'Select customer -> Auto-fill terms/email -> Add products -> Calculate Tax/Totals -> Send',
      supportedOperations: ['create', 'view', 'edit', 'delete', 'approve', 'reject', 'submit', 'print', 'export', 'duplicate']
    }
  },
  // ==========================================
  // QUICKBOOKS - RECEIVE PAYMENTS
  // ==========================================
  {
    id: 'QB-SALES-002',
    benchmark: 'QuickBooks',
    category: 'Sales',
    product: 'FAAP',
    portal: 'Sales',
    office: 'Accounts Receivable',
    module: 'Payments',
    submodule: 'Receive Payment',
    capability: 'Receive Customer Payments',
    businessPurpose: 'Record payments against open invoices and reduce accounts receivable.',
    userRoles: ['Master Admin', 'Standard User (Sales)'],
    permissions: ['Receive Payments - View/Create/Edit/Delete'],
    workflow: 'Payment_Allocation_Flow',
    forms: ['Receive Payment Form'],
    importantFields: ['Customer', 'Payment date', 'Payment method', 'Reference no.', 'Deposit to', 'Amount received', 'Outstanding Transactions Grid'],
    entities: ['Payment', 'InvoiceAllocation'],
    transactions: ['Receive Payment', 'Allocate Payment to Invoice(s)'],
    validation: ['Amount received cannot be negative', 'Cannot allocate more than invoice open balance'],
    approvals: ['None standard'],
    reports: ['Payment Method List', 'Invoices and Received Payments'],
    integrations: ['Undeposited Funds / Bank Accounts'],
    uiRequirements: ['Open Invoices Grid with Checkboxes', 'Amount Allocation Inputs'],
    jumoTargetProduct: 'FAAP',
    jumoTargetOffice: 'Accounts Receivable',
    jumoTargetModule: 'Collections Engine',
    status: 'MISSING',
    evidenceSource: 'QuickBooks Online Product UI',
    verificationStatus: 'VERIFIED',
    uiModel: {
      navigationPath: '+ New -> Receive Payment',
      screenType: 'Transaction Form',
      primaryActions: ['Save and new', 'Save and close'],
      secondaryActions: ['Clear', 'Delete'],
      tableColumns: ['DESCRIPTION', 'DUE DATE', 'ORIGINAL AMOUNT', 'OPEN BALANCE', 'PAYMENT'],
      formSections: ['Payment Header', 'Outstanding Transactions Allocation'],
      fieldDefinitions: ['Customer (Dropdown)', 'Payment Date (Date)', 'Payment Method (Dropdown)', 'Deposit to (Account Dropdown)', 'Amount received (Currency)'],
      fieldDependencies: ['Selecting customer loads their open invoices in the grid below', 'Entering Amount received auto-allocates to oldest invoices if auto-apply is on'],
      statusStates: ['Unapplied', 'Partially Applied', 'Closed'],
      supportedOperations: ['create', 'view', 'edit', 'delete', 'allocate']
    }
  },
  // ==========================================
  // QUICKBOOKS - BANK RECONCILIATION
  // ==========================================
  {
    id: 'QB-BANK-001',
    benchmark: 'QuickBooks',
    category: 'Banking',
    product: 'FAAP',
    portal: 'Banking',
    office: 'Treasury',
    module: 'Reconciliation',
    submodule: 'Bank Reconcile',
    capability: 'Bank Reconciliation Workspace',
    businessPurpose: 'Match QuickBooks transactions with bank statement to ensure ledger accuracy.',
    userRoles: ['Master Admin', 'Accountant'],
    permissions: ['Reconcile - Create/Edit'],
    workflow: 'Reconciliation_Flow',
    forms: ['Reconciliation Start Form', 'Reconciliation Workspace'],
    importantFields: ['Account', 'Ending balance', 'Ending date', 'Cleared Balance', 'Difference'],
    entities: ['Reconciliation', 'BankStatement', 'Transaction'],
    transactions: ['Clear Transaction', 'Finish Reconciliation', 'Undo Reconciliation'],
    validation: ['Difference must be 0.00 to finish reconciliation'],
    approvals: ['None standard'],
    reports: ['Reconciliation Report'],
    integrations: ['Bank Feeds'],
    uiRequirements: ['Split Grid (Payments vs Deposits)', 'Floating Summary Bar (Difference: $0.00)'],
    jumoTargetProduct: 'FAAP',
    jumoTargetOffice: 'Treasury',
    jumoTargetModule: 'Cash & Bank Management',
    status: 'MISSING',
    evidenceSource: 'QuickBooks Online Product UI',
    verificationStatus: 'VERIFIED',
    uiModel: {
      navigationPath: 'Accounting -> Reconcile',
      screenType: 'Workspace Wizard',
      primaryActions: ['Start reconciling', 'Finish now'],
      secondaryActions: ['Save for later', 'Close', 'Edit info'],
      tableColumns: ['DATE', 'TYPE', 'REF NO.', 'PAYEE', 'MEMO', 'PAYMENT', 'DEPOSIT', 'CLEARED'],
      filters: ['Statement ending date filter', 'Cleared status filter'],
      formSections: ['Statement Info Dialog', 'Reconciliation Grid', 'Summary Header'],
      statusStates: ['In Progress', 'Reconciled'],
      errorStates: ['Difference is not zero (warning before finishing)'],
      userInteractionFlow: 'Enter statement balance/date -> Workspace loads uncleared txns -> User checks off txns until Difference is 0 -> Finish',
      supportedOperations: ['create', 'view', 'edit', 'reconcile']
    }
  },
  
  // ==========================================
  // SCHOOLPAY - PARENT PORTAL - DASHBOARD
  // ==========================================
  {
    id: 'SP-PAR-001',
    benchmark: 'SchoolPay',
    category: 'Parent Portal',
    product: 'Primary ERP',
    portal: 'Parent Portal',
    office: 'Parent Gateway',
    module: 'Dashboard',
    submodule: 'Overview',
    capability: 'Parent Multi-Student Dashboard',
    businessPurpose: 'Provide parents a unified view of all their children\'s fee balances, schools, and payment history.',
    userRoles: ['Parent/Guardian'],
    permissions: ['View Own Children Data'],
    workflow: 'Parent_Login_Flow',
    forms: [],
    importantFields: ['Total Outstanding Balance', 'List of Linked Students', 'Payment Codes'],
    entities: ['Guardian', 'StudentLink', 'FeeAccount'],
    transactions: [],
    validation: [],
    approvals: [],
    reports: ['Parent Statement'],
    integrations: ['SchoolPay Core Accounts'],
    uiRequirements: ['Student Cards', 'Aggregate Balance Header', 'Quick Pay Button'],
    jumoTargetProduct: 'Primary ERP',
    jumoTargetOffice: 'Parent Gateway',
    jumoTargetModule: 'Guardian Workspace',
    status: 'MISSING',
    evidenceSource: 'SchoolPay Parent Web Portal',
    verificationStatus: 'VERIFIED',
    uiModel: {
      navigationPath: 'Dashboard',
      screenType: 'Dashboard',
      primaryActions: ['Pay Fees'],
      secondaryActions: ['Add Student', 'View Statement'],
      cards: ['Student Card (Name, School, Class, Payment Code, Balance)'],
      tabs: ['Overview', 'Payment History', 'Notifications'],
      statusStates: ['Balance Cleared', 'Balance Pending'],
      emptyStates: ['No students linked to this account'],
      userInteractionFlow: 'Login -> View Cards -> Click Pay Fees on a specific student -> Routes to Checkout',
      supportedOperations: ['view']
    }
  },
  // ==========================================
  // SCHOOLPAY - WEB CHECKOUT
  // ==========================================
  {
    id: 'SP-PYM-001',
    benchmark: 'SchoolPay',
    category: 'Payments',
    product: 'Digital Pay',
    portal: 'Checkout',
    office: 'Payment Switch',
    module: 'Web Payments',
    submodule: 'Checkout Flow',
    capability: 'Student Payment Initiation',
    businessPurpose: 'Enable online payment of school fees using Mobile Money or Card via Payment Code.',
    userRoles: ['Parent/Guardian', 'Public User'],
    permissions: ['Initiate Payment'],
    workflow: 'SchoolPay_Checkout_Flow',
    forms: ['Student Lookup Form', 'Payment Method Form'],
    importantFields: ['Payment Code', 'Amount', 'Payment Channel (MTN/Airtel/Visa)', 'Phone Number / Card Details'],
    entities: ['PaymentTransaction', 'StudentFeeAccount'],
    transactions: ['Lookup Student', 'Initiate MoMo Push', 'Confirm Payment'],
    validation: ['Payment Code must exist', 'Amount must be > 0', 'Phone number must be valid format'],
    approvals: ['None'],
    reports: ['Transaction Receipt'],
    integrations: ['Telco API (MTN/Airtel)', 'Card Gateway'],
    uiRequirements: ['Multi-step Wizard', 'Student Detail Confirmation Card', 'Channel Selectors', 'Status Poller'],
    jumoTargetProduct: 'Digital Pay',
    jumoTargetOffice: 'Payment Gateway',
    jumoTargetModule: 'Checkout Engine',
    status: 'MISSING',
    evidenceSource: 'SchoolPay Web Checkout',
    verificationStatus: 'VERIFIED',
    uiModel: {
      navigationPath: 'Pay Fees',
      screenType: 'Wizard Form',
      primaryActions: ['Continue', 'Proceed to Pay', 'Confirm'],
      secondaryActions: ['Cancel', 'Back'],
      formSections: ['Step 1: Enter Payment Code', 'Step 2: Confirm Student & Enter Amount', 'Step 3: Select Payment Method', 'Step 4: Authorize Payment'],
      fieldDefinitions: ['Payment Code (Text)', 'Amount (Currency)', 'Payment Channel (Radio/Cards)', 'Mobile Number (Phone)'],
      statusStates: ['Pending Mobile Approval', 'Successful', 'Failed', 'Timeout'],
      errorStates: ['Invalid Payment Code', 'Insufficient Funds', 'User Cancelled'],
      userInteractionFlow: 'Enter code -> Verify student name/school appears -> Enter amount -> Choose MTN MoMo -> Enter Phone -> Click Pay -> Wait for USSD prompt on phone -> Success screen with Receipt',
      supportedOperations: ['create', 'view', 'submit']
    }
  },
  // ==========================================
  // SCHOOLPAY - BURSAR - FEE COLLECTIONS
  // ==========================================
  {
    id: 'SP-FIN-001',
    benchmark: 'SchoolPay',
    category: 'School Administration',
    product: 'Primary ERP',
    portal: 'Bursar',
    office: 'Bursar Office',
    module: 'Fee Management',
    submodule: 'Collections',
    capability: 'Real-time Payment Monitoring & Receipting',
    businessPurpose: 'Bursar monitors incoming SchoolPay transactions and reconciles them against student fee accounts.',
    userRoles: ['Bursar', 'Headteacher'],
    permissions: ['View Collections', 'Print Receipts'],
    workflow: 'Payment_Reconciliation_Flow',
    forms: [],
    importantFields: ['Date', 'Student Name', 'Class', 'Amount Paid', 'Channel', 'Receipt No.', 'Transaction Status'],
    entities: ['PaymentTransaction', 'Receipt'],
    transactions: ['View Transaction', 'Print Receipt', 'Download Statement'],
    validation: [],
    approvals: [],
    reports: ['Daily Collections Report', 'Termly Collections Summary'],
    integrations: ['SchoolPay API Callback'],
    uiRequirements: ['Real-time Data Table', 'Filter by Date/Class/Channel', 'Export to Excel'],
    jumoTargetProduct: 'Primary ERP',
    jumoTargetOffice: 'Bursar Office',
    jumoTargetModule: 'Fee Collections',
    status: 'MISSING',
    evidenceSource: 'SchoolPay School Portal Demo/Docs',
    verificationStatus: 'VERIFIED',
    uiModel: {
      navigationPath: 'Finance -> Collections',
      screenType: 'List View',
      toolbarActions: ['Export Data', 'Print Register'],
      primaryActions: ['View Receipt'],
      tableColumns: ['DATE', 'RECEIPT NO', 'STUDENT', 'CLASS', 'PAYMENT CODE', 'AMOUNT', 'CHANNEL', 'STATUS'],
      filters: ['Date Range', 'Class', 'Payment Channel', 'Status'],
      searchBehavior: 'Search by Student Name, Payment Code, or Receipt No.',
      statusStates: ['Successful', 'Reconciled', 'Pending'],
      supportedOperations: ['view', 'print', 'export']
    }
  }
];
