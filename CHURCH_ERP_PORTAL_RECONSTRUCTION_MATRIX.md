# JUMO CHURCH ERP — PORTAL RECONSTRUCTION MATRIX

## Executive Summary
JUMO CHURCH ERP (`/products/church`) is an independent sovereign product runtime for Dioceses, Synods, Parishes, and Christian Ministries.

## 1. Independent Portals & Offices
| Portal ID | Portal Name | Operational Component | Login Gate | Security Scope |
| :--- | :--- | :--- | :--- | :--- |
| `CH-DIOCESE-01` | **Bishop Synod & Diocesan Administration** | `ChurchErpWebShell.tsx` | `PortalAuthenticationGate.tsx` | `ROLE_DIOCESAN_SECRETARY` |
| `CH-PARISH-02` | **Parish Priest & Curate Station Office** | `ChurchErpWebShell.tsx` | `PortalAuthenticationGate.tsx` | `ROLE_PARISH_PRIEST` |
| `CH-SACR-03` | **Sacramental Register (Baptism, Matrimony)** | `ChurchErpWebShell.tsx` | `PortalAuthenticationGate.tsx` | `ROLE_PARISH_SECRETARY` |
| `CH-FIN-04` | **Parish Treasurer & Tithe FAAP Ledger** | `ChurchFinance.tsx` | `PortalAuthenticationGate.tsx` | `ROLE_PARISH_TREASURER` |
| `CH-DEV-05` | **Church Developer API Center** | `ChurchErpWebShell.tsx` | Internal Admin Gate | API Key Verification |

## 2. Benchmark Capabilities
- Diocese-Parish-Subparish ecclesiastical hierarchy modeling
- Sacramental certificate generation (Holy Baptism, Confirmation, Holy Matrimony, Holy Orders)
- Parishioner census, fellowship groups & pastoral visitation tracking
- Tithes, offertory, quota remittances, and building fund accounting via FAAP
- Clergy stipend payroll & pension administration
