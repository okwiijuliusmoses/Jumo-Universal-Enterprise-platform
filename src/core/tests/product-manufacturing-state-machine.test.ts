import { ProductManufacturingOrchestrator } from "../factory/ProductManufacturingOrchestrator";
import { SovereignGovernanceRegistry } from "../../services/gov/SovereignGovernanceRegistry";
import { ProductManufacturingJob } from "../factory/registry/HubRegistryTypes";

export async function runProductManufacturingStateMachineTest() {
  console.log("==================================================");
  console.log("[JUMO TEST] Starting Authoritative State Machine E2E Test");
  console.log("==================================================");

  const orchestrator = ProductManufacturingOrchestrator.getInstance();
  const registry = SovereignGovernanceRegistry.getInstance();

  const productId = `PROD-TEST-${Date.now().toString(36).toUpperCase()}`;
  const specId = `SPEC-${Date.now().toString(36).toUpperCase()}`;
  const idempotencyKey = `KEY-${Date.now().toString(36).toUpperCase()}`;

  // 1. Submit Specification
  console.log("\n[TEST] 1. Submitting Specification...");
  await orchestrator.issueCommand('SUBMIT_SPECIFICATION', {
    productId,
    specificationId: specId,
    specificationVersion: '1.0.0',
    idempotencyKey,
    ecosystem: 'GOVERNMENT'
  });

  const jobs = Array.from(registry.getAllJobs()) as ProductManufacturingJob[];
  const job = jobs.find(j => j.productId === productId);

  if (!job) throw new Error("Job not created");
  console.log(`[PASS] Job Created: ${job.jobId}`);

  // The orchestrator is automatic, so it might have already progressed.
  // We'll wait a bit or poll for the expected state.
  
  const lifecycleOrder: string[] = [
    'SPECIFICATION_DRAFT', 'SPECIFICATION_NORMALIZED', 'REQUIREMENTS_VALIDATED', 'AWAITING_SPECIFICATION_APPROVAL',
    'SPECIFICATION_APPROVED', 'ARCHITECTURE_INTAKE', 'ARCHITECTURAL_EXPANSION', 'AWAITING_ARCHITECTURE_APPROVAL',
    'ARCHITECTURE_APPROVED', 'ENGINEERING_INTAKE', 'ENGINEERING_IMPLEMENTATION', 'ENGINEERING_VERIFIED',
    'FACTORY_READY', 'MANUFACTURING_EXECUTION', 'MANUFACTURING_VERIFIED', 'BUILDING', 'BUILD_VERIFIED',
    'PRODUCT_ASSURANCE', 'CERTIFICATION', 'CERTIFIED', 'PROVISIONING', 'DEPLOYMENT', 'RUNTIME_READY', 'OPERATING'
  ];

  const waitForState = async (targetState: string, timeout = 15000) => {
    const start = Date.now();
    const targetIndex = lifecycleOrder.indexOf(targetState);
    while (Date.now() - start < timeout) {
      const currentJob = registry.getJob(job.id) as ProductManufacturingJob;
      const currentIndex = lifecycleOrder.indexOf(currentJob.currentLifecycleState);
      if (currentIndex >= targetIndex) {
        return currentJob;
      }
      await new Promise(r => setTimeout(r, 100));
    }
    const finalJob = registry.getJob(job.id) as ProductManufacturingJob;
    throw new Error(`Timeout waiting for state ${targetState}. Current state: ${finalJob.currentLifecycleState}`);
  };

  console.log("[TEST] Waiting for automatic progression to AWAITING_SPECIFICATION_APPROVAL...");
  await waitForState('AWAITING_SPECIFICATION_APPROVAL');
  console.log("[PASS] Reached AWAITING_SPECIFICATION_APPROVAL");

  // 2. Approve Specification
  console.log("\n[TEST] 2. Approving Specification...");
  await orchestrator.issueCommand('APPROVE_SPECIFICATION', { jobId: job.jobId, actor: 'TEST_ACTOR' });
  
  console.log("[TEST] Waiting for progression to AWAITING_ARCHITECTURE_APPROVAL...");
  await waitForState('AWAITING_ARCHITECTURE_APPROVAL');
  console.log("[PASS] Reached AWAITING_ARCHITECTURE_APPROVAL");

  console.log("\n[TEST] 2.5 Approving Architecture...");
  await orchestrator.issueCommand('APPROVE_ARCHITECTURE', { jobId: job.jobId, actor: 'TEST_ARCHITECT' });

  // Wait for and approve the engineering gate
  const waitForEngineeringGateAndApprove = async () => {
    const start = Date.now();
    while (Date.now() - start < 15000) {
      const currentJob = registry.getJob(job.id) as ProductManufacturingJob;
      const gate = currentJob.reviewGates?.find(g => g.gateType === 'ENGINEERING_APPROVAL' && g.status === 'PENDING');
      if (gate) {
        console.log(`[TEST] Found pending engineering approval gate: ${gate.id}. Approving...`);
        await orchestrator.submitReviewDecision(job.jobId, gate.id, 'APPROVE');
        return;
      }
      await new Promise(r => setTimeout(r, 100));
    }
    throw new Error("Timeout waiting for engineering approval gate");
  };

  await waitForEngineeringGateAndApprove();

  console.log("[TEST] Waiting for progression through Engineering...");
  await waitForState('FACTORY_READY');
  console.log("[PASS] Reached FACTORY_READY");

  const jobWithEng = registry.getJob(job.id) as ProductManufacturingJob;
  if (!jobWithEng.artifacts?.['ARCHITECTURE']) throw new Error("Missing Architecture Artifact");
  if (!jobWithEng.artifacts?.['ENGINEERING']) throw new Error("Missing Engineering Artifact");
  console.log("[PASS] Architecture and Engineering Artifacts verified.");

  // 3. Manufacturing
  console.log("\n[TEST] 3. Starting Manufacturing...");
  await orchestrator.issueCommand('START_MANUFACTURING', { jobId: job.jobId });
  await waitForState('MANUFACTURING_VERIFIED');
  console.log("[PASS] Manufacturing Complete and Verified.");

  const jobWithMfg = registry.getJob(job.id) as ProductManufacturingJob;
  if (!jobWithMfg.artifacts?.['MANUFACTURING']) throw new Error("Missing Manufacturing Artifact");

  // 4. Build
  console.log("\n[TEST] 4. Starting Build...");
  await orchestrator.issueCommand('START_BUILD', { jobId: job.jobId });
  await waitForState('BUILD_VERIFIED');
  console.log("[PASS] Build Complete and Verified.");

  const jobWithBuild = registry.getJob(job.id) as ProductManufacturingJob;
  if (!jobWithBuild.artifacts?.['BUILD']) throw new Error("Missing Build Artifact");

  // Wait for and approve the final manufacturing gate before moving to operating state
  const waitForManufacturingGateAndApprove = async () => {
    const start = Date.now();
    while (Date.now() - start < 15000) {
      const currentJob = registry.getJob(job.id) as ProductManufacturingJob;
      const gate = currentJob.reviewGates?.find(g => g.gateType === 'FINAL_ASSEMBLY_APPROVAL' && g.status === 'PENDING');
      if (gate) {
        console.log(`[TEST] Found pending manufacturing approval gate: ${gate.id}. Approving...`);
        await orchestrator.submitReviewDecision(job.jobId, gate.id, 'APPROVE');
        return;
      }
      await new Promise(r => setTimeout(r, 100));
    }
    throw new Error("Timeout waiting for manufacturing approval gate");
  };

  await waitForManufacturingGateAndApprove();

  // 5. Assurance -> Certification -> Provisioning -> Deployment -> Runtime
  console.log("\n[TEST] 5. Advancing to Runtime...");
  await waitForState('OPERATING');
  console.log("[PASS] Product is OPERATING.");

  const finalJob = registry.getJob(job.id) as ProductManufacturingJob;
  console.log(`\n==================================================`);
  console.log(`[JUMO TEST] E2E SUCCESS`);
  console.log(`Product ID: ${finalJob.productId}`);
  console.log(`Job ID: ${finalJob.jobId}`);
  console.log(`Lifecycle State: ${finalJob.currentLifecycleState}`);
  console.log(`Artifacts: ${Object.keys(finalJob.artifacts || {}).join(', ')}`);
  console.log(`==================================================`);

  return finalJob;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runProductManufacturingStateMachineTest().then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1);
  });
}
