export interface InstitutionalIdentity {
  legalName: string;
  displayName: string;
  institutionType: string;
  sector: string;
  jurisdiction: string;
  country: string;
  region?: string;
  description?: string;
}

export interface InstitutionalGovernanceSpecification {
  governanceModel: string;
  governingBody?: string;
  executiveStructure: string[];
  departments: string[];
  divisions: string[];
  directorates: string[];
  branches: string[];
  offices: string[];
  committees: string[];
  roles: string[];
  approvalAuthorities: string[];
}

export interface InstitutionalOperationalSpecification {
  businessProcesses: string[];
  workflows: string[];
  services: string[];
  operatingHours?: string;
  locations: string[];
  serviceChannels: string[];
  approvalRules: string[];
  escalationRules: string[];
  reportingRequirements: string[];
}

export interface InstitutionalDataSpecification {
  coreEntities: string[];
  masterData: string[];
  transactionalData: string[];
  documents: string[];
  reportingDomains: string[];
  retentionPolicy: string;
  backupPolicy: string;
  synchronizationMode: string;
}

export interface InstitutionalIntegrationSpecification {
  internalJumoServices: string[];
  externalSystems: string[];
  governmentSystems: string[];
  financialSystems: string[];
  paymentChannels: string[];
  identityProviders: string[];
  communicationChannels: string[];
  apiRequirements: string[];
}

export interface InstitutionalSecuritySpecification {
  authentication: string;
  authorization: string;
  mfaRequired: boolean;
  zeroTrustRequired: boolean;
  encryption: string;
  keyManagement: string;
  secretsManagement: string;
  auditRequired: boolean;
  threatMonitoringRequired: boolean;
  dataClassification: string[];
}

export interface InstitutionalAISpecification {
  required: boolean;
  agents: string[];
  capabilities: string[];
  knowledgeSources: string[];
  ragRequired: boolean;
  automationRequirements: string[];
  humanApprovalPoints: string[];
  safetyBoundaries: string[];
}

export interface InstitutionalInstallationSpecification {
  deploymentModel: string;
  infrastructureTarget: string;
  environments: string[];
  domainsToInstall: string[];
  modulesToInstall: string[];
  portalsToInstall: string[];
  integrationsToInstall: string[];
  databaseRequirements: string[];
  storageRequirements: string[];
  networkingRequirements: string[];
}

export interface InstitutionalConfigurationSpecification {
  branding: {
    name: string;
    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;
    terminology?: Record<string, string>;
  };

  localization: {
    language: string;
    timezone: string;
    currency: string;
    dateFormat: string;
  };

  configurationItems: string[];
  enabledModules: string[];
  enabledWorkflows: string[];
  enabledServices: string[];
  enabledPortals: string[];
}

export interface JumoInstitutionalDigitalSpecification {
  id: string;
  version: string;

  identity: InstitutionalIdentity;
  governance: InstitutionalGovernanceSpecification;
  operations: InstitutionalOperationalSpecification;
  data: InstitutionalDataSpecification;
  integrations: InstitutionalIntegrationSpecification;
  security: InstitutionalSecuritySpecification;
  ai: InstitutionalAISpecification;
  installation: InstitutionalInstallationSpecification;
  configuration: InstitutionalConfigurationSpecification;

  requirements: string[];
  capabilities: string[];

  createdAt: string;
  updatedAt: string;
}
