# EDUCATION PAYMENT ARCHITECTURE

## 1. Sector-to-Primitive Mapping
In Jumo, the "SchoolPay" or "Education" module is an abstraction over the Universal Core:

| Education Term | Jumo Universal Primitive |
|----------------|--------------------------|
| **Student**    | Party (Role: LEARNER) |
| **Parent**     | Party (Role: SPONSOR) |
| **Tuition Fee**| OpenItem (Type: OBLIGATION) |
| **Term Bill**  | JournalEntry (posted to Receivables) |
| **Bursary**    | JournalEntry (posted to Revenue/Expense) |
| **School Fee Payment** | Universal Payment |

## 2. Implementation Strategy
- **Identity**: Students are stored in the `parties` table with metadata fields for `grade_level` and `boarding_status`.
- **Billing**: Termly fees are generated as `OpenItems`.
- **USSD Menus**: Configured to use "Student ID" and "Pay Fees" terminology via the `ConfigEngine`.
- **Reporting**: Arrears reports are simply filtered `OpenItem` aging reports.

## 3. Integration with Ledger
When a Student (Party) is billed:
1. `DEBIT`: Accounts Receivable (Student Control)
2. `CREDIT`: Revenue (Tuition Fees)

When a Payment is received:
1. `DEBIT`: Cash/Clearing Account
2. `CREDIT`: Accounts Receivable (Student Control)
3. `ALLOCATION`: Link payment to specific `OpenItem` (e.g., "Term 3 Fees").
