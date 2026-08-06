import { EcosystemRegistry } from "../runtime/ecosystemRegistry";
import { ERPTemplateRegistry } from "../runtime/erpTemplateRegistry";
import { WorkflowRegistry } from "../runtime/workflowRegistry";
import { ModuleRegistry } from "../runtime/moduleRegistry";
import { FormRegistry } from "../runtime/formRegistry";
import { ComponentRegistry } from "../runtime/componentRegistry";
import { 
  EnterpriseEcosystem, 
  EnterpriseTemplate, 
  EnterpriseModule, 
  EnterpriseForm, 
  EnterpriseComponent,
  EnterpriseWorkflow
} from "../../ueos/kernel/GovernanceEngine";

export class KernelBootstrap {
  static async execute() {
    console.log("[KERNEL] Initializing UEOS v5.1 Bootstrap sequence...");
    
    this.installComponents();
    this.installForms();
    this.installModules();
    this.installWorkflows();
    this.installEcosystems();
    this.installTemplates();
    
    console.log("[KERNEL] Bootstrap complete. Engine status: READY.");
  }

  private static installComponents() {
    const components: EnterpriseComponent[] = [
      { id: "comp-grid", name: "Enterprise Data Grid", type: "UI", description: "Advanced data table with filtering and export." },
      { id: "comp-ledger", name: "FAAP Ledger Viewer", type: "UI", description: "Real-time double-entry ledger visualization." },
      { id: "comp-workflow", name: "Workflow Timeline", type: "UI", description: "Interactive approval state tracking." },
      { id: "comp-chart", name: "Analytics Dashboard Widget", type: "UI", description: "Dynamic Recharts-based data visualizer." },
      { id: "comp-doc", name: "Sovereign Document Viewer", type: "UI", description: "Secure document indexing and rendering." }
    ];
    components.forEach(c => {
      ComponentRegistry.register(c);
    });
  }

  private static installForms() {
    const forms: EnterpriseForm[] = [
      { id: "form-admission", name: "Student Admission Form", fields: [], validation: {} },
      { id: "form-voucher", name: "Payment Voucher", fields: [], validation: {}, workflowBinding: "wf-payment-approval" },
      { id: "form-loan", name: "Loan Application", fields: [], validation: {}, workflowBinding: "wf-loan-assessment" },
      { id: "form-encounter", name: "Clinical Encounter Log", fields: [], validation: {} }
    ];
    forms.forEach(f => {
      FormRegistry.register(f);
    });
  }

  private static installModules() {
    const modules: EnterpriseModule[] = [
      { id: "mod-ledger", name: "FAAP General Ledger", category: "Finance", permissions: ["FINANCE_ADMIN"], workflows: [], forms: ["form-voucher"], reports: ["trial-balance"] },
      { id: "mod-loans", name: "Loan Portfolio Manager", category: "Finance", permissions: ["LOAN_OFFICER"], workflows: ["wf-loan-assessment"], forms: ["form-loan"], reports: ["arrears-report"] },
      { id: "mod-academics", name: "Academic Registry", category: "Education", permissions: ["REGISTRAR"], workflows: [], forms: ["form-admission"], reports: ["enrolment-summary"] },
      { id: "mod-clinical", name: "Clinical Management", category: "Healthcare", permissions: ["DOCTOR"], workflows: [], forms: ["form-encounter"], reports: ["patient-summary"] },
      { id: "mod-procurement", name: "Procurement & SCM", category: "Trade", permissions: ["PROCUREMENT_OFFICER"], workflows: ["wf-payment-approval"], forms: [], reports: [] },
      { id: "mod-hr", name: "HR & Payroll", category: "Corporate", permissions: ["HR_ADMIN"], workflows: [], forms: [], reports: [] },
      { id: "mod-inventory", name: "Inventory & Assets", category: "Industry", permissions: ["STORE_MANAGER"], workflows: [], forms: [], reports: [] }
    ];
    modules.forEach(m => {
      ModuleRegistry.register(m);
    });
  }

  private static installWorkflows() {
    const workflows: EnterpriseWorkflow[] = [
      { id: "wf-payment-approval", name: "Standard Payment Workflow", trigger: "FORM_SUBMIT", status: "Active", steps: [], approvals: [], roles: ["Accountant", "Finance Director"] },
      { id: "wf-loan-assessment", name: "Loan Credit Scoring", trigger: "FORM_SUBMIT", status: "Active", steps: [], approvals: [], roles: ["Loan Officer", "Credit Committee"] },
      { id: "wf-admission", name: "Academic Admission Cycle", trigger: "FORM_SUBMIT", status: "Active", steps: [], approvals: [], roles: ["Registrar", "Dean"] },
      { id: "wf-procurement", name: "Procurement Requisition", trigger: "FORM_SUBMIT", status: "Active", steps: [], approvals: [], roles: ["HOD", "Bursar"] }
    ];
    workflows.forEach(w => {
      WorkflowRegistry.register(w);
    });
  }

  private static installEcosystems() {
    const ecosystems: EnterpriseEcosystem[] = [
      { id: "ECO-EDU", name: "Education Ecosystem", version: "v5.2.0", category: "Social", description: "National Education Platform", governanceModel: "MINISTRY_OF_EDUCATION", supportedCountries: ["Uganda", "Zambia"], institutionTypes: ["UNIVERSITY", "SCHOOL"], templates: ["TPL-UNI-NATIONAL"], status: "Active", modules: ["mod-academics"], permissions: ["REGISTRAR"] },
      { id: "ECO-HEALTH", name: "Healthcare Ecosystem", version: "v5.2.0", category: "Social", description: "Universal Healthcare Platform", governanceModel: "MINISTRY_OF_HEALTH", supportedCountries: ["Uganda", "Kenya"], institutionTypes: ["HOSPITAL", "CLINIC"], templates: ["TPL-HOSP-NATIONAL"], status: "Active", modules: ["mod-clinical"], permissions: ["DOCTOR"] },
      { id: "ECO-SACCO", name: "SACCO & Cooperative Ecosystem", version: "v5.2.0", category: "Finance", description: "Community Finance Platform", governanceModel: "COOPERATIVE_COMMISSION", supportedCountries: ["Uganda", "Zambia"], institutionTypes: ["SACCO", "UNION"], templates: ["TPL-SACCO-PRO"], status: "Active", modules: ["mod-loans", "mod-ledger"], permissions: ["LOAN_OFFICER"] },
      { id: "ECO-BANK", name: "Banking & Financial Services Ecosystem", version: "v5.2.0", category: "Finance", description: "Commercial Banking Platform", governanceModel: "CENTRAL_BANK", supportedCountries: ["Global"], institutionTypes: ["BANK", "MFI"], templates: ["TPL-BANK-DIGITAL"], status: "Active", modules: ["mod-ledger"], permissions: ["FINANCE_ADMIN"] },
      { id: "ECO-RELIGIOUS", name: "Religious & Diocese Ecosystem", version: "v5.2.0", category: "Community", description: "Church & Diocese Platform", governanceModel: "EPISCOPAL_CONFERENCE", supportedCountries: ["Global"], institutionTypes: ["DIOCESE", "PARISH"], templates: ["TPL-DIOCESE-CORE"], status: "Active", modules: ["mod-ledger"], permissions: ["ADMIN"] },
      { id: "ECO-GOVT", name: "Government & Public Administration Ecosystem", version: "v5.2.0", category: "Governance", description: "National Public Service Platform", governanceModel: "CABINET_OFFICE", supportedCountries: ["National"], institutionTypes: ["MINISTRY", "AUTHORITY"], templates: ["TPL-GOVT-MINISTRY"], status: "Active", modules: ["mod-ledger"], permissions: ["PUBLIC_SERVANT"] },
      { id: "ECO-NGO", name: "NGO & Humanitarian Ecosystem", version: "v5.2.0", category: "Community", description: "International & National NGO Platform", governanceModel: "NGO_BOARD", supportedCountries: ["Global"], institutionTypes: ["INGO", "NGO"], templates: ["TPL-NGO-HQ"], status: "Active", modules: ["mod-ledger"], permissions: ["DIRECTOR"] },
      { id: "ECO-HOSPITALITY", name: "Hospitality & Tourism Ecosystem", version: "v5.2.0", category: "Trade", description: "Tourism & Hotel Management Platform", governanceModel: "TOURISM_BOARD", supportedCountries: ["Global"], institutionTypes: ["HOTEL", "RESORT"], templates: ["TPL-HOTEL-PRO"], status: "Active", modules: ["mod-ledger"], permissions: ["MANAGER"] },
      { id: "ECO-MANUFACTURING", name: "Manufacturing & Industrial Ecosystem", version: "v5.2.0", category: "Industry", description: "Industrial Production Platform", governanceModel: "MINISTRY_OF_INDUSTRY", supportedCountries: ["Global"], institutionTypes: ["FACTORY", "PLANT"], templates: ["TPL-FACTORY-CORE"], status: "Active", modules: ["mod-ledger"], permissions: ["SUPERVISOR"] },
      { id: "ECO-AGRIC", name: "Agriculture Ecosystem", version: "v5.2.0", category: "Industry", description: "Agricultural Value Chain Platform", governanceModel: "MINISTRY_OF_AGRICULTURE", supportedCountries: ["National"], institutionTypes: ["FARM", "PROCESSING_PLANT"], templates: ["TPL-AGRO-CORE"], status: "Active", modules: ["mod-ledger"], permissions: ["FARMER"] },
      { id: "ECO-TRADE", name: "Trade & Commerce Ecosystem", version: "v5.2.0", category: "Trade", description: "Commercial Enterprise Platform", governanceModel: "MINISTRY_OF_TRADE", supportedCountries: ["Global"], institutionTypes: ["ENTERPRISE", "WHOLESALER"], templates: ["TPL-TRADE-CORE"], status: "Active", modules: ["mod-ledger"], permissions: ["MERCHANT"] },
      { id: "ECO-LOGISTICS", name: "Transport & Logistics Ecosystem", version: "v5.2.0", category: "Industry", description: "Logistics & Supply Chain Platform", governanceModel: "MINISTRY_OF_TRANSPORT", supportedCountries: ["Global"], institutionTypes: ["LOGISTICS_HUB", "FLEET"], templates: ["TPL-LOGISTICS-PRO"], status: "Active", modules: ["mod-ledger"], permissions: ["DISPATCHER"] },
      { id: "ECO-INSURANCE", name: "Insurance Ecosystem", version: "v5.2.0", category: "Finance", description: "Insurance & Actuarial Platform", governanceModel: "INSURANCE_REGULATORY", supportedCountries: ["Global"], institutionTypes: ["INSURER", "BROKER"], templates: ["TPL-INSURE-CORE"], status: "Active", modules: ["mod-ledger"], permissions: ["ACTUARY"] },
      { id: "ECO-LEGAL", name: "Legal & Justice Ecosystem", version: "v5.2.0", category: "Governance", description: "Justice & Legal Services Platform", governanceModel: "JUDICIAL_COMMISSION", supportedCountries: ["National"], institutionTypes: ["COURT", "LAW_FIRM"], templates: ["TPL-COURT-CORE"], status: "Active", modules: ["mod-ledger"], permissions: ["JUDGE"] },
      { id: "ECO-HR", name: "Human Resource & Workforce Ecosystem", version: "v5.2.0", category: "Corporate", description: "Workforce Management Platform", governanceModel: "LABOR_MINISTRY", supportedCountries: ["Global"], institutionTypes: ["HR_AGENCY", "CORPORATE_HR"], templates: ["TPL-HR-GLOBAL"], status: "Active", modules: ["mod-ledger"], permissions: ["HR_MANAGER"] },
      { id: "ECO-REALESTATE", name: "Real Estate Ecosystem", version: "v5.2.0", category: "Trade", description: "Property & Land Management Platform", governanceModel: "LAND_MINISTRY", supportedCountries: ["Global"], institutionTypes: ["AGENCY", "DEVELOPER"], templates: ["TPL-RE-CORE"], status: "Active", modules: ["mod-ledger"], permissions: ["AGENT"] },
      { id: "ECO-ENERGY", name: "Utility & Energy Ecosystem", version: "v5.2.0", category: "Industry", description: "Utilities & Energy Grid Platform", governanceModel: "ENERGY_REGULATORY", supportedCountries: ["Global"], institutionTypes: ["UTILITY", "POWER_PLANT"], templates: ["TPL-ENERGY-GRID"], status: "Active", modules: ["mod-ledger"], permissions: ["ENGINEER"] },
      { id: "ECO-TELECOM", name: "Telecommunications Ecosystem", version: "v5.2.0", category: "Industry", description: "Telecom & ISP Platform", governanceModel: "COMMUNICATIONS_AUTHORITY", supportedCountries: ["Global"], institutionTypes: ["TELCO", "ISP"], templates: ["TPL-TELCO-CORE"], status: "Active", modules: ["mod-ledger"], permissions: ["ADMIN"] },
      { id: "ECO-RESEARCH", name: "Research & Innovation Ecosystem", version: "v5.2.0", category: "Education", description: "R&D and Innovation Platform", governanceModel: "SCIENCE_MINISTRY", supportedCountries: ["Global"], institutionTypes: ["INSTITUTE", "LAB"], templates: ["TPL-RESEARCH-CORE"], status: "Active", modules: ["mod-ledger"], permissions: ["RESEARCHER"] },
      { id: "ECO-CULTURE", name: "Family, Clan & Cultural Heritage Ecosystem", version: "v5.2.0", category: "Community", description: "Heritage & Cultural Registry Platform", governanceModel: "CULTURAL_AUTHORITY", supportedCountries: ["Global"], institutionTypes: ["CLAN", "KINGDOM"], templates: ["TPL-HERITAGE-CORE"], status: "Active", modules: ["mod-ledger"], permissions: ["ELDER"] },
      { id: "ECO-CORPORATE", name: "Enterprise Corporate Ecosystem", version: "v5.2.0", category: "Corporate", description: "Standard Corporate Platform", governanceModel: "COMPANIES_REGISTRY", supportedCountries: ["Global"], institutionTypes: ["CORPORATION", "SME"], templates: ["TPL-CORP-HQ"], status: "Active", modules: ["mod-ledger"], permissions: ["DIRECTOR"] }
    ];
    ecosystems.forEach(e => {
      EcosystemRegistry.register(e);
    });
  }

  private static installTemplates() {
    const templates: EnterpriseTemplate[] = [
      {
        id: "TPL-UNI-NATIONAL",
        name: "National University ERP Blueprint",
        ecosystemId: "ECO-EDU",
        description: "Universal operating system for national universities.",
        version: "v1.2.0",
        status: "Active",
        governance: { title: "University Council", role: "GOVERNING_BODY" },
        directorates: [
          { 
            id: "dir-academic", 
            name: "Academic Affairs", 
            governanceHead: "Academic Registrar",
            departments: [
              { id: "dept-registry", name: "Academic Registry", directorateId: "dir-academic", modules: ["mod-academics"], roles: ["REGISTRAR"] },
              { id: "dept-admissions", name: "Admissions Office", directorateId: "dir-academic", modules: ["mod-academics"], roles: ["ADMISSIONS_OFFICER"] }
            ] 
          },
          { 
            id: "dir-finance", 
            name: "Finance & Accounts", 
            governanceHead: "University Bursar",
            departments: [
              { id: "dept-accounts", name: "Expenditure & Revenue", directorateId: "dir-finance", modules: ["mod-ledger"], roles: ["ACCOUNTANT"] }
            ] 
          }
        ],
        portals: [
          { id: "portal-student", name: "Student Central", roles: ["STUDENT"], modules: ["mod-academics"], dashboards: ["db-student"] },
          { id: "portal-staff", name: "Academic Staff Terminal", roles: ["LECTURER"], modules: ["mod-academics"], dashboards: ["db-academic"] },
          { id: "portal-exec", name: "Executive Council Portal", roles: ["VC", "COUNCIL_MEMBER"], modules: ["mod-ledger", "mod-academics"], dashboards: ["db-executive"] }
        ],
        availableModules: [
          { id: "mod-academics", name: "Academic Registry", category: "Education", permissions: [], workflows: [], forms: ["form-admission"], reports: ["enrolment-summary"] },
          { id: "mod-ledger", name: "FAAP General Ledger", category: "Finance", permissions: [], workflows: [], forms: ["form-voucher"], reports: ["trial-balance"] }
        ],
        workflows: ["wf-payment-approval"],
        reports: ["trial-balance", "enrolment-summary"],
        integrations: ["M-PESA", "NATIONAL-ID-API"]
      },
      {
        id: "TPL-HOSP-NATIONAL",
        name: "National Referral Hospital Blueprint",
        ecosystemId: "ECO-HEALTH",
        description: "Universal health operating system for referral hospitals.",
        version: "v1.2.0",
        status: "Active",
        governance: { title: "Hospital Board", role: "GOVERNING_BODY" },
        directorates: [
          { 
            id: "dir-clinical", 
            name: "Clinical Services", 
            governanceHead: "Medical Director",
            departments: [
              { id: "dept-opd", name: "Outpatient Department", directorateId: "dir-clinical", modules: ["mod-clinical"], roles: ["DOCTOR", "NURSE"] },
              { id: "dept-ipd", name: "Inpatient Department", directorateId: "dir-clinical", modules: ["mod-clinical"], roles: ["DOCTOR", "NURSE"] }
            ] 
          }
        ],
        portals: [
          { id: "portal-doctor", name: "Doctor Clinical Terminal", roles: ["DOCTOR"], modules: ["mod-clinical"], dashboards: ["db-clinical"] },
          { id: "portal-nurse", name: "Nursing Station", roles: ["NURSE"], modules: ["mod-clinical"], dashboards: ["db-nursing"] }
        ],
        availableModules: [
          { id: "mod-clinical", name: "Clinical Management", category: "Healthcare", permissions: [], workflows: [], forms: ["form-encounter"], reports: ["patient-summary"] }
        ],
        workflows: ["wf-payment-approval"],
        reports: ["patient-summary", "census-report"],
        integrations: ["LAB-SYSTEM", "PHARMACY-HUB"]
      },
      {
        id: "TPL-SACCO-PRO",
        name: "SACCO Pro Enterprise Blueprint",
        ecosystemId: "ECO-SACCO",
        description: "Advanced financial operating system for cooperatives.",
        version: "v1.2.0",
        status: "Active",
        governance: { title: "SACCO Committee", role: "GOVERNING_BODY" },
        directorates: [
          { 
            id: "dir-operations", 
            name: "Credit & Operations", 
            governanceHead: "General Manager",
            departments: [
              { id: "dept-loans", name: "Credit Department", directorateId: "dir-operations", modules: ["mod-loans"], roles: ["LOAN_OFFICER"] }
            ] 
          }
        ],
        portals: [
          { id: "portal-officer", name: "Officer Terminal", roles: ["LOAN_OFFICER"], modules: ["mod-loans", "mod-ledger"], dashboards: ["db-ops"] },
          { id: "portal-member", name: "Member Self-Service", roles: ["MEMBER"], modules: ["mod-loans"], dashboards: ["db-member"] }
        ],
        availableModules: [
          { id: "mod-loans", name: "Loan Portfolio Manager", category: "Finance", permissions: [], workflows: ["wf-loan-assessment"], forms: ["form-loan"], reports: ["arrears-report"] }
        ],
        workflows: ["wf-loan-assessment", "wf-payment-approval"],
        reports: ["arrears-report", "trial-balance"],
        integrations: ["INTERSWITCH", "BANK-LINK"]
      }
    ];
    templates.push(
      {
        id: "TPL-GOVT-MINISTRY",
        name: "National Ministry OS Blueprint",
        ecosystemId: "ECO-GOVT",
        description: "Sovereign operating platform for government ministries and public authorities.",
        version: "v1.2.0",
        status: "Active",
        governance: { title: "Permanent Secretary Office", role: "EXECUTIVE_AUTHORITY" },
        directorates: [
          { 
            id: "dir-admin", 
            name: "Finance & Administration", 
            governanceHead: "Under Secretary",
            departments: [
              { id: "dept-finance", name: "Accounts & Budget", directorateId: "dir-admin", modules: ["mod-ledger"], roles: ["ACCOUNTANT"] },
              { id: "dept-hr", name: "Human Resources", directorateId: "dir-admin", modules: ["mod-hr"], roles: ["HR_ADMIN"] }
            ] 
          },
          { 
            id: "dir-policy", 
            name: "Policy & Planning", 
            governanceHead: "Director Policy",
            departments: [
              { id: "dept-planning", name: "Strategic Planning", directorateId: "dir-policy", modules: ["mod-procurement"], roles: ["PLANNER"] }
            ] 
          }
        ],
        portals: [
          { id: "portal-staff", name: "Public Servant Terminal", roles: ["STAFF"], modules: ["mod-ledger", "mod-hr"], dashboards: ["db-internal"] },
          { id: "portal-citizen", name: "Citizen Service Portal", roles: ["CITIZEN"], modules: ["mod-procurement"], dashboards: ["db-citizen"] }
        ],
        availableModules: [
          { id: "mod-ledger", name: "FAAP General Ledger", category: "Finance", permissions: [], workflows: [], forms: ["form-voucher"], reports: ["trial-balance"] },
          { id: "mod-hr", name: "HR & Payroll", category: "Corporate", permissions: [], workflows: [], forms: [], reports: [] }
        ],
        workflows: ["wf-payment-approval", "wf-procurement"],
        reports: ["budget-performance", "staff-census"],
        integrations: ["CENTRAL-BANK-RTGS", "NATIONAL-ID-HUB"]
      },
      {
        id: "TPL-NGO-HQ",
        name: "International NGO Global Blueprint",
        ecosystemId: "ECO-NGO",
        description: "Standardized platform for global NGO headquarters and country offices.",
        version: "v1.2.0",
        status: "Active",
        governance: { title: "Board of Trustees", role: "GOVERNING_BODY" },
        directorates: [
          { 
            id: "dir-programs", 
            name: "Program Management", 
            governanceHead: "Program Director",
            departments: [
              { id: "dept-mne", name: "Monitoring & Evaluation", directorateId: "dir-programs", modules: ["mod-ledger"], roles: ["MNE_OFFICER"] }
            ] 
          }
        ],
        portals: [
          { id: "portal-donor", name: "Donor Transparency Portal", roles: ["DONOR"], modules: ["mod-ledger"], dashboards: ["db-donor"] },
          { id: "portal-field", name: "Field Operations Hub", roles: ["FIELD_OFFICER"], modules: ["mod-ledger", "mod-procurement"], dashboards: ["db-field"] }
        ],
        availableModules: [
          { id: "mod-ledger", name: "FAAP General Ledger", category: "Finance", permissions: [], workflows: [], forms: ["form-voucher"], reports: ["trial-balance"] },
          { id: "mod-procurement", name: "Procurement & SCM", category: "Trade", permissions: [], workflows: [], forms: [], reports: [] }
        ],
        workflows: ["wf-payment-approval", "wf-procurement"],
        reports: ["grant-utilization", "impact-summary"],
        integrations: ["STRIPE-DONATIONS", "UN-REPORTS-API"]
      }
    );
    templates.forEach(t => {
      ERPTemplateRegistry.register(t);
    });
  }
}
