/**
 * JUMO UEOS ERP Instance Registry
 *
 * Stores manufactured ERP instances.
 *
 * Instances are created by Universal ERP Factory.
 * Runtime systems consume instances dynamically.
 */

import { ERPInstance } from "./universalERPFactory";


const instances: ERPInstance[] = [];


export class ERPInstanceRegistry {


static register(
instance: ERPInstance
){

const exists =
instances.find(
item =>
item.instanceId === instance.instanceId
);


if(!exists){

instances.push(instance);

}


return instance;

}



static getAll(){

return instances;

}



static getById(
instanceId:string
){

return instances.find(
instance =>
instance.instanceId === instanceId
);

}



static getByInstitution(
institutionId:string
){

return instances.filter(
instance =>
instance.institution.institutionId === institutionId
);

}



static activate(
instanceId:string
){

const instance =
this.getById(instanceId);


if(instance){

instance.status="ACTIVE";

}


return instance;

}



static suspend(
instanceId:string
){

const instance =
this.getById(instanceId);


if(instance){

instance.status="SUSPENDED";

}


return instance;

}



static remove(
instanceId:string
){

const index =
instances.findIndex(
instance =>
instance.instanceId === instanceId
);


if(index >= 0){

return instances.splice(index,1)[0];

}


return undefined;

}


}


export default ERPInstanceRegistry;
