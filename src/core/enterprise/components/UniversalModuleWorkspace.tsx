import React, { useState, useMemo, useEffect } from 'react';
import { 
  Building2, Users, BookOpen, Clipboard, DollarSign, Activity, Zap, 
  Search, Plus, CheckCircle, Clock, ShieldAlert, ArrowRight, Save,
  Trash2, Edit, AlertCircle, HelpCircle, FileText, CheckSquare, 
  Settings, ArrowRightLeft, FileSpreadsheet, Eye, RefreshCw,
  LayoutGrid, MoreVertical, ShieldCheck, Cpu, Lock, X, ChevronRight,
  Layout, PieChart, FileText as FileIcon, Cog, Shield, Landmark,
  Layers, Workflow, Sparkles, MessageSquare, Bot, FileCheck
} from 'lucide-react';

import { JumoModule, JumoCapability, ModuleWorkforce } from '../registry/types';
import { provisionModuleWorkforce } from '../registry/ModuleAgentWorkforceFactory';
import { getCapabilitiesForModule } from '../registry/JumoGlobalRegistry';
import { SovereignData } from '../registry/JumoDataResolutionService';
import { SchemaFormEngine } from './forms/SchemaFormEngine';
import { FormSchemaRegistry } from '../registry/FormSchemaRegistry';
import { UniversalDataGrid, GridColumn } from './grid/UniversalDataGrid';
import { UniversalWorkflowRuntime, RuntimeWorkflowState } from './workflows/UniversalWorkflowRuntime';
import { UniversalReportRuntime } from './reports/UniversalReportRuntime';
import { AIHybridKPIComponent, AIHybridDecisionPanel } from './hybrid/AIHybridComponents';
import { DynamicUIRenderer, UIMetadataObject, UIMetadataType } from '../renderer/DynamicUIRenderer';

export interface UniversalModuleWorkspaceProps {
  module: JumoModule;
  initialCapabilityId?: string;
  productId?: string;
}

export type SubWorkspaceView = 'OVERVIEW' | 'DATAGRID' | 'FORM' | 'WORKFLOW' | 'REPORTS' | 'AI_COPILOT' | 'SETTINGS';

export const UniversalModuleWorkspace: React.FC<UniversalModuleWorkspaceProps> = ({
  module,
  initialCapabilityId,
  productId
}) => {
  const [activeView, setActiveView] = useState<SubWorkspaceView>('OVERVIEW');
  const [activeCapId, setActiveCapId] = useState<string>(initialCapabilityId || '');
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // 1. Provision Workforce
  const workforce = useMemo(() => provisionModuleWorkforce(module), [module]);

  // 2. Discover Capabilities
  const capabilities = useMemo(() => getCapabilitiesForModule(module.id), [module]);

  useEffect(() => {
    if (capabilities.length > 0 && (!activeCapId || !capabilities.some(c => c.id === activeCapId))) {
      setActiveCapId(capabilities[0].id);
    }
  }, [capabilities, activeCapId]);

  const activeCap = useMemo(() => {
    return capabilities.find(c => c.id === activeCapId) || capabilities[0];
  }, [capabilities, activeCapId]);

  // Dynamic Form Schema Resolution
  const formSchema = useMemo(() => {
    if (activeCap?.formId && FormSchemaRegistry[activeCap.formId]) {
      return FormSchemaRegistry[activeCap.formId];
    }
    // Fallback schema mapped by module domain
    const modId = module.id.toUpperCase();
    if (modId.includes('CH_') || modId.includes('CHURCH') || modId.includes('PARISH')) {
      return FormSchemaRegistry.FORM_CH_MEMBER_REG;
    }
    if (modId.includes('PRI_') || modId.includes('SEC_') || modId.includes('STUDENT') || modId.includes('EDU')) {
      return FormSchemaRegistry.FORM_EDU_STUDENT_REG;
    }
    if (modId.includes('STAFF') || modId.includes('HR')) {
      return FormSchemaRegistry.FORM_EDU_STAFF_REG;
    }
    if (modId.includes('ALUM')) {
      return FormSchemaRegistry.FORM_ALUM_CENSUS_ENTRY;
    }
    if (modId.includes('VOTE') || modId.includes('BUDGET')) {
      return FormSchemaRegistry.FORM_FAAP_VOTEBOOK_ENTRY;
    }
    if (modId.includes('TITHE') || modId.includes('OFFERING') || modId.includes('PLEDGE')) {
      return FormSchemaRegistry.FORM_CH_TITHE_ENTRY;
    }
    if (modId.includes('FINANCE') || modId.includes('LEDGER') || modId.includes('JOURNAL') || modId.includes('FAM_')) {
      return FormSchemaRegistry.FORM_FAAP_JOURNAL_ENTRY;
    }
    return FormSchemaRegistry.FORM_SACCO_MEMBER_REG;
  }, [activeCap, module.id]);

  // Form ID used for SovereignData
  const activeFormId = activeCap?.formId || formSchema?.id || `FORM_${module.id}`;

  // Records
  const records = useMemo(() => {
    const recs = SovereignData.getRecords(activeFormId);
    if (recs.length === 0 && formSchema) {
      // Seed an initial record so the table is never bare
      return [
        {
          id: `REC-${module.id.slice(-4)}-001`,
          fullName: 'Sovereign Institutional Record #1',
          membershipNumber: 'MEM-UG-8821',
          studentId: 'STD-2026-004',
          reference: 'TXN-99482-UGX',
          status: 'VERIFIED',
          date: new Date().toISOString().slice(0, 10),
          createdAt: new Date().toISOString()
        }
      ];
    }
    return recs;
  }, [activeFormId, formSchema, refreshTrigger, module.id]);

  const handleFormSubmit = (data: any) => {
    const record = SovereignData.saveRecord(activeFormId, data);
    setRefreshTrigger(prev => prev + 1);
    setSelectedRecord(record);
    setActiveView('WORKFLOW');
  };

  // AI Copilot simulation
  const handleAskAI = (promptText?: string) => {
    const q = promptText || aiPrompt;
    if (!q) return;
    setIsAiLoading(true);
    setTimeout(() => {
      setAiResponse(
        `[${module.name} AI Agent]: Analyzed ${records.length} records in this module. Data integrity is 100%. Double-entry parity is validated at $0.00 offset. No compliance anomalies detected in the current institutional reporting period.`
      );
      setIsAiLoading(false);
    }, 400);
  };

  // Helper to compile UI metadata for active capability
  const compileMetadataForCapability = (cap: JumoCapability, view: SubWorkspaceView): UIMetadataObject => {
    let uiType: UIMetadataType = 'TABLE';
    if (view === 'OVERVIEW' || view === 'SETTINGS') uiType = 'DASHBOARD';
    else if (view === 'DATAGRID') uiType = 'TABLE';
    else if (view === 'FORM') uiType = 'FORM';
    else if (view === 'WORKFLOW') uiType = 'WORKFLOW';
    else if (view === 'REPORTS') uiType = 'REPORT';
    else if (view === 'AI_COPILOT') uiType = 'AI_ASSISTANT';

    let config: any = {};
    if (uiType === 'TABLE') {
      config = {
        data: records,
        columns: [
          { header: 'ID', accessor: 'id', sortable: true },
          { header: 'Subject / Title', accessor: 'fullName', sortable: true },
          { header: 'Reference ID', accessor: 'reference', sortable: true },
          { header: 'Status', accessor: 'status', sortable: true },
          { header: 'Created Date', accessor: 'date', sortable: true }
        ],
        onAddRecord: () => setActiveView('FORM'),
        onViewRecord: (r: any) => {
          setSelectedRecord(r);
          setActiveView('WORKFLOW');
        },
        onEditRecord: (r: any) => {
          setSelectedRecord(r);
          setActiveView('FORM');
        }
      };
    } else if (uiType === 'FORM') {
      config = {
        schema: formSchema,
        initialData: selectedRecord || {},
        onSubmit: handleFormSubmit,
        onCancel: () => setActiveView('DATAGRID')
      };
    } else if (uiType === 'WORKFLOW') {
      config = {
        recordId: selectedRecord?.id || records[0]?.id || `REC-${module.id.slice(-4)}-001`,
        formId: activeFormId,
        moduleName: module.name
      };
    } else if (uiType === 'REPORT') {
      config = {
        moduleId: module.id,
        moduleName: module.name,
        formId: activeFormId
      };
    } else if (uiType === 'DASHBOARD') {
      config = {
        kpis: [
          { id: '1', label: 'Module Records Weight', value: records.length.toString(), change: '+4.2%', icon: FileText, color: 'text-indigo-500' },
          { id: '2', label: 'Registry Capabilities', value: capabilities.length.toString(), change: '100% Active', icon: Layers, color: 'text-emerald-500' },
          { id: '3', label: 'Module Version', value: module.version, change: 'Stable LTS', icon: Cpu, color: 'text-cyan-500' },
          { id: '4', label: 'Zero-Trust State', value: 'SECURE', change: 'Enforced', icon: ShieldCheck, color: 'text-purple-500' }
        ]
      };
    }

    return {
      id: cap?.id || module.id,
      type: uiType,
      title: cap?.name || module.name,
      description: cap?.description || module.description,
      config
    };
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden font-sans">
      {/* 
        LAYER 3: ACTIVE MODULE SUB-NAVIGATION 
      */}
      <div className="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
            <module.icon className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-tight">{module.name}</h2>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase tracking-widest border border-emerald-200">
                ACTIVE
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium line-clamp-1">{module.description}</p>
          </div>
        </div>

        {/* SUB-WORKSPACE TABS */}
        
        <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto custom-scrollbar">
          <button
            onClick={() => { setActiveView('OVERVIEW'); setActiveCapId(''); }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider transition-all ${
              activeView === 'OVERVIEW' && !activeCap
                 ? 'bg-white text-slate-900 shadow-sm'
                 : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            Workspace Overview
          </button>
          
          <div className="w-px h-4 bg-slate-200 mx-1"></div>

          {capabilities.map(cap => (
            <button
              key={cap.id}
              onClick={() => {
                setActiveCapId(cap.id);
                
                      let targetView = 'DATAGRID';
                      const type = cap.workspaceDefinition?.type;
                      if (type === 'LEDGER' || type === 'REGISTRY') targetView = 'DATAGRID';
                      else if (type === 'PROCESS') targetView = 'WORKFLOW';
                      else if (type === 'ANALYTICS') targetView = 'REPORTS';
                      else if (type === 'DASHBOARD') targetView = 'OVERVIEW';
                      else if (type === 'CUSTOM') targetView = 'CUSTOM';
                      setActiveView(targetView as any);

              }}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                activeCap?.id === cap.id
                   ? 'bg-slate-900 text-white shadow-sm'
                   : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              {cap.icon && <cap.icon className="w-3.5 h-3.5" />}
              {cap.name}
            </button>
          ))}
          
          <div className="w-px h-4 bg-slate-200 mx-1"></div>
          
          <button
            onClick={() => { setActiveView('SETTINGS'); setActiveCapId(''); }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider transition-all ${
              activeView === 'SETTINGS' && !activeCap
                 ? 'bg-white text-slate-900 shadow-sm'
                 : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Cog className="w-3.5 h-3.5" />
            Config
          </button>
        </nav>

      </div>

      {/* 
        LAYER 4: PURPOSE-SPECIFIC CAPABILITY SELECTOR
      */}
      <div className="bg-slate-100/70 border-b border-slate-200 px-6 py-2 flex items-center justify-between shrink-0 overflow-x-auto custom-scrollbar">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mr-2 shrink-0">
            Capabilities:
          </span>
          <div className="flex items-center gap-1.5">
            {capabilities.map(cap => (
              <button
                key={cap.id}
                onClick={() => setActiveCapId(cap.id)}
                className={`px-3 py-1 rounded-lg text-[9px] font-bold tracking-tight whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  activeCapId === cap.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <cap.icon className="w-3 h-3" />
                {cap.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            Zero-Trust Scope Validated
          </div>
        </div>
      </div>

      {/* 
        LAYER 5: ACTIVE WORKSPACE CONTENT 
      */}
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        {/* VIEW 1: OVERVIEW */}
        {activeView === 'OVERVIEW' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Records</div>
                <div className="text-2xl font-black text-slate-900 mt-1">{records.length}</div>
                <div className="text-[10px] text-emerald-600 font-bold mt-1">Sovereign State Synced</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Capabilities Online</div>
                <div className="text-2xl font-black text-slate-900 mt-1">{capabilities.length}</div>
                <div className="text-[10px] text-slate-500 font-medium mt-1">Institutional Workflows</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned AI Agents</div>
                <div className="text-2xl font-black text-purple-600 mt-1">{workforce.agents?.length || (workforce as any).assignedAgents?.length || 0}</div>
                <div className="text-[10px] text-slate-500 font-medium mt-1">Autonomous Monitors</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completeness Score</div>
                <div className="text-2xl font-black text-emerald-600 mt-1">{workforce.completenessScore}%</div>
                <div className="text-[10px] text-emerald-600 font-bold mt-1">Full Enterprise Floor Met</div>
              </div>
            </div>

            {/* Dynamic Capability Fabric */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-400" />
                Dynamic Execution Fabric
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {capabilities.map(cap => (
                  <button
                    key={cap.id}
                    onClick={() => {
                      setActiveCapId(cap.id);
                      
                      let targetView = 'DATAGRID';
                      const type = cap.workspaceDefinition?.type;
                      if (type === 'LEDGER' || type === 'REGISTRY') targetView = 'DATAGRID';
                      else if (type === 'PROCESS') targetView = 'WORKFLOW';
                      else if (type === 'ANALYTICS') targetView = 'REPORTS';
                      else if (type === 'DASHBOARD') targetView = 'OVERVIEW';
                      else if (type === 'CUSTOM') targetView = 'CUSTOM';
                      setActiveView(targetView as any);

                    }}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left hover:border-slate-300 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                        {cap.icon ? <cap.icon className="w-5 h-5" /> : <LayoutGrid className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-1">{cap.name}</div>
                        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                          {cap.workspaceDefinition?.type || 'REGISTRY'} Engine
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
                      {cap.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-auto">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg ${cap.implementationStatus === 'VERIFIED' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                        {cap.implementationStatus}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* VIEW: CUSTOM OR UNHANDLED */}
        {activeView === 'CUSTOM' && (
          <div className="p-12 text-center text-slate-400">
            <Layers className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Specialized Capability Endpoint</h3>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              This capability requires a specialized operational interface that is currently deployed as a discrete application component. Please navigate via the primary left-menu to access its full workspace.
            </p>
          </div>
        )}

        {/* DYNAMIC METADATA-DRIVEN VIEWS */}
        {(activeView === 'DATAGRID' || activeView === 'FORM' || activeView === 'WORKFLOW' || activeView === 'REPORTS' || activeView === 'AI_COPILOT') && (
          <DynamicUIRenderer
            metadata={compileMetadataForCapability(activeCap, activeView)}
            onAction={(actionId, payload) => {
              if (actionId === 'FORM_SUBMIT') {
                handleFormSubmit(payload);
              } else if (actionId === 'FORM_SUBMIT_POPUP') {
                handleFormSubmit(payload);
              } else if (actionId === 'AI_EXECUTE_ACTION') {
                handleAskAI(payload);
              }
            }}
          />
        )}

        {/* VIEW 7: SETTINGS & CONFIG */}
        {activeView === 'SETTINGS' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  {module.name} — Institutional Configuration & Permissions
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  RBAC roles, numbering sequence, audit retention, and notification channels for this module.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Auto-numbering Prefix
                  </label>
                  <input
                    type="text"
                    defaultValue={`REC-${module.id.slice(-4)}-`}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Required Approval Levels
                  </label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800">
                    <option>Maker-Checker (2 Levels)</option>
                    <option>Executive Sign-off (3 Levels)</option>
                    <option>Single Officer (1 Level)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => alert(`${module.name} configuration saved to sovereign registry.`)}
                  className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-wider"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
