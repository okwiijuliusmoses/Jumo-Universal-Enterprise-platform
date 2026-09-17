# JUMO FINANCIAL INTEGRATION MAP

This document defines the architectural boundaries, cross-system transactional flows, webhook gateway specifications, idempotency protocols, and reconciliation schemas for the Jumo Financial Platform.

---

## 1. INTEGRATION ARCHITECTURE & BOUNDARIES

```
                                      CUSTOMER / USER
                                             │
                                             ▼
                                    JUMO UNIVERSAL SHELL
                           (Keycloak Auth & Tenant Router)
                                             │
                     ┌───────────────────────┼───────────────────────┐
                     │                       │                       │
                     ▼                       ▼                       ▼
                LENDING FLOW           BILLING FLOW           PURCHASE FLOW
                     │                       │                       │
                     ▼                       ▼                       ▼
              APACHE FINERACT            KILL BILL               ERPNEXT
            (Loans & Repayments)      (Subscriptions)       (Invoices & Orders)
                     │                       │                       │
                     └───────────────────────┼───────────────────────┘
                                             │
                                             ▼
                                        HYPERSWITCH
                                  (Payment Orchestration)
                                             │
                                             ▼
                                 BANKS / MOBILE MONEY / PSPs
                                 (MTN MoMo, Airtel, SWIFT)
                                             │
                                             ▼
                                JUMO WEBHOOK & INTEGRATION
                                   RECONCILIATION GATEWAY
                                             │
                     ┌───────────────────────┴───────────────────────┐
                     ▼                                               ▼
                  ERPNEXT                                     APACHE FINERACT
         (General Ledger Sync)                           (Credit Loan Repayment)
```

---

## 2. DETAILED CROSS-SYSTEM FINANCIAL FLOWS

### 2.1 Standard Payment Flow (Customer Payment → General Ledger)

```
Customer 
  ──► Jumo Payment Gateway 
  ──► Hyperswitch Payment Intent (POST /payments)
  ──► Provider (MTN MoMo / Bank / Card)
  ──► Provider Webhook Callback
  ──► Jumo Webhook Gateway (Signature Verification + Idempotency Lock)
  ──► Determine Financial Domain (Invoicing vs Loan vs Subscription)
  ──► Forward to Authoritative Application (ERPNext / Fineract / Kill Bill)
  ──► Record Accounting Consequence (ERPNext GL Entry)
  ──► Jumo Reconciliation Engine (Link Source TX to Dest TX)
  ──► Final Status Delivered to Client
```

**Step-by-Step Mechanism**:
1. **Initiation**: Client requests payment execution. Jumo creates an integration session and calls Hyperswitch `/payments` with a unique `idempotency_key`.
2. **Provider Dispatch**: Hyperswitch dispatches payload to selected provider (e.g. MTN MoMo sandbox).
3. **Webhook Processing**: Provider fires webhook to `POST /api/v1/allocation/webhook`.
4. **Validation & Idempotency**: Jumo validates HMAC signature (`X-Hyperswitch-Signature`). Checks redis/memory cache for `idempotency_key`. If already processed, returns HTTP `200 OK` without duplicating financial entries.
5. **Domain Determination & Execution**:
   - If `metadata.domain == "LOAN"`, route repayment to **Apache Fineract**.
   - If `metadata.domain == "SUBSCRIPTION"`, route payment status to **Kill Bill**.
   - If `metadata.domain == "INVOICE"`, update invoice balance in **ERPNext**.
6. **GL Accounting Post**: Jumo posts double-entry journal (`1010-BANK` Debit, `1020-AR` Credit) to **ERPNext**.
7. **Reconciliation Logging**: Audit record created linking `provider_tx_id`, `hyperswitch_intent_id`, `jumo_event_id`, and `erpnext_journal_id`.

---

### 2.2 Kill Bill Subscription Billing Flow

```
Subscription Initiated (Kill Bill Catalog)
  ──► Kill Bill Invoicing Engine (Generates Subscription Invoice)
  ──► Payment Request to Hyperswitch (POST /payments/orchestrate)
  ──► Provider Authorization (Mobile Money / Credit Card)
  ──► Webhook to Jumo Webhook Gateway
  ──► Signature & Idempotency Check
  ──► Kill Bill Payment Status Update (Invoice status -> PAID)
  ──► Accounting Sweep to ERPNext (Recognize Recurring Revenue)
  ──► Reconciliation Record Created
```

---

### 2.3 Fineract Loan Repayment & ERPNext GL Synchronization

```
Fineract Loan Repayment Scheduled
  ──► Collection Sweep executed via Hyperswitch
  ──► Payment Confirmed via Signed Webhook
  ──► Fineract Loan API called (/loans/{id}/transactions?command=repayment)
  ──► Member Loan Balance updated in Fineract
  ──► Jumo Integration Event Fired (EVT-JUMO-LOAN-REPAY)
  ──► ERPNext GL Journal Entry Posted (Debit Bank, Credit Loan Principal Receivable)
  ──► Reconciliation Record Created (Fineract Loan TX ◄──► ERPNext GL TX)
```

---

## 3. FINERACT & ERPNEXT RECONCILIATION INTEGRATION BOUNDARY SCHEMA

To bridge Fineract internal loan balances with ERPNext corporate General Ledger entries, Jumo maintains an explicit **Reconciliation Audit Schema**:

```typescript
export interface FinancialReconciliationRecord {
  /** Unique Jumo reconciliation audit link identifier */
  id: string;
  
  /** Upstream application source transaction ID (e.g. Fineract Loan Repayment ID) */
  source_tx_id: string;
  
  /** Downstream accounting transaction ID (e.g. ERPNext Journal Entry ID) */
  dest_tx_id: string;
  
  /** Jumo Multi-Tenant Identifier */
  tenant_id: string;
  
  /** Financial domain (LOAN_REPAYMENT | SUBSCRIPTION_INVOICE | RETAIL_SALE) */
  financial_domain: "LOAN_REPAYMENT" | "SUBSCRIPTION_INVOICE" | "RETAIL_SALE";
  
  /** Transaction amount in minor units (e.g., 500000 = UGX 5,000) */
  amount_minor: number;
  
  /** ISO 4217 Currency Code (e.g., UGX, USD, EUR) */
  currency_code: string;
  
  /** ISO 8601 Transaction Timestamp */
  tx_date: string;
  
  /** External PSP / Provider reference (e.g. MTN MoMo Reference Number) */
  external_payment_ref: string;
  
  /** Reconciliation status: MATCHED | PENDING | DISCREPANCY | RETRYING */
  reconciliation_status: "MATCHED" | "PENDING" | "DISCREPANCY" | "RETRYING";
  
  /** Retry counter for transient network/API failures */
  retry_count: number;
  
  /** Detailed error/failure state log if reconciliation requires intervention */
  failure_reason?: string;
  
  /** Strict Idempotency Key to enforce single-execution guarantee */
  idempotency_key: string;
}
```

---

## 4. IDEMPOTENCY & SAFETY GUARANTEES

1. **Header Enforcement**: All financial webhook and REST payloads require `X-Idempotency-Key` or `metadata.idempotency_key`.
2. **Atomic Lock**: Upon payload receipt, Jumo inserts the idempotency key into a transaction registry. If key exists with status `PROCESSED`, request is ignored gracefully.
3. **No Financial Proof on Raw Provider Response**: A `200 OK` from a payment provider is treated as a transient transport acknowledgment. Financial entries are written **ONLY** after signed webhook verification and downstream ledger confirmation.
4. **Reversal Audit**: Any disputed or refunded transaction generates a perfect offsetting journal entry (`REV-*`) in ERPNext; historical entries are never deleted or mutated.
