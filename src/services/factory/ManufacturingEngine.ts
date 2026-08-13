import { SovereignGovernanceRegistry } from "../gov/SovereignGovernanceRegistry";
import { ManufacturingJob, ManufacturingJobStatus } from "../../core/factory/registry/HubRegistryTypes";

export class ManufacturingEngine {
  private static instance: ManufacturingEngine;

  private constructor() {}

  public static getInstance(): ManufacturingEngine {
    if (!ManufacturingEngine.instance) {
      ManufacturingEngine.instance = new ManufacturingEngine();
    }
    return ManufacturingEngine.instance;
  }

  public async executeManufacturing(jobId: string) {
    const registry = SovereignGovernanceRegistry.getInstance();
    registry.addJobLog(jobId, "Source and artifact generation initiated.");
    await new Promise(r => setTimeout(r, 3000)); // Simulate complex manufacturing
    registry.addJobLog(jobId, "Artifact generation complete. Ready for compilation.");
  }

  public async startJob(jobId: string) {
    const registry = SovereignGovernanceRegistry.getInstance();
    const job = registry.getJob(jobId);
    if (!job) throw new Error("Job not found");

    await registry.updateJobStatus(jobId, 'SPECIFICATION_NORMALIZATION');
    
    // Logic for advancing the job status based on the 32-stage lifecycle
    this.executeStage(jobId);
  }

  private async executeStage(jobId: string) {
    const registry = SovereignGovernanceRegistry.getInstance();
    const job = registry.getJob(jobId);
    if (!job) return;

    const nextStatus = this.calculateNextStatus(job.status);
    
    if (nextStatus) {
      setTimeout(async () => {
        await registry.updateJobStatus(jobId, nextStatus);
        
        await registry.logAuditEvent({
          id: `EVT-${Date.now()}`,
          jobId,
          type: 'STAGE_TRANSITION',
          severity: 'INFO',
          message: `Job transitioned to ${nextStatus}`,
          timestamp: new Date().toISOString()
        });

        // Continue to next stage if it's not a human approval gate
        if (nextStatus !== 'HUMAN_ARCHITECT_APPROVAL' && nextStatus !== 'CERTIFICATION_AND_HUMAN_ACCEPTANCE') {
           this.executeStage(jobId);
        }
      }, 3000);
    }
  }

  private calculateNextStatus(currentStatus: ManufacturingJobStatus): ManufacturingJobStatus | null {
    const stages: ManufacturingJobStatus[] = [
      'DIGITAL_INTAKE',
      'SPECIFICATION_NORMALIZATION',
      'PLATFORM_INSTANCE_DEFINITION',
      'PROVISIONING',
      'ARCHITECTURE_DISCOVERY',
      'ARCHITECTURE_EXPANSION',
      'ARCHITECTURE_VERIFICATION',
      'ARCHITECTURE_CONTRACT_GENERATION',
      'HUMAN_ARCHITECT_APPROVAL',
      'WORKFORCE_ORCHESTRATION',
      'REQUIREMENTS_DECOMPOSITION',
      'SYSTEM_DESIGN',
      'DATA_ARCHITECTURE',
      'API_AND_INTEGRATION_ENGINEERING',
      'SECURITY_ENGINEERING',
      'APPLICATION_ENGINEERING',
      'COMMERCIAL_PRODUCT_ENGINEERING',
      'AI_AND_AUTOMATION_ENGINEERING',
      'INFRASTRUCTURE_ENGINEERING',
      'DEPENDENCY_RESOLUTION',
      'SCHEMA_MANUFACTURING',
      'SOURCE_AND_ARTIFACT_GENERATION',
      'COMPILATION',
      'BUILD_ASSEMBLY',
      'APPLICATION_COMPLETENESS_VERIFICATION',
      'SECURITY_AND_ZERO_TRUST_VERIFICATION',
      'INTEGRATION_VERIFICATION',
      'END_TO_END_SYSTEM_TESTING',
      'REGRESSION_AND_RESILIENCE_TESTING',
      'CERTIFICATION_AND_HUMAN_ACCEPTANCE',
      'DEPLOYMENT_AND_PUBLISHING',
      'RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT'
    ];

    const currentIndex = stages.indexOf(currentStatus);
    if (currentIndex >= 0 && currentIndex < stages.length - 1) {
      return stages[currentIndex + 1];
    }

    return null;
  }
}

export const manufacturingEngine = ManufacturingEngine.getInstance();
