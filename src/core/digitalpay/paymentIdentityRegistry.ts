/**
 * JUMO DIGITAL PAY
 * Protected Payment Identity Registry
 *
 * Compatibility registry over the canonical
 * paymentIdentityService.
 *
 * Internal identities remain confidential.
 * Only PAYEE identities receive public 10-digit codes.
 */

import {
  paymentIdentityService,
  type PaymentIdentity,
} from "./paymentIdentityService";

export type PaymentIdentityScope = {
  platformId: string;
  productId: string;
  erpId: string;
  tenantId: string;
  templateId: string;
  institutionId: string;
  payeeId: string;
};

export type PaymentIdentityStatus =
  | "ACTIVE"
  | "SUSPENDED"
  | "REVOKED";

export interface PaymentIdentityRecord {
  paymentIdentityId: string;
  platformId: string;
  productId: string;
  erpId: string;
  tenantId: string;
  templateId: string;
  institutionId: string;
  payeeId: string;
  publicPayeeCode: string;
  status: PaymentIdentityStatus;
  displayName: string;
  currency?: string;
  updatedAt: string;
}

export type PaymentIdentityLookup =
  | {
      found: true;
      identity: PaymentIdentityRecord;
    }
  | {
      found: false;
      identity: null;
    };

export type PublicPayeeRecord = {
  payeeCode: string;
  status: PaymentIdentityStatus;
};

export function isValidPublicPayeeCode(
  code: string,
): boolean {
  return /^\d{10}$/.test(code);
}

function mapStatus(
  active: boolean,
): PaymentIdentityStatus {
  return active ? "ACTIVE" : "SUSPENDED";
}

function toRecord(
  identity: PaymentIdentity,
  scope: PaymentIdentityScope,
): PaymentIdentityRecord {
  if (!identity.publicPayeeCode) {
    throw new Error(
      "Digital Pay: public payee code is missing.",
    );
  }

  return {
    paymentIdentityId:
      identity.internalId,

    platformId:
      scope.platformId,

    productId:
      scope.productId,

    erpId:
      scope.erpId,

    tenantId:
      scope.tenantId,

    templateId:
      scope.templateId,

    institutionId:
      scope.institutionId,

    payeeId:
      scope.payeeId,

    publicPayeeCode:
      identity.publicPayeeCode,

    status:
      mapStatus(identity.active),

    displayName:
      identity.displayName,

    currency:
      identity.currency,

    updatedAt:
      identity.createdAt,
  };
}

export class PaymentIdentityRegistry {
  private readonly records =
    new Map<
      string,
      PaymentIdentityRecord
    >();

  private readonly byPublicCode =
    new Map<string, string>();

  private readonly byScope =
    new Map<string, string>();

  constructor(
    private readonly identitySecret: string,
  ) {
    if (
      identitySecret.length < 32
    ) {
      throw new Error(
        "Payment identity secret must contain at least 32 characters.",
      );
    }
  }

  private scopeKey(
    scope: PaymentIdentityScope,
  ): string {
    return [
      scope.platformId,
      scope.productId,
      scope.erpId,
      scope.tenantId,
      scope.templateId,
      scope.institutionId,
      scope.payeeId,
    ]
      .map(value =>
        value.trim().toLowerCase(),
      )
      .join("|");
  }

  register(
    scope: PaymentIdentityScope,
  ): PaymentIdentityRecord {
    const key =
      this.scopeKey(scope);

    const existing =
      this.findByScope(scope);

    if (existing.found) {
      return existing.identity;
    }

    /*
     * The canonical service owns generation
     * of the public 10-digit payee code.
     */
    const identity =
      paymentIdentityService.registerPayee({
        internalId:
          `${scope.platformId}:${scope.productId}:${scope.erpId}:${scope.tenantId}:${scope.templateId}:${scope.institutionId}:${scope.payeeId}`,

        parentInternalId:
          scope.institutionId,

        displayName:
          scope.payeeId,
      });

    const record =
      toRecord(
        identity,
        scope,
      );

    if (
      this.byPublicCode.has(
        record.publicPayeeCode,
      )
    ) {
      throw new Error(
        "Public payee code collision detected.",
      );
    }

    this.records.set(
      record.paymentIdentityId,
      record,
    );

    this.byPublicCode.set(
      record.publicPayeeCode,
      record.paymentIdentityId,
    );

    this.byScope.set(
      key,
      record.paymentIdentityId,
    );

    return record;
  }

  findByScope(
    scope: PaymentIdentityScope,
  ): PaymentIdentityLookup {
    const internalId =
      this.byScope.get(
        this.scopeKey(scope),
      );

    if (!internalId) {
      return {
        found: false,
        identity: null,
      };
    }

    return this.findByInternalId(
      internalId,
    );
  }

  findByInternalId(
    paymentIdentityId: string,
  ): PaymentIdentityLookup {
    const identity =
      this.records.get(
        paymentIdentityId,
      );

    if (!identity) {
      return {
        found: false,
        identity: null,
      };
    }

    return {
      found: true,
      identity,
    };
  }

  findByPublicCode(
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

    const internalId =
      this.byPublicCode.get(
        publicPayeeCode,
      );

    if (!internalId) {
      return {
        found: false,
        identity: null,
      };
    }

    return this.findByInternalId(
      internalId,
    );
  }

  suspend(
    paymentIdentityId: string,
  ): PaymentIdentityRecord {
    return this.changeStatus(
      paymentIdentityId,
      "SUSPENDED",
    );
  }

  revoke(
    paymentIdentityId: string,
  ): PaymentIdentityRecord {
    return this.changeStatus(
      paymentIdentityId,
      "REVOKED",
    );
  }

  activate(
    paymentIdentityId: string,
  ): PaymentIdentityRecord {
    return this.changeStatus(
      paymentIdentityId,
      "ACTIVE",
    );
  }

  private changeStatus(
    paymentIdentityId: string,
    status: PaymentIdentityStatus,
  ): PaymentIdentityRecord {
    const result =
      this.findByInternalId(
        paymentIdentityId,
      );

    if (!result.found) {
      throw new Error(
        "Payment identity not found.",
      );
    }

    const active =
      status === "ACTIVE";

    paymentIdentityService[
      active
        ? "activate"
        : "deactivate"
    ](
      paymentIdentityId,
    );

    const updated = {
      ...result.identity,
      status,
      updatedAt:
        new Date().toISOString(),
    };

    this.records.set(
      paymentIdentityId,
      updated,
    );

    return updated;
  }

  getPublicPayeeRecord(
    publicPayeeCode: string,
  ): PublicPayeeRecord | null {
    const result =
      this.findByPublicCode(
        publicPayeeCode,
      );

    if (!result.found) {
      return null;
    }

    return {
      payeeCode:
        result.identity.publicPayeeCode,

      status:
        result.identity.status,
    };
  }

  size(): number {
    return this.records.size;
  }

  clear(): void {
    this.records.clear();
    this.byPublicCode.clear();
    this.byScope.clear();
  }
}

export default PaymentIdentityRegistry;
