import {
  JUMO_SHARED_PRODUCT_REGISTRY,
} from '../platform/products/JumoSharedProductRegistry';

export interface JumoProductIntegration {
  id: string;

  sourceProductId: string;

  targetProductId: string;

  enabled: boolean;

  mandatory: boolean;

  configurable: boolean;

  settings: Record<string, unknown>;
}

export class JumoIntegrationFabric {

  private readonly integrations =
    new Map<string, JumoProductIntegration>();

  register(
    integration: JumoProductIntegration
  ) {
    this.integrations.set(
      integration.id,
      integration
    );

    return integration;
  }

  list() {
    return Array.from(
      this.integrations.values()
    );
  }

  forProduct(
    productId: string
  ) {
    return this.list().filter(
      integration =>
        integration.sourceProductId === productId &&
        integration.enabled
    );
  }

  validate(
    productId: string
  ) {
    const product =
      JUMO_SHARED_PRODUCT_REGISTRY.get(productId);

    if (!product) {
      return {
        valid: false,
        errors: [
          `Product ${productId} is not registered.`,
        ],
      };
    }

    const requiredSharedProducts =
      product.sharedServiceIds;

    const integrations =
      this.forProduct(productId);

    const missing =
      requiredSharedProducts.filter(
        serviceId =>
          !integrations.some(
            integration =>
              integration.targetProductId === serviceId
          )
      );

    return {
      valid: missing.length === 0,
      missing,
      integrations,
    };
  }
}

export const JUMO_INTEGRATION_FABRIC =
  new JumoIntegrationFabric();
