/**
 * JUMO UEOS
 * Enterprise ERP Instance Registry
 */

export class ERPInstanceRegistry {

 constructor(){
   this.status="ONLINE";
   this.instances=[];
 }

 register(instance){

   const exists=this.instances.find(
     i=>i.id===instance.id
   );

   if(exists){
     return exists;
   }

   this.instances.push({
     ...instance,
     status: instance.status || "ACTIVE",
     lifecycle:"INSTALLED",
     deployedAt:new Date().toISOString()
   });

   return instance;
 }

 get(id){
   return this.instances.find(
     i=>i.id===id
   );
 }

 list(){
   return this.instances;
 }

 activate(id){
   const item=this.get(id);

   if(item){
     item.status="ACTIVE";
     item.lifecycle="RUNNING";
   }

   return item;
 }

 suspend(id){
   const item=this.get(id);

   if(item){
     item.status="SUSPENDED";
     item.lifecycle="SUSPENDED";
   }

   return item;
 }

 restore(id){
   const item=this.get(id);

   if(item){
     item.status="ACTIVE";
     item.lifecycle="RESTORED";
   }

   return item;
 }

 health(){

   return {
     registry:"UEOS ERP Instance Registry",
     status:this.status,
     instances:this.instances.length,
     active:this.instances.filter(
       i=>i.status==="ACTIVE"
     ).length
   };

 }

}

export const erpInstanceRegistry =
 new ERPInstanceRegistry();

// Controlled hydration lifecycle
export async function hydrateERPInstances(){
  const { restoreAllRegistries } = await import("../control/registry/RegistryBootstrap.js");
  return restoreAllRegistries();
}
