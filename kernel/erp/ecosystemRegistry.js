/**
 * JUMO UEOS
 * AI ERP Ecosystem Registry Adapter
 */

import { erpRegistry } from "../../platform/registry/ERPRegistry.js";

export class ERPSystemRegistry {

 constructor(){

   this.status="ONLINE";

   this.ai={
     enabled:true,
     engine:"UEOS AI Intelligence Runtime"
   };

 }


 getERP(id){

   return erpRegistry.get(id);

 }


 list(){

   return erpRegistry.list();

 }


 health(){

   return {

     registry:"UEOS AI ERP Ecosystem Registry",

     status:this.status,

     platforms:this.list().length,

     ai:this.ai

   };

 }

}


export const ecosystemRegistry =
new ERPSystemRegistry();


export { ERPSystemRegistry as EcosystemRegistry };

/**
 * UEOS AI Ecosystem Registry Compatibility Contract
 * Replaces legacy runtime ecosystem access.
 */

ERPSystemRegistry.prototype.getEcosystems = function () {
  return [
    {
      id: "education",
      name: "Education ERP Ecosystem",
      type: "domain",
      status: "ONLINE",
      factory: "UEOS AI ERP Factory"
    },
    {
      id: "government",
      name: "Government ERP Ecosystem",
      type: "domain",
      status: "ONLINE",
      factory: "UEOS AI ERP Factory"
    },
    {
      id: "finance",
      name: "Finance & Treasury Ecosystem",
      type: "domain",
      status: "ONLINE",
      factory: "UEOS AI ERP Factory"
    },
    {
      id: "healthcare",
      name: "Healthcare ERP Ecosystem",
      type: "domain",
      status: "ONLINE",
      factory: "UEOS AI ERP Factory"
    }
  ];
};

