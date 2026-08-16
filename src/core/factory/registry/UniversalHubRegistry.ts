// JUMO National Manufacturing Hub — Authoritative Universal Hub Registry
// Phase 1: Registry Foundation Only

import {
  AuthoritativeRegistryRecord,
  ERPEcosystemRegistryRecord,
  CommercialProductsEcosystemRegistryRecord,
  SoftwareEcosystemRegistryRecord,
  ResearchInnovationEcosystemRegistryRecord,
  JumoCloudEcosystemRegistryRecord,
  BlueprintRegistryRecord,
  ComponentRegistryRecord,
  ModuleRegistryRecord,
  PortalRegistryRecord,
  FormRegistryRecord,
  WorkflowRegistryRecord,
  DeploymentRegistryRecord,
  VerificationRegistryRecord,
  VerificationLayer,
  VerificationProfile,
  UpgradeRegistryRecord,
  MaintenanceRegistryRecord,
  ProductLifecycleState,
  ManufacturingCategory
} from "./HubRegistryTypes";

import { EcosystemRegistry } from "../../runtime/ecosystemRegistry";
import { ERPTemplateRegistry } from "../../runtime/erpTemplateRegistry";
import { ERPInstanceRegistry } from "../../runtime/instanceRegistry";
import { ModuleRegistry } from "../../runtime/moduleRegistry";
import { PortalRegistry } from "../../runtime/portalRegistry";
import { ComponentRegistry } from "../../runtime/componentRegistry";
import { FormRegistry } from "../../runtime/formRegistry";
import { WorkflowRegistry } from "../../runtime/workflowRegistry";
import { ServiceRegistry } from "../../runtime/serviceRegistry";
import { JumoAIAgentRegistry } from "../../ai/registry/JumoAIAgentRegistry";

export class UniversalHubRegistry {
  private static masterRecords: Map<string, AuthoritativeRegistryRecord> = new Map();
  private static blueprints: Map<string, BlueprintRegistryRecord> = new Map();
  private static deployments: Map<string, DeploymentRegistryRecord> = new Map();
  private static verifications: Map<string, VerificationRegistryRecord> = new Map();
  private static verificationLayers: Map<string, VerificationLayer> = new Map();
  private static verificationProfiles: Map<string, VerificationProfile> = new Map();
  private static upgrades: Map<string, UpgradeRegistryRecord> = new Map();
  private static maintenanceLogs: Map<string, MaintenanceRegistryRecord> = new Map();

  static {
    this.seedInitialAuthoritativeRegistries();
    this.seedVerificationRegistries();
    console.log('[JUMO BOOT 09] Registry initialized');
  }

  private static seedVerificationRegistries() {
    const categories = [
      { id: "SRC", name: "Source Integrity", layers: ["Checksum", "Signature", "Provenance", "History", "Author"] },
      { id: "ARCH", name: "Architecture Conformance", layers: ["Contract", "Hierarchy", "Naming", "Module", "Dependency"] },
      { id: "DEP", name: "Dependency Integrity", layers: ["Version", "License", "Security", "Chain", "Registry"] },
      { id: "BUILD", name: "Build Integrity", layers: ["Reproducibility", "Environment", "Artifact", "Hash", "Sign"] },
      { id: "TYPE", name: "Type Safety", layers: ["Static", "Runtime", "Schema", "Interface", "Boundary"] },
      { id: "API", name: "API Correctness", layers: ["Spec", "Versioning", "Payload", "Status", "Contract"] },
      { id: "DB", name: "Database Integrity", layers: ["Schema", "Relation", "Constraint", "Migration", "Seed"] },
      { id: "AUTH", name: "Authentication", layers: ["MFA", "SSO", "Session", "Token", "Identity"] },
      { id: "AUTHZ", name: "Authorization", layers: ["RBAC", "ABAC", "Scope", "Permission", "Policy"] },
      { id: "ZT", name: "Zero Trust", layers: ["Network", "Endpoint", "Data", "Workload", "Traffic"] },
      { id: "ENC", name: "Encryption", layers: ["AtRest", "InTransit", "InUse", "Algorithm", "Key"] },
      { id: "SEC", name: "Secrets Protection", layers: ["Storage", "Rotation", "Exposure", "Access", "Audit"] },
      { id: "VULN", name: "Vulnerability Scanning", layers: ["Static", "Dynamic", "Component", "OS", "Container"] },
      { id: "MAL", name: "Malware Inspection", layers: ["Signature", "Behavior", "Heuristic", "Sandbox", "Report"] },
      { id: "LOG", name: "Logging", layers: ["Format", "Retention", "Security", "Audit", "Search"] },
      { id: "MON", name: "Monitoring", layers: ["Metrics", "Health", "Alert", "Threshold", "Dashboard"] },
      { id: "OBS", name: "Observability", layers: ["Trace", "Span", "Context", "Sampling", "Analysis"] },
      { id: "ERR", name: "Error Handling", layers: ["Boundary", "Recovery", "Graceful", "Circuit", "Retry"] },
      { id: "PERF", name: "Performance", layers: ["Latency", "Throughput", "Resource", "Load", "Stress"] },
      { id: "SCALE", name: "Scalability", layers: ["Horizontal", "Vertical", "Auto", "Limits", "Queue"] },
      { id: "AVAIL", name: "Availability", layers: ["Uptime", "SLA", "Redundancy", "Failover", "Region"] },
      { id: "DR", name: "Disaster Recovery", layers: ["RPO", "RTO", "Backup", "Restore", "Drill"] },
      { id: "SYNC", name: "Synchronization", layers: ["State", "Conflict", "Reconcile", "Offline", "Queue"] },
      { id: "WORK", name: "Workflow Correctness", layers: ["Step", "Transition", "Approval", "State", "History"] },
      { id: "FORM", name: "Form Validation", layers: ["Input", "Sanitization", "Mask", "Error", "Submit"] },
      { id: "UI", name: "UI/UX Quality", layers: ["Accessibility", "Mobile", "Responsive", "Locale", "Theme"] },
      { id: "DATA", name: "Data Governance", layers: ["Privacy", "Retention", "Lineage", "Quality", "Consent"] },
      { id: "COMP", name: "Compliance", layers: ["Legal", "Regulatory", "Industry", "Audit", "Cert"] },
      { id: "DEPLOY", name: "Deployment Integrity", layers: ["Environment", "Config", "Health", "Rollback", "Verification"] },
      { id: "LIFE", name: "Lifecycle Integrity", layers: ["Version", "Migration", "Deprecation", "Retired", "Archive"] },
      { id: "FAAP", name: "FAAP Integration", layers: ["Ledger", "Journal", "Balance", "Audit", "Asset"] },
      { id: "PAY", name: "Digital Pay Integration", layers: ["Intent", "Charge", "Settle", "Route", "Reconcile"] },
      { id: "AEGIS", name: "Aegis Integration", layers: ["Threat", "Intrusion", "Signature", "Shield", "Log"] },
      { id: "AUDIT", name: "Digital Auditor Integration", layers: ["Evidence", "Chain", "Proof", "Report", "Archive"] }
    ];

    let layerCount = 0;
    const allLayerIds: string[] = [];

    categories.forEach(cat => {
      cat.layers.forEach((l, idx) => {
        layerCount++;
        const layerId = `layer-${cat.id.toLowerCase()}-${(idx + 1).toString().padStart(2, '0')}`;
        const gate = `GATE_${Math.min(20, Math.ceil(layerCount / 5))}` as any;
        
        this.verificationLayers.set(layerId, {
          layerId,
          name: `${cat.name}: ${l}`,
          description: `Authoritative verification of ${l.toLowerCase()} within ${cat.name} context.`,
          category: cat.id,
          gate,
          enabled: true,
          mandatory: idx === 0, // Make the first in each category mandatory
          blocking: idx === 0,
          severity: idx === 0 ? "CRITICAL" : "WARNING",
          standards: ["JUMO-UEOS-STD-v1"]
        });
        allLayerIds.push(layerId);
      });
    });

    // Ecosystem Specific Layers
    const ecosystems: ManufacturingCategory[] = [
      "ERP_ECOSYSTEM", "JUMO_CLOUD_ECOSYSTEM", "SOFTWARE_ECOSYSTEM", 
      "COMMERCIAL_PRODUCTS_ECOSYSTEM", "RESEARCH_INNOVATION_ECOSYSTEM"
    ];

    ecosystems.forEach(eco => {
      for (let i = 1; i <= 5; i++) {
        const layerId = `layer-eco-${String(eco ?? "").substring(0, 3).toLowerCase()}-${i.toString().padStart(2, '0')}`;
        this.verificationLayers.set(layerId, {
          layerId,
          name: `${eco.replace('_', ' ')}: Layer ${i}`,
          description: `Ecosystem-specific verification for ${eco}.`,
          category: eco,
          gate: "GATE_20",
          enabled: true,
          mandatory: false,
          blocking: false,
          severity: "INFO",
          standards: [eco]
        });
        allLayerIds.push(layerId);
      }
    });

    this.verificationProfiles.set("default-profile", {
      profileId: "default-profile",
      name: "Authoritative JUMO Platform Verification Baseline",
      description: "Minimum sovereign verification baseline for all manufactured products.",
      layerIds: allLayerIds
    });
  }

  public static getVerificationLayers(layerIds: string[]): VerificationLayer[] {
    return layerIds.map(id => this.verificationLayers.get(id)).filter(l => l !== undefined) as VerificationLayer[];
  }

  public static getProfile(profileId: string): VerificationProfile | undefined {
    return this.verificationProfiles.get(profileId);
  }

  /**
   * Seed baseline records for all 20 required registries and connect existing core runtime data.
   */
  private static seedInitialAuthoritativeRegistries() {
    // 1. ERP Ecosystem Registry Baseline
    const erpEcosystems: ERPEcosystemRegistryRecord[] = [];

    erpEcosystems.forEach(e => this.masterRecords.set(e.registryId, e));

    // 2. Commercial Product Registry Baseline (Pointing to real underlying services)
    const commercialProducts: CommercialProductsEcosystemRegistryRecord[] = [
      {
        id: "REC-PROD-FAAP-001",
        productId: "prod-faap",
        registryId: "prod-faap",
        name: "JUMO FAAP (Federal Assets & Accounting Platform)",
        ecosystem: "COMMERCIAL_PRODUCTS_ECOSYSTEM",
        category: "COMMERCIAL_PRODUCTS_ECOSYSTEM",
        lifecycleState: "OPERATIONAL",
        version: "v5.0.0-AUTHORITATIVE",
        repository: "Jumo-Universal-Enterprise-platform",
        branch: "manufacturing-hub-architecture",
        implementationVersion: "v5.0.0",
        architectureBaseline: "eefd3bc",
        dependencies: ["prod-identity", "prod-auditor"],
        capabilities: ["General Ledger Authority", "Journal Entry Lifecycle", "Asset Depreciation Engine", "Treasury Liquidity Pools"],
        services: ["FAAPEnterpriseEngine", "FAAPLedgerEngine", "FAAPOfficeIntegration"],
        apis: ["/api/faap/journals", "/api/faap/accounts", "/api/faap/balance"],
        testStatus: "PASSED",
        deploymentStatus: "DEPLOYED",
        upgradeStatus: "UP_TO_DATE",
        maintenanceStatus: "HEALTHY",
        verificationStatus: "VERIFIED",
        lastAuditTimestamp: new Date().toISOString(),
        engineService: "FAAPEnterpriseEngine",
        faapLedgerAuthority: true,
        digitalPaySettlementBridge: true
      },
      {
        id: "REC-PROD-PAY-001",
        productId: "prod-pay",
        registryId: "prod-pay",
        name: "JUMO DIGITAL PAY (Sovereign Digital Payments Gateway)",
        ecosystem: "COMMERCIAL_PRODUCTS_ECOSYSTEM",
        category: "COMMERCIAL_PRODUCTS_ECOSYSTEM",
        lifecycleState: "OPERATIONAL",
        version: "v4.5.0-SETTLEMENT",
        repository: "Jumo-Universal-Enterprise-platform",
        branch: "manufacturing-hub-architecture",
        implementationVersion: "v4.5.0",
        architectureBaseline: "eefd3bc",
        dependencies: ["prod-faap", "prod-identity"],
        capabilities: ["Multi-Channel Payment Routing", "Settlement Orchestration", "Wallet Account Management", "FAAP Settlement Bridge"],
        services: ["PaymentOrchestrator", "PaymentRoutingService", "SettlementOrchestrator", "PaymentLedgerBridge"],
        apis: ["/api/pay/intent", "/api/pay/charge", "/api/pay/settle"],
        testStatus: "PASSED",
        deploymentStatus: "DEPLOYED",
        upgradeStatus: "UP_TO_DATE",
        maintenanceStatus: "HEALTHY",
        verificationStatus: "VERIFIED",
        lastAuditTimestamp: new Date().toISOString(),
        engineService: "PaymentOrchestrator",
        faapLedgerAuthority: false,
        digitalPaySettlementBridge: true
      },
      {
        id: "REC-PROD-TREASURY-001",
        productId: "prod-treasury",
        registryId: "prod-treasury",
        name: "JUMO TREASURY (Reserve Liquidity & Yield Engine)",
        ecosystem: "COMMERCIAL_PRODUCTS_ECOSYSTEM",
        category: "COMMERCIAL_PRODUCTS_ECOSYSTEM",
        lifecycleState: "OPERATIONAL",
        version: "v3.2.0",
        repository: "Jumo-Universal-Enterprise-platform",
        branch: "manufacturing-hub-architecture",
        implementationVersion: "v3.2.0",
        architectureBaseline: "eefd3bc",
        dependencies: ["prod-faap"],
        capabilities: ["Reserve Liquidity Pools", "Yield Swarm Analytics", "Interbank Clearing Supervision"],
        services: ["TreasuryQueue", "RevenueRecognitionService"],
        apis: ["/api/treasury/reserves", "/api/treasury/liquidity"],
        testStatus: "PASSED",
        deploymentStatus: "DEPLOYED",
        upgradeStatus: "UP_TO_DATE",
        maintenanceStatus: "HEALTHY",
        verificationStatus: "VERIFIED",
        lastAuditTimestamp: new Date().toISOString(),
        engineService: "TreasuryQueue",
        faapLedgerAuthority: false,
        digitalPaySettlementBridge: true
      },
      {
        id: "REC-PROD-AUDITOR-001",
        productId: "prod-auditor",
        registryId: "prod-auditor",
        name: "JUMO DIGITAL AUDITOR (Continuous Cryptographic Audit)",
        ecosystem: "COMMERCIAL_PRODUCTS_ECOSYSTEM",
        category: "COMMERCIAL_PRODUCTS_ECOSYSTEM",
        lifecycleState: "OPERATIONAL",
        version: "v2.8.0",
        repository: "Jumo-Universal-Enterprise-platform",
        branch: "manufacturing-hub-architecture",
        implementationVersion: "v2.8.0",
        architectureBaseline: "eefd3bc",
        dependencies: ["prod-faap"],
        capabilities: ["Cryptographic Audit Chains", "Immutable Transaction Validation", "Real-time Compliance Violation Logs"],
        services: ["AuditSystem", "FinancialAuditorService"],
        apis: ["/api/audit/verify", "/api/audit/logs"],
        testStatus: "PASSED",
        deploymentStatus: "DEPLOYED",
        upgradeStatus: "UP_TO_DATE",
        maintenanceStatus: "HEALTHY",
        verificationStatus: "VERIFIED",
        lastAuditTimestamp: new Date().toISOString(),
        engineService: "AuditSystem",
        faapLedgerAuthority: false,
        digitalPaySettlementBridge: false
      },
      {
        id: "REC-PROD-AEGIS-001",
        productId: "prod-aegis",
        registryId: "prod-aegis",
        name: "JUMO AEGIS (Sovereign Cybersecurity & Threat Center)",
        ecosystem: "COMMERCIAL_PRODUCTS_ECOSYSTEM",
        category: "COMMERCIAL_PRODUCTS_ECOSYSTEM",
        lifecycleState: "OPERATIONAL",
        version: "v4.0.1",
        repository: "Jumo-Universal-Enterprise-platform",
        branch: "manufacturing-hub-architecture",
        implementationVersion: "v4.0.1",
        architectureBaseline: "eefd3bc",
        dependencies: ["prod-identity"],
        capabilities: ["Intrusion Prevention System (IPS)", "DDoS Suppression", "Signature Verification Daemon"],
        services: ["SecurityGovernor", "SecurityProvisioner"],
        apis: ["/api/aegis/threats", "/api/aegis/authorize"],
        testStatus: "PASSED",
        deploymentStatus: "DEPLOYED",
        upgradeStatus: "UP_TO_DATE",
        maintenanceStatus: "HEALTHY",
        verificationStatus: "VERIFIED",
        lastAuditTimestamp: new Date().toISOString(),
        engineService: "SecurityGovernor",
        faapLedgerAuthority: false,
        digitalPaySettlementBridge: false
      }
    ];

    commercialProducts.forEach(p => this.masterRecords.set(p.registryId, p));

    const jumoCloudEcosystems: JumoCloudEcosystemRegistryRecord[] = [
      {
        id: "REC-PROD-CLOUD-001",
        productId: "prod-cloud",
        registryId: "prod-cloud",
        name: "JUMO CLOUD (Sovereign Infrastructure Orchestrator)",
        ecosystem: "JUMO_CLOUD_ECOSYSTEM",
        category: "JUMO_CLOUD_ECOSYSTEM",
        lifecycleState: "OPERATIONAL",
        version: "v3.5.0",
        repository: "Jumo-Universal-Enterprise-platform",
        branch: "manufacturing-hub-architecture",
        implementationVersion: "v3.5.0",
        architectureBaseline: "eefd3bc",
        dependencies: [],
        capabilities: ["Hyperconverged Cluster Allocator", "Node Hypervisor Router", "Container Provisioner"],
        services: ["PlatformProvisioner", "DeploymentManager"],
        apis: ["/api/cloud/nodes", "/api/cloud/provision"],
        testStatus: "PASSED",
        deploymentStatus: "DEPLOYED",
        upgradeStatus: "UP_TO_DATE",
        maintenanceStatus: "HEALTHY",
        verificationStatus: "VERIFIED",
        lastAuditTimestamp: new Date().toISOString(),
        nodeCluster: "Sovereign Node Cluster A",
        autoScaling: true
      }
    ];

    jumoCloudEcosystems.forEach(c => this.masterRecords.set(c.registryId, c));

    // Seed initial compiler blueprints (empty for clean boot state)
  }

  // 1. ERP ECOSYSTEM REGISTRY ACCESSORS
  static getERPEcosystems(): ERPEcosystemRegistryRecord[] {
    return Array.from(this.masterRecords.values()).filter(
      r => r.category === "ERP_ECOSYSTEM"
    ) as ERPEcosystemRegistryRecord[];
  }

  // 2. ERP TEMPLATE REGISTRY ACCESSORS
  static getERPTemplates() {
    return ERPTemplateRegistry.getAll();
  }

  // 3. ERP INSTANCE REGISTRY ACCESSORS
  static getERPInstances() {
    return ERPInstanceRegistry.getAll();
  }

  // 4. COMMERCIAL PRODUCTS ECOSYSTEM REGISTRY ACCESSORS
  static getCommercialProducts(): CommercialProductsEcosystemRegistryRecord[] {
    return Array.from(this.masterRecords.values()).filter(
      r => r.category === "COMMERCIAL_PRODUCTS_ECOSYSTEM"
    ) as CommercialProductsEcosystemRegistryRecord[];
  }

  // 5. SOFTWARE ECOSYSTEM REGISTRY ACCESSORS
  static getSoftwareProducts(): SoftwareEcosystemRegistryRecord[] {
    return Array.from(this.masterRecords.values()).filter(
      r => r.category === "SOFTWARE_ECOSYSTEM"
    ) as SoftwareEcosystemRegistryRecord[];
  }

  // 6. RESEARCH & INNOVATION ECOSYSTEM REGISTRY ACCESSORS
  static getResearchProducts(): ResearchInnovationEcosystemRegistryRecord[] {
    return Array.from(this.masterRecords.values()).filter(
      r => r.category === "RESEARCH_INNOVATION_ECOSYSTEM"
    ) as ResearchInnovationEcosystemRegistryRecord[];
  }

  static getAIAgentWorkforce() {
    return JumoAIAgentRegistry.getAllAgents();
  }

  static getAIAgentWorkforceStats() {
    return JumoAIAgentRegistry.getWorkforceStats();
  }

  // 7. PLATFORM REGISTRY ACCESSORS
  static getPlatforms(): AuthoritativeRegistryRecord[] {
    return Array.from(this.masterRecords.values()).filter(
      r => r.category === "ERP_ECOSYSTEM" || r.category === "COMMERCIAL_PRODUCTS_ECOSYSTEM" || r.category === "JUMO_CLOUD_ECOSYSTEM" || r.category === "SOFTWARE_ECOSYSTEM" || r.category === "RESEARCH_INNOVATION_ECOSYSTEM"
    );
  }

  // 8. JUMO CLOUD ECOSYSTEM REGISTRY ACCESSORS
  static getCloudServices(): JumoCloudEcosystemRegistryRecord[] {
    return Array.from(this.masterRecords.values()).filter(
      r => r.category === "JUMO_CLOUD_ECOSYSTEM"
    ) as JumoCloudEcosystemRegistryRecord[];
  }

  // 9. BLUEPRINT REGISTRY ACCESSORS
  static getBlueprints(): BlueprintRegistryRecord[] {
    return Array.from(this.blueprints.values());
  }

  // 10. COMPONENT REGISTRY ACCESSORS
  static getComponents() {
    return ComponentRegistry.getAll();
  }

  // 11. MODULE REGISTRY ACCESSORS
  static getModules() {
    return ModuleRegistry.getAll();
  }

  // 12. PORTAL REGISTRY ACCESSORS
  static getPortals() {
    return PortalRegistry.getAll();
  }

  // 13. FORM REGISTRY ACCESSORS
  static getForms() {
    return FormRegistry.getAll();
  }

  // 14. WORKFLOW REGISTRY ACCESSORS
  static getWorkflows() {
    return WorkflowRegistry.getAll();
  }

  // 15. SERVICE REGISTRY ACCESSORS
  static getServices() {
    return ServiceRegistry.getInstance().getAllServices();
  }

  // 16. DEPLOYMENT REGISTRY ACCESSORS
  static getDeployments(): DeploymentRegistryRecord[] {
    return Array.from(this.deployments.values());
  }

  // 17. TEST / VERIFICATION REGISTRY ACCESSORS
  static getVerifications(): VerificationRegistryRecord[] {
    return Array.from(this.verifications.values());
  }

  // 18. UPGRADE REGISTRY ACCESSORS
  static getUpgrades(): UpgradeRegistryRecord[] {
    return Array.from(this.upgrades.values());
  }

  // 19. MAINTENANCE REGISTRY ACCESSORS
  static getMaintenanceLogs(): MaintenanceRegistryRecord[] {
    return Array.from(this.maintenanceLogs.values());
  }

  // 20. LIFECYCLE REGISTRY ACCESSORS & MUTATORS
  static getRecordById(registryId: string): AuthoritativeRegistryRecord | undefined {
    return this.masterRecords.get(registryId);
  }

  static registerRecord(record: AuthoritativeRegistryRecord): AuthoritativeRegistryRecord {
    this.masterRecords.set(record.registryId, record);
    return record;
  }

  static updateLifecycleState(registryId: string, newState: ProductLifecycleState): boolean {
    const record = this.masterRecords.get(registryId);
    if (!record) return false;
    record.lifecycleState = newState;
    record.lastAuditTimestamp = new Date().toISOString();
    return true;
  }

  static registerBlueprint(bp: BlueprintRegistryRecord): BlueprintRegistryRecord {
    this.blueprints.set(bp.blueprintId, bp);
    return bp;
  }
}
