export interface JumoSharedService {
  id: string;
  name: string;
  mandatoryForAllProducts: boolean;
}

export interface JumoIntegrationDefinition {
  id: string;
  sourceProductId: string;
  targetServiceId: string;
  mandatory: boolean;
  enabled: boolean;
}

export const JUMO_DYNAMIC_PLATFORM_REGISTRY = {
  products: {
    require: (id: string) => ({
      id,
      sharedServiceIds: [] as string[]
    })
  },
  sharedServices: {
    list: () => [] as JumoSharedService[]
  },
  integrations: {
    list: () => [] as JumoIntegrationDefinition[]
  }
};
