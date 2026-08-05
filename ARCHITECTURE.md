# JUMO UEOS Enterprise Architecture Doctrine & Platform Specification

**Repository:** JUMO Universal Enterprise Platform  
**Branch:** `ueos-experience-shell-replacement`  
**Kernel Specification:** JUMO UEOS Sovereign Micro-Kernel v4.1  

---

## Executive Summary & Architectural Doctrine

**CRITICAL MANDATE FOR ALL DEVELOPERS AND AI MODELS:**  
JUMO UEOS (Universal Enterprise Operating System) is **NOT** a standard web app or a simple dashboard. JUMO UEOS is a **sovereign, multi-tenant enterprise operating system** designed to host national-grade institutional platforms, government authorities, university networks, microfinance federations, and enterprise conglomerates.

Any future model, agent, or developer working on this codebase **MUST** preserve and respect the core architecture defined in this document. Do **NOT** collapse the architecture into a flat dashboard or replace registry-driven runtime flows with hardcoded components.

---

## 1. The Three-Layer Platform Architecture

The system operates across three strictly segregated functional layers. Never merge or confuse these layers:

### LAYER 1: JUMO DIGITAL HYBRID PLATFORM (Public Ecosystem Layer)
- **Scope:** Public-facing web platform, ecosystem discovery, institution self-registration, public service catalog, regulatory announcements, and public AI assistant routing.
- **Entry Points:** `PublicPortal.tsx`, `/api/ueos/ecosystems`, `/api/v1/platform/status`
- **Users:** Citizens, prospective members, public visitors, external applicants, institutional partners.

### LAYER 2: JUMO UEOS CONTROL CENTER (Platform Governance Layer)
- **Scope:** Sovereign platform administration, Zero-Trust identity governance, Ecosystem Registry, ERP Template Factory, ERP Instance Lifecycle Engine, Configuration Engine, FAAP Treasury Ledger Engine, Workflow Studio (v17.x), and System Telemetry.
- **Entry Points:** `UEOSWorkspaceShell.tsx`, `/api/ueos/*`, `/api/v1/*`
- **Users:** Platform Administrators, SecOps Officers, System Auditors, Infrastructure Engineers.

### LAYER 3: ERP INSTANCE WORKSPACES (Institutional Operational Layer)
- **Scope:** Dedicated multi-tenant institutional workspaces (e.g., University ERP Instance, Hospital ERP Instance, Ministry ERP Instance, SACCO Federation ERP Instance).
- **Isolation:** Each instance maintains strictly segregated row-level data boundaries, institution-specific branding, governance trees, operational modules, and department structures bound to the shared FAAP financial backbone.
- **Portals:** Executive Portal, Administration Portal, Staff Portal, Student/User Portal, Public Services Portal, Partner Portal.

---

## 2. Universal ERP Template Principle & National-Grade Blueprint

Every **ERP Template** in JUMO UEOS is a **national-grade enterprise platform blueprint**, not a superficial UI template or simple CRUD form.

### Required Structure for Every ERP Template:
1. **Public Landing Platform:** Public institution profile, service menu, admissions/enrollment, news, public AI query router, and multi-portal login gateway.
2. **Multi-Portal Authentication Layer:** Role-tailored access gating for Executives, Administrators, Staff Officers, End-Users/Students, and External Partners.
3. **Governance Hierarchy Model:** Full structural representation of Governing Boards/Councils, Executive Offices, Directorates, Departments, Units, Branches, and Regional Operations.
4. **Configuration-Driven Operational Modules:** Dynamic loading of domain-specific modules (e.g., Academic SIS, FAAP Finance, HR & Payroll, Procurement, Library, Medical Records, Grant Stewardship) defined in configuration payloads rather than hardcoded component logic.

---

## 3. Configuration-Driven Pipeline (Source of Truth)

All institutional software capabilities inside JUMO UEOS flow strictly through the canonical registration pipeline:

```
[Ecosystem Registry]
        ↓
[ERP Template Registry]
        ↓
[Universal ERP Factory]
        ↓
[ERP Instance Registry]
        ↓
[Configuration Engine]
        ↓
[Runtime Workspace Shell]
```

- **Rule:** The frontend renders runtime configuration definitions served by the API. The frontend **MUST NOT** define or hardcode institutional enterprise hierarchies in static arrays.

---

## 4. Enterprise Application Shell Specification

The user interface adheres to a professional cloud-console design language (inspired by Microsoft 365, Google Cloud Console, Azure Portal, and SAP Fiori):

### Structural Design Rules:
1. **Top Application Bar:** Displays JUMO UEOS identity, current institutional context/tenant scope, quick search / Command Center (`Ctrl+K`), live security status indicator, notification drawer, and user identity profile.
2. **Adaptive Navigation Rail & App Launcher:** Collapsible left enterprise application launcher, responsive rail for tablet/desktop, and mobile-friendly application navigation bar.
3. **Adaptive Main Workspace Canvas:** Fluid canvas rendering executive summaries, registry tables, service status panels, and configuration forms with high legibility and minimal decoration.
4. **Anti-Slop Design Language:** No artificial dark-mode glows, no floating neon cards, no gaming aesthetics, no hardcoded demo metrics, and no gold gradients. Clean light/neutral slate enterprise palette (`#ffffff` canvas, `#f8fafc` background, `#0f172a` slate headers, `#0d9488` teal accents).

---

## 5. Mobile & Cross-Platform Support

All components and workspace modules must seamlessly adapt across:
- Desktop Web Browsers (1920px+)
- Enterprise Tablets & Touch Displays (768px - 1024px)
- Mobile Browsers & Hybrid Mobile Apps (iOS / Android viewports 360px - 430px)

Use mobile-first responsive utility patterns (`sm:`, `md:`, `lg:`, `xl:`) with touch target sizes exceeding `44px` on mobile displays.

---

## 6. ERP Template Enterprise Platform Contract

ERP Templates in JUMO UEOS are sovereign enterprise blueprints. They are NOT static lists or UI mockups.

Every ERP Template Contract MUST guarantee:
- **Public Experience:** Sovereign public landing page configuration, tagline, announcements, public services directory, and multi-portal gateway login controls ([Student Login], [Staff Login], [Administrator Login], [Create Account], [Institution Registration]).
- **Multi-Portal Authentication:** Specialized portals (Executive, Administration, Academic, Registrar, Finance, Student, Staff, Research, Library, HR, ICT, Procurement, Member, Officer) with role-tailored permissions and workflows.
- **Institutional Governance Hierarchy:** Complete structural representation of Governing Boards/Councils, Executive Offices, Directorates, Departments, Units, and Campuses/Branches.
- **Configuration-Driven Operational Modules:** Domain modules dynamically configured from template registries and instantiated by the Universal ERP Factory.
- **Zero Hardcoding Rule:** Frontend components MUST NEVER hardcode institutional enterprise structures; all structures MUST be rendered from registry definitions.

---

## 7. Guidelines for Future AI Models & Developers

When making modifications or adding new features:
1. **Preserve Kernel Integration:** Always route backend calls through `/api/ueos/*` and `/api/v1/*`.
2. **Maintain FAAP Parity:** Ensure all financial transactions debit and credit matching accounts ($0.00 offset) via the FAAP Treasury Engine.
3. **Enforce Zero-Trust Scoping:** Always attach `x-ueos-tenant`, `x-ueos-token`, and `x-ueos-roles` headers in API calls.
4. **No Static Data Overwrites:** Do not introduce static mock arrays in visual components when API registries exist.
