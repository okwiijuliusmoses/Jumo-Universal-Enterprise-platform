/**
 * JUMO UEOS
 * Enterprise Module Registry
 */

export class ModuleRegistry {

 constructor(){
  this.modules=[];
 }


 register(module){

  this.modules.push({

   id:module.id || `module-${Date.now()}`,

   name:module.name,

   domain:module.domain,

   components:module.components || [],

   workflows:module.workflows || [],

   aiCapabilities:
    module.aiCapabilities || [],

   status:"ACTIVE"

  });

 }


 list(){

  return this.modules;

 }

}


export const moduleRegistry =
new ModuleRegistry();
