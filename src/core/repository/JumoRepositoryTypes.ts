export type JumoRepositoryLifecycle =
  | 'DRAFT'
  | 'ACTIVE'
  | 'FROZEN'
  | 'RELEASED'
  | 'ARCHIVED'
  | 'RETIRED';

export type JumoRepositoryArtifactType =
  | 'SPECIFICATION'
  | 'ARCHITECTURE'
  | 'SOURCE'
  | 'CONFIGURATION'
  | 'DATABASE'
  | 'API'
  | 'TEST'
  | 'BUILD'
  | 'VERIFICATION'
  | 'RELEASE'
  | 'DEPLOYMENT'
  | 'EVIDENCE'
  | 'DOCUMENT'
  | 'OTHER';

export type JumoRepositoryChangeType =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'RENAME'
  | 'MOVE';

export interface JumoRepositoryArtifact {
  id: string;
  repositoryId: string;
  path: string;
  type: JumoRepositoryArtifactType;
  contentHash: string;
  version: string;
  lifecycle: JumoRepositoryLifecycle;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface JumoRepositoryCommit {
  id: string;
  repositoryId: string;
  branch: string;
  message: string;
  author: string;
  changes: Array<{
    path: string;
    type: JumoRepositoryChangeType;
  }>;
  createdAt: string;
}

export interface JumoRepositoryBranch {
  name: string;
  repositoryId: string;
  baseVersion: string;
  protected: boolean;
  createdAt: string;
}

export interface JumoRepositoryDefinition {
  id: string;
  name: string;
  enterpriseId: string;
  description?: string;
  lifecycle: JumoRepositoryLifecycle;
  defaultBranch: string;
  createdAt: string;
  updatedAt: string;
}
