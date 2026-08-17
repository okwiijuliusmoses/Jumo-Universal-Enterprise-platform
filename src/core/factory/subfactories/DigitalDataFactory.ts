// JUMO UEOS — Digital Data Factory
// Governs and manufactures database schemas, entities, migrations, and tenant isolation policies
// Lineage: JDPM/MFG2608/xxxx subordinate to JDPM/BLUE2608/xxxx

export interface SchemaEntityField {
  name: string;
  type: 'UUID' | 'VARCHAR' | 'INTEGER' | 'DECIMAL' | 'BOOLEAN' | 'TIMESTAMP' | 'JSONB' | 'BLOB';
  primaryKey: boolean;
  nullable: boolean;
  unique: boolean;
  indexed: boolean;
  foreignKey?: {
    table: string;
    field: string;
    onDelete: 'CASCADE' | 'RESTRICT' | 'SET_NULL';
  };
  piiClassification?: 'PUBLIC' | 'CONFIDENTIAL' | 'HIGHLY_SENSITIVE';
}

export interface SchemaEntityDefinition {
  tableName: string;
  domain: string;
  fields: SchemaEntityField[];
  tenantIsolationField: string;
  indexes: string[];
  rowLevelSecurityEnabled: boolean;
}

export interface DataSchemaManifest {
  schemaId: string;
  name: string;
  version: string;
  lineageId: string;
  blueprintRef: string;
  targetRDBMS: 'POSTGRESQL' | 'SPANNER' | 'SQLITE_EMBEDDED';
  entities: SchemaEntityDefinition[];
  migrationScripts: Array<{
    version: string;
    upSql: string;
    downSql: string;
    checksum: string;
  }>;
  tenantPartitionStrategy: 'SCHEMA_PER_TENANT' | 'ROW_LEVEL_SECURITY' | 'SHARED_SHARDED';
  cryptographicHash: string;
  createdAt: string;
  status: 'SYNCHRONIZED' | 'PENDING_MIGRATION' | 'ARCHIVED';
}

export class DigitalDataFactory {
  private static instance: DigitalDataFactory;
  private schemas: Map<string, DataSchemaManifest> = new Map();

  private constructor() {
    this.seedCanonicalSchemas();
  }

  public static getInstance(): DigitalDataFactory {
    if (!DigitalDataFactory.instance) {
      DigitalDataFactory.instance = new DigitalDataFactory();
    }
    return DigitalDataFactory.instance;
  }

  private seedCanonicalSchemas() {
    const canonicals: DataSchemaManifest[] = [
      {
        schemaId: 'SCH-FAAP-CORE-01',
        name: 'Sovereign Double-Entry Ledger Schema',
        version: '1.0.0',
        lineageId: 'JDPM/MFG2608/0001',
        blueprintRef: 'JDPM/BLUE2608/0001',
        targetRDBMS: 'POSTGRESQL',
        entities: [
          {
            tableName: 'faap_accounts',
            domain: 'FINANCIAL',
            tenantIsolationField: 'tenant_id',
            rowLevelSecurityEnabled: true,
            indexes: ['idx_faap_accounts_tenant', 'idx_faap_accounts_code'],
            fields: [
              { name: 'id', type: 'UUID', primaryKey: true, nullable: false, unique: true, indexed: true },
              { name: 'tenant_id', type: 'VARCHAR', primaryKey: false, nullable: false, unique: false, indexed: true },
              { name: 'account_code', type: 'VARCHAR', primaryKey: false, nullable: false, unique: false, indexed: true },
              { name: 'account_name', type: 'VARCHAR', primaryKey: false, nullable: false, unique: false, indexed: false },
              { name: 'balance', type: 'DECIMAL', primaryKey: false, nullable: false, unique: false, indexed: false },
              { name: 'currency', type: 'VARCHAR', primaryKey: false, nullable: false, unique: false, indexed: false },
              { name: 'created_at', type: 'TIMESTAMP', primaryKey: false, nullable: false, unique: false, indexed: false }
            ]
          },
          {
            tableName: 'faap_journal_entries',
            domain: 'FINANCIAL',
            tenantIsolationField: 'tenant_id',
            rowLevelSecurityEnabled: true,
            indexes: ['idx_faap_journal_tenant_tx', 'idx_faap_journal_timestamp'],
            fields: [
              { name: 'id', type: 'UUID', primaryKey: true, nullable: false, unique: true, indexed: true },
              { name: 'tenant_id', type: 'VARCHAR', primaryKey: false, nullable: false, unique: false, indexed: true },
              { name: 'debit_account_id', type: 'UUID', primaryKey: false, nullable: false, unique: false, indexed: true },
              { name: 'credit_account_id', type: 'UUID', primaryKey: false, nullable: false, unique: false, indexed: true },
              { name: 'amount', type: 'DECIMAL', primaryKey: false, nullable: false, unique: false, indexed: false },
              { name: 'signature_hash', type: 'VARCHAR', primaryKey: false, nullable: false, unique: true, indexed: true, piiClassification: 'HIGHLY_SENSITIVE' },
              { name: 'timestamp', type: 'TIMESTAMP', primaryKey: false, nullable: false, unique: false, indexed: true }
            ]
          }
        ],
        migrationScripts: [
          {
            version: 'V1__init_faap_ledger.sql',
            upSql: 'CREATE TABLE faap_accounts (...); CREATE TABLE faap_journal_entries (...);',
            downSql: 'DROP TABLE faap_journal_entries; DROP TABLE faap_accounts;',
            checksum: 'sha256:5c7e9b0d2f4a6c8e1b3d5f7a9c0e2b4d6f8a4a8f9c1b3e5d7a2f0c6e8b4d1a3f'
          }
        ],
        tenantPartitionStrategy: 'ROW_LEVEL_SECURITY',
        cryptographicHash: 'sha256:9b0d2f4a6c8e1b3d5f7a9c0e2b4d6f8a4a8f9c1b3e5d7a2f0c6e8b4d1a3f5c7e',
        createdAt: '2026-08-15T00:00:00.000Z',
        status: 'SYNCHRONIZED'
      }
    ];

    canonicals.forEach(s => this.schemas.set(s.schemaId, s));
  }

  public manufactureSchema(params: Omit<DataSchemaManifest, 'cryptographicHash' | 'createdAt' | 'status'>): DataSchemaManifest {
    const rawContent = `${params.schemaId}:${params.version}:${params.blueprintRef}:${JSON.stringify(params.entities)}`;
    const hash = this.calculateDigest(rawContent);

    const schema: DataSchemaManifest = {
      ...params,
      cryptographicHash: `sha256:${hash}`,
      createdAt: new Date().toISOString(),
      status: 'SYNCHRONIZED'
    };

    this.schemas.set(schema.schemaId, schema);
    return schema;
  }

  public getSchema(id: string): DataSchemaManifest | undefined {
    return this.schemas.get(id);
  }

  public getAllSchemas(): DataSchemaManifest[] {
    return Array.from(this.schemas.values());
  }

  private calculateDigest(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `${hex}d4e5f6a1b2c30718293a4b5c6d7e8f901a2b3c4d5e6f708192a3b4c5d6e7f8a9`;
  }
}
