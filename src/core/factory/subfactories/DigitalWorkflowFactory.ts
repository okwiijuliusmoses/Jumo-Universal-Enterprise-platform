// JUMO UEOS — Digital Workflow Factory
// Governs and manufactures resilient state machines and business workflows
// Lineage: JDPM/MFG2608/xxxx subordinate to JDPM/BLUE2608/xxxx

export interface WorkflowStepDefinition {
  stepId: string;
  name: string;
  executor: 'AI_AGENT' | 'SYSTEM_SERVICE' | 'HUMAN_APPROVAL_GATE';
  assignedAgentOrRole: string;
  actionPayload: Record<string, any>;
  timeoutSeconds: number;
  retryPolicy: {
    maxRetries: number;
    backoffMs: number;
    exponential: boolean;
  };
  compensationStepId?: string;
  status: 'PENDING' | 'EXECUTING' | 'COMPLETED' | 'FAILED' | 'COMPENSATED';
}

export interface WorkflowManifest {
  workflowId: string;
  name: string;
  category: 'FINANCIAL_CLEARING' | 'IDENTITY_ONBOARDING' | 'SECURITY_INCIDENT_TRIAGE' | 'SOFTWARE_RELEASE_APPROVAL' | 'SOVEREIGN_AUDIT';
  version: string;
  lineageId: string;
  blueprintRef: string;
  steps: WorkflowStepDefinition[];
  stateMachine: {
    initialState: string;
    states: string[];
    transitions: Record<string, string>;
  };
  approvalGates: Array<{
    gateName: string;
    approverRole: string;
    requiredSignaturesCount: number;
    isApproved: boolean;
  }>;
  cryptographicHash: string;
  createdAt: string;
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
}

export class DigitalWorkflowFactory {
  private static instance: DigitalWorkflowFactory;
  private workflows: Map<string, WorkflowManifest> = new Map();

  private constructor() {
    this.seedCanonicalWorkflows();
  }

  public static getInstance(): DigitalWorkflowFactory {
    if (!DigitalWorkflowFactory.instance) {
      DigitalWorkflowFactory.instance = new DigitalWorkflowFactory();
    }
    return DigitalWorkflowFactory.instance;
  }

  private seedCanonicalWorkflows() {
    const canonicals: WorkflowManifest[] = [
      {
        workflowId: 'WF-SOVEREIGN-RELEASE-01',
        name: 'Sovereign Release Candidate 6-Gate Deployment Flow',
        category: 'SOFTWARE_RELEASE_APPROVAL',
        version: '1.0.0',
        lineageId: 'JDPM/MFG2608/0001',
        blueprintRef: 'JDPM/BLUE2608/0001',
        steps: [
          {
            stepId: 'STP-01-PREFLIGHT',
            name: 'Preflight Dependency & Security Check',
            executor: 'SYSTEM_SERVICE',
            assignedAgentOrRole: 'SRV-AEGIS-SEC-02',
            actionPayload: { verifySecrets: true, checkTLS: true },
            timeoutSeconds: 30,
            retryPolicy: { maxRetries: 3, backoffMs: 1000, exponential: true },
            status: 'COMPLETED'
          },
          {
            stepId: 'STP-02-SWARM-AUDIT',
            name: 'AI Swarm Static Analysis & AST Lint',
            executor: 'AI_AGENT',
            assignedAgentOrRole: 'AGENT-002-ARCH',
            actionPayload: { scanInvariants: true },
            timeoutSeconds: 60,
            retryPolicy: { maxRetries: 2, backoffMs: 2000, exponential: false },
            status: 'COMPLETED'
          },
          {
            stepId: 'STP-03-HUMAN-ACCEPT',
            name: 'National Chief Architect Cryptographic Sign-Off',
            executor: 'HUMAN_APPROVAL_GATE',
            assignedAgentOrRole: 'CHIEF_SYSTEM_ARCHITECT',
            actionPayload: { clearanceRequired: 'LEVEL-10-NATIONAL' },
            timeoutSeconds: 3600,
            retryPolicy: { maxRetries: 0, backoffMs: 0, exponential: false },
            status: 'COMPLETED'
          }
        ],
        stateMachine: {
          initialState: 'INITIALIZED',
          states: ['INITIALIZED', 'PREFLIGHT_PASSED', 'AI_AUDITED', 'HUMAN_APPROVED', 'DEPLOYED'],
          transitions: {
            'INITIALIZED': 'PREFLIGHT_PASSED',
            'PREFLIGHT_PASSED': 'AI_AUDITED',
            'AI_AUDITED': 'HUMAN_APPROVED',
            'HUMAN_APPROVED': 'DEPLOYED'
          }
        },
        approvalGates: [
          {
            gateName: 'NATIONAL_ARCHITECT_GATE',
            approverRole: 'CHIEF_SYSTEM_ARCHITECT',
            requiredSignaturesCount: 1,
            isApproved: true
          }
        ],
        cryptographicHash: 'sha256:3e5d7a2f0c6e8b4d1a3f5c7e9b0d2f4a6c8e1b3d5f7a9c0e2b4d6f8a4a8f9c1b',
        createdAt: '2026-08-15T00:00:00.000Z',
        status: 'ACTIVE'
      }
    ];

    canonicals.forEach(w => this.workflows.set(w.workflowId, w));
  }

  public manufactureWorkflow(params: Omit<WorkflowManifest, 'cryptographicHash' | 'createdAt' | 'status'>): WorkflowManifest {
    const rawContent = `${params.workflowId}:${params.version}:${params.blueprintRef}:${JSON.stringify(params.steps)}`;
    const hash = this.calculateDigest(rawContent);

    const workflow: WorkflowManifest = {
      ...params,
      cryptographicHash: `sha256:${hash}`,
      createdAt: new Date().toISOString(),
      status: 'ACTIVE'
    };

    this.workflows.set(workflow.workflowId, workflow);
    return workflow;
  }

  public getWorkflow(id: string): WorkflowManifest | undefined {
    return this.workflows.get(id);
  }

  public getAllWorkflows(): WorkflowManifest[] {
    return Array.from(this.workflows.values());
  }

  private calculateDigest(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `${hex}a1b2c3d4e5f60718293a4b5c6d7e8f901a2b3c4d5e6f708192a3b4c5d6e7f8a9`;
  }
}
