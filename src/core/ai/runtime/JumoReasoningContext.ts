export interface JumoReasoningContext {
  tenantId?: string;
  userId?: string;
  workspaceId?: string;

  domainId?: string;
  applicationId?: string;

  activeModule?: string;
  activeStudio?: string;

  architectureSnapshot?: unknown;
  registrySnapshot?: unknown;

  installedStudios?: string[];
  installedAgents?: string[];
  availableTools?: string[];

  permissions?: string[];
  roles?: string[];

  currentBranch?: string;
  currentCommit?: string;

  previousDecisions?: string[];
  approvedConstraints?: string[];

  metadata?: Record<string, unknown>;
}
