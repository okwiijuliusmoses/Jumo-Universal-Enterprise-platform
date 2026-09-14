import type {
  JumoRepositoryArtifact,
  JumoRepositoryArtifactType,
} from './JumoRepositoryTypes';

export class JumoRepositoryArtifactRegistry {
  private readonly artifacts = new Map<
    string,
    JumoRepositoryArtifact
  >();

  register(
    artifact: JumoRepositoryArtifact
  ): JumoRepositoryArtifact {
    if (!artifact.id.trim()) {
      throw new Error('Artifact requires an ID.');
    }

    if (!artifact.path.trim()) {
      throw new Error('Artifact requires a path.');
    }

    this.artifacts.set(artifact.id, artifact);

    return artifact;
  }

  get(id: string) {
    return this.artifacts.get(id);
  }

  list(repositoryId?: string) {
    const values = Array.from(
      this.artifacts.values()
    );

    return repositoryId
      ? values.filter(
          artifact =>
            artifact.repositoryId === repositoryId
        )
      : values;
  }

  byType(
    repositoryId: string,
    type: JumoRepositoryArtifactType
  ) {
    return this.list(repositoryId).filter(
      artifact => artifact.type === type
    );
  }

  remove(id: string) {
    return this.artifacts.delete(id);
  }

  has(id: string) {
    return this.artifacts.has(id);
  }
}
