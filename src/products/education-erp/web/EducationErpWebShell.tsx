import React, { useState } from 'react';
import { 
  GraduationCap, Users, BookOpen, DollarSign, Building2, Stethoscope, 
  Home, Award, Calendar, FileText, ChevronRight, CheckCircle2,
  Search, Bell, Settings, Menu, X, Shield, LayoutDashboard, Clock,
  Briefcase, Activity, Check, Sparkles, Code, UserCheck, AlertCircle,
  HelpCircle, RefreshCw, BarChart2, Radio, Library, ShieldCheck, Bus,
  Layers, HardDrive, UserPlus, SlidersHorizontal, ArrowLeft, ArrowUpRight,
  Sliders, User, Heart
} from 'lucide-react';
import EducationTemplateService, { EducationTemplateId, EDUCATION_TEMPLATES } from '../domain/TemplateRegistry';

// Office Portals & Interface Templates
import { 
  BursarOffice, RegistrarOffice, HeadTeacherOffice,
  AcademicDosOffice, BoardingOffice, PrimarySchoolOffice,
  PrePrimaryNurseryOffice, LaboratoriesOffice, LibraryOffice,
  DisciplineWelfareOffice
} from '../offices';
import { BursarOfficePortal } from './portals/BursarOfficePortal';
import { RegistrarOfficePortal } from './portals/RegistrarOfficePortal';
import { AcademicDosPortal } from './portals/AcademicDosPortal';
import { HeadTeacherPortal } from './portals/HeadTeacherPortal';
import { TeacherGradebookPortal } from './portals/TeacherGradebookPortal';
import { ParentStudentPortal } from './portals/ParentStudentPortal';
import { SchoolErpControlCenter } from './portals/SchoolErpControlCenter';
import { SchoolErpDeveloperCenter } from './portals/SchoolErpDeveloperCenter';

// Specialized Template Views
import { PrePrimaryTemplateView } from './templates/PrePrimaryTemplateView';
import { PrimarySchoolTemplateView } from './templates/PrimarySchoolTemplateView';
import { SecondarySchoolTemplateView } from './templates/SecondarySchoolTemplateView';
import { VocationalTemplateView } from './templates/VocationalTemplateView';

// Existing Submodules for Tertiary
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
  currentUser = { name: 'Dr. Joseph Mukwaya', role: 'HEAD TEACHER & CHIEF EXECUTIVE' }
}) => {
  const [activeTemplateId, setActiveTemplateId] = useState<EducationTemplateId>('SECONDARY');
  const [activeView, setActiveView] = useState<string>('PORTAL_BURSAR');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [aiContext, setAiContext] = useState<string>('Academic & Financial Operations');
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiThinking, setAiThinking] = useState<boolean>(false);

  const activeTemplate = EDUCATION_TEMPLATES[activeTemplateId];

  const handleRunAi = () => {
    if (!aiPrompt.trim()) return;
    setAiThinking(true);
    setTimeout(() => {
      setAiThinking(false);
      setAiResponse(`JUMO School Intelligence Engine (${aiContext} — ${activeTemplate.displayName}):
• Enrollment Verified: ${activeTemplate.metrics[0]?.value || '1,280 Learners'} on canonical SIS registry.
• Continuous Assessment Rate: ${activeTemplate.metrics[1]?.value || '98.4%'} compliance under NCDC framework.
• Bursar FAAP Ledger Balance: Verified with zero variance ($0.00 offset).
• Statutory UNEB Center Status: Approved (U0892) for national examination candidate indexing.`);
    }, 600);
  };

  const openContextualAi = (context: string) => {
    setAiContext(context);
    setAiPrompt(`Generate institutional audit analysis for ${context} under ${activeTemplate.displayName}...`);
    setIsAiModalOpen(true);
  };

  const handleTierSwitch = (tier: EducationTemplateId) => {
    setActiveTemplateId(tier);
    EducationTemplateService.setInstitutionalTier(tier);
  };

  const renderActiveWorkspace = () => {
    switch (activeView) {
      // 1. Core Enterprise Office Templates (Tables & Split-Pane Layouts)
      case 'PORTAL_BURSAR':
      case 'OFFICE_BURSAR':
      case 'MOD_BURSAR':
      case 'SEC_FEES':
      case 'PRI_FEES':
      case 'ECD_FEES':
      case 'TVET_FEES':
        return <BursarOffice />;

      case 'PORTAL_REGISTRAR':
      case 'OFFICE_REGISTRAR':
      case 'MOD_REGISTRAR':
      case 'SEC_STUDENTS':
      case 'PRI_PUPILS':
        return <RegistrarOffice />;

      case 'PORTAL_ACADEMIC_DOS':
      case 'OFFICE_DOS':
      case 'MOD_DOS':
      case 'SEC_EXAMS':
      case 'PRI_ASSESSMENT':
      case 'PRI_REPORTS':
        return <AcademicDosOffice />;

      case 'PORTAL_BOARDING':
      case 'OFFICE_BOARDING':
      case 'SEC_BOARDING':
      case 'MOD_TERTIARY_HOSTEL':
        return <BoardingOffice />;

      case 'PORTAL_LABS':
      case 'OFFICE_LABS':
      case 'SEC_LABS':
      case 'TVET_WORKSHOPS':
        return <LaboratoriesOffice />;

      case 'PORTAL_LIBRARY':
      case 'OFFICE_LIBRARY':
      case 'SEC_LIBRARY':
      case 'MOD_TERTIARY_LIBRARY':
        return <LibraryOffice />;

      case 'PORTAL_DISCIPLINE':
      case 'OFFICE_DISCIPLINE':
      case 'SEC_DISCIPLINE':
        return <DisciplineWelfareOffice />;

      case 'PORTAL_HEAD_TEACHER':
      case 'OFFICE_HEAD_TEACHER':
      case 'MOD_HT':
      case 'SEC_DEPARTMENTS':
        return <HeadTeacherOffice />;

      case 'PORTAL_TEACHER':
      case 'MOD_TEACHER':
      case 'PRI_ATTENDANCE':
        return <TeacherGradebookPortal />;

      case 'PORTAL_PARENT_STUDENT':
      case 'MOD_PARENT':
      case 'ECD_COMMUNICATION':
        return <ParentStudentPortal />;

      // 2. Control Center & Developer Center
      case 'PORTAL_CONTROL_CENTER':
        return <SchoolErpControlCenter onTierChange={handleTierSwitch} />;

      case 'PORTAL_DEVELOPER_CENTER':
        return <SchoolErpDeveloperCenter />;

      // 3. Specialized Template Comprehensive Views
      case 'TMPL_PRE_PRIMARY':
      case 'ECD_CHILDREN':
      case 'ECD_ATTENDANCE':
      case 'ECD_MILESTONES':
      case 'ECD_CARE':
        return <PrePrimaryNurseryOffice />;

      case 'TMPL_PRIMARY':
      case 'PRI_CLASSES':
      case 'PRI_PLE':
      case 'PRI_THEMATIC':
      case 'PRI_TRANSPORT':
        return <PrimarySchoolOffice />;

      case 'TMPL_SECONDARY':
        return <SecondarySchoolTemplateView activeSubmodule={activeView} />;

      case 'TMPL_VOCATIONAL':
        return <VocationalTemplateView activeSubmodule={activeView} />;

      // 4. Tertiary Submodules
      case 'MOD_TERTIARY_SENATE':
      case 'MOD_GOVERNANCE':
        return <GovernanceModule />;

      case 'MOD_TERTIARY_PROGRAMMES':
        return <SenateModule />;

      case 'MOD_TERTIARY_CLINIC':
      case 'PRI_HEALTH':
        return <ClinicModule />;

      default:
        // Default to Bursar or Registrar workspace
        return <BursarOffice />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Sovereign School ERP Top Header - Clean White Enterprise Theme */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            title="Toggle Sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-xs">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-slate-900 block leading-none">
                JUMO <span className="text-blue-600 font-semibold">UNIVERSAL SCHOOL ERP</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">School Enterprise Management Platform</span>
            </div>
          </div>
        </div>

        {/* Center: Institutional Tier Selector */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase px-2 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-blue-600" /> Tier:
          </span>
          {(['PRE_PRIMARY', 'PRIMARY', 'SECONDARY', 'TERTIARY', 'VOCATIONAL'] as EducationTemplateId[]).map((tId) => {
            const isSelected = activeTemplateId === tId;
            return (
              <button
                key={tId}
                type="button"
                onClick={() => handleTierSwitch(tId)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-blue-700 shadow-2xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {tId === 'PRE_PRIMARY' ? 'Nursery / Pre-Primary' : tId === 'PRIMARY' ? 'Primary' : tId === 'SECONDARY' ? 'Secondary' : tId === 'TERTIARY' ? 'Tertiary' : 'Vocational'}
              </button>
            );
          })}
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Exit / Switcher Button */}
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 text-xs font-semibold transition cursor-pointer"
              title="Return to Product Gateway"
            >
              <Home className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Product Gateway</span>
            </button>
          )}

          {/* Academic AI Assistant */}
          <button 
            type="button"
            onClick={() => openContextualAi('Academic & Financial Metrics')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 text-xs font-semibold transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden md:inline">Academic AI</span>
          </button>

          {/* User Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-800 font-bold text-xs">
              HT
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-slate-900 leading-tight">{currentUser.name}</div>
              <div className="text-[10px] text-slate-500 font-medium">{currentUser.role}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar - Clean White Enterprise Theme */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-0 hidden'} bg-white border-r border-slate-200 flex flex-col shrink-0 transition-all duration-200 z-20`}>
          {/* Active Institution Badge */}
          <div className="p-3.5 border-b border-slate-200 bg-slate-50/50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-500">Active School Tier</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${activeTemplate.badgeBg}`}>
                {activeTemplate.code}
              </span>
            </div>
            <div className="text-xs font-bold text-slate-900 truncate">{activeTemplate.displayName}</div>
            <div className="text-[11px] text-slate-500 truncate mt-0.5">{activeTemplate.tagline}</div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {/* 1. Office Portals Group */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
                INSTITUTIONAL OFFICES
              </div>

              {[
                { id: 'PORTAL_BURSAR', label: 'Bursar Office & Treasury', icon: DollarSign, badge: 'FAAP' },
                { id: 'PORTAL_REGISTRAR', label: 'Registrar Office & SIS', icon: Users, badge: 'LIN' },
                { id: 'PORTAL_ACADEMIC_DOS', label: 'Academic Office (DOS)', icon: BookOpen, badge: 'UNEB' },
                { id: 'PORTAL_HEAD_TEACHER', label: 'Head Teacher Executive', icon: Building2 },
                { id: 'PORTAL_TEACHER', label: 'Teacher & Gradebook', icon: UserCheck },
                { id: 'PORTAL_PARENT_STUDENT', label: 'Parent & Student Portal', icon: Heart }
              ].map((office) => {
                const Icon = office.icon;
                const isSelected = activeView === office.id;
                return (
                  <button
                    key={office.id}
                    type="button"
                    onClick={() => setActiveView(office.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                      <span className="truncate">{office.label}</span>
                    </div>
                    {office.badge && (
                      <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                        isSelected ? 'bg-blue-700 text-blue-100' : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {office.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* 2. Tier Modules Navigation */}
            {activeTemplate.navGroups.map((grp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
                  {grp.group}
                </div>
                {grp.items.map((item) => {
                  const Icon = item.icon;
                  const isSelected = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveView(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white font-bold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}

            {/* 3. Control & Developer Centers */}
            <div className="pt-2 border-t border-slate-200 space-y-1">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
                SYSTEM ADMINISTRATION
              </div>

              <button
                type="button"
                onClick={() => setActiveView('PORTAL_CONTROL_CENTER')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeView === 'PORTAL_CONTROL_CENTER'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Sliders className={`w-4 h-4 ${activeView === 'PORTAL_CONTROL_CENTER' ? 'text-white' : 'text-blue-600'}`} />
                <span>School Control Center</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveView('PORTAL_DEVELOPER_CENTER')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeView === 'PORTAL_DEVELOPER_CENTER'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Code className={`w-4 h-4 ${activeView === 'PORTAL_DEVELOPER_CENTER' ? 'text-white' : 'text-slate-600'}`} />
                <span>School Developer Center</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Operational Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100">
          <div className="max-w-7xl mx-auto space-y-6">
            {renderActiveWorkspace()}
          </div>
        </main>
      </div>

      {/* Contextual AI Assistant Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Academic Intelligence Copilot</h3>
                  <p className="text-[11px] text-slate-500 font-mono">{aiContext}</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setIsAiModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">Inquiry / Audit Request:</label>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={3}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden text-slate-800"
                placeholder="Ask about continuous assessment, fee collection trends, or UNEB readiness..."
              />
            </div>

            {aiResponse && (
              <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-lg text-xs text-slate-800 whitespace-pre-line leading-relaxed font-sans">
                {aiResponse}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAiModalOpen(false)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={handleRunAi}
                disabled={aiThinking}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs disabled:opacity-50"
              >
                {aiThinking ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>{aiThinking ? 'Analyzing...' : 'Execute Analysis'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const EducationErpApplicationShell = EducationErpWebShell;
