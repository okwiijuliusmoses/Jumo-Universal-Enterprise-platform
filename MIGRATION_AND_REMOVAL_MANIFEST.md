# JUMO UEOS — MIGRATION AND REMOVAL MANIFEST

**AUTHORITATIVE CONSOLIDATION & RESTORATION RECORD**

---

## 1. EXECUTIVE DIRECTIVE AUDIT

* **Directive:** JUMO UEOS Architecture Restoration & Deletion Reversal
* **Core Rule:** `PRESERVE → REGISTER → MIGRATE → CONNECT → UPGRADE`
* **Status:** 100% Restored & Verified.
* **Working Branch:** `manufacturing-hub-architecture`

---

## 2. SUBSYSTEM RESTORATION & REGISTRY MATRIX

| Subsystem / Module | Restored Path / Component | Status | Category | Governance Authority |
| :--- | :--- | :--- | :--- | :--- |
| **JUMO FAAP** | `src/core/faap/*`, `FAAPRenderer.tsx` | **RESTORED & ACTIVE** | Financial Ledger | FAAP Enterprise Ledger Engine |
| **JUMO DIGITAL PAY** | `src/core/digitalpay/*`, `DigitalPayRenderer.tsx` | **RESTORED & ACTIVE** | Payment Gateway | Digital Pay Routing Service & FAAP Bridge |
| **ERP FACTORY** | `src/core/factory/*`, `EnterpriseFactory.tsx` | **RESTORED & UPGRADED** | Manufacturing Engine | Universal Manufacturing Hub |
| **ERP RUNTIME** | `src/core/runtime/*` | **RESTORED & ACTIVE** | Runtime Registries | UEOS Runtime Client |
| **UEOS KERNEL** | `src/core/kernel/*`, `src/ueos/*` | **RESTORED & ACTIVE** | Sovereign OS Core | Kernel Governance Engine |
| **PROVISIONING** | `src/core/provisioning/*` | **RESTORED & ACTIVE** | Deployment Layer | Platform & Security Provisioners |
| **SECOPS / AEGIS** | `src/core/security/*`, `SecurityRegistryRenderer.tsx` | **RESTORED & ACTIVE** | Security | Security Governor & Audit System |
| **EXPERIENCE SHELL** | `src/experience/shell/UEOSShell.tsx` | **RESTORED & ACTIVE** | Application Shell | UEOS Shell & Ingress Pipeline |
| **BRANDING** | `src/experience/branding/*` | **RESTORED & ACTIVE** | Brand Identity | JUMO Brand Mark Architecture |

---

## 3. CLOSURE OF LEGACY PREVIEW ROOT

* **Legacy Prototype Closed:** The "Sovereign Command & Control Surface" prototype root preview is removed from entry points, fallbacks, and error boundaries.
* **Ingress Rule Enforced:** Single authoritative ingress through `PublicGateway` → `PlatformLoginGateway` → `UEOSShell`.
* **Zero Fake Telemetry:** Mock metrics replaced with real `UEOSRuntimeClient` metrics and explicit non-operational diagnostic indicators.
