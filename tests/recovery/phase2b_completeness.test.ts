import { JUMOSixProductCompletenessValidator } from "../../src/recovery/JUMOSixProductCompletenessValidator";
import { ALL_SIX_PRODUCT_MANIFESTS } from "../../src/recovery/manifests";
import { JUMOArchitectureEvidenceRegistry } from "../../src/recovery/JUMOArchitectureEvidenceRegistry";
import { JUMO_SIX_APPROVED_PRODUCTS } from "../../src/recovery/JUMOSixApprovedProducts";

console.log("=== JUMO UEOS PHASE 2B SIX-PRODUCT COMPLETENESS VERIFICATION ===");

const report = JUMOSixProductCompletenessValidator.validateAll();

console.log(`Timestamp: ${report.timestamp}`);
console.log(`Total Criteria: ${report.totalCriteria}`);
console.log(`Passed: ${report.passedCriteria} | Failed: ${report.failedCriteria}`);
console.log(`Overall Status: ${report.status}`);

console.log("\n--- CRITERIA BREAKDOWN ---");
report.results.forEach(res => {
  const icon = res.passed ? "✓ PASS" : "✗ FAIL";
  console.log(`[${icon}] Rule ${res.ruleNumber}: ${res.name} -> ${res.details}`);
});

console.log("\n--- INVENTORY & EVIDENCE SUMMARY ---");
console.log(`Total Architecture Evidence Entries: ${report.summary.totalEvidenceCount}`);
console.log(`Approved Products: ${report.summary.approvedProductsCount}`);
console.log(`Directorates Preserved: ${report.summary.directoratesPreserved}`);
console.log(`Departments Preserved: ${report.summary.departmentsPreserved}`);
console.log(`Offices Preserved: ${report.summary.officesPreserved}`);
console.log(`Portals Preserved: ${report.summary.portalsPreserved}`);
console.log(`Modules Preserved: ${report.summary.modulesPreserved}`);
console.log(`Capabilities Preserved: ${report.summary.capabilitiesPreserved}`);

if (report.status !== "COMPLETE_AND_VERIFIED") {
  console.error("FAIL: Completeness validation did not pass all 17 criteria.");
  process.exit(1);
} else {
  console.log("\n>>> PHASE 2B VERIFICATION SUCCEEDED WITH 100% INVARIANT COMPLIANCE <<<");
}
