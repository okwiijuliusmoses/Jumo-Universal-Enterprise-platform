/**
 * JUMO Shared Service Integration Engine
 *
 * Ensures JUMO products consume authoritative shared services
 * instead of creating isolated competing implementations.
 */

import {
  JUMO_DYNAMIC_PLATFORM_REGISTRY,
  JumoIntegrationDefinition,
  JumoSharedService,
} from '../registry/JumoDynamicPlatformRegistry';

export interface JumoIntegrationRequirement {
  productId: string;
  serviceId: string;
  serviceName: string;
  mandatory: boolean;
  configured: boolean;
  integrationId?: string;
  status:
    | 'CONNECTED'
    | 'MISSING'
    | 'OPTIONAL'
    | 'DISABLED';
}

export class JumoSharedServiceIntegrationEngine {

  resolve(productId: string): JumoIntegrationRequirement[] {
    const product =
      JUMO_DYNAMIC_PLATFORM_REGISTRY.products.require(productId);

    const services =
      JUMO_DYNAMIC_PLATFORM_REGISTRY
        .sharedServices
        .list();

    return services
      .filter(service =>
        service.mandatoryForAllProducts ||
        product.sharedServiceIds.includes(service.id)
      )
      .map(service => {

        const integration =
          JUMO_DYNAMIC_PLATFORM_REGISTRY
            .integrations
            .list()
            .find(
              item =>
                item.sourceProductId === productId &&
                item.targetServiceId === service.id
            );

        return {
          productId,
          serviceId: service.id,
          serviceName: service.name,
          mandatory:
            service.mandatoryForAllProducts ||
            Boolean(integration?.mandatory),
          configured:
            Boolean(integration?.enabled),
          integrationId: integration?.id,
          status:
            integration?.enabled
              ? 'CONNECTED'
              : service.mandatoryForAllProducts
                ? 'MISSING'
                : 'OPTIONAL',
        };
      });
  }

  validate(productId: string): {
    valid: boolean;
    requirements: JumoIntegrationRequirement[];
    missingMandatory: JumoIntegrationRequirement[];
  } {
    const requirements = this.resolve(productId);

    const missingMandatory =
      requirements.filter(
        requirement =>
          requirement.mandatory &&
          !requirement.configured
      );

    return {
      valid: missingMandatory.length === 0,
      requirements,
      missingMandatory,
    };
  }
}

export const JUMO_SHARED_SERVICE_INTEGRATION_ENGINE =
  new JumoSharedServiceIntegrationEngine();
