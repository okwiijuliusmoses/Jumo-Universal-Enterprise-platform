import { Building2, Users, Landmark, BookOpen, Clipboard, DollarSign, Activity, Zap, Church, Heart, Globe, ShieldCheck, Layers } from 'lucide-react';

export interface ErpOffice {
  id: string;
  name: string;
  type: string;
  icon: any;
  portalId: string;
  description: string;
}

export interface ErpDepartment {
  id: string;
  name: string;
  type: string;
  offices: ErpOffice[];
}

export interface ErpProductStructure {
  productId: string;
  departments: ErpDepartment[];
}

export const ErpOrganizationalRegistry: ErpProductStructure[] = [
  {
    productId: 'JUMO-FINTECH',
    departments: [
      {
        id: 'DEPT_FIN_LEDGER', name: 'Financial Core & Ledger', type: 'FINANCE',
        offices: [
          { id: 'OFF_FIN_CFO', name: 'CFO Office', type: 'GOVERNANCE', icon: Building2, portalId: 'PORTAL_FIN_CFO', description: 'Global financial strategy, treasury oversight.' },
          { id: 'OFF_FIN_LEDGER', name: 'FAAP General Ledger', type: 'FINANCE', icon: Landmark, portalId: 'PORTAL_FIN_LEDGER', description: 'Central double-entry control and zero-parity auditing.' },
          { id: 'OFF_FIN_TAX', name: 'Tax & Revenue Management', type: 'FINANCE', icon: DollarSign, portalId: 'PORTAL_FIN_TAX', description: 'Statutory compliance and indirect tax engine.' },
          { id: 'OFF_FIN_COMPLIANCE', name: 'Financial Compliance (AML)', type: 'GOVERNANCE', icon: ShieldCheck, portalId: 'PORTAL_FIN_COMPLIANCE', description: 'AML, Sanctions Guard, and transaction monitoring.' },
          { id: 'OFF_FIN_DATA_INT', name: 'Financial Data Intelligence', type: 'INTELLIGENCE', icon: Activity, portalId: 'PORTAL_FIN_DATA_INT', description: 'Predictive finance AI and ML modeling.' },
          { id: 'OFF_FIN_PAYROLL', name: 'Payroll & Salary Payments', type: 'FINANCE', icon: Users, portalId: 'PORTAL_FIN_PAYROLL', description: 'Mass salary disbursements and payroll ledgers.' }
        ]
      },
      {
        id: 'DEPT_FIN_SWITCHING', name: 'Payment & Switch Operations', type: 'OPERATIONS',
        offices: [
          { id: 'OFF_FIN_SWITCH', name: 'Universal Payment Switch', type: 'OPERATIONS', icon: Zap, portalId: 'PORTAL_FIN_SWITCH', description: 'Payment rail monitoring and ISO 8583 processing.' },
          { id: 'OFF_FIN_MOMO', name: 'Mobile Money Core (USSD)', type: 'OPERATIONS', icon: Activity, portalId: 'PORTAL_FIN_MOMO', description: 'Safaricom M-Pesa, MTN MoMo, and Airtel Money rails.' },
          { id: 'OFF_FIN_GATEWAY', name: 'Payment Gateway Checkout', type: 'OPERATIONS', icon: Globe, portalId: 'PORTAL_FIN_GATEWAY', description: 'E-commerce checkout, APIs, and online acquiring.' },
          { id: 'OFF_FIN_COLLECTIONS', name: 'Institutional Collections', type: 'FINANCE', icon: DollarSign, portalId: 'PORTAL_FIN_COLLECTIONS', description: 'PRN engine and dynamic B2B collections.' },
          { id: 'OFF_FIN_PAYOUTS', name: 'Bulk Payouts', type: 'FINANCE', icon: DollarSign, portalId: 'PORTAL_FIN_PAYOUTS', description: 'High-throughput disbursement and EFTs.' },
          { id: 'OFF_FIN_BANK_PAY', name: 'Bank Payments (EFT/RTGS)', type: 'FINANCE', icon: Landmark, portalId: 'PORTAL_FIN_BANK_PAY', description: 'Interbank clearing and ACH settlement.' },
          { id: 'OFF_FIN_BILLS', name: 'Utility & Bill Payments', type: 'OPERATIONS', icon: Zap, portalId: 'PORTAL_FIN_BILLS', description: 'Biller aggregations (UMEME, NWSC).' },
          { id: 'OFF_FIN_STABLECOIN', name: 'Stablecoin Settlement Rails', type: 'OPERATIONS', icon: Globe, portalId: 'PORTAL_FIN_STABLECOIN', description: 'Digital asset clearing and on-chain settlement.' }
        ]
      },
      {
        id: 'DEPT_FIN_MERCHANT', name: 'Merchant & Card Services', type: 'OPERATIONS',
        offices: [
          { id: 'OFF_FIN_MERCH_SRV', name: 'Merchant Services', type: 'OPERATIONS', icon: Building2, portalId: 'PORTAL_FIN_MERCH_SRV', description: 'Dynamic QR, POS management, and terminals.' },
          { id: 'OFF_FIN_MERCH_ACQ', name: 'Merchant Acquiring', type: 'OPERATIONS', icon: DollarSign, portalId: 'PORTAL_FIN_MERCH_ACQ', description: 'Card acquiring switch.' },
          { id: 'OFF_FIN_CARDS', name: 'Cards Issuing', type: 'OPERATIONS', icon: Globe, portalId: 'PORTAL_FIN_CARDS', description: 'Virtual and physical card program management.' },
          { id: 'OFF_FIN_ATM', name: 'ATM & Self-Service', type: 'OPERATIONS', icon: Landmark, portalId: 'PORTAL_FIN_ATM', description: 'ATM kiosk gateway and monitoring.' }
        ]
      },
      {
        id: 'DEPT_FIN_GLOBAL', name: 'Global Banking & Treasury', type: 'FINANCE',
        offices: [
          { id: 'OFF_FIN_DIGI_WALLET', name: 'Digital Wallets', type: 'OPERATIONS', icon: DollarSign, portalId: 'PORTAL_FIN_DIGI_WALLET', description: 'Stored value facilities and e-wallets.' },
          { id: 'OFF_FIN_MULTI_CURR', name: 'Multi-Currency Accounts', type: 'FINANCE', icon: Globe, portalId: 'PORTAL_FIN_MULTI_CURR', description: 'Global balances and FX pairs.' },
          { id: 'OFF_FIN_GLOBAL_ACC', name: 'Global Accounts (vIBAN)', type: 'FINANCE', icon: Globe, portalId: 'PORTAL_FIN_GLOBAL_ACC', description: 'Virtual IBAN routing.' },
          { id: 'OFF_FIN_CROSS_BORDER', name: 'Cross-Border Payments', type: 'FINANCE', icon: Globe, portalId: 'PORTAL_FIN_CROSS_BORDER', description: 'FX clearing and SWIFT.' },
          { id: 'OFF_FIN_REMITTANCE', name: 'Diaspora Remittance', type: 'OPERATIONS', icon: Users, portalId: 'PORTAL_FIN_REMITTANCE', description: 'P2P remittance platform.' },
          { id: 'OFF_FIN_FX', name: 'FX Dealing Desk', type: 'FINANCE', icon: Activity, portalId: 'PORTAL_FIN_FX', description: 'Foreign exchange trading and margin.' },
          { id: 'OFF_FIN_TREASURY', name: 'Corporate Treasury', type: 'FINANCE', icon: Landmark, portalId: 'PORTAL_FIN_TREASURY', description: 'Liquidity forecasting and ALM.' }
        ]
      },
      {
        id: 'DEPT_FIN_AGENCY', name: 'Agency, Microfinance & Lending', type: 'OPERATIONS',
        offices: [
          { id: 'OFF_FIN_AGENT', name: 'Agent Banking Hub', type: 'OPERATIONS', icon: Users, portalId: 'PORTAL_FIN_AGENT', description: 'Liquidity float management.' },
          { id: 'OFF_FIN_DIGI_BANK', name: 'Core Digital Banking', type: 'FINANCE', icon: Landmark, portalId: 'PORTAL_FIN_DIGI_BANK', description: 'Account servicing and limits.' },
          { id: 'OFF_FIN_SAVINGS', name: 'Savings & Fixed Deposits', type: 'FINANCE', icon: DollarSign, portalId: 'PORTAL_FIN_SAVINGS', description: 'Interest accrual and deposit products.' },
          { id: 'OFF_FIN_MICRO', name: 'Microfinance (JLG)', type: 'FINANCE', icon: Users, portalId: 'PORTAL_FIN_MICRO', description: 'Joint Liability Group lending.' },
          { id: 'OFF_FIN_LENDING', name: 'Credit Underwriting', type: 'FINANCE', icon: Activity, portalId: 'PORTAL_FIN_LENDING', description: 'Loan origination and debt recovery.' },
          { id: 'OFF_FIN_SACCO', name: 'SACCO Core', type: 'FINANCE', icon: Building2, portalId: 'PORTAL_FIN_SACCO', description: 'Cooperative financial management.' },
          { id: 'OFF_FIN_EMBEDDED', name: 'Embedded Finance (BNPL)', type: 'OPERATIONS', icon: Zap, portalId: 'PORTAL_FIN_EMBEDDED', description: 'B2B Buy Now Pay Later.' },
          { id: 'OFF_FIN_AGRI', name: 'Agricultural Finance', type: 'FINANCE', icon: Layers, portalId: 'PORTAL_FIN_AGRI', description: 'Value chain credit and input financing.' }
        ]
      },
      {
        id: 'DEPT_FIN_WEALTH', name: 'Wealth, Assets & Developer', type: 'OPERATIONS',
        offices: [
          { id: 'OFF_FIN_INVEST', name: 'Investment & Wealth', type: 'FINANCE', icon: Activity, portalId: 'PORTAL_FIN_INVEST', description: 'Wealth and asset management.' },
          { id: 'OFF_FIN_CUSTODY', name: 'Securities Custody', type: 'FINANCE', icon: ShieldCheck, portalId: 'PORTAL_FIN_CUSTODY', description: 'Asset administration.' },
          { id: 'OFF_FIN_INSURANCE', name: 'Insurance & Insurtech', type: 'OPERATIONS', icon: ShieldCheck, portalId: 'PORTAL_FIN_INSURANCE', description: 'Policy administration.' },
          { id: 'OFF_FIN_TRADE', name: 'Trade Finance (LC)', type: 'FINANCE', icon: Globe, portalId: 'PORTAL_FIN_TRADE', description: 'Letter of credit and supply chain.' },
          { id: 'OFF_FIN_API', name: 'Financial Developer API', type: 'OPERATIONS', icon: Zap, portalId: 'PORTAL_FIN_API', description: 'API provisioning and webhooks.' }
        ]
      }
    ]
  },
  {
    productId: 'JUMO-PRIMARY-ERP',
    departments: [
      {
        id: 'DEPT_PRI_GOV', name: 'Governance & Executive', type: 'GOVERNANCE',
        offices: [
          { id: 'OFF_PRI_HEAD', name: 'Head Teacher Office', type: 'GOVERNANCE', icon: Building2, portalId: 'PORTAL_PRI_HEAD', description: 'Primary school executive management.' },
          { id: 'OFF_PRI_SMC', name: 'School Management Committee', type: 'GOVERNANCE', icon: Users, portalId: 'PORTAL_PRI_SMC', description: 'Community relations and governance.' },
          { id: 'OFF_PRI_QUALITY', name: 'Quality Assurance', type: 'GOVERNANCE', icon: ShieldCheck, portalId: 'PORTAL_PRI_QUALITY', description: 'Curriculum inspection and audits.' }
        ]
      },
      {
        id: 'DEPT_PRI_ACAD', name: 'Academic Directorate', type: 'ACADEMIC',
        offices: [
          { id: 'OFF_PRI_DOS', name: 'Director of Studies (DOS)', type: 'ACADEMIC', icon: BookOpen, portalId: 'PORTAL_PRI_DOS', description: 'Thematic curriculum and PLE preparation.' },
          { id: 'OFF_PRI_EXAMS', name: 'Examinations Office', type: 'ACADEMIC', icon: Clipboard, portalId: 'PORTAL_PRI_EXAMS', description: 'Marks entry and report cards.' },
          { id: 'OFF_PRI_LIBRARY', name: 'Library & Resources', type: 'ACADEMIC', icon: BookOpen, portalId: 'PORTAL_PRI_LIBRARY', description: 'Book lending and inventory.' },
          { id: 'OFF_PRI_TIMETABLE', name: 'Timetabling Office', type: 'ACADEMIC', icon: Activity, portalId: 'PORTAL_PRI_TIMETABLE', description: 'Master schedule and teacher allocation.' },
          { id: 'OFF_PRI_E_LEARNING', name: 'E-Learning Center', type: 'ACADEMIC', icon: Globe, portalId: 'PORTAL_PRI_E_LEARNING', description: 'Digital assessments and content.' }
        ]
      },
      {
        id: 'DEPT_PRI_FIN', name: 'Bursar & Finance', type: 'FINANCE',
        offices: [
          { id: 'OFF_PRI_BURSAR', name: 'Primary Bursar', type: 'FINANCE', icon: DollarSign, portalId: 'PORTAL_PRI_BURSAR', description: 'Fees management and FAAP accounting.' },
          { id: 'OFF_PRI_PROCUREMENT', name: 'Procurement Office', type: 'FINANCE', icon: Layers, portalId: 'PORTAL_PRI_PROCUREMENT', description: 'Purchasing and supply chain.' },
          { id: 'OFF_PRI_INVENTORY', name: 'Stores & Inventory', type: 'FINANCE', icon: Clipboard, portalId: 'PORTAL_PRI_INVENTORY', description: 'Stock tracking and requisitions.' }
        ]
      },
      {
        id: 'DEPT_PRI_ADMIN', name: 'Operations & Registry', type: 'OPERATIONS',
        offices: [
          { id: 'OFF_PRI_ADMISSION', name: 'Admissions Office', type: 'OPERATIONS', icon: Users, portalId: 'PORTAL_PRI_ADMISSION', description: 'New enrollments and interviews.' },
          { id: 'OFF_PRI_RECORDS', name: 'Student Records', type: 'OPERATIONS', icon: Clipboard, portalId: 'PORTAL_PRI_RECORDS', description: 'Archival and continuous assessment.' },
          { id: 'OFF_PRI_HR', name: 'Human Resources', type: 'OPERATIONS', icon: Users, portalId: 'PORTAL_PRI_HR', description: 'Staff payroll, attendance, and leave.' },
          { id: 'OFF_PRI_COMM', name: 'Communications Desk', type: 'OPERATIONS', icon: Globe, portalId: 'PORTAL_PRI_COMM', description: 'Parent SMS and newsletters.' }
        ]
      },
      {
        id: 'DEPT_PRI_WELFARE', name: 'Student Welfare & Services', type: 'STUDENT_SERVICES',
        offices: [
          { id: 'OFF_PRI_CLINIC', name: 'School Clinic', type: 'STUDENT_SERVICES', icon: Heart, portalId: 'PORTAL_PRI_CLINIC', description: 'Student health records and sick bay.' },
          { id: 'OFF_PRI_HOSTEL', name: 'Boarding & Hostel', type: 'STUDENT_SERVICES', icon: Building2, portalId: 'PORTAL_PRI_HOSTEL', description: 'Dormitory allocation and exeat.' },
          { id: 'OFF_PRI_DISCIPLINE', name: 'Disciplinary Committee', type: 'STUDENT_SERVICES', icon: ShieldCheck, portalId: 'PORTAL_PRI_DISCIPLINE', description: 'Conduct logs and behavioral tracking.' },
          { id: 'OFF_PRI_TRANSPORT', name: 'Transport Office', type: 'STUDENT_SERVICES', icon: Zap, portalId: 'PORTAL_PRI_TRANSPORT', description: 'Bus routing and fleet management.' },
          { id: 'OFF_PRI_CATERING', name: 'Catering & Mess', type: 'STUDENT_SERVICES', icon: Activity, portalId: 'PORTAL_PRI_CATERING', description: 'Meal plans and kitchen inventory.' },
          { id: 'OFF_PRI_SPORTS', name: 'Sports & Co-Curricular', type: 'STUDENT_SERVICES', icon: Users, portalId: 'PORTAL_PRI_SPORTS', description: 'Houses, clubs, and athletics.' }
        ]
      }
    ]
  },
  {
    productId: 'JUMO-SECONDARY-ERP',
    departments: [
      {
        id: 'DEPT_SEC_GOV', name: 'Governance & Senate', type: 'GOVERNANCE',
        offices: [
          { id: 'OFF_SEC_PRINCIPAL', name: 'Principal Office', type: 'GOVERNANCE', icon: Building2, portalId: 'PORTAL_SEC_PRINCIPAL', description: 'Executive secondary governance.' },
          { id: 'OFF_SEC_SENATE', name: 'Academic Senate', type: 'GOVERNANCE', icon: Users, portalId: 'PORTAL_SEC_SENATE', description: 'Academic policy and standards.' },
          { id: 'OFF_SEC_BOG', name: 'Board of Governors', type: 'GOVERNANCE', icon: ShieldCheck, portalId: 'PORTAL_SEC_BOG', description: 'Strategic oversight and external relations.' }
        ]
      },
      {
        id: 'DEPT_SEC_ACAD', name: 'Academic & Registrar', type: 'ACADEMIC',
        offices: [
          { id: 'OFF_SEC_REGISTRAR', name: 'Registrar (SIS)', type: 'ACADEMIC', icon: Users, portalId: 'PORTAL_SEC_REGISTRAR', description: 'UNEB Center (UCE/UACE) records.' },
          { id: 'OFF_SEC_DOS', name: 'Director of Studies', type: 'ACADEMIC', icon: BookOpen, portalId: 'PORTAL_SEC_DOS', description: 'Subject combinations and timetables.' },
          { id: 'OFF_SEC_EXAMS', name: 'Examinations (UNEB)', type: 'ACADEMIC', icon: Clipboard, portalId: 'PORTAL_SEC_EXAMS', description: 'Internal and external grading.' },
          { id: 'OFF_SEC_LABS', name: 'Science Labs', type: 'ACADEMIC', icon: Activity, portalId: 'PORTAL_SEC_LABS', description: 'Equipment requisitions and safety.' },
          { id: 'OFF_SEC_LIBRARY', name: 'Senior Library', type: 'ACADEMIC', icon: BookOpen, portalId: 'PORTAL_SEC_LIBRARY', description: 'Digital and physical catalog.' },
          { id: 'OFF_SEC_ELEARNING', name: 'LMS & E-Learning', type: 'ACADEMIC', icon: Globe, portalId: 'PORTAL_SEC_ELEARNING', description: 'Virtual assignments and tests.' }
        ]
      },
      {
        id: 'DEPT_SEC_FIN', name: 'Finance & Bursar', type: 'FINANCE',
        offices: [
          { id: 'OFF_SEC_BURSAR', name: 'Secondary Bursar', type: 'FINANCE', icon: DollarSign, portalId: 'PORTAL_SEC_BURSAR', description: 'Secondary fees and FAAP ledger.' },
          { id: 'OFF_SEC_PROC', name: 'Procurement & Assets', type: 'FINANCE', icon: Layers, portalId: 'PORTAL_SEC_PROC', description: 'Tenders and asset depreciation.' },
          { id: 'OFF_SEC_STORES', name: 'Stores Management', type: 'FINANCE', icon: Clipboard, portalId: 'PORTAL_SEC_STORES', description: 'Central inventory tracking.' }
        ]
      },
      {
        id: 'DEPT_SEC_ADMIN', name: 'Operations & HR', type: 'OPERATIONS',
        offices: [
          { id: 'OFF_SEC_ADMISSIONS', name: 'Admissions & Alumni', type: 'OPERATIONS', icon: Users, portalId: 'PORTAL_SEC_ADMISSIONS', description: 'S.1 and S.5 intakes.' },
          { id: 'OFF_SEC_HR', name: 'Human Resources', type: 'OPERATIONS', icon: Users, portalId: 'PORTAL_SEC_HR', description: 'TSC records and staff files.' },
          { id: 'OFF_SEC_ESTATES', name: 'Estates & Maintenance', type: 'OPERATIONS', icon: Building2, portalId: 'PORTAL_SEC_ESTATES', description: 'Facility work orders.' },
          { id: 'OFF_SEC_IT', name: 'IT Helpdesk', type: 'OPERATIONS', icon: Zap, portalId: 'PORTAL_SEC_IT', description: 'Device management and support.' }
        ]
      },
      {
        id: 'DEPT_SEC_WELFARE', name: 'Student Affairs', type: 'STUDENT_SERVICES',
        offices: [
          { id: 'OFF_SEC_WARDEN', name: 'Dean of Students', type: 'STUDENT_SERVICES', icon: ShieldCheck, portalId: 'PORTAL_SEC_WARDEN', description: 'Overall student welfare and conduct.' },
          { id: 'OFF_SEC_BOARDING', name: 'Boarding Operations', type: 'STUDENT_SERVICES', icon: Building2, portalId: 'PORTAL_SEC_BOARDING', description: 'Housemasters and dormitories.' },
          { id: 'OFF_SEC_CLINIC', name: 'School Sickbay', type: 'STUDENT_SERVICES', icon: Heart, portalId: 'PORTAL_SEC_CLINIC', description: 'Medical histories and referrals.' },
          { id: 'OFF_SEC_TRANSPORT', name: 'Fleet Management', type: 'STUDENT_SERVICES', icon: Zap, portalId: 'PORTAL_SEC_TRANSPORT', description: 'Bus scheduling and maintenance.' },
          { id: 'OFF_SEC_CATERING', name: 'Dining Hall', type: 'STUDENT_SERVICES', icon: Activity, portalId: 'PORTAL_SEC_CATERING', description: 'Food procurement and menus.' },
          { id: 'OFF_SEC_CLUBS', name: 'Clubs & Societies', type: 'STUDENT_SERVICES', icon: Users, portalId: 'PORTAL_SEC_CLUBS', description: 'Debate, prefects, and sports.' }
        ]
      }
    ]
  },
  {
    productId: 'JUMO-NURSERY-ERP',
    departments: [
      {
        id: 'DEPT_NUR_ADMIN', name: 'Administration', type: 'OPERATIONS',
        offices: [
          { id: 'OFF_NUR_HEAD', name: 'Nursery Directorship', type: 'GOVERNANCE', icon: Building2, portalId: 'PORTAL_NUR_HEAD', description: 'Center operations and licensing.' },
          { id: 'OFF_NUR_ENROLL', name: 'Admissions & CRM', type: 'OPERATIONS', icon: Users, portalId: 'PORTAL_NUR_ENROLL', description: 'Lead tracking and toddler onboarding.' },
          { id: 'OFF_NUR_HR', name: 'Staff Management', type: 'OPERATIONS', icon: Users, portalId: 'PORTAL_NUR_HR', description: 'Caregiver shifts and ratios.' }
        ]
      },
      {
        id: 'DEPT_NUR_ACAD', name: 'Early Childhood Academics', type: 'ACADEMIC',
        offices: [
          { id: 'OFF_NUR_DOS', name: 'Curriculum (ECD)', type: 'ACADEMIC', icon: BookOpen, portalId: 'PORTAL_NUR_DOS', description: 'Play-based thematic planning.' },
          { id: 'OFF_NUR_MILESTONES', name: 'Milestone Tracking', type: 'ACADEMIC', icon: Clipboard, portalId: 'PORTAL_NUR_MILESTONES', description: 'Developmental assessments.' },
          { id: 'OFF_NUR_REPORTS', name: 'Progress Reports', type: 'ACADEMIC', icon: Activity, portalId: 'PORTAL_NUR_REPORTS', description: 'Termly narrative evaluations.' }
        ]
      },
      {
        id: 'DEPT_NUR_FIN', name: 'Finance & Accounts', type: 'FINANCE',
        offices: [
          { id: 'OFF_NUR_BURSAR', name: 'Tuition & Billing', type: 'FINANCE', icon: DollarSign, portalId: 'PORTAL_NUR_BURSAR', description: 'Invoicing and receipts.' },
          { id: 'OFF_NUR_STORES', name: 'Stores & Requisitions', type: 'FINANCE', icon: Layers, portalId: 'PORTAL_NUR_STORES', description: 'Consumables and learning materials.' }
        ]
      },
      {
        id: 'DEPT_NUR_WELFARE', name: 'Welfare & Safety', type: 'STUDENT_SERVICES',
        offices: [
          { id: 'OFF_NUR_CLINIC', name: 'Health & Allergies', type: 'STUDENT_SERVICES', icon: Heart, portalId: 'PORTAL_NUR_CLINIC', description: 'Medical alerts and immunizations.' },
          { id: 'OFF_NUR_WELFARE', name: 'Safeguarding', type: 'STUDENT_SERVICES', icon: ShieldCheck, portalId: 'PORTAL_NUR_WELFARE', description: 'Authorized pickup and security.' },
          { id: 'OFF_NUR_MEALS', name: 'Nutrition & Catering', type: 'STUDENT_SERVICES', icon: Activity, portalId: 'PORTAL_NUR_MEALS', description: 'Dietary tracking and menus.' },
          { id: 'OFF_NUR_COMM', name: 'Parent App & Comm', type: 'STUDENT_SERVICES', icon: Globe, portalId: 'PORTAL_NUR_COMM', description: 'Daily logs and announcements.' },
          { id: 'OFF_NUR_TRANSPORT', name: 'Van Transport', type: 'STUDENT_SERVICES', icon: Zap, portalId: 'PORTAL_NUR_TRANSPORT', description: 'Pickup/drop-off routing.' }
        ]
      }
    ]
  },
  {
    productId: 'JUMO-CHURCH',
    departments: [
      {
        id: 'DEPT_CH_GOV', name: 'Ecclesiastical Governance', type: 'GOVERNANCE',
        offices: [
          { id: 'OFF_CH_BISHOP', name: 'Bishop Office', type: 'GOVERNANCE', icon: ShieldCheck, portalId: 'PORTAL_CH_BISHOP', description: 'Episcopal oversight and appointments.' },
          { id: 'OFF_CH_SYNOD', name: 'Diocesan Synod', type: 'GOVERNANCE', icon: Users, portalId: 'PORTAL_CH_SYNOD', description: 'High-level policy records.' },
          { id: 'OFF_CH_CHANCELLOR', name: 'Diocesan Chancellor', type: 'GOVERNANCE', icon: Building2, portalId: 'PORTAL_CH_CHANCELLOR', description: 'Legal and canonical affairs.' },
          { id: 'OFF_CH_ARCH', name: 'Archdeaconry Operations', type: 'GOVERNANCE', icon: Layers, portalId: 'PORTAL_CH_ARCH', description: 'Deanery and regional oversight.' }
        ]
      },
      {
        id: 'DEPT_CH_MINISTRY', name: 'Parish Ministry', type: 'ACADEMIC',
        offices: [
          { id: 'OFF_CH_PARISH', name: 'Parish Office', type: 'ACADEMIC', icon: Church, portalId: 'PORTAL_CH_PARISH', description: 'Parish register and community outreach.' },
          { id: 'OFF_CH_SACRAMENTS', name: 'Sacramental Registers', type: 'ACADEMIC', icon: Heart, portalId: 'PORTAL_CH_SACRAMENTS', description: 'Baptism, Matrimony official records.' },
          { id: 'OFF_CH_MEMBERS', name: 'Membership Database', type: 'ACADEMIC', icon: Users, portalId: 'PORTAL_CH_MEMBERS', description: 'Congregation census.' },
          { id: 'OFF_CH_PASTORAL', name: 'Pastoral Care', type: 'ACADEMIC', icon: Heart, portalId: 'PORTAL_CH_PASTORAL', description: 'Visitation and counseling logs.' },
          { id: 'OFF_CH_EVENTS', name: 'Liturgy & Events', type: 'ACADEMIC', icon: Activity, portalId: 'PORTAL_CH_EVENTS', description: 'Service planning and calendars.' },
          { id: 'OFF_CH_MINISTRIES', name: 'Youth & Men/Women', type: 'ACADEMIC', icon: Users, portalId: 'PORTAL_CH_MINISTRIES', description: 'Sub-ministry organization.' }
        ]
      },
      {
        id: 'DEPT_CH_FIN', name: 'Stewardship & Finance', type: 'FINANCE',
        offices: [
          { id: 'OFF_CH_TREASURY', name: 'Diocesan Treasury', type: 'FINANCE', icon: Landmark, portalId: 'PORTAL_CH_TREASURY', description: 'Tithes management and quota.' },
          { id: 'OFF_CH_CONTRIB', name: 'Contributions Desk', type: 'FINANCE', icon: DollarSign, portalId: 'PORTAL_CH_CONTRIB', description: 'Pledges, envelopes, and receipts.' },
          { id: 'OFF_CH_BUDGET', name: 'Parish Budgeting', type: 'FINANCE', icon: Activity, portalId: 'PORTAL_CH_BUDGET', description: 'Financial forecasting.' },
          { id: 'OFF_CH_PROJECTS', name: 'Project Finance', type: 'FINANCE', icon: Layers, portalId: 'PORTAL_CH_PROJECTS', description: 'Building fund and special projects.' },
          { id: 'OFF_CH_PAYROLL', name: 'Clergy Payroll', type: 'FINANCE', icon: Users, portalId: 'PORTAL_CH_PAYROLL', description: 'Stipends and benefits.' }
        ]
      },
      {
        id: 'DEPT_CH_ADMIN', name: 'Administration & HR', type: 'OPERATIONS',
        offices: [
          { id: 'OFF_CH_CLERGY', name: 'Clergy HR', type: 'OPERATIONS', icon: Users, portalId: 'PORTAL_CH_CLERGY', description: 'Deployments and history.' },
          { id: 'OFF_CH_ASSETS', name: 'Asset Management', type: 'OPERATIONS', icon: Building2, portalId: 'PORTAL_CH_ASSETS', description: 'Church lands and properties.' },
          { id: 'OFF_CH_COMM', name: 'Communications', type: 'OPERATIONS', icon: Globe, portalId: 'PORTAL_CH_COMM', description: 'Announcements and bulletins.' },
          { id: 'OFF_CH_ARCHIVE', name: 'Archives & Records', type: 'OPERATIONS', icon: Clipboard, portalId: 'PORTAL_CH_ARCHIVE', description: 'Historical document preservation.' }
        ]
      }
    ]
  },
  {
    productId: 'JUMO-ALUMNI',
    departments: [
      {
        id: 'DEPT_ALUM_GOV', name: 'Advancement Governance', type: 'GOVERNANCE',
        offices: [
          { id: 'OFF_ALUM_DIR', name: 'Alumni Director Office', type: 'GOVERNANCE', icon: Building2, portalId: 'PORTAL_ALUM_DIR', description: 'Advancement strategy.' },
          { id: 'OFF_ALUM_BOARD', name: 'Alumni Association Board', type: 'GOVERNANCE', icon: ShieldCheck, portalId: 'PORTAL_ALUM_BOARD', description: 'Elections and bylaws.' }
        ]
      },
      {
        id: 'DEPT_ALUM_OPS', name: 'Records & Chapters', type: 'OPERATIONS',
        offices: [
          { id: 'OFF_ALUM_REGISTRAR', name: 'Graduate Records', type: 'OPERATIONS', icon: Users, portalId: 'PORTAL_ALUM_REGISTRAR', description: 'Graduate census and directory.' },
          { id: 'OFF_ALUM_CHAPTERS', name: 'Global Chapters', type: 'OPERATIONS', icon: Globe, portalId: 'PORTAL_ALUM_CHAPTERS', description: 'Regional hub management.' },
          { id: 'OFF_ALUM_ENGAGE', name: 'Engagement Metrics', type: 'OPERATIONS', icon: Activity, portalId: 'PORTAL_ALUM_ENGAGE', description: 'Interaction scoring.' },
          { id: 'OFF_ALUM_COMM', name: 'Communications', type: 'OPERATIONS', icon: Zap, portalId: 'PORTAL_ALUM_COMM', description: 'Newsletters and campaigns.' }
        ]
      },
      {
        id: 'DEPT_ALUM_FIN', name: 'Endowment & Giving', type: 'FINANCE',
        offices: [
          { id: 'OFF_ALUM_FUND', name: 'Endowment Fund', type: 'FINANCE', icon: DollarSign, portalId: 'PORTAL_ALUM_FUND', description: 'Capital campaigns.' },
          { id: 'OFF_ALUM_GIVING', name: 'Annual Giving', type: 'FINANCE', icon: Heart, portalId: 'PORTAL_ALUM_GIVING', description: 'Pledges, matching gifts.' },
          { id: 'OFF_ALUM_RECONCILE', name: 'Gift Reconciliation', type: 'FINANCE', icon: Landmark, portalId: 'PORTAL_ALUM_RECONCILE', description: 'Tax receipts and FAAP.' }
        ]
      },
      {
        id: 'DEPT_ALUM_PROGRAMS', name: 'Programs & Services', type: 'STUDENT_SERVICES',
        offices: [
          { id: 'OFF_ALUM_CAREER', name: 'Career & Mentorship', type: 'STUDENT_SERVICES', icon: Users, portalId: 'PORTAL_ALUM_CAREER', description: 'Job boards and coaching.' },
          { id: 'OFF_ALUM_EVENTS', name: 'Events & Reunions', type: 'STUDENT_SERVICES', icon: Activity, portalId: 'PORTAL_ALUM_EVENTS', description: 'Ticketing and logistics.' },
          { id: 'OFF_ALUM_MERCH', name: 'Merchandise Shop', type: 'STUDENT_SERVICES', icon: Zap, portalId: 'PORTAL_ALUM_MERCH', description: 'E-commerce and spirit gear.' }
        ]
      }
    ]
  }
];

export function getProductStructure(productId: string): ErpProductStructure | undefined {
  return ErpOrganizationalRegistry.find(s => s.productId === productId);
}
