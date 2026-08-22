import { DigitalWallet, WalletTransaction, WalletStatus, WalletTier } from '../domain/Wallet';

export class DigitalWalletService {
  private wallets: Map<string, DigitalWallet> = new Map();
  private transactions: Map<string, WalletTransaction[]> = new Map();

  provisionWallet(customerId: string, currency: string, tier: WalletTier = 'TIER_1'): DigitalWallet {
    const id = `WLT-\${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Limits based on Tier
    let dailyLimit = 500;
    let monthlyLimit = 2000;
    
    if (tier === 'TIER_2') {
      dailyLimit = 5000;
      monthlyLimit = 25000;
    } else if (tier === 'TIER_3') {
      dailyLimit = 50000;
      monthlyLimit = 200000;
    }

    const newWallet: DigitalWallet = {
      id,
      customerId,
      currency,
      status: 'ACTIVE',
      tier,
      balance: 0,
      ledgerAccountId: `GL-\${id}`,
      dailyLimit,
      monthlyLimit,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.wallets.set(id, newWallet);
    this.transactions.set(id, []);
    
    return newWallet;
  }

  getWallet(walletId: string): DigitalWallet | undefined {
    return this.wallets.get(walletId);
  }

  getWalletsByCustomer(customerId: string): DigitalWallet[] {
    return Array.from(this.wallets.values()).filter(w => w.customerId === customerId);
  }

  getWalletTransactions(walletId: string): WalletTransaction[] {
    return this.transactions.get(walletId) || [];
  }

  // NOTE: In production, this must invoke FAM_LEDGER DoubleEntryService to guarantee parity
  // Here we simulate the successful ledger integration
  transferFunds(sourceWalletId: string, destWalletId: string, amount: number): boolean {
    const source = this.wallets.get(sourceWalletId);
    const dest = this.wallets.get(destWalletId);

    if (!source || !dest) throw new Error('Wallet not found');
    if (source.status !== 'ACTIVE' || dest.status !== 'ACTIVE') throw new Error('Wallets must be active');
    if (source.currency !== dest.currency) throw new Error('Cross-currency transfer not supported in this operation. Use FAM_FX.');
    if (source.balance < amount) throw new Error('Insufficient funds');

    source.balance -= amount;
    dest.balance += amount;

    const txId = `TXN-\${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    const outTx: WalletTransaction = {
      id: `\${txId}-OUT`,
      walletId: sourceWalletId,
      type: 'TRANSFER_OUT',
      amount,
      currency: source.currency,
      reference: destWalletId,
      status: 'COMPLETED',
      timestamp
    };

    const inTx: WalletTransaction = {
      id: `\${txId}-IN`,
      walletId: destWalletId,
      type: 'TRANSFER_IN',
      amount,
      currency: dest.currency,
      reference: sourceWalletId,
      status: 'COMPLETED',
      timestamp
    };

    this.transactions.get(sourceWalletId)?.push(outTx);
    this.transactions.get(destWalletId)?.push(inTx);

    return true;
  }
}

// Singleton for workspace demo
export const walletService = new DigitalWalletService();
