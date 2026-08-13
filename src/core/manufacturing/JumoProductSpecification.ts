import {
  JumoCommercialTier,
  JumoProductKind,
} from '../platform/products/JumoCommercialProductDefinition';

export interface JumoEnterpriseProfile {
  enterpriseName: string;

  legalName?: string;

  proposedLogo?: string;

  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;

  publicDescription?: string;

  publicEmail?: string;
  publicPhone?: string;
  publicWebsite?: string;

  physicalAddresses?: string[];

  countries?: string[];

  branches?: number;
  departments?: number;
  administrativeStaff?: number;
  employees?: number;

  campuses?: number;
  facilities?: number;

  customerCount?: number;

  operationalModel?: string;

  requiredPortals?: string[];
  requiredModules?: string[];
  requiredWorkflows?: string[];

  subscriptionTier?: JumoCommercialTier;

  geographicScope?:
    | 'LOCAL'
    | 'NATIONAL'
    | 'REGIONAL'
    | 'GLOBAL';

  metadata?: Record<string, unknown>;
}

export interface JumoProductSpecification {
  specificationId: string;

  productId?: string;

  proposedName: string;

  kind: JumoProductKind;

  category: string;

  tier: JumoCommercialTier;

  enterprise: JumoEnterpriseProfile;

  requestedCapabilities: string[];

  requestedSharedProducts: string[];

  requestedStudios: string[];

  requestedLayers: string[];

  requiredIntegrations: string[];

  verificationRequirements: string[];

  configuration: Record<string, unknown>;

  approved: boolean;

  version: string;
}
