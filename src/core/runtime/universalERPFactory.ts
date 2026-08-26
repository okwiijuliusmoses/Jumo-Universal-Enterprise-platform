import { ERPInstanceRegistry } from "./instanceRegistry";
import { ERPTemplateRegistry } from "./erpTemplateRegistry";
import { ModuleRegistry } from "./moduleRegistry";
import { PortalRegistry } from "./portalRegistry";
import { WorkflowRegistry } from "./workflowRegistry";
import { EnterpriseInstance } from "../../ueos/kernel/GovernanceEngine";

export type ERPInstance = EnterpriseInstance;

export class UniversalERPFactory {
  static manufacture(templateId: string, config: any, signature: string): EnterpriseInstance {
    const template = ERPTemplateRegistry.getById(templateId);
    if (!template) {
      throw new Error(`Provisioning failure: Template blueprint '${templateId}' not found in registry.`);
    }

    const instance: EnterpriseInstance = {
      id: `inst-${templateId}-${Date.now()}`,
      instanceId: `inst-${templateId}-${Date.now()}`,
      name: config.name || "Sovereign Enterprise Platform",
      templateId: templateId,
      templateName: template.name || templateId,
      ecosystemId: template.ecosystemId || "ERP_ECOSYSTEM",
      profile: {
        country: config.country || "UGANDA",
        region: config.region || "Central",
        operator: "SOVEREIGN_ADMIN"
      },
      institution: {
        institutionId: `INST-${Date.now()}`,
        institutionName: config.name || "Sovereign Enterprise Platform",
        country: config.country || "UGANDA",
        region: config.region || "Central",
        operator: "SOVEREIGN_ADMIN"
      },
      governance: {
        id: "GOV-NODE-01",
        title: "Executive Council",
        role: "GOVERNANCE"
      },
      modules: [],
      users: [],
      status: "Operational",
      tenantConfig: {},
      createdAt: new Date().toISOString()
    };

    return ERPInstanceRegistry.register(instance);
  }

  static manufactureFromBlueprintInput(input: any, signature: string): EnterpriseInstance {
    const instance: EnterpriseInstance = {
      id: `inst-blueprint-${Date.now()}`,
      instanceId: `inst-blueprint-${Date.now()}`,
      name: input.name || "Sovereign Blueprint Platform",
      templateId: "tpl-blueprint",
      templateName: "Blueprint Template",
      ecosystemId: input.sector || "ERP_ECOSYSTEM",
      profile: {
        country: input.country || "UGANDA",
        region: input.region || "Central",
        operator: "SOVEREIGN_ADMIN"
      },
      institution: {
        institutionId: `INST-${Date.now()}`,
        institutionName: input.name || "Sovereign Blueprint Platform",
        country: input.country || "UGANDA",
        region: input.region || "Central",
        operator: "SOVEREIGN_ADMIN"
      },
      governance: {
        id: "GOV-NODE-01",
        title: "Executive Council",
        role: "GOVERNANCE"
      },
      modules: [],
      users: [],
      status: "Operational",
      tenantConfig: {},
      createdAt: new Date().toISOString()
    };

    return ERPInstanceRegistry.register(instance);
  }
}

export default UniversalERPFactory;
