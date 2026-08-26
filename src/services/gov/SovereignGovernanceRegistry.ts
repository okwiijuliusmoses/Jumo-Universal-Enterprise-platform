import { 
  ArchitectureContract, 
  ManufacturingJob, 
  ManufacturingJobStatus, 
  BuildArtifact,
  DeploymentRecord,
  VerificationFailureRecord,
  CertificationRecord,
  ManufacturingCategory
} from "../../core/runtime/sovereignState.types";
import { JumoAIAgentRegistry } from "../../core/ai/registry/JumoAIAgentRegistry";

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
  private ledger: SovereignLedgerEntry[] = [];
  private auditEvents: AuditEvent[] = [];
  
  private constructor() {
    this.seedInitialState();
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
  }

  // --- Products and Specifications ---
  public registerProductSpecification(productId: string, spec: any) {
    this.products.set(productId, spec);
    this.addLedgerEntry("Specification Contract Registered", "SPECIFICATION", `Implementation-grade contract for ${productId} compiled into ledger.`);
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

  // --- Provisioning Jobs ---
  public registerJob(job: ManufacturingJob) {
    this.manufacturingJobs.set(job.id, job);
    this.addLedgerEntry("Job Registered", "PROVISIONING", `Job ${job.id} registered.`);
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
      repository: "https://git.jumo.internal/national-platform/" + blueprint.specificationId,
      branch: "main",
      commitSha: "sha-" + Math.random().toString(36).substr(2, 8),
      evidence: [],
      logs: [`[SYSTEM] Provisioning Job initialized for ${blueprint.productIdentity.name}`],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.manufacturingJobs.set(job.id, job);
    this.addLedgerEntry("Provisioning Job Created", "PROVISIONING", `Job ${job.id} for architecture ${blueprintId} initialized.`);
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
    }
  }

  public updateJobProgress(id: string, progress: number) {
    const job = this.manufacturingJobs.get(id);
    if (job) {
      job.progress = progress;
      job.updatedAt = new Date().toISOString();
    }
  }

  public updateJobArchitecture(id: string, architectureId: string) {
    const job = this.manufacturingJobs.get(id);
    if (job) {
      job.architectureId = architectureId;
      job.updatedAt = new Date().toISOString();
    }
  }

  public addJobLog(id: string, log: string) {
    const job = this.manufacturingJobs.get(id);
    if (job) {
      job.logs.push(`[${new Date().toISOString()}] ${log}`);
      job.updatedAt = new Date().toISOString();
    }
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
      activeProvisioningJobs: Array.from(this.manufacturingJobs.values()).filter(j => j.status !== 'RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT' && j.status !== 'FAILED').length,
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
