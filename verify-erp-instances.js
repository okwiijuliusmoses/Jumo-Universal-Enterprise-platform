import { erpInstanceRegistry } from './platform/registry/ERPInstanceRegistry.js';
import { erpProductRegistry } from './platform/registry/ERPProductRegistry.js';
import { bootstrapEnterprisePlatform } from "./platform/control/registry/RegistryBootstrap.js";

console.log("Provisioning Runtime Instances from Product Definitions...");
bootstrapEnterprisePlatform();

const existingInstances = erpInstanceRegistry.list();

console.log(`\nRUNTIME ERP INSTANCES GENERATED: ${existingInstances.length}`);
existingInstances.forEach(inst => {
  console.log(`✓ ${inst.name} [Status: ${inst.status}]`);
});
