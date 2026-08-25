/**
 * JUMO UEOS — AUTHORITATIVE PRODUCT MANIFEST
 * PRODUCT: Nursery & Primary Consolidated ERP (JUMO-NURSERY-PRIMARY-ERP)
 *
 * Generated from authoritative repository evidence in /app/jumo-restored/
 */

export const JUMO_NURSERY_PRIMARY_MANIFEST = Object.freeze({
  productId: "JUMO-NURSERY-PRIMARY-ERP",
  productName: "Nursery & Primary Consolidated ERP",
  productType: "ERP",
  category: "EDUCATION",
  version: "14.0.0",
  consolidated: true,
  canonicalRoute: "/nursery-primary",
  directories: [
  "src/products/nursery-primary-erp"
],
  sourceFilesCount: 20,
  sourceFiles: [
  "products/nursery-primary-erp/domain/AdmissionsService.ts",
  "products/nursery-primary-erp/domain/CateringService.ts",
  "products/nursery-primary-erp/domain/ClinicService.ts",
  "products/nursery-primary-erp/domain/NurseryPrimaryService.ts",
  "products/nursery-primary-erp/domain/SafeguardingService.ts",
  "products/nursery-primary-erp/domain/TransportService.ts",
  "products/nursery-primary-erp/web/NurseryPrimaryErpWebShell.tsx",
  "products/nursery-primary-erp/web/portals/academics-ecd/NurseryMilestonesPortal.tsx",
  "products/nursery-primary-erp/web/portals/academics-primary/PrimaryAcademicPortals.tsx",
  "products/nursery-primary-erp/web/portals/academics-primary/PrimaryDosPortal.tsx",
  "products/nursery-primary-erp/web/portals/academics-primary/PrimaryTimetablePortal.tsx",
  "products/nursery-primary-erp/web/portals/admissions/AdmissionsPortal.tsx",
  "products/nursery-primary-erp/web/portals/catering/CateringPortal.tsx",
  "products/nursery-primary-erp/web/portals/clinic/SchoolClinicPortal.tsx",
  "products/nursery-primary-erp/web/portals/finance/BursarPortal.tsx",
  "products/nursery-primary-erp/web/portals/finance/PrimaryFinanceStoresPortals.tsx",
  "products/nursery-primary-erp/web/portals/governance/PrimaryGovernancePortals.tsx",
  "products/nursery-primary-erp/web/portals/operations/PrimaryOperationsWelfarePortals.tsx",
  "products/nursery-primary-erp/web/portals/safeguarding/SafeguardingPortal.tsx",
  "products/nursery-primary-erp/web/portals/transport/TransportPortal.tsx"
],
  directoratesCount: 6,
  directorates: [
  {
    "id": "DIR_NP_GOVERNANCE",
    "name": "Consolidated Institutional Governance Directorate",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "DIR_NUR_ACADEMICS",
    "name": "Early Childhood Development (ECD) & Nursery Directorate",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "DIR_PRI_ACADEMICS",
    "name": "Primary Academic Studies & Examinations Directorate",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "DIR_NP_FINANCE",
    "name": "Bursary & Financial Management Directorate",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "DIR_NP_WELFARE",
    "name": "Child Safeguarding, Health & Pastoral Care Directorate",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "DIR_NP_OPERATIONS",
    "name": "Campus Logistics, Fleet & Dining Directorate",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  }
],
  departmentsCount: 9,
  departments: [
  {
    "id": "DEP_NP_EXECUTIVE",
    "name": "Office of the Head Teacher / Directorship",
    "directorateId": "DIR_NP_GOVERNANCE",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "DEP_NP_ADMISSIONS",
    "name": "Student Admissions & Enrollment Secretariat",
    "directorateId": "DIR_NP_GOVERNANCE",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "DEP_NUR_ACADEMICS",
    "name": "Nursery Curriculum & Milestones Tracking",
    "directorateId": "DIR_NUR_ACADEMICS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "DEP_PRI_ACADEMICS",
    "name": "Primary Studies, Curriculum & Grading",
    "directorateId": "DIR_PRI_ACADEMICS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "DEP_NP_FINANCE",
    "name": "Bursary, Tuition Invoicing & Stores",
    "directorateId": "DIR_NP_FINANCE",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "DEP_NP_WELFARE",
    "name": "Child Protection, Safeguarding & Welfare",
    "directorateId": "DIR_NP_WELFARE",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "DEP_NP_HEALTH",
    "name": "Pediatric Infirmary & Health Management",
    "directorateId": "DIR_NP_WELFARE",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "DEP_NP_LOGISTICS",
    "name": "Transport Fleet & Dining Services",
    "directorateId": "DIR_NP_OPERATIONS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "DEP_NP_ADMINISTRATION",
    "name": "Teaching Staff & Human Resources",
    "directorateId": "DIR_NP_OPERATIONS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  }
],
  officesCount: 12,
  offices: [
  {
    "id": "OFF_NP_HEAD",
    "name": "Head Teacher / Director Office Office",
    "departmentId": "DEP_NP_EXECUTIVE",
    "directorateId": "DIR_NP_GOVERNANCE",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "OFF_NP_ADMISSIONS",
    "name": "Consolidated Admissions Office",
    "departmentId": "DEP_NP_ADMISSIONS",
    "directorateId": "DIR_NP_STUDENTS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "OFF_NP_HR",
    "name": "Staff & Teacher HR Office",
    "departmentId": "DEP_NP_ADMINISTRATION",
    "directorateId": "DIR_NP_OPERATIONS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "OFF_NP_BURSAR",
    "name": "School Bursar & Finance Office",
    "departmentId": "DEP_NP_FINANCE",
    "directorateId": "DIR_NP_FINANCE",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "OFF_NP_STORES",
    "name": "Stores & Procurement Office",
    "departmentId": "DEP_NP_LOGISTICS",
    "directorateId": "DIR_NP_OPERATIONS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "OFF_PRI_DOS",
    "name": "Primary Director of Studies (DOS) Office",
    "departmentId": "DEP_PRI_ACADEMICS",
    "directorateId": "DIR_PRI_ACADEMICS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "OFF_PRI_EXAMS",
    "name": "Primary Examinations Office Office",
    "departmentId": "DEP_PRI_ACADEMICS",
    "directorateId": "DIR_PRI_ACADEMICS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "OFF_NUR_HEAD",
    "name": "ECD & Nursery Milestones Office",
    "departmentId": "DEP_NUR_ACADEMICS",
    "directorateId": "DIR_NUR_ACADEMICS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "OFF_NP_CLINIC",
    "name": "School Clinic & Health Office",
    "departmentId": "DEP_NP_HEALTH",
    "directorateId": "DIR_NP_WELFARE",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "OFF_NP_SAFEGUARDING",
    "name": "Safeguarding & Welfare Office",
    "departmentId": "DEP_NP_WELFARE",
    "directorateId": "DIR_NP_WELFARE",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "OFF_NP_TRANSPORT",
    "name": "School Transport & Fleet Office",
    "departmentId": "DEP_NP_LOGISTICS",
    "directorateId": "DIR_NP_OPERATIONS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  },
  {
    "id": "OFF_NP_CATERING",
    "name": "Dining & Catering Office",
    "departmentId": "DEP_NP_LOGISTICS",
    "directorateId": "DIR_NP_OPERATIONS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP"
  }
],
  portalsCount: 12,
  portals: [
  {
    "id": "PORTAL_EDU_HEAD",
    "name": "Head Teacher / Director Office",
    "officeId": "OFF_NP_HEAD",
    "departmentId": "DEP_NP_EXECUTIVE",
    "directorateId": "DIR_NP_GOVERNANCE",
    "route": "/nursery-primary/head",
    "roles": [
      "ROLE_HEAD_TEACHER",
      "ROLE_DIRECTOR"
    ]
  },
  {
    "id": "PORTAL_EDU_ADMISSION",
    "name": "Consolidated Admissions",
    "officeId": "OFF_NP_ADMISSIONS",
    "departmentId": "DEP_NP_ADMISSIONS",
    "directorateId": "DIR_NP_STUDENTS",
    "route": "/nursery-primary/admissions",
    "roles": [
      "ROLE_ADMISSIONS_OFFICER"
    ]
  },
  {
    "id": "PORTAL_EDU_HR",
    "name": "Staff & Teacher HR",
    "officeId": "OFF_NP_HR",
    "departmentId": "DEP_NP_ADMINISTRATION",
    "directorateId": "DIR_NP_OPERATIONS",
    "route": "/nursery-primary/hr",
    "roles": [
      "ROLE_HR_OFFICER"
    ]
  },
  {
    "id": "PORTAL_EDU_BURSAR",
    "name": "School Bursar & Finance",
    "officeId": "OFF_NP_BURSAR",
    "departmentId": "DEP_NP_FINANCE",
    "directorateId": "DIR_NP_FINANCE",
    "route": "/nursery-primary/bursar",
    "roles": [
      "ROLE_BURSAR",
      "ROLE_ACCOUNTANT"
    ]
  },
  {
    "id": "PORTAL_EDU_STORES",
    "name": "Stores & Procurement",
    "officeId": "OFF_NP_STORES",
    "departmentId": "DEP_NP_LOGISTICS",
    "directorateId": "DIR_NP_OPERATIONS",
    "route": "/nursery-primary/stores",
    "roles": [
      "ROLE_STOREKEEPER"
    ]
  },
  {
    "id": "PORTAL_PRI_DOS",
    "name": "Primary Director of Studies (DOS)",
    "officeId": "OFF_PRI_DOS",
    "departmentId": "DEP_PRI_ACADEMICS",
    "directorateId": "DIR_PRI_ACADEMICS",
    "route": "/nursery-primary/dos",
    "roles": [
      "ROLE_PRIMARY_DOS"
    ]
  },
  {
    "id": "PORTAL_PRI_EXAMS",
    "name": "Primary Examinations Office",
    "officeId": "OFF_PRI_EXAMS",
    "departmentId": "DEP_PRI_ACADEMICS",
    "directorateId": "DIR_PRI_ACADEMICS",
    "route": "/nursery-primary/exams",
    "roles": [
      "ROLE_EXAM_OFFICER"
    ]
  },
  {
    "id": "PORTAL_NUR_MILESTONES",
    "name": "ECD & Nursery Milestones",
    "officeId": "OFF_NUR_HEAD",
    "departmentId": "DEP_NUR_ACADEMICS",
    "directorateId": "DIR_NUR_ACADEMICS",
    "route": "/nursery-primary/milestones",
    "roles": [
      "ROLE_NURSERY_HEAD",
      "ROLE_ECD_TEACHER"
    ]
  },
  {
    "id": "PORTAL_EDU_CLINIC",
    "name": "School Clinic & Health",
    "officeId": "OFF_NP_CLINIC",
    "departmentId": "DEP_NP_HEALTH",
    "directorateId": "DIR_NP_WELFARE",
    "route": "/nursery-primary/clinic",
    "roles": [
      "ROLE_NURSE",
      "ROLE_DOCTOR"
    ]
  },
  {
    "id": "PORTAL_EDU_WELFARE",
    "name": "Safeguarding & Welfare",
    "officeId": "OFF_NP_SAFEGUARDING",
    "departmentId": "DEP_NP_WELFARE",
    "directorateId": "DIR_NP_WELFARE",
    "route": "/nursery-primary/safeguard",
    "roles": [
      "ROLE_SAFEGUARDING_LEAD"
    ]
  },
  {
    "id": "PORTAL_EDU_TRANSPORT",
    "name": "School Transport & Fleet",
    "officeId": "OFF_NP_TRANSPORT",
    "departmentId": "DEP_NP_LOGISTICS",
    "directorateId": "DIR_NP_OPERATIONS",
    "route": "/nursery-primary/transport",
    "roles": [
      "ROLE_TRANSPORT_MANAGER"
    ]
  },
  {
    "id": "PORTAL_EDU_CATERING",
    "name": "Dining & Catering",
    "officeId": "OFF_NP_CATERING",
    "departmentId": "DEP_NP_LOGISTICS",
    "directorateId": "DIR_NP_OPERATIONS",
    "route": "/nursery-primary/catering",
    "roles": [
      "ROLE_CATERING_MANAGER"
    ]
  }
],
  modulesCount: 9,
  modules: [
  {
    "id": "MOD_NP_ECD_MILESTONES",
    "name": "Early Childhood Development & Milestones",
    "code": "NP-ECD-01",
    "path": "products/nursery-primary-erp/web/portals/academics-ecd/NurseryMilestonesPortal.tsx"
  },
  {
    "id": "MOD_NP_PRIMARY_ACADEMICS",
    "name": "Primary Curriculum & Assessment",
    "code": "NP-PRI-01",
    "path": "products/nursery-primary-erp/web/portals/academics-primary/PrimaryAcademicPortals.tsx"
  },
  {
    "id": "MOD_NP_PRIMARY_DOS",
    "name": "Primary Studies & Timetabling",
    "code": "NP-PRI-02",
    "path": "products/nursery-primary-erp/web/portals/academics-primary/PrimaryDosPortal.tsx"
  },
  {
    "id": "MOD_NP_ADMISSIONS",
    "name": "Consolidated Student Admissions",
    "code": "NP-ADM-01",
    "path": "products/nursery-primary-erp/domain/AdmissionsService.ts"
  },
  {
    "id": "MOD_NP_BURSARY",
    "name": "Fee Invoicing & Bursar Ledger",
    "code": "NP-FIN-01",
    "path": "products/nursery-primary-erp/domain/NurseryPrimaryService.ts"
  },
  {
    "id": "MOD_NP_SAFEGUARDING",
    "name": "Child Protection & Safeguarding",
    "code": "NP-SAF-01",
    "path": "products/nursery-primary-erp/domain/SafeguardingService.ts"
  },
  {
    "id": "MOD_NP_CLINIC",
    "name": "Infirmary & Pediatric Health",
    "code": "NP-CLI-01",
    "path": "products/nursery-primary-erp/domain/ClinicService.ts"
  },
  {
    "id": "MOD_NP_CATERING",
    "name": "Nutrition & School Dining",
    "code": "NP-CAT-01",
    "path": "products/nursery-primary-erp/domain/CateringService.ts"
  },
  {
    "id": "MOD_NP_TRANSPORT",
    "name": "Student Bus Routing & Tracking",
    "code": "NP-TRA-01",
    "path": "products/nursery-primary-erp/domain/TransportService.ts"
  }
],
  capabilitiesCount: 9,
  capabilities: [
  {
    "id": "CAP_NP_ECD_MILESTONES",
    "name": "Early Childhood Development & Milestones Engine",
    "moduleId": "MOD_NP_ECD_MILESTONES",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "enabled": true
  },
  {
    "id": "CAP_NP_PRIMARY_ACADEMICS",
    "name": "Primary Curriculum & Assessment Engine",
    "moduleId": "MOD_NP_PRIMARY_ACADEMICS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "enabled": true
  },
  {
    "id": "CAP_NP_PRIMARY_DOS",
    "name": "Primary Studies & Timetabling Engine",
    "moduleId": "MOD_NP_PRIMARY_DOS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "enabled": true
  },
  {
    "id": "CAP_NP_ADMISSIONS",
    "name": "Consolidated Student Admissions Engine",
    "moduleId": "MOD_NP_ADMISSIONS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "enabled": true
  },
  {
    "id": "CAP_NP_BURSARY",
    "name": "Fee Invoicing & Bursar Ledger Engine",
    "moduleId": "MOD_NP_BURSARY",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "enabled": true
  },
  {
    "id": "CAP_NP_SAFEGUARDING",
    "name": "Child Protection & Safeguarding Engine",
    "moduleId": "MOD_NP_SAFEGUARDING",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "enabled": true
  },
  {
    "id": "CAP_NP_CLINIC",
    "name": "Infirmary & Pediatric Health Engine",
    "moduleId": "MOD_NP_CLINIC",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "enabled": true
  },
  {
    "id": "CAP_NP_CATERING",
    "name": "Nutrition & School Dining Engine",
    "moduleId": "MOD_NP_CATERING",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "enabled": true
  },
  {
    "id": "CAP_NP_TRANSPORT",
    "name": "Student Bus Routing & Tracking Engine",
    "moduleId": "MOD_NP_TRANSPORT",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "enabled": true
  }
],
  uiMetadataCount: 12,
  uiMetadata: [
  {
    "id": "UI_NP_EDU_HEAD",
    "capabilityId": "CAP_NP_ECD_MILESTONES",
    "componentType": "PORTAL",
    "route": "/nursery-primary/head",
    "metadata": {
      "title": "Head Teacher / Director Office",
      "roles": [
        "ROLE_HEAD_TEACHER",
        "ROLE_DIRECTOR"
      ]
    }
  },
  {
    "id": "UI_NP_EDU_ADMISSION",
    "capabilityId": "CAP_NP_ECD_MILESTONES",
    "componentType": "PORTAL",
    "route": "/nursery-primary/admissions",
    "metadata": {
      "title": "Consolidated Admissions",
      "roles": [
        "ROLE_ADMISSIONS_OFFICER"
      ]
    }
  },
  {
    "id": "UI_NP_EDU_HR",
    "capabilityId": "CAP_NP_ECD_MILESTONES",
    "componentType": "PORTAL",
    "route": "/nursery-primary/hr",
    "metadata": {
      "title": "Staff & Teacher HR",
      "roles": [
        "ROLE_HR_OFFICER"
      ]
    }
  },
  {
    "id": "UI_NP_EDU_BURSAR",
    "capabilityId": "CAP_NP_ECD_MILESTONES",
    "componentType": "PORTAL",
    "route": "/nursery-primary/bursar",
    "metadata": {
      "title": "School Bursar & Finance",
      "roles": [
        "ROLE_BURSAR",
        "ROLE_ACCOUNTANT"
      ]
    }
  },
  {
    "id": "UI_NP_EDU_STORES",
    "capabilityId": "CAP_NP_ECD_MILESTONES",
    "componentType": "PORTAL",
    "route": "/nursery-primary/stores",
    "metadata": {
      "title": "Stores & Procurement",
      "roles": [
        "ROLE_STOREKEEPER"
      ]
    }
  },
  {
    "id": "UI_NP_PRI_DOS",
    "capabilityId": "CAP_NP_ECD_MILESTONES",
    "componentType": "PORTAL",
    "route": "/nursery-primary/dos",
    "metadata": {
      "title": "Primary Director of Studies (DOS)",
      "roles": [
        "ROLE_PRIMARY_DOS"
      ]
    }
  },
  {
    "id": "UI_NP_PRI_EXAMS",
    "capabilityId": "CAP_NP_ECD_MILESTONES",
    "componentType": "PORTAL",
    "route": "/nursery-primary/exams",
    "metadata": {
      "title": "Primary Examinations Office",
      "roles": [
        "ROLE_EXAM_OFFICER"
      ]
    }
  },
  {
    "id": "UI_NP_NUR_MILESTONES",
    "capabilityId": "CAP_NP_ECD_MILESTONES",
    "componentType": "PORTAL",
    "route": "/nursery-primary/milestones",
    "metadata": {
      "title": "ECD & Nursery Milestones",
      "roles": [
        "ROLE_NURSERY_HEAD",
        "ROLE_ECD_TEACHER"
      ]
    }
  },
  {
    "id": "UI_NP_EDU_CLINIC",
    "capabilityId": "CAP_NP_ECD_MILESTONES",
    "componentType": "PORTAL",
    "route": "/nursery-primary/clinic",
    "metadata": {
      "title": "School Clinic & Health",
      "roles": [
        "ROLE_NURSE",
        "ROLE_DOCTOR"
      ]
    }
  },
  {
    "id": "UI_NP_EDU_WELFARE",
    "capabilityId": "CAP_NP_ECD_MILESTONES",
    "componentType": "PORTAL",
    "route": "/nursery-primary/safeguard",
    "metadata": {
      "title": "Safeguarding & Welfare",
      "roles": [
        "ROLE_SAFEGUARDING_LEAD"
      ]
    }
  },
  {
    "id": "UI_NP_EDU_TRANSPORT",
    "capabilityId": "CAP_NP_ECD_MILESTONES",
    "componentType": "PORTAL",
    "route": "/nursery-primary/transport",
    "metadata": {
      "title": "School Transport & Fleet",
      "roles": [
        "ROLE_TRANSPORT_MANAGER"
      ]
    }
  },
  {
    "id": "UI_NP_EDU_CATERING",
    "capabilityId": "CAP_NP_ECD_MILESTONES",
    "componentType": "PORTAL",
    "route": "/nursery-primary/catering",
    "metadata": {
      "title": "Dining & Catering",
      "roles": [
        "ROLE_CATERING_MANAGER"
      ]
    }
  }
],
  runtimeComponentsCount: 4,
  runtimeComponents: [
  {
    "id": "RTC_NP_SHELL",
    "capabilityId": "CAP_NP_ECD_MILESTONES",
    "componentPath": "src/products/nursery-primary-erp/web/NurseryPrimaryErpWebShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_NP_ECD",
    "capabilityId": "CAP_NP_ECD_MILESTONES",
    "componentPath": "src/products/nursery-primary-erp/web/portals/academics-ecd/NurseryMilestonesPortal.tsx",
    "loaded": true
  },
  {
    "id": "RTC_NP_PRI_DOS",
    "capabilityId": "CAP_NP_PRIMARY_ACADEMICS",
    "componentPath": "src/products/nursery-primary-erp/web/portals/academics-primary/PrimaryDosPortal.tsx",
    "loaded": true
  },
  {
    "id": "RTC_NP_BURSAR",
    "capabilityId": "CAP_NP_BURSARY",
    "componentPath": "src/products/nursery-primary-erp/web/portals/finance/BursarPortal.tsx",
    "loaded": true
  }
],
  services: [
  "AdmissionsService",
  "NurseryPrimaryService",
  "SafeguardingService",
  "ClinicService",
  "CateringService",
  "TransportService"
],
  workflows: [
  "StudentEnrollmentWorkflow",
  "FeeBillingWorkflow",
  "SafeguardingIncidentWorkflow",
  "ClinicReferralWorkflow"
],
  agents: [
  "PrimaryAcademicAgent",
  "EcdMilestoneTrackerAgent",
  "BursarTuitionReconciler"
],
  reports: [
  "TermlyReportCard",
  "EcdDevelopmentMilestoneReport",
  "TuitionCollectionReport",
  "ImmunizationAudit"
],
  dashboards: [
  "NurseryPrimaryConsolidatedDashboard",
  "PrimaryAcademicPortals",
  "SafeguardingDashboard"
],
  authenticationBoundaries: [
  "STAFF_ROLE_WALL",
  "PARENT_PORTAL_BOUNDARY",
  "TEACHER_GRADEBOOK_AUTH"
],
  permissions: [
  "ROLE_HEAD_TEACHER",
  "ROLE_PRIMARY_DOS",
  "ROLE_ECD_TEACHER",
  "ROLE_BURSAR",
  "ROLE_NURSE",
  "ROLE_SAFEGUARDING_LEAD"
],
  dependencies: [
  "JUMO-PLATFORM-KERNEL",
  "EDUCATION-TEMPLATE-REGISTRY"
],
  benchmarkReferences: [
  "K-12ConsolidatedEducationStandard",
  "UgandaNationalCurriculumECD_Primary"
],
  recoveryEvidence: "Discovered consolidated domain services, ECD milestone portals, primary DOS portals, and safeguarding engine.",
  implementationStatus: "RECONCILED"
} as const);

export default JUMO_NURSERY_PRIMARY_MANIFEST;
