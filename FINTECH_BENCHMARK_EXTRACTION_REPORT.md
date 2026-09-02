# JUMO FINTECH - BENCHMARK EXTRACTION REPORT

This report catalogs the authoritative evidence extracted from industry-standard financial systems to ground the physical reconstruction of JUMO FINTECH.

## 1. ACCOUNTING & ERP (QuickBooks, Xero, Odoo)

| Benchmark ID | Source | Product Area | Extracted Business Function | JUMO Implementation Target |
|--------------|--------|--------------|-----------------------------|----------------------------|
| QB-001 | QuickBooks | General Ledger | Chart of Accounts Hierarchy | JUMO FAAP - COA Registry |
| QB-002 | QuickBooks | General Ledger | Double-Entry Journal Posting | JUMO FAAP - Journal Terminal |
| QB-003 | QuickBooks | Accounts Payable | Vendor Bill Approval Workflow | JUMO FAAP - AP Module |
| XE-001 | Xero | Bank Reconciliation | Match/Categorize Bank Feed | JUMO FAAP - Bank Recon |
| OD-001 | Odoo | Accounting | Multi-level Financial Reporting | JUMO FAAP - Reports Engine |

## 2. PAYMENTS & SETTLEMENT (Stripe, Adyen, Flutterwave)

| Benchmark ID | Source | Product Area | Extracted Business Function | JUMO Implementation Target |
|--------------|--------|--------------|-----------------------------|----------------------------|
| ST-001 | Stripe | Payments | Payment Intent Lifecycle | Digital Pay - Switch Ops |
| ST-002 | Stripe | Refunds | Partial/Full Refund Processing | Digital Pay - Refund Desk |
| ST-003 | Stripe | Connect | Merchant/Vendor Payouts | Digital Pay - Settlement |
| FW-001 | Flutterwave | Collections | MoMo Collection Webhook Sync | Digital Pay - MoMo Ingest |

## 3. INSTITUTIONAL PAYMENTS (SchoolPay)

| Benchmark ID | Source | Product Area | Extracted Business Function | JUMO Implementation Target |
|--------------|--------|--------------|-----------------------------|----------------------------|
| SP-001 | SchoolPay | Collections | Unique Student Payment Codes | Digital Pay - Payment Codes |
| SP-002 | SchoolPay | Reconciliation | Real-time Institutional Posting | Digital Pay - Auto-Recon |

## 4. CORE BANKING & AGENT SYSTEMS (Temenos, Mambu, Agent Banking)

| Benchmark ID | Source | Product Area | Extracted Business Function | JUMO Implementation Target |
|--------------|--------|--------------|-----------------------------|----------------------------|
| AB-001 | Agent Ops | Onboarding | Agent KYC & Vetting Workflow | Agent Banking - Onboarding |
| AB-002 | Agent Ops | Float | Agent Liquidity/Float Tracking | Agent Banking - Float Mgmt |
| CB-001 | Mambu | CIF | 360-degree Member/Customer View | FINTECH Core - Member CIF |
| CB-002 | Temenos | Lending | Loan Appraisal & Underwriting | Microfinance - Lending Ops |

---

## UI METADATA MAPPING

### FAAP-001: General Ledger Workspace
- **Benchmark Source**: QB-001, QB-002
- **Portal**: Finance Manager Portal
- **Module**: JUMO FAAP
- **Capability**: Journal Management
- **Action**: Post Journal
- **Form**: `JournalEntryForm` (Benchmark: QuickBooks "New Journal Entry")
- **Fields**: Date, Ref, Description, Account (Lookup), Debit, Credit, Currency.
- **Workflow**: `DRAFT -> PENDING_REVIEW -> POSTED -> RECONCILED`

### DPAY-001: Digital Pay Switch Terminal
- **Benchmark Source**: ST-001, SP-001
- **Portal**: Payments Officer Portal
- **Module**: JUMO Digital Pay
- **Capability**: Payment Code Management
- **Action**: Issue Payment Code
- **Form**: `IssueCodeForm` (Benchmark: SchoolPay "Generate Student Code")
- **Workflow**: `REQUESTED -> ACTIVE -> EXPIRED`
