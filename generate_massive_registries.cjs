const fs = require('fs');

const registriesPath = 'src/products/registries.ts';

// We will construct huge arrays for each registry
// Modules
let eduModules = [];
let dpModules = [];
let faapModules = [];
let churchModules = [];

// Education Modules
const eduCategories = [
  'Admissions', 'Student Information System', 'Student/Parent Portal', 'Academic Management', 'Curriculum Management',
  'Courses', 'Subjects', 'Classes', 'Streams', 'Timetables', 'Assessment Management', 'Examination Management',
  'Results Management', 'Transcript Management', 'Graduation', 'Degree Audit', 'E-Learning', 'Digital Training',
  'Digital Conference', 'Library', 'Hostel Management', 'Boys Hostel', 'Girls Hostel', 'Health/Clinic', 'Laboratory',
  'Games', 'Sports', 'Student Welfare', 'Counselling', 'Discipline', 'Transport', 'School Farm', 'Kitchen', 'Meals',
  'Stores', 'Procurement', 'Logistics', 'Estates Management', 'Asset Management', 'Institutional Development',
  'Staff Management', 'Recruitment', 'Payroll', 'Staff SACCO', 'Finance', 'Budget', 'Vote Book', 'Cash Books',
  'Accounts Payable', 'Accounts Receivable', 'General Ledger', 'Grants', 'Donor Management', 'Communications',
  'SMS', 'Email', 'Notifications', 'Data & Information Management', 'Reporting', 'Analytics', 'Governance',
  'Audit', 'Compliance', 'Security', 'Configuration', 'Integration Management'
];
eduCategories.forEach((cat, idx) => {
  eduModules.push({
    id: `MOD_EDU_${cat.toUpperCase().replace(/[^A-Z]/g, '_')}_${idx}`,
    name: cat,
    displayName: cat,
    description: `Universal Education ${cat} Module`,
    productId: 'PROD_EDU'
  });
});

// DP Modules
const dpCategories = [
  'payment intents', 'payment links', 'PRNs', 'collections', 'mobile money', 'cards', 'bank transfers', 'wallet',
  'USSD', 'merchant onboarding', 'KYC', 'routing', 'retries', 'failover', 'fraud', 'settlement', 'split payments',
  'reconciliation', 'refunds', 'disputes', 'chargebacks', 'reporting', 'API management', 'webhooks', 'notifications'
];
dpCategories.forEach((cat, idx) => {
  dpModules.push({
    id: `MOD_DP_${cat.toUpperCase().replace(/[^A-Z]/g, '_')}_${idx}`,
    name: cat,
    displayName: cat.charAt(0).toUpperCase() + cat.slice(1),
    description: `Digital Pay ${cat} Module`,
    productId: 'PROD_DP'
  });
});

// FAAP Modules
const faapCategories = [
  'chart of accounts', 'general ledger', 'journal', 'accounts payable', 'accounts receivable', 'invoicing',
  'bills', 'receipts', 'bank accounts', 'bank feeds', 'reconciliation', 'budgeting', 'budget book', 'vote book',
  'cash book', 'single cash book', 'double cash book', 'triple cash book', 'petty cash', 'treasury', 'fixed assets',
  'depreciation', 'expenses', 'grants', 'restricted funds', 'donor funds', 'projects', 'cost centres', 'dimensions',
  'tax', 'fiscal periods', 'closing', 'consolidation', 'financial statements', 'trial balance', 'audit', 'maker-checker',
  'approval', 'financial analytics', 'forecasting', 'reporting'
];
faapCategories.forEach((cat, idx) => {
  faapModules.push({
    id: `MOD_FAAP_${cat.toUpperCase().replace(/[^A-Z]/g, '_')}_${idx}`,
    name: cat,
    displayName: cat.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    description: `FAAP ${cat} Module`,
    productId: 'PROD_FAAP'
  });
});

// Church Modules
const churchCategories = [
  'church membership', 'clergy', 'parishes', 'dioceses', 'congregations', 'ministries', 'groups', 'volunteers',
  'events', 'calendar', 'worship planning', 'sermons/content', 'youth', 'children', 'missions', 'evangelism',
  'outreach', 'donations', 'tithes', 'offerings', 'pledges', 'fundraising', 'finance', 'budget', 'vote book',
  'cash books', 'expenses', 'procurement', 'inventory', 'assets', 'facilities', 'HR', 'recruitment', 'staff SACCO',
  'communications', 'SMS', 'email', 'media', 'governance', 'audit', 'reports', 'pastoral care', 'member records',
  'sacraments/ordinances', 'conferences', 'training', 'schools/institutional ministries'
];
churchCategories.forEach((cat, idx) => {
  churchModules.push({
    id: `MOD_CH_${cat.toUpperCase().replace(/[^A-Z]/g, '_')}_${idx}`,
    name: cat,
    displayName: cat.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    description: `Church ${cat} Module`,
    productId: 'PROD_CH'
  });
});

let allModules = [...eduModules, ...dpModules, ...faapModules, ...churchModules];
// Convert to string representation
let modulesStr = allModules.map(m => JSON.stringify(m)).join(',\n  ');

let scriptContent = fs.readFileSync(registriesPath, 'utf8');
scriptContent = scriptContent.replace(/export const ModuleRegistry: ModuleDefinition\[\] = \[([\s\S]*?)\];/, `export const ModuleRegistry: ModuleDefinition[] = [\n  ${modulesStr}\n];`);

// Add workflows and forms
let workflowsStr = `
  { id: 'WF_EDU_ADMISSIONS', name: 'Admissions Workflow', displayName: 'Admissions', description: 'Application -> Validation -> Review -> Approval -> Offer -> Acceptance -> Enrollment', states: ['APPLICATION', 'VALIDATION', 'REVIEW', 'APPROVAL', 'OFFER', 'ACCEPTANCE', 'ENROLLMENT'], initialState: 'APPLICATION', formFields: [] },
  { id: 'WF_EDU_RESULTS', name: 'Results Workflow', displayName: 'Results', description: 'Marks entry -> validation -> moderation -> board approval -> publication -> transcript', states: ['ENTRY', 'VALIDATION', 'MODERATION', 'BOARD_APPROVAL', 'PUBLICATION', 'TRANSCRIPT'], initialState: 'ENTRY', formFields: [] },
  { id: 'WF_FAAP_VOTE_BOOK', name: 'Vote Book Commitment', displayName: 'Vote Book', description: 'Request -> vote validation -> commitment -> approval -> expenditure -> reconciliation', states: ['REQUEST', 'VOTE_VALIDATION', 'COMMITMENT', 'APPROVAL', 'EXPENDITURE', 'RECONCILIATION'], initialState: 'REQUEST', formFields: [] },
  { id: 'WF_FAAP_PROCUREMENT', name: 'Procurement Workflow', displayName: 'Procurement', description: 'Requisition -> budget check -> approval -> sourcing -> purchase order -> receipt -> invoice -> payment', states: ['REQUISITION', 'BUDGET_CHECK', 'APPROVAL', 'SOURCING', 'PURCHASE_ORDER', 'RECEIPT', 'INVOICE', 'PAYMENT'], initialState: 'REQUISITION', formFields: [] },
  { id: 'WF_DP_MERCHANT_ONBOARDING', name: 'Merchant Onboarding', displayName: 'Onboarding', description: 'Registration -> KYC -> Approval -> Activation', states: ['REGISTRATION', 'KYC', 'APPROVAL', 'ACTIVATION'], initialState: 'REGISTRATION', formFields: [] },
  { id: 'WF_CH_MEMBER_REGISTRATION', name: 'Member Registration', displayName: 'Registration', description: 'Registration -> Verification -> Approval', states: ['REGISTRATION', 'VERIFICATION', 'APPROVAL'], initialState: 'REGISTRATION', formFields: [] }
`;
scriptContent = scriptContent.replace(/export const WorkflowRegistry: WorkflowDefinition\[\] = \[([\s\S]*?)\];/, `export const WorkflowRegistry: WorkflowDefinition[] = [\n${workflowsStr}\n];`);

fs.writeFileSync(registriesPath, scriptContent);
console.log('Massive registries injected');
