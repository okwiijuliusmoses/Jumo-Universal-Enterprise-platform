# FINTECH SECURITY RECONSTRUCTION V4

**Total Operational Roles:** 22
**Total Permissions:** 12
**Total Controls:** 26

## 1. ROLES & PERMISSIONS

| Role | Access | Key Permissions |
| :--- | :--- | :--- |
| **Branch Manager** | Core Banking | `VIEW_VAULT`, `APPROVE_OVERRIDE`, `CLOSE_DAY` |
| **Credit Officer** | Credit | `CREATE_APPRAISAL`, `VIEW_COLLATERAL` |
| **Credit Manager** | Credit | `APPROVE_LOAN`, `SET_LIMITS` |
| **Accountant** | FAAP | `POST_JOURNAL`, `VIEW_GL`, `RUN_TRIAL_BALANCE` |
| **CFO** | FAAP | `CLOSE_PERIOD`, `REOPEN_PERIOD`, `APPROVE_BUDGET` |
| **Compliance Officer** | Risk | `VIEW_AML_ALERTS`, `CASE_DISPOSITION` |

## 2. SECURITY CONTROLS
- **CTR-001: Maker-Checker**: Mandatory for all Journal Postings > 1,000,000 UGX.
- **CTR-002: Dual-Auth**: Required for Main Vault access.
- **CTR-003: PIN Encryption**: Mandatory for Agent Cash-out terminals.
- **CTR-004: Period Lock**: Prevents editing GL history once audited.

---

# FINTECH EXCEPTION RECONSTRUCTION V4

| Exception ID | Scenario | Detection | Recovery/Action |
| :--- | :--- | :--- | :--- |
| **EXC-001** | Payment Timeout | Gateway No-Response | Auto-Retry (Max 3) then Fail + Reversal. |
| **EXC-002** | Insufficient Float | Balance < Request | Block Transaction + Alert Agent. |
| **EXC-003** | Mismatch (Recon) | Ledger != Bank | Log to Exception Queue for Manual Matching. |
| **EXC-004** | Dual-Auth Failure | Invalid 2nd Key | Lock Terminal + Alert Security Manager. |
| **EXC-005** | ID KYC Failure | NIRA API No-Match | Flag for Manual Verification / Reject. |

---

# FINTECH BENCHMARK SOURCE CENSUS V4

**Total Investigated Sources:** 18

| Source | Domain | Evidence Quality |
| :--- | :--- | :--- |
| **QuickBooks Enterprise** | Accounting | HIGH (Direct Feature Audit) |
| **Dynamics 365 Finance** | Accounting | HIGH (Documentation Review) |
| **Stripe API** | Payments | HIGH (API Reference Audit) |
| **Mambu** | Core Banking | HIGH (Product Feature List) |
| **Temenos Transact** | Core Banking | MEDIUM (Third-party Review) |
| **Adyen** | Payments | MEDIUM (Settlement Specs) |
| **GSMA Mobile Money** | Agent/Wallets | HIGH (Standard Specs) |
| **UMRA (Regulatory)** | Compliance | HIGH (Statutory Forms) |

---

# FINTECH BENCHMARK EVIDENCE REGISTER V4

| Item ID | Function | Source | Evidence Description |
| :--- | :--- | :--- | :--- |
| **BM-FAAP-GL-001**| Create COA | Dynamics 365 | "A chart of accounts is a list of the accounts that an organization uses for recording financial transactions." |
| **BM-PAY-SW-001** | Payment Intent | Stripe | "A PaymentIntent guides you through the process of collecting a payment from a customer." |
| **BM-CB-CIF-001** | 360 Customer View| Temenos | "360-degree customer view provides a comprehensive perspective of customer interactions and data." |
| **BM-CB-VT-001** | Dual-Key Vault | Mambu | "Vault Cash Drawer Management... requires Dual-Key Authorization Pattern." |
