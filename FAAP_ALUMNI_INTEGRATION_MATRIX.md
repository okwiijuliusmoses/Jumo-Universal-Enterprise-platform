# JUMO UEOS — FAAP & Alumni ERP Integration Matrix

**Date**: August 22, 2026  
**Target Product**: Alumni ERP (`/products/alumni-erp`) — Alumni Advancement & Endowments  

---

## Alumni Advancement Financial Mapping

| Alumni Advancement Workspace | Transaction Type | FAAP Ledger Rule | GL Account Mapping | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Endowments & Giving** | Capital Campaign Donation | Debit Digital Pay Bank / Credit Endowment Revenue | Accounts 1010 (Bank) / 4200 (Endowment Income) | **INTEGRATED** |
| **Endowments & Giving** | Student Bursary Disbursement | Debit Bursary Expense / Credit Student Tuition AR | Accounts 5300 (Bursary Expense) / 1110 (Student AR) | **INTEGRATED** |
| **Chapter Relations** | Annual Chapter Membership Dues | Debit Cash/MoMo / Credit Chapter Dues Income | Accounts 1020 (MoMo Float) / 4210 (Membership Fees) | **INTEGRATED** |
| **Alumni Events & Galas** | Gala Ticket Sales & Sponsorships | Debit Cash / Credit Event Revenue | Accounts 1010 (Bank) / 4220 (Event Revenue) | **INTEGRATED** |
| **Alumni Treasury** | Fixed Deposit Interest Yield | Debit Investment Asset / Credit Interest Income | Accounts 1310 (T-Bills) / 4290 (Investment Yield) | **INTEGRATED** |
