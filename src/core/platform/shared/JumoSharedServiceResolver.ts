import {
  jumoSharedEnterpriseServices,
  JumoSharedServiceId,
  JumoServiceMode,
} from "./JumoSharedEnterpriseServices";

export interface JumoSharedServiceBinding {
  serviceId: JumoSharedServiceId;
  enabled: boolean;
  provider?: string;
  mode?: JumoServiceMode;
  endpoint?: string;
}

export class JumoSharedServiceResolver {
  static resolve(
    serviceIds: JumoSharedServiceId[] = [],
  ): JumoSharedServiceBinding[] {
    const bindings: JumoSharedServiceBinding[] = [];

    for (const serviceId of serviceIds) {
      const service = jumoSharedEnterpriseServices.get(serviceId);

      if (!service) {
        continue;
      }

      bindings.push({
        serviceId: service.id,
        enabled: Boolean(service.configuration.enabled),
        ...(service.configuration.provider
          ? { provider: service.configuration.provider }
          : {}),
        ...(service.configuration.mode
          ? { mode: service.configuration.mode }
          : {}),
        ...(service.configuration.endpoint
          ? { endpoint: service.configuration.endpoint }
          : {}),
      });
    }

    return bindings;
  }

  static requiredServices(): JumoSharedServiceBinding[] {
    return jumoSharedEnterpriseServices
      .getAll()
      .filter((service) => service.required)
      .map(
        (service): JumoSharedServiceBinding => ({
          serviceId: service.id,
          enabled: Boolean(service.configuration.enabled),
          ...(service.configuration.provider
            ? { provider: service.configuration.provider }
            : {}),
          ...(service.configuration.mode
            ? { mode: service.configuration.mode }
            : {}),
          ...(service.configuration.endpoint
            ? { endpoint: service.configuration.endpoint }
            : {}),
        }),
      );
  }

  static isOperational(
    serviceId: JumoSharedServiceId,
  ): boolean {
    return jumoSharedEnterpriseServices.isEnabled(serviceId);
  }
}

export const jumoSharedServiceResolver =
  JumoSharedServiceResolver;
