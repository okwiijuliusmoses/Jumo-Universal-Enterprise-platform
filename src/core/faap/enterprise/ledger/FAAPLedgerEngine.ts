import type {
  FAAPAccount,
  FAAPJournal,
  FAAPLedgerEntry,
} from "../types";

export class FAAPLedgerEngine {
  private readonly accounts = new Map<string, FAAPAccount>();
  private readonly journals = new Map<string, FAAPJournal>();

  registerAccount(account: FAAPAccount): FAAPAccount {
    this.accounts.set(account.id, account);
    return account;
  }

  getAccount(id: string): FAAPAccount | undefined {
    return this.accounts.get(id);
  }

  listAccounts(): FAAPAccount[] {
    return Array.from(this.accounts.values());
  }

  validateJournal(entries: FAAPLedgerEntry[]): void {
    if (!entries.length) {
      throw new Error("FAAP journal must contain at least one ledger entry");
    }

    const debit = entries.reduce((sum, entry) => sum + Number(entry.debit || 0), 0);
    const credit = entries.reduce((sum, entry) => sum + Number(entry.credit || 0), 0);

    if (Math.round(debit * 100) !== Math.round(credit * 100)) {
      throw new Error(
        `FAAP ledger imbalance: debit=${debit}, credit=${credit}`,
      );
    }

    for (const entry of entries) {
      if (entry.debit < 0 || entry.credit < 0) {
        throw new Error("FAAP ledger entries cannot contain negative amounts");
      }

      if (entry.debit > 0 && entry.credit > 0) {
        throw new Error(
          `FAAP entry ${entry.id} cannot contain both debit and credit`,
        );
      }

      if (!this.accounts.has(entry.accountId)) {
        throw new Error(`Unknown FAAP account: ${entry.accountId}`);
      }
    }
  }

  createJournal(
    journal: Omit<FAAPJournal, "status" | "createdAt">,
  ): FAAPJournal {
    this.validateJournal(journal.entries);

    const created: FAAPJournal = {
      ...journal,
      status: "draft",
      createdAt: new Date().toISOString(),
    };

    this.journals.set(created.id, created);
    return created;
  }

  approveJournal(id: string): FAAPJournal {
    const journal = this.requireJournal(id);

    if (journal.status !== "draft" && journal.status !== "pending") {
      throw new Error(`Journal ${id} cannot be approved from ${journal.status}`);
    }

    journal.status = "approved";
    return journal;
  }

  postJournal(id: string): FAAPJournal {
    const journal = this.requireJournal(id);

    if (journal.status !== "approved") {
      throw new Error(`Journal ${id} must be approved before posting`);
    }

    this.validateJournal(journal.entries);

    journal.status = "posted";
    journal.postedAt = new Date().toISOString();

    return journal;
  }

  reverseJournal(id: string): FAAPJournal {
    const journal = this.requireJournal(id);

    if (journal.status !== "posted") {
      throw new Error(`Only posted journal ${id} can be reversed`);
    }

    journal.status = "reversed";
    return journal;
  }

  getJournal(id: string): FAAPJournal | undefined {
    return this.journals.get(id);
  }

  listJournals(): FAAPJournal[] {
    return Array.from(this.journals.values());
  }

  getTrialBalance(): Array<{
    account: FAAPAccount;
    debit: number;
    credit: number;
  }> {
    const balances = new Map<string, { debit: number; credit: number }>();

    for (const journal of this.journals.values()) {
      if (journal.status !== "posted") continue;

      for (const entry of journal.entries) {
        const current = balances.get(entry.accountId) ?? {
          debit: 0,
          credit: 0,
        };

        current.debit += entry.debit;
        current.credit += entry.credit;

        balances.set(entry.accountId, current);
      }
    }

    return this.listAccounts().map((account) => ({
      account,
      ...(balances.get(account.id) ?? { debit: 0, credit: 0 }),
    }));
  }

  private requireJournal(id: string): FAAPJournal {
    const journal = this.journals.get(id);

    if (!journal) {
      throw new Error(`FAAP journal not found: ${id}`);
    }

    return journal;
  }
}

export const faapLedgerEngine = new FAAPLedgerEngine();
