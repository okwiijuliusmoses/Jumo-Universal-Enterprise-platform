import React, { useState } from 'react';
import { 
  Users, Search, Filter, Plus, Download, Printer, 
  CheckCircle2, AlertCircle, UserCheck, Building2, 
  ArrowRight, ShieldCheck, FileText, GraduationCap, 
  MapPin, Phone, User, Calendar, Edit3, X, Check,
  Award, Heart, AlertTriangle, Layers, BookOpen
} from 'lucide-react';

interface StudentProfile {
  lin: string;
  name: string;
  gender: 'M' | 'F';
  dob: string;
  classStream: string;
  boarderStatus: 'Boarding' | 'Day Scholar';
  dormitory: string;
  unebIndex: string;
  status: 'ACTIVE' | 'GRADUATED' | 'TRANSFERRED' | 'PROBATION';
  admissionDate: string;
  guardian: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
    residence: string;
  };
  academicEntry: {
    previousSchool: string;
    pleAggregate: string;
    uceAggregate?: string;
    combination?: string;
  };
  healthProfile: {
    bloodGroup: string;
    allergies: string;
    emergencyContact: string;
  };
  disciplineRemark: string;
}

export const RegistrarOffice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'STUDENTS' | 'ADMISSIONS' | 'STREAMS' | 'PROMOTION'>('STUDENTS');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('ALL');
  const [filterGender, setFilterGender] = useState('ALL');
  const [filterBoarding, setFilterBoarding] = useState('ALL');
  const [selectedLin, setSelectedLin] = useState<string>('LIN-2026-0891');
  const [isAdmitModalOpen, setIsAdmitModalOpen] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // New Student Form State
  const [newStudent, setNewStudent] = useState({
    name: '',
    gender: 'M' as 'M' | 'F',
    dob: '2010-04-12',
    classStream: 'S.1 North',
    boarderStatus: 'Boarding' as 'Boarding' | 'Day Scholar',
    guardianName: '',
    guardianPhone: '',
    previousSchool: '',
    pleAggregate: '08'
  });

  const [students, setStudents] = useState<StudentProfile[]>([
    {
      lin: 'LIN-2026-0891',
      name: 'Okello Brian',
      gender: 'M',
      dob: '2009-06-15',
      classStream: 'S.4 Sciences (East)',
      boarderStatus: 'Boarding',
      dormitory: 'Lumumba House • Room 14',
      unebIndex: 'U0892/001',
      status: 'ACTIVE',
      admissionDate: '2023-02-06',
      guardian: {
        name: 'Mzee Okello Julius',
        relationship: 'Father',
        phone: '0772-112233',
        email: 'j.okello@enterprise.ug',
        residence: 'Kampala, Ntinda Ward 4'
      },
      academicEntry: {
        previousSchool: 'St. Savio Junior School Kisubi',
        pleAggregate: '06 Div 1',
        combination: 'Physics, Chemistry, Biology, Sub-Math'
      },
      healthProfile: {
        bloodGroup: 'O+',
        allergies: 'None recorded',
        emergencyContact: '0772-112233 (Father)'
      },
      disciplineRemark: 'Exemplary conduct; Assistant House Captain for Lumumba House.'
    },
    {
      lin: 'LIN-2026-0892',
      name: 'Nakato Sarah',
      gender: 'F',
      dob: '2010-03-22',
      classStream: 'S.3 Arts (North)',
      boarderStatus: 'Day Scholar',
      dormitory: 'Non-Resident',
      unebIndex: 'PENDING INDEXATION',
      status: 'ACTIVE',
      admissionDate: '2024-02-05',
      guardian: {
        name: 'Mrs. Nakato Mary',
        relationship: 'Mother',
        phone: '0701-445566',
        email: 'm.nakato@enterprise.ug',
        residence: 'Kyambogo Estates'
      },
      academicEntry: {
        previousSchool: 'Hillside Primary School Naalya',
        pleAggregate: '07 Div 1',
        combination: 'History, Geography, Economics, Literature'
      },
      healthProfile: {
        bloodGroup: 'A+',
        allergies: 'Dust sensitivity (Inhaler on file)',
        emergencyContact: '0701-445566 (Mother)'
      },
      disciplineRemark: 'Good standing; Active member of Debate & Model UN Club.'
    },
    {
      lin: 'LIN-2026-0893',
      name: 'Kato Emmanuel',
      gender: 'M',
      dob: '2007-11-04',
      classStream: 'S.6 PCM (West)',
      boarderStatus: 'Boarding',
      dormitory: 'Mutesa House • Room 08',
      unebIndex: 'U0892/045',
      status: 'ACTIVE',
      admissionDate: '2021-02-08',
      guardian: {
        name: 'Dr. Kato Paul',
        relationship: 'Father',
        phone: '0782-998877',
        email: 'p.kato@hospital.org',
        residence: 'Entebbe Municipality'
      },
      academicEntry: {
        previousSchool: 'Kings College Budo (UCE)',
        pleAggregate: '05 Div 1',
        uceAggregate: '12 Agg (Div 1)',
        combination: 'Physics, Chemistry, Mathematics, ICT'
      },
      healthProfile: {
        bloodGroup: 'B+',
        allergies: 'None recorded',
        emergencyContact: '0782-998877 (Father)'
      },
      disciplineRemark: 'School Head Prefect 2025/2026; High leadership capability.'
    },
    {
      lin: 'LIN-2026-0894',
      name: 'Achieng Grace',
      gender: 'F',
      dob: '2011-09-18',
      classStream: 'S.2 Day (South)',
      boarderStatus: 'Day Scholar',
      dormitory: 'Non-Resident',
      unebIndex: 'PENDING INDEXATION',
      status: 'ACTIVE',
      admissionDate: '2025-02-03',
      guardian: {
        name: 'Hon. Achieng Rebecca',
        relationship: 'Mother',
        phone: '0752-332211',
        email: 'r.achieng@gov.ug',
        residence: 'Bugolobi Flats'
      },
      academicEntry: {
        previousSchool: 'Kampala Parents School',
        pleAggregate: '08 Div 1'
      },
      healthProfile: {
        bloodGroup: 'O+',
        allergies: 'Peanut allergy',
        emergencyContact: '0752-332211 (Mother)'
      },
      disciplineRemark: 'Regular attendance; Active in Music, Dance & Drama.'
    },
    {
      lin: 'LIN-2026-0895',
      name: 'Mukasa David',
      gender: 'M',
      dob: '2008-01-30',
      classStream: 'S.5 BCM (East)',
      boarderStatus: 'Boarding',
      dormitory: 'Nkrumah House • Room 02',
      unebIndex: 'U0892/102',
      status: 'ACTIVE',
      admissionDate: '2026-02-09',
      guardian: {
        name: 'Mr. Mukasa Edward',
        relationship: 'Guardian',
        phone: '0774-665544',
        email: 'e.mukasa@trade.ug',
        residence: 'Mukono Town'
      },
      academicEntry: {
        previousSchool: 'Gayaza High School Sister Center',
        pleAggregate: '07 Div 1',
        uceAggregate: '16 Agg (Div 1)',
        combination: 'Biology, Chemistry, Mathematics'
      },
      healthProfile: {
        bloodGroup: 'AB+',
        allergies: 'None recorded',
        emergencyContact: '0774-665544 (Guardian)'
      },
      disciplineRemark: 'Punctual and focused on laboratory science coursework.'
    },
    {
      lin: 'LIN-2026-0896',
      name: 'Akello Patricia',
      gender: 'F',
      dob: '2012-08-14',
      classStream: 'S.1 Blue (North)',
      boarderStatus: 'Boarding',
      dormitory: 'Nightingale Hostel • Cubicle 3',
      unebIndex: 'PENDING INDEXATION',
      status: 'ACTIVE',
      admissionDate: '2026-02-02',
      guardian: {
        name: 'Eng. Akello Francis',
        relationship: 'Father',
        phone: '0712-778899',
        email: 'f.akello@infra.ug',
        residence: 'Jinja City'
      },
      academicEntry: {
        previousSchool: 'Victoria Nile Primary School',
        pleAggregate: '06 Div 1'
      },
      healthProfile: {
        bloodGroup: 'O-',
        allergies: 'Asthma (Medical card attached)',
        emergencyContact: '0712-778899 (Father)'
      },
      disciplineRemark: 'New admission; Settling smoothly into secondary boarding.'
    }
  ]);

  const filteredStudents = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.lin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.guardian.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchClass = filterClass === 'ALL' || s.classStream.includes(filterClass);
    const matchGender = filterGender === 'ALL' || s.gender === filterGender;
    const matchBoarding = filterBoarding === 'ALL' || s.boarderStatus === filterBoarding;
    return matchSearch && matchClass && matchGender && matchBoarding;
  });

  const selectedStudent = students.find(s => s.lin === selectedLin) || students[0];

  const handleAdmitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name.trim()) return;

    const newLin = `LIN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const created: StudentProfile = {
      lin: newLin,
      name: newStudent.name,
      gender: newStudent.gender,
      dob: newStudent.dob,
      classStream: newStudent.classStream,
      boarderStatus: newStudent.boarderStatus,
      dormitory: newStudent.boarderStatus === 'Boarding' ? 'New Entrant Dormitory' : 'Non-Resident',
      unebIndex: 'PENDING INDEXATION',
      status: 'ACTIVE',
      admissionDate: new Date().toISOString().slice(0, 10),
      guardian: {
        name: newStudent.guardianName || 'Guardian On File',
        relationship: 'Parent',
        phone: newStudent.guardianPhone || '0700-000000',
        email: 'info@school.ug',
        residence: 'Central District'
      },
      academicEntry: {
        previousSchool: newStudent.previousSchool || 'Registered Primary Academy',
        pleAggregate: `${newStudent.pleAggregate} Div 1`
      },
      healthProfile: {
        bloodGroup: 'O+',
        allergies: 'None recorded',
        emergencyContact: newStudent.guardianPhone || '0700-000000'
      },
      disciplineRemark: 'Admitted in good standing for Term 1.'
    };

    setStudents(prev => [created, ...prev]);
    setSelectedLin(newLin);
    setIsAdmitModalOpen(false);
    setNotificationMsg(`Student ${created.name} successfully admitted with canonical LIN ${created.lin}.`);
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col min-h-[750px]">
      {/* Office Header */}
      <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">REGISTRAR OFFICE & ADMISSIONS</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-300">
                NCDC / LIN CERTIFIED
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Student Information System (SIS) • Canonical Learner Identification Registry • UNEB Center
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-2xs transition"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print SIS Census</span>
          </button>
          <button 
            type="button"
            onClick={() => setIsAdmitModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Admit New Student</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {notificationMsg && (
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-2.5 flex items-center justify-between text-xs text-blue-800 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{notificationMsg}</span>
          </div>
          <button type="button" onClick={() => setNotificationMsg(null)} className="text-blue-700 hover:text-blue-900">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="border-b border-slate-200 bg-white px-6 flex items-center gap-2 overflow-x-auto text-xs font-medium">
        <button
          type="button"
          onClick={() => setActiveTab('STUDENTS')}
          className={`py-3 px-3.5 border-b-2 font-bold whitespace-nowrap transition ${
            activeTab === 'STUDENTS'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Master Student Directory (SIS)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ADMISSIONS')}
          className={`py-3 px-3.5 border-b-2 font-bold whitespace-nowrap transition ${
            activeTab === 'ADMISSIONS'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Admissions Intake Register
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('STREAMS')}
          className={`py-3 px-3.5 border-b-2 font-bold whitespace-nowrap transition ${
            activeTab === 'STREAMS'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Stream & House Allocation
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('PROMOTION')}
          className={`py-3 px-3.5 border-b-2 font-bold whitespace-nowrap transition ${
            activeTab === 'PROMOTION'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Cohort Progression & UNEB Indexing
        </button>
      </div>

      {/* Split-Pane Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Pane: Master Enterprise SIS Table */}
        <div className="flex-1 border-r border-slate-200 flex flex-col bg-slate-50/30 overflow-hidden">
          {/* Table Search & Filter Toolbar */}
          <div className="p-4 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search student by name, LIN, or guardian..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-700 py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="ALL">All Classes</option>
                <option value="S.1">Senior 1</option>
                <option value="S.2">Senior 2</option>
                <option value="S.3">Senior 3</option>
                <option value="S.4">Senior 4</option>
                <option value="S.5">Senior 5</option>
                <option value="S.6">Senior 6</option>
              </select>

              <select
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-700 py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="ALL">All Genders</option>
                <option value="M">Male (M)</option>
                <option value="F">Female (F)</option>
              </select>

              <select
                value={filterBoarding}
                onChange={(e) => setFilterBoarding(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-700 py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="ALL">All Boarding Types</option>
                <option value="Boarding">Boarding</option>
                <option value="Day Scholar">Day Scholar</option>
              </select>
            </div>
          </div>

          {/* Master SIS Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/70 text-slate-600 font-semibold sticky top-0 z-10">
                  <th className="py-2.5 px-4">LIN Identifier</th>
                  <th className="py-2.5 px-4">Learner Name</th>
                  <th className="py-2.5 px-4 text-center">Gender</th>
                  <th className="py-2.5 px-4">Class & Stream</th>
                  <th className="py-2.5 px-4">Boarding Status</th>
                  <th className="py-2.5 px-4">Guardian Contact</th>
                  <th className="py-2.5 px-4">UNEB Index</th>
                  <th className="py-2.5 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-500">
                      No learner records found matching search filters.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s) => {
                    const isSelected = s.lin === selectedStudent?.lin;
                    return (
                      <tr
                        key={s.lin}
                        onClick={() => setSelectedLin(s.lin)}
                        className={`cursor-pointer transition-colors ${
                          isSelected 
                            ? 'bg-blue-50/70 hover:bg-blue-50 font-medium' 
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">
                          {s.lin}
                        </td>
                        <td className="py-3 px-4 text-slate-900">
                          <span className="font-semibold block">{s.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">DOB: {s.dob}</span>
                        </td>
                        <td className="py-3 px-4 text-center font-bold text-slate-600">
                          {s.gender}
                        </td>
                        <td className="py-3 px-4 text-slate-700">
                          {s.classStream}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          <span className={`inline-flex items-center gap-1 text-[11px] ${
                            s.boarderStatus === 'Boarding' ? 'text-indigo-700 font-medium' : 'text-slate-600'
                          }`}>
                            {s.boarderStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          <span className="block truncate max-w-[140px] font-medium">{s.guardian.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{s.guardian.phone}</span>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px]">
                          {s.unebIndex.startsWith('U') ? (
                            <span className="font-bold text-blue-700">{s.unebIndex}</span>
                          ) : (
                            <span className="text-slate-400 italic">Pending</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Status Bar */}
          <div className="border-t border-slate-200 bg-white px-4 py-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Showing {filteredStudents.length} of {students.length} learners</span>
            <span className="flex items-center gap-1.5 text-blue-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              National EMIS & LIN Registry Synchronized
            </span>
          </div>
        </div>

        {/* Right Pane: Split-Pane 360° Learner Profile Inspector */}
        <div className="w-full lg:w-[400px] bg-white flex flex-col overflow-y-auto border-t lg:border-t-0 border-slate-200">
          {selectedStudent ? (
            <div className="p-5 flex flex-col gap-5">
              {/* Profile Card Header */}
              <div className="border-b border-slate-200 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200">
                      {selectedStudent.lin}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1.5">
                      {selectedStudent.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {selectedStudent.classStream} • {selectedStudent.boarderStatus}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {selectedStudent.status}
                  </span>
                </div>
              </div>

              {/* Housing & National Index Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Dormitory / Housing:</span>
                  <span className="font-semibold text-slate-900">{selectedStudent.dormitory}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">UNEB Center Index:</span>
                  <span className="font-mono font-bold text-blue-700">{selectedStudent.unebIndex}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Admission Date:</span>
                  <span className="font-mono text-slate-700">{selectedStudent.admissionDate}</span>
                </div>
              </div>

              {/* Guardian & Residence Dossier */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Guardian & Residence</span>
                </h4>
                <div className="border border-slate-200 rounded-lg p-3 bg-white space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Primary Contact:</span>
                    <span className="font-bold text-slate-900">{selectedStudent.guardian.name} ({selectedStudent.guardian.relationship})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Phone:</span>
                    <span className="font-mono font-semibold text-slate-900">{selectedStudent.guardian.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Residence:</span>
                    <span className="text-slate-700">{selectedStudent.guardian.residence}</span>
                  </div>
                </div>
              </div>

              {/* Academic History & Entry Performance */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                  <span>Prior Academic Records</span>
                </h4>
                <div className="border border-slate-200 rounded-lg p-3 bg-white space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Previous School:</span>
                    <span className="font-semibold text-slate-900">{selectedStudent.academicEntry.previousSchool}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">PLE Performance:</span>
                    <span className="font-mono font-bold text-emerald-700">{selectedStudent.academicEntry.pleAggregate}</span>
                  </div>
                  {selectedStudent.academicEntry.combination && (
                    <div className="pt-1.5 border-t border-slate-100">
                      <span className="text-slate-500 block text-[11px]">Subject Combination:</span>
                      <span className="font-medium text-slate-900 text-xs">{selectedStudent.academicEntry.combination}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Health & Welfare Information */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-600" />
                  <span>Health & Clinic Profile</span>
                </h4>
                <div className="border border-slate-200 rounded-lg p-3 bg-white space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Blood Group:</span>
                    <span className="font-mono font-bold text-slate-900">{selectedStudent.healthProfile.bloodGroup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Allergies:</span>
                    <span className="text-slate-700 font-medium">{selectedStudent.healthProfile.allergies}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Drawer */}
              <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => alert(`Official Identity Card & LIN Certificate printed for ${selectedStudent.name}`)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-2xs transition cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Print Student ID & Dossier</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert(`EMIS record verified and synchronized with MoES Database for LIN ${selectedStudent.lin}`)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-2xs transition cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Validate with National EMIS</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              Select a learner from the directory to inspect profile.
            </div>
          )}
        </div>
      </div>

      {/* Modal: Admit New Student */}
      {isAdmitModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Admit New Learner (SIS Intake)</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAdmitModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAdmitSubmit} className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">Full Learner Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Namagembe Florence"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Gender</label>
                  <select
                    value={newStudent.gender}
                    onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value as 'M' | 'F' })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="M">Male (M)</option>
                    <option value="F">Female (F)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={newStudent.dob}
                    onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Admission Class</label>
                  <select
                    value={newStudent.classStream}
                    onChange={(e) => setNewStudent({ ...newStudent, classStream: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="S.1 North">S.1 North</option>
                    <option value="S.1 Blue">S.1 Blue</option>
                    <option value="S.2 South">S.2 South</option>
                    <option value="S.3 Arts">S.3 Arts</option>
                    <option value="S.4 Sciences">S.4 Sciences</option>
                    <option value="S.5 BCM">S.5 BCM</option>
                    <option value="S.6 PCM">S.6 PCM</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Boarding Cadre</label>
                  <select
                    value={newStudent.boarderStatus}
                    onChange={(e) => setNewStudent({ ...newStudent, boarderStatus: e.target.value as 'Boarding' | 'Day Scholar' })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Boarding">Boarding</option>
                    <option value="Day Scholar">Day Scholar</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Guardian Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Eng. Namagembe S."
                    value={newStudent.guardianName}
                    onChange={(e) => setNewStudent({ ...newStudent, guardianName: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Guardian Phone</label>
                  <input
                    type="text"
                    placeholder="0770-000000"
                    value={newStudent.guardianPhone}
                    onChange={(e) => setNewStudent({ ...newStudent, guardianPhone: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Previous Primary School</label>
                  <input
                    type="text"
                    placeholder="e.g. Mugwanya Prep School"
                    value={newStudent.previousSchool}
                    onChange={(e) => setNewStudent({ ...newStudent, previousSchool: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">PLE Aggregate</label>
                  <input
                    type="text"
                    placeholder="e.g. 06"
                    value={newStudent.pleAggregate}
                    onChange={(e) => setNewStudent({ ...newStudent, pleAggregate: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdmitModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                >
                  Enroll & Generate LIN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
