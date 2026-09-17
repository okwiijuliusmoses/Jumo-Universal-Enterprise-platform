/**
 * JUMO DIGITAL PAY
 * Universal Payment Identity Engine
 *
 * Identity hierarchy:
 *
 * Platform
 *   └── Product / ERP
 *        └── Tenant
 *             └── Template
 *                  └── Institution / Merchant / Agent
 *                       └── Payee
 *
 * Internal identifiers remain confidential.
 *
 * Public payment identity:
 *   - Payee payment code: exactly 10 digits
 *
 * The public code does NOT encode or expose:
 *   - platform ID
 *   - product ID
 *   - ERP ID
 *   - tenant ID
 *   - template ID
 *   - institution ID
 *   - internal database IDs
 */

export type PaymentIdentityScope =
  | "PLATFORM"
  | "PRODUCT"
  | "ERP"
  | "TENANT"
  | "TEMPLATE"
  | "INSTITUTION"
  | "MERCHANT"
  | "AGENT"
  | "PAYEE";

export interface PaymentIdentity {
  internalId: string;

  scope: PaymentIdentityScope;

  parentInternalId?: string;

  /**
   * Public identifier exists only for payees.
   */
  publicPayeeCode?: string;

  displayName: string;

  currency?: string;

  active: boolean;

  createdAt: string;
}

export interface PublicPayeeIdentity {
  paymentCode: string;

  displayName: string;

  currency?: string;

  active: boolean;
}

class PaymentIdentityService {
  private readonly identities =
    new Map<string, PaymentIdentity>();

  private readonly publicCodes =
    new Map<string, string>();

  /**
   * Generate a cryptographically strong-looking
   * 10-digit public payment code.
   *
   * The code contains no encoded internal identity.
   */
  private generatePayeeCode(): string {
    for (;;) {
      let code = "";

      for (let i = 0; i < 10; i++) {
        code += Math.floor(
          Math.random() * 10
        ).toString();
      }

      if (
        !this.publicCodes.has(code)
      ) {
        return code;
      }
    }
  }

  /**
   * Create an internal platform/product/ERP/etc.
   * identity.
   *
   * These identities never become public payment codes.
   */
  registerInternalIdentity(
    input: {
      internalId: string;
      scope: Exclude<
        PaymentIdentityScope,
        "PAYEE"
      >;
      parentInternalId?: string;
      displayName: string;
      currency?: string;
    }
  ): PaymentIdentity {
    if (
      this.identities.has(
        input.internalId
      )
    ) {
      throw new Error(
        "Digital Pay: internal identity already exists"
      );
    }

    const identity: PaymentIdentity = {
      internalId:
        input.internalId,

      scope:
        input.scope,

      parentInternalId:
        input.parentInternalId,

      displayName:
        input.displayName,

      currency:
        input.currency,

      active:
        true,

      createdAt:
        new Date().toISOString(),
    };

    this.identities.set(
      identity.internalId,
      identity
    );

    return identity;
  }

  /**
   * Register a payee.
   *
   * Only this identity receives a public
   * 10-digit payment code.
   */
  registerPayee(
    input: {
      internalId: string;
      parentInternalId?: string;
      displayName: string;
      currency?: string;
    }
  ): PaymentIdentity {
    if (
      this.identities.has(
        input.internalId
      )
    ) {
      throw new Error(
        "Digital Pay: payee identity already exists"
      );
    }

    const publicPayeeCode =
      this.generatePayeeCode();

    const identity: PaymentIdentity = {
      internalId:
        input.internalId,

      scope:
        "PAYEE",

      parentInternalId:
        input.parentInternalId,

      publicPayeeCode,

      displayName:
        input.displayName,

      currency:
        input.currency,

      active:
        true,

      createdAt:
        new Date().toISOString(),
    };

    this.identities.set(
      identity.internalId,
      identity
    );

    this.publicCodes.set(
      publicPayeeCode,
      identity.internalId
    );

    return identity;
  }

  /**
   * Resolve a public 10-digit payment code.
   *
   * Public callers receive only safe information.
   */
  resolvePublicPayee(
    paymentCode: string
  ): PublicPayeeIdentity | null {
    if (
      !/^\d{10}$/.test(
        paymentCode
      )
    ) {
      return null;
    }

    const internalId =
      this.publicCodes.get(
        paymentCode
      );

    if (!internalId) {
      return null;
    }

    const identity =
      this.identities.get(
        internalId
      );

    if (
      !identity ||
      identity.scope !==
        "PAYEE"
    ) {
      return null;
    }

    return {
      paymentCode,

      displayName:
        identity.displayName,

      currency:
        identity.currency,

      active:
        identity.active,
    };
  }

  /**
   * Internal-only lookup.
   *
   * Never expose this result directly through
   * public Digital Pay endpoints.
   */
  resolveInternalIdentity(
    internalId: string
  ): PaymentIdentity | null {
    return (
      this.identities.get(
        internalId
      ) ?? null
    );
  }

  /**
   * Disable an identity.
   */
  deactivate(
    internalId: string
  ): boolean {
    const identity =
      this.identities.get(
        internalId
      );

    if (!identity) {
      return false;
    }

    identity.active = false;

    return true;
  }

  /**
   * Reactivate an identity.
   */
  activate(
    internalId: string
  ): boolean {
    const identity =
      this.identities.get(
        internalId
      );

    if (!identity) {
      return false;
    }

    identity.active = true;

    return true;
  }

  /**
   * Verify that a public payment code
   * belongs to an active payee.
   */
  validatePaymentCode(
    paymentCode: string
  ): boolean {
    const publicPayee =
      this.resolvePublicPayee(
        paymentCode
      );

    return (
      publicPayee !== null &&
      publicPayee.active
    );
  }

  /**
   * Return only public payment identities.
   */
  getPublicPayees(): PublicPayeeIdentity[] {
    return Array.from(
      this.identities.values()
    )
      .filter(
        identity =>
          identity.scope ===
          "PAYEE" &&
          identity.publicPayeeCode
      )
      .map(
        identity => ({
          paymentCode:
            identity.publicPayeeCode!,

          displayName:
            identity.displayName,

          currency:
            identity.currency,

          active:
            identity.active,
        })
      );
  }

  /**
   * Internal administration summary.
   *
   * No identifiers are returned.
   */
  getSummary() {
    const counts =
      new Map<
        PaymentIdentityScope,
        number
      >();

    for (const identity of
      this.identities.values()) {
      counts.set(
        identity.scope,
        (counts.get(
          identity.scope
        ) ?? 0) + 1
      );
    }

    return {
      total:
        this.identities.size,

      platforms:
        counts.get("PLATFORM") ??
        0,

      products:
        counts.get("PRODUCT") ??
        0,

      erps:
        counts.get("ERP") ??
        0,

      tenants:
        counts.get("TENANT") ??
        0,

      templates:
        counts.get("TEMPLATE") ??
        0,

      institutions:
        counts.get(
          "INSTITUTION"
        ) ?? 0,

      merchants:
        counts.get("MERCHANT") ??
        0,

      agents:
        counts.get("AGENT") ??
        0,

      payees:
        counts.get("PAYEE") ??
        0,
    };
  }
}

export const paymentIdentityService =
  new PaymentIdentityService();

export default paymentIdentityService;
