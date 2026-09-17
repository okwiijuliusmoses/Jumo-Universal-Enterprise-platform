# ACCOUNTING ARCHITECTURE

## 1. Core Philosophy
Jumo implements a **Polymorphic Double-Entry Accounting Engine**. Unlike sector-specific systems, Jumo treats every financial event as a set of atomic ledger postings against universal primitives.

## 2. Universal Primitives
- **Tenant**: The sovereign owner of the data (Multi-tenant isolation).
- **Party**: A polymorphic entity (Customer, Student, Parishioner, Vendor).
- **Ledger Account**: A node in the hierarchical Chart of Accounts (COA).
- **Journal Entry**: An immutable record of a financial event.
- **Journal Line**: A single debit or credit posting.

## 3. The Double-Entry Invariant
For every `JournalEntry`, the engine enforces:
`SUM(JournalLine.debit_minor) == SUM(JournalLine.credit_minor)`

## 4. Hierarchy of Accounts (COA)
Accounts are categorized by standard accounting types:
1. **Asset** (Debit balance)
2. **Liability** (Credit balance)
3. **Equity** (Credit balance)
4. **Revenue** (Credit balance)
5. **Expense** (Debit balance)

## 5. Posting Logic
1. **Validation**: Check balance parity and period locks.
2. **Persistence**: Atomic insertion into `journal_entries` and `journal_lines`.
3. **Rollup**: Update `ledger_accounts.balance_minor`.
4. **Immutability**: Once posted, a journal entry cannot be deleted. It must be **reversed** by a new entry.

## 6. Accounts Receivable (AR) & Open Items
- **OpenItem**: Represents a financial obligation (Invoice, Pledge, Fee).
- **Direction**: `DEBIT` for receivables (money owed to us).
- **Aging**: Tracked via `due_date`.
- **Allocation**: Payments are applied to `OpenItems` using a configurable policy (e.g., FIFO).
