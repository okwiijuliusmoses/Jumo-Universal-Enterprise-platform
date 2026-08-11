/**
 * JUMO DIGITAL PAY
 * Transaction Routing Policy Engine
 *
 * Determines the permitted payment rail for a
 * transaction based on:
 *
 * Product
 * Capability
 * Currency
 * Amount
 * Requested rail
 * Availability
 *
 * The router NEVER exposes confidential internal
 * platform/product/tenant/template/institution IDs
 * to the public payment layer.
 */

import {
  paymentCapabilityRegistry,
  type DigitalPayCapability,
  type DigitalPayRail,
} from "./paymentCapabilityRegistry";

export interface PaymentRoutingRequest {
  productId: string;

  capability:
    DigitalPayCapability;

  amount: number;

  currency: string;

  preferredRail?: DigitalPayRail;

  availableRails?:
    DigitalPayRail[];
}

export interface PaymentRoutingResult {
  approved: boolean;

  rail?: DigitalPayRail;

  reason: string;

  fallbackRails:
    DigitalPayRail[];

  policyVersion:
    string;
}

class PaymentRoutingService {
  readonly policyVersion =
    "JDP-ROUTING-POLICY-1.0";

  /**
   * Preferred rail order.
   *
   * This is a policy preference only.
   * The rail must still be explicitly authorized
   * for the product capability.
   */
  private readonly defaultPriority:
    DigitalPayRail[] = [
    "INTERNAL_WALLET",
    "MTN_MOBILE_MONEY",
    "BANK_TRANSFER",
    "CARD",
    "QR",
    "CASH_AGENT",
  ];

  /**
   * Resolve a transaction to an authorized rail.
   */
  route(
    request: PaymentRoutingRequest
  ): PaymentRoutingResult {
    if (
      !Number.isFinite(
        request.amount
      ) ||
      request.amount <= 0
    ) {
      return {
        approved: false,

        reason:
          "Payment amount must be greater than zero",

        fallbackRails: [],

        policyVersion:
          this.policyVersion,
      };
    }

    if (
      !request.currency.trim()
    ) {
      return {
        approved: false,

        reason:
          "Payment currency is required",

        fallbackRails: [],

        policyVersion:
          this.policyVersion,
      };
    }

    if (
      !paymentCapabilityRegistry
        .isEnabled(
          request.productId,
          request.capability
        )
    ) {
      return {
        approved: false,

        reason:
          "Payment capability is not enabled for this product",

        fallbackRails: [],

        policyVersion:
          this.policyVersion,
      };
    }

    const configured =
      paymentCapabilityRegistry
        .getProductCapabilities(
          request.productId
        )
        .find(
          entry =>
            entry.capability ===
            request.capability
        );

    if (!configured) {
      return {
        approved: false,

        reason:
          "No payment routing policy exists for this capability",

        fallbackRails: [],

        policyVersion:
          this.policyVersion,
      };
    }

    /**
     * Apply optional transaction limits.
     */
    if (
      configured.transactionLimit !==
        undefined &&
      request.amount >
        configured.transactionLimit
    ) {
      return {
        approved: false,

        reason:
          "Transaction exceeds product payment limit",

        fallbackRails: [],

        policyVersion:
          this.policyVersion,
      };
    }

    /**
     * Apply currency restriction.
     */
    if (
      configured.currency &&
      configured.currency !==
        request.currency
    ) {
      return {
        approved: false,

        reason:
          "Transaction currency is not permitted by product policy",

        fallbackRails: [],

        policyVersion:
          this.policyVersion,
      };
    }

    const authorizedRails =
      configured.allowedRails;

    const availableRails =
      request.availableRails?.length
        ? request.availableRails
        : authorizedRails;

    const candidates =
      authorizedRails.filter(
        rail =>
          availableRails.includes(
            rail
          )
      );

    /**
     * Explicit preferred rail wins only when
     * the rail is authorized and available.
     */
    if (
      request.preferredRail &&
      candidates.includes(
        request.preferredRail
      )
    ) {
      return {
        approved: true,

        rail:
          request.preferredRail,

        reason:
          "Preferred authorized payment rail selected",

        fallbackRails:
          candidates.filter(
            rail =>
              rail !==
              request.preferredRail
          ),

        policyVersion:
          this.policyVersion,
      };
    }

    /**
     * Select the first authorized available rail.
     */
    const selected =
      this.defaultPriority.find(
        rail =>
          candidates.includes(
            rail
          )
      ) ??
      candidates[0];

    if (!selected) {
      return {
        approved: false,

        reason:
          "No authorized payment rail is currently available",

        fallbackRails: [],

        policyVersion:
          this.policyVersion,
      };
    }

    return {
      approved: true,

      rail:
        selected,

      reason:
        "Authorized payment rail selected by routing policy",

      fallbackRails:
        candidates.filter(
          rail =>
            rail !==
            selected
        ),

      policyVersion:
        this.policyVersion,
    };
  }

  /**
   * Check a specific rail without routing.
   */
  canUseRail(
    productId: string,
    capability:
      DigitalPayCapability,
    rail: DigitalPayRail
  ): boolean {
    return paymentCapabilityRegistry
      .isRailAllowed(
        productId,
        capability,
        rail
      );
  }

  /**
   * Return the routing policy version.
   */
  getPolicyVersion() {
    return this.policyVersion;
  }
}

export const paymentRoutingService =
  new PaymentRoutingService();

export default paymentRoutingService;
