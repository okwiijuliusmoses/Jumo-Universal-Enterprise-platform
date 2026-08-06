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
        id: "KERNEL_CORE",
        name: "Sovereign Kernel Core",
        isActive: true,
        tenantId: "ueos-system",
        dependencies: ["Identity", "FAAP", "Notification", "AI_Gateway"],
        metadata: {
          id: "kernel_core",
          name: "Sovereign Kernel Core",
          description: "Primary runtime domain for JUMO UEOS system operations and platform orchestration.",
          tier: "Enterprise Platinum",
          supportedFeatures: ["Runtime Orchestration", "Security Firewall", "Financial Backbone"]
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
        version: "Phase 5.0.0-PROD",
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
