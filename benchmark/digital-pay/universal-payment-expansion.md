# JUMO UEOS Benchmark Registry: Universal Payment Expansion

This document outlines the architectural expansion of **JUMO DIGITAL PAY** to support diverse, pluggable financial switches (Pesapal, Flutterwave, Cellulant, Mobile Money, and global banking SWIFT/ACH networks) while strictly applying JUMO's 1.5% treasury clearing fee.

---

## 1. PLUGGABLE CHANNEL ADAPTERS (GATEWAY ABSTRACTION)
Instead of hardcoding a specific gateway provider, JUMO DIGITAL PAY implements a **Gateway Abstraction Layer** (`PaymentChannelAdapter`). This allows tenants to configure their preferred integration endpoints dynamically based on geographic constraints.

```
                  ┌──────────────────────────────┐
                  │      JUMO DIGITAL PAY        │
                  │  (Core Settlement Switch)    │
                  └──────────────┬───────────────┘
                                 │
                   ┌─────────────┴─────────────┐
                   ▼                           ▼
        ┌─────────────────────┐     ┌─────────────────────┐
        │  Mobile Money (USSD)│     │  Global Cards & Bank│
        └──────────┬──────────┘     └──────────┬──────────┘
                   │                           │
         ┌─────────┴─────────┐       ┌─────────┴─────────┐
         ▼                   ▼       ▼                   ▼
     MTN MM / Airtel     Cellulant  Flutterwave / Adyen / Stripe
```

### Supported Adapter Implementations
1. **Telco Mobile Money Switch (USSD/SIM ToolKit)**: Direct integrations with MTN Mobile Money and Airtel Money API. Handles push SMS notifications and PIN authorization challenges.
2. **Aggregator Adaptors (Flutterwave / Pesapal / Cellulant)**: Simplifies multi-currency African card and wallet processing.
3. **Card acquiring Networks (Stripe / Adyen)**: Enterprise Visa, MasterCard, and ACH processing.

---

## 2. JUMO MASTER TREASURY ROUTING (1.5% FEE SPLITTING)
Every collection processed through JUMO DIGITAL PAY must enforce the 1.5% clearing fee rules.

* **Formula**:
  $$\text{Gross Amount} = \text{Transaction Value}$$
  $$\text{JUMO Settlement Fee} = \text{Gross Amount} \times 0.015$$
  $$\text{Net Settlement (Merchant Payout)} = \text{Gross Amount} - \text{JUMO Settlement Fee}$$

* **Universal Ledger Routing (ACDOCA Posting Rules)**:
  For a gross payment of 1,000,000 UGX collected via Mobile Money:
  
  | Debit Account Code | Debit Account Name | Credit Account Code | Credit Account Name | Amount | Memo |
  | :--- | :--- | :--- | :--- | :--- | :--- |
  | **1010** | Cash at Bank (JUMO Clearing) | **2010** | Accounts Payable (Merchant Share) | 985,000 | Payout Balance due to Merchant |
  | **1010** | Cash at Bank (JUMO Clearing) | **4020** | Fee Revenue (JUMO Treasury) | 15,000 | 1.5% JUMO Processing Settlement Fee |

* This double-entry allocation ensures that JUMO's treasury is credited automatically in real-time, preventing reconciliation issues on final settlement closeout.
