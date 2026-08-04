/**
 * JUMO UEOS
 * Universal Enterprise Settings Registry
 */

export class UniversalSettingsRegistry {

 constructor(){

  this.status="ONLINE";

  this.settings={

   platform:{},
   applications:{},
   layers:{},
   modules:{},
   departments:{},
   servers:{},
   components:{},
   forms:{},
   workflows:{},
   commercialPlatforms:{},
   navigation:{},
   publicExperience:{},
   security:{},
   lifecycle:{},
   upgrades:{}

  };

 }


 register(category,key,value){

  if(!this.settings[category]){
   throw new Error(
    `Unknown settings category: ${category}`
   );
  }

  this.settings[category][key]={
   ...value,
   updatedAt:new Date().toISOString()
  };

  return this.settings[category][key];

 }


 get(category){

  return this.settings[category] || {};

 }


 list(){

  return this.settings;

 }


 health(){

  return {

   registry:
   "JUMO UEOS Universal Settings Registry",

   status:this.status,

   categories:
   Object.keys(this.settings)

  };

 }

}


export const universalSettingsRegistry =
new UniversalSettingsRegistry();
