# JUMO UEOS - Monolithic Owner Control Center Archive (v14)

This read-only archive preserves the legacy monolithic implementation of `OwnerControlCenter.tsx` (217+ KB) and `OwnerConsole.tsx` from Phase 14 / Phase 16 before the Sovereign Platform Separation refactoring.

## Purpose
In accordance with the **JUMO UEOS Sovereign Platform Architecture - Enterprise Platform Separation Directive**, the Owner Control Center is transitioned from a monolithic container displaying 30+ embedded modules, tabs, and widgets into a clean **Enterprise Control Plane** that launches dedicated platform workspaces.

## Preserved Components & References
This directory contains:
- `OwnerControlCenter.tsx`: The legacy 4,200+ line monolithic component containing embedded UI tabs and mock datasets for FAAP, AEGIS, AI Factory, Software Factory, Innovation Lab, Tenant Governance, Marketplace, and Licensing.
- `OwnerConsole.tsx`: The legacy wrapper page.

## Architectural Rule
Nothing from this archive should be directly imported into active runtime pages. It serves purely as an engineering reference for business logic, schema maps, and API integration contracts as each sovereign platform workspace (ERP Platform Center, Financial Platform Center, Security Platform Center, AI Platform Center, Cloud & Infrastructure Platform, Software Factory Platform, Innovation & Research Platform, Platform Store) is independently expanded and managed.
