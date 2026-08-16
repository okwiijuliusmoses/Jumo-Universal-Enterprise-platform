export const UEOS_SCHEMAS: Record<string, any> = {
  users: { fields: [{ name: 'email', primaryKey: true }] },
  ledger_accounts: { fields: [{ name: 'code', primaryKey: true }] },
  registries: { fields: [{ name: 'name', primaryKey: true }] },
  audit_logs: { fields: [{ name: 'id', primaryKey: true }] },
  workflows: { fields: [{ name: 'id', primaryKey: true }] },
  ai_agent_memory: { fields: [{ name: 'id', primaryKey: true }] },
  secrets_vault: { fields: [{ name: 'key', primaryKey: true }] },
  ecosystems: { fields: [{ name: 'id', primaryKey: true }] },
  templates: { fields: [{ name: 'id', primaryKey: true }] },
  instances: { fields: [{ name: 'id', primaryKey: true }] },
  modules: { fields: [{ name: 'id', primaryKey: true }] },
  forms: { fields: [{ name: 'id', primaryKey: true }] },
  components: { fields: [{ name: 'id', primaryKey: true }] }
};
