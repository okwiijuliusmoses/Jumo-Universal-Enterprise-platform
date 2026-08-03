/**
 * JUMO UEOS
 * AI ERP Generation Engine
 *
 * National Digital Enterprise Platform
 * Registry-driven ERP ecosystem generation runtime
 */

import { ERPBlueprintRegistry } from "./ERPBlueprintRegistry.js";

import { portalGenerator } from "./generators/PortalGenerator.js";
import { moduleGenerator } from "./generators/ModuleGenerator.js";
import { formGenerator } from "./generators/FormGenerator.js";
import { workflowGenerator } from "./generators/WorkflowGenerator.js";
import { componentGenerator } from "./generators/ComponentGenerator.js";
import { departmentGenerator } from "./generators/DepartmentGenerator.js";
import { aiAgentGenerator } from "./generators/AIAgentGenerator.js";

import { capabilityRegistry } from "../../registry/CapabilityRegistry.js";

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
      ERPBlueprintRegistry.getBlueprint(
        directive.blueprintId
      );

    if(!blueprint){
      throw new Error(
        `ERP Blueprint not found: ${directive.blueprintId}`
      );
    }


    const generationContext = {
      ...blueprint,
      capabilities:
        capabilityRegistry.list(),

      tenant:
        directive.tenant || null,

      configuration:
        directive.configuration || {}
    };


    const instance = {

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

      configuration:
        directive.configuration || {},

      portals:
        portalGenerator.generate(
          generationContext
        ),

      modules:
        moduleGenerator.generate(
          generationContext
        ),

      forms:
        formGenerator.generate(
          generationContext
        ),

      workflows:
        workflowGenerator.generate(
          generationContext
        ),

      components:
        componentGenerator.generate(
          generationContext
        ),

      departments:
        departmentGenerator.generate(
          generationContext
        ),

      aiAgents:
        aiAgentGenerator.generate(
          generationContext
        ),

      status:"GENERATED",

      createdAt:
        new Date().toISOString()
    };


    this.generatedInstances.push(instance);

    return instance;
  }


  listGenerated(){
    return this.generatedInstances;
  }


  health(){

    return {
      engine:
        "JUMO AI ERP Generation Engine",

      status:
        this.status,

      generated:
        this.generatedInstances.length,

      ai:
        this.ai
    };

  }

}


export const erpGenerationEngine =
  new ERPGenerationEngine();
