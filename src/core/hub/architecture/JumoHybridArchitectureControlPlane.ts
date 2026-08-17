import {
  JUMO_HYBRID_ARCHITECTURE_REGISTRY,
  type JumoArchitectureLayer,
} from './JumoHybridArchitectureLayers';

import {
  JUMO_STUDIO_REGISTRY,
  type JumoStudioDefinition,
} from './JumoStudioRegistry';

export interface JumoArchitectureRegistrationRequest {
  layer: JumoArchitectureLayer;
}

export interface JumoStudioRegistrationRequest {
  studio: JumoStudioDefinition;
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

  registerStudio(
    request: JumoStudioRegistrationRequest
  ): JumoStudioDefinition {
    JUMO_STUDIO_REGISTRY.upsert(request.studio);
    return request.studio;
  }

  layers(): JumoArchitectureLayer[] {
    return JUMO_HYBRID_ARCHITECTURE_REGISTRY.listLayers();
  }

  studios(): JumoStudioDefinition[] {
    return JUMO_STUDIO_REGISTRY.list();
  }

  status() {
    const layers = this.layers();
    const studios = this.studios();

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

      studios: {
        totalStudios: studios.length,
        activeStudios: JUMO_STUDIO_REGISTRY.active().length,
        executableStudios: JUMO_STUDIO_REGISTRY.executable().length,
        humanFacingStudios:
          JUMO_STUDIO_REGISTRY.humanFacing().length,
      },

      extensibility: {
        fixedLayerLimit: false,
        fixedStudioLimit: false,
        dynamicLayerRegistration: true,
        dynamicStudioRegistration: true,
      },
    };
  }
}

export const JUMO_HYBRID_ARCHITECTURE_CONTROL_PLANE =
  new JumoHybridArchitectureControlPlane();
