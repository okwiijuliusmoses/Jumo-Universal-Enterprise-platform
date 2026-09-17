# JUMO FINANCIAL AUTHORITY MATRIX

## 1. EXECUTIVE SUMMARY & DOMAIN BOUNDARY PRINCIPLE

The Jumo Universal Enterprise Platform operates on a strict **No Dual Financial Engine Policy**. To maintain mathematical general ledger integrity and prevent competing, fragmented accounting states, financial authority is explicitly segregated across mature, authoritative open-source applications.

**Jumo is NOT a General Ledger.** Jumo scratch or adapter classes (such as `UniversalAccountingEngine`, `UniversalPaymentEngine`, and `BalancerService`) are strictly **Integration Adapters, Gateway Proxies, and Cross-System Reconciliation Coordinators**. They must never compete with or duplicate the core accounting, lending, billing, or payment logic of authoritative backend applications.

---

## 2. EXPLICIT FINANCIAL AUTHORITY MATRIX

| Application | Domain Boundary | Explicit Authoritative Scope | Non-Authoritative / Delegated Scope | Primary API / Protocol |
| :--- | :--- | :--- | :--- | :--- |
| **ERPNext** (`frappe/erpnext`) | **Enterprise Accounting & General Ledger** | • Enterprise General Ledger (GL)<br>• Accounts Receivable (AR) & Accounts Payable (AP)<br>• Enterprise Invoices & Tax Calculations<br>• Financial Statements (Balance Sheet, P&L, Trial Balance)<br>• Corporate Accounting Reports & Audit Logs | • Loan amortization schedules (delegated to Fineract)<br>• Subscription dunning logic (delegated to Kill Bill)<br>• Provider-level payment routing (delegated to Hyperswitch) | REST API / Frappe Desk UI |
| **Apache Fineract** (`apache/fineract`) | **Lending, Microfinance & SACCO** | • Member Loan Accounts & Portfolio Balances<br>• Loan Amortization & Repayment Schedules<br>• Loan Disbursal & Repayment Transactions<br>• Savings & Fixed Deposit Accounts<br>• SACCO Member Financial Records | • Corporate double-entry GL (posted/mapped to ERPNext)<br>• Credit card payment gateway processing (delegated to Hyperswitch)<br>• SaaS recurring subscriptions (delegated to Kill Bill) | REST API / Mifos Web UI |
| **Kill Bill** (`killbill/killbill`) | **Subscription & Recurring Billing** | • Product Catalog & Subscription Lifecycle<br>• Recurring Billing Cycles & Plan Transitions<br>• Subscription Invoice Generation<br>• Dunning & Retry Policies | • Payment gateway network routing (delegated to Hyperswitch)<br>• Enterprise tax & corporate balance sheet (delegated to ERPNext)<br>• Microfinance loan portfolios (delegated to Fineract) | REST API / Kaui Admin UI |
| **Hyperswitch** (`juspay/hyperswitch`) | **Payment Orchestration & PSP Routing** | • Payment Intent Lifecycle & State Machine<br>• Merchant Payment Provider (PSP) Smart Routing<br>• Mobile Money & Bank Connector Integration<br>• Provider Transaction Status & Webhook Verification | • Permanent General Ledger balances (delegated to ERPNext)<br>• Member loan principal ledger (delegated to Fineract)<br>• SaaS subscription catalog (delegated to Kill Bill) | REST API / Control Center UI |
| **Keycloak** (`keycloak/keycloak`) | **Identity, SSO & Access Control** | • User Identity Federation & OpenID Connect (OIDC)<br>• JWT Access & Refresh Token Issuance<br>• Multi-Tenant RBAC & Realm Security Policies | • Financial balances or transactional state | OIDC / OAuth2 / SAML |
| **Jumo Platform** (`jumo/core`) | **Integration, Routing & Reconciliation** | • Universal Tenant Registry & App Directory<br>• Identity & Cross-Application ID Mapping<br>• API Gateway / Webhook Proxy & Signature Verification<br>• Event Coordination & Idempotency Locking<br>• Cross-System Financial Reconciliation & Audit Trail | • General Ledger posting (must route to ERPNext)<br>• Loan balances (must route to Fineract)<br>• Payment execution (must route to Hyperswitch) | REST API Gateway / Shell UI |

---

## 3. STRICT ANTI-DUPLICATION & COMPLIANCE MANDATE

### Rule 1: Single Source of Truth for Ledger Entries
- Any double-entry credit or debit reflecting enterprise asset, liability, equity, revenue, or expense changes **MUST** originate in or synchronize with **ERPNext**.
- `UniversalAccountingEngine` serves purely as an idempotent REST/RPC client that formats and delivers journal entries to ERPNext.

### Rule 2: Single Source of Truth for Member Loan Portfolios
- Member loan principal, interest accrual, penalty fees, and repayment schedules **MUST** reside authoritatively in **Apache Fineract**.
- Fineract loan transactions trigger financial notification webhooks that Jumo routes to ERPNext for consolidated GL reporting.

### Rule 3: Single Source of Truth for Subscriptions
- Recurring plan terms, renewal schedules, and tier billing **MUST** be governed by **Kill Bill**.

### Rule 4: Single Source of Truth for Payment Provider Status
- All credit card, mobile money (MTN MoMo, Airtel Money), and bank transfer attempts are orchestrated by **Hyperswitch**.
- No payment is marked `COMPLETED` without Hyperswitch webhook payload signature validation.

---

## 4. TEMPORARY ADAPTER & MIGRATION GOVERNANCE

The existing Jumo helper components:
- `UniversalAccountingEngine` (`src/core/financial/UniversalAccountingEngine.ts`)
- `UniversalPaymentEngine` (`src/core/financial/UniversalPaymentEngine.ts`)
- `ReconciliationService` (`src/core/digitalpay/reconciliationService.ts`)

are strictly categorized as **Temporary Compatibility Adapters**. They:
1. Provide backward-compatible interface contracts during live platform integration.
2. Proxy inbound platform API requests to ERPNext, Fineract, Kill Bill, and Hyperswitch.
3. Enforce idempotency keys before forwarding payloads to downstream services.
4. Will be refactored into lightweight pass-through proxies upon full native service container orchestration.
