export interface COAAccount {
  code: string; // e.g. "1010", "2010", "4010"
  title: string;
  type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
  balanceUGX: number;
  parentCode?: string;
}

export interface JournalVoucher {
  id: string;
  voucherNo: string; // e.g. JV-100234
  date: string;
  description: string;
  debitAccountCode: string;
  creditAccountCode: string;
  amountUGX: number;
  postedByRole: string;
}

export interface CustomerInvoice {
  id: string;
  invoiceNo: string;
  customerName: string;
  amountUGX: number;
  paidUGX: number;
  balanceUGX: number;
  status: 'UNPAID' | 'PARTIAL' | 'PAID';
  dueDate: string;
  agingBucket: 'CURRENT' | '30_DAYS' | '60_DAYS' | '90_PLUS';
}

export interface VendorBill {
  id: string;
  billNo: string;
  vendorName: string;
  amountUGX: number;
  paidUGX: number;
  balanceUGX: number;
  status: 'UNPAID' | 'APPROVED' | 'PAID';
  dueDate: string;
}

export interface InventoryItem {
  id: string;
  code: string;
  description: string;
  qtyOnHand: number;
  unitCostUGX: number;
  reorderPoint: number;
}

export interface ProjectJob {
  id: string;
  projectName: string;
  budgetUGX: number;
  expensesUGX: number;
  revenueUGX: number;
  netMarginUGX: number;
}

export interface PayrollRun {
  id: string;
  period: string;
  grossSalaryUGX: number;
  employeeNSSFUGX: number; // 5%
  employerNSSFUGX: number; // 10%
  payeTaxUGX: number;      // ~15%
  netPayoutUGX: number;
  status: 'DRAFT' | 'EXECUTED_GL_POSTED';
}

export class QBDatabase {
  static listeners: (() => void)[] = [];

  static subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  static notify() {
    this.listeners.forEach(l => l());
  }

  static activeCompany = 'Alpha Academy Inc. (Uganda Operations)';
  static fiscalYearStart = 'January';
  static accountingMethod: 'ACCRUAL' | 'CASH' = 'ACCRUAL';

  static coa: COAAccount[] = [
    { code: '1010', title: 'Stanbic Bank Operating Account', type: 'ASSET', balanceUGX: 45050000 },
    { code: '1020', title: 'SchoolPay Escrow Clearing Account', type: 'ASSET', balanceUGX: 1450000 },
    { code: '1200', title: 'Accounts Receivable (Student Tuition)', type: 'ASSET', balanceUGX: 8500000 },
    { code: '1500', title: 'Inventory & Science Lab Equipment', type: 'ASSET', balanceUGX: 12000000 },
    { code: '2010', title: 'Accounts Payable (Suppliers)', type: 'LIABILITY', balanceUGX: 3200000 },
    { code: '2200', title: 'NSSF Statutory Tax Liability', type: 'LIABILITY', balanceUGX: 1500000 },
    { code: '2210', title: 'PAYE Income Tax Payable', type: 'LIABILITY', balanceUGX: 2100000 },
    { code: '3010', title: 'Retained Capital Surplus', type: 'EQUITY', balanceUGX: 40000000 },
    { code: '4010', title: 'Tuition Fee Revenue', type: 'REVENUE', balanceUGX: 35000000 },
    { code: '5010', title: 'Faculty & Staff Payroll Expense', type: 'EXPENSE', balanceUGX: 12000000 },
    { code: '5020', title: 'Utilities & Laboratory Supplies', type: 'EXPENSE', balanceUGX: 2800000 }
  ];

  static journals: JournalVoucher[] = [
    {
      id: 'JV-001',
      voucherNo: 'JV-100234',
      date: '2026-02-10',
      description: 'Post Lab Utilities Expense',
      debitAccountCode: '5020',
      creditAccountCode: '2010',
      amountUGX: 1200000,
      postedByRole: 'CHIEF_ACCOUNTANT'
    }
  ];

  static bankFeeds = [
    { id: 'FEED-001', date: '2026-02-12', description: 'MTN Mobile Money Settlement', amountUGX: 1442750, type: 'CREDIT', status: 'MATCHED' }
  ];

  static invoices: CustomerInvoice[] = [
    {
      id: 'INV-101',
      invoiceNo: 'INV-2026-001',
      customerName: 'John Doe (LIN-2026-001)',
      amountUGX: 1600000,
      paidUGX: 0,
      balanceUGX: 1600000,
      status: 'UNPAID',
      dueDate: '2026-02-15',
      agingBucket: 'CURRENT'
    }
  ];

  static bills: VendorBill[] = [
    {
      id: 'BILL-201',
      billNo: 'BILL-UG-882',
      vendorName: 'Uganda Electricity Distribution Co',
      amountUGX: 1200000,
      paidUGX: 0,
      balanceUGX: 1200000,
      status: 'APPROVED',
      dueDate: '2026-02-28'
    }
  ];

  static inventory: InventoryItem[] = [
    { id: 'INV-01', code: 'LAB-MIC-01', description: 'Compound Optical Microscope', qtyOnHand: 15, unitCostUGX: 450000, reorderPoint: 5 }
  ];

  static projects: ProjectJob[] = [
    { id: 'PRJ-01', projectName: 'Science Lab Modernization Phase 1', budgetUGX: 25000000, expensesUGX: 12000000, revenueUGX: 20000000, netMarginUGX: 8000000 }
  ];

  static payrollRuns: PayrollRun[] = [
    {
      id: 'PAY-2026-01',
      period: 'January 2026',
      grossSalaryUGX: 12000000,
      employeeNSSFUGX: 600000,
      employerNSSFUGX: 1200000,
      payeTaxUGX: 1800000,
      netPayoutUGX: 9600000,
      status: 'EXECUTED_GL_POSTED'
    }
  ];

  static auditLogs = [
    { id: 'LOG-001', timestamp: '2026-02-10 14:00', actor: 'Chief Accountant', action: 'POSTED_JOURNAL_VOUCHER', details: 'JV-100234 for UGX 1,200,000' }
  ];

  static backups = [
    { id: 'BK-001', timestamp: '2026-02-12 00:00', label: 'Daily Fiscal Backup Snapshot', sizeMB: 14.2 }
  ];

  // Business Logic Methods
  static postJournalVoucher(debitCode: string, creditCode: string, amountUGX: number, description: string) {
    const debitAcc = this.coa.find(c => c.code === debitCode);
    const creditAcc = this.coa.find(c => c.code === creditCode);
    if (!debitAcc || !creditAcc) return;

    // Apply strict Double-Entry Accounting rules for Normal Balances
    // Assets & Expenses: normal balance is Debit (Debit increases, Credit decreases)
    // Liabilities, Equity, Revenue: normal balance is Credit (Credit increases, Debit decreases)
    
    if (debitAcc.type === 'ASSET' || debitAcc.type === 'EXPENSE') {
      debitAcc.balanceUGX += amountUGX;
    } else {
      debitAcc.balanceUGX -= amountUGX;
    }

    if (creditAcc.type === 'LIABILITY' || creditAcc.type === 'EQUITY' || creditAcc.type === 'REVENUE') {
      creditAcc.balanceUGX += amountUGX;
    } else {
      creditAcc.balanceUGX -= amountUGX;
    }

    const jvNo = `JV-${Math.floor(100000 + Math.random() * 900000)}`;
    const jv: JournalVoucher = {
      id: `JV-${Date.now()}`,
      voucherNo: jvNo,
      date: new Date().toISOString().split('T')[0],
      description,
      debitAccountCode: debitCode,
      creditAccountCode: creditCode,
      amountUGX,
      postedByRole: 'CHIEF_ACCOUNTANT'
    };

    this.journals.unshift(jv);
    this.auditLogs.unshift({
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      actor: 'Chief Accountant',
      action: 'POST_JOURNAL_VOUCHER',
      details: `Posted ${jvNo} for UGX ${amountUGX.toLocaleString()}`
    });

    this.notify();
    return jv;
  }

  static addCOAAccount(code: string, title: string, type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE') {
    const acc: COAAccount = { code, title, type, balanceUGX: 0 };
    this.coa.push(acc);
    this.notify();
    return acc;
  }

  static createInvoice(customerName: string, amountUGX: number) {
    const invNo = `INV-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newInv: CustomerInvoice = {
      id: `INV-${Date.now()}`,
      invoiceNo: invNo,
      customerName,
      amountUGX,
      paidUGX: 0,
      balanceUGX: amountUGX,
      status: 'UNPAID',
      dueDate: '2026-03-15',
      agingBucket: 'CURRENT'
    };
    this.invoices.unshift(newInv);
    
    // Auto GL Post: Debit AR (1200), Credit Revenue (4010)
    // Assets (AR) normal balance is Debit, so + amount
    // Revenue normal balance is Credit, so + amount
    this.postJournalVoucher('1200', '4010', amountUGX, `Auto-Invoice ${invNo}`);

    this.notify();
    return newInv;
  }

  static executePayrollRun(grossSalaryUGX: number) {
    const empNSSF = Math.round(grossSalaryUGX * 0.05);
    const empMatchNSSF = Math.round(grossSalaryUGX * 0.10);
    const payeTax = Math.round(grossSalaryUGX * 0.15);
    const netPayout = grossSalaryUGX - empNSSF - payeTax;

    const run: PayrollRun = {
      id: `PAY-${Date.now()}`,
      period: 'February 2026',
      grossSalaryUGX,
      employeeNSSFUGX: empNSSF,
      employerNSSFUGX: empMatchNSSF,
      payeTaxUGX: payeTax,
      netPayoutUGX: netPayout,
      status: 'EXECUTED_GL_POSTED'
    };

    this.payrollRuns.unshift(run);

    // GL Posting for Payroll
    // Debit Payroll Expense (5010) for gross
    // Credit PAYE Payable (2210), NSSF Payable (2200), and Bank (1010)
    // To simplify for this mock, we will do a multi-leg or post multiple journals.
    this.postJournalVoucher('5010', '1010', netPayout, `Payroll Net Payout ${run.period}`);
    this.postJournalVoucher('5010', '2210', payeTax, `Payroll PAYE ${run.period}`);
    this.postJournalVoucher('5010', '2200', empNSSF, `Payroll NSSF Employee ${run.period}`);
    
    // Employer NSSF match
    this.postJournalVoucher('5010', '2200', empMatchNSSF, `Payroll NSSF Employer Match ${run.period}`);

    this.notify();
    return run;
  }

  static calculateTotals() {
    const assets = this.coa.filter(c => c.type === 'ASSET').reduce((sum, c) => sum + c.balanceUGX, 0);
    const liabilities = this.coa.filter(c => c.type === 'LIABILITY').reduce((sum, c) => sum + c.balanceUGX, 0);
    const equity = this.coa.filter(c => c.type === 'EQUITY').reduce((sum, c) => sum + c.balanceUGX, 0);
    const revenue = this.coa.filter(c => c.type === 'REVENUE').reduce((sum, c) => sum + c.balanceUGX, 0);
    const expense = this.coa.filter(c => c.type === 'EXPENSE').reduce((sum, c) => sum + c.balanceUGX, 0);
    const netSurplus = revenue - expense;

    return { assets, liabilities, equity, revenue, expense, netSurplus };
  }
}
