/**
 * JUMO UEOS
 * Unified ERP Registry Fabric
 */

import { erpRegistry } from "./ERPRegistry.js";
import { erpInstanceRegistry } from "./ERPInstanceRegistry.js";
import { portalRegistry } from "./PortalRegistry.js";
import { moduleRegistry } from "./ModuleRegistry.js";
import { formRegistry } from "./formRegistry.js";
import { workflowRegistry } from "./workflowRegistry.js";
import { componentRegistry } from "./componentRegistry.js";
import { departmentRegistry } from "./departmentRegistry.js";
import { aiERPRegistry } from "./ai/AIERPRegistry.js";

export class UEOSERPRegistryFabric {

  constructor(){

    this.status="ONLINE";

    this.registries={
      erp:erpRegistry,
      instances:erpInstanceRegistry,
      portals:portalRegistry,
      modules:moduleRegistry,
      forms:formRegistry,
      workflows:workflowRegistry,
      components:componentRegistry,
      departments:departmentRegistry,
      ai:aiERPRegistry
    };

  }


  registerERP(erp){

    return {
      erp:this.registries.erp.register(erp),
      instance:this.registries.instances.register(erp),
      portals:erp.portals?.length || 0,
      modules:erp.modules?.length || 0,
      forms:erp.forms?.length || 0,
      workflows:erp.workflows?.length || 0,
      components:erp.components?.length || 0,
      aiAgents:erp.aiAgents?.length || 0
    };

  }


  health(){

    return {
      fabric:"UEOS ERP Registry Fabric",
      status:this.status,
      registries:Object.keys(this.registries)
    };

  }


  snapshot(){

    return {
      erp:this.registries.erp.list(),
      instances:this.registries.instances.list(),
      status:"READY"
    };

  }

}


export const ueosERPRegistryFabric =
new UEOSERPRegistryFabric();
