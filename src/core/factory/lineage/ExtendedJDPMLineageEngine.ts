// JUMO UEOS — Extended 14-Stage JDPM Lineage Engine
// Standard: JDPM-LINEAGE-1400 Extended Provenance Chain
// Connects SPEC -> ARCH -> BLUE -> DESIGN -> MFG -> CONFIG -> VER -> CERT -> REL -> DEPLOY -> COMMISSION -> OPERATE -> UPGRADE -> RETIRE

import { ProductManufacturingJob } from '../registry/HubRegistryTypes';

export interface ExtendedLineageNode {
  stageCode: string;
  stageName: string;
  sequence: number;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'SKIPPED';
  artifactHash: string;
  timestamp?: string;
  signedBy?: string;
}

export class ExtendedJDPMLineageEngine {
  private static instance: ExtendedJDPMLineageEngine;

  private constructor() {}

  public static getInstance(): ExtendedJDPMLineageEngine {
    if (!ExtendedJDPMLineageEngine.instance) {
      ExtendedJDPMLineageEngine.instance = new ExtendedJDPMLineageEngine();
    }
    return ExtendedJDPMLineageEngine.instance;
  }

  public getExtendedLineage(job: ProductManufacturingJob): ExtendedLineageNode[] {
    const isCompleted = job.status === 'COMPLETED';
    const isVerified = isCompleted || job.status === 'AWAITING_HUMAN_MANUFACTURING_APPROVAL';

    return [
      {
        stageCode: 'SPEC',
        stageName: '01. Specification Normalization',
        sequence: 1,
        status: 'COMPLETED',
        artifactHash: 'SHA256-SPEC-ATUTUR-91F2',
        timestamp: job.createdAt,
        signedBy: job.operatorName || 'National Chief Governor'
      },
      {
        stageCode: 'ARCH',
        stageName: '02. Architecture Contract Lock',
        sequence: 2,
        status: 'COMPLETED',
        artifactHash: 'SHA256-ARCH-ATUTUR-882B',
        timestamp: job.createdAt,
        signedBy: 'Chief System Architect'
      },
      {
        stageCode: 'BLUE',
        stageName: '03. Blueprint Decomposition',
        sequence: 3,
        status: 'COMPLETED',
        artifactHash: 'SHA256-BLUE-ATUTUR-4401',
        timestamp: job.createdAt,
        signedBy: 'Sovereign Governance Board'
      },
      {
        stageCode: 'DESIGN',
        stageName: '04. Detailed System Design',
        sequence: 4,
        status: 'COMPLETED',
        artifactHash: 'SHA256-DESIGN-ATUTUR-312A',
        timestamp: job.createdAt,
        signedBy: 'Lead Solution Architect'
      },
      {
        stageCode: 'MFG',
        stageName: '05. Component Manufacturing',
        sequence: 5,
        status: 'COMPLETED',
        artifactHash: 'SHA256-MFG-ATUTUR-7730',
        timestamp: job.createdAt,
        signedBy: 'Cognitive Workforce'
      },
      {
        stageCode: 'CONFIG',
        stageName: '06. Tenant Configuration Lock',
        sequence: 6,
        status: 'COMPLETED',
        artifactHash: 'SHA256-CONFIG-ATUTUR-104B',
        timestamp: job.createdAt,
        signedBy: 'Configuration Specialist'
      },
      {
        stageCode: 'VER',
        stageName: '07. 20-Gate Verification Suite',
        sequence: 7,
        status: isVerified ? 'COMPLETED' : 'IN_PROGRESS',
        artifactHash: 'SHA256-VER-ATUTUR-900A',
        timestamp: job.updatedAt,
        signedBy: 'Verification Engineer'
      },
      {
        stageCode: 'CERT',
        stageName: '08. Sovereign Certification',
        sequence: 8,
        status: isCompleted ? 'COMPLETED' : 'PENDING',
        artifactHash: isCompleted ? 'SHA256-CERT-ATUTUR-001F' : 'HASH_PENDING',
        signedBy: 'National Chief Governor'
      },
      {
        stageCode: 'REL',
        stageName: '09. Release Candidate Seal',
        sequence: 9,
        status: isCompleted ? 'COMPLETED' : 'PENDING',
        artifactHash: 'HASH_PENDING'
      },
      {
        stageCode: 'DEPLOY',
        stageName: '10. Provisioning & Deployment',
        sequence: 10,
        status: isCompleted ? 'COMPLETED' : 'PENDING',
        artifactHash: 'HASH_PENDING'
      },
      {
        stageCode: 'COMMISSION',
        stageName: '11. Institutional Commissioning',
        sequence: 11,
        status: 'PENDING',
        artifactHash: 'HASH_PENDING'
      },
      {
        stageCode: 'OPERATE',
        stageName: '12. Operations & Telemetry',
        sequence: 12,
        status: 'PENDING',
        artifactHash: 'HASH_PENDING'
      },
      {
        stageCode: 'UPGRADE',
        stageName: '13. Governed Upgrade Cycle',
        sequence: 13,
        status: 'PENDING',
        artifactHash: 'HASH_PENDING'
      },
      {
        stageCode: 'RETIRE',
        stageName: '14. Sealed Archival & Retirement',
        sequence: 14,
        status: 'PENDING',
        artifactHash: 'HASH_PENDING'
      }
    ];
  }
}
