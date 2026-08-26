# Benchmark Extraction: Cellulant / Tingg
## Level 1 — Product Identity
*   **Product Name:** Tingg by Cellulant
*   **Product Category:** Enterprise Payments, Aggregation & Switch Infrastructure
*   **Target Market:** Large multinational corporations, airlines, utility companies, and agricultural cooperatives across Africa.
*   **Target Users:** Enterprise finance directors, systems engineers, and corporate customers.
*   **Deployment Model:** Private cloud-managed multi-tier architecture.
*   **API/Developer Surfaces:** Tingg Merchant APIs, checkout widgets, and core SMS/USSD routing gateways.

---

## Level 2 — Organizational Structure & Offices
*   **Switch Engineering & Operations:** Monitors active network connections to hundreds of regional banks and mobile carriers.
*   **Corporate Account Management:** Custom integrations for utilities (water, electricity) and state tax bodies.
*   **Fraud Operations:** Monitors large transactions for anomalies.

---

## Level 3 — Core Functional Modules
*   **Core Aggregation Engine:** Interfaces with regional bank EFT cores and mobile carrier wallets.
*   **Bill Presentment Core:** Allows customers to query utility bills (e.g., electricity account) and view live balances before paying.
*   **USSD Portal Core:** Manages menu layouts and text broadcasts across telecom lines.

---

## Level 4 — Portals and Access Levels
*   **Enterprise Manager:** Comprehensive system for high-volume corporate organizations to download ledger reconciliation sheets and schedule bulk refunds.
*   **Developer Sandbox Console:** Direct API integration logs and webhooks response verifiers.

---

## Level 5 — Core Business Workflows
1.  **Utility Bill Presentment and Payment:**
    *   *Trigger:* Customer enters electricity account number on payment screen.
    *   *Presentment:* Tingg API queries utility provider database and displays outstanding balance.
    *   *Payment:* Customer submits mobile money PIN, Tingg routes funds to carrier, and notifies utility database to instantly restore power.
2.  **Multinational Settlement Clearing:**
    *   *Trigger:* Daily transaction cycle finishes.
    *   *Settlement:* Automatically splits and transfers balances to respective partner banks and telecom operators across multiple borders.
