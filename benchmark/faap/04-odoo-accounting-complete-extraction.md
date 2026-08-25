# Benchmark Extraction: Odoo Accounting
## Level 1 — Product Identity
*   **Product Name:** Odoo Accounting
*   **Product Category:** Open-Source Integrated Enterprise Accounting & ERP Module
*   **Target Market:** Fast-growing startups, manufacturing units, and service-based organizations.
*   **Target Users:** In-house accountants, operational team leaders, administrators.
*   **Deployment Model:** On-Premise (Community/Enterprise) or Cloud (Odoo.sh).
*   **API/Developer Surfaces:** XML-RPC and REST APIs, custom Python modules, Odoo Studio customization builder.

---

## Level 2 — Organizational Structure & Offices
*   **Billing & Client Relations Office:** Connects CRM sales funnels directly to billing systems.
*   **Inventory & Warehousing Desk:** Links asset inventories directly to balance sheet valuations.
*   **Human Resources Desk:** Manages timesheets, payroll entries, and employee expenses.

---

## Level 3 — Core Functional Modules
*   **Odoo Bank Reconciliation Tool:** Matches bank statements with client invoices using an intelligent predictive matcher.
*   **Asset Management Module:** Configures linear, degressive, or accelerated asset depreciation schedules.
*   **Expenses Tracker:** Mobile-friendly tool allowing staff to scan purchase receipts and request cash repayments.

---

## Level 4 — Portals and Access Levels
*   **Accountant Portal:** View ledger balances, trial balances, cash-flow statements, and manage tax files.
*   **Customer Portal:** Allows clients to download invoices, check billing statements, and pay via Stripe/PayPal.

---

## Level 5 — Core Business Workflows
1.  **Expense Reimbursement to Journal Post:**
    *   *Trigger:* Employee scans and uploads dinner receipt on mobile.
    *   *Approval:* Manager reviews and approves expense.
    *   *Journal:* Generates debit entry to Travel & Entertainment expenses and credit to Accounts Payable.
    *   *Settlement:* System schedules reimbursement bank transfer.
2.  **Inventory Asset Capitalization:**
    *   *Trigger:* Receiving desk confirms asset receipt.
    *   *Update:* Capitalizes inventory item on balance sheet automatically.
