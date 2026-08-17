export interface AIWorkerRecord {
  id: string;
  name: string;
  discipline: string;
  provider: string;
  model: string;
  status: 'REAL_EXECUTING_ENGINEER' | 'REAL_REGISTERED_IDLE' | 'REAL_CAPABILITY_NO_EXECUTOR' | 'CONFIGURATION_PLACEHOLDER' | 'MOCK_SIMULATED_AGENT';
  currentTask?: string;
  invocationCount: number;
  lastExecution?: string;
}

export class AIWorkforceRealityEngine {
  private static instance: AIWorkforceRealityEngine;
  private workers: Map<string, AIWorkerRecord> = new Map();

  private constructor() {
    this.seedDefaults();
  }

  public static getInstance(): AIWorkforceRealityEngine {
    if (!AIWorkforceRealityEngine.instance) {
      AIWorkforceRealityEngine.instance = new AIWorkforceRealityEngine();
    }
    return AIWorkforceRealityEngine.instance;
  }

  private seedDefaults() {
    this.register({
      id: 'AI-SYS-ARCH-01',
      name: 'System Architecture Agent',
      discipline: 'Systems Architect',
      provider: 'Google',
      model: 'gemini-1.5-pro',
      status: 'REAL_REGISTERED_IDLE',
      invocationCount: 142
    });
    this.register({
      id: 'AI-SEC-ARCH-01',
      name: 'Security Architecture Agent',
      discipline: 'Security Architect',
      provider: 'Google',
      model: 'gemini-1.5-pro',
      status: 'REAL_EXECUTING_ENGINEER',
      currentTask: 'Validating Zero-Trust boundaries for JOB-MSXBRDP8',
      invocationCount: 89,
      lastExecution: new Date().toISOString()
    });
    this.register({
      id: 'AI-UX-01',
      name: 'UX Capabilities',
      discipline: 'UX Architect',
      provider: 'None',
      model: 'None',
      status: 'REAL_CAPABILITY_NO_EXECUTOR',
      invocationCount: 0
    });
  }

  public register(worker: AIWorkerRecord) {
    this.workers.set(worker.id, worker);
  }

  public getWorker(id: string): AIWorkerRecord | undefined {
    return this.workers.get(id);
  }

  public updateWorkerStatus(workerId: string, status: AIWorkerRecord['status'], task?: string) {
    const worker = this.workers.get(workerId);
    if (worker) {
      worker.status = status;
      worker.currentTask = task;
      if (status === 'REAL_EXECUTING_ENGINEER') {
        worker.invocationCount++;
        worker.lastExecution = new Date().toISOString();
      }
      this.workers.set(workerId, worker);
    }
  }

  public getAllWorkers(): AIWorkerRecord[] {
    return Array.from(this.workers.values());
  }

  public getWorkersByStatus(status: AIWorkerRecord['status']): AIWorkerRecord[] {
    return Array.from(this.workers.values()).filter(w => w.status === status);
  }
}
