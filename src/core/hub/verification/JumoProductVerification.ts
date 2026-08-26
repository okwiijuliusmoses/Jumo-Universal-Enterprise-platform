export type JumoVerificationTargetType =
  | 'PRODUCT'
  | 'STUDIO'
  | 'ECOSYSTEM'
  | 'RUNTIME'
  | 'INTEGRATION'
  | 'ORGANIZATION'
  | 'GLOBAL';

export type JumoVerificationSeverity =
  | 'INFO'
  | 'WARNING'
  | 'CRITICAL';

export interface JumoVerificationLayer {
  id: string;
  name: string;
  description: string;
  category: string;

  targetType: JumoVerificationTargetType;
  targetId: string;

  enabled: boolean;
  mandatory: boolean;
  blocking: boolean;

  severity: JumoVerificationSeverity;

  gate: string;
  dependencies: string[];

  evidenceRequired: boolean;
  approvalRequired: boolean;

  standards: string[];
}

export interface JumoVerificationProfile {
  id: string;
  name: string;
  targetType: JumoVerificationTargetType;
  targetId: string;

  enabled: boolean;
  layers: string[];

  requireEvidence: boolean;
  requireApproval: boolean;

  standards: string[];
}

class JumoVerificationRegistry {
  private readonly layers = new Map<string, JumoVerificationLayer>();
  private readonly profiles = new Map<string, JumoVerificationProfile>();

  registerLayer(layer: JumoVerificationLayer): void {
    if (this.layers.has(layer.id)) {
      throw new Error(`Verification layer already exists: ${layer.id}`);
    }

    this.layers.set(layer.id, layer);
  }

  upsertLayer(layer: JumoVerificationLayer): void {
    this.layers.set(layer.id, layer);
  }

  getLayer(id: string): JumoVerificationLayer | undefined {
    return this.layers.get(id);
  }

  layersFor(targetType: JumoVerificationTargetType, targetId: string) {
    return this.listLayers().filter(
      layer =>
        layer.targetType === targetType &&
        layer.targetId === targetId
    );
  }

  listLayers(): JumoVerificationLayer[] {
    return Array.from(this.layers.values());
  }

  registerProfile(profile: JumoVerificationProfile): void {
    this.profiles.set(profile.id, profile);
  }

  upsertProfile(profile: JumoVerificationProfile): void {
    this.profiles.set(profile.id, profile);
  }

  getProfile(id: string): JumoVerificationProfile | undefined {
    return this.profiles.get(id);
  }

  listProfiles(): JumoVerificationProfile[] {
    return Array.from(this.profiles.values());
  }

  enableLayer(id: string): void {
    const layer = this.layers.get(id);
    if (!layer) throw new Error(`Unknown verification layer: ${id}`);
    layer.enabled = true;
  }

  disableLayer(id: string): void {
    const layer = this.layers.get(id);
    if (!layer) throw new Error(`Unknown verification layer: ${id}`);
    layer.enabled = false;
  }

  removeLayer(id: string): boolean {
    return this.layers.delete(id);
  }

  status() {
    return {
      totalLayers: this.layers.size,
      enabledLayers: this.listLayers().filter(l => l.enabled).length,
      blockingLayers: this.listLayers().filter(l => l.blocking).length,
      profiles: this.profiles.size,
      fixedLayerLimit: false,
      fixedProfileLimit: false,
      dynamicLayerRegistration: true,
      dynamicProfileRegistration: true,
    };
  }
}

export const JUMO_VERIFICATION_REGISTRY =
  new JumoVerificationRegistry();

export { JumoVerificationRegistry };
