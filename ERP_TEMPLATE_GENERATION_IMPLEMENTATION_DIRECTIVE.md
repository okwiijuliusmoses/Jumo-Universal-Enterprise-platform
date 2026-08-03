# JUMO UEOS ERP Template Generation Implementation Directive

## Mission

Implement the ERP Template driven generation architecture.

The existing registries are present. The missing connection is runtime materialization.

DO NOT create new duplicate ERP registries.

Upgrade existing:

- ERPGenerationEngine
- ERP generators
- ERPWorkspaceResolver
- Experience runtime bindings


---

# PHASE 1 — ERPGenerationEngine Upgrade

File:

platform/factory/erp/ERPGenerationEngine.js


Replace blueprint-only generation.

Current:

ERPBlueprintRegistry → Generators


Required:

ERPEcosystemTemplateRegistry
        ↓
ERPBlueprintRegistry
        ↓
Generators
        ↓
Runtime Instance


Implementation requirements:

Import:

ERPEcosystemTemplateRegistry


Resolve:

template = erpEcosystemTemplateRegistry.getTemplate(templateId)


Then:

blueprint = ERPBlueprintRegistry.getBlueprint(template.blueprintId)


Generation call:


portalGenerator.generate(template, blueprint)

moduleGenerator.generate(template, blueprint)

departmentGenerator.generate(template, blueprint)

componentGenerator.generate(template, blueprint)

formGenerator.generate(template, blueprint)

workflowGenerator.generate(template, blueprint)

navigationGenerator.generate(template, blueprint)


---

# PHASE 2 — Upgrade Generators

Every generator must accept:


generate(template, blueprint)


Priority order:


## PortalGenerator

Remove generic fallback portals.

Generate from:

template.defaultPortals

plus blueprint.portals


Example:

Education:

Student Portal
Faculty Portal
Registrar Portal
Research Portal
Finance Portal


Government:

Citizen Portal
Ministry Portal
Service Center
Administration Portal


---

## ModuleGenerator

Generate:

template.defaultModules

+
blueprint.capabilities


No static universal ERP modules except UEOS core services.


---

## DepartmentGenerator

Generate:

template.defaultDepartments


No fake departments.


---

## WorkflowGenerator

Generate workflows from:

template modules
+
blueprint capabilities


Example:

Admissions module:

Admission Review Workflow

Finance:

Payment Approval Workflow


---

## FormGenerator

Generate forms based on modules.

Example:

Admissions:

Application Form
Verification Form


Finance:

Payment Form
Approval Form


---

## ComponentGenerator

Generate UI components based on runtime modules.

Example:

Finance module:

Ledger Component
Transaction Table
Approval Panel


---

## NavigationGenerator

Generate navigation tree:

Portal
 ↓
Modules
 ↓
Components


No hardcoded menus.


---

# PHASE 3 — Runtime Validation

Every generated ERP instance must expose:


enterpriseMetadata

enterpriseConfiguration

enterpriseLayers

departments

organizationStructure

portals

roles

permissions

navigation

modules

components

forms

workflows

reports

dashboards

analytics

aiAssistants

documents

settings

notifications

integrations

apis

runtimeContext


---

# PHASE 4 — Remove Experience Fabrication

Audit:

experience/gateway

experience/workspace

experience/control-center


Remove:

- demo transactions
- static ERP portals
- fixed workflow rows
- fake modules


Experience must only render:

runtime.modules

runtime.portals

runtime.components

runtime.workflows


---

# PHASE 5 — Verification

Run:

node verify-erp-ecosystem.js

node verify-erp-instances.js


Then test:

/api/ueos/erp/catalogue

/api/ueos/erp/:id/runtime


Acceptance:

Every ERP instance must generate a complete Digital Enterprise Platform.

No ERP should display empty portals, missing modules, missing components, or placeholder data.

