/**
 * JUMO UEOS
 * AI ERP Experience Gateway
 *
 * Replaces legacy ERPRuntimeEngine
 */

import { erpFactoryManager } from "../../platform/factory/erp/ERPFactoryManager.js";
import { erpRegistry } from "../../platform/registry/ERPRegistry.js";


export const erpRuntime = {

 status:"ONLINE",

 ai:{
   enabled:true,
   engine:"UEOS AI Intelligence Runtime"
 },


 list(){

   return erpRegistry.list();

 },


 discover(requirement){

   return erpFactoryManager.generate(requirement);

 },


 create(template){

   return erpFactoryManager.create(template);

 },


 health(){

   return {

    runtime:"UEOS AI ERP Experience Gateway",

    status:this.status,

    registry:erpRegistry.health(),

    factory:erpFactoryManager.health(),

    ai:this.ai

   };

 }

};


export default erpRuntime;
