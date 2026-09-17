# JUMO_APPLICATION_ASSEMBLY_BLUEPRINT (v2.0)

## 1. VISION
Jumo is a Universal Enterprise Platform assembled from complete, mature, open-source applications. It provides a unified shell, identity layer, and orchestration engine around production-grade systems, preserving their full capabilities and native UIs.

## 2. ASSEMBLY ARCHITECTURE
Jumo is structured as a **Multi-Service Integration Platform**:

### A. Universal Shell (React/Vite)
- **Role**: Provides the global navigation, tenant switching, application launcher, and unified notifications.
- **Tech**: React 18, Tailwind CSS, Lucide Icons.
- **Integration**: Wraps or deep-links to foundational applications.

### B. Identity Layer (Keycloak)
- **Role**: Source of truth for users, roles, and SSO.
- **Integration**: All applications are configured as OIDC/SAML clients of Keycloak.

### C. Tenant Registry (PostgreSQL)
- **Role**: Orchestrates multi-tenancy. Tracks which applications are enabled for which tenant and their respective service URLs.

### D. Foundational Applications (The "Engines")
- **ERPNext / Frappe**: Enterprise Accounting, HR, Inventory, Manufacturing.
- **Apache Fineract / Mifos X**: Core Banking, SACCO, Lending.
- **Kill Bill**: Subscriptions and Billing.
- **Hyperswitch**: Payment Orchestration.
- **Gibbon**: Education Management.
- **ChurchCRM**: Faith Organization Management.
- **Tendenci**: NGO/Association Management.
- **Keycloak**: Identity & Access Management.
- **OpenMRS / Bahmni**: Healthcare & Hospital Management.
- **OSPOS**: Point of Sale & Retail.
- **Fleetbase**: Logistics & Fleet Management.
- **farmOS**: Agriculture Management.

## 3. INTEGRATION STRATEGY
### No Reimplementation
Applications are NOT translated into TypeScript. They are deployed as their native services (Python/Frappe, Java/Spring, PHP, Rust, etc.).

### UI Preservation
The native UIs of ERPNext, Fineract, Gibbon, etc., are preserved. Jumo provides a "Shell" that facilitates seamless movement between these interfaces.

### Cross-App Data Flow
- **API-First**: Data exchange occurs via REST/GraphQL APIs.
- **Event-Driven**: Asynchronous updates (e.g., Loan → Ledger) use a shared message broker.

## 4. DEPLOYMENT & ORCHESTRATION
- **Containerization**: Each application runs in its own Docker container.
- **Orchestration**: Kubernetes or Docker Compose (for smaller scale) manages the lifecycle of the entire Jumo stack.
- **Reverse Proxy**: Nginx handles SSL termination and routing (e.g., `tenant-a.jumo.ug/accounting` -> ERPNext).

## 5. RECOVERY & ASSEMBLY SEQUENCE
1. **Archive**: Complete workspace state preserved. [COMPLETED]
2. **Acquire**: Complete application repositories fetched. [IN PROGRESS]
3. **Verify**: License, Build, and UI confirmed. [IN PROGRESS]
4. **Integrate**: Configure SSO and API bridges.
5. **Reset**: Remove obsolete scratch code.
6. **Assemble**: Deploy the unified Jumo platform.

---
**STATUS: DISCOVERY & ACQUISITION PHASE.**
**NO REBUILDING. ONLY ASSEMBLY.**
