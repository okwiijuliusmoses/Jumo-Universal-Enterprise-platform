/**
 * JUMO UEOS
 * Dynamic Platform Registry
 *
 * Architectural rule:
 * NOTHING here depends on fixed product, layer, family, studio,
 * package or capability counts.
 *
 * All platform entities are registry-driven and extensible.
 */

export type JumoCommercialTier =
  | 'ORDINARY'
  | 'PREMIUM'
  | 'GLOBAL';

export type JumoRegistryStatus =
  | 'PLANNED'
  | 'ACTIVE'
  | 'INTEGRATION'
  | 'VERIFIED'
  | 'RETIRED';

export interface JumoArchitectureFamily {
  id: string;
  name: string;
  description?: string;
  status: JumoRegistryStatus;
}

export interface JumoArchitectureLayer {
  id: string;
  familyId: string;
  name: string;
  description?: string;
  tier: JumoCommercialTier;
  status: JumoRegistryStatus;
  mandatory: boolean;
  shared: boolean;
  executable: boolean;
  humanFacing: boolean;
  dependencies: string[];
  metadata?: Record<string, unknown>;
}



export interface JumoSharedService {
  id: string;
  name: string;
  description?: string;
  authoritative: boolean;
  mandatoryForAllProducts: boolean;
  tier: JumoCommercialTier;
  serviceType: string;
  integrationPoints: string[];
  status: JumoRegistryStatus;
}

export interface JumoCommercialProduct {
  id: string;
  name: string;
  description?: string;
  category: string;
  status: JumoRegistryStatus;
  supportedTiers: JumoCommercialTier[];
  defaultTier: JumoCommercialTier;
  sharedServiceIds: string[];
  architectureLayerIds: string[];
  
  metadata?: Record<string, unknown>;
}

export interface JumoPackageDefinition {
  id: string;
  name: string;
  tier: JumoCommercialTier;
  description?: string;
  productIds: string[];
  layerIds: string[];
  sharedServiceIds: string[];
  billable: boolean;
  configurable: boolean;
}

export interface JumoIntegrationDefinition {
  id: string;
  sourceProductId: string;
  targetServiceId: string;
  enabled: boolean;
  mandatory: boolean;
  configurable: boolean;
  configurationSchema?: Record<string, unknown>;
}

class DynamicRegistry<T extends { id: string }> {
  private readonly records = new Map<string, T>();

  register(record: T): T {
    if (!record.id) {
      throw new Error('Registry record requires an id.');
    }

    this.records.set(record.id, record);
    return record;
  }

  upsert(record: T): T {
    return this.register(record);
  }

  get(id: string): T | undefined {
    return this.records.get(id);
  }

  require(id: string): T {
    const record = this.get(id);

    if (!record) {
      throw new Error(`Registry record not found: ${id}`);
    }

    return record;
  }

  list(): T[] {
    return Array.from(this.records.values());
  }

  remove(id: string): boolean {
    return this.records.delete(id);
  }

  has(id: string): boolean {
    return this.records.has(id);
  }

  clear(): void {
    this.records.clear();
  }

  get size(): number {
    return this.records.size;
  }
}

export class JumoDynamicPlatformRegistry {

  readonly families =
    new DynamicRegistry<JumoArchitectureFamily>();

  readonly layers =
    new DynamicRegistry<JumoArchitectureLayer>();

  

  readonly sharedServices =
    new DynamicRegistry<JumoSharedService>();

  readonly products =
    new DynamicRegistry<JumoCommercialProduct>();

  readonly packages =
    new DynamicRegistry<JumoPackageDefinition>();

  readonly integrations =
    new DynamicRegistry<JumoIntegrationDefinition>();

  registerFamily(family: JumoArchitectureFamily) {
    return this.families.upsert(family);
  }

  registerLayer(layer: JumoArchitectureLayer) {
    return this.layers.upsert(layer);
  }

  

  registerSharedService(service: JumoSharedService) {
    return this.sharedServices.upsert(service);
  }

  registerProduct(product: JumoCommercialProduct) {
    return this.products.upsert(product);
  }

  registerPackage(pkg: JumoPackageDefinition) {
    return this.packages.upsert(pkg);
  }

  registerIntegration(integration: JumoIntegrationDefinition) {
    return this.integrations.upsert(integration);
  }

  getMandatoryOrdinaryLayers(): JumoArchitectureLayer[] {
    return this.layers
      .list()
      .filter(
        layer =>
          layer.tier === 'ORDINARY' &&
          layer.mandatory
      );
  }

  getSharedAuthoritativeServices(): JumoSharedService[] {
    return this.sharedServices
      .list()
      .filter(service => service.authoritative);
  }

  getProductIntegrations(
    productId: string
  ): JumoIntegrationDefinition[] {
    return this.integrations
      .list()
      .filter(
        integration =>
          integration.sourceProductId === productId &&
          integration.enabled
      );
  }

  resolveProductArchitecture(
    productId: string
  ): {
    product: JumoCommercialProduct;
    ordinaryLayers: JumoArchitectureLayer[];
    sharedServices: JumoSharedService[];
    integrations: JumoIntegrationDefinition[];
  } {
    const product = this.products.require(productId);

    const ordinaryLayers =
      this.getMandatoryOrdinaryLayers();

    const sharedServices =
      product.sharedServiceIds
        .map(id => this.sharedServices.get(id))
        .filter(
          (service): service is JumoSharedService =>
            Boolean(service)
        );

    const integrations =
      this.getProductIntegrations(productId);

    return {
      product,
      ordinaryLayers,
      sharedServices,
      integrations,
    };
  }

  status() {
    return {
      families: this.families.size,
      layers: this.layers.size,
      
      sharedServices: this.sharedServices.size,
      products: this.products.size,
      packages: this.packages.size,
      integrations: this.integrations.size,

      ordinaryLayers:
        this.getMandatoryOrdinaryLayers().length,

      authoritativeSharedServices:
        this.getSharedAuthoritativeServices().length,

      extensible: true,
      fixedLayerLimit: false,
      fixedProductLimit: false,
      
      fixedFamilyLimit: false,
      fixedPackageLimit: false,
      dynamicRegistration: true,
    };
  }
}

export const JUMO_DYNAMIC_PLATFORM_REGISTRY =
  new JumoDynamicPlatformRegistry();
