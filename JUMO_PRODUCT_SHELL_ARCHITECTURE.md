# JUMO PRODUCT SHELL ARCHITECTURE
## Clean Enterprise Shell Standard & Workspace Layout

### 1. Executive Directive & Principle
The monolithic `UniversalPlatformShell` / `EnterpriseWorkspace` overlay has been decommissioned.
In its place, each of the **Three Approved Products** operates with a dedicated, optimized, single-tier product shell adhering to Microsoft 365 / Azure Portal standards:

1. **Ultra-Compact Single-Row Header**:
   - Left Zone: Product Wordmark & Logo, Global Product Switcher.
   - Center/Search Zone: Contextual Search across product modules and entities.
   - Right Action Zone: Cognitive AI Copilot trigger, Developer API portal trigger, Zero-Trust status indicator, User Profile & Logout.
   - Zero large decorative banners, zero multi-row clutter.

2. **Left Navigation / Grouped Sidebar**:
   - Clear categorized groupings with collapsible sections.
   - Safe icon rendering (every icon guaranteed non-null with default fallbacks).
   - Zero horizontal overflow.

3. **100% Usable Workspace Area**:
   - Real, interactive operational modules (dashboards, forms, tables, sandboxes, transaction monitors).
   - Module-level error boundaries ensuring that a failure in one module never crashes the entire shell.

4. **Universal Ultra-Compact Footer**:
   - Product version, real-time ledger parity indicator, and copyright.

---

### 2. Product Shell Registry

```
                    JUMO UEOS DELEGATED ROUTER
                               │
       ┌───────────────────────┼───────────────────────┐
       ▼                       ▼                       ▼
   JUMO FINTECH           JUMO EDUCATION          JUMO ALUMNI
   Product Shell           Product Shell          Product Shell
 (`FintechShell`)       (`EducationErpWebShell`)  (`AlumniErpWebShell`)
```

- **Fintech Shell** (`/src/products/fintech/FintechShell.tsx`):
  Houses the Financial Family Marketplace, live operational family workspaces, sandbox transaction injector, FAAP double-entry audit engine, and developer API suite.
- **Education Shell** (`/src/products/education-erp/web/EducationErpWebShell.tsx`):
  Houses Council Governance, Student Admissions, Registrar SIS, Senate Approvals, Bursary Accounts, Clinic, Library, and Hostel workspaces.
- **Alumni Shell** (`/src/products/alumni-erp/web/AlumniErpWebShell.tsx`):
  Houses Graduate Census, Global Chapters, Endowments & Giving, Career Mentorship, and Alumni Reunion workspaces.
