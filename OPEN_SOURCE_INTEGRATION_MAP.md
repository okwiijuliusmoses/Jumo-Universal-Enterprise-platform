# OPEN SOURCE INTEGRATION MAP

## 1. Benchmarking & Reference Models

| Jumo Component | Benchmark Project | Integration Strategy |
|----------------|-------------------|----------------------|
| **Double-Entry Ledger** | **ERPNext** | Architectural Reference. Jumo implements the same GL/COA hierarchy in TypeScript/PostgreSQL without Frappe dependencies. |
| **Open-Item Management** | **Kill Bill** | Logic Reference. Adapted the "Invoice Item" and "Payment Allocation" state machine into Jumo `OpenItem` primitives. |
| **Payment Webhooks** | **Hyperswitch** | Functional Reference. Signature verification and event normalization patterns adapted from Hyperswitch's connector architecture. |

## 2. Shared Utilities
- **Currency Handling**: Adapted precision patterns from small-business ERPs to use integer minor units (100 = 1.00).
- **Audit Trails**: Modeled after standard ERP immutable logging.

## 3. Future Integrations (Phase Two)
- **Reporting Engine**: Evaluate integration of Metabase or custom Recharts-based metadata dashboards.
- **Connectors**: Evaluate direct fork of Hyperswitch's mobile-money adapters for East African providers (MTN/Airtel).
