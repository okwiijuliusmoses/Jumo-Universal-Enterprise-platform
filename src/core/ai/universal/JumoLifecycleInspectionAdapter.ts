import type {
  IntelligenceEvidence,
  IntelligenceRequest,
  JumoInspectionAdapter,
} from './JumoUniversalIntelligence';

import {
  jumoApplicationLifecycle,
} from '../../lifecycle/JumoApplicationLifecycle';

export class JumoLifecycleInspectionAdapter
  implements JumoInspectionAdapter
{
  async inspect(
    request: IntelligenceRequest
  ): Promise<IntelligenceEvidence[]> {
    const applicationId =
      request.subject?.id;

    if (!applicationId) {
      return [
        {
          id: `lifecycle-${request.requestId}`,
          source: 'ARCHITECTURE_REGISTRY',
          status: 'NOT_FOUND',
          observation:
            'No application subject was supplied for lifecycle inspection.',
          timestamp: new Date().toISOString(),
        },
      ];
    }

    const record =
      jumoApplicationLifecycle.get(applicationId);

    if (!record) {
      return [
        {
          id: `lifecycle-${request.requestId}`,
          source: 'ARCHITECTURE_REGISTRY',
          status: 'NOT_FOUND',
          observation:
            `No lifecycle record is registered for application ${applicationId}.`,
          timestamp: new Date().toISOString(),
          metadata: {
            applicationId,
          },
        },
      ];
    }

    return [
      {
        id: `lifecycle-${request.requestId}`,
        source: 'ARCHITECTURE_REGISTRY',
        status: 'VERIFIED',
        observation:
          `Application ${record.applicationName} is currently at ${record.currentStage} with overall lifecycle status ${record.overallStatus}.`,
        timestamp: new Date().toISOString(),
        metadata: {
          applicationId: record.applicationId,
          version: record.version,
          currentStage: record.currentStage,
          overallStatus: record.overallStatus,
          stages: record.stages,
        },
      },
    ];
  }
}
