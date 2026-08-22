import React, { useState } from 'react';
import { 
  GraduationCap, Users, BookOpen, DollarSign, Building2, Stethoscope, 
  Home, Award, Calendar, FileText, ChevronRight, CheckCircle2,
  Search, Bell, Settings, Menu, X, Shield, LayoutDashboard, Clock,
  Briefcase, Activity, Check, Sparkles, Code, UserCheck, AlertCircle,
  HelpCircle, RefreshCw, BarChart2, Radio, Library, ShieldCheck, Bus,
  Layers, HardDrive, UserPlus, SlidersHorizontal, ArrowLeft, ArrowUpRight
} from 'lucide-react';
import { AppLauncherPopup } from '../../../components/AppLauncherPopup';
import { EDUCATION_TEMPLATES, EducationTemplateId } from '../domain/EducationTemplateRegistry';

// Existing Submodules
import { EducationDashboard } from './modules/EducationDashboard';
import { GovernanceModule } from './modules/GovernanceModule';
import { RegistrarModule } from './modules/RegistrarModule';
import { SenateModule } from './modules/SenateModule';
import { BursaryModule } from './modules/BursaryModule';
import { ClinicModule } from './modules/ClinicModule';
import { LibraryModule } from './modules/LibraryModule';
import { HostelModule } from './modules/HostelModule';

// Specialized Template Views
import { PrePrimaryTemplateView } from './templates/PrePrimaryTemplateView';
import { PrimarySchoolTemplateView } from './templates/PrimarySchoolTemplateView';
import { SecondarySchoolTemplateView } from './templates/SecondarySchoolTemplateView';
import { VocationalTemplateView } from './templates/VocationalTemplateView';

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
  const [activeTemplateId, setActiveTemplateId] = useState<EducationTemplateId>('TERTIARY');
  const [activeModule, setActiveModule] = useState<string>('MOD_DASHBOARD');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [aiContext, setAiContext] = useState<string>('Academic Senate & Admissions');
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiThinking, setAiThinking] = useState<boolean>(false);

  const activeTemplate = EDUCATION_TEMPLATES[activeTemplateId];

  const handleRunAi = () => {
    if (!aiPrompt.trim()) return;
    setAiThinking(true);
    setTimeout(() => {
      setAiThinking(false);
      setAiResponse(`JUMO AI Academic Intelligence Report (${aiContext} — ${activeTemplate.displayName}):
• Enrolled Capacity: ${activeTemplate.metrics[0].value} verified across active registers.
• Performance Metric: ${activeTemplate.metrics[1].value} on continuous assessment.
• Financial Ledger Parity: Verified against FAAP General Ledger ($0.00 offset).`);
    }, 700);
  };

  const openContextualAi = (context: string) => {
    setAiContext(context);
    setAiPrompt(`Analyze ${context} indicators, attendance compliance, and fee reconciliation for ${activeTemplate.displayName}...`);
    setIsAiModalOpen(true);
  };

  const handleTemplateChange = (tmplId: EducationTemplateId) => {
    setActiveTemplateId(tmplId);
    setActiveModule('MOD_DASHBOARD');
  };

  const renderActiveWorkspace = () => {
    // If not on general dashboard, check for specific Tertiary modules
    if (activeTemplateId === 'TERTIARY') {
      switch (activeModule) {
        case 'TERT_SENATE':
        case 'MOD_GOVERNANCE':
          return <GovernanceModule />;
        case 'TERT_REGISTRAR':
        case 'MOD_REGISTRAR':
          return <RegistrarModule />;
        case 'TERT_PROGRAMMES':
        case 'MOD_SENATE':
          return <SenateModule />;
        case 'TERT_BURSARY':
        case 'MOD_BURSARY':
          return <BursaryModule />;
        case 'TERT_CLINIC':
        case 'MOD_CLINIC':
          return <ClinicModule />;
        case 'TERT_LIBRARY':
        case 'MOD_LIBRARY':
          return <LibraryModule />;
        case 'TERT_HOSTELS':
        case 'MOD_HOSTEL':
          return <HostelModule />;
        default:
          break;
      }
    }

    // Specialized template renderers
    switch (activeTemplateId) {
      case 'PRE_PRIMARY':
        return <PrePrimaryTemplateView activeSubmodule={activeModule} />;
      case 'PRIMARY':
        return <PrimarySchoolTemplateView activeSubmodule={activeModule} />;
      case 'SECONDARY':
        return <SecondarySchoolTemplateView activeSubmodule={activeModule} />;
      case 'VOCATIONAL':
        return <VocationalTemplateView activeSubmodule={activeModule} />;
      case 'TERTIARY':
      default:
        return <EducationDashboard onNavigate={onNavigate} onSelectModule={setActiveModule} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* 1. Sovereign Product Header */}
      <header className="h-14 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Toggle Sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-xs">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white block leading-none">
                JUMO <span className="text-blue-400 font-normal">UNIVERSAL SCHOOL ERP</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">Institutional Campus OS</span>
            </div>
          </div>
        </div>

        {/* Center: Template Selector */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase px-2 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-blue-400" /> Tier:
          </span>
          {(['PRE_PRIMARY', 'PRIMARY', 'SECONDARY', 'TERTIARY', 'VOCATIONAL'] as EducationTemplateId[]).map((tId) => {
            const tmpl = EDUCATION_TEMPLATES[tId];
            const isSelected = activeTemplateId === tId;
            return (
              <button
                key={tId}
                onClick={() => handleTemplateChange(tId)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tId === 'PRE_PRIMARY' ? 'Pre-Primary' : tId === 'PRIMARY' ? 'Primary' : tId === 'SECONDARY' ? 'Secondary' : tId === 'TERTIARY' ? 'Tertiary' : 'Vocational'}
              </button>
            );
          })}
        </div>

        {/* Right Action Icons & Home/Launchpad Button */}
        <div className="flex items-center gap-2">
          {/* Home / Launchpad Button */}
          {onNavigate && (
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white rounded-lg border border-slate-800 text-xs font-semibold transition cursor-pointer"
              title="Return to Application Launcher"
            >
              <Home className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Launchpad</span>
            </button>
          )}

          {/* Contextual AI Copilot Button */}
          <button 
            onClick={() => openContextualAi('Admissions, Attendance & Academic Performance')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-950/80 hover:bg-blue-900 text-blue-300 rounded-lg border border-blue-800 text-xs font-medium transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span className="hidden md:inline">Academic AI</span>
          </button>

          {/* OS App Switcher */}
          {onNavigate && (
            <AppLauncherPopup 
              currentProduct="JUMO-EDU-UNIVERSAL"
              onNavigate={onNavigate}
            />
          )}

          <div className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-300 font-bold text-xs">
            AP
          </div>
        </div>
      </header>

      {/* 2. Main Content Area: Sidebar + Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-0 hidden'} bg-slate-950 border-r border-slate-800 flex flex-col shrink-0 transition-all duration-200 z-20`}>
          {/* Template Info Card */}
          <div className="p-3 border-b border-slate-850 bg-slate-900/50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Active Academic Tier</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${activeTemplate.badgeBg}`}>
                {activeTemplate.code}
              </span>
            </div>
            <div className="text-xs font-bold text-white truncate">{activeTemplate.displayName}</div>
            <div className="text-[11px] text-slate-400 truncate mt-0.5">{activeTemplate.defaultRole}</div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto p-3 space-y-5">
            {/* Dashboard Link */}
            <div>
              <button
                onClick={() => setActiveModule('MOD_DASHBOARD')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeModule === 'MOD_DASHBOARD'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-blue-400" />
                <span>Tier Overview</span>
              </button>
            </div>

            {/* Template Nav Groups */}
            {activeTemplate.navGroups.map((grp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider px-3 mb-1">
                  {grp.group}
                </div>
                {grp.items.map((item) => {
                  const Icon = item.icon;
                  const isSelected = activeModule === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveModule(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer text-left ${
                        isSelected
                          ? 'bg-blue-600 text-white font-semibold shadow-xs'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                      }`}
                      title={item.description}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-slate-850 bg-slate-900/40 text-[11px] text-slate-400">
            <div className="flex items-center justify-between font-mono text-[10px]">
              <span>FAAP Zero-Offset</span>
              <span className="text-emerald-400 font-bold">Synchronized</span>
            </div>
          </div>
        </aside>

        {/* Right Main Workspace */}
        <main className="flex-1 bg-slate-900 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Top Metrics Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {activeTemplate.metrics.map((m, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-xs">
                  <div className="text-[11px] text-slate-400 font-medium truncate">{m.label}</div>
                  <div className="text-xl sm:text-2xl font-black text-white mt-1">{m.value}</div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-900 text-[10px]">
                    <span className="text-slate-500 truncate">{m.sublabel}</span>
                    {m.change && (
                      <span className="font-bold text-emerald-400 font-mono shrink-0 ml-1">{m.change}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Render Selected Workspace Component */}
            {renderActiveWorkspace()}
          </div>
        </main>
      </div>

      {/* Contextual AI Copilot Drawer / Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-white text-sm">Academic AI Intelligence Copilot</h3>
              </div>
              <button 
                onClick={() => setIsAiModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1 font-mono">Academic Context</label>
                <input 
                  type="text" 
                  value={aiContext} 
                  onChange={(e) => setAiContext(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1 font-mono">Analysis Prompt</label>
                <textarea 
                  rows={3}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsAiModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRunAi}
                  disabled={aiThinking}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 disabled:opacity-50"
                >
                  {aiThinking ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  Generate Analysis
                </button>
              </div>

              {aiResponse && (
                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                  {aiResponse}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
