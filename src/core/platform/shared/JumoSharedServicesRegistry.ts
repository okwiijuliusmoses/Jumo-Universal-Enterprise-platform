import {
  JumoProviderConfiguration,
  JumoSharedServiceDefinition,
  JumoSharedServicesProfile,
  SharedServiceDomain,
  SharedServiceMode,
  ServiceHealth,
  createDefaultJumoSharedServicesProfile,
} from "./JumoSharedServices";

export interface JumoSharedServiceResolution {
  serviceId: string;
  domain: SharedServiceDomain;
  provider: JumoProviderConfiguration | null;
  mode: SharedServiceMode;
  healthy: boolean;
  fallbackAvailable: boolean;
  reason: string;
}

export interface JumoSharedServiceAuditEvent {
  eventId: string;
  serviceId: string;
  action: string;
  actor: string;
  timestamp: string;
  success: boolean;
  metadata?: Record<string, unknown>;
}

export class JumoSharedServicesRegistry {
  private static instance: JumoSharedServicesRegistry;

  private profile: JumoSharedServicesProfile;
  private readonly auditEvents: JumoSharedServiceAuditEvent[] = [];

  private constructor() {
    this.profile = createDefaultJumoSharedServicesProfile();
  }

  public static getInstance(): JumoSharedServicesRegistry {
    if (!JumoSharedServicesRegistry.instance) {
      JumoSharedServicesRegistry.instance =
        new JumoSharedServicesRegistry();
    }

    return JumoSharedServicesRegistry.instance;
  }

  public getProfile(): JumoSharedServicesProfile {
    return structuredClone(this.profile);
  }

  public getAllServices(): JumoSharedServiceDefinition[] {
    return Object.values(this.profile.services);
  }

  public getService(
    serviceId: string,
  ): JumoSharedServiceDefinition | undefined {
    return this.profile.services[serviceId];
  }

  public hasService(serviceId: string): boolean {
    return Boolean(this.profile.services[serviceId]);
  }

  public getServicesByDomain(
    domain: SharedServiceDomain,
  ): JumoSharedServiceDefinition[] {
    return this.getAllServices().filter(
      (service) => service.domain === domain,
    );
  }

  public configureProvider(
    serviceId: string,
    providerId: string,
    patch: Partial<JumoProviderConfiguration>,
    actor = "SYSTEM",
  ): void {
    const service = this.profile.services[serviceId];

    if (!service) {
      throw new Error(
        `Shared service "${serviceId}" is not registered.`,
      );
    }

    const provider = service.providers.find(
      (item) => item.providerId === providerId,
    );

    if (!provider) {
      throw new Error(
        `Provider "${providerId}" is not registered for service "${serviceId}".`,
      );
    }

    Object.assign(provider, patch);

    this.audit(
      serviceId,
      "CONFIGURE_PROVIDER",
      actor,
      true,
      {
        providerId,
        patch,
      },
    );

    this.touch();
  }

  public setServiceMode(
    serviceId: string,
    mode: SharedServiceMode,
    actor = "SYSTEM",
  ): void {
    const service = this.profile.services[serviceId];

    if (!service) {
      throw new Error(
        `Shared service "${serviceId}" is not registered.`,
      );
    }

    service.defaultMode = mode;

    this.audit(
      serviceId,
      "SET_SERVICE_MODE",
      actor,
      true,
      { mode },
    );

    this.touch();
  }

  public setServiceHealth(
    serviceId: string,
    health: ServiceHealth,
    actor = "SYSTEM",
  ): void {
    const service = this.profile.services[serviceId];

    if (!service) {
      throw new Error(
        `Shared service "${serviceId}" is not registered.`,
      );
    }

    service.health = health;

    this.audit(
      serviceId,
      "SET_HEALTH",
      actor,
      true,
      { health },
    );

    this.touch();
  }

  public resolve(
    serviceId: string,
  ): JumoSharedServiceResolution {
    const service = this.profile.services[serviceId];

    if (!service) {
      return {
        serviceId,
        domain: "CONFIGURATION",
        provider: null,
        mode: "DISABLED",
        healthy: false,
        fallbackAvailable: false,
        reason: "SERVICE_NOT_REGISTERED",
      };
    }

    const enabled = service.providers
      .filter((item) => item.enabled)
      .sort((a, b) => a.priority - b.priority);

    const preferred = enabled[0] ?? null;

    const fallbackAvailable = enabled.length > 1;

    return {
      serviceId,
      domain: service.domain,
      provider: preferred,
      mode: preferred?.mode ?? service.defaultMode,
      healthy:
        service.health === "HEALTHY" ||
        service.health === "NOT_CONFIGURED",
      fallbackAvailable,
      reason: preferred
        ? `Resolved to ${preferred.providerId}.`
        : "NO_ENABLED_PROVIDER",
    };
  }

  public validate(): {
    valid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const service of this.getAllServices()) {
      if (service.required && service.providers.length === 0) {
        errors.push(
          `Required service "${service.serviceId}" has no providers.`,
        );
      }

      const enabledProviders = service.providers.filter(
        (provider) => provider.enabled,
      );

      if (
        service.required &&
        enabledProviders.length === 0 &&
        service.defaultMode !== "DISABLED"
      ) {
        errors.push(
          `Required service "${service.serviceId}" has no enabled provider.`,
        );
      }

      if (enabledProviders.length === 1) {
        warnings.push(
          `Service "${service.serviceId}" has no provider failover.`,
        );
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  public getAuditEvents(): JumoSharedServiceAuditEvent[] {
    return [...this.auditEvents];
  }

  public getSummary() {
    const services = this.getAllServices();

    return {
      profileId: this.profile.profileId,
      totalServices: services.length,
      requiredServices: services.filter(
        (service) => service.required,
      ).length,
      configuredProviders: services.reduce(
        (total, service) =>
          total +
          service.providers.filter(
            (provider) => provider.enabled,
          ).length,
        0,
      ),
      healthyServices: services.filter(
        (service) => service.health === "HEALTHY",
      ).length,
      domains: [
        ...new Set(
          services.map((service) => service.domain),
        ),
      ],
      policies: this.profile.globalPolicies,
      validation: this.validate(),
    };
  }

  private audit(
    serviceId: string,
    action: string,
    actor: string,
    success: boolean,
    metadata?: Record<string, unknown>,
  ): void {
    this.auditEvents.push({
      eventId:
        `SSA-${Date.now()}-${this.auditEvents.length + 1}`,
      serviceId,
      action,
      actor,
      timestamp: new Date().toISOString(),
      success,
      metadata,
    });

    if (this.auditEvents.length > 1000) {
      this.auditEvents.shift();
    }
  }

  private touch(): void {
    this.profile.updatedAt = new Date().toISOString();
  }
}

export const jumoSharedServices =
  JumoSharedServicesRegistry.getInstance();

export default JumoSharedServicesRegistry;
