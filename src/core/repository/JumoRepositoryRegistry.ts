import type {
  JumoRepositoryDefinition,
  JumoRepositoryLifecycle,
} from './JumoRepositoryTypes';

export class JumoRepositoryRegistry {
  private readonly repositories = new Map<
    string,
    JumoRepositoryDefinition
  >();

  register(
    repository: JumoRepositoryDefinition
  ): JumoRepositoryDefinition {
    if (!repository.id.trim()) {
      throw new Error('Repository requires an ID.');
    }

    if (!repository.name.trim()) {
      throw new Error(`Repository ${repository.id} requires a name.`);
    }

    if (this.repositories.has(repository.id)) {
      throw new Error(
        `Repository already registered: ${repository.id}`
      );
    }

    this.repositories.set(repository.id, repository);
    return repository;
  }

  upsert(
    repository: JumoRepositoryDefinition
  ): JumoRepositoryDefinition {
    this.repositories.set(repository.id, repository);
    return repository;
  }

  get(id: string): JumoRepositoryDefinition | undefined {
    return this.repositories.get(id);
  }

  require(id: string): JumoRepositoryDefinition {
    const repository = this.get(id);

    if (!repository) {
      throw new Error(`Repository not found: ${id}`);
    }

    return repository;
  }

  list(): JumoRepositoryDefinition[] {
    return Array.from(this.repositories.values());
  }

  byLifecycle(
    lifecycle: JumoRepositoryLifecycle
  ): JumoRepositoryDefinition[] {
    return this.list().filter(
      repository => repository.lifecycle === lifecycle
    );
  }

  remove(id: string): boolean {
    return this.repositories.delete(id);
  }

  has(id: string): boolean {
    return this.repositories.has(id);
  }

  status() {
    return {
      repositoryCount: this.repositories.size,
      active: this.byLifecycle('ACTIVE').length,
      released: this.byLifecycle('RELEASED').length,
      archived: this.byLifecycle('ARCHIVED').length,
      retired: this.byLifecycle('RETIRED').length,
    };
  }
}

export const JUMO_REPOSITORY_REGISTRY =
  new JumoRepositoryRegistry();
