/**
 * JUMO UEOS
 * National Enterprise Control Plane
 */

import { runtimeFabric } from "../runtime/RuntimeFabric.js";
import { domainRegistry } from "../registry/DomainRegistry.js";
import { tenantRegistry } from "../registry/TenantRegistry.js";
import { erpRegistry } from "../registry/ERPRegistry.js";
import { erpInstanceRegistry } from "../registry/ERPInstanceRegistry.js";
import { portalRegistry } from "../registry/PortalRegistry.js";
import { moduleRegistry } from "../registry/ModuleRegistry.js";
import { enterpriseERPFactory } from "../factory/erp/EnterpriseERPFactory.js";
import { erpFactoryManager } from "../factory/erp/ERPFactoryManager.js";
import { erpGenerationEngine } from "../factory/erp/ERPGenerationEngine.js";
import { erpActivationService } from "../factory/erp/services/ERPActivationService.js";
import { ueosRegistryService } from "./services/UEOSRegistryService.js";
import { ueosSettingsService } from "./services/UEOSSettingsService.js";
import { masterRegistryRegistry } from "./registry/MasterRegistryRegistry.js";
import { masterRegistrySyncService } from "./services/MasterRegistrySyncService.js";
import { erpDiscoveryService } from "../factory/erp/services/ERPDiscoveryService.js";
import { registerGovernanceRegistries } from "./registry/registerGovernanceRegistries.js";

registerGovernanceRegistries();

export class UEOSControlPlane {

 constructor(){

  this.status = "ONLINE";

  this.ai = {
   enabled:true,
   engine:"UEOS AI Intelligence Runtime",
   capabilities:[
    "enterprise intelligence",
    "ERP generation",
    "architecture automation",
    "deployment orchestration",
    "digital twin management",
    "compliance monitoring"
   ]
  };

 }


  getERPTemplates(){
    return enterpriseERPFactory.templates || [];
  }

  getERPTemplate(id){
    return this.getERPTemplates()
      .find(t => t.id === id);
  }

  deployERP(id,name){

    const template =
      this.getERPTemplate(id) ||
      {
        id,
        name,
        type:"Enterprise ERP",
        generatedBy:"UEOS AI ERP Factory",
        portals:[],
        modules:[],
        workflows:[]
      };

    this.deployments =
      this.deployments || [];

    const instance = {
      instanceId:`erp-${Date.now()}`,
      templateId:template.id,
      name:template.name,
      status:"DEPLOYED",
      tenantIsolation:true
    };

    this.deployments.push(instance);

    return instance;
  }

  getDeployedERPInstances(){
    return this.deployments || [];
  }

 
syncMasterRegistries(){

 masterRegistryRegistry.syncRegistry(
 "erp",
 erpRegistry
 );

 masterRegistryRegistry.syncRegistry(
 "erpInstances",
 erpInstanceRegistry
 );

 masterRegistryRegistry.syncRegistry(
 "tenants",
 tenantRegistry
 );

}

health(){

this.syncMasterRegistries();



  return {

   controlCenter:
    "JUMO UEOS National Enterprise Control Center",

   status:this.status,

   ai:this.ai,

   runtime:
    runtimeFabric.health(),

   settings:
ueosSettingsService.health(),

masterRegistry:
masterRegistryRegistry.health(),

registries:{
    erp:erpRegistry.health(),
erpInstances:erpInstanceRegistry.health(),
    portals:portalRegistry.health(),
    modules:moduleRegistry.health(),
    domains:domainRegistry.health(),
    tenants:tenantRegistry.health()
   },

   factories:{
    enterpriseERP:
     enterpriseERPFactory.health(),

    erpFactoryManager:
     erpFactoryManager.health()
   }

  };

 }




  generateERP(directive){

    return erpGenerationEngine.generateERP(directive);

  }

  activateERP(erp){
    return erpActivationService.activate(erp);
  }



  getGeneratedERPInstances(){

    return erpGenerationEngine.listGenerated();

  }

  getERPApplications() {
    return erpDiscoveryService.listERPs();
  }

  getERPStatus() {
    return erpDiscoveryService.health();
  }

  getERPInstance(id) {
    return erpDiscoveryService.getERP(id);
  }


}

export const ueosControlPlane =
 new UEOSControlPlane();

if (typeof window !== "undefined") {
 window.ueosControlPlane = ueosControlPlane;
}
