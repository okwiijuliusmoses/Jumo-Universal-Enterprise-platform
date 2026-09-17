# ACCOUNTING SOURCE COMPARISON

Comparing mature open-source accounting engines to define the Jumo Universal Core.

| Feature | ERPNext (Frappe) | Dolibarr (PHP) | Kill Bill (Billing) | Jumo Target |
| :--- | :--- | :--- | :--- | :--- |
| **Schema** | `tabGL Entry` (Denormalized) | `llx_facture` (Normalized) | `invoice_items` | **ERPNext Model**: High-performance denormalized ledger. |
| **Data Integrity** | Framework-level ORM checks. | DB-level constraints. | Service-level Bus events. | **DB-Authoritative**: PostgreSQL triggers + Zod validation. |
| **Multi-Currency** | Comprehensive. | Basic. | Advanced. | **Universal**: Every line item carries its own currency + exchange rate. |
| **Multi-Tenancy** | Schema-per-tenant (Frappe). | Single schema. | Single schema. | **Single-DB Row-Level Security (RLS)**: Scoped by `tenant_id`. |

## Jumo Accounting Strategy
Jumo will adopt the **ERPNext denormalized Ledger (`tabGL Entry`)** as its primary source of truth. This allows for near-instant Trial Balance and P&L generation while maintaining strict Double-Entry parity.
