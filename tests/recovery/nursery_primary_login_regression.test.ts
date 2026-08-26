import { AuthService } from '../../src/products/AuthService';
import { RegistryFactory } from '../../src/core/enterprise/registry/RegistryFactory';

console.log("=== NURSERY & PRIMARY LOGIN REGRESSION TEST ===");
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

// Perform login as Nursery & Primary Headteacher
const loginRes = AuthService.login('np.headteacher', 'Password123!');
assert(loginRes.success === true, "AuthService login for np.headteacher succeeds");
assert(typeof loginRes.portalId === 'string' && loginRes.portalId.length > 0, "Valid portalId returned");

if (loginRes.portalId) {
  const nav = AuthService.getNavigationForPortal(loginRes.portalId);
  assert(Array.isArray(nav), "Navigation result is an array");
  assert(nav.length > 0, "Navigation groups resolved (> 0)");
}

// Verify RegistryFactory.get() does not throw on invalid key
const invalidReg = RegistryFactory.get('NON_EXISTENT_REGISTRY' as any);
assert(invalidReg !== null && invalidReg !== undefined, "Non-existent registry returns empty collection");
assert(Array.isArray(invalidReg.items), "Items array is initialized");
assert(invalidReg.find(() => true) === undefined, "Unsafe .find() on empty collection returns undefined gracefully without throw");

console.log(`--- TEST SUMMARY --- Passed: ${passed} | Failed: ${failed} | Time: ${Date.now() - startTime}ms`);
if (failed > 0) process.exit(1);
