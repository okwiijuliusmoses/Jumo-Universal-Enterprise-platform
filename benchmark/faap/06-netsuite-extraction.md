# Benchmark Extraction: NetSuite
## Level 1 — Product Identity
*   **Product Name:** Oracle NetSuite ERP
*   **Product Category:** Mid-Market Cloud Business Management Suite
*   **Target Market:** Fast-growing mid-market companies, wholesale distributors, and e-commerce organizations.
*   **Target Users:** Presidents, Finance VPs, Operational Managers, Accountants, and Auditors.
*   **Deployment Model:** Public Cloud SaaS.
*   **API/Developer Surfaces:** SuiteTalk (SOAP/REST Web Services), SuiteScript (custom JavaScript scripting engine).

---

## Level 2 — Organizational Structure & Offices
*   **Subsidiary Management (OneWorld):** Manages regional business branches under a single global portal.
*   **Order-to-Cash (O2C) Department:** Links online product orders to billing and collection streams.
*   **Procure-to-Pay (P2P) Department:** Matches purchase requests to vendor bills and ledger accounts.

---

## Level 3 — Core Functional Modules
*   **NetSuite OneWorld:** Real-time multi-subsidiary financial consolidation, tax compliance, and multi-currency conversions.
*   **SuiteBilling:** Flexible billing core managing subscriptions, usage-based billing, and custom price schedules.
*   **Revenue Recognition Engine:** Automatically calculates and posts revenue allocation journals over specified time periods.

---

## Level 4 — Portals and Access Levels
*   **NetSuite Dashboard:** Real-time KPIs, custom search queries, financial reports, and reminder checklists.
*   **Vendor Portal:** Private workspace for external suppliers to download purchase orders, upload bills, and track payout dates.

---

## Level 5 — Core Business Workflows
1.  **Revenue Recognition Schedule:**
    *   *Trigger:* Customer purchases annual subscription.
    *   *Schedules:* NetSuite maps billing amount to deferred revenue.
    *   *Recognition:* Automatically posts monthly journals debiting Deferred Revenue and crediting Earned Revenue.
2.  **Subsidiary Balance Intercompany Elimination:**
    *   *Trigger:* Monthly closing cycle.
    *   *Elimination:* Locates inter-subsidiary sales transactions and automatically generates offsetting journal lines.
