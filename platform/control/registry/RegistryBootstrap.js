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
import { digitalAgentRegistry } from "../../ai/digitalAgentRegistry.js";
import { ERPBlueprintRegistry } from "../../factory/erp/ERPBlueprintRegistry.js";

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
    agents: registryPersistenceEngine.save("digital-agent-registry", digitalAgentRegistry.getAgents()),
    instances: registryPersistenceEngine.save("erp-instance-registry", erpInstanceRegistry.list())
  };
}

export function restoreAllRegistries() {
  // 1. Module Registry
  const modules = registryPersistenceEngine.load("module-registry");
  if (Array.isArray(modules)) modules.forEach(m => moduleRegistry.register(m));

  // 2. Portal Registry
  const portals = registryPersistenceEngine.load("portal-registry");
  if (Array.isArray(portals)) portals.forEach(p => portalRegistry.register(p));

  // 3. Workflow Registry
  const workflows = registryPersistenceEngine.load("workflow-registry");
  if (Array.isArray(workflows)) workflows.forEach(w => workflowRegistry.register(w));

  // 4. Agent Registry
  const agents = registryPersistenceEngine.load("digital-agent-registry");
  if (Array.isArray(agents)) agents.forEach(a => digitalAgentRegistry.register(a));

  // 5. ERP Blueprint Registry (Static metadata)
  
  // 6. ERP Instance Registry
  const instances = registryPersistenceEngine.load("erp-instance-registry");
  if (Array.isArray(instances)) {
    instances.forEach(instance => erpInstanceRegistry.register(instance));
  }

  // Restore others
  const erps = registryPersistenceEngine.load("erp-registry");
  if (Array.isArray(erps)) erps.forEach(e => erpRegistry.register(e));

  const forms = registryPersistenceEngine.load("form-registry");
  if (Array.isArray(forms)) forms.forEach(f => formRegistry.register(f));

  const components = registryPersistenceEngine.load("component-registry");
  if (Array.isArray(components)) components.forEach(c => componentRegistry.register(c));

  const departments = registryPersistenceEngine.load("department-registry");
  if (Array.isArray(departments)) departments.forEach(d => departmentRegistry.register(d));

  const ai = registryPersistenceEngine.load("ai-erp-registry");
  if (Array.isArray(ai)) ai.forEach(a => aiERPRegistry.register(a));

  // Restore ERP metadata and availability
  return {
    status: "RESTORED",
    erpDiscoveryStatus: erpDiscoveryService.health(),
    workspaceResolverStatus: erpWorkspaceResolver.health(),
    restoredInstances: erpInstanceRegistry.list().length
  };
}
