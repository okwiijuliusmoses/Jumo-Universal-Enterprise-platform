/**
 * JUMO UEOS Ecosystem Registry
 *
 * Canonical hierarchy:
 * Ecosystem → ERP Templates → ERP Factory → ERP Instances
 *
 * An ecosystem is a classification boundary only.
 * It cannot be launched directly.
 * Only approved ERP templates can manufacture instances.
 */

export interface ERPSystemEcosystem {
  id: string;
  name: string;
  description: string;
  approvedTemplates: string[];
  governanceModel: string;
  institutionStructure: string;
  securityModel: string;
  aiServices: string[];
  workflowModel: string;
  reportingModel: string;
  integrationModel: string;
  status: "ACTIVE" | "DEPRECATED";
}

const ecosystems: ERPSystemEcosystem[] = [
  {
    id: "education",
    name: "Education ERP Ecosystem",
    description: "National-grade higher education, university networks, vocational training, secondary and primary institutional operating platforms.",
    approvedTemplates: [
      "university-erp",
      "college-erp",
      "technical-vocational-erp",
      "secondary-school-erp",
      "nursery-primary-erp",
      "alumni-erp",
      "EDU_UNIV_TEMPLATE",
      "EDU_COLLEGE_TEMPLATE",
      "EDU_TVET_TEMPLATE",
      "EDU_SECONDARY_TEMPLATE",
      "EDU_PRIMARY_TEMPLATE"
    ],
    governanceModel: "University Council & Senate / Academic Board / School Board",
    institutionStructure: "Chancellery → Vice Chancellor → Faculties → Schools → Departments → Campuses",
    securityModel: "Zero-Trust Multi-Campus Row-Level Segregation (RBAC + ABAC)",
    aiServices: ["Academic Admissions AI", "Student Success Predictor", "Research RAG Engine"],
    workflowModel: "Admissions Pipeline → Course Registration → Examination Grading → Graduation Clearance",
    reportingModel: "National Education Regulatory Compliance & Sovereign Academic Ledgers",
    integrationModel: "REST / GraphQL SIS Adapters & Payment Gateway Integration",
    status: "ACTIVE"
  },

  {
    id: "community-finance",
    name: "Community Finance & SACCO Ecosystem",
    description: "Financial co-operatives, credit unions, savings federations, and microfinance treasury operations.",
    approvedTemplates: [
      "community-finance-erp",
      "SACCO_HQ_TEMPLATE",
      "SACCO_BRANCH_TEMPLATE",
      "MICROFINANCE_ERP"
    ],
    governanceModel: "Board of Directors → Supervisory Committee → Executive Officers → Credit Committee",
    institutionStructure: "Headquarters → Regional Hubs → Branch Offices → Service Units → Field Officers",
    securityModel: "FAAP Treasury Parity & Encrypted Ledger Double-Entry Audit",
    aiServices: ["Credit Scoring AI", "Fraud Detection Swarm", "Dividend Yield Analyzer"],
    workflowModel: "Member Onboarding → Share Capital Subscriptions → Loan Appraisal → Disbursal → FAAP Ledger Posting",
    reportingModel: "Sovereign Banking & Central Bank Regulatory Compliance",
    integrationModel: "M-Pesa / Mobile Money APIs / SWIFT / FAAP Core Banking Ledger",
    status: "ACTIVE"
  },

  {
    id: "hospitality",
    name: "Hospitality & Tourism Ecosystem",
    description: "Hotels, resorts, tourism authorities, food service conglomerates, and guest experience platforms.",
    approvedTemplates: [
      "hospitality-erp",
      "HOSPITALITY_HOTEL_TEMPLATE",
      "RESORT_ERP_TEMPLATE"
    ],
    governanceModel: "Board of Management → General Manager → Departmental Heads → Service Teams",
    institutionStructure: "Group Holdings → Hotel Properties → Outlets → Front Desk & Housekeeping Units",
    securityModel: "PCI-DSS Compliant Guest Data Segregation & Shift Auditor Controls",
    aiServices: ["Dynamic Room Pricing AI", "Guest Preference RAG Engine"],
    workflowModel: "Guest Reservation → Check-in → Point of Sale Billing → Night Audit → FAAP Revenue Clearance",
    reportingModel: "Hospitality Revenue Management & Taxation Compliance",
    integrationModel: "OTA Channel Managers / POS Hardware APIs / Payment Gateways",
    status: "ACTIVE"
  },

  {
    id: "religious-diocese",
    name: "Religious & Diocese Governance Ecosystem",
    description: "Diocese, provinces, church federations, parish networks, and ministry stewardship platforms.",
    approvedTemplates: [
      "diocese-province-erp",
      "CHURCH_GOV_TEMPLATE",
      "PARISH_NETWORK_TEMPLATE"
    ],
    governanceModel: "Diocesan Synod → Bishop's Council → Archdeaconries → Parishes → Congregations",
    institutionStructure: "Diocese HQ → Deaneries → Local Parishes → Outreach Ministries",
    securityModel: "Multi-Parish Stewardship Isolation & Audit Log Verification",
    aiServices: ["Stewardship Analytics AI", "Community Welfare AI Advisor"],
    workflowModel: "Tithe & Offering Logging → Project Fund Allocations → Benevolence Disbursal → Synod Audit",
    reportingModel: "Faith Stewardship Accounting & FAAP Ledger Reporting",
    integrationModel: "Bank Direct Feeds / SMS Community Notifications / Donor Portals",
    status: "ACTIVE"
  },

  {
    id: "clan-heritage",
    name: "Clan, Heritage & Family Network Ecosystem",
    description: "Clan governance, royal kingdoms, family lineage registries, cultural heritage assets, and welfare funds.",
    approvedTemplates: [
      "clan-heritage-erp",
      "CLAN_HERITAGE_TEMPLATE",
      "KINGDOM_GOV_TEMPLATE"
    ],
    governanceModel: "Council of Elders → Clan Prime Minister → Lineage Heads → Family Units",
    institutionStructure: "Supreme Clan Council → Sub-Clans → Lineages → Household Registries",
    securityModel: "Lineage Privacy Protection & Sovereign Cultural Record Encryption",
    aiServices: ["Genealogy Tree Matcher AI", "Cultural Archive RAG Search"],
    workflowModel: "Member Birth/Lineage Registry → Welfare Contribution → Cultural Event Approval → Heritage Archive",
    reportingModel: "Clan Welfare Fund Audits & Heritage Repository Telemetry",
    integrationModel: "Sovereign Identity Verification / Community Mobile Money / Archival Indexing",
    status: "ACTIVE"
  },

  {
    id: "sovereign-govt",
    name: "Sovereign Government & Public Agency Ecosystem",
    description: "National authorities, public ministries, regulatory agencies, municipal councils, and citizen service delivery.",
    approvedTemplates: [
      "govt-agency-erp",
      "GOVT_AGENCY_TEMPLATE",
      "MINISTRY_ERP_TEMPLATE"
    ],
    governanceModel: "Cabinet Minister → Permanent Secretary → Directors General → Regional Officers",
    institutionStructure: "Ministry HQ → Executive Agencies → Regional Offices → District Service Centers",
    securityModel: "National Sovereign Encryption, Top-Secret Data Gating, & Zero-Trust RBAC",
    aiServices: ["Public Policy Intelligence AI", "Citizen Inquiry Assistant"],
    workflowModel: "Citizen Service Application → Verification → Inter-Agency Clearance → License Issue",
    reportingModel: "National Audit Office Compliance & Public Treasury Reporting",
    integrationModel: "National e-Government Gateway / Sovereign Digital ID / FAAP Ledger",
    status: "ACTIVE"
  },

  {
    id: "ngo-humanitarian",
    name: "NGO & Humanitarian Grant Ecosystem",
    description: "International NGOs, grant foundations, field aid programs, and donor-audited humanitarian missions.",
    approvedTemplates: [
      "ngo-grant-erp",
      "NGO_GRANT_TEMPLATE",
      "HUMANITARIAN_FIELD_TEMPLATE"
    ],
    governanceModel: "Board of Trustees → Executive Director → Program Directors → Field Officers",
    institutionStructure: "Global HQ → Country Offices → Project Sites → Field Deployment Units",
    securityModel: "Donor-Audited Row Segregation & Multi-Currency Cryptographic Vault",
    aiServices: ["Grant Compliance Audit AI", "Field Program Impact RAG"],
    workflowModel: "Grant Proposal → Donor Approval → Field Disbursement → Impact Verification → FAAP Audit",
    reportingModel: "UN / International Donor Compliance & Multi-Currency Ledger",
    integrationModel: "International Banking SWIFT / Satellite Field Communications / Donor Dashboards",
    status: "ACTIVE"
  }
];


export class EcosystemRegistry {

  static getAll(): ERPSystemEcosystem[] {
    return ecosystems;
  }


  static getById(id: string): ERPSystemEcosystem | undefined {
    return ecosystems.find(
      ecosystem => ecosystem.id === id
    );
  }


  static isApprovedTemplate(
    ecosystemId: string,
    templateId: string
  ): boolean {

    const ecosystem = this.getById(ecosystemId);

    if (!ecosystem) {
      return false;
    }

    return ecosystem.approvedTemplates.includes(templateId);
  }

}


export default EcosystemRegistry;
