# OPEN SOURCE LICENCE MATRIX

Verifying legal reusability for the Jumo Universal Enterprise Platform.

| Project | Repository | Licence | Modification Permitted | Commercial Use | Redistribution | Copyleft Risk |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ERPNext** | `frappe/erpnext` | GPLv3 | YES | YES | YES | **HIGH** (Viral) |
| **Odoo** | `odoo/odoo` | LGPLv3 | YES | YES | YES | **MEDIUM** |
| **Dolibarr** | `Dolibarr/dolibarr` | GPLv3+ | YES | YES | YES | **HIGH** |
| **Kill Bill** | `killbill/killbill` | Apache 2.0 | YES | YES | YES | **LOW** (Safe) |
| **Hyperswitch** | `juspay/hyperswitch` | Apache 2.0 | YES | YES | YES | **LOW** (Safe) |
| **Apache Fineract**| `apache/fineract` | Apache 2.0 | YES | YES | YES | **LOW** (Safe) |
| **Gibbon** | `GibbonEdu/core` | GPLv3 | YES | YES | YES | **HIGH** |
| **Aureus ERP** | `aureus-erp/aureus` | MIT/GPL | YES | YES | YES | **LOW/HIGH**|

## Compliance Strategy

1. **Apache 2.0 / MIT Projects**: Target for **Direct Source Reuse** (Kill Bill, Hyperswitch, Fineract). We will copy permitted modules and preserve copyright/NOTICE files.
2. **GPL / LGPL Projects**: Target for **Functional Reimplementation**. We will study their logic and schemas to build Jumo-native equivalents. We will NOT copy their source code directly into Jumo to avoid viral license obligations, unless we fork the entire platform as a standalone Jumo-branded distribution.
3. **Attribution**: All reused code will be documented in `THIRD_PARTY_LICENSES.md`.
