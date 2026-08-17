import {
  JumoProductSpecification,
} from './JumoProductSpecification';

import {
  JUMO_SHARED_PRODUCT_REGISTRY,
} from '../platform/products/JumoSharedProductRegistry';

import {
  JUMO_PACKAGE_ENGINE,
} from './JumoPackageEngine';

export interface JumoManufacturedProduct {
  productId: string;

  specificationId: string;

  name: string;

  tier: string;

  package: ReturnType<
    typeof JUMO_PACKAGE_ENGINE.resolve
  >;

  status:
    | 'SPECIFIED'
    | 'ASSEMBLED'
    | 'CONFIGURATION_REQUIRED'
    | 'VERIFICATION_REQUIRED'
    | 'READY_FOR_PROVISIONING';
}

export class JumoProductFactory {

  manufacture(
    specification: JumoProductSpecification
  ): JumoManufacturedProduct {

    const packageDefinition =
      JUMO_PACKAGE_ENGINE.resolve(
        specification
      );

    const productId =
      specification.productId ??
      `product-${specification.specificationId}`;

    return {
      productId,

      specificationId:
        specification.specificationId,

      name:
        specification.proposedName,

      tier:
        specification.tier,

      package:
        packageDefinition,

      status:
        'ASSEMBLED',
    };
  }

  canManufacture(
    specification: JumoProductSpecification
  ) {

    if (!specification.approved) {
      return {
        allowed: false,
        reason:
          'Product specification is not approved.',
      };
    }

    if (
      specification.tier === 'GLOBAL' &&
      specification.requestedSharedProducts.length === 0
    ) {
      return {
        allowed: false,
        reason:
          'Global products require configured shared-product scope.',
      };
    }

    return {
      allowed: true,
    };
  }
}

export const JUMO_PRODUCT_FACTORY =
  new JumoProductFactory();
