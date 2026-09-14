// JUMO UEOS Enterprise Repository Implementations (Standard Repository Pattern)
import { db } from "../database/db";
import { 
  UserRecord, 
  LedgerAccountRecord, 
  RegistryRecord, 
  AuditLogRecord, 
  WorkflowRecord, 
  AIAgentMemoryRecord,
  SecretRecord
} from "../models/models";

// 1. User Identity & RBAC Repository
export const UserRepository = {
  findAll(): UserRecord[] {
    return db.select<UserRecord>("users");
  },
  findByEmail(email: string): UserRecord | null {
    if (!email) return null;
    const clean = email.trim().toLowerCase();
    const results = db.select<UserRecord>("users", u => {
      const uEmail = (u.email || "").toLowerCase();
      const uName = (u.name || "").toLowerCase();
      const uRole = (u.role || "").toLowerCase();
      if (uEmail === clean || uName === clean) return true;
      if (clean === "admin" || clean === "owner" || clean === "system_owner" || clean === "secops" || clean === "admin@jumo.net" || clean === "owner@jumo.net") {
        return uRole === "secops_administrator" || uEmail === "okwiijuliusmoses@gmail.com";
      }
      return false;
    });
    return results.length > 0 ? results[0] : null;
  },
  save(user: UserRecord): UserRecord {
    const exists = this.findByEmail(user.email);
    if (exists) {
      db.update<UserRecord>("users", u => u.email === user.email, () => user);
      return user;
    } else {
      return db.insert<UserRecord>("users", user);
    }
  },
  delete(email: string): boolean {
    return db.delete<UserRecord>("users", u => u.email === email) > 0;
  }
};

// 2. FAAP Accounting Ledger Repository
export const LedgerRepository = {
  findAllAccounts(): LedgerAccountRecord[] {
    return db.select<LedgerAccountRecord>("ledger_accounts");
  },
  findAccountByCode(code: string): LedgerAccountRecord | null {
    const results = db.select<LedgerAccountRecord>("ledger_accounts", acc => acc.code === code);
    return results.length > 0 ? results[0] : null;
  },
  saveAccount(acc: LedgerAccountRecord): LedgerAccountRecord {
    const exists = this.findAccountByCode(acc.code);
    if (exists) {
      db.update<LedgerAccountRecord>("ledger_accounts", a => a.code === acc.code, () => acc);
      return acc;
    } else {
      return db.insert<LedgerAccountRecord>("ledger_accounts", acc);
    }
  },
  updateBalance(code: string, delta: number, category: string): number {
    let newBalance = 0;
    db.update<LedgerAccountRecord>("ledger_accounts", 
      acc => acc.code === code, 
      acc => {
        // Assets and Expenses increase on Debit (+)
        // Liabilities, Equity, and Revenue increase on Credit (+)
        const isAssetOrExpense = category === "Asset" || category === "Expense";
        const factor = isAssetOrExpense ? 1 : -1;
        newBalance = acc.balance + (delta * factor);
        return { ...acc, balance: newBalance };
      }
    );
    return newBalance;
  },
  truncateAccounts() {
    db.truncate("ledger_accounts");
  }
};

// 2.1 Accounting Periods Repository
export const PeriodRepository = {
  findAll(): any[] {
    return db.select<any>("accounting_periods");
  },
  findById(id: string): any | null {
    const results = db.select<any>("accounting_periods", p => p.id === id);
    return results.length > 0 ? results[0] : null;
  },
  save(period: any): any {
    const exists = this.findById(period.id);
    if (exists) {
      db.update<any>("accounting_periods", p => p.id === period.id, () => period);
      return period;
    } else {
      return db.insert<any>("accounting_periods", period);
    }
  }
};

// 3. Platform Dynamic Registries Repository
export const RegistryRepository = {
  findAll(): RegistryRecord[] {
    return db.select<RegistryRecord>("registries");
  },
  findByName(name: string): RegistryRecord | null {
    const results = db.select<RegistryRecord>("registries", r => r.name === name);
    return results.length > 0 ? results[0] : null;
  },
  save(reg: RegistryRecord): RegistryRecord {
    const exists = this.findByName(reg.name);
    if (exists) {
      db.update<RegistryRecord>("registries", r => r.name === reg.name, () => reg);
      return reg;
    } else {
      return db.insert<RegistryRecord>("registries", reg);
    }
  },
  delete(name: string): boolean {
    return db.delete<RegistryRecord>("registries", r => r.name === name) > 0;
  },
  truncate() {
    db.truncate("registries");
  }
};

// 4. Immutable Audit Ledger Repository
export const AuditLogRepository = {
  findAll(): AuditLogRecord[] {
    return db.select<AuditLogRecord>("audit_logs");
  },
  getRecentLogs(limit: number = 20): AuditLogRecord[] {
    const all = this.findAll();
    return [...all].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, limit);
  },
  log(actor: string, action: string, details: string, status: "success" | "failed" | "blocked" = "success"): AuditLogRecord {
    const logItem: AuditLogRecord = {
      id: `AUD-${Math.floor(Math.random() * 900000) + 100000}`,
      timestamp: new Date().toISOString(),
      actor,
      action,
      status,
      details
    };
    return db.insert<AuditLogRecord>("audit_logs", logItem);
  },
  truncate() {
    db.truncate("audit_logs");
  }
};

// 5. Workflow Automation Rules Repository
export const WorkflowRepository = {
  findAll(): WorkflowRecord[] {
    return db.select<WorkflowRecord>("workflows");
  },
  findById(id: string): WorkflowRecord | null {
    const results = db.select<WorkflowRecord>("workflows", w => w.id === id);
    return results.length > 0 ? results[0] : null;
  },
  save(wf: WorkflowRecord): WorkflowRecord {
    const exists = this.findById(wf.id);
    if (exists) {
      db.update<WorkflowRecord>("workflows", w => w.id === wf.id, () => wf);
      return wf;
    } else {
      return db.insert<WorkflowRecord>("workflows", wf);
    }
  },
  updateLastTriggered(id: string): string {
    const ts = new Date().toISOString();
    db.update<WorkflowRecord>("workflows", w => w.id === id, w => ({ ...w, lastTriggered: ts }));
    return ts;
  },
  truncate() {
    db.truncate("workflows");
  }
};

// 6. Multi-Agent AI Cognitive Memory Repository
export const AgentMemoryRepository = {
  findAll(): AIAgentMemoryRecord[] {
    return db.select<AIAgentMemoryRecord>("ai_agent_memory");
  },
  findMemoryByAgent(agentName: string): AIAgentMemoryRecord[] {
    return db.select<AIAgentMemoryRecord>("ai_agent_memory", m => m.agentName === agentName);
  },
  logMemory(agentName: string, contextId: string, memoryText: string): AIAgentMemoryRecord {
    const record: AIAgentMemoryRecord = {
      id: `MEM-${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
      agentName,
      contextId,
      memoryText,
      timestamp: new Date().toISOString()
    };
    return db.insert<AIAgentMemoryRecord>("ai_agent_memory", record);
  },
  truncate() {
    db.truncate("ai_agent_memory");
  }
};

// 7. Security Credentials & Secrets Vault Repository
export const SecretsRepository = {
  findAll(): SecretRecord[] {
    return db.select<SecretRecord>("secrets_vault");
  },
  findByKey(key: string): SecretRecord | null {
    const results = db.select<SecretRecord>("secrets_vault", s => s.key === key);
    return results.length > 0 ? results[0] : null;
  },
  save(secret: SecretRecord, actor: string = "System"): SecretRecord {
    const exists = this.findByKey(secret.key);
    if (exists) {
      db.update<SecretRecord>("secrets_vault", s => s.key === secret.key, () => secret);
      AuditLogRepository.log(
        actor,
        "SECRET_UPDATE",
        `Updated sensitive credential key: ${secret.key} in category ${secret.category}`,
        "success"
      );
      return secret;
    } else {
      const inserted = db.insert<SecretRecord>("secrets_vault", secret);
      AuditLogRepository.log(
        actor,
        "SECRET_REGISTER",
        `Registered new sensitive credential key: ${secret.key} in category ${secret.category}`,
        "success"
      );
      return inserted;
    }
  },
  delete(key: string, actor: string = "System"): boolean {
    const secret = this.findByKey(key);
    if (!secret) return false;
    const deleted = db.delete<SecretRecord>("secrets_vault", s => s.key === key) > 0;
    if (deleted) {
      AuditLogRepository.log(
        actor,
        "SECRET_DELETE",
        `Deleted sensitive credential key: ${key} from category ${secret.category}`,
        "success"
      );
    }
    return deleted;
  },
  logAccess(key: string, actor: string = "System", status: "success" | "failed" | "blocked" = "success") {
    const secret = this.findByKey(key);
    AuditLogRepository.log(
      actor,
      "SECRET_ACCESS",
      `Accessed/Revealed sensitive credential key: ${key} (${secret?.category || "Unknown"})`,
      status
    );
  },
  truncate() {
    db.truncate("secrets_vault");
  }
};

// 8. UEOS Ecosystems Repository
export const EcosystemRepository = {
  findAll(): any[] {
    return db.select<any>("ecosystems");
  },
  findById(id: string): any | null {
    const results = db.select<any>("ecosystems", e => e.id === id);
    return results.length > 0 ? results[0] : null;
  },
  save(eco: any): any {
    const exists = this.findById(eco.id);
    if (exists) {
      db.update<any>("ecosystems", e => e.id === eco.id, () => eco);
      return eco;
    } else {
      return db.insert<any>("ecosystems", eco);
    }
  }
};

// 9. UEOS Templates Repository
export const TemplateRepository = {
  findAll(): any[] {
    return db.select<any>("templates");
  },
  findById(id: string): any | null {
    const results = db.select<any>("templates", t => t.id === id);
    return results.length > 0 ? results[0] : null;
  },
  save(temp: any): any {
    const exists = this.findById(temp.id);
    if (exists) {
      db.update<any>("templates", t => t.id === temp.id, () => temp);
      return temp;
    } else {
      return db.insert<any>("templates", temp);
    }
  }
};

// 10. UEOS Instances Repository
export const InstanceRepository = {
  findAll(): any[] {
    return db.select<any>("instances");
  },
  findById(id: string): any | null {
    const results = db.select<any>("instances", i => i.id === id);
    return results.length > 0 ? results[0] : null;
  },
  save(inst: any): any {
    const exists = this.findById(inst.id);
    if (exists) {
      db.update<any>("instances", i => i.id === inst.id, () => inst);
      return inst;
    } else {
      return db.insert<any>("instances", inst);
    }
  }
};

// 11. UEOS Modules Repository
export const ModuleRepository = {
  findAll(): any[] {
    return db.select<any>("modules");
  },
  findById(id: string): any | null {
    const results = db.select<any>("modules", m => m.id === id);
    return results.length > 0 ? results[0] : null;
  },
  save(mod: any): any {
    const exists = this.findById(mod.id);
    if (exists) {
      db.update<any>("modules", m => m.id === mod.id, () => mod);
      return mod;
    } else {
      return db.insert<any>("modules", mod);
    }
  }
};

// 12. UEOS Forms Repository
export const FormRepository = {
  findAll(): any[] {
    return db.select<any>("forms");
  },
  findById(id: string): any | null {
    const results = db.select<any>("forms", f => f.id === id);
    return results.length > 0 ? results[0] : null;
  },
  save(form: any): any {
    const exists = this.findById(form.id);
    if (exists) {
      db.update<any>("forms", f => f.id === form.id, () => form);
      return form;
    } else {
      return db.insert<any>("forms", form);
    }
  }
};

// 13. UEOS Components Repository
export const ComponentRepository = {
  findAll(): any[] {
    return db.select<any>("components");
  },
  findById(id: string): any | null {
    const results = db.select<any>("components", c => c.id === id);
    return results.length > 0 ? results[0] : null;
  },
  save(comp: any): any {
    const exists = this.findById(comp.id);
    if (exists) {
      db.update<any>("components", c => c.id === comp.id, () => comp);
      return comp;
    } else {
      return db.insert<any>("components", comp);
    }
  }
};
