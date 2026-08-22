/**
 * JUMO UEOS Phase 27 — Universal Treasury Routing Engine & Automated Service Fee Engine
 * All platform revenue routes through one sovereign treasury channel.
 */

import { faapEngine } from '../faap';
import { platformEventBus } from '../event-bus';

export type RevenueChannelType =
  | 'INTERNAL_DOMAIN'
  | 'EXTERNAL_INSTALLATION'
  | 'SAAS_SUBSCRIPTION'
  | 'ENTERPRISE_DEPLOYMENT'
  | 'MARKETPLACE_APP'
  | 'API_USAGE'
  | 'AI_USAGE'
  | 'STORAGE_USAGE'
  | 'PREMIUM_MODULE';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'KES' | 'UGX' | 'TZS' | 'ZAR';

export interface TreasuryRoutedPayment {
  paymentId: string;
  sourceDomainId: string;
  tenantId: string;
  channel: RevenueChannelType;
  rawAmount: number;
  currency: CurrencyCode;
  settledAmountUSD: number;
  paymentGateway: 'SWIFT_INSTITUTIONAL' | 'MOBILE_MONEY_EAST_AFRICA' | 'CENTRAL_BANK_RTGS' | 'VISA_MASTERCARD_COMMERCIAL';
  timestamp: string;
  faapJournalId: string;
  status: 'SETTLED_FAAP' | 'PENDING_CLEARING' | 'QUARANTINED_AEGIS';
  allocationBreakdown: {
    platformSovereignFeeUSD: number;
    tenantNetRevenueUSD: number;
    aegisInsuranceReserveUSD: number;
  };
}

export interface AutomatedBillingRule {
  ruleId: string;
  tenantId: string;
  serviceType: 'AI_COPILOT_METERED' | 'STORAGE_TERABYTE' | 'API_TRANSACTION_VOL' | 'MODULE_LICENSE_MONTHLY';
  billingCycle: 'MONTHLY' | 'ANNUAL' | 'REALTIME_DEDUCTION';
  ratePerUnitUSD: number;
  currentCycleUsage: number;
  status: 'ACTIVE' | 'SUSPENDED';
}

export class UniversalTreasuryRoutingEngine {
  private treasuryLedger: TreasuryRoutedPayment[] = [];
  private billingRules: AutomatedBillingRule[] = [
    { ruleId: 'br_finbank_ai', tenantId: 'tenant_finbank_01', serviceType: 'AI_COPILOT_METERED', billingCycle: 'REALTIME_DEDUCTION', ratePerUnitUSD: 0.05, currentCycleUsage: 14200, status: 'ACTIVE' },
    { ruleId: 'br_finbank_mod', tenantId: 'tenant_finbank_01', serviceType: 'MODULE_LICENSE_MONTHLY', billingCycle: 'MONTHLY', ratePerUnitUSD: 12500, currentCycleUsage: 1, status: 'ACTIVE' },
    { ruleId: 'br_sacco_api', tenantId: 'tenant_sacco_nairobi', serviceType: 'API_TRANSACTION_VOL', billingCycle: 'REALTIME_DEDUCTION', ratePerUnitUSD: 0.01, currentCycleUsage: 89400, status: 'ACTIVE' },
    { ruleId: 'br_sacco_mod', tenantId: 'tenant_sacco_nairobi', serviceType: 'MODULE_LICENSE_MONTHLY', billingCycle: 'MONTHLY', ratePerUnitUSD: 3500, currentCycleUsage: 1, status: 'ACTIVE' },
  ];

  private exchangeRates: Record<CurrencyCode, number> = {
    USD: 1.0,
    EUR: 1.09,
    GBP: 1.29,
    KES: 0.0077,
    UGX: 0.00027,
    TZS: 0.00038,
    ZAR: 0.055,
  };

  constructor() {
    this.seedInitialSettlements();
  }

  private seedInitialSettlements() {
    this.routeCustomerPayment({
      sourceDomainId: 'dom_finbank_com',
      tenantId: 'tenant_finbank_01',
      channel: 'ENTERPRISE_DEPLOYMENT',
      rawAmount: 250000,
      currency: 'USD',
      paymentGateway: 'SWIFT_INSTITUTIONAL',
      description: 'Q3 Enterprise Sovereign License & Dedicated HSM Provisioning',
    });

    this.routeCustomerPayment({
      sourceDomainId: 'dom_sacco_nairobi',
      tenantId: 'tenant_sacco_nairobi',
      channel: 'SAAS_SUBSCRIPTION',
      rawAmount: 4500000,
      currency: 'KES',
      paymentGateway: 'MOBILE_MONEY_EAST_AFRICA',
      description: 'Monthly SACCO Cloud Subscription & Share Ledger License',
    });
  }

  public convertAmount(amount: number, from: string, to: string): number {
    const fromRate = this.exchangeRates[from as CurrencyCode] || 1.0;
    const toRate = this.exchangeRates[to as CurrencyCode] || 1.0;
    const amountInUSD = amount * fromRate;
    return Number((amountInUSD / toRate).toFixed(2));
  }

  public routeCustomerPayment(request: {
    sourceDomainId: string;
    tenantId: string;
    channel: RevenueChannelType;
    rawAmount: number;
    currency: CurrencyCode;
    paymentGateway: 'SWIFT_INSTITUTIONAL' | 'MOBILE_MONEY_EAST_AFRICA' | 'CENTRAL_BANK_RTGS' | 'VISA_MASTERCARD_COMMERCIAL';
    description: string;
  }): TreasuryRoutedPayment {
    const settledUSD = this.convertAmount(request.rawAmount, request.currency, 'USD');

    // Revenue Allocation Calculation
    const platformFee = Number((settledUSD * 0.12).toFixed(2)); // 12% Platform Sovereign Fee
    const insuranceReserve = Number((settledUSD * 0.03).toFixed(2)); // 3% AEGIS Contingency Reserve
    const tenantNet = Number((settledUSD - platformFee - insuranceReserve).toFixed(2));

    // Post to FAAP Double-Entry Ledger
    const journal = faapEngine.postJournalEntry({
      tenantId: request.tenantId,
      description: `[Treasury Router] ${request.description} (${request.rawAmount} ${request.currency})`,
      debitAccount: '1010', // Cash & Treasury Liquidity
      creditAccount: '4010', // Operating Revenue / Settlement
      amountUSD: settledUSD,
    });

    const routed: TreasuryRoutedPayment = {
      paymentId: `tr_pay_${Date.now()}_${Math.floor(Math.random() * 900 + 100)}`,
      sourceDomainId: request.sourceDomainId,
      tenantId: request.tenantId,
      channel: request.channel,
      rawAmount: request.rawAmount,
      currency: request.currency,
      settledAmountUSD: settledUSD,
      paymentGateway: request.paymentGateway,
      timestamp: new Date().toISOString(),
      faapJournalId: journal.entryId,
      status: 'SETTLED_FAAP',
      allocationBreakdown: {
        platformSovereignFeeUSD: platformFee,
        tenantNetRevenueUSD: tenantNet,
        aegisInsuranceReserveUSD: insuranceReserve,
      },
    };

    this.treasuryLedger.unshift(routed);
    if (this.treasuryLedger.length > 300) this.treasuryLedger.pop();

    platformEventBus.publish('TREASURY_DRAWDOWN' as any, request.tenantId, {
      routedPayment: routed,
      journalEntry: journal,
    });

    return routed;
  }

  public executeAutomatedBillingCycle(tenantId?: string): { billedCount: number; totalCollectedUSD: number } {
    let count = 0;
    let totalUSD = 0;

    const rules = tenantId ? this.billingRules.filter((r) => r.tenantId === tenantId) : this.billingRules;

    for (const rule of rules) {
      if (rule.status !== 'ACTIVE') continue;
      const amount = Number((rule.currentCycleUsage * rule.ratePerUnitUSD).toFixed(2));
      if (amount <= 0) continue;

      this.routeCustomerPayment({
        sourceDomainId: 'engine_revenue_auto',
        tenantId: rule.tenantId,
        channel: rule.serviceType === 'AI_COPILOT_METERED' ? 'AI_USAGE' : rule.serviceType === 'API_TRANSACTION_VOL' ? 'API_USAGE' : 'PREMIUM_MODULE',
        rawAmount: amount,
        currency: 'USD',
        paymentGateway: 'SWIFT_INSTITUTIONAL',
        description: `Automated Billing Deduction: ${rule.serviceType} (${rule.currentCycleUsage} units @ $${rule.ratePerUnitUSD})`,
      });

      count++;
      totalUSD += amount;
    }

    return { billedCount: count, totalCollectedUSD: totalUSD };
  }

  public getTreasuryLedger(tenantId?: string): TreasuryRoutedPayment[] {
    if (!tenantId) return this.treasuryLedger;
    return this.treasuryLedger.filter((p) => p.tenantId === tenantId);
  }

  public getBillingRules(tenantId?: string): AutomatedBillingRule[] {
    if (!tenantId) return this.billingRules;
    return this.billingRules.filter((r) => r.tenantId === tenantId);
  }

  public getTreasuryStats() {
    const totalSettledUSD = this.treasuryLedger.reduce((acc, p) => acc + p.settledAmountUSD, 0);
    const totalPlatformFeeUSD = this.treasuryLedger.reduce((acc, p) => acc + p.allocationBreakdown.platformSovereignFeeUSD, 0);
    const totalAegisReserveUSD = this.treasuryLedger.reduce((acc, p) => acc + p.allocationBreakdown.aegisInsuranceReserveUSD, 0);

    return {
      totalSettledUSD,
      totalPlatformFeeUSD,
      totalAegisReserveUSD,
      transactionsCount: this.treasuryLedger.length,
      activeBillingRulesCount: this.billingRules.length,
    };
  }

  // Compatibility methods for old stubs
  public calculateRevenue(data: any) { return { status: 'SUCCESS', data }; }
  public allocateFunds(data: any) { return { status: 'SUCCESS', data }; }
  public processSettlement(data: any) { return { status: 'SUCCESS', data }; }
}

export const universalTreasuryRouter = new UniversalTreasuryRoutingEngine();
export const TreasuryEngine = universalTreasuryRouter;

/**
 * Phase 27.3 — JUMO Revenue Automation Engine (JRAE)
 * Automated billing and deduction engine with Owner Controls.
 */
export interface JraeBillingPolicy {
  policyId: string;
  serviceName: string; // e.g. "Gemini 2.5 Pro AI Copilot", "Sovereign HSM Hosting"
  billingType: 'SUBSCRIPTION' | 'AUTOMATIC_DEDUCTION' | 'COMMISSION' | 'RESELLER_SHARE' | 'MARKETPLACE_FEE' | 'API_CONSUMPTION' | 'AI_MODEL_USAGE' | 'STORAGE_BILLING' | 'HOSTING_BILLING';
  currency: CurrencyCode;
  rate: number; // e.g. 150.00 or 0.05
  frequency: 'REALTIME' | 'HOURLY' | 'DAILY' | 'MONTHLY' | 'ANNUAL';
  taxRules: {
    vatRatePercent: number; // e.g. 18% or 16%
    withholdingTaxPercent: number; // e.g. 6%
  };
  revenueDestination: 'JUMO_MASTER_TREASURY' | 'DOMAIN_OWNER_REVENUE' | 'RESELLER_PARTNER_POOL' | 'TENANT_SETTLEMENT' | 'TAX_COMPLIANCE_RESERVE';
  approvalPolicy: 'AUTOMATIC_EXECUTION' | 'REQUIRES_OWNER_SIGN_OFF' | 'MULTI_SIG_AEGIS';
  status: 'ACTIVE' | 'PAUSED';
}

export class JumoRevenueAutomationEngine {
  private policies: JraeBillingPolicy[] = [];

  constructor() {
    this.seedDefaultPolicies();
  }

  private seedDefaultPolicies() {
    this.policies = [
      {
        policyId: 'jrae_pol_ai_model',
        serviceName: 'Gemini 2.5 Pro & Flash Intelligence Usage',
        billingType: 'AI_MODEL_USAGE',
        currency: 'USD',
        rate: 0.02, // per 1k tokens
        frequency: 'REALTIME',
        taxRules: { vatRatePercent: 18, withholdingTaxPercent: 0 },
        revenueDestination: 'JUMO_MASTER_TREASURY',
        approvalPolicy: 'AUTOMATIC_EXECUTION',
        status: 'ACTIVE'
      },
      {
        policyId: 'jrae_pol_marketplace',
        serviceName: 'JUMO Marketplace Application Fee',
        billingType: 'MARKETPLACE_FEE',
        currency: 'USD',
        rate: 15.0, // 15% commission
        frequency: 'REALTIME',
        taxRules: { vatRatePercent: 16, withholdingTaxPercent: 5 },
        revenueDestination: 'JUMO_MASTER_TREASURY',
        approvalPolicy: 'AUTOMATIC_EXECUTION',
        status: 'ACTIVE'
      },
      {
        policyId: 'jrae_pol_reseller',
        serviceName: 'Certified Enterprise Partner Reseller Share',
        billingType: 'RESELLER_SHARE',
        currency: 'USD',
        rate: 25.0, // 25% revenue share
        frequency: 'MONTHLY',
        taxRules: { vatRatePercent: 18, withholdingTaxPercent: 6 },
        revenueDestination: 'RESELLER_PARTNER_POOL',
        approvalPolicy: 'REQUIRES_OWNER_SIGN_OFF',
        status: 'ACTIVE'
      },
      {
        policyId: 'jrae_pol_hosting',
        serviceName: 'Sovereign Cloud Run Container Hosting & HSM',
        billingType: 'HOSTING_BILLING',
        currency: 'USD',
        rate: 450.00,
        frequency: 'MONTHLY',
        taxRules: { vatRatePercent: 18, withholdingTaxPercent: 0 },
        revenueDestination: 'JUMO_MASTER_TREASURY',
        approvalPolicy: 'AUTOMATIC_EXECUTION',
        status: 'ACTIVE'
      },
      {
        policyId: 'jrae_pol_storage',
        serviceName: 'Encrypted Sovereign Blob & Ledger Storage (Per TB)',
        billingType: 'STORAGE_BILLING',
        currency: 'USD',
        rate: 85.00,
        frequency: 'MONTHLY',
        taxRules: { vatRatePercent: 18, withholdingTaxPercent: 0 },
        revenueDestination: 'JUMO_MASTER_TREASURY',
        approvalPolicy: 'AUTOMATIC_EXECUTION',
        status: 'ACTIVE'
      }
    ];
  }

  public getPolicies(): JraeBillingPolicy[] {
    return this.policies;
  }

  public addPolicy(policy: JraeBillingPolicy): JraeBillingPolicy {
    this.policies.push(policy);
    return policy;
  }

  public updatePolicyStatus(policyId: string, status: 'ACTIVE' | 'PAUSED'): boolean {
    const p = this.policies.find(x => x.policyId === policyId);
    if (p) {
      p.status = status;
      return true;
    }
    return false;
  }
}

export const jumoRevenueEngine = new JumoRevenueAutomationEngine();
export const JRAE = jumoRevenueEngine;

