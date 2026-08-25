# Benchmark Extraction: Sage Intacct
## Level 1 — Product Identity
*   **Product Name:** Sage Intacct
*   **Product Category:** Professional Cloud Financial Management & Accounting Software
*   **Target Market:** Professional services, healthcare providers, financial services companies, and NGOs.
*   **Target Users:** CFOs, finance directors, audit coordinators, controllers.
*   **Deployment Model:** Public Cloud SaaS.
*   **API/Developer Surfaces:** Sage Intacct Web Services (XML API, REST API endpoints).

---

## Level 2 — Organizational Structure & Offices
*   **Multi-Entity Management Office:** Configures financial parameters, currencies, and charts of accounts across discrete legal entities.
*   **NGO Fund Management Office:** Dedicated workspace tracking restricted donor funds, grant expenditures, and grant balances.

---

## Level 3 — Core Functional Modules
*   **Intacct Dimensions Engine:** Replaces complex, bloated flat charts of accounts with dynamic dimension tags (e.g. Location, Department, Project, Vendor) on standard G/L entries.
*   **Intelligent General Ledger:** Automated posting core supporting multi-book accounting (e.g. tax book vs. GAAP book).
*   **Grant & Fund Tracker:** Essential tracking core for NGOs managing restricted donor capital.

---

## Level 4 — Portals and Access Levels
*   **CFO Controller Dashboard:** Tailored dimensional reports mapping project profitability, department spending, and budget variances.
*   **Grant Manager Workspace:** View grant balances, restrict spending allocations, and export donor compliance files.

---

## Level 5 — Core Business Workflows
1.  **Fund Restriction Validation (Fund Accounting):**
    *   *Trigger:* Expense is registered against restricted grant code.
    *   *Validation:* Confirms that expense aligns with donor restriction rules.
    *   *Result:* Approved expense debits Restricted Fund asset account and updates reporting dimensions.
2.  **Dimensional Journal Entry Run:**
    *   *Trigger:* Accountant creates standard ledger entry.
    *   *Dimensions:* Appends department, location, and project tags to the G/L line for micro-analysis.
