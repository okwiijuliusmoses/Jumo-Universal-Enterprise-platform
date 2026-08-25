import { Building2, Users, Landmark, BookOpen, Clipboard, DollarSign, Activity, Zap, Church, Heart, Globe, ShieldCheck, Layers } from 'lucide-react';

export interface PortalCapability {
  id: string;
  name: string;
  description: string;
  status: 'PRESERVED' | 'RECONSTRUCTED' | 'ENHANCED';
}

export interface ModulePortalManifest {
  id: string;
  productId: 'JUMO-FINTECH' | 'JUMO-PRIMARY-ERP' | 'JUMO-SECONDARY-ERP' | 'JUMO-NURSERY-ERP' | 'JUMO-NURSERY-PRIMARY-ERP' | 'JUMO-CHURCH' | 'JUMO-ALUMNI' | 'JUMO-CONTROL';
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
  // FINANCIAL CORE & LEDGER
  { id: 'PORTAL_FIN_CFO', productId: 'JUMO-FINTECH', portalName: 'CFO Office', category: 'Financial Core & Ledger', description: 'Global financial strategy.', iconName: 'Building2', route: '/fintech/cfo', authorizedRoles: ['ROLE_CFO'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_LEDGER', productId: 'JUMO-FINTECH', portalName: 'FAAP General Ledger', category: 'Financial Core & Ledger', description: 'Central double-entry control.', iconName: 'Landmark', route: '/fintech/gl', authorizedRoles: ['ROLE_CONTROLLER', 'ROLE_ACCOUNTANT'], verificationStatus: 'PRESERVED', capabilities: [] },
  { id: 'PORTAL_FIN_TAX', productId: 'JUMO-FINTECH', portalName: 'Tax & Revenue Management', category: 'Financial Core & Ledger', description: 'Statutory compliance engine.', iconName: 'DollarSign', route: '/fintech/tax', authorizedRoles: ['ROLE_TAX_OFFICER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_COMPLIANCE', productId: 'JUMO-FINTECH', portalName: 'Financial Compliance (AML)', category: 'Financial Core & Ledger', description: 'AML & Sanctions Guard.', iconName: 'ShieldCheck', route: '/fintech/compliance', authorizedRoles: ['ROLE_COMPLIANCE_OFFICER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_DATA_INT', productId: 'JUMO-FINTECH', portalName: 'Financial Data Intelligence', category: 'Financial Core & Ledger', description: 'Predictive finance AI.', iconName: 'Activity', route: '/fintech/data-int', authorizedRoles: ['ROLE_DATA_ANALYST'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_PAYROLL', productId: 'JUMO-FINTECH', portalName: 'Payroll & Salary Payments', category: 'Financial Core & Ledger', description: 'Mass salary disbursements.', iconName: 'Users', route: '/fintech/payroll', authorizedRoles: ['ROLE_PAYROLL_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },

  // PAYMENT & SWITCH OPERATIONS
  { id: 'PORTAL_FIN_SWITCH', productId: 'JUMO-FINTECH', portalName: 'Universal Payment Switch', category: 'Payment & Switch Operations', description: 'Payment rail monitoring.', iconName: 'Zap', route: '/fintech/switch', authorizedRoles: ['ROLE_SWITCH_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_MOMO', productId: 'JUMO-FINTECH', portalName: 'Mobile Money Core (USSD)', category: 'Payment & Switch Operations', description: 'MoMo rails.', iconName: 'Activity', route: '/fintech/momo', authorizedRoles: ['ROLE_MOMO_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_GATEWAY', productId: 'JUMO-FINTECH', portalName: 'Payment Gateway Checkout', category: 'Payment & Switch Operations', description: 'E-commerce checkout.', iconName: 'Globe', route: '/fintech/gateway', authorizedRoles: ['ROLE_GATEWAY_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_COLLECTIONS', productId: 'JUMO-FINTECH', portalName: 'Institutional Collections', category: 'Payment & Switch Operations', description: 'PRN engine.', iconName: 'DollarSign', route: '/fintech/collections', authorizedRoles: ['ROLE_COLLECTIONS_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_PAYOUTS', productId: 'JUMO-FINTECH', portalName: 'Bulk Payouts', category: 'Payment & Switch Operations', description: 'EFT disbursements.', iconName: 'DollarSign', route: '/fintech/payouts', authorizedRoles: ['ROLE_PAYOUTS_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_BANK_PAY', productId: 'JUMO-FINTECH', portalName: 'Bank Payments (EFT/RTGS)', category: 'Payment & Switch Operations', description: 'Interbank clearing.', iconName: 'Landmark', route: '/fintech/bank-pay', authorizedRoles: ['ROLE_BANK_PAY_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_BILLS', productId: 'JUMO-FINTECH', portalName: 'Utility & Bill Payments', category: 'Payment & Switch Operations', description: 'Biller aggregations.', iconName: 'Zap', route: '/fintech/bills', authorizedRoles: ['ROLE_BILLS_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_STABLECOIN', productId: 'JUMO-FINTECH', portalName: 'Stablecoin Settlement Rails', category: 'Payment & Switch Operations', description: 'Digital asset clearing.', iconName: 'Globe', route: '/fintech/stablecoin', authorizedRoles: ['ROLE_CRYPTO_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },

  // MERCHANT & CARD SERVICES
  { id: 'PORTAL_FIN_MERCH_SRV', productId: 'JUMO-FINTECH', portalName: 'Merchant Services', category: 'Merchant & Card Services', description: 'Dynamic QR & POS.', iconName: 'Building2', route: '/fintech/merch-srv', authorizedRoles: ['ROLE_MERCHANT_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_MERCH_ACQ', productId: 'JUMO-FINTECH', portalName: 'Merchant Acquiring', category: 'Merchant & Card Services', description: 'Card acquiring switch.', iconName: 'DollarSign', route: '/fintech/merch-acq', authorizedRoles: ['ROLE_ACQUIRING_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_CARDS', productId: 'JUMO-FINTECH', portalName: 'Cards Issuing', category: 'Merchant & Card Services', description: 'Card program management.', iconName: 'Globe', route: '/fintech/cards', authorizedRoles: ['ROLE_CARDS_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_ATM', productId: 'JUMO-FINTECH', portalName: 'ATM & Self-Service', category: 'Merchant & Card Services', description: 'ATM kiosk gateway.', iconName: 'Landmark', route: '/fintech/atm', authorizedRoles: ['ROLE_ATM_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },

  // GLOBAL BANKING & TREASURY
  { id: 'PORTAL_FIN_DIGI_WALLET', productId: 'JUMO-FINTECH', portalName: 'Digital Wallets', category: 'Global Banking & Treasury', description: 'Stored value facilities.', iconName: 'DollarSign', route: '/fintech/digi-wallet', authorizedRoles: ['ROLE_WALLET_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_MULTI_CURR', productId: 'JUMO-FINTECH', portalName: 'Multi-Currency Accounts', category: 'Global Banking & Treasury', description: 'Global balances.', iconName: 'Globe', route: '/fintech/multi-curr', authorizedRoles: ['ROLE_MULTI_CURR_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_GLOBAL_ACC', productId: 'JUMO-FINTECH', portalName: 'Global Accounts (vIBAN)', category: 'Global Banking & Treasury', description: 'Virtual IBAN routing.', iconName: 'Globe', route: '/fintech/global-acc', authorizedRoles: ['ROLE_GLOBAL_ACC_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_CROSS_BORDER', productId: 'JUMO-FINTECH', portalName: 'Cross-Border Payments', category: 'Global Banking & Treasury', description: 'FX clearing & SWIFT.', iconName: 'Globe', route: '/fintech/cross-border', authorizedRoles: ['ROLE_CROSS_BORDER_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_REMITTANCE', productId: 'JUMO-FINTECH', portalName: 'Diaspora Remittance', category: 'Global Banking & Treasury', description: 'P2P remittance platform.', iconName: 'Users', route: '/fintech/remittance', authorizedRoles: ['ROLE_REMITTANCE_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_FX', productId: 'JUMO-FINTECH', portalName: 'FX Dealing Desk', category: 'Global Banking & Treasury', description: 'Foreign exchange trading.', iconName: 'Activity', route: '/fintech/fx', authorizedRoles: ['ROLE_FX_DEALER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_TREASURY', productId: 'JUMO-FINTECH', portalName: 'Corporate Treasury', category: 'Global Banking & Treasury', description: 'Liquidity forecasting.', iconName: 'Landmark', route: '/fintech/treasury', authorizedRoles: ['ROLE_TREASURER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },

  // AGENCY, MICROFINANCE & LENDING
  { id: 'PORTAL_FIN_AGENT', productId: 'JUMO-FINTECH', portalName: 'Agent Banking Hub', category: 'Agency & Microfinance', description: 'Liquidity float management.', iconName: 'Users', route: '/fintech/agent', authorizedRoles: ['ROLE_AGENT_MANAGER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_DIGI_BANK', productId: 'JUMO-FINTECH', portalName: 'Core Digital Banking', category: 'Agency & Microfinance', description: 'Account servicing.', iconName: 'Landmark', route: '/fintech/digi-bank', authorizedRoles: ['ROLE_DIGI_BANK_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_SAVINGS', productId: 'JUMO-FINTECH', portalName: 'Savings & Deposits', category: 'Agency & Microfinance', description: 'Interest accrual.', iconName: 'DollarSign', route: '/fintech/savings', authorizedRoles: ['ROLE_SAVINGS_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_MICRO', productId: 'JUMO-FINTECH', portalName: 'Microfinance (JLG)', category: 'Agency & Microfinance', description: 'Joint Liability Group lending.', iconName: 'Users', route: '/fintech/micro', authorizedRoles: ['ROLE_MICROFINANCE_MANAGER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_LENDING', productId: 'JUMO-FINTECH', portalName: 'Credit Underwriting', category: 'Agency & Microfinance', description: 'Loan origination.', iconName: 'Activity', route: '/fintech/lending', authorizedRoles: ['ROLE_CREDIT_OFFICER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_SACCO', productId: 'JUMO-FINTECH', portalName: 'SACCO Core', category: 'Agency & Microfinance', description: 'Cooperative finance.', iconName: 'Building2', route: '/fintech/sacco', authorizedRoles: ['ROLE_SACCO_MANAGER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_EMBEDDED', productId: 'JUMO-FINTECH', portalName: 'Embedded Finance (BNPL)', category: 'Agency & Microfinance', description: 'B2B Buy Now Pay Later.', iconName: 'Zap', route: '/fintech/embedded', authorizedRoles: ['ROLE_BNPL_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_AGRI', productId: 'JUMO-FINTECH', portalName: 'Agricultural Finance', category: 'Agency & Microfinance', description: 'Value chain credit.', iconName: 'Layers', route: '/fintech/agri', authorizedRoles: ['ROLE_AGRI_FINANCE_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },

  // WEALTH, ASSETS & DEVELOPER
  { id: 'PORTAL_FIN_INVEST', productId: 'JUMO-FINTECH', portalName: 'Investment & Wealth', category: 'Wealth & Assets', description: 'Asset management.', iconName: 'Activity', route: '/fintech/invest', authorizedRoles: ['ROLE_WEALTH_MANAGER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_CUSTODY', productId: 'JUMO-FINTECH', portalName: 'Securities Custody', category: 'Wealth & Assets', description: 'Asset administration.', iconName: 'ShieldCheck', route: '/fintech/custody', authorizedRoles: ['ROLE_CUSTODIAN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_INSURANCE', productId: 'JUMO-FINTECH', portalName: 'Insurance & Insurtech', category: 'Wealth & Assets', description: 'Policy administration.', iconName: 'ShieldCheck', route: '/fintech/insurance', authorizedRoles: ['ROLE_INSURANCE_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_TRADE', productId: 'JUMO-FINTECH', portalName: 'Trade Finance (LC)', category: 'Wealth & Assets', description: 'Letter of credit.', iconName: 'Globe', route: '/fintech/trade', authorizedRoles: ['ROLE_TRADE_FINANCE_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_FIN_API', productId: 'JUMO-FINTECH', portalName: 'Financial Developer API', category: 'Wealth & Assets', description: 'API provisioning.', iconName: 'Zap', route: '/fintech/api', authorizedRoles: ['ROLE_FINTECH_DEVELOPER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] }
];

export const NURSERY_PRIMARY_ERP_PORTALS: ModulePortalManifest[] = [
  // SHARED GOVERNANCE & CORE
  { id: 'PORTAL_EDU_HEAD', productId: 'JUMO-NURSERY-PRIMARY-ERP', portalName: 'Head Teacher / Director Office', category: 'Governance & Core', description: 'Executive management for both ECD and Primary.', iconName: 'Building2', route: '/nursery-primary/head', authorizedRoles: ['ROLE_HEAD_TEACHER', 'ROLE_NURSERY_DIRECTOR'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_EDU_ADMISSION', productId: 'JUMO-NURSERY-PRIMARY-ERP', portalName: 'Shared Admissions', category: 'Governance & Core', description: 'Unified student intake.', iconName: 'Users', route: '/nursery-primary/admissions', authorizedRoles: ['ROLE_ADMISSIONS_OFFICER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_EDU_HR', productId: 'JUMO-NURSERY-PRIMARY-ERP', portalName: 'Staff HR', category: 'Governance & Core', description: 'Staff payroll and shifts.', iconName: 'Users', route: '/nursery-primary/hr', authorizedRoles: ['ROLE_HR_MANAGER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  
  // SHARED FINANCE
  { id: 'PORTAL_EDU_BURSAR', productId: 'JUMO-NURSERY-PRIMARY-ERP', portalName: 'Shared Bursar', category: 'Finance', description: 'Unified fees, FAAP cashbook.', iconName: 'DollarSign', route: '/nursery-primary/bursar', authorizedRoles: ['ROLE_BURSAR'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_EDU_STORES', productId: 'JUMO-NURSERY-PRIMARY-ERP', portalName: 'Stores & Procurement', category: 'Finance', description: 'Inventory management.', iconName: 'Layers', route: '/nursery-primary/stores', authorizedRoles: ['ROLE_STORES_MANAGER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },

  // PRIMARY ACADEMIC (P.1 - P.7)
  { id: 'PORTAL_PRI_DOS', productId: 'JUMO-NURSERY-PRIMARY-ERP', portalName: 'Primary DOS', category: 'Primary Academic', description: 'Thematic curriculum.', iconName: 'BookOpen', route: '/nursery-primary/dos', authorizedRoles: ['ROLE_DOS'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_PRI_EXAMS', productId: 'JUMO-NURSERY-PRIMARY-ERP', portalName: 'Examinations Office', category: 'Primary Academic', description: 'Marks entry.', iconName: 'Clipboard', route: '/nursery-primary/exams', authorizedRoles: ['ROLE_EXAM_OFFICER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  
  // NURSERY ACADEMIC (ECD)
  { id: 'PORTAL_NUR_MILESTONES', productId: 'JUMO-NURSERY-PRIMARY-ERP', portalName: 'ECD Milestones', category: 'Nursery Academic', description: 'Play-based planning & milestones.', iconName: 'Baby', route: '/nursery-primary/milestones', authorizedRoles: ['ROLE_ECD_COORDINATOR', 'ROLE_TEACHER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  
  // SHARED WELFARE & OPERATIONS
  { id: 'PORTAL_EDU_CLINIC', productId: 'JUMO-NURSERY-PRIMARY-ERP', portalName: 'School Clinic', category: 'Welfare', description: 'Sick bay and health tracking.', iconName: 'Heart', route: '/nursery-primary/clinic', authorizedRoles: ['ROLE_SCHOOL_NURSE'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_EDU_WELFARE', productId: 'JUMO-NURSERY-PRIMARY-ERP', portalName: 'Safeguarding & Discipline', category: 'Welfare', description: 'Pickup auth and conduct logs.', iconName: 'ShieldCheck', route: '/nursery-primary/safeguard', authorizedRoles: ['ROLE_SAFEGUARDING_OFFICER', 'ROLE_DISCIPLINE_MASTER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_EDU_TRANSPORT', productId: 'JUMO-NURSERY-PRIMARY-ERP', portalName: 'Transport', category: 'Welfare', description: 'Bus routing.', iconName: 'Zap', route: '/nursery-primary/transport', authorizedRoles: ['ROLE_TRANSPORT_MANAGER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_EDU_CATERING', productId: 'JUMO-NURSERY-PRIMARY-ERP', portalName: 'Catering & Nutrition', category: 'Welfare', description: 'Meal plans and diets.', iconName: 'Activity', route: '/nursery-primary/catering', authorizedRoles: ['ROLE_CATERING_MANAGER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] }
];

export const SECONDARY_ERP_PORTALS: ModulePortalManifest[] = [
  { id: 'PORTAL_SEC_PRINCIPAL', productId: 'JUMO-SECONDARY-ERP', portalName: 'Principal Office', category: 'Executive', description: 'Institutional governance and board reporting.', iconName: 'Building2', route: '/secondary/principal', authorizedRoles: ['ROLE_PRINCIPAL'], verificationStatus: 'VERIFIED', capabilities: [] },
  { id: 'PORTAL_SEC_SENATE', productId: 'JUMO-SECONDARY-ERP', portalName: 'Academic Senate', category: 'Executive', description: 'Curriculum standards and academic Senate policies.', iconName: 'Landmark', route: '/secondary/senate', authorizedRoles: ['ROLE_DEAN', 'ROLE_PRINCIPAL'], verificationStatus: 'VERIFIED', capabilities: [] },
  { id: 'PORTAL_SEC_REGISTRAR', productId: 'JUMO-SECONDARY-ERP', portalName: 'Admissions & Registrar', category: 'Admissions', description: 'Student enrollment and UNEB/UNEB registration.', iconName: 'Users', route: '/secondary/registrar', authorizedRoles: ['ROLE_REGISTRAR'], verificationStatus: 'VERIFIED', capabilities: [] },
  { id: 'PORTAL_SEC_ADMISSIONS', productId: 'JUMO-SECONDARY-ERP', portalName: 'Direct Admissions', category: 'Admissions', description: 'S.1 & S.5 entry criteria and admissions verification.', iconName: 'Users', route: '/secondary/admissions', authorizedRoles: ['ROLE_ADMISSIONS_OFFICER'], verificationStatus: 'VERIFIED', capabilities: [] },
  { id: 'PORTAL_SEC_DOS', productId: 'JUMO-SECONDARY-ERP', portalName: 'Director of Studies (DOS)', category: 'Academics', description: 'Curriculum coverage, timetable, and department rosters.', iconName: 'BookOpen', route: '/secondary/dos', authorizedRoles: ['ROLE_DOS'], verificationStatus: 'VERIFIED', capabilities: [] },
  { id: 'PORTAL_SEC_EXAMS', productId: 'JUMO-SECONDARY-ERP', portalName: 'Examinations Office', category: 'Academics', description: 'Continuous assessment, termly exams, and grade transcripts.', iconName: 'Clipboard', route: '/secondary/exams', authorizedRoles: ['ROLE_EXAM_OFFICER'], verificationStatus: 'VERIFIED', capabilities: [] },
  { id: 'PORTAL_SEC_BURSAR', productId: 'JUMO-SECONDARY-ERP', portalName: 'School Bursar', category: 'Finance', description: 'Tuition fees ledger, SchoolPay, and FAAP postings.', iconName: 'DollarSign', route: '/secondary/bursar', authorizedRoles: ['ROLE_BURSAR'], verificationStatus: 'VERIFIED', capabilities: [] },
  { id: 'PORTAL_SEC_PROC', productId: 'JUMO-SECONDARY-ERP', portalName: 'Procurement & Stores', category: 'Finance', description: 'Requisitions, stores inventory, and vendor purchase orders.', iconName: 'Layers', route: '/secondary/procurement', authorizedRoles: ['ROLE_STOREKEEPER'], verificationStatus: 'VERIFIED', capabilities: [] }
];

export const CHURCH_ERP_PORTALS: ModulePortalManifest[] = [
  // GOVERNANCE
  { id: 'PORTAL_CH_BISHOP', productId: 'JUMO-CHURCH', portalName: 'Bishop Office', category: 'Governance', description: 'Episcopal oversight.', iconName: 'ShieldCheck', route: '/church/bishop', authorizedRoles: ['ROLE_BISHOP'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_CH_SYNOD', productId: 'JUMO-CHURCH', portalName: 'Diocesan Synod', category: 'Governance', description: 'Policy records.', iconName: 'Users', route: '/church/synod', authorizedRoles: ['ROLE_SYNOD_SEC'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_CH_CHANCELLOR', productId: 'JUMO-CHURCH', portalName: 'Chancellor', category: 'Governance', description: 'Canonical affairs.', iconName: 'Building2', route: '/church/chancellor', authorizedRoles: ['ROLE_CHANCELLOR'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_CH_ARCH', productId: 'JUMO-CHURCH', portalName: 'Archdeaconry', category: 'Governance', description: 'Regional oversight.', iconName: 'Layers', route: '/church/archdeaconry', authorizedRoles: ['ROLE_ARCHDEACON'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },

  // MINISTRY
  { id: 'PORTAL_CH_PARISH', productId: 'JUMO-CHURCH', portalName: 'Parish Office', category: 'Ministry', description: 'Parish register.', iconName: 'Church', route: '/church/parish', authorizedRoles: ['ROLE_VICAR', 'ROLE_PARISH_PRIEST'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_CH_SACRAMENTS', productId: 'JUMO-CHURCH', portalName: 'Sacraments', category: 'Ministry', description: 'Registers.', iconName: 'Heart', route: '/church/sacraments', authorizedRoles: ['ROLE_PARISH_CLERK'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_CH_MEMBERS', productId: 'JUMO-CHURCH', portalName: 'Membership', category: 'Ministry', description: 'Census.', iconName: 'Users', route: '/church/membership', authorizedRoles: ['ROLE_MEMBERSHIP_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_CH_PASTORAL', productId: 'JUMO-CHURCH', portalName: 'Pastoral Care', category: 'Ministry', description: 'Visitation.', iconName: 'Heart', route: '/church/pastoral', authorizedRoles: ['ROLE_PASTOR'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_CH_EVENTS', productId: 'JUMO-CHURCH', portalName: 'Liturgy & Events', category: 'Ministry', description: 'Calendars.', iconName: 'Activity', route: '/church/liturgy', authorizedRoles: ['ROLE_LITURGIST'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_CH_MINISTRIES', productId: 'JUMO-CHURCH', portalName: 'Ministries', category: 'Ministry', description: 'Youth/Women.', iconName: 'Users', route: '/church/ministries', authorizedRoles: ['ROLE_MINISTRY_LEADER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },

  // FINANCE
  { id: 'PORTAL_CH_TREASURY', productId: 'JUMO-CHURCH', portalName: 'Diocesan Treasury', category: 'Finance', description: 'Quota.', iconName: 'Landmark', route: '/church/treasury', authorizedRoles: ['ROLE_DIOCESAN_TREASURER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_CH_CONTRIB', productId: 'JUMO-CHURCH', portalName: 'Contributions', category: 'Finance', description: 'Pledges.', iconName: 'DollarSign', route: '/church/contributions', authorizedRoles: ['ROLE_PARISH_TREASURER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_CH_BUDGET', productId: 'JUMO-CHURCH', portalName: 'Budgeting', category: 'Finance', description: 'Forecasting.', iconName: 'Activity', route: '/church/budget', authorizedRoles: ['ROLE_FINANCE_COMMITTEE'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_CH_PROJECTS', productId: 'JUMO-CHURCH', portalName: 'Projects', category: 'Finance', description: 'Building fund.', iconName: 'Layers', route: '/church/projects', authorizedRoles: ['ROLE_PROJECT_MANAGER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_CH_PAYROLL', productId: 'JUMO-CHURCH', portalName: 'Clergy Payroll', category: 'Finance', description: 'Stipends.', iconName: 'Users', route: '/church/payroll', authorizedRoles: ['ROLE_PAYROLL_ADMIN'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },

  // ADMIN
  { id: 'PORTAL_CH_CLERGY', productId: 'JUMO-CHURCH', portalName: 'Clergy HR', category: 'Admin', description: 'Deployments.', iconName: 'Users', route: '/church/hr', authorizedRoles: ['ROLE_HR_MANAGER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_CH_ASSETS', productId: 'JUMO-CHURCH', portalName: 'Assets', category: 'Admin', description: 'Properties.', iconName: 'Building2', route: '/church/assets', authorizedRoles: ['ROLE_ESTATES_MANAGER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_CH_COMM', productId: 'JUMO-CHURCH', portalName: 'Communications', category: 'Admin', description: 'Bulletins.', iconName: 'Globe', route: '/church/comm', authorizedRoles: ['ROLE_COMM_OFFICER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_CH_ARCHIVE', productId: 'JUMO-CHURCH', portalName: 'Archives', category: 'Admin', description: 'Preservation.', iconName: 'Clipboard', route: '/church/archives', authorizedRoles: ['ROLE_ARCHIVIST'], verificationStatus: 'RECONSTRUCTED', capabilities: [] }
];

export const ALUMNI_ERP_PORTALS: ModulePortalManifest[] = [
  // GOVERNANCE
  { id: 'PORTAL_ALUM_DIR', productId: 'JUMO-ALUMNI', portalName: 'Director Office', category: 'Governance', description: 'Advancement.', iconName: 'Building2', route: '/alumni/director', authorizedRoles: ['ROLE_ALUMNI_DIRECTOR'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_ALUM_BOARD', productId: 'JUMO-ALUMNI', portalName: 'Association Board', category: 'Governance', description: 'Elections.', iconName: 'ShieldCheck', route: '/alumni/board', authorizedRoles: ['ROLE_BOARD_MEMBER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  
  // RECORDS
  { id: 'PORTAL_ALUM_REGISTRAR', productId: 'JUMO-ALUMNI', portalName: 'Graduate Records', category: 'Records', description: 'Directory.', iconName: 'Users', route: '/alumni/records', authorizedRoles: ['ROLE_ALUMNI_REGISTRAR'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_ALUM_CHAPTERS', productId: 'JUMO-ALUMNI', portalName: 'Global Chapters', category: 'Records', description: 'Hubs.', iconName: 'Globe', route: '/alumni/chapters', authorizedRoles: ['ROLE_CHAPTER_LEADER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_ALUM_ENGAGE', productId: 'JUMO-ALUMNI', portalName: 'Engagement', category: 'Records', description: 'Scoring.', iconName: 'Activity', route: '/alumni/engagement', authorizedRoles: ['ROLE_ENGAGEMENT_OFFICER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_ALUM_COMM', productId: 'JUMO-ALUMNI', portalName: 'Communications', category: 'Records', description: 'Campaigns.', iconName: 'Zap', route: '/alumni/comm', authorizedRoles: ['ROLE_COMM_OFFICER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },

  // FINANCE
  { id: 'PORTAL_ALUM_FUND', productId: 'JUMO-ALUMNI', portalName: 'Endowment', category: 'Finance', description: 'Campaigns.', iconName: 'DollarSign', route: '/alumni/endowment', authorizedRoles: ['ROLE_FUND_MANAGER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_ALUM_GIVING', productId: 'JUMO-ALUMNI', portalName: 'Annual Giving', category: 'Finance', description: 'Pledges.', iconName: 'Heart', route: '/alumni/giving', authorizedRoles: ['ROLE_GIFT_OFFICER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_ALUM_RECONCILE', productId: 'JUMO-ALUMNI', portalName: 'Reconciliation', category: 'Finance', description: 'Receipts.', iconName: 'Landmark', route: '/alumni/reconciliation', authorizedRoles: ['ROLE_ACCOUNTANT'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },

  // PROGRAMS
  { id: 'PORTAL_ALUM_CAREER', productId: 'JUMO-ALUMNI', portalName: 'Career & Mentor', category: 'Programs', description: 'Job boards.', iconName: 'Users', route: '/alumni/career', authorizedRoles: ['ROLE_CAREER_COACH'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_ALUM_EVENTS', productId: 'JUMO-ALUMNI', portalName: 'Events & Reunions', category: 'Programs', description: 'Ticketing.', iconName: 'Activity', route: '/alumni/events', authorizedRoles: ['ROLE_EVENT_MANAGER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] },
  { id: 'PORTAL_ALUM_MERCH', productId: 'JUMO-ALUMNI', portalName: 'Merchandise', category: 'Programs', description: 'E-commerce.', iconName: 'Zap', route: '/alumni/merch', authorizedRoles: ['ROLE_STORE_MANAGER'], verificationStatus: 'RECONSTRUCTED', capabilities: [] }
];

export function getPortalsForProduct(productId: string): ModulePortalManifest[] {
  switch (productId) {
    case 'JUMO-FINTECH': return FINTECH_PORTALS;
    case 'JUMO-NURSERY-PRIMARY-ERP': return NURSERY_PRIMARY_ERP_PORTALS;
    case 'JUMO-SECONDARY-ERP': return SECONDARY_ERP_PORTALS;
    case 'JUMO-CHURCH': return CHURCH_ERP_PORTALS;
    case 'JUMO-ALUMNI': return ALUMNI_ERP_PORTALS;
    default: return [];
  }
}

export function getAllPortals(): ModulePortalManifest[] {
  return [
    ...FINTECH_PORTALS,
    ...NURSERY_PRIMARY_ERP_PORTALS,
    ...SECONDARY_ERP_PORTALS,
    ...CHURCH_ERP_PORTALS,
    ...ALUMNI_ERP_PORTALS
  ];
}
