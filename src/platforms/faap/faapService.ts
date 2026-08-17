// JUMO UEOS — FAAP Platform Compatibility Layer
import { faapEnterpriseRuntime, FAAPJournal } from "../../core/faap/faapService";

export interface FinancialTransaction {
  id: string;
  tenantId: string;
  amount: number;
  type: string;
  description: string;
  timestamp: string;
}

export class FAAPServiceCompat {
  private static history: FinancialTransaction[] = [
    { id: "tx-1", tenantId: "Global", amount: 250000, type: "DISBURSEMENT", description: "Agricultural grant batch", timestamp: "2026-04-01" },
    { id: "tx-2", tenantId: "Global", amount: 180000, type: "SETTLEMENT", description: "Inter-bank SACCO clearing", timestamp: "2026-04-02" }
  ];

  static getTransactionHistory(): FinancialTransaction[] {
    return this.history;
  }

  static getJournals(): FAAPJournal[] {
    return faapEnterpriseRuntime.listJournals();
  }
}

export const faapService = FAAPServiceCompat;
