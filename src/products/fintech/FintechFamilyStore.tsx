import React, { useState } from 'react';
import { 
  Building2, Layers, Search, Zap, CheckCircle2, AlertCircle, 
  Settings, Code, LayoutGrid, Cpu, ArrowRight, ArrowLeft,
  Database, Network, Shield, Workflow, Check, ArrowUpRight
} from 'lucide-react';
import { FintechFamilyRegistry, FintechFamilyDefinition } from './registries/FintechFamilyRegistry';
import { FintechCapabilityRegistry, FintechModuleRegistry, FintechCapability, FintechModule } from './registries/FintechBenchmarkRegistry';
import { UniversalFintechFamilyWorkspace } from './UniversalFintechFamilyWorkspace';

export const FintechFamilyStore: React.FC<{ familyId?: string, onBack?: () => void }> = ({ familyId, onBack }) => {
  const [selectedFamily, setSelectedFamily] = useState<FintechFamilyDefinition | null>(null);
  const [launchWorkspaceActive, setLaunchWorkspaceActive] = useState<boolean>(false);
  
  React.useEffect(() => {
    if (familyId) {
      const found = FintechFamilyRegistry.find(f => f.id === familyId) || null;
      setSelectedFamily(found);
      setLaunchWorkspaceActive(false);
    }
  }, [familyId]);

  const [activeTab, setActiveTab] = useState<'overview' | 'capabilities' | 'modules' | 'integrations' | 'developer'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFamilies = FintechFamilyRegistry.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group by category
  const groupedFamilies = filteredFamilies.reduce((acc, family) => {
    if (!acc[family.category]) acc[family.category] = [];
    acc[family.category].push(family);
    return acc;
  }, {} as Record<string, FintechFamilyDefinition[]>);

  if (selectedFamily && launchWorkspaceActive) {
    return <UniversalFintechFamilyWorkspace family={selectedFamily} onBack={() => setLaunchWorkspaceActive(false)} />;
  }

  if (selectedFamily) {
    const capabilities = FintechCapabilityRegistry.filter(c => c.familyId === selectedFamily.id);
    const modules = FintechModuleRegistry.filter(m => m.familyId === selectedFamily.id);
    
    const implementedCount = capabilities.filter(c => ['IMPLEMENTED', 'VERIFIED', 'EXISTING'].includes(c.implementationStatus)).length;
    const coverage = capabilities.length > 0 ? Math.round((implementedCount / capabilities.length) * 100) : 0;

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        {/* Deep Dive Header */}
        <header className="bg-slate-950 text-white px-6 py-4 border-b border-slate-800 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  if (onBack) onBack();
                  else setSelectedFamily(null);
                }}
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest mb-1">
                  <span>JUMO FINTECH</span>
                  <span className="text-slate-600">/</span>
                  <span>Financial Families</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-emerald-400">{selectedFamily.category}</span>
                </div>
                <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
                  {selectedFamily.name}
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-mono rounded border border-emerald-500/30">
                    {selectedFamily.code}
                  </span>
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 bg-slate-900 rounded-lg border border-slate-800 flex items-center gap-2 text-xs font-bold">
                <span className="text-slate-400">Benchmark Coverage:</span>
                <span className={coverage > 80 ? 'text-emerald-400' : 'text-amber-400'}>{coverage}%</span>
              </div>
              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2">
                <Zap className="w-4 h-4" /> Install Family
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-1 space-y-2">
            {[
              { id: 'overview', label: 'Architecture Overview', icon: LayoutGrid },
              { id: 'capabilities', label: 'Benchmark Capabilities', icon: CheckCircle2 },
              { id: 'modules', label: 'Modules & Submodules', icon: Layers },
              { id: 'integrations', label: 'Cross-Family Integrations', icon: Network },
              { id: 'developer', label: 'Developer & APIs', icon: Code }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 font-bold text-sm transition text-left ${
                  activeTab === tab.id 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            ))}
          </aside>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-black text-slate-900">Family Blueprint</h2>
                    <button 
                      onClick={() => setLaunchWorkspaceActive(true)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
                    >
                      <LayoutGrid className="w-4 h-4" /> Launch Workspace
                    </button>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{selectedFamily.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="text-3xl font-black text-slate-900">{modules.length}</div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Modules</div>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="text-3xl font-black text-slate-900">{capabilities.length}</div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Capabilities</div>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="text-3xl font-black text-emerald-600">{coverage}%</div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Verified</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <Database className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-bold text-sm">Installation State</h3>
                  </div>
                  <div className="font-mono text-xs space-y-2 text-slate-300">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span>Status</span>
                      <span className="text-emerald-400 font-bold">{selectedFamily.status}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 py-2">
                      <span>Version</span>
                      <span>{selectedFamily.version}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 py-2">
                      <span>Dependencies</span>
                      <span>FAM_LEDGER, FAM_PAY_SWITCH</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Verification</span>
                      <span className="text-emerald-400">PASSED</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'capabilities' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-in fade-in duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-black text-slate-900">Benchmark Traceability Matrix</h2>
                    <p className="text-xs text-slate-500 mt-1">Extracted capabilities and implementation status.</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {capabilities.length === 0 ? (
                    <div className="p-6 text-center text-sm text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
                      No capabilities benchmarked for this family yet.
                    </div>
                  ) : (
                    capabilities.map(cap => (
                      <div key={cap.id} className="p-4 border border-slate-200 rounded-xl hover:border-emerald-200 hover:bg-emerald-50/10 transition">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-sm text-slate-900">{cap.name}</h3>
                              {cap.isExtractedFromPrevious && (
                                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-bold uppercase rounded border border-blue-200">
                                  Preserved from Legacy
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-600 mt-1">{cap.description}</p>
                          </div>
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                            ['IMPLEMENTED', 'VERIFIED', 'EXISTING'].includes(cap.implementationStatus) 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : cap.implementationStatus === 'PARTIAL' 
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-slate-100 text-slate-600'
                          }`}>
                            {cap.implementationStatus}
                          </span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-100">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Benchmark Sources</div>
                          <div className="flex flex-wrap gap-2">
                            {cap.benchmarks.map((b, i) => (
                              <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs">
                                <span className="font-medium text-slate-700">{b.source}</span>
                                <span className="text-slate-400">&bull;</span>
                                <span className="text-slate-500 italic truncate max-w-[200px]">{b.notes}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'modules' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-in fade-in duration-300">
                <h2 className="text-lg font-black text-slate-900 mb-6">Module Boundaries</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {modules.length === 0 ? (
                    <div className="col-span-2 p-6 text-center text-sm text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
                      No modules registered.
                    </div>
                  ) : (
                    modules.map(mod => (
                      <div key={mod.id} className="p-4 border border-slate-200 rounded-xl relative overflow-hidden group">
                        <div className={`absolute top-0 left-0 w-1 h-full ${mod.isCore ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                        <div className="flex items-center justify-between mb-2 pl-2">
                          <h3 className="font-bold text-sm text-slate-900">{mod.name}</h3>
                          <span className="text-[10px] font-mono text-slate-400">{mod.version}</span>
                        </div>
                        <p className="text-xs text-slate-500 pl-2">{mod.description}</p>
                        <div className="mt-3 pl-2 flex items-center gap-2">
                          <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded ${
                            mod.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {mod.status}
                          </span>
                          {mod.isCore && (
                            <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-[9px] font-black uppercase rounded">
                              Core Module
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'integrations' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-in fade-in duration-300">
                <h2 className="text-lg font-black text-slate-900 mb-6">Cross-Family Integrations</h2>
                <div className="space-y-4">
                  {[
                    { source: selectedFamily.name, target: 'FAAP General Ledger', event: 'Transaction Settled', action: 'Auto-posts double-entry cryptographic record to FAAP' },
                    { source: selectedFamily.name, target: 'JUMO Identity & KYC', event: 'User Onboarding', action: 'Validates Tier-1 KYC before allowing transactions' },
                    { source: selectedFamily.name, target: 'Universal Payment Switch', event: 'Payment Requested', action: 'Routes to lowest-cost external rail dynamically' }
                  ].map((integ, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-slate-100 rounded-xl bg-slate-50">
                      <div className="flex-1">
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Source Family</div>
                        <div className="font-bold text-sm text-slate-800">{integ.source}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 hidden md:block" />
                      <div className="flex-1">
                        <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-wider mb-1">Target Family</div>
                        <div className="font-bold text-sm text-emerald-700">{integ.target}</div>
                      </div>
                      <div className="flex-2 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-4">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Trigger: {integ.event}</div>
                        <div className="text-xs text-slate-600">{integ.action}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'developer' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-in fade-in duration-300 text-center py-12">
                <Code className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h2 className="text-lg font-black text-slate-900 mb-2">Developer Workspace</h2>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                  Each family provides an independent API gateway, webhook registry, and testing sandbox.
                </p>
                <button 
                  onClick={() => window.location.href = '/products/fintech/developer'}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center gap-2 mx-auto"
                >
                  Launch {selectedFamily.name} Dev Portal <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // List View
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-slate-950 text-white px-6 py-8 border-b border-slate-800 text-center">
        <h1 className="text-3xl font-black tracking-tight mb-3">JUMO FINTECH 30-Family Architecture</h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          A universal financial-services platform containing 30 independent, benchmark-driven financial product families. 
          Independently installable, but seamlessly interoperable through the shared FINTECH core.
        </p>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-12 py-12">
        {Object.entries(groupedFamilies).map(([category, families]) => (
          <section key={category} className="space-y-4">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
              {category}
              <div className="h-px bg-slate-200 flex-1"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {families.map(family => (
                <div 
                  key={family.id} 
                  onClick={() => setSelectedFamily(family)}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-emerald-300 transition cursor-pointer group flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition">
                        <Layers className="w-5 h-5" />
                      </div>
                      <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-mono font-bold rounded">
                        {family.code}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition mb-1">
                      {family.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {family.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                      {family.status}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};
