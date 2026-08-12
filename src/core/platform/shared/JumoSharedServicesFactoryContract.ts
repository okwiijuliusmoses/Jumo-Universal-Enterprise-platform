import {
  JumoSharedServicesRegistry,
} from "./JumoSharedServicesRegistry";

export interface JumoManufacturedProductSharedServices {
  sharedServicesProfileId: string;

  identity: string;
  security: string;
  accounting: string;
  faap: string;
  treasury: string;
  payments: string;
  communication: string;
  ai: string;
  cloud: string;
  data: string;
  storage: string;
  integration: string;
  workflow: string;
  automation: string;
  audit: string;
  observability: string;
  backup: string;
  disasterRecovery: string;
  compliance: string;
  documents: string;
  search: string;
  notification: string;
  verification: string;
  registry: string;
  deployment: string;
  configuration: string;
}

export function createSharedServicesBinding(
  registry: JumoSharedServicesRegistry,
): JumoManufacturedProductSharedServices {
  const resolve = (id: string): string => {
    const result = registry.resolve(id);

    if (!result.provider) {
      throw new Error(
        `Shared service "${id}" cannot be bound because no provider is available.`,
      );
    }

    return result.provider.providerId;
  };

  return {
    sharedServicesProfileId:
      registry.getProfile().profileId,

    identity: resolve("identity"),
    security: resolve("security"),
    accounting: resolve("accounting"),
    faap: resolve("faap"),
    treasury: resolve("treasury"),
    payments: resolve("payments"),
    communication: resolve("communication"),
    ai: resolve("ai"),
    cloud: resolve("cloud"),
    data: resolve("data"),
    storage: resolve("storage"),
    integration: resolve("integration"),
    workflow: resolve("workflow"),
    automation: resolve("automation"),
    audit: resolve("audit"),
    observability: resolve("observability"),
    backup: resolve("backup"),
    disasterRecovery: resolve("disaster-recovery"),
    compliance: resolve("compliance"),
    documents: resolve("documents"),
    search: resolve("search"),
    notification: resolve("notification"),
    verification: resolve("verification"),
    registry: resolve("registry"),
    deployment: resolve("deployment"),
    configuration: resolve("configuration"),
  };
}

export function assertSharedServicesCompliance(
  binding: JumoManufacturedProductSharedServices,
): void {
  const required = Object.entries(binding);

  const missing = required.filter(
    ([key, value]) =>
      key !== "sharedServicesProfileId" &&
      (!value || value.trim().length === 0),
  );

  if (missing.length > 0) {
    throw new Error(
      `Manufacturing contract violation: missing shared services: ${missing
        .map(([key]) => key)
        .join(", ")}`,
    );
  }
}
