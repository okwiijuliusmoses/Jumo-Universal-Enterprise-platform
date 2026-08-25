# Benchmark Extraction: SchoolPay
## Level 1 — Product Identity
*   **Product Name:** SchoolPay
*   **Product Category:** Specialized Educational Payment & Fee Collection Gateway
*   **Target Market:** K-12 School Networks, Universities, and Vocational Institutions across East Africa (Uganda, Kenya, Tanzania).
*   **Target Organizations:** Primary schools, Secondary schools, and public/private universities.
*   **Target Users:** Parents, School Bursars, Bank Tellers, Mobile Money Agents.
*   **Deployment Model:** Cloud SaaS integrated with major cellular networks and regional banking clearing switches.
*   **API/Developer Surfaces:** Custom SOAP/JSON endpoints for bank ledger updates, USSD gateway push prompts.

---

## Level 2 — Organizational Structure & Offices
*   **Clearing and Settlement Switch Office:** Oversees real-time transactions processing, bank reconciliation file outputs, and mobile money ledger settlements.
*   **Bursar Finance Desk:** Directs student reference generation, fee collections audits, and pending balances tracking.
*   **Teller Operations (Partner Banks):** Integrates physical cash deposits with online payment reference numbers (PRN).

---

## Level 3 — Core Functional Modules
*   **PRN Generation & Resolution Engine:** Maps unique student fee billing files to distinct 10-digit Payment Reference Numbers.
*   **Channel Orchestration Switch:** Automatically routes transactions across MTN Mobile Money, Airtel Money, and bank networks.
*   **Real-time Ledger Ingestion Core:** Matches incoming bank transaction feeds against student PRNs to clear debts instantly.

---

## Level 4 — Portals and Access Levels
*   **Bursar Console:** Tracks real-time payments stream, downloads bank deposit slips, and prints student clear receipts.
*   **Bank Teller API Interface:** Secure workspace for bank teller applications to query PRN validity and authorize cash collections directly.
*   **Parent Portal / USSD Menu:** Dial custom code (e.g., `*217#`) to query outstanding balances and authorize mobile wallets pull payments.

---

## Level 5 — Core Business Workflows
1.  **PRN Collection Workflow:**
    *   *Trigger:* Parent pays fees at bank teller or mobile wallet.
    *   *Input:* Input PRN number, verify name, authorize cash/wallet debit.
    *   *Validation:* Confirms PRN is active and amount does not exceed outstanding balance.
    *   *Downstream:* Instantly triggers double-entry ledger update in university bursary and releases student invoice balances.
