import {
  ArchitectureContract,
  ManufacturingJob,
} from "../../core/factory/registry/HubRegistryTypes";

export interface GovernanceLedgerEntry {
  id: string;
  action: string;
  domain: string;
  details: string;
  createdAt: string;
}

export class SovereignGovernanceRegistry {
  private static instance: SovereignGovernanceRegistry;

  private readonly blueprints = new Map<string, ArchitectureContract>();
  private readonly jobs = new Map<string, ManufacturingJob>();
  private readonly ledger: GovernanceLedgerEntry[] = [];

  private constructor() {}

  public static getInstance(): SovereignGovernanceRegistry {
    if (!this.instance) {
      this.instance = new SovereignGovernanceRegistry();
    }
    return this.instance;
  }

  public saveBlueprint(contract: ArchitectureContract): ArchitectureContract {
    this.blueprints.set(contract.id, contract);
    return contract;
  }

  public getBlueprint(id: string): ArchitectureContract | undefined {
    return this.blueprints.get(id);
  }

  public listBlueprints(): ArchitectureContract[] {
    return Array.from(this.blueprints.values());
  }

  public registerJob(job: ManufacturingJob): ManufacturingJob {
    this.jobs.set(job.id, job);
    return job;
  }

  public getJob(jobId: string): ManufacturingJob | undefined {
    return this.jobs.get(jobId);
  }

  public addJobLog(jobId: string, message: string): void {
    const job = this.jobs.get(jobId);

    if (job) {
      job.logs = Array.isArray(job.logs) ? job.logs : [];
      job.logs.push(`[${new Date().toISOString()}] ${message}`);
      job.updatedAt = new Date().toISOString();
    }
  }

  public addLedgerEntry(
    action: string,
    domain: string,
    details: string,
  ): GovernanceLedgerEntry {
    const entry: GovernanceLedgerEntry = {
      id: `GOV-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      action,
      domain,
      details,
      createdAt: new Date().toISOString(),
    };

    this.ledger.unshift(entry);
    return entry;
  }

  public listLedger(): GovernanceLedgerEntry[] {
    return [...this.ledger];
  }
}
