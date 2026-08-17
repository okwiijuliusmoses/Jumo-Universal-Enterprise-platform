// JUMO UEOS — Sovereign Domain Models

export interface UserRecord {
  id?: string;
  email: string;
  name?: string;
  username?: string;
  role: string;
  tenantId?: string;
  trustLevel?: string;
  passwordHash?: string;
  salt?: string;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
}

export interface AuditLogRecord {
  id: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details?: any;
  ipAddress?: string;
}

export interface AccountRecord {
  id: string;
  code: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
}

export interface TransactionRecord {
  id: string;
  tenantId: string;
  amount: number;
  type: string;
  description: string;
  timestamp: string;
}

export interface RegistryRecord {
  id?: string;
  name: string;
  type: string;
  status: string;
  tenant?: string;
  version?: string;
  permissions?: string;
  updatedBy?: string;
  [key: string]: any;
}
