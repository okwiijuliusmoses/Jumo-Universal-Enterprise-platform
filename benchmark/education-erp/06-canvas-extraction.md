# Benchmark Extraction: Canvas LMS
## Level 1 — Product Identity
*   **Product Name:** Canvas LMS by Instructure
*   **Product Category:** Cloud-Native Learning Management System (LMS)
*   **Target Market:** Higher Education, K-12 Districts, Professional Development Networks.
*   **Target Users:** Students, Teachers, Faculty Members, Instructional Designers, School Administrators, and Parents.
*   **Deployment Model:** AWS Public Cloud SaaS (Multi-Tenant).
*   **API/Developer Surfaces:** GraphQL API, REST API, IMS Canvas LTI Advantage tools.

---

## Level 2 — Organizational Structure & Offices
*   **Curriculum Development Department:** Curates course templates, master course syllabus rubrics, and educational outcomes.
*   **Office of Distance Education:** Coordinates online learning, webinar integrations, and virtual classroom assignments.
*   **Student Support Services:** Tracks learning disabilities accommodations and counselor reviews.

---

## Level 3 — Core Functional Modules
*   **SpeedGrader:** Rapid grading interface supporting PDF markup, video feedback, and standard grading rubrics.
*   **Canvas Catalog:** Marketplace and registration catalog for public continuing education classes.
*   **Modules & Paths:** Sequential learning paths with strict pre-requisites and requirements.
*   **Conferences / Virtual Classroom:** Real-time video-conferencing integrations (e.g., BigBlueButton, Zoom).

---

## Level 4 — Portals and Access Levels
*   **Student Portal:** Clean course cards list, Live To-Do List, calendar, and grades.
*   **Teacher Workspace:** SpeedGrader, Course Builder, announcements publisher, and student engagement telemetry charts.
*   **Observer (Parent) View:** Tracks child's progress, upcoming due dates, and lecturer announcements.

---

## Level 5 — Core Business Workflows
1.  **LTI Tool Launch Integration:**
    *   *Trigger:* Student clicks external tool link (e.g., Pearson Lab).
    *   *Authentication:* Uses Canvas OAuth 2.0 to securely sign student credentials.
    *   *Result:* Launches secure iframe workspace without requiring external login.
2.  **Assignment Grade Passback:**
    *   *Trigger:* External tool computes student score.
    *   *API Post:* LTI outcomes service pushes score to Canvas Gradebook.
