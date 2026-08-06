import { ERPInstanceRegistry } from "./instanceRegistry";
import { ERPTemplateRegistry } from "./erpTemplateRegistry";
import { EnterpriseInstance } from "../../ueos/kernel/GovernanceEngine";
import { ERPFactoryEngine } from "../factory/ERPFactoryEngine";

export type ERPInstance = EnterpriseInstance;

export class UniversalERPFactory {
  static manufacture(templateId: string, config: { name: string; country: string; region: string; operator: string }): EnterpriseInstance {
    const template = ERPTemplateRegistry.getById(templateId);
    if (!template) {
      throw new Error(`Manufacturing failure: Template blueprint '${templateId}' not found in registry.`);
    }

    const instanceId = `${template.ecosystemId.toLowerCase()}-${config.name.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(Math.random() * 1000)}`;

    const instance: EnterpriseInstance = {
      id: instanceId,
      name: config.name,
      templateId: template.id,
      templateName: template.name,
      ecosystemId: template.ecosystemId,
      profile: {
        country: config.country,
        region: config.region,
        operator: config.operator,
        institutionId: instanceId,
        institutionName: config.name
      },
      governance: template.governance,
      directorates: template.directorates ? JSON.parse(JSON.stringify(template.directorates)) : [],
      portals: template.portals ? JSON.parse(JSON.stringify(template.portals)) : [],
      modules: template.modules || template.availableModules.map(m => m.id),
      apps: template.apps || [],
      services: template.services || [],
      workflows: template.workflows || [],
      users: [
        { id: "admin-1", name: "System Administrator", role: "ADMINISTRATOR" }
      ],
      status: "Operational",
      tenantConfig: {
        portals: template.portals,
        workflows: template.workflows,
        reports: template.reports
      },
      configuration: {
        governanceStructure: template.governanceStructure,
        publicExperience: template.publicExperience,
        securityProfile: template.securityProfile
      },
      createdAt: new Date().toISOString()
    };

    return ERPInstanceRegistry.register(instance);
  }

  static manufactureFromBlueprintInput(input: any): EnterpriseInstance {
    const bundle = ERPFactoryEngine.manufacturePlatform(input);
    return bundle.instance;
  }
}

export default UniversalERPFactory;
