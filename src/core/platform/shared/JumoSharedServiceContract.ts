import type { JumoSharedServiceId } from "./JumoSharedEnterpriseServices";

export interface JumoSharedServiceContext {
  tenantId?: string;
  productId?: string;
  ecosystemId?: string;
  studioId?: string;
  jobId?: string;
  actorId?: string;
  correlationId?: string;
}

export interface JumoSharedServiceRequest {
  service: JumoSharedServiceId;
  operation: string;
  context: JumoSharedServiceContext;
  payload?: Record<string, unknown>;
  requiresAudit?: boolean;
  requiresVerification?: boolean;
  requiresHumanApproval?: boolean;
}

export interface JumoSharedServiceResult {
  ok: boolean;
  service: JumoSharedServiceId;
  operation: string;
  status:
    | "READY"
    | "EXECUTED"
    | "BLOCKED"
    | "REQUIRES_APPROVAL"
    | "FAILED";
  data?: unknown;
  error?: string;
}
