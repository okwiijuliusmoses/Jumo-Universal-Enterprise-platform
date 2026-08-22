import React, { useState } from 'react';
import { 
  Baby, Heart, ShieldCheck, DollarSign, Users, BookOpen, 
  Settings, Code, ArrowLeft, LogOut, CheckCircle2, LayoutGrid,
  Menu, User
} from 'lucide-react';
import { NurseryAdminPortal, NurseryEcdMilestonesPortal } from './portals/NurseryPortals';
import { NurseryBursarPortal } from './portals/NurseryBursarPortal';

interface NurseryErpWebShellProps {
  onNavigate?: (route: string) => void;
}

export const NurseryErpWebShell: React.FC<NurseryErpWebShellProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'LAUNCHER' | 'ADMIN' | 'ECD' | 'BURSAR' | 'DEV'>('LAUNCHER');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Helper to render the product launcher
  const renderLauncher = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Nursery ERP Launcher</h1>
        <p className="text-slate-500 text-sm max-w-2xl">
          Select an early childhood development (ECD) operational office to manage toddler admissions, milestones, or pre-primary finance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { id: 'ADMIN', label: 'Enrollment & Admin', icon: Users, desc: 'Manage toddler registrations, guardian pickup authorizations, and pre-primary admissions.', color: 'text-pink-600', bg: 'bg-pink-50' },
          { id: 'ECD', label: 'ECD Milestones', icon: Heart, desc: 'Track developmental milestones, nutrition intake, and early childhood safeguarding logs.', color: 'text-pink-600', bg: 'bg-pink-50' },
          { id: 'BURSAR', label: 'Nursery FAAP Fees', icon: DollarSign, desc: 'Manage tuition collections, feeding budgets, and ECD operational financial ledgers.', color: 'text-pink-600', bg: 'bg-pink-50' },
          { id: 'DEV', label: 'Developer Center', icon: Code, desc: 'Access API endpoints for nursery system integration and automated data reporting.', color: 'text-slate-600', bg: 'bg-slate-50' }
        ].map(module => (
          <button
            key={module.id}
            onClick={() => setActiveTab(module.id as any)}
            className="group bg-white border border-slate-200 rounded-2xl p-6 text-left hover:shadow-xl hover:shadow-pink-100/50 hover:border-pink-100 transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-xl ${module.bg} ${module.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <module.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-pink-600 transition-colors">{module.label}</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">{module.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Sovereign Nursery Header */}
      <header className="border-b border-slate-200 bg-white px-4 h-14 flex items-center justify-between shadow-2xs sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <Menu className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center text-white shadow-xs font-black text-sm">
            <Baby className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs tracking-tight text-slate-900">JUMO NURSERY ERP</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-pink-100 text-pink-800 border border-pink-200 uppercase text-nowrap">
                ECD Sovereign
              </span>
            </div>
            <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-tight">Sovereign Pre-Primary OS</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onNavigate && (
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 text-xs font-semibold transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-pink-600" />
              <span className="hidden sm:inline">Product Gateway</span>
            </button>
          )}
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
            <User className="w-4 h-4" />
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Nursery Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-0 hidden'} bg-white border-r border-slate-200 flex flex-col shrink-0 transition-all duration-200 z-20`}>
          <div className="p-3.5 border-b border-slate-200 bg-slate-50/50">
            <div className="text-[10px] font-mono uppercase font-bold text-slate-500 mb-1">Nursery Instance</div>
            <div className="text-xs font-bold text-slate-900 truncate">Sovereign ECD Pre-Primary</div>
            <div className="text-[10px] text-slate-500 truncate mt-0.5">Infant Enrollment & Milestone Tracking</div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('LAUNCHER')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${activeTab === 'LAUNCHER' ? 'bg-pink-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                <LayoutGrid className={`w-4 h-4 ${activeTab === 'LAUNCHER' ? 'text-white' : 'text-slate-400'}`} />
                <span>Nursery Home</span>
              </button>

              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-3 mb-1 mt-4">
                OPERATIONAL OFFICES
              </div>
              
              <button
                onClick={() => setActiveTab('ADMIN')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${activeTab === 'ADMIN' ? 'bg-pink-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                <Users className={`w-4 h-4 ${activeTab === 'ADMIN' ? 'text-white' : 'text-pink-600'}`} />
                <span>Enrollment & Admin</span>
              </button>

              <button
                onClick={() => setActiveTab('ECD')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${activeTab === 'ECD' ? 'bg-pink-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                <Heart className={`w-4 h-4 ${activeTab === 'ECD' ? 'text-white' : 'text-pink-600'}`} />
                <span>ECD Milestones</span>
              </button>

              <button
                onClick={() => setActiveTab('BURSAR')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${activeTab === 'BURSAR' ? 'bg-pink-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                <DollarSign className={`w-4 h-4 ${activeTab === 'BURSAR' ? 'text-white' : 'text-pink-600'}`} />
                <span>Nursery FAAP Fees</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-1">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
                SYSTEM ADMIN
              </div>
              <button
                onClick={() => setActiveTab('DEV')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${activeTab === 'DEV' ? 'bg-pink-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                <Code className={`w-4 h-4 ${activeTab === 'DEV' ? 'text-white' : 'text-pink-600'}`} />
                <span>Developer API Center</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Product Workspace */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-100">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'LAUNCHER' && renderLauncher()}
            {activeTab === 'ADMIN' && <NurseryAdminPortal />}
            {activeTab === 'ECD' && <NurseryEcdMilestonesPortal />}
            {activeTab === 'BURSAR' && <NurseryBursarPortal />}
            {activeTab === 'DEV' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <Code className="w-6 h-6 text-pink-600" />
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">JUMO Nursery ERP Developer API Center</h2>
                    <p className="text-xs text-slate-500">Endpoints for toddler registration, ECD milestone logs & nursery fee sync.</p>
                  </div>
                </div>
                <pre className="bg-slate-900 text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto">
{`POST /api/v1/nursery/toddlers/register
GET  /api/v1/nursery/ecd/milestones?childId={id}
POST /api/v1/nursery/fees/invoice
GET  /api/v1/nursery/safeguarding/pickup-auth`}
                </pre>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
