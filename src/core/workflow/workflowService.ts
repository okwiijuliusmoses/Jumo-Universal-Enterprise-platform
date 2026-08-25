export interface WorkflowTask {
  id: string;
  name: string;
  currentState: "pending" | "approved" | "rejected" | "escalated";
  approvalChain: {
    step: number;
    assignedRole: string;
    approverEmail?: string;
    status: "pending" | "approved" | "rejected";
    timestamp?: string;
  }[];
  currentStep: number;
  history: {
    timestamp: string;
    actor: string;
    state: string;
    comment: string;
  }[];
  escalationRules: {
    timeoutMs: number;
    action: "escalate_to_admin" | "auto_approve" | "auto_reject";
    escalatedToRole?: string;
  };
  createdAt: string;
}

export class WorkflowService {
  private static instance: WorkflowService;
  private activeTasks: Map<string, WorkflowTask> = new Map();

  private constructor() {
    this.seedDefaultTasks();
    // Run workflow escalation checks every 30 seconds
    if (typeof setInterval !== "undefined") {
      const interval = setInterval(() => {
        this.runBackgroundEscalationSweep();
      }, 30000);
      if (interval && typeof interval.unref === "function") {
        interval.unref();
      }
    }
  }

  public static getInstance(): WorkflowService {
    if (!WorkflowService.instance) {
      WorkflowService.instance = new WorkflowService();
    }
    return WorkflowService.instance;
  }

  private seedDefaultTasks() {
    // Seed some active approval tasks
    const defaultTasks: WorkflowTask[] = [
      {
        id: "WF-TASK-101",
        name: "Enterprise Treasury Disbursal (ZMK 150,000)",
        currentState: "pending",
        currentStep: 1,
        approvalChain: [
          { step: 1, assignedRole: "FAAP_Controller", status: "pending" },
          { step: 2, assignedRole: "SecOps_Administrator", status: "pending" }
        ],
        history: [
          { timestamp: new Date().toISOString(), actor: "sacco_officer@jumo.net", state: "created", comment: "Initiated loan program disbursement." }
        ],
        escalationRules: {
          timeoutMs: 86400000, // 24 hours
          action: "escalate_to_admin",
          escalatedToRole: "SecOps_Administrator"
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "WF-TASK-102",
        name: "Security Token Key Rotation - AWS KMS",
        currentState: "approved",
        currentStep: 2,
        approvalChain: [
          { step: 1, assignedRole: "SecOps_Administrator", approverEmail: "secops_lead@jumo.net", status: "approved", timestamp: new Date().toISOString() }
        ],
        history: [
          { timestamp: new Date().toISOString(), actor: "System_Scheduler", state: "created", comment: "Auto-triggered cron rotation." },
          { timestamp: new Date().toISOString(), actor: "secops_lead@jumo.net", state: "approved", comment: "Verified cryptographic fingerprint and approved." }
        ],
        escalationRules: {
          timeoutMs: 3600000, // 1 hour
          action: "auto_reject"
        },
        createdAt: new Date().toISOString()
      }
    ];

    for (const task of defaultTasks) {
      this.activeTasks.set(task.id, task);
    }
  }

  public getTask(id: string): WorkflowTask | undefined {
    return this.activeTasks.get(id);
  }

  public getAllTasks(): WorkflowTask[] {
    return Array.from(this.activeTasks.values());
  }

  public createTask(name: string, roles: string[], timeoutMs = 86400000, action: "escalate_to_admin" | "auto_approve" | "auto_reject" = "escalate_to_admin"): WorkflowTask {
    const id = `WF-TASK-${Math.floor(Math.random() * 90000) + 10000}`;
    const chain = roles.map((role, idx) => ({
      step: idx + 1,
      assignedRole: role,
      status: "pending" as const
    }));

    const task: WorkflowTask = {
      id,
      name,
      currentState: "pending",
      currentStep: 1,
      approvalChain: chain,
      history: [
        { timestamp: new Date().toISOString(), actor: "System_Core", state: "created", comment: "Workflow task initialized." }
      ],
      escalationRules: {
        timeoutMs,
        action,
        escalatedToRole: action === "escalate_to_admin" ? "SecOps_Administrator" : undefined
      },
      createdAt: new Date().toISOString()
    };

    this.activeTasks.set(id, task);

    console.log(`[WORKFLOW_CREATE] Created workflow approval chain '${name}' [Task ID: ${id}].`);
    return task;
  }

  public approveStep(id: string, email: string, role: string, comment: string): boolean {
    const task = this.activeTasks.get(id);
    if (!task || task.currentState === "approved" || task.currentState === "rejected") return false;

    const currentChainStep = task.approvalChain.find(c => c.step === task.currentStep);
    if (!currentChainStep || currentChainStep.assignedRole !== role) {
      console.warn(`[WORKFLOW_APPROVE_BLOCKED] Attempted to approve step ${task.currentStep} of workflow ${id} but lacked role ${currentChainStep?.assignedRole}.`);
      return false;
    }

    currentChainStep.status = "approved";
    currentChainStep.approverEmail = email;
    currentChainStep.timestamp = new Date().toISOString();

    task.history.push({
      timestamp: new Date().toISOString(),
      actor: email,
      state: "step_approved",
      comment: `Step ${task.currentStep} Approved: ${comment}`
    });

    if (task.currentStep < task.approvalChain.length) {
      task.currentStep++;
      console.log(`[WORKFLOW_STEP_APPROVED] Approved step ${task.currentStep - 1} of workflow ${id}. Advancing to step ${task.currentStep}.`);
    } else {
      task.currentState = "approved";
      console.log(`[WORKFLOW_FINAL_APPROVED] Workflow approval chain fully completed for task '${task.name}' [ID: ${id}].`);
    }

    return true;
  }

  public rejectStep(id: string, email: string, role: string, comment: string): boolean {
    const task = this.activeTasks.get(id);
    if (!task || task.currentState === "approved" || task.currentState === "rejected") return false;

    const currentChainStep = task.approvalChain.find(c => c.step === task.currentStep);
    if (!currentChainStep || currentChainStep.assignedRole !== role) {
      console.warn(`[WORKFLOW_REJECT_BLOCKED] Attempted to reject step ${task.currentStep} of workflow ${id} but lacked role ${currentChainStep?.assignedRole}.`);
      return false;
    }

    currentChainStep.status = "rejected";
    currentChainStep.approverEmail = email;
    currentChainStep.timestamp = new Date().toISOString();

    task.currentState = "rejected";
    task.history.push({
      timestamp: new Date().toISOString(),
      actor: email,
      state: "rejected",
      comment: `Workflow rejected at step ${task.currentStep}: ${comment}`
    });

    console.log(`[WORKFLOW_REJECTED] Rejected workflow ${id} at step ${task.currentStep}.`);
    return true;
  }

  public triggerEscalation(id: string): boolean {
    const task = this.activeTasks.get(id);
    if (!task || task.currentState !== "pending") return false;

    const action = task.escalationRules.action;
    task.currentState = "escalated";

    task.history.push({
      timestamp: new Date().toISOString(),
      actor: "System_Scheduler",
      state: "escalated",
      comment: `Escalation triggered due to timeout. Action: ${action}`
    });

    if (action === "auto_approve") {
      task.currentState = "approved";
      console.log(`[WORKFLOW_AUTO_APPROVE] Auto-approved task '${task.name}' [ID: ${id}] due to escalation rule.`);
    } else if (action === "auto_reject") {
      task.currentState = "rejected";
      console.log(`[WORKFLOW_AUTO_REJECT] Auto-rejected task '${task.name}' [ID: ${id}] due to escalation rule.`);
    } else {
      // Re-assign step to Admin
      const currentStep = task.approvalChain.find(c => c.step === task.currentStep);
      if (currentStep) {
        currentStep.assignedRole = "SecOps_Administrator";
      }
      console.log(`[WORKFLOW_ESCALATION] Escalated task '${task.name}' [ID: ${id}] assigned role reassigned to SecOps_Administrator.`);
    }

    return true;
  }

  /**
   * Centralized Workflow Escalation Scheduler - sweeps and processes expired tasks
   */
  public runBackgroundEscalationSweep() {
    const now = Date.now();
    for (const task of this.activeTasks.values()) {
      if (task.currentState === "pending") {
        const createdTime = new Date(task.createdAt).getTime();
        const timeoutMs = task.escalationRules.timeoutMs;
        if (now - createdTime > timeoutMs) {
          console.log(`[ESCALATION_SCHEDULER] Automatically triggering escalation for expired task: ${task.id}`);
          this.triggerEscalation(task.id);
        }
      }
    }
  }
}

export const workflowService = WorkflowService.getInstance();
