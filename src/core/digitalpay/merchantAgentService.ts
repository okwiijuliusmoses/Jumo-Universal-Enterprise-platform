/**
 * JUMO DIGITAL PAY
 * Merchant + Agent Banking Engine
 *
 * Supports:
 * - Merchant collections
 * - Merchant settlement
 * - Agent cash-in
 * - Agent cash-out
 * - Agent commissions
 * - Merchant commissions/fees
 * - Agent float monitoring
 * - Settlement lifecycle
 *
 * Internal platform, tenant, template and institution
 * identifiers remain confidential.
 */

export type MerchantStatus =
  | "PENDING"
  | "ACTIVE"
  | "SUSPENDED"
  | "CLOSED";

export type AgentStatus =
  | "PENDING"
  | "ACTIVE"
  | "SUSPENDED"
  | "CLOSED";

export type AgentOperation =
  | "CASH_IN"
  | "CASH_OUT";

export type MerchantTransactionType =
  | "COLLECTION"
  | "REFUND"
  | "SETTLEMENT";

export type SettlementState =
  | "PENDING"
  | "PROCESSING"
  | "SETTLED"
  | "FAILED"
  | "RECONCILIATION_REQUIRED";

export interface MerchantProfile {
  merchantId: string;

  /**
   * Public merchant code.
   */
  merchantCode: string;

  displayName: string;

  currency: string;

  status: MerchantStatus;

  settlementAccount: string;

  createdAt: string;
}

export interface AgentProfile {
  agentId: string;

  /**
   * Public agent code.
   */
  agentCode: string;

  displayName: string;

  currency: string;

  status: AgentStatus;

  floatBalance: number;

  commissionRate: number;

  createdAt: string;
}

export interface MerchantCollection {
  transactionId: string;

  merchantId: string;

  merchantCode: string;

  publicReference: string;

  type: MerchantTransactionType;

  amount: number;

  fee: number;

  netAmount: number;

  currency: string;

  settlementState: SettlementState;

  createdAt: string;
}

export interface AgentTransaction {
  transactionId: string;

  agentId: string;

  agentCode: string;

  publicReference: string;

  operation: AgentOperation;

  amount: number;

  commission: number;

  currency: string;

  settlementState: SettlementState;

  createdAt: string;
}

class MerchantAgentService {
  private readonly merchants =
    new Map<string, MerchantProfile>();

  private readonly agents =
    new Map<string, AgentProfile>();

  private readonly merchantTransactions =
    new Map<string, MerchantCollection>();

  private readonly agentTransactions =
    new Map<string, AgentTransaction>();

  /**
   * Register a merchant.
   */
  registerMerchant(
    merchant: MerchantProfile
  ): MerchantProfile {
    if (!merchant.merchantCode.trim()) {
      throw new Error(
        "Digital Pay: merchant code is required"
      );
    }

    this.merchants.set(
      merchant.merchantId,
      merchant
    );

    return merchant;
  }

  /**
   * Register an agent.
   */
  registerAgent(
    agent: AgentProfile
  ): AgentProfile {
    if (!agent.agentCode.trim()) {
      throw new Error(
        "Digital Pay: agent code is required"
      );
    }

    if (agent.floatBalance < 0) {
      throw new Error(
        "Digital Pay: agent float cannot be negative"
      );
    }

    this.agents.set(
      agent.agentId,
      agent
    );

    return agent;
  }

  /**
   * Create a merchant collection.
   */
  collectMerchantPayment(
    merchantId: string,
    request: {
      publicReference: string;
      amount: number;
      fee?: number;
      currency: string;
    }
  ): MerchantCollection {
    const merchant =
      this.merchants.get(
        merchantId
      );

    if (!merchant) {
      throw new Error(
        "Digital Pay: merchant not found"
      );
    }

    if (
      merchant.status !== "ACTIVE"
    ) {
      throw new Error(
        "Digital Pay: merchant is not active"
      );
    }

    if (request.amount <= 0) {
      throw new Error(
        "Digital Pay: merchant payment amount must be positive"
      );
    }

    if (
      request.currency !==
      merchant.currency
    ) {
      throw new Error(
        "Digital Pay: merchant currency mismatch"
      );
    }

    const fee = Number(
      Math.max(
        request.fee ?? 0,
        0
      ).toFixed(2)
    );

    const netAmount = Number(
      Math.max(
        request.amount - fee,
        0
      ).toFixed(2)
    );

    const transaction: MerchantCollection = {
      transactionId:
        `MRC_${Date.now()}_${Math.random()
          .toString(36)
          .slice(2, 9)
          .toUpperCase()}`,

      merchantId,

      merchantCode:
        merchant.merchantCode,

      publicReference:
        request.publicReference,

      type:
        "COLLECTION",

      amount:
        request.amount,

      fee,

      netAmount,

      currency:
        request.currency,

      settlementState:
        "PENDING",

      createdAt:
        new Date().toISOString(),
    };

    this.merchantTransactions.set(
      transaction.transactionId,
      transaction
    );

    return transaction;
  }

  /**
   * Create an agent cash operation.
   */
  processAgentOperation(
    agentId: string,
    request: {
      publicReference: string;
      operation: AgentOperation;
      amount: number;
      currency: string;
    }
  ): AgentTransaction {
    const agent =
      this.agents.get(agentId);

    if (!agent) {
      throw new Error(
        "Digital Pay: agent not found"
      );
    }

    if (
      agent.status !== "ACTIVE"
    ) {
      throw new Error(
        "Digital Pay: agent is not active"
      );
    }

    if (request.amount <= 0) {
      throw new Error(
        "Digital Pay: agent amount must be positive"
      );
    }

    if (
      request.currency !==
      agent.currency
    ) {
      throw new Error(
        "Digital Pay: agent currency mismatch"
      );
    }

    /**
     * Cash-out consumes agent float.
     * Cash-in increases agent float.
     */
    if (
      request.operation ===
      "CASH_OUT"
    ) {
      if (
        agent.floatBalance <
        request.amount
      ) {
        throw new Error(
          "Digital Pay: insufficient agent float"
        );
      }

      agent.floatBalance = Number(
        (
          agent.floatBalance -
          request.amount
        ).toFixed(2)
      );
    } else {
      agent.floatBalance = Number(
        (
          agent.floatBalance +
          request.amount
        ).toFixed(2)
      );
    }

    const commission = Number(
      (
        request.amount *
        (agent.commissionRate / 100)
      ).toFixed(2)
    );

    const transaction: AgentTransaction = {
      transactionId:
        `AGT_${Date.now()}_${Math.random()
          .toString(36)
          .slice(2, 9)
          .toUpperCase()}`,

      agentId,

      agentCode:
        agent.agentCode,

      publicReference:
        request.publicReference,

      operation:
        request.operation,

      amount:
        request.amount,

      commission,

      currency:
        request.currency,

      settlementState:
        "PENDING",

      createdAt:
        new Date().toISOString(),
    };

    this.agentTransactions.set(
      transaction.transactionId,
      transaction
    );

    return transaction;
  }

  /**
   * Update merchant settlement state.
   */
  updateMerchantSettlement(
    transactionId: string,
    state: SettlementState
  ) {
    const transaction =
      this.merchantTransactions.get(
        transactionId
      );

    if (!transaction) {
      return null;
    }

    transaction.settlementState =
      state;

    return transaction;
  }

  /**
   * Update agent settlement state.
   */
  updateAgentSettlement(
    transactionId: string,
    state: SettlementState
  ) {
    const transaction =
      this.agentTransactions.get(
        transactionId
      );

    if (!transaction) {
      return null;
    }

    transaction.settlementState =
      state;

    return transaction;
  }

  /**
   * Safe public merchant information.
   */
  getPublicMerchant(
    merchantId: string
  ) {
    const merchant =
      this.merchants.get(
        merchantId
      );

    if (!merchant) {
      return null;
    }

    return {
      merchantCode:
        merchant.merchantCode,

      displayName:
        merchant.displayName,

      currency:
        merchant.currency,

      status:
        merchant.status,
    };
  }

  /**
   * Safe public agent information.
   */
  getPublicAgent(
    agentId: string
  ) {
    const agent =
      this.agents.get(
        agentId
      );

    if (!agent) {
      return null;
    }

    return {
      agentCode:
        agent.agentCode,

      displayName:
        agent.displayName,

      currency:
        agent.currency,

      status:
        agent.status,

      floatBalance:
        agent.floatBalance,
    };
  }

  /**
   * Runtime statistics.
   */
  getSummary() {
    const merchantTransactions =
      Array.from(
        this.merchantTransactions.values()
      );

    const agentTransactions =
      Array.from(
        this.agentTransactions.values()
      );

    return {
      merchants:
        this.merchants.size,

      agents:
        this.agents.size,

      merchantTransactions:
        merchantTransactions.length,

      agentTransactions:
        agentTransactions.length,

      merchantVolume:
        merchantTransactions.reduce(
          (sum, item) =>
            sum + item.amount,
          0
        ),

      agentVolume:
        agentTransactions.reduce(
          (sum, item) =>
            sum + item.amount,
          0
        ),

      agentCommissions:
        agentTransactions.reduce(
          (sum, item) =>
            sum + item.commission,
          0
        ),
    };
  }
}

export const merchantAgentService =
  new MerchantAgentService();

export default merchantAgentService;
