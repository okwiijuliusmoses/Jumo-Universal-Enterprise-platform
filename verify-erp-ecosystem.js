import { ERPBlueprintRegistry } from "./platform/factory/erp/ERPBlueprintRegistry.js";
import { erpProductRegistry } from "./platform/registry/ERPProductRegistry.js";

console.log("=== JUMO UEOS PLATFORM ARCHITECTURE ===\n");
console.log(`ERP ECOSYSTEM FACTORIES: ${ERPBlueprintRegistry.list().length}`);
ERPBlueprintRegistry.list().forEach(b => {
  console.log(`- ${b.name}`);
});
console.log("");

const products = erpProductRegistry.list();
console.log(`INSTITUTIONAL ERP PRODUCTS: ${products.length}`);
products.forEach(p => {
  console.log(`- ${p.name} (from ${p.ecosystemName})`);
});
console.log("");
