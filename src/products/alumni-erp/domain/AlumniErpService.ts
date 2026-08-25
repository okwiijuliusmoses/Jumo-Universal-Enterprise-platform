import { AlumniMember, AlumniChapter, GivingCampaign, CareerOpportunity, MentorshipPair, AlumniStats } from './types';

export class AlumniErpService {
  private static instance: AlumniErpService;

  private members: AlumniMember[] = [
    {
      id: 'ALM-001',
      alumniNumber: 'JUMO-ALM-2018-0042',
      fullName: 'Dr. Sarah K. Namubiru',
      email: 's.namubiru@healthcorp.org',
      phone: '+256 701 445566',
      institution: 'Sovereign University of Health Sciences',
      faculty: 'Faculty of Medicine',
      degree: 'Bachelor of Medicine & Surgery (MBChB)',
      graduationYear: 2018,
      currentEmployer: 'Mulago National Referral Hospital',
      jobTitle: 'Senior Pediatric Specialist',
      industry: 'Healthcare & Medicine',
      locationCity: 'Kampala',
      locationCountry: 'Uganda',
      chapterId: 'CHP-KAMPALA',
      membershipTier: 'LIFE_PATRON',
      verificationStatus: 'VERIFIED',
      totalDonationsUSD: 8500,
      isMentor: true,
      bio: 'Alumni Association Board Member and advocate for maternal health scholarships.',
      joinedDate: '2018-11-15'
    },
    {
      id: 'ALM-002',
      alumniNumber: 'JUMO-ALM-2015-0118',
      fullName: 'Eng. David Omondi',
      email: 'david.omondi@nairobilabs.io',
      phone: '+254 712 889900',
      institution: 'Sovereign Institute of Technology',
      faculty: 'Faculty of Engineering',
      degree: 'BSc. Electrical & Telecoms Engineering',
      graduationYear: 2015,
      currentEmployer: 'Sovereign Cloud Networks',
      jobTitle: 'VP of Infrastructure Architecture',
      industry: 'Information Technology',
      locationCity: 'Nairobi',
      locationCountry: 'Kenya',
      chapterId: 'CHP-NAIROBI',
      membershipTier: 'GOLD',
      verificationStatus: 'VERIFIED',
      totalDonationsUSD: 14200,
      isMentor: true,
      bio: 'Leading fintech and edge network innovations across Eastern Africa.',
      joinedDate: '2015-12-01'
    },
    {
      id: 'ALM-003',
      alumniNumber: 'JUMO-ALM-2021-0894',
      fullName: 'Amina Al-Mansoor',
      email: 'amina.mansoor@qatarcapital.qa',
      phone: '+974 55 123456',
      institution: 'Sovereign Business School',
      faculty: 'Faculty of Economics & Commerce',
      degree: 'BSc. Quantitative Finance & Risk Management',
      graduationYear: 2021,
      currentEmployer: 'Gulf Sovereign Wealth Fund',
      jobTitle: 'Investment Portfolio Analyst',
      industry: 'Investment Banking',
      locationCity: 'Doha',
      locationCountry: 'Qatar',
      chapterId: 'CHP-MIDDLE-EAST',
      membershipTier: 'SILVER',
      verificationStatus: 'VERIFIED',
      totalDonationsUSD: 3200,
      isMentor: false,
      bio: 'Focusing on emerging market infrastructure funds and ESG investments.',
      joinedDate: '2021-07-20'
    },
    {
      id: 'ALM-004',
      alumniNumber: 'JUMO-ALM-2023-1402',
      fullName: 'Peter Brian Mugabi',
      email: 'peter.mugabi@agriinnovate.ug',
      phone: '+256 782 334411',
      institution: 'Sovereign Agricultural College',
      faculty: 'Faculty of Agriculture & Forestry',
      degree: 'BSc. Agribusiness & Food Supply Chain',
      graduationYear: 2023,
      currentEmployer: 'AgriFresh Supply Chains',
      jobTitle: 'Logistics Operations Lead',
      industry: 'Agriculture & Food Systems',
      locationCity: 'Jinja',
      locationCountry: 'Uganda',
      chapterId: 'CHP-EASTERN-UG',
      membershipTier: 'STANDARD',
      verificationStatus: 'VERIFIED',
      totalDonationsUSD: 450,
      isMentor: false,
      bio: 'Passionate about digital grain aggregation and farm gate market access.',
      joinedDate: '2023-10-12'
    },
    {
      id: 'ALM-005',
      alumniNumber: 'JUMO-ALM-2012-0055',
      fullName: 'Prof. Grace Akello',
      email: 'grace.akello@oxford-fellows.org',
      phone: '+44 20 7946 0912',
      institution: 'Sovereign University Postgraduate School',
      faculty: 'School of Law',
      degree: 'Master of Laws (LLM) in International Arbitration',
      graduationYear: 2012,
      currentEmployer: 'International Court of Arbitration',
      jobTitle: 'Arbitration Counsel & Visiting Fellow',
      industry: 'Legal Services & Dispute Resolution',
      locationCity: 'London',
      locationCountry: 'United Kingdom',
      chapterId: 'CHP-UK-EUROPE',
      membershipTier: 'LIFE_PATRON',
      verificationStatus: 'VERIFIED',
      totalDonationsUSD: 25000,
      isMentor: true,
      bio: 'Senior alumni patron, endowed chair donor for Legal Ethics and Rule of Law.',
      joinedDate: '2012-09-01'
    }
  ];

  private chapters: AlumniChapter[] = [
    {
      id: 'CHP-KAMPALA',
      name: 'Kampala Central & Buganda Chapter',
      region: 'Central Uganda',
      country: 'Uganda',
      leadCoordinator: 'Dr. Sarah K. Namubiru',
      leadEmail: 'kampala.alumni@jumo-ueos.org',
      activeMembersCount: 2450,
      establishedYear: 2010,
      status: 'ACTIVE',
      annualTargetUSD: 50000,
      raisedUSD: 38400
    },
    {
      id: 'CHP-NAIROBI',
      name: 'Nairobi & East Africa Regional Chapter',
      region: 'East Africa',
      country: 'Kenya',
      leadCoordinator: 'Eng. David Omondi',
      leadEmail: 'nairobi.alumni@jumo-ueos.org',
      activeMembersCount: 1820,
      establishedYear: 2014,
      status: 'ACTIVE',
      annualTargetUSD: 40000,
      raisedUSD: 32500
    },
    {
      id: 'CHP-UK-EUROPE',
      name: 'United Kingdom & European Diaspora Chapter',
      region: 'Europe',
      country: 'United Kingdom',
      leadCoordinator: 'Prof. Grace Akello',
      leadEmail: 'uk.alumni@jumo-ueos.org',
      activeMembersCount: 890,
      establishedYear: 2016,
      status: 'ACTIVE',
      annualTargetUSD: 100000,
      raisedUSD: 84200
    },
    {
      id: 'CHP-MIDDLE-EAST',
      name: 'Gulf & Middle East Chapter',
      region: 'Middle East',
      country: 'UAE / Qatar',
      leadCoordinator: 'Amina Al-Mansoor',
      leadEmail: 'gulf.alumni@jumo-ueos.org',
      activeMembersCount: 540,
      establishedYear: 2019,
      status: 'ACTIVE',
      annualTargetUSD: 60000,
      raisedUSD: 49000
    },
    {
      id: 'CHP-NORTH-AMERICA',
      name: 'North American Alumni Chapter (USA & Canada)',
      region: 'North America',
      country: 'United States',
      leadCoordinator: 'Dr. Marcus Vance',
      leadEmail: 'usa.alumni@jumo-ueos.org',
      activeMembersCount: 1120,
      establishedYear: 2012,
      status: 'ACTIVE',
      annualTargetUSD: 150000,
      raisedUSD: 128000
    }
  ];

  private campaigns: GivingCampaign[] = [
    {
      id: 'CMP-001',
      title: 'Centenary STEM & Innovation Endowment Fund',
      description: 'Capital endowment to fund modern research laboratories, AI labs, and high-performance computing clusters.',
      category: 'RESEARCH_ENDOWMENT',
      targetAmountUSD: 500000,
      currentAmountUSD: 342500,
      donorCount: 420,
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      status: 'ACTIVE'
    },
    {
      id: 'CMP-002',
      title: 'Underrepresented Women in Medicine Scholarship Drive',
      description: 'Full tuition and living stipend support for disadvantaged female medical students.',
      category: 'SCHOLARSHIP',
      targetAmountUSD: 150000,
      currentAmountUSD: 118400,
      donorCount: 295,
      startDate: '2026-02-01',
      endDate: '2026-09-30',
      status: 'ACTIVE'
    },
    {
      id: 'CMP-003',
      title: 'Class of 2015 Legacy Amphitheatre Project',
      description: '10-Year alumni class gift to construct a 500-seat outdoor amphitheatre for academic symposiums.',
      category: 'INFRASTRUCTURE',
      targetAmountUSD: 85000,
      currentAmountUSD: 72000,
      donorCount: 145,
      startDate: '2025-06-01',
      endDate: '2026-06-30',
      status: 'ACTIVE',
      targetCohort: 'Class of 2015'
    }
  ];

  private opportunities: CareerOpportunity[] = [
    {
      id: 'JOB-001',
      title: 'Principal Software Reliability Engineer',
      company: 'Sovereign Cloud Networks',
      location: 'Nairobi, Kenya / Remote',
      type: 'FULL_TIME',
      postedByAlumniId: 'ALM-002',
      postedByName: 'Eng. David Omondi',
      postedDate: '2026-08-10',
      deadline: '2026-09-15',
      applicationUrlOrEmail: 'careers@nairobilabs.io',
      description: 'Leading our micro-kernel orchestration cluster and distributed database replication systems.'
    },
    {
      id: 'JOB-002',
      title: 'Clinical Research Fellow (Infectious Diseases)',
      company: 'Mulago Medical Research Institute',
      location: 'Kampala, Uganda',
      type: 'FULL_TIME',
      postedByAlumniId: 'ALM-001',
      postedByName: 'Dr. Sarah K. Namubiru',
      postedDate: '2026-08-12',
      deadline: '2026-09-30',
      applicationUrlOrEmail: 'research-recruit@mulago-med.org',
      description: 'Conducting high-impact vaccine trials and genomic surveillance studies.'
    },
    {
      id: 'JOB-003',
      title: 'Quantitative Risk Analyst',
      company: 'Gulf Sovereign Wealth Fund',
      location: 'Doha, Qatar',
      type: 'FULL_TIME',
      postedByAlumniId: 'ALM-003',
      postedByName: 'Amina Al-Mansoor',
      postedDate: '2026-08-15',
      deadline: '2026-10-01',
      applicationUrlOrEmail: 'talent@qatarcapital.qa',
      description: 'Building machine-learning financial volatility and multi-currency hedge models.'
    }
  ];

  private mentorships: MentorshipPair[] = [
    {
      id: 'MNT-001',
      mentorId: 'ALM-001',
      mentorName: 'Dr. Sarah K. Namubiru',
      menteeId: 'ALM-004',
      menteeName: 'Peter Brian Mugabi',
      industry: 'Healthcare Supply & Nutrition',
      focusArea: 'Clinical Nutrition & Cold Chain Logistics',
      startDate: '2026-03-01',
      status: 'ACTIVE'
    },
    {
      id: 'MNT-002',
      mentorId: 'ALM-005',
      mentorName: 'Prof. Grace Akello',
      menteeId: 'ALM-003',
      menteeName: 'Amina Al-Mansoor',
      industry: 'International Regulatory Law',
      focusArea: 'Sovereign Bond Frameworks & Cross-Border Contracts',
      startDate: '2026-01-15',
      status: 'ACTIVE'
    }
  ];

  public static getInstance(): AlumniErpService {
    if (!AlumniErpService.instance) {
      AlumniErpService.instance = new AlumniErpService();
    }
    return AlumniErpService.instance;
  }

  public getStats(): AlumniStats {
    const totalEndowment = this.campaigns.reduce((acc, c) => acc + c.currentAmountUSD, 0);
    return {
      totalAlumni: this.members.length + 8420,
      verifiedCount: this.members.filter(m => m.verificationStatus === 'VERIFIED').length + 7980,
      activeChapters: this.chapters.filter(c => c.status === 'ACTIVE').length,
      totalEndowmentUSD: totalEndowment + 1250000,
      activeMentors: this.members.filter(m => m.isMentor).length + 310,
      openJobs: this.opportunities.length + 45
    };
  }

  public getMembers(): AlumniMember[] {
    return [...this.members];
  }

  public addMember(member: Omit<AlumniMember, 'id' | 'alumniNumber' | 'joinedDate'>): AlumniMember {
    const id = `ALM-${Date.now()}`;
    const alumniNumber = `JUMO-ALM-${member.graduationYear}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newMember: AlumniMember = {
      ...member,
      id,
      alumniNumber,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    this.members.unshift(newMember);
    return newMember;
  }

  public updateMemberProfile(id: string, updates: { currentEmployer?: string; jobTitle?: string; locationCity?: string; locationCountry?: string }): AlumniMember | null {
    const member = this.members.find(m => m.id === id);
    if (member) {
      if (updates.currentEmployer !== undefined) member.currentEmployer = updates.currentEmployer;
      if (updates.jobTitle !== undefined) member.jobTitle = updates.jobTitle;
      if (updates.locationCity !== undefined) member.locationCity = updates.locationCity;
      if (updates.locationCountry !== undefined) member.locationCountry = updates.locationCountry;
      return { ...member };
    }
    return null;
  }

  public verifyMember(id: string): void {
    const member = this.members.find(m => m.id === id);
    if (member) {
      member.verificationStatus = 'VERIFIED';
    }
  }

  public getChapters(): AlumniChapter[] {
    return [...this.chapters];
  }

  public getCampaigns(): GivingCampaign[] {
    return [...this.campaigns];
  }

  public getGivingCampaigns(): GivingCampaign[] {
    return this.getCampaigns();
  }

  public registerMember(member: Omit<AlumniMember, 'id' | 'alumniNumber' | 'joinedDate'>): AlumniMember {
    return this.addMember(member);
  }

  public recordDonation(campaignId: string, amountUSD: number): void {
    const camp = this.campaigns.find(c => c.id === campaignId);
    if (camp) {
      camp.currentAmountUSD += amountUSD;
      camp.donorCount += 1;
    }
  }

  public getOpportunities(): CareerOpportunity[] {
    return [...this.opportunities];
  }

  public getMentorships(): MentorshipPair[] {
    return [...this.mentorships];
  }
}
