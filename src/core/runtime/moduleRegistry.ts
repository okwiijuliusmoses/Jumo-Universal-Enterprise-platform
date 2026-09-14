import { db } from "../../database/db";
import { EnterpriseModule } from "../../ueos/kernel/GovernanceEngine";
import { safeJSONParse } from "../../lib/json";
import { SecurityGovernor, SecurityAuthorizationRequest } from "../security/SecurityGovernor";
import { AuditSystem } from "../security/AuditSystem";

export class ModuleRegistry {
  static getAll(): EnterpriseModule[] {
    const records = db.select<any>("modules");
    return records.map(r => ({
      id: r.id,
      name: r.name,
      category: r.category,
      ...safeJSONParse(r.config, {})
    }));
  }

  static getById(id: string): EnterpriseModule | null {
    const results = db.select<any>("modules", r => r.id === id);
    if (results.length === 0) return null;
    const r = results[0];
    return {
      id: r.id,
      name: r.name,
      category: r.category,
      ...safeJSONParse(r.config, {})
    };
  }

  static register(mod: EnterpriseModule, signature: string): EnterpriseModule {
    const authRequest: SecurityAuthorizationRequest = {
      requestIdentity: "MODULE-REGISTRY",
      operatorIdentity: "SYSTEM",
      action: "REGISTER_MODULE",
      affectedEntity: mod.id,
      securityClassification: 'RESTRICTED',
      timestamp: Date.now()
    };

    if (!SecurityGovernor.verifySignature(signature, authRequest)) {
      AuditSystem.logAction({ action: "REGISTER_MODULE", operator: "SYSTEM", target: mod.id, timestamp: Date.now(), status: 'REJECTED' });
      throw new Error("UNAUTHORIZED: SecOps signature verification failed.");
    }

    AuditSystem.logAction({ action: "REGISTER_MODULE", operator: "SYSTEM", target: mod.id, timestamp: Date.now(), status: 'APPROVED' });
    SecurityGovernor.authorizeAction("SYSTEM", "REGISTER_MODULE", 'RESTRICTED');

    const record = {
      id: mod.id,
      name: mod.name,
      category: mod.category,
      config: JSON.stringify({
        permissions: mod.permissions || [],
        workflows: mod.workflows || [],
        forms: mod.forms || [],
        reports: mod.reports || []
      })
    };
    const exists = this.getById(mod.id);
    if (exists) {
      db.update("modules", m => m.id === mod.id, () => record);
    } else {
      db.insert("modules", record);
    }
    return mod;
  }
}

export default ModuleRegistry;
