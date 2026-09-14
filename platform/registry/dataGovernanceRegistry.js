/**
 * JUMO UEOS
 * Enterprise Data Governance Registry
 */

export class DataGovernanceRegistry {

 constructor(){
  this.datasets=[];
 }


 register(dataset){

  this.datasets.push({

   id:dataset.id || `data-${Date.now()}`,

   name:dataset.name,

   owner:dataset.owner,

   classification:
    dataset.classification || "INTERNAL",

   retention:
    dataset.retention || "STANDARD",

   accessPolicies:
    dataset.accessPolicies || [],

   status:"GOVERNED"

  });

 }


 list(){

  return this.datasets;

 }

}


export const dataGovernanceRegistry =
new DataGovernanceRegistry();
