# JUMO NON-PARTIAL COMPLETE PRODUCT IMPLEMENTATION PROTOCOL
**Authoritative Engineering Mandate, Lifecycle Governance, Contract Verification, and Zero-Reduction Operating Standard**
*Classification: RESTRICTED // SOVEREIGN PLATFORM GOVERNANCE BASELINE // LOCK: APPROVED*
*Timestamp: 2026-08-26T09:00:00.000Z*

---

## THE GOLDEN RULES OF JUMO ENGINEERING

> ### RULE 1:
> **Never reduce the approved architecture to match the current implementation. Increase the implementation until it matches the approved architecture.**

> ### RULE 2:
> **A successful build is NOT a successful product implementation.**  
> TypeScript compilation, lint checks, or rendering a shell only proves syntactic and runtime integrity. A product is complete ONLY when its authoritative specification, source implementation, runtime registry, database schema, APIs, UI metadata contracts, workflows, permissions, and tests reconcile 100%.

> ### RULE 3:
> **The Canonical Architectural Invariant is Immutable:**  
> `Platform Kernel → Sovereign Product → Directorate → Department → Office → Portal → Module → Capability → UI Metadata → Runtime Component`  
> No tier may be skipped, collapsed, silently eliminated, or substituted with a generic placeholder.

---

## 1. THE AUTHORITATIVE-SOURCE MODEL

Gemini and all platform developers must operate strictly against the top-down Authoritative Source of Truth. The implementation is generated and reconciled from the specification, rather than the specification being rewritten downwards to match what happens to be currently implemented.

```
                  ┌──────────────────────────────────────────────────┐
                  │          APPROVED PRODUCT SPECIFICATION          │
                  │   (Authoritative Blueprint & Standard Contract)  │
                  └─────────────────────────┬────────────────────────┘
                                            │
                                            ▼
                  ┌──────────────────────────────────────────────────┐
                  │                 PRODUCT MANIFEST                 │
                  └─────────────────────────┬────────────────────────┘
                                            │
                                            ▼
                  ┌──────────────────────────────────────────────────┐
                  │              ARCHITECTURE MANIFEST               │
                  │        (Directorates → Departments → Offices)     │
                  └─────────────────────────┬────────────────────────┘
                                            │
                                            ▼
                  ┌──────────────────────────────────────────────────┐
                  │                 PORTAL MANIFEST                  │
                  │          (Dedicated Persona Workspaces)          │
                  └─────────────────────────┬────────────────────────┘
                                            │
                                            ▼
                  ┌──────────────────────────────────────────────────┐
                  │                 MODULE MANIFEST                  │
                  │           (Discrete Subsystem Packages)          │
                  └─────────────────────────┬────────────────────────┘
                                            │
                                            ▼
                  ┌──────────────────────────────────────────────────┐
                  │               CAPABILITY MANIFEST                │
                  │         (Granular Features & Operations)         │
                  └─────────────────────────┬────────────────────────┘
                                            │
                                            ▼
                  ┌──────────────────────────────────────────────────┐
                  │               UI METADATA MANIFEST               │
                  │   (Screens, Tables, Forms, Dashboards, Reports)   │
                  └─────────────────────────┬────────────────────────┘
                                            │
                                            ▼
                  ┌──────────────────────────────────────────────────┐
                  │             RUNTIME COMPONENT BINDINGS           │
                  │        (Interactive Dynamic UI Visualizers)      │
                  └─────────────────────────┬────────────────────────┘
                                            │
                                            ▼
                  ┌──────────────────────────────────────────────────┐
                  │            DATABASE & LEDGER ENTITIES            │
                  │     (Tables, Fields, Indices, Journal Hooks)     │
                  └─────────────────────────┬────────────────────────┘
                                            │
                                            ▼
                  ┌──────────────────────────────────────────────────┐
                  │             API & RBAC ROUTE CONTRACTS           │
                  │          (Endpoints, HTTP Verbs, Handlers)       │
                  └─────────────────────────┬────────────────────────┘
                                            │
                                            ▼
                  ┌──────────────────────────────────────────────────┐
                  │             WORKFLOW & LIFECYCLE STATE           │
                  │       (Transition Matrices, SLAs, Sign-offs)     │
                  └─────────────────────────┬────────────────────────┘
                                            │
                                            ▼
                  ┌──────────────────────────────────────────────────┐
                  │             TEST & VERIFICATION SUITES           │
                  │           (Contract & Parity Reconcilers)        │
                  └──────────────────────────────────────────────────┘
```

---

## 2. THE MANDATORY 18-STEP IMPLEMENTATION CYCLE

Every product reconstruction, module implementation, upgrade, or generation cycle must execute all 18 steps sequentially. **Stopping after a successful build (Step 9) is strictly forbidden.**

```
 1. DISCOVER                          Analyze repository, manifests, historical records.
 2. READ AUTHORITATIVE SPECIFICATION  Load canonical specification schema for the target product.
 3. FREEZE ARCHITECTURE               Lock expected counts across all 10 tiers.
 4. BUILD COMPLETE INVENTORY          Enumerate exact numbers for all 37 categories (A to AK).
 5. GENERATE IMPLEMENTATION PLAN      Partition work into complete vertical slices.
 6. IMPLEMENT                         Generate contracts, schemas, handlers, and UI metadata.
 7. REGISTER                          Mount in universal module and portal registries.
 8. INTEGRATE                         Bind to Platform Kernel, Database, and Router.
 9. BUILD                             Execute compile_applet (Syntactic verification).
10. TEST                              Execute lint_applet and contract test harnesses.
11. RECONCILE                         Compare Expected vs. Implemented counts.
12. DETECT MISSING COMPONENTS         Extract list of unmounted/unintegrated items.
13. REPAIR                            Synthesize and mount missing components.
14. REBUILD                           Re-verify compilation and asset bundling.
15. RETEST                            Re-execute unit, integration, and lint validations.
16. VERIFY FUNCTIONAL COMPLETENESS   Validate state transitions, forms, tables, and workflows.
17. VERIFY ARCHITECTURAL COMPLETENESS Check 100% parity across all 10 tiers.
18. PRODUCE COMPLETENESS CERTIFICATE Generate authoritative cryptographic reconciliation report.
```

---

## 3. ZERO-TOLERANCE RULES ON INVENTORY INTEGRITY

### A. Prohibition of "Representative" Modules
Gemini must **NEVER** implement a "representative subset" of modules (e.g., implementing 8 out of 32 modules) and declare the product restored.
If the specification mandates 32 modules, all 32 must be fully specified, implemented, mounted, and verified.
Any missing module causes an automatic **`GATE_FAILED`** status:
$$\text{Expected: } 32 \quad | \quad \text{Implemented: } 8 \quad | \quad \text{Missing: } 24 \quad \Longrightarrow \quad \mathbf{FAILED \ (25.0\% \ Completeness)}$$

### B. Prohibition of Count Inflation
Creating empty placeholder files or un-configured registry stubs does **NOT** count as an implemented module. Every module must satisfy its full **Module Contract** before advancing in state.

### C. Exact Integers Only
All inventories, plans, and census tables must use exact integers. The use of:
- Ranges (`"30–42 modules"`)
- Approximations (`"approx. 100 screens"`)
- Generic placeholders (`"hundreds of components"`)
- Truncation markers (`"etc."`, `"and more"`, `"sample set"`)  
is **strictly prohibited** in all official architecture and audit artifacts.

---

## 4. SIX CANONICAL IMPLEMENTATION STATES

Every single architectural artifact across the 10 tiers must be assigned exactly one state:

| State | Definition & Criteria | Counted as Complete? |
|---|---|:---:|
| **1. `SPECIFIED`** | Documented and enumerated in authoritative product specification manifest. | ❌ NO |
| **2. `SCAFFOLDED`** | Interface/type and initial stub file exist in source directory. | ❌ NO |
| **3. `IMPLEMENTED`** | Fully coded with capabilities, schema, endpoints, and UI metadata. | ❌ NO |
| **4. `INTEGRATED`** | Mounted in active runtime registry, routes mapped, and state connected. | ❌ NO |
| **5. `FUNCTIONALLY_VERIFIED`** | Verified with operational state handlers, UI rendering, and mock/live data. | ❌ NO |
| **6. `PRODUCTION_VERIFIED`** | Passes 100% parity gate, security review, and multi-tenant audit. |  **YES** |

---

## 5. THE IMMUTABLE MODULE CONTRACT

A module is legally valid and recognized as `IMPLEMENTED` only when it provides its complete, machine-readable declaration:

```typescript
export interface JumoModuleContract {
  identity: {
    moduleId: string;
    productCode: string;
    directorateId: string;
    departmentId: string;
    officeId: string;
    portalId: string;
    title: string;
    purpose: string;
    version: string;
  };
  capabilities: {
    capabilityId: string;
    name: string;
    description: string;
    serviceAction: string;
  }[];
  uiMetadata: {
    screens: JumoScreenDefinition[];
    forms: JumoFormDefinition[];
    tables: JumoTableDefinition[];
    dashboards: JumoDashboardWidget[];
    reports: JumoReportDefinition[];
    actions: JumoActionDefinition[];
    filters: JumoFilterDefinition[];
  };
  databaseEntities: {
    tableName: string;
    primaryKey: string;
    fields: Record<string, string>;
  }[];
  apis: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    endpoint: string;
    permission: string;
    handler: string;
  }[];
  workflows: {
    workflowId: string;
    stages: string[];
    slaHours?: number;
  }[];
  runtimeComponent: {
    componentId: string;
    renderStrategy: "METADATA_UNIVERSAL" | "BESPOKE_INTERACTIVE";
  };
  permissions: string[];
}
```

---

## 6. DECLARATIVE UI METADATA ARCHITECTURE

To prevent context exhaustion and token truncation caused by hand-writing thousands of lines of boilerplate JSX, all product UI is driven by **Declarative UI Metadata Contracts** interpreted by the **Universal Metadata Runtime Engine**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        MODULE UI METADATA CONTRACT                     │
├────────────────────────────────────────────────────────────────────────┤
│  • Views / Screens: Dashboard, Master-Detail, Grid, Feed               │
│  • Forms: Fields, Validations, Multi-step Wizards, Submissions         │
│  • Tables: Columns, Filters, Sorts, Pagination, Row Action Menus       │
│  • Dashboards: KPI Cards, Progress Meters, Status Badges, Charts       │
│  • Reports: Printable Layouts, Date Ranges, Export Formats (CSV/PDF)   │
│  • Workflows: Kanban Stages, Approval Modals, Sign-off Triggers        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  UNIVERSAL METADATA RUNTIME ENGINE                     │
│  (Interprets contracts into standardized, responsive, accessible JSX) │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 7. BATCH IMPLEMENTATION STRATEGY: VERTICAL SLICES

Gemini must never implement an enterprise ERP through horizontal shallow layers (e.g. creating 150 empty module files before building any UI or data layers).

Instead, implementations must execute in **Complete Vertical Slices**:

```
Directorate Slice:
  └── Department
        └── Office
              └── Portal
                    └── Module
                          ├── Capabilities (Implemented)
                          ├── Database Schema (Created)
                          ├── APIs & Handlers (Bound)
                          ├── UI Metadata & Screens (Mounted)
                          ├── Workflows & Forms (Operational)
                          └── Verification Gate (PASSED)
```

A vertical slice is marked closed ONLY when all child artifacts reach `FUNCTIONALLY_VERIFIED`. Then, and only then, the engine proceeds to the next slice.

---

## 8. HARD COMPLETENESS GATE & AUTOMATED GAP DETECTION

The **`JumoCompletenessVerificationEngine`** performs programmatic matrix comparisons:

$$\text{Completeness Index} = \frac{\sum \text{Verified Implemented Artifacts}}{\sum \text{Authoritative Specified Artifacts}} \times 100\%$$

### Automatic Reconciler Checks:
1. **Specification vs. Registry**: Flags any module specified in blueprint but missing in runtime registry.
2. **Registry vs. Router**: Flags any registered portal or API without a live routing endpoint.
3. **Module vs. UI Metadata**: Flags any module without associated screen or view metadata.
4. **Module vs. Database**: Flags any module requiring persistence without active schema tables.
5. **Role vs. Permissions**: Flags any role without assigned capability permissions.

---

## 9. PERSISTENT CONTEXT & MULTI-TURN STATE MANAGEMENT

When the scale of a product exceeds single-turn generation limits, Gemini must maintain and consult persistent machine-readable manifests:

1. `src/core/specification/manifests/product_manifest.json` — Master authoritative specification.
2. `src/core/specification/manifests/implementation_manifest.json` — Active verified implementation state.
3. `src/core/specification/manifests/completeness_manifest.json` — Gap report and verification logs.

Gemini must read these manifests at the start of every session and update them at the end of every vertical slice. **Never rely on conversational memory.**

---

## 10. PRODUCT COMPLETENESS CERTIFICATE STANDARD

Upon completion of any product, the following standardized certificate must be emitted:

```
================================================================================
                    JUMO PRODUCT COMPLETENESS CERTIFICATE
================================================================================
PRODUCT:                JUMO FINTECH (prod-fintech)
CLASSIFICATION:         SOVEREIGN COMMERCIAL ENTERPRISE PLATFORM
COMPLETENESS RATE:      100.0% [ALL GATES PASSED]

--------------------------------------------------------------------------------
ARCHITECTURAL TIER RECONCILIATION
--------------------------------------------------------------------------------
TIER                    SPECIFIED   IMPLEMENTED   INTEGRATED   VERIFIED   STATUS
--------------------------------------------------------------------------------
1. Directorates                 4             4            4          4   PASS
2. Departments                 12            12           12         12   PASS
3. Offices                     24            24           24         24   PASS
4. Portals                      6             6            6          6   PASS
5. Modules                     32            32           32         32   PASS
6. Capabilities                96            96           96         96   PASS
7. UI Metadata Records        128           128          128        128   PASS
8. Screens / Views             38            38           38         38   PASS
9. Forms                       28            28           28         28   PASS
10. Dashboards                 12            12           12         12   PASS
11. Reports                    22            22           22         22   PASS
12. Workflows                  16            16           16         16   PASS
13. Database Tables            24            24           24         24   PASS
14. APIs / Endpoints           36            36           36         36   PASS
15. Runtime Components         34            34           34         34   PASS
16. AI Agents                   4             4            4          4   PASS
17. Roles / Permissions        60            60           60         60   PASS
--------------------------------------------------------------------------------
OVERALL AUDIT VERDICT:  [100% COMPLETE // PRODUCTION READY]
================================================================================
```

---

## 11. CONCRETE GEMINI OPERATING PROCEDURE (NEXT TURN & FUTURE TASKS)

When tasked with implementing, restoring, or extending any JUMO product:

1. **Step 1 — Read**: Load the Authoritative Product Specification Manifest and the implementation manifest.
2. **Step 2 — Lock**: Establish the exact target integer count across all categories. Do not proceed until targets are frozen.
3. **Step 3 — Audit & Gap Detection**: Run the completeness reconciler to list all missing, unintegrated, or unverified modules.
4. **Step 4 — Slice Execution**: Take the first incomplete Vertical Slice (Directorate → Department → Office → Portal → Module).
5. **Step 5 — Generate Contracts**: Synthesize the full `JumoModuleContract` (Capabilities, UI Metadata, DB Tables, APIs, Workflows).
6. **Step 6 — Mount**: Register the slice in `moduleRegistry.ts`, `portalRegistry.ts`, and router bindings.
7. **Step 7 — Validate**: Run `lint_applet` and `compile_applet`.
8. **Step 8 — Reconcile**: Verify implemented integer counts against expected specification counts.
9. **Step 9 — Progress or Repair**: If missing items remain, continue to next vertical slice. If all slices pass, generate the **Product Completeness Certificate**.

---
*End of JUMO Non-Partial Complete Product Implementation Protocol.*
