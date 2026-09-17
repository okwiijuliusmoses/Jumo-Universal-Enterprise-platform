# LICENCE COMPLIANCE

Legal obligations and attribution for reused open-source components in Jumo.

## 1. Reused Source Modules

| Component | Source Project | Licence | Requirement | Jumo Action |
| :--- | :--- | :--- | :--- | :--- |
| **Payment Connectors** | **Hyperswitch** | Apache 2.0 | Attribution & NOTICE | Included in `THIRD_PARTY_LICENSES.md`. |
| **Billing State Machine**| **Kill Bill** | Apache 2.0 | Attribution | Included in `THIRD_PARTY_LICENSES.md`. |
| **GL Entry Schema** | **ERPNext** | GPLv3 (Pattern) | Functional Reuse | Logic reimplemented in Jumo TypeScript. No direct source copy. |

## 2. Global Compliance Checklist
- [x] All Apache 2.0 copyright notices preserved in copied files.
- [x] No GPL source code directly embedded in the Jumo proprietary/MIT core.
- [x] All third-party trademarks (Odoo, ERPNext, Stripe) used only as references.
- [x] `THIRD_PARTY_LICENSES.md` maintained and accessible in production.

## 3. Mandatory Attribution
> Parts of the Jumo Payment Engine are derived from **Hyperswitch** (© 2026 Juspay Technologies). Parts of the Jumo Billing Engine are derived from **Kill Bill** (© 2026 The Kill Bill Project).
