/**
 * JUMO UEOS
 * ERP Deployment Registration Service
 */

import { erpRegistry } from "../../../registry/ERPRegistry.js";
import { portalRegistry } from "../../../registry/PortalRegistry.js";
import { moduleRegistry } from "../../../registry/ModuleRegistry.js";
import { formRegistry } from "../../../registry/formRegistry.js";
import { workflowRegistry } from "../../../registry/workflowRegistry.js";
import { componentRegistry } from "../../../registry/componentRegistry.js";
import { departmentRegistry } from "../../../registry/departmentRegistry.js";
import { aiERPRegistry } from "../../../registry/ai/AIERPRegistry.js";
import { erpInstanceRegistry } from "../../../registry/ERPInstanceRegistry.js";
import { erpDeploymentRegistry } from "../../../registry/ERPDeploymentRegistry.js";
import { saveAllRegistries } from "../../../control/registry/RegistryBootstrap.js";
import { ueosERPRegistryFabric } from "../../../registry/UEOSERPRegistryFabric.js";

export class ERPDeploymentService {

deploy(erp){

 const existing = erpInstanceRegistry.get(erp.id);

 if(existing){
    saveAllRegistries();

    return {
   deployed:false,
   existing:true,
      erp:erp.id,
      status:"DEPLOYED"
  };
 }

 erpRegistry.register(erp);
erpInstanceRegistry.register({
      ...erp,
      status:"ACTIVE",
      lifecycle:"RUNNING"
    });

 erp.portals.forEach((item,index)=>{
  portalRegistry.register({
   id:`${erp.id}-portal-${index}`,
   name:item,
   erpId:erp.id
  });
 });

 erp.modules.forEach((item,index)=>{
  moduleRegistry.register({
   id:`${erp.id}-module-${index}`,
   name:item,
   erpId:erp.id
  });
 });

 erp.forms.forEach((item,index)=>{
  formRegistry.register({
   id:`${erp.id}-form-${index}`,
   name:item,
   erpId:erp.id
  });
 });

 erp.workflows.forEach((item,index)=>{
  workflowRegistry.register({
   id:`${erp.id}-workflow-${index}`,
   name:item,
   erpId:erp.id
  });
 });

 erp.components.forEach((item,index)=>{
  componentRegistry.register({
   id:`${erp.id}-component-${index}`,
   name:item,
   erpId:erp.id
  });
 });

 erp.departments.forEach((item,index)=>{
  departmentRegistry.register({
   id:`${erp.id}-department-${index}`,
   name:item,
   erpId:erp.id
  });
 });

 aiERPRegistry.register(erp);

      ueosERPRegistryFabric.registerERP(erp);

    erpDeploymentRegistry.register(erp);

    erpDeploymentRegistry.register(erp);


 saveAllRegistries();

    saveAllRegistries();

    return {
      deployed:true,
      existing:false,
      erp:erp.id,
      status:"DEPLOYED"
 };

}

}

export const erpDeploymentService =
new ERPDeploymentService();