import {
  JumoRepositoryRegistry,
  JUMO_REPOSITORY_REGISTRY,
} from './JumoRepositoryRegistry';

import { JumoRepositoryWorkspace } from './JumoRepositoryWorkspace';

import type {
  JumoRepositoryDefinition,
  JumoRepositoryArtifact,
  JumoRepositoryBranch,
  JumoRepositoryCommit,
} from './JumoRepositoryTypes';

export interface RepositoryRuntimeStatus {
  registry: ReturnType<JumoRepositoryRegistry['status']>;
  workspace: ReturnType<JumoRepositoryWorkspace['status']>;
}

export class JumoArchitectureApplicationRepository {
  readonly registry: JumoRepositoryRegistry;
  readonly workspace: JumoRepositoryWorkspace;

  constructor(
    registry: JumoRepositoryRegistry = JUMO_REPOSITORY_REGISTRY,
    workspace: JumoRepositoryWorkspace = new JumoRepositoryWorkspace()
  ) {
    this.registry = registry;
    this.workspace = workspace;
  }

  createRepository(
    repository: JumoRepositoryDefinition
  ) {
    return this.registry.upsert(repository);
  }

  addArtifact(
    artifact: JumoRepositoryArtifact
  ) {
    this.registry.require(artifact.repositoryId);

    return this.workspace.addArtifact(artifact);
  }

  createBranch(
    branch: JumoRepositoryBranch
  ) {
    this.registry.require(branch.repositoryId);

    if (
      this.workspace.getBranch(
        branch.repositoryId,
        branch.name
      )
    ) {
      throw new Error(
        `Repository branch already exists: ${branch.name}`
      );
    }

    return this.workspace.addBranch(branch);
  }

  recordCommit(
    commit: JumoRepositoryCommit
  ) {
    this.registry.require(commit.repositoryId);

    const branch = this.workspace.getBranch(
      commit.repositoryId,
      commit.branch
    );

    if (!branch) {
      throw new Error(
        `Repository branch does not exist: ${commit.branch}`
      );
    }

    return this.workspace.addCommit(commit);
  }

  getRepository(id: string) {
    return this.registry.get(id);
  }

  getRepositoryArtifacts(repositoryId: string) {
    return this.workspace.listArtifacts(repositoryId);
  }

  getRepositoryBranches(repositoryId: string) {
    return this.workspace.listBranches(repositoryId);
  }

  getRepositoryCommits(repositoryId: string) {
    return this.workspace.listCommits(repositoryId);
  }

  status(): RepositoryRuntimeStatus {
    return {
      registry: this.registry.status(),
      workspace: this.workspace.status(),
    };
  }
}

export const JUMO_ARCHITECTURE_APPLICATION_REPOSITORY =
  new JumoArchitectureApplicationRepository();
