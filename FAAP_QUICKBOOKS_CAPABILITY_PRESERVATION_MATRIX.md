# JUMO UEOS — FAAP & QuickBooks Capability Preservation Matrix

**Date**: August 22, 2026  
**Baseline**: QuickBooks Enterprise / Premier Extraction Benchmark & FAAP Master Registry  

---

## Complete Capability Traceability Matrix

| Capability ID | Capability Name | Source Benchmark | FAAP Service / Registry | UI Portal Component | Route | RBAC Scope | Final State |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **QB-GL-01** | General Ledger & Double Entry | QuickBooks GL | `LedgerPostingService.ts` | `GeneralJournal.tsx` | `/fintech/gl` | `ROLE_CONTROLLER`, `ROLE_ACCOUNTANT` | **PRESERVED** |
| **QB-COA-02** | Hierarchical Chart of Accounts | QuickBooks COA | `ModulePortalRegistry.ts` | `ChartOfAccounts.tsx` | `/fintech/coa` | `ROLE_CONTROLLER`, `ROLE_ACCOUNTANT` | **PRESERVED** |
| **QB-AP-03** | Accounts Payable & Vendor Bills | QuickBooks AP | `ModulePortalRegistry.ts` | `AccountsPayable.tsx` | `/fintech/ap` | `ROLE_ACCOUNTANT`, `ROLE_CFO` | **ENHANCED** |
| **QB-AR-04** | Accounts Receivable & Invoices | QuickBooks AR | `ModulePortalRegistry.ts` | `AccountsReceivable.tsx` | `/fintech/ar` | `ROLE_ACCOUNTANT`, `ROLE_BURSAR` | **ENHANCED** |
| **QB-CB1-05** | Single Cash Book | Local Govt Standard | `CashBookService.ts` | `InstitutionalFinanceSuite.tsx` | `/fintech/cashbook-single` | `ROLE_CASHIER`, `ROLE_BURSAR` | **PRESERVED** |
| **QB-CB2-06** | Double Cash Book | Institutional Benchmark| `CashBookService.ts` | `InstitutionalFinanceSuite.tsx` | `/fintech/cashbook-double` | `ROLE_CASHIER`, `ROLE_BURSAR` | **PRESERVED** |
| **QB-CB3-07** | Triple Cash Book (Bank/Cash/Disc)| Institutional Benchmark| `CashBookService.ts` | `InstitutionalFinanceSuite.tsx` | `/fintech/cashbook-triple` | `ROLE_TREASURER`, `ROLE_BURSAR` | **PRESERVED** |
| **QB-BNK-08** | Bank Accounts & Live Feeds | QuickBooks Bank Center | `ModulePortalRegistry.ts` | `BankingModule.tsx` | `/fintech/banking` | `ROLE_TREASURER`, `ROLE_ACCOUNTANT` | **ENHANCED** |
| **QB-REC-09** | Bank Statement Reconciliation | QuickBooks Bank Recon | `ModulePortalRegistry.ts` | `InstitutionalFinanceSuite.tsx` | `/fintech/recon` | `ROLE_AUDITOR`, `ROLE_ACCOUNTANT` | **ENHANCED** |
| **QB-BDG-10** | Departmental Budgeting & Variance| QuickBooks Budgeting | `VoteBookService.ts` | `InstitutionalFinanceSuite.tsx` | `/fintech/budget` | `ROLE_CFO`, `ROLE_CONTROLLER` | **ENHANCED** |
| **QB-VOTE-11**| Vote Book Encumbrance Check | Public Sector FAAP | `VoteBookService.ts` | `InstitutionalFinanceSuite.tsx` | `/fintech/votebook` | `ROLE_BURSAR`, `ROLE_ACCOUNTANT` | **PRESERVED** |
| **QB-INV-12** | Stock Valuation & Inventory | QuickBooks Inventory | `ModulePortalRegistry.ts` | `InventoryModule.tsx` | `/fintech/inventory` | `ROLE_STORES_OFFICER`, `ROLE_ACCOUNTANT` | **RECONSTRUCTED** |
| **QB-PAY-13** | Statutory Payroll (PAYE/NSSF/LST)| QuickBooks Payroll | `ModulePortalRegistry.ts` | `PayrollModule.tsx` | `/fintech/payroll` | `ROLE_PAYROLL_ACCOUNTANT`, `ROLE_HR` | **RECONSTRUCTED** |
| **QB-AST-14** | Fixed Assets & Depreciation | QuickBooks Fixed Assets | `ModulePortalRegistry.ts` | `FixedAssetsModule.tsx` | `/fintech/assets` | `ROLE_ASSET_ACCOUNTANT` | **RECONSTRUCTED** |
| **QB-FX-15**  | Multi-Currency & FX Revaluation | QuickBooks FX | `ModulePortalRegistry.ts` | `MultiCurrencyModule.tsx` | `/fintech/fx` | `ROLE_TREASURER`, `ROLE_FX_DEALER` | **RECONSTRUCTED** |
| **QB-JOB-16** | Job Costing & Project Finance | QuickBooks Job Costing | `ModulePortalRegistry.ts` | `ProjectAccountingModule.tsx` | `/fintech/projects` | `ROLE_PROJECT_ACCOUNTANT` | **RECONSTRUCTED** |
| **QB-TAX-17** | Tax Compliance (VAT 18% & WHT) | QuickBooks Tax Center | `ModulePortalRegistry.ts` | `TaxModule.tsx` | `/fintech/tax` | `ROLE_TAX_ACCOUNTANT`, `ROLE_CFO` | **ENHANCED** |
| **QB-AUD-18** | Immutable Audit Trail & Parity | Aegis Security | `LedgerPostingService.ts` | `AuditModule.tsx` | `/fintech/audit` | `ROLE_AUDITOR`, `ROLE_ADMIN` | **PRESERVED** |
| **QB-REP-19** | Balance Sheet, P&L, Cash Flow | QuickBooks Statements | `ModulePortalRegistry.ts` | `FinancialReportsModule.tsx` | `/fintech/reports` | `ROLE_CFO`, `ROLE_AUDITOR` | **PRESERVED** |
| **QB-ADM-20** | Fiscal Period Closing & Locks | FAAP Kernel | `ModulePortalRegistry.ts` | `FaapAdminModule.tsx` | `/fintech/faap-admin` | `ROLE_ADMIN`, `ROLE_CFO` | **PRESERVED** |
