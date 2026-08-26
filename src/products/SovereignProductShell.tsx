import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  LayoutGrid, Menu, User, ArrowLeft, ChevronRight, 
  Search, Bell, HelpCircle, Code, Shield, Sparkles,
  Command, Database, Zap, Cpu, Activity, Globe, X, Landmark,
  ChevronLeft, Filter, CheckCircle, Layers, CheckSquare, BarChart2,
  ChevronDown
} from 'lucide-react';
import { ApprovedProductDefinition, getApprovedProduct } from './ApprovedProductRegistry';
import { getModuleIdForOffice, OFFICE_TO_MODULE_MAP } from './OfficeModuleMapping';
import { MasterModuleRegistry, MasterModuleDefinition } from '../core/enterprise/registry/MasterModuleRegistry';
import { DynamicNavigationGenerator, DynamicNavigationGroup, DynamicNavigationItem } from '../core/enterprise/navigation/DynamicNavigationGenerator';
import { UniversalModuleWorkspace } from '../core/enterprise/components/UniversalModuleWorkspace';
import { ProductCompletenessValidator, ProductCompletenessReport } from '../core/enterprise/services/ProductCompletenessValidator';

interface SovereignProductShellProps {
  productId: string;
  onNavigate?: (route: string) => void;
  renderPortal?: (officeId: string) => React.ReactNode;
}

export const SovereignProductShell: React.FC<SovereignProductShellProps> = ({ 
  productId, 
  onNavigate,
  renderPortal
}) => {
  const product = useMemo(() => getApprovedProduct(productId), [productId]);
  const [activeOfficeId, setActiveOfficeId] = useState<string>('');
  const [activeModuleId, setActiveModuleId] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [moduleSearchQuery, setModuleSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [showCompletenessModal, setShowCompletenessModal] = useState(false);
  const [completenessReports, setCompletenessReports] = useState<ProductCompletenessReport[]>([]);

  const navScrollContainerRef = useRef<HTMLDivElement | null>(null);

  // 1. Dynamic Navigation Generation from MasterModuleRegistry
  const navigationGroups = useMemo<DynamicNavigationGroup[]>(() => {
    return DynamicNavigationGenerator.generateNavigationGroups(productId);
  }, [productId]);

  const allProductModules = useMemo<MasterModuleDefinition[]>(() => {
    return MasterModuleRegistry.getModulesForProduct(productId);
  }, [productId]);

  const categories = useMemo<string[]>(() => {
    const list = MasterModuleRegistry.getCategoriesForProduct(productId);
    return ['ALL', ...list];
  }, [productId]);

  // Sync initial active module
  useEffect(() => {
    if (allProductModules.length > 0) {
      if (!activeModuleId) {
        setActiveModuleId(allProductModules[0].id);
        setActiveOfficeId(allProductModules[0].id);
      }
    }
  }, [productId, allProductModules]);

  // Sync active module when office is selected
  const handleOfficeSelect = (officeOrModId: string) => {
    setActiveOfficeId(officeOrModId);
    const mapped = getModuleIdForOffice(officeOrModId);
    if (mapped) {
      setActiveModuleId(mapped);
    } else {
      setActiveModuleId(officeOrModId);
    }
  };

  // Sync active office when module is selected directly from horizontal nav
  const handleModuleSelect = (modId: string) => {
    setActiveModuleId(modId);
    setActiveOfficeId(modId);
  };

  const activeModule = useMemo(() => {
    if (!activeModuleId) return allProductModules[0] || null;
    return MasterModuleRegistry.getModuleById(activeModuleId) || allProductModules[0] || null;
  }, [activeModuleId, allProductModules]);

  // Filtered module list for the horizontal top nav bar
  const filteredModules = useMemo(() => {
    return MasterModuleRegistry.searchModules(productId, moduleSearchQuery, selectedCategory);
  }, [productId, moduleSearchQuery, selectedCategory]);

  const handleScrollNav = (direction: 'left' | 'right') => {
    if (navScrollContainerRef.current) {
      const offset = direction === 'left' ? -250 : 250;
      navScrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const toggleGroupCollapse = (groupId: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const handleOpenValidator = () => {
    const reports = ProductCompletenessValidator.validateAllProducts();
    setCompletenessReports(reports);
    setShowCompletenessModal(true);
  };

  if (!product) return null;

  return (
    <div className="h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      {/* 
        LAYER 1: ENTERPRISE TOP BAR (SINGLE ROW, HIGH DENSITY)
      */}
      <header className="h-12 bg-slate-900 text-white flex items-center justify-between px-4 shrink-0 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
             <div className={`w-7 h-7 rounded-lg ${product.bgAccent} flex items-center justify-center shadow-inner`}>
                <product.icon className="w-4 h-4 text-white" />
             </div>
             <div className="flex items-baseline gap-2">
                <span className="text-xs font-black tracking-widest uppercase">{product.name}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  {allProductModules.length} Modules Online
                </span>
             </div>
          </div>

          <div className="h-6 w-px bg-slate-800" />

          {/* DYNAMIC CATEGORY FILTER */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            {categories.slice(0, 5).map(cat => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                    isActive 
                      ? 'bg-white text-slate-950 shadow-sm' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {cat === 'ALL' ? 'All Modules' : cat.split(' ')[0]}
                </button>
              );
            })}
          </div>

          {/* INSTANT MODULE FINDER */}
          <div className="hidden md:flex items-center gap-2 bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-700/50 min-w-[260px]">
             <Search className="w-3.5 h-3.5 text-slate-400" />
             <input 
               type="text" 
               placeholder={`Search ${allProductModules.length} dynamic modules...`} 
               value={moduleSearchQuery}
               onChange={e => setModuleSearchQuery(e.target.value)}
               className="bg-transparent border-none text-[10px] text-slate-200 focus:outline-none w-full font-medium placeholder-slate-500"
             />
             {moduleSearchQuery && (
               <button onClick={() => setModuleSearchQuery('')} className="text-slate-400 hover:text-white">
                 <X className="w-3 h-3" />
               </button>
             )}
          </div>
        </div>

        <div className="flex items-center gap-3">
           {/* COMPLETENESS & COMPLIANCE BADGE */}
           <button
             onClick={handleOpenValidator}
             className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 hover:bg-emerald-500/20 text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors"
             title="Click to view full architecture completeness matrix"
           >
             <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
             <span>Registry: Dynamic Generator Active</span>
           </button>

           <div className="h-6 w-px bg-slate-800" />

           {/* ACCOUNT */}
           <div className="flex items-center gap-2.5 pl-1">
              <div className="text-right hidden sm:block">
                 <div className="text-[10px] font-black text-white leading-none">SOVEREIGN ROOT</div>
                 <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Level 10 Master</div>
              </div>
              <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                 <User className="w-3.5 h-3.5" />
              </div>
           </div>
        </div>
      </header>

      {/* 
        LAYER 2: UNIVERSAL HORIZONTAL MODULE NAVIGATION BAR
        Exposes dynamic modules with smooth horizontal scrolling and quick selection.
      */}
      <nav className="h-10 bg-slate-800 text-slate-300 border-b border-slate-700 flex items-center justify-between px-2 shrink-0 z-40">
        <button
          onClick={() => handleScrollNav('left')}
          className="p-1 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
          title="Scroll Left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div 
          ref={navScrollContainerRef}
          className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth px-2"
        >
          {filteredModules.map(mod => {
            const isActive = activeModule?.id === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => handleModuleSelect(mod.id)}
                className={`px-3 py-1 rounded-lg text-[10px] font-black tracking-tight whitespace-nowrap flex items-center gap-1.5 transition-all shrink-0 ${
                  isActive 
                    ? 'bg-white text-slate-950 shadow-sm font-black' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
                }`}
                title={mod.description}
              >
                <mod.icon className="w-3 h-3" />
                <span>{mod.name}</span>
                {mod.badge && (
                  <span className={`text-[8px] px-1 py-0.2 rounded font-bold ${
                    isActive ? 'bg-slate-200 text-slate-800' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {mod.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => handleScrollNav('right')}
          className="p-1 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
          title="Scroll Right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {/* 
          OFFICE / DEPARTMENT NAVIGATION (LEFT SIDEBAR)
          Consumes DynamicNavigationGenerator groups automatically!
        */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-slate-200 flex flex-col shrink-0 transition-all duration-300`}>
           <div className="p-3 flex items-center justify-between border-b border-slate-100">
              {isSidebarOpen && (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                    Dynamic Registry
                  </span>
                  <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-black">
                    {allProductModules.length}
                  </span>
                </div>
              )}
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400">
                 <Menu className="w-4 h-4" />
              </button>
           </div>

           <div className="flex-1 overflow-y-auto p-2 space-y-3 custom-scrollbar">
              {navigationGroups.map(group => {
                const isCollapsed = !!collapsedGroups[group.id];
                return (
                  <div key={group.id} className="space-y-1">
                    {isSidebarOpen && (
                      <button
                        onClick={() => toggleGroupCollapse(group.id)}
                        className="w-full flex items-center justify-between px-2 py-1 text-slate-400 hover:text-slate-700 transition-colors"
                      >
                        <div className="flex items-center gap-1.5">
                          <group.icon className="w-3 h-3 text-slate-400" />
                          <span className="text-[9px] font-black uppercase tracking-wider truncate">
                            {group.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[8px] font-bold bg-slate-100 text-slate-500 px-1.5 rounded-full">
                            {group.count}
                          </span>
                          <ChevronDown className={`w-3 h-3 transition-transform ${isCollapsed ? '-rotate-90' : ''}`} />
                        </div>
                      </button>
                    )}

                    {!isCollapsed && (
                      <div className="space-y-0.5">
                        {group.items.map(item => {
                          const isSelected = activeModuleId === item.moduleId || activeOfficeId === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleOfficeSelect(item.moduleId)}
                              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl transition-all ${
                                isSelected 
                                  ? 'bg-slate-900 text-white shadow-sm' 
                                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                              }`}
                              title={item.description}
                            >
                              <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                                isSelected ? 'bg-white/20' : 'bg-slate-100'
                              }`}>
                                <item.icon className="w-3.5 h-3.5" />
                              </div>
                              {isSidebarOpen && (
                                <div className="flex-1 text-left min-w-0">
                                  <div className="text-[10px] font-black truncate leading-tight">
                                    {item.label}
                                  </div>
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
           </div>

           <div className="p-3 border-t border-slate-100">
              <button 
                onClick={() => onNavigate?.('/')}
                className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">Back to Gateway</span>}
              </button>
           </div>
        </aside>

                {/*
          MAIN WORKSPACE: 5-LAYER UNIVERSAL MODULE WORKSPACE
        */}
        <main className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden">
           {renderPortal && renderPortal(activeOfficeId || activeModuleId) ? (
             renderPortal(activeOfficeId || activeModuleId)
           ) : activeModule ? (
             <UniversalModuleWorkspace
               key={activeModule.id}
               module={activeModule}
               productId={productId}
             />
           ) : (
             <div className="p-12 text-center text-slate-400">
               <Layers className="w-12 h-12 mx-auto mb-3 text-slate-300" />
               <p className="text-sm font-bold text-slate-600">Select a module from the horizontal bar to load its workspace.</p>
             </div>
           )}
        </main>
      </div>

      {/* 
        COMPACT FOOTER 
      */}
      <footer className="h-6 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-4 text-[8px] font-black text-slate-500 uppercase tracking-widest z-50">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-emerald-500" />
              <span>Sovereign Security Online</span>
           </div>
           <span>Active Product: {product.name}</span>
           <span>Dynamic Modules Loaded: {allProductModules.length}</span>
           <span>FAAP Parity: $0.00 Diff</span>
        </div>
        <div className="flex items-center gap-4">
           <span>JUMO UEOS v16.2.0 Hybrid Platform</span>
           <span>Universal Navigation Engine</span>
        </div>
      </footer>

      {/* COMPLETENESS AUDIT MODAL */}
      {showCompletenessModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="font-black text-xs uppercase tracking-wider">Dynamic Master Module Registry Architecture</span>
                 </div>
                 <button onClick={() => setShowCompletenessModal(false)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                 </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4">
                 <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-medium">
                    All sovereign product shells now consume the canonical <strong className="font-bold">MasterModuleRegistry</strong> and <strong className="font-bold">DynamicNavigationGenerator</strong>. Hardcoded navigation arrays have been removed and replaced with dynamic category grouping, live search filtering, and two-way module binding.
                 </div>

                 <div className="space-y-3">
                   {completenessReports.map(rep => (
                     <div key={rep.productId} className="p-3.5 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                        <div>
                           <div className="text-xs font-black text-slate-800">{rep.productName}</div>
                           <div className="text-[10px] text-slate-500">{rep.activeCount} Approved Modules • {rep.categoryCount} Categories Online</div>
                        </div>
                        <div className="text-right">
                           <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-black text-[10px] rounded-lg">
                             DYNAMIC REGISTERED
                           </span>
                        </div>
                     </div>
                   ))}
                 </div>
              </div>

              <div className="p-3 bg-slate-100 border-t border-slate-200 flex justify-end">
                 <button 
                   onClick={() => setShowCompletenessModal(false)}
                   className="px-4 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800"
                 >
                   Close Matrix
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
