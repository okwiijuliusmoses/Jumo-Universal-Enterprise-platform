export interface FxRate {
  id: string;
  baseCurrency: string;
  quoteCurrency: string;
  buyRate: number;
  sellRate: number;
  midRate: number;
  timestamp: string;
}

export interface FxOrder {
  id: string;
  customerId: string;
  baseCurrency: string;
  quoteCurrency: string;
  side: 'BUY' | 'SELL';
  amount: number; // Amount in base currency
  executedRate: number;
  totalQuoteAmount: number;
  status: 'PENDING' | 'EXECUTED' | 'FAILED';
  journalEntryId?: string; // FAAP Ledger linkage
  timestamp: string;
}
