# JUMO_FINANCIAL_INTEGRATION_MAP

This document maps the financial, accounting, lending, billing, and payment integration boundaries across the mature open-source applications forming the Jumo Financial Platform.

---

## 1. FINANCIAL DOMAIN AUTHORITY MATRIX

| Financial Capability | Authoritative Application | API / Interface Endpoint | Database / Ledger Boundary | Integration Mechanism |
| :--- | :--- | :--- | :--- | :--- |
| **Enterprise Accounting** | **ERPNext** (`frappe/erpnext`) | `/api/resource/Journal Entry`, `/api/resource/Sales Invoice` | MariaDB (`tabGL Entry`, `tabAccounts`) | REST API Proxy / Webhooks |
| **General Ledger (GL)** | **ERPNext** (`frappe/erpnext`) | `/api/method/erpnext.accounts.general_ledger.get_general_ledger` | MariaDB | REST API Proxy |
| **Accounts Receivable / Payable** | **ERPNext** (`frappe/erpnext`) | `/api/resource/Accounts Receivable`, `/api/resource/Accounts Payable` | MariaDB | REST API Proxy |
| **Enterprise Invoicing** | **ERPNext** (`frappe/erpnext`) | `/api/resource/Sales Invoice` | MariaDB | REST API Proxy |
| **Inventory Accounting** | **ERPNext** (`frappe/erpnext`) | `/api/resource/Stock Entry` | MariaDB | REST API Proxy |
| **Lending & Microfinance** | **Apache Fineract** (`apache/fineract`) | `/fineract-provider/api/v1/loans` | MySQL / PostgreSQL (`m_loan`, `m_loan_transaction`) | REST API / Angular UI (Mifos Web) |
| **Savings & Deposit Accounts** | **Apache Fineract** (`apache/fineract`) | `/fineract-provider/api/v1/savingsaccounts` | MySQL / PostgreSQL (`m_savings_account`) | REST API / Mifos Web UI |
| **SACCO / Portfolio Mgmt** | **Apache Fineract** (`apache/fineract`) | `/fineract-provider/api/v1/clients` | MySQL / PostgreSQL | REST API / Mifos Web UI |
| **Subscription & Billing** | **Kill Bill** (`killbill/killbill`) | `/1.0/kb/subscriptions`, `/1.0/kb/invoices` | PostgreSQL (`subscriptions`, `invoices`) | REST API / Kaui Rails Admin |
| **Payment Orchestration** | **Hyperswitch** (`juspay/hyperswitch`) | `/payments`, `/payment_intents` | PostgreSQL (`payments`, `merchant_account`) | REST API / React Control Center |
| **Payment Connectors & PSPs** | **Hyperswitch** (`juspay/hyperswitch`) | `/account/connectors` | PostgreSQL (`merchant_connector_account`) | Native Rust Connectors |
| **Financial Services UI** | **Mifos Web** (`openMF/web-app`) | Angular Single Page Application | Fineract REST API | Native Angular Web App Bridge |
| **Identity & Authentication** | **Keycloak** (`keycloak/keycloak`) | `/realms/jumo/protocol/openid-connect/token` | PostgreSQL (`user_entity`, `realm`) | OIDC / OAuth2 / SAML |

---

## 2. CROSS-APPLICATION TRANSACTION & PAYMENT FLOWS

```
                                  CUSTOMER / USER
                                         │
                                         ▼
                                JUMO UNIVERSAL SHELL
                               (Tenant & Auth Router)
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
                             (MTN MoMo, Airtel, SWIFT, RTGS)
                                         │
                                         ▼
                                 WEBHOOK / EVENT BUS
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
              ERPNEXT                                     APACHE FINERACT
     (Post GL Reconciliation)                        (Credit Loan Repayment)
```

### Flow 1: Enterprise Payment & Invoicing
1. **Invoice Generation**: ERPNext generates a `Sales Invoice` with a unique PRN (Payment Registration Number).
2. **Payment Orchestration**: Jumo routes the payment request to **Hyperswitch** (`/payments`).
3. **PSP Execution**: Hyperswitch dispatches the transaction to the destination bank or telco connector (e.g. MTN MoMo / Airtel Money).
4. **Webhook Processing**: Upon success, Hyperswitch posts a signed webhook to Jumo.
5. **Ledger Reconciliation**: Jumo calls ERPNext REST API (`/api/resource/Payment Entry`) to settle the receivable against `1030-CLEARING` and debit `1010-BANK`.

### Flow 2: Lending & SACCO Repayment (Fineract + Hyperswitch + ERPNext)
1. **Repayment Schedule**: Fineract generates the loan repayment schedule (`/fineract-provider/api/v1/loans/{loanId}`).
2. **Collection Sweep**: Payment is executed via Hyperswitch payment connector.
3. **Loan Credit**: Upon successful webhook response, Fineract's loan repayment API (`/fineract-provider/api/v1/loans/{loanId}/transactions?command=repayment`) credits the member loan.
4. **Accounting Sweep**: Disbursed principal and collected interest generate a consolidated journal entry in **ERPNext** General Ledger.

---

## 3. INTEGRATION APIS AND WEBHOOK SPECIFICATION

### Keycloak OIDC Token Authentication
- **Endpoint**: `POST /realms/jumo/protocol/openid-connect/token`
- **Headers**: `Content-Type: application/x-www-form-urlencoded`
- **Grant Type**: `client_credentials` or `authorization_code`
- **Response**: JWT `access_token` containing Jumo Tenant ID and role claims (`SWITCH_GOVERNOR`, `SACCO_MANAGER`, `CHIEF_ACCOUNTANT`).

### Hyperswitch Payment Intent API
- **Endpoint**: `POST /api/v1/payments/orchestrate`
- **Payload**:
  ```json
  {
    "amount": 250000,
    "currency": "UGX",
    "merchant_id": "jumo_fintech_ug",
    "payment_method": "mobile_money",
    "connector": ["mtn_momo", "airtel_money"],
    "metadata": {
      "tenant_id": "TENT-1",
      "invoice_id": "ACC-INV-2026-001",
      "loan_id": "LOAN-9842"
    }
  }
  ```

### ERPNext Ledger Journal Synchronization API
- **Endpoint**: `POST /api/v1/integration/erpnext/journal`
- **Payload**:
  ```json
  {
    "posting_date": "2026-09-14",
    "voucher_type": "Journal Entry",
    "company": "Jumo Enterprise Uganda",
    "accounts": [
      {
        "account": "1010 - Bank Cash Account - JUE",
        "debit_in_account_currency": 250000,
        "credit_in_account_currency": 0
      },
      {
        "account": "1030 - Transit Clearing Pool - JUE",
        "debit_in_account_currency": 0,
        "credit_in_account_currency": 250000
      }
    ]
  }
  ```

---

## 4. JUMO ORCHESTRATION ADAPTER LAYER

The Jumo TypeScript engine (`server.ts`, `/services`) functions strictly as the **Platform Orchestration & API Proxy Gateway**:
- **Tenant & Service Registry**: Routes client requests to the appropriate upstream application instance (`ERPNext`, `Fineract`, `Kill Bill`, `Hyperswitch`, `Keycloak`).
- **Unified Auth Proxy**: Intercepts requests, validates Keycloak JWTs, and injects backend credentials.
- **Universal Event Dispatcher**: Receives webhooks from Hyperswitch / Banks and fans out events to ERPNext GL and Fineract loan ledgers.
- **Reconciliation Engine**: Audits transaction parity across Hyperswitch payment logs, Fineract loan schedules, and ERPNext General Ledger.

---
**STATUS: ARCHITECTURE LOCKED AND DOCUMENTED.**
