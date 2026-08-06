import { db } from "../../database/db";
import { EnterpriseEcosystem } from "../../ueos/kernel/GovernanceEngine";

export class EcosystemRegistry {
  static getAll(): EnterpriseEcosystem[] {
    const records = db.select<any>("ecosystems");
    return records.map(r => ({
      ...r,
      supportedCountries: r.config ? JSON.parse(r.config).supportedCountries : [],
      institutionTypes: r.config ? JSON.parse(r.config).institutionTypes : [],
      templates: r.config ? JSON.parse(r.config).templates : [],
      modules: r.config ? JSON.parse(r.config).modules : [],
      permissions: r.config ? JSON.parse(r.config).permissions : []
    }));
  }

  static getById(id: string): EnterpriseEcosystem | null {
    const results = db.select<any>("ecosystems", r => r.id === id);
    if (results.length === 0) return null;
    const r = results[0];
    return {
      ...r,
      supportedCountries: r.config ? JSON.parse(r.config).supportedCountries : [],
      institutionTypes: r.config ? JSON.parse(r.config).institutionTypes : [],
      templates: r.config ? JSON.parse(r.config).templates : [],
      modules: r.config ? JSON.parse(r.config).modules : [],
      permissions: r.config ? JSON.parse(r.config).permissions : []
    };
  }

  static register(ecosystem: EnterpriseEcosystem): EnterpriseEcosystem {
    const record = {
      id: ecosystem.id,
      name: ecosystem.name,
      version: ecosystem.version,
      category: ecosystem.category,
      description: ecosystem.description,
      governanceModel: ecosystem.governanceModel,
      status: ecosystem.status,
      config: JSON.stringify({
        supportedCountries: ecosystem.supportedCountries,
        institutionTypes: ecosystem.institutionTypes,
        templates: ecosystem.templates,
        modules: ecosystem.modules,
        permissions: ecosystem.permissions
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
