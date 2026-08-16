import type {
  Account,
  AuditEvent,
  Budget,
  Currency,
  Invoice,
  InvoiceLine,
  JournalEntry,
  JournalLine,
  Payment,
  ReconciliationRecord,
} from "./faapEnterpriseTypes";

export class FAAPEnterpriseEngine {
  private static instance: FAAPEnterpriseEngine;

  public static getInstance(): FAAPEnterpriseEngine {
    if (!FAAPEnterpriseEngine.instance) {
      FAAPEnterpriseEngine.instance = new FAAPEnterpriseEngine();
    }
    return FAAPEnterpriseEngine.instance;
  }

  private accounts = new Map<string, Account>();
  private journals = new Map<string, JournalEntry>();
  private invoices = new Map<string, Invoice>();
  private payments = new Map<string, Payment>();
  private budgets = new Map<string, Budget>();
  private reconciliations = new Map<string, ReconciliationRecord>();
  private audit: AuditEvent[] = [];

  private currencies: Currency[] = [
    { code: "UGX", name: "Ugandan Shilling", symbol: "UGX", decimalPlaces: 0 },
    { code: "USD", name: "US Dollar", symbol: "$", decimalPlaces: 2 },
    { code: "EUR", name: "Euro", symbol: "€", decimalPlaces: 2 },
    { code: "GBP", name: "British Pound", symbol: "£", decimalPlaces: 2 },
    { code: "KES", name: "Kenyan Shilling", symbol: "KES", decimalPlaces: 2 },
  ];

  constructor() {
    this.seedChartOfAccounts();
  }

  private seedChartOfAccounts() {
    const accounts: Account[] = [
      ["1000", "Cash & Bank", "asset"],
      ["1100", "Accounts Receivable", "asset"],
      ["1200", "Inventory", "asset"],
      ["2000", "Accounts Payable", "liability"],
      ["2100", "Taxes Payable", "liability"],
      ["3000", "Owner / Shareholder Equity", "equity"],
      ["4000", "Revenue", "revenue"],
      ["4100", "Other Income", "revenue"],
      ["5000", "Cost of Sales", "expense"],
      ["6000", "Operating Expenses", "expense"],
      ["6100", "Payroll Expense", "expense"],
      ["6200", "Technology Expense", "expense"],
      ["6300", "Administrative Expense", "expense"],
    ].map(([code, name, type]) => ({
      id: `acct-${code}`,
      code,
      name,
      type: type as Account["type"],
      active: true,
      balance: 0,
    }));

    accounts.forEach(account => this.accounts.set(account.id, account));
  }

  getAccounts() {
    return Array.from(this.accounts.values());
  }

  getCurrencies() {
    return [...this.currencies];
  }

  getJournals() {
    return Array.from(this.journals.values());
  }

  getInvoices() {
    return Array.from(this.invoices.values());
  }

  getPayments() {
    return Array.from(this.payments.values());
  }

  getAuditTrail() {
    return [...this.audit];
  }

  createJournal(
    reference: string,
    description: string,
    source: string,
    lines: JournalLine[],
  ): JournalEntry {
    const debit = lines.reduce((sum, line) => sum + line.debit, 0);
    const credit = lines.reduce((sum, line) => sum + line.credit, 0);

    if (Math.abs(debit - credit) > 0.000001) {
      throw new Error("FAAP validation failed: journal is not balanced.");
    }

    const journal: JournalEntry = {
      id: `je-${Date.now()}`,
      reference,
      date: new Date().toISOString().slice(0, 10),
      description,
      source,
      status: "draft",
      lines,
      createdAt: new Date().toISOString(),
    };

    this.journals.set(journal.id, journal);

    this.recordAudit(
      "system",
      "CREATE_JOURNAL",
      "journal",
      journal.id,
      description,
    );

    return journal;
  }

  postJournal(id: string) {
    const journal = this.journals.get(id);

    if (!journal) {
      throw new Error(`Journal ${id} was not found.`);
    }

    if (journal.status === "posted") {
      return journal;
    }

    journal.lines.forEach(line => {
      const account = this.accounts.get(line.accountId);

      if (!account) {
        throw new Error(`Account ${line.accountId} was not found.`);
      }

      account.balance += line.debit - line.credit;
    });

    journal.status = "posted";
    journal.postedAt = new Date().toISOString();

    this.recordAudit(
      "system",
      "POST_JOURNAL",
      "journal",
      journal.id,
      journal.reference,
    );

    return journal;
  }

  createInvoice(
    customerId: string,
    currency: string,
    issueDate: string,
    dueDate: string,
    lines: InvoiceLine[],
  ): Invoice {
    const subtotal = lines.reduce(
      (sum, line) => sum + line.quantity * line.unitPrice,
      0,
    );

    const tax = lines.reduce(
      (sum, line) =>
        sum +
        line.quantity *
          line.unitPrice *
          (line.taxRate / 100),
      0,
    );

    const invoice: Invoice = {
      id: `inv-${Date.now()}`,
      number: `INV-${new Date().getFullYear()}-${String(
        this.invoices.size + 1,
      ).padStart(6, "0")}`,
      customerId,
      issueDate,
      dueDate,
      currency,
      status: "issued",
      lines,
      subtotal,
      tax,
      total: subtotal + tax,
      amountPaid: 0,
      balanceDue: subtotal + tax,
    };

    this.invoices.set(invoice.id, invoice);

    this.recordAudit(
      "system",
      "CREATE_INVOICE",
      "invoice",
      invoice.id,
      invoice.number,
    );

    return invoice;
  }

  recordPayment(
    amount: number,
    currency: string,
    method: string,
    source: string,
    payerId?: string,
  ): Payment {
    const payment: Payment = {
      id: `pay-${Date.now()}`,
      reference: `PAY-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      payerId,
      amount,
      currency,
      method,
      source,
      status: "settled",
    };

    this.payments.set(payment.id, payment);

    this.recordAudit(
      "system",
      "RECORD_PAYMENT",
      "payment",
      payment.id,
      payment.reference,
    );

    return payment;
  }

  createBudget(
    name: string,
    fiscalYear: string,
    currency: string,
  ): Budget {
    const budget: Budget = {
      id: `budget-${Date.now()}`,
      name,
      fiscalYear,
      currency,
      lines: [],
    };

    this.budgets.set(budget.id, budget);

    this.recordAudit(
      "system",
      "CREATE_BUDGET",
      "budget",
      budget.id,
      name,
    );

    return budget;
  }

  reconcile(
    accountId: string,
    statementDate: string,
    statementBalance: number,
  ): ReconciliationRecord {
    const account = this.accounts.get(accountId);

    if (!account) {
      throw new Error(`Account ${accountId} was not found.`);
    }

    const record: ReconciliationRecord = {
      id: `recon-${Date.now()}`,
      accountId,
      statementDate,
      statementBalance,
      ledgerBalance: account.balance,
      difference: statementBalance - account.balance,
      status:
        Math.abs(statementBalance - account.balance) < 0.000001
          ? "matched"
          : "exception",
    };

    this.reconciliations.set(record.id, record);

    this.recordAudit(
      "system",
      "BANK_RECONCILIATION",
      "reconciliation",
      record.id,
      record.status,
    );

    return record;
  }

  getFinancialSummary() {
    const accounts = this.getAccounts();

    const assets = accounts
      .filter(a => a.type === "asset")
      .reduce((sum, a) => sum + a.balance, 0);

    const liabilities = accounts
      .filter(a => a.type === "liability")
      .reduce((sum, a) => sum + a.balance, 0);

    const equity = accounts
      .filter(a => a.type === "equity")
      .reduce((sum, a) => sum + a.balance, 0);

    const revenue = accounts
      .filter(a => a.type === "revenue")
      .reduce((sum, a) => sum + a.balance, 0);

    const expenses = accounts
      .filter(a => a.type === "expense")
      .reduce((sum, a) => sum + a.balance, 0);

    return {
      assets,
      liabilities,
      equity,
      revenue,
      expenses,
      netIncome: revenue - expenses,
      accountingEquationDifference:
        assets - (liabilities + equity + revenue - expenses),
      invoicesOutstanding: Array.from(this.invoices.values())
        .filter(i => i.balanceDue > 0)
        .reduce((sum, i) => sum + i.balanceDue, 0),
    };
  }

  exportExcelCompatible(): string {
    const summary = this.getFinancialSummary();

    return [
      "JUMO FAAP ENTERPRISE FINANCIAL EXPORT",
      "",
      "Metric,Amount",
      `Assets,${summary.assets}`,
      `Liabilities,${summary.liabilities}`,
      `Equity,${summary.equity}`,
      `Revenue,${summary.revenue}`,
      `Expenses,${summary.expenses}`,
      `Net Income,${summary.netIncome}`,
      `Outstanding Invoices,${summary.invoicesOutstanding}`,
    ].join("\n");
  }

  exportWordCompatible(): string {
    const summary = this.getFinancialSummary();

    return `
      <html>
        <head>
          <meta charset="utf-8" />
          <title>JUMO FAAP Financial Report</title>
        </head>
        <body>
          <h1>JUMO FAAP Enterprise Financial Report</h1>
          <p>Generated automatically by JUMO UEOS.</p>
          <table border="1" cellpadding="8">
            <tr><th>Metric</th><th>Amount</th></tr>
            <tr><td>Assets</td><td>${summary.assets}</td></tr>
            <tr><td>Liabilities</td><td>${summary.liabilities}</td></tr>
            <tr><td>Equity</td><td>${summary.equity}</td></tr>
            <tr><td>Revenue</td><td>${summary.revenue}</td></tr>
            <tr><td>Expenses</td><td>${summary.expenses}</td></tr>
            <tr><td>Net Income</td><td>${summary.netIncome}</td></tr>
            <tr><td>Outstanding Invoices</td><td>${summary.invoicesOutstanding}</td></tr>
          </table>
        </body>
      </html>
    `;
  }

  private recordAudit(
    actor: string,
    action: string,
    entityType: string,
    entityId: string,
    details: string,
  ) {
    this.audit.push({
      id: `audit-${Date.now()}-${this.audit.length}`,
      timestamp: new Date().toISOString(),
      actor,
      action,
      entityType,
      entityId,
      details,
    });
  }
}

export const faapEnterpriseEngine = new FAAPEnterpriseEngine();

// Add getInstance static method for platform singleton access
(FAAPEnterpriseEngine as any).getInstance = function(): FAAPEnterpriseEngine {
  return faapEnterpriseEngine;
};
