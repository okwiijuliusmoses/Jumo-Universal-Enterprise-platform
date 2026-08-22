export interface Agent {
  agentId: string;
  type: 'SUPER_AGENT' | 'MASTER_AGENT' | 'INDIVIDUAL_AGENT';
  parentAgentId?: string; // For hierarchy
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING_KYC';
  kycLevel: 1 | 2 | 3;
  region: string;
  floatAccountId: string; // Links to FT-ACC-01 or Digital Wallet
  commissionAccountId: string;
}

export interface AgentFloatTransaction {
  txId: string;
  agentId: string;
  type: 'CASH_IN' | 'CASH_OUT' | 'FLOAT_TOPUP' | 'FLOAT_REPATRIATION';
  amount: number;
  currency: string;
  status: 'COMPLETED' | 'FAILED' | 'PENDING';
  timestamp: string;
}

export interface CommissionRule {
  ruleId: string;
  transactionType: string;
  agentType: 'SUPER_AGENT' | 'MASTER_AGENT' | 'INDIVIDUAL_AGENT';
  percentage: number;
  fixedFee: number;
}
