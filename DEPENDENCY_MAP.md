# JUMO UNIVERSAL ENTERPRISE OPERATING SYSTEM (UEOS)
## DEPENDENCY_MAP.md - Unified Package and System Configuration Map

This document catalogues the software libraries, frameworks, compilers, and dependencies powering JUMO UEOS and JUMO Cloud. It maps the dependencies declared in `/package.json` to their respective enterprise platform capability domains.

---

## 1. DESKTOP AND CLIENT RUNTIME LIBRARIES

### Core Visual Shell: React 19 (`react` & `react-dom`)
*   **Purpose**: Renders the high-density desktop GUI, handles active tab states, local storage data syncing, and dynamic wizards.
*   **Version**: `^19.0.1`
*   **Compile Ingress**: Mounted within `/src/main.tsx` and compiled into static browser-ready bundles.

### Layout Transitions: Motion (`motion`)
*   **Purpose**: Manages smooth, eye-safe component entries, sliding navigation transitions, and panel animations.
*   **Version**: `^12.23.24`
*   **Import Statement**: `import { motion } from "motion/react"`

### High-Resolution Icons: Lucide React (`lucide-react`)
*   **Purpose**: Standardized platform icons representing servers, database pools, ledger records, compliance badges, and firewall telemetry.
*   **Version**: `^0.546.0`

---

## 2. BACKEND AND MICRO-KERNEL LIBRARIES

### HTTP Routing Gateway: Express (`express`)
*   **Purpose**: Orchestrates the server-side API endpoints, processes payment transactions, seeds Postgres tables, and serves static files.
*   **Version**: `^4.21.2`

### Cognitive AI Router: Google GenAI SDK (`@google/genai`)
*   **Purpose**: Connects the JUMO Cloud AI Orchestration Layer to Gemini models, enabling semantic RAG querying, blueprint generation, and research synthesis.
*   **Version**: `^2.4.0`
*   **Import Statement**: `import { GoogleGenAI } from "@google/genai"`

### Postgres Adapter: Node Postgres (`pg` & `@types/pg`)
*   **Purpose**: Handles connection pooling, queries execution, and transaction isolation against relational Cloud SQL instances.
*   **Version**: `^8.22.0` (types: `^8.20.0`)

### Environment Settings: Dotenv (`dotenv`)
*   **Purpose**: Synchronizes external variables (Postgres credentials and Gemini API keys) into Node's `process.env`.
*   **Version**: `^17.2.3`

---

## 3. COMPILATION AND DEVELOPMENT ENGINE

### Bundler Platform: Vite (`vite`)
*   **Purpose**: Bundles CSS files, compiles typescript files, and serves static assets during local development.
*   **Version**: `^6.2.3`

### Node TypeScript Runner: tsx (`tsx`)
*   **Purpose**: Dynamically compiles and executes typescript on the server during development without requiring an intermediate JavaScript compile step.
*   **Version**: `^4.21.0`

### Fast JS/TS Bundler: esbuild (`esbuild`)
*   **Purpose**: Compiles and bundles the complex TypeScript `/server.ts` into a standalone, compressed CJS module (`dist/server.cjs`) for fast startup speeds in production.
*   **Version**: `^0.25.0`

### Static Type Checker: TypeScript (`typescript`)
*   **Purpose**: Enforces type safety, checks object structures, and flags warnings before deployment.
*   **Version**: `~5.8.2`

---
**Verified and Released by the JUMO UEOS Supreme Core Architect**
