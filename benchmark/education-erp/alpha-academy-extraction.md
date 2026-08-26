# JUMO UEOS Benchmark Registry: Alpha Academy Extraction

This registry documents the systematic extraction of school-level and academy administration capabilities from the Alpha Academy benchmark and their implementation mapping into **JUMO Education ERP**.

---

## 1. SUBJECT MANAGEMENT & GRADING ENGINES
* **Source Product**: Alpha Academy
* **Capability**: Academic Grading, Subject Scheduling, and Progress Reporting
* **Source Area**: Dean of Studies / Academic Coordinator Workspace
* **Extracted Concept**: Tracking term-based continuous assessments, examinations, subject assignments, grading rubrics, and the generation of printable report cards.
* **JUMO Interpretation**: Multi-rubric, template-driven grading ledger that dynamically updates based on the configured institution type (e.g. standard K-12 grading vs. university Credit Unit GPAs).
* **Target Product**: JUMO Education ERP
* **Target Domain**: Academic Operations
* **Target Office**: Academic Department / Office of the Dean
* **Target Module**: Subject Registry & Progress Desk
* **Target Workflow**: Subject Setup -> Teacher Assignment -> Continuous Assessment entry -> Examination Entry -> Grade calculation -> Report Card generation.
* **Target Portal**: Teacher Portal / Parent Portal
* **Target Web Experience**: Grid entry system for continuous assessment marks, real-time class average recalculations, and printable PDF/Web report card templates.
* **Target Mobile Experience**: Grades entry dashboard for teachers, term report card review screen for parents.
* **Implementation Status**: EXTRACTED -> DESIGNED -> IMPLEMENTED -> INTEGRATED -> VERIFIED
* **Verification Status**: VERIFIED (Supported in the unified registrar and student profile layers)

---

## 2. HOSTEL & ACCOMMODATION TRACKING
* **Source Product**: Alpha Academy
* **Capability**: Boarding and Hostel allocation
* **Source Area**: Office of the Warden / Welfare Department
* **Extracted Concept**: Tracking dormitory capacities, room allocations, boarder checklists, health records, and hostel fee structures.
* **JUMO Interpretation**: Tenant-scoped spatial inventory manager that handles bed allocation, checks capacity thresholds, and handles welfare records.
* **Target Product**: JUMO Education ERP
* **Target Domain**: Student Welfare & Boarding
* **Target Office**: Welfare Department / Hostel Warden Office
* **Target Module**: Hostel & Dormitory Space Manager
* **Target Workflow**: Hostel Definition -> Room & Bed Configuration -> Student Allocation -> Capacity Validation -> Welfare Log Entry.
* **Target Portal**: Staff Portal / Warden Workspace
* **Target Web Experience**: Floor plan view of hostels, room capacity cards, and occupancy statistics.
* **Target Mobile Experience**: Warden room inspection logs, emergency student roster, check-in checklists.
* **Implementation Status**: EXTRACTED -> DESIGNED -> IMPLEMENTED -> INTEGRATED -> VERIFIED
* **Verification Status**: VERIFIED (Integrated in HostelModule of Education ERP Web Shell)

---

## 3. FEES BILLING & STUDENT LEDGER BILLING
* **Source Product**: Alpha Academy
* **Capability**: Tuition fees, invoicing, and receipts
* **Source Area**: Bursary Desk / Finance Office
* **Extracted Concept**: Enforcing term-based student fee requirements, creating school fee structure invoices, tracking payments, and issuing itemized receipts.
* **JUMO Interpretation**: Invoice-based subledger for students, generating receivables linked to JUMO DIGITAL PAY reference models.
* **Target Product**: JUMO Education ERP
* **Target Domain**: Student Finance
* **Target Office**: Bursar Office / Fee Collection Office
* **Target Module**: Student Fee Ledger
* **Target Workflow**: Term Fee Structure Setup -> Invoice Generation -> Invoice Release -> JUMO Digital Pay Link -> Receipt Processing -> Ledger Clearance.
* **Target Portal**: Parent Portal / Student Portal / Accountant Workspace
* **Target Web Experience**: Billing statement tracker showing itemized tuition fees, optional hostel charges, payments, and outstanding balances.
* **Target Mobile Experience**: Fee payment dashboard with quick-pay links to JUMO DIGITAL PAY channels.
* **Implementation Status**: EXTRACTED -> DESIGNED -> IMPLEMENTED -> INTEGRATED -> VERIFIED
* **Verification Status**: VERIFIED (Linked directly to JUMO DIGITAL PAY reference model)
