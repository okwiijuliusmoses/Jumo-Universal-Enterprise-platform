# Benchmark Extraction: Blackbaud K-12
## Level 1 — Product Identity
*   **Product Name:** Blackbaud K-12 (formerly WhippleHill)
*   **Product Category:** Private School Management ERP & CRM
*   **Target Market:** Independent, Private, Preparatory, and boarding schools.
*   **Target Users:** Admissions Staff, Fundraising & Advancement Officers, Headteachers, Boarding Masters, Parents, and Students.
*   **Deployment Model:** Dedicated Private Cloud SaaS.
*   **API/Developer Surfaces:** Blackbaud SKY API (OAuth 2.0).

---

## Level 2 — Organizational Structure & Offices
*   **Admissions & Enrollment Office:** Coordinates student acquisition, private school entry interviews, and admissions testing.
*   **Advancement & Alumni Office:** Directs fundraising campaigns, major donor leads tracking, and annual school dinners.
*   **Boarding & Dormitory Office:** Manages student residency plans, weekend leave permissions, and dorm duties rosters.
*   **Athletics Office:** Oversees school sports team registers, fixtures scheduling, and transport booking.

---

## Level 3 — Core Functional Modules
*   **SKY Funding CRM:** Tracks donor pipelines, legacy family relationships, and pledges.
*   **OnBoard Admissions:** Pipeline management for parent tours, placement exams, and enrollment agreements.
*   **Dormitory Master Register:** Custom assignment for private boarding student rooms and daily attendance sign-offs.
*   **Billing & Tuitions Control:** Coordinates private payment schedules, credit card auto-debits, and financial aid grants.

---

## Level 4 — Portals and Access Levels
*   **Alumni & Donor Hub:** Access donations history, pledge new contributions, and RSVP to advancement events.
*   **Boarding Staff Console:** Log daily bed counts, track students who have checked out for weekend leave, and record disciplinary items.
*   **Admissions Officer Portal:** Schedule interviews, grade entrance exams, and generate customized enrollment contracts.

---

## Level 5 — Core Business Workflows
1.  **Advancement Campaign Donation Logging:**
    *   *Trigger:* Donor processes capital donation.
    *   *Integration:* Pushes transaction directly to SKY CRM, updates donor level tier, and auto-generates tax-deductible receipt PDF.
2.  **Dorm Leave Request Approval:**
    *   *Trigger:* Student requests weekend out-of-bounds permission.
    *   *Authorization:* Requires digital signature from parent, followed by boarding master authorization before gate pass unlocks.
