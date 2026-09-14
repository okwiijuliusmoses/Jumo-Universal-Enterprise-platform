/**
 * JUMO ALUMNI PLATFORM
 * Shared Education & Community Advancement Layer Types
 * Authority: JUMO UEOS Consolidated Architecture V2.0
 */

export interface AlumniProfile {
  id: string;
  nationalIdNumber?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  institutionId: string;
  institutionName: string;
  graduationYear: number;
  level: 'O_LEVEL' | 'A_LEVEL' | 'PRIMARY' | 'TERTIARY_DEGREE' | 'DIPLOMA';
  cohortName: string; // e.g. 'Class of 2018 - Centenary Cohort'
  indexNumber?: string;
  currentProfession: string;
  currentEmployer?: string;
  chapterId: string;
  isMentorAvailable: boolean;
  totalDonationsUGX: number;
  verifiedStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
  joinedDate: string;
}

export interface GraduationCohort {
  id: string;
  institutionId: string;
  year: number;
  level: string;
  name: string;
  totalGraduates: number;
  registeredAlumniCount: number;
  presidentName: string;
  presidentContact: string;
  reunionDate?: string;
}

export interface AlumniChapter {
  id: string;
  institutionId: string;
  name: string;
  region: 'KAMPALA' | 'EASTERN' | 'WESTERN' | 'NORTHERN' | 'DIASPORA_UK' | 'DIASPORA_USA' | 'DIASPORA_UAE';
  chairmanName: string;
  membersCount: number;
  meetingSchedule: string;
}

export interface MentorshipConnection {
  id: string;
  mentorId: string;
  mentorName: string;
  menteeId: string;
  menteeName: string;
  focusArea: 'SCIENCE_CAREERS' | 'LEGAL_PRACTICE' | 'BUSINESS_ENTREPRENEURSHIP' | 'SOFTWARE_ENGINEERING' | 'MEDICAL_STUDIES';
  status: 'ACTIVE' | 'COMPLETED' | 'PENDING';
  startDate: string;
  sessionsLogged: number;
}

export interface EndowmentCampaign {
  id: string;
  institutionId: string;
  title: string;
  targetAmountUGX: number;
  raisedAmountUGX: number;
  startDate: string;
  endDate: string;
  projectPurpose: 'SCIENCE_LAB_EQUIPMENT' | 'LIBRARY_EXPANSION' | 'HARDSHIP_BURSARY_FUND' | 'SPORTS_COMPLEX';
  status: 'ACTIVE' | 'ACHIEVED' | 'CLOSED';
  contributorsCount: number;
}

export interface AlumniDonationRecord {
  id: string;
  campaignId: string;
  donorId: string;
  donorName: string;
  amountUGX: number;
  paymentRail: 'MTN_MOMO' | 'AIRTEL_MONEY' | 'BANK_EFT' | 'VISA_MASTERCARD';
  paymentReference: string;
  receiptNumber: string;
  timestamp: string;
  faapJournalId?: string;
  taxDeductible: boolean;
}
