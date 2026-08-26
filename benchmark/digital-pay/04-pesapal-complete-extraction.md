# Benchmark Extraction: PesaPal
## Level 1 — Product Identity
*   **Product Name:** PesaPal
*   **Product Category:** Hospitality & Retail Payments Gateway
*   **Target Market:** Hotels, restaurants, tour operators, and retail merchants in East Africa.
*   **Target Users:** Hotel receptionists, accountants, restaurant managers, and consumers.
*   **Deployment Model:** Cloud SaaS with localized physical Point of Sale (POS) card terminal integrations.
*   **API/Developer Surfaces:** PesaPal V3 APIs (OAuth 2.0, IPN webhooks, refund endpoints).

---

## Level 2 — Organizational Structure & Offices
*   **POS Terminal Logistics Office:** Coordinates physical card machine distributions, network connectivity checks, and merchant device setups.
*   **Reconciliations & Settlement Hub:** Reconciles physical terminal transactions with digital payments logs.

---

## Level 3 — Core Functional Modules
*   **Sabi POS Core:** Orchestrates transactions across card swipe machines, contactless terminals, and mobile money QR codes.
*   **Hospitality Booking Engine Link:** Custom API integration directly with hotel Property Management Systems (PMS).
*   **E-Invoicing Module:** Automatically constructs payment link invoices and sends via SMS/Email.

---

## Level 4 — Portals and Access Levels
*   **Merchant Store Portal:** Dashboard for managers to view daily sales, terminal-specific volumes, and refund requests.
*   **Terminal Handler Console:** Mobile application for checkout staff to log manual transactions or process card receipts.

---

## Level 5 — Core Business Workflows
1.  **Contactless POS Terminal Payment:**
    *   *Trigger:* Customer taps card on POS device.
    *   *Processing:* POS terminal communicates with local bank network to capture transaction authorization.
    *   *Downstream:* Updates digital merchant dashboard and triggers printer to release physical paper receipt.
2.  **Hospitality Refund Validation:**
    *   *Trigger:* Guest requests booking cancellation.
    *   *Authorization:* Requires manager level credentials before PesaPal API processes refund back to original payment card.
