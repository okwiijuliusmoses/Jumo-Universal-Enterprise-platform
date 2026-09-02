import { JumoRepositoryWorkspace } from './JumoRepositoryWorkspace';

export interface JumoRepositoryDiff {
  repositoryId: string;
  fromCommit?: string;
  toCommit?: string;
  added: string[];
  modified: string[];
  removed: string[];
}

export class JumoRepositoryDiffEngine {
  constructor(
    private readonly workspace: JumoRepositoryWorkspace
  ) {}

  compare(
    repositoryId: string,
    fromCommit?: string,
    toCommit?: string
  ): JumoRepositoryDiff {
    const commits = this.workspace
      .listCommits(repositoryId)
      .sort(
        (a, b) =>
          a.createdAt.localeCompare(b.createdAt)
      );

    const fromIndex = fromCommit
      ? commits.findIndex(
          commit => commit.id === fromCommit
        )
      : -1;

    const toIndex = toCommit
      ? commits.findIndex(
          commit => commit.id === toCommit
        )
      : commits.length - 1;

    if (toIndex < 0) {
      throw new Error(
        `Target commit not found: ${toCommit}`
      );
    }

    const start = fromIndex + 1;
    const selected = commits.slice(
      Math.max(0, start),
      toIndex + 1
    );

    const added = new Set<string>();
    const modified = new Set<string>();
    const removed = new Set<string>();

    for (const commit of selected) {
      for (const change of commit.changes) {
        if (change.type === 'CREATE') {
          added.add(change.path);
        } else if (change.type === 'UPDATE') {
          modified.add(change.path);
        } else if (change.type === 'DELETE') {
          removed.add(change.path);
        }
      }
    }

    return {
      repositoryId,
      fromCommit,
      toCommit,
      added: Array.from(added),
      modified: Array.from(modified),
      removed: Array.from(removed),
    };
  }
}
