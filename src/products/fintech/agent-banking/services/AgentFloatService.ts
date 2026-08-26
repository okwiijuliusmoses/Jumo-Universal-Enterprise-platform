import { AgentFloatTransaction, CommissionRule } from '../domain/AgentModels';

export class AgentFloatService {
  /**
   * Processes a cash-in transaction (Agent deposits cash, customer gets digital float)
   * This bridges FT-PAY-02 (Mobile Money) and FT-BNK-04 (Agent Banking).
   */
  static async processCashIn(agentId: string, customerWalletId: string, amount: number): Promise<{ success: boolean; txId?: string; commission?: number }> {
    // 1. Verify agent float has sufficient balance (Integration with FAAP/Wallets)
    // ...
    
    // 2. Calculate Commission
    const commission = this.calculateCommission(amount, 'CASH_IN');

    // 3. Draft Double Entry Ledger Journal
    // Debit: Agent Float Liability
    // Credit: Customer Wallet Liability
    // Credit: Agent Commission Revenue
    // ...
    
    return {
      success: true,
      txId: 'AGT-CI-' + Date.now().toString(),
      commission
    };
  }

  static calculateCommission(amount: number, type: string): number {
    // Mock logic based on a Tiered structure
    if (amount < 100) return 0.5;
    if (amount < 500) return 2.0;
    return amount * 0.01;
  }
}
