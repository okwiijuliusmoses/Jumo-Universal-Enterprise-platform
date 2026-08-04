/**
 * JUMO UEOS
 * Enterprise Department & Organizational Unit Generator
 *
 * Generates a complete five-tier hierarchy:
 * Enterprise -> Directorate -> Department -> Section -> Operational Unit
 * Hydrates and populates the organization, directorate, department, and position registries.
 */

import { organizationRegistry } from "../../../registry/organizationRegistry.js";
import { directorateRegistry } from "../../../registry/directorateRegistry.js";
import { departmentRegistry } from "../../../registry/departmentRegistry.js";
import { positionRegistry } from "../../../registry/positionRegistry.js";

const SECTOR_HIERARCHIES = {
  education: {
    governance: "Sovereign University Senate",
    directorates: [
      { name: "Executive Governing Council Office", head: "Chancellor Synod" },
      { name: "Office of the Vice Chancellor", head: "Vice Chancellor" },
      { name: "Academic Registrar Directorate", head: "Academic Registrar" },
      { name: "Finance & Accounts Directorate", head: "University Bursar" },
      { name: "Human Resources Directorate", head: "Director HR" },
      { name: "Research & Graduate Studies Directorate", head: "Dean of Research" },
      { name: "Student Welfare & Affairs Directorate", head: "Dean of Students" },
      { name: "ICT & Digital Transformation Directorate", head: "Director ICT" },
      { name: "Procurement & Assets Directorate", head: "Director Procurement" }
    ],
    departments: {
      "Academic Registrar Directorate": [
        { 
          name: "Admissions Department", 
          sections: [
            { name: "Undergraduate Admissions Section", units: ["Regular Intake Unit", "International Admissions Unit"] },
            { name: "Postgraduate Admissions Section", units: ["Research Admissions Unit"] }
          ] 
        },
        { 
          name: "Examinations Department", 
          sections: [
            { name: "Results Processing Section", units: ["Transcript Processing Unit", "Certificate Clearance Unit"] }
          ] 
        }
      ],
      "Finance & Accounts Directorate": [
        { 
          name: "Bursary Department", 
          sections: [
            { name: "Tuition Revenue Section", units: ["Student Billing Unit", "Sponsor Invoicing Unit"] }
          ] 
        },
        { 
          name: "Treasury & Payments Department", 
          sections: [
            { name: "Payroll Settlement Section", units: ["Vendor Disbursement Unit"] }
          ] 
        }
      ]
    }
  },
  government: {
    governance: "Cabinet Executive Assembly",
    directorates: [
      { name: "Ministerial Cabinet Secretariat", head: "Honorable Minister" },
      { name: "Office of the Permanent Secretary", head: "Permanent Secretary" },
      { name: "Administration & Civil Service HR Directorate", head: "Director Administration" },
      { name: "Public Finance Directorate", head: "Director Finance" },
      { name: "Planning & Policy Research Directorate", head: "Director Policy" },
      { name: "Procurement & Public Assets Directorate", head: "Director Procurement" },
      { name: "Public Audit & Compliance Directorate", head: "Director Compliance" },
      { name: "Citizen Services & Public Relations Directorate", head: "Director Citizen Services" }
    ],
    departments: {
      "Public Finance Directorate": [
        { 
          name: "Budgeting & Planning Department", 
          sections: [
            { name: "Fiscal Allocation Section", units: ["Quarterly Disbursement Unit"] }
          ] 
        },
        { 
          name: "Public Accounts Department", 
          sections: [
            { name: "Revenue Audit Section", units: ["Treasury Single Account Sync Unit"] }
          ] 
        }
      ],
      "Procurement & Public Assets Directorate": [
        { 
          name: "Tendering & Sourcing Department", 
          sections: [
            { name: "Public Bid Evaluation Section", units: ["Contract Awarding Unit"] }
          ] 
        }
      ]
    }
  },
  banking: {
    governance: "Executive Board of Governors",
    directorates: [
      { name: "Executive Boardroom", head: "Board Chairman" },
      { name: "Office of the Chief Executive (CEO)", head: "CEO" },
      { name: "Credit & Risk Assessment Directorate", head: "Chief Risk Officer" },
      { name: "Treasury & Capital Management Directorate", head: "Chief Treasurer" },
      { name: "Operations & Branch Network Directorate", head: "Director Operations" },
      { name: "Compliance & AML Monitoring Directorate", head: "Chief Compliance Officer" },
      { name: "Customer Relations & 360 Directorate", head: "Director Customer Experience" },
      { name: "ICT & Transaction Security Directorate", head: "Chief Technology Officer" }
    ],
    departments: {
      "Credit & Risk Assessment Directorate": [
        { 
          name: "Credit Underwriting Department", 
          sections: [
            { name: "Corporate Loan Appraisal Section", units: ["Retail Credit Scoring Unit"] }
          ] 
        },
        { 
          name: "Risk Management Department", 
          sections: [
            { name: "Market Risk Assessment Section", units: ["Stress Testing Unit"] }
          ] 
        }
      ],
      "Treasury & Capital Management Directorate": [
        { 
          name: "Liquidity Control Department", 
          sections: [
            { name: "Reserve Ratio Compliance Section", units: ["Sovereign Bond Trading Unit"] }
          ] 
        }
      ]
    }
  },
  healthcare: {
    governance: "Medical Advisory Council",
    directorates: [
      { name: "Medical Advisory Board", head: "Board President" },
      { name: "Office of the Chief Medical Officer", head: "Chief Medical Officer" },
      { name: "Clinical Services Directorate", head: "Director Clinical Services" },
      { name: "Nursing & Patient Care Directorate", head: "Director Nursing" },
      { name: "Pharmacy & Diagnostics Directorate", head: "Chief Pharmacist" },
      { name: "Hospital Administration & Finance Directorate", head: "Director Hospital Admin" },
      { name: "Health Records & ICT Directorate", head: "Director Health Informatics" },
      { name: "Public Health & Outreach Directorate", head: "Director Public Health" }
    ],
    departments: {
      "Clinical Services Directorate": [
        { 
          name: "Emergency Medicine Department", 
          sections: [
            { name: "Trauma Care Section", units: ["Ambulance Dispatch Unit"] }
          ] 
        },
        { 
          name: "Inpatient Care Department", 
          sections: [
            { name: "Intensive Care Section", units: ["Surgical Wards Unit"] }
          ] 
        }
      ],
      "Pharmacy & Diagnostics Directorate": [
        { 
          name: "Pharmacy Procurement Department", 
          sections: [
            { name: "Inpatient Drug Dispensation Section", units: ["Narcotics Vault Control Unit"] }
          ] 
        }
      ]
    }
  },
  agriculture: {
    governance: "Cooperative Trustees Synod",
    directorates: [
      { name: "Cooperative Board of Trustees", head: "Board Chairman" },
      { name: "Office of the Managing Director", head: "Managing Director" },
      { name: "Agronomy & Quality Control Directorate", head: "Chief Agronomist" },
      { name: "Field Production & Processing Directorate", head: "Director Production" },
      { name: "Supply Chain & Logistics Directorate", head: "Director Supply Chain" },
      { name: "Financial Clearing & SACCO Directorate", head: "Director Finance" },
      { name: "Market Intelligence & Sales Directorate", head: "Director Sales" }
    ],
    departments: {
      "Field Production & Processing Directorate": [
        { 
          name: "Crop Cultivation Department", 
          sections: [
            { name: "Soil Health Assessment Section", units: ["Irrigation Scheduling Unit"] }
          ] 
        },
        { 
          name: "Post-Harvest Processing Department", 
          sections: [
            { name: "Milling & Packing Section", units: ["Cold Storage Quality Unit"] }
          ] 
        }
      ]
    }
  }
};

export class DepartmentGenerator {
  generate(blueprint, directive = {}) {
    let sectorKey = "education";
    const erpId = blueprint.id || "";
    
    if (erpId.includes("gov")) sectorKey = "government";
    else if (erpId.includes("bank") || erpId.includes("finance")) sectorKey = "banking";
    else if (erpId.includes("health")) sectorKey = "healthcare";
    else if (erpId.includes("agri")) sectorKey = "agriculture";
    else if (blueprint.category?.toLowerCase().includes("public") || blueprint.category?.toLowerCase().includes("gov")) sectorKey = "government";
    else if (blueprint.category?.toLowerCase().includes("finance") || blueprint.category?.toLowerCase().includes("bank")) sectorKey = "banking";
    else if (blueprint.category?.toLowerCase().includes("health")) sectorKey = "healthcare";
    else if (blueprint.category?.toLowerCase().includes("agri")) sectorKey = "agriculture";

    const config = SECTOR_HIERARCHIES[sectorKey] || SECTOR_HIERARCHIES.education;
    const erpInstanceId = directive.instanceId || `${blueprint.id}-instance`;
    const institutionType = directive.name || blueprint.name;

    // Register organization level
    organizationRegistry.register({
      id: erpInstanceId,
      name: `${institutionType} National Platform`,
      type: blueprint.category || "Enterprise Platform",
      jurisdiction: "Federal"
    });

    const flatDepartmentsList = [];

    // Register Directorates and nested items
    config.directorates.forEach(dir => {
      const directorateRecord = directorateRegistry.register({
        name: dir.name,
        erpId: erpInstanceId,
        head: dir.head,
        status: "ACTIVE"
      });

      flatDepartmentsList.push(dir.name);

      const depts = config.departments[dir.name] || [];
      depts.forEach(dept => {
        const departmentRecord = departmentRegistry.register({
          id: `dept-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          name: dept.name,
          directorateId: directorateRecord.id,
          erpId: erpInstanceId,
          status: "ACTIVE"
        });

        flatDepartmentsList.push(dept.name);

        positionRegistry.register({
          title: `Head of ${dept.name}`,
          departmentId: departmentRecord.id,
          directorateId: directorateRecord.id,
          erpId: erpInstanceId,
          grade: "L3"
        });

        dept.sections.forEach(sec => {
          flatDepartmentsList.push(sec.name);
          
          sec.units.forEach(unit => {
            flatDepartmentsList.push(unit);
            
            positionRegistry.register({
              title: `${unit} Specialist`,
              departmentId: departmentRecord.id,
              directorateId: directorateRecord.id,
              erpId: erpInstanceId,
              grade: "L5"
            });
          });
        });
      });

      positionRegistry.register({
        title: dir.head,
        directorateId: directorateRecord.id,
        erpId: erpInstanceId,
        grade: "L2"
      });
    });

    if (blueprint.departments && blueprint.departments.length > 0) {
      blueprint.departments.forEach(name => {
        if (!flatDepartmentsList.includes(name)) {
          flatDepartmentsList.push(name);
          departmentRegistry.register({
            id: `dept-extra-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            name: name,
            erpId: erpInstanceId,
            status: "ACTIVE"
          });
        }
      });
    }

    return [...new Set(flatDepartmentsList)];
  }
}

export const departmentGenerator = new DepartmentGenerator();
