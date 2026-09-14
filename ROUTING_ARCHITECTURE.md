# JUMO User Journey Map & Routing Architecture

This document defines the complete navigation and routing architecture for the JUMO Digital Hybrid Platform. All pages must be connected through this defined structure to prevent the platform from feeling like a collection of unrelated static screens.

## Architectural Principles
1. **No Isolated Pages:** Every button, menu item, card, and action must have a clear destination.
2. **Maintained State:** User authentication state determines the journey.
3. **Layered Environments:** Public pages, personal gateways, organization registration, and enterprise workspaces are separate architectural layers.

## Core Routing Map

### 1. PUBLIC WEBSITE (Unauthenticated Layer)
**Primary Entry Point:** `experience/gateway/index.html`
- **Home (`index.html`)**
- **Solutions** -> *Public Solutions Pages*
- **Enterprise Platforms** -> *Public Platform Pages*
- **Products** -> *Public Product Pages*
- **Resources** -> *Public Resource/Documentation Pages*
- **Support** -> *Public Support Portal*

*Navigation Actions:*
- `Sign In` -> Scrolls to/Opens Authentication section on Home.
- `Create Account` -> Opens Account Registration.

### 2. AUTHENTICATION (Transition Layer)
**Location:** Embedded in `experience/gateway/index.html` (Hero Section) or standalone auth pages.
- **Login Submission** -> Transitions user to the Personal Gateway.
- **Registration Submission** -> Transitions user to the Personal Gateway.

### 3. JUMO PERSONAL GATEWAY (Post-Login Transition Layer)
**Location:** `experience/gateway/workspace.html`
- The user's reception area for determining their next destination.
- **Actions:**
  - `Register Institution` -> Institution Registration Wizard
  - `Join Organization` -> Organization Search / Invitation Page
  - `Explore Solutions` -> Authenticated Solutions Explorer
  - `My Organizations` (Card selection) -> Specific Organization Tenant Workspace

### 4. ORGANIZATION WORKSPACE (Authenticated Tenant Layer)
**Location:** *To be implemented* (e.g., `experience/workspace/tenant.html`)
- Only accessible after selecting an organization from the Personal Gateway.
- **Modules:**
  - Applications Hub
  - Users & Roles
  - Departments
  - Finance & Administration
  - Reports & Analytics

## Implementation Guidelines
- Use `<a href="page.html">` for direct HTML navigation in static prototypes.
- For form submissions (like login), use `onsubmit="window.location.href='workspace.html'; return false;"` to simulate routing.
- Maintain the Enterprise Header across all public pages, and the simplified Gateway Header for post-login pages.
