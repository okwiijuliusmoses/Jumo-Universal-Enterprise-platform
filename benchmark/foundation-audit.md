# JUMO UEOS Product Foundation Audit & Benchmark Inventory Matrix

This document establishes the official **Phase 1 — Product Foundation Audit** and **Phase 2 — Benchmark Inventory** for the JUMO Universal Enterprise Operating System (UEOS). Every module and service has been meticulously analyzed against the strict operational parameters defined in the Full Benchmark Application Reconstruction Mandate.

---

## 1. STRUCTURAL AUDIT MATRIX
Below is the classification of our active products, mapping each feature to one of the mandated statuses:
`STATIC` | `HARDCODED` | `PLACEHOLDER` | `PARTIAL` | `FUNCTIONAL` | `MISSING`

| Product Area | Sub-Module / Screen | Audit Classification | Findings / Issues | Mitigation Action |
| :--- | :--- | :--- | :--- | :--- |
| **JUMO Education ERP** | Institutional Dashboard | `HARDCODED` / `STATIC` | Static statistics cards ("4,285 students", "24 programmes"), hardcoded class lists. | Link stats to dynamic `EducationErpService` database counters. |
| **JUMO Education ERP** | Registrar Office | `PARTIAL` / `PLACEHOLDER` | Standard admissions form doesn't display or filter custom grade configurations. | Create dynamic intake queue with complete enrollment models. |
| **JUMO Education ERP** | Senate & Exams | `PLACEHOLDER` | Approvals do not write to general ledger or trigger student transcripts. | Build complete course registrar, grading ledger, and CGPA calculator. |
| **JUMO Education ERP** | Bursary & Vote Book | `PARTIAL` | Budget commitments are hardcoded; no warning on vote overdrafts. | Link directly to FAAP ledger to enforce real-time vote overdraft blocks. |
| **JUMO Education ERP** | Welfare & Hostels | `STATIC` | Hardcoded room listings; hostel allocation button does not check capacity. | Add full spatial database to check room occupancy bounds dynamically. |
| **JUMO Education ERP** | Health Clinic | `PLACEHOLDER` | Patient list is static; clinic diagnostics form doesn't record vitals. | Write a clinic logs ledger linked with JRM entity profiles. |
| **JUMO Education ERP** | Library System | `STATIC` | Book circulation logs are static; search does not query inventory. | Implement library catalog with active checkout and overdue alerts. |
| **JUMO Digital Pay** | PRN Resolution Engine | `PLACEHOLDER` | Resolution search does not check active DB; hardcoded John Mukasa record. | Connect search directly to `DigitalPayService` and support active pay-outs. |
| **JUMO Digital Pay** | Settlement Switch | `PARTIAL` | Payout triggers do not allocate split commissions dynamically. | Apply 1.5% commission splitting directly in general ledger journals. |
| **JUMO Digital Pay** | Collection Stream | `STATIC` | Mock payment stream does not query real transaction registries. | Enforce real-time transaction event streaming from payment actions. |
| **JUMO FAAP** | Chart of Accounts | `FUNCTIONAL` | Beautiful tree table, but custom accounts cannot be created with currencies. | Add full account creation form with currency and hierarchy overrides. |
| **JUMO FAAP** | General Journal | `FUNCTIONAL` | Dynamic multi-row voucher implemented, but maker-checker flow is simplified. | Integrate rigorous Maker-Checker state verification (`DRAFT` to `POSTED`). |
| **JUMO FAAP** | Accounts Payable | `PLACEHOLDER` | Static lists of supplier bills; pay button doesn't adjust cash balances. | Link invoice payments directly to LedgerPostingService bank lines. |
| **JUMO FAAP** | Accounts Receivable | `PLACEHOLDER` | Customers billing profiles are static. | Dynamically generate invoices linked to merchant sales accounts. |
| **JUMO FAAP** | Banking & Feeds | `STATIC` | Statement matching screen is hardcoded; matches do not clear ledgers. | Enable direct CSV bank feed matching that posts bank adjustment vouchers. |

---

## 2. PORTAL & USER MODEL RECONSTRUCTION INVENTORY

To align with multi-role sovereign workspaces, each product must isolate user interactions by **Portal**:

### JUMO Education ERP Portals
1. **Registrar Portal**: Admissions, enrollment queue, program mapping, and matriculation.
2. **Academic Dean Portal**: Grade registries, transcript approvals, class timetables, and teacher assignments.
3. **Bursary Portal**: Departmental vote books, invoice generation, fee receipting, and budget overrides.
4. **Welfare Warden Portal**: Hostel allocations, room inspections, and student clinical logs.

### JUMO Digital Pay Portals
1. **Merchant Portal**: Managing API secrets, collection webhooks, payment references, and payout schedules.
2. **Customer checkout Portal**: Paying outstanding references via Card, Mobile Money, or Bank Transfer.
3. **Operator/Admin Console**: Audit logs, fraud monitoring, settlement reconciliation, and fee billing.

### JUMO FAAP Portals
1. **Accountant Portal**: Chart of accounts, journal vouchers, and ledger reconciliations.
2. **Accounts Payable Desk**: Managing suppliers, recording purchase orders, and disbursing vendor bills.
3. **Accounts Receivable Desk**: Registering clients, billing invoices, tracking payments, and aging reports.
4. **Auditor Portal**: Executing trial balance reviews and ledger integrity consistency checks.

---

## 3. COMPREHENSIVE RECONSTRUCTION & UNIVERSALIZATION PLAYBOOK
To remove all hardcoded demonstration behaviors and make JUMO truly configurable:
1. **Universalization**: Remove fixed assumptions of currencies (e.g. support USD, UGX, KES dynamically), campuses, and countries.
2. **Unified State Registries**: Every product must persist its state dynamically in its singleton domain service (backed by full business validation).
3. **Operational Workflows**: Inter-link products. When a student pays a fee reference in **Digital Pay**, it must automatically settle the invoice in the **Education Bursary Subledger**, which in turn triggers a real-time Universal Journal double-entry post in **FAAP** deducting accounts receivables and crediting cash/fees.

This playbook drives the immediate implementation phase across all scoping files.
