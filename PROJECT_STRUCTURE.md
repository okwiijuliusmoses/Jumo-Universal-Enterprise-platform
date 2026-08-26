# JUMO UNIVERSAL ENTERPRISE OPERATING SYSTEM (UEOS)
## PROJECT_STRUCTURE.md - System Architecture and Folder Topology Map

This document is the authoritative structural blueprint of the JUMO UEOS repository. It maps the physical folder layout to the sovereign hybrid platform architecture layers, aligning the local workspace with the 16-Layer JUMO Cloud & Enterprise Infrastructure Platform paradigm.

---

## 1. PHYSICAL DIRECTORY TREE

```text
/ (Workspace Root)
│
├── .env.example                            # Blueprint template for environment variables & API credentials
├── .gitignore                              # Strict exclusion list protecting local databases & node artifacts
├── AGENTS.md                               # Persistent custom guidelines for developer agent orchestration
├── Dockerfile                              # Multi-stage production container wrapper targeting Cloud Run
├── docker-compose.yml                      # Local development multi-container database-cluster manifest
├── index.html                              # High-density client-side shell entry point
├── metadata.json                           # Platform permission boundaries and major capabilities
├── package.json                            # Unified dependency manifests and script orchestration
├── tsconfig.json                           # Strict static compilation parameters (type-stripping enabled)
├── vite.config.ts                          # Client asset bundling engine and Tailwind integration
├── server.ts                               # Sovereign Micro-Kernel, HTTP Gateway, & Express Bootstrap
│
├── assets/                                 # Secure Offline Local Persistence directory
│   └── ueos_database.json                  # Encrypted/Sealed local JSON database (Automatic Failover)
│
├── deployment/                             # Sovereign Cloud & Container Orchestration
│   └── cloudrun.yaml                       # Cloud Run deployment and environment mapping configuration
│
└── src/                                    # Universal Source Code Root
    ├── App.tsx                             # Main Visual Workspace and dynamic tab orchestrator
    ├── index.css                           # Global Tailwind CSS utility layer and display fonts
    ├── main.tsx                            # React client-side engine mounting point
    ├── types.ts                            # Sovereign Type-Safety Registry (Shared domain enums & interfaces)
    ├── ueosBlueprint.ts                    # Hardened metadata specifications for the UEOS Core Platform
    ├── mockBlueprint.ts                    # Test datasets modeling external template applications
    │
    ├── components/                         # Decoupled UI and Digital Manufacturing Widgets
    │   ├── BlueprintViewer.tsx             # Interactive 2D Node/Edge micro-kernel diagrammer
    │   ├── BoilerplateGenerator.tsx        # High-resolution multi-file scaffolding engine
    │   ├── ChatPanel.tsx                   # Cognitive Multi-Agent Swarm console
    │   ├── KanbanBoard.tsx                 # Software Factory project tracking board
    │   ├── OwnerControlCenter.tsx          # 14-Module Sovereign Dashboard (Main Control Center)
    │   ├── ProductionReleasePanel.tsx      # Staging & Production Deployment compiler panel
    │   ├── ProjectWizard.tsx               # Drag-and-drop dynamic application generator
    │   ├── PublicPortal.tsx                # Client guest landing deck and trial sandbox
    │   └── RuntimeConsole.tsx              # Sandboxed simulation terminal and command simulator
    │
    ├── database/                           # Persistence & Enterprise Database Handlers
    │   ├── db.ts                           # Hybrid Postgres / Local file database router
    │   └── enterprise_extensions.ts        # Extensible registries, billing, RAG, and simulator datasets
    │
    ├── migrations/                         # SQL Schema Migrations & DB Seeding Engines
    │   └── migration.ts                    # SQL table bootstrap, constraint verification, and FAAP seeds
    │
    ├── models/                             # Active Data Entity Models (ORM Abstractions)
    │   └── models.ts                       # Database schema representations and query sanitizers
    │
    ├── repositories/                       # Double-Entry Ledger, Security, & Secret Repositories
    │   └── repositories.ts                 # Hardened I/O access logic (Ledger parity, Zero-Trust checks)
    │
    └── schema/                             # Relational Schema Specification Models
        └── schema.ts                       # Database column types and constraints models
```

---

## 2. CONTEXTUAL COGNITIVE LAYERING

The physical files translate directly into the JUMO Cloud & JUMO UEOS 16-Layer Sovereign Operating System framework:

### CORE KERNEL & INTEGRATION (LAYER 1)
*   **Sovereign Entry**: `/server.ts` boots the express server, mounts middlewares, and orchestrates domain registries on container launch.
*   **Database abstraction**: `/src/database/db.ts` and `/src/database/enterprise_extensions.ts` serve as the vendor-agnostic adapter layer separating SQL/Postgres from local JSON data files.

### FAAP LEDGERBACKBONE (LAYER 11)
*   **Double-Entry Math**: `/src/repositories/repositories.ts` (`LedgerRepository`) processes balanced debit/credit posting lines, enforcing the `$0.00 offset` parity.
*   **Sovereign Fees**: `/server.ts` proxies transactions, enforces the global 1.5% settlement fee, debits `1020-JUMO-TREASURY` and credits `4020-JUMO-FEES`.

### SECURITY & COMPLIANCE (LAYER 10)
*   **Zero-Trust Walls**: `/server.ts` injects HSTS, CSP, and rate-limiting.
*   **Sovereign Vault**: `/src/components/OwnerControlCenter.tsx` (`activeTab === "security_vault"`) houses encrypted secrets, AES credentials masking, and MFA signature validators.

### DIGITAL TWIN SIMULATION (LAYER 14)
*   **Sandbox Platform**: `/src/components/RuntimeConsole.tsx` mimics real command execution.
*   **Model Simulator**: `/src/database/enterprise_extensions.ts` (`runDigitalTwinSimulation`) runs predictive analysis models for fee optimizations, grant dryouts, and cooperatives leverage.

---
**Verified and Released by the JUMO UEOS Supreme Core Architect**
