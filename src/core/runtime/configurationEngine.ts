/**
 * JUMO UEOS Configuration Engine
 *
 * Runtime configuration resolver.
 *
 * The UI and services consume generated configuration,
 * never hardcoded ERP-specific conditions.
 */

import ERPInstanceRegistry from "./instanceRegistry";


export interface RuntimeNavigationItem {

  id:string;

  name:string;

  type:
  "PORTAL" |
  "MODULE" |
  "DEPARTMENT" |
  "WORKFLOW" |
  "SERVICE";

}


export interface RuntimeConfiguration {


  instanceId:string;

  navigation:RuntimeNavigationItem[];

  portals:string[];

  departments:string[];

  modules:string[];

  workflows:string[];

  forms:string[];

  components:string[];

  aiProfile:string;


}



export class ConfigurationEngine {



static loadInstanceConfiguration(
instanceId:string
):RuntimeConfiguration {


const instance =
ERPInstanceRegistry.getById(
instanceId
);



if(!instance){

throw new Error(
`ERP instance not found: ${instanceId}`
);

}



const navigation:RuntimeNavigationItem[] = [];



instance.configuration.portals.forEach(
portal => {

navigation.push({

id:
portal.toLowerCase()
.replace(/\s+/g,"-"),

name:portal,

type:"PORTAL"

});

});



instance.configuration.modules.forEach(
module => {

navigation.push({

id:
module.toLowerCase()
.replace(/\s+/g,"-"),

name:module,

type:"MODULE"

});

});



instance.configuration.departments.forEach(
department => {

navigation.push({

id:
department.toLowerCase()
.replace(/\s+/g,"-"),

name:department,

type:"DEPARTMENT"

});

});



instance.configuration.workflows.forEach(
workflow => {

navigation.push({

id:
workflow.toLowerCase()
.replace(/\s+/g,"-"),

name:workflow,

type:"WORKFLOW"

});

});





return {


instanceId,


navigation,


portals:
instance.configuration.portals,


departments:
instance.configuration.departments,


modules:
instance.configuration.modules,


workflows:
instance.configuration.workflows,


forms:
instance.configuration.forms,


components:
instance.configuration.components,


aiProfile:
instance.configuration.aiProfile


};



}



static validateConfiguration(
configuration:RuntimeConfiguration
){

return Boolean(

configuration.instanceId &&

configuration.modules.length &&

configuration.navigation.length

);

}



}



export default ConfigurationEngine;
