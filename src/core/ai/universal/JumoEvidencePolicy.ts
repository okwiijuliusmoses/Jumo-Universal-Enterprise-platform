import type {
  IntelligenceEvidence,
  IntelligenceRequest,
} from './JumoUniversalIntelligence';

export class JumoEvidencePolicy {
  static requiresDirectInspection(
    request: IntelligenceRequest
  ): boolean {
    if (request.requireDirectInspection) {
      return true;
    }

    const text = request.message.toLowerCase();

    return /(currently|actual|live|running|implemented|installed|configured|working|operating|does this|is this|check|inspect|verify)/.test(
      text
    );
  }

  static canStateAsFact(
    evidence: IntelligenceEvidence[]
  ): boolean {
    return evidence.some(
      item => item.status === 'VERIFIED'
    );
  }

  static classify(
    evidence: IntelligenceEvidence[]
  ):
    | 'VERIFIED'
    | 'PARTIALLY_VERIFIED'
    | 'NOT_VERIFIED'
    | 'INACCESSIBLE' {
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

    return 'NOT_VERIFIED';
  }
}
