/**
 * JUMO UEOS
 * Compliance & Regulation Registry
 */

export class ComplianceRegistry {

 constructor(){
  this.controls=[];
 }


 register(control){

  this.controls.push({

   id:control.id || `control-${Date.now()}`,

   framework:control.framework,

   requirement:control.requirement,

   evidence:[],

   status:"MONITORED"

  });

 }


 list(){

  return this.controls;

 }

}


export const complianceRegistry =
new ComplianceRegistry();
