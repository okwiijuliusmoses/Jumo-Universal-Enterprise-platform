import type {
  IntelligenceRequest,
  IntelligenceEvidence,
  JumoInspectionAdapter,
} from './JumoUniversalIntelligence';

export class JumoUniversalInspectionRegistry
  implements JumoInspectionAdapter
{
  private readonly sources = new Map<
    string,
    JumoInspectionAdapter
  >();

  register(
    sourceId: string,
    adapter: JumoInspectionAdapter
  ): void {
    if (!sourceId.trim()) {
      throw new Error(
        'Inspection source requires an ID.'
      );
    }

    this.sources.set(sourceId, adapter);
  }

  remove(sourceId: string): boolean {
    return this.sources.delete(sourceId);
  }

  has(sourceId: string): boolean {
    return this.sources.has(sourceId);
  }

  list(): string[] {
    return Array.from(this.sources.keys());
  }

  async inspect(
    request: IntelligenceRequest
  ): Promise<IntelligenceEvidence[]> {
    const evidence: IntelligenceEvidence[] = [];

    for (const adapter of this.sources.values()) {
      const result = await adapter.inspect(request);
      evidence.push(...result);
    }

    return evidence;
  }
}

export const jumoUniversalInspectionRegistry =
  new JumoUniversalInspectionRegistry();
