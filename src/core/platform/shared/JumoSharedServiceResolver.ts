import {
  jumoSharedEnterpriseServices,
  JumoSharedServiceId,
} from "./JumoSharedEnterpriseServices";

export interface JumoSharedServiceBinding {
  serviceId: JumoSharedServiceId;
  enabled: boolean;
  provider?: string;
  mode?: string;
  endpoint?: string;
}

export class JumoSharedServiceResolver {
  static resolve(
    serviceIds: JumoSharedServiceId[] = [],
  ): JumoSharedServiceBinding[] {
    return serviceIds
      .map((serviceId) => {
        const service = jumoSharedEnterpriseServices.get(serviceId);

        if (!service) return null;

        return {
          serviceId,
          enabled: service.configuration.enabled,
          provider: service.configuration.provider,
          mode: service.configuration.mode,
          endpoint: service.configuration.endpoint,
        };
      })
      .filter(
        (value): value is JumoSharedServiceBinding => value !== null,
      );
  }

  static requiredServices(): JumoSharedServiceBinding[] {
    return jumoSharedEnterpriseServices
      .getAll()
      .filter((service) => service.required)
      .map((service) => ({
        serviceId: service.id,
        enabled: service.configuration.enabled,
        provider: service.configuration.provider,
        mode: service.configuration.mode,
        endpoint: service.configuration.endpoint,
      }));
  }

  static isOperational(serviceId: JumoSharedServiceId): boolean {
    return jumoSharedEnterpriseServices.isEnabled(serviceId);
  }
}

export const jumoSharedServiceResolver = JumoSharedServiceResolver;
