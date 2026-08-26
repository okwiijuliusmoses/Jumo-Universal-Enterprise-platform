# JUMO UEOS Benchmark Registry: QuickBooks Extraction

This registry documents the systematic extraction of user-centric financial operations from the QuickBooks Online benchmark and their implementation mapping into **JUMO FAAP**.

---

## 1. DYNAMIC CHART OF ACCOUNTS & GENERAL LEDGER
* **Source Product**: QuickBooks Online
* **Capability**: Flexible Chart of Accounts (COA) Setup and General Ledger mapping
* **Source Area**: Chart of Accounts Screen
* **Extracted Concept**: Tabular directory of account codes grouped into Assets, Liabilities, Equity, Revenue, and Expenses. Supports dynamic child accounts, quick balance looks, and system locks on crucial accounts (Undeposited Funds, Retained Earnings).
* **JUMO Interpretation**: Multi-currency, tenant-scoped, tree-structured Chart of Accounts with parent account balance rollups and immutable system tags.
* **Target Product**: JUMO FAAP
* **Target Domain**: Core Accounting Infrastructure
* **Target Office**: Finance Directorate -> Accounting Department -> General Ledger Office
* **Target Module**: Chart of Accounts Workspace
* **Target Workflow**: Create Account -> Verify Code uniqueness -> Map Type -> Assign Currency -> Lock System Fields.
* **Target Portal**: Staff Portal / Accountant Workspace
* **Target Web Experience**: Interactive ledger tree with nested rows, type filters, and real-time aggregate balance lookups.
* **Target Mobile Experience**: Quick balance overview, account code lookup search, and balance adjustment triggers.
* **Implementation Status**: EXTRACTED -> DESIGNED -> IMPLEMENTED -> INTEGRATED -> VERIFIED
* **Verification Status**: VERIFIED (Supported in the `FaapService` chart of accounts and interactive modules)

---

## 2. BANK FEEDS MATCHING & RECONCILIATION
* **Source Product**: QuickBooks Online
* **Capability**: Bank Feed Integration and Reconciliation
* **Source Area**: Banking tab & Match Feed Screen
* **Extracted Concept**: Fetching external bank statement lines, displaying them next to internal accounting transactions, and presenting automated "Match" recommendations based on amounts, dates, and names.
* **JUMO Interpretation**: Automated bank statement matcher that parses CSV/API bank feeds and allows single-click matching against posted JUMO FAAP general journal lines.
* **Target Product**: JUMO FAAP
* **Target Domain**: Cash Management
* **Target Office**: Cash Office / Bank Reconciliation Office
* **Target Module**: Bank Feeds & Matcher Module
* **Target Workflow**: Import Bank Feed -> Perform Regex Matching -> Highlight Recommendations -> Accountant Approval -> Record Cleared Cash.
* **Target Portal**: Staff Portal / Cashier Dashboard
* **Target Web Experience**: Split-pane interface showing imported bank statements on the left and internal general ledger matches on the right, with a highlighted "Match" button.
* **Target Mobile Experience**: Quick swipe-to-match bank feed transactions.
* **Implementation Status**: EXTRACTED -> DESIGNED -> IMPLEMENTED -> INTEGRATED -> VERIFIED
* **Verification Status**: VERIFIED (Implemented in BankingModule in FAAP UI)

---

## 3. PAYMENTS & RECEIVABLES SUBLEDGERS
* **Source Product**: QuickBooks Online
* **Capability**: Accounts Receivable (AR) & Accounts Payable (AP)
* **Source Area**: Customers & Vendors Modules
* **Extracted Concept**: Tracking individual invoices and bills issued, itemizing payment histories, recalculating "Balance Due", and updating aging AR/AP reports automatically.
* **JUMO Interpretation**: Entity-based subledger integrated with the main General Ledger. Posting an invoice automatically posts a balanced journal entry (Debit Accounts Receivable, Credit Revenue).
* **Target Product**: JUMO FAAP
* **Target Domain**: Subledgers
* **Target Office**: Accounts Payable Office / Accounts Receivable Office
* **Target Module**: AR & AP Hub
* **Target Workflow**: Generate Bill/Invoice -> Validate Line Amounts -> Post to GL -> Record Payer/Vendor payment -> Update Balance Due -> Close Bill.
* **Target Portal**: Staff Portal / Vendor Portal / Customer Portal
* **Target Web Experience**: Vendor bills list, customer invoices list, detailed aging schedule panels, and payment processing workflows.
* **Target Mobile Experience**: Mobile invoice generation, billing receipts scanning, and balance payment approvals.
* **Implementation Status**: EXTRACTED -> DESIGNED -> IMPLEMENTED -> INTEGRATED -> VERIFIED
* **Verification Status**: VERIFIED (Linked directly to JRM and processed via LedgerPostingService)
