/**
 * JUMO DIGITAL PAY
 * PHASE 8 — REVENUE, SERVICE-FEE & COMMISSION ENGINE
 *
 * Centralized commercial money-flow rules for:
 * - merchant payments
 * - agent banking
 * - institutional/school payments
 * - banking services
 * - wallets
 * - loans
 * - repayments
 * - collections
 * - platform services
 *
 * Rules are configuration-driven.
 * No manual paperwork is required by the runtime.
 */

export type RevenueRuleType =
  | "SERVICE_FEE"
  | "COMMISSION"
  | "PLATFORM_FEE"
  | "PROCESSING_FEE"
  | "LOAN_FEE"
  | "AGENT_FEE"
  | "MERCHANT_FEE"
  | "INSTITUTION_FEE";

export interface RevenueRule {
  id: string;

  serviceId: string;

  type: RevenueRuleType;

  ratePercent: number;

  fixedAmount?: number;

  currency?: string;

  enabled: boolean;

  priority: number;

  metadata?: Record<string, unknown>;
}

export interface RevenueCalculation {
  transactionId: string;

  serviceId: string;

  grossAmount: number;

  totalFees: number;

  netAmount: number;

  fees: Array<{
    ruleId: string;
    type: RevenueRuleType;
    amount: number;
  }>;

  calculatedAt: string;
}

const rules =
  new Map<string, RevenueRule>();

export class DigitalPayRevenueEngine {
  registerRule(
    rule: RevenueRule,
  ): RevenueRule {
    if (!rule.id) {
      throw new Error(
        "Revenue rule ID is required.",
      );
    }

    if (!rule.serviceId) {
      throw new Error(
        "Revenue rule service ID is required.",
      );
    }

    if (
      rule.ratePercent < 0 ||
      rule.ratePercent > 100
    ) {
      throw new Error(
        "Revenue rule percentage must be between 0 and 100.",
      );
    }

    rules.set(
      rule.id,
      rule,
    );

    return rule;
  }

  removeRule(
    ruleId: string,
  ): boolean {
    return rules.delete(
      ruleId,
    );
  }

  getRule(
    ruleId: string,
  ): RevenueRule | undefined {
    return rules.get(
      ruleId,
    );
  }

  listRules(
    serviceId?: string,
  ): RevenueRule[] {
    const values =
      Array.from(
        rules.values(),
      );

    if (!serviceId) {
      return values;
    }

    return values.filter(
      (rule) =>
        rule.serviceId ===
        serviceId,
    );
  }

  calculate(
    transactionId: string,
    serviceId: string,
    grossAmount: number,
  ): RevenueCalculation {
    if (
      !transactionId ||
      !serviceId
    ) {
      throw new Error(
        "Transaction and service identifiers are required.",
      );
    }

    if (
      !Number.isFinite(
        grossAmount,
      ) ||
      grossAmount <= 0
    ) {
      throw new Error(
        "Gross amount must be greater than zero.",
      );
    }

    const serviceRules =
      this.listRules(
        serviceId,
      )
        .filter(
          (rule) =>
            rule.enabled,
        )
        .sort(
          (a, b) =>
            a.priority -
            b.priority,
        );

    let totalFees = 0;

    const fees =
      serviceRules.map(
        (rule) => {
          const percentageFee =
            grossAmount *
            (rule.ratePercent /
              100);

          const fixedFee =
            rule.fixedAmount ??
            0;

          const amount =
            Math.round(
              (percentageFee +
                fixedFee) *
                100,
            ) / 100;

          totalFees +=
            amount;

          return {
            ruleId:
              rule.id,
            type:
              rule.type,
            amount,
          };
        },
      );

    totalFees =
      Math.min(
        totalFees,
        grossAmount,
      );

    return {
      transactionId,

      serviceId,

      grossAmount,

      totalFees,

      netAmount:
        Math.max(
          0,
          grossAmount -
            totalFees,
        ),

      fees,

      calculatedAt:
        new Date().toISOString(),
    };
  }

  seedDefaultRules(
    serviceId: string,
  ): RevenueRule[] {
    const defaults: RevenueRule[] = [
      {
        id: `${serviceId}:platform`,
        serviceId,
        type:
          "PLATFORM_FEE",
        ratePercent: 0.5,
        enabled: true,
        priority: 100,
      },
      {
        id: `${serviceId}:processing`,
        serviceId,
        type:
          "PROCESSING_FEE",
        ratePercent: 0,
        fixedAmount: 0,
        enabled: true,
        priority: 200,
      },
    ];

    for (const rule of defaults) {
      this.registerRule(
        rule,
      );
    }

    return defaults;
  }
}

export const digitalPayRevenueEngine =
  new DigitalPayRevenueEngine();

export default digitalPayRevenueEngine;
