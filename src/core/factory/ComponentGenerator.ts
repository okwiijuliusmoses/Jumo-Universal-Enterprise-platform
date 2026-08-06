
import { EnterpriseComponent } from "../../ueos/kernel/GovernanceEngine";

export class ComponentGenerator {
  static generateComponents(components: string[]): EnterpriseComponent[] {
    return components.map(c => ({
      id: `comp-${c.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(Math.random() * 10000)}`,
      name: c,
      type: "UI",
      description: `Enterprise component for ${c}`
    }));
  }
}
