/**
 * Authoritative Sovereign State Types
 * Houses the core state definitions for the JUMO UEOS Sovereign Platform.
 */

export type ProvisioningCategory = 
  | 'GOVERNMENT'
  | 'EDUCATION'
  | 'FINANCIAL'
  | 'RELIGIOUS'
  | 'NON_PROFIT'
  | 'COMMUNITY'
  | 'SOVEREIGN_PLATFORM';

export interface JumoBlueprint {
  blueprintId: string;
  name: string;
  type: string;
  version: string;
  lastBuildTime: string;
  compilerStatus: 'OK' | 'DRAFT' | 'ERROR';
  content: string;
  lifecycleState: 'DRAFT' | 'REVIEW' | 'VALIDATED' | 'VERIFIED' | 'APPROVED' | 'COMPILED' | 'READY' | 'PROVISIONED' | 'RETIRED';
}

export interface VerificationGateResult {
  id: string;
  name: string;
  status: 'PASS' | 'FAIL' | 'WARNING' | 'BLOCKED' | 'NOT_RUN';
  evidence: string;
  timestamp: string;
  logs: string[];
}

export interface DeploymentSlot {
  id: string;
  name: string;
  activeRelease: string;
  health: 'HEALTHY' | 'DEGRADED' | 'OFFLINE';
  cpu: number;
  memory: number;
  trafficWeight: number;
}

export interface JumoIncident {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'WARNING' | 'RESOLVED';
  component: string;
  timestamp: string;
}

export interface DatabaseVolume {
  name: string;
  tenant: string;
  pool: string;
  size: string;
  status: 'HEALTHY' | 'DEGRADED' | 'OFFLINE';
}

export interface SchemaMigration {
  id: string;
  name: string;
  type: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  progress: number;
}

export interface LifecycleAsset {
  name: string;
  type: string;
  status: string;
  step: string;
}

export interface AuditEvent {
  id: string;
  actor: string;
  operation: string;
  details: string;
  timestamp: string;
}

export interface ApplicationBranding {
  name: string;
  productIdentity: string;
  institutionIdentity: string;
  logo: string;
  favicon: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };
  typography: {
    fontFamily: string;
    baseSize: string;
  };
  theme: 'light' | 'dark' | 'system';
  density: 'compact' | 'comfortable' | 'spacious';
  publicLoginEnabled: boolean;
  publicLandingEnabled: boolean;
  portalAppearance: string;
  navigationAppearance: string;
  footerLegalIdentity: string;
  emailBranding: string;
}

export interface InstallationConfig {
  institution: {
    name: string;
    legalName: string;
    acronym: string;
    country: string;
    region: string;
    administrativeHierarchy: string;
    type: string;
    ownership: string;
    operatingModel: string;
  };
  application: {
    product: string;
    ecosystem: string;
    edition: string;
    grade: string;
    capacity: string;
    deploymentProfile: string;
    tenant: string;
    environment: string;
  };
  enabledModules: string[];
  enabledPortals: string[];
  enabledServices: string[];
  navigation: {
    hierarchy: any[];
    roleBasedAccess: Record<string, string[]>;
    featureFlags: Record<string, boolean>;
  };
  systemDefaults: {
    workflow: string;
    security: string;
    notifications: string;
    dataPolicy: string;
    localization: string;
  };
}

export interface SovereignState {
  branding: ApplicationBranding;
  installation: InstallationConfig;
  blueprints: JumoBlueprint[];
  incidents: JumoIncident[];
  cloudSlots: DeploymentSlot[];
  auditEvents: AuditEvent[];
  verificationGates: VerificationGateResult[];
  databaseVolumes: DatabaseVolume[];
  migrations: SchemaMigration[];
  assets: LifecycleAsset[];
  counters: {
    audit: number;
    event: number;
  };
  cryptographicKeys: {
    primaryKey: string;
    backupKey: string;
    algorithm: string;
    lastRotation: string;
  };
  emergencyMode: boolean;
}

export interface VerificationLayer {
  layerId: string;
  name: string;
  category: string;
  gate: string;
  enabled: boolean;
  blocking: boolean;
  standards: string[];
}
