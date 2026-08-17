import {
  JumoSharedServicesRegistry,
  createSharedServicesBinding,
  assertSharedServicesCompliance,
  JumoManufacturedProductSharedServices,
} from "../platform/shared";

export interface JumoManufacturingSharedServicesGateResult {
  passed: boolean;
  binding?: JumoManufacturedProductSharedServices;
  errors: string[];
  warnings: string[];
  timestamp: string;
}

export class JumoSharedServicesManufacturingGate {
  private readonly registry =
    JumoSharedServicesRegistry.getInstance();

  public verify(): JumoManufacturingSharedServicesGateResult {
    const timestamp = new Date().toISOString();
    const validation = this.registry.validate();

    if (!validation.valid) {
      return {
        passed: false,
        errors: validation.errors,
        warnings: validation.warnings,
        timestamp,
      };
    }

    try {
      const binding = createSharedServicesBinding(
        this.registry,
      );

      assertSharedServicesCompliance(binding);

      return {
        passed: true,
        binding,
        errors: [],
        warnings: validation.warnings,
        timestamp,
      };
    } catch (error) {
      return {
        passed: false,
        errors: [
          error instanceof Error
            ? error.message
            : "Shared services manufacturing gate failed.",
        ],
        warnings: validation.warnings,
        timestamp,
      };
    }
  }
}

export const jumoSharedServicesManufacturingGate =
  new JumoSharedServicesManufacturingGate();

export default JumoSharedServicesManufacturingGate;
