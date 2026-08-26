# Universal Payment Capability Matrix

This matrix compares core platform components across major observed global and regional payment gateways.

| Capability / Module | SchoolPay | Stripe | Flutterwave | PesaPal | Cellulant / Tingg | Adyen | Universal Requirement |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Mobile Money Push / Pull** | Yes | No | Yes | Yes | Yes | No | **Regional Core (East Africa)** |
| **Credit Card processing** | No | Yes | Yes | Yes | No | Yes | **Global Standard** |
| **Intelligent Routing** | No | Yes | Yes | No | Yes | Yes | **Switch Core Capability** |
| **Split Commissions API** | Yes | Yes | Yes | Yes | Yes | Yes | **Universal Merchant Core** |
| **Webhook Event processing**| Yes | Yes | Yes | Yes | Yes | Yes | **Universal Integration Core**|
| **Multi-currency FX Engine** | No | Yes | Yes | No | Yes | Yes | **Enterprise Core** |
| **Point of Sale POS Swipe** | No | Yes | No | Yes | No | Yes | **Template-Specific (Hospitality/Retail)**|
| **Bill Presentment API** | Yes | No | No | No | Yes | No | **Template-Specific (Utility/School)**|

---

## Strategic Universal Design Pattern
To build a truly modular and sovereign gateway in JUMO Digital Pay, the system must abstract providers behind custom Adapters:
1.  **Uniform Transaction Intent:** High-level APIs must abstract payment intents so that calling applications can simply invoke `processCollection()` without knowing whether the underlying channel uses card processing, bank transfer, or telecom mobile money networks.
2.  **Autonomous Settlement Switch:** Real-time collection pools automatically accrue gross amounts, allocate 1.5% commission splits to JUMO central revenue, and disburse net merchant payouts dynamically during end-of-day batch runs.
3.  **Strict Verification Ledgering:** Any collection success must immediately execute a double-entry balance check and post to FAAP journals, ensuring perfect accounts reconciliation.
