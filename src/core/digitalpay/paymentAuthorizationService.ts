/**
 * JUMO DIGITAL PAY
 * Payment Authorization & Security Boundary
 *
 * Central authorization layer for Digital Pay.
 *
 * No renderer, ERP page, tenant UI, merchant UI,
 * agent UI, or institution UI should directly
 * execute financial operations.
 *
 * Request flow:
 *
 * Identity
 *   ↓
 * Role
 *   ↓
 * Product Boundary
 *   ↓
 * Payment Capability
 *   ↓
 * Authorization Policy
 *   ↓
 * Payment Runtime
 */

import {
  paymentCapabilityRegistry,
  type DigitalPayCapability,
} from "./paymentCapabilityRegistry";

export type PaymentActorRole =
  | "CUSTOMER"
  | "MERCHANT"
  | "AGENT"
  | "INSTITUTION"
  | "ERP_OPERATOR"
  | "FINANCE_OPERATOR"
  | "TREASURY_OPERATOR"
  | "PLATFORM_ADMIN"
  | "SYSTEM";

export type PaymentOperation =
  | "CREATE_PAYMENT"
  | "AUTHORIZE_PAYMENT"
  | "PROCESS_PAYMENT"
  | "SETTLE_PAYMENT"
  | "REFUND_PAYMENT"
  | "REVERSE_PAYMENT"
  | "VIEW_TRANSACTION"
  | "VIEW_BALANCE"
  | "MANAGE_FEES"
  | "MANAGE_CHANNELS"
  | "MANAGE_AGENTS"
  | "MANAGE_MERCHANTS"
  | "MANAGE_INSTITUTION_PAYMENTS";

export interface PaymentAuthorizationRequest {
  actorId: string;

  role:
    PaymentActorRole;

  productId: string;

  capability:
    DigitalPayCapability;

  operation:
    PaymentOperation;

  tenantId?: string;
}

export interface PaymentAuthorizationResult {
  authorized: boolean;

  reason: string;

  policyVersion: string;
}

class PaymentAuthorizationService {
  readonly policyVersion =
    "JDP-AUTH-POLICY-1.0";

  /**
   * Operations available to each role.
   *
   * Capability checks are performed separately.
   */
  private readonly roleOperations:
    Record<
      PaymentActorRole,
      PaymentOperation[]
    > = {
    CUSTOMER: [
      "CREATE_PAYMENT",
      "VIEW_TRANSACTION",
      "VIEW_BALANCE",
    ],

    MERCHANT: [
      "CREATE_PAYMENT",
      "VIEW_TRANSACTION",
      "VIEW_BALANCE",
    ],

    AGENT: [
      "CREATE_PAYMENT",
      "VIEW_TRANSACTION",
      "VIEW_BALANCE",
      "MANAGE_AGENTS",
    ],

    INSTITUTION: [
      "CREATE_PAYMENT",
      "VIEW_TRANSACTION",
      "VIEW_BALANCE",
      "MANAGE_INSTITUTION_PAYMENTS",
    ],

    ERP_OPERATOR: [
      "CREATE_PAYMENT",
      "VIEW_TRANSACTION",
      "VIEW_BALANCE",
    ],

    FINANCE_OPERATOR: [
      "CREATE_PAYMENT",
      "VIEW_TRANSACTION",
      "VIEW_BALANCE",
      "REFUND_PAYMENT",
      "REVERSE_PAYMENT",
      "MANAGE_FEES",
    ],

    TREASURY_OPERATOR: [
      "VIEW_TRANSACTION",
      "VIEW_BALANCE",
      "SETTLE_PAYMENT",
      "REVERSE_PAYMENT",
      "MANAGE_CHANNELS",
    ],

    PLATFORM_ADMIN: [
      "VIEW_TRANSACTION",
      "VIEW_BALANCE",
      "MANAGE_FEES",
      "MANAGE_CHANNELS",
      "MANAGE_AGENTS",
      "MANAGE_MERCHANTS",
      "MANAGE_INSTITUTION_PAYMENTS",
    ],

    SYSTEM: [
      "CREATE_PAYMENT",
      "AUTHORIZE_PAYMENT",
      "PROCESS_PAYMENT",
      "SETTLE_PAYMENT",
      "REFUND_PAYMENT",
      "REVERSE_PAYMENT",
      "VIEW_TRANSACTION",
      "VIEW_BALANCE",
      "MANAGE_FEES",
      "MANAGE_CHANNELS",
      "MANAGE_AGENTS",
      "MANAGE_MERCHANTS",
      "MANAGE_INSTITUTION_PAYMENTS",
    ],
  };

  /**
   * Authorize a payment operation.
   */
  authorize(
    request:
      PaymentAuthorizationRequest
  ): PaymentAuthorizationResult {
    if (
      !request.actorId.trim()
    ) {
      return this.denied(
        "Actor identity is required"
      );
    }

    if (
      !request.productId.trim()
    ) {
      return this.denied(
        "Product boundary is required"
      );
    }

    if (
      !request.capability
    ) {
      return this.denied(
        "Payment capability is required"
      );
    }

    const roleOperations =
      this.roleOperations[
        request.role
      ] ?? [];

    if (
      !roleOperations.includes(
        request.operation
      )
    ) {
      return this.denied(
        "Actor role is not authorized for this payment operation"
      );
    }

    /**
     * Payment capability must also be
     * enabled for the specific product.
     */
    const capabilityEnabled =
      paymentCapabilityRegistry
        .isEnabled(
          request.productId,
          request.capability
        );

    if (
      !capabilityEnabled
    ) {
      return this.denied(
        "Payment capability is not enabled for this product"
      );
    }

    return {
      authorized: true,

      reason:
        "Payment operation authorized",

      policyVersion:
        this.policyVersion,
    };
  }

  /**
   * Convenience check.
   */
  canOperate(
    request:
      PaymentAuthorizationRequest
  ): boolean {
    return this.authorize(
      request
    ).authorized;
  }

  /**
   * Return available operations for a role.
   */
  getRoleOperations(
    role: PaymentActorRole
  ): PaymentOperation[] {
    return [
      ...(
        this.roleOperations[
          role
        ] ?? []
      ),
    ];
  }

  /**
   * Internal policy information.
   */
  getPolicyVersion() {
    return this.policyVersion;
  }

  private denied(
    reason: string
  ): PaymentAuthorizationResult {
    return {
      authorized: false,

      reason,

      policyVersion:
        this.policyVersion,
    };
  }
}

export const paymentAuthorizationService =
  new PaymentAuthorizationService();

export default paymentAuthorizationService;
