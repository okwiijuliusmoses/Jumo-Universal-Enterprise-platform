export interface ManufacturingExecutionRecord {
  executionId: string;
  jobId: string;
  phaseId: number;
  workPackage: string;
  workerId: string;
  provider: string;
  model: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  status: 'PENDING' | 'EXECUTING' | 'COMPLETED' | 'FAILED' | 'BLOCKED';
  startTimestamp?: string;
  completionTimestamp?: string;
  durationMs?: number;
  artifactsProduced: string[];
  testsExecuted: string[];
  validationResult?: boolean;
  evidenceReferences: string[];
  downstreamDependenciesUnlocked: string[];
  failureHistory?: string[];
}

export interface ManufacturingPhaseDefinition {
  phaseId: number;
  code: string;
  name: string;
  description: string;
  workPackages: string[];
  dependsOnPhases: number[];
}

export interface WorkerContract {
  workerId: string;
  discipline: string;
  capabilities: string[];
  provider: string;
  model: string;
  status: 'IDLE' | 'BUSY' | 'OFFLINE';
  assignedExecutionId?: string;
}
