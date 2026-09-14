import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';

export interface AuthoritativeWorkflow {
  workflowId: string;
  productId: string;
  name: string;
  states: string[];
  initialState: string;
  finalStates: string[];
  transitions: Array<{ from: string; to: string; action: string }>;
  requiredRoles: string[];
}

const RAW_WORKFLOWS: AuthoritativeWorkflow[] = [
  {
    "workflowId": "WF_KYCONBOARDINGWORKFLOW",
    "productId": "JUMO-FINTECH",
    "name": "KYCOnboardingWorkflow",
    "states": [
      "DRAFT",
      "PENDING_VERIFICATION",
      "REVIEW_AUDIT",
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "initialState": "DRAFT",
    "finalStates": [
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "transitions": [
      {
        "from": "DRAFT",
        "to": "PENDING_VERIFICATION",
        "action": "SUBMIT"
      },
      {
        "from": "PENDING_VERIFICATION",
        "to": "REVIEW_AUDIT",
        "action": "VERIFY"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "APPROVED",
        "action": "AUTHORIZE"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "REJECTED",
        "action": "REJECT"
      },
      {
        "from": "APPROVED",
        "to": "SETTLED",
        "action": "FINALIZE"
      }
    ],
    "requiredRoles": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ]
  },
  {
    "workflowId": "WF_PAYMENTPROCESSINGWORKFLOW",
    "productId": "JUMO-FINTECH",
    "name": "PaymentProcessingWorkflow",
    "states": [
      "DRAFT",
      "PENDING_VERIFICATION",
      "REVIEW_AUDIT",
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "initialState": "DRAFT",
    "finalStates": [
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "transitions": [
      {
        "from": "DRAFT",
        "to": "PENDING_VERIFICATION",
        "action": "SUBMIT"
      },
      {
        "from": "PENDING_VERIFICATION",
        "to": "REVIEW_AUDIT",
        "action": "VERIFY"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "APPROVED",
        "action": "AUTHORIZE"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "REJECTED",
        "action": "REJECT"
      },
      {
        "from": "APPROVED",
        "to": "SETTLED",
        "action": "FINALIZE"
      }
    ],
    "requiredRoles": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ]
  },
  {
    "workflowId": "WF_SETTLEMENTRECONCILIATIONWORKFLOW",
    "productId": "JUMO-FINTECH",
    "name": "SettlementReconciliationWorkflow",
    "states": [
      "DRAFT",
      "PENDING_VERIFICATION",
      "REVIEW_AUDIT",
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "initialState": "DRAFT",
    "finalStates": [
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "transitions": [
      {
        "from": "DRAFT",
        "to": "PENDING_VERIFICATION",
        "action": "SUBMIT"
      },
      {
        "from": "PENDING_VERIFICATION",
        "to": "REVIEW_AUDIT",
        "action": "VERIFY"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "APPROVED",
        "action": "AUTHORIZE"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "REJECTED",
        "action": "REJECT"
      },
      {
        "from": "APPROVED",
        "to": "SETTLED",
        "action": "FINALIZE"
      }
    ],
    "requiredRoles": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ]
  },
  {
    "workflowId": "WF_STUDENTENROLLMENTWORKFLOW",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "name": "StudentEnrollmentWorkflow",
    "states": [
      "DRAFT",
      "PENDING_VERIFICATION",
      "REVIEW_AUDIT",
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "initialState": "DRAFT",
    "finalStates": [
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "transitions": [
      {
        "from": "DRAFT",
        "to": "PENDING_VERIFICATION",
        "action": "SUBMIT"
      },
      {
        "from": "PENDING_VERIFICATION",
        "to": "REVIEW_AUDIT",
        "action": "VERIFY"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "APPROVED",
        "action": "AUTHORIZE"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "REJECTED",
        "action": "REJECT"
      },
      {
        "from": "APPROVED",
        "to": "SETTLED",
        "action": "FINALIZE"
      }
    ],
    "requiredRoles": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ]
  },
  {
    "workflowId": "WF_FEEBILLINGWORKFLOW",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "name": "FeeBillingWorkflow",
    "states": [
      "DRAFT",
      "PENDING_VERIFICATION",
      "REVIEW_AUDIT",
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "initialState": "DRAFT",
    "finalStates": [
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "transitions": [
      {
        "from": "DRAFT",
        "to": "PENDING_VERIFICATION",
        "action": "SUBMIT"
      },
      {
        "from": "PENDING_VERIFICATION",
        "to": "REVIEW_AUDIT",
        "action": "VERIFY"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "APPROVED",
        "action": "AUTHORIZE"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "REJECTED",
        "action": "REJECT"
      },
      {
        "from": "APPROVED",
        "to": "SETTLED",
        "action": "FINALIZE"
      }
    ],
    "requiredRoles": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ]
  },
  {
    "workflowId": "WF_SAFEGUARDINGINCIDENTWORKFLOW",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "name": "SafeguardingIncidentWorkflow",
    "states": [
      "DRAFT",
      "PENDING_VERIFICATION",
      "REVIEW_AUDIT",
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "initialState": "DRAFT",
    "finalStates": [
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "transitions": [
      {
        "from": "DRAFT",
        "to": "PENDING_VERIFICATION",
        "action": "SUBMIT"
      },
      {
        "from": "PENDING_VERIFICATION",
        "to": "REVIEW_AUDIT",
        "action": "VERIFY"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "APPROVED",
        "action": "AUTHORIZE"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "REJECTED",
        "action": "REJECT"
      },
      {
        "from": "APPROVED",
        "to": "SETTLED",
        "action": "FINALIZE"
      }
    ],
    "requiredRoles": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ]
  },
  {
    "workflowId": "WF_CLINICREFERRALWORKFLOW",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "name": "ClinicReferralWorkflow",
    "states": [
      "DRAFT",
      "PENDING_VERIFICATION",
      "REVIEW_AUDIT",
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "initialState": "DRAFT",
    "finalStates": [
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "transitions": [
      {
        "from": "DRAFT",
        "to": "PENDING_VERIFICATION",
        "action": "SUBMIT"
      },
      {
        "from": "PENDING_VERIFICATION",
        "to": "REVIEW_AUDIT",
        "action": "VERIFY"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "APPROVED",
        "action": "AUTHORIZE"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "REJECTED",
        "action": "REJECT"
      },
      {
        "from": "APPROVED",
        "to": "SETTLED",
        "action": "FINALIZE"
      }
    ],
    "requiredRoles": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ]
  },
  {
    "workflowId": "WF_SECONDARYMATRICULATIONWORKFLOW",
    "productId": "JUMO-SECONDARY-ERP",
    "name": "SecondaryMatriculationWorkflow",
    "states": [
      "DRAFT",
      "PENDING_VERIFICATION",
      "REVIEW_AUDIT",
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "initialState": "DRAFT",
    "finalStates": [
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "transitions": [
      {
        "from": "DRAFT",
        "to": "PENDING_VERIFICATION",
        "action": "SUBMIT"
      },
      {
        "from": "PENDING_VERIFICATION",
        "to": "REVIEW_AUDIT",
        "action": "VERIFY"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "APPROVED",
        "action": "AUTHORIZE"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "REJECTED",
        "action": "REJECT"
      },
      {
        "from": "APPROVED",
        "to": "SETTLED",
        "action": "FINALIZE"
      }
    ],
    "requiredRoles": [
      "ROLE_PRINCIPAL",
      "ROLE_SENATE_MEMBER",
      "ROLE_REGISTRAR"
    ]
  },
  {
    "workflowId": "WF_TERMEXAMINATIONGRADINGWORKFLOW",
    "productId": "JUMO-SECONDARY-ERP",
    "name": "TermExaminationGradingWorkflow",
    "states": [
      "DRAFT",
      "PENDING_VERIFICATION",
      "REVIEW_AUDIT",
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "initialState": "DRAFT",
    "finalStates": [
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "transitions": [
      {
        "from": "DRAFT",
        "to": "PENDING_VERIFICATION",
        "action": "SUBMIT"
      },
      {
        "from": "PENDING_VERIFICATION",
        "to": "REVIEW_AUDIT",
        "action": "VERIFY"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "APPROVED",
        "action": "AUTHORIZE"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "REJECTED",
        "action": "REJECT"
      },
      {
        "from": "APPROVED",
        "to": "SETTLED",
        "action": "FINALIZE"
      }
    ],
    "requiredRoles": [
      "ROLE_PRINCIPAL",
      "ROLE_SENATE_MEMBER",
      "ROLE_REGISTRAR"
    ]
  },
  {
    "workflowId": "WF_SENATECURRICULUMAPPROVAL",
    "productId": "JUMO-SECONDARY-ERP",
    "name": "SenateCurriculumApproval",
    "states": [
      "DRAFT",
      "PENDING_VERIFICATION",
      "REVIEW_AUDIT",
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "initialState": "DRAFT",
    "finalStates": [
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "transitions": [
      {
        "from": "DRAFT",
        "to": "PENDING_VERIFICATION",
        "action": "SUBMIT"
      },
      {
        "from": "PENDING_VERIFICATION",
        "to": "REVIEW_AUDIT",
        "action": "VERIFY"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "APPROVED",
        "action": "AUTHORIZE"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "REJECTED",
        "action": "REJECT"
      },
      {
        "from": "APPROVED",
        "to": "SETTLED",
        "action": "FINALIZE"
      }
    ],
    "requiredRoles": [
      "ROLE_PRINCIPAL",
      "ROLE_SENATE_MEMBER",
      "ROLE_REGISTRAR"
    ]
  },
  {
    "workflowId": "WF_ALUMNIVERIFICATIONWORKFLOW",
    "productId": "JUMO-ALUMNI",
    "name": "AlumniVerificationWorkflow",
    "states": [
      "DRAFT",
      "PENDING_VERIFICATION",
      "REVIEW_AUDIT",
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "initialState": "DRAFT",
    "finalStates": [
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "transitions": [
      {
        "from": "DRAFT",
        "to": "PENDING_VERIFICATION",
        "action": "SUBMIT"
      },
      {
        "from": "PENDING_VERIFICATION",
        "to": "REVIEW_AUDIT",
        "action": "VERIFY"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "APPROVED",
        "action": "AUTHORIZE"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "REJECTED",
        "action": "REJECT"
      },
      {
        "from": "APPROVED",
        "to": "SETTLED",
        "action": "FINALIZE"
      }
    ],
    "requiredRoles": [
      "ROLE_ALUMNI_DIRECTOR",
      "ROLE_BOARD_MEMBER",
      "ROLE_CHAPTER_LEAD"
    ]
  },
  {
    "workflowId": "WF_GIVINGCAMPAIGNPLEDGEWORKFLOW",
    "productId": "JUMO-ALUMNI",
    "name": "GivingCampaignPledgeWorkflow",
    "states": [
      "DRAFT",
      "PENDING_VERIFICATION",
      "REVIEW_AUDIT",
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "initialState": "DRAFT",
    "finalStates": [
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "transitions": [
      {
        "from": "DRAFT",
        "to": "PENDING_VERIFICATION",
        "action": "SUBMIT"
      },
      {
        "from": "PENDING_VERIFICATION",
        "to": "REVIEW_AUDIT",
        "action": "VERIFY"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "APPROVED",
        "action": "AUTHORIZE"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "REJECTED",
        "action": "REJECT"
      },
      {
        "from": "APPROVED",
        "to": "SETTLED",
        "action": "FINALIZE"
      }
    ],
    "requiredRoles": [
      "ROLE_ALUMNI_DIRECTOR",
      "ROLE_BOARD_MEMBER",
      "ROLE_CHAPTER_LEAD"
    ]
  },
  {
    "workflowId": "WF_CHAPTERCHARTERWORKFLOW",
    "productId": "JUMO-ALUMNI",
    "name": "ChapterCharterWorkflow",
    "states": [
      "DRAFT",
      "PENDING_VERIFICATION",
      "REVIEW_AUDIT",
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "initialState": "DRAFT",
    "finalStates": [
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "transitions": [
      {
        "from": "DRAFT",
        "to": "PENDING_VERIFICATION",
        "action": "SUBMIT"
      },
      {
        "from": "PENDING_VERIFICATION",
        "to": "REVIEW_AUDIT",
        "action": "VERIFY"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "APPROVED",
        "action": "AUTHORIZE"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "REJECTED",
        "action": "REJECT"
      },
      {
        "from": "APPROVED",
        "to": "SETTLED",
        "action": "FINALIZE"
      }
    ],
    "requiredRoles": [
      "ROLE_ALUMNI_DIRECTOR",
      "ROLE_BOARD_MEMBER",
      "ROLE_CHAPTER_LEAD"
    ]
  },
  {
    "workflowId": "WF_SACRAMENTALREGISTRATIONWORKFLOW",
    "productId": "JUMO-CHURCH",
    "name": "SacramentalRegistrationWorkflow",
    "states": [
      "DRAFT",
      "PENDING_VERIFICATION",
      "REVIEW_AUDIT",
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "initialState": "DRAFT",
    "finalStates": [
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "transitions": [
      {
        "from": "DRAFT",
        "to": "PENDING_VERIFICATION",
        "action": "SUBMIT"
      },
      {
        "from": "PENDING_VERIFICATION",
        "to": "REVIEW_AUDIT",
        "action": "VERIFY"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "APPROVED",
        "action": "AUTHORIZE"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "REJECTED",
        "action": "REJECT"
      },
      {
        "from": "APPROVED",
        "to": "SETTLED",
        "action": "FINALIZE"
      }
    ],
    "requiredRoles": [
      "ROLE_BISHOP",
      "ROLE_CHANCELLOR",
      "ROLE_PARISH_PRIEST"
    ]
  },
  {
    "workflowId": "WF_TITHECONTRIBUTIONWORKFLOW",
    "productId": "JUMO-CHURCH",
    "name": "TitheContributionWorkflow",
    "states": [
      "DRAFT",
      "PENDING_VERIFICATION",
      "REVIEW_AUDIT",
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "initialState": "DRAFT",
    "finalStates": [
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "transitions": [
      {
        "from": "DRAFT",
        "to": "PENDING_VERIFICATION",
        "action": "SUBMIT"
      },
      {
        "from": "PENDING_VERIFICATION",
        "to": "REVIEW_AUDIT",
        "action": "VERIFY"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "APPROVED",
        "action": "AUTHORIZE"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "REJECTED",
        "action": "REJECT"
      },
      {
        "from": "APPROVED",
        "to": "SETTLED",
        "action": "FINALIZE"
      }
    ],
    "requiredRoles": [
      "ROLE_BISHOP",
      "ROLE_CHANCELLOR",
      "ROLE_PARISH_PRIEST"
    ]
  },
  {
    "workflowId": "WF_CLERGYORDINATIONWORKFLOW",
    "productId": "JUMO-CHURCH",
    "name": "ClergyOrdinationWorkflow",
    "states": [
      "DRAFT",
      "PENDING_VERIFICATION",
      "REVIEW_AUDIT",
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "initialState": "DRAFT",
    "finalStates": [
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "transitions": [
      {
        "from": "DRAFT",
        "to": "PENDING_VERIFICATION",
        "action": "SUBMIT"
      },
      {
        "from": "PENDING_VERIFICATION",
        "to": "REVIEW_AUDIT",
        "action": "VERIFY"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "APPROVED",
        "action": "AUTHORIZE"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "REJECTED",
        "action": "REJECT"
      },
      {
        "from": "APPROVED",
        "to": "SETTLED",
        "action": "FINALIZE"
      }
    ],
    "requiredRoles": [
      "ROLE_BISHOP",
      "ROLE_CHANCELLOR",
      "ROLE_PARISH_PRIEST"
    ]
  },
  {
    "workflowId": "WF_RING0VERIFICATIONWORKFLOW",
    "productId": "JUMO-CONTROL",
    "name": "Ring0VerificationWorkflow",
    "states": [
      "DRAFT",
      "PENDING_VERIFICATION",
      "REVIEW_AUDIT",
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "initialState": "DRAFT",
    "finalStates": [
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "transitions": [
      {
        "from": "DRAFT",
        "to": "PENDING_VERIFICATION",
        "action": "SUBMIT"
      },
      {
        "from": "PENDING_VERIFICATION",
        "to": "REVIEW_AUDIT",
        "action": "VERIFY"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "APPROVED",
        "action": "AUTHORIZE"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "REJECTED",
        "action": "REJECT"
      },
      {
        "from": "APPROVED",
        "to": "SETTLED",
        "action": "FINALIZE"
      }
    ],
    "requiredRoles": [
      "ROLE_SOVEREIGN_OWNER"
    ]
  },
  {
    "workflowId": "WF_TENANTPROVISIONINGWORKFLOW",
    "productId": "JUMO-CONTROL",
    "name": "TenantProvisioningWorkflow",
    "states": [
      "DRAFT",
      "PENDING_VERIFICATION",
      "REVIEW_AUDIT",
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "initialState": "DRAFT",
    "finalStates": [
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "transitions": [
      {
        "from": "DRAFT",
        "to": "PENDING_VERIFICATION",
        "action": "SUBMIT"
      },
      {
        "from": "PENDING_VERIFICATION",
        "to": "REVIEW_AUDIT",
        "action": "VERIFY"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "APPROVED",
        "action": "AUTHORIZE"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "REJECTED",
        "action": "REJECT"
      },
      {
        "from": "APPROVED",
        "to": "SETTLED",
        "action": "FINALIZE"
      }
    ],
    "requiredRoles": [
      "ROLE_SOVEREIGN_OWNER"
    ]
  },
  {
    "workflowId": "WF_SOVEREIGNDEPLOYMENTPIPELINE",
    "productId": "JUMO-CONTROL",
    "name": "SovereignDeploymentPipeline",
    "states": [
      "DRAFT",
      "PENDING_VERIFICATION",
      "REVIEW_AUDIT",
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "initialState": "DRAFT",
    "finalStates": [
      "APPROVED",
      "REJECTED",
      "SETTLED"
    ],
    "transitions": [
      {
        "from": "DRAFT",
        "to": "PENDING_VERIFICATION",
        "action": "SUBMIT"
      },
      {
        "from": "PENDING_VERIFICATION",
        "to": "REVIEW_AUDIT",
        "action": "VERIFY"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "APPROVED",
        "action": "AUTHORIZE"
      },
      {
        "from": "REVIEW_AUDIT",
        "to": "REJECTED",
        "action": "REJECT"
      },
      {
        "from": "APPROVED",
        "to": "SETTLED",
        "action": "FINALIZE"
      }
    ],
    "requiredRoles": [
      "ROLE_SOVEREIGN_OWNER"
    ]
  }
];

export const UniversalWorkflowRegistry: RegistryCollection<AuthoritativeWorkflow> = createRegistryCollection(
  RAW_WORKFLOWS,
  "UNIVERSAL_WORKFLOW_REGISTRY"
);

export function getWorkflowsByProduct(productId: string): AuthoritativeWorkflow[] {
  const upper = (productId || '').toUpperCase();
  return safeFilter(UniversalWorkflowRegistry, w =>
    w.productId.toUpperCase() === upper ||
    (upper.includes('NURSERY') && w.productId.includes('NURSERY')) ||
    (upper.includes('FINTECH') && w.productId.includes('FINTECH')) ||
    (upper.includes('SECONDARY') && w.productId.includes('SECONDARY')) ||
    (upper.includes('ALUMNI') && w.productId.includes('ALUMNI')) ||
    (upper.includes('CHURCH') && w.productId.includes('CHURCH')) ||
    (upper.includes('CONTROL') && w.productId.includes('CONTROL'))
  );
}
