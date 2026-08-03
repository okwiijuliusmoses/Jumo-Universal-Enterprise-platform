/**
 * JUMO UEOS
 * Enterprise Platform Generation Engine
 *
 * Generates complete Digital Enterprise Platforms
 * from ERP templates.
 */

import { EnterprisePlatformTemplateRegistry } from "./templates/EnterprisePlatformTemplateRegistry.js";

import { portalGenerator } from "./generators/PortalGenerator.js";
import { moduleGenerator } from "./generators/ModuleGenerator.js";
import { formGenerator } from "./generators/FormGenerator.js";
import { workflowGenerator } from "./generators/WorkflowGenerator.js";
import { componentGenerator } from "./generators/ComponentGenerator.js";
import { departmentGenerator } from "./generators/DepartmentGenerator.js";
import { aiAgentGenerator } from "./generators/AIAgentGenerator.js";
import { applicationGenerator } from "./generators/ApplicationGenerator.js";
import { informationManagementGenerator } from "./generators/InformationManagementGenerator.js";
import { requisitionGenerator } from "./generators/RequisitionGenerator.js";
import { navigationGenerator } from "./generators/NavigationGenerator.js";


export class ERPGenerationEngine {

  constructor(){

    this.status = "ONLINE";

    this.ai = {
      enabled:true,
      engine:"JUMO AI Enterprise Generation Runtime"
    };

    this.generatedInstances = [];

  }


  generateERP(directive){

    const blueprint =
      EnterprisePlatformTemplateRegistry.getTemplate(
        directive.blueprintId
      );


    if(!blueprint){

      throw new Error(
        `ERP Blueprint not found: ${directive.blueprintId}`
      );

    }


    const runtime = {

      id:
        directive.instanceId ||
        `${blueprint.id}-${Date.now()}`,


      name:
        directive.name ||
        blueprint.name,


      blueprintId:
        blueprint.id,


      category:
        blueprint.category,


      tenant:
        directive.tenant || null,


      metadata:
        blueprint.metadata || {},


      configuration:
        directive.configuration ||
        blueprint.configuration ||
        {},


      portals:
        portalGenerator.generate(blueprint.id),


      departments:
        departmentGenerator.generate(blueprint),


      modules:
        moduleGenerator.generate(blueprint.id),


      components:
        componentGenerator.generate(blueprint),


      forms:
        formGenerator.generate(blueprint),


      workflows:
        workflowGenerator.generate(blueprint),


      applications:
        applicationGenerator.generate(blueprint),


      informationSystems:
        informationManagementGenerator.generate(blueprint),


      requisitions:
        requisitionGenerator.generate(blueprint),


      navigation:
        navigationGenerator.generate(blueprint),


      aiAgents:
        aiAgentGenerator.generate(blueprint),


      runtimeContext:{

        generated:true,

        source:"ERP Template",

        status:"ONLINE"

      },


      lifecycle:"RUNNING",

      status:"ACTIVE"

    };


    this.generatedInstances.push(runtime);


    return runtime;

  }


}


export const erpGenerationEngine =
new ERPGenerationEngine();
