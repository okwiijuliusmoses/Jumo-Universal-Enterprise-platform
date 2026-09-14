/**
 * JUMO DIGITAL PAY
 * PHASE 9 — PAYEE IDENTITY & PAYMENT-CODE ISOLATION
 *
 * PUBLIC:
 *   - exactly one generated 10-digit payment code
 *
 * CONFIDENTIAL:
 *   - platform identity
 *   - tenant identity
 *   - template identity
 *   - institution identity
 *   - internal beneficiary identity
 *
 * The public payment code must never expose internal identifiers.
 */

export type PayeeType =
  | "PERSON"
  | "MERCHANT"
  | "AGENT"
  | "SCHOOL"
  | "UNIVERSITY"
  | "COLLEGE"
  | "INSTITUTION"
  | "ENTERPRISE"
  | "GOVERNMENT"
  | "SERVICE";

export interface PayeeIdentity {
  internalId: string;

  platformId: string;

  tenantId: string;

  templateId: string;

  institutionId?: string;

  payeeType: PayeeType;

  publicPaymentCode: string;

  active: boolean;

  createdAt: string;
}

const confidentialRegistry =
  new Map<string, PayeeIdentity>();

const publicCodeIndex =
  new Map<string, string>();

function generateTenDigitCode(): string {
  /*
   * Generate only the public numeric identifier.
   * No platform/tenant/template/institution data
   * is encoded into the number.
   */
  const value =
    Math.floor(
      1000000000 +
        Math.random() *
          9000000000,
    );

  return String(value);
}

function createInternalId(): string {
  return `PAYEE-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)
    .toUpperCase()}`;
}

export class PayeeIdentityService {
  register(
    input: Omit<
      PayeeIdentity,
      | "internalId"
      | "publicPaymentCode"
      | "createdAt"
    >,
  ): PayeeIdentity {
    let code =
      generateTenDigitCode();

    /*
     * Collision protection.
     */
    while (
      publicCodeIndex.has(code)
    ) {
      code =
        generateTenDigitCode();
    }

    const identity: PayeeIdentity = {
      ...input,

      internalId:
        createInternalId(),

      publicPaymentCode:
        code,

      createdAt:
        new Date().toISOString(),
    };

    confidentialRegistry.set(
      identity.internalId,
      identity,
    );

    publicCodeIndex.set(
      identity.publicPaymentCode,
      identity.internalId,
    );

    return {
      ...identity,
    };
  }

  resolvePublicCode(
    paymentCode: string,
  ): Pick<
    PayeeIdentity,
    "publicPaymentCode" | "payeeType" | "active"
  > {
    if (
      !/^\d{10}$/.test(
        paymentCode,
      )
    ) {
      throw new Error(
        "Payment code must contain exactly 10 digits.",
      );
    }

    const internalId =
      publicCodeIndex.get(
        paymentCode,
      );

    if (!internalId) {
      throw new Error(
        "Payment code not found.",
      );
    }

    const identity =
      confidentialRegistry.get(
        internalId,
      );

    if (!identity) {
      throw new Error(
        "Payee identity unavailable.",
      );
    }

    /*
     * IMPORTANT:
     * Never return platformId,
     * tenantId, templateId or
     * institutionId to the public
     * payment-resolution layer.
     */
    return {
      publicPaymentCode:
        identity.publicPaymentCode,

      payeeType:
        identity.payeeType,

      active:
        identity.active,
    };
  }

  resolveInternal(
    paymentCode: string,
  ): PayeeIdentity {
    if (
      !/^\d{10}$/.test(
        paymentCode,
      )
    ) {
      throw new Error(
        "Invalid payment code.",
      );
    }

    const internalId =
      publicCodeIndex.get(
        paymentCode,
      );

    if (!internalId) {
      throw new Error(
        "Payment code not found.",
      );
    }

    const identity =
      confidentialRegistry.get(
        internalId,
      );

    if (!identity) {
      throw new Error(
        "Internal payee identity unavailable.",
      );
    }

    return {
      ...identity,
    };
  }

  deactivate(
    paymentCode: string,
  ): void {
    const identity =
      this.resolveInternal(
        paymentCode,
      );

    identity.active =
      false;

    confidentialRegistry.set(
      identity.internalId,
      identity,
    );
  }

  reactivate(
    paymentCode: string,
  ): void {
    const identity =
      this.resolveInternal(
        paymentCode,
      );

    identity.active =
      true;

    confidentialRegistry.set(
      identity.internalId,
      identity,
    );
  }

  listInternal(): PayeeIdentity[] {
    return Array.from(
      confidentialRegistry.values(),
    ).map(
      (identity) => ({
        ...identity,
      }),
    );
  }
}

export const payeeIdentityService =
  new PayeeIdentityService();

export default payeeIdentityService;
