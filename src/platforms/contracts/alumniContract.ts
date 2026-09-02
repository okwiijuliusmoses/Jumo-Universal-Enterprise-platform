/**
 * JUMO ALUMNI INTEGRATION CONTRACT
 * Authoritative Client Contract for Shared Education & Community Advancement Subsystem
 * Consumed by: JUMO SECONDARY SCHOOL ERP (and other educational platforms)
 */

import { alumniPlatformEngine } from '../alumni/alumniService';
import type {
  AlumniProfile,
  GraduationCohort,
  AlumniChapter,
  MentorshipConnection,
  EndowmentCampaign,
  AlumniDonationRecord,
} from '../alumni/alumniTypes';

export interface IAlumniClient {
  registerProfile(profile: Omit<AlumniProfile, 'id' | 'joinedDate' | 'verifiedStatus'>): AlumniProfile;
  getProfiles(institutionId?: string): AlumniProfile[];
  getCohorts(institutionId?: string): GraduationCohort[];
  getChapters(institutionId?: string): AlumniChapter[];
  getCampaigns(institutionId?: string): EndowmentCampaign[];
  getMentorshipConnections(): MentorshipConnection[];
  createMentorship(mentorId: string, menteeId: string, menteeName: string, focusArea: MentorshipConnection['focusArea']): MentorshipConnection;
  recordEndowmentDonation(params: {
    campaignId: string;
    donorId: string;
    donorName: string;
    amountUGX: number;
    paymentRail: AlumniDonationRecord['paymentRail'];
    payerPhoneNumber?: string;
  }): { donation: AlumniDonationRecord; faapJournalId: string; digitalPayReceipt: string };
  getDonations(campaignId?: string): AlumniDonationRecord[];
}

export class AlumniIntegrationClient implements IAlumniClient {
  public registerProfile(profile: Omit<AlumniProfile, 'id' | 'joinedDate' | 'verifiedStatus'>): AlumniProfile {
    return alumniPlatformEngine.registerProfile(profile);
  }

  public getProfiles(institutionId?: string): AlumniProfile[] {
    return alumniPlatformEngine.getProfiles(institutionId);
  }

  public getCohorts(institutionId?: string): GraduationCohort[] {
    return alumniPlatformEngine.getCohorts(institutionId);
  }

  public getChapters(institutionId?: string): AlumniChapter[] {
    return alumniPlatformEngine.getChapters(institutionId);
  }

  public getCampaigns(institutionId?: string): EndowmentCampaign[] {
    return alumniPlatformEngine.getCampaigns(institutionId);
  }

  public getMentorshipConnections(): MentorshipConnection[] {
    return alumniPlatformEngine.getMentorshipConnections();
  }

  public createMentorship(mentorId: string, menteeId: string, menteeName: string, focusArea: MentorshipConnection['focusArea']): MentorshipConnection {
    return alumniPlatformEngine.createMentorship(mentorId, menteeId, menteeName, focusArea);
  }

  public recordEndowmentDonation(params: {
    campaignId: string;
    donorId: string;
    donorName: string;
    amountUGX: number;
    paymentRail: AlumniDonationRecord['paymentRail'];
    payerPhoneNumber?: string;
  }): { donation: AlumniDonationRecord; faapJournalId: string; digitalPayReceipt: string } {
    return alumniPlatformEngine.recordEndowmentDonation(params);
  }

  public getDonations(campaignId?: string): AlumniDonationRecord[] {
    return alumniPlatformEngine.getDonations(campaignId);
  }
}

export const alumniClient = new AlumniIntegrationClient();
