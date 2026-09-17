export const agriConfig = {
  id: "Agri-ERP",
  name: "Agribusiness & Farmers Cooperative ERP",
  family: "Agribusiness",
  governanceModel: "Cooperative Board, General Manager & Extension Officers",
  description: "Comprehensive agricultural cooperative operating system for crop collection, farmer registries, processing, and export.",
  portals: [
    { id: "agri-public", name: "Agri-Marketplace & Public Portal", icon: "🌐", desc: "Produce market prices, cooperative info" },
    { id: "agri-login", name: "Cooperative Staff Login Portal", icon: "🔐", desc: "Extension officer and manager authentication" },
    { id: "agri-workspace", name: "Cooperative Operations Workspace", icon: "🌾", desc: "Farmer intake, crop collection, grading" },
    { id: "farmer-portal", name: "Registered Farmer Workspace", icon: "🚜", desc: "Deliveries, payments, input loans, advisory" }
  ],
  departments: [
    "Farmer Relations & Extension",
    "Collection & Grading Centers",
    "Supply Chain & Processing",
    "Finance & Input Credit"
  ],
  modules: [
    { id: "farmer-registry", name: "Farmer Biometric & Land Registry", icon: "👩‍🌾", status: "Active" },
    { id: "crop-collection", name: "Produce Collection & Weighing System", icon: "⚖️", status: "Active" },
    { id: "input-credit", name: "Agricultural Input Credit & Recovery", icon: "🌱", status: "Active" },
    { id: "warehouse-receipt", name: "Warehouse Receipt & Grading System", icon: "🏭", status: "Active" }
  ],
  workflows: [
    { id: "wf-produce-collection", name: "Crop Weighing, Grading & Receipt Workflow", steps: 4 },
    { id: "wf-input-loan", name: "Agricultural Input Loan Disbursement Workflow", steps: 4 }
  ],
  roles: ["Cooperative Manager", "Extension Officer", "Weighbridge Clerk", "Registered Farmer"],
  forms: [
    { id: "form-farmer-reg", name: "Farmer Membership & Land Registration Form" },
    { id: "form-input-request", name: "Seasonal Farm Input Loan Request Form" }
  ],
  reports: [
    { id: "rep-crop-yield", name: "Seasonal Crop Collection & Yield Analysis Report" }
  ]
};
