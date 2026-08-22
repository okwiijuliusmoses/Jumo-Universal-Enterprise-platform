# Benchmark Extraction: Ellucian Banner ERP
## Level 1 — Product Identity
*   **Product Name:** Ellucian Banner
*   **Product Category:** Higher Education Enterprise Resource Planning (HE-ERP)
*   **Target Market:** Major Public & Private Universities, Community College Systems, and Research Institutions.
*   **Target Users:** University Presidents, Provosts, Academic Registrars, Financial Aid Officers, University CFOs, and Students.
*   **Deployment Model:** On-Premise, Public Cloud (OCI, AWS), or Managed SaaS.
*   **API/Developer Surfaces:** Banner Ethos Integration Platform, RESTful Web Services, and direct SQL views.

---

## Level 2 — Organizational Structure & Offices
*   **Office of the Provost / VP of Academic Affairs:** Manages university curricula, program accreditations, and faculty tenures.
*   **Office of Financial Aid:** Distributes government grants, athletic scholarships, work-study payments, and student loans.
*   **Bursar's Office / Student Accounts:** Handles tuition billing, payment plan schedules, and financial holds.
*   **Advancement & Alumni Office:** Tracks donor contributions, capital campaigns, and alumni events.
*   **Human Resources & Payroll:** Coordinates university faculty salaries, benefit plan packages, and work-study timesheets.

---

## Level 3 — Core Functional Modules
*   **Degree Works (Audit System):** Tracks student course credits against graduation requirements to automate degree audit trails.
*   **Ethos Financial Engine:** Double-entry ledger core mapping auxiliary accounts, endowments, and departmental cost centers.
*   **Financial Aid Packager:** Automatically evaluates federal aid files (e.g., FAFSA) and assigns aid structures.
*   **Schedule Planner:** Algorithmic schedule planner preventing classroom clashes and faculty workload over-commitments.

---

## Level 4 — Portals and Access Levels
*   **Banner Self-Service Student Portal:** Course search, registration, financial aid acceptance, bill payments, and e-transcripts.
*   **Faculty Advisor Console:** Student mentoring logs, academic degree progress audits, and course override approvals.
*   **Finance & Operations Console:** Financial aid disbursements, general ledger posts, and purchase requisitions.

---

## Level 5 — Core Business Workflows
1.  **Financial Aid Package Disbursement:**
    *   *Trigger:* Financial Aid disbursement date is reached.
    *   *Validation:* Confirms student enrollment status, cumulative GPA, and minimum academic progress (SAP).
    *   *Execution:* Automatically credits student account ledger in Banner Accounts Receivable.
    *   *Downstream:* Unresolved excess aid is automatically marked for refund check/EFT routing.
2.  **Degree Audit & Graduation Clearance:**
    *   *Trigger:* Student applies for graduation.
    *   *Audit:* Degree Works analyzes completed courses.
    *   *Approval:* Registrar reviews and signs off on academic clearance.
