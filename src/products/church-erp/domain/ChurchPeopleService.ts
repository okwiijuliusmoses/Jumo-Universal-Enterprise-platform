export type ChurchMemberClassification = 
  | 'MEMBER' 
  | 'CLERGY' 
  | 'LAY_READER' 
  | 'STAFF' 
  | 'RETIRED_CLERGY' 
  | 'RETIRED_STAFF';

export type ClergyTitle = 
  | 'The Most Rev. (Archbishop)' 
  | 'The Rt. Rev. (Bishop)' 
  | 'The Very Rev. (Dean)' 
  | 'The Ven. (Archdeacon)' 
  | 'The Rev. Canon' 
  | 'The Rev.' 
  | 'Rev. Deacon' 
  | 'Pastor';

export type LayReaderTitle = 
  | 'Senior Commissioned Lay Reader' 
  | 'Diocesan Licensed Lay Reader' 
  | 'Parish Lay Reader' 
  | 'Probationary Reader';

export type StaffTitle = 
  | 'Diocesan Secretary' 
  | 'Diocesan Treasurer' 
  | 'Parish Administrator' 
  | 'Director of Music' 
  | 'Verger / Sacristan' 
  | 'Administrative Officer' 
  | 'Support Staff';

export type ChurchRbacRole = 
  | 'ROLE_CHURCH_ADMIN' 
  | 'ROLE_DIOCESAN_BISHOP' 
  | 'ROLE_PARISH_VICAR' 
  | 'ROLE_CURATE' 
  | 'ROLE_LAY_READER' 
  | 'ROLE_TREASURER' 
  | 'ROLE_MEMBER';

export type TitheCategory = 
  | 'TITHE' 
  | 'OFFERTORY' 
  | 'THANKSGIVING' 
  | 'BUILDING_PLEDGE' 
  | 'CLERGY_WELFARE' 
  | 'MISSION_EVANGELISM' 
  | 'EASTER_CHRISTMAS_APPEAL';

export interface ChurchSacramentRecord {
  baptized: boolean;
  baptismDate?: string;
  baptismParish?: string;
  baptismOfficiant?: string;
  baptismMinister?: string;
  baptismCertificateNo?: string;
  godparents?: string[];
  
  confirmed: boolean;
  confirmationDate?: string;
  confirmationBishop?: string;
  confirmationParish?: string;
  confirmationCertificateNo?: string;
  
  communicant?: boolean;
  
  married: boolean;
  marriageDate?: string;
  spouseName?: string;
  marriageParish?: string;
  marriageCertificateNo?: string;
  marriageOfficiant?: string;
}

export interface ChurchMemberRecord {
  id: string;
  memberNumber: string;
  title: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  ninOrNationalId?: string;
  passportNumber?: string;
  maritalStatus: 'Single' | 'Married' | 'Widowed' | 'Divorced';
  numberOfDependents: number;
  
  // Contact
  phone: string;
  alternativePhone?: string;
  email?: string;
  physicalAddress: string;
  address?: string;
  villageCell?: string;
  parishSubCounty?: string;
  district?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  
  // Demographic Dimensions (Expanded)
  household?: string;
  location?: string;
  ageBand?: '0-12' | '13-17' | '18-25' | '26-35' | '36-45' | '46-60' | '60+';

  // Education Dimensions
  educationLevel?: 'None' | 'Primary' | 'Secondary' | 'Certificate' | 'Diploma' | 'Degree' | 'Masters' | 'PhD';
  professionalEducation?: string;
  training?: string;

  // Economic/Professional Dimensions
  profession?: string;
  occupation?: string;
  employmentStatus?: 'Employed' | 'Self-Employed' | 'Unemployed' | 'Student' | 'Retired';
  professionalCategory?: string;
  skills?: string[];

  // Ecclesiastical & Classification
  classification: ChurchMemberClassification;
  parish: string;
  parishOfResidence?: string;
  diocese: string;
  archdeaconry?: string;
  congregation?: string;
  fellowshipOrBrigade?: string;
  ministry?: string;
  department?: string;
  group?: string;
  serviceInvolvement?: string[];
  enrollmentDate: string;
  photoUrl?: string;
  status: 'ACTIVE' | 'ON_LEAVE' | 'RETIRED' | 'TRANSFERRED' | 'DECEASED';
  
  // Sacraments
  sacraments: ChurchSacramentRecord;
  
  // Role specific details
  clergyDetails?: {
    title: ClergyTitle;
    ordinationDeaconDate?: string;
    ordinationPriestDate?: string;
    consecrationBishopDate?: string;
    currentStation: string;
    theologicalInstitution?: string;
    stipendScale?: string;
    retirementDate?: string;
    pensionNumber?: string;
  };
  clergy?: Record<string, any>;
  
  layReaderDetails?: {
    title: LayReaderTitle;
    commissionDate?: string;
    licensingDiocese?: string;
    assignedParishOrChapel: string;
    licenseExpiryDate?: string;
  };
  layReader?: Record<string, any>;
  
  staffDetails?: {
    title: StaffTitle;
    department: string;
    jobTitle: string;
    contractType: 'FULL_TIME' | 'PART_TIME' | 'VOLUNTARY' | 'CONTRACT';
    appointmentDate: string;
    nssfNumber?: string;
    emergencyContact?: string;
  };
  staff?: Record<string, any>;

  retired?: Record<string, any>;
}

export type ChurchMember = ChurchMemberRecord;

export interface ClergyRecord {
  id: string;
  memberId: string;
  title: string;
  role: string;
  ordinationDate?: string;
  currentAssignment: string;
  status: 'ACTIVE' | 'RETIRED' | 'ON_LEAVE' | 'SUSPENDED';
  member?: ChurchMemberRecord;
}

export interface TitheRecord {
  id: string;
  receiptNumber: string;
  memberId: string;
  memberName: string;
  memberNumber: string;
  memberClassification?: string;
  parish: string;
  amount: number;
  currency: string;
  date: string;
  category: TitheCategory;
  paymentMethod: 'CASH' | 'MOBILE_MONEY' | 'BANK_TRANSFER' | 'CHEQUE' | 'CARD';
  method?: string;
  referenceNumber?: string;
  receivedBy: string;
  recordedBy?: string;
  allocatedProjects?: string;
  status?: 'CLEARED' | 'PENDING' | 'RECONCILED' | 'POSTED_TO_FAAP' | string;
  notes?: string;
  memo?: string;
}

export interface ParishEventRecord {
  id: string;
  eventCode: string;
  title: string;
  theme?: string;
  category: 'LITURGICAL' | 'SYNOD' | 'CONFERENCE' | 'REVIVAL_MISSION' | 'YOUTH_CAMP' | 'MOTHERS_UNION' | 'MEN_FELLOWSHIP' | 'CHOIR_FESTIVAL';
  date: string;
  startDate?: string;
  endDate?: string;
  time: string;
  venue: string;
  parish: string;
  diocese: string;
  targetAudience?: string;
  capacity: number;
  registeredCount: number;
  feeAmount: number;
  requiresClergyVestments?: boolean;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  description: string;
}

export interface ParishEventRegistration {
  id: string;
  passNumber: string;
  ticketRef?: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  venue: string;
  memberId: string;
  memberName: string;
  memberNumber: string;
  classification: ChurchMemberClassification;
  memberClassification?: string;
  parish: string;
  registrationDate: string;
  specialNeeds?: string;
  attendanceStatus?: 'REGISTERED' | 'ATTENDED' | 'ABSENT' | 'CHECKED_IN' | string;
  checkedIn: boolean;
  checkInTime?: string;
}

export interface ChurchUserSession {
  role: ChurchRbacRole;
  parish: string;
  userName: string;
}

class ChurchPeopleService {
  private static instance: ChurchPeopleService;
  
  private currentSession: ChurchUserSession = {
    role: 'ROLE_CHURCH_ADMIN',
    parish: "St. Paul's Cathedral Namirembe",
    userName: 'Diocesan Administrator'
  };

  private members: ChurchMemberRecord[] = [];
  private tithes: TitheRecord[] = [];
  private events: ParishEventRecord[] = [];
  private registrations: ParishEventRegistration[] = [];

  private constructor() {
    this.seedCanonicalData();
  }

  public static getInstance(): ChurchPeopleService {
    if (!ChurchPeopleService.instance) {
      ChurchPeopleService.instance = new ChurchPeopleService();
    }
    return ChurchPeopleService.instance;
  }

  public getCurrentSession(): ChurchUserSession {
    return this.currentSession;
  }

  public setCurrentSession(session: ChurchUserSession) {
    this.currentSession = session;
  }

  private seedCanonicalData() {
    this.members = [
      {
        id: 'MEM-001',
        memberNumber: 'NAM-2024-0012',
        title: 'The Rt. Rev.',
        firstName: 'Stephen',
        middleName: 'Samuel',
        lastName: 'Kaziimba',
        gender: 'Male',
        dateOfBirth: '1962-08-15',
        ninOrNationalId: 'CM6208151029ABC',
        passportNumber: 'U1829302',
        maritalStatus: 'Married',
        numberOfDependents: 4,
        phone: '+256 772 100 200',
        alternativePhone: '+256 701 100 200',
        email: 'bishop.stephen@namirembediocese.org',
        physicalAddress: 'Cathedral Hill, Namirembe',
        villageCell: 'Cathedral Zone',
        parishSubCounty: 'Rubaga Division',
        district: 'Kampala',
        emergencyContactName: 'Margaret Kaziimba',
        emergencyContactPhone: '+256 772 100 201',
        emergencyContactRelation: 'Spouse',
        classification: 'CLERGY',
        parish: "St. Paul's Cathedral Namirembe",
        parishOfResidence: "St. Paul's Cathedral Namirembe",
        diocese: 'Namirembe Diocese',
        archdeaconry: 'Namirembe Archdeaconry',
        fellowshipOrBrigade: "Father's Union",
        enrollmentDate: '1988-06-12',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&fit=crop&q=80',
        status: 'ACTIVE',
        sacraments: {
          baptized: true,
          baptismDate: '1962-11-04',
          baptismParish: "St. Peter's Church, Mukono",
          baptismOfficiant: 'Rev. Y. Senfuma',
          baptismMinister: 'Rev. Y. Senfuma',
          baptismCertificateNo: 'BAP-1962-0045',
          godparents: ['Dr. E. Mukasa', 'Mrs. J. Nakafeero'],
          confirmed: true,
          confirmationDate: '1975-09-20',
          confirmationBishop: 'Rt. Rev. D. Senkungu',
          confirmationParish: "St. Philip's Chapel",
          confirmationCertificateNo: 'CONF-1975-0812',
          communicant: true,
          married: true,
          marriageDate: '1987-12-19',
          spouseName: 'Margaret Kaziimba',
          marriageParish: "St. Paul's Cathedral Namirembe",
          marriageCertificateNo: 'MAR-1987-0391',
          marriageOfficiant: 'Bishop Dunstan Nsubuga'
        },
        clergyDetails: {
          title: 'The Rt. Rev. (Bishop)',
          ordinationDeaconDate: '1988-12-18',
          ordinationPriestDate: '1990-12-16',
          consecrationBishopDate: '2008-10-26',
          currentStation: 'Diocesan Headquarters / Cathedral',
          theologicalInstitution: 'Uganda Christian University (Bishop Tucker)',
          stipendScale: 'SCALE-BISHOP-01'
        },
        clergy: {
          title: 'The Rt. Rev. (Bishop)',
          currentStation: 'Diocesan Headquarters / Cathedral',
          ordinationDate: '1990-12-16',
          theologicalCollege: 'Uganda Christian University',
          role: 'Diocesan Bishop'
        }
      },
      {
        id: 'MEM-002',
        memberNumber: 'NAM-2024-0045',
        title: 'The Ven.',
        firstName: 'Moses',
        middleName: 'Gideon',
        lastName: 'Banja',
        gender: 'Male',
        dateOfBirth: '1971-03-24',
        ninOrNationalId: 'CM7103241098XYZ',
        passportNumber: 'U2938401',
        maritalStatus: 'Married',
        numberOfDependents: 3,
        phone: '+256 774 330 440',
        email: 'ven.banja@namirembediocese.org',
        physicalAddress: 'Entebbe Road, Namasuba',
        villageCell: 'Namasuba Central',
        parishSubCounty: 'Makindye Ssabagabo',
        district: 'Wakiso',
        emergencyContactName: 'Rev. Prof. Florence Banja',
        emergencyContactPhone: '+256 774 330 441',
        emergencyContactRelation: 'Spouse',
        classification: 'CLERGY',
        parish: "St. Mark's Parish Namasuba",
        parishOfResidence: "St. Mark's Parish Namasuba",
        diocese: 'Namirembe Diocese',
        archdeaconry: 'Entebbe Archdeaconry',
        fellowshipOrBrigade: 'Clergy Fellowship',
        enrollmentDate: '1996-01-10',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&q=80',
        status: 'ACTIVE',
        sacraments: {
          baptized: true,
          baptismDate: '1971-06-12',
          baptismParish: "St. John's Church Entebbe",
          baptismCertificateNo: 'BAP-1971-0129',
          confirmed: true,
          confirmationDate: '1984-10-15',
          confirmationBishop: 'Rt. Rev. Misaeri Kauma',
          confirmationCertificateNo: 'CONF-1984-0419',
          communicant: true,
          married: true,
          marriageDate: '1998-08-22',
          spouseName: 'Florence Banja',
          marriageParish: "St. Paul's Cathedral",
          marriageCertificateNo: 'MAR-1998-0112'
        },
        clergyDetails: {
          title: 'The Ven. (Archdeacon)',
          ordinationDeaconDate: '1996-12-15',
          ordinationPriestDate: '1998-12-13',
          currentStation: 'Entebbe Archdeaconry HQ',
          theologicalInstitution: 'Uganda Christian University',
          stipendScale: 'SCALE-ARCHDEACON-02'
        },
        clergy: {
          title: 'The Ven. (Archdeacon)',
          currentStation: 'Entebbe Archdeaconry HQ',
          ordinationDate: '1998-12-13',
          theologicalCollege: 'Uganda Christian University',
          role: 'Archdeacon'
        }
      },
      {
        id: 'MEM-003',
        memberNumber: 'NAM-2024-0089',
        title: 'The Rev. Canon',
        firstName: 'Enoch',
        lastName: 'Musoke',
        gender: 'Male',
        dateOfBirth: '1952-11-10',
        maritalStatus: 'Married',
        numberOfDependents: 2,
        phone: '+256 772 444 888',
        email: 'canon.musoke@gmail.com',
        physicalAddress: 'Kasubi Heritage Lane',
        district: 'Kampala',
        classification: 'RETIRED_CLERGY',
        parish: "St. Paul's Cathedral Namirembe",
        parishOfResidence: "St. Paul's Cathedral Namirembe",
        diocese: 'Namirembe Diocese',
        archdeaconry: 'Namirembe Archdeaconry',
        enrollmentDate: '1979-05-20',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&fit=crop&q=80',
        status: 'RETIRED',
        sacraments: {
          baptized: true,
          confirmed: true,
          communicant: true,
          married: true,
          marriageDate: '1980-04-12',
          spouseName: 'Joy Musoke'
        },
        clergyDetails: {
          title: 'The Rev. Canon',
          currentStation: 'Retired / Senior Advisor',
          ordinationPriestDate: '1980-12-14',
          retirementDate: '2022-11-10',
          pensionNumber: 'PENS-CLG-0812'
        },
        retired: {
          retirementDate: '2022-11-10',
          pensionNumber: 'PENS-CLG-0812',
          pensionStatus: 'ACTIVE_DISBURSEMENT'
        }
      },
      {
        id: 'MEM-004',
        memberNumber: 'NAM-2024-0150',
        title: 'Mr.',
        firstName: 'Edward',
        middleName: 'Kasirye',
        lastName: 'Semakula',
        gender: 'Male',
        dateOfBirth: '1982-04-18',
        maritalStatus: 'Married',
        numberOfDependents: 3,
        phone: '+256 782 555 999',
        email: 'edward.semakula@gmail.com',
        physicalAddress: 'Mengo Bakuli',
        district: 'Kampala',
        classification: 'LAY_READER',
        parish: "St. Paul's Cathedral Namirembe",
        parishOfResidence: "St. Paul's Cathedral Namirembe",
        diocese: 'Namirembe Diocese',
        archdeaconry: 'Namirembe Archdeaconry',
        fellowshipOrBrigade: 'Youth Leader / Reader Guild',
        enrollmentDate: '2005-02-14',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&fit=crop&q=80',
        status: 'ACTIVE',
        sacraments: {
          baptized: true,
          confirmed: true,
          communicant: true,
          married: true,
          marriageDate: '2012-07-28',
          spouseName: 'Dr. Rebecca Semakula'
        },
        layReaderDetails: {
          title: 'Diocesan Licensed Lay Reader',
          commissionDate: '2015-06-21',
          licensingDiocese: 'Namirembe Diocese',
          assignedParishOrChapel: "St. Paul's Cathedral - English Service",
          licenseExpiryDate: '2027-12-31'
        },
        layReader: {
          title: 'Diocesan Licensed Lay Reader',
          assignedParishOrChapel: "St. Paul's Cathedral - English Service",
          licenseExpiryDate: '2027-12-31'
        }
      },
      {
        id: 'MEM-005',
        memberNumber: 'NAM-2024-0201',
        title: 'Mrs.',
        firstName: 'Grace',
        middleName: 'Namusisi',
        lastName: 'Lubwama',
        gender: 'Female',
        dateOfBirth: '1985-09-30',
        maritalStatus: 'Married',
        numberOfDependents: 2,
        phone: '+256 701 445 678',
        email: 'grace.lubwama@namirembe.org',
        physicalAddress: 'Namirembe Road, Block 4',
        district: 'Kampala',
        classification: 'STAFF',
        parish: "St. Paul's Cathedral Namirembe",
        parishOfResidence: "St. Paul's Cathedral Namirembe",
        diocese: 'Namirembe Diocese',
        enrollmentDate: '2016-03-01',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&fit=crop&q=80',
        status: 'ACTIVE',
        sacraments: {
          baptized: true,
          confirmed: true,
          communicant: true,
          married: true
        },
        staffDetails: {
          title: 'Parish Administrator',
          department: 'Parish Administration & Registry',
          jobTitle: 'Senior Parish Administrator',
          contractType: 'FULL_TIME',
          appointmentDate: '2018-01-05',
          nssfNumber: 'NSF-89102-UG'
        },
        staff: {
          jobTitle: 'Senior Parish Administrator',
          department: 'Parish Administration & Registry',
          contractType: 'FULL_TIME'
        }
      },
      {
        id: 'MEM-006',
        memberNumber: 'NAM-2024-0311',
        title: 'Dr.',
        firstName: 'Timothy',
        lastName: 'Mukasa',
        gender: 'Male',
        dateOfBirth: '1995-12-05',
        maritalStatus: 'Single',
        numberOfDependents: 0,
        phone: '+256 779 112 233',
        email: 'timothy.mukasa@med.mak.ac.ug',
        physicalAddress: 'Mulago Doctors Village',
        district: 'Kampala',
        classification: 'MEMBER',
        parish: "St. Luke's Chapel Mulago",
        parishOfResidence: "St. Luke's Chapel Mulago",
        diocese: 'Namirembe Diocese',
        fellowshipOrBrigade: 'Medical Fellowship / Choir',
        enrollmentDate: '2019-08-10',
        photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&fit=crop&q=80',
        status: 'ACTIVE',
        sacraments: {
          baptized: true,
          confirmed: true,
          communicant: true,
          married: false
        }
      }
    ];

    this.tithes = [
      {
        id: 'TTH-001',
        receiptNumber: 'TITHE-2026-0089',
        memberId: 'MEM-001',
        memberName: 'The Rt. Rev. Stephen Samuel Kaziimba',
        memberNumber: 'NAM-2024-0012',
        memberClassification: 'CLERGY',
        parish: "St. Paul's Cathedral Namirembe",
        amount: 850000,
        currency: 'UGX',
        date: '2026-08-01',
        category: 'TITHE',
        paymentMethod: 'BANK_TRANSFER',
        referenceNumber: 'EFT-789123-CENTENARY',
        receivedBy: 'Parish Treasurer',
        status: 'CLEARED',
        notes: 'August Monthly 10% Tithe Remittance',
        memo: 'August Monthly 10% Tithe Remittance'
      },
      {
        id: 'TTH-002',
        receiptNumber: 'TITHE-2026-0090',
        memberId: 'MEM-004',
        memberName: 'Mr. Edward Kasirye Semakula',
        memberNumber: 'NAM-2024-0150',
        memberClassification: 'LAY_READER',
        parish: "St. Paul's Cathedral Namirembe",
        amount: 350000,
        currency: 'UGX',
        date: '2026-08-03',
        category: 'BUILDING_PLEDGE',
        paymentMethod: 'MOBILE_MONEY',
        referenceNumber: 'MM-99201928-MTN',
        receivedBy: 'Grace Lubwama',
        status: 'CLEARED',
        notes: 'Cathedral Roof Renovation Phase 3 Pledge',
        memo: 'Cathedral Roof Renovation Phase 3 Pledge'
      },
      {
        id: 'TTH-003',
        receiptNumber: 'TITHE-2026-0091',
        memberId: 'MEM-006',
        memberName: 'Dr. Timothy Mukasa',
        memberNumber: 'NAM-2024-0311',
        memberClassification: 'MEMBER',
        parish: "St. Luke's Chapel Mulago",
        amount: 250000,
        currency: 'UGX',
        date: '2026-08-05',
        category: 'MISSION_EVANGELISM',
        paymentMethod: 'CASH',
        receivedBy: 'Rev. Isaac Kateregga',
        status: 'CLEARED',
        notes: 'Northern Uganda Medical Mission Outreach Contribution',
        memo: 'Northern Uganda Medical Mission Outreach Contribution'
      }
    ];

    this.events = [
      {
        id: 'EVT-001',
        eventCode: 'SYNOD-2026-NAM',
        title: '64th Namirembe Diocesan Synod Convention',
        theme: 'Anchored in Christ: Renewing Our Mission and Stewardship',
        targetAudience: 'Clergy, Lay Readers, and Elected Parish Synod Delegates',
        category: 'SYNOD',
        date: '2026-09-15',
        startDate: '2026-09-15',
        endDate: '2026-09-18',
        time: '08:30 AM',
        venue: 'Namirembe Synod Hall & Cathedral grounds',
        parish: "St. Paul's Cathedral Namirembe",
        diocese: 'Namirembe Diocese',
        capacity: 450,
        registeredCount: 38,
        feeAmount: 150000,
        requiresClergyVestments: true,
        status: 'UPCOMING',
        description: 'Annual authoritative governance assembly of all diocesan clergy, lay readers, and elected parish delegates.'
      },
      {
        id: 'EVT-002',
        eventCode: 'ORD-2026-DEC',
        title: 'Solemn Ordination & Consecration of Deacons and Priests',
        theme: 'Equipping the Saints for Ministry in the 21st Century',
        targetAudience: 'All Faithful & Diocesan Clergy',
        category: 'LITURGICAL',
        date: '2026-12-13',
        startDate: '2026-12-13',
        time: '09:00 AM',
        venue: "St. Paul's Cathedral Namirembe",
        parish: "St. Paul's Cathedral Namirembe",
        diocese: 'Namirembe Diocese',
        capacity: 2500,
        registeredCount: 110,
        feeAmount: 0,
        requiresClergyVestments: true,
        status: 'UPCOMING',
        description: 'Advent ordinations of theological candidates into Holy Orders.'
      },
      {
        id: 'EVT-003',
        eventCode: 'REVIVAL-2026-AUG',
        title: 'Diocesan Tukutendereza Revival & Mission Conference',
        theme: 'Walking in the Light (1 John 1:7)',
        targetAudience: 'All Parishes, Youth, and Evangelism Teams',
        category: 'REVIVAL_MISSION',
        date: '2026-08-28',
        startDate: '2026-08-28',
        endDate: '2026-08-30',
        time: '04:00 PM',
        venue: 'Budo Junior School Grounds',
        parish: "St. John's Parish Budo",
        diocese: 'Namirembe Diocese',
        capacity: 1200,
        registeredCount: 420,
        feeAmount: 20000,
        status: 'UPCOMING',
        description: 'Balokole East African Revival 3-day spiritual fellowship, prayer, and youth crusade.'
      }
    ];

    this.registrations = [
      {
        id: 'REG-001',
        passNumber: 'SYNOD-PASS-001',
        ticketRef: 'SYNOD-PASS-001',
        eventId: 'EVT-001',
        eventTitle: '64th Namirembe Diocesan Synod Convention',
        eventDate: '2026-09-15',
        venue: 'Namirembe Synod Hall',
        memberId: 'MEM-001',
        memberName: 'The Rt. Rev. Stephen Samuel Kaziimba',
        memberNumber: 'NAM-2024-0012',
        classification: 'CLERGY',
        memberClassification: 'CLERGY',
        parish: "St. Paul's Cathedral Namirembe",
        registrationDate: '2026-08-01',
        attendanceStatus: 'REGISTERED',
        checkedIn: false
      },
      {
        id: 'REG-002',
        passNumber: 'SYNOD-PASS-002',
        ticketRef: 'SYNOD-PASS-002',
        eventId: 'EVT-001',
        eventTitle: '64th Namirembe Diocesan Synod Convention',
        eventDate: '2026-09-15',
        venue: 'Namirembe Synod Hall',
        memberId: 'MEM-004',
        memberName: 'Mr. Edward Kasirye Semakula',
        memberNumber: 'NAM-2024-0150',
        classification: 'LAY_READER',
        memberClassification: 'LAY_READER',
        parish: "St. Paul's Cathedral Namirembe",
        registrationDate: '2026-08-03',
        attendanceStatus: 'REGISTERED',
        checkedIn: false
      }
    ];
  }

  // Members API
  public getMembers(): ChurchMemberRecord[] {
    return this.members;
  }

  public getMemberById(id: string): ChurchMemberRecord | undefined {
    return this.members.find(m => m.id === id || m.memberNumber === id);
  }

  public addMember(record: Partial<ChurchMemberRecord>): ChurchMemberRecord {
    const id = `MEM-${String(this.members.length + 1).padStart(3, '0')}`;
    const memberNumber = `NAM-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`;
    
    const newMember: ChurchMemberRecord = {
      id,
      memberNumber,
      title: record.title || 'Mr.',
      firstName: record.firstName || '',
      middleName: record.middleName,
      lastName: record.lastName || '',
      gender: record.gender || 'Male',
      dateOfBirth: record.dateOfBirth || '1990-01-01',
      ninOrNationalId: record.ninOrNationalId,
      passportNumber: record.passportNumber,
      maritalStatus: record.maritalStatus || 'Single',
      numberOfDependents: record.numberOfDependents || 0,
      phone: record.phone || '',
      alternativePhone: record.alternativePhone,
      email: record.email,
      physicalAddress: record.physicalAddress || '',
      villageCell: record.villageCell,
      parishSubCounty: record.parishSubCounty,
      district: record.district || 'Kampala',
      emergencyContactName: record.emergencyContactName,
      emergencyContactPhone: record.emergencyContactPhone,
      emergencyContactRelation: record.emergencyContactRelation,
      classification: record.classification || 'MEMBER',
      parish: record.parish || "St. Paul's Cathedral Namirembe",
      parishOfResidence: record.parishOfResidence || record.parish || "St. Paul's Cathedral Namirembe",
      diocese: record.diocese || 'Namirembe Diocese',
      archdeaconry: record.archdeaconry || 'Namirembe Archdeaconry',
      fellowshipOrBrigade: record.fellowshipOrBrigade,
      enrollmentDate: record.enrollmentDate || new Date().toISOString().split('T')[0],
      photoUrl: record.photoUrl || '',
      status: record.status || 'ACTIVE',
      sacraments: record.sacraments || { baptized: false, confirmed: false, married: false },
      clergyDetails: record.clergyDetails,
      clergy: record.clergy,
      layReaderDetails: record.layReaderDetails,
      layReader: record.layReader,
      staffDetails: record.staffDetails,
      staff: record.staff,
      retired: record.retired
    };

    this.members.unshift(newMember);
    return newMember;
  }

  public updateMember(id: string, updates: Partial<ChurchMemberRecord>): ChurchMemberRecord | undefined {
    const index = this.members.findIndex(m => m.id === id);
    if (index === -1) return undefined;
    this.members[index] = { ...this.members[index], ...updates };
    return this.members[index];
  }

  public deleteMember(id: string): boolean {
    const initialLen = this.members.length;
    this.members = this.members.filter(m => m.id !== id);
    return this.members.length < initialLen;
  }

  // Filtered queries
  public getClergy(): (ClergyRecord & { member: ChurchMemberRecord })[] {
    return this.members
      .filter(m => m.classification === 'CLERGY' || m.classification === 'RETIRED_CLERGY')
      .map(m => ({
        id: `CLG-${m.id}`,
        memberId: m.id,
        title: m.clergyDetails?.title || m.clergy?.title || m.title,
        role: m.clergyDetails?.currentStation || m.clergy?.role || 'Clergy',
        ordinationDate: m.clergyDetails?.ordinationPriestDate || m.clergy?.ordinationDate,
        currentAssignment: m.clergyDetails?.currentStation || m.parish,
        status: m.status === 'RETIRED' ? 'RETIRED' : 'ACTIVE',
        member: m
      }));
  }

  public addClergy(record: Omit<ClergyRecord, 'id'>): ClergyRecord {
    const member = this.getMemberById(record.memberId);
    if (member) {
      member.classification = 'CLERGY';
      member.clergyDetails = {
        title: (record.title as ClergyTitle) || 'The Rev.',
        currentStation: record.currentAssignment,
        ordinationPriestDate: record.ordinationDate
      };
      member.clergy = {
        title: record.title,
        currentStation: record.currentAssignment,
        ordinationDate: record.ordinationDate
      };
    }
    return {
      id: `CLG-${Date.now()}`,
      ...record
    };
  }

  public getLayReaders(): ChurchMemberRecord[] {
    return this.members.filter(m => m.classification === 'LAY_READER');
  }

  public getStaff(): ChurchMemberRecord[] {
    return this.members.filter(m => m.classification === 'STAFF');
  }

  public getRetiredPersonnel(): ChurchMemberRecord[] {
    return this.members.filter(m => m.classification === 'RETIRED_CLERGY' || m.classification === 'RETIRED_STAFF' || m.status === 'RETIRED');
  }

  // Tithes & Ledger
  public getTithes(memberId?: string): TitheRecord[] {
    if (memberId) return this.tithes.filter(t => t.memberId === memberId);
    return this.tithes;
  }

  public getTithesForMember(memberId: string): TitheRecord[] {
    return this.tithes.filter(t => t.memberId === memberId);
  }

  public addTithe(data: Partial<TitheRecord> & { memberId: string; amount: number }): TitheRecord {
    return this.recordTithe(data);
  }

    public recordTithe(data: Partial<TitheRecord> & { memberId: string; amount: number }): TitheRecord {
    const member = this.getMemberById(data.memberId);
    const receiptNumber = `TITHE-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const newTithe: TitheRecord = {
      id: `TTH-${Date.now()}`,
      receiptNumber,
      memberId: data.memberId,
      memberName: data.memberName || (member ? `${member.title} ${member.firstName} ${member.lastName}` : 'Anonymous Member'),
      memberNumber: data.memberNumber || member?.memberNumber || 'NAM-MEM-GEN',
      memberClassification: data.memberClassification || member?.classification || 'MEMBER',
      parish: data.parish || member?.parish || 'St. Paul Cathedral Namirembe',
      amount: data.amount,
      currency: data.currency || 'UGX',
      date: data.date || new Date().toISOString().split('T')[0],
      category: data.category || 'TITHE',
      paymentMethod: data.paymentMethod || 'CASH',
      referenceNumber: data.referenceNumber,
      receivedBy: data.receivedBy || data.recordedBy || 'Parish Treasurer',
      recordedBy: data.recordedBy,
      status: data.status || 'CLEARED',
      notes: data.notes,
      memo: data.memo || data.notes
    };
    this.tithes.unshift(newTithe);
    return newTithe;
  }

  // Events & Registration
  public getEvents(): ParishEventRecord[] {
    return this.events;
  }

  public getEventById(id: string): ParishEventRecord | undefined {
    return this.events.find(e => e.id === id);
  }

  public getRegistrations(eventId?: string, memberId?: string): ParishEventRegistration[] {
    return this.registrations.filter(r => {
      if (eventId && r.eventId !== eventId) return false;
      if (memberId && r.memberId !== memberId) return false;
      return true;
    });
  }

  public getRegistrationsForMember(memberId: string): ParishEventRegistration[] {
    return this.registrations.filter(r => r.memberId === memberId);
  }

    public registerForEvent(
    eventIdOrParams: string | { eventId: string; memberId: string; specialNeeds?: string },
    memberId?: string,
    specialNeeds?: string
  ): ParishEventRegistration {
    let eventId: string;
    let actualMemberId: string;
    let actualSpecialNeeds: string | undefined;

    if (typeof eventIdOrParams === 'object') {
      eventId = eventIdOrParams.eventId;
      actualMemberId = eventIdOrParams.memberId;
      actualSpecialNeeds = eventIdOrParams.specialNeeds;
    } else {
      eventId = eventIdOrParams;
      actualMemberId = memberId || '';
      actualSpecialNeeds = specialNeeds;
    }

    const event = this.getEventById(eventId);
    const member = this.getMemberById(actualMemberId);
    if (!event || !member) throw new Error('Event or Member not found');

    const passNumber = `${event.eventCode.split('-')[0]}-PASS-${String(this.registrations.length + 1).padStart(3, '0')}`;

    const reg: ParishEventRegistration = {
      id: `REG-${Date.now()}`,
      passNumber,
      ticketRef: passNumber,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      venue: event.venue,
      memberId: member.id,
      memberName: `${member.title} ${member.firstName} ${member.lastName}`,
      memberNumber: member.memberNumber,
      classification: member.classification,
      memberClassification: member.classification,
      parish: member.parish,
      registrationDate: new Date().toISOString().split('T')[0],
      specialNeeds: actualSpecialNeeds,
      attendanceStatus: 'REGISTERED',
      checkedIn: false
    };

    this.registrations.unshift(reg);
    event.registeredCount += 1;
    return reg;
  }

  public registerMemberForEvent(
    eventIdOrParams: string | { eventId: string; memberId: string; specialNeeds?: string },
    memberId?: string,
    specialNeeds?: string
  ): ParishEventRegistration {
    return this.registerForEvent(eventIdOrParams, memberId, specialNeeds);
  }

  public toggleCheckIn(regId: string): boolean {
    const reg = this.registrations.find(r => r.id === regId);
    if (!reg) return false;
    reg.checkedIn = !reg.checkedIn;
    reg.attendanceStatus = reg.checkedIn ? 'ATTENDED' : 'REGISTERED';
    reg.checkInTime = reg.checkedIn ? new Date().toLocaleTimeString() : undefined;
    return reg.checkedIn;
  }
}

export default ChurchPeopleService;
