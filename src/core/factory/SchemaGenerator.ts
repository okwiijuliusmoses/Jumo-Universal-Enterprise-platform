/**
 * JUMO UEOS Schema Generator
 * 
 * Generates SQL & DDL schema contracts for isolated database planes.
 */

export interface GeneratedDatabaseSchemaContract {
  databasePlaneId: string;
  tables: { tableName: string; primaryKey: string; columns: string[]; indexes: string[] }[];
  isolationLevel: string;
  faapLedgerTable: string;
}

export class SchemaGenerator {
  static generateSchema(institutionId: string, modules: string[]): GeneratedDatabaseSchemaContract {
    const dbPlaneId = `db_plane_${institutionId.replace(/[^a-z0-9]/g, "_")}`;

    const tables = modules.map(m => {
      const tblName = `ueos_tbl_${m.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
      return {
        tableName: tblName,
        primaryKey: "id",
        columns: ["id VARCHAR(64) PRIMARY KEY", "tenant_id VARCHAR(64) NOT NULL", "record_code VARCHAR(128)", "payload JSONB", "created_at TIMESTAMP", "updated_at TIMESTAMP"],
        indexes: [`idx_${tblName}_tenant`, `idx_${tblName}_code`]
      };
    });

    // Add FAAP core ledger table
    tables.push({
      tableName: "ueos_faap_general_ledger",
      primaryKey: "id",
      columns: ["id VARCHAR(64) PRIMARY KEY", "tenant_id VARCHAR(64)", "voucher_number VARCHAR(64)", "debit_amount NUMERIC(18,2)", "credit_amount NUMERIC(18,2)", "account_code VARCHAR(32)", "posted_at TIMESTAMP"],
      indexes: ["idx_faap_ledger_tenant", "idx_faap_ledger_voucher"]
    });

    return {
      databasePlaneId: dbPlaneId,
      tables,
      isolationLevel: "Strict Tenant Row & Schema Isolation",
      faapLedgerTable: "ueos_faap_general_ledger"
    };
  }
}

export default SchemaGenerator;
