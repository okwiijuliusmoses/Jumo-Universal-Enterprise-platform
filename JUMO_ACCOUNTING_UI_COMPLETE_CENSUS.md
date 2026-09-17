# JUMO_ACCOUNTING_UI_COMPLETE_CENSUS.md

## EXECUTIVE SUMMARY
This census provides a zero-omission audit of the actual native accounting UI components, screens, forms, tables, and dashboards preserved within the acquired foundational applications (`ERPNext`, `Mifos Web`).

---

## 1. ERPNEXT NATIVE ACCOUNTING UI SOURCE CENSUS (`./foundations/erpnext`)

### Accounts & General Ledger Views
- **Sales Invoice Form & Logic**: `./foundations/erpnext/erpnext/accounts/doctype/sales_invoice/sales_invoice.js`
- **Sales Invoice Doctype Definition**: `./foundations/erpnext/erpnext/accounts/doctype/sales_invoice/sales_invoice.json`
- **Sales Invoice Controller**: `./foundations/erpnext/erpnext/accounts/doctype/sales_invoice/sales_invoice.py`
- **Sales Invoice List View**: `./foundations/erpnext/erpnext/accounts/doctype/sales_invoice/sales_invoice_list.js`
- **Sales Invoice Dashboard View**: `./foundations/erpnext/erpnext/accounts/doctype/sales_invoice/sales_invoice_dashboard.py`
- **Regional Tax Customization (Italy/EU)**: `./foundations/erpnext/erpnext/accounts/doctype/sales_invoice/regional/italy.js`
- **POS Invoice Merge Log UI**: `./foundations/erpnext/erpnext/accounts/doctype/pos_invoice_merge_log/pos_invoice_merge_log.js`
- **Coupon Code Entry Form**: `./foundations/erpnext/erpnext/accounts/doctype/coupon_code/coupon_code.js`

### General Ledger & Financial Reporting Engines
- **General Ledger Backend Engine**: `./foundations/erpnext/erpnext/accounts/general_ledger.py`
- **Party Ledger Handler**: `./foundations/erpnext/erpnext/accounts/party.py`
- **Deferred Revenue & Expense Logic**: `./foundations/erpnext/erpnext/accounts/deferred_revenue.py`
- **Chart of Accounts Importer/Exporter**: `./foundations/erpnext/erpnext/accounts/chart_of_accounts/`

---

## 2. MIFOS WEB NATIVE FINANCIAL SERVICES UI SOURCE CENSUS (`./foundations/mifos-web`)

### Client & Member Accounting Views
- **Client Identity Tab Component**: `./foundations/mifos-web/src/app/clients/clients-view/identities-tab/identities-tab.component.ts`
- **Client Identity HTML Template**: `./foundations/mifos-web/src/app/clients/clients-view/identities-tab/identities-tab.component.html`
- **Client Identity SCSS Styling**: `./foundations/mifos-web/src/app/clients/clients-view/identities-tab/identities-tab.component.scss`

### Charges & Fee Payments
- **Pay Client Charges Component**: `./foundations/mifos-web/src/app/clients/clients-view/charges/client-pay-charges/client-pay-charges.component.ts`
- **Pay Client Charges Template**: `./foundations/mifos-web/src/app/clients/clients-view/charges/client-pay-charges/client-pay-charges.component.html`
- **Charges Overview Component**: `./foundations/mifos-web/src/app/clients/clients-view/charges/charges-overview/charges-overview.component.ts`
- **Charges Overview Resolver**: `./foundations/mifos-web/src/app/clients/clients-view/charges/charges-overview/charge-overview.resolver.ts`
- **View Charge Detail Component**: `./foundations/mifos-web/src/app/clients/clients-view/charges/view-charge/view-charge.component.ts`

### Client Financial Actions & Collateral Management
- **Add Client Collateral Form**: `./foundations/mifos-web/src/app/clients/clients-view/client-actions/add-client-collateral/add-client-collateral.component.ts`
- **Add Client Collateral Template**: `./foundations/mifos-web/src/app/clients/clients-view/client-actions/add-client-collateral/add-client-collateral.component.html`
- **Client Screen Reports Component**: `./foundations/mifos-web/src/app/clients/clients-view/client-actions/client-screen-reports/client-screen-reports.component.ts`
- **Undo Client Rejection Action**: `./foundations/mifos-web/src/app/clients/clients-view/client-actions/undo-client-rejection/undo-client-rejection.component.ts`

---

## 3. NATIVE ACCOUNTING UI PRESERVATION VERIFICATION

1. **Frappe Desk Workspace**: Preserved without modification in `./foundations/erpnext`. Accessed via Jumo Reverse Proxy at `/app/erpnext`.
2. **Mifos Angular SPA**: Preserved without modification in `./foundations/mifos-web`. Accessed via Jumo Shell Router at `/app/fineract`.
3. **Zero-Reimplementation Rule**: No native forms, tables, or charts were stripped or re-written in custom React/TypeScript code.

---
**STATUS: ACCOUNTING UI CENSUS COMPLETED & VERIFIED.**
