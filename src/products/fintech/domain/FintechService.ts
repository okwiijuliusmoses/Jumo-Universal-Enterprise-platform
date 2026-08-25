import { FaapService } from '../../faap/domain/FaapService';

export type WorkflowStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_REVIEW';

export interface SaccoMember {
  id: string;
  name: string;
  memberNumber: string;
  phone?: string;
  savingsBalance: number;
  loanBalance: number;
  shares: number;
  status: WorkflowStatus;
}

export interface SaccoLoan {
  id: string;
  memberId: string;
  memberName: string;
  purpose?: string;
  amount: number;
  monthlyInstallment?: number;
  interestRate: number;
  tenureMonths: number;
  status: WorkflowStatus;
  disbursedDate?: string;
}

export interface TreasuryAsset {
  id: string;
  name: string;
  type: 'CASH' | 'EQUITY' | 'BOND' | 'REAL_ESTATE';
  currency?: string;
  yieldRate?: number;
  valuation: number;
  lastAudited: string;
}

export interface VoteBookEntry {
  id: string;
  voteCode: string;
  voteName: string;
  department: string;
  annualBudget: number;
  commitments: number;
  expenditure: number;
  balanceAvailable: number;
  status: string;
}

export interface VoteEncumbrance {
  id: string;
  voteCode: string;
  reference: string;
  vendorName: string;
  description: string;
  amount: number;
  date: string;
  status: 'COMMITTED' | 'EXPENSED' | 'RELEASED';
}

export interface FinancialReconciliationItem {
  id: string;
  source: string;
  transactionRef: string;
  statementDate: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  matchedJournalId?: string;
  status: 'MATCHED' | 'UNRECONCILED' | 'VARIANCE_FLAGGED';
}

export interface AuditTrailEvent {
  id: string;
  action: string;
  module: string;
  actor: string;
  role: string;
  details: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL' | 'SECURITY';
  integrityHash: string;
  timestamp: string;
}

export interface PaymentSwitchTx {
  id: string;
  ref: string;
  payerName: string;
  channel: string;
  grossAmount: number;
  clearingFee: number;
  netSettlement: number;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  date: string;
}

export interface TaxFilingRecord {
  id: string;
  period: string;
  taxType: string;
  grossRevenue: number;
  taxPayable: number;
  filingRef: string;
  status: 'SETTLED' | 'PENDING';
  dueDate: string;
}

export class FintechService {
  private static instance: FintechService;
  private faapService = FaapService.getInstance();

  private members: SaccoMember[] = [
    { id: 'MEM-001', name: 'John Doe', memberNumber: 'SAC-2026-001', phone: '+256772111001', savingsBalance: 2500000, loanBalance: 0, shares: 50, status: 'APPROVED' },
    { id: 'MEM-002', name: 'Jane Smith', memberNumber: 'SAC-2026-002', phone: '+256701222002', savingsBalance: 1200000, loanBalance: 5000000, shares: 100, status: 'APPROVED' }
  ];

  private loans: SaccoLoan[] = [
    { id: 'LOAN-001', memberId: 'MEM-002', memberName: 'Jane Smith', purpose: 'Agricultural Expansion', amount: 5000000, monthlyInstallment: 440000, interestRate: 12, tenureMonths: 12, status: 'APPROVED', disbursedDate: '2026-08-01' }
  ];

  private assets: TreasuryAsset[] = [
    { id: 'AST-001', name: 'Main Treasury Vault', type: 'CASH', currency: 'UGX', yieldRate: 0, valuation: 420500000, lastAudited: new Date().toISOString() },
    { id: 'AST-002', name: 'Government Treasury Bonds 10Y', type: 'BOND', currency: 'UGX', yieldRate: 14.5, valuation: 1500000000, lastAudited: new Date().toISOString() }
  ];

  private voteBook: VoteBookEntry[] = [
    { id: 'VB-01', voteCode: 'VOTE-FIN-101', voteName: 'Switch Operations & Cloud Interconnect', department: 'Fintech Operations', annualBudget: 500000000, commitments: 45000000, expenditure: 210000000, balanceAvailable: 245000000, status: 'ACTIVE' },
    { id: 'VB-02', voteCode: 'VOTE-FIN-102', voteName: 'Regulatory Compliance & Audit Retainers', department: 'Risk & Legal', annualBudget: 150000000, commitments: 15000000, expenditure: 40000000, balanceAvailable: 95000000, status: 'ACTIVE' },
    { id: 'VB-03', voteCode: 'VOTE-FIN-103', voteName: 'Treasury Yield Reinvestment & Fixed Deposit', department: 'Treasury', annualBudget: 800000000, commitments: 0, expenditure: 600000000, balanceAvailable: 200000000, status: 'ACTIVE' }
  ];

  private voteEncumbrances: VoteEncumbrance[] = [
    { id: 'ENC-001', voteCode: 'VOTE-FIN-101', reference: 'REQ-2026-091', vendorName: 'Uganda Telecom Cloud Hub', description: 'SMS Gateway Aggregator Monthly Quota', amount: 45000000, date: '2026-08-15', status: 'COMMITTED' },
    { id: 'ENC-002', voteCode: 'VOTE-FIN-102', reference: 'REQ-2026-088', vendorName: 'KPMG Compliance Advisory', description: 'Statutory AML Certification Retainer', amount: 15000000, date: '2026-08-10', status: 'COMMITTED' }
  ];

  private reconciliationFeeds: FinancialReconciliationItem[] = [
    { id: 'RC-001', source: 'MTN_MOMO', transactionRef: 'MOMO-994120', statementDate: '2026-08-22', amount: 12500000, type: 'CREDIT', matchedJournalId: 'JE-2026-001', status: 'MATCHED' },
    { id: 'RC-002', source: 'AIRTEL_MONEY', transactionRef: 'AIR-883109', statementDate: '2026-08-22', amount: 8400000, type: 'CREDIT', status: 'UNRECONCILED' },
    { id: 'RC-003', source: 'STANBIC_BANK', transactionRef: 'EFT-771029', statementDate: '2026-08-21', amount: 45000000, type: 'DEBIT', matchedJournalId: 'JE-2026-002', status: 'MATCHED' },
    { id: 'RC-004', source: 'DIGITAL_PAY_SWITCH', transactionRef: 'SWT-665201', statementDate: '2026-08-23', amount: 18200000, type: 'CREDIT', status: 'UNRECONCILED' }
  ];

  private auditTrails: AuditTrailEvent[] = [
    { id: 'AUD-001', action: 'TREASURY_ALLOCATION', module: 'FINTECH_TREASURY', actor: 'cfo@jumo.enterprise', role: 'ROLE_CFO', details: 'Allocated 1.5B UGX into 10-Year Treasury Bonds (14.5% yield)', severity: 'INFO', integrityHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', timestamp: new Date().toISOString() },
    { id: 'AUD-002', action: 'AML_SANCTION_PASS', module: 'FINTECH_COMPLIANCE', actor: 'compliance@jumo.enterprise', role: 'ROLE_COMPLIANCE_OFFICER', details: 'Passed automatic PEP & Sanctions check for Member MEM-002', severity: 'SECURITY', integrityHash: '879949605330e79ec3643fb46da8a096c4d7d11704620f4c9354eead983226a3', timestamp: new Date().toISOString() }
  ];

  private switchTransactions: PaymentSwitchTx[] = [
    { id: 'TX-9041', ref: 'SWT-2026-9041', payerName: 'Dr. Arthur Mugisha', channel: 'MTN_MOMO', grossAmount: 500000, clearingFee: 7500, netSettlement: 492500, status: 'COMPLETED', date: '2026-08-23 09:12' },
    { id: 'TX-9042', ref: 'SWT-2026-9042', payerName: 'Greenhill Academy PTA', channel: 'BANK_EFT', grossAmount: 12000000, clearingFee: 180000, netSettlement: 11820000, status: 'COMPLETED', date: '2026-08-23 09:20' }
  ];

  private taxFilings: TaxFilingRecord[] = [
    { id: 'TAX-001', period: '2026-07', taxType: 'VAT (18%)', grossRevenue: 150000000, taxPayable: 27000000, filingRef: 'PRN-URA-2026-9041', status: 'SETTLED', dueDate: '2026-08-15' },
    { id: 'TAX-002', period: '2026-07', taxType: 'PAYE (30%)', grossRevenue: 85000000, taxPayable: 25500000, filingRef: 'PRN-URA-2026-9042', status: 'SETTLED', dueDate: '2026-08-15' },
    { id: 'TAX-003', period: '2026-07', taxType: 'WHT (6%)', grossRevenue: 40000000, taxPayable: 2400000, filingRef: 'PRN-URA-2026-9043', status: 'PENDING', dueDate: '2026-08-30' }
  ];

  private constructor() {}

  public static getInstance(): FintechService {
    if (!FintechService.instance) {
      FintechService.instance = new FintechService();
    }
    return FintechService.instance;
  }

  // --- MEMBERS & LOANS ---
  getMembers() { return this.members; }

  registerMember(data: any) {
    const member: SaccoMember = {
      id: `MEM-${(this.members.length + 1).toString().padStart(3, '0')}`,
      name: data.name,
      memberNumber: `SAC-2026-${(this.members.length + 1).toString().padStart(3, '0')}`,
      phone: data.phone || '+256700000000',
      savingsBalance: Number(data.savingsBalance || 0),
      loanBalance: 0,
      shares: Number(data.shares || 10),
      status: 'APPROVED'
    };
    this.members.push(member);
    return member;
  }

  approveMember(id: string) {
    const mem = this.members.find(m => m.id === id);
    if (mem) mem.status = 'APPROVED';
  }

  requestLoan(memberId: string, amount: number, purpose?: string) {
    const member = this.members.find(m => m.id === memberId);
    if (!member) throw new Error('Member not found');

    const loan: SaccoLoan = {
      id: `LOAN-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      memberId,
      memberName: member.name,
      purpose: purpose || 'Cooperative Development',
      amount,
      monthlyInstallment: Math.round((amount * 1.12) / 12),
      interestRate: 12,
      tenureMonths: 12,
      status: 'PENDING'
    };
    this.loans.push(loan);
    return loan;
  }

  getLoans() { return this.loans; }

  approveLoan(id: string) {
    const loan = this.loans.find(l => l.id === id);
    if (loan && loan.status === 'PENDING') {
      loan.status = 'APPROVED';
      loan.disbursedDate = new Date().toISOString();

      const member = this.members.find(m => m.id === loan.memberId);
      if (member) member.loanBalance += loan.amount;

      this.faapService.postUniversalTransaction({
        sourceProduct: 'FINTECH',
        memo: `SACCO Loan Disbursement: ${loan.memberName}`,
        debitAccount: '1020',
        creditAccount: '1010',
        amount: loan.amount
      });
    }
  }

  // --- TREASURY ASSETS ---
  getAssets() { return this.assets; }

  addTreasuryAsset(data: any) {
    const asset: TreasuryAsset = {
      id: `AST-${(this.assets.length + 1).toString().padStart(3, '0')}`,
      name: data.name,
      type: data.type || 'CASH',
      currency: data.currency || 'UGX',
      yieldRate: Number(data.yieldRate || 0),
      valuation: Number(data.valuation || 0),
      lastAudited: new Date().toISOString()
    };
    this.assets.push(asset);
    return asset;
  }

  // --- VOTE BOOK & ENCUMBRANCE ---
  getVoteBook() { return this.voteBook; }
  getVoteEncumbrances() { return this.voteEncumbrances; }

  commitVoteEncumbrance(voteCode: string, reference: string, description: string, amount: number, vendorName?: string) {
    const vote = this.voteBook.find(v => v.voteCode === voteCode);
    if (!vote) throw new Error('Vote code not found');
    if (vote.balanceAvailable < amount) throw new Error('Insufficient vote allocation');

    vote.commitments += amount;
    vote.balanceAvailable -= amount;

    const enc: VoteEncumbrance = {
      id: `ENC-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      voteCode,
      reference,
      vendorName: vendorName || 'Authorized Vendor',
      description,
      amount,
      status: 'COMMITTED',
      date: new Date().toISOString().split('T')[0]
    };
    this.voteEncumbrances.push(enc);
    return enc;
  }

  expenseVoteEncumbrance(encId: string) {
    const enc = this.voteEncumbrances.find(e => e.id === encId);
    if (!enc || enc.status !== 'COMMITTED') return;
    const vote = this.voteBook.find(v => v.voteCode === enc.voteCode);
    if (vote) {
      vote.commitments -= enc.amount;
      vote.expenditure += enc.amount;
    }
    enc.status = 'EXPENSED';

    this.faapService.postUniversalTransaction({
      sourceProduct: 'FINTECH',
      memo: `Vote Book Expenditure: ${enc.description} (${enc.reference})`,
      debitAccount: '6010',
      creditAccount: '1010',
      amount: enc.amount
    });
  }

  releaseVoteEncumbrance(encId: string) {
    const enc = this.voteEncumbrances.find(e => e.id === encId);
    if (!enc || enc.status !== 'COMMITTED') return;
    const vote = this.voteBook.find(v => v.voteCode === enc.voteCode);
    if (vote) {
      vote.commitments -= enc.amount;
      vote.balanceAvailable += enc.amount;
    }
    enc.status = 'RELEASED';
  }

  // --- RECONCILIATION ---
  getReconciliationFeeds() { return this.reconciliationFeeds; }

  reconcileFeedItem(id: string, matchedJournalId?: string) {
    const feed = this.reconciliationFeeds.find(f => f.id === id);
    if (feed) {
      feed.status = 'MATCHED';
      if (matchedJournalId) feed.matchedJournalId = matchedJournalId;
    }
  }

  importStatementFeed(data: { source: string; transactionRef: string; statementDate?: string; amount: number; type: 'CREDIT' | 'DEBIT' }) {
    const item: FinancialReconciliationItem = {
      id: `RC-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      source: data.source,
      transactionRef: data.transactionRef,
      statementDate: data.statementDate || new Date().toISOString().split('T')[0],
      amount: data.amount,
      type: data.type,
      status: 'UNRECONCILED'
    };
    this.reconciliationFeeds.unshift(item);
    return item;
  }

  // --- AUDIT TRAILS ---
  getAuditTrails() { return this.auditTrails; }

  // --- PAYMENT SWITCH ---
  getSwitchTransactions() { return this.switchTransactions; }

  processSwitchPayment(data: { payerName: string; channel: string; amount: number; sourceAccount?: string; destinationAccount?: string }) {
    const { payerName, channel, amount } = data;
    const fee = Math.round(amount * 0.015);
    const net = amount - fee;
    const tx: PaymentSwitchTx = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      ref: `SWT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      payerName,
      channel,
      grossAmount: amount,
      clearingFee: fee,
      netSettlement: net,
      status: 'COMPLETED',
      date: new Date().toLocaleTimeString()
    };
    this.switchTransactions.unshift(tx);

    this.faapService.postUniversalTransaction({
      sourceProduct: 'FINTECH',
      memo: `JUMO Switch Settlement: ${payerName} (Fee 1.5%)`,
      debitAccount: '1010',
      creditAccount: '4010',
      amount: fee
    });

    return tx;
  }

  // --- TAX FILINGS ---
  getTaxFilings() { return this.taxFilings; }

  fileTaxReturn(taxType: string, period: string, grossRevenue: number, taxRate?: number) {
    const rate = (taxRate || 18) / 100;
    const taxPayable = Math.round(grossRevenue * rate);
    const filing: TaxFilingRecord = {
      id: `TAX-${Math.floor(100 + Math.random() * 900)}`,
      period,
      taxType,
      grossRevenue,
      taxPayable,
      filingRef: `PRN-URA-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'SETTLED',
      dueDate: new Date().toISOString().split('T')[0]
    };
    this.taxFilings.unshift(filing);
    return filing;
  }
}
