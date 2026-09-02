export interface NavigationItem {
  id: string;
  label: string;
  code: string;
  iconName: string;
  portalId: string;
  moduleId: string;
}

export const NPERP_NAVIGATION: NavigationItem[] = [
  { id: 'nav-ecd', label: 'Nursery ECD Phonics & Sensory', code: 'NP-MOD-ECD-PHONICS', iconName: 'School', portalId: 'NP-PORTAL-ECD-LEARNING', moduleId: 'NP-MOD-ECD-PHONICS' },
  { id: 'nav-ple', label: 'P7 UNEB PLE Mock & Aggregates', code: 'NP-MOD-PLE-CENTER', iconName: 'Award', portalId: 'NP-PORTAL-PRIMARY-ACADEMICS', moduleId: 'NP-MOD-PLE-CENTER' },
  { id: 'nav-pupils', label: 'Pupil Bio-Data & Parent Directory', code: 'NP-MOD-PUPIL-DIRECTORY', iconName: 'Users', portalId: 'NP-PORTAL-PRIMARY-ACADEMICS', moduleId: 'NP-MOD-PUPIL-DIRECTORY' },
  { id: 'nav-fees', label: 'School Fees & Digital Pay PayCodes', code: 'NP-MOD-FEES-PAYCODE', iconName: 'DollarSign', portalId: 'NP-PORTAL-BURSARY', moduleId: 'NP-MOD-FEES-PAYCODE' },
  { id: 'nav-health', label: 'Child Protection & Sickbay Log', code: 'NP-MOD-SICKBAY-HEALTH', iconName: 'HeartPulse', portalId: 'NP-PORTAL-BOARDING-WELFARE', moduleId: 'NP-MOD-SICKBAY-HEALTH' },
  { id: 'nav-attendance', label: 'Daily Pupil Attendance Register', code: 'NP-MOD-DAILY-ATTENDANCE', iconName: 'Calendar', portalId: 'NP-PORTAL-PRIMARY-ACADEMICS', moduleId: 'NP-MOD-DAILY-ATTENDANCE' },
  { id: 'nav-stores', label: 'Food Rations & Uniform Stores', code: 'NP-MOD-FOOD-STORES', iconName: 'Building2', portalId: 'NP-PORTAL-BURSARY', moduleId: 'NP-MOD-FOOD-STORES' },
  { id: 'nav-parent-sms', label: 'Parent Portal & SMS Broadcast', code: 'NP-MOD-PARENT-PORTAL', iconName: 'MessageSquare', portalId: 'NP-PORTAL-PRIMARY-ACADEMICS', moduleId: 'NP-MOD-PARENT-PORTAL' }
];
