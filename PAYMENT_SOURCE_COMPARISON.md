# PAYMENT SOURCE COMPARISON

Comparing mature payment systems to define the Jumo Payment Switch.

| Feature | Hyperswitch (Rust/Node) | Kill Bill (Payment) | Stripe (Reference) | Jumo Target |
| :--- | :--- | :--- | :--- | :--- |
| **Routing** | Smart routing engine. | Basic plugin routing. | Internal proprietary. | **Hyperswitch Logic**: Rule-based routing (e.g. use MTN for < 50k, Airtel for > 50k). |
| **Connectors** | 120+ (Global focus). | Java plugins. | Proprietary. | **Hyperswitch Pattern**: Clean Connector interface for East African Mobile Money. |
| **Reconciliation** | Built-in recon tool. | External integration. | Dashboard recon. | **Jumo-Native**: Automatic match between `PaymentIntent` and `GL_Entry`. |
| **Idempotency** | Highly robust (Redis/DB). | Service-level. | Industry Standard. | **Stripe/Hyperswitch Model**: SHA-256 hash of `tenant:ref` as primary key. |

## Jumo Payment Strategy
Jumo will implement the **Hyperswitch Router/Scheduler architecture** using Node.js. This ensures that the platform can scale to millions of concurrent transactions while remaining provider-agnostic.
