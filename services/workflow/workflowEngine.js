export class WorkflowEngine {
  constructor() {
    this.workflows = new Map([
      ["wf-001", { id: "wf-001", title: "Enterprise Budget Approval", category: "Finance", status: "Active", steps: 3, owner: "CFO Office" }],
      ["wf-002", { id: "wf-002", title: "Government Procurement Review", category: "Government", status: "Active", steps: 5, owner: "Procurement Board" }],
      ["wf-003", { id: "wf-003", title: "University Faculty Onboarding", category: "Education", status: "Active", steps: 4, owner: "Academic Affairs" }]
    ]);
    this.instances = [];
  }

  listWorkflows() {
    return Array.from(this.workflows.values());
  }

  startInstance(workflowId, payload) {
    const instance = {
      instanceId: "inst_" + Math.random().toString(36).substring(2),
      workflowId,
      payload,
      status: "Draft", // Starting as Draft
      history: [{ status: "Draft", timestamp: new Date().toISOString(), comment: "Workflow initiated" }],
      currentStep: 1,
      createdAt: new Date().toISOString()
    };
    this.instances.push(instance);
    return instance;
  }

  transitionInstance(instanceId, nextStatus, comment) {
    const instance = this.instances.find(i => i.instanceId === instanceId);
    if (!instance) throw new Error("Workflow instance not found");

    const validTransitions = {
      "Draft": ["Submitted"],
      "Submitted": ["Validation", "Rejection"],
      "Validation": ["Review", "Rejection", "Correction"],
      "Review": ["Approval", "Rejection", "Correction", "Escalation"],
      "Approval": ["Completion"],
      "Escalation": ["Review", "Approval", "Rejection"],
      "Correction": ["Submitted"],
      "Rejection": ["Archive"],
      "Completion": ["Archive"]
    };

    if (!validTransitions[instance.status]?.includes(nextStatus)) {
      throw new Error(`Invalid transition from ${instance.status} to ${nextStatus}`);
    }

    instance.status = nextStatus;
    instance.history.push({ status: nextStatus, timestamp: new Date().toISOString(), comment });
    return instance;
  }

  listInstances() {
    return this.instances;
  }
}
