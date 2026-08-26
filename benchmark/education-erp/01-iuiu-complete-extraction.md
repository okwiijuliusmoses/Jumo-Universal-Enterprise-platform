# Benchmark Extraction: IUIU ERP
## Level 1 — Product Identity
*   **Product Name:** IUIU Academic & Administrative Portal (Sovereign ERP)
*   **Product Category:** Higher Education Enterprise Resource Planning (HE-ERP)
*   **Target Market:** African Higher Education Institutions, Islamic Universities, and multi-campus collegiate networks.
*   **Target Organizations:** Universities, Colleges, and Professional Academic Centers.
*   **Target Users:** Students, Lecturers, Academic Registrars, Admissions Officers, Bursars, Senate Board, and University Council Members.
*   **Deployment Model:** On-Premise Core with Hybrid Cloud Student & Lecturer Portal extensions.
*   **API/Developer Surfaces:** Oracle Forms Plugs, SOAP web services for bank clearing feeds, and custom JSON integrations.
*   **Major Product Editions:** Enterprise Multi-Campus University Edition.

---

## Level 2 — Organizational Structure & Offices
The institution operates through the following designated offices and roles:
1.  **Governing Council Office:** Approves policies, financial allocations, and major structural changes.
2.  **Office of the Academic Registrar:** Manages the entire student lifecycle from admission, program creation, matriculation, to graduation clearance.
3.  **Senate Examinations Board:** Owns academic integrity, course grading moderation, and board approvals of grades.
4.  **University Bursary & Finance Office:** Authorizes departmental expenditures, manages sub-ledgers, and enforces Vote Book budget allocations.
5.  **Accommodation & Halls of Residence Office:** Handles hostel room allocations and residential clearance.
6.  **University Health Services Clinic:** Logs medical visits and student wellness files.
7.  **University Library Office:** Coordinates physical book loan circulations and clearance checks.

---

## Level 3 — Core Functional Modules
*   **Student Admissions Module:** Handles application queues, verification checklists, and generates sovereign student admission numbers.
*   **Senate Examinations Module:** Moderates submitted course marks and calculates cumulative GPA.
*   **Vote Book Budgetary Control Module:** Establishes departmental vote heads, monitors committed expenditure vs. allocation, and triggers strict overdraft validation blockades.
*   **Circulation Control Module (Library):** Manages book loan deadliness and return workflows.
*   **Clinic Diagnosis Module:** Logs medical encounters and treatments.

---

## Level 4 — Portals and Access Levels
*   **Student Portal:** Accessible via registration number. Allows course registration, fee balance checks, grade reports, and hostel application.
*   **Staff/Lecturer Portal:** Allows submitting class grades, viewing roster schedules, and recording academic progress.
*   **Administrator Desk:** Multi-role dashboard for registrar, bursar, and senate members to perform authorization actions.

---

## Level 5 — Core Business Workflows
1.  **Student Admission & Tuition Billing Workflow:**
    *   *Trigger:* Academic Registrar approves applicant.
    *   *Processing:* Generates Reg Number, adds to Student Directory, and automatically creates a Customer Invoice (UGX 1.2M standard) in FAAP.
2.  **Vote Book Expenditure Commitment Workflow:**
    *   *Trigger:* Department requests fund allocation against Vote Code.
    *   *Validation:* Enforces strict available balance check. If allocation exceeds available balance, blocks with an `OVERDRAFT BLOCKED` exception.
    *   *Posting:* Successful commitment debiting expense and crediting cash bank in FAAP.
3.  **Senate Exam Moderation and Release Workflow:**
    *   *Trigger:* Lecturer posts course score.
    *   *Moderation:* Board bulk-approves batch entries, updating status to `APPROVED` and unlocking academic transcripts on student portals.
