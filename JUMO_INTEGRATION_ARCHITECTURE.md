# JUMO INTEGRATION ARCHITECTURE

The blueprint for merging mature open-source systems into the Jumo Universal Enterprise Platform.

## 1. The Universal Core (The "Foundation")
- **Database**: PostgreSQL with Row-Level Security (RLS).
- **ORM**: Drizzle ORM for type-safe schema management.
- **Identity**: Firebase Auth integrated with Tenant-scoped RBAC.

## 2. Functional Modules (The "Transplants")

### Accounting Engine (ERPNext Pattern)
- Authoritative `ledger_entries` table.
- Real-time Balance calculation triggers.
- Multi-currency conversion service.

### Billing Engine (Kill Bill Pattern)
- `InvoicingService`: Generates `OpenItem` records based on `Subscription` or `OneOff` triggers.
- `DunningService`: Automated follow-ups for unpaid invoices.

### Payment Switch (Hyperswitch Pattern)
- `PaymentOrchestrator`: Routes intents to specific gateways.
- `WebhookHandler`: Normalizes diverse provider callbacks into a standard Jumo event.

## 3. Presentation Layer (Aureus Pattern)
- **Universal Dashboard**: Adapts based on the `tenant.sector` metadata (e.g., "Education" vs. "Retail").
- **Modular Sidebars**: Only show relevant modules for the active workspace.
