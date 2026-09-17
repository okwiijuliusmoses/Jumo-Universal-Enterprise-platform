/**
 * JUMO Automated Treasury Engine
 *
 * No deduction rates, accounts, beneficiaries or thresholds
 * are hardcoded here.
 *
 * All financial rules come from authorized configuration.
 */

export interface JumoTreasuryDeductionRule {
  id: string;
  name: string;

  enabled: boolean;

  sourceProductId?: string;
  transactionType: string;

  calculation:
    | {
        type: 'PERCENTAGE';
        value: number;
      }
    | {
        type: 'FIXED';
        value: number;
      };

  sourceAccount: string;
  destinationAccount: string;

  currency?: string;

  threshold?: {
    minimum?: number;
    maximum?: number;
  };

  schedule?:
    | 'IMMEDIATE'
    | 'DAILY'
    | 'WEEKLY'
    | 'MONTHLY'
    | 'CUSTOM';

  authorized: boolean;
  version: string;
}

export interface JumoTreasuryDeductionRequest {
  productId: string;
  transactionId: string;
  transactionType: string;
  amount: number;
  currency: string;
}

export interface JumoTreasuryDeductionResult {
  ruleId: string;
  transactionId: string;
  grossAmount: number;
  deductionAmount: number;
  netAmount: number;
  currency: string;
  sourceAccount: string;
  destinationAccount: string;
}

export class JumoAutomatedTreasuryEngine {

  private readonly rules =
    new Map<string, JumoTreasuryDeductionRule>();

  registerRule(
    rule: JumoTreasuryDeductionRule
  ): void {
    if (!rule.authorized) {
      throw new Error(
        `Treasury rule ${rule.id} is not authorized.`
      );
    }

    this.rules.set(rule.id, rule);
  }

  listRules(): JumoTreasuryDeductionRule[] {
    return Array.from(this.rules.values());
  }

  resolveRules(
    request: JumoTreasuryDeductionRequest
  ): JumoTreasuryDeductionRule[] {
    return this.listRules().filter(rule => {

      if (!rule.enabled || !rule.authorized) {
        return false;
      }

      if (
        rule.sourceProductId &&
        rule.sourceProductId !== request.productId
      ) {
        return false;
      }

      if (
        rule.transactionType !== request.transactionType
      ) {
        return false;
      }

      if (
        rule.threshold?.minimum !== undefined &&
        request.amount < rule.threshold.minimum
      ) {
        return false;
      }

      if (
        rule.threshold?.maximum !== undefined &&
        request.amount > rule.threshold.maximum
      ) {
        return false;
      }

      if (
        rule.currency &&
        rule.currency !== request.currency
      ) {
        return false;
      }

      return true;
    });
  }

  calculate(
    request: JumoTreasuryDeductionRequest
  ): JumoTreasuryDeductionResult[] {

    const rules = this.resolveRules(request);

    return rules.map(rule => {

      let deductionAmount = 0;

      if (rule.calculation.type === 'PERCENTAGE') {
        deductionAmount =
          request.amount *
          (rule.calculation.value / 100);
      }

      if (rule.calculation.type === 'FIXED') {
        deductionAmount =
          rule.calculation.value;
      }

      deductionAmount =
        Math.max(
          0,
          Math.min(
            deductionAmount,
            request.amount
          )
        );

      return {
        ruleId: rule.id,
        transactionId: request.transactionId,
        grossAmount: request.amount,
        deductionAmount,
        netAmount:
          request.amount - deductionAmount,
        currency: request.currency,
        sourceAccount: rule.sourceAccount,
        destinationAccount: rule.destinationAccount,
      };
    });
  }

  validateConfiguration(): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    for (const rule of this.listRules()) {

      if (!rule.id) {
        errors.push('Treasury rule is missing an ID.');
      }

      if (!rule.sourceAccount) {
        errors.push(
          `${rule.id}: source account is missing.`
        );
      }

      if (!rule.destinationAccount) {
        errors.push(
          `${rule.id}: destination account is missing.`
        );
      }

      if (!rule.authorized) {
        errors.push(
          `${rule.id}: rule is not authorized.`
        );
      }

      if (
        rule.calculation.value < 0
      ) {
        errors.push(
          `${rule.id}: deduction value cannot be negative.`
        );
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export const JUMO_AUTOMATED_TREASURY_ENGINE =
  new JumoAutomatedTreasuryEngine();
