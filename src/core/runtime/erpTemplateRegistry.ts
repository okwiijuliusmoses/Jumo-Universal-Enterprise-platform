import { db } from "../../database/db";
import { EnterpriseTemplate, GovernanceNode } from "../../ueos/kernel/GovernanceEngine";

export type ERPTemplateDefinition = EnterpriseTemplate;
export type { GovernanceNode };
export type PublicExperienceConfig = any;
export type PortalDefinition = any;

export class ERPTemplateRegistry {
  static getAll(): EnterpriseTemplate[] {
    const records = db.select<any>("templates");
    return records.map(r => ({
      ...r,
      ...JSON.parse(r.blueprint)
    }));
  }

  static getById(id: string): EnterpriseTemplate | null {
    const results = db.select<any>("templates", r => r.id === id);
    if (results.length === 0) return null;
    const r = results[0];
    return {
      ...r,
      ...JSON.parse(r.blueprint)
    };
  }

  static register(template: EnterpriseTemplate): EnterpriseTemplate {
    const record = {
      id: template.id,
      name: template.name,
      ecosystemId: template.ecosystemId,
      description: template.description,
      version: template.version,
      status: template.status,
      blueprint: JSON.stringify({
        governance: template.governance,
        portals: template.portals,
        availableModules: template.availableModules,
        workflows: template.workflows,
        reports: template.reports,
        integrations: template.integrations
      })
    };
    db.insert("templates", record);
    return template;
  }
}

export default ERPTemplateRegistry;
