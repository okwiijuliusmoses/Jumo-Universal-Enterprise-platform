# Benchmark Extraction: Xero
## Level 1 — Product Identity
*   **Product Name:** Xero Accounting
*   **Product Category:** Small Business Cloud Accounting software
*   **Target Market:** Small businesses, freelancers, startups, and bookkeeping practices.
*   **Target Users:** Small business owners, freelance contractors, bookkeeping staff.
*   **Deployment Model:** Public Cloud SaaS.
*   **API/Developer Surfaces:** Xero Developer Platform (OAuth 2.0, REST APIs, Webhook event subscriptions).

---

## Level 2 — Organizational Structure & Offices
*   **Billing & Client Payments Desk:** Issues payment link invoices and manages online card collections.
*   **Reconciliations & Cash Management Office:** Matches bank statements with sales ledgers and updates cashbooks.

---

## Level 3 — Core Functional Modules
*   **Xero Bank Reconciliation Engine:** Combines bank statements and general ledger transactions via a drag-and-drop matching UI.
*   **Xero Projects:** Time-tracker and expense manager linking project-specific labor costs directly to client invoices.
*   **Online Invoicing Hub:** Automatically constructs interactive checkout links (e.g. Stripe, GoCardless) and updates ledger balances.

---

## Level 4 — Portals and Access Levels
*   **Xero Dashboard:** Standard indicators (Business Performance, Cash In/Out, Bank Account balances), to-do list, and invoices to approve.
*   **Partner/Advisor Workspace:** Tailored dashboard for external accountants to run adjustments journals and tax filings.

---

## Level 5 — Core Business Workflows
1.  **Project Time Billing:**
    *   *Trigger:* Contractor completes 5 billable hours on project tracker.
    *   *Invoice:* Automatically formats, registers, and emails customer invoice with online checkout link.
2.  **Bank Feed Reconciliation Match:**
    *   *Trigger:* Bank statement logs micro-deposit.
    *   *Action:* Xero matches deposit with invoice. Clicking "OK" updates G/L books instantly.
