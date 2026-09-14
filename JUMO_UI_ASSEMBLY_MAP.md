# JUMO_UI_ASSEMBLY_MAP

This map outlines how the complete native user interfaces of foundational applications are preserved and integrated into the Jumo platform. Jumo does NOT replace these mature interfaces; it provides a unified shell and identity layer around them.

---

## 1. INTEGRATION MECHANISMS

| Mechanism | Description | Primary Use Cases |
| :--- | :--- | :--- |
| **SSO / Keycloak** | Unified login across all applications using Keycloak as the Identity Provider (IdP). | All applications. |
| **Jumo Shell (Shell)** | A React-based top-bar/sidebar that remains visible or provides navigation back to the Jumo Dashboard. | Navigation, Tenant Switching. |
| **Reverse Proxy (Nginx)** | Routing subdomains (e.g., `erp.jumo.ug`) or paths (e.g., `jumo.ug/app/erpnext`) to the respective backend services. | Seamless browsing across services. |
| **Iframe (Isolated)** | Embedding the application UI within a Jumo frame for unified look-and-feel where technically compatible. | Reports, Dashboards. |
| **API Proxy** | Jumo Dashboards fetching data from mature APIs to show "Summary Cards" before deep-linking to the native UI. | Home Screen. |

---

## 2. APPLICATION UI MAPPING

### ERPNext (Frappe Desk)
- **Native UI**: Vue.js "Desk" Interface.
- **Entry Point**: `jumo.ug/app/erpnext`
- **Branding**: Jumo colors injected via custom Frappe CSS/App.
- **Integration**: Native UI preserved for all modules (Accounting, HR, etc.).

### Apache Fineract (Angular UI)
- **Native UI**: Angular-based "Community App".
- **Entry Point**: `jumo.ug/app/fineract`
- **Branding**: Jumo theme applied via CSS overrides.
- **Integration**: Native UI preserved for Loan/Savings management.

### Hyperswitch (React Dashboard)
- **Native UI**: React-based Control Center.
- **Entry Point**: `jumo.ug/app/payments`
- **Branding**: Native React components customized via Tailwind/CSS.

### Gibbon / ChurchCRM (AdminLTE)
- **Native UI**: PHP/AdminLTE based interfaces.
- **Entry Point**: `jumo.ug/app/gibbon` and `jumo.ug/app/church`
- **Branding**: Custom Jumo Header/Footer added to PHP templates.

---

## 3. UI ASSEMBLY WORKFLOW
1. **Identify native frontend root**: (e.g., `erpnext/public`, `fineract-ui/src`).
2. **Apply Jumo Theme**: Configure CSS variables or theme files to match Jumo's neutral palette.
3. **Inject Navigation**: Add a "Back to Jumo" launcher or link in the native sidebar/header.
4. **Configure SSO**: Ensure the native "Login" screen is replaced or bypassed by Keycloak SSO.

**STATUS: MAPPING IN PROGRESS.**
