/**
 * JUMO UEOS — Digital Product Factory Registry
 * 
 * Governs and manages specialized self-contained Digital Product Factories:
 * 1. Education Digital Product Factory
 * 2. Manufacturing Digital Product Factory
 * 3. Healthcare Digital Product Factory
 * 4. Banking & Financial Digital Product Factory
 * 5. Government Digital Product Factory
 * 6. Agriculture Digital Product Factory
 * 7. Telecom Digital Product Factory
 * 8. Logistics Digital Product Factory
 * 9. Energy Digital Product Factory
 * 10. Real Estate Digital Product Factory
 * 11. Insurance Digital Product Factory
 * 12. NGO Digital Product Factory
 * 13. Hospitality & Tourism Digital Product Factory
 * 14. Legal Digital Product Factory
 * 15. HR Digital Product Factory
 * 16. Research & Innovation Digital Product Factory
 * 
 * Every factory is self-contained and capable of:
 * Build, Configure, Manufacture, Verify, Deploy, Operate, Backup, Recover, Upgrade.
 */

export interface SpecializedDigitalProductFactory {
  id: string;
  name: string;
  category: string;
  domain: string;
  version: string;
  capabilities: string[];
  supportedEcosystems: string[];
  stableKernelContracts: string[];
  status: 'ACTIVE' | 'MAINTENANCE' | 'DEPRECATED';
  operations: {
    canBuild: boolean;
    canConfigure: boolean;
    canManufacture: boolean;
    canVerify: boolean;
    canDeploy: boolean;
    canOperate: boolean;
    canBackup: boolean;
    canRecover: boolean;
    canUpgrade: boolean;
  };
}

export class DigitalProductFactoryRegistry {
  private static factories: Map<string, SpecializedDigitalProductFactory> = new Map();

  static {
    this.registerSpecializedFactories();
  }

  private static registerSpecializedFactories() {
    const factoryDefs: Omit<SpecializedDigitalProductFactory, 'status' | 'operations'>[] = [
      {
        id: 'factory-edu-01',
        name: 'Education Digital Product Factory',
        category: 'Institutional',
        domain: 'Education & Alumni',
        version: '5.0.0-NATIONAL',
        capabilities: ['Student Lifecycle', 'Curriculum & Grading', 'Fees & Financial Aid', 'Alumni Advancement', 'Endowment Management', 'Multi-Campus Logistics'],
        supportedEcosystems: ['eco-01-education'],
        stableKernelContracts: ['UEOS-Kernel-Identity', 'FAAP-Ledger-Bridge', 'AEGIS-Zero-Trust', 'Unified-Event-Bus']
      },
      {
        id: 'factory-mfg-02',
        name: 'Manufacturing Digital Product Factory',
        category: 'Industrial',
        domain: 'National Manufacturing & Supply Chain',
        version: '5.0.0-NATIONAL',
        capabilities: ['BOM Management', 'Shop Floor Execution', 'Supply Chain Visibility', 'Inventory & Warehousing', 'Quality Control', 'Asset Maintenance'],
        supportedEcosystems: ['eco-08-manufacturing'],
        stableKernelContracts: ['UEOS-Kernel-Identity', 'FAAP-Ledger-Bridge', 'AEGIS-Zero-Trust', 'Unified-Event-Bus']
      },
      {
        id: 'factory-health-03',
        name: 'Healthcare Digital Product Factory',
        category: 'Institutional',
        domain: 'Healthcare & Medical Systems',
        version: '5.0.0-NATIONAL',
        capabilities: ['Electronic Health Records (EHR)', 'Patient Intake & Triage', 'Pharmacy & Dispensary', 'Insurance & Claims', 'Telemedicine Gateway', 'Medical Asset Tracking'],
        supportedEcosystems: ['eco-06-healthcare'],
        stableKernelContracts: ['UEOS-Kernel-Identity', 'FAAP-Ledger-Bridge', 'AEGIS-Zero-Trust', 'Unified-Event-Bus']
      },
      {
        id: 'factory-fin-04',
        name: 'Banking & Financial Digital Product Factory',
        category: 'Financial',
        domain: 'Banking & SACCO Operations',
        version: '5.0.0-NATIONAL',
        capabilities: ['Core Banking Engine', 'Loan Origination & Servicing', 'Savings & Share Capital', 'Digital Payments & Clearing', 'ISO 20022 Messaging', 'AML & Fraud Audit'],
        supportedEcosystems: ['eco-05-sacco-microfinance'],
        stableKernelContracts: ['UEOS-Kernel-Identity', 'FAAP-Ledger-Bridge', 'AEGIS-Zero-Trust', 'Unified-Event-Bus']
      },
      {
        id: 'factory-gov-05',
        name: 'Government Digital Product Factory',
        category: 'Public & Sovereign',
        domain: 'Public Sector & Ministries',
        version: '5.0.0-NATIONAL',
        capabilities: ['Public Service Portal', 'E-Government Registry', 'Budgeting & IPSAS Accounting', 'Civil Registration', 'Taxation & Revenue Audit', 'Inter-Agency Routing'],
        supportedEcosystems: ['eco-04-government-ministry'],
        stableKernelContracts: ['UEOS-Kernel-Identity', 'FAAP-Ledger-Bridge', 'AEGIS-Zero-Trust', 'Unified-Event-Bus']
      },
      {
        id: 'factory-agri-06',
        name: 'Agriculture Digital Product Factory',
        category: 'Industrial',
        domain: 'Agribusiness & Cooperatives',
        version: '5.0.0-NATIONAL',
        capabilities: ['Farmer Directory', 'Produce Intake & Weighing', 'Cooperative Payouts', 'Fertilizer & Subsidy Tracking', 'Yield Analytics', 'Weather & Sensor Mesh'],
        supportedEcosystems: ['eco-07-agriculture'],
        stableKernelContracts: ['UEOS-Kernel-Identity', 'FAAP-Ledger-Bridge', 'AEGIS-Zero-Trust', 'Unified-Event-Bus']
      },
      {
        id: 'factory-telecom-07',
        name: 'Telecom Digital Product Factory',
        category: 'Infrastructure',
        domain: 'Telecommunications & Utilities',
        version: '5.0.0-NATIONAL',
        capabilities: ['Subscriber Management', 'SIM & eSIM Provisioning', 'Billing & Rating Engine', 'Network Asset Inventory', 'Value-Added Services (VAS)', 'CDR Reconciliation'],
        supportedEcosystems: ['eco-12-telecom'],
        stableKernelContracts: ['UEOS-Kernel-Identity', 'FAAP-Ledger-Bridge', 'AEGIS-Zero-Trust', 'Unified-Event-Bus']
      },
      {
        id: 'factory-logistics-08',
        name: 'Logistics Digital Product Factory',
        category: 'Industrial',
        domain: 'Transport & Freight Logistics',
        version: '5.0.0-NATIONAL',
        capabilities: ['Fleet Management', 'Consignment Tracking', 'Route Optimization', 'Freight Customs & Manifest', 'Warehouse WMS', 'Driver Dispatch'],
        supportedEcosystems: ['eco-11-logistics'],
        stableKernelContracts: ['UEOS-Kernel-Identity', 'FAAP-Ledger-Bridge', 'AEGIS-Zero-Trust', 'Unified-Event-Bus']
      },
      {
        id: 'factory-energy-09',
        name: 'Energy Digital Product Factory',
        category: 'Infrastructure',
        domain: 'Power & Renewable Energy',
        version: '5.0.0-NATIONAL',
        capabilities: ['Grid Telemetry & SCADA', 'Smart Meter Billing', 'Substation Maintenance', 'Tariff Management', 'Outage Dispatch', 'Carbon Offset Tracking'],
        supportedEcosystems: ['eco-13-energy'],
        stableKernelContracts: ['UEOS-Kernel-Identity', 'FAAP-Ledger-Bridge', 'AEGIS-Zero-Trust', 'Unified-Event-Bus']
      },
      {
        id: 'factory-realestate-10',
        name: 'Real Estate Digital Product Factory',
        category: 'Commercial',
        domain: 'Property & Facility Management',
        version: '5.0.0-NATIONAL',
        capabilities: ['Property Listing & Registry', 'Tenant Portal & Lease Billing', 'Facility Maintenance Queue', 'Title Verification', 'Mortgage Administration', 'Valuation Engine'],
        supportedEcosystems: ['eco-14-realestate'],
        stableKernelContracts: ['UEOS-Kernel-Identity', 'FAAP-Ledger-Bridge', 'AEGIS-Zero-Trust', 'Unified-Event-Bus']
      },
      {
        id: 'factory-insurance-11',
        name: 'Insurance Digital Product Factory',
        category: 'Financial',
        domain: 'Insurance & Actuarial Systems',
        version: '5.0.0-NATIONAL',
        capabilities: ['Policy Administration', 'Underwriting Rules Engine', 'Claims Processing', 'Reinsurance Ledger', 'Premium Direct Debit', 'Fraud Risk Scoring'],
        supportedEcosystems: ['eco-15-insurance'],
        stableKernelContracts: ['UEOS-Kernel-Identity', 'FAAP-Ledger-Bridge', 'AEGIS-Zero-Trust', 'Unified-Event-Bus']
      },
      {
        id: 'factory-ngo-12',
        name: 'NGO Digital Product Factory',
        category: 'Institutional',
        domain: 'Development & Non-Profit',
        version: '5.0.0-NATIONAL',
        capabilities: ['Grant & Donor Management', 'Project Beneficiary Tracking', 'Fund Accounting & IPSAS', 'Monitoring & Evaluation (M&E)', 'Volunteer Roster', 'Field Audits'],
        supportedEcosystems: ['eco-03-ngo-development'],
        stableKernelContracts: ['UEOS-Kernel-Identity', 'FAAP-Ledger-Bridge', 'AEGIS-Zero-Trust', 'Unified-Event-Bus']
      },
      {
        id: 'factory-tourism-13',
        name: 'Hospitality & Tourism Digital Product Factory',
        category: 'Commercial',
        domain: 'Hotel, Resort & Travel',
        version: '5.0.0-NATIONAL',
        capabilities: ['Property Management System (PMS)', 'Reservation & Booking Engine', 'Point of Sale (POS)', 'Housekeeping & Maintenance', 'Guest Concierge Portal', 'Tour Operator Billing'],
        supportedEcosystems: ['eco-16-tourism'],
        stableKernelContracts: ['UEOS-Kernel-Identity', 'FAAP-Ledger-Bridge', 'AEGIS-Zero-Trust', 'Unified-Event-Bus']
      },
      {
        id: 'factory-legal-14',
        name: 'Legal Digital Product Factory',
        category: 'Professional Services',
        domain: 'Legal & Judicial Practice',
        version: '5.0.0-NATIONAL',
        capabilities: ['Matter & Case Management', 'Court Filing & Docketing', 'Legal Time & Expense Billing', 'Contract Lifecycle Management', 'Precedent RAG Knowledge Base', 'Conflict Check Engine'],
        supportedEcosystems: ['eco-17-legal'],
        stableKernelContracts: ['UEOS-Kernel-Identity', 'FAAP-Ledger-Bridge', 'AEGIS-Zero-Trust', 'Unified-Event-Bus']
      },
      {
        id: 'factory-hr-15',
        name: 'HR Digital Product Factory',
        category: 'Enterprise Shared Service',
        domain: 'Human Capital & Payroll',
        version: '5.0.0-NATIONAL',
        capabilities: ['Employee Master Registry', 'Recruitment & ATS', 'Time & Attendance Tracking', 'Payroll Engine & Tax Withholding', 'Performance Appraisals', 'Learning Management (LMS)'],
        supportedEcosystems: ['eco-18-hr-payroll'],
        stableKernelContracts: ['UEOS-Kernel-Identity', 'FAAP-Ledger-Bridge', 'AEGIS-Zero-Trust', 'Unified-Event-Bus']
      },
      {
        id: 'factory-research-16',
        name: 'Research & Innovation Digital Product Factory',
        category: 'Institutional',
        domain: 'Scientific & Academic Research',
        version: '5.0.0-NATIONAL',
        capabilities: ['Grant Proposal Engine', 'Lab Asset & Chemical Inventory', 'Ethics Board Approval Workflows', 'Patent & IP Repository', 'Peer Review System', 'Open Data Repository'],
        supportedEcosystems: ['eco-10-research-innovation'],
        stableKernelContracts: ['UEOS-Kernel-Identity', 'FAAP-Ledger-Bridge', 'AEGIS-Zero-Trust', 'Unified-Event-Bus']
      }
    ];

    factoryDefs.forEach(def => {
      this.factories.set(def.id, {
        ...def,
        status: 'ACTIVE',
        operations: {
          canBuild: true,
          canConfigure: true,
          canManufacture: true,
          canVerify: true,
          canDeploy: true,
          canOperate: true,
          canBackup: true,
          canRecover: true,
          canUpgrade: true
        }
      });
    });
  }

  public static getFactory(factoryId: string): SpecializedDigitalProductFactory | undefined {
    return this.factories.get(factoryId);
  }

  public static getFactoryByDomain(domain: string): SpecializedDigitalProductFactory | undefined {
    const lower = domain.toLowerCase();
    for (const factory of this.factories.values()) {
      if (factory.domain.toLowerCase().includes(lower) || factory.name.toLowerCase().includes(lower)) {
        return factory;
      }
    }
    return Array.from(this.factories.values())[0];
  }

  public static getAllFactories(): SpecializedDigitalProductFactory[] {
    return Array.from(this.factories.values());
  }

  public static registerFactory(factory: SpecializedDigitalProductFactory): void {
    this.factories.set(factory.id, factory);
  }
}
