import { JumoRepositoryWorkspace } from './JumoRepositoryWorkspace';
import { JumoRepositoryArtifactRegistry } from './JumoRepositoryArtifactRegistry';
import { JumoRepositoryEvidenceBridge } from './JumoRepositoryEvidenceBridge';

export interface JumoRepositoryInspection {
  repositoryId: string;
  inspectedAt: string;
  artifactCount: number;
  commitCount: number;
  missingPaths: string[];
  warnings: string[];
  blockers: string[];
  recommendation: string;
  readyForUpgrade: boolean;
}

export class JumoRepositoryAIInspector {
  constructor(
    private readonly workspace: JumoRepositoryWorkspace,
    private readonly artifacts: JumoRepositoryArtifactRegistry,
    private readonly evidence: JumoRepositoryEvidenceBridge
  ) {}

  inspect(
    repositoryId: string,
    requiredPaths: string[] = []
  ): JumoRepositoryInspection {
    const repositoryArtifacts =
      this.workspace.listArtifacts(
        repositoryId
      );

    const knownPaths = new Set(
      repositoryArtifacts.map(
        artifact => artifact.path
      )
    );

    const missingPaths =
      requiredPaths.filter(
        path => !knownPaths.has(path)
      );

    const warnings: string[] = [];

    if (repositoryArtifacts.length === 0) {
      warnings.push(
        'Repository contains no registered application artifacts.'
      );
    }

    const blockers: string[] = [];

    if (
      this.evidence.hasBlockingFailure(
        repositoryId
      )
    ) {
      blockers.push(
        'Repository has unresolved verification evidence failures.'
      );
    }

    if (missingPaths.length > 0) {
      blockers.push(
        'Required repository artifacts are missing.'
      );
    }

    return {
      repositoryId,
      inspectedAt:
        new Date().toISOString(),
      artifactCount:
        repositoryArtifacts.length,
      commitCount:
        this.workspace.listCommits(
          repositoryId
        ).length,
      missingPaths,
      warnings,
      blockers,
      recommendation:
        blockers.length === 0
          ? 'Repository is eligible for controlled upgrade analysis.'
          : 'Resolve repository blockers before application modification.',
      readyForUpgrade:
        blockers.length === 0,
    };
  }
}
