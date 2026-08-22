import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Globe, 
  Lock, 
  UserCheck, 
  ShieldCheck, 
  Sparkles, 
  Bot, 
  Send, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  FileText, 
  DollarSign, 
  Award, 
  Newspaper, 
  HelpCircle, 
  Activity, 
  LogOut, 
  LayoutGrid, 
  GraduationCap, 
  Users, 
  Key, 
  Clock, 
  Sliders, 
  ExternalLink,
  ChevronRight,
  X
} from 'lucide-react';

interface UniversalErpPortalRuntimeProps {
  institutionName?: string;
  shortCode?: string;
  selectedFamily?: string;
  primaryColor?: string;
  slogan?: string;
  customDomain?: string;
  onNavigateAdmin?: () => void;
}

export const UniversalErpPortalRuntime: React.FC<UniversalErpPortalRuntimeProps> = ({
  institutionName = 'JUMO International University',
  shortCode = 'JIU',
  selectedFamily = 'education',
  primaryColor = '#0078D4',
  slogan = 'Excellence Through Digital Transformation',
  customDomain = 'jiu.jumo.app',
  onNavigateAdmin
}) => {
  // Mode State: 'public' | 'login' | 'workspace'
  const [viewState, setViewState] = useState<'public' | 'login' | 'workspace'>('public');

  // Login State
  const [loginId, setLoginId] = useState('JIU-2026-001');
  const [password, setPassword] = useState('••••••••');
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [loginRole, setLoginRole] = useState<'executive' | 'department' | 'student'>('executive');

  // Public Assistant State
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiChatHistory, setAiChatHistory] = useState([
    { sender: 'assistant', text: `Hello! I am the official JUMO ${institutionName} Institutional Assistant. How can I help you today with admissions, programs, FAAP fee verification, or institutional policies?` }
  ]);

  // Selected Department Workspace
  const [activeDeptWorkspace, setActiveDeptWorkspace] = useState<'academic' | 'finance' | 'hr' | 'research'>('academic');

  // Dynamic Assistant Name
  const assistantName = `JUMO ${institutionName.split(' ')[1] || 'Institutional'} Assistant`;

  const handleSendAiQuery = () => {
    if (!aiQuery.trim()) return;
    const userMsg = aiQuery;
    setAiChatHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
    setAiQuery('');

    setTimeout(() => {
      let reply = `Thank you for reaching out to ${institutionName}. Regarding your inquiry: "${userMsg}", our official platform guidelines specify that applications and FAAP fee verifications are processed directly via our digital portal on ${customDomain}.`;
      if (userMsg.toLowerCase().includes('fee') || userMsg.toLowerCase().includes('pay')) {
        reply = `FAAP Double-Entry Ledger handles all fee payments instantly. You can make payments via Mobile Money, Visa, or Bank Transfer under the Public Payments tab. A 1.5% settlement clearance applies automatically.`;
      } else if (userMsg.toLowerCase().includes('admission') || userMsg.toLowerCase().includes('apply')) {
        reply = `Online Admissions for the upcoming academic cycle are open! You can submit your documents, official transcripts, and ID copy directly under the Public Applications section.`;
      }
      setAiChatHistory(prev => [...prev, { sender: 'assistant', text: reply }]);
    }, 600);
  };

  return (
    <div className="bg-slate-50 min-h-[700px] border border-slate-200 rounded-3xl shadow-xl overflow-hidden my-4 max-w-7xl mx-auto font-sans">
      {/* Universal Top Portal Navigation Bar */}
      <header className="text-white p-4 px-6 flex items-center justify-between shadow-md" style={{ backgroundColor: primaryColor }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs border border-white/30 flex items-center justify-center font-black text-lg text-white">
            {shortCode.substring(0, 2)}
          </div>
          <div>
            <div className="font-black text-base leading-tight">{institutionName}</div>
            <div className="text-[11px] text-white/80 italic font-medium">"{slogan}"</div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="hidden sm:inline-block px-3 py-1 bg-white/10 rounded-lg text-white/90 font-mono text-[11px]">
            {customDomain}
          </span>

          {viewState === 'public' && (
            <button
              onClick={() => setViewState('login')}
              className="px-4 py-2 bg-white text-slate-900 rounded-xl hover:bg-slate-100 transition shadow-xs flex items-center gap-1.5 font-extrabold cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              Institutional Login
            </button>
          )}

          {viewState !== 'public' && (
            <button
              onClick={() => setViewState('public')}
              className="px-3.5 py-2 bg-black/30 hover:bg-black/40 text-white rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Exit Portal
            </button>
          )}

          {onNavigateAdmin && (
            <button
              onClick={onNavigateAdmin}
              className="px-3 py-2 bg-amber-400 text-slate-950 font-bold rounded-xl text-[11px] hover:bg-amber-300 transition"
            >
              Config Studio
            </button>
          )}
        </div>
      </header>

      {/* VIEW 1: PUBLIC INSTITUTION GATEWAY */}
      {viewState === 'public' && (
        <div className="space-y-8 p-6 md:p-8 animate-in fade-in duration-300">
          {/* Hero Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-mono font-bold rounded-full">
                <Globe className="w-3.5 h-3.5" /> OFFICIAL PUBLIC PORTAL GATEWAY
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Welcome to {institutionName}
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                Operating on the JUMO UEOS Enterprise Hybrid Platform. Access public admissions, student verification, digital library, FAAP fee payments, and automated institutional services.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setViewState('login')}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <Key className="w-4 h-4" /> Student / Staff Portal Login
                </button>
                <button
                  onClick={() => setAssistantOpen(true)}
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition flex items-center gap-2 backdrop-blur-xs cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Ask {assistantName}
                </button>
              </div>
            </div>

            {/* Quick Metrics Card */}
            <div className="w-full md:w-80 bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 space-y-4 text-xs font-mono z-10">
              <div className="font-extrabold text-amber-300 flex items-center justify-between border-b border-slate-700 pb-2">
                <span>INSTITUTION STATUS</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span>Enrolled Students:</span>
                  <span className="font-bold text-white">12,450</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Programs:</span>
                  <span className="font-bold text-white">84 Accredited</span>
                </div>
                <div className="flex justify-between">
                  <span>FAAP Ledger Status:</span>
                  <span className="font-bold text-emerald-400">0.00% Deficit</span>
                </div>
                <div className="flex justify-between">
                  <span>AEGIS Trust Score:</span>
                  <span className="font-bold text-purple-300">99.8% AEGIS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Public Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: 'Online Admissions', desc: 'Submit applications for 2026/2027 academic intake', icon: GraduationCap, tag: 'Open' },
              { title: 'Document Verification', desc: 'Verify official degrees, transcripts & certificates', icon: ShieldCheck, tag: 'Instant' },
              { title: 'FAAP Fee Payment', desc: 'Pay tuition via Mobile Money, Visa or Bank Kiosk', icon: DollarSign, tag: '1.5% Fee' },
              { title: 'Public Digital Library', desc: 'Browse open-access research papers & books', icon: BookOpen, tag: '24/7 Access' }
            ].map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div key={idx} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-slate-300 space-y-3 transition">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-mono text-[10px] font-bold rounded-md">
                      {srv.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-slate-900">{srv.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{srv.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Official Notices */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-blue-600" />
                Official Notices & Announcements
              </h3>
              <span className="text-xs font-mono text-slate-500">{institutionName} Newsroom</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-mono font-bold rounded">ACADEMIC</span>
                <div className="font-bold text-slate-900">2026 Opening Semester Timetable Released</div>
                <p className="text-slate-500 text-[11px]">Lectures commence September 1st. All students are required to clear fees via FAAP.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold rounded">FINANCE</span>
                <div className="font-bold text-slate-900">FAAP Mobile Payment Kiosks Live</div>
                <p className="text-slate-500 text-[11px]">Instant settlement via M-Pesa & Card now available with instant clearance receipt.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-mono font-bold rounded">RESEARCH</span>
                <div className="font-bold text-slate-900">Global AI Research Grant Awarded</div>
                <p className="text-slate-500 text-[11px]">{institutionName} secures $2.4M research funding for cognitive system development.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: UNIFIED ENTERPRISE LOGIN GATEWAY */}
      {viewState === 'login' && (
        <div className="p-8 max-w-md mx-auto my-8 animate-in fade-in duration-300 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-black text-2xl mx-auto flex items-center justify-center shadow-lg">
              {shortCode.substring(0, 2)}
            </div>
            <h2 className="text-xl font-black text-slate-900">Institutional Gateway Login</h2>
            <p className="text-xs text-slate-500">Sign in to your {institutionName} workspace</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-4 text-xs">
            {/* Role Selection */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl text-[11px] font-bold">
              <button
                onClick={() => setLoginRole('executive')}
                className={`py-1.5 rounded-lg transition ${loginRole === 'executive' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600'}`}
              >
                Executive
              </button>
              <button
                onClick={() => setLoginRole('department')}
                className={`py-1.5 rounded-lg transition ${loginRole === 'department' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600'}`}
              >
                Department
              </button>
              <button
                onClick={() => setLoginRole('student')}
                className={`py-1.5 rounded-lg transition ${loginRole === 'student' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600'}`}
              >
                Student/Member
              </button>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Institutional ID / Employee / Student No.</label>
              <input
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Password / AEGIS Token</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl font-mono text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px]">
              <span className="font-bold text-slate-700">AEGIS MFA Biometric Protection</span>
              <button
                onClick={() => setMfaEnabled(!mfaEnabled)}
                className={`px-2.5 py-1 rounded-md font-mono font-bold ${mfaEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}`}
              >
                {mfaEnabled ? 'MFA ACTIVE' : 'DISABLED'}
              </button>
            </div>

            <button
              onClick={() => setViewState('workspace')}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" /> Access {loginRole.toUpperCase()} Workspace
            </button>

            <div className="text-center pt-2 text-[10px] text-slate-400 font-mono">
              Protected by AEGIS Security & JUMO Trust Assurance
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: DEPARTMENT & EXECUTIVE OPERATIONAL WORKSPACE */}
      {viewState === 'workspace' && (
        <div className="p-6 md:p-8 space-y-6 animate-in fade-in duration-300">
          {/* Workspace Banner */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-mono font-bold rounded-full mb-1">
                AUTHENTICATED WORKSPACE
              </div>
              <h2 className="text-xl font-black">{institutionName} — Executive Command Portal</h2>
              <p className="text-xs text-slate-300">LoggedIn as Vice Chancellor / Chief Executive • AEGIS Session Active</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-blue-600 text-white font-mono text-xs font-bold rounded-xl shadow-xs">
                {shortCode} Workspace Live
              </span>
            </div>
          </div>

          {/* Department Environment Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
            {[
              { id: 'academic', label: 'Academic & Admissions', count: '84 Programs' },
              { id: 'finance', label: 'FAAP Fees & Treasury', count: '$0.00 Deficit' },
              { id: 'hr', label: 'Human Resources & Staff', count: '420 Personnel' },
              { id: 'research', label: 'Research & Innovation', count: '12 Active Grants' }
            ].map(w => (
              <button
                key={w.id}
                onClick={() => setActiveDeptWorkspace(w.id as any)}
                className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  activeDeptWorkspace === w.id
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md ring-2 ring-blue-400'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                }`}
              >
                <div className="font-black">{w.label}</div>
                <div className={`text-[10px] font-mono mt-1 ${activeDeptWorkspace === w.id ? 'text-blue-200' : 'text-slate-500'}`}>
                  {w.count}
                </div>
              </button>
            ))}
          </div>

          {/* Active Workspace View */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="font-black text-base text-slate-900 uppercase">
                Department Workspace: {activeDeptWorkspace} Environment
              </h3>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-mono font-bold rounded-lg border border-emerald-200">
                FAAP Ledger Synchronized
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="text-xs font-semibold text-slate-500">Department Operational Status</div>
                <div className="text-xl font-black text-slate-900">100% Operational</div>
                <div className="text-[10px] text-emerald-600 font-bold">FAAP Ledger Verified</div>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="text-xs font-semibold text-slate-500">Active Workflow Requests</div>
                <div className="text-xl font-black text-slate-900">18 Pending Signatures</div>
                <div className="text-[10px] text-blue-600 font-bold">Auto SLA Router Active</div>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="text-xs font-semibold text-slate-500">AEGIS Security Scope</div>
                <div className="text-xl font-black text-slate-900">Zero-Trust Active</div>
                <div className="text-[10px] text-purple-600 font-bold">Continuous Auditing</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING JUMO INSTITUTIONAL ASSISTANT */}
      {assistantOpen ? (
        <div className="fixed bottom-6 right-6 w-96 bg-white border border-slate-300 rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col h-[480px] animate-in slide-in-from-bottom duration-300">
          <div className="p-4 text-white flex items-center justify-between" style={{ backgroundColor: primaryColor }}>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <div>
                <div className="font-black text-xs">{assistantName}</div>
                <div className="text-[10px] text-white/80">Public Institutional AI Assistant</div>
              </div>
            </div>
            <button
              onClick={() => setAssistantOpen(false)}
              className="p-1 text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-slate-50">
            {aiChatHistory.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-2xl max-w-[85%] font-medium leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white ml-auto rounded-br-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-xs'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder={`Ask ${shortCode} Assistant...`}
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendAiQuery()}
              className="flex-1 p-2 bg-slate-100 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
            <button
              onClick={handleSendAiQuery}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAssistantOpen(true)}
          className="fixed bottom-6 right-6 p-4 text-white font-bold rounded-2xl shadow-2xl z-50 flex items-center gap-2 cursor-pointer transition hover:scale-105"
          style={{ backgroundColor: primaryColor }}
        >
          <Sparkles className="w-5 h-5 text-amber-300 animate-bounce" />
          <span className="text-xs font-black">{assistantName}</span>
        </button>
      )}
    </div>
  );
};
