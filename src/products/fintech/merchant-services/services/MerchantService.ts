import { MerchantProfile, PosDevice, MerchantTransaction } from '../domain/Merchant';

export class MerchantService {
  private merchants: Map<string, MerchantProfile> = new Map();
  private devices: Map<string, PosDevice[]> = new Map();
  private transactions: Map<string, MerchantTransaction[]> = new Map();

  onboardMerchant(name: string, businessType: string, tier: 'STANDARD' | 'ENTERPRISE' = 'STANDARD'): MerchantProfile {
    const id = `MERCH-\${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const merchant: MerchantProfile = {
      id,
      name,
      businessType,
      status: 'ACTIVE',
      settlementAccountId: `GL-\${id}-SETTLE`,
      tier,
      commissionRate: tier === 'ENTERPRISE' ? 0.015 : 0.025, // 1.5% vs 2.5%
      createdAt: new Date().toISOString()
    };

    this.merchants.set(id, merchant);
    this.devices.set(id, []);
    this.transactions.set(id, []);

    return merchant;
  }

  getMerchant(id: string): MerchantProfile | undefined {
    return this.merchants.get(id);
  }

  getAllMerchants(): MerchantProfile[] {
    return Array.from(this.merchants.values());
  }

  getMerchantTransactions(id: string): MerchantTransaction[] {
    return this.transactions.get(id) || [];
  }

  processPayment(merchantId: string, amount: number, currency: string, deviceId?: string): MerchantTransaction {
    const merchant = this.merchants.get(merchantId);
    if (!merchant) throw new Error('Merchant not found');
    if (merchant.status !== 'ACTIVE') throw new Error('Merchant inactive');

    const commissionAmount = amount * merchant.commissionRate;
    const netSettlement = amount - commissionAmount;

    const tx: MerchantTransaction = {
      id: `TXN-\${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      merchantId,
      deviceId,
      amount,
      currency,
      commissionAmount,
      netSettlement,
      status: 'SETTLED',
      timestamp: new Date().toISOString()
    };

    // NOTE: In production, invokes FAM_LEDGER to split the gross amount into revenue and settlement accounts
    this.transactions.get(merchantId)?.push(tx);

    return tx;
  }
}

export const merchantService = new MerchantService();
