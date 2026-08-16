// JUMO UEOS — Canonical Agent Execution Service in src/core/services
// Bridges core AI agent execution with the authoritative services layer.

export type AgentTaskLifecycleState = 'RECEIVED' | 'VALIDATING' | 'AUTHORIZING' | 'ROUTING' | 'EXECUTING' | 'VERIFYING' | 'COMPLETED' | 'FAILED';

export interface CanonicalAgentTaskRequest {
  taskId?: string;
  agentId: string;
  jobId: string;
  task: string;
  division: string;
  specialization: string;
  tenantId?: string;
  context?: any;
}

export interface CanonicalAgentTaskResult {
  code: string;
  status: number;
  taskId: string;
  agentId: string;
  lifecycleState: AgentTaskLifecycleState;
  success: boolean;
  output?: string;
  provider?: string;
  evidenceHash?: string;
  verification?: any;
  timestamp: string;
  error?: string;
}

import { AgentExecutionService as CoreAgentExecutionService, AgentTaskRequest } from '../ai/execution/AgentExecutionService';

export class AgentExecutionService extends CoreAgentExecutionService {
  public static async executeCanonicalTask(request: CanonicalAgentTaskRequest): Promise<CanonicalAgentTaskResult> {
    const taskId = request.taskId || `TASK-${Date.now().toString(36).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    try {
      // 1. RECEIVED
      // 2. VALIDATING
      if (!request.agentId) {
        return {
          code: "TASK_VALIDATION_FAILED",
          status: 400,
          taskId,
          agentId: request.agentId || "UNKNOWN",
          lifecycleState: "FAILED",
          success: false,
          error: "agentId is required for canonical task execution.",
          timestamp
        };
      }

      // 3. EXECUTING via core execution service
      const coreReq: AgentTaskRequest = {
        agentId: request.agentId,
        jobId: request.jobId || `JOB-${Date.now().toString(36).toUpperCase()}`,
        task: request.task || "Execute canonical agent specification",
        division: request.division || "ARCHITECTURE",
        specialization: request.specialization || "Sovereign Engineering"
      };

      const workLog = await CoreAgentExecutionService.executeTask(coreReq);

      return {
        code: workLog.status === 'COMPLETED' ? "TASK_SUCCESS" : "TASK_EXECUTION_WARNING",
        status: workLog.status === 'COMPLETED' ? 200 : 500,
        taskId: workLog.id,
        agentId: workLog.agentId,
        lifecycleState: workLog.status === 'COMPLETED' ? 'COMPLETED' : 'FAILED',
        success: workLog.status === 'COMPLETED',
        output: workLog.result,
        provider: workLog.providerUsed,
        evidenceHash: workLog.evidenceHash,
        verification: workLog.verificationResult,
        timestamp
      };
    } catch (err: any) {
      return {
        code: "TASK_LIFECYCLE_ERROR",
        status: 500,
        taskId,
        agentId: request.agentId || "UNKNOWN",
        lifecycleState: "FAILED",
        success: false,
        error: err.message,
        timestamp
      };
    }
  }
}
