import React, { useState } from 'react';
import { 
  GraduationCap, Users, BookOpen, DollarSign, Building2, Stethoscope, 
  Home, Award, Calendar, FileText, ChevronRight, CheckCircle2,
  Search, Bell, Settings, Menu, X, Shield, LayoutDashboard, Clock,
  Briefcase, Activity, Check, Sparkles, Code, UserCheck, AlertCircle,
  HelpCircle, RefreshCw, BarChart2, Radio, Library, ShieldCheck, Bus,
  Layers, HardDrive, UserPlus
} from 'lucide-react';
import { PlatformSwitcher } from '../../../components/PlatformSwitcher';

// Existing Submodules
import { EducationDashboard } from './modules/EducationDashboard';
import { GovernanceModule } from './modules/GovernanceModule';
import { RegistrarModule } from './modules/RegistrarModule';
import { SenateModule } from './modules/SenateModule';
import { BursaryModule } from './modules/BursaryModule';
import { ClinicModule } from './modules/ClinicModule';
import { LibraryModule } from './modules/LibraryModule';
import { HostelModule } from './modules/HostelModule';

interface EducationErpWebShellProps {
  onNavigate?: (route: string) => void;
  currentUser?: {
    name?: string;
    role?: string;
  };
}

export const EducationErpWebShell: React.FC<EducationErpWebShellProps> = ({ 
  onNavigate,
  currentUser = { name: 'Prof. Apollo E. Otim', role: 'VICE CHANCELLOR & REGISTRAR' }
}) => {
  const [activeModule, setActiveModule] = useState<string>('MOD_DASHBOARD');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [aiContext, setAiContext] = useState<string>('Academic Senate & Admissions');
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiThinking, setAiThinking] = useState<boolean>(false);

  const handleRunAi = () => {
    if (!aiPrompt.trim()) return;
    setAiThinking(true);
    setTimeout(() => {
      setAiThinking(false);
      setAiResponse(`JUMO AI Academic Intelligence Report (${aiContext}):
• Student Retention: 98.4% across 14,280 active student profiles in 6 faculties.
• Tuition Collection: $4,820,000.00 verified on Alpha Cash Book (88.4% target realized).
• Senate Examination Clearance: Semester II moderation completed for 48 accredited degree programs.`);
    }, 800);
  };

  const openContextualAi = (context: string) => {
    setAiContext(context);
    setAiPrompt(`Analyze ${context} trends, student performance indicators, and fee compliance...`);
    setIsAiModalOpen(true);
  };

  // Grouped Navigation Items (Institution, Students, Academics, Finance, Services, People, Admin)
  const navGroups = [
    {
      group: 'INSTITUTION',
      items: [
        { id: 'MOD_GOVERNANCE', label: 'Governance & Council', icon: Building2 },
        { id: 'MOD_ADMIN', label: 'Administration Office', icon: Layers },
      ]
    },
    {
      group: 'STUDENTS',
      items: [
        { id: 'MOD_REGISTRAR', label: 'Student Admissions & SIS', icon: Users },
        { id: 'MOD_REGISTRATION', label: 'Course Registration', icon: UserCheck },
      ]
    },
    {
      group: 'ACADEMICS',
      items: [
        { id: 'MOD_SENATE', label: 'Senate & Curricula', icon: Award },
        { id: 'MOD_EXAMS', label: 'Examinations & Grading', icon: FileText },
        { id: 'MOD_TIMETABLES', label: 'Timetables & Classes', icon: Clock },
      ]
    },
    {
      group: 'FINANCE',
      items: [
        { id: 'MOD_BURSARY', label: 'Bursary & Alpha Cash Book', icon: DollarSign },
        { id: 'MOD_PROCUREMENT', label: 'Procurement & Stores', icon: HardDrive },
      ]
    },
    {
      group: 'SERVICES',
      items: [
        { id: 'MOD_CLINIC', label: 'Campus Clinic Services', icon: Stethoscope },
        { id: 'MOD_LIBRARY', label: 'Campus E-Library', icon: Library },
        { id: 'MOD_HOSTEL', label: 'Student Hostels', icon: Home },
      ]
    },
    {
      group: 'PEOPLE & ADMIN',
      items: [
        { id: 'MOD_STAFF', label: 'Faculty & HR Census', icon: Briefcase },
        { id: 'MOD_SECURITY', label: 'Campus Security & Access', icon: ShieldCheck },
      ]
    }
  ];

  const renderActiveWorkspace = () => {
    switch (activeModule) {
      case 'MOD_GOVERNANCE':
        return <GovernanceModule />;
      case 'MOD_REGISTRAR':
        return <RegistrarModule />;
      case 'MOD_SENATE':
        return <SenateModule />;
      case 'MOD_BURSARY':
        return <BursaryModule />;
      case 'MOD_CLINIC':
        return <ClinicModule />;
      case 'MOD_LIBRARY':
        return <LibraryModule />;
      case 'MOD_HOSTEL':
        return <HostelModule />;
      case 'MOD_REGISTRATION':
        return (
          <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">Student Semester Registration & Enrollment</h2>
                  <p className="text-xs text-slate-500">Automated prerequisite validation, PRN invoice generation, and bio-metric student attendance verification</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Active Registered Students</div>
                  <div className="text-2xl font-black text-slate-900 mt-1">14,280</div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">98.4% Enrollment Rate</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Pending Clearance / PRN</div>
                  <div className="text-2xl font-black text-amber-600 mt-1">214</div>
                  <div className="text-xs text-slate-500 font-semibold mt-1">Bursary reconciliation pending</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Senate Approved Courses</div>
                  <div className="text-2xl font-black text-blue-600 mt-1">340</div>
                  <div className="text-xs text-blue-600 font-semibold mt-1">Accredited 2026 Curriculum</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'MOD_DASHBOARD':
      default:
        return (
          <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
            {/* Context & Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 mb-1">
                  <span>JUMO UNIVERSAL EDUCATION ERP</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-blue-700">Institutional School & University Workspace</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  University Executive Overview & Academic Command
                </h1>
                <p className="text-xs md:text-sm text-slate-500 mt-1">
                  Comprehensive management of university governance, registrar SIS, senate curricula, bursary cash books, and student services.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button 
                  onClick={() => openContextualAi('University Senate & Student Affairs')}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Ask JUMO AI</span>
                </button>
              </div>
            </div>

            {/* Top Education KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Student Population</span>
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">14,280</div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 6 Accredited Faculties
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Tuition Collection</span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">$4,820,000.00</div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
                  <Activity className="w-3.5 h-3.5" /> 88.4% Realized Target
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Senate Moderation</span>
                  <Award className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">100% Approved</div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-purple-600 mt-1">
                  <Check className="w-3.5 h-3.5" /> Semester II Certified
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Hostel Occupancy</span>
                  <Home className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">94.2%</div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 mt-1">
                  <Radio className="w-3.5 h-3.5 text-emerald-500" /> 3,850 Bed Spaces
                </div>
              </div>
            </div>

            {/* Core Institutional Capability Workspaces */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-black text-slate-900">Institutional Operating Modules</h2>
                <p className="text-xs text-slate-500">Dedicated operational workspaces configured specifically for academic administration and student life.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { id: 'MOD_REGISTRAR', title: 'Registrar SIS & Admissions', desc: 'Student biometric profiles, identity generation, matriculation records & transcripts', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { id: 'MOD_BURSARY', title: 'Bursary & Alpha Cash Book', desc: 'Tuition PRN billing, ledger double-entry reconciliation & department budget allocations', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { id: 'MOD_SENATE', title: 'Senate & Academic Curricula', desc: 'Course catalog definitions, graduation criteria & curriculum accreditation', icon: Award, color: 'text-purple-600', bg: 'bg-purple-50' },
                  { id: 'MOD_GOVERNANCE', title: 'Governance & Council', desc: 'University charter records, council minutes, institutional resolutions & policy vaults', icon: Building2, color: 'text-slate-700', bg: 'bg-slate-100' },
                  { id: 'MOD_CLINIC', title: 'University Health Clinic', desc: 'Student outpatient care, medical history cards, lab diagnostics & pharmacy stocks', icon: Stethoscope, color: 'text-rose-600', bg: 'bg-rose-50' },
                  { id: 'MOD_LIBRARY', title: 'Campus E-Library Hub', desc: 'Catalog indexed resources, OPAC terminal lending & scientific repository access', icon: Library, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { id: 'MOD_HOSTEL', title: 'Hostel & Residence Hall', desc: 'Room allocations, warden maintenance tickets & resident hall census', icon: Home, color: 'text-cyan-600', bg: 'bg-cyan-50' },
                ].map((mod) => {
                  const Icon = mod.icon;
                  return (
                    <div key={mod.id} className="p-4.5 rounded-2xl border border-slate-200 hover:border-blue-500 transition-all bg-white shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2.5">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${mod.bg} ${mod.color}`}>
                            <Icon className="w-4.5 h-4.5" />
                          </div>
                          <h3 className="font-bold text-xs text-slate-900">{mod.title}</h3>
                        </div>
                        <p className="text-[11px] text-slate-500 mb-3">{mod.desc}</p>
                      </div>
                      <button
                        onClick={() => setActiveModule(mod.id)}
                        className="w-full py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>Open Workspace</span>
                        <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* 1. Restrained Top Header */}
      <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-13 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <PlatformSwitcher currentProductId="education-erp" onNavigate={onNavigate} />
          </div>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search students, staff, courses, grades, PRNs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => openContextualAi('Institutional Education Copilot')}
              className="px-2.5 py-1 text-xs font-bold text-blue-300 bg-blue-950/60 hover:bg-blue-900/80 border border-blue-800/60 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">AI</span>
            </button>

            <button 
              onClick={() => setActiveModule('MOD_DASHBOARD')}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
              title="Alerts"
            >
              <Bell className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-slate-800 mx-1" />

            {/* Profile Avatar */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs font-bold">
                AO
              </div>
            </div>

            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-1.5 text-slate-300 hover:text-white ml-1"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Container with Left Navigation & Workspace */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Product Navigation */}
        <aside className={`${isSidebarOpen ? 'w-60 block' : 'hidden'} md:block bg-white border-r border-slate-200 shrink-0 p-3.5 space-y-4 overflow-y-auto max-h-[calc(100vh-3.25rem)] sticky top-13 text-xs`}>
          <div>
            <button
              onClick={() => setActiveModule('MOD_DASHBOARD')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-bold transition cursor-pointer ${
                activeModule === 'MOD_DASHBOARD'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>
          </div>

          {navGroups.map((grp) => (
            <div key={grp.group} className="space-y-0.5">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                {grp.group}
              </h4>
              {grp.items.map(item => {
                const Icon = item.icon;
                const isSelected = activeModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveModule(item.id)}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold transition text-left cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}

          {/* Intelligence & Settings */}
          <div className="pt-2 border-t border-slate-100 space-y-0.5">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              INTELLIGENCE & ADMIN
            </h4>
            <button
              onClick={() => openContextualAi('Academic Analytics & Student Retention')}
              className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>AI Copilot</span>
            </button>
            <button
              onClick={() => setActiveModule('MOD_DASHBOARD')}
              className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-slate-400" />
              <span>Campus Settings</span>
            </button>
          </div>
        </aside>

        {/* Main Product Workspace */}
        <main className="flex-1 min-w-0 bg-slate-50">
          {renderActiveWorkspace()}
        </main>
      </div>

      {/* Contextual AI Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="font-black text-slate-900 text-base">JUMO AI Academic Assistant</h3>
              </div>
              <button 
                onClick={() => setIsAiModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                Active Context: {aiContext}
              </div>
              <textarea 
                rows={3}
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g. Audit student graduation requirements for Bachelor of Science in Software Engineering..."
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
              />
              <button 
                onClick={handleRunAi}
                disabled={aiThinking}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {aiThinking ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Academic Data...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run Academic Analysis</span>
                  </>
                )}
              </button>
            </div>

            {aiResponse && (
              <div className="p-4 bg-slate-950 text-blue-300 font-mono text-xs rounded-xl whitespace-pre-wrap border border-slate-800">
                {aiResponse}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Compact Universal Runtime Footer */}
      <footer className="bg-white border-t border-slate-200 py-2.5 px-6 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Runtime Online
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-blue-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Campus Sync Healthy
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-purple-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            Zero-Trust Protected
          </span>
        </div>
        <div className="font-mono text-[10px]">
          JUMO UNIVERSAL EDUCATION ERP v8.4.0 • Institutional Council Certified
        </div>
      </footer>
    </div>
  );
};
