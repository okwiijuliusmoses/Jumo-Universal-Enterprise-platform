import { db } from "../../database/db";
import { EnterpriseTemplate, GovernanceNode } from "../../ueos/kernel/GovernanceEngine";
import { SecurityGovernor, SecurityAuthorizationRequest } from "../security/SecurityGovernor";
import { AuditSystem } from "../security/AuditSystem";

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

  static register(template: EnterpriseTemplate, signature: string): EnterpriseTemplate {
    const authRequest: SecurityAuthorizationRequest = {
      requestIdentity: "TEMPLATE-REGISTRY",
      operatorIdentity: "SYSTEM",
      action: "REGISTER_TEMPLATE",
      affectedEntity: template.id,
      securityClassification: 'RESTRICTED',
      timestamp: Date.now()
    };

    if (!SecurityGovernor.verifySignature(signature, authRequest)) {
      AuditSystem.logAction({ action: "REGISTER_TEMPLATE", operator: "SYSTEM", target: template.id, timestamp: Date.now(), status: 'REJECTED' });
      throw new Error("UNAUTHORIZED: SecOps signature verification failed.");
    }

    AuditSystem.logAction({ action: "REGISTER_TEMPLATE", operator: "SYSTEM", target: template.id, timestamp: Date.now(), status: 'APPROVED' });
    SecurityGovernor.authorizeAction("SYSTEM", "REGISTER_TEMPLATE", 'RESTRICTED');

    const record = {
      id: template.id,
      name: template.name,
      ecosystemId: template.ecosystemId,
      description: template.description,
      version: template.version,
      status: template.status,
      blueprint: JSON.stringify({
        governance: template.governance,
        directorates: template.directorates,
        portals: template.portals,
        availableModules: template.availableModules,
        workflows: template.workflows,
        reports: template.reports,
        integrations: template.integrations
      })
    };
    const exists = this.getById(template.id);
    if (exists) {
      db.update("templates", t => t.id === template.id, () => record);
    } else {
      db.insert("templates", record);
    }
    return template;
  }
}

export default ERPTemplateRegistry;
