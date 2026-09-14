# PAYMENT ARCHITECTURE

## 1. Universal Payment Abstraction
Jumo decouple's the *source* of funds (MTN, Bank, Stripe) from the *destination* of funds (Ledger, OpenItem, Wallet).

## 2. Core Primitives
- **PaymentIntent**: The declaration of intent to pay.
- **Payment**: The record of a successful financial remittance.
- **PaymentAllocation**: The mapping of a `Payment` to one or more `OpenItems`.
- **Settlement**: The final movement of funds into a clearing account.
- **DigitalWallet**: A liability account for unapplied or excess funds (Overpayments).

## 3. Allocation Flow
1. **Webhook Ingress**: Provider sends normalized notification.
2. **Signature Verification**: HMAC-SHA256 verification of request authenticity.
3. **Identity Resolution**: Map `partyId` or `metadata` to a Jumo `Party`.
4. **FIFO Allocation**:
    - Fetch `OpenItems` for the `Party`.
    - Sort by `due_date`.
    - Apply payment amount to `remaining_minor` until exhausted.
5. **Wallet Spillover**: Any residual amount is credited to the Party's `DigitalWallet`.

## 4. Payment Provider Adapters
Providers are integrated via a standard interface:
- `verifySignature(headers, body, secret)`
- `normalizeEvent(payload)`
- `processRefund(paymentId, amount)`

## 5. Idempotency & Replay Protection
- `external_reference` / `provider_tx_id` are indexed uniquely.
- Webhooks check for existing `Payment` records before processing.
