/**
 * JUMO DIGITAL PAY
 * Enterprise Service-Fee & Revenue Distribution Engine
 *
 * Supports:
 * - Platform fees
 * - ERP/product fees
 * - Merchant fees
 * - Institutional fees
 * - Agent commissions
 * - Payment-rail charges
 * - Configurable revenue recipients
 *
 * Internal identities remain confidential.
 * Public payment references are the only external
 * payment identity exposed by Digital Pay.
 */

export type FeeCategory =
  | "PLATFORM"
  | "ERP_PRODUCT"
  | "MERCHANT"
  | "INSTITUTION"
  | "AGENT"
  | "PAYMENT_RAIL"
  | "SERVICE";

export interface FeeRule {
  id: string;

  category: FeeCategory;

  name: string;

  /**
   * Percentage expressed as a normal percentage.
   * Example: 2.5 means 2.5%.
   */
  percentage: number;

  /**
   * Optional fixed fee.
   */
  fixedAmount: number;

  currency: string;

  enabled: boolean;

  priority: number;
}

export interface FeeRecipient {
  recipientId: string;

  category: FeeCategory;

  percentageOfFee: number;

  /**
   * Confidential internal destination.
   * Never expose this through public payment APIs.
   */
  internalAccountId: string;
}

export interface FeeDistribution {
  distributionId: string;

  transactionId: string;
  publicReference: string;

  grossAmount: number;

  totalFee: number;

  netAmount: number;

  currency: string;

  breakdown: Array<{
    category: FeeCategory;
    ruleId: string;
    amount: number;
  }>;

  recipients: Array<{
    category: FeeCategory;
    amount: number;
    internalAccountId: string;
  }>;

  createdAt: string;
}

class FeeDistributionService {
  private readonly rules =
    new Map<string, FeeRule>();

  private readonly distributions =
    new Map<string, FeeDistribution>();

  private readonly recipients =
    new Map<string, FeeRecipient>();

  /**
   * Register or replace a fee rule.
   */
  registerRule(
    rule: FeeRule
  ): FeeRule {
    if (
      rule.percentage < 0 ||
      rule.fixedAmount < 0
    ) {
      throw new Error(
        "Digital Pay: fee values cannot be negative"
      );
    }

    this.rules.set(
      rule.id,
      rule
    );

    return rule;
  }

  /**
   * Register a confidential revenue recipient.
   */
  registerRecipient(
    recipient: FeeRecipient
  ): FeeRecipient {
    if (
      recipient.percentageOfFee < 0 ||
      recipient.percentageOfFee > 100
    ) {
      throw new Error(
        "Digital Pay: recipient percentage must be between 0 and 100"
      );
    }

    this.recipients.set(
      recipient.recipientId,
      recipient
    );

    return recipient;
  }

  /**
   * Calculate and distribute fees for a payment.
   */
  calculate(
    transaction: {
      transactionId: string;
      publicReference: string;
      amount: number;
      currency: string;
    }
  ): FeeDistribution {
    const activeRules =
      Array.from(
        this.rules.values()
      )
        .filter(
          rule =>
            rule.enabled &&
            rule.currency ===
              transaction.currency
        )
        .sort(
          (a, b) =>
            a.priority -
            b.priority
        );

    const breakdown: FeeDistribution["breakdown"] =
      [];

    let totalFee = 0;

    for (const rule of activeRules) {
      const percentageFee =
        transaction.amount *
        (rule.percentage / 100);

      const amount = Number(
        (
          percentageFee +
          rule.fixedAmount
        ).toFixed(2)
      );

      if (amount <= 0) {
        continue;
      }

      breakdown.push({
        category:
          rule.category,

        ruleId:
          rule.id,

        amount,
      });

      totalFee += amount;
    }

    totalFee = Number(
      totalFee.toFixed(2)
    );

    const netAmount = Number(
      Math.max(
        transaction.amount -
          totalFee,
        0
      ).toFixed(2)
    );

    const activeRecipients =
      Array.from(
        this.recipients.values()
      );

    const recipients =
      activeRecipients.map(
        recipient => ({
          category:
            recipient.category,

          amount: Number(
            (
              totalFee *
              (
                recipient.percentageOfFee /
                100
              )
            ).toFixed(2)
          ),

          internalAccountId:
            recipient.internalAccountId,
        })
      );

    const distribution: FeeDistribution = {
      distributionId:
        `FEE_${Date.now()}_${Math.random()
          .toString(36)
          .slice(2, 9)
          .toUpperCase()}`,

      transactionId:
        transaction.transactionId,

      publicReference:
        transaction.publicReference,

      grossAmount:
        transaction.amount,

      totalFee,

      netAmount,

      currency:
        transaction.currency,

      breakdown,

      recipients,

      createdAt:
        new Date().toISOString(),
    };

    this.distributions.set(
      distribution.distributionId,
      distribution
    );

    return distribution;
  }

  /**
   * Retrieve a distribution internally.
   */
  getDistribution(
    distributionId: string
  ): FeeDistribution | null {
    return (
      this.distributions.get(
        distributionId
      ) ?? null
    );
  }

  /**
   * Safe public representation.
   *
   * Confidential internal account identifiers
   * are deliberately removed.
   */
  getPublicDistribution(
    distributionId: string
  ) {
    const distribution =
      this.distributions.get(
        distributionId
      );

    if (!distribution) {
      return null;
    }

    return {
      distributionId:
        distribution.distributionId,

      publicReference:
        distribution.publicReference,

      grossAmount:
        distribution.grossAmount,

      totalFee:
        distribution.totalFee,

      netAmount:
        distribution.netAmount,

      currency:
        distribution.currency,

      breakdown:
        distribution.breakdown,

      recipients:
        distribution.recipients.map(
          recipient => ({
            category:
              recipient.category,

            amount:
              recipient.amount,
          })
        ),
    };
  }

  /**
   * Return currently configured fee rules.
   */
  getRules(): FeeRule[] {
    return Array.from(
      this.rules.values()
    );
  }

  /**
   * Return service statistics.
   */
  getSummary() {
    const distributions =
      Array.from(
        this.distributions.values()
      );

    return {
      rules:
        this.rules.size,

      recipients:
        this.recipients.size,

      distributions:
        distributions.length,

      grossVolume:
        distributions.reduce(
          (sum, item) =>
            sum +
            item.grossAmount,
          0
        ),

      feesCollected:
        distributions.reduce(
          (sum, item) =>
            sum +
            item.totalFee,
          0
        ),
    };
  }
}

export const feeDistributionService =
  new FeeDistributionService();

export default feeDistributionService;
