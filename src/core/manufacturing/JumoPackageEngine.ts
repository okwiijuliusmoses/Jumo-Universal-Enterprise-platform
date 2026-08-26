import {
  JumoCommercialTier,
} from '../platform/products/JumoCommercialProductDefinition';

import {
  JumoProductSpecification,
} from './JumoProductSpecification';

import {
  JUMO_SHARED_PRODUCT_REGISTRY,
} from '../platform/products/JumoSharedProductRegistry';

export interface JumoResolvedPackage {
  tier: JumoCommercialTier;

  products: string[];

  sharedProducts: string[];

  capabilities: string[];

  layers: string[];

  studios: string[];

  integrations: string[];

  billable: boolean;
}

export class JumoPackageEngine {

  resolve(
    specification: JumoProductSpecification
  ): JumoResolvedPackage {

    const sharedProducts =
      JUMO_SHARED_PRODUCT_REGISTRY
        .list()
        .filter(product =>
          product.shared &&
          (
            product.tiers.includes(specification.tier) ||
            product.ordinaryIncluded
          )
        );

    const requestedSharedProducts =
      specification.requestedSharedProducts
        .filter(id =>
          JUMO_SHARED_PRODUCT_REGISTRY.has(id)
        );

    const sharedIds = Array.from(
      new Set([
        ...sharedProducts.map(product => product.id),
        ...requestedSharedProducts,
      ])
    );

    const allCapabilities = Array.from(
      new Set([
        ...specification.requestedCapabilities,
        ...sharedProducts.flatMap(
          product => product.capabilityIds
        ),
      ])
    );

    const allLayers = Array.from(
      new Set([
        ...specification.requestedLayers,
        ...sharedProducts.flatMap(
          product => product.architectureLayerIds
        ),
      ])
    );

    const allStudios = Array.from(
      new Set([
        ...specification.requestedStudios,
        ...sharedProducts.flatMap(
          product => product.studioIds
        ),
      ])
    );

    return {
      tier: specification.tier,

      products:
        specification.productId
          ? [specification.productId]
          : [],

      sharedProducts: sharedIds,

      capabilities: allCapabilities,

      layers: allLayers,

      studios: allStudios,

      integrations:
        specification.requiredIntegrations,

      billable:
        specification.tier !== 'ORDINARY',
    };
  }
}

export const JUMO_PACKAGE_ENGINE =
  new JumoPackageEngine();
