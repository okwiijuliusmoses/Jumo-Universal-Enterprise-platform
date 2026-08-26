# Financial ERP UI Navigation & Information Architecture

This document blueprints the standard visual layout and navigation hierarchy of enterprise Financial & Ledger management systems.

```
┌───────────────────────────────────────────────────────────────────┐
│ [JUMO Brand]     [Search Ledger Registers...]    [Fiscal Period]  │
├──────────────┬────────────────────────────────────────────────────┤
│              │                                                    │
│ Core Ledger  │  WORKSPACE PANEL                                   │
│  ├ Accounts  │                                                    │
│  ├ Journals  │  Active Workspace: General Journal Entry           │
│  └ Balance   │  ----------------------------------------          │
│              │  [ New Journal ] [ Post Adjustments ]              │
│ Transactions │                                                    │
│  ├ Invoices  │  ┌──────────────────────────────────────────────┐  │
│  └ Receipts  │  │ GL Line Entry Table                          │  │
│              │  │ Account Code | Debit | Credit | Department   │  │
│ Assets       │  ├──────────────┼───────┼────────┼──────────────┤  │
│  └ Fixed     │  │ 40010 (Cash) | 1.2M  | 0.00   | Admin        │  │
│              │  │ 10020 (AR)   | 0.00  | 1.2M   | Admin        │  │
│ Reporting    │  └──────────────────────────────────────────────┘  │
│  └ Statements│  Status: BALANCED (offset 0.00 UGX)                │
└──────────────┴────────────────────────────────────────────────────┘
```

## Navigation Structure

### 1. Unified Navigation Menu
Organized into four functional pillars:
1.  **Core General Ledger Hub:**
    *   `Chart of Accounts`: Hierarchical tree layout mapping Assets, Liabilities, Equities, Revenues, Expenses.
    *   `Journal Registers`: List of manual and auto-posted general journals, transaction IDs, creation logs, and posting states.
    *   `Trial Balance`: Live ledger parity checker auditing active debits and credits offsets.
2.  **Daily Transactions Hub:**
    *   `Customer Invoices`: Unpaid invoicing rosters, client statements, payment reference number trackers.
    *   `Vendor Bills`: Unpaid bill checklists, purchase order matches, payment status logs.
3.  **Enterprise Assets Hub:**
    *   `Fixed Assets Register`: Life-cycle tracking cards for equipment, vehicles, buildings, and automated depreciation runs.
4.  **Financial Reporting Hub:**
    *   `Balance Sheet`: Real-time asset-liability-equity positioning reports.
    *   `Income Statement (P&L)`: Term/Monthly revenue and expense performance dashboards.
    *   `Cash Flow`: Liquidity forecasting charts and bank balance histories.

### 2. Layout & Radius Math Norms
*   **Nested Radiuses:** Outer containers utilizing large borders (e.g. `rounded-2xl`) must apply strict radius math to inner components (e.g. table borders or form inputs must use `rounded-md` or `rounded-lg`) to preserve rhythmic layouts.
*   **High Contrast Boundaries:** Thin hairline borders (e.g. `border-slate-200`) separate workspace columns, preventing visual overlap on low-resolution laptop displays.
