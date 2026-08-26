import { JumoAuthoritativeProductManifest } from './types';
import { JUMO_FINTECH_AUTHORITATIVE_MANIFEST } from './fintechManifest';
import { JUMO_NURSERY_PRIMARY_AUTHORITATIVE_MANIFEST } from './nurseryPrimaryManifest';
import { JUMO_SECONDARY_SCHOOL_AUTHORITATIVE_MANIFEST } from './secondarySchoolManifest';
import { JUMO_UNIVERSITY_TERTIARY_AUTHORITATIVE_MANIFEST } from './universityTertiaryManifest';
import { JUMO_CHURCH_FAITH_AUTHORITATIVE_MANIFEST } from './churchFaithManifest';
import { JUMO_ALUMNI_COMMUNITY_AUTHORITATIVE_MANIFEST } from './alumniCommunityManifest';

export class JumoMasterManifestRegistry {
  private static manifests: Map<string, JumoAuthoritativeProductManifest> = new Map([
    ['prod-fintech', JUMO_FINTECH_AUTHORITATIVE_MANIFEST],
    ['prod-nursery-primary', JUMO_NURSERY_PRIMARY_AUTHORITATIVE_MANIFEST],
    ['prod-secondary-school', JUMO_SECONDARY_SCHOOL_AUTHORITATIVE_MANIFEST],
    ['prod-university-tertiary', JUMO_UNIVERSITY_TERTIARY_AUTHORITATIVE_MANIFEST],
    ['prod-church-faith', JUMO_CHURCH_FAITH_AUTHORITATIVE_MANIFEST],
    ['prod-alumni-community', JUMO_ALUMNI_COMMUNITY_AUTHORITATIVE_MANIFEST]
  ]);

  public static get(productId: string): JumoAuthoritativeProductManifest | undefined {
    return this.manifests.get(productId);
  }

  public static getAll(): JumoAuthoritativeProductManifest[] {
    return Array.from(this.manifests.values());
  }

  public static has(productId: string): boolean {
    return this.manifests.has(productId);
  }

  public static getProductIds(): string[] {
    return Array.from(this.manifests.keys());
  }
}
