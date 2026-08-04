# JUMO Universal Enterprise Operating System (UEOS) Deployment Manual
## Master Blueprint for Local, Firebase, and Cloud Run Environments

This guide provides exhaustive step-by-step deployment instructions for the JUMO UEOS Digital Hybrid Platform (JDHP). JUMO UEOS uses a hybrid, multi-tenant architecture consisting of an Express backend (authoritative for double-entry ledgers, AI router gateways, workflows, and threat detection) and a React SPA frontend (serving as the visual control console).

---

## 1. System Architecture & Prerequisites

### Architecture Overview
*   **Frontend**: React (Vite, Tailwind CSS V4, Lucide Icons, and Motion transitions).
*   **Backend Server**: Node.js & Express (Zero-Trust RBAC, FAAP Ledger, Cryptographic Tenant Isolation, and Gemini AI Gateway).
*   **Database & Storage**: Custom `JUMODBEngine` coexisting with Firebase adapters (Authentication, Firestore, and Cloud Storage).
*   **Production Bundle**: Single bundled CommonJS file `dist/server.cjs` compiled via `esbuild`.

### Required Software
*   Node.js (v18.x or later)
*   npm (v9.x or later)
*   Firebase CLI (for Firebase deployments)
*   Google Cloud SDK / `gcloud` CLI (for Cloud Run deployments)

---

## 2. Local Development & Configuration

### Step 1: Environment Setup
Clone the repository and copy the environment template to create your secure `.env` configuration file:
```bash
cp .env.example .env
```

Modify the parameters inside `.env` to include your service credentials:
```env
# Required for cognitive AI gateway
GEMINI_API_KEY=AIzaSyYourGeminiApiKeyHere

# Encryption key (32-character) for AES-256 tenant-isolated data
SECURE_ENCRYPTION_KEY=jumo_ueos_default_aes_256_key_32
ENCRYPTION_KEY=jumo_ueos_default_aes_256_key_32

# Production Webhook Signature keys
PAYMENT_SIGNING_SECRET=jumo_secret_signing_key_aegis_2026
```

### Step 2: Build Dependencies
Install npm dependencies for both frontend and backend operations:
```bash
npm install
```

### Step 3: Run local Dev Server
Launch the development server. By default, it runs on port `3000` under `0.0.0.0` (required for correct container mapping and reverse-proxies):
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

---

## 3. Firebase Deployment (Client & Storage Platform)

Firebase provides global CDN Hosting, scalable Authentication (MFA & Google Login), Firestore persistence, and Cloud Storage.

### Step 1: Provision Firebase Resources
1.  Go to the [Firebase Console](https://console.firebase.google.com/) and click **Add Project**.
2.  Name the project (e.g. `jumo-ueos-prod`) and enable Google Analytics if desired.
3.  In the project sidebar:
    *   Enable **Authentication** and activate the **Google** sign-in provider.
    *   Enable **Cloud Firestore** in production mode, selecting your target data region.
    *   Enable **Cloud Storage** with default secure rules.

### Step 2: Generate Client Configuration
Create or download your client configuration parameters. These must be placed inside the project root as `/firebase-applet-config.json` with the following structure:
```json
{
  "apiKey": "AIzaSyYourActualFirebaseApiKey",
  "authDomain": "your-project-id.firebaseapp.com",
  "projectId": "your-project-id",
  "storageBucket": "your-project-id.appspot.com",
  "messagingSenderId": "your-sender-id",
  "appId": "your-app-id",
  "firestoreDatabaseId": "(default)"
}
```

### Step 3: Authenticate and Initialize CLI
Log in to your Firebase account using the Firebase CLI:
```bash
firebase login
```

Verify your project aliases inside `.firebaserc` match your provisioned project:
```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

### Step 4: Configure Security Rules
Before deploying, make sure that `/firestore.rules` is updated with hardened security structures to protect multi-tenant paths. Deploy the security rules:
```bash
firebase deploy --only firestore:rules
```

### Step 5: Build and Deploy Static Assets
Compile the React frontend application into the target distribution directory (`experience/public`):
```bash
npm run build
```

Deploy the static bundle and rewrite definitions to Firebase Hosting:
```bash
firebase deploy --only hosting
```

---

## 4. Google Cloud Run Deployment (Backend Server)

Google Cloud Run hosts the compiled Express monolithic container, offering automatic scale-to-zero capabilities and TLS termination.

### Step 1: Containerize JUMO UEOS
Make sure you have a `Dockerfile` at the root of the project. A standardized container configuration for JUMO UEOS is as follows:
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package descriptors and install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy compiled backend bundle and frontend public assets
COPY dist ./dist
COPY experience ./experience

# Expose port and bind startup script
EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "dist/server.cjs"]
```

### Step 2: Build and Deploy to Cloud Run
Run the standard Google Cloud SDK command to build the container image using Cloud Build and deploy it to Cloud Run:
```bash
gcloud run deploy jumo-ueos-core \
  --source . \
  --port 3000 \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated
```

### Step 3: Secure Environment Variables
For production systems, do not inject secrets via plain-text environment flags. Always store production tokens (`GEMINI_API_KEY`, `SECURE_ENCRYPTION_KEY`) in **Google Cloud Secret Manager** and map them to Cloud Run environment variables.

---

## 5. Verification Checklists

To verify the integrity and correctness of your deployment, execute the local audit workflow:
```bash
# 1. Verify compilation and bundling
npm run build

# 2. Run system-wide linter audits
npm run lint

# 3. Execute all unit and integration test suites
npm run test
```

For diagnostic logs or active server troubleshooting, access the telemetry logs in the GCP console under Cloud Logging or view container status outputs directly.

---

## 6. Multi-Tenant Domain Mappings & DNS Configurations

To support the JUMO UEOS multi-tenant architecture, the DNS records must be configured to route subdomains (`sacco.jumo.ug`, `church.jumo.ug`, etc.) and dynamic tenant nodes (`*.jumo.ug`) to their respective frontend endpoints, and route backend requests (`api.jumo.ug`) to your Cloud Run gateway.

### DNS Zone Records (`jumo.ug`)

Add the following DNS resource records at your Domain Registrar (e.g., Cloudflare, GoDaddy, Namecheap):

| Host / Subdomain | Record Type | Value / Destination | TTL | Description |
| :--- | :--- | :--- | :--- | :--- |
| `@` (Root) | `A` | `199.36.158.100` (or Firebase Hosting IP) | `3600` | Points `jumo.ug` root to Firebase Hosting CDN node 1. |
| `@` (Root) | `A` | `199.36.158.101` (or Firebase Hosting IP) | `3600` | Points `jumo.ug` root to Firebase Hosting CDN node 2. |
| `api` | `CNAME` | `jumo-ueos-core-xxxxx-ew.a.run.app.` | `3600` | Routes core API request traffic directly to Cloud Run. |
| `sacco` | `CNAME` | `jumo-digital-hybrid-platform.web.app.` | `3600` | Routes Zambia / Global SACCO ERP to Firebase Hosting. |
| `church` | `CNAME` | `jumo-digital-hybrid-platform.web.app.` | `3600` | Routes Diocesan Church ERP portal to Firebase Hosting. |
| `school` | `CNAME` | `jumo-digital-hybrid-platform.web.app.` | `3600` | Routes Education & Tuition ERP portal to Firebase Hosting. |
| `alumni` | `CNAME` | `jumo-digital-hybrid-platform.web.app.` | `3600` | Routes JUMO Alumni platform to Firebase Hosting. |
| `*` (Wildcard) | `CNAME` | `jumo-digital-hybrid-platform.web.app.` | `3600` | Catches arbitrary custom customer subdomains (`tenant-name.jumo.ug`) |

### How Tenant Resolution Works Under the Hood

1. **Frontend Hostname Detection**:
   When a user hits any URL (e.g., `sacco.jumo.ug` or `kabs-union.jumo.ug`), the React Experience layer executes `window.location.hostname` parsing:
   ```typescript
   const hostname = window.location.hostname; // e.g., "sacco.jumo.ug"
   const parts = hostname.split(".");
   
   let tenantId = "default";
   let domainContext = "home";
   
   if (parts.length >= 3) {
     // If the subdomain is "sacco", "church", "school", "alumni"
     if (["sacco", "church", "school", "alumni"].includes(parts[0])) {
       domainContext = parts[0]; // Set ERP domain scope
     } else {
       tenantId = parts[0]; // Set custom customer tenant scope (e.g. customer-name)
     }
   }
   ```
2. **Backend API Isolation Routing**:
   Every state request includes the header `X-Jumo-Tenant-ID` or `X-Jumo-Domain-Context`. The Express `tenantResolver` middleware reads this header:
   ```typescript
   app.use((req, res, next) => {
     const tenantId = req.headers['x-jumo-tenant-id'] || 'default';
     req.tenantId = tenantId;
     // Enforce strict cryptographic sandbox partitions for this tenantId
     next();
   });
   ```
