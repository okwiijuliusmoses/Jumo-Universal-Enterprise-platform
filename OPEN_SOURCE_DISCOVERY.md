# OPEN SOURCE DISCOVERY

This document records mature open-source systems identified as candidates for the Jumo Universal Enterprise Platform foundation.

## 1. Accounting & ERP Foundations

### ERPNext (Frappe Framework)
- **Repository**: `frappe/erpnext`
- **Functional Strength**: World-class General Ledger, Multi-currency, Stock, HR, and Project Management.
- **Tech Stack**: Python (Backend), JavaScript/React (Frontend), MariaDB/PostgreSQL.
- **Reuse Strategy**: Transplant the **General Ledger (GL) schema** and **Double-Entry invariants**. Reuse UI patterns from the Frappe Desk.

### Odoo (Community Edition)
- **Repository**: `odoo/odoo`
- **Functional Strength**: Massive modular ecosystem (30k+ apps).
- **Tech Stack**: Python, JavaScript, PostgreSQL.
- **Reuse Strategy**: Reference the **Modular Architecture** and **Accounting Workflow** (Invoice -> Payment -> Recon).

### Dolibarr ERP
- **Repository**: `Dolibarr/dolibarr`
- **Functional Strength**: Mature, simple SME focus. 
- **Tech Stack**: PHP, MySQL/PostgreSQL.
- **Reuse Strategy**: Functional reference for **SME-specific simple accounting** and **Bank Reconciliation**.

## 2. Billing & Payment Orchestration

### Kill Bill
- **Repository**: `killbill/killbill`
- **Functional Strength**: The leading open-source subscription billing platform. Handles complex dunning, instalments, and recurring cycles.
- **Tech Stack**: Java, MySQL/PostgreSQL.
- **Reuse Strategy**: **TRANSPLANT**. Migrate the Billing State Machine and Invoicing Engine logic to Jumo TypeScript.

### Hyperswitch
- **Repository**: `juspay/hyperswitch`
- **Functional Strength**: Modern payment orchestration and gateway abstraction.
- **Tech Stack**: Rust (Core), Node.js (Connectors).
- **Reuse Strategy**: **FORK/REUSE**. Use the Node.js connector architecture for Jumo's mobile money and bank adapters.

### Lago
- **Repository**: `getlago/lago`
- **Functional Strength**: Usage-based billing.
- **Tech Stack**: Go/React.
- **Reuse Strategy**: UI/UX reference for usage metering dashboards.

## 3. Banking & Multi-Tenant Finance

### Apache Fineract (Mifos X)
- **Repository**: `apache/fineract`
- **Functional Strength**: Core banking system for SACCOs and Microfinance. Handles loan amortization, deposits, and interest.
- **Tech Stack**: Java, MySQL.
- **Reuse Strategy**: Transplant the **Loan Amortization Schedules** and **Savings Product definitions**.
