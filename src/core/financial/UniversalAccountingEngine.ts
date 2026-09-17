// ============================================================================
// UNIVERSAL ACCOUNTING ENGINE: DOUBLE-ENTRY IMMUTABILITY & PARITY
// ============================================================================

import { JUMODBEngine } from "../../database/db";

export interface JournalLine {
  ledger_account_id: string;
  debit_minor: number;
  credit_minor: number;
  dimensions?: Record<string, string>;
}

export interface JournalEntry {
  id: string;
  tenant_id: string;
  workspace_id: string;
  fiscal_period_id?: string;
  posting_date: string;
  document_date?: string;
  reference: string;
  description: string;
  source: string;
  currency_code: string;
  exchange_rate: number;
  lines: JournalLine[];
}

export class UniversalAccountingEngine {
  private db: JUMODBEngine;

  constructor() {
    this.db = JUMODBEngine.getInstance();
  }

  /**
   * Post a balanced journal entry to the general ledger.
   * Enforces strict SUM(debits) = SUM(credits) verification.
   */
  public async postJournal(entry: JournalEntry): Promise<{ success: boolean; id: string }> {
    const totalDebit = entry.lines.reduce((sum, line) => sum + line.debit_minor, 0);
    const totalCredit = entry.lines.reduce((sum, line) => sum + line.credit_minor, 0);

    if (totalDebit !== totalCredit) {
      throw new Error(`Double-entry violation: Total debits (${totalDebit}) must equal total credits (${totalCredit}).`);
    }

    if (totalDebit === 0) {
      throw new Error("Cannot post a zero-amount journal entry.");
    }

    // Atomic persistence using existing DB engine
    this.db.insert("journal_entries", {
      id: entry.id,
      tenant_id: entry.tenant_id,
      workspace_id: entry.workspace_id,
      fiscal_period_id: entry.fiscal_period_id,
      posting_date: entry.posting_date,
      document_date: entry.document_date,
      reference: entry.reference,
      description: entry.description,
      source: entry.source,
      currency_code: entry.currency_code,
      exchange_rate: entry.exchange_rate,
      status: "POSTED",
      created_at: new Date().toISOString()
    });

    for (const line of entry.lines) {
      const lineId = `L-${entry.id}-${Math.random().toString(36).substr(2, 9)}`;
      this.db.insert("journal_lines", {
        id: lineId,
        tenant_id: entry.tenant_id,
        journal_entry_id: entry.id,
        ledger_account_id: line.ledger_account_id,
        debit_minor: line.debit_minor,
        credit_minor: line.credit_minor,
        dimensions: line.dimensions || {}
      });

      // Update Ledger Balance
      const account = this.db.select<any>("ledger_accounts", (a) => 
        (a.id === line.ledger_account_id || a.code === line.ledger_account_id) && 
        (a.tenant_id === entry.tenant_id || !a.tenant_id)
      )[0];
      if (!account) throw new Error(`Ledger account not found: ${line.ledger_account_id}`);

      this.db.update(
        "ledger_accounts",
        (a: any) => (a.id === line.ledger_account_id || a.code === line.ledger_account_id) && (a.tenant_id === entry.tenant_id || !a.tenant_id),
        (item: any) => ({
          ...item,
          balance_minor: (item.balance_minor || 0) + line.debit_minor - line.credit_minor
        })
      );
    }

    this.db.save();
    return { success: true, id: entry.id };
  }

  /**
   * Reverse a journal entry. 
   * Never mutates historical data; creates a perfect offset entry.
   */
  public async reverseJournal(journalId: string, tenantId: string, reason: string): Promise<{ success: boolean; id: string }> {
    const original = this.db.select<any>("journal_entries", (j) => j.id === journalId && j.tenant_id === tenantId)[0];
    if (!original) throw new Error(`Journal entry ${journalId} not found.`);

    const originalLines = this.db.select<any>("journal_lines", (l) => l.journal_entry_id === journalId && l.tenant_id === tenantId);

    const reversalId = `REV-${journalId}-${Date.now()}`;
    const reversalLines = originalLines.map((line: any) => ({
      ledger_account_id: line.ledger_account_id,
      debit_minor: line.credit_minor,
      credit_minor: line.debit_minor,
      dimensions: line.dimensions
    }));

    return this.postJournal({
      ...original,
      id: reversalId,
      reference: `REVERSAL OF ${original.reference}`,
      description: `Reversal: ${reason}. Original Ref: ${original.id}`,
      posting_date: new Date().toISOString().split("T")[0],
      reversal_id: original.id,
      lines: reversalLines
    });
  }
}
