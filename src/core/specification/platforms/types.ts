/**
 * JUMO UEOS — Independent Installable Platform Manifest Types
 * 
 * Defines schema and contracts for independent, cross-product platform systems:
 *   - JUMO FAAP (Financing as a Platform)
 *   - JUMO DIGITAL PAY (Payment Switch & Multi-Rail Gateway)
 *   - JUMO AEGIS (Sovereign Security, Identity, HSM & RBAC)
 *   - JUMO TREASURY (Liquidity, Reconciliation & Settlement)
 *   - JUMO DIGITAL AUDITOR (Immutable Event Logging & Forensic Audit)
 *   - JUMO AI DIGITAL HYBRID (Cognitive OCR, NLP & Anomaly Detection)
 *   - JUMO WORKFLOW ENGINE (Sovereign Multi-Stage Orchestration)
 *   - JUMO CLOUD / INFRASTRUCTURE (Tenant Provisioning & Sharding)
 */

export interface JumoPlatformServiceManifest {
  id: string;
  code: string;
  name: string;
  description: string;
  serviceTier: 'CORE_ENGINE' | 'GATEWAY' | 'ADAPTER' | 'VAULT' | 'ORCHESTRATOR';
  endpoints: string[];
}

export interface JumoPlatformSubsystemManifest {
  id: string;
  code: string;
  name: string;
  description: string;
  serviceIds: string[];
  capabilities: string[];
  databaseEntities: string[];
}

export interface JumoPlatformExtensionPointManifest {
  id: string;
  hookName: string;
  description: string;
  supportedProducts: string[];
  requiredProtocol: string;
}

export interface JumoPlatformAuthoritativeManifest {
  platformId: string; // e.g. plat-faap, plat-digital-pay
  platformCode: string;
  platformName: string;
  classification: 'SHARED_INDEPENDENT_PLATFORM';
  version: string;
  description: string;
  subsystems: JumoPlatformSubsystemManifest[];
  services: JumoPlatformServiceManifest[];
  extensionPoints: JumoPlatformExtensionPointManifest[];
  databaseEntities: Array<{
    id: string;
    tableName: string;
    description: string;
    fields: Array<{ name: string; type: string; required: boolean }>;
  }>;
  apis: Array<{
    id: string;
    endpoint: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    description: string;
    authLevel: string;
  }>;
  roles: Array<{
    id: string;
    name: string;
    description: string;
    permissions: string[];
  }>;
  testContracts: Array<{
    id: string;
    targetId: string;
    testType: 'UNIT' | 'INTEGRATION' | 'PLATFORM_COMPLIANCE';
    expectedAssertion: string;
  }>;
}
