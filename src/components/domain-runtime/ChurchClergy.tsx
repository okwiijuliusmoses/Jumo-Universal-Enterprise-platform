import React, { useState } from 'react';
import { 
  Award, ShieldCheck, BookOpen, Plus, UserCheck, Calendar, Activity, 
  MapPin, Archive, RefreshCw, CheckCircle, Heart, Key, Lock, Briefcase,
  GraduationCap, Users, User, Compass, FileText, Scale, CheckCircle2, AlertTriangle
} from 'lucide-react';

interface ClergyProfile {
  id: string;
  name: string;
  role: string;
  licenseId: string;
  ordinationDate: string;
  assignedParish: string;
  qualification: string;
  pensionVolume: number;
  welfareAllocated: number;
  status: 'ACTIVE_LICENSED' | 'SUSPENDED' | 'RETIRED';
  medicalCoverTier: 'Gold' | 'Platinum' | 'Standard';
  pensionStatus: 'Active Posting' | 'Deferred' | 'Fully Disbursed';
  transferHistory: { date: string; parish: string; role: string }[];
}

interface LayReader {
  id: string;
  name: string;
  ministryType: 'Lay Reader' | 'Evangelist' | 'Choir Leader' | "Mothers' Union Lead" | 'Youth Coordinator';
  licenseNo: string;
  commissionedDate: string;
  assignedParish: string;
  deploymentStatus: 'ACTIVE' | 'ON_LEAVE' | 'DEFERRED';
  pensionEligibility: boolean;
  medicalCoverTier: 'Basic' | 'Premium' | 'None';
  accreditationLevel: 'Diocesan' | 'Parish' | 'Provincial';
}

interface Seminarian {
  id: string;
  name: string;
  theologicalInstitution: string;
  academicYear: string;
  sponsoringParish: string;
  currentPhase: 'Discernment' | 'Academic Training' | 'Field Internship' | 'Deaconate Candidate';
  expectedOrdinationDate: string;
  academicGpa: number;
  mentorClergy: string;
  bursaryAllocated: number;
}

export const ChurchClergy: React.FC = () => {
  const [clergy, setClergy] = useState<ClergyProfile[]>([
    {
      id: 'CLG-001',
      name: 'Right Rev. Moses Banja',
      role: 'Diocesan Bishop',
      licenseId: 'LIC-1994-BANJA',
      ordinationDate: '1994-06-12',
      assignedParish: 'Namirembe Diocesan Bishop Synod & Headquarters',
      qualification: 'Doctor of Ministry (D.Min) - Trinity College Dublin',
      pensionVolume: 42000,
      welfareAllocated: 1200,
      status: 'ACTIVE_LICENSED',
      medicalCoverTier: 'Platinum',
      pensionStatus: 'Active Posting',
      transferHistory: [
        { date: '1994-06-12', parish: 'St. Jude Mission Outpost', role: 'Parish Priest' },
        { date: '2008-05-10', parish: 'St. Paul Cathedral', role: 'Archdeacon' },
        { date: '2023-11-20', parish: 'Namirembe Diocesan Headquarters', role: 'Diocesan Bishop' }
      ]
    },
    {
      id: 'CLG-002',
      name: 'Very Rev. Canon Jonathan Kisawuzi',
      role: 'Dean of the Cathedral',
      licenseId: 'LIC-2001-KISAW',
      ordinationDate: '2001-08-19',
      assignedParish: 'St. Paul Diocesan Cathedral Parish, Namirembe',
      qualification: 'Master of Sacred Theology (S.T.M.) - Yale Divinity School',
      pensionVolume: 28000,
      welfareAllocated: 800,
      status: 'ACTIVE_LICENSED',
      medicalCoverTier: 'Gold',
      pensionStatus: 'Active Posting',
      transferHistory: [
        { date: '2001-08-19', parish: 'Kampala Chapter Outpost', role: 'Curate' },
        { date: '2015-09-01', parish: 'St. Paul Cathedral', role: 'Dean of Cathedral' }
      ]
    },
    {
      id: 'CLG-003',
      name: 'Rev. Emmanuel Mukasa',
      role: 'Cathedral Vicar & Priest-in-charge',
      licenseId: 'LIC-2010-MUKAS',
      ordinationDate: '2010-11-05',
      assignedParish: 'St. Jude Mission Outpost, Parish Mission',
      qualification: 'Bachelor of Divinity (B.Div) - Uganda Christian University',
      pensionVolume: 18500,
      welfareAllocated: 500,
      status: 'ACTIVE_LICENSED',
      medicalCoverTier: 'Standard',
      pensionStatus: 'Active Posting',
      transferHistory: [
        { date: '2010-11-05', parish: 'Mbarara Parish Outpost', role: 'Vicar' },
        { date: '2021-02-15', parish: 'St. Jude Mission Outpost', role: 'Vicar' }
      ]
    }
  ]);

  const [layReaders, setLayReaders] = useState<LayReader[]>([
    {
      id: 'LAY-001',
      name: 'Brother Samuel Ssewankambo',
      role: 'Sunday School Lead', // for fallback
      ministryType: 'Lay Reader',
      licenseNo: 'LAY-LIC-2022-091',
      commissionedDate: '2022-01-15',
      assignedParish: 'St. Paul Cathedral Parish, Namirembe',
      deploymentStatus: 'ACTIVE',
      pensionEligibility: true,
      medicalCoverTier: 'Premium',
      accreditationLevel: 'Diocesan'
    } as any,
    {
      id: 'LAY-002',
      name: 'Sister Agnes Nakato',
      role: 'Evangelist Lead',
      ministryType: 'Evangelist',
      licenseNo: 'LAY-LIC-2024-112',
      commissionedDate: '2024-03-20',
      assignedParish: 'St. Jude Mission Outpost',
      deploymentStatus: 'ACTIVE',
      pensionEligibility: false,
      medicalCoverTier: 'Basic',
      accreditationLevel: 'Provincial'
    } as any
  ]);

  const [seminarians, setSeminarians] = useState<Seminarian[]>([
    {
      id: 'SEM-001',
      name: 'Candidate Peter Okello Jr.',
      theologicalInstitution: 'Uganda Christian University (Bishop Tucker School)',
      academicYear: 'Year III (Finalist)',
      sponsoringParish: 'Soroti Cathedral Parish',
      currentPhase: 'Field Internship',
      expectedOrdinationDate: '2026-11-29',
      academicGpa: 3.82,
      mentorClergy: 'Very Rev. Canon Jonathan Kisawuzi',
      bursaryAllocated: 1500
    },
    {
      id: 'SEM-002',
      name: 'Candidate Grace Atim',
      theologicalInstitution: 'Namirembe Divinity College',
      academicYear: 'Year II',
      sponsoringParish: 'St. Jude Mission Outpost',
      currentPhase: 'Academic Training',
      expectedOrdinationDate: '2027-11-28',
      academicGpa: 3.65,
      mentorClergy: 'Rev. Emmanuel Mukasa',
      bursaryAllocated: 1200
    }
  ]);

  // Form states
  const [newClergy, setNewClergy] = useState({
    name: '',
    role: 'Parish Vicar',
    ordinationDate: '',
    qualification: 'Bachelor of Divinity (B.Div)',
    initialParish: '',
    licenseId: ''
  });

  const [newLay, setNewLay] = useState({
    name: '',
    ministryType: 'Lay Reader' as any,
    licenseNo: '',
    commissionedDate: '',
    assignedParish: '',
    medicalCoverTier: 'Basic' as any,
    accreditationLevel: 'Diocesan' as any
  });

  const [newSem, setNewSem] = useState({
    name: '',
    theologicalInstitution: 'Uganda Christian University (Bishop Tucker School)',
    academicYear: 'Year I',
    sponsoringParish: '',
    currentPhase: 'Discernment' as any,
    expectedOrdinationDate: '',
    academicGpa: 3.5,
    mentorClergy: 'Right Rev. Moses Banja',
    bursaryAllocated: 1000
  });

  const [transferState, setTransferState] = useState({
    clergyId: '',
    destinationParish: '',
    newRole: 'Parish Vicar',
    effectiveDate: ''
  });

  const [selectedClergyId, setSelectedClergyId] = useState<string>('CLG-001');
  const [subTab, setSubTab] = useState<'roster' | 'lay_readers' | 'seminarians' | 'transfer' | 'welfare'>('roster');

  const handleEnrollClergy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClergy.name.trim() || !newClergy.ordinationDate) return;

    const added: ClergyProfile = {
      id: `CLG-00${clergy.length + 1}`,
      name: newClergy.name,
      role: newClergy.role,
      licenseId: newClergy.licenseId || `LIC-${newClergy.ordinationDate.substring(0, 4)}-${newClergy.name.substring(0, 5).toUpperCase()}`,
      ordinationDate: newClergy.ordinationDate,
      assignedParish: newClergy.initialParish || 'Unassigned Outpost',
      qualification: newClergy.qualification,
      pensionVolume: 5000,
      welfareAllocated: 200,
      status: 'ACTIVE_LICENSED',
      medicalCoverTier: 'Standard',
      pensionStatus: 'Active Posting',
      transferHistory: [
        { date: newClergy.ordinationDate, parish: newClergy.initialParish || 'Unassigned Outpost', role: newClergy.role }
      ]
    };

    setClergy([...clergy, added]);
    setNewClergy({
      name: '',
      role: 'Parish Vicar',
      ordinationDate: '',
      qualification: 'Bachelor of Divinity (B.Div)',
      initialParish: '',
      licenseId: ''
    });
    alert(`Ordination credentials and license recorded for: ${added.name}`);
  };

  const handleProcessTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferState.clergyId || !transferState.destinationParish) return;

    setClergy(clergy.map(clg => {
      if (clg.id === transferState.clergyId) {
        return {
          ...clg,
          assignedParish: transferState.destinationParish,
          role: transferState.newRole,
          transferHistory: [
            ...clg.transferHistory,
            {
              date: transferState.effectiveDate || new Date().toISOString().substring(0, 10),
              parish: transferState.destinationParish,
              role: transferState.newRole
            }
          ]
        };
      }
      return clg;
    }));

    alert(`Ecclesiastical transfer successfully registered and signed! Roster updated.`);
    setTransferState({
      clergyId: '',
      destinationParish: '',
      newRole: 'Parish Vicar',
      effectiveDate: ''
    });
  };

  const selectedProfile = clergy.find(c => c.id === selectedClergyId) || clergy[0];

  return (
    <div className="space-y-6">
      {/* Tab Selectors */}
      <div className="flex border-b border-slate-200 overflow-x-auto">
        <button
          onClick={() => setSubTab('roster')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
            subTab === 'roster' ? 'border-purple-600 text-purple-700 bg-white/40' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4 text-purple-600" />
          Clergy Roster & Credentials
        </button>
        <button
          onClick={() => setSubTab('lay_readers')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
            subTab === 'lay_readers' ? 'border-purple-600 text-purple-700 bg-white/40' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 text-purple-600" />
          Lay Readers & Licensed Ministries
        </button>
        <button
          onClick={() => setSubTab('seminarians')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
            subTab === 'seminarians' ? 'border-purple-600 text-purple-700 bg-white/40' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-purple-600" />
          Seminarians & Training Lifecycle
        </button>
        <button
          onClick={() => setSubTab('transfer')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
            subTab === 'transfer' ? 'border-purple-600 text-purple-700 bg-white/40' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <RefreshCw className="w-4 h-4 text-purple-600" />
          Parish Transfers & Assignments
        </button>
        <button
          onClick={() => setSubTab('welfare')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
            subTab === 'welfare' ? 'border-purple-600 text-purple-700 bg-white/40' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Heart className="w-4 h-4 text-purple-600" />
          Welfare & Pension Allocations
        </button>
      </div>

      {subTab === 'lay_readers' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enroll Lay Leader Form */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
              <UserCheck className="w-4 h-4 text-purple-600" />
              Commission Lay Leader
            </h3>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (!newLay.name.trim() || !newLay.commissionedDate) return;
                const added: LayReader = {
                  id: `LAY-00${layReaders.length + 1}`,
                  name: newLay.name,
                  ministryType: newLay.ministryType,
                  licenseNo: newLay.licenseNo || `LAY-LIC-${newLay.commissionedDate.substring(0, 4)}-${Math.floor(100+Math.random()*900)}`,
                  commissionedDate: newLay.commissionedDate,
                  assignedParish: newLay.assignedParish || 'Parish Congregation',
                  deploymentStatus: 'ACTIVE',
                  pensionEligibility: true,
                  medicalCoverTier: newLay.medicalCoverTier,
                  accreditationLevel: newLay.accreditationLevel
                };
                setLayReaders([...layReaders, added]);
                setNewLay({
                  name: '',
                  ministryType: 'Lay Reader',
                  licenseNo: '',
                  commissionedDate: '',
                  assignedParish: '',
                  medicalCoverTier: 'Basic',
                  accreditationLevel: 'Diocesan'
                });
                alert(`Lay Ministry credentials authorized and commissioned for: ${added.name}`);
              }} 
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={newLay.name}
                  onChange={(e) => setNewLay({ ...newLay, name: e.target.value })}
                  placeholder="e.g. Sister Joyce Namaganda"
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Ministry Specialty</label>
                  <select
                    value={newLay.ministryType}
                    onChange={(e) => setNewLay({ ...newLay, ministryType: e.target.value as any })}
                    className="w-full p-2 rounded border border-slate-300 bg-white"
                  >
                    <option value="Lay Reader">Lay Reader</option>
                    <option value="Evangelist">Evangelist</option>
                    <option value="Choir Leader">Choir Leader</option>
                    <option value="Mothers' Union Lead">Mothers' Union Lead</option>
                    <option value="Youth Coordinator">Youth Coordinator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">License Code</label>
                  <input
                    type="text"
                    value={newLay.licenseNo}
                    onChange={(e) => setNewLay({ ...newLay, licenseNo: e.target.value })}
                    placeholder="LAY-LIC-2026-X"
                    className="w-full p-2 rounded border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Accreditation Scope</label>
                  <select
                    value={newLay.accreditationLevel}
                    onChange={(e) => setNewLay({ ...newLay, accreditationLevel: e.target.value as any })}
                    className="w-full p-2 rounded border border-slate-300 bg-white"
                  >
                    <option value="Diocesan">Diocesan Council</option>
                    <option value="Parish">Parish Board</option>
                    <option value="Provincial">Provincial Synod</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Medical Tier</label>
                  <select
                    value={newLay.medicalCoverTier}
                    onChange={(e) => setNewLay({ ...newLay, medicalCoverTier: e.target.value as any })}
                    className="w-full p-2 rounded border border-slate-300 bg-white"
                  >
                    <option value="Basic">Basic Health</option>
                    <option value="Premium">Premium Health</option>
                    <option value="None">No Cover</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Assigned Parish Outpost</label>
                <input
                  type="text"
                  value={newLay.assignedParish}
                  onChange={(e) => setNewLay({ ...newLay, assignedParish: e.target.value })}
                  placeholder="e.g. St. Jude Mission Outpost"
                  className="w-full p-2 rounded border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Commissioning / Solemn Date</label>
                <input
                  type="date"
                  value={newLay.commissionedDate}
                  onChange={(e) => setNewLay({ ...newLay, commissionedDate: e.target.value })}
                  className="w-full p-2 rounded border border-slate-300 bg-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded shadow transition-all text-xs"
              >
                + Deploy Commissioned Lay Leader
              </button>
            </form>
          </div>

          {/* Lay Readers Roster */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-purple-600" />
                Commissioned Lay Readers & Evangelists Registry
              </h3>
              <p className="text-xs text-slate-500">Lay professionals licensed by the bishop to support liturgical worship and mission execution.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {layReaders.map((lay) => (
                <div key={lay.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3 text-xs">
                  <div className="flex justify-between items-start border-b pb-2">
                    <div>
                      <strong className="text-slate-900 font-bold block">{lay.name}</strong>
                      <span className="text-[10px] font-mono text-cyan-700 bg-cyan-100 px-1.5 py-0.2 rounded font-bold mt-1 inline-block">
                        {lay.ministryType}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">
                      {lay.deploymentStatus}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-slate-600">
                    <p>Accreditation: <strong className="text-slate-800">{lay.accreditationLevel} Level</strong></p>
                    <p>License ID: <strong className="font-mono text-slate-800">{lay.licenseNo}</strong></p>
                    <p>Assigned to: <strong className="text-purple-700 font-bold">{lay.assignedParish}</strong></p>
                    <p className="flex items-center gap-2 mt-1">
                      <span className="px-1.5 py-0.2 bg-slate-200 rounded text-[9px] text-slate-700">
                        Medical: <strong>{lay.medicalCoverTier}</strong>
                      </span>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] ${lay.pensionEligibility ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}`}>
                        Pension: <strong>{lay.pensionEligibility ? 'Eligible' : 'Ineligible'}</strong>
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-2 pt-1 border-t">
                    <button
                      onClick={() => {
                        setLayReaders(layReaders.map(l => l.id === lay.id ? { ...l, deploymentStatus: l.deploymentStatus === 'ACTIVE' ? 'ON_LEAVE' : 'ACTIVE' } : l));
                        alert(`Deployment status updated for: ${lay.name}`);
                      }}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 border rounded font-semibold text-[10px] text-slate-700"
                    >
                      Toggle Status
                    </button>
                    <button
                      onClick={() => alert(`Issuing formal Bishop's Liturgical Licence for ${lay.name}`)}
                      className="px-2.5 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded font-bold text-[10px]"
                    >
                      📄 Issue Licence File
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {subTab === 'seminarians' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sponsoring Form */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
              <GraduationCap className="w-4 h-4 text-purple-600" />
              Enroll Sponsoring Seminarian
            </h3>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (!newSem.name.trim() || !newSem.expectedOrdinationDate) return;
                const added: Seminarian = {
                  id: `SEM-00${seminarians.length + 1}`,
                  name: newSem.name,
                  theologicalInstitution: newSem.theologicalInstitution,
                  academicYear: newSem.academicYear,
                  sponsoringParish: newSem.sponsoringParish || 'Diocesan Headquarters',
                  currentPhase: newSem.currentPhase,
                  expectedOrdinationDate: newSem.expectedOrdinationDate,
                  academicGpa: Number(newSem.academicGpa),
                  mentorClergy: newSem.mentorClergy,
                  bursaryAllocated: Number(newSem.bursaryAllocated)
                };
                setSeminarians([...seminarians, added]);
                setNewSem({
                  name: '',
                  theologicalInstitution: 'Uganda Christian University (Bishop Tucker School)',
                  academicYear: 'Year I',
                  sponsoringParish: '',
                  currentPhase: 'Discernment',
                  expectedOrdinationDate: '',
                  academicGpa: 3.5,
                  mentorClergy: 'Right Rev. Moses Banja',
                  bursaryAllocated: 1000
                });
                alert(`Theological training profile created for Candidate: ${added.name}`);
              }} 
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Seminarian Name</label>
                <input
                  type="text"
                  value={newSem.name}
                  onChange={(e) => setNewSem({ ...newSem, name: e.target.value })}
                  placeholder="e.g. Candidate John Walusimbi"
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Theological Institution</label>
                <select
                  value={newSem.theologicalInstitution}
                  onChange={(e) => setNewSem({ ...newSem, theologicalInstitution: e.target.value })}
                  className="w-full p-2 rounded border border-slate-300 bg-white"
                >
                  <option value="Uganda Christian University (Bishop Tucker School)">UCU Bishop Tucker School</option>
                  <option value="Namirembe Divinity College">Namirembe Divinity College</option>
                  <option value="Mukono Theological College">Mukono Theological College</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Academic Year</label>
                  <select
                    value={newSem.academicYear}
                    onChange={(e) => setNewSem({ ...newSem, academicYear: e.target.value })}
                    className="w-full p-2 rounded border border-slate-300 bg-white"
                  >
                    <option value="Year I">Year I</option>
                    <option value="Year II">Year II</option>
                    <option value="Year III (Finalist)">Year III (Finalist)</option>
                    <option value="Postgraduate Diploma">Postgrad Diploma</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Training Phase</label>
                  <select
                    value={newSem.currentPhase}
                    onChange={(e) => setNewSem({ ...newSem, currentPhase: e.target.value as any })}
                    className="w-full p-2 rounded border border-slate-300 bg-white"
                  >
                    <option value="Discernment">Discernment</option>
                    <option value="Academic Training">Academic Training</option>
                    <option value="Field Internship">Field Internship</option>
                    <option value="Deaconate Candidate">Deaconate Candidate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Current GPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1.0"
                    max="4.0"
                    value={newSem.academicGpa}
                    onChange={(e) => setNewSem({ ...newSem, academicGpa: Number(e.target.value) })}
                    className="w-full p-2 rounded border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Bursary Allocation ($)</label>
                  <input
                    type="number"
                    value={newSem.bursaryAllocated}
                    onChange={(e) => setNewSem({ ...newSem, bursaryAllocated: Number(e.target.value) })}
                    className="w-full p-2 rounded border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Sponsoring Parish</label>
                  <input
                    type="text"
                    value={newSem.sponsoringParish}
                    onChange={(e) => setNewSem({ ...newSem, sponsoringParish: e.target.value })}
                    placeholder="Sponsoring Parish"
                    className="w-full p-2 rounded border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Estimated Ordination</label>
                  <input
                    type="date"
                    value={newSem.expectedOrdinationDate}
                    onChange={(e) => setNewSem({ ...newSem, expectedOrdinationDate: e.target.value })}
                    className="w-full p-2 rounded border border-slate-300 bg-white"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded shadow transition-all text-xs"
              >
                Enroll & Allocate Bursary
              </button>
            </form>
          </div>

          {/* Seminarians Tracking List */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-purple-600" />
                Diocesan Seminarians & Academic Tracking Lifecycle
              </h3>
              <p className="text-xs text-slate-500">Candidates sponsored for theological ordination studies in licensed divinity schools.</p>
            </div>

            <div className="space-y-4">
              {seminarians.map((sem) => {
                const phases = ['Discernment', 'Academic Training', 'Field Internship', 'Deaconate Candidate'];
                const currentIdx = phases.indexOf(sem.currentPhase);
                return (
                  <div key={sem.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2">
                      <div>
                        <strong className="text-slate-900 font-bold text-sm block">{sem.name}</strong>
                        <span className="text-[10px] text-slate-500 mt-1 block">
                          Institution: <span className="text-slate-800 font-semibold">{sem.theologicalInstitution} ({sem.academicYear})</span>
                        </span>
                      </div>
                      <div className="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded font-semibold text-[10px]">
                          GPA: {sem.academicGpa}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono block">Bursary: <strong>${sem.bursaryAllocated}/sem</strong></span>
                      </div>
                    </div>

                    {/* Horizontal Visual Process Stepper */}
                    <div>
                      <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500 block mb-2">Ecclesiastical Training Progress</span>
                      <div className="grid grid-cols-4 gap-1">
                        {phases.map((ph, idx) => {
                          const isDone = idx < currentIdx;
                          const isCurrent = idx === currentIdx;
                          return (
                            <div key={ph} className="space-y-1">
                              <div className={`h-1.5 rounded-full transition-all ${
                                isDone ? 'bg-emerald-500' : isCurrent ? 'bg-purple-600 animate-pulse' : 'bg-slate-200'
                              }`} />
                              <span className={`text-[8px] font-medium block text-center truncate ${
                                isCurrent ? 'text-purple-900 font-bold' : isDone ? 'text-slate-700' : 'text-slate-600'
                              }`}>{ph}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pt-2 border-t text-slate-500">
                      <div>
                        <span>Sponsoring Parish: <strong>{sem.sponsoringParish}</strong></span>
                        <span className="mx-2">•</span>
                        <span>Estimated Ordination: <strong className="font-mono text-slate-800">{sem.expectedOrdinationDate}</strong></span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const nextStage = phases[currentIdx + 1];
                            if (nextStage) {
                              setSeminarians(seminarians.map(s => s.id === sem.id ? { ...s, currentPhase: nextStage as any } : s));
                              alert(`Advanced Candidate ${sem.name} to training stage: ${nextStage}`);
                            } else {
                              alert(`Candidate ${sem.name} has completed academic phases. Candidate is fully prepared for Diaconal & Priestly Ordination!`);
                            }
                          }}
                          className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded text-[10px]"
                        >
                          Advance Phase
                        </button>
                        <button
                          onClick={() => alert(`Reviewing academic transcripts for ${sem.name} with Dean of Studies.`)}
                          className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded font-semibold text-[10px]"
                        >
                          📄 View Grades
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {subTab === 'roster' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enroll clergy */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              Enroll Ordained Minister
            </h3>
            <form onSubmit={handleEnrollClergy} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Clergy Legal Name</label>
                <input
                  type="text"
                  value={newClergy.name}
                  onChange={(e) => setNewClergy({ ...newClergy, name: e.target.value })}
                  placeholder="e.g. Rev. Canon David Ochieng"
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Ecclesiastical Title</label>
                  <select
                    value={newClergy.role}
                    onChange={(e) => setNewClergy({ ...newClergy, role: e.target.value })}
                    className="w-full p-2 rounded border border-slate-300 bg-white"
                  >
                    <option value="Parish Vicar">Parish Vicar</option>
                    <option value="Curate & Assistant">Curate & Assistant</option>
                    <option value="Archdeacon">Archdeacon</option>
                    <option value="Canon Scholar">Canon Scholar</option>
                    <option value="Lay catechist">Lay Catechist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Licence Registration ID</label>
                  <input
                    type="text"
                    value={newClergy.licenseId}
                    onChange={(e) => setNewClergy({ ...newClergy, licenseId: e.target.value })}
                    placeholder="e.g. LIC-2012-OCHIE"
                    className="w-full p-2 rounded border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Ordination Date</label>
                <input
                  type="date"
                  value={newClergy.ordinationDate}
                  onChange={(e) => setNewClergy({ ...newClergy, ordinationDate: e.target.value })}
                  className="w-full p-2 rounded border border-slate-300 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Theological Qualifications</label>
                <input
                  type="text"
                  value={newClergy.qualification}
                  onChange={(e) => setNewClergy({ ...newClergy, qualification: e.target.value })}
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Initial Parish Assignment</label>
                <input
                  type="text"
                  value={newClergy.initialParish}
                  onChange={(e) => setNewClergy({ ...newClergy, initialParish: e.target.value })}
                  placeholder="e.g. St. Jude Mission Outpost"
                  className="w-full p-2 rounded border border-slate-300"
                />
              </div>

              <div className="p-3 bg-purple-50 rounded border border-purple-200 text-purple-950">
                <strong>Diocesan Seal Security:</strong> Recording credentials writes them instantly to the AEGIS sovereign registry.
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded shadow transition-all"
              >
                Enroll & License Clergy
              </button>
            </form>
          </div>

          {/* Roster ledger */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
            <div className="border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                Licensed Clergy & Bishop's Registry
              </h3>
              <p className="text-xs text-slate-500">Ordained ministers active within diocesan parish structures.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                {clergy.map(clg => {
                  const isSelected = selectedClergyId === clg.id;
                  return (
                    <button
                      key={clg.id}
                      onClick={() => setSelectedClergyId(clg.id)}
                      className={`w-full p-3.5 rounded-lg border text-left transition-all flex justify-between items-start ${
                        isSelected
                          ? 'border-purple-500 bg-purple-50/50 shadow-sm ring-1 ring-purple-500'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs">
                        <strong className="text-slate-900 font-bold block">{clg.name}</strong>
                        <span className="text-[10px] font-mono text-purple-700 bg-purple-100 px-1.5 py-0.2 rounded font-bold mt-1 inline-block">
                          {clg.role}
                        </span>
                        <span className="text-slate-500 text-[11px] block mt-1">Assignment: {clg.assignedParish}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Clergy profile details */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs">
                <div className="border-b pb-2">
                  <strong className="text-slate-900 font-bold block">{selectedProfile.name}</strong>
                  <span className="text-[10px] text-slate-500 font-mono">License ID: {selectedProfile.licenseId}</span>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-slate-500 block">Theological Qualifications:</span>
                    <strong className="text-slate-800 block">{selectedProfile.qualification}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Ordination Date:</span>
                    <strong className="text-slate-800 block">{selectedProfile.ordinationDate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Active Assignment:</span>
                    <strong className="text-slate-800 block text-purple-700">{selectedProfile.assignedParish}</strong>
                  </div>
                </div>

                <div className="border-t pt-3 space-y-2">
                  <strong className="text-slate-700 block text-[11px]">Ecclesiastical History:</strong>
                  <div className="space-y-1.5">
                    {selectedProfile.transferHistory.map((hist, i) => (
                      <div key={i} className="flex justify-between items-start p-1.5 bg-white border rounded">
                        <div>
                          <strong className="text-slate-800 font-bold block text-[10px]">{hist.parish}</strong>
                          <span className="text-slate-500 text-[9px]">{hist.role}</span>
                        </div>
                        <span className="text-slate-600 font-mono text-[9px]">{hist.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {subTab === 'transfer' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-purple-600 animate-spin" style={{ animationDuration: '4s' }} />
              Initiate Clergy Transfer & Archdeaconry Assignment
            </h3>
            <p className="text-xs text-slate-500">Sign transfers of vicar mandates and parish responsibilities.</p>
          </div>

          <form onSubmit={handleProcessTransfer} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Clergy Selected for Transfer</label>
                <select
                  value={transferState.clergyId}
                  onChange={(e) => setTransferState({ ...transferState, clergyId: e.target.value })}
                  className="w-full p-2.5 rounded border border-slate-300 bg-white"
                  required
                >
                  <option value="">-- Select Clergy --</option>
                  {clergy.map(clg => (
                    <option key={clg.id} value={clg.id}>{clg.name} ({clg.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Destination Parish / Diocese Office</label>
                <input
                  type="text"
                  value={transferState.destinationParish}
                  onChange={(e) => setTransferState({ ...transferState, destinationParish: e.target.value })}
                  placeholder="e.g. St. Paul Cathedral, Namirembe"
                  className="w-full p-2.5 rounded border border-slate-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">New Ecclesiastical Assignment Title</label>
                <select
                  value={transferState.newRole}
                  onChange={(e) => setTransferState({ ...transferState, newRole: e.target.value })}
                  className="w-full p-2.5 rounded border border-slate-300 bg-white"
                >
                  <option value="Parish Vicar">Parish Vicar</option>
                  <option value="Archdeacon">Archdeacon</option>
                  <option value="Curate & Assistant">Curate & Assistant</option>
                  <option value="Diocesan Chancellor">Diocesan Chancellor</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Effective Transfer Date</label>
                <input
                  type="date"
                  value={transferState.effectiveDate}
                  onChange={(e) => setTransferState({ ...transferState, effectiveDate: e.target.value })}
                  className="w-full p-2.5 rounded border border-slate-300 bg-white"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2 border-t pt-4">
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-200 text-purple-900 space-y-2 flex items-start gap-3">
                <Key className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong>Bishop Dual-Signature Mandated:</strong>
                  <p className="text-[11px] leading-relaxed mt-1">
                    To activate parish transfers, the Diocesan Bishop and Chancellor keys must authorize the transaction, ensuring canonical alignment and pension-continuity compliance.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded shadow-md transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4.5 h-4.5" /> Sign & Enforce Parish Transfer Decree
              </button>
            </div>
          </form>
        </div>
      )}

      {subTab === 'welfare' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <div className="border-b pb-3 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-purple-600" />
                Clergy Welfare, Healthcare & Pension Portfolios
              </h3>
              <p className="text-xs text-slate-500">Provincial pension provisions and emergency medical welfare buffers.</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-mono font-bold">
              Total Clergy Assets Ledger: $88,500.00
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Clergy Name</th>
                  <th className="py-2.5 px-3">Role Designation</th>
                  <th className="py-2.5 px-3 text-right">Provincial Pension Volume</th>
                  <th className="py-2.5 px-3 text-right">Monthly Welfare Allowance</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                  <th className="py-2.5 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs">
                {clergy.map(clg => (
                  <tr key={clg.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-sans font-bold text-slate-900">{clg.name}</td>
                    <td className="py-3 px-3 font-sans font-semibold text-purple-700">{clg.role}</td>
                    <td className="py-3 px-3 text-right font-bold">${clg.pensionVolume.toLocaleString()}.00</td>
                    <td className="py-3 px-3 text-right font-bold text-emerald-700">${clg.welfareAllocated.toLocaleString()}.00</td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        PENSION_ACTIVE
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-sans">
                      <button
                        onClick={() => alert(`Pension statement generated for ${clg.name}. Dispatched to ${clg.name}'s verified communication channel.`)}
                        className="px-2 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 text-[10px] hover:bg-slate-200 transition-all font-semibold"
                      >
                        Issue Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
