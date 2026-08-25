/**
 * JUMO UEOS Canonical Type Definitions
 */

export interface JIDPManifest {
  name: string;
  version: string;
  type: 'enterprise-domain' | 'infrastructure-domain';
  dependencies: string[];
  modules: string[];
  security: 'schema-isolated' | 'database-isolated' | 'row-isolated';
  billing: 'subscription' | 'pay-per-use' | 'enterprise';
}

export interface DomainDefinition {
  id: string;
  name: string;
  displayName: string;
  icon: string;
  status: 'AVAILABLE' | 'DISABLED' | 'PENDING';
  // Defines the capabilities and settings inherited from JUMO core
  config: {
    onboardingPolicy: 'Auto-approve' | 'Manual Review' | 'MFA Restricted';
    approvalPolicy: 'Strict Single Owner' | 'Dual Consent' | 'Consensus Weighted';
    securityIsolation: 'Schema-Level' | 'Database-Level' | 'Row-Level' | 'Hardware Sandbox';
  };
  // Feature-set defined by metadata
  aiProfile: { agentId: string; modelName: string; promptTemplate: string; };
  erpModules: { id: string; name: string; description: string; status: 'ACTIVE' | 'DISABLED'; config: Record<string, any>; }[];
  manifest?: JIDPManifest;
}

export interface PlatformConfig {
  branding: { name: string; accentColor: string; theme: 'light' | 'dark' | 'hybrid'; };
}
