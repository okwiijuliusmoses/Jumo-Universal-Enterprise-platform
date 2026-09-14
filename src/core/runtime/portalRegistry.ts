import { db } from "../../database/db";
import { safeJSONParse } from "../../lib/json";
import { SecurityGovernor, SecurityAuthorizationRequest } from "../security/SecurityGovernor";
import { AuditSystem } from "../security/AuditSystem";

export interface EnterprisePortal {
  id: string;
  name: string;
  description: string;
  roles: string[];
  navigation: any[];
}

export class PortalRegistry {
  static getAll(): EnterprisePortal[] {
    const records = db.select<any>("portals");
    return records.map(r => ({
      id: r.id,
      name: r.name,
      description: r.description,
      roles: safeJSONParse(r.roles, []),
      navigation: safeJSONParse(r.navigation, [])
    }));
  }

  static getById(id: string): EnterprisePortal | null {
    const results = db.select<any>("portals", r => r.id === id);
    if (results.length === 0) return null;
    const r = results[0];
    return {
      id: r.id,
      name: r.name,
      description: r.description,
      roles: safeJSONParse(r.roles, []),
      navigation: safeJSONParse(r.navigation, [])
    };
  }

  static register(portal: EnterprisePortal, signature: string): EnterprisePortal {
    const authRequest: SecurityAuthorizationRequest = {
      requestIdentity: "PORTAL-REGISTRY",
      operatorIdentity: "SYSTEM",
      action: "REGISTER_PORTAL",
      affectedEntity: portal.id,
      securityClassification: 'RESTRICTED',
      timestamp: Date.now()
    };

    if (!SecurityGovernor.verifySignature(signature, authRequest)) {
      AuditSystem.logAction({ action: "REGISTER_PORTAL", operator: "SYSTEM", target: portal.id, timestamp: Date.now(), status: 'REJECTED' });
      throw new Error("UNAUTHORIZED: SecOps signature verification failed.");
    }

    AuditSystem.logAction({ action: "REGISTER_PORTAL", operator: "SYSTEM", target: portal.id, timestamp: Date.now(), status: 'APPROVED' });
    SecurityGovernor.authorizeAction("SYSTEM", "REGISTER_PORTAL", 'RESTRICTED');

    const record = {
      id: portal.id,
      name: portal.name,
      description: portal.description,
      roles: JSON.stringify(portal.roles || []),
      navigation: JSON.stringify(portal.navigation || [])
    };
    const exists = this.getById(portal.id);
    if (exists) {
      db.update("portals", p => p.id === portal.id, () => record);
    } else {
      db.insert("portals", record);
    }
    return portal;
  }
}

export default PortalRegistry;
