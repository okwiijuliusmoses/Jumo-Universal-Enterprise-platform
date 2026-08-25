/**
 * JUMO DIGITAL HYBRID PLATFORM - Advanced Workflow Studio
 * Upgrade of the JUMO Workflow Automation Engine Core Module
 */

import { platformEventBus } from '../event-bus';
import { auditEngine } from '../audit';

export interface ApprovalStep {
  stepId: string;
  approverRole: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ESCALATED';
  approvedBy?: string;
  actionedAt?: string;
  slaLimitHours: number;
}

export interface WorkflowInstance {
  instanceId: string;
  ruleId: string;
  triggerEvent: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED' | 'ESCALATED_SLA';
  payload: Record<string, any>;
  approvalChain: ApprovalStep[];
  currentStepIndex: number;
  slaDeadline: string; // ISO timestamp
  initiatedAt: string;
}

export interface WorkflowRule {
  ruleId: string;
  ruleName: string;
  triggerEvent: string;
  condition: string;
  action: string;
  enabled: boolean;
  priority: 'CRITICAL' | 'HIGH' | 'NORMAL';
  slaHours: number;
  approvalChainRoles: string[]; // e.g. ['DEPARTMENT_HEAD', 'TREASURY_DIRECTOR', 'OWNER']
}

export interface WorkflowExecutionLog {
  executionId: string;
  ruleId: string;
  eventTriggered: string;
  status: 'SUCCESS' | 'ESCALATED' | 'FAILED' | 'SLA_BREACH';
  executedAt: string;
  details: string;
}

export class WorkflowEngine {
  private rules: WorkflowRule[] = [
    {
      ruleId: 'wf_rule_101',
      ruleName: 'FAAP High Risk Flag & Mandatory Owner Override',
      triggerEvent: 'FAAP_RISK_EVALUATION_COMPLETED',
      condition: 'riskScoreFactor > 1.25 OR requestedAmountUSD > 1000000',
      action: 'SUSPEND_AUTOMATED_DISBURSEMENT_REQUIRE_OWNER_APPROVAL',
      enabled: true,
      priority: 'CRITICAL',
      slaHours: 2,
      approvalChainRoles: ['TREASURY_DIRECTOR', 'OWNER'],
    },
    {
      ruleId: 'wf_rule_102',
      ruleName: 'Treasury Pool Depletion Warning Alert',
      triggerEvent: 'TREASURY_DRAWDOWN_EXECUTED',
      condition: 'availableAmountUSD < totalCapacityUSD * 0.15',
      action: 'DISPATCH_SECURITY_AUDIT_NOTIF_AND_REBALANCE_POOLS',
      enabled: true,
      priority: 'HIGH',
      slaHours: 4,
      approvalChainRoles: ['TREASURY_DIRECTOR'],
    },
    {
      ruleId: 'wf_rule_103',
      ruleName: 'Automated Ledger Journal Entry Reconciliation',
      triggerEvent: 'INVOICE_PAYMENT_RECEIVED',
      condition: 'paymentStatus === "PAID"',
      action: 'AUTO_POST_JOURNAL_ENTRY_TO_GENERAL_LEDGER',
      enabled: true,
      priority: 'NORMAL',
      slaHours: 24,
      approvalChainRoles: [],
    },
  ];

  private logs: WorkflowExecutionLog[] = [
    {
      executionId: 'exec_log_501',
      ruleId: 'wf_rule_101',
      eventTriggered: 'FAAP_RISK_EVALUATION_COMPLETED',
      status: 'ESCALATED',
      executedAt: '2026-07-24T08:45:00Z',
      details: 'Risk score factor 1.35 flagged. Dispatched escalation notification to UEOS CONTROL CENTER.',
    },
    {
      executionId: 'exec_log_502',
      ruleId: 'wf_rule_103',
      eventTriggered: 'INVOICE_PAYMENT_RECEIVED',
      status: 'SUCCESS',
      executedAt: '2026-07-24T10:12:00Z',
      details: 'Invoice inv_2026_102 paid ($88,000 USD). Auto-posted journal entry je_2026_002.',
    },
  ];

  private instances: WorkflowInstance[] = [];

  public getRules(): WorkflowRule[] {
    return this.rules;
  }

  public getLogs(): WorkflowExecutionLog[] {
    return this.logs;
  }

  public getInstances(): WorkflowInstance[] {
    return this.instances;
  }

  public addRule(rule: Omit<WorkflowRule, 'ruleId'>): WorkflowRule {
    const newRule: WorkflowRule = {
      ...rule,
      ruleId: `wf_rule_${Date.now()}`,
    };
    this.rules.push(newRule);
    return newRule;
  }

  public toggleRule(ruleId: string, enabled?: boolean): WorkflowRule {
    const rule = this.rules.find((r) => r.ruleId === ruleId);
    if (!rule) {
      throw new Error(`Workflow rule ${ruleId} not found.`);
    }
    rule.enabled = enabled !== undefined ? enabled : !rule.enabled;
    return rule;
  }

  /**
   * Instantiate and initiate an advanced approval/workflow instance.
   */
  public initiateWorkflow(ruleId: string, payload: Record<string, any>): WorkflowInstance {
    const rule = this.rules.find((r) => r.ruleId === ruleId);
    if (!rule) throw new Error(`Workflow rule ${ruleId} not found.`);

    const now = new Date();
    const slaDeadline = new Date(now.getTime() + rule.slaHours * 60 * 60 * 1000).toISOString();

    const approvalChain: ApprovalStep[] = rule.approvalChainRoles.map((role, idx) => ({
      stepId: `step_${ruleId}_${idx + 1}`,
      approverRole: role,
      status: 'PENDING',
      slaLimitHours: Math.ceil(rule.slaHours / (rule.approvalChainRoles.length || 1)),
    }));

    const instance: WorkflowInstance = {
      instanceId: `wf_inst_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      ruleId,
      triggerEvent: rule.triggerEvent,
      status: approvalChain.length > 0 ? 'IN_PROGRESS' : 'COMPLETED',
      payload,
      approvalChain,
      currentStepIndex: approvalChain.length > 0 ? 0 : -1,
      slaDeadline,
      initiatedAt: now.toISOString(),
    };

    this.instances.unshift(instance);

    auditEngine.logEvent({
      actorId: 'WORKFLOW_ENGINE',
      actorRole: 'SECURITY',
      action: 'WORKFLOW_INITIATED',
      resourceTarget: instance.instanceId,
      status: 'SUCCESS',
      ipAddress: '127.0.0.1',
      tenantId: payload.tenantId || 'tenant_finbank_01',
      metadata: { ruleId, priority: rule.priority, slaDeadline },
    });

    return instance;
  }

  /**
   * Approve or action a step in a running approval chain.
   */
  public approveStep(instanceId: string, approverRole: string, actorEmail: string, approved: boolean): WorkflowInstance {
    const instance = this.instances.find((i) => i.instanceId === instanceId);
    if (!instance) throw new Error(`Workflow instance ${instanceId} not found.`);
    if (instance.status !== 'IN_PROGRESS') throw new Error(`Workflow instance is already finalized with status: ${instance.status}`);

    const currentStep = instance.approvalChain[instance.currentStepIndex];
    if (!currentStep) throw new Error('No active step in approval chain.');

    if (currentStep.approverRole !== approverRole) {
      throw new Error(`Authorization mismatch: current step expects role '${currentStep.approverRole}', got '${approverRole}'`);
    }

    currentStep.status = approved ? 'APPROVED' : 'REJECTED';
    currentStep.approvedBy = actorEmail;
    currentStep.actionedAt = new Date().toISOString();

    if (!approved) {
      instance.status = 'REJECTED';
      platformEventBus.publish('WORKFLOW_RULE_TRIGGERED', 'tenant_finbank_01', {
        instanceId,
        ruleId: instance.ruleId,
        action: 'REJECTED',
        reason: 'Approval chain rejected step',
      });
    } else {
      // Advance step
      instance.currentStepIndex += 1;
      if (instance.currentStepIndex >= instance.approvalChain.length) {
        instance.status = 'COMPLETED';
        platformEventBus.publish('WORKFLOW_RULE_TRIGGERED', 'tenant_finbank_01', {
          instanceId,
          ruleId: instance.ruleId,
          action: 'COMPLETED',
          reason: 'Approval chain fully approved',
        });
      }
    }

    return instance;
  }

  /**
   * Check for SLA breaches and trigger escalations.
   */
  public evaluateSlaBreaches(): number {
    let breachCount = 0;
    const now = new Date();

    for (const instance of this.instances) {
      if (instance.status === 'IN_PROGRESS' && new Date(instance.slaDeadline) < now) {
        instance.status = 'ESCALATED_SLA';
        breachCount += 1;

        const log: WorkflowExecutionLog = {
          executionId: `exec_log_sla_${Date.now()}_${Math.floor(Math.random() * 100)}`,
          ruleId: instance.ruleId,
          eventTriggered: instance.triggerEvent,
          status: 'SLA_BREACH',
          executedAt: now.toISOString(),
          details: `Workflow instance ${instance.instanceId} breached SLA deadline: ${instance.slaDeadline}. Automatic escalation triggered.`,
        };
        this.logs.unshift(log);

        platformEventBus.publish('SECURITY_ALERT', 'tenant_finbank_01', {
          alertType: 'SLA_BREACH_ALERT',
          severity: 'HIGH',
          message: `SLA Deadline Breached for instance ${instance.instanceId}. Escalating approval to Root Owner.`,
        });
      }
    }

    return breachCount;
  }

  /**
   * Evaluate direct event trigger and execute matching rules.
   */
  public triggerEvent(eventTriggered: string, payload: Record<string, any>): WorkflowExecutionLog[] {
    const matchingRules = this.rules.filter((r) => r.enabled && r.triggerEvent === eventTriggered);
    const generatedLogs: WorkflowExecutionLog[] = [];

    for (const rule of matchingRules) {
      // Instantiate workflow instance for the rule
      this.initiateWorkflow(rule.ruleId, payload);

      const log: WorkflowExecutionLog = {
        executionId: `exec_log_${Date.now()}_${Math.floor(Math.random() * 100)}`,
        ruleId: rule.ruleId,
        eventTriggered,
        status: 'SUCCESS',
        executedAt: new Date().toISOString(),
        details: `Rule "${rule.ruleName}" triggered instance creation. Action: ${rule.action}. SLA is ${rule.slaHours} hours.`,
      };
      this.logs.unshift(log);
      generatedLogs.push(log);
    }

    return generatedLogs;
  }

  /**
   * Returns highly advanced enterprise analytics.
   */
  public getAnalyticsSummary() {
    const totalInstances = this.instances.length;
    const completedCount = this.instances.filter(i => i.status === 'COMPLETED').length;
    const rejectedCount = this.instances.filter(i => i.status === 'REJECTED').length;
    const activeCount = this.instances.filter(i => i.status === 'IN_PROGRESS').length;
    const escalatedCount = this.instances.filter(i => i.status === 'ESCALATED_SLA').length;

    return {
      totalInstances,
      completedCount,
      rejectedCount,
      activeCount,
      escalatedCount,
      slaComplianceRatePercent: totalInstances > 0 ? Math.round(((completedCount + rejectedCount) / totalInstances) * 100) : 100,
      ruleCount: this.rules.length,
      enabledRulesCount: this.rules.filter(r => r.enabled).length,
    };
  }
}

export const workflowEngine = new WorkflowEngine();
