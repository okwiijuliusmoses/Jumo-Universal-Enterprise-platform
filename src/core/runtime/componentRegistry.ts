import { db } from "../../database/db";
import { EnterpriseComponent } from "../../ueos/kernel/GovernanceEngine";

export class ComponentRegistry {
  static getAll(): EnterpriseComponent[] {
    const records = db.select<any>("components");
    return records.map(r => ({
      id: r.id,
      name: r.name,
      type: r.type,
      description: r.description
    }));
  }

  static getById(id: string): EnterpriseComponent | null {
    const results = db.select<any>("components", r => r.id === id);
    if (results.length === 0) return null;
    const r = results[0];
    return {
      id: r.id,
      name: r.name,
      type: r.type,
      description: r.description
    };
  }

  static register(comp: EnterpriseComponent): EnterpriseComponent {
    const record = {
      id: comp.id,
      name: comp.name,
      type: comp.type,
      description: comp.description
    };
    db.insert("components", record);
    return comp;
  }
}

export default ComponentRegistry;
