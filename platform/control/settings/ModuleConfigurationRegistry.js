/**
 * JUMO UEOS
 * Module Configuration Registry
 */

export class ModuleConfigurationRegistry {

 constructor(){
  this.modules=[];
 }

 register(module){

  const exists=this.modules.find(
   m=>m.id===module.id
  );

  if(exists){
   return exists;
  }

  this.modules.push({
   ...module,
   status:"ACTIVE"
  });

  return module;
 }

 list(){
  return this.modules;
 }

 health(){
  return {
   registry:"UEOS Module Configuration Registry",
   modules:this.modules.length,
   status:"ONLINE"
  };
 }

}

export const moduleConfigurationRegistry =
new ModuleConfigurationRegistry();
