import React, { useState } from 'react';
import { 
  Building2, Users, FileText, CheckCircle2, AlertCircle, 
  Search, Filter, Plus, Download, Printer, Shield, 
  Award, Calendar, Clock, ChevronRight, X, Sliders,
  Check, UserCheck, Activity, Briefcase, BookOpen, 
  Layers, HardDrive, Phone, Mail, ArrowUpRight
} from 'lucide-react';

interface StaffProfile {
  id: string;
  name: string;
  title: string;
  department: string;
  cadre: 'Teaching Faculty' | 'Administration' | 'Senior Executive' | 'Support Staff';
  qualification: string;
  teachingLoad: string;
  appraisalScore: string;
  status: 'ACTIVE' | 'ON_LEAVE' | 'PROBATION';
  phone: string;
  email: string;
  dateAppointed: string;
  responsibilities: string[];
  syllabusProgress: string;
  attendanceRate: string;
  recentAppraisalRemark: string;
}

interface BogResolution {
  refNo: string;
  title: string;
  category: 'FINANCE' | 'ACADEMIC' | 'INFRASTRUCTURE' | 'GOVERNANCE';
  passedDate: string;
  deadline: string;
  leadOfficer: string;
  status: 'IMPLEMENTED' | 'IN_PROGRESS' | 'PENDING_APPROVAL';
  summary: string;
}

export const HeadTeacherOffice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'FACULTY' | 'RESOLUTIONS' | 'DEPARTMENTS' | 'COMPLIANCE'>('FACULTY');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('ALL');
  const [filterCadre, setFilterCadre] = useState('ALL');
  const [selectedStaffId, setSelectedStaffId] = useState<string>('STF-101');
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const [staffList, setStaffList] = useState<StaffProfile[]>([
    {
      id: 'STF-101',
      name: 'Dr. Joseph Mukwaya',
      title: 'Head Teacher & Principal Executive',
      department: 'Executive Directorate',
      cadre: 'Senior Executive',
      qualification: 'PhD Educational Policy & Mgmt (Makerere)',
      teachingLoad: '4 Periods / Wk (S.6 Advanced Physics)',
      appraisalScore: '98.5% (Outstanding)',
      status: 'ACTIVE',
      phone: '0772-990011',
      email: 'principal@enterprise.edu.ug',
      dateAppointed: '2018-01-15',
      responsibilities: ['Overall Institutional Custody', 'Secretary to Board of Governors', 'MoES Statutory Liaison', 'Fiscal Authorizations'],
      syllabusProgress: '100% On Schedule',
      attendanceRate: '99.2%',
      recentAppraisalRemark: 'Visionary institutional leadership with continuous top tier UNEB national ranking.'
    },
    {
      id: 'STF-102',
      name: 'Mrs. Agnes Kyomugisha',
      title: 'Deputy Head Teacher (Academics / DOS)',
      department: 'Academic Directorate',
      cadre: 'Teaching Faculty',
      qualification: 'M.Ed Curriculum Studies',
      teachingLoad: '12 Periods / Wk (S.4 Chemistry)',
      appraisalScore: '96.2% (Distinguished)',
      status: 'ACTIVE',
      phone: '0702-881122',
      email: 'dos@enterprise.edu.ug',
      dateAppointed: '2019-05-02',
      responsibilities: ['Curriculum Master Timetable', 'NCDC Assessment Framework Execution', 'UNEB Examination Center Head', 'Faculty Marksheet Audits'],
      syllabusProgress: '94.8% On Schedule',
      attendanceRate: '98.5%',
      recentAppraisalRemark: 'Rigorous implementation of competency-based secondary curriculum.'
    },
    {
      id: 'STF-103',
      name: 'Mr. Peter Wamala',
      title: 'Head of Department — Science & Math',
      department: 'Science & Mathematics',
      cadre: 'Teaching Faculty',
      qualification: 'B.Sc Education (Math / Physics)',
      teachingLoad: '18 Periods / Wk (S.3, S.5 Math)',
      appraisalScore: '93.0% (Excellent)',
      status: 'ACTIVE',
      phone: '0782-774433',
      email: 'p.wamala@enterprise.edu.ug',
      dateAppointed: '2020-02-10',
      responsibilities: ['Science Laboratories Custody', 'National Science Fair Coordination', 'Junior Science Olympiad Mentorship'],
      syllabusProgress: '91.2% On Schedule',
      attendanceRate: '97.0%',
      recentAppraisalRemark: 'Organized modern digital experiments in new physics lab.'
    },
    {
      id: 'STF-104',
      name: 'Ms. Juliet Nabirye',
      title: 'Dean of Students & Boarding Mistress',
      department: 'Student Welfare & Housing',
      cadre: 'Administration',
      qualification: 'B.A Guidance & Counseling',
      teachingLoad: '8 Periods / Wk (S.1, S.2 English)',
      appraisalScore: '94.4% (Excellent)',
      status: 'ACTIVE',
      phone: '0752-663322',
      email: 'dean.students@enterprise.edu.ug',
      dateAppointed: '2021-08-16',
      responsibilities: ['Dormitory Inspection', 'Prefectorial Council Governance', 'Health & Dining Hall Logistics', 'Parental Pastoral Care'],
      syllabusProgress: '96.0% On Schedule',
      attendanceRate: '99.0%',
      recentAppraisalRemark: 'Exceptional boarding welfare standards and zero disciplinary infractions.'
    },
    {
      id: 'STF-105',
      name: 'Mr. Ronald Ssekitoleko',
      title: 'Head of Department — Humanities & Languages',
      department: 'Humanities & Languages',
      cadre: 'Teaching Faculty',
      qualification: 'M.A History & Literature',
      teachingLoad: '16 Periods / Wk (S.4, S.6 History)',
      appraisalScore: '92.5% (Very Good)',
      status: 'ACTIVE',
      phone: '0712-554411',
      email: 'r.ssekitoleko@enterprise.edu.ug',
      dateAppointed: '2022-01-20',
      responsibilities: ['Inter-School Debate Championship', 'National Heritage & Cultural Gala', 'School Library Content Selection'],
      syllabusProgress: '88.5% On Schedule',
      attendanceRate: '96.5%',
      recentAppraisalRemark: 'Promoting extensive reading culture across lower secondary streams.'
    }
  ]);

  const bogResolutions: BogResolution[] = [
    {
      refNo: 'BOG-RES-2026-01',
      title: 'Solar Power & Green Micro-Grid Infrastructure Grant',
      category: 'INFRASTRUCTURE',
      passedDate: '2026-01-18',
      deadline: '2026-09-30',
      leadOfficer: 'Head Teacher & Estates Officer',
      status: 'IN_PROGRESS',
      summary: 'Approved installation of 45kVA hybrid solar array to offset 80% of boarding section energy expenses.'
    },
    {
      refNo: 'BOG-RES-2026-02',
      title: 'Teacher Continuous Professional Development (CPD) Allocation',
      category: 'ACADEMIC',
      passedDate: '2026-02-04',
      deadline: '2026-11-30',
      leadOfficer: 'Deputy Head Teacher (DOS)',
      status: 'IMPLEMENTED',
      summary: 'Mandatory NCDC Activity of Integration (AOI) workshops for all 48 teaching faculty members.'
    },
    {
      refNo: 'BOG-RES-2026-03',
      title: 'FAAP Digital School Fees & PRN Mandatory Migration',
      category: 'FINANCE',
      passedDate: '2026-02-12',
      deadline: '2026-05-31',
      leadOfficer: 'School Bursar & Treasury Lead',
      status: 'IMPLEMENTED',
      summary: 'Elimination of cash counter payments in favor of URA direct bank tokens and Mobile Money APIs.'
    }
  ];

  const filteredStaff = staffList.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = filterDepartment === 'ALL' || s.department === filterDepartment;
    const matchCadre = filterCadre === 'ALL' || s.cadre === filterCadre;
    return matchSearch && matchDept && matchCadre;
  });

  const selectedStaff = staffList.find(s => s.id === selectedStaffId) || staffList[0];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col min-h-[750px]">
      {/* Office Header */}
      <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">HEAD TEACHER & EXECUTIVE DIRECTORATE</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-100 text-indigo-800 border border-indigo-300">
                BOARD OF GOVERNORS (BoG)
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Institutional Governance • Staff Directory & Appraisal • Statutory MoES Quality Assurance
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
            <span>Print Executive Report</span>
          </button>
          <button 
            type="button"
            onClick={() => {
              setNotificationMsg('New statutory MoES Annual Census return compiled and validated for submission.');
              setTimeout(() => setNotificationMsg(null), 4000);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Generate MoES Return</span>
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {notificationMsg && (
        <div className="bg-indigo-50 border-b border-indigo-200 px-6 py-2.5 flex items-center justify-between text-xs text-indigo-800 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>{notificationMsg}</span>
          </div>
          <button type="button" onClick={() => setNotificationMsg(null)} className="text-indigo-700 hover:text-indigo-900">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="border-b border-slate-200 bg-white px-6 flex items-center gap-2 overflow-x-auto text-xs font-medium">
        <button
          type="button"
          onClick={() => setActiveTab('FACULTY')}
          className={`py-3 px-3.5 border-b-2 font-bold whitespace-nowrap transition ${
            activeTab === 'FACULTY'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Staff & Faculty Directory (HR)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('RESOLUTIONS')}
          className={`py-3 px-3.5 border-b-2 font-bold whitespace-nowrap transition ${
            activeTab === 'RESOLUTIONS'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Board of Governors (BoG) Resolutions
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('DEPARTMENTS')}
          className={`py-3 px-3.5 border-b-2 font-bold whitespace-nowrap transition ${
            activeTab === 'DEPARTMENTS'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Departmental Syllabus Audits
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('COMPLIANCE')}
          className={`py-3 px-3.5 border-b-2 font-bold whitespace-nowrap transition ${
            activeTab === 'COMPLIANCE'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          MoES Statutory Compliance
        </button>
      </div>

      {/* Split-Pane Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Pane: Master Enterprise Governance Table */}
        <div className="flex-1 border-r border-slate-200 flex flex-col bg-slate-50/30 overflow-hidden">
          {/* Table Search & Filter Toolbar */}
          <div className="p-4 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search staff by name, title, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-700 py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="ALL">All Departments</option>
                <option value="Executive Directorate">Executive Directorate</option>
                <option value="Academic Directorate">Academic Directorate</option>
                <option value="Science & Mathematics">Science & Mathematics</option>
                <option value="Humanities & Languages">Humanities & Languages</option>
                <option value="Student Welfare & Housing">Student Welfare & Housing</option>
              </select>

              <select
                value={filterCadre}
                onChange={(e) => setFilterCadre(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-700 py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="ALL">All Cadres</option>
                <option value="Teaching Faculty">Teaching Faculty</option>
                <option value="Senior Executive">Senior Executive</option>
                <option value="Administration">Administration</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-auto">
            {activeTab === 'FACULTY' && (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100/70 text-slate-600 font-semibold sticky top-0 z-10">
                    <th className="py-2.5 px-4">Staff ID</th>
                    <th className="py-2.5 px-4">Full Name & Title</th>
                    <th className="py-2.5 px-4">Department</th>
                    <th className="py-2.5 px-4">Cadre</th>
                    <th className="py-2.5 px-4">Teaching Load / Duties</th>
                    <th className="py-2.5 px-4">Appraisal Score</th>
                    <th className="py-2.5 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredStaff.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-500">
                        No faculty or staff records found.
                      </td>
                    </tr>
                  ) : (
                    filteredStaff.map((s) => {
                      const isSelected = s.id === selectedStaff?.id;
                      return (
                        <tr
                          key={s.id}
                          onClick={() => setSelectedStaffId(s.id)}
                          className={`cursor-pointer transition-colors ${
                            isSelected 
                              ? 'bg-indigo-50/70 hover:bg-indigo-50 font-medium' 
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">
                            {s.id}
                          </td>
                          <td className="py-3 px-4 text-slate-900">
                            <span className="font-semibold block">{s.name}</span>
                            <span className="text-[10px] text-slate-500">{s.title}</span>
                          </td>
                          <td className="py-3 px-4 text-slate-700">
                            {s.department}
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-800">
                              {s.cadre}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {s.teachingLoad}
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-emerald-700">
                            {s.appraisalScore}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}

            {activeTab === 'RESOLUTIONS' && (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100/70 text-slate-600 font-semibold sticky top-0 z-10">
                    <th className="py-2.5 px-4">Ref Number</th>
                    <th className="py-2.5 px-4">Resolution Title</th>
                    <th className="py-2.5 px-4">Category</th>
                    <th className="py-2.5 px-4">Lead Officer</th>
                    <th className="py-2.5 px-4">Passed Date</th>
                    <th className="py-2.5 px-4 text-center">Execution Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {bogResolutions.map((r) => (
                    <tr key={r.refNo} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-indigo-700">{r.refNo}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        <span className="block">{r.title}</span>
                        <span className="text-[10px] font-normal text-slate-500">{r.summary}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                          {r.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-700">{r.leadOfficer}</td>
                      <td className="py-3 px-4 font-mono text-slate-600">{r.passedDate}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          r.status === 'IMPLEMENTED' 
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {(activeTab === 'DEPARTMENTS' || activeTab === 'COMPLIANCE') && (
              <div className="p-8 text-center text-slate-500">
                <Shield className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Statutory MoES & NCDC Quality Audits Active
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  All 48 teaching modules, laboratory safety certs, and statutory payroll filings are fully compliant with MoES standards.
                </p>
              </div>
            )}
          </div>

          {/* Table Footer Status Bar */}
          <div className="border-t border-slate-200 bg-white px-4 py-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Showing {filteredStaff.length} of {staffList.length} faculty members</span>
            <span className="flex items-center gap-1.5 text-indigo-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              BoG Governance & Ministry Compliance Active
            </span>
          </div>
        </div>

        {/* Right Pane: Split-Pane Executive Dossier Inspector */}
        <div className="w-full lg:w-[400px] bg-white flex flex-col overflow-y-auto border-t lg:border-t-0 border-slate-200">
          {selectedStaff ? (
            <div className="p-5 flex flex-col gap-5">
              {/* Header */}
              <div className="border-b border-slate-200 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                      {selectedStaff.id}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1.5">
                      {selectedStaff.name}
                    </h3>
                    <p className="text-xs text-slate-500">{selectedStaff.title}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {selectedStaff.status}
                  </span>
                </div>
              </div>

              {/* Department & Qualifications */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Department:</span>
                  <span className="font-semibold text-slate-900">{selectedStaff.department}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Appraisal Rating:</span>
                  <span className="font-mono font-bold text-emerald-700">{selectedStaff.appraisalScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Attendance Rate:</span>
                  <span className="font-mono font-bold text-indigo-700">{selectedStaff.attendanceRate}</span>
                </div>
                <div className="pt-1.5 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-slate-500">Appointed Date:</span>
                  <span className="font-mono text-slate-700">{selectedStaff.dateAppointed}</span>
                </div>
              </div>

              {/* Qualifications & Credentials */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Academic Qualifications</span>
                </h4>
                <div className="border border-slate-200 rounded-lg p-3 bg-white text-xs">
                  <span className="font-semibold text-slate-900 block">{selectedStaff.qualification}</span>
                  <span className="text-[11px] text-slate-500 mt-1 block">Teaching Load: {selectedStaff.teachingLoad}</span>
                </div>
              </div>

              {/* Key Institutional Responsibilities */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Key Responsibilities</span>
                </h4>
                <div className="border border-slate-200 rounded-lg p-3 bg-white space-y-1.5 text-xs">
                  {selectedStaff.responsibilities.map((resp, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-700">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Appraisal Remark */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Executive Performance Appraisal</span>
                </h4>
                <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50 text-xs text-slate-700 leading-relaxed italic">
                  "{selectedStaff.recentAppraisalRemark}"
                </div>
              </div>

              {/* Quick Actions Drawer */}
              <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => alert(`Staff Appraisal Certificate & Timetable Dossier printed for ${selectedStaff.name}`)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-2xs transition cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Issue Appraisal Dossier</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert(`Official Executive Directive dispatched to ${selectedStaff.name} (${selectedStaff.email})`)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-2xs transition cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Send Executive Directive</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              Select a staff member from the directory to inspect dossier.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
