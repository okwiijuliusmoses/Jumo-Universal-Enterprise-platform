/**
 * JUMO UEOS
 * ERP Enterprise Configuration Standard
 */

export const ERPEnterpriseStandard = {
  getStandardProfile(blueprint) {
    const domain = (blueprint.domain || "").toLowerCase();
    let sectorPortals = [
      "Executive Portal",
      "Operations Portal",
      "Admin Portal",
      "Finance Portal",
      "Client/User Portal"
    ];
    let sectorModules = [
      "Core Operations",
      "Record Management",
      "Finance & Accounting",
      "Compliance & Governance",
      "Reporting & Analytics"
    ];
    let sectorForms = [
      "Intake Digital Form",
      "Approval Request Form",
      "Configuration Form",
      "Audit Report Form"
    ];
    let sectorWorkflows = [
      "Standard Approval Workflow",
      "Verification & Review Workflow",
      "Escalation Workflow",
      "Audit & Compliance Workflow"
    ];
    let sectorDepartments = [
      "Executive Office",
      "Operations Directorate",
      "Finance Directorate",
      "Compliance & Legal",
      "ICT & Systems"
    ];

    if (domain.includes("education") || blueprint.id === "education-erp") {
      sectorPortals = ["Student Portal", "Staff Portal", "Faculty Portal", "Administration Portal", "Finance Portal", "Research Portal"];
      sectorModules = ["Admissions", "Student Management", "Academic Management", "Examinations", "Learning Management", "Library", "Accommodation", "Research Administration", "Alumni Integration"];
      sectorForms = ["Admission Application Form", "Course Registration Form", "Examination Registration Form", "Payment & Fee Form", "Staff Recruitment Form", "Scholarship Application Form"];
      sectorWorkflows = ["Admission Approval Workflow", "Student Verification Workflow", "Invoice Approval Workflow", "Leave Approval Workflow", "Procurement Workflow", "Graduation Audit Workflow"];
      sectorDepartments = ["Office of Administration", "Academic Affairs", "Registry", "Finance Department", "Human Resources", "ICT Department", "Research Department", "Library"];
    } else if (domain.includes("government") || blueprint.id === "government-erp") {
      sectorPortals = ["Citizen Portal", "Ministry Portal", "Agency Portal", "Administration Portal", "Public Service Portal"];
      sectorModules = ["Citizen Management", "Revenue Management", "Procurement", "Budget Management", "Asset Management", "HR Management", "Document Management", "Case Management"];
      sectorForms = ["Citizen Registration Form", "License Application Form", "Permit Form", "Public Complaint Form", "Procurement Bid Form"];
      sectorWorkflows = ["Citizen Verification Workflow", "License Approval Workflow", "Budget Authorization Workflow", "Procurement Review Workflow", "Compliance Audit Workflow"];
      sectorDepartments = ["Executive Office", "Finance Department", "Planning Department", "Human Resources", "Citizen Services", "ICT Directorate", "Internal Audit"];
    } else if (domain.includes("finance") || domain.includes("banking") || blueprint.id === "banking-erp") {
      sectorPortals = ["Customer Portal", "Teller Portal", "Treasury Portal", "Compliance Portal", "Executive Portal", "Risk Management Portal"];
      sectorModules = ["Core Banking Engine", "Asset Management", "Liquidity Control", "Risk Assessment", "Regulatory Reporting", "Treasury Operations", "Customer 360", "Fraud Detection"];
      sectorForms = ["Account Opening Form", "Loan Application Form", "Credit Disbursement Form", "Wire Transfer Form", "KYC Verification Form"];
      sectorWorkflows = ["KYC Approval Workflow", "Loan Underwriting Workflow", "Fraud Escalation Workflow", "Treasury Settlement Workflow", "Regulatory Compliance Workflow"];
      sectorDepartments = ["Executive Board", "Treasury Directorate", "Risk Management", "Operations", "Compliance & AML", "Customer Services", "Internal Audit"];
    }

    return {
      portals: blueprint.portals || sectorPortals,
      modules: blueprint.modules || sectorModules,
      components: blueprint.components || [
        "Dashboard Engine",
        "Workflow Engine",
        "Notification Centre",
        "Document Management System",
        "Search Engine",
        "Reporting Engine",
        "Approval Engine",
        "Calendar & Scheduling",
        "Communication Centre",
        "AI Enterprise Assistant",
        "Audit Viewer",
        "Configuration Centre"
      ],
      forms: blueprint.forms || sectorForms,
      departments: blueprint.departments || sectorDepartments,
      workflows: blueprint.workflows || sectorWorkflows,
      roles: blueprint.roles || [
        "Sovereign Administrator",
        "Director",
        "Officer",
        "Auditor",
        "End User"
      ],
      permissions: blueprint.permissions || [
        "READ_ALL",
        "WRITE_ALL",
        "EXECUTE_WORKFLOW",
        "APPROVE_TRANSACTION",
        "SYSTEM_CONFIGURE"
      ],
      navigation: blueprint.navigation || {
        primary: ["Dashboard", "Portals", "Modules", "Workflows", "Reports", "Settings"],
        secondary: ["Audit Logs", "System Health", "Access Control"]
      },
      reports: blueprint.reports || [
        "Operational Activity Report",
        "Financial Summary Report",
        "Compliance Audit Trail",
        "System Utilization Report"
      ],
      dashboards: blueprint.dashboards || [
        "Executive Summary Dashboard",
        "Operations Overview",
        "Compliance Health Monitor"
      ],
      settings: blueprint.settings || {
        theme: "Enterprise Light",
        language: "en-US",
        timezone: "UTC",
        currency: "USD",
        securityLevel: "High"
      }
    };
  },

  validateCompliance(profile) {
    const required = [
      "portals",
      "modules",
      "components",
      "forms",
      "departments",
      "workflows",
      "settings"
    ];

    const missing = required.filter(key => !profile[key] || profile[key].length === 0);
    return {
      status: missing.length === 0 ? "COMPLIANT" : "NON_COMPLIANT",
      missing
    };
  }
};

