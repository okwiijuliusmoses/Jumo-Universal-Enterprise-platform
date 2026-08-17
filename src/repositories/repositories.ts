// JUMO UEOS — Sovereign Repositories
import { UserRecord, AuditLogRecord, AccountRecord, TransactionRecord, RegistryRecord } from "../models/models";

export class UserRepository {
  private static users: Map<string, UserRecord> = new Map();

  static findById(id: string): UserRecord | undefined {
    return Array.from(this.users.values()).find(u => u.id === id);
  }

  static findByEmail(email: string): UserRecord | undefined {
    return this.users.get(email.toLowerCase());
  }

  static findByUsername(name: string): UserRecord | undefined {
    return Array.from(this.users.values()).find(
      u => u.username === name || u.name === name || u.email === name
    );
  }

  static save(user: UserRecord): void {
    const key = user.email ? user.email.toLowerCase() : (user.id || `usr-${Date.now()}`);
    if (!user.id) user.id = `usr-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    if (!user.createdAt) user.createdAt = new Date().toISOString();
    this.users.set(key, user);
  }

  static findAll(): UserRecord[] {
    return Array.from(this.users.values());
  }
}

export class AuditLogRepository {
  private static logs: AuditLogRecord[] = [];

  static log(param1: string, param2: string, details?: any): void {
    // Supports both (action, performedBy, details) and (performedBy, action, details)
    this.logs.push({
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      action: param2,
      performedBy: param1,
      timestamp: new Date().toISOString(),
      details
    });
  }

  static getLogs(): AuditLogRecord[] {
    return [...this.logs];
  }
}

export class LedgerRepository {
  private static accounts: AccountRecord[] = [];

  static findAllAccounts(): AccountRecord[] {
    return [...this.accounts];
  }

  static saveAccount(acc: AccountRecord): void {
    this.accounts.push(acc);
  }
}

export class RegistryRepository {
  private static records: Map<string, RegistryRecord> = new Map();

  static get(key: string): any {
    return this.records.get(key);
  }

  static set(key: string, val: any): void {
    this.records.set(key, val);
  }

  static save(record: RegistryRecord): void {
    const key = record.name || record.id || `rec-${Date.now()}`;
    this.records.set(key, record);
  }

  static findByName(name: string): RegistryRecord | undefined {
    return this.records.get(name) || Array.from(this.records.values()).find(r => r.name === name);
  }

  static getAll(): RegistryRecord[] {
    return Array.from(this.records.values());
  }
}
