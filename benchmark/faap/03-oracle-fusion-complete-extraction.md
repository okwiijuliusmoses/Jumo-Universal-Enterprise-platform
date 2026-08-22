# Benchmark Extraction: Oracle Fusion Cloud Financials
## Level 1 — Product Identity
*   **Product Name:** Oracle Fusion Cloud Financials
*   **Product Category:** Enterprise Cloud Financial Management & ERP
*   **Target Market:** Large corporate organizations, government institutions, multi-currency holdings.
*   **Target Users:** Enterprise controllers, financial analysts, corporate treasurers, system administrators.
*   **Deployment Model:** Public Cloud SaaS (Multi-Tenant).
*   **API/Developer Surfaces:** Oracle Integration Cloud, REST/SOAP APIs, BI Publisher reporting endpoints.

---

## Level 2 — Organizational Structure & Offices
*   **Corporate Treasury Desk:** Manages corporate cash books, inter-bank credit lines, and cash pooling.
*   **Procurement and Inventory Office:** Links material purchase orders to accounts payable bills.
*   **Project Costing Office:** Tracks capital expenses (CAPEX) vs operational expenses (OPEX) on large projects.

---

## Level 3 — Core Functional Modules
*   **Oracle General Ledger:** Unified double-entry ledger support across multiple currencies and divisions.
*   **Subledger Accounting (SLA):** Generates specialized accounting entries from inventory, shipping, and sales sub-systems.
*   **Oracle Fixed Assets:** Automatically tracks equipment depreciation values and physical location logs.
*   **Tax Management Switch:** Connects with global tax tables to ensure statutory tax compliance.

---

## Level 4 — Portals and Access Levels
*   **General Accountant Portal:** Visual checklists for period-end closures, journal approval worklists, and bank reconciliations.
*   **Auditor Desktop:** Read-only access to subledger accounting audit trails, transactional histories, and tax audits.

---

## Level 5 — Core Business Workflows
1.  **Maker-Checker Journal Approval:**
    *   *Trigger:* Accountant creates a manual journal entry.
    *   *Validation:* General ledger validates journal parity.
    *   *Approval:* System locks journal in `PENDING_APPROVAL` status and routes to Senior Financial Manager.
    *   *Posting:* Posting only executes once approved by designated checker, logging audit files.
2.  **Period-End Ledger Close:**
    *   *Trigger:* End of fiscal month.
    *   *Reconciliation:* Checks that subledger totals match General Ledger balances. If mismatch exists, prevents close.
