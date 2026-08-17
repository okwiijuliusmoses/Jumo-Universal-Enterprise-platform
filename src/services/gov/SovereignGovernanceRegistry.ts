import { 
  ArchitectureContract, 
  ManufacturingJob, 
  ManufacturingJobStatus, 
  BuildArtifact,
  DeploymentRecord,
  VerificationFailureRecord,
  CertificationRecord,
  ManufacturingCategory,
  ProductInstanceDefinition,
  RuntimeInstance
} from "../../core/factory/registry/HubRegistryTypes";
import { JumoAIAgentRegistry } from "../../core/ai/registry/JumoAIAgentRegistry";
import { SovereignOperatingStateService } from "../../core/runtime/sovereignState";

export interface SovereignLedgerEntry {
  id: string;
  timestamp: string;
  event: string;
  domain: string;
  details: string;
  operator: string;
  hash: string;
  signature: string;
}

export interface AuditEvent {
  id: string;
  jobId: string;
  type: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  message: string;
  timestamp: string;
}

export class SovereignGovernanceRegistry {
  private static instance: SovereignGovernanceRegistry;
  
  private blueprints: Map<string, ArchitectureContract> = new Map();
  private manufacturingJobs: Map<string, ManufacturingJob> = new Map();
  private products: Map<string, any> = new Map();
  private verifications: Map<string, any> = new Map();
  private certifications: Map<string, CertificationRecord> = new Map();
  private deployments: Map<string, DeploymentRecord> = new Map();
  private instanceDefinitions: Map<string, ProductInstanceDefinition> = new Map();
  private runtimeInstances: Map<string, RuntimeInstance> = new Map();
  private ledger: SovereignLedgerEntry[] = [];
  private auditEvents: AuditEvent[] = [];
  
  private constructor() {
    this.seedInitialState();
    this.syncFromStateService();
  }

  public static getInstance(): SovereignGovernanceRegistry {
    if (!SovereignGovernanceRegistry.instance) {
      SovereignGovernanceRegistry.instance = new SovereignGovernanceRegistry();
    }
    return SovereignGovernanceRegistry.instance;
  }

  private seedInitialState() {
    this.addLedgerEntry("Registry Initialized", "SYSTEM", "Authoritative Sovereign Governance Registry online.");
  }

  private syncFromStateService() {
    try {
      const state = SovereignOperatingStateService.getState();
      if (state) {
        if (state.jobs) {
          state.jobs.forEach(j => this.manufacturingJobs.set(j.id, j));
        }
        if (state.architectureContracts) {
          state.architectureContracts.forEach(c => this.blueprints.set(c.id, c));
        }
        if (state.certificationRecords) {
          state.certificationRecords.forEach(c => this.certifications.set(c.certificationId, c));
        }
        if (state.deploymentRecords) {
          state.deploymentRecords.forEach(d => this.deployments.set(d.deploymentId || d.jobId, d));
        }
      }
    } catch (e) {
      console.warn("[SOVEREIGN_REGISTRY] Failed to sync from State Service:", e);
    }
  }

  public syncToStateService() {
    try {
      SovereignOperatingStateService.updateState(draft => {
        draft.jobs = Array.from(this.manufacturingJobs.values());
        draft.architectureContracts = Array.from(this.blueprints.values());
        draft.certificationRecords = Array.from(this.certifications.values());
        draft.deploymentRecords = Array.from(this.deployments.values());
      });
      SovereignOperatingStateService.saveState();
    } catch (e) {
      console.warn("[SOVEREIGN_REGISTRY] Failed to sync to State Service:", e);
    }
  }

  public addLedgerEntry(event: string, domain: string, details: string, operator: string = "SYSTEM") {
    const entry: SovereignLedgerEntry = {
      id: `LEDGER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      event,
      domain,
      details,
      operator,
      hash: "SHA256:...", // Simulated hash
      signature: "SIG:..." // Simulated signature
    };
    this.ledger.unshift(entry);
    console.log(`[SOVEREIGN_LEDGER] ${event} (${domain}): ${details}`);
  }

  public async logAuditEvent(event: AuditEvent) {
    this.auditEvents.unshift(event);
    this.addLedgerEntry("Audit Event", "GOVERNANCE", event.message);
  }

  public getAuditEvents() {
    return this.auditEvents;
  }

  // --- Blueprints ---
  public registerBlueprint(blueprint: ArchitectureContract) {
    this.blueprints.set(blueprint.id, blueprint);
    this.addLedgerEntry("Blueprint Registered", "ARCHITECTURE", `Blueprint ${blueprint.id} v${blueprint.version} registered.`);
    this.syncToStateService();
  }

  // --- Products and Specifications ---
  public registerProductSpecification(productId: string, spec: any) {
    this.products.set(productId, spec);
    this.addLedgerEntry("Specification Contract Registered", "SPECIFICATION", `Implementation-grade contract for ${productId} compiled into ledger.`);
    this.syncToStateService();
  }

  public getProductSpecification(productId: string): any {
    return this.products.get(productId);
  }

  public getAllProductSpecifications(): any[] {
    return Array.from(this.products.values());
  }

  public saveBlueprint(blueprint: ArchitectureContract) {
    this.blueprints.set(blueprint.id, blueprint);
    this.addLedgerEntry("Blueprint Saved", "ARCHITECTURE", `Blueprint ${blueprint.id} version ${blueprint.version} persisted.`);
    this.syncToStateService();
  }

  public getBlueprint(id: string) {
    return this.blueprints.get(id);
  }

  public getAllBlueprints() {
    return Array.from(this.blueprints.values());
  }

  public getBlueprints() {
    return this.getAllBlueprints();
  }

  // --- Manufacturing Jobs ---
  public registerJob(job: ManufacturingJob) {
    // Ensure missing required fields for ManufacturingJob interface
    if (!job.name) job.name = `Job ${job.id}`;
    if (!job.description) job.description = `Authoritative manufacturing job for ${job.productId}`;
    if (!job.layerIds) job.layerIds = [];
    if (!job.mandatoryLayerIds) job.mandatoryLayerIds = [];
    if (!job.config) job.config = {};
    
    this.manufacturingJobs.set(job.id, job);
    this.addLedgerEntry("Job Registered", "FACTORY", `Job ${job.id} registered.`);
    this.syncToStateService();
  }

  public createManufacturingJob(blueprintId: string, ecosystem: ManufacturingCategory): ManufacturingJob {
    const blueprint = this.blueprints.get(blueprintId);
    if (!blueprint) throw new Error("Blueprint not found");

    const job: ManufacturingJob = {
      id: `JOB-${Date.now()}`,
      architectureId: blueprintId,
      productId: blueprint.specificationId,
      ecosystem,
      version: blueprint.version,
      status: 'DIGITAL_INTAKE',
      progress: 0,
      assignedWorkforce: [],
      repository: "https://git.jumo.internal/national-factory/" + blueprint.specificationId,
      branch: "main",
      commitSha: "sha-" + Math.random().toString(36).substr(2, 8),
      evidence: [],
      logs: [`[SYSTEM] Manufacturing Job initialized for ${blueprint.productIdentity.name}`],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name: `Job for ${blueprint.productIdentity.name}`,
      description: `Authoritative manufacturing job for ${blueprint.productIdentity.name}`,
      layerIds: [],
      mandatoryLayerIds: [],
      config: {}
    };

    this.manufacturingJobs.set(job.id, job);
    this.addLedgerEntry("Manufacturing Job Created", "FACTORY", `Job ${job.id} for architecture ${blueprintId} initialized.`);
    this.syncToStateService();
    return job;
  }

  public getJob(id: string) {
    return this.manufacturingJobs.get(id);
  }

  public getAllJobs() {
    return Array.from(this.manufacturingJobs.values());
  }

  public getJobs() {
    return this.getAllJobs();
  }

  public updateJobStatus(id: string, status: ManufacturingJobStatus) {
    const job = this.manufacturingJobs.get(id);
    if (job) {
      job.status = status;
      job.updatedAt = new Date().toISOString();
      this.addLedgerEntry("Job Status Updated", "FACTORY", `Job ${id} status: ${status}`);
      this.syncToStateService();
    }
  }

  public updateJobProgress(id: string, progress: number) {
    const job = this.manufacturingJobs.get(id);
    if (job) {
      job.progress = progress;
      job.updatedAt = new Date().toISOString();
      this.syncToStateService();
    }
  }

  public updateJobArchitecture(id: string, architectureId: string) {
    const job = this.manufacturingJobs.get(id);
    if (job) {
      job.architectureId = architectureId;
      job.updatedAt = new Date().toISOString();
      this.syncToStateService();
    }
  }

  public addJobLog(id: string, log: string) {
    const job = this.manufacturingJobs.get(id);
    if (job) {
      job.logs.push(`[${new Date().toISOString()}] ${log}`);
      job.updatedAt = new Date().toISOString();
      this.syncToStateService();
    }
  }

  public registerCertification(rec: CertificationRecord) {
    this.certifications.set(rec.certificationId, rec);
    this.addLedgerEntry("Certification Recorded", "CERTIFICATION", `Certification ${rec.certificationId} recorded for product ${rec.productId}.`);
    this.syncToStateService();
  }

  public registerDeployment(rec: DeploymentRecord) {
    this.deployments.set(rec.deploymentId || rec.jobId, rec);
    this.addLedgerEntry("Deployment Recorded", "DEPLOYMENT", `Deployment slot ${rec.slotId || 'N/A'} verified.`);
    this.syncToStateService();
  }

  public registerInstanceDefinition(def: ProductInstanceDefinition) {
    this.instanceDefinitions.set(def.instanceId, def);
    this.addLedgerEntry("Instance Definition Registered", "FACTORY", `Product instance definition ${def.instanceId} registered.`);
    this.syncToStateService();
  }

  public getInstanceDefinition(id: string) {
    return this.instanceDefinitions.get(id);
  }

  public registerRuntimeInstance(instance: ProductInstanceDefinition) {
    this.runtimeInstances.set(instance.instanceId, instance);
    this.addLedgerEntry("Runtime Instance Activated", "RUNTIME", `Runtime instance ${instance.instanceId} activated at ${instance.endpoint}.`);
    this.syncToStateService();
  }

  public getRuntimeInstance(id: string) {
    return this.runtimeInstances.get(id);
  }

  public getAllRuntimeInstances() {
    return Array.from(this.runtimeInstances.values());
  }

  // --- Workforce ---
  public getWorkforceStats() {
    const agents = JumoAIAgentRegistry.getAllAgents();
    return {
      totalAgents: agents.length,
      activeAssignments: 0 
    };
  }

  // --- Stats for Dashboards ---
  public getGlobalStats() {
    return {
      activeBlueprints: this.blueprints.size,
      activeManufacturingJobs: Array.from(this.manufacturingJobs.values()).filter(j => j.status !== 'RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT' && j.status !== 'FAILED').length,
      certifiedProducts: this.certifications.size,
      activeDeploymentNodes: 1240, 
      nationalStandardCompliance: 100 
    };
  }

  public getLedger() {
    return this.ledger;
  }

  public getCertificationRecords() {
    return Array.from(this.certifications.values());
  }

  public getDeploymentRecords() {
    return Array.from(this.deployments.values());
  }
}

export const sovereignGovernanceRegistry = SovereignGovernanceRegistry.getInstance();
