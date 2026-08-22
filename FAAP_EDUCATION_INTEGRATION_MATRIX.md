# JUMO UEOS — FAAP & Education ERP Integration Matrix

**Date**: August 22, 2026  
**Target Product**: Universal School ERP (`/products/education-erp`) — Pre-Primary, Primary, Secondary & Higher Ed Tiers  

---

## School Office & Workspace FAAP Mapping

| School Office Portal | Operational Task | FAAP Ledger Posting Rule | GL Account Mapping | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Bursar Office** | Student Fee Invoicing & Billing | Debit Student Accounts Receivable / Credit Tuition Income | Accounts 1110 (AR) / 4010 (Tuition Revenue) | **INTEGRATED** |
| **Bursar Office** | PRN Bank Fee Collection | Debit Bank Operating Account / Credit Student Accounts Receivable | Accounts 1010 (Stanbic Bank) / 1110 (Student AR) | **INTEGRATED** |
| **Bursar Office** | Procurement & Dry Stores Purchase | Debit Food & Stores Inventory / Credit Cash/AP | Accounts 1210 (Food Stores) / 2010 (Accounts Payable) | **INTEGRATED** |
| **Headteacher Office** | Vote Book Budget Clearance | Check Encumbrance against Departmental Vote Book | Vote Book Account 5100 (Academic Supplies) | **INTEGRATED** |
| **Dean / Warden** | Boarding & Facility Fees | Credit Facility Fee Income | Accounts 1010 (Bank) / 4050 (Boarding Revenue) | **INTEGRATED** |
| **DOS Office** | Exam & UNEB Registration Fees | Debit Student Fee AR / Credit UNEB Payable | Accounts 1110 (AR) / 2040 (UNEB Registration Payable) | **INTEGRATED** |
