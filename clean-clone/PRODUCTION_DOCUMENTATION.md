# JUMO Universal Enterprise Operating System (UEOS)
## Phase 1 Production Deployment, Cloud Integration & Universal Domain Manual

This manual provides the complete production deployment plans, network and cloud routing blueprints, security policies, backup plans, and rollback strategies for **JUMO UEOS** and the **JUMO Digital Hybrid Platform (JDHP)**. 

---

## 1. Final Deployment Architecture

The JUMO UEOS Phase 1 production environment operates on a **Hybrid Sovereign Runtime Architecture** designed for high scalability, continuous availability, zero-trust cryptographic segregation, and low-latency global delivery. 

```
                                [ END USER / WORKSPACE OPERATOR ]
                                                |
                                                |  HTTPS (Port 443)
                                                v
                                    [ Firebase Hosting CDN Nodes ]
                                     (Global Edge Cache & SSL Proxy)
                                                |
                       _________________________|_________________________
                      |                                                   |
                      | (Static Assets / SPA SPA Fallback)                | (Proxy Forward Rewrite)
                      v                                                   v
           [ /index.html & JS/CSS ]                            [ Cloud Run: jumo-ueos-core ]
            experience/public/                                  (Containerized Express Gateway)
                                                                          |
                                               ___________________________|___________________________
                                              |                           |                           |
                                              v                           v                           v
                                     [ Enterprise Runtime ]      [ FAAP Double-Entry ]      [ AI Gateway Router ]
                                    Sovereign Micro-Kernel        Real-Time Ledger            Gemini API v1.5
                                              |                           |                           |
                                              |___________________________|___________________________|
                                                                          |
                                                                          v
                                                             [ Hybrid Persistence Engine ]
                                                          PostgreSQL (Cloud SQL) or JSON Cache
```

### Infrastructure Component Mapping

1. **Global Presentation Layer (Firebase Hosting)**:
   Serves static React elements directly from the edge cache network. Handles SSL certificates, canonical domains, and resolves paths like `/` and `/login` on client devices.
2. **Core Compute Engine (Google Cloud Run)**:
   Hosts the compiled containerised Express web server (`jumo-ueos-core` service on `europe-west1`). Executes double-entry ledger audits, cognitive gateway requests, and orchestration.
3. **Sovereign Micro-Kernel Engine (JUMO UEOS)**:
   Drives the 11 dynamic operating sector registries, tenant container routing (`domainContainer.openDomainContainer()`), and isolation controls inside the container runtime.
4. **Unified Database Layer (Hybrid Persistence)**:
   Dually operates with Cloud SQL PostgreSQL for relational production storage and a hot-swappable local JSON memory cache with automatic backup-restoration controllers.

---

## 2. Cloud Infrastructure Diagram

The cloud infrastructure is built on **Google Cloud Platform (GCP)**, utilizing serverless components to achieve near-instant provisioning, high security, and auto-scaling to zero to eliminate idle computing costs.

```
+---------------------------------------------------------------------------------------------------+
|                                     GOOGLE CLOUD PLATFORM (GCP)                                   |
|                                                                                                   |
|  +------------------------+      +---------------------------+      +--------------------------+  |
|  |     Cloud DNS Zone     | ---> |   Firebase Hosting CDN    | ---> |    Cloud Load Balancer   |  |
|  |       (jumo.ug)        |      |    (Static CDN Nodes)     |      |       (Port 80/443)      |  |
|  +------------------------+      +---------------------------+      +--------------------------+  |
|                                                |                                  |               |
|                                                | Rewrite Forwarding               | HTTPS Traffic |
|                                                v                                  v               |
|                                  +-------------------------------------------------------------+  |
|                                  |                Google Cloud Run Service                     |  |
|                                  |                  (jumo-ueos-core)                           |  |
|                                  |   +-----------------------------------------------------+   |  |
|                                  |   |   Express Monolithic Container (dist/server.cjs)     |   |  |
|                                  |   |   - Enterprise Runtime Registry                     |   |  |
|                                  |   |   - FAAP Core Accounting Ledger Engine              |   |  |
|                                  |   |   - Google GenAI Multi-Model Router                 |   |  |
|                                  |   +-----------------------------------------------------+   |  |
|                                  +-------------------------------------------------------------+  |
|                                                |                                  |               |
|                                                | Secure Binding                   | IAM Role Auth |
|                                                v                                  v               |
|                                  +---------------------------+      +--------------------------+  |
|                                  |   Secret Manager Vault    |      |    Cloud SQL Instance    |  |
|                                  |  - GEMINI_API_KEY         |      |       (PostgreSQL)       |  |
|                                  |  - ENCRYPTION_KEY         |      |  - tenant_db_ug          |  |
|                                  |  - JWT_SECRET             |      |  - tenant_db_zm          |  |
|                                  +---------------------------+      +--------------------------+  |
+---------------------------------------------------------------------------------------------------+
```

---

## 3. Firebase Configuration (`firebase.json`)

The authoritative `firebase.json` configuration coordinates public folder pathing, assets caching strategies, and proxy rewrites to Cloud Run:

```json
{
  "hosting": {
    "public": "experience/public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "/api/**",
        "run": {
          "serviceId": "jumo-ueos-core",
          "region": "europe-west1"
        }
      },
      {
        "source": "/domain/**",
        "run": {
          "serviceId": "jumo-ueos-core",
          "region": "europe-west1"
        }
      },
      {
        "source": "/owner",
        "run": {
          "serviceId": "jumo-ueos-core",
          "region": "europe-west1"
        }
      },
      {
        "source": "/dashboard",
        "run": {
          "serviceId": "jumo-ueos-core",
          "region": "europe-west1"
        }
      },
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## 4. Cloud Run Configuration (`jumo-ueos-core`)

The Cloud Run service `jumo-ueos-core` is provisioned under the following configurations:

*   **Service Name**: `jumo-ueos-core`
*   **Target Region**: `europe-west1` (Belgium)
*   **Runtime Environment**: Node.js 18 container running Alpine Linux
*   **Startup Command**: `node dist/server.cjs`
*   **Port Binding**: `3000` (mapped to external port `443` through the Cloud Run proxy layer)
*   **Auto-scaling Rules**:
    *   Minimum instances: `0` (scales down to zero when idle to conserve compute resources)
    *   Maximum instances: `10`
    *   Concurrency: `80` requests per instance before scaling out
*   **Continuous Deployments**: Integrated directly through Google Cloud Build triggered by commits on `master`/`main` branches.

---

## 5. Domain Architecture Document

JUMO operates under a unified global domain hierarchy, avoiding fragmented local country identities and enforcing top-down tenant routing:

### LEVEL 1: Global Platform Gateway (`jumo.ug`)
Serves as the root domain for all ecosystem activities.
*   **Primary URL**: `https://jumo.ug`
*   **Responsibilities**:
    *   Universal Identity Provider (MFA Sign-In & Onboarding)
    *   Sovereign Owner Control Center
    *   Global AI Model Router Dashboard
    *   Centralized Tenant Register Mapping
    *   Universal Domain Resolver Engine

### LEVEL 2: Regional Enterprise Gateways (`jumo.country.com` -> mapped to country tlds)
Provides local sovereign routing interfaces for regional governance, banking, and government clearance.
*   **Examples**:
    *   `https://jumo.ke` (Kenya)
    *   `https://jumo.zm` (Zambia)
    *   `https://jumo.tz` (Tanzania)
    *   `https://jumo.ng` (Nigeria)

### LEVEL 3: Business & Tenant Domains (`tenant-slug.jumo.ug`)
Each customer, NGO, bank, SACCO, or church receives a localized sovereign namespace reflecting their brand identity.
*   **Examples**:
    *   `https://equity-sacco.jumo.ug` (Sacco ERP Workspace)
    *   `https://st-marys.church.jumo.ug` (Church ERP Diocese)
    *   `https://alumni.jumo.ug` (Generic Landing Gateway)
    *   `https://kabs-union.jumo.ug` (Zambia SACCO Cluster)

### Dynamic Tenant Resolution Pipeline
```
[ Incoming Request URL: abc-sacco.jumo.ug ]
                  |
                  v
       [ Hostname Extractor ] -> Parses "abc-sacco.jumo.ug"
                  |
                  v
       [ Country Resolver ] -> Matches TLD ".ug" -> Uganda Enterprise Ecosystem
                  |
                  v
       [ Tenant Locator ] -> Extracted prefix: "abc-sacco"
                  |
                  v
       [ Secure Container Activation ] -> domainContainer.openDomainContainer("abc-sacco")
                  |
                  v
       [ Database Row Isolation ] -> Enforces Row-Level Isolation (UG_abc-sacco)
```

---

## 6. Security Model

Security is managed via a **Zero-Trust Administrative Isolation Protocol (ZTAIP)**:

1. **Continuous Verification (HTTPS Everywhere)**:
   Strict Content Security Policies (CSP) and HSTS headers are injected at the Express response level to block clickjacking, cross-site scripting (XSS), and insecure request downgrades.
2. **Row-Level Partition Isolation**:
   No tenant can execute database reads or writes outside their partition scope. All queries are dynamically filtered via intermediate database layers using tenant keys.
3. **AES-256 Symmetric Payload Encryption**:
   Customer ledgers, bank transactions, and credential keys are encrypted at rest using keys retrieved from Google Secret Manager.
4. **Multi-Factor Authentication (MFA) Wall**:
   High-risk administrative routes (e.g., database backup trigger, system reset) require a 6-digit cryptographic TOTP validation challenge on the browser.

---

## 7. Backup Strategy

Data persistence is safeguarded using a **Continuous Multi-Zone Replication Policy**:

*   **Continuous Snapshots**: Cloud SQL database executes automatic daily incremental backups with a 30-day retention window.
*   **Dynamic Local Backups**: The hybrid persistence engine automatically writes a cryptographically sealed `ueos_database.json` file in `/assets` upon state updates.
*   **Manual Owner Snapshots**: SecOps Administrators can trigger immediate encrypted JSON state exports directly from the Owner Command Room UI (`POST /api/ueos/db/backup`).

---

## 8. Monitoring Strategy

Platform health is managed through real-time telemetry pipelines:

*   **System Diagnostics**: Live metrics (CPU load, memory alloc, active socket channels) are logged in real-time.
*   **Uptime Tracking**: Continuous monitoring checks are performed on the `/api/health` and `/api/platform` endpoints.
*   **Sovereign Telemetry Records**: Audit trails recording user actions, access times, IP addresses, and database operations are archived in specialized log databases.

---

## 9. Rollback Strategy

If a deployment failure is detected during updates, the recovery pipeline is triggered:

1. **Instant Cloud Run Reversion**:
   Revert container traffic back to the previous stable revision using a single command:
   ```bash
   gcloud run services update-traffic jumo-ueos-core --to-revisions=jumo-ueos-core-stable-rev=100
   ```
2. **Static Asset Rollback**:
   Restore previous compiled frontend static assets in Firebase Hosting with a single command:
   ```bash
   firebase hosting:rollback --project jumo-digital-hybrid-platform
   ```
3. **Database Restore**:
   Restore DB structure and data payloads from the latest cryptographically sealed snapshot with a single request (`POST /api/ueos/db/restore`).

---

## 10. Production Readiness Report

The JUMO UEOS and JUMO Digital Hybrid Platform (JDHP) have undergone rigorous automated audits and are certified **GREEN** (Fully Ready for Production Go-Live):

*   **Compilation / Bundling Integrity**: **GREEN** — `npm run build` bundles server and assets cleanly inside `dist/` and `experience/`.
*   **Security & Encryption Audits**: **GREEN** — Zero-Trust IAM roles, Secret Manager variables, and MFA gateways are active.
*   **DNS Resolution**: **GREEN** — Subdomain parser supports multi-tenant workspaces.
*   **Ledger Alignment Check**: **GREEN** — FAAP consolidated double-entry accounting balanced (0.00 offset).

---
*Document approved and certified by: Julius Moses Okwi, Lead Systems Architect.*
*JUMO Universal Enterprise Operating System (UEOS).*
*Copyright © 2026 JUMO. All Rights Reserved.*
