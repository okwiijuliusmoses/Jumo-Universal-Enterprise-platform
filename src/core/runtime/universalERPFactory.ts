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
  static manufacture(templateId: string, config: { name: string; country: string; region: string; operator: string }): EnterpriseInstance {
    const template = ERPTemplateRegistry.getById(templateId);
    if (!template) {
      throw new Error(`Manufacturing failure: Template blueprint '${templateId}' not found in registry.`);
    }

    // Use the sophisticated ERPFactoryEngine to manufacture the platform
    const bundle = ERPFactoryEngine.manufacturePlatform({
      institutionName: config.name,
      institutionType: template.ecosystemId as any,
      country: config.country,
      region: config.region,
      branchCount: 4
    });
    
    // Register all platform components
    bundle.modules.forEach(mod => ModuleRegistry.register(mod as any, "JUMO-VALID-SIG-2026"));
    bundle.portalSuite.portals.forEach(portal => PortalRegistry.register(portal as any, "JUMO-VALID-SIG-2026"));
    bundle.workflows.forEach(wf => WorkflowRegistry.register(wf as any, "JUMO-VALID-SIG-2026"));

    return ERPInstanceRegistry.register(bundle.instance);
  }

  static manufactureFromBlueprintInput(input: any): EnterpriseInstance {
    // This uses the more sophisticated AI-driven factory engine
    const bundle = ERPFactoryEngine.manufacturePlatform({
      institutionName: input.name,
      institutionType: (input.sector || "enterprise") as any,
      country: input.country,
      region: input.region,
      branchCount: 1
    });
    
    // Register all platform components
    bundle.modules.forEach(mod => ModuleRegistry.register(mod as any, "JUMO-VALID-SIG-2026"));
    bundle.portalSuite.portals.forEach(portal => PortalRegistry.register(portal as any, "JUMO-VALID-SIG-2026"));
    bundle.workflows.forEach(wf => WorkflowRegistry.register(wf as any, "JUMO-VALID-SIG-2026"));
    
    return ERPInstanceRegistry.register(bundle.instance);
  }
}

export default UniversalERPFactory;
