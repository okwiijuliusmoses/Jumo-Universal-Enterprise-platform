import { JumoRepositoryWorkspace } from './JumoRepositoryWorkspace';
import type {
  JumoRepositoryChangeType,
  JumoRepositoryCommit,
} from './JumoRepositoryTypes';

export interface JumoCommitInput {
  repositoryId: string;
  branch: string;
  message: string;
  author: string;
  changes: Array<{
    path: string;
    type: JumoRepositoryChangeType;
  }>;
}

export class JumoRepositoryCommitEngine {
  constructor(
    private readonly workspace: JumoRepositoryWorkspace
  ) {}

  commit(input: JumoCommitInput): JumoRepositoryCommit {
    if (!input.message.trim()) {
      throw new Error('Repository commit requires a message.');
    }

    if (!input.author.trim()) {
      throw new Error('Repository commit requires an author.');
    }

    const branch = this.workspace.getBranch(
      input.repositoryId,
      input.branch
    );

    if (!branch) {
      throw new Error(
        `Cannot commit to unknown branch: ${input.branch}`
      );
    }

    if (branch.protected) {
      throw new Error(
        `Protected branch requires an approved repository workflow: ${input.branch}`
      );
    }

    const commit: JumoRepositoryCommit = {
      id: `commit-${input.repositoryId}-${Date.now()}`,
      repositoryId: input.repositoryId,
      branch: input.branch,
      message: input.message,
      author: input.author,
      changes: input.changes,
      createdAt: new Date().toISOString(),
    };

    return this.workspace.addCommit(commit);
  }

  history(repositoryId: string) {
    return this.workspace.listCommits(repositoryId);
  }
}
