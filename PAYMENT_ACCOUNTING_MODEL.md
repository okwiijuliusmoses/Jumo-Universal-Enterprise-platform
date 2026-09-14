# PAYMENT ACCOUNTING MODEL

## 1. Economic Event Lifecycle

The Jumo Universal Core distinguishes between separate economic events to ensure auditability and regulatory compliance.

### Event 1: Payment Notification (Webhook Received)
**Economic Fact**: A payment provider claims funds have been sent by a party.
**Accounting Treatment**: 
- **Debit**: `1030-CLEARING` (Asset - Pending Settlement)
- **Credit**: `2020-LIABILITIES` (Liability - Unallocated Funds / Wallet)

### Event 2: Allocation Execution (Authoritative)
**Economic Fact**: The system matches the payment to specific outstanding dues.
**Accounting Treatment**:
- **Debit**: `2020-LIABILITIES` (Liability - Wallet)
- **Credit**: `1200-RECEIVABLES` (Asset - Settlement of Open Items)

### Event 3: Settlement (Provider Payout)
**Economic Fact**: The payment provider settles the funds into the tenant's bank account.
**Accounting Treatment**:
- **Debit**: `1010-CASH-BANK` (Asset - Realized Cash)
- **Credit**: `1030-CLEARING` (Asset - Offset Pending Settlement)

## 2. Universal Journal Entry Patterns

### pattern: ALLOCATION_AT_SOURCE (Standard)
Used when allocation happens instantly upon webhook receipt.
1. **Debit**: Clearing Account (Total Amount)
2. **Credit**: Receivables Account (Allocated Amount)
3. **Credit**: Wallet Liability Account (Residual Amount)

### pattern: OVERPAYMENT_UTILIZATION
Used when an existing wallet balance is applied to a new invoice.
1. **Debit**: Wallet Liability Account
2. **Credit**: Receivables Account

## 3. Invariants
- **Parity**: Every journal entry must result in `Debit - Credit = 0`.
- **Exclusivity**: A single ledger line cannot contain both a debit and a credit.
- **Precision**: All amounts must be stored as `BIGINT` minor units.
- **Immutability**: Once `POSTED`, a journal entry cannot be modified. Reversals must be handled via a separate `REVERSAL` entry.
