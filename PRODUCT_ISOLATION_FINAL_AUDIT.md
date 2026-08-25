# JUMO UEOS — PRODUCT ISOLATION FINAL AUDIT
**Status:** NON-COMPLIANT
**Date:** 2024-05-22

## 1. Sovereign Product Boundary Analysis
The goal is for products to be independently addressable applications with their own manifests, shells, and authentication boundaries.

| Product | Shell Status | Auth Boundary | Manifest Usage |
| :--- | :--- | :--- | :--- |
| **JUMO Fintech** | Sovereign (`FintechShell.tsx`) | Hardcoded in `App.tsx` | Partial (UI only) |
| **JUMO Nursery ERP** | Sovereign (`NurseryErpWebShell.tsx`) | Hardcoded in `App.tsx` | Partial (UI only) |
| **JUMO Primary ERP** | Sovereign (`PrimaryErpWebShell.tsx`) | Hardcoded in `App.tsx` | Partial (UI only) |
| **JUMO Secondary ERP** | **FLATTENED** (Uses `EducationErpWebShell.tsx`) | Hardcoded in `App.tsx` | None |

## 2. The "Universal Shell" Tell
All Education products currently reference `BursarOfficePortal` from the universal `education-erp` directory:
- `import { BursarOfficePortal } from '../../education-erp/web/portals/BursarOfficePortal';`
- This violates the requirement for sovereign product separation. FAAP should be contextually integrated, not shared as a single common component across independent products.

## 3. Login Sovereignty Audit
The `App.tsx` contains a `ProductLoginView` that is shared across products. While it takes parameters, the logic for *when* to show it is hardcoded in the central router.

**Required Transition:**
- `fintech.jumo.com/login` (or `/fintech/login`) must trigger a Fintech-specific auth runtime.
- `nursery.jumo.com/login` (or `/nursery/login`) must trigger a Nursery-specific auth runtime.
- Currently, all login logic is centralized in the monolithic `App.tsx`.

## 4. Education ERP Reconstruction Requirements
The current `education-erp` directory acts as a "Universal Shell" that tries to be everything to everyone via a `TierSwitch`. 

**Reconstruction Plan:**
1.  **Extract Secondary ERP:** Create `src/products/secondary-erp` with its own `SecondaryErpWebShell.tsx`.
2.  **Contextualize FAAP:** Every school level has different financial needs. 
    - Nursery: Simple termly fees, nutrition costs.
    - Primary: PLE fees, thematic material costs.
    - Secondary: O/A Level fees, Lab fees, Boarding fees.
3.  **Independence:** Remove imports from `education-erp` in Nursery and Primary shells.
