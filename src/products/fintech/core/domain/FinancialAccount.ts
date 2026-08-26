export type AccountType = 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE' | 'CLEARING' | 'SUSPENSE';
export type AccountStatus = 'ACTIVE' | 'SUSPENDED' | 'CLOSED' | 'FROZEN';

export interface FinancialAccount {
  id: string;
  accountNumber: string;
  type: AccountType;
  currency: string;
  status: AccountStatus;
  tenantId: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface AccountCreateRequest {
  type: AccountType;
  currency: string;
  tenantId: string;
  metadata?: Record<string, any>;
}

export interface AccountBalanceQuery {
  accountId: string;
  asOfTime?: string; // ISO-8601
  currency?: string;
}

export interface BalanceResponse {
  accountId: string;
  currency: string;
  availableBalance: number;
  ledgerBalance: number;
  asOfTime: string;
}
