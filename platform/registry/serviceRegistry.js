/**
 * JUMO UEOS
 * Digital Service Registry
 */

export class ServiceRegistry {

 constructor(){
  this.services=[];
 }


 register(service){

  this.services.push({

   id:service.id || `service-${Date.now()}`,

   name:service.name,

   category:service.category,

   provider:service.provider,

   workflow:service.workflow || null,

   api:service.api || null,

   status:"ACTIVE"

  });

 }


 find(id){

  return this.services.find(
   s=>s.id===id
  );

 }


 list(){

  return this.services;

 }

}


export const serviceRegistry =
new ServiceRegistry();
