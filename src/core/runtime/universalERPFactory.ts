import { ERPInstanceRegistry } from "./instanceRegistry";
import { ERPTemplateRegistry } from "./erpTemplateRegistry";
import { ModuleRegistry } from "./moduleRegistry";
import { PortalRegistry } from "./portalRegistry";
import { WorkflowRegistry } from "./workflowRegistry";
import { EnterpriseInstance, GovernanceNode } from "../../ueos/kernel/GovernanceEngine";
import { ERPFactoryEngine } from "../factory/ERPFactoryEngine";
import { InstitutionGenerator } from "../factory/InstitutionGenerator";

export type ERPInstance = EnterpriseInstance;

export class UniversalERPFactory {
  static manufacture(templateId: string, config: any, signature: string): EnterpriseInstance {
    const template = ERPTemplateRegistry.getById(templateId);
    if (!template) {
      throw new Error(`Manufacturing failure: Template blueprint '${templateId}' not found in registry.`);
    }

    // Use the sophisticated ERPFactoryEngine to manufacture the platform
    const bundle = ERPFactoryEngine.manufacturePlatform({
      institutionName: config.name,
      institutionType: template.ecosystemId as any,
      ...config
    });
    
    // Register all platform components
    bundle.modules.forEach(mod => ModuleRegistry.register(mod as any, signature));
    bundle.portalSuite.portals.forEach((portal: unknown) => PortalRegistry.register(portal as any, signature));
    bundle.workflows.forEach(wf => WorkflowRegistry.register(wf as any, signature));

    return ERPInstanceRegistry.register(bundle.instance);
  }

  static manufactureFromBlueprintInput(input: any, signature: string): EnterpriseInstance {
    // This uses the more sophisticated AI-driven factory engine
    const bundle = ERPFactoryEngine.manufacturePlatform({
      institutionName: input.name,
      institutionType: (input.sector || "enterprise") as any,
      country: input.country,
      region: input.region,
      branchCount: 1
    });
    
    // Register all platform components
    bundle.modules.forEach(mod => ModuleRegistry.register(mod as any, signature));
    bundle.portalSuite.portals.forEach((portal: unknown) => PortalRegistry.register(portal as any, signature));
    bundle.workflows.forEach(wf => WorkflowRegistry.register(wf as any, signature));
    
    return ERPInstanceRegistry.register(bundle.instance);
  }
}

export default UniversalERPFactory;
