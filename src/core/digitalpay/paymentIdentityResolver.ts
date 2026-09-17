/**
 * JUMO DIGITAL PAY
 * Protected Payment Identity Resolver
 *
 * External callers use only the public 10-digit payee code.
 * Internal platform/product/ERP/tenant/template/institution
 * identifiers remain protected inside the Digital Pay runtime.
 */

import {
  isValidPublicPayeeCode,
} from "./paymentIdentityRegistry";

import {
  PaymentIdentityRegistry,
  type PaymentIdentityLookup,
  type PaymentIdentityRecord,
  type PaymentIdentityScope,
} from "./paymentIdentityRegistry";

export type PaymentNamespace = {
  platformId: string;
  productId: string;
  erpId: string;
  tenantId: string;
  templateId: string;
  institutionId: string;
};

export type PaymentResolution = {
  resolved: boolean;
  payeeCode: string;
  paymentIdentityId?: string;
  namespaceVerified: boolean;
  status?: PaymentIdentityRecord["status"];
};

function normalize(
  value: string,
): string {
  return value.trim().toLowerCase();
}

function namespaceMatches(
  identity: PaymentIdentityRecord,
  namespace: PaymentNamespace,
): boolean {
  return (
    normalize(identity.platformId) ===
      normalize(namespace.platformId) &&
    normalize(identity.productId) ===
      normalize(namespace.productId) &&
    normalize(identity.erpId) ===
      normalize(namespace.erpId) &&
    normalize(identity.tenantId) ===
      normalize(namespace.tenantId) &&
    normalize(identity.templateId) ===
      normalize(namespace.templateId) &&
    normalize(identity.institutionId) ===
      normalize(namespace.institutionId)
  );
}

export class PaymentIdentityResolver {
  constructor(
    private readonly registry:
      PaymentIdentityRegistry,
  ) {}

  /**
   * Register a payee within a protected
   * platform/product/ERP/tenant/template/
   * institution namespace.
   */
  registerPayee(
    namespace: PaymentNamespace,
    payeeId: string,
  ): PaymentIdentityRecord {
    const scope:
      PaymentIdentityScope = {
      platformId:
        namespace.platformId,

      productId:
        namespace.productId,

      erpId:
        namespace.erpId,

      tenantId:
        namespace.tenantId,

      templateId:
        namespace.templateId,

      institutionId:
        namespace.institutionId,

      payeeId,
    };

    return this.registry.register(
      scope,
    );
  }

  /**
   * Resolve a public 10-digit payee code.
   */
  resolvePublicPayee(
    publicPayeeCode: string,
  ): PaymentIdentityLookup {
    if (
      !isValidPublicPayeeCode(
        publicPayeeCode,
      )
    ) {
      return {
        found: false,
        identity: null,
      };
    }

    return this.registry.findByPublicCode(
      publicPayeeCode,
    );
  }

  /**
   * Resolve and verify a payee against
   * the protected namespace.
   */
  resolveForNamespace(
    publicPayeeCode: string,
    namespace: PaymentNamespace,
  ): PaymentResolution {
    const result =
      this.resolvePublicPayee(
        publicPayeeCode,
      );

    if (!result.found) {
      return {
        resolved: false,
        payeeCode:
          publicPayeeCode,
        namespaceVerified:
          false,
      };
    }

    const verified =
      namespaceMatches(
        result.identity,
        namespace,
      );

    if (!verified) {
      return {
        resolved: false,
        payeeCode:
          publicPayeeCode,
        namespaceVerified:
          false,
      };
    }

    return {
      resolved: true,

      payeeCode:
        publicPayeeCode,

      paymentIdentityId:
        result.identity
          .paymentIdentityId,

      namespaceVerified:
        true,

      status:
        result.identity.status,
    };
  }

  /**
   * Creates an internal transaction-safe scope.
   *
   * This must never be returned directly
   * through a public payment endpoint.
   */
  getInternalScope(
    publicPayeeCode: string,
    namespace: PaymentNamespace,
  ): PaymentIdentityScope | null {
    const resolution =
      this.resolveForNamespace(
        publicPayeeCode,
        namespace,
      );

    if (
      !resolution.resolved ||
      !resolution.paymentIdentityId
    ) {
      return null;
    }

    const result =
      this.registry.findByInternalId(
        resolution.paymentIdentityId,
      );

    if (!result.found) {
      return null;
    }

    return {
      platformId:
        result.identity.platformId,

      productId:
        result.identity.productId,

      erpId:
        result.identity.erpId,

      tenantId:
        result.identity.tenantId,

      templateId:
        result.identity.templateId,

      institutionId:
        result.identity.institutionId,

      payeeId:
        result.identity.payeeId,
    };
  }

  /**
   * Public-safe response.
   *
   * Never expose internal namespace identifiers.
   */
  toPublicResolution(
    resolution: PaymentResolution,
  ): {
    resolved: boolean;
    payeeCode: string;
    status?: PaymentIdentityRecord["status"];
  } {
    return {
      resolved:
        resolution.resolved,

      payeeCode:
        resolution.payeeCode,

      ...(resolution.status
        ? {
            status:
              resolution.status,
          }
        : {}),
    };
  }
}

export default PaymentIdentityResolver;
