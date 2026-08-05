# JUMO Universal Enterprise Operating System (UEOS) v6.2
## CONSOLIDATION_GUIDE.md - Safe Integration and Merge Guide

This document defines the strict, low-risk procedures for merging external modules and future enterprise layer updates into the JUMO UEOS repository. These instructions guarantee that no existing features, FAAP ledger integrity math, or security controls are lost during system modifications.

---

## 1. THE CONSOLIDATION GOLDEN RULES

To maintain a highly stable, production-ready codebase:
1.  **Do NOT Create Parallel Systems**: If a financial operation is added, it must integrate directly into FAAP. Do not create separate accounting databases or disconnected payment tables.
2.  **No Duplicate Modules**: Always leverage and extend existing shared services. Before writing a custom user registry, connect with the existing central Zero-Trust Identity Platform.
3.  **No File monoblocks**: Avoid placing extensive code blocks into single files. Separate concerns across `components/`, `database/`, `models/`, `repositories/`, and `schema/`.
4.  **Preserve the Micro-Kernel**: Do not add bloated third-party dependencies directly to `/server.ts`. Abstract them behind adapter contracts.

---

## 2. STEP-BY-STEP CONSOLIDATION WORKFLOW

Follow this sequence for every merge of new capabilities:

```text
┌──────────────────────────┐
│   Audit Repository State │ (Identify existing features)
└─────────────┬────────────┘
              ▼
┌──────────────────────────┐
│ Check Relational Schemas │ (Define DB tables and constraints)
└─────────────┬────────────┘
              ▼
┌──────────────────────────┐
│ Extend Shared Repositories│ (Implement double-entry validations)
└─────────────┬────────────┘
              ▼
┌──────────────────────────┐
│ Register via Event Bridge│ (Map events and triggers)
└─────────────┬────────────┘
              ▼
┌──────────────────────────┐
│ Update Capability Registry│ (Activate features dynamically)
└─────────────┬────────────┘
              ▼
┌──────────────────────────┐
│ Execute Build & Lint Tests│ (Confirm successful compilation)
└──────────────────────────┘
```

### STEP 1: Audit & Analysis
Run directory diagnostics and examine `/src/types.ts` to identify any shared enums or structures. This prevents namespace conflicts and duplicate types declarations.

### STEP 2: Database Schema Registration
Write your SQL tables and relational constraints. Incorporate them inside `/src/migrations/migration.ts` to guarantee tables boot up automatically during standard server seeding.

### STEP 3: Connect with FAAP Ledgers
All billing systems, royalty calculations, or transaction flows must write double-entry transactions using the centralized `LedgerRepository` inside `/src/repositories/repositories.ts`.

### STEP 4: Interface Binding
Create decoupling interfaces inside `/src/types.ts` to represent the external provider or AI workflow, keeping the business modules isolated from infrastructure details.

---

## 3. VERIFICATION AND SANITY CHECKS

Prior to completing any merge:
1.  **Verify Types Safety**: Compile with TypeScript type-checking to ensure there are no interface mismatches.
2.  **Run Build Verification**: Run `npm run build` to confirm both the Vite assets and Express bundles build successfully.
3.  **Inspect Assets File**: Open `/assets/ueos_database.json` to verify that local mock database transactions are recording correctly and that offsets are balanced.

---
**Verified and Released by the JUMO UEOS Supreme Core Architect**
