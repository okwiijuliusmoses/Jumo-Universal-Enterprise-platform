# MIGRATION PLAN

## 1. Objective
To migrate the Jumo platform from its legacy, domain-coupled architecture to the new **Universal Polymorphic Financial Core** while preserving all existing tenant data.

## 2. Phase 1: Preparation (Current State)
- The universal SQL schema (`universal_schema.sql`) has been defined.
- The `UniversalAccountingEngine` and `UniversalPaymentEngine` are implemented and verified.
- The `JUMODBEngine` has been updated to support the new schema.

## 3. Phase 2: Schema Migration
1. **Metadata Injection**: Update existing `tenants` and `parties` with universal metadata (roles, currency codes).
2. **Ledger Transformation**: 
    - Map legacy account codes to the universal COA.
    - Convert all floating-point balances to integer minor units (`BIGINT`).
3. **Open Item Reconstruction**:
    - Re-evaluate all outstanding invoices and bills into the `open_items` table.
    - Validate `remaining_minor` balances against the historical payment ledger.

## 4. Phase 3: Engine Switchover
1. **Redirect USSD**: Point the USSD controller to the `ConfigEngine`.
2. **Redirect Dashboard**: Switch the frontend to consume the `ReportingEngine` API.
3. **Webhook Cutover**: Update external provider callbacks to point to the new `/api/v1/allocation/webhook` endpoint.

## 5. Phase 4: Validation & Audit
- Run the **Zero-Parity Audit** across all ledger accounts.
- Verify **Tenant Isolation** for all financial records.
- Archive legacy code and audit/fix scripts.
