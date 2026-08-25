/**
 * JUMO UEOS — AUTHORITATIVE PRODUCT MANIFEST
 * PRODUCT: Secondary School ERP (JUMO-SECONDARY-ERP)
 *
 * Generated from authoritative repository evidence in /app/jumo-restored/
 */

export const JUMO_SECONDARY_MANIFEST = Object.freeze({
  productId: "JUMO-SECONDARY-ERP",
  productName: "Secondary School ERP",
  productType: "ERP",
  category: "EDUCATION",
  version: "14.0.0",
  consolidated: false,
  canonicalRoute: "/secondary",
  directories: [
  "src/products/secondary-erp"
],
  sourceFilesCount: 8,
  sourceFiles: [
  "products/secondary-erp/domain/SecondaryService.ts",
  "products/secondary-erp/web/SecondaryErpWebShell.tsx",
  "products/secondary-erp/web/portals/SecondaryOffices.tsx",
  "products/secondary-erp/web/portals/SecondaryPortals.tsx",
  "products/secondary-erp/web/portals/academics/SecondaryHodPortal.tsx",
  "products/secondary-erp/web/portals/admissions/SecondaryRegistrarPortal.tsx",
  "products/secondary-erp/web/portals/finance/SecondaryBursarPortal.tsx",
  "products/secondary-erp/web/portals/governance/SecondarySenatePortal.tsx"
],
  directoratesCount: 4,
  directorates: [
  {
    "id": "DIR_SEC_GOVERNANCE",
    "name": "Secondary Governance & Senate Directorate",
    "productId": "JUMO-SECONDARY-ERP"
  },
  {
    "id": "DIR_SEC_ACADEMICS",
    "name": "Secondary Academic Studies & Examinations Directorate",
    "productId": "JUMO-SECONDARY-ERP"
  },
  {
    "id": "DIR_SEC_FINANCE",
    "name": "Secondary Bursary & Procurement Directorate",
    "productId": "JUMO-SECONDARY-ERP"
  },
  {
    "id": "DIR_SEC_OPERATIONS",
    "name": "Secondary Campus Operations & Discipline Directorate",
    "productId": "JUMO-SECONDARY-ERP"
  }
],
  departmentsCount: 6,
  departments: [
  {
    "id": "DEP_SEC_EXECUTIVE",
    "name": "Office of the Principal / Rector",
    "directorateId": "DIR_SEC_GOVERNANCE",
    "productId": "JUMO-SECONDARY-ERP"
  },
  {
    "id": "DEP_SEC_GOVERNANCE",
    "name": "Academic Senate Secretariat",
    "directorateId": "DIR_SEC_GOVERNANCE",
    "productId": "JUMO-SECONDARY-ERP"
  },
  {
    "id": "DEP_SEC_REGISTRAR",
    "name": "Admissions & Student Registry",
    "directorateId": "DIR_SEC_ACADEMICS",
    "productId": "JUMO-SECONDARY-ERP"
  },
  {
    "id": "DEP_SEC_ACADEMICS",
    "name": "Director of Studies & Departmental Heads (HOD)",
    "directorateId": "DIR_SEC_ACADEMICS",
    "productId": "JUMO-SECONDARY-ERP"
  },
  {
    "id": "DEP_SEC_FINANCE",
    "name": "School Bursary & Student Invoicing",
    "directorateId": "DIR_SEC_FINANCE",
    "productId": "JUMO-SECONDARY-ERP"
  },
  {
    "id": "DEP_SEC_LOGISTICS",
    "name": "Procurement, Stores & Campus Logistics",
    "directorateId": "DIR_SEC_OPERATIONS",
    "productId": "JUMO-SECONDARY-ERP"
  }
],
  officesCount: 8,
  offices: [
  {
    "id": "OFF_SEC_PRINCIPAL",
    "name": "Principal Office Office",
    "departmentId": "DEP_SEC_EXECUTIVE",
    "directorateId": "DIR_SEC_GOVERNANCE",
    "productId": "JUMO-SECONDARY-ERP"
  },
  {
    "id": "OFF_SEC_SENATE",
    "name": "Academic Senate Office",
    "departmentId": "DEP_SEC_GOVERNANCE",
    "directorateId": "DIR_SEC_GOVERNANCE",
    "productId": "JUMO-SECONDARY-ERP"
  },
  {
    "id": "OFF_SEC_REGISTRAR",
    "name": "Admissions & Registrar Office",
    "departmentId": "DEP_SEC_REGISTRAR",
    "directorateId": "DIR_SEC_ACADEMICS",
    "productId": "JUMO-SECONDARY-ERP"
  },
  {
    "id": "OFF_SEC_ADMISSIONS",
    "name": "Direct Admissions Desk Office",
    "departmentId": "DEP_SEC_REGISTRAR",
    "directorateId": "DIR_SEC_ACADEMICS",
    "productId": "JUMO-SECONDARY-ERP"
  },
  {
    "id": "OFF_SEC_DOS",
    "name": "Director of Studies (DOS) Office",
    "departmentId": "DEP_SEC_ACADEMICS",
    "directorateId": "DIR_SEC_ACADEMICS",
    "productId": "JUMO-SECONDARY-ERP"
  },
  {
    "id": "OFF_SEC_EXAMS",
    "name": "Examinations Office Office",
    "departmentId": "DEP_SEC_ACADEMICS",
    "directorateId": "DIR_SEC_ACADEMICS",
    "productId": "JUMO-SECONDARY-ERP"
  },
  {
    "id": "OFF_SEC_BURSAR",
    "name": "School Bursar Office",
    "departmentId": "DEP_SEC_FINANCE",
    "directorateId": "DIR_SEC_FINANCE",
    "productId": "JUMO-SECONDARY-ERP"
  },
  {
    "id": "OFF_SEC_STORES",
    "name": "Procurement & Stores Office",
    "departmentId": "DEP_SEC_LOGISTICS",
    "directorateId": "DIR_SEC_OPERATIONS",
    "productId": "JUMO-SECONDARY-ERP"
  }
],
  portalsCount: 8,
  portals: [
  {
    "id": "PORTAL_SEC_PRINCIPAL",
    "name": "Principal Office",
    "officeId": "OFF_SEC_PRINCIPAL",
    "departmentId": "DEP_SEC_EXECUTIVE",
    "directorateId": "DIR_SEC_GOVERNANCE",
    "route": "/secondary/principal",
    "roles": [
      "ROLE_PRINCIPAL"
    ]
  },
  {
    "id": "PORTAL_SEC_SENATE",
    "name": "Academic Senate",
    "officeId": "OFF_SEC_SENATE",
    "departmentId": "DEP_SEC_GOVERNANCE",
    "directorateId": "DIR_SEC_GOVERNANCE",
    "route": "/secondary/senate",
    "roles": [
      "ROLE_SENATE_MEMBER"
    ]
  },
  {
    "id": "PORTAL_SEC_REGISTRAR",
    "name": "Admissions & Registrar",
    "officeId": "OFF_SEC_REGISTRAR",
    "departmentId": "DEP_SEC_REGISTRAR",
    "directorateId": "DIR_SEC_ACADEMICS",
    "route": "/secondary/registrar",
    "roles": [
      "ROLE_REGISTRAR"
    ]
  },
  {
    "id": "PORTAL_SEC_ADMISSIONS",
    "name": "Direct Admissions Desk",
    "officeId": "OFF_SEC_ADMISSIONS",
    "departmentId": "DEP_SEC_REGISTRAR",
    "directorateId": "DIR_SEC_ACADEMICS",
    "route": "/secondary/admissions",
    "roles": [
      "ROLE_ADMISSION_OFFICER"
    ]
  },
  {
    "id": "PORTAL_SEC_DOS",
    "name": "Director of Studies (DOS)",
    "officeId": "OFF_SEC_DOS",
    "departmentId": "DEP_SEC_ACADEMICS",
    "directorateId": "DIR_SEC_ACADEMICS",
    "route": "/secondary/dos",
    "roles": [
      "ROLE_SECONDARY_DOS"
    ]
  },
  {
    "id": "PORTAL_SEC_EXAMS",
    "name": "Examinations Office",
    "officeId": "OFF_SEC_EXAMS",
    "departmentId": "DEP_SEC_ACADEMICS",
    "directorateId": "DIR_SEC_ACADEMICS",
    "route": "/secondary/exams",
    "roles": [
      "ROLE_EXAM_OFFICER"
    ]
  },
  {
    "id": "PORTAL_SEC_BURSAR",
    "name": "School Bursar",
    "officeId": "OFF_SEC_BURSAR",
    "departmentId": "DEP_SEC_FINANCE",
    "directorateId": "DIR_SEC_FINANCE",
    "route": "/secondary/bursar",
    "roles": [
      "ROLE_BURSAR"
    ]
  },
  {
    "id": "PORTAL_SEC_PROC",
    "name": "Procurement & Stores",
    "officeId": "OFF_SEC_STORES",
    "departmentId": "DEP_SEC_LOGISTICS",
    "directorateId": "DIR_SEC_OPERATIONS",
    "route": "/secondary/procurement",
    "roles": [
      "ROLE_STORES_OFFICER"
    ]
  }
],
  modulesCount: 5,
  modules: [
  {
    "id": "MOD_SEC_HOD",
    "name": "Academic Departmental Heads (HOD)",
    "code": "SEC-HOD-01",
    "path": "products/secondary-erp/web/portals/academics/SecondaryHodPortal.tsx"
  },
  {
    "id": "MOD_SEC_REGISTRAR",
    "name": "Secondary Registry & Matriculation",
    "code": "SEC-REG-01",
    "path": "products/secondary-erp/web/portals/admissions/SecondaryRegistrarPortal.tsx"
  },
  {
    "id": "MOD_SEC_BURSARY",
    "name": "Secondary Bursar & Tuitions",
    "code": "SEC-FIN-01",
    "path": "products/secondary-erp/web/portals/finance/SecondaryBursarPortal.tsx"
  },
  {
    "id": "MOD_SEC_SENATE",
    "name": "Secondary Academic Senate",
    "code": "SEC-SEN-01",
    "path": "products/secondary-erp/web/portals/governance/SecondarySenatePortal.tsx"
  },
  {
    "id": "MOD_SEC_SERVICE",
    "name": "Secondary Core Domain Service",
    "code": "SEC-SRV-01",
    "path": "products/secondary-erp/domain/SecondaryService.ts"
  }
],
  capabilitiesCount: 5,
  capabilities: [
  {
    "id": "CAP_SEC_HOD",
    "name": "Academic Departmental Heads (HOD) Engine",
    "moduleId": "MOD_SEC_HOD",
    "productId": "JUMO-SECONDARY-ERP",
    "enabled": true
  },
  {
    "id": "CAP_SEC_REGISTRAR",
    "name": "Secondary Registry & Matriculation Engine",
    "moduleId": "MOD_SEC_REGISTRAR",
    "productId": "JUMO-SECONDARY-ERP",
    "enabled": true
  },
  {
    "id": "CAP_SEC_BURSARY",
    "name": "Secondary Bursar & Tuitions Engine",
    "moduleId": "MOD_SEC_BURSARY",
    "productId": "JUMO-SECONDARY-ERP",
    "enabled": true
  },
  {
    "id": "CAP_SEC_SENATE",
    "name": "Secondary Academic Senate Engine",
    "moduleId": "MOD_SEC_SENATE",
    "productId": "JUMO-SECONDARY-ERP",
    "enabled": true
  },
  {
    "id": "CAP_SEC_SERVICE",
    "name": "Secondary Core Domain Service Engine",
    "moduleId": "MOD_SEC_SERVICE",
    "productId": "JUMO-SECONDARY-ERP",
    "enabled": true
  }
],
  uiMetadataCount: 8,
  uiMetadata: [
  {
    "id": "UI_SEC_PRINCIPAL",
    "capabilityId": "CAP_SEC_HOD",
    "componentType": "PORTAL",
    "route": "/secondary/principal",
    "metadata": {
      "title": "Principal Office",
      "roles": [
        "ROLE_PRINCIPAL"
      ]
    }
  },
  {
    "id": "UI_SEC_SENATE",
    "capabilityId": "CAP_SEC_HOD",
    "componentType": "PORTAL",
    "route": "/secondary/senate",
    "metadata": {
      "title": "Academic Senate",
      "roles": [
        "ROLE_SENATE_MEMBER"
      ]
    }
  },
  {
    "id": "UI_SEC_REGISTRAR",
    "capabilityId": "CAP_SEC_HOD",
    "componentType": "PORTAL",
    "route": "/secondary/registrar",
    "metadata": {
      "title": "Admissions & Registrar",
      "roles": [
        "ROLE_REGISTRAR"
      ]
    }
  },
  {
    "id": "UI_SEC_ADMISSIONS",
    "capabilityId": "CAP_SEC_HOD",
    "componentType": "PORTAL",
    "route": "/secondary/admissions",
    "metadata": {
      "title": "Direct Admissions Desk",
      "roles": [
        "ROLE_ADMISSION_OFFICER"
      ]
    }
  },
  {
    "id": "UI_SEC_DOS",
    "capabilityId": "CAP_SEC_HOD",
    "componentType": "PORTAL",
    "route": "/secondary/dos",
    "metadata": {
      "title": "Director of Studies (DOS)",
      "roles": [
        "ROLE_SECONDARY_DOS"
      ]
    }
  },
  {
    "id": "UI_SEC_EXAMS",
    "capabilityId": "CAP_SEC_HOD",
    "componentType": "PORTAL",
    "route": "/secondary/exams",
    "metadata": {
      "title": "Examinations Office",
      "roles": [
        "ROLE_EXAM_OFFICER"
      ]
    }
  },
  {
    "id": "UI_SEC_BURSAR",
    "capabilityId": "CAP_SEC_HOD",
    "componentType": "PORTAL",
    "route": "/secondary/bursar",
    "metadata": {
      "title": "School Bursar",
      "roles": [
        "ROLE_BURSAR"
      ]
    }
  },
  {
    "id": "UI_SEC_PROC",
    "capabilityId": "CAP_SEC_HOD",
    "componentType": "PORTAL",
    "route": "/secondary/procurement",
    "metadata": {
      "title": "Procurement & Stores",
      "roles": [
        "ROLE_STORES_OFFICER"
      ]
    }
  }
],
  runtimeComponentsCount: 5,
  runtimeComponents: [
  {
    "id": "RTC_SEC_SHELL",
    "capabilityId": "CAP_SEC_HOD",
    "componentPath": "src/products/secondary-erp/web/SecondaryErpWebShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_SEC_HOD",
    "capabilityId": "CAP_SEC_HOD",
    "componentPath": "src/products/secondary-erp/web/portals/academics/SecondaryHodPortal.tsx",
    "loaded": true
  },
  {
    "id": "RTC_SEC_REG",
    "capabilityId": "CAP_SEC_REGISTRAR",
    "componentPath": "src/products/secondary-erp/web/portals/admissions/SecondaryRegistrarPortal.tsx",
    "loaded": true
  },
  {
    "id": "RTC_SEC_BURSAR",
    "capabilityId": "CAP_SEC_BURSARY",
    "componentPath": "src/products/secondary-erp/web/portals/finance/SecondaryBursarPortal.tsx",
    "loaded": true
  },
  {
    "id": "RTC_SEC_SENATE",
    "capabilityId": "CAP_SEC_SENATE",
    "componentPath": "src/products/secondary-erp/web/portals/governance/SecondarySenatePortal.tsx",
    "loaded": true
  }
],
  services: [
  "SecondaryService"
],
  workflows: [
  "SecondaryMatriculationWorkflow",
  "TermExaminationGradingWorkflow",
  "SenateCurriculumApproval"
],
  agents: [
  "SecondaryAcademicAgent",
  "DepartmentalHodCoordinator",
  "BursaryFeeAuditor"
],
  reports: [
  "OLevelReportCard",
  "ALevelTranscript",
  "SenateAcademicSummary",
  "BursaryFeeClearanceCertificate"
],
  dashboards: [
  "SecondaryExecutiveDashboard",
  "SecondaryHodPortal",
  "SecondarySenatePortal"
],
  authenticationBoundaries: [
  "SENATE_GOVERNANCE_WALL",
  "HOD_FACULTY_AUTH",
  "BURSAR_FINANCIAL_BOUNDARY"
],
  permissions: [
  "ROLE_PRINCIPAL",
  "ROLE_SENATE_MEMBER",
  "ROLE_REGISTRAR",
  "ROLE_SECONDARY_DOS",
  "ROLE_BURSAR",
  "ROLE_HOD"
],
  dependencies: [
  "JUMO-PLATFORM-KERNEL",
  "EDUCATION-TEMPLATE-REGISTRY"
],
  benchmarkReferences: [
  "SecondarySchoolHighSchoolStandard-v4"
],
  recoveryEvidence: "Discovered independent Secondary domain services, HOD portals, Senate governance portals, and Bursar modules.",
  implementationStatus: "RECONCILED"
} as const);

export default JUMO_SECONDARY_MANIFEST;
