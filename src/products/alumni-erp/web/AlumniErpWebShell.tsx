import React, { useState } from 'react';
import { 
  Users, Award, Globe, DollarSign, Briefcase, 
  Search, Bell, Settings, Menu, X, Shield, LayoutDashboard,
  Home, ChevronRight, UserCheck, CheckCircle2, QrCode, Sparkles,
  Calendar, HeartHandshake, TrendingUp, RefreshCw, Layers, ShieldCheck,
  Gift, GraduationCap, Building2, MapPin, Send, Check
} from 'lucide-react';
import { AppLauncherPopup } from '../../../components/AppLauncherPopup';

// Submodules
import { AlumniDashboard } from './modules/AlumniDashboard';
import { AlumniRegistryModule } from './modules/AlumniRegistryModule';
import { AlumniChaptersModule } from './modules/AlumniChaptersModule';
import { AlumniGivingModule } from './modules/AlumniGivingModule';
import { AlumniCareerModule } from './modules/AlumniCareerModule';

interface AlumniErpWebShellProps {
  onNavigate?: (route: string) => void;
  currentUser?: {
    name?: string;
    role?: string;
  };
}

export const AlumniErpWebShell: React.FC<AlumniErpWebShellProps> = ({ 
  onNavigate,
  currentUser = { name: 'Dr. Sarah K. Namubiru', role: 'GLOBAL ALUMNI PRESIDENT' }
}) => {
  const [activeTab, setActiveTab] = useState<string>('MOD_ALUMNI_DASHBOARD');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [aiContext, setAiContext] = useState<string>('Alumni Giving & Chapter Engagement');
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiThinking, setAiThinking] = useState<boolean>(false);

  const handleRunAi = () => {
    if (!aiPrompt.trim()) return;
    setAiThinking(true);
    setTimeout(() => {
      setAiThinking(false);
      setAiResponse(`JUMO AI Alumni Advancement Report (${aiContext}):
• Graduate Engagement Index: 84.6% active connection across 28,450 registered alumni.
• Capital Campaign Progress: $3,450,000.00 committed across 4 global endowment chairs.
• Mentorship Network: 1,420 undergraduate-alumni career pairings actively meeting.`);
    }, 800);
  };

  const openContextualAi = (context: string) => {
    setAiContext(context);
    setAiPrompt(`Analyze ${context}, donor retention patterns, and regional chapter vitality...`);
    setIsAiModalOpen(true);
  };

  // Grouped Navigation for Alumni Advancement
  const navGroups = [
    {
      group: 'ALUMNI',
      items: [
        { id: 'MOD_ALUMNI_REGISTRY', label: 'Graduate Census & Directory', icon: Users },
        { id: 'MOD_ALUMNI_CHAPTERS', label: 'Global Regional Chapters', icon: Globe },
      ]
    },
    {
      group: 'ENGAGEMENT',
      items: [
        { id: 'MOD_ALUMNI_EVENTS', label: 'Reunions & Events', icon: Calendar },
        { id: 'MOD_ALUMNI_MENTORSHIP', label: 'Mentorship Network', icon: HeartHandshake },
      ]
    },
    {
      group: 'CAREER',
      items: [
        { id: 'MOD_ALUMNI_CAREER', label: 'Career Services & Jobs', icon: Briefcase },
      ]
    },
    {
      group: 'GIVING',
      items: [
        { id: 'MOD_ALUMNI_GIVING', label: 'Endowments & Capital Giving', icon: DollarSign },
      ]
    },
    {
      group: 'INSTITUTION & ADMIN',
      items: [
        { id: 'MOD_TRANSCRIPTS', label: 'Certificates & Transcripts', icon: Award },
        { id: 'MOD_SECURITY', label: 'Security & Verification', icon: ShieldCheck },
      ]
    }
  ];

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'MOD_ALUMNI_REGISTRY':
        return <AlumniRegistryModule />;
      case 'MOD_ALUMNI_CHAPTERS':
        return <AlumniChaptersModule />;
      case 'MOD_ALUMNI_GIVING':
        return <AlumniGivingModule />;
      case 'MOD_ALUMNI_CAREER':
        return <AlumniCareerModule />;
      case 'MOD_ALUMNI_EVENTS':
      case 'MOD_ALUMNI_MENTORSHIP':
        return <AlumniCareerModule />;
      case 'MOD_TRANSCRIPTS':
        return (
          <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">Alumni Transcript & Certificate Verification</h2>
                  <p className="text-xs text-slate-500">Cryptographically verifiable graduation records with QR code verification</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Archived Graduate Degrees</div>
                  <div className="text-2xl font-black text-slate-900 mt-1">28,450</div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">100% Digitized Records</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Instant Verification Requests</div>
                  <div className="text-2xl font-black text-rose-600 mt-1">1,840</div>
                  <div className="text-xs text-slate-500 font-semibold mt-1">Direct employer API queries</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Digital Wallet Passes Issued</div>
                  <div className="text-2xl font-black text-blue-600 mt-1">12,650</div>
                  <div className="text-xs text-blue-600 font-semibold mt-1">Apple & Google Wallet pass enabled</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'MOD_ALUMNI_DASHBOARD':
      default:
        return (
          <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
            {/* Context & Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 mb-1">
                  <span>JUMO ALUMNI ERP</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-rose-700">Institutional Advancement & Endowment Workspace</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  Alumni Advancement Overview & Global Chapters
                </h1>
                <p className="text-xs md:text-sm text-slate-500 mt-1">
                  Sovereign network uniting global graduates, regional chapters, capital endowments, and career mentorship.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button 
                  onClick={() => openContextualAi('Alumni Giving & Chapter Engagement')}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  <span>Ask JUMO AI</span>
                </button>
              </div>
            </div>

            {/* Top Alumni KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Registered Alumni</span>
                  <Users className="w-4 h-4 text-rose-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">28,450</div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 19,210 Verified Profiles
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Endowments & Giving</span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">$3,450,000.00</div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" /> 4 Active Endowed Chairs
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Global Chapters</span>
                  <Globe className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">24 Chapters</div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 mt-1">
                  <MapPin className="w-3.5 h-3.5" /> North America, UK, Africa & Asia
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Mentorship Pairs</span>
                  <Briefcase className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">1,420 Active</div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-purple-600 mt-1">
                  <HeartHandshake className="w-3.5 h-3.5" /> 92% Positive Feedback
                </div>
              </div>
            </div>

            {/* Core Advancement Modules */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-black text-slate-900">Advancement & Engagement Modules</h2>
                <p className="text-xs text-slate-500">Dedicated operational workspaces for graduate directory records, fundraising campaigns, and career development.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { id: 'MOD_ALUMNI_REGISTRY', title: 'Graduate Census & Directory', desc: 'Searchable verified alumni directory with degree validation & career history', icon: Users, color: 'text-rose-600', bg: 'bg-rose-50' },
                  { id: 'MOD_ALUMNI_CHAPTERS', title: 'Global Regional Chapters', desc: 'Local and international alumni hubs, regional leadership elections & meetups', icon: Globe, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { id: 'MOD_ALUMNI_GIVING', title: 'Endowments & Capital Giving', desc: 'Annual fund contributions, capital pledges, scholarship funds & donor tax receipts', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { id: 'MOD_ALUMNI_CAREER', title: 'Career & Mentorship Hub', desc: 'Exclusive executive job openings, graduate internships & mentor matchmaking', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
                  { id: 'MOD_TRANSCRIPTS', title: 'Digital Credentials & QR ID', desc: 'Secure graduate credential pass, e-transcripts & instant degree verification', icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
                ].map((mod) => {
                  const Icon = mod.icon;
                  return (
                    <div key={mod.id} className="p-4.5 rounded-2xl border border-slate-200 hover:border-rose-500 transition-all bg-white shadow-xs flex flex-col justify-between">
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
                        onClick={() => setActiveTab(mod.id)}
                        className="w-full py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>Open Workspace</span>
                        <ChevronRight className="w-3.5 h-3.5 text-rose-400" />
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-black text-sm shadow-xs">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight text-white block leading-none">
                  JUMO <span className="text-rose-400 font-normal">ALUMNI ERP</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">Institutional Advancement OS</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search alumni, graduates, chapters, donations, campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500 transition"
              />
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            {/* Home / Launchpad Button */}
            {onNavigate && (
              <button
                onClick={() => onNavigate('/')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white rounded-lg border border-slate-800 text-xs font-semibold transition cursor-pointer"
                title="Return to Application Launcher"
              >
                <Home className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">Launchpad</span>
              </button>
            )}

            <button 
              onClick={() => openContextualAi('Advancement & Alumni Copilot')}
              className="px-2.5 py-1 text-xs font-bold text-rose-300 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/60 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">AI</span>
            </button>

            {/* App Switcher */}
            {onNavigate && (
              <AppLauncherPopup 
                currentProduct="JUMO-ALUMNI"
                onNavigate={onNavigate}
              />
            )}

            <button 
              onClick={() => setActiveTab('MOD_ALUMNI_DASHBOARD')}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
              title="Alerts"
            >
              <Bell className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-slate-800 mx-1" />

            {/* Profile Avatar */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-rose-700 text-white flex items-center justify-center text-xs font-bold">
                SN
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
              onClick={() => setActiveTab('MOD_ALUMNI_DASHBOARD')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-bold transition cursor-pointer ${
                activeTab === 'MOD_ALUMNI_DASHBOARD'
                  ? 'bg-rose-600 text-white shadow-xs'
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
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold transition text-left cursor-pointer ${
                      isSelected
                        ? 'bg-rose-50 text-rose-900 font-bold border border-rose-200'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-rose-600' : 'text-slate-400'}`} />
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
              onClick={() => openContextualAi('Advancement Analytics & Donor Relations')}
              className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>AI Copilot</span>
            </button>
            <button
              onClick={() => setActiveTab('MOD_ALUMNI_DASHBOARD')}
              className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-slate-400" />
              <span>Association Settings</span>
            </button>
          </div>
        </aside>

        {/* Main Product Workspace */}
        <main className="flex-1 min-w-0 bg-slate-50">
          {renderActiveModule()}
        </main>
      </div>

      {/* Contextual AI Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-rose-600" />
                <h3 className="font-black text-slate-900 text-base">JUMO AI Advancement Assistant</h3>
              </div>
              <button 
                onClick={() => setIsAiModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-[11px] font-mono text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                Active Context: {aiContext}
              </div>
              <textarea 
                rows={3}
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g. Recommend high-propensity donors for the new Engineering Innovation Hub capital campaign..."
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500"
              />
              <button 
                onClick={handleRunAi}
                disabled={aiThinking}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {aiThinking ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Advancement Patterns...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run Advancement Analysis</span>
                  </>
                )}
              </button>
            </div>

            {aiResponse && (
              <div className="p-4 bg-slate-950 text-rose-300 font-mono text-xs rounded-xl whitespace-pre-wrap border border-slate-800">
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
            Chapter Sync Healthy
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-purple-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            Privacy & Security Protected
          </span>
        </div>
        <div className="font-mono text-[10px]">
          JUMO ALUMNI ERP v6.1.0 • Global Advancement Registry
        </div>
      </footer>
    </div>
  );
};
