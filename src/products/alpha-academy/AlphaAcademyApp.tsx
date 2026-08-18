import React, { useState } from 'react';
import { 
  GraduationCap, Globe, Key, Users, UserPlus, HeartHandshake, UserCheck, 
  FileEdit, Calendar, ScrollText, CheckSquare, Building, CreditCard, 
  Settings, ShieldCheck, ChevronLeft, ChevronRight, Search, ArrowLeft, CheckCircle
} from 'lucide-react';
import { AlphaViews } from './AlphaViews';
import { AADatabase } from './AlphaStore';

export function AlphaAcademyApp({ onBackToHub }: { onBackToHub?: () => void }) {
  const [activeView, setActiveView] = useState('SIS_DIRECTORY');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarSearchTerm, setSidebarSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTerm, setCurrentTerm] = useState(AADatabase.activeTerm);

  const handleTermChange = (term: string) => {
    setCurrentTerm(term);
    AADatabase.activeTerm = term;
    AADatabase.notify();
  };

  // 20 verified capabilities with proper JUMO-owned codes
  const rawCategories = [
    {
      groupLabel: "Public & Identity",
      items: [
        { id: 'PUBLIC', code: 'JUMO-ALPHA-PUB-001', label: 'Public Portal', icon: Globe },
        { id: 'PUBLIC', code: 'JUMO-ALPHA-PUB-002', label: 'Online Application Intake', icon: UserPlus },
        { id: 'AUTH', code: 'JUMO-ALPHA-AUTH-001', label: 'Stakeholder Authentication', icon: Key },
        { id: 'AUTH', code: 'JUMO-ALPHA-AUTH-002', label: 'Identity Recovery', icon: Key },
      ]
    },
    {
      groupLabel: "Academic Operations",
      items: [
        { id: 'SIS_DIRECTORY', code: 'JUMO-ALPHA-SHELL-001', label: 'Executive Dashboard', icon: GraduationCap },
        { id: 'SIS_DIRECTORY', code: 'JUMO-ALPHA-DOS-001', label: 'Student 360 Directory', icon: Users },
        { id: 'SIS_DIRECTORY', code: 'JUMO-ALPHA-DOS-002', label: 'Cohort Promotion Engine', icon: Users },
        { id: 'ADMISSIONS', code: 'JUMO-ALPHA-ADM-001', label: 'Admissions Pipeline & Exam', icon: UserPlus },
        { id: 'ADMISSIONS', code: 'JUMO-ALPHA-ADM-002', label: 'LIN Stream Assignment', icon: UserPlus },
        { id: 'FACULTY_STUDIO', code: 'JUMO-ALPHA-PRT-004', label: 'Faculty Studio & Marks', icon: FileEdit },
        { id: 'TIMETABLE', code: 'JUMO-ALPHA-TT-001', label: 'Master Timetable Matrix', icon: Calendar },
        { id: 'REPORT_CARDS', code: 'JUMO-ALPHA-REP-001', label: 'Report Card Generation', icon: ScrollText },
        { id: 'ATTENDANCE', code: 'JUMO-ALPHA-ATT-001', label: 'Daily Attendance SMS', icon: CheckSquare },
      ]
    },
    {
      groupLabel: "Administration & Financial",
      items: [
        { id: 'FACILITIES', code: 'JUMO-ALPHA-FAC-001', label: 'Facilities, Hostels & Transport', icon: Building },
        { id: 'FINANCE', code: 'JUMO-ALPHA-FEE-001', label: 'Fee Billing & Bursary', icon: CreditCard },
        { id: 'SETTINGS', code: 'JUMO-ALPHA-SHELL-002', label: 'School Configuration Settings', icon: Settings },
        { id: 'ADMIN_AUDIT', code: 'JUMO-ALPHA-ADMIN-001', label: 'Security & Audit Trail', icon: ShieldCheck },
      ]
    },
    {
      groupLabel: "Stakeholder Portals",
      items: [
        { id: 'PARENT_PORTAL', code: 'JUMO-ALPHA-PRT-001', label: 'Parent Portal Workspace', icon: HeartHandshake },
        { id: 'PARENT_PORTAL', code: 'JUMO-ALPHA-PRT-002', label: 'Teacher-Parent Messaging', icon: HeartHandshake },
        { id: 'STUDENT_PORTAL', code: 'JUMO-ALPHA-PRT-003', label: 'Student Learner Portal', icon: UserCheck },
      ]
    }
  ];

  // Filter categories by sidebar search term
  const navCategories = rawCategories.map(group => {
    const items = group.items.filter(item => 
      item.label.toLowerCase().includes(sidebarSearchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(sidebarSearchTerm.toLowerCase())
    );
    return { ...group, items };
  }).filter(group => group.items.length > 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* NATIVE ALPHA ACADEMY TOP OPERATING NAV BAR */}
      <header className="bg-sky-950 text-white border-b border-sky-900 h-14 px-4 flex items-center justify-between sticky top-0 z-40 select-none shadow-md">
        
        {/* Left Side: School Identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sky-600 text-white rounded-xl flex items-center justify-center font-black text-sm shadow-md shadow-sky-500/20 shrink-0">
            🎓
          </div>
          <div className="min-w-0">
            <span className="font-extrabold tracking-tight text-white text-xs block truncate">JUMO ALPHA</span>
            <span className="text-[9px] font-bold text-sky-300/80 uppercase tracking-wider block leading-none">Alpha Academy K-12 School Management OS</span>
          </div>
        </div>

        {/* Middle: Integrated Search & Academic Term Switcher */}
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search LIN, student name, or code..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full h-8 bg-sky-900/50 hover:bg-sky-900/70 border border-sky-800 rounded-xl pl-8 pr-3 text-sky-100 placeholder-sky-300/60 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-sky-400 transition-all"
            />
            <Search className="w-3.5 h-3.5 text-sky-300 absolute left-2.5 top-2.2" />
          </div>

          <div className="flex items-center gap-2 bg-sky-900/60 px-3 py-1 rounded-xl border border-sky-800 text-xs">
            <span className="text-sky-300 font-extrabold text-[10px] uppercase">Active Term:</span>
            <select
              value={currentTerm}
              onChange={e => handleTermChange(e.target.value)}
              className="bg-transparent font-bold text-white focus:outline-none cursor-pointer text-xs"
            >
              <option value="2026 Term 1" className="bg-slate-900 text-white">2026 Term 1</option>
              <option value="2026 Term 2" className="bg-slate-900 text-white">2026 Term 2</option>
              <option value="2026 Term 3" className="bg-slate-900 text-white">2026 Term 3</option>
            </select>
          </div>
        </div>

        {/* Right Side: Role Badge & Return to Launcher */}
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 bg-sky-500/20 border border-sky-400/30 text-sky-200 rounded-lg text-[10px] font-extrabold uppercase tracking-wider">
            Role: {AADatabase.currentUserRole}
          </span>
          {onBackToHub && (
            <button
              onClick={onBackToHub}
              className="px-3 py-1.5 bg-sky-900 hover:bg-sky-800 border border-sky-700/60 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Launcher Hub</span>
            </button>
          )}
        </div>
      </header>

      {/* MAIN LAYOUT CONTAINER */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT COMMAND SIDEBAR */}
        <aside 
          className={`bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-200 shrink-0 hidden md:flex ${
            sidebarCollapsed ? "w-16" : "w-64"
          }`}
        >
          <div className="flex-1 overflow-y-auto py-4 px-2 space-y-4">
            {/* Sidebar toggle and search */}
            <div className="space-y-3">
              <div className={`flex items-center justify-between px-2 ${sidebarCollapsed ? "justify-center" : ""}`}>
                {!sidebarCollapsed && (
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    Capabilities
                  </span>
                )}
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer transition-all"
                  title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                  {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
              </div>

              {!sidebarCollapsed && (
                <div className="px-2 relative">
                  <input
                    type="text"
                    placeholder="Search capabilities..."
                    value={sidebarSearchTerm}
                    onChange={e => setSidebarSearchTerm(e.target.value)}
                    className="w-full h-8 bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all text-slate-700"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-4 top-2.5" />
                </div>
              )}
            </div>

            {/* Navigation Groups */}
            <div className="space-y-4 pt-2">
              {navCategories.map((group, idx) => (
                <div key={idx} className="space-y-1">
                  {!sidebarCollapsed && (
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider px-3 py-1 block border-b border-slate-50">
                      {group.groupLabel}
                    </span>
                  )}
                  {group.items.map(item => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;
                    return (
                      <button
                        key={item.code}
                        onClick={() => setActiveView(item.id)}
                        title={`${item.label} (${item.code})`}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isActive 
                            ? "bg-sky-50 text-sky-950 font-black border border-sky-200 shadow-2xs" 
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-sky-600" : "text-slate-400"}`} />
                          {!sidebarCollapsed && (
                            <div className="text-left min-w-0">
                              <span className="block truncate text-slate-800 font-extrabold">{item.label}</span>
                              <span className="block text-[8px] font-mono text-slate-400 truncate uppercase">{item.code}</span>
                            </div>
                          )}
                        </div>
                        {!sidebarCollapsed && (
                          <CheckCircle className="w-3.5 h-3.5 text-sky-500 shrink-0 ml-1 opacity-80" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Footer */}
          {!sidebarCollapsed && (
            <div className="p-4 border-t border-slate-100 bg-slate-50 text-[10px] text-slate-500 font-mono flex flex-col gap-1">
              <div className="flex items-center gap-2 font-bold text-sky-700 uppercase">
                <CheckCircle className="w-3.5 h-3.5" /> Checked & Certified
              </div>
              <span>Alpha OS • v2026.1</span>
            </div>
          )}
        </aside>

        {/* WORKSPACE VIEW AREA */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-100/60">
          <AlphaViews
            activeView={activeView}
            onNavigate={setActiveView}
          />
        </main>
      </div>
    </div>
  );
}
