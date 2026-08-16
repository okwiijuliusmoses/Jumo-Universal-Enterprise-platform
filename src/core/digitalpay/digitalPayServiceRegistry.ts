/**
 * JUMO DIGITAL PAY
 * PHASE 6 — UNIVERSAL FINANCIAL SERVICES FABRIC
 *
 * Unified financial service registry for:
 * Agent Banking
 * Mobile Agents
 * Merchant Payments
 * Code / QR Payments
 * School Pay
 * Institutional Payments
 * Service Fees
 * Wallets
 * Banking
 * Loans
 * Collections
 * Disbursements
 * Platform Revenue
 * Commissions
 *
 * Internal UEOS identities remain confidential.
 * Public payee identity is represented separately.
 */

export type DigitalPayCapability =
  | "AGENT_BANKING"
  | "MOBILE_AGENT"
  | "MERCHANT_PAYMENT"
  | "CODE_PAYMENT"
  | "QR_PAYMENT"
  | "SCHOOL_PAY"
  | "INSTITUTIONAL_PAYMENT"
  | "SERVICE_FEE"
  | "WALLET"
  | "BANKING"
  | "LOANS"
  | "LOAN_REPAYMENT"
  | "COLLECTIONS"
  | "DISBURSEMENTS"
  | "PLATFORM_REVENUE"
  | "COMMISSION"
  | "RECURRING_PAYMENT";

export type DigitalPayMode =
  | "ONLINE"
  | "OFFLINE"
  | "HYBRID";

export type DigitalPayServiceStatus =
  | "PENDING"
  | "ACTIVE"
  | "SUSPENDED";

export interface DigitalPayIdentityBoundary {
  platformId: string;
  productId: string;
  erpId?: string;
  tenantId: string;
  templateId: string;
  institutionId?: string;
  payeeId: string;

  confidential: true;
}

export interface DigitalPayService {
  serviceId: string;
  capability: DigitalPayCapability;
  name: string;

  identity:
    DigitalPayIdentityBoundary;

  mode: DigitalPayMode;

  status:
    DigitalPayServiceStatus;

  publicPayeeCode: string;

  createdAt: string;
  updatedAt: string;
}

const services =
  new Map<string, DigitalPayService>();

function generateServiceId(): string {
  return `DPS-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)
    .toUpperCase()}`;
}

/**
 * Public payment identifier.
 *
 * Exactly ten numeric digits.
 *
 * It has NO derivation relationship to:
 * platform ID
 * product ID
 * ERP ID
 * tenant ID
 * template ID
 * institution ID
 * internal payee ID
 */
function generatePayeeCode(): string {
  return Math.floor(
    1000000000 +
      Math.random() * 9000000000,
  ).toString();
}

export class DigitalPayServiceRegistry {
  register(
    capability: DigitalPayCapability,
    name: string,
    identity: DigitalPayIdentityBoundary,
    mode: DigitalPayMode = "HYBRID",
  ): DigitalPayService {
    if (!name.trim()) {
      throw new Error(
        "Digital Pay service name is required.",
      );
    }

    if (
      !identity.platformId ||
      !identity.productId ||
      !identity.tenantId ||
      !identity.templateId ||
      !identity.payeeId
    ) {
      throw new Error(
        "Incomplete Digital Pay identity boundary.",
      );
    }

    const service: DigitalPayService = {
      serviceId:
        generateServiceId(),

      capability,

      name,

      identity: {
        ...identity,
        confidential: true,
      },

      mode,

      status: "PENDING",

      publicPayeeCode:
        generatePayeeCode(),

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    };

    services.set(
      service.serviceId,
      service,
    );

    return service;
  }

  activate(
    serviceId: string,
  ): DigitalPayService {
    const service =
      this.require(serviceId);

    service.status = "ACTIVE";
    service.updatedAt =
      new Date().toISOString();

    return service;
  }

  suspend(
    serviceId: string,
  ): DigitalPayService {
    const service =
      this.require(serviceId);

    service.status = "SUSPENDED";
    service.updatedAt =
      new Date().toISOString();

    return service;
  }

  get(
    serviceId: string,
  ): DigitalPayService {
    return this.require(serviceId);
  }

  list(): DigitalPayService[] {
    return Array.from(
      services.values(),
    );
  }

  listByCapability(
    capability: DigitalPayCapability,
  ): DigitalPayService[] {
    return Array.from(
      services.values(),
    ).filter(
      (service) =>
        service.capability === capability,
    );
  }

  /**
   * Public-safe representation.
   *
   * Confidential UEOS identities are removed.
   */
  publicView(
    serviceId: string,
  ) {
    const service =
      this.require(serviceId);

    return {
      serviceId:
        service.serviceId,

      capability:
        service.capability,

      name:
        service.name,

      mode:
        service.mode,

      status:
        service.status,

      paymentCode:
        service.publicPayeeCode,

      createdAt:
        service.createdAt,

      updatedAt:
        service.updatedAt,
    };
  }

  /**
   * Internal-only identity access.
   *
   * This method must only be consumed by trusted
   * UEOS services.
   */
  internalIdentity(
    serviceId: string,
  ): DigitalPayIdentityBoundary {
    return {
      ...this.require(serviceId).identity,
    };
  }

  private require(
    serviceId: string,
  ): DigitalPayService {
    const service =
      services.get(serviceId);

    if (!service) {
      throw new Error(
        `Digital Pay service not found: ${serviceId}`,
      );
    }

    return service;
  }
}

export const digitalPayServiceRegistry =
  new DigitalPayServiceRegistry();

export default digitalPayServiceRegistry;
