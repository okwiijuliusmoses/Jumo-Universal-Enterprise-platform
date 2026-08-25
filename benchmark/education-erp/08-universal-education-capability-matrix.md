# Universal Education Capability Matrix
This matrix identifies core capabilities across all major education levels. It delineates which modules must be universal in JUMO Education ERP versus those configured per template.

| Capability / Module | Early Childhood / Nursery | Primary / Secondary (K-12) | Vocational / Technical College | University / Higher Ed | Multi-Campus Group | Universal vs Template-Specific |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Demographic Registry** | Yes | Yes | Yes | Yes | Yes | **Universal Core** |
| **Tuition Billing / Invoicing** | Yes | Yes | Yes | Yes | Yes | **Universal Core** |
| **Parent/Guardian Portal** | Yes | Yes | No | No | No | **Template-Specific (K-12 only)** |
| **Grade GPA Engine** | No | No | Yes | Yes | Yes | **Template-Specific (Colleges/Univ)** |
| **Course Credit Degree Auditing**| No | No | No | Yes | Yes | **Template-Specific (HE-ERP only)** |
| **Behavior / Demerit Logs** | Yes | Yes | No | No | No | **Template-Specific (K-12 only)** |
| **Immunization / Vital Logs** | Yes | Yes | No | Yes | Yes | **Universal Core (Campus Clinic)** |
| **Multi-Campus Accounting Sync**| No | No | Yes | Yes | Yes | **Universal Core (Global Ledger)** |
| **Hostel Accommodation Booking**| No | No | Yes | Yes | No | **Template-Specific (Residential)** |
| **Statutory Council Governance**| No | No | Yes | Yes | Yes | **Template-Specific (Board Governance)**|

---

## Universal Architecture Design Strategy
To support all educational paradigms without hardcoded models:
1.  **Flexible Registration Model:** Customize student profile attributes depending on the template selected during tenant onboarding (e.g., Nursery student requires Parent Emergency phone, whereas University student requires independent contact).
2.  **Modular Grading Schemes:** Support GPA, Letter Grades, Competency Percentages, and Pass/Fail structures dynamically configured under Academics Settings.
3.  **Autonomous Billing Switch:** Custom tuition billing formulas (e.g., flat rate per term for K-12, credit unit-based calculations for University).
