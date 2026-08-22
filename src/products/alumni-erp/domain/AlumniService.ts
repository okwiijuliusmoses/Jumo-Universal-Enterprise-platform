/**
 * JUMO Alumni ERP — Sovereign Service
 * Manages alumni database, life-membership, and institutional endowments.
 * Integrates with FAAP for endowment ledger tracking.
 */

import { FaapService } from '../../faap/domain/FaapService';

export type WorkflowStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_REVIEW';

export interface AlumniRecord {
  id: string;
  name: string;
  graduationYear: number;
  house?: string;
  currentProfession: string;
  contact: string;
  membershipStatus: 'LIFE' | 'ANNUAL' | 'REGULAR';
}

export interface AlumniDonation {
  id: string;
  alumniId: string;
  alumniName: string;
  purpose: 'ENDOWMENT' | 'INFRASTRUCTURE' | 'BURSARY' | 'GENERAL';
  amount: number;
  date: string;
  status: WorkflowStatus;
}

export interface AlumniNetworkingRequest {
  id: string;
  requesterId: string;
  targetId: string;
  purpose: string;
  status: WorkflowStatus;
  date: string;
}

export class AlumniService {
  private static instance: AlumniService;
  private faapService = FaapService.getInstance();

  private alumni: AlumniRecord[] = [
    { id: 'ALM-001', name: 'Hon. David Kato', graduationYear: 1995, house: 'Mutesa', currentProfession: 'Attorney', contact: '+256 700 998877', membershipStatus: 'LIFE' },
    { id: 'ALM-002', name: 'Dr. Sarah Lule', graduationYear: 2005, house: 'Namirembe', currentProfession: 'Surgeon', contact: '+256 772 112233', membershipStatus: 'LIFE' }
  ];

  private donations: AlumniDonation[] = [];
  private networkingRequests: AlumniNetworkingRequest[] = [];

  private constructor() {}

  public static getInstance(): AlumniService {
    if (!AlumniService.instance) {
      AlumniService.instance = new AlumniService();
    }
    return AlumniService.instance;
  }

  getAlumni() { return this.alumni; }

  registerAlumni(record: Omit<AlumniRecord, 'id'>) {
    const newAlumni: AlumniRecord = {
      ...record,
      id: `ALM-${(this.alumni.length + 1).toString().padStart(3, '0')}`
    };
    this.alumni.push(newAlumni);
    return newAlumni;
  }

  recordDonation(alumniId: string, amount: number, purpose: AlumniDonation['purpose']) {
    const person = this.alumni.find(a => a.id === alumniId);
    if (!person) throw new Error('Alumni not found');

    const donation: AlumniDonation = {
      id: `DON-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      alumniId,
      alumniName: person.name,
      purpose,
      amount,
      date: new Date().toISOString(),
      status: 'PENDING'
    };
    this.donations.push(donation);
    return donation;
  }

  approveDonation(id: string) {
    const donation = this.donations.find(d => d.id === id);
    if (donation && donation.status === 'PENDING') {
      donation.status = 'APPROVED';
      // Post to FAAP
      this.faapService.postUniversalTransaction({
        sourceProduct: 'INTERNAL',
        memo: `Alumni Donation (${donation.purpose}): ${donation.alumniName}`,
        debitAccount: '1010',
        creditAccount: donation.purpose === 'ENDOWMENT' ? '3010' : '4010',
        amount: donation.amount
      });
    }
  }

  getDonations() { return this.donations; }

  requestNetworking(requesterId: string, targetId: string, purpose: string) {
    const request: AlumniNetworkingRequest = {
      id: `NET-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      requesterId,
      targetId,
      purpose,
      status: 'PENDING',
      date: new Date().toISOString()
    };
    this.networkingRequests.push(request);
    return request;
  }

  getNetworkingRequests() { return this.networkingRequests; }

  approveNetworking(id: string) {
    const req = this.networkingRequests.find(r => r.id === id);
    if (req) req.status = 'APPROVED';
  }
}
