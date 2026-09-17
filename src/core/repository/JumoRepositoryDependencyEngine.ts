import { JumoRepositoryArtifactRegistry } from './JumoRepositoryArtifactRegistry';

export interface JumoRepositoryDependency {
  id: string;
  repositoryId: string;
  source: string;
  target: string;
  type:
    | 'RUNTIME'
    | 'BUILD'
    | 'DATA'
    | 'INTEGRATION'
    | 'SHARED_PRODUCT'
    | 'ARCHITECTURE';
  required: boolean;
}

export class JumoRepositoryDependencyEngine {
  private readonly dependencies = new Map<
    string,
    JumoRepositoryDependency
  >();

  constructor(
    private readonly artifacts: JumoRepositoryArtifactRegistry
  ) {}

  register(
    dependency: JumoRepositoryDependency
  ) {
    if (!this.artifacts.has(dependency.source)) {
      throw new Error(
        `Dependency source artifact not found: ${dependency.source}`
      );
    }

    if (!this.artifacts.has(dependency.target)) {
      throw new Error(
        `Dependency target artifact not found: ${dependency.target}`
      );
    }

    this.dependencies.set(
      dependency.id,
      dependency
    );

    return dependency;
  }

  list(repositoryId?: string) {
    const values = Array.from(
      this.dependencies.values()
    );

    return repositoryId
      ? values.filter(
          dependency =>
            dependency.repositoryId === repositoryId
        )
      : values;
  }

  dependenciesOf(artifactId: string) {
    return this.list().filter(
      dependency =>
        dependency.source === artifactId
    );
  }

  dependentsOf(artifactId: string) {
    return this.list().filter(
      dependency =>
        dependency.target === artifactId
    );
  }

  validate(repositoryId: string) {
    const failures = this.list(repositoryId)
      .filter(dependency => dependency.required)
      .filter(
        dependency =>
          !this.artifacts.has(
            dependency.source
          ) ||
          !this.artifacts.has(
            dependency.target
          )
      );

    return {
      valid: failures.length === 0,
      failures,
    };
  }
}
