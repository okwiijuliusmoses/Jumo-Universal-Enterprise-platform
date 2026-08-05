# JUMO Universal Enterprise Operating System (UEOS) v6.2
## Sovereign AI Hybrid Operating System & Enterprise Cloud Platform

Welcome to the canonical codebase of **JUMO UEOS v6.2**, a micro-kernel based Enterprise Hybrid Operating System designed to power distributed ERP domains, run secure transaction ledgers with real-time financial audits, host multi-agent AI workforces, and manage sovereign cloud applications under owner control.

---

## 🚀 Key Platform Principles
*   **AI Hybrid Core**: Decoupled multi-provider AI Gateway (using Google GenAI and Gemini models) serving as a cognitive operating system layer.
*   **Zero-Trust Security**: Admin session gates, strict rate-limiting, and an Administrative MFA signature wall protecting critical data pipelines.
*   **FAAP Ledger Backbone**: Every transaction across every ERP domain flows through a double-entry general ledger requiring absolute `$0.00 offset` balance parity.
*   **Resilient Fallback**: Automatic failover from PostgreSQL database clusters to secure local offline storage (`/assets/ueos_database.json`) to guarantee 100% platform availability.

---

## 🛠️ Repository Quick Start

### 1. Installation & Environment Configuration
Clone the repository and copy the environment template to define your secure keys:
```bash
cp .env.example .env
npm install
```

### 2. Run in Local Development Mode
Start the local server and Vite client bundler:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the live desktop workspace.

### 3. Production Compilation & Packaging
Bundles the React client and uses `esbuild` to compile `/server.ts` into a self-contained, high-performance CommonJS file inside `/dist`:
```bash
npm run build
npm start
```

---

## 📁 Core Documentation Suite
To audit or maintain this platform, consult the comprehensive documentation files available in the root workspace:
*   [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md): File folders mapping to the 16-Layer platform architecture.
*   [PROJECT_FILES.md](./PROJECT_FILES.md): Functional matrix of every core source file and React widget.
*   [MODULE_REGISTRY.md](./MODULE_REGISTRY.md): Active and planned ERP domains, billing rules, and AI registries.
*   [IMPLEMENTATION_STATUS.md](./IMPLEMENTATION_STATUS.md): Local compiled features versus production credentials.
*   [DEPENDENCY_MAP.md](./DEPENDENCY_MAP.md): Client-side and server-side package maps and build systems.
*   [ARCHITECTURE.md](./ARCHITECTURE.md): Deep architectural details on micro-kernels, security, and financial flows.
*   [CONSOLIDATION_GUIDE.md](./CONSOLIDATION_GUIDE.md): Safe integration guide for merging future enterprise modules.
*   [INTEGRATION_MAP.md](./INTEGRATION_MAP.md): Decoupled interface mappings for providers, storage, and models.
*   [VERSION.md](./VERSION.md): System version tracking and releases history.

---
*Developed and maintained under strict authorization of the JUMO UEOS Supreme Core Architect.*
