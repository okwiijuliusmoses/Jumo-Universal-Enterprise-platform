import React, { useState } from 'react';
import { 
  School, GraduationCap, Users, BookOpen, Calculator, ShieldCheck, 
  Settings, Code, ArrowLeft, LogOut, CheckCircle2, LayoutGrid,
  Menu, User, Landmark, Microscope, Laptop, Library, ShieldAlert,
  ClipboardList, Bell, Search, Filter, MoreVertical, Building2,
  Calendar, FileText, TrendingUp
} from 'lucide-react';
import { 
  SecondarySenatePortal, 
  SecondaryRegistrarPortal, 
  SecondaryAcademicDosPortal, 
  SecondaryBursarPortal 
} from './portals/SecondaryPortals';

interface SecondaryErpWebShellProps {
  onNavigate?: (route: string) => void;
}

export const SecondaryErpWebShell: React.FC<SecondaryErpWebShellProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<string>('LAUNCHER');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const portals = [
    { id: 'SENATE', name: 'Principal & Senate', icon: School, desc: 'High-level institutional governance, O & A Level academic policy, and senate administration.', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'REGISTRAR', name: 'Registrar & Admissions', icon: Users, desc: 'Student enrollment, LIN verification, UCE/UACE registration and index number tracking.', color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'ACADEMIC', name: 'DOS & Academics', icon: BookOpen, desc: 'O/A Level subject combinations, NCDC curriculum tracking and teacher performance gradebooks.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'BURSAR', name: 'Bursar & Finance (FAAP)', icon: Calculator, desc: 'Boarding fees, science lab fees, UNEB registration fees and staff payroll financial ledger.', color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'SCIENCE', name: 'Science Laboratories', icon: Microscope, desc: 'Manage laboratory inventory, chemical stocks, and practical session scheduling for sciences.', color: 'text-rose-600', bg: 'bg-rose-50' },
    { id: 'ICT', name: 'ICT & Computing', icon: Laptop, desc: 'Digital literacy labs, computer hardware inventory, and student ICT competency tracking.', color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { id: 'LIBRARY', name: 'Library & Resources', icon: Library, desc: 'O/A Level textbook lending, digital research archives, and study resource management.', color: 'text-violet-600', bg: 'bg-violet-50' },
    { id: 'DEV', name: 'Secondary Developer API', icon: Code, desc: 'Access API endpoints for secondary system integration and automated data reporting.', color: 'text-slate-600', bg: 'bg-slate-50' },
  ];

  // Helper to render the product launcher
  const renderLauncher = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Secondary ERP Launcher</h1>
        <p className="text-slate-500 text-sm max-w-2xl">
          Sovereign operating system for secondary and high schools. Coordinate academic senate, UNEB center operations, and specialized science laboratories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portals.map(module => (
          <button
            key={module.id}
            onClick={() => setActiveTab(module.id)}
            className="group bg-white border border-slate-200 rounded-2xl p-6 text-left hover:shadow-xl hover:shadow-indigo-100/50 hover:border-indigo-100 transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-xl ${module.bg} ${module.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <module.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{module.name}</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">{module.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Sovereign Header */}
      <header className="border-b border-slate-200 bg-white px-4 h-14 flex items-center justify-between shadow-2xs sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <Menu className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs font-black text-sm">
            <School className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs tracking-tight text-slate-900 uppercase text-nowrap">JUMO SECONDARY ERP</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 uppercase text-nowrap">
                St. Lawrence Sovereign
              </span>
            </div>
            <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-tight">Secondary Operating System v24.1</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onNavigate && (
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 text-xs font-semibold transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Product Gateway</span>
            </button>
          )}
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
            <User className="w-4 h-4" />
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sovereign Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-0 hidden'} bg-white border-r border-slate-200 flex flex-col shrink-0 transition-all duration-200 z-20`}>
          <div className="p-3.5 border-b border-slate-200 bg-slate-50/50">
            <div className="text-[10px] font-mono uppercase font-bold text-slate-500 mb-1">Secondary Instance</div>
            <div className="text-xs font-bold text-slate-900 truncate">Sovereign High Academy</div>
            <div className="text-[10px] text-slate-500 truncate mt-0.5">O & A Level Benchmark</div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('LAUNCHER')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${activeTab === 'LAUNCHER' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                <LayoutGrid className={`w-4 h-4 ${activeTab === 'LAUNCHER' ? 'text-white' : 'text-slate-400'}`} />
                <span>Secondary Home</span>
              </button>

              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-3 mb-1 mt-4">
                ACADEMIC SENATE
              </div>
              
              {portals.slice(0, 4).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${activeTab === p.id ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'}`}
                >
                  <p.icon className={`w-4 h-4 ${activeTab === p.id ? 'text-white' : p.color}`} />
                  <span>{p.name}</span>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-1">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
                FACILITIES & DEPARTMENTS
              </div>
              {portals.slice(4).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${activeTab === p.id ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'}`}
                >
                  <p.icon className={`w-4 h-4 ${activeTab === p.id ? 'text-white' : p.color}`} />
                  <span>{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Product Workspace */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-100">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'LAUNCHER' && renderLauncher()}
            {activeTab === 'SENATE' && <SecondarySenatePortal />}
            {activeTab === 'REGISTRAR' && <SecondaryRegistrarPortal />}
            {activeTab === 'ACADEMIC' && <SecondaryAcademicDosPortal />}
            {activeTab === 'BURSAR' && <SecondaryBursarPortal />}
            
            {(activeTab === 'SCIENCE' || activeTab === 'ICT' || activeTab === 'LIBRARY') && (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
                <div className="inline-flex p-4 rounded-full bg-slate-50 text-slate-300">
                  {portals.find(p => p.id === activeTab)?.icon && React.createElement(portals.find(p => p.id === activeTab)!.icon, { className: "w-12 h-12" })}
                </div>
                <div className="max-w-xs mx-auto">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">{portals.find(p => p.id === activeTab)?.name}</h2>
                  <p className="text-xs text-slate-500 mt-2">Retrieving benchmark facility records for O & A Level specialized departments.</p>
                </div>
                <div className="flex items-center justify-center gap-2 pt-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200 animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce delay-75" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-150" />
                </div>
              </div>
            )}

            {activeTab === 'DEV' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <Code className="w-6 h-6 text-indigo-600" />
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">JUMO Secondary ERP Developer API Center</h2>
                    <p className="text-xs text-slate-500">Endpoints for O/A level combos, UNEB candidate logs & secondary fee sync.</p>
                  </div>
                </div>
                <pre className="bg-slate-900 text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto">
{`POST /api/v1/secondary/candidates/register
GET  /api/v1/secondary/uneb/results?studentId={id}
POST /api/v1/secondary/fees/boarding-invoice
GET  /api/v1/secondary/facilities/microscope-usage`}
                </pre>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
