import { ERPFactoryArchitecture } from './platform/factory/erp/ERPFactoryArchitecture.config.js';
import { erpProductRegistry } from './platform/registry/ERPProductRegistry.js';

console.log("=== JUMO UEOS PLATFORM ARCHITECTURE ===");
console.log(`ERP ECOSYSTEM FACTORIES: ${ERPFactoryArchitecture.ecosystems.length}`);
ERPFactoryArchitecture.ecosystems.forEach(eco => {
  console.log(`- ${eco.name}`);
});

const products = erpProductRegistry.list();
console.log(`\nINSTITUTIONAL ERP PRODUCTS: ${products.length}`);
products.forEach(p => {
  console.log(`- ${p.name} (from ${p.ecosystemName})`);
});
