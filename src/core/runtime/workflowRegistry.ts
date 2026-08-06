import { db } from "../../database/db";
import { EnterpriseWorkflow } from "../../ueos/kernel/GovernanceEngine";
import { safeJSONParse } from "../../lib/json";

export class WorkflowRegistry {
  static getAll(): EnterpriseWorkflow[] {
    const records = db.select<any>("workflows");
    // Standardize mapping if needed, but for now we follow the specification
    return records.map(r => ({
      id: r.id,
      name: r.name,
      trigger: r.triggerEvent,
      status: r.status,
      steps: safeJSONParse(r.steps, []),
      approvals: safeJSONParse(r.approvers, []),
      roles: safeJSONParse(r.roles, [])
    }));
  }

  static getById(id: string): EnterpriseWorkflow | null {
    const results = db.select<any>("workflows", r => r.id === id);
    if (results.length === 0) return null;
    const r = results[0];
    return {
      id: r.id,
      name: r.name,
      trigger: r.triggerEvent,
      status: r.status,
      steps: safeJSONParse(r.steps, []),
      approvals: safeJSONParse(r.approvers, []),
      roles: safeJSONParse(r.roles, [])
    };
  }

  static register(workflow: EnterpriseWorkflow): EnterpriseWorkflow {
    const record = {
      id: workflow.id,
      name: workflow.name,
      triggerEvent: workflow.trigger,
      status: workflow.status,
      steps: JSON.stringify(workflow.steps || []),
      approvers: JSON.stringify(workflow.approvals || []),
      roles: JSON.stringify(workflow.roles || []),
      lastTriggered: "Never"
    };
    const exists = this.getById(workflow.id);
    if (exists) {
      db.update("workflows", w => w.id === workflow.id, () => record);
    } else {
      db.insert("workflows", record);
    }
    return workflow;
  }
}

export default WorkflowRegistry;
