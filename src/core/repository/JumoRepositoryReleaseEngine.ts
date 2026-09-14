import { JumoRepositoryRegistry } from './JumoRepositoryRegistry';
import { JumoRepositoryWorkspace } from './JumoRepositoryWorkspace';
import { JumoRepositoryVersionEngine } from './JumoRepositoryVersionEngine';

export interface JumoRepositoryRelease {
  id: string;
  repositoryId: string;
  version: string;
  commitId: string;
  status:
    | 'PROPOSED'
    | 'VERIFIED'
    | 'RELEASED'
    | 'BLOCKED';
  verificationId?: string;
  createdAt: string;
}

export class JumoRepositoryReleaseEngine {
  private readonly releases = new Map<
    string,
    JumoRepositoryRelease
  >();

  constructor(
    private readonly registry: JumoRepositoryRegistry,
    private readonly workspace: JumoRepositoryWorkspace,
    private readonly versions: JumoRepositoryVersionEngine
  ) {}

  propose(
    repositoryId: string,
    commitId: string
  ): JumoRepositoryRelease {
    this.registry.require(repositoryId);

    const commit =
      this.workspace.getCommit(commitId);

    if (!commit) {
      throw new Error(
        `Release commit not found: ${commitId}`
      );
    }

    if (commit.repositoryId !== repositoryId) {
      throw new Error(
        'Release commit belongs to another repository.'
      );
    }

    const version = this.versions.next(
      this.versions.latest(repositoryId),
      'patch'
    );

    const release: JumoRepositoryRelease = {
      id: `release-${repositoryId}-${Date.now()}`,
      repositoryId,
      version,
      commitId,
      status: 'PROPOSED',
      createdAt: new Date().toISOString(),
    };

    this.releases.set(release.id, release);

    return release;
  }

  verify(
    releaseId: string,
    verificationId: string
  ) {
    const release = this.require(releaseId);

    release.status = 'VERIFIED';
    release.verificationId =
      verificationId;

    return release;
  }

  publish(releaseId: string) {
    const release = this.require(releaseId);

    if (release.status !== 'VERIFIED') {
      throw new Error(
        `Release must be verified before publication: ${releaseId}`
      );
    }

    release.status = 'RELEASED';

    return release;
  }

  require(id: string) {
    const release = this.releases.get(id);

    if (!release) {
      throw new Error(
        `Repository release not found: ${id}`
      );
    }

    return release;
  }

  list(repositoryId?: string) {
    const releases =
      Array.from(this.releases.values());

    return repositoryId
      ? releases.filter(
          release =>
            release.repositoryId === repositoryId
        )
      : releases;
  }
}
