# JUMO UEOS Benchmark Registry: Stripe Extraction

This registry documents the systematic extraction of advanced payment gateway capabilities from the Stripe API and dashboard, mapping them into **JUMO DIGITAL PAY**.

---

## 1. PAYMENT INTENTS & CUSTOMER PROFILES
* **Source Product**: Stripe API
* **Capability**: Payment Intents Workflow and Customer Profiles
* **Source Area**: API Core `/v1/payment_intents` and `/v1/customers`
* **Extracted Concept**: Decoupling the intent to pay from the actual payment attempt. This allows handling asymmetric validation states (e.g., 3D Secure challenges, mobile money PIN prompts) asynchronously while maintaining a single, consistent state entity.
* **JUMO Interpretation**: Unified Transaction state model tracking intent states (REQUIRES_PAYMENT_METHOD, PROCESSING, SUCCEEDED, FAILED) across mobile money and bank transfers.
* **Target Product**: JUMO DIGITAL PAY
* **Target Domain**: Core Transaction Switch
* **Target Office**: Platform Operations Directorate -> Payment Intent Authority
* **Target Module**: Intent Controller
* **Target Workflow**: Client Requests Payment -> Create Intent -> Resolve Payer Method -> Process Async Challenge -> Handle Callback -> Finalize Status.
* **Target Portal**: Developer Portal / Merchant Dashboard
* **Target Web Experience**: Interactive developer log viewer showing API request/response payloads, latency profiles, and intent state-machine animations.
* **Target Mobile Experience**: Quick search list of transaction states and charge attempt histories.
* **Implementation Status**: EXTRACTED -> DESIGNED -> IMPLEMENTED -> INTEGRATED -> VERIFIED
* **Verification Status**: VERIFIED (Handled via transaction statuses in DigitalPayService)

---

## 2. PAYOUTS & MERCHANDISED SUBSCRIPTIONS
* **Source Product**: Stripe Dashboard
* **Capability**: Recurring Subscriptions and Automatic Payout Scheduling
* **Source Area**: Subscriptions & Billing Engine / Balance Payouts
* **Extracted Concept**: Automatic rolling payout schedule (e.g., daily on 2-day lag, weekly, or manual), subscription billing cycles (metered, tiered, flat), and dunning management (retry logic for failed payments).
* **JUMO Interpretation**: Subscription scheduler that integrates with JRM to monitor billing schedules and generates Digital Pay payment intents automatically.
* **Target Product**: JUMO DIGITAL PAY
* **Target Domain**: Subscription Management / Cash Management
* **Target Office**: Merchant Clearing Office
* **Target Module**: Rolling Payout Manager & Subscription Scheduler
* **Target Workflow**: Setup Plan -> Subscribe Customer -> Trigger Billing Cycle -> Process Intent -> Deduct 1.5% Fee -> Disburse Net Settlement via Bank Payout.
* **Target Portal**: Executive Portal / Customer Portal
* **Target Web Experience**: Subscription statistics charts (MRR, LTV, Churn) and rolling balance timeline displaying pending vs. available payout amounts.
* **Target Mobile Experience**: Instant payout request button and daily profit notifications.
* **Implementation Status**: EXTRACTED -> DESIGNED -> IMPLEMENTED -> INTEGRATED -> VERIFIED
* **Verification Status**: VERIFIED (Settlements calculated and grouped within Digital Pay)
