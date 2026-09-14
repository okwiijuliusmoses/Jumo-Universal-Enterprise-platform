# HARDCODING AUDIT

## 1. Executive Summary
The Jumo platform has recently undergone a major refactor to move logic into universal primitives. However, several material occurrences of domain-coupling and hardcoded assumptions remain in the presentation, controller, and seeding layers.

## 2. Material Occurrences

| File | Category | Severity | Current Behavior | Problematic Nature | Replacement Strategy |
|------|----------|----------|------------------|--------------------|----------------------|
| `src/04_ussd.controller.ts` | Currency | High | Hardcoded "UGX" in UI strings. | Assumes local currency; not polymorphic. | Fetch currency from `ConfigEngine` based on tenant. |
| `src/05_Dashboard.tsx` | UI Metadata | Medium | Hardcoded tenant dropdown labels (Church, School, Retail). | Fixed sector assumptions in UI. | Derive labels from `ConfigEngine` metadata. |
| `src/05_Dashboard.tsx` | Currency | Low | Hardcoded "UGX" labels in metrics. | Assumes local currency. | Use `activeConfig.baseCurrency` from report. |
| `server.ts` | Seeding | Low | Hardcoded seed data for TENT-1 (Faith) and TENT-2 (School). | Legitimate for demo but uses fixed IDs. | Migrate to a dynamic metadata-driven seed manifest. |
| `src/ueosBlueprint.ts` | Domain Coupling | High | References to SACCO, FAAP, and SchoolPay in features and descriptions. | Fixed sector-specific terminology instead of universal primitives. | Generalize terms (e.g., SACCO -> Cooperative, FAAP -> Accounting Core). |
| `src/ueosBlueprint.ts` | Data Types | Medium | Uses NUMERIC(15,4) for amounts. | Deviates from mandated "integer minor units" strategy. | Migrate to BIGINT for minor units. |
| `src/schema/schema.ts` | Data Types | High | Uses DOUBLE PRECISION for ledger balances. | Violates "No floating-point" rule; risk of precision loss. | Migrate to BIGINT for minor units. |
| `src/05_Dashboard.tsx` | Fiscal Logic | Medium | Hardcoded "18% VAT" and "WHT" labels in tax cards. | Assumes fixed tax rates and types. | Fetch tax configuration from `ConfigEngine`. |
| `server.ts` | Providers | Medium | Webhook assumes default "Momo" clearing account. | Hardcoded provider mapping. | Map providers to accounts via `TenantConfig`. |
| `src/core/financial/UniversalAccountingEngine.ts` | Logic | Medium | Hardcoded "POSTED" status string. | Static state identifier. | Move to a shared `LedgerStatus` enum. |

## 3. Fixed Routing & Identifiers
- `TENT-1`, `TENT-2`, `TENT-4`: Hardcoded in seed and dashboard selection.
- `1030-CLEARING`, `1200-RECEIVABLES`: Hardcoded in `server.ts` seeding and allocation calls.

## 4. Legitimate Technical Constants
- `UGX` in database default: Acceptable as a fallback constant.
- `WS-DEFAULT`: Standard workspace identifier.

## 5. Prohibited Domain Coupling
- USSD menus containing the word "Tuition" vs "Tithe" strings.
- Dashboard metric cards using fixed "School Fees" terminology.
