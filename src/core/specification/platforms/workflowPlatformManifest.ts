import { JumoPlatformAuthoritativeManifest } from './types';

export const JUMO_WORKFLOW_PLATFORM_MANIFEST: JumoPlatformAuthoritativeManifest = {
  platformId: 'plat-workflow',
  platformCode: 'WORKFLOW',
  platformName: 'JUMO WORKFLOW ENGINE (Sovereign Multi-Stage SLA & State Machine Platform)',
  classification: 'SHARED_INDEPENDENT_PLATFORM',
  version: '2026.4.0',
  description: 'Enterprise state machine engine executing multi-step business workflows, escalation chains, SLA timers, conditional branched approvals, and delegate sign-offs.',
  subsystems: [
    {
      id: 'WF-SUB-001',
      code: 'WF_STATE_MACHINE',
      name: 'Deterministic State Machine Subsystem',
      description: 'Executes transitions, validates guard conditions, and persists workflow instance states.',
      serviceIds: ['WF-SRV-001'],
      capabilities: ['State Transition Validation', 'Guard Condition Evaluation', 'Audit Trail Recording'],
      databaseEntities: ['wf_instances', 'wf_transitions']
    },
    {
      id: 'WF-SUB-002',
      code: 'WF_SLA_ESCALATION',
      name: 'SLA Tracking & Escalation Subsystem',
      description: 'Manages deadline countdowns, automated reminder notifications, and hierarchical escalation.',
      serviceIds: ['WF-SRV-002'],
      capabilities: ['SLA Countdown Timers', 'Automatic Hierarchy Escalation', 'Notification Dispatch'],
      databaseEntities: ['wf_sla_timers']
    }
  ],
  services: [
    {
      id: 'WF-SRV-001',
      code: 'WorkflowExecutionService',
      name: 'Workflow Execution Service',
      description: 'Advances workflows through configured approval states.',
      serviceTier: 'CORE_ENGINE',
      endpoints: ['/api/v1/workflow/start', '/api/v1/workflow/transition']
    },
    {
      id: 'WF-SRV-002',
      code: 'SlaEscalationService',
      name: 'SLA Escalation Service',
      description: 'Checks pending steps against SLA thresholds and escalates tardy reviews.',
      serviceTier: 'ORCHESTRATOR',
      endpoints: ['/api/v1/workflow/sla/check', '/api/v1/workflow/sla/escalate']
    }
  ],
  extensionPoints: [
    {
      id: 'WF-EXT-001',
      hookName: 'onWorkflowCompleted',
      description: 'Triggered when a workflow instance reaches terminal SUCCESS or REJECTED state.',
      supportedProducts: [
        'prod-fintech',
        'prod-nursery-primary',
        'prod-secondary-school',
        'prod-university-tertiary',
        'prod-church-faith',
        'prod-alumni-community'
      ],
      requiredProtocol: 'WORKFLOW_EVENT_V1'
    }
  ],
  databaseEntities: [
    {
      id: 'WF-DB-001',
      tableName: 'wf_instances',
      description: 'Runtime instances of business workflows.',
      fields: [
        { name: 'id', type: 'VARCHAR(64)', required: true },
        { name: 'workflow_definition_id', type: 'VARCHAR(64)', required: true },
        { name: 'current_stage', type: 'VARCHAR(64)', required: true },
        { name: 'status', type: 'VARCHAR(32)', required: true },
        { name: 'created_at', type: 'TIMESTAMP', required: true }
      ]
    }
  ],
  apis: [
    {
      id: 'WF-API-001',
      endpoint: '/api/v1/workflow/transition',
      method: 'POST',
      description: 'Submits an approval decision or transition action.',
      authLevel: 'STAFF'
    }
  ],
  roles: [
    {
      id: 'WF-ROLE-001',
      name: 'Workflow Process Administrator',
      description: 'Designs and manages workflow templates and SLA thresholds.',
      permissions: ['workflow:templates:edit', 'workflow:instances:override']
    }
  ],
  testContracts: [
    {
      id: 'WF-TEST-001',
      targetId: 'WF_STATE_MACHINE',
      testType: 'PLATFORM_COMPLIANCE',
      expectedAssertion: 'State transitions must fail if guard conditions are not satisfied.'
    }
  ]
};
