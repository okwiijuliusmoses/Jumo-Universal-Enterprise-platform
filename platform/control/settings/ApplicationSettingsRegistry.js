/**
 * JUMO UEOS
 * Application Settings Registry
 */

export class ApplicationSettingsRegistry {

 constructor(){
  this.applications=[];
 }


 register(application){

  const exists=this.applications.find(
   a=>a.id===application.id
  );

  if(exists){
   return exists;
  }

  this.applications.push({
   ...application,
   status:"ACTIVE"
  });

  return application;
 }


 list(){
  return this.applications;
 }


 health(){

  return {
   registry:"UEOS Application Settings Registry",
   applications:this.applications.length,
   status:"ONLINE"
  };

 }

}

export const applicationSettingsRegistry =
new ApplicationSettingsRegistry();
