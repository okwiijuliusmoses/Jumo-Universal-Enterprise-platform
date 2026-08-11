import {
  JumoRepositoryRegistry,
} from './JumoRepositoryRegistry';

export interface JumoRepositoryArchiveRecord {
  id: string;
  repositoryId: string;
  reason: string;
  snapshotVersion: string;
  archivedAt: string;
  retainedUntil?: string;
}

export class JumoRepositoryArchiveEngine {
  private readonly archives = new Map<
    string,
    JumoRepositoryArchiveRecord
  >();

  constructor(
    private readonly registry: JumoRepositoryRegistry
  ) {}

  archive(
    repositoryId: string,
    snapshotVersion: string,
    reason: string
  ) {
    const repository =
      this.registry.require(repositoryId);

    if (!reason.trim()) {
      throw new Error(
        'Archive requires a reason.'
      );
    }

    const record: JumoRepositoryArchiveRecord = {
      id: `archive-${repositoryId}-${Date.now()}`,
      repositoryId,
      reason,
      snapshotVersion,
      archivedAt:
        new Date().toISOString(),
    };

    repository.lifecycle = 'ARCHIVED';

    this.archives.set(record.id, record);

    return record;
  }

  list(repositoryId?: string) {
    const records =
      Array.from(this.archives.values());

    return repositoryId
      ? records.filter(
          record =>
            record.repositoryId === repositoryId
        )
      : records;
  }
}
