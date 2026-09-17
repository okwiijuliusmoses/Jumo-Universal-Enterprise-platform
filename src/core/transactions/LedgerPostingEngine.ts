
import { LedgerEngine } from "../faap/LedgerEngine";
import { LedgerEntryRecord } from "../../models/models";

export class LedgerPostingEngine {
  static validate(entries: Omit<LedgerEntryRecord, "id" | "journalId">[]) {
    return LedgerEngine.validateBalance(entries);
  }
}
