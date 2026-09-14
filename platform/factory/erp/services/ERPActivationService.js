/**
 * JUMO UEOS
 * ERP Activation Service
 */

import { erpInstanceRegistry } from "../../../registry/ERPInstanceRegistry.js";
import { erpDeploymentService } from "./ERPDeploymentService.js";

export class ERPActivationService {

  activate(erp){

    const deployed = erpDeploymentService.deploy(erp);

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
