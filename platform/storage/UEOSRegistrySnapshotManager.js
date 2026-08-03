/**
 * JUMO UEOS
 * Enterprise Registry Snapshot Manager
 */

import { registryPersistenceEngine } 
from "./RegistryPersistenceEngine.js";

import { erpRegistry } 
from "../registry/ERPRegistry.js";

import { erpInstanceRegistry } 
from "../registry/ERPInstanceRegistry.js";

import { portalRegistry } 
from "../registry/PortalRegistry.js";

import { moduleRegistry } 
from "../registry/ModuleRegistry.js";

import { formRegistry } 
from "../registry/formRegistry.js";

import { workflowRegistry } 
from "../registry/workflowRegistry.js";

import { componentRegistry } 
from "../registry/componentRegistry.js";

import { departmentRegistry } 
from "../registry/departmentRegistry.js";

import { aiERPRegistry } 
from "../registry/ai/AIERPRegistry.js";


export class UEOSRegistrySnapshotManager {


 saveAll(){

   return {

    erp:
    registryPersistenceEngine.save(
      "erp-registry",
      erpRegistry.list()
    ),

    erpInstances:
    registryPersistenceEngine.save(
      "erp-instance-registry",
      erpInstanceRegistry.list()
    ),

    portals:
    registryPersistenceEngine.save(
      "portal-registry",
      portalRegistry.list()
    ),

    modules:
    registryPersistenceEngine.save(
      "module-registry",
      moduleRegistry.list()
    ),

    forms:
    registryPersistenceEngine.save(
      "form-registry",
      formRegistry.list()
    ),

    workflows:
    registryPersistenceEngine.save(
      "workflow-registry",
      workflowRegistry.list()
    ),

    components:
    registryPersistenceEngine.save(
      "component-registry",
      componentRegistry.list()
    ),

    departments:
    registryPersistenceEngine.save(
      "department-registry",
      departmentRegistry.list()
    ),

    ai:
    registryPersistenceEngine.save(
      "ai-erp-registry",
      aiERPRegistry.list()
    )

   };

 }

 loadAll(){
    // Dependencies first
    const modules = registryPersistenceEngine.load("module-registry");
    modules.forEach(i => moduleRegistry.register(i));

    const portals = registryPersistenceEngine.load("portal-registry");
    portals.forEach(i => portalRegistry.register(i));

    const workflows = registryPersistenceEngine.load("workflow-registry");
    workflows.forEach(i => workflowRegistry.register(i));

    // Instances later
    const erpInstances = registryPersistenceEngine.load("erp-instance-registry");
    erpInstances.forEach(i => erpInstanceRegistry.register(i));

    const erp = registryPersistenceEngine.load("erp-registry");
    erp.forEach(i => erpRegistry.register(i));

    const forms = registryPersistenceEngine.load("form-registry");
    forms.forEach(i => formRegistry.register(i));

    const components = registryPersistenceEngine.load("component-registry");
    components.forEach(i => componentRegistry.register(i));

    const departments = registryPersistenceEngine.load("department-registry");
    departments.forEach(i => departmentRegistry.register(i));

    const ai = registryPersistenceEngine.load("ai-erp-registry");
    ai.forEach(i => aiERPRegistry.register(i));

    return {
        erp: erp.length,
        erpInstances: erpInstances.length,
        portals: portals.length,
        modules: modules.length,
        forms: forms.length,
        workflows: workflows.length,
        components: components.length,
        departments: departments.length,
        ai: ai.length
    };
 }


}


export const ueosRegistrySnapshotManager =
new UEOSRegistrySnapshotManager();
