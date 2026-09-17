import fs from "fs";
import path from "path";

export interface ChartOfAccountItem {
  account_number: string;
  account_name: string;
  root_type: "Asset" | "Liability" | "Equity" | "Income" | "Expense";
  account_type?: string;
  parent_account?: string;
  is_group: boolean;
  balance: number;
  currency: string;
}


export interface ERPNextSupplier {
  id: string;
  supplier_name: string;
  supplier_group: string;
  email: string;
  total_billed: number;
  total_paid: number;
  outstanding_balance: number;
  created_at: string;
}

export interface ERPNextPurchaseInvoice {
  id: string;
  supplier: string;
  supplier_id: string;
  posting_date: string;
  due_date: string;
  currency: string;
  net_total: number;
  grand_total: number;
  outstanding_amount: number;
  status: "Draft" | "Submitted" | "Paid" | "Partially Paid" | "Cancelled";
  remarks?: string;
  created_at: string;
}

export interface ERPNextAsset {
  id: string;
  asset_name: string;
  category: string;
  location: string;
  department: string;
  purchase_date: string;
  purchase_cost: number;
  currency: string;
  current_value: number;
  status: "Draft" | "Submitted" | "Partially Depreciated" | "Fully Depreciated" | "Disposed";
  created_at: string;
}

export interface ERPNextBudget {
  id: string;
  name: string;
  fiscal_year: string;
  cost_center: string;
  total_allocated: number;
  total_utilized: number;
  status: "Draft" | "Submitted" | "Approved" | "Cancelled";
  created_at: string;
}

export interface ERPNextVote {
  id: string;
  vote_code: string;
  vote_name: string;
  budget_allocated: number;
  amount_released: number;
  commitments: number;
  actual_expenditure: number;
  available_balance: number;
  status: "Active" | "Closed";
}

export interface ERPNextCashBookEntry {
  id: string;
  posting_date: string;
  reference: string;
  description: string;
  type: "Receipt" | "Payment" | "Transfer";
  account: string;
  amount: number;
  balance: number;
  status: "Pending" | "Reconciled";
}

export interface ERPNextCustomer {
  id: string;
  customer_name: string;
  customer_type: "Company" | "Individual";
  customer_group: string;
  territory: string;
  currency: string;
  email: string;
  phone: string;
  total_invoiced: number;
  total_paid: number;
  outstanding_balance: number;
  created_at: string;
}

export interface ERPNextInvoiceItem {
  item_code: string;
  item_name: string;
  qty: number;
  rate: number;
  amount: number;
  income_account: string;
}

export interface ERPNextSalesInvoice {
  id: string;
  name: string;
  customer: string;
  customer_id: string;
  posting_date: string;
  due_date: string;
  currency: string;
  items: ERPNextInvoiceItem[];
  net_total: number;
  tax_amount: number;
  grand_total: number;
  outstanding_amount: number;
  status: "Draft" | "Submitted" | "Paid" | "Partially Paid" | "Cancelled";
  remarks?: string;
  gl_entry_ids?: string[];
  created_at: string;
}

export interface ERPNextGLEntry {
  id: string;
  posting_date: string;
  account: string;
  account_name: string;
  party_type?: "Customer" | "Supplier";
  party?: string;
  voucher_type: "Sales Invoice" | "Payment Entry" | "Journal Entry";
  voucher_no: string;
  debit: number;
  credit: number;
  currency: string;
  remarks: string;
  created_at: string;
}

export interface ERPNextPaymentEntry {
  id: string;
  payment_type: "Receive" | "Pay";
  party_type: "Customer" | "Supplier";
  party: string;
  party_id: string;
  paid_amount: number;
  currency: string;
  paid_to_account: string;
  reference_invoice_id: string;
  posting_date: string;
  reference_no: string;
  status: "Submitted" | "Draft";
  created_at: string;
}

export interface ERPNextBankReconciliationItem {
  id: string;
  bank_account: string;
  transaction_date: string;
  value_date: string;
  description: string;
  reference_id: string;
  withdrawal: number;
  deposit: number;
  allocated_voucher_no?: string;
  reconciled: boolean;
}

export interface ERPNextDataStore {
  metadata: {
    app: "ERPNext";
    version: "v15.18.0";
    upstream_repo: "https://github.com/frappe/erpnext";
    license: "GPL-3.0";
    last_updated: string;
  };
  chart_of_accounts: ChartOfAccountItem[];
  customers: ERPNextCustomer[];
  invoices: ERPNextSalesInvoice[];
  gl_entries: ERPNextGLEntry[];
  payments: ERPNextPaymentEntry[];
  bank_transactions: ERPNextBankReconciliationItem[];

  suppliers: ERPNextSupplier[];
  purchase_invoices: ERPNextPurchaseInvoice[];
  assets: ERPNextAsset[];
  budgets: ERPNextBudget[];
  votes: ERPNextVote[];
  cash_book: ERPNextCashBookEntry[];
}

const STORAGE_PATH = path.join(process.cwd(), ".jumo", "erpnext_data.json");

function getDefaultData(): ERPNextDataStore {
  return {
    metadata: {
      app: "ERPNext",
      version: "v15.18.0",
      upstream_repo: "https://github.com/frappe/erpnext",
      license: "GPL-3.0",
      last_updated: new Date().toISOString(),
    },
    chart_of_accounts: [
      { account_number: "1000", account_name: "Application Assets", root_type: "Asset", is_group: true, balance: 45200000, currency: "UGX" },
      { account_number: "1010", account_name: "1010 - Bank Account (Stanbic Operations)", root_type: "Asset", account_type: "Bank", parent_account: "1000", is_group: false, balance: 32000000, currency: "UGX" },
      { account_number: "1020", account_name: "1020 - Accounts Receivable (Debtors)", root_type: "Asset", account_type: "Receivable", parent_account: "1000", is_group: false, balance: 13200000, currency: "UGX" },
      { account_number: "2000", account_name: "Application Liabilities", root_type: "Liability", is_group: true, balance: 8500000, currency: "UGX" },
      { account_number: "2010", account_name: "2010 - Accounts Payable (Creditors)", root_type: "Liability", account_type: "Payable", parent_account: "2000", is_group: false, balance: 8500000, currency: "UGX" },
      { account_number: "3000", account_name: "Equity & Sovereign Capital", root_type: "Equity", is_group: true, balance: 25000000, currency: "UGX" },
      { account_number: "3010", account_name: "3010 - Paid-up Share Capital", root_type: "Equity", parent_account: "3000", is_group: false, balance: 25000000, currency: "UGX" },
      { account_number: "4000", account_name: "Operating Revenue", root_type: "Income", is_group: true, balance: 24200000, currency: "UGX" },
      { account_number: "4010", account_name: "4010 - Enterprise Platform Service Revenue", root_type: "Income", account_type: "Income Account", parent_account: "4000", is_group: false, balance: 18700000, currency: "UGX" },
      { account_number: "4020", account_name: "4020 - Transaction Processing & Interchange Fee", root_type: "Income", account_type: "Income Account", parent_account: "4000", is_group: false, balance: 5500000, currency: "UGX" },
      { account_number: "5000", account_name: "Direct Operating Expenses", root_type: "Expense", is_group: true, balance: 12500000, currency: "UGX" },
      { account_number: "5010", account_name: "5010 - Cloud Ingress & Compute Expenses", root_type: "Expense", account_type: "Expense Account", parent_account: "5000", is_group: false, balance: 8000000, currency: "UGX" },
      { account_number: "5020", account_name: "5020 - Regulatory Compliance & Audit Fees", root_type: "Expense", account_type: "Expense Account", parent_account: "5000", is_group: false, balance: 4500000, currency: "UGX" },
    ],
    customers: [
      {
        id: "CUST-001",
        customer_name: "Mbabazi Agricultural Cooperative",
        customer_type: "Company",
        customer_group: "Agricultural Enterprises",
        territory: "Uganda East",
        currency: "UGX",
        email: "accounts@mbabazifarmers.org",
        phone: "+256 701 442 890",
        total_invoiced: 9500000,
        total_paid: 5000000,
        outstanding_balance: 4500000,
        created_at: "2026-03-01T08:00:00.000Z"
      },
      {
        id: "CUST-002",
        customer_name: "Bukoto Health Foundation",
        customer_type: "Company",
        customer_group: "Healthcare Institutions",
        territory: "Central Republic",
        currency: "UGX",
        email: "finance@bukotohealth.org",
        phone: "+256 772 190 281",
        total_invoiced: 14200000,
        total_paid: 14200000,
        outstanding_balance: 0,
        created_at: "2026-03-05T09:15:00.000Z"
      },
      {
        id: "CUST-003",
        customer_name: "Victoria Nile Logistics Ltd",
        customer_type: "Company",
        customer_group: "Commercial Enterprise",
        territory: "Jinja Logistics Hub",
        currency: "UGX",
        email: "billing@victorianile.com",
        phone: "+256 754 883 129",
        total_invoiced: 8700000,
        total_paid: 0,
        outstanding_balance: 8700000,
        created_at: "2026-03-10T14:30:00.000Z"
      }
    ],
    invoices: [
      {
        id: "ACC-SINV-2026-0001",
        name: "ACC-SINV-2026-0001",
        customer: "Mbabazi Agricultural Cooperative",
        customer_id: "CUST-001",
        posting_date: "2026-03-12",
        due_date: "2026-04-12",
        currency: "UGX",
        items: [
          {
            item_code: "SRV-ERP-PLATFORM",
            item_name: "Enterprise ERP & Agricultural Telemetry Node",
            qty: 1,
            rate: 4500000,
            amount: 4500000,
            income_account: "4010"
          }
        ],
        net_total: 4500000,
        tax_amount: 0,
        grand_total: 4500000,
        outstanding_amount: 4500000,
        status: "Submitted",
        remarks: "Q1 Agricultural cooperative enterprise accounting node fee",
        gl_entry_ids: ["GL-2026-001", "GL-2026-002"],
        created_at: "2026-03-12T10:00:00.000Z"
      },
      {
        id: "ACC-SINV-2026-0002",
        name: "ACC-SINV-2026-0002",
        customer: "Bukoto Health Foundation",
        customer_id: "CUST-002",
        posting_date: "2026-03-08",
        due_date: "2026-04-08",
        currency: "UGX",
        items: [
          {
            item_code: "SRV-EMR-INTEG",
            item_name: "Hospital EMR & Patient Billing Core Subscription",
            qty: 1,
            rate: 14200000,
            amount: 14200000,
            income_account: "4010"
          }
        ],
        net_total: 14200000,
        tax_amount: 0,
        grand_total: 14200000,
        outstanding_amount: 0,
        status: "Paid",
        remarks: "Settled via Stanbic Direct Bank Settlement",
        gl_entry_ids: ["GL-2026-003", "GL-2026-004", "GL-2026-005", "GL-2026-006"],
        created_at: "2026-03-08T11:20:00.000Z"
      }
    ],
    gl_entries: [
      {
        id: "GL-2026-001",
        posting_date: "2026-03-12",
        account: "1020",
        account_name: "1020 - Accounts Receivable (Debtors)",
        party_type: "Customer",
        party: "Mbabazi Agricultural Cooperative",
        voucher_type: "Sales Invoice",
        voucher_no: "ACC-SINV-2026-0001",
        debit: 4500000,
        credit: 0,
        currency: "UGX",
        remarks: "Debit AR on invoice issuance to Mbabazi Agricultural Cooperative",
        created_at: "2026-03-12T10:00:00.000Z"
      },
      {
        id: "GL-2026-002",
        posting_date: "2026-03-12",
        account: "4010",
        account_name: "4010 - Enterprise Platform Service Revenue",
        voucher_type: "Sales Invoice",
        voucher_no: "ACC-SINV-2026-0001",
        debit: 0,
        credit: 4500000,
        currency: "UGX",
        remarks: "Credit Service Revenue on invoice issuance",
        created_at: "2026-03-12T10:00:00.000Z"
      },
      {
        id: "GL-2026-003",
        posting_date: "2026-03-08",
        account: "1020",
        account_name: "1020 - Accounts Receivable (Debtors)",
        party_type: "Customer",
        party: "Bukoto Health Foundation",
        voucher_type: "Sales Invoice",
        voucher_no: "ACC-SINV-2026-0002",
        debit: 14200000,
        credit: 0,
        currency: "UGX",
        remarks: "Debit AR for Bukoto Health Foundation subscription",
        created_at: "2026-03-08T11:20:00.000Z"
      },
      {
        id: "GL-2026-004",
        posting_date: "2026-03-08",
        account: "4010",
        account_name: "4010 - Enterprise Platform Service Revenue",
        voucher_type: "Sales Invoice",
        voucher_no: "ACC-SINV-2026-0002",
        debit: 0,
        credit: 14200000,
        currency: "UGX",
        remarks: "Credit Service Revenue for Bukoto Health Foundation",
        created_at: "2026-03-08T11:20:00.000Z"
      },
      {
        id: "GL-2026-005",
        posting_date: "2026-03-09",
        account: "1010",
        account_name: "1010 - Bank Account (Stanbic Operations)",
        party_type: "Customer",
        party: "Bukoto Health Foundation",
        voucher_type: "Payment Entry",
        voucher_no: "ACC-PAY-2026-0001",
        debit: 14200000,
        credit: 0,
        currency: "UGX",
        remarks: "Bank deposit received from Bukoto Health Foundation",
        created_at: "2026-03-09T09:00:00.000Z"
      },
      {
        id: "GL-2026-006",
        posting_date: "2026-03-09",
        account: "1020",
        account_name: "1020 - Accounts Receivable (Debtors)",
        party_type: "Customer",
        party: "Bukoto Health Foundation",
        voucher_type: "Payment Entry",
        voucher_no: "ACC-PAY-2026-0001",
        debit: 0,
        credit: 14200000,
        currency: "UGX",
        remarks: "Credit AR to clear balance for invoice ACC-SINV-2026-0002",
        created_at: "2026-03-09T09:00:00.000Z"
      }
    ],
    payments: [
      {
        id: "ACC-PAY-2026-0001",
        payment_type: "Receive",
        party_type: "Customer",
        party: "Bukoto Health Foundation",
        party_id: "CUST-002",
        paid_amount: 14200000,
        currency: "UGX",
        paid_to_account: "1010",
        reference_invoice_id: "ACC-SINV-2026-0002",
        posting_date: "2026-03-09",
        reference_no: "STB-TX-992144",
        status: "Submitted",
        created_at: "2026-03-09T09:00:00.000Z"
      }
    ],
    bank_transactions: [
      {
        id: "BNK-TX-001",
        bank_account: "1010 - Bank Account (Stanbic Operations)",
        transaction_date: "2026-03-09",
        value_date: "2026-03-09",
        description: "DIRECT EFT / BUKOTO HEALTH FOUNDATION / INV-0002",
        reference_id: "STB-TX-992144",
        withdrawal: 0,
        deposit: 14200000,
        allocated_voucher_no: "ACC-PAY-2026-0001",
        reconciled: true
      },
      {
        id: "BNK-TX-002",
        bank_account: "1010 - Bank Account (Stanbic Operations)",
        transaction_date: "2026-03-14",
        value_date: "2026-03-14",
        description: "MTN MOMO SETTLEMENT / MERCH-JUMO-9912",
        reference_id: "MOMO-BATCH-22819",
        withdrawal: 0,
        deposit: 3200000,
        allocated_voucher_no: undefined,
        reconciled: false
      }
    ],
    suppliers: [
      { id: "SUP-001", supplier_name: "Jumo Cloud Services", supplier_group: "Infrastructure", email: "infra@jumo.net", total_billed: 8000000, total_paid: 0, outstanding_balance: 8000000, created_at: new Date().toISOString() },
      { id: "SUP-002", supplier_name: "Uganda Revenue Authority", supplier_group: "Government", email: "tax@ura.go.ug", total_billed: 0, total_paid: 0, outstanding_balance: 0, created_at: new Date().toISOString() },
      { id: "SUP-003", supplier_name: "Umeme Limited", supplier_group: "Utilities", email: "customercare@umeme.co.ug", total_billed: 1200000, total_paid: 1200000, outstanding_balance: 0, created_at: new Date().toISOString() }
    ],
    purchase_invoices: [
      { id: "ACC-PINV-2026-0001", supplier: "Jumo Cloud Services", supplier_id: "SUP-001", posting_date: "2026-03-01", due_date: "2026-04-01", currency: "UGX", net_total: 8000000, grand_total: 8000000, outstanding_amount: 8000000, status: "Submitted", created_at: new Date().toISOString() },
      { id: "ACC-PINV-2026-0002", supplier: "Umeme Limited", supplier_id: "SUP-003", posting_date: "2026-03-05", due_date: "2026-03-15", currency: "UGX", net_total: 1200000, grand_total: 1200000, outstanding_amount: 0, status: "Paid", created_at: new Date().toISOString() }
    ],
    assets: [
      { id: "AST-001", asset_name: "Enterprise Core Server Array", category: "IT Equipment", location: "Data Center A", department: "Infrastructure", purchase_date: "2026-01-15", purchase_cost: 45000000, currency: "UGX", current_value: 42500000, status: "Partially Depreciated", created_at: new Date().toISOString() }
    ],
    budgets: [
      { id: "BGT-2026-01", name: "2026 Core Infrastructure Budget", fiscal_year: "2026", cost_center: "Infrastructure", total_allocated: 150000000, total_utilized: 45000000, status: "Approved", created_at: new Date().toISOString() }
    ],
    votes: [
      { id: "VOT-101", vote_code: "101-IT-CAPEX", vote_name: "IT Infrastructure CAPEX", budget_allocated: 100000000, amount_released: 50000000, commitments: 45000000, actual_expenditure: 45000000, available_balance: 5000000, status: "Active" }
    ],
    cash_book: [
      { id: "CB-001", posting_date: "2026-03-09", reference: "ACC-PAY-2026-0001", description: "Payment from Bukoto Health Foundation", type: "Receipt", account: "1010", amount: 14200000, balance: 14200000, status: "Reconciled" }
    ]
  };
}

export class ERPNextStoreService {
  private static instance: ERPNextStoreService;
  private data: ERPNextDataStore;

  private constructor() {
    this.data = this.loadFromDisk();
  }

  public static getInstance(): ERPNextStoreService {
    if (!ERPNextStoreService.instance) {
      ERPNextStoreService.instance = new ERPNextStoreService();
    }
    return ERPNextStoreService.instance;
  }

  private loadFromDisk(): ERPNextDataStore {
    const defaultData = getDefaultData();
    try {
      const dir = path.dirname(STORAGE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (fs.existsSync(STORAGE_PATH)) {
        const raw = fs.readFileSync(STORAGE_PATH, "utf-8");
        const loaded = JSON.parse(raw);
        // Merge with default data to ensure all keys exist (migration)
        return { ...defaultData, ...loaded };
      }
    } catch (err) {
      console.error("[ERPNextStore] Failed to read from disk, creating fresh store:", err);
    }

    this.saveToDisk(defaultData);
    return defaultData;
  }

  private saveToDisk(dataToSave?: ERPNextDataStore): void {
    try {
      const dir = path.dirname(STORAGE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const data = dataToSave || this.data;
      data.metadata.last_updated = new Date().toISOString();
      fs.writeFileSync(STORAGE_PATH, JSON.stringify(data, null, 2), "utf-8");
    } catch (err) {
      console.error("[ERPNextStore] Error writing to disk:", err);
    }
  }

  public getStatus() {
    return {
      app: "ERPNext + Frappe",
      upstream_repo: "frappe/erpnext",
      version: "v15.18.0",
      license: "GPL-3.0",
      local_path: "foundations/erpnext",
      status: "INTEGRATED",
      authoritative_scope: "General Ledger, Accounts Receivable/Payable, Invoicing, Balance Sheet",
      counts: {
        accounts: this.data.chart_of_accounts.length,
        customers: this.data.customers.length,
        invoices: this.data.invoices.length,
        gl_entries: this.data.gl_entries.length,
        payments: this.data.payments.length,
        bank_records: this.data.bank_transactions.length
      },
      last_updated: this.data.metadata.last_updated
    };
  }

  public getChartOfAccounts(): ChartOfAccountItem[] {
    return this.data.chart_of_accounts;
  }

  public getCustomers(): ERPNextCustomer[] {
    return this.data.customers;
  }

  public addCustomer(customer: Omit<ERPNextCustomer, "id" | "total_invoiced" | "total_paid" | "outstanding_balance" | "created_at">): ERPNextCustomer {
    const id = `CUST-${String(this.data.customers.length + 1).padStart(3, "0")}`;
    const newCustomer: ERPNextCustomer = {
      ...customer,
      id,
      total_invoiced: 0,
      total_paid: 0,
      outstanding_balance: 0,
      created_at: new Date().toISOString()
    };
    this.data.customers.push(newCustomer);
    this.saveToDisk();
    return newCustomer;
  }

  public getInvoices(): ERPNextSalesInvoice[] {
    return this.data.invoices;
  }

  public createSalesInvoice(params: {
    customer_id: string;
    items: { item_code: string; item_name: string; qty: number; rate: number; income_account?: string }[];
    posting_date?: string;
    due_date?: string;
    remarks?: string;
  }): ERPNextSalesInvoice {
    const customer = this.data.customers.find(c => c.id === params.customer_id);
    if (!customer) {
      throw new Error(`Customer with ID ${params.customer_id} not found in ERPNext.`);
    }

    const nextNum = this.data.invoices.length + 1;
    const invId = `ACC-SINV-2026-${String(nextNum).padStart(4, "0")}`;
    const postingDate = params.posting_date || new Date().toISOString().split("T")[0];
    const dueDate = params.due_date || new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split("T")[0];

    const invoiceItems: ERPNextInvoiceItem[] = params.items.map(item => ({
      item_code: item.item_code,
      item_name: item.item_name,
      qty: item.qty,
      rate: item.rate,
      amount: item.qty * item.rate,
      income_account: item.income_account || "4010"
    }));

    const netTotal = invoiceItems.reduce((acc, it) => acc + it.amount, 0);
    const taxAmount = 0;
    const grandTotal = netTotal + taxAmount;

    // Create GL Entries (Double-Entry Debit AR, Credit Income)
    const glDebitId = `GL-2026-${String(this.data.gl_entries.length + 1).padStart(3, "0")}`;
    const glCreditId = `GL-2026-${String(this.data.gl_entries.length + 2).padStart(3, "0")}`;

    const glDebit: ERPNextGLEntry = {
      id: glDebitId,
      posting_date: postingDate,
      account: "1020",
      account_name: "1020 - Accounts Receivable (Debtors)",
      party_type: "Customer",
      party: customer.customer_name,
      voucher_type: "Sales Invoice",
      voucher_no: invId,
      debit: grandTotal,
      credit: 0,
      currency: customer.currency || "UGX",
      remarks: `Debit Accounts Receivable for Sales Invoice ${invId} to ${customer.customer_name}`,
      created_at: new Date().toISOString()
    };

    const glCredit: ERPNextGLEntry = {
      id: glCreditId,
      posting_date: postingDate,
      account: invoiceItems[0]?.income_account || "4010",
      account_name: "4010 - Enterprise Platform Service Revenue",
      voucher_type: "Sales Invoice",
      voucher_no: invId,
      debit: 0,
      credit: grandTotal,
      currency: customer.currency || "UGX",
      remarks: `Credit Operating Revenue for Sales Invoice ${invId}`,
      created_at: new Date().toISOString()
    };

    this.data.gl_entries.push(glDebit, glCredit);

    // Update Customer Financial Ledger
    customer.total_invoiced += grandTotal;
    customer.outstanding_balance += grandTotal;

    // Create and save Invoice
    const invoice: ERPNextSalesInvoice = {
      id: invId,
      name: invId,
      customer: customer.customer_name,
      customer_id: customer.id,
      posting_date: postingDate,
      due_date: dueDate,
      currency: customer.currency || "UGX",
      items: invoiceItems,
      net_total: netTotal,
      tax_amount: taxAmount,
      grand_total: grandTotal,
      outstanding_amount: grandTotal,
      status: "Submitted",
      remarks: params.remarks || "Standard Enterprise Invoice",
      gl_entry_ids: [glDebitId, glCreditId],
      created_at: new Date().toISOString()
    };

    this.data.invoices.unshift(invoice);
    this.saveToDisk();
    return invoice;
  }

  public createPayment(params: {
    invoice_id: string;
    paid_amount: number;
    paid_to_account?: string;
    reference_no?: string;
    posting_date?: string;
  }): { payment: ERPNextPaymentEntry; invoice: ERPNextSalesInvoice } {
    const invoice = this.data.invoices.find(i => i.id === params.invoice_id);
    if (!invoice) {
      throw new Error(`Invoice with ID ${params.invoice_id} not found.`);
    }

    if (invoice.outstanding_amount <= 0) {
      throw new Error(`Invoice ${params.invoice_id} is already fully paid.`);
    }

    const payAmount = Math.min(params.paid_amount, invoice.outstanding_amount);
    const customer = this.data.customers.find(c => c.id === invoice.customer_id);

    const payId = `ACC-PAY-2026-${String(this.data.payments.length + 1).padStart(4, "0")}`;
    const postingDate = params.posting_date || new Date().toISOString().split("T")[0];
    const paidTo = params.paid_to_account || "1010";

    // Create GL entries for payment: Debit Bank (1010), Credit Accounts Receivable (1020)
    const glDebitId = `GL-2026-${String(this.data.gl_entries.length + 1).padStart(3, "0")}`;
    const glCreditId = `GL-2026-${String(this.data.gl_entries.length + 2).padStart(3, "0")}`;

    const glDebit: ERPNextGLEntry = {
      id: glDebitId,
      posting_date: postingDate,
      account: paidTo,
      account_name: "1010 - Bank Account (Stanbic Operations)",
      party_type: "Customer",
      party: invoice.customer,
      voucher_type: "Payment Entry",
      voucher_no: payId,
      debit: payAmount,
      credit: 0,
      currency: invoice.currency,
      remarks: `Bank debit on receiving payment ${payId} against ${invoice.id}`,
      created_at: new Date().toISOString()
    };

    const glCredit: ERPNextGLEntry = {
      id: glCreditId,
      posting_date: postingDate,
      account: "1020",
      account_name: "1020 - Accounts Receivable (Debtors)",
      party_type: "Customer",
      party: invoice.customer,
      voucher_type: "Payment Entry",
      voucher_no: payId,
      debit: 0,
      credit: payAmount,
      currency: invoice.currency,
      remarks: `Credit Accounts Receivable against invoice ${invoice.id}`,
      created_at: new Date().toISOString()
    };

    this.data.gl_entries.push(glDebit, glCredit);

    // Update Invoice status & balance
    invoice.outstanding_amount -= payAmount;
    if (invoice.outstanding_amount <= 0) {
      invoice.status = "Paid";
    } else {
      invoice.status = "Partially Paid";
    }

    // Update Customer balance
    if (customer) {
      customer.total_paid += payAmount;
      customer.outstanding_balance = Math.max(0, customer.outstanding_balance - payAmount);
    }

    const payment: ERPNextPaymentEntry = {
      id: payId,
      payment_type: "Receive",
      party_type: "Customer",
      party: invoice.customer,
      party_id: invoice.customer_id,
      paid_amount: payAmount,
      currency: invoice.currency,
      paid_to_account: paidTo,
      reference_invoice_id: invoice.id,
      posting_date: postingDate,
      reference_no: params.reference_no || `TX-${Date.now()}`,
      status: "Submitted",
      created_at: new Date().toISOString()
    };

    this.data.payments.unshift(payment);
    this.saveToDisk();

    return { payment, invoice };
  }

  public getGLEntries(): ERPNextGLEntry[] {
    return this.data.gl_entries;
  }

  public getSuppliers() {
    return this.data.suppliers || [];
  }

  public getBills() {
    return this.data.purchase_invoices || [];
  }


  public getAssets(): ERPNextAsset[] { return this.data.assets || []; }
  public getBudgets(): ERPNextBudget[] { return this.data.budgets || []; }
  public getVotes(): ERPNextVote[] { return this.data.votes || []; }
  public getCashBook(): ERPNextCashBookEntry[] { return this.data.cash_book || []; }
  public getPurchaseInvoices(): ERPNextPurchaseInvoice[] { return this.data.purchase_invoices || []; }

  public addAsset(asset: Partial<ERPNextAsset>): ERPNextAsset {
    const id = `AST-${String(this.data.assets.length + 1).padStart(3, "0")}`;
    const newAsset: ERPNextAsset = {
      ...asset,
      id,
      status: asset.status || "Submitted",
      created_at: new Date().toISOString()
    } as ERPNextAsset;
    this.data.assets.push(newAsset);
    this.saveToDisk();
    return newAsset;
  }

  public addCashBookEntry(entry: Partial<ERPNextCashBookEntry>): ERPNextCashBookEntry {
    const id = `CB-${String(this.data.cash_book.length + 1).padStart(3, "0")}`;
    // compute balance based on previous
    const previousBalance = this.data.cash_book.length > 0 ? this.data.cash_book[this.data.cash_book.length - 1].balance : 0;
    const change = entry.type === "Receipt" ? (entry.amount || 0) : -(entry.amount || 0);
    const newEntry: ERPNextCashBookEntry = {
      ...entry,
      id,
      balance: previousBalance + change,
      status: entry.status || "Pending",
      posting_date: entry.posting_date || new Date().toISOString().split("T")[0]
    } as ERPNextCashBookEntry;
    this.data.cash_book.push(newEntry);
    this.saveToDisk();
    return newEntry;
  }

  public addVote(vote: Partial<ERPNextVote>): ERPNextVote {
    const id = `VOT-${String(this.data.votes.length + 1).padStart(3, "0")}`;
    const newVote: ERPNextVote = {
      ...vote,
      id,
      status: "Active"
    } as ERPNextVote;
    this.data.votes.push(newVote);
    this.saveToDisk();
    return newVote;
  }

  public createPurchaseInvoice(bill: Partial<ERPNextPurchaseInvoice>): ERPNextPurchaseInvoice {
    const id = `ACC-PINV-2026-${String(this.data.purchase_invoices.length + 1).padStart(4, "0")}`;
    const supplier = this.data.suppliers.find(s => s.id === bill.supplier_id);
    const newBill: ERPNextPurchaseInvoice = {
      ...bill,
      id,
      supplier: supplier ? supplier.supplier_name : bill.supplier,
      outstanding_amount: bill.grand_total,
      status: bill.status || "Submitted",
      created_at: new Date().toISOString()
    } as ERPNextPurchaseInvoice;
    this.data.purchase_invoices.push(newBill);
    if(supplier) {
      supplier.total_billed += newBill.grand_total || 0;
      supplier.outstanding_balance += newBill.grand_total || 0;
    }
    this.saveToDisk();
    return newBill;
  }


  public getBankTransactions(): ERPNextBankReconciliationItem[] {
    return this.data.bank_transactions;
  }

  public reconcileBankTransaction(txId: string, voucherNo: string): ERPNextBankReconciliationItem {
    const tx = this.data.bank_transactions.find(t => t.id === txId);
    if (!tx) {
      throw new Error(`Bank transaction with ID ${txId} not found.`);
    }
    tx.allocated_voucher_no = voucherNo;
    tx.reconciled = true;
    this.saveToDisk();
    return tx;
  }

  public addAccount(account: ChartOfAccountItem): ChartOfAccountItem {
    const existing = this.data.chart_of_accounts.find(a => a.account_number === account.account_number);
    if (existing) {
      throw new Error(`Account number ${account.account_number} already exists.`);
    }
    this.data.chart_of_accounts.push(account);
    this.saveToDisk();
    return account;
  }

  public addSupplier(supplier: Partial<ERPNextSupplier>): ERPNextSupplier {
    const id = `SUP-${String(this.data.suppliers.length + 1).padStart(3, "0")}`;
    const newSupplier: ERPNextSupplier = {
      id,
      supplier_name: supplier.supplier_name || "New Supplier",
      supplier_group: supplier.supplier_group || "Local Supplier",
      email: supplier.email || "",
      total_billed: 0,
      total_paid: 0,
      outstanding_balance: 0,
      created_at: new Date().toISOString()
    };
    this.data.suppliers.push(newSupplier);
    this.saveToDisk();
    return newSupplier;
  }

  public addJournalEntry(params: {
    posting_date?: string;
    remarks: string;
    debit_account: string;
    debit_account_name: string;
    debit_amount: number;
    credit_account: string;
    credit_account_name: string;
    credit_amount: number;
    reference_no?: string;
    source_module?: string;
  }): { debitEntry: ERPNextGLEntry; creditEntry: ERPNextGLEntry } {
    if (params.debit_amount !== params.credit_amount) {
      throw new Error("Journal Entry Error: Total Debits must equal Total Credits.");
    }
    const postingDate = params.posting_date || new Date().toISOString().split("T")[0];
    const voucherNo = params.reference_no || `JRN-2026-${String(this.data.gl_entries.length / 2 + 1).padStart(4, "0")}`;
    
    const debitEntry: ERPNextGLEntry = {
      id: `GL-2026-${String(this.data.gl_entries.length + 1).padStart(4, "0")}`,
      posting_date: postingDate,
      account: params.debit_account,
      account_name: params.debit_account_name,
      voucher_type: "Journal Entry",
      voucher_no: voucherNo,
      debit: params.debit_amount,
      credit: 0,
      currency: "UGX",
      remarks: params.remarks,
      created_at: new Date().toISOString()
    };

    const creditEntry: ERPNextGLEntry = {
      id: `GL-2026-${String(this.data.gl_entries.length + 2).padStart(4, "0")}`,
      posting_date: postingDate,
      account: params.credit_account,
      account_name: params.credit_account_name,
      voucher_type: "Journal Entry",
      voucher_no: voucherNo,
      debit: 0,
      credit: params.credit_amount,
      currency: "UGX",
      remarks: params.remarks,
      created_at: new Date().toISOString()
    };

    this.data.gl_entries.push(debitEntry, creditEntry);

    // Also update account balances if matched
    const debAcc = this.data.chart_of_accounts.find(a => a.account_number === params.debit_account);
    if (debAcc) debAcc.balance += params.debit_amount;

    const credAcc = this.data.chart_of_accounts.find(a => a.account_number === params.credit_account);
    if (credAcc) credAcc.balance += params.credit_amount;

    this.saveToDisk();
    return { debitEntry, creditEntry };
  }

  public payBill(billId: string, paidAmount: number): ERPNextPurchaseInvoice {
    const bill = this.data.purchase_invoices.find(b => b.id === billId);
    if (!bill) {
      throw new Error(`Bill ${billId} not found`);
    }
    bill.outstanding_amount = Math.max(0, bill.outstanding_amount - paidAmount);
    if (bill.outstanding_amount === 0) {
      bill.status = "Paid";
    } else {
      bill.status = "Partially Paid";
    }
    const supplier = this.data.suppliers.find(s => s.id === bill.supplier_id || s.supplier_name === bill.supplier);
    if (supplier) {
      supplier.total_paid += paidAmount;
      supplier.outstanding_balance = Math.max(0, supplier.outstanding_balance - paidAmount);
    }
    this.saveToDisk();
    return bill;
  }
}
