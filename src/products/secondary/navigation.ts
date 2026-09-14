export interface NavigationItem {
  id: string;
  label: string;
  code: string;
  iconName: string;
  portalId: string;
  moduleId: string;
}

export const SECERP_NAVIGATION: NavigationItem[] = [
  { id: 'nav-ncdc', label: 'NCDC Lower & A-Level Curriculum', code: 'SEC-MOD-NCDC-CURRICULUM', iconName: 'BookOpen', portalId: 'SEC-PORTAL-ACADEMIC', moduleId: 'SEC-MOD-NCDC-CURRICULUM' },
  { id: 'nav-uneb', label: 'UNEB Exam Center (UCE & UACE)', code: 'SEC-MOD-UNEB-EXAMS', iconName: 'Award', portalId: 'SEC-PORTAL-ACADEMIC', moduleId: 'SEC-MOD-UNEB-EXAMS' },
  { id: 'nav-students', label: 'Student Registry & Bio-Data', code: 'SEC-MOD-STUDENT-REGISTRY', iconName: 'Users', portalId: 'SEC-PORTAL-ACADEMIC', moduleId: 'SEC-MOD-STUDENT-REGISTRY' },
  { id: 'nav-fees', label: 'School Fees & Digital Pay Collections', code: 'SEC-MOD-FEES-COLLECTIONS', iconName: 'DollarSign', portalId: 'SEC-PORTAL-BURSARY', moduleId: 'SEC-MOD-FEES-COLLECTIONS' },
  { id: 'nav-boarding', label: 'Boarding House & Student Welfare', code: 'SEC-MOD-BOARDING-WELFARE', iconName: 'Building2', portalId: 'SEC-PORTAL-STUDENT-LIFE', moduleId: 'SEC-MOD-BOARDING-WELFARE' },
  { id: 'nav-labs', label: 'Science Laboratories & Inventory', code: 'SEC-MOD-LABORATORIES', iconName: 'Cpu', portalId: 'SEC-PORTAL-ACADEMIC', moduleId: 'SEC-MOD-LABORATORIES' },
  { id: 'nav-library', label: 'Digital Library & Learning Resources', code: 'SEC-MOD-LIBRARY-CATALOG', iconName: 'BookOpen', portalId: 'SEC-PORTAL-ACADEMIC', moduleId: 'SEC-MOD-LIBRARY-CATALOG' },
  { id: 'nav-alumni-handoff', label: 'Graduating Cohort Alumni Handoff', code: 'SEC-MOD-ALUMNI-TRANSITION', iconName: 'GraduationCap', portalId: 'SEC-PORTAL-STUDENT-LIFE', moduleId: 'SEC-MOD-ALUMNI-TRANSITION' }
];
