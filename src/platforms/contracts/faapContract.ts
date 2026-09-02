/**
 * JUMO UEOS — Sovereign FAAP Contract Layer
 * Defines the public contract through which sovereign products (Church, Fintech, School ERPs)
 * bind to the statutory General Ledger, VoteBook Commitments, and CashBook Engine.
 */

import { faapEnterpriseEngine } from "../faap/faapEnterpriseEngine";
import { 
  Account, 
  JournalEntry, 
  CashBookEntry, 
  VoteBookRecord, 
  CommitmentVoucher, 
  ThreeWayMatchVoucher, 
  FeeSplitAllocation,
  CashBookType,
  AccountType
} from "../faap/faapEnterpriseTypes";

export interface IFAAPServiceContract {
  // Chart of Accounts
  getAccounts(): Account[];
  getAccount(id: string): Account | undefined;
  
  // Double-Entry Ledger
  recordJournal(
    reference: string,
    description: string,
    source: JournalEntry["source"],
    lines: Array<{
      accountId: string;
      description: string;
      debit: number;
      credit: number;
      currency?: string;
      voteCode?: string;
    }>,
    autoPost?: boolean
  ): JournalEntry;
  getJournals(): JournalEntry[];

  // Cash Book
  recordCashBook(
    bookType: CashBookType,
    particulars: string,
    voucherNo: string,
    cashDebit: number,
    cashCredit: number,
    bankDebit: number,
    bankCredit: number,
    discountDebit?: number,
    discountCredit?: number
  ): CashBookEntry;
  getCashBook(bookType?: CashBookType): CashBookEntry[];

  // Vote Book Commitments
  getVoteBooks(): VoteBookRecord[];
  getVoteBook(voteCode: string): VoteBookRecord | undefined;
  createCommitment(
    voteCode: string,
    requisitionNo: string,
    vendorName: string,
    description: string,
    amount: number
  ): CommitmentVoucher;

  // 3-Way Match Voucher
  createThreeWayMatch(
    vendorId: string,
    vendorName: string,
    poNo: string,
    grnNo: string,
    invoiceNo: string,
    poAmount: number,
    grnAmount: number,
    invoiceAmount: number
  ): ThreeWayMatchVoucher;
  getThreeWayMatchVouchers(): ThreeWayMatchVoucher[];

  // Fee Clearing Split
  processFeeSplit(
    transactionRef: string,
    grossAmount: number,
    currency?: string,
    platformFeeRate?: number
  ): FeeSplitAllocation;

  // Statements
  getFinancialStatements(): ReturnType<typeof faapEnterpriseEngine.getFinancialStatements>;
}

class FAAPServiceContractImpl implements IFAAPServiceContract {
  getAccounts(): Account[] {
    return faapEnterpriseEngine.getAccounts();
  }

  getAccount(id: string): Account | undefined {
    return faapEnterpriseEngine.getAccount(id);
  }

  recordJournal(
    reference: string,
    description: string,
    source: JournalEntry["source"],
    lines: Array<{
      accountId: string;
      description: string;
      debit: number;
      credit: number;
      currency?: string;
      voteCode?: string;
    }>,
    autoPost: boolean = false
  ): JournalEntry {
    return faapEnterpriseEngine.createJournalEntry(reference, description, source, lines, autoPost);
  }

  getJournals(): JournalEntry[] {
    return faapEnterpriseEngine.getJournals();
  }

  recordCashBook(
    bookType: CashBookType,
    particulars: string,
    voucherNo: string,
    cashDebit: number,
    cashCredit: number,
    bankDebit: number,
    bankCredit: number,
    discountDebit: number = 0,
    discountCredit: number = 0
  ): CashBookEntry {
    return faapEnterpriseEngine.recordCashBookEntry(
      bookType,
      particulars,
      voucherNo,
      cashDebit,
      cashCredit,
      bankDebit,
      bankCredit,
      discountDebit,
      discountCredit
    );
  }

  getCashBook(bookType?: CashBookType): CashBookEntry[] {
    return faapEnterpriseEngine.getCashBookEntries(bookType);
  }

  getVoteBooks(): VoteBookRecord[] {
    return faapEnterpriseEngine.getVoteBooks();
  }

  getVoteBook(voteCode: string): VoteBookRecord | undefined {
    return faapEnterpriseEngine.getVoteBook(voteCode);
  }

  createCommitment(
    voteCode: string,
    requisitionNo: string,
    vendorName: string,
    description: string,
    amount: number
  ): CommitmentVoucher {
    return faapEnterpriseEngine.createCommitmentVoucher(
      voteCode,
      requisitionNo,
      vendorName,
      description,
      amount
    );
  }

  createThreeWayMatch(
    vendorId: string,
    vendorName: string,
    poNo: string,
    grnNo: string,
    invoiceNo: string,
    poAmount: number,
    grnAmount: number,
    invoiceAmount: number
  ): ThreeWayMatchVoucher {
    return faapEnterpriseEngine.createThreeWayMatchVoucher(
      vendorId,
      vendorName,
      poNo,
      grnNo,
      invoiceNo,
      poAmount,
      grnAmount,
      invoiceAmount
    );
  }

  getThreeWayMatchVouchers(): ThreeWayMatchVoucher[] {
    return faapEnterpriseEngine.getThreeWayMatchVouchers();
  }

  processFeeSplit(
    transactionRef: string,
    grossAmount: number,
    currency: string = "UGX",
    platformFeeRate: number = 0.015
  ): FeeSplitAllocation {
    return faapEnterpriseEngine.processClearingFeeSplit(transactionRef, grossAmount, currency, platformFeeRate);
  }

  getFinancialStatements() {
    return faapEnterpriseEngine.getFinancialStatements();
  }
}

export const faapContract = new FAAPServiceContractImpl();
export const faapClient = faapContract;
