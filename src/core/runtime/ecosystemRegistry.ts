import { db } from "../../database/db";
import { EnterpriseEcosystem } from "../../ueos/kernel/GovernanceEngine";
import { safeJSONParse } from "../../lib/json";
import { SecurityGovernor, SecurityAuthorizationRequest } from "../security/SecurityGovernor";
import { AuditSystem } from "../security/AuditSystem";

export class EcosystemRegistry {
  static getAll(): EnterpriseEcosystem[] {
    const records = db.select<any>("ecosystems");
    return records.map(r => {
      const config = safeJSONParse(r.config, {});
      return {
        ...r,
        supportedCountries: config.supportedCountries || [],
        institutionTypes: config.institutionTypes || [],
        templates: config.templates || [],
        modules: config.modules || [],
        permissions: config.permissions || []
      };
    });
  }

  static getById(id: string): EnterpriseEcosystem | null {
    const results = db.select<any>("ecosystems", r => r.id === id);
    if (results.length === 0) return null;
    const r = results[0];
    const config = safeJSONParse(r.config, {});
    return {
      ...r,
      supportedCountries: config.supportedCountries || [],
      institutionTypes: config.institutionTypes || [],
      templates: config.templates || [],
      modules: config.modules || [],
      permissions: config.permissions || []
    };
  }

  static register(ecosystem: EnterpriseEcosystem, signature: string): EnterpriseEcosystem {
    const authRequest: SecurityAuthorizationRequest = {
      requestIdentity: "ECOSYSTEM-REGISTRY",
      operatorIdentity: "SYSTEM",
      action: "REGISTER_ECOSYSTEM",
      affectedEntity: ecosystem.id,
      securityClassification: 'RESTRICTED',
      timestamp: Date.now()
    };

    if (!SecurityGovernor.verifySignature(signature, authRequest)) {
      AuditSystem.logAction({ action: "REGISTER_ECOSYSTEM", operator: "SYSTEM", target: ecosystem.id, timestamp: Date.now(), status: 'REJECTED' });
      throw new Error("UNAUTHORIZED: SecOps signature verification failed.");
    }

    AuditSystem.logAction({ action: "REGISTER_ECOSYSTEM", operator: "SYSTEM", target: ecosystem.id, timestamp: Date.now(), status: 'APPROVED' });
    SecurityGovernor.authorizeAction("SYSTEM", "REGISTER_ECOSYSTEM", 'RESTRICTED');

    const record = {
      id: ecosystem.id,
      name: ecosystem.name,
      version: ecosystem.version,
      category: ecosystem.category,
      description: ecosystem.description,
      governanceModel: ecosystem.governanceModel,
      status: ecosystem.status,
      config: JSON.stringify({
        supportedCountries: ecosystem.supportedCountries || [],
        institutionTypes: ecosystem.institutionTypes || [],
        templates: ecosystem.templates || [],
        modules: ecosystem.modules || [],
        permissions: ecosystem.permissions || []
      })
    };
    const exists = this.getById(ecosystem.id);
    if (exists) {
      db.update("ecosystems", e => e.id === ecosystem.id, () => record);
    } else {
      db.insert("ecosystems", record);
    }
    return ecosystem;
  }
}

export default EcosystemRegistry;
