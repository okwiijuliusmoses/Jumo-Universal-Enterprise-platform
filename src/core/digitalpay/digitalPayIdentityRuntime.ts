/**
 * JUMO DIGITAL PAY
 * Phase 3 — Identity Runtime
 *
 * Protected UEOS runtime for payment identities.
 *
 * Public layer:
 *   10-digit payee code only.
 *
 * Internal layer:
 *   platform/product/ERP/tenant/template/institution/payee.
 */

import {
  PaymentIdentityRegistry,
} from "./paymentIdentityRegistry";

import {
  PaymentIdentityResolver,
  type PaymentNamespace,
} from "./paymentIdentityResolver";

import type {
  PaymentIdentityRecord,
} from "./paymentIdentityRegistry";

import { JumoSecretVault } from "../security/JumoSecretVault";

const identitySecret =
  JumoSecretVault.getInstance().getDigitalPayIdentitySecret();

export class DigitalPayIdentityRuntime {
  readonly registry: PaymentIdentityRegistry;
  readonly resolver: PaymentIdentityResolver;

  constructor() {
    this.registry =
      new PaymentIdentityRegistry(
        identitySecret,
      );

    this.resolver =
      new PaymentIdentityResolver(
        this.registry,
      );
  }

  registerPayee(
    namespace: PaymentNamespace,
    payeeId: string,
  ): {
    payeeCode: string;
    status: PaymentIdentityRecord["status"];
  } {
    const identity =
      this.resolver.registerPayee(
        namespace,
        payeeId,
      );

    return {
      payeeCode:
        identity.publicPayeeCode,
      status:
        identity.status,
    };
  }

  resolvePayee(
    payeeCode: string,
    namespace: PaymentNamespace,
  ) {
    return this.resolver.toPublicResolution(
      this.resolver.resolveForNamespace(
        payeeCode,
        namespace,
      ),
    );
  }

  suspendPayee(
    payeeCode: string,
    namespace: PaymentNamespace,
  ): boolean {
    const resolution =
      this.resolver.resolveForNamespace(
        payeeCode,
        namespace,
      );

    if (
      !resolution.resolved ||
      !resolution.paymentIdentityId
    ) {
      return false;
    }

    this.registry.suspend(
      resolution.paymentIdentityId,
    );

    return true;
  }

  activatePayee(
    payeeCode: string,
    namespace: PaymentNamespace,
  ): boolean {
    const resolution =
      this.resolver.resolveForNamespace(
        payeeCode,
        namespace,
      );

    if (
      !resolution.resolved ||
      !resolution.paymentIdentityId
    ) {
      return false;
    }

    this.registry.activate(
      resolution.paymentIdentityId,
    );

    return true;
  }

  revokePayee(
    payeeCode: string,
    namespace: PaymentNamespace,
  ): boolean {
    const resolution =
      this.resolver.resolveForNamespace(
        payeeCode,
        namespace,
      );

    if (
      !resolution.resolved ||
      !resolution.paymentIdentityId
    ) {
      return false;
    }

    this.registry.revoke(
      resolution.paymentIdentityId,
    );

    return true;
  }

  getIdentityCount(): number {
    return this.registry.size();
  }
}

export const digitalPayIdentityRuntime =
  new DigitalPayIdentityRuntime();

export default digitalPayIdentityRuntime;
