export type EvidenceKind =
  | 'AUTOMATED_TEST'
  | 'BUILD_ARTIFACT'
  | 'RUNTIME_TELEMETRY'
  | 'SECURITY_SCAN'
  | 'INTEGRATION_TEST'
  | 'AI_ANALYSIS'
  | 'CONFIGURATION'
  | 'ARCHITECTURE'
  | 'HUMAN_REVIEW'
  | 'CLOUD_PROVISIONING';

export type EvidenceStatus =
  | 'PENDING'
  | 'COLLECTED'
  | 'VERIFIED'
  | 'REJECTED'
  | 'EXPIRED';

export type FindingSeverity =
  | 'INFO'
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'CRITICAL';

export interface VerificationEvidence {
  id: string;
  productId: string;
  verificationId?: string;
  stage: string;
  checkId: string;
  kind: EvidenceKind;
  title: string;
  description: string;
  source: string;
  status: EvidenceStatus;
  createdAt: string;
  verifiedAt?: string;
  expiresAt?: string;
  checksum?: string;
  artifactReference?: string;
  metadata: Record<string, unknown>;
}

export interface VerificationFinding {
  id: string;
  productId: string;
  evidenceId?: string;
  checkId: string;
  stage: string;
  severity: FindingSeverity;
  title: string;
  description: string;
  recommendation: string;
  status:
    | 'OPEN'
    | 'IN_PROGRESS'
    | 'RESOLVED'
    | 'ACCEPTED_RISK';
  detectedAt: string;
  resolvedAt?: string;
  resolution?: string;
}

export interface VerificationCheckExecution {
  id: string;
  productId: string;
  stage: string;
  checkId: string;
  checkName: string;
  automated: boolean;
  startedAt: string;
  completedAt?: string;
  status:
    | 'PENDING'
    | 'RUNNING'
    | 'PASSED'
    | 'FAILED'
    | 'BLOCKED';
  score: number;
  evidenceIds: string[];
  findingIds: string[];
  output?: string;
}

export interface VerificationStudioReport {
  productId: string;
  generatedAt: string;
  evidenceCount: number;
  verifiedEvidenceCount: number;
  pendingEvidenceCount: number;
  rejectedEvidenceCount: number;
  findingCount: number;
  criticalFindings: number;
  unresolvedFindings: number;
  executionCount: number;
  passedExecutions: number;
  failedExecutions: number;
  verificationReadiness: number;
  provisioningReady: boolean;
  recommendations: string[];
}

export class JumoVerificationEvidenceStudio {
  private readonly evidence =
    new Map<string, VerificationEvidence>();

  private readonly findings =
    new Map<string, VerificationFinding>();

  private readonly executions =
    new Map<string, VerificationCheckExecution>();

  registerEvidence(
    input: Omit<
      VerificationEvidence,
      'id' | 'createdAt'
    >
  ): VerificationEvidence {
    if (!input.productId.trim()) {
      throw new Error(
        'Evidence productId is required.'
      );
    }

    if (!input.stage.trim()) {
      throw new Error(
        'Evidence stage is required.'
      );
    }

    if (!input.checkId.trim()) {
      throw new Error(
        'Evidence checkId is required.'
      );
    }

    const id =
      `evidence-${input.productId}-${Date.now()}-${this.evidence.size}`;

    const item: VerificationEvidence = {
      ...input,
      id,
      createdAt:
        new Date().toISOString(),
      metadata: {
        ...input.metadata,
      },
    };

    this.evidence.set(id, item);

    return this.cloneEvidence(item);
  }

  verifyEvidence(
    id: string,
    verifier: string
  ): VerificationEvidence {
    const item = this.requireEvidence(id);

    if (!verifier.trim()) {
      throw new Error(
        'Evidence verifier is required.'
      );
    }

    item.status = 'VERIFIED';
    item.verifiedAt =
      new Date().toISOString();

    item.metadata = {
      ...item.metadata,
      verifiedBy: verifier,
    };

    return this.cloneEvidence(item);
  }

  rejectEvidence(
    id: string,
    reason: string
  ): VerificationEvidence {
    const item = this.requireEvidence(id);

    if (!reason.trim()) {
      throw new Error(
        'Evidence rejection reason is required.'
      );
    }

    item.status = 'REJECTED';

    item.metadata = {
      ...item.metadata,
      rejectionReason: reason,
    };

    return this.cloneEvidence(item);
  }

  recordFinding(
    input: Omit<
      VerificationFinding,
      'id' | 'detectedAt'
    >
  ): VerificationFinding {
    const id =
      `finding-${input.productId}-${Date.now()}-${this.findings.size}`;

    const finding: VerificationFinding = {
      ...input,
      id,
      detectedAt:
        new Date().toISOString(),
    };

    this.findings.set(id, finding);

    return this.cloneFinding(finding);
  }

  resolveFinding(
    id: string,
    resolution: string
  ): VerificationFinding {
    const finding =
      this.requireFinding(id);

    if (!resolution.trim()) {
      throw new Error(
        'Finding resolution is required.'
      );
    }

    finding.status = 'RESOLVED';
    finding.resolution = resolution;
    finding.resolvedAt =
      new Date().toISOString();

    return this.cloneFinding(finding);
  }

  executeCheck(
    input: Omit<
      VerificationCheckExecution,
      'id' | 'startedAt' | 'evidenceIds' | 'findingIds'
    > & {
      evidenceIds?: string[];
      findingIds?: string[];
    }
  ): VerificationCheckExecution {
    const id =
      `execution-${input.productId}-${Date.now()}-${this.executions.size}`;

    const execution: VerificationCheckExecution = {
      ...input,
      id,
      startedAt:
        new Date().toISOString(),
      evidenceIds: [
        ...(input.evidenceIds ?? []),
      ],
      findingIds: [
        ...(input.findingIds ?? []),
      ],
    };

    this.executions.set(id, execution);

    return this.cloneExecution(execution);
  }

  completeCheck(
    id: string,
    result: {
      status:
        | 'PASSED'
        | 'FAILED'
        | 'BLOCKED';
      score: number;
      output?: string;
      evidenceIds?: string[];
      findingIds?: string[];
    }
  ): VerificationCheckExecution {
    const execution =
      this.requireExecution(id);

    execution.status = result.status;
    execution.score =
      Math.max(
        0,
        Math.min(100, result.score)
      );

    execution.completedAt =
      new Date().toISOString();

    if (result.output !== undefined) {
      execution.output = result.output;
    }

    if (result.evidenceIds) {
      execution.evidenceIds = [
        ...result.evidenceIds,
      ];
    }

    if (result.findingIds) {
      execution.findingIds = [
        ...result.findingIds,
      ];
    }

    return this.cloneExecution(execution);
  }

  getEvidence(
    id: string
  ): VerificationEvidence {
    return this.cloneEvidence(
      this.requireEvidence(id)
    );
  }

  getFinding(
    id: string
  ): VerificationFinding {
    return this.cloneFinding(
      this.requireFinding(id)
    );
  }

  listEvidence(
    productId?: string
  ): VerificationEvidence[] {
    return Array.from(
      this.evidence.values()
    )
      .filter(
        (item) =>
          !productId ||
          item.productId === productId
      )
      .map((item) =>
        this.cloneEvidence(item)
      );
  }

  listFindings(
    productId?: string
  ): VerificationFinding[] {
    return Array.from(
      this.findings.values()
    )
      .filter(
        (item) =>
          !productId ||
          item.productId === productId
      )
      .map((item) =>
        this.cloneFinding(item)
      );
  }

  listExecutions(
    productId?: string
  ): VerificationCheckExecution[] {
    return Array.from(
      this.executions.values()
    )
      .filter(
        (item) =>
          !productId ||
          item.productId === productId
      )
      .map((item) =>
        this.cloneExecution(item)
      );
  }

  report(
    productId: string
  ): VerificationStudioReport {
    const evidence =
      this.listEvidence(productId);

    const findings =
      this.listFindings(productId);

    const executions =
      this.listExecutions(productId);

    const verifiedEvidence =
      evidence.filter(
        (item) =>
          item.status === 'VERIFIED'
      ).length;

    const pendingEvidence =
      evidence.filter(
        (item) =>
          item.status === 'PENDING' ||
          item.status === 'COLLECTED'
      ).length;

    const rejectedEvidence =
      evidence.filter(
        (item) =>
          item.status === 'REJECTED'
      ).length;

    const unresolvedFindings =
      findings.filter(
        (item) =>
          item.status === 'OPEN' ||
          item.status === 'IN_PROGRESS'
      ).length;

    const criticalFindings =
      findings.filter(
        (item) =>
          item.severity === 'CRITICAL' &&
          item.status !== 'RESOLVED' &&
          item.status !== 'ACCEPTED_RISK'
      ).length;

    const passedExecutions =
      executions.filter(
        (item) =>
          item.status === 'PASSED'
      ).length;

    const failedExecutions =
      executions.filter(
        (item) =>
          item.status === 'FAILED'
      ).length;

    const evidenceScore =
      evidence.length === 0
        ? 0
        : (
            verifiedEvidence /
            evidence.length
          ) * 100;

    const executionScore =
      executions.length === 0
        ? 0
        : executions.reduce(
            (sum, item) =>
              sum + item.score,
            0
          ) / executions.length;

    const findingPenalty =
      Math.min(
        100,
        unresolvedFindings * 5 +
          criticalFindings * 25
      );

    const verificationReadiness =
      Math.max(
        0,
        Math.round(
          (
            evidenceScore * 0.35 +
            executionScore * 0.45 +
            (100 - findingPenalty) *
              0.20
          )
        )
      );

    const provisioningReady =
      verificationReadiness >= 95 &&
      criticalFindings === 0 &&
      unresolvedFindings === 0 &&
      failedExecutions === 0 &&
      evidence.length > 0;

    const recommendations: string[] = [];

    if (pendingEvidence > 0) {
      recommendations.push(
        'Collect and verify all pending evidence.'
      );
    }

    if (rejectedEvidence > 0) {
      recommendations.push(
        'Replace rejected evidence with valid evidence.'
      );
    }

    if (unresolvedFindings > 0) {
      recommendations.push(
        'Resolve all open verification findings.'
      );
    }

    if (criticalFindings > 0) {
      recommendations.push(
        'Critical findings block provisioning.'
      );
    }

    if (failedExecutions > 0) {
      recommendations.push(
        'Re-run failed automated verification checks after remediation.'
      );
    }

    if (provisioningReady) {
      recommendations.push(
        'Verification evidence is sufficient for controlled provisioning.'
      );
    } else {
      recommendations.push(
        'Do not bypass the verification gate.'
      );
    }

    return {
      productId,
      generatedAt:
        new Date().toISOString(),
      evidenceCount:
        evidence.length,
      verifiedEvidenceCount:
        verifiedEvidence,
      pendingEvidenceCount:
        pendingEvidence,
      rejectedEvidenceCount:
        rejectedEvidence,
      findingCount:
        findings.length,
      criticalFindings,
      unresolvedFindings,
      executionCount:
        executions.length,
      passedExecutions,
      failedExecutions,
      verificationReadiness,
      provisioningReady,
      recommendations,
    };
  }

  status() {
    return {
      evidence: this.evidence.size,
      findings: this.findings.size,
      executions: this.executions.size,
      products: new Set(
        [
          ...Array.from(
            this.evidence.values()
          ).map(
            (item) =>
              item.productId
          ),
          ...Array.from(
            this.findings.values()
          ).map(
            (item) =>
              item.productId
          ),
        ]
      ).size,
    };
  }

  private requireEvidence(
    id: string
  ): VerificationEvidence {
    const item =
      this.evidence.get(id);

    if (!item) {
      throw new Error(
        `Verification evidence not found: ${id}`
      );
    }

    return item;
  }

  private requireFinding(
    id: string
  ): VerificationFinding {
    const item =
      this.findings.get(id);

    if (!item) {
      throw new Error(
        `Verification finding not found: ${id}`
      );
    }

    return item;
  }

  private requireExecution(
    id: string
  ): VerificationCheckExecution {
    const item =
      this.executions.get(id);

    if (!item) {
      throw new Error(
        `Verification execution not found: ${id}`
      );
    }

    return item;
  }

  private cloneEvidence(
    item: VerificationEvidence
  ): VerificationEvidence {
    return {
      ...item,
      metadata: {
        ...item.metadata,
      },
    };
  }

  private cloneFinding(
    item: VerificationFinding
  ): VerificationFinding {
    return {
      ...item,
    };
  }

  private cloneExecution(
    item: VerificationCheckExecution
  ): VerificationCheckExecution {
    return {
      ...item,
      evidenceIds: [
        ...item.evidenceIds,
      ],
      findingIds: [
        ...item.findingIds,
      ],
    };
  }
}

export const jumoVerificationEvidenceStudio =
  new JumoVerificationEvidenceStudio();
