// ============================================================================
// UNIVERSAL REPORTING ENGINE: AUTHORITATIVE DATA AGGREGATION
// ============================================================================

import { JUMODBEngine } from "../../database/db";
import { ConfigEngine } from "./ConfigEngine";

export class ReportingEngine {
  private db: JUMODBEngine;
  private config: ConfigEngine;

  constructor() {
    this.db = JUMODBEngine.getInstance();
    this.config = new ConfigEngine();
  }

  /**
   * Aggregates authoritative metrics for the dashboard.
   * Derives values from ledger accounts and open items.
   */
  public getDashboardMetrics(tenantId: string) {
    const cfg = this.config.getConfig(tenantId);
    
    const parties = this.db.select<any>("parties", (p) => p.tenant_id === tenantId);
    const accounts = this.db.select<any>("ledger_accounts", (a) => a.tenant_id === tenantId);
    const openItems = this.db.select<any>("open_items", (i) => i.tenant_id === tenantId);

    // Dynamic aggregation based on universal primitives
    const metrics: Record<string, number> = {
      totalParties: parties.length,
      totalDues: openItems.reduce((sum, i) => sum + i.amount_minor, 0),
      clearedDues: openItems.reduce((sum, i) => sum + (i.amount_minor - i.remaining_minor), 0),
      walletLiabilities: accounts.find(a => a.code === cfg.accounts.wallets)?.balance_minor || 0
    };

    return {
      config: cfg,
      values: metrics
    };
  }

  /**
   * Generates a standard Trial Balance report.
   */
  public getTrialBalance(tenantId: string) {
    const accounts = this.db.select<any>("ledger_accounts", (a) => a.tenant_id === tenantId);
    return accounts.map(a => ({
      code: a.code,
      name: a.name,
      type: a.account_type,
      balance: a.balance_minor
    }));
  }
}
