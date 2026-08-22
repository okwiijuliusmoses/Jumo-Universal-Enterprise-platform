# JUMO UEOS — SECONDARY FINAL RECONSTRUCTION AUDIT
**Status:** NON-COMPLIANT / FLATTENED
**Date:** 2024-05-22

## 1. Product Sovereign Shell
- **Current State:** **FLATTENED**. Secondary ERP is still served through the legacy `EducationErpWebShell` in `/src/products/education-erp`.
- **Requirement:** Extract into `/src/products/secondary-erp` with a sovereign `SecondaryErpWebShell`.

## 2. Capability Audit (St. Lawrence Benchmark)
The following capabilities must be reconstructed to meet the benchmark:
- [ ] **Secondary Senate:** Headteacher/Principal governance.
- [ ] **O/A Level Combinations:** Complex subject combination logic (e.g., PCM/Sub-Math).
- [ ] **UNEB Center Administration:** UCE and UACE candidate registration.
- [ ] **Secondary Bursar:** Integrated FAAP ledger for laboratory, boarding, and science fees.

## 3. FAAP Contextual Integration
- **Context:** Secondary/High School Ledger.
- **Current State:** Mixed with universal education bursar logic.

## 4. Corrective Reconstruction Plan
1.  **Extract Directory:** Create `src/products/secondary-erp`.
2.  **Shell Creation:** Build `SecondaryErpWebShell.tsx` based on St. Lawrence benchmark.
3.  **Portals Extraction:** Extract `RegistrarSIS`, `DosAcademic`, and `SecondaryBursar` from the universal shell into secondary-specific portals.
