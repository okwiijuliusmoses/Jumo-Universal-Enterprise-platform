import { CanonicalProduct } from '../canonical/types';

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

export const CHERP_MANIFEST: ProductManifest = {
  productId: 'prod-church-faith',
  code: 'CHERP',
  name: 'JUMO Church & Diocesan Enterprise ERP',
  category: 'INSTITUTIONAL_ERP',
  description: 'Sovereign diocese, cathedral, parish, and faith ministry operating system: Canonical parishioner rolls, sacramental registers (Baptism, Confirmation, Holy Matrimony banns), home cell fellowships, dual-custody Sunday tithe & e-giving collection, cathedral capital building pledges, benevolence welfare fund, rural evangelism missions, Sunday RTMP livestream broadcasts, and sermon audio transcript vault.',
  version: '2026.4.0',
  leadExecutiveRole: 'Diocesan Bishop / Senior Pastor & Synod Executive',
  governingLegislation: 'Ecclesiastical Canon Law & Diocesan Synod Constitution 2026',
  standaloneRoute: '/app/cherp',
  theme: {
    primaryColor: 'amber',
    accentBg: 'bg-amber-600',
    badgeStyle: 'bg-amber-50 text-amber-800 border-amber-200',
    headerBg: 'bg-white border-amber-200'
  },
  benchmarkSources: [
    'Namirembe Diocese Synod Constitution & Administrative Registry 2026',
    'Church of Uganda Provincial Financial Guidelines & Parish Roll Manual'
  ]
};
