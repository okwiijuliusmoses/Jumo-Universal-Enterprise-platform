# JUMO UNIVERSAL SCHOOL ERP — TEMPLATE COMPLETENESS MATRIX

## 1. Executive Tier Architecture
JUMO Universal School ERP features 3 distinct tier templates: **Pre-Primary / Nursery**, **Primary School** (Hillside Naalya Primary benchmark), and **Secondary High School** (St. Lawrence Academy benchmark). Each tier template delivers its own operational workspaces, learner life-cycle models, academic assessments, and financial tracking tables.

---

## 2. School ERP Tier Completeness Matrix

| Institutional Tier | Office / Component | Structural Home & File Path | Specific Capabilities & Enterprise Tables | Benchmark Reference |
| :--- | :--- | :--- | :--- | :--- |
| **PRE-PRIMARY / NURSERY** | Pre-Primary & Nursery Office | `/src/products/education-erp/offices/PrePrimaryNurseryOffice.tsx` | - Infant & toddler admission profiles<br>- ECD developmental milestone tracking<br>- Daily care, sleep, and meal logs<br>- Guardian pickup authorization cards | Hillside Naalya ECD Nursery Division |
| **PRIMARY SCHOOL** | Primary School Office | `/src/products/education-erp/offices/PrimarySchoolOffice.tsx` | - P.1-P.7 Pupil Census & LIN allocation<br>- Thematic Curriculum progress tracking<br>- PLE candidate registration & UNEB index<br>- Primary school co-curricular & transport | Hillside Naalya Primary School Benchmark Target |
| **SECONDARY HIGH SCHOOL** | Head Teacher & Governance Office | `/src/products/education-erp/offices/HeadTeacherOffice.tsx` | - S.1-S.6 Enrollment summary & Ministry audits<br>- Academic staff load & lesson plan clearance<br>- Board of Governors & PTA meeting minutes | St. Lawrence Academy Secondary Benchmark |
| **SECONDARY HIGH SCHOOL** | Academic & DOS Office | `/src/products/education-erp/offices/AcademicDosOffice.tsx` | - O-Level & A-Level subject combinations<br>- Termly exam series (Beginning, Mid, End)<br>- NCDC Competency-Based Curriculum marks<br>- UNEB UCE & UACE registration matrices | St. Lawrence Academy Secondary Benchmark |
| **SECONDARY HIGH SCHOOL** | Boarding & Hostel Office | `/src/products/education-erp/offices/BoardingOffice.tsx` | - House & dormitory roll calls (S.1-S.6)<br>- Bed allocations & hostel capacity maps<br>- Student exeat permissions & medical leaves | St. Lawrence Academy Secondary Benchmark |
| **SECONDARY HIGH SCHOOL** | Science & ICT Labs Office | `/src/products/education-erp/offices/LaboratoriesOffice.tsx` | - Physics, Chemistry & Biology apparatus logs<br>- Chemical reagent inventory & MSDS sheets<br>- 85-terminal ICT lab booking & terminal health | St. Lawrence Academy Secondary Benchmark |
| **ALL TIERS** | Bursar Office & General Treasury | `/src/products/education-erp/offices/BursarOffice.tsx` | - **Student Fees Ledger**: LIN, PRN, itemized fees, receipt generation modal<br>- **Invoice Tracking & Billing**: Invoices, term billing, due dates, overdue flags<br>- **Budget Monitoring & Variance**: Line codes, department allocations, YTD spent, encumbrances, visual utilization bars<br>- **FAAP Cashbook**: Real-time cashbook | SchoolPay & FAAP Ledger Engine Integration |
| **ALL TIERS** | Registrar & Admissions Office | `/src/products/education-erp/offices/RegistrarOffice.tsx` | - National Learner Identification (LIN) registry<br>- Student transfer letters & clearance forms<br>- Cumulative academic transcript archives | Ministry of Education & Sports Guidelines |
| **ALL TIERS** | Library & Learning Center Office | `/src/products/education-erp/offices/LibraryOffice.tsx` | - 12,400 volume ISBN catalogue & barcode search<br>- Book circulation, check-outs, and overdue fines<br>- E-resource & digital textbook subscriptions | National Library Standards |
| **ALL TIERS** | Discipline, Prefects & Welfare Office | `/src/products/education-erp/offices/DisciplineWelfareOffice.tsx` | - Student disciplinary committee hearing logs<br>- Prefects council roster & leadership portfolios<br>- Counseling sessions & student welfare tracking | Secondary School Guidance & Counseling Framework |
| **ALL TIERS** | Education Developer Portal | `/src/products/EducationAlumniDeveloperPortal.tsx` | - API keys, webhooks, sandbox & telemetry<br>- UNEB & Ministry data export APIs | JUMO Developer Architecture |

---

## 3. Tier Isolation & Template Configuration
Selecting a specific school template dynamically activates the relevant office workspaces while disabling unneeded tier components. For instance, selecting the Pre-Primary template automatically focuses the navigation on `PrePrimaryNurseryOffice.tsx` and `BursarOffice.tsx`.
