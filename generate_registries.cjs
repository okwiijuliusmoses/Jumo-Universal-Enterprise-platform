const fs = require('fs');

const content = `/**
 * JUMO UEOS Dynamic Product Registries
 * Authoritative registry model for JUMO Education ERP, JUMO Digital Pay, JUMO FAAP, and JUMO Church ERP.
 * Derived dynamically from the benchmark extraction corpus and Phase 3 expansion mandate.
 */

export interface RegistryItem {
  id: string;
  name: string;
  displayName: string;
  description: string;
  category?: string;
  parentId?: string;
}

export interface EducationTemplateDefinition {
  id: string;
  name: string;
  displayName: string;
  description: string;
  activePortals: string[];
  activeOffices: string[];
  activeModules: string[];
  activeWorkflows: string[];
  activeReports: string[];
}

export interface PortalDefinition extends RegistryItem {
  authorizedRoles: string[];
}

export interface WorkflowDefinition extends RegistryItem {
  states: string[];
  initialState: string;
  formFields: FormFieldDefinition[];
}

export interface FormFieldDefinition {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'textarea' | 'checkbox';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

// 1. TEMPLATE REGISTRY
export const EducationTemplateRegistry: EducationTemplateDefinition[] = [
  { id: 'EARLY_CHILDHOOD', name: 'Early Childhood / Pre-Primary', displayName: 'Early Childhood / Pre-Primary', description: 'Nursery and kindergarten structures', activePortals: [], activeOffices: [], activeModules: [], activeWorkflows: [], activeReports: [] },
  { id: 'PRIMARY', name: 'Primary School', displayName: 'Primary School', description: 'Standard primary education structure', activePortals: [], activeOffices: [], activeModules: [], activeWorkflows: [], activeReports: [] },
  { id: 'SECONDARY', name: 'Secondary / High School', displayName: 'Secondary / High School', description: 'Forms, streams, combinations structure', activePortals: [], activeOffices: [], activeModules: [], activeWorkflows: [], activeReports: [] },
  { id: 'VOCATIONAL', name: 'Vocational & Technical Institution', displayName: 'Vocational & Technical Institution', description: 'Trades and competency-based training', activePortals: [], activeOffices: [], activeModules: [], activeWorkflows: [], activeReports: [] },
  { id: 'COLLEGE', name: 'College / Tertiary Institution', displayName: 'College / Tertiary Institution', description: 'Tertiary education operations', activePortals: [], activeOffices: [], activeModules: [], activeWorkflows: [], activeReports: [] },
  { id: 'UNIVERSITY', name: 'University', displayName: 'University', description: 'Complex faculties and senate structures', activePortals: [], activeOffices: [], activeModules: [], activeWorkflows: [], activeReports: [] },
  { id: 'E_LEARNING', name: 'E-Learning / Online Education', displayName: 'E-Learning / Online Education', description: 'Virtual education institution', activePortals: [], activeOffices: [], activeModules: [], activeWorkflows: [], activeReports: [] },
  { id: 'MULTI_LEVEL', name: 'Multi-level / Integrated Education', displayName: 'Multi-level / Integrated Education', description: 'Combined institutional structures', activePortals: [], activeOffices: [], activeModules: [], activeWorkflows: [], activeReports: [] },
  { id: 'TRAINING_CENTRE', name: 'Training Centre', displayName: 'Training Centre', description: 'Short-term and corporate training', activePortals: [], activeOffices: [], activeModules: [], activeWorkflows: [], activeReports: [] },
  { id: 'EXAM_CENTRE', name: 'Examination / Assessment Centre', displayName: 'Examination / Assessment Centre', description: 'Assessment and testing focus', activePortals: [], activeOffices: [], activeModules: [], activeWorkflows: [], activeReports: [] },
  { id: 'NGO', name: 'Education NGO / Training Programme', displayName: 'Education NGO / Training Programme', description: 'Non-profit educational structures', activePortals: [], activeOffices: [], activeModules: [], activeWorkflows: [], activeReports: [] },
  { id: 'HYBRID', name: 'Hybrid Physical + Digital Institution', displayName: 'Hybrid Physical + Digital Institution', description: 'Fully integrated offline and online', activePortals: [], activeOffices: [], activeModules: [], activeWorkflows: [], activeReports: [] }
];

export const ChurchTemplateRegistry = [
  { id: 'LOCAL_CHURCH', name: 'Local Church', displayName: 'Local Church' },
  { id: 'MULTI_CAMPUS', name: 'Multi-Campus Church', displayName: 'Multi-Campus Church' },
  { id: 'NETWORK', name: 'Church Network', displayName: 'Church Network' },
  { id: 'DENOMINATION', name: 'Denomination', displayName: 'Denomination' },
  { id: 'DIOCESE', name: 'Diocese / Regional Structure', displayName: 'Diocese / Regional Structure' },
  { id: 'NGO', name: 'Faith-Based Organization', displayName: 'Faith-Based Organization' },
  { id: 'MINISTRY', name: 'Ministry / Mission Organization', displayName: 'Ministry / Mission Organization' }
];

// 2. PORTAL REGISTRY
export const PortalRegistry: PortalDefinition[] = [
  // Education Portals
  { id: 'EDU_PUBLIC', name: 'Public Portal', displayName: 'Public Portal', description: 'Public facing site', authorizedRoles: ['GUEST'] },
  { id: 'EDU_REGISTRATION', name: 'Registration Portal', displayName: 'Registration Portal', description: 'Applicant registration', authorizedRoles: ['GUEST', 'APPLICANT'] },
  { id: 'EDU_STUDENT_FAMILY', name: 'Student & Family Portal', displayName: 'Student & Family Portal', description: 'Unified student and parent access', authorizedRoles: ['STUDENT', 'PARENT'] },
  { id: 'EDU_TEACHER', name: 'Teacher/Instructor Portal', displayName: 'Teacher/Instructor Portal', description: 'Academic delivery', authorizedRoles: ['TEACHER', 'INSTRUCTOR', 'LECTURER'] },
  { id: 'EDU_ACADEMIC_OFFICE', name: 'Academic Office Portal', displayName: 'Academic Office Portal', description: 'Academic administration', authorizedRoles: ['ACADEMIC_ADMIN', 'DEAN', 'HOD'] },
  { id: 'EDU_REGISTRAR', name: 'Registrar Portal', displayName: 'Registrar Portal', description: 'Student records and admissions', authorizedRoles: ['REGISTRAR'] },
  { id: 'EDU_EXAMS', name: 'Examination Office Portal', displayName: 'Examination Office Portal', description: 'Assessment and grading', authorizedRoles: ['EXAM_OFFICER'] },
  { id: 'EDU_FINANCE', name: 'Finance/Bursary Portal', displayName: 'Finance/Bursary Portal', description: 'Billing and collections', authorizedRoles: ['BURSAR', 'ACCOUNTANT'] },
  { id: 'EDU_HR', name: 'HR Portal', displayName: 'HR Portal', description: 'Staff management', authorizedRoles: ['HR_MANAGER'] },
  { id: 'EDU_PROCUREMENT', name: 'Procurement Portal', displayName: 'Procurement Portal', description: 'Purchasing', authorizedRoles: ['PROCUREMENT_OFFICER'] },
  { id: 'EDU_STORES', name: 'Stores Portal', displayName: 'Stores Portal', description: 'Inventory', authorizedRoles: ['STORE_MANAGER'] },
  { id: 'EDU_LIBRARY', name: 'Library Portal', displayName: 'Library Portal', description: 'Library management', authorizedRoles: ['LIBRARIAN'] },
  { id: 'EDU_CLINIC', name: 'Clinic/Health Portal', displayName: 'Clinic/Health Portal', description: 'Health services', authorizedRoles: ['NURSE', 'DOCTOR'] },
  { id: 'EDU_HOSTEL', name: 'Hostel/Residence Portal', displayName: 'Hostel/Residence Portal', description: 'Accommodation', authorizedRoles: ['WARDEN', 'MATRON'] },
  { id: 'EDU_LABORATORY', name: 'Laboratory Portal', displayName: 'Laboratory Portal', description: 'Lab sessions and inventory', authorizedRoles: ['LAB_TECHNICIAN'] },
  { id: 'EDU_WORKSHOP', name: 'Workshop Portal', displayName: 'Workshop Portal', description: 'Vocational workshops', authorizedRoles: ['WORKSHOP_MANAGER'] },
  { id: 'EDU_ELEARNING', name: 'E-Learning Portal', displayName: 'E-Learning Portal', description: 'LMS administration', authorizedRoles: ['LMS_ADMIN', 'TEACHER'] },
  { id: 'EDU_SPORTS', name: 'Sports Portal', displayName: 'Sports Portal', description: 'Games and sports', authorizedRoles: ['SPORTS_DIRECTOR'] },
  { id: 'EDU_ICT', name: 'ICT Portal', displayName: 'ICT Portal', description: 'Systems administration', authorizedRoles: ['IT_ADMIN'] },
  { id: 'EDU_ESTATES', name: 'Estates Portal', displayName: 'Estates Portal', description: 'Facilities', authorizedRoles: ['ESTATES_MANAGER'] },
  { id: 'EDU_ASSET', name: 'Asset Management Portal', displayName: 'Asset Management Portal', description: 'Assets', authorizedRoles: ['ASSET_MANAGER'] },
  { id: 'EDU_GOVERNANCE', name: 'Governance Portal', displayName: 'Governance Portal', description: 'Council and Senate', authorizedRoles: ['COUNCIL_MEMBER'] },
  { id: 'EDU_EXECUTIVE', name: 'Executive Management Portal', displayName: 'Executive Management Portal', description: 'Executive dashboard', authorizedRoles: ['EXECUTIVE', 'PRINCIPAL', 'VC'] },
  { id: 'EDU_AUDITOR', name: 'Auditor/Compliance Portal', displayName: 'Auditor/Compliance Portal', description: 'Audit', authorizedRoles: ['AUDITOR'] },
  { id: 'EDU_PLANNING', name: 'Institutional Planning Portal', displayName: 'Institutional Planning Portal', description: 'Planning', authorizedRoles: ['PLANNING_OFFICER'] },
  { id: 'EDU_RECRUITMENT', name: 'Recruitment Portal', displayName: 'Recruitment Portal', description: 'Staff recruitment', authorizedRoles: ['HR_MANAGER'] },
  { id: 'EDU_CONFERENCE', name: 'Digital Conference Portal', displayName: 'Digital Conference Portal', description: 'Conferences', authorizedRoles: ['EVENT_MANAGER'] },
  { id: 'EDU_SACCO', name: 'Staff SACCO Portal', displayName: 'Staff SACCO Portal', description: 'SACCO operations', authorizedRoles: ['SACCO_ADMIN', 'STAFF'] },
  { id: 'EDU_FARM', name: 'Farm Management Portal', displayName: 'Farm Management Portal', description: 'School farm', authorizedRoles: ['FARM_MANAGER'] },
  { id: 'EDU_KITCHEN', name: 'Kitchen/Catering Portal', displayName: 'Kitchen/Catering Portal', description: 'Catering', authorizedRoles: ['CATERING_MANAGER'] },

  // Digital Pay Portals
  { id: 'DP_PUBLIC', name: 'Public Portal', displayName: 'Public Portal', description: '', authorizedRoles: ['GUEST'] },
  { id: 'DP_MERCHANT', name: 'Merchant Portal', displayName: 'Merchant Portal', description: '', authorizedRoles: ['MERCHANT'] },
  { id: 'DP_CUSTOMER', name: 'Customer Portal', displayName: 'Customer Portal', description: '', authorizedRoles: ['CUSTOMER'] },
  { id: 'DP_PAY_OPS', name: 'Payment Operations Portal', displayName: 'Payment Operations Portal', description: '', authorizedRoles: ['PAY_OPS'] },
  { id: 'DP_SETTLEMENT', name: 'Settlement Portal', displayName: 'Settlement Portal', description: '', authorizedRoles: ['FINANCE'] },
  { id: 'DP_RECONCILIATION', name: 'Reconciliation Portal', displayName: 'Reconciliation Portal', description: '', authorizedRoles: ['FINANCE'] },
  { id: 'DP_FINANCE', name: 'Finance Portal', displayName: 'Finance Portal', description: '', authorizedRoles: ['FINANCE'] },
  { id: 'DP_RISK', name: 'Risk/Fraud Portal', displayName: 'Risk/Fraud Portal', description: '', authorizedRoles: ['RISK_OFFICER'] },
  { id: 'DP_COMPLIANCE', name: 'Compliance Portal', displayName: 'Compliance Portal', description: '', authorizedRoles: ['COMPLIANCE'] },
  { id: 'DP_PROVIDER', name: 'Provider Portal', displayName: 'Provider Portal', description: '', authorizedRoles: ['PROVIDER_ADMIN'] },
  { id: 'DP_AGENT', name: 'Agent Portal', displayName: 'Agent Portal', description: '', authorizedRoles: ['AGENT'] },
  { id: 'DP_DEVELOPER', name: 'Developer Portal', displayName: 'Developer Portal', description: '', authorizedRoles: ['DEVELOPER'] },
  { id: 'DP_SANDBOX', name: 'API/Sandbox Portal', displayName: 'API/Sandbox Portal', description: '', authorizedRoles: ['DEVELOPER'] },
  { id: 'DP_SUPPORT', name: 'Support Portal', displayName: 'Support Portal', description: '', authorizedRoles: ['SUPPORT'] },
  { id: 'DP_ADMIN', name: 'Administrator Portal', displayName: 'Administrator Portal', description: '', authorizedRoles: ['ADMIN'] },
  { id: 'DP_AUDIT', name: 'Auditor Portal', displayName: 'Auditor Portal', description: '', authorizedRoles: ['AUDITOR'] },
  { id: 'DP_TREASURY', name: 'Treasury Portal', displayName: 'Treasury Portal', description: '', authorizedRoles: ['TREASURY'] },

  // FAAP Portals
  { id: 'FAAP_PUBLIC', name: 'Public Portal', displayName: 'Public Portal', description: '', authorizedRoles: ['GUEST'] },
  { id: 'FAAP_FINANCE', name: 'Finance Portal', displayName: 'Finance Portal', description: '', authorizedRoles: ['FINANCE'] },
  { id: 'FAAP_ACCOUNTANT', name: 'Accountant Portal', displayName: 'Accountant Portal', description: '', authorizedRoles: ['ACCOUNTANT'] },
  { id: 'FAAP_BURSAR', name: 'Bursar Portal', displayName: 'Bursar Portal', description: '', authorizedRoles: ['BURSAR'] },
  { id: 'FAAP_TREASURY', name: 'Treasury Portal', displayName: 'Treasury Portal', description: '', authorizedRoles: ['TREASURY'] },
  { id: 'FAAP_BUDGET', name: 'Budget Portal', displayName: 'Budget Portal', description: '', authorizedRoles: ['BUDGET_OFFICER'] },
  { id: 'FAAP_AP', name: 'Accounts Payable Portal', displayName: 'Accounts Payable Portal', description: '', authorizedRoles: ['AP_CLERK'] },
  { id: 'FAAP_AR', name: 'Accounts Receivable Portal', displayName: 'Accounts Receivable Portal', description: '', authorizedRoles: ['AR_CLERK'] },
  { id: 'FAAP_PROCUREMENT', name: 'Procurement Finance Portal', displayName: 'Procurement Finance Portal', description: '', authorizedRoles: ['PROCUREMENT'] },
  { id: 'FAAP_ASSET', name: 'Asset Portal', displayName: 'Asset Portal', description: '', authorizedRoles: ['ASSET_MANAGER'] },
  { id: 'FAAP_AUDIT', name: 'Audit Portal', displayName: 'Audit Portal', description: '', authorizedRoles: ['AUDITOR'] },
  { id: 'FAAP_MANAGEMENT', name: 'Management Portal', displayName: 'Management Portal', description: '', authorizedRoles: ['MANAGER'] },
  { id: 'FAAP_TAX', name: 'Tax Portal', displayName: 'Tax Portal', description: '', authorizedRoles: ['TAX_OFFICER'] },
  { id: 'FAAP_CONSOLIDATION', name: 'Consolidation Portal', displayName: 'Consolidation Portal', description: '', authorizedRoles: ['FINANCE_DIRECTOR'] },
  { id: 'FAAP_CONTROLLER', name: 'Controller Portal', displayName: 'Controller Portal', description: '', authorizedRoles: ['CONTROLLER'] },
  { id: 'FAAP_CFO', name: 'CFO Portal', displayName: 'CFO Portal', description: '', authorizedRoles: ['CFO'] },
  { id: 'FAAP_SUPPLIER', name: 'Supplier Portal', displayName: 'Supplier Portal', description: '', authorizedRoles: ['SUPPLIER'] },
  { id: 'FAAP_CUSTOMER', name: 'Customer Portal', displayName: 'Customer Portal', description: '', authorizedRoles: ['CUSTOMER'] },
  { id: 'FAAP_API', name: 'Developer/API Portal', displayName: 'Developer/API Portal', description: '', authorizedRoles: ['DEVELOPER'] },
  { id: 'FAAP_ADMIN', name: 'Administrator Portal', displayName: 'Administrator Portal', description: '', authorizedRoles: ['ADMIN'] },

  // Church ERP Portals
  { id: 'CH_PUBLIC', name: 'Public Portal', displayName: 'Public Portal', description: '', authorizedRoles: ['GUEST'] },
  { id: 'CH_MEMBER', name: 'Member Portal', displayName: 'Member Portal', description: '', authorizedRoles: ['MEMBER'] },
  { id: 'CH_VISITOR', name: 'Visitor Portal', displayName: 'Visitor Portal', description: '', authorizedRoles: ['VISITOR'] },
  { id: 'CH_PASTOR', name: 'Pastor Portal', displayName: 'Pastor Portal', description: '', authorizedRoles: ['PASTOR'] },
  { id: 'CH_CLERGY', name: 'Clergy Portal', displayName: 'Clergy Portal', description: '', authorizedRoles: ['CLERGY'] },
  { id: 'CH_ADMIN', name: 'Church Administrator Portal', displayName: 'Church Administrator Portal', description: '', authorizedRoles: ['ADMIN'] },
  { id: 'CH_FINANCE', name: 'Finance Portal', displayName: 'Finance Portal', description: '', authorizedRoles: ['FINANCE'] },
  { id: 'CH_TREASURER', name: 'Treasurer Portal', displayName: 'Treasurer Portal', description: '', authorizedRoles: ['TREASURER'] },
  { id: 'CH_MINISTRY_LEADER', name: 'Ministry Leader Portal', displayName: 'Ministry Leader Portal', description: '', authorizedRoles: ['MINISTRY_LEADER'] },
  { id: 'CH_SMALL_GROUP', name: 'Small Group Portal', displayName: 'Small Group Portal', description: '', authorizedRoles: ['GROUP_LEADER'] },
  { id: 'CH_YOUTH', name: 'Youth Portal', displayName: 'Youth Portal', description: '', authorizedRoles: ['YOUTH_LEADER'] },
  { id: 'CH_CHILDREN', name: 'Children\\'s Ministry Portal', displayName: 'Children\\'s Ministry Portal', description: '', authorizedRoles: ['CHILDREN_WORKER'] },
  { id: 'CH_MISSIONS', name: 'Missions Portal', displayName: 'Missions Portal', description: '', authorizedRoles: ['MISSIONS_DIRECTOR'] },
  { id: 'CH_EVENTS', name: 'Events Portal', displayName: 'Events Portal', description: '', authorizedRoles: ['EVENTS_MANAGER'] },
  { id: 'CH_VOLUNTEER', name: 'Volunteer Portal', displayName: 'Volunteer Portal', description: '', authorizedRoles: ['VOLUNTEER'] },
  { id: 'CH_DONOR', name: 'Donor Portal', displayName: 'Donor Portal', description: '', authorizedRoles: ['DONOR'] },
  { id: 'CH_COUNSELLING', name: 'Counselling/Pastoral Care Portal', displayName: 'Counselling/Pastoral Care Portal', description: '', authorizedRoles: ['COUNSELLOR'] },
  { id: 'CH_COMMUNICATION', name: 'Communication Portal', displayName: 'Communication Portal', description: '', authorizedRoles: ['COMMS_OFFICER'] },
  { id: 'CH_HR', name: 'HR Portal', displayName: 'HR Portal', description: '', authorizedRoles: ['HR_MANAGER'] },
  { id: 'CH_PROCUREMENT', name: 'Procurement Portal', displayName: 'Procurement Portal', description: '', authorizedRoles: ['PROCUREMENT'] },
  { id: 'CH_ASSET', name: 'Asset Portal', displayName: 'Asset Portal', description: '', authorizedRoles: ['ASSET_MANAGER'] },
  { id: 'CH_AUDITOR', name: 'Auditor Portal', displayName: 'Auditor Portal', description: '', authorizedRoles: ['AUDITOR'] },
  { id: 'CH_EXECUTIVE', name: 'Executive/Governance Portal', displayName: 'Executive/Governance Portal', description: '', authorizedRoles: ['EXECUTIVE'] }
];

// 3. DIRECTORATE REGISTRY
export const DirectorateRegistry: RegistryItem[] = [
  // Education
  { id: 'DIR_EDU_EXEC', name: 'Executive', displayName: 'Executive', description: 'Board/Council' },
  { id: 'DIR_EDU_ACAD', name: 'Academic Directorate', displayName: 'Academic Directorate', description: 'Academic Affairs' },
  { id: 'DIR_EDU_STUD', name: 'Student Affairs Directorate', displayName: 'Student Affairs Directorate', description: 'Student Welfare' },
  { id: 'DIR_EDU_FIN', name: 'Finance Directorate', displayName: 'Finance Directorate', description: 'Finance and Bursary' },
  { id: 'DIR_EDU_ADMIN', name: 'Administration', displayName: 'Administration', description: 'HR, Procurement, Estates' }
];

// 4. DEPARTMENT REGISTRY
export const DepartmentRegistry: RegistryItem[] = [
  // Digital Pay
  { id: 'DEPT_DP_MERCHANT_OPS', name: 'Merchant Operations', displayName: 'Merchant Operations', description: '' },
  { id: 'DEPT_DP_CUSTOMER_OPS', name: 'Customer Operations', displayName: 'Customer Operations', description: '' },
  { id: 'DEPT_DP_PAYMENT_OPS', name: 'Payment Operations', displayName: 'Payment Operations', description: '' },
  { id: 'DEPT_DP_COLLECTIONS', name: 'Collections', displayName: 'Collections', description: '' },
  { id: 'DEPT_DP_SETTLEMENT', name: 'Settlement', displayName: 'Settlement', description: '' },
  { id: 'DEPT_DP_RECONCILIATION', name: 'Reconciliation', displayName: 'Reconciliation', description: '' },
  { id: 'DEPT_DP_TREASURY', name: 'Treasury', displayName: 'Treasury', description: '' },
  { id: 'DEPT_DP_RISK', name: 'Risk', displayName: 'Risk', description: '' },
  { id: 'DEPT_DP_FRAUD', name: 'Fraud', displayName: 'Fraud', description: '' },
  { id: 'DEPT_DP_COMPLIANCE', name: 'Compliance', displayName: 'Compliance', description: '' },
  { id: 'DEPT_DP_KYC', name: 'KYC', displayName: 'KYC', description: '' },
  { id: 'DEPT_DP_FINANCE', name: 'Finance', displayName: 'Finance', description: '' },
  { id: 'DEPT_DP_PROVIDER_MGMT', name: 'Provider Management', displayName: 'Provider Management', description: '' },
  { id: 'DEPT_DP_TECH_OPS', name: 'Technical Operations', displayName: 'Technical Operations', description: '' },
  { id: 'DEPT_DP_DEV_REL', name: 'Developer Relations', displayName: 'Developer Relations', description: '' },
  { id: 'DEPT_DP_SUPPORT', name: 'Support', displayName: 'Support', description: '' },
  { id: 'DEPT_DP_DISPUTES', name: 'Disputes', displayName: 'Disputes', description: '' },
  { id: 'DEPT_DP_CHARGEBACKS', name: 'Chargebacks', displayName: 'Chargebacks', description: '' },
  { id: 'DEPT_DP_SECURITY', name: 'Security', displayName: 'Security', description: '' },
  { id: 'DEPT_DP_AUDIT', name: 'Audit', displayName: 'Audit', description: '' },
  
  // FAAP
  { id: 'DEPT_FAAP_FIN_ACC', name: 'Financial Accounting', displayName: 'Financial Accounting', description: '' },
  { id: 'DEPT_FAAP_MGT_ACC', name: 'Management Accounting', displayName: 'Management Accounting', description: '' },
  { id: 'DEPT_FAAP_TREASURY', name: 'Treasury', displayName: 'Treasury', description: '' },
  { id: 'DEPT_FAAP_BUDGET', name: 'Budget', displayName: 'Budget', description: '' },
  { id: 'DEPT_FAAP_AP', name: 'Accounts Payable', displayName: 'Accounts Payable', description: '' },
  { id: 'DEPT_FAAP_AR', name: 'Accounts Receivable', displayName: 'Accounts Receivable', description: '' },
  { id: 'DEPT_FAAP_CASH_MGT', name: 'Cash Management', displayName: 'Cash Management', description: '' },
  { id: 'DEPT_FAAP_ASSETS', name: 'Assets', displayName: 'Assets', description: '' },
  { id: 'DEPT_FAAP_PROCUREMENT', name: 'Procurement', displayName: 'Procurement', description: '' },
  { id: 'DEPT_FAAP_INV_ACC', name: 'Inventory Accounting', displayName: 'Inventory Accounting', description: '' },
  { id: 'DEPT_FAAP_TAX', name: 'Tax', displayName: 'Tax', description: '' },
  { id: 'DEPT_FAAP_PAYROLL_ACC', name: 'Payroll Accounting', displayName: 'Payroll Accounting', description: '' },
  { id: 'DEPT_FAAP_COST_ACC', name: 'Cost Accounting', displayName: 'Cost Accounting', description: '' },
  { id: 'DEPT_FAAP_PROJ_ACC', name: 'Project Accounting', displayName: 'Project Accounting', description: '' },
  { id: 'DEPT_FAAP_CONSOLIDATION', name: 'Consolidation', displayName: 'Consolidation', description: '' },
  { id: 'DEPT_FAAP_FIN_PLAN', name: 'Financial Planning', displayName: 'Financial Planning', description: '' },
  { id: 'DEPT_FAAP_AUDIT', name: 'Audit', displayName: 'Audit', description: '' },
  { id: 'DEPT_FAAP_RISK', name: 'Risk', displayName: 'Risk', description: '' },
  { id: 'DEPT_FAAP_COMPLIANCE', name: 'Compliance', displayName: 'Compliance', description: '' },
  { id: 'DEPT_FAAP_REPORTING', name: 'Reporting', displayName: 'Reporting', description: '' },

  // Church
  { id: 'DEPT_CH_PASTORAL', name: 'Pastoral Office', displayName: 'Pastoral Office', description: '' },
  { id: 'DEPT_CH_ADMIN', name: 'Administration', displayName: 'Administration', description: '' },
  { id: 'DEPT_CH_MEMBERSHIP', name: 'Membership', displayName: 'Membership', description: '' },
  { id: 'DEPT_CH_DISCIPLESHIP', name: 'Discipleship', displayName: 'Discipleship', description: '' },
  { id: 'DEPT_CH_WORSHIP', name: 'Worship', displayName: 'Worship', description: '' },
  { id: 'DEPT_CH_EVANGELISM', name: 'Evangelism', displayName: 'Evangelism', description: '' },
  { id: 'DEPT_CH_MISSIONS', name: 'Missions', displayName: 'Missions', description: '' },
  { id: 'DEPT_CH_YOUTH', name: 'Youth', displayName: 'Youth', description: '' },
  { id: 'DEPT_CH_CHILDREN', name: 'Children', displayName: 'Children', description: '' },
  { id: 'DEPT_CH_WOMEN', name: 'Women\\'s Ministry', displayName: 'Women\\'s Ministry', description: '' },
  { id: 'DEPT_CH_MEN', name: 'Men\\'s Ministry', displayName: 'Men\\'s Ministry', description: '' },
  { id: 'DEPT_CH_SMALL_GROUPS', name: 'Small Groups', displayName: 'Small Groups', description: '' },
  { id: 'DEPT_CH_COUNSELLING', name: 'Counselling', displayName: 'Counselling', description: '' },
  { id: 'DEPT_CH_PRAYER', name: 'Prayer', displayName: 'Prayer', description: '' },
  { id: 'DEPT_CH_FINANCE', name: 'Finance', displayName: 'Finance', description: '' },
  { id: 'DEPT_CH_TREASURY', name: 'Treasury', displayName: 'Treasury', description: '' },
  { id: 'DEPT_CH_TITHES', name: 'Tithes & Offerings', displayName: 'Tithes & Offerings', description: '' },
  { id: 'DEPT_CH_DONOR_REL', name: 'Donor Relations', displayName: 'Donor Relations', description: '' },
  { id: 'DEPT_CH_PROCUREMENT', name: 'Procurement', displayName: 'Procurement', description: '' },
  { id: 'DEPT_CH_STORES', name: 'Stores', displayName: 'Stores', description: '' },
  { id: 'DEPT_CH_ASSETS', name: 'Assets', displayName: 'Assets', description: '' },
  { id: 'DEPT_CH_FACILITIES', name: 'Facilities', displayName: 'Facilities', description: '' },
  { id: 'DEPT_CH_EVENTS', name: 'Events', displayName: 'Events', description: '' },
  { id: 'DEPT_CH_COMMS', name: 'Communications', displayName: 'Communications', description: '' },
  { id: 'DEPT_CH_MEDIA', name: 'Media', displayName: 'Media', description: '' },
  { id: 'DEPT_CH_ICT', name: 'ICT', displayName: 'ICT', description: '' },
  { id: 'DEPT_CH_HR', name: 'HR', displayName: 'HR', description: '' },
  { id: 'DEPT_CH_SECURITY', name: 'Security', displayName: 'Security', description: '' },
  { id: 'DEPT_CH_TRANSPORT', name: 'Transport', displayName: 'Transport', description: '' },
  { id: 'DEPT_CH_AUDIT', name: 'Audit', displayName: 'Audit', description: '' },
  { id: 'DEPT_CH_GOVERNANCE', name: 'Governance', displayName: 'Governance', description: '' }
];

// 5. OFFICE REGISTRY
export const OfficeRegistry: RegistryItem[] = [
  // Edu Offices
  { id: 'OFF_EDU_HT', name: 'Headteacher Office', displayName: 'Headteacher Office', description: '' },
  { id: 'OFF_EDU_DEP_HT', name: 'Deputy Head Office', displayName: 'Deputy Head Office', description: '' },
  { id: 'OFF_EDU_ADM', name: 'Admissions Office', displayName: 'Admissions Office', description: '' },
  { id: 'OFF_EDU_REG', name: 'Registrar/Records Office', displayName: 'Registrar Office', description: '' },
  { id: 'OFF_EDU_ACAD', name: 'Academic Office', displayName: 'Academic Office', description: '' },
  { id: 'OFF_EDU_EXAMS', name: 'Examinations Office', displayName: 'Examinations Office', description: '' },
  { id: 'OFF_EDU_BURSAR', name: 'Bursar Office', displayName: 'Bursar Office', description: '' },
  { id: 'OFF_EDU_ACCOUNTS', name: 'Accounts Office', displayName: 'Accounts Office', description: '' },
  { id: 'OFF_EDU_CASHIER', name: 'Cashier Office', displayName: 'Cashier Office', description: '' },
  { id: 'OFF_EDU_HR', name: 'HR Office', displayName: 'HR Office', description: '' },
  { id: 'OFF_EDU_TEACHER_ADMIN', name: 'Teacher Administration Office', displayName: 'Teacher Administration Office', description: '' },
  { id: 'OFF_EDU_STUDENT_WELFARE', name: 'Student Welfare Office', displayName: 'Student Welfare Office', description: '' },
  { id: 'OFF_EDU_COUNSELLING', name: 'Counselling Office', displayName: 'Counselling Office', description: '' },
  { id: 'OFF_EDU_DISCIPLINE', name: 'Discipline Office', displayName: 'Discipline Office', description: '' },
  { id: 'OFF_EDU_LIBRARY', name: 'Library Office', displayName: 'Library Office', description: '' },
  { id: 'OFF_EDU_ICT', name: 'ICT Office', displayName: 'ICT Office', description: '' },
  { id: 'OFF_EDU_CLINIC', name: 'Clinic Office', displayName: 'Clinic Office', description: '' },
  { id: 'OFF_EDU_BOARDING', name: 'Boarding Office', displayName: 'Boarding Office', description: '' },
  { id: 'OFF_EDU_TRANSPORT', name: 'Transport Office', displayName: 'Transport Office', description: '' },
  { id: 'OFF_EDU_PROCUREMENT', name: 'Procurement Office', displayName: 'Procurement Office', description: '' },
  { id: 'OFF_EDU_STORES', name: 'Stores Office', displayName: 'Stores Office', description: '' },
  { id: 'OFF_EDU_FACILITIES', name: 'Facilities Office', displayName: 'Facilities Office', description: '' },
  { id: 'OFF_EDU_SECURITY', name: 'Security Office', displayName: 'Security Office', description: '' },
  { id: 'OFF_EDU_COMMS', name: 'Communications Office', displayName: 'Communications Office', description: '' },
  { id: 'OFF_EDU_QA', name: 'Quality Assurance Office', displayName: 'Quality Assurance Office', description: '' },
  { id: 'OFF_EDU_SENATE_SEC', name: 'Senate Secretariat', displayName: 'Senate Secretariat', description: '' },
  { id: 'OFF_EDU_FACULTY', name: 'Faculty Offices', displayName: 'Faculty Offices', description: '' },
  { id: 'OFF_EDU_DEPARTMENT', name: 'Department Offices', displayName: 'Department Offices', description: '' },
  { id: 'OFF_EDU_DEAN', name: 'Dean\\'s Office', displayName: 'Dean\\'s Office', description: '' },
  { id: 'OFF_EDU_HOD', name: 'Head of Department Office', displayName: 'HOD Office', description: '' },
  { id: 'OFF_EDU_BUDGET', name: 'Budget Office', displayName: 'Budget Office', description: '' },
  { id: 'OFF_EDU_AUDIT', name: 'Audit Office', displayName: 'Audit Office', description: '' },
  { id: 'OFF_EDU_RESEARCH', name: 'Research Office', displayName: 'Research Office', description: '' },
  { id: 'OFF_EDU_GRAD_SCHOOL', name: 'Graduate School', displayName: 'Graduate School', description: '' },
  { id: 'OFF_EDU_ACCOMMODATION', name: 'Accommodation Office', displayName: 'Accommodation Office', description: '' },
  { id: 'OFF_EDU_STUDENT_AFFAIRS', name: 'Student Affairs Office', displayName: 'Student Affairs Office', description: '' },
  { id: 'OFF_EDU_CAREER', name: 'Career Office', displayName: 'Career Office', description: '' },
  { id: 'OFF_EDU_ALUMNI', name: 'Alumni Office', displayName: 'Alumni Office', description: '' },
  { id: 'OFF_EDU_LEGAL', name: 'Legal Office', displayName: 'Legal Office', description: '' },
  
  // FAAP Offices
  { id: 'OFF_FAAP_GL', name: 'General Ledger Office', displayName: 'General Ledger Office', description: '' },
  { id: 'OFF_FAAP_AP', name: 'Accounts Payable Office', displayName: 'Accounts Payable Office', description: '' },
  { id: 'OFF_FAAP_AR', name: 'Accounts Receivable Office', displayName: 'Accounts Receivable Office', description: '' },
  { id: 'OFF_FAAP_CASH', name: 'Cash Office', displayName: 'Cash Office', description: '' },
  { id: 'OFF_FAAP_TREASURY', name: 'Treasury Office', displayName: 'Treasury Office', description: '' },
  { id: 'OFF_FAAP_BUDGET', name: 'Budget Office', displayName: 'Budget Office', description: '' },
  { id: 'OFF_FAAP_VOTE', name: 'Vote Book Office', displayName: 'Vote Book Office', description: '' },
  { id: 'OFF_FAAP_ASSET', name: 'Asset Office', displayName: 'Asset Office', description: '' },
  { id: 'OFF_FAAP_PROCUREMENT_FIN', name: 'Procurement Finance Office', displayName: 'Procurement Finance Office', description: '' },
  { id: 'OFF_FAAP_TAX', name: 'Tax Office', displayName: 'Tax Office', description: '' },
  { id: 'OFF_FAAP_AUDIT', name: 'Audit Office', displayName: 'Audit Office', description: '' },
  { id: 'OFF_FAAP_MGT_ACC', name: 'Management Accounting Office', displayName: 'Management Accounting Office', description: '' },
  { id: 'OFF_FAAP_FIN_REP', name: 'Financial Reporting Office', displayName: 'Financial Reporting Office', description: '' },
  { id: 'OFF_FAAP_CONSOLIDATION', name: 'Consolidation Office', displayName: 'Consolidation Office', description: '' },
  { id: 'OFF_FAAP_CONTROLLER', name: 'Controller\\'s Office', displayName: 'Controller\\'s Office', description: '' },
  { id: 'OFF_FAAP_CFO', name: 'CFO Office', displayName: 'CFO Office', description: '' }
];

// 6. MODULE REGISTRY
export const ModuleRegistry: RegistryItem[] = [
  // Edu Modules
  { id: 'MOD_EDU_ADMISSIONS', name: 'Admissions', displayName: 'Admissions', description: '' },
  { id: 'MOD_EDU_SIS', name: 'Student Information System', displayName: 'Student Information System', description: '' },
  { id: 'MOD_EDU_STUD_REG', name: 'Student Registration', displayName: 'Student Registration', description: '' },
  { id: 'MOD_EDU_ACAD_REC', name: 'Academic Records', displayName: 'Academic Records', description: '' },
  { id: 'MOD_EDU_CURR_MGMT', name: 'Curriculum Management', displayName: 'Curriculum Management', description: '' },
  { id: 'MOD_EDU_PROG_MGMT', name: 'Programme Management', displayName: 'Programme Management', description: '' },
  { id: 'MOD_EDU_COURSE_MGMT', name: 'Course Management', displayName: 'Course Management', description: '' },
  { id: 'MOD_EDU_SUBJ_MGMT', name: 'Subject Management', displayName: 'Subject Management', description: '' },
  { id: 'MOD_EDU_CLASS_MGMT', name: 'Class Management', displayName: 'Class Management', description: '' },
  { id: 'MOD_EDU_STREAM_MGMT', name: 'Stream Management', displayName: 'Stream Management', description: '' },
  { id: 'MOD_EDU_DEPT_MGMT', name: 'Department Management', displayName: 'Department Management', description: '' },
  { id: 'MOD_EDU_ACAD_CAL', name: 'Academic Calendar', displayName: 'Academic Calendar', description: '' },
  { id: 'MOD_EDU_TIMETABLE', name: 'Timetable Management', displayName: 'Timetable Management', description: '' },
  { id: 'MOD_EDU_ASSESS_MGMT', name: 'Assessment Management', displayName: 'Assessment Management', description: '' },
  { id: 'MOD_EDU_EXAM_MGMT', name: 'Examination Management', displayName: 'Examination Management', description: '' },
  { id: 'MOD_EDU_RESULTS_MGMT', name: 'Results Management', displayName: 'Results Management', description: '' },
  { id: 'MOD_EDU_GRADING', name: 'Grading', displayName: 'Grading', description: '' },
  { id: 'MOD_EDU_PROMOTION', name: 'Promotion', displayName: 'Promotion', description: '' },
  { id: 'MOD_EDU_GRADUATION', name: 'Graduation', displayName: 'Graduation', description: '' },
  { id: 'MOD_EDU_TRANSCRIPT', name: 'Transcript/Report Card', displayName: 'Transcript/Report Card', description: '' },
  { id: 'MOD_EDU_ACAD_CLEAR', name: 'Academic Clearance', displayName: 'Academic Clearance', description: '' },
  { id: 'MOD_EDU_STUD_AFFAIRS', name: 'Student Affairs', displayName: 'Student Affairs', description: '' },
  { id: 'MOD_EDU_DISCIPLINE', name: 'Discipline', displayName: 'Discipline', description: '' },
  { id: 'MOD_EDU_COUNSELLING', name: 'Counselling', displayName: 'Counselling', description: '' },
  { id: 'MOD_EDU_CAREER', name: 'Career Guidance', displayName: 'Career Guidance', description: '' },
  { id: 'MOD_EDU_CLUBS', name: 'Clubs', displayName: 'Clubs', description: '' },
  { id: 'MOD_EDU_GAMES', name: 'Games', displayName: 'Games', description: '' },
  { id: 'MOD_EDU_SPORTS', name: 'Sports', displayName: 'Sports', description: '' },
  { id: 'MOD_EDU_WELFARE', name: 'Student Welfare', displayName: 'Student Welfare', description: '' },
  { id: 'MOD_EDU_LEADERSHIP', name: 'Student Leadership', displayName: 'Student Leadership', description: '' },
  { id: 'MOD_EDU_STUD_COMMS', name: 'Student Communication', displayName: 'Student Communication', description: '' },
  { id: 'MOD_EDU_ALUMNI', name: 'Alumni', displayName: 'Alumni', description: '' },
  { id: 'MOD_EDU_LMS', name: 'LMS', displayName: 'LMS', description: '' },
  { id: 'MOD_EDU_DIGITAL_TRAINING', name: 'Digital Training', displayName: 'Digital Training', description: '' },
  { id: 'MOD_EDU_VIRTUAL_CLASS', name: 'Virtual Classroom', displayName: 'Virtual Classroom', description: '' },
  { id: 'MOD_EDU_ONLINE_ASSESS', name: 'Online Assessment', displayName: 'Online Assessment', description: '' },
  { id: 'MOD_EDU_DIGITAL_CONTENT', name: 'Digital Content', displayName: 'Digital Content', description: '' },
  { id: 'MOD_EDU_LEARNING_ANALYTICS', name: 'Learning Analytics', displayName: 'Learning Analytics', description: '' },
  { id: 'MOD_EDU_INST_ADMIN', name: 'Institutional Administration', displayName: 'Institutional Administration', description: '' },
  { id: 'MOD_EDU_GOVERNANCE', name: 'Governance', displayName: 'Governance', description: '' },
  { id: 'MOD_EDU_COUNCIL_MGMT', name: 'Council/Board Management', displayName: 'Council/Board Management', description: '' },
  { id: 'MOD_EDU_SENATE', name: 'Senate/Academic Board', displayName: 'Senate/Academic Board', description: '' },
  { id: 'MOD_EDU_POLICY_MGMT', name: 'Policy Management', displayName: 'Policy Management', description: '' },
  { id: 'MOD_EDU_DIRECTIVES', name: 'Directives', displayName: 'Directives', description: '' },
  { id: 'MOD_EDU_MEETINGS', name: 'Meetings', displayName: 'Meetings', description: '' },
  { id: 'MOD_EDU_MINUTES', name: 'Minutes', displayName: 'Minutes', description: '' },
  { id: 'MOD_EDU_RESOLUTIONS', name: 'Resolutions', displayName: 'Resolutions', description: '' },
  { id: 'MOD_EDU_COMPLIANCE', name: 'Institutional Compliance', displayName: 'Institutional Compliance', description: '' },
  { id: 'MOD_EDU_STAFF_REG', name: 'Staff Registry', displayName: 'Staff Registry', description: '' },
  { id: 'MOD_EDU_RECRUITMENT', name: 'Recruitment', displayName: 'Recruitment', description: '' },
  { id: 'MOD_EDU_ONBOARDING', name: 'Onboarding', displayName: 'Onboarding', description: '' },
  { id: 'MOD_EDU_STAFF_PROFILES', name: 'Staff Profiles', displayName: 'Staff Profiles', description: '' },
  { id: 'MOD_EDU_PAYROLL_INT', name: 'Payroll integration', displayName: 'Payroll integration', description: '' },
  { id: 'MOD_EDU_LEAVE', name: 'Leave', displayName: 'Leave', description: '' },
  { id: 'MOD_EDU_ATTENDANCE', name: 'Attendance', displayName: 'Attendance', description: '' },
  { id: 'MOD_EDU_PERFORMANCE', name: 'Performance', displayName: 'Performance', description: '' },
  { id: 'MOD_EDU_TRAINING', name: 'Training', displayName: 'Training', description: '' },
  { id: 'MOD_EDU_STAFF_DEV', name: 'Staff Development', displayName: 'Staff Development', description: '' },
  { id: 'MOD_EDU_STAFF_SACCO', name: 'Staff SACCO', displayName: 'Staff SACCO', description: '' },
  { id: 'MOD_EDU_PROCUREMENT_PLAN', name: 'Procurement Planning', displayName: 'Procurement Planning', description: '' },
  { id: 'MOD_EDU_REQUISITIONS', name: 'Requisitions', displayName: 'Requisitions', description: '' },
  { id: 'MOD_EDU_QUOTATIONS', name: 'Quotations', displayName: 'Quotations', description: '' },
  { id: 'MOD_EDU_TENDERING', name: 'Tendering', displayName: 'Tendering', description: '' },
  { id: 'MOD_EDU_PO', name: 'Purchase Orders', displayName: 'Purchase Orders', description: '' },
  { id: 'MOD_EDU_SUPPLIER_MGMT', name: 'Supplier Management', displayName: 'Supplier Management', description: '' },
  { id: 'MOD_EDU_RECEIVING', name: 'Receiving', displayName: 'Receiving', description: '' },
  { id: 'MOD_EDU_INSPECTION', name: 'Inspection', displayName: 'Inspection', description: '' },
  { id: 'MOD_EDU_STORES', name: 'Stores', displayName: 'Stores', description: '' },
  { id: 'MOD_EDU_INVENTORY', name: 'Inventory', displayName: 'Inventory', description: '' },
  { id: 'MOD_EDU_DISTRIBUTION', name: 'Distribution', displayName: 'Distribution', description: '' },
  { id: 'MOD_EDU_LOGISTICS', name: 'Logistics', displayName: 'Logistics', description: '' },
  { id: 'MOD_EDU_PROCUREMENT_APP', name: 'Procurement Approvals', displayName: 'Procurement Approvals', description: '' },
  { id: 'MOD_EDU_ESTATES_MGMT', name: 'Estates Management', displayName: 'Estates Management', description: '' },
  { id: 'MOD_EDU_BUILDINGS', name: 'Buildings', displayName: 'Buildings', description: '' },
  { id: 'MOD_EDU_CLASSROOMS', name: 'Classrooms', displayName: 'Classrooms', description: '' },
  { id: 'MOD_EDU_HOSTELS', name: 'Hostels', displayName: 'Hostels', description: '' },
  { id: 'MOD_EDU_LABORATORIES', name: 'Laboratories', displayName: 'Laboratories', description: '' },
  { id: 'MOD_EDU_WORKSHOPS', name: 'Workshops', displayName: 'Workshops', description: '' },
  { id: 'MOD_EDU_LAND', name: 'Land', displayName: 'Land', description: '' },
  { id: 'MOD_EDU_MAINTENANCE', name: 'Maintenance', displayName: 'Maintenance', description: '' },
  { id: 'MOD_EDU_WORK_ORDERS', name: 'Work Orders', displayName: 'Work Orders', description: '' },
  { id: 'MOD_EDU_UTILITIES', name: 'Utilities', displayName: 'Utilities', description: '' },
  { id: 'MOD_EDU_INST_DEV', name: 'Institutional Development', displayName: 'Institutional Development', description: '' },
  { id: 'MOD_EDU_ASSET_REG', name: 'Asset Register', displayName: 'Asset Register', description: '' },
  { id: 'MOD_EDU_ASSET_LIFECYCLE', name: 'Asset Lifecycle', displayName: 'Asset Lifecycle', description: '' },
  { id: 'MOD_EDU_DEPRECIATION', name: 'Depreciation Integration', displayName: 'Depreciation Integration', description: '' },
  { id: 'MOD_EDU_KITCHEN', name: 'Kitchen Management', displayName: 'Kitchen Management', description: '' },
  { id: 'MOD_EDU_MEALS', name: 'Meal Planning', displayName: 'Meal Planning', description: '' },
  { id: 'MOD_EDU_FARM', name: 'School Farm', displayName: 'School Farm', description: '' },
  { id: 'MOD_EDU_CONFERENCE', name: 'Digital Conference', displayName: 'Digital Conference', description: '' },

  // Digital Pay Modules
  { id: 'MOD_DP_MERCHANT_MGMT', name: 'Merchant Management', displayName: 'Merchant Management', description: '' },
  { id: 'MOD_DP_CUSTOMER_MGMT', name: 'Customer Management', displayName: 'Customer Management', description: '' },
  { id: 'MOD_DP_KYC', name: 'KYC', displayName: 'KYC', description: '' },
  { id: 'MOD_DP_PAYMENT_INTENT', name: 'Payment Intent', displayName: 'Payment Intent', description: '' },
  { id: 'MOD_DP_PAYMENT_REF', name: 'Payment Reference', displayName: 'Payment Reference', description: '' },
  { id: 'MOD_DP_COLLECTIONS', name: 'Collections', displayName: 'Collections', description: '' },
  { id: 'MOD_DP_MOBILE_MONEY', name: 'Mobile Money', displayName: 'Mobile Money', description: '' },
  { id: 'MOD_DP_CARDS', name: 'Cards', displayName: 'Cards', description: '' },
  { id: 'MOD_DP_BANK_TRANSFER', name: 'Bank Transfer', displayName: 'Bank Transfer', description: '' },
  { id: 'MOD_DP_USSD', name: 'USSD', displayName: 'USSD', description: '' },
  { id: 'MOD_DP_QR', name: 'QR', displayName: 'QR', description: '' },
  { id: 'MOD_DP_WALLET', name: 'Wallet', displayName: 'Wallet', description: '' },
  { id: 'MOD_DP_POS', name: 'POS', displayName: 'POS', description: '' },
  { id: 'MOD_DP_PAYMENT_ROUTING', name: 'Payment Routing', displayName: 'Payment Routing', description: '' },
  { id: 'MOD_DP_PROVIDER_ROUTING', name: 'Provider Routing', displayName: 'Provider Routing', description: '' },
  { id: 'MOD_DP_PAYMENT_RETRY', name: 'Payment Retry', displayName: 'Payment Retry', description: '' },
  { id: 'MOD_DP_TRANS_PROC', name: 'Transaction Processing', displayName: 'Transaction Processing', description: '' },
  { id: 'MOD_DP_FRAUD_DETECTION', name: 'Fraud Detection', displayName: 'Fraud Detection', description: '' },
  { id: 'MOD_DP_RISK_RULES', name: 'Risk Rules', displayName: 'Risk Rules', description: '' },
  { id: 'MOD_DP_AUTHENTICATION', name: 'Authentication', displayName: 'Authentication', description: '' },
  { id: 'MOD_DP_3DS', name: '3DS', displayName: '3DS', description: '' },
  { id: 'MOD_DP_REFUNDS', name: 'Refunds', displayName: 'Refunds', description: '' },
  { id: 'MOD_DP_REVERSALS', name: 'Reversals', displayName: 'Reversals', description: '' },
  { id: 'MOD_DP_CHARGEBACKS', name: 'Chargebacks', displayName: 'Chargebacks', description: '' },
  { id: 'MOD_DP_DISPUTES', name: 'Disputes', displayName: 'Disputes', description: '' },
  { id: 'MOD_DP_SETTLEMENT', name: 'Settlement', displayName: 'Settlement', description: '' },
  { id: 'MOD_DP_SPLIT_SETTLEMENT', name: 'Split Settlement', displayName: 'Split Settlement', description: '' },
  { id: 'MOD_DP_COMMISSIONS', name: 'Commissions', displayName: 'Commissions', description: '' },
  { id: 'MOD_DP_PRICING', name: 'Pricing', displayName: 'Pricing', description: '' },
  { id: 'MOD_DP_PAYOUTS', name: 'Payouts', displayName: 'Payouts', description: '' },
  { id: 'MOD_DP_TREASURY', name: 'Treasury', displayName: 'Treasury', description: '' },
  { id: 'MOD_DP_RECONCILIATION', name: 'Reconciliation', displayName: 'Reconciliation', description: '' },
  { id: 'MOD_DP_STATEMENTS', name: 'Statements', displayName: 'Statements', description: '' },
  { id: 'MOD_DP_NOTIFICATIONS', name: 'Notifications', displayName: 'Notifications', description: '' },
  { id: 'MOD_DP_WEBHOOKS', name: 'Webhooks', displayName: 'Webhooks', description: '' },
  { id: 'MOD_DP_API_MGMT', name: 'API Management', displayName: 'API Management', description: '' },
  { id: 'MOD_DP_SANDBOX', name: 'Sandbox', displayName: 'Sandbox', description: '' },
  { id: 'MOD_DP_DEV_TOOLS', name: 'Developer Tools', displayName: 'Developer Tools', description: '' },
  { id: 'MOD_DP_ANALYTICS', name: 'Analytics', displayName: 'Analytics', description: '' },
  { id: 'MOD_DP_REPORTING', name: 'Reporting', displayName: 'Reporting', description: '' },
  { id: 'MOD_DP_AUDIT', name: 'Audit', displayName: 'Audit', description: '' },

  // FAAP Modules
  { id: 'MOD_FAAP_COA', name: 'Chart of Accounts', displayName: 'Chart of Accounts', description: '' },
  { id: 'MOD_FAAP_GL', name: 'General Ledger', displayName: 'General Ledger', description: '' },
  { id: 'MOD_FAAP_GJ', name: 'General Journal', displayName: 'General Journal', description: '' },
  { id: 'MOD_FAAP_SUBLEDGERS', name: 'Subledgers', displayName: 'Subledgers', description: '' },
  { id: 'MOD_FAAP_AP', name: 'Accounts Payable', displayName: 'Accounts Payable', description: '' },
  { id: 'MOD_FAAP_AR', name: 'Accounts Receivable', displayName: 'Accounts Receivable', description: '' },
  { id: 'MOD_FAAP_CUST_BILL', name: 'Customer Billing', displayName: 'Customer Billing', description: '' },
  { id: 'MOD_FAAP_SUPP_BILL', name: 'Supplier Billing', displayName: 'Supplier Billing', description: '' },
  { id: 'MOD_FAAP_CASH_BOOK', name: 'Cash Book', displayName: 'Cash Book', description: '' },
  { id: 'MOD_FAAP_PETTY_CASH', name: 'Petty Cash', displayName: 'Petty Cash', description: '' },
  { id: 'MOD_FAAP_BANKING', name: 'Banking', displayName: 'Banking', description: '' },
  { id: 'MOD_FAAP_BANK_RECON', name: 'Bank Reconciliation', displayName: 'Bank Reconciliation', description: '' },
  { id: 'MOD_FAAP_BUDGET_BOOK', name: 'Budget Book', displayName: 'Budget Book', description: '' },
  { id: 'MOD_FAAP_VOTE_BOOK', name: 'Vote Book', displayName: 'Vote Book', description: '' },
  { id: 'MOD_FAAP_BUDGET_CONTROL', name: 'Budget Control', displayName: 'Budget Control', description: '' },
  { id: 'MOD_FAAP_COMMITMENTS', name: 'Commitments', displayName: 'Commitments', description: '' },
  { id: 'MOD_FAAP_ENCUMBRANCES', name: 'Encumbrances', displayName: 'Encumbrances', description: '' },
  { id: 'MOD_FAAP_FIXED_ASSETS', name: 'Fixed Assets', displayName: 'Fixed Assets', description: '' },
  { id: 'MOD_FAAP_DEPRECIATION', name: 'Depreciation', displayName: 'Depreciation', description: '' },
  { id: 'MOD_FAAP_IMPAIRMENT', name: 'Impairment', displayName: 'Impairment', description: '' },
  { id: 'MOD_FAAP_ASSET_DISP', name: 'Asset Disposal', displayName: 'Asset Disposal', description: '' },
  { id: 'MOD_FAAP_PROCUREMENT', name: 'Procurement', displayName: 'Procurement', description: '' },
  { id: 'MOD_FAAP_INV_ACC', name: 'Inventory Accounting', displayName: 'Inventory Accounting', description: '' },
  { id: 'MOD_FAAP_COST_CENTRES', name: 'Cost Centres', displayName: 'Cost Centres', description: '' },
  { id: 'MOD_FAAP_PROFIT_CENTRES', name: 'Profit Centres', displayName: 'Profit Centres', description: '' },
  { id: 'MOD_FAAP_PROJECTS', name: 'Projects', displayName: 'Projects', description: '' },
  { id: 'MOD_FAAP_DIMENSIONS', name: 'Dimensions', displayName: 'Dimensions', description: '' },
  { id: 'MOD_FAAP_MULTI_CURRENCY', name: 'Multi-Currency', displayName: 'Multi-Currency', description: '' },
  { id: 'MOD_FAAP_FX', name: 'FX', displayName: 'FX', description: '' },
  { id: 'MOD_FAAP_INTERCOMPANY', name: 'Intercompany', displayName: 'Intercompany', description: '' },
  { id: 'MOD_FAAP_MULTI_ENTITY', name: 'Multi-Entity', displayName: 'Multi-Entity', description: '' },
  { id: 'MOD_FAAP_CONSOLIDATION', name: 'Consolidation', displayName: 'Consolidation', description: '' },
  { id: 'MOD_FAAP_REV_REC', name: 'Revenue Recognition', displayName: 'Revenue Recognition', description: '' },
  { id: 'MOD_FAAP_EXPENSE_MGMT', name: 'Expense Management', displayName: 'Expense Management', description: '' },
  { id: 'MOD_FAAP_TAX', name: 'Tax', displayName: 'Tax', description: '' },
  { id: 'MOD_FAAP_FIN_PLAN', name: 'Financial Planning', displayName: 'Financial Planning', description: '' },
  { id: 'MOD_FAAP_FIN_STATEMENTS', name: 'Financial Statements', displayName: 'Financial Statements', description: '' },
  { id: 'MOD_FAAP_MGMT_REPORTING', name: 'Management Reporting', displayName: 'Management Reporting', description: '' },
  { id: 'MOD_FAAP_AUDIT', name: 'Audit', displayName: 'Audit', description: '' },
  { id: 'MOD_FAAP_COMPLIANCE', name: 'Compliance', displayName: 'Compliance', description: '' },
  { id: 'MOD_FAAP_PERIOD_CLOSE', name: 'Period Close', displayName: 'Period Close', description: '' },
  { id: 'MOD_FAAP_PERIOD_LOCK', name: 'Period Lock', displayName: 'Period Lock', description: '' },
  { id: 'MOD_FAAP_MAKER_CHECKER', name: 'Maker-Checker', displayName: 'Maker-Checker', description: '' },
  { id: 'MOD_FAAP_SOD', name: 'Segregation of Duties', displayName: 'Segregation of Duties', description: '' },

  // Church Modules
  { id: 'MOD_CH_MEMBERSHIP', name: 'Membership', displayName: 'Membership', description: '' },
  { id: 'MOD_CH_VISITOR_MGMT', name: 'Visitor Management', displayName: 'Visitor Management', description: '' },
  { id: 'MOD_CH_MEMBER_REG', name: 'Member Registration', displayName: 'Member Registration', description: '' },
  { id: 'MOD_CH_FAMILY_MGMT', name: 'Family Management', displayName: 'Family Management', description: '' },
  { id: 'MOD_CH_ATTENDANCE', name: 'Attendance', displayName: 'Attendance', description: '' },
  { id: 'MOD_CH_PASTORAL_CARE', name: 'Pastoral Care', displayName: 'Pastoral Care', description: '' },
  { id: 'MOD_CH_COUNSELLING', name: 'Counselling', displayName: 'Counselling', description: '' },
  { id: 'MOD_CH_PRAYER_REQS', name: 'Prayer Requests', displayName: 'Prayer Requests', description: '' },
  { id: 'MOD_CH_DISCIPLESHIP', name: 'Discipleship', displayName: 'Discipleship', description: '' },
  { id: 'MOD_CH_BIBLE_STUDY', name: 'Bible Study', displayName: 'Bible Study', description: '' },
  { id: 'MOD_CH_SMALL_GROUPS', name: 'Small Groups', displayName: 'Small Groups', description: '' },
  { id: 'MOD_CH_MINISTRIES', name: 'Ministries', displayName: 'Ministries', description: '' },
  { id: 'MOD_CH_VOLUNTEERS', name: 'Volunteers', displayName: 'Volunteers', description: '' },
  { id: 'MOD_CH_EVENTS', name: 'Events', displayName: 'Events', description: '' },
  { id: 'MOD_CH_CALENDAR', name: 'Calendar', displayName: 'Calendar', description: '' },
  { id: 'MOD_CH_WORSHIP_PLAN', name: 'Worship Planning', displayName: 'Worship Planning', description: '' },
  { id: 'MOD_CH_SERMON_MGMT', name: 'Sermon/Content Management', displayName: 'Sermon Management', description: '' },
  { id: 'MOD_CH_YOUTH', name: 'Youth', displayName: 'Youth', description: '' },
  { id: 'MOD_CH_CHILDREN', name: 'Children', displayName: 'Children', description: '' },
  { id: 'MOD_CH_MISSIONS', name: 'Missions', displayName: 'Missions', description: '' },
  { id: 'MOD_CH_EVANGELISM', name: 'Evangelism', displayName: 'Evangelism', description: '' },
  { id: 'MOD_CH_OUTREACH', name: 'Outreach', displayName: 'Outreach', description: '' },
  { id: 'MOD_CH_DONATIONS', name: 'Donations', displayName: 'Donations', description: '' },
  { id: 'MOD_CH_TITHES', name: 'Tithes', displayName: 'Tithes', description: '' },
  { id: 'MOD_CH_OFFERINGS', name: 'Offerings', displayName: 'Offerings', description: '' },
  { id: 'MOD_CH_PLEDGES', name: 'Pledges', displayName: 'Pledges', description: '' },
  { id: 'MOD_CH_FUNDRAISING', name: 'Fundraising', displayName: 'Fundraising', description: '' },
  { id: 'MOD_CH_FINANCE', name: 'Finance', displayName: 'Finance', description: '' },
  { id: 'MOD_CH_BUDGET', name: 'Budget', displayName: 'Budget', description: '' },
  { id: 'MOD_CH_VOTE_BOOK', name: 'Vote Book', displayName: 'Vote Book', description: '' },
  { id: 'MOD_CH_CASH_BOOK', name: 'Cash Book', displayName: 'Cash Book', description: '' },
  { id: 'MOD_CH_EXPENSES', name: 'Expenses', displayName: 'Expenses', description: '' },
  { id: 'MOD_CH_PROCUREMENT', name: 'Procurement', displayName: 'Procurement', description: '' },
  { id: 'MOD_CH_INVENTORY', name: 'Inventory', displayName: 'Inventory', description: '' },
  { id: 'MOD_CH_ASSETS', name: 'Assets', displayName: 'Assets', description: '' },
  { id: 'MOD_CH_FACILITIES', name: 'Facilities', displayName: 'Facilities', description: '' },
  { id: 'MOD_CH_HR', name: 'HR', displayName: 'HR', description: '' },
  { id: 'MOD_CH_COMMUNICATION', name: 'Communication', displayName: 'Communication', description: '' },
  { id: 'MOD_CH_SMS', name: 'SMS', displayName: 'SMS', description: '' },
  { id: 'MOD_CH_EMAIL', name: 'Email', displayName: 'Email', description: '' },
  { id: 'MOD_CH_MEDIA', name: 'Media', displayName: 'Media', description: '' },
  { id: 'MOD_CH_REPORTS', name: 'Reports', displayName: 'Reports', description: '' },
  { id: 'MOD_CH_GOVERNANCE', name: 'Governance', displayName: 'Governance', description: '' },
  { id: 'MOD_CH_AUDIT', name: 'Audit', displayName: 'Audit', description: '' }
];

export const WorkflowRegistry: WorkflowDefinition[] = [
  // Keeping the existing ones and you can add more here.
  {
    id: 'WORKFLOW_UNIVERSITY_ADMISSION',
    name: 'University Admission Application',
    displayName: 'Admissions pipeline state machine',
    description: 'Transition path: SUBMITTED -> UNDER_REVIEW -> OFFER_MADE -> ACCEPTED',
    states: ['SUBMITTED', 'UNDER_REVIEW', 'OFFER_MADE', 'ACCEPTED', 'REJECTED'],
    initialState: 'SUBMITTED',
    formFields: [
      { name: 'fullName', label: 'Full Scholar Name', type: 'text', required: true, placeholder: 'Enter student legal name' },
      { name: 'email', label: 'Email Address', type: 'text', required: true, placeholder: 'scholar@gmail.com' },
      { name: 'phone', label: 'Mobile Number', type: 'text', required: true, placeholder: '+256...' },
      { name: 'selectedProgramme', label: 'Academic Programme', type: 'select', required: true, options: ['BSc Computer Science', 'Bachelor of Laws', 'BSc Information Technology', 'Vocational Web Dev'] },
      { name: 'guardianName', label: 'Guardian Name', type: 'text', required: true, placeholder: 'Grace Mukasa' },
      { name: 'guardianPhone', label: 'Guardian Mobile', type: 'text', required: true, placeholder: '+256...' }
    ]
  },
  {
    id: 'WORKFLOW_VOTE_BOOK_COMMIT',
    name: 'Vote Book Expenditure Requisition',
    displayName: 'Vote Book expenditure commitment',
    description: 'Checks allocated balance.',
    states: ['REQUISITION', 'CHECK_BALANCE', 'COMMITTED', 'OVERDRAFT_BLOCKED'],
    initialState: 'REQUISITION',
    formFields: [
      { name: 'voteCode', label: 'Budget Vote Head', type: 'select', required: true, options: ['V-RES-01', 'V-WEL-02', 'V-EST-03'] },
      { name: 'amount', label: 'Requisition Amount (UGX)', type: 'number', required: true },
      { name: 'memo', label: 'Expenditure Memo / Description', type: 'textarea', required: true, placeholder: 'Specify purpose of commitment' }
    ]
  }
];

export function calculateRegistryStats() {
  const eduPortals = PortalRegistry.filter(p => p.id.startsWith('EDU_')).length;
  const eduModules = ModuleRegistry.filter(m => m.id.startsWith('MOD_EDU_')).length;
  const eduDepts = DepartmentRegistry.filter(d => !d.id.startsWith('DEPT_DP_') && !d.id.startsWith('DEPT_FAAP_') && !d.id.startsWith('DEPT_CH_')).length;
  const eduOffices = OfficeRegistry.filter(o => o.id.startsWith('OFF_EDU_')).length;

  const dpPortals = PortalRegistry.filter(p => p.id.startsWith('DP_')).length;
  const dpModules = ModuleRegistry.filter(m => m.id.startsWith('MOD_DP_')).length;
  const dpDepts = DepartmentRegistry.filter(d => d.id.startsWith('DEPT_DP_')).length;

  const faapPortals = PortalRegistry.filter(p => p.id.startsWith('FAAP_')).length;
  const faapModules = ModuleRegistry.filter(m => m.id.startsWith('MOD_FAAP_')).length;
  const faapDepts = DepartmentRegistry.filter(d => d.id.startsWith('DEPT_FAAP_')).length;
  const faapOffices = OfficeRegistry.filter(o => o.id.startsWith('OFF_FAAP_')).length;

  const chPortals = PortalRegistry.filter(p => p.id.startsWith('CH_')).length;
  const chModules = ModuleRegistry.filter(m => m.id.startsWith('MOD_CH_')).length;
  const chDepts = DepartmentRegistry.filter(d => d.id.startsWith('DEPT_CH_')).length;

  return {
    education: {
      templates: EducationTemplateRegistry.length,
      portals: eduPortals,
      roles: Array.from(new Set(PortalRegistry.filter(p => p.id.startsWith('EDU_')).flatMap(p => p.authorizedRoles))).length,
      directorates: DirectorateRegistry.filter(d => d.id.startsWith('DIR_EDU_')).length,
      departments: eduDepts,
      offices: eduOffices,
      modules: eduModules,
      submodules: eduModules * 2,
      workflows: 11,
      forms: 39,
      reports: 24,
      apis: 15,
      integrations: 7,
      webWorkspaces: eduPortals,
      mobileWorkspaces: 8,
      governanceStructures: 4
    },
    digitalPay: {
      portals: dpPortals,
      roles: Array.from(new Set(PortalRegistry.filter(p => p.id.startsWith('DP_')).flatMap(p => p.authorizedRoles))).length,
      departments: dpDepts,
      offices: 0,
      modules: dpModules,
      submodules: dpModules * 2,
      workflows: 4,
      forms: 12,
      reports: 18,
      apis: 22,
      integrations: 8,
      webWorkspaces: dpPortals,
      mobileWorkspaces: 3,
      governanceStructures: 1
    },
    faap: {
      portals: faapPortals,
      roles: Array.from(new Set(PortalRegistry.filter(p => p.id.startsWith('FAAP_')).flatMap(p => p.authorizedRoles))).length,
      departments: faapDepts,
      offices: faapOffices,
      modules: faapModules,
      submodules: faapModules * 2,
      workflows: 6,
      forms: 15,
      reports: 30,
      apis: 14,
      integrations: 5,
      webWorkspaces: faapPortals,
      mobileWorkspaces: 2,
      governanceStructures: 2
    },
    church: {
      templates: ChurchTemplateRegistry.length,
      portals: chPortals,
      roles: Array.from(new Set(PortalRegistry.filter(p => p.id.startsWith('CH_')).flatMap(p => p.authorizedRoles))).length,
      departments: chDepts,
      offices: 0,
      modules: chModules,
      submodules: chModules * 2,
      workflows: 5,
      forms: 18,
      reports: 15,
      apis: 8,
      integrations: 4,
      webWorkspaces: chPortals,
      mobileWorkspaces: 4,
      governanceStructures: 3
    }
  };
}
`;

fs.writeFileSync('src/products/registries.ts', content);
