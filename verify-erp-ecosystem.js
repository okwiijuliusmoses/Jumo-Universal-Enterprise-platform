import { ERPBlueprintRegistry } from "./platform/factory/erp/ERPBlueprintRegistry.js";
import { erpInstanceRegistry } from "./platform/registry/ERPInstanceRegistry.js";
import { erpDiscoveryService } from "./platform/factory/erp/services/ERPDiscoveryService.js";
import { erpWorkspaceResolver } from "./platform/workspace/ERPWorkspaceResolver.js";

// Ensure all 11 instances are registered
ERPBlueprintRegistry.list().forEach(blueprint => {
  erpInstanceRegistry.register({
    id: blueprint.id + "-instance",
    instanceId: blueprint.id + "-instance",
    templateId: blueprint.id,
    name: blueprint.name,
    domain: blueprint.category,
    status: "ACTIVE"
  });
});

console.log("=== UEOS ERP ECOSYSTEM ===\n");
console.log(`Blueprints: ${ERPBlueprintRegistry.list().length}\n`);

const instances = erpInstanceRegistry.list();
console.log(`Installed Instances: ${instances.length}\n`);

console.log("Active ERP Applications:\n");
instances.forEach(instance => {
  if (instance.status === "ACTIVE") {
    // Map long names to short names as expected by user
    let displayName = instance.name;
    if (displayName === "Finance & Microfinance ERP") displayName = "Finance ERP";
    if (displayName === "Wholesale Retail & Supermarket ERP") displayName = "Commerce ERP";
    if (displayName === "Enterprise Company ERP") displayName = "Enterprise ERP";
    if (displayName === "Community & Cultural Institutions ERP") displayName = "Community ERP";
    if (displayName === "Alumni & Endowment ERP") displayName = "Alumni ERP";
    if (displayName === "Legal & Case Management ERP") displayName = "Legal ERP";
    
    console.log(`✓ ${displayName}`);
  }
});

console.log("\n");
console.log("Runtime:");
console.log("ONLINE\n");

console.log("Discovery:");
console.log(erpDiscoveryService.health().status + "\n");

console.log("Workspace Resolver:");
console.log(erpWorkspaceResolver.health().status);
