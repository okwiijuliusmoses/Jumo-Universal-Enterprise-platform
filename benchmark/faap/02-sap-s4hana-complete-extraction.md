# Benchmark Extraction: SAP S/4HANA Finance
## Level 1 — Product Identity
*   **Product Name:** SAP S/4HANA Finance
*   **Product Category:** Enterprise Resource Planning (ERP) & Corporate Financial management Suite
*   **Target Market:** Global conglomerate groups, multinational corporate networks, public sector governance, and high-volume industries.
*   **Target Users:** Chief Financial Officers (CFOs), Group Controllers, Certified Public Accountants, Internal/External Auditors, Treasury Managers.
*   **Deployment Model:** On-Premise, Private Cloud, or Hybrid Cloud.
*   **API/Developer Surfaces:** SAP API Business Hub, SOAP/REST integrations, RFC connections, and OData services.

---

## Level 2 — Organizational Structure & Offices
*   **Group Treasury Operations:** Manages international cash pools, foreign exchange risk offsets, intercompany lending portfolios.
*   **Central General Ledger (G/L) Department:** Controls the Master Chart of Accounts, fiscal period closing procedures, and audit logs.
*   **Shared Services Center:** Centralized processing location for all subsidiary AP invoices and billing cycles.
*   **Internal Audit & Compliance Desk:** Monitors segregation of duties (SoD), statutory tax requirements, and ledger parity balances.

---

## Level 3 — Core Functional Modules
*   **Universal Journal (ACDOCA):** A single unified database table storing all G/L, controlling (CO), asset accounting, and material ledger details for immediate multi-dimensional analysis.
*   **Asset Accounting (FI-AA):** Manages life-cycle of fixed assets, historical cost records, and depreciation runs (linear, declining balance).
*   **Treasury & Risk Management (TRM):** Models debt portfolios, investment portfolios, hedging, and liquidity forecasts.
*   **Group Reporting / Consolidation:** Automatically reconciles intercompany balances and constructs consolidated group financials.

---

## Level 4 — Portals and Access Levels
*   **Fiori Launchpad (General UI):** Role-based, responsive tile dashboard (e.g., General Ledger Accountant tile, Cash Manager tile).
*   **CFO Executive Suite:** Predictive analytics workspace mapping group-wide liquidity ratios, tax liabilities, and EBITDAs.

---

## Level 5 — Core Business Workflows
1.  **Strict Double-Entry Posting Validation:**
    *   *Trigger:* Ledger journal entry is queued.
    *   *Validation:* universal parity check verifies that total debits minus total credits equals exactly zero.
    *   *Execution:* ACDOCA table appends transaction lines, updates real-time financial metrics, and writes unalterable audit trails.
2.  **Asset Acquisition and Depreciation Run:**
    *   *Trigger:* Fixed Asset capitalization form is posted.
    *   *Depreciation:* Monthly cron job evaluates asset values and posts automated depreciation expense journals.
