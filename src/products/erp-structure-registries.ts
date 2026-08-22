
import { 
  Building2, Users, BookOpen, DollarSign, Heart, 
  ShieldCheck, LayoutGrid, Briefcase, GraduationCap, 
  Settings, Clipboard, Activity, Package, Send, Landmark, Zap, Globe, Church
} from 'lucide-react';

export type ErpStructureType = 'GOVERNANCE' | 'ADMINISTRATION' | 'ACADEMIC' | 'FINANCE' | 'STUDENT_SERVICES' | 'OPERATIONS' | 'SUPPORT';

export interface ErpOfficeDefinition {
  id: string;
  name: string;
  type: ErpStructureType;
  icon: any;
  description: string;
  portalId: string;
}

export interface ErpDepartmentDefinition {
  id: string;
  name: string;
  type: ErpStructureType;
  offices: ErpOfficeDefinition[];
}

export interface ErpProductStructure {
  productId: string;
  departments: ErpDepartmentDefinition[];
}

export const ErpOrganizationalRegistry: ErpProductStructure[] = [
  {
    productId: 'JUMO-NURSERY-ERP',
    departments: [
      {
        id: 'DEPT_NUR_GOV',
        name: 'Governance & Executive',
        type: 'GOVERNANCE',
        offices: [
          { id: 'OFF_NUR_HEAD', name: 'Head Teacher Office', type: 'GOVERNANCE', icon: Building2, portalId: 'PORTAL_NUR_HEAD', description: 'Executive oversight, board relations, and nursery strategy.' },
          { id: 'OFF_NUR_BOG', name: 'Board of Governors', type: 'GOVERNANCE', icon: Users, portalId: 'PORTAL_NUR_BOG', description: 'Institutional policy and governing council directives.' }
        ]
      },
      {
        id: 'DEPT_NUR_ADMIN',
        name: 'Administration',
        type: 'ADMINISTRATION',
        offices: [
          { id: 'OFF_NUR_REGISTRAR', name: 'Registrar & Admissions', type: 'ADMINISTRATION', icon: Users, portalId: 'PORTAL_NUR_REGISTRAR', description: 'Toddler enrollment, guardian authorizations, and age/stage placement.' },
          { id: 'OFF_NUR_RECORDS', name: 'Records & Archive', type: 'ADMINISTRATION', icon: Clipboard, portalId: 'PORTAL_NUR_RECORDS', description: 'Centralized infant records, immunization logs, and certifications.' }
        ]
      },
      {
        id: 'DEPT_NUR_ACAD',
        name: 'ECD Academic Affairs',
        type: 'ACADEMIC',
        offices: [
          { id: 'OFF_NUR_DOS', name: 'Director of Studies (DOS)', type: 'ACADEMIC', icon: BookOpen, portalId: 'PORTAL_NUR_DOS', description: 'ECD curriculum management, lesson planning, and developmental milestones.' },
          { id: 'OFF_NUR_CAREGIVERS', name: 'Caregivers & Teachers', type: 'ACADEMIC', icon: GraduationCap, portalId: 'PORTAL_NUR_TEACHERS', description: 'Daily teaching, child welfare, and milestone reporting.' }
        ]
      },
      {
        id: 'DEPT_NUR_FIN',
        name: 'Finance & Stewardship',
        type: 'FINANCE',
        offices: [
          { id: 'OFF_NUR_BURSAR', name: 'Nursery Bursar', type: 'FINANCE', icon: DollarSign, portalId: 'PORTAL_NUR_BURSAR', description: 'Fee collections, feeding budgets, and FAAP ledger integration.' },
          { id: 'OFF_NUR_ACCOUNTS', name: 'Accounts Office', type: 'FINANCE', icon: Landmark, portalId: 'PORTAL_NUR_ACCOUNTS', description: 'Financial reconciliation, payroll, and statutory compliance.' }
        ]
      },
      {
        id: 'DEPT_NUR_WELFARE',
        name: 'Welfare & Health',
        type: 'STUDENT_SERVICES',
        offices: [
          { id: 'OFF_NUR_CLINIC', name: 'Health & Nutrition', type: 'STUDENT_SERVICES', icon: Heart, portalId: 'PORTAL_NUR_HEALTH', description: 'Infant nutrition logs, allergies, and health clinic services.' },
          { id: 'OFF_NUR_WELFARE', name: 'Safeguarding & Welfare', type: 'STUDENT_SERVICES', icon: ShieldCheck, portalId: 'PORTAL_NUR_WELFARE', description: 'Child safety, pickup authorizations, and counseling.' }
        ]
      }
    ]
  },
  {
    productId: 'JUMO-PRIMARY-ERP',
    departments: [
      {
        id: 'DEPT_PRI_GOV',
        name: 'Governance & Executive',
        type: 'GOVERNANCE',
        offices: [
          { id: 'OFF_PRI_HEAD', name: 'Head Teacher Office', type: 'GOVERNANCE', icon: Building2, portalId: 'PORTAL_PRI_HEAD', description: 'Primary school executive management and P.1-P.7 oversight.' },
          { id: 'OFF_PRI_SMC', name: 'School Management Committee', type: 'GOVERNANCE', icon: Users, portalId: 'PORTAL_PRI_SMC', description: 'Community relations and institutional governance.' }
        ]
      },
      {
        id: 'DEPT_PRI_ACAD',
        name: 'Academic Directorate',
        type: 'ACADEMIC',
        offices: [
          { id: 'OFF_PRI_DOS', name: 'Director of Studies (DOS)', type: 'ACADEMIC', icon: BookOpen, portalId: 'PORTAL_PRI_DOS', description: 'Thematic curriculum, subject assessments, and PLE preparation.' },
          { id: 'OFF_PRI_EXAMS', name: 'Examinations Office', type: 'ACADEMIC', icon: Clipboard, portalId: 'PORTAL_PRI_EXAMS', description: 'Marks entry, score moderation, and report card generation.' }
        ]
      },
      {
        id: 'DEPT_PRI_FIN',
        name: 'Bursar & Finance',
        type: 'FINANCE',
        offices: [
          { id: 'OFF_PRI_BURSAR', name: 'Primary Bursar', type: 'FINANCE', icon: DollarSign, portalId: 'PORTAL_PRI_BURSAR', description: 'Fees management, vote book commitments, and FAAP accounting.' }
        ]
      }
    ]
  },
  {
    productId: 'JUMO-SECONDARY-ERP',
    departments: [
      {
        id: 'DEPT_SEC_GOV',
        name: 'Governance & Senate',
        type: 'GOVERNANCE',
        offices: [
          { id: 'OFF_SEC_PRINCIPAL', name: 'Principal Office', type: 'GOVERNANCE', icon: Building2, portalId: 'PORTAL_SEC_PRINCIPAL', description: 'Executive secondary governance and high school strategy.' },
          { id: 'OFF_SEC_SENATE', name: 'Academic Senate', type: 'GOVERNANCE', icon: Users, portalId: 'PORTAL_SEC_SENATE', description: 'Academic policy, subject combinations, and standards.' }
        ]
      },
      {
        id: 'DEPT_SEC_ACAD',
        name: 'Academic & Registrar',
        type: 'ACADEMIC',
        offices: [
          { id: 'OFF_SEC_REGISTRAR', name: 'Registrar (SIS)', type: 'ACADEMIC', icon: Users, portalId: 'PORTAL_SEC_REGISTRAR', description: 'UNEB Center (UCE/UACE) administration and student records.' },
          { id: 'OFF_SEC_DOS', name: 'Director of Studies', type: 'ACADEMIC', icon: BookOpen, portalId: 'PORTAL_SEC_DOS', description: 'Subject combinations, science labs, and academic timetabling.' }
        ]
      },
      {
        id: 'DEPT_SEC_FIN',
        name: 'Finance & Bursar',
        type: 'FINANCE',
        offices: [
          { id: 'OFF_SEC_BURSAR', name: 'Secondary Bursar', type: 'FINANCE', icon: DollarSign, portalId: 'PORTAL_SEC_BURSAR', description: 'Secondary fees, grants, payroll, and FAAP ledger.' }
        ]
      }
    ]
  },
  {
    productId: 'JUMO-FINTECH',
    departments: [
      {
        id: 'DEPT_FIN_CORE',
        name: 'Financial Core & Ledger',
        type: 'FINANCE',
        offices: [
          { id: 'OFF_FIN_CFO', name: 'CFO Office', type: 'GOVERNANCE', icon: Building2, portalId: 'PORTAL_FIN_CFO', description: 'Global financial strategy, treasury oversight, and settlement matrix.' },
          { id: 'OFF_FIN_LEDGER', name: 'FAAP Ledger Control', type: 'FINANCE', icon: Landmark, portalId: 'PORTAL_FIN_LEDGER', description: 'Central double-entry control, chart of accounts, and zero-parity auditing.' }
        ]
      },
      {
        id: 'DEPT_FIN_PAY',
        name: 'Payment & Switch Operations',
        type: 'OPERATIONS',
        offices: [
          { id: 'OFF_FIN_SWITCH', name: 'Universal Switch Ops', type: 'OPERATIONS', icon: Zap, portalId: 'PORTAL_FIN_SWITCH', description: 'Payment rail monitoring, MoMo switching, and Safaricom M-Pesa rails.' },
          { id: 'OFF_FIN_SETTLE', name: 'Settlement & Clearing', type: 'FINANCE', icon: Activity, portalId: 'PORTAL_FIN_SETTLE', description: 'Bulk disbursements, split clearing (1.5%), and merchant settlements.' }
        ]
      },
      {
        id: 'DEPT_FIN_AGENT',
        name: 'Agency & Microfinance',
        type: 'STUDENT_SERVICES',
        offices: [
          { id: 'OFF_FIN_AGENT', name: 'Agent Banking Hub', type: 'OPERATIONS', icon: Users, portalId: 'PORTAL_FIN_AGENT', description: 'Liquidity float management, agent commission ledgers, and network health.' },
          { id: 'OFF_FIN_MICRO', name: 'Microfinance & Lending', type: 'FINANCE', icon: DollarSign, portalId: 'PORTAL_FIN_MICRO', description: 'JLG lending, credit scoring, and SACCO financial operations.' }
        ]
      }
    ]
  },
  {
    productId: 'JUMO-CHURCH',
    departments: [
      {
        id: 'DEPT_CH_GOV',
        name: 'Ecclesiastical Governance',
        type: 'GOVERNANCE',
        offices: [
          { id: 'OFF_CH_BISHOP', name: 'Bishop Office', type: 'GOVERNANCE', icon: ShieldCheck, portalId: 'PORTAL_CH_BISHOP', description: 'Episcopal oversight, synod directives, and clergy appointments.' },
          { id: 'OFF_CH_SYNOD', name: 'Diocesan Synod', type: 'GOVERNANCE', icon: Users, portalId: 'PORTAL_CH_SYNOD', description: 'High-level policy records and archdeaconry governance.' }
        ]
      },
      {
        id: 'DEPT_CH_MINISTRY',
        name: 'Parish Ministry',
        type: 'ACADEMIC',
        offices: [
          { id: 'OFF_CH_PARISH', name: 'Parish Office', type: 'ACADEMIC', icon: Church, portalId: 'PORTAL_CH_PARISH', description: 'Parish register, pastoral care, and community outreach.' },
          { id: 'OFF_CH_SACRAMENTS', name: 'Sacramental Registers', type: 'ACADEMIC', icon: Heart, portalId: 'PORTAL_CH_SACRAMENTS', description: 'Baptism, Confirmation, and Matrimony official records.' }
        ]
      },
      {
        id: 'DEPT_CH_FIN',
        name: 'Stewardship & Finance',
        type: 'FINANCE',
        offices: [
          { id: 'OFF_CH_TREASURY', name: 'Diocesan Treasury', type: 'FINANCE', icon: Landmark, portalId: 'PORTAL_CH_TREASURY', description: 'Tithes management, diocesan quota, and parish project finance.' }
        ]
      }
    ]
  },
  {
    productId: 'JUMO-ALUMNI',
    departments: [
      {
        id: 'DEPT_ALUM_GOV',
        name: 'Advancement Governance',
        type: 'GOVERNANCE',
        offices: [
          { id: 'OFF_ALUM_DIR', name: 'Alumni Director Office', type: 'GOVERNANCE', icon: Building2, portalId: 'PORTAL_ALUM_DIR', description: 'Institutional advancement strategy and global chapter relations.' }
        ]
      },
      {
        id: 'DEPT_ALUM_OPS',
        name: 'Records & Chapters',
        type: 'OPERATIONS',
        offices: [
          { id: 'OFF_ALUM_REGISTRAR', name: 'Graduate Records Office', type: 'OPERATIONS', icon: Users, portalId: 'PORTAL_ALUM_REGISTRAR', description: 'Graduate census, transcript verification, and alumni directory.' },
          { id: 'OFF_ALUM_CHAPTERS', name: 'Global Chapters Office', type: 'OPERATIONS', icon: Globe, portalId: 'PORTAL_ALUM_CHAPTERS', description: 'Regional hub management, leadership elections, and alumni meetups.' }
        ]
      },
      {
        id: 'DEPT_ALUM_FIN',
        name: 'Endowment & Giving',
        type: 'FINANCE',
        offices: [
          { id: 'OFF_ALUM_FUND', name: 'Endowment Fund Office', type: 'FINANCE', icon: DollarSign, portalId: 'PORTAL_ALUM_FUND', description: 'Capital campaigns, annual giving, and scholarship fund management.' }
        ]
      }
    ]
  }
];

export function getProductStructure(productId: string): ErpProductStructure | undefined {
  return ErpOrganizationalRegistry.find(s => s.productId === productId);
}
