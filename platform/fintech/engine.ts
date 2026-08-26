/**
 * JUMO FINTECH Phase 27 — Independent Commercial Banking, Payments Switch & Lending Domain Engine
 * Standardized payment rails, mobile money gateway, lending underwriting, and compliance KYC/AML.
 */

import { faapEngine } from '../faap';
import { universalTreasuryRouter } from '../treasury';
import { platformEventBus } from '../event-bus';

export interface FintechBankAccount {
  accountId: string;
  tenantId: string;
  accountNumber: string;
  accountHolderName: string;
  accountType: 'COMMERCIAL_CHECKING' | 'INSTITUTIONAL_DEPOSIT' | 'ESCROW_SETTLEMENT' | 'TREASURY_NOSTRO';
  currency: 'USD' | 'EUR' | 'GBP' | 'KES' | 'UGX' | 'TZS';
  balance: number;
  availableCreditLimitUSD: number;
  status: 'ACTIVE' | 'FROZEN_AML' | 'PENDING_KYC';
  kycVerificationLevel: 'LEVEL_1_BASIC' | 'LEVEL_3_ENHANCED' | 'LEVEL_5_INSTITUTIONAL';
}

export interface FintechPaymentTransaction {
  transactionId: string;
  tenantId: string;
  senderAccountId: string;
  recipientAccountId: string;
  recipientName: string;
  amount: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'KES' | 'UGX' | 'TZS';
  settledAmountUSD: number;
  paymentMethod: 'MOBILE_MONEY_MPESA' | 'MOBILE_MONEY_MTN' | 'BANK_SWIFT' | 'CARD_VISA_MC' | 'INSTITUTIONAL_TRANSFER';
  purposeCode: 'PAYROLL' | 'SUPPLIER_INVOICE' | 'TUITION_FEE' | 'DIVIDEND_PAYOUT' | 'TAX_SETTLEMENT' | 'TREASURY_SWAP';
  amlStatus: 'PASSED' | 'FLAGGED_MANUAL_REVIEW' | 'REJECTED_SANCTION';
  status: 'COMPLETED' | 'PENDING_CLEARING' | 'FAILED';
  timestamp: string;
}

export interface FintechLoanApplication {
  loanId: string;
  tenantId: string;
  applicantName: string;
  requestedAmountUSD: number;
  purpose: string;
  termMonths: number;
  faapCreditScore: number;
  interestRatePercentage: number;
  monthlyPaymentUSD: number;
  status: 'APPROVED_AUTO' | 'UNDER_REVIEW' | 'ACTIVE_DISBURSED' | 'REJECTED';
  applicationDate: string;
}

export class FintechCommercialEngine {
  private bankAccounts: FintechBankAccount[] = [
    {
      accountId: 'acc_finbank_main',
      tenantId: 'tenant_finbank_01',
      accountNumber: '100-8849-2001',
      accountHolderName: 'FinBank Global Commercial Services',
      accountType: 'COMMERCIAL_CHECKING',
      currency: 'USD',
      balance: 14500000,
      availableCreditLimitUSD: 5000000,
      status: 'ACTIVE',
      kycVerificationLevel: 'LEVEL_5_INSTITUTIONAL',
    },
    {
      accountId: 'acc_sacco_main',
      tenantId: 'tenant_sacco_nairobi',
      accountNumber: '200-4419-8002',
      accountHolderName: 'Nairobi Teachers & Microfinance SACCO',
      accountType: 'INSTITUTIONAL_DEPOSIT',
      currency: 'KES',
      balance: 380000000,
      availableCreditLimitUSD: 1000000,
      status: 'ACTIVE',
      kycVerificationLevel: 'LEVEL_5_INSTITUTIONAL',
    },
    {
      accountId: 'acc_kampala_univ',
      tenantId: 'tenant_kampala_univ',
      accountNumber: '300-9921-5003',
      accountHolderName: 'Kampala International University Foundation',
      accountType: 'COMMERCIAL_CHECKING',
      currency: 'UGX',
      balance: 1500000000,
      availableCreditLimitUSD: 500000,
      status: 'ACTIVE',
      kycVerificationLevel: 'LEVEL_3_ENHANCED',
    },
  ];

  private transactions: FintechPaymentTransaction[] = [
    {
      transactionId: 'ft_tx_9001',
      tenantId: 'tenant_finbank_01',
      senderAccountId: 'acc_finbank_main',
      recipientAccountId: 'acc_sacco_main',
      recipientName: 'Nairobi Teachers & Microfinance SACCO',
      amount: 50000,
      currency: 'USD',
      settledAmountUSD: 50000,
      paymentMethod: 'BANK_SWIFT',
      purposeCode: 'TREASURY_SWAP',
      amlStatus: 'PASSED',
      status: 'COMPLETED',
      timestamp: '2026-07-24T10:15:00Z',
    },
    {
      transactionId: 'ft_tx_9002',
      tenantId: 'tenant_sacco_nairobi',
      senderAccountId: 'acc_sacco_main',
      recipientAccountId: 'ext_mpesa_001',
      recipientName: 'Julius Moses Okwii (Member Dividend Payout)',
      amount: 150000,
      currency: 'KES',
      settledAmountUSD: 1155,
      paymentMethod: 'MOBILE_MONEY_MPESA',
      purposeCode: 'DIVIDEND_PAYOUT',
      amlStatus: 'PASSED',
      status: 'COMPLETED',
      timestamp: '2026-07-25T08:30:00Z',
    },
  ];

  private loans: FintechLoanApplication[] = [
    {
      loanId: 'loan_2026_01',
      tenantId: 'tenant_sacco_nairobi',
      applicantName: 'Nairobi Teachers Cooperative Expansion Facility',
      requestedAmountUSD: 450000,
      purpose: 'Branch Microfinance Lending Liquidity Pool',
      termMonths: 36,
      faapCreditScore: 785,
      interestRatePercentage: 8.5,
      monthlyPaymentUSD: 14205,
      status: 'ACTIVE_DISBURSED',
      applicationDate: '2026-07-10',
    },
  ];

  public getAccounts(tenantId?: string): FintechBankAccount[] {
    if (!tenantId) return this.bankAccounts;
    return this.bankAccounts.filter((a) => a.tenantId === tenantId);
  }

  public getTransactions(tenantId?: string): FintechPaymentTransaction[] {
    if (!tenantId) return this.transactions;
    return this.transactions.filter((t) => t.tenantId === tenantId);
  }

  public getLoans(tenantId?: string): FintechLoanApplication[] {
    if (!tenantId) return this.loans;
    return this.loans.filter((l) => l.tenantId === tenantId);
  }

  public executePayment(request: {
    tenantId: string;
    senderAccountId: string;
    recipientAccountId: string;
    recipientName: string;
    amount: number;
    currency: 'USD' | 'EUR' | 'GBP' | 'KES' | 'UGX' | 'TZS';
    paymentMethod: 'MOBILE_MONEY_MPESA' | 'MOBILE_MONEY_MTN' | 'BANK_SWIFT' | 'CARD_VISA_MC' | 'INSTITUTIONAL_TRANSFER';
    purposeCode: 'PAYROLL' | 'SUPPLIER_INVOICE' | 'TUITION_FEE' | 'DIVIDEND_PAYOUT' | 'TAX_SETTLEMENT' | 'TREASURY_SWAP';
  }): FintechPaymentTransaction {
    const settledUSD = universalTreasuryRouter.convertAmount(request.amount, request.currency, 'USD');

    // AML & Sanctions Check Simulation
    const amlStatus: 'PASSED' | 'FLAGGED_MANUAL_REVIEW' = settledUSD > 500000 ? 'FLAGGED_MANUAL_REVIEW' : 'PASSED';

    const tx: FintechPaymentTransaction = {
      transactionId: `ft_tx_${Date.now()}_${Math.floor(Math.random() * 900 + 100)}`,
      tenantId: request.tenantId,
      senderAccountId: request.senderAccountId,
      recipientAccountId: request.recipientAccountId,
      recipientName: request.recipientName,
      amount: request.amount,
      currency: request.currency,
      settledAmountUSD: settledUSD,
      paymentMethod: request.paymentMethod,
      purposeCode: request.purposeCode,
      amlStatus,
      status: amlStatus === 'PASSED' ? 'COMPLETED' : 'PENDING_CLEARING',
      timestamp: new Date().toISOString(),
    };

    if (amlStatus === 'PASSED') {
      const senderAcc = this.bankAccounts.find((a) => a.accountId === request.senderAccountId);
      if (senderAcc) {
        senderAcc.balance -= request.amount;
      }
    }

    this.transactions.unshift(tx);

    // Also route transaction fee through JUMO Universal Treasury Router
    const feeAmount = Number((request.amount * 0.005).toFixed(2)); // 0.5% transaction switch fee
    if (feeAmount > 0) {
      universalTreasuryRouter.routeCustomerPayment({
        sourceDomainId: 'engine_fintech_switch',
        tenantId: request.tenantId,
        channel: 'API_USAGE',
        rawAmount: feeAmount,
        currency: request.currency,
        paymentGateway: 'SWIFT_INSTITUTIONAL',
        description: `FINTECH Switch Fee for TX ${tx.transactionId}`,
      });
    }

    return tx;
  }

  public underwriteLoan(request: {
    tenantId: string;
    applicantName: string;
    requestedAmountUSD: number;
    purpose: string;
    termMonths: number;
    faapCreditScore: number;
  }): FintechLoanApplication {
    // Interest rate determination based on FAAP credit score
    let rate = 12.5;
    if (request.faapCreditScore >= 780) rate = 7.5;
    else if (request.faapCreditScore >= 720) rate = 9.5;
    else if (request.faapCreditScore >= 680) rate = 11.0;

    const monthlyInterest = rate / 100 / 12;
    const monthlyPayment = Number(((request.requestedAmountUSD * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -request.termMonths))).toFixed(2));

    const status = request.faapCreditScore >= 720 ? 'APPROVED_AUTO' : 'UNDER_REVIEW';

    const loan: FintechLoanApplication = {
      loanId: `loan_${Date.now()}_${Math.floor(10 + Math.random() * 90)}`,
      tenantId: request.tenantId,
      applicantName: request.applicantName,
      requestedAmountUSD: request.requestedAmountUSD,
      purpose: request.purpose,
      termMonths: request.termMonths,
      faapCreditScore: request.faapCreditScore,
      interestRatePercentage: rate,
      monthlyPaymentUSD: monthlyPayment,
      status,
      applicationDate: new Date().toISOString().split('T')[0],
    };

    this.loans.unshift(loan);
    return loan;
  }

  public getFintechMetrics() {
    const totalDepositsUSD = this.bankAccounts.reduce((acc, a) => acc + (a.currency === 'USD' ? a.balance : universalTreasuryRouter.convertAmount(a.balance, a.currency, 'USD')), 0);
    const totalTransactionsUSD = this.transactions.reduce((acc, t) => acc + t.settledAmountUSD, 0);
    const activeLoansUSD = this.loans.filter((l) => l.status === 'ACTIVE_DISBURSED').reduce((acc, l) => acc + l.requestedAmountUSD, 0);

    return {
      totalDepositsUSD,
      totalTransactionsUSD,
      activeLoansUSD,
      accountsCount: this.bankAccounts.length,
      transactionsCount: this.transactions.length,
      loansCount: this.loans.length,
    };
  }
}

export const fintechEngine = new FintechCommercialEngine();

/**
 * Phase 27.5 — JUMO FINTECH OS
 * Standalone installable commercial domain with 6 sovereign layers:
 * Identity, Payment, Banking, Lending, Merchant, and Central Bank Layer.
 */
export interface FintechOsLayerStatus {
  layerName: 'IDENTITY_LAYER' | 'PAYMENT_LAYER' | 'BANKING_LAYER' | 'LENDING_LAYER' | 'MERCHANT_LAYER' | 'CENTRAL_BANK_LAYER';
  title: string;
  description: string;
  capabilities: string[];
  status: 'OPERATIONAL' | 'STANDBY' | 'CBDC_READY';
  activeNodes: number;
}

export class JumoFintechOperatingSystem {
  private layers: FintechOsLayerStatus[] = [
    {
      layerName: 'IDENTITY_LAYER',
      title: 'Sovereign Digital Identity & Wallets',
      description: 'Digital wallets, customer identity verification, and tiered institutional KYC/AML.',
      capabilities: ['Biometric & Digital Wallets', 'Tier 1-5 Institutional KYC', 'AML Sanctions Screening'],
      status: 'OPERATIONAL',
      activeNodes: 1420
    },
    {
      layerName: 'PAYMENT_LAYER',
      title: 'Universal Multi-Rail Payment Gateway',
      description: 'Unified switch for mobile money, international cards, bank transfers, and cross-border settlement.',
      capabilities: ['Mobile Money (M-Pesa, MTN, Airtel)', 'Visa/Mastercard Commercial Switch', 'SWIFT Institutional ISO 20022'],
      status: 'OPERATIONAL',
      activeNodes: 890
    },
    {
      layerName: 'BANKING_LAYER',
      title: 'Core Commercial Banking & Settlement',
      description: 'Digital checking accounts, multi-currency wallets, and automated treasury clearing.',
      capabilities: ['Commercial Checking & Nostro', 'Escrow & Margin Settlement', 'Real-time Liquidity Pooling'],
      status: 'OPERATIONAL',
      activeNodes: 310
    },
    {
      layerName: 'LENDING_LAYER',
      title: 'AI Credit Origination & Syndication',
      description: 'Automated underwriting using FAAP credit scoring, loan origination, and smart repayment tracking.',
      capabilities: ['AI Algorithmic Credit Scoring', 'Syndicated Institutional Loans', 'Automated Payroll Deduction Repayments'],
      status: 'OPERATIONAL',
      activeNodes: 185
    },
    {
      layerName: 'MERCHANT_LAYER',
      title: 'Omnichannel Merchant & Terminal Switch',
      description: 'Merchant acquiring accounts, dynamic QR payments, and physical/virtual payment terminals.',
      capabilities: ['Dynamic EMV QR Code Payments', 'Virtual & POS Terminal Acquirers', 'Instant Merchant Daily Settlement'],
      status: 'OPERATIONAL',
      activeNodes: 4200
    },
    {
      layerName: 'CENTRAL_BANK_LAYER',
      title: 'Sovereign Regulatory & CBDC Switch',
      description: 'Central Bank Digital Currency (CBDC) readiness, statutory reserve calculation, and real-time regulatory compliance reporting.',
      capabilities: ['CBDC Interoperability Gateway', 'Real-time RTGS Liquidity Monitoring', 'Automated Statutory Tax & Reserve Reporting'],
      status: 'CBDC_READY',
      activeNodes: 12
    }
  ];

  public getLayers(): FintechOsLayerStatus[] {
    return this.layers;
  }
}

export const jumoFintechOS = new JumoFintechOperatingSystem();

