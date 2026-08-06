
import { EnterpriseForm } from "../../ueos/kernel/GovernanceEngine";

export class FormGenerator {
  static generateForms(forms: string[]): EnterpriseForm[] {
    return forms.map(f => ({
      id: `form-${f.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(Math.random() * 10000)}`,
      name: f,
      fields: [],
      validation: {},
      workflowBinding: "auto"
    }));
  }
}
