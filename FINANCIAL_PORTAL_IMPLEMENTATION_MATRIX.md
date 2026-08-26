# JUMO UEOS — Financial Portal Implementation Matrix

**Date**: August 22, 2026  
**System**: JUMO UEOS Dynamic Hot-Swappable Module Portal Registry (`src/products/ModulePortalRegistry.ts`)  

---

## Complete List of Addressable Financial Portals Across All Products

| Portal ID | Portal Name | Owning Product | Route Path | Dynamic Component Path | RBAC Roles | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `fin-gl` | General Ledger & COA | Fintech | `/fintech/gl` | `src/products/fintech/portals/GeneralJournal.tsx` | `ROLE_CONTROLLER` | **LIVE** |
| `fin-ap` | Accounts Payable | Fintech | `/fintech/ap` | `src/products/fintech/portals/AccountsPayable.tsx` | `ROLE_ACCOUNTANT` | **LIVE** |
| `fin-ar` | Accounts Receivable | Fintech | `/fintech/ar` | `src/products/fintech/portals/AccountsReceivable.tsx` | `ROLE_ACCOUNTANT` | **LIVE** |
| `fin-cashbook` | Alpha Cash Book | Fintech | `/fintech/cashbook` | `src/products/fintech/portals/InstitutionalFinanceSuite.tsx` | `ROLE_BURSAR` | **LIVE** |
| `fin-budget` | Budget & Vote Book | Fintech | `/fintech/budget` | `src/products/fintech/portals/InstitutionalFinanceSuite.tsx` | `ROLE_CFO` | **LIVE** |
| `fin-recon` | Bank & PRN Reconciliation| Fintech | `/fintech/recon` | `src/products/fintech/portals/InstitutionalFinanceSuite.tsx` | `ROLE_AUDITOR` | **LIVE** |
| `fin-inventory` | Stock & Inventory Control | Fintech | `/fintech/inventory` | `src/products/faap/web/modules/InventoryModule.tsx` | `ROLE_STORES_OFFICER` | **LIVE** |
| `fin-payroll` | Statutory Payroll Engine | Fintech | `/fintech/payroll` | `src/products/faap/web/modules/PayrollModule.tsx` | `ROLE_PAYROLL_ACCOUNTANT` | **LIVE** |
| `fin-assets` | Fixed Assets & Depreciation| Fintech | `/fintech/assets` | `src/products/faap/web/modules/FixedAssetsModule.tsx` | `ROLE_ASSET_ACCOUNTANT` | **LIVE** |
| `fin-fx` | FX & Multi-Currency Desk | Fintech | `/fintech/fx` | `src/products/faap/web/modules/MultiCurrencyModule.tsx` | `ROLE_FX_DEALER` | **LIVE** |
| `fin-projects` | Job Costing & Projects | Fintech | `/fintech/projects` | `src/products/faap/web/modules/ProjectAccountingModule.tsx` | `ROLE_PROJECT_ACCOUNTANT`| **LIVE** |
| `fin-tax` | Tax Compliance & VAT | Fintech | `/fintech/tax` | `src/products/faap/web/modules/TaxModule.tsx` | `ROLE_TAX_ACCOUNTANT` | **LIVE** |
| `fin-audit` | Sentinel Audit & Parity | Fintech | `/fintech/audit` | `src/products/faap/web/modules/AuditModule.tsx` | `ROLE_AUDITOR` | **LIVE** |
| `fin-reports` | IFRS Financial Statements | Fintech | `/fintech/reports` | `src/products/faap/web/modules/FinancialReportsModule.tsx` | `ROLE_CFO` | **LIVE** |
| `fin-admin` | FAAP System Admin | Fintech | `/fintech/faap-admin` | `src/products/faap/web/modules/FaapAdminModule.tsx` | `ROLE_ADMIN` | **LIVE** |
| `edu-bursar` | Bursar Office & Ledger | Education ERP | `/education-erp/bursar` | `src/products/education-erp/web/portals/BursarOfficePortal.tsx` | `ROLE_BURSAR` | **LIVE** |
| `ch-finance` | Church Finance & Tithes | Church ERP | `/church-erp/finance` | `src/products/church-erp/web/modules/ChurchFinance.tsx` | `ROLE_PARISH_TREASURER` | **LIVE** |
| `alm-giving` | Endowments & Giving | Alumni ERP | `/alumni-erp/giving` | `src/products/alumni-erp/web/modules/AlumniGivingModule.tsx` | `ROLE_ADVANCEMENT_DIR` | **LIVE** |
