import { JumoRepositoryWorkspace } from './JumoRepositoryWorkspace';

export interface JumoRollbackPlan {
  repositoryId: string;
  targetCommitId: string;
  affectedPaths: string[];
  requiresApproval: boolean;
  status:
    | 'PROPOSED'
    | 'APPROVED'
    | 'EXECUTED'
    | 'BLOCKED';
}

export class JumoRepositoryRollbackEngine {
  constructor(
    private readonly workspace: JumoRepositoryWorkspace
  ) {}

  plan(
    repositoryId: string,
    targetCommitId: string
  ): JumoRollbackPlan {
    const commit =
      this.workspace.getCommit(
        targetCommitId
      );

    if (!commit) {
      throw new Error(
        `Rollback target not found: ${targetCommitId}`
      );
    }

    if (
      commit.repositoryId !== repositoryId
    ) {
      throw new Error(
        'Rollback target belongs to another repository.'
      );
    }

    return {
      repositoryId,
      targetCommitId,
      affectedPaths: commit.changes.map(
        change => change.path
      ),
      requiresApproval: true,
      status: 'PROPOSED',
    };
  }

  approve(
    rollback: JumoRollbackPlan
  ) {
    rollback.status = 'APPROVED';
    return rollback;
  }

  execute(
    rollback: JumoRollbackPlan
  ) {
    if (rollback.status !== 'APPROVED') {
      throw new Error(
        'Rollback requires approval.'
      );
    }

    rollback.status = 'EXECUTED';

    return rollback;
  }
}
