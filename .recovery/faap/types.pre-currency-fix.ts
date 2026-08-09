export interface UniversalTransaction {
  id: string;
  tenantId: string;
  sourceModule: string;
  transactionType: 'DEBIT' | 'CREDIT' | 'TRANSFER' | 'FEE';
  amount: number;
  currency: string;
  debitAccount: string;
  creditAccount: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SETTLED';
  approvalState: 'REQUIRED' | 'APPROVED' | 'DENIED';
  auditTrail: string[];
  createdAt: Date;
}
