/**
 * JUMO UEOS — AUTHORITATIVE PRODUCT MANIFEST
 * PRODUCT: Church ERP (JUMO-CHURCH-ERP)
 *
 * Generated from authoritative repository evidence in /app/jumo-restored/
 */

export const JUMO_CHURCH_MANIFEST = Object.freeze({
  productId: "JUMO-CHURCH-ERP",
  productName: "Church ERP",
  productType: "ERP",
  category: "CHURCH",
  version: "14.0.0",
  consolidated: false,
  canonicalRoute: "/church",
  directories: [
  "src/products/church-erp"
],
  sourceFilesCount: 35,
  sourceFiles: [
  "products/church-erp/domain/ChurchErpService.ts",
  "products/church-erp/domain/ChurchPeopleService.ts",
  "products/church-erp/domain/ChurchService.ts",
  "products/church-erp/domain/types.ts",
  "products/church-erp/index.ts",
  "products/church-erp/manifest.json",
  "products/church-erp/mobile/ChurchErpMobileApp.tsx",
  "products/church-erp/offices/BishopOffice.tsx",
  "products/church-erp/offices/ChurchFinanceOffice.tsx",
  "products/church-erp/offices/ChurchProjectsOffice.tsx",
  "products/church-erp/offices/ParishPriestOffice.tsx",
  "products/church-erp/offices/SacramentalOffice.tsx",
  "products/church-erp/offices/index.ts",
  "products/church-erp/web/ChurchErpWebShell.tsx",
  "products/church-erp/web/modules/ChurchDashboard.tsx",
  "products/church-erp/web/modules/ChurchFinance.tsx",
  "products/church-erp/web/modules/EventManager.tsx",
  "products/church-erp/web/modules/MemberDirectory.tsx",
  "products/church-erp/web/modules/PastoralCare.tsx",
  "products/church-erp/web/portals/ChurchErpControlCenter.tsx",
  "products/church-erp/web/portals/ChurchErpDeveloperCenter.tsx",
  "products/church-erp/web/portals/ChurchOffices.tsx",
  "products/church-erp/web/portals/ChurchPortals.tsx",
  "products/church-erp/web/portals/clergy/ChurchClergyPortal.tsx",
  "products/church-erp/web/portals/membership/ChurchCensusIntelligencePortal.tsx",
  "products/church-erp/web/portals/membership/ChurchMembershipPortal.tsx",
  "products/church-erp/web/portals/parish/ChurchPastorPortal.tsx",
  "products/church-erp/web/portals/parish/ChurchSecretariatPortal.tsx",
  "products/church-erp/web/portals/people/ChurchEventRegistrationModal.tsx",
  "products/church-erp/web/portals/people/ChurchMemberProfileCard.tsx",
  "products/church-erp/web/portals/people/ChurchPersonnelBioDataModal.tsx",
  "products/church-erp/web/portals/people/ChurchPersonnelRosterPortal.tsx",
  "products/church-erp/web/portals/people/ChurchSacramentsRegistryModal.tsx",
  "products/church-erp/web/portals/people/ChurchTithesLedgerModal.tsx",
  "products/church-erp/web/portals/treasury/ChurchTreasuryPortal.tsx"
],
  directoratesCount: 5,
  directorates: [
  {
    "id": "DIR_CH_ECCLESIASTICAL",
    "name": "Ecclesiastical Governance & Chancery Directorate",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "DIR_CH_PARISH",
    "name": "Parish Pastoral & Sacramental Directorate",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "DIR_CH_MINISTRY",
    "name": "Congregation Ministry & Welfare Directorate",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "DIR_CH_FINANCE",
    "name": "Diocesan Treasury & Tithes Directorate",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "DIR_CH_OPERATIONS",
    "name": "Church Projects & Communications Directorate",
    "productId": "JUMO-CHURCH-ERP"
  }
],
  departmentsCount: 8,
  departments: [
  {
    "id": "DEP_CH_EPISCOPAL",
    "name": "Episcopal See & Bishopric Secretariat",
    "directorateId": "DIR_CH_ECCLESIASTICAL",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "DEP_CH_CHANCERY",
    "name": "Diocesan Chancery & Archdeaconries",
    "directorateId": "DIR_CH_ECCLESIASTICAL",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "DEP_CH_PARISH",
    "name": "Parish Pastoral Offices & Sacramental Registries",
    "directorateId": "DIR_CH_PARISH",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "DEP_CH_MINISTRY",
    "name": "Congregation Membership, Auxiliaries & Liturgy",
    "directorateId": "DIR_CH_MINISTRY",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "DEP_CH_FINANCE",
    "name": "Diocesan Treasury, Tithes & Stewardship",
    "directorateId": "DIR_CH_FINANCE",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "DEP_CH_DEVELOPMENT",
    "name": "Church Building Projects & Benevolence Welfare",
    "directorateId": "DIR_CH_OPERATIONS",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "DEP_CH_COMMUNICATIONS",
    "name": "Diocesan Publications & Media Operations",
    "directorateId": "DIR_CH_OPERATIONS",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "DEP_CH_TECH",
    "name": "Church ERP Technology & Administration",
    "directorateId": "DIR_CH_OPERATIONS",
    "productId": "JUMO-CHURCH-ERP"
  }
],
  officesCount: 19,
  offices: [
  {
    "id": "OFF_CH_BISHOP",
    "name": "Bishop / Overseer Office Office",
    "departmentId": "DEP_CH_EPISCOPAL",
    "directorateId": "DIR_CH_ECCLESIASTICAL",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "OFF_CH_SYNOD",
    "name": "Diocesan Synod Secretariat Office",
    "departmentId": "DEP_CH_EPISCOPAL",
    "directorateId": "DIR_CH_ECCLESIASTICAL",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "OFF_CH_CHANCELLOR",
    "name": "Diocesan Chancellor Office",
    "departmentId": "DEP_CH_CHANCERY",
    "directorateId": "DIR_CH_ECCLESIASTICAL",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "OFF_CH_ARCH",
    "name": "Archdeaconry Administration Office",
    "departmentId": "DEP_CH_CHANCERY",
    "directorateId": "DIR_CH_ECCLESIASTICAL",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "OFF_CH_PRIEST",
    "name": "Parish Priest Office Office",
    "departmentId": "DEP_CH_PARISH",
    "directorateId": "DIR_CH_PARISH",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "OFF_CH_SACRAMENTS",
    "name": "Sacraments & Rites Registry Office",
    "departmentId": "DEP_CH_PARISH",
    "directorateId": "DIR_CH_PARISH",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "OFF_CH_MEMBERSHIP",
    "name": "Congregation Membership Office",
    "departmentId": "DEP_CH_MINISTRY",
    "directorateId": "DIR_CH_MINISTRY",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "OFF_CH_PASTORAL",
    "name": "Pastoral Care & Visitation Office",
    "departmentId": "DEP_CH_MINISTRY",
    "directorateId": "DIR_CH_MINISTRY",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "OFF_CH_LITURGY",
    "name": "Liturgy & Event Planner Office",
    "departmentId": "DEP_CH_MINISTRY",
    "directorateId": "DIR_CH_MINISTRY",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "OFF_CH_MINISTRIES",
    "name": "Auxiliary Ministries Hub Office",
    "departmentId": "DEP_CH_MINISTRY",
    "directorateId": "DIR_CH_MINISTRY",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "OFF_CH_TREASURY",
    "name": "Parish / Diocesan Treasury Office",
    "departmentId": "DEP_CH_FINANCE",
    "directorateId": "DIR_CH_FINANCE",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "OFF_CH_TITHES",
    "name": "Tithes & Offerings Ledger Office",
    "departmentId": "DEP_CH_FINANCE",
    "directorateId": "DIR_CH_FINANCE",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "OFF_CH_PROJECTS",
    "name": "Church Building & Projects Office",
    "departmentId": "DEP_CH_DEVELOPMENT",
    "directorateId": "DIR_CH_OPERATIONS",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "OFF_CH_WELFARE",
    "name": "Benevolence & Welfare Fund Office",
    "departmentId": "DEP_CH_DEVELOPMENT",
    "directorateId": "DIR_CH_MINISTRY",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "OFF_CH_MEDIA",
    "name": "Diocesan Media & Bulletin Office",
    "departmentId": "DEP_CH_COMMUNICATIONS",
    "directorateId": "DIR_CH_OPERATIONS",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "OFF_CH_DEV",
    "name": "Church ERP Developer Studio Office",
    "departmentId": "DEP_CH_TECH",
    "directorateId": "DIR_CH_OPERATIONS",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "OFF_CH_CTRL",
    "name": "Church ERP Control Center Office",
    "departmentId": "DEP_CH_TECH",
    "directorateId": "DIR_CH_OPERATIONS",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "OFF_CH_CENSUS",
    "name": "Diocesan Census Intelligence Office",
    "departmentId": "DEP_CH_EPISCOPAL",
    "directorateId": "DIR_CH_ECCLESIASTICAL",
    "productId": "JUMO-CHURCH-ERP"
  },
  {
    "id": "OFF_CH_ROSTER",
    "name": "Clergy & Personnel Roster Office",
    "departmentId": "DEP_CH_EPISCOPAL",
    "directorateId": "DIR_CH_ECCLESIASTICAL",
    "productId": "JUMO-CHURCH-ERP"
  }
],
  portalsCount: 19,
  portals: [
  {
    "id": "PORTAL_CH_BISHOP",
    "name": "Bishop / Overseer Office",
    "officeId": "OFF_CH_BISHOP",
    "departmentId": "DEP_CH_EPISCOPAL",
    "directorateId": "DIR_CH_ECCLESIASTICAL",
    "route": "/church/bishop",
    "roles": [
      "ROLE_BISHOP"
    ]
  },
  {
    "id": "PORTAL_CH_SYNOD",
    "name": "Diocesan Synod Secretariat",
    "officeId": "OFF_CH_SYNOD",
    "departmentId": "DEP_CH_EPISCOPAL",
    "directorateId": "DIR_CH_ECCLESIASTICAL",
    "route": "/church/synod",
    "roles": [
      "ROLE_SYNOD_SECRETARY"
    ]
  },
  {
    "id": "PORTAL_CH_CHANCELLOR",
    "name": "Diocesan Chancellor",
    "officeId": "OFF_CH_CHANCELLOR",
    "departmentId": "DEP_CH_CHANCERY",
    "directorateId": "DIR_CH_ECCLESIASTICAL",
    "route": "/church/chancellor",
    "roles": [
      "ROLE_CHANCELLOR"
    ]
  },
  {
    "id": "PORTAL_CH_ARCH",
    "name": "Archdeaconry Administration",
    "officeId": "OFF_CH_ARCH",
    "departmentId": "DEP_CH_CHANCERY",
    "directorateId": "DIR_CH_ECCLESIASTICAL",
    "route": "/church/archdeaconry",
    "roles": [
      "ROLE_ARCHDEACON"
    ]
  },
  {
    "id": "PORTAL_CH_PARISH",
    "name": "Parish Priest Office",
    "officeId": "OFF_CH_PRIEST",
    "departmentId": "DEP_CH_PARISH",
    "directorateId": "DIR_CH_PARISH",
    "route": "/church/parish",
    "roles": [
      "ROLE_PARISH_PRIEST"
    ]
  },
  {
    "id": "PORTAL_CH_SACRAMENTS",
    "name": "Sacraments & Rites Registry",
    "officeId": "OFF_CH_SACRAMENTS",
    "departmentId": "DEP_CH_PARISH",
    "directorateId": "DIR_CH_PARISH",
    "route": "/church/sacraments",
    "roles": [
      "ROLE_CURATE",
      "ROLE_PRIEST"
    ]
  },
  {
    "id": "PORTAL_CH_MEMBERS",
    "name": "Congregation Membership",
    "officeId": "OFF_CH_MEMBERSHIP",
    "departmentId": "DEP_CH_MINISTRY",
    "directorateId": "DIR_CH_MINISTRY",
    "route": "/church/membership",
    "roles": [
      "ROLE_MEMBERSHIP_SECRETARY"
    ]
  },
  {
    "id": "PORTAL_CH_PASTORAL",
    "name": "Pastoral Care & Visitation",
    "officeId": "OFF_CH_PASTORAL",
    "departmentId": "DEP_CH_MINISTRY",
    "directorateId": "DIR_CH_MINISTRY",
    "route": "/church/pastoral",
    "roles": [
      "ROLE_PASTORAL_CARE_LEAD"
    ]
  },
  {
    "id": "PORTAL_CH_EVENTS",
    "name": "Liturgy & Event Planner",
    "officeId": "OFF_CH_LITURGY",
    "departmentId": "DEP_CH_MINISTRY",
    "directorateId": "DIR_CH_MINISTRY",
    "route": "/church/liturgy",
    "roles": [
      "ROLE_LITURGY_LEAD"
    ]
  },
  {
    "id": "PORTAL_CH_MINISTRIES",
    "name": "Auxiliary Ministries Hub",
    "officeId": "OFF_CH_MINISTRIES",
    "departmentId": "DEP_CH_MINISTRY",
    "directorateId": "DIR_CH_MINISTRY",
    "route": "/church/ministries",
    "roles": [
      "ROLE_MINISTRY_LEAD"
    ]
  },
  {
    "id": "PORTAL_CH_TREASURY",
    "name": "Parish / Diocesan Treasury",
    "officeId": "OFF_CH_TREASURY",
    "departmentId": "DEP_CH_FINANCE",
    "directorateId": "DIR_CH_FINANCE",
    "route": "/church/treasury",
    "roles": [
      "ROLE_TREASURER"
    ]
  },
  {
    "id": "PORTAL_CH_TITHES",
    "name": "Tithes & Offerings Ledger",
    "officeId": "OFF_CH_TITHES",
    "departmentId": "DEP_CH_FINANCE",
    "directorateId": "DIR_CH_FINANCE",
    "route": "/church/tithes",
    "roles": [
      "ROLE_FINANCE_CLERK"
    ]
  },
  {
    "id": "PORTAL_CH_PROJECTS",
    "name": "Church Building & Projects",
    "officeId": "OFF_CH_PROJECTS",
    "departmentId": "DEP_CH_DEVELOPMENT",
    "directorateId": "DIR_CH_OPERATIONS",
    "route": "/church/projects",
    "roles": [
      "ROLE_PROJECTS_DIRECTOR"
    ]
  },
  {
    "id": "PORTAL_CH_WELFARE",
    "name": "Benevolence & Welfare Fund",
    "officeId": "OFF_CH_WELFARE",
    "departmentId": "DEP_CH_DEVELOPMENT",
    "directorateId": "DIR_CH_MINISTRY",
    "route": "/church/welfare",
    "roles": [
      "ROLE_WELFARE_SECRETARY"
    ]
  },
  {
    "id": "PORTAL_CH_COMM",
    "name": "Diocesan Media & Bulletin",
    "officeId": "OFF_CH_MEDIA",
    "departmentId": "DEP_CH_COMMUNICATIONS",
    "directorateId": "DIR_CH_OPERATIONS",
    "route": "/church/media",
    "roles": [
      "ROLE_MEDIA_OFFICER"
    ]
  },
  {
    "id": "PORTAL_CH_DEV",
    "name": "Church ERP Developer Studio",
    "officeId": "OFF_CH_DEV",
    "departmentId": "DEP_CH_TECH",
    "directorateId": "DIR_CH_OPERATIONS",
    "route": "/church/developer",
    "roles": [
      "ROLE_SYSADMIN"
    ]
  },
  {
    "id": "PORTAL_CH_CTRL",
    "name": "Church ERP Control Center",
    "officeId": "OFF_CH_CTRL",
    "departmentId": "DEP_CH_TECH",
    "directorateId": "DIR_CH_OPERATIONS",
    "route": "/church/control",
    "roles": [
      "ROLE_SYSADMIN"
    ]
  },
  {
    "id": "PORTAL_CH_CENSUS",
    "name": "Diocesan Census Intelligence",
    "officeId": "OFF_CH_CENSUS",
    "departmentId": "DEP_CH_EPISCOPAL",
    "directorateId": "DIR_CH_ECCLESIASTICAL",
    "route": "/church/census",
    "roles": [
      "ROLE_CHANCELLOR",
      "ROLE_BISHOP"
    ]
  },
  {
    "id": "PORTAL_CH_ROSTER",
    "name": "Clergy & Personnel Roster",
    "officeId": "OFF_CH_ROSTER",
    "departmentId": "DEP_CH_EPISCOPAL",
    "directorateId": "DIR_CH_ECCLESIASTICAL",
    "route": "/church/roster",
    "roles": [
      "ROLE_CHANCELLOR"
    ]
  }
],
  modulesCount: 5,
  modules: [
  {
    "id": "MOD_CH_MEMBERSHIP",
    "name": "Congregation Directory & Census",
    "code": "CH-MEM-01",
    "path": "products/church-erp/web/modules/MemberDirectory.tsx"
  },
  {
    "id": "MOD_CH_FINANCE",
    "name": "Tithes, Offerings & Diocesan Ledger",
    "code": "CH-FIN-01",
    "path": "products/church-erp/web/modules/ChurchFinance.tsx"
  },
  {
    "id": "MOD_CH_PASTORAL",
    "name": "Pastoral Care & Visitation Tracking",
    "code": "CH-PAS-01",
    "path": "products/church-erp/web/modules/PastoralCare.tsx"
  },
  {
    "id": "MOD_CH_EVENTS",
    "name": "Liturgical Calendar & Event Operations",
    "code": "CH-EVT-01",
    "path": "products/church-erp/web/modules/EventManager.tsx"
  },
  {
    "id": "MOD_CH_DASHBOARD",
    "name": "Executive Diocesan Dashboard",
    "code": "CH-DSH-01",
    "path": "products/church-erp/web/modules/ChurchDashboard.tsx"
  }
],
  capabilitiesCount: 5,
  capabilities: [
  {
    "id": "CAP_CH_MEMBERSHIP",
    "name": "Congregation Directory & Census Engine",
    "moduleId": "MOD_CH_MEMBERSHIP",
    "productId": "JUMO-CHURCH-ERP",
    "enabled": true
  },
  {
    "id": "CAP_CH_FINANCE",
    "name": "Tithes, Offerings & Diocesan Ledger Engine",
    "moduleId": "MOD_CH_FINANCE",
    "productId": "JUMO-CHURCH-ERP",
    "enabled": true
  },
  {
    "id": "CAP_CH_PASTORAL",
    "name": "Pastoral Care & Visitation Tracking Engine",
    "moduleId": "MOD_CH_PASTORAL",
    "productId": "JUMO-CHURCH-ERP",
    "enabled": true
  },
  {
    "id": "CAP_CH_EVENTS",
    "name": "Liturgical Calendar & Event Operations Engine",
    "moduleId": "MOD_CH_EVENTS",
    "productId": "JUMO-CHURCH-ERP",
    "enabled": true
  },
  {
    "id": "CAP_CH_DASHBOARD",
    "name": "Executive Diocesan Dashboard Engine",
    "moduleId": "MOD_CH_DASHBOARD",
    "productId": "JUMO-CHURCH-ERP",
    "enabled": true
  }
],
  uiMetadataCount: 19,
  uiMetadata: [
  {
    "id": "UI_CH_BISHOP",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "componentType": "PORTAL",
    "route": "/church/bishop",
    "metadata": {
      "title": "Bishop / Overseer Office",
      "roles": [
        "ROLE_BISHOP"
      ]
    }
  },
  {
    "id": "UI_CH_SYNOD",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "componentType": "PORTAL",
    "route": "/church/synod",
    "metadata": {
      "title": "Diocesan Synod Secretariat",
      "roles": [
        "ROLE_SYNOD_SECRETARY"
      ]
    }
  },
  {
    "id": "UI_CH_CHANCELLOR",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "componentType": "PORTAL",
    "route": "/church/chancellor",
    "metadata": {
      "title": "Diocesan Chancellor",
      "roles": [
        "ROLE_CHANCELLOR"
      ]
    }
  },
  {
    "id": "UI_CH_ARCH",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "componentType": "PORTAL",
    "route": "/church/archdeaconry",
    "metadata": {
      "title": "Archdeaconry Administration",
      "roles": [
        "ROLE_ARCHDEACON"
      ]
    }
  },
  {
    "id": "UI_CH_PARISH",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "componentType": "PORTAL",
    "route": "/church/parish",
    "metadata": {
      "title": "Parish Priest Office",
      "roles": [
        "ROLE_PARISH_PRIEST"
      ]
    }
  },
  {
    "id": "UI_CH_SACRAMENTS",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "componentType": "PORTAL",
    "route": "/church/sacraments",
    "metadata": {
      "title": "Sacraments & Rites Registry",
      "roles": [
        "ROLE_CURATE",
        "ROLE_PRIEST"
      ]
    }
  },
  {
    "id": "UI_CH_MEMBERS",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "componentType": "PORTAL",
    "route": "/church/membership",
    "metadata": {
      "title": "Congregation Membership",
      "roles": [
        "ROLE_MEMBERSHIP_SECRETARY"
      ]
    }
  },
  {
    "id": "UI_CH_PASTORAL",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "componentType": "PORTAL",
    "route": "/church/pastoral",
    "metadata": {
      "title": "Pastoral Care & Visitation",
      "roles": [
        "ROLE_PASTORAL_CARE_LEAD"
      ]
    }
  },
  {
    "id": "UI_CH_EVENTS",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "componentType": "PORTAL",
    "route": "/church/liturgy",
    "metadata": {
      "title": "Liturgy & Event Planner",
      "roles": [
        "ROLE_LITURGY_LEAD"
      ]
    }
  },
  {
    "id": "UI_CH_MINISTRIES",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "componentType": "PORTAL",
    "route": "/church/ministries",
    "metadata": {
      "title": "Auxiliary Ministries Hub",
      "roles": [
        "ROLE_MINISTRY_LEAD"
      ]
    }
  },
  {
    "id": "UI_CH_TREASURY",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "componentType": "PORTAL",
    "route": "/church/treasury",
    "metadata": {
      "title": "Parish / Diocesan Treasury",
      "roles": [
        "ROLE_TREASURER"
      ]
    }
  },
  {
    "id": "UI_CH_TITHES",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "componentType": "PORTAL",
    "route": "/church/tithes",
    "metadata": {
      "title": "Tithes & Offerings Ledger",
      "roles": [
        "ROLE_FINANCE_CLERK"
      ]
    }
  },
  {
    "id": "UI_CH_PROJECTS",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "componentType": "PORTAL",
    "route": "/church/projects",
    "metadata": {
      "title": "Church Building & Projects",
      "roles": [
        "ROLE_PROJECTS_DIRECTOR"
      ]
    }
  },
  {
    "id": "UI_CH_WELFARE",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "componentType": "PORTAL",
    "route": "/church/welfare",
    "metadata": {
      "title": "Benevolence & Welfare Fund",
      "roles": [
        "ROLE_WELFARE_SECRETARY"
      ]
    }
  },
  {
    "id": "UI_CH_COMM",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "componentType": "PORTAL",
    "route": "/church/media",
    "metadata": {
      "title": "Diocesan Media & Bulletin",
      "roles": [
        "ROLE_MEDIA_OFFICER"
      ]
    }
  },
  {
    "id": "UI_CH_DEV",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "componentType": "PORTAL",
    "route": "/church/developer",
    "metadata": {
      "title": "Church ERP Developer Studio",
      "roles": [
        "ROLE_SYSADMIN"
      ]
    }
  },
  {
    "id": "UI_CH_CTRL",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "componentType": "PORTAL",
    "route": "/church/control",
    "metadata": {
      "title": "Church ERP Control Center",
      "roles": [
        "ROLE_SYSADMIN"
      ]
    }
  },
  {
    "id": "UI_CH_CENSUS",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "componentType": "PORTAL",
    "route": "/church/census",
    "metadata": {
      "title": "Diocesan Census Intelligence",
      "roles": [
        "ROLE_CHANCELLOR",
        "ROLE_BISHOP"
      ]
    }
  },
  {
    "id": "UI_CH_ROSTER",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "componentType": "PORTAL",
    "route": "/church/roster",
    "metadata": {
      "title": "Clergy & Personnel Roster",
      "roles": [
        "ROLE_CHANCELLOR"
      ]
    }
  }
],
  runtimeComponentsCount: 5,
  runtimeComponents: [
  {
    "id": "RTC_CH_SHELL",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "componentPath": "src/products/church-erp/web/ChurchErpWebShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_CH_MEM",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "componentPath": "src/products/church-erp/web/modules/MemberDirectory.tsx",
    "loaded": true
  },
  {
    "id": "RTC_CH_FIN",
    "capabilityId": "CAP_CH_FINANCE",
    "componentPath": "src/products/church-erp/web/modules/ChurchFinance.tsx",
    "loaded": true
  },
  {
    "id": "RTC_CH_PAS",
    "capabilityId": "CAP_CH_PASTORAL",
    "componentPath": "src/products/church-erp/web/modules/PastoralCare.tsx",
    "loaded": true
  },
  {
    "id": "RTC_CH_EVT",
    "capabilityId": "CAP_CH_EVENTS",
    "componentPath": "src/products/church-erp/web/modules/EventManager.tsx",
    "loaded": true
  }
],
  services: [
  "ChurchErpService",
  "ChurchPeopleService",
  "ChurchService"
],
  workflows: [
  "SacramentalRegistrationWorkflow",
  "TitheContributionWorkflow",
  "ClergyOrdinationWorkflow"
],
  agents: [
  "DiocesanCensusAgent",
  "TithesAuditAgent",
  "PastoralCareScheduler"
],
  reports: [
  "DiocesanParishCensus",
  "SacramentalCertificateAudit",
  "TithesAndOfferingsStatement",
  "BuildingFundProgress"
],
  dashboards: [
  "ChurchDashboard",
  "ChurchFinance",
  "MemberDirectory",
  "PastoralCare",
  "EventManager"
],
  authenticationBoundaries: [
  "BISHOPRIC_ECCLESIASTICAL_WALL",
  "CLERGY_SACRAMENTAL_AUTH",
  "PARISH_LAITY_BOUNDARY"
],
  permissions: [
  "ROLE_BISHOP",
  "ROLE_CHANCELLOR",
  "ROLE_PARISH_PRIEST",
  "ROLE_TREASURER",
  "ROLE_PASTORAL_CARE_LEAD"
],
  dependencies: [
  "JUMO-PLATFORM-KERNEL",
  "FAAP-CORE-ENGINE"
],
  benchmarkReferences: [
  "SovereignChurchDioceseManagementStandard-v1"
],
  recoveryEvidence: "Discovered 35 files including Bishop, Priest, Sacramental, and Finance office components, modals, and services.",
  implementationStatus: "RECONCILED"
} as const);

export default JUMO_CHURCH_MANIFEST;
