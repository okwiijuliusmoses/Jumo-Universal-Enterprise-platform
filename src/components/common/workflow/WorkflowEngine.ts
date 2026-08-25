import { useState, useCallback } from 'react';

export type WorkflowState = 
  | 'DRAFT'
  | 'SUBMITTED'
  | 'IN_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'RETURNED_FOR_CORRECTION'
  | 'EXECUTED'
  | 'POSTED'
  | 'AUDITED'
  | 'CANCELLED';

export interface WorkflowTransitionLog {
  id: string;
  fromState: WorkflowState;
  toState: WorkflowState;
  actor: string;
  role: string;
  comments?: string;
  timestamp: string;
  signatureHash?: string;
}

export interface WorkflowEntity {
  id: string;
  entityType: string;
  currentState: WorkflowState;
  createdTime: string;
  updatedTime: string;
  transitionHistory: WorkflowTransitionLog[];
  metadata?: Record<string, any>;
}

export interface WorkflowRule {
  from: WorkflowState;
  to: WorkflowState;
  requiredRole?: string[];
  actionLabel: string;
  requiresComment?: boolean;
}

export const DEFAULT_WORKFLOW_RULES: WorkflowRule[] = [
  { from: 'DRAFT', to: 'SUBMITTED', actionLabel: 'Submit for Review' },
  { from: 'SUBMITTED', to: 'IN_REVIEW', requiredRole: ['ROLE_REVIEWER', 'ROLE_MANAGER', 'ROLE_DOS', 'ROLE_BURSAR'], actionLabel: 'Begin Review' },
  { from: 'IN_REVIEW', to: 'APPROVED', requiredRole: ['ROLE_APPROVER', 'ROLE_HEAD_TEACHER', 'ROLE_PRINCIPAL', 'ROLE_CFO', 'ROLE_BISHOP'], actionLabel: 'Approve Transaction', requiresComment: true },
  { from: 'IN_REVIEW', to: 'REJECTED', requiredRole: ['ROLE_APPROVER', 'ROLE_HEAD_TEACHER', 'ROLE_CFO'], actionLabel: 'Reject Requisition', requiresComment: true },
  { from: 'IN_REVIEW', to: 'RETURNED_FOR_CORRECTION', requiredRole: ['ROLE_APPROVER', 'ROLE_REVIEWER'], actionLabel: 'Return for Correction', requiresComment: true },
  { from: 'RETURNED_FOR_CORRECTION', to: 'SUBMITTED', actionLabel: 'Resubmit' },
  { from: 'APPROVED', to: 'EXECUTED', requiredRole: ['ROLE_OPERATOR', 'ROLE_BURSAR', 'ROLE_PROCUREMENT'], actionLabel: 'Execute Order / Disbursement' },
  { from: 'EXECUTED', to: 'POSTED', requiredRole: ['ROLE_ACCOUNTANT', 'ROLE_TREASURER'], actionLabel: 'Post to General Ledger' },
  { from: 'POSTED', to: 'AUDITED', requiredRole: ['ROLE_AUDITOR', 'ROLE_COMPLIANCE'], actionLabel: 'Complete Audit Verification' },
  { from: 'DRAFT', to: 'CANCELLED', actionLabel: 'Cancel Draft' }
];

export class WorkflowEngine {
  private rules: WorkflowRule[];

  constructor(customRules?: WorkflowRule[]) {
    this.rules = customRules || DEFAULT_WORKFLOW_RULES;
  }

  public getAvailableTransitions(currentState: WorkflowState, userRoles: string[] = []): WorkflowRule[] {
    return this.rules.filter(rule => {
      if (rule.from !== currentState) return false;
      if (!rule.requiredRole || rule.requiredRole.length === 0) return true;
      return rule.requiredRole.some(role => userRoles.includes(role) || userRoles.includes('ROLE_ADMIN') || userRoles.includes('ROLE_SUPER_ADMIN'));
    });
  }

  public canTransition(currentState: WorkflowState, targetState: WorkflowState, userRoles: string[] = []): boolean {
    const valid = this.getAvailableTransitions(currentState, userRoles);
    return valid.some(r => r.to === targetState);
  }

  public transition(
    entity: WorkflowEntity,
    targetState: WorkflowState,
    actor: string,
    role: string,
    comments?: string,
    userRoles: string[] = []
  ): WorkflowEntity {
    if (!this.canTransition(entity.currentState, targetState, userRoles)) {
      throw new Error(`Invalid workflow transition from ${entity.currentState} to ${targetState} for actor ${actor}`);
    }

    const transitionLog: WorkflowTransitionLog = {
      id: `TR-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      fromState: entity.currentState,
      toState: targetState,
      actor,
      role,
      comments,
      timestamp: new Date().toISOString(),
      signatureHash: `SIG-${Math.floor(100000 + Math.random() * 900000)}`
    };

    return {
      ...entity,
      currentState: targetState,
      updatedTime: new Date().toISOString(),
      transitionHistory: [transitionLog, ...entity.transitionHistory]
    };
  }
}

/**
 * React Hook for Workflow Engine Operations
 */
export function useWorkflowEngine(initialState: WorkflowState = 'DRAFT', customRules?: WorkflowRule[]) {
  const engine = new WorkflowEngine(customRules);
  const [currentState, setCurrentState] = useState<WorkflowState>(initialState);
  const [history, setHistory] = useState<WorkflowTransitionLog[]>([]);

  const transitionTo = useCallback((
    targetState: WorkflowState,
    actor: string,
    role: string,
    comments?: string,
    userRoles: string[] = ['ROLE_ADMIN']
  ) => {
    const mockEntity: WorkflowEntity = {
      id: 'HOOK-ENTITY',
      entityType: 'TRANSACTION',
      currentState,
      createdTime: new Date().toISOString(),
      updatedTime: new Date().toISOString(),
      transitionHistory: history
    };

    const updated = engine.transition(mockEntity, targetState, actor, role, comments, userRoles);
    setCurrentState(updated.currentState);
    setHistory(updated.transitionHistory);
    return updated;
  }, [currentState, history, engine]);

  const availableRules = engine.getAvailableTransitions(currentState, ['ROLE_ADMIN']);

  return {
    currentState,
    history,
    availableRules,
    transitionTo,
    canTransition: (targetState: WorkflowState) => engine.canTransition(currentState, targetState, ['ROLE_ADMIN'])
  };
}
