# Benchmark Extraction: Adyen
## Level 1 — Product Identity
*   **Product Name:** Adyen Payments Platform
*   **Product Category:** Omnichannel Single-Platform Global Payments Engine
*   **Target Market:** Global enterprise merchants, airlines, fast-growing tech companies.
*   **Target Users:** Enterprise finance managers, data scientists, and risk controllers.
*   **Deployment Model:** Single Global Platform Cloud Architecture (Multi-Tenant).
*   **API/Developer Surfaces:** REST APIs, custom checkout UI kits, and deep merchant dashboard integration APIs.

---

## Level 2 — Organizational Structure & Offices
*   **Acquiring & Clearing Desk:** Deals with direct processing connections to Visa, Mastercard, and localized bank networks.
*   **Risk & RevenueProtect:** Specialized department configuring custom fraud rules, automated testing suites, and AI-driven checkout optimization.

---

## Level 3 — Core Functional Modules
*   **Adyen RevenueProtect:** In-built smart fraud detection engine using behavioral profiles and ML models.
*   **RevenueAccelerate:** Intelligent payment routing core that dynamically switches clearing pathways to prevent issuer declines.
*   **Adyen Giving:** Direct integration allowing customers to add micro-donations to charity organizations at checkouts.

---

## Level 4 — Portals and Access Levels
*   **Adyen Customer Area:** High-density enterprise dashboard featuring unified transaction tracking across web, app, and in-store terminals.
*   **Risk Management Workspace:** Interactive visual editor to construct, analyze, and test fraud prevention rules.

---

## Level 5 — Core Business Workflows
1.  **Intelligent Gateway Auto-Retry (RevenueAccelerate):**
    *   *Trigger:* Card payment fails due to technical issuer decline.
    *   *Rerouting:* Adyen instantly reformats card data fields and retries payment via alternative bank clearing network.
    *   *Result:* Resolves friction without notifying customer.
2.  **Omnichannel In-store Return:**
    *   *Trigger:* Customer returns product bought online to physical store.
    *   *Capture:* Clerk scans receipt, Adyen locates online payment record, and automatically triggers card refund.
