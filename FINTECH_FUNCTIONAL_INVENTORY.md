# JUMO FINTECH - FUNCTIONAL INVENTORY

This document enumerates the authoritative modules, capabilities, and workflows implemented in the reconstructed JUMO FINTECH application.

## 1. FINTECH CORE (Member & CIF)
| Module | Capability | Description | Workflow |
|--------|------------|-------------|----------|
| Member CIF | Enrollment | Register new members with NIN verification. | DRAFT -> KYC_VERIFY -> ACTIVE |
| Member CIF | Profile Management | Update contact info, address, and signatures. | REQUEST -> APPROVE -> UPDATED |
| Accounts | Account Opening | Create Savings, Fixed, or Loan accounts for members. | APPLICATION -> OPENED |

## 2. MICROFINANCE & LENDING
| Module | Capability | Description | Workflow |
|--------|------------|-------------|----------|
| Loan Management | Underwriting | Credit assessment and risk scoring. | APPLICATION -> ASSESSMENT -> APPROVAL |
| Loan Management | Disbursement | Payout of approved funds via Mobile Money or Cash. | APPROVED -> DISBURSE_INIT -> COMPLETED |
| Collateral | Asset Registry | Tracking of pledged logbooks, land titles, etc. | PLEDGE -> VERIFIED -> RELEASED |

## 3. SACCO OPERATIONS
| Module | Capability | Description | Workflow |
|--------|------------|-------------|----------|
| Shares | Capital Subscription | Purchase and transfer of institutional shares. | BUY -> POSTED |
| Savings | Deposit/Withdrawal | Over-the-counter or digital savings operations. | INITIATED -> COMPLETED |
| Dividends | Profit Distribution | Annual distribution of surplus to members. | CALCULATE -> APPROVE -> CREDIT |

## 4. JUMO DIGITAL PAY (Payments Switch)
| Module | Capability | Description | Workflow |
|--------|------------|-------------|----------|
| Payments Switch | C2B Collection | Pulling payments from MTN/Airtel to SACCO account. | INITIATED -> AUTHORIZED -> SUCCESS |
| Payments Switch | B2C Payouts | Sending funds from SACCO to member mobile wallets. | REQUEST -> APPROVE -> SENT |
| Reconciliation | Gateway Settlement | Matching bank statements with payment gateway logs. | UNRECONCILED -> MATCHED |

## 5. JUMO FAAP (General Ledger)
| Module | Capability | Description | Workflow |
|--------|------------|-------------|----------|
| General Ledger | Journal Entry | Manual debit/credit postings to the GL. | DRAFT -> REVIEW -> POSTED |
| Financials | Balance Sheet | Real-time generation of the statement of financial position. | AUTO-GENERATE |
| Audit | Audit Trail | Immutable log of all financial state changes. | SYSTEM-LOG |

## 6. AGENT BANKING
| Module | Capability | Description | Workflow |
|--------|------------|-------------|----------|
| Agent Network | Onboarding | Recruitment and vetting of third-party agents. | APPLIED -> VETTED -> ACTIVE |
| Float Ops | Liquidity Mgmt | Managing agent cash-drawer limits and top-ups. | REQUEST -> APPROVE -> CREDITED |
