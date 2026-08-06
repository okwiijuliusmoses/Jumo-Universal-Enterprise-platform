
import { db } from "../../database/db";
import { EnterpriseForm } from "../../ueos/kernel/GovernanceEngine";

export class FormRegistry {
  static getAll(): EnterpriseForm[] {
    const records = db.select<any>("forms");
    return records.map(r => ({
      id: r.id,
      name: r.name,
      fields: JSON.parse(r.fields),
      validation: JSON.parse(r.validation),
      workflowBinding: r.workflowBinding
    }));
  }

  static getById(id: string): EnterpriseForm | null {
    const results = db.select<any>("forms", r => r.id === id);
    if (results.length === 0) return null;
    const r = results[0];
    return {
      id: r.id,
      name: r.name,
      fields: JSON.parse(r.fields),
      validation: JSON.parse(r.validation),
      workflowBinding: r.workflowBinding
    };
  }

  static register(form: EnterpriseForm): EnterpriseForm {
    const record = {
      id: form.id,
      name: form.name,
      fields: JSON.stringify(form.fields),
      validation: JSON.stringify(form.validation),
      workflowBinding: form.workflowBinding
    };
    const exists = this.getById(form.id);
    if (exists) {
      db.update("forms", f => f.id === form.id, () => record);
    } else {
      db.insert("forms", record);
    }
    return form;
  }
}

export default FormRegistry;
