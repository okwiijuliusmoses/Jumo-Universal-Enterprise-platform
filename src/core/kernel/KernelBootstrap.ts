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
import { AuditSystem } from "../security/AuditSystem";

export class KernelBootstrap {
  static async execute() {
    console.log("[KERNEL] Initializing UEOS v5.1 Bootstrap sequence...");
    AuditSystem.logAction({ action: "KERNEL_BOOTSTRAP", operator: "SYSTEM_BOOTSTRAP_ORCHESTRATOR", target: "UEOS_KERNEL", timestamp: Date.now(), status: 'APPROVED' });
    
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
      ModuleRegistry.register(m, "JUMO-VALID-SIG-2026");
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
      WorkflowRegistry.register(w, "JUMO-VALID-SIG-2026");
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
      EcosystemRegistry.register(e, "JUMO-VALID-SIG-2026");
    });
  }

  private static installTemplates() {
    const templates: EnterpriseTemplate[] = [
      // EDUCATION ECOSYSTEM
      {
        id: "TPL-UNI-NATIONAL",
        name: "National University ERP Blueprint",
        ecosystemId: "ECO-EDU",
        description: "Universal operating system for national universities with integrated research and admission engines.",
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
          { id: "dir-finance", name: "Finance & Accounts", governanceHead: "University Bursar", departments: [{ id: "dept-accounts", name: "Expenditure & Revenue", directorateId: "dir-finance", modules: ["mod-ledger"], roles: ["ACCOUNTANT"] }] }
        ],
        portals: [
          { id: "portal-student", name: "Student Portal", roles: ["STUDENT"], modules: ["mod-academics"], dashboards: ["db-student"] },
          { id: "portal-staff", name: "Academic Staff Portal", roles: ["LECTURER"], modules: ["mod-academics"], dashboards: ["db-academic"] },
          { id: "portal-registrar", name: "Registrar Portal", roles: ["REGISTRAR"], modules: ["mod-academics"], dashboards: ["db-registrar"] },
          { id: "portal-exec", name: "Executive Council Portal", roles: ["VC", "COUNCIL_MEMBER"], modules: ["mod-ledger", "mod-academics"], dashboards: ["db-executive"] }
        ],
        availableModules: [
          { id: "mod-academics", name: "Academic Registry", category: "Education", permissions: [], workflows: [], forms: ["form-admission"], reports: ["enrolment-summary"] },
          { id: "mod-ledger", name: "FAAP General Ledger", category: "Finance", permissions: [], workflows: [], forms: ["form-voucher"], reports: ["trial-balance"] }
        ],
        workflows: ["wf-payment-approval", "wf-admission"],
        reports: ["trial-balance", "enrolment-summary"],
        integrations: ["M-PESA", "NATIONAL-ID-API"]
      },
      {
        id: "TPL-COLLEGE-CORE",
        name: "National College ERP Blueprint",
        ecosystemId: "ECO-EDU",
        description: "Standardized platform for tertiary and vocational colleges.",
        version: "v1.0.0",
        status: "Active",
        governance: { title: "College Board of Governors", role: "GOVERNING_BODY" },
        directorates: [{ id: "dir-academics", name: "Instruction & Academics", governanceHead: "Principal", departments: [{ id: "dept-instruction", name: "Vocational Instruction", directorateId: "dir-academics", modules: ["mod-academics"], roles: ["INSTRUCTOR"] }] }],
        portals: [
          { id: "portal-student", name: "Student Hub", roles: ["STUDENT"], modules: ["mod-academics"], dashboards: ["db-student"] },
          { id: "portal-admin", name: "College Administration Portal", roles: ["ADMIN"], modules: ["mod-ledger"], dashboards: ["db-admin"] }
        ],
        availableModules: [{ id: "mod-academics", name: "Academic Registry", category: "Education", permissions: [], workflows: [], forms: [], reports: [] }],
        workflows: ["wf-admission"],
        reports: ["enrolment-summary"],
        integrations: ["MOBILE-MONEY"]
      },
      {
        id: "TPL-TECH-INSTITUTE",
        name: "Technical Institute ERP Blueprint",
        ecosystemId: "ECO-EDU",
        description: "Specialized OS for technical and vocational training institutes.",
        version: "v1.0.0",
        status: "Active",
        governance: { title: "Management Committee", role: "GOVERNING_BODY" },
        directorates: [{ id: "dir-tech", name: "Technical Training", governanceHead: "Principal", departments: [{ id: "dept-workshop", name: "Workshop Management", directorateId: "dir-tech", modules: ["mod-inventory"], roles: ["WORKSHOP_MANAGER"] }] }],
        portals: [{ id: "portal-trainee", name: "Trainee Portal", roles: ["STUDENT"], modules: ["mod-academics"], dashboards: ["db-trainee"] }],
        availableModules: [{ id: "mod-inventory", name: "Inventory & Assets", category: "Industry", permissions: [], workflows: [], forms: [], reports: [] }],
        workflows: [],
        reports: [],
        integrations: []
      },
      {
        id: "TPL-SCHOOL-SEC",
        name: "Secondary School ERP Blueprint",
        ecosystemId: "ECO-EDU",
        description: "National operating system for secondary and high schools.",
        version: "v1.0.0",
        status: "Active",
        governance: { title: "Board of Management", role: "GOVERNING_BODY" },
        directorates: [{ id: "dir-edu", name: "Teaching & Learning", governanceHead: "Head Teacher", departments: [{ id: "dept-exams", name: "Examination Office", directorateId: "dir-edu", modules: ["mod-academics"], roles: ["EXAM_OFFICER"] }] }],
        portals: [{ id: "portal-parent", name: "Parent Portal", roles: ["PARENT"], modules: ["mod-academics"], dashboards: ["db-parent"] }],
        availableModules: [{ id: "mod-academics", name: "Academic Registry", category: "Education", permissions: [], workflows: [], forms: [], reports: [] }],
        workflows: [],
        reports: ["performance-report"],
        integrations: ["SMS-GATEWAY"]
      },
      {
        id: "TPL-SCHOOL-PRIM",
        name: "Primary School ERP Blueprint",
        ecosystemId: "ECO-EDU",
        description: "Optimized platform for primary school administration and fee management.",
        version: "v1.0.0",
        status: "Active",
        governance: { title: "School Management Committee", role: "GOVERNING_BODY" },
        directorates: [{ id: "dir-admin", name: "School Admin", governanceHead: "Head Teacher", departments: [{ id: "dept-fees", name: "Bursary Office", directorateId: "dir-admin", modules: ["mod-ledger"], roles: ["BURSAR"] }] }],
        portals: [{ id: "portal-admin", name: "School Admin Portal", roles: ["ADMIN"], modules: ["mod-ledger"], dashboards: ["db-admin"] }],
        availableModules: [{ id: "mod-ledger", name: "FAAP General Ledger", category: "Finance", permissions: [], workflows: [], forms: [], reports: [] }],
        workflows: [],
        reports: [],
        integrations: []
      },
      {
        id: "TPL-EC-PRIMARY",
        name: "Early Childhood Development ERP Blueprint",
        ecosystemId: "ECO-EDU",
        description: "Specialized platform for Nursery and Pre-Primary schools.",
        version: "v1.0.0",
        status: "Active",
        governance: { title: "School Board", role: "GOVERNING_BODY" },
        directorates: [{ id: "dir-admin", name: "Early Learning Admin", governanceHead: "Director", departments: [{ id: "dept-nursery", name: "Nursery Unit", directorateId: "dir-admin", modules: ["mod-academics"], roles: ["TEACHER"] }] }],
        portals: [{ id: "portal-admin", name: "School Admin Portal", roles: ["ADMIN"], modules: ["mod-academics"], dashboards: ["db-admin"] }],
        availableModules: [{ id: "mod-academics", name: "Academic Registry", category: "Education", permissions: [], workflows: [], forms: [], reports: [] }],
        workflows: [],
        reports: [],
        integrations: []
      },
      {
        id: "TPL-DIST-LEARNING",
        name: "Distance Learning ERP Blueprint",
        ecosystemId: "ECO-EDU",
        description: "Sovereign platform for remote and online education providers.",
        version: "v1.0.0",
        status: "Active",
        governance: { title: "Distance Learning Council", role: "GOVERNING_BODY" },
        directorates: [{ id: "dir-online", name: "Online Programs", governanceHead: "Director", departments: [{ id: "dept-content", name: "Content Development", directorateId: "dir-online", modules: ["mod-academics"], roles: ["CONTENT_DEVELOPER"] }] }],
        portals: [{ id: "portal-elearning", name: "E-Learning Portal", roles: ["STUDENT"], modules: ["mod-academics"], dashboards: ["db-lms"] }],
        availableModules: [{ id: "mod-academics", name: "Academic Registry", category: "Education", permissions: [], workflows: [], forms: [], reports: [] }],
        workflows: [],
        reports: [],
        integrations: ["LMS-BRIDGE"]
      },

      // HEALTHCARE ECOSYSTEM
      {
        id: "TPL-HOSP-REFERRAL",
        name: "Referral Hospital ERP Blueprint",
        ecosystemId: "ECO-HEALTH",
        description: "Universal operating system for national and regional referral hospitals.",
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
          { id: "portal-doctor", name: "Doctor Portal", roles: ["DOCTOR"], modules: ["mod-clinical"], dashboards: ["db-clinical"] },
          { id: "portal-nurse", name: "Nurse Portal", roles: ["NURSE"], modules: ["mod-clinical"], dashboards: ["db-nursing"] },
          { id: "portal-exec", name: "Hospital Executive Portal", roles: ["DIRECTOR"], modules: ["mod-clinical", "mod-ledger"], dashboards: ["db-exec"] }
        ],
        availableModules: [
          { id: "mod-clinical", name: "Clinical Management", category: "Healthcare", permissions: [], workflows: [], forms: ["form-encounter"], reports: ["patient-summary"] }
        ],
        workflows: ["wf-payment-approval"],
        reports: ["patient-summary", "census-report"],
        integrations: ["LAB-SYSTEM", "PHARMACY-HUB"]
      },
      {
        id: "TPL-HOSP-DISTRICT",
        name: "District Hospital ERP Blueprint",
        ecosystemId: "ECO-HEALTH",
        description: "National OS for district-level secondary care hospitals.",
        version: "v1.0.0",
        status: "Active",
        governance: { title: "District Health Board", role: "GOVERNING_BODY" },
        directorates: [{ id: "dir-med", name: "Medical Services", governanceHead: "Medical Superintendent", departments: [{ id: "dept-pharmacy", name: "Central Pharmacy", directorateId: "dir-med", modules: ["mod-clinical"], roles: ["PHARMACIST"] }] }],
        portals: [{ id: "portal-nurse", name: "Nurse Portal", roles: ["NURSE"], modules: ["mod-clinical"], dashboards: ["db-nurse"] }],
        availableModules: [{ id: "mod-clinical", name: "Clinical Management", category: "Healthcare", permissions: [], workflows: [], forms: [], reports: [] }],
        workflows: [],
        reports: ["census-report"],
        integrations: ["NATIONAL-DRUG-STORE"]
      },
      {
        id: "TPL-CLINIC-PRIVATE",
        name: "Private Hospital ERP Blueprint",
        ecosystemId: "ECO-HEALTH",
        description: "Optimized platform for private hospitals and specialized medical centers.",
        version: "v1.0.0",
        status: "Active",
        governance: { title: "Executive Management Team", role: "GOVERNING_BODY" },
        directorates: [{ id: "dir-clinical", name: "Medical Operations", governanceHead: "Medical Director", departments: [{ id: "dept-billing", name: "Clinical Billing", directorateId: "dir-clinical", modules: ["mod-ledger"], roles: ["BILLING_CLERK"] }] }],
        portals: [{ id: "portal-admin", name: "Hospital Admin Portal", roles: ["ADMIN"], modules: ["mod-clinical", "mod-ledger"], dashboards: ["db-admin"] }],
        availableModules: [{ id: "mod-clinical", name: "Clinical Management", category: "Healthcare", permissions: [], workflows: [], forms: [], reports: [] }],
        workflows: [],
        reports: [],
        integrations: ["INSURANCE-PORTAL"]
      },
      {
        id: "TPL-HEALTH-CENTRE",
        name: "Health Centre ERP Blueprint",
        ecosystemId: "ECO-HEALTH",
        description: "Standardized platform for primary health centres (HC IV, III).",
        version: "v1.0.0",
        status: "Active",
        governance: { title: "Health Unit Management Committee", role: "GOVERNING_BODY" },
        directorates: [{ id: "dir-primary", name: "Primary Care", governanceHead: "In-Charge", departments: [{ id: "dept-mch", name: "Maternal & Child Health", directorateId: "dir-primary", modules: ["mod-clinical"], roles: ["MIDWIFE"] }] }],
        portals: [{ id: "portal-clinician", name: "Clinician Portal", roles: ["CLINICIAN"], modules: ["mod-clinical"], dashboards: ["db-clinical"] }],
        availableModules: [{ id: "mod-clinical", name: "Clinical Management", category: "Healthcare", permissions: [], workflows: [], forms: [], reports: [] }],
        workflows: [],
        reports: [],
        integrations: []
      },
      {
        id: "TPL-LAB-ERP",
        name: "Laboratory ERP Blueprint",
        ecosystemId: "ECO-HEALTH",
        description: "Specialized platform for medical diagnostic laboratories.",
        version: "v1.0.0",
        status: "Active",
        governance: { title: "Laboratory Board", role: "GOVERNING_BODY" },
        directorates: [{ id: "dir-lab", name: "Lab Operations", governanceHead: "Lab Director", departments: [{ id: "dept-testing", name: "Diagnostic Testing", directorateId: "dir-lab", modules: ["mod-clinical"], roles: ["LAB_TECH"] }] }],
        portals: [{ id: "portal-lab", name: "Lab Portal", roles: ["LAB_TECH"], modules: ["mod-clinical"], dashboards: ["db-lab"] }],
        availableModules: [{ id: "mod-clinical", name: "Clinical Management", category: "Healthcare", permissions: [], workflows: [], forms: [], reports: [] }],
        workflows: [],
        reports: [],
        integrations: ["LIS-HUB"]
      },
      {
        id: "TPL-PHARMACY-ERP",
        name: "Pharmacy ERP Blueprint",
        ecosystemId: "ECO-HEALTH",
        description: "Inventory and dispensing platform for pharmaceutical retailers and wholesalers.",
        version: "v1.0.0",
        status: "Active",
        governance: { title: "Pharmacy Management", role: "GOVERNING_BODY" },
        directorates: [{ id: "dir-dispensing", name: "Pharmaceutical Services", governanceHead: "Pharmacist", departments: [{ id: "dept-dispense", name: "Dispensing Unit", directorateId: "dir-dispensing", modules: ["mod-inventory"], roles: ["PHARMACIST"] }] }],
        portals: [{ id: "portal-dispenser", name: "Dispenser Portal", roles: ["PHARMACIST"], modules: ["mod-inventory"], dashboards: ["db-dispense"] }],
        availableModules: [{ id: "mod-inventory", name: "Inventory & Assets", category: "Industry", permissions: [], workflows: [], forms: [], reports: [] }],
        workflows: [],
        reports: [],
        integrations: []
      },

      // COMMUNITY FINANCE ECOSYSTEM
      {
        id: "TPL-SACCO-PRO",
        name: "SACCO Pro ERP Blueprint",
        ecosystemId: "ECO-SACCO",
        description: "Advanced financial operating system for large-scale cooperatives.",
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
          { id: "portal-officer", name: "Officer Portal", roles: ["LOAN_OFFICER"], modules: ["mod-loans", "mod-ledger"], dashboards: ["db-ops"] },
          { id: "portal-member", name: "Member Portal", roles: ["MEMBER"], modules: ["mod-loans"], dashboards: ["db-member"] },
          { id: "portal-manager", name: "Finance Manager Portal", roles: ["MANAGER"], modules: ["mod-ledger"], dashboards: ["db-manager"] }
        ],
        availableModules: [
          { id: "mod-loans", name: "Loan Portfolio Manager", category: "Finance", permissions: [], workflows: ["wf-loan-assessment"], forms: ["form-loan"], reports: ["arrears-report"] }
        ],
        workflows: ["wf-loan-assessment", "wf-payment-approval"],
        reports: ["arrears-report", "trial-balance"],
        integrations: ["INTERSWITCH", "BANK-LINK"]
      },
      {
        id: "TPL-MICROFINANCE",
        name: "Microfinance ERP Blueprint",
        ecosystemId: "ECO-SACCO",
        description: "Comprehensive platform for microfinance institutions and digital lenders.",
        version: "v1.0.0",
        status: "Active",
        governance: { title: "MFI Board", role: "GOVERNING_BODY" },
        directorates: [{ id: "dir-finance", name: "Financial Services", governanceHead: "CFO", departments: [{ id: "dept-credit", name: "Credit Office", directorateId: "dir-finance", modules: ["mod-loans"], roles: ["CREDIT_OFFICER"] }] }],
        portals: [{ id: "portal-staff", name: "MFI Staff Portal", roles: ["STAFF"], modules: ["mod-loans", "mod-ledger"], dashboards: ["db-staff"] }],
        availableModules: [{ id: "mod-loans", name: "Loan Portfolio Manager", category: "Finance", permissions: [], workflows: [], forms: [], reports: [] }],
        workflows: ["wf-loan-assessment"],
        reports: ["arrears-report"],
        integrations: ["MTN-MOMO", "STRIPE"]
      },
      {
        id: "TPL-CREDIT-UNION",
        name: "Credit Union ERP Blueprint",
        ecosystemId: "ECO-SACCO",
        description: "Sovereign platform for credit unions and savings societies.",
        version: "v1.0.0",
        status: "Active",
        governance: { title: "Supervisory Committee", role: "AUDIT_AUTHORITY" },
        directorates: [{ id: "dir-credit", name: "Credit Services", governanceHead: "Credit Manager", departments: [{ id: "dept-scoring", name: "Loan Assessment", directorateId: "dir-credit", modules: ["mod-loans"], roles: ["CREDIT_OFFICER"] }] }],
        portals: [{ id: "portal-teller", name: "Teller Portal", roles: ["TELLER"], modules: ["mod-ledger"], dashboards: ["db-teller"] }],
        availableModules: [{ id: "mod-loans", name: "Loan Portfolio Manager", category: "Finance", permissions: [], workflows: [], forms: [], reports: [] }],
        workflows: ["wf-loan-assessment"],
        reports: ["trial-balance"],
        integrations: ["CREDIT-BUREAU-API"]
      },

      // GOVERNMENT ECOSYSTEM
      {
        id: "TPL-GOVT-MINISTRY",
        name: "Ministry ERP Blueprint",
        ecosystemId: "ECO-GOVT",
        description: "Sovereign operating platform for national government ministries.",
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
          }
        ],
        portals: [
          { id: "portal-staff", name: "Public Servant Portal", roles: ["STAFF"], modules: ["mod-ledger", "mod-hr"], dashboards: ["db-internal"] },
          { id: "portal-citizen", name: "Citizen Service Portal", roles: ["CITIZEN"], modules: ["mod-procurement"], dashboards: ["db-citizen"] },
          { id: "portal-exec", name: "Permanent Secretary Portal", roles: ["PS"], modules: ["mod-ledger"], dashboards: ["db-exec"] }
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
        id: "TPL-GOVT-DISTRICT",
        name: "District Local Government Blueprint",
        ecosystemId: "ECO-GOVT",
        description: "Operating system for district local governments and municipal councils.",
        version: "v1.0.0",
        status: "Active",
        governance: { title: "District Council", role: "LEGISLATIVE_BODY" },
        directorates: [{ id: "dir-tech", name: "Technical Services", governanceHead: "District Engineer", departments: [{ id: "dept-roads", name: "Works & Infrastructure", directorateId: "dir-tech", modules: ["mod-procurement"], roles: ["ENGINEER"] }] }],
        portals: [{ id: "portal-official", name: "District Official Portal", roles: ["OFFICIAL"], modules: ["mod-ledger", "mod-procurement"], dashboards: ["db-admin"] }],
        availableModules: [{ id: "mod-ledger", name: "FAAP General Ledger", category: "Finance", permissions: [], workflows: [], forms: [], reports: [] }],
        workflows: ["wf-procurement"],
        reports: ["budget-performance"],
        integrations: ["IFMS-SYNC"]
      },
      {
        id: "TPL-CITY-AUTH",
        name: "City Authority ERP Blueprint",
        ecosystemId: "ECO-GOVT",
        description: "Sovereign platform for metropolitan city authorities.",
        version: "v1.0.0",
        status: "Active",
        governance: { title: "City Authority Council", role: "GOVERNING_BODY" },
        directorates: [{ id: "dir-revenue", name: "Revenue & Finance", governanceHead: "Director Revenue", departments: [{ id: "dept-tax", name: "Property Tax", directorateId: "dir-revenue", modules: ["mod-ledger"], roles: ["TAX_OFFICER"] }] }],
        portals: [{ id: "portal-resident", name: "Resident Portal", roles: ["RESIDENT"], modules: ["mod-ledger"], dashboards: ["db-resident"] }],
        availableModules: [{ id: "mod-ledger", name: "FAAP General Ledger", category: "Finance", permissions: [], workflows: [], forms: [], reports: [] }],
        workflows: [],
        reports: [],
        integrations: ["REVENUE-COLLECTION-HUB"]
      },

      // RELIGIOUS ECOSYSTEM
      {
        id: "TPL-DIOCESE-CORE",
        name: "Diocese ERP Blueprint",
        ecosystemId: "ECO-RELIGIOUS",
        description: "Comprehensive administration platform for church dioceses and provincial offices.",
        version: "v1.0.0",
        status: "Active",
        governance: { title: "Diocesan Council", role: "GOVERNING_BODY" },
        directorates: [
          { id: "dir-admin", name: "Diocesan Administration", governanceHead: "Diocesan Secretary", departments: [{ id: "dept-registry", name: "Parish Registry", directorateId: "dir-admin", modules: ["mod-hr"], roles: ["REGISTRAR"] }] }
        ],
        portals: [
          { id: "portal-clergy", name: "Clergy Portal", roles: ["CLERGY"], modules: ["mod-ledger"], dashboards: ["db-clergy"] },
          { id: "portal-parish", name: "Parish Portal", roles: ["PARISH_OFFICER"], modules: ["mod-ledger"], dashboards: ["db-parish"] },
          { id: "portal-bishop", name: "Bishop Portal", roles: ["BISHOP"], modules: ["mod-ledger"], dashboards: ["db-bishop"] }
        ],
        availableModules: [{ id: "mod-ledger", name: "FAAP General Ledger", category: "Finance", permissions: [], workflows: [], forms: [], reports: [] }],
        workflows: ["wf-payment-approval"],
        reports: ["trial-balance"],
        integrations: ["CELLULAR-MONEY-GATEWAY"]
      },
      {
        id: "TPL-PARISH-CORE",
        name: "Parish ERP Blueprint",
        ecosystemId: "ECO-RELIGIOUS",
        description: "Operational platform for individual parishes and mission stations.",
        version: "v1.0.0",
        status: "Active",
        governance: { title: "Parish Council", role: "LOCAL_AUTHORITY" },
        directorates: [{ id: "dir-pastoral", name: "Pastoral Services", governanceHead: "Parish Priest", departments: [{ id: "dept-tithe", name: "Tithe & Collections", directorateId: "dir-pastoral", modules: ["mod-ledger"], roles: ["TREASURER"] }] }],
        portals: [{ id: "portal-member", name: "Member Portal", roles: ["MEMBER"], modules: ["mod-ledger"], dashboards: ["db-member"] }],
        availableModules: [{ id: "mod-ledger", name: "FAAP General Ledger", category: "Finance", permissions: [], workflows: [], forms: [], reports: [] }],
        workflows: [],
        reports: ["trial-balance"],
        integrations: ["MOBILE-MONEY"]
      },
      {
        id: "TPL-CATHEDRAL-CORE",
        name: "Cathedral ERP Blueprint",
        ecosystemId: "ECO-RELIGIOUS",
        description: "Institutional platform for cathedrals and major pilgrimage sites.",
        version: "v1.0.0",
        status: "Active",
        governance: { title: "Cathedral Chapter", role: "GOVERNING_BODY" },
        directorates: [{ id: "dir-events", name: "Liturgical Services", governanceHead: "Dean", departments: [{ id: "dept-logistics", name: "Event Logistics", directorateId: "dir-events", modules: ["mod-inventory"], roles: ["VERGER"] }] }],
        portals: [{ id: "portal-visitor", name: "Visitor Portal", roles: ["VISITOR"], modules: ["mod-ledger"], dashboards: ["db-visitor"] }],
        availableModules: [{ id: "mod-inventory", name: "Inventory & Assets", category: "Industry", permissions: [], workflows: [], forms: [], reports: [] }],
        workflows: [],
        reports: [],
        integrations: []
      }
    ];
    templates.forEach(t => {
      ERPTemplateRegistry.register(t, "JUMO-VALID-SIG-2026");
    });
  }
}
