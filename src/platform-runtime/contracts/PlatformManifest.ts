/**
 * JUMO UEOS — Authoritative Platform Manifest Contract
 * Defines structural metadata and dependency topology for sovereign domain suites.
 */

export interface PlatformManifest {
  id: string;
  name: string;
  version: string;
  type: 'enterprise-domain' | 'core-kernel' | 'service-extension';
  dependencies: string[];
  modules: string[];
  security: 'row-isolated' | 'schema-isolated' | 'db-isolated';
  billing: 'subscription' | 'metered' | 'perpetual';
}

export function validatePlatformManifest(manifest: Partial<PlatformManifest>): PlatformManifest {
  return {
    id: manifest.id || 'unnamed-platform',
    name: manifest.name || 'JUMO Sovereign Platform',
    version: manifest.version || '2.0.0-PROD',
    type: manifest.type || 'enterprise-domain',
    dependencies: manifest.dependencies ?? ['JUMO Identity', 'FAAP', 'Workflow Engine', 'AI Fabric'],
    modules: manifest.modules ?? [],
    security: manifest.security || 'schema-isolated',
    billing: manifest.billing || 'subscription'
  };
}
