// JUMO UEOS — Authoritative E2E Manufacturing Pipeline Test
// Validates the full 32-stage lifecycle managed by ProductManufacturingOrchestrator

import { ProductManufacturingOrchestrator } from '../factory/ProductManufacturingOrchestrator';
import { SovereignGovernanceRegistry } from '../../services/gov/SovereignGovernanceRegistry';
import { JumoAIAgentRegistry } from '../ai/registry/JumoAIAgentRegistry';
import { ProductManufacturingJob } from '../factory/registry/HubRegistryTypes';

export async function runManufacturingPipelineE2ETest() {
  console.log("==================================================");
  console.log("[JUMO E2E TEST] Starting Authoritative Manufacturing Pipeline Execution");
  console.log("==================================================");

  const orchestrator = ProductManufacturingOrchestrator.getInstance();
  const registry = SovereignGovernanceRegistry.getInstance();

  // 1. Verify Workforce
  const allAgents = JumoAIAgentRegistry.getAllAgents();
  console.log(`[PASS] Authoritative Workforce: ${allAgents.length} agents detected.`);

  // 2. Submit Specification
  const testSpecId = `SPEC-E2E-${Date.now().toString(36).toUpperCase()}`;
  const testProductId = `PROD-JUMO-AUTO-${Date.now().toString(36).toUpperCase()}`;
  
  console.log(`[ACTION] Submitting Specification: ${testSpecId}`);
  
  await orchestrator.submitSpecification({
    productId: testProductId,
    specificationId: testSpecId,
    specificationVersion: "1.0.0",
    idempotencyKey: `IDEM-${testSpecId}`,
    ecosystem: 'SOFTWARE_ECOSYSTEM'
  });

  // Find the created job
  const job = (Array.from(registry.getAllJobs()) as ProductManufacturingJob[]).find(j => j.specificationId === testSpecId);
  if (!job) throw new Error("Failed to create manufacturing job from specification.");
  
  console.log(`[PASS] Job Created: ${job.jobId} | Initial State: ${job.currentLifecycleState}`);

  // 3. Automate through stages
  // The orchestrator's autoOrchestrate logic handles many transitions automatically.
  // We will poll for completion or failures.
  
  let attempts = 0;
  const maxAttempts = 50;
  let lastState = job.currentLifecycleState;

  console.log(`[ACTION] Monitoring Authoritative Pipeline Traversal...`);

  while (attempts < maxAttempts) {
    const updatedJob = registry.getJob(job.jobId) as ProductManufacturingJob;
    if (!updatedJob) throw new Error("Job lost in registry during execution.");

    if (updatedJob.currentLifecycleState !== lastState) {
      console.log(`  -> State Transition: ${lastState} -> ${updatedJob.currentLifecycleState} (${updatedJob.status})`);
      lastState = updatedJob.currentLifecycleState;
    }

    if (updatedJob.currentLifecycleState === 'OPERATING') {
      console.log(`[PASS] Pipeline reached terminal state: OPERATING`);
      break;
    }

    if (updatedJob.currentLifecycleState === 'FAILED') {
      throw new Error(`Pipeline execution failed at state: ${updatedJob.status}. Errors: ${JSON.stringify(updatedJob.errors)}`);
    }

    // Small delay to allow async orchestration to proceed if needed (in a real system this is event driven)
    // In our implementation, autoOrchestrate is awaited, so it should be fast, but we might have manual gates.
    
    // Simulate manual gates if stuck
    if (updatedJob.currentLifecycleState === 'AWAITING_SPECIFICATION_APPROVAL') {
       await orchestrator.issueCommand('APPROVE_SPECIFICATION', { jobId: job.jobId });
    } else if (updatedJob.currentLifecycleState === 'AWAITING_ARCHITECTURE_APPROVAL') {
       await orchestrator.issueCommand('APPROVE_ARCHITECTURE', { jobId: job.jobId });
    }

    await new Promise(r => setTimeout(r, 100));
    attempts++;
  }

  if (attempts >= maxAttempts) {
    throw new Error(`Pipeline timeout after ${maxAttempts} monitoring cycles. Last state: ${lastState}`);
  }

  // 4. Verify Final Artifacts & Runtime
  const finalJob = registry.getJob(job.jobId) as ProductManufacturingJob;
  console.log(`\n[VERIFICATION] Finalizing E2E Validation:`);
  console.log(`  - Artifacts Created: ${Object.keys(finalJob.artifacts || {}).join(', ')}`);
  console.log(`  - Build Artifact: ${finalJob.buildArtifactId || 'MISSING'}`);
  console.log(`  - Runtime Instance: ${finalJob.runtimeInstanceId || 'MISSING'}`);

  if (!finalJob.runtimeInstanceId) throw new Error("E2E Test Failed: No Runtime Instance generated.");

  return {
    success: true,
    jobId: job.jobId,
    productId: testProductId,
    finalState: finalJob.currentLifecycleState,
    runtimeInstanceId: finalJob.runtimeInstanceId
  };
}

