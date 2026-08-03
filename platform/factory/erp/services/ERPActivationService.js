/**
 * JUMO UEOS
 * ERP Activation Service
 */

import { erpInstanceRegistry } from "../../../registry/ERPInstanceRegistry.js";
import { ERPDeploymentService } from "./ERPDeploymentService.js";

export class ERPActivationService {

 constructor(){
   this.deployer=new ERPDeploymentService();
 }

 activate(erp){

   const deployed=this.deployer.deploy(erp);

   erpInstanceRegistry.activate(
     erp.id
   );

   return {
     status:"ACTIVATED",
     instance:deployed
   };

 }

}

export const erpActivationService =
 new ERPActivationService();
