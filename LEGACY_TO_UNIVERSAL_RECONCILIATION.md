# LEGACY TO UNIVERSAL RECONCILIATION

## 1. Functional Mapping and Gap Analysis

| Legacy Component | New Replacement | Functionality Preserved? | Data Preserved? | API Preserved? | Tests | Decision |
|:--- |:--- |:--- |:--- |:--- |:--- |:--- |
| `src/01_schema.sql` | `src/db/universal_schema.sql` | **PARTIAL** | YES | YES | N/A | **MERGE** |
| `src/02_balancer.service.ts` | `src/core/financial/UniversalAccountingEngine.ts` | **NO** (Defensive checks lost) | YES | YES | N/A | **REPLACE & HARDEN** |
| `src/03_allocation.engine.ts` | `src/core/financial/UniversalPaymentEngine.ts` | **NO** (Security/Idempotency lost) | YES | YES | N/A | **REPLACE & SECURE** |

## 2. Identified Gaps

### Security Gaps
- **Signature Verification**: Legacy `PolymorphicAllocationEngine` enforced `x-jumo-signature` validation via HMAC-SHA256. Universal engine currently accepts unauthenticated payloads.
- **Idempotency**: Legacy engine utilized a SHA-256 hash of `tenantId:externalReference` to prevent double-posting. Universal engine lacks this filter.

### Mathematical Invariants
- **Defensive Validation**: Legacy `BalancerService` rejected floating-point numbers, negative values, and non-exclusive debit/credit lines. New engine only checks total parity.

## 3. Reconciliation Plan
1. **HARDEN** `UniversalAccountingEngine` with legacy defensive checks (exclusivity, integer-only, non-negative).
2. **SECURE** `UniversalPaymentEngine` and `server.ts` by restoring signature verification and idempotency filtering.
3. **RESTORE** the legacy files from the working tree until the above hardening is verified by a build and audit.

---
**Decision**: DO NOT DELETE legacy files yet. Perform MERGE of defensive logic into Universal Core first.
