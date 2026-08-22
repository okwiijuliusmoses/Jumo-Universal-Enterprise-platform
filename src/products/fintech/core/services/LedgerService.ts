import { 
  LedgerTransaction, 
  PostTransactionRequest, 
  LedgerEntry 
} from '../domain/LedgerEntry';

export interface LedgerService {
  /**
   * Posts a multi-entry financial transaction ensuring double-entry parity
   * The sum of credits must exactly equal the sum of debits
   */
  postTransaction(request: PostTransactionRequest): Promise<LedgerTransaction>;

  /**
   * Retrieves a transaction by its ID
   */
  getTransaction(transactionId: string): Promise<LedgerTransaction | null>;

  /**
   * Retrieves all entries for a specific account, paginated
   */
  getAccountEntries(accountId: string, limit?: number, offset?: number): Promise<LedgerEntry[]>;

  /**
   * Validates if a set of proposed entries satisfies double-entry parity rules
   */
  validateParity(entries: Omit<LedgerEntry, 'id' | 'transactionId' | 'timestamp'>[]): boolean;
}
