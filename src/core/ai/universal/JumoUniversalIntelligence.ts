import crypto from 'node:crypto';
import { JumoSecretVault } from '../../security/JumoSecretVault';

export type IntelligenceMode =
  | 'ANALYSIS'
  | 'ENGINEERING'
  | 'LIVE_INSPECTION'
  | 'ERP_ANALYSIS'
  | 'FIELD_OPERATIONS'
  | 'ARCHITECTURE'
  | 'TESTING'
  | 'VERIFICATION'
  | 'DEPLOYMENT'
  | 'LIFECYCLE'
  | 'RESEARCH'
  | 'GENERAL';

export type EvidenceSource =
  | 'RUNTIME'
  | 'REPOSITORY'
  | 'SPECIFICATION'
  | 'CONFIGURATION'
  | 'DATABASE'
  | 'TELEMETRY'
  | 'LOGS'
  | 'TEST_RESULTS'
  | 'VERIFICATION'
  | 'DEPLOYMENT'
  | 'FIELD_RECORD'
  | 'ARCHITECTURE_REGISTRY';

export type EvidenceStatus =
  | 'VERIFIED'
  | 'PARTIALLY_VERIFIED'
  | 'NOT_FOUND'
  | 'INACCESSIBLE'
  | 'UNVERIFIED';

export interface IntelligenceEvidence {
  id: string;
  source: EvidenceSource;
  status: EvidenceStatus;
  location?: string;
  observation: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface IntelligenceSubject {
  type:
    | 'PLATFORM'
    | 'APPLICATION'
    | 'ERP'
    | 'INSTITUTION'
    | 'PRODUCT'
    | 'MODULE'
    | 'WORKFLOW'
    | 'DEPLOYMENT'
    | 'FIELD_OPERATION'
    | 'SUBSYSTEM';

  id: string;
  name?: string;
  tenantId?: string;
  productId?: string;
}

export interface IntelligenceRequest {
  requestId: string;
  message: string;
  mode: IntelligenceMode;
  subject?: IntelligenceSubject;
  requireDirectInspection: boolean;
  context?: Record<string, unknown>;
}

export interface IntelligenceFinding {
  id: string;
  severity: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  description: string;
  verified: boolean;
  evidenceIds: string[];
}

export interface IntelligenceResponse {
  requestId: string;
  mode: IntelligenceMode;
  response: string;

  evidenceStatus: EvidenceStatus;

  findings: IntelligenceFinding[];

  evidence: IntelligenceEvidence[];

  recommendations: string[];

  actions: Array<{
    id: string;
    action: string;
    status: 'PROPOSED' | 'READY' | 'BLOCKED' | 'EXECUTED';
    requiresApproval: boolean;
  }>;

  inspected: boolean;
  generatedAt: string;
}

export interface JumoInspectionAdapter {
  inspect(
    request: IntelligenceRequest
  ): Promise<IntelligenceEvidence[]>;
}

export interface JumoUniversalAIProvider {
  reason(
    request: IntelligenceRequest,
    evidence: IntelligenceEvidence[]
  ): Promise<{
    response: string;
    findings?: IntelligenceFinding[];
    recommendations?: string[];
  }>;
}

export class JumoUniversalIntelligence {
  private readonly inspections = new Map<string, JumoInspectionAdapter>();
  private readonly providers = new Map<string, JumoUniversalAIProvider>();

  registerInspectionSource(
    source: string,
    adapter: JumoInspectionAdapter
  ): void {
    this.inspections.set(source, adapter);
  }

  registerProvider(
    providerId: string,
    provider: JumoUniversalAIProvider
  ): void {
    this.providers.set(providerId, provider);
  }

  private resolveMode(message: string): IntelligenceMode {
    const text = message.toLowerCase();

    if (
      /(inspect|check directly|currently|actual|live state|what is running)/.test(
        text
      )
    ) {
      return 'LIVE_INSPECTION';
    }

    if (/(erp|admission|student|registrar|institution)/.test(text)) {
      return 'ERP_ANALYSIS';
    }

    if (/(architecture|layer|kernel|subsystem|integration)/.test(text)) {
      return 'ARCHITECTURE';
    }

    if (/(build|code|implement|engineer|developer|application)/.test(text)) {
      return 'ENGINEERING';
    }

    if (/(test|testing|regression|quality)/.test(text)) {
      return 'TESTING';
    }

    if (/(verify|verification|audit|compliance)/.test(text)) {
      return 'VERIFICATION';
    }

    if (/(deploy|deployment|production|runtime)/.test(text)) {
      return 'DEPLOYMENT';
    }

    if (/(field|site|institution visit|operation|incident)/.test(text)) {
      return 'FIELD_OPERATIONS';
    }

    if (/(research|investigate|study)/.test(text)) {
      return 'RESEARCH';
    }

    if (/(analyse|analyze|compare|evaluate|review|why)/.test(text)) {
      return 'ANALYSIS';
    }

    return 'GENERAL';
  }

  async process(
    input: Omit<IntelligenceRequest, 'requestId'>
  ): Promise<IntelligenceResponse> {
    const requestId = crypto.randomUUID();
    const mode =
      input.mode ??
      this.resolveMode(input.message);

    const request: IntelligenceRequest = {
      ...input,
      requestId,
      mode,
    };

    const evidence: IntelligenceEvidence[] = [];

    if (request.requireDirectInspection) {
      for (const adapter of this.inspections.values()) {
        const result = await adapter.inspect(request);
        evidence.push(...result);
      }
    }

    const providerId =
      JumoSecretVault.getInstance().getUniversalAiProvider();

    const provider = this.providers.get(providerId);

    if (!provider) {
      return {
        requestId,
        mode,
        response:
          request.requireDirectInspection
            ? 'Direct inspection was requested, but no configured internal AI provider is currently available to analyse the collected evidence.'
            : 'The JUMO Universal Intelligence layer is active, but no configured AI provider is currently available.',
        evidenceStatus:
          evidence.length > 0
            ? this.resolveEvidenceStatus(evidence)
            : 'UNVERIFIED',
        findings: [],
        evidence,
        recommendations: [],
        actions: [],
        inspected: evidence.length > 0,
        generatedAt: new Date().toISOString(),
      };
    }

    const reasoning = await provider.reason(
      request,
      evidence
    );

    return {
      requestId,
      mode,
      response: reasoning.response,
      evidenceStatus:
        evidence.length > 0
          ? this.resolveEvidenceStatus(evidence)
          : 'UNVERIFIED',
      findings: reasoning.findings ?? [],
      evidence,
      recommendations: reasoning.recommendations ?? [],
      actions: [],
      inspected: evidence.length > 0,
      generatedAt: new Date().toISOString(),
    };
  }

  private resolveEvidenceStatus(
    evidence: IntelligenceEvidence[]
  ): EvidenceStatus {
    if (
      evidence.some(
        item => item.status === 'INACCESSIBLE'
      )
    ) {
      return 'INACCESSIBLE';
    }

    if (
      evidence.length > 0 &&
      evidence.every(
        item => item.status === 'VERIFIED'
      )
    ) {
      return 'VERIFIED';
    }

    if (
      evidence.some(
        item => item.status === 'VERIFIED'
      )
    ) {
      return 'PARTIALLY_VERIFIED';
    }

    if (
      evidence.every(
        item => item.status === 'NOT_FOUND'
      )
    ) {
      return 'NOT_FOUND';
    }

    return 'UNVERIFIED';
  }
}

export const jumoUniversalIntelligence =
  new JumoUniversalIntelligence();
