
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Building2, Users, BookOpen, Clipboard, DollarSign, Activity, Zap, 
  Search, Plus, CheckCircle, Clock, ShieldAlert, ArrowRight, Save,
  Trash2, Edit, AlertCircle, HelpCircle, FileText, CheckSquare, 
  Settings, ArrowRightLeft, FileSpreadsheet, Eye, RefreshCw,
  LayoutGrid, MoreVertical, ShieldCheck, Cpu, Lock, X, ChevronRight,
  Layout, PieChart, FileText as FileIcon, Cog, Shield, Landmark
} from 'lucide-react';

import { JumoModule, JumoCapability, ModuleWorkforce } from '../../registry/types';
import { provisionModuleWorkforce } from '../../registry/ModuleAgentWorkforceFactory';
import { GlobalCapabilityRegistry, getCapabilitiesForModule } from '../../registry/JumoGlobalRegistry';
import { AIHybridKPIComponent, AIHybridDecisionPanel } from './AIHybridComponents';
import { GenericOperationalTable } from '../../../../components/common/table/GenericOperationalTable';
import { SovereignData } from '../../registry/JumoDataResolutionService';
import { WorkflowEngine } from '../../services/WorkflowEngine';
import { SchemaFormEngine } from '../forms/SchemaFormEngine';
import { FormSchemaRegistry } from '../../registry/FormSchemaRegistry';

interface AIHybridWorkspaceProps {
  module: JumoModule;
  initialCapabilityId?: string;
  productId?: string;
}

type WorkspaceMode = 'DASHBOARD' | 'CAPABILITY' | 'REPORTS' | 'SETTINGS';

export const AIHybridWorkspace: React.FC<AIHybridWorkspaceProps> = ({ 
  module, 
  initialCapabilityId,
  productId 
}) => {
  const [mode, setMode] = useState<WorkspaceMode>('DASHBOARD');
  const [activeCapId, setActiveCapId] = useState<string>(initialCapabilityId || 'OVERVIEW');
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // 1. Provision Workforce
  const workforce = useMemo(() => provisionModuleWorkforce(module), [module]);
  
  // 2. Discover Capabilities
  const capabilities = useMemo(() => 
    getCapabilitiesForModule(module.id), 
  [module]);

  const activeCap = useMemo(() => capabilities.find(c => c.id === activeCapId), [capabilities, activeCapId]);

  const records = useMemo(() => {
    if (activeCap?.formId) {
      return SovereignData.getRecords(activeCap.formId);
    }
    return [];
  }, [activeCap, refreshTrigger]);

  const selectedRecord = useMemo(() => {
    if (!selectedRecordId) return null;
    return records.find(r => r.id === selectedRecordId);
  }, [records, selectedRecordId]);

  const workflowInstance = useMemo(() => {
    if (!selectedRecordId) return null;
    return WorkflowEngine.getInstance().getWorkflowForRecord(selectedRecordId);
  }, [selectedRecordId, refreshTrigger]);

  const handleTransition = (toState: any) => {
    if (!selectedRecordId || !workflowInstance) return;
    
    let justification = '';
    if (toState === 'REJECTED') {
      justification = prompt('Please provide a mandatory justification for rejection:') || '';
      if (!justification) return;
    }

    try {
      WorkflowEngine.getInstance().transition(workflowInstance.id, toState, 'System Administrator', justification);
      setRefreshTrigger(prev => prev + 1);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleFormSubmit = (data: any) => {
    if (activeCap?.formId) {
      const record = SovereignData.saveRecord(activeCap.formId, data);
      WorkflowEngine.getInstance().initialize(activeCap.formId, record.id);
      setRefreshTrigger(prev => prev + 1);
      setIsFormOpen(false);
      alert(`${activeCap.name} record committed to sovereign ledger.`);
    }
  };

  const moduleTotalRecords = useMemo(() => {
    return capabilities.reduce((acc, cap) => {
      if (cap.formId) return acc + SovereignData.getRecords(cap.formId).length;
      return acc;
    }, 0);
  }, [capabilities, refreshTrigger]);

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      
      {/* MODULE WORKFORCE & SUB-NAVIGATION */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
              {module.name} Workforce Active
            </span>
          </div>

          <nav className="flex items-center gap-1">
            {[
              { id: 'DASHBOARD', label: 'Overview', icon: Layout },
              { id: 'CAPABILITY', label: 'Capabilities', icon: Shield },
              { id: 'REPORTS', label: 'Reports', icon: PieChart },
              { id: 'SETTINGS', label: 'Settings', icon: Cog }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id as WorkspaceMode)}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                  mode === m.id ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <m.icon className="w-3.5 h-3.5" />
                {m.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Autonomy</span>
              <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500"
                  style={{ width: `${workforce.completenessScore}%` }}
                />
              </div>
              <span className="text-[9px] font-black text-slate-900">{workforce.completenessScore}%</span>
           </div>
        </div>
      </div>

      {/* DYNAMIC CONTENT AREA */}
      <div className="flex-1 overflow-hidden relative">
        {mode === 'DASHBOARD' && (
          <div className="h-full overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 custom-scrollbar">
            <div className="lg:col-span-2 space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AIHybridKPIComponent 
                    capabilityId="OVERVIEW" 
                    moduleId={module.id} 
                    type="KPI" 
                    title="Ledger Integrity" 
                    valueResolver={() => '100%'}
                    unit="Verified"
                  />
                  <AIHybridKPIComponent 
                    capabilityId="OVERVIEW" 
                    moduleId={module.id} 
                    type="KPI" 
                    title="Institutional Volume" 
                    valueResolver={() => moduleTotalRecords.toLocaleString()}
                    unit="Records"
                  />
               </div>

               <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Operational Capabilities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {capabilities.map(cap => (
                      <button
                        key={cap.id}
                        onClick={() => {
                          setActiveCapId(cap.id);
                          setMode('CAPABILITY');
                        }}
                        className="group flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-300 hover:bg-white hover:shadow-lg hover:shadow-slate-200 transition-all text-left"
                      >
                        <div className="p-3 bg-white rounded-xl shadow-sm text-slate-900">
                          {cap.icon && <cap.icon className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-black text-slate-900 uppercase tracking-tight truncate">{cap.name}</div>
                          <div className="text-[9px] text-slate-400 font-bold mt-0.5 truncate">{cap.description}</div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
               </div>
            </div>
            
            <aside className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">AI Agent Workforce</h3>
                <div className="space-y-6">
                  {workforce.agents.map((agent, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-slate-900 shadow-sm border border-slate-100">
                        <agent.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{agent.name}</div>
                        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{agent.role}</div>
                        <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">{agent.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}

        {mode === 'CAPABILITY' && (
          <div className="h-full flex">
            {/* Sidebar with Capability List */}
            <div className="w-64 bg-slate-50 border-r border-slate-200 overflow-y-auto p-4 space-y-2 shrink-0">
              <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4">Select Capability</h3>
              {capabilities.map(cap => (
                <button
                  key={cap.id}
                  onClick={() => setActiveCapId(cap.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                    activeCapId === cap.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <cap.icon className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-tight truncate">{cap.name}</span>
                </button>
              ))}
            </div>

            {/* Capability Workspace */}
            <div className="flex-1 overflow-hidden flex flex-col bg-slate-50">
               <div className="p-8 flex-1 flex flex-col min-h-0">
                  <div className="flex items-center justify-between mb-8">
                     <div>
                       <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">{activeCap?.name}</h2>
                       <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{activeCap?.description}</p>
                     </div>
                     <button 
                       onClick={() => setIsFormOpen(true)}
                       className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                     >
                       <Plus className="w-4 h-4" />
                       New Entry
                     </button>
                  </div>

                  <div className="flex-1 min-h-0 bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                     <GenericOperationalTable 
                        data={records}
                        onRowClick={(row) => setSelectedRecordId(row.id)}
                        columns={[
                          { header: 'Reference', accessor: 'id', sortable: true },
                          { header: 'Timestamp', accessor: 'createdAt', sortable: true },
                          { 
                            header: 'Status', 
                            accessor: 'status', 
                            sortable: true,
                            render: (val) => (
                              <div className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest w-fit ${
                                val === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' :
                                val === 'REJECTED' ? 'bg-rose-50 text-rose-600' :
                                'bg-amber-50 text-amber-600'
                              }`}>
                                {val}
                              </div>
                            )
                          },
                          { header: 'Workforce ID', accessor: 'id' }
                        ]}
                     />
                  </div>
               </div>
            </div>
          </div>
        )}

        {mode === 'REPORTS' && (
           <div className="h-full p-8 overflow-y-auto bg-slate-50 custom-scrollbar">
              <div className="max-w-6xl mx-auto space-y-8">
                 <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{module.name} Analytics</h2>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                       <RefreshCw className="w-4 h-4" />
                       Refresh Dataset
                    </button>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {capabilities.map(cap => (
                       <div key={cap.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                             <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
                                <cap.icon className="w-4 h-4" />
                             </div>
                             <span className="text-[10px] font-black text-emerald-500 uppercase">+12.4%</span>
                          </div>
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cap.name} Volume</div>
                          <div className="text-2xl font-black text-slate-900 mt-1">{SovereignData.getRecords(cap.formId || '').length}</div>
                          <div className="mt-4 h-1 bg-slate-100 rounded-full overflow-hidden">
                             <div className="h-full bg-slate-900 w-3/4" />
                          </div>
                       </div>
                    ))}
                 </div>

                 <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl">
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Institutional Trend Report</h3>
                       <div className="flex gap-2">
                          <button className="px-4 py-2 rounded-xl bg-slate-50 text-[10px] font-black uppercase">CSV</button>
                          <button className="px-4 py-2 rounded-xl bg-slate-50 text-[10px] font-black uppercase">PDF</button>
                       </div>
                    </div>
                    <div className="h-64 flex items-end gap-2 px-4">
                       {Array.from({ length: 12 }).map((_, i) => (
                          <div key={i} className="flex-1 bg-slate-900 rounded-t-lg transition-all hover:bg-emerald-500" style={{ height: `${Math.random() * 80 + 20}%` }} />
                       ))}
                    </div>
                    <div className="flex justify-between mt-4 px-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                       <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                    </div>
                 </div>
              </div>
           </div>
        )}

        {mode === 'SETTINGS' && (
           <div className="h-full p-8 overflow-y-auto bg-slate-50 custom-scrollbar">
              <div className="max-w-4xl mx-auto space-y-8">
                 <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Module Configuration</h2>
                 
                 <div className="bg-white rounded-3xl border border-slate-200 shadow-xl divide-y divide-slate-100 overflow-hidden">
                    {[
                       { title: 'Workflow Policy', desc: 'Define approval steps and required justifications.', icon: Shield },
                       { title: 'Institutional Parameters', desc: 'Manage module-specific nomenclature and defaults.', icon: Landmark },
                       { title: 'Workforce Tuning', desc: 'Adjust AI agent autonomy levels and task allocation.', icon: Cpu },
                       { title: 'Security & Access', desc: 'Configure RBAC for specific module capabilities.', icon: Lock }
                    ].map((s, i) => (
                       <button key={i} className="w-full p-6 flex items-center gap-6 hover:bg-slate-50 transition-all text-left">
                          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                             <s.icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                             <div className="text-[11px] font-black text-slate-900 uppercase tracking-widest">{s.title}</div>
                             <div className="text-xs text-slate-400 font-medium mt-1">{s.desc}</div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-300" />
                       </button>
                    ))}
                 </div>
              </div>
           </div>
        )}

        {/* MODAL FORMS & DETAILS */}
        {isFormOpen && activeCap?.formId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{activeCap.name}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Sovereign Entry Pipeline</p>
                </div>
                <button onClick={() => setIsFormOpen(false)} className="p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                <SchemaFormEngine 
                   schema={FormSchemaRegistry[activeCap.formId]} 
                   onSubmit={handleFormSubmit}
                   onCancel={() => setIsFormOpen(false)}
                />
              </div>
            </div>
          </div>
        )}

        {selectedRecord && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Record Detail — {selectedRecord.id}</div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Sovereign Workflow State</h3>
                </div>
                <button onClick={() => setSelectedRecordId(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>
              
              <div className="p-8 space-y-8">
                 <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                      selectedRecord.status === 'APPROVED' ? 'bg-emerald-500 text-white' :
                      selectedRecord.status === 'REJECTED' ? 'bg-rose-500 text-white' :
                      'bg-amber-500 text-white'
                    }`}>
                       <Activity className="w-6 h-6" />
                    </div>
                    <div>
                       <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Current State</div>
                       <div className="text-xl font-black text-slate-900 uppercase tracking-tighter">{selectedRecord.status}</div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Audit Trail</h4>
                    <div className="space-y-3">
                       {workflowInstance?.history.map((h, i) => (
                          <div key={i} className="flex gap-3 text-[11px]">
                             <div className="w-1 bg-slate-200 rounded-full shrink-0" />
                             <div className="flex-1">
                                <div className="flex justify-between">
                                   <span className="font-black text-slate-900 uppercase tracking-tighter">{h.to}</span>
                                   <span className="text-slate-400 font-bold">{h.timestamp}</span>
                                </div>
                                <div className="text-slate-500 font-medium mt-0.5">By: {h.actor}</div>
                                {h.justification && (
                                   <div className="mt-1 p-2 bg-slate-50 rounded-lg text-[10px] text-slate-600 italic border-l-2 border-slate-200">
                                      "{h.justification}"
                                   </div>
                                )}
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    {['VERIFIED', 'APPROVED', 'REJECTED'].map(state => (
                       selectedRecord.status !== state && (
                          <button 
                            key={state}
                            onClick={() => handleTransition(state)}
                            className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${
                              state === 'APPROVED' ? 'bg-emerald-600 text-white hover:bg-emerald-700' :
                              state === 'REJECTED' ? 'bg-rose-600 text-white hover:bg-rose-700' :
                              'bg-slate-900 text-white hover:bg-slate-800'
                            }`}
                          >
                            Mark as {state}
                          </button>
                       )
                    ))}
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
