export interface MerchantProfile {
  id: string;
  name: string;
  businessType: string;
  status: 'ACTIVE' | 'ONBOARDING' | 'SUSPENDED';
  settlementAccountId: string; // Integration with FAM_LEDGER
  tier: 'STANDARD' | 'ENTERPRISE';
  commissionRate: number; // e.g. 0.025 for 2.5%
  createdAt: string;
}

export interface PosDevice {
  id: string;
  merchantId: string;
  model: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  lastPingAt: string;
}

export interface MerchantTransaction {
  id: string;
  merchantId: string;
  deviceId?: string;
  amount: number;
  currency: string;
  commissionAmount: number;
  netSettlement: number;
  status: 'SETTLED' | 'PENDING' | 'FAILED';
  journalEntryId?: string; // FAAP Ledger linkage
  timestamp: string;
}
