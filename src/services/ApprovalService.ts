import { SovereignGovernanceRegistry } from "./gov/SovereignGovernanceRegistry";
import { JumoEventBus } from "../core/common/events/JumoEventBus";

export interface ApprovalEntry {
  id: string;
  jobId: string;
  scope: string; // e.g. 'SPECIFICATION_APPROVAL', 'ARCHITECTURE_APPROVAL'
  approver: string;
  decision: 'APPROVED' | 'REJECTED';
  timestamp: string;
  evidenceHash: string;
  comments?: string;
  version: string;
}

export class ApprovalService {
  private static instance: ApprovalService;
  private registry = SovereignGovernanceRegistry.getInstance();

  private constructor() {}

  public static getInstance(): ApprovalService {
    if (!ApprovalService.instance) {
      ApprovalService.instance = new ApprovalService();
    }
    return ApprovalService.instance;
  }

  /**
   * Grants an authoritative approval for a manufacturing lifecycle stage.
   * This persists the decision to the ledger and triggers a pipeline resumption.
   */
  public async grantApproval(params: {
    jobId: string;
    scope: string;
    approver: string;
    evidenceHash: string;
    comments?: string;
  }): Promise<ApprovalEntry> {
    const { jobId, scope, approver, evidenceHash, comments } = params;

    const entry: ApprovalEntry = {
      id: `APP-${Date.now().toString(36).toUpperCase()}`,
      jobId,
      scope,
      approver,
      decision: 'APPROVED',
      timestamp: new Date().toISOString(),
      evidenceHash,
      comments,
      version: '1.0.0'
    };

    // 1. Persist to Sovereign Ledger
    this.registry.logAuditEvent({
      id: `AUDIT-${Date.now()}`,
      jobId,
      type: 'APPROVAL_GRANTED',
      severity: 'INFO',
      message: `Approval granted for ${scope} by ${approver}`,
      timestamp: entry.timestamp
    });

    // 2. Emit event for Orchestrator to resume
    JumoEventBus.publish('LIFECYCLE_APPROVAL_GRANTED', entry);

    console.log(`[APPROVAL_SERVICE] Approval granted for job ${jobId} [Scope: ${scope}] by ${approver}`);
    return entry;
  }

  /**
   * Rejects a stage, blocking the pipeline.
   */
  public async rejectApproval(params: {
    jobId: string;
    scope: string;
    approver: string;
    comments: string;
  }): Promise<ApprovalEntry> {
    const entry: ApprovalEntry = {
      id: `REJ-${Date.now().toString(36).toUpperCase()}`,
      jobId: params.jobId,
      scope: params.scope,
      approver: params.approver,
      decision: 'REJECTED',
      timestamp: new Date().toISOString(),
      evidenceHash: 'REJECTION_NO_EVIDENCE',
      comments: params.comments,
      version: '1.0.0'
    };

    this.registry.logAuditEvent({
      id: `AUDIT-${Date.now()}`,
      jobId: params.jobId,
      type: 'APPROVAL_REJECTED',
      severity: 'WARNING',
      message: `Approval rejected for ${params.scope} by ${params.approver}. Reason: ${params.comments}`,
      timestamp: entry.timestamp
    });

    JumoEventBus.publish('LIFECYCLE_APPROVAL_REJECTED', entry);
    return entry;
  }

  public getApprovalsForJob(jobId: string): ApprovalEntry[] {
    const auditEvents = this.registry.getAuditEvents();
    return auditEvents
      .filter(e => e.jobId === jobId && (e.type === 'APPROVAL_GRANTED' || e.type === 'APPROVAL_REJECTED'))
      .map(e => ({
        id: e.id,
        jobId: e.jobId,
        scope: e.type,
        approver: 'SYSTEM', // Placeholder as AuditEvent doesn't store approver explicitly
        decision: e.type === 'APPROVAL_GRANTED' ? 'APPROVED' : 'REJECTED',
        timestamp: e.timestamp,
        evidenceHash: '',
        version: '1.0.0'
      } as ApprovalEntry));
  }
}

export const approvalService = ApprovalService.getInstance();
