# JUMO UEOS — PRODUCT PORTAL MATRIX

## 1. Executive Portal Architecture
Every approved product in JUMO UEOS operates its own sovereign portals with role-based access control (RBAC), independent navigation, dedicated control centers, and developer centers. Universal cross-product navigation bars do not exist in the runtime.

---

## 2. Comprehensive Product Portal Matrix

| Product ID | Portal ID | Portal Display Name | Authorized Roles | Shell & Component Path | Control / Developer Center |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **JUMO FINTECH** | `DP-PORTAL-MERCHANT-0001` | Merchant Portal | `ROLE_MERCHANT` | `/src/products/fintech/FintechShell.tsx` | Fintech Developer Portal (`/fintech/developer`) |
| **JUMO FINTECH** | `DP-PORTAL-AGENT-0001` | Agency Banking & POS Portal | `ROLE_AGENT` | `/src/products/fintech/FintechShell.tsx` | Fintech Developer Portal (`/fintech/developer`) |
| **JUMO FINTECH** | `DP-PORTAL-OPS-0001` | Switch Operations Portal | `ROLE_OPS` | `/src/products/fintech/FintechShell.tsx` | Fintech Developer Portal (`/fintech/developer`) |
| **JUMO FINTECH** | `DP-PORTAL-RISK-0001` | Risk & Fraud Sentinel Portal | `ROLE_RISK_ANALYST` | `/src/products/fintech/FintechShell.tsx` | Fintech Developer Portal (`/fintech/developer`) |
| **JUMO FINTECH** | `FAAP-PORTAL-CONTROLLER-0001` | Financial Controller Portal | `ROLE_CONTROLLER` | `/src/products/faap/FaapWebShell.tsx` | Fintech Developer Portal (`/fintech/developer`) |
| **JUMO FINTECH** | `FAAP-PORTAL-ACCOUNTANT-0001` | Chief Accountant Workspace | `ROLE_ACCOUNTANT` | `/src/products/faap/FaapWebShell.tsx` | Fintech Developer Portal (`/fintech/developer`) |
| **JUMO FINTECH** | `FAAP-PORTAL-AUDITOR-0001` | Internal Audit Portal | `ROLE_AUDITOR` | `/src/products/faap/FaapWebShell.tsx` | Fintech Developer Portal (`/fintech/developer`) |
| **JUMO FINTECH** | `FAAP-PORTAL-TREASURER-0001` | Treasury & Liquidity Workspace | `ROLE_TREASURER` | `/src/products/faap/FaapWebShell.tsx` | Fintech Developer Portal (`/fintech/developer`) |
| **JUMO FINTECH** | `FAAP-PORTAL-CFO-0001` | Chief Financial Officer Portal | `ROLE_CFO` | `/src/products/faap/FaapWebShell.tsx` | Fintech Developer Portal (`/fintech/developer`) |
| **JUMO FINTECH** | `FINTECH-DEV-PORTAL` | Fintech Developer Portal | `ROLE_DEVELOPER`, `ROLE_ADMIN` | `/src/products/FintechDeveloperPortal.tsx` | Self-contained Developer Portal |
| **JUMO SCHOOL ERP** | `EDU-PORTAL-BURSAR-0001` | Bursar & Treasury Office | `ROLE_BURSAR` | `/src/products/education-erp/offices/BursarOffice.tsx` | School Developer Portal (`/education/developer`) |
| **JUMO SCHOOL ERP** | `EDU-PORTAL-REG-0001` | Academic Registrar Office | `ROLE_REGISTRAR` | `/src/products/education-erp/offices/RegistrarOffice.tsx` | School Developer Portal (`/education/developer`) |
| **JUMO SCHOOL ERP** | `EDU-PORTAL-HEAD-0001` | Head Teacher Office | `ROLE_HEAD_TEACHER` | `/src/products/education-erp/offices/HeadTeacherOffice.tsx` | School Developer Portal (`/education/developer`) |
| **JUMO SCHOOL ERP** | `EDU-PORTAL-DOS-0001` | Academic DOS Office | `ROLE_DOS` | `/src/products/education-erp/offices/AcademicDosOffice.tsx` | School Developer Portal (`/education/developer`) |
| **JUMO SCHOOL ERP** | `EDU-PORTAL-BOARDING-0001` | Boarding & Warden Office | `ROLE_WARDEN` | `/src/products/education-erp/offices/BoardingOffice.tsx` | School Developer Portal (`/education/developer`) |
| **JUMO SCHOOL ERP** | `EDU-PORTAL-PRE-PRIMARY` | Pre-Primary & Nursery Office | `ROLE_NURSERY_HEAD` | `/src/products/education-erp/offices/PrePrimaryNurseryOffice.tsx` | School Developer Portal (`/education/developer`) |
| **JUMO SCHOOL ERP** | `EDU-PORTAL-PRIMARY` | Primary School Office | `ROLE_PRIMARY_HEAD` | `/src/products/education-erp/offices/PrimarySchoolOffice.tsx` | School Developer Portal (`/education/developer`) |
| **JUMO SCHOOL ERP** | `EDU-PORTAL-LABS` | Science & ICT Labs Office | `ROLE_LAB_MASTER` | `/src/products/education-erp/offices/LaboratoriesOffice.tsx` | School Developer Portal (`/education/developer`) |
| **JUMO SCHOOL ERP** | `EDU-PORTAL-LIBRARY` | Library Office | `ROLE_LIBRARIAN` | `/src/products/education-erp/offices/LibraryOffice.tsx` | School Developer Portal (`/education/developer`) |
| **JUMO SCHOOL ERP** | `EDU-PORTAL-DISCIPLINE` | Discipline & Welfare Office | `ROLE_DISCIPLINE_MASTER` | `/src/products/education-erp/offices/DisciplineWelfareOffice.tsx` | School Developer Portal (`/education/developer`) |
| **JUMO SCHOOL ERP** | `EDU-ALUMNI-DEV-PORTAL` | Education Developer Portal | `ROLE_DEVELOPER`, `ROLE_ADMIN` | `/src/products/EducationAlumniDeveloperPortal.tsx` | Self-contained Developer Portal |
| **JUMO CHURCH ERP** | `CH-PORTAL-BISHOP-0001` | Episcopal Chancery & Bishop Office | `ROLE_BISHOP` | `/src/products/church-erp/offices/BishopOffice.tsx` | Church Developer Portal (`/church/developer`) |
| **JUMO CHURCH ERP** | `CH-PORTAL-PARISH-0001` | Parish Priest & Vicar Office | `ROLE_PARISH_PRIEST` | `/src/products/church-erp/offices/ParishPriestOffice.tsx` | Church Developer Portal (`/church/developer`) |
| **JUMO CHURCH ERP** | `CH-PORTAL-SACRAMENTS` | Sacramental Registrar Office | `ROLE_SACRAMENTAL_OFFICER` | `/src/products/church-erp/offices/SacramentalOffice.tsx` | Church Developer Portal (`/church/developer`) |
| **JUMO CHURCH ERP** | `CH-PORTAL-FINANCE` | Church Finance & Tithes Office | `ROLE_CHURCH_TREASURER` | `/src/products/church-erp/offices/ChurchFinanceOffice.tsx` | Church Developer Portal (`/church/developer`) |
| **JUMO CHURCH ERP** | `CH-PORTAL-PROJECTS` | Capital Projects & Works Office | `ROLE_PROJECTS_DIRECTOR` | `/src/products/church-erp/offices/ChurchProjectsOffice.tsx` | Church Developer Portal (`/church/developer`) |
| **JUMO CHURCH ERP** | `CHURCH-DEV-PORTAL` | Church Developer Portal | `ROLE_DEVELOPER`, `ROLE_ADMIN` | `/src/products/ChurchDeveloperPortal.tsx` | Self-contained Developer Portal |
| **JUMO ALUMNI ERP** | `ALUM-PORTAL-DIR-0001` | Alumni Director Workspace | `ROLE_ALUM_DIRECTOR` | `/src/products/alumni-erp/AlumniErpWebShell.tsx` | Education Developer Portal (`/alumni/developer`) |
| **JUMO ALUMNI ERP** | `ALUM-PORTAL-REG-0001` | Graduate Census Portal | `ROLE_ALUM_REGISTRAR` | `/src/products/alumni-erp/AlumniErpWebShell.tsx` | Education Developer Portal (`/alumni/developer`) |
| **JUMO ALUMNI ERP** | `ALUM-PORTAL-GIVE-0001` | Endowment & Giving Portal | `ROLE_ALUM_GIVER` | `/src/products/alumni-erp/AlumniErpWebShell.tsx` | Education Developer Portal (`/alumni/developer`) |

---

## 3. Portal Isolation Certification
All 30 portals route exclusively within their respective product boundaries. Selecting a portal inside `JUMO FINTECH` will never trigger a sidebar or workspace view belonging to `JUMO SCHOOL ERP` or `JUMO CHURCH ERP`.
