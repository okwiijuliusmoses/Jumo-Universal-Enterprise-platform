# JUMO UEOS Benchmark Registry: IUIU ERP Extraction

This registry documents the systematic extraction of university-scale enterprise capabilities from the IUIU ERP benchmark and their implementation mapping into **JUMO Education ERP**.

---

## 1. INSTITUTIONAL GOVERNANCE & COUNCIL OPERATIONS
* **Source Product**: IUIU ERP
* **Capability**: Institutional Governance & Board structures
* **Source Area**: Council Registry Module
* **Extracted Concept**: Tracking council resolutions, board members, academic senate agendas, policy approvals, and legislative scopes.
* **JUMO Interpretation**: Multi-tenant, configurable board of governors module that tracks institutional resolutions and links them to dynamic workflow approvals.
* **Target Product**: JUMO Education ERP
* **Target Domain**: Governance & Administration
* **Target Office**: Vice-Chancellor Office / Governing Council Secretariat
* **Target Module**: Council Resolutions Manager
* **Target Workflow**: Draft Resolution -> Committee Review -> Board Voting -> Chairman Signature -> Active Enforcement.
* **Target Portal**: Executive Portal / Trustee Portal
* **Target Web Experience**: Grid view of statutory council resolutions with filters for meeting date, committee, and campus scope.
* **Target Mobile Experience**: Agenda review inbox, resolution voting controls, and notification of statutory alerts.
* **Implementation Status**: EXTRACTED -> DESIGNED -> IMPLEMENTED -> INTEGRATED -> VERIFIED
* **Verification Status**: VERIFIED (Tested against EducationErpService resolutions data)

---

## 2. REGISTRAR & ADMISSIONS LIFECYCLE
* **Source Product**: IUIU ERP
* **Capability**: Admissions & Student Records
* **Source Area**: Office of the Registrar
* **Extracted Concept**: Dynamic application form, evaluation criteria, registration number generation, cohort assignment, and campus-specific program mapping.
* **JUMO Interpretation**: Universal admission system supporting nursery up to university program enrollment using dynamic course templates.
* **Target Product**: JUMO Education ERP
* **Target Domain**: Student Registrar
* **Target Office**: Office of the Registrar -> Admissions Office
* **Target Module**: Registrar Admission Terminal
* **Target Workflow**: Student Application -> Registrar Evaluation -> Intake Assignment -> Invoice Generation -> Program Matriculation.
* **Target Portal**: Staff Portal / Registrar Desk
* **Target Web Experience**: Comprehensive application queue with profile reviewers, program status trackers, and automatic registration number generation.
* **Target Mobile Experience**: Mobile registrar inbox for rapid document approvals and admissions status overview.
* **Implementation Status**: EXTRACTED -> DESIGNED -> IMPLEMENTED -> INTEGRATED -> VERIFIED
* **Verification Status**: VERIFIED (Linked to JRM and Faap Ledger on student matriculation)

---

## 3. BUDGETING & VOTE BOOK COMMITMENT
* **Source Product**: IUIU ERP
* **Capability**: Vote Books & Departmental Budgets
* **Source Area**: Bursar Directorate / Finance Office
* **Extracted Concept**: Enforcing strict budget limits on academic department expenditures. Prior to spending, a budget commitment is registered.
* **JUMO Interpretation**: Automated budget gatekeeper integrated with JUMO FAAP. Prevents purchase orders if the departmental vote book allocation has insufficient funds.
* **Target Product**: JUMO Education ERP
* **Target Domain**: Financial Bursary
* **Target Office**: Bursary Office / Budget & Vote Book Control
* **Target Module**: Departmental Vote Books
* **Target Workflow**: Budget Allocation -> Requisition Submission -> Funds Commitment -> Verification -> Spend Post -> Ledger De-commitment.
* **Target Portal**: Staff Portal / HOD Workspace
* **Target Web Experience**: Visual department ledger showing allocation limits, funds committed (WIP), actual expenditures, and remaining discretionary budget.
* **Target Mobile Experience**: Quick expense authorization alerts for Heads of Department.
* **Implementation Status**: EXTRACTED -> DESIGNED -> IMPLEMENTED -> INTEGRATED -> VERIFIED
* **Verification Status**: VERIFIED (Integrated via FaapService postUniversalTransaction api)
