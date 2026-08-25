import { Phase3UniversalExecutor } from '../../src/recovery/JUMO_PHASE_3_EXECUTION';
import { JUMO_PHASE_3_CONTRACT, LOGIN_REGRESSION_ROUTES } from '../../src/recovery/JUMO_PHASE_3_CONTRACT';
import { AuthService } from '../../src/products/AuthService';
import { RegistryFactory } from '../../src/core/enterprise/registry/RegistryFactory';

console.log("=== JUMO UEOS PHASE 3 UNIVERSAL UI / RUNTIME COMPLETION TESTS ===");
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

// Test 1: Audit status and traceability
const audit = Phase3UniversalExecutor.executeAudit();
assert(audit.status === 'COMPLETE_AND_VERIFIED', 'Phase 3 Universal Audit status is COMPLETE_AND_VERIFIED');
assert(audit.totalProducts === 6, 'Audit covers all 6 sovereign products');
assert(audit.traceability.length === 6, 'Traceability matrix contains nodes for all 6 products');

for (const node of audit.traceability) {
  assert(node.directoratesCount > 0, `[${node.productName}] directoratesCount > 0 (${node.directoratesCount})`);
  assert(node.departmentsCount > 0, `[${node.productName}] departmentsCount > 0 (${node.departmentsCount})`);
  assert(node.officesCount > 0, `[${node.productName}] officesCount > 0 (${node.officesCount})`);
  assert(node.portalsCount > 0, `[${node.productName}] portalsCount > 0 (${node.portalsCount})`);
  assert(node.modulesCount > 0, `[${node.productName}] modulesCount > 0 (${node.modulesCount})`);
  assert(node.capabilitiesCount > 0, `[${node.productName}] capabilitiesCount > 0 (${node.capabilitiesCount})`);
  assert(node.uiMetadataCount > 0, `[${node.productName}] uiMetadataCount > 0 (${node.uiMetadataCount})`);
  assert(node.runtimeComponentsCount > 0, `[${node.productName}] runtimeComponentsCount > 0 (${node.runtimeComponentsCount})`);
  assert(node.hasZeroTrustParity === true, `[${node.productName}] Zero-Trust parity achieved`);
  assert(node.loginRouteVerified === true, `[${node.productName}] Login route verified`);
  assert(node.isFullyReconciled === true, `[${node.productName}] Fully reconciled`);
}

// Test 2: Login regression routes
const usernames = [
  { route: '/products/fintech/login', user: 'fintech.admin' },
  { route: '/products/nursery-primary/login', user: 'np.headteacher' },
  { route: '/products/secondary/login', user: 'sec.headteacher' },
  { route: '/products/alumni/login', user: 'alumni.president' },
  { route: '/products/church/login', user: 'bishop.admin' },
  { route: '/products/owners-control-center/login', user: 'sovereign.owner' }
];

for (const item of usernames) {
  const result = AuthService.login(item.user, 'Password123!');
  assert(result.success === true, `AuthService login for route ${item.route} succeeds`);
  if (result.success) {
    assert(typeof result.portalId === 'string' && result.portalId.length > 0, `Route ${item.route} returns valid portalId`);
    const nav = AuthService.getNavigationForPortal(result.portalId);
    assert(Array.isArray(nav) && nav.length > 0, `Route ${item.route} navigation items resolve cleanly`);
  }
}

// Test 3: RegistryFactory safe getters
const registries = [
  'GLOBAL_REGISTRY',
  'MODULE_REGISTRY',
  'FORM_SCHEMA_REGISTRY',
  'NAVIGATION_REGISTRY',
  'GOVERNANCE_STRUCTURE_REGISTRY',
  'EDUCATION_TEMPLATE_REGISTRY',
  'CHURCH_TEMPLATE_REGISTRY',
  'UNIVERSAL_CAPABILITIES',
  'UNIVERSAL_UI_METADATA',
  'UNIVERSAL_RUNTIME_COMPONENTS',
  'UNIVERSAL_WORKFLOWS',
  'UNIVERSAL_AI_AGENTS',
  'UNIVERSAL_TABLES',
  'UNIVERSAL_FORMS',
  'UNIVERSAL_REPORTS',
  'UNIVERSAL_DASHBOARDS',
  'UNIVERSAL_ACTIONS',
  'UNIVERSAL_PERMISSIONS'
] as const;

for (const regName of registries) {
  const col = RegistryFactory.get(regName);
  assert(col !== null && col !== undefined, `RegistryFactory.get('${regName}') is defined`);
  assert(Array.isArray(col.items), `RegistryFactory.get('${regName}').items is an Array`);
  assert(typeof col.find === 'function', `RegistryFactory.get('${regName}').find is a function`);
}

console.log(`--- PHASE 3 EXECUTION TEST SUMMARY ---`);
console.log(`Total Assertions: ${passed + failed}`);
console.log(`Passed: ${passed} | Failed: ${failed}`);
console.log(`Execution Time: ${Date.now() - startTime}ms`);

if (failed > 0) {
  console.error(`>>> PHASE 3 VERIFICATION FAILED WITH ${failed} ERRORS <<<`);
  process.exit(1);
} else {
  console.log(`>>> PHASE 3 VERIFICATION SUCCEEDED (100% PASS) <<<`);
}
