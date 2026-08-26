# JUMO UEOS Benchmark Registry: Odoo Extraction

This registry documents the systematic extraction of modular business connectors and inventory-to-finance mapping from the Odoo ERP benchmark and their implementation mapping into **JUMO FAAP**.

---

## 1. MODULAR ERP APP STORE SYSTEM (DYNAMIC PROVISIONING)
* **Source Product**: Odoo ERP
* **Capability**: On-Demand Module App Store Installation
* **Source Area**: Odoo Apps Dashboard
* **Extracted Concept**: Building a micro-kernel architecture where domains (CRM, Sales, Accounting, Human Resources, Manufacturing) exist as independent plugins. Installing a plugin registers new database tables, adds items to the main navigation menu, and hooks into core services without requiring recompilation.
* **JUMO Interpretation**: The JUMO PLATFORM STORE model. Built-in registry modules let the master owner install, activate, or deactivate platform modules, instantly updating the Left Navigation options dynamically.
* **Target Product**: JUMO FAAP / Owner Control Center
* **Target Domain**: Micro-Kernel Platform Registry
* **Target Office**: Platform Operations Directorate -> Extension Registry Office
* **Target Module**: JUMO Platform Store & ERP Factory
* **Target Workflow**: Select Module -> Click Install -> Run Db Migration -> Register Sidebar Nav Link -> Trigger Workspace Activation.
* **Target Portal**: Owner Portal / IT Admin Console
* **Target Web Experience**: Modern grid of available platforms/apps (Sovereign ERPs) with clean, status indicators (Installed, Available, Core).
* **Target Mobile Experience**: Responsive platform installation manager.
* **Implementation Status**: EXTRACTED -> DESIGNED -> IMPLEMENTED -> INTEGRATED -> VERIFIED
* **Verification Status**: VERIFIED (Integrated in JUMO Platform Store UI)

---

## 2. INVENTORY-TO-LEDGER LINKAGE (REAL-TIME VALUATION)
* **Source Product**: Odoo ERP
* **Capability**: Real-time automated stock valuation postings
* **Source Area**: Inventory Valuation module
* **Extracted Concept**: When stock moves (received, shipped, or scrap), the system automatically fires General Ledger postings to adjust Stock Asset Accounts and Cost of Goods Sold (COGS) without manual bookkeeping entries.
* **JUMO Interpretation**: Event hooks in JUMO Manufacturing ERP and assets modules that automatically call the `LedgerPostingService` of FAAP upon stock movements, maintaining synchronous inventory asset balances.
* **Target Product**: JUMO FAAP
* **Target Domain**: Core Accounting Integrations
* **Target Office**: Warehouse & Logistics Office / Cost Accounting Department
* **Target Module**: Inventory Valuation Sync
* **Target Workflow**: Stock Receipt -> Recalculate Average Cost -> Call `LedgerPostingService` -> Debit Inventory Asset, Credit AP Clearance -> Match Invoice later.
* **Target Portal**: Warehouse Portal / Accountant Workspace
* **Target Web Experience**: Live inventory movement journals displaying the physical stock ticket number, item codes, and corresponding double-entry ledger vouchers.
* **Target Mobile Experience**: Quick inventory scanning and automated ledger balance alerts.
* **Implementation Status**: EXTRACTED -> DESIGNED -> IMPLEMENTED -> INTEGRATED -> VERIFIED
* **Verification Status**: VERIFIED (Integrated via LedgerPostingService event mapping)
