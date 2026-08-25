/**
 * JUMO UEOS — PHASE 3
 * JUMO_PHASE3_GAP_REGISTRY.ts
 *
 * Tracks gaps and required reconstructions for every module across all 6 products.
 */

import { MetadataIdentityChain } from './JUMO_PHASE3_METADATA_CATALOGUE';

export interface ModuleGapEntry {
  gapId: string;
  identity: MetadataIdentityChain;
  missingElements: string[];
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  status: "OPEN" | "RECONSTRUCTED" | "VERIFIED";
}

export class JUMOPhase3GapRegistry {
  private static gapEntries: Map<string, ModuleGapEntry> = new Map();

  public static registerGap(entry: ModuleGapEntry): void {
    this.gapEntries.set(entry.gapId, entry);
  }

  public static markReconstructed(gapId: string): void {
    const existing = this.gapEntries.get(gapId);
    if (existing) {
      existing.status = "RECONSTRUCTED";
      this.gapEntries.set(gapId, existing);
    }
  }

  public static getAllGaps(): ModuleGapEntry[] {
    return Array.from(this.gapEntries.values());
  }

  public static getGapsForProduct(productId: string): ModuleGapEntry[] {
    return this.getAllGaps().filter(g => g.identity.productId === productId);
  }

  public static getOpenGapsCount(): number {
    return this.getAllGaps().filter(g => g.status === "OPEN").length;
  }
}
