# JUMO FAAP Capability Map & Financial Record Books Specification

## 1. Executive Summary
JUMO FAAP (Financial & Accounting Platform) is a QuickBooks-class, enterprise financial engine that serves both as an independent product and as the financial backbone for all JUMO ERP domains (Education, Church, Government, Manufacturing, Healthcare).

---

## 2. Specification of the 27 Financial Record Books

| Book ID | Financial Record Book Name | Functional Specification & Operating Rules |
|---|---|---|
| `FAAP_BK_01` | **Budget Book** | Stores approved annual operational and capital budgets by vote head and cost center. |
| `FAAP_BK_02` | **Budget Recorder** | Captures real-time budget allocation adjustments, supplementary budgets, and virement approvals. |
| `FAAP_BK_03` | **Vote Book** | Tracks commitments, encumbrances, actual expenditures, and remaining unencumbered vote balances. |
| `FAAP_BK_04` | **Cash Book** | Master record of all liquid cash inflows and outflows across all bank and physical cash accounts. |
| `FAAP_BK_05` | **Single Cash Book** | Dedicated single-column record for basic physical cash office transactions. |
| `FAAP_BK_06` | **Double Cash Book** | Two-column record tracking physical Cash and Bank account transactions separately. |
| `FAAP_BK_07` | **Triple Cash Book** | Three-column record tracking Cash, Bank, and Settlement/Discount balances. |
| `FAAP_BK_08` | **Petty Cash Book** | Imprest system record tracking minor operational cash disbursements with petty cash voucher links. |
| `FAAP_BK_09` | **Receipt Book** | Sequential official receipt register recording all revenue collections with payment rail references. |
| `FAAP_BK_10` | **Payment Book** | Sequential payment voucher register recording all authorized disbursements and cheque numbers. |
| `FAAP_BK_11` | **Journal Book** | Master general journal recording non-cash transactions, accruals, depreciation, and adjusting entries. |
| `FAAP_BK_12` | **Ledger Book** | Principal ledger containing all asset, liability, equity, revenue, and expense accounts. |
| `FAAP_BK_13` | **General Ledger** | Summary control accounts for all subsidiary ledgers balancing total debits against credits. |
| `FAAP_BK_14` | **Subsidiary Ledgers** | Granular individual customer, vendor, student, or parishioner sub-account ledgers. |
| `FAAP_BK_15` | **Auditor Book** | Chronological immutable log of all ledger modifications, posting overrides, and administrative reversals. |
| `FAAP_BK_16` | **Audit Register** | Real-time audit exceptions register flagged by the AI Financial Auditor ($0.00 offset failures, unusual amounts). |
| `FAAP_BK_17` | **Asset Register** | Fixed asset inventory tracking acquisition cost, useful life, accumulated depreciation, and physical location. |
| `FAAP_BK_18` | **Liability Register** | Outstanding debt obligations register, long-term loans, debentures, and accrued interest schedules. |
| `FAAP_BK_19` | **Revenue Register** | Revenue categorization book tracking tuition fees, tithes, grants, merchant fees, and government transfers. |
| `FAAP_BK_20` | **Expenditure Register**| Expense categorization book tracking payroll, utilities, maintenance, supplies, and capital projects. |
| `FAAP_BK_21` | **Bank Register** | Individual bank account registers with uncleared cheques, pending deposits, and bank fee breakdowns. |
| `FAAP_BK_22` | **Tax Register** | VAT/GST and statutory withholding tax register detailing tax collected, tax paid, and net remittance due. |
| `FAAP_BK_23` | **Procurement Register**| Financial register of issued purchase orders, vendor contracts, and commit balances. |
| `FAAP_BK_24` | **Financial Analysis Book**| Financial ratio trends, liquidity ratios, working capital metrics, and margin analysis records. |
| `FAAP_BK_25` | **Grant/Fund Book** | Dedicated fund accounting register tracking restricted donor grants, expenditure restrictions, and fund balances. |
| `FAAP_BK_26` | **Departmental Book** | Cost center financial ledgers breaking down revenues and expenses by academic faculty, hospital ward, or parish. |
| `FAAP_BK_27` | **Treasury Clearing Book**| JUMO Master Treasury 1.5% clearing fee settlement ledger tracking platform revenues and automated splits. |

---

## 3. FAAP Core Ledger Integrity Rules
1. **Strict Double-Entry Parity**: Every financial transaction must consist of at least one debit and one credit entry where `Σ Debits === Σ Credits` ($0.00 offset).
2. **Immutability & Auditability**: Posted journal entries cannot be deleted. Corrections must be executed via offset reversing journal entries with full auditor trail recording.
3. **Multi-Currency & FX**: Transactions in foreign currencies are converted at daily official rates, posting unrealized FX gain/loss entries to designated ledger accounts.
