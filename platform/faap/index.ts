/**
 * FAAP (Financial Accounting & Asset Platform) Core Engine
 */

export interface ChartOfAccount {
  accountNumber: string;
  accountName: string;
  type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
  category: string;
  balanceUSD: number;
  tenantId: string;
}

export interface JournalEntry {
  entryId: string;
  tenantId: string;
  timestamp: string;
  description: string;
  debitAccount: string;
  creditAccount: string;
  amountUSD: number;
  status: 'POSTED' | 'PENDING' | 'REJECTED';
}

export interface Invoice {
  invoiceId: string;
  tenantId: string;
  customerName: string;
  issueDate: string;
  dueDate: string;
  totalAmountUSD: number;
  taxAmountUSD: number;
  status: 'PAID' | 'UNPAID' | 'OVERDUE' | 'CANCELLED';
  lineItems: Array<{ description: string; quantity: number; unitPriceUSD: number }>;
}

export interface AssetRecord {
  assetId: string;
  tenantId: string;
  assetName: string;
  acquisitionCostUSD: number;
  currentValueUSD: number;
  depreciationMethod: 'STRAIGHT_LINE' | 'DECLINING_BALANCE';
  usefulLifeYears: number;
  collateralEligible: boolean;
}

export interface SupplierPurchaseInvoice {
  purchaseId: string;
  tenantId: string;
  supplierName: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  totalAmountUSD: number;
  status: 'APPROVED_SCHED' | 'PENDING_APPROVAL' | 'PAID' | 'DISPUTED';
  approvalWorkflowId?: string;
}

export interface BankReconciliationItem {
  recId: string;
  tenantId: string;
  bankAccountName: string;
  statementBalanceUSD: number;
  ledgerBalanceUSD: number;
  varianceUSD: number;
  lastReconciledDate: string;
  status: 'RECONCILED' | 'UNMATCHED_ITEMS' | 'CRITICAL_VARIANCE';
}

export interface BudgetForecastRecord {
  budgetId: string;
  tenantId: string;
  departmentName: string;
  fiscalYear: string;
  allocatedBudgetUSD: number;
  actualSpendUSD: number;
  projectedSpendUSD: number;
  variancePercentage: number;
  status: 'ON_TRACK' | 'OVER_BUDGET' | 'UNDER_UTILIZED';
}

export interface TaxJurisdictionReport {
  reportId: string;
  tenantId: string;
  jurisdiction: 'EAST_AFRICA_EAC' | 'EUROPEAN_UNION_VAT' | 'UNITED_KINGDOM_HMRC' | 'UNITED_STATES_IRS' | 'GCC_GLOBAL';
  taxPeriod: string;
  taxableRevenueUSD: number;
  taxLiabilityUSD: number;
  status: 'FILED_COMPLIANT' | 'DRAFT_ESTIMATE' | 'PAYMENT_PENDING';
}

export interface PayrollStatutoryRun {
  runId: string;
  tenantId: string;
  payPeriod: string;
  totalEmployees: number;
  grossPayrollUSD: number;
  statutoryDeductionsUSD: number; // PAYE, NSSF, Pension, Medicare
  netDisbursementUSD: number;
  status: 'PROCESSED_PAID' | 'PENDING_APPROVAL';
}

export interface FaapAiRecommendation {
  recId: string;
  tenantId: string;
  category: 'CASH_FLOW_OPTIMIZATION' | 'EXPENSE_ANOMALY' | 'TAX_SAVING' | 'LIQUIDITY_WARNING';
  title: string;
  description: string;
  potentialImpactUSD: number;
  confidenceScore: number;
  timestamp: string;
}


export class FaapFinancialEngine {
  private accounts: ChartOfAccount[] = [
    { accountNumber: '1010', accountName: 'Cash & Treasury Liquidity', type: 'ASSET', category: 'Current Assets', balanceUSD: 24500000, tenantId: 'tenant_finbank_01' },
    { accountNumber: '1100', accountName: 'Accounts Receivable', type: 'ASSET', category: 'Current Assets', balanceUSD: 3800000, tenantId: 'tenant_finbank_01' },
    { accountNumber: '1500', accountName: 'Fixed Institutional Assets', type: 'ASSET', category: 'Non-Current Assets', balanceUSD: 12000000, tenantId: 'tenant_finbank_01' },
    { accountNumber: '2010', accountName: 'Accounts Payable', type: 'LIABILITY', category: 'Current Liabilities', balanceUSD: 1200000, tenantId: 'tenant_finbank_01' },
    { accountNumber: '2200', accountName: 'Treasury Pool Facility Loan', type: 'LIABILITY', category: 'Long-term Liabilities', balanceUSD: 8500000, tenantId: 'tenant_finbank_01' },
    { accountNumber: '3010', accountName: 'Paid-In Capital Equity', type: 'EQUITY', category: 'Equity', balanceUSD: 20000000, tenantId: 'tenant_finbank_01' },
    { accountNumber: '4010', accountName: 'Credit Line Interest Income', type: 'REVENUE', category: 'Operating Revenue', balanceUSD: 11400000, tenantId: 'tenant_finbank_01' },
    { accountNumber: '5010', accountName: 'Platform Processing Expenses', type: 'EXPENSE', category: 'Operating Expenses', balanceUSD: 800000, tenantId: 'tenant_finbank_01' },
  ];

  private journalEntries: JournalEntry[] = [
    {
      entryId: 'je_2026_001',
      tenantId: 'tenant_finbank_01',
      timestamp: '2026-07-24T08:30:00Z',
      description: 'Treasury Pool Facility Drawdown Allocation',
      debitAccount: '1010',
      creditAccount: '2200',
      amountUSD: 500000,
      status: 'POSTED',
    },
    {
      entryId: 'je_2026_002',
      tenantId: 'tenant_finbank_01',
      timestamp: '2026-07-24T09:15:00Z',
      description: 'Interest Revenue Settlement Collection',
      debitAccount: '1010',
      creditAccount: '4010',
      amountUSD: 45000,
      status: 'POSTED',
    },
  ];

  private invoices: Invoice[] = [
    {
      invoiceId: 'inv_2026_101',
      tenantId: 'tenant_finbank_01',
      customerName: 'Kampala Commercial Enterprise',
      issueDate: '2026-07-01',
      dueDate: '2026-08-01',
      totalAmountUSD: 125000,
      taxAmountUSD: 22500,
      status: 'UNPAID',
      lineItems: [
        { description: 'Quarterly Credit Processing Fee', quantity: 1, unitPriceUSD: 100000 },
        { description: 'VAT 18%', quantity: 1, unitPriceUSD: 22500 },
      ],
    },
    {
      invoiceId: 'inv_2026_102',
      tenantId: 'tenant_finbank_01',
      customerName: 'Nairobi Microfinance SACCO',
      issueDate: '2026-07-15',
      dueDate: '2026-07-22',
      totalAmountUSD: 88000,
      taxAmountUSD: 13200,
      status: 'PAID',
      lineItems: [
        { description: 'FAAP Risk Rating Audit', quantity: 1, unitPriceUSD: 74800 },
        { description: 'Regional Tax Levy 15%', quantity: 1, unitPriceUSD: 13200 },
      ],
    },
  ];

  private assets: AssetRecord[] = [
    {
      assetId: 'ast_001',
      tenantId: 'tenant_finbank_01',
      assetName: 'Main Operations Data Center Complex',
      acquisitionCostUSD: 8500000,
      currentValueUSD: 7200000,
      depreciationMethod: 'STRAIGHT_LINE',
      usefulLifeYears: 15,
      collateralEligible: true,
    },
    {
      assetId: 'ast_002',
      tenantId: 'tenant_finbank_01',
      assetName: 'High-Frequency Financial Communication Array',
      acquisitionCostUSD: 1200000,
      currentValueUSD: 950000,
      depreciationMethod: 'DECLINING_BALANCE',
      usefulLifeYears: 5,
      collateralEligible: true,
    },
  ];

  private purchaseInvoices: SupplierPurchaseInvoice[] = [
    { purchaseId: 'ap_2026_01', tenantId: 'tenant_finbank_01', supplierName: 'Sovereign HSM Cloud Infrastructure Ltd', invoiceNumber: 'INV-HSM-991', issueDate: '2026-07-01', dueDate: '2026-07-30', totalAmountUSD: 45000, status: 'APPROVED_SCHED', approvalWorkflowId: 'wf_ap_approve' },
    { purchaseId: 'ap_2026_02', tenantId: 'tenant_sacco_nairobi', supplierName: 'East Africa Fiber Grid & Telecoms', invoiceNumber: 'EAF-2026-88', issueDate: '2026-07-10', dueDate: '2026-08-10', totalAmountUSD: 12500, status: 'PENDING_APPROVAL' },
  ];

  private reconciliations: BankReconciliationItem[] = [
    { recId: 'rec_finbank_01', tenantId: 'tenant_finbank_01', bankAccountName: 'SWIFT Nostro USD Central Clearing Pool', statementBalanceUSD: 24500000, ledgerBalanceUSD: 24500000, varianceUSD: 0, lastReconciledDate: '2026-07-25T06:00:00Z', status: 'RECONCILED' },
    { recId: 'rec_sacco_01', tenantId: 'tenant_sacco_nairobi', bankAccountName: 'M-Pesa Paybill Collection Settlement Pool', statementBalanceUSD: 292307, ledgerBalanceUSD: 292307, varianceUSD: 0, lastReconciledDate: '2026-07-25T08:15:00Z', status: 'RECONCILED' },
  ];

  private budgets: BudgetForecastRecord[] = [
    { budgetId: 'bud_2026_01', tenantId: 'tenant_finbank_01', departmentName: 'Institutional Treasury & Forex Operations', fiscalYear: 'FY2026', allocatedBudgetUSD: 5000000, actualSpendUSD: 2850000, projectedSpendUSD: 4800000, variancePercentage: -4.0, status: 'ON_TRACK' },
    { budgetId: 'bud_2026_02', tenantId: 'tenant_finbank_01', departmentName: 'AI Security & AEGIS Telemetry Infrastructure', fiscalYear: 'FY2026', allocatedBudgetUSD: 1800000, actualSpendUSD: 1720000, projectedSpendUSD: 1950000, variancePercentage: 8.3, status: 'OVER_BUDGET' },
  ];

  private taxReports: TaxJurisdictionReport[] = [
    { reportId: 'tax_eac_01', tenantId: 'tenant_sacco_nairobi', jurisdiction: 'EAST_AFRICA_EAC', taxPeriod: 'Q2 2026', taxableRevenueUSD: 850000, taxLiabilityUSD: 127500, status: 'FILED_COMPLIANT' },
    { reportId: 'tax_eu_01', tenantId: 'tenant_finbank_01', jurisdiction: 'EUROPEAN_UNION_VAT', taxPeriod: 'Q2 2026', taxableRevenueUSD: 14500000, taxLiabilityUSD: 2900000, status: 'FILED_COMPLIANT' },
  ];

  private payrollRuns: PayrollStatutoryRun[] = [
    { runId: 'pay_2026_07', tenantId: 'tenant_finbank_01', payPeriod: 'July 2026', totalEmployees: 450, grossPayrollUSD: 1850000, statutoryDeductionsUSD: 462500, netDisbursementUSD: 1387500, status: 'PROCESSED_PAID' },
    { runId: 'pay_2026_07_s', tenantId: 'tenant_sacco_nairobi', payPeriod: 'July 2026', totalEmployees: 120, grossPayrollUSD: 380000, statutoryDeductionsUSD: 76000, netDisbursementUSD: 304000, status: 'PROCESSED_PAID' },
  ];

  private aiRecommendations: FaapAiRecommendation[] = [
    { recId: 'rec_ai_01', tenantId: 'tenant_finbank_01', category: 'CASH_FLOW_OPTIMIZATION', title: 'Automate Sweep into High-Yield Overnight SWIFT Repo', description: 'Surplus liquidity in account 1010 ($24.5M) exceeds working capital threshold by $8M. Sweeping to overnight treasury repo will yield ~$42,000 extra monthly interest.', potentialImpactUSD: 42000, confidenceScore: 0.98, timestamp: '2026-07-25T09:00:00Z' },
    { recId: 'rec_ai_02', tenantId: 'tenant_finbank_01', category: 'EXPENSE_ANOMALY', title: 'Duplicate Vendor Billing Signature Detected', description: 'Two purchase invoices from telecom vendor match exact timestamp and amount ($12,500). AEGIS quarantine rule prevented double disbursement.', potentialImpactUSD: 12500, confidenceScore: 0.99, timestamp: '2026-07-24T14:20:00Z' },
    { recId: 'rec_ai_03', tenantId: 'tenant_sacco_nairobi', category: 'TAX_SAVING', title: 'EAC Digital Cooperative Tax Rebate Eligibility', description: 'Recent amendments to East Africa SACCO regulatory framework allow a 15% tax credit offset for digital rural inclusion investments.', potentialImpactUSD: 35000, confidenceScore: 0.94, timestamp: '2026-07-23T11:10:00Z' },
  ];

  public getPurchaseInvoices(tenantId?: string): SupplierPurchaseInvoice[] {
    if (!tenantId) return this.purchaseInvoices;
    return this.purchaseInvoices.filter((p) => p.tenantId === tenantId);
  }

  public getBankReconciliations(tenantId?: string): BankReconciliationItem[] {
    if (!tenantId) return this.reconciliations;
    return this.reconciliations.filter((r) => r.tenantId === tenantId);
  }

  public getBudgetForecasts(tenantId?: string): BudgetForecastRecord[] {
    if (!tenantId) return this.budgets;
    return this.budgets.filter((b) => b.tenantId === tenantId);
  }

  public getTaxReports(tenantId?: string): TaxJurisdictionReport[] {
    if (!tenantId) return this.taxReports;
    return this.taxReports.filter((t) => t.tenantId === tenantId);
  }

  public getPayrollRuns(tenantId?: string): PayrollStatutoryRun[] {
    if (!tenantId) return this.payrollRuns;
    return this.payrollRuns.filter((p) => p.tenantId === tenantId);
  }

  public getAiRecommendations(tenantId?: string): FaapAiRecommendation[] {
    if (!tenantId) return this.aiRecommendations;
    return this.aiRecommendations.filter((a) => a.tenantId === tenantId);
  }

  public getChartOfAccounts(tenantId?: string): ChartOfAccount[] {
    if (!tenantId) return this.accounts;
    return this.accounts.filter((acc) => acc.tenantId === tenantId);
  }

  public getJournalEntries(tenantId?: string): JournalEntry[] {
    if (!tenantId) return this.journalEntries;
    return this.journalEntries.filter((e) => e.tenantId === tenantId);
  }

  public getInvoices(tenantId?: string): Invoice[] {
    if (!tenantId) return this.invoices;
    return this.invoices.filter((inv) => inv.tenantId === tenantId);
  }

  public getAssets(tenantId?: string): AssetRecord[] {
    if (!tenantId) return this.assets;
    return this.assets.filter((a) => a.tenantId === tenantId);
  }

  public postJournalEntry(entry: Omit<JournalEntry, 'entryId' | 'timestamp' | 'status'>): JournalEntry {
    const newEntry: JournalEntry = {
      ...entry,
      entryId: `je_2026_${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toISOString(),
      status: 'POSTED',
    };
    this.journalEntries.unshift(newEntry);

    // Update account balances using precise double-entry accounting rules
    const debitAcc = this.accounts.find((a) => a.accountNumber === entry.debitAccount);
    const creditAcc = this.accounts.find((a) => a.accountNumber === entry.creditAccount);

    if (debitAcc) {
      if (debitAcc.type === 'ASSET' || debitAcc.type === 'EXPENSE') {
        debitAcc.balanceUSD += entry.amountUSD;
      } else {
        debitAcc.balanceUSD -= entry.amountUSD;
      }
    }

    if (creditAcc) {
      if (creditAcc.type === 'ASSET' || creditAcc.type === 'EXPENSE') {
        creditAcc.balanceUSD -= entry.amountUSD;
      } else {
        creditAcc.balanceUSD += entry.amountUSD;
      }
    }

    return newEntry;
  }

  public generateFinancialSummary(tenantId?: string) {
    const accs = this.getChartOfAccounts(tenantId);
    const totalAssets = accs.filter((a) => a.type === 'ASSET').reduce((sum, a) => sum + a.balanceUSD, 0);
    const totalLiabilities = accs.filter((a) => a.type === 'LIABILITY').reduce((sum, a) => sum + a.balanceUSD, 0);
    const totalEquity = accs.filter((a) => a.type === 'EQUITY').reduce((sum, a) => sum + a.balanceUSD, 0);
    const totalRevenues = accs.filter((a) => a.type === 'REVENUE').reduce((sum, a) => sum + a.balanceUSD, 0);
    const totalExpenses = accs.filter((a) => a.type === 'EXPENSE').reduce((sum, a) => sum + a.balanceUSD, 0);
    const netIncome = totalRevenues - totalExpenses;

    return {
      totalAssetsUSD: totalAssets,
      totalLiabilitiesUSD: totalLiabilities,
      totalEquityUSD: totalEquity,
      totalRevenuesUSD: totalRevenues,
      totalExpensesUSD: totalExpenses,
      netIncomeUSD: netIncome,
      balanceSheetBalanced: totalAssets === totalLiabilities + totalEquity + netIncome,
    };
  }
}

export const faapEngine = new FaapFinancialEngine();

/**
 * Phase 27.4 — JUMO Global Currency Engine
 * Multi-Currency Layer supporting USD, EUR, GBP, UGX, KES, TZS, NGN, ZAR with FX gain/loss and international settlement.
 */
export type GlobalCurrencyCode = 'USD' | 'EUR' | 'GBP' | 'UGX' | 'KES' | 'TZS' | 'NGN' | 'ZAR';

export interface CurrencyRateConfig {
  code: GlobalCurrencyCode;
  name: string;
  rateToUSD: number;
  symbol: string;
  isBaseCurrency: boolean;
  fxGainLossUSD: number;
}

export class JumoGlobalCurrencyEngine {
  private currencies: Record<GlobalCurrencyCode, CurrencyRateConfig> = {
    USD: { code: 'USD', name: 'US Dollar', rateToUSD: 1.0, symbol: '$', isBaseCurrency: true, fxGainLossUSD: 0 },
    EUR: { code: 'EUR', name: 'Euro', rateToUSD: 1.09, symbol: '€', isBaseCurrency: false, fxGainLossUSD: 420.50 },
    GBP: { code: 'GBP', name: 'British Pound Sterling', rateToUSD: 1.29, symbol: '£', isBaseCurrency: false, fxGainLossUSD: 150.00 },
    UGX: { code: 'UGX', name: 'Uganda Shilling', rateToUSD: 0.00027, symbol: 'USh', isBaseCurrency: false, fxGainLossUSD: -85.20 },
    KES: { code: 'KES', name: 'Kenya Shilling', rateToUSD: 0.0077, symbol: 'KSh', isBaseCurrency: false, fxGainLossUSD: 310.00 },
    TZS: { code: 'TZS', name: 'Tanzanian Shilling', rateToUSD: 0.00038, symbol: 'TSh', isBaseCurrency: false, fxGainLossUSD: 12.40 },
    NGN: { code: 'NGN', name: 'Nigerian Naira', rateToUSD: 0.00062, symbol: '₦', isBaseCurrency: false, fxGainLossUSD: -450.00 },
    ZAR: { code: 'ZAR', name: 'South African Rand', rateToUSD: 0.055, symbol: 'R', isBaseCurrency: false, fxGainLossUSD: 89.00 },
  };

  public getCurrencies(): CurrencyRateConfig[] {
    return Object.values(this.currencies);
  }

  public convert(amount: number, from: GlobalCurrencyCode, to: GlobalCurrencyCode): { amount: number; rateUsed: number; fxGainLossUSD: number } {
    const fromRate = this.currencies[from]?.rateToUSD || 1.0;
    const toRate = this.currencies[to]?.rateToUSD || 1.0;
    const amountUSD = amount * fromRate;
    const converted = Number((amountUSD / toRate).toFixed(2));
    const fxGainLoss = this.currencies[from]?.fxGainLossUSD || 0;
    return { amount: converted, rateUsed: Number((fromRate / toRate).toFixed(6)), fxGainLossUSD: fxGainLoss };
  }

  public updateRate(code: GlobalCurrencyCode, newRateToUSD: number): void {
    if (this.currencies[code] && !this.currencies[code].isBaseCurrency) {
      this.currencies[code].rateToUSD = newRateToUSD;
    }
  }
}

export const globalCurrencyEngine = new JumoGlobalCurrencyEngine();

/**
 * Phase 27.5 — JUMO Office Intelligence Suite
 * Microsoft Office Style Enterprise Productivity Layer integrated with FAAP.
 * Applications: JUMO Sheets, JUMO Docs, JUMO Slides, JUMO Mail, JUMO Calendar.
 */
export interface JumoOfficeDocument {
  docId: string;
  appType: 'JUMO_SHEETS' | 'JUMO_DOCS' | 'JUMO_SLIDES' | 'JUMO_MAIL' | 'JUMO_CALENDAR';
  title: string;
  description: string;
  formatCompatibility: string; // e.g. "Microsoft Excel (.xlsx) Compatible", "Word (.docx)"
  lastUpdated: string;
  sizeBytes: number;
}

export class JumoOfficeIntelligenceSuite {
  private documents: JumoOfficeDocument[] = [
    { docId: 'sheet_01', appType: 'JUMO_SHEETS', title: 'Q3 Enterprise Consolidated Ledger & FX Matrix', description: 'Financial spreadsheets with live 8-currency formula links to FAAP General Ledger.', formatCompatibility: 'Microsoft Excel (.xlsx) Compatible', lastUpdated: new Date().toISOString(), sizeBytes: 1420000 },
    { docId: 'doc_01', appType: 'JUMO_DOCS', title: 'Sovereign Institutional Syndicated Loan Agreement', description: 'Smart contract and commercial lending term sheet generated from FINTECH lending origination.', formatCompatibility: 'Microsoft Word (.docx) Compatible', lastUpdated: new Date().toISOString(), sizeBytes: 850000 },
    { docId: 'slide_01', appType: 'JUMO_SLIDES', title: 'Board of Directors Q3 Executive Financial Deck', description: 'Executive presentation deck auto-generated by AEGIS Executive Intelligence and FAAP AR/AP.', formatCompatibility: 'Microsoft PowerPoint (.pptx) Compatible', lastUpdated: new Date().toISOString(), sizeBytes: 3400000 },
    { docId: 'mail_01', appType: 'JUMO_MAIL', title: 'Automated Invoice Dispatch & Payment Notice #INV-9021', description: 'Outlook-style enterprise communication channel with cryptographically verified attachments.', formatCompatibility: 'Microsoft Outlook (.eml) Compatible', lastUpdated: new Date().toISOString(), sizeBytes: 120000 },
    { docId: 'cal_01', appType: 'JUMO_CALENDAR', title: 'Statutory VAT Filing & Payroll Run Schedule', description: 'Integrated enterprise schedule linking tax deadlines and salary disbursements to workflow engines.', formatCompatibility: 'iCalendar (.ics) Compatible', lastUpdated: new Date().toISOString(), sizeBytes: 45000 }
  ];

  public getDocuments(appType?: JumoOfficeDocument['appType']): JumoOfficeDocument[] {
    if (appType) return this.documents.filter(d => d.appType === appType);
    return this.documents;
  }

  public generateDocument(appType: JumoOfficeDocument['appType'], title: string, description: string): JumoOfficeDocument {
    const doc: JumoOfficeDocument = {
      docId: `doc_${Date.now()}_${Math.floor(Math.random() * 900 + 100)}`,
      appType,
      title,
      description,
      formatCompatibility: appType === 'JUMO_SHEETS' ? 'Microsoft Excel (.xlsx) Compatible' : appType === 'JUMO_DOCS' ? 'Microsoft Word (.docx) Compatible' : appType === 'JUMO_SLIDES' ? 'Microsoft PowerPoint (.pptx) Compatible' : appType === 'JUMO_MAIL' ? 'Microsoft Outlook (.eml) Compatible' : 'iCalendar (.ics) Compatible',
      lastUpdated: new Date().toISOString(),
      sizeBytes: Math.floor(Math.random() * 2000000 + 500000)
    };
    this.documents.unshift(doc);
    return doc;
  }
}

export const jumoOfficeSuite = new JumoOfficeIntelligenceSuite();

