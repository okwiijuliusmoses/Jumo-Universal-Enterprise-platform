import { faapLedgerEngine } from "./ledger/FAAPLedgerEngine";
import type {
  FAAPAccount,
  FAAPJournal,
  FAAPRuntimeHealth,
} from "./types";

export class FAAPEnterpriseRuntime {
  readonly ledger = faapLedgerEngine;

  registerAccount(account: FAAPAccount) {
    return this.ledger.registerAccount(account);
  }

  createJournal(
    journal: Omit<FAAPJournal, "status" | "createdAt">,
  ) {
    return this.ledger.createJournal(journal);
  }

  approveJournal(id: string) {
    return this.ledger.approveJournal(id);
  }

  postJournal(id: string) {
    return this.ledger.postJournal(id);
  }

  reverseJournal(id: string) {
    return this.ledger.reverseJournal(id);
  }

  health(): FAAPRuntimeHealth {
    return {
      ledger: "healthy",
      reconciliation: "healthy",
      treasury: "healthy",
      documents: "healthy",
      hybridSync: "online",
      pendingOperations: 0,
    };
  }
}

export const faapEnterpriseRuntime = new FAAPEnterpriseRuntime();
