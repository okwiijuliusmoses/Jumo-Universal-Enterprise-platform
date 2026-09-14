# JUMO_APPLICATION_INTEGRATION_MAP

This document maps the integration points between foundational applications and the Jumo platform. It defines how data flows, how identity is synchronized, and how the applications are orchestrated.

---

## 1. IDENTITY & AUTHENTICATION (SSO)
- **Central IdP**: Keycloak
- **Protocols**: OIDC (OpenID Connect), SAML 2.0
- **Integration**:
    - **ERPNext**: OAuth2 Social Login plugin configured to use Keycloak.
    - **Fineract**: OAuth2 / JWT configuration in Spring Security.
    - **Hyperswitch**: JWT-based authentication via Keycloak.
    - **PHP Apps (Gibbon/ChurchCRM)**: OIDC client integration (via `php-openid-connect`).

## 2. DATA SYNCHRONIZATION (ETL/Events)
- **Message Broker**: RabbitMQ or Apache Kafka (depending on load requirements).
- **Patterns**:
    - **Fineract → ERPNext**: When a loan is disbursed in Fineract, a corresponding Journal Entry is created in ERPNext via API.
    - **Kill Bill → Hyperswitch**: Kill Bill triggers payment requests to Hyperswitch via its Payment Plugin API.
    - **Hyperswitch → Kill Bill**: Payment success/failure webhooks from Hyperswitch update Kill Bill invoice status.

## 3. TENANT REGISTRY & ROUTING
- **Jumo Registry**: A central database (PostgreSQL) tracking:
    - Tenant ID
    - Subdomain/URL
    - Enabled Applications
    - Service Endpoints
- **Routing**: Jumo Shell uses the Registry to route users to the correct application instance.

## 4. SHARED ANALYTICS
- **Universal Reporting**: A shared Data Warehouse (PostgreSQL/ClickHouse) aggregating data from:
    - ERPNext (Accounting)
    - Fineract (Lending)
    - Kill Bill (Revenue)
- **Tooling**: Metabase or Apache Superset integrated into the Jumo Shell.

---

## INTEGRATION BOUNDARY CHART

| App A | App B | Integration Type | Description |
| :--- | :--- | :--- | :--- |
| **Keycloak** | **All Apps** | OIDC/SAML | Single Sign-On |
| **Fineract** | **ERPNext** | REST API | Financial Consolidation |
| **Kill Bill** | **Hyperswitch** | Webhooks | Payment Processing |
| **Gibbon** | **Fineract** | REST API | School Fee Lending |
| **ERPNext** | **Fleetbase** | API | Delivery Fulfillment |

**STATUS: MAPPING IN PROGRESS.**
