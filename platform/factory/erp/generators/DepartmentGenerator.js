/**
 * JUMO UEOS
 * Enterprise Department & Organizational Unit Generator
 */

import { organizationRegistry } from "../../../registry/organizationRegistry.js";
import { directorateRegistry } from "../../../registry/directorateRegistry.js";
import { departmentRegistry } from "../../../registry/departmentRegistry.js";
import { positionRegistry } from "../../../registry/positionRegistry.js";

const TEMPLATE_DEPARTMENTS = {
  "university-erp": ["Vice Chancellor", "Deputy Vice Chancellors", "Academic Registrar", "Bursar", "Library", "Research", "ICT", "Student Affairs"],
  "college-erp": ["Principal", "Deputy Principal", "Registry", "Finance"],
  "secondary-school-erp": ["Head Teacher", "Deputy Academic", "Deputy Administration", "Discipline"],
  "primary-school-erp": ["Head Teacher", "Deputy Academic", "Deputy Administration", "Discipline"],
  "hospitality-erp": ["General Manager", "Front Office", "Housekeeping", "Food & Beverage", "Kitchen", "Reservations", "Maintenance"],
  "community-finance-erp": ["General Manager", "Loans", "Savings", "Credit", "Risk", "Recovery", "Treasury"],
  "diocese-province-erp": ["Archbishop/Bishop", "Provincial Administration", "Pastoral Office", "Finance", "Education", "Health", "Justice & Peace"],
  "clan-heritage-erp": ["Clan Leadership", "Genealogy", "Culture", "Land", "Archives", "Ceremonies"],
  "alumni-erp": ["Executive", "Membership", "Career", "Events", "Fundraising", "Communications"]
};

export class DepartmentGenerator {
  generate(instance) {
    const erpId = instance.templateId || instance.id || "";
    
    // Find matching departments
    let depts = [];
    if (erpId.includes("university")) depts = TEMPLATE_DEPARTMENTS["university-erp"];
    else if (erpId.includes("college")) depts = TEMPLATE_DEPARTMENTS["college-erp"];
    else if (erpId.includes("secondary")) depts = TEMPLATE_DEPARTMENTS["secondary-school-erp"];
    else if (erpId.includes("primary")) depts = TEMPLATE_DEPARTMENTS["primary-school-erp"];
    else if (erpId.includes("hospitality")) depts = TEMPLATE_DEPARTMENTS["hospitality-erp"];
    else if (erpId.includes("community") || erpId.includes("finance")) depts = TEMPLATE_DEPARTMENTS["community-finance-erp"];
    else if (erpId.includes("diocese") || erpId.includes("religious")) depts = TEMPLATE_DEPARTMENTS["diocese-province-erp"];
    else if (erpId.includes("clan") || erpId.includes("heritage")) depts = TEMPLATE_DEPARTMENTS["clan-heritage-erp"];
    else if (erpId.includes("alumni")) depts = TEMPLATE_DEPARTMENTS["alumni-erp"];
    else depts = ["Executive", "Operations", "Finance", "Administration"]; // Default

    // Register organization level
    organizationRegistry.register({
      id: instance.id,
      name: `${instance.name} National Platform`,
      type: "Enterprise Platform",
      jurisdiction: "Federal"
    });

    depts.forEach(name => {
      departmentRegistry.register({
        id: `dept-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name: name,
        erpId: instance.id,
        status: "ACTIVE"
      });
    });

    return depts;
  }
}

export const departmentGenerator = new DepartmentGenerator();
