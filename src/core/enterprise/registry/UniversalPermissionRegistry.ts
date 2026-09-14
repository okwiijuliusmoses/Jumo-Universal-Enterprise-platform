import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';
export const UniversalPermissionRegistry = createRegistryCollection([
  {
    "permissionId": "ROLE_CFO",
    "productId": "JUMO-FINTECH",
    "role": "ROLE_CFO",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_CONTROLLER",
    "productId": "JUMO-FINTECH",
    "role": "ROLE_CONTROLLER",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_ACCOUNTANT",
    "productId": "JUMO-FINTECH",
    "role": "ROLE_ACCOUNTANT",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_SWITCH_OPERATOR",
    "productId": "JUMO-FINTECH",
    "role": "ROLE_SWITCH_OPERATOR",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_TREASURER",
    "productId": "JUMO-FINTECH",
    "role": "ROLE_TREASURER",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_LOAN_OFFICER",
    "productId": "JUMO-FINTECH",
    "role": "ROLE_LOAN_OFFICER",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_HEAD_TEACHER",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "role": "ROLE_HEAD_TEACHER",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_PRIMARY_DOS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "role": "ROLE_PRIMARY_DOS",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_ECD_TEACHER",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "role": "ROLE_ECD_TEACHER",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_BURSAR",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "role": "ROLE_BURSAR",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_NURSE",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "role": "ROLE_NURSE",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_SAFEGUARDING_LEAD",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "role": "ROLE_SAFEGUARDING_LEAD",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_PRINCIPAL",
    "productId": "JUMO-SECONDARY-ERP",
    "role": "ROLE_PRINCIPAL",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_SENATE_MEMBER",
    "productId": "JUMO-SECONDARY-ERP",
    "role": "ROLE_SENATE_MEMBER",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_REGISTRAR",
    "productId": "JUMO-SECONDARY-ERP",
    "role": "ROLE_REGISTRAR",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_SECONDARY_DOS",
    "productId": "JUMO-SECONDARY-ERP",
    "role": "ROLE_SECONDARY_DOS",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_BURSAR",
    "productId": "JUMO-SECONDARY-ERP",
    "role": "ROLE_BURSAR",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_HOD",
    "productId": "JUMO-SECONDARY-ERP",
    "role": "ROLE_HOD",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_ALUMNI_DIRECTOR",
    "productId": "JUMO-ALUMNI",
    "role": "ROLE_ALUMNI_DIRECTOR",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_BOARD_MEMBER",
    "productId": "JUMO-ALUMNI",
    "role": "ROLE_BOARD_MEMBER",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_CHAPTER_LEAD",
    "productId": "JUMO-ALUMNI",
    "role": "ROLE_CHAPTER_LEAD",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_GIVING_OFFICER",
    "productId": "JUMO-ALUMNI",
    "role": "ROLE_GIVING_OFFICER",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_CAREER_OFFICER",
    "productId": "JUMO-ALUMNI",
    "role": "ROLE_CAREER_OFFICER",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_BISHOP",
    "productId": "JUMO-CHURCH",
    "role": "ROLE_BISHOP",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_CHANCELLOR",
    "productId": "JUMO-CHURCH",
    "role": "ROLE_CHANCELLOR",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_PARISH_PRIEST",
    "productId": "JUMO-CHURCH",
    "role": "ROLE_PARISH_PRIEST",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_TREASURER",
    "productId": "JUMO-CHURCH",
    "role": "ROLE_TREASURER",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_PASTORAL_CARE_LEAD",
    "productId": "JUMO-CHURCH",
    "role": "ROLE_PASTORAL_CARE_LEAD",
    "scope": "SOVEREIGN_PARTITION"
  },
  {
    "permissionId": "ROLE_SOVEREIGN_OWNER",
    "productId": "JUMO-CONTROL",
    "role": "ROLE_SOVEREIGN_OWNER",
    "scope": "SOVEREIGN_PARTITION"
  }
], "UNIVERSAL_PERMISSION_REGISTRY");
