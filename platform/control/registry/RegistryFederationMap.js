/**
 * JUMO UEOS
 * Master Registry Federation Map
 */

export const registryFederationMap = {

    enterprise:{
        ERP:[
            "ERPRegistry",
            "ERPInstanceRegistry",
            "EnterprisePlatformTemplateRegistry"
        ],

        Applications:[
            "applicationRegistry",
            "hybridPlatformRegistry",
            "commercialPlatformRegistry"
        ],

        Tenancy:[
            "TenantRegistry",
            "organizationRegistry"
        ]
    },


    governance:{
        institutions:[
            "governmentInstitutionRegistry",
            "publicAuthorityRegistry",
            "ministryRegistry",
            "agencyRegistry"
        ],

        administration:[
            "jurisdictionRegistry",
            "regionAdministrativeRegistry",
            "directorateRegistry",
            "positionRegistry"
        ]
    },


    identity:{
        identity:[
            "digitalIdentityRegistry",
            "enterpriseIdentityRegistry",
            "credentialRegistry",
            "authorizationRegistry"
        ]
    },


    security:{
        security:[
            "sovereignSecurityRegistry",
            "policyRegistry",
            "auditRegistry",
            "zeroTrustRegistry"
        ]
    },


    finance:{
        finance:[
            "treasuryRegistry",
            "currencyRegistry",
            "paymentRegistry",
            "budgetRegistry"
        ]
    },


    workflow:{
        workflow:[
            "enterpriseWorkflowRegistry",
            "businessProcessRegistry",
            "approvalMatrixRegistry",
            "automationRegistry"
        ]
    },


    intelligence:{
        ai:[
            "digitalAgentRegistry",
            "aiModelRegistry",
            "aiCapabilityRegistry",
            "assistantRegistry"
        ]
    },


    data:{
        data:[
            "masterDataRegistry",
            "metadataRegistry",
            "dataAssetRegistry",
            "dataExchangeRegistry"
        ]
    },


    experience:{
        experience:[
            "experienceLayerRegistry",
            "workspaceRegistry",
            "channelRegistry",
            "deviceRegistry"
        ]
    }

};
