export type JumoApplicationLifecycleStage =
  | 'SPECIFICATION'
  | 'ARCHITECTURE'
  | 'DESIGN'
  | 'IMPLEMENTATION'
  | 'BUILD'
  | 'TESTING'
  | 'VERIFICATION'
  | 'ACCEPTANCE'
  | 'PROVISIONING'
  | 'OPERATIONS'
  | 'UPGRADE'
  | 'ARCHIVE'
  | 'RETIREMENT';

export type JumoLifecycleStatus =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'READY'
  | 'BLOCKED'
  | 'PASSED'
  | 'FAILED'
  | 'ARCHIVED'
  | 'RETIRED';

export interface JumoLifecycleStage {
  id: string;
  stage: JumoApplicationLifecycleStage;
  status: JumoLifecycleStatus;
  startedAt?: string;
  completedAt?: string;
  blockers: string[];
  evidenceIds: string[];
  metadata: Record<string, unknown>;
}

export interface JumoApplicationLifecycleRecord {
  applicationId: string;
  applicationName: string;
  version?: string;
  currentStage: JumoApplicationLifecycleStage;
  overallStatus: JumoLifecycleStatus;
  stages: JumoLifecycleStage[];
  createdAt: string;
  updatedAt: string;
}

const ORDER: JumoApplicationLifecycleStage[] = [
  'SPECIFICATION',
  'ARCHITECTURE',
  'DESIGN',
  'IMPLEMENTATION',
  'BUILD',
  'TESTING',
  'VERIFICATION',
  'ACCEPTANCE',
  'PROVISIONING',
  'OPERATIONS',
  'UPGRADE',
  'ARCHIVE',
  'RETIREMENT',
];

export class JumoApplicationLifecycle {
  private readonly records = new Map<
    string,
    JumoApplicationLifecycleRecord
  >();

  create(
    applicationId: string,
    applicationName: string,
    version?: string
  ): JumoApplicationLifecycleRecord {
    if (!applicationId.trim()) {
      throw new Error(
        'Application lifecycle requires an application ID.'
      );
    }

    const now = new Date().toISOString();

    const stages: JumoLifecycleStage[] = ORDER.map(
      stage => ({
        id: `${applicationId}-${stage.toLowerCase()}`,
        stage,
        status:
          stage === 'SPECIFICATION'
            ? 'IN_PROGRESS'
            : 'NOT_STARTED',
        blockers: [],
        evidenceIds: [],
        metadata: {},
      })
    );

    const record: JumoApplicationLifecycleRecord = {
      applicationId,
      applicationName,
      version,
      currentStage: 'SPECIFICATION',
      overallStatus: 'IN_PROGRESS',
      stages,
      createdAt: now,
      updatedAt: now,
    };

    this.records.set(applicationId, record);

    return record;
  }

  get(
    applicationId: string
  ): JumoApplicationLifecycleRecord | undefined {
    return this.records.get(applicationId);
  }

  require(
    applicationId: string
  ): JumoApplicationLifecycleRecord {
    const record = this.get(applicationId);

    if (!record) {
      throw new Error(
        `Application lifecycle not found: ${applicationId}`
      );
    }

    return record;
  }

  updateStage(
    applicationId: string,
    stage: JumoApplicationLifecycleStage,
    status: JumoLifecycleStatus,
    options?: {
      blockers?: string[];
      evidenceIds?: string[];
      metadata?: Record<string, unknown>;
    }
  ): JumoApplicationLifecycleRecord {
    const record = this.require(applicationId);
    const target = record.stages.find(
      item => item.stage === stage
    );

    if (!target) {
      throw new Error(
        `Lifecycle stage not found: ${stage}`
      );
    }

    target.status = status;

    if (status === 'IN_PROGRESS' && !target.startedAt) {
      target.startedAt = new Date().toISOString();
    }

    if (
      status === 'PASSED' ||
      status === 'FAILED' ||
      status === 'ARCHIVED' ||
      status === 'RETIRED'
    ) {
      target.completedAt = new Date().toISOString();
    }

    if (options?.blockers) {
      target.blockers = [...options.blockers];
    }

    if (options?.evidenceIds) {
      target.evidenceIds = [...options.evidenceIds];
    }

    if (options?.metadata) {
      target.metadata = {
        ...target.metadata,
        ...options.metadata,
      };
    }

    this.recalculate(record);

    return record;
  }

  addEvidence(
    applicationId: string,
    stage: JumoApplicationLifecycleStage,
    evidenceId: string
  ): JumoApplicationLifecycleRecord {
    const record = this.require(applicationId);

    const target = record.stages.find(
      item => item.stage === stage
    );

    if (!target) {
      throw new Error(
        `Lifecycle stage not found: ${stage}`
      );
    }

    if (!target.evidenceIds.includes(evidenceId)) {
      target.evidenceIds.push(evidenceId);
    }

    record.updatedAt = new Date().toISOString();

    return record;
  }

  list(): JumoApplicationLifecycleRecord[] {
    return Array.from(this.records.values());
  }

  private recalculate(
    record: JumoApplicationLifecycleRecord
  ): void {
    const failed = record.stages.some(
      stage => stage.status === 'FAILED'
    );

    const blocked = record.stages.some(
      stage =>
        stage.status === 'BLOCKED' ||
        stage.blockers.length > 0
    );

    if (failed) {
      record.overallStatus = 'FAILED';
    } else if (blocked) {
      record.overallStatus = 'BLOCKED';
    } else if (
      record.stages.every(
        stage =>
          stage.status === 'PASSED' ||
          stage.status === 'ARCHIVED' ||
          stage.status === 'RETIRED'
      )
    ) {
      record.overallStatus = 'READY';
    } else {
      record.overallStatus = 'IN_PROGRESS';
    }

    const current =
      record.stages.find(
        stage =>
          stage.status === 'IN_PROGRESS' ||
          stage.status === 'BLOCKED'
      ) ??
      record.stages.find(
        stage => stage.status === 'NOT_STARTED'
      );

    if (current) {
      record.currentStage = current.stage;
    }

    record.updatedAt = new Date().toISOString();
  }
}

export const jumoApplicationLifecycle =
  new JumoApplicationLifecycle();
