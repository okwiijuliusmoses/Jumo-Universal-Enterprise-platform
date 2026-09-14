/**
 * JUMO ALUMNI PLATFORM ENGINE
 * Reusable Education & Community Advancement Service Subsystem
 * Consumed by: JUMO SECONDARY SCHOOL ERP and institutional educational products
 * Authority: JUMO UEOS Consolidated Architecture V2.0
 */

import { faapEnterpriseEngine } from '../faap/faapEnterpriseEngine';
import { digitalPayOrchestrator } from '../digitalPay/digitalPayOrchestrator';
import type {
  AlumniProfile,
  GraduationCohort,
  AlumniChapter,
  MentorshipConnection,
  EndowmentCampaign,
  AlumniDonationRecord,
} from './alumniTypes';

export class AlumniPlatformEngine {
  private profiles = new Map<string, AlumniProfile>();
  private cohorts = new Map<string, GraduationCohort>();
  private chapters = new Map<string, AlumniChapter>();
  private mentorships = new Map<string, MentorshipConnection>();
  private campaigns = new Map<string, EndowmentCampaign>();
  private donations: AlumniDonationRecord[] = [];

  constructor() {
    this.seedInitialAlumniData();
  }

  private seedInitialAlumniData() {
    // Seed Sample Cohorts
    const initialCohorts: GraduationCohort[] = [
      {
        id: 'COHORT-2020-SEC',
        institutionId: 'prod-secondary-school',
        year: 2020,
        level: 'UCE & UACE',
        name: 'Class of 2020 - Visionary Cohort',
        totalGraduates: 240,
        registeredAlumniCount: 184,
        presidentName: 'Okello Ronald',
        presidentContact: '+256772100201',
        reunionDate: '2026-12-19',
      },
      {
        id: 'COHORT-2015-SEC',
        institutionId: 'prod-secondary-school',
        year: 2015,
        level: 'UACE Advanced Level',
        name: 'Class of 2015 - Decade Milestone Cohort',
        totalGraduates: 195,
        registeredAlumniCount: 172,
        presidentName: 'Nassuna Brenda',
        presidentContact: '+256701889922',
        reunionDate: '2026-10-10',
      },
    ];

    initialCohorts.forEach(c => this.cohorts.set(c.id, c));

    // Seed Sample Chapters
    const initialChapters: AlumniChapter[] = [
      {
        id: 'CHAP-KLA',
        institutionId: 'prod-secondary-school',
        name: 'Kampala Metropolitan Old Students Chapter',
        region: 'KAMPALA',
        chairmanName: 'Dr. Mukasa Emmanuel',
        membersCount: 420,
        meetingSchedule: 'First Saturday of every Quarter',
      },
      {
        id: 'CHAP-UK',
        institutionId: 'prod-secondary-school',
        name: 'United Kingdom & Diaspora Alumni Chapter',
        region: 'DIASPORA_UK',
        chairmanName: 'Eng. Akello Sarah',
        membersCount: 88,
        meetingSchedule: 'Bi-annual Virtual AGM',
      },
    ];

    initialChapters.forEach(ch => this.chapters.set(ch.id, ch));

    // Seed Sample Campaigns
    const initialCampaigns: EndowmentCampaign[] = [
      {
        id: 'CAMP-SCIENCE-2026',
        institutionId: 'prod-secondary-school',
        title: 'New High-Tech Chemistry & Physics Laboratory Endowment',
        targetAmountUGX: 250000000,
        raisedAmountUGX: 142500000,
        startDate: '2026-01-15',
        endDate: '2026-11-30',
        projectPurpose: 'SCIENCE_LAB_EQUIPMENT',
        status: 'ACTIVE',
        contributorsCount: 114,
      },
      {
        id: 'CAMP-BURSARY-2026',
        institutionId: 'prod-secondary-school',
        title: 'Needy & Vulnerable Scholars Bursary Endowment Fund',
        targetAmountUGX: 100000000,
        raisedAmountUGX: 68000000,
        startDate: '2026-02-01',
        endDate: '2026-12-15',
        projectPurpose: 'HARDSHIP_BURSARY_FUND',
        status: 'ACTIVE',
        contributorsCount: 65,
      },
    ];

    initialCampaigns.forEach(cmp => this.campaigns.set(cmp.id, cmp));

    // Seed Sample Profiles
    const initialProfiles: AlumniProfile[] = [
      {
        id: 'ALUM-001',
        fullName: 'Eng. Patrick Otim',
        email: 'potim@infrastructure.go.ug',
        phoneNumber: '+256772990011',
        institutionId: 'prod-secondary-school',
        institutionName: 'Secondary School ERP',
        graduationYear: 2012,
        level: 'A_LEVEL',
        cohortName: 'Class of 2012 Pioneers',
        indexNumber: 'U0048/512',
        currentProfession: 'Senior Civil Engineer',
        currentEmployer: 'Ministry of Works & Transport',
        chapterId: 'CHAP-KLA',
        isMentorAvailable: true,
        totalDonationsUGX: 5000000,
        verifiedStatus: 'VERIFIED',
        joinedDate: '2021-03-10',
      },
      {
        id: 'ALUM-002',
        fullName: 'Dr. Julian Nabirye',
        email: 'jnabirye@mulago.org',
        phoneNumber: '+256703554433',
        institutionId: 'prod-secondary-school',
        institutionName: 'Secondary School ERP',
        graduationYear: 2016,
        level: 'A_LEVEL',
        cohortName: 'Class of 2016 Leaders',
        indexNumber: 'U0048/604',
        currentProfession: 'Specialist Paediatrician',
        currentEmployer: 'Mulago National Referral Hospital',
        chapterId: 'CHAP-KLA',
        isMentorAvailable: true,
        totalDonationsUGX: 3500000,
        verifiedStatus: 'VERIFIED',
        joinedDate: '2022-07-15',
      },
    ];

    initialProfiles.forEach(p => this.profiles.set(p.id, p));
  }

  // Authoritative API Methods
  public registerProfile(profile: Omit<AlumniProfile, 'id' | 'joinedDate' | 'verifiedStatus'>): AlumniProfile {
    const id = `ALUM-${Date.now()}`;
    const newProfile: AlumniProfile = {
      ...profile,
      id,
      joinedDate: new Date().toISOString().split('T')[0],
      verifiedStatus: 'VERIFIED',
    };
    this.profiles.set(id, newProfile);
    return newProfile;
  }

  public getProfiles(institutionId?: string): AlumniProfile[] {
    const list = Array.from(this.profiles.values());
    if (institutionId) {
      return list.filter(p => p.institutionId === institutionId);
    }
    return list;
  }

  public getCohorts(institutionId?: string): GraduationCohort[] {
    const list = Array.from(this.cohorts.values());
    if (institutionId) {
      return list.filter(c => c.institutionId === institutionId);
    }
    return list;
  }

  public getChapters(institutionId?: string): AlumniChapter[] {
    const list = Array.from(this.chapters.values());
    if (institutionId) {
      return list.filter(c => c.institutionId === institutionId);
    }
    return list;
  }

  public getCampaigns(institutionId?: string): EndowmentCampaign[] {
    const list = Array.from(this.campaigns.values());
    if (institutionId) {
      return list.filter(c => c.institutionId === institutionId);
    }
    return list;
  }

  public getMentorshipConnections(): MentorshipConnection[] {
    return Array.from(this.mentorships.values());
  }

  public createMentorship(mentorId: string, menteeId: string, menteeName: string, focusArea: MentorshipConnection['focusArea']): MentorshipConnection {
    const mentor = this.profiles.get(mentorId);
    const id = `MENTOR-${Date.now()}`;
    const mentorship: MentorshipConnection = {
      id,
      mentorId,
      mentorName: mentor ? mentor.fullName : 'Verified Alumni Mentor',
      menteeId,
      menteeName,
      focusArea,
      status: 'ACTIVE',
      startDate: new Date().toISOString().split('T')[0],
      sessionsLogged: 1,
    };
    this.mentorships.set(id, mentorship);
    return mentorship;
  }

  public recordEndowmentDonation(params: {
    campaignId: string;
    donorId: string;
    donorName: string;
    amountUGX: number;
    paymentRail: AlumniDonationRecord['paymentRail'];
    payerPhoneNumber?: string;
  }): { donation: AlumniDonationRecord; faapJournalId: string; digitalPayReceipt: string } {
    const campaign = this.campaigns.get(params.campaignId);
    if (!campaign) {
      throw new Error(`Endowment campaign ${params.campaignId} not found`);
    }

    // 1. Process payment via Digital Pay Switch
    const payResult = digitalPayOrchestrator.processPayment({
      idempotencyKey: `ALUM-IDEM-${Date.now()}-${params.donorId}`,
      payCode: 'PAY-EDU-2026',
      payerName: params.donorName,
      payerPhoneOrAccount: params.payerPhoneNumber || '256700000000',
      amount: params.amountUGX,
      currency: 'UGX',
      rail: params.paymentRail === 'MTN_MOMO' ? 'MTN_MOMO' : params.paymentRail === 'AIRTEL_MONEY' ? 'AIRTEL_MONEY' : 'BANK_EFT',
      narrative: `Alumni Endowment: ${campaign.title}`,
      metadata: { campaignId: params.campaignId, donor: params.donorName },
    });

    // 2. Post statutory journal entry to FAAP Double-Entry General Ledger
    const journal = faapEnterpriseEngine.createJournalEntry(
      `ALUM-DON-${Date.now()}`,
      `Alumni Endowment Gift from ${params.donorName} for ${campaign.title}`,
      'ALUMNI_ADVANCEMENT' as any,
      [
        {
          accountId: 'acct-1030', // Digital Pay Settlement Clearing
          description: `Endowment donation receipt - ${params.donorName}`,
          debit: params.amountUGX,
          credit: 0,
        },
        {
          accountId: 'acct-4010', // Institutional Endowment & Revenue
          description: `Endowment Contribution - ${campaign.title}`,
          debit: 0,
          credit: params.amountUGX,
        },
      ],
      true
    );

    // 3. Update campaign metrics
    campaign.raisedAmountUGX += params.amountUGX;
    campaign.contributorsCount += 1;

    // 4. Update donor profile if registered
    const donorProfile = this.profiles.get(params.donorId);
    if (donorProfile) {
      donorProfile.totalDonationsUGX += params.amountUGX;
    }

    const donation: AlumniDonationRecord = {
      id: `DON-${Date.now()}`,
      campaignId: params.campaignId,
      donorId: params.donorId,
      donorName: params.donorName,
      amountUGX: params.amountUGX,
      paymentRail: params.paymentRail,
      paymentReference: payResult.publicReference,
      receiptNumber: `ALUM-RCP-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString(),
      faapJournalId: journal.id,
      taxDeductible: true,
    };

    this.donations.push(donation);

    return {
      donation,
      faapJournalId: journal.id,
      digitalPayReceipt: payResult.publicReference,
    };
  }

  public getDonations(campaignId?: string): AlumniDonationRecord[] {
    if (campaignId) {
      return this.donations.filter(d => d.campaignId === campaignId);
    }
    return [...this.donations];
  }
}

export const alumniPlatformEngine = new AlumniPlatformEngine();
