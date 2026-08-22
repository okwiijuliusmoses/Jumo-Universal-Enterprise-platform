# Benchmark Extraction: QuickBooks Online
## Level 1 — Product Identity
*   **Product Name:** QuickBooks Online (QBO)
*   **Product Category:** Small & Medium Business (SMB) Cloud Accounting Platform
*   **Target Market:** Small to medium businesses, independent consultants, and CPA bookkeeping professionals.
*   **Target Users:** Business owners, administrative accountants, external auditors, tax professionals.
*   **Deployment Model:** Cloud SaaS.
*   **API/Developer Surfaces:** QuickBooks Online REST APIs, App Store integrations, custom sandbox developer portals.

---

## Level 2 — Organizational Structure & Offices
*   **Bookkeeping & Accounts Department:** Manages daily transactions ledger entries, bank reconciliation, and cash flow.
*   **Billing & Receivables (AR) Desk:** Coordinates sales invoices, customer statements, and automated follow-up collection rules.
*   **Purchasing & Payables (AP) Desk:** Oversees vendor bill approvals, purchase orders (PO), and direct bank disbursements.

---

## Level 3 — Core Functional Modules
*   **Chart of Accounts (COA) Manager:** Hierarchical ledger designer mapping Assets, Liabilities, Equities, Revenues, and Expenses.
*   **Bank Feed Reconciliation Core:** Connects with Plaid or open banking APIs to download cash transactions and auto-reconcile with general ledger records.
*   **Sovereign Tax Engine:** Computes localized sales tax (e.g. VAT, GST) automatically depending on transaction geography.

---

## Level 4 — Portals and Access Levels
*   **Merchant Ledger View:** General dashboard showing net profit, cash flow metrics, bank balances, and unpaid invoice ratios.
*   **External Auditor Desk:** Specialized user view allowing read-only access to transaction logs, journal balance checks, and audit trials.

---

## Level 5 — Core Business Workflows
1.  **Bank Feed Auto-Match and Post:**
    *   *Trigger:* Bank statement download occurs.
    *   *Match:* QBO matches deposit with open customer invoice.
    *   *Action:* Clicking "Reconcile" auto-posts general ledger entry (Debit Cash, Credit Accounts Receivable) and clears invoice.
2.  **Purchase Bill to Payment:**
    *   *Trigger:* Accountant registers vendor bill.
    *   *Payment:* Authorized staff marks bill as settled, triggering payment to bank clearing networks.
