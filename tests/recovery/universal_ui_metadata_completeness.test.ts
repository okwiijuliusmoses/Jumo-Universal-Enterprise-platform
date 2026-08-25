import { JUMOUniversalUIAuditEngine } from '../../src/recovery/ui/JUMOUniversalUIAuditEngine';
import { JUMOUniversalUIReconstructionEngine } from '../../src/recovery/ui/JUMOUniversalUIReconstructionEngine';

console.log("=== UNIVERSAL UI METADATA COMPLETENESS TEST ===");
const startTime = Date.now();
let passed = 0;
let failed = 0;

function assert(condition: boolean, title: string) {
  if (condition) {
    console.log(`[✓ PASS] ${title}`);
    passed++;
  } else {
    console.error(`[✗ FAIL] ${title}`);
    failed++;
  }
}

const audit = JUMOUniversalUIAuditEngine.runAudit();
assert(audit.products.length === 6, "Audit covers all 6 products");

const reconstruction = JUMOUniversalUIReconstructionEngine.executeReconstruction();
assert(reconstruction.totalCapabilitiesProcessed > 0, "Reconstruction processed capabilities");
assert(reconstruction.totalUIMetadataContractsCreated > 0, "UI Metadata contracts created");
assert(reconstruction.totalRuntimeComponentsBound > 0, "Runtime components bound");

console.log(`--- TEST SUMMARY --- Passed: ${passed} | Failed: ${failed} | Time: ${Date.now() - startTime}ms`);
if (failed > 0) process.exit(1);
