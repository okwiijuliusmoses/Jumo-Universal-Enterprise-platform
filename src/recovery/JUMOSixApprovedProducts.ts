/**
 * JUMO UEOS — APPROVED SIX PRODUCT MASTER MANIFEST
 *
 * NON-NEGOTIABLE ARCHITECTURAL INVARIANT:
 * The six approved JUMO products are the ONLY products in scope for this recovery:
 * 1. JUMO FINTECH ERP (JUMO-FINTECH)
 * 2. JUMO NURSERY & PRIMARY CONSOLIDATED ERP (JUMO-NURSERY-PRIMARY-ERP)
 * 3. JUMO SECONDARY SCHOOL ERP (JUMO-SECONDARY-ERP)
 * 4. JUMO ALUMNI ERP (JUMO-ALUMNI-ERP)
 * 5. JUMO CHURCH ERP (JUMO-CHURCH-ERP)
 * 6. JUMO OWNER'S CONTROL CENTER / OWNER CONTROL PLATFORM (JUMO-OWNER-CONTROL-CENTER)
 *
 * NOTE:
 * Nursery & Primary are ONE consolidated ERP.
 * Secondary School is an independent sovereign ERP.
 */

export interface ApprovedProductDeclaration {
  id: string;
  code: string;
  name: string;
  displayName: string;
  kind: "ERP" | "CONTROL_CENTER";
  category: "FINTECH" | "EDUCATION" | "ALUMNI" | "CHURCH" | "OWNER_CONTROL";
  consolidated: boolean;
  constituentEducationLevels?: ("NURSERY" | "PRIMARY")[];
  educationLevel?: "SECONDARY";
  version: string;
  status: "PRODUCTION" | "VERIFIED" | "RECONCILED";
  canonicalRoute: string;
  description: string;
}

export const JUMO_SIX_APPROVED_PRODUCTS: readonly ApprovedProductDeclaration[] = Object.freeze([
  {
    id: "JUMO-FINTECH",
    code: "JUMO-FINTECH-01",
    name: "FINTECH ERP",
    displayName: "JUMO FINTECH & Financial Accounting (FAAP) Sovereign ERP",
    kind: "ERP",
    category: "FINTECH",
    consolidated: false,
    version: "14.0.0",
    status: "PRODUCTION",
    canonicalRoute: "/fintech",
    description: "Sovereign financial platform encompassing FAAP general ledger, universal payment switch, digital wallets, lending, trade finance, agent banking, and 38+ specialized financial modules."
  },
  {
    id: "JUMO-NURSERY-PRIMARY-ERP",
    code: "JUMO-EDU-01",
    name: "Nursery & Primary Consolidated ERP",
    displayName: "JUMO Nursery & Primary Consolidated Education ERP",
    kind: "ERP",
    category: "EDUCATION",
    consolidated: true,
    constituentEducationLevels: ["NURSERY", "PRIMARY"],
    version: "14.0.0",
    status: "PRODUCTION",
    canonicalRoute: "/nursery-primary",
    description: "Consolidated institution operating system uniting Early Childhood Development (ECD/Nursery milestones) and Primary School academics, admissions, bursary, clinic, catering, transport, and safeguarding into ONE sovereign ERP."
  },
  {
    id: "JUMO-SECONDARY-ERP",
    code: "JUMO-SEC-01",
    name: "Secondary School ERP",
    displayName: "JUMO Secondary & High School Sovereign ERP",
    kind: "ERP",
    category: "EDUCATION",
    consolidated: false,
    educationLevel: "SECONDARY",
    version: "14.0.0",
    status: "PRODUCTION",
    canonicalRoute: "/secondary",
    description: "Independent secondary institution operating system governing departmental heads (HOD), Director of Studies (DOS), Registrar, Bursar, examinations, curriculum, and Academic Senate."
  },
  {
    id: "JUMO-ALUMNI-ERP",
    code: "JUMO-ALUM-01",
    name: "Alumni ERP",
    displayName: "JUMO Alumni Advancement & Endowment Network ERP",
    kind: "ERP",
    category: "ALUMNI",
    consolidated: false,
    version: "14.0.0",
    status: "PRODUCTION",
    canonicalRoute: "/alumni",
    description: "Sovereign alumni advancement platform providing global chapters, graduate census, verified credential registry, giving campaigns, endowment management, and career networking."
  },
  {
    id: "JUMO-CHURCH-ERP",
    code: "JUMO-CH-01",
    name: "Church ERP",
    displayName: "JUMO Church & Diocesan Management Sovereign ERP",
    kind: "ERP",
    category: "CHURCH",
    consolidated: false,
    version: "14.0.0",
    status: "PRODUCTION",
    canonicalRoute: "/church",
    description: "Complete faith and diocesan operating system governing bishopric, synod, parish priest offices, sacramental registries, census intelligence, tithes ledger, and pastoral care."
  },
  {
    id: "JUMO-OWNER-CONTROL-CENTER",
    code: "JUMO-CTRL-04",
    name: "Owner's Control Center",
    displayName: "JUMO Sovereign Ring-0 Owner Command Center & Factory",
    kind: "CONTROL_CENTER",
    category: "OWNER_CONTROL",
    consolidated: false,
    version: "14.4.0-LTS",
    status: "PRODUCTION",
    canonicalRoute: "/control-center",
    description: "Privileged sovereign command plane managing Ring-0 verification, platform registry, ERP tenant provisioning, security policies (AEGIS), JUMO Trust integrity, and software factory."
  }
] as const);

export const APPROVED_PRODUCT_IDS = JUMO_SIX_APPROVED_PRODUCTS.map(p => p.id);
export const APPROVED_PRODUCT_COUNT = JUMO_SIX_APPROVED_PRODUCTS.length;

export function getApprovedProduct(id: string): ApprovedProductDeclaration | undefined {
  return JUMO_SIX_APPROVED_PRODUCTS.find(p => p.id === id);
}

export function isApprovedProduct(id: string): boolean {
  return JUMO_SIX_APPROVED_PRODUCTS.some(p => p.id === id);
}

export default JUMO_SIX_APPROVED_PRODUCTS;
