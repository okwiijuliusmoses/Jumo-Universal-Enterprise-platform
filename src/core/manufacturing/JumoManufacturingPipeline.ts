import {
  JumoProductSpecification,
} from './JumoProductSpecification';

import {
  JUMO_PRODUCT_FACTORY,
} from './JumoProductFactory';

import {
  JUMO_PRODUCT_CONFIGURATION_ENGINE,
} from '../platform/configuration/JumoProductConfigurationEngine';

import {
  JUMO_FINAL_PROVISIONING_GATE,
} from '../platform/provisioning/JumoFinalProvisioningGate';

export interface JumoManufacturingPipelineResult {
  productId: string;

  manufactured: boolean;

  configurationRequired: boolean;

  verificationRequired: boolean;

  provisioningAllowed: boolean;

  failedGates: string[];

  stage:
    | 'SPECIFICATION'
    | 'ASSEMBLY'
    | 'CONFIGURATION'
    | 'VERIFICATION'
    | 'PROVISIONING'
    | 'BLOCKED';
}

export class JumoManufacturingPipeline {

  manufacture(
    specification: JumoProductSpecification
  ): JumoManufacturingPipelineResult {

    const factoryCheck =
      JUMO_PRODUCT_FACTORY.canManufacture(
        specification
      );

    const productId =
      specification.productId ??
      `product-${specification.specificationId}`;

    if (!factoryCheck.allowed) {
      return {
        productId,
        manufactured: false,
        configurationRequired: false,
        verificationRequired: false,
        provisioningAllowed: false,
        failedGates: [
          factoryCheck.reason ?? 'Factory gate failed.',
        ],
        stage: 'BLOCKED',
      };
    }

    JUMO_PRODUCT_FACTORY.manufacture(
      specification
    );

    const configuration =
      JUMO_PRODUCT_CONFIGURATION_ENGINE
        .get(productId);

    const readiness =
      JUMO_FINAL_PROVISIONING_GATE.evaluate({
        specificationApproved:
          specification.approved,

        configurationValid:
          Boolean(configuration),

        integrationsValid: false,

        verificationPassed: false,

        testsPassed: false,

        architectureValid: false,
      });

    return {
      productId,

      manufactured: true,

      configurationRequired:
        !configuration,

      verificationRequired: true,

      provisioningAllowed:
        readiness.provisioningAllowed,

      failedGates:
        readiness.failedChecks,

      stage:
        readiness.provisioningAllowed
          ? 'PROVISIONING'
          : configuration
            ? 'VERIFICATION'
            : 'CONFIGURATION',
    };
  }
}

export const JUMO_MANUFACTURING_PIPELINE =
  new JumoManufacturingPipeline();
