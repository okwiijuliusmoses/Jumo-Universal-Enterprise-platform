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

export const SECERP_MANIFEST: ProductManifest = {
  productId: 'prod-secondary-school',
  code: 'SECERP',
  name: 'JUMO Sovereign Secondary School ERP',
  category: 'INSTITUTIONAL_ERP',
  description: 'Sovereign secondary school & college administration system: NCDC Lower Secondary & A-Level curriculum, UNEB candidate registration & center index numbers (UCE/UACE), student bio-data, school fees & Digital Pay PRN integration, boarding house welfare & hostel allocation, science laboratories equipment store, digital library, and seamless graduating senior cohort handoff to JUMO ALUMNI platform.',
  version: '2026.4.0',
  leadExecutiveRole: 'Headmaster / Headmistress & Board of Governors Executive',
  governingLegislation: 'Uganda Education Act 2008 & UNEB Examinations Regulations 2026',
  standaloneRoute: '/app/secondary',
  theme: {
    primaryColor: 'indigo',
    accentBg: 'bg-indigo-600',
    badgeStyle: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    headerBg: 'bg-white border-indigo-200'
  },
  benchmarkSources: [
    'Namilyango College Administrative Manual & Secondary School Framework',
    'Uganda National Examinations Board (UNEB) UCE & UACE Center Regulations 2026'
  ]
};
