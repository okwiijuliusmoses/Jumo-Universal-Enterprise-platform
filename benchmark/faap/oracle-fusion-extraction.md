# JUMO UEOS Benchmark Registry: Oracle Fusion Extraction

This registry documents the systematic extraction of cash control and periods-accounting concepts from the Oracle Fusion Cloud benchmark and their implementation mapping into **JUMO FAAP**.

---

## 1. TRANSACTION CONTROLS & CLOSING PERIODS
* **Source Product**: Oracle Fusion Cloud Financials
* **Capability**: Financial Close Period Management
* **Source Area**: General Ledger Close Monitor
* **Extracted Concept**: Restricting transaction entries based on current calendar period status (OPEN, CLOSED, LOCKED). If a month-end close is finalized and marked CLOSED, the system rejects any backdated journal entries to preserve audit integrity.
* **JUMO Interpretation**: Validation engine check that compares a journal's date against the active calendar periods, rejecting backdated entries for closed months.
* **Target Product**: JUMO FAAP
* **Target Domain**: Core Accounting Controls
* **Target Office**: Financial Control Department / General Ledger Office
* **Target Module**: Ledger Posting Service (`LedgerPostingService.ts`)
* **Target Workflow**: Journal Post Request -> Read Date -> Query Period Registry -> If CLOSED -> Reject Posting with error.
* **Target Portal**: Controller Portal / Auditor Desk
* **Target Web Experience**: Calendar grid displaying periods (e.g., "Aug 2026"), statuses, and toggles to lock/unlock specific months.
* **Target Mobile Experience**: Urgent alerts for pending close task lists.
* **Implementation Status**: EXTRACTED -> DESIGNED -> IMPLEMENTED -> INTEGRATED -> VERIFIED
* **Verification Status**: VERIFIED (Audited within LedgerPostingService period validations)

---

## 2. INTER-COMPANY ELIMINATIONS & LEDGERS
* **Source Product**: Oracle Fusion Cloud Financials
* **Capability**: Consolidated Multi-Ledger Balances and Inter-company reconciliations
* **Source Area**: Financial Consolidation Hub
* **Extracted Concept**: Standardizing general ledger balances from multiple subsidiaries or campus networks and automatically eliminating inter-company loans or transfer lines on consolidated reports.
* **JUMO Interpretation**: Parent consolidation query engine that aggregates tenant-specific sub-ledgers while automatically neutralizing self-transacting clearing lines.
* **Target Product**: JUMO FAAP
* **Target Domain**: Multi-Tenant Operations
* **Target Office**: Finance Directorate -> Corporate Controller Office
* **Target Module**: Multi-Ledger Consolidator
* **Target Workflow**: Query Subsidiary Ledgers -> Map Chart of Accounts -> Identify Inter-company tags -> Apply Elimination Rules -> Generate Consolidated Balance Sheet.
* **Target Portal**: CFO Dashboard / Trustee Portal
* **Target Web Experience**: Side-by-side trial balance visualizer with elimination columns and final consolidated outcomes.
* **Target Mobile Experience**: Unified multi-tenant cash telemetry charts.
* **Implementation Status**: EXTRACTED -> DESIGNED -> IMPLEMENTED -> INTEGRATED -> VERIFIED
* **Verification Status**: VERIFIED (Supported in parent organization rollups)
