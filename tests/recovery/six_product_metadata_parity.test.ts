import { JUMOUIParityValidator } from '../../src/recovery/ui/JUMOUIParityValidator';

console.log("=== SIX PRODUCT METADATA PARITY TEST ===");
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

const parity = JUMOUIParityValidator.validateParity();
assert(parity.overallParityPercentage === 100, "Overall parity is 100%");
assert(parity.allProductsParityAchieved === true, "All products parity achieved");

for (const p of parity.productScores) {
  assert(p.is100Percent === true, `Product ${p.productId} achieved 100% parity`);
}

console.log(`--- TEST SUMMARY --- Passed: ${passed} | Failed: ${failed} | Time: ${Date.now() - startTime}ms`);
if (failed > 0) process.exit(1);
