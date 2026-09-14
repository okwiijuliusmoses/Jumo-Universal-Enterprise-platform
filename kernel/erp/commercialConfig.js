export const commercialConfig = {
  id: "Retail-ERP",
  name: "Wholesale & Retail Chain Merchandise ERP",
  family: "GeneralMerchandise",
  governanceModel: "Operations Director, Supply Chain Head & Executive Board",
  description: "Enterprise retail, wholesale, and general merchandise supply chain and inventory operating platform.",
  portals: [
    { id: "retail-public", name: "E-Commerce Storefront Portal", icon: "🌐", desc: "Online shopping, catalog, orders" },
    { id: "retail-login", name: "Store Manager Login Portal", icon: "🔐", desc: "Staff and branch manager authentication" },
    { id: "retail-workspace", name: "Retail Operations Workspace", icon: "🏬", desc: "POS, inventory, multi-branch stock, logistics" },
    { id: "supply-portal", name: "Supply Chain & Vendor Portal", icon: "📦", desc: "Purchase orders, supplier shipments, receiving" }
  ],
  departments: [
    "Retail Store Operations",
    "Supply Chain & Warehousing",
    "Merchandising & Procurement",
    "Quality Assurance & Returns"
  ],
  modules: [
    { id: "pos-system", name: "Point of Sale (POS) & Checkout Engine", icon: "💳", status: "Active" },
    { id: "inventory-mgr", name: "Multi-Warehouse Inventory Control", icon: "📦", status: "Active" },
    { id: "supplier-orders", name: "Automated Purchase Orders & Receiving", icon: "📑", status: "Active" },
    { id: "customer-loyalty", name: "Customer Loyalty & CRM", icon: "⭐", status: "Active" }
  ],
  workflows: [
    { id: "wf-purchase-order", name: "Vendor Purchase Order & Receiving Workflow", steps: 4 },
    { id: "wf-stock-transfer", name: "Inter-Branch Stock Transfer Workflow", steps: 3 }
  ],
  roles: ["Operations Director", "Store Manager", "Cashier", "Warehouse Supervisor", "Vendor"],
  forms: [
    { id: "form-po-request", name: "Purchase Order Requisition Form" },
    { id: "form-return-auth", name: "Customer Product Return Authorization Form" }
  ],
  reports: [
    { id: "rep-sales-turnover", name: "Retail Sales Turnover & Stock Valuation Report" }
  ]
};
