const fs = require('fs');
const { execSync } = require('child_process');

console.log('=== JUMO UEOS f200d30 BASELINE REGRESSION TEST ===\n');

const currentCode = fs.readFileSync('src/products/registries.ts', 'utf8');
const f200Code = execSync('git show f200d30:src/products/registries.ts').toString();

const extractArray = (code, varName) => {
  const regex = new RegExp(`export const ${varName}(?:: [^=]+)? = (\\[[\\s\\S]*?\\]);`, "m");
  const match = code.match(regex);
  if (!match) return [];
  try {
    return eval(match[1]);
  } catch (e) {
    console.error("Eval error for " + varName, e.message);
    return [];
  }
};

const categories = [
  { name: 'EducationTemplateRegistry', arrayName: 'EducationTemplateRegistry' },
  { name: 'ChurchTemplateRegistry', arrayName: 'ChurchTemplateRegistry' },
  { name: 'PortalRegistry', arrayName: 'PortalRegistry' },
  { name: 'CredentialRegistry', arrayName: 'CredentialRegistry' },
  { name: 'NavigationRegistry', arrayName: 'NavigationRegistry' },
  { name: 'ModuleRegistry', arrayName: 'ModuleRegistry' },
  { name: 'WorkflowRegistry', arrayName: 'WorkflowRegistry' },
  { name: 'FormRegistry', arrayName: 'FormRegistry' },
  { name: 'DirectorateRegistry', arrayName: 'DirectorateRegistry' },
  { name: 'DepartmentRegistry', arrayName: 'DepartmentRegistry' },
  { name: 'OfficeRegistry', arrayName: 'OfficeRegistry' },
  { name: 'ReportRegistry', arrayName: 'ReportRegistry' },
  { name: 'APIRegistry', arrayName: 'APIRegistry' },
  { name: 'IntegrationRegistry', arrayName: 'IntegrationRegistry' },
  { name: 'AICapabilityRegistry', arrayName: 'AICapabilityRegistry' }
];

let allPassed = true;

const results = categories.map(({ name, arrayName }) => {
  const baselineItems = extractArray(f200Code, arrayName);
  const currentItems = extractArray(currentCode, arrayName);
  
  const getId = (i) => i.portalId || i.id || i.name || i.username || JSON.stringify(i);
  const baselineIds = new Set(baselineItems.map(getId));
  const currentIds = new Set(currentItems.map(getId));
  
  const removed = baselineItems.filter(i => !currentIds.has(getId(i)));
  const added = currentItems.filter(i => !baselineIds.has(getId(i)));
  
  if (removed.length > 0) {
    allPassed = false;
  }
  
  return {
    category: name,
    baselineCount: baselineItems.length,
    finalCount: currentItems.length,
    addedCount: added.length,
    removedCount: removed.length,
    removedSample: removed.map(r => r.id || r.name).slice(0, 3)
  };
});

console.table(results);

if (allPassed) {
  console.log('\n✅ BASELINE PRESERVATION VERIFIED: ZERO baseline elements removed. All expansions are strictly additive.');
} else {
  console.error('\n❌ VIOLATION DETECTED: Baseline elements were removed!');
  process.exit(1);
}
