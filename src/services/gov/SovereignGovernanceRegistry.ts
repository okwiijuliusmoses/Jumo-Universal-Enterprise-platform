import { AuditEvent, ProvisioningCategory } from "../../core/runtime/sovereignState.types";

export interface SovereignLedgerEntry {
  id: string;
  timestamp: string;
  event: string;
  domain: string;
  details: string;
  operator: string;
  hash: string;
}

export class SovereignGovernanceRegistry {
  private static instance: SovereignGovernanceRegistry;
  private ledger: SovereignLedgerEntry[] = [];
  private productSpecifications: Map<string, any> = new Map();
  private auditEvents: AuditEvent[] = [];

  private constructor() {}

  public static getInstance(): SovereignGovernanceRegistry {
    if (!SovereignGovernanceRegistry.instance) {
      SovereignGovernanceRegistry.instance = new SovereignGovernanceRegistry();
    }
    return SovereignGovernanceRegistry.instance;
  }

  private generateHash(data: string): string {
    return 'sha256-' + Buffer.from(data).toString('base64').substring(0, 32);
  }

  public addLedgerEntry(event: string, domain: string, details: string, operator: string = "SYSTEM") {
    const entry: SovereignLedgerEntry = {
      id: `ledg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
      event,
      domain,
      details,
      operator,
      hash: this.generateHash(`${event}:${domain}:${details}:${Date.now()}`)
    };
    this.ledger.push(entry);
    return entry;
  }

  public async logAuditEvent(event: AuditEvent) {
    this.auditEvents.push(event);
    this.addLedgerEntry(event.operation, "AUDIT", event.details, event.actor);
  }

  public getAuditEvents() {
    return [...this.auditEvents];
  }

  public registerProductSpecification(productId: string, spec: any) {
    this.productSpecifications.set(productId, spec);
    this.addLedgerEntry("Product Specification Registered", "REGISTRY", `Product metadata for ${productId} compiled into ledger.`);
  }

  public getProductSpecification(productId: string): any {
    return this.productSpecifications.get(productId);
  }

  public getAllProductSpecifications(): any[] {
    return Array.from(this.productSpecifications.values());
  }

  public getLedger() {
    return [...this.ledger];
  }
}
