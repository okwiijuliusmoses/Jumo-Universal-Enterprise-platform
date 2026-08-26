/**
 * JUMO UEOS — AUTHORITATIVE PRODUCT MANIFEST
 * PRODUCT: Owner's Control Center (JUMO-OWNER-CONTROL-CENTER)
 *
 * Generated from authoritative repository evidence in /app/jumo-restored/
 */

export const JUMO_OWNER_CONTROL_CENTER_MANIFEST = Object.freeze({
  productId: "JUMO-OWNER-CONTROL-CENTER",
  productName: "Owner's Control Center",
  productType: "CONTROL_CENTER",
  category: "OWNER_CONTROL",
  version: "14.4.0-LTS",
  consolidated: false,
  canonicalRoute: "/control-center",
  directories: [
  "src/core/security",
  "src/platforms/trust",
  "src/platforms/factory",
  "src/platforms/shell"
],
  sourceFilesCount: 13,
  sourceFiles: [
  "core/security/OwnerVerificationModeRegistry.ts",
  "core/security/RuntimeReliabilityAgent.tsx",
  "core/security/SovereignVerificationRegistry.ts",
  "core/security/ownerVerificationService.ts",
  "core/security/securityService.ts",
  "platforms/trust/JumoTrustPlatform.tsx",
  "platforms/trust/index.ts",
  "platforms/trust/trustTypesAndData.ts",
  "platforms/factory/ErpTemplateFactoryCenter.tsx",
  "platforms/factory/SoftwareFactoryPlatform.tsx",
  "platforms/factory/index.ts",
  "platforms/shell/UniversalPlatformShell.tsx",
  "platforms/shell/index.ts"
],
  directoratesCount: 4,
  directorates: [
  {
    "id": "DIR_OCC_SOVEREIGN",
    "name": "Sovereign Ownership & Ring-0 Core Directorate",
    "productId": "JUMO-OWNER-CONTROL-CENTER"
  },
  {
    "id": "DIR_OCC_GOVERNANCE",
    "name": "Platform Integrity, Audit & Trust Directorate",
    "productId": "JUMO-OWNER-CONTROL-CENTER"
  },
  {
    "id": "DIR_OCC_ENGINEERING",
    "name": "Software Factory & Template Architecture Directorate",
    "productId": "JUMO-OWNER-CONTROL-CENTER"
  },
  {
    "id": "DIR_OCC_COMMERCE",
    "name": "Platform Marketplace & Ecosystem Directorate",
    "productId": "JUMO-OWNER-CONTROL-CENTER"
  }
],
  departmentsCount: 5,
  departments: [
  {
    "id": "DEP_OCC_SOVEREIGN",
    "name": "Ring-0 Command Console & Privileged Operations",
    "directorateId": "DIR_OCC_SOVEREIGN",
    "productId": "JUMO-OWNER-CONTROL-CENTER"
  },
  {
    "id": "DEP_OCC_SECURITY",
    "name": "AEGIS Sovereign Security Wall & MFA Gateway",
    "directorateId": "DIR_OCC_SOVEREIGN",
    "productId": "JUMO-OWNER-CONTROL-CENTER"
  },
  {
    "id": "DEP_OCC_INTEGRITY",
    "name": "JUMO Trust & Cryptographic Audit Integrity",
    "directorateId": "DIR_OCC_GOVERNANCE",
    "productId": "JUMO-OWNER-CONTROL-CENTER"
  },
  {
    "id": "DEP_OCC_FACTORIES",
    "name": "ERP Scaffolding & Code Generation Engine",
    "directorateId": "DIR_OCC_ENGINEERING",
    "productId": "JUMO-OWNER-CONTROL-CENTER"
  },
  {
    "id": "DEP_OCC_COMMERCE",
    "name": "Platform Store, Licensing & Multi-Tenant Registry",
    "directorateId": "DIR_OCC_COMMERCE",
    "productId": "JUMO-OWNER-CONTROL-CENTER"
  }
],
  officesCount: 6,
  offices: [
  {
    "id": "OFF_OCC_COMMAND",
    "name": "Ring-0 Command Console Office",
    "departmentId": "DEP_OCC_SOVEREIGN",
    "directorateId": "DIR_OCC_SOVEREIGN",
    "productId": "JUMO-OWNER-CONTROL-CENTER"
  },
  {
    "id": "OFF_OCC_TRUST",
    "name": "JUMO Trust & Platform Verification Office",
    "departmentId": "DEP_OCC_INTEGRITY",
    "directorateId": "DIR_OCC_GOVERNANCE",
    "productId": "JUMO-OWNER-CONTROL-CENTER"
  },
  {
    "id": "OFF_OCC_FACTORY",
    "name": "Software Factory & ERP Studio Office",
    "departmentId": "DEP_OCC_FACTORIES",
    "directorateId": "DIR_OCC_ENGINEERING",
    "productId": "JUMO-OWNER-CONTROL-CENTER"
  },
  {
    "id": "OFF_OCC_SECURITY",
    "name": "AEGIS Ring-0 Security Wall Office",
    "departmentId": "DEP_OCC_SECURITY",
    "directorateId": "DIR_OCC_SOVEREIGN",
    "productId": "JUMO-OWNER-CONTROL-CENTER"
  },
  {
    "id": "OFF_OCC_STORE",
    "name": "Platform Store & Module Marketplace Office",
    "departmentId": "DEP_OCC_COMMERCE",
    "directorateId": "DIR_OCC_COMMERCE",
    "productId": "JUMO-OWNER-CONTROL-CENTER"
  },
  {
    "id": "OFF_OCC_AUDIT",
    "name": "Cryptographic Audit & Parity Ledger Office",
    "departmentId": "DEP_OCC_INTEGRITY",
    "directorateId": "DIR_OCC_GOVERNANCE",
    "productId": "JUMO-OWNER-CONTROL-CENTER"
  }
],
  portalsCount: 6,
  portals: [
  {
    "id": "PORTAL_OCC_CORE",
    "name": "Ring-0 Command Console",
    "officeId": "OFF_OCC_COMMAND",
    "departmentId": "DEP_OCC_SOVEREIGN",
    "directorateId": "DIR_OCC_SOVEREIGN",
    "route": "/control-center",
    "roles": [
      "ROLE_SOVEREIGN_OWNER"
    ]
  },
  {
    "id": "PORTAL_OCC_TRUST",
    "name": "JUMO Trust & Platform Verification",
    "officeId": "OFF_OCC_TRUST",
    "departmentId": "DEP_OCC_INTEGRITY",
    "directorateId": "DIR_OCC_GOVERNANCE",
    "route": "/control-center/trust",
    "roles": [
      "ROLE_SOVEREIGN_OWNER"
    ]
  },
  {
    "id": "PORTAL_OCC_FACTORY",
    "name": "Software Factory & ERP Studio",
    "officeId": "OFF_OCC_FACTORY",
    "departmentId": "DEP_OCC_FACTORIES",
    "directorateId": "DIR_OCC_ENGINEERING",
    "route": "/control-center/factory",
    "roles": [
      "ROLE_SOVEREIGN_OWNER"
    ]
  },
  {
    "id": "PORTAL_OCC_SECURITY",
    "name": "AEGIS Ring-0 Security Wall",
    "officeId": "OFF_OCC_SECURITY",
    "departmentId": "DEP_OCC_SECURITY",
    "directorateId": "DIR_OCC_SOVEREIGN",
    "route": "/control-center/security",
    "roles": [
      "ROLE_SOVEREIGN_OWNER"
    ]
  },
  {
    "id": "PORTAL_OCC_STORE",
    "name": "Platform Store & Module Marketplace",
    "officeId": "OFF_OCC_STORE",
    "departmentId": "DEP_OCC_COMMERCE",
    "directorateId": "DIR_OCC_COMMERCE",
    "route": "/control-center/store",
    "roles": [
      "ROLE_SOVEREIGN_OWNER"
    ]
  },
  {
    "id": "PORTAL_OCC_AUDIT",
    "name": "Cryptographic Audit & Parity Ledger",
    "officeId": "OFF_OCC_AUDIT",
    "departmentId": "DEP_OCC_INTEGRITY",
    "directorateId": "DIR_OCC_GOVERNANCE",
    "route": "/control-center/audit",
    "roles": [
      "ROLE_SOVEREIGN_OWNER"
    ]
  }
],
  modulesCount: 4,
  modules: [
  {
    "id": "MOD_OCC_VERIFICATION",
    "name": "Ring-0 Verification & Integrity",
    "code": "OCC-VRF-01",
    "path": "core/security/SovereignVerificationRegistry.ts"
  },
  {
    "id": "MOD_OCC_TRUST",
    "name": "JUMO Trust Engine & Anti-Tamper",
    "code": "OCC-TRU-01",
    "path": "platforms/trust/JumoTrustPlatform.tsx"
  },
  {
    "id": "MOD_OCC_FACTORY",
    "name": "ERP Template & Scaffolding Factory",
    "code": "OCC-FAC-01",
    "path": "platforms/factory/SoftwareFactoryPlatform.tsx"
  },
  {
    "id": "MOD_OCC_SHELL",
    "name": "Universal Sovereign Platform Host",
    "code": "OCC-SHL-01",
    "path": "platforms/shell/UniversalPlatformShell.tsx"
  }
],
  capabilitiesCount: 4,
  capabilities: [
  {
    "id": "CAP_OCC_VERIFICATION",
    "name": "Ring-0 Verification & Integrity Engine",
    "moduleId": "MOD_OCC_VERIFICATION",
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "enabled": true
  },
  {
    "id": "CAP_OCC_TRUST",
    "name": "JUMO Trust Engine & Anti-Tamper Engine",
    "moduleId": "MOD_OCC_TRUST",
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "enabled": true
  },
  {
    "id": "CAP_OCC_FACTORY",
    "name": "ERP Template & Scaffolding Factory Engine",
    "moduleId": "MOD_OCC_FACTORY",
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "enabled": true
  },
  {
    "id": "CAP_OCC_SHELL",
    "name": "Universal Sovereign Platform Host Engine",
    "moduleId": "MOD_OCC_SHELL",
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "enabled": true
  }
],
  uiMetadataCount: 6,
  uiMetadata: [
  {
    "id": "UI_OCC_CORE",
    "capabilityId": "CAP_OCC_VERIFICATION",
    "componentType": "CONTROL_PLANE",
    "route": "/control-center",
    "metadata": {
      "title": "Ring-0 Command Console",
      "roles": [
        "ROLE_SOVEREIGN_OWNER"
      ]
    }
  },
  {
    "id": "UI_OCC_TRUST",
    "capabilityId": "CAP_OCC_VERIFICATION",
    "componentType": "CONTROL_PLANE",
    "route": "/control-center/trust",
    "metadata": {
      "title": "JUMO Trust & Platform Verification",
      "roles": [
        "ROLE_SOVEREIGN_OWNER"
      ]
    }
  },
  {
    "id": "UI_OCC_FACTORY",
    "capabilityId": "CAP_OCC_VERIFICATION",
    "componentType": "CONTROL_PLANE",
    "route": "/control-center/factory",
    "metadata": {
      "title": "Software Factory & ERP Studio",
      "roles": [
        "ROLE_SOVEREIGN_OWNER"
      ]
    }
  },
  {
    "id": "UI_OCC_SECURITY",
    "capabilityId": "CAP_OCC_VERIFICATION",
    "componentType": "CONTROL_PLANE",
    "route": "/control-center/security",
    "metadata": {
      "title": "AEGIS Ring-0 Security Wall",
      "roles": [
        "ROLE_SOVEREIGN_OWNER"
      ]
    }
  },
  {
    "id": "UI_OCC_STORE",
    "capabilityId": "CAP_OCC_VERIFICATION",
    "componentType": "CONTROL_PLANE",
    "route": "/control-center/store",
    "metadata": {
      "title": "Platform Store & Module Marketplace",
      "roles": [
        "ROLE_SOVEREIGN_OWNER"
      ]
    }
  },
  {
    "id": "UI_OCC_AUDIT",
    "capabilityId": "CAP_OCC_VERIFICATION",
    "componentType": "CONTROL_PLANE",
    "route": "/control-center/audit",
    "metadata": {
      "title": "Cryptographic Audit & Parity Ledger",
      "roles": [
        "ROLE_SOVEREIGN_OWNER"
      ]
    }
  }
],
  runtimeComponentsCount: 4,
  runtimeComponents: [
  {
    "id": "RTC_OCC_SHELL",
    "capabilityId": "CAP_OCC_VERIFICATION",
    "componentPath": "src/platforms/shell/UniversalPlatformShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_OCC_TRUST",
    "capabilityId": "CAP_OCC_TRUST",
    "componentPath": "src/platforms/trust/JumoTrustPlatform.tsx",
    "loaded": true
  },
  {
    "id": "RTC_OCC_FACTORY",
    "capabilityId": "CAP_OCC_FACTORY",
    "componentPath": "src/platforms/factory/SoftwareFactoryPlatform.tsx",
    "loaded": true
  },
  {
    "id": "RTC_OCC_SECURITY",
    "capabilityId": "CAP_OCC_VERIFICATION",
    "componentPath": "src/core/security/RuntimeReliabilityAgent.tsx",
    "loaded": true
  }
],
  services: [
  "ownerVerificationService",
  "securityService"
],
  workflows: [
  "Ring0VerificationWorkflow",
  "TenantProvisioningWorkflow",
  "SovereignDeploymentPipeline"
],
  agents: [
  "RuntimeReliabilityAgent",
  "SovereignVerificationAgent"
],
  reports: [
  "SovereignIntegrityAudit",
  "ZeroTrustVerificationLog",
  "TenantResourceTelemetry"
],
  dashboards: [
  "Ring0CommandConsole",
  "JumoTrustPlatform",
  "SoftwareFactoryPlatform"
],
  authenticationBoundaries: [
  "RING_0_HARDWARE_SECURITY_KEY",
  "SOVEREIGN_OWNER_MFA",
  "ZERO_TRUST_SESSION"
],
  permissions: [
  "ROLE_SOVEREIGN_OWNER"
],
  dependencies: [
  "JUMO-PLATFORM-KERNEL"
],
  benchmarkReferences: [
  "SovereignRing0OwnerControlStandard-v1"
],
  recoveryEvidence: "Discovered privileged owner security services, Trust engine, and Software Factory platforms.",
  implementationStatus: "RECONCILED"
} as const);

export default JUMO_OWNER_CONTROL_CENTER_MANIFEST;
