import { RegistryFactory } from '../../src/core/enterprise/registry/RegistryFactory';
import { getApprovedProduct, ApprovedProductRegistry } from '../../src/products/ApprovedProductRegistry';
import { AuthService } from '../../src/products/AuthService';
import { MasterModuleRegistry } from '../../src/core/enterprise/registry/MasterModuleRegistry';
import { DynamicNavigationGenerator } from '../../src/core/enterprise/navigation/DynamicNavigationGenerator';

console.log("=== JUMO UEOS REGISTRY FACTORY RUNTIME VALIDATION ===");
const startTime = Date.now();
let passed = 0;
let failed = 0;

function assert(condition: boolean, title: string, details?: string) {
  if (condition) {
    console.log(`[✓ PASS] ${title}`);
    passed++;
  } else {
    console.error(`[✗ FAIL] ${title}${details ? ' - ' + details : ''}`);
    failed++;
  }
}

// 1. Test RegistryFactory Collection Contract across all core registries
const coreRegistryKeys = [
  'APPROVED_PRODUCTS',
  'PORTAL_REGISTRY',
  'DIRECTORATE_REGISTRY',
  'DEPARTMENT_REGISTRY',
  'OFFICE_REGISTRY',
  'MODULE_REGISTRY',
  'SUBMODULE_REGISTRY',
  'WORKFLOW_REGISTRY',
  'FORM_REGISTRY',
  'REPORT_REGISTRY',
  'API_REGISTRY',
  'INTEGRATION_REGISTRY',
  'AI_CAPABILITY_REGISTRY',
  'CREDENTIAL_REGISTRY',
  'NAVIGATION_REGISTRY',
  'GOVERNANCE_STRUCTURE_REGISTRY',
  'EDUCATION_TEMPLATE_REGISTRY',
  'CHURCH_TEMPLATE_REGISTRY',
  'UNIVERSAL_CAPABILITIES',
  'UNIVERSAL_UI_METADATA',
  'UNIVERSAL_RUNTIME_COMPONENTS'
];

coreRegistryKeys.forEach(key => {
  const reg = RegistryFactory.getRegistry(key);
  assert(reg !== undefined && reg !== null, `RegistryFactory.get('${key}') is not null/undefined`);
  assert(Array.isArray(reg.items), `RegistryFactory.get('${key}').items is an Array`);
  assert(typeof reg.find === 'function', `RegistryFactory.get('${key}').find is a function`);
  assert(typeof reg.filter === 'function', `RegistryFactory.get('${key}').filter is a function`);
  assert(typeof reg.map === 'function', `RegistryFactory.get('${key}').map is a function`);
  assert(typeof reg.some === 'function', `RegistryFactory.get('${key}').some is a function`);
  assert(typeof reg.every === 'function', `RegistryFactory.get('${key}').every is a function`);
  assert(typeof reg.getById === 'function', `RegistryFactory.get('${key}').getById is a function`);
  assert(typeof reg.getDiagnostics === 'function', `RegistryFactory.get('${key}').getDiagnostics is a function`);
  
  // Safe find execution
  const testFind = reg.find(() => false);
  assert(testFind === undefined, `RegistryFactory.get('${key}').find executes cleanly without throw`);
});

// 2. Test Empty/Missing Registry Safe Fallback
const dummyReg = RegistryFactory.getRegistry('NON_EXISTENT_DUMMY_REGISTRY');
assert(dummyReg !== undefined && Array.isArray(dummyReg.items) && dummyReg.items.length === 0, "Non-existent registry returns empty collection with items: []");
assert(dummyReg.find(x => true) === undefined, "Empty registry .find() returns undefined gracefully");
assert(dummyReg.filter(x => true).length === 0, "Empty registry .filter() returns []");
assert(dummyReg.map(x => x).length === 0, "Empty registry .map() returns []");

// 3. Test Approved Product Resolution for All 6 Products
const productKeys = ['nursery-primary', 'fintech', 'secondary', 'alumni', 'church', 'control'];
productKeys.forEach(pk => {
  const prod = getApprovedProduct(pk);
  assert(prod !== undefined && !!prod.id, `getApprovedProduct('${pk}') resolves to valid product definition (${prod?.id})`);
  assert(Array.isArray(prod.modules) && prod.modules.length > 0, `Product ${pk} has modules registered`);
  assert(Array.isArray(prod.navigationRegistry) && prod.navigationRegistry.length > 0, `Product ${pk} has dynamic navigation items`);
  
  // Verify MasterModuleRegistry produces modules for each product
  const mods = MasterModuleRegistry.getModulesForProduct(prod.id);
  assert(Array.isArray(mods) && mods.length > 0, `MasterModuleRegistry.getModulesForProduct('${prod.id}') returns ${mods.length} modules`);
  
  // Verify DynamicNavigationGenerator groups
  const groups = DynamicNavigationGenerator.generateNavigationGroups(prod.id);
  assert(Array.isArray(groups) && groups.length > 0, `DynamicNavigationGenerator.generateNavigationGroups('${prod.id}') returns ${groups.length} groups`);
});

// 4. Test AuthService Identity & Role Resolution
const testAuth = AuthService.login('user@jumo.systems');
assert(typeof testAuth === 'object' && 'success' in testAuth, "AuthService.login returns valid response object");

// 5. Test Diagnostic Audit
const diagnostics = RegistryFactory.runDiagnosticAudit();
assert(Object.keys(diagnostics).length >= coreRegistryKeys.length, "RegistryFactory.runDiagnosticAudit() covers all core registries");
console.log(`Diagnostics summary: ${Object.keys(diagnostics).length} registries validated.`);

console.log(`\n--- REGISTRY FACTORY TEST SUMMARY ---`);
console.log(`Total Assertions: ${passed + failed}`);
console.log(`Passed: ${passed} | Failed: ${failed}`);
console.log(`Execution Time: ${Date.now() - startTime}ms`);

if (failed > 0) {
  console.error(">>> REGISTRY FACTORY VERIFICATION FAILED <<<");
  process.exit(1);
} else {
  console.log(">>> REGISTRY FACTORY VERIFICATION SUCCEEDED (100% PASS) <<<");
}
