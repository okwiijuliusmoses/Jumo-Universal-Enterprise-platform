/**
 * JUMO DIGITAL PAY
 * Fee & Automated Deduction Policy Engine
 *
 * Supports:
 * - Transaction service fees
 * - Product-specific fees
 * - Institutional service fees
 * - Merchant fees
 * - Agent fees
 * - Automated deductions
 * - Fixed and percentage charges
 *
 * Fees are calculated separately from the
 * principal transaction amount.
 */

export type FeeRuleType =
  | "FIXED"
  | "PERCENTAGE";

export type FeeCategory =
  | "PLATFORM"
  | "PRODUCT"
  | "MERCHANT"
  | "AGENT"
  | "INSTITUTION"
  | "SERVICE"
  | "SETTLEMENT";

export interface FeeRule {
  ruleId: string;

  productId?: string;

  tenantId?: string;

  category:
    FeeCategory;

  type:
    FeeRuleType;

  value: number;

  currency?: string;

  minimumFee?: number;

  maximumFee?: number;

  enabled: boolean;

  priority: number;

  createdAt: string;
}

export interface AutomatedDeductionRule {
  deductionId: string;

  productId: string;

  description: string;

  type:
    | "FIXED"
    | "PERCENTAGE";

  value: number;

  currency: string;

  minimumBalance?: number;

  enabled: boolean;

  createdAt: string;
}

export interface FeeCalculation {
  principal: number;

  serviceFee: number;

  netAmount: number;

  currency: string;

  appliedRules: string[];

  deductions: number;
}

class FeePolicyService {
  private readonly feeRules =
    new Map<
      string,
      FeeRule
    >();

  private readonly deductions =
    new Map<
      string,
      AutomatedDeductionRule
    >();

  /**
   * Register a fee rule.
   */
  registerFeeRule(
    rule: FeeRule
  ): FeeRule {
    if (
      this.feeRules.has(
        rule.ruleId
      )
    ) {
      throw new Error(
        "Digital Pay: fee rule already exists"
      );
    }

    if (
      rule.value < 0
    ) {
      throw new Error(
        "Digital Pay: fee value cannot be negative"
      );
    }

    this.feeRules.set(
      rule.ruleId,
      rule
    );

    return rule;
  }

  /**
   * Register an automatic deduction.
   */
  registerDeduction(
    rule: AutomatedDeductionRule
  ) {
    if (
      this.deductions.has(
        rule.deductionId
      )
    ) {
      throw new Error(
        "Digital Pay: deduction already exists"
      );
    }

    if (
      rule.value < 0
    ) {
      throw new Error(
        "Digital Pay: deduction value cannot be negative"
      );
    }

    this.deductions.set(
      rule.deductionId,
      rule
    );

    return rule;
  }

  /**
   * Calculate transaction fees.
   */
  calculateFee(
    input: {
      productId: string;

      tenantId?: string;

      amount: number;

      currency: string;

      category?: FeeCategory;
    }
  ): FeeCalculation {
    if (
      input.amount <= 0
    ) {
      throw new Error(
        "Digital Pay: amount must be positive"
      );
    }

    const rules =
      Array.from(
        this.feeRules.values()
      )
        .filter(
          rule =>
            rule.enabled
        )
        .filter(
          rule =>
            !rule.productId ||
            rule.productId ===
              input.productId
        )
        .filter(
          rule =>
            !rule.tenantId ||
            rule.tenantId ===
              input.tenantId
        )
        .filter(
          rule =>
            !rule.currency ||
            rule.currency ===
              input.currency
        )
        .filter(
          rule =>
            !input.category ||
            rule.category ===
              input.category
        )
        .sort(
          (a, b) =>
            a.priority -
            b.priority
        );

    let totalFee = 0;

    const appliedRules:
      string[] = [];

    for (
      const rule of rules
    ) {
      let fee = 0;

      if (
        rule.type ===
        "FIXED"
      ) {
        fee = rule.value;
      }

      if (
        rule.type ===
        "PERCENTAGE"
      ) {
        fee =
          input.amount *
          (rule.value / 100);
      }

      if (
        rule.minimumFee !==
          undefined
      ) {
        fee =
          Math.max(
            fee,
            rule.minimumFee
          );
      }

      if (
        rule.maximumFee !==
          undefined
      ) {
        fee =
          Math.min(
            fee,
            rule.maximumFee
          );
      }

      totalFee += fee;

      appliedRules.push(
        rule.ruleId
      );
    }

    totalFee =
      Number(
        totalFee.toFixed(2)
      );

    return {
      principal:
        input.amount,

      serviceFee:
        totalFee,

      netAmount:
        Number(
          Math.max(
            input.amount -
              totalFee,
            0
          ).toFixed(2)
        ),

      currency:
        input.currency,

      appliedRules,

      deductions: 0,
    };
  }

  /**
   * Calculate automated deductions.
   *
   * This does not directly move money.
   * It creates the deduction amount for the
   * settlement/payment runtime to authorize.
   */
  calculateDeductions(
    input: {
      productId: string;

      amount: number;

      currency: string;
    }
  ): number {
    const rules =
      Array.from(
        this.deductions.values()
      ).filter(
        rule =>
          rule.enabled &&
          rule.productId ===
            input.productId &&
          rule.currency ===
            input.currency
      );

    let total = 0;

    for (
      const rule of rules
    ) {
      if (
        rule.type ===
        "FIXED"
      ) {
        total +=
          rule.value;
      } else {
        total +=
          input.amount *
          (rule.value / 100);
      }
    }

    return Number(
      Math.min(
        total,
        input.amount
      ).toFixed(2)
    );
  }

  /**
   * Calculate fees plus automatic deductions.
   */
  calculateComplete(
    input: {
      productId: string;

      tenantId?: string;

      amount: number;

      currency: string;

      category?: FeeCategory;
    }
  ): FeeCalculation {
    const fee =
      this.calculateFee(
        input
      );

    const deductions =
      this.calculateDeductions(
        input
      );

    return {
      ...fee,

      deductions,

      netAmount:
        Number(
          Math.max(
            input.amount -
              fee.serviceFee -
              deductions,
            0
          ).toFixed(2)
        ),
    };
  }

  /**
   * Enable/disable fee rules.
   */
  setFeeRuleStatus(
    ruleId: string,
    enabled: boolean
  ) {
    const rule =
      this.feeRules.get(
        ruleId
      );

    if (!rule) {
      return null;
    }

    rule.enabled =
      enabled;

    return rule;
  }

  /**
   * Enable/disable automatic deductions.
   */
  setDeductionStatus(
    deductionId: string,
    enabled: boolean
  ) {
    const rule =
      this.deductions.get(
        deductionId
      );

    if (!rule) {
      return null;
    }

    rule.enabled =
      enabled;

    return rule;
  }

  /**
   * Internal diagnostics.
   */
  getSummary() {
    return {
      feeRules:
        this.feeRules.size,

      activeFeeRules:
        Array.from(
          this.feeRules.values()
        ).filter(
          rule =>
            rule.enabled
        ).length,

      automatedDeductions:
        this.deductions.size,

      activeDeductions:
        Array.from(
          this.deductions.values()
        ).filter(
          rule =>
            rule.enabled
        ).length,
    };
  }
}

export const feePolicyService =
  new FeePolicyService();

export default feePolicyService;
