# JUMO UEOS — HARDCODED ARCHITECTURE AUDIT
**Status:** CRITICAL VULNERABILITY DETECTED
**Date:** 2024-05-22

## 1. Executive Summary
The JUMO UEOS runtime currently operates on a **Hardcoded Imperative Routing Model** located in `src/App.tsx`. While sophisticated metadata exists in `src/products/ApprovedProductRegistry.ts` and `src/products/ModulePortalRegistry.ts`, the actual application delivery remains entirely dependent on manual `if` statements and hardcoded string comparisons.

## 2. Hardcoded Routing Inventory (`src/App.tsx`)
The following products and portals are delivered via hardcoded conditional logic rather than a dynamic registry:

| Product/Portal | Detection Logic (Hardcoded) | File Link |
| :--- | :--- | :--- |
| **Fintech** | `routePath.startsWith('/products/fintech') \|\| routePath === '/fintech' ...` | `src/App.tsx:207` |
| **Nursery ERP** | `routePath.startsWith('/products/nursery') \|\| routePath === '/nursery' ...` | `src/App.tsx:226` |
| **Primary ERP** | `routePath.startsWith('/products/primary') \|\| routePath === '/primary' ...` | `src/App.tsx:236` |
| **Secondary ERP** | `routePath.startsWith('/products/secondary') \|\| routePath === '/secondary' ...` | `src/App.tsx:246` |
| **Alumni ERP** | `routePath.startsWith('/products/alumni') \|\| routePath === '/alumni' ...` | `src/App.tsx:268` |
| **Church ERP** | `routePath.startsWith('/products/church') \|\| routePath === '/church' ...` | `src/App.tsx:283` |
| **Owner Center** | `routePath === '/owner' \|\| routePath === '/admin' ...` | `src/App.tsx:300` |

## 3. Universal Launcher Dependency
The system currently defaults to `JumoApplicationLauncher` (Universal Launcher) for all unhandled routes and as the primary entry point (`/`). 

**Violation:** The user requested "STOP making incremental patches" and "Remove Universal Application Launcher". Products must be independently addressable. Currently, a user is forced through the launcher unless they know the specific sub-route.

## 4. Education Product Flattening
Despite the requirement for three independent education products (Nursery, Primary, Secondary), the `App.tsx` routing still groups Secondary ERP with the legacy "Education ERP" platform (`src/products/education-erp`).

*   **Nursery:** Has a shell (`NurseryErpWebShell.tsx`) but is still checked via hardcoded routes.
*   **Primary:** Has a shell (`PrimaryErpWebShell.tsx`) but is still checked via hardcoded routes.
*   **Secondary:** Shares the shell with the universal `EducationErpWebShell`.

## 5. Architectural Corrective Action
1.  **De-Hardcoding:** Replace `AppContent` logic with a `RegistryDrivenRouter`.
2.  **Portal Isolation:** Every product entry point must verify its own `ProductManifest`.
3.  **Launcher Removal:** Remove `JumoApplicationLauncher` from the root route. Root route should either be a generic gateway or products should live on sovereign subdomains/paths with independent login gates.
