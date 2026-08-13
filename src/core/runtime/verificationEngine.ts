import { VerificationLayer } from '../factory/registry/HubRegistryTypes';

export interface VerificationResult {
  layerId: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  evidence: string;
  timestamp: string;
}

export interface VerificationContext {
  architectureContract?: any;
  [key: string]: unknown;
}

/**
 * JUMO UEOS Universal Verification Engine
 *
 * Authoritative runtime verifier.
 *
 * IMPORTANT:
 * - No random PASS/FAIL simulation.
 * - Disabled layers are skipped with WARNING.
 * - Mandatory/blocking layers are evaluated deterministically.
 * - Architecture-aware checks use the supplied architecture contract.
 * - Unknown/unimplemented checks fail safely rather than falsely passing.
 */
export class UniversalVerificationEngine {
  public static executeProfile(
    profileLayers: VerificationLayer[],
    context: VerificationContext = {}
  ): VerificationResult[] {
    return profileLayers.map((layer) =>
      this.executeLayer(layer, context)
    );
  }

  public static executeLayer(
    layer: VerificationLayer,
    context: VerificationContext = {}
  ): VerificationResult {
    const timestamp = new Date().toISOString();

    if (!layer.enabled) {
      return {
        layerId: layer.layerId,
        status: 'WARNING',
        evidence: `Verification layer "${layer.name}" is disabled and was not executed.`,
        timestamp,
      };
    }

    const architectureContract = context.architectureContract;

    const architectureResult = this.verifyArchitectureLayer(
      layer,
      architectureContract
    );

    if (architectureResult) {
      return {
        layerId: layer.layerId,
        status: architectureResult.status,
        evidence: architectureResult.evidence,
        timestamp,
      };
    }

    /*
     * Registry metadata validation.
     * A layer cannot be considered authoritative if its own
     * definition is incomplete.
     */
    if (!layer.layerId || !layer.name || !layer.category || !layer.gate) {
      return {
        layerId: layer.layerId || 'UNKNOWN',
        status: 'FAIL',
        evidence:
          'Verification layer definition is incomplete: layerId, name, category and gate are required.',
        timestamp,
      };
    }

    if (!Array.isArray(layer.standards) || layer.standards.length === 0) {
      return {
        layerId: layer.layerId,
        status: layer.blocking ? 'FAIL' : 'WARNING',
        evidence:
          'No authoritative verification standard is registered for this layer.',
        timestamp,
      };
    }

    /*
     * Until a concrete executable validator is registered for a layer,
     * do not fabricate a PASS. Mandatory/blocking layers therefore fail
     * safely; non-blocking layers remain WARNING.
     */
    return {
      layerId: layer.layerId,
      status: layer.blocking ? 'FAIL' : 'WARNING',
      evidence: layer.blocking
        ? `Layer "${layer.name}" is registered but has no executable validator. Authoritative verification is blocked until a validator is bound.`
        : `Layer "${layer.name}" is registered, but no executable validator is currently bound. Manual/registered validation is required.`,
      timestamp,
    };
  }

  private static verifyArchitectureLayer(
    layer: VerificationLayer,
    architectureContract?: any
  ): { status: 'PASS' | 'FAIL' | 'WARNING'; evidence: string } | null {
    if (!architectureContract) {
      return null;
    }

    const category = String(layer.category).toUpperCase();

    switch (category) {
      case 'AUTH':
        return this.checkFields(
          architectureContract.securityArchitecture,
          ['authentication'],
          layer
        );

      case 'AUTHZ':
        return this.checkFields(
          architectureContract.securityArchitecture,
          ['authorization', 'rbac'],
          layer
        );

      case 'ZT':
        return this.checkFields(
          architectureContract.securityArchitecture,
          ['zeroTrust'],
          layer
        );

      case 'ENC':
        return this.checkFields(
          architectureContract.securityArchitecture,
          ['encryption'],
          layer
        );

      case 'SEC':
        return this.checkFields(
          architectureContract.securityArchitecture,
          ['secrets', 'keyManagement'],
          layer
        );

      case 'DATA':
        return this.checkFields(
          architectureContract.dataArchitecture,
          ['entities', 'schemas', 'databases'],
          layer
        );

      case 'DEPLOY':
        return this.checkFields(
          architectureContract.deploymentArchitecture,
          ['target', 'hybridMode', 'offlineCapability'],
          layer
        );

      case 'UI':
        return this.checkFields(
          architectureContract.experienceArchitecture,
          ['portals', 'mobileExperience', 'apiExperience'],
          layer
        );

      case 'AI':
        return this.checkFields(
          architectureContract.aiArchitecture,
          ['assignedAgents', 'agentResponsibilities', 'modelRequirements'],
          layer
        );

      default:
        return null;
    }
  }

  private static checkFields(
    section: any,
    fields: string[],
    layer: VerificationLayer
  ): { status: 'PASS' | 'FAIL' | 'WARNING'; evidence: string } {
    if (!section || typeof section !== 'object') {
      return {
        status: layer.blocking ? 'FAIL' : 'WARNING',
        evidence: `Architecture section required by "${layer.name}" is missing.`,
      };
    }

    const missing = fields.filter((field) => {
      const value = section[field];

      if (Array.isArray(value)) {
        return value.length === 0;
      }

      return value === undefined || value === null || value === '';
    });

    if (missing.length > 0) {
      return {
        status: layer.blocking ? 'FAIL' : 'WARNING',
        evidence: `Architecture validation failed for "${layer.name}". Missing: ${missing.join(', ')}.`,
      };
    }

    return {
      status: 'PASS',
      evidence: `Architecture validation passed for "${layer.name}". Required architecture fields are present.`,
    };
  }
}
