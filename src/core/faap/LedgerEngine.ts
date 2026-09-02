import { JournalRecord, LedgerEntryRecord, LedgerAccountRecord, AccountingPeriodRecord } from "../../models/models";
import { db } from "../../database/db";
import { LedgerRepository, AuditLogRepository } from "../../repositories/repositories";

export class LedgerEngine {
  /**
   * Validates a journal entry for double-entry consistency.
   * SUM(debits) must equal SUM(credits)
   */
  static validateBalance(entries: Omit<LedgerEntryRecord, "id" | "journalId">[]): boolean {
    if (entries.length < 2) return false;
    
    const totalDebits = entries.reduce((sum, entry) => sum + (entry.debit || 0), 0);
    const totalCredits = entries.reduce((sum, entry) => sum + (entry.credit || 0), 0);
    
    return Math.abs(totalDebits - totalCredits) < 0.001;
  }

  /**
   * Checks if an accounting period is open for a given date.
   */
  static isPeriodOpen(date: string): boolean {
    const targetDate = new Date(date);
    const periods = db.select<AccountingPeriodRecord>("accounting_periods");
    
    const activePeriod = periods.find(p => {
      const start = new Date(p.startDate);
      const end = new Date(p.endDate);
      return targetDate >= start && targetDate <= end && (p.status === "Open" || p.status === "Permanent");
    });

    return !!activePeriod;
  }

  /**
   * Verifies that all accounts involved in the transaction are Active.
   */
  static verifyAccounts(entries: Omit<LedgerEntryRecord, "id" | "journalId">[]): void {
    for (const entry of entries) {
      const account = LedgerRepository.findAccountByCode(entry.accountId);
      if (!account) {
        throw new Error(`Account Not Found: Account code '${entry.accountId}' does not exist.`);
      }
      if (account.status !== "Active") {
        throw new Error(`Account Inactive: Account '${account.name}' (${account.code}) is status '${account.status}'.`);
      }
    }
  }

  /**
   * Saves a journal entry in Draft status.
   * Minimal validation performed at this stage (basic field check).
   */
  static async saveDraft(
    journal: Omit<JournalRecord, "id" | "createdAt" | "status">,
    entries: Omit<LedgerEntryRecord, "id" | "journalId">[]
  ): Promise<JournalRecord> {
    const journalId = `JRN-DFT-${Date.now()}`;
    
    const journalRecord: JournalRecord = {
      ...journal,
      id: journalId,
      status: "draft",
      createdAt: new Date().toISOString()
    };

    db.insert<JournalRecord>("journals", journalRecord);

    for (const entry of entries) {
      const entryRecord: LedgerEntryRecord = {
        ...entry,
        id: `ENT-DFT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        journalId: journalId
      };
      db.insert<LedgerEntryRecord>("ledger_entries", entryRecord);
    }

    AuditLogRepository.log("FAAP_ENGINE", "DRAFT_SAVED", `Draft Journal ${journalId} saved.`, "success");
    return journalRecord;
  }

  /**
   * Formal Approval & Posting Workflow
   * Transitions a DRAFT journal to POSTED status.
   * Performs full financial validation (Balance, Period, Account Status).
   */
  static async approveAndPost(journalId: string): Promise<JournalRecord> {
    const journals = db.select<JournalRecord>("journals", j => j.id === journalId);
    if (journals.length === 0) throw new Error(`Journal ${journalId} not found.`);
    
    const journal = journals[0];
    if (journal.status !== "draft") throw new Error(`Journal ${journalId} is already ${journal.status}.`);

    const entries = db.select<LedgerEntryRecord>("ledger_entries", e => e.journalId === journalId);

    // 1. Full Validation Suite
    if (!this.validateBalance(entries)) throw new Error("Ledger Imbalance: Draft totals do not match.");
    if (!this.isPeriodOpen(journal.date)) throw new Error("Period Closed: Cannot post to this date.");
    this.verifyAccounts(entries);

    // 2. Perform Posting
    try {
      for (const entry of entries) {
        const account = LedgerRepository.findAccountByCode(entry.accountId);
        if (account) {
          const delta = entry.debit - entry.credit;
          LedgerRepository.updateBalance(account.code, delta, account.category);
        }
      }

      // 3. Update Status
      const updatedJournal = { ...journal, status: "posted" };
      db.update<JournalRecord>("journals", j => j.id === journalId, () => updatedJournal);

      AuditLogRepository.log("FAAP_POSTING_ENGINE", "LEDGER_APPROVED", `Journal ${journalId} approved and posted.`, "success");
      return updatedJournal;
    } catch (err: any) {
      AuditLogRepository.log("FAAP_POSTING_ENGINE", "APPROVAL_FAILED", err.message, "failed");
      throw err;
    }
  }

  /**
   * Atomic Posting Operation
   * Enforces period checks, account status, and double-entry balance.
   */
  static async postJournal(
    journal: Omit<JournalRecord, "id" | "createdAt" | "status">,
    entries: Omit<LedgerEntryRecord, "id" | "journalId">[]
  ): Promise<JournalRecord> {
    // 1. Balance Check
    if (!this.validateBalance(entries)) {
      throw new Error("Ledger Imbalance: Total Debits must equal Total Credits.");
    }

    // 2. Period Check
    if (!this.isPeriodOpen(journal.date)) {
      throw new Error(`Period Closed: The date ${journal.date} falls within a closed or undefined accounting period.`);
    }

    // 3. Account Status Check
    this.verifyAccounts(entries);

    const journalId = `JRN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    const journalRecord: JournalRecord = {
      ...journal,
      id: journalId,
      status: "posted",
      createdAt: new Date().toISOString()
    };

    // Begin "Atomic" operation (Local state first, then commit to persistence)
    // In our hybrid environment, the db.insert handles the local state sync.
    
    try {
      // 1. Insert Journal Header
      db.insert<JournalRecord>("journals", journalRecord);

      // 2. Process Entries
      for (const entry of entries) {
        const entryRecord: LedgerEntryRecord = {
          ...entry,
          id: `ENT-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          journalId: journalId
        };
        
        db.insert<LedgerEntryRecord>("ledger_entries", entryRecord);

        // 3. Update Account Balance
        const account = LedgerRepository.findAccountByCode(entry.accountId);
        if (account) {
          const delta = entry.debit - entry.credit;
          LedgerRepository.updateBalance(account.code, delta, account.category);
        }
      }

      // 4. Audit Log
      AuditLogRepository.log(
        "FAAP_POSTING_ENGINE",
        "LEDGER_POST",
        `Journal ${journalId} posted. Ref: ${journal.reference}. Debits: ${entries.reduce((s, e) => s + e.debit, 0)}`,
        "success"
      );

      return journalRecord;
    } catch (err: any) {
      // Manual rollback if needed (since our db tool doesn't support transactions yet)
      // In this specific mock environment, we report the error.
      AuditLogRepository.log("FAAP_POSTING_ENGINE", "LEDGER_POST_FAILED", err.message, "failed");
      throw err;
    }
  }

  /**
   * Recalculates all balances from the ground up based on ledger entries.
   * Used for deep integrity checks.
   */
  static integrityCheck(): Record<string, number> {
    const entries = db.select<LedgerEntryRecord>("ledger_entries");
    const balances: Record<string, number> = {};

    for (const entry of entries) {
      const delta = entry.debit - entry.credit;
      balances[entry.accountId] = (balances[entry.accountId] || 0) + delta;
    }

    return balances;
  }
}
