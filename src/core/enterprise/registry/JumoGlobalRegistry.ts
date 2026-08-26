import { 
  Building2, Users, BookOpen, Clipboard, DollarSign, Activity, Zap, 
  Search, Plus, CheckCircle, Clock, ShieldAlert, ArrowRight, Save,
  Trash2, Edit, AlertCircle, HelpCircle, FileText, CheckSquare, 
  Settings, ArrowRightLeft, FileSpreadsheet, Eye, RefreshCw,
  Landmark, CreditCard, GraduationCap, Globe, ShieldCheck, 
  Briefcase, Baby, HeartPulse, Heart, Layers, TrendingUp,
  Cpu, Lock, Sparkles, Box, Mail, Gavel, LayoutGrid, Award,
  TestTube, Cloud, Send, Smartphone, BarChart2,
  Code, Package, Calendar, Hash, Utensils, Bus, Coins, Hammer,
  MapPin, Gift
} from 'lucide-react';
import { JumoModule, JumoCapability } from './types';


export const GlobalModuleRegistry: JumoModule[] = [
  // --- FINTECH: FINANCIAL ACCOUNTING & FAAP BACKBONE ---
  { id: 'FAM_LEDGER', productId: 'JUMO-FINTECH', name: 'General Ledger & FAAP Core', description: 'Institutional double-entry ledger with automated reconciliation.', icon: Landmark, isCore: true, status: 'ACTIVE', version: 'v16.2.0', owner: 'Treasury' },
  { id: 'FAM_COA', productId: 'JUMO-FINTECH', name: 'Chart of Accounts', description: 'Hierarchical structure of institutional accounts.', icon: LayoutGrid, isCore: true, status: 'ACTIVE', version: 'v2.0.0', owner: 'Treasury' },
  { id: 'FAM_JOURNAL', productId: 'JUMO-FINTECH', name: 'General Journal', description: 'Primary entry point for financial transactions.', icon: FileText, isCore: true, status: 'ACTIVE', version: 'v2.0.0', owner: 'Treasury' },
  { id: 'FAM_CASHBOOK', productId: 'JUMO-FINTECH', name: 'Cash Books (Single/Double/Triple)', description: 'Multi-column cash, bank, and discount tracking.', icon: DollarSign, isCore: true, status: 'ACTIVE', version: 'v3.0.0', owner: 'Treasury' },
  { id: 'FAM_VOTE_BOOK', productId: 'JUMO-FINTECH', name: 'Vote Book & Budgetary Control', description: 'Budgetary encumbrance and allocation tracking.', icon: Layers, isCore: true, status: 'ACTIVE', version: 'v2.5.0', owner: 'Treasury' },
  { id: 'FAM_BUDGET', productId: 'JUMO-FINTECH', name: 'Budget Planning & Analysis', description: 'Institutional budgeting and variance reporting.', icon: BarChart2, isCore: true, status: 'ACTIVE', version: 'v2.0.0', owner: 'Treasury' },
  { id: 'FAM_FIXED_ASSETS', productId: 'JUMO-FINTECH', name: 'Fixed Asset Management', description: 'Depreciation, disposal, and asset tracking.', icon: Building2, isCore: false, status: 'ACTIVE', version: 'v1.5.0', owner: 'Treasury' },
  { id: 'FAM_INVENTORY', productId: 'JUMO-FINTECH', name: 'Inventory & Stock Control', description: 'Store management and stock valuation.', icon: Package, isCore: false, status: 'ACTIVE', version: 'v2.0.0', owner: 'Treasury' },
  { id: 'FAM_TAX_REVENUE', productId: 'JUMO-FINTECH', name: 'Tax & Revenue Orchestration', description: 'Automated tax and fee orchestration.', icon: FileText, isCore: false, status: 'ACTIVE', version: 'v2.1.0', owner: 'Treasury' },
  { id: 'FAM_PAYROLL', productId: 'JUMO-FINTECH', name: 'Payroll & Salary Processing', description: 'Mass salary disbursement and tax sync.', icon: Users, isCore: false, status: 'ACTIVE', version: 'v2.2.0', owner: 'HR Finance' },
  { id: 'FAM_AUDIT', productId: 'JUMO-FINTECH', name: 'Auditor Workspace', description: 'Continuous audit and compliance workspace.', icon: ShieldCheck, isCore: true, status: 'ACTIVE', version: 'v3.0.0', owner: 'Compliance' },
  { id: 'FAM_RECEIVABLES', productId: 'JUMO-FINTECH', name: 'Accounts Receivable', description: 'Customer billing and credit control.', icon: ArrowRightLeft, isCore: true, status: 'ACTIVE', version: 'v2.0.0', owner: 'Treasury' },
  { id: 'FAM_PAYABLES', productId: 'JUMO-FINTECH', name: 'Accounts Payable', description: 'Vendor management and procurement settlement.', icon: ArrowRightLeft, isCore: true, status: 'ACTIVE', version: 'v2.0.0', owner: 'Treasury' },
  { id: 'FAM_BANK_RECON', productId: 'JUMO-FINTECH', name: 'Bank Reconciliation', description: 'Automated bank statement matching.', icon: RefreshCw, isCore: true, status: 'ACTIVE', version: 'v2.0.0', owner: 'Treasury' },
  { id: 'FAM_PROJECTS', productId: 'JUMO-FINTECH', name: 'Project Accounting', description: 'Grant and project tracking.', icon: LayoutGrid, isCore: false, status: 'ACTIVE', version: 'v1.0.0', owner: 'Treasury' },

  // --- FINTECH: PAYMENTS & SWITCHING ---
  { id: 'FAM_PAY_SWITCH', productId: 'JUMO-FINTECH', name: 'Universal Payment Switch', description: 'ISO 8583/20022 routing and authorization.', icon: RefreshCw, isCore: true, status: 'ACTIVE', version: 'v14.1.0', owner: 'Payments' },
  { id: 'FAM_MOBILE_MONEY', productId: 'JUMO-FINTECH', name: 'Mobile Money Core', description: 'Telco-agnostic mobile wallet rails.', icon: Smartphone, isCore: true, status: 'ACTIVE', version: 'v12.4.0', owner: 'Payments' },
  { id: 'FAM_PAYMENT_GATEWAY', productId: 'JUMO-FINTECH', name: 'Payment Gateway', description: 'E-commerce and checkout infrastructure.', icon: CreditCard, isCore: false, status: 'ACTIVE', version: 'v4.0.0', owner: 'Payments' },
  { id: 'FAM_COLLECTIONS', productId: 'JUMO-FINTECH', name: 'Institutional Collections', description: 'Fee and tithe PRN engine.', icon: ArrowRight, isCore: false, status: 'ACTIVE', version: 'v3.5.0', owner: 'Payments' },
  { id: 'FAM_PAYOUTS', productId: 'JUMO-FINTECH', name: 'Mass Payouts', description: 'Bulk disbursements to bank/wallet.', icon: Send, isCore: false, status: 'ACTIVE', version: 'v3.2.0', owner: 'Payments' },
  { id: 'FAM_PRN_ENGINE', productId: 'JUMO-FINTECH', name: 'PRN Generation Engine', description: 'Payment Reference Number management.', icon: Hash, isCore: true, status: 'ACTIVE', version: 'v1.0.0', owner: 'Payments' },

  // --- FINTECH: BANKING & LENDING ---
  { id: 'FAM_DIGITAL_BANKING', productId: 'JUMO-FINTECH', name: 'Digital Banking Core', description: 'Retail and corporate current accounts.', icon: Landmark, isCore: true, status: 'ACTIVE', version: 'v3.0.0', owner: 'Banking' },
  { id: 'FAM_SACCO', productId: 'JUMO-FINTECH', name: 'SACCO Financial Core', description: 'Shares, savings, and member loans.', icon: Building2, isCore: true, status: 'ACTIVE', version: 'v5.0.0', owner: 'Banking' },
  { id: 'FAM_LENDING', productId: 'JUMO-FINTECH', name: 'Lending & Credit Engine', description: 'Underwriting and loan servicing.', icon: TrendingUp, isCore: true, status: 'ACTIVE', version: 'v4.5.0', owner: 'Banking' },
  { id: 'FAM_TRADE_FINANCE', productId: 'JUMO-FINTECH', name: 'Trade Finance', description: 'LC and Guarantees.', icon: Globe, isCore: false, status: 'ACTIVE', version: 'v1.0.0', owner: 'Banking' },
  { id: 'FAM_INSURANCE', productId: 'JUMO-FINTECH', name: 'Insurance Core', description: 'Policies and claims.', icon: ShieldCheck, isCore: false, status: 'ACTIVE', version: 'v1.0.0', owner: 'Banking' },
  { id: 'FAM_CAPITAL_MARKETS', productId: 'JUMO-FINTECH', name: 'Capital Markets', description: 'Securities and custody.', icon: BarChart2, isCore: false, status: 'ACTIVE', version: 'v1.0.0', owner: 'Banking' },
  { id: 'FAM_COMPLIANCE_AML', productId: 'JUMO-FINTECH', name: 'Compliance & AML', description: 'Sanctions screening and monitoring.', icon: ShieldAlert, isCore: true, status: 'ACTIVE', version: 'v2.0.0', owner: 'Compliance' },

  // --- EDUCATION: NURSERY & PRIMARY ---
  { id: 'MOD_EDU_ADMISSIONS', productId: 'JUMO-NURSERY-PRIMARY-ERP', name: 'Admissions Office', description: 'Exhaustive student onboarding.', icon: Clipboard, isCore: true, status: 'ACTIVE', version: 'v3.0.0', owner: 'Registrar' },
  { id: 'MOD_EDU_SIS', productId: 'JUMO-NURSERY-PRIMARY-ERP', name: 'Student Registry', description: 'Institutional SIS profiles.', icon: Users, isCore: true, status: 'ACTIVE', version: 'v3.0.0', owner: 'Registrar' },
  { id: 'MOD_EDU_ECD', productId: 'JUMO-NURSERY-PRIMARY-ERP', name: 'ECD & Nursery Academics', description: 'Milestones and learner profiles.', icon: Baby, isCore: true, status: 'ACTIVE', version: 'v1.0.0', owner: 'Academic' },
  { id: 'MOD_EDU_PRIMARY', productId: 'JUMO-NURSERY-PRIMARY-ERP', name: 'Primary Academics', description: 'Curriculum and assessment.', icon: BookOpen, isCore: true, status: 'ACTIVE', version: 'v2.5.0', owner: 'Academic' },
  { id: 'MOD_EDU_ATTENDANCE', productId: 'JUMO-NURSERY-PRIMARY-ERP', name: 'Daily Attendance', description: 'Roll calls and notifications.', icon: CheckSquare, isCore: true, status: 'ACTIVE', version: 'v1.0.0', owner: 'Academic' },
  { id: 'MOD_EDU_FINANCE', productId: 'JUMO-NURSERY-PRIMARY-ERP', name: 'Bursar (FAAP)', description: 'Fees and vote books.', icon: DollarSign, isCore: true, status: 'ACTIVE', version: 'v4.0.0', owner: 'Bursar' },
  { id: 'MOD_EDU_CLINIC', productId: 'JUMO-NURSERY-PRIMARY-ERP', name: 'Health & Clinic', description: 'Medical records and immunization.', icon: HeartPulse, isCore: false, status: 'ACTIVE', version: 'v1.0.0', owner: 'Welfare' },
  { id: 'MOD_EDU_CATERING', productId: 'JUMO-NURSERY-PRIMARY-ERP', name: 'Catering & Meals', description: 'Feeding and diet management.', icon: Utensils, isCore: false, status: 'ACTIVE', version: 'v1.0.0', owner: 'Welfare' },
  { id: 'MOD_EDU_TRANSPORT', productId: 'JUMO-NURSERY-PRIMARY-ERP', name: 'Transport Office', description: 'Fleet and route management.', icon: Bus, isCore: false, status: 'ACTIVE', version: 'v1.0.0', owner: 'Ops' },
  { id: 'MOD_EDU_SAFEGUARDING', productId: 'JUMO-NURSERY-PRIMARY-ERP', name: 'Safeguarding', description: 'Child protection and incidents.', icon: ShieldAlert, isCore: true, status: 'ACTIVE', version: 'v1.0.0', owner: 'Welfare' },

  // --- EDUCATION: SECONDARY ---
  { id: 'MOD_SEC_PRINCIPAL', productId: 'JUMO-SECONDARY-ERP', name: 'Principal Office', description: 'Executive policies.', icon: ShieldCheck, isCore: true, status: 'ACTIVE', version: 'v1.0.0', owner: 'Executive' },
  { id: 'MOD_SEC_DOS', productId: 'JUMO-SECONDARY-ERP', name: 'DOS Office', description: 'Director of Studies.', icon: BookOpen, isCore: true, status: 'ACTIVE', version: 'v1.0.0', owner: 'Academic' },
  { id: 'MOD_SEC_DEAN', productId: 'JUMO-SECONDARY-ERP', name: 'Dean Office', description: 'Student dean and welfare.', icon: Users, isCore: true, status: 'ACTIVE', version: 'v1.0.0', owner: 'Welfare' },
  { id: 'MOD_SEC_UNEB', productId: 'JUMO-SECONDARY-ERP', name: 'UNEB Center', description: 'National exam center.', icon: Award, isCore: true, status: 'ACTIVE', version: 'v1.0.0', owner: 'Academic' },
  { id: 'MOD_SEC_ACADEMICS', productId: 'JUMO-SECONDARY-ERP', name: 'Secondary Academics', description: 'O & A Level combinations.', icon: BookOpen, isCore: true, status: 'ACTIVE', version: 'v1.0.0', owner: 'Academic' },
  { id: 'MOD_SEC_LABS', productId: 'JUMO-SECONDARY-ERP', name: 'Science Laboratories', description: 'Practical labs and chemicals.', icon: TestTube, isCore: false, status: 'ACTIVE', version: 'v1.0.0', owner: 'Science' },
  { id: 'MOD_SEC_BOARDING', productId: 'JUMO-SECONDARY-ERP', name: 'Boarding & Dorms', description: 'Roll call and housing.', icon: Building2, isCore: false, status: 'ACTIVE', version: 'v1.0.0', owner: 'Welfare' },
  { id: 'MOD_SEC_BURSAR', productId: 'JUMO-SECONDARY-ERP', name: 'Bursar Office', description: 'Full FAAP fee management.', icon: DollarSign, isCore: true, status: 'ACTIVE', version: 'v1.0.0', owner: 'Finance' },

  // --- CHURCH ---
  { id: 'MOD_CH_CENSUS', productId: 'JUMO-CHURCH', name: 'Christians Registry', description: 'Universal parishioner census.', icon: Users, isCore: true, status: 'ACTIVE', version: 'v1.8.0', owner: 'Parish' },
  { id: 'MOD_CH_SACRAMENTS', productId: 'JUMO-CHURCH', name: 'Sacramental Registry', description: 'Baptism, Matrimony, Confirmation.', icon: Heart, isCore: true, status: 'ACTIVE', version: 'v1.0.0', owner: 'Parish' },
  { id: 'MOD_CH_CLERGY', productId: 'JUMO-CHURCH', name: 'Clergy & Personnel', description: 'Priests and religious personnel.', icon: ShieldCheck, isCore: true, status: 'ACTIVE', version: 'v1.0.0', owner: 'Diocese' },
  { id: 'MOD_CH_FINANCE', productId: 'JUMO-CHURCH', name: 'Church Finance (FAAP)', description: 'Accounting and stewardship.', icon: DollarSign, isCore: true, status: 'ACTIVE', version: 'v1.0.0', owner: 'Treasurer' },
  { id: 'MOD_CH_TITHES', productId: 'JUMO-CHURCH', name: 'Tithe Stewardship', description: 'Member tithe and offering tracking.', icon: Coins, isCore: true, status: 'ACTIVE', version: 'v1.0.0', owner: 'Treasurer' },
  { id: 'MOD_CH_PROJECTS', productId: 'JUMO-CHURCH', name: 'Development Projects', description: 'Construction and mission projects.', icon: Hammer, isCore: false, status: 'ACTIVE', version: 'v1.0.0', owner: 'Projects' },
  { id: 'MOD_CH_SCC', productId: 'JUMO-CHURCH', name: 'Small Christian Communities', description: 'Village/Zone level groups.', icon: MapPin, isCore: false, status: 'ACTIVE', version: 'v1.0.0', owner: 'Parish' },
  { id: 'MOD_CH_WELFARE', productId: 'JUMO-CHURCH', name: 'Welfare & Charity', description: 'Social services and aid.', icon: Gift, isCore: false, status: 'ACTIVE', version: 'v1.0.0', owner: 'Parish' },

  // --- ALUMNI ---
  { id: 'MOD_ALUM_CENSUS', productId: 'JUMO-ALUMNI', name: 'Alumni Census', description: 'Exhaustive graduate records.', icon: Users, isCore: true, status: 'ACTIVE', version: 'v1.5.0', owner: 'Advancement' },
  { id: 'MOD_ALUM_CHAPTERS', productId: 'JUMO-ALUMNI', name: 'Global Chapters', description: 'Regional networks.', icon: Globe, isCore: true, status: 'ACTIVE', version: 'v1.0.0', owner: 'Advancement' },
  { id: 'MOD_ALUM_MEMBERSHIP', productId: 'JUMO-ALUMNI', name: 'Membership Registry', description: 'Subscription and verification.', icon: ShieldCheck, isCore: true, status: 'ACTIVE', version: 'v1.0.0', owner: 'Advancement' },
  { id: 'MOD_ALUM_GIVING', productId: 'JUMO-ALUMNI', name: 'Giving & Endowment', description: 'Fundraising and campaigns.', icon: HeartPulse, isCore: true, status: 'ACTIVE', version: 'v1.0.0', owner: 'Advancement' },
  { id: 'MOD_ALUM_CAREER', productId: 'JUMO-ALUMNI', name: 'Mentorship & Careers', description: 'Job boards and networking.', icon: Briefcase, isCore: false, status: 'ACTIVE', version: 'v1.0.0', owner: 'Advancement' }
];

export const GlobalCapabilityRegistry: JumoCapability[] = [
  // --- FINTECH: FAAP ---
  { id: 'CAP_FAAP_COA', moduleId: 'FAM_COA', name: 'Chart of Accounts', description: 'Manage institutional accounts tree.', icon: Landmark, implementationStatus: 'VERIFIED', securityLevel: 'TOP_SECRET', formId: 'FORM_FAAP_COA_ENTRY', workspaceDefinition: { type: 'REGISTRY', components: ['COA_TREE'] } },
  { id: 'CAP_FAAP_JOURNAL', moduleId: 'FAM_JOURNAL', name: 'General Journal', description: 'Execute double-entry journal postings.', icon: FileText, implementationStatus: 'VERIFIED', securityLevel: 'TOP_SECRET', formId: 'FORM_FAAP_JOURNAL_ENTRY', workspaceDefinition: { type: 'LEDGER', components: ['JOURNAL_LIST'] } },
  { id: 'CAP_FAAP_CASHBOOK', moduleId: 'FAM_CASHBOOK', name: 'Cash Book Registry', description: 'Manage cash and bank movements.', icon: DollarSign, implementationStatus: 'VERIFIED', securityLevel: 'TOP_SECRET', formId: 'FORM_FAAP_CASHBOOK_ENTRY', workspaceDefinition: { type: 'LEDGER', components: ['CASHBOOK_GRID'] } },
  { id: 'CAP_FAAP_VOTEBOOK', moduleId: 'FAM_VOTE_BOOK', name: 'Vote Book Entry', description: 'Record budget encumbrances.', icon: Layers, implementationStatus: 'VERIFIED', securityLevel: 'TOP_SECRET', formId: 'FORM_FAAP_VOTEBOOK_ENTRY', workspaceDefinition: { type: 'LEDGER', components: ['VOTEBOOK_GRID'] } },
  { id: 'CAP_FAAP_PAYABLES', moduleId: 'FAM_PAYABLES', name: 'Vendor Ledger', description: 'Manage payables and settlements.', icon: ArrowRightLeft, implementationStatus: 'VERIFIED', securityLevel: 'TOP_SECRET', formId: 'FORM_FAAP_VENDOR_REG', workspaceDefinition: { type: 'REGISTRY', components: ['VENDOR_LIST'] } },
  { id: 'CAP_FAAP_RECEIVABLES', moduleId: 'FAM_RECEIVABLES', name: 'Customer Ledger', description: 'Manage institutional receivables.', icon: ArrowRightLeft, implementationStatus: 'VERIFIED', securityLevel: 'TOP_SECRET', formId: 'FORM_FAAP_CUSTOMER_REG', workspaceDefinition: { type: 'REGISTRY', components: ['CUSTOMER_LIST'] } },
  { id: 'CAP_FAAP_RECON', moduleId: 'FAM_BANK_RECON', name: 'Statement Import', description: 'Import and reconcile bank statements.', icon: RefreshCw, implementationStatus: 'VERIFIED', securityLevel: 'TOP_SECRET', formId: 'FORM_FAAP_RECON_IMPORT', workspaceDefinition: { type: 'PROCESS', components: ['RECON_TOOL'] } },

  // --- FINTECH: PAYMENTS ---
  { id: 'CAP_PAY_SWITCH_TX', moduleId: 'FAM_PAY_SWITCH', name: 'Transaction Monitor', description: 'Real-time switch monitoring.', icon: Activity, implementationStatus: 'VERIFIED', securityLevel: 'TOP_SECRET', workspaceDefinition: { type: 'REGISTRY', components: ['TX_LOGS'] } },
  { id: 'CAP_MOMO_WALLET', moduleId: 'FAM_MOBILE_MONEY', name: 'Wallet Registry', description: 'Manage mobile money wallets.', icon: Smartphone, implementationStatus: 'VERIFIED', securityLevel: 'TOP_SECRET', formId: 'FORM_MOMO_WALLET_REG', workspaceDefinition: { type: 'REGISTRY', components: ['WALLET_GRID'] } },

  // --- EDUCATION: ADMISSIONS ---
  { id: 'CAP_EDU_ADMIT', moduleId: 'MOD_EDU_ADMISSIONS', name: 'New Admission', description: 'Onboard learner with exhaustive biodata.', icon: Clipboard, implementationStatus: 'VERIFIED', securityLevel: 'RESTRICTED', formId: 'FORM_EDU_STUDENT_REG', workspaceDefinition: { type: 'PROCESS', components: ['ADMISSION_WIZARD'] } },
  { id: 'CAP_EDU_SIS', moduleId: 'MOD_EDU_SIS', name: 'SIS Registry', description: 'Institutional student SIS profiles.', icon: Users, implementationStatus: 'VERIFIED', securityLevel: 'RESTRICTED', workspaceDefinition: { type: 'REGISTRY', components: ['STUDENT_LIST'] } },
  { id: 'CAP_EDU_FEES', moduleId: 'MOD_EDU_FINANCE', name: 'Fee Posting', description: 'Record student fee payments.', icon: DollarSign, implementationStatus: 'VERIFIED', securityLevel: 'RESTRICTED', formId: 'FORM_EDU_FEE_POSTING', workspaceDefinition: { type: 'LEDGER', components: ['FEES_GRID'] } },

  // --- CHURCH: CENSUS ---
  { id: 'CAP_CH_MEMBER_REG', moduleId: 'MOD_CH_CENSUS', name: 'Member Census', description: 'Institutional parishioner intake.', icon: Users, implementationStatus: 'VERIFIED', securityLevel: 'RESTRICTED', formId: 'FORM_CH_MEMBER_REG', workspaceDefinition: { type: 'PROCESS', components: ['MEMBER_WIZARD'] } },
  { id: 'CAP_CH_TITHE_REG', moduleId: 'MOD_CH_TITHES', name: 'Tithe Receipting', description: 'Record member tithes and offerings.', icon: Coins, implementationStatus: 'VERIFIED', securityLevel: 'RESTRICTED', formId: 'FORM_CH_TITHE_ENTRY', workspaceDefinition: { type: 'LEDGER', components: ['TITHE_GRID'] } },
  { id: 'CAP_CH_SACRAMENT_REG', moduleId: 'MOD_CH_SACRAMENTS', name: 'Sacramental Entry', description: 'Record Baptism, Matrimony, etc.', icon: Heart, implementationStatus: 'VERIFIED', securityLevel: 'RESTRICTED', formId: 'FORM_CH_SACRAMENTAL_ENTRY', workspaceDefinition: { type: 'REGISTRY', components: ['SACRAMENTAL_LIST'] } },

  // --- ALUMNI: ADVANCEMENT ---
  { id: 'CAP_ALUM_CENSUS_REG', moduleId: 'MOD_ALUM_CENSUS', name: 'Graduate Onboarding', description: 'Exhaustive alum census intake.', icon: Users, implementationStatus: 'VERIFIED', securityLevel: 'RESTRICTED', formId: 'FORM_ALUM_CENSUS_ENTRY', workspaceDefinition: { type: 'REGISTRY', components: ['ALUMNI_LIST'] } },
  { id: 'CAP_ALUM_GIVING_REG', moduleId: 'MOD_ALUM_GIVING', name: 'Campaign Donation', description: 'Endowment and project giving.', icon: HeartPulse, implementationStatus: 'VERIFIED', securityLevel: 'RESTRICTED', formId: 'FORM_ALUM_DONATION', workspaceDefinition: { type: 'PROCESS', components: ['DONATION_FLOW'] } }
];


import { ModuleRegistry } from '../../../products/registries';

export const getModuleById = (moduleId: string): JumoModule | undefined => {
  const safeGlobalMods = Array.isArray(GlobalModuleRegistry) ? GlobalModuleRegistry : [];
  const existing = safeGlobalMods.find(m => m && m.id === moduleId);
  if (existing) return existing;

  const safeProductMods = Array.isArray(ModuleRegistry) ? ModuleRegistry : [];
  const foundInProducts = safeProductMods.find(m => m && m.id === moduleId);
  if (foundInProducts) {
    let icon = LayoutGrid;
    if (foundInProducts.id.includes('ADMISSION') || foundInProducts.id.includes('STUDENT') || foundInProducts.id.includes('PUPIL')) icon = Users;
    else if (foundInProducts.id.includes('ACADEMIC') || foundInProducts.id.includes('CURRICULUM') || foundInProducts.id.includes('SUBJECT')) icon = BookOpen;
    else if (foundInProducts.id.includes('EXAM') || foundInProducts.id.includes('UNEB') || foundInProducts.id.includes('PLE')) icon = Award;
    else if (foundInProducts.id.includes('FINANCE') || foundInProducts.id.includes('BURSAR') || foundInProducts.id.includes('LEDGER') || foundInProducts.id.includes('BUDGET')) icon = DollarSign;
    else if (foundInProducts.id.includes('CLINIC') || foundInProducts.id.includes('HEALTH')) icon = HeartPulse;
    else if (foundInProducts.id.includes('GOVERNANCE') || foundInProducts.id.includes('BOG') || foundInProducts.id.includes('SMC')) icon = ShieldCheck;
    else if (foundInProducts.id.includes('CHURCH') || foundInProducts.id.includes('PARISH') || foundInProducts.id.includes('SACRAMENT')) icon = Heart;
    else if (foundInProducts.id.includes('ALUM')) icon = Globe;

    return {
      id: foundInProducts.id,
      productId: foundInProducts.productId,
      name: foundInProducts.displayName || foundInProducts.name,
      description: foundInProducts.description,
      icon,
      isCore: true,
      status: 'ACTIVE',
      version: 'v14.0 LTS',
      owner: 'JUMO Enterprise Kernel'
    };
  }

  return undefined;
};

export const getModulesForProduct = (productId: string) => {
  const safeGlobalMods = Array.isArray(GlobalModuleRegistry) ? GlobalModuleRegistry : [];
  const globalMods = safeGlobalMods.filter(m => m && m.productId === productId);
  
  const safeProductMods = Array.isArray(ModuleRegistry) ? ModuleRegistry : [];
  const prodMods = safeProductMods.filter(m => m && m.productId === productId).map(m => getModuleById(m.id)!).filter(Boolean);
  const combined = [...globalMods];
  prodMods.forEach(pm => {
    if (pm && !combined.find(c => c.id === pm.id)) {
      combined.push(pm);
    }
  });
  return combined;
};

export const getCapabilitiesForModule = (moduleId: string): JumoCapability[] => {
  const caps = GlobalCapabilityRegistry.filter(c => c.moduleId === moduleId);
  if (caps.length > 0) return caps;

  const mod = getModuleById(moduleId);
  if (!mod) return [];

  return [
    {
      id: `CAP_${moduleId}_OVERVIEW`,
      moduleId: moduleId,
      name: `${mod.name} Overview`,
      description: `Real-time status, KPIs, and metrics for ${mod.name}.`,
      icon: LayoutGrid,
      implementationStatus: 'VERIFIED',
      securityLevel: 'RESTRICTED',
      workspaceDefinition: { type: 'DASHBOARD', components: ['KPI_CARDS', 'ACTIVITY_FEED'] }
    },
    {
      id: `CAP_${moduleId}_LEDGER`,
      moduleId: moduleId,
      name: `${mod.name} Records & Ledger`,
      description: `Primary operational and financial records repository.`,
      icon: FileSpreadsheet,
      implementationStatus: 'VERIFIED',
      securityLevel: 'RESTRICTED',
      formId: `FORM_${moduleId}_ENTRY`,
      workspaceDefinition: { type: 'LEDGER', components: ['DATA_TABLE', 'EXPORT_ACTION'] }
    },
    {
      id: `CAP_${moduleId}_WORKFLOW`,
      moduleId: moduleId,
      name: `Approval Pipeline`,
      description: `Audit verification and state transitions.`,
      icon: CheckSquare,
      implementationStatus: 'VERIFIED',
      securityLevel: 'RESTRICTED',
      workspaceDefinition: { type: 'PROCESS', components: ['WORKFLOW_TIMELINE', 'TRANSITION_CONTROLS'] }
    },
    {
      id: `CAP_${moduleId}_ANALYTICS`,
      moduleId: moduleId,
      name: `Analytics & Reporting`,
      description: `Institutional reporting, compliance summaries, and export.`,
      icon: BarChart2,
      implementationStatus: 'VERIFIED',
      securityLevel: 'RESTRICTED',
      workspaceDefinition: { type: 'ANALYTICS', components: ['CHART_WIDGETS', 'EXPORT_PDF'] }
    }
  ];
};
