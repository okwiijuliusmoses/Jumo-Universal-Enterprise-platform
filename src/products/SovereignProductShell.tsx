
import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, Menu, User, ArrowLeft, ChevronRight, 
  Search, Bell, HelpCircle, Code, Shield, Sparkles
} from 'lucide-react';
import { ErpProductStructure, getProductStructure, ErpDepartmentDefinition, ErpOfficeDefinition } from './erp-structure-registries';
import { ApprovedProductDefinition, getApprovedProduct } from './ApprovedProductRegistry';

interface SovereignProductShellProps {
  productId: string;
  onNavigate?: (route: string) => void;
  renderPortal: (officeId: string) => React.ReactNode;
}

export const SovereignProductShell: React.FC<SovereignProductShellProps> = ({ 
  productId, 
  onNavigate,
  renderPortal
}) => {
  const [product, setProduct] = useState<ApprovedProductDefinition | null>(null);
  const [structure, setStructure] = useState<ErpProductStructure | null>(null);
  const [activeOfficeId, setActiveOfficeId] = useState<string>('LAUNCHER');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedDepts, setExpandedDepts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const p = getApprovedProduct(productId);
    const s = getProductStructure(productId);
    setProduct(p);
    setStructure(s);
    
    // Auto-expand all departments by default
    if (s) {
      const initialExpanded: Record<string, boolean> = {};
      s.departments.forEach(d => {
        initialExpanded[d.id] = true;
      });
      setExpandedDepts(initialExpanded);
    }
  }, [productId]);

  if (!product || !structure) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-12">
        <div className="text-center animate-pulse">
          <div className="w-12 h-12 rounded-full bg-slate-200 mx-auto mb-4" />
          <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">Initializing Sovereign Product Shell...</p>
        </div>
      </div>
    );
  }

  const toggleDept = (deptId: string) => {
    setExpandedDepts(prev => ({ ...prev, [deptId]: !prev[deptId] }));
  };

  const renderLauncher = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-2xl ${product.bgAccent} text-white flex items-center justify-center shadow-lg shadow-slate-200`}>
            <product.icon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{product.name} Launcher</h1>
            <p className="text-slate-500 text-sm mt-1">{product.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {structure.departments.map(dept => (
          <div key={dept.id} className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 border-l-2 border-slate-200 ml-1">
              {dept.name}
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {dept.offices.map(office => (
                <button
                  key={office.id}
                  onClick={() => setActiveOfficeId(office.id)}
                  className="group bg-white border border-slate-200 rounded-2xl p-5 text-left hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300 relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 ${product.bgAccent} opacity-0 group-hover:opacity-5 transition-opacity -mr-8 -mt-8 rounded-full`} />
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-slate-50 ${product.accentColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <office.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 group-hover:text-slate-700 transition-colors truncate">{office.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">{office.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Sovereign Universal Header */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition"
          >
            <Menu className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg ${product.bgAccent} flex items-center justify-center text-white shadow-sm`}>
              <product.icon className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xs tracking-tight uppercase">{product.name}</span>
                <span className={`px-1.5 py-0.5 rounded text-[8px] font-black ${product.bgAccent} bg-opacity-10 ${product.accentColor} border border-current uppercase`}>
                  {product.badge}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-8 hidden md:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
            <input 
              type="text" 
              placeholder={`Search ${product.name} offices, records, and workflows...`}
              className="w-full bg-slate-100 border-none rounded-full py-1.5 pl-9 pr-4 text-xs focus:ring-2 focus:ring-slate-200 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
            </button>
            <button className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition">
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
          
          <div className="h-6 w-px bg-slate-200 mx-1" />

          {onNavigate && (
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-bold hover:bg-slate-800 transition"
            >
              <ArrowLeft className="w-3 h-3" />
              EXIT TO GATEWAY
            </button>
          )}
          
          <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-500">
            <User className="w-4 h-4" />
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Dynamic Navigation Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-0 hidden'} bg-white border-r border-slate-200 flex flex-col shrink-0 transition-all duration-300 z-40 shadow-sm`}>
          <div className="p-4 border-b border-slate-100 bg-slate-50/30">
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Instance</div>
            <div className="text-xs font-bold text-slate-900 truncate">Sovereign {product.name}</div>
            <div className="text-[10px] text-slate-500 truncate mt-0.5">{product.owner}</div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            <button
              onClick={() => setActiveOfficeId('LAUNCHER')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${activeOfficeId === 'LAUNCHER' ? `${product.bgAccent} text-white shadow-md shadow-slate-200` : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <LayoutGrid className={`w-4 h-4 ${activeOfficeId === 'LAUNCHER' ? 'text-white' : 'text-slate-400'}`} />
              <span>Launcher Home</span>
            </button>

            <div className="my-4" />

            {structure.departments.map(dept => (
              <div key={dept.id} className="space-y-0.5 mb-4">
                <button
                  onClick={() => toggleDept(dept.id)}
                  className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors group"
                >
                  <span>{dept.name}</span>
                  <ChevronRight className={`w-3 h-3 transition-transform ${expandedDepts[dept.id] ? 'rotate-90' : ''}`} />
                </button>
                
                {expandedDepts[dept.id] && (
                  <div className="space-y-0.5 animate-in fade-in slide-in-from-left-2 duration-300">
                    {dept.offices.map(office => (
                      <button
                        key={office.id}
                        onClick={() => setActiveOfficeId(office.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[11px] font-bold transition-all ${activeOfficeId === office.id ? `${product.bgAccent} text-white shadow-md` : 'text-slate-600 hover:bg-slate-50 hover:pl-4'}`}
                      >
                        <office.icon className={`w-4 h-4 ${activeOfficeId === office.id ? 'text-white' : product.accentColor}`} />
                        <span>{office.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="mt-8 border-t border-slate-100 pt-4 px-3 space-y-3">
              <div className="flex items-center gap-2 text-slate-400">
                <Shield className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Security Verified</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">AI Powered Hub</span>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-slate-500">
                <Code className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-900">JUMO CORE v{product.version}</div>
                <div className="text-[9px] text-slate-500 font-mono">SOVEREIGN-ENGINE-01</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Dynamic Workspace */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-7xl mx-auto">
            {activeOfficeId === 'LAUNCHER' ? renderLauncher() : renderPortal(activeOfficeId)}
          </div>
        </main>
      </div>
    </div>
  );
};
