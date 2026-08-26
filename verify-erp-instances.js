
import { erpInstanceRegistry } from './platform/registry/ERPInstanceRegistry.js';
import { ERPBlueprintRegistry } from './platform/factory/erp/ERPBlueprintRegistry.js';
import { ueosRegistrySnapshotManager } from "./platform/storage/UEOSRegistrySnapshotManager.js";

ueosRegistrySnapshotManager.loadAll();

const existingInstances = erpInstanceRegistry.list();
ERPBlueprintRegistry.list().forEach(blueprint => {
  const exists = existingInstances.find(inst => inst.id === blueprint.id + "-instance" || inst.blueprintId === blueprint.id);
  if (!exists) {
    erpInstanceRegistry.register({
      id: blueprint.id + "-instance",
      instanceId: blueprint.id + "-instance",
      templateId: blueprint.id,
      name: blueprint.name,
      blueprintId: blueprint.id,
      tenant: "system",
      domain: blueprint.category,
      status: "ACTIVE"
    });
  }
});
ueosRegistrySnapshotManager.saveAll();

console.log('ERP BLUEPRINTS:');
ERPBlueprintRegistry.list().forEach(bp => {
  console.log(bp.id);
});

console.log('\nExpected:\n\nERP INSTANCES:');
console.log(erpInstanceRegistry.list().length);
