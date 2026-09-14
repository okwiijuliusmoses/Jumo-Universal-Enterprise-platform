import {
  JUMO_HYBRID_ARCHITECTURE_REGISTRY,
  type JumoArchitectureLayer,
} from './JumoHybridArchitectureLayers';

export interface JumoArchitectureRegistrationRequest {
  layer: JumoArchitectureLayer;
}

export class JumoHybridArchitectureControlPlane {
  registerLayer(
    request: JumoArchitectureRegistrationRequest
  ): JumoArchitectureLayer {
    const registry = JUMO_HYBRID_ARCHITECTURE_REGISTRY as any;

    if (typeof registry.upsert === 'function') {
      registry.upsert(request.layer);
    } else if (typeof registry.register === 'function') {
      registry.register(request.layer);
    } else {
      throw new Error(
        'JUMO architecture registry does not expose a registration API.'
      );
    }

    return request.layer;
  }

  layers(): JumoArchitectureLayer[] {
    return JUMO_HYBRID_ARCHITECTURE_REGISTRY.listLayers();
  }

  status() {
    const layers = this.layers();

    return {
      architecture: {
        totalLayers: layers.length,
        totalFamilies:
          JUMO_HYBRID_ARCHITECTURE_REGISTRY.families().length,
        activeLayers:
          JUMO_HYBRID_ARCHITECTURE_REGISTRY.active().length,
        executableLayers:
          JUMO_HYBRID_ARCHITECTURE_REGISTRY.executable().length,
        humanFacingLayers:
          JUMO_HYBRID_ARCHITECTURE_REGISTRY.humanFacing().length,
        dependencyValidation:
          JUMO_HYBRID_ARCHITECTURE_REGISTRY.validateDependencies(),
      },

      extensibility: {
        fixedLayerLimit: false,
        dynamicLayerRegistration: true,
      },
    };
  }
}

export const JUMO_HYBRID_ARCHITECTURE_CONTROL_PLANE =
  new JumoHybridArchitectureControlPlane();
