export type WalletStatus = 'ACTIVE' | 'SUSPENDED' | 'CLOSED' | 'PENDING_KYC';
export type WalletTier = 'TIER_1' | 'TIER_2' | 'TIER_3';

export interface DigitalWallet {
  id: string;
  customerId: string;
  currency: string;
  status: WalletStatus;
  tier: WalletTier;
  balance: number; // View model, real balance should come from Ledger
  ledgerAccountId: string; // Integration with FAM_LEDGER
  dailyLimit: number;
  monthlyLimit: number;
  createdAt: string;
  updatedAt: string;
}

export interface WalletTransaction {
  id: string;
  walletId: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER_IN' | 'TRANSFER_OUT' | 'FEE';
  amount: number;
  currency: string;
  reference: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  journalEntryId?: string; // Link to FAAP ledger journal entry
  timestamp: string;
}
