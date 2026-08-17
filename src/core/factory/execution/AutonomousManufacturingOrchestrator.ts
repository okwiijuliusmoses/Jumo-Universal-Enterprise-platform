import { ManufacturingNextActionEngine } from './ManufacturingNextActionEngine';
import { ManufacturingExecutionLedger } from './ManufacturingExecutionLedger';
import { ManufacturingExecutionRecord } from './ExecutionTypes';
import { ProductManufacturingJob, ManufacturingJobStatus } from '../registry/HubRegistryTypes';
import { AIWorkforceRealityEngine } from '../../ai/workforce/AIWorkforceRealityEngine';
import { SovereignGovernanceRegistry } from '../../../services/gov/SovereignGovernanceRegistry';
import { SEVENTEEN_MANUFACTURING_PHASES, STATUS_ORDER } from '../ProductManufacturingOrchestrator';

export class AutonomousManufacturingOrchestrator {
  private static instance: AutonomousManufacturingOrchestrator;
  private actionEngine = new ManufacturingNextActionEngine();
  private ledger = ManufacturingExecutionLedger.getInstance();
  private registry = SovereignGovernanceRegistry.getInstance();
  private workforce = AIWorkforceRealityEngine.getInstance();
  
  private activeLoops: Set<string> = new Set();

  private constructor() {}

  public static getInstance(): AutonomousManufacturingOrchestrator {
    if (!AutonomousManufacturingOrchestrator.instance) {
      AutonomousManufacturingOrchestrator.instance = new AutonomousManufacturingOrchestrator();
    }
    return AutonomousManufacturingOrchestrator.instance;
  }

  public startAutonomousLoop(jobId: string) {
    if (this.activeLoops.has(jobId)) return;
    this.activeLoops.add(jobId);
    this.runLoop(jobId);
  }

  public stopAutonomousLoop(jobId: string) {
    this.activeLoops.delete(jobId);
  }

  private async runLoop(jobId: string) {
    while (this.activeLoops.has(jobId)) {
      const job = this.registry.getJob(jobId) as any;
      if (!job) {
        this.stopAutonomousLoop(jobId);
        break;
      }

      // Check if we need human approval
      if (job.status === 'AWAITING_HUMAN_ENGINEERING_APPROVAL' || job.status === 'AWAITING_HUMAN_MANUFACTURING_APPROVAL') {
        // Paused for human intervention
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }

      if (job.status === 'RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT') {
        this.stopAutonomousLoop(jobId);
        break;
      }

      await this.evaluateNextActions(job);
      await new Promise(r => setTimeout(r, 500)); // Tick rate
    }
  }

  private async evaluateNextActions(job: any) {
    // Determine current phase
    const currentPhaseDef = SEVENTEEN_MANUFACTURING_PHASES.find(p => p.workPackages.includes(job.status));
    if (!currentPhaseDef) return;

    const nextPackages = this.actionEngine.calculateNextActions(job.id, currentPhaseDef.phaseId, currentPhaseDef.workPackages);

    if (nextPackages.length === 0) {
      // Current phase complete, advance to next phase if possible
      const activeExecutions = this.ledger.getExecutionsForJob(job.id).filter(r => r.phaseId === currentPhaseDef.phaseId && r.status === 'EXECUTING');
      if (activeExecutions.length === 0) {
        this.advanceJobStatus(job);
      }
      return;
    }

    // Launch executions for next packages in parallel
    for (const wp of nextPackages) {
      const workerId = this.actionEngine.assignWorkerForPackage(wp);
      if (workerId) {
        await this.launchExecution(job, currentPhaseDef.phaseId, wp as ManufacturingJobStatus, workerId);
      }
    }
  }

  private async launchExecution(job: any, phaseId: number, wp: ManufacturingJobStatus, workerId: string) {
    const worker = this.workforce.getAllWorkers().find(w => w.id === workerId);
    if (!worker) return;

    this.workforce.updateWorkerStatus(workerId, 'REAL_EXECUTING_ENGINEER');

    const executionId = `EXEC-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    
    const record: ManufacturingExecutionRecord = {
      executionId,
      jobId: job.id,
      phaseId,
      workPackage: wp,
      workerId,
      provider: worker.provider,
      model: worker.model,
      inputs: { intent: "Manufacturing execution" },
      outputs: {},
      status: 'EXECUTING',
      startTimestamp: new Date().toISOString(),
      artifactsProduced: [],
      testsExecuted: [],
      evidenceReferences: [],
      downstreamDependenciesUnlocked: []
    };

    this.ledger.recordExecution(record);

    // Simulate async work based on real-world timing estimation
    // In a real factory, this would be an actual LLM/compiler call.
    setTimeout(() => {
      record.status = 'COMPLETED';
      record.completionTimestamp = new Date().toISOString();
      record.durationMs = new Date(record.completionTimestamp).getTime() - new Date(record.startTimestamp!).getTime();
      record.artifactsProduced = [`ART-${wp}-${executionId}`];
      record.testsExecuted = [`TEST-${wp}-01`];
      record.evidenceReferences = [`EVID-${executionId}`];
      record.validationResult = true;
      this.ledger.recordExecution(record);

      this.workforce.updateWorkerStatus(workerId, 'REAL_REGISTERED_IDLE');

      // Register generated artifact in job
      job.artifacts = job.artifacts || {};
      job.artifacts[record.artifactsProduced[0]] = {
        artifactId: record.artifactsProduced[0],
        type: 'MANUFACTURED_COMPONENT',
        url: `blob://artifact/${record.artifactsProduced[0]}`,
        createdAt: record.completionTimestamp
      };
      
      if (!job.logs) job.logs = [];
      job.logs.push(`[${new Date().toISOString()}] ${worker.name} (${worker.model}) completed ${wp} in ${record.durationMs}ms`);
      this.registry.registerJob(job as any);
    }, 500 + Math.random() * 1000); // 0.5-1.5s per package execution
  }

  private advanceJobStatus(job: any) {
    const currentIndex = STATUS_ORDER.indexOf(job.status);
    if (currentIndex >= 0 && currentIndex < STATUS_ORDER.length - 1) {
      job.status = STATUS_ORDER[currentIndex + 1];
      job.updatedAt = new Date().toISOString();
      if (!job.logs) job.logs = [];
      job.logs.push(`[${new Date().toISOString()}] ORCHESTRATOR: Advancing to ${job.status}`);
      this.registry.registerJob(job as any);
    }
  }

  public approveHumanGate(jobId: string) {
    const job = this.registry.getJob(jobId) as any;
    if (job) {
      if (job.status === 'AWAITING_HUMAN_ENGINEERING_APPROVAL' || job.status === 'AWAITING_HUMAN_MANUFACTURING_APPROVAL') {
        this.advanceJobStatus(job);
      }
    }
  }
}
