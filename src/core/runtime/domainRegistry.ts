import { RegistryRepository, AuditLogRepository } from "../../repositories/repositories";

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

export class DomainRegistryService {
  private static instance: DomainRegistryService;
  private domains: Map<string, DomainConfig> = new Map();

  private constructor() {
    this.initializeDefaultDomains();
  }

  public static getInstance(): DomainRegistryService {
    if (!DomainRegistryService.instance) {
      DomainRegistryService.instance = new DomainRegistryService();
    }
    return DomainRegistryService.instance;
  }

  private initializeDefaultDomains() {
    const defaultDomains: DomainConfig[] = [
      {
        id: "ALUMNI",
        name: "Alumni ERP & Portal",
        isActive: true,
        tenantId: "alumni-global-network",
        dependencies: ["Identity", "Notification"],
        metadata: {
          id: "alumni_erp",
          name: "Alumni ERP & Portal",
          description: "Graduates and institutional networking platform with automated tracking and events logging.",
          tier: "Standard",
          supportedFeatures: ["Alumni Portal", "Campaign Manager", "Credential Registry"]
        }
      },
      {
        id: "SACCO",
        name: "SACCO ERP Node",
        isActive: true,
        tenantId: "sacco-zambia-hq",
        dependencies: ["Identity", "FAAP", "Notification"],
        metadata: {
          id: "sacco_erp",
          name: "SACCO ERP Node",
          description: "High-throughput credit union, savings and microfinance accounting platform.",
          tier: "Enterprise Platinum",
          supportedFeatures: ["Dividends Engine", "Credit Scoring", "Ledger Synchronization"]
        }
      },
      {
        id: "CHURCH",
        name: "Church ERP Platform",
        isActive: true,
        tenantId: "church-uganda-diocese",
        dependencies: ["Identity", "FAAP", "Notification"],
        metadata: {
          id: "church_erp",
          name: "Church ERP Platform",
          description: "Congregation dashboard, donations accounting, and community outreach planner.",
          tier: "Standard",
          supportedFeatures: ["Tithes & Offering Tracker", "Pledge Drive", "Ministry Outreach Engine"]
        }
      },
      {
        id: "NGO",
        name: "NGO ERP Platform",
        isActive: false,
        tenantId: "ngo-un-affiliate-east-africa",
        dependencies: ["Identity", "FAAP", "Notification"],
        metadata: {
          id: "ngo_erp",
          name: "NGO ERP Platform",
          description: "Grants management, humanitarian program tracking, and multi-currency reporting.",
          tier: "Enterprise Platinum",
          supportedFeatures: ["Grant Allocations Ledger", "Donor Portal", "Field Program Auditing"]
        }
      },
      {
        id: "ENTERPRISE",
        name: "Enterprise Multi-Tenant ERP",
        isActive: true,
        tenantId: "jumo-conglomerate-holding",
        dependencies: ["Identity", "FAAP", "Notification", "AI_Gateway"],
        metadata: {
          id: "enterprise_erp",
          name: "Enterprise Multi-Tenant ERP",
          description: "Comprehensive corporate resource suite, real-time supply chain ledger, and predictive AI modules.",
          tier: "Enterprise Platinum",
          supportedFeatures: ["Master Consolidation Ledger", "Supplier Portal", "Predictive Analytics Swarm"]
        }
      }
    ];

    for (const d of defaultDomains) {
      this.domains.set(d.id, d);
      // Sync with DB registry repository
      RegistryRepository.save({
        name: `DOMAIN_${d.id}`,
        type: "Enterprise_Domain",
        status: d.isActive ? "Active" : "Inactive",
        tenant: d.tenantId,
        version: "Phase 1.0.0-PROD",
        permissions: d.dependencies.join(","),
        updatedBy: "Kernel_Operator"
      });
    }
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
    
    // Update DB
    const dbReg = RegistryRepository.findByName(`DOMAIN_${id}`);
    if (dbReg) {
      dbReg.status = "Active";
      dbReg.updatedBy = operator;
      RegistryRepository.save(dbReg);
    }

    AuditLogRepository.log(
      operator,
      "DOMAIN_ACTIVATE",
      `Activated enterprise domain platform module: ${id} for tenant context [${domain.tenantId}].`
    );
    return true;
  }

  public deactivateDomain(id: string, operator: string = "Kernel_Operator"): boolean {
    const domain = this.domains.get(id);
    if (!domain) return false;
    domain.isActive = false;

    // Update DB
    const dbReg = RegistryRepository.findByName(`DOMAIN_${id}`);
    if (dbReg) {
      dbReg.status = "Inactive";
      dbReg.updatedBy = operator;
      RegistryRepository.save(dbReg);
    }

    AuditLogRepository.log(
      operator,
      "DOMAIN_DEACTIVATE",
      `Deactivated enterprise domain platform module: ${id} for tenant context [${domain.tenantId}].`
    );
    return true;
  }
}

export const domainRegistryService = DomainRegistryService.getInstance();
