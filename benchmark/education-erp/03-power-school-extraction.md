# Benchmark Extraction: PowerSchool SIS
## Level 1 — Product Identity
*   **Product Name:** PowerSchool Student Information System (SIS)
*   **Product Category:** K-12 Student Information & Unified School Technology Platform
*   **Target Market:** K-12 School Districts, Regional Education Agencies, Charter Networks.
*   **Target Users:** District Administrators, School Principals, Teachers, Counselors, Parents, and K-12 Students.
*   **Deployment Model:** Cloud-Native SaaS (Multi-Tenant).
*   **API/Developer Surfaces:** REST APIs, PowerSchool Developer Program, and IMS Global LTI integrations.

---

## Level 2 — Organizational Structure & Offices
*   **District Superintendent/Board:** Oversees regional district boundaries, funding allocations, and curriculum policies.
*   **School Principal Desk:** Directs local school operations, schedules, and staff evaluations.
*   **Guidance Counseling Department:** Monitors student progress, behavior interventions (MTSS), and college readiness.
*   **Special Education (IEP) Office:** Customizes learning programs and ensures federal/state compliance.
*   **District IT / Operations Office:** Handles student data security, database configuration, and state compliance reporting.

---

## Level 3 — Core Functional Modules
*   **K-12 Demographic Registry:** Extensive student tracking including family relations, immunization records, and residency boundaries.
*   **Behavior and Discipline Tracker:** Documents disciplinary incidents, suspensions, parent contacts, and support contracts.
*   **Attendance Intervention Engine:** Automatically triggers warning notices and parent calls for chronic absenteeism.
*   **Custom Form Builder (Ecollect):** Creates structured fields for field trips, health emergency contacts, and survey questionnaires.

---

## Level 4 — Portals and Access Levels
*   **Parent Portal (MyPowerHub):** Tracks child's live attendance records, homework grades, test assessments, and fee balances.
*   **Teacher Pro Portal (PowerTeacher):** Custom Gradebook, daily attendance sheets, lesson plans, and standards-aligned grade charts.
*   **District Admin Dashboard:** Massive data aggregator for regional analytics, state compliance exports, and teacher workloads.

---

## Level 5 — Core Business Workflows
1.  **State Compliance Reporting Workflow:**
    *   *Trigger:* End of grading period / state reporting deadline.
    *   *Processing:* Aggregates student demographic, attendance, and assessment data across all schools in the district.
    *   *Validation:* Runs data verification checks against state rules.
    *   *Export:* Delivers standardized XML file directly to the State Department of Education portal.
2.  **Attendance-Triggered Alert Workflow:**
    *   *Trigger:* Student accumulates 3 consecutive unexcused absences.
    *   *Action:* Automatically alerts counselor and routes automated message to parent.
