/**
 * JUMO UEOS
 * Universal Portal Registry
 */

export class PortalRegistry {

 constructor(){
  this.portals=[];
 }


 register(portal){

  this.portals.push({

   id:portal.id || `portal-${Date.now()}`,

   name:portal.name,

   owner:portal.owner,

   modules:portal.modules || [],

   workflows:portal.workflows || [],

   status:"ACTIVE"

  });

 }


 list(){

  return this.portals;

 }

}


export const portalRegistry =
new PortalRegistry();
