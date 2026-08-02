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
      status: "In Progress",
      currentStep: 1,
      createdAt: new Date().toISOString()
    };
    this.instances.push(instance);
    return instance;
  }

  listInstances() {
    return this.instances;
  }
}
