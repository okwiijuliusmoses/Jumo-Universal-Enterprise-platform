import fs from 'node:fs/promises';
import path from 'node:path';

import type {
  IntelligenceEvidence,
  IntelligenceRequest,
  JumoInspectionAdapter,
} from './JumoUniversalIntelligence';

export class JumoRepositoryInspectionAdapter
  implements JumoInspectionAdapter
{
  constructor(
    private readonly repositoryRoot: string
  ) {}

  async inspect(
    request: IntelligenceRequest
  ): Promise<IntelligenceEvidence[]> {
    const timestamp = new Date().toISOString();

    try {
      const entries = await fs.readdir(
        this.repositoryRoot,
        { withFileTypes: true }
      );

      const files = entries.map(entry => entry.name);

      return [
        {
          id: `repository-${request.requestId}`,
          source: 'REPOSITORY',
          status: 'VERIFIED',
          location: this.repositoryRoot,
          observation:
            `Repository inspection completed. ${files.length} top-level entries were detected.`,
          timestamp,
          metadata: {
            subject: request.subject,
            entries: files,
          },
        },
      ];
    } catch (error) {
      return [
        {
          id: `repository-${request.requestId}`,
          source: 'REPOSITORY',
          status: 'INACCESSIBLE',
          location: this.repositoryRoot,
          observation:
            'Repository could not be inspected.',
          timestamp,
          metadata: {
            error:
              error instanceof Error
                ? error.message
                : String(error),
          },
        },
      ];
    }
  }
}

export function createRepositoryInspectionAdapter(): JumoRepositoryInspectionAdapter {
  return new JumoRepositoryInspectionAdapter(
    process.env.JUMO_REPOSITORY_ROOT ||
      path.resolve(process.cwd())
  );
}
