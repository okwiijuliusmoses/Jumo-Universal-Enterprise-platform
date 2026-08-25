export interface AlumniMember {
  id: string;
  alumniNumber: string;
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  faculty: string;
  degree: string;
  graduationYear: number;
  currentEmployer: string;
  jobTitle: string;
  industry: string;
  locationCity: string;
  locationCountry: string;
  chapterId: string;
  membershipTier: 'STANDARD' | 'SILVER' | 'GOLD' | 'LIFE_PATRON';
  verificationStatus: 'VERIFIED' | 'PENDING' | 'FLAGGED';
  totalDonationsUSD: number;
  isMentor: boolean;
  avatar?: string;
  bio?: string;
  joinedDate: string;
}

export interface AlumniChapter {
  id: string;
  name: string;
  region: string;
  country: string;
  leadCoordinator: string;
  leadEmail: string;
  activeMembersCount: number;
  establishedYear: number;
  status: 'ACTIVE' | 'FORMING' | 'INACTIVE';
  annualTargetUSD: number;
  raisedUSD: number;
}

export interface GivingCampaign {
  id: string;
  title: string;
  description: string;
  category: 'SCHOLARSHIP' | 'INFRASTRUCTURE' | 'RESEARCH_ENDOWMENT' | 'EMERGENCY_FUND';
  targetAmountUSD: number;
  currentAmountUSD: number;
  donorCount: number;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'COMPLETED' | 'UPCOMING';
  targetCohort?: string;
}

export interface CareerOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'EXECUTIVE';
  postedByAlumniId: string;
  postedByName: string;
  postedDate: string;
  deadline: string;
  applicationUrlOrEmail: string;
  description: string;
}

export interface MentorshipPair {
  id: string;
  mentorId: string;
  mentorName: string;
  menteeId: string;
  menteeName: string;
  industry: string;
  focusArea: string;
  startDate: string;
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
}

export interface AlumniStats {
  totalAlumni: number;
  verifiedCount: number;
  activeChapters: number;
  totalEndowmentUSD: number;
  activeMentors: number;
  openJobs: number;
}
