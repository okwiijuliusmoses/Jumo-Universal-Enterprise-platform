import React, { useState } from 'react';
import { 
  GraduationCap, BookOpen, ShieldCheck, DollarSign, Users, 
  Settings, Code, ArrowLeft, LogOut, CheckCircle2, LayoutGrid,
  Menu, User
} from 'lucide-react';
import { PrimaryHeadteacherPortal, PrimaryThematicCurriculumPortal } from './portals/PrimaryPortals';
import { PrimaryBursarPortal } from './portals/PrimaryBursarPortal';

interface PrimaryErpWebShellProps {
  onNavigate?: (route: string) => void;
}

export const PrimaryErpWebShell: React.FC<PrimaryErpWebShellProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'LAUNCHER' | 'GOVERNANCE' | 'CURRICULUM' | 'BURSAR' | 'DEV'>('LAUNCHER');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Helper to render the product launcher
  const renderLauncher = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Primary School ERP Launcher</h1>
        <p className="text-slate-500 text-sm max-w-2xl">
          Sovereign operating system for primary education. Manage class streams, thematic curriculum, and school financial ledgers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { id: 'GOVERNANCE', label: 'P.1–P.7 Streams', icon: Users, desc: 'Manage pupil admissions, class stream distributions, and enrollment metrics for primary sections.', color: 'text-blue-600', bg: 'bg-blue-50' },
          { id: 'CURRICULUM', label: 'Thematic & Subjects', icon: BookOpen, desc: 'Coordinate lower primary thematic curriculum and upper primary core subject assessments.', color: 'text-blue-600', bg: 'bg-blue-50' },
          { id: 'BURSAR', label: 'Primary Bursar & FAAP', icon: DollarSign, desc: 'Centralized fee collections, school operational budgets, and FAAP integrated cashbooks.', color: 'text-blue-600', bg: 'bg-blue-50' },
          { id: 'DEV', label: 'Developer Center', icon: Code, desc: 'Access API endpoints for primary school system integration and academic reporting.', color: 'text-slate-600', bg: 'bg-slate-50' }
        ].map(module => (
          <button
            key={module.id}
            onClick={() => setActiveTab(module.id as any)}
            className="group bg-white border border-slate-200 rounded-2xl p-6 text-left hover:shadow-xl hover:shadow-blue-100/50 hover:border-blue-100 transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-xl ${module.bg} ${module.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <module.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{module.label}</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">{module.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Sovereign Primary School Header */}
      <header className="border-b border-slate-200 bg-white px-4 h-14 flex items-center justify-between shadow-2xs sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <Menu className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs font-black text-sm">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs tracking-tight text-slate-900">JUMO PRIMARY SCHOOL ERP</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-200 uppercase text-nowrap">
                P.1–P.7 Sovereign
              </span>
            </div>
            <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-tight">Sovereign Primary Operating System</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onNavigate && (
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 text-xs font-semibold transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Product Gateway</span>
            </button>
          )}
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
            <User className="w-4 h-4" />
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Primary Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-0 hidden'} bg-white border-r border-slate-200 flex flex-col shrink-0 transition-all duration-200 z-20`}>
          <div className="p-3.5 border-b border-slate-200 bg-slate-50/50">
            <div className="text-[10px] font-mono uppercase font-bold text-slate-500 mb-1">Primary Instance</div>
            <div className="text-xs font-bold text-slate-900 truncate">Sovereign Primary P.1–P.7</div>
            <div className="text-[10px] text-slate-500 truncate mt-0.5">National Curriculum Assessment</div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('LAUNCHER')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${activeTab === 'LAUNCHER' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                <LayoutGrid className={`w-4 h-4 ${activeTab === 'LAUNCHER' ? 'text-white' : 'text-slate-400'}`} />
                <span>Primary Home</span>
              </button>

              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-3 mb-1 mt-4">
                OPERATIONAL OFFICES
              </div>
              
              <button
                onClick={() => setActiveTab('GOVERNANCE')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${activeTab === 'GOVERNANCE' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                <Users className={`w-4 h-4 ${activeTab === 'GOVERNANCE' ? 'text-white' : 'text-blue-600'}`} />
                <span>P.1–P.7 Streams</span>
              </button>

              <button
                onClick={() => setActiveTab('CURRICULUM')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${activeTab === 'CURRICULUM' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                <BookOpen className={`w-4 h-4 ${activeTab === 'CURRICULUM' ? 'text-white' : 'text-blue-600'}`} />
                <span>Thematic & Subjects</span>
              </button>

              <button
                onClick={() => setActiveTab('BURSAR')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${activeTab === 'BURSAR' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                <DollarSign className={`w-4 h-4 ${activeTab === 'BURSAR' ? 'text-white' : 'text-blue-600'}`} />
                <span>Primary Bursar & FAAP</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-1">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
                SYSTEM ADMIN
              </div>
              <button
                onClick={() => setActiveTab('DEV')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${activeTab === 'DEV' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                <Code className={`w-4 h-4 ${activeTab === 'DEV' ? 'text-white' : 'text-blue-600'}`} />
                <span>Developer API Center</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Product Workspace */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-100">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'LAUNCHER' && renderLauncher()}
            {activeTab === 'GOVERNANCE' && <PrimaryHeadteacherPortal />}
            {activeTab === 'CURRICULUM' && <PrimaryThematicCurriculumPortal />}
            {activeTab === 'BURSAR' && <PrimaryBursarPortal />}
            {activeTab === 'DEV' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <Code className="w-6 h-6 text-blue-600" />
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">JUMO Primary School ERP Developer API Center</h2>
                    <p className="text-xs text-slate-500">Endpoints for P.1–P.7 admissions, PLE candidate roll & tuition fee sync.</p>
                  </div>
                </div>
                <pre className="bg-slate-900 text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto">
{`POST /api/v1/primary/pupils/admit
GET  /api/v1/primary/ple/candidates?class=P.7
POST /api/v1/primary/fees/invoice
GET  /api/v1/primary/curriculum/competencies`}
                </pre>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
