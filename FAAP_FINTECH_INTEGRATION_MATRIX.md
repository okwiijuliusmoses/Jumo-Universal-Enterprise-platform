# JUMO UEOS — FAAP & Fintech Integration Matrix

**Date**: August 22, 2026  
**Target Product**: JUMO FINTECH (`/products/fintech`)  

---

## Fintech Sub-Family to FAAP Integration Matrix

| Fintech Family ID | Family Name | Transaction Event | Accounting Entry Trigger | FAAP GL Account Mappings | Integration Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **FIN-DP-01** | Digital Pay Switch | Fee Payment / PRN | Automatic Receipt & PRN Reconciliation | Debit Cash (1010) / Credit Student Fee Revenue (4010) | **IMPLEMENTED** |
| **FIN-STL-02** | 1.5% Protocol Clearing | Settlement Fee Deduct | 1.5% Clearing Split to Master Treasury | Debit Settlement Clearing (1030) / Credit Fee Revenue (4020) | **IMPLEMENTED** |
| **FIN-MM-03** | Mobile Money Switch | C2B / B2C Payouts | Float Movement & Commission Accrual | Debit MoMo Float (1020) / Credit Commission Income (4030) | **IMPLEMENTED** |
| **FIN-MER-04** | Merchant Acquiring | QR / POS Transaction | Merchant Settlement & MDR Deduction | Debit Merchant Clearing (1040) / Credit Merchant Payable (2020) | **IMPLEMENTED** |
| **FIN-LND-05** | Lending & Microfinance| Loan Disbursement | Principal Outflow & Interest Accrual | Debit Loan Receivable (1120) / Credit Cash (1010) | **IMPLEMENTED** |
| **FIN-FX-06** | FX & Treasury Desk | Currency Conversion | Realized/Unrealized FX Gain Loss | Debit Foreign Currency Bank (1015) / Credit FX Gain (4090) | **IMPLEMENTED** |
| **FIN-TAX-07** | Tax Compliance | VAT / 6% WHT | Monthly URA Tax Return Accrual | Debit VAT Payable (2030) / Credit Tax Expense (5030) | **IMPLEMENTED** |
| **FIN-AUD-08** | Audit & Sentinel | Ledger Rebalance | Parity Guard Audit Sweep ($0.00) | Debit/Credit Parity Audit Log Entry | **IMPLEMENTED** |
