import { ERPBlueprintRegistry } from "./platform/factory/erp/ERPBlueprintRegistry.js";
import { erpProductRegistry } from "./platform/registry/ERPProductRegistry.js";

console.log("=== JUMO UEOS PLATFORM ARCHITECTURE (10 APPROVED ERP TEMPLATES) ===\n");
console.log(`ERP ECOSYSTEM FACTORIES: ${ERPBlueprintRegistry.list().length}`);
ERPBlueprintRegistry.list().forEach(b => {
  console.log(`- ${b.name} (${b.templates.length} templates)`);
  b.templates.forEach(t => {
    console.log(`   * ${t.name}`);
  });
});
console.log("");

const products = erpProductRegistry.list();
console.log(`INSTITUTIONAL ERP PRODUCTS / TEMPLATES: ${products.length}`);
products.forEach(p => {
  console.log(`- ${p.name} (from Ecosystem: ${p.ecosystemId})`);
});
console.log("");

