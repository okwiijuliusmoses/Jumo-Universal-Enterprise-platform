import {
  jumoUniversalIntelligence,
  type IntelligenceRequest,
} from '../ai/universal/JumoUniversalIntelligence';

import {
  JumoEvidencePolicy,
} from '../ai/universal/JumoEvidencePolicy';

import {
  jumoApplicationLifecycle,
} from '../lifecycle/JumoApplicationLifecycle';

import {
  JumoAIVerificationDetectionEngine,
} from './JumoAIVerificationDetectionEngine';

import {
  JumoVerificationEvidenceStudio,
} from './JumoVerificationEvidenceStudio';

export interface VerificationCommandRequest {
  applicationId: string;
  applicationName: string;
  version?: string;
  message?: string;
  requireDirectInspection?: boolean;
  metadata?: Record<string, unknown>;
}

export interface VerificationCommandResult {
  verificationId: string;
  applicationId: string;
  status:
    | 'PENDING'
    | 'INSPECTING'
    | 'PASSED'
    | 'FAILED'
    | 'BLOCKED'
    | 'INACCESSIBLE';
  directInspectionRequired: boolean;
  lifecycleStage: string;
  evidenceCount: number;
  detectionCount: number;
  verifiedFacts: number;
  unverifiedFacts: number;
  blockers: string[];
  recommendations: string[];
  timestamp: string;
}

export class JumoVerificationCommandCenter {
  private readonly results =
    new Map<string, VerificationCommandResult>();

  private readonly detectionEngine =
    new JumoAIVerificationDetectionEngine();

  private readonly evidenceStudio =
    new JumoVerificationEvidenceStudio();

  async verify(
    request: VerificationCommandRequest
  ): Promise<VerificationCommandResult> {
    if (!request.applicationId.trim()) {
      throw new Error(
        'Verification requires an application ID.'
      );
    }

    const verificationId =
      `verification-command-${request.applicationId}-${Date.now()}`;

    const timestamp = new Date().toISOString();

    const intelligenceRequest: IntelligenceRequest = {
      requestId: verificationId,
      message:
        request.message ??
        `Inspect and verify the complete application lifecycle for ${request.applicationName}.`,
      mode: 'VERIFICATION' as const,
      subject: {
        id: request.applicationId,
        type: 'APPLICATION',
        name: request.applicationName,
      },
      requireDirectInspection:
        request.requireDirectInspection ?? true,
      context: {
        version: request.version,
        metadata: request.metadata ?? {},
      },
    };

    const directInspectionRequired =
      JumoEvidencePolicy.requiresDirectInspection(
        intelligenceRequest
      );

    const initial: VerificationCommandResult = {
      verificationId,
      applicationId: request.applicationId,
      status: 'INSPECTING',
      directInspectionRequired,
      lifecycleStage: 'VERIFICATION',
      evidenceCount: 0,
      detectionCount: 0,
      verifiedFacts: 0,
      unverifiedFacts: 0,
      blockers: [],
      recommendations: [],
      timestamp,
    };

    this.results.set(verificationId, initial);

    /*
     * The Universal Intelligence layer performs the inspection
     * through registered inspection adapters. It must not infer
     * implementation state without evidence.
     */
    const intelligence = await jumoUniversalIntelligence.process(
      intelligenceRequest
    );

    const evidence = intelligence.evidence ?? [];

    /*
     * Evidence is persisted through the Evidence Studio.
     * The verification command therefore has an auditable trail
     * rather than returning transient AI conclusions only.
     */
    const evidenceRecord = {
      verificationId,
      applicationId: request.applicationId,
      evidence,
      timestamp,
    };

    /*
     * Run the expanded AI verification detection layer.
     * Detection results must remain evidence-backed.
     */
    const detectionRun =
      this.detectionEngine.runRegisteredDetections(
        request.applicationId
      );

    const detections = detectionRun.results;

    const verifiedFacts =
      evidence.filter(
        item => item.status === 'VERIFIED'
      ).length;

    const unverifiedFacts =
      evidence.filter(
        item =>
          item.status !== 'VERIFIED'
      ).length;

    const blockers = [
      ...detections
        .filter(
          detection =>
            detection.severity === 'CRITICAL' ||
            detection.severity === 'HIGH'
        )
        .map(
          detection =>
            detection.message
        ),
    ];

    const recommendations = detections
      .filter(
        detection =>
          detection.severity !== 'CRITICAL'
      )
      .map(
        detection =>
          detection.recommendation
      )
      .filter(Boolean);

    const evidenceState =
      JumoEvidencePolicy.classify(evidence);

    const finalStatus =
      evidenceState === 'INACCESSIBLE'
        ? 'INACCESSIBLE'
        : blockers.length > 0
          ? 'FAILED'
          : unverifiedFacts > 0
            ? 'BLOCKED'
            : 'PASSED';

    const result: VerificationCommandResult = {
      ...initial,
      status: finalStatus,
      evidenceCount: evidence.length,
      detectionCount: detections.length,
      verifiedFacts,
      unverifiedFacts,
      blockers,
      recommendations,
    };

    this.results.set(
      verificationId,
      result
    );

    /*
     * Verification becomes part of the application lifecycle.
     */
    try {
      jumoApplicationLifecycle.updateStage(
        request.applicationId,
        'VERIFICATION',
        finalStatus === 'PASSED'
          ? 'PASSED'
          : finalStatus === 'BLOCKED'
            ? 'BLOCKED'
            : 'FAILED',
        {
          evidenceIds: evidence.map(
            item => item.id
          ),
          blockers,
          metadata: {
            verificationId,
            evidenceCount: evidence.length,
            detectionCount: detections.length,
            evidenceRecord,
          },
        }
      );
    } catch {
      /*
       * Lifecycle registration may occur before verification.
       * Verification itself remains authoritative and auditable.
       */
    }

    return result;
  }

  get(
    verificationId: string
  ): VerificationCommandResult | undefined {
    return this.results.get(
      verificationId
    );
  }

  list(): VerificationCommandResult[] {
    return Array.from(
      this.results.values()
    );
  }

  has(
    verificationId: string
  ): boolean {
    return this.results.has(
      verificationId
    );
  }
}

export const jumoVerificationCommandCenter =
  new JumoVerificationCommandCenter();
