# JUMO UEOS — PORTAL LOGIN FINAL MATRIX
**Status:** ARCHITECTURAL REFACTOR REQUIRED
**Date:** 2024-05-22

## 1. Login Sovereignty Audit
The requirement is for products to have "independent logins" and "independent identity boundaries".

| Product | Independent Login URL | Current Implementation Status | Boundary Type |
| :--- | :--- | :--- | :--- |
| **JUMO Fintech** | `/fintech/login` | Hardcoded in `App.tsx` | Shared component |
| **JUMO Nursery** | `/nursery/login` | Hardcoded in `App.tsx` | Shared component |
| **JUMO Primary** | `/primary/login` | Hardcoded in `App.tsx` | Shared component |
| **JUMO Secondary**| `/secondary/login` | Hardcoded in `App.tsx` | Shared component |
| **JUMO Church** | `/church/login` | Hardcoded in `App.tsx` | Shared component |
| **JUMO Alumni** | `/alumni/login` | Hardcoded in `App.tsx` | Shared component |

## 2. Transition Plan: Standalone Product Runtimes
To transition from a "shared component" to an "isolated standalone product runtime":

1.  **Registry-Driven Auth:** The router must use the `ApprovedProductRegistry` to determine the auth gate for each product path.
2.  **Sovereign Auth Views:** Each product folder (e.g., `/src/products/fintech/auth`) should contain its own `FintechLoginView` that is uniquely themed and strictly scoped to that product's roles.
3.  **Removal of Central `ProductLoginView`:** The universal `ProductLoginView` in `experience/pages` should be deprecated in favor of product-specific implementations.

## 3. Deployment & Route Visibility
Products currently "leak" into each other because they are all routed through a single `App.tsx`. 
**Target State:**
- Entering `/fintech` should only load the Fintech bundle and Auth.
- Entering `/nursery` should only load the Nursery bundle and Auth.
- Currently, the browser downloads the entire universal shell bundle on first load.
