import React, { useState, useEffect } from 'react';
import { 
  Globe, Key, Users, UserPlus, HeartHandshake, UserCheck, 
  FileEdit, Calendar, ScrollText, CheckSquare, Building, CreditCard, 
  Settings, ShieldCheck, Search, Award, BookOpen, ExternalLink, Sparkles, Send, Check
} from 'lucide-react';
import { AADatabase, AlphaStudent, StudentApplicant, ParentNote } from './AlphaStore';

export function AlphaViews({
  activeView,
  onNavigate
}: {
  activeView: string;
  onNavigate: (view: string) => void;
}) {
  const [, setTick] = useState(0);

  useEffect(() => {
    return AADatabase.subscribe(() => setTick(t => t + 1));
  }, []);

  if (activeView === 'PUBLIC') return <AAPublicPortalView onNavigate={onNavigate} />;
  if (activeView === 'AUTH') return <AAAuthGatewayView onNavigate={onNavigate} />;
  if (activeView === 'SETTINGS') return <AAConfigConsoleView />;
  if (activeView === 'ADMISSIONS') return <AAAdmissionsView />;
  if (activeView === 'SIS_DIRECTORY') return <AASISDirectoryView onNavigate={onNavigate} />;
  if (activeView === 'PARENT_PORTAL') return <AAParentPortalView onNavigate={onNavigate} />;
  if (activeView === 'STUDENT_PORTAL') return <AAStudentPortalView />;
  if (activeView === 'FACULTY_STUDIO') return <AAFacultyStudioView />;
  if (activeView === 'TIMETABLE') return <AATimetableMatrixView />;
  if (activeView === 'REPORT_CARDS') return <AAReportCardCenterView />;
  if (activeView === 'ATTENDANCE') return <AAAttendanceView />;
  if (activeView === 'FACILITIES') return <AAFacilitiesView />;
  if (activeView === 'FINANCE') return <AAFinanceView />;
  if (activeView === 'ADMIN_AUDIT') return <AAAdminAuditView />;

  return <AASISDirectoryView onNavigate={onNavigate} />;
}

/* Alpha Academy Institutional Workspace Header Component */
function AlphaHeader({
  title,
  subtitle,
  icon: Icon,
  codeBadge,
  statusText,
  actions
}: {
  title: string;
  subtitle: string;
  icon: any;
  codeBadge?: string;
  statusText?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sky-950 flex items-center justify-center text-white shrink-0">
          <Icon className="w-5 h-5 text-sky-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">{title}</h2>
            {codeBadge && (
              <span className="text-[10px] font-black text-sky-800 uppercase tracking-wider bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-lg">
                {codeBadge}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {statusText && (
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold uppercase tracking-wider">
            {statusText}
          </span>
        )}
        {actions}
      </div>
    </div>
  );
}

/* =========================================================================
   1. PUBLIC PORTAL & ADMISSIONS INQUIRY (ALPHA-PUB-001, ALPHA-PUB-002)
   ========================================================================= */
function AAPublicPortalView({ onNavigate }: { onNavigate: (v: string) => void }) {
  const [inquiryName, setInquiryName] = useState('');
  const [targetClass, setTargetClass] = useState('S.1');
  const [phone, setPhone] = useState('');
  const [school, setSchool] = useState('');
  const [submittedApp, setSubmittedApp] = useState<StudentApplicant | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !phone) return;
    const app = AADatabase.submitInquiry(inquiryName, targetClass, phone, school);
    setSubmittedApp(app);
    setInquiryName('');
    setPhone('');
    setSchool('');
  };

  return (
    <div className="space-y-6">
      {/* ALPHA-PUB-001: Public Homepage Hero Banner */}
      <AlphaHeader
        title={AADatabase.schoolProfile.name}
        subtitle={`${AADatabase.schoolProfile.motto} • EMIS Center Code: ${AADatabase.schoolProfile.emisCode}`}
        icon={Globe}
        codeBadge="ALPHA-PUB-001"
        statusText="Public Portal Active"
        actions={
          <div className="flex gap-2">
            <button
              onClick={() => onNavigate('AUTH')}
              className="px-4 py-2 bg-sky-950 text-white rounded-xl text-xs font-bold hover:bg-sky-900 transition cursor-pointer"
            >
              SSO Gateway
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Principal's Welcome</span>
          <p className="text-xs text-slate-700 leading-relaxed">
            "Welcome to {AADatabase.activeTerm}. Academic rigor and discipline remain our highest calling." — {AADatabase.schoolProfile.principalName}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Active Term Schedule</span>
          <p className="text-xs text-slate-700 leading-relaxed">
            {AADatabase.activeTerm} • Entrance exams open for S.1 and S.5 applicants.
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Universal SchoolPay Link</span>
          <p className="text-xs text-slate-700 leading-relaxed">
            Parents can pay tuition directly via MTN MoMo, Airtel Money, or Visa using 6-digit payment shortcodes.
          </p>
        </div>
      </div>

      {/* ALPHA-PUB-002: Admissions Application Inquiry Form */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-lg">
              ALPHA-PUB-002
            </span>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mt-1">Prospective Student Admissions Inquiry Portal</h3>
          </div>
          <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold uppercase">
            Intake Queue Open
          </span>
        </div>

        {submittedApp && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex justify-between items-center">
            <div>
              <p className="font-bold">Application Received Successfully!</p>
              <p className="mt-0.5 text-emerald-800">Applicant Reference: <span className="font-mono font-bold">{submittedApp.id}</span> for {submittedApp.applicantName} ({submittedApp.targetClass}). Routed to Admissions Queue.</p>
            </div>
            <button onClick={() => setSubmittedApp(null)} className="text-xs bg-emerald-200 text-emerald-900 px-3 py-1.5 rounded-lg font-bold hover:bg-emerald-300">
              New Application
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Student Name *</label>
            <input
              type="text"
              required
              value={inquiryName}
              onChange={e => setInquiryName(e.target.value)}
              placeholder="e.g. Samuel Kintu"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Class Level *</label>
            <select
              value={targetClass}
              onChange={e => setTargetClass(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="S.1">Senior 1 (S.1)</option>
              <option value="S.2">Senior 2 (S.2)</option>
              <option value="S.3">Senior 3 (S.3)</option>
              <option value="S.4">Senior 4 (S.4)</option>
              <option value="S.5-SCI">Senior 5 Science (S.5-SCI)</option>
              <option value="S.5-ARTS">Senior 5 Arts (S.5-ARTS)</option>
              <option value="S.6">Senior 6 (S.6)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Guardian Mobile Phone Contact *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="e.g. +256 772 100200"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Former School & PLE/UCE Aggregate</label>
            <input
              type="text"
              value={school}
              onChange={e => setSchool(e.target.value)}
              placeholder="e.g. St. Peter Primary School (Aggregate 8)"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white font-extrabold rounded-xl text-xs hover:bg-blue-700 transition shadow-xs cursor-pointer"
            >
              Submit Admissions Application Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================================================================
   2. AUTHENTICATION & CREDENTIAL RECOVERY (ALPHA-AUTH-001, ALPHA-AUTH-002)
   ========================================================================= */
function AAAuthGatewayView({ onNavigate }: { onNavigate: (v: string) => void }) {
  const [selectedRole, setSelectedRole] = useState<'HEADTEACHER' | 'BURSAR' | 'TEACHER' | 'PARENT' | 'STUDENT' | 'ADMIN'>('HEADTEACHER');
  const [username, setUsername] = useState('headteacher@alpha.ac.ug');
  const [password, setPassword] = useState('••••••••');
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'RECOVERY'>('LOGIN');

  const [searchPhone, setSearchPhone] = useState('');
  const [foundLin, setFoundLin] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    AADatabase.currentUserRole = selectedRole;
    AADatabase.logAudit('USER_LOGIN', selectedRole, `Logged in as ${selectedRole}`);
    
    if (selectedRole === 'PARENT') onNavigate('PARENT_PORTAL');
    else if (selectedRole === 'STUDENT') onNavigate('STUDENT_PORTAL');
    else if (selectedRole === 'TEACHER') onNavigate('FACULTY_STUDIO');
    else if (selectedRole === 'BURSAR') onNavigate('FINANCE');
    else onNavigate('SIS_DIRECTORY');
  };

  const handleLookupLin = (e: React.FormEvent) => {
    e.preventDefault();
    const stu = AADatabase.students.find(s => s.guardianPhone.includes(searchPhone) || s.admissionNo.includes(searchPhone));
    if (stu) {
      setFoundLin(`Found: ${stu.fullName} (Admission LIN: ${stu.admissionNo}, Class: ${stu.classLevel})`);
      setOtpSent(true);
    } else {
      setFoundLin('No student record found matching that phone or admission code.');
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 my-4">
      <AlphaHeader
        title="Single Sign-On Gateway"
        subtitle="Multi-actor authentication and credential recovery portal"
        icon={Key}
        codeBadge="ALPHA-AUTH-001"
        statusText="Gateway Ready"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('LOGIN')}
            className={`flex-1 py-2.5 text-xs font-black uppercase text-center border-b-2 transition cursor-pointer ${activeTab === 'LOGIN' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            Multi-Actor Sign-In
          </button>
          <button
            onClick={() => setActiveTab('RECOVERY')}
            className={`flex-1 py-2.5 text-xs font-black uppercase text-center border-b-2 transition cursor-pointer ${activeTab === 'RECOVERY' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            Credential Recovery & LIN Search
          </button>
        </div>

        {activeTab === 'LOGIN' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Select Role Context</label>
              <div className="grid grid-cols-3 gap-2">
                {(['HEADTEACHER', 'BURSAR', 'TEACHER', 'PARENT', 'STUDENT', 'ADMIN'] as const).map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      setSelectedRole(role);
                      if (role === 'PARENT') setUsername('jane@example.com');
                      else if (role === 'STUDENT') setUsername('LIN-2026-001');
                      else if (role === 'TEACHER') setUsername('smith@alpha.ac.ug');
                      else if (role === 'BURSAR') setUsername('bursar@alpha.ac.ug');
                      else setUsername('headteacher@alpha.ac.ug');
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border text-center transition cursor-pointer ${selectedRole === role ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-2xs' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {selectedRole === 'STUDENT' ? 'Student LIN Code' : 'Email Address / Phone Number'}
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password / Security PIN</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-extrabold rounded-xl text-xs hover:bg-blue-700 transition shadow-xs cursor-pointer"
            >
              Authenticate & Enter Workspace
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-lg">
              ALPHA-AUTH-002
            </span>
            <p className="text-xs text-slate-600">
              Parents who lost their child's LIN admission number or portal password can search by registered mobile number.
            </p>
            <form onSubmit={handleLookupLin} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Guardian Phone or Admission LIN</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +256700000001 or LIN-2026-001"
                  value={searchPhone}
                  onChange={e => setSearchPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800 transition cursor-pointer"
              >
                Lookup LIN & Dispatch OTP Code
              </button>
            </form>

            {foundLin && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 font-medium">
                {foundLin}
                {otpSent && <p className="mt-1 text-emerald-700 font-bold">✓ Reset OTP SMS code dispatched to registered phone contact.</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   3. INSTITUTIONAL SETTINGS & BELL SCHEDULE (ALPHA-SHELL-002)
   ========================================================================= */
function AAConfigConsoleView() {
  const [profile, setProfile] = useState(AADatabase.schoolProfile);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    AADatabase.schoolProfile = profile;
    AADatabase.logAudit('UPDATE_SCHOOL_CONFIG', AADatabase.currentUserRole, 'Updated school profile settings');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <AlphaHeader
        title="Institutional Configuration"
        subtitle="Manage school crest, motto, principal profile, and bell schedule matrix"
        icon={Settings}
        codeBadge="ALPHA-SHELL-002"
        statusText={saved ? "Saved Successfully!" : "Config Active"}
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">School Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={e => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">EMIS Ministry Center Code</label>
            <input
              type="text"
              value={profile.emisCode}
              onChange={e => setProfile({ ...profile, emisCode: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Motto</label>
            <input
              type="text"
              value={profile.motto}
              onChange={e => setProfile({ ...profile, motto: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Principal / Headteacher Name</label>
            <input
              type="text"
              value={profile.principalName}
              onChange={e => setProfile({ ...profile, principalName: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white font-extrabold rounded-xl text-xs hover:bg-blue-700 transition cursor-pointer">
              Save Institutional Configuration
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Daily Bell Schedule Template</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 uppercase text-slate-400 text-[10px] font-black tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Period Label</th>
                <th className="py-2.5 px-3">Time Slot</th>
                <th className="py-2.5 px-3">Slot Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {AADatabase.bellSchedule.map((b, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold">{b.period}</td>
                  <td className="py-2.5 px-3 font-mono">{b.time}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${b.type === 'ACADEMIC' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                      {b.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. ADMISSIONS INTAKE & LIN ENROLLMENT (ALPHA-ADM-001, ALPHA-ADM-002)
   ========================================================================= */
function AAAdmissionsView() {
  const [examInput, setExamInput] = useState<{ [id: string]: { interview: number; exam: number } }>({});

  const handleScoreChange = (id: string, field: 'interview' | 'exam', val: number) => {
    setExamInput(prev => ({
      ...prev,
      [id]: {
        interview: field === 'interview' ? val : (prev[id]?.interview || 70),
        exam: field === 'exam' ? val : (prev[id]?.exam || 70)
      }
    }));
  };

  return (
    <div className="space-y-6">
      <AlphaHeader
        title="Admissions Pipeline"
        subtitle="Entrance examination triage, scoring, and automated LIN registration"
        icon={UserPlus}
        codeBadge="ALPHA-ADM-001"
        statusText={`Active Applicants: ${AADatabase.applicants.length}`}
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 uppercase text-slate-400 text-[10px] font-black tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Applicant ID</th>
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Target Class</th>
                <th className="py-2.5 px-3">Guardian Contact</th>
                <th className="py-2.5 px-3">Scores (Exam / Int)</th>
                <th className="py-2.5 px-3">Pipeline Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {AADatabase.applicants.map(app => {
                const currentInt = examInput[app.id]?.interview ?? app.interviewScore ?? 70;
                const currentExam = examInput[app.id]?.exam ?? app.entranceExamScore ?? 75;

                return (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{app.id}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">{app.applicantName}</td>
                    <td className="py-3 px-3"><span className="px-2 py-0.5 bg-slate-100 font-bold text-slate-800 rounded">{app.targetClass}</span></td>
                    <td className="py-3 px-3 text-slate-600 font-mono">{app.guardianPhone}</td>
                    <td className="py-3 px-3">
                      {app.status === 'PENDING_INQUIRY' ? (
                        <div className="flex gap-1 items-center">
                          <input
                            type="number"
                            placeholder="Exam %"
                            value={currentExam}
                            onChange={e => handleScoreChange(app.id, 'exam', Number(e.target.value))}
                            className="w-14 px-1.5 py-0.5 border border-slate-200 rounded text-xs"
                          />
                          <input
                            type="number"
                            placeholder="Int %"
                            value={currentInt}
                            onChange={e => handleScoreChange(app.id, 'interview', Number(e.target.value))}
                            className="w-14 px-1.5 py-0.5 border border-slate-200 rounded text-xs"
                          />
                        </div>
                      ) : (
                        <span className="font-bold text-slate-900">Exam: {app.entranceExamScore}% | Int: {app.interviewScore}%</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        app.status === 'ENROLLED' ? 'bg-emerald-100 text-emerald-800' :
                        app.status === 'OFFERED' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right space-x-2">
                      {app.status === 'PENDING_INQUIRY' && (
                        <button
                          onClick={() => AADatabase.scoreApplicant(app.id, currentInt, currentExam)}
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 cursor-pointer"
                        >
                          Record Scores
                        </button>
                      )}
                      {app.status === 'OFFERED' && (
                        <button
                          onClick={() => AADatabase.enrollApplicant(app.id, app.targetClass, 'East')}
                          className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 cursor-pointer"
                        >
                          Enroll & Generate LIN
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. SIS DIRECTORY & CLASS PROMOTION (ALPHA-DOS-001, ALPHA-DOS-002)
   ========================================================================= */
function AASISDirectoryView({ onNavigate }: { onNavigate: (v: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('ALL');
  const [selectedStudent, setSelectedStudent] = useState<AlphaStudent | null>(AADatabase.students[0] || null);
  const [fromClass, setFromClass] = useState('S.1');
  const [toClass, setToClass] = useState('S.2');

  const filteredStudents = AADatabase.students.filter(s => {
    const matchesSearch = s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClassFilter === 'ALL' || s.classLevel === selectedClassFilter;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      <AlphaHeader
        title="Student 360 Directory"
        subtitle="Comprehensive learner biographical dossiers, academic standing, and class promotion engine"
        icon={Users}
        codeBadge="ALPHA-DOS-001"
        actions={
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search LIN or student name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="px-3 py-1.5 text-xs border border-slate-200 rounded-xl w-56 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <select
              value={selectedClassFilter}
              onChange={e => setSelectedClassFilter(e.target.value)}
              className="px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="ALL">All Class Levels</option>
              <option value="S.1">Senior 1</option>
              <option value="S.2">Senior 2</option>
              <option value="S.3">Senior 3</option>
              <option value="S.4">Senior 4</option>
              <option value="S.5-SCI">Senior 5</option>
              <option value="S.6">Senior 6</option>
            </select>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Student List */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Student Roster ({filteredStudents.length})</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredStudents.map(s => (
              <div
                key={s.id}
                onClick={() => setSelectedStudent(s)}
                className={`p-3 rounded-xl border cursor-pointer transition ${selectedStudent?.id === s.id ? 'bg-blue-50 border-blue-600 shadow-2xs' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-xs text-slate-900">{s.fullName}</p>
                    <p className="font-mono text-xs text-blue-700">{s.admissionNo}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-slate-200 text-slate-800 rounded text-[10px] font-bold">{s.classLevel} {s.stream}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Student 360 Dossier */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          {selectedStudent ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start pb-4 border-b border-slate-200">
                <div>
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">LIN: {selectedStudent.admissionNo}</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-2">{selectedStudent.fullName}</h3>
                  <p className="text-xs text-slate-500">{selectedStudent.house} • {selectedStudent.boardingStatus} • Joined {selectedStudent.admissionDate}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase">Fee Balance</p>
                  <p className={`text-xl font-black font-mono ${selectedStudent.feeBalance > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    ${selectedStudent.feeBalance}
                  </p>
                  {selectedStudent.feeBalance > 0 && (
                    <button
                      onClick={() => onNavigate('FINANCE')}
                      className="px-3 py-1 bg-sky-900 text-white rounded-lg text-xs font-bold hover:bg-sky-800 transition shadow-xs cursor-pointer"
                    >
                      View Fee Statement
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <p className="text-[10px] font-black uppercase text-slate-400">Class Level</p>
                  <p className="text-sm font-bold text-slate-800">{selectedStudent.classLevel} ({selectedStudent.stream})</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <p className="text-[10px] font-black uppercase text-slate-400">Guardian Contact</p>
                  <p className="text-xs font-bold text-slate-800">{selectedStudent.guardianName}</p>
                  <p className="text-[10px] font-mono text-slate-500">{selectedStudent.guardianPhone}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <p className="text-[10px] font-black uppercase text-slate-400">Attendance Rate</p>
                  <p className="text-sm font-black text-emerald-600">{selectedStudent.attendanceRate}%</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <p className="text-[10px] font-black uppercase text-slate-400">Medical Notes</p>
                  <p className="text-xs font-bold text-slate-800">{selectedStudent.medicalInfo || 'None'}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase text-slate-800 mb-2">Terminal Academic Summary ({AADatabase.activeTerm})</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  {AADatabase.assessments.filter(a => a.studentId === selectedStudent.id).map(a => (
                    <div key={a.id} className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800">{a.subjectId}</span>
                      <span className="font-mono text-slate-600">CA1: {a.cat1Score} | CA2: {a.cat2Score} | Exam: {a.examScore}</span>
                      <span className="font-black text-blue-700">Total: {a.totalScore}% (Grade {a.grade})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 text-center py-12">Select a student from the roster to view full 360 dossier.</p>
          )}
        </div>
      </div>

      {/* ALPHA-DOS-002: Class Promotion Engine */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">End-of-Year Class Promotion Engine</h3>
        <p className="text-xs text-slate-500">Advance eligible students with overall pass aggregate &gt;= 50% to the next academic level.</p>
        <div className="flex gap-3 items-center">
          <select value={fromClass} onChange={e => setFromClass(e.target.value)} className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white">
            <option value="S.1">From Senior 1 (S.1)</option>
            <option value="S.2">From Senior 2 (S.2)</option>
            <option value="S.3">From Senior 3 (S.3)</option>
          </select>
          <span className="text-xs font-bold text-slate-400">→</span>
          <select value={toClass} onChange={e => setToClass(e.target.value)} className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white">
            <option value="S.2">To Senior 2 (S.2)</option>
            <option value="S.3">To Senior 3 (S.3)</option>
            <option value="S.4">To Senior 4 (S.4)</option>
          </select>
          <button
            onClick={() => AADatabase.promoteStudents(fromClass, toClass)}
            className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            Execute Promotion Run
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   6. PARENT PORTAL WORKSPACE (ALPHA-PRT-001, ALPHA-PRT-002)
   ========================================================================= */
function AAParentPortalView({ onNavigate }: { onNavigate: (v: string) => void }) {
  const parentStudent = AADatabase.students[0];
  const [noteSubject, setNoteSubject] = useState('');
  const [noteMsg, setNoteMsg] = useState('');

  const handleSendNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteMsg || !parentStudent) return;
    AADatabase.sendParentNote(parentStudent.id, noteSubject || 'General Query', noteMsg, 'PARENT');
    setNoteSubject('');
    setNoteMsg('');
  };

  return (
    <div className="space-y-6">
      <AlphaHeader
        title="Guardian 360 Workspace"
        subtitle={`Primary Student: ${parentStudent.fullName} (${parentStudent.classLevel} ${parentStudent.stream})`}
        icon={HeartHandshake}
        codeBadge="ALPHA-PRT-001"
        actions={
          <button
            onClick={() => onNavigate('FINANCE')}
            className="px-4 py-2 bg-sky-900 text-white rounded-xl text-xs font-extrabold hover:bg-sky-800 transition shadow-xs cursor-pointer"
          >
            View Fee Statement
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400">Academic Standing</span>
          <p className="text-base font-black text-blue-700">Distinction 1 (Avg 83%)</p>
          <p className="text-[10px] text-slate-500">Class Rank: 2nd out of 45 students</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400">Attendance Record</span>
          <p className="text-base font-black text-emerald-600">{parentStudent.attendanceRate}% Present</p>
          <p className="text-[10px] text-slate-500">Zero unexcused absences recorded</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400">Term Fee Obligation</span>
          <p className="text-base font-black font-mono text-amber-600">${parentStudent.feeBalance}</p>
          <p className="text-[10px] text-slate-500">Boarding Status: {parentStudent.boardingStatus}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Guardian-Teacher In-App Messaging Notes</h3>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {AADatabase.parentNotes.filter(n => n.studentId === parentStudent.id).map(n => (
            <div key={n.id} className={`p-3 rounded-xl border text-xs ${n.sender === 'PARENT' ? 'bg-blue-50 border-blue-200 ml-8' : 'bg-slate-50 border-slate-200 mr-8'}`}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-900">{n.sender === 'PARENT' ? n.guardianName : n.teacherName}</span>
                <span className="text-[10px] text-slate-400">{n.timestamp}</span>
              </div>
              <p className="font-bold text-slate-800">{n.subject}</p>
              <p className="text-slate-600 mt-0.5">{n.message}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendNote} className="space-y-3">
          <input
            type="text"
            placeholder="Subject line..."
            value={noteSubject}
            onChange={e => setNoteSubject(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
          />
          <textarea
            rows={2}
            placeholder="Type your message note to the class teacher..."
            value={noteMsg}
            onChange={e => setNoteMsg(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-extrabold text-xs rounded-xl hover:bg-blue-700 transition cursor-pointer">
            Send Message Note
          </button>
        </form>
      </div>
    </div>
  );
}

/* =========================================================================
   7. STUDENT LEARNER PORTAL (ALPHA-PRT-003)
   ========================================================================= */
function AAStudentPortalView() {
  const student = AADatabase.students[0];

  return (
    <div className="space-y-6">
      <AlphaHeader
        title="Student Learner Portal"
        subtitle={`${student.fullName} • LIN: ${student.admissionNo} • Class ${student.classLevel} ${student.stream}`}
        icon={UserCheck}
        codeBadge="ALPHA-PRT-003"
        statusText="Active Student Session"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Today Period Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {AADatabase.timetable.map(tt => (
            <div key={tt.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] font-mono font-bold text-blue-700">{tt.period}</span>
              <p className="font-bold text-sm text-slate-900">{tt.subjectName} ({tt.subjectCode})</p>
              <p className="text-xs text-slate-500">{tt.teacherName} • {tt.room}</p>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-xs font-black uppercase text-slate-800 mb-3">Continuous Assessment & Exam Scores</h3>
          <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 uppercase text-slate-400 text-[10px] font-black border-b">
                <tr>
                  <th className="py-2.5 px-3">Subject</th>
                  <th className="py-2.5 px-3">CA1 Score</th>
                  <th className="py-2.5 px-3">CA2 Score</th>
                  <th className="py-2.5 px-3">Exam Score</th>
                  <th className="py-2.5 px-3">Total Aggregate</th>
                  <th className="py-2.5 px-3">Standing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {AADatabase.assessments.filter(a => a.studentId === student.id).map(a => (
                  <tr key={a.id}>
                    <td className="py-2.5 px-3 font-bold">{a.subjectId}</td>
                    <td className="py-2.5 px-3 font-mono">{a.cat1Score}/20</td>
                    <td className="py-2.5 px-3 font-mono">{a.cat2Score}/20</td>
                    <td className="py-2.5 px-3 font-mono">{a.examScore}/60</td>
                    <td className="py-2.5 px-3 font-black text-blue-800">{a.totalScore}%</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">{a.remarks}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   8. FACULTY TEACHING STUDIO (ALPHA-PRT-004)
   ========================================================================= */
function AAFacultyStudioView() {
  const [selectedStudentId, setSelectedStudentId] = useState(AADatabase.students[0]?.id || '');
  const [subjectCode, setSubjectCode] = useState('MTH101');
  const [ca1, setCa1] = useState(18);
  const [ca2, setCa2] = useState(17);
  const [exam, setExam] = useState(52);
  const [saved, setSaved] = useState(false);

  const handleSaveMarks = (e: React.FormEvent) => {
    e.preventDefault();
    AADatabase.enterMarks(selectedStudentId, subjectCode, ca1, ca2, exam);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <AlphaHeader
        title="Faculty Teaching Studio"
        subtitle="Continuous assessment score recording and marks entry studio"
        icon={FileEdit}
        codeBadge="ALPHA-PRT-004"
        statusText={saved ? "Marks Recorded!" : "Studio Ready"}
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSaveMarks} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Student</label>
            <select
              value={selectedStudentId}
              onChange={e => setSelectedStudentId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {AADatabase.students.map(s => (
                <option key={s.id} value={s.id}>{s.fullName} ({s.classLevel})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Subject Code</label>
            <select
              value={subjectCode}
              onChange={e => setSubjectCode(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="MTH101">Mathematics (MTH101)</option>
              <option value="PHY101">Physics (PHY101)</option>
              <option value="ENG101">English (ENG101)</option>
              <option value="CHE101">Chemistry (CHE101)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">CA1 Score (out of 20)</label>
            <input
              type="number"
              max={20}
              value={ca1}
              onChange={e => setCa1(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">CA2 Score (out of 20)</label>
            <input
              type="number"
              max={20}
              value={ca2}
              onChange={e => setCa2(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Exam Score (out of 60)</label>
            <input
              type="number"
              max={60}
              value={exam}
              onChange={e => setExam(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
            />
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full py-2.5 bg-blue-600 text-white font-extrabold rounded-xl text-xs hover:bg-blue-700 transition cursor-pointer">
              Save Continuous Assessment Scores
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================================================================
   9. TIMETABLE MATRIX (ALPHA-TT-001)
   ========================================================================= */
function AATimetableMatrixView() {
  return (
    <div className="space-y-6">
      <AlphaHeader
        title="Master Period Timetable"
        subtitle="Automated class timetable matrix and period conflict collision detector"
        icon={Calendar}
        codeBadge="ALPHA-TT-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700 border">
          <thead className="bg-slate-100 uppercase text-slate-500 text-[10px] font-black">
            <tr>
              <th className="py-2.5 px-3 border">Period / Time Slot</th>
              <th className="py-2.5 px-3 border">S.1 Stream A</th>
              <th className="py-2.5 px-3 border">S.2 Stream B</th>
              <th className="py-2.5 px-3 border">S.4 Science Stream</th>
            </tr>
          </thead>
          <tbody>
            {AADatabase.timetable.map(tt => (
              <tr key={tt.id} className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-mono font-bold border bg-slate-50">{tt.period}</td>
                <td className="py-2.5 px-3 border">
                  {tt.classLevel === 'S.1' ? (
                    <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="font-bold text-blue-900">{tt.subjectName}</p>
                      <p className="text-slate-500 text-[10px]">{tt.teacherName} • {tt.room}</p>
                    </div>
                  ) : <span className="text-slate-300">—</span>}
                </td>
                <td className="py-2.5 px-3 border"><span className="text-slate-300">—</span></td>
                <td className="py-2.5 px-3 border">
                  {tt.classLevel === 'S.4' ? (
                    <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                      <p className="font-bold text-indigo-900">{tt.subjectName}</p>
                      <p className="text-slate-500 text-[10px]">{tt.teacherName} • {tt.room}</p>
                    </div>
                  ) : <span className="text-slate-300">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   10. TERMINAL REPORT CARD CENTER (ALPHA-REP-001)
   ========================================================================= */
function AAReportCardCenterView() {
  const [selectedStudentId, setSelectedStudentId] = useState(AADatabase.students[0]?.id || '');
  const report = AADatabase.generateReportCard(selectedStudentId);

  return (
    <div className="space-y-6">
      <AlphaHeader
        title="Report Card Center"
        subtitle="Official terminal report card compiler, marks moderation, and principal signature"
        icon={ScrollText}
        codeBadge="ALPHA-REP-001"
        actions={
          <select
            value={selectedStudentId}
            onChange={e => setSelectedStudentId(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none"
          >
            {AADatabase.students.map(s => (
              <option key={s.id} value={s.id}>{s.fullName} ({s.classLevel})</option>
            ))}
          </select>
        }
      />

      {report.student && (
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="text-center border-b border-slate-200 pb-4">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{AADatabase.schoolProfile.name}</h3>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-1">{AADatabase.schoolProfile.motto} • OFFICIAL ACADEMIC REPORT CARD</p>
            <p className="text-xs font-black text-blue-800 mt-1">{report.term}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div><span className="text-slate-400 font-bold uppercase text-[10px]">Student Name:</span> <span className="font-bold text-slate-900 block">{report.student.fullName}</span></div>
            <div><span className="text-slate-400 font-bold uppercase text-[10px]">LIN Code:</span> <span className="font-mono font-bold text-blue-700 block">{report.student.admissionNo}</span></div>
            <div><span className="text-slate-400 font-bold uppercase text-[10px]">Class & Stream:</span> <span className="font-bold text-slate-900 block">{report.student.classLevel} {report.student.stream}</span></div>
          </div>

          <table className="w-full text-left text-xs text-slate-700 border">
            <thead className="bg-slate-100 uppercase text-slate-500 text-[10px] font-black border-b">
              <tr>
                <th className="py-2 px-3 border">Subject</th>
                <th className="py-2 px-3 border">CA (20%)</th>
                <th className="py-2 px-3 border">Exam (80%)</th>
                <th className="py-2 px-3 border">Total Aggregate</th>
                <th className="py-2 px-3 border">Grade</th>
                <th className="py-2 px-3 border">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {report.marks.map(m => (
                <tr key={m.id} className="border-b">
                  <td className="py-2 px-3 font-bold border">{m.subjectId}</td>
                  <td className="py-2 px-3 font-mono border">{m.cat1Score + m.cat2Score}/20</td>
                  <td className="py-2 px-3 font-mono border">{m.examScore}/60</td>
                  <td className="py-2 px-3 font-black border text-blue-800">{m.totalScore}%</td>
                  <td className="py-2 px-3 font-black border">{m.grade}</td>
                  <td className="py-2 px-3 border">{m.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-200">
            <div>
              <p className="text-xs font-bold text-blue-900">Overall Average Score: <span className="font-black text-lg font-mono">{report.avg}%</span></p>
              <p className="text-xs font-bold text-blue-900">Terminal Rank: <span className="font-black text-lg">{report.division}</span></p>
            </div>
            <div className="text-right">
              <p className="text-xs italic text-slate-600">" {report.headteacherRemarks} "</p>
              <p className="text-xs font-bold text-slate-800 mt-1">— {AADatabase.schoolProfile.principalName}, Headteacher</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   11. DAILY ATTENDANCE (ALPHA-ATT-001)
   ========================================================================= */
function AAAttendanceView() {
  return (
    <div className="space-y-6">
      <AlphaHeader
        title="Daily Attendance Register"
        subtitle="Daily attendance marking and automated parent SMS absence dispatcher"
        icon={CheckSquare}
        codeBadge="ALPHA-ATT-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 uppercase text-slate-400 text-[10px] font-black border-b">
            <tr>
              <th className="py-2.5 px-3">Student Name</th>
              <th className="py-2.5 px-3">Class</th>
              <th className="py-2.5 px-3">Guardian Contact</th>
              <th className="py-2.5 px-3">Attendance Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {AADatabase.students.map(s => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="py-3 px-3 font-bold text-slate-900">{s.fullName}</td>
                <td className="py-3 px-3">{s.classLevel} {s.stream}</td>
                <td className="py-3 px-3 font-mono text-slate-600">{s.guardianPhone}</td>
                <td className="py-3 px-3 space-x-2">
                  <button
                    onClick={() => AADatabase.recordAttendance(s.id, 'PRESENT')}
                    className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-500 cursor-pointer"
                  >
                    Mark Present
                  </button>
                  <button
                    onClick={() => AADatabase.recordAttendance(s.id, 'ABSENT')}
                    className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-500 cursor-pointer"
                  >
                    Mark Absent (SMS Alert)
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   12. CAMPUS FACILITIES & LOGISTICS (ALPHA-FAC-001)
   ========================================================================= */
function AAFacilitiesView() {
  return (
    <div className="space-y-6">
      <AlphaHeader
        title="Facilities & Logistics Hub"
        subtitle="Hostels bed allocation, library circulation loans, and transport fleet routes"
        icon={Building}
        codeBadge="ALPHA-FAC-001"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <h4 className="text-xs font-black uppercase text-slate-800">Dormitory Bed Roster</h4>
          {AADatabase.hostelBeds.map(b => (
            <div key={b.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">{b.dormName} {b.roomNo}</p>
                <p className="text-[10px] text-slate-500">{b.bedNo}</p>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${b.allocatedStudentId ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                {b.allocatedStudentId ? 'Occupied' : 'Vacant'}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <h4 className="text-xs font-black uppercase text-slate-800">Library Book Loans</h4>
          {AADatabase.libraryLoans.map(l => (
            <div key={l.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-0.5">
              <p className="font-bold text-slate-900">{l.bookTitle}</p>
              <p className="text-[10px] text-slate-500 font-mono">ISBN: {l.isbn}</p>
              <p className="text-[10px] font-bold text-blue-700">Due Date: {l.dueDate}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <h4 className="text-xs font-black uppercase text-slate-800">Transport Bus Routes</h4>
          {AADatabase.transportRoutes.map(r => (
            <div key={r.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-0.5">
              <p className="font-bold text-slate-900">{r.routeName}</p>
              <p className="text-[10px] text-slate-500">{r.vehicleNo} • Driver: {r.driverName}</p>
              <p className="text-[10px] font-bold text-emerald-700">Assigned Students: {r.assignedStudentIds.length}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   13. FEE STRUCTURE & FINANCIAL OPERATIONS (ALPHA-FEE-001)
   ========================================================================= */
function AAFinanceView() {
  return (
    <div className="space-y-6">
      <AlphaHeader
        title="Fee Billing & Finance"
        subtitle="Term fee structure, student billing invoices, and payment ledger"
        icon={CreditCard}
        codeBadge="ALPHA-FEE-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 uppercase text-slate-400 text-[10px] font-black border-b">
            <tr>
              <th className="py-2.5 px-3">Invoice Number</th>
              <th className="py-2.5 px-3">Student Name</th>
              <th className="py-2.5 px-3">Term</th>
              <th className="py-2.5 px-3">Billed</th>
              <th className="py-2.5 px-3">Paid</th>
              <th className="py-2.5 px-3">Balance</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {AADatabase.fees.map(inv => (
              <tr key={inv.id} className="hover:bg-slate-50">
                <td className="py-3 px-3 font-mono font-bold text-slate-900">{inv.invoiceNumber}</td>
                <td className="py-3 px-3 font-bold">{inv.studentName}</td>
                <td className="py-3 px-3">{inv.term}</td>
                <td className="py-3 px-3 font-mono">${inv.totalBilled}</td>
                <td className="py-3 px-3 font-mono text-emerald-600">${inv.totalPaid}</td>
                <td className="py-3 px-3 font-mono font-bold text-amber-600">${inv.balance}</td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${inv.status === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  {inv.balance > 0 && (
                    <button
                      onClick={() => AADatabase.receiveFeePayment(inv.id, inv.balance)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 cursor-pointer"
                    >
                      Record Payment
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   14. SYSTEM ADMIN & AUDIT TRAIL (ALPHA-ADMIN-001)
   ========================================================================= */
function AAAdminAuditView() {
  return (
    <div className="space-y-6">
      <AlphaHeader
        title="Security & Audit Trail"
        subtitle="Role-based access control and immutable system execution log"
        icon={ShieldCheck}
        codeBadge="ALPHA-ADMIN-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 uppercase text-slate-400 text-[10px] font-black border-b">
            <tr>
              <th className="py-2.5 px-3">Timestamp</th>
              <th className="py-2.5 px-3">Actor Role</th>
              <th className="py-2.5 px-3">Action Type</th>
              <th className="py-2.5 px-3">Audit Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {AADatabase.auditLogs.map(log => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-mono text-slate-500 text-[10px]">{log.timestamp}</td>
                <td className="py-2.5 px-3"><span className="px-2 py-0.5 bg-slate-100 font-bold text-slate-800 rounded text-[10px]">{log.actorRole}</span></td>
                <td className="py-2.5 px-3 font-bold text-blue-800">{log.action}</td>
                <td className="py-2.5 px-3 text-slate-600">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
