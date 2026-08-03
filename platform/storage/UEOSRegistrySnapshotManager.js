/**
 * JUMO UEOS
 * Enterprise Registry Snapshot Manager
 */

import { registryPersistenceEngine } 
from "./RegistryPersistenceEngine.js";

import { erpRegistry } 
from "../registry/ERPRegistry.js";

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

  loadAll(){

    return {
      erp: registryPersistenceEngine.load("erp-registry"),
      portals: registryPersistenceEngine.load("portal-registry"),
      modules: registryPersistenceEngine.load("module-registry"),
      forms: registryPersistenceEngine.load("form-registry"),
      workflows: registryPersistenceEngine.load("workflow-registry"),
      components: registryPersistenceEngine.load("component-registry"),
      departments: registryPersistenceEngine.load("department-registry"),
      ai: registryPersistenceEngine.load("ai-erp-registry")
    };

  }



 saveAll(){

   return {

    erp:
    registryPersistenceEngine.save(
      "erp-registry",
      erpRegistry.list()
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

}


export const ueosRegistrySnapshotManager =
new UEOSRegistrySnapshotManager();
