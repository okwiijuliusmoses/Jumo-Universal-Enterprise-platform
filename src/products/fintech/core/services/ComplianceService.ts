import { 
  ComplianceReport, 
  ComplianceRule, 
  ComplianceViolation 
} from '../domain/ComplianceReport';
import { LedgerTransaction } from '../domain/LedgerEntry';

export interface ComplianceService {
  /**
   * Evaluates a transaction against active compliance rules
   */
  evaluateTransaction(transaction: LedgerTransaction): Promise<ComplianceViolation[]>;

  /**
   * Generates a regulatory compliance report for a given period
   */
  generateReport(tenantId: string, type: string, startDate: string, endDate: string): Promise<ComplianceReport>;

  /**
   * Retrieves active compliance rules
   */
  getActiveRules(): Promise<ComplianceRule[]>;
  
  /**
   * Updates the status of a compliance violation
   */
  resolveViolation(violationId: string, resolution: string, notes: string): Promise<ComplianceViolation>;
}
