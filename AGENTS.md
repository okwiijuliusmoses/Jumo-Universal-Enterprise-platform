# JUMO UEOS Canonical Architecture & Hybrid Platform Completion Directive

The instructions below represent the authoritative system specifications, constraints, and platform completion requirements for JUMO Universal Enterprise Operating System (UEOS). Every agent instance MUST read, load, and strictly adhere to these architectural guidelines in all development, scaffolding, implementation, and system design phases.

---

## 1. Core Operating Philosophy
JUMO UEOS is an enterprise-grade hybrid operating system, NOT a standard web application. It operates under a micro-kernel architecture with a dynamic plugin registry, an abstract multi-model AI routing gateway, a state-authoritative ledger framework, and built-in support for distributed hybrid deployment.

## 2. Repository-First Completion
The imported repository is the authoritative implementation.
- **Do NOT** replace or recreate existing modules.
- Before implementing any feature, analyze the existing source code, reuse existing services, and extend existing modules.
- Connect disconnected components, merge duplicate implementations, and consolidate incomplete functionality.
- Keep parallel implementations strictly forbidden.

---

## 3. JUMO UEOS Canonical Hybrid Platform Completion Directive

The imported repository represents the canonical implementation of the JUMO Universal Enterprise Operating System (UEOS).
This repository is not simply an application. It is an extensible Enterprise Hybrid Operating System designed as a shared platform for multiple enterprise domains.

Your objective is to evolve the imported repository into the complete production-grade JUMO UEOS while preserving all existing architectural principles, repository organization, implementation patterns, and design conventions.

### Canonical Architecture Preservation
- **The existing architecture is the source of truth**: Do not introduce competing architectures.
- **No duplicate implementations**: Do not bypass shared services. Do not create isolated modules.
- **Platform-First Development Policy**: Every enhancement must integrate into the existing platform through the established runtime, registries, services, and dependency structure. The platform must remain modular, reusable, and independently deployable. Treat the repository as a Platform Kernel before treating it as an application. All enterprise domains must consume shared platform capabilities. Shared functionality must never be duplicated. Every new implementation must first determine whether an existing platform service should be extended instead of creating another implementation.

---

## 4. Complete the Platform Kernel
Implement and support a fully operational platform kernel responsible for:
- **Platform Boot Manager & Bootstrap**: Orchestrates boot sequence & runtime initialization.
- **Dependency Injection Container**: Manages service instantiation and dynamic binding.
- **Service & Domain Lifecycle Manager**: Controls dynamic service registration, module loading, domain lifecycle, and extension lifecycle.
- **Runtime Orchestration & Configuration**: Manages hot-reload registries, runtime feature flags, extensions, and environment parameters.
- **Platform Diagnostics & Telemetry**: Collects metrics, logs, health profiles, and orchestrates runtime recovery or graceful shutdowns.
- Every subsystem must initialize through the kernel.

---

## 5. Complete the Hybrid Runtime
Implement fully operational runtimes cooperating through the kernel:
- Enterprise Runtime
- Domain Runtime
- Workflow Runtime
- Integration Runtime
- AI Runtime
- Financial Runtime
- Event & Messaging Runtime
- Automation & Scheduler Runtime
- Edge, Offline & Synchronization Runtime
- Distributed Runtime

---

## 6. Complete Platform Registries & Runtime
Maintain registries supporting runtime discovery and dynamic hot-swappable configuration:
- Registries: Domain, Module, Service, Component, Workflow, API, Event, Extension, Plugin, AI, Configuration, Security, Integration, Resource, UI, and Deployment.
- All platform capabilities must be dynamically discoverable and support runtime feature registration.

---

## 7. Complete Shared Enterprise Platform Services
Ensure the following services are reusable across every enterprise domain without duplication:
- **Identity Platform**: Zero-Trust RBAC & ABAC, multi-tenancy, workspace, organization, user, and digital identity/MFA/SSO/session management.
- **Audit & Compliance**: Centralized logging, monitoring, telemetry, diagnostics, and backing up / disaster recovery.
- **Notification Engine**: Integrated messaging, email, SMS, push notifications, event-bus queues, and central automation/scheduling engines.
- **Document & File Management**: Central structured storage, indexing, and search capabilities.

---

## 8. Complete the Financial Backbone (FAAP)
The Financial & Accounting Platform (FAAP) is the shared financial engine for all domains:
- **Modules**: Treasury, General Ledger, Chart of Accounts, Budgeting, Revenue Management, Banking APIs, Procurement, Payroll, Billing, Tax, Asset Accounting, Cash & Investment Management, and Financial AI/Reporting/Compliance.
- **Constraint**: Every enterprise domain MUST integrate with FAAP rather than duplicating financial logic.

---

## 9. Complete Enterprise Domains
Domains are independently installable modules that share kernel platform services:
- **Domains**: SACCO ERP, Church ERP, Education ERP, NGO ERP, Government ERP, Healthcare, Agriculture, HR, CRM, Inventory, Logistics, and Document Management.
- **Builders**: CMS, Website Builder, Mobile Builder, API Builder, Workflow Builder, Form Builder, and Low-Code/No-Code Platform abstractions.
- Each domain must remain independently installable while sharing platform services.

---

## 10. Complete AI Hybrid Platform
Support a multi-provider cognitive ecosystem:
- **AI Gateway & AI Router**: Supports multi-model orchestration with provider abstraction (Google GenAI, Gemini, etc.), decoupling vendor dependencies.
- **AI Memory & Knowledge Base**: Maintains short/long-term context buffers and retrieval-augmented generation (RAG) structures.
- **Multi-Agent Orchestration**: Dynamic AI Agent Registry, AI Workflow/Decision Engines, and cooperative agent routines.
- **Specialized Cognitive Services**: Document Intelligence, OCR, Translation, Image/Speech processing, Predictive analytics, and AI Governance/Security.

---

## 11. Complete Integration & Deployment Platform
- **Integration**: Unified abstractions for REST, GraphQL, WebSockets, Event Streaming, Webhooks, and external adapters (Payment Gateways, Banking/Government APIs, Storage/Auth Providers).
- **Hybrid Deployment**: Supports identical runtime behavior across Local, Replit, Docker, VPS, Koyeb, Render, Kubernetes, Private/Public/Hybrid Cloud, and Edge/Offline environments.

---

## 12. Enterprise Security Architecture
- **Zero Trust**: Continuous authorization, Row-Level Database Segregation, and strict tenant-scope isolation.
- **Data Protection**: End-to-end encryption (at rest & in transit), Secrets and Key Management, API Rate-Limiting, threat/intrusion detection, and active compliance reporting.

---

## 13. Production Completion Standards
Every new layer, module, service, component, workflow, API, or model integration must include:
- Complete business logic and validation
- Comprehensive error handling and security controls
- Standard logging, metrics, auditing, and telemetry hooks
- Ready unit/integration tests and automated API documentation
- Native configuration support

---

## 14. Completion Definition
The project is considered complete only when:
1. Every verified architectural gap has been implemented.
2. Every planned hybrid layer, runtime, registry, and shared service is fully operational.
3. Every enterprise domain is seamlessly connected through shared platform services without duplication of logic.
4. The repository builds and compiles successfully.
5. The final report clearly distinguishes verified existing implementations from newly completed work and specifies any remaining external integrations that require external configuration credentials.

---

## 15. JUMO UEOS Enterprise Runtime Refresh & Page Composition Directive

### Phase: Cache Clearance, Runtime Validation, Module Positioning & Platform Organization

---

### EXECUTIVE DIRECTIVE

After every major UI architecture implementation, Gemini must verify that the running application is displaying the latest source code.

Many UI changes may appear incomplete because browsers, deployment layers, build artifacts, or cached assets continue serving previous versions.

Before judging any implementation as failed, perform complete cache clearance and runtime refresh procedures.

---

### PHASE 1 — DEVELOPMENT CACHE CLEARANCE

Perform the following after major frontend architecture changes.

**Local Development Environment**

Execute:
```bash
rm -rf node_modules/.vite
rm -rf dist
npm cache verify
npm run build
```

Restart the development server.

Verify that:
- New components load.
- Old bundles are removed.
- Updated styles appear.
- New routes are available.

---

### PHASE 2 — BROWSER CACHE CLEARANCE

For every UI verification:
Perform a hard refresh.

**Desktop:**
- **Chrome / Edge**: `Ctrl + Shift + R` (or `Cmd + Shift + R` on macOS)
- **Alternative**: Open Developer Tools → Network → Enable "Disable Cache" → Reload page

**Mobile:**
- Close browser completely.
- Clear browser cache.
- Reopen application.
- Reload the URL.

Verify:
- New header appears.
- New footer appears.
- New navigation appears.
- Old layouts disappear.

---

### PHASE 3 — PRODUCTION CACHE VERIFICATION

After deployment:

Verify:
- Latest commit hash.
- Deployment timestamp.
- Build timestamp.
- Generated asset versions.
- CDN cache status.

If old UI appears, check:
1. Deployment branch.
2. Build output.
3. Browser cache.
4. CDN cache.
5. Service worker cache.
6. Static asset references.

Do not assume implementation failed until cache layers are verified.

---

### PHASE 4 — ENTERPRISE PAGE COMPOSITION STANDARD

Every page shall follow this structure:

```
┌───────────────────────────────────────┐
│          UNIVERSAL HEADER             │
├──────────────┬────────────────────────┤
│              │                        │
│ LEFT         │                        │
│ NAVIGATION   │      WORKSPACE         │
│              │                        │
│              │                        │
├──────────────┴────────────────────────┤
│          UNIVERSAL FOOTER             │
└───────────────────────────────────────┘
```

---

### PAGE POSITIONING RULES

#### Header
**Purpose:** Global system navigation.
**Contains:**
- JUMO Logo
- Search
- Platform launcher
- Notifications
- User account
- AI access
- Help

*The header must not contain page-specific modules.*

---

#### Left Navigation
**Purpose:** Access to functions.
**Contains:**
- Platforms
- Modules
- Workspaces
- Reports
- Settings
- Administration

The navigation shall use:
- Groups
- Folders
- Expandable sections
- Role permissions

*Do not place large navigation menus in the workspace.*

---

#### Main Workspace
**Purpose:** User productivity.
**Contains:**
- Dashboards
- Forms
- Tables
- Reports
- Documents
- Analytics
- Workflows

The workspace is the user's working area. *Do not fill it with navigation cards.*

---

#### Right Context Panel (Optional)
**Contains:**
- AI assistant
- Quick actions
- Help
- Notifications
- Related information

*Must be collapsible.*

---

### PHASE 5 — PLATFORM ORGANIZATION MODEL

All enterprise platforms shall be organized in one location. Create **JUMO PLATFORM STORE**.

**Structure:**
```
Platform Store
├── Business Platforms
│   ├── Enterprise ERP
│   ├── Hospitality ERP
│   ├── Retail ERP
│   └── Manufacturing ERP
│
├── Institution Platforms
│   ├── Church ERP
│   ├── Education ERP
│   ├── Alumni ERP
│   └── Healthcare ERP
│
├── Government Platforms
│   ├── Ministry ERP
│   ├── Judiciary ERP
│   └── Public Administration ERP
│
└── Specialized Platforms
    ├── AI Platform
    ├── Finance Platform
    ├── Security Platform
    └── Marketplace Platform
```

---

### PHASE 6 — ERP INTERNAL STRUCTURE

Every ERP platform shall follow the same internal architecture.

**Example (Church ERP):**
```
Church ERP
├── Dashboard
├── Membership
├── Governance
├── Finance
├── Assets
├── Documents
├── Departments
├── Communication
├── AI Services
├── Reports
├── Settings
└── Administration
```
*The same pattern applies to every ERP.*

---

### PHASE 7 — SYSTEM LAYER ORGANIZATION

Separate the ecosystem into layers:
- **Layer 1:** Experience Layer
- **Layer 2:** Platform Layer
- **Layer 3:** Domain ERP Layer
- **Layer 4:** Service Layer
- **Layer 5:** AI Intelligence Layer
- **Layer 6:** Security & Governance Layer
- **Layer 7:** Infrastructure Layer

*Each layer should have its own management location.*

---

### PHASE 8 — OWNER CONTROL CENTER ORGANIZATION

The Owner Control Center shall manage layers, not display everything at once.

**Structure:**
```
Owner Control Center
├── System Overview
├── Platform Management
├── Domain Registry
├── ERP Factory
├── AI Command Center
├── Security Governance
├── Identity Management
├── Configuration Center
├── API Center
├── Documentation Center
├── Monitoring
├── Deployment
└── System Settings
```
*Each section opens its own workspace.*

---

### PHASE 9 — COMPONENT PLACEMENT RULES

**Do not place:**
- 30 modules on one page.
- Multiple dashboards together.
- Large collections of cards.
- Configuration panels beside operational screens.

**Instead, use:**
- Dedicated pages.
- Navigation folders.
- Tabs.
- Expandable sections.
- Search.
- Filters.

---

### PHASE 10 — MOBILE ADMINISTRATION

Every layout must support mobile.

**Mobile view:**
```
Header
  ↓
Menu Button
  ↓
Workspace
  ↓
Footer
```
- Navigation becomes collapsible.
- Platforms remain searchable.
- Important controls remain accessible.

---

### FINAL VERIFICATION CHECKLIST

Before completion verify:
- [x] Browser cache cleared
- [x] Build cache cleared
- [x] Deployment cache verified
- [x] Latest commit deployed
- [x] Universal header active
- [x] Universal footer active
- [x] Left navigation implemented
- [x] Workspace expanded
- [x] Modules grouped correctly
- [x] ERP platforms centralized
- [x] Mobile layout verified
- [x] No duplicate layouts remain

The final result must behave like a professional enterprise operating system where users navigate through organized platforms and workspaces rather than scrolling through crowded pages.

---

## 16. JUMO UEOS Enterprise Workspace Optimization Directive

### Phase: Compact Shell Design, Workspace Expansion & Component Grouping

---

### EXECUTIVE DIRECTIVE

The current system layout still behaves like a presentation website instead of an enterprise operating system.

JUMO UEOS must adopt the working principles of modern cloud management platforms:
- Maximum workspace visibility.
- Compact navigation.
- Minimal fixed screen occupation.
- Organized resource grouping.
- Mobile-friendly administration.
- Clear separation between navigation and workspace.

The goal is not to display everything on the screen.
The goal is to allow users to efficiently manage everything from one organized enterprise workspace.

---

### PHASE 1 — COMPACT UNIVERSAL HEADER REDESIGN
The header must be reduced further. The current header occupies too much vertical space. Create a compact enterprise header. Requirements:
- Single row. Reduced height. Minimal padding. Professional typography. Clear icons. Responsive design.
The header should contain only essential global controls:
JUMO Logo | Search | Platform Launcher | Notifications | Help | Account
Remove: Large banners. Oversized branding areas. Decorative elements. Excessive text.
The header must remain visible while maximizing workspace.

---

### PHASE 2 — UNIVERSAL FOOTER OPTIMIZATION
Create an ultra-compact footer. Requirements:
- Reduced padding. Small typography. Simple text layout. No decorative graphics. No large branding sections.
The footer should contain only:
System Status | Version | Copyright | Quick Links
The footer should be clean and unobtrusive.

---

### PHASE 3 — CLOUD PLATFORM STYLE WORKSPACE
The workspace must maximize usable screen area. Requirements:
- Expand workspace area.
- Reduce margins and padding.
- Organize components into logical panels.
- Remove unnecessary empty spaces.
- Ensure the layout adapts cleanly to different screen resolutions.
The interface should feel like a cloud management console (similar to AWS, Google Cloud, or Azure consoles).

---

### PHASE 4 — MOBILE-FIRST ADMINISTRATION
The system must be fully operable on mobile devices.
Mobile requirements:
- Collapsible navigation menu.
- Full-width workspace.
- Touch-friendly controls.
- Optimized tables and lists.
- Accessible system actions.
No component should overflow the screen.

---

### PHASE 5 — PUBLIC WELCOME PAGE REDESIGN
The public welcome page must look like an enterprise system gateway, not a marketing page.
Requirements:
- Clean white background.
- Compact welcome area.
- Clear system login options.
- Direct access to public services.
- Simple typography.
Remove: Large hero images. Decorative graphics. Oversized marketing text. Excessive spacing.
The page should immediately communicate the purpose of the JUMO system.

---

### PHASE 6 — REMOVE DARK PUBLIC DESIGN
The public welcome page must not use a dark presentation background.
It must use the official white enterprise background to maintain visual consistency with the internal system.

---

### PHASE 7 — OWNER CONTROL CENTER RESTRUCTURE
The Owner Control Center remains overcrowded. The current design incorrectly displays many components across the entire page. This must be corrected.
No operational component should randomly appear in the middle of the page.

NEW OWNER CONTROL CENTER STRUCTURE:
```
OWNER CONTROL CENTER
Header
  │
Left Navigation
├── Platform Management
├── Domain Registry
├── ERP Store
├── AI Command Center
├── Security
├── Identity
├── Configuration
├── APIs
├── Documentation
├── Monitoring
├── Deployment
└── Settings

Workspace Area
(Selected function only)
Footer
```

---

### PHASE 8 — COMPONENT GROUPING AND TABS
Instead of displaying all functions on one page, components must be grouped into logical workspaces.
Use:
- Left navigation folders.
- Workspace tabs.
- Expandable sections.
- Searchable lists.
Example:
Under **Platform Management**:
`[System Overview] [Kernel Status] [Active Nodes] [Telemetry]`
Under **ERP Store**:
`[Available ERPs] [Installed Domains] [Module Updates] [Licensing]`
This prevents screen clutter and improves usability.

---

### PHASE 9 — FOLDER AND SUB-PAGE NAVIGATION
Each administration section should open its own workspace.
When a user selects an item from the left navigation:
- The workspace updates to show only that function.
- Other modules remain hidden until selected.
- Breadcrumb navigation indicates the current location.
This ensures a professional cloud console experience.

---

### PHASE 10 — MOBILE OWNER CONTROL CENTER
On mobile devices, the Owner Control Center must adapt cleanly:
- Navigation becomes a slide-out drawer or compact menu.
- Workspace occupies 100% of the screen width.
- Cards and tables stack vertically.
- Controls remain easily reachable.

---

### PHASE 11 — REMOVE DECORATIVE UI
Remove unnecessary interface decorations:
- Large shadows.
- Heavy borders.
- Decorative graphics.
- Oversized icons.
- Excessive spacing between elements.
The focus must be on information density and operational efficiency.

---

### PHASE 12 — FINAL SYSTEM AUDIT
Before completing the task, verify the following:
- Header is compact and single-row.
- Footer is small and minimal.
- Public page uses a clean white enterprise layout.
- Owner Control Center is structured into folders/workspaces.
- No screen is overcrowded with components.
- Mobile layout works correctly across all screens.
- Navigation is clear and logical.


