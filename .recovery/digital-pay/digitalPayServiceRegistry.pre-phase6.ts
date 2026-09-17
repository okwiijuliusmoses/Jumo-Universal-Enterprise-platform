/**
 * JUMO DIGITAL PAY
 * Phase 6 — Unified Financial Services Fabric
 *
 * DIGITAL PAY is the common financial execution fabric for
 * JUMO ERPs, commercial products, institutions, merchants,
 * agents, wallets and financial services.
 *
 * Capabilities are registered independently while sharing:
 * - UEOS identity boundaries
 * - tenant isolation
 * - payment lifecycle
 * - settlement
 * - reconciliation
 * - audit
 * - revenue routing
 * - hybrid/offline synchronization
 */

export type DigitalPayServiceCapability =
  | "AGENT_BANKING"
  | "MOBILE_AGENT"
  | "MERCHANT_PAYMENT"
  | "CODE_PAYMENT"
  | "QR_PAYMENT"
  | "SCHOOL_PAY"
  | "INSTITUTIONAL_PAYMENT"
  | "SERVICE_FEE_DEDUCTION"
  | "WALLET"
  | "COLLECTIONS"
  | "DISBURSEMENT"
  | "LOANS"
  | "BANKING"
  | "SAVINGS"
  | "RECURRING_PAYMENT"
  | "PLATFORM_REVENUE"
  | "COMMISSION"
  | "SETTLEMENT"
  | "RECONCILIATION";

export type DigitalPayServiceStatus =
  | "ACTIVE"
  | "SUSPENDED"
  | "PENDING_CONFIGURATION";

export type DigitalPayServiceMode =
  | "ONLINE"
  | "OFFLINE"
  | "HYBRID";

export type DigitalPayServiceContext = {
  platformId: string;
  productId: string;
  erpId?: string;
  tenantId: string;
  templateId: string;
  institutionId: string;
};

export type DigitalPayServiceRegistration = {
  serviceId: string;

  capability:
    DigitalPayServiceCapability;

  name: string;

  context:
    DigitalPayServiceContext;

  mode:
    DigitalPayServiceMode;

  status:
    DigitalPayServiceStatus;

  publicCodePrefix: string;

  createdAt: string;
};

const registry =
  new Map<
    string,
    DigitalPayServiceRegistration
  >();

function createServiceId(): string {
  return (
    "DPS-" +
    Date.now().toString(36).toUpperCase() +
    "-" +
    Math.random()
      .toString(36)
      .slice(2, 8)
      .toUpperCase()
  );
}

/**
 * Public codes are deliberately independent of all
 * confidential UEOS identities.
 */
function createPublicCodePrefix(): string {
  return Math.floor(
    1000000000 +
      Math.random() * 9000000000,
  ).toString();
}

export class DigitalPayServiceRegistry {
  register(
    capability:
      DigitalPayServiceCapability,
    name: string,
    context: DigitalPayServiceContext,
    mode:
      DigitalPayServiceMode = "HYBRID",
  ): DigitalPayServiceRegistration {
    if (!name.trim()) {
      throw new Error(
        "Digital Pay service name is required.",
      );
    }

    if (
      !context.platformId ||
      !context.productId ||
      !context.tenantId ||
      !context.templateId ||
      !context.institutionId
    ) {
      throw new Error(
        "Complete Digital Pay service context is required.",
      );
    }

    const service: DigitalPayServiceRegistration =
      {
        serviceId:
          createServiceId(),

        capability,

        name,

        context: {
          ...context,
        },

        mode,

        status:
          "PENDING_CONFIGURATION",

        publicCodePrefix:
          createPublicCodePrefix(),

        createdAt:
          new Date().toISOString(),
      };

    registry.set(
      service.serviceId,
      service,
    );

    return this.publicView(service);
  }

  activate(
    serviceId: string,
  ): DigitalPayServiceRegistration {
    const service =
      this.require(serviceId);

    service.status = "ACTIVE";

    registry.set(
      serviceId,
      service,
    );

    return this.publicView(service);
  }

  suspend(
    serviceId: string,
  ): DigitalPayServiceRegistration {
    const service =
      this.require(serviceId);

    service.status = "SUSPENDED";

    registry.set(
      serviceId,
      service,
    );

    return this.publicView(service);
  }

  get(
    serviceId: string,
  ): DigitalPayServiceRegistration {
    return this.publicView(
      this.require(serviceId),
    );
  }

  list(): DigitalPayServiceRegistration[] {
    return Array.from(
      registry.values(),
    ).map((service) =>
      this.publicView(service),
    );
  }

  listByCapability(
    capability:
      DigitalPayServiceCapability,
  ): DigitalPayServiceRegistration[] {
    return Array.from(
      registry.values(),
    )
      .filter(
        (service) =>
          service.capability === capability,
      )
      .map((service) =>
        this.publicView(service),
      );
  }

  /**
   * Trusted UEOS services can retrieve the confidential
   * context internally. It is never returned through the
   * normal public service representation.
   */
  getInternalContext(
    serviceId: string,
  ): DigitalPayServiceContext {
    return {
      ...this.require(serviceId).context,
    };
  }

  private require(
    serviceId: string,
  ): DigitalPayServiceRegistration {
    const service =
      registry.get(serviceId);

    if (!service) {
      throw new Error(
        `Digital Pay service ${serviceId} was not found.`,
      );
    }

    return service;
  }

  private publicView(
    service: DigitalPayServiceRegistration,
  ): DigitalPayServiceRegistration {
    return {
      ...service,

      context: {
        platformId:
          "[CONFIDENTIAL]",
        productId:
          "[CONFIDENTIAL]",
        erpId:
          "[CONFIDENTIAL]",
        tenantId:
          "[CONFIDENTIAL]",
        templateId:
          "[CONFIDENTIAL]",
        institutionId:
          "[CONFIDENTIAL]",
      },
    };
  }
}

export const digitalPayServiceRegistry =
  new DigitalPayServiceRegistry();

export default digitalPayServiceRegistry;
