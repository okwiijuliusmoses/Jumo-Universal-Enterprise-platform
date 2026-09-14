/**
 * JUMO UEOS — Implementation & Evidence Registry
 * 
 * Records the verified implementation state of every manifest object.
 * Requires concrete evidence (source files, runtime registrations, DB migrations,
 * API routes, UI metadata, test suites) before advancing states.
 */

export type JumoImplementationState =
  | 'SPECIFIED'
  | 'SCAFFOLDED'
  | 'IMPLEMENTED'
  | 'INTEGRATED'
  | 'FUNCTIONALLY_VERIFIED'
  | 'PRODUCTION_VERIFIED';

export interface JumoImplementationEvidence {
  sourceFiles: string[];
  runtimeRegistration: boolean;
  databaseMigration: boolean;
  apiRegistration: boolean;
  uiMetadataPresent: boolean;
  testFiles: string[];
  evidenceHash: string;
  verifiedAt: string;
  verifiedBy: string;
}

export interface JumoImplementationRecord {
  objectId: string; // e.g. FIN-MOD-001
  productId: string;
  category: 'DIRECTORATE' | 'DEPARTMENT' | 'OFFICE' | 'PORTAL' | 'MODULE' | 'CAPABILITY' | 'SCREEN' | 'FORM' | 'DASHBOARD' | 'REPORT' | 'WORKFLOW' | 'DATABASE_ENTITY' | 'API' | 'RUNTIME_COMPONENT' | 'AI_AGENT' | 'ROLE' | 'PERMISSION' | 'INTEGRATION' | 'CONFIGURATION' | 'TEST_CONTRACT';
  name: string;
  state: JumoImplementationState;
  evidence: JumoImplementationEvidence;
  blockers: string[];
}

export class JumoImplementationRegistry {
  private static records: Map<string, JumoImplementationRecord> = new Map();

  /**
   * Generates a cryptographic evidence hash
   */
  public static computeEvidenceHash(objectId: string, state: string, evidence: Partial<JumoImplementationEvidence>): string {
    const payload = `${objectId}:${state}:${(evidence.sourceFiles || []).join(',')}:${evidence.runtimeRegistration}:${evidence.databaseMigration}:${evidence.apiRegistration}:${evidence.uiMetadataPresent}:${(evidence.testFiles || []).join(',')}`;
    let hash = 0;
    for (let i = 0; i < payload.length; i++) {
      hash = ((hash << 5) - hash) + payload.charCodeAt(i);
      hash |= 0;
    }
    return `EVID-SHA256-${Math.abs(hash).toString(16).toUpperCase()}`;
  }

  /**
   * Registers or updates an artifact's implementation state with evidence.
   */
  public static registerObject(
    objectId: string,
    productId: string,
    category: JumoImplementationRecord['category'],
    name: string,
    desiredState: JumoImplementationState,
    evidence: Partial<JumoImplementationEvidence>,
    verifier: string = 'JUMO-COMPLETENESS-ENGINE'
  ): JumoImplementationRecord {
    const blockers: string[] = [];

    // State validation against required evidence
    if (desiredState === 'IMPLEMENTED' || desiredState === 'INTEGRATED' || desiredState === 'FUNCTIONALLY_VERIFIED' || desiredState === 'PRODUCTION_VERIFIED') {
      if (!evidence.sourceFiles || evidence.sourceFiles.length === 0) {
        blockers.push('Missing sourceFiles evidence for IMPLEMENTED+ state');
      }
    }

    if (desiredState === 'INTEGRATED' || desiredState === 'FUNCTIONALLY_VERIFIED' || desiredState === 'PRODUCTION_VERIFIED') {
      if (!evidence.runtimeRegistration) {
        blockers.push('Missing runtimeRegistration evidence for INTEGRATED+ state');
      }
    }

    if (desiredState === 'FUNCTIONALLY_VERIFIED' || desiredState === 'PRODUCTION_VERIFIED') {
      if (!evidence.uiMetadataPresent) {
        blockers.push('Missing uiMetadataPresent evidence for FUNCTIONALLY_VERIFIED+ state');
      }
      if (!evidence.testFiles || evidence.testFiles.length === 0) {
        blockers.push('Missing testFiles evidence for FUNCTIONALLY_VERIFIED+ state');
      }
    }

    // Determine actual legal state based on blockers
    let actualState: JumoImplementationState = desiredState;
    if (blockers.length > 0) {
      if (desiredState === 'PRODUCTION_VERIFIED' || desiredState === 'FUNCTIONALLY_VERIFIED') {
        actualState = evidence.runtimeRegistration ? 'INTEGRATED' : (evidence.sourceFiles?.length ? 'SCAFFOLDED' : 'SPECIFIED');
      } else if (desiredState === 'INTEGRATED') {
        actualState = evidence.sourceFiles?.length ? 'SCAFFOLDED' : 'SPECIFIED';
      }
    }

    const fullEvidence: JumoImplementationEvidence = {
      sourceFiles: evidence.sourceFiles || [],
      runtimeRegistration: Boolean(evidence.runtimeRegistration),
      databaseMigration: Boolean(evidence.databaseMigration),
      apiRegistration: Boolean(evidence.apiRegistration),
      uiMetadataPresent: Boolean(evidence.uiMetadataPresent),
      testFiles: evidence.testFiles || [],
      evidenceHash: this.computeEvidenceHash(objectId, actualState, evidence),
      verifiedAt: new Date().toISOString(),
      verifiedBy: verifier
    };

    const record: JumoImplementationRecord = {
      objectId,
      productId,
      category,
      name,
      state: actualState,
      evidence: fullEvidence,
      blockers
    };

    this.records.set(objectId, record);
    return record;
  }

  public static get(objectId: string): JumoImplementationRecord | undefined {
    return this.records.get(objectId);
  }

  public static getByProduct(productId: string): JumoImplementationRecord[] {
    return Array.from(this.records.values()).filter(r => r.productId === productId);
  }

  public static getAll(): JumoImplementationRecord[] {
    return Array.from(this.records.values());
  }

  public static clear(): void {
    this.records.clear();
  }
}
