# JUMO NURSERY SCHOOL ERP — PORTAL RECONSTRUCTION MATRIX

## Executive Summary
JUMO NURSERY SCHOOL ERP (`/products/nursery`) is an independent sovereign product runtime for Early Childhood Development (ECD) pre-primary education institutions.

## 1. Independent Portals & Offices
| Portal ID | Portal Name | Operational Component | Login Gate | Security Scope |
| :--- | :--- | :--- | :--- | :--- |
| `NUR-ADMIN-01` | **Nursery Administration & Infant Register** | `NurseryAdminPortal.tsx` | `PortalAuthenticationGate.tsx` | `ROLE_NURSERY_ADMIN` |
| `NUR-ECD-02` | **ECD Milestones & Safeguarding Console** | `NurseryEcdMilestonesPortal.tsx` | `PortalAuthenticationGate.tsx` | `ROLE_NURSERY_ADMIN` |
| `NUR-FEES-03` | **Nursery Tuition & FAAP Fees Office** | `BursarOfficePortal.tsx` | `PortalAuthenticationGate.tsx` | `ROLE_BURSAR` |
| `NUR-DEV-04` | **Nursery Developer API Center** | `NurseryErpWebShell.tsx` | Internal Admin Gate | API Key Verification |

## 2. Benchmark Capabilities
- Toddler admissions & class allocations (Baby Class, Middle Class, Top Class)
- Authorized guardian pickup security & photo verification
- Fine/gross motor skills, phonics, and socialization milestone tracking
- Dietary restrictions, allergy logs, and medical care records
- Direct FAAP Cashbook integration for fee collection receipting
