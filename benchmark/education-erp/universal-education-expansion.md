# JUMO UEOS Benchmark Registry: Universal Education Expansion

This document outlines the architectural guidelines for **JUMO Education ERP** to support nursery, primary, secondary, vocational, technical, college, university, and professional academy templates dynamically without hardcoding a specific "university" or "k-12" identity.

---

## 1. DYNAMIC TEMPLATE SELECTION ARCHITECTURE
* **Concept**: The platform does not assume it is running a university or a kindergarten. On tenant provisioning (via the Universal ERP Installation Engine), the tenant selects their **Education Template Type**.
* **JUMO Implementation**: A dynamic registry metadata loader (`useInstitutionConfig` or `EducationErpConfig`) that modifies:
  1. **UI Wording**: "Student" vs. "Learner" vs. "Pupil", "Programme" vs. "Class" vs. "Grade", "Senate" vs. "Academic Board".
  2. **Active Offices**: e.g., K-12 templates activate the Hostel Boarding Office and Welfare Office, while Universities activate the Senate Office, Faculties, and Graduation Clearance Office.
  3. **Academic Calendar**: Semesters vs. Terms vs. Quarters.
  4. **Grading Systems**: GPA-based calculations vs. raw percentage aggregates vs. grade letter allocations.

---

## 2. MODULAR MAPPING OF CAPABILITIES BY TEMPLATE TYPE

| Template Type | Academic Division | Primary Entity | Secondary Entity | Mandatory Offices | Core Workflows |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Nursery / Kindergarten** | Classroom / Section | Pupil | Parent / Guardian | Welfare Office, Clinic, Registrar | Toddler Intake, Parent Sign-in, Tuition Invoicing |
| **Primary / Secondary** | Grade / Class | Student | Parent / Guardian | Dean of Studies, Hostel Warden, Welfare | Term Grading, Report Cards, Boarder Check-in, Uniform store |
| **Vocational / Technical** | Trade Department | Trainee | Sponsor | Stores Office, HOD Office, Admissions | Competency Scoring, Material Requisition, Certification |
| **University / College** | Faculty / School | Student | Sponsor / Self | Senate, Registrar, Bursar, Library, Estates | Senate Resolutions, Course Registration, GPA, Graduation Clearance |
| **Professional Academy** | Cohort | Candidate | Corporate Sponsor | Admissions, Exams Office | Module Enrolment, Professional Exam, Transcript Verification |

---

## 3. MULTI-CAMPUS / MULTI-CENTER FEDERATED OPERATIONS
* **Concept**: Support complex multi-campus networks (e.g. an international school with 5 campuses or a state university system).
* **JUMO Implementation**:
  1. **Global Controller Portal**: Central administration interface that monitors all schools/campuses.
  2. **Campus-isolated Workspaces**: Individual campus admins can only manage localized records (students, staff, local general ledgers).
  3. **Universal Curriculum Sync**: Standardized subjects or courses pushed from the Main Senate Office down to branch campuses automatically.
