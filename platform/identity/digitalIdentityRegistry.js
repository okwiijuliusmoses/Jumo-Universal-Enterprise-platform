/**
 * JUMO UEOS
 * Sovereign Digital Identity Layer
 */

export class DigitalIdentityRegistry {

 constructor(){

   this.identities=[];

 }


 createIdentity(identity){

   const record={

    id:`identity-${Date.now()}`,

    ...identity,

    status:"ACTIVE",

    createdAt:new Date().toISOString()

   };


   this.identities.push(record);

   return record;

 }


 verifyIdentity(id){

   return this.identities.find(
    i=>i.id===id
   );

 }


}


export const digitalIdentityRegistry =
new DigitalIdentityRegistry();
