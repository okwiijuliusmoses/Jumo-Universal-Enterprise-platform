# JUMO UEOS PORTAL LOGIN VERIFICATION MATRIX

| Product ID | Sovereign Login Route | Auth Boundary Status | Standalone Shell | Workspace Isolation | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **JUMO FINTECH** | `/fintech/login` | ✅ IMPLEMENTED | ✅ STANDALONE | ✅ ISOLATED | Sovereign login via `ProductLoginView` |
| **JUMO NURSERY** | `/nursery/login` | ✅ IMPLEMENTED | ✅ STANDALONE | ✅ ISOLATED | Sovereign login via `ProductLoginView` |
| **JUMO PRIMARY** | `/primary/login` | ✅ IMPLEMENTED | ✅ STANDALONE | ✅ ISOLATED | Sovereign login via `ProductLoginView` |
| **JUMO SECONDARY** | `/secondary/login` | ✅ IMPLEMENTED | ✅ STANDALONE | ✅ ISOLATED | Sovereign login via `ProductLoginView` |
| **JUMO CHURCH** | `/church/login` | ✅ IMPLEMENTED | ✅ STANDALONE | ✅ ISOLATED | Sovereign login via `ProductLoginView` |
| **JUMO ALUMNI** | `/alumni/login` | ✅ IMPLEMENTED | ✅ STANDALONE | ✅ ISOLATED | Sovereign login via `ProductLoginView` |

## Transition Strategy for Sovereign Login Boundaries

### Phase 1: Logic Decoupling
1. Define `/products/[product-id]/login` routes in `App.tsx`.
2. Implement `ProductLoginView` that accepts `productId` and `branding` configuration.
3. Ensure successful login redirects *directly* to the product workspace, bypassing the universal launcher.

### Phase 2: Runtime Isolation
1. Every product shell must check for active session context *specific* to that product.
2. Logout from a product should return to that product's specific login page, not the global portal.

### Phase 3: Identity Provider (IDP) Linking
1. Map user roles to product-specific scopes (e.g., `ROLE_NURSERY_ADMIN` vs `ROLE_SECONDARY_ADMIN`).
2. Enforce `PortalAuthenticationGate` at the entry point of every standalone shell.
