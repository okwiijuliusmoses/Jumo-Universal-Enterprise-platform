
/**
 * JUMO UEOS WORKFLOW ENGINE
 * Authoritative class for managing institutional state transitions.
 */

export type WorkflowState = 'DRAFT' | 'SUBMITTED' | 'VERIFIED' | 'REVIEWED' | 'APPROVED' | 'REJECTED' | 'ADMITTED' | 'ACTIVE' | 'ARCHIVED';

export interface WorkflowTransition {
  from: WorkflowState;
  to: WorkflowState;
  actor: string;
  timestamp: string;
  justification?: string;
}

export interface WorkflowInstance {
  id: string;
  schemaId: string;
  recordId: string;
  currentState: WorkflowState;
  history: WorkflowTransition[];
}

export class WorkflowEngine {
  private static instance: WorkflowEngine;
  private workflows: Map<string, WorkflowInstance> = new Map();

  private constructor() {}

  public static getInstance(): WorkflowEngine {
    if (!WorkflowEngine.instance) {
      WorkflowEngine.instance = new WorkflowEngine();
    }
    return WorkflowEngine.instance;
  }

  /**
   * Initialize a new workflow for a record
   */
  public initialize(schemaId: string, recordId: string): WorkflowInstance {
    const workflow: WorkflowInstance = {
      id: `WF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      schemaId,
      recordId,
      currentState: 'DRAFT',
      history: [{
        from: 'DRAFT',
        to: 'DRAFT',
        actor: 'SYSTEM',
        timestamp: new Date().toISOString(),
        justification: 'Workflow Initialized'
      }]
    };
    this.workflows.set(workflow.id, workflow);
    return workflow;
  }

  /**
   * Transition a workflow to a new state
   */
  public transition(
    workflowId: string, 
    to: WorkflowState, 
    actor: string, 
    justification?: string
  ): WorkflowInstance {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) throw new Error(`Workflow ${workflowId} not found`);

    // Mandatory justification for rejections
    if (to === 'REJECTED' && !justification) {
      throw new Error('Mandatory justification required for rejection.');
    }

    const transition: WorkflowTransition = {
      from: workflow.currentState,
      to,
      actor,
      timestamp: new Date().toISOString(),
      justification
    };

    workflow.currentState = to;
    workflow.history.push(transition);
    
    this.workflows.set(workflowId, workflow);
    return workflow;
  }

  public getWorkflow(id: string): WorkflowInstance | undefined {
    return this.workflows.get(id);
  }

  public getWorkflowForRecord(recordId: string): WorkflowInstance | undefined {
    return Array.from(this.workflows.values()).find(w => w.recordId === recordId);
  }
}
