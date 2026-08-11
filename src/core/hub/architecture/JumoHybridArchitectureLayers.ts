/**
 * JUMO UEOS
 * Digital Hybrid Architecture Layer Registry
 *
 * This registry defines the authoritative architectural capabilities
 * exposed to the JUMO Engineering / Manufacturing Hub.
 *
 * These are architectural responsibilities, NOT simulated features.
 */

export type JumoLayerStatus =
  | 'FOUNDATION'
  | 'ACTIVE'
  | 'PLANNED'
  | 'INTEGRATION'
  | 'GOVERNED';

export interface JumoArchitectureLayer {
  id: string;
  family: string;
  name: string;
  responsibility: string;
  studio: string;
  status: JumoLayerStatus;
  dependencies: string[];
  humanFacing: boolean;
  executable: boolean;
}

const L = (
  id: string,
  family: string,
  name: string,
  responsibility: string,
  studio: string,
  dependencies: string[] = [],
  status: JumoLayerStatus = 'PLANNED',
  humanFacing = false,
  executable = false
): JumoArchitectureLayer => ({
  id,
  family,
  name,
  responsibility,
  studio,
  status,
  dependencies,
  humanFacing,
  executable,
});

const INITIAL_JUMO_HYBRID_ARCHITECTURE_LAYERS: JumoArchitectureLayer[] = [];



/**
 * Extensible JUMO architecture registry.
 *
 * The 130 initial layers are a baseline, NOT a maximum.
 *
 * New layers may be registered by future studios, domains,
 * products, platform upgrades and architecture packs.
 */
class JumoHybridArchitectureRegistry {
  private readonly layers = new Map<string, JumoArchitectureLayer>();

  constructor(initialLayers: JumoArchitectureLayer[]) {
    for (const layer of initialLayers) {
      this.register(layer);
    }
  }

  register(layer: JumoArchitectureLayer): void {
    if (!layer.id.trim()) {
      throw new Error('JUMO architecture layer requires an ID.');
    }

    if (this.layers.has(layer.id)) {
      throw new Error(
        `JUMO architecture layer already registered: ${layer.id}`
      );
    }

    this.layers.set(layer.id, {
      ...layer,
      dependencies: [...layer.dependencies],
    });
  }

  registerMany(layers: JumoArchitectureLayer[]): void {
    for (const layer of layers) {
      this.register(layer);
    }
  }

  upsert(layer: JumoArchitectureLayer): void {
    this.layers.set(layer.id, {
      ...layer,
      dependencies: [...layer.dependencies],
    });
  }

  remove(id: string): boolean {
    return this.layers.delete(id);
  }

  get(id: string): JumoArchitectureLayer | undefined {
    return this.layers.get(id);
  }

  all(): JumoArchitectureLayer[] {
    return Array.from(this.layers.values());
  }

  count(): number {
    return this.layers.size;
  }

  byFamily(family: string): JumoArchitectureLayer[] {
    return this.all().filter(
      layer => layer.family.toLowerCase() === family.toLowerCase()
    );
  }

  byStudio(studio: string): JumoArchitectureLayer[] {
    return this.all().filter(
      layer => layer.studio.toLowerCase() === studio.toLowerCase()
    );
  }

  listLayers(): JumoArchitectureLayer[] {
    return Array.from(this.layers.values());
  }

  active(): JumoArchitectureLayer[] {
    return this.all().filter(
      layer =>
        layer.status === 'ACTIVE' ||
        layer.status === 'FOUNDATION' ||
        layer.status === 'GOVERNED'
    );
  }

  executable(): JumoArchitectureLayer[] {
    return this.all().filter(layer => layer.executable);
  }

  humanFacing(): JumoArchitectureLayer[] {
    return this.all().filter(layer => layer.humanFacing);
  }

  families(): string[] {
    return [
      ...new Set(this.all().map(layer => layer.family))
    ];
  }

  studios(): string[] {
    return [
      ...new Set(this.all().map(layer => layer.studio))
    ];
  }

  dependenciesOf(id: string): JumoArchitectureLayer[] {
    const layer = this.get(id);

    if (!layer) {
      return [];
    }

    return layer.dependencies
      .map(dependencyId => this.get(dependencyId))
      .filter(
        (dependency): dependency is JumoArchitectureLayer =>
          Boolean(dependency)
      );
  }

  validateDependencies(): {
    valid: boolean;
    missing: Array<{
      layerId: string;
      dependencyId: string;
    }>;
  } {
    const missing: Array<{
      layerId: string;
      dependencyId: string;
    }> = [];

    for (const layer of this.all()) {
      for (const dependencyId of layer.dependencies) {
        if (!this.layers.has(dependencyId)) {
          missing.push({
            layerId: layer.id,
            dependencyId,
          });
        }
      }
    }

    return {
      valid: missing.length === 0,
      missing,
    };
  }
}

/**
 * Singleton authoritative registry.
 *
 * This starts with the current baseline but remains open-ended.
 */
export const JUMO_HYBRID_ARCHITECTURE_REGISTRY =
  new JumoHybridArchitectureRegistry(
    INITIAL_JUMO_HYBRID_ARCHITECTURE_LAYERS
  );

/**
 * Backwards-compatible read-only-style accessor.
 *
 * Existing code can continue calling this while the underlying
 * architecture remains dynamically extensible.
 */
export function getJumoArchitectureLayers(): JumoArchitectureLayer[] {
  return JUMO_HYBRID_ARCHITECTURE_REGISTRY.all();
}

export function getJumoArchitectureLayer(
  id: string
): JumoArchitectureLayer | undefined {
  return JUMO_HYBRID_ARCHITECTURE_REGISTRY.get(id);
}

export function registerJumoArchitectureLayer(
  layer: JumoArchitectureLayer
): void {
  JUMO_HYBRID_ARCHITECTURE_REGISTRY.register(layer);
}

export function registerJumoArchitectureLayers(
  layers: JumoArchitectureLayer[]
): void {
  JUMO_HYBRID_ARCHITECTURE_REGISTRY.registerMany(layers);
}

export function getJumoArchitectureFamilies(): string[] {
  return JUMO_HYBRID_ARCHITECTURE_REGISTRY.families();
}

export function getJumoArchitectureStudios(): string[] {
  return JUMO_HYBRID_ARCHITECTURE_REGISTRY.studios();
}

export function getJumoStudioLayerMap(): Record<
  string,
  JumoArchitectureLayer[]
> {
  return JUMO_HYBRID_ARCHITECTURE_REGISTRY
    .studios()
    .reduce(
      (map, studio) => {
        map[studio] =
          JUMO_HYBRID_ARCHITECTURE_REGISTRY.byStudio(studio);

        return map;
      },
      {} as Record<string, JumoArchitectureLayer[]>
    );
}

/**
 * Architecture health check.
 */
export function validateJumoArchitectureRegistry() {
  return JUMO_HYBRID_ARCHITECTURE_REGISTRY.validateDependencies();
}

/**
 * Runtime architecture statistics.
 */
export function getJumoArchitectureStatistics() {
  const layers = JUMO_HYBRID_ARCHITECTURE_REGISTRY.all();

  return {
    totalLayers: layers.length,
    totalFamilies:
      JUMO_HYBRID_ARCHITECTURE_REGISTRY.families().length,
    totalStudios:
      JUMO_HYBRID_ARCHITECTURE_REGISTRY.studios().length,
    activeLayers:
      JUMO_HYBRID_ARCHITECTURE_REGISTRY.active().length,
    executableLayers:
      JUMO_HYBRID_ARCHITECTURE_REGISTRY.executable().length,
    humanFacingLayers:
      JUMO_HYBRID_ARCHITECTURE_REGISTRY.humanFacing().length,
    dependencyValidation:
      JUMO_HYBRID_ARCHITECTURE_REGISTRY.validateDependencies(),
  };
}
