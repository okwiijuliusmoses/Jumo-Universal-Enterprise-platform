import { db } from "../../database/db";
import { EnterpriseWorkflow } from "../../ueos/kernel/GovernanceEngine";

export class WorkflowRegistry {
  static getAll(): EnterpriseWorkflow[] {
    const records = db.select<any>("workflows");
    // Standardize mapping if needed, but for now we follow the specification
    return records.map(r => ({
      id: r.id,
      name: r.name,
      trigger: r.triggerEvent,
      status: r.status,
      steps: r.steps ? JSON.parse(r.steps) : [],
      approvals: r.approvers ? JSON.parse(r.approvers) : [],
      roles: r.roles ? JSON.parse(r.roles) : []
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
      steps: r.steps ? JSON.parse(r.steps) : [],
      approvals: r.approvers ? JSON.parse(r.approvers) : [],
      roles: r.roles ? JSON.parse(r.roles) : []
    };
  }

  static register(workflow: EnterpriseWorkflow): EnterpriseWorkflow {
    const record = {
      id: workflow.id,
      name: workflow.name,
      triggerEvent: workflow.trigger,
      status: workflow.status,
      steps: JSON.stringify(workflow.steps),
      approvers: JSON.stringify(workflow.approvals),
      roles: JSON.stringify(workflow.roles),
      lastTriggered: "Never"
    };
    db.insert("workflows", record);
    return workflow;
  }
}

export default WorkflowRegistry;
