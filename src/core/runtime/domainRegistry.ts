export interface DomainMetadata {
  id: string;
  name: string;
  description: string;
  tier: "Developer" | "Standard" | "Enterprise Platinum";
  supportedFeatures: string[];
}

export interface DomainConfig {
  id: string;
  name: string;
  metadata: DomainMetadata;
  isActive: boolean;
  tenantId: string;
  dependencies: string[];
}

export type DomainFamily = 
  | 'JUMO FINTECH'
  | 'Education & Alumni ERP'
  | 'Church & Diocese ERP';

export interface DomainPackage {
  id: string;
  family: DomainFamily;
  name: string;
  version: string;
  description: string;
  editions: string[];
  modules: string[];
  aiAgents: string[];
  dependencies: string[];
  status: 'available' | 'installed' | 'suspended';
  installedTenant?: string;
  installedEdition?: string;
}

export const MASTER_DOMAIN_PACKAGES: DomainPackage[] = [
  // 1. JUMO FINTECH
  {
    id: "JUMO-FINTECH",
    family: "JUMO FINTECH",
    name: "JUMO FINTECH",
    version: "16.0.0",
    description: "Unified financial-services platform. Combines FAAP Accounting, Digital Pay, Banking, Lending, Microfinance, and SACCO capabilities into one modular ecosystem.",
    editions: ["Microfinance Edition", "SACCO Pro", "Digital Banking Suite", "Sovereign Treasury Switch"],
    modules: ["Accounting & GL", "Universal Payments", "Digital Banking", "Lending & Credit", "Microfinance & SACCO", "Treasury & Liquidity", "Risk & Compliance"],
    aiAgents: ["Financial Swarm Auditor", "Credit Risk Copilot"],
    dependencies: ["Identity", "AEGIS", "Workflow"],
    status: "installed",
    installedTenant: "JUMO Global Fintech Hub",
    installedEdition: "Sovereign Treasury Switch"
  },

  // 2. EDUCATION & ALUMNI ERP
  {
    id: "JUMO-EDU-ALUMNI",
    family: "Education & Alumni ERP",
    name: "JUMO Education & Alumni ERP",
    version: "14.4.0",
    description: "Universal Education Management & Institutional Advancement. Covers the complete lifecycle from Applicant to Student to Alumnus and Endowment management.",
    editions: ["K-12 Academy", "Higher Ed University", "Alumni Association", "Sovereign Academic Hub"],
    modules: ["Student Information System", "Admissions", "Course Management", "Examination Management", "Alumni Directory", "Donations & Pledges", "Credential Vault", "Career Networking"],
    aiAgents: ["Academic Advisor AI", "Alumni Relations Copilot"],
    dependencies: ["Identity", "FAAP", "AEGIS", "Notification"],
    status: "installed",
    installedTenant: "Universal Sovereign Campus",
    installedEdition: "Higher Ed University"
  },

  // 3. CHURCH & DIOCESE ERP
  {
    id: "JUMO-CHURCH",
    family: "Church & Diocese ERP",
    name: "JUMO Church & Diocese ERP",
    version: "8.0.0",
    description: "Authoritative faith-based governance and administrative operating system for dioceses and parish networks.",
    editions: ["Parish Edition", "Diocese Hub", "National Synod", "Global Ministry Platform"],
    modules: ["Membership & Cell Groups", "Ministries & Volunteer Rosters", "Giving & Tithes Ledger", "Sacramental Vault", "Diocesan Governance", "Communication & SMS"],
    aiAgents: ["Pastoral Care Assistant AI", "Synod Advisor"],
    dependencies: ["Identity", "FAAP", "AEGIS", "Notification"],
    status: "installed",
    installedTenant: "Universal Sovereign Diocese",
    installedEdition: "Diocese Hub"
  }
];

export class DomainRegistryService {
  private static instance: DomainRegistryService;
  private domains: Map<string, DomainConfig> = new Map();
  private packages: Map<string, DomainPackage> = new Map();

  private constructor() {
    this.initializeDefaultDomains();
    this.initializeMasterPackages();
  }

  public static getInstance(): DomainRegistryService {
    if (!DomainRegistryService.instance) {
      DomainRegistryService.instance = new DomainRegistryService();
    }
    return DomainRegistryService.instance;
  }

  private initializeMasterPackages() {
    for (const pkg of MASTER_DOMAIN_PACKAGES) {
      this.packages.set(pkg.id, pkg);
    }
  }

  private initializeDefaultDomains() {
    const defaultDomains: DomainConfig[] = [
      {
        id: "JUMO-EDU-ALUMNI",
        name: "Education & Alumni ERP",
        isActive: true,
        tenantId: "alumni-global-network",
        dependencies: ["Identity", "AEGIS", "Notification"],
        metadata: {
          id: "JUMO-EDU-ALUMNI",
          name: "Education & Alumni ERP",
          description: "Graduates and institutional networking platform with automated tracking and events logging.",
          tier: "Enterprise Platinum",
          supportedFeatures: ["Alumni Portal", "Campaign Manager", "Credential Registry", "Student Lifecycle"]
        }
      },
      {
        id: "JUMO-FINTECH",
        name: "JUMO FINTECH",
        isActive: true,
        tenantId: "jumo-global-fintech",
        dependencies: ["Identity", "AEGIS", "FAAP"],
        metadata: {
          id: "JUMO-FINTECH",
          name: "JUMO FINTECH",
          description: "Unified financial-services platform. Accounting, Payments, Banking, Lending, and SACCO governance.",
          tier: "Enterprise Platinum",
          supportedFeatures: ["Double-Entry GL", "Universal Payment Switch", "Credit Scoring", "Microfinance & SACCO"]
        }
      },
      {
        id: "JUMO-CHURCH",
        name: "Church & Diocese ERP",
        isActive: true,
        tenantId: "church-uganda-diocese",
        dependencies: ["Identity", "AEGIS", "FAAP", "Notification"],
        metadata: {
          id: "JUMO-CHURCH",
          name: "Church & Diocese ERP",
          description: "Congregation dashboard, donations accounting, and community outreach planner.",
          tier: "Enterprise Platinum",
          supportedFeatures: ["Tithes & Offering Tracker", "Pledge Drive", "Ministry Outreach Engine", "Diocesan Hub"]
        }
      }
    ];

    for (const d of defaultDomains) {
      this.domains.set(d.id, d);
    }
  }

  public getAllPackages(): DomainPackage[] {
    return Array.from(this.packages.values());
  }

  public getPackagesByFamily(family: DomainFamily): DomainPackage[] {
    return this.getAllPackages().filter(p => p.family === family);
  }

  public getPackageById(id: string): DomainPackage | undefined {
    return this.packages.get(id);
  }

  public installPackage(packageId: string, tenantName: string, selectedEdition: string): boolean {
    const pkg = this.packages.get(packageId);
    if (!pkg) return false;

    pkg.status = 'installed';
    pkg.installedTenant = tenantName;
    pkg.installedEdition = selectedEdition;
    this.packages.set(packageId, pkg);

    console.log(`[DOMAIN_REGISTRY] Provisioned enterprise domain package [${pkg.name}] for tenant [${tenantName}] under edition [${selectedEdition}].`);
    return true;
  }

  public uninstallPackage(packageId: string): boolean {
    const pkg = this.packages.get(packageId);
    if (!pkg) return false;

    pkg.status = 'available';
    pkg.installedTenant = undefined;
    pkg.installedEdition = undefined;
    this.packages.set(packageId, pkg);

    console.log(`[DOMAIN_REGISTRY] Uninstalled enterprise domain package [${pkg.name}].`);
    return true;
  }

  public getDomain(id: string): DomainConfig | undefined {
    return this.domains.get(id);
  }

  public getAllDomains(): DomainConfig[] {
    return Array.from(this.domains.values());
  }

  public activateDomain(id: string, operator: string = "Kernel_Operator"): boolean {
    const domain = this.domains.get(id);
    if (!domain) return false;
    domain.isActive = true;
    
    console.log(`[DOMAIN_REGISTRY] Activated enterprise domain platform module: ${id} by ${operator} for tenant [${domain.tenantId}].`);
    return true;
  }

  public deactivateDomain(id: string, operator: string = "Kernel_Operator"): boolean {
    const domain = this.domains.get(id);
    if (!domain) return false;
    domain.isActive = false;

    console.log(`[DOMAIN_REGISTRY] Deactivated enterprise domain platform module: ${id} by ${operator} for tenant [${domain.tenantId}].`);
    return true;
  }
}

export const domainRegistryService = DomainRegistryService.getInstance();
