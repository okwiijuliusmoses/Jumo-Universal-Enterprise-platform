import { baseEducationConfig } from "./baseEducationConfig.js";

export const universityConfig = {
  ...baseEducationConfig,
  id: "University-ERP",
  name: "University ERP",
  description: "Comprehensive ERP for University Institutions",
  governancePortals: [
    "Executive", "Administration", "Academic", "Admissions", 
    "StudentServices", "Finance", "HR", "Research", 
    "Library", "ICT", "Alumni", "StaffSACCO"
  ],
  modules: [
    ...baseEducationConfig.modules,
    "Admissions",
    "StudentManagement",
    "ExaminationManagement",
    "Research",
    "Library",
    "Alumni"
  ],
  dependencies: ["FinancialBackbone", "PaymentGateway", "SecurityPlatform", "AIGateway"]
};
