// JUMO Curriculum Authority Registry
// Defines authoritative sources for curriculum and assessment regulations.

export interface CurriculumAuthority {
  authorityId: string;
  name: string;
  jurisdiction: string;
  scope: string; // e.g., 'Primary', 'Secondary', 'University'
  sourceUrl: string;
  status: 'AUTHORITATIVE' | 'REFERENCE' | 'DRAFT';
}

export const CurriculumAuthorityRegistry: Record<string, CurriculumAuthority> = {
  ncdc: {
    authorityId: 'ncdc-ug',
    name: 'National Curriculum Development Centre',
    jurisdiction: 'Uganda',
    scope: 'Curriculum Development',
    sourceUrl: 'https://ncdc.go.ug',
    status: 'AUTHORITATIVE'
  },
  uneb: {
    authorityId: 'uneb-ug',
    name: 'Uganda National Examinations Board',
    jurisdiction: 'Uganda',
    scope: 'Assessment & Exams',
    sourceUrl: 'https://uneb.ac.ug',
    status: 'AUTHORITATIVE'
  },
  moes: {
    authorityId: 'moes-ug',
    name: 'Ministry of Education and Sports (EMIS)',
    jurisdiction: 'Uganda',
    scope: 'Policy, Planning, Data',
    sourceUrl: 'https://education.go.ug',
    status: 'AUTHORITATIVE'
  }
};
