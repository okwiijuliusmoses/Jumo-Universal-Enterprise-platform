import { 
  FinancialAccount, 
  AccountCreateRequest, 
  AccountBalanceQuery,
  BalanceResponse 
} from '../domain/FinancialAccount';

export interface FinancialAccountService {
  /**
   * Provisions a new core financial account
   */
  createAccount(request: AccountCreateRequest): Promise<FinancialAccount>;

  /**
   * Retrieves an account by its unique identifier
   */
  getAccount(accountId: string): Promise<FinancialAccount | null>;

  /**
   * Computes the real-time balance of an account
   */
  getBalance(query: AccountBalanceQuery): Promise<BalanceResponse>;

  /**
   * Validates if an account can receive a debit of the specified amount
   */
  validateDebitCapability(accountId: string, amount: number): Promise<boolean>;
}
