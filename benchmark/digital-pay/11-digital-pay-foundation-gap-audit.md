# Foundation Gap Audit: JUMO Digital Pay

This audit analyzes the current JUMO Digital Pay foundation codebase, identifying static placeholders, hardcoded artifacts, and remaining structural gaps compared against observed benchmarks (SchoolPay, Stripe, Flutterwave, Adyen).

## 1. Static and Hardcoded Findings

### A. Live Ingestion Stream
*   **Inspected File:** `src/products/digital-pay/web/modules/CollectionStream.tsx`
*   **Original Finding:** The transaction feed consisted of static mock rows (e.g. `Learner 001`, `Learner 002`) that never updated or recorded actual collection actions.
*   **Current State:** Resolved. Bound dynamically to `DigitalPayService` to show real-time transactions with dynamic channel counters.

### B. Daily Settlement Switch
*   **Inspected File:** `src/products/digital-pay/web/modules/SettlementSwitch.tsx`
*   **Original Finding:** The summary values (e.g. `Gross Pool`, `Commission Fee`) were completely hardcoded static strings.
*   **Current State:** Resolved. Values are now computed dynamically from real collections, and clicking "Close Daily Batch" triggers active double-entry commission splits in FAAP.

### C. PRN Lookup Dashboard
*   **Inspected File:** `src/products/digital-pay/web/modules/PRNEngine.tsx`
*   **Original Finding:** Non-functional search mock-ups that did not connect to student databases or process collections.
*   **Current State:** Resolved. Features live lookup, reference creation modals, and payment collection workflows synced with FAAP customer billing.

---

## 2. Outstanding Gaps to Address in Next Phases
To complete a high-fidelity duplication of observed benchmarks, the subsequent phases must implement:
1.  **Direct Carrier Integrations:** Standard adaptors to integrate with MTN and Airtel Mobile Money USSD gateways, triggering push prompts.
2.  **Interactive Webhook Verifier:** Tool inside the Developer Portal for merchants to inspect delivered events payload history and response codes.
3.  **Advanced Fraud Engine (Radar):** Security rule dashboard enabling merchants to block cards/wallets by geographic origin, device ID, or transaction frequency thresholds.
4.  **Chargeback Management Portal:** Forms for dispute handling allowing merchants to upload legal documents and dispute files.
5.  **Multi-currency FX Engine:** Converts currency allocations dynamically depending on payout destinations.
