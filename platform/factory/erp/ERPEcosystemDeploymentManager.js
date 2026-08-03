/**
 * JUMO UEOS
 * ERP Ecosystem Deployment Manager
 *
 * National Digital Enterprise Platform
 * Blueprint-driven ERP ecosystem activation
 */

import { ERPBlueprintRegistry } from "./ERPBlueprintRegistry.js";
import { erpFactoryManager } from "./ERPFactoryManager.js";
import { erpDeploymentService } from "./services/ERPDeploymentService.js";
import { erpInstallationManager } from "./ERPInstallationManager.js";

export class ERPEcosystemDeploymentManager {

  deployBlueprints(ids = []) {

    const results = [];

    ids.forEach(id => {

      const blueprint =
        ERPBlueprintRegistry.blueprints.find(
          b => b.id === id
        );

      if (!blueprint) {
        throw new Error(
          "ERP Blueprint not found: " + id
        );
      }


      const definition = {

        blueprintId: blueprint.id,

        instanceId:
          `${blueprint.id}-${Date.now()}`,

        tenant:
          `${blueprint.id}-tenant`,

        domain:
          blueprint.category,

        capabilities:
          blueprint.capabilities || [],

        configurableScope:
          blueprint.configurableScope || [],

        generationRules:
          blueprint.generationRules || {},

        configuration: {

          scope:
            blueprint.configurableScope || []

        }

      };


      const generated =
        erpFactoryManager.generateERP(
          definition
        );


      const deployed =
        erpDeploymentService.deploy(
          generated
        );


      const installed =
        erpInstallationManager.install(
          generated
        );


      results.push({

        blueprint: blueprint.id,

        instance:
          generated.id,

        tenant:
          definition.tenant,

        status:
          installed.status || "INSTALLED",

        deployment:
          deployed,

        installation:
          installed

      });


    });


    return {

      ecosystem:
        "JUMO UEOS ERP Ecosystem",

      deployments:
        results,

      status:
        "COMPLETED",

      timestamp:
        new Date().toISOString()

    };

  }

}


export const erpEcosystemDeploymentManager =
  new ERPEcosystemDeploymentManager();
