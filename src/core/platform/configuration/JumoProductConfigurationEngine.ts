export interface JumoProductConfiguration {
  productId: string;

  version: string;

  enabledCapabilities: string[];

  enabledLayers: string[];

  enabledStudios: string[];

  enabledIntegrations: string[];

  sharedProducts: string[];

  environment:
    | 'LOCAL'
    | 'HYBRID'
    | 'SOVEREIGN'
    | 'CLOUD';

  settings: Record<string, unknown>;

  configuredBy?: string;

  configuredAt?: string;
}

export class JumoProductConfigurationEngine {

  private readonly configurations =
    new Map<string, JumoProductConfiguration>();

  configure(
    configuration: JumoProductConfiguration
  ) {
    if (!configuration.productId) {
      throw new Error(
        'Product configuration requires productId.'
      );
    }

    this.configurations.set(
      configuration.productId,
      configuration
    );

    return configuration;
  }

  get(
    productId: string
  ) {
    return this.configurations.get(productId);
  }

  list() {
    return Array.from(
      this.configurations.values()
    );
  }

  isConfigured(
    productId: string
  ) {
    return this.configurations.has(productId);
  }

  validate(
    configuration: JumoProductConfiguration
  ) {
    const errors: string[] = [];

    if (!configuration.version) {
      errors.push('Configuration version is required.');
    }

    if (!configuration.environment) {
      errors.push('Runtime environment is required.');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export const JUMO_PRODUCT_CONFIGURATION_ENGINE =
  new JumoProductConfigurationEngine();
