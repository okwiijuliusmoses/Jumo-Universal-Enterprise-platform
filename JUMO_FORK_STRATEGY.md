# JUMO FORK STRATEGY

The Jumo Universal Enterprise Platform will be built as an **Integrated Core** using a multi-foundation approach.

## 1. Primary Foundations

### A. The Financial Core (Based on ERPNext / Kill Bill Patterns)
- **Status**: Reconstruction from functional specifications.
- **Implementation**: Jumo will implement a **Double-Entry Ledger Engine** derived from the ERPNext schema but optimized for PostgreSQL and Node.js. 
- **Billing State Machine**: Reused from the Kill Bill lifecycle (Draft -> Open -> Overdue -> Collected).

### B. The Payment Switch (Based on Hyperswitch)
- **Status**: Aggressive Source Reuse.
- **Implementation**: Jumo will incorporate the **Hyperswitch Connector Logic** to handle multi-gateway routing and webhook normalization.

### C. The Presentation Layer (Rebranding Odoo/QuickBooks/Xero Patterns)
- **Status**: Reproduction.
- **Implementation**: The UI will adopt the **Dashboard and Reporting patterns** of Odoo and QuickBooks to provide a "Market-Ready" user experience.

## 2. Integration Architecture

Jumo acts as the **Universal Interface (Adapter Layer)**:

```
[ JUMO BRANDING & CONFIGURATION ]
               |
    [ JUMO UNIVERSAL API ]
      /        |        \
[ ERP Core ] [ Billing ] [ Payments ]
 (Native)      (Native)    (Adapters)
```

## 3. Migration Plan
- **Phase 1**: Stabilize the Universal Schema (`BIGINT` minor units).
- **Phase 2**: Import Hyperswitch-style payment orchestration.
- **Phase 3**: Implement ERPNext-style General Ledger.
- **Phase 4**: Sector-specific metadata (SchoolPay, ChurchPay, SACCO-Connect).
