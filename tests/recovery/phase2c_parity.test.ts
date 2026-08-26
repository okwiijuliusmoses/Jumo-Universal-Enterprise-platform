import { JUMOUniversalUIParityValidator } from '../../src/recovery/ui/JUMOUniversalUIParityValidator';
import { getApprovedProduct } from '../../src/products/ApprovedProductRegistry';
import { UniversalCapabilityRegistry } from '../../src/core/enterprise/registry/UniversalCapabilityRegistry';
import { UniversalUIMetadataRegistry } from '../../src/core/enterprise/registry/UniversalUIMetadataRegistry';
import { UniversalRuntimeComponentRegistry } from '../../src/core/enterprise/registry/UniversalRuntimeComponentRegistry';

console.log("=== JUMO UEOS PHASE 2C UI PARITY & RUNTIME VERIFICATION ===");
const startTime = Date.now();

// 1. Generate Parity Reports
const { results, universalReport } = JUMOUniversalUIParityValidator.generateAllReports();

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

// Criteria 1: Zero undefined errors on login routes and product aliases
const nurseryProduct = getApprovedProduct('nursery-primary');
assert(nurseryProduct && nurseryProduct.id === 'JUMO-NURSERY-PRIMARY-ERP', "Route Resolution: nursery-primary alias resolves to JUMO-NURSERY-PRIMARY-ERP");

const fintechProduct = getApprovedProduct('fintech');
assert(fintechProduct && fintechProduct.id === 'JUMO-FINTECH', "Route Resolution: fintech alias resolves to JUMO-FINTECH");

const secondaryProduct = getApprovedProduct('secondary');
assert(secondaryProduct && secondaryProduct.id === 'JUMO-SECONDARY-ERP', "Route Resolution: secondary alias resolves to JUMO-SECONDARY-ERP");

const alumniProduct = getApprovedProduct('alumni');
assert(alumniProduct && (alumniProduct.id === 'JUMO-ALUMNI' || alumniProduct.id === 'JUMO-ALUMNI-ERP'), "Route Resolution: alumni alias resolves to JUMO-ALUMNI");

const churchProduct = getApprovedProduct('church');
assert(churchProduct && (churchProduct.id === 'JUMO-CHURCH' || churchProduct.id === 'JUMO-CHURCH-ERP'), "Route Resolution: church alias resolves to JUMO-CHURCH");

const controlProduct = getApprovedProduct('control');
assert(controlProduct && (controlProduct.id === 'JUMO-CONTROL' || controlProduct.id === 'JUMO-OWNER-CONTROL-CENTER'), "Route Resolution: control alias resolves to JUMO-CONTROL");

// Criteria 2: All 6 products pass 100% Vertical & Horizontal Parity
results.forEach(res => {
  assert(res.overallStatus === 'PASS', `Product Parity: ${res.productName} 100% Vertical & Horizontal Parity`);
  assert(res.verticalParity.capabilitiesCount > 0, `Capability Binding: ${res.productName} has ${res.verticalParity.capabilitiesCount} capabilities`);
  assert(res.verticalParity.uiMetadataCount > 0, `UI Metadata Binding: ${res.productName} has ${res.verticalParity.uiMetadataCount} UI metadata items`);
  assert(res.verticalParity.runtimeComponentsCount > 0, `Runtime Binding: ${res.productName} has ${res.verticalParity.runtimeComponentsCount} runtime components`);
});

// Criteria 3: Universal Registry Collections integrity
assert(Array.isArray(UniversalCapabilityRegistry.items) && UniversalCapabilityRegistry.items.length >= 60, `UniversalCapabilityRegistry items contract: ${UniversalCapabilityRegistry.items.length} items registered`);
assert(Array.isArray(UniversalUIMetadataRegistry.items) && UniversalUIMetadataRegistry.items.length >= 60, `UniversalUIMetadataRegistry items contract: ${UniversalUIMetadataRegistry.items.length} items registered`);
assert(Array.isArray(UniversalRuntimeComponentRegistry.items) && UniversalRuntimeComponentRegistry.items.length >= 60, `UniversalRuntimeComponentRegistry items contract: ${UniversalRuntimeComponentRegistry.items.length} items registered`);

console.log(`\n--- PHASE 2C TEST SUMMARY ---`);
console.log(`Total Assertions: ${passed + failed}`);
console.log(`Passed: ${passed} | Failed: ${failed}`);
console.log(`Execution Time: ${Date.now() - startTime}ms`);

if (failed > 0) {
  console.error(">>> PHASE 2C VERIFICATION FAILED <<<");
  process.exit(1);
} else {
  console.log(">>> PHASE 2C VERIFICATION SUCCEEDED WITH 100% PARITY COMPLIANCE <<<");
}
