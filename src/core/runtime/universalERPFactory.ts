import { ERPInstanceRegistry } from "./instanceRegistry";
import { ERPTemplateRegistry } from "./erpTemplateRegistry";
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

    const instanceId = `inst-${template.ecosystemId.toLowerCase()}-${config.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Math.floor(Math.random() * 10000)}`;

    // Generate enriched institution metadata & governance hierarchy
    const institutionMetadata = InstitutionGenerator.generate(
      config.name,
      config.country,
      config.region,
      template.governance
    );

    // Deep copy directorates and portals from the blueprint
    const directorates = template.directorates ? JSON.parse(JSON.stringify(template.directorates)) : [];
    const portals = template.portals ? JSON.parse(JSON.stringify(template.portals)) : [];

    // Ensure IDs are unique for this instance
    directorates.forEach((d: any) => {
      d.institutionId = instanceId;
      d.id = `${instanceId}-${d.id}`;
      d.departments?.forEach((dept: any) => {
        dept.id = `${instanceId}-${dept.id}`;
        dept.directorateId = d.id;
      });
    });

    portals.forEach((p: any) => {
      p.id = `${instanceId}-${p.id}`;
      // Add default navigation if missing
      if (!p.navigation) {
        p.navigation = [
          { title: "Dashboard", icon: "Layout", path: "/dashboard" },
          { title: "My Workspace", icon: "Briefcase", path: "/workspace" },
          { title: "Reports", icon: "FileText", path: "/reports" }
        ];
      }
    });

    const instance: EnterpriseInstance = {
      id: instanceId,
      instanceId: instanceId,
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
      institution: {
        institutionId: instanceId,
        institutionName: config.name,
        country: config.country,
        region: config.region,
        operator: config.operator
      },
      governance: institutionMetadata.governanceTree,
      directorates: directorates,
      portals: portals,
      modules: template.modules || template.availableModules.map(m => m.id),
      apps: template.apps || [],
      services: template.services || [],
      workflows: template.workflows || [],
      users: [
        { id: `admin-${instanceId}`, name: "Sovereign Administrator", role: "ADMINISTRATOR" },
        { id: `governance-${instanceId}`, name: `${template.governance.title} Authority`, role: "GOVERNANCE_HEAD" }
      ],
      status: "Operational",
      tenantConfig: {
        portals: portals,
        workflows: template.workflows,
        reports: template.reports,
        branchHierarchy: institutionMetadata.branchHierarchy,
        domainEndpoint: institutionMetadata.domainEndpoint
      },
      configuration: {
        governanceStructure: institutionMetadata.governanceTree,
        publicExperience: template.publicExperience || { theme: "light", landing: "default" },
        securityProfile: template.securityProfile || { level: "Standard Sovereign", segregation: "Physical" }
      },
      createdAt: new Date().toISOString()
    };

    return ERPInstanceRegistry.register(instance);
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
    
    return ERPInstanceRegistry.register(bundle.instance);
  }
}

export default UniversalERPFactory;
