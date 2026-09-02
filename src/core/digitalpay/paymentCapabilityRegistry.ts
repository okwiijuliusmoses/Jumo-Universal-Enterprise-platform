/**
 * JUMO DIGITAL PAY
 * Capability & Payment-Rail Registry
 *
 * Controls which Digital Pay capabilities and
 * payment rails are available to each product.
 *
 * Product boundaries remain isolated.
 */

import {
  productPaymentProfileService,
} from "./productPaymentProfileService";

export type DigitalPayCapability =
  | "MERCHANT_PAYMENT"
  | "AGENT_BANKING"
  | "SCHOOL_PAYMENT"
  | "INSTITUTIONAL_PAYMENT"
  | "QR_PAYMENT"
  | "SERVICE_FEE"
  | "AUTOMATED_DEDUCTION"
  | "LOANS"
  | "BANKING"
  | "MOBILE_MONEY"
  | "MONEY_TRANSFER"
  | "SETTLEMENT";

export type DigitalPayRail =
  | "MTN_MOBILE_MONEY"
  | "AIRTEL_MOBILE_MONEY"
  | "BANK_TRANSFER"
  | "SWIFT"
  | "ACH"
  | "CARD"
  | "QR"
  | "CASH_AGENT"
  | "INTERNAL_WALLET";

export interface ProductPaymentCapability {
  productId: string;

  capability:
    DigitalPayCapability;

  enabled: boolean;

  allowedRails:
    DigitalPayRail[];

  dailyLimit?: number;

  transactionLimit?: number;

  currency?: string;
}

class PaymentCapabilityRegistry {
  private readonly capabilities =
    new Map<
      string,
      ProductPaymentCapability[]
    >();

  /**
   * Configure one capability for a product.
   */
  configure(
    capability:
      ProductPaymentCapability
  ) {
    const profile =
      productPaymentProfileService
        .getInternalProfile(
          capability.productId
        );

    if (!profile) {
      throw new Error(
        "Digital Pay: product profile not found"
      );
    }

    const existing =
      this.capabilities.get(
        capability.productId
      ) ?? [];

    const filtered =
      existing.filter(
        item =>
          item.capability !==
          capability.capability
      );

    filtered.push({
      ...capability,

      allowedRails:
        Array.from(
          new Set(
            capability.allowedRails
          )
        ),
    });

    this.capabilities.set(
      capability.productId,
      filtered
    );

    /**
     * Keep product profile capability
     * list synchronized.
     */
    const profileCapabilities =
      profile.enabledCapabilities
        .filter(
          item =>
            item !==
            capability.capability
        );

    if (
      capability.enabled
    ) {
      profileCapabilities.push(
        capability.capability
      );
    }

    productPaymentProfileService
      .setCapabilities(
        capability.productId,
        profileCapabilities
      );

    return capability;
  }

  /**
   * Check capability access.
   */
  isEnabled(
    productId: string,
    capability:
      DigitalPayCapability
  ): boolean {
    const item =
      this.find(
        productId,
        capability
      );

    return Boolean(
      item?.enabled
    );
  }

  /**
   * Check whether a payment rail is
   * authorized for the product capability.
   */
  isRailAllowed(
    productId: string,
    capability:
      DigitalPayCapability,
    rail: DigitalPayRail
  ): boolean {
    const item =
      this.find(
        productId,
        capability
      );

    if (
      !item ||
      !item.enabled
    ) {
      return false;
    }

    return item.allowedRails
      .includes(
        rail
      );
  }

  /**
   * Retrieve a configured capability.
   */
  find(
    productId: string,
    capability:
      DigitalPayCapability
  ) {
    return (
      this.capabilities
        .get(productId)
        ?.find(
          item =>
            item.capability ===
            capability
        ) ?? null
    );
  }

  /**
   * Return capabilities for an internal
   * product context.
   */
  getProductCapabilities(
    productId: string
  ) {
    return [
      ...(
        this.capabilities.get(
          productId
        ) ?? []
      ),
    ];
  }

  /**
   * Remove one capability.
   */
  disable(
    productId: string,
    capability:
      DigitalPayCapability
  ) {
    const item =
      this.find(
        productId,
        capability
      );

    if (!item) {
      return false;
    }

    item.enabled = false;

    productPaymentProfileService
      .setCapabilities(
        productId,
        this.getProductCapabilities(
          productId
        )
          .filter(
            entry =>
              entry.enabled
          )
          .map(
            entry =>
              entry.capability
          )
      );

    return true;
  }

  /**
   * Internal registry diagnostics.
   */
  getSummary() {
    let configured = 0;
    let enabled = 0;

    for (
      const entries of
        this.capabilities.values()
    ) {
      configured +=
        entries.length;

      enabled +=
        entries.filter(
          item =>
            item.enabled
        ).length;
    }

    return {
      configured,
      enabled,
      disabled:
        configured -
        enabled,
    };
  }
}

export const paymentCapabilityRegistry =
  new PaymentCapabilityRegistry();

export default paymentCapabilityRegistry;
