import { JumoRepositoryWorkspace } from './JumoRepositoryWorkspace';
import type { JumoRepositoryBranch } from './JumoRepositoryTypes';

export class JumoRepositoryBranchEngine {
  constructor(
    private readonly workspace: JumoRepositoryWorkspace
  ) {}

  create(
    branch: JumoRepositoryBranch
  ): JumoRepositoryBranch {
    if (
      this.workspace.getBranch(
        branch.repositoryId,
        branch.name
      )
    ) {
      throw new Error(
        `Branch already exists: ${branch.repositoryId}/${branch.name}`
      );
    }

    return this.workspace.addBranch(branch);
  }

  require(
    repositoryId: string,
    branchName: string
  ): JumoRepositoryBranch {
    const branch = this.workspace.getBranch(
      repositoryId,
      branchName
    );

    if (!branch) {
      throw new Error(
        `Repository branch not found: ${repositoryId}/${branchName}`
      );
    }

    return branch;
  }

  list(repositoryId: string) {
    return this.workspace.listBranches(repositoryId);
  }
}
