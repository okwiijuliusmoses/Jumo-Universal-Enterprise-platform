/**
 * JUMO UEOS Universal ERP Factory Engine
 *
 * Generic enterprise manufacturing engine.
 *
 * It does not know University, Hospitality,
 * Finance, Diocese or Clan logic.
 *
 * It reads approved templates and provisions
 * configurable ERP instances.
 */

import ERPTemplateRegistry from "./erpTemplateRegistry";
import EcosystemRegistry from "./ecosystemRegistry";


export interface InstitutionProfile {

  institutionId: string;

  institutionName: string;

  country?: string;

  region?: string;

  operator?: string;

}


export interface ERPInstanceConfiguration {

  portals: string[];

  departments: string[];

  modules: string[];

  workflows: string[];

  forms: string[];

  components: string[];

  aiProfile: string;

}


export interface ERPInstance {

  instanceId: string;

  templateId: string;

  ecosystemId: string;

  institution: InstitutionProfile;

  configuration: ERPInstanceConfiguration;

  status: "ACTIVE" | "SUSPENDED";

  createdAt: string;

}



const instances: ERPInstance[] = [];



export class UniversalERPFactory {


static manufacture(
templateId:string,
institution:InstitutionProfile
):ERPInstance {


const template =
ERPTemplateRegistry.getById(templateId);



if(!template){

throw new Error(
`ERP template not approved: ${templateId}`
);

}



const ecosystem =
EcosystemRegistry.getById(
template.ecosystemId
);



if(!ecosystem){

throw new Error(
`Ecosystem unavailable: ${template.ecosystemId}`
);

}



if(
!ecosystem.approvedTemplates.includes(templateId)
){

throw new Error(
"Template is not approved under ecosystem"
);

}



const instance:ERPInstance = {


instanceId:
`${templateId}-${Date.now()}`,


templateId,


ecosystemId:
template.ecosystemId,


institution,


configuration:{


portals:
[...template.portals],


departments:
[...template.departments],


modules:
[...template.modules],


workflows:
[...template.workflows],


forms:
[...template.forms],


components:
[...template.components],


aiProfile:
template.aiProfile


},


status:"ACTIVE",


createdAt:
new Date().toISOString()


};



instances.push(instance);



return instance;


}



static getInstances(){

return instances;

}



static getInstance(id:string){

return instances.find(
instance=>instance.instanceId===id
);

}



static suspend(id:string){

const instance =
this.getInstance(id);


if(instance){

instance.status="SUSPENDED";

}


return instance;

}



static activate(id:string){

const instance =
this.getInstance(id);


if(instance){

instance.status="ACTIVE";

}


return instance;

}


}


export default UniversalERPFactory;
