// ============================================================================
// UNIVERSAL CONFIGURATION & METADATA REGISTRY
// ============================================================================

import { JUMODBEngine } from "../../database/db";

export interface MetricDefinition {
  id: string;
  label: string;
  key: string; // The property key in the aggregated data object
  dataType: "MONEY" | "NUMBER" | "PERCENTAGE" | "COUNT";
  description?: string;
  visibility: "PUBLIC" | "PRIVATE" | "ROLE_RESTRICTED";
}

export interface TenantConfig {
  tenantId: string;
  classification: string;
  baseCurrency: string;
  terminology: {
    partyLabel: string;
    idLabel: string;
    itemLabel: string;
    metricsHeader: string;
  };
  accounts: {
    clearing: string;
    receivables: string;
    payables: string;
    wallets: string;
    revenue: string;
  };
  metrics: MetricDefinition[];
  dashboardModules: string[];
}

export class ConfigEngine {
  private db: JUMODBEngine;

  constructor() {
    this.db = JUMODBEngine.getInstance();
  }

  /**
   * Retrieves full tenant configuration metadata.
   * In a production environment, this would pull from the 'tenants' table settings JSONB.
   */
  public getConfig(tenantId: string): TenantConfig {
    const tenant = this.db.select<any>("tenants", (t) => t.id === tenantId)[0];
    if (!tenant) throw new Error(`Tenant ${tenantId} not found.`);

    // Derive or merge defaults from settings JSONB
    const defaults: Partial<TenantConfig> = {
      baseCurrency: tenant.base_currency || "UGX",
      classification: tenant.classification,
      terminology: {
        partyLabel: "Counterparty",
        idLabel: "Reference ID",
        itemLabel: "Open Item",
        metricsHeader: "Performance Overview"
      },
      metrics: [
        { id: "M1", label: "Active Counterparties", key: "totalParties", dataType: "COUNT", visibility: "PUBLIC" },
        { id: "M2", label: "Total Outstanding", key: "totalDues", dataType: "MONEY", visibility: "PUBLIC" },
        { id: "M3", label: "Settled Revenue", key: "clearedDues", dataType: "MONEY", visibility: "PUBLIC" },
        { id: "M4", label: "Wallet Liabilities", key: "walletLiabilities", dataType: "MONEY", visibility: "PRIVATE" }
      ],
      accounts: {
        clearing: "1030-CLEARING-TRANSIT",
        receivables: "1200-RECEIVABLES-CONTROL",
        payables: "2100-PAYABLES-CONTROL",
        wallets: "2020-FLOATING-LIABILITIES",
        revenue: "4010-REVENUE"
      }
    };

    return {
      ...defaults,
      ...tenant.settings
    } as TenantConfig;
  }
}
