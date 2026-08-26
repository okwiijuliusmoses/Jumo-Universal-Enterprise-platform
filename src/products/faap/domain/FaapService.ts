/**
 * JUMO FAAP — Sovereign Business Logic Service
 * Provides centralized dynamic state and persistence for Charts of Accounts,
 * Journals, Vendor Bills, Customer Invoices, Bank Feeds, and Capital Assets.
 */

import { 
  FaapAccount, 
  FaapJournalEntry, 
  FaapVendorBill, 
  FaapCustomerInvoice, 
  FaapBankFeedTransaction, 
  FaapFixedAsset, 
  FaapVoteBookEntry, 
  FaapCashBookEntry 
} from './types';

export class FaapService {

  public getMetrics(): any { return { totalAssets: 0, totalLiabilities: 0 }; }
  public getUniversalTransactions(): any[] { return []; }


  private static instance: FaapService;

  // General Ledger Charts of Accounts
  private accounts: FaapAccount[] = [
    { code: '1010', name: 'Cash at Bank', type: 'ASSET', subType: 'CASH', balance: 45000000, currency: 'UGX', isSystem: true },
    { code: '1210', name: 'Accounts Receivable', type: 'ASSET', subType: 'RECEIVABLE', balance: 12500000, currency: 'UGX', isSystem: true },
    { code: '1090', name: 'Accumulated Depreciation', type: 'ASSET', subType: 'CONTRA_ASSET', balance: 0, currency: 'UGX', isSystem: true },
    { code: '2010', name: 'Accounts Payable', type: 'LIABILITY', subType: 'PAYABLE', balance: 8400000, currency: 'UGX', isSystem: true },
    { code: '3010', name: 'Retained Earnings', type: 'EQUITY', subType: 'EQUITY', balance: 35000000, currency: 'UGX', isSystem: true },
    { code: '4010', name: 'Sales Revenue', type: 'REVENUE', subType: 'INCOME', balance: 150000000, currency: 'UGX', isSystem: true },
    { code: '6010', name: 'Office Rent', type: 'EXPENSE', subType: 'EXPENSE', balance: 12000000, currency: 'UGX', isSystem: false },
    { code: '6020', name: 'Depreciation Expense', type: 'EXPENSE', subType: 'EXPENSE', balance: 0, currency: 'UGX', isSystem: true },
  ];

  // Sovereign Journal Table (Universal Journal Table)
  private journals: FaapJournalEntry[] = [
    { 
      id: 'j1', entryNumber: 'JE-2026-001', date: '2026-03-01', memo: 'Initial Opening Balance', 
      lines: [
        { accountCode: '1010', debit: 45000000, credit: 0, description: 'Opening Reserve Cash' },
        { accountCode: '3010', debit: 0, credit: 45000000, description: 'Opening Reserve Capital' }
      ],
      totalDebit: 45000000, totalCredit: 45000000, status: 'POSTED'
    }
  ];

  // Accounts Payable Subledger
  private bills: FaapVendorBill[] = [
    { id: 'b1', billNumber: 'BIL-2026-001', vendorName: 'National Telecommunications', dueDate: '2026-09-15', totalAmount: 450000, balanceDue: 450000, status: 'OPEN' },
    { id: 'b2', billNumber: 'BIL-2026-002', vendorName: 'Universal Power Utility', dueDate: '2026-09-10', totalAmount: 850000, balanceDue: 0, status: 'PAID' }
  ];

  // Accounts Receivable Subledger
  private invoices: FaapCustomerInvoice[] = [
    { id: 'i1', invoiceNumber: 'INV-2026-001', customerName: 'Institutional Partner A', dueDate: '2026-09-20', totalAmount: 1800000, balanceDue: 1800000, status: 'SENT' },
    { id: 'i2', invoiceNumber: 'INV-2026-002', customerName: 'Institutional Partner B', dueDate: '2026-09-05', totalAmount: 2400000, balanceDue: 0, status: 'PAID' }
  ];

  // Bank Feed Statements Subledger
  private bankFeeds: FaapBankFeedTransaction[] = [
    { id: 'bf1', date: '2026-08-10', description: 'DIRECT DEPOSIT MOBILE WALLET TRANS', amount: 350000, status: 'UNRECONCILED' },
    { id: 'bf2', date: '2026-08-11', description: 'OFFICE SUPPLIES OUTLET PAY', amount: -150000, status: 'UNRECONCILED' },
    { id: 'bf3', date: '2026-08-12', description: 'INTEREST CREDIT CENTRAL RESERVE BANK', amount: 5000, status: 'MATCHED' }
  ];

  // Fixed Asset Registry Subledger
  private fixedAssets: FaapFixedAsset[] = [
    { id: 'fa1', assetCode: 'AST-CMP-001', name: 'High-Performance Cloud Compute Nodes', acquisitionCost: 15000000, accumulatedDepreciation: 1250000, netBookValue: 13750000 },
    { id: 'fa2', assetCode: 'AST-OFC-002', name: 'Ergonomic Standing Workstations Hub 01', acquisitionCost: 6000000, accumulatedDepreciation: 500000, netBookValue: 5500000 }
  ];

  // Vote Book Ledger
  private votes: FaapVoteBookEntry[] = [
    { id: 'v1', voteCode: 'VOTE-ACAD-101', voteName: 'Academic Reagents & laboratory Consumables', annualBudget: 150000000, commitments: 25000000, expenditure: 65000000, balanceAvailable: 60000000 },
    { id: 'v2', voteCode: 'VOTE-ICT-102', voteName: 'Campus Fibre Backhaul & Cloud Compute Nodes', annualBudget: 220000000, commitments: 45000000, expenditure: 120000000, balanceAvailable: 55000000 }
  ];

  // Cash Book Ledger
  private cashEntries: FaapCashBookEntry[] = [
    { id: 'c1', date: '2026-08-01', description: 'Opening Balance Cash & Bank', folioReference: 'OB', accountCode: '1010', cashAmount: 5000000, bankAmount: 45000000, type: 'RECEIPT' }
  ];

  private constructor() {}

  public static getInstance(): FaapService {
    if (!FaapService.instance) {
      FaapService.instance = new FaapService();
    }
    return FaapService.instance;
  }

  // --- CHART OF ACCOUNTS ---
  getChartOfAccounts() { return this.accounts; }
  
  createAccount(account: FaapAccount) {
    if (this.accounts.some(a => a.code === account.code)) {
      throw new Error(`Account code ${account.code} already exists.`);
    }
    this.accounts.push({ ...account, isSystem: false });
    return account;
  }

  // --- JOURNALS ---
  getJournalEntries() { return this.journals; }

  postJournal(entry: Omit<FaapJournalEntry, 'id' | 'entryNumber' | 'status'>) {
    if (entry.totalDebit !== entry.totalCredit) {
      throw new Error('Debit/Credit Parity Mismatch ($0.00 offset required)');
    }
    const newEntry: FaapJournalEntry = {
      ...entry,
      id: `je_${Math.random().toString(36).substr(2, 9)}`,
      entryNumber: `JE-2026-${(this.journals.length + 1).toString().padStart(3, '0')}`,
      status: 'POSTED'
    };
    this.journals.push(newEntry);
    return newEntry;
  }

  // --- VOTE BOOK ---
  getVoteBook() { return this.votes; }
  
  commitEncumbrance(voteCode: string, amount: number, description: string) {
    const vote = this.votes.find(v => v.voteCode === voteCode);
    if (!vote) throw new Error(`Vote ${voteCode} not found.`);
    
    if (amount > vote.balanceAvailable) {
      throw new Error(`Insufficient budget in ${voteCode}. Available: ${vote.balanceAvailable}`);
    }

    vote.commitments += amount;
    vote.balanceAvailable -= amount;
    return vote;
  }

  // --- CASH BOOK ---
  getCashBook() { return this.cashEntries; }

  recordCashEntry(entry: Omit<FaapCashBookEntry, 'id'>) {
    const newEntry: FaapCashBookEntry = {
      ...entry,
      id: `cb_${Math.random().toString(36).substr(2, 9)}`
    };
    this.cashEntries.push(newEntry);
    return newEntry;
  }

  // --- ACCOUNTS PAYABLE (VENDORS) ---
  getVendorBills() { return this.bills; }

  createVendorBill(bill: Omit<FaapVendorBill, 'id' | 'status' | 'balanceDue'>) {
    const newBill: FaapVendorBill = {
      ...bill,
      id: `bl_${Math.random().toString(36).substr(2, 9)}`,
      balanceDue: bill.totalAmount,
      status: 'OPEN'
    };
    this.bills.push(newBill);

    // Dynamic double entry: Debit Expense (Office Rent or General), Credit Accounts Payable
    this.postUniversalTransaction({
      sourceProduct: 'INTERNAL',
      memo: `Vendor Bill Created: ${newBill.billNumber} for ${newBill.vendorName}`,
      debitAccount: '6010', // Rent/General Expense
      creditAccount: '2010', // AP
      amount: bill.totalAmount
    });

    return newBill;
  }

  payVendorBill(billId: string, amountPaid: number) {
    const bill = this.bills.find(b => b.id === billId);
    if (!bill) throw new Error('Bill not found');
    if (amountPaid <= 0) throw new Error('Amount must be positive');
    
    const maxPayable = bill.balanceDue;
    const actualPay = Math.min(amountPaid, maxPayable);

    bill.balanceDue -= actualPay;
    if (bill.balanceDue <= 0) {
      bill.status = 'PAID';
    }

    // Dynamic double entry: Debit Accounts Payable (2010), Credit Cash at Bank (1010)
    this.postUniversalTransaction({
      sourceProduct: 'INTERNAL',
      memo: `Vendor Bill Payment: ${bill.billNumber} (${bill.vendorName})`,
      debitAccount: '2010', // AP
      creditAccount: '1010', // Bank Cash
      amount: actualPay
    });

    return bill;
  }

  // --- ACCOUNTS RECEIVABLE (CUSTOMERS) ---
  getCustomerInvoices() { return this.invoices; }

  createCustomerInvoice(invoice: Omit<FaapCustomerInvoice, 'id' | 'status' | 'balanceDue'>) {
    const newInvoice: FaapCustomerInvoice = {
      ...invoice,
      id: `inv_${Math.random().toString(36).substr(2, 9)}`,
      balanceDue: invoice.totalAmount,
      status: 'SENT'
    };
    this.invoices.push(newInvoice);

    // Dynamic double entry: Debit Accounts Receivable (1210), Credit Sales Revenue (4010)
    this.postUniversalTransaction({
      sourceProduct: 'INTERNAL',
      memo: `Customer Invoice Generated: ${newInvoice.invoiceNumber} for ${newInvoice.customerName}`,
      debitAccount: '1210', // AR
      creditAccount: '4010', // Sales Revenue
      amount: invoice.totalAmount
    });

    return newInvoice;
  }

  collectInvoicePayment(invoiceId: string, amountCollected: number) {
    return this.collectCustomerInvoice(invoiceId, amountCollected);
  }

  collectCustomerInvoice(invoiceId: string, amountCollected: number) {
    const invoice = this.invoices.find(i => i.id === invoiceId);
    if (!invoice) throw new Error('Invoice not found');
    if (amountCollected <= 0) throw new Error('Amount must be positive');

    const maxCollect = invoice.balanceDue;
    const actualCollect = Math.min(amountCollected, maxCollect);

    invoice.balanceDue -= actualCollect;
    if (invoice.balanceDue <= 0) {
      invoice.status = 'PAID';
    }

    // Dynamic double entry: Debit Cash at Bank (1010), Credit Accounts Receivable (1210)
    this.postUniversalTransaction({
      sourceProduct: 'INTERNAL',
      memo: `Invoice Payment Received: ${invoice.invoiceNumber} (${invoice.customerName})`,
      debitAccount: '1010', // Bank Cash
      creditAccount: '1210', // AR
      amount: actualCollect
    });

    return invoice;
  }

  // --- BANK FEEDS ---
  getBankFeedTransactions() { return this.bankFeeds; }

  importBankFeed(tx: Omit<FaapBankFeedTransaction, 'id' | 'status'>) {
    const newTx: FaapBankFeedTransaction = {
      ...tx,
      id: `bf_${Math.random().toString(36).substr(2, 9)}`,
      status: 'UNRECONCILED'
    };
    this.bankFeeds.push(newTx);
    return newTx;
  }

  reconcileBankFeed(feedId: string, accountCode: string) {
    const feed = this.bankFeeds.find(f => f.id === feedId);
    if (!feed) throw new Error('Bank feed transaction not found');
    
    feed.status = 'MATCHED';

    // If amount is positive: Debit Cash (1010), Credit the selected ledger account
    // If amount is negative: Debit the selected ledger account, Credit Cash (1010)
    const absoluteAmount = Math.abs(feed.amount);
    const isCredit = feed.amount > 0;

    this.postUniversalTransaction({
      sourceProduct: 'INTERNAL',
      memo: `Reconciled Bank Feed: "${feed.description}" against Account ${accountCode}`,
      debitAccount: isCredit ? '1010' : accountCode,
      creditAccount: isCredit ? accountCode : '1010',
      amount: absoluteAmount
    });

    return feed;
  }

  // --- FIXED ASSETS ---
  getFixedAssets() { return this.fixedAssets; }

  createFixedAsset(asset: Omit<FaapFixedAsset, 'id' | 'accumulatedDepreciation' | 'netBookValue'>) {
    const newAsset: FaapFixedAsset = {
      ...asset,
      id: `ast_${Math.random().toString(36).substr(2, 9)}`,
      accumulatedDepreciation: 0,
      netBookValue: asset.acquisitionCost
    };
    this.fixedAssets.push(newAsset);

    // Purchase asset: Debit Fixed Assets (let's assume custom account or office supplies/hardware asset is 1080)
    // and Credit Accounts Payable (2010) or Cash (1010)
    const accounts = this.getChartOfAccounts();
    const hasAssetAccount = accounts.some(a => a.code === '1080');
    if (!hasAssetAccount) {
      accounts.push({ code: '1080', name: 'Machinery & Equipment Assets', type: 'ASSET', subType: 'FIXED_ASSETS', balance: 0, currency: 'UGX', isSystem: false });
    }

    this.postUniversalTransaction({
      sourceProduct: 'INTERNAL',
      memo: `Fixed Asset Acquired: ${newAsset.assetCode} - ${newAsset.name}`,
      debitAccount: '1080',
      creditAccount: '1010', // Cash purchase
      amount: asset.acquisitionCost
    });

    return newAsset;
  }

  // Authoritative dynamic balance calculator for custom postings
  public postUniversalTransaction(params: {
    sourceProduct: 'EDUCATION' | 'DIGITAL_PAY' | 'MANUFACTURING' | 'INTERNAL' | 'FINTECH' | 'CHURCH' | 'ALUMNI' | string;
    memo: string;
    debitAccount: string;
    creditAccount: string;
    amount: number;
    metadata?: Record<string, any>;
  }) {
    const { sourceProduct, memo, debitAccount, creditAccount, amount } = params;
    
    // Update raw balances directly on posting
    const debAcc = this.accounts.find(a => a.code === debitAccount);
    const credAcc = this.accounts.find(a => a.code === creditAccount);

    if (debAcc) {
      const isDebitIncrease = debAcc.type === 'ASSET' || debAcc.type === 'EXPENSE';
      if (isDebitIncrease) debAcc.balance += amount;
      else debAcc.balance -= amount;
    }

    if (credAcc) {
      const isDebitIncrease = credAcc.type === 'ASSET' || credAcc.type === 'EXPENSE';
      if (isDebitIncrease) credAcc.balance -= amount;
      else credAcc.balance += amount;
    }

    // Create balanced journal entry
    const entry: Omit<FaapJournalEntry, 'id' | 'entryNumber' | 'status'> = {
      date: new Date().toISOString().split('T')[0],
      memo: `[${sourceProduct}] ${memo}`,
      lines: [
        { accountCode: debitAccount, debit: amount, credit: 0, description: `Source: ${sourceProduct}` },
        { accountCode: creditAccount, debit: 0, credit: amount, description: `Source: ${sourceProduct}` }
      ],
      totalDebit: amount,
      totalCredit: amount
    };

    return this.postJournal(entry);
  }

  // Aliases for compatibility across sovereign products
  public getJournals() { return this.getJournalEntries(); }

  public verifyLedgerParity(): { totalDebits: number; totalCredits: number; offset: number; balanced: boolean } {
    let totalDebits = 0;
    let totalCredits = 0;
    for (const j of this.journals) {
      totalDebits += j.totalDebit;
      totalCredits += j.totalCredit;
    }
    const offset = Math.abs(totalDebits - totalCredits);
    return {
      totalDebits,
      totalCredits,
      offset,
      balanced: offset === 0
    };
  }
}

export type JournalEntry = FaapJournalEntry;
export type Account = FaapAccount;

