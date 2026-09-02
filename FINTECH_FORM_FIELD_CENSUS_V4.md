# FINTECH FORM FIELD CENSUS V4

**Total Enumerated Fields:** 214

## 1. FORM: FRM-CB-001 (Member Enrollment)

| Field ID | Label | Data Type | Validation | Business Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **FLD-CB-001** | Full Legal Name | Text | REQUIRED | Primary KYC identifier. |
| **FLD-CB-002** | National ID (NIN) | Text | REGEX: ^[A-Z]{2}[0-9]{12}$ | Mandatory regulatory identification. |
| **FLD-CB-003** | Date of Birth | Date | AGE >= 18 | Eligibility for financial services. |
| **FLD-CB-004** | Primary Phone | Tel | REQUIRED | Communication and 2FA. |
| **FLD-CB-005** | Email Address | Email | OPTIONAL | Statements and alerts. |
| **FLD-CB-006** | Residential Address | Text | REQUIRED | Geographical risk profiling. |
| **FLD-CB-007** | Occupation | Select | ENUM_OCCUPATION | AML source-of-wealth tracking. |
| **FLD-CB-008** | Photo Upload | File | IMAGE/JPEG | Biometric record. |
| **FLD-CB-009** | ID Scan | File | PDF/IMAGE | Document verification. |

## 2. FORM: FRM-CRD-001 (Loan Application)

| Field ID | Label | Data Type | Validation | Business Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **FLD-CRD-001** | Principal Amount | Number | MIN: 10000 | Amount requested for borrowing. |
| **FLD-CRD-002** | Loan Product | Select | ENUM_PRODUCTS | Links to interest/tenure rules. |
| **FLD-CRD-003** | Repayment Period | Number | MAX_BY_PRODUCT | Term of the facility (Months). |
| **FLD-CRD-004** | Collateral Type | Select | ENUM_COLLATERAL | Security classification for risk. |
| **FLD-CRD-005** | Collateral Value | Number | REQUIRED | Basis for LTV calculation. |
| **FLD-CRD-006** | Guarantor Name | Text | REQUIRED | Secondary liability record. |

## 3. FORM: FRM-ACC-001 (General Journal)

| Field ID | Label | Data Type | Validation | Business Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **FLD-ACC-001** | Posting Date | Date | NOT_CLOSED_PERIOD | Financial reporting date. |
| **FLD-ACC-002** | Reference Number | Text | UNIQUE | Audit trail identifier. |
| **FLD-ACC-003** | Account Selection | Select | CHART_OF_ACCOUNTS | Target GL account. |
| **FLD-ACC-004** | Debit Amount | Number | POSITIVE | Left-side ledger entry. |
| **FLD-ACC-005** | Credit Amount | Number | POSITIVE | Right-side ledger entry. |
| **FLD-ACC-006** | Line Description | Text | REQUIRED | Business rationale for entry. |

---

## 4. FORM: FRM-PAY-002 (Disbursement Request)

| Field ID | Label | Data Type | Validation | Business Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **FLD-PAY-001** | Recipient Channel | Select | MTN/AIRTEL | Destination payment rail. |
| **FLD-PAY-002** | Recipient Phone | Tel | REQUIRED | Mobile Money identifier. |
| **FLD-PAY-003** | Payout Amount | Number | WITHIN_LIMITS | Net disbursement value. |
| **FLD-PAY-004** | Idempotency Key | Text | SYSTEM_GEN | Prevent duplicate payment trigger. |

*(Audit Note: Truncated for Master Report. Full 214-field specification available in System Data Dictionaries.)*
