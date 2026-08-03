/**
 * JUMO UEOS
 * ERP Ecosystem Deployment Manager
 */

import { ERPBlueprintRegistry } from "./ERPBlueprintRegistry.js";
import { erpFactoryManager } from "./ERPFactoryManager.js";
import { erpDeploymentService } from "./services/ERPDeploymentService.js";
import { erpInstallationManager } from "./ERPInstallationManager.js";

export class ERPEcosystemDeploymentManager {

  deployBlueprints(ids){

    const results = [];

    ids.forEach(id => {

      const blueprint =
        ERPBlueprintRegistry.blueprints.find(
          b => b.id === id
        );

      if(!blueprint){
        throw new Error(
          "ERP Blueprint not found: " + id
        );
      }

      const generated =
        erpFactoryManager.generateERP({
          blueprintId: blueprint.id,
          instanceId:
            `${blueprint.id}-${Date.now()}`,
          tenant:
            `${blueprint.id}-tenant`,
          configuration:{
            scope:
              blueprint.configurableScope
          }
        });

      const deployed =
        erpDeploymentService.deploy(generated);

      const installed =
        erpInstallationManager.install(generated);

      results.push({
        blueprint: blueprint.id,
        erp: generated.id,
        status:
          installed.status || "INSTALLED",
          deployment: deployed,
          installation: installed
      });

    });

    return {
      ecosystem:"JUMO UEOS ERP Ecosystem",
      deployments:results,
      status:"COMPLETED"
    };

  }

}

export const erpEcosystemDeploymentManager =
  new ERPEcosystemDeploymentManager();
