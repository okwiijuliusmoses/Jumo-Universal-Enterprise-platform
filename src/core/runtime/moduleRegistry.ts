import { db } from "../../database/db";
import { EnterpriseModule } from "../../ueos/kernel/GovernanceEngine";

export class ModuleRegistry {
  static getAll(): EnterpriseModule[] {
    const records = db.select<any>("modules");
    return records.map(r => ({
      id: r.id,
      name: r.name,
      category: r.category,
      ...JSON.parse(r.config)
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
      ...JSON.parse(r.config)
    };
  }

  static register(mod: EnterpriseModule): EnterpriseModule {
    const record = {
      id: mod.id,
      name: mod.name,
      category: mod.category,
      config: JSON.stringify({
        permissions: mod.permissions,
        workflows: mod.workflows,
        forms: mod.forms,
        reports: mod.reports
      })
    };
    db.insert("modules", record);
    return mod;
  }
}

export default ModuleRegistry;
