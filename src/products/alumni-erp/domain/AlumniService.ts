/**
 * JUMO Alumni ERP — Sovereign Service
 * Manages alumni database, life-membership, and institutional endowments.
 * Integrates with FAAP for endowment ledger tracking.
 */

import { FaapService } from '../../faap/domain/FaapService';

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
}

export class AlumniService {
  private static instance: AlumniService;
  private faapService = FaapService.getInstance();

  private alumni: AlumniRecord[] = [
    { id: 'ALM-001', name: 'Hon. David Kato', graduationYear: 1995, house: 'Mutesa', currentProfession: 'Attorney', contact: '+256 700 998877', membershipStatus: 'LIFE' },
    { id: 'ALM-002', name: 'Dr. Sarah Lule', graduationYear: 2005, house: 'Namirembe', currentProfession: 'Surgeon', contact: '+256 772 112233', membershipStatus: 'LIFE' }
  ];

  private donations: AlumniDonation[] = [];

  private constructor() {}

  public static getInstance(): AlumniService {
    if (!AlumniService.instance) {
      AlumniService.instance = new AlumniService();
    }
    return AlumniService.instance;
  }

  getAlumni() { return this.alumni; }

  recordDonation(alumniId: string, amount: number, purpose: AlumniDonation['purpose']) {
    const person = this.alumni.find(a => a.id === alumniId);
    if (!person) throw new Error('Alumni not found');

    const donation: AlumniDonation = {
      id: `DON-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      alumniId,
      alumniName: person.name,
      purpose,
      amount,
      date: new Date().toISOString()
    };
    this.donations.push(donation);

    // Post to FAAP
    // Alumni donations are often Equity or restricted Revenue
    this.faapService.postUniversalTransaction({
      sourceProduct: 'INTERNAL',
      memo: `Alumni Donation (${purpose}): ${person.name}`,
      debitAccount: '1010',
      creditAccount: '4010', // Revenue for now, could be 3010 Equity for endowments
      amount: amount
    });

    return donation;
  }

  getDonations() { return this.donations; }
}
