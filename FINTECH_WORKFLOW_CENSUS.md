# FINTECH WORKFLOW CENSUS

## TOTALS
- **Total Workflows Defined:** 9
- **Average States per Workflow:** 3
- **Runtime Execution Status:** **METADATA_ONLY** (Logic simulated in UI messages)

---

## 1. WF-001: KYC Vetting Workflow
- **System:** Core Banking
- **Module:** Member KYC
- **Actor:** KYC Officer -> Compliance Manager
- **Initial State:** DRAFT
- **States:** DRAFT, PENDING_NIRA_VERIFICATION, VERIFIED, REJECTED
- **Transitions:** `onboard` -> `verify` -> `approve`/`reject`
- **Approval:** Compliance Manager
- **Persistence:** CIF Table

## 2. WF-002: Credit Appraisal Workflow
- **System:** Credit & Loans
- **Module:** Loan Underwriting
- **Actor:** Credit Officer -> Credit Committee
- **Initial State:** SUBMITTED
- **States:** APPRAISAL_IN_PROGRESS, PENDING_COMMITTEE, APPROVED, DISBURSED, REJECTED
- **Transitions:** `submit` -> `appraise` -> `vote` -> `disburse`
- **Approval:** Multi-signature Committee
- **Persistence:** Loan Portfolio Table

## 3. WF-003: Financial Audit Workflow
- **System:** FAAP
- **Module:** General Ledger
- **Actor:** Accountant -> CFO
- **Initial State:** UNPOSTED
- **States:** UNPOSTED, PENDING_REVIEW, POSTED_TO_GL
- **Transitions:** `draft_entry` -> `parity_check` -> `post`
- **Approval:** CFO
- **Persistence:** General Ledger Table

---

## 4. OTHER DEFINED WORKFLOWS
- **FT-WF-SAVINGS**: Fixed Deposit Maturity Workflow
- **FT-WF-SHARES**: Dividend Allocation Workflow
- **FT-WF-VAULT**: Dual-Custody Transfer Workflow
- **FT-WF-COLLATERAL**: Security Perfection Workflow
- **FT-WF-MOMO**: Payment Switch Retry Workflow
- **FT-WF-UMRA**: Statutory Return Filing Workflow
