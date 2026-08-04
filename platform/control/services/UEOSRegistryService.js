/**
 * JUMO UEOS
 * Unified Enterprise Registry Service
 */

import { erpRegistry } from "../../registry/ERPRegistry.js";
import { portalRegistry } from "../../registry/PortalRegistry.js";
import { moduleRegistry } from "../../registry/ModuleRegistry.js";
import { formRegistry } from "../../registry/formRegistry.js";
import { workflowRegistry } from "../../registry/workflowRegistry.js";
import { componentRegistry } from "../../registry/componentRegistry.js";
import { departmentRegistry } from "../../registry/departmentRegistry.js";
import { aiERPRegistry } from "../../registry/ai/AIERPRegistry.js";
import { ERPTemplateCatalogue } from "../../factory/erp/ERPTemplateCatalogue.js";

export class UEOSRegistryService {

  health(){

    return {

      erp:{
        registered: erpRegistry.list().length,
        systems: erpRegistry.list()
      },

      templates:{
        total: ERPTemplateCatalogue.length,
        catalog: ERPTemplateCatalogue
      },

      portals:{
        total: portalRegistry.list().length
      },

      modules:{
        total: moduleRegistry.list().length
      },

      forms:{
        total: formRegistry.list().length
      },

      workflows:{
        total: workflowRegistry.list().length
      },

      components:{
        total: componentRegistry.list().length
      },

      departments:{
        total: departmentRegistry.list().length
      },

      ai:{
        total: aiERPRegistry.list().length
      }

    };

  }

}

export const ueosRegistryService =
new UEOSRegistryService();
