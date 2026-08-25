# JUMO UEOS Role & Permission Matrix

## 1. Zero-Trust Access Control Architecture
JUMO UEOS enforces strict Zero-Trust Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC). Every user identity is bound to explicit roles and tenant scopes. Users are strictly isolated to their authorized workspaces and cannot access unauthorized portals or financial ledgers.

---

## 2. Master Role & Permission Mapping

| Product | Role ID | Role Name | Authorized Portals | Permitted Operations |
|---|---|---|---|---|
| **FAAP** | `ROLE_CONTROLLER` | Financial Controller | `FAAP-PORTAL-CONTROLLER-0001` | Full COA management, journal posting, period close, audit review |
| **FAAP** | `ROLE_ACCOUNTANT` | Chief Accountant | `FAAP-PORTAL-ACCOUNTANT-0001` | AP/AR entry, invoice approval, bank reconciliation, financial reports |
| **FAAP** | `ROLE_AUDITOR` | Internal Auditor | `FAAP-PORTAL-AUDITOR-0001` | Read-only access to all 27 books, auditor log review, AI auditor overrides |
| **FAAP** | `ROLE_BUDGET_OFFICER`| Budget Controller | `FAAP-PORTAL-BUDGET-0001` | Vote Book control, budget allocation adjustments, virement review |
| **Digital Pay** | `ROLE_OPS` | Switch Operations Officer | `DP-PORTAL-OPS-0001` | Live transaction view, route configuration, channel health telemetry |
| **Digital Pay** | `ROLE_SETTLEMENT` | Settlement Officer | `DP-PORTAL-SETTLE-0001` | Settlement batch execution, 1.5% treasury clearing, merchant payouts |
| **Digital Pay** | `ROLE_MERCHANT` | Merchant / School Bursar | `DP-PORTAL-MERCHANT-0001` | Payment code generation, tuition fee structure, payment link creation |
| **University** | `ROLE_REGISTRAR` | Academic Registrar | `EDU-PORTAL-REG-0001` | Course catalog, student admission approval, transcript issuance |
| **University** | `ROLE_BURSAR` | University Bursar | `EDU-PORTAL-BURSAR-0001` | Student fee ledger, graduation clearance, fee structure setup |
| **University** | `ROLE_LECTURER` | University Lecturer | `EDU-PORTAL-STAFF-0001` | Marks entry, course material upload, student attendance logging |
| **University** | `ROLE_STUDENT` | University Student | `EDU-PORTAL-STUDENT-0001` | Course registration, exam results view, tuition payment, library loan |
| **Church** | `ROLE_BISHOP` | Episcopal Bishop | `CH_PORTAL_BISHOP_0001` | Diocesan synod oversight, clergy appointments, diocesan quota view |
| **Church** | `ROLE_PARISH_PRIEST`| Parish Priest / Vicar | `CH_PORTAL_PARISH_0001` | Parish membership directory, sacramental register entry, pastoral care |
| **Church** | `ROLE_CHURCH_TREASURER`| Parish Treasurer | `CH_PORTAL_FINANCE_0001` | Tithes & pledge recording, parish voucher approval, FAAP posting |
