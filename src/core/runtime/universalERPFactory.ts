/**
 * JUMO UEOS Universal ERP Factory Engine
 *
 * Sovereign enterprise manufacturing engine.
 *
 * Reads approved enterprise blueprints from ERPTemplateRegistry
 * and manufactures fully configured national-grade ERP instances.
 */

import ERPTemplateRegistry, { ERPTemplateDefinition, GovernanceNode, PublicExperienceConfig } from "./erpTemplateRegistry";
import EcosystemRegistry from "./ecosystemRegistry";

export interface InstitutionProfile {
  institutionId: string;
  institutionName: string;
  country?: string;
  region?: string;
  operator?: string;
}

export interface ERPInstanceConfiguration {
  portals: string[];
  portalDetails?: any[];
  departments: string[];
  modules: string[];
  workflows: string[];
  forms: string[];
  components: string[];
  apps: string[];
  services: string[];
  navigation: any[];
  aiProfile: string;
  governanceStructure?: GovernanceNode;
  publicExperience?: PublicExperienceConfig;
  securityProfile?: {
    dataSegregation: string;
    authPolicy: string;
    encryptionLevel: string;
  };
}

export interface ERPInstance {
  instanceId: string;
  templateId: string;
  templateName: string;
  ecosystemId: string;
  institution: InstitutionProfile;
  configuration: ERPInstanceConfiguration;
  apps: string[];
  modules: string[];
  services: string[];
  navigation: any[];
  workflows: string[];
  status: "ACTIVE" | "SUSPENDED";
  createdAt: string;
}

function normalizeERPInstance(inst: any): ERPInstance {
  if (!inst) return inst;
  const config = inst.configuration || {};
  const portals = Array.isArray(config.portals) ? config.portals : [];
  const portalNames = portals.map((p: any) => typeof p === "string" ? p : (p.name || p.id));
  const departments = Array.isArray(config.departments) ? config.departments : [];
  const modules = Array.isArray(config.modules) ? config.modules : (Array.isArray(inst.modules) ? inst.modules : []);
  const workflows = Array.isArray(config.workflows) ? config.workflows : (Array.isArray(inst.workflows) ? inst.workflows : []);
  const forms = Array.isArray(config.forms) ? config.forms : [];
  const components = Array.isArray(config.components) ? config.components : [];

  const apps = Array.isArray(config.apps) && config.apps.length > 0
    ? config.apps
    : (Array.isArray(inst.apps) && inst.apps.length > 0 ? inst.apps : portalNames);

  const services = Array.isArray(config.services) && config.services.length > 0
    ? config.services
    : (Array.isArray(inst.services) && inst.services.length > 0
      ? inst.services
      : ["FAAP Ledger Service", "Identity & Zero-Trust Service", "Workflow Engine Service"]);

  const navigation = Array.isArray(config.navigation) && config.navigation.length > 0
    ? config.navigation
    : (Array.isArray(inst.navigation) && inst.navigation.length > 0
      ? inst.navigation
      : [
          ...portalNames.map((p: string) => ({ id: p.toLowerCase().replace(/\s+/g, "-"), name: p, type: "PORTAL" })),
          ...modules.map((m: string) => ({ id: m.toLowerCase().replace(/\s+/g, "-"), name: m, type: "MODULE" })),
          ...departments.map((d: string) => ({ id: d.toLowerCase().replace(/\s+/g, "-"), name: d, type: "DEPARTMENT" })),
          ...workflows.map((w: string) => ({ id: w.toLowerCase().replace(/\s+/g, "-"), name: w, type: "WORKFLOW" })),
          ...services.map((s: string) => ({ id: s.toLowerCase().replace(/\s+/g, "-"), name: s, type: "SERVICE" }))
        ]);

  const normalizedConfig: ERPInstanceConfiguration = {
    ...config,
    portals: portalNames,
    portalDetails: config.portalDetails || [],
    departments,
    modules,
    workflows,
    forms,
    components,
    apps,
    services,
    navigation,
    aiProfile: config.aiProfile || "sovereign-ai"
  };

  return {
    ...inst,
    configuration: normalizedConfig,
    apps,
    modules,
    services,
    navigation,
    workflows,
    status: inst.status || "ACTIVE",
    createdAt: inst.createdAt || new Date().toISOString()
  };
}

const instances: ERPInstance[] = [
  {
    instanceId: "inst-university-main-01",
    templateId: "university-erp",
    templateName: "University ERP Platform Blueprint",
    ecosystemId: "education",
    institution: {
      institutionId: "univ-national-01",
      institutionName: "National Sovereign University",
      country: "Uganda",
      region: "Kampala Main Campus",
      operator: "Ministry of Education & Sports"
    },
    apps: [
      "Executive & Chancellery Portal",
      "Administration & HR Portal",
      "Academic & Senate Portal",
      "Registrar & Admissions Portal",
      "Finance & Bursar Portal",
      "Student Portal",
      "Staff & Faculty Portal"
    ],
    modules: [
      "Admissions Pipeline",
      "Student Information System (SIS)",
      "Academic LMS",
      "Examinations & Transcripts",
      "FAAP Treasury & Bursary",
      "HR & Payroll Engine",
      "Research Grant Ledger",
      "Digital Library",
      "Procurement & Supply Chain"
    ],
    services: [
      "FAAP Ledger Service",
      "Identity & Zero-Trust Service",
      "Academic SIS Service",
      "Workflow Engine Service"
    ],
    navigation: [],
    workflows: [
      "Online Admission Pipeline",
      "Semester Course Registration",
      "Tuition Fee Reconciliation",
      "Graduation Clearance Audit"
    ],
    configuration: {
      portals: [
        "Executive & Chancellery Portal",
        "Administration & HR Portal",
        "Academic & Senate Portal",
        "Registrar & Admissions Portal",
        "Finance & Bursar Portal",
        "Student Portal",
        "Staff & Faculty Portal"
      ],
      departments: [
        "Academic Affairs",
        "Admissions & Registrar",
        "FAAP Finance & Bursary",
        "Research & Innovation",
        "Library Services",
        "HR & Payroll",
        "ICT & Infrastructure"
      ],
      modules: [
        "Admissions Pipeline",
        "Student Information System (SIS)",
        "Academic LMS",
        "Examinations & Transcripts",
        "FAAP Treasury & Bursary",
        "HR & Payroll Engine",
        "Research Grant Ledger",
        "Digital Library",
        "Procurement & Supply Chain"
      ],
      workflows: [
        "Online Admission Pipeline",
        "Semester Course Registration",
        "Tuition Fee Reconciliation",
        "Graduation Clearance Audit"
      ],
      forms: ["Admission Application", "Course Registration", "Tuition Receipt"],
      components: ["Executive Dashboard", "Student Transcript Viewer", "FAAP Audit Ledger"],
      apps: [
        "Executive & Chancellery Portal",
        "Administration & HR Portal",
        "Academic & Senate Portal",
        "Registrar & Admissions Portal",
        "Finance & Bursar Portal",
        "Student Portal",
        "Staff & Faculty Portal"
      ],
      services: [
        "FAAP Ledger Service",
        "Identity & Zero-Trust Service",
        "Academic SIS Service",
        "Workflow Engine Service"
      ],
      navigation: [],
      aiProfile: "education-ai"
    },
    status: "ACTIVE",
    createdAt: "2026-08-01T08:00:00.000Z"
  },
  {
    instanceId: "inst-sacco-hq-01",
    templateId: "community-finance-erp",
    templateName: "Community Finance & SACCO Core Platform Blueprint",
    ecosystemId: "community-finance",
    institution: {
      institutionId: "sacco-national-union-01",
      institutionName: "Sovereign Community SACCO Union",
      country: "Kenya",
      region: "Nairobi Central Hub",
      operator: "Cooperative Regulatory Authority"
    },
    apps: [
      "Member Self-Service Portal",
      "Credit & Loans Officer Portal",
      "Executive Treasury & Board Portal"
    ],
    modules: [
      "Member Registry",
      "Savings & Fixed Deposits",
      "Loan Appraisal & Disbursal Engine",
      "Share Capital Ledger",
      "FAAP Core Banking Ledger",
      "Dividends Calculation Engine"
    ],
    services: [
      "FAAP Ledger Service",
      "Credit Scoring AI Service",
      "M-Pesa / Banking Bridge Service"
    ],
    navigation: [],
    workflows: [
      "Member Onboarding",
      "Loan Application & Credit Approval",
      "Loan Disbursement & FAAP Posting"
    ],
    configuration: {
      portals: [
        "Member Self-Service Portal",
        "Credit & Loans Officer Portal",
        "Executive Treasury & Board Portal"
      ],
      departments: [
        "Member Services",
        "Credit & Risk Assessment",
        "FAAP Treasury",
        "Internal Audit"
      ],
      modules: [
        "Member Registry",
        "Savings & Fixed Deposits",
        "Loan Appraisal & Disbursal Engine",
        "Share Capital Ledger",
        "FAAP Core Banking Ledger",
        "Dividends Calculation Engine"
      ],
      workflows: [
        "Member Onboarding",
        "Loan Application & Credit Approval",
        "Loan Disbursement & FAAP Posting"
      ],
      forms: ["Member Application", "Loan Request Form", "Guarantor Form"],
      components: ["Member Account Summary", "Loan Repayment Schedule", "FAAP Balance Sheet"],
      apps: [
        "Member Self-Service Portal",
        "Credit & Loans Officer Portal",
        "Executive Treasury & Board Portal"
      ],
      services: [
        "FAAP Ledger Service",
        "Credit Scoring AI Service",
        "M-Pesa / Banking Bridge Service"
      ],
      navigation: [],
      aiProfile: "finance-ai"
    },
    status: "ACTIVE",
    createdAt: "2026-08-02T10:30:00.000Z"
  }
];

export class UniversalERPFactory {
  static manufacture(
    templateId: string,
    institution: InstitutionProfile
  ): ERPInstance {
    const template = ERPTemplateRegistry.getById(templateId);

    if (!template) {
      throw new Error(`ERP template not found: ${templateId}`);
    }

    const ecosystem = EcosystemRegistry.getById(template.ecosystemId);

    if (!ecosystem) {
      throw new Error(`Ecosystem unavailable: ${template.ecosystemId}`);
    }

    const instanceId = `${template.id}-${Date.now()}`;

    const portals = Array.isArray(template.portals) ? template.portals : [];
    const portalNames = portals.map(p => typeof p === "string" ? p : (p.name || p.id));
    const departments = Array.isArray(template.departments) ? [...template.departments] : [];
    const modules = Array.isArray(template.modules) ? [...template.modules] : [];
    const workflows = Array.isArray(template.workflows) ? [...template.workflows] : [];
    const forms = Array.isArray(template.forms) ? [...template.forms] : [];
    const components = Array.isArray(template.components) ? [...template.components] : [];

    const apps = Array.isArray(template.apps) && template.apps.length > 0 ? [...template.apps] : portalNames;
    const services = Array.isArray(template.services) && template.services.length > 0 ? [...template.services] : ["FAAP Ledger Service", "Identity & Zero-Trust Service", "Workflow Engine Service"];

    const navigation: any[] = [];
    portalNames.forEach(p => navigation.push({ id: p.toLowerCase().replace(/\s+/g, "-"), name: p, type: "PORTAL" }));
    modules.forEach(m => navigation.push({ id: m.toLowerCase().replace(/\s+/g, "-"), name: m, type: "MODULE" }));
    departments.forEach(d => navigation.push({ id: d.toLowerCase().replace(/\s+/g, "-"), name: d, type: "DEPARTMENT" }));
    workflows.forEach(w => navigation.push({ id: w.toLowerCase().replace(/\s+/g, "-"), name: w, type: "WORKFLOW" }));
    services.forEach(s => navigation.push({ id: s.toLowerCase().replace(/\s+/g, "-"), name: s, type: "SERVICE" }));

    const configuration: ERPInstanceConfiguration = {
      portals: portalNames,
      portalDetails: template.portals || [],
      departments,
      modules,
      workflows,
      forms,
      components,
      apps,
      services,
      navigation,
      aiProfile: template.aiProfile || "sovereign-ai",
      governanceStructure: template.governanceStructure,
      publicExperience: template.publicExperience,
      securityProfile: template.securityProfile
    };

    const rawInstance: ERPInstance = {
      instanceId,
      templateId: template.id,
      templateName: template.name,
      ecosystemId: template.ecosystemId,
      institution,
      configuration,
      apps,
      modules,
      services,
      navigation,
      workflows,
      status: "ACTIVE",
      createdAt: new Date().toISOString()
    };

    const instance = normalizeERPInstance(rawInstance);
    instances.unshift(instance);
    return instance;
  }

  static getInstances(): ERPInstance[] {
    return instances.map(normalizeERPInstance);
  }

  static getInstance(id: string): ERPInstance | undefined {
    const instance = instances.find(inst => inst.instanceId === id);
    return instance ? normalizeERPInstance(instance) : undefined;
  }

  static suspend(id: string): ERPInstance | undefined {
    const instance = this.getInstance(id);
    if (instance) {
      instance.status = "SUSPENDED";
    }
    return instance;
  }

  static activate(id: string): ERPInstance | undefined {
    const instance = this.getInstance(id);
    if (instance) {
      instance.status = "ACTIVE";
    }
    return instance;
  }
}

export default UniversalERPFactory;
