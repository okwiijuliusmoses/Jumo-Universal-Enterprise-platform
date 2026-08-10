export type GovernmentEnterpriseScale =
  | 'MICRO'
  | 'SMALL'
  | 'MEDIUM'
  | 'LARGE'
  | 'VERY_LARGE'
  | 'NATIONAL'
  | 'MULTI_NATIONAL'
  | 'SOVEREIGN';

export interface EnterpriseInstanceScaleSpecification {
  scale: GovernmentEnterpriseScale;
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
