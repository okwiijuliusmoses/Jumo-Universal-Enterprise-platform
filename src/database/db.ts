// JUMO UEOS Durable Local/Cloud Persistent Database Engine
// Hybrid PostgreSQL & Local Backup Persistence
import { UEOS_SCHEMAS } from "../schema/schema";

const isBrowser = typeof window !== "undefined";

let nodeFs: any = null;
let nodePath: any = null;
let PgPool: any = null;

if (!isBrowser) {
  try {
    // Using eval to hide require calls from Vite's static analysis
    nodeFs = eval('require("fs")');
    nodePath = eval('require("path")');
    PgPool = eval('require("pg")').Pool;
  } catch {
    // Node modules unavailable
  }
}

const getDBFilePath = () => {
  try {
    if (!isBrowser && nodePath && typeof process !== "undefined" && typeof process.cwd === "function") {
      return nodePath.join(process.cwd(), "assets", "ueos_database.json");
    }
  } catch (e) {
    // fallback
  }
  return "assets/ueos_database.json";
};

const DB_FILE_PATH = getDBFilePath();

export class JUMODBEngine {
  private static instance: JUMODBEngine;
  private data: Record<string, any[]> = {};
  private isInitialized = false;
  private pool: any = null;
  private usePostgres = false;

  private readyPromise: Promise<void>;
  private resolveReady!: () => void;

  private constructor() {
    this.readyPromise = new Promise((resolve) => {
      this.resolveReady = resolve;
    });
    this.initializeEngine();
  }

  public async waitUntilReady(): Promise<void> {
    return this.readyPromise;
  }

  public static getInstance(): JUMODBEngine {
    if (!JUMODBEngine.instance) {
      JUMODBEngine.instance = new JUMODBEngine();
    }
    return JUMODBEngine.instance;
  }

  public isPostgresConnected(): boolean {
    return this.usePostgres;
  }

  public getStorageMode(): string {
    return this.usePostgres ? "Production-Grade PostgreSQL (Cloud SQL)" : "Durable JSON Backup (Hybrid Mode)";
  }

  public getDiagnostics() {
    return {
      isPostgresConnected: this.usePostgres,
      storageMode: this.getStorageMode(),
      collections: Object.keys(this.data).map(k => ({
        name: k,
        count: this.data[k]?.length || 0
      })),
      backupFilePath: DB_FILE_PATH
    };
  }

  public async executeTestQuery(): Promise<void> {
    if (this.usePostgres && this.pool) {
      const client = await this.pool.connect();
      try {
        await client.query("SELECT 1");
      } finally {
        client.release();
      }
    }
  }

  public async closePool() {
    if (this.pool) {
      console.log("[DATABASE] Releasing PostgreSQL pool connections...");
      try {
        await this.pool.end();
        console.log("[DATABASE] PostgreSQL pool terminated successfully.");
      } catch (err: any) {
        console.error("[DATABASE_ERROR] Error terminating PostgreSQL pool:", err.message);
      }
      this.pool = null;
      this.usePostgres = false;
    }
  }

  private async initializeEngine() {
    if (this.isInitialized) return;

    // 1. Ensure assets directory exists for backup (Node environment only)
    try {
      if (!isBrowser && nodeFs && nodePath && typeof nodeFs.existsSync === "function") {
        const dir = nodePath.dirname(DB_FILE_PATH);
        if (!nodeFs.existsSync(dir)) {
          nodeFs.mkdirSync(dir, { recursive: true });
        }
      }
    } catch (err: any) {
      console.warn("[DATABASE_WARN] Directory initialization skipped:", err.message);
    }

    // 2. Initialize collections in memory
    for (const key of Object.keys(UEOS_SCHEMAS)) {
      this.data[key] = [];
    }

    // 3. Detect and establish PostgreSQL connection if variables exist (Node environment only)
    if (!isBrowser && typeof process !== "undefined" && PgPool) {
      const env = process.env || {};
      const host = env.SQL_HOST;
      const dbName = env.SQL_DB_NAME;
      const user = env.SQL_USER || env.SQL_ADMIN_USER;
      const password = env.SQL_PASSWORD || env.SQL_ADMIN_PASSWORD;

      if (host && dbName && user) {
        console.log(`[DATABASE] Production PostgreSQL host detected: ${host}. Initializing pool...`);
        try {
          this.pool = new PgPool({
            host,
            database: dbName,
            user,
            password,
            connectionTimeoutMillis: 5000,
          });

          // Test connection
          const client = await this.pool.connect();
          client.release();

          this.usePostgres = true;
          console.log("[DATABASE] Successfully connected to PostgreSQL instance.");

          // Initialize Postgres tables and load data
          await this.bootstrapPostgresTables();
        } catch (err: any) {
          console.error(`[DATABASE_WARN] PostgreSQL connection failed: ${err.message}. Falling back to local JSON persistence.`);
          this.usePostgres = false;
        }
      } else {
        console.log("[DATABASE] No PostgreSQL variables. Running on secure local JSON storage mode.");
      }
    }

    // Load backup data or local store
    this.load();
    this.isInitialized = true;
    this.resolveReady();
    console.log(`[DATABASE] JUMO UEOS Database initialized.`);
  }

  // Create PostgreSQL tables if not exists
  private async bootstrapPostgresTables() {
    if (!this.pool) return;

    try {
      console.log("[DATABASE] Bootstrapping PostgreSQL tables if they don't exist...");
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS ueos_users (
          email VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255),
          role VARCHAR(100),
          tenant_id VARCHAR(100),
          trust_level VARCHAR(100)
        );

        CREATE TABLE IF NOT EXISTS ueos_ledger_accounts (
          code VARCHAR(100) PRIMARY KEY,
          name VARCHAR(255),
          category VARCHAR(100),
          balance NUMERIC
        );

        CREATE TABLE IF NOT EXISTS ueos_registries (
          name VARCHAR(255) PRIMARY KEY,
          type VARCHAR(100),
          status VARCHAR(100),
          tenant VARCHAR(100),
          version VARCHAR(100),
          permissions VARCHAR(100),
          updated_by VARCHAR(255)
        );

        CREATE TABLE IF NOT EXISTS ueos_audit_logs (
          id VARCHAR(100) PRIMARY KEY,
          timestamp VARCHAR(100),
          actor VARCHAR(255),
          action VARCHAR(255),
          status VARCHAR(50),
          details TEXT
        );

        CREATE TABLE IF NOT EXISTS ueos_workflows (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(255),
          trigger_event VARCHAR(255),
          status VARCHAR(100),
          approvers TEXT,
          last_triggered VARCHAR(100)
        );

        CREATE TABLE IF NOT EXISTS ueos_ai_agent_memory (
          id VARCHAR(100) PRIMARY KEY,
          agent_name VARCHAR(100),
          context_id VARCHAR(100),
          memory_text TEXT,
          timestamp VARCHAR(100)
        );

        CREATE TABLE IF NOT EXISTS ueos_secrets_vault (
          key VARCHAR(255) PRIMARY KEY,
          value TEXT,
          category VARCHAR(100),
          description TEXT,
          status VARCHAR(50),
          version_history TEXT,
          last_rotated VARCHAR(100),
          expires_at VARCHAR(100),
          created_by VARCHAR(255),
          updated_by VARCHAR(255)
        );

        CREATE TABLE IF NOT EXISTS ueos_ecosystems (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(255),
          version VARCHAR(50),
          category VARCHAR(100),
          description TEXT,
          governance_model VARCHAR(255),
          status VARCHAR(50),
          config TEXT
        );

        CREATE TABLE IF NOT EXISTS ueos_templates (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(255),
          ecosystem_id VARCHAR(100),
          description TEXT,
          version VARCHAR(50),
          status VARCHAR(50),
          blueprint TEXT
        );

        CREATE TABLE IF NOT EXISTS ueos_instances (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(255),
          template_id VARCHAR(100),
          ecosystem_id VARCHAR(100),
          status VARCHAR(50),
          configuration TEXT,
          created_at VARCHAR(100)
        );

        CREATE TABLE IF NOT EXISTS ueos_modules (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(255),
          category VARCHAR(100),
          config TEXT
        );

        CREATE TABLE IF NOT EXISTS ueos_forms (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(255),
          definition TEXT
        );

        CREATE TABLE IF NOT EXISTS ueos_components (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(255),
          type VARCHAR(50),
          description TEXT
        );
      `);
      console.log("[DATABASE] PostgreSQL tables verified/created.");
    } catch (err: any) {
      console.error("[DATABASE_ERROR] Table bootstrap failed:", err.message);
    }
  }

  // Load database from file / Postgres / localStorage with error recovery
  public async load() {
    // Read from local storage (browser) or JSON file (Node)
    try {
      if (isBrowser && typeof localStorage !== "undefined") {
        let stored = null;
        try { stored = localStorage.getItem("ueos_db_backup"); } catch(e) {}
        if (stored) {
          const parsed = JSON.parse(stored);
          for (const key of Object.keys(UEOS_SCHEMAS)) {
            if (Array.isArray(parsed[key])) {
              this.data[key] = parsed[key];
            }
          }
        }
      } else if (!isBrowser && nodeFs && typeof nodeFs.existsSync === "function" && nodeFs.existsSync(DB_FILE_PATH)) {
        const raw = nodeFs.readFileSync(DB_FILE_PATH, "utf-8");
        const parsed = JSON.parse(raw);
        for (const key of Object.keys(UEOS_SCHEMAS)) {
          if (Array.isArray(parsed[key])) {
            this.data[key] = parsed[key];
          }
        }
      }
    } catch (err: any) {
      console.error("[DATABASE_ERROR] Local storage/JSON read failed:", err.message);
    }

    // Overwrite cache from PostgreSQL if active
    if (this.usePostgres && this.pool) {
      try {
        console.log("[DATABASE] Syncing memory cache with PostgreSQL cloud storage...");
        
        const rUsers = await this.pool.query("SELECT * FROM ueos_users");
        if (rUsers.rows.length > 0) {
          this.data["users"] = rUsers.rows.map((r: any) => ({
            email: r.email,
            name: r.name,
            role: r.role,
            tenantId: r.tenant_id,
            trustLevel: r.trust_level
          }));
        }

        const rAccounts = await this.pool.query("SELECT * FROM ueos_ledger_accounts");
        if (rAccounts.rows.length > 0) {
          this.data["ledger_accounts"] = rAccounts.rows.map((r: any) => ({
            code: r.code,
            name: r.name,
            category: r.category,
            balance: parseFloat(r.balance)
          }));
        }

        const rRegistries = await this.pool.query("SELECT * FROM ueos_registries");
        if (rRegistries.rows.length > 0) {
          this.data["registries"] = rRegistries.rows.map((r: any) => ({
            name: r.name,
            type: r.type,
            status: r.status,
            tenant: r.tenant,
            version: r.version,
            permissions: r.permissions,
            updatedBy: r.updated_by
          }));
        }

        const rLogs = await this.pool.query("SELECT * FROM ueos_audit_logs");
        if (rLogs.rows.length > 0) {
          this.data["audit_logs"] = rLogs.rows.map((r: any) => ({
            id: r.id,
            timestamp: r.timestamp,
            actor: r.actor,
            action: r.action,
            status: r.status,
            details: r.details
          }));
        }

        const rWorkflows = await this.pool.query("SELECT * FROM ueos_workflows");
        if (rWorkflows.rows.length > 0) {
          this.data["workflows"] = rWorkflows.rows.map((r: any) => ({
            id: r.id,
            name: r.name,
            triggerEvent: r.trigger_event,
            status: r.status,
            approvers: r.approvers,
            lastTriggered: r.last_triggered
          }));
        }

        const rMemories = await this.pool.query("SELECT * FROM ueos_ai_agent_memory");
        if (rMemories.rows.length > 0) {
          this.data["ai_agent_memory"] = rMemories.rows.map((r: any) => ({
            id: r.id,
            agentName: r.agent_name,
            contextId: r.context_id,
            memoryText: r.memory_text,
            timestamp: r.timestamp
          }));
        }

        const rSecrets = await this.pool.query("SELECT * FROM ueos_secrets_vault");
        if (rSecrets.rows.length > 0) {
          this.data["secrets_vault"] = rSecrets.rows.map((r: any) => ({
            key: r.key,
            value: r.value,
            category: r.category,
            description: r.description,
            status: r.status,
            versionHistory: r.version_history,
            lastRotated: r.last_rotated,
            expiresAt: r.expires_at,
            createdBy: r.created_by,
            updatedBy: r.updated_by
          }));
        }

        const rEcosystems = await this.pool.query("SELECT * FROM ueos_ecosystems");
        if (rEcosystems.rows.length > 0) {
          this.data["ecosystems"] = rEcosystems.rows.map((r: any) => ({
            id: r.id,
            name: r.name,
            version: r.version,
            category: r.category,
            description: r.description,
            governanceModel: r.governance_model,
            status: r.status,
            config: r.config
          }));
        }

        const rTemplates = await this.pool.query("SELECT * FROM ueos_templates");
        if (rTemplates.rows.length > 0) {
          this.data["templates"] = rTemplates.rows.map((r: any) => ({
            id: r.id,
            name: r.name,
            ecosystemId: r.ecosystem_id,
            description: r.description,
            version: r.version,
            status: r.status,
            blueprint: r.blueprint
          }));
        }

        const rInstances = await this.pool.query("SELECT * FROM ueos_instances");
        if (rInstances.rows.length > 0) {
          this.data["instances"] = rInstances.rows.map((r: any) => ({
            id: r.id,
            name: r.name,
            templateId: r.template_id,
            ecosystemId: r.ecosystem_id,
            status: r.status,
            configuration: r.configuration,
            createdAt: r.created_at
          }));
        }

        const rModules = await this.pool.query("SELECT * FROM ueos_modules");
        if (rModules.rows.length > 0) {
          this.data["modules"] = rModules.rows.map((r: any) => ({
            id: r.id,
            name: r.name,
            category: r.category,
            config: r.config
          }));
        }

        const rForms = await this.pool.query("SELECT * FROM ueos_forms");
        if (rForms.rows.length > 0) {
          this.data["forms"] = rForms.rows.map((r: any) => ({
            id: r.id,
            name: r.name,
            definition: r.definition
          }));
        }

        const rComponents = await this.pool.query("SELECT * FROM ueos_components");
        if (rComponents.rows.length > 0) {
          this.data["components"] = rComponents.rows.map((r: any) => ({
            id: r.id,
            name: r.name,
            type: r.type,
            description: r.description
          }));
        }

        console.log("[DATABASE] Loaded state from PostgreSQL successfully.");
      } catch (err: any) {
        console.error("[DATABASE_ERROR] PostgreSQL sync load failed:", err.message);
      }
    }
  }

  // Synchronize memory state to disk / localStorage (always runs as backup)
  public save() {
    try {
      const payload = JSON.stringify(this.data, null, 2);
      if (isBrowser && typeof localStorage !== "undefined") {
        try { localStorage.setItem("ueos_db_backup", payload); } catch (e) {}
      } else if (!isBrowser && nodeFs && typeof nodeFs.writeFileSync === "function") {
        nodeFs.writeFileSync(DB_FILE_PATH, payload, "utf-8");
      }
    } catch (err: any) {
      console.error("[DATABASE_ERROR] Write backup failed:", err.message);
    }
  }

  // Fetch all items from a collection
  public select<T>(tableName: string, filter?: (item: T) => boolean): T[] {
    const list = (this.data[tableName] || []) as T[];
    return filter ? list.filter(filter) : [...list];
  }

  // Insert a single record with schema verification & DB synchronization
  public insert<T>(tableName: string, record: T): T {
    if (!this.data[tableName]) {
      this.data[tableName] = [];
    }

    const schema = UEOS_SCHEMAS[tableName];
    if (schema) {
      const pkField = schema.fields.find(f => f.primaryKey);
      if (pkField) {
        const pkValue = (record as any)[pkField.name];
        const exists = this.data[tableName].some(item => (item as any)[pkField.name] === pkValue);
        if (exists) {
          throw new Error(`Primary Key Conflict: Record with ${pkField.name}='${pkValue}' already exists in table '${tableName}'.`);
        }
      }
    }

    this.data[tableName].unshift(record);
    this.save();

    // Sync to PostgreSQL in background
    if (this.usePostgres && this.pool) {
      this.syncInsertToPostgres(tableName, record);
    }

    return record;
  }

  private async syncInsertToPostgres(tableName: string, record: any) {
    if (!this.pool) return;
    try {
      if (tableName === "users") {
        await this.pool.query(
          "INSERT INTO ueos_users (email, name, role, tenant_id, trust_level) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email) DO NOTHING",
          [record.email, record.name, record.role, record.tenantId, record.trustLevel]
        );
      } else if (tableName === "ledger_accounts") {
        await this.pool.query(
          "INSERT INTO ueos_ledger_accounts (code, name, category, balance) VALUES ($1, $2, $3, $4) ON CONFLICT (code) DO NOTHING",
          [record.code, record.name, record.category, record.balance]
        );
      } else if (tableName === "registries") {
        await this.pool.query(
          "INSERT INTO ueos_registries (name, type, status, tenant, version, permissions, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (name) DO NOTHING",
          [record.name, record.type, record.status, record.tenant, record.version, record.permissions, record.updatedBy]
        );
      } else if (tableName === "audit_logs") {
        await this.pool.query(
          "INSERT INTO ueos_audit_logs (id, timestamp, actor, action, status, details) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO NOTHING",
          [record.id, record.timestamp, record.actor, record.action, record.status, record.details]
        );
      } else if (tableName === "workflows") {
        await this.pool.query(
          "INSERT INTO ueos_workflows (id, name, trigger_event, status, approvers, last_triggered) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO NOTHING",
          [record.id, record.name, record.triggerEvent, record.status, record.approvers, record.lastTriggered]
        );
      } else if (tableName === "ai_agent_memory") {
        await this.pool.query(
          "INSERT INTO ueos_ai_agent_memory (id, agent_name, context_id, memory_text, timestamp) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING",
          [record.id, record.agentName, record.contextId, record.memoryText, record.timestamp]
        );
      } else if (tableName === "secrets_vault") {
        await this.pool.query(
          "INSERT INTO ueos_secrets_vault (key, value, category, description, status, version_history, last_rotated, expires_at, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT (key) DO NOTHING",
          [record.key, record.value, record.category, record.description, record.status, record.versionHistory, record.lastRotated, record.expiresAt, record.createdBy, record.updatedBy]
        );
      } else if (tableName === "ecosystems") {
        await this.pool.query(
          "INSERT INTO ueos_ecosystems (id, name, version, category, description, governance_model, status, config) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (id) DO NOTHING",
          [record.id, record.name, record.version, record.category, record.description, record.governanceModel, record.status, record.config]
        );
      } else if (tableName === "templates") {
        await this.pool.query(
          "INSERT INTO ueos_templates (id, name, ecosystem_id, description, version, status, blueprint) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (id) DO NOTHING",
          [record.id, record.name, record.ecosystemId, record.description, record.version, record.status, record.blueprint]
        );
      } else if (tableName === "instances") {
        await this.pool.query(
          "INSERT INTO ueos_instances (id, name, template_id, ecosystem_id, status, configuration, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (id) DO NOTHING",
          [record.id, record.name, record.templateId, record.ecosystemId, record.status, record.configuration, record.createdAt]
        );
      } else if (tableName === "modules") {
        await this.pool.query(
          "INSERT INTO ueos_modules (id, name, category, config) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING",
          [record.id, record.name, record.category, record.config]
        );
      } else if (tableName === "forms") {
        await this.pool.query(
          "INSERT INTO ueos_forms (id, name, definition) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING",
          [record.id, record.name, record.definition]
        );
      } else if (tableName === "components") {
        await this.pool.query(
          "INSERT INTO ueos_components (id, name, type, description) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING",
          [record.id, record.name, record.type, record.description]
        );
      }
    } catch (err: any) {
      console.error(`[DATABASE_ERROR] Async Postgres insert sync failed for ${tableName}:`, err.message);
    }
  }

  // Update records matching a filter
  public update<T>(tableName: string, filter: (item: T) => boolean, updater: (item: T) => T): number {
    if (!this.data[tableName]) return 0;
    
    let count = 0;
    const updatedRecords: any[] = [];

    this.data[tableName] = this.data[tableName].map((item: any) => {
      if (filter(item)) {
        count++;
        const updated = updater(item);
        updatedRecords.push(updated);
        return updated;
      }
      return item;
    });

    if (count > 0) {
      this.save();
      // Sync update to Postgres
      if (this.usePostgres && this.pool) {
        for (const record of updatedRecords) {
          this.syncUpdateToPostgres(tableName, record);
        }
      }
    }
    return count;
  }

  private async syncUpdateToPostgres(tableName: string, record: any) {
    if (!this.pool) return;
    try {
      if (tableName === "users") {
        await this.pool.query(
          "UPDATE ueos_users SET name = $2, role = $3, tenant_id = $4, trust_level = $5 WHERE email = $1",
          [record.email, record.name, record.role, record.tenantId, record.trustLevel]
        );
      } else if (tableName === "ledger_accounts") {
        await this.pool.query(
          "UPDATE ueos_ledger_accounts SET name = $2, category = $3, balance = $4 WHERE code = $1",
          [record.code, record.name, record.category, record.balance]
        );
      } else if (tableName === "registries") {
        await this.pool.query(
          "UPDATE ueos_registries SET type = $2, status = $3, tenant = $4, version = $5, permissions = $6, updated_by = $7 WHERE name = $1",
          [record.name, record.type, record.status, record.tenant, record.version, record.permissions, record.updatedBy]
        );
      } else if (tableName === "audit_logs") {
        await this.pool.query(
          "UPDATE ueos_audit_logs SET timestamp = $2, actor = $3, action = $4, status = $5, details = $6 WHERE id = $1",
          [record.id, record.timestamp, record.actor, record.action, record.status, record.details]
        );
      } else if (tableName === "workflows") {
        await this.pool.query(
          "UPDATE ueos_workflows SET name = $2, trigger_event = $3, status = $4, approvers = $5, last_triggered = $6 WHERE id = $1",
          [record.id, record.name, record.triggerEvent, record.status, record.approvers, record.lastTriggered]
        );
      } else if (tableName === "ai_agent_memory") {
        await this.pool.query(
          "UPDATE ueos_ai_agent_memory SET agent_name = $2, context_id = $3, memory_text = $4, timestamp = $5 WHERE id = $1",
          [record.id, record.agentName, record.contextId, record.memoryText, record.timestamp]
        );
      } else if (tableName === "secrets_vault") {
        await this.pool.query(
          "UPDATE ueos_secrets_vault SET value = $2, category = $3, description = $4, status = $5, version_history = $6, last_rotated = $7, expires_at = $8, created_by = $9, updated_by = $10 WHERE key = $1",
          [record.key, record.value, record.category, record.description, record.status, record.versionHistory, record.lastRotated, record.expiresAt, record.createdBy, record.updatedBy]
        );
      } else if (tableName === "ecosystems") {
        await this.pool.query(
          "UPDATE ueos_ecosystems SET name = $2, version = $3, category = $4, description = $5, governance_model = $6, status = $7, config = $8 WHERE id = $1",
          [record.id, record.name, record.version, record.category, record.description, record.governanceModel, record.status, record.config]
        );
      } else if (tableName === "templates") {
        await this.pool.query(
          "UPDATE ueos_templates SET name = $2, ecosystem_id = $3, description = $4, version = $5, status = $6, blueprint = $7 WHERE id = $1",
          [record.id, record.name, record.ecosystemId, record.description, record.version, record.status, record.blueprint]
        );
      } else if (tableName === "instances") {
        await this.pool.query(
          "UPDATE ueos_instances SET name = $2, template_id = $3, ecosystem_id = $4, status = $5, configuration = $6, created_at = $7 WHERE id = $1",
          [record.id, record.name, record.templateId, record.ecosystemId, record.status, record.configuration, record.createdAt]
        );
      } else if (tableName === "modules") {
        await this.pool.query(
          "UPDATE ueos_modules SET name = $2, category = $3, config = $4 WHERE id = $1",
          [record.id, record.name, record.category, record.config]
        );
      } else if (tableName === "forms") {
        await this.pool.query(
          "UPDATE ueos_forms SET name = $2, definition = $3 WHERE id = $1",
          [record.id, record.name, record.definition]
        );
      } else if (tableName === "components") {
        await this.pool.query(
          "UPDATE ueos_components SET name = $2, type = $3, description = $4 WHERE id = $1",
          [record.id, record.name, record.type, record.description]
        );
      }
    } catch (err: any) {
      console.error(`[DATABASE_ERROR] Async Postgres update sync failed for ${tableName}:`, err.message);
    }
  }

  // Delete records matching a filter
  public delete<T>(tableName: string, filter: (item: T) => boolean): number {
    if (!this.data[tableName]) return 0;

    const initialLength = this.data[tableName].length;
    const recordsToDelete = this.data[tableName].filter(filter);
    this.data[tableName] = this.data[tableName].filter((item: any) => !filter(item));
    const deletedCount = initialLength - this.data[tableName].length;

    if (deletedCount > 0) {
      this.save();
      // Sync delete to PostgreSQL
      if (this.usePostgres && this.pool) {
        for (const record of recordsToDelete) {
          this.syncDeleteFromPostgres(tableName, record);
        }
      }
    }
    return deletedCount;
  }

  private async syncDeleteFromPostgres(tableName: string, record: any) {
    if (!this.pool) return;
    try {
      if (tableName === "users") {
        await this.pool.query("DELETE FROM ueos_users WHERE email = $1", [record.email]);
      } else if (tableName === "ledger_accounts") {
        await this.pool.query("DELETE FROM ueos_ledger_accounts WHERE code = $1", [record.code]);
      } else if (tableName === "registries") {
        await this.pool.query("DELETE FROM ueos_registries WHERE name = $1", [record.name]);
      } else if (tableName === "audit_logs") {
        await this.pool.query("DELETE FROM ueos_audit_logs WHERE id = $1", [record.id]);
      } else if (tableName === "workflows") {
        await this.pool.query("DELETE FROM ueos_workflows WHERE id = $1", [record.id]);
      } else if (tableName === "ai_agent_memory") {
        await this.pool.query("DELETE FROM ueos_ai_agent_memory WHERE id = $1", [record.id]);
      } else if (tableName === "secrets_vault") {
        await this.pool.query("DELETE FROM ueos_secrets_vault WHERE key = $1", [record.key]);
      } else if (tableName === "ecosystems") {
        await this.pool.query("DELETE FROM ueos_ecosystems WHERE id = $1", [record.id]);
      } else if (tableName === "templates") {
        await this.pool.query("DELETE FROM ueos_templates WHERE id = $1", [record.id]);
      } else if (tableName === "instances") {
        await this.pool.query("DELETE FROM ueos_instances WHERE id = $1", [record.id]);
      } else if (tableName === "modules") {
        await this.pool.query("DELETE FROM ueos_modules WHERE id = $1", [record.id]);
      } else if (tableName === "forms") {
        await this.pool.query("DELETE FROM ueos_forms WHERE id = $1", [record.id]);
      } else if (tableName === "components") {
        await this.pool.query("DELETE FROM ueos_components WHERE id = $1", [record.id]);
      }
    } catch (err: any) {
      console.error(`[DATABASE_ERROR] Async Postgres delete sync failed for ${tableName}:`, err.message);
    }
  }

  // Direct clear for resets
  public truncate(tableName: string) {
    if (this.data[tableName]) {
      this.data[tableName] = [];
      this.save();
      
      if (this.usePostgres && this.pool) {
        const pgTable = tableName === "users" ? "ueos_users" :
                        tableName === "ledger_accounts" ? "ueos_ledger_accounts" :
                        tableName === "registries" ? "ueos_registries" :
                        tableName === "audit_logs" ? "ueos_audit_logs" :
                        tableName === "workflows" ? "ueos_workflows" :
                        tableName === "ai_agent_memory" ? "ueos_ai_agent_memory" :
                        tableName === "secrets_vault" ? "ueos_secrets_vault" : null;
        if (pgTable) {
          this.pool.query(`TRUNCATE TABLE ${pgTable}`).catch((err: any) => {
            console.error(`[DATABASE_ERROR] Async PostgreSQL truncate failed for ${tableName}:`, err.message);
          });
        }
      }
    }
  }
}
export const db = JUMODBEngine.getInstance();
