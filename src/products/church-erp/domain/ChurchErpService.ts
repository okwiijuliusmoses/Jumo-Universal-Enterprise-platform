/**
 * JUMO Church ERP — Singleton Business Logic Domain Service
 * Manages congregation registries, donations streams, pastoral care lifecycles, and FAAP integrations.
 */

import { ChurchConfig, ChurchMember, ChurchDonation, PastoralCareCase, ChurchEvent, SmallGroup } from './types';
import { FaapService } from '../../faap/domain/FaapService';
import { JrmService } from '../../../services/jrm/JrmService';

export class ChurchErpService {
  private static instance: ChurchErpService;
  private faap = FaapService.getInstance();
  private jrm = JrmService.getInstance();

  private config: ChurchConfig = {
    name: 'Sovereign Grace Cathedral',
    template: 'MULTI_CAMPUS',
    selectedCampus: 'KAMPALA_CENTRAL_DIOCESE',
    campuses: ['KAMPALA_CENTRAL_DIOCESE', 'ENTEBBE_MISSION_HAMP', 'JINJA_EASTERN_NET'],
    currency: 'UGX',
    fiscalPeriod: 'FY-2026'
  };

  private members: ChurchMember[] = [
    { id: 'ch_m_1', fullName: 'John Mukasa', email: 'john.mukasa@gmail.com', phone: '+256772123456', membershipDate: '2023-01-15', status: 'ACTIVE', type: 'ADULT', smallGroup: 'Grace Study Group' },
    { id: 'ch_m_2', fullName: 'Grace Alupo', email: 'grace.alupo@gmail.com', phone: '+256701987654', membershipDate: '2024-05-10', status: 'ACTIVE', type: 'ADULT', smallGroup: 'Women of Faith' },
    { id: 'ch_m_3', fullName: 'Othman Sekabira', email: 'othman.s@outlook.com', phone: '+256752000111', membershipDate: '2025-11-20', status: 'ACTIVE', type: 'CLERGY', smallGroup: 'Pastoral Council' },
    { id: 'ch_m_4', fullName: 'Sarah Nakimuli', email: 'sarah.nak@gmail.com', phone: '+256782333444', membershipDate: '2026-08-01', status: 'MEMBER', type: 'YOUTH', smallGroup: 'Youth Choir' },
    { id: 'ch_m_5', fullName: 'Peter Mukwaya', email: 'peter.m@gmail.com', phone: '+256701234567', membershipDate: '2026-08-19', status: 'VISITOR', type: 'VISITOR' }
  ];

  private donations: ChurchDonation[] = [
    { id: 'don_1', memberId: 'ch_m_1', memberName: 'John Mukasa', type: 'TITHE', amount: 350000, paymentChannel: 'MTN Mobile Money', date: '2026-08-10', status: 'POSTED_TO_FAAP' },
    { id: 'don_2', memberId: 'ch_m_2', memberName: 'Grace Alupo', type: 'OFFERING', amount: 50000, paymentChannel: 'Cash Basket', date: '2026-08-15', status: 'POSTED_TO_FAAP' }
  ];

  private pastoralCases: PastoralCareCase[] = [
    { id: 'case_1', memberId: 'ch_m_1', memberName: 'John Mukasa', counsellorId: 'ch_m_3', counsellorName: 'Pastor Othman Sekabira', type: 'SPIRITUAL', status: 'SESSIONS_ACTIVE', notes: 'Weekly spiritual counseling regarding vocation.', dateCreated: '2026-08-01' }
  ];

  private events: ChurchEvent[] = [
    { id: 'evt_1', title: 'Sovereign Youth Harvest Convention', description: 'Annual spiritual renewal convention for regional youths.', date: '2026-09-12', venue: 'Central Sanctuary Hall', ministryScope: 'YOUTH', status: 'APPROVED' },
    { id: 'evt_2', title: 'Diocese Strategic Finance Board Meeting', description: 'Quarterly review of centralized tithes splits and asset management plans.', date: '2026-08-25', venue: 'Executive Boardroom', ministryScope: 'ADMINISTRATION', status: 'SCHEDULED' }
  ];

  private smallGroups: SmallGroup[] = [
    { id: 'sg_1', name: 'Grace Study Group', leaderName: 'John Mukasa', meetingDay: 'Tuesday', location: 'Classroom C / Zoom', memberCount: 15 },
    { id: 'sg_2', name: 'Women of Faith', leaderName: 'Grace Alupo', meetingDay: 'Thursday', location: 'East Wing Sanctuary', memberCount: 22 },
    { id: 'sg_3', name: 'Youth Choir', leaderName: 'Sarah Nakimuli', meetingDay: 'Friday', location: 'Choir Loft', memberCount: 30 }
  ];

  private constructor() {}

  public static getInstance(): ChurchErpService {
    if (!ChurchErpService.instance) {
      ChurchErpService.instance = new ChurchErpService();
    }
    return ChurchErpService.instance;
  }

  // Configurations
  getConfig() { return { ...this.config }; }
  updateConfig(updates: Partial<ChurchConfig>) {
    this.config = { ...this.config, ...updates };
  }

  // Members
  getMembers() { return [...this.members]; }
  registerMember(member: Omit<ChurchMember, 'id' | 'membershipDate'>) {
    const newMember: ChurchMember = {
      ...member,
      id: `ch_m_${this.members.length + 1}`,
      membershipDate: new Date().toISOString().split('T')[0]
    };
    this.members.push(newMember);
    this.jrm.recordInteraction({
      entityId: newMember.id,
      sourceProduct: 'CHURCH_ERP',
      interactionType: 'ADMISSION',
      description: `Registered new member ${newMember.fullName} (${newMember.type})`
    });
    return newMember;
  }

  // Donations & FAAP Unified Ledger Integration
  getDonations() { return [...this.donations]; }
  recordDonation(donation: Omit<ChurchDonation, 'id' | 'status' | 'date'>) {
    const newDonation: ChurchDonation = {
      ...donation,
      id: `don_${this.donations.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      status: 'POSTED_TO_FAAP'
    };

    this.donations.push(newDonation);

    // Cross-product ledger integration into FAAP (Sovereign Journal)
    // Credit Revenue, Debit Cash/Bank
    this.faap.postUniversalTransaction({
      sourceProduct: 'MANUFACTURING',
      memo: `${newDonation.type} received from ${newDonation.memberName} via ${newDonation.paymentChannel}`,
      debitAccount: '1010', // Cash / Cash equivalents
      creditAccount: '4010', // Contributions & Donations revenue
      amount: newDonation.amount
    });

    this.jrm.recordInteraction({
      entityId: newDonation.memberId,
      sourceProduct: 'CHURCH_ERP',
      interactionType: 'TRANSACTION',
      description: `Donation recorded: ${newDonation.type} of ${this.config.currency} ${newDonation.amount.toLocaleString()} posted cleanly to FAAP Universal Journal`
    });

    return newDonation;
  }

  // Pastoral Care
  getPastoralCases() { return [...this.pastoralCases]; }
  createPastoralCase(caseData: Omit<PastoralCareCase, 'id' | 'dateCreated' | 'status'>) {
    const newCase: PastoralCareCase = {
      ...caseData,
      id: `case_${this.pastoralCases.length + 1}`,
      dateCreated: new Date().toISOString().split('T')[0],
      status: 'INTAKE'
    };
    this.pastoralCases.push(newCase);
    
    this.jrm.recordInteraction({
      entityId: newCase.memberId,
      sourceProduct: 'CHURCH_ERP',
      interactionType: 'COUNSELLING',
      description: `Opened ${newCase.type} Pastoral counseling case assigned to ${newCase.counsellorName}`
    });

    return newCase;
  }

  updatePastoralCaseStatus(id: string, status: PastoralCareCase['status']) {
    const index = this.pastoralCases.findIndex(c => c.id === id);
    if (index !== -1) {
      this.pastoralCases[index].status = status;
    }
  }

  // Events
  getEvents() { return [...this.events]; }
  createEvent(evt: Omit<ChurchEvent, 'id' | 'status'>) {
    const newEvt: ChurchEvent = {
      ...evt,
      id: `evt_${this.events.length + 1}`,
      status: 'PROPOSED'
    };
    this.events.push(newEvt);
    return newEvt;
  }

  approveEvent(id: string) {
    const index = this.events.findIndex(e => e.id === id);
    if (index !== -1) {
      this.events[index].status = 'APPROVED';
    }
  }

  // Small Groups
  getSmallGroups() { return [...this.smallGroups]; }
  createSmallGroup(group: Omit<SmallGroup, 'id' | 'memberCount'>) {
    const newGroup: SmallGroup = {
      ...group,
      id: `sg_${this.smallGroups.length + 1}`,
      memberCount: 1
    };
    this.smallGroups.push(newGroup);
    return newGroup;
  }
}
