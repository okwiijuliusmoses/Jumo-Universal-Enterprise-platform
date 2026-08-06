import { db } from "../../database/db";
import { EnterpriseForm } from "../../ueos/kernel/GovernanceEngine";

export class FormRegistry {
  static getAll(): EnterpriseForm[] {
    const records = db.select<any>("forms");
    return records.map(r => ({
      id: r.id,
      name: r.name,
      ...JSON.parse(r.definition)
    }));
  }

  static getById(id: string): EnterpriseForm | null {
    const results = db.select<any>("forms", r => r.id === id);
    if (results.length === 0) return null;
    const r = results[0];
    return {
      id: r.id,
      name: r.name,
      ...JSON.parse(r.definition)
    };
  }

  static register(form: EnterpriseForm): EnterpriseForm {
    const record = {
      id: form.id,
      name: form.name,
      definition: JSON.stringify({
        fields: form.fields,
        validation: form.validation,
        workflowBinding: form.workflowBinding
      })
    };
    db.insert("forms", record);
    return form;
  }
}

export default FormRegistry;
