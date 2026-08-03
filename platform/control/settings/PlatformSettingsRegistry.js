/**
 * JUMO UEOS
 * Platform Settings Registry
 */

export class PlatformSettingsRegistry {

 constructor(){
  this.platforms=[];
 }

 register(platform){

  const exists=this.platforms.find(
   p=>p.id===platform.id
  );

  if(exists){
   return exists;
  }

  this.platforms.push({
   ...platform,
   status:platform.status || "ACTIVE",
   createdAt:new Date().toISOString()
  });

  return platform;
 }


 list(){
  return this.platforms;
 }


 health(){
  return {
   registry:"UEOS Platform Settings Registry",
   platforms:this.platforms.length,
   status:"ONLINE"
  };
 }

}

export const platformSettingsRegistry =
new PlatformSettingsRegistry();
