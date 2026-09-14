/**
 * JUMO UEOS
 * Enterprise Application Registry
 */

export class ApplicationRegistry {

 constructor(){
  this.apps=[];
 }


 register(app){

  this.apps.push({

   id:app.id || `app-${Date.now()}`,

   name:app.name,

   domain:app.domain,

   modules:app.modules || [],

   version:app.version || "1.0",

   status:"ACTIVE"

  });

 }


 list(){

  return this.apps;

 }

}


export const applicationRegistry =
new ApplicationRegistry();
