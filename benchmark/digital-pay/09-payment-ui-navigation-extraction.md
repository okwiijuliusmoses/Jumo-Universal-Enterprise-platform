# Digital Pay UI Navigation & Information Architecture

This document blueprints the standard visual layout and navigation hierarchy of enterprise-grade Payment & Settlement portals.

```
┌───────────────────────────────────────────────────────────────────┐
│ [JUMO Brand]     [Search Transactions...]    [Live / Sandbox]     │
├──────────────┬────────────────────────────────────────────────────┤
│              │                                                    │
│ Core Gateway │  WORKSPACE PANEL                                   │
│  ├ Stream    │                                                    │
│  └ PRN Engine│  Active Workspace: PRN Resolution Engine           │
│              │  ----------------------------------------          │
│ Operations   │  [ Resolve PRN ] [ Generate Reference ]            │
│  └ Switch    │                                                    │
│              │  ┌──────────────────────────────────────────────┐  │
│ Account      │  │ Selected PRN: REF-10022-X                    │  │
│  └ Settings  │  │ Status: UNPAID      Payer: Sarah Alupo       │  │
│              │  │ Balance: 1,200,000 UGX                       │  │
│              │  └──────────────────────────────────────────────┘  │
│              │                                                    │
└──────────────┴────────────────────────────────────────────────────┘
```

## Navigation Structure

### 1. Unified Navigation Menu
Organized into three functional areas:
1.  **Core Gateway Hub:**
    *   `Collection Stream`: Real-time ingestion stream monitoring, transaction details, and channel volume aggregations.
    *   `PRN Engine`: PRN lookups, reference creations, custom invoice associations.
2.  **Operations & Settlement Hub:**
    *   `Settlement Switch`: Daily settlement batch histories, commission earnings, and merchant payout logs.
    *   `Compliance / KYC`: Merchant onboarding forms, company document uploads, and risk reviews.
3.  **Account & Integration Hub:**
    *   `API / Developer Console`: Live/Sandbox keys toggle, webhook endpoints logs, API logs, and rate limiter stats.
    *   `Payout Settings`: Merchant bank account configurations and transfer preferences.

### 2. Information Density & Typography
*   **Monospaced Figures:** High-density dashboards displaying numeric values (amounts, balances, bank account numbers) must utilize monospaced font families (e.g. `font-mono`) to align columns and ensure layout integrity.
*   **Clear Transaction Badges:** Status indicators (`PAID`, `PENDING`, `DISPUTED`, `REFUNDED`) must use neutral pills with high-contrast colored text for instant scanning.
