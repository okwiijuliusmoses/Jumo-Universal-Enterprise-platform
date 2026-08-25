/**
 * JUMO Alumni ERP — Sovereign Service
 * Manages alumni database, life-membership, regional chapters, and institutional endowments.
 * Integrates with FAAP for endowment ledger tracking.
 */

import { FaapService } from '../../faap/domain/FaapService';

export type WorkflowStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_REVIEW';

export interface RegionalChapter {
  id: string;
  chapterName: string; // e.g. "UK & Europe Chapter", "North America Chapter", "Kampala Chapter"
  regionalHead: string;
  activeMembersCount: number;
  totalPledgedUsd: number;
}

export interface AlumniRecord {
  id: string;
  name: string;
  graduationYear: number;
  house?: string;
  chapterId?: string;
  currentProfession: string;
  contact: string;
  membershipStatus: 'LIFE' | 'ANNUAL' | 'REGULAR';
}

export interface AlumniDonation {
  id: string;
  alumniId: string;
  donorName: string;
  fundCategory: string;
  amountUGX: number;
  paymentMethod: string;
  receiptNumber: string;
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

  private chapters: RegionalChapter[] = [
    { id: 'CHP-01', chapterName: 'Kampala Metropolitan Chapter', regionalHead: 'Hon. David Kato', activeMembersCount: 450, totalPledgedUsd: 125000 },
    { id: 'CHP-02', chapterName: 'United Kingdom & Europe Chapter', regionalHead: 'Dr. Sarah Lule', activeMembersCount: 120, totalPledgedUsd: 210000 },
    { id: 'CHP-03', chapterName: 'North America Chapter', regionalHead: 'Prof. Joseph Opio', activeMembersCount: 180, totalPledgedUsd: 350000 }
  ];

  private alumni: AlumniRecord[] = [
    { id: 'ALM-001', name: 'Hon. David Kato', graduationYear: 1995, house: 'Mutesa', chapterId: 'CHP-01', currentProfession: 'Attorney', contact: '+256 700 998877', membershipStatus: 'LIFE' },
    { id: 'ALM-002', name: 'Dr. Sarah Lule', graduationYear: 2005, house: 'Namirembe', chapterId: 'CHP-02', currentProfession: 'Surgeon', contact: '+256 772 112233', membershipStatus: 'LIFE' }
  ];

  private donations: AlumniDonation[] = [
    { id: 'DON-901', alumniId: 'ALM-001', donorName: 'Hon. David Kato', fundCategory: 'Library Infrastructure Fund', amountUGX: 5000000, paymentMethod: 'BANK_TRANSFER', receiptNumber: 'ALM-REC-2026-001', date: '2026-07-15', status: 'APPROVED' },
    { id: 'DON-902', alumniId: 'ALM-002', donorName: 'Class of 1995 Cohort', fundCategory: 'General Institutional Endowment', amountUGX: 12000000, paymentMethod: 'CHEQUE', receiptNumber: 'ALM-REC-2026-002', date: '2026-08-01', status: 'APPROVED' }
  ];

  private networkingRequests: AlumniNetworkingRequest[] = [];

  private constructor() {}

  public static getInstance(): AlumniService {
    if (!AlumniService.instance) {
      AlumniService.instance = new AlumniService();
    }
    return AlumniService.instance;
  }

  getChapters() { return this.chapters; }
  getAlumni() { return this.alumni; }

  registerAlumni(record: Omit<AlumniRecord, 'id'>) {
    const newAlumni: AlumniRecord = {
      ...record,
      id: `ALM-${(this.alumni.length + 1).toString().padStart(3, '0')}`
    };
    this.alumni.push(newAlumni);
    return newAlumni;
  }

  // --- ENDOWMENT DONATION & FAAP LEDGER INTEGRATION ---
  recordEndowmentDonation(donorName: string, fundCategory: string, amountUGX: number, paymentMethod: string = 'BANK_TRANSFER') {
    const receiptNumber = `ALM-REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const donation: AlumniDonation = {
      id: `DON-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      alumniId: 'ALM-GENERIC',
      donorName,
      fundCategory,
      amountUGX,
      paymentMethod,
      receiptNumber,
      date: new Date().toISOString().split('T')[0],
      status: 'APPROVED'
    };
    this.donations.unshift(donation);

    this.faapService.postUniversalTransaction({
      sourceProduct: 'ALUMNI_ERP',
      memo: `Alumni Endowment Donation (${fundCategory}): ${donorName} - Receipt #${receiptNumber}`,
      debitAccount: '1010', // Cash / Bank
      creditAccount: '3010', // Endowment Capital Ledger
      amount: amountUGX
    });

    return donation;
  }

  getDonations() { return this.donations; }

  requestNetworking(requesterId: string, targetId: string, purpose: string) {
    const request: AlumniNetworkingRequest = {
      id: `NET-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      requesterId,
      targetId,
      purpose,
      status: 'PENDING',
      date: new Date().toISOString().split('T')[0]
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
