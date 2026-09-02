export interface ProductManifest {
  productId: string;
  code: string;
  name: string;
  category: string;
  description: string;
  version: string;
  leadExecutiveRole: string;
  governingLegislation: string;
  standaloneRoute: string;
  theme: {
    primaryColor: string;
    accentBg: string;
    badgeStyle: string;
    headerBg: string;
  };
  benchmarkSources: string[];
}

export const NPERP_MANIFEST: ProductManifest = {
  productId: 'prod-nursery-primary',
  code: 'NPERP',
  name: 'JUMO Sovereign Nursery & Primary School ERP',
  category: 'INSTITUTIONAL_ERP',
  description: 'Sovereign early childhood development & primary education administration system: Nursery Baby/Middle/Top phonics & motor skills assessment, P1-P7 continuous assessment, P7 UNEB Primary Leaving Examination (PLE) center prep & aggregate calculation (4–36 scale), pupil bio-data & guardian directory, school fees & Digital Pay PRN integration, daily attendance & pediatric sickbay log, and posho/beans feeding stores.',
  version: '2026.4.0',
  leadExecutiveRole: 'Primary Head Teacher & School Director',
  governingLegislation: 'Uganda Primary Education Policy & NCDC Early Childhood Framework 2026',
  standaloneRoute: '/app/nursery-primary',
  theme: {
    primaryColor: 'blue',
    accentBg: 'bg-blue-600',
    badgeStyle: 'bg-blue-50 text-blue-800 border-blue-200',
    headerBg: 'bg-white border-blue-200'
  },
  benchmarkSources: [
    'Hillside Nursery & Primary School (Nalya) Operational Blueprint',
    'NCDC Early Childhood Development Policy & UNEB PLE Exam Regulations 2026'
  ]
};
