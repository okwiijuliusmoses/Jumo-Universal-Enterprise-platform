/**
 * JUMO DIGITAL PAY
 * Phase 5 — Multi-ERP / Product Integration Fabric
 *
 * Provides a single integration boundary for every JUMO
 * ERP, commercial product, institution and tenant.
 *
 * IMPORTANT:
 * Internal platform identities are NEVER exposed through
 * the public payment code.
 *
 * Public payment identity:
 *     exactly 10 digits
 *
 * Confidential identity:
 *     platform + product + ERP + tenant + institution
 *     + template + internal payee identity
 *
 * Designed for hybrid operation:
 *     ONLINE
 *     OFFLINE
 *     SYNC_PENDING
 *     SYNCHRONIZED
 */

import {
  digitalPayRuntime,
  type RuntimePaymentRequest,
  type RuntimePaymentResult,
} from "./digitalPayRuntime";

import type { PaymentChannel } from "./paymentTransactionService";

export type DigitalPayOperatingMode =
  | "ONLINE"
  | "OFFLINE"
  | "SYNC_PENDING"
  | "SYNCHRONIZED";

export type DigitalPayPlatformContext = {
  platformId: string;
  productId: string;
  erpId?: string;
  tenantId: string;
  templateId: string;
  institutionId: string;
};

export type DigitalPayIntegrationRequest = {
  context: DigitalPayPlatformContext;

  payerId: string;
  payeeId: string;

  amount: number;
  currency: string;

  rail:
    | "MOBILE_MONEY"
    | "BANK"
    | "CARD"
    | "QR"
    | "INTERNAL_WALLET";

  description?: string;

  mode?: DigitalPayOperatingMode;
};

export type DigitalPayIntegrationRecord = {
  integrationId: string;

  paymentId: string;

  context: DigitalPayPlatformContext;

  publicPayeeCode: string;

  mode: DigitalPayOperatingMode;

  createdAt: string;

  synchronized: boolean;
};

const integrationRecords =
  new Map<string, DigitalPayIntegrationRecord>();
/**
 * Internal canonical runtime state.
 * Never exposed through public integration records.
 */
const runtimeRequests = new Map<string, {
  request: RuntimePaymentRequest;
  domain:
    | "MERCHANT"
    | "SCHOOL"
    | "INSTITUTION"
    | "AGENT"
    | "SERVICE"
    | "ERP";
}>();

const runtimeResults =
  new Map<string, RuntimePaymentResult>();

function now(): string {
  return new Date().toISOString();
}

function createIntegrationId(): string {
  return `DPINT-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)
    .toUpperCase()}`;
}

/**
 * Generates the public-facing ten-digit payee code.
 *
 * This code is deliberately independent from:
 * platformId
 * productId
 * erpId
 * tenantId
 * templateId
 * institutionId
 * internal payeeId
 */
function generatePublicPayeeCode(): string {
  const value =
    Math.floor(
      1000000000 +
        Math.random() * 9000000000,
    );

  return String(value);
}

export class DigitalPayIntegrationService {
  /**
   * Register a payment request from any JUMO
   * ERP or commercial product.
   */
  create(
    request: DigitalPayIntegrationRequest,
  ): DigitalPayIntegrationRecord {
    if (
      !request.context.platformId ||
      !request.context.productId ||
      !request.context.tenantId ||
      !request.context.templateId ||
      !request.context.institutionId
    ) {
      throw new Error(
        "Incomplete JUMO Digital Pay platform context.",
      );
    }

    if (
      !request.payerId ||
      !request.payeeId
    ) {
      throw new Error(
        "Payer and payee identities are required.",
      );
    }

    if (
      !Number.isFinite(request.amount) ||
      request.amount <= 0
    ) {
      throw new Error(
        "Payment amount must be greater than zero.",
      );
    }

    const integrationId = createIntegrationId();

    /*
     * Translate the integration boundary's legacy rail names
     * into the canonical Digital Pay PaymentChannel contract.
     */
    const channel: PaymentChannel =
      request.rail === "MOBILE_MONEY"
        ? "MOBILE_MONEY"
        : request.rail === "BANK"
          ? "BANK"
          : request.rail === "CARD"
            ? "CARD"
            : request.rail === "QR"
              ? "QR"
              : "WALLET";

    const runtimeRequest: RuntimePaymentRequest = {
      context: {
        platformIdentity: request.context.platformId,
        tenantIdentity: request.context.tenantId,
        templateIdentity: request.context.templateId,
        institutionIdentity: request.context.institutionId,
        payeeCode: request.payeeId,
      },
      idempotencyKey: integrationId,
      payeeCode: request.payeeId,
      amount: request.amount,
      currency: request.currency,
      channel,
      payerReference: request.payerId,
      description: request.description,
    };

    const domain:
      | "MERCHANT"
      | "SCHOOL"
      | "INSTITUTION"
      | "AGENT"
      | "SERVICE"
      | "ERP" =
      request.context.erpId
        ? "ERP"
        : "INSTITUTION";

    const payment =
      digitalPayRuntime.createPayment(
        runtimeRequest,
        domain,
      );

    runtimeRequests.set(
      integrationId,
      {
        request: runtimeRequest,
        domain,
      },
    );

    runtimeResults.set(
      integrationId,
      payment,
    );

    const record: DigitalPayIntegrationRecord = {
      integrationId,
      paymentId:
        payment.transaction.transactionId,
      context: request.context,
      publicPayeeCode:
        payment.publicReference ||
        generatePublicPayeeCode(),
      mode: request.mode || "ONLINE",
      createdAt: now(),
      synchronized:
        request.mode !== "OFFLINE",
    };

    integrationRecords.set(
      integrationId,
      record,
    );

    return this.publicRecord(record);
  }

  /**
   * Execute an online payment.
   */
  execute(
    integrationId: string,
  ): RuntimePaymentResult {
    const record =
      this.getInternal(integrationId);

    if (record.mode === "OFFLINE") {
      throw new Error(
        "Offline payment must be synchronized before online execution.",
      );
    }

    const runtimeState =
      runtimeRequests.get(integrationId);

    if (!runtimeState) {
      throw new Error(
        `Digital Pay runtime request for ${integrationId} was not found.`,
      );
    }

    const result =
      digitalPayRuntime.executePayment(
        runtimeState.request,
        runtimeState.domain,
      );

    runtimeResults.set(
      integrationId,
      result,
    );

    return result;
  }

  /**
   * Mark an offline payment as waiting
   * for synchronization.
   */
  queueOffline(
    integrationId: string,
  ): DigitalPayIntegrationRecord {
    const record =
      this.getInternal(
        integrationId,
      );

    record.mode =
      "SYNC_PENDING";

    record.synchronized =
      false;

    integrationRecords.set(
      integrationId,
      record,
    );

    return this.publicRecord(
      record,
    );
  }

  /**
   * Synchronize an offline payment when
   * connectivity returns.
   */
  synchronize(
    integrationId: string,
  ): DigitalPayIntegrationRecord {
    const record =
      this.getInternal(
        integrationId,
      );

    record.mode =
      "SYNCHRONIZED";

    record.synchronized =
      true;

    integrationRecords.set(
      integrationId,
      record,
    );

    return this.publicRecord(
      record,
    );
  }

  /**
   * Return only the safe integration record.
   *
   * Confidential platform context is intentionally
   * omitted from the public representation.
   */
  getPublicRecord(
    integrationId: string,
  ): Omit<
    DigitalPayIntegrationRecord,
    "context"
  > {
    const record =
      this.getInternal(
        integrationId,
      );

    return {
      integrationId:
        record.integrationId,

      paymentId:
        record.paymentId,

      publicPayeeCode:
        record.publicPayeeCode,

      mode:
        record.mode,

      createdAt:
        record.createdAt,

      synchronized:
        record.synchronized,
    };
  }

  /**
   * Internal runtime lookup.
   */
  private getInternal(
    integrationId: string,
  ): DigitalPayIntegrationRecord {
    const record =
      integrationRecords.get(
        integrationId,
      );

    if (!record) {
      throw new Error(
        `Digital Pay integration ${integrationId} was not found.`,
      );
    }

    return record;
  }

  private publicRecord(
    record: DigitalPayIntegrationRecord,
  ): DigitalPayIntegrationRecord {
    return {
      ...record,
      context: {
        platformId: "[CONFIDENTIAL]",
        productId: "[CONFIDENTIAL]",
        erpId: "[CONFIDENTIAL]",
        tenantId: "[CONFIDENTIAL]",
        templateId: "[CONFIDENTIAL]",
        institutionId: "[CONFIDENTIAL]",
      },
    };
  }

  /**
   * Internal-only lookup.
   *
   * Used by trusted UEOS services that require the
   * confidential platform context.
   */
  getInternalContext(
    integrationId: string,
  ): DigitalPayPlatformContext {
    return {
      ...this.getInternal(
        integrationId,
      ).context,
    };
  }

  /**
   * Get all registered integrations.
   */
  list(): DigitalPayIntegrationRecord[] {
    return Array.from(
      integrationRecords.values(),
    ).map((record) =>
      this.publicRecord(record),
    );
  }
}

export const digitalPayIntegrationService =
  new DigitalPayIntegrationService();

export default digitalPayIntegrationService;
