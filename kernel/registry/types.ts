// kernel/registry/types.ts

export interface EnterpriseIdentity {
  name: string;
  family: string;
  industry: string;
  institutionType: string;
  description: string;
  governanceModel: string;
  serviceModel: string;
  branding: BrandingConfiguration;
  userCategories: string[];
}

export interface BrandingConfiguration {
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  fontFamily: string;
}

export interface EnterprisePlatformDefinition {
  identity: EnterpriseIdentity;
  digitalEcosystem: DigitalEcosystemDefinition;
  institutionalArchitecture: InstitutionalArchitectureDefinition;
  operationalArchitecture: OperationalArchitectureDefinition;
  platformServices: PlatformServicesDefinition;
  governanceStructure: GovernanceStructure;
  securityArchitecture: SecurityArchitecture;
}

export interface DigitalEcosystemDefinition {
  publicGateway: string;
  portals: PortalDefinition[];
  internalWorkspaces: string[];
  mobileServices: string[];
  aiServices: string[];
}

export interface InstitutionalArchitectureDefinition {
  governance: string[];
  directorates: DirectorateDefinition[];
}

export interface OperationalArchitectureDefinition {
  applications: ApplicationDefinition[];
  modules: ModuleDefinition[];
  forms: FormDefinition[];
  workflows: WorkflowDefinition[];
  reports: ReportDefinition[];
  analytics: AnalyticsDefinition[];
}

export interface PlatformServicesDefinition {
  faap: string;
  identity: string;
  notifications: string;
  documents: string;
  search: string;
  ai: string;
  audit: string;
  security: string;
}

export interface PortalDefinition {
  id: string;
  name: string;
  owner: string;
  purpose: string;
  userRoles: string[];
  dashboard: string;
  applications: string[];
  modules: string[];
  forms: string[];
  workflows: string[];
  reports: string[];
  permissions: string[];
  settings: string;
  aiAssistance: boolean;
}

export interface DirectorateDefinition {
  id: string;
  name: string;
  departments: DepartmentDefinition[];
}

export interface DepartmentDefinition {
  id: string;
  name: string;
  dashboard: string;
  staffRoles: string[];
  applications: string[];
  modules: string[];
  forms: string[];
  workflows: string[];
  reports: string[];
  kpis: string[];
  permissions: string[];
}

export interface ApplicationDefinition {
  id: string;
  name: string;
  purpose: string;
  ownerDepartment: string;
  users: string[];
  components: EnterpriseComponentDefinition[];
  modules: string[];
  forms: string[];
  workflows: string[];
  reports: string[];
  permissions: string[];
}

export interface ModuleDefinition {
  id: string;
  name: string;
  capability: string;
  dashboard: string;
  dataModel: string;
  operations: string[];
  integrations: string[];
}

export interface FormDefinition {
  id: string;
  name: string;
  fields: FormField[];
  workflowId: string;
  auditTrail: boolean;
}

export interface FormField {
  name: string;
  type: string;
  required: boolean;
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  stages: WorkflowStage[];
}

export interface WorkflowStage {
  name: string;
  role: string;
  actions: string[];
}

export interface ReportDefinition {
  id: string;
  name: string;
}

export interface AnalyticsDefinition {
  id: string;
  name: string;
}

export interface EnterpriseComponentDefinition {
  id: string;
  type: string;
  properties: Record<string, any>;
}

export interface GovernanceStructure {
  board: string[];
  executive: string[];
  management: string[];
  departmental: string[];
  operational: string[];
}

export interface SecurityArchitecture {
  isolationLevel: string;
  identityResolution: string;
  rolePolicy: string;
}

