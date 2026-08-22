# Benchmark Extraction: Flutterwave
## Level 1 — Product Identity
*   **Product Name:** Flutterwave
*   **Product Category:** African-focused Omnichannel Payment Infrastructure & Gateway
*   **Target Market:** African tech startups, global enterprises entering Africa, e-commerce stores, and marketplace platforms.
*   **Target Users:** Product managers, software developers, finance managers, and end-consumers.
*   **Deployment Model:** Public Cloud SaaS.
*   **API/Developer Surfaces:** REST APIs, Flutterwave Inline SDKs, mobile SDKs, and payment link generators.

---

## Level 2 — Organizational Structure & Offices
*   **Merchant Onboarding & Compliance (KYB/KYC):** Performs business verification checks, corporate registration audits, and anti-fraud sanctions clearances.
*   **FX and Treasury Operations:** Converts local currencies (KES, NGN, UGX) to global settlements (USD, EUR, GBP).
*   **Disbursements & Payouts Team:** Coordinates automated batch payouts to bank accounts and mobile money wallets.

---

## Level 3 — Core Functional Modules
*   **Flutterwave Rave (Checkout):** Multi-channel checkout widget integrating Card, USSD, and Mobile Money instantly.
*   **Split Payments API:** Distributes transactional commissions dynamically between platform owners and vendors.
*   **Rave Payouts core:** Batch transfer engine sending funds via localized RTGS and clearing switches.

---

## Level 4 — Portals and Access Levels
*   **Merchant Portal:** View transaction volumes, settlement states, active balance logs, and download Excel/CSV sheets.
*   **Compliance Verification Hub:** Secured vault for upload of KYB registration certificates and director passports.
*   **Developer Playground:** Generate API keys, check webhooks logs, and test transaction mockups.

---

## Level 5 — Core Business Workflows
1.  **Mobile Money Pull Transaction:**
    *   *Trigger:* Customer initiates mobile money collection payment.
    *   *Prompt:* Flutterwave fires push-STK prompt directly to customer's cellular screen.
    *   *Capture:* Customer inserts mobile PIN, cellular network confirms payment, Flutterwave logs success and credits merchant.
2.  **Cross-border FX Settlement Workflow:**
    *   *Trigger:* Merchant converts local UGX balance to USD.
    *   *Execution:* FX desk applies mid-market rate and initiates SWIFT transfer to international account.
