# JUMO UEOS Benchmark Extraction Registry

## 1. Purpose & Scope
This registry documents the deep structural extraction of workflows, data structures, UI navigation patterns, and operational controls from industry benchmark products. Extracted capabilities are reconstructed as native, branded JUMO product capabilities while preserving internal provenance metadata.

---

## 2. Benchmark Source Extractions

### Source 1: QuickBooks Financial Suite
- **Extracted Domain**: Commercial & Institutional Financial Accounting
- **Target JUMO Product**: `JUMO FAAP` (`PROD_FAAP`)
- **Extracted Capability Architecture**:
  - **Chart of Accounts**: Multi-tiered account structure (Assets, Liabilities, Equity, Revenue, Expenses) with custom account numbering and cost center tracking.
  - **General Ledger & Double-Entry Engine**: Real-time balanced journal entries requiring debit equal to credit ($0.00 offset).
  - **Accounts Payable (AP)**: Vendor management, purchase orders, bill entry, 3-way matching, approval workflows, payment batching, and AP aging reports.
  - **Accounts Receivable (AR)**: Customer profiles, automated invoicing, estimates/quotes, credit notes, payment receipts, statement generation, and AR aging reports.
  - **Bank Reconciliation**: Automated bank feed import, statement matching, uncleared deposit tracking, and discrepancy resolution.
  - **Financial Reporting**: Balance Sheet, Profit & Loss (Income Statement), Statement of Cash Flows, Trial Balance, General Ledger Detail, Budget vs Actual variance analysis.
  - **Tax & Statutory Compliance**: VAT/GST tax code configuration, tax liability tracking, automated tax return schedules.

---

### Source 2: SchoolPay Education Payment Switch
- **Extracted Domain**: Institutional Collections & Fee Management
- **Target JUMO Product**: `JUMO Digital Pay` (`PROD_DP`)
- **Extracted Capability Architecture**:
  - **Student Fee Code Reference Generator**: Unique student payment code generation linked to student ledger accounts.
  - **Omni-Channel Collection Switch**: Direct integration with Mobile Money (MTN, Airtel), Bank Branch Networks, Agent POS Terminals, and Online Web Pay.
  - **Automated Real-Time Posting**: Immediate posting of payments to student ledger accounts with instant SMS/Email receipt delivery to parents.
  - **Split Settlement Engine**: Automated allocation of collected funds across school operational accounts, board accounts, and JUMO Master Treasury (1.5% settlement fee).
  - **Tuition & Fee Structure Manager**: Termly fee structure definition, compulsory vs optional fee items, bursary/scholarship discounts, and partial payment handling.

---

### Source 3: Hillside Nalya Primary School
- **Extracted Domain**: Early Childhood & Primary Education Administration
- **Target JUMO Product**: `JUMO Primary & Nursery ERP` (`PROD_EDU_PRIMARY`)
- **Extracted Capability Architecture**:
  - **Pupil & Parent Lifecycle Management**: Admission numbers, pupil health profiles, dietary restrictions, emergency contacts, parent/guardian links.
  - **Nursery Welfare & Early Development Tracker**: Daily activity logs, milestone tracking, nap/meal schedules, and teacher notes for nursery classes.
  - **Primary Academic Assessment**: Continuous assessment marks (BOT, MOT, EOT tests), automated report card generator with headteacher comments and grading scales.
  - **Pupil Transport & Fleet Safety**: Bus route allocation, driver/matron assignments, pickup/drop-off confirmation, and RFID pupil boarding logs.
  - **Primary Boarding & Care**: Dormitory bed allocation, matron health inspections, pocket money management, and weekend visitation logs.

---

### Source 4: Alpha Academy High School
- **Extracted Domain**: Secondary & Advanced Level Boarding School Management
- **Target JUMO Product**: `JUMO Secondary & High School ERP` (`PROD_EDU_SECONDARY`)
- **Extracted Capability Architecture**:
  - **O-Level & A-Level Academic Administration**: Subject combination selection (PCM/M, BCM/Sub-Math, HEG/ICT, etc.), stream management, and termly academic weighting.
  - **National Examination Candidate Processing**: UNEB/National exam candidate registration, index number allocation, continuous assessment submission, and mock exam ranking.
  - **Science Laboratory & Practical Tracker**: Lab equipment inventory, chemical usage logs, apparatus damage tracking, and science practical timetable scheduling.
  - **Boarding & Prefect Leadership Structure**: Senior woman teacher logs, housemaster records, student prefect council elections, and disciplinary committee records.

---

### Source 5: Islamic University in Uganda (IUIU) & Uganda Christian University (UCU)
- **Extracted Domain**: Higher Education & University Academic Administration
- **Target JUMO Product**: `JUMO University ERP` (`PROD_EDU_UNIV`)
- **Extracted Capability Architecture**:
  - **Governance & Senate Administration**: Governing Council minutes, Senate academic approval workflows, Board of Studies resolutions, and Faculty Board minutes.
  - **Student Information System (SIS)**: Registration numbers, university email provisioning, semester course enrolment, prerequisite validation, and retake tracking.
  - **GPA & CGPA Transcript Engine**: Credit unit calculation, Grade Point Average computation, Cumulative GPA calculation, academic probation flags, and official transcript generation.
  - **Convocation & Graduation Management**: Clearance workflow across Bursar, Library, Hostel, Sports, and Dean of Students prior to graduation list publication.

---

### Source 6: Diocesan & Parish Church Systems
- **Extracted Domain**: Faith-Based Organization & Clergy Administration
- **Target JUMO Product**: `JUMO Church & Diocese ERP` (`PROD_CH`)
- **Extracted Capability Architecture**:
  - **Diocesan Hierarchy Management**: Diocese -> Archdeaconry -> Parish -> Sub-Parish / Local Church -> Small Christian Community / Fellowship.
  - **Sacramental Registers**: Canonical records for Holy Baptism, Confirmation, Holy Matrimony, Holy Orders, and Christian Burial.
  - **Stewardship & Tithe Management**: Envelope tracking, tithe cards, harvest thanksgiving pledges, special project offerings, and building fund registers.
  - **Pastoral Care & Clergy Deployment**: Pastoral visitation logs, sick communion records, clergy placement histories, and stipend disbursement schedules.
