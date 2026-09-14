/**
 * JUMO UEOS
 * Commercial Platform Registry
 */

export class CommercialPlatformRegistry {

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
   status:"ACTIVE"
  });

  return platform;
 }

 list(){
  return this.platforms;
 }

 health(){
  return {
   registry:"UEOS Commercial Platform Registry",
   platforms:this.platforms.length,
   status:"ONLINE"
  };
 }

}

export const commercialPlatformRegistry =
new CommercialPlatformRegistry();
