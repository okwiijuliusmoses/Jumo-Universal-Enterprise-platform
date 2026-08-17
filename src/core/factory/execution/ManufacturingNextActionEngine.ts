import { ManufacturingExecutionLedger } from './ManufacturingExecutionLedger';
import { ManufacturingExecutionRecord } from './ExecutionTypes';
import { AIWorkforceRealityEngine } from '../../ai/workforce/AIWorkforceRealityEngine';

export class ManufacturingNextActionEngine {
  private ledger = ManufacturingExecutionLedger.getInstance();
  private workforce = AIWorkforceRealityEngine.getInstance();

  public calculateNextActions(jobId: string, currentPhase: number, availablePackages: string[]): string[] {
    const records = this.ledger.getExecutionsForJob(jobId);
    
    // Find unstarted or failed work packages in the current phase
    const completedPackages = new Set(
      records.filter(r => r.phaseId === currentPhase && r.status === 'COMPLETED').map(r => r.workPackage)
    );
    const activePackages = new Set(
      records.filter(r => r.phaseId === currentPhase && r.status === 'EXECUTING').map(r => r.workPackage)
    );

    const nextPackages: string[] = [];
    for (const wp of availablePackages) {
      if (!completedPackages.has(wp) && !activePackages.has(wp)) {
        nextPackages.push(wp);
      }
    }

    return nextPackages;
  }

  public assignWorkerForPackage(workPackage: string): string | null {
    // Basic assignment logic based on workPackage name mapping to discipline
    const workers = this.workforce.getAllWorkers().filter(w => w.status === 'REAL_REGISTERED_IDLE');
    if (workers.length === 0) return null;
    
    // In a real scenario, map package to required capability. Here we just pick an idle worker.
    // E.g., 'SYSTEM_DESIGN' -> 'Architecture'
    return workers[0].id;
  }
}
