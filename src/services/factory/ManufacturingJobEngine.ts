import { ManufacturingJob, ManufacturingJobStatus } from "../../core/factory/registry/HubRegistryTypes";
import { SovereignGovernanceRegistry } from "../gov/SovereignGovernanceRegistry";

export class ManufacturingJobEngine {
  private registry = SovereignGovernanceRegistry.getInstance();

  public async createJob(architectureId: string, productId: string): Promise<ManufacturingJob> {
    const blueprint = this.registry.getBlueprint(architectureId);
    if (!blueprint) throw new Error(`Blueprint not found: ${architectureId}`);

    const job: ManufacturingJob = {
      id: `job-${Math.random().toString(36).substr(2, 9)}`,
      architectureId,
      productId,
      ecosystem: blueprint.productIdentity.ecosystem,
      version: blueprint.version,
      status: "DIGITAL_INTAKE",
      progress: 0,
      assignedWorkforce: [],
      repository: "",
      branch: "main",
      commitSha: "",
      evidence: [],
      logs: [`Manufacturing job created for blueprint: ${blueprint.productIdentity.name} v${blueprint.version}`],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name: `Job for ${blueprint.productIdentity.name}`,
      description: `Authoritative manufacturing job for ${blueprint.productIdentity.name}`,
      layerIds: [],
      mandatoryLayerIds: [],
      config: {}
    };

    this.registry.registerJob(job);
    return job;
  }

  public async pauseJob(jobId: string) {
    const job = this.registry.getJob(jobId);
    if (job) {
      this.registry.updateJobStatus(jobId, "BLOCKED");
      this.registry.addJobLog(jobId, "Job paused by operator.");
    }
  }

  public async resumeJob(jobId: string) {
    const job = this.registry.getJob(jobId);
    if (job && job.status === "BLOCKED") {
      // Logic to determine last active stage
      this.registry.addJobLog(jobId, "Job resumed by operator.");
    }
  }

  public async cancelJob(jobId: string) {
    const job = this.registry.getJob(jobId);
    if (job) {
      this.registry.updateJobStatus(jobId, "FAILED");
      this.registry.addJobLog(jobId, "Job cancelled by operator.");
    }
  }
}
