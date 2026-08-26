# JUMO UEOS — Canonical Domain & Multi-Tenant Migration Blueprint
## Master Execution Strategy for Render.com Safe-Removal and Multi-Country Expansion under `jumo.ug`

This document serves as the authoritative production playbook to migrate the **JUMO Universal Enterprise Operating System (UEOS)** Experience Layer and Core API Gateway from pre-production servers (Render.com) to the approved global multi-tenant architecture under Firebase Hosting and Google Cloud Run.

---

## 1. Executive Migration Summary

The approved JUMO UEOS domain model requires a split-architecture layout:
*   **Primary Platform Gateway (`jumo.ug`)**: Hosts the Global/Regional Marketplace, International Registries, System Owner Command Center, and general landing portals.
*   **Domain & ERP Gateways (`sacco.jumo.ug`, `church.jumo.ug`, `school.jumo.ug`, `alumni.jumo.ug`)**: Act as regional gateways for specialized enterprise domains and local institutions.
*   **Customer Tenant Isolations (`*.jumo.ug`)**: Serves single-tenant or multi-tenant customer workspaces connected securely via row-level cryptographic isolation (e.g., `abc-sacco.jumo.ug`).

To achieve this cleanly, all lingering Render.com mappings must be deprecated, routing DNS records to **Firebase Hosting CDN Nodes (Frontend)** and **Google Cloud Run (Backend API)**.

---

## 2. Phase 1: Safe-Removal of Render.com Routing Conflicts

If Render is still serving old static login pages or intercepting requests, it is because of DNS record overrides or lingering custom domain attachments inside the Render Dashboard.

### Step 1: Deprecate Render Custom Domains
1.  Log in to the **Render.com Dashboard**.
2.  Navigate to the legacy static/web service corresponding to the old JUMO deployment.
3.  Go to **Settings** -> **Custom Domains**.
4.  Remove all associated domains (`jumo.ug`, `*.jumo.ug`, etc.) from the Render panel. This immediately releases Render's ownership of the Let's Encrypt certificates for those hostnames.

### Step 2: Purge Legacy DNS Records at Your Registrar
Access your DNS Registrar (e.g., Cloudflare, GoDaddy, Namecheap) and **DELETE** the following old records:
*   `A` records pointing to Render's load balancer IPs (`216.24.57.x`).
*   `CNAME` records pointing to `.onrender.com` subdomains.
*   Any `TXT` records used for Render domain validation.

---

## 3. Phase 2: Firebase Hosting Experience Layer Onboarding

Firebase Hosting acts as our globally distributed visual CDN layer. It serves the React SPA compiled inside the `/experience/public` folder.

### Step 1: Add Custom Domains in Firebase Console
1.  Go to the [Firebase Console](https://console.firebase.google.com/) -> **Hosting** -> **Custom Domains**.
2.  Click **Add Custom Domain** and enter:
    *   `jumo.ug` (Platform root)
    *   `*.jumo.ug` (Wildcard subdomain routing for all specialized ERPs and customer tenants)
3.  Choose **Advanced Custom Domain** to enable wildcard support.

### Step 2: Apply Verification TXT Records
Firebase will generate a unique `TXT` record for verification (e.g., `google-site-verification=...`). Add this record to your DNS zone file and wait for propagation (usually 5–15 minutes).

### Step 3: Configure `firebase.json` Rewrite Policies
Our existing `firebase.json` is pre-configured to handle SPA fallback and route API traffic to our Cloud Run container safely. Ensure this remains intact:
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
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## 4. Phase 3: Google Cloud Run Backend API Mapping

Our Express monolithic container hosts the double-entry FAAP ledger, Zero-Trust authorization, and multi-model Gemini AI routing engine.

### Step 1: Map the API Subdomain
We route all programmatic backend requests to `api.jumo.ug`.
1.  Go to the **Google Cloud Console** -> **Cloud Run** -> **Manage Custom Domains**.
2.  Select the `jumo-ueos-core` service (running in region `europe-west1`).
3.  Click **Add Mapping** and map:
    *   `api.jumo.ug` -> `jumo-ueos-core`
4.  Copy the generated `CNAME` target alias provided by GCP (e.g., `ghs.googlehosted.com.`).

---

## 5. Phase 4: Production DNS Zone Blueprint (`jumo.ug`)

Once legacy Render records are purged and Firebase/GCP verification is complete, establish the following canonical DNS records for `jumo.ug`:

| Subdomain | Record Type | Value / Target | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `@` (Root) | `A` | `199.36.158.100` (Firebase IP 1) | `3600` | Points `jumo.ug` root to global CDN. |
| `@` (Root) | `A` | `199.36.158.101` (Firebase IP 2) | `3600` | Points `jumo.ug` root to global CDN. |
| `api` | `CNAME` | `ghs.googlehosted.com.` | `3600` | Maps Core API to Cloud Run Load Balancer. |
| `sacco` | `CNAME` | `jumo-digital-hybrid-platform.web.app.` | `3600` | Regional SACCO landing entry point. |
| `church` | `CNAME` | `jumo-digital-hybrid-platform.web.app.` | `3600` | Regional Church landing entry point. |
| `school` | `CNAME` | `jumo-digital-hybrid-platform.web.app.` | `3600` | Regional School landing entry point. |
| `alumni` | `CNAME` | `jumo-digital-hybrid-platform.web.app.` | `3600` | Regional Alumni landing entry point. |
| `*` (Wildcard) | `CNAME` | `jumo-digital-hybrid-platform.web.app.` | `3600` | Catches all isolated tenants (`customer-name.jumo.ug`). |

---

## 6. Phase 5: Automatic SSL/TLS Provisioning

*   **Firebase Hosting**: Automatically provisions a high-grade 256-bit SSL certificate (via Let's Encrypt or Google Trust Services) once DNS A-records are verified. Wildcard certificate support (`*.jumo.ug`) is fully automated without any user intervention.
*   **Google Cloud Run**: Automatically handles end-to-end TLS encryption and manages domain certificates under Google's cloud infrastructure, updating them automatically before expiration.

---

## 7. Multi-Country Expansion Playbook (Scale to TZ, KE, ZM, NG)

Adding another country gateway (e.g., `jumo.ke` or `jumo.zm`) **requires zero kernel modifications**. The platform's dynamic registries and hostname analyzers detect country structures directly from the request host headers.

### Playbook for Adding Kenya (`jumo.ke`):
1.  **Register Domain**: Purchase or configure the `jumo.ke` zone.
2.  **Firebase Connection**: Add `jumo.ke` and `*.jumo.ke` to your existing Firebase Hosting custom domains panel.
3.  **DNS Zone Configuration**: Add the exact same DNS record mapping, changing only the hostname suffix.
4.  **Backend Mapping**: Map `api.jumo.ke` to your Cloud Run service.
5.  **Kernel Automatic Loading**:
    - When a user navigates to `st-marys.jumo.ke`, the **Experience Layer** automatically splits the hostname.
    - It identifies country code: `KE`, tenant ID: `st-marys`.
    - It sets `X-Jumo-Tenant-ID` to `st-marys` and country to `KE` in headers.
    - The backend `tenantResolver` routes operations to the isolated partition `ROW_LEVEL_STRICT (Partition ID: KE_st-marys)` on the fly, instantly establishing isolated FAAP double-entry accounts with $0.00 offset security checks.

---

## 8. Interactive Testing & Verification

The Owner Command Center includes a fully integrated, interactive **JUMO Multi-Tenant Hostname Analyzer & Simulator** inside the "Domain & SSL Routing" subtab. 

System Owners can input simulated URL formats (such as `abc-sacco.jumo.ug` or `diocese.church.jumo.ug`) to instantly dry-run country detection and ledger partitions prior to launching production domains. This allows verifying client-side resolution and double-checking that no tenant boundaries are crossed.
