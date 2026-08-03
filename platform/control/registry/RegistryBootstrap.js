/**
 * JUMO UEOS
 * Registry Persistence Bootstrap
 */

import { registryPersistenceEngine } from "../../storage/RegistryPersistenceEngine.js";

import { erpRegistry } from "../../registry/ERPRegistry.js";
import { portalRegistry } from "../../registry/PortalRegistry.js";
import { moduleRegistry } from "../../registry/ModuleRegistry.js";
import { formRegistry } from "../../registry/formRegistry.js";
import { workflowRegistry } from "../../registry/workflowRegistry.js";
import { componentRegistry } from "../../registry/componentRegistry.js";
import { departmentRegistry } from "../../registry/departmentRegistry.js";
import { aiERPRegistry } from "../../registry/ai/AIERPRegistry.js";
import { erpInstanceRegistry } from "../../registry/ERPInstanceRegistry.js";
import { erpDiscoveryService } from "../../factory/erp/services/ERPDiscoveryService.js";
import { erpWorkspaceResolver } from "../../workspace/ERPWorkspaceResolver.js";

export function saveAllRegistries() {
  return {
    erp: registryPersistenceEngine.save("erp-registry", erpRegistry.list()),
    portals: registryPersistenceEngine.save("portal-registry", portalRegistry.list()),
    modules: registryPersistenceEngine.save("module-registry", moduleRegistry.list()),
    forms: registryPersistenceEngine.save("form-registry", formRegistry.list()),
    workflows: registryPersistenceEngine.save("workflow-registry", workflowRegistry.list()),
    components: registryPersistenceEngine.save("component-registry", componentRegistry.list()),
    departments: registryPersistenceEngine.save("department-registry", departmentRegistry.list()),
    ai: registryPersistenceEngine.save("ai-erp-registry", aiERPRegistry.list()),
    instances: registryPersistenceEngine.save("erp-instance-registry", erpInstanceRegistry.list())
  };
}

export function restoreAllRegistries() {
  const instances = registryPersistenceEngine.load("erp-instance-registry");
  if (Array.isArray(instances)) {
    instances.forEach(instance => erpInstanceRegistry.register(instance));
  }

  // Restore ERP metadata and availability
  return {
    status: "RESTORED",
    erpDiscoveryStatus: erpDiscoveryService.health(),
    workspaceResolverStatus: erpWorkspaceResolver.health(),
    restoredInstances: erpInstanceRegistry.count()
  };
}
