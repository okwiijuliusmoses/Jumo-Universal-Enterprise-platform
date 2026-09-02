# FINTECH UI METADATA CENSUS

**Authoritative Source:** `/src/products/canonical/fintech.ts`

## 1. ORGANIZATIONAL HIERARCHY
- **Products:** 1 (JUMO FINTECH)
- **Directorates:** 4
- **Departments:** 10
- **Offices:** 10
- **Lead Roles:** 10

## 2. OPERATIONAL NAVIGATION (METADATA)
- **Portals:** 5
  1. Executive (CEO/Board)
  2. Operations (Branch/Teller)
  3. Credit (Underwriting)
  4. Audit (Compliance/GL)
  5. Member (Public App)
- **Modules:** 9
- **Screens:** 9
- **Navigation Items:** 36 (mapped via portals-to-modules)

## 3. FUNCTIONAL CAPABILITIES
- **Capabilities:** 18 (2 per active module)
- **Service Actions:** 18 (Mapped to runtime service contracts)
- **Actions per Module:** Average 2

## 4. UI OBJECTS
- **Forms (Metadata Definitions):** 9
- **Form Fields (Total):** 39
- **Field Types:** text, number, select, password
- **Validation Rules:** 9 (e.g., NIN_VALID, AMOUNT_POSITIVE, DUAL_AUTH)
- **Tables (Registry Views):** 9
- **Table Columns:** 5 (Reference, Subject, Metric/Status, Verification, Action)
- **Reports (Metadata Definitions):** 9

## 5. DATABASE & WORKFLOW
- **Database Entities:** 9
- **Workflows:** 9
- **Workflow States:** 27 (3 per workflow: DRAFT -> PENDING -> COMPLETED)

## 6. SECURITY
- **Target Roles:** 6
- **Permissions:** 4 (Core Banking, Credit Risk, Digital Pay, Finance/Audit)
- **Auth Levels:** 3 (PKI_SOVEREIGN, STAFF, PUBLIC)
