import { JUMOPhase3AuditEngine } from '../../src/recovery/phase3/JUMO_PHASE3_AUDIT_ENGINE';
import { JUMOPhase3AuditReportGenerator } from '../../src/recovery/phase3/JUMO_PHASE3_AUDIT_REPORT';
import { JUMOPhase3CompletenessValidator } from '../../src/recovery/phase3/JUMOPhase3CompletenessValidator';

console.log("=== JUMO UEOS PHASE 3 FORENSIC AUDIT & RECONSTRUCTION TEST ===");
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

// 1. Audit Engine Execution
const fullAudit = JUMOPhase3AuditEngine.executeFullAudit();
assert(fullAudit.products.length === 6, "Phase 3 Audit engine covers all 6 products");
assert(fullAudit.overallParityPercentage === 100, "Phase 3 overall parity is 100%");
assert(fullAudit.staticPlaceholderModules === 0, "Zero static placeholder modules remain");

// 2. Report Generator
const reports = JUMOPhase3AuditReportGenerator.generateAllReports();
assert(Object.keys(reports.productReports).length === 6, "Per-product audit reports generated for 6 products");

// 3. Completeness Validator
const completeness = JUMOPhase3CompletenessValidator.validateAllProducts();
assert(completeness.isFullyComplete === true, "Phase 3 completeness validator passes fully");
for (const p of completeness.results) {
  assert(p.overallStatus === "PASS", `Product ${p.productId} passed all 19 completeness checkpoints`);
}

console.log(`--- PHASE 3 TEST SUMMARY --- Passed: ${passed} | Failed: ${failed} | Time: ${Date.now() - startTime}ms`);
if (failed > 0) process.exit(1);
