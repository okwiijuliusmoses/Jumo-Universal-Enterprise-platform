export type AcceptanceStage =
  | 'SPECIFICATION'
  | 'AI_SPECIFICATION'
  | 'ARCHITECTURE'
  | 'ARCHITECTURE_IMPLEMENTATION'
  | 'APPLICATION_BUILDING'
  | 'APPLICATION_ASSEMBLY'
  | 'FUNCTIONAL_TEST_A'
  | 'RESILIENCE_TEST_B'
  | 'SECURITY'
  | 'INTEGRATION'
  | 'QUALITY'
  | 'CLOUD_PROVISIONING'
  | 'FINAL_ACCEPTANCE';

export type AcceptanceResult =
  | 'PENDING'
  | 'PASSED'
  | 'FAILED'
  | 'BLOCKED'
  | 'WAIVED';

export interface AcceptanceEvidence {
  id: string;
  stage: AcceptanceStage;
  sourceId: string;
  title: string;
  description: string;
  result: AcceptanceResult;
  evidenceReference?: string;
  verifiedAt?: string;
  verifiedBy?: string;
  findings: string[];
}

export interface FinalAcceptanceRecord {
  id: string;
  productId: string;
  createdAt: string;
  status: AcceptanceResult;
  evidence: AcceptanceEvidence[];
  mandatoryStages: AcceptanceStage[];
  completedStages: AcceptanceStage[];
  missingStages: AcceptanceStage[];
  failedStages: AcceptanceStage[];
  blockedStages: AcceptanceStage[];
  score: number;
  recommendations: string[];
  provisioningAllowed: boolean;
  retirementAllowed: boolean;
}

export interface FinalAcceptanceRequest {
  productId: string;
  evidence?: Array<{
    id: string;
    stage: AcceptanceStage;
    sourceId: string;
    title: string;
    description?: string;
    result: AcceptanceResult;
    evidenceReference?: string;
    verifiedBy?: string;
    findings?: string[];
  }>;
}

export class JumoFinalAcceptanceGate {
  private readonly records =
    new Map<string, FinalAcceptanceRecord>();

  private readonly mandatoryStages: AcceptanceStage[] = [
    'SPECIFICATION',
    'AI_SPECIFICATION',
    'ARCHITECTURE',
    'ARCHITECTURE_IMPLEMENTATION',
    'APPLICATION_BUILDING',
    'APPLICATION_ASSEMBLY',
    'FUNCTIONAL_TEST_A',
    'RESILIENCE_TEST_B',
    'SECURITY',
    'INTEGRATION',
    'QUALITY',
    'CLOUD_PROVISIONING',
  ];

  create(
    request: FinalAcceptanceRequest
  ): FinalAcceptanceRecord {
    if (!request.productId.trim()) {
      throw new Error('Product ID is required.');
    }

    const id =
      `final-acceptance-${request.productId}-${Date.now()}`;

    const evidence: AcceptanceEvidence[] =
      (request.evidence ?? []).map((item) => ({
        id: item.id,
        stage: item.stage,
        sourceId: item.sourceId,
        title: item.title,
        description: item.description ?? '',
        result: item.result,
        evidenceReference:
          item.evidenceReference,
        verifiedAt:
          item.result === 'PASSED'
            ? new Date().toISOString()
            : undefined,
        verifiedBy: item.verifiedBy,
        findings: [
          ...(item.findings ?? []),
        ],
      }));

    const record: FinalAcceptanceRecord = {
      id,
      productId: request.productId,
      createdAt: new Date().toISOString(),
      status: 'PENDING',
      evidence,
      mandatoryStages: [
        ...this.mandatoryStages,
      ],
      completedStages: [],
      missingStages: [],
      failedStages: [],
      blockedStages: [],
      score: 0,
      recommendations: [],
      provisioningAllowed: false,
      retirementAllowed: false,
    };

    this.records.set(id, record);

    this.evaluate(record);

    return this.get(id);
  }

  get(id: string): FinalAcceptanceRecord {
    const record = this.records.get(id);

    if (!record) {
      throw new Error(
        `Final acceptance record not found: ${id}`
      );
    }

    return this.clone(record);
  }

  list(): FinalAcceptanceRecord[] {
    return Array.from(
      this.records.values()
    ).map((record) =>
      this.clone(record)
    );
  }

  registerEvidence(
    id: string,
    evidence: Omit<
      AcceptanceEvidence,
      'verifiedAt'
    >
  ): FinalAcceptanceRecord {
    const record = this.requireMutable(id);

    const existingIndex =
      record.evidence.findIndex(
        (item) => item.id === evidence.id
      );

    const normalized: AcceptanceEvidence = {
      ...evidence,
      findings: [
        ...evidence.findings,
      ],
      verifiedAt:
        evidence.result === 'PASSED'
          ? new Date().toISOString()
          : undefined,
    };

    if (existingIndex >= 0) {
      record.evidence[
        existingIndex
      ] = normalized;
    } else {
      record.evidence.push(normalized);
    }

    this.evaluate(record);

    return this.get(id);
  }

  waiveStage(
    id: string,
    stage: AcceptanceStage,
    reason: string,
    approvedBy: string
  ): FinalAcceptanceRecord {
    const record = this.requireMutable(id);

    if (!reason.trim()) {
      throw new Error(
        'Waiver reason is required.'
      );
    }

    if (!approvedBy.trim()) {
      throw new Error(
        'Waiver approver is required.'
      );
    }

    const waiver: AcceptanceEvidence = {
      id:
        `waiver-${stage}-${Date.now()}`,
      stage,
      sourceId: 'acceptance-gate',
      title:
        `Approved waiver: ${stage}`,
      description: reason,
      result: 'WAIVED',
      verifiedAt:
        new Date().toISOString(),
      verifiedBy: approvedBy,
      findings: [
        `Stage waived by ${approvedBy}: ${reason}`,
      ],
    };

    record.evidence.push(waiver);

    this.evaluate(record);

    return this.get(id);
  }

  evaluateRecord(
    id: string
  ): FinalAcceptanceRecord {
    const record = this.requireMutable(id);

    this.evaluate(record);

    return this.get(id);
  }

  canProvision(
    id: string
  ): boolean {
    const record = this.requireMutable(id);

    this.evaluate(record);

    return record.provisioningAllowed;
  }

  canRetire(
    id: string
  ): boolean {
    const record = this.requireMutable(id);

    this.evaluate(record);

    return record.retirementAllowed;
  }

  status() {
    const records = this.list();

    return {
      recordCount: records.length,
      pending: records.filter(
        (record) =>
          record.status === 'PENDING'
      ).length,
      passed: records.filter(
        (record) =>
          record.status === 'PASSED'
      ).length,
      failed: records.filter(
        (record) =>
          record.status === 'FAILED'
      ).length,
      blocked: records.filter(
        (record) =>
          record.status === 'BLOCKED'
      ).length,
      provisioningAllowed: records.filter(
        (record) =>
          record.provisioningAllowed
      ).length,
      retirementAllowed: records.filter(
        (record) =>
          record.retirementAllowed
      ).length,
    };
  }

  remove(id: string): boolean {
    return this.records.delete(id);
  }

  private evaluate(
    record: FinalAcceptanceRecord
  ): void {
    const completed = new Set<AcceptanceStage>();
    const failed = new Set<AcceptanceStage>();
    const blocked = new Set<AcceptanceStage>();
    const waived = new Set<AcceptanceStage>();

    for (const evidence of record.evidence) {
      if (evidence.result === 'PASSED') {
        completed.add(evidence.stage);
      }

      if (evidence.result === 'FAILED') {
        failed.add(evidence.stage);
      }

      if (evidence.result === 'BLOCKED') {
        blocked.add(evidence.stage);
      }

      if (evidence.result === 'WAIVED') {
        waived.add(evidence.stage);
      }
    }

    record.completedStages =
      Array.from(completed);

    record.failedStages =
      Array.from(failed);

    record.blockedStages =
      Array.from(blocked);

    record.missingStages =
      this.mandatoryStages.filter(
        (stage) =>
          !completed.has(stage) &&
          !waived.has(stage)
      );

    const mandatoryCount =
      this.mandatoryStages.length;

    const successfulCount =
      this.mandatoryStages.filter(
        (stage) =>
          completed.has(stage) ||
          waived.has(stage)
      ).length;

    record.score =
      mandatoryCount === 0
        ? 0
        : Math.round(
            (successfulCount /
              mandatoryCount) *
              100
          );

    record.provisioningAllowed =
      record.missingStages.length === 0 &&
      record.failedStages.length === 0 &&
      record.blockedStages.length === 0;

    if (
      record.provisioningAllowed
    ) {
      record.status = 'PASSED';

      record.recommendations = [
        'All mandatory acceptance stages have verified evidence.',
        'Product may proceed through the controlled provisioning gate.',
        'Continue lifecycle monitoring after provisioning.',
      ];
    } else if (
      record.failedStages.length > 0
    ) {
      record.status = 'FAILED';

      record.recommendations = [
        'Correct every failed acceptance stage.',
        'Replace stale evidence with new verified evidence.',
        'Re-run final acceptance evaluation.',
      ];
    } else if (
      record.blockedStages.length > 0 ||
      record.missingStages.length > 0
    ) {
      record.status = 'BLOCKED';

      record.recommendations = [
        'Complete every missing mandatory verification stage.',
        'Resolve every blocked stage.',
        'Do not provision an application with incomplete acceptance evidence.',
      ];
    } else {
      record.status = 'PENDING';
      record.recommendations = [
        'Continue collecting acceptance evidence.',
      ];
    }

    record.retirementAllowed =
      record.status === 'PASSED';
  }

  private requireMutable(
    id: string
  ): FinalAcceptanceRecord {
    const record = this.records.get(id);

    if (!record) {
      throw new Error(
        `Final acceptance record not found: ${id}`
      );
    }

    return record;
  }

  private clone(
    record: FinalAcceptanceRecord
  ): FinalAcceptanceRecord {
    return {
      ...record,
      mandatoryStages: [
        ...record.mandatoryStages,
      ],
      completedStages: [
        ...record.completedStages,
      ],
      missingStages: [
        ...record.missingStages,
      ],
      failedStages: [
        ...record.failedStages,
      ],
      blockedStages: [
        ...record.blockedStages,
      ],
      evidence: record.evidence.map(
        (item) => ({
          ...item,
          findings: [
            ...item.findings,
          ],
        })
      ),
      recommendations: [
        ...record.recommendations,
      ],
    };
  }
}

export const jumoFinalAcceptanceGate =
  new JumoFinalAcceptanceGate();
