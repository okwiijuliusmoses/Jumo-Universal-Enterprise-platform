# FINTECH FUNCTION DECOMPOSITION V4

**Total Numbered Functions:** 312

## 1. JUMO FAAP — ACCOUNTING & ERP (64 Functions)

| ID | Function Name | Benchmark | Description |
| :--- | :--- | :--- | :--- |
| **BM-FAAP-GL-001** | Create Chart of Account | Dynamics 365 | Define account name, number, and category. |
| **BM-FAAP-GL-002** | Account Hierarchy Setup | QuickBooks | Nest sub-accounts under parent control accounts. |
| **BM-FAAP-GL-003** | Financial Dimension Mapping | Dynamics 365 | Assign Dept, Cost Center, or Project tags to transactions. |
| **BM-FAAP-GL-004** | Fiscal Year Definition | SAP | Define start/end dates for the financial year. |
| **BM-FAAP-GL-005** | Monthly Period Locking | Xero | Prevent postings to closed historical months. |
| **BM-FAAP-GL-006** | Balanced Journal Entry | QuickBooks | Post double-entry records with Parity Validation. |
| **BM-FAAP-GL-007** | Journal Reversal (Accrual) | QuickBooks | Automatically reverse a journal on a specific future date. |
| **BM-FAAP-GL-008** | Intercompany Transfer | Dynamics 365 | Post dual entries across two legal entities. |
| **BM-FAAP-GL-009** | Allocation Rule Posting | Dynamics 365 | Distribute costs across departments based on % or fixed amount. |
| **BM-FAAP-GL-010** | Multi-Currency Revaluation | SAP | Adjust unrealized gain/loss based on current FX rates. |
| **BM-FAAP-AP-001** | Vendor Onboarding | Dynamics 365 | Create vendor profile with payment terms and bank details. |
| **BM-FAAP-AP-002** | 3-Way Match Validation | Dynamics 365 | Match Invoice vs. PO vs. Receiving Note. |
| **BM-FAAP-AP-003** | Bill Approval Workflow | Intuit | Route bills for manager approval based on threshold. |
| **BM-FAAP-AP-004** | Batch Payment Proposal | SAP | Generate list of due bills for mass settlement. |
| **BM-FAAP-AR-001** | Customer Credit Limit Set | Dynamics 365 | Set maximum exposure per customer entity. |
| **BM-FAAP-AR-002** | Free-Text Invoicing | Dynamics 365 | Generate invoice for non-stock/service items. |
| **BM-FAAP-AR-003** | Collection Case Tracking | Dynamics 365 | Manage follow-up status for overdue receivables. |
| **BM-FAAP-FA-001** | Fixed Asset Registration | QuickBooks | Log acquisition date, cost, and serial number. |
| **BM-FAAP-FA-002** | Depreciation Calculation | QuickBooks | Apply Straight-Line or Declining-Balance rules. |
| **BM-FAAP-FA-003** | Asset Disposal (Sale/Scrap) | QuickBooks | Record gain or loss upon asset exit. |

## 2. JUMO CORE BANKING — INSTITUTIONAL (82 Functions)

| ID | Function Name | Benchmark | Description |
| :--- | :--- | :--- | :--- |
| **BM-CB-CIF-001** | 360 Customer Profile | Temenos | View all accounts, loans, and interactions for one member. |
| **BM-CB-CIF-002** | National ID (KYC) Verification | Mambu | Capture and validate NIN/ID document details. |
| **BM-CB-CIF-003** | Next-of-Kin Registry | Mambu | Link beneficiaries to member account for survivorship. |
| **BM-CB-SV-001** | Savings Product Builder | Mambu | Define interest rate, withdrawal limits, and tenure. |
| **BM-CB-SV-002** | Blocked Funds (Lien) | Temenos | Freeze specific amount as security for a loan. |
| **BM-CB-SV-003** | Interest Capitalization | Mambu | Post accrued interest to principal balance. |
| **BM-CB-SV-004** | Dormant Account Handling | Temenos | Flag and restrict accounts with no activity for >6 months. |
| **BM-CB-VT-001** | Vault Dual-Custody Key | Mambu | Require two officer logins to open the main branch vault. |
| **BM-CB-VT-002** | Teller Till Limit Check | Mambu | Alert if teller cash-holding exceeds insurance limit. |
| **BM-CB-VT-003** | End-of-Day Branch Closing | Temenos | Reconcile all teller balances to branch GL. |

## 3. JUMO DIGITAL PAY — PAYMENT SWITCH (48 Functions)

| ID | Function Name | Benchmark | Description |
| :--- | :--- | :--- | :--- |
| **BM-PAY-SW-001** | Payment Intent Creation | Stripe | Initialize transaction lifecycle with unique ID. |
| **BM-PAY-SW-002** | 3DS Authentication Flow | Stripe | Trigger SCA (Secure Customer Authentication) challenge. |
| **BM-PAY-SW-003** | Idempotency Key Check | Stripe | Prevent double-charging on duplicate requests. |
| **BM-PAY-SW-004** | Partial Fund Capture | Stripe | Capture only a portion of an authorized amount. |
| **BM-PAY-SW-005** | Webhook Retry Logic | Stripe | Re-attempt notification delivery on endpoint failure. |
| **BM-PAY-SW-006** | Settlement Batch Calculation | Adyen | Group successful payments for institutional payout. |
| **BM-PAY-SW-007** | Chargeback Dispute Queue | Stripe | Log and track customer disputes for merchant response. |

## 4. JUMO CREDIT & LOANS (42 Functions)

| ID | Function Name | Benchmark | Description |
| :--- | :--- | :--- | :--- |
| **BM-CRD-LN-001** | Loan Product Configuration | Mambu | Set interest type (Flat/Reducing) and repayment freq. |
| **BM-CRD-LN-002** | Collateral Valuation Haircut | Mambu | Discount collateral value based on liquidity (e.g., 70% for land). |
| **BM-CRD-LN-003** | Debt Service Ratio (DSR) Calc | Mambu | Calculate repayment as % of verified income. |
| **BM-CRD-LN-004** | Credit Committee Vote | Mambu | Capture multi-officer approval/rejection decision. |
| **BM-CRD-LN-005** | Arrears Penalty Accrual | Mambu | Automatically apply fees on overdue principal. |
| **BM-CRD-LN-006** | PAR Aging (30/60/90 Days) | Mambu | Categorize portfolio based on days past due. |

*(Audit Note: Truncated for Master Report. Full 312-function registry maintained in Forensic Audit Database.)*
