# JUMO SECONDARY SCHOOL ERP — PORTAL RECONSTRUCTION MATRIX

## Executive Summary
JUMO SECONDARY SCHOOL ERP (`/products/secondary`) is a sovereign product runtime benchmarked on St. Lawrence Academy Schools & Colleges.

## 1. Independent Portals & Offices
| Portal ID | Portal Name | Operational Component | Login Gate | Security Scope |
| :--- | :--- | :--- | :--- | :--- |
| `SEC-HEAD-01` | **Principal Office & Secondary Governance** | `HeadTeacherPortal.tsx` | `PortalAuthenticationGate.tsx` | `ROLE_HEADTEACHER` |
| `SEC-REG-02` | **Registrar Office & UNEB Center (UCE/UACE)** | `RegistrarOfficePortal.tsx` | `PortalAuthenticationGate.tsx` | `ROLE_REGISTRAR` |
| `SEC-DOS-03` | **DOS Academic & O/A Level Combinations** | `AcademicDosPortal.tsx` | `PortalAuthenticationGate.tsx` | `ROLE_DOS` |
| `SEC-BURS-04` | **Secondary Bursar Office & Boarding FAAP Ledger**| `BursarOfficePortal.tsx` | `PortalAuthenticationGate.tsx` | `ROLE_BURSAR` |
| `SEC-TCHR-05` | **Teacher Gradebook & Official Transcripts** | `TeacherGradebookPortal.tsx` | `PortalAuthenticationGate.tsx` | `ROLE_TEACHER` |
| `SEC-DEV-06` | **Secondary Developer API Center** | `SchoolErpDeveloperCenter.tsx` | Internal Admin Gate | API Key Verification |

## 2. Benchmark Capabilities (St. Lawrence Academy)
- O-Level (S.1–S.4) lower secondary NCDC curriculum tracking
- A-Level (S.5–S.6) Science and Arts subject combinations (e.g., PCM/Sub-Math, BCM/ICT, HEG/Div)
- UNEB UCE and UACE examination center registration & candidate index allocations
- Science laboratory equipment inventory, library cataloging & boarding house allocations
- Boarding fee cashbooks, vote books, supplier AP/AR & FAAP financial reporting
