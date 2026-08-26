import { JumoPlatformAuthoritativeManifest } from './types';
import { JUMO_FAAP_PLATFORM_MANIFEST } from './faapPlatformManifest';
import { JUMO_DIGITAL_PAY_PLATFORM_MANIFEST } from './digitalPayPlatformManifest';
import { JUMO_AEGIS_PLATFORM_MANIFEST } from './aegisPlatformManifest';
import { JUMO_TREASURY_PLATFORM_MANIFEST } from './treasuryPlatformManifest';
import { JUMO_DIGITAL_AUDITOR_PLATFORM_MANIFEST } from './digitalAuditorPlatformManifest';
import { JUMO_AI_HYBRID_PLATFORM_MANIFEST } from './aiHybridPlatformManifest';
import { JUMO_WORKFLOW_PLATFORM_MANIFEST } from './workflowPlatformManifest';
import { JUMO_CLOUD_INFRASTRUCTURE_PLATFORM_MANIFEST } from './cloudInfrastructurePlatformManifest';

export class JumoMasterPlatformManifestRegistry {
  private static platforms: Map<string, JumoPlatformAuthoritativeManifest> = new Map([
    ['plat-faap', JUMO_FAAP_PLATFORM_MANIFEST],
    ['plat-digital-pay', JUMO_DIGITAL_PAY_PLATFORM_MANIFEST],
    ['plat-aegis', JUMO_AEGIS_PLATFORM_MANIFEST],
    ['plat-treasury', JUMO_TREASURY_PLATFORM_MANIFEST],
    ['plat-digital-auditor', JUMO_DIGITAL_AUDITOR_PLATFORM_MANIFEST],
    ['plat-ai-hybrid', JUMO_AI_HYBRID_PLATFORM_MANIFEST],
    ['plat-workflow', JUMO_WORKFLOW_PLATFORM_MANIFEST],
    ['plat-cloud-infra', JUMO_CLOUD_INFRASTRUCTURE_PLATFORM_MANIFEST]
  ]);

  public static get(platformId: string): JumoPlatformAuthoritativeManifest | undefined {
    return this.platforms.get(platformId);
  }

  public static getAll(): JumoPlatformAuthoritativeManifest[] {
    return Array.from(this.platforms.values());
  }

  public static has(platformId: string): boolean {
    return this.platforms.has(platformId);
  }

  public static getPlatformIds(): string[] {
    return Array.from(this.platforms.keys());
  }

  public static getPlatformSummary(): Array<{
    platformId: string;
    platformCode: string;
    platformName: string;
    subsystemCount: number;
    serviceCount: number;
    extensionPointCount: number;
    databaseEntityCount: number;
    apiCount: number;
    roleCount: number;
  }> {
    return this.getAll().map(plat => ({
      platformId: plat.platformId,
      platformCode: plat.platformCode,
      platformName: plat.platformName,
      subsystemCount: plat.subsystems.length,
      serviceCount: plat.services.length,
      extensionPointCount: plat.extensionPoints.length,
      databaseEntityCount: plat.databaseEntities.length,
      apiCount: plat.apis.length,
      roleCount: plat.roles.length
    }));
  }
}
