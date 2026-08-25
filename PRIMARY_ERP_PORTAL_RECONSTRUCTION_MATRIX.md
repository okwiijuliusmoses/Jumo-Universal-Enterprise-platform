# JUMO PRIMARY SCHOOL ERP — PORTAL RECONSTRUCTION MATRIX

## Executive Summary
JUMO PRIMARY SCHOOL ERP (`/products/primary`) is a sovereign product runtime benchmarked on Hillside Naalya Primary School.

## 1. Independent Portals & Offices
| Portal ID | Portal Name | Operational Component | Login Gate | Security Scope |
| :--- | :--- | :--- | :--- | :--- |
| `PRI-HEAD-01` | **Headteacher & P.1–P.7 Stream Governance** | `PrimaryHeadteacherPortal.tsx` | `PortalAuthenticationGate.tsx` | `ROLE_PRIMARY_HEADTEACHER` |
| `PRI-CURR-02` | **Thematic & Four Core Subject Assessment** | `PrimaryThematicCurriculumPortal.tsx` | `PortalAuthenticationGate.tsx` | `ROLE_PRIMARY_HEADTEACHER` |
| `PRI-BURS-03` | **Primary Bursar Office & Alpha Cashbook** | `BursarOfficePortal.tsx` | `PortalAuthenticationGate.tsx` | `ROLE_BURSAR` |
| `PRI-DEV-04` | **Primary Developer API Center** | `PrimaryErpWebShell.tsx` | Internal Admin Gate | API Key Verification |

## 2. Benchmark Capabilities (Hillside Naalya)
- P.1–P.7 4-stream class structure & senior class teacher management
- Lower Primary (P.1–P.3) Thematic Curriculum competency evaluations
- Upper Primary (P.4–P.7) English, Mathematics, Science, and SST assessment
- UNEB Primary Leaving Examination (PLE) candidate registration & index verification
- Alpha Cashbook, Vote Book encumbrance checks & FAAP fee reconciliation
