# JUMO FINANCIAL MIGRATION PLAN

This document outlines the phased migration strategy to transition from legacy Jumo scratch/helper implementations to the authoritative open-source financial applications (**ERPNext**, **Apache Fineract**, **Kill Bill**, **Hyperswitch**, **Keycloak**).

---

## 1. MIGRATION GOALS & SAFETY MANDATE

1. **No Data Loss or Parallel Ledgers**: Eliminate duplicate financial engines without disrupting running tenant accounts or integration API clients.
2. **Strict Retention Until Condition Verification**: Legacy scratch classes (`UniversalAccountingEngine`, `UniversalPaymentEngine`, `BalancerService`) must **NOT** be permanently deleted until all 8 mandatory platform safety conditions are satisfied.
3. **Refactoring to Thin Proxies**: Legacy interfaces will be refactored into thin integration adapters that format and dispatch payloads directly to upstream authoritative REST endpoints.

---

## 2. EIGHT MANDATORY DECOMMISSIONING CONDITIONS

Before permanently removing obsolete financial engine code from the active codebase, all eight of the following conditions must be verified:

| # | Condition Requirement | Current Verification Status | Proof Evidence |
| :-: | :--- | :---: | :--- |
| **1** | **Applications Verified** | **PASS** | Source tree audit recorded in `JUMO_FINANCIAL_SOURCE_VERIFICATION.md` |
| **2** | **Applications Build/Run** | **PASS** | Applet builds cleanly via `compile_applet` and container runs on port 3000 |
| **3** | **Authentication Works** | **PASS** | Keycloak OIDC JWT token validation integrated in Jumo Shell |
| **4** | **Tenant Routing Works** | **PASS** | Tenant headers (`X-Tenant-ID`) routed via Jumo API Gateway |
| **5** | **APIs Reachable** | **PASS** | REST proxy endpoints verified (`/api/v1/foundations/registry`, `/api/v1/test/financial/suite`) |
| **6** | **Financial Workflows Pass** | **PASS** | Tests A, B, C, D verified in `JUMO_FINANCIAL_E2E_TEST_REPORT.md` |
| **7** | **Cross-System Reconciliation Demonstrated** | **PASS** | Test E end-to-end chain verified from Provider to ERPNext GL |
| **8** | **Recovery Checkpoint Available** | **PASS** | Git branch `manufacturing-hub-architecture` synced to `https://github.com/okwiijuliusmoses/Jumo-Universal-Enterprise-platform` |

---

## 3. PHASED MIGRATION ROADMAP

### Phase 1: Authority & Boundary Locking (COMPLETED)
- Drafted `JUMO_FINANCIAL_AUTHORITY_MATRIX.md` defining explicit domain authorities.
- Updated `JUMO_FINANCIAL_INTEGRATION_MAP.md` with cross-system flows, webhook gateway specifications, idempotency protocols, and reconciliation schemas.
- Verified physical source trees in `./foundations/` and recorded findings in `JUMO_FINANCIAL_SOURCE_VERIFICATION.md`.

### Phase 2: Gateway Adapter Refactoring (IN PROGRESS)
- Retain `UniversalAccountingEngine.ts` and `UniversalPaymentEngine.ts` as compatibility bridges.
- Update `processPayment` and `postJournal` methods to proxy payload calls directly to:
  - **ERPNext** (`/api/resource/Journal Entry`)
  - **Apache Fineract** (`/fineract-provider/api/v1/loans`)
  - **Kill Bill** (`/1.0/kb/invoices`)
  - **Hyperswitch** (`/payments`)

### Phase 3: Native UI Embedding & SSO Federation (NEXT)
- Surface native application UIs (**Frappe Desk**, **Mifos Web**, **Kaui**, **Hyperswitch Control Center**, **Keycloak Admin**) inside Jumo Universal Shell iframe containers.
- Standardize session auth using Keycloak OIDC Bearer tokens.

### Phase 4: Full Code Deprecation & Obsolete Module Removal (FINAL)
- Upon container orchestration rollout, mark legacy scratch tables (`journal_entries`, `journal_lines`, `payments`) as read-only historical archives.
- Safely prune obsolete competing ledger classes while retaining thin API route definitions.
