# JUMO University ERP Capability Map

## 1. Domain Specification
JUMO University ERP (`PROD_EDU_UNIV`, Template: `TMPL_EDU_UNIVERSITY`) is benchmarked against Islamic University in Uganda (IUIU) and Uganda Christian University (UCU). It provides higher education governance, faculty, SIS, examination, and graduation management.

---

## 2. Core Functional Modules

### A. University Governance & Senate Administration (`EDU_MOD_SENATE`)
- **Governing Council Portal**: Board minutes, capital project approvals, endowment fund oversight, and university charter compliance.
- **Senate Academic Committee**: Academic policy approvals, new degree program accreditations, exam result approvals, and degree classification ratifications.

### B. Student Information System (SIS) (`EDU_MOD_SIS`)
- **University Admissions & Applications**: Online application processing, entry qualification verification, admission offer letter generation, and registration number assignment.
- **Semester Course Registration**: Online course enrolment, core vs elective course selection, prerequisite checks, and credit unit cap validation (max 24 CUs/semester).

### C. GPA / CGPA Transcript Engine (`EDU_MOD_GPA`)
- **Credit-Weighted Grade Point Computation**: Automatically computes Grade Points (A=5.0, B=4.0, C=3.0, D=2.0, E=1.0, F=0.0) multiplied by Credit Units.
- **Cumulative GPA Tracking**: Semester GPA and Cumulative GPA calculation, First Class Honors / Upper Second Class classification, academic probation warnings (CGPA < 2.0).

### D. Convocation & Graduation Manager (`EDU_MOD_GRAD`)
- **Multi-Department Clearance Workflow**: Sequential digital clearance across Bursar (zero balance check), Library (returned books check), Hostel (room key return), Dean of Students, and Academic Registrar.
- **Graduation List Publication**: Automated generation of official graduation booklet, degree certificate printing queue, and gown issuance tracking.

### E. University Health & Clinic System (`EDU_MOD_HEALTH`)
- **Student Medical Records**: On-campus health center patient visits, prescription logs, lab test results, and emergency hospital referrals.
