/**
 * JUMO Nursery + Primary Consolidated ERP — School Clinic Service
 * Sick bay consultations, health profiles, triage, medication administrations, and referral dispatches.
 */

export interface StudentHealthProfile {
  id: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'UNKNOWN';
  allergies: string[];
  chronicConditions: string[];
  emergencyContactName: string;
  emergencyContactPhone: string;
  immunizationComplete: boolean;
  notes?: string;
  lastUpdated: string;
}

export interface SickBayVisit {
  id: string;
  visitNumber: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  visitTimestamp: string;
  chiefComplaint: string;
  temperatureC: number;
  pulseRate?: number;
  diagnosis: string;
  treatmentPrescribed: string;
  medicationDispensed?: string;
  bedRestRequired: boolean;
  bedRestStartTime?: string;
  bedRestEndTime?: string;
  parentNotified: boolean;
  parentNotificationNotes?: string;
  attendingNurse: string;
  status: 'IN_SICKBAY' | 'DISCHARGED' | 'REFERRED_TO_HOSPITAL';
  dischargeTimestamp?: string;
}

export interface ClinicMedication {
  id: string;
  itemCode: string;
  name: string;
  dosageForm: 'TABLETS' | 'SYRUP' | 'INJECTION' | 'CREAM' | 'DROPS' | 'BANDAGES';
  batchNumber: string;
  expiryDate: string;
  quantityInStock: number;
  minimumThreshold: number;
  unit: string;
}

export interface HospitalReferral {
  id: string;
  referralNumber: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  hospitalName: string;
  emergencyReason: string;
  dispatchTime: string;
  accompanyingStaff: string;
  parentContactedTime: string;
  parentArrived: boolean;
  outcomeNotes?: string;
  status: 'DISPATCHED' | 'ADMITTED' | 'DISCHARGED_BACK_HOME';
}

class ClinicService {
  private static instance: ClinicService;

  private healthProfiles: StudentHealthProfile[] = [
    {
      id: 'HP-001',
      studentId: 'STU-ECD-001',
      studentName: 'Alice Katusiime',
      classGrade: 'Middle Class',
      bloodGroup: 'O+',
      allergies: ['Peanuts', 'Dust mites'],
      chronicConditions: ['Mild Asthma'],
      emergencyContactName: 'John Katusiime (Father)',
      emergencyContactPhone: '+256772123456',
      immunizationComplete: true,
      notes: 'Inhaler stored in clinic emergency pouch.',
      lastUpdated: '2026-08-10'
    },
    {
      id: 'HP-002',
      studentId: 'STU-PRI-045',
      studentName: 'David Otim',
      classGrade: 'P.4 Blue',
      bloodGroup: 'A+',
      allergies: ['Penicillin'],
      chronicConditions: [],
      emergencyContactName: 'Sarah Otim (Mother)',
      emergencyContactPhone: '+256752987654',
      immunizationComplete: true,
      notes: 'Never administer penicillin derivatives.',
      lastUpdated: '2026-08-14'
    },
    {
      id: 'HP-003',
      studentId: 'STU-PRI-112',
      studentName: 'Brian Mukasa',
      classGrade: 'P.6 Red',
      bloodGroup: 'B+',
      allergies: ['Shellfish'],
      chronicConditions: ['Sickle Cell Trait'],
      emergencyContactName: 'Dr. Timothy Mukasa (Father)',
      emergencyContactPhone: '+256701554433',
      immunizationComplete: true,
      notes: 'Ensure regular hydration during sports.',
      lastUpdated: '2026-08-18'
    }
  ];

  private visits: SickBayVisit[] = [
    {
      id: 'VIS-001',
      visitNumber: 'CLIN-2026-089',
      studentId: 'STU-PRI-045',
      studentName: 'David Otim',
      classGrade: 'P.4 Blue',
      visitTimestamp: '2026-08-23T08:30:00Z',
      chiefComplaint: 'Sudden high fever, headache and chills during morning assembly.',
      temperatureC: 38.6,
      pulseRate: 92,
      diagnosis: 'Suspected Malaria / Viral Fever',
      treatmentPrescribed: 'Paracetamol 250mg syrup, Tepid sponge, Bed rest in sickbay.',
      medicationDispensed: 'Paracetamol 250mg 10ml',
      bedRestRequired: true,
      bedRestStartTime: '08:45 AM',
      parentNotified: true,
      parentNotificationNotes: 'Called Mother (Sarah Otim), confirmed RDT test to be done.',
      attendingNurse: 'Sr. Florence Nabatanzi, RN',
      status: 'IN_SICKBAY'
    },
    {
      id: 'VIS-002',
      visitNumber: 'CLIN-2026-088',
      studentId: 'STU-ECD-001',
      studentName: 'Alice Katusiime',
      classGrade: 'Middle Class',
      visitTimestamp: '2026-08-22T10:15:00Z',
      chiefComplaint: 'Knee graze and minor bruise from playground slide.',
      temperatureC: 36.8,
      diagnosis: 'Superficial skin abrasion right knee',
      treatmentPrescribed: 'Wound antiseptic cleansing with Povidone Iodine and sterile dressing.',
      medicationDispensed: 'Sterile gauze & adhesive plaster',
      bedRestRequired: false,
      parentNotified: false,
      attendingNurse: 'Sr. Florence Nabatanzi, RN',
      status: 'DISCHARGED',
      dischargeTimestamp: '2026-08-22T10:40:00Z'
    }
  ];

  private medications: ClinicMedication[] = [
    {
      id: 'MED-001',
      itemCode: 'MED-PARA-SYR',
      name: 'Paracetamol Syrup 120mg/5ml (100ml)',
      dosageForm: 'SYRUP',
      batchNumber: 'BCH-2026-P01',
      expiryDate: '2027-11-30',
      quantityInStock: 42,
      minimumThreshold: 15,
      unit: 'Bottles'
    },
    {
      id: 'MED-002',
      itemCode: 'MED-ORS-SACH',
      name: 'Oral Rehydration Salts (ORS) Sachets',
      dosageForm: 'DROPS',
      batchNumber: 'BCH-2026-O88',
      expiryDate: '2028-05-31',
      quantityInStock: 120,
      minimumThreshold: 30,
      unit: 'Sachets'
    },
    {
      id: 'MED-003',
      itemCode: 'MED-IBUP-TAB',
      name: 'Ibuprofen Tablets 200mg',
      dosageForm: 'TABLETS',
      batchNumber: 'BCH-2026-IB12',
      expiryDate: '2027-08-15',
      quantityInStock: 250,
      minimumThreshold: 50,
      unit: 'Tablets'
    },
    {
      id: 'MED-004',
      itemCode: 'MED-BAND-STER',
      name: 'Sterile Roller Bandages & Plasters Box',
      dosageForm: 'BANDAGES',
      batchNumber: 'BCH-2026-B09',
      expiryDate: '2029-12-31',
      quantityInStock: 35,
      minimumThreshold: 10,
      unit: 'Packs'
    },
    {
      id: 'MED-005',
      itemCode: 'MED-CETR-SYR',
      name: 'Cetirizine Antihistamine Syrup 5mg/5ml',
      dosageForm: 'SYRUP',
      batchNumber: 'BCH-2026-C44',
      expiryDate: '2027-04-30',
      quantityInStock: 18,
      minimumThreshold: 10,
      unit: 'Bottles'
    }
  ];

  private referrals: HospitalReferral[] = [
    {
      id: 'REF-001',
      referralNumber: 'REF-HOSP-2026-004',
      studentId: 'STU-PRI-099',
      studentName: 'Emmanuel Kato',
      classGrade: 'P.7 Green',
      hospitalName: 'Mengo Hospital / Children Emergency',
      emergencyReason: 'Acute abdominal pain with rebound tenderness (Suspected appendicitis)',
      dispatchTime: '2026-08-15T13:45:00Z',
      accompanyingStaff: 'Sr. Florence Nabatanzi & Tr. Samuel Byaruhanga',
      parentContactedTime: '2026-08-15T13:30:00Z',
      parentArrived: true,
      outcomeNotes: 'Underwent successful laparoscopic appendectomy. Discharged home on 18th Aug.',
      status: 'DISCHARGED_BACK_HOME'
    }
  ];

  private constructor() {}

  public static getInstance(): ClinicService {
    if (!ClinicService.instance) {
      ClinicService.instance = new ClinicService();
    }
    return ClinicService.instance;
  }

  // Sickbay Visits
  public getVisits(): SickBayVisit[] {
    return [...this.visits];
  }

  public getVisitById(id: string): SickBayVisit | undefined {
    return this.visits.find(v => v.id === id);
  }

  public recordVisit(data: {
    studentId: string;
    studentName: string;
    classGrade: string;
    chiefComplaint: string;
    temperatureC: number;
    pulseRate?: number;
    diagnosis: string;
    treatmentPrescribed: string;
    medicationDispensed?: string;
    bedRestRequired: boolean;
    parentNotified: boolean;
    parentNotificationNotes?: string;
    attendingNurse: string;
  }): SickBayVisit {
    const num = String(this.visits.length + 90).padStart(3, '0');
    const newVisit: SickBayVisit = {
      id: `VIS-${Date.now()}`,
      visitNumber: `CLIN-${new Date().getFullYear()}-${num}`,
      studentId: data.studentId,
      studentName: data.studentName,
      classGrade: data.classGrade,
      visitTimestamp: new Date().toISOString(),
      chiefComplaint: data.chiefComplaint,
      temperatureC: data.temperatureC,
      pulseRate: data.pulseRate,
      diagnosis: data.diagnosis,
      treatmentPrescribed: data.treatmentPrescribed,
      medicationDispensed: data.medicationDispensed,
      bedRestRequired: data.bedRestRequired,
      bedRestStartTime: data.bedRestRequired ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
      parentNotified: data.parentNotified,
      parentNotificationNotes: data.parentNotificationNotes,
      attendingNurse: data.attendingNurse || 'Sr. Florence Nabatanzi, RN',
      status: data.bedRestRequired ? 'IN_SICKBAY' : 'DISCHARGED',
      dischargeTimestamp: data.bedRestRequired ? undefined : new Date().toISOString()
    };

    this.visits.unshift(newVisit);
    return newVisit;
  }

  public dischargeStudent(visitId: string, notes?: string): SickBayVisit {
    const visit = this.visits.find(v => v.id === visitId);
    if (!visit) throw new Error('Visit record not found');
    visit.status = 'DISCHARGED';
    visit.dischargeTimestamp = new Date().toISOString();
    visit.bedRestEndTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (notes) {
      visit.treatmentPrescribed += ` | Discharge notes: ${notes}`;
    }
    return visit;
  }

  // Health Profiles
  public getHealthProfiles(): StudentHealthProfile[] {
    return [...this.healthProfiles];
  }

  public getHealthProfileByStudentId(studentId: string): StudentHealthProfile | undefined {
    return this.healthProfiles.find(p => p.studentId === studentId);
  }

  public saveHealthProfile(data: Omit<StudentHealthProfile, 'id' | 'lastUpdated'>): StudentHealthProfile {
    const existingIndex = this.healthProfiles.findIndex(p => p.studentId === data.studentId);
    if (existingIndex >= 0) {
      this.healthProfiles[existingIndex] = {
        ...this.healthProfiles[existingIndex],
        ...data,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      return this.healthProfiles[existingIndex];
    } else {
      const newProfile: StudentHealthProfile = {
        id: `HP-${Date.now()}`,
        ...data,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      this.healthProfiles.unshift(newProfile);
      return newProfile;
    }
  }

  // Medication Inventory
  public getMedications(): ClinicMedication[] {
    return [...this.medications];
  }

  public addMedication(data: Omit<ClinicMedication, 'id'>): ClinicMedication {
    const newMed: ClinicMedication = {
      id: `MED-${Date.now()}`,
      ...data
    };
    this.medications.push(newMed);
    return newMed;
  }

  public dispenseMedication(medId: string, quantity: number): ClinicMedication {
    const med = this.medications.find(m => m.id === medId);
    if (!med) throw new Error('Medication not found in inventory');
    if (med.quantityInStock < quantity) throw new Error('Insufficient medication stock');
    med.quantityInStock -= quantity;
    return med;
  }

  // Emergency Referrals
  public getReferrals(): HospitalReferral[] {
    return [...this.referrals];
  }

  public recordReferral(data: Omit<HospitalReferral, 'id' | 'referralNumber' | 'dispatchTime' | 'status'>): HospitalReferral {
    const num = String(this.referrals.length + 5).padStart(3, '0');
    const newRef: HospitalReferral = {
      id: `REF-${Date.now()}`,
      referralNumber: `REF-HOSP-${new Date().getFullYear()}-${num}`,
      dispatchTime: new Date().toISOString(),
      status: 'DISPATCHED',
      ...data
    };
    this.referrals.unshift(newRef);
    return newRef;
  }

  public getClinicStats() {
    const inSickbay = this.visits.filter(v => v.status === 'IN_SICKBAY').length;
    const todayStr = new Date().toISOString().split('T')[0];
    const visitsToday = this.visits.filter(v => v.visitTimestamp.startsWith(todayStr)).length;
    const lowStockMeds = this.medications.filter(m => m.quantityInStock <= m.minimumThreshold).length;
    const totalProfiles = this.healthProfiles.length;
    const allergyCases = this.healthProfiles.filter(h => h.allergies.length > 0).length;

    return {
      inSickbay,
      visitsToday,
      lowStockMeds,
      totalProfiles,
      allergyCases,
      totalVisits: this.visits.length
    };
  }
}

export const clinicService = ClinicService.getInstance();
