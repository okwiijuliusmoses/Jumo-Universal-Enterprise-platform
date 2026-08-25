# JUMO UEOS CAPABILITY BASELINE REGISTRY

## 1. Executive Summary & Registry Architecture
This document forms the machine-readable baseline registry of all capabilities across the JUMO Digital Hybrid Platform (JDHP). Every capability is indexed with its source file, product home, module ID, functional description, and preservation state under the **Absolute Preservation Rule**.

---

## 2. FINTECH Platform Baseline Capabilities

| Capability ID | Capability Name | Target Product | Fintech Family / Module ID | Implementation Source | Preservation State |
| :--- | :--- | :--- | :--- | :--- | :---: |
| `CAP-FIN-001` | Chart of Accounts (COA) | JUMO FINTECH | `FAAP_MOD_COA` | `/src/products/faap/FaapWebShell.tsx` | **PRESERVED** |
| `CAP-FIN-002` | General Ledger (GL) & Journal | JUMO FINTECH | `FAAP_MOD_GL` | `/src/products/faap/FaapWebShell.tsx` | **PRESERVED** |
| `CAP-FIN-003` | Accounts Payable (AP) | JUMO FINTECH | `FAAP_MOD_AP` | `/src/products/faap/FaapWebShell.tsx` | **PRESERVED** |
| `CAP-FIN-004` | Accounts Receivable (AR) | JUMO FINTECH | `FAAP_MOD_AR` | `/src/products/faap/FaapWebShell.tsx` | **PRESERVED** |
| `CAP-FIN-005` | Bank Reconciliation | JUMO FINTECH | `FAAP_MOD_RECON` | `/src/products/faap/FaapWebShell.tsx` | **PRESERVED** |
| `CAP-FIN-006` | Vote Book & Public Budgeting | JUMO FINTECH | `FAAP_MOD_VOTEBOOK` | `/src/products/faap/FaapWebShell.tsx` | **PRESERVED** |
| `CAP-FIN-007` | Student PRN Ref Generation | JUMO FINTECH | `DP_MOD_REFGEN` | `/src/products/digital-pay/DigitalPayWebShell.tsx` | **PRESERVED** |
| `CAP-FIN-008` | Tuition Fee Collector Switch | JUMO FINTECH | `DP_MOD_TUITION` | `/src/products/digital-pay/DigitalPayWebShell.tsx` | **PRESERVED** |
| `CAP-FIN-009` | 1.5% Settlement Clearing Fee Engine | JUMO FINTECH | `DP_MOD_SETTLEMENT` | `/src/products/digital-pay/DigitalPayWebShell.tsx` | **PRESERVED** |
| `CAP-FIN-010` | Agency Banking POS Terminal Manager | JUMO FINTECH | `DP_MOD_POS` | `/src/products/fintech/FintechShell.tsx` | **PRESERVED** |
| `CAP-FIN-011` | Digital Wallet & Mobile Money Switch | JUMO FINTECH | `DP_MOD_MOMO` | `/src/products/fintech/FintechShell.tsx` | **PRESERVED** |
| `CAP-FIN-012` | Microfinance & SACCO Loan Books | JUMO FINTECH | `FIN_MOD_SACCO` | `/src/products/fintech/FintechShell.tsx` | **PRESERVED** |
| `CAP-FIN-013` | Merchant Acquiring & QR Payments | JUMO FINTECH | `DP_MOD_MERCHANT` | `/src/products/fintech/FintechShell.tsx` | **PRESERVED** |
| `CAP-FIN-014` | Foreign Exchange (FX) & Cross-Border | JUMO FINTECH | `FIN_MOD_FX` | `/src/products/fintech/FintechShell.tsx` | **PRESERVED** |
| `CAP-FIN-015` | Treasury & Liquidity Routing | JUMO FINTECH | `FAAP_MOD_TREASURY` | `/src/products/fintech/FintechShell.tsx` | **PRESERVED** |
| `CAP-FIN-016` | Automated Risk & Fraud Radar | JUMO FINTECH | `DP_MOD_RISK` | `/src/products/fintech/FintechShell.tsx` | **PRESERVED** |
| `CAP-FIN-017` | Tax & Statutory Compliance Engine | JUMO FINTECH | `FAAP_MOD_TAX` | `/src/products/fintech/FintechShell.tsx` | **PRESERVED** |
| `CAP-FIN-018` | Developer API & Webhooks Desk | JUMO FINTECH | `FINTECH-DEV-PORTAL` | `/src/products/FintechDeveloperPortal.tsx` | **PRESERVED** |

---

## 3. School ERP Baseline Capabilities

| Capability ID | Capability Name | Target Product | Tier / Module ID | Implementation Source | Preservation State |
| :--- | :--- | :--- | :--- | :--- | :---: |
| `CAP-EDU-001` | Early Childhood Milestone Care | JUMO SCHOOL ERP | Pre-Primary / `ECD_MILESTONES` | `/src/products/education-erp/offices/PrePrimaryNurseryOffice.tsx` | **RECONSTRUCTED** |
| `CAP-EDU-002` | Pre-Primary Attendance & Meals | JUMO SCHOOL ERP | Pre-Primary / `ECD_CARE` | `/src/products/education-erp/offices/PrePrimaryNurseryOffice.tsx` | **RECONSTRUCTED** |
| `CAP-EDU-003` | Primary Thematic Curriculum | JUMO SCHOOL ERP | Primary / `PRI_THEMATIC` | `/src/products/education-erp/offices/PrimarySchoolOffice.tsx` | **RECONSTRUCTED** |
| `CAP-EDU-004` | PLE Examination Registration | JUMO SCHOOL ERP | Primary / `PRI_PLE` | `/src/products/education-erp/offices/PrimarySchoolOffice.tsx` | **RECONSTRUCTED** |
| `CAP-EDU-005` | Student Fees Ledger & PRNs | JUMO SCHOOL ERP | All Tiers / `MOD_BURSAR` | `/src/products/education-erp/offices/BursarOffice.tsx` | **RECONSTRUCTED** |
| `CAP-EDU-006` | Invoice Tracking & Billing | JUMO SCHOOL ERP | All Tiers / `MOD_INVOICING` | `/src/products/education-erp/offices/BursarOffice.tsx` | **RECONSTRUCTED** |
| `CAP-EDU-007` | Budget Monitoring & Variance | JUMO SCHOOL ERP | All Tiers / `MOD_BUDGET` | `/src/products/education-erp/offices/BursarOffice.tsx` | **RECONSTRUCTED** |
| `CAP-EDU-008` | Registrar Pupil Census & LIN | JUMO SCHOOL ERP | All Tiers / `MOD_REGISTRAR` | `/src/products/education-erp/offices/RegistrarOffice.tsx` | **RECONSTRUCTED** |
| `CAP-EDU-009` | Head Teacher Governance | JUMO SCHOOL ERP | Secondary / `OFFICE_HEAD_TEACHER` | `/src/products/education-erp/offices/HeadTeacherOffice.tsx` | **RECONSTRUCTED** |
| `CAP-EDU-010` | Academic DOS Exam Series | JUMO SCHOOL ERP | Secondary / `OFFICE_DOS` | `/src/products/education-erp/offices/AcademicDosOffice.tsx` | **RECONSTRUCTED** |
| `CAP-EDU-011` | Boarding & Hostel Allocation | JUMO SCHOOL ERP | Secondary / `OFFICE_BOARDING` | `/src/products/education-erp/offices/BoardingOffice.tsx` | **RECONSTRUCTED** |
| `CAP-EDU-012` | Science & ICT Labs Apparatus | JUMO SCHOOL ERP | Secondary / `OFFICE_LABS` | `/src/products/education-erp/offices/LaboratoriesOffice.tsx` | **RECONSTRUCTED** |
| `CAP-EDU-013` | Library Circulation & ISBN | JUMO SCHOOL ERP | All Tiers / `OFFICE_LIBRARY` | `/src/products/education-erp/offices/LibraryOffice.tsx` | **RECONSTRUCTED** |
| `CAP-EDU-014` | Discipline & Prefects Panel | JUMO SCHOOL ERP | Secondary / `OFFICE_DISCIPLINE` | `/src/products/education-erp/offices/DisciplineWelfareOffice.tsx` | **RECONSTRUCTED** |
| `CAP-EDU-015` | Education Developer Portal | JUMO SCHOOL ERP | All Tiers / `EDU-ALUMNI-DEV-PORTAL` | `/src/products/EducationAlumniDeveloperPortal.tsx` | **RECONSTRUCTED** |

---

## 4. Church ERP Baseline Capabilities

| Capability ID | Capability Name | Target Product | Module ID | Implementation Source | Preservation State |
| :--- | :--- | :--- | :--- | :--- | :---: |
| `CAP-CH-001` | Diocesan Chancery & Bishop Decrees | JUMO CHURCH ERP | `MOD_CH_DIOCESE` | `/src/products/church-erp/offices/BishopOffice.tsx` | **RECONSTRUCTED** |
| `CAP-CH-002` | Parish Liturgy & Curate Roster | JUMO CHURCH ERP | `MOD_CH_PARISH` | `/src/products/church-erp/offices/ParishPriestOffice.tsx` | **RECONSTRUCTED** |
| `CAP-CH-003` | Canonical Sacramental Registers | JUMO CHURCH ERP | `MOD_CH_SACRAMENTS` | `/src/products/church-erp/offices/SacramentalOffice.tsx` | **RECONSTRUCTED** |
| `CAP-CH-004` | Tithes & Diocesan Quota Remittance | JUMO CHURCH ERP | `MOD_CH_TITHES` | `/src/products/church-erp/offices/ChurchFinanceOffice.tsx` | **RECONSTRUCTED** |
| `CAP-CH-005` | Capital Projects & Building Works | JUMO CHURCH ERP | `MOD_CH_PROJECTS` | `/src/products/church-erp/offices/ChurchProjectsOffice.tsx` | **RECONSTRUCTED** |
| `CAP-CH-006` | Church Developer Portal | JUMO CHURCH ERP | `CHURCH-DEV-PORTAL` | `/src/products/ChurchDeveloperPortal.tsx` | **RECONSTRUCTED** |

---

## 5. Alumni ERP Baseline Capabilities

| Capability ID | Capability Name | Target Product | Module ID | Implementation Source | Preservation State |
| :--- | :--- | :--- | :--- | :--- | :---: |
| `CAP-ALU-001` | Graduate Census & Alumni Census | JUMO ALUMNI ERP | `ALUM_MOD_REGISTRAR` | `/src/products/alumni-erp/AlumniErpWebShell.tsx` | **RECONSTRUCTED** |
| `CAP-ALU-002` | Endowment & Giving Campaigns | JUMO ALUMNI ERP | `ALUM_MOD_GIVING` | `/src/products/alumni-erp/AlumniErpWebShell.tsx` | **RECONSTRUCTED** |
| `CAP-ALU-003` | Mentorship & Career Network | JUMO ALUMNI ERP | `ALUM_MOD_MENTORSHIP` | `/src/products/alumni-erp/AlumniErpWebShell.tsx` | **RECONSTRUCTED** |
| `CAP-ALU-004` | Chapter & Regional Groups | JUMO ALUMNI ERP | `ALUM_MOD_CHAPTERS` | `/src/products/alumni-erp/AlumniErpWebShell.tsx` | **RECONSTRUCTED** |
