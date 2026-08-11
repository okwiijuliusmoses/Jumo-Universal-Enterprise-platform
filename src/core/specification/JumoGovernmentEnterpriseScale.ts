export type GovernmentEnterpriseScale =
  | 'MICRO'
  | 'SMALL'
  | 'MEDIUM'
  | 'LARGE'
  | 'VERY_LARGE'
  | 'NATIONAL'
  | 'MULTI_NATIONAL'
  | 'SOVEREIGN';

export type ApplicationType = 'WEB_APP' | 'MOBILE_APP' | 'HYBRID_APP';

export interface EnterpriseInstanceScaleSpecification {
  scale: GovernmentEnterpriseScale;
  applicationType: ApplicationType;
  governmentStandard: 'JUMO_GOVERNMENT_STANDARD';
  jurisdiction?: string;
  institutionType?: string;
  expectedUsers?: number;
  expectedUnits?: number;
  expectedSites?: number;
  expectedTenants?: number;
  dataClassification?: string;
  availabilityClass?: string;
  sovereigntyRequirements?: string[];
  mandatoryControls: string[];
}

export const GOVERNMENT_ENTERPRISE_SCALES: readonly GovernmentEnterpriseScale[] = [
  'MICRO',
  'SMALL',
  'MEDIUM',
  'LARGE',
  'VERY_LARGE',
  'NATIONAL',
  'MULTI_NATIONAL',
  'SOVEREIGN',
] as const;
