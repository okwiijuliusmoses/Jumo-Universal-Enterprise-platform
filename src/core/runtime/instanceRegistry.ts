import { db } from "../../database/db";
import { EnterpriseInstance } from "../../ueos/kernel/GovernanceEngine";

export class ERPInstanceRegistry {
  static getAll(): EnterpriseInstance[] {
    const records = db.select<any>("instances");
    return records.map(r => {
      let parsedConfig = {};
      try {
        parsedConfig = typeof r.configuration === "string" ? JSON.parse(r.configuration) : (r.configuration || {});
      } catch (_) {
        parsedConfig = {};
      }
      return {
        ...r,
        ...parsedConfig
      };
    });
  }

  static getById(id: string): EnterpriseInstance | null {
    const results = db.select<any>("instances", r => r.id === id);
    if (results.length === 0) return null;
    const r = results[0];
    let parsedConfig = {};
    try {
      parsedConfig = typeof r.configuration === "string" ? JSON.parse(r.configuration) : (r.configuration || {});
    } catch (_) {
      parsedConfig = {};
    }
    return {
      ...r,
      ...parsedConfig
    };
  }

  static register(instance: EnterpriseInstance): EnterpriseInstance {
    const record = {
      id: instance.id,
      name: instance.name,
      templateId: instance.templateId,
      ecosystemId: instance.ecosystemId,
      status: instance.status || "Active",
      configuration: JSON.stringify({
        profile: instance.profile,
        governance: instance.governance,
        modules: instance.modules,
        users: instance.users,
        tenantConfig: instance.tenantConfig
      }),
      createdAt: instance.createdAt || new Date().toISOString()
    };
    db.insert("instances", record);
    return instance;
  }

  static updateStatus(id: string, status: string): EnterpriseInstance | null {
    const exists = db.select<any>("instances", (r: any) => r.id === id);
    if (exists.length === 0) return null;

    db.update("instances", (r: any) => r.id === id, (item: any) => ({
      ...item,
      status
    }));

    return this.getById(id);
  }

  static delete(id: string): boolean {
    const exists = db.select<any>("instances", (r: any) => r.id === id);
    if (exists.length === 0) return false;

    db.delete("instances", (r: any) => r.id === id);
    return true;
  }
}

export default ERPInstanceRegistry;
