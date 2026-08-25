const fs = require('fs');

const registriesContent = `
// JUMO DIGITAL HYBRID PLATFORM - CORE REGISTRIES

export type ProductDefinition = { id: string; name: string; description: string };
export type TenantDefinition = { id: string; name: string; productId: string };
export type TemplateDefinition = { id: string; name: string; description: string; productId: string };
export type PortalDefinition = { id: string; displayName: string; productId: string; authorizedRoles: string[] };
export type OrganizationDefinition = { id: string; name: string; type: 'DIRECTORATE' | 'DEPARTMENT' | 'OFFICE'; parentId?: string };
export type RoleDefinition = { id: string; name: string; productId: string };
export type PermissionDefinition = { id: string; name: string; roleId: string };
export type ModuleDefinition = { id: string; name: string; displayName: string; description: string; productId: string };
export type SubmoduleDefinition = { id: string; name: string; moduleId: string };
export type CapabilityDefinition = { id: string; name: string; submoduleId: string };
export type WorkflowDefinition = { id: string; name: string; displayName: string; description: string; states: string[]; initialState: string; formFields: any[] };
export type FormDefinition = { id: string; name: string; moduleId: string };
export type NavigationGroup = { group: string; items: { id: string; label: string; iconName: string; path?: string }[] };
export type NavigationDefinition = { portalId: string; groups: NavigationGroup[] };
export type ConfigurationDefinition = { id: string; key: string; value: string };
export type ReportDefinition = { id: string; name: string; moduleId: string };
export type IntegrationDefinition = { id: string; name: string; type: string };
export type APIDefinition = { id: string; method: string; route: string };
export type NotificationDefinition = { id: string; type: string };
export type DeploymentDefinition = { id: string; environment: string };
export type CredentialDefinition = { username: string; portalId: string; role: string; tenantId: string };

// 1. Products
export const ProductRegistry: ProductDefinition[] = [
  { id: 'PROD_EDU', name: 'Education ERP', description: 'Universal Education Platform' },
  { id: 'PROD_DP', name: 'Digital Pay', description: 'Universal Payment Switch' },
  { id: 'PROD_FAAP', name: 'FAAP', description: 'Financial & Accounting Platform' },
  { id: 'PROD_CH', name: 'Church ERP', description: 'Church Management Platform' }
];

// 2. Tenants
export const TenantRegistry: TenantDefinition[] = [
  { id: 'TENANT_EDU_1', name: 'Alpha Academy', productId: 'PROD_EDU' },
  { id: 'TENANT_EDU_2', name: 'IIUI University', productId: 'PROD_EDU' },
  { id: 'TENANT_DP_1', name: 'JUMO Global Merchant', productId: 'PROD_DP' },
  { id: 'TENANT_FAAP_1', name: 'JUMO Master Treasury', productId: 'PROD_FAAP' },
  { id: 'TENANT_CH_1', name: 'Grace Diocese', productId: 'PROD_CH' }
];

// 3. Templates
export const EducationTemplateRegistry: TemplateDefinition[] = [
  { id: 'TMPL_EDU_PRE_PRIMARY', name: 'Pre-Primary & Primary', description: 'Early childhood and primary education', productId: 'PROD_EDU' },
  { id: 'TMPL_EDU_HIGH_SCHOOL', name: 'High School', description: 'Secondary education with boarding', productId: 'PROD_EDU' },
  { id: 'TMPL_EDU_VOCATIONAL', name: 'Vocational & Technical', description: 'Trades and practical training', productId: 'PROD_EDU' },
  { id: 'TMPL_EDU_UNIVERSITY', name: 'University / Institutional', description: 'Higher education management', productId: 'PROD_EDU' },
  { id: 'TMPL_EDU_HYBRID', name: 'Hybrid Institution', description: 'Combined primary, secondary, and vocational', productId: 'PROD_EDU' }
];

export const ChurchTemplateRegistry: TemplateDefinition[] = [
  { id: 'TMPL_CH_LOCAL', name: 'Local Church', description: 'Single congregation management', productId: 'PROD_CH' },
  { id: 'TMPL_CH_DIOCESE', name: 'Diocese', description: 'Regional administration', productId: 'PROD_CH' },
  { id: 'TMPL_CH_ARCHDIOCESE', name: 'Archdiocese', description: 'National administration', productId: 'PROD_CH' },
  { id: 'TMPL_CH_PROVINCE', name: 'Province / Conference', description: 'Provincial administration', productId: 'PROD_CH' },
  { id: 'TMPL_CH_HQ', name: 'Denominational Headquarters', description: 'Global administration', productId: 'PROD_CH' }
];

export const TemplateRegistry = [...EducationTemplateRegistry, ...ChurchTemplateRegistry];

// 4. Portals
export const PortalRegistry: PortalDefinition[] = [
  // Education Portals
  { id: 'EDU-PORTAL-STUDENT-0001', displayName: 'Student/Parent Portal', productId: 'PROD_EDU', authorizedRoles: ['ROLE_STUDENT', 'ROLE_PARENT'] },
  { id: 'EDU-PORTAL-STAFF-0001', displayName: 'Staff Portal', productId: 'PROD_EDU', authorizedRoles: ['ROLE_STAFF', 'ROLE_TEACHER'] },
  { id: 'EDU-PORTAL-REG-0001', displayName: 'Registrar Workspace', productId: 'PROD_EDU', authorizedRoles: ['ROLE_REGISTRAR'] },
  { id: 'EDU-PORTAL-BURSAR-0001', displayName: 'Bursary Workspace', productId: 'PROD_EDU', authorizedRoles: ['ROLE_BURSAR'] },
  { id: 'EDU-PORTAL-ADMIN-0001', displayName: 'System Administration', productId: 'PROD_EDU', authorizedRoles: ['ROLE_ADMIN'] },
  { id: 'EDU-PORTAL-HEALTH-0001', displayName: 'Clinic Portal', productId: 'PROD_EDU', authorizedRoles: ['ROLE_HEALTH_OFFICER'] },
  { id: 'EDU-PORTAL-LIBRARY-0001', displayName: 'Library Portal', productId: 'PROD_EDU', authorizedRoles: ['ROLE_LIBRARIAN'] },
  
  // Digital Pay Portals
  { id: 'DP-PORTAL-MERCHANT-0001', displayName: 'Merchant Portal', productId: 'PROD_DP', authorizedRoles: ['ROLE_MERCHANT'] },
  { id: 'DP-PORTAL-AGENT-0001', displayName: 'Agent Portal', productId: 'PROD_DP', authorizedRoles: ['ROLE_AGENT'] },
  { id: 'DP-PORTAL-OPS-0001', displayName: 'Operations Portal', productId: 'PROD_DP', authorizedRoles: ['ROLE_OPS'] },
  
  // FAAP Portals
  { id: 'FAAP-PORTAL-CONTROLLER-0001', displayName: 'Controller Portal', productId: 'PROD_FAAP', authorizedRoles: ['ROLE_CONTROLLER'] },
  { id: 'FAAP-PORTAL-ACCOUNTANT-0001', displayName: 'Accountant Portal', productId: 'PROD_FAAP', authorizedRoles: ['ROLE_ACCOUNTANT'] },
  { id: 'FAAP-PORTAL-AUDITOR-0001', displayName: 'Auditor Portal', productId: 'PROD_FAAP', authorizedRoles: ['ROLE_AUDITOR'] },
  
  // Church Portals
  { id: 'CH-PORTAL-MEMBER-0001', displayName: 'Member Portal', productId: 'PROD_CH', authorizedRoles: ['ROLE_MEMBER'] },
  { id: 'CH-PORTAL-BISHOP-0001', displayName: 'Bishop Portal', productId: 'PROD_CH', authorizedRoles: ['ROLE_BISHOP'] },
  { id: 'CH-PORTAL-ADMIN-0001', displayName: 'Diocesan Administrator', productId: 'PROD_CH', authorizedRoles: ['ROLE_CHURCH_ADMIN'] }
];

// 5. Credentials (Replaces string guessing)
export const CredentialRegistry: CredentialDefinition[] = [
  { username: 'student', portalId: 'EDU-PORTAL-STUDENT-0001', role: 'ROLE_STUDENT', tenantId: 'TENANT_EDU_1' },
  { username: 'registrar', portalId: 'EDU-PORTAL-REG-0001', role: 'ROLE_REGISTRAR', tenantId: 'TENANT_EDU_1' },
  { username: 'bursar', portalId: 'EDU-PORTAL-BURSAR-0001', role: 'ROLE_BURSAR', tenantId: 'TENANT_EDU_1' },
  { username: 'admin', portalId: 'EDU-PORTAL-ADMIN-0001', role: 'ROLE_ADMIN', tenantId: 'TENANT_EDU_1' },
  { username: 'merchant', portalId: 'DP-PORTAL-MERCHANT-0001', role: 'ROLE_MERCHANT', tenantId: 'TENANT_DP_1' },
  { username: 'controller', portalId: 'FAAP-PORTAL-CONTROLLER-0001', role: 'ROLE_CONTROLLER', tenantId: 'TENANT_FAAP_1' },
  { username: 'accountant', portalId: 'FAAP-PORTAL-ACCOUNTANT-0001', role: 'ROLE_ACCOUNTANT', tenantId: 'TENANT_FAAP_1' },
  { username: 'bishop', portalId: 'CH-PORTAL-BISHOP-0001', role: 'ROLE_BISHOP', tenantId: 'TENANT_CH_1' },
  { username: 'member', portalId: 'CH-PORTAL-MEMBER-0001', role: 'ROLE_MEMBER', tenantId: 'TENANT_CH_1' }
];

// 6. Navigation
export const NavigationRegistry: NavigationDefinition[] = [
  {
    portalId: 'EDU-PORTAL-STUDENT-0001',
    groups: [
      { group: 'Student Services', items: [
        { id: 'MOD_EDU_DASHBOARD', label: 'My Dashboard', iconName: 'LayoutDashboard' },
        { id: 'MOD_EDU_RESULTS', label: 'My Results', iconName: 'FileText' },
        { id: 'MOD_EDU_FEES', label: 'Fees & Invoices', iconName: 'CreditCard' },
        { id: 'MOD_EDU_TIMETABLE', label: 'Timetable', iconName: 'Calendar' }
      ]}
    ]
  },
  {
    portalId: 'EDU-PORTAL-REG-0001',
    groups: [
      { group: 'Registrar Operations', items: [
        { id: 'MOD_EDU_DASHBOARD', label: 'Dashboard', iconName: 'LayoutDashboard' },
        { id: 'MOD_EDU_ADMISSIONS', label: 'Admissions', iconName: 'Users' },
        { id: 'MOD_EDU_RESULTS_MGT', label: 'Results Management', iconName: 'FileText' },
        { id: 'MOD_EDU_TIMETABLE_MGT', label: 'Timetable Builder', iconName: 'Calendar' }
      ]}
    ]
  },
  {
    portalId: 'EDU-PORTAL-BURSAR-0001',
    groups: [
      { group: 'Finance Operations', items: [
        { id: 'MOD_EDU_DASHBOARD', label: 'Dashboard', iconName: 'LayoutDashboard' },
        { id: 'MOD_EDU_FEES_MGT', label: 'Fees Management', iconName: 'DollarSign' },
        { id: 'MOD_EDU_INVOICING', label: 'Invoicing', iconName: 'FileText' },
        { id: 'MOD_EDU_VOTE_BOOK', label: 'Vote Book', iconName: 'BookOpen' }
      ]}
    ]
  },
  {
    portalId: 'EDU-PORTAL-ADMIN-0001',
    groups: [
      { group: 'System Administration', items: [
        { id: 'MOD_EDU_DASHBOARD', label: 'Dashboard', iconName: 'LayoutDashboard' },
        { id: 'MOD_EDU_USERS', label: 'User Management', iconName: 'Users' },
        { id: 'MOD_EDU_SETTINGS', label: 'Configuration', iconName: 'Settings' }
      ]}
    ]
  },
  {
    portalId: 'DP-PORTAL-MERCHANT-0001',
    groups: [
      { group: 'Merchant Services', items: [
        { id: 'MOD_DP_DASHBOARD', label: 'Overview', iconName: 'LayoutDashboard' },
        { id: 'MOD_DP_TRANSACTIONS', label: 'Transactions', iconName: 'Activity' },
        { id: 'MOD_DP_SETTLEMENTS', label: 'Settlements', iconName: 'Landmark' }
      ]}
    ]
  },
  {
    portalId: 'FAAP-PORTAL-CONTROLLER-0001',
    groups: [
      { group: 'Financial Control', items: [
        { id: 'MOD_FAAP_DASHBOARD', label: 'Financial Overview', iconName: 'LayoutDashboard' },
        { id: 'MOD_FAAP_CHART', label: 'Chart of Accounts', iconName: 'BookOpen' },
        { id: 'MOD_FAAP_JOURNAL', label: 'General Journal', iconName: 'ArrowRightLeft' },
        { id: 'MOD_FAAP_REPORTS', label: 'Financial Statements', iconName: 'FileText' }
      ]}
    ]
  },
  {
    portalId: 'CH-PORTAL-BISHOP-0001',
    groups: [
      { group: 'Diocesan Governance', items: [
        { id: 'MOD_CH_DASHBOARD', label: 'Diocese Overview', iconName: 'LayoutDashboard' },
        { id: 'MOD_CH_CLERGY', label: 'Clergy Management', iconName: 'Users' },
        { id: 'MOD_CH_FINANCE', label: 'Financial Oversight', iconName: 'DollarSign' },
        { id: 'MOD_CH_GOVERNANCE', label: 'Governance Directives', iconName: 'Building' }
      ]}
    ]
  },
  {
    portalId: 'CH-PORTAL-MEMBER-0001',
    groups: [
      { group: 'Member Services', items: [
        { id: 'MOD_CH_DASHBOARD', label: 'My Overview', iconName: 'LayoutDashboard' },
        { id: 'MOD_CH_DONATIONS', label: 'My Giving', iconName: 'Heart' },
        { id: 'MOD_CH_EVENTS', label: 'Events & Calendar', iconName: 'Calendar' }
      ]}
    ]
  }
];

// 7. Modules
export const ModuleRegistry: ModuleDefinition[] = [
  { id: 'MOD_EDU_DASHBOARD', name: 'Dashboard', displayName: 'Dashboard', description: 'Overview', productId: 'PROD_EDU' },
  { id: 'MOD_EDU_ADMISSIONS', name: 'Admissions', displayName: 'Admissions', description: 'Student Admissions', productId: 'PROD_EDU' },
  { id: 'MOD_EDU_RESULTS_MGT', name: 'Results Management', displayName: 'Results Management', description: 'Academic Results', productId: 'PROD_EDU' },
  { id: 'MOD_EDU_TIMETABLE_MGT', name: 'Timetable Builder', displayName: 'Timetable Builder', description: 'Scheduling', productId: 'PROD_EDU' },
  { id: 'MOD_EDU_FEES_MGT', name: 'Fees Management', displayName: 'Fees Management', description: 'Student Fees', productId: 'PROD_EDU' },
  { id: 'MOD_EDU_INVOICING', name: 'Invoicing', displayName: 'Invoicing', description: 'Student Invoices', productId: 'PROD_EDU' },
  { id: 'MOD_EDU_VOTE_BOOK', name: 'Vote Book', displayName: 'Vote Book', description: 'Budget Tracking', productId: 'PROD_EDU' },
  { id: 'MOD_EDU_USERS', name: 'User Management', displayName: 'User Management', description: 'System Users', productId: 'PROD_EDU' },
  { id: 'MOD_EDU_SETTINGS', name: 'Configuration', displayName: 'Configuration', description: 'System Settings', productId: 'PROD_EDU' },
  { id: 'MOD_EDU_RESULTS', name: 'My Results', displayName: 'My Results', description: 'Student Results', productId: 'PROD_EDU' },
  { id: 'MOD_EDU_FEES', name: 'Fees & Invoices', displayName: 'Fees & Invoices', description: 'Student Financials', productId: 'PROD_EDU' },
  { id: 'MOD_EDU_TIMETABLE', name: 'Timetable', displayName: 'Timetable', description: 'Student Schedule', productId: 'PROD_EDU' },
  
  { id: 'MOD_DP_DASHBOARD', name: 'Dashboard', displayName: 'Dashboard', description: 'Overview', productId: 'PROD_DP' },
  { id: 'MOD_DP_TRANSACTIONS', name: 'Transactions', displayName: 'Transactions', description: 'Transaction Ledger', productId: 'PROD_DP' },
  { id: 'MOD_DP_SETTLEMENTS', name: 'Settlements', displayName: 'Settlements', description: 'Merchant Settlements', productId: 'PROD_DP' },
  
  { id: 'MOD_FAAP_DASHBOARD', name: 'Dashboard', displayName: 'Dashboard', description: 'Overview', productId: 'PROD_FAAP' },
  { id: 'MOD_FAAP_CHART', name: 'Chart of Accounts', displayName: 'Chart of Accounts', description: 'Account Structure', productId: 'PROD_FAAP' },
  { id: 'MOD_FAAP_JOURNAL', name: 'General Journal', displayName: 'General Journal', description: 'Journal Entries', productId: 'PROD_FAAP' },
  { id: 'MOD_FAAP_REPORTS', name: 'Financial Statements', displayName: 'Financial Statements', description: 'Reporting', productId: 'PROD_FAAP' },
  
  { id: 'MOD_CH_DASHBOARD', name: 'Dashboard', displayName: 'Dashboard', description: 'Overview', productId: 'PROD_CH' },
  { id: 'MOD_CH_CLERGY', name: 'Clergy Management', displayName: 'Clergy Management', description: 'Clergy Roster', productId: 'PROD_CH' },
  { id: 'MOD_CH_FINANCE', name: 'Financial Oversight', displayName: 'Financial Oversight', description: 'Church Finances', productId: 'PROD_CH' },
  { id: 'MOD_CH_GOVERNANCE', name: 'Governance Directives', displayName: 'Governance Directives', description: 'Church Governance', productId: 'PROD_CH' },
  { id: 'MOD_CH_DONATIONS', name: 'My Giving', displayName: 'My Giving', description: 'Member Donations', productId: 'PROD_CH' },
  { id: 'MOD_CH_EVENTS', name: 'Events & Calendar', displayName: 'Events & Calendar', description: 'Church Calendar', productId: 'PROD_CH' }
];

export const DirectorateRegistry: OrganizationDefinition[] = [];
export const DepartmentRegistry: OrganizationDefinition[] = [];
export const OfficeRegistry: OrganizationDefinition[] = [];
export const WorkflowRegistry: WorkflowDefinition[] = [
  {
    id: 'WORKFLOW_VOTE_BOOK_COMMIT',
    name: 'Vote Book Expenditure Requisition',
    displayName: 'Vote Book expenditure commitment',
    description: 'Checks allocated balance.',
    states: ['REQUISITION', 'CHECK_BALANCE', 'COMMITTED', 'OVERDRAFT_BLOCKED'],
    initialState: 'REQUISITION',
    formFields: []
  }
];

export const FormRegistry = [];
export const ReportRegistry = [];
export const APIRegistry = [];
export const IntegrationRegistry = [];

export function calculateRegistryStats() {
  return {
    education: {
      templates: EducationTemplateRegistry.length,
      portals: PortalRegistry.filter(p => p.productId === 'PROD_EDU').length,
      roles: Array.from(new Set(PortalRegistry.filter(p => p.productId === 'PROD_EDU').flatMap(p => p.authorizedRoles))).length,
      directorates: DirectorateRegistry.filter(d => d.id.startsWith('DIR_EDU_')).length,
      departments: DepartmentRegistry.filter(d => d.id.startsWith('DEPT_EDU_')).length,
      offices: OfficeRegistry.filter(o => o.id.startsWith('OFF_EDU_')).length,
      modules: ModuleRegistry.filter(m => m.productId === 'PROD_EDU').length,
      submodules: 0,
      workflows: WorkflowRegistry.filter(w => w.id.includes('EDU')).length,
      forms: FormRegistry.filter(f => f.id.includes('EDU')).length,
      reports: ReportRegistry.filter(r => r.id.includes('EDU')).length,
      apis: APIRegistry.filter(a => a.id.includes('EDU')).length,
      integrations: IntegrationRegistry.filter(i => i.id.includes('EDU')).length,
      webWorkspaces: PortalRegistry.filter(p => p.productId === 'PROD_EDU').length,
      mobileWorkspaces: PortalRegistry.filter(p => p.productId === 'PROD_EDU').length,
      governanceStructures: 0
    },
    digitalPay: {
      portals: PortalRegistry.filter(p => p.productId === 'PROD_DP').length,
      roles: Array.from(new Set(PortalRegistry.filter(p => p.productId === 'PROD_DP').flatMap(p => p.authorizedRoles))).length,
      departments: DepartmentRegistry.filter(d => d.id.startsWith('DEPT_DP_')).length,
      offices: OfficeRegistry.filter(o => o.id.startsWith('OFF_DP_')).length,
      modules: ModuleRegistry.filter(m => m.productId === 'PROD_DP').length,
      submodules: 0,
      workflows: 0,
      forms: 0,
      reports: 0,
      apis: 0,
      integrations: 0,
      webWorkspaces: PortalRegistry.filter(p => p.productId === 'PROD_DP').length,
      mobileWorkspaces: PortalRegistry.filter(p => p.productId === 'PROD_DP').length,
      governanceStructures: 0
    },
    faap: {
      portals: PortalRegistry.filter(p => p.productId === 'PROD_FAAP').length,
      roles: Array.from(new Set(PortalRegistry.filter(p => p.productId === 'PROD_FAAP').flatMap(p => p.authorizedRoles))).length,
      departments: DepartmentRegistry.filter(d => d.id.startsWith('DEPT_FAAP_')).length,
      offices: OfficeRegistry.filter(o => o.id.startsWith('OFF_FAAP_')).length,
      modules: ModuleRegistry.filter(m => m.productId === 'PROD_FAAP').length,
      submodules: 0,
      workflows: WorkflowRegistry.filter(w => w.id.includes('FAAP') || w.id.includes('VOTE_BOOK')).length,
      forms: 0,
      reports: 0,
      apis: 0,
      integrations: 0,
      webWorkspaces: PortalRegistry.filter(p => p.productId === 'PROD_FAAP').length,
      mobileWorkspaces: PortalRegistry.filter(p => p.productId === 'PROD_FAAP').length,
      governanceStructures: 0
    },
    church: {
      templates: ChurchTemplateRegistry.length,
      portals: PortalRegistry.filter(p => p.productId === 'PROD_CH').length,
      roles: Array.from(new Set(PortalRegistry.filter(p => p.productId === 'PROD_CH').flatMap(p => p.authorizedRoles))).length,
      departments: DepartmentRegistry.filter(d => d.id.startsWith('DEPT_CH_')).length,
      offices: OfficeRegistry.filter(o => o.id.startsWith('OFF_CH_')).length,
      modules: ModuleRegistry.filter(m => m.productId === 'PROD_CH').length,
      submodules: 0,
      workflows: 0,
      forms: 0,
      reports: 0,
      apis: 0,
      integrations: 0,
      webWorkspaces: PortalRegistry.filter(p => p.productId === 'PROD_CH').length,
      mobileWorkspaces: PortalRegistry.filter(p => p.productId === 'PROD_CH').length,
      governanceStructures: 0
    }
  };
}
`;

fs.writeFileSync('src/products/registries.ts', registriesContent);

const authServiceContent = `
import { CredentialRegistry, NavigationRegistry, PortalRegistry } from './registries';
import { LayoutDashboard, Users, Activity, ShieldCheck, Zap, Settings, CreditCard, Building, Heart, Calendar, DollarSign, FileText, ArrowRightLeft, BookOpen, Landmark, Briefcase } from 'lucide-react';

const iconMap: Record<string, any> = {
  LayoutDashboard, Users, Activity, ShieldCheck, Zap, Settings, CreditCard, Building, Heart, Calendar, DollarSign, FileText, ArrowRightLeft, BookOpen, Landmark, Briefcase
};

export const AuthService = {
  login: (username, password) => {
    // True Credential-based identity resolution. No string guessing.
    const credential = CredentialRegistry.find(c => c.username === username);
    if (!credential) {
      return { success: false, message: 'Invalid credentials. Unknown user.' };
    }
    
    // Resolve portal from the specific user's credential profile
    const portal = PortalRegistry.find(p => p.id === credential.portalId);
    if (!portal) {
       return { success: false, message: 'Portal resolution failed. User has no valid portal mapping.' };
    }
    
    return { 
      success: true, 
      portalId: credential.portalId, 
      tenantId: credential.tenantId,
      role: credential.role
    };
  },

  getNavigationForPortal: (portalId) => {
    // Navigation is completely registry-driven, no dynamic mapping or guessing.
    const navDef = NavigationRegistry.find(n => n.portalId === portalId);
    if (!navDef) return [];
    
    // Map string icon names to actual Lucide components
    return navDef.groups.map(g => ({
      group: g.group,
      items: g.items.map(item => ({
        id: item.id,
        label: item.label,
        icon: iconMap[item.iconName] || LayoutDashboard
      }))
    }));
  }
};
`;

fs.writeFileSync('src/products/AuthService.ts', authServiceContent);
console.log("Rewrote registries and AuthService successfully.");
