import { FxRate, FxOrder } from '../domain/Fx';

export class FxService {
  private rates: Map<string, FxRate> = new Map();
  private orders: FxOrder[] = [];

  constructor() {
    this.seedRates();
  }

  private seedRates() {
    const timestamp = new Date().toISOString();
    this.rates.set('USD_KES', { id: 'R1', baseCurrency: 'USD', quoteCurrency: 'KES', buyRate: 130.5, sellRate: 132.5, midRate: 131.5, timestamp });
    this.rates.set('USD_UGX', { id: 'R2', baseCurrency: 'USD', quoteCurrency: 'UGX', buyRate: 3750, sellRate: 3800, midRate: 3775, timestamp });
    this.rates.set('EUR_USD', { id: 'R3', baseCurrency: 'EUR', quoteCurrency: 'USD', buyRate: 1.08, sellRate: 1.10, midRate: 1.09, timestamp });
  }

  getRates(): FxRate[] {
    return Array.from(this.rates.values());
  }

  executeOrder(customerId: string, base: string, quote: string, side: 'BUY' | 'SELL', amount: number): FxOrder {
    const pair = `\${base}_\${quote}`;
    const rate = this.rates.get(pair);
    
    if (!rate) throw new Error(`Rate not available for \${pair}`);

    const executedRate = side === 'BUY' ? rate.sellRate : rate.buyRate;
    const totalQuoteAmount = amount * executedRate;

    const order: FxOrder = {
      id: `FX-\${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      customerId,
      baseCurrency: base,
      quoteCurrency: quote,
      side,
      amount,
      executedRate,
      totalQuoteAmount,
      status: 'EXECUTED',
      timestamp: new Date().toISOString()
    };

    // NOTE: In production, this interacts with FAM_LEDGER to post the multi-currency journal entry
    this.orders.push(order);
    return order;
  }

  getOrders(customerId?: string): FxOrder[] {
    if (customerId) return this.orders.filter(o => o.customerId === customerId);
    return this.orders;
  }
}

export const fxService = new FxService();
