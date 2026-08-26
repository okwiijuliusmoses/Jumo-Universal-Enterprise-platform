import { 
  Building2, Users, BookOpen, DollarSign, Award, Calendar, 
  FileText, Clock, Stethoscope, Library, Home, Briefcase, 
  ShieldCheck, HardDrive, UserCheck, CheckCircle2, LayoutGrid,
  Sparkles, Wrench, Heart, Baby, Utensils, Smile, Bus, Layers,
  Compass, Flame, ShieldAlert, BadgeCheck, FileSpreadsheet,
  GraduationCap
} from 'lucide-react';

export type EducationTemplateId = 'PRE_PRIMARY' | 'PRIMARY' | 'SECONDARY' | 'TERTIARY' | 'VOCATIONAL';

export interface EducationNavGroup {
  group: string;
  items: {
    id: string;
    label: string;
    icon: any;
    badge?: string;
    description: string;
  }[];
}

export interface EducationTemplateConfig {
  id: EducationTemplateId;
  code: string;
  displayName: string;
  categoryName: string;
  tagline: string;
  description: string;
  themeColor: string;
  badgeBg: string;
  defaultRole: string;
  metrics: {
    label: string;
    value: string;
    change?: string;
    sublabel: string;
  }[];
  navGroups: EducationNavGroup[];
  features: string[];
}

export const EDUCATION_TEMPLATES: Record<EducationTemplateId, EducationTemplateConfig> = {
  // A. PRE-PRIMARY / EARLY CHILDHOOD
  PRE_PRIMARY: {
    id: 'PRE_PRIMARY',
    code: 'TMPL-EDU-ECD-01',
    displayName: 'Early Childhood & Pre-Primary ERP',
    categoryName: 'Early Childhood Care & Education (ECCE)',
    tagline: 'Developmental milestones, nursery welfare, caregiver coordination & daily routines',
    description: 'Specialized for kindergartens, nursery schools, daycare centers, and early learning hubs.',
    themeColor: 'amber',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    defaultRole: 'LEAD NURSERY DIRECTOR',
    metrics: [
      { label: 'Enrolled Infants & Toddlers', value: '342', change: '+18 this term', sublabel: 'Across Baby, Middle & Top Classes' },
      { label: 'Caregiver-to-Child Ratio', value: '1:6', change: 'Optimal', sublabel: 'National ECCE Benchmark Met' },
      { label: 'Daily Meal & Nutrition Compliance', value: '100%', change: 'Allergies Tracked', sublabel: 'Special Diets & Lactose Monitored' },
      { label: 'Milestone Progress Logs', value: '94.8%', change: 'Term Assessment', sublabel: 'Motor, Speech & Cognitive Records' }
    ],
    features: [
      'Child Bio-Metric Check-In & Authorized Guardian Pickup Verification',
      'Daily Nutrition, Nap Schedules & Meal Logs',
      'Developmental Milestones (Fine Motor, Social-Emotional, Speech)',
      'Direct Parent Messaging & Incident Reporting',
      'Nursery Term Fee Billing & Term Supplies Tracking'
    ],
    navGroups: [
      {
        group: 'CHILDREN & CARE',
        items: [
          { id: 'ECD_CHILDREN', label: 'Child Registry & Enrollment', icon: Baby, description: 'Child bio, emergency contacts, allergy registers and medical forms' },
          { id: 'ECD_GUARDIANS', label: 'Guardian Pickup & Safety', icon: ShieldCheck, badge: 'Verified', description: 'Authorized pickup authorizations, QR gate passes, and SMS alerts' },
          { id: 'ECD_MILESTONES', label: 'Developmental Milestones', icon: Smile, description: 'Cognitive, motor, language, and emotional growth charts' },
        ]
      },
      {
        group: 'DAILY ROUTINES',
        items: [
          { id: 'ECD_ATTENDANCE', label: 'Daily Attendance & Check-In', icon: Clock, description: 'Morning drop-off time-stamps and health screening' },
          { id: 'ECD_MEALS', label: 'Meals & Nutrition Planner', icon: Utensils, description: 'Dietary needs, allergy precautions, and snack scheduling' },
          { id: 'ECD_ACTIVITIES', label: 'Play & Learning Activities', icon: Sparkles, description: 'Montessori play-stations, outdoor activities, and crafts' },
        ]
      },
      {
        group: 'NURSERY MANAGEMENT',
        items: [
          { id: 'ECD_CAREGIVERS', label: 'Caregivers & Nursery Teachers', icon: Users, description: 'Staff-child allocations, shift rosters, and certifications' },
          { id: 'ECD_FEES', label: 'Nursery Fees & Material Dues', icon: DollarSign, description: 'Tuition, meal contributions, uniform dues, and PRN invoices' },
          { id: 'ECD_COMMUNICATION', label: 'Parent Daily Diary & Broadcast', icon: Heart, description: 'Instant photo updates, mood logs, and emergency broadcasts' },
        ]
      }
    ]
  },

  // B. PRIMARY SCHOOL ERP
  PRIMARY: {
    id: 'PRIMARY',
    code: 'TMPL-EDU-PRI-02',
    displayName: 'Primary School ERP',
    categoryName: 'Basic Primary Education (P1 - P7 / Grades 1 - 6)',
    tagline: 'Continuous assessment, PLE/National benchmarks, school feeding & guardian portal',
    description: 'Tailored for primary schools managing foundational subjects, continuous grading, school feeding, and parent report cards.',
    themeColor: 'emerald',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    defaultRole: 'HEAD TEACHER & CURRICULUM DEAN',
    metrics: [
      { label: 'Enrolled Primary Pupils', value: '1,420', change: '+52 new pupils', sublabel: 'P1 through P7 Streams A & B' },
      { label: 'Continuous Assessment Average', value: '78.6%', change: '+3.2%', sublabel: 'Literacy, Numeracy, Science & SST' },
      { label: 'Term Fee Realization', value: '$184,200', change: '91.4% Collected', sublabel: 'FAAP Automated Clearing' },
      { label: 'Transport & Fleet Routes', value: '14 Buses', change: 'Active Routes', sublabel: 'Real-Time Pupil Tracking' }
    ],
    features: [
      'Class Stream Allocation & Pupil Bio Data Records',
      'Continuous Assessment (BOT, MOT, EOT) and Auto-Grading',
      'Automated Pupil Report Card Generation with Teacher Remarks',
      'School Feeding, Milk Program & Dispensary Health Visits',
      'School Bus Route Logistics & Parent SMS Dispatch'
    ],
    navGroups: [
      {
        group: 'PUPILS & ADMISSIONS',
        items: [
          { id: 'PRI_ADMISSIONS', label: 'Pupil Admissions & Bio', icon: Users, description: 'Enrollment files, birth certificates, and guardian mappings' },
          { id: 'PRI_STREAMS', label: 'Class Streams & Rosters', icon: LayoutGrid, description: 'Primary 1 to Primary 7 stream distributions' },
          { id: 'PRI_ATTENDANCE', label: 'Pupil & Teacher Attendance', icon: UserCheck, description: 'Daily morning roll calls and biometric register' },
        ]
      },
      {
        group: 'ACADEMICS & CURRICULUM',
        items: [
          { id: 'PRI_SUBJECTS', label: 'Subjects & Lesson Plans', icon: BookOpen, description: 'English, Mathematics, Science, Social Studies & Co-curricular' },
          { id: 'PRI_ASSESSMENTS', label: 'Continuous Assessment & Tests', icon: FileText, badge: 'BOT/MOT/EOT', description: 'Beginning of Term, Mid Term, and End of Term marks' },
          { id: 'PRI_REPORT_CARDS', label: 'Report Cards & Promotion', icon: Award, description: 'Automated termly report cards with grading rubric' },
          { id: 'PRI_TIMETABLE', label: 'Primary Timetable & Periods', icon: Clock, description: 'Subject bell schedules and teacher period loads' },
        ]
      },
      {
        group: 'FINANCE & SERVICES',
        items: [
          { id: 'PRI_FEES', label: 'School Fees & Bursary', icon: DollarSign, description: 'Tuition, development funds, and PRN bank reconciliation' },
          { id: 'PRI_TRANSPORT', label: 'School Transport & Vans', icon: Bus, description: 'Morning/Evening routes and bus attendant manifests' },
          { id: 'PRI_DISPENSARY', label: 'Primary Dispensary & Clinic', icon: Stethoscope, description: 'First aid, deworming cycles, and sick bay logs' },
          { id: 'PRI_LIBRARY', label: 'Primary Junior Library', icon: Library, description: 'Storybook cataloging and reader lending trackers' },
        ]
      }
    ]
  },

  // C. SECONDARY SCHOOL ERP
  SECONDARY: {
    id: 'SECONDARY',
    code: 'TMPL-EDU-SEC-03',
    displayName: 'Secondary & High School ERP',
    categoryName: 'Secondary / High School (O-Level & A-Level)',
    tagline: 'Subject combinations, UNEB/National exams, science laboratories & boarding houses',
    description: 'Designed for secondary schools with complex subject combinations (Arts/Sciences), national exams, boarding hostels, and science labs.',
    themeColor: 'blue',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
    defaultRole: 'PRINCIPAL & DIRECTOR OF STUDIES (DOS)',
    metrics: [
      { label: 'Secondary Student Body', value: '2,850', change: '1,620 Boarders', sublabel: 'Senior 1 to Senior 6' },
      { label: 'A-Level Combinations Active', value: '24', change: 'PCM, PCB, BCM, HEG...', sublabel: 'Arts, Pure & Applied Sciences' },
      { label: 'Lab Chemical & Equipment Stock', value: '98.2%', change: 'Calibrated', sublabel: 'Physics, Chemistry & Bio Labs' },
      { label: 'Boarding House Capacity', value: '94%', change: '8 Dormitories', sublabel: 'House Masters & Matron Log' }
    ],
    features: [
      'Senior 1-4 (O-Level) & Senior 5-6 (A-Level) Subject Combination Matrix',
      'UNEB / National Examination Index Numbering & Candidate Passports',
      'Science Laboratories: Reagent Safety, Equipment Tracking & Practical Exams',
      'Boarding House Accommodation, Bed Allocations & Exeat Passes',
      'Clubs, Sports Leagues, Career Counseling & Disciplinary Records'
    ],
    navGroups: [
      {
        group: 'STUDENTS & HOUSES',
        items: [
          { id: 'SEC_SIS', label: 'Student Information System (SIS)', icon: Users, description: 'Full secondary student master database and LIN tracking' },
          { id: 'SEC_COMBINATIONS', label: 'A-Level Subject Combinations', icon: Layers, badge: 'Combinations', description: 'Principal & subsidiary subject configuration (PCM/MEG/BAG/HEG)' },
          { id: 'SEC_HOSTELS', label: 'Boarding Houses & Dorms', icon: Home, description: 'Bed spaces, house points, roll call, and exeat permissions' },
        ]
      },
      {
        group: 'ACADEMICS & EXAMS',
        items: [
          { id: 'SEC_EXAMS', label: 'Examinations & Grading Desk', icon: FileText, badge: 'UNEB Ready', description: 'Mock exams, standardized rubrics, GPA, and division calculations' },
          { id: 'SEC_LABS', label: 'Science & Computer Labs', icon: Flame, description: 'Chemical reagent inventory, microscope logs, and safety protocols' },
          { id: 'SEC_TIMETABLE', label: 'Master Block Timetable', icon: Clock, description: 'Complex clash-free period routing across streams & science practicals' },
          { id: 'SEC_DISCIPLINE', label: 'Discipline & Prefects Council', icon: ShieldAlert, description: 'Conduct merits, demerits, prefect council, and suspensions' },
        ]
      },
      {
        group: 'FINANCE & OPERATIONS',
        items: [
          { id: 'SEC_BURSARY', label: 'Bursary & Alpha Cash Book', icon: DollarSign, description: 'Termly boarding fees, uniforms, lab fees, and bank direct clearing' },
          { id: 'SEC_CLINIC', label: 'High School Health Clinic', icon: Stethoscope, description: '24/7 boarding sick bay, doctor referrals, and medication logs' },
          { id: 'SEC_CAREERS', label: 'Career Guidance & Clubs', icon: Compass, description: 'University entry preparation, debate, sports leagues, and scouting' },
          { id: 'SEC_GOVERNANCE', label: 'Board of Governors & PTA', icon: Building2, description: 'PTA resolutions, school development plans, and teacher council' },
        ]
      }
    ]
  },

  // D. TERTIARY / HIGHER EDUCATION
  TERTIARY: {
    id: 'TERTIARY',
    code: 'TMPL-EDU-TERT-04',
    displayName: 'Tertiary & University ERP',
    categoryName: 'Higher Education (Universities, Institutes & Academies)',
    tagline: 'Senate governance, credit accumulation (ECTS/US), faculties, thesis & degree transcripts',
    description: 'Designed for universities, colleges, and polytechnics with faculties, semesters, credit units, research, and senate councils.',
    themeColor: 'indigo',
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    defaultRole: 'VICE CHANCELLOR & ACADEMIC REGISTRAR',
    metrics: [
      { label: 'Total Undergrad & Postgrad', value: '14,280', change: '6 Faculties', sublabel: 'Across 48 Accredited Degree Programs' },
      { label: 'Senate Examination Clearance', value: '100%', change: 'Moderated', sublabel: 'External Examiner Reports Filed' },
      { label: 'Tuition Realized (Alpha Book)', value: '$4.82M', change: '88.4% Target', sublabel: 'FAAP Multi-Currency Treasury' },
      { label: 'Research Grants & Publications', value: '$840K', change: '18 Projects', sublabel: 'Funded Research Repository' }
    ],
    features: [
      'Faculties, Academic Schools, Departments, and Degree Program Catalog',
      'Semester Course Unit Registration, Pre-requisite Checks & PRN Billing',
      'Academic Senate Moderation, External Examiners, and GPA/CGPA Computations',
      'Automated Anti-Fraud QR Transcripts, Degree Certificates, and Graduation Roll',
      'Campus E-Library (OAI-PMH/Z39.50) & Research Grants Management'
    ],
    navGroups: [
      {
        group: 'UNIVERSITY GOVERNANCE',
        items: [
          { id: 'TERT_SENATE', label: 'Academic Senate & Council', icon: Building2, badge: 'Senate', description: 'Curriculum accreditations, board resolutions, and tenure appointments' },
          { id: 'TERT_REGISTRAR', label: 'Academic Registrar & SIS', icon: Users, description: 'Student admissions, matriculation numbers, and cumulative bio' },
          { id: 'TERT_FACULTIES', label: 'Faculties, Schools & Deans', icon: LayoutGrid, description: 'Faculty of Science, Business, Engineering, Humanities, and Medicine' },
        ]
      },
      {
        group: 'ACADEMICS & RESEARCH',
        items: [
          { id: 'TERT_PROGRAMMES', label: 'Degree Programmes & Courses', icon: BookOpen, description: 'Bachelors, Masters, PhD curricula, syllabus, and credit weighting' },
          { id: 'TERT_REGISTRATION', label: 'Semester Course Registration', icon: UserCheck, description: 'Credit load limits, elective selections, and prerequisite validation' },
          { id: 'TERT_EXAMS_TRANSCRIPTS', label: 'Exams, GPA & QR Transcripts', icon: Award, badge: 'Verified', description: 'CGPA computation, retake processing, senate pass lists, and transcripts' },
          { id: 'TERT_RESEARCH', label: 'Research Grants & Publications', icon: FileSpreadsheet, description: 'Grant disbursement tracking, ethical approvals, and journal citations' },
        ]
      },
      {
        group: 'CAMPUS SERVICES & FAAP',
        items: [
          { id: 'TERT_BURSARY', label: 'University Bursary & Ledger', icon: DollarSign, description: 'Tuition invoicing, functional fees, FAAP General Ledger sync' },
          { id: 'TERT_LIBRARY', label: 'Campus Research E-Library', icon: Library, description: 'Digital repositories, OPAC indexing, and journal subscriptions' },
          { id: 'TERT_HOSTELS', label: 'University Halls of Residence', icon: Home, description: 'Undergraduate hall allocations and nonresident permit registry' },
          { id: 'TERT_CLINIC', label: 'University Health Hospital', icon: Stethoscope, description: 'Student & staff medical insurance, pharmacy, and diagnostic lab' },
        ]
      }
    ]
  },

  // E. VOCATIONAL / TECHNICAL EDUCATION
  VOCATIONAL: {
    id: 'VOCATIONAL',
    code: 'TMPL-EDU-VOC-05',
    displayName: 'Vocational & Technical College ERP',
    categoryName: 'Technical, Vocational Education & Training (TVET)',
    tagline: 'Competency-Based Training (CBET), workshop inventory, apprenticeships & trade certifications',
    description: 'Tailored for vocational training institutes, technical colleges, and polytechnics focusing on hands-on trades and apprenticeships.',
    themeColor: 'teal',
    badgeBg: 'bg-teal-100 text-teal-800 border-teal-300',
    defaultRole: 'COLLEGE PRINCIPAL & VOCATIONAL DEAN',
    metrics: [
      { label: 'Active Trainees & Apprentices', value: '1,890', change: '12 Trade Courses', sublabel: 'Welding, Electrical, Auto, Culinary, ICT' },
      { label: 'Competency Mastery Rate', value: '92.4%', change: 'Certified', sublabel: 'National CBET Standards Compliant' },
      { label: 'Active Industrial Attachments', value: '412', change: '68 Industry Partners', sublabel: 'Apprentice Placement Registry' },
      { label: 'Workshop Tool Availability', value: '99.1%', change: 'Calibrated', sublabel: 'Heavy Machinery & Safety Audited' }
    ],
    features: [
      'Competency-Based Modular Units (CBET) & Practical Performance Rubrics',
      'Workshop Heavy Machinery, Power Tools & Raw Material Consumables',
      'Industrial Attachment & Apprenticeship Placement Monitoring with Supervisors',
      'Trade Testing Body Candidate Processing (DIT / City & Guilds / TVET Board)',
      'Job Fair, Artisan Certification & Employer Placement Matcher'
    ],
    navGroups: [
      {
        group: 'TRAINEES & TRADES',
        items: [
          { id: 'VOC_TRAINEES', label: 'Trainee Census & Enrollment', icon: Users, description: 'Artisan bio, prior learning recognition (RPL), and batch enrollments' },
          { id: 'VOC_TRADES', label: 'Trade Departments & Courses', icon: Wrench, description: 'Automotive, Electrical, Civil & Building, Culinary, Welding, ICT' },
          { id: 'VOC_COMPETENCIES', label: 'Competency-Based Units (CBET)', icon: BadgeCheck, badge: 'CBET', description: 'Practical skills rubrics, module credits, and proficiency milestones' },
        ]
      },
      {
        group: 'WORKSHOPS & ATTACHMENT',
        items: [
          { id: 'VOC_WORKSHOPS', label: 'Workshops & Machinery Stores', icon: HardDrive, description: 'Tool crib checkout, safety PPE inspections, and consumable stock' },
          { id: 'VOC_ATTACHMENTS', label: 'Industrial Attachments & Interns', icon: Briefcase, badge: 'Industry', description: 'Employer placements, field supervisor visits, and logbook grading' },
          { id: 'VOC_ASSESSMENT', label: 'Practical Trade Assessments', icon: FileText, description: 'Live workshop practical exams, trade test panels, and safety checks' },
        ]
      },
      {
        group: 'FINANCE & CERTIFICATION',
        items: [
          { id: 'VOC_CERTIFICATION', label: 'Trade Testing & Certifications', icon: Award, description: 'National TVET certificates, artisan badges, and skill transcripts' },
          { id: 'VOC_FEES', label: 'Tuition & Workshop Material Fees', icon: DollarSign, description: 'Practical material dues, tool deposits, and FAAP ledger sync' },
          { id: 'VOC_COMMUNITY', label: 'Commercial Production Unit', icon: Layers, description: 'Institutional fabrication orders, garage services, and revenue generation' },
        ]
      }
    ]
  }
};
