# JUMO ARCHITECTURE AUDIT

## 1. Frontend Architecture
- **Framework**: React 18+ with Vite.
- **Entry Point**: `src/main.tsx` → `src/App.tsx`.
- **Styling**: Tailwind CSS (via `src/index.css`).
- **Animations**: Framer Motion (`framer-motion`, `motion`).
- **UI Components**: Custom components in `src/components/`, Lucide React for icons.
- **Charts**: Recharts (`recharts`).
- **State Management**: React Hooks (`useState`, `useEffect`, `useCallback`).
- **Key Views**:
    - `src/05_Dashboard.tsx`: Universal metadata-driven dashboard.

## 2. Backend Architecture
- **Framework**: Express 5.x.
- **Entry Point**: `server.ts`.
- **Runtime**: Node.js (ESM).
- **Build System**: `esbuild` for bundling `server.ts` into `dist/server.cjs`.

## 3. Database Architecture
- **Engine**: `JUMODBEngine` (`src/database/db.ts`).
- **Mode**: Hybrid (PostgreSQL / local JSON backup).
- **Schema**: 
    - Authoritative SQL schema in `src/db/universal_schema.sql`.
    - Typed schema definitions in `src/schema/schema.ts`.
- **Persistence**: 
    - `assets/ueos_database.json` (Local backup).
    - Cloud SQL (PostgreSQL) when configured.

## 4. API Architecture
- **Restful API**: `/api/v1/*` endpoints in `server.ts`.
- **Key Endpoints**:
    - `/api/v1/dashboard/data`: Returns metadata-driven metrics and ledger snapshots.
    - `/api/v1/allocation/webhook`: Authoritative payment processing and allocation.
    - `/api/v1/ueos/state/reset-sovereign`: Seeds/resets polymorphic tenant data.

## 5. Tenancy & Authorization
- **Tenancy**: Built-in multi-tenancy via `tenant_id` scoping across all tables.
- **Authorization**: Placeholder/Static roles currently; needs robust RBAC integration.

## 6. Financial Core (Universal Accounting Engine)
- **Universal Primitives**: Implemented in `src/db/universal_schema.sql`.
    - `tenants`, `workspaces`, `parties`, `party_roles`.
    - `ledger_accounts`, `journal_entries`, `journal_lines`.
    - `documents`, `document_lines`, `open_items`.
    - `payments`, `payment_allocations`.
- **Engines**:
    - `UniversalAccountingEngine.ts`: Double-entry logic, immutable journals, reversals.
    - `UniversalPaymentEngine.ts`: FIFO allocation, clearing, wallet handling.
    - `ReportingEngine.ts`: Real-time ledger-derived metrics.
    - `ConfigEngine.ts`: Tenant-specific terminology and account mapping.

## 7. USSD & Webhooks
- **USSD**: `src/04_ussd.controller.ts` (Metadata-driven menus).
- **Webhooks**: Signature-verified (HMAC-SHA256) processing in `server.ts` and `UniversalPaymentEngine.ts`.

## 8. Duplicated & Dead Modules
- **Legacy Files (Deleted)**:
    - `src/01_schema.sql` (Replaced by `universal_schema.sql`)
    - `src/02_balancer.service.ts` (Replaced by `UniversalAccountingEngine.ts`)
    - `src/03_allocation.engine.ts` (Replaced by `UniversalPaymentEngine.ts`)
- **Cleanup**: Extensive patch/fix scripts in root directory (`fix_*.py`, `patch_*.cjs`) are likely legacy artifacts of previous recovery attempts and should be archived.

## 9. Dependencies Mapping
- **Frontend** → `server.ts` (API) → `JUMODBEngine` → `ueos_database.json` / `PostgreSQL`.
- **Financial Engines** → `JUMODBEngine`.
- **Universal Dashboard** → `ConfigEngine` + `ReportingEngine`.
