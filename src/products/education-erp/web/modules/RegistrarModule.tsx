import React, { useState } from 'react';
import { 
  Users, UserPlus, Search, Filter, MoreHorizontal, 
  GraduationCap, MapPin, X, CheckCircle, Award, 
  Layers, Settings, FileText, Check, AlertCircle, Eye, Info
} from 'lucide-react';
import { EducationErpService } from '../../domain/EducationErpService';
import { EdErpStudentProfile, EdErpApplication, EducationTemplate } from '../../domain/types';

export const RegistrarModule: React.FC = () => {
  const service = EducationErpService.getInstance();
  const [activeTab, setActiveTab] = useState<'STUDENTS' | 'APPLICATIONS' | 'CURRICULUM' | 'CONFIG'>('STUDENTS');
  
  // Service Subscriptions
  const [students, setStudents] = useState<EdErpStudentProfile[]>(service.getStudents());
  const [applications, setApplications] = useState<EdErpApplication[]>(service.getApplications());
  const [config, setConfig] = useState(service.getConfig());
  const programmes = service.getProgrammes();
  const courses = service.getCourses();

  // Filters and queries
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCampus, setFilterCampus] = useState('ALL');

  // Student Admission Form Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [programmeId, setProgrammeId] = useState('BSc Computer Science');
  const [campus, setCampus] = useState('Platform Hub 01');
  const [currentSemester, setCurrentSemester] = useState('SEM_1');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');

  // Application Form Modal
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [appFullName, setAppFullName] = useState('');
  const [appEmail, setAppEmail] = useState('');
  const [appPhone, setAppPhone] = useState('');
  const [appProg, setAppProg] = useState('BSc Computer Science');
  const [appLevel, setAppLevel] = useState<EducationTemplate>('UNIVERSITY');
  const [appGuardianName, setAppGuardianName] = useState('');
  const [appGuardianPhone, setAppGuardianPhone] = useState('');
  const [docBirth, setDocBirth] = useState(true);
  const [docTranscript, setDocTranscript] = useState(false);

  const handleAdmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return alert('Student Name is required.');
    if (!regNumber.trim()) return alert('Registration number is required.');

    try {
      const added = service.admitStudent({
        regNumber,
        fullName,
        programmeId,
        campus,
        currentSemesterOrTerm: currentSemester,
        guardianName: guardianName || undefined,
        guardianPhone: guardianPhone || undefined,
        attendanceRate: 100,
        demeritsCount: 0
      });
      
      setStudents(service.getStudents());
      setShowAddModal(false);
      setFullName('');
      setRegNumber('');
      setGuardianName('');
      setGuardianPhone('');
      alert(`Student "${added.fullName}" admitted successfully! Tuition Invoice automatically posted to JUMO FAAP.`);
    } catch (err: any) {
      alert(err.message || 'Error occurred while admitting student.');
    }
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appFullName.trim()) return alert('Applicant Name is required.');

    const docs: string[] = [];
    if (docBirth) docs.push('Birth Certificate');
    if (docTranscript) docs.push('Academic Transcript');

    service.submitApplication({
      fullName: appFullName,
      email: appEmail,
      phone: appPhone,
      selectedProgramme: appProg,
      templateType: appLevel,
      verifiedDocuments: docs,
      guardianName: appGuardianName || undefined,
      guardianPhone: appGuardianPhone || undefined
    });

    setApplications(service.getApplications());
    setShowApplyModal(false);
    setAppFullName('');
    setAppEmail('');
    setAppPhone('');
    setAppGuardianName('');
    setAppGuardianPhone('');
    alert('Application submitted into verification queue successfully.');
  };

  const handleApproveApp = (appId: string) => {
    service.updateApplicationStatus(appId, 'ACCEPTED');
    setApplications(service.getApplications());
    setStudents(service.getStudents());
    alert('Application approved. Student admitted and standard tuition invoice posted to JUMO FAAP.');
  };

  const handleRejectApp = (appId: string) => {
    service.updateApplicationStatus(appId, 'REJECTED');
    setApplications(service.getApplications());
  };

  const handleTemplateChange = (template: EducationTemplate) => {
    service.updateConfig({ template });
    setConfig(service.getConfig());
    setStudents(service.getStudents());
  };

  const handleCampusChange = (selectedCampus: string) => {
    service.updateConfig({ selectedCampus });
    setConfig(service.getConfig());
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.regNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.programmeId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCampus = filterCampus === 'ALL' || s.campus === filterCampus;
    return matchesSearch && matchesCampus;
  });

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 pb-16">
      {/* Top Banner and Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academic Registrar & Admissions</h1>
          <p className="text-slate-500 text-sm">Universal student lifecycle management configured for: <strong className="text-emerald-700">{config.template.replace('_', ' ')}</strong></p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowApplyModal(true)}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            Submit Application
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#064e3b] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-800 transition-all shadow-lg"
          >
            <UserPlus className="w-4 h-4" />
            Admit Directly
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4">
        {[
          { id: 'STUDENTS', label: 'Active Roster', icon: Users },
          { id: 'APPLICATIONS', label: 'Admissions Queue', icon: FileText },
          { id: 'CURRICULUM', label: 'Curriculum & Courses', icon: Layers },
          { id: 'CONFIG', label: 'Template Configuration', icon: Settings },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 pb-3 pt-1 text-xs font-bold border-b-2 uppercase tracking-wider transition-all ${
              activeTab === tab.id 
                ? 'border-[#064e3b] text-[#064e3b]' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* RENDER ACTIVE TAB */}
      {activeTab === 'STUDENTS' && (
        <div className="space-y-6">
          {/* Campus Aggregations */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Platform Hub 01', count: students.filter(s => s.campus === 'Platform Hub 01').length },
              { label: 'Platform Hub 02', count: students.filter(s => s.campus === 'Platform Hub 02').length },
              { label: 'Platform Hub 03', count: students.filter(s => s.campus === 'Platform Hub 03').length },
              { label: 'Platform Hub 04', count: students.filter(s => s.campus === 'Platform Hub 04').length },
            ].map((hub, i) => (
              <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{hub.label}</p>
                 <div className="flex items-end justify-between mt-1">
                   <p className="text-xl font-black text-slate-900 leading-none">{hub.count}</p>
                   <span className="text-[10px] font-bold text-emerald-600">Active</span>
                 </div>
              </div>
            ))}
          </div>

          {/* Filter and Table Panel */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search by registration number, name, or programme..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>
              <select 
                value={filterCampus}
                onChange={(e) => setFilterCampus(e.target.value)}
                className="bg-white border border-slate-200 text-xs font-bold text-slate-700 px-3 py-2 rounded-xl focus:outline-none"
              >
                <option value="ALL">All Campus Hubs</option>
                <option value="Platform Hub 01">Platform Hub 01</option>
                <option value="Platform Hub 02">Platform Hub 02</option>
                <option value="Platform Hub 03">Platform Hub 03</option>
              </select>
            </div>

            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Reg Number</th>
                  <th className="px-6 py-4">Full Name</th>
                  <th className="px-6 py-4">Programme / Course</th>
                  <th className="px-6 py-4">Guardian / Contact</th>
                  <th className="px-6 py-4 text-center">Attendance</th>
                  <th className="px-6 py-4 text-center">Demerits</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-bold text-emerald-800">{s.regNumber}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-slate-900">{s.fullName}</p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{s.campus}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-xs font-medium">{s.programmeId}</td>
                    <td className="px-6 py-4">
                      {s.guardianName ? (
                        <div>
                          <p className="text-xs font-bold text-slate-800">{s.guardianName}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{s.guardianPhone}</p>
                        </div>
                      ) : (
                        <span className="text-slate-300 text-xs italic">Unlinked</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-xs font-bold ${s.attendanceRate >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {s.attendanceRate}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-xs font-bold ${s.demeritsCount > 0 ? 'text-rose-600 font-black' : 'text-slate-400'}`}>
                        {s.demeritsCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        s.academicStatus === 'NORMAL_PROGRESS' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {s.academicStatus.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'APPLICATIONS' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-900 text-sm">Admissions Verification Pipeline</h3>
          </div>
          {applications.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm italic">
              No pending applications in the verification queue.
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Applicant</th>
                  <th className="px-6 py-4">Programme / Level</th>
                  <th className="px-6 py-4">Verified Documents</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {applications.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-slate-900">{app.fullName}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{app.phone} • {app.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-xs font-bold text-slate-800">{app.selectedProgramme}</p>
                        <p className="text-[9px] text-emerald-600 font-bold tracking-wider uppercase">{app.templateType}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {app.verifiedDocuments.map((doc, idx) => (
                          <span key={idx} className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-600" />
                            {doc}
                          </span>
                        ))}
                        {app.verifiedDocuments.length === 0 && (
                          <span className="text-slate-400 text-xs italic">None uploaded</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                        app.status === 'SUBMITTED' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        app.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {app.status === 'SUBMITTED' || app.status === 'UNDER_REVIEW' ? (
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleApproveApp(app.id)}
                            className="bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold hover:bg-emerald-700"
                          >
                            Accept & Admit
                          </button>
                          <button 
                            onClick={() => handleRejectApp(app.id)}
                            className="bg-white border border-slate-200 text-slate-500 px-2.5 py-1 rounded-lg text-xs font-bold hover:bg-slate-50"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <div className="text-center text-slate-400 text-xs font-bold uppercase">
                          No Pending Actions
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'CURRICULUM' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm">Academic Programmes Catalog</h3>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Code</th>
                  <th className="px-6 py-4">Programme Name</th>
                  <th className="px-6 py-4">Level</th>
                  <th className="px-6 py-4 text-center">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {programmes.map(prog => (
                  <tr key={prog.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-emerald-800 text-xs">{prog.code}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{prog.name}</td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-500">{prog.level}</td>
                    <td className="px-6 py-4 text-center text-xs font-mono">{prog.durationYears} Years</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm">Course Unit Directories & Prerequisites</h3>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Course Title</th>
                  <th className="px-6 py-4 text-center">Credits</th>
                  <th className="px-6 py-4">Prerequisites</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {courses.map(course => (
                  <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-emerald-800 text-xs">{course.code}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{course.name}</td>
                    <td className="px-6 py-4 text-center text-xs font-bold">{course.creditUnits || 'N/A'}</td>
                    <td className="px-6 py-4">
                      {course.prerequisites && course.prerequisites.length > 0 ? (
                        <span className="bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded text-[10px] font-bold">
                          Requires {course.prerequisites.join(', ')}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs italic">None</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'CONFIG' && (
        <div className="max-w-xl bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Universal ERP Configurations</h3>
            <p className="text-slate-500 text-xs">Switch JUMO templates dynamically to change active grade schemes, billing rules, and registries.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Education Paradigm Template</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'NURSERY', label: 'Nursery / Early Child' },
                  { id: 'K12_PRIMARY', label: 'Primary (K-12)' },
                  { id: 'K12_SECONDARY', label: 'Secondary (K-12)' },
                  { id: 'VOCATIONAL', label: 'Vocational / Tech' },
                  { id: 'UNIVERSITY', label: 'University / Higher Ed' },
                  { id: 'PROF_TRAINING', label: 'Professional Training' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleTemplateChange(item.id as EducationTemplate)}
                    className={`p-3 border rounded-xl text-left transition-all ${
                      config.template === item.id 
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold' 
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium'
                    }`}
                  >
                    <p className="text-xs uppercase">{item.label}</p>
                    {config.template === item.id && <p className="text-[10px] text-emerald-600 font-bold mt-1">Active Scheme</p>}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-slate-100"></div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Institutional Campus Selector</label>
              <select 
                value={config.selectedCampus}
                onChange={(e) => handleCampusChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none"
              >
                <option value="Platform Hub 01">Platform Hub 01 (Main)</option>
                <option value="Platform Hub 02">Platform Hub 02 (Sub-Campus)</option>
                <option value="Platform Hub 03">Platform Hub 03 (Virtual)</option>
                <option value="Platform Hub 04">Platform Hub 04 (Annex)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Admissions Intake Form Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-[#064e3b] text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Admit Sovereign Student</h3>
              <button onClick={() => setShowAddModal(false)} className="text-emerald-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Student Full Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Joshua Mugabi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Reg Number / PRN Ref</label>
                  <input 
                    type="text"
                    placeholder="e.g. REG/2026/004"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Intake Session</label>
                  <select 
                    value={currentSemester}
                    onChange={(e) => setCurrentSemester(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="SEM_1">Semester 1</option>
                    <option value="SEM_2">Semester 2</option>
                    <option value="TERM_1">Term 1 (K-12)</option>
                    <option value="TERM_2">Term 2 (K-12)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Guardian Name</label>
                  <input 
                    type="text"
                    placeholder="Grace Mukasa"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Guardian Phone</label>
                  <input 
                    type="text"
                    placeholder="+256781234567"
                    value={guardianPhone}
                    onChange={(e) => setGuardianPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Sovereign Programme Selection</label>
                <select 
                  value={programmeId}
                  onChange={(e) => setProgrammeId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="BSc Computer Science">BSc Computer Science</option>
                  <option value="Bachelor of Laws">Bachelor of Laws</option>
                  <option value="BSc Information Technology">BSc Information Technology</option>
                  <option value="Bachelor of Medicine">Bachelor of Medicine</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Location Hub</label>
                <select 
                  value={campus}
                  onChange={(e) => setCampus(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Platform Hub 01">Platform Hub 01</option>
                  <option value="Platform Hub 02">Platform Hub 02</option>
                  <option value="Platform Hub 03">Platform Hub 03</option>
                  <option value="Platform Hub 04">Platform Hub 04</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-[#064e3b] hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Confirm Admission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Applications Submit Form Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-[#064e3b] text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Submit Academic Application</h3>
              <button onClick={() => setShowApplyModal(false)} className="text-emerald-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApply} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Full Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Samuel Kizza"
                  value={appFullName}
                  onChange={(e) => setAppFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Email</label>
                  <input 
                    type="email"
                    placeholder="sam@email.com"
                    value={appEmail}
                    onChange={(e) => setAppEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Phone</label>
                  <input 
                    type="text"
                    placeholder="+256770000003"
                    value={appPhone}
                    onChange={(e) => setAppPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Target Level</label>
                  <select 
                    value={appLevel}
                    onChange={(e) => setAppLevel(e.target.value as EducationTemplate)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none"
                  >
                    <option value="UNIVERSITY">University</option>
                    <option value="VOCATIONAL">Vocational</option>
                    <option value="K12_SECONDARY">Secondary</option>
                    <option value="K12_PRIMARY">Primary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Programme Selection</label>
                  <input 
                    type="text"
                    placeholder="e.g. BSc Computer Science"
                    value={appProg}
                    onChange={(e) => setAppProg(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Guardian Name</label>
                  <input 
                    type="text"
                    placeholder="e.g. John Kizza"
                    value={appGuardianName}
                    onChange={(e) => setAppGuardianName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Guardian Phone</label>
                  <input 
                    type="text"
                    placeholder="e.g. +256780000000"
                    value={appGuardianPhone}
                    onChange={(e) => setAppGuardianPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Document Upload Verification Checklists</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs text-slate-700">
                    <input 
                      type="checkbox" 
                      checked={docBirth}
                      onChange={(e) => setDocBirth(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    Verify Birth Certificate / National Identity Card
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-700">
                    <input 
                      type="checkbox" 
                      checked={docTranscript}
                      onChange={(e) => setDocTranscript(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    Verify Pre-qualification Transcripts / Certificates
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowApplyModal(false)}
                  className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-[#064e3b] hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
