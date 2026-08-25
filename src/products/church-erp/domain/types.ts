/**
 * JUMO Church ERP — Type Declarations & Schema Definitions
 */

export type ChurchTemplateType = 'LOCAL' | 'MULTI_CAMPUS' | 'NETWORK' | 'DENOMINATION' | 'DIOCESE' | 'MINISTRY';

export interface ChurchConfig {
  name: string;
  template: ChurchTemplateType;
  selectedCampus: string;
  campuses: string[];
  currency: string;
  fiscalPeriod: string;
}

export interface ChurchMember {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  membershipDate: string;
  status: 'MEMBER' | 'VISITOR' | 'ACTIVE' | 'INACTIVE';
  type: 'ADULT' | 'YOUTH' | 'CHILD' | 'CLERGY' | 'VISITOR';
  familyId?: string;
  smallGroup?: string;
}

export interface ChurchDonation {
  id: string;
  memberId: string;
  memberName: string;
  type: 'TITHE' | 'OFFERING' | 'PLEDGE' | 'MISSIONS' | 'BUILDING_FUND';
  amount: number;
  paymentChannel: string;
  date: string;
  status: 'PENDING' | 'VERIFIED' | 'POSTED_TO_FAAP';
}

export interface PastoralCareCase {
  id: string;
  memberId: string;
  memberName: string;
  counsellorId: string;
  counsellorName: string;
  type: 'MARRIAGE' | 'GRIEF' | 'SPIRITUAL' | 'FINANCIAL' | 'OTHER';
  status: 'INTAKE' | 'ASSIGNED' | 'SESSIONS_ACTIVE' | 'FOLLOWUP' | 'CLOSED';
  notes: string;
  dateCreated: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  ministryScope: string;
  status: 'PROPOSED' | 'APPROVED' | 'SCHEDULED' | 'EXECUTED';
}

export interface SmallGroup {
  id: string;
  name: string;
  leaderName: string;
  meetingDay: string;
  location: string;
  memberCount: number;
}
