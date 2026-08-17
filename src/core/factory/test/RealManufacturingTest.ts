import { AutonomousManufacturingOrchestrator } from '../execution/AutonomousManufacturingOrchestrator';
import { SovereignGovernanceRegistry } from '../../../services/gov/SovereignGovernanceRegistry';
import { ProductManufacturingJob } from '../registry/HubRegistryTypes';
import { ManufacturingExecutionLedger } from '../execution/ManufacturingExecutionLedger';
import { STATUS_ORDER } from '../ProductManufacturingOrchestrator';

export async function runRealManufacturingTest() {
  console.log('[TEST] Starting Real Manufacturing Demonstration');

  const registry = SovereignGovernanceRegistry.getInstance();
  const orchestrator = AutonomousManufacturingOrchestrator.getInstance();
  const ledger = ManufacturingExecutionLedger.getInstance();

  const testJobId = `TEST-JOB-${Date.now()}`;
  const testJob = {
    id: testJobId,
    jobId: testJobId,
    productId: 'TEST-DIGITAL-PRODUCT',
    status: 'DIGITAL_INTAKE',
    currentLifecycleState: 'SPECIFICATION_NORMALIZATION',
    reviewGates: [],
    logs: [],
    ecosystem: 'ENTERPRISE_OS'
  };

  registry.registerJob(testJob as any);

  console.log('[TEST] Job initialized, starting autonomous orchestrator loop');
  orchestrator.startAutonomousLoop(testJobId);

  // We wait and monitor progress
  let lastStatus = testJob.status;
  const timeoutMs = 180000; // 180s max
  const start = Date.now();

  return new Promise<void>((resolve, reject) => {
    const interval = setInterval(() => {
      const job = registry.getJob(testJobId) as any;
      if (!job) {
        clearInterval(interval);
        return reject(new Error('Job disappeared from registry'));
      }

      if (job.status !== lastStatus) {
        console.log(`[TEST] Job advanced to ${job.status}`);
        lastStatus = job.status;
      }

      // Check if blocked by human gate
      if (job.status === 'AWAITING_HUMAN_ENGINEERING_APPROVAL' || job.status === 'AWAITING_HUMAN_MANUFACTURING_APPROVAL') {
        console.log(`[TEST] Approving human gate at ${job.status}`);
        orchestrator.approveHumanGate(testJobId);
      }

      if (job.status === 'RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT') {
        clearInterval(interval);
        orchestrator.stopAutonomousLoop(testJobId);
        
        // Assertions
        const executions = ledger.getExecutionsForJob(testJobId);
        if (executions.length === 0) {
          return reject(new Error('Manufacturing completed with no execution records. This is fake manufacturing!'));
        }

        const artifacts = job.artifacts ? Object.keys(job.artifacts) : [];
        if (artifacts.length === 0) {
          return reject(new Error('Manufacturing completed with no artifacts.'));
        }

        console.log(`[TEST] SUCCESS. Manufactured product with ${executions.length} real executions and ${artifacts.length} artifacts.`);
        resolve();
      }

      if (Date.now() - start > timeoutMs) {
        clearInterval(interval);
        orchestrator.stopAutonomousLoop(testJobId);
        reject(new Error(`Test timed out at status ${job.status}`));
      }
    }, 1000);
  });
}

import { fileURLToPath } from 'url';

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runRealManufacturingTest().catch(console.error);
}