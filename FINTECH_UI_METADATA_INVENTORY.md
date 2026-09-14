# JUMO FINTECH - UI METADATA INVENTORY

This document provides the authoritative metadata for every portal, workspace, module, and form in the reconstructed JUMO FINTECH system.

## 1. PORTALS & OFFICES
| Portal ID | Portal Name | Primary Officer | Description |
|-----------|-------------|-----------------|-------------|
| PORTAL-EXEC | MD / CEO Portal | Chief Executive | Enterprise performance, risk, and high-level approvals. |
| PORTAL-FINANCE | Finance Manager Portal | CFO / Chief Accountant | JUMO FAAP, General Ledger, AP/AR, and Tax Returns. |
| PORTAL-BRANCH | Branch Manager Portal | Branch Manager | Local branch operations, teller monitoring, and vault. |
| PORTAL-CREDIT | Credit Officer Portal | Chief Credit Officer | Loan appraisal, risk assessment, and collateral registry. |
| PORTAL-PAYMENTS | Payments Officer Portal | Payments Officer | JUMO Digital Pay Switch, settlement, and reconciliation. |
| PORTAL-AGENT | Agent Operations Portal | Agent Officer | Agent onboarding, float management, and commissions. |

## 2. MODULES & WORKSPACES
| Module ID | Module Name | Parent Portal | Navigation Item |
|-----------|-------------|---------------|-----------------|
| FT-MOD-FAAP-GL | JUMO FAAP (General Ledger) | PORTAL-FINANCE | General Ledger |
| FT-MOD-DIGI-PAY | JUMO Digital Pay Switch | PORTAL-PAYMENTS | Digital Pay Ops |
| FT-MOD-LOAN-OPS | Microfinance Lending | PORTAL-CREDIT | Loan Operations |
| FT-MOD-MEMBER-CIF | Core Banking CIF | PORTAL-BRANCH | Member Registry |
| FT-MOD-AGENT-OPS | Agent Banking Network | PORTAL-AGENT | Agent Network |

## 3. TRANSACTIONAL FORM SPECIFICATIONS

### FORM-GL-ENTRY: Journal Entry Form
- **Purpose**: Manual double-entry posting to JUMO FAAP.
- **Validation**: Total Debits must equal Total Credits.
- **Fields**:
  - `postingDate` (Date, Required)
  - `reference` (Text, Required, Pattern: JVN-...)
  - `description` (Textarea, Required)
  - `entries` (Table: Account, Debit, Credit)

### FORM-LOAN-APPRAISAL: Loan Appraisal Form
- **Purpose**: Financial assessment of loan applicant.
- **Fields**:
  - `memberId` (Lookup, Required)
  - `loanProductId` (Select, Required)
  - `requestedAmount` (Number, Required)
  - `monthlyIncome` (Number, Required)
  - `guarantors` (Multi-select)
  - `collateralValue` (Number)

### FORM-PAY-RECON: Payment Reconciliation Form
- **Purpose**: Matching gateway settlements to ledger accounts.
- **Fields**:
  - `settlementBatchId` (Text, Required)
  - `gatewayRef` (Text, Required)
  - `ledgerAccount` (Select: Cash/Bank)
  - `feeAccount` (Select: Expense)
