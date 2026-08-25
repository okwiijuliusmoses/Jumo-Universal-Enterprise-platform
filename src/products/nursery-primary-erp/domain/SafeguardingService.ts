/**
 * JUMO Nursery + Primary Consolidated ERP — Safeguarding & Discipline Service
 * Authorized pickup registry, gate release verification, child protection case management, merits & demerits.
 */

export interface AuthorizedPickupPerson {
  id: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  personName: string;
  relationship: string;
  nationalIdNumber: string;
  phoneNumber: string;
  passCodePin: string;
  securityPassNumber: string;
  status: 'ACTIVE' | 'REVOKED' | 'TEMPORARY';
  temporaryValidUntil?: string;
  registeredDate: string;
  notes?: string;
}

export interface GatePickupLog {
  id: string;
  logNumber: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  direction: 'MORNING_DROPOFF' | 'EVENING_PICKUP' | 'MIDDAY_EXEAT';
  timestamp: string;
  personName: string;
  verificationMethod: 'SECURITY_PIN' | 'QR_CODE' | 'PHOTO_ID' | 'PARENT_CALL_OVERRIDE';
  gateOfficer: string;
  status: 'VERIFIED' | 'FLAGGED_UNAUTHORIZED';
  remarks?: string;
}

export interface SafeguardingIncidentCase {
  id: string;
  caseNumber: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  incidentDate: string;
  category: 'CHILD_PROTECTION' | 'BULLYING' | 'NEGLECT' | 'ACCIDENTAL_INJURY' | 'BEHAVIORAL' | 'ATTENDANCE_TRUANCY';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  reportedBy: string;
  summary: string;
  investigationFindings: string;
  actionPlan: string;
  designatedSafeguardingLead: string;
  parentMeetingHeld: boolean;
  status: 'OPEN' | 'UNDER_INVESTIGATION' | 'ACTION_TAKEN' | 'CLOSED';
  lastUpdated: string;
}

export interface ConductPointRecord {
  id: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  date: string;
  pointType: 'MERIT' | 'DEMERIT';
  points: number;
  category: 'DISCIPLINE' | 'HONESTY' | 'PEER_SUPPORT' | 'UNIFORM_SMARTNESS' | 'DISRUPTION' | 'ACADEMIC_DILIGENCE';
  reason: string;
  awardedBy: string;
}

class SafeguardingService {
  private static instance: SafeguardingService;

  private authorizedPickups: AuthorizedPickupPerson[] = [
    {
      id: 'PKP-001',
      studentId: 'STU-ECD-001',
      studentName: 'Alice Katusiime',
      classGrade: 'Middle Class',
      personName: 'John Katusiime',
      relationship: 'Father (Primary Guardian)',
      nationalIdNumber: 'CM84029102938K',
      phoneNumber: '+256772123456',
      passCodePin: '4921',
      securityPassNumber: 'SEC-PASS-0012',
      status: 'ACTIVE',
      registeredDate: '2026-02-01',
      notes: 'Father picks up on Mondays, Wednesdays & Fridays.'
    },
    {
      id: 'PKP-002',
      studentId: 'STU-ECD-001',
      studentName: 'Alice Katusiime',
      classGrade: 'Middle Class',
      personName: 'Grace Mbabazi',
      relationship: 'Designated Nanny',
      nationalIdNumber: 'CF98031238472L',
      phoneNumber: '+256782334455',
      passCodePin: '8832',
      securityPassNumber: 'SEC-PASS-0013',
      status: 'ACTIVE',
      registeredDate: '2026-02-05',
      notes: 'Authorized for daily 4:00 PM ECD pickup with verified badge.'
    },
    {
      id: 'PKP-003',
      studentId: 'STU-PRI-045',
      studentName: 'David Otim',
      classGrade: 'P.4 Blue',
      personName: 'Sarah Otim',
      relationship: 'Mother',
      nationalIdNumber: 'CF87019283746M',
      phoneNumber: '+256752987654',
      passCodePin: '1290',
      securityPassNumber: 'SEC-PASS-0045',
      status: 'ACTIVE',
      registeredDate: '2026-02-02'
    },
    {
      id: 'PKP-004',
      studentId: 'STU-PRI-112',
      studentName: 'Brian Mukasa',
      classGrade: 'P.6 Red',
      personName: 'Timothy Mukasa',
      relationship: 'Father',
      nationalIdNumber: 'CM79021928374T',
      phoneNumber: '+256701554433',
      passCodePin: '7741',
      securityPassNumber: 'SEC-PASS-0112',
      status: 'ACTIVE',
      registeredDate: '2026-02-03'
    }
  ];

  private gateLogs: GatePickupLog[] = [
    {
      id: 'LOG-001',
      logNumber: 'GATE-2026-054',
      studentId: 'STU-ECD-001',
      studentName: 'Alice Katusiime',
      classGrade: 'Middle Class',
      direction: 'MORNING_DROPOFF',
      timestamp: '2026-08-23T07:42:00Z',
      personName: 'John Katusiime (Father)',
      verificationMethod: 'SECURITY_PIN',
      gateOfficer: 'Officer Robert Ssewanyana (Main Gate)',
      status: 'VERIFIED',
      remarks: 'Arrived on time in personal vehicle UBF 120X'
    },
    {
      id: 'LOG-002',
      logNumber: 'GATE-2026-053',
      studentId: 'STU-PRI-045',
      studentName: 'David Otim',
      classGrade: 'P.4 Blue',
      direction: 'MORNING_DROPOFF',
      timestamp: '2026-08-23T07:35:00Z',
      personName: 'Sarah Otim (Mother)',
      verificationMethod: 'QR_CODE',
      gateOfficer: 'Officer Robert Ssewanyana (Main Gate)',
      status: 'VERIFIED'
    },
    {
      id: 'LOG-003',
      logNumber: 'GATE-2026-052',
      studentId: 'STU-PRI-112',
      studentName: 'Brian Mukasa',
      classGrade: 'P.6 Red',
      direction: 'EVENING_PICKUP',
      timestamp: '2026-08-22T16:30:00Z',
      personName: 'Timothy Mukasa (Father)',
      verificationMethod: 'SECURITY_PIN',
      gateOfficer: 'Officer Joyce Akello',
      status: 'VERIFIED'
    }
  ];

  private incidentCases: SafeguardingIncidentCase[] = [
    {
      id: 'CASE-001',
      caseNumber: 'SAFE-2026-012',
      studentId: 'STU-PRI-088',
      studentName: 'Joshua Mugabe',
      classGrade: 'P.5 Yellow',
      incidentDate: '2026-08-21',
      category: 'BULLYING',
      severity: 'MEDIUM',
      reportedBy: 'Tr. Samuel Byaruhanga (Duty Master)',
      summary: 'Report of repeated exclusion and verbal teasing during sports break.',
      investigationFindings: 'Interviews conducted with 3 peer witnesses. Identified key instigators and addressed peer group dynamics.',
      actionPlan: 'Restorative circle convened with school counselor. 2 weeks peer buddy assignment and weekly check-in.',
      designatedSafeguardingLead: 'Madam Agnes Namusoke (Dean of Students)',
      parentMeetingHeld: true,
      status: 'ACTION_TAKEN',
      lastUpdated: '2026-08-22'
    },
    {
      id: 'CASE-002',
      caseNumber: 'SAFE-2026-011',
      studentId: 'STU-ECD-004',
      studentName: 'Liam Kato',
      classGrade: 'Baby Class',
      incidentDate: '2026-08-18',
      category: 'ACCIDENTAL_INJURY',
      severity: 'LOW',
      reportedBy: 'Tr. Christine Nabirye (ECD Lead)',
      summary: 'Minor sandpit scuffle over toy, resulting in superficial elbow scratch.',
      investigationFindings: 'Accidental contact during sensory play; playground rules reiterated.',
      actionPlan: 'First aid rendered immediately by clinic nurse; sandpit supervisory ratio increased to 1:6.',
      designatedSafeguardingLead: 'Madam Agnes Namusoke',
      parentMeetingHeld: false,
      status: 'CLOSED',
      lastUpdated: '2026-08-19'
    }
  ];

  private conductPoints: ConductPointRecord[] = [
    {
      id: 'CP-001',
      studentId: 'STU-PRI-112',
      studentName: 'Brian Mukasa',
      classGrade: 'P.6 Red',
      date: '2026-08-22',
      pointType: 'MERIT',
      points: 5,
      category: 'PEER_SUPPORT',
      reason: 'Helped injured junior student to sickbay during lunch break.',
      awardedBy: 'Tr. Samuel Byaruhanga'
    },
    {
      id: 'CP-002',
      studentId: 'STU-PRI-045',
      studentName: 'David Otim',
      classGrade: 'P.4 Blue',
      date: '2026-08-21',
      pointType: 'MERIT',
      points: 3,
      category: 'ACADEMIC_DILIGENCE',
      reason: 'Excellent science project presentation on solar energy.',
      awardedBy: 'Madam Evelyn Nakawunde'
    },
    {
      id: 'CP-003',
      studentId: 'STU-PRI-088',
      studentName: 'Joshua Mugabe',
      classGrade: 'P.5 Yellow',
      date: '2026-08-20',
      pointType: 'DEMERIT',
      points: 2,
      category: 'UNIFORM_SMARTNESS',
      reason: 'Inappropriate footwear and missing necktie on formal school day.',
      awardedBy: 'Prefect Martin Lubega'
    }
  ];

  private constructor() {}

  public static getInstance(): SafeguardingService {
    if (!SafeguardingService.instance) {
      SafeguardingService.instance = new SafeguardingService();
    }
    return SafeguardingService.instance;
  }

  // Pickups
  public getAuthorizedPickups(): AuthorizedPickupPerson[] {
    return [...this.authorizedPickups];
  }

  public registerPickupPerson(data: Omit<AuthorizedPickupPerson, 'id' | 'registeredDate' | 'securityPassNumber'>): AuthorizedPickupPerson {
    const num = String(this.authorizedPickups.length + 14).padStart(4, '0');
    const newPerson: AuthorizedPickupPerson = {
      id: `PKP-${Date.now()}`,
      securityPassNumber: `SEC-PASS-${num}`,
      registeredDate: new Date().toISOString().split('T')[0],
      ...data
    };
    this.authorizedPickups.unshift(newPerson);
    return newPerson;
  }

  public updatePickupStatus(id: string, status: 'ACTIVE' | 'REVOKED' | 'TEMPORARY'): AuthorizedPickupPerson {
    const item = this.authorizedPickups.find(p => p.id === id);
    if (!item) throw new Error('Pickup record not found');
    item.status = status;
    return item;
  }

  // Gate Logs
  public getGateLogs(): GatePickupLog[] {
    return [...this.gateLogs];
  }

  public recordGateEntry(data: Omit<GatePickupLog, 'id' | 'logNumber' | 'timestamp'>): GatePickupLog {
    const num = String(this.gateLogs.length + 55).padStart(3, '0');
    const newLog: GatePickupLog = {
      id: `LOG-${Date.now()}`,
      logNumber: `GATE-${new Date().getFullYear()}-${num}`,
      timestamp: new Date().toISOString(),
      ...data
    };
    this.gateLogs.unshift(newLog);
    return newLog;
  }

  // Incidents
  public getIncidentCases(): SafeguardingIncidentCase[] {
    return [...this.incidentCases];
  }

  public recordIncidentCase(data: Omit<SafeguardingIncidentCase, 'id' | 'caseNumber' | 'lastUpdated'>): SafeguardingIncidentCase {
    const num = String(this.incidentCases.length + 13).padStart(3, '0');
    const newCase: SafeguardingIncidentCase = {
      id: `CASE-${Date.now()}`,
      caseNumber: `SAFE-${new Date().getFullYear()}-${num}`,
      lastUpdated: new Date().toISOString().split('T')[0],
      ...data
    };
    this.incidentCases.unshift(newCase);
    return newCase;
  }

  public updateCaseStatus(id: string, status: 'OPEN' | 'UNDER_INVESTIGATION' | 'ACTION_TAKEN' | 'CLOSED', findings?: string, plan?: string): SafeguardingIncidentCase {
    const item = this.incidentCases.find(c => c.id === id);
    if (!item) throw new Error('Case not found');
    item.status = status;
    if (findings) item.investigationFindings = findings;
    if (plan) item.actionPlan = plan;
    item.lastUpdated = new Date().toISOString().split('T')[0];
    return item;
  }

  // Conduct
  public getConductLogs(): ConductPointRecord[] {
    return [...this.conductPoints];
  }

  public recordConduct(data: Omit<ConductPointRecord, 'id' | 'date'>): ConductPointRecord {
    const newRecord: ConductPointRecord = {
      id: `CP-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...data
    };
    this.conductPoints.unshift(newRecord);
    return newRecord;
  }

  public getSafeguardingStats() {
    const activePickups = this.authorizedPickups.filter(p => p.status === 'ACTIVE').length;
    const openCases = this.incidentCases.filter(c => c.status === 'OPEN' || c.status === 'UNDER_INVESTIGATION').length;
    const totalGateToday = this.gateLogs.length;
    const totalMerits = this.conductPoints.filter(c => c.pointType === 'MERIT').reduce((acc, c) => acc + c.points, 0);
    const totalDemerits = this.conductPoints.filter(c => c.pointType === 'DEMERIT').reduce((acc, c) => acc + c.points, 0);

    return {
      activePickups,
      openCases,
      totalGateToday,
      totalMerits,
      totalDemerits,
      totalCases: this.incidentCases.length
    };
  }
}

export const safeguardingService = SafeguardingService.getInstance();
