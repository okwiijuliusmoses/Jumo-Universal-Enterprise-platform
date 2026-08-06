# JUMO Universal Enterprise Operating System (UEOS) v6.2
## MISSING_COMPONENTS.md - Non-Blocking Future Enhancements & Integration Roadmap

This document serves as the official registry of non-blocking, future integration points and hardware dependencies identified during the v6.2 production transition. These are scheduled as future upgrade phases and do not block current cloud or on-premises staging.

---

## 1. EXTERNAL SERVICES AND PAYMENT CONNECTIONS
While the local simulated sandbox processes double-entry general ledger entries and implements automatic platform fee splits, the physical live connections are pending API key provisioning from the owner:
1.  **Safaricom M-Pesa Merchant Gateway (C2B/B2C)**: Requires official merchant credentials (Safaricom shortcode, consumer key, consumer secret, and PassKey) to route live cellular transactions.
2.  **East African MTN & Airtel Mobile Money Integrations**: Requires live aggregator merchant keys.
3.  **Stripe API Live Key Access**: Ready for standard input inside the **Sovereign Secrets Vault** dashboard to execute live electronic debit and credit lines.

---

## 2. METADATA-DRIVEN ERP DOMAIN EXPANSIONS
The core **Domain Installer** activates metadata-driven models for standard ERP domains. However, detailed sub-systems for niche requirements are scheduled for development:
*   **Legal Cases ERP**: Detailed court calendar tracking, legal case filing, judge assignments, and document brief indexers.
*   **Cooperative Saccos Dividends**: Automated multi-variable dividend allocation algorithms based on active member ledger shares history.
*   **Healthcare EMR System**: Strict HIPAA-compliant electronic medical records schemas and laboratory request dispatch integrations.

---

## 3. ADVANCED HARDWARE INTEGRATIONS
For on-premises and local hybrid enterprise deployments, future hardware drivers are mapped but not physically pre-bundled:
*   **Biometric Attendance Clock Readers**: Socket integrations for polling ZK-Teco and similar physical biometric finger/facial recognition terminals.
*   **Thermal Receipt Printers**: ESC/POS command-line drivers for silent USB or Network thermal ticket printing in wholesale ERP POS grids.
*   **Barcode Scanner Interfaces**: Standard HID keyboard wedge decoders for instant shop POS stock entry.

---
**Verified and Released by the JUMO UEOS Supreme Core Architect**
