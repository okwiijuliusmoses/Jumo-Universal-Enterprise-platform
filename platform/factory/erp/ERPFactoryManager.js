/**
 * JUMO UEOS
 * National Digital Enterprise ERP Factory Orchestrator
 */

import { enterpriseERPFactory } from "./EnterpriseERPFactory.js";
import { erpGenerationEngine } from "./ERPGenerationEngine.js";
import { erpInstanceRegistry } from "../../registry/ERPInstanceRegistry.js";
import { erpRegistry } from "../../registry/ERPRegistry.js";
import { portalRegistry } from "../../registry/PortalRegistry.js";
import { moduleRegistry } from "../../registry/ModuleRegistry.js";
import { formRegistry } from "../../registry/formRegistry.js";
import { workflowRegistry } from "../../registry/workflowRegistry.js";
import { componentRegistry } from "../../registry/componentRegistry.js";
import { departmentRegistry } from "../../registry/departmentRegistry.js";
import { aiERPRegistry } from "../../registry/ai/AIERPRegistry.js";
import { saveAllRegistries } from "../../control/registry/RegistryBootstrap.js";


export class ERPFactoryManager {

 constructor(){

   this.status="ONLINE";

   this.factories={};

   this.ai={
     enabled:true,
     engine:"JUMO UEOS AI Enterprise Intelligence Runtime",
     capabilities:[
       "ERP generation",
       "enterprise modelling",
       "domain provisioning",
       "workflow automation",
       "AI governance"
     ]
   };

   this.registerFactory(
     "enterprise",
     enterpriseERPFactory
   );
 }


 registerFactory(name,factory){

   this.factories[name]=factory;

   return factory;
 }


 createERP(factoryName,definition){

   const factory=this.factories[factoryName];

   if(!factory){

     throw new Error(
       "ERP Factory not registered: "+factoryName
     );

   }

   const template=factory.createTemplate(definition);

   return factory.architectERP(template);

 }


 generateERP(definition){

   const instance =
     erpGenerationEngine.generateERP(definition);


   const enterpriseInstance={

     ...instance,

     factory:
     "JUMO UEOS National Digital Enterprise Factory",

     tenant:
     definition.tenant ||
     `${definition.id}-tenant`,

     domain:
     definition.domain ||
     "enterprise",

     lifecycle:
     "INSTALLED",

     governance:{
       sovereign:true,
       multiTenant:true,
       aiManaged:true
     }

   };


   erpInstanceRegistry.register({

      id:enterpriseInstance.id,

      blueprintId:
      definition.blueprintId ||
      definition.id,

      tenant:
      enterpriseInstance.tenant,

      domain:
      enterpriseInstance.domain,

      status:"ACTIVE",

      lifecycle:"INSTALLED"

   });


   saveAllRegistries();


   return enterpriseInstance;

 }


 getGeneratedInstances(){

   return erpGenerationEngine.listGenerated();

 }


 listFactories(){

   return Object.keys(this.factories);

 }


 health(){

   return {

    runtime:
    "JUMO UEOS National ERP Runtime Fabric",

    status:this.status,

    factories:
    this.listFactories(),

    ai:this.ai

   };

 }

}


export const erpFactoryManager =
new ERPFactoryManager();
