# JUMO UEOS Canonical Architecture & Hybrid Platform Completion Directive

The instructions below represent the authoritative system specifications, constraints, and platform completion requirements for JUMO Universal Enterprise Operating System (UEOS). Every agent instance MUST read, load, and strictly adhere to these architectural guidelines in all development, scaffolding, implementation, and system design phases.

---

## 1. Core Operating Philosophy
JUMO UEOS is an enterprise-grade hybrid operating system, NOT a standard web application. It operates under a micro-kernel architecture with a dynamic plugin registry, an abstract multi-model AI routing gateway, a state-authoritative ledger framework, and built-in support for distributed hybrid deployment.

## 2. Repository-First Completion
The imported repository is the authoritative implementation.
- **Do NOT** replace or recreate existing modules.
- Before implementing any feature, analyze the existing source code, reuse existing services, and extend existing modules.
- Connect disconnected components, merge duplicate implementations, and consolidate incomplete functionality.
- Keep parallel implementations strictly forbidden.

---

## 3. JUMO UEOS Canonical Hybrid Platform Completion Directive

The imported repository represents the canonical implementation of the JUMO Universal Enterprise Operating System (UEOS).
This repository is not simply an application. It is an extensible Enterprise Hybrid Operating System designed as a shared platform for multiple enterprise domains.

Your objective is to evolve the imported repository into the complete production-grade JUMO UEOS while preserving all existing architectural principles, repository organization, implementation patterns, and design conventions.

### Canonical Architecture Preservation
- **The existing architecture is the source of truth**: Do not introduce competing architectures.
- **No duplicate implementations**: Do not bypass shared services. Do not create isolated modules.
- **Platform-First Development Policy**: Every enhancement must integrate into the existing platform through the established runtime, registries, services, and dependency structure. The platform must remain modular, reusable, and independently deployable. Treat the repository as a Platform Kernel before treating it as an application. All enterprise domains must consume shared platform capabilities. Shared functionality must never be duplicated. Every new implementation must first determine whether an existing platform service should be extended instead of creating another implementation.

---

## 4. Complete the Platform Kernel
Implement and support a fully operational platform kernel responsible for:
- **Platform Boot Manager & Bootstrap**: Orchestrates boot sequence & runtime initialization.
- **Dependency Injection Container**: Manages service instantiation and dynamic binding.
- **Service & Domain Lifecycle Manager**: Controls dynamic service registration, module loading, domain lifecycle, and extension lifecycle.
- **Runtime Orchestration & Configuration**: Manages hot-reload registries, runtime feature flags, extensions, and environment parameters.
- **Platform Diagnostics & Telemetry**: Collects metrics, logs, health profiles, and orchestrates runtime recovery or graceful shutdowns.
- Every subsystem must initialize through the kernel.

---

## 5. Complete the Hybrid Runtime
Implement fully operational runtimes cooperating through the kernel:
- Enterprise Runtime
- Domain Runtime
- Workflow Runtime
- Integration Runtime
- AI Runtime
- Financial Runtime
- Event & Messaging Runtime
- Automation & Scheduler Runtime
- Edge, Offline & Synchronization Runtime
- Distributed Runtime

---

## 6. Complete Platform Registries & Runtime
Maintain registries supporting runtime discovery and dynamic hot-swappable configuration:
- Registries: Domain, Module, Service, Component, Workflow, API, Event, Extension, Plugin, AI, Configuration, Security, Integration, Resource, UI, and Deployment.
- All platform capabilities must be dynamically discoverable and support runtime feature registration.

---

## 7. Complete Shared Enterprise Platform Services
Ensure the following services are reusable across every enterprise domain without duplication:
- **Identity Platform**: Zero-Trust RBAC & ABAC, multi-tenancy, workspace, organization, user, and digital identity/MFA/SSO/session management.
- **Audit & Compliance**: Centralized logging, monitoring, telemetry, diagnostics, and backing up / disaster recovery.
- **Notification Engine**: Integrated messaging, email, SMS, push notifications, event-bus queues, and central automation/scheduling engines.
- **Document & File Management**: Central structured storage, indexing, and search capabilities.

---

## 8. Complete the Financial Backbone (FAAP)
The Financial & Accounting Platform (FAAP) is the shared financial engine for all domains:
- **Modules**: Treasury, General Ledger, Chart of Accounts, Budgeting, Revenue Management, Banking APIs, Procurement, Payroll, Billing, Tax, Asset Accounting, Cash & Investment Management, and Financial AI/Reporting/Compliance.
- **Constraint**: Every enterprise domain MUST integrate with FAAP rather than duplicating financial logic.

---

## 9. Complete Enterprise Domains
Domains are independently installable modules that share kernel platform services:
- **Domains**: SACCO ERP, Church ERP, Education ERP, NGO ERP, Government ERP, Healthcare, Agriculture, HR, CRM, Inventory, Logistics, and Document Management.
- **Builders**: CMS, Website Builder, Mobile Builder, API Builder, Workflow Builder, Form Builder, and Low-Code/No-Code Platform abstractions.
- Each domain must remain independently installable while sharing platform services.

---

## 10. Complete AI Hybrid Platform
Support a multi-provider cognitive ecosystem:
- **AI Gateway & AI Router**: Supports multi-model orchestration with provider abstraction (Google GenAI, Gemini, etc.), decoupling vendor dependencies.
- **AI Memory & Knowledge Base**: Maintains short/long-term context buffers and retrieval-augmented generation (RAG) structures.
- **Multi-Agent Orchestration**: Dynamic AI Agent Registry, AI Workflow/Decision Engines, and cooperative agent routines.
- **Specialized Cognitive Services**: Document Intelligence, OCR, Translation, Image/Speech processing, Predictive analytics, and AI Governance/Security.

---

## 11. Complete Integration & Deployment Platform
- **Integration**: Unified abstractions for REST, GraphQL, WebSockets, Event Streaming, Webhooks, and external adapters (Payment Gateways, Banking/Government APIs, Storage/Auth Providers).
- **Hybrid Deployment**: Supports identical runtime behavior across Local, Replit, Docker, VPS, Koyeb, Render, Kubernetes, Private/Public/Hybrid Cloud, and Edge/Offline environments.

---

## 12. Enterprise Security Architecture
- **Zero Trust**: Continuous authorization, Row-Level Database Segregation, and strict tenant-scope isolation.
- **Data Protection**: End-to-end encryption (at rest & in transit), Secrets and Key Management, API Rate-Limiting, threat/intrusion detection, and active compliance reporting.

---

## 13. Production Completion Standards
Every new layer, module, service, component, workflow, API, or model integration must include:
- Complete business logic and validation
- Comprehensive error handling and security controls
- Standard logging, metrics, auditing, and telemetry hooks
- Ready unit/integration tests and automated API documentation
- Native configuration support

---

## 14. Completion Definition
The project is considered complete only when:
1. Every verified architectural gap has been implemented.
2. Every planned hybrid layer, runtime, registry, and shared service is fully operational.
3. Every enterprise domain is seamlessly connected through shared platform services without duplication of logic.
4. The repository builds and compiles successfully.
5. The final report clearly distinguishes verified existing implementations from newly completed work and specifies any remaining external integrations that require external configuration credentials.
