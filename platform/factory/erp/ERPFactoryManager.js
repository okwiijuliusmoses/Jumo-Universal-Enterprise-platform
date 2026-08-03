/**
 * JUMO UEOS
 * National AI ERP Factory Manager
 */

import { enterpriseERPFactory } from "./EnterpriseERPFactory.js";
import { erpGenerationEngine } from "./ERPGenerationEngine.js";
import { erpRegistry } from "../../registry/ERPRegistry.js";
import { portalRegistry } from "../../registry/PortalRegistry.js";
import { moduleRegistry } from "../../registry/ModuleRegistry.js";
import { formRegistry } from "../../registry/formRegistry.js";
import { workflowRegistry } from "../../registry/workflowRegistry.js";
import { componentRegistry } from "../../registry/componentRegistry.js";
import { departmentRegistry } from "../../registry/departmentRegistry.js";
import { aiERPRegistry } from "../../registry/ai/AIERPRegistry.js";


export class ERPFactoryManager {

 constructor(){

   this.status="ONLINE";

   this.factories={};

   this.ai={
     enabled:true,
     engine:"UEOS AI Intelligence Runtime",
     capabilities:[
       "ERP generation",
       "architecture automation",
       "deployment orchestration",
       "digital enterprise modelling"
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

    return {
      ...instance,
      factory:"JUMO UEOS AI ERP Factory",
      managed:true,
      lifecycle:"GENERATED"
    };

  }


getGeneratedInstances(){

    return erpGenerationEngine.listGenerated();

}

listFactories(){

   return Object.keys(this.factories);

 }


 health(){

   return {

     runtime:"UEOS National AI ERP Factory Manager",

     status:this.status,

     factories:this.listFactories(),

     ai:this.ai

   };

 }

}


export const erpFactoryManager =
new ERPFactoryManager();
