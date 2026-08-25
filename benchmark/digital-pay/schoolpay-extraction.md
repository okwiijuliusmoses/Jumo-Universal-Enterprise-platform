# JUMO UEOS Benchmark Registry: SchoolPay Extraction

This registry documents the systematic extraction of billing and mobile collection concepts from the SchoolPay benchmark and their implementation mapping into **JUMO DIGITAL PAY**.

---

## 1. PAYMENT REFERENCE NUMBER (PRN) GENERATION ENGINE
* **Source Product**: SchoolPay
* **Capability**: PRN / Payment Reference Mechanism
* **Source Area**: Billing Core API
* **Extracted Concept**: Exposing a unique, verifiable Payment Reference Number (PRN) for each bill or invoice. This reference is distributed to payers to use across various collection channels (banks, mobile agents, USSD). Upon checking the PRN, the channel displays the student name, institution, and outstanding balance due, preventing erroneous payments.
* **JUMO Interpretation**: Multi-tenant, secure Payment Reference Generator that exposes a standard lookup API (`resolveReference`) supporting dynamic validation, balance verification, and lock holds during checkout.
* **Target Product**: JUMO DIGITAL PAY
* **Target Domain**: Core Transaction Switch
* **Target Office**: Platform Operations Directorate -> Reference Authority Office
* **Target Module**: Payment Reference Engine (`DigitalPayService.ts`)
* **Target Workflow**: Generate Invoice (ERP) -> Register Reference -> Lookup Reference -> Process Collection -> Update Ledger -> Notify Payer.
* **Target Portal**: Customer Portal / Operator Console
* **Target Web Experience**: Reference lookup search tool displaying payment references, associated debtor details, merchant, and total balance due.
* **Target Mobile Experience**: Quick barcode/QR reference scanner and direct mobile pay buttons.
* **Implementation Status**: EXTRACTED -> DESIGNED -> IMPLEMENTED -> INTEGRATED -> VERIFIED
* **Verification Status**: VERIFIED (Supported in the `DigitalPayService` `resolveReference` and transaction flows)

---

## 2. BANK & MOBILE MONEY AGENT COLLECTION CHANNEL INTEGRATION
* **Source Product**: SchoolPay
* **Capability**: Multi-channel Payment Processing
* **Source Area**: Agent Banking / Mobile Money Gateway
* **Extracted Concept**: Standardized API endpoints allowing physical bank branches and telecom providers (MTN, Airtel) to submit payments using USSD or agent POS apps.
* **JUMO Interpretation**: Unified Channel Adapter that maps diverse raw API payloads from telecom switches and bank webhooks into JUMO's internal transactional format.
* **Target Product**: JUMO DIGITAL PAY
* **Target Domain**: Financial Integration
* **Target Office**: Gateway Integration Office
* **Target Module**: Multi-Channel Channel Controller
* **Target Workflow**: Channel Payload Received -> Decrypt -> Resolve Reference -> Perform Safety Checks -> Calculate Settlement Fees -> Commit Transaction -> Push Webhook to ERP.
* **Target Portal**: Partner Portal / Developer API Portal
* **Target Web Experience**: Real-time channel throughput dashboard, response latency graphs, and endpoint webhook simulator.
* **Target Mobile Experience**: Direct USSD simulator for checking student balances and completing payments.
* **Implementation Status**: EXTRACTED -> DESIGNED -> IMPLEMENTED -> INTEGRATED -> VERIFIED
* **Verification Status**: VERIFIED (Mapped within collection streams in Digital Pay)

---

## 3. SETTLEMENT BATCHES & COMMISSIONS DISTRIBUTOR
* **Source Product**: SchoolPay
* **Capability**: Transaction Settlements & Reconciliations
* **Source Area**: Clearing & Settlement Office
* **Extracted Concept**: Aggregating raw card/mobile money transaction funds daily, deducting processing commissions, and scheduling automated direct bank payouts (settlement batches) to merchant accounts.
* **JUMO Interpretation**: Automated settlement scheduler that calculates processing margins, credits JUMO Treasury with the 1.5% clearing fee, and bundles net payments into settlement batches.
* **Target Product**: JUMO DIGITAL PAY
* **Target Domain**: Core Accounting & Settlement
* **Target Office**: Clearing & Settlement Office
* **Target Module**: Settlement Engine
* **Target Workflow**: Daily Transaction Close -> Calculate Net Settlements -> Deduct JUMO Fees -> Generate Bank Clearing Batch -> Post to JUMO FAAP.
* **Target Portal**: Executive Portal / Merchant Control Center
* **Target Web Experience**: Settlement Batches tracker with payout statuses (PENDING, APPROVED, PAID), itemized transaction counts, and download links for Excel bank formats.
* **Target Mobile Experience**: Push alerts confirming daily payout completion and net payout summary.
* **Implementation Status**: EXTRACTED -> DESIGNED -> IMPLEMENTED -> INTEGRATED -> VERIFIED
* **Verification Status**: VERIFIED (Deducts 1.5% and links to FAAP subledgers)
