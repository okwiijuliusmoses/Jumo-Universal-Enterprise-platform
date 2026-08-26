/**
 * JUMO DIGITAL PAY
 * Universal Wallet & Account Service
 *
 * Internal account layer for:
 * - Customer wallets
 * - Merchant accounts
 * - Mobile agents
 * - Institutions
 * - ERP/product accounts
 * - Platform settlement accounts
 *
 * Account IDs are confidential.
 * Public payment identity remains the 10-digit
 * payee code managed by paymentIdentityService.
 */

export type WalletAccountType =
  | "CUSTOMER"
  | "MERCHANT"
  | "AGENT"
  | "INSTITUTION"
  | "ERP"
  | "PRODUCT"
  | "PLATFORM"
  | "SETTLEMENT";

export interface WalletAccount {
  accountId: string;

  type:
    WalletAccountType;

  ownerInternalId: string;

  tenantId?: string;

  currency: string;

  availableBalance: number;

  reservedBalance: number;

  status:
    | "ACTIVE"
    | "FROZEN"
    | "CLOSED";

  createdAt: string;
}

export interface WalletBalance {
  available: number;

  reserved: number;

  total: number;

  currency: string;
}

export interface WalletMovement {
  movementId: string;

  accountId: string;

  type:
    | "CREDIT"
    | "DEBIT"
    | "RESERVE"
    | "RELEASE";

  amount: number;

  currency: string;

  reference: string;

  createdAt: string;
}

class WalletAccountService {
  private readonly accounts =
    new Map<
      string,
      WalletAccount
    >();

  private readonly movements =
    new Map<
      string,
      WalletMovement
    >();

  /**
   * Create an internal wallet/account.
   */
  createAccount(
    input: {
      accountId: string;

      type:
        WalletAccountType;

      ownerInternalId: string;

      tenantId?: string;

      currency: string;
    }
  ): WalletAccount {
    if (
      this.accounts.has(
        input.accountId
      )
    ) {
      throw new Error(
        "Digital Pay: account already exists"
      );
    }

    if (
      !input.currency.trim()
    ) {
      throw new Error(
        "Digital Pay: account currency is required"
      );
    }

    const account:
      WalletAccount = {
      accountId:
        input.accountId,

      type:
        input.type,

      ownerInternalId:
        input.ownerInternalId,

      tenantId:
        input.tenantId,

      currency:
        input.currency,

      availableBalance:
        0,

      reservedBalance:
        0,

      status:
        "ACTIVE",

      createdAt:
        new Date().toISOString(),
    };

    this.accounts.set(
      account.accountId,
      account
    );

    return account;
  }

  /**
   * Internal account lookup.
   */
  getAccount(
    accountId: string
  ) {
    return (
      this.accounts.get(
        accountId
      ) ?? null
    );
  }

  /**
   * Return balance without exposing
   * ownership/internal identifiers.
   */
  getBalance(
    accountId: string
  ): WalletBalance {
    const account =
      this.getRequiredAccount(
        accountId
      );

    return {
      available:
        account.availableBalance,

      reserved:
        account.reservedBalance,

      total:
        Number(
          (
            account.availableBalance +
            account.reservedBalance
          ).toFixed(2)
        ),

      currency:
        account.currency,
    };
  }

  /**
   * Credit an account.
   *
   * Intended to be called by authorized
   * settlement/payment services.
   */
  credit(
    accountId: string,
    amount: number,
    reference: string
  ) {
    const account =
      this.getRequiredAccount(
        accountId
      );

    this.assertActive(
      account
    );

    this.assertAmount(
      amount
    );

    account.availableBalance =
      Number(
        (
          account.availableBalance +
          amount
        ).toFixed(2)
      );

    return this.recordMovement(
      accountId,
      "CREDIT",
      amount,
      account.currency,
      reference
    );
  }

  /**
   * Debit an account.
   */
  debit(
    accountId: string,
    amount: number,
    reference: string
  ) {
    const account =
      this.getRequiredAccount(
        accountId
      );

    this.assertActive(
      account
    );

    this.assertAmount(
      amount
    );

    if (
      account.availableBalance <
      amount
    ) {
      throw new Error(
        "Digital Pay: insufficient available balance"
      );
    }

    account.availableBalance =
      Number(
        (
          account.availableBalance -
          amount
        ).toFixed(2)
      );

    return this.recordMovement(
      accountId,
      "DEBIT",
      amount,
      account.currency,
      reference
    );
  }

  /**
   * Reserve funds before settlement.
   */
  reserve(
    accountId: string,
    amount: number,
    reference: string
  ) {
    const account =
      this.getRequiredAccount(
        accountId
      );

    this.assertActive(
      account
    );

    this.assertAmount(
      amount
    );

    if (
      account.availableBalance <
      amount
    ) {
      throw new Error(
        "Digital Pay: insufficient funds for reservation"
      );
    }

    account.availableBalance =
      Number(
        (
          account.availableBalance -
          amount
        ).toFixed(2)
      );

    account.reservedBalance =
      Number(
        (
          account.reservedBalance +
          amount
        ).toFixed(2)
      );

    return this.recordMovement(
      accountId,
      "RESERVE",
      amount,
      account.currency,
      reference
    );
  }

  /**
   * Release reserved funds back to
   * available balance.
   */
  release(
    accountId: string,
    amount: number,
    reference: string
  ) {
    const account =
      this.getRequiredAccount(
        accountId
      );

    this.assertActive(
      account
    );

    this.assertAmount(
      amount
    );

    if (
      account.reservedBalance <
      amount
    ) {
      throw new Error(
        "Digital Pay: reserved balance is insufficient"
      );
    }

    account.reservedBalance =
      Number(
        (
          account.reservedBalance -
          amount
        ).toFixed(2)
      );

    account.availableBalance =
      Number(
        (
          account.availableBalance +
          amount
        ).toFixed(2)
      );

    return this.recordMovement(
      accountId,
      "RELEASE",
      amount,
      account.currency,
      reference
    );
  }

  /**
   * Freeze an account.
   */
  freeze(
    accountId: string
  ) {
    const account =
      this.getRequiredAccount(
        accountId
      );

    account.status =
      "FROZEN";

    return account;
  }

  /**
   * Reactivate an account.
   */
  activate(
    accountId: string
  ) {
    const account =
      this.getRequiredAccount(
        accountId
      );

    account.status =
      "ACTIVE";

    return account;
  }

  /**
   * Record internal wallet movement.
   */
  private recordMovement(
    accountId: string,
    type:
      | "CREDIT"
      | "DEBIT"
      | "RESERVE"
      | "RELEASE",
    amount: number,
    currency: string,
    reference: string
  ) {
    const movementId =
      `WLT-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 9)
        .toUpperCase()}`;

    const movement:
      WalletMovement = {
      movementId,

      accountId,

      type,

      amount,

      currency,

      reference,

      createdAt:
        new Date().toISOString(),
    };

    this.movements.set(
      movementId,
      movement
    );

    return movement;
  }

  private getRequiredAccount(
    accountId: string
  ) {
    const account =
      this.accounts.get(
        accountId
      );

    if (!account) {
      throw new Error(
        "Digital Pay: account not found"
      );
    }

    return account;
  }

  private assertActive(
    account: WalletAccount
  ) {
    if (
      account.status !==
      "ACTIVE"
    ) {
      throw new Error(
        "Digital Pay: account is not active"
      );
    }
  }

  private assertAmount(
    amount: number
  ) {
    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      throw new Error(
        "Digital Pay: amount must be greater than zero"
      );
    }
  }

  /**
   * Internal runtime summary.
   */
  getSummary() {
    const accounts =
      Array.from(
        this.accounts.values()
      );

    return {
      totalAccounts:
        accounts.length,

      active:
        accounts.filter(
          account =>
            account.status ===
            "ACTIVE"
        ).length,

      frozen:
        accounts.filter(
          account =>
            account.status ===
            "FROZEN"
        ).length,

      customers:
        accounts.filter(
          account =>
            account.type ===
            "CUSTOMER"
        ).length,

      merchants:
        accounts.filter(
          account =>
            account.type ===
            "MERCHANT"
        ).length,

      agents:
        accounts.filter(
          account =>
            account.type ===
            "AGENT"
        ).length,

      institutions:
        accounts.filter(
          account =>
            account.type ===
            "INSTITUTION"
        ).length,

      movements:
        this.movements.size,
    };
  }
}

export const walletAccountService =
  new WalletAccountService();

export default walletAccountService;
