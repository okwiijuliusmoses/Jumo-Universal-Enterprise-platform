# JUMO UEOS Benchmark Registry: SAP S/4HANA Extraction

This registry documents the systematic extraction of enterprise ledger controls from the SAP S/4HANA Cloud benchmark and their implementation mapping into **JUMO FAAP**.

---

## 1. UNIVERSAL JOURNAL ARCHITECTURE (ACDOCA)
* **Source Product**: SAP S/4HANA Cloud (Universal Journal)
* **Capability**: Single Table Ledger architecture (table ACDOCA)
* **Source Area**: Financial Accounting (FI-GL) / Controlling (CO)
* **Extracted Concept**: Writing all financial transactions (subledgers, asset values, controlling accounts, and material movements) to a single table (ACDOCA). This eliminates the need for complex reconciliations between separate ledger databases.
* **JUMO Interpretation**: The `LedgerPostingService` operates as the single source of truth. Every domain event (e.g., student payment, tuition waiver, vendor purchase) compiles down to balanced journal entries that post directly to the same central database, keeping all sub-modules synchronized.
* **Target Product**: JUMO FAAP
* **Target Domain**: Core Universal Journal
* **Target Office**: General Ledger Office
* **Target Module**: Universal Ledger Engine
* **Target Workflow**: Subledger Event -> Format Journal lines -> Execute Double-Entry Parity validation -> Update Central Journal DB -> Propagate account balances.
* **Target Portal**: Owner Portal / CFO Dashboard
* **Target Web Experience**: Centralized transaction log displaying source attributes, cost-center attributions, and real-time balancing statuses.
* **Target Mobile Experience**: Telemetry feed showing real-time debit/credit movement totals.
* **Implementation Status**: EXTRACTED -> DESIGNED -> IMPLEMENTED -> INTEGRATED -> VERIFIED
* **Verification Status**: VERIFIED (Supported in the `LedgerPostingService` single-journal table architecture)

---

## 2. SEGREGATION OF DUTIES (MAKER-CHECKER CONTROL WALL)
* **Source Product**: SAP S/4HANA Cloud
* **Capability**: Dual Authorization Workflows
* **Source Area**: Internal Audit & Security Center
* **Extracted Concept**: Enforcing a strict "Maker-Checker" workflow for high-risk journal adjustments. An accountant (Maker) can draft and validate a journal entry, but only an authorized controller (Checker) can permanently commit it to the ledger.
* **JUMO Interpretation**: Built-in state transitions for journal vouchers. Entries are drafted with state `DRAFT` or `PENDING_APPROVAL` and require a separate authorized cryptographic signature/user role review to transition to `POSTED`.
* **Target Product**: JUMO FAAP
* **Target Domain**: Security Controls & Compliance
* **Target Office**: Internal Audit Office / Financial Control Department
* **Target Module**: Ledger Posting Service (`LedgerPostingService.ts`)
* **Target Workflow**: Draft Journal Voucher -> Math Verification -> Submit for Approval -> Checker Review -> Authorize -> Post to GL.
* **Target Portal**: Controller Portal / Auditor Desk
* **Target Web Experience**: Approval inbox detailing the journal memo, lines, total amount, and validation logs, with buttons to "Approve & Post" or "Reject".
* **Target Mobile Experience**: Push notification with quick swipe actions to approve transaction requests.
* **Implementation Status**: EXTRACTED -> DESIGNED -> IMPLEMENTED -> INTEGRATED -> VERIFIED
* **Verification Status**: VERIFIED (Designed in LedgerPostingService and exposed in the General Journal modal)

---

## 3. FIXED ASSETS SUBLEDGER & DEPRECIATION LOGIC
* **Source Product**: SAP S/4HANA (Asset Accounting - FI-AA)
* **Capability**: Automatic Asset Life Depreciation Runs
* **Source Area**: Fixed Assets Asset Register
* **Extracted Concept**: Linking asset acquisitions to subledgers and automatically posting scheduled monthly depreciation charges (Debit Depreciation Expense, Credit Accumulated Depreciation) across cost-centers.
* **JUMO Interpretation**: Subledger tool that schedules and posts monthly recurring asset depreciation lines automatically based on straight-line calculations.
* **Target Product**: JUMO FAAP
* **Target Domain**: Subledgers / Asset Accounting
* **Target Office**: Asset Management & Procurement Office
* **Target Module**: Fixed Asset Engine
* **Target Workflow**: Register Asset -> Select Depreciation Period -> Calculate Monthly Charge -> Auto-Post Journal Entry -> Recalculate Net Book Value.
* **Target Portal**: Staff Portal / Asset Controller Dashboard
* **Target Web Experience**: Live list of capital assets, cumulative depreciation progress bars, remaining value timelines, and an execution panel to trigger the monthly automatic journal run.
* **Target Mobile Experience**: Asset tracking and revaluation approval queues.
* **Implementation Status**: EXTRACTED -> DESIGNED -> IMPLEMENTED -> INTEGRATED -> VERIFIED
* **Verification Status**: VERIFIED (Implemented in `LedgerPostingService.runFixedAssetDepreciation` and General Journal UI)
