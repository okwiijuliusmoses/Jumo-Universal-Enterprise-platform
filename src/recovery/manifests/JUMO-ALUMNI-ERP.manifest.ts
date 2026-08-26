/**
 * JUMO UEOS — AUTHORITATIVE PRODUCT MANIFEST
 * PRODUCT: Alumni ERP (JUMO-ALUMNI-ERP)
 *
 * Generated from authoritative repository evidence in /app/jumo-restored/
 */

export const JUMO_ALUMNI_MANIFEST = Object.freeze({
  productId: "JUMO-ALUMNI-ERP",
  productName: "Alumni ERP",
  productType: "ERP",
  category: "ALUMNI",
  version: "14.0.0",
  consolidated: false,
  canonicalRoute: "/alumni",
  directories: [
  "src/products/alumni-erp"
],
  sourceFilesCount: 16,
  sourceFiles: [
  "products/alumni-erp/domain/AlumniErpService.ts",
  "products/alumni-erp/domain/AlumniService.ts",
  "products/alumni-erp/domain/types.ts",
  "products/alumni-erp/index.ts",
  "products/alumni-erp/manifest.json",
  "products/alumni-erp/mobile/AlumniErpMobileApp.tsx",
  "products/alumni-erp/web/AlumniErpWebShell.tsx",
  "products/alumni-erp/web/modules/AlumniCareerModule.tsx",
  "products/alumni-erp/web/modules/AlumniChaptersModule.tsx",
  "products/alumni-erp/web/modules/AlumniDashboard.tsx",
  "products/alumni-erp/web/modules/AlumniGivingModule.tsx",
  "products/alumni-erp/web/modules/AlumniRegistryModule.tsx",
  "products/alumni-erp/web/portals/AlumniOffices.tsx",
  "products/alumni-erp/web/portals/AlumniPortals.tsx",
  "products/alumni-erp/web/portals/finance/AlumniDonationPortal.tsx",
  "products/alumni-erp/web/portals/registry/AlumniRegistryPortal.tsx"
],
  directoratesCount: 4,
  directorates: [
  {
    "id": "DIR_ALUM_GOVERNANCE",
    "name": "Alumni Governance & Board Directorate",
    "productId": "JUMO-ALUMNI-ERP"
  },
  {
    "id": "DIR_ALUM_ADVANCEMENT",
    "name": "Advancement, Records & Chapters Directorate",
    "productId": "JUMO-ALUMNI-ERP"
  },
  {
    "id": "DIR_ALUM_FINANCE",
    "name": "Endowment, Giving & Treasury Directorate",
    "productId": "JUMO-ALUMNI-ERP"
  },
  {
    "id": "DIR_ALUM_PROGRAMS",
    "name": "Career Services & Alumni Programs Directorate",
    "productId": "JUMO-ALUMNI-ERP"
  }
],
  departmentsCount: 8,
  departments: [
  {
    "id": "DEP_ALUM_EXECUTIVE",
    "name": "Office of the Alumni Director",
    "directorateId": "DIR_ALUM_GOVERNANCE",
    "productId": "JUMO-ALUMNI-ERP"
  },
  {
    "id": "DEP_ALUM_GOVERNANCE",
    "name": "Association Board & Committees",
    "directorateId": "DIR_ALUM_GOVERNANCE",
    "productId": "JUMO-ALUMNI-ERP"
  },
  {
    "id": "DEP_ALUM_RECORDS",
    "name": "Graduate Records & Census Verification",
    "directorateId": "DIR_ALUM_ADVANCEMENT",
    "productId": "JUMO-ALUMNI-ERP"
  },
  {
    "id": "DEP_ALUM_CHAPTERS",
    "name": "Global Chapters & Diaspora Networks",
    "directorateId": "DIR_ALUM_ADVANCEMENT",
    "productId": "JUMO-ALUMNI-ERP"
  },
  {
    "id": "DEP_ALUM_ENGAGEMENT",
    "name": "Alumni Relations & Reunions",
    "directorateId": "DIR_ALUM_ADVANCEMENT",
    "productId": "JUMO-ALUMNI-ERP"
  },
  {
    "id": "DEP_ALUM_COMMUNICATIONS",
    "name": "Publications & Public Relations",
    "directorateId": "DIR_ALUM_ADVANCEMENT",
    "productId": "JUMO-ALUMNI-ERP"
  },
  {
    "id": "DEP_ALUM_FINANCE",
    "name": "Endowment Fund & Major Giving Campaigns",
    "directorateId": "DIR_ALUM_FINANCE",
    "productId": "JUMO-ALUMNI-ERP"
  },
  {
    "id": "DEP_ALUM_PROGRAMS",
    "name": "Career Mentorship & Networking",
    "directorateId": "DIR_ALUM_PROGRAMS",
    "productId": "JUMO-ALUMNI-ERP"
  }
],
  officesCount: 12,
  offices: [
  {
    "id": "OFF_ALUM_DIR",
    "name": "Alumni Director Office Office",
    "departmentId": "DEP_ALUM_EXECUTIVE",
    "directorateId": "DIR_ALUM_GOVERNANCE",
    "productId": "JUMO-ALUMNI-ERP"
  },
  {
    "id": "OFF_ALUM_BOARD",
    "name": "Association Board Office",
    "departmentId": "DEP_ALUM_GOVERNANCE",
    "directorateId": "DIR_ALUM_GOVERNANCE",
    "productId": "JUMO-ALUMNI-ERP"
  },
  {
    "id": "OFF_ALUM_REGISTRAR",
    "name": "Graduate Records & Census Office",
    "departmentId": "DEP_ALUM_RECORDS",
    "directorateId": "DIR_ALUM_ADVANCEMENT",
    "productId": "JUMO-ALUMNI-ERP"
  },
  {
    "id": "OFF_ALUM_CHAPTERS",
    "name": "Global Chapters Network Office",
    "departmentId": "DEP_ALUM_CHAPTERS",
    "directorateId": "DIR_ALUM_ADVANCEMENT",
    "productId": "JUMO-ALUMNI-ERP"
  },
  {
    "id": "OFF_ALUM_ENGAGE",
    "name": "Engagement & Reunion Office",
    "departmentId": "DEP_ALUM_ENGAGEMENT",
    "directorateId": "DIR_ALUM_ADVANCEMENT",
    "productId": "JUMO-ALUMNI-ERP"
  },
  {
    "id": "OFF_ALUM_COMM",
    "name": "Alumni Communications Office",
    "departmentId": "DEP_ALUM_COMMUNICATIONS",
    "directorateId": "DIR_ALUM_ADVANCEMENT",
    "productId": "JUMO-ALUMNI-ERP"
  },
  {
    "id": "OFF_ALUM_ENDOWMENT",
    "name": "Endowment Fund Management Office",
    "departmentId": "DEP_ALUM_FINANCE",
    "directorateId": "DIR_ALUM_FINANCE",
    "productId": "JUMO-ALUMNI-ERP"
  },
  {
    "id": "OFF_ALUM_GIVING",
    "name": "Annual Giving Campaigns Office",
    "departmentId": "DEP_ALUM_FINANCE",
    "directorateId": "DIR_ALUM_FINANCE",
    "productId": "JUMO-ALUMNI-ERP"
  },
  {
    "id": "OFF_ALUM_TREASURY",
    "name": "Contribution Reconciliation Office",
    "departmentId": "DEP_ALUM_FINANCE",
    "directorateId": "DIR_ALUM_FINANCE",
    "productId": "JUMO-ALUMNI-ERP"
  },
  {
    "id": "OFF_ALUM_CAREER",
    "name": "Career & Mentorship Hub Office",
    "departmentId": "DEP_ALUM_PROGRAMS",
    "directorateId": "DIR_ALUM_PROGRAMS",
    "productId": "JUMO-ALUMNI-ERP"
  },
  {
    "id": "OFF_ALUM_COMMUNITY",
    "name": "Community & Class Groups Office",
    "departmentId": "DEP_ALUM_PROGRAMS",
    "directorateId": "DIR_ALUM_PROGRAMS",
    "productId": "JUMO-ALUMNI-ERP"
  },
  {
    "id": "OFF_ALUM_EVENTS",
    "name": "Events & Galas Office",
    "departmentId": "DEP_ALUM_PROGRAMS",
    "directorateId": "DIR_ALUM_PROGRAMS",
    "productId": "JUMO-ALUMNI-ERP"
  }
],
  portalsCount: 12,
  portals: [
  {
    "id": "PORTAL_ALUM_DIR",
    "name": "Alumni Director Office",
    "officeId": "OFF_ALUM_DIR",
    "departmentId": "DEP_ALUM_EXECUTIVE",
    "directorateId": "DIR_ALUM_GOVERNANCE",
    "route": "/alumni/director",
    "roles": [
      "ROLE_ALUMNI_DIRECTOR"
    ]
  },
  {
    "id": "PORTAL_ALUM_BOARD",
    "name": "Association Board",
    "officeId": "OFF_ALUM_BOARD",
    "departmentId": "DEP_ALUM_GOVERNANCE",
    "directorateId": "DIR_ALUM_GOVERNANCE",
    "route": "/alumni/board",
    "roles": [
      "ROLE_BOARD_MEMBER"
    ]
  },
  {
    "id": "PORTAL_ALUM_REGISTRAR",
    "name": "Graduate Records & Census",
    "officeId": "OFF_ALUM_REGISTRAR",
    "departmentId": "DEP_ALUM_RECORDS",
    "directorateId": "DIR_ALUM_ADVANCEMENT",
    "route": "/alumni/records",
    "roles": [
      "ROLE_RECORDS_OFFICER"
    ]
  },
  {
    "id": "PORTAL_ALUM_CHAPTERS",
    "name": "Global Chapters Network",
    "officeId": "OFF_ALUM_CHAPTERS",
    "departmentId": "DEP_ALUM_CHAPTERS",
    "directorateId": "DIR_ALUM_ADVANCEMENT",
    "route": "/alumni/chapters",
    "roles": [
      "ROLE_CHAPTER_LEAD"
    ]
  },
  {
    "id": "PORTAL_ALUM_ENGAGE",
    "name": "Engagement & Reunion",
    "officeId": "OFF_ALUM_ENGAGE",
    "departmentId": "DEP_ALUM_ENGAGEMENT",
    "directorateId": "DIR_ALUM_ADVANCEMENT",
    "route": "/alumni/engagement",
    "roles": [
      "ROLE_ENGAGEMENT_LEAD"
    ]
  },
  {
    "id": "PORTAL_ALUM_COMM",
    "name": "Alumni Communications",
    "officeId": "OFF_ALUM_COMM",
    "departmentId": "DEP_ALUM_COMMUNICATIONS",
    "directorateId": "DIR_ALUM_ADVANCEMENT",
    "route": "/alumni/comm",
    "roles": [
      "ROLE_COMM_OFFICER"
    ]
  },
  {
    "id": "PORTAL_ALUM_FUND",
    "name": "Endowment Fund Management",
    "officeId": "OFF_ALUM_ENDOWMENT",
    "departmentId": "DEP_ALUM_FINANCE",
    "directorateId": "DIR_ALUM_FINANCE",
    "route": "/alumni/endowment",
    "roles": [
      "ROLE_FUND_DIRECTOR"
    ]
  },
  {
    "id": "PORTAL_ALUM_GIVING",
    "name": "Annual Giving Campaigns",
    "officeId": "OFF_ALUM_GIVING",
    "departmentId": "DEP_ALUM_FINANCE",
    "directorateId": "DIR_ALUM_FINANCE",
    "route": "/alumni/giving",
    "roles": [
      "ROLE_GIVING_OFFICER"
    ]
  },
  {
    "id": "PORTAL_ALUM_RECONCILE",
    "name": "Contribution Reconciliation",
    "officeId": "OFF_ALUM_TREASURY",
    "departmentId": "DEP_ALUM_FINANCE",
    "directorateId": "DIR_ALUM_FINANCE",
    "route": "/alumni/reconciliation",
    "roles": [
      "ROLE_ACCOUNTANT"
    ]
  },
  {
    "id": "PORTAL_ALUM_CAREER",
    "name": "Career & Mentorship Hub",
    "officeId": "OFF_ALUM_CAREER",
    "departmentId": "DEP_ALUM_PROGRAMS",
    "directorateId": "DIR_ALUM_PROGRAMS",
    "route": "/alumni/career",
    "roles": [
      "ROLE_CAREER_OFFICER"
    ]
  },
  {
    "id": "PORTAL_ALUM_COMMUNITY",
    "name": "Community & Class Groups",
    "officeId": "OFF_ALUM_COMMUNITY",
    "departmentId": "DEP_ALUM_PROGRAMS",
    "directorateId": "DIR_ALUM_PROGRAMS",
    "route": "/alumni/community",
    "roles": [
      "ROLE_COMMUNITY_LEAD"
    ]
  },
  {
    "id": "PORTAL_ALUM_EVENTS",
    "name": "Events & Galas",
    "officeId": "OFF_ALUM_EVENTS",
    "departmentId": "DEP_ALUM_PROGRAMS",
    "directorateId": "DIR_ALUM_PROGRAMS",
    "route": "/alumni/events",
    "roles": [
      "ROLE_EVENT_COORDINATOR"
    ]
  }
],
  modulesCount: 5,
  modules: [
  {
    "id": "MOD_ALUM_REGISTRY",
    "name": "Alumni Census & Graduate Registry",
    "code": "ALUM-REG-01",
    "path": "products/alumni-erp/web/modules/AlumniRegistryModule.tsx"
  },
  {
    "id": "MOD_ALUM_GIVING",
    "name": "Giving Campaigns & Endowments",
    "code": "ALUM-GIV-01",
    "path": "products/alumni-erp/web/modules/AlumniGivingModule.tsx"
  },
  {
    "id": "MOD_ALUM_CHAPTERS",
    "name": "Global Chapters & Diaspora Network",
    "code": "ALUM-CHP-01",
    "path": "products/alumni-erp/web/modules/AlumniChaptersModule.tsx"
  },
  {
    "id": "MOD_ALUM_CAREER",
    "name": "Career Services & Mentorship",
    "code": "ALUM-CAR-01",
    "path": "products/alumni-erp/web/modules/AlumniCareerModule.tsx"
  },
  {
    "id": "MOD_ALUM_DASHBOARD",
    "name": "Alumni Intelligence Dashboard",
    "code": "ALUM-DSH-01",
    "path": "products/alumni-erp/web/modules/AlumniDashboard.tsx"
  }
],
  capabilitiesCount: 5,
  capabilities: [
  {
    "id": "CAP_ALUM_REGISTRY",
    "name": "Alumni Census & Graduate Registry Engine",
    "moduleId": "MOD_ALUM_REGISTRY",
    "productId": "JUMO-ALUMNI-ERP",
    "enabled": true
  },
  {
    "id": "CAP_ALUM_GIVING",
    "name": "Giving Campaigns & Endowments Engine",
    "moduleId": "MOD_ALUM_GIVING",
    "productId": "JUMO-ALUMNI-ERP",
    "enabled": true
  },
  {
    "id": "CAP_ALUM_CHAPTERS",
    "name": "Global Chapters & Diaspora Network Engine",
    "moduleId": "MOD_ALUM_CHAPTERS",
    "productId": "JUMO-ALUMNI-ERP",
    "enabled": true
  },
  {
    "id": "CAP_ALUM_CAREER",
    "name": "Career Services & Mentorship Engine",
    "moduleId": "MOD_ALUM_CAREER",
    "productId": "JUMO-ALUMNI-ERP",
    "enabled": true
  },
  {
    "id": "CAP_ALUM_DASHBOARD",
    "name": "Alumni Intelligence Dashboard Engine",
    "moduleId": "MOD_ALUM_DASHBOARD",
    "productId": "JUMO-ALUMNI-ERP",
    "enabled": true
  }
],
  uiMetadataCount: 12,
  uiMetadata: [
  {
    "id": "UI_ALUM_DIR",
    "capabilityId": "CAP_ALUM_REGISTRY",
    "componentType": "PORTAL",
    "route": "/alumni/director",
    "metadata": {
      "title": "Alumni Director Office",
      "roles": [
        "ROLE_ALUMNI_DIRECTOR"
      ]
    }
  },
  {
    "id": "UI_ALUM_BOARD",
    "capabilityId": "CAP_ALUM_REGISTRY",
    "componentType": "PORTAL",
    "route": "/alumni/board",
    "metadata": {
      "title": "Association Board",
      "roles": [
        "ROLE_BOARD_MEMBER"
      ]
    }
  },
  {
    "id": "UI_ALUM_REGISTRAR",
    "capabilityId": "CAP_ALUM_REGISTRY",
    "componentType": "PORTAL",
    "route": "/alumni/records",
    "metadata": {
      "title": "Graduate Records & Census",
      "roles": [
        "ROLE_RECORDS_OFFICER"
      ]
    }
  },
  {
    "id": "UI_ALUM_CHAPTERS",
    "capabilityId": "CAP_ALUM_REGISTRY",
    "componentType": "PORTAL",
    "route": "/alumni/chapters",
    "metadata": {
      "title": "Global Chapters Network",
      "roles": [
        "ROLE_CHAPTER_LEAD"
      ]
    }
  },
  {
    "id": "UI_ALUM_ENGAGE",
    "capabilityId": "CAP_ALUM_REGISTRY",
    "componentType": "PORTAL",
    "route": "/alumni/engagement",
    "metadata": {
      "title": "Engagement & Reunion",
      "roles": [
        "ROLE_ENGAGEMENT_LEAD"
      ]
    }
  },
  {
    "id": "UI_ALUM_COMM",
    "capabilityId": "CAP_ALUM_REGISTRY",
    "componentType": "PORTAL",
    "route": "/alumni/comm",
    "metadata": {
      "title": "Alumni Communications",
      "roles": [
        "ROLE_COMM_OFFICER"
      ]
    }
  },
  {
    "id": "UI_ALUM_FUND",
    "capabilityId": "CAP_ALUM_REGISTRY",
    "componentType": "PORTAL",
    "route": "/alumni/endowment",
    "metadata": {
      "title": "Endowment Fund Management",
      "roles": [
        "ROLE_FUND_DIRECTOR"
      ]
    }
  },
  {
    "id": "UI_ALUM_GIVING",
    "capabilityId": "CAP_ALUM_REGISTRY",
    "componentType": "PORTAL",
    "route": "/alumni/giving",
    "metadata": {
      "title": "Annual Giving Campaigns",
      "roles": [
        "ROLE_GIVING_OFFICER"
      ]
    }
  },
  {
    "id": "UI_ALUM_RECONCILE",
    "capabilityId": "CAP_ALUM_REGISTRY",
    "componentType": "PORTAL",
    "route": "/alumni/reconciliation",
    "metadata": {
      "title": "Contribution Reconciliation",
      "roles": [
        "ROLE_ACCOUNTANT"
      ]
    }
  },
  {
    "id": "UI_ALUM_CAREER",
    "capabilityId": "CAP_ALUM_REGISTRY",
    "componentType": "PORTAL",
    "route": "/alumni/career",
    "metadata": {
      "title": "Career & Mentorship Hub",
      "roles": [
        "ROLE_CAREER_OFFICER"
      ]
    }
  },
  {
    "id": "UI_ALUM_COMMUNITY",
    "capabilityId": "CAP_ALUM_REGISTRY",
    "componentType": "PORTAL",
    "route": "/alumni/community",
    "metadata": {
      "title": "Community & Class Groups",
      "roles": [
        "ROLE_COMMUNITY_LEAD"
      ]
    }
  },
  {
    "id": "UI_ALUM_EVENTS",
    "capabilityId": "CAP_ALUM_REGISTRY",
    "componentType": "PORTAL",
    "route": "/alumni/events",
    "metadata": {
      "title": "Events & Galas",
      "roles": [
        "ROLE_EVENT_COORDINATOR"
      ]
    }
  }
],
  runtimeComponentsCount: 5,
  runtimeComponents: [
  {
    "id": "RTC_ALUM_SHELL",
    "capabilityId": "CAP_ALUM_REGISTRY",
    "componentPath": "src/products/alumni-erp/web/AlumniErpWebShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_ALUM_REG",
    "capabilityId": "CAP_ALUM_REGISTRY",
    "componentPath": "src/products/alumni-erp/web/modules/AlumniRegistryModule.tsx",
    "loaded": true
  },
  {
    "id": "RTC_ALUM_GIV",
    "capabilityId": "CAP_ALUM_GIVING",
    "componentPath": "src/products/alumni-erp/web/modules/AlumniGivingModule.tsx",
    "loaded": true
  },
  {
    "id": "RTC_ALUM_CHP",
    "capabilityId": "CAP_ALUM_CHAPTERS",
    "componentPath": "src/products/alumni-erp/web/modules/AlumniChaptersModule.tsx",
    "loaded": true
  },
  {
    "id": "RTC_ALUM_CAR",
    "capabilityId": "CAP_ALUM_CAREER",
    "componentPath": "src/products/alumni-erp/web/modules/AlumniCareerModule.tsx",
    "loaded": true
  }
],
  services: [
  "AlumniErpService",
  "AlumniService"
],
  workflows: [
  "AlumniVerificationWorkflow",
  "GivingCampaignPledgeWorkflow",
  "ChapterCharterWorkflow"
],
  agents: [
  "AlumniAdvancementAgent",
  "EndowmentYieldCalculator",
  "AlumniCareerNetworkAgent"
],
  reports: [
  "AlumniCensusReport",
  "GivingCampaignAnalytics",
  "ChapterPerformanceAudit",
  "EndowmentLedgerReport"
],
  dashboards: [
  "AlumniExecutiveDashboard",
  "AlumniGivingModule",
  "AlumniChaptersModule",
  "AlumniCareerModule"
],
  authenticationBoundaries: [
  "ALUMNI_PORTAL_AUTH",
  "DONOR_PRIVACY_SECURITY_WALL",
  "BOARD_GOVERNANCE_AUTH"
],
  permissions: [
  "ROLE_ALUMNI_DIRECTOR",
  "ROLE_BOARD_MEMBER",
  "ROLE_CHAPTER_LEAD",
  "ROLE_GIVING_OFFICER",
  "ROLE_CAREER_OFFICER"
],
  dependencies: [
  "JUMO-PLATFORM-KERNEL",
  "FAAP-CORE-ENGINE"
],
  benchmarkReferences: [
  "SovereignAlumniAdvancementStandard-v1"
],
  recoveryEvidence: "Discovered full Alumni ERP domain services, modular chapter/career/giving/registry web views, and mobile application wrapper.",
  implementationStatus: "RECONCILED"
} as const);

export default JUMO_ALUMNI_MANIFEST;
