/**
 * JUMO DIGITAL PAY
 * Product / ERP Payment Profile Service
 *
 * Every JUMO ERP or commercial product gets its
 * own Digital Pay integration profile.
 *
 * Internal identities are confidential.
 * They are never converted into public payment codes.
 */

export type DigitalPayProductType =
  | "ERP"
  | "COMMERCIAL_PRODUCTS_ECOSYSTEM"
  | "PLATFORM_SERVICE"
  | "INSTITUTIONAL_PRODUCT"
  | "FINANCIAL_PRODUCT";

export interface DigitalPayProductProfile {
  productId: string;

  productType:
    DigitalPayProductType;

  productName: string;

  tenantId: string;

  templateId: string;

  institutionId?: string;

  currency: string;

  enabledCapabilities: string[];

  status:
    | "ACTIVE"
    | "SUSPENDED";

  createdAt: string;
}

class ProductPaymentProfileService {
  private readonly profiles =
    new Map<
      string,
      DigitalPayProductProfile
    >();

  /**
   * Register a Digital Pay profile.
   */
  register(
    profile: DigitalPayProductProfile
  ): DigitalPayProductProfile {
    if (
      this.profiles.has(
        profile.productId
      )
    ) {
      throw new Error(
        "Digital Pay: product profile already exists"
      );
    }

    if (
      !profile.productName.trim()
    ) {
      throw new Error(
        "Digital Pay: product name is required"
      );
    }

    if (
      !profile.tenantId.trim()
    ) {
      throw new Error(
        "Digital Pay: tenant identity is required"
      );
    }

    if (
      !profile.templateId.trim()
    ) {
      throw new Error(
        "Digital Pay: template identity is required"
      );
    }

    if (
      !profile.currency.trim()
    ) {
      throw new Error(
        "Digital Pay: currency is required"
      );
    }

    const normalized: DigitalPayProductProfile = {
      ...profile,

      enabledCapabilities:
        Array.from(
          new Set(
            profile.enabledCapabilities
          )
        ),

      createdAt:
        profile.createdAt ||
        new Date().toISOString(),
    };

    this.profiles.set(
      normalized.productId,
      normalized
    );

    return normalized;
  }

  /**
   * Update enabled payment capabilities.
   */
  setCapabilities(
    productId: string,
    capabilities: string[]
  ) {
    const profile =
      this.profiles.get(
        productId
      );

    if (!profile) {
      throw new Error(
        "Digital Pay: product profile not found"
      );
    }

    profile.enabledCapabilities =
      Array.from(
        new Set(
          capabilities.filter(
            Boolean
          )
        )
      );

    return profile;
  }

  /**
   * Enable or suspend Digital Pay
   * for a product.
   */
  setStatus(
    productId: string,
    status:
      | "ACTIVE"
      | "SUSPENDED"
  ) {
    const profile =
      this.profiles.get(
        productId
      );

    if (!profile) {
      return null;
    }

    profile.status =
      status;

    return profile;
  }

  /**
   * Internal lookup.
   *
   * UEOS runtime only.
   */
  getInternalProfile(
    productId: string
  ) {
    return (
      this.profiles.get(
        productId
      ) ?? null
    );
  }

  /**
   * Check whether a product can use
   * a particular Digital Pay capability.
   */
  hasCapability(
    productId: string,
    capability: string
  ): boolean {
    const profile =
      this.profiles.get(
        productId
      );

    if (
      !profile ||
      profile.status !==
        "ACTIVE"
    ) {
      return false;
    }

    return profile.enabledCapabilities
      .includes(
        capability
      );
  }

  /**
   * Safe public product status.
   *
   * No internal identifiers returned.
   */
  getPublicProfile(
    productId: string
  ) {
    const profile =
      this.profiles.get(
        productId
      );

    if (!profile) {
      return null;
    }

    return {
      productName:
        profile.productName,

      productType:
        profile.productType,

      currency:
        profile.currency,

      capabilities:
        profile.enabledCapabilities,

      status:
        profile.status,
    };
  }

  /**
   * Runtime summary.
   */
  getSummary() {
    const profiles =
      Array.from(
        this.profiles.values()
      );

    return {
      total:
        profiles.length,

      active:
        profiles.filter(
          profile =>
            profile.status ===
            "ACTIVE"
        ).length,

      suspended:
        profiles.filter(
          profile =>
            profile.status ===
            "SUSPENDED"
        ).length,

      erps:
        profiles.filter(
          profile =>
            profile.productType ===
            "ERP"
        ).length,

      commercialProducts:
        profiles.filter(
          profile =>
            profile.productType ===
            "COMMERCIAL_PRODUCTS_ECOSYSTEM"
        ).length,

      institutionalProducts:
        profiles.filter(
          profile =>
            profile.productType ===
            "INSTITUTIONAL_PRODUCT"
        ).length,

      financialProducts:
        profiles.filter(
          profile =>
            profile.productType ===
            "FINANCIAL_PRODUCT"
        ).length,
    };
  }
}

export const productPaymentProfileService =
  new ProductPaymentProfileService();

export default productPaymentProfileService;
