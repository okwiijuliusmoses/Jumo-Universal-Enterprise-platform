import { db } from "../../database/db";
import { safeJSONParse } from "../../lib/json";

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

  static register(portal: EnterprisePortal): EnterprisePortal {
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
