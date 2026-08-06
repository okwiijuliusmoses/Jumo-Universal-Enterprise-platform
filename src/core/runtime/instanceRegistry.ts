import { db } from "../../database/db";
import { EnterpriseInstance } from "../../ueos/kernel/GovernanceEngine";

export class ERPInstanceRegistry {
  static getAll(): EnterpriseInstance[] {
    const records = db.select<any>("instances");
    return records.map(r => ({
      ...r,
      ...JSON.parse(r.configuration)
    }));
  }

  static getById(id: string): EnterpriseInstance | null {
    const results = db.select<any>("instances", r => r.id === id);
    if (results.length === 0) return null;
    const r = results[0];
    return {
      ...r,
      ...JSON.parse(r.configuration)
    };
  }

  static register(instance: EnterpriseInstance): EnterpriseInstance {
    const record = {
      id: instance.id,
      name: instance.name,
      templateId: instance.templateId,
      ecosystemId: instance.ecosystemId,
      status: instance.status,
      configuration: JSON.stringify({
        profile: instance.profile,
        governance: instance.governance,
        modules: instance.modules,
        users: instance.users,
        tenantConfig: instance.tenantConfig
      }),
      createdAt: instance.createdAt
    };
    db.insert("instances", record);
    return instance;
  }
}

export default ERPInstanceRegistry;
