# JUMO FINTECH - UI RECONSTRUCTION MATRIX

Mapping of Benchmark discovery to FINTECH UI implementation components.

| Benchmark | Function | FINTECH Module | Portal | Screen | Form | Workflow | Capability | Status |
|-----------|----------|----------------|--------|--------|------|----------|------------|--------|
| QuickBooks | Journal Entry | JUMO FAAP | Finance Manager | GL Terminal | `JournalEntryForm` | DRAFT -> POSTED | `GL_ENTRY` | COMPLETED |
| Stripe | Payment Timeline | Digital Pay | Payments Officer | Switch Logs | `TransactionDetail` | N/A | `PAY_LOGS` | COMPLETED |
| SchoolPay | Collection Receipt | Digital Pay | Cashier | Receipt Gen | `ReceiptForm` | COMPLETED | `PAY_RECEIPT` | COMPLETED |
| Agent Banking| Cash-out | Agent Banking | Agent | Cash-out | `CashOutForm` | AUTH -> PAID | `AGENT_CASHOUT`| COMPLETED |
| Core Banking | Member KYC | Member CIF | Branch Manager | Member Registry | `MemberEnrollForm` | KYC_VERIFY | `CIF_ENROLL` | COMPLETED |
| Microfinance | Loan Appraisal | Loan Management | Credit Officer | Appraisal Desk | `LoanAppraisalForm`| ASSESSMENT | `LOAN_UNDERWRITE`| COMPLETED |
