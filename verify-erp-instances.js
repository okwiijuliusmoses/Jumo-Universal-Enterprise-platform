import { ERPBlueprintRegistry } from './platform/factory/erp/ERPBlueprintRegistry.js';
import { erpEcosystemTemplateRegistry } from './platform/factory/erp/ERPEcosystemTemplateRegistry.js';
import { erpInstanceRegistry } from './platform/registry/ERPInstanceRegistry.js';
import { bootstrapEnterprisePlatform } from "./platform/control/registry/RegistryBootstrap.js";

console.log("=== JUMO UEOS ERP INSTANCE DISCOVERY REPORT ===");
bootstrapEnterprisePlatform();

console.log(`Ecosystems: OK (${ERPBlueprintRegistry.list().length} ecosystems)`);
console.log(`Templates: OK (${erpEcosystemTemplateRegistry.listTemplates().length} templates)`);

const instances = erpInstanceRegistry.list();
console.log(`Instances: FOUND (${instances.length} instances loaded)`);
instances.forEach(inst => {
  console.log(` - ${inst.name} [Status: ${inst.status}, Ecosystem: ${inst.blueprintId || inst.ecosystemId}]`);
});


