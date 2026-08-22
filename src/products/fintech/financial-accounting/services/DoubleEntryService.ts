import { JournalEntry, JournalEntryLine } from '../domain/FaapModels';

export class DoubleEntryService {
  /**
   * Validates that the sum of debits strictly equals the sum of credits.
   * This is the core ledger integrity principle extracted from FAAP benchmarks.
   */
  static validateParity(lines: JournalEntryLine[]): boolean {
    let debits = 0;
    let credits = 0;

    lines.forEach(line => {
      // In a real system, precision math libraries like decimal.js would be used.
      if (line.type === 'DEBIT') debits += line.amount;
      if (line.type === 'CREDIT') credits += line.amount;
    });

    // Enforce $0.00 offset
    return Math.abs(debits - credits) < 0.0001; 
  }

  /**
   * Simulates posting a journal entry after parity validation and 
   * generating a cryptographic integrity hash.
   */
  static async postTransaction(entry: JournalEntry): Promise<{ success: boolean; error?: string; hash?: string }> {
    if (!this.validateParity(entry.lines)) {
      return { success: false, error: 'Ledger Parity Failure: Debits do not match Credits.' };
    }

    if (entry.lines.length < 2) {
      return { success: false, error: 'Double-entry requires at least two lines.' };
    }

    // Simulate cryptographic sealing (e.g. SHA-256 of lines + previous block hash)
    const mockHash = 'faap_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
    
    entry.status = 'POSTED';
    entry.integrityHash = mockHash;

    // In a real implementation, persist to Database here.
    return { success: true, hash: mockHash };
  }
}
