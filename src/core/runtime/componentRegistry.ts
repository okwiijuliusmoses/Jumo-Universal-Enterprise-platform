
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

  static register(component: EnterpriseComponent): EnterpriseComponent {
    const record = {
      id: component.id,
      name: component.name,
      type: component.type,
      description: component.description
    };
    const exists = this.getById(component.id);
    if (exists) {
      db.update("components", c => c.id === component.id, () => record);
    } else {
      db.insert("components", record);
    }
    return component;
  }
}

export default ComponentRegistry;
