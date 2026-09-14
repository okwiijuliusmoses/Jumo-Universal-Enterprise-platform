export type JumoProductKind =
  | 'ERP'
  | 'COMMERCIAL_PRODUCT'
  | 'SHARED_PLATFORM_SERVICE'
  | 'ECOSYSTEM_PRODUCT'
  | 'CUSTOM_PRODUCT'
  | 'EXTENSION';

export type JumoCommercialTier =
  | 'ORDINARY'
  | 'PREMIUM'
  | 'GLOBAL';

export interface JumoCommercialProductDefinition {
  id: string;
  name: string;
  description: string;
  kind: JumoProductKind;

  category: string;

  tiers: JumoCommercialTier[];

  ordinaryIncluded: boolean;
  premiumAvailable: boolean;
  globalAvailable: boolean;

  authoritative: boolean;
  shared: boolean;

  manufacturable: boolean;
  configurable: boolean;
  upgradeable: boolean;
  provisionable: boolean;

  capabilityIds: string[];
  architectureLayerIds: string[];
  studioIds: string[];
  sharedServiceIds: string[];

  requiredVerificationFamilies: string[];

  metadata?: Record<string, unknown>;
}
