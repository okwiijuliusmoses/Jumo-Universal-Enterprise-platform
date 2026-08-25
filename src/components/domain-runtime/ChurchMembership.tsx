import React, { useState } from 'react';
import { 
  Users, UserPlus, Heart, Home, Search, AlertTriangle, CheckCircle, Sparkles, 
  Trash2, ArrowRight, GitMerge, FileText, Compass, TrendingUp, Filter,
  Award, ShieldCheck, MapPin, Briefcase, GraduationCap, QrCode, Fingerprint, Camera, Check, FileCheck
} from 'lucide-react';

interface SacramentalRecord {
  sacrament: 'Baptism' | 'Confirmation' | 'First Holy Communion' | 'Marriage' | 'Holy Orders' | 'Commissioning' | 'Funeral';
  date: string;
  minister: string;
  parish: string;
  certificateNo: string;
  sha256Seal: string;
  isAiVerified: boolean;
  notes?: string;
}

interface Member {
  id: string;
  fullName: string;
  ageCohort: string;
  gender: string;
  maritalStatus: string;
  baptismalStatus: string;
  cellGroup: string;
  phone: string;
  email: string;
  status: string;
  role?: string;

  // Enriched National Census Details
  nationalId?: string;
  dob?: string;
  placeOfBirth?: string;
  nationality?: string;
  clan?: string;
  disabilityStatus?: string;
  bloodGroup?: string;
  languages?: string[];

  // Residential Information
  physicalAddress?: string;
  district?: string;
  gpsLocation?: string;

  // Career and Education History
  educationLevel?: string;
  theologicalStudies?: string;
  profession?: string;
  skillsInventory?: string[];

  // Sacramental Registry Timeline
  sacramentalRecords?: SacramentalRecord[];

  // AI Census Intelligence
  attendanceTrend?: 'Excellent' | 'Stable' | 'Declining' | 'Critical';
  retentionProbability?: number; // percentage
  evangelismScore?: number; // 0-100
}

interface FamilyUnit {
  id: string;
  familyName: string;
  headId: string;
  spouseId?: string;
  childrenIds: string[];
  dependantIds: string[];
  location: string;
  lineageNotes: string;
  ministryParticipation: string[];
  engagementScore: number; // 0-100
  pastoralAlerts: string[];
}

export const ChurchMembership: React.FC = () => {
  // Selected detailed profile viewer
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [modalTab, setModalTab] = useState<'personal' | 'residential' | 'career' | 'sacramental' | 'ai'>('personal');

  // Existing members list from parent or initialized locally for modularity
  const [members, setMembers] = useState<Member[]>([
    {
      id: 'MEM-001',
      fullName: 'Agnes Nakato Walusimbi',
      ageCohort: 'Young Adult (25-39)',
      gender: 'Female',
      maritalStatus: 'Married',
      baptismalStatus: 'Baptized & Confirmed',
      cellGroup: 'Northern Cathedral Cell #4',
      phone: '+256 772 104 889',
      email: 'agnes.walusimbi@sovereign-cloud.org',
      status: 'Active',
      role: 'Sunday School Assistant',
      nationalId: 'CM8902410NAK',
      dob: '1995-10-14',
      placeOfBirth: 'Mengal, Kampala',
      nationality: 'Ugandan',
      clan: 'Mamba (Lungfish)',
      disabilityStatus: 'None',
      bloodGroup: 'O+',
      languages: ['Luganda', 'English', 'Swahili'],
      physicalAddress: 'Namirembe Hill Rd, Block D',
      district: 'Kampala',
      gpsLocation: '0.3150° N, 32.5562° E',
      educationLevel: 'Bachelor of Science in Education',
      theologicalStudies: 'Certificate in Catechetics (Namirembe Divinity College)',
      profession: 'Primary School Teacher',
      skillsInventory: ['Curriculum Planning', 'Choral Conducting', 'Counseling'],
      attendanceTrend: 'Excellent',
      retentionProbability: 98,
      evangelismScore: 85,
      sacramentalRecords: [
        {
          sacrament: 'Baptism',
          date: '1996-01-20',
          minister: 'Rev. Canon David Ochieng',
          parish: 'St. Paul Cathedral, Namirembe',
          certificateNo: 'BAP-1996-88902',
          sha256Seal: 'SHA256:d8a11e24c00d41e7811bb2c556b10091ca2f42a129ef66a1a8c9e5e6e22c00a1',
          isAiVerified: true,
          notes: 'Infant baptism. Godparents: John Mukasa, Mary Walusimbi'
        },
        {
          sacrament: 'Confirmation',
          date: '2010-06-15',
          minister: 'Right Rev. Moses Banja',
          parish: 'St. Paul Cathedral, Namirembe',
          certificateNo: 'CON-2010-12405',
          sha256Seal: 'SHA256:4a12eb12104cc99182bb31c2ff401ae4f45ab89001bfa829ce34e2c22a1011e4',
          isAiVerified: true,
          notes: 'Youth confirmation class valedictorian'
        },
        {
          sacrament: 'Marriage',
          date: '2021-08-28',
          minister: 'Very Rev. Canon Jonathan Kisawuzi',
          parish: 'St. Paul Cathedral, Namirembe',
          certificateNo: 'MAR-2021-00215',
          sha256Seal: 'SHA256:e88f41ca12b00d41ea78ab9c104ef9a44e543bda90ce11b1ac224ea10aef556a',
          isAiVerified: true,
          notes: 'Married to Dr. Emmanuel Otim'
        }
      ]
    },
    {
      id: 'MEM-002',
      fullName: 'Dr. Emmanuel Otim',
      ageCohort: 'Adult (40-59)',
      gender: 'Male',
      maritalStatus: 'Married',
      baptismalStatus: 'Baptized & Confirmed',
      cellGroup: 'Central Cathedral Grace Cell #1',
      phone: '+256 701 445 221',
      email: 'emmanuel.otim@ecclesia-aegis.org',
      status: 'Active',
      role: 'Synod Board Elder',
      nationalId: 'CM7804155OTI',
      dob: '1978-04-15',
      placeOfBirth: 'Soroti Municipal Hospital',
      nationality: 'Ugandan',
      clan: 'Irarak',
      disabilityStatus: 'None',
      bloodGroup: 'A-',
      languages: ['Ateso', 'English', 'Luganda'],
      physicalAddress: 'Kireka Hill, Plot 4A',
      district: 'Wakiso',
      gpsLocation: '0.3541° N, 32.6231° E',
      educationLevel: 'Doctor of Medicine (MUK)',
      theologicalStudies: 'Diploma in Theological Studies (Gulu Christian College)',
      profession: 'Consultant Pediatrician',
      skillsInventory: ['Medical Administration', 'Strategic Planning', 'Financial Audit'],
      attendanceTrend: 'Stable',
      retentionProbability: 95,
      evangelismScore: 72,
      sacramentalRecords: [
        {
          sacrament: 'Baptism',
          date: '1978-08-12',
          minister: 'Rev. Father Peter Okello',
          parish: 'St. Peter Parish, Soroti',
          certificateNo: 'BAP-1978-04521',
          sha256Seal: 'SHA256:7c89ee21da4bc21fa882a99e82c19924faef814521bdc330e23aa2e13a48e239',
          isAiVerified: true
        },
        {
          sacrament: 'Confirmation',
          date: '1992-11-05',
          minister: 'Most Rev. Ggulu Primate',
          parish: 'Soroti Cathedral',
          certificateNo: 'CON-1992-09412',
          sha256Seal: 'SHA256:d9ee291a2bc44fb88ea1239aa8e338bd625faef12b19283fceaa0e334a1b02de',
          isAiVerified: true
        },
        {
          sacrament: 'Marriage',
          date: '2021-08-28',
          minister: 'Very Rev. Canon Jonathan Kisawuzi',
          parish: 'St. Paul Cathedral, Namirembe',
          certificateNo: 'MAR-2021-00215',
          sha256Seal: 'SHA256:e88f41ca12b00d41ea78ab9c104ef9a44e543bda90ce11b1ac224ea10aef556a',
          isAiVerified: true
        }
      ]
    },
    {
      id: 'MEM-003',
      fullName: 'Esther Kiconco',
      ageCohort: 'Youth (13-24)',
      gender: 'Female',
      maritalStatus: 'Single',
      baptismalStatus: 'Catechumen',
      cellGroup: 'Youth Worship & Praise Team',
      phone: '+256 781 554 210',
      email: 'esther.kiconco@jumo-highered.org',
      status: 'Active',
      role: 'Choir Member',
      nationalId: 'CM0411202KIC',
      dob: '2004-11-20',
      placeOfBirth: 'Mbarara Hospital',
      nationality: 'Ugandan',
      clan: 'Abasigi',
      disabilityStatus: 'None',
      bloodGroup: 'B+',
      languages: ['Runyankole', 'English'],
      physicalAddress: 'Kampala Campus Hostel Room 12',
      district: 'Kampala',
      gpsLocation: '0.3321° N, 32.5701° E',
      educationLevel: 'Undergraduate student (Information Tech, Makerere)',
      profession: 'Student',
      skillsInventory: ['UI Design', 'Vocal harmony', 'Social media outreach'],
      attendanceTrend: 'Excellent',
      retentionProbability: 90,
      evangelismScore: 94,
      sacramentalRecords: []
    },
    {
      id: 'MEM-004',
      fullName: 'Deaconess Sarah Kintu',
      ageCohort: 'Adult (40-59)',
      gender: 'Female',
      maritalStatus: 'Widowed',
      baptismalStatus: 'Baptized & Confirmed',
      cellGroup: 'Central Cathedral Grace Cell #1',
      phone: '+256 774 200 455',
      email: 'sarah.kintu@sovereign.org',
      status: 'Active',
      role: 'Welfare Coordinator',
      nationalId: 'CM7205190KIN',
      dob: '1972-05-19',
      placeOfBirth: 'Mukono Town Clinic',
      nationality: 'Ugandan',
      clan: 'Nkima (Monkey)',
      disabilityStatus: 'None',
      bloodGroup: 'O-',
      languages: ['Luganda', 'English'],
      physicalAddress: 'Kireka Hill, Block 3A',
      district: 'Wakiso',
      gpsLocation: '0.3650° N, 32.6450° E',
      educationLevel: 'Diploma in Social Work & Administration',
      theologicalStudies: 'Lay Ministry License Course (Namirembe Synod)',
      profession: 'Community Development Officer',
      skillsInventory: ['Crisis Intervention', 'Grief Counseling', 'Event Organizing'],
      attendanceTrend: 'Stable',
      retentionProbability: 92,
      evangelismScore: 88,
      sacramentalRecords: [
        {
          sacrament: 'Baptism',
          date: '1972-09-02',
          minister: 'Rev. S. Mukasa',
          parish: 'St. Philip Mukono',
          certificateNo: 'BAP-1972-901',
          sha256Seal: 'SHA256:aa23f38d10b4ef21fa88c0a89761e290f11acbd8940e441bb25e6e2ea418cd94',
          isAiVerified: true
        },
        {
          sacrament: 'Confirmation',
          date: '1986-05-14',
          minister: 'Most Rev. Primate Bishop',
          parish: 'Mukono Cathedral',
          certificateNo: 'CON-1986-045',
          sha256Seal: 'SHA256:d8c11aa90f12be4fe8a002bc45ab3ef123d45faec4567e1a8bbceef0011adfa2',
          isAiVerified: true
        }
      ]
    },
    {
      id: 'MEM-005',
      fullName: 'David Kintu Junior',
      ageCohort: 'Children (0-12)',
      gender: 'Male',
      maritalStatus: 'Single',
      baptismalStatus: 'Baptized',
      cellGroup: 'Central Cathedral Grace Cell #1',
      phone: 'None',
      email: 'david.jr@sovereign.org',
      status: 'Active',
      nationalId: 'N/A (Minor)',
      dob: '2015-06-12',
      placeOfBirth: 'Mulago Hospital',
      nationality: 'Ugandan',
      clan: 'Nkima (Monkey)',
      disabilityStatus: 'None',
      bloodGroup: 'O+',
      languages: ['English', 'Luganda'],
      physicalAddress: 'Kireka Hill, Block 3A',
      district: 'Wakiso',
      gpsLocation: '0.3650° N, 32.6450° E',
      educationLevel: 'Primary Four Student',
      profession: 'Student',
      skillsInventory: ['Bible Memorization', 'Drawing'],
      attendanceTrend: 'Stable',
      retentionProbability: 99,
      evangelismScore: 60,
      sacramentalRecords: [
        {
          sacrament: 'Baptism',
          date: '2015-10-10',
          minister: 'Rev. Emmanuel Mukasa',
          parish: 'St. Paul Cathedral, Namirembe',
          certificateNo: 'BAP-2015-00194',
          sha256Seal: 'SHA256:bb12c8a2b3df04c7d9e431bb234acfe12c9fa23ea119ea821cb9201941e33cba',
          isAiVerified: true,
          notes: 'Parents: Sarah Kintu & late David Kintu Sr.'
        }
      ]
    }
  ]);

  const [families, setFamilies] = useState<FamilyUnit[]>([
    {
      id: 'FAM-001',
      familyName: 'Otim Family Household',
      headId: 'MEM-002', // Dr. Emmanuel Otim
      spouseId: 'MEM-001', // Agnes Nakato Walusimbi
      childrenIds: [],
      dependantIds: [],
      location: 'Namirembe Hill Road, Plot 12',
      lineageNotes: 'Ancestral roots in Teso Province. Active parish contributors.',
      ministryParticipation: ['Choir', 'Sunday School', 'Missions Board'],
      engagementScore: 94,
      pastoralAlerts: []
    },
    {
      id: 'FAM-002',
      familyName: 'Kintu Family Household',
      headId: 'MEM-004', // Deaconess Sarah Kintu
      spouseId: undefined,
      childrenIds: ['MEM-005'], // David Kintu Junior
      dependantIds: [],
      location: 'Kireka Hill, Block 3A',
      lineageNotes: 'Established 1994. Longstanding history of intercession coordination.',
      ministryParticipation: ['Intercession Fellowship', 'Welfare Ministry'],
      engagementScore: 68,
      pastoralAlerts: ['Pastoral Alert: Sudden attendance drop in home cell weekly meetings', 'Giving Alert: Giving pattern fluctuates']
    }
  ]);

  // Member Registration State
  const [newMember, setNewMember] = useState({
    fullName: '',
    ageCohort: 'Young Adult (25-39)',
    gender: 'Female',
    maritalStatus: 'Single',
    baptismalStatus: 'Baptized & Confirmed',
    cellGroup: 'Central Cathedral Grace Cell #1',
    phone: '',
    email: '',
    role: ''
  });

  // Family Creation State
  const [newFamily, setNewFamily] = useState({
    familyName: '',
    headId: '',
    spouseId: '',
    location: '',
    lineageNotes: '',
    ministryString: 'Choir, Sunday School'
  });

  const [selectedFamilyId, setSelectedFamilyId] = useState<string>('FAM-001');
  const [subTab, setSubTab] = useState<'census' | 'family' | 'intelligence'>('census');
  const [filterCell, setFilterCell] = useState<string>('all');

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.fullName.trim()) return;

    const added: Member = {
      id: `MEM-00${members.length + 1}`,
      fullName: newMember.fullName,
      ageCohort: newMember.ageCohort,
      gender: newMember.gender,
      maritalStatus: newMember.maritalStatus,
      baptismalStatus: newMember.baptismalStatus,
      cellGroup: newMember.cellGroup,
      phone: newMember.phone || 'N/A',
      email: newMember.email || `${newMember.fullName.toLowerCase().replace(/\s+/g, '.')}@ecclesia.org`,
      status: 'Active',
      role: newMember.role || undefined
    };

    setMembers([...members, added]);
    setNewMember({
      fullName: '',
      ageCohort: 'Young Adult (25-39)',
      gender: 'Female',
      maritalStatus: 'Single',
      baptismalStatus: 'Baptized & Confirmed',
      cellGroup: 'Central Cathedral Grace Cell #1',
      phone: '',
      email: '',
      role: ''
    });
    alert(`Verified & enrolled member: ${added.fullName}`);
  };

  const handleCreateFamily = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFamily.familyName.trim() || !newFamily.headId) return;

    const addedFam: FamilyUnit = {
      id: `FAM-00${families.length + 1}`,
      familyName: newFamily.familyName,
      headId: newFamily.headId,
      spouseId: newFamily.spouseId || undefined,
      childrenIds: [],
      dependantIds: [],
      location: newFamily.location || 'Not Specified',
      lineageNotes: newFamily.lineageNotes || 'First-generation parish members',
      ministryParticipation: newFamily.ministryString.split(',').map(s => s.trim()).filter(Boolean),
      engagementScore: 85,
      pastoralAlerts: []
    };

    setFamilies([...families, addedFam]);
    setSelectedFamilyId(addedFam.id);
    setNewFamily({
      familyName: '',
      headId: '',
      spouseId: '',
      location: '',
      lineageNotes: '',
      ministryString: 'Choir, Sunday School'
    });
    alert(`Created household unit: ${addedFam.familyName}`);
  };

  const selectedFamily = families.find(f => f.id === selectedFamilyId) || families[0];

  const getMemberName = (id?: string) => {
    if (!id) return 'None';
    return members.find(m => m.id === id)?.fullName || 'Unknown Member';
  };

  const cells = Array.from(new Set(members.map(m => m.cellGroup)));

  const filteredMembers = filterCell === 'all' 
    ? members 
    : members.filter(m => m.cellGroup === filterCell);

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setSubTab('census')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            subTab === 'census' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          Demographic Census & Roll
        </button>
        <button
          onClick={() => setSubTab('family')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            subTab === 'family' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className="w-4 h-4" />
          Family & Household Intelligence
        </button>
        <button
          onClick={() => setSubTab('intelligence')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            subTab === 'intelligence' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-cyan-500 animate-pulse" />
          AI Pastoral Care Alerts
        </button>
      </div>

      {subTab === 'census' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Member registration form */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
              <UserPlus className="w-4 h-4 text-purple-600" />
              Enroll Member into Census
            </h3>
            <form onSubmit={handleCreateMember} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={newMember.fullName}
                  onChange={(e) => setNewMember({ ...newMember, fullName: e.target.value })}
                  placeholder="e.g. Samuel Ssewankambo"
                  className="w-full p-2 rounded border border-slate-300 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Age Cohort</label>
                  <select
                    value={newMember.ageCohort}
                    onChange={(e) => setNewMember({ ...newMember, ageCohort: e.target.value })}
                    className="w-full p-2 rounded border border-slate-300 bg-white"
                  >
                    <option value="Children (0-12)">Children (0–12)</option>
                    <option value="Youth (13-24)">Youth (13–24)</option>
                    <option value="Young Adult (25-39)">Young Adult (25–39)</option>
                    <option value="Adult (40-59)">Adult (40–59)</option>
                    <option value="Elder (60+)">Elder (60+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Gender</label>
                  <select
                    value={newMember.gender}
                    onChange={(e) => setNewMember({ ...newMember, gender: e.target.value })}
                    className="w-full p-2 rounded border border-slate-300 bg-white"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other / Undisclosed">Undisclosed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Marital Status</label>
                  <select
                    value={newMember.maritalStatus}
                    onChange={(e) => setNewMember({ ...newMember, maritalStatus: e.target.value })}
                    className="w-full p-2 rounded border border-slate-300 bg-white"
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Baptismal Status</label>
                  <select
                    value={newMember.baptismalStatus}
                    onChange={(e) => setNewMember({ ...newMember, baptismalStatus: e.target.value })}
                    className="w-full p-2 rounded border border-slate-300 bg-white"
                  >
                    <option value="Baptized & Confirmed">Baptized & Confirmed</option>
                    <option value="Catechumen">Catechumen</option>
                    <option value="Baptized">Baptized Only</option>
                    <option value="Not Baptized">Not Baptized</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Cell Group / Fellowships</label>
                <input
                  type="text"
                  value={newMember.cellGroup}
                  onChange={(e) => setNewMember({ ...newMember, cellGroup: e.target.value })}
                  placeholder="e.g. Northern Cathedral Cell #4"
                  className="w-full p-2 rounded border border-slate-300 focus:ring-1 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                  placeholder="e.g. +256 700 123456"
                  className="w-full p-2 rounded border border-slate-300 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  placeholder="e.g. samuel@ecclesia.org"
                  className="w-full p-2 rounded border border-slate-300 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Ministry Role (Optional)</label>
                <input
                  type="text"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  placeholder="e.g. Sunday School Teacher"
                  className="w-full p-2 rounded border border-slate-300 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded shadow transition-all flex items-center justify-center gap-1"
              >
                <UserPlus className="w-4 h-4" /> Enroll & Verify
              </button>
            </form>
          </div>

          {/* Members census table */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-purple-600" />
                  Demographic Register & Census Ledger
                </h3>
                <p className="text-xs text-slate-500">Authorized register of active parish members.</p>
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <select
                  value={filterCell}
                  onChange={(e) => setFilterCell(e.target.value)}
                  className="text-xs p-1 rounded border border-slate-300 bg-white"
                >
                  <option value="all">All Cell Groups</option>
                  {cells.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-2 px-3">Member ID</th>
                    <th className="py-2 px-3">Full Legal Name</th>
                    <th className="py-2 px-3">Age & Cohort</th>
                    <th className="py-2 px-3">Family Status / Role</th>
                    <th className="py-2 px-3">Cell Fellowship</th>
                    <th className="py-2 px-3 text-center">Status</th>
                    <th className="py-2 px-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMembers.map(m => (
                    <tr 
                      key={m.id} 
                      onClick={() => setSelectedMember(m)} 
                      className="hover:bg-purple-50/50 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-3 font-mono font-bold text-purple-600">{m.id}</td>
                      <td className="py-3 px-3">
                        <strong className="text-slate-900 font-bold block">{m.fullName}</strong>
                        <span className="text-slate-500 text-[10px] block">{m.email} • {m.phone}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-slate-700">{m.ageCohort}</span>
                        <span className="text-slate-500 block text-[10px]">{m.gender} • {m.maritalStatus}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 font-mono text-[10px] font-bold">
                          {m.role || 'Congregation Lay Member'}
                        </span>
                        <span className="block text-[10px] text-slate-600 mt-0.5">{m.baptismalStatus}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-800 font-medium">{m.cellGroup}</td>
                      <td className="py-3 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          {m.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMember(m);
                          }}
                          className="px-2.5 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded text-[10px] font-bold transition-all"
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {subTab === 'family' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Family Registry Selector */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Home className="w-4 h-4 text-purple-600" />
                Active Family Units
              </h3>
              <span className="text-xs text-slate-500">{families.length} Households</span>
            </div>

            <div className="space-y-2">
              {families.map(fam => {
                const isSelected = selectedFamilyId === fam.id;
                return (
                  <button
                    key={fam.id}
                    onClick={() => setSelectedFamilyId(fam.id)}
                    className={`w-full p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50/50 shadow-sm ring-1 ring-purple-500'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-bold text-slate-900">{fam.familyName}</strong>
                      <span className="text-[10px] font-mono text-slate-600 font-bold">{fam.id}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-1">Head: {getMemberName(fam.headId)}</span>
                    <span className="text-[10px] text-slate-600 mt-1 block">Location: {fam.location}</span>
                  </button>
                );
              })}
            </div>

            {/* Create family form */}
            <h4 className="text-xs font-bold text-slate-900 border-t pt-4">Register New Household Unit</h4>
            <form onSubmit={handleCreateFamily} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Family Surname / Household Name</label>
                <input
                  type="text"
                  value={newFamily.familyName}
                  onChange={(e) => setNewFamily({ ...newFamily, familyName: e.target.value })}
                  placeholder="e.g. Ssewankambo Family Household"
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Primary Head of Household</label>
                <select
                  value={newFamily.headId}
                  onChange={(e) => setNewFamily({ ...newFamily, headId: e.target.value })}
                  className="w-full p-2 rounded border border-slate-300 bg-white"
                  required
                >
                  <option value="">-- Select Member --</option>
                  {members.map(m => (
                    <option key={m.id} value={m.id}>{m.fullName} ({m.id})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Spouse (Optional)</label>
                <select
                  value={newFamily.spouseId}
                  onChange={(e) => setNewFamily({ ...newFamily, spouseId: e.target.value })}
                  className="w-full p-2 rounded border border-slate-300 bg-white"
                >
                  <option value="">-- Select Spouse --</option>
                  {members.map(m => (
                    <option key={m.id} value={m.id}>{m.fullName} ({m.id})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Household Physical Location</label>
                <input
                  type="text"
                  value={newFamily.location}
                  onChange={(e) => setNewFamily({ ...newFamily, location: e.target.value })}
                  placeholder="e.g. Plot 15, Nakasero Lane"
                  className="w-full p-2 rounded border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Lineage Notes & Ancestral Origin</label>
                <textarea
                  value={newFamily.lineageNotes}
                  onChange={(e) => setNewFamily({ ...newFamily, lineageNotes: e.target.value })}
                  placeholder="e.g. Family lineages traced back to Mukono Parish..."
                  className="w-full p-2 rounded border border-slate-300 h-16 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-white hover:bg-white text-white font-bold rounded shadow"
              >
                Create Family Unit
              </button>
            </form>
          </div>

          {/* Household Details Viewer */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5 lg:col-span-2">
            <div className="border-b pb-3 flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{selectedFamily.familyName}</h3>
                <span className="text-[10px] text-slate-500 font-mono">ID: {selectedFamily.id} • Registered Office</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block">AI engagement Score</span>
                <span className="text-lg font-bold font-mono text-purple-700">{selectedFamily.engagementScore}%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block font-semibold mb-1">Physical Location:</span>
                <strong className="text-slate-800 font-bold block">{selectedFamily.location}</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block font-semibold mb-1">Active Ministries:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(selectedFamily.ministryParticipation ?? []).map((min, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">
                      {min}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 border-b pb-1">
                <GitMerge className="w-3.5 h-3.5 text-purple-600" />
                Generational Linkages & Household Roster
              </h4>

              <div className="space-y-2">
                {/* HEAD */}
                <div className="p-3 rounded-lg border border-purple-200 bg-purple-50/20 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider bg-purple-100 px-1.5 py-0.2 rounded mr-2">
                      Head of Household
                    </span>
                    <strong className="text-slate-900 font-bold">{getMemberName(selectedFamily.headId)}</strong>
                  </div>
                  <span className="text-slate-500 text-[11px]">Primary Contact</span>
                </div>

                {/* SPOUSE */}
                {selectedFamily.spouseId && (
                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider bg-slate-200 px-1.5 py-0.2 rounded mr-2">
                        Spouse / Partner
                      </span>
                      <strong className="text-slate-900 font-bold">{getMemberName(selectedFamily.spouseId)}</strong>
                    </div>
                    <span className="text-slate-500 text-[11px]">Parent</span>
                  </div>
                )}

                {/* CHILDREN */}
                {(selectedFamily.childrenIds ?? []).map(childId => (
                  <div key={childId} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-1.5 py-0.2 rounded mr-2">
                        Child Unit
                      </span>
                      <strong className="text-slate-900 font-bold">{getMemberName(childId)}</strong>
                    </div>
                    <span className="text-slate-500 text-[11px]">Dependant Linkage</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="font-bold text-slate-700 block mb-1">Archived Family Lineage & Historical Notes:</span>
              <p className="text-slate-600 leading-relaxed italic">
                {selectedFamily.lineageNotes}
              </p>
            </div>
          </div>
        </div>
      )}

      {subTab === 'intelligence' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 p-6 rounded-xl text-white border border-slate-200">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
              Sovereign AI Family & Household Intelligence Engine
            </h3>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed">
              Continuous neural analysis of attendance telemetry, cell fellowship reportings, and double-entry financial ledger records.
              Issues predictive indicators, pastoral welfare alerts, and flags households showing anomalous drops in ministry engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {families.map(fam => (
              <div key={fam.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-start border-b pb-2">
                    <div>
                      <strong className="text-sm font-bold text-slate-900 block">{fam.familyName}</strong>
                      <span className="text-[10px] text-slate-500 font-mono">Node ID: {fam.id}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      fam.engagementScore >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {fam.engagementScore}% Engaged
                    </span>
                  </div>

                  <div className="space-y-2 mt-4">
                    <span className="text-slate-500 block font-semibold">Active AI Health Checks:</span>
                    {!(fam.pastoralAlerts && fam.pastoralAlerts.length > 0) ? (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 flex items-start gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Zero Flags:</strong> Household shows active attendance, steady tithes, and robust cell attendance.</span>
                      </div>
                    ) : (
                      (fam.pastoralAlerts ?? []).map((alt, i) => (
                        <div key={i} className="p-3 bg-amber-50 border border-amber-200 rounded text-amber-800 flex items-start gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{alt}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <button
                  onClick={() => alert(`Pastoral care visit workflow initiated for ${fam.familyName}. Notifications dispatched to cell leaders.`)}
                  className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded shadow transition-all flex items-center justify-center gap-1.5"
                >
                  <Compass className="w-4 h-4" /> Trigger Pastoral Outreach Care visit
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* COMPREHENSIVE SOVEREIGN MEMBERSHIP CENSUS & SACRAMENTAL MODAL */}
      {/* ========================================================= */}
      {selectedMember && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-150">
            {/* Modal Header */}
            <div className="bg-white text-white p-5 flex justify-between items-start border-b border-slate-200">
              <div className="flex gap-4 items-center">
                <div className="relative w-14 h-14 rounded-full bg-white border-2 border-purple-500/50 flex items-center justify-center text-white overflow-hidden shrink-0">
                  <Camera className="w-6 h-6 text-slate-600" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[8px] text-center text-slate-700 py-0.5">Photo Slot</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold tracking-tight text-white">{selectedMember.fullName}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-400/30">
                      {selectedMember.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    National Church ID: <span className="font-mono text-[#0078D4] font-semibold">{selectedMember.nationalId || 'N/A'}</span> • Cell: {selectedMember.cellGroup}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white p-1.5 rounded border border-slate-200">
                  <QrCode className="w-8 h-8 text-white" />
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="p-1 rounded-lg hover:bg-white text-slate-600 hover:text-white transition-all text-sm font-bold w-8 h-8 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="bg-slate-100 px-6 border-b border-slate-200 flex overflow-x-auto gap-1">
              {[
                { id: 'personal', label: 'Bio & Personal ID', icon: Fingerprint },
                { id: 'residential', label: 'Residential & Household', icon: MapPin },
                { id: 'career', label: 'Education & Career', icon: Briefcase },
                { id: 'sacramental', label: 'Sacramental History', icon: Award },
                { id: 'ai', label: 'AI Census Analytics', icon: Sparkles }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = modalTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setModalTab(tab.id as any)}
                    className={`px-4 py-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
                      isActive 
                        ? 'border-purple-600 text-purple-900 bg-white/40' 
                        : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-purple-600' : 'text-slate-500'}`} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-700">
              
              {/* TAB 1: Bio-Data & Personal ID */}
              {modalTab === 'personal' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Date of Birth</span>
                      <strong className="text-slate-900 block mt-1">{selectedMember.dob || 'Unknown'}</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Place of Birth</span>
                      <strong className="text-slate-900 block mt-1">{selectedMember.placeOfBirth || 'N/A'}</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Nationality</span>
                      <strong className="text-slate-900 block mt-1">{selectedMember.nationality || 'Ugandan'}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Gender / Sex</span>
                      <strong className="text-slate-900 block mt-1">{selectedMember.gender}</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Marital Status</span>
                      <strong className="text-slate-900 block mt-1">{selectedMember.maritalStatus}</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Tribe / Clan Association</span>
                      <strong className="text-slate-900 block mt-1">{selectedMember.clan || 'N/A'}</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Blood Group</span>
                      <strong className="text-slate-900 block mt-1 font-mono">{selectedMember.bloodGroup || 'O+'}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                      <h4 className="font-bold text-slate-800 flex items-center gap-1.5 border-b pb-1.5">
                        <Fingerprint className="w-4 h-4 text-purple-600" />
                        National Security Biometrics Support
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Biometric registration is configured. Fingerprint templates and iris profiles are securely stored in the decentralized offline JUMO UEOS security vault.
                      </p>
                      <div className="flex gap-2 pt-1">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold border border-emerald-300">
                          Fingerprint Registered
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[9px] font-bold border border-slate-300">
                          Iris Scan Deferred
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                      <h4 className="font-bold text-slate-800 flex items-center gap-1.5 border-b pb-1.5">
                        <Users className="w-4 h-4 text-purple-600" />
                        Languages Spoken & Cohort Classification
                      </h4>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {(selectedMember.languages || ['English']).map((lang, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-semibold">
                            🗣️ {lang}
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Classified under <strong>{selectedMember.ageCohort}</strong> Ministry Demographic cohort.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Residential Info & Contact */}
              {modalTab === 'residential' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Physical Street Address</span>
                      <strong className="text-slate-900 block mt-1">{selectedMember.physicalAddress || 'Namirembe Cathedral Quarters, Block A'}</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Jurisdiction / District</span>
                      <strong className="text-slate-900 block mt-1">{selectedMember.district || 'Kampala District'}</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Sovereign Geospatial Coordinates</span>
                      <strong className="text-slate-900 block mt-1 font-mono text-purple-700">{selectedMember.gpsLocation || '0.3150° N, 32.5562° E'}</strong>
                    </div>
                    <button 
                      onClick={() => alert(`Pulling up sovereign GIS land tracking grid context...`)}
                      className="px-3 py-1.5 bg-white hover:bg-white text-white font-bold rounded shadow text-[10px]"
                    >
                      View on Ecclessia GIS Map
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                    <h4 className="font-bold text-slate-800 flex items-center gap-1.5 border-b pb-1.5">
                      <GitMerge className="w-4 h-4 text-purple-600" />
                      Next of Kin & Family Roster Linkage
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Primary Contact Phone:</span>
                        <strong className="text-slate-800 font-bold block mt-0.5">{selectedMember.phone}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Secure Email Address:</span>
                        <strong className="text-slate-800 font-bold block mt-0.5 text-purple-700">{selectedMember.email}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Emergency Next of Kin:</span>
                        <strong className="text-slate-800 font-bold block mt-0.5">Walusimbi Moses Jr. (Brother)</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Education & Career */}
              {modalTab === 'career' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Highest Secular Education</span>
                      <strong className="text-slate-900 block mt-1">{selectedMember.educationLevel || 'Graduate Degree (MUK)'}</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Theological / Catechist Studies</span>
                      <strong className="text-slate-900 block mt-1 text-purple-700">
                        {selectedMember.theologicalStudies || 'Sunday School Ministry License Courses'}
                      </strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Secular Profession / Occupation</span>
                      <strong className="text-slate-900 block mt-1">{selectedMember.profession || 'Self-Employed Consultant'}</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Ministry Group Assignment</span>
                      <strong className="text-slate-900 block mt-1">{selectedMember.role || 'General Congregation Contributor'}</strong>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Skills Inventory & Voluntarism Assets</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(selectedMember.skillsInventory || ['Bible Study Lead', 'Welfare Outreaches']).map((skill, i) => (
                        <span key={i} className="px-2.5 py-1 bg-purple-50 text-purple-800 rounded border border-purple-200 font-medium">
                          🛠️ {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Sacramental History */}
              {modalTab === 'sacramental' && (
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-slate-900 to-purple-950 rounded-lg text-white flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-bold flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-300" />
                        Canonical Sacramental Register (National Cathedral Core Archive)
                      </h4>
                      <p className="text-[11px] text-slate-700 mt-0.5">
                        Cryptographically verified sacraments linked permanently to membership history ledger.
                      </p>
                    </div>
                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-400/30 text-[10px] font-mono rounded">
                      AEGIS Compliant
                    </span>
                  </div>

                  {(!selectedMember.sacramentalRecords || selectedMember.sacramentalRecords.length === 0) ? (
                    <div className="p-8 text-center text-slate-600 border-2 border-dashed border-slate-200 rounded-lg space-y-3">
                      <FileText className="w-10 h-10 mx-auto text-slate-700" />
                      <div>
                        <strong>No Verified Sacramental Records Found</strong>
                        <p className="text-slate-600 text-[11px] mt-1">This member is currently registered as a Catechumen or is undergoing baptismal classes.</p>
                      </div>
                      <button 
                        onClick={() => alert('Launching sacramental registry enrollment wizard...')}
                        className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded text-[11px]"
                      >
                        + Add Baptism or Confirmation
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {(selectedMember.sacramentalRecords ?? []).map((rec, i) => (
                        <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b pb-2">
                            <div>
                              <strong className="text-sm text-purple-900 font-bold flex items-center gap-1.5">
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                                Sacrament of {rec.sacrament}
                              </strong>
                              <span className="text-[10px] text-slate-500 block mt-0.5">Certificate Code: <strong className="font-mono">{rec.certificateNo}</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                              {rec.isAiVerified && (
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300 rounded flex items-center gap-1">
                                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                  Parish Seal Verified
                                </span>
                              )}
                              <button 
                                onClick={() => alert(`Downloading signed certificate copy for ${rec.sacrament}...`)}
                                className="px-2 py-0.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded text-[10px]"
                              >
                                📄 Export PDF
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-600">
                            <div>
                              <span className="text-slate-500 text-[10px] block">Officiating Minister:</span>
                              <strong className="text-slate-800 font-bold block mt-0.5">{rec.minister}</strong>
                            </div>
                            <div>
                              <span className="text-slate-500 text-[10px] block">Ecclesial Parish:</span>
                              <strong className="text-slate-800 font-bold block mt-0.5">{rec.parish}</strong>
                            </div>
                            <div>
                              <span className="text-slate-500 text-[10px] block">Sacrament Date:</span>
                              <strong className="text-slate-800 font-bold block mt-0.5">{rec.date}</strong>
                            </div>
                          </div>

                          <div className="p-2.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono text-slate-500 flex justify-between items-center">
                            <span>{rec.sha256Seal}</span>
                            <span className="text-emerald-700 font-bold">SHA-256 Ledger Sealed</span>
                          </div>

                          {rec.notes && (
                            <p className="text-[11px] text-slate-600 italic mt-1 bg-purple-50/50 p-2 rounded border border-purple-100">
                              Note: {rec.notes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: AI Census Insights */}
              {modalTab === 'ai' && (
                <div className="space-y-4">
                  <div className="p-4 bg-white text-white rounded-lg flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
                    <div>
                      <h4 className="font-bold text-white">Sovereign JUMO Neural Demographic Census Analysis</h4>
                      <p className="text-[11px] text-slate-700 mt-0.5">
                        Continuous analytical forecasting of attendance, financial tithing patterns, and retention risks.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-slate-500 text-[10px] block font-bold uppercase tracking-wider">Attendance Status</span>
                      <strong className={`text-lg font-bold block mt-2 ${
                        selectedMember.attendanceTrend === 'Excellent' ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {selectedMember.attendanceTrend || 'Stable'}
                      </strong>
                      <span className="text-[10px] text-slate-600 mt-1 block">Based on last 12 weeks cell telemetry</span>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-slate-500 text-[10px] block font-bold uppercase tracking-wider">Retention Probability</span>
                      <strong className="text-lg font-bold text-purple-600 block mt-2">
                        {selectedMember.retentionProbability || 94}%
                      </strong>
                      <span className="text-[10px] text-slate-600 mt-1 block">Predictive stability score</span>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-slate-500 text-[10px] block font-bold uppercase tracking-wider">Evangelism Score</span>
                      <strong className="text-lg font-bold text-cyan-600 block mt-2">
                        {selectedMember.evangelismScore || 75}/100
                      </strong>
                      <span className="text-[10px] text-slate-600 mt-1 block">Lay apostolate engagement index</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                    <h4 className="font-bold text-slate-800">AI Pastoral Outreaches recommendation</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      This member is highly active in teaching and choral ministries. The JUMO AI suggests nominating them for the upcoming Diocesan lay ministry accreditation council to further build capacity. No pastoral alerts or family attendance flags are present.
                    </p>
                    <button 
                      onClick={() => alert(`Accreditation nomination workflow initiated! Dispatching proposal to Dean canonical office.`)}
                      className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded shadow text-[10px]"
                    >
                      Disseminate lay Ministry Accreditation Nomination
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center">
              <button
                onClick={() => {
                  const updatedName = prompt("Edit Member Full Legal Name:", selectedMember.fullName);
                  if (updatedName && updatedName.trim()) {
                    setMembers(members.map(m => m.id === selectedMember.id ? { ...m, fullName: updatedName } : m));
                    setSelectedMember({ ...selectedMember, fullName: updatedName });
                    alert("Member demographic ledger records updated successfully!");
                  }
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg border border-slate-300 transition-all text-xs"
              >
                Edit Legal Bio-data
              </button>
              <button
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 bg-white hover:bg-white text-white font-bold rounded-lg transition-all text-xs"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
