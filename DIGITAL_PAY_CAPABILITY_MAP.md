# JUMO Digital Pay Capability Map

## 1. Platform Vision
JUMO Digital Pay (`PROD_DP`) is a high-throughput payment switch and settlement engine. It benchmarks SchoolPay's educational fee collection workflows while expanding into a multi-channel payment gateway for merchants, utility providers, dioceses, and government agencies.

---

## 2. Core Payment Capability Architecture

```
                                  ┌──────────────────────────┐
                                  │   PAYMENT CHANNELS       │
                                  │ Mobile Money (MTN/Airtel)│
                                  │ Bank Branches & Cards    │
                                  │ Agent POS Terminals      │
                                  └─────────────┬────────────┘
                                                │
                                                ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              JUMO DIGITAL PAY SWITCH                                   │
├───────────────────────────────────────┬────────────────────────────────────────────────┤
│ 1. Student Payment Code Ref Generator │ 2. Omni-Channel Ingress Handler                │
├───────────────────────────────────────┼────────────────────────────────────────────────┤
│ 3. Fraud Sentinel & Risk Filter       │ 4. Real-Time Student Ledger Posting            │
└───────────────────────────────────────┴────────────────────────────────────────────────┘
                                                │
                                                ▼
                                  ┌──────────────────────────┐
                                  │ SPLIT SETTLEMENT ENGINE  │
                                  ├──────────────────────────┤
                                  │ 98.5% -> Institution Bank│
                                  │  1.5% -> JUMO Treasury  │
                                  └──────────────────────────┘
```

---

## 3. Detailed Capability Specifications

### A. Student Payment Reference Generator (`DP_MOD_REFGEN`)
- Generates 10-digit checksum-verified payment reference codes linked directly to student registration numbers and fee ledgers.
- Enables parents to pay at any bank branch or mobile money USSD menu by entering the reference code without needing the school's bank account number.

### B. Tuition Fee Collector (`DP_MOD_TUITION`)
- Supports termly fee structures, mandatory tuition items, optional boarding/transport items, and bursary/scholarship discounts.
- Supports partial fee payments, enforcing minimum thresholds where required by institution policy.

### C. Split Settlement & Treasury Clearing Engine (`DP_MOD_SETTLEMENT`)
- Automatically splits every incoming payment:
  - **98.5%** credited directly to the institution's designated bank account.
  - **1.5%** credited to the JUMO Master Treasury Fee Revenue account (`FAAP_BK_27`).
- Executes end-of-day automated bank clearing and settlement reconciliations.

### D. Agent POS Terminal Hub (`DP_MOD_POS`)
- Manages field POS agent terminals for school canteens, parish offices, and remote tuition payment collection points.
- Provides real-time thermal receipt printing protocols and offline transaction queuing.

### E. Mobile Money Switch Integration
- Native API connectors for MTN Mobile Money (MoMo API) and Airtel Money.
- Instant STK Push prompts sent directly to parent mobile handsets upon fee invoice issuance.
