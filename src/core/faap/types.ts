export type CurrencyCode =
  | 'UGX'
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'KES'
  | 'TZS'
  | 'RWF'
  | 'ZAR'
  | 'NGN'
  | 'GHS'
  | 'ETB'
  | 'AED'
  | 'SAR'
  | 'CNY'
  | 'INR'
  | 'JPY'
  | 'CAD'
  | 'AUD'
  | 'CHF';

export interface UniversalTransaction {
  id: string;
  tenantId: string;
  sourceModule: string;
  transactionType: 'DEBIT' | 'CREDIT' | 'TRANSFER' | 'FEE';
  amount: number;
  currency: CurrencyCode;
  debitAccount: string;
  creditAccount: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SETTLED';
  approvalState: 'REQUIRED' | 'APPROVED' | 'DENIED';
  auditTrail: string[];
  createdAt: Date;
}

export interface CurrencyDefinition {
  code: CurrencyCode;
  name: string;
  symbol: string;
  decimals: number;
  enabled: boolean;
}

export const SUPPORTED_CURRENCIES: CurrencyDefinition[] = [
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'UGX', decimals: 0, enabled: true },
  { code: 'USD', name: 'US Dollar', symbol: '$', decimals: 2, enabled: true },
  { code: 'EUR', name: 'Euro', symbol: '€', decimals: 2, enabled: true },
  { code: 'GBP', name: 'British Pound', symbol: '£', decimals: 2, enabled: true },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KES', decimals: 2, enabled: true },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TZS', decimals: 2, enabled: true },
  { code: 'RWF', name: 'Rwandan Franc', symbol: 'RWF', decimals: 0, enabled: true },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', decimals: 2, enabled: true },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', decimals: 2, enabled: true },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: 'GH₵', decimals: 2, enabled: true },
  { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br', decimals: 2, enabled: true },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', decimals: 2, enabled: true },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'SAR', decimals: 2, enabled: true },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', decimals: 2, enabled: true },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', decimals: 2, enabled: true },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', decimals: 0, enabled: true },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', decimals: 2, enabled: true },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', decimals: 2, enabled: true },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', decimals: 2, enabled: true }
];
