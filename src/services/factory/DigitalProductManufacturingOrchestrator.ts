import { 
  ManufacturingCategory
} from "../../core/factory/registry/HubRegistryTypes";
import { ProductManufacturingOrchestrator } from "../../core/factory/ProductManufacturingOrchestrator";
import { ApprovalService } from "../ApprovalService";

/**
 * JUMO UEOS — Authoritative Digital Product Manufacturing Orchestrator Bridge
 * 
 * This service acts as the primary bridge between the UI Studios and the 
 * core ProductManufacturingOrchestrator. It replaces the legacy simulation 
 * with a direct link to the cognitive orchestration engine.
 */
export class DigitalProductManufacturingOrchestrator {
  private static instance: DigitalProductManufacturingOrchestrator;
  private orchestrator = ProductManufacturingOrchestrator.getInstance();
  private approvalService = ApprovalService.getInstance();

  private constructor() {}

  public static getInstance(): DigitalProductManufacturingOrchestrator {
    if (!DigitalProductManufacturingOrchestrator.instance) {
      DigitalProductManufacturingOrchestrator.instance = new DigitalProductManufacturingOrchestrator();
    }
    return DigitalProductManufacturingOrchestrator.instance;
  }

  /**
   * Initiates the manufacturing lifecycle by submitting a specification contract
   * to the authoritative JUMO orchestrator.
   */
  public async initiateManufacturingLifecycle(productId: string, spec: any): Promise<string> {
    const job = await this.orchestrator.submitSpecification({
      productId,
      specificationId: spec.id || spec.specificationId || `SPEC-${Date.now()}`,
      specificationVersion: spec.version || '1.0.0',
      idempotencyKey: spec.idempotencyKey,
      ecosystem: spec.ecosystem || 'SOFTWARE_ECOSYSTEM'
    });
    return job.jobId;
  }

  /**
   * Grants human approval for a specific stage.
   * This now routes through the canonical ApprovalService for durable ledger entry.
   */
  public async grantApproval(jobId: string, stage: string, approvedBy: string) {
    let scope = '';
    if (stage === 'SPECIFICATION_APPROVED') {
      scope = 'SPECIFICATION_APPROVAL';
    } else if (stage === 'ARCHITECTURE_APPROVED') {
      scope = 'ARCHITECTURE_APPROVAL';
    }

    if (scope) {
      return await this.approvalService.grantApproval({
        jobId,
        scope,
        approver: approvedBy,
        evidenceHash: `HUMAN_SIG_${Date.now()}`
      });
    }
    
    // Fallback for other stages not yet integrated into ApprovalService
    if (stage === 'SPECIFICATION_APPROVED') {
      return await this.orchestrator.issueCommand('APPROVE_SPECIFICATION', { jobId, actor: approvedBy });
    } else if (stage === 'ARCHITECTURE_APPROVED') {
      return await this.orchestrator.issueCommand('APPROVE_ARCHITECTURE', { jobId, actor: approvedBy });
    }
  }

  public async startManufacturing(jobId: string) {
    return await this.orchestrator.issueCommand('START_MANUFACTURING', { jobId });
  }

  public async startBuild(jobId: string) {
    return await this.orchestrator.issueCommand('START_BUILD', { jobId });
  }

  public async verifyProduct(jobId: string) {
    return await this.orchestrator.issueCommand('VERIFY_PRODUCT', { jobId });
  }

  public async certifyProduct(jobId: string, authority: string) {
    return await this.orchestrator.certifyProduct(jobId, authority);
  }

  public async deployProduct(jobId: string, node?: string) {
    return await this.orchestrator.deployProduct(jobId, node);
  }

  public async acceptGoLive(jobId: string, authority: string) {
    return await this.orchestrator.acceptGoLive(jobId, authority);
  }

  public async pauseJob(jobId: string) {
    return await this.orchestrator.pauseJob(jobId);
  }

  public async resumeJob(jobId: string) {
    return await this.orchestrator.resumeJob(jobId);
  }

  public async cancelJob(jobId: string, reason?: string) {
    return await this.orchestrator.cancelJob(jobId, reason);
  }

  public async retryFailedPackage(jobId: string) {
    return await this.orchestrator.retryFailedPackage(jobId);
  }

  public async submitReviewDecision(jobId: string, gateId: string, decision: 'APPROVE' | 'REJECT', feedback?: any) {
    return await this.orchestrator.submitReviewDecision(jobId, gateId, decision, feedback);
  }

  public getAllArtifacts() {
    return this.orchestrator.getAllArtifacts();
  }

  public async manufactureCompleteProductPackage(blueprintId: string, productName: string, domain: string, operator: string) {
    const jobId = await this.initiateManufacturingLifecycle(productName, {
      id: blueprintId,
      version: '1.0.0',
      ecosystem: domain,
      operator
    });
    return { jobId, status: 'MANUFACTURING_INITIATED', productName };
  }
}
