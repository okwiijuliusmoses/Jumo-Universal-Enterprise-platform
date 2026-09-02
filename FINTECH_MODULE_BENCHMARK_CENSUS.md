# FINTECH MODULE BENCHMARK CENSUS

| # | JUMO System | Module | Benchmark | Extracted Functions | Capabilities | Forms | Fields | Workflows | Tables/Entities | Reports | Screens | UI Metadata | Implemented | Verified | Gap |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Core Banking** | Member KYC | CB-CF | 4 | 2 | 1 | 5 | 1 | 1 | 1 | 1 | COMPLETE | YES | YES | - |
| 2 | **Core Banking** | Savings Accounts | CB-SV | 6 | 2 | 1 | 4 | 1 | 1 | 1 | 1 | COMPLETE | PARTIAL | NO | Terminal unwired |
| 3 | **Core Banking** | Share Capital | CB-SH | 2 | 2 | 1 | 4 | 1 | 1 | 1 | 1 | COMPLETE | NO | NO | Form unwired |
| 4 | **Core Banking** | Vault Cash | CB-VT | 4 | 2 | 1 | 4 | 1 | 1 | 1 | 1 | COMPLETE | NO | NO | Form unwired |
| 5 | **Credit** | Loan Underwriting | CR-LN | 6 | 2 | 1 | 5 | 1 | 1 | 1 | 1 | COMPLETE | YES | YES | - |
| 6 | **Credit** | CRB & Collateral | CR-CL | 2 | 2 | 1 | 4 | 1 | 1 | 1 | 1 | COMPLETE | NO | NO | Form unwired |
| 7 | **Digital Pay** | Mobile Money Switch | ST-PY | 8 | 2 | 1 | 4 | 1 | 1 | 1 | 1 | COMPLETE | NO | NO | Terminal unwired |
| 8 | **FAAP** | General Ledger | QB-GL | 12 | 2 | 1 | 3 | 1 | 1 | 1 | 1 | COMPLETE | YES | YES | - |
| 9 | **Compliance** | UMRA Compliance | UM-RG | 4 | 2 | 1 | 3 | 1 | 1 | 1 | 1 | COMPLETE | NO | NO | Reporting unwired |

---

## CENSUS NOTES
- **Extracted Functions**: Number of discrete business requirements identified from benchmarks.
- **Implemented**: Marked YES only if a functional React component with state handling exists in `FintechForms.tsx` or `FintechWorkspace.tsx`.
- **Verified**: Marked YES if the form was manually tested for input and parity/validation logic.
