# JUMO UNIVERSAL ENTERPRISE OPERATING SYSTEM (UEOS)
## PROJECT_FILES.md - Complete File Inventory and Functional Map

This inventory details every primary file in the JUMO UEOS repository, its physical location, functional scope, and compile verification status, proving that no architectural assets were lost during the recent documentation consolidation.

---

## 1. FILE INVENTORY AND COMPILATION MATRIX

| Physical File Path | Functional Domain | Functional Scope & Implementation Summary | Status |
| :--- | :--- | :--- | :---: |
| `/server.ts` | **Micro-Kernel Gateway** | Main entry bootstrapper on port `3000`. Handlers for express API routing, Zero-Trust rate limiting (300 req/min), CORS security, Strict HTTPS enforcement, HSTS/CSP, standard 1.5% clearing fee routes, and Gemini cognitive routers. | **PASSED** |
| `/src/App.tsx` | **Ecosystem Shell UI** | Main desktop visual workspace. Orchestrates multi-module layouts, local storage syncing, and state routing. Handles switching tabs between architecture blueprinting, Kanban board, Code Generator, Simulation Console, and the 14-Module Owner Control Center. | **PASSED** |
| `/src/types.ts` | **Type-Safety Registry** | Centralizes all shared interfaces, types, and custom structures used in React and the server. Declares strict types for `SavedProject`, `SoftwareBlueprint`, `ChatMessage`, `KanbanTask`, `DatabaseField`, `DatabaseTable`, `ApiEndpoint`, `AIEmployee`, and `MarketplaceItem`. | **PASSED** |
| `/src/ueosBlueprint.ts` | **Kernel Core Spec** | Immutable architectural specification of JUMO UEOS itself. Declares its core features, dependencies, 12 tables relational schema (including FAAP general ledgers and registries), API endpoints, and micro-kernel topology connections. | **PASSED** |
| `/src/mockBlueprint.ts` | **ERP Template Model** | Standard reference blueprint modelling external template applications (e.g. GymSaaS scheduling platform) used to test the dynamic software factories, scaffolding generators, and Kanban planners. | **PASSED** |
| `/src/database/db.ts` | **Hybrid Persistence** | Implements the resilient `JUMODBEngine`. Directs transactional queries to a PostgreSQL server pool via `pg` if active environment variables are present, otherwise automatically falls back to reading and writing locally inside `/assets/ueos_database.json`. | **PASSED** |
| `/src/database/enterprise_extensions.ts` | **Enterprise Registries** | Stores data registries and helper structures. Contains: active payment connectors (MTN, Airtel, Safaricom M-Pesa, Stripe, PayPal), automated webhook loggers, billing configuration models, AI employees rosters, RAG indices, AI researchers, and digital twin simulators. | **PASSED** |
| `/src/migrations/migration.ts` | **DB Schema Seeding** | Database bootstrapper. Generates required database tables on Postgres (e.g., `ueos_users`, `ueos_registries`, `ueos_faap_ledgers`, `ueos_audit_logs`) and seeds them with baseline administrative profiles and FAAP general ledger accounts. | **PASSED** |
| `/src/repositories/repositories.ts` | **Ledger & Security I/O** | Repository pattern abstraction. Contains: `UserRepository` (trust clearance checks), `LedgerRepository` (parity checks, cash transfers, fee routings), `RegistryRepository` (system registrations), `SecretsRepository` (masked AES keys), and `AgentMemoryRepository` (semantic context logs). | **PASSED** |
| `/src/schema/schema.ts` | **Relational Entities** | Declares data field configurations and relational indexes for high-volume ledger accounts, user permissions, multi-tenant boundaries, and secure credentials. | **PASSED** |
| `/src/models/models.ts` | **Active Entities ORM** | ORM mapper that formats and sanitizes queries before execution, protecting the databases against SQL injection and data schema drift. | **PASSED** |
| `/src/main.tsx` | **Vite React Loader** | Bootstrap entry for React client assets. Renders the main SPA and imports global fonts and stylesheets. | **PASSED** |
| `/src/index.css` | **Tailwind Utility** | Injects Tailwind CSS styles, custom scrollbars, layout heights, Inter fonts, JetBrains Mono styles, and high-contrast color states. | **PASSED** |
| `/metadata.json` | **Platform Manifest** | Standard file mapping descriptive metadata, target container description, frame permission requests (blank to prevent frame hijacking), and major platform capabilities. | **PASSED** |
| `/package.json` | **System Manifest** | Manages compile scripts (e.g., `tsx server.ts` in dev mode, full compilation via `vite build` + CJS esbuild in prod), third-party dependencies, and development tools. | **PASSED** |
| `/.env.example` | **Secrets Blueprint** | Outlines required system variables: PostgreSQL credentials, Gemini API tokens, and live stripe credentials. | **PASSED** |
| `/docker-compose.yml` | **Container Cluster** | Container definitions for clustering services, exposing standard ingress ports, and securing local PostgreSQL. | **PASSED** |
| `/Dockerfile` | **Production Build** | Multi-stage build process for packaging assets, compiling typescript, bundling backend files, and starting Node.js. | **PASSED** |

---

## 2. FUNCTIONAL COMPONENT INVENTORY (src/components/)

*   `BlueprintViewer.tsx`: Interactive canvas using beautiful node maps and curves to visualize application topology, database fields, and contract routes.
*   `BoilerplateGenerator.tsx`: Production-ready file scaffolding engine that dynamically compiles controller code, schema models, and web components for the Software Factory.
*   `ChatPanel.tsx`: Full conversational sidebar facilitating semantic research questions and multi-agent directives with the Gemini API.
*   `KanbanBoard.tsx`: Group task planner representing project lifecycle phases: setup, schema, endpoints, and views.
*   `OwnerControlCenter.tsx`: High-density command deck with 14 tabs giving owners absolute authority over servers, billing rules, threat logs, secrets vault, domain installs, and payments.
*   `ProductionReleasePanel.tsx`: Live build, check, and deployment orchestrator displaying logs, testing outcomes, and releases.
*   `ProjectWizard.tsx`: Configurable forms allowing easy creation of new applications, picking of tech-stacks, and feature matrices.
*   `PublicPortal.tsx`: Centered landing hub allowing users to view and interact with JUMO's services in a secure sandbox.
*   `RuntimeConsole.tsx`: Command prompt terminal with command history enabling simulated code testing, telemetry, and manual log triggers.

---
**Verified and Released by the JUMO UEOS Supreme Core Architect**
