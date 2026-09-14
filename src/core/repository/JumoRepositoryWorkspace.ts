import type {
  JumoRepositoryArtifact,
  JumoRepositoryBranch,
  JumoRepositoryCommit,
} from './JumoRepositoryTypes';

export class JumoRepositoryWorkspace {
  private readonly artifacts = new Map<
    string,
    JumoRepositoryArtifact
  >();

  private readonly branches = new Map<
    string,
    JumoRepositoryBranch
  >();

  private readonly commits = new Map<
    string,
    JumoRepositoryCommit
  >();

  addArtifact(artifact: JumoRepositoryArtifact) {
    this.artifacts.set(artifact.id, artifact);
    return artifact;
  }

  getArtifact(id: string) {
    return this.artifacts.get(id);
  }

  listArtifacts(repositoryId?: string) {
    const artifacts = Array.from(this.artifacts.values());

    if (!repositoryId) {
      return artifacts;
    }

    return artifacts.filter(
      artifact => artifact.repositoryId === repositoryId
    );
  }

  addBranch(branch: JumoRepositoryBranch) {
    const key = `${branch.repositoryId}:${branch.name}`;

    this.branches.set(key, branch);

    return branch;
  }

  getBranch(repositoryId: string, name: string) {
    return this.branches.get(`${repositoryId}:${name}`);
  }

  listBranches(repositoryId?: string) {
    const branches = Array.from(this.branches.values());

    if (!repositoryId) {
      return branches;
    }

    return branches.filter(
      branch => branch.repositoryId === repositoryId
    );
  }

  addCommit(commit: JumoRepositoryCommit) {
    this.commits.set(commit.id, commit);
    return commit;
  }

  getCommit(id: string) {
    return this.commits.get(id);
  }

  listCommits(repositoryId?: string) {
    const commits = Array.from(this.commits.values());

    if (!repositoryId) {
      return commits;
    }

    return commits.filter(
      commit => commit.repositoryId === repositoryId
    );
  }

  status() {
    return {
      artifacts: this.artifacts.size,
      branches: this.branches.size,
      commits: this.commits.size,
    };
  }
}
