export interface NavigationItem {
  id: string;
  label: string;
  icon?: string;
  route: string;
  badge?: string;
  permissions?: string[];
  subItems?: { id: string; label: string; route: string; badge?: string }[];
}

export interface ApplicationManifest {
  id: string;
  name: string;
  version: string;
  runtime: 'ueos';
  icon: string;
  category: 'Higher Education' | 'Religious Institution' | 'Financial Cooperative' | 'Fintech' | 'Healthcare' | 'Public Sector' | 'Enterprise';
  description: string;
  navigation: NavigationItem[];
  modules: string[];
  permissions: string[];
  aiAgent: {
    id: string;
    name: string;
    role: string;
    greeting: string;
    capabilities: string[];
  };
  defaultModule: string;
}

export interface TenantWorkspaceContext {
  userId: string;
  userName: string;
  userRole: string;
  tenantId: string;
  tenantName: string;
  organization: string;
  installedAppIds: string[];
  activeAppId: string;
  activeModuleId: string;
  dataMeshEnabled: boolean;
  aegisSecurityLevel: 'Zero-Trust Strict' | 'Enterprise Standard';
}

class WorkspaceManifestRegistry {
  private manifests: Map<string, ApplicationManifest> = new Map();

  constructor() {
    this.registerDefaultManifests();
  }

  private registerDefaultManifests() {
    // 1. University ERP Manifest
    const universityManifest: ApplicationManifest = {
      id: 'university-erp',
      name: 'University ERP & Campus OS',
      version: '14.4.0',
      runtime: 'ueos',
      icon: 'GraduationCap',
      category: 'Higher Education',
      description: 'Comprehensive Student Information System (SIS), Faculty Portal, Tuition FAAP Reconciliation, and Research Management.',
      navigation: [
        {
          id: 'sis',
          label: 'Student Information System',
          icon: 'UserCheck',
          route: 'sis',
          badge: '2,450 Students',
          subItems: [
            { id: 'sis-enrolment', label: 'Enrolments & Directory', route: 'sis' },
            { id: 'sis-grades', label: 'Transcripts & Grading', route: 'sis' },
          ]
        },
        {
          id: 'faap-tuition',
          label: 'Tuition & FAAP Ledger',
          icon: 'DollarSign',
          route: 'faap-tuition',
          badge: 'Balanced',
          subItems: [
            { id: 'faap-billing', label: 'Tuition Invoicing', route: 'faap-tuition' },
            { id: 'faap-reconcile', label: 'General Ledger Reconciler', route: 'faap-tuition' },
          ]
        },
        {
          id: 'hr-payroll',
          label: 'Faculty & HR Payroll',
          icon: 'Users',
          route: 'hr-payroll',
          subItems: [
            { id: 'hr-staff', label: 'Academic Staff Directory', route: 'hr-payroll' },
            { id: 'hr-payroll-run', label: 'Monthly Payroll Runs', route: 'hr-payroll' },
          ]
        },
        {
          id: 'research',
          label: 'Research & Endowments',
          icon: 'BookOpen',
          route: 'research',
          badge: '12 Active Grants'
        }
      ],
      modules: ['SIS', 'FAAP', 'HR', 'Workflow', 'DocumentIntelligence'],
      permissions: ['admin', 'academic_director', 'finance_manager', 'faculty'],
      aiAgent: {
        id: 'university-assistant',
        name: 'Athena Campus AI',
        role: 'University Operations Assistant',
        greeting: 'Hello Provost, I am ready to assist with campus enrolments, FAAP tuition reconciliations, and academic staff schedules.',
        capabilities: ['Enrollment Audits', 'Tuition Ledger Match', 'Research Grant Analysis']
      },
      defaultModule: 'sis'
    };

    // 2. Church ERP Manifest
    const churchManifest: ApplicationManifest = {
      id: 'church-erp',
      name: 'Church & Ministry ERP',
      version: '8.2.0',
      runtime: 'ueos',
      icon: 'Church',
      category: 'Religious Institution',
      description: 'Congregation membership, tithes & offerings ledger tracking, ministry events, and pastoral care workflow.',
      navigation: [
        {
          id: 'members',
          label: 'Congregation Membership',
          icon: 'Heart',
          route: 'members',
          badge: '1,820 Members'
        },
        {
          id: 'giving',
          label: 'Tithes, Offerings & FAAP',
          icon: 'Coins',
          route: 'giving',
          badge: '$14.2k Weekly'
        },
        {
          id: 'events',
          label: 'Ministry Events & Services',
          icon: 'Calendar',
          route: 'events'
        },
        {
          id: 'pastoral',
          label: 'Pastoral Care & Welfare',
          icon: 'MessageSquare',
          route: 'pastoral'
        }
      ],
      modules: ['Membership', 'FAAP', 'Events', 'Communication'],
      permissions: ['admin', 'pastor', 'treasurer'],
      aiAgent: {
        id: 'church-shepherd-ai',
        name: 'Shepherd AI Assistant',
        role: 'Pastoral & Stewardship Assistant',
        greeting: 'Greetings Pastor! How can I assist with congregation follow-ups, weekly tithe ledger postings, or Sunday service planning?',
        capabilities: ['Weekly Tithe Verification', 'Member Attendance Insights', 'Ministry Event Logistics']
      },
      defaultModule: 'members'
    };

    // 3. Cooperative SACCO ERP Manifest
    const saccoManifest: ApplicationManifest = {
      id: 'cooperative-sacco-erp',
      name: 'Cooperative SACCO ERP',
      version: '12.1.0',
      runtime: 'ueos',
      icon: 'Briefcase',
      category: 'Financial Cooperative',
      description: 'Member savings accounts, share capital ledgers, loan appraisal algorithms, and FAAP credit risk management.',
      navigation: [
        {
          id: 'sacco-accounts',
          label: 'Savings & Share Capital',
          icon: 'CreditCard',
          route: 'sacco-accounts',
          badge: '5,400 Accounts'
        },
        {
          id: 'sacco-loans',
          label: 'Loan Applications & Appraisal',
          icon: 'TrendingUp',
          route: 'sacco-loans',
          badge: '18 Pending'
        },
        {
          id: 'sacco-treasury',
          label: 'FAAP SACCO Treasury',
          icon: 'Landmark',
          route: 'sacco-treasury'
        }
      ],
      modules: ['MemberAccounts', 'LoanAppraisal', 'FAAP', 'RiskManagement'],
      permissions: ['admin', 'sacco_manager', 'loan_officer', 'auditor'],
      aiAgent: {
        id: 'sacco-treasury-ai',
        name: 'SACCO Credit Sentinel',
        role: 'Financial Risk & Loan Appraisal Specialist',
        greeting: 'Welcome Manager. I am ready to evaluate loan guarantors, verify member share multipliers, and reconcile FAAP treasury accounts.',
        capabilities: ['Credit Risk Scoring', 'Guarantor Matrix Check', 'Liquidity Buffer Monitor']
      },
      defaultModule: 'sacco-accounts'
    };

    // 4. Fintech Platform Manifest
    const fintechManifest: ApplicationManifest = {
      id: 'fintech-platform',
      name: 'JUMO FINTECH Banking Platform',
      version: '18.0.0',
      runtime: 'ueos',
      icon: 'ShieldAlert',
      category: 'Fintech',
      description: 'Real-time payment gateway router, digital wallets, M-Pesa API integration, and master treasury clearing fee calculation.',
      navigation: [
        {
          id: 'fintech-wallets',
          label: 'Digital Wallets & Accounts',
          icon: 'Wallet',
          route: 'fintech-wallets',
          badge: 'Live'
        },
        {
          id: 'fintech-transactions',
          label: 'Payment Gateway Transactions',
          icon: 'Repeat',
          route: 'fintech-transactions'
        },
        {
          id: 'fintech-settlement',
          label: 'JUMO 1.5% Treasury Clearing',
          icon: 'Percent',
          route: 'fintech-settlement',
          badge: '1.5% Automated'
        }
      ],
      modules: ['PaymentGateway', 'TreasuryRouter', 'FAAP', 'AML_KYC'],
      permissions: ['admin', 'fintech_operator', 'compliance_officer'],
      aiAgent: {
        id: 'fintech-sentinel-ai',
        name: 'FinTech Clearing AI',
        role: 'Payment Routing & AML Auditor',
        greeting: 'System Operational. All payment gateways connected. 1.5% JUMO settlement fee router active.',
        capabilities: ['AML Suspicious Activity Detection', 'Gateway Fee Audit', 'Real-Time Rebalancing']
      },
      defaultModule: 'fintech-wallets'
    };

    // 5. Healthcare Hospital ERP Manifest
    const hospitalManifest: ApplicationManifest = {
      id: 'healthcare-hospital-erp',
      name: 'Healthcare & Hospital ERP',
      version: '10.5.0',
      runtime: 'ueos',
      icon: 'Activity',
      category: 'Healthcare',
      description: 'Electronic Health Records (EHR), pharmacy cold-chain inventory, patient billing, and ward bed management.',
      navigation: [
        {
          id: 'hospital-patients',
          label: 'Patient Registry & EHR',
          icon: 'Users',
          route: 'hospital-patients',
          badge: 'EHR Encrypted'
        },
        {
          id: 'hospital-pharmacy',
          label: 'Pharmacy & Cold-Chain Stock',
          icon: 'Package',
          route: 'hospital-pharmacy'
        },
        {
          id: 'hospital-billing',
          label: 'Patient Insurance & FAAP Billing',
          icon: 'Receipt',
          route: 'hospital-billing'
        }
      ],
      modules: ['EHR', 'PharmacyInventory', 'FAAP', 'BedManagement'],
      permissions: ['admin', 'chief_medical_officer', 'pharmacist', 'hospital_admin'],
      aiAgent: {
        id: 'hospital-clinical-ai',
        name: 'Aetheria Clinical AI',
        role: 'Healthcare Operations & Triage Assistant',
        greeting: 'Greetings Doctor. EHR security guard is active. Cold-chain pharmaceutical buffers are optimal.',
        capabilities: ['Clinical Triage Assistance', 'Drug Interaction Checker', 'Insurance Claim Audit']
      },
      defaultModule: 'hospital-patients'
    };

    // 6. Government Ministry ERP Manifest
    const governmentManifest: ApplicationManifest = {
      id: 'government-ministry-erp',
      name: 'Public Administration & Ministry ERP',
      version: '9.0.0',
      runtime: 'ueos',
      icon: 'Landmark',
      category: 'Public Sector',
      description: 'National public procurement, citizen service ticketing, ministry budget allocation, and public asset registry.',
      navigation: [
        {
          id: 'gov-procurement',
          label: 'Public Procurement & Tenders',
          icon: 'FileText',
          route: 'gov-procurement',
          badge: 'Public Audit'
        },
        {
          id: 'gov-citizen-services',
          label: 'Citizen Service Desk',
          icon: 'HelpCircle',
          route: 'gov-citizen-services'
        },
        {
          id: 'gov-budget',
          label: 'Treasury Budget Allocation',
          icon: 'PieChart',
          route: 'gov-budget'
        }
      ],
      modules: ['Procurement', 'CitizenDesk', 'FAAP', 'PublicRegistry'],
      permissions: ['admin', 'perm_secretary', 'auditor_general'],
      aiAgent: {
        id: 'gov-sentinel-ai',
        name: 'Civic Governance AI',
        role: 'Public Sector Audit & Procurement Guardian',
        greeting: 'Welcome Permanent Secretary. Procurement compliance checking active under Public Finance Management directives.',
        capabilities: ['Procurement Audit', 'Citizen SLA Tracking', 'Budget Variance Analysis']
      },
      defaultModule: 'gov-procurement'
    };

    this.manifests.set(universityManifest.id, universityManifest);
    this.manifests.set(churchManifest.id, churchManifest);
    this.manifests.set(saccoManifest.id, saccoManifest);
    this.manifests.set(fintechManifest.id, fintechManifest);
    this.manifests.set(hospitalManifest.id, hospitalManifest);
    this.manifests.set(governmentManifest.id, governmentManifest);
  }

  public registerManifest(manifest: ApplicationManifest): void {
    this.manifests.set(manifest.id, manifest);
  }

  public getManifest(id: string): ApplicationManifest | undefined {
    return this.manifests.get(id);
  }

  public getAllManifests(): ApplicationManifest[] {
    return Array.from(this.manifests.values());
  }

  public resolveWorkspaceContext(userId = 'usr_admin', tenantId = 't_university_ex'): TenantWorkspaceContext {
    return {
      userId,
      userName: 'Dr. Julius Moses',
      userRole: 'Ring-0 Administrator',
      tenantId,
      tenantName: 'University of Sovereign Enterprise',
      organization: 'JUMO Enterprise Group',
      installedAppIds: ['university-erp', 'church-erp', 'cooperative-sacco-erp', 'fintech-platform', 'healthcare-hospital-erp', 'government-ministry-erp'],
      activeAppId: 'university-erp',
      activeModuleId: 'sis',
      dataMeshEnabled: true,
      aegisSecurityLevel: 'Zero-Trust Strict'
    };
  }
}

export const workspaceManifestRegistry = new WorkspaceManifestRegistry();
