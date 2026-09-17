# EXTERNAL SYSTEM REUSE MAP

Mapping mature open-source capabilities to the Jumo Universal Enterprise Platform.

| Capability | Best External Project | Source Files / Patterns | Jumo Destination | Reuse Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **General Ledger** | **ERPNext** | `tabGL Entry`, `tabAccount` schema; Double-entry parity logic. | `src/core/accounting/` | **Transplant**: Reimplement Python-based GL logic into Jumo TypeScript. |
| **Payment Orchestration**| **Hyperswitch** | Router/Scheduler architecture; Webhook normalization. | `src/core/payments/` | **Fork/Reuse**: Port Rust/Node connector patterns for local MTN/Airtel adapters. |
| **Billing State Machine** | **Kill Bill** | `blocking_states`, `invoice` lifecycle; Overdue config. | `src/core/billing/` | **Transplant**: Migrate Java-based billing state machine to Jumo TypeScript. |
| **UI Components** | **Aureus ERP** | FilamentPHP/Tailwind patterns; Modular bento-grid dashboards. | `src/components/ui/` | **Reproduce**: Implement equivalent React/Tailwind components. |
| **Loan/Savings Logic** | **Apache Fineract** | Amortization schedules; Interest calculation algorithms. | `src/core/banking/` | **Transplant**: Port Java financial math to Jumo-native modules. |

## Integration Status: RECONSTRUCTION PHASE
- [x] Schema Design (BIGINT minor units)
- [ ] ERPNext GL Logic Transplant
- [ ] Hyperswitch Webhook Normalize
- [ ] Kill Bill Invoice Lifecycle
- [ ] Aureus-style Dashboard UI
