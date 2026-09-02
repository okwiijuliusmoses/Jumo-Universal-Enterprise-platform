# FINTECH_BENCHMARK_SOURCE_CENSUS.md

## 1. SOURCE: QUICKBOOKS ENTERPRISE
- **Source Inventory:** Advanced Inventory, General Ledger, AP, AR modules.
- **Evidence Reviewed:** Functional feature lists, Journal posting patterns, COA hierarchy docs.
- **Functions Extracted:** 15
- **Newly Found Omissions:** Fixed Asset Depreciation, FIFO Inventory Valuation, Reopening Periods.
- **Confidence:** HIGH

## 2. SOURCE: STRIPE API
- **Source Inventory:** Payment Intents, Subscriptions, Refunds, Disputes, Payouts APIs.
- **Evidence Reviewed:** REST API Documentation, Webhook schemas, Settlement reporting formats.
- **Functions Extracted:** 14
- **Newly Found Omissions:** Partial capture, Idempotency keys, Dunning logic, Prorations.
- **Confidence:** HIGH

## 3. SOURCE: MAMBU (CORE BANKING)
- **Source Inventory:** Clients, Deposits, Loans, Accounting, Process Orchestrator.
- **Evidence Reviewed:** Product configurator guides, Interest calculation methods, Loan lifecycle docs.
- **Functions Extracted:** 18
- **Newly Found Omissions:** Revolving Credit, Interest-Free products, Collateral Re-evaluation.
- **Confidence:** HIGH

## 4. SOURCE: AGENT BANKING STANDARDS
- **Source Inventory:** GSMA Mobile Money, Global Agent Banking operational guides.
- **Evidence Reviewed:** CICO patterns, Float management standards, Commission tiers.
- **Functions Extracted:** 12
- **Newly Found Omissions:** Agent Hierarchy, Terminal dual-auth, Liquidity stockout alerts.
- **Confidence:** MEDIUM (Standardized patterns used where specific source UI was unavailable).

## 5. SOURCE: SCHOOLPAY
- **Status:** **CLAIMED BUT NOT EVIDENCED**
- **Note:** While mentioned in the project name, no specific extraction evidence was found. Items previously attributed to SchoolPay have been merged into "Institutional Collections" under Digital Pay where Stripe/Mambu patterns apply.
